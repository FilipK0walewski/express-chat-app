CREATE TABLE users (
    id int primary key generated always as identity,
    username varchar(50) unique not null,
    password text
);