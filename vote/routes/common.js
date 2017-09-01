var candidateSQL = require('../db/candidate');
var voteSQL = require('../db/vote');
var Common = {
    SQL: {
        getCandidateList: function (connection, typeNo, cb) {
            connection.query(candidateSQL.queryCandidateListByTypeNo, [typeNo], cb);
        },
        getRankingList: function (connection, typeNo, cb) {
            connection.query(candidateSQL.queryRankingListByTypeNo, [typeNo], cb);
        },
        insertVote: function (connection, param, cb) {
            connection.query(voteSQL.insertVote, [param.openId, param.candidateNo, parseInt(param.typeNo)], cb);
        },
        queryExitsVote: function (connection, param, cb) {
            connection.query(voteSQL.queryNumByOpenId, [param.openId, param.candidateNo, param.typeNo], cb);
        },
        updateVote: function (connection, param, cb) {
            connection.query(voteSQL.updateVote, [param.openId, param.candidateNo, param.typeNo], cb);
        },
        updateElection: function (connection, param, cb) {
            connection.query(voteSQL.updateElection, [param.candidateNo, param.typeNo], cb);
        }
    }
};
module.exports = Common.SQL;