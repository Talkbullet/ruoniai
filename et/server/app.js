const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(cors());
const mysql = require("mysql");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(express.json());


const con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "electronic",
});


//CREATE
app.post("/server/suppliers", (req, res) => {
    const sql = `
    INSERT INTO electricity_suppliers (title, price)
    VALUES (?, ?)
    `;
    con.query(sql, [req.body.title, req.body.price], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.post("/server/consumers", (req, res) => {
    const sql = `
    INSERT INTO electricity_consumers (name, surname, counter_number, supplier_id)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.name, req.body.surname, req.body.number, req.body.supplier], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.post("/server/bills", (req, res) => {
    const sql = `
    INSERT INTO bills (consumer_id, invoice, kwh, total)
    VALUES (?, ?, ?, ?)
    `;
    con.query(sql, [req.body.consumerId, req.body.invoice, req.body.kwh, req.body.total], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//READ ALL
app.get("/server/suppliers", (req, res) => {
    const sql = `
    SELECT *
    FROM electricity_suppliers
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/server/consumers", (req, res) => {
    const sql = `
    SELECT *
    FROM electricity_consumers
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/server/all", (req, res) => {
    const sql = `
    SELECT title, c.*, s.id AS sid, price
    FROM electricity_suppliers AS s
    INNER JOIN electricity_consumers AS c
    ON c.supplier_id = s.id
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.get("/server/bills", (req, res) => {
    const sql = `
    SELECT b.*, name, surname, title, s.id AS sid
    FROM bills AS b
    INNER JOIN electricity_consumers AS c
    ON b.consumer_id = c.id
    INNER JOIN electricity_suppliers AS s
    ON c.supplier_id = s.id
    `;
    con.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//DELETE
app.delete("/server/suppliers/:id", (req, res) => {
    const sql = `
    DELETE FROM electricity_suppliers
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.delete("/server/consumers/:id", (req, res) => {
    const sql = `
    DELETE FROM electricity_consumers
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.delete("/server/bills/:id", (req, res) => {
    const sql = `
    DELETE FROM bills
    WHERE id = ?
    `;
    con.query(sql, [req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

//EDIT
app.put("/server/suppliers/:id", (req, res) => {
    const sql = `
    UPDATE electricity_suppliers
    SET title = ?, price = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.title, req.body.price, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});
app.put("/server/consumers/:id", (req, res) => {
    const sql = `
    UPDATE electricity_consumers
    SET name = ?, surname = ?, counter_number = ?, supplier_id = ?
    WHERE id = ?
    `;
    con.query(sql, [req.body.name, req.body.surname, req.body.number, req.body.supplier, req.params.id], (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});




app.listen(port, () => {
    console.log(`Elektra teka per ${port} portą!`)
});






// // READ
// // SELECT column1, column2, ...
// // FROM table_name;

// // app.get("/trees/:tipas", (req, res) => {

// //     // console.log(req.query.sort);

// //     const sql = `
// //     SELECT id, type, title, height
// //     FROM trees
// //     WHERE type = ? OR type = ?
// //     `;
// //     con.query(sql, [req.params.tipas, req.query.sort], (err, result) => {
// //         if (err) throw err;
// //         res.send(result);
// //     });
// // });

// // INNER JOIN
// // SELECT column_name(s)
// // FROM table1
// // INNER JOIN table2
// // ON table1.column_name = table2.column_name;
// app.get("/get-it/inner-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     INNER JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/left-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     LEFT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// app.get("/get-it/right-join", (req, res) => {
//     const sql = `
//     SELECT c.id, p.id AS pid, name, phone
//     FROM clients AS c
//     RIGHT JOIN phones AS p
//     ON c.id = p.client_id
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });





// // READ (all)
// app.get("/trees", (req, res) => {
//     const sql = `
//     SELECT id, type, title, height
//     FROM trees
//     `;
//     con.query(sql, (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });

// //CREATE
// // INSERT INTO table_name (column1, column2, column3, ...)
// // VALUES (value1, value2, value3, ...);
// app.post("/trees", (req, res) => {
//     const sql = `
//     INSERT INTO trees (title, height, type)
//     VALUES (?, ?, ?)
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //DELETE
// // DELETE FROM table_name WHERE condition;
// app.delete("/trees/:id", (req, res) => {
//     const sql = `
//     DELETE FROM trees
//     WHERE id = ?
//     `;
//     con.query(sql, [req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });


// //EDIT
// // UPDATE table_name
// // SET column1 = value1, column2 = value2, ...
// // WHERE condition;
// app.put("/trees/:id", (req, res) => {
//     const sql = `
//     UPDATE trees
//     SET title = ?, height = ?, type = ?
//     WHERE id = ?
//     `;
//     con.query(sql, [req.body.title, req.body.height, req.body.type, req.params.id], (err, result) => {
//         if (err) throw err;
//         res.send(result);
//     });
// });