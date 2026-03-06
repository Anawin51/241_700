/*
// ทำการ import โมดูล http
const http = require('http');
const host = 'localhost';
const port = 8000;

// กำหนดค่า server
const requestListener = function (req, res) {
    res.writeHead(200);
    res.end('Hello, World! This is my first server.');
}

// run server
const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
*/

/**
 GET /users - ดึงข้อมูลใช้ทั้งหมด
 POST /users - เพิ่มผู้ใช้ใหม่
 GET /users/:id - ดึงข้อมูลผู้ใช้ตาม ID
 PUT /users/:id - แก้ไขข้อมูลผู้ใช่ตาม ID ที่บันทึก
 DELETE /users/:id - ลบผู้ใช้ตาม ID ที่บันทึก
 */

 /*
//path: = GET/users
app.get('/users', (req, res) => {
    res.json(users);
});

// path: = POST/user
app.post('/user', (req, res) => {
    let user = req.body;

    user.id = counter++;
    users.push(user);

    res.json({
        message: 'User added successfully',
        user: user
    });
});

// path: = PUT /user/:id
app.patch('/user/:id', (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;

    // หา user ที่จาก id ที่ส่งมา
    let selectedIndex = users.findIndex(user => user.id == id);

    if (selectedIndex === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    if (updateUser.firstname) {
        users[selectedIndex].firstname = updateUser.firstname;
    }

    if (updateUser.lastname) {
        users[selectedIndex].lastname = updateUser.lastname;
    }

    res.json({
        message: 'User updated successfully',
        user: users[selectedIndex]
    });
    // ส่ง users ที่อัพเดตแล้วกลับไป
});

app.delete('/users/:id', (req, res) => {
    let id = req.params.id;

    // หา index จาก id ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id);

    // ลบ user ออกจาก users
    users.splice(selectedIndex, 1);

    res.json({
        message: 'User deleted successfully',
        indexDelete: selectedIndex
    })
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
*/

const express = require('express');
const bodyParser = require('body-parser');
const mysql2 = require('mysql2/promise');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 8000;
let conn;

// ================= CONNECT DATABASE =================

const initDB = async () => {
    conn = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });

    console.log('Connected to MySQL database');
};


// ================= TEST DATABASE =================

app.get('/testdb', async (req, res) => {
    try {
        const result = await conn.query('SELECT * FROM users');
        res.json(result[0]);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


// ================= GET ALL USERS =================

app.get('/users', async (req, res) => {
    try {
        const results = await conn.query('SELECT * FROM users');
        res.json(results[0]);
    } catch (error) {
        res.status(500).json({
            message: 'Error fetching users'
        });
    }
});


// ================= GET USER BY ID =================

app.get('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;

        const result = await conn.query(
            'SELECT * FROM users WHERE id = ?',
            [id]
        );

        if (result[0].length === 0) {
            return res.status(404).json({
                message: 'User not found'
            });
        }

        res.json(result[0][0]);

    } catch (error) {
        res.status(500).json({
            message: 'Error fetching user'
        });
    }
});


// ================= CREATE USER =================

app.post('/users', async (req, res) => {
    try {
        let user = req.body;

        const result = await conn.query(
            `INSERT INTO users 
            (firstname, lastname, age, gender, interests, description) 
            VALUES (?, ?, ?, ?, ?, ?)`,
            [
                user.firstname,
                user.lastname,
                user.age,
                user.gender,
                user.interests,
                user.description
            ]
        );

        res.json({
            message: 'User added successfully',
            insertId: result[0].insertId
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Error adding user'
        });
    }
});


// ================= UPDATE USER =================

app.put('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;
        let user = req.body;

        const result = await conn.query(
            `UPDATE users 
            SET firstname=?, lastname=?, age=?, gender=?, interests=?, description=? 
            WHERE id=?`,
            [
                user.firstname,
                user.lastname,
                user.age,
                user.gender,
                user.interests,
                user.description,
                id
            ]
        );

        res.json({
            message: 'User updated successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error updating user'
        });
    }
});


// ================= DELETE USER =================

app.delete('/users/:id', async (req, res) => {
    try {
        let id = req.params.id;

        await conn.query(
            'DELETE FROM users WHERE id = ?',
            [id]
        );

        res.json({
            message: 'User deleted successfully'
        });

    } catch (error) {
        res.status(500).json({
            message: 'Error deleting user'
        });
    }
});


// ================= START SERVER =================

app.listen(port, async () => {
    await initDB();
    console.log(`Server running at http://localhost:${port}`);
});