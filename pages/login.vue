<template>
  <div>
    <div class="sectionBox">
      <div class="sectionconBox">
        <div
          class="loginDiv"
          v-if="type==1"
        >
          <h1>账号登陆</h1>
          <label class="l">
            <span><img src="~/static/img/yh.png" /></span>
            <input
              v-model="username"
              type="text"
              placeholder="请输入手机号"
            /></label>
          <label class="r">
            <span><img src="~/static/img/mi.png" /></span>
            <input
              v-model="password"
              type="password"
              placeholder="密码"
            />
          </label>
          <div
            class="tip"
            v-show="tipShow"
          >{{tipName}}</div>
          <div class="automatic">
            <label>
              <input
                type="checkbox"
                id="checkBox"
              />
              <p>自动登陆</p>
            </label>
            <div class="clear"></div>
          </div>
          <button
            class="land"
            type="button"
            v-on:click="login"
          >立即登陆</button>
          <p class="prompt">还没有账号？<a
              class="ljzc orange"
              v-on:click="changeType(2)"
            >立即注册 </a>
            <nuxt-link
              class="wjma"
              :to="{path:'/retrievePassword'}"
            >忘记密码？</nuxt-link>
          </p>
        </div>
        <div
          class="loginDiv"
          v-if="type==2"
        >
          <h1>注册账号</h1>
          <label class="l">
            <span><img src="~/static/img/yh.png" /></span>
            <input
              v-model="mobilePhone"
              type="text"
              placeholder="请输入手机号"
            /></label>
          <label class="r">
            <span><img src="~/static/img/mi.png" /></span>
            <input
              v-model="password"
              type="password"
              placeholder="设置密码"
            />
          </label>
          <label class="c">
            <span><img src="~/static/img/mi.png" /></span>
            <input
              v-model="verifyCode"
              type="text"
              placeholder="手机验证码"
            />
            <button
              class="sendcode"
              :disabled="disabled"
              @click="sendVerifyCode"
            >{{sms}}</button>
          </label>
          <label class="c">
            <span><img src="~/static/img/yh.png" /></span>
            <input
              v-model="recommendMember"
              type="text"
              placeholder="推荐人账号（选填）"
            />
          </label>
          <div
            class="tip"
            v-show="tipShow"
          >{{tipName}}</div>
          <div class="automatic">
            <label>
              <input
                type="checkbox"
                id="checkBox2"
                v-model="checkTrue"
              />
            </label>
            <p v-on:click="showXYBoxBtn()">我已同意<span style="color:#26a9e1;cursor: pointer;">用户注册协议</span></p>
            <div class="clear"></div>
          </div>
          <button
            :class="checkTrue ? 'land btn' : 'huid btn'"
            type="button"
            v-on:click="register"
          >注册</button>
          <p class="prompt">已有账号？<a
              class="ljzc orange"
              v-on:click="changeType(1)"
            >去登陆</a></p>
        </div>
      </div>
    </div>
    <el-dialog
      title="用户注册协议"
      :visible.sync="showXYBox"
      width="50%"
    >
      <div v-html="webContent"></div>
    </el-dialog>
  </div>
