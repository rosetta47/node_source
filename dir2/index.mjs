// express 모듈 사용
//웹 서버를 생성하는 것과 관련된 기능을 담당하는 프레임워크
//웹 애플리케이션을 만들기 위한 각종 메소드와 미들웨어 등이 내장되어 있다.
//http 모듈만 사용해서 서버를 구성할 수도 있지만, 이 경우엔 직접 설정해야 하는것들이 많아짐
//이로 인해 사용하는 것이 바로 Express 모듈 !! npm install express
// nodemon 모듈 : 서버 재시작 없이 코드를 자동 반영할 수 있다. npm install nodemon --save-dev
// package.json 에서 "start":"nodemon index.mjs" 써준다

import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url'; // 현재 모듈의 파일과 디렉토리 경로를 설정 시 사용

//==========================여기부터 환경 설정 시작
// cors 문제 해결용
import cors from 'cors'; // cors 문제 해결용 방법1하고 
const app = express();
app.use(cors()); // cors 문제 해결용 방법2까지 해야지 cors 해결된다.

// 환경 변수 PORT가 존재하면 그 값을 사용하고, 아니면 3000을 사용하겠다는 의미
app.set('port', process.env.PORT || 3000);


// 현재 폴더를 지정 : __dirname을 ECM(ECMAScript Module) 환경에서 사용하기
const __filename = fileURLToPath(import.meta.url); // 현재 실행 중인 파일 경로를 얻을 수 있음
const __dirname = path.dirname(__filename); // 현재 실행 중인 폴더 경로
// ====================여기까지 환경 설정 끝

// app.get(요청, 라우팅처리)
app.get('/', function(req, res){
    res.send('안녕하세요!! 반가워서 😍');
});
app.get('/java', (req, res) => {
    res.send('<h2>Hello Java!!</h2>')
});

app.get('/node', (req, res) => {
    res.send('<a href="https://cafe.daum.net/flowlife">Data 학습장!!</a>');
});

//html
app.get('/abc', (req, res) => {
    res.sendFile(path.join(__dirname, 'abc.html')); // 현재 폴더의 abc.html 호출
});

// json
app.get('/json', (req, res) => {
    res.send({'이름':'한국인'}); 
});

// 요청명?변수=값 인 경우는 req.query로 받는다.
// url 경로에 정보가 담긴 경우 추출 http://localhost:3000/singer/iu/7
app.get('/user/:bun/:irum', (req, res) => {
    const {bun, irum} = req.params;

    res.json({bun, irum}); 
});

// `http://localhost:3000/user/winter
app.get('/user/:season', (req, res) => {
    const {season} = req.params;

    if(season === 'summer'){
        res.json({'season':'더워'}); 
    }else if(season === 'winter'){
        res.json({'season':'추워'}); 
    }else{
        res.json({'season':'만족해'}); 
    }
});

app.get('/test', (req, res) => {
    res.sendFile(path.join(__dirname, 'test.html')); 
});



//console.log('3000번 포트 사용 서버 서비스 시작...');
//app.listen(3000);

app.listen(app.get('port'), () =>{
    console.log(app.get('port'), '번을 사용해 서버 서비스 중');
});