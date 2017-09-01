(function () {
    var app = angular.module('voteDetailApp', []);
    var typeNo = null,
        candidateNo = null,
        absUrl = null;
    app.controller('voteDetailCtrl', function ($scope, $location, $http) {
        absUrl = $location.absUrl();
        candidateNo = getUrlParamValue(absUrl, 'candidateNo');
        typeNo = getUrlParamValue(absUrl, 'typeNo');
        //页面初期化
        initView(typeNo, $scope);

        //投票操作
        $scope.onVote = function () {
            var param = {
                openId: null,
                candidateNo: candidateNo,
                typeNo: typeNo
            };
            console.log(param);
            if (window.localStorage) {
                param.openId = localStorage.getItem('OPEN_ID');
                console.log(param.openId);
                if (param.openId === null) {
                    $http.post('/vote/doVote', param).then(function success(response) {
                        console.log(response.data);
                        if (response.data.status === 1) {
                            localStorage.setItem('OPEN_ID', response.data.openId);
                            console.log(localStorage.getItem('OPEN_ID'));
                            window.location.reload();
                        } else {
                            alert(response.data.msg);
                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    $http.post('/vote/doVote', param).then(function success(response) {
                        console.log(response.data);
                        if (response.data.status === 1) {
                            alert("投票成功");
                            window.location.reload();
                        } else {
                            alert(response.data.msg);
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }
            } else {
                console.log('当前设备不支持本地存储');
            }

        }
    });

    /**
     * 页面初期化
     * @param typeNo 投票编号
     * @param $scope 作用域
     */
    function initView(typeNo, $scope) {
        var title = getTitleByVoteType(typeNo);
        document.title = title;
        $scope.title = title;
    }

    /**
     * 获取url 中的参数值
     * @param url 当前url
     * @param param 参数名
     * @returns {*}
     */
    function getUrlParamValue(url, param) {
        var reg = new RegExp("[^\?&]?" + encodeURI(param) + "=[^&]+");
        var arr = url.match(reg);
        if (arr !== null) {
            return decodeURI(arr[0].substring(arr[0].search("=") + 1));
        }
        return null;
    }
})();