<template>
	<!--左侧开始-->
	<div class="left">
		<img class="tx" src="~/static/img/grtx.png" />
		<p class="name">{{$store.state.username}}</p>
		<div class="LeftboxList">
			<ul>
				<li>
					<p><img src="~/static/img/zl.png"/>商品管理<img class="jt" src="~/static/img/jr.png"/></p>
					<div class="zList">
						<ol class="subcategory">
							<nuxt-link :to="{path:'/personalCenter/shop/editProduct'}"><li :class="$route.path == '/personalCenter/shop/editProduct' ? 'active' : ''"><p>发布商品</p></li></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/shop/productList'}"><li :class="$route.path == '/personalCenter/shop/productList' ? 'active' : ''"><p>我的商品</p></li></nuxt-link>
						</ol>
					</div>
				</li>
				<li>
					<p><img class="aqzx" src="~/static/img/aqzx.png"/>订单管理<img class="jt" src="~/static/img/jr.png"/></p>
					<div class="zList">
						<ol class="subcategory">
							<nuxt-link :to="{path:'/personalCenter/shop/orderList'}"><li :class="$route.path == '/personalCenter/shop/orderList' ? 'active' : ''"><p>商城订单</p></li></nuxt-link>
						</ol>
					</div>
				</li>
				<li>
					<p><img class="aqzx" src="~/static/img/aqzx.png"/>店铺管理<img class="jt" src="~/static/img/jr.png"/></p>
					<div class="zList">
						<ol class="subcategory">
							<nuxt-link :to="{path:'/personalCenter/shop/shopInfo'}"><li :class="$route.path == '/personalCenter/shop/shopInfo' ? 'active' : ''"><p>店铺信息</p></li></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/shop/shopHonors'}"><li :class="$route.path == '/personalCenter/shop/shopHonors' ? 'active' : ''"><p>荣誉资质</p></li></nuxt-link>
							<li v-on:click="goMyShop()"><p>我的店铺</p></li>
							<!-- <li><p>交易账号</p></li> -->
						</ol>
					</div>
				</li>
				<li>
					<p><img class="aqzx" src="~/static/img/aqzx.png"/>账户管理<img class="jt" src="~/static/img/jr.png"/></p>
					<div class="zList">
						<ol class="subcategory">
							<nuxt-link :to="{path:'/personalCenter/shop/shopCash'}"><li :class="$route.path == '/personalCenter/shop/shopCash' ? 'active' : ''"><p>企业钱包</p></li></nuxt-link>
						</ol>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import Services from '../store/services'
export default {
  mounted(){
    this.initJs()//dom加载完成后引用
  },
  methods: {
    initJs(){
			$(".LeftboxList li").find(".active").parents(".zList").show();
			$(".LeftboxList li").find(".active").parents("li").find(".jt").css("transform","rotate(0deg)");
			$(".LeftboxList li").click(function(){
				$(this).siblings().find(".zList").hide();
				$(this).siblings().find(".jt").css("transform","rotate(270deg)");
				$(this).find(".jt").css("transform","rotate(0deg)");
				$(this).find(".zList").show();
			})
		},
		goMyShop(){
      var tempwindow=window.open();
			Services.getMyShop().then(response => {
				if(response.data.code == 200){
					tempwindow.location='/shopDetail?id='+response.data.result.shop.id
        }
      })
		}
  }
}
</script>
<style scoped>
	/*左侧开始*/
	.left{
		float: left;
		width: 176px;
		margin-right: 14px;
		background-color: #FFFFFF;
		min-height: 300px;
	}
	.left .tx{
		display: block;
		width: 75px;
		height: 75px;
		margin: 0 auto;
		margin-top: 20px;	
	}
	.left .name{
		font-size: 16px;
		text-align: center;
		padding-top: 20px;
		border-bottom: 1px solid #f3f3f3;
		padding-bottom: 25px;
	}

	.left .LeftboxList  ul{
		margin-top: 10px;
	}
	.left .LeftboxList  ul li{
		cursor: pointer;
		-moz-user-select: none;
		-khtml-user-select: none;
		user-select: none;
	}
	.left .LeftboxList  ul li p{
		font-size: 16px;
		color: #2f2f2f;
		width: 130px;
		height: 50px;
		line-height: 50px;
		margin: 0 auto;
	}
	.left .LeftboxList  ul li ol li p{
		height: 35px;
		line-height: 35px;
		font-size: 12px;
		color: #959595;
	}
	.left .LeftboxList  ul li ol li{
		border-left: 4px solid #FFFFFF;
	}
	.left .LeftboxList  ul li ol .active{
		background-color: #eeeeee;
		border-left: 4px solid #26a9e1;
	}
	.left .LeftboxList  ul .active .jt{
		transform:rotate(0deg);
	}
	.left .LeftboxList  ul li p .jt{
		display: block;
		float: right;
		width: 12px;
		margin-top: 20px;
		transform:rotate(270deg);
	}
	.left .LeftboxList  ul li p img:first-child{
		display: block;
		float: left;
		margin-top: 16px;
		margin-right: 17px;
	}
	.left .LeftboxList  ul li p .aqzx{
		margin-top: 18px !important;
	}
	.left .LeftboxList  ul li p .zx{
		margin-top: 18px !important;
	}
	.left .LeftboxList  ul li .zList{
		display: none;
	}
</style>