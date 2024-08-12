//  BMI 비동기 방식으로 출력
// readline 모듈의 question 메소드는 콜백 함수를 사용해 비동기적으로 입력 처리함
import readline from "readline";

// BMI 판정 기준 함수 작성
const getBmiCategory = (bmi) =>{ //bmi값을 가지고 와서 if 조건을 검
    if(bmi < 18.5) return '저체중';
    if(bmi >= 18.5 && bmi < 23) return '정상';
    if(bmi >= 23 && bmi <25 ) return '비만전단계';
    if(bmi >= 25 && bmi <30) return '1단계 비만';
    if(bmi >= 30 && bmi <35) return '2단계 비만';
    return '3단계 비만'
}

// 키보드 입력을 위한 readline 인터페이스 생성
// input 스트링에서 데이터를 읽고, ouput 스트링에서 데이터를 씀
const rdata = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

console.log('비동기 입력 시작')

// 키 입력
rdata.question('키(cm 단위) : ' , (height) =>{
    // 몸무게 입력
    rdata.question('몸무게(kg 단위) : ' , (weight) =>{
        console.log(`입력 받은 몸무게 : ${weight}`);

        // 계산
        // 키를 cm ->m 단위로 체인지
        const heightMeters = parseFloat(height) /100;
        const weightKg = parseFloat(weight);

        // BMI 계산
        const bmi = weightKg / ((heightMeters * heightMeters));
        const category = getBmiCategory(bmi);

        console.log(`당신의 BMI 지수는 ${bmi.toFixed(2)}이고 체질량 지수는 ${category}`);
        rdata.close();// 인터페이스를 닫음
    })
});

console.log('\n비동기 처리');
/*비동기 처리
키(cm 단위) : 175
몸무게(kg 단위) : 55
입력 받은 몸무게 : 55
당신의 BMI 지수는 17.96이고 체질량 지수는 저체중 */