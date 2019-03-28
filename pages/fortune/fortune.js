// pages/fortune/fortune.js
Page({
  /**
   * 页面的初始数据
   */
  data: {
    nowYear:"",
    nowMonth:"",
    nowDay:"",
    nowDate:"",
    years:"1997",
    months:"09",
    day:"23",
    birth:"1997:09:23",
    fortune:100,
    picture:"/image/1.jpg"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var timestamp = Date.parse(new Date());
    var date = new Date(timestamp);
    var Y = date.getFullYear();
    var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
    var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate(); 
    this.setData({
      nowDay:date.getDate(),
      nowMonth:date.getMonth()+1,
      nowYear:date.getFullYear(),
      nowDate: Y + '-' + M + '-' + D
    })
    console.log(this.data.nowMonth)
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  getDateTime: function (e) {
    var d = e.detail.value;
    var arr = d.split("-");
    this.setData({
      birth: d,
      years:arr[0],
      months:arr[1],
      day:arr[2]
    })
  },

  submit: function (e) {
    var y1 = Number(this.data.nowYear);
    var m1 = Number(this.data.nowMonth);
    var d1 = Number(this.data.nowDay);
    var y2 = Number(this.data.years);
    var m2 = Number(this.data.months);
    var d2 = Number(this.data.day);
    
    var res = Math.round(Math.abs(Math.cos(Math.log10(y1/y2) + (m1 - m2) + Math.exp(d1-d2))) * 100);
    this.changePic(res);
    this.setData({
      fortune:res
    })
  },

  changePic:function(res){
    var numPic = "";
    if(res >= 80) {
      numPic = "/image/2.jpg";
    }else if(res >= 60 && res < 80) {
      numPic = "/image/3.jpg";
    }else if(res >= 40 && res < 60) {
      numPic = "/image/4.jpg";
    }else if(res >= 20 && res <40) {
      numPic = "/image/5.jpg";
    }else {
      numPic = "/image/0.jpg";
    }
    this.setData({
      picture:numPic
    })
  }
})