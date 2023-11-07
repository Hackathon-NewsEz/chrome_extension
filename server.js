const express = require('express');
const app = express();

// CORS 설정
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

// /difficulty_testing 엔드포인트 추가
app.get('/difficulty_testing', function(req, res) {
    res.json({ difficult: " 공매도 금지 첫날, 주가는 크게 뛰었습니다." });
});

// 서버 실행
app.listen(3000, function () {
    console.log('Server is running on port 3000');
});
