const years = []

for (let i = 1; i <= 30; i++) {
  let name = i + '年';
  let year = { name: name, value: i }
  years.push(year)
}

Page({
  data: {
    years:years,
    way: [
      { name: "等额本息", value: 1},
      { name: "等额本金", value: 2}
    ],
    wayIndex:null,
    yearIndex:null,
    allmoney:0.00,
    time:0,
    monthRate:0.00,
    sumNumber:0.00,
    pcInterest:0.00,
    decrease:0.00,
    interest:0.00
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  },
  //贷款年限
  yearChange: function (e) {
    var m = e.detail.value
    this.setData({
      yearIndex: e.detail.value,
      time: Number(m)+1
    })
  },
  wayChange: function(e) {
    
    this.setData({
      wayIndex: e.detail.value
    })
  },
  oninput: function (e) {
    var money = e.detail.value;
    this.setData({
      allmoney: Number(money) * 10000
    })

  },
  onRate:function(e){
    var r = e.detail.value;
    this.setData({
      monthRate:Number(r)/1000
    })
  },

  onCompute:function(){
    var wInd = this.data.wayIndex;
    var money = this.data.allmoney;
    var t = this.data.time;
    var rate = this.data.monthRate;
    if(wInd == null || money == 0.00 || t == 0.00 || rate == 0.00){
      wx.showModal({
        title: '提示',
        content: '您有选项未填写',
      })
      return false;
    }
    var res = 0;
    if(wInd == 0){
      res = this.caculate(money, rate, t);
      this.setData({
        decrease:0.00
      })
    }else{
      res = this.caculateTwo(money, rate, t);   
    }
    this.setData({
      sumNumber:res.toFixed(2),
      interest: (res-money).toFixed(2)
    })
  },

  caculate:function(money, rate, t){
    var pcinterest = 0;
    var sum = 0;
    for(let i = 1; i <= t*12; i++){
      pcinterest = money*rate*Math.pow(1+rate,t*12) / (Math.pow(1+rate,t*12)-1);
      sum += pcinterest;
    }
    this.setData({
      pcInterest:pcinterest.toFixed(2)
    })
    return sum
  },
  caculateTwo: function (money, rate, t){
    var arr = [];
    var acapital = 0;
    var allsum = 0;
    allsum = (12*t + 1) * money * rate / 2 + money;

    var first = (money / (t * 12)) + money * rate;
    var a = Math.abs((2*allsum - 2*12*t*first) / ((12*t)*(12*t-1)));
    console.log(a);
    this.setData({
      pcInterest: first.toFixed(2),
      decrease:a.toFixed(2)
    })
    return allsum;
  },
  //清空重置
  formReset: function () {
    this.setData({
      wayIndex: null,
      yearIndex: null,
      allmoney: 0.00,
      time: 0,
      monthRate: 0.00,
      sumNumber: 0.00,
      pcInterest: 0.00,
      decrease: 0.00,
      interest: 0.00
    })
  }
})