import {promises as fs} from 'fs'
//fs 모듈은 기본적으로 콜백 형식으로 사용.
// 그래서 promises형식으로 바꿔주는 방식을 사용함.
const ss = '파일로 저장된 문서. 장소 3강';

fs.writeFile('./ex3write.txt', ss)
.then(() => {
    return fs.readFile('./ex3write.txt');
})
.then((data) => {
    console.log(data.toString());
})
.catch((err) => {
    console.log('err', err);
})

// 평가시험 연습
function add(num1, num2){
    return num1 + num2;
}

function main(operator){
    const result = operator(4, 7);
    console.log(result);
}



function fetchData(){
    console.log('3강만세');
 }
 
 var timerVar = setTimeout( timer, 3000);

 fs.readFile('./example.txt')
 .then((data) => {
 console.log('노드여 영원하라', data.toString());
 return fs.readFile('./example.txt');
 })
 
