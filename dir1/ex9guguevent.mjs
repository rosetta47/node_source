// 키보드로 단을 받아 구구단을 출력
import EventEmitter from "events";
import  readline from "readline";

const myEvent = new EventEmitter(); //이벤트 객체 생성

// 입력 데이터
const inout = readline.createInterface({
    input:process.stdin,
    output:process.stdout,
})

const printGugudan = (dan) =>{
    console.log(`\n 구구단 ${dan} 출력 : `)
    for (let index = 1; index <=9 ; index++) {
       console.log(`${dan} X ${index} = ${dan * index}`); 
        
    }
}

myEvent.on('gugudan', (dan) =>{
    printGugudan(dan);
    inout.close();
})

// question(query, callback)
inout.question('출력할 단 입력:', (input) =>{ //성공
    const dan = parseInt(input, 10);
    if(!isNaN(dan)){
        myEvent.emit('gugudan', dan);
    }else{ // 실패
    inout.close();
    console.log('단은 숫자로 입력!');
    }
})
