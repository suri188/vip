/*选择省份*/
$(".pro").click(function(){
	$(this).addClass("pro_color");
	$(".pro_b").show()
	
})
$(".pro_x ul").on("click","li",function(){
	$(this).addClass("prox_color").siblings().removeClass("prox_color");	
	$(".pro_em").html($(this).html());
	$(".pro").removeClass("pro_color");
	$(".pro_b").hide()
	alert("切换城市成功");
	
})
$(".pro_x li").hover(function(){
	$(this).addClass("prox_color").siblings().removeClass("prox_color")
})
$(".province").mouseleave(function(){
	$(".pro_b").hide();
	$(".pro").removeClass("pro_color");
})
/*导航*/
var $lis = $(".lis");//第一个导航
var $nav_box = $(".nav_box");//全部的侧导航
var $nav_ul = $(".nav_ul");//左边侧导航
var $nac_right = $(".nav_right")//右侧导航大的div
var $nav_big = $(".nav_big");//右边侧导航
/*吸顶效果*/
$(window).scroll(function(e){
	var e = e || event;
	if ($(document).scrollTop() > 195){
		//alert(1)
		$(".nav_u").css({"position":"fixed","top":0})
	}else{
		$(".nav_u").css({"position":""})
	}
})
/*鼠标滑过出现侧导航*/
$lis.hover(function(){
	$nav_box.show();
	$nav_ul.show();
},function(){
	$nav_ul.hide();
	$nav_box.hide();
})
/*鼠标滑过侧导航颜色发生变化，分级导航出现,离开隐藏*/
$nav_ul.on("mouseenter","li",function(){
		$(this).addClass("hover_nav")
			   .siblings()
			   .removeClass("hover_nav");
		var index = $(this).index();
		$nac_right.css("display","block");
		$nav_big.eq(index).addClass("selected").siblings().removeClass("selected");	
})
$nav_ul.on(	"mouseleave","li",function(){
	$(this).removeClass("hover_nav");
		
})
//克隆con1右侧导航的一块
$(".con1").clone().appendTo(".nav_big");
/*鼠标滑过横向导航时颜色发生变化*/
/*$(".nav_u").on("mousemove","nav_top",function(){
	console.log($(this).children("a"))
	$(this).children().first().addClass("nav_color").siblings().removeClass("nav_color");
})	*/

/*轮播图*/
var $banner = $(".banner");
var $pic = $(".pic_ul li");//轮播的图片
var $car = $(".car_ul li");//轮播的列表
var $left = $(".left");
var $right = $(".right");
/*左右键出现*/
$banner.mouseenter(function(){
	$left.animate({"left":0},1000)
	$right.animate({"right":0},1000)
}).mouseleave(function(){
	$left.animate({"left":-40},1000)
	$right.animate({"right":-40},1000)
})

/*自动轮播*/
$(function(){
	var timer = setInterval(auto,2000);
	var index = 0;
	function auto(){		
		if(index == $pic.size()){
			index = 0;
		}
		$pic.eq(index).fadeIn(1800).siblings().fadeOut(1800);
		$car.eq(index).addClass("b_color").siblings().removeClass("b_color");
		index++
	}
	$pic.mouseenter(function(){
		clearInterval(timer);
		index = $(this).index();
		auto();
	}).mouseleave(function(){
		timer = setInterval(auto,2000);
	})
	$car.mouseenter(function(){
		clearInterval(timer);
		index = $(this).index();
		$pic.eq(index).show().siblings().hide();
		$car.eq(index).addClass("b_color").siblings().removeClass("b_color");
	}).mouseleave(function(){
		timer = setInterval(auto,2000);
		
	})
	$right.click(function(){
		clearInterval(timer);
		index += 0;
		auto()
	})
	$left.click(function(){
		clearInterval(timer);
		index -=2
		auto();
	})
	$left.mouseleave(function(){
		timer = setInterval(auto,2000);
	})
	$right.mouseleave(function(){
		timer = setInterval(auto,2000);
	})
})


/*请求json数据*/
$.ajax({
	type:"get",
	url:"js/json1.json",
	async:true,
	success:function(json){
		
		for(var attr in json){
			var cur = json[attr];			
			//console.log(cur);//品牌女装 品牌男装
			var str = "";
			var str1 = "";
		 str1 += `<h4>${cur.name}</h4>`;
			$(str1).appendTo($(".morecon"));
			for(var i = 0; i < cur.list.length;i ++){
				var pro = cur.list[i];
				//console.log(pro)
				str += `					
					<div class = "more1">
						<div class="more_pic">
							<a href="page.html"><img src="images/${pro.src}.jpg" alt="" /></a>										
						</div>
						<div class="more_tit">
							<i >${pro.i}</i><em>折起</em><b>${pro.b}</b><u>${pro.u}</u><img src="images/timer_03.jpg" alt="" class="img1"/>
						</div>
					</div>
					`;
			}
			$(str).appendTo($(".morecon"))
		}
		
	}
});
/*回顶*/
$(window).scroll(function(e){
	var e = e || event;
	if($(document).scrollTop() > 500){
		$(".lc").show();		
	}else{
		$(".lc").hide();
	}
})
$(".lc").click(function(){
	$("body,html").animate({"scrollTop":0},1000)
})
