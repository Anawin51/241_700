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
