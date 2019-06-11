<template>
  <div class="right">
    <div class="top-operate">
      <el-form inline :model="searchForm" class="form-search">
          <el-form-item>
              <el-input size="mini" v-model="searchForm.keyString" placeholder="产品名称"></el-input>
          </el-form-item>
          <el-form-item label="分类">
              <el-cascader
                :options="productClassList"
                v-model="searchForm.productClassId"
                clearable
                size="mini"
              ></el-cascader>
          </el-form-item>
          <el-form-item label="是否上架">
              <el-select size="mini" v-model="searchForm.isEnable" placeholder="全部" >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="上架" value="true"></el-option>
                  <el-option label="下架" value="false"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="产品状态">
              <el-select size="mini" v-model="searchForm.productStatus" placeholder="全部" >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="正常" value="正常"></el-option>
                  <el-option label="下架" value="下架"></el-option>
                  <el-option label="删除" value="删除"></el-option>
                  <el-option label="不通过" value="不通过"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item size="mini" label="审核状态">
              <el-select v-model="searchForm.verifyStatus" placeholder="全部" >
                  <el-option label="全部" value=""></el-option>
                  <el-option label="待审核" value="待审核"></el-option>
                  <el-option label="通过" value="通过"></el-option>
                  <el-option label="不通过" value="不通过"></el-option>
              </el-select>
          </el-form-item>
          <el-form-item>
              <el-button size="mini" @click="search" type="primary" icon="search">查询</el-button>
          </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <el-table
      :data="goodsList"
      style="width: 100%;margin-top:30px;"
      v-loading="loading">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="产品图片">
              <!-- 自定义行样式 -->
              <template slot-scope="scope">
                  <img class="line-image" :src="$store.state.baseImgUrl+props.row.defalutImage">
              </template>
            </el-form-item>
            <el-form-item label="产品名称">
              <span>{{ props.row.title}}</span>
            </el-form-item>
            <el-form-item label="产品 ID">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="产品子标题">
              <span>{{ props.row.subTitle }}</span>
            </el-form-item>
            <el-form-item label="产品类别">
              <span>{{props.row.productClassId}}</span>
            </el-form-item>
            <el-form-item label="是否上架">
              <span>{{props.row.isEnable ? '上架' : '下架'}}</span>
            </el-form-item>
            <el-form-item label="产品状态">
              <span>{{props.row.productStatus}}</span>
            </el-form-item>
            <el-form-item label="审核状态">
              <span>{{props.row.verifyStatus}}</span>
            </el-form-item>
            <el-form-item label="默认型号">
              <p class="spanList"><span>{{props.row.productTags.tagName}}</span><span>{{'￥'+props.row.productTags.tagPrice+'元'}}</span><span>{{props.row.productTags.isEnable == 'true' ? '上架' : '下架'}}</span></p>
            </el-form-item>
            <el-form-item label="产品描述">
              <span>{{ props.row.summary }}</span>
            </el-form-item>
            <el-form-item label="发布时间">
              <span>{{ props.row.createTime }}</span>
            </el-form-item>
            <el-form-item label="更新时间">
              <span>{{ props.row.lastUpdateTime }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="商品 ID"
        prop="id"
        width="160">
      </el-table-column>
      <el-table-column
        label="商品名称"
        prop="title"
        width="180">
      </el-table-column>
      <el-table-column
        label="产品类别">
        <template slot-scope="scope">
            <span>{{scope.row.productClassId}}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="价格"
        prop="price">
      </el-table-column>
      <el-table-column
        label="产品状态"
        prop="productStatus"
        width="100">
      </el-table-column>
      <el-table-column
        label="上架状态"
        width="100">
        <template slot-scope="scope">
            <el-select size="mini" v-model="scope.row.isEnable" @change="changeEnable(scope.row)">
                <el-option label="上架" value='true'></el-option>
                <el-option label="下架" value='false'></el-option>
            </el-select>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        width="100">
        <template slot-scope="scope">
          <el-button @click="editBtn(scope.row)" type="text" size="small">编辑</el-button>
          <el-button v-if="scope.row.productStatus!='删除'" @click="deleteProduct(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination class="table-pagination"
        @current-change="handlePageChange"
        :current-page="pageNo"
        :page-size="max"
        layout="total, prev, pager, next, jumper"
        :total="total">
    </el-pagination>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../../../store/services'
export default {
  async asyncData () {
    
  },
  data () {
    return {
      loading: true,
      searchForm: {
        productClassId: [], 
        verifyStatus: '', 
        productStatus: '正常', 
        keyString: '', 
        isEnable: ''
      },
      //分页
      pageNo: 1,
      total: 0,
      max: 10,

      productClassList: [],
      goodsList: []
    }
  },
  head() {
    return {
      title: '智慧众合-我的店铺'
    }
  },
  mounted(){
    this.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
    if(this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_SHOP') > -1){
      this.getProductClass()
      this.handlePageChange(1)
    }else{
      this.$router.push({path: '/personalCenter/config/shopApply'})
      return
    }
  },
  methods: {
    handlePageChange(val) {
        this.pageNo = val
        this.initPageData({
          productClassId: this.searchForm.productClassId[1], 
          verifyStatus: this.searchForm.verifyStatus, 
          productStatus: this.searchForm.productStatus, 
          keyString: this.searchForm.keyString, 
          isEnable: this.searchForm.isEnable,
          pageNo: this.pageNo,
          max: this.max
        })
    },
    search() {
      this.pageNo = 1
      const params = {
          productClassId: this.searchForm.productClassId[1], 
          verifyStatus: this.searchForm.verifyStatus, 
          productStatus: this.searchForm.productStatus, 
          keyString: this.searchForm.keyString, 
          isEnable: this.searchForm.isEnable,
          pageNo: this.pageNo,
          max: this.max
      }
      this.initPageData(params)
    },
    initPageData(param){
      this.loading = true
      this.goodsList = []
      if(param){
        param.order = 'desc'
        param.max = this.max
      }else{
        var param = {
          order: 'desc',
          max: this.max
        }
      }
      setTimeout(() => {
          Services.productList(param).then(response => {
				      if(response.data.code == 200){
                  this.goodsList = response.data.result.productList
                  this.total = Number(response.data.result.pageable.total)
              }
              this.loading = false
          })
      }, 300)
    },
    getProductClass(){
      let self = this
      Services.getProductClass().then(response => {
				if(response.data.code == 200){
          response.data.result.productClassList.forEach(function(item) {
            if(item.parentId == 0){
              var obj = {value: item.id, label: item.name, id: item.id}
              self.productClassList.push(obj)
            }else{
              self.productClassList.forEach(function(a) {
                if(item.parentId == a.id){
                  var o = {value: item.id, label: item.name, id: item.id}
                  if(a.children){
                    a.children.push(o)
                  }else{
                    a.children = [{value: item.id, label: item.name, id: item.id}]
                  }
                }
              })
            }
          })
        }
      })
    },
    editBtn(row){
      this.$router.push({path: '/personalCenter/shop/editProduct', query: {id:row.id}})
    },
    deleteProduct(row){
      this.$confirm('删除后无法恢复，确认删除？')
      .then(_ => {
        Services.deleteProduct(row.id).then(response => {
          if(response.data.code == 200){
            this.$message.success('删除成功')
            this.initPageData()
          }else{
            this.$message.error(response.data.message)
          }
        })
      })
      .catch(_ => {});
    },
    changeEnable(row){
      console.log(row)
      let params = {
        isEnable: row.isEnable
      }
      Services.setProductEnable(row.id,params).then(response => {
        if(response.data.code == 200){
          this.$message.success('修改成功')
        }else{
          this.$message.error(response.data.message)
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
		float: left;
		background-color: #FFFFFF;
		padding: 22px 42px;
		padding-bottom: 95px;
		margin-bottom: 15px;
	}
  .shopInfo p{
    line-height: 50px;
  }
</style>
<style>
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .line-image{
    width: 50px;
  }
  .table-pagination{
    margin-top: 20px;
    text-align: right;
  }
  .form-search .el-form-item__content{
    width: 150px;
    margin-right: 20px;
  }
  .spanList span{
    display: inline-block;
    margin-right: 10px;
  }
</style>