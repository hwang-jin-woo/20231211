const express = require('express');
const reservationRouter = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hospital',
});

// 회원가입 API
reservationRouter.post('/', (req, res) => {
  const {
    year,
    hospital,
    hospital_name,
  } = req.body;

  // Prepared Statement를 사용하여 SQL Injection 방지
  const query =
    'INSERT INTO reservation (year,hospital,hospital_name) VALUES (?, ?, ?)';

  // 쿼리 실행
  db.query(
    query,
    [
      year,
      hospital,
      hospital_name,
    ],
    (err) => {
      if (err) {
        console.error('쿼리 실행 오류:', err);
        res.status(500).send('서버 오류');
      } else {
        res.status(200).send('회원가입 성공');
      }
    }
  );
});




module.exports = reservationRouter;
