<template>
  <div class="serchDownMain">
    <div class="tradingMall-d1">
      <img src="~/static/img/sousuo.png" @click="showProductInit()" alt="" />
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
    <div class="shopProduct" id="shopProduct">
      <p class="noGoods" v-if="totalPage == 0">暂无相关服务</p>
      <div class="imgList">
        <div
          class="prductList"
          v-for="item in prductDataList"
          @click="goGoodsDetail(item.id, item.shopId)"
        >
          <div class="productImg">
            <img :src="$store.state.baseImgUrl + item.defalutImage" />
          </div>
          <div class="productInfo">
            <div class="proPrice">
              ￥{{ item.price == 0 ? "价格面议" : item.price }}
            </div>
            <div class="proTitle">{{ item.title }}</div>
            <div class="shopName">{{ item.shopName }}</div>
          </div>
        </div>
      </div>
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

    <div class="clear"></div>
  </div>
</template>

<script>
import axios from 'axios'
import Services from '../../store/services'
export default {
  beforeCreate () {
    this.$store.dispatch('setNavName', '搜索结果')
  },
  head () {
    return {
      title: '智慧众合-' + '搜索结果'
    }
  },
  data () {
    return {
      daleibie: ['查专利', '查商标', '查域名', '查版权'],
      dalei: '查专利',
      searchInfo: {},
      prductDataList: [],
      //分页
      pageNo: 1,
      totalPage: 0,
      max: 25,
      active: 1,
      shopsDataList: [],
      newsDataList: [],
      keyName: null,
      rightListd2input1: 'inputcolorbai',
    }
  },
  watch: {
    $route () {
      this.searchInfo = this.$route.query
    },
  },
  mounted () {
    this.searchInfo = this.$route.query
    this.dalei = this.$route.query.key
    this.keyName = this.$route.query.keyString
    this.showProductInit()
  },
  methods: {
    changeTab (val) {
      if (this.active != val) {
        this.active = val
        this.pageNo = 1
        this.totalPage = 0
        this.isSearch()
      }
    },
    //产品展示
    showProductInit () {
      let lei = null
      if (this.dalei == '查专利') { lei = 28 }
      else if (this.dalei == '查商标') { lei = 39 }
      else if (this.dalei == '查域名') { lei = 47 }
      else if (this.dalei == '查版权') { lei = 45 }
      var params = {
        max: this.max,
        pageNo: this.pageNo,
        keyString: this.keyName,
        productClassId: Number(lei)
      }
      Services.showProduct(params).then(response => {
        if (response.data.code == 200) {
          this.prductDataList = response.data.result.productList;
          this.totalPage = Number(response.data.result.pageable.total);
        }
      })
    },
    //分页
    handlePageChange (val) {
      this.pageNo = val
      this.isSearch()
      window.scrollTo(0, 0)
    },
    //查看商品详情
    goGoodsDetail (id, shopId) {
      var tempwindow = window.open();
      tempwindow.location = '/TradingMall/commodityDetails?id=' + id + '&shopId=' + shopId
    },
    changebg (n) {
      this.dalei = n
      this.showProductInit()
    },
    changeColor () {
      if (this.keyName == null || this.keyName == '') {
        this.rightListd2input1 = 'inputcolorbai'
      } else {
        this.rightListd2input1 = 'inputcolorhui'
      }
    },
  }
}
</script>

