<template>
  <div>
    <div class="clear"></div>
    <div class="content">
      <div class="main">
        <div class="header">
          <span>知识产权交易 > </span>
          <span>域名交易</span>
        </div>
        <div class="clear"></div>
        <div class="Mall-d1">
          <ul>
            <li>
              <span>全部类型 :</span>
              <ul>
                <li
                  :class="changeactive1 === null ? 'active' : ''"
                  @click="open(null)"
                >
                  全部
                </li>
                <li
                  v-for="(item, index) in listByCodePs1"
                  :class="changeactive1 === item.id ? 'active' : ''"
                  @click="open(item.id, item.pCode)"
                  v-show="index < changeIndex"
                >
                  {{ item.name }}
                </li>
                <li
                  class="bi"
                  v-if="changeIndex == 12 && listByCodePs1.length >= 13"
                >
                  <button @click="changeT()">展开</button>
                  <img src="~/static/img/jiantoux.png" alt="" />
                </li>
                <li
                  class="bi"
                  v-else-if="changeIndex != 12 && listByCodePs1.length >= 13"
                >
                  <button @click="changeT()">收起</button>
                  <img src="~/static/img/jiantous.png" alt="" />
                </li>
              </ul>
            </li>
            <li v-if="listByCodePs2.length > 1">
              <span></span>
              <ul>
                <li
                  v-for="item in listByCodePs2"
                  :class="jiageA == item.pCode ? 'active' : ''"
                  @click="open1(item.id, item.pCode)"
                >
                  {{ item.name }}
                </li>
              </ul>
            </li>
            <li>
              <span>价格区间 :</span>
              <ul>
                <li
                  :class="hanziA === null ? 'active' : ''"
                  @click="open2(null)"
                >
                  全部
                </li>
                <li
                  v-for="(item, hanziindex) in jiage"
                  :class="hanziA == hanziindex ? 'active' : ''"
                  @click="open2(hanziindex)"
                >
                  {{ item }}
                </li>
              </ul>
            </li>
            <li>
              <span>多类搜索 :</span>
              <input type="text" v-model="Stext" placeholder="请输入关键词" />
              <button @click="showProductInit()">搜索</button>
              <button
                style="backgroundColor:#26a9e1;"
                v-if="Stext != '' && Stext != null"
                @click="SearchTextList()"
              >
                展示全部
              </button>
            </li>
          </ul>
        </div>
        <div class="Mall-d2">
          <div class="Mall-d2-d1">
            <ul>
              <li class="Mall-d2-d1-ul-li-bg">商标列表</li>
              <li @click="changeimg1($event)">
                <img
                  v-if="jiageimg == true"
                  src="~/static/img/jiantoushang.png"
                  alt=""
                />
                <img v-else src="~/static/img/jiantouxia.png" alt="" />价格
              </li>
              <li @click="changeimg2()">
                <img
                  v-if="shijianimg == true"
                  src="~/static/img/jiantoushang.png"
                  alt=""
                />
                <img v-else src="~/static/img/jiantouxia.png" alt="" />时间
              </li>
            </ul>
          </div>
          <div>
            <div class="bottomCon">
              <div class="botLeft">
                <ul>
                  <li
                    v-for="(item, index) in prductDataList"
                    @mouseover="openPop(index)"
                    @mouseout="closePop(index)"
                    v-show="
                      Pmin <= Number(item.price) && Number(item.price) <= Pmax
                    "
                  >
                    <div :ref="index" class="pop">
                      <button @click="addShopCarInit(item.id)">
                        加入购物车
                      </button>
                      <button @click="goGoodsDetail(item.id, item.shopId)">
                        立即购买
                      </button>
                    </div>
                    <img
                      class="ziying"
                      src="~/static/img/ziying.png"
                      v-if="item.shopName == '安徽善雅信息科技有限公司'"
                      alt=""
                    />
                    <div class="shopImg">
                      <img
                        @click="goGoodsDetail(item.id, item.shopId)"
                        :src="$store.state.baseImgUrl + item.defalutImage"
                      />
                    </div>
                    <div class="shopInfo">
                      <p class="shopName">
                        {{ item.title }}
                      </p>
                      <p class="price">
                        ￥<span>{{
                          item.price == 0 ? "价格面议" : item.price
                        }}</span>
                      </p>
                      <p class="subTitle">
                        {{ item.subTitle }}
                      </p>
                      <p @click="goShopDetail(item.shopId)" class="companyName">
                        <span>交易商</span>{{ item.shopName }}
                      </p>
                      <img
                        @click="goShopDetail(item.shopId)"
                        class="dianpu"
                        src="~/static/img/dianpu.png"
                        alt=""
                      />
                    </div>
                  </li>
                </ul>
                <div v-if="prductDataList.length < 1" class="noGoods">
                  暂无相关服务
                </div>
                <div class="clear"></div>
                <!-- 分页 -->
                <el-pagination
                  class="table-pagination"
                  @current-change="handlePageChange"
                  :current-page="pageNo"
                  :page-size="max"
                  layout="total, prev, pager, next, jumper"
                  :total="totalPage"
                >
                </el-pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import Services from '../../store/services'
