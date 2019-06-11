<template>
  <div class="right">
    <div class="shopInfo" v-if="showShopInfo">
      <el-button size="medium" @click="editBtn" type="primary" icon="el-icon-edit">编辑</el-button>
      <p>店铺所属会员：{{shopInfo.shopOwerId}}</p>
      <p>店铺名称：{{shopInfo.shopName}}</p>
      <p>店铺联系人：{{shopInfo.contact}}</p>
      <p>联系电话：{{shopInfo.shopTelephone}}</p>
      <p>店铺简介：{{shopInfo.shopIntro}}</p>
      <p>店铺副标题：{{shopInfo.shopSubtitle}}</p>
      <p>店铺类型：{{shopInfo.type}}</p>
      <p>创建时间：{{shopInfo.createTime}}</p>
      <p>店铺地址：{{shopInfo.shopAddress}}</p>
      <p>营业状态：{{shopInfo.shopStatus}}</p>
    </div>
    <div v-if="showEditFrom">
      <el-form class="edit-shop-form" :rules="shopFormRules" :model="shopFrom" ref="shopForm">
        <el-form-item label="店铺副标题：" label-width="120px" prop="shopSubtitle">
          <el-input size="small" v-model="shopFrom.shopSubtitle"></el-input>
        </el-form-item>
        <el-form-item label="店铺简介：" label-width="120px" prop="shopIntro">
          <el-input size="small" v-model="shopFrom.shopIntro"></el-input>
        </el-form-item>
        <!-- <el-form-item label="入驻行业：" label-width="120px" prop="enterIndustryCode">
          <template>
            <div v-for="item in industryList">
              <p>{{item.name}}</p>
              <el-checkbox-group 
                size="small"
                v-model="shopFrom.enterIndustryCode">
                <el-checkbox v-for="li in item.sub" :label="li.code" :key="li.code">{{li.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-form-item> -->
        <el-form-item label="联系人：" label-width="120px" prop="contact">
          <el-input size="small" v-model="shopFrom.contact"></el-input>
        </el-form-item>
        <el-form-item label="联系电话：" label-width="120px" prop="shopTelephone">
          <el-input size="small" v-model="shopFrom.shopTelephone" placeholder="请输入联系人手机号码"></el-input>
        </el-form-item>
        <el-form-item label="客服QQ：" label-width="120px" prop="shopQq">
          <el-input size="small" v-model="shopFrom.shopQq" placeholder="请输入客服QQ"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址：" label-width="120px" prop="areaId">
          <el-cascader
            size="small"
            :options="options"
            v-model="shopFrom.areaId"
          ></el-cascader>
          <el-input size="small" style="margin-top:20px" v-model="shopFrom.shopAddress" placeholder="请填写详细地址" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="店铺模版：" label-width="120px" prop="shopTemplate">
          <div v-for="i in shopTemplateList">
            <el-radio v-model="shopFrom.shopTemplate" :label="i.id">{{i.name}}</el-radio>
            <span style="font-size: 10px;color: #999;display: inline-block;margin-left: 10px" v-on:click="lookEg(i.thumbnail)">查看示例</span>
          </div>
        </el-form-item>
        <el-form-item label="店铺LOGO：" label-width="120px" >
          <el-upload
          class="avatar-uploader"
          :action="$store.state.baseImgUrl+'/api/upload/upload'"
          name="imgFile"
          :headers="headers"
          :show-file-list="false"
          :on-success="handlePositiveSuccess"
          accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
          <img v-if="imgP" :src="imgP" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"><span>上传店铺LOGO</span></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺banner：" label-width="120px" >
          <el-upload
          class="avatar-uploader"
          :action="$store.state.baseImgUrl+'/api/upload/upload'"
          name="imgFile"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleNegativeSuccess"
          accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
          <img v-if="imgN" :src="imgN" class="avatar-banner">
          <i v-else class="el-icon-plus avatar-uploader-icon"><span>上传店铺banner</span></i>
          </el-upload>
          <span class="tip">图片大小670*350</span>
        </el-form-item>
        <el-form-item>
          <el-button @click="submitFrom('shopForm')" type="primary">提交</el-button>
          <el-button @click="cancel" type="info">取消</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-if="showImgEg" class="imgBg">
      <img v-on:click="showImgEg = false" :src="imgEg">
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../../../store/services'
export default {
  async asyncData () {
    
  },
  computed: {
  	headers(){
  		return{
  			'Authorization': 'Bearer '+this.$store.state.access_token
  		}
  	}
  },
  data () {
    var checkPhone = (rule, value, callback) => {
  		if (!value) {
        return callback(new Error('请输入您的手机号码'));
      }
      if (value.length != 11) {
	      return callback(new Error('请填写正确的手机号码'));
	    }
      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/
	    if (!myreg.test(value)) {
	      return callback(new Error('请填写正确的手机号码'));
	    }
	    callback();
    };
    return {
      loading: true,
      shopInfo: {},
      shopFrom: {
        shopTemplate: 1, 
        shopLogo: "", 
        shopSubtitle: "", 
        shopAddress: "", 
        areaId: [], 
        shopBanner: "", 
        shopIntro: "", 
        shopTelephone: "",
        shopQq: '',
        contact: '',
        // enterIndustryCode: []
      },
      showShopInfo: false,
      showEditFrom: false,
      options: [],
      imgP: '',
      imgN: '',
      shopTemplateList: [],
      showImgEg: false,
      imgEg: '',
      shopFormRules: {
        shopSubtitle: [
					{ required: true, message: '请输入店铺副标题', trigger: 'blur' }
        ],
        shopIntro: [
					{ required: true, message: '请输入店铺简介', trigger: 'blur' }
        ],
        areaId: [
					{ required: true, message: '请完善店铺地址', trigger: 'blur' }
        ],
        shopTelephone: [
          { required: true, message: '请输入联系电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请输入联系人姓名', trigger: 'blur' }
        ],
        shopQq: [
					{ required: true, message: '请输入客服QQ', trigger: 'blur' }
        ],
        shopTemplate: [
					{ required: true, message: '请选择店铺模板', trigger: 'blur' }
        ],
        // enterIndustryCode: [
        //   { required: true, message: '请至少选择一个入驻行业', trigger: 'blur' }
        // ]
      },
      industryList: []
    }
  },
  head() {
    return {
      title: '智慧众合-店铺信息'
    }
  },
  mounted(){
	  this.getMyShop()
  },
  methods: {
    handlePositiveSuccess(res, file) {
    	if(res.code == 200){
    		this.shopFrom.shopLogo = res.result.image.thumbnail;
    		this.imgP = URL.createObjectURL(file.raw);
    	}else{
    		this.$message.error(res.message);
    	}
    },
    handleNegativeSuccess(res, file) {
    	if(res.code == 200){
    		this.shopFrom.shopBanner = res.result.image.path;
    		this.imgN = URL.createObjectURL(file.raw);
    	}else{
    		this.$message.error(res.message);
    	}
      //this.shopBanner = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      return isJPG;
    },
    getMyShop(){
      Services.getMyShop().then(response => {
				if(response.data.code == 200){
          this.shopInfo = response.data.result.shop
          this.showShopInfo = true
        }
      })
    },
    editBtn(){
      let self = this
      this.showShopInfo = false
      // this.getIndustryCode()
      this.getShopTemplateList()
      if(localStorage.getItem('cityCedeList')){
        self.options = JSON.parse(localStorage.getItem('cityCedeList'))
      }else{
        Services.getCityList().then(response => {
          if(response.data.code == 200){
            response.data.result.city.forEach(function(item) {
              if(item.level == 0){
                var obj = {value: item.code, label: item.name, id: item.id}
                self.options.push(obj)
              }else if(item.level == 1){
                self.options.forEach(function(a) {
                  if(item.parentId == a.id){
                    var o = {value: item.code, label: item.name, id: item.id}
                    if(a.children){
                      a.children.push(o)
                    }else{
                      a.children = [{value: item.code, label: item.name, id: item.id}]
                    }
                  }
                })
              }else if(item.level == 2){
                self.options.forEach(function(a) {
                  for(var i in a.children){
                    if(item.parentId == a.children[i].id){
                      var s = {value: item.code, label: item.name, id: item.id}
                      if(a.children[i].children){
                        a.children[i].children.push(s)
                      }else{
                        a.children[i].children = [{value: item.code, label: item.name, id: item.id}]
                      }
                      break
                    }
                  }
                })
              }
            })
            localStorage.setItem('cityCedeList', JSON.stringify(self.options))
          }
        })
      }
      for(var key in self.shopFrom){
        for(var i in self.shopInfo){
          if(key == i){
            if(!!self.shopInfo[i]){
              if(key == 'enterIndustryCode'){
                self.shopFrom[key] = self.shopInfo[i].split(",")
              }else if(key == 'areaId'){
                self.shopFrom[key] = [self.shopInfo[i].substr(0,2)+'0000',self.shopInfo[i].substr(0,4)+'00',self.shopInfo[i]]
              }else if(key == 'shopLogo'){
                self.shopFrom[key] = self.shopInfo[i]
                self.imgP = self.$store.state.baseImgUrl+self.shopInfo[i]
              }else if(key == 'shopBanner'){
                self.shopFrom[key] = self.shopInfo[i]
                self.imgN = self.$store.state.baseImgUrl+self.shopInfo[i]
              }else{
                self.shopFrom[key] = self.shopInfo[i]
              }
            }else{
              // if(key == 'enterIndustryCode'){
              //   self.shopFrom[key] = []
              // }else{
                self.shopFrom[key] = ''
              // }
            }
            
          }
        }
      }
      console.log(this.shopFrom)
      this.showEditFrom = true
    },
    getShopTemplateList(){
      let self = this
      Services.shopTemplateList().then(response => {
          if(response.data.code == 200){
            self.shopTemplateList=response.data.result.shopTemplate
          }
      })
    },
    getIndustryCode(){
      Services.getIndustryCode().then(response => {
        if(response.data.code == 200){
          this.industryList = response.data.result
        }else{
          this.$message.error(response.data.message)
        }
      })
    },
    lookEg(url){
      console.log(url)
      this.imgEg = this.$store.state.baseImgUrl+url
      this.showImgEg = true
    },
    restForm(){
      this.shopFrom = {
        shopTemplate: 1, 
        shopLogo: "", 
        shopSubtitle: "", 
        shopAddress: "", 
        areaId: [], 
        shopBanner: "", 
        shopIntro: "", 
        shopTelephone: "",
        shopQq: '',
        contact: '',
        // enterIndustryCode: []
      }
      this.imgP = ''
      this.imgN = ''
    },
    cancel(){
      this.showEditFrom = false
      this.restForm()
      this.showShopInfo = true
    },
    submitFrom(formName){
      let self = this
    	this.$refs[formName].validate((valid) => {
    		if (valid) {
    			if(!self.shopFrom.shopLogo){
	  				self.$message.error('请上传店铺LOGO')
	        	return false
          }
          if(!self.shopFrom.shopBanner){
	  				self.$message.error('请上传店铺Banner')
	        	return false
          }
          var params = {
            shopTemplate: self.shopFrom.shopTemplate,
            shopLogo: self.shopFrom.shopLogo,
            shopSubtitle: self.shopFrom.shopSubtitle,
            shopAddress: self.shopFrom.shopAddress,
            areaId: self.shopFrom.areaId[self.shopFrom.areaId.length-1],
            shopBanner: self.shopFrom.shopBanner,
            shopIntro: self.shopFrom.shopIntro,
            shopTelephone: self.shopFrom.shopTelephone,
            shopQq: self.shopFrom.shopQq,
            contact: self.shopFrom.contact
            // enterIndustryCode: String(self.shopFrom.enterIndustryCode)
          }
          Services.setMyShop(params).then(response => {
            if(response.data.code == 200){
              self.$message.success('修改成功')
              self.showEditFrom = false
              self.restForm()
              self.getMyShop()
              self.showShopInfo = true
            }else{
              self.$message.error(response.data.message)
            }
          })
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
    font-size: 14px;
  }
  .imgBg{
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    font-size: 0;
    height: 100%;
    overflow: scroll;
  }
  .imgBg img{
    width: 100%;
  }
</style>
<style>
.avatar-uploader{
		display: inline-block;
		margin-right: 30px;
	}
	.avatar-uploader .el-upload {
	    border: 1px dashed #d9d9d9;
	    border-radius: 6px;
	    cursor: pointer;
	    position: relative;
	    overflow: hidden;
	  }
	  .avatar-uploader .el-upload:hover {
	    border-color: #409EFF;
	  }
	  .avatar-uploader-icon {
	    font-size: 28px;
	    color: #8c939d;
	    width: 178px;
	    height: 128px;
	    margin-top: 50px;
	    text-align: center;
	  }
	  .avatar {
	    width: 178px;
	    height: 178px;
	    display: block;
	  }
    .avatar-banner {
	    width: 320px;
	    height: 178px;
	    display: block;
	  }
	  .avatar-uploader-icon span{
	  	font-size: 12px;
	  	display: block;
	  	margin-top: 30px;
    }
    .tip{
      font-size: 12px;
      color: #333333;
    }
</style>
