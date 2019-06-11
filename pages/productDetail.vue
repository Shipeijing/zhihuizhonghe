<template>
  <!--主页开始-->
  <!--<div class="clear"></div>-->
  <div class="content">
    <div class="shopTop" id="shopTop" v-if="productInfo">
      <div class="shopInfo">
        <div class="leftb">
          <span v-for="i in classList"
            ><a v-on:click="goProductsList(i.id, i.name)">{{ i.name }}</a>
            > </span
          ><span>{{ productInfo.title }}</span>
        </div>
        <div class="rightb">
          <div class="shopType">{{ shopInfo.type }}</div>
          <div class="shopName" v-on:click="goShopDetail(shopInfo.id)">
            {{ shopInfo.shopName }}
          </div>
          <div class="online">
            <a
              :href="
                'tencent://message/?uin=' +
                  shopInfo.shopQq +
                  '&Site=sc.chinaz.com&Menu=yes'
              "
              >联系客服</a
            >
          </div>
        </div>
        <div class="clear"></div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="main">
      <!--右侧开始-->
      <div class="clear"></div>
      <div class="right">
        <section class="rightLeft">
          <div class="max">
            <div class="bigImg">
              <img :src="$store.state.baseImgUrl + nowImg" />
            </div>
            <ul class="smallImg">
              <li v-for="item in productImg">
                <img
                  :src="$store.state.baseImgUrl + item"
                  @click="changeImg(item)"
                />
              </li>
            </ul>
          </div>
          <div class="clear"></div>
          <div class="collection">
            <span>
              <a @click="collection(productId)" href="javascript:;">
                <img
                  v-if="isProductCollection == 0"
                  src="~/static/img/shoucang.png"
                />
                <img v-else src="~/static/img/shoucang1.png" />
                收藏
              </a>
              <a href="javascript:;">
                <img src="~/static/img/fenxiang.png" />
                分享 :
              </a>
              <share class="fenxiang" :config="config"></share>
              &nbsp;&nbsp;<a href="javascript:;">
                <span
                  ><img class="right-collection-img" src="~/static/img/dh.png"
                /></span>
                服务热线 ：0550-3532009
              </a>
            </span>
          </div>
        </section>
        <section class="rightRight" v-if="productInfo">
          <h1>{{ productInfo.title }}</h1>
          <p>类别 : {{ productInfo.resourceCategoryId }}</p>
          <table class="rightRight-table">
            <tr>
              <td class="t1">商品编号 :</td>
              <td>{{ productId }}</td>
            </tr>
            <tr v-if="productInfo.tCode != '' && productInfo.tCode != null">
              <td class="t1">商标类型 :</td>
              <td>{{ productInfo.tCode }}</td>
            </tr>
            <tr>
              <td class="t1">商品介绍 :</td>
              <td colspan="3">{{ productInfo.subTitle }}</td>
            </tr>
            <tr>
              <td class="t1">店铺名称 :</td>
              <td colspan="3">{{ shopInfo.shopName }}</td>
            </tr>
            <tr>
              <td class="t1">联系电话 :</td>
              <td colspan="3">{{ shopInfo.shopTelephone }}</td>
            </tr>
            <tr>
              <td class="t1">所属区域 :</td>
              <td colspan="3">{{ shopInfo.shopAddress }}</td>
            </tr>
          </table>

          <div class="boxList">
            <ul>
              <li
                v-if="item.isEnable"
                v-for="(item, index) in productTags"
                :class="{ active: index == bgColor }"
                @click="changeTag(index, item.tagPrice, item.id)"
                :key="item.id"
              >
                {{ item.tagName }}
                <img
                  :class="{ active2: index == bgColor }"
                  src="~/static/img/selectbg.png"
                />
                <img src="~/static/img/selectbg2.png" />
              </li>
            </ul>
            <div class="clear"></div>
          </div>
          <div class="aands">
            <p>数量</p>
            <section>
              <label class="reduce" v-on:click="changeMoney(-1)">-</label>
              <input
                class="shopnum"
                type="text"
                v-model="shopNumVal"
                value="1"
              />
              <label class="plus" v-on:click="changeMoney(1)">+</label>
            </section>
            <p>件</p>
            <div class="clear"></div>
          </div>
          <div class="price">
            <p>价格</p>
            <span>￥{{ tagPrice == 0 ? "价格面议" : tagPrice }}</span>
            <a
              style="margin-left:50px;color:#FEA53C;"
              v-show="tagPrice == 0"
              :href="
                'tencent://message/?uin=' +
                  shopInfo.shopQq +
                  '&Site=sc.chinaz.com&Menu=yes'
              "
            >
              <img
                src="~/static/img/ljzx.png"
                style="width:20px;margin-top:5px;margin-right:5px;"
              />立即咨询</a
            >
            <div class="clear"></div>
            <div class="butList">
              <a @click="addShopCarInit()">加入购物车</a>
              <a @click="buyNow()">立即购买</a>
            </div>
          </div>
        </section>
        <!-- <section class="rightShop">
          <ul>
            <li>
              <span>智全知识产权</span
              ><img :src="$store.state.baseImgUrl + shopLogo" alt="" />
            </li>
            <li>
              <span>相关推荐</span>
              <ul>
                <li v-for="item in tuijian">
                  {{ item.title }}
                  <p>￥{{ item.price }}</p>
                </li>
              </ul>
            </li>
          </ul>
        </section> -->
      </div>
      <div class="clear"></div>
      <div class="introduce">
        <ul class="nav">
          <li :class="activeBar == 4 ? 'active' : ''" @click="shopintroduce(4)">
            全部展示
          </li>
          <li :class="activeBar == 1 ? 'active' : ''" @click="shopintroduce(1)">
            商品介绍
          </li>
          <li :class="activeBar == 2 ? 'active' : ''" @click="shopintroduce(2)">
            商品评价（{{ rec }}）
          </li>
          <li :class="activeBar == 3 ? 'active' : ''" @click="shopintroduce(3)">
            安全保障
          </li>
        </ul>
        <div class="shopContent" v-show="activeBar == 1 || activeBar == 4">
          <h1>商品介绍</h1>
          <table>
            <tr>
              <th>商品名称:</th>
              <td>{{ productInfo.title }}</td>
              <th>商品编号:</th>
              <td>{{ productId }}</td>
            </tr>
            <tr>
              <th>店铺状态:</th>
              <td>{{ shopInfo.shopStatus }}</td>
              <th>商品介绍:</th>
              <td>{{ productInfo.subTitle }}</td>
            </tr>
            <tr>
              <th>店铺名称:</th>
              <td>{{ shopInfo.shopName }}</td>
              <th>联系电话:</th>
              <td>{{ shopInfo.shopTelephone }}</td>
            </tr>
            <tr>
              <th>所属地区:</th>
              <td colspan="3">{{ shopInfo.shopAddress }}</td>
            </tr>
          </table>

          <h1>商品详情</h1>
          <div class="content1">
            <span v-html="productInfo.content"></span>
          </div>
        </div>
        <div class="shopContent" v-show="activeBar == 2 || activeBar == 4">
          <h1>商品评价</h1>
          <div class="shopContent-d1">
            <div>
              <span>{{ haopingdu }}%</span>
              <p>好评度</p>
            </div>
            <table class="shopContent-d1-table">
              <tr>
                <td>好评（{{ haoping }}%）</td>
                <td>
                  <el-progress
                    :percentage="Number(haoping)"
                    :show-text="false"
                  ></el-progress>
                </td>
              </tr>
              <tr>
                <td>中评（{{ zhongping }}%）</td>
                <td>
                  <el-progress
                    :percentage="Number(zhongping)"
                    :show-text="false"
                  ></el-progress>
                </td>
              </tr>
              <tr>
                <td>差评（{{ chaping }}%）</td>
                <td>
                  <el-progress
                    :percentage="Number(chaping)"
                    :show-text="false"
                  ></el-progress>
                </td>
              </tr>
            </table>

            <ul class="shopContent-d1-nav">
              <li
                :class="changenav == null ? 'changenav' : ''"
                @click="change(null)"
              >
                全部评价（{{ rec }}）
              </li>
              <li :class="changenav == 4 ? 'changenav' : ''" @click="change(4)">
                晒图（{{ ima }}）
              </li>
              <li :class="changenav == 3 ? 'changenav' : ''" @click="change(3)">
                好评（{{ pra }}）
              </li>
              <li :class="changenav == 2 ? 'changenav' : ''" @click="change(2)">
                中评（{{ ave }}）
              </li>
              <li :class="changenav == 1 ? 'changenav' : ''" @click="change(1)">
                差评（{{ bad }}）
              </li>
            </ul>
            <div class="clear"></div>
            <div class="commentl">
              <ul class="comment">
                <li v-for="item in eval">
                  <div class="comment-user">
                    <img src="~/static/img/grtx.png" alt="" />
                    <span>{{ item.evaluationMenber }}</span>
                  </div>
                  <div class="comment-body">
                    <div>
                      <img
                        v-for="(item, index) in item.evaluationGrade"
                        src="~/static/img/shoucang1.png"
                        alt=""
                      />
                      <img
                        v-for="(item, index) in 5 - item.evaluationGrade"
                        src="~/static/img/shoucang.png"
                        alt=""
                      />
                    </div>
                    <p>{{ item.evaluationDetails }}</p>
                    <ul class="commentImg">
                      <li v-for="(item, index) in item.images" v-if="index < 6">
                        <img
                          :src="$store.state.baseImgUrl + item"
                          @click="changeImg(item)"
                        />
                      </li>
                      <div class="clear"></div>
                    </ul>
                    <span>{{ item.evaluationTime }}</span>
                  </div>
                  <div class="clear"></div>
                </li>
              </ul>
              <div class="clear"></div>
              <div class="comment-b">
                <button class="comment-button" @click="button()">
                  查看更多 > >
                </button>
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <div
          class="shopContentfooter"
          v-show="activeBar == 3 || activeBar == 4"
        >
          <ul>
            <li>
              <img src="~/static/img/pinlei.png" alt="" /><span>品类齐全</span>
              海量资源库，平台整合几十万闲置资源
            </li>
            <li>
              <img src="~/static/img/jiaoyi.png" alt="" /><span>交易保障</span>
              完善的资金保障体系，确保买卖双方资金安全
            </li>
            <li>
              <img src="~/static/img/zhuanren.png" alt="" /><span
                >专人跟进</span
              >
              专业交易顾问全程服务跟进，确保交易流畅
            </li>
            <li>
              <img src="~/static/img/kuaisu.png" alt="" /><span>快速响应</span>
              专业在线/电话客服服务，快速响应贴心服务
            </li>
            <li>
              <img src="~/static/img/shouhou.png" alt="" /><span>售后无忧</span>
              资质过硬，国内大型知识产权服务平台
            </li>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
      <!--右侧结束-->
      <div class="clear"></div>
    </div>
  </div>
  <!--主页结束-->
