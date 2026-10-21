const { readFileSync } = require("node:fs");
const { join } = require("node:path");
const { runInNewContext } = require("node:vm");

const source = readFileSync(join(__dirname, "../js/code.js"), "utf8");

test("addColor sends the entered color and user ID to the API", () => {
  const elements = {
    colorText: { value: "Blue" },
    colorAddResult: { innerHTML: "Previous result" }
  };
  const xhr = {
    open: jest.fn(),
    setRequestHeader: jest.fn(),
    send: jest.fn()
  };

  runInNewContext(source + "\nuserId = 7; addColor();", {
    document: { getElementById: (id) => elements[id] },
    XMLHttpRequest: jest.fn(() => xhr)
  });

  expect(elements.colorAddResult.innerHTML).toBe("");
  expect(xhr.open).toHaveBeenCalledWith("POST", "/api/AddColor.php", true);
  expect(xhr.setRequestHeader).toHaveBeenCalledWith(
    "Content-type", "application/json; charset=UTF-8"
  );
  expect(JSON.parse(xhr.send.mock.calls[0][0])).toEqual({ color: "Blue", userId: 7 });

  xhr.onreadystatechange.call({ readyState: 4, status: 200 });
  expect(elements.colorAddResult.innerHTML).toBe("Color has been added");
});
