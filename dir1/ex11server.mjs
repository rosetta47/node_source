// http 모듈을 이용해 웹 서버 구축 가능
import http from 'http'; //웹 관련 모듈

http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type':'text/html;charset=utf-8'});
    res.write('<h1>반가워요. 노드 서버 세상에 오신것을 </h1>');
    res.write('환영합니다');
    res.end('<p>Hello~😜</p>'); // end :  응답 종료
   // res.write('하이하이');
    
})
.listen(8080, () =>{ // 무한루프, 서버 8080
    console.log('서버 서비스 중...')
})