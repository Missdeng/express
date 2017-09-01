var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../db/db_config');
var candidateSQL = require('../db/candidate');
var pool = mysql.createPool(dbConfig.mysql);

/* GET home page. */
router.get('/', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        console.log(candidateSQL.queryCandidateDetailInfoByCandidateNo);
        connection.query(candidateSQL.queryCandidateDetailInfoByCandidateNo, [req.query.typeNo, req.query.candidateNo], function (err, result) {
            if (result) {
                res.render('vote-detail', {candidate: result[0]});
            } else {
                console.log(err);
                res.render('vote-detail', {msg: '无此人'});
            }
            //释放连接
            connection.release();
        });
    });
});
module.exports = router;
