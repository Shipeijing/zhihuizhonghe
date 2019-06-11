<template>
  <div
    class="main"
    id="mainShop"
  >
    <div class="mainShopTop">
      <div class="shopTop">
        <div class="logo">
          <img
            v-if="shopInfo.shopLogo"
            :src="$store.state.baseImgUrl+shopInfo.shopLogo"
          />
        </div>
        <div class="shopInfo">
          <div class="shopName">
            {{shopInfo.shopName}}
          </div>
          <div class="tel">TEL:{{shopInfo.shopTelephone}} {{shopInfo.contact}}</div>
          <div class="trade">
            <span>地址：</span>
            <span>{{shopInfo.shopAddress}}</span>
          </div>
        </div>
      </div>
      <div class="slider">
        <img :src="$store.state.baseImgUrl+shopInfo.shopBanner" />
      </div>
      <div class="rightTopBox">
        <div class="title_t">在线预约<span v-if="showTip">{{tipStr}}</span></div>
        <p><input
            v-model="subForm.name"
            placeholder="姓名"
          /></p>
        <p><input
            v-model="subForm.tel"
            placeholder="手机号"
          /></p>
        <el-cascader
          size="small"
          :options="options"
          v-model="subForm.cityCode"
          placeholder="所在区域"
        ></el-cascader>
        <p><input
            v-model="subForm.projectName"
            placeholder="项目名称"
          /></p>
        <p><input
            v-model="subForm.companyName"
            placeholder="公司名称"
          /></p>
        <p
          class="btn"
          v-on:click="onlineBooking()"
        >立即咨询</p>
      </div>
      <div class="clear"></div>
    </div>
    <div
      v-if="prductDataList.length>0"
      class="shopProduct"
      id="shopProduct"
    >
      <div class="title">产品展示</div>
      <div class="imgList">
        <div
          class="prductList"
          v-for="item in prductDataList"
          @click="productDetail(item.id)"
        >
          <div class="productImg">
            <img :src="$store.state.baseImgUrl+item.defalutImage" />
          </div>
          <div class="productInfo">
            <div class="proTitle">{{item.title}}</div>
            <span class="proPrice">￥{{item.price == 0 ? '价格面议' : item.price}}</span>
            <img
              class="car"
              src="~/static/img/gwc.png"
            />
            <img
              class="proShou"
              src="~/static/img/sc.png"
            />
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
    </div>
    <div class="clear"></div>
    <div
      v-if="shopHonorsList.length>0"
      class="shopHonors"
    >
      <div class="title">荣誉资质</div>
      <div
        v-for="i in shopHonorsList"
        class="imgItem"
      >
        <img :src="$store.state.baseImgUrl+i.imgUrl">
        <p>{{i.name}}</p>
      </div>
    </div>
    <div class="shopIntor">
      <div class="title">关于我们</div>
      <div class="box">
        <div class="left">
          <img :src="$store.state.baseImgUrl+shopInfo.shopLogo" />
        </div>
        <div class="right">
          简介：{{shopInfo.shopIntro}}
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="up">
      <a v-on:click="backTop()">TOP</a>
    </div>
  </div>

</template>

