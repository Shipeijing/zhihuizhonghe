<template>
	<div>
		<div class="right" v-show="pageName == 1">
			<div class="title">实名认证</div>
			<div class="imgList">
				<div class="grrz" v-on:click="toSeleCert">
					<div class="d1" >个人实名认证<span v-if="ROLE_SELF">已认证</span></div>
					<div class="d2">目前支持大陆个人用户实名认证，通过智慧众合个人实名认证才能开启店铺，认证成功后身份证信息不可修改</div>
				</div>
				<div class="qyrz" v-on:click="toEnterprise">
					<div class="d1">企业实名认证<span v-if="ROLE_CO">已认证</span></div>
					<div class="d2">目前支持大陆企业实名认证，通过智慧众合个人实名认证才能开启店铺，认证成功后统一社会信用代码不可修改</div>
				</div>
				<!-- <div class="btn">申请</div> -->
			</div>
		</div>
		<div class="right" v-loading="loading" v-if="pageName == 2">
			<div class="title">实名认证-个人认证<i v-on:click="closeBack()" style="float: right;font-size:30px;color:#666666;cursor: pointer;" class="el-icon-close"></i></div>
			<el-steps class="stepsDiv" :space="350" :active="status" finish-status="success" process-status="process" align-center>
				<el-step title="提交资料"></el-step>
				<el-step title="审核"></el-step>
				<el-step title="认证成功"></el-step>
			</el-steps>
			<div v-if="status==0">
				<el-form class="edit-auth-form" :rules="fromRules" :model="authData" ref="authDataForm">
					<el-form-item label="姓名：" label-width="100px" prop="name">
						<el-input size="small" v-model="authData.name" placeholder="请输入您的姓名"></el-input>
					</el-form-item>
					<el-form-item label="手机号码：" label-width="100px" prop="mobilePhone">
						<el-input size="small" v-model="authData.mobilePhone" placeholder="请输入您的手机号码"></el-input>
					</el-form-item>
					<el-form-item label="身份证：" label-width="100px" prop="idCard">
						<el-input size="small" v-model="authData.idCard" placeholder="请输入您的身份证号码"></el-input>
					</el-form-item>
					<el-form-item label="证件图片：" label-width="100px" >
						<el-upload
										class="avatar-uploader"
										:action="$store.state.baseImgUrl+'/api/upload/upload'"
										name="imgFile"
										:headers="headers"
										:show-file-list="false"
										:on-success="handlePositiveSuccess"
										accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
										<img v-if="imgP" :src="imgP" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"><span>上传身份证正面照</span></i>
										</el-upload>
										<el-upload
										class="avatar-uploader"
										:action="$store.state.baseImgUrl+'/api/upload/upload'"
										name="imgFile"
										:headers="headers"
										:show-file-list="false"
										:on-success="handleNegativeSuccess"
										accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
										<img v-if="imgN" :src="imgN" class="avatar">
										<i v-else class="el-icon-plus avatar-uploader-icon"><span>上传身份证反面照</span></i>
										</el-upload>
					</el-form-item>
					<el-form-item label="示例：" label-width="100px">
						<img src="~/static/img/sfz.jpg">
					</el-form-item>
						</el-form>
						<div class="btn" v-on:click="saveSelf('authDataForm')">{{isEdit?'提交':'申请'}}</div>
			</div>
			<div v-if="status==1 || status==3">
				<div class="infoBox">
					<p class="item">姓名：{{authData.name}}</p>
					<p class="item">手机号码：{{authData.mobilePhone}}</p>
					<p class="item">身份证：{{authData.idCard}}</p>
					<p class="item">证件图片：<img :src="$store.state.baseImgUrl+authData.idCardPositive" /><img :src="$store.state.baseImgUrl+authData.idCardNegative" /></p>
					<p class="item">认证状态：<span>{{authData.personalAuthState || '待认证'}}</span></p>
				</div>
				<div class="btn" v-if="status==1" v-on:click="edit">修改认证</div>
			</div>
		</div>
		<div class="right" v-loading="loading" v-if="pageName == 3">
			<div class="title">实名认证-企业认证<i v-on:click="closeBack()" style="float: right;font-size:30px;color:#666666;cursor: pointer;" class="el-icon-close"></i></div>
			<el-steps class="stepsDiv" :space="350" :active="status" finish-status="success" process-status="process" align-center>
				<el-step title="提交资料"></el-step>
				<el-step title="审核"></el-step>
				<el-step title="认证成功"></el-step>
			</el-steps>
			<div v-if="status==0">
				<el-form class="edit-auth-form" :rules="enterpriseFromRules" :model="enterpriseData" ref="enterpriseDataForm">
					<el-form-item label="企业名称：" label-width="140px" prop="enterpriseName">
						<el-input size="small" v-model="enterpriseData.enterpriseName" placeholder="请输入企业名称"></el-input>
					</el-form-item>
					<el-form-item label="联系人姓名：" label-width="140px" prop="contacts">
						<el-input size="small" v-model="enterpriseData.contacts" placeholder="请输入联系人姓名"></el-input>
					</el-form-item>
					<el-form-item label="联系人手机：" label-width="140px" prop="contactsPhone">
						<el-input size="small" v-model="enterpriseData.contactsPhone" placeholder="请输入联系人手机"></el-input>
					</el-form-item>
					<el-form-item label="营业执照号码：" label-width="140px" prop="businessLicense">
						<el-input size="small" v-model="enterpriseData.businessLicense" placeholder="请输入营业执照号码"></el-input>
					</el-form-item>
					<el-form-item label="证件图片：" label-width="140px" >
						<el-upload
							class="avatar-uploader"
							:action="$store.state.baseImgUrl+'/api/upload/upload'"
							name="imgFile"
							:headers="headers"
							:show-file-list="false"
							:on-success="handle1Success"
							accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
							<img v-if="img1" :src="img1" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"><span>营业执照（必填）</span></i>
						</el-upload>
						<el-upload
							class="avatar-uploader"
							:action="$store.state.baseImgUrl+'/api/upload/upload'"
							name="imgFile"
							:headers="headers"
							:show-file-list="false"
							:on-success="handle2Success"
							accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
							<img v-if="img2" :src="img2" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"><span>组织机构代码证</span></i>
						</el-upload>
						<el-upload
							class="avatar-uploader"
							:action="$store.state.baseImgUrl+'/api/upload/upload'"
							name="imgFile"
							:headers="headers"
							:show-file-list="false"
							:on-success="handle3Success"
							accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png">
							<img v-if="img3" :src="img3" class="avatar">
							<i v-else class="el-icon-plus avatar-uploader-icon"><span>税务登记证</span></i>
						</el-upload>
					</el-form-item>
				</el-form>
				<div class="btn" v-on:click="saveEnterprise('enterpriseDataForm')">{{isEdit?'提交':'申请'}}</div>
			</div>
			<div v-if="status==1 || status==3">
				<div class="infoBox">
					<p class="item">企业名称：{{enterpriseData.enterpriseName}}</p>
					<p class="item">联系人姓名：{{enterpriseData.contacts}}</p>
					<p class="item">联系人手机：{{enterpriseData.contactsPhone}}</p>
					<p class="item">营业执照号码：{{enterpriseData.businessLicense}}</p>
					<p class="item">证件图片：<img v-if="enterpriseData.businessLicenseImage" :src="$store.state.baseImgUrl+enterpriseData.businessLicenseImage" /><img v-if="enterpriseData.organizationImage" :src="$store.state.baseImgUrl+enterpriseData.organizationImage" /><img v-if="enterpriseData.taxImage" :src="$store.state.baseImgUrl+enterpriseData.taxImage" /></p>
					<p class="item">认证状态：<span>{{enterpriseData.enterpriseAuthState || '待认证'}}</span></p>
				</div>
				<div class="btn" v-if="status==1" v-on:click="editEnterprise">修改认证</div>
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
    var checkIdCard = (rule, value, callback) => {
  		if (!value) {
        return callback(new Error('请输入您的身份证号码'));
      }
      if (value.length != 18) {
        return callback(new Error('请填写正确的身份证号码'));
      }
      callback();
    };
    return {
			loading: true,
			pageName: 1,  //控制页面展示内容，1为认证选择页，2为个人实名认证，3为企业实名认证
			status: 0,
			authData: {
				name: '',
				mobilePhone: '',
				idCard: '',
				idCardPositive: '',
				idCardNegative: ''
			},
			imgP: '',
			imgN: '',
			isEdit: false,
			fromRules: {
				name: [
					{ required: true, message: '请输入您的姓名', trigger: 'blur' }
				],
				mobilePhone: [
					{ required: true, message: '请输入您的手机号码', trigger: 'blur' },
					{ validator: checkPhone, trigger: 'blur' }
				],
				idCard: [
					{ required: true, message: '请输入您的身份证号码', trigger: 'blur' },
					{ validator: checkIdCard, trigger: 'blur' }
				]
			},
			img1: '',
			img2: '',
			img3: '',
			enterpriseData: {
				enterpriseName: '',
				contacts: '',
				contactsPhone: '',
				businessLicense: '',
				businessLicenseImage: '',
				organizationImage: '',
				taxImage: ''
			},
			enterpriseFromRules: {
				enterpriseName: [
					{ required: true, message: '请输入企业名称', trigger: 'blur' }
				],
				contacts: [
					{ required: true, message: '请输入企业联系人', trigger: 'blur' }
				],
				contactsPhone: [
					{ required: true, message: '请输入联系人电话', trigger: 'blur' },
					{ validator: checkPhone, trigger: 'blur' }
				],
				businessLicense: [
					{ required: true, message: '请输入营业执照号码', trigger: 'blur' }
				]
			},
			ROLE_SELF: false,
			ROLE_CO: false
    }
  },
  head() {
    return {
      title: '智慧众合-实名认证'
    }
  },
  mounted(){
	  let self = this
    this.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
    if(this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_SELF') > -1){
      self.ROLE_SELF = true 
		}
		if(this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_CO') > -1){
      self.ROLE_CO = true    
    }
  },
  methods: {
    closeBack(){
      this.pageName = 1
    },
    handlePositiveSuccess(res, file) {
    	if(res.code == 200){
    		this.authData.idCardPositive = res.result.image.thumbnail;
    		this.imgP = URL.createObjectURL(file.raw);
    	}else{
    		this.$message.error(res.message);
    	}
    },
    handleNegativeSuccess(res, file) {
    	if(res.code == 200){
    		this.authData.idCardNegative = res.result.image.thumbnail;
    		this.imgN = URL.createObjectURL(file.raw);
    	}else{
    		this.$message.error(res.message);
    	}
      //this.idCardNegative = URL.createObjectURL(file.raw);
		},
		handle1Success(res, file) {
    	if(res.code == 200){
    		this.enterpriseData.businessLicenseImage = res.result.image.thumbnail;
    		this.img1 = URL.createObjectURL(file.raw);
    	}else{
    		this.$message.error(res.message);
    	}
		},
		handle2Success(res, file) {
    	if(res.code == 200){
    		this.enterpriseData.organizationImage = res.result.image.thumbnail;
    		this.img2 = URL.createObjectURL(file.raw);
    	}else{
    		this.$message.error(res.message);
    	}
		},
		handle3Success(res, file) {
    	if(res.code == 200){
    		this.enterpriseData.taxImage = res.result.image.thumbnail;
    		this.img3 = URL.createObjectURL(file.raw);
    	}else{
    		this.$message.error(res.message);
    	}
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg';

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG 格式!');
      }
      return isJPG;
    },
    toSeleCert(){
    	let self = this
    	Services.getMemberSelfCert().then(response => {
				if(response.data.code == 200){
					self.pageName = 2
					if(!response.data.result.memberSelfCert){
						self.status = 0
					}else{
						if(!response.data.result.memberSelfCert.isPersonalAuth){
							self.status = 1
						}else{
							self.status = 3
						}
						self.authData = response.data.result.memberSelfCert
					}
				}else{
					self.$message.error(response.data.message)
				}
				self.loading = false
			})
		},
		toEnterprise(){
			let self = this
    	Services.getMemberCoCert().then(response => {
				if(response.data.code == 200){
					self.pageName = 3
					if(!response.data.result.memberCoCert){
						self.status = 0
					}else{
						if(!response.data.result.memberCoCert.isEnterpriseAuth){
							self.status = 1
						}else{
							self.status = 3
						}
						self.enterpriseData = response.data.result.memberCoCert
					}
				}else{
					alert(response.data.message)
				}
				self.loading = false
			})
		},
    saveSelf(formName){
    	let self = this
    	this.$refs[formName].validate((valid) => {
    		if (valid) {
    			if(!self.authData.idCardPositive || !self.authData.idCardNegative){
	  				self.$message.error('请上传证件照片')
	        		return false
					}
					let params = {
						name: self.authData.name,
						mobilePhone: self.authData.mobilePhone,
						idCard: self.authData.idCard,
						idCardPositive: self.authData.idCardPositive,
						idCardNegative: self.authData.idCardNegative
					}
					if(!this.isEdit){
						Services.saveSelfCert(params).then(response => {
							if(response.data.code == 200){
								self.$message.success('提交成功！')
								self.toSeleCert()
							}else{
								if(response.data.code == 400 && response.data.result.errors.length>0){
									self.$message.error(response.data.result.errors[0].message)
									return
								}
								self.$message.error(response.data.message)
							}
						})
					}else{
						params.id = self.authData.id
						Services.updateSelfCert(params).then(response => {
							if(response.data.code == 200){
								self.$message.success('提交成功！')
								self.toSeleCert()
							}else{
								if(response.data.code == 400 && response.data.result.errors.length>0){
									self.$message.error(response.data.result.errors[0].message)
									return
								}
								self.$message.error(response.data.message)
							}
						})
					}
				}else{
					this.$message.error('认证信息填写有误')
					return false
				}
			})
		},
		saveEnterprise(formName){
			let self = this
    	this.$refs[formName].validate((valid) => {
    		if (valid) {
    			if(!self.enterpriseData.businessLicenseImage){
	  				self.$message.error('请上传营业执照扫描件')
	        		return false
					}
					let params = {
						enterpriseName: self.enterpriseData.enterpriseName,
						contacts: self.enterpriseData.contacts,
						contactsPhone: self.enterpriseData.contactsPhone,
						businessLicense: self.enterpriseData.businessLicense,
						businessLicenseImage: self.enterpriseData.businessLicenseImage,
						organizationImage: self.enterpriseData.organizationImage,
						taxImage: self.enterpriseData.taxImage
					}
					if(!this.isEdit){
						Services.saveCoCert(params).then(response => {
							if(response.data.code == 200){
								self.$message.success('提交成功！')
								self.toEnterprise()
							}else{
								if(response.data.code == 400 && response.data.result.errors.length>0){
									self.$message.error(response.data.result.errors[0].message)
									return
								}
								self.$message.error(response.data.message)
							}
						})
					}else{
						params.id = self.enterpriseData.id
						Services.updateCoCert(params).then(response => {
							if(response.data.code == 200){
								self.$message.success('提交成功！')
								self.toEnterprise()
							}else{
								if(response.data.code == 400 && response.data.result.errors.length>0){
									self.$message.error(response.data.result.errors[0].message)
									return
								}
								self.$message.error(response.data.message)
							}
						})
					}
				}else{
					this.$message.error('认证信息填写有误')
					return false
				}
			})
		},
		edit(){
			this.imgP = this.$store.state.baseImgUrl+this.authData.idCardPositive
			this.imgN = this.$store.state.baseImgUrl+this.authData.idCardNegative
			this.status = 0
			this.isEdit = true
		},
		editEnterprise(){
			this.img1 = this.$store.state.baseImgUrl+this.enterpriseData.businessLicenseImage
			this.img2 = this.enterpriseData.organizationImage?this.$store.state.baseImgUrl+this.enterpriseData.organizationImage:''
			this.img2 = this.enterpriseData.taxImage?this.$store.state.baseImgUrl+this.enterpriseData.taxImage:''
			this.status = 0
			this.isEdit = true
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
		width: 936px;
		float: right;
		background-color: #FFFFFF;
		padding: 22px;
		padding-bottom: 95px;
		margin-bottom: 15px;
	}
	.main .right .title{
		font-size: 18px;
		font-weight: bold;
		margin-left: 20px;
	}
	.main .right .imgList{
		margin-top: 80px;
		text-align: center;
	}
	.main .right .imgList .d1{
		margin-top: 110px;
		font-size: 18px;
		text-align: center;
	}
	.main .right .imgList .d1 span{
		font-size: 14px;
		display: inline-block;
		margin-left: 10px;
		color: #FF7300;
	}
	.main .right .imgList .d2{
		width: 250px;
		margin: 20px auto;
		font-size: 14px;
		text-align: center;
		color: #b4b4b4;
	}
	.main .right .imgList .grrz{
		width: 330px;
		height: 240px;
		display: inline-block;
		margin-right: 60px;
		border-radius: 10px;
		background: url(~/static/img/grrz2.png);
		background-repeat: no-repeat;
		background-position: center 30px;
	}
	.main .right .imgList .qyrz{
		width: 330px;
		height: 240px;
		display: inline-block;
		margin-right: 60px;
		border-radius: 10px;
		background: url(~/static/img/qyrz2.png);
		background-repeat: no-repeat;
		background-position: center 30px;
	}
	.main .right .imgList .grrz:hover{
		cursor: pointer;
		box-shadow: 2px -2px 10px 2px #EFEFEF;
		background: url(~/static/img/grrz1.png);
		background-repeat: no-repeat;
		background-position: center 30px;
	}
	.main .right .imgList .qyrz:hover{
		cursor: pointer;
		box-shadow: 2px -2px 10px 2px #EFEFEF;
		background: url(~/static/img/qyrz1.png);
		background-repeat: no-repeat;
		background-position: center 30px;
	}
	.main .right .btn{
		width: 110px;
		background-color: #FF7300;
		color: #FFFFFF;
		line-height: 40px;
		border-radius: 20px;
		margin-top: 60px;
		margin-left: 670px;
		box-shadow: 0px 0px 15px 1px #FF7300;
		text-align: center;
		cursor: pointer;
	}
	.stepsDiv{
		margin-top: 50px;
	}
	.edit-auth-form{
		margin-top: 50px;
		width: 100%;
		margin-left: 25px;
	}
	.el-input{
		width: 50%;
	}
	.infoBox{
		margin-top: 50px;
		margin-left: 25px;
	}
	.infoBox .item{
		margin-top: 30px;
	}
	.infoBox .item span{
		color: #FF7300;
	}
	.infoBox .item img{
		display: inline-block;
		width: 200px;
		max-height: 150px;
		margin-right: 30px;
	}
</style>
<style>
	.el-step__icon {
		width: 40px !important;
		height: 40px !important;
		font-size: 20px !important;
	}
	.el-step.is-horizontal .el-step__line {
		height: 5px !important;
		top: 18px !important;
		width: 250px;
		border-radius: 3px;
		margin-left: 30px;
	}
	.el-step__head.is-success .el-step__line {
		border-radius: 3px;
    	border: #FF7300;
		background-color: #FF7300 !important;
	}
	.el-step__head.is-success .el-step__icon{
		border-color: #FF7300 !important;
		background-color: #FF7300 !important;
		color: #FFFFFF !important;
	}
	.el-step__title.is-success{
		color: #FF7300;
	}
	.el-step__head.is-process {
		color: #FF7300;
		border-color: #FF7300;
	}
	.el-step__title.is-process {
		color: #FF7300;
		font-weight: normal;
	}
	.el-form-item__label{
		text-align:left;
		display: inline-block;
	}
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
	  .avatar-uploader-icon span{
	  	font-size: 12px;
	  	display: block;
	  	margin-top: 30px;
	  }
</style>

