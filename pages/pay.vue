<template>
  <div class="pay">
    <div class="pay-d1">
      <div>
        <img
          src="@/static/img/duihao.png"
          alt=""
        />订单提交完成，现在只差最后一步啦！
      </div>
      <p>
        请您在提交订单后<span style="color:red;">24小时</span>内完成支付，否则订单会被取消。
      </p>
    </div>
    <div class="pay-d2">
      <p>订单号：{{orderId}}<span><a @click="goMyOrders">我的订单 ></a></span></p>
      <p v-if="orderInfo.orders">
        地址：{{ orderInfo.orders[0].address.detail }}&nbsp;&nbsp;&nbsp;&nbsp;
        收件人：{{ orderInfo.orders[0].address.contact }}&nbsp;&nbsp;&nbsp;&nbsp;
        手机：{{ orderInfo.orders[0].address.mobilePhone }}
      </p>
    </div>
    <div class="pay-d3">
      <div>支付金额：<span style="color:red;font-size:24px;">￥{{orderInfo.totalPrice}}</span></div>
      <div>
        <span>支付方式：</span>
        <ul>
          <li
            @click="changePay(0)"
            :class="payNum == 0 ? 'selectionli' : ''"
          >
            <img
              src="@/static/img/zhifubao.png"
              alt=""
            />
            <div>
              <p>支付宝</p>
              <p>ALPAY</p>
            </div>
            <img
              v-show="payNum == 0"
              class="selection"
              src="@/static/img/gouduihao.png"
              alt=""
            />
          </li>
          <li
            @click="changePay(1)"
            :class="payNum == 1 ? 'selectionli' : ''"
          >
            <img
              src="@/static/img/xianxia.png"
              alt=""
            />
            <div>
              <p>线下支付</p>
              <p>Offline payments</p>
            </div>
            <img
              v-show="payNum == 1"
              class="selection"
              src="@/static/img/gouduihao.png"
              alt=""
            />
          </li>
          <li
            @click="changePay(2)"
            :class="payNum == 2 ? 'selectionli' : ''"
          >
            <img
              src="@/static/img/geren.png"
              alt=""
            />
            <div>
              <p>
                个人钱包
                <span style="color:#ff7300;font-size: 12px;">
                  &nbsp;( ￥{{selfCash}} )</span>
              </p>
              <p>Personal wallet</p>
            </div>
            <img
              v-show="payNum == 2"
              class="selection"
              src="@/static/img/gouduihao.png"
              alt=""
            />
          </li>
          <li
            @click="changePay(3)"
            :class="payNum == 3 ? 'selectionli' : ''"
          >
            <img
              src="@/static/img/qiye.png"
              alt=""
            />
            <div>
              <p>
                企业钱包
                <span style="color:#ff7300;font-size: 12px;">&nbsp;( ￥{{coCash}} )</span>
              </p>
              <p>Corporate wallet</p>
            </div>
            <img
              v-show="payNum == 3"
              class="selection"
              src="@/static/img/gouduihao.png"
              alt=""
            />
          </li>
        </ul>
      </div>
      <div class="pay-d3-d3">
        <div v-if="payNum == 0">
          <p>
            您选择了支付宝支付，点击确认提交进入付款页面
          </p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
        <div v-else-if="payNum == 1">
          <p>
            您选择了线下支付，转账后请及时与智慧众合工作人员联系，电话0550-3532009
          </p>
          <p>
            开户名：<span>{{offlineAccount.zhAccountName}}</span>
          </p>
          <p>开户行：<span>{{offlineAccount.zhBank}}</span></p>
          <p>开户账号：<span>{{offlineAccount.zhAccount}}</span></p>
        </div>
        <div v-else-if="payNum == 2">
          <p>
            您选择了使用个人钱包支付
          </p>
          <p v-if="checkTrue === true">&nbsp;</p>
          <p v-else><span>个人钱包余额不足，请选择其它支付方式</span></p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
        <div v-else-if="payNum == 3">
          <p>
            您选择了使用企业店铺钱包支付
          </p>
          <p v-if="checkTrue === true">&nbsp;</p>
          <p v-else><span>您未开通企业店铺或企业钱包余额不足，请选择其它支付方式</span></p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
        <div v-else>
          <p>
            请选择一种支付方式
          </p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </div>
        <div class="price">
          <p
            v-if="payNum !==1"
            style="color:#ffffff;"
            :class="checkTrue && orderInfo.canPay === true ? 'button' : 'buttonN'"
            @click="goPay"
          >
            确认提交
          </p>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../store/services'
export default {
  beforeCreate () {
    this.$store.dispatch('setNavName', '支付方式')
  },
  head () {
    return {
      title: '智慧众合-' + this.$store.state.navName
    }
  },
  data () {
    return {
      payNum: -1,
      orderId: '',
      orderInfo: {},
      checkTrue: false,
      showXYBox: false,
      webContent: '',
      selfCash: 0,
      coCash: 0,
      offlineAccount: []
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.orderId = this.$route.query.id
      this.getOrderDetail(this.orderId)
    } else {
      this.orderId = this.$route.query.oid
      this.getOrderInfo(this.orderId)
    }
    this.getMyCash()
  },
  methods: {
    getOrderDetail (id) {
      Services.getOrderByTOrderNo(id).then(response => {
        if (response.data.code == 200) {
          this.orderInfo = response.data.result.payRecord[0]
        }
      })
    },
    getOrderInfo (id) {
      Services.getOrders(id).then(response => {
        if (response.data.code == 200) {
          this.orderInfo = response.data.result
        }
      })
    },
    getMyCash () {
      Services.selfCurrentCash().then(response => {
        if (response.data.code == 200) {
          this.selfCash = response.data.result
        }
      })
      Services.coCurrentCash().then(response => {
        if (response.data.code == 200) {
          this.coCash = response.data.result
        }
      })
      Services.getOfflineAccount().then(response => {
        if (response.data.code == 200) {
          this.offlineAccount = response.data.result
        }
      })
    },
    changePay (value) {
      this.payNum = value
      if (this.payNum === 0) {
        this.checkTrue = true
      } else if (this.payNum === 1) {
        this.checkTrue = true
      } else if (this.payNum === 2) {
        if (this.selfCash < this.orderInfo.totalPrice) this.checkTrue = false
        else this.checkTrue = true
      } else if (this.payNum === 3) {
        if (this.coCash < this.orderInfo.totalPrice) this.checkTrue = false
        else this.checkTrue = true
      }
    },
    goMyOrders () {
      this.$router.push({ path: '/personalCenter/orderList' })
    },
    goPay () {
      console.log(!this.checkTrue || this.orderInfo.canPay === false)
      if (!this.checkTrue || this.orderInfo.canPay === false) {
        return false
      }

      const loading = this.$loading({
        lock: true,
        text: '等待支付',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });


      if (this.payNum === 0) {
        let params = {
          out_trade_no: this.orderInfo.id,
          total_amount: this.orderInfo.totalPrice,
          subject: this.orderInfo.tOrderNo,
          body: this.orderInfo.tOrderNo
        }
        Services.aliPay(params).then(response => {
          if (response.data.code == 200) {
            $('body').html(response.data.result)
          } else {
            loading.close();
          }
        })
      } else {
        let params = {
          out_trade_no: this.orderInfo.id,
          total_amount: this.orderInfo.totalPrice,
          tOrderNo: this.orderInfo.tOrderNo,
          payNum: this.payNum
        }
        Services.otherPay(params).then(response => {
          loading.close();
          if (response.data.code == 200) {
            if (response.data.result === true) {
              this.$message({
                message: '支付成功',
                type: 'success'
              });
              this.$router.replace({ path: '/personalCenter/orderList' })
            }
          } else {
            this.$message({
              message: '支付失败，请稍后重试',
              type: 'error'
            });

          }
        })
      }

    }
  }
}
</script>

<style scoped lang="scss">
.pay-d3-d3 p span {
  color: #ff7300;
}
.pay-d3-d3 {
  width: 80%;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
  align-items: center;
  min-height: 114px;
  padding-left: 90px;
}
.pay-d3-d3 button {
  padding: 10px 40px;
  background: #26a9e1;
  color: #ffffff;
  max-height: 38px;
  border: 0px;
}
.pay-d3-d3 p {
  font-size: 12px;
  // color: #c0c0c0;
  margin: 10px 0px;
}
.pay-d3-d3 p:nth-of-type(1) {
  color: #646464;
}
.pay-d3 > div {
  font-size: 12px;
  color: #646464;
  margin-bottom: 40px;
}
.pay-d3 ul {
  display: inline-block;
}
.pay-d3 ul li p:nth-of-type(1) {
  font-size: 14px;
  color: #3a3a3a;
  margin-top: 1px;
}
.pay-d3 ul li p:nth-of-type(2) {
  font-size: 10px;
}
.pay-d3 ul li img {
  width: 40px;
  height: 35px;
  margin-right: 10px;
}
.pay-d3 ul li {
  float: left;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  padding: 10px 40px;
  margin: 0px 25px;
  box-shadow: 0px 0px 5px #c9c9c9;
  position: relative;
  border: 1px solid #e6e6e6;
  cursor: pointer;
}
.selectionli {
  border: 1px solid #26a9e1 !important;
}
.selection {
  position: absolute;
  width: 18px !important;
  height: 18px !important;
  margin-right: 0px !important;
  bottom: 0%;
  right: 0%;
}
.pay-d3 {
  margin: 40px 0px;
  width: 100%;
  padding: 40px 10px;
  border: 1px solid #c9c9c9;
}
.pay-d2 p span {
  display: inline-block;
  float: right;
  padding-right: 10px;
}
.pay-d2 p {
  width: 100%;
  font-size: 12px;
  color: #646464;
  margin: 10px 0px;
}
.pay-d1 p {
  font-size: 12px;
  color: #646464;
  margin-top: 10px;
}
.pay-d1 img {
  width: 20px;
  margin-right: 5px;
}
.pay-d1 {
  padding: 20px 0px;
  border-bottom: 1px solid #c9c9c9;
  color: #3a3a3a;
}
.pay {
  width: 1170px;
  margin: 0 auto;
}
.price {
  text-align: right;
  margin: 20px 0;
  p {
    color: #ffffff;
    font-size: 14px;
    line-height: 30px;
    span {
      color: #fb400e;
      font-size: 20px;
    }
  }
  .button {
    width: 150px;
    background-color: #26a9e1;
    text-align: center;
    color: #ffffff;
    float: right;
    margin-top: 10px;
    line-height: 40px;
    cursor: pointer;
  }
  .buttonN {
    width: 150px;
    background-color: #cccccc;
    text-align: center;
    color: #ffffff;
    float: right;
    margin-top: 10px;
    line-height: 40px;
    cursor: pointer;
  }
}
</style>
