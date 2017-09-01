var express = require('express');
var router = express.Router();

var mysql = require('mysql');
var dbConfig = require('../db/db_config');
var candidateSQL = require('../db/candidate');
var commonSQL = require('../routes/common');
var pool = mysql.createPool(dbConfig.mysql);
var typeNo = 1;
var sha256 = require('sha256');

/* 投票页面. */
router.get('/', function (req, res, next) {
    typeNo = parseInt(req.query.typeNo);
    res.render('vote');
});

/**
 * 候选人列表
 */
router.get('/getCandidateList', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        commonSQL.getCandidateList(connection, typeNo, function (err, result) {
            if (result) {
                console.log(result);
                res.json({voteList: result});
            } else {
                console.log(err);
            }
            connection.release();
        });
    });
});


/**
 * 获取排名列表
 */
router.get('/getRankingList', function (req, res, next) {
    pool.getConnection(function (err, connection) {
        commonSQL.getRankingList(connection, typeNo, function (err, result) {
            if (result) {
                console.log(result);
                res.json({rankingList: result});
            } else {
                console.log(err);
            }
            //释放连接
            connection.release();
        });
    });
});

/**
 * 查询结果列表返回
 */
router.post('/search', function (req, res, next) {
    //获取前端请求体
    var param = req.body;
    console.log('name:' + param.name);
    // 从连接池获取连接
    pool.getConnection(function (err, connection) {
        connection.query(candidateSQL.queryCandidateByNameOrCandidateNo,
            [typeNo, '%' + param.name + '%', '%' + param.name + '%'],
            function (err, result) {
                console.log(result);
                if (result) {
                    res.json({voteList: result});
                }
                //释放连接
                connection.release();
            });
    });
});

var voteInput = {};
var voteOutput = {
    status: 0,
    openId: null,
    msg: null
};

/**
 * 投票处理
 *
 */
router.post('/doVote', function (req, res, next) {
    voteInput = req.body;
    console.log(voteInput);
    //不存在open_id,直接投票处理
    if (voteInput.openId === null) {
        pool.getConnection(function (err, connection) {
            //使用sha256生成 openId 码
            console.log(new Date().getTime() / 1000);
            voteInput.openId = sha256((new Date().getTime() / 1000).toString());
            console.log('openId:' + voteInput.openId);
            //插入 投票表
            commonSQL.insertVote(connection, voteInput, function (err, result) {
                if (result) {
                    //更新election表
                    commonSQL.updateElection(connection, voteInput, function (err, result) {
                        voteOutput = {};
                        if (result) {
                            voteOutput.status = 1;
                            voteOutput.openId = voteInput.openId;
                        } else {
                            voteOutput.status = 0;
                            voteOutput.msg = '投票失败,请稍后重试';
                        }
                        res.json(voteOutput);
                    })
                } else {
                    console.log(err);
                }
                connection.release();
            });

        });
    } else { //存在openId
        voteOutput = {};
        pool.getConnection(function (err, connection) {
            commonSQL.queryExitsVote(connection, voteInput, function (err, result) {
                if (result) {
                    //存在记录,更新操作
                    if (result[0].num === 1) {
                        commonSQL.updateVote(connection, voteInput, function (err, result) {
                            if (result) {
                                console.log(result);
                                if (result.affectedRows !== 0) {
                                    voteOutput.status = 1;
                                } else {
                                    voteOutput.status = 0;
                                    voteOutput.msg = '您今天已经投过票或者给该候选人投票总数已达3次';
                                }
                            } else {
                                console.log(err);
                            }
                            res.json(voteOutput);
                        });
                    } else { //无记录插入操作
                        commonSQL.insertVote(connection, voteInput, function (err, result) {
                            if (result) {
                                //更新election表
                                commonSQL.updateElection(connection, voteInput, function (err, result) {
                                    if (result) {
                                        voteOutput.status = 1;
                                    } else {
                                        voteOutput.status = 0;
                                        voteOutput.msg = '投票失败,请稍后重试';
                                    }
                                    res.json(voteOutput);
                                })
                            } else {
                                console.log(err);
                            }
                        });
                    }
                } else {
                    console.log("查询投票记录失败:" + err);
                }
                connection.release();
            });
        });
    }
});
module.exports = router;
