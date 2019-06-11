<template>
  <div class="shoppingCart1">
    <div class="content1">
      <div class="carMain">
        <h1>全部收藏<a href="javascript:;"></a></h1>
        <div class="boxList">
          <ul>
            <li>商品名</li>
            <li>商品图片</li>
            <li>产品介绍</li>
            <li>店铺</li>
            <li>单价</li>
            <li>操作</li>
          </ul>
          <div v-for="item in carList" :key="item.id">
            <ul class="border">
              <li @click="goGoodsDetail(item.id, item.shopId)">
                <p>{{ item.title }}</p>
              </li>
              <li @click="goGoodsDetail(item.id, item.shopId)">
                <img :src="$store.state.baseImgUrl + item.defalutImage" />
              </li>
              <li @click="goGoodsDetail(item.id, item.shopId)">
                <p>{{ item.subTitle }}</p>
              </li>
              <li @click="goShopDetail(item.shopId)">
                <p>{{ item.shopName }}</p>
              </li>
              <li @click="goGoodsDetail(item.id, item.shopId)">
                <p>{{ item.price }}</p>
              </li>
              <li>
                <a class="orange po" v-on:click="delGoods(item.id)">删除</a>
              </li>
            </ul>
          </div>
          <div
            v-show="showMore"
            v-on:click="shopCarListInit()"
            class="lookMore"
          >
            加载更多
          </div>
        </div>
      </div>
      <div class="clear"></div>
      <div class="settlement">
        <section>
          <div class="left">
            <!-- <input type="checkbox" name="allcheckList" @click="checkAll(1)" /> -->
            <!-- <a class="qx" href="javascript:;">全选</a> -->
            <!-- <a class="sc" v-on:click="deleteSelected()">删除</a> -->
            <a class="yr" v-on:click="clearCart()">清空收藏夹</a>
          </div>
          <!-- <a class="button" v-on:click="jiesuan()">去下单</a> -->
          <p>
            <em
              >已收藏商品 <span>{{ totalNum }}</span
              >件
            </em>
          </p>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../../store/services'
