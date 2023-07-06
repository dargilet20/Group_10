const sql = require("./db");

const login = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "body is missing",
        });
    }

    const { email, password } = req.body;
    const q = `SELECT * FROM web.users WHERE email = '${email}' AND password = '${password}' LIMIT 1`;

    sql.query(q, (err, data, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        } else if (data.length) {
            console.log("user logged in", req.body);
            const loggedInUser = JSON.parse(JSON.stringify(data[0]));
            res.cookie("loggedInUser", loggedInUser);
            res.status(200).send(loggedInUser);
        } else {
            res.status(401).send({
                message: "user was not found",
            });
        }
    });
};

const logout = function (req, res) {
    res.clearCookie("loggedInUser");
    res.render("welcome");
};

const signUp = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "body is missing",
        });
    }

    const { email, password, firstname, lastname, phone, birthDate } = req.body;
    const q = `INSERT INTO web.users set ?`;

    const newUser = {
        firstname,
        lastname,
        email,
        password,
        phone,
        birth_date: birthDate,
    };

    sql.query(q, newUser, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        }
        console.log("created new user", req.body);
        newUser.id = mysqlres.insertId;
        res.status(200).json(newUser);
    });
};

const contactUs = function (req, res) {
    if (!req.body) {
        res.status(400).send({
            message: "body is missing",
        });
    }

    const { name, email, message } = req.body;
    const q = `INSERT INTO web.contact_us set ?`;

    const newMessage = {
        name,
        email,
        message,
    };

    sql.query(q, newMessage, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        }
        console.log("created new message", req.body);
        newMessage.id = mysqlres.insertId;
        res.status(200).json(newMessage);
    });
};

const getDogs = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    }
    const q = `SELECT * FROM web.dogs WHERE owner = ${req.cookies.loggedInUser.id}`;
    sql.query(q, (err, data, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        } else if (!data?.length) {
            res.status(400).send({
                message: "dogs were not found",
            });
        } else {
            res.status(200).json(data);
        }
    });
};

const searchDogs = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    } else if (!req.body) {
        res.status(400).send({
            message: "body is missing",
        });
    }

    let q = `SELECT * FROM web.dogs`;
    if (
        !!req.body.type ||
        !!req.body.size ||
        !!req.body.gender ||
        !!req.body.area
    ) {
        q += ` WHERE `;
    }
    if (req.body.type) {
        q += `type = '${req.body.type}' AND `;
    }
    if (req.body.size) {
        q += `size = '${req.body.size}' AND `;
    }
    if (req.body.gender) {
        q += `gender = '${req.body.gender}' AND `;
    }
    if (req.body.area) {
        q += `area = '${req.body.area}' AND `;
    }

    if (q.endsWith(" AND ")) {
        q = q.substring(0, q.length - 5);
    }

    sql.query(q, (err, data, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        } else if (!data?.length) {
            res.status(400).send({
                message: "dogs were not found",
            });
        } else {
            res.status(200).json(data);
        }
    });
};

const deleteDog = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    } else if (!req.query.id) {
        res.status(400).send({
            message: "dog id is required",
        });
    }
    const q = `DELETE FROM web.dogs WHERE id = ${req.query.id}`;
    sql.query(q, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({
                message: "dog could not be deleted",
            });
        }
        res.status(200).json({});
    });
};

const getProfile = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    }
    const q = `SELECT * FROM web.users WHERE id = ${req.cookies.loggedInUser.id} LIMIT 1`;
    sql.query(q, (err, data, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        } else if (!data?.length) {
            res.status(400).send({
                message: "user was not found",
            });
        }
        res.status(200).json(JSON.parse(JSON.stringify(data[0])));
    });
};

const updateProfile = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    } else if (!req.body) {
        res.status(400).send({
            message: "body is missing",
        });
    }

    const { email, password, firstname, lastname, phone, birthDate } = req.body;
    const q = `UPDATE web.users set ? WHERE id = ${req.cookies.loggedInUser.id}`;

    const updateUser = {
        firstname,
        lastname,
        email,
        password,
        phone,
        birth_date: birthDate,
    };

    sql.query(q, updateUser, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        }
        console.log("updated user details", req.body);
        res.status(200).json(updateUser);
    });
};

const getDogById = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    } else if (!req.query.id) {
        res.status(400).send({
            message: "dog id is missing",
        });
    }

    const q = `SELECT * FROM web.dogs WHERE id = ${req.query.id}`;
    sql.query(q, (err, data, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        } else if (!data?.length) {
            res.status(400).send({
                message: "dog was not found",
            });
        }
        res.status(200).json(JSON.parse(JSON.stringify(data[0])));
    });
};

const getDogOwnerByDogId = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    } else if (!req.query.id) {
        res.status(400).send({
            message: "dog id is missing",
        });
    }

    const q = `SELECT users.* FROM web.users
    JOIN web.dogs ON dogs.owner = users.id
    WHERE dogs.id = ${req.query.id}`;
    sql.query(q, (err, data, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        } else if (!data?.length) {
            res.status(400).send({
                message: "owner was not found",
            });
        }
        res.status(200).json(JSON.parse(JSON.stringify(data[0])));
    });
};

const createDog = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    } else if (!req.body) {
        res.status(400).send({
            message: "body is missing",
        });
    }

    const q = `INSERT INTO web.dogs set ?`;

    const createDog = {
        ...req.body,
        owner: req.cookies.loggedInUser.id,
    };

    sql.query(q, createDog, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        }
        console.log("created dog details", req.body);
        createDog.id = mysqlres.insertId;
        res.status(200).json(createDog);
    });
};

const updateDog = function (req, res) {
    if (!req.cookies.loggedInUser) {
        res.status(400).send({
            message: "please login first",
        });
    } else if (!req.body) {
        res.status(400).send({
            message: "body is missing",
        });
    }

    const q = `UPDATE web.dogs set ? WHERE id = ${req.body.id}`;

    const updateDog = {
        ...req.body,
        owner: req.cookies.loggedInUser.id,
    };

    sql.query(q, updateDog, (err, mysqlres) => {
        if (err) {
            console.log(err);
            res.status(400).send({ err });
        }
        console.log("updated dog details", req.body);
        res.status(200).json(updateDog);
    });
};

module.exports = {
    login,
    logout,
    signUp,
    contactUs,
    getDogs,
    getDogById,
    getDogOwnerByDogId,
    searchDogs,
    createDog,
    updateDog,
    deleteDog,
    getProfile,
    updateProfile,
};
