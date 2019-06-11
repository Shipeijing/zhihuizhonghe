<template>
  <div class="right">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="全部" name="0"></el-tab-pane>
      <el-tab-pane :label="'未读 ('+totalNum+')'" name="1"></el-tab-pane>
    </el-tabs>
    <el-collapse accordion v-if="newsList.length>0" @change="changeColl">
      <el-collapse-item v-for="(item,i) in newsList" :name="i" :key="i">
        <template slot="title">
          <el-badge v-show="!item.isRead" is-dot class="badgeItem"></el-badge>{{item.title}}
        </template>
        <div style="color:#666666">{{item.context}}</div>
        <div style="color:#cccccc;text-align: right;margin-top:10px;padding-right:10px">{{item.createTime}}</div>
      </el-collapse-item>
    </el-collapse>
    <div style="text-align: right;margin-top:20px;">
      <el-pagination class="table-pagination"
          @current-change="handlePageChange"
          :current-page="pageNo"
          :page-size="max"
          layout="total, prev, pager, next, jumper"
          :total="totalPage">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../../store/services'
export default {
  async asyncData () {
    
  },
  data () {
    return {
      loading: true,
      activeName: 0,
      active: [],
      newsList: [],
      pageNo: 1,
      totalPage: 0,
      max:10,
      totalNum: ''
    }
  },
  watch:{
    activeName(val){
      if(val == 0){
        this.pageNo = 1
        this.getNewsList()
      }else if(val == 1){
        this.pageNo = 1
        this.getListNotRead()
      }
    }
  },
  head() {
    return {
      title: '智慧众合-会员消息'
    }
  },
  mounted(){
    this.getNewsList()
    this.getNotReadCount()
  },
  methods: {
    handleClick(){

    },
    getNewsList(){
      this.loading = true
      let parmas = {
        pageNo: this.pageNo
      }
      Services.getNewsAll(parmas).then(response => {
				if(response.data.code == 200){
          this.newsList = response.data.result.sysMessageList
          this.totalPage = Number(response.data.result.pageable.total);
          this.loading = false
        }
      })
    },
    getListNotRead(){
      this.loading = true
      let parmas = {
        pageNo: this.pageNo
      }
      Services.getListNotRead(parmas).then(response => {
				if(response.data.code == 200){
          this.newsList = response.data.result.sysMessageList
          this.totalPage = Number(response.data.result.pageable.total);
          this.loading = false
        }
      })
    },
    getNotReadCount(){
      Services.getNotReadCount().then(response => {
				if(response.data.code == 200){
          this.totalNum = response.data.result.total
        }
      })
    },
    handlePageChange(val) {
      this.pageNo = val
      if(this.activeName == 0){
        this.getNewsList()
      }else{
        this.getListNotRead()
      }
    },
    changeColl(index){
      console.log(index)
      let parmas = {
        id: this.newsList[index].id
      }
      Services.getNewsDetail(parmas).then(response => {
				if(response.data.code == 200){
          this.newsList[index].isRead = true
          this.totalNum = this.totalNum - 1
        }
      })
    }
  }
}
</script>
<style scoped>
	.content{
		background-color: #eeeeee;
	}
	.content .main{
		width: 1170px;
		margin: 0 auto;
		padding-top: 15px;
	}
	/*右侧开始*/
	.main .right {
		width: 896px;
    min-height: 500px;
		float: right;
		background-color: #FFFFFF;
		padding: 22px 42px;
		padding-bottom: 95px;
		margin-bottom: 15px;
	}
  .badgeItem{
    margin-top: 10px;
    margin-right: 10px;
  }
</style>