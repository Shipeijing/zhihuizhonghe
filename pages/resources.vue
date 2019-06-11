<template>
  <div>
    <div class="clear"></div>
		<div class="content">
			<div class="main">
				<div class="top">
					<div class="topLeft">
						<ul>
							<li>
								<el-carousel arrow="never" :interval="4000">
									<el-carousel-item v-for="item in advertList1" :key="item.id">
										<img :src="$store.state.baseImgUrl+item.imageUrl" v-on:click="goLink(item.url)">
									</el-carousel-item>
								</el-carousel>
							</li>
							<li>
								<el-carousel arrow="never" :interval="4000">
									<el-carousel-item v-for="item in advertList2" :key="item.id">
										<img :src="$store.state.baseImgUrl+item.imageUrl" v-on:click="goLink(item.url)">
									</el-carousel-item>
								</el-carousel>
							</li>
						</ul>
					</div>
					<!--<div class="clear"></div>-->
					<div class="topxRight">
						<ul>
              <li v-if="shopTopList.length<1">暂无推荐</li>
							<li v-for="item in shopTopList" v-on:click="goShopDetail(item.objectId)">
                <div class="shopImg">
									<img :src="$store.state.baseImgUrl+item.images">
								</div>
								<div class="shopInfo">
                  <h5>{{item.title}}</h5>
                  <div>
										<div class="text">
											<i class="el-icon-menu"></i>
										</div>
										<p class="text1">{{item.filed1}}</p>
									</div>
								</div>
							</li>
						</ul>
					</div>
				</div>
				<div class="clear"></div>
				<div class="centerCon">
					<div class="typeList">
						<ul v-for="list in industryList" v-if="list.parentId == 0">
							<span>{{list.name}}：</span>
							<li v-for="item in industryList" v-if="item.parentId == list.id" :class="industryCode == item.pCode ? 'active' : ''" v-on:click="changeCode(item.pCode)">{{item.name}}</li>
						</ul>
					</div>
					<div class="chooseCity">
						<div>
							<span class="cityTitle">当前城市：</span>
							<!-- <span class="cityList" @click="chooseCity()">全国<i class="el-icon-caret-bottom"></i></span> -->
              <span class="cityList">全国</span>
						</div>
						<div class="menuBar">
							<span>资源商城<i class="el-icon-arrow-right"></i></span><span>行业分类</span>
						</div>
						
					</div>
				</div>
				<div class="cityListBox" v-show="chooseCityBox">
					<span>热门：</span>
					<span>
						<ul>
							<li v-for="(item,index) in cityList" :class="active==item.name ? 'cityListBoxActive' : ''">{{item.name}}</li>
						</ul>
					</span>
				</div>
				<div class="clear"></div>
				<div class="bottomCon">
					<div class="botLeft">
						<ul>
							<li v-for="item in shopList">
                <div v-on:click="goShopDetail(item.id)">
                  <div class="shopImg">
                    <img :src="$store.state.baseImgUrl+item.shopLogo">
                  </div>
                  <div class="shopInfo">
                    <h5>{{item.shopName}}</h5>
                    <div>
                      <div class="text">
                        <i class="el-icon-menu"></i>
                        <span>行业：</span>
                      </div>
                      <p class="text1">{{item.enterIndustry ? item.enterIndustry : '暂无行业信息'}}</p>
                    </div>
                    <div class="clear"></div>
                    <div>
                      <div class="text">
                        <i class="el-icon-news"></i>
                        <span>简介：</span>
                      </div>
                      <p class="text1">{{item.shopIntro}}</p>
                    </div>
                    <div class="clear"></div>
                  </div>
                </div>
                <div class="btn"><a :href="'tencent://message/?uin='+item.shopQq+'&Site=sc.chinaz.com&Menu=yes'">联系我们</a></div>
							</li>
						</ul>
						<div class="clear"></div>
						<!-- 分页 -->
						<el-pagination class="table-pagination"
								@current-change="handlePageChange"
								:current-page="pageNo"
								:page-size="max"
								layout="total, prev, pager, next, jumper"
								:total="totalPage">
						</el-pagination>
					</div>
					<div class="botRight">
						<div class="titleBox">
							<p>
								<span class="topx">精品</span><span class="black">资源</span>
							</p>
							<p class="tuiguang">推广</p>
						</div>
						<div class="clear"></div>
						<ul>
							<p v-if="serviceList.length<1">暂无推荐</p>
							<li v-for="item in serviceList"><img :src="$store.state.baseImgUrl+item.images" v-on:click="goShopDetail(item.objectId)"></li>
						</ul>
					</div>
				</div>
			</div>
		</div>
		<div class="clear"></div>
  </div>
