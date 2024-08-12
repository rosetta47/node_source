import { Router } from "express";
import path from 'path';
import { fileURLToPath } from 'url';

const router = Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

router.get('/', (req, res) => {
   // res.send('Hello, Jikwon');
   res.sendFile(path.join(__dirname, '../public/abc.html'));
}); //하나의 함수

const employees = [
    {id:1, name:'유비'},
    {id:2, name:'관우'},
    {id:3, name:'장비'},
];

router.get('/employees', (req, res) => {
    res.json(employees);
});

router.post('/employees', (req, res) => {
   const newEmployee = req.body;
   if(!newEmployee || !newEmployee.name){
        return res.status(400).json({error:'잘못된 데이터!'});

   }
     employees.push(newEmployee); // 맞은 데이터면 push
     res.status(201).json(newEmployee); // 201 : created 요청은 성공적. POST 요청 후에 새로운 리소스가 생성되었을때 사용한다. 

});

export default router;