export default {
  data () {
    return {
      total_price: 0,
      carList: [],
      max: 20,
      pageNo: 0,
      showMore: false,
      selectId: [],
      total_num: 0,
      totalNum: ''
    }
  },
  filters: {
    formatMoney: function (value) {
      return "￥" + value.toFixed(2);
    }
  },
  head () {
    return {
      title: '智慧众合-收藏夹'
    }
  },
  mounted () {
    this.shopCarListInit()
  },
  methods: {
    goGoodsDetail (id, shopId) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/commodityDetails?id=' + id + '&shopId=' + shopId
    },
    goShopDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/shopDetail?id=' + id
    },
    shopCarListInit () {
      let self = this
      self.pageNo += 1
      let pamars = {
        max: self.max,
        pageNo: self.pageNo,
      }
      Services.listProductCollection(pamars).then(response => {
        if (response.data.code == 200) {
          self.totalNum = response.data.size
          self.carList = response.data.result
        }
      });
    },
    delGoods (id) {
      this.$confirm('确认删除？')
        .then(_ => {
          Services.collection({ productId: Number(id) }).then(response => {
            if (response.data.code == 200) {
              this.$message.success('删除成功')
              this.shopCarListInit()
            } else {
              this.$message.error(response.data.message)
            }
          })
        })
        .catch(_ => { });
    },
    deleteSelected () {
      let arr = this.getSelectCartId()
      if (arr.length == 0) {
        return false
      }
      let pamars = {
        ids: arr
      }
      this.$confirm('确认删除选中商品？')
        .then(_ => {
          Services.deleteSelected(pamars).then(response => {
            if (response.data.code == 200) {
              this.$message.success('删除成功')
              arr.forEach(element => {
                $("#list_" + element).remove()
              });
              this.totalPrice()
              this.setCarNum()
            } else {
              this.$message.error(response.data.message)
            }
          })
        })
        .catch(_ => { });
    },
    clearCart () {
      this.$confirm('确认清空收藏夹？')
        .then(_ => {
          Services.clearProductCollection().then(response => {
            if (response.data.code == 200) {
              this.$message.success('清空成功')
              this.shopCarListInit()
            } else {
              this.$message.error(response.data.message)
            }
          })
        })
        .catch(_ => { });
    },
    setCarNum () {
      let that = this
      Services.getCarCount().then(response => {
        if (response.data.code == 200) {
          let num = response.data.result
          that.$store.dispatch('shoppingCarNum', num)
        }
      })
    },
    checkAll (val) {
      let allcheck = document.getElementsByName("allcheckList");
      let checkItem = document.getElementsByName("checkItem");
      for (let i = 0; i < checkItem.length; i++) {
        if (allcheck[val].checked) {
          checkItem[i].checked = true;
          allcheck[0].checked = true;
          allcheck[1].checked = true;
        } else {
          checkItem[i].checked = false;
          allcheck[0].checked = false;
          allcheck[1].checked = false;
        }
      }
      this.totalPrice();
    },
    checkItem () {
      let checkItem = document.getElementsByName("checkItem");
      var a = 0
      for (var i = 0; i < checkItem.length; i++) {
        if (checkItem[i].checked == true) {
          a += 1
        }
      }
      if (a >= checkItem.length) {
        let allcheck = document.getElementsByName("allcheckList");
        for (let i = 0; i < allcheck.length; i++) {
          allcheck[i].checked = true;
        }
      } else {
        let allcheck = document.getElementsByName("allcheckList");
        for (let i = 0; i < allcheck.length; i++) {
          allcheck[i].checked = false;
        }
      }
      this.totalPrice();
    },
    //数量加减
    changeMoney (item, num) {
      if (num > 0) {
        item.num++;
        if (item.num > 9999999) {
          item.num = 9999999;
        }
      } else {
        item.num--;
        if (item.num <= 0) {
          item.num = 1;
          this.$message.error('商品数量不能小于1！')
        }
      }
      this.updateCartNum(item)
      this.totalPrice();
    },
    updateCartNum (item) {
      let pamars = {
        num: item.num
      }
      Services.updateCartNum(item.shopCartId, pamars).then(response => {
        if (response.data.code == 200) {
          this.$message.success('数量修改成功')
        }
      })
    },
    getSelectCartId () {
      var arr = []
      let checkItem = document.getElementsByName("checkItem");
      for (var i = 0; i < checkItem.length; i++) {
        if (checkItem[i].checked == true) {
          arr.push(Number(checkItem[i].value))
        }
      }
      return arr
    },
    totalPrice () {
      let self = this
      let selectId = this.getSelectCartId()
      this.total_num = selectId.length
      console.log(selectId)
      self.total_price = 0;
      if (selectId.length > 0) {
        self.carList.forEach(item => {
          for (var i in item.goods) {
            for (var id in selectId) {
              if (item.goods[i].shopCartId == selectId[id]) {
                self.total_price += item.goods[i].num * item.goods[i].currentPrice
              }
            }
          }
        })
      }
    },
    jiesuan () {
      let selectId = this.getSelectCartId()
      let pamars = {
        ids: selectId
      }
      Services.submitOrders(pamars).then(response => {
        if (response.data.code == 200) {
          console.log(response.data.result.shopCarts)
          let jsonStr = {
            orderPrice: this.total_price,
            goods: response.data.result.shopCarts,
            ids: selectId
          }
          localStorage.setItem('orderInfo', JSON.stringify(jsonStr))
          this.$router.push({ path: '/submitOrder' })
        }
      })
    }
  }
}
</script>
<style scope>
.content1 {
  background-color: #ffffff;
}
.content1 .carMain {
  width: 1170px;
  margin: 0 auto;
  padding: 15px 30px 15px;
}
.content1 .carMain h1 {
  font-size: 20px;
  color: rgba(47, 47, 47, 1);
  line-height: 33px;
}
.content1 .carMain h1 a {
  color: #fb400e;
  font-size: 14px;
  margin-left: 5px;
}
.content1 .carMain .boxList > ul {
  width: 1110px;
  height: 40px;
  line-height: 40px;
  background: rgba(234, 234, 234, 1);
  margin-top: 26px;
  font-size: 16px;
  font-weight: 600;
  margin: 0;
  border-radius: 1px;
  border: 1px solid #ffffff;
}
.content1 .carMain .boxList div > ul {
  width: 1110px;
  height: 40px;
  line-height: 40px;
  background: rgba(250, 250, 250, 1);
  margin-top: 26px;
  font-size: 14px;
  margin: 0;
  border-radius: 1px;
  border: 1px solid #ffffff;
}
.content1 .carMain .boxList .border {
  height: 95px;
  border: 1px solid #ffffff;
  font-size: 14px;
  cursor: pointer;
}
.content1 .carMain .boxList ul li {
  float: left;
}
.content1 .carMain .boxList ul li img {
  width: 80px;
  height: 80px;
  display: block;
  margin: 7px auto;
}
.content1 .carMain .boxList .border li:nth-child(1) input {
  margin-top: 25px;
}
.content1 .carMain .boxList .border li:nth-child(8) a:first-child {
  display: block;
  margin-top: 9px;
  height: 30px;
}
.content1 .carMain .boxList .border li section {
  width: 95px;
  height: 25px;
  float: left;
  margin-top: 20px;
  margin-left: -32px;
}
.content1 .carMain .boxList .border li p {
  line-height: 90px;
}
.content1 .carMain .boxList .border li section .reduce {
  border-left-radius: 10px;
}
.content1 .carMain .boxList .border li section label {
  float: left;
  display: block;
  width: 27px;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  text-align: center;
  background-color: #d4d4d4;
  border: 1px solid #ffffff;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.content1 .carMain .boxList .border li section label:first-child {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.content1 .carMain .boxList .border li section label:last-child {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.content1 .carMain .boxList .border li section input {
  width: 36px;
  height: 25px;
  text-align: center;
  padding: 0;
  border: none;
  float: left;
  border-top: 1px solid #ffffff;
  border-bottom: 1px solid #ffffff;
}
.content1 .boxList {
  margin-top: 10px;
}
.content1 .carMain .boxList ul li:nth-child(1) {
  width: 200px;
  text-align: center;
}
.content1 .carMain .boxList ul li:nth-child(2) {
  width: 200px;
  text-align: center;
}
.content1 .carMain .boxList ul li:nth-child(3) {
  width: 200px;
  text-align: center;
}
.content1 .carMain .boxList ul li:nth-child(4) {
  width: 200px;
  text-align: center;
}
.content1 .carMain .boxList ul li:nth-child(5) {
  width: 130px;
  text-align: center;
}
.content1 .carMain .boxList ul li:nth-child(6) {
  width: 130px;
  text-align: center;
}
.content1 .carMain .boxList .title {
  height: 48px;
  color: #2f2f2f;
  font-size: 12px;
  line-height: 48px;
}
.content1 .carMain .boxList .title input {
  display: block;
  width: 15px;
  height: 15px;
  float: left;
  margin-top: 16px;
  margin-left: 16px;
}
.content1 .carMain .boxList .title img {
  display: block;
  float: left;
  margin-top: 16px;
  margin-left: 12px;
  margin-right: 12px;
}