</template>
<script>
  import Services from '../store/services'
  export default {
  	beforeCreate () {
	    this.$store.dispatch('setNavName', '资源商城')
		},
		async asyncData () {
			let [data] = await Promise.all([
				Services.getProductClass()
			])
			return {
				industryList: data.data.result.productClassList
			}
		},
	  data () {
	    return {
	    	chooseCityBox:false,
	    	cityList:[
	    		{ name: '北京'},
          { name: '上海'},
          { name: '南京'},
          { name: '苏州'}
        ],
        shopList: [],
				active: '',
        industryCode: '',
        shopTopList: [],
				serviceList: [],
				advertList1: [],
				advertList2: [],
				pageNo: 1,
        totalPage: 0,
        max: 12
	    }
	  },
    head() {
	    return {
				title: '知识产权代理公司_知识产权服务平台-智慧众合',
				meta: [
					{ hid: 'keywords', name: 'keywords', content: '知识产权代理公司,知识产权服务平台,专利申请交易代理公司,高新企业申报和科技项目申报代理公司,商标注册转让代理公司' },
					{ hid: 'description', name: 'description', content: '智慧众合资源商城为企业提供知识产权交易服务接口，与知识产权代理公司对接，解决企业面临的知识产权方面存在的问题。资源商城收录分类齐全的知识产权代理公司，满足企业解决各类问题的需求。' }
				]
	    }
	  },
	  mounted(){
			this.getAdvertList()
      this.searchRecommend()
			this.searchShop()
			this.searchService()
	  },
	  methods: {
			//分页
	    handlePageChange(val) {
          this.pageNo = val
          this.searchShop()
          window.scrollTo(0,610)
	    },
      searchRecommend(){
				let params={
          pageNo: 1,
          max: 8,
					posCode :"1006"
				}
				Services.searchRecommendList(params).then(response => {
					if(response.data.code == 200) {
						console.log(response.data);
						this.shopTopList = response.data.recomments;
					}
				})
			},
      searchService(){
				let params={
          pageNo: 1,
          max: 4,
					posCode :"1007"
				}
				Services.searchRecommendList(params).then(response => {
					if(response.data.code == 200) {
						console.log(response.data);
						this.serviceList = response.data.recomments;
					}
				})
			},
			getAdvertList(){
				Services.advertList('1003').then(response => {
					if(response.data.code == 200) {
						console.log(response.data);
						this.advertList1 = response.data.result;
					}
				})
				Services.advertList('1004').then(response => {
					if(response.data.code == 200) {
						console.log(response.data);
						this.advertList2 = response.data.result;
					}
				})
			},
			changeCode(code){
				if(this.industryCode != code){
					this.industryCode = code
					this.searchShop(code)
				}else{
					this.industryCode = ''
					this.searchShop()
				}
			},
      searchShop(code){
        let params={
					max: this.max,
					pageNo: this.pageNo,
					order: "desc"
				}
				if(code){
					params.enterIndustryCode = code
				}
        Services.searchShop(params).then(response => {
          if(response.data.code == 200) {
						this.shopList = response.data.result.shopList
						this.totalPage = Number(response.data.result.pageable.total);
          }
        })
      },
	   	chooseCity:function(){
        this.chooseCityBox = !this.chooseCityBox
      },
      goShopDetail(id){
        var tempwindow=window.open();
        tempwindow.location='/shopDetail?id='+id
			},
			goLink(url){
				var tempwindow=window.open();
        tempwindow.location=url
			}
	  }
  }
