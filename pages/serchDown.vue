<template>
	<div class="serchDownMain">
    <div class="tabs">
      <ul>
        <span>搜索类型：</span>
        <li :class="active == 1 ? 'active' : ''" v-on:click="changeTab(1)">服务</li>
        <li :class="active == 2 ? 'active' : ''" v-on:click="changeTab(2)">资源</li>
        <li :class="active == 3 ? 'active' : ''" v-on:click="changeTab(3)">资讯</li>
      </ul>
    </div>
		<div v-if="active == 1" class="shopProduct" id="shopProduct">
      <p class="noGoods" v-if="totalPage==0">暂无相关服务</p>
			<div class="imgList">
				<div class="prductList" v-for="item in prductDataList" @click="productDetail(item.id)">
					<div class="productImg">
						<img :src="$store.state.baseImgUrl+item.defalutImage" />
					</div>
					<div class="productInfo">
						<div class="proPrice">￥{{item.price == 0 ? '价格面议' : item.price}}</div>
						<div class="proTitle">{{item.title}}</div>
						<div class="shopName">{{item.shopName}}</div>
					</div>
				</div>
			</div>
		</div>
    <div v-if="active == 2" class="shopProduct">
      <p class="noGoods" v-if="totalPage==0">暂无相关资源</p>
			<div class="imgList">
				<div class="prductList" v-for="item in shopsDataList" @click="shopDetail(item.id)">
					<div class="productImg">
						<img :src="$store.state.baseImgUrl+item.shopLogo" />
					</div>
					<div class="shopInfo">
            <h5>{{item.shopName}}</h5>
            <div>
              <div class="text">
                <i class="el-icon-menu"></i>
                <span>行业：{{item.enterIndustry ? item.enterIndustry : '暂无行业信息'}}</span>
              </div>
            </div>
            <div class="clear"></div>
            <div>
              <div class="text">
                <i class="el-icon-news"></i>
                <span>简介：{{item.shopIntro}}</span>
              </div>
            </div>
          </div>
				</div>
			</div>
		</div>
    <div v-if="active == 3" class="shopProduct">
      <p class="noGoods" v-if="totalPage==0">暂无相关资源</p>
			<ul>
        <li class="newsleftLi" v-for="(item,index) in newsDataList">
          <img class="leftimg" :src="$store.state.baseImgUrl+item.image">
          <h1>{{item.title}}</h1>
          <p>{{item.remark}}</p>
          <a @click="seeInfo(item)">查看详情</a>
          <ol>
            <li>
              <img class="ly" src="~/static/img/ly.png" />
              <p>{{item.author}}</p>
            </li>
            <li>
              <img class="ll" src="~/static/img/ll.png" />
              <p>{{item.hitCount}}</p>
            </li>
            <li>
              <img class="sj" src="~/static/img/sj.png" />
              <p>{{item.createDate}}</p>
            </li>
          </ol>
        </li>
      </ul>
		</div>
		<div class="clear"></div>
		<!-- 分页 -->
    <el-pagination class="table-pagination"
        @current-change="handlePageChange"
        :current-page="pageNo"
        :page-size="max"
        layout="total, prev, pager, next, jumper"
        :total="totalPage">
    </el-pagination>
		
		<div class="clear"></div>
	</div>
	
</template>

<script>
	import axios from 'axios'
	import Services from '../store/services'
	export default {
  	beforeCreate () {
	    this.$store.dispatch('setNavName', '搜索结果')
	  },
    head() {
	    return {
	    	title: '智慧众合-'+'搜索结果'
	    }
	  },
	  data () {
	  	return {
        searchInfo: {},
	  		prductDataList:[],
	  		//分页
        pageNo: 1,
        totalPage: 0,
        max: 25,
        active: 1,
        shopsDataList: [],
        newsDataList: []
	  	}
    },
    watch: {
      $route(){
        this.searchInfo = this.$route.query
      },
      searchInfo() {
        this.isSearch()
      },
    },
	  mounted(){
      this.searchInfo = this.$route.query
	  },
	  methods: {
      isSearch(){
        this.searchInfo.pageNo = this.pageNo
        this.searchInfo.max = this.max
        if(this.active == 1){
          this.showProductInit(this.searchInfo);
        }else if(this.active == 2){
          this.showShopInit(this.searchInfo);
        }else{
          this.showNewsInit(this.searchInfo);
        }
      },
      changeTab(val){
        if(this.active != val){
          this.active = val
          this.pageNo = 1
          this.totalPage = 0
          this.isSearch()
        }
      },
	    //产品展示
	    showProductInit(param){
	    	let params = param
	    	Services.showProduct(params).then(response => {
		      	if(response.data.code == 200){
                  	this.prductDataList = response.data.result.productList;
                  	this.totalPage = Number(response.data.result.pageable.total);
              	}
          	})
      },
      //店铺展示
      showShopInit(param){
	    	let params = param
	    	Services.searchShop(params).then(response => {
          if(response.data.code == 200){
              this.shopsDataList = response.data.result.shopList;
              this.totalPage = Number(response.data.result.pageable.total);
          }
        })
      },
      //资讯展示
      showNewsInit(param){
        let params = param
        params.order = 'desc'
	    	Services.getNewsList(params).then(response => {
          if(response.data.code == 200){
              this.newsDataList = response.data.result.newsList;
              this.totalPage = Number(response.data.result.pageable.total);
          }
        })
      },
	    //分页
	    handlePageChange(val) {
          this.pageNo = val
          this.isSearch()
          window.scrollTo(0,0)
	    },
	    //查看商品详情
	    productDetail(id){
        var tempwindow=window.open();
        tempwindow.location='/productDetail?id='+id
      },
      //查看店铺详情
      shopDetail(id){
        var tempwindow=window.open();
        tempwindow.location='/shopDetail?id='+id
      },
      //查看资讯详情
      seeInfo(item){
        var tempwindow=window.open();
        tempwindow.location='/informationDetail?id='+item.id
      }
	  }
  }
