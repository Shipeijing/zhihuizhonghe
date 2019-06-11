<template>
	<!--导航栏开始-->
	<div class="wodeNav">
		<section>
			<div class="left">
				<span>个人中心</span>
			</div>
			<div class="right">
				<ul>
					<nuxt-link :to="{path:'/personalCenter'}"><li :class="$route.path == '/personalCenter' ? 'active' : ''">首页<span></span></li></nuxt-link>
					<!-- <li style="position: relative;" :class="$route.path.substring(0,22) == '/personalCenter/config' ? 'active listLi' : 'listLi'">
						账户设置
						<span></span>
						<div class="list">
							<span></span>
							<nuxt-link :to="{path:'/personalCenter/config/baseInfo'}"><p>个人信息</p></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/config/address'}"><p>寄送地址</p></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/config/subjectManagement'}"><p>主体管理</p></nuxt-link>
							<p>账号绑定</p>
							<nuxt-link :to="{path:'/personalCenter/config/authentication'}"><p>实名认证</p></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/config/editPsw'}"><p>修改密码</p></nuxt-link>
							<nuxt-link :to="{path:'/personalCenter/config/shopApply'}"><p>我要开店</p></nuxt-link>
						</div>
					</li> -->
					<nuxt-link :to="{path:'/personalCenter/config/baseInfo'}"><li style="position: relative;" :class="$route.path.substring(0,22) == '/personalCenter/config' ? 'active' : ''">账户设置<span></span></li></nuxt-link>
					<nuxt-link :to="{path:'/personalCenter/memberNews'}"><li :class="$route.path == '/personalCenter/memberNews' ? 'active' : ''">我的消息<span></span></li></nuxt-link>
					<nuxt-link :to="{path:'/personalCenter/shop'}"><li :class="$route.path.substring(0,20) == '/personalCenter/shop' ? 'active' : ''">资源商中心<span></span></li></nuxt-link>
				</ul>
			</div>
		</section>
	</div>
	<!--导航栏结束-->
</template>
<script>
export default {
  mounted(){
    this.initJs()//dom加载完成后引用
  },
  methods: {
    initJs(){
			$(".listLi").mouseover(function(){
				$(".list").show()
			});
			$(".listLi").mouseout(function(){
				$(".list").hide()
			});
		},
  }
}
</script>
<style scoped>
	/*个人中心nav*/
	.wodeNav{
		width: 100%;
		height: 70px;
		line-height: 69px;
		margin: 0 auto;
		margin-top: 20px;
		background-color: #26a9e1;
	}
	.wodeNav section{
		width: 1170px;
		margin: 0 auto;
	}
	.wodeNav section .left{
		float: left;
		width: 176px;
		margin-right: 14px;
	}
	.wodeNav section .right{
		width: 920px;
		float: left;
	}
	.wodeNav section .left span{
		font-size: 22px;
		width: 130px;
		color: #FFFFFF;
		font-weight: bold;
		padding-left: 20px;
		cursor: pointer;
		border-right: 2px solid #FFFFFF;
		display: block;
		height: 25px;
	    line-height: 23px;
	    margin-top: 24px;
	}
	.wodeNav section .right ul{
		margin-left: 100px;
	}
	.wodeNav section .right ul li{
		float: left;
		color: #FFFFFF;
		padding: 0 50px;
		cursor: pointer;
		position: relative;
	}
	.wodeNav section .right ul li span{
		width: 0;
		height:0;
		border-left:10px solid transparent;
		border-right: 10px solid transparent;
		border-bottom: 10px solid #eeeeee;
		position: absolute;
		bottom: -1px;
		display: block;
		left:50%;
		margin-left:-10px;
		display: none;
	}
	.wodeNav section .right ul .active span{
		display: block;
	}
	.list{
		position: absolute;
		bottom: -288px;
		width: 100%;
		background-color: #ffffff;
		left: 0;
		color: #333333;
		box-shadow: 5px 5px 10px -4px #d3d3d3;
		z-index: 999;
		display: none;
	}
	.list p{
		line-height: 40px;
		border-top: 1px solid #EFEFEF;
		text-align: center;
		font-size: 14px;
	}
	.list span{
		width: 0;
		height:0;
		border-left:10px solid #ffffff;
		border-right: 10px solid #ffffff;
		border-bottom: 10px solid #ffffff;
		position: absolute;
		top: -9px;
		left:50%;
		margin-left:-10px;
		display: block !important;
	}
</style>