</template>
<script>
import Services from '../store/services'
var loginFromPath = ''
var timer = null
export default {
  head () {
    return {
      title: '智慧众合-登陆'
    }
  },
  data () {
    return {
      username: '',
      password: '',
      type: 1,//1为登陆，2为注册
      mobilePhone: '',
      verifyCode: '',
      recommendMember: '',
      sms: '发送验证码',
      disabled: false,
      time: 60,
      tipShow: false,
      tipName: '',
      checkTrue: false,
      showXYBox: false,
      webContent: ''
    }
  },
  watch: {
    $route (to, from) {
      if (to.path == '/login') {
        if (to.query.type && to.query.type == 'register') {
          this.type = 2
        } else {
          this.type = 1
        }
      }
    }
  },
  mounted () {
    if (this.$route.query.type && this.$route.query.type == 'register') {
      this.type = 2
    } else {
      this.type = 1
      if (localStorage.getItem('username')) {
        this.username = localStorage.getItem('username')
      }
      if (localStorage.getItem('password')) {
        this.username = localStorage.getItem('username')
        this.password = localStorage.getItem('password')
        this.login()
      }
    }
  },
  methods: {
    showXYBoxBtn () {
      if (this.webContent) {
        this.showXYBox = true
        return
      }
      Services.getWebContent('2160229810974720').then(response => {
        if (response.data.code == 200) {
          this.webContent = response.data.result.webContent.content
          this.showXYBox = true
        }
      })
    },
    async checkRecommendMember () {
      let params = {
        recommendMember: String(this.recommendMember)
      }
      let res = await Services.checkRecommendMember(params)
      if (res.data.result == true) {
        return true
      } else {
        this.tipShow = true
        this.tipName = '推荐人账号不存在'
        this.$message.error('推荐人账号不存在')
        return false
      }
    },
    restData () {
      this.username = '',
        this.password = '',
        this.mobilePhone = '',
        this.verifyCode = '',
        this.tipShow = false,
        this.recommendMember = ''
    },
    changeType (val) {
      this.restData()
      this.type = val
    },
    async login () {
      let self = this
      if (!this.username || !this.password) {
        if (!this.username) {
          this.tipShow = true
          this.tipName = '请输入手机号'
          return false
        }
        if (!this.password) {
          this.tipShow = true
          this.tipName = '请输入密码'
          return false
        }
      }
      let params = {
        username: this.username,
        password: this.password
      }
      let data = await Services.login(params)
      console.log(data)
      if (data.data.username) {
        data.data.tokenTime = new Date().getTime()
        this.$store.dispatch('logined', data.data)
        this.$message.success('登陆成功')
        var check = document.getElementById('checkBox')
        localStorage.setItem('username', self.username)
        if (check.checked) {
          localStorage.setItem('password', self.password)
        }
        let that = this
        Services.getCarCount().then(response => {
          if (response.data.code == 200) {
            let num = response.data.result
            that.$store.dispatch('shoppingCarNum', num)
          }
        })
        setTimeout(() => {
          if (localStorage.getItem('redirectUrl')) {
            window.location.replace(localStorage.getItem('redirectUrl'))
            localStorage.removeItem('redirectUrl')
          } else {
            this.$router.replace({ path: '/' })
          }
        }, 500)
      } else {
        this.tipShow = true
        this.tipName = data.data.message
        this.$message.error(data.data.message)
      }
    },
    register () {
      if (!this.checkTrue) {
        return false
      }
      let self = this
      if (!self.mobilePhone || !self.password || !self.verifyCode) {
        if (!self.mobilePhone) {
          self.tipShow = true
          self.tipName = '请输入注册手机号'
          return false
        }
        if (!self.password) {
          self.tipShow = true
          self.tipName = '请设置密码'
          return false
        }
        if (!self.verifyCode) {
          self.tipShow = true
          self.tipName = '请输入验证码'
          return false
        }
      }
      let params = {
        mobilePhone: self.mobilePhone,
        password: self.password,
        verifyCode: self.verifyCode
      }
      if (this.recommendMember) {
        if (!self.checkRecommendMember()) {
          return false
        } else {
          params.recommendMember = String(self.recommendMember)
        }
      }
      Services.register(params).then(response => {
        if (response.data.code == 200) {
          self.$message.success('注册成功，请登录')
          self.restData()
          self.type = 1
        } else {
          self.tipShow = true
          self.tipName = response.data.message
          self.$message.error(response.data.message)
        }
      })
    },
    sendVerifyCode () {
      if (!this.mobilePhone) {
        this.tipShow = true
        this.tipName = '请输入注册手机号'
        return false
      }
      let params = {
        mobilePhone: this.mobilePhone
      }
      this.disabled = true
      Services.sendVerifyCode(params).then(response => {
        if (response.data.code == 200) {
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
        } else {
          this.disabled = false
          this.tipShow = true
          this.tipName = response.data.message
          this.$message.error(response.data.message)
        }
      })
    }
  }
}
</script>

<style scoped>
.loginDiv {
  position: relative;
}
.tip {
  font-size: 10px;
  color: #f00;
  position: absolute;
  top: 65px;
  right: 65px;
}
.c {
  margin-top: 15px;
  position: relative;
}
.sendcode {
  position: absolute;
  background-color: #26a9e1;
  border: none;
  height: 100%;
  line-height: 100%;
  font-size: 12px;
  color: #ffffff;
  top: 0;
  right: 0;
}
a {
  cursor: pointer;
}
.btn {
  margin-top: 15px !important;
  cursor: pointer;
}
</style>