</script>

<style scoped lang="scss">
	/*产品介绍*/
  .serchDownMain{
    .tabs{
      width: 1170px;
	    margin: 30px auto;
      ul{
        width: 100%;
        border-bottom: 2px solid #cccccc;
        text-align: right;
        font-size: 14px;
        li{
          display: inline-block;
          width: 100px;
          text-align: center;
          line-height: 40px;
          cursor: pointer;
        }
        .active{
          color: #F1F1F1;
          background-color: #26A9E1;
          font-weight: bold;
        }
      }
    }
    .shopInfo{
      text-align: left;
      .text{
        margin-top: 5px;
        height: 40px;
        line-height: 20px;
        overflow: hidden;
        position: relative;
      }
      .text::after {
        content:"...";
        color: #666666;
        font-weight:bold;
        position:absolute;
        bottom:0;
        right:0;
        padding:0 10px 1px 45px;
        background:url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png) repeat-y;
      }
      h5{
        text-align: center;
        font-size: 14px;
      }
      i{
        color: #FF7300;
        margin-left: 5px;
        display: block;
        width: 20px;
        float: left;
      }
      span{
        width: 190px;
        float: left;
        font-size: 14px;
        color: #757575;
        overflow: hidden;
        -webkit-line-clamp: 2;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
    }
    .newsleftLi{
      margin: 15px;
      padding: 10px;
      height: 152px;
      position: relative;
      margin-bottom: 10px;
      .leftimg{
        display: block;
        float: left;
        width: 228px;
        height: 152px;
        margin-right: 15px;
      }
      h1{
        font-size: 18px;
        color: #2F2F2F;
      }
      p{
        font-size: 12px;
        color: #959595;
        margin-top: 10px;
        line-height: 22px;
        overflow: hidden;
        -webkit-line-clamp: 3;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-box-orient: vertical;
      }
      a{
        float: left;
        display: block;
        width: 78px;
        height: 20px;
        line-height: 20px;
        text-align: center;
        color: #ff7301;
        font-size: 12px;
        border: 1px solid #ff7301;
        border-radius: 18px;
        position: absolute;
        left: 253px;
        bottom: 10px;
        cursor: pointer;
      }
      ol{
        float: right;
        position: absolute;
        right: 10px;
        bottom: 10px;
        li{
          float: left;
          margin-left: 25px;
          img{
            display: block;
            float: left;
          }
          p{
            margin: 0;
            float: left;
            padding-left: 10px;
          }
        }
        .ly{
          width: 13px;
          height: 13px;
          margin-top: 5px;
        }
        .ll{
          width: 19px;
          height: 11px;
          margin-top: 5px;
        }
        .sj{
          width: 13px;
          height: 13px;
          margin-top: 4px;
        }
      }
    }
    .newsleftLi:hover{
      background-color: #F9F9F9;
    }
    .noGoods{
      line-height: 80px;
      text-align: center;
      color: #666666;
      font-size: 18px;
    }
    .shopProduct{
      width: 1170px;
      margin: 30px auto;
    }
    .prductList{
      display: block;
      float: left;
      width: 18.4%;
      height: 310px;
      background-color: #FFFFFF;
      text-align: center;
      padding: 10px 0;
      margin-bottom: 50px;
      margin-right: 2%;
      cursor: pointer;
      position: relative;
      box-shadow: 0px 0px 1px 1px #F1F1F1;
    }
    .prductList:nth-child(5n+5) {
      margin-right: 0;
    }
    .prductList:hover{
      -moz-box-shadow:0px 0px 4px 2px #BDBDBD;
      -webkit-box-shadow:0px 0px 4px 2px #BDBDBD;
      box-shadow:0px 0px 4px 2px #BDBDBD;
    }
    .prductList .productImg{
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
    .prductList .productImg img{
      display: inline-block;
      vertical-align: middle;
      width:100%;
      height:100%;
    }
    .proTitle{
      position: absolute;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      margin-left: 20px;
      bottom: 45px;
      color: #000000;
      font-size: 14px;
    }
    .proPrice{
      width: 100%;
      position: absolute;
      bottom: 70px;
      color: #FF7E23;
      text-align: left;
      margin-left: 20px;
      font-size: 16px;
      font-weight: bold;
    }
    .shopName{
      width: 100%;
      position: absolute;
      bottom: 20px;
      color: #3d3d3d;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      margin-left: 20px;
      font-size: 12px;
    }
    /*分页*/
    .table-pagination{
        margin: 15px 0;
        text-align: center;
    }
  }
	
</style>