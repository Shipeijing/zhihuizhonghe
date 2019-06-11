<template>
  <div>
    <div class="clear"></div>
    <div class="content">
      <!-- <div class="top">
        <div class="swipercontent">
          <el-carousel trigger="click" height="400px" :interval="8000">
              <el-carousel-item v-for="item in $store.state.serviceMallBanner" :key="item.id">
                  <img :src="$store.state.baseImgUrl+item.imageUrl" v-on:click="goLink(item.url)">
              </el-carousel-item>
          </el-carousel>
        </div>
			</div> -->
      <div class="clear"></div>
      <div class="main">
        <div class="centerCon">
          <ul class="tabs">
            <li
              v-for="(list, index) in productClassList"
              v-if="list.parentId == 0"
            >
              <a
                class="tab-link"
                @click="tabsSwitch(list.id)"
                :class="selectParentId == list.id ? 'active' : ''"
                >{{ list.name }}</a
              >
            </li>
            <div class="clear"></div>
          </ul>
          <div class="clear"></div>
          <div class="cards">
            <div class="tab-card">
              <ul>
                <li
                  v-for="(list, index) in productClassList"
                  v-if="selectParentId == list.parentId"
                  :class="secondClass == list.id ? 'active' : ''"
                  v-on:click="changeClassId(list.id, '2')"
                >
                  <p>{{ list.name }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
          <div class="cards" v-if="secondClass">
            <div class="tab-card">
              <ul>
                <li
                  v-for="(list, index) in productClassList"
                  v-if="secondClass == list.parentId"
                  :class="classId == list.id ? 'active' : ''"
                  v-on:click="changeClassId(list.id)"
                >
                  <p>{{ list.name }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="clear"></div>
        <div
          class="centerCon"
          v-if="classId == 39 || classId == 28 || classId == 47"
        >
          <div class="cards">
            <div class="tab-card">
              <ul>
                <li
                  v-for="(list, index) in resourceCategoryList"
                  v-if="
                    (classId == 39 && list.parentId == 1) ||
                      (classId == 28 && list.parentId == 2) ||
                      (classId == 47 && list.parentId == 481)
                  "
                  :class="selectZyClass == list.id ? 'active' : ''"
                  v-on:click="changeZyClassId(list.id, '1', list.name)"
                >
                  <p>{{ list.name }}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
          <div class="cards" v-if="secondClass">
            <div class="tab-card">
              <ul>
                <li
                  v-for="(list, index) in resourceCategoryList"
                  v-if="selectZyClass && selectZyClass == list.parentId"
                  :class="zyTwoclassId === list.id ? 'active' : ''"
                  v-on:click="changeZyClassId(list.id, '2', list.name)"
                >
                  <p>{{ list.name }}</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="centerCon"
          style="width:1150px;margin-top: 10px;padding: 0 10px;background-color:#FFFFFF;"
          v-if="classId == 39"
        >
          <div class="cards">
            <div class="tab-card">
              <ul>
                <li>交易金额：</li>
                <li
                  :class="!minPrice && !maxPrice ? 'selectPrice' : ''"
                  v-on:click="selectPriceBtn('', '')"
                >
                  全部
                </li>
                <li
                  :class="
                    minPrice == 0 && maxPrice == 5000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('0', '5000')"
                >
                  0.5万以下
                </li>
                <li
                  :class="
                    minPrice == 5000 && maxPrice == 10000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('5000', '10000')"
                >
                  0.5-1万
                </li>
                <li
                  :class="
                    minPrice == 10000 && maxPrice == 20000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('10000', '20000')"
                >
                  1-2万
                </li>
                <li
                  :class="
                    minPrice == 20000 && maxPrice == 30000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('20000', '30000')"
                >
                  2-3万
                </li>
                <li
                  :class="
                    minPrice == 30000 && maxPrice == 50000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('30000', '50000')"
                >
                  3-5万
                </li>
                <li
                  :class="
                    minPrice == 50000 && maxPrice == 100000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('50000', '100000')"
                >
                  5-10万
                </li>
                <li
                  :class="minPrice == 100000 && !maxPrice ? 'selectPrice' : ''"
                  v-on:click="selectPriceBtn('100000', '')"
                >
                  10万以上
                </li>
                <li>
                  <input
                    v-model="minPrice"
                    style="width:100px;"
                    type="number"
                  />
                  -
                  <input
                    v-model="maxPrice"
                    style="width:100px;"
                    type="number"
                  />
                </li>
                <li>
                  <button @click="subPriceBtn">查询</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div
          class="centerCon"
          style="width:1150px;margin-top: 10px;padding: 0 10px;background-color:#FFFFFF;"
          v-if="classId == 28"
        >
          <div class="cards">
            <div class="tab-card">
              <ul>
                <li>交易金额：</li>
                <li
                  :class="!minPrice && !maxPrice ? 'selectPrice' : ''"
                  v-on:click="selectPriceBtn('', '')"
                >
                  全部
                </li>
                <li
                  :class="
                    minPrice == 0 && maxPrice == 5000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('0', '5000')"
                >
                  0.5万以下
                </li>
                <li
                  :class="
                    minPrice == 5000 && maxPrice == 30000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('5000', '30000')"
                >
                  0.5-3万
                </li>
                <li
                  :class="
                    minPrice == 30000 && maxPrice == 50000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('30000', '50000')"
                >
                  3-5万
                </li>
                <li
                  :class="
                    minPrice == 50000 && maxPrice == 100000 ? 'selectPrice' : ''
                  "
                  v-on:click="selectPriceBtn('50000', '100000')"
                >
                  5-10万
                </li>
                <li
                  :class="
                    minPrice == 100000 && maxPrice == 200000
                      ? 'selectPrice'
                      : ''
                  "
                  v-on:click="selectPriceBtn('100000', '200000')"
                >
                  10-20万
                </li>
                <li
                  :class="minPrice == 200000 && !maxPrice ? 'selectPrice' : ''"
                  v-on:click="selectPriceBtn('200000', '')"
                >
                  20万以上
                </li>
                <li>
                  <input
                    v-model="minPrice"
                    style="width:100px;"
                    type="number"
                  />
                  -
                  <input
                    v-model="maxPrice"
                    style="width:100px;"
                    type="number"
                  />
                </li>
                <li>
                  <button @click="subPriceBtn">查询</button>
                </li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="clear"></div>
        <div class="bottomCon">
          <div class="botLeft">
            <ul>
              <li
                v-for="item in prductDataList"
                v-on:click="goGoodsDetail(item.id)"
              >
                <div class="shopImg">
                  <img :src="$store.state.baseImgUrl + item.defalutImage" />
                </div>
                <div class="shopInfo">
                  <p class="price">
                    ￥<span>{{
                      item.price == 0 ? "价格面议" : item.price
                    }}</span>
                  </p>
                  <p class="shopName">{{ item.title }}</p>
                  <p class="companyName">{{ item.shopName }}</p>
                  <p class="address">
                    <i class="el-icon-location-outline"></i
                    ><span>{{ item.area }}</span>
                  </p>
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
          <div class="botRight">
            <div class="titleBox">
              <p>
                <span class="topx">精品</span><span class="black">服务</span>
              </p>
              <p class="tuiguang">推广</p>
            </div>
            <div class="clear"></div>
            <ul>
              <p v-if="serviceList.length < 1">暂无推荐</p>
              <li v-for="item in serviceList">
                <img
                  :src="$store.state.baseImgUrl + item.images"
                  v-on:click="goGoodsDetail(item.objectId)"
                />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import Services from '../store/services'
export default {
  async asyncData () {
    let [data, resourceCategory] = await Promise.all([
      Services.listForServer(),
      Services.getResourceCategoryList()
    ])
    return {
      productClassList: data.data.result.productClassList,
      resourceCategoryList: resourceCategory.data.result.resourceCategoryList
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '服务商城')
  },
  data () {
    return {
      selectParentId: '',
      classId: '',
      prductDataList: [],
      serviceList: [],
      advertList: [],
      pageNo: 1,
      totalPage: 0,
      max: 12,
      secondClass: '',
      selectZyClass: '',
      zyTwoclassId: '',
      zyClassId: '',
      maxPrice: '',
      minPrice: ''
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
    //this.getAdvertList()
    this.getOneData()
    this.showProductInit()
    this.searchService()
  },
  methods: {
    //分页
    handlePageChange (val) {
      this.pageNo = val
      this.showProductInit({
        resourceCategoryId: Number(this.zyClassId),
        productClassId: Number(this.classId)
      })
      window.scrollTo(0, 610)
    },
    getAdvertList () {
      Services.advertList('1002').then(response => {
        if (response.data.code == 200) {
          console.log(response.data);
          this.$store.state.serviceMallBanner = response.data.result;
        }
      })
    },
    searchService () {
      let params = {
        posCode: "1008"
      }
      Services.searchRecommendList(params).then(response => {
        if (response.data.code == 200) {
          console.log(response.data);
          this.serviceList = response.data.recomments;
        }
      })
    },
    getOneData () {
      for (var i = 0; i < this.productClassList.length; i++) {
        if (this.productClassList[i].parentId == 0) {
          this.selectParentId = this.productClassList[i].id
          break
        }
      }
    },
    tabsSwitch (id) {
      if (this.selectParentId != id) {
        this.secondClass = ''
        this.selectParentId = id
        this.changeClassId(id)
      }
    },
    changeClassId (val, tow) {
      if (this.classId != val) {
        if (tow) {
          this.secondClass = val
        }
        this.classId = val
        this.pageNo = 1
        this.minPrice = ''
        this.maxPrice = ''
        this.showProductInit({ productClassId: Number(this.classId) })
      }
    },
    changeZyClassId (val, tow, name) {
      if (this.zyClassId != val) {
        if (tow == 1) {
          this.selectZyClass = val
        }
        if (tow == 2) {
          this.zyTwoclassId = val
        }
        this.zyClassId = val
        this.pageNo = 1
        this.minPrice = ''
        this.maxPrice = ''
        this.showProductInit({
          resourceCategoryId: Number(this.zyClassId)
        })
      }
    },
    showProductInit (param) {
      if (!!param) {
        var params = param
        params.max = this.max
        params.pageNo = this.pageNo
        params.order = "desc"
      } else {
        var params = {
          max: this.max,
          pageNo: this.pageNo,
          order: "desc"
        }
      }
      Services.searchProductForServer(params).then(response => {
        if (response.data.code == 200) {
          this.prductDataList = response.data.result.productList;
          this.totalPage = Number(response.data.result.pageable.total);
        }
      })
    },
    goGoodsDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/productDetail?id=' + id
    },
    goLink (url) {
      var tempwindow = window.open();
      tempwindow.location = url
    },
    selectPriceBtn (min, max) {
      this.minPrice = min
      this.maxPrice = max
      this.pageNo = 1
      this.showProductInit({
        resourceCategoryId: Number(this.zyClassId),
        productClassId: Number(this.classId)
      })
    },
    subPriceBtn () {
      this.pageNo = 1
      this.showProductInit({
        resourceCategoryId: Number(this.zyClassId),
        productClassId: Number(this.classId)
      })
    }
  }
}
</script>

<style scoped>
/**{
	margin: 0;
	padding: 0;
}*/
.clear {
  clear: both;
}
.content {
  background-color: #eeeeee;
  min-height: 1000px;
  padding-bottom: 30px;
}
.content .main {
  width: 1170px;
  margin: 0 auto;
}
.content .broadcast {
  margin-top: -1px;
}
.top {
  width: 1170px;
  margin: 0 auto;
  zoom: 1;
  overflow: hidden;
}
.swipercontent {
  width: 1170px;
  margin: 0 auto;
}
.swipercontent img {
  width: 100%;
}
.centerCon {
  width: 100%;
  height: auto;
  zoom: 1;
  overflow: hidden;
  background-color: #ffffff;
  font-size: 14px;
}
.tabs {
  border-bottom: 1px solid #26a9e1;
}
.tabs li {
  float: left;
  list-style: none;
  color: #333333;
}
.tabs .tab-link {
  display: block;
  padding: 15px 15px;
  text-decoration: none;
  font-weight: bold;
  cursor: pointer;
}

.tabs .tab-link.active {
  border-bottom: 1px solid #ffffff;
  color: #26a9e1;
}
.cards {
  float: left;
  width: 100%;
  height: 100%;
}

.cards .tab-card {
  height: auto;
  overflow: hidden;
  border-bottom: 1px solid #efefef;
}
.cards .tab-card ul {
  width: 100%;
  height: auto;
}
.cards .tab-card ul li {
  float: left;
  padding: 10px 10px;
  cursor: pointer;
}
.cards .tab-card ul li p {
  padding: 5px 10px;
  border-radius: 15px;
}
.cards .tab-card ul li.active p {
  color: #ffffff;
  background-color: #26a9e1;
}

.bottomCon {
  width: 100%;
  height: auto;
  zoom: 1;
  overflow: hidden;
  margin-top: 15px;
}
.botLeft ul,
.botRight ul {
  margin: 0;
  padding: 0;
  display: block;
}
.botLeft .noGoods {
  margin: 20px auto;
  color: #676767;
  font-size: 14px;
  width: 100%;
  text-align: center;
}
.botLeft {
  width: 930px;
  height: auto;
  zoom: 1;
  overflow: hidden;
  display: block;
  float: left;
}
.botLeft ul li {
  float: left;
  width: 222px;
  height: 365px;
  margin: 9px 10px 0 0;
  background-color: #ffffff;
  cursor: pointer;
  position: relative;
}
.botLeft ul li:hover {
  -moz-box-shadow: 0px 5px 13px #bdbdbd;
  -webkit-box-shadow: 0px 5px 13px #bdbdbd;
  box-shadow: 0px 5px 13px #bdbdbd;
}
.botLeft ul li .shopImg {
  width: 220px;
  height: 220px;
  display: block;
  margin: 0 0 10px 0;
  background-color: #efefef;
  border: none;
  overflow: hidden;
}
.botLeft ul li .shopImg img {
  width: 220px;
  height: 220px;
  display: block;
  margin: 0 auto;
  border: none;
}
.shopInfo {
  padding: 0 0 0 10px;
}
.price {
  color: #fb400d;
  font-size: 18px;
}
.shopName {
  color: #2f2f2f;
  font-size: 15px;
  line-height: 40px;
}
.companyName {
  color: #676767;
  font-size: 14px;
  line-height: 20px;
}
.address {
  color: #a1a1a1;
  font-size: 14px;
  position: absolute;
  bottom: 5px;
  left: 10px;
}
.el-icon-location-outline {
  color: #42b7fa;
  margin: 5px 5px 5px 0;
}

.botRight {
  width: 240px;
  height: auto;
  display: block;
  float: left;
  margin-top: 9px;
  background-color: #ffffff;
}
.botRight ul li {
  width: 220px;
  margin: 10px auto;
  cursor: pointer;
}
.botRight ul li img {
  width: 100%;
  display: block;
  border-radius: 10px;
}
.botRight ul li:last-child img {
  margin-top: 10px;
}
.titleBox {
  width: 100%;
  height: 30px;
  line-height: 30px;
  /*zoom: 1;
	overflow: hidden;*/
  border-bottom: 2px solid #efefef;
  margin: 12px 5px;
  /*padding: 3px;*/
}
.topx {
  color: #26a9e1;
  font-weight: bold;
  display: block;
  float: left;
  border-bottom: 2px solid #26a9e1;
  height: 30px;
  line-height: 30px;
  /*padding: 3px;*/
}
.black {
  color: #000000;
  display: block;
  float: left;
  font-weight: bold;
  border-bottom: 2px solid #26a9e1;
  height: 30px;
  line-height: 30px;
  /*padding: 3px;*/
}
.tuiguang {
  display: block;
  float: right;
  height: 20px;
  line-height: 20px;
  background-color: #efefef;
  border: 1px solid #e5e5e5;
  border-radius: 20px;
  color: #a1a1a1;
  font-size: 14px;
  padding: 1px 10px;
  margin: 3px 11px 0 0;
}
/*分页*/
.table-pagination {
  margin: 50px 0 0;
  text-align: center;
}
.selectPrice {
  color: #26a9e1;
}
</style>
