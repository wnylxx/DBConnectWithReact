require("dotenv").config();
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json);

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

app.get("/", (req, res) => {
    res.send("MariaDB 연결 테스트 서버");
});

app.get("/data", async (req, res) => {
   try {
    const [rows] = await pool.query("SELECT * FROM branch");
    res.json(rows);
   } catch (error) {
    console.error(error);
    res.status(500).send("DB 조회 실패");
   }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`서버 실행중: http://localhost: ${PORT}`);
});