export default {
  async asyncData () {
    let [listByCodePs1] = await Promise.all([
      Services.listByCodePs({ pCode: '10401' }),
    ])
    return {
      listByCodePs1: listByCodePs1.data.result.resourceCategoryList,
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '域名交易')
  },
  data () {
    return {
      listByCodePs2: [],
      changeIndex: 12,
      zuhe: ['纯数字', '纯字母', '数字+字母'],
      jiage: ['0-3万', '3-5万', '5-10万', '10万-20万', '20万以上'],
      jiageimg: false,
      shijianimg: false,
      changebg: 1,
      changeactive: null,
      changeactive1: null,
      jiageA: null,
      hanziA: null,
      prductDataList: [],
      Stext: '',
      sort: 'price',
      order: 'desc',
      Pmin: 0,
      Pmax: 100000000000000000000,
      max: 10,
      pageNo: 1,
      totalPage: 0,
    }
  },
  head () {
    return {
      title: '知识产权代理费用价格_知识产权服务商城-智慧众合',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '专利申请交易费用,商标注册转让价格,工商财税服务费用,高新企业申报和科技项目申报价格,公司注册变更费用' },
        { hid: 'description', name: 'description', content: '智慧众合服务商城为广大企业提供知识产权代理服务及费用价格，商城提供服务包括：专利申请交易、商标注册转让、工商财税服务、高新企业申报和科技项目申报、公司注册变更等，明确标注服务项目市场价格，为企业带来透明方便服务。' }
      ]
    }
  },
  mounted () {
    if (this.$route.query.val) {
      this.changeactive = Number(this.$route.query.val)
      this.changeactive1 = Number(this.$route.query.val)
    }
    this.showProductInit()
  },
  methods: {
    addShopCarInit (id) {
      let params = {
        productTagId: id,
      }
      Services.addShopCar(params).then(response => {
        if (response.data.code == 200) {
          this.$message.success(response.data.message)
          this.setCarNum()
        }
      })
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
    openPop (i) {
      this.$refs[i][0].style.top = '182px'
      this.$refs[i][0].style.opacity = '1'

    },
    closePop (i) {
      this.$refs[i][0].style.top = '250px'
      this.$refs[i][0].style.opacity = '0'
    },
    changeT () {
      if (this.changeIndex == 12) {
        this.changeIndex = this.listByCodePs1.length
      } else {
        this.changeIndex = 12
      }
    },
    //分页
    handlePageChange (val) {
      this.pageNo = val
      this.showProductInit({
        resourceCategoryId: Number(this.zyClassId),
        productClassId: Number(this.classId)
      })
    },
    SearchTextList () {
      this.Stext = ''
      this.showProductInit()
    },
    showProductInit (param) {
      var params = {
        max: this.max,
        pageNo: this.pageNo,
        order: this.order,
        sort: this.sort,
        keyString: this.Stext,
        resourceCategoryId: this.changeactive,
        productClassId: Number(47)
      }
      Services.showProduct(params).then(response => {
        if (response.data.code == 200) {
          this.prductDataList = response.data.result.productList;
          this.totalPage = Number(response.data.result.pageable.total);
        }
      })
    },
    open (id, p) {
      this.changeactive = id
      this.changeactive1 = id
      this.showProductInit()
      Services.listByCodePs({ pCode: p }).then(response => {
        this.listByCodePs2 = response.data.result.resourceCategoryList
      })
    },
    open1 (id, p) {
      this.jiageA = p
      this.changeactive = id
      this.showProductInit()
    },
    open2 (id) {
      this.hanziA = id
      if (this.hanziA == null) {
        this.Pmin = 0
        this.Pmax = 1000000000000000000000000
      } else if (this.hanziA == 0) {
        this.Pmin = 0
        this.Pmax = 30000
      } else if (this.hanziA == 1) {
        this.Pmin = 30000
        this.Pmax = 50000
      } else if (this.hanziA == 2) {
        this.Pmin = 50000
        this.Pmax = 100000
      } else if (this.hanziA == 3) {
        this.Pmin = 100000
        this.Pmax = 200000
      } else if (this.hanziA == 4) {
        this.Pmin = 200000
        this.Pmax = 1000000000000000000000
      }
    },
    goShopDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/shopDetail?id=' + id
    },
    changeimg1 (e) {
      this.sort = 'price'
      if (this.jiageimg == true) {
        this.jiageimg = false
        this.order = 'desc'
      } else {
        this.jiageimg = true
        this.order = 'asc'
      }
      this.showProductInit()
    },
    changeimg2 () {
      this.sort = 'lastUpdateTime'
      if (this.shijianimg == true) {
        this.shijianimg = false
        this.order = 'desc'
      } else {
        this.shijianimg = true
        this.order = 'asc'
      }
      this.showProductInit()
    },
    goGoodsDetail (id, shopId) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/commodityDetails?id=' + id + '&shopId=' + shopId
    },
  }
}
</script>
<style scoped>
.dianpu {
  width: 14px;
  display: inline-block;
  padding: 5px;
  margin-left: 5px;
  margin-top: 3px;
}
.subTitle {
  margin: 5px auto;
  width: 97%;
  color: #676767;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.companyName > span {
  color: #ffa32b;
  border: 1px solid #ffa32b;
  border-radius: 15px;
  font-size: 12px;
  padding: 2px 5px;
  text-align: center;
  margin-right: 5px;
}
.price {
  width: 35%;
  color: #fb400d;
  font-size: 14px;
  display: inline-block;
  text-align: right;
  padding-right: 10px;
  overflow: hidden;
}
.companyName {
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
.shopName {
  width: 60%;
  color: #2f2f2f;
  font-size: 14px;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.pop {
  width: 100%;
  position: absolute;
  top: 182px;
  opacity: 0;
}
.pop > button {
  width: 50%;
  text-align: center;
  padding: 10px 0px;
  border: 0px;
  color: #ffffff;
  font-size: 14px;
  cursor: pointer;
}
.pop > button:first-child {
  background: #70d9f4;
}
.pop > button:last-child {
  background: #33cdf4;
}
.botLeft .noGoods {
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
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  left: 10px;
}
.ziying {
  width: 40px;
  height: 40px;
  position: absolute;
  top: 0px;
  left: 0px;
}
.shopInfo {
  padding: 0 0 0 10px;
}
img {
  border: 0;
  vertical-align: top;
}
.botLeft ul li .shopImg img {
  width: 220px;
  height: 220px;
  display: block;
  margin: 0 auto;
  border: none;
}
.botLeft ul li .shopImg {
  width: 214px;
  height: 220px;
  display: block;
  margin: 0 0 10px 0;
  background-color: #efefef;
  border: none;
  overflow: hidden;
}
.botLeft ul li {
  float: left;
  width: 214px;
  height: 315px;
  margin: 10px 9px;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;
}
.botLeft ul,
.botRight ul {
  margin: 0;
  padding: 0;
  display: block;
}
.botLeft {
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
.active {
  background-color: #26a9e1;
  color: #ffffff;
  border-radius: 20px;
}
.Mall-d2-d1-ul-li-bg {
  background-color: #ffffff;
  color: #26a9e1;
}
.Mall-d2-d1 > ul > li > img {
  width: 7px;
  margin: 3px;
}
.Mall-d2-d1 > ul > li {
  float: left;
  padding: 10px 25px;
}
.Mall-d2-d1 {
  width: 100%;
  height: 40px;
  background-color: #f4f4f4;
  font-size: 14px;
  margin-top: 10px;
  border: 1px solid #f6f6f6;
}
.Mall-d1 > ul > li > ul > li {
  float: left;
  font-size: 14px;
  padding: 8px 15px;
  margin: 0px 5px;
}
.Mall-d1 > ul > li > ul {
  display: block;
  margin-top: 12px;
  max-width: 1000px;
}
.bi > button {
  color: #26a9e1;
  font-size: 14px;
  border: 0px;
  background-color: #ffffff;
}
.bi > img {
  width: 14px;
  padding-top: 4px;
}
.Mall-d1 > ul > li > span {
  height: 18px;
  width: 120px;
  display: block;
  color: #959595;
  font-size: 14px;
  padding: 20px 0px;
  text-align: center;
}
.Mall-d1 > ul > li > input {
  width: 200px;
  padding: 6px 8px;
  height: 20px;
  margin-top: 14px;
  background-color: #f6f6f6;
  border: 0px;
  font-size: 14px;
}
.Mall-d1 > ul > li > button {
  padding: 6px 20px;
  height: 30px;
  margin-top: 14px;
  background-color: #ffa32b;
  border: 0px;
  margin-left: 20px;
  color: #ffffff;
  font-size: 14px;
}
.Mall-d1 > ul > li {
  border-bottom: 1px dashed #e8e8e8;
  display: flex;
}
.Mall-d1 > ul > li:last-child {
  border-bottom: 0px dashed #e8e8e8;
  display: flex;
}
.Mall-d1 {
  width: 100%;
  border: 1px solid #f6f6f6;
}
.header {
  font-size: 14px;
  padding: 20px 0px;
}
.header > span:last-child {
  color: #26a9e1;
}
.clear {
  clear: both;
}
.content {
  width: 100%;
  background-color: #ffffff;
  min-height: 1000px;
  padding-bottom: 30px;
}
.main {
  width: 1170px;
  margin: 0 auto;
}
</style>
