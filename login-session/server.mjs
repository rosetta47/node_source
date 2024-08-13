import express from 'express';
import session from 'express-session'; // 세션 모듈
import bodyParser from 'body-parser'; // 요청 본문 파싱용 모듈
import path from 'path'; // 경로 조작을 위한 모듈
import { fileURLToPath } from 'url'; //url를 파일경로로 변환하는 모듈

const __filename = fileURLToPath(import.meta.url); //기본문법
const __dirname = path.dirname(__filename); //기본문법

const app = express()
const PORT = 3000;

//bodyParser.urlencoded() 미들웨어 설정(유틸리티를 추가했다고 생각하면 되). 주로 전송된 폼데이터를 파싱
app.use(bodyParser.urlencoded({extended:true}))  //데이터 파싱 방법을 결정

// session 미들웨어 설정()
app.use(session({
    secret:'secret-key', // 세션 암호화를 위한 비밀 키 설정
    resave:false, // 세션이 수정되지 않은 경우에도 세션을 다시 설정 유무
    saveUninitialized:true, //초기화되지 않은 저장 여부
    cookie:{maxAge:30 * 60 * 1000} //세션 유효 시간은 30분(기본)
}));

app.set('view engine','ejs');
app.set('views', path.join(__dirname, 'views'));

// DB랑 로그인 연결해야되 원래는
const auth = {
    id:'kor',
    password:'111'
};
//get
app.get('/', (req,res) => { //root로 접속하면
    res.sendFile(path.join(__dirname, 'login.html')); // 로그인 페이지 호출
});
// post
app.post('/login', (req,res) => { 
  const {id, password} = req.body;

  if(id === auth.id && password === auth.password){
     req.session.user = id; // 세션에 사용자 id를 저장함(30분)
     res.redirect('/main'); //로그인 성공시 메인 페이지로 리다이렉션

  }else{
    res.send('로그인 실패 <a href="/">다시 시도</a>');
  }
});

app.get('/main', (req,res) => {
    // 사용자가 로그인 한 경우에 main.ejs 파일을 호출
    if(req.session.user){
        res.render('main',{sessionID:req.sessionID});
    }else{
        res.send('접근 권한이 없음 <a href="/">로그인</a>');
    }
});

// 세션 삭제중 오류가 있으면 메인으로 돌아감
app.get('/logout', (req,res) => {
    req.session.destroy(err =>{ // 세션을 삭제
        if(err){

            return res.redirect('/main');
        }
    })

    res.clearCookie('connect.sid'); // 세션 쿠키도 삭제
    res.redirect('/');
});

// listen
app.listen(PORT, () => {
    console.log(`http://localhost:${PORT} 로 서비스 시작...`)
});