<script>
import axios from 'axios'
import Services from '../store/services'
export default {
  async asyncData ({ route }) {
    let [shopInfo] = await Promise.all([
      Services.showShop(route.query.id)
    ])
    return {
      shopInfo: shopInfo.data.result.shop
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '店铺详情')
  },
  head () {
    return {
      title: this.shopInfo.shopName + '-智慧众合',
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.shopInfo.shopName },
        { hid: 'description', name: 'description', content: this.shopInfo.shopName + '是智慧众合网下合作会员单位,' + this.shopInfo.shopIntro }
      ]
    }
  },
  data () {
    return {
      //	  		skin: 1,//1蓝色 2绿色
      shopId: '',
      shopInfo: {},
      prductDataList: [],
      productImg: '',
      //分页
      pageNo: 1,
      totalPage: 999,
      max: 12,
      productDetailId: '',
      subForm: {
        name: '',
        tel: '',
        cityCode: [],
        projectName: '',
        companyName: ''
      },
      options: [],
      showTip: false,
      tipStr: '',
      shopHonorsList: []
    }
  },
  mounted () {
    this.shopId = this.$route.query.id
    //	  	console.log(this.shopId)
    this.showShopInit(this.shopId);
    this.showProductInit({
      pageNo: this.pageNo,
      max: this.max
    });
    let self = this
    if (localStorage.getItem('cityCedeList')) {
      self.options = JSON.parse(localStorage.getItem('cityCedeList'))
    } else {
      Services.getCityList().then(response => {
        if (response.data.code == 200) {
          response.data.result.city.forEach(function (item) {
            if (item.level == 0) {
              var obj = { value: item.code, label: item.name, id: item.id }
              self.options.push(obj)
            } else if (item.level == 1) {
              self.options.forEach(function (a) {
                if (item.parentId == a.id) {
                  var o = { value: item.code, label: item.name, id: item.id }
                  if (a.children) {
                    a.children.push(o)
                  } else {
                    a.children = [{ value: item.code, label: item.name, id: item.id }]
                  }
                }
              })
            }
          })
          localStorage.setItem('cityCedeList', JSON.stringify(self.options))
        }
      })
    }
  },
  actived () {
    this.initIndexJs()//dom加载完成后引用轮播js
  },
  methods: {
    backTop () {
      window.scrollTo(0, 0)
    },
    initIndexJs () {
      //轮播图
      var swiper = new Swiper('.swiper-container', {
        pagination: {
          el: '.swiper-pagination',
        },
      });
    },
    //店铺展示
    showShopInit (id) {
      Services.showShop(id).then(response => {
        if (response.data.code == 200) {
          this.shopInfo = response.data.result.shop;
          this.shopHonorsList = response.data.result.shopHonors
          //                	console.log(this.shopInfo);
        } else {
          this.shopInfo = ''
          this.$message.error(response.data.message)
          this.$router.go(-1)
        }
      })
    },
    //产品展示
    showProductInit (param) {
      let params = param
      //	    	console.log(params);
      params.shopId = Number(this.shopId)
      Services.showProduct(params).then(response => {
        if (response.data.code == 200) {
          this.prductDataList = response.data.result.productList;
          this.totalPage = Number(response.data.result.pageable.total);
          //                	console.log(this.totalPage)
        }
      })
    },
    //分页
    handlePageChange (val) {
      this.pageNo = val
      this.showProductInit({
        pageNo: this.pageNo,
        max: this.max
      })
    },
    //查看详情
    productDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/productDetail?id=' + id
    },
    onlineBooking () {
      let params = copyObj(this.subForm)
      if (!params.name) {
        this.showTip = true
        this.tipStr = '请输入姓名'
        return false
      }
      if (!params.tel) {
        this.showTip = true
        this.tipStr = '请输入联系电话'
        return false
      }
      if (params.cityCode.length < 1) {
        this.showTip = true
        this.tipStr = '请选择服务区域'
        return false
      }
      if (!params.projectName) {
        this.showTip = true
        this.tipStr = '请输入项目名称'
        return false
      }
      if (!params.companyName) {
        this.showTip = true
        this.tipStr = '请输入公司名称'
        return false
      }
      this.showTip = false
      this.tipStr = ''
      params.cityCode = params.cityCode[0].substr(0, 2) + params.cityCode[1].substr(2, 2) + '00'
      console.log(params)
      Services.onlineBooking(params).then(response => {
        if (response.data.code == 200) {
          this.$message.success('提交成功')
          this.subForm = {
            name: '',
            tel: '',
            cityCode: [],
            projectName: '',
            companyName: ''
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.mainShopTop {
  width: 1170px;
  margin: 15px auto 0;
}
.shopTop {
  width: 250px;
  height: auto;
  padding: 10px 0;
  margin: 0 auto;
  float: left;
  text-align: center;
  background-color: #f1f1f1;
  height: 330px;
}
.logo {
  width: 200px;
  height: 150px;
  display: table-cell;
  vertical-align: middle;
  text-align: center;
  padding: 0 25px;
}
.logo img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 5px;
}
.shopInfo {
  height: auto;
  display: block;
  position: relative;
  padding: 10px 0;
}
.shopInfo div span {
  color: #454545;
  font-size: 12px;
  display: block;
  float: left;
}
.shopName {
  color: #353535;
  font-size: 14px;
  padding: 0 15px;
  text-align: left;
}
.tel {
  width: 100%;
  margin-top: 15px;
  /* background-color: #FFFFFF; */
  font-size: 14px;
  color: #353535;
  line-height: 40px;
  text-align: left;
  padding: 0 15px;
}
.trade {
  font-size: 14px;
  padding: 10px;
}
.trade span:first-child {
  display: block;
  float: left;
  width: 50px;
  font-size: 14px;
}
.trade span:last-child {
  display: block;
  float: left;
  width: 180px;
  text-align: left;
  font-size: 14px;
}
/*轮播图*/
.slider {
  width: 670px;
  height: 350px;
  float: left;
}
.slider img {
  width: 100%;
  height: 100%;
}
.rightTopBox {
  float: left;
  border: 1px solid #f1f1f1;
  width: 228px;
  height: 328px;
  padding: 10px;
  background-color: rgba(241, 241, 241, 0.3);
}
.rightTopBox .title_t {
  font-size: 14px;
  font-weight: bold;
  color: #3d3d3d;
}
.rightTopBox .title_t span {
  font-size: 12px;
  font-weight: normal;
  color: #f00;
  display: inline-block;
  margin-left: 10px;
}
.rightTopBox p {
  font-size: 12px;
  width: 100%;
  margin-top: 15px;
  color: #3d3d3d;
}
.rightTopBox .el-cascader--small {
  font-size: 12px;
  width: 100%;
  margin-top: 15px;
  color: #3d3d3d;
}
.rightTopBox ::-webkit-input-placeholder {
  /* WebKit browsers */
  color: #999;
}
.rightTopBox :-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #999;
}
.rightTopBox ::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #999;
}
.rightTopBox :-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: #999;
}
.rightTopBox p input {
  width: 196px;
  padding: 0 15px;
  display: inline-block;
  line-height: 30px;
  border: 1px solid #dddddd;
  border-radius: 3px;
}
.rightTopBox .btn {
  text-align: center;
  background-color: #26a9e1;
  color: #efefef;
  line-height: 35px;
  font-size: 16px;
  margin-top: 30px;
  cursor: pointer;
}
/*产品介绍*/
.title {
  width: 1170px;
  margin: 0 auto;
  text-align: center;
  line-height: 80px;
  letter-spacing: 3px;
  color: #333333;
  font-weight: bold;
  font-size: 20px;
  text-shadow: 5px 2px 6px rgba(0, 0, 0, 0.2);
}
.shopProduct {
  width: 1170px;
  margin: 0 auto;
}
.prductList {
  display: block;
  float: left;
  width: 23%;
  height: 330px;
  background-color: #ffffff;
  box-shadow: 0px 0px 4px 2px #f1f1f1;
  text-align: center;
  padding: 20px 0;
  margin: 0 1% 50px;
  cursor: pointer;
  position: relative;
}
.prductList .productImg {
  width: 230px;
  height: 230px;
  margin: 0 auto;
}
.prductList .productImg img {
  width: 100%;
  height: 100%;
}
.proTitle {
  position: absolute;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  bottom: 60px;
  color: #3d3d3d;
  font-size: 14px;
}
.proPrice {
  position: absolute;
  bottom: 20px;
  margin-left: 30px;
  color: #ff7e23;
  text-align: left;
  display: block;
  float: left;
}
.car {
  position: absolute;
  right: 60px;
  bottom: 20px;
  width: 20px;
  height: 20px;
  display: block;
  float: left;
}
.proShou {
  position: absolute;
  right: 30px;
  bottom: 20px;
  width: 20px;
  height: 20px;
  display: block;
  float: left;
}
/*分页*/
.table-pagination {
  margin: 30px 0 15px;
  text-align: center;
}
.shopHonors {
  width: 1170px;
  margin: 0 auto;
}
.shopHonors .imgItem {
  width: 270px;
  margin: 0 10px 20px;
  display: inline-block;
}
.shopHonors .imgItem img {
  width: 270px;
  height: 180px;
}
.shopHonors .imgItem p {
  font-size: 14px;
  color: #4a4947;
  text-align: center;
  margin-top: 10px;
  font-weight: bold;
}
/*联系我们*/
.shopIntor {
  width: 1170px;
  margin: 0 auto;
}
.shopIntor .box {
  background-color: #f1f1f1;
  margin-bottom: 15px;
}
.shopIntor .box .left {
  display: inline-block;
  width: 170px;
  text-align: center;
}
.shopIntor .box .left img {
  max-width: 100px;
  max-height: 100px;
  margin: 30px 0;
  padding: 0 30px;
  border-right: 2px solid #ffffff;
}
.shopIntor .box .right {
  display: inline-block;
  font-size: 14px;
  padding: 30px;
  width: 940px;
  vertical-align: top;
}
.up {
  padding: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: #ffffff;
  border-radius: 5px;
  position: fixed;
  bottom: 50px;
  right: 50px;
  z-index: 999;
  cursor: pointer;
}
</style>