</template>
<script>
import axios from 'axios'
import Services from '../store/services'
export default {
  async asyncData ({ route }) {
    let [data] = await Promise.all([
      Services.getProductClass(),
    ])
    return {
      productClassList: data.data.result.productClassList,
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '产品详情')
  },
  head () {
    return {
      title: this.productInfo ? (this.productInfo.title + ' ' + (this.productInfo.price == 0 ? '价格面议' : '￥' + this.productInfo.price) + '-智慧众合') : '',
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.productInfo ? this.productInfo.title : '' }
      ]
    }
  },
  data () {
    return {
      config: {
        source: '智慧众和平台',
        title: '',
        description: '',
      },
      changenav: null,
      tagPrice: '',
      productId: '',
      productInfo: {},
      productTags: [],
      bgColor: 0,
      productImg: [],
      nowImg: '',
      activeBar: 4,
      productDetailId: '',
      content: '',
      shopInfo: [],
      classList: [],
      tuijian: [],
      shopLogo: null,
      total: 5,
      eval: [],
      bad: null,//差
      ave: null,//中
      pra: null,//好
      ima: null,//有图
      rec: null,//全部
      haopingdu: null,
      haoping: null,
      zhongping: null,
      chaping: null,
      isProductCollection: 0,
      shopNumVal: '1',
    }
  },
  mounted () {
    this.productId = this.$route.query.id
    this.shopId = this.$route.query.shopId
    this.initJs() //dom加载完成后引用
    this.productDetail(this.productId)
    this.randomProduct(this.shopId)
    this.commentList(this.productId)
    this.showProductDetail(this.productId)
  },
  methods: {
    changeTag (index, price, id) {
      this.bgColor = index;
      this.tagPrice = price;
      this.productDetailId = Number(id);
    },
    collection (id) {
      Services.collection({ productId: Number(id) }).then(response => {
        if (response.data.code == 200) {
          if (this.isProductCollection == 0) {
            this.isProductCollection = 1
            this.$message.success("收藏成功！")
          } else {
            this.isProductCollection = 0
            this.$message.success("已取消收藏！")
          }
        }
      })
    },
    showProductDetail (id) {
      Services.showProductDetail(id).then(response => {
        this.productInfo = response.data.result.product
        this.config.title = this.productInfo.title
        this.config.description = this.productInfo.subTitle
        this.productTags = response.data.result.product.productTags;
        this.isProductCollection = response.data.result.isProductCollection
        Services.getTrademarkName({ tCode: this.productInfo.tCode }).then(response => {
          this.productInfo.tCode = response.data.name
        })
        Services.getResourceCategoryName(this.productInfo.resourceCategoryId).then(response => {
          this.productInfo.resourceCategoryId = response.data.name
        })
      })
    },
    button () {
      this.total = this.total + 5
      this.commentList(this.productId)
    },
    commentList (id) {
      Services.commentList({ productId: id, rows: this.total, findType: this.changenav }).then(response => {
        this.eval = response.data.result.evaluationList
        this.bad = response.data.result.badReview
        this.ave = response.data.result.average
        this.pra = response.data.result.praise
        this.ima = response.data.result.imageCount
        this.rec = response.data.result.records
        this.haopingdu = parseInt(this.pra / this.rec * 100)
        if (this.pra == 0 && this.rec == 0) { this.haopingdu = 0 }
        this.haoping = parseInt(this.pra / this.rec * 100)
        if (this.pra == 0 && this.rec == 0) { this.haoping = 0 }
        this.zhongping = parseInt(this.ave / this.rec * 100)
        if (this.ave == 0 && this.rec == 0) { this.zhongping = 0 }
        this.chaping = 100 - this.haoping - this.zhongping
        if (this.haoping == 0 && this.zhongping == 0) { this.chaping = 0 }

      })
    },
    randomProduct (shopId) {
      Services.randomProduct({ num: '4', shopId: shopId }).then(response => {
        this.tuijian = response.data.result.productList
        this.shopLogo = response.data.result.shopLogo
      })
    },
    goProductsList (id, name) {
      this.$router.push({ path: '/goodsList', query: { productClassId: id, _n: name } })
    },
    getActiveId () {
      let val = this.classList[this.classList.length - 1]
      for (var i = 0; i < this.productClassList.length; i++) {
        if (this.productClassList[i].id == val && this.productClassList[i].parentId == 0) {
          var obj = {
            name: this.productClassList[i].name,
            id: this.productClassList[i].id
          }
          this.classList[this.classList.length - 1] = obj
          break
        } else if (this.productClassList[i].id == val && this.productClassList[i].parentId) {
          var obj = {
            name: this.productClassList[i].name,
            id: this.productClassList[i].id
          }
          this.classList[this.classList.length - 1] = obj
          this.classList.push(this.productClassList[i].parentId)
          val = this.productClassList[i].parentId
          i = -1
        }
      }
      this.classList = this.classList.reverse()
    },
    goShopDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/shopDetail?id=' + id
    },
    initJs () {
      //左侧列表
      $(".subcategory li").hover(function () {
        $(this).addClass("active").siblings().removeClass("active")
      });
    },
    productDetail (id) {
      Services.showProductDetail(id).then(response => {
        if (response.data.code == 200) {
          this.showShopInit(response.data.result.product.shopId)
          // this.productInfo = response.data.result.product;
          this.productTags = response.data.result.product.productTags;
          this.tagPrice = response.data.result.product.productTags[0].tagPrice;
          let imgUrl = response.data.result.product.images;
          this.productImg = imgUrl.split(",");
          //    		console.log(this.productImg);
          this.nowImg = this.productImg[0];

          this.productDetailId = Number(response.data.result.product.productTags[0].id);
          this.content = response.data.result.product.content;
          this.classList.push(response.data.result.product.productClassId)
          this.getActiveId()
        }
      })

    },
    showShopInit (id) {
      Services.showShop(id).then(response => {
        if (response.data.code == 200) {
          this.shopInfo = response.data.result.shop;
        } else {
          this.shopInfo = ''
          this.$message.error(response.data.message)
          this.$router.go(-1)
        }
      })
    },
    changeImg (img) {
      this.nowImg = img;
    },
    changeTag (index, price, id) {
      this.bgColor = index;
      this.tagPrice = price;
      this.productDetailId = Number(id);
    },
    shopintroduce (a) {
      if (this.activeBar != a) {
        this.activeBar = a;
      }
    },
    addShopCarInit () {
      let params = {
        productTagId: this.productDetailId,
        num: Number(this.shopNumVal)
      }
      if (this.shopNumVal <= 0) {
        this.$message.error('请选择商品数量！')
      } else {
        Services.addShopCar(params).then(response => {
          if (response.data.code == 200) {
            this.$message.success(response.data.message)
            this.setCarNum()
          }
        })
      }
    },
    buyNow () {
      let params = {
        productTagId: this.productDetailId,
      }
      Services.buyNow(params).then(response => {
        if (response.data.code == 200) {
          console.log(response.data.result.shopCarts)
          var arr = []
          arr.push(response.data.result.shopCarts[0].shopCartId)
          let jsonStr = {
            orderPrice: response.data.result.shopCarts[0].currentPrice,
            goods: response.data.result.shopCarts,
            ids: arr
          }
          localStorage.setItem('orderInfo', JSON.stringify(jsonStr))
          this.$router.push({ path: '/submitOrder' })
        }
      })
    },
    change (n) {
      this.changenav = n
      this.total = 5
      this.commentList(this.productId)
    },
    //数量加减
    changeMoney (num) {
      if (num > 0) {
        this.shopNumVal++;
        if (this.shopNumVal > 9999999) {
          this.shopNumVal = 9999999;
        }
      } else {
        this.shopNumVal--;
        if (this.shopNumVal <= 0) {
          this.shopNumVal = 1;
          this.$message.error('商品数量不能小于1！')
        }
      }
    },
    goGoodsDetail (id, shopId) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/commodityDetails?id=' + id + '&shopId=' + shopId
    },
    goShopDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/shopDetail?id=' + id
    },
    setCarNum () {
      let that = this
      Services.getCarCount().then(response => {
        if (response.data.code == 200) {
          let num = response.data.result
          that.$store.dispatch('shoppingCarNum', num)
        }
      })
    }
  }
}
</script>
<style scoped>
.content1 {
  padding: 20px;
  background-color: #ffffff;
}
.right .rightRight .boxList {
  margin-top: 20px;
}
.right .rightRight .boxList ul {
}
.right .rightRight .boxList ul li {
  min-width: 130px;
  /*height: 27px;*/
  float: left;
  text-align: center;
  /*line-height: 27px;*/
  font-size: 12px;
  color: #959595;
  /*background-image: url(../img/boxBgm.png);
	background-size: cover;
	*/
  border-radius: 5px;
  padding: 5px 20px 5px 5px;
  border: 1px solid #c0c0c0;
  background-repeat: no-repeat;
  margin: 0 13px;
  cursor: pointer;
  margin-bottom: 15px;
  position: relative;
}
.right .rightRight .boxList ul li img {
  position: absolute;
  width: 20px;
  height: 14px;
  top: 0;
  right: 0;
}
.right .rightRight .boxList ul .active {
  color: #26a9e1;
  border: 1px solid #26a9e1;
  padding: 5px 20px 5px 5px;
  /*background-image: url(../img/boxBg.png);*/
}
.active2 {
  padding: 0;
  z-index: 999;
}
.right .rightRight .boxList ul li:nth-child(3n + 3) {
  margin-right: 0 !important;
}
.fenxiang {
  display: inline-block;
}
.commentImg li {
  float: left;
  margin-right: 10px;
}
.commentImg {
  width: 100%;
}
.commentImg li img {
  width: 80px;
  height: 80px;
}
.comment-b {
  width: 100%;
}
.comment-button {
  width: 150px;
  border: 0px;
  padding: 8px 20px;
  background-color: #f6f6f6;
  color: #959595;
  margin: 20px auto;
  display: block;
}
.commentl {
  width: 100%;
}
.comment {
  width: 100%;
}
.comment > li {
  padding: 30px 0px;
  border-bottom: 1px solid #c0c0c0;
}
.comment > li:last-child {
  border-bottom: 1px solid #ffffff;
}
.comment-user {
  width: 16%;
  float: left;
}
.comment-user img {
  width: 50px;
  display: inline-block;
  margin-left: 20px;
}
.comment-user span {
  width: 50px;
  font-size: 14px;
  color: #959595;
  padding: 15px 10px;
  display: inline-block;
}
.comment-body {
  width: 70%;
  float: left;
}
.comment-body > div > img {
  width: 14px;
  margin: 0px 5px;
}
.comment-body > p {
  margin-top: 5px;
  min-height: 40px;
  padding: 5px;
  font-size: 12px;
}
.comment-body > span {
  margin-top: 10px;
  padding: 5px;
  color: #959595;
  font-size: 12px;
}
.shopContent-d1-nav {
  display: block;
  float: left;
  width: 100%;
  height: 40px;
  margin: 20px auto;
  background: #f6f6f6;
}
.changenav {
  color: #26a9e1;
}
.shopContent-d1-nav li {
  float: left;
  padding: 10px 30px;
}
.shopContent-d1 > div > span {
  width: 100px;
  color: #26a9e1;
  font-size: 35px;
  text-align: center;
  display: inline-block;
  margin-top: 20px;
}
.shopContent-d1 > div > p {
  width: 100px;
  color: #959595;
  text-align: center;
}
.shopContent-d1 > div {
  float: left;
}
.shopContent-d1-table {
  float: left;
  width: 200px;
  margin-top: 23px;
}
.el-progress-bar {
  padding: 0px;
  margin-right: 0px;
  margin-top: 10px;
}
.shopContent-d1-table td {
  width: 80px;
  text-align: right;
  font-size: 12px;
}
.content {
  background-color: #eeeeee;
  min-height: 1000px;
}
.content .main {
  width: 1170px;
  margin: 0 auto;
  padding-bottom: 100px;
}
/*左侧开始*/
.main .left {
  width: 176px;
  background-color: #ffffff;
  float: left;
  padding-bottom: 50px;
}
.main .left ul {
  margin-top: 10px;
}
.main .left ul li {
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.main .left ul li p {
  font-size: 16px;
  color: #2f2f2f;
  width: 130px;
  height: 50px;
  line-height: 50px;
  margin: 0 auto;
}
.main .left ul li ol li p {
  height: 35px;
  line-height: 35px;
  font-size: 12px;
  color: #959595;
}
.main .left ul li ol li {
  border-left: 4px solid #ffffff;
}
.main .left ul li ol .active {
  background-color: #eeeeee;
  border-left: 4px solid #26a9e1;
}
.main .left ul li p img {
  display: block;
  float: right;
  width: 12px;
  margin-top: 20px;
}

/*右侧开始*/
.rightShop {
  width: 200px;
  float: right;
  margin-right: 20px;
}
.rightShop > ul > li {
  margin-bottom: 10px;
  border: 1px solid #f6f6f6;
}
.rightShop > ul > li > span {
  display: block;
  width: 100%;
  background: #26a9e1;
  font-size: 14px;
  padding: 10px 0px;
  text-align: center;
  color: #ffffff;
}
.rightShop > ul > li > img {
  width: 100%;
  height: 180px;
}
.rightShop > ul > li > ul > li {
  display: block;
  width: 90%;
  padding: 8px 5%;
}
.rightShop > ul > li > ul > li > p {
  display: inline-block;
  float: right;
  color: #ff9400;
}
.right {
  width: 1170px;
  height: auto;
  float: left;
  background-color: #ffffff;
  min-height: 400px;
  padding: 20px 0 30px 0;
}
.right .rightLeft {
  width: 300px;
  float: left;
  margin-left: 20px;
}
/*.right .rightLeft .max img{
	width: 415px;
	height: 252px;
}*/
.bigImg {
  width: 300px;
  height: 300px;
  text-align: center;
  border: 1px solid #f3f3f3;
  padding: 5px;
}
.bigImg img {
  width: 100%;
  height: 100%;
}
.smallImg {
  width: 425px;
  height: 70px;
  margin-top: 10px;
}
.right .rightLeft .max .smallImg li {
  width: 70px;
  height: 100%;
  text-align: center;
  padding: 5px;
  border: 1px solid #f3f3f3;
}
.right .rightLeft .max .smallImg li img {
  width: 100%;
  height: 100%;
}
.right .rightLeft .max ul li {
  float: left;
  margin-right: 10px;
  cursor: pointer;
}
.right .rightLeft .max ul li:last-child {
  margin-right: 0;
}
.right .rightRight {
  float: left;
  margin-left: 40px;
  width: 543px;
}
.rightRight-table {
  width: 550px;
  border-top: 1px dashed #959595;
  margin-top: 10px;
}
.t1 {
  width: 60px;
}
.rightRight-table td {
  font-size: 12px;
  color: #959595;
  padding: 5px 5px 5px 0px;
}
.right .rightRight h1 {
  font-size: 18px;
  color: #2f2f2f;
  line-height: 35px;
}
.right .rightRight p {
  font-size: 12px;
  color: #959595;
}
.right .rightRight .price {
  width: 100%;
  height: 30px;
  line-height: 30px;
  margin-top: 10px;
}
.right .rightRight .price p {
  float: left;
  font-size: 12px;
  color: #2f2f2f;
}
.right .rightRight .price span {
  font-size: 18px;
  color: #fb400e;
  padding-left: 20px;
}
.right .rightRight h2 {
  font-size: 12px;
  color: #2f2f2f;
  font-weight: normal;
  padding: 20px;
}
.right .rightRight .aands {
  padding: 30px 20px;
}
.right .rightRight .aands p {
  color: #2f2f2f;
  float: left;
}
.right .rightRight .aands p span {
  color: #959595;
  font-size: 12px;
}
.shopnum {
  min-width: 80px;
}
.right .rightRight .aands section {
  width: auto;
  height: 25px;
  float: left;
  margin-top: -4px;
  margin-left: 18px;
  margin-right: 18px;
}
.right .rightRight .aands section .reduce {
  border-left-radius: 10px;
}
.right .rightRight .aands section label {
  float: left;
  display: block;
  width: 27px;
  height: 25px;
  text-align: center;
  background-color: #d4d4d4;
  border: 1px solid #c1c1c1;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.right .rightRight .aands section label:first-child {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.right .rightRight .aands section label:last-child {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.right .rightRight .aands section input {
  width: 36px;
  height: 25px;
  text-align: center;
  padding: 0;
  border: none;
  float: left;
  border-top: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.right .rightRight .butList {
  width: 100%;
}
.right .rightRight .butList a {
  display: block;
  width: 150px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  color: #ffffff;
  font-size: 16px;
  float: left;
  margin-top: 30px;
  border-radius: 3px;
  cursor: pointer;
}
.right .rightRight .butList a:first-child {
  background-color: #26a9e1;
  margin-right: 20px;
}
.right .rightRight .butList a:nth-child(2) {
  background-color: #ff9400;
}
.right .rightRight .butList a:nth-child(3) {
  background-color: #26a9e1;
}
.right .collection {
  color: #ff9400;
  font-size: 14px;
  width: 280px;
  /* margin: 0 auto; */
  margin-top: 10px;
}
.right .collection a {
  padding: 0 5px;
  font-size: 14px;
}
.right .collection a:first-child {
  margin-right: 5px;
}
.right .collection a:last-child {
  padding-top: 10px;
}
.right .collection a > img {
  width: 16px;
  margin-top: 8px;
}
.right-collection-img {
  margin-top: 3px;
  width: 14px;
  margin-right: 3px;
}
.introduce {
  width: 100%;
  background-color: #ffffff;
  margin-top: 10px;
}
.introduce .nav {
  width: 100%;
  margin: 0 auto;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #26a9e1;
}
.introduce .nav li {
  padding: 0 44px;
  text-align: center;
  float: left;
  font-size: 14px;
  cursor: pointer;
}
.introduce .nav .active {
  background-color: #26a9e1;
  color: #ffffff;
  font-weight: bold;
}
.introduce hr {
  border: 1px dashed #d9d9d9;
  margin-top: 60px;
}
.shopContent {
  padding: 30px 30px 0px 30px;
}
.shopContent h1 {
  color: #ff9400;
  border-bottom: 2px solid #ff9400;
  width: 120px;
  font-size: 16px;
  padding: 10px 0px;
}
.shopContent > img {
  max-width: 100%;
  display: block !important;
  margin: 10px auto !important;
}
.shopContent > table {
  width: 100%;
  margin: 20px auto;
  border-collapse: collapse;
}
.shopContent > table th {
  width: 20%;
  padding: 25px 0;
  background: #f8f8f8;
  border: 1px solid #e3e3e3;
  font-weight: 100;
}
.shopContent > table td {
  width: 25%;
  font-weight: 100;
  padding: 25px 5%;
  border: 1px solid #e3e3e3;
}
.shopContentfooter {
  padding: 30px 30px 60px 30px;
  height: auto;
}
.shopContentfooter ul li {
  float: left;
  width: 140px;
  text-align: center;
  font-size: 12px;
  color: #666666;
  margin: 0px 40px;
}
.shopContentfooter ul li span {
  display: block;
  font-weight: 600;
  color: #26a9e1;
  font-size: 14px;
  padding: 5px;
}
.shopContentfooter img {
  width: 100px;
  display: block !important;
  margin: 5px auto !important;
}
.shopTop {
  width: 1170px;
  height: auto;
  zoom: 1;
  overflow: hidden;
  margin: 0 auto;
  text-align: left;
}
.shopInfo {
  width: 1170px;
  height: auto;
  display: block;
  position: relative;
}
.shopInfo .leftb {
  float: left;
}
.shopInfo .leftb span {
  font-size: 12px;
  line-height: 40px;
  color: #959595;
}
.shopInfo .leftb span a {
  cursor: pointer;
}
.shopInfo .leftb span a:hover {
  color: #26a9e1;
}
.shopInfo .rightb {
  float: right;
}
.shopType {
  display: inline-block;
  font-size: 12px;
  padding: 2px 5px;
  background-color: #26a9e1;
  color: #ffffff;
  border-radius: 5px;
  margin-right: 5px;
}
.shopName {
  display: inline-block;
  color: #959595;
  font-size: 12px;
  line-height: 40px;
  cursor: pointer;
}
.online {
  display: inline-block;
  margin-left: 10px;
}
.online a {
  display: inline-block;
  color: #26a9e1;
  font-size: 12px;
  cursor: pointer;
  outline-style: none;
  -moz-outline-style: none;
}
.right .rightRight .aands {
  padding: 30px 20px;
}
.right .rightRight .aands p {
  color: #2f2f2f;
  float: left;
}
.right .rightRight .aands p span {
  color: #959595;
  font-size: 12px;
}
.shopnum {
  min-width: 80px;
}
.right .rightRight .aands section {
  width: auto;
  height: 25px;
  float: left;
  margin-top: -4px;
  margin-left: 18px;
  margin-right: 18px;
}
.right .rightRight .aands section .reduce {
  border-left-radius: 10px;
}
.right .rightRight .aands section label {
  float: left;
  display: block;
  width: 27px;
  height: 25px;
  text-align: center;
  background-color: #d4d4d4;
  border: 1px solid #c1c1c1;
  cursor: pointer;
  -moz-user-select: none;
  -khtml-user-select: none;
  user-select: none;
}
.right .rightRight .aands section label:first-child {
  border-top-left-radius: 2px;
  border-bottom-left-radius: 2px;
}
.right .rightRight .aands section label:last-child {
  border-top-right-radius: 2px;
  border-bottom-right-radius: 2px;
}
.right .rightRight .aands section input {
  width: 36px;
  height: 25px;
  text-align: center;
  padding: 0;
  border: none;
  float: left;
  border-top: 1px solid #c1c1c1;
  border-bottom: 1px solid #c1c1c1;
}
.social-share .social-share-icon {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  font-size: 16px;
  border-radius: 50%;
  line-height: 20px;
  border: 1px solid #666;
  color: #666;
  text-align: center;
  vertical-align: middle;
  transition: background 0.6s ease-out 0s;
}
</style>