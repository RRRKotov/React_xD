create TABLE projects(
    id SERIAL PRIMARY KEY,
    img VARCHAR(255),
    title VARCHAR(255),
    content VARCHAR(255)
);


create TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    first_name VARCHAR(255),
    last_name VARCHAR(255),
    age INTEGER
);

"select * FROM projects WHERE UPPER(title) LIKE '%CLOUD%' OR UPPER(content) LIKE '%CLOUD%';"

