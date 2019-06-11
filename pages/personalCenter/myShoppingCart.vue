<template>
  <div class="shoppingCart">
    <div class="content">
      <div class="carMain">
        <h1>
          全部商品<a href="javascript:;">（{{ totalNum }}）</a>
        </h1>
        <div class="boxList">
          <ul>
            <li>
              <input type="checkbox" name="allcheckList" @click="checkAll(0)" />
            </li>
            <li>全选</li>
            <li>商品信息</li>
            <li>规格</li>
            <li>单价</li>
            <li>数量</li>
            <li>小计</li>
            <li>操作</li>
          </ul>
          <div v-for="item in carList" :key="item.shopId">
            <p class="title">
              <!-- <input type="checkbox"  name="checkList"  @click="checkList()"/> -->
              <img src="~/static/img/store.png" />
              <i class="po" v-on:click="goShopDetail(item.shopId)">{{
                item.shopName
              }}</i>
            </p>
            <ul
              :class="i.prodTagIsEnable ? '' : 'opcity'"
              :id="'list_' + i.shopCartId"
              class="border"
              v-for="i in item.goods"
              :key="i.shopCartId"
            >
              <li class="title-h">
                <input
                  v-if="i.prodTagIsEnable"
                  :value="i.shopCartId"
                  type="checkbox"
                  name="checkItem"
                  @click="checkItem()"
                />
                <span class="sx" v-if="!i.prodTagIsEnable">失效</span>
              </li>
              <li class="title-h">
                <img
                  v-on:click="i.prodTagIsEnable ? goDetail(i.productId) : ''"
                  :src="$store.state.baseImgUrl + i.productImage"
                />
              </li>
              <li class="title-h">
                <p>{{ i.productName }}</p>
              </li>
              <li class="title-h">
                <p>{{ i.productTagName }}</p>
              </li>
              <li class="title-h">
                <p>{{ i.currentPrice | formatMoney }}</p>
              </li>
              <li class="title-h">
                <section>
                  <label
                    class="reduce"
                    v-on:click="i.prodTagIsEnable ? changeMoney(i, -1) : ''"
                    >-</label
                  >
                  <input
                    disabled
                    class="shopNum"
                    type="text"
                    v-model="i.num"
                    value="1"
                  />
                  <label
                    class="plus"
                    v-on:click="i.prodTagIsEnable ? changeMoney(i, 1) : ''"
                    >+</label
                  >
                </section>
              </li>
              <li class="title-h">
                <p v-if="i.currentPrice * i.num === 0" class="orange">面议</p>
                <p v-else class="orange">
                  {{ (i.priceForAdd = (i.currentPrice * i.num) | formatMoney) }}
                </p>
              </li>
              <li class="title-h">
                <!-- <a href="javascript:;" class="orange" style="margin-right:15px;">移入收藏夹</a> -->
                <a class="orange po" v-on:click="delGoods(i.shopCartId)"
                  >删除</a
                >
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
            <input type="checkbox" name="allcheckList" @click="checkAll(1)" />
            <a class="qx" href="javascript:;">全选</a>
            <a class="sc" v-on:click="deleteSelected()">删除</a>
            <a class="yr" v-on:click="clearCart()">清空购物车</a>
            <!-- <a class="yr" href="javascript:;">移入收藏夹</a> -->
          </div>
          <a class="button" v-on:click="jiesuan()">去结算</a>
          <p>
            <em
              >已选商品 <span>{{ total_num }}</span
              >件
            </em>
            <i
              >合计：<span>{{ total_price | formatMoney }}</span></i
            >
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
      title: '智慧众合-购物车'
    }
  },
  mounted () {
    this.shopCarListInit()
  },
  methods: {
    goDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/productDetail?id=' + id
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
      Services.shopCarList(pamars).then(response => {
        if (response.data.code == 200) {
          self.totalNum = response.data.result.pageable.total
          if (self.pageNo >= response.data.result.pageable.totalPage) {
            self.showMore = false
          } else {
            self.showMore = true
          }
          response.data.result.shopCarts.forEach(ele => {
            if (self.carList.length > 0 && self.carList[self.carList.length - 1].shopId == ele.shopId) {
              self.carList[self.carList.length - 1].goods.push(ele)
            } else {
              let obj = {
                shopId: ele.shopId,
                shopName: ele.shopName,
                goods: [ele]
              }
              self.carList.push(obj)
            }
          });
          let allcheck = document.getElementsByName("allcheckList");
          for (let i = 0; i < allcheck.length; i++) {
            allcheck[i].checked = false;
          }
        }
      })
    },
    delGoods (id) {
      this.$confirm('确认删除？')
        .then(_ => {
          Services.deleteShopCar(id).then(response => {
            if (response.data.code == 200) {
              this.$message.success('删除成功')
              $("#list_" + id).remove()
              this.totalPrice()
              this.setCarNum()
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
      this.$confirm('确认清空购物车？')
        .then(_ => {
          Services.clearCart().then(response => {
            if (response.data.code == 200) {
              this.$message.success('清空成功')
              this.carList = []
              this.showMore = false
              this.totalPrice()
              this.setCarNum()
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
.title-h {
  line-height: 93px;
}
.content {
  background-color: #ffffff;
}
.content .carMain {
  width: 1170px;
  margin: 0 auto;
  padding: 15px 30px 140px;
}
.content .carMain h1 {
  font-size: 20px;
  color: rgba(47, 47, 47, 1);
  line-height: 33px;
}
.content .carMain h1 a {
  color: #fb400e;
  font-size: 14px;
  margin-left: 5px;
}
.content .carMain .boxList ul {
  width: 1110px;
  height: 40px;
  line-height: 40px;
  background: rgba(246, 246, 246, 1);
  margin-top: 26px;
  font-size: 14px;
  margin: 0;
  border-radius: 1px;
  border: 1px solid #ffffff;
}
.content .carMain .boxList .border {
  height: 95px;
  border: 1px solid #e2e2e2;
  font-size: 12px;
}
.content .carMain .boxList ul li {
  float: left;
}
.content .carMain .boxList ul li img {
  width: 101px;
  height: 70px;
  display: block;
  margin-top: 13px;
}
.content .carMain .boxList ul li:nth-child(1) input {
  display: block;
  margin: 0 auto;
  width: 15px;
  height: 15px;
  margin-top: 13px;
}
.content .carMain .boxList .border li:nth-child(1) input {
  margin-top: 40px;
}
.content .carMain .boxList .border li:nth-child(4) p {
  width: 120px;
  line-height: 20px;
  margin-top: 35px;
}
/* .content .carMain .boxList .border li:nth-child(5),
li:nth-child(7) p {
  margin-top: 9px;
} */
.content .carMain .boxList .border li:nth-child(8) a:first-child {
  display: block;
  height: 30px;
}
.content .carMain .boxList .border li section {
  width: 95px;
  height: 25px;
  float: left;
  margin-top: 32px;
  margin-left: -32px;
}
.content .carMain .boxList .border li section .reduce {
  border-left-radius: 10px;
}
.content .carMain .boxList .border li section label {
  float: left;
  display: block;
  width: 27px;
  height: 25px;
  line-height: 25px;
  font-size: 16px;
  text-align: center;
  background-color: #d4d4d4;
  border: 1px solid #c1c1c1;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.content .carMain .boxList .border li section label:first-child {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.content .carMain .boxList .border li section label:last-child {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.content .carMain .boxList .border li section input {
  width: 36px;
  height: 25px;
  text-align: center;
  padding: 0;
  border: none;
  float: left;
  border-top: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.content .carMain .boxList ul li:nth-child(1) {
  width: 47px;
}
.content .carMain .boxList ul li:nth-child(2) {
  width: 125px;
}
.content .carMain .boxList ul li:nth-child(3) {
  width: 330px;
}
.content .carMain .boxList ul li:nth-child(4) {
  width: 138px;
}
.content .carMain .boxList ul li:nth-child(5) {
  width: 138px;
}
.content .carMain .boxList ul li:nth-child(6) {
  width: 130px;
}
.content .carMain .boxList ul li:nth-child(7) {
  width: 128px;
}
.content .carMain .boxList ul li:nth-child(7) {
  width: 128px;
}
.content .carMain .boxList .title {
  height: 48px;
  color: #2f2f2f;
  font-size: 12px;
  line-height: 48px;
}
.content .carMain .boxList .title input {
  display: block;
  width: 15px;
  height: 15px;
  float: left;
  margin-top: 16px;
  margin-left: 16px;
}
.content .carMain .boxList .title img {
  display: block;
  float: left;
  margin-top: 16px;
  margin-left: 12px;
  margin-right: 12px;
}

.content .settlement {
  width: 100%;
  height: 70px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 12px 0px 0px rgba(212, 212, 212, 0.2);
  background: url(~/static/img/bubg.png);
}
.content .settlement section {
  width: 1170px;
  height: 60px;
  line-height: 60px;
  margin: 0 auto;
}
.content .settlement section p {
  float: right;
  margin: 0;
  font-size: 14px;
  height: 60px;
  line-height: 60px;
  margin-top: 10px;
  color: #2f2f2f;
  margin-right: 57px;
}
.content .settlement section p em {
  margin-right: 46px;
}
.content .settlement section p span {
  font-size: 18px;
  color: #fb400e;
}
.content .settlement section .button {
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
.content .settlement section .left {
  float: left;
  height: 60px;
  line-height: 60px;
  margin-top: 10px;
}
.content .settlement section .left input {
  display: block;
  width: 15px;
  height: 15px;
  float: left;
  margin-top: 23px;
  margin-left: 16px;
  margin-right: 30px;
}
.content .settlement section .left a {
  font-size: 14px;
  color: #2f2f2f;
}
.content .settlement section .left .qx {
  margin-right: 100px;
}
.content .settlement section .left .yr {
  margin-left: 40px;
}
.lookMore {
  width: 100%;
  line-height: 50px;
  text-align: center;
  background-color: rgba(246, 246, 246, 1);
  color: #666;
  margin-top: 30px;
}
.sx {
  display: inline-block;
  margin-top: 30px;
  margin-left: 10px;
  color: #fb400e;
}
.opcity {
  opacity: 0.5;
}
.po {
  cursor: pointer;
}
</style>