</script>

<style scoped lang="scss">
/**{
	margin: 0;
	padding: 0;
}*/
.clear{
	clear: both;
}
.content{
	background-color: #eeeeee;
	min-height: 1000px;
	padding-bottom: 30px;
}
.content .main{
	width: 1170px;
	margin: 0 auto;
}
.content .broadcast{
	margin-top: -1px;
}
.top{
	width: 100%;
	height: auto;
	zoom: 1;
	overflow: hidden;
}
.topLeft{
	width: 240px;
	height: 470px;
	display: block;
	float: left;
	margin-top: 5px;
}
.topLeft ul,
.topxRight ul{
	margin: 0;
	padding: 0;
	display: block;
}
.topLeft ul li{
	width: 240px;
	height: 230px;
	margin: 3px 0 0 0;
	cursor: pointer;
}
.topLeft ul li img{
	width: 100%;
	height: 230px;
	display: block;
	border-radius: 10px;
}
.topLeft ul li:last-child{
	margin-top: 10px;
}
.topxRight{
	width: 930px;
	height: 470px;
	display: block;
	float: left;
}
.topxRight ul li{
	float: left;
	width: 222px;
	height: 230px;
	margin: 9px 0 0 10px;
	background-color: #FFFFFF;
	cursor: pointer;
}
.topxRight ul li:hover{
  -moz-box-shadow:0px 5px 13px #BDBDBD;
  -webkit-box-shadow:0px 5px 13px #BDBDBD;
  box-shadow:0px 5px 13px #BDBDBD;
}
.topxRight ul li .shopImg{
	width: 90%;
	height: 120px;
	display: block;
	margin: 10px auto;
}
.topxRight ul li .shopImg img{
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
	display: block;
	margin: auto;
}
.topxRight ul li img{
	width: 100%;
	height: 100%;
}
.topxRight ul li .shopInfo{
  margin: 10px;
  h5{
    font-size: 14px;
    margin: 10px 0;
  }
  .text{
		width: 14px;
		margin-right: 5px;
    i{
      font-size: 16px;
      color: #FF7300;
      vertical-align: bottom;
    }
	}
	.text1{
		font-size: 12px;
		width: 180px;
	}
}

.centerCon{
	width: 100%;
	height: auto;
	zoom: 1;
	overflow: hidden;
	margin-top: 30px;
	background-color: #FFFFFF;
}
.centerCon ul{
	height: auto;
	zoom: 1;
	overflow: hidden;
	margin: 0 10px;
	padding: 10px 10px;
	border-bottom: 1px dashed #E1E1E1;
}
.typeList span{
	color: #2D2D2D;
	padding: 2px 0;
	font-weight: bold;
	float: left;
	font-size: 14px;
}
.typeList ul li{
	padding: 2px 10px;
	color: #2D2D2D;
	float: left;
	margin-left: 15px;
	cursor: pointer;
	font-size: 14px;
}
.typeList ul li.active{
	color: #26A9E1;
}
.chooseCity{
	height: auto;
	zoom: 1;
	overflow: hidden;
	font-size: 15px;
	margin: 10px 20px;
	position: relative;
	font-size: 14px;
}
.cityListBox{
	width: 400px;
	height: auto;
	position: absolute;
	top: 890px;
	left: 170px;
	z-index: 99999;
	background-color: #FFFFFF;
	color: #8B8B8B;
	padding: 5px 10px;
	box-shadow: 0px 0px 4px 0px #CCCCCC;
}
.cityListBoxActive{
	color: #F6935C;
}
.cityListBox span:first-child{
	display: block;
	float: left;
}
.cityListBox span:last-child{
	width: 350px;
	display: block;
	float: left;
}
.cityListBox span:last-child ul li{
	float: left;
	margin-left: 15px;
	margin-bottom: 5px;
}
.chooseCity div{
	display: block;
	float: left;
}
/*.chooseCity div:last-child{
	float: left;
}*/
.chooseCity div:last-child{
	float: right;
}
.chooseCity .cityTitle{
	color: #323232;
	
}
.cityList{
	color: #FC7203;
	cursor: pointer;
}
.el-icon-caret-bottom{
	color: #B8B8B8;
	cursor: pointer;
}
.menuBar{
	color: #898989;
}



