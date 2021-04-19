const data = [
  {
    img: "/imagesFromServer/spring-boot-7f2e24fb962501672cc91ccd285ed2ba.svg",
    title: "Spring Boot",
    content:
      "Takes an opinionated view of building Spring applications and gets you up and running as quickly as possible.",
  },
  {
    img:
      "/imagesFromServer/spring-framework-640ad1b04f7efa89e0f0f7353e6b5e02.svg",
    title: "Spring Framework",
    content:
      "Provides core support for dependency injection, transaction management, web apps, data access, messaging, and more.",
  },
  {
    img: "/imagesFromServer/spring-data-79cc203ed8c54191215a60f9e5dc638f.svg",
    title: "Spring Data",
    content:
      "Provides a consistent approach to data access – relational, non-relational, map-reduce, and beyond.",
  },
  {
    img: "/imagesFromServer/spring-cloud-81fe04ab129ab99da0e7c7115bb09920.svg",
    title: "Spring Cloud",
    content:
      " Provides a set of tools for common patterns in distributed systems. Useful for building and deploying microservices.",
  },
  {
    img:
      "/imagesFromServer/spring-data-flow-9eb1733b76b6cd62cbdd9bc9a2b04e56.svg",
    title: "Spring Cloud Data Flow",
    content:
      "Provides an orchestration service for composable data microservice applications on modern runtimes.",
  },
  {
    img:
      "/imagesFromServer/spring-security-b712a4cdb778e72eb28b8c55ec39dbd1.svg",
    title: "Spring Security",
    content:
      "Protects your application with comprehensive and extensible authentication and authorization support.",
  },
];

const express = require("express");
const app = express();
var cors = require("cors");
var bodyParser = require("body-parser");

var port = 5000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/data", function (request, response) {
  let value = request.query.value;

  let newData = data.filter((item) => {
    return (
      item.content.toUpperCase().includes(value.toUpperCase()) ||
      item.title.toUpperCase().includes(value.toUpperCase())
    );
  });
  response.send(newData);
});

app.post("/login", function (request, response) {
  if (request.body.username == "admin" && request.body.password == "1234") {
    response.sendStatus(202);
  } else {
    response.sendStatus(401);
  }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
