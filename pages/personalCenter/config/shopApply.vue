<template>
  <div class="right">
    <div class="showRZ" v-if="showRZ">
      <p>申请开店需要先实名认证</p>
      <nuxt-link :to="{path:'/personalCenter/config/authentication'}"><el-button size="small" type="primary" round>去认证</el-button></nuxt-link>
    </div>
    <div class="shopFrom" v-if="showFrom">
      <el-form class="apply-shop-form" :rules="applyFromRules" :model="applyData" ref="applyDataForm">
        <el-form-item label="店铺名称：" label-width="140px" prop="shopName">
          <el-input v-model="applyData.shopName" placeholder="请输入店铺名称"></el-input>
        </el-form-item>
        <el-form-item label="联系人：" label-width="140px" prop="contact">
          <el-input v-model="applyData.contact" placeholder="请输入联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系人手机：" label-width="140px" prop="shopTelephone">
          <el-input v-model="applyData.shopTelephone" placeholder="请输入联系人手机"></el-input>
        </el-form-item>
        <el-form-item label="店铺类型：" label-width="140px" prop="type">
          <template>
            <el-radio v-if="ROLE_SELF" v-model="applyData.type" label="个人">个人</el-radio>
            <el-radio v-if="ROLE_CO" v-model="applyData.type" label="企业">企业</el-radio>
          </template>
        </el-form-item>
        <el-form-item label="入驻行业：" label-width="140px" prop="enterIndustryCode">
          <template>
            <div v-for="item in industryList">
              <p>{{item.name}}</p>
              <el-checkbox-group 
                size="small"
                v-model="applyData.enterIndustryCode">
                <el-checkbox v-for="li in item.sub" :label="li.code" :key="li.code">{{li.name}}</el-checkbox>
              </el-checkbox-group>
            </div>
          </template>
        </el-form-item>
        <el-form-item label="店铺子标题：" label-width="140px" prop="shopSubtitle">
          <el-input v-model="applyData.shopSubtitle" placeholder="经营范围：知识产权..."></el-input>
        </el-form-item>
        <el-form-item label="店铺简介：" label-width="140px" prop="shopIntro">
          <el-input v-model="applyData.shopIntro" placeholder="我司成立于xxxx，主营xxxx"></el-input>
        </el-form-item>
        <el-form-item label="店铺地址：" label-width="140px" prop="shopAddress">
          <el-input v-model="applyData.shopAddress"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="submitApply('applyDataForm')" class="btn" type="primary">提交申请</el-button>
    </div>
    <div class="shopInfoList" v-if="shopInfo">
      <div v-if="shopInfo.verifyStatus == '审核通过'">
        <div class="perInfoTop">
          <div>
            <img class="successImg" src="~/static/img/success.png" />
            <div class="text">恭喜你，已成功入驻智慧众合</div>
            <div class="go">可前往完善店铺基础信息或发布商品</div>
          </div>
          <div class="btnList">
            <nuxt-link :to="{path:'/personalCenter/shop/editProduct'}"><div class="release">一键发布商品</div></nuxt-link>
            <nuxt-link :to="{path:'/personalCenter/shop/shopInfo'}"><div class="setUp">设置店铺资料</div></nuxt-link>
          </div>
          <div class="clear"></div>
        </div>
        <!-- <div class="perInfoBottom">
          <div class="title">我的入驻资料</div>
          <div class="ragisterInfo">
            <div>
              <span class="info1">会员账号：</span>
              <span class="info2 accountNum">17372200823</span>
            </div>
            <div class="clear"></div>
            <div>
              <span class="info1">认证方式：</span>
              <span class="info2 per">个人</span>
              <span class="info3">升级为企业>></span>
            </div>
            <div class="clear"></div>
            <div>
              <span class="info1">姓名：</span>
              <span class="info2 name">董慧</span>
            </div>
            <div class="clear"></div>
            <div>
              <span class="info1">手机号码：</span>
              <span class="info2 tel">17372200823</span>
            </div>
            <div class="clear"></div>
            <div>
              <span class="info1">身份证图片：</span>
              <span class="info2 idcard">
                <img src="~/static/img/a1.png" />
                <img src="~/static/img/a1.png" />
              </span>
            </div>
            <div class="clear"></div>
          </div>
        </div> -->
      </div>
      <div v-else>
        <p>营业状态：{{shopInfo.shopStatus}}</p>
        <p>申请开店时间：{{shopInfo.createTime}}</p>
        <p>审核状态：{{shopInfo.verifyStatus}}</p>
        <p>审核时间：{{shopInfo.verifyTime}}</p>
      </div>
    </div>
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
      ROLE_SHOP: false,
      ROLE_SELF: false,
      ROLE_CO: false,
      showRZ: false,
      showFrom: false,
      shopInfo: '',
      applyData: {
        shopName: '',
        shopTelephone: '',
        type: '',
        shopSubtitle: '',
        shopIntro: '',
        shopAddress: '',
        contact: '',
        enterIndustryCode: []
      },
      applyFromRules: {
        shopName: [
					{ required: true, message: '请输入店铺名称', trigger: 'blur' }
        ],
        shopTelephone: [
					{ required: true, message: '请输入联系电话', trigger: 'blur' }
        ],
        shopSubtitle: [
					{ required: true, message: '请输入店铺子标题', trigger: 'blur' }
        ],
        shopIntro: [
					{ required: true, message: '请输入店铺简介', trigger: 'blur' }
        ],
        shopAddress: [
					{ required: true, message: '请输入店铺地址', trigger: 'blur' }
        ],
        contact: [
					{ required: true, message: '请输入联系人', trigger: 'blur' }
        ],
        type: [
					{ required: true, message: '请选择店铺类型', trigger: 'blur' }
        ],
        enterIndustryCode: [
          { required: true, message: '请至少选择一个入驻行业', trigger: 'blur' }
        ]
      },
      industryList: []
    }
  },
  head() {
    return {
      title: '智慧众合-我的店铺'
    }
  },
  mounted(){
    let self = this
    this.getIndustryCode()
    this.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
    console.log(this.$store.state.roles)
    if(this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_SHOP') > -1){
      self.ROLE_SHOP = true
      self.getShopStatus()
    }else if(this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_SELF') > -1){
      self.ROLE_SELF = true
      self.showFrom = true      
    }else if(this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_CO') > -1){
      self.ROLE_CO = true
      self.showFrom = true      
    }else{
      self.showRZ = true
    }
  },
  methods: {
    getShopStatus(){
      let self = this
      Services.myShopStatus().then(response => {
        if(response.data.code == 200){
          if(!!response.data.result.status.createTime){
            self.shopInfo = response.data.result.status
          }else{
            self.showFrom = true        
          }
        }else{
          self.$message.error(response.data.message)
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
    submitApply(formName){
      let self = this
    	this.$refs[formName].validate((valid) => {
    		if (valid) {
          let params = {
            shopName: self.applyData.shopName,
            shopTelephone: self.applyData.shopTelephone,
            type: self.applyData.type,
            shopSubtitle: self.applyData.shopSubtitle,
            shopIntro: self.applyData.shopIntro,
            shopAddress: self.applyData.shopAddress,
            contact: self.applyData.contact,
            enterIndustryCode: String(self.applyData.enterIndustryCode)
          }
          Services.applyShopManage(self.applyData).then(response => {
            if(response.data.code == 200){
              self.showFrom = false
              self.$message.success('提交成功！')
              self.getShopStatus()
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
		float: right;
		background-color: #FFFFFF;
		padding: 22px 42px;
		padding-bottom: 95px;
		margin-bottom: 15px;
	}
  .showRZ{
    text-align: center;
    margin-top: 50px;
  }
  .showRZ p{
    margin-bottom: 30px;
  }
  .btn{
    margin: 30px 50px;
  }
  .shopInfoList p{
    line-height: 50px;
  }
  /*个人中心s按钮*/
	.perInfoTop{
		width: 100%;
		height: auto;
		padding: 40px 0;
		background: #FFFFFF;
		text-align: center;
	}
	.successImg{
		width: 200px;
		height: 270px;
	}
	.text{
		color: #333333;
		font-size: 20px;
		padding: 15px 0;
	}
	.go{
		color: #999999;
		font-size: 14px;
	}
	.btnList{
		width: 340px;
		margin: 30px auto 0;
	}
	.release{
		width: 150px;
		height: 35px;
		line-height: 35px;
		font-size: 14px;
		color: #FFFFFF;
		border-radius: 50px;
		background: -webkit-gradient(linear,0 50%,100% 50%,from(#FF6C00),to(#FF9D00));
		background: -webkit-linear-gradient(left,#FF6C00,#FF9D00);
		cursor: pointer;
		display: block;
		float: left;
	}
	.setUp{
		width: 150px;
		height: 34px;
		line-height: 35px;
		font-size: 14px;
		color: #FF6C00;
		border-radius: 50px;
		border: 1px solid #FF6C00;
		display: block;
		cursor: pointer;
		float: left;
		margin-left: 15px;
	}
	.perInfoBottom{
		width: 100%;
		height: auto;
		background-color: #FFFFFF;
		margin-top: 20px;
	}
	.ragisterInfo{
		width: 90%;
		height: auto;
		margin: 0 auto;
		padding-bottom: 40px;
	}
	.ragisterInfo div{
		padding: 10px 0 0 0;
	}
	.info1{
		width: 110px;
		text-align: right;
		color: #000000;
		font-weight: bold;
		font-size: 14px;
		display: block;
		float: left;
	}
	.info2{
		color: #000000;
		font-size: 14px;
		display: block;
		float: left;
		margin-left: 15px;
	}
	.info2 img{
		max-width: 300px;
		max-height: 200px;
		margin-right: 20px;
	}
	.info3{
		color: #4990E2;
		font-size: 14px;
		margin-left: 15px;
		cursor: pointer;
	}
</style>