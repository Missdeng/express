var CandidateSQL = {
    //根据参与类型查询参与人列表
    queryCandidateListByTypeNo: 'SELECT\n ' +
    ' T1.candidate_no AS candidateNo, \n' +
    ' T2.name,  \n' +
    ' T2.img_name AS imgName , \n ' +
    ' T2.company,  \n' +
    ' T2.position,  \n' +
    ' T2.description,  \n' +
    ' T1.type_no AS typeNo, \n ' +
    ' T1.number  \n' +
    ' FROM  \n' +
    ' election AS T1  \n' +
    ' INNER JOIN candidate AS T2 ON T1.candidate_no = T2.candidate_no  \n' +
    ' AND T1.type_no = ?  \n' +
    ' ORDER BY  \n' +
    ' T1.number DESC',

    //模糊查询候选人
    queryCandidateByNameOrCandidateNo: 'SELECT\n ' +
    ' T1.candidate_no AS candidateNo,\n ' +
    ' T2.name,\n ' +
    ' T2.img_name AS imgName,\n ' +
    ' T2.company,  \n' +
    ' T2.position, \n' +
    ' T2.description,\n ' +
    ' T1.type_no AS typeNo,\n ' +
    ' T1.number \n' +
    ' FROM \n' +
    ' election AS T1 \n' +
    ' INNER JOIN candidate AS T2 ON T1.candidate_no = T2.candidate_no \n' +
    ' AND T1.type_no = ? \n' +
    ' AND (T1.candidate_no LIKE  ?  OR T2.name LIKE  ? );',

    //查询排名列表
    queryRankingListByTypeNo: 'SELECT\n' +
    '\tT3.rank,\n' +
    '\tT3.number,\n' +
    '\tT4.candidate_no AS candidateNo,\n' +
    '\tT4.name,\n' +
    '\tT4.img_name AS imgName,\n' +
    '\tT4.company,\n' +
    '\tT4.position,\n' +
    '\tT4.description\n' +
    'FROM\n' +
    '\t(\n' +
    '\t\tSELECT\n' +
    '\t\t\tT1.candidate_no,\n' +
    '\t\t\tT1.number,\n' +
    '\t\t\tCASE\n' +
    '\t\tWHEN @preRank = T1.number THEN\n' +
    '\t\t\t@rownum\n' +
    '\t\tWHEN @preRank := T1.number THEN\n' +
    '\t\t\t@rownum := @rownum + 1\n' +
    '\t\tWHEN @preRank = 0 THEN\n' +
    '\t\t\t@rownum :=@rownum + 1\n' +
    '\t\tEND AS rank\n' +
    '\t\tFROM\n' +
    '\t\t\t(\n' +
    '\t\t\t\tSELECT\n' +
    '\t\t\t\t\tcandidate_no,\n' +
    '\t\t\t\t\tnumber\n' +
    '\t\t\t\tFROM\n' +
    '\t\t\t\t\telection\n' +
    '\t\t\t\tWHERE\n' +
    '\t\t\t\t\ttype_no = ?\n' +
    '\t\t\t) AS T1,\n' +
    '\t\t\t(\n' +
    '\t\t\t\tSELECT\n' +
    '\t\t\t\t\t@rownum := 0 ,@preRank := NULL\n' +
    '\t\t\t) T2\n' +
    '\t\tORDER BY\n' +
    '\t\t\tT1.number DESC\n' +
    '\t) AS T3\n' +
    'INNER JOIN candidate AS T4 ON T3.candidate_no = T4.candidate_no\n' +
    'ORDER BY\n' +
    '\tT3.rank ASC',

    //获取候选人详细信息
    queryCandidateDetailInfoByCandidateNo: 'SELECT\n' +
    '\tT3.rank,\n' +
    '\tT3.number,\n' +
    '\tT4.candidate_no AS candidateNo,\n' +
    '\tT4.name,\n' +
    '\tT4.img_name AS imgName,\n' +
    '\tT4.company,\n' +
    '\tT4.position,\n' +
    '\tT4.description\n' +
    'FROM\n' +
    '\t(\n' +
    '\t\tSELECT\n' +
    '\t\t\tT1.candidate_no,\n' +
    '\t\t\tT1.number,\n' +
    '\t\t\tCASE\n' +
    '\t\tWHEN @preRank = T1.number THEN\n' +
    '\t\t\t@rownum\n' +
    '\t\tWHEN @preRank := T1.number THEN\n' +
    '\t\t\t@rownum := @rownum + 1\n' +
    '\t\tWHEN @preRank = 0 THEN\n' +
    '\t\t\t@rownum :=@rownum + 1\n' +
    '\t\tEND AS rank\n' +
    '\t\tFROM\n' +
    '\t\t\t(\n' +
    '\t\t\t\tSELECT\n' +
    '\t\t\t\t\tcandidate_no,\n' +
    '\t\t\t\t\tnumber\n' +
    '\t\t\t\tFROM\n' +
    '\t\t\t\t\telection\n' +
    '\t\t\t\tWHERE\n' +
    '\t\t\t\t\ttype_no = ?\n' +
    '\t\t\t) AS T1,\n' +
    '\t\t\t(\n' +
    '\t\t\t\tSELECT\n' +
    '\t\t\t\t\t@rownum := 0 ,@preRank := NULL\n' +
    '\t\t\t) T2\n' +
    '\t\tORDER BY\n' +
    '\t\t\tT1.number DESC\n' +
    '\t) AS T3\n' +
    'INNER JOIN candidate AS T4 ON T3.candidate_no = T4.candidate_no\n' +
    'AND T4.candidate_no = ?'
};
module.exports = CandidateSQL;
