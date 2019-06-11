<template>
	<div>
		<!--主页开始-->
		<div class="clear"></div>
		<div class="content">
			<div class="main">
        <shopleft-nav v-if="$route.path.substring(0,20) == '/personalCenter/shop'" />
        <personal-left v-if="$route.path == '/personalCenter' || $route.path == '/personalCenter/memberNews' || $route.path.substring(0,22) == '/personalCenter/config'"/>
        <nuxt-child />
				<div class="clear"></div>
			</div>
		</div>
	</div>
</template>
<script>
import ShopleftNav from '~/components/ShopleftNav.vue'
import PersonalLeft from '~/components/PersonalLeft.vue'
export default {
  components: {
    ShopleftNav,
    PersonalLeft
  }
}
</script>
<style scoped>
	.content {
		background-color: #eeeeee;
	}
	.content .main {
		width: 1170px;
		margin: 0 auto;
		padding-top: 15px;
	}
	/*右侧开始*/
	.main .right {
		width: 896px;
		min-height: 500px;
		float: left;
		padding-bottom: 95px;
		margin-bottom: 15px;
	}
</style>