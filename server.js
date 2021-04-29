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
  const payload = { exp: Date.now() + 1000 * 7 };
  const hashedPayload = Base64.encode(JSON.stringify(payload));
  const headerAndPayload = hashedHeader + "." + hashedPayload;
  const signature = AES.encrypt(JSON.stringify(headerAndPayload), magicKey);
  const accessToken = headerAndPayload + "." + signature;
  return accessToken;
};

const createNewRefreshToken = () => {
  const refreshPayload = {
    exp: Date.now() + 1000 * 13,
  };
  const refreshToken = AES.encrypt(
    JSON.stringify(refreshPayload),
    magicKey
  ).toString();
  return refreshToken;
};

const isAccessTokenValid = (accessToken) => {
  let decryptedSignature = null;
  const [hashedHeader, hashedPayload, signature] = accessToken.split(".");
  let parsedPayload = null;
  let decryptedPayload = null;
  try {
    decryptedSignature = AES.decrypt(signature, magicKey).toString(
      CryptoJS.enc.Utf8
    );
    decryptedPayload = Base64.decode(hashedPayload);
    parsedPayload = JSON.parse(decryptedPayload);
  } catch (e) {
    return false;
  }
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

const shallRefreshToken = (refreshToken) => {
  let parsedRefreshToken = null;
  let decryptedRefreshToken = null;

  try {
    decryptedRefreshToken = AES.decrypt(refreshToken, magicKey).toString(
      CryptoJS.enc.Utf8
    );

    parsedRefreshToken = JSON.parse(decryptedRefreshToken);
  } catch (e) {
    return false;
  }
  const currentDate = Date.now();
  if (parsedRefreshToken.exp > currentDate) {
    return true;
  } else {
    return false;
  }
};

app.get("/tokens", (req, res) => {
  const tokensObj = {
    tokens: {},
    isLogin: 0,
    tokenType: "access",
  };
  if (req.query.accessToken !== undefined) {
    let accessToken = JSON.stringify(req.query.accessToken).replace(/ /g, "+");
    if (isAccessTokenValid(accessToken)) {
      tokensObj.isLogin = 1;
    } else {
      res.status(401);
    }
  } else {
    let refreshToken = req.query.refreshToken.replace(/ /g, "+");
    if (shallRefreshToken(refreshToken)) {
      tokensObj.isLogin = 1;
      tokensObj.tokens.accessToken = createNewAccessToken();
    } else {
      tokensObj.tokenType = "refresh";
    }
  }
  res.json(tokensObj);
});

app.get("/filter", (req, response) => {
  let value = req.query.value.toUpperCase();
  const filterObj = { array: [] };
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
  const initialDataObj = {
    array: [],
  };
  let selectAll = db.query("SELECT * FROM projects", (err, res) => {
    initialDataObj.array = res.rows;
    response.json(initialDataObj);
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
      response.send(errObj);
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
