<template>
  <div class="right">
    <div class="perInfoTop">
      <div class="perInfoLeft">
        <img class="tx" src="~/static/img/grtx.png" />
        <div class="perTextInfo">
          <div class="name">{{ $store.state.username }}</div>
          <!-- <div class="state">{{($store.state.roles.indexOf('ROLE_SELF') > -1 || $store.state.roles.indexOf('ROLE_CO') > -1) ? '已认证' : '未认证'}}</div> -->
          <div class="clear"></div>
          <div class="level">
            <span
              class="lv"
              v-if="
                $store.state.roles &&
                  ($store.state.roles.indexOf('ROLE_SELF') > -1 ||
                    $store.state.roles.indexOf('ROLE_CO') > -1)
              "
              >已认证</span
            >
            <span class="lvNum" v-else>未认证</span>
          </div>
          <div class="selfYe" slot="reference">
            <nuxt-link :to="{ path: '/personalCenter/config/myCash' }"
              >钱包余额 {{ cash }}</nuxt-link
            >
          </div>
        </div>
      </div>
      <div class="perInfoRight">
        <div>
          <nuxt-link :to="{ path: '/personalCenter/orderList' }">
            <img src="../../static/img/myOrder.png" />
            <p>我的订单</p>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link :to="{ path: '/personalCenter/myShoppingCart' }">
            <img src="../../static/img/myShopCar.png" />
            <p>我的购物车</p>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link :to="{ path: '/personalCenter/collection' }">
            <img src="../../static/img/shoucangjia.png" />
            <p>我的收藏</p>
          </nuxt-link>
        </div>
        <div>
          <nuxt-link :to="{ path: '/personalCenter/shop' }">
            <img src="../../static/img/myShop.png" />
            <p>我的店铺</p>
          </nuxt-link>
        </div>
      </div>
    </div>
    <div class="perInfoBottom">
      <div class="title">我的特权</div>
      <div class="imgList">
        <nuxt-link :to="{ path: '/personalCenter/config/baseInfo' }"
          ><div class="qyrz">
            <div class="d1">基础资料</div>
          </div></nuxt-link
        >
        <nuxt-link :to="{ path: '/personalCenter/config/subjectManagement' }"
          ><div class="qyrz">
            <div class="d1">主体管理</div>
          </div></nuxt-link
        >
        <nuxt-link :to="{ path: '/personalCenter/config/address' }"
          ><div class="qyrz">
            <div class="d1">寄送地址</div>
          </div></nuxt-link
        >
      </div>
    </div>
    <el-dialog title="交易明细" :visible.sync="showjyBox" width="50%">
      <div>
        <el-table :data="walletList" style="width: 100%">
          <el-table-column prop="id" label="ID" align="center">
          </el-table-column>
          <el-table-column prop="cash" label="金额" align="center">
          </el-table-column>
          <el-table-column prop="useDesc" label="描述" align="center">
          </el-table-column>
          <el-table-column prop="createDate" label="时间" align="center">
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
    <el-dialog title="充值" :visible.sync="showczBox" width="30%">
      <el-input
        size="small"
        v-model="total_amount"
        placeholder="请填写充值金额"
      ></el-input>
      <span class="tipMsg" v-show="tipShow">{{ tipName }}</span>
      <el-input
        style="margin-top: 20px;"
        type="textarea"
        :rows="2"
        v-model="body"
        placeholder="请填写充值描述"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showczBox = false">取 消</el-button>
        <el-button type="primary" @click="walletRecharge">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="提现" :visible.sync="showTxBox" width="30%">
      <p style="margin-bottom: 20px;">当前可提现金额：{{ cash }}</p>
      <el-input
        size="small"
        v-model="amount"
        placeholder="请填写提现金额"
      ></el-input>
      <span class="tipMsg" v-show="tipShow">{{ tipName }}</span>
      <el-input
        size="small"
        style="margin-top: 20px;"
        v-model="payee_account"
        placeholder="请填写支付宝账号"
      ></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showTxBox = false">取 消</el-button>
        <el-button type="primary" @click="withdrawCash">确 定</el-button>
      </span>
    </el-dialog>
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
      cash: 0,
      showjyBox: false,
      walletList: [],
      showczBox: false,
      showTxBox: false,
      total_amount: '',
      body: '',
      tipShow: false,
      tipName: '',
      payee_account: '',
      amount: ''
    }
  },
  head () {
    return {
      title: '智慧众合-个人中心',
      //				isEdit: false,
    }
  },
  mounted () {
    this.selfCurrentCash()
  },
  methods: {
    selfCurrentCash () {
      Services.selfCurrentCash().then(response => {
        if (response.data.code == 200) {
          this.cash = response.data.result
        }
      })
    },
    getJyList () {
      Services.walletDetailQuery().then(response => {
        if (response.data.code == 200) {
          this.walletList = response.data.result.walletCoList
          this.showjyBox = true
        }
      })
    },
    walletRecharge () {
      let self = this
      if (!this.total_amount) {
        return false
      }
      var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/
      if (!reg.test(this.total_amount) || this.total_amount == 0) {
        self.tipShow = true
        self.tipName = '请填写正确的金额'
        return false
      }
      self.tipShow = false
      self.tipName = ''
      const loading = this.$loading({
        lock: true,
        text: '等待支付',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let parmas = {
        total_amount: parseFloat(self.total_amount),
        subject: '充值',
        body: self.body ? self.body : ''
      }
      Services.walletRecharge(parmas).then(response => {
        if (response.data.code == 200) {
          $('body').html(response.data.result)
        } else {
          loading.close();
        }
      })
    },
    withdrawCash () {
      let self = this
      if (!this.amount || !this.payee_account) {
        return false
      }
      var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/
      if (!reg.test(this.amount) || this.amount == 0) {
        self.tipShow = true
        self.tipName = '请填写正确的金额'
        return false
      }
      if (this.amount > this.cash || this.amount < 0.1) {
        self.tipShow = true
        self.tipName = '提现金额小于钱包余额，大于0.1元'
        return false
      }
      self.tipShow = false
      self.tipName = ''
      let parmas = {
        payee_account: self.payee_account,
        amount: parseFloat(self.amount)
      }
      Services.withdrawCash(parmas).then(response => {
        if (response.data.code == 200) {
          self.$message.success('提现申请已提交')
          self.showTxBox = false
        } else {
          self.$message.error(response.data.message)
        }
      })
    }
  }
}
</script>
<style scoped>
/*个人中心s按钮*/
.perInfoTop {
  width: 980px;
  height: 100px;
}
.perInfoLeft {
  width: 39.8%;
  height: 100%;
  position: relative;
  border-top-left-radius: 50px;
  border-bottom-left-radius: 50px;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  border-right: 1px dashed #cccccc;
  background: #ffffff;
  display: inline-block;
  float: left;
  margin: 0;
  /*background:radial-gradient(30px 30px at top,transparent 50%,#ffffff 50%);*/
}
.perInfoLeft .tx {
  display: block;
  float: left;
  width: 75px;
  height: 75px;
  margin: 14px 0 0 45px;
}
.perTextInfo {
  display: block;
  float: left;
}
.name {
  margin-top: 14px;
  margin-left: 15px;
  display: block;
  float: left;
  /*position: absolute;
	    top: 14px;
    	left: 130px;*/
}
.state {
  margin-top: 18px;
  margin-left: 15px;
  /*position: absolute;
	    top: 63px;
	    left: 130px;*/
  display: block;
  float: left;
  font-size: 12px;
  color: #26a9e1;
}
.level {
  float: left;
  width: auto;
  height: auto;
  zoom: 1;
  overflow: hidden;
  font-size: 12px;
  margin-top: 10px;
  margin-left: 15px;
  /*position: absolute;
	    top: 40px;
    	left: 130px;*/
}
.level .lv {
  padding: 1px 5px;
  display: block;
  float: left;
  background-color: #8e4f23;
  text-align: center;
  color: #ffffff;
}
.level .lvNum {
  padding: 1px 5px;
  min-width: 15px;
  display: block;
  float: left;
  background-color: #a9824b;
  text-align: center;
  color: #ffffff;
}
.selfYe {
  float: left;
  font-size: 14px;
  color: #333333;
  margin-top: 10px;
  margin-left: 15px;
  cursor: pointer;
}
.yyDetail {
  color: #26a9e1;
  text-align: center;
  font-size: 14px;
  cursor: pointer;
  line-height: 30px;
}
.cashbtn {
  text-align: center;
  margin-top: 10px;
}
.cashbtn .el-tag {
  cursor: pointer;
}
.perInfoRight {
  width: 60%;
  height: 100%;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  background: #ffffff;
  display: inline-block;
  float: left;
  margin: 0;
}
.perInfoRight div {
  display: block;
  float: left;
  width: 21%;
  height: 100%;
  margin-left: 3%;
  text-align: center;
}
.perInfoRight div img {
  width: 35px;
  margin-top: 15%;
}
.perInfoRight div p {
  font-size: 14px;
  margin-top: 5%;
}
.perInfoBottom {
  width: 980px;
  height: 480px;
  background-color: #ffffff;
  margin-top: 20px;
  border-radius: 5px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  padding: 22px 42px;
}
.perInfoBottom .imgList {
  margin-top: 80px;
  text-align: center;
}
.perInfoBottom .imgList .d1 {
  margin-top: 110px;
  font-size: 18px;
  text-align: center;
}
.perInfoBottom .imgList .grrz {
  width: 200px;
  height: 240px;
  display: inline-block;
  margin-right: 60px;
  border-radius: 10px;
  background: url(~/static/img/grrz2.png);
  background-repeat: no-repeat;
  background-position: center 30px;
}
.perInfoBottom .imgList .qyrz {
  width: 200px;
  height: 240px;
  display: inline-block;
  margin-right: 60px;
  border-radius: 10px;
  background: url(~/static/img/qyrz2.png);
  background-repeat: no-repeat;
  background-position: center 30px;
}
.perInfoBottom .imgList .grrz:hover {
  cursor: pointer;
  box-shadow: 2px -2px 10px 2px #efefef;
  background: url(~/static/img/grrz1.png);
  background-repeat: no-repeat;
  background-position: center 30px;
}
.perInfoBottom .imgList .qyrz:hover {
  cursor: pointer;
  box-shadow: 2px -2px 10px 2px #efefef;
  background: url(~/static/img/qyrz1.png);
  background-repeat: no-repeat;
  background-position: center 30px;
}
.tipMsg {
  font-size: 12px;
  line-height: 20px;
  color: #f00;
}
</style>
<style>
th {
  background-color: #efefef !important;
  text-align: center !important;
}
</style>