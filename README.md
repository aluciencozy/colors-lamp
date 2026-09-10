# COLORS Web Application

## Overview

COLORS is a small educational LAMP application for signing in, adding colors to an account, and searching that account's stored colors. The base application files were supplied by the COP 4331 COLORS LAMP lab. This repository organizes and documents those existing files for the Git/version-control assignment; it does not claim that all starter code was written from scratch by the repository owner.

The commits record repository setup, frontend import, sanitized backend import, configuration cleanup, and documentation, rather than the original lab development timeline.

## Technologies

- Linux / Ubuntu
- Apache
- MySQL
- PHP with mysqli and mysqlnd support
- HTML and CSS
- Vanilla JavaScript, including the supplied MD5 helper

## Project Structure

```text
colors-lamp/
├── api/
│   ├── AddColor.php
│   ├── Login.php
│   ├── SearchColors.php
│   ├── config.example.php
│   └── config.php              # created locally; ignored by Git
├── css/
│   └── styles.css
├── images/
│   └── background.png
├── js/
│   ├── code.js
│   └── md5.js
├── index.html
├── color.html
├── .gitignore
├── README.md
└── LICENSE.md
```

`api/` contains the PHP JSON endpoints and a safe database configuration template. `css/`, `images/`, and `js/` contain the supplied styles, image assets, and browser logic. `index.html` is the login page; `color.html` provides color entry and search.

## Setup

1. Install and configure Apache, PHP with mysqli and mysqlnd (used by `get_result()`), and MySQL on Linux/Ubuntu.
2. Create a `COP4331` database. The following minimal schema is inferred from the supplied endpoint queries and supports this application:

   ```sql
   CREATE DATABASE COP4331;
   USE COP4331;

   CREATE TABLE Users (
       ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
       firstName VARCHAR(50) NOT NULL,
       lastName VARCHAR(50) NOT NULL,
       Login VARCHAR(100) NOT NULL UNIQUE,
       Password VARCHAR(255) NOT NULL
   );

   CREATE TABLE Colors (
       ID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
       UserId INT NOT NULL,
       Name VARCHAR(255) NOT NULL,
       FOREIGN KEY (UserId) REFERENCES Users(ID)
   );
   ```

   Provision a local educational account in `Users` yourself; there is no registration page or bundled account. The supplied login compares the submitted password directly with `Users.Password`. Do not use a real or reused password.
3. Copy `api/config.example.php` to `api/config.php` and replace the placeholders with your local database connection details. Use a database account with only the permissions needed by the app (reading users, reading and inserting colors).
4. Keep `api/config.php` out of Git. It is already ignored; never commit database exports or other files containing credentials.
5. Serve this repository from an Apache document root. The browser calls `/api`, so the app expects to be hosted at the hostname's root, not a subdirectory. Configure Apache to deny direct HTTP access to configuration files and to avoid serving repository metadata such as `.git`.
6. Ensure Apache executes PHP, PHP can reach MySQL, and the web-server process can read the local configuration. Opening the HTML as a local file or using a static-only host will not run the API.
7. Open the configured HTTP/HTTPS hostname in a browser. Use HTTPS whenever the app is accessed over a network.

## Usage

Open the site and sign in using a valid locally provisioned database account. On the color page, enter a color and choose **Add Color**. Enter a full or partial color name and choose **Search Color** to find colors associated with the logged-in user. Use **Log Out** to return to the login page.

## Assumptions and Limitations

- This is a course/lab application, not production software. The supplied application behavior is retained, including its limited error handling and input/output handling.
- Authentication and password handling follow the supplied lab design. Passwords are compared directly, and the client supplies user IDs; the API does not enforce a secure server-side session or authorization model.
- `md5.js` is included, but the MD5 login calls are commented out in the supplied `code.js`. MD5 is unsuitable for production password storage or authentication; the helper remains only as part of the educational implementation.
- Local database credentials and an initial user must be configured separately. No deployed database or credentials are included.
- Deployment infrastructure, server addresses, DNS configuration, private keys, and course instructional documents are intentionally excluded.
- The HTML references Google Fonts; loading that font requires internet access.
- PHP syntax and live database integration have not been tested in this repository preparation environment because PHP/MySQL are not available. JavaScript syntax and repository hygiene were checked.

## AI Usage

I copied the provided LAMP starter files directly from Webcourses and used ChatGPT to review and verify my plan for organizing the repository. I also used AI assistance to generate and simplify terminal commands for copying files, creating commits, and speeding up the Git/GitHub workflow, along with minor repository cleanup and documentation assistance.

## License

This repository uses the [MIT License](LICENSE.md). The application is based on course-provided starter files, as acknowledged above.
