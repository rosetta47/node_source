import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import pool from "./db.mjs";

const __filename = fileURLToPath(import.meta.url); //import.meta.url : 현재 파일의 경로
const __dirname = path.dirname(__filename);

const app = express();

app.use(cors()); 
app.use(express.json()); 

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));

//요청이 들어옴
app.get('/', (req,res) => {
    res.send('자 그럼 요청을 해 볼까요~    /sangdata,/sangdata/2')
});

// 전체 자료 읽기 read all
app.get('/sangdata', async(req, res) => {
    try {
        // Mariadb 연결 풀에서 DB 연결을 하는 비동기 함수
        const conn = await pool.getConnection(); // 연결 객체

        const rows = await conn.query("select * from sangdata"); //sql문을 직접 써야되(node에서는)
        conn.release(); //연결을 해제
        console.log(rows);// rows 확인

        res.json(rows);
        
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

// 부분 자료 읽기 read one
app.get('/sangdata/:code', async(req, res) => {
    // 번호를 받아야지
    const {code} = req.params;

    try {
        // Mariadb 연결 풀에서 DB 연결을 하는 비동기 함수
        const conn = await pool.getConnection(); // 연결 객체

        const rows = await conn.query("select * from sangdata where code=?", [code]); //sql문을 직접 써야되(node에서는)
        conn.release(); //연결을 해제

        if(rows.length == 0){
            return res.status(404).json({error:'그런 자료는 없습니다.'})
        }
        console.log(rows);// rows 확인

        res.json(rows[0]); // 배열로 하나만 넘어가니까 이렇게 씀
        
    } catch (err) {
        res.status(500).json({error:err.message});
    }
});

//insert -> CRUD(create로 생각하면 되)
app.post('/sangdata', async(req, res) => {
    //넘어온 코드 
    const {code, sang, su, dan} = req.body;

    try {
        // Mariadb 연결 풀에서 DB 연결을 하는 비동기 함수
        const conn = await pool.getConnection(); // 연결 객체

        const result = await conn.query("insert into sangdata values(?,?,?,?)", [code, sang, su, dan]); 
        conn.release(); //연결을 해제
 
        res.status(201).json({code, sang, su, dan}); //성공:201
        // postman에 가서 POST 확인가능
        //Headers : Content-Type // application/json
        
    } catch (err) {
        res.status(500).json({error:err.message});// 500err
    }
});

// update
app.put('/sangdata/:code', async(req, res) => {
    const {code} = req.params;
    const {sang, su, dan} = req.body;

    try {
        // Mariadb 연결 풀에서 DB 연결을 하는 비동기 함수
        const conn = await pool.getConnection(); // 연결 객체

        const result = await conn.query("update sangdata set sang=?,su=?,dan=? where code=?", [sang, su, dan,code]); 
        conn.release(); //연결을 해제

        if(result.affectedRows === 0){
            res.status(404).json({error:'수정 대상 자료가 없어요'});
        }
 
        res.json({code, sang, su, dan}); //성공
       
    } catch (err) {
        res.status(500).json({error:err.message});// 500err
    }
});

// delete
app.delete('/sangdata/:code', async(req, res) => {
    const {code} = req.params;
  
    try {
        // Mariadb 연결 풀에서 DB 연결을 하는 비동기 함수
        const conn = await pool.getConnection(); // 연결 객체

        const result = await conn.query("delete from sangdata where code=?", [code]); 
        conn.release(); //연결을 해제

        if(result.affectedRows === 0){
            res.status(404).json({error:'삭제 대상 자료가 없어요'});
        }
 
        res.json({message:'delete success'}); //성공
       
    } catch (err) {
        res.status(500).json({error:err.message});// 500err
    }
});


app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트로 서버 서비스 시작중");
});
