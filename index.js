const mysql = require('mysql');
const express = require('express');
const bodyparser = require('body-parser');
const { query } = require('express');
let app = express()

let port = 8080

app.use(bodyparser.json())

//Прописываем конфиг для коннекта с бд
let mysqlConnection = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'root',
    database:'db_roles'
})
//Коннектимся с бд
mysqlConnection.connect((err) => {
    let currentStrDate = "["+new Date().toLocaleDateString()+"]["+ new Date().toLocaleTimeString()+"]"
    console.log((!err)?currentStrDate+"[SUCCESS] DB is conected!":currentStrDate+"[EROR] Failed connection to DB!\nCODE: "+JSON.stringify(err, undefined, 2))
})
//Генерим таблицу до запуска сервака :3
mysqlConnection.query('CREATE TABLE if not exists `users` (`id` INT NOT NULL AUTO_INCREMENT PRIMARY KEY, `user_id` VARCHAR(255) UNIQUE NOT NULL, `role` VARCHAR(255) NOT NULL);',
    (err) => {
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+ new Date().toLocaleTimeString()+"]"
        console.log((!err)?currentStrDate+"[SUCCESS] Created DB!":currentStrDate+"[EROR] Failed to creating DB!\nCODE: "+JSON.stringify(err, undefined, 2))
    })

//Страртуем
app.listen(port, ()=> console.log("[SUCCESS] Server started on port "+ port))













//Получить всю таблицу
app.get('/', (req, res) => {
    let query = "SELECT * FROM `users`"

    mysqlConnection.query(query,
    (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows)
        else
            res.status(500).send("Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+ new Date().toLocaleTimeString()+"]"
        console.log((!err)?currentStrDate+"[SUCCESS] Query from / [->] "+query:currentStrDate+"[EROR] Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
    })
})
//Вытащить юзера по его id
app.get('/getuser/:user_id', (req, res) => {
    let query = "SELECT * FROM `users` where user_id = ?"
    mysqlConnection.query(query,[req.params.user_id],
    (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows)
        else
            res.status(500).send("Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+new Date().toLocaleTimeString()+"]"
        console.log((!err)?currentStrDate+"[SUCCESS] Query from / [->] "+query:currentStrDate+"[EROR] Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
    })
})

//Вытащить пользователей с заданной ролью
app.get('/getrole/:role', (req, res) => {
    let query = "SELECT * FROM `users` where role = ?"
    mysqlConnection.query(query,[req.params.role],
    (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows)
        else
            res.status(500).send("Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+new Date().toLocaleTimeString()+"]"
        console.log((!err)?+currentStrDate+"[SUCCESS] Query from / [->] "+query:currentStrDate+"[EROR] Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
    })
})

//Добавить
app.post('/add', (req, res) => {
    let query = "INSERT INTO `users`(`user_id`, `role`) VALUES (?,?)"   
    mysqlConnection.query(query,[req.body.user_id, req.body.role],
    (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows)
        else
            res.status(500).send("Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+new Date().toLocaleTimeString()+"]"
        console.log((!err)?currentStrDate+"[SUCCESS] Query from / [->] "+query:currentStrDate+"[EROR] Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
    })
})

//Удалить юзера
app.post('/deluser', (req, res) => {
    let query = "DELETE FROM `users` WHERE `user_id` = ?"   
    mysqlConnection.query(query,[req.body.user_id],
    (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows)
        else
            res.status(500).send("Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+new Date().toLocaleTimeString()+"]"
        console.log((!err)?currentStrDate+"[SUCCESS] Query from / [->] "+query:currentStrDate+"[EROR] Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
    })
})


//Удалить все записи имеющие указанную роль
app.post('/delrole', (req, res) => {
    let query = "DELETE  FROM `users` WHERE `role` = ?"   
    mysqlConnection.query(query, [req.body.role],
    (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows)
        else
            res.status(500).send("Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+new Date().toLocaleTimeString()+"]"
        console.log((!err)?currentStrDate+"[SUCCESS] Query from / [->] "+query:currentStrDate+"[EROR] Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
    })
})

//Обновить роль у юзера
app.post('/updaterole', (req, res) => {
    let query = "UPDATE users SET role = ? WHERE user_id = ?"   
    mysqlConnection.query(query, [req.body.role, req.body.user_id],
    (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows)
        else
            res.status(500).send("Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+new Date().toLocaleTimeString()+"]"
        console.log((!err)?currentStrDate+"[SUCCESS] Query from / [->] "+query:currentStrDate+"[EROR] Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
    })
})

//Переименовать роль
app.post('/renamerole', (req, res) => {
    let query = "UPDATE users SET role = ? WHERE role = ?"   
    mysqlConnection.query(query, [req.body.new_role, req.body.role],
    (err, rows, fields) => {
        if (!err)
            res.status(200).send(rows)
        else
            res.status(500).send("Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
        let currentStrDate = "["+new Date().toLocaleDateString()+"]["+new Date().toLocaleTimeString()+"]"
        console.log((!err)?currentStrDate+"[SUCCESS] Query from / [->] "+query:currentStrDate+"[EROR] Failed to execute query | "+query+" |\nCODE: "+JSON.stringify(err, undefined, 2))
    })
})







//Панель для редактирования чтобы не лезть в phpmyAdmin
app.get('/panel', (req, res) => {
    res.sendFile(__dirname + "/index.html");
})