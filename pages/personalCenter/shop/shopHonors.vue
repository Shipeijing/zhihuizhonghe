<template>
  <div class="right">
    <el-button size="small" class="addBtn" type="primary" icon="el-icon-plus" v-on:click="dialogFormVisible = true">添加荣誉资质</el-button>
    <el-table
      v-loading="loading"
      :data="list"
      style="width: 100%;text-align: center;"
      element-loading-text="数据加载中...">
      <el-table-column
        prop="name"
        label="资质名称"
        align="center">
      </el-table-column>
      <el-table-column
        align="center"
        label="图片">
        <template slot-scope="scope">
          <img style="display: inline-block" class="line-image" :src="$store.state.baseImgUrl+scope.row.imgUrl">
        </template>
      </el-table-column>
      <el-table-column label="状态" width="70">
        <template slot-scope="scope">
          <el-tag size="mini" v-if="scope.row.verifyState == '待审核'" type="info">待审核</el-tag>
          <el-tag size="mini" v-if="scope.row.verifyState == '审核通过'">审核通过</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="delShopHonors(scope.row)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="新增荣誉资质" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="fromRules" ref="shopHonorsFrom">
        <el-form-item label="资质名称" :label-width="formLabelWidth" prop="name">
          <el-input size="small" v-model="form.name" placeholder="请填写资质名称"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px" prop="imgUrl">
          <el-upload
          class="avatar-uploader"
          :action="$store.state.baseImgUrl+'/api/upload/upload'"
          name="imgFile"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleNegativeSuccess"
          accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
          <img v-if="imgN" :src="imgN" class="avatar-img">
          <i v-else class="el-icon-plus avatar-uploader-icon"><span>上传资质图片</span></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitData('shopHonorsFrom')">确 定</el-button>
      </div>
    </el-dialog>
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
      formLabelWidth: '120px',
      form: {
        name: '',
        imgUrl: ''
      },
      dialogFormVisible: false,
      fromRules: {
				name: [
					{ required: true, message: '请填写资质名称', trigger: 'blur' }
        ],
        imgUrl: [
					{ required: true, message: '请上传资质图片', trigger: 'blur' }
        ],
      },
      imgN: '',
      list: []
    }
  },
  computed: {
  	headers(){
  		return{
  			'Authorization': 'Bearer '+this.$store.state.access_token
  		}
  	}
  },
  head() {
    return {
      title: '智慧众合-地址管理'
    }
  },
  watch: {
    dialogFormVisible(){
      let self = this
      if(self.dialogFormVisible == false){
        this.restData()
      }
    }
  },
  mounted(){
    this.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
    if(this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_SHOP') > -1){
      this.getshopHonors()
    }else{
      this.$router.push({path: '/personalCenter/config/shopApply'})
      return
    }
  },
  methods: {
    handleNegativeSuccess(res, file) {
    	if(res.code == 200){
    		this.form.imgUrl = res.result.image.thumbnail;
    		this.imgN = URL.createObjectURL(file.raw);
    	}else{
    		this.$message.error(res.message);
    	}
    },
    getshopHonors(){
      this.loading = true
      Services.listShopHonors().then(response => {
				if(response.data.code == 200){
          this.list = response.data.result.shopHonors
          this.loading = false
        }
      })
    },
    restData(){
      this.form = {
        name: '',
        imgUrl: ''
      }
      this.imgN = ''
      this.$refs['shopHonorsFrom'].resetFields();
    },
    submitData(formName){
      let _this = this
      _this.$refs[formName].validate((valid) => {
    		if (valid) {
          let params = this.form
          console.log(params)
          Services.createShopHonors(params).then(response => {
            if(response.data.code == 200){
              _this.$message.success('荣誉资质添加成功')
              _this.dialogFormVisible = false
              _this.getshopHonors()
            }else{
              _this.$message.error(response.data.message)
            }
          })
        }
      })
    },
    editShopHonors(row){
      this.editId = row.id
      this.isEdit = true
      this.form = {
        name: row.name,
        imgUrl: row.imgUrl
      }
      this.dialogFormVisible = true
    },
    delShopHonors(row){
      let _this = this
      _this.$confirm('确认删除？')
      .then(_ => {
        Services.deleteShopHonors(row.id).then(response => {
          if(response.data.code == 200){
            _this.$message.success('删除成功')
            _this.getshopHonors()
          }else{
            _this.$message.error(response.data.message)
          }
        })
      })
      .catch(_ => {});
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
		background-color: #FFFFFF;
		padding: 22px 42px;
		padding-bottom: 95px;
    margin-bottom: 15px;
	}
  .main .right .addBtn{
    margin: 20px 0;
  }
  .avatar-img{
    max-width: 200px;
  }
  .line-image{
    width: 150px;
  }
</style>
<style>
th{
  background-color: #EFEFEF !important;
  text-align: center !important;
}
</style>