.bottomCon{
	width: 100%;
	height: auto;
	zoom: 1;
	overflow: hidden;
	margin-top: 15px;
}
.botLeft ul,
.botRight ul{
	margin: 0;
	padding: 0;
	display: block;
}

.botLeft{
	width: 930px;
	display: block;
	float: left;
}
.botLeft ul li{
	float: left;
	width: 222px;
	height: 300px;
	margin: 9px 10px 0 0;
	background-color: #FFFFFF;
  position: relative;
  cursor: pointer;
}
.botLeft ul li:hover{
  -moz-box-shadow:0px 5px 13px #BDBDBD;
  -webkit-box-shadow:0px 5px 13px #BDBDBD;
  box-shadow:0px 5px 13px #BDBDBD;
}
.botLeft ul li .shopImg{
	width: 90%;
	height: 100px;
	display: block;
	margin: 10px auto;
}
.botLeft ul li .shopImg img{
	width: auto;
	height: auto;
	max-width: 100%;
	max-height: 100%;
	display: block;
	margin: 0 auto;
}
.text{
	width: 31%;
	display: block;
	float: left;
}
.text1{
	position: relative;
	width: 69%;
	display: block;
	float: left;
	margin-top: 4px;
	line-height:20px;
	max-height: 60px;
	overflow: hidden;
}
.text1::after {
	content:"...";
	font-weight:bold;
	position:absolute;
	bottom:0;
	right:0;
	padding:0 20px 1px 45px;
	background:url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;
}
.botLeft ul li .shopInfo h5{
	text-align: center;
}
.botLeft ul li .shopInfo i{
	color: #FF7300;
	margin: 5px 5px;
}
.botLeft ul li .shopInfo span,
.botLeft ul li .shopInfo p{
	font-size: 14px;
	color: #757575;
}
.botLeft ul li .btn{
  width: 100px;
  line-height: 30px;
  text-align: center;
  background-color: #cccccc;
  border-radius: 25px;
  font-size: 12px;
  position: absolute;
  bottom: 20px;
  left: 60px;
  color: #FFFFFF;
}
.botLeft ul li:hover .btn{
  background-color: #26A9E1;
}
.botRight{
	width: 240px;
	height: auto;
	display: block;
	float: left;
	margin-top: 9px;
	background-color: #FFFFFF;
}
.botRight ul li{
	width: 220px;
	margin: 10px auto;
	cursor: pointer;
}
.botRight ul li img{
	width: 100%;
	display: block;
	border-radius: 10px;
}
.botRight ul li:last-child img{
	margin-top: 10px;
}
.titleBox{
	width: 100%;
	height: 30px;
	line-height: 30px;
	/*zoom: 1;
	overflow: hidden;*/
	border-bottom: 2px solid #EFEFEF;
	margin: 12px 5px;
	/*padding: 3px;*/
}
.topx{
  color: #26A9E1;
  font-weight: bold;
  display: block;
  float: left;
  border-bottom: 2px solid #26A9E1;
  height: 30px;
	line-height: 30px;
  /*padding: 3px;*/
}
.black{
	color: #000000;
	display: block;
  float: left;
	font-weight: bold;
	border-bottom: 2px solid #26A9E1;
	height: 30px;
	line-height: 30px;
	/*padding: 3px;*/
}
.tuiguang{
	display: block;
	float: right;
	height: 20px;
	line-height: 20px;
	background-color: #EFEFEF;
	border: 1px solid #E5E5E5;
	border-radius: 20px;
	color: #A1A1A1;
	font-size: 14px;
	padding: 1px 10px;
	margin: 3px 11px 0 0;
}
/*分页*/
.table-pagination{
		margin: 50px 0 0;
		text-align: center;
}
</style>
