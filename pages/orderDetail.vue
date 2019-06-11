<template>
  <div
    class="orderDetail"
    v-if="orderInfo.orders"
  >
    <div class="infoBox">
      <p class="title">寄送地址</p>
      <p class="spanList">
        <span>收件人：{{ orderInfo.orders[0].address.contact }}</span>
        <span>手机：{{ orderInfo.orders[0].address.mobilePhone }}</span>
        <span>地址：{{ orderInfo.orders[0].address.detail }}</span>
      </p>
    </div>
    <div class="infoBox">
      <p class="title">主体信息</p>
      <p class="spanList">
        <span>名称：{{ orderInfo.orders[0].subject.subjectName }}</span>
        <span>性质：{{ orderInfo.orders[0].subject.subjectType }}</span>
        <span>联系人：{{ orderInfo.orders[0].subject.subjectContact }}</span>
        <span>手机：{{ orderInfo.orders[0].subject.subjectMobilePhone }}</span>
        <span>地址：{{ orderInfo.orders[0].subject.subjectDetailAddress }}</span>
      </p>
    </div>
    <div class="infoBox">
      <p class="title">产品清单</p>
      <div class="goodsList">
        <div
          v-for="list in orderInfo.orders"
          :key="list.id"
        >
          <span class="s1">商家：{{ list.shop.shopName }}</span><br />
          <div
            v-for="item in list.orderDetails"
            :key="item.id"
          >
            <span><img :src="$store.state.baseImgUrl + item.productImage" /></span>
            <span>{{ item.productName }}</span>
            <span>{{ item.productTagName }}</span>
            <span
              v-if="item.realPrice === 0"
              style="color:red;"
            >面议</span>
            <span v-else>￥{{ item.realPrice }}</span>
            <span>×{{ item.num }}</span>
          </div>
        </div>
      </div>
    </div>
    <div class="infoBox">
      <p class="title">备注信息</p>
      <p class="spanList">{{ orderInfo.orders[0].remark || "暂无" }}</p>
    </div>
    <div
      class="price"
      v-if="orderInfo.orders[0].state == 0"
    >
      <!-- <p><i><span></span>件商品</i></p> -->
      <el-alert
        v-if="orderInfo.canPay === false"
        title="订单中的部分价格面议的商品需要卖家修改价格后支付。"
        type="error"
        :closable="false"
      >
      </el-alert>
      <p>
        <i>应付总额：<span>￥{{ orderInfo.totalPrice }}</span></i>
      </p>
      <div class="automatic">
        <label>
          <input
            type="checkbox"
            id="checkBox2"
            v-model="checkTrue"
          />
        </label>
        <p
          style="display: inline-block"
          v-on:click="showXYBoxBtn()"
        >
          我已同意<span style="font-size:14px;color:#26a9e1;cursor: pointer;">交易服务协议</span>
        </p>
        <div class="clear"></div>
      </div>

      <p
        :class="checkTrue && orderInfo.canPay === true ? 'button' : 'buttonN'"
        v-on:click="goPay()"
      >
        去支付
      </p>
      <div style="clear: both"></div>
    </div>
    <el-dialog
      title="交易服务协议"
      :visible.sync="showXYBox"
      width="50%"
    >
      <div v-html="webContent"></div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../store/services'
export default {
  beforeCreate () {
    this.$store.dispatch('setNavName', '订单详情')
  },
  head () {
    return {
      title: '智慧众合-' + this.$store.state.navName
    }
  },
  data () {
    return {
      orderId: '',
      orderInfo: {},
      checkTrue: false,
      showXYBox: false,
      webContent: ''
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
  },
  computer: {
    canPay: function () {

    }
  },
  methods: {
    showXYBoxBtn () {
      if (this.webContent) {
        this.showXYBox = true
        return
      }
      Services.getWebContent('2160204779368448').then(response => {
        if (response.data.code == 200) {
          this.webContent = response.data.result.webContent.content
          this.showXYBox = true
        }
      })
    },
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
    goPay () {
      console.log(this.orderInfo.id)

      // console.log(!this.checkTrue || this.orderInfo.canPay === false)
      if (!this.checkTrue || this.orderInfo.canPay === false) {
        return false
      }
      this.$router.replace({ path: '/pay', query: { id: this.orderInfo.tOrderNo } })
      // const loading = this.$loading({
      //   lock: true,
      //   text: '等待支付',
      //   spinner: 'el-icon-loading',
      //   background: 'rgba(0, 0, 0, 0.7)'
      // });
      // let params = {
      //   out_trade_no: this.orderInfo.id,
      //   total_amount: this.orderInfo.totalPrice,
      //   subject: this.orderInfo.tOrderNo,
      //   body: this.orderInfo.tOrderNo
      // }
      // Services.aliPay(params).then(response => {
      //   if (response.data.code == 200) {
      //     $('body').html(response.data.result)
      //   } else {
      //     loading.close();
      //   }
      // })
    }
  }
}
</script>
<style scoped lang="scss">
.orderDetail {
  width: 1162px;
  margin: 30px auto;
  .title {
    font-size: 16px;
    color: #666666;
    margin-bottom: 10px;
  }
  .infoBox {
    border-bottom: 1px solid #efefef;
    margin-bottom: 20px;
    font-size: 14px;
    .spanList {
      margin: 10px 0;
      span {
        display: inline-block;
        margin-right: 15px;
      }
    }
  }
  .goodsList {
    background-color: rgba(246, 246, 246, 1);
    margin: 20px 0;
    div {
      padding: 15px;
      border-bottom: 1px solid #ffffff;
      span {
        display: inline-block;
        font-size: 14px;
        width: 20%;
        line-height: 70px;
        img {
          width: 70px;
          height: 70px;
        }
      }
      .s1 {
        text-align: left;
        width: 100%;
        font-size: 12px;
        margin-bottom: 15px;
        line-height: 15px;
      }
    }
  }
  .price {
    text-align: right;
    margin: 20px 0;
    p {
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
}
</style>
