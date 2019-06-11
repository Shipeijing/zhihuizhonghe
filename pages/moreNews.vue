<template>
	<div class="content">
		<div class="main">
			<!---->
			<div class="newsList">
				<div class="searchNews">
                    <input v-model="searchText" placeholder="输入关键字搜索新闻..."></input>
					<label @click="searchInit()">查询</label>
				</div>
				<div class="clear"></div>
				<ul>
					<li class="newsleftLi" v-for="(item,index) in news">
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
				<!-- 分页 -->
	          	<el-pagination class="table-pagination"
	              @current-change="handlePageChange"
	              :current-page="pageNo"
	              :page-size="max"
	              layout="total, prev, pager, next, jumper"
	              :total="totalPage">
	          	</el-pagination>
			</div>
			<div class="clear"></div>
		</div>
		<div class="clear"></div>
	</div>
</template>

<script>
	import axios from 'axios'
	import Services from '../store/services'
 	export default {
	  	beforeCreate () {
	    	this.$store.dispatch('setNavName', '新闻列表')
	  	},
  		head() {
		    return {
		    	title: '智慧众合-'+this.$store.state.navName,
		   	
		    }
	  	},
	  	data(){
		  	return{
		  		news:[],
		  		searchText:'',
		  		//分页
		      	pageNo: 1,
		      	totalPage: 999,
		      	max: 10,
		      	
		      	categoryId:'',
		  	}
	  	},
	  	mounted(){
	  		this.categoryId = Number(this.$route.query.newsClassId)
	  		this.getNewsInfo({
	  			keyString :this.searchText,
				order: "desc",
				pageNo: this.pageNo,
          		max: this.max
	  		})
	  	},
	  	methods: {
	  		getNewsInfo(param){
		    	let params = param
		    	Services.getNewsCategoryList(this.categoryId,params).then(response => {
					if(response.data.code == 200) {
						console.log(response.data);
						this.news = response.data.result.newsList;
						this.totalPage = Number(response.data.result.pageable.total);
					}
				})
		    },
		    searchInit(){
		    	this.getNewsInfo({
		  			keyString :this.searchText,
					order: "desc",
					pageNo: this.pageNo,
	          		max: this.max
		  		})
		    },
		    seeInfo(item){
				var tempwindow=window.open();
				tempwindow.location='/informationDetail?id='+item.id
		    },
		    handlePageChange(val) {
		        this.pageNo = val
		        this.getNewsInfo({
		          pageNo: this.pageNo,
		          max: this.max
		        })
		    },
	  	}
  	}
</script>

<style scoped>
	.content {
		background-color: #F3F3F3;
	}
	.main{
		width: 1170px;
		height: auto;
		zoom: 1;
		margin: 0 auto;
		padding: 20px 0;
		display: block;
	}
	.searchNews{
		height: 55px;
		text-align: right;
		margin: 15px 34px 0 0;
		border-bottom: 1px dashed #CCCCCC;
	}
	.searchNews input{
		width: 300px;
		height: 30px;
		border: 1px solid #C0C0C0;
		background-color: #F9F9F9;
		border-top-left-radius: 5px;
		border-bottom-left-radius: 5px;
		padding: 0 5px;
	}
	.searchNews label{
		width: 70px;
		height: 30px;
		text-align: center;
		line-height: 30px;
		border: 1px solid #33CDF4;
		background-color: #33CDF4;
		color: #FFFFFF;
		display: block;
		float: right;
		border-top-right-radius: 5px;
		border-bottom-right-radius: 5px;
		cursor: pointer;
	}
	.newsList{
		border-radius: 5px;
		margin-top: 15px;
		background-color: #FFFFFF;
		padding: 5px;
	}
	.newsleftLi{
		margin: 15px;
	}
	.newsleftLi:hover{
		background-color: #F9F9F9;
	}
	.content .main ul > li{
		padding: 10px;
		height: 152px;
		position: relative;
		margin-bottom: 10px;
	}
	.content .main .active{
		background-color: #f0f0f0;
	}
	.content .main .leftimg{
		display: block;
		float: left;
		width: 228px;
		height: 152px;
		margin-right: 15px;
	}
	.content .main ul li h1{
		font-size: 18px;
		color: #2F2F2F;
	}
	.content .main ul li a{
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
	.content .main ul p{
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
	.content .main ul .ly{
		width: 13px;
		height: 13px;
		margin-top: 5px;
	}
	.content .main ul .ll{
		width: 19px;
		height: 11px;
		margin-top: 5px;
	}
	.content .main ul .sj{
		width: 13px;
		height: 13px;
		margin-top: 4px;
	}
	.content .main ul > li ol{
		float: right;
		position: absolute;
		right: 10px;
		bottom: 10px;
	}
	.content .main ul > li ol li{
		float: left;
		margin-left: 25px;
	}
	.content .main ul > li ol li img{
		display: block;
		float: left;
	}
	.content .main ul > li ol li p{
		margin: 0;
		float: left;
		padding-left: 10px;
	}
	/*分页*/
	.table-pagination{
	    margin: 15px 0;
	    text-align: center;
  	}
</style>