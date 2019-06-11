<template>
  <div>
    <div class="clear"></div>
    <!--轮播图开始-->
    <div class="swipercontentbg">
      <div class="swipercontent">
        <el-carousel trigger="click" height="413px" :interval="8000">
          <el-carousel-item v-for="item in advertList1" :key="item.id">
            <img
              :src="$store.state.baseImgUrl + item.imageUrl"
              v-on:click="goLink(item.url)"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
    <!--轮播图结束-->
    <div class="content">
      <div class="main">
        <div class="clear"></div>
        <div class="tradingMall-d1">
          <img src="~/static/img/sousuo.png" @click="serchNow()" alt="" />
          <ul>
            <li
              v-for="item in daleibie"
              @click="changebg(item)"
              :class="dalei == item ? 'active1' : ''"
            >
              {{ item }}
            </li>
          </ul>
          <input
            type="text"
            :class="rightListd2input1"
            placeholder="请输入您要搜索的商标、域名、软著、专利等关键字"
            v-model="keyName"
            @input="changeColor()"
          />
          <img src="~/static/img/sousuobg.png" alt="" />
        </div>
        <div class="clear"></div>
        <div class="tradingMall-d2">
          <ul>
            <li>
              <div>
                <img src="~/static/img/1.png" alt="" /><span>商标分类</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in listByCodePs1"
                  @click="searchHot(item.id, 1)"
                  v-show="index < 8"
                >
                  {{ item.name }}
                </li>
              </ul>
            </li>
            <li>
              <div>
                <img src="~/static/img/2.png" alt="" /><span>版权分类</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in listByCodePs2"
                  @click="searchHot(item.id, 2)"
                  v-show="index < 8"
                >
                  {{ item.name }}
                </li>
              </ul>
            </li>
            <li>
              <div>
                <img src="~/static/img/3.png" alt="" /><span>专利分类</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in listByCodePs3"
                  @click="searchHot(item.id, 3)"
                  v-show="index < 7"
                >
                  {{ item.name }}
                </li>
              </ul>
            </li>
            <li>
              <div>
                <img src="~/static/img/4.png" alt="" /><span>域名分类</span>
              </div>
              <ul>
                <li
                  v-for="(item, index) in listByCodePs4"
                  @click="searchHot(item.id, 4)"
                  v-show="index < 8"
                >
                  {{ item.name }}
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="clear"></div>
        <div class="tradingMall-d3">
          <h1><span>专利</span>交易</h1>
          <ul class="tradingMall-d3-u1">
            <li
              :class="zhuanli == item ? 'active' : ''"
              v-for="(item, index) in zhuanlileibie"
              v-show="index < 8"
              @mouseenter="changebg5(item)"
            >
              {{ item }}
            </li>
            <li @click="openP()">其他分类></li>
          </ul>
          <div class="clear"></div>
          <div class="floor_body fl clearfix transaction">
            <div class="tRight">
              <el-carousel arrow="never" height="500px" :interval="4000">
                <el-carousel-item v-for="item in advertList12" :key="item.id">
                  <img
                    v-on:click="goLink(item.url)"
                    :src="$store.state.baseImgUrl + item.imageUrl"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="tLeft">
              <ul>
                <li
                  v-for="(shop, index) in zhuanlileibieList"
                  v-show="index < 8"
                  @click="goGoodsDetail(shop.objectId, shop.shopId)"
                  v-if="shop.positionType == zhuanli"
                >
                  <img
                    class="ziying"
                    src="~/static/img/ziying.png"
                    v-if="shop.shopName == '安徽善雅信息科技有限公司'"
                    alt=""
                  />
                  <img
                    class="shopImg"
                    :src="$store.state.baseImgUrl + shop.images"
                  />
                  <div class="shopInfo">
                    <p class="shopName1">
                      {{ shop.title }}
                    </p>
                    <p class="price1">
                      ￥<span>{{
                        shop.filed1 == 0 ? "价格面议" : shop.filed1
                      }}</span>
                    </p>
                    <p class="subTitle1">
                      {{ shop.subTitle }}
                    </p>
                    <p @click="goShopDetail(shop.shopId)" class="companyName1">
                      <span>交易商</span>{{ shop.shopName }}
                    </p>
                    <img
                      @click="goShopDetail(shop.shopId)"
                      class="dianpu1"
                      src="~/static/img/dianpu.png"
                      alt=""
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <div class="tradingMall-d3">
          <h1><span>商标</span>交易</h1>
          <ul class="tradingMall-d3-u1">
            <li
              :class="shangbiao == item ? 'active' : ''"
              v-for="(item, index) in shangibaoleibie"
              v-show="index < 8"
              @mouseenter="changebg1(item)"
            >
              {{ item }}
            </li>
            <li @click="openT()">其他分类></li>
          </ul>
          <div class="clear"></div>
          <div class="floor_body fl clearfix transaction">
            <div class="tRight">
              <el-carousel arrow="never" height="500px" :interval="4000">
                <el-carousel-item v-for="item in advertList11" :key="item.id">
                  <img
                    v-on:click="goLink(item.url)"
                    :src="$store.state.baseImgUrl + item.imageUrl"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="tLeft">
              <ul>
                <li
                  v-for="(shop, index) in shangibaoleibieList"
                  v-show="index < 8"
                  @click="goGoodsDetail(shop.objectId, shop.shopId)"
                  v-if="shop.positionType == shangbiao"
                >
                  <img
                    class="ziying"
                    src="~/static/img/ziying.png"
                    v-if="shop.shopName == '安徽善雅信息科技有限公司'"
                    alt=""
                  />
                  <img
                    class="shopImg"
                    :src="$store.state.baseImgUrl + shop.images"
                  />
                  <div class="shopInfo">
                    <p class="shopName1">
                      {{ shop.title }}
                    </p>
                    <p class="price1">
                      ￥<span>{{
                        shop.filed1 == 0 ? "价格面议" : shop.filed1
                      }}</span>
                    </p>
                    <p class="subTitle1">
                      {{ shop.subTitle }}
                    </p>
                    <p @click="goShopDetail(shop.shopId)" class="companyName1">
                      <span>交易商</span>{{ shop.shopName }}
                    </p>
                    <img
                      @click="goShopDetail(shop.shopId)"
                      class="dianpu1"
                      src="~/static/img/dianpu.png"
                      alt=""
                    />
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <div class="tradingMall-d3">
          <h1><span>版权</span>交易</h1>
          <ul class="tradingMall-d3-u1">
            <li
              :class="banquan == item ? 'active' : ''"
              v-for="(item, index) in banquanleibie"
              v-show="index < 8"
              @mouseenter="changebg2(item)"
            >
              {{ item }}
            </li>
            <li @click="openC()">其他分类></li>
          </ul>
          <div class="clear"></div>
          <div class="floor_body fl clearfix transaction">
            <div class="tRight">
              <el-carousel arrow="never" height="500px" :interval="4000">
                <el-carousel-item v-for="item in advertList13" :key="item.id">
                  <img
                    v-on:click="goLink(item.url)"
                    :src="$store.state.baseImgUrl + item.imageUrl"
                  />
                </el-carousel-item>
              </el-carousel>
            </div>
            <div class="tLeft">
              <ul>
                <li
                  v-for="(shop, index) in banquanleibieList"
                  v-show="index < 8"
                  @click="goGoodsDetail(shop.objectId, shop.shopId)"
                  v-if="shop.positionType == banquan"
                >
                  <img
                    class="ziying"
                    src="~/static/img/ziying.png"
                    v-if="shop.shopName == '安徽善雅信息科技有限公司'"
                    alt=""
                  />
                  <img
                    class="shopImg"
                    :src="$store.state.baseImgUrl + shop.images"
                  />
                  <p class="shopName">{{ shop.title }}</p>
                  <p class="subTitle">{{ shop.shopName }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <div class="tradingMall-d5">
          <h1><span>域名</span>交易</h1>
          <ul class="tradingMall-d5-u1">
            <li
              :class="yuming == item ? 'active' : ''"
              v-for="(item, index) in yumingleibie"
              v-show="index < 8"
              @mouseenter="changebg3(item)"
            >
              {{ item }}
            </li>
            <li @click="openD()">其他分类></li>
          </ul>
          <div class="clear"></div>
          <div class="floor_body fl clearfix transaction">
            <div class="ttLeft">
              <ul>
                <li
                  v-for="(shop, index) in yumingleibieList"
                  v-show="index < 10"
                  @click="goGoodsDetail(shop.objectId, shop.shopId)"
                  v-if="shop.positionType == yuming"
                >
                  <img
                    class="ziying"
                    src="~/static/img/ziying.png"
                    v-if="shop.shopName == '安徽善雅信息科技有限公司'"
                    alt=""
                  />
                  {{ shop.title }}
                  <p class="subTitle2">{{ shop.subTitle }}</p>
                  <p class="price">
                    ￥<span>{{
                      shop.filed1 == 0 ? "价格面议" : shop.filed1
                    }}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <div class="tradingMall-d6">
          <ul>
            <li>
              <img src="~/static/img/shangbiao.png" alt="" />
              <div>
                <h1>海量图标</h1>
                <span>海量商标专利，总有适合您的一款</span>
              </div>
            </li>
            <li>
              <img src="~/static/img/lianjie.png" alt="" />
              <div>
                <h1>买卖直联</h1>
                <span>直联卖家，透明零差价，担保支付</span>
              </div>
            </li>
            <li>
              <img src="~/static/img/anquan.png" alt="" />
              <div>
                <h1>安全交易</h1>
                <span>专业团队人工审核，来源真实可靠</span>
              </div>
            </li>
            <li>
              <img src="~/static/img/shandian.png" alt="" />
              <div>
                <h1>及买即用</h1>
                <span>最快当天用上新商标</span>
              </div>
            </li>
          </ul>
        </div>
        <br />
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../store/services'
export default {
  async asyncData () {
    let [productClassList, getAdvertList1001, getAdvertList1011, getAdvertList1007, getAdvertList1005,
      listByCodePs1, listByCodePs2, listByCodePs3, listByCodePs4,] = await Promise.all([
        Services.getProductClass(),
        Services.advertList('1009'),
        Services.advertList('1011'),
        Services.advertList('1012'),
        Services.advertList('1013'),
        Services.listByCodePs({ pCode: '10210' }),
        Services.listByCodePs({ pCode: '10305' }),
        Services.listByCodePs({ pCode: '10106' }),
        Services.listByCodePs({ pCode: '10401' }),
      ])
    return {
      productClassList: productClassList.data.result.productClassList,
      advertList1: getAdvertList1001.data.result,
      advertList11: getAdvertList1011.data.result,
      advertList12: getAdvertList1007.data.result,
      advertList13: getAdvertList1005.data.result,
      listByCodePs1: listByCodePs1.data.result.resourceCategoryList,
      listByCodePs2: listByCodePs2.data.result.resourceCategoryList,
      listByCodePs3: listByCodePs3.data.result.resourceCategoryList,
      listByCodePs4: listByCodePs4.data.result.resourceCategoryList,
    }
  },
  data () {
    return {
      daleibie: ['查专利', '查商标', '查域名', '查版权'],
      zscqjyNow: '',
      zscqfuType: [],
      zscqfuList: [],
      zscqJyType: [],
      zscqJyList: [],
      productTypeNow: '',
      prductDataListT: [],
      prductDataListD: [],
      prductDataListC: [],
      keyName: null,
      shangbiao: '化学原料',
      zhuanli: '生活必需',
      banquan: "文学",
      yuming: '.com',
      dalei: '查专利',
      shangibaoleibie: [],
      shangibaoleibieList: [],
      zhuanlileibie: [],
      zhuanlileibieList: [],
      banquanleibie: [],
      banquanleibieList: [],
      yumingleibie: [],
      yumingleibieList: [],
      rightListd2input1: 'inputcolorbai',
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '商城首页')
  },
  mounted () {
    this.prductDataListT1()
    this.prductDataListD1()
    this.prductDataListC1()
    this.searchRecommendList()
  },
  methods: {
    changeColor () {
      if (this.keyName == null || this.keyName == '') {
        this.rightListd2input1 = 'inputcolorbai'
      } else {
        this.rightListd2input1 = 'inputcolorhui'
      }
    },
    searchRecommendList () {
      Services.searchRecommendList({ posCode: "1010" }).then(response => {
        if (response.data.recommendPosition != null) {
          this.shangibaoleibie = response.data.recommendPosition.types.split(',')
          this.shangibaoleibieList = response.data.recomments
        }
      })
      Services.searchRecommendList({ posCode: "1011" }).then(response => {
        if (response.data.recommendPosition != null) {
          this.banquanleibie = response.data.recommendPosition.types.split(',')
          this.banquanleibieList = response.data.recomments        }
      })
      Services.searchRecommendList({ posCode: "1012" }).then(response => {
        if (response.data.recommendPosition != null) {
          this.yumingleibie = response.data.recommendPosition.types.split(',')
          this.yumingleibieList = response.data.recomments        }
      })
      Services.searchRecommendList({ posCode: "1015" }).then(response => {
        if (response.data.recommendPosition != null) {
          this.zhuanlileibie = response.data.recommendPosition.types.split(',')
          this.zhuanlileibieList = response.data.recomments        }
      })
    },
    changebg1 (n) {
      this.shangbiao = n
    },
    changebg2 (n) {
      this.banquan = n
    },
    changebg3 (n) {
      this.yuming = n
    },
    changebg5 (n) {
      this.zhuanli = n
    },
    changebg (n) {
      this.dalei = n
    },
    goGoodsDetail (id, shopId) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/commodityDetails?id=' + id + '&shopId=' + shopId
    },
    serchNow () {
      this.$router.push({ path: '/TradingMall/searchDown', query: { keyString: this.keyName, key: this.dalei } })
    },
    searchHot (val, p) {
      if (p == 1) { this.openT(val) }
      else if (p == 2) { this.openD(val) }
      else if (p == 3) { this.openP(val) }
      else if (p == 4) { this.openC(val) }
    },
    prductDataListT1 () {
      Services.showProduct({ productClassId: Number(39) }).then(response => {
        if (response.data.code == 200) {
          this.prductDataListT = response.data.result.productList;
        }
      })
    },
    prductDataListD1 () {
      Services.showProduct({ productClassId: Number(45) }).then(response => {
        if (response.data.code == 200) {
          this.prductDataListD = response.data.result.productList;
        }
      })
    },
    prductDataListC1 () {
      Services.showProduct({ productClassId: Number(47) }).then(response => {
        if (response.data.code == 200) {
          this.prductDataListC = response.data.result.productList;
        }
      })
    },
    goLink (url) {
      var tempwindow = window.open();
      tempwindow.location = url
    },
    openT (val) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/trademark?val=' + val
    },
    openD (val) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/copyright?val=' + val
    },
    openP (val) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/patent?val=' + val
    },
    openC (val) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/domainName?val=' + val
    }
  }
}
</script>
<style scoped>
.shopInfo {
  padding: 0 0 0 10px;
}
.dianpu1 {
  width: 14px;
  display: inline-block;
  padding: 5px;
  margin-left: 5px;
  margin-top: 3px;
}
.subTitle1 {
  margin: 5px auto;
  width: 97%;
  color: #676767;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.companyName1 > span {
  color: #ffa32b;
  border: 1px solid #ffa32b;
  border-radius: 15px;
  font-size: 12px;
  padding: 2px 5px;
  text-align: center;
  margin-right: 5px;
}
.price1 {
  width: 35%;
  color: #fb400d;
  font-size: 14px;
  display: inline-block;
  text-align: right;
  padding-right: 10px;
  overflow: hidden;
}
.companyName1 {
  color: #676767;
  font-size: 12px;
  line-height: 25px;
  width: 80%;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0px;
  display: inline-block;
  margin-top: 3px;
}
.shopName1 {
  width: 60%;
  color: #2f2f2f;
  font-size: 14px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.inputcolorhui {
  color: black;
}
.inputcolorbai {
  color: #d3d3d3;
}
.active1 {
  border-bottom: 2px solid #ffffff;
}
.active {
  color: #26a9e1;
  border-bottom: 2px solid #26a9e1;
}
/* 第六块 */
.tradingMall-d6 {
  height: 70px;
}
.tradingMall-d6 > ul > li {
  float: left;
  margin: 10px 23px;
  width: 230px;
}
.tradingMall-d6 > ul > li > img {
  width: 55px;
  height: 50px;
  display: inline-block;
}
.tradingMall-d6 > ul > li > div {
  width: 150px;
  display: inline-block;
  margin-left: 20px;
}
.tradingMall-d6 > ul > li > div > h1 {
  font-size: 14px;
  display: inline-block;
  margin-bottom: 5px;
}
.tradingMall-d6 > ul > li > div > span {
  font-size: 12px;
  color: #c0c0c0;
  display: inline-block;
}
/* 第五块 */
.t_shop .hot_key_word li.active {
  color: #26a9e1;
  border-bottom: 2px solid #26a9e1;
}
.t_shop .hot_key_word li:hover {
  color: #26a9e1;
}
.tradingMall-d5 {
  height: 320px;
}
.tradingMall-d5 > h1 {
  border-left: 4px solid #33cdf4;
  padding: 0px 10px;
  font-size: 16px;
}
.tradingMall-d5 > h1 > span {
  color: #33cdf4;
}
.tradingMall-d5 > span {
  font-size: 12px;
  margin: 10px;
  display: inline-block;
}
.tradingMall-d5-u1 {
  margin-top: 10px;
  height: 44px;
}
.tradingMall-d5-u1 > li {
  float: left;
  font-size: 12px;
  margin: 10px;
  padding-bottom: 5px;
  cursor: pointer;
}
.tradingMall-d5 > .transaction .tLeft li {
  width: 160px;
  height: 220px;
  margin: 20px 30px;
  float: left;
  cursor: pointer;
}
/* 第三块 */
.t_shop .floor_body {
  width: 100%;
  height: 375px;
}
.transaction {
  width: 100%;
  height: 270px;
}
.t_shop .floor_header {
  line-height: 40px;
}
.transaction .tRight {
  background-color: #ffffff;
  width: 220px;
  height: 500px;
  overflow: hidden;
  float: right;
  text-align: center;
  cursor: pointer;
  margin-top: 10px;
}
.tLeft .noGoods {
  margin: 20px auto;
  color: #676767;
  font-size: 14px;
  width: 100%;
  text-align: center;
}
.table-pagination {
  margin: 50px 0 0;
  text-align: center;
}
.address {
  color: #a1a1a1;
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 10px;
}
.subTitle {
  width: 100%;
  color: #676767;
  font-size: 12px;
  line-height: 20px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.subTitle2 {
  width: 100%;
  color: #676767;
  font-size: 12px;
  line-height: 20px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.shopName {
  width: 70%;
  color: #2f2f2f;
  font-size: 14px;
  line-height: 30px;
  margin-left: 10px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.price {
  color: #ffa32b;
  font-size: 14px;
  margin-top: 5px;
}
img {
  border: 0;
  vertical-align: top;
}
.shopImg {
  width: 100%;
  height: 212px;
  display: block;
  margin: 0 auto;
  margin: 0 0 5px 0;
  border: none;
  overflow: hidden;
}
.ziying {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.tLeft ul li {
  float: left;
  width: 214px;
  height: auto;
  margin: 10px 3px;
  padding-bottom: 10px;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;
  border: 1px solid #e8e8e8;
}
.ttLeft ul li {
  color: #2f2f2f;
  font-size: 14px;
  float: left;
  width: 174px;
  height: auto;
  padding: 20px;
  margin: 10px 10px;
  cursor: pointer;
  position: relative;
  border: 1px solid #e8e8e8;
}
.ttLeft ul li:hover {
  color: #33cdf4;
  background-color: #e6fbff;
}
/* .tLeft ul,
.tRight ul {
  margin: 0;
  padding: 0;
  display: block;
} */
.tLeft {
  width: 80%;
  height: auto;
  zoom: 1;
  overflow: hidden;
  display: block;
  float: left;
}

.ttLeft {
  width: 100%;
  height: auto;
  zoom: 1;
  overflow: hidden;
  display: block;
  float: left;
}
.bottomCon {
  width: 100%;
  height: auto;
  zoom: 1;
  overflow: hidden;
  margin-top: 15px;
  border: 1px solid #f6f6f6;
}
.tradingMall-d3 {
  height: 750px;
}
.tradingMall-d3 > h1 {
  border-left: 4px solid #33cdf4;
  padding: 0px 10px;
  font-size: 16px;
}
.tradingMall-d3 > h1 > span {
  color: #33cdf4;
}
.tradingMall-d3 > span {
  font-size: 12px;
  margin: 10px;
  display: inline-block;
}
.tradingMall-d3-u1 {
  margin-top: 10px;
  height: 44px;
}
.tradingMall-d3-u1 > li {
  float: left;
  font-size: 12px;
  margin: 10px;
  padding-bottom: 5px;
  cursor: pointer;
}
/* 第二块 */
.tradingMall-d2 {
  height: 100px;
}
.tradingMall-d2 > ul > li {
  float: left;
  margin: 0px 1.7%;
  width: 21.5%;
}
.tradingMall-d2 > ul > li > div {
  float: left;
}
.tradingMall-d2 > ul > li > div > span {
  display: block;
  width: 98px;
  font-weight: 600;
  font-family: "NSimSun";
  text-align: center;
  margin-top: 10px;
}
.tradingMall-d2 > ul > li > div > img {
  height: 70px;
  display: block;
}
.tradingMall-d2 > ul > li > ul {
  width: 138px;
  float: left;
  display: block;
}
.tradingMall-d2 > ul > li > ul > li {
  float: left;
  margin: 3px 8px;
  font-size: 12px;
  cursor: pointer;
}
.tradingMall-d2 > ul > li > ul > li:hover {
  color: #26a9e1;
}
/* 第一块 */
.tradingMall-d1 ul {
  height: 33px;
}
.tradingMall-d1 > img:last-child {
  width: 100%;
  height: 107px;
  position: absolute;
  top: 0px;
  left: 0px;
  z-index: -50;
}
.tradingMall-d1 > img:first-child {
  width: 17px;
  position: absolute;
  top: 62px;
  left: 94.5%;
  cursor: pointer;
}
.tradingMall-d1 > ul li {
  float: left;
  color: #ffffff;
  font-size: 12px;
  margin: 0px 20px 10px 0px;
  padding-bottom: 5px;
  cursor: pointer;
}
.tradingMall-d1 > input {
  border: 0px;
  background-color: #ffffff;
  width: 96%;
  padding: 8px 2%;
  display: block;
}

/* 顶部 */
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
.swipercontent {
  width: 1170px;
  height: 413px;
  overflow: hidden;
  background-color: #ffffff;
  font-size: 0;
  padding: 0;
  margin: -1px auto;
}
.swipercontentbg {
  width: 100%;
  height: 423px;
  background: #eeeeee;
}
.swipercontent img {
  width: 1170px;
  height: 100%;
}
.clear {
  clear: both;
}
.content {
  background-color: #eeeeee;
  min-height: 1000px;
}
.content .main {
  width: 1170px;
  margin: 0 auto;
}
div[class^="tradingMall"] {
  width: 95%;
  position: relative;
  background-color: #ffffff;
  margin-bottom: 10px;
  z-index: 100;
  padding: 1.8% 2.5%;
}
</style>
