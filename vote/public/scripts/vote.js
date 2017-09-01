(function () {
    var app = angular.module('voteApp', []);
    var typeNo = null;
    var toastComponent = new ToastComponent();
    app.controller('voteCtrl', function ($scope, $location, $http, $timeout) {

        //初始化
        initView($scope, $location, $http);

        /**
         *  标签tab点击事件
         * @param tabIndex 点击项
         */
        $scope.onToggleTab = function (tabIndex) {
            var tabVote = $("#btnVote"), //投票 tab
                tabRanking = $("#btnRanking"), //排行榜 tab
                voteContainer = $('.vote-container'),
                rankContainer = $('.rank-container'),
                content = $('.content');
            switch (tabIndex) {
                case 0:
                    $(tabVote).addClass('tabbar-active');
                    $(tabRanking).removeClass('tabbar-active');
                    $scope.showSearchBar = true;
                    $(content).removeClass('offset-20vh').addClass('offset-28vh');
                    $(voteContainer).show();
                    $(rankContainer).hide();
                    break;
                case 1:
                    $(tabVote).removeClass('tabbar-active');
                    $(tabRanking).addClass('tabbar-active');
                    $scope.showSearchBar = false;
                    $(content).removeClass('offset-28vh').addClass('offset-20vh');
                    $(voteContainer).hide();
                    $(rankContainer).show();
                    getRankingList($http, $scope);
                    break;
                default:
                    break;
            }
        };

        /**
         * 检索条件查询
         * @param userInput 用户输入
         */
        $scope.onSearch = function (userInput) {
            if (userInput !== undefined) {
                $http.post('vote/search', {name: userInput}).then(function success(response) {
                    console.log(response.data);
                    $scope.voteList = response.data.voteList;
                }, function fail(err) {
                    console.log(err);
                });
            }
        };

        /**
         * 跳转至候选人详情页面
         * @param candidateNo 候选人编号
         * @param typeNo 参与投票类型编号
         */
        $scope.onToVoteDetail = function (candidateNo, typeNo) {
            window.location = 'vote-detail?candidateNo=' + candidateNo + '&typeNo=' + typeNo;
        };

        /**
         * 投票操作
         * @param event
         */
        $scope.onVote = function (event, candidateNo) {
            console.log(event);
            //阻止冒泡事件,父类事件向子类扩散
            event.stopPropagation();
            var param = {
                openId: null,
                candidateNo: candidateNo,
                typeNo: typeNo
            };
            if (window.localStorage) {
                param.openId = localStorage.getItem('OPEN_ID');
                console.log(param.openId);
                if (param.openId === null) {
                    $http.post('/vote/doVote', param).then(function success(response) {
                        console.log(response.data);
                        if (response.data.status === 1) {
                            toastComponent.showToast({
                                content: '投票成功'
                            }, $scope, $timeout);
                            localStorage.setItem('OPEN_ID', response.data.openId);
                            console.log(localStorage.getItem('OPEN_ID'));
                            getCandidateList($http, $scope);
                        } else {
                            toastComponent.showToast({
                                content: response.data.msg
                            }, $scope, $timeout);

                        }
                    }, function (err) {
                        console.log(err);
                    });
                } else {
                    $http.post('/vote/doVote', param).then(function success(response) {
                        console.log(response.data);
                        if (response.data.status === 1) {
                            toastComponent.showToast({
                                content: '投票成功'
                            }, $scope, $timeout);
                            getCandidateList($http, $scope);
                        } else {
                            toastComponent.showToast({
                                content: response.data.msg
                            }, $scope, $timeout);
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }

            } else {
                console.log('当前设备不支持本地存储');
            }
        };
    });

    function ToastComponent() {
        this.toastStatus = false;
        this.content = null;
        this.duration = 1000;//默认2000
    }

    ToastComponent.prototype.showToast = function (option, $scope, $timeout) {
        $scope.toastStatus = true;
        $scope.content = option.content || '';
        $scope.duration = option.duration || this.duration;
        $timeout(function () {
            $scope.toastStatus = false;
        }, $scope.duration);
    };

    /**
     * 初始化布局元素
     * @param $scope 作用域
     * @param $location
     */
    function initView($scope, $location, $http) {
        //标题文字处理
        typeNo = $location.absUrl().slice($location.absUrl().length - 1);
        var title = getTitleByVoteType(typeNo);
        document.title = title;
        $scope.title = title;
        //搜索框显示
        $scope.showSearchBar = true;
        //初期排行榜隐藏
        $('.rank-container').hide();
        //初期数据初始化
        getCandidateList($http, $scope);
        //排行榜数据初始化
        getRankingList($http, $scope);
    }

    /**
     * 获取候选人列表
     * @param $http http服务对象
     * @param $scope 作用域对象
     */
    function getCandidateList($http, $scope) {
        $http.get("/vote/getCandidateList").then(function (response) {
            console.log(response.data);
            $scope.voteList = response.data.voteList;
        });
    }

    /**
     * 获取 排名列表
     * @param $http http服务对象
     * @param $scope 作用域对象
     */
    function getRankingList($http, $scope) {
        $http.get("/vote/getRankingList").then(function (response) {
            console.log(response.data);
            $scope.rankingList = response.data.rankingList;
        });
    }
})();

