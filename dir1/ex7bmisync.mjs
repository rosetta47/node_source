// BMI 동기 방식으로 출력
// readline-sync 모듈을 설치 후 사용 npm install readline-sync

import {createRequire} from "module";
const require = createRequire(import.meta.url);
const readlineSync = require('readline-sync'); 
//  readline-sync 모듈을 사용하기 위해서는 위에 3줄이 필요하다.

// 터미널 인코딩 작업(windows 용)
if(process.platform == 'win32'){
    require('child_process').execSync('chcp 65001'); // utf-8로 전환 : 터미널의 코드 페이지를 UTF-8로 설정
}

console.log('BMI 계산기 시작');

// BMI 판정 기준 함수 작성
const getBmiCategory = (bmi) =>{ //bmi값을 가지고 와서 if 조건을 검
    if(bmi < 18.5) return '저체중';
    if(bmi >= 18.5 && bmi < 23) return '정상';
    if(bmi >= 23 && bmi <25 ) return '비만전단계';
    if(bmi >= 25 && bmi <30) return '1단계 비만';
    if(bmi >= 30 && bmi <35) return '2단계 비만';
    return '3단계 비만'
}

console.log('키 입력 받기 ');
const height = readlineSync.question('키(cm 단위): ');
console.log(`입력 받은 키 : ${height}`);

console.log('몸무게 입력 받기 ');
const weight = readlineSync.question('몸무게(kg 단위) :');
console.log(`입력 받은 몸무게: ${weight}`);
// 단위 변환
const heightMeters = parseFloat(height) /100;
const weightKg = parseFloat(weight);

 // BMI 계산
 console.log('BMI 계산');
 const bmi = weightKg / ((heightMeters * heightMeters));
 const category = getBmiCategory(bmi);

 console.log(`당신의 BMI 지수는 ${bmi.toFixed(2)}이고 체질량 지수는 ${category}`);
 console.log('\n동기 처리 완료');

 /*키 입력 받기
키(cm 단위): 160
입력 받은 키 : 160
몸무게 입력 받기 
몸무게(kg 단위) :60
입력 받은 몸무게: 60
BMI 계산
당신의 BMI 지수는 23.44이고 체질량 지수는 비만전단계*/
