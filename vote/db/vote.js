var VoteSQL = {
    //插入投票信息
    insertVote: 'INSERT INTO vote (' +
    ' open_id, ' +
    ' time, ' +
    ' candidate_no, ' +
    ' type_no, ' +
    ' number, ' +
    ' create_at, ' +
    ' update_at ' +
    ')  ' +
    'VALUES  ' +
    ' (?, NOW(), ?, ?, 1, NOW(), NOW());',

    updateElection: 'UPDATE election\n' +
    'SET number = number + 1,\n' +
    'update_at = NOW() \n' +
    'WHERE\n' +
    '\tcandidate_no = ?\n' +
    'AND type_no = ?;',

    //已投票,更新投票数
    updateVote: 'UPDATE vote AS T1\n' +
    'INNER JOIN election AS T2 ON T1.candidate_no = T2.candidate_no\n' +
    'AND T1.type_no = T2.type_no\n' +
    'SET T1.number = T1.number + 1,\n' +
    ' T1.time = NOW(),\n' +
    ' T1.update_at = NOW(),\n' +
    ' T2.number = T2.number + 1,\n' +
    ' T2.update_at = NOW()\n' +
    'WHERE\n' +
    '\tT1.open_id = ? \n' +
    'AND T1.candidate_no = ? \n' +
    'AND T1.type_no = ? \n' +
    'AND T1.number < 3\n' +
    'AND TIMESTAMPDIFF(DAY, T1.time, NOW()) > 0 \n' +
    'AND TIMESTAMPDIFF(\n' +
    '\tDAY,\n' +
    '\tNOW(),\n' +
    '\t\'2017-9-22\'\n' +
    ') >= 0',

    //根据openid查询是否已经存在该投票用户
    queryNumByOpenId: 'SELECT COUNT(open_id) AS num FROM vote where open_id = ? AND candidate_no = ? AND type_no = ?',

    //查询投票状态, status =0 表示已经投过票,否则代表可以投票
    queryVoteStatus: 'SELECT\n' +
    '\tcount(open_id) as status\n' +
    'FROM\n' +
    '\tvote\n' +
    'WHERE\n' +
    '\topen_id = ?\n' +
    'AND candidate_no = ?\n' +
    'AND type_no = ?\n' +
    'AND number < 3\n' +
    'AND TIMESTAMPDIFF(DAY, time, NOW()) > 0\n' +
    'AND TIMESTAMPDIFF(DAY,NOW(),\'2017-09-22\') >=0'

};
module.exports = VoteSQL;