<style scoped lang="scss">
/*产品介绍*/
.serchDownMain {
  /* 第一块 */
  .tradingMall-d1 {
    width: 1130px;
    margin: 0px auto;
    position: relative;
    padding: 20px;
    .active1 {
      border-bottom: 2px solid #ffffff;
    }
    img:last-child {
      width: 100%;
      height: 110px;
      position: absolute;
      top: 0px;
      left: 0px;
      z-index: -50;
    }
    img:first-child {
      width: 17px;
      position: absolute;
      top: 59px;
      left: 94.5%;
      cursor: pointer;
    }
    ul li {
      float: left;
      color: #ffffff;
      font-size: 12px;
      margin: 0px 20px 10px 0px;
      padding-bottom: 5px;
      cursor: pointer;
    }
    .inputcolorhui {
      color: black;
    }
    .inputcolorbai {
      color: #d3d3d3;
    }
    input {
      border: 0px;
      background-color: #ffffff;
      width: 96%;
      padding: 8px 2%;
      margin: 0px auto;
      display: block;
    }
  }

  .shopInfo {
    text-align: left;
    .text {
      margin-top: 5px;
      height: 40px;
      line-height: 20px;
      overflow: hidden;
      position: relative;
    }
    .text::after {
      content: "...";
      color: #666666;
      font-weight: bold;
      position: absolute;
      bottom: 0;
      right: 0;
      padding: 0 10px 1px 45px;
      background: url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png)
        repeat-y;
    }
    h5 {
      text-align: center;
      font-size: 14px;
    }
    i {
      color: #ff7300;
      margin-left: 5px;
      display: block;
      width: 20px;
      float: left;
    }
    span {
      width: 190px;
      float: left;
      font-size: 14px;
      color: #757575;
      overflow: hidden;
      -webkit-line-clamp: 2;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
  }
  .newsleftLi {
    margin: 15px;
    padding: 10px;
    height: 152px;
    position: relative;
    margin-bottom: 10px;
    .leftimg {
      display: block;
      float: left;
      width: 228px;
      height: 152px;
      margin-right: 15px;
    }
    h1 {
      font-size: 18px;
      color: #2f2f2f;
    }
    p {
      font-size: 12px;
      color: #959595;
      margin-top: 10px;
      line-height: 22px;
      overflow: hidden;
      -webkit-line-clamp: 3;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
    }
    a {
      float: left;
      display: block;
      width: 78px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      color: #ff7301;
      font-size: 12px;
      border: 1px solid #ff7301;
      border-radius: 18px;
      position: absolute;
      left: 253px;
      bottom: 10px;
      cursor: pointer;
    }
    ol {
      float: right;
      position: absolute;
      right: 10px;
      bottom: 10px;
      li {
        float: left;
        margin-left: 25px;
        img {
          display: block;
          float: left;
        }
        p {
          margin: 0;
          float: left;
          padding-left: 10px;
        }
      }
      .ly {
        width: 13px;
        height: 13px;
        margin-top: 5px;
      }
      .ll {
        width: 19px;
        height: 11px;
        margin-top: 5px;
      }
      .sj {
        width: 13px;
        height: 13px;
        margin-top: 4px;
      }
    }
  }
  .newsleftLi:hover {
    background-color: #f9f9f9;
  }
  .noGoods {
    line-height: 80px;
    text-align: center;
    color: #666666;
    font-size: 18px;
  }
  .shopProduct {
    width: 1170px;
    margin: 30px auto;
  }
  .prductList {
    display: block;
    float: left;
    width: 18.4%;
    height: 310px;
    background-color: #ffffff;
    text-align: center;
    padding: 10px 0;
    margin-bottom: 50px;
    margin-right: 2%;
    cursor: pointer;
    position: relative;
    box-shadow: 0px 0px 1px 1px #f1f1f1;
  }
  .prductList:nth-child(5n + 5) {
    margin-right: 0;
  }
  .prductList:hover {
    -moz-box-shadow: 0px 0px 4px 2px #bdbdbd;
    -webkit-box-shadow: 0px 0px 4px 2px #bdbdbd;
    box-shadow: 0px 0px 4px 2px #bdbdbd;
  }
  .prductList .productImg {
    width: 200px;
    height: 200px;
    margin: 0 auto;
  }
  .prductList .productImg img {
    display: inline-block;
    vertical-align: middle;
    width: 100%;
    height: 100%;
  }
  .proTitle {
    position: absolute;
    width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    margin-left: 20px;
    bottom: 45px;
    color: #000000;
    font-size: 14px;
  }
  .proPrice {
    width: 100%;
    position: absolute;
    bottom: 70px;
    color: #ff7e23;
    text-align: left;
    margin-left: 20px;
    font-size: 16px;
    font-weight: bold;
  }
  .shopName {
    width: 100%;
    position: absolute;
    bottom: 20px;
    color: #3d3d3d;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    margin-left: 20px;
    font-size: 12px;
  }
  /*分页*/
  .table-pagination {
    margin: 15px 0;
    text-align: center;
  }
}
</style>