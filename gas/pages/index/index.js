var markersData = [];
var amapFile = require('../../libs/amap-wx.js');//如：..­/..­/libs/amap-wx.js
Page({
  data: {
    markers: [],
    latitude: '',
    longitude: '',
    textData: {}
  },
  makertap: function (e) {
    var id = e.markerId;
    var that = this;
    that.showMarkerInfo(markersData, id);
    that.changeMarkerColor(markersData, id);
  },
  onLoad: function () {
    var that = this;
    var myAmapFun = new amapFile.AMapWX({ key: '63b6702375a2cf6b14c6ba5340ccd1a3' });
    myAmapFun.getPoiAround({
      iconPathSelected: '选中 marker 图标的相对路径', //如：..­/..­/img/marker_checked.png
      iconPath: '未选中 marker 图标的相对路径', //如：..­/..­/img/marker.png
      success: function (data) {
        console.log(data);

      },
      fail: function (info) {
        wx.showModal({ title: info.errMsg })
      }
    })
    myAmapFun.getInputtips({
      keywords: '加油站',
      city: '上海市',
      type: '生活服务',
      success: function (data) {
        console.log(data);
      }
    })
  },
  showMarkerInfo: function (data, i) {
    var that = this;
    that.setData({
      textData: {
        name: data[i].name,
        desc: data[i].address
      }
    });
  },
  changeMarkerColor: function (data, i) {
    var that = this;
    var markers = [];
    for (var j = 0; j < data.length; j++) {
      if (j == i) {
        data[j].iconPath = "选中 marker 图标的相对路径"; //如：..­/..­/img/marker_checked.png
      } else {
        data[j].iconPath = "未选中 marker 图标的相对路径"; //如：..­/..­/img/marker.png
      }
      markers.push(data[j]);
    }
    that.setData({
      markers: markers
    });
  }

})