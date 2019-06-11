<template>
  <div class="right">
    <div class="perInfoTop">
      <img
        class="tx"
        src="~/static/img/grtx.png"
      />
      <div class="perTextInfo">
        <div class="name">{{$store.state.username}}</div>
        <div class="tag">{{indexInfo.shopGrade ? indexInfo.shopGrade.name : '普通会员'}}</div>
        <div class="more">
          <nuxt-link :to="{path:'/personalCenter/shop/shopInfo'}">查看更多>>></nuxt-link>
        </div>
        <div class="clear"></div>
        <div class="infoIist">
          <span class="lv sss">{{indexInfo.shopStatus}}</span>
          <span class="lvNum sss">{{indexInfo.authType}}认证</span>
          <span class="lvNum sss">{{indexInfo.productCount > 0 ? '上架卖品 '+indexInfo.productCount : '未发布卖品'}}</span>
          <div
            class="selfYe"
            slot="reference"
          >
            <nuxt-link :to="{path:'/personalCenter/shop/shopCash'}">店铺钱包余额 {{indexInfo.shopBalance}}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <div class="perInfoCenter">
      <div class="title">我的特权</div>
      <div class="imgList">
        <nuxt-link :to="{path:'/personalCenter/shop/shopInfo'}">
          <div class="grrz">
            <div class="d1">店铺资料</div>
          </div>
        </nuxt-link>
        <nuxt-link :to="{path:'/personalCenter/shop/orderList'}">
          <div class="qyrz">
            <div class="d1">订单管理</div>
          </div>
        </nuxt-link>
        <nuxt-link :to="{path:'/personalCenter/shop/productList'}">
          <div class="spgl">
            <div class="d1">商品管理</div>
          </div>
        </nuxt-link>
      </div>
    </div>
    <div class="perInfoBottom">
      <div class="title">待处理事项</div>
      <div class="bottomLeft">
        <div class="bottomList">订单</div>
        <div>
          <p class="bottomText">买家下单数</p>
          <p class="num">{{indexInfo.ordersCount}}</p>
          <p class="shopChoose">
            <nuxt-link :to="{path:'/personalCenter/shop/orderList'}">查看订单</nuxt-link>
          </p>
        </div>
        <div class="clear"></div>
        <div>
          <p class="bottomText">退款申请</p>
          <p class="num">{{indexInfo.refundOrdersCount}}</p>
        </div>
      </div>
      <div class="bottomCenterBorder"></div>
      <div class="bottomRight">
        <div class="bottomList">商品</div>
        <div>
          <p class="bottomText">出售中</p>
          <p class="num">{{indexInfo.productCount}}</p>
          <p class="shopChoose">
            <nuxt-link :to="{path:'/personalCenter/shop/editProduct'}">发布商品</nuxt-link>
          </p>
        </div>
        <div class="clear"></div>
        <div>
          <p class="bottomText">下架中</p>
          <p class="num">{{indexInfo.disableProductCount}}</p>
        </div>
      </div>
    </div>
    <el-dialog
      title="交易明细"
      :visible.sync="showjyBox"
      width="50%"
    >
      <el-table
        :data="walletList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="ID"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="cash"
          label="金额"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="useDesc"
          label="描述"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="时间"
          align="center"
        >
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog
      title="充值"
      :visible.sync="showczBox"
      width="30%"
    >
      <el-input
        size="small"
        v-model="total_amount"
        placeholder="请填写充值金额"
      ></el-input>
      <span
        class="tipMsg"
        v-show="tipShow"
      >{{tipName}}</span>
      <el-input
        style="margin-top: 20px;"
        type="textarea"
        :rows="2"
        v-model="body"
        placeholder="请填写充值描述"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showczBox = false">取 消</el-button>
        <el-button
          type="primary"
          @click="walletRecharge"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提现"
      :visible.sync="showTxBox"
      width="30%"
    >
      <p style="margin-bottom: 20px;">当前可提现金额：{{indexInfo.shopBalance}}</p>
      <el-input
        size="small"
        v-model="amount"
        placeholder="请填写提现金额"
      ></el-input>
      <span
        class="tipMsg"
        v-show="tipShow"
      >{{tipName}}</span>
      <el-input
        size="small"
        style="margin-top: 20px;"
        v-model="payee_account"
        placeholder="请填写支付宝账号"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showTxBox = false">取 消</el-button>
        <el-button
          type="primary"
          @click="withdrawCash"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../../../store/services'
import ShopleftNav from '~/components/ShopleftNav.vue'
export default {
  components: {
    ShopleftNav
  },
  async asyncData () {

  },
  data () {
    return {
      loading: true,
      shopInfo: '',
      showShopInfo: false,
      indexInfo: '',
      showjyBox: false,
      walletList: [],
      showczBox: false,
      showTxBox: false,
      total_amount: '',
      body: '',
      tipShow: false,
      tipName: '',
      payee_account: '',
      amount: '',
      walletRechargeLoading: false,
    }
  },
  head () {
    return {
      title: '智慧众合-我的店铺'
    }
  },
  mounted () {
    this.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
    if (this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_SHOP') > -1) {
      this.getMyShop()
      this.myShopStatus()
    } else {
      this.$router.push({ path: '/personalCenter/config/shopApply' })
    }
  },
  methods: {
    getMyShop () {
      Services.getMyShop().then(response => {
        if (response.data.code == 200) {
          this.shopInfo = response.data.result.shop
          this.showShopInfo = true
        }
      })
    },
    myShopStatus () {
      Services.myShopStatus().then(response => {
        if (response.data.code == 200) {
          this.indexInfo = response.data.result.status
        }
      })
    },
    getJyList () {
      Services.coWalletDetailQuery().then(response => {
        if (response.data.code == 200) {
          this.walletList = response.data.result.walletList
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
      Services.coWalletRecharge(parmas).then(response => {
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
      if (this.amount > this.indexInfo.shopBalance || this.amount < 0.1) {
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
      Services.coWithdrawCash(parmas).then(response => {
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
  width: 100%;
  height: 125px;
  background: #ffffff;
}
.tx {
  display: block;
  float: left;
  width: 90px;
  height: 90px;
  margin: 20px 0 0 30px;
}
.perTextInfo {
  display: block;
  float: left;
}
.name {
  margin-top: 19px;
  margin-left: 15px;
}
.tag {
  margin-top: 15px;
  margin-left: 15px;
  background-color: #f66600;
  color: #ffffff;
  border-radius: 2px;
  font-size: 12px;
  padding: 1px 5px;
  display: block;
  float: left;
}
.more {
  margin-top: 16px;
  margin-left: 10px;
  display: block;
  float: left;
  font-size: 12px;
  color: #f66600;
}
.infoIist .sss {
  display: block;
  float: left;
  padding: 0 15px;
  margin: 15px 0;
  text-align: left;
  color: #666666;
  font-size: 14px;
  border-right: 1px solid #e8e8e8;
  cursor: pointer;
}
.perInfoCenter {
  width: 896px;
  height: 230px;
  background-color: #ffffff;
  margin-top: 20px;
  border-radius: 5px;
}
.title {
  font-size: 18px;
  font-weight: bold;
  padding: 22px 42px;
}
.perInfoCenter .imgList {
  text-align: center;
}
.perInfoCenter .imgList .d1 {
  margin-top: 110px;
  font-size: 18px;
  text-align: center;
}
.perInfoCenter .imgList .grrz {
  width: 200px;
  height: 150px;
  display: inline-block;
  margin-right: 60px;
  border-radius: 10px;
  background: url(~/static/img/grrz2.png);
  background-repeat: no-repeat;
  background-position: center 30px;
}
.perInfoCenter .imgList .qyrz {
  width: 200px;
  height: 150px;
  display: inline-block;
  margin-right: 60px;
  border-radius: 10px;
  background: url(~/static/img/orderIcon.png);
  background-size: 60px;
  background-repeat: no-repeat;
  background-position: center 30px;
}
.perInfoCenter .imgList .spgl {
  width: 200px;
  height: 150px;
  display: inline-block;
  margin-right: 60px;
  border-radius: 10px;
  background: url(~/static/img/goodsIcon.png);
  background-size: 55px;
  background-repeat: no-repeat;
  background-position: center 30px;
}
.perInfoCenter .imgList .grrz:hover {
  cursor: pointer;
  box-shadow: 2px -2px 10px 2px #efefef;
  background: url(~/static/img/grrz1.png);
  background-repeat: no-repeat;
  background-position: center 30px;
}
.perInfoCenter .imgList .qyrz:hover {
  cursor: pointer;
  box-shadow: 2px -2px 10px 2px #efefef;
  background: url(~/static/img/orderIcon1.png);
  background-repeat: no-repeat;
  background-position: center 30px;
  background-size: 60px;
}
.perInfoCenter .imgList .spgl:hover {
  cursor: pointer;
  box-shadow: 2px -2px 10px 2px #efefef;
  background: url(~/static/img/goodsIcon1.png);
  background-repeat: no-repeat;
  background-position: center 30px;
  background-size: 55px;
}
.perInfoBottom {
  width: 100%;
  height: 230px;
  background-color: #ffffff;
  margin-top: 20px;
}
.perInfoBottom .bottomLeft {
  display: block;
  float: left;
  width: 49%;
}
.perInfoBottom .bottomCenterBorder {
  display: block;
  float: left;
  width: 1%;
  height: 100px;
  border-left: 1px solid #e8e8e8;
}
.perInfoBottom .bottomRight {
  display: block;
  float: left;
  width: 49%;
}
.bottomList {
  color: #333333;
  font-size: 18px;
  margin: 0 0 15px 50px;
}
.bottomText {
  width: 90px;
  height: 30px;
  line-height: 30px;
  color: #666666;
  font-size: 16px;
  margin-left: 50px;
  display: block;
  float: left;
}
.num {
  min-width: 70px;
  height: 30px;
  text-align: center;
  display: block;
  float: left;
  color: #e1338b;
  font-size: 16px;
  line-height: 30px;
}
.shopChoose {
  color: #f66600;
  font-size: 12px;
  margin-left: 50px;
  padding: 1px 5px;
  border: 1px solid #f66600;
  border-radius: 50px;
  display: block;
  float: left;
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
.tipMsg {
  font-size: 12px;
  line-height: 20px;
  color: #f00;
}
.selfYe {
  display: inline-block;
  color: #666666;
  font-size: 14px;
  margin-left: 15px;
  margin-top: 15px;
  cursor: pointer;
}
</style>
<style>
th {
  background-color: #efefef !important;
  text-align: center !important;
}
</style>