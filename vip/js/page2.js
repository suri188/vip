window.onload = function() {
	var str = location.href;
	console.log(str); //http://127.0.0.1:8020/vip/page2.html?cname%20=list2&pid%20=06
	str = str.split("?")[1];
	var arr = str.split("&");
	var cname = arr[0].split("=")[1];
	var pid = arr[1].split("=")[1];
	//console.log(cname,pid);//list2 06
	var deff = $.ajax({
		type: "get",
		url: "js/page.json",
		async: true
	});
	deff.done(function(json) {
		
		var arr = json[cname].list;
		var str = "";
		var str2 = "";
		for(var i = 0; i < arr.length; i++) {
			if(arr[i].id == pid) {
				str += `
					
					<div class="bigimg">
						<img src="images/${arr[i].bimg1}.jpg" alt="" class="big"/>
						<img src="images/${arr[i].bimg2}.jpg" alt="" class="big"/>
						<img src="images/${arr[i].bimg3}.jpg" alt="" class="big"/>
						<img src="images/${arr[i].bimg4}.jpg" alt="" class="big"/>
						<img src="images/${arr[i].simg1}.jpg" alt="" class="small"/>
						<img src="images/${arr[i].simg2}.jpg" alt="" class="small"/>
						<img src="images/${arr[i].simg3}.jpg" alt="" class="small"/>
						<img src="images/${arr[i].simg4}.jpg" alt="" class="small"/>
					</div>
					<div class="buttonimg">
						<img src="images/${arr[i].boimg1}.jpg" alt="" />
						<img src="images/${arr[i].boimg2}.jpg" alt="" />
						<img src="images/${arr[i].boimg3}.jpg" alt="" />
						<img src="images/${arr[i].boimg4}.jpg" alt="" />
					</div>								
					`;
				str2 += `
						
							<h3>由于商品下线没找到相应的大图，就都用一样的图替换了。</h3>
							<button class="bu" data-img="${pro.img}" data-em="${pro.em}" data-id="${pro.id}" data-u="${pro.u}>加入购物车</button>
						
				`;
			}
		}
		$(".showcon").html(str);
		
		$(".tit").html(str2);
		$(".buttonimg").on("mouseenter", "img", function() {
			var index = $(this).index();
			$(".small").eq(index).show().siblings().hide()
			$(".bigimg").on("mouseenter", "img", function() {
				$(".big").eq(index).show().siblings().hide();
			})
		})
		$(".bigimg").on("mouseenter", "img", function() {
			$(".big").eq(0).show();
		})
		$(".bigimg").on("mouseleave", "img", function() {
			var index = $(this).index();
			$(".small").eq(index).show().siblings().hide()
			$(".big").hide();
		})
		var big = document.getElementsByClassName("big");
		$(".bigimg").bind("mousemove", function(e) {
			var e = e || event;
			var x = e.pageX - $(".showpic").offset().left;
			var y = e.pageY - $(".showpic").offset().top;
			// 大图left / mask的left = 大图宽度/小图宽度  =  大图可视区宽度 / mask的宽度
			//var bigw = $(".bigimg img").eq(0).width();
			//var smaw = 420;
			//var bigh = $(".bigimg img").eq(0).height();
			var bigx = x * 700 / 420;
			var bigy = y * 700 / 420;
			//console.log(bigx, bigy)
			$(".big").css({
				"left": -bigx,
				"top": -bigy
			})
		})
		
	//})	
		
		/*加入购物车*/
var arr = [];
$(".bu").click(function(){
	console.log(1)
	var json = {};
	json = {
		id : $(this).data("id"),
		src : $(this).data("img"),
		uname : $(this).data("u"),
		pric : $(this).data("em"),
		
		count : 1
	}
	//arr.push(json)
	console.log(json)
	var flag = true;
	var cookies = getCookie("shoplist");
	if(cookies != 0){
		for(var i = 0; i < cookies.length;i ++){
			if(json.id == cookies[i].id){
				cookies[i].count ++
				arr = cookies;
				flag = false;
				break;
			}
		}
	}
	if(flag){
		arr.push(json);
	}
	setCookie("shoplist",JSON.stringify(arr),10)
	console.log(arr)
})
	
}