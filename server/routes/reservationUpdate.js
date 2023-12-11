// test.js
const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost', 
  user: 'root', 
  password: '', 
  database: 'hospital', 
});

router.get('/', (req, res) => {
  const sql_reservation = 'SELECT * FROM reservation';

  db.query(sql_reservation, (err, results) => {
    if (err) {
      console.error('데이터 가져오기 오류: ' + err.message);
      res.status(500).json({ error: '데이터 가져오기 오류' });
    } else {
      const reservationData = results.map((row) => ({
        year: row.year,
        hospital: row.hospital,
        hospital_name: row.hospital_name,
      }));
      res.json(reservationData);
    }
  });
});

module.exports = router;


