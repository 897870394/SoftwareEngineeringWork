Page({
  data:{
    idbfh:"%",
    idsin:"sin",
    idcos:"cos",
    idtan:"tan",
    idln:"ln",
    idlg:"log",
    ida:"!",
    idxn:"^",
    idgen:"√",
    idxs:"^2",
    idb:"back",
    idc:"clear",
    idadd:"＋",
    id_e:"e",
    id9:"9",
    id8:"8",
    id7:"7",
    idj:"－",
    id6:"6",
    id5:"5",
    id4:"4",
    idx:"×",
    id3:"3",
    id2:"2",
    id1:"1",
    iddiv:"÷",
    id0:"0",
    idd:".",
    ide:"＝",
    screenData:"0",
    screenData2:"\xa0",
    operaSymbo: { "＋": "+", "－": "-", "×": "*", "÷": "/", ".": ".", "!": "!", "^": "^", "^2": "^2"},
    specialSymbo: { "sin": "sin", "cos": "cos", "tan": "tan", "ln": "ln", "log": "log", "√": "√", "e": "e"},
    lastIsOperaSymbo:false,
    iconType:'waiting_circle',
    iconColor:'white',
    arr:[],
    logs:[],
    flage:false,
    pointFlage:false,
    bfhFlage:false
  },
  onLoad:function(options){
    // 页面初始化 options为页面跳转所带来的参数
  },
  onReady:function(){
    // 页面渲染完成
  },
  onShow:function(){
    // 页面显示
  },
  onHide:function(){
    // 页面隐藏
  },
  onUnload:function(){
    // 页面关闭
  },
  clickBtn:function(event){
    var id = event.target.id;
    if(id == this.data.idb){  //退格←
      var data = this.data.screenData;
      if(data == "0"){
          return;
      }
      
      data = data.substring(0,data.length-1);
      if(data == "" || data == "－"){
          data = 0;
      }
      this.setData({"screenData":data});
      var del = this.data.arr.pop();
      if(this.data.operaSymbo[del]){
        this.setData({lastIsOperaSymbo:false})
        if(del == this.data.idd) {
          this.setData({pointFlage:false})
        }
      }
    }else if(id == this.data.idc){  //清屏C
      this.setData({
        "screenData2":"\xa0",
        "screenData": "0",
        pointFlage:false,
        lastIsOperaSymbo:false
      });

      this.data.arr.length = 0;
    }else if(id == this.data.idt){  //正负号+/-
      var data = this.data.screenData;
      if(data == "0"){
          return;
      }
      var firstWord = data.charAt(0);
      if(data == "－"){
        data = data.substr(1);
        this.data.arr.shift();
      }else{
        data = "－" + data;
        this.data.arr.unshift("－");
      }
      this.setData({"screenData":data});

    }
    else if(id == this.data.ide){  //等于＝
      this.setData({"flage":true});
      var data = this.data.screenData;
      if(data == "0"){
        return;
      }
      
      var lastWord = data.charAt(data.length);
      if(isNaN(lastWord)){
        return;
      }

      var num = "";

      var arr = this.data.arr;
      var original = [];
      for(var i in arr){
        if(isNaN(arr[i]) == false || arr[i] == this.data.idd){  //数字 和 点
          num += arr[i];
        } else if (arr[i] == "cos" || arr[i] == "sin" || arr[i] == "tan" || arr[i] == "ln" || arr[i] == "log" || arr[i] == "√") {
          if(num != "") {
            original.push(Number(num));
            original.push("x");
            num = "";
          }
          original.push(arr[i]);
        }else if(arr[i] == "e"){
          if(num!=""){
            original.push(Number(num));
            original.push("x");
            num = "";
          }
          original.push(Math.E);
        }else if(arr[i] == "%"){
          if(num!="") {
            original.push(Number(num));
            num = "";
          }
          original.push("%");
        }else{
          original.push(Number(num));
          original.push(arr[i]);
          num = "";
        }
      }
      if(num != ""){
        original.push(Number(num));
      }

      // console.log(original);
      //先计算三角函数
      var optarr = [];
      for(var i = 0; i < original.length; i++) {
        if(original[i] == "cos") {                          //cos
          var d = original[i + 1] * Math.PI / 180;
          var x = Math.cos(d);
          optarr.push(x.toFixed(3));
          i++;
        }else if(original[i] == "sin") {                    //sin
          var d = original[i + 1] * Math.PI / 180;
          var x = Math.sin(d);
          optarr.push(x.toFixed(3));
          i++;
        }else if (original[i] == "tan") {                   //tan
          if((original[i+1] - 90)%180 == 0) {
            this.setData({
              screenData:"∞",
              screenData2: "tan" + original[i + 1]
            })
            return;
          }
          var d = original[i + 1] * Math.PI / 180;
          var x = Math.tan(d);
          optarr.push(x.toFixed(3));
          i++;
        }else if(original[i] == "!") {             //阶乘
          var n = optarr.pop();
          if(n == 0){
            optarr.push(1);
          }else if(n-Math.round(n) != 0){
            this.setData({screenData:"阶乘需要输入整数"})
            return;
          }else {
            var x = 1;
            for(var j = n; j > 1; j--){
              x *= j;
            }
            optarr.push(x);
          }
        } else if (original[i] == "^"){                    // 幂
          var a = optarr.pop();
          optarr.push(Math.pow(a,original[i+1]));
          i++;
        } else if (original[i] == "^2") { 
          var a = optarr.pop();
          optarr.push(Math.pow(a, 2));
          i++;
        }else if(original[i] == "ln"){           
          var ln = Math.log(original[i+1]);
          optarr.push(ln.toFixed(5));
          i++;
        }else if (original[i] == "log") {
          var ln = Math.log10(original[i + 1]);
          optarr.push(ln.toFixed(5));
          i++;
        }else if (original[i] == "√"){
          var gen = Math.sqrt(original[i+1]);
          optarr.push(gen.toFixed(5));
          i++;
        } else if (original[i] == "²") {
          var ping = Math.pow(optarr.pop(),2);
          optarr.push(ping.toFixed(5));
          i++;
        }else if(original[i] == "%"){
          var n = optarr.pop() / 100;
          console.log(optarr.pop() + "   "+n);
          optarr.push(n);
        }else{
          optarr.push(original[i]);
        }
      }
      // console.log(optarr);
      
      var stack = [];
      for(var i = 0; i < optarr.length; i++) {
        var item = optarr[i];
        if(isNaN(item)){
          if (item == this.data.iddiv) {    //除
            var num1 = stack.pop();
            var num2 = optarr[i + 1];
            i++;
            var res = this.divide(num1,num2);
            stack.push(res);
          } else if (item == this.data.idx) {    //乘
            var num1 = stack.pop();
            var num2 = optarr[i+1];
            i++;
            var res = this.multiply(num1,num2);
            stack.push(res);
          }else {
            stack.push(item);
          }
        }else {
          stack.push(item)
        }
      }
   
      var result = Number(stack[0]);
      for (var i = 1; i < stack.length; i++){
        if (isNaN(stack[i])) {
          if (stack[i] == this.data.idadd) {
            result = this.add(Number(stack[i + 1]), result);
           
          } else if (stack[i] == this.data.idj){
            result = this.subtract(result, Number(stack[i + 1]));
  
          }
        }
      }
      
      //存储历史记录
      this.data.logs.push(data + " = " + result);
      wx.setStorageSync("calclogs",this.data.logs);

      this.data.arr.length = 0;
      this.data.arr.push(result);

      this.setData({ "screenData2": data });
      this.setData({"screenData":result+""});
    }else{
      if(this.data.operaSymbo[id]){ //如果是符号+-*/
        if (this.data.lastIsOperaSymbo){
          return;
        }
        if (id == this.data.idd) {
          if (this.data.pointFlage) {
            return;
          } else {
            this.setData({ pointFlage: true }) 
          }
        } else{
          this.setData({ pointFlage: false }) 
        }
      }
      if(this.data.bfhFlage == true && !isNaN(id)){
        return;
      }
      if(id == this.data.bfh){
        if(this.data.bfhFlage){
          return;
        }else{
          this.setData({bfhFlage:true})
        }
      }
      var sd = this.data.screenData;
      if (this.data.flage && !this.data.operaSymbo[id]) {
        this.setData({"screenData2":sd})
        sd = "0";
        this.data.arr.length = 0;
      }
      this.setData({ "flage": false });
      var data;

      if (sd == "0" && (!isNaN(id) || this.data.specialSymbo[id])){
        data = id;
      }else {
        data = sd + id;
      }
      this.setData({"screenData":data});
      
      this.data.arr.push(id);

      if(this.data.operaSymbo[id]){
        this.setData({"lastIsOperaSymbo":true});
      }else{
        this.setData({"lastIsOperaSymbo":false});
      }
    }
  },

  history:function(){
    wx.navigateTo({
      url:'../history/history'
    })
  },

  add:function(a,b) {
    var arr1 = String(a).split(".");
    var arr2 = String(b).split(".");
    var len1 = arr1.length == 1 ? 0 : arr1[1].length;
    var len2 = arr2.length == 1 ? 0 : arr2[1].length;
    var digit = len1 >= len2 ? len1 : len2;
    var res = (a * Math.pow(10, digit) + b * Math.pow(10, digit)) / Math.pow(10, digit);

    return res;
  },

  subtract:function(a,b) {
    var arr1 = String(a).split(".");
    var arr2 = String(b).split(".");
    var len1 = arr1.length == 1 ? 0 : arr1[1].length;
    var len2 = arr2.length == 1 ? 0 : arr2[1].length;
    var digit = len1 >= len2 ? len1 : len2;
    var res = (a * Math.pow(10, digit) - b * Math.pow(10, digit)) / Math.pow(10, digit);
    console.log(a + "-" + b + " ."  + digit + "= " + res);

    return res;
  },

  multiply:function(a,b) {
    var arr1 = String(a).split(".");
    var arr2 = String(b).split(".");
    var len1 = arr1.length == 1 ? 0 : arr1[1].length;
    var len2 = arr2.length == 1 ? 0 : arr2[1].length;
    var res = ((a*Math.pow(10,len1)) * (b*Math.pow(10,len2))) / Math.pow(10,len1+len2);
    return res;
  },

  divide:function(a,b) {
    var arr1 = String(a).split(".");
    var arr2 = String(b).split(".");
    var len1 = arr1.length == 1 ? 0 : arr1[1].length;
    var len2 = arr2.length == 1 ? 0 : arr2[1].length;
    var digit = len1 >= len2 ? len1 : len2;
    var res = (a * Math.pow(10, digit)) / (b * Math.pow(10, digit));
    return res;
  }
})