<template>
  <div class="retrievePassword">
    <div class="clear"></div>
		<div class="content">
			<div class="main">
        <div class="stepsBox">
          <el-steps :space="350" :active="active" finish-status="success" process-status="process" align-center>
            <el-step title="确认会员"></el-step>
            <el-step title="重置密码"></el-step>
            <el-step title="重置成功"></el-step>
          </el-steps>
        </div>
        <div class="contentBody" v-if="active == 0">
          会员名称：<el-input style="width:300px" size="small" type="text" placeholder="请输入会员注册手机号" v-model="mobilePhone"></el-input>
          <el-button class="btn" type="primary" @click.native="pushMobile">下一步</el-button>
        </div>
        <div class="contentBody" v-if="active == 1">
           新密码：<el-input style="width:300px" size="small" type="text" placeholder="输入新密码" v-model="newPassword"></el-input><br><br>
          确认密码：<el-input style="width:300px" size="small" type="text" placeholder="确认密码" v-model="rePassword"></el-input><br><br>
           验证码：<el-input style="width:200px" size="small" type="text" placeholder="6位数验证码" v-model="verifyCode"></el-input>
          <el-button style="margin-left: 5px" size="small" type="primary" :disabled="disabled" @click.native="sendVerifyCode">{{sms}}</el-button>
          <el-button class="btn" type="primary" @click.native="submitPassword">提交</el-button>
        </div>
        <div class="contentBody" v-if="active == 3">
            <p><i class="el-icon-success"></i>密码重置成功，请重新登陆</p>
            <el-button class="btn" type="primary" @click.native="goLogin">重新登陆</el-button>
        </div>
			</div>
		</div>
  </div>
</template>
<script>
import Services from '../store/services'
var timer = null
export default {
  	beforeCreate () {
	    this.$store.dispatch('setNavName', '找回密码')
		},
	  data () {
	    return {
        active: 0,
        mobilePhone: '',
        newPassword: '',
        rePassword: '',
        verifyCode: '',
        sms: '发送验证码',
        disabled: false,
        time: 60
	    }
	  },
    head() {
	    return {
	    	title: '智慧众合-'+this.$store.state.navName
	    }
	  },
	  mounted(){
			
	  },
	  methods: {
			pushMobile(){
        if(this.mobilePhone){
          let myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(16[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/
          if (!myreg.test(this.mobilePhone)) {
            this.$message.error('请输入正确的手机号')
            return false
          }
          this.active = 1
        }else{
          this.$message.error('请输入会员名称')
        }
      },
      sendVerifyCode(){
        let params = {
          mobilePhone: this.mobilePhone
        }
        this.disabled = true
        Services.sendLostPasswordVerifyCode(params).then(response => {
          if(response.data.code == 200){
            this.$message.success('验证码发送成功')
            timer = setInterval(() => {
              if (this.time == 0) {
                  clearInterval(timer)
                  this.time = 60,
                  this.sms = '发送验证码',
                  this.disabled = false
              } else {
                  this.time = this.time - 1,
                  this.sms = '重新发送(' + this.time + ')'
              }
            }, 1000)
          }else{
            this.disabled = false
            this.$message.error(response.data.message)
          }
        })
      },
      submitPassword(){
        let self = this
        if(!self.newPassword){
          self.$message.error('请输入新的密码')
          return false
        }
        if(!self.rePassword){
          self.$message.error('请输入确认密码')
          return false
        }
        if(!self.verifyCode){
          self.$message.error('请输入验证码')
          return false
        }
        if(self.newPassword != self.rePassword){
          self.$message.error('两次密码输入不一致')
          return false
        }
        let params = {
          mobilePhone: self.mobilePhone,
          newPassword: self.newPassword,
          rePassword: self.rePassword,
          verifyCode: self.verifyCode,
        }
        Services.lostPassword(params).then(response => {
					if(response.data.code == 200){
						self.active = 3
					}else{
            self.$message.error(response.data.message)
          }
				})
      },
      goLogin(){
        this.$router.replace({path: '/login'})
      }
	  }
  }
</script>
<style scoped lang="less">
  .retrievePassword{
    .main{
      width: 1170px;
      margin: 80px auto;
      font-size: 14px;
      .stepsBox{
        width: 800px;
        margin: 50px auto;
      }
      .contentBody{
        text-align: center;
        .btn{
          display: block;
          margin: 50px auto 0;
        }
        p{
          font-size: 18px;
          color: #666666;
          line-height: 40px;
          i{
            display: inline-block;
            font-size: 40px;
            vertical-align: middle;
            margin-right: 10px;
            color: #26a9e1;
          }
        }
      }
    }
  }
</style>
<style lang="less">
  .retrievePassword{
    .el-step__icon {
      width: 40px !important;
      height: 40px !important;
      font-size: 20px !important;
    }
    .el-step.is-horizontal .el-step__line {
      height: 3px !important;
      top: 18px !important;
      width: 206px;
      border-radius: 3px;
      margin-left: 30px;
    }
    .el-step__head.is-success .el-step__line {
      border-radius: 3px;
      border: #26a9e1;
    }
    .el-step__head.is-success .el-step__icon{
      border-color: #26a9e1 !important;
      color: #26a9e1 !important;
    }
    .el-step__title.is-success{
      color: #26a9e1;
    }
    .el-step__head.is-process {
      color: #26a9e1;
      border-color: #26a9e1;
    }
    .el-step__title.is-process {
      color: #26a9e1;
      font-weight: normal;
    }
  }
</style>

