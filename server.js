db = require("./database.js");
const bcrypt = require("bcrypt");

const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");

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

app.post("/login", function (request, response) {
  if (request.body.username == "admin" && request.body.password == "1234") {
    response.sendStatus(202);
  } else {
    response.sendStatus(401);
  }
});

app.post("/signup", async function (request, response) {
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{4,}$/;
  const nameRegex = /^[A-Z]{1}[a-z]{2,}$/gm;
  const usernameRegex = /^[a-zA-Z0-9]{3,}$/;
  console.log(request.body);
  let errObj = {
    errors: [],
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

  console.log(errObj.errors);
  response.send(errObj.errors);
  const isCorrect = errObj.errors.reduce((a, b) => a + b, 0);
  console.log("'" + request.body.username + "'");
  const selectUser = db.query(
    "SELECT FROM users WHERE username=$1",
    ["'" + request.body.username + "'"],
    async (err, res) => {
      if (res.rowCount == 0 && isCorrect === 0) {
        const hashedPassword = await bcrypt.hash(request.body.password, 10);
        let selectAll = db.query(
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
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
