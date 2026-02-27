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

/*
const express = require('express');
const app = express();
const port = 8000;
app.use(express.json());

let users = [];
let counter = 1;

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
const app = express();

app.use(bodyParser.json());

const port = 8000;

const  initDB = async () => {
    conn = await mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    });
    console.log('Connected to Mysql database');
}

app.get('/testdb', (req, res) => {
    mysql2.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'webdb',
        port: 8700
    }).then((conn) => {
        conn.query('SELECT * FROM users')
            .then((result) => {
                res.json(result[0]);
            })
            .catch((err) => {
                res.json({ error: err.message });
            });
    }).catch((err) => {
        res.json({ error: err.message });
    });
});

app.get('/testdb-new', async (req, res) => {
    try {
        const conn = await mysql2.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'root',
            database: 'webdb',
            port: 8700
    }); 
    const result = await conn.query('SELECT * FROM users');
    res.json(result[0]);
    } catch (err) {
        console.error('Error connecting to the database:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

let users =[];
let counter = 1;


//path: = GET /users ดึงข้อมูล user ทั้งหมด
app.get('/users', async (req, res) => {
    const results = await conn.query('SELECT * FROM users');
    res.json(results[0]);
});
//path: = POST /users ดึงข้อมูล user ทั้งหมด
app.post('/users', async (req, res) => {
    let user = req.body;
    const result = await conn.query('INSERT INTO users (firstname, lastname) VALUES (?, ?)', [user.firstname, user.lastname]);
})

//path: = Post/ users สำหรับเพิ่ม user ใหม่
app.post('/users', async (req, res) => {
    try{
        let user = req.body;
        const result = await conn.query('INSERT INTO users SET ?', user);
        console.log('result: ',result);
        res.json({
            message: 'User added successfully',
            data: result[0]
        });
    } catch (error) {
        console.error('Error adding user: ', error);
        res.status(500).json({ message: 'Error adding user' });
    }
});

//PATH : = GET /user/:id ดึงข้อมูล user จาก id
app.get('/user/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await conn.query('SELECT * FROM users WHERE id = ?', [id]);
        if (result[0].length === 0) {
            throw { message: 'User not found' };
        }
        res.json(result[0][0]);
    } catch (error) {
        console.error('Error fetching user: ', error);
        res.status(500).json({ message: 'Error fetching user' });
    }
});

//path: = PUT /users/:id อัพเดตข้อมูล user จาก id
app.put('/users/:id', async (req, res) => {
    let id = req.params.id;
    let updateUser = req.body;
    const result = await conn.query('UPDATE users SET ? WHERE id = ?', [updateUser, id]);
    res.json({
        message: 'User updated successfully',
        data: result[0]
    });
})

//path = DELETE /users/:id ลบ user จาก id
app.delete('/users/:id', async (req, res) => {
    try{
        let id = req.params.id;
        const result = await conn.query('DELETE FROM users WHERE id = ?', [id]);
        res.json({
            message: 'User deleted successfully',
            data: result[0]
        });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

//path: = POST /user
app.post('/user',(req,res) => {
    let user = req.body;
    user.id = counter
    counter += 1;

    users.push(user);
    res.json({
    message: 'user added successfully',
    user: user
    });
})
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

app.delete('/user/:id',(req,res) => {
    let id = req.params.id;
    // หา index จาก id  ที่ต้องการลบ
    let selectedIndex = users.findIndex(user => user.id == id);
    

   //ลบuser ออกจาก users
   users.splice(selectedIndex, 1);
   res.json({
            message:'user deleted successfully',
            indexDelete: selectedIndex
   });
})

app.listen(port, async() => {
    await initDB();
    console.log(`Server is running on http://localhost:${port}`);
});
