db = require("./database.js");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const { Base64 } = require("js-base64");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const AES = require("crypto-js/aes");
const { encrypt } = require("crypto-js/aes");

const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/filter", (req, response) => {
  let value = req.query.value.toUpperCase();
  let filter = db.query(
    "SELECT * FROM projects WHERE UPPER(title)  LIKE $1 OR UPPER(content)  LIKE $1 ",
    ["%" + value + "%"],
    (err, res) => {
      response.json(res.rows);
    }
  );
});

app.get("/insertProject", (req, response) => {
  data.forEach((item) => {
    let createInitialData = db.query(
      "INSERT INTO projects (img, title, content) values($1, $2, $3)",
      [item.img, item.title, item.content]
    );
  });
});

app.get("/getInitialData", (req, response) => {
  let selectAll = db.query("SELECT * FROM projects", (err, res) => {
    response.json(res.rows);
  });
});

app.get("/truncateProjects", (req, res) => {
  let result = db.query("TRUNCATE TABLE projects ");

  res.send("deleted");
});

app.post("/login", async function (request, response) {
  const loginObj = {
    errors: [],
    isInvalid: 1,
  };

  await db.query(
    "SELECT FROM users WHERE username='" + request.body.username + "'",
    async (err, res) => {
      if (res.rowCount == 0) {
        loginObj.errors.push(1);

        response.send(loginObj);
      } else {
        loginObj.errors.push(0);
        await db.query(
          "SELECT password FROM users WHERE username='" +
            request.body.username +
            "'",
          async (err, res) => {
            const hashedPassword = res.rows[0].password;
            const isMatch = await bcrypt.compare(
              request.body.password,
              hashedPassword
            );
            if (isMatch == true) {
            } else {
              loginObj.errors.push(1);
            }
            const isInvalid = loginObj.errors.reduce((a, b) => a + b, 0);
            loginObj.isInvalid = isInvalid;
            response.send(loginObj);
          }
        );
      }
    }
  );
});

app.post("/signup", async function (request, response) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
  const nameRegex = /^[A-Z]{1}[a-z]{2,}$/gm;
  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
  console.log(request.body);
  let errObj = {
    errors: [],
    loginExists: "",
    isInvalid: 1,
  };

  if (request.body.username.search(usernameRegex)) {
    errObj.errors.push(1);
  } else {
    errObj.errors.push(0);
  }
  if (request.body.password.search(passwordRegex)) {
    errObj.errors.push(1);
  } else {
    errObj.errors.push(0);
  }
  if (request.body.password !== request.body.repeatPassword) {
    errObj.errors.push(1);
  } else {
    errObj.errors.push(0);
  }
  if (request.body.firstName.search(nameRegex)) {
    errObj.errors.push(1);
  } else {
    errObj.errors.push(0);
  }
  if (request.body.lastName.search(nameRegex)) {
    errObj.errors.push(1);
  } else {
    errObj.errors.push(0);
  }
  if (!(parseInt(request.body.age, 10) > 0)) {
    errObj.errors.push(1);
  } else {
    errObj.errors.push(0);
  }

  await db.query(
    "SELECT FROM users WHERE username='" + request.body.username + "'",
    async (err, res) => {
      const isInvalid = errObj.errors.reduce((a, b) => a + b, 0);
      console.log(res.rowCount);
      if (res.rowCount !== 0) {
        errObj.loginExists = "User with this login already exists";
        errObj.errors[0] = 1;
      }
      if (res.rowCount === 0 && isInvalid === 0) {
        errObj.isInvalid = isInvalid;
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        let selectAll = await db.query(
          "INSERT INTO users (username, password, first_name, last_name, age) values($1, $2, $3, $4, $5)",
          [
            request.body.username,
            hashedPassword,
            request.body.firstName,
            request.body.lastName,
            request.body.age,
          ],
          (err, res) => {}
        );
      }
      console.log(errObj.errors);
      response.send(errObj);
    }
  );
});

app.listen(port, () => {
  const magicKey = "darova";
  console.log(`Server is running at http://localhost:${port}`);
  const header = { alg: "Base64", typ: "JWT" };
  const payload = { username: "Vasya", exp: 1581357039 };
  const hashedHeader = Base64.encode(JSON.stringify(header));
  console.log("hashed header: " + hashedHeader);
  const decodedHeader = Base64.decode(hashedHeader);
  const hashedPayload = Base64.encode(JSON.stringify(payload));
  console.log("hashed payload: " + hashedPayload);
  const decodedPayload = Base64.decode(hashedPayload);
  const headerAndPayload = hashedHeader + "." + hashedPayload;
  console.log("header and payload " + headerAndPayload);
  const signature = AES.encrypt(headerAndPayload, magicKey);
  console.log("signature: " + signature);
  const decryptedSignature = AES.decrypt(signature, magicKey).toString(
    CryptoJS.enc.Utf8
  );
  console.log("decryptedSignature: " + decryptedSignature);
  const accessToken = headerAndPayload + "." + signature;
  const [h1, h2, h3] = accessToken.split(".");

  console.log("access token: " + accessToken);

  const isAccessTokenValid = (accessToken) => {
    const [hashedHeader, hashedPayload, signature] = accessToken.split(".");
    const decryptedSignature = AES.decrypt(signature, magicKey).toString(
      CryptoJS.enc.Utf8
    );
    const decryptedPayload = Base64.decode(hashedPayload);
    const parsedPayload = JSON.parse(decryptedPayload);
    const currentDate = Date.now();
    if (
      hashedHeader + "." + hashedPayload == decryptedSignature &&
      parsedPayload.exp > currentDate
    ) {
      console.log("signature is valid");
    } else {
      console.log("signature is not valid");
    }
  };
  isAccessTokenValid(accessToken);

  const refreshPayload = { username: "Vasya", exp: 1581357039 };
  const refreshToken = AES.encrypt(JSON.stringify(refreshPayload), magicKey);
  console.log("refresh token: " + refreshToken);

  const isRefreshTokenValid = (refreshToken) => {
    const decryptedRefreshToken = AES.decrypt(refreshToken, magicKey).toString(
      CryptoJS.enc.Utf8
    );
    const parsedRefreshToken = JSON.parse(decryptedRefreshToken);
    console.log(parsedRefreshToken.exp);
    const currentDate = Date.now();
    if (parsedRefreshToken.exp > currentDate) {
      console.log("refreshToken is valid");
    } else {
      console.log("refreshToken is not valid");
    }
  };
  isRefreshTokenValid(refreshToken);
});
