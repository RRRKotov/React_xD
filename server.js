db = require("./database.js");
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const { Base64 } = require("js-base64");
const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const AES = require("crypto-js/aes");
const magicKey = "darova";

const port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/insertProject", (req, response) => {
  data.forEach((item) => {
    let createInitialData = db.query(
      "INSERT INTO projects (img, title, content) values($1, $2, $3)",
      [item.img, item.title, item.content]
    );
  });
});

const createNewAccessToken = () => {
  const header = { alg: "Base64", typ: "JWT" };
  const hashedHeader = Base64.encode(JSON.stringify(header));
  const payload = { exp: Date.now() + 1000 * 10 };
  const hashedPayload = Base64.encode(JSON.stringify(payload));
  const headerAndPayload = hashedHeader + "." + hashedPayload;

  const signature = AES.encrypt(JSON.stringify(headerAndPayload), magicKey);
  const accessToken = headerAndPayload + "." + signature;
  return accessToken;
};

const createNewRefreshToken = () => {
  const refreshPayload = {
    exp: Date.now() + 1000 * 15,
  };
  const refreshToken = AES.encrypt(
    JSON.stringify(refreshPayload),
    magicKey
  ).toString();
  return refreshToken;
};

const isAccessTokenValid = (accessToken) => {
  const [hashedHeader, hashedPayload, signature] = accessToken.split(".");
  const decryptedSignature = AES.decrypt(signature, magicKey).toString(
    CryptoJS.enc.Utf8
  );
  const decryptedPayload = Base64.decode(hashedPayload);
  const parsedPayload = JSON.parse(decryptedPayload);
  const parsedHeader = JSON.stringify(hashedHeader);

  const currentDate = Date.now();
  const parsedSignature = decryptedSignature;

  if (hashedHeader + "." + hashedPayload + '"' == parsedSignature) {
    if (parsedPayload.exp > currentDate) {
      return true;
    } else return false;
  } else {
    return false;
  }
};

const isRefreshTokenValid = (refreshToken) => {
  const decryptedRefreshToken = AES.decrypt(refreshToken, magicKey).toString(
    CryptoJS.enc.Utf8
  );

  const parsedRefreshToken = JSON.parse(decryptedRefreshToken);

  const currentDate = Date.now();
  if (parsedRefreshToken.exp > currentDate) {
    console.log("refresh did not expire");
    return true;
  } else {
    console.log("refresh expired");
    return false;
  }
};

app.get("/filter", (req, response) => {
  const filterObj = {
    array: [],
    tokens: { accessToken: "", refreshToken: "" },
    isLogin: 0,
  };
  let value = req.query.value.toUpperCase();
  let refreshToken = req.query.refreshToken.replace(/ /g, "+");

  let accessToken = JSON.stringify(req.query.accessToken).replace(/ /g, "+");
  if (accessToken == '""') {
    const check = isRefreshTokenValid(refreshToken);
    if (isRefreshTokenValid(refreshToken)) {
      response.status(401);
      filterObj.isLogin = 1;
    }
  }
  
  if (refreshToken !== "") {
    if (isRefreshTokenValid(refreshToken)) {
      console.log("refresh token is valid");
      filterObj.tokens.accessToken = createNewAccessToken();
    } else {
      console.log("refresh token is invalid");
      filterObj.tokens.accessToken = "";
      filterObj.tokens.refreshToken = "";
    }
  } else {
    if (isAccessTokenValid(accessToken)) {
      filterObj.isLogin = 1;
    }
  }

  let filter = db.query(
    "SELECT * FROM projects WHERE UPPER(title)  LIKE $1 OR UPPER(content)  LIKE $1 ",
    ["%" + value + "%"],
    (err, res) => {
      filterObj.array = res.rows;
      response.json(filterObj);
    }
  );
});

app.get("/getInitialData", (req, response) => {
  const filterObj = {
    array: [],
    tokens: { accessToken: "", refreshToken: "" },
    isLogin: 0,
  };
  let refreshToken = req.query.refreshToken.replace(/ /g, "+");

  let accessToken = JSON.stringify(req.query.accessToken).replace(/ /g, "+");

  if (accessToken == '""') {
    const check = isRefreshTokenValid(refreshToken);
    if (isRefreshTokenValid(refreshToken)) {
      response.status(401);
      filterObj.isLogin = 1;
    }
  }

  if (refreshToken !== "") {
    if (isRefreshTokenValid(refreshToken)) {
      console.log("refresh token is valid");
      filterObj.tokens.accessToken = createNewAccessToken();
    } else {
      console.log("refresh token is invalid");
      filterObj.tokens.accessToken = "";
      filterObj.tokens.refreshToken = "";
    }
  } else {
    if (isAccessTokenValid(accessToken)) {
      filterObj.isLogin = 1;
    }
  }
  let selectAll = db.query("SELECT * FROM projects", (err, res) => {
    filterObj.array = res.rows;
    response.json(filterObj);
  });
});

app.post("/login", async function (request, response) {
  const loginObj = {
    errors: [],
    isInvalid: 1,
    tokens: { accessToken: "", refreshToken: "" },
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
            loginObj.tokens.accessToken = createNewAccessToken(
              request.body.username
            );
            loginObj.tokens.refreshToken = createNewRefreshToken(
              request.body.username
            );
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
    tokens: { accessToken: "", refreshToken: "" },
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
        errObj.tokens.accessToken = createNewAccessToken(request.body.username);
        errObj.tokens.refreshToken = createNewRefreshToken(
          request.body.username
        );
      }
      console.log(errObj.errors);
      response.send(errObj);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
