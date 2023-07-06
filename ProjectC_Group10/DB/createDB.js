const sql = require("./db");
const path = require("path");
const csv = require("csvtojson");

// create database for all tables
const createDb = (req, res) => {
    const q = `CREATE DATABASE IF NOT EXISTS web`;
    sql.query(q, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        }
        console.log("created db web");
        return;
    });
};

//drop database for all tables
const dropDb = (req, res) => {
    const q = `DROP DATABASE IF EXISTS web`;
    sql.query(q, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        }
        console.log("dropped db web");
        res.status(200).send("dropped db web");
    });
};

// users table
const createUsersTable = (req, res) => {
    const q = `CREATE TABLE IF NOT EXISTS web.users(
        id INT NOT NULL AUTO_INCREMENT,
        firstname VARCHAR(50) NOT NULL,
        lastname VARCHAR(50) NOT NULL,
        email VARCHAR(50) NOT NULL,
        password VARCHAR(50) NOT NULL,
        phone VARCHAR(50) NOT NULL,
        birth_date DATE,
        UNIQUE KEY email (email),
        PRIMARY KEY (id)
    )`;
    sql.query(q, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
            return;
        }
        console.log("created table users");
        return;
    });
};

const insertData = (req, res) => {
    let q = `INSERT INTO web.users SET ?`;
    let csvFilePath = path.join(__dirname, "data/users.csv");
    csv()
        .fromFile(csvFilePath)
        .then((obj) => {
            obj.forEach((element) => {
                var newItem = {
                    id: element.id,
                    firstname: element.firstname,
                    lastname: element.lastname,
                    email: element.email,
                    password: element.password,
                    phone: element.phone,
                    birth_date: element.birth_date,
                };
                sql.query(q, newItem, (err, mysqlres) => {
                    if (err) {
                        console.log(err);
                        res.status(400).send({ err });
                        return;
                    }
                    console.log("created user successfully");
                    return;
                });
            });

            q = `INSERT INTO web.dogs SET ?`;
            csvFilePath = path.join(__dirname, "data/dogs.csv");
            csv()
                .fromFile(csvFilePath)
                .then((obj) => {
                    obj.forEach((element) => {
                        var newItem = {
                            id: element.id,
                            name: element.name,
                            age: element.age,
                            gender: element.gender,
                            type: element.type,
                            status: element.status,
                            size: element.size,
                            area: element.area,
                            description: element.description,
                            image: element.image,
                            owner: element.owner,
                        };

                        sql.query(q, newItem, (err, mysqlres) => {
                            if (err) {
                                console.log(err);
                                res.status(400).send({ err });
                                return;
                            }
                            console.log("created dog successfully");
                            return;
                        });
                    });
                });
        });
};

// dogs table
const createDogsTable = (req, res) => {
    const q = `CREATE TABLE IF NOT EXISTS web.dogs(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        age INT NOT NULL,
        gender CHAR NOT NULL,
        type VARCHAR(50) NOT NULL,
        status VARCHAR(50) NOT NULL,
        size VARCHAR(20) NOT NULL,
        area VARCHAR(50) NOT NULL,
        description TEXT,
        image TEXT,
        owner INT NOT NULL,
        PRIMARY KEY (id),
        FOREIGN KEY (owner) REFERENCES web.users(id)
    )`;
    sql.query(q, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
            return;
        }
        console.log("created table dogs");
        return;
    });
};

// contact_us table
const createContactUsTable = (req, res) => {
    const q = `CREATE TABLE IF NOT EXISTS web.contact_us(
        id INT NOT NULL AUTO_INCREMENT,
        name VARCHAR(50) NOT NULL,
        email VARCHAR(100) NOT NULL,
        message TEXT NOT NULL,
        PRIMARY KEY (id)
    )`;
    sql.query(q, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
            return;
        }
        console.log("created table contact_us");
        return;
    });
};

// inital Datbase
initDb = (req, res) => {
    createDb();

    // create tables
    createUsersTable();
    createDogsTable();
    createContactUsTable();

    // insert data to tables
    insertData();

    res.status(200).send("DB init finished successfully");
};

module.exports = {
    initDb,
    dropDb,
};