.content1 .settlement {
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 12px 0px 0px rgba(212, 212, 212, 0.2);
  background: url(~/static/img/bubg.png);
}
.content1 .settlement section {
  width: 1170px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
}
.content1 .settlement section p {
  float: right;
  margin: 0;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  margin-top: 10px;
  color: #2f2f2f;
}
.content1 .settlement section p em {
  margin-right: 50px;
}
.content1 .settlement section p span {
  font-size: 18px;
  color: #fb400e;
}
.content1 .settlement section .button {
  display: block;
  float: right;
  width: 150px;
  height: 58px;
  line-height: 58px;
  margin-top: 12px;
  text-align: center;
  font-size: 18px;
  color: #ffffff;
  cursor: pointer;
  background: rgba(38, 169, 225, 1);
}
.content1 .settlement section .left {
  float: left;
  height: 60px;
  line-height: 60px;
  margin-top: 10px;
}
.content1 .settlement section .left input {
  display: block;
  width: 15px;
  height: 15px;
  float: left;
  margin-top: 23px;
  margin-left: 16px;
  margin-right: 30px;
}
.content1 .settlement section .left a {
  font-size: 14px;
  color: #2f2f2f;
}
.content1 .settlement section .left .qx {
  margin-right: 100px;
}
.content1 .settlement section .left .yr {
  margin-left: 40px;
  cursor: pointer;
}
.content1 .lookMore {
  width: 100%;
  line-height: 50px;
  text-align: center;
  background-color: rgba(246, 246, 246, 1);
  color: #666;
  margin-top: 30px;
}
.content1 .sx {
  display: inline-block;
  margin-top: 30px;
  margin-left: 10px;
  color: #fb400e;
}
.content1 .opcity {
  opacity: 0.5;
}
.content1 .po {
  line-height: 90px;
  cursor: pointer;
}
</style>
