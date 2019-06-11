<template>
	<!--左侧开始-->
	<div class="left">
		<img class="tx" src="~/static/img/grtx.png" />
		<p class="name">{{$store.state.username}}</p>
		<div class="LeftboxList">
			<ul>
				<li>
					<p><img src="~/static/img/zl.png"/>资料管理<img class="jt" src="~/static/img/jr.png"/></p>
					<div class="zList">
						<ol class="subcategory">
							<nuxt-link :to="{path:'/personalCenter/config/baseInfo'}"><li :class="$route.path == '/personalCenter/config/baseInfo' ? 'active' : ''"><p>个人信息</p></li></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/config/address'}"><li :class="$route.path == '/personalCenter/config/address' ? 'active' : ''"><p>寄送地址</p></li></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/config/subjectManagement'}"><li :class="$route.path == '/personalCenter/config/subjectManagement' ? 'active' : ''"><p>主体管理</p></li></nuxt-link>
							<!-- <li><p>账号绑定</p></li> -->
						</ol>
					</div>
				</li>
				<li>
					<p><img class="aqzx" src="~/static/img/aqzx.png"/>安全中心<img class="jt" src="~/static/img/jr.png"/></p>
					<div class="zList">
						<ol class="subcategory">
							<nuxt-link :to="{path:'/personalCenter/config/authentication'}"><li :class="$route.path == '/personalCenter/config/authentication' ? 'active' : ''"><p>实名认证</p></li></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/config/editPsw'}"><li :class="$route.path == '/personalCenter/config/editPsw' ? 'active' : ''"><p>修改密码</p ></li></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/config/shopApply'}"><li :class="$route.path == '/personalCenter/config/shopApply' ? 'active' : ''"><p>我要开店</p></li></nuxt-link>
						</ol>
					</div>
				</li>
				<li>
					<p><img class="aqzx" src="~/static/img/aqzx.png"/>账户管理<img class="jt" src="~/static/img/jr.png"/></p>
					<div class="zList">
						<ol class="subcategory"><n
							<nuxt-link :to="{path:'/personalCenter/config/myCash'}"><li :class="$route.path == '/personalCenter/config/myCash' ? 'active' : ''"><p>我的钱包</p></li></nuxt-link>
						</ol>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default {
  mounted(){
    this.initJs()//dom加载完成后引用
  },
  methods: {
    initJs(){
			//左侧列表
			$(".LeftboxList li").find(".active").parents(".zList").show();
			$(".LeftboxList li").find(".active").parents("li").find(".jt").css("transform","rotate(0deg)");
			$(".LeftboxList li").click(function(){
			$(this).siblings().find(".zList").hide();
			$(this).siblings().find(".jt").css("transform","rotate(270deg)");
			$(this).find(".jt").css("transform","rotate(0deg)");
			$(this).find(".zList").show();
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