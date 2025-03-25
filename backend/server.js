require("dotenv").config()
const express = require("express");
const mariadb = require("mariadb");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const path = require("path");

const config = require('./json/config.json'); 
const fs = require("fs");

const app = express();
const serverPort = 3000; 
const secretKey = "jdsol00007537"; // JWT 서명 키

const usersFilePath = path.join(__dirname, "json", "users.json")


const pool = mariadb.createPool({
    host: config.Database.host,
    user: config.Database.DB_user,
    password: config.Database.DB_password,
    database: config.Database.DB_name,
    port: config.Database.DB_port,
    connectionLimit: 5
});



app.use(express.json());
app.use(cors());

// 로그인 API
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    console.log(req.body);

    // users.json 파일 읽기
    fs.readFile(usersFilePath, "utf8", (err, data) => {
        console.log("파일 경로:", usersFilePath);
        if (err) {
            console.error("파일 읽기 오류:", err);
            return res.status(500).json({error: "파일 읽기 오류"});
        }

        console.log("파일 내용:", data);  // 파일 내용 확인

        if (!data) {
            console.error("파일이 비어 있음");
            return res.status(400).json({error: "파일이 비어있습니다"});
        }

        try {

            const parsedData = JSON.parse(data);  // JSON 파싱
            console.log("파싱된 데이터:", parsedData);

            if (!parsedData.users) {
                console.error("users 키가 없음");
                return res.status(400).json({ error: "users 키가 존재하지 않습니다" });
            }

            const users = parsedData.users;
            console.log("유저 목록:", users);
    
            const user = users.find((user) => user.username === username && user.password === password);
    
            if (user) {
                const token = jwt.sign({ username }, secretKey, { expiresIn: "1h" });
                res.json({ token });
            } else {
                res.status(401).json({ message: "아이디 또는 비밀번호가 일치하지 않습니다."});
            }
        } catch (err) {
            return res.status(500).json({error: "JSON 파싱 오류"});
        }

    });

});



app.get("/branch", async (req, res) => {
    let conn;
    try {
        conn = await pool.getConnection();
        const rows = await conn.query("SELECT * FROM branch");
        console.log("DB조회 결과: ", rows);
        res.json(rows);
    } catch (err) {
        console.error("DB 오류:", err);
        res.status(500).json({ error: "Database error"});
    } finally {
        if (conn) conn.release(); // 연결 반환
    }
});

app.listen(serverPort, () => {
    console.log(`server running on http://111.111.111.11:${serverPort}`)
});