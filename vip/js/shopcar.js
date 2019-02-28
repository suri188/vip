window.onload = function(){
	var cookies = getCookie("shoplist");
	var str = "";
	for(var i = 0; i < cookies.length; i ++){
		var shopinfor = cookies[i];
		console.log(shopinfor);
		str += '<div class="shop-item clear_fix">' +
					'<p class="fl"><input type="checkbox" class="ck"/></p>'+
					'<img class="fl" src="images/'+ shopinfor.src +'.jpg" alt="" />'+
					'<p class="fl">'+ shopinfor.uname +'</p>'+
					'<span class="fl">'+ shopinfor.pric+'元</span>'+
					'<p class="fl count" '+
						'data-id="'+ shopinfor.id +'" '+
						'data-price="'+ shopinfor.price +'" data-count="'+ shopinfor.count +'"'+
						'data-name="'+ shopinfor.uname +'" data-src="'+ shopinfor.src +'"'+
						'>'+
						'<span class="updateCount" data-number="1">+</span>'+
						'<span class="shop-count">'+ shopinfor.count +'</span>'+
						'<span class="updateCount" data-number="-1">-</span>'+
					'</p>'+
					'<em class="fl sumPrice">'+ (shopinfor.count * shopinfor.pric) +'元</em>'+
					'<i class="fl delBtn">删除</i>'+ 
				'</div>';
	}
	$(".shoplist").html(str);
	/*全选*/
	$("#selectAll").click(function(){
		$(".ck").prop("checked",$(this).prop("checked"));
		summ();
	})
	/*选中一个结算*/
	$(".ck").click(function(){
		summ();
	})
	function summ(){
		var count = 0;
		var money = 0;
		$(".ck:checked").each(function(){
			count += parseInt($(this).parent().parent().find(".shop-count").html());
			money += parseInt($(this).parent().parent().find(".sumPrice").html());
		})
		 $(".count2").html(count);
		 $(".money2").html(money);
	}
	/*加减操作*/
	$(".updateCount").click(function(){
		var num = $(this).data("number");
		var count = $(this).parent().find(".shop-count").html();
		if(count == 1 && num == -1){
			return;
		}
		/*加减的同时cookie中的值也要发生变化*/
		var pid = $(this).parent().data("id");
		for(var i = 0; i < cookies.length; i ++){
			if(pid == cookies[i].id){
				cookies[i].count += num;
				$(this).parent().find(".shop-count").html(cookies[i].count);
				$(this).parent().next().html(cookies[i].count*cookies[i].pric);
				summ();
				break;
			}
		}
	})
	
	/*删除数据*/
	$(".delBtn").click(function(){
		var flag = confirm("确定要删除这个商品吗？");
		if(flag){
			var pid = $(this).parent().find(".count").data("id");
			for(var i = 0; i < cookies.length; i ++){
				if(cookies[i].id == pid){
					cookies.splice(i,1);
					setCookie("shoplist",JSON.stringify(cookies),10);
					$(this).parent().remove();
					break
				}
			}
		}
		
	})
	/*购物袋中商品的个数*/
	function num(){
	var count = 0;
	var cookies = getCookie("shoplist");
	
	for(var i = 0 ; i < cookies.length; i ++){
		count += cookies[i].count;
	}
	$(".shop_num").html(count);
}
setInterval(num,1000);
}
