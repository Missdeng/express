/**
 * 根据当前的url类型获取标题
 * @param voteType 投票类型
 */
function getTitleByVoteType(voteType) {
    var title = null;
    voteType = parseInt(voteType);
    switch (voteType) {
        case 1:
            title = '优秀安全负责人评选';
            break;
        case 2:
            title = '优秀安全员评选';
            break;
        case 3:
            title = '优秀注册安全工程师评选';
            break;
        case 4:
            title = '优秀技师评选';
            break;
        case 5:
            title = '优秀分析员评选';
            break;
        default:
            break;
    }
    return title;
}