/*选择省份*/
$(".pro").click(function(){
	$(this).addClass("pro_color");
	$(".pro_b").show()
	/*$(document).click(function(){	
		$(".pro_b").hide()
})*/
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
/*$(window).scroll(function(e){
	var e = e || event;
	if ($(document).scrollTop() > 195){
		//alert(1)
		$(".nav_u").css({"position":"fixed","top":0})
	}else{
		$(".nav_u").css({"position":"static"})
	}
})*/
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

