/*请求数据*/
 $.ajax({
	type:"get",
	url:"js/page.json",
	async:true,
	success:function(json){
		var str = "";
		var title = "";
		for(var attr in json){
			var cur = json[attr];
			
			//console.log(cur.name)
			title += `<span aname = ${attr}>${cur.name}</span>`;
			for(var i = 0; i < cur["list"].length; i ++){
				var pro = cur.list[i];
				str +=`
					<div class="product1">
						<a href="page2.html?cname =${attr}&pid =${pro.id}" >
							<img src="images/${pro.img}.jpg"/>
							<i>￥</i>
							<em>${pro.em}</em>
							<del>${pro.del}</del>
							<b>${pro.b}</b>
							<u>${pro.u}</u>					
						</a>
						<button data-img="${pro.img}" data-em="${pro.em}" data-id="${pro.id}" data-u="${pro.u}">加入购物车</button>
					</div>
						`;
			}
			$(str).appendTo($(".product"));
			//$(".clear_fix").html(str)
			
		}
		$(title).appendTo($(".pronav_b"));
		
		//鼠标移入移出
		$(".pronav_b span").mouseenter(function(){
			$(this).addClass("pronav_color").siblings().removeClass("pronav_color");
			//var cname = $(this).html();
			var aname = $(this).attr("aname");
			var str = "";
			for(var i = 0; i < json[aname].list.length; i ++){
				var pro = json[aname].list[i];
				str +=`
					<div class="product1">
						<a href="page2.html?cname =${aname}&pid =${pro.id}" >
							<img src="images/${pro.img}.jpg"/>
							<i>￥</i>
							<em>${pro.em}</em>
							<del>${pro.del}</del>
							<b>${pro.b}</b>
							<u>${pro.u}</u>							
						</a>
						<button data-img="${pro.img}" data-em="${pro.em}" data-id="${pro.id}" data-u="${pro.u}">加入购物车</button>
					</div>
						`; 
			}
			//$(str).appendTo($(".product"));
			$(".product").html(str);
		})
	}
});
/*吸顶效果*/
$(window).scroll(function(e){
	var e = e || event;
	if ($(document).scrollTop() > 250){
		//alert(1)
		$(".pronav_b").css({"position":"fixed","top":0})
	}else{
		$(".pronav_b").css({"position":"static"})
	}
})

/*加入购物车*/
var arr = [];
$(".product").on("click","button",function(){
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
