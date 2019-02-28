/*登录注册切换*/
var $list = $("li");
var $form = $("form");
$list.click(function(){
	$(this).addClass("active")
		   .siblings()
		   .removeClass("active");
	var index = $(this).index();
	$form.eq(index).addClass("show")
				   .siblings()
				   .removeClass("show");		
})
/*表单验证*/
var uname = document.getElementById("uname");//注册用户名
var upwd = document.getElementById("upwd");//注册密码

//存cookie
function setCookie(name,val,day){
	var time = new Date();
	time.setDate(time.getDate() + day);
	document.cookie = `${name} = ${val} ;expires = ${day}`;
}

/*取cookie*/
function getCookie(name){
	var str = document.cookie;//"[{}; {}]"
		var arr = str.split("; ");
		for(var i = 0 ; i < arr.length ; i ++){
			var cur = arr[i].split("=");
			if(cur[0] == name){
				return JSON.parse(cur[1]);
			}
		}	
	return [];
}
var obj = {};
var brr =  getCookie("infor");

/*注册用户名*/
var flagName = null;
$("#uname").blur(function(){
	/*var num = getCookie("infor");
	console.log(num)
	for(var i = 0 ; i < num.length;i ++){
		console.log(num.uname)
	if(num.uname != uname.value){*/
		var res = /^1[37589]\d{9}$/;
		if(res.test($(this).val())){
			$(".s1").html("输入格式正确");
			$(".s1").css("color","#777777");
			obj.uname = $(this).val();
			flagName = true;
			return;
		}else{
			$(".s1").html("输入格式错误");
			$(".s1").css("color","red");
			flagName = false;
			//break;
		/*}
	}else{
		$(".s1").html("用户名已存在，请直接登陆");
		$(".s1").css("color","red");
		flagName = false;
		return;
	}*/	
	}
})
/*验证码*/
var flagYz = null;
$("#yz").blur(function(){
	var res = /\d{6}/;
	if(res.test($(this).val())){
		$(".s2").html("验证码正确").css("color","#777777");
		flagYz = true;
	}else{
		$(".s2").html("验证码错误").css("color","red");
		flagYz = false;
	}
})
/*密码*/
var flagPwd = null;
$("#upwd").blur(function(){
	var res = /^(?![0-9]+$)(?![a-zA-Z]+$)(?![_]+$)[0-9A-Za-z_]{6,20}$/;
	if(res.test($(this).val())){
		$(".s3").html("密码格式正确").css("color","#777777");
		obj.uped = $(this).val();
		flagPwd = true;
	}else{
		$(".s3").html("密码格式错误").css("color","red");
		flagPwd = false;
	}
})
/*确认密码*/
var flagPwd2 = null;
$("#apwd").blur(function(){
	if(flagPwd){
		if($(this).val() == $("#upwd").val()){
			$(".s4").html("密码正确").css("color","#777777");
			flagPwd2 = true;
		}else{
			$(".s4").html("密码不一致").css("color","red");
			flagPwd2 = false;
		}
	}else{
		$(".s4").html("密码格式错误").css("color","red");
		flagPwd2 = false;
	}
	
})
/*提交*/
$("#usub").click(function(){		
	if(flagName && flagYz &&flagPwd &&flagPwd2  ){
		brr.push(obj);		
		setCookie("infor",JSON.stringify(brr),10)
		var tc = confirm("注册成功！是否回到首页");
		if(tc){
			location.href = "index.html";//首页
		}else{
			location.href = "register.html";
		}
	}else{
		layer1.style.display = "block";
		erro.style.display = "block";
	}
})

/*登陆*/
var dname = document.getElementById("dname");//用户名
var pwd = document.getElementById("pwd");//密码
var sub = document.getElementById("sub");//登陆
var layer1 = document.getElementById("layer");//遮罩层
var erro = document.getElementById("erro");//错误弹窗
var cl = document.getElementById("cl");//错误提示字
var ss1 = document.getElementsByClassName("ss1")[0];
var ss3 = document.getElementsByClassName("ss3")[0];
var flag = null;
dname.onblur = function(){
	var pro = getCookie("infor");
	for(var i = 0 ; i < pro.length;i ++){
	//.log(pro[i].uname)
		if(dname.value == pro[i].uname){
			ss1.innerHTML = "用户存在";
			ss1.style.color = "#777";
			flag = true;
			pwd.onblur = function(){
			if(pwd.value == pro[i].uped){
				ss3.innerHTML ="密码正确";
				ss3.style.color = "#777";
			}else{
				ss3.innerHTML ="密码错误";
				ss3.style.color = "red";
				flag = false;
			}
		}
		return;
		}else{
			ss1.innerHTML ="用户不存在";
			ss1.style.color = "red";
			flag = false;
			return;
		}		
	}
}

sub.onclick = function(){
	if(flag){
		location.href = "index.html";
	}else{
		layer1.style.display = "block";
		erro.style.display = "block";
	}
}
cl.onclick = function(){
	layer1.style.display = "none";
	erro.style.display = "none";
}


