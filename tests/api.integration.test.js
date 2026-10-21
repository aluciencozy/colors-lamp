const apiUrl = process.env.API_URL || "http://127.0.0.1:8000/api";

async function post(endpoint, body) {
  const response = await fetch(`${apiUrl}/${endpoint}.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body)
  });
  expect(response.status).toBe(200);
  expect(response.headers.get("content-type")).toMatch(/application\/json/);
  return response.json();
}

test("the PHP API logs in, saves a color, and retrieves it from MySQL", async () => {
  const login = await post("Login", { login: "jest-user", password: "jest-password" });
  expect(login).toEqual({ id: 1, firstName: "Jest", lastName: "User", error: "" });

  const color = `Jest-${Date.now()}`;
  const added = await post("AddColor", { color, userId: login.id });
  expect(added).toEqual({ error: "" });

  const search = await post("SearchColors", { search: color, userId: login.id });
  expect(search).toEqual({ results: [color], error: "" });
});
