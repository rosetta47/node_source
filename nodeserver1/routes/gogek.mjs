import { Router } from "express";

const router = Router();

router.get('/', (req, res) => {
    res.send('Hello, Gogek');
}); //하나의 함수

export default router;