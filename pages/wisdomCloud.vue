<template>
  <div class="contentW">
    <div class="main">
      <div class="Wleft">
        <ul>
          <li @mouseover="leftImg = 1" @mouseout="leftImg = 0" @click="open()">
            <img src="~/static/wimg/111.png" v-if="leftImg != 1" alt="" /><img
              src="~/static/wimg/1111.png"
              v-else
              alt=""
            />我要托管
          </li>
          <li
            @click="openAll(1)"
            @mouseover="leftImg = 2"
            @mouseout="leftImg = 0"
          >
            <img src="~/static/wimg/222.png" v-if="leftImg != 2" alt="" /><img
              src="~/static/wimg/2222.png"
              v-else
              alt=""
            />待支付托管
          </li>
          <li
            @click="openAll(2)"
            @mouseover="leftImg = 3"
            @mouseout="leftImg = 0"
          >
            <img src="~/static/wimg/333.png" v-if="leftImg != 3" alt="" /><img
              src="~/static/wimg/3333.png"
              v-else
              alt=""
            />已托管
          </li>
          <li
            @click="openAll(3)"
            @mouseover="leftImg = 4"
            @mouseout="leftImg = 0"
          >
            <img src="~/static/wimg/444.png" v-if="leftImg != 4" alt="" /><img
              src="~/static/wimg/4444.png"
              v-else
              alt=""
            />已过期托管
          </li>
          <li
            @click="openAll(4)"
            @mouseover="leftImg = 5"
            @mouseout="leftImg = 0"
          >
            <img src="~/static/wimg/555.png" v-if="leftImg != 5" alt="" /><img
              src="~/static/wimg/5555.png"
              v-else
              alt=""
            />如何托管
          </li>
          <li
            @click="openAll(5)"
            @mouseover="leftImg = 6"
            @mouseout="leftImg = 0"
          >
            <img src="~/static/wimg/666.png" v-if="leftImg != 6" alt="" /><img
              src="~/static/wimg/6666.png"
              v-else
              alt=""
            />托管费用
          </li>
        </ul>
      </div>
      <!--轮播图开始-->
      <div class="swipercontent">
        <el-carousel trigger="click" height="312px" :interval="8000">
          <el-carousel-item v-for="item in advertList1" :key="item.id">
            <img
              :src="$store.state.baseImgUrl + item.imageUrl"
              v-on:click="goLink(item.url)"
            />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!--轮播图结束-->
      <div class="clear"></div>
      <div class="search-d1">
        <ul @click="openHttp">
          <li><img src="~/static/wimg/cha1.png" alt="" />查专利</li>
          <li><img src="~/static/wimg/cha2.png" alt="" />查商标</li>
          <li><img src="~/static/wimg/cha3.png" alt="" />查域名</li>
          <li><img src="~/static/wimg/cha4.png" alt="" />查版权</li>
        </ul>
      </div>
      <div class="clear"></div>
      <div class="first-block">
        <div class="header">
          <div class="first-block-d1">
            <div><span style="color:#26a9e1;">YUN</span>管家</div>
          </div>
          <span
            :class="hostedType == 0 ? 'active' : ''"
            @mouseover="changehostedType(0)"
          >
            专利托管
          </span>
          <span
            :class="hostedType == 1 ? 'active' : ''"
            @mouseover="changehostedType(1)"
          >
            商标托管
          </span>
        </div>
        <div class="first-block-body">
          <ul v-for="(item, index) in dataList">
            <li>
              <img
                class="i1"
                :src="$store.state.baseImgUrl + item.image"
                alt=""
              />
            </li>
            <li class="li2 w-400">
              <span>{{ item.companyName }}</span>
            </li>
            <li class="li3 w-400">
              <img src="~/static/wimg/ren.png" alt="" /><span
                >主体人：{{ item.userName }}</span
              ><img
                v-show="item.hostedType == 0"
                src="~/static/wimg/shenqingren.png"
                alt=""
              /><span v-show="item.hostedType == 0"
                >申请人：{{ item.applicationUserName }}</span
              >
            </li>
            <li class="li4 w-400">
              <img src="~/static/wimg/renzheng.png" alt="" /><span class="w-90"
                >认证状态：已认证</span
              >
              <img src="~/static/wimg/lianxi.png" alt="" /><span
                style="margin-left:8px;"
                >联系电话：{{ item.moblePhone }}</span
              >
            </li>
            <li class="li5 w-400">
              <img src="~/static/wimg/dizhi.png" alt="" /><span class="w-100">{{
                item.companyAddress
              }}</span>
            </li>
            <li class="li6">
              <div><span style="color:#26a9e1;">托管</span>信息</div>
              <table class="ul-li-table">
                <tr>
                  <th>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</th>
                  <td>{{ item.patentName }}</td>
                  <th v-show="item.hostedType == 0">
                    编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：
                  </th>
                  <th v-show="item.hostedType == 1">
                    注&nbsp;册&nbsp;号：
                  </th>
                  <td>{{ item.patentCode }}</td>
                  <th v-show="item.hostedType == 0">授权时间：</th>
                  <td v-show="item.hostedType == 0">
                    {{ item.authorizationTime }}
                  </td>
                  <th v-show="item.hostedType == 1">注册日期：</th>
                  <td v-show="item.hostedType == 1">
                    {{ item.applicationTime }}
                  </td>
                </tr>
                <tr>
                  <th>托管类型：</th>
                  <td v-if="item.hostedType == 0">专利托管</td>
                  <td v-else>商标托管</td>
                  <th>托管方式：</th>
                  <td>{{ item.hostedPayType }}</td>
                  <th v-show="item.hostedType == 0">申请时间：</th>
                  <td v-show="item.hostedType == 0">
                    {{ item.applicationTime }}
                  </td>
                </tr>
                <tr>
                  <th v-show="item.hostedType == 0">
                    类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                  </th>
                  <td v-show="item.hostedType == 0">
                    {{ item.patentType }}
                  </td>
                  <th>托管时间：</th>
                  <td>{{ item.submitTime }}</td>
                  <th v-show="item.hostedType == 0">结束时间：</th>
                  <td v-show="item.hostedType == 0">
                    {{ item.hostedEndTime }}
                  </td>
                </tr>
              </table>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
      <div class="first-block">
        <div class="first-block-d1">
          <div><span style="color:#26a9e1;">YUN</span>服务</div>
        </div>
        <div class="shopContentfooter">
          <ul>
            <li>
              <img src="~/static/wimg/1.png" alt="" /><span>专利托管</span>
              <p>低成本 放心托管 解决后顾之忧</p>
              <div>
                专利托管<span>￥20/年</span>
                <p>专利顾问</p>
              </div>
            </li>
            <li>
              <img src="~/static/wimg/2.png" alt="" /><span>商标托管</span>
              <p>专业顾问 智能托管 保护专利成果</p>
              <div>
                商标托管<span>￥20/年</span>
                <p>商标专家</p>
              </div>
            </li>
            <li>
              <img src="~/static/wimg/4.png" alt="" /><span>免费查询</span>
              <p>精准查询 插你所想 提供各类接口</p>
              <div>
                免费查询<span>￥0元</span>
                <p>精准查询</p>
              </div>
            </li>
            <li>
              <img src="~/static/wimg/3.png" alt="" /><span>智能提醒</span>
              <p>细致服务 智能提醒 拥有独享企业管家</p>
              <div>
                放心管家<span>￥0元</span>
                <p>智能提醒</p>
              </div>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
      <div class="first-block">
        <div class="first-block-d1">
          <div><span style="color:#26a9e1;">托管</span>流程</div>
        </div>
        <div class="clear"></div>
        <div class="liucheng">
          <ul>
            <li>
              <img src="~/static/wimg/5.png" alt="" /><span>提交信息</span>
              <p>提交托管信息</p>
            </li>
            <li>
              <img src="~/static/wimg/6.png" alt="" /><span>添加项目</span>
              <p>添加专利或者商标</p>
            </li>
            <li>
              <img src="~/static/wimg/7.png" alt="" /><span>线上支付</span>
              <p>完成线上托管订单支付</p>
            </li>
            <li>
              <img src="~/static/wimg/8.png" alt="" /><span>对接资料</span>
              <p>双方交接具体资料和事宜</p>
            </li>
            <li>
              <img src="~/static/wimg/9.png" alt="" /><span>开启托管</span>
              <p>完成委托管理专利和商标</p>
            </li>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
      <div class="first-block">
        <div class="first-block-d1">
          <div><span style="color:#26a9e1;">YUN</span>合作企业</div>
        </div>
        <div class="clear"></div>
        <div class="hezuo">
          <ul>
            <li v-for="item in tuijiandianpu">
              <img :src="$store.state.baseImgUrl + item.images" alt="" />
            </li>
          </ul>
          <div class="clear"></div>
        </div>
      </div>
      <div class="mt"></div>
    </div>
  </div>
</template>
<script>
import Services from '../store/services'
export default {
  beforeCreate () {
    this.$store.dispatch('setNavName', '智慧云')
  },
  async asyncData () {
    let [getAdvertList1001] = await Promise.all([
      Services.advertList('1009'),
    ])
    return {
      advertList1: getAdvertList1001.data.result,
    }
  },
  data () {
    return {
      dataList: [],
      hostedType: 0,
      tuijiandianpu: [],
      leftImg: 0
    }
  },
  mounted () {
    this.getDataList()
    this.getDlist()
  },
  methods: {
    openHttp () {
      var tempwindow = window.open();
      tempwindow.location = 'http://cpquery.cnipa.gov.cn/'
    },
    getDlist () {
      Services.searchRecommendList({ posCode: "1014" }).then(response => {
        this.tuijiandianpu = response.data.recomments
      })
    },
    open () {
      var tempwindow = window.open();
      tempwindow.location = '/WisdomCloud/release'
    },
    openAll (i) {
      var tempwindow = window.open();
      tempwindow.location = '/WisdomCloud/WCAll?i=' + i
    },
    getDataList () {
      Services.listHostedProject(Number(this.hostedType)).then(response => {
        this.dataList = response.data.result
      })
    },
    changehostedType (d) {
      this.hostedType = d
      this.getDataList()
    }
  }
}
</script>
<style scoped>
.first-block-body > ul .li2 button {
  border: 0px;
  background: #fff6f6;
  color: #ffa32b;
  font-size: 12px;
}
.first-block > .header > span {
  display: inline-block;
  margin: 0px 15px;
  background: #ffffff;
  padding: 5px 0px;
  margin-top: -5px;
  cursor: pointer;
}
.active {
  color: #26a9e1;
  border-bottom: 2px solid #26a9e1;
}
.hezuo {
  margin-top: 20px;
  margin-bottom: 10px;
}
.hezuo img {
  width: 100px;
  height: 100px;
  display: block;
  margin: 25px auto;
}
.hezuo ul li {
  float: left;
  margin: 0px 38px;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  box-shadow: 0px 0px 10px #b5b5b5;
}
.liucheng ul li span {
  display: inline-block;
  width: 100px;
  text-align: left;
  margin-left: 10px;
  display: inline-block;
  float: left;
  margin-top: 1px;
  color: #2f2f2f;
  font-size: 14px;
}
.liucheng ul li p {
  display: inline-block;
  width: 135px;
  text-align: left;
  margin-left: 10px;
  display: inline-block;
  float: left;
}
.liucheng ul li {
  float: left;
  width: 200px;
  text-align: center;
  font-size: 12px;
  color: #666666;
  margin: 0px 13px;
}
.liucheng ul {
  width: 100%;
}
.liucheng {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.liucheng img {
  width: 40px;
  height: 40px;
  float: left;
}
.shopContentfooter {
  padding: 30px 30px 10px 30px;
  height: auto;
}
.shopContentfooter ul li {
  float: left;
  width: 225px;
  text-align: center;
  font-size: 12px;
  color: #666666;
  margin: 0px 20px;
}
.shopContentfooter ul li > span {
  display: block;
  font-weight: 600;
  font-size: 14px;
  padding: 5px;
  color: #2f2f2f;
}
.shopContentfooter ul li > p {
  width: 100px;
  margin: 0 auto;
}
.shopContentfooter ul li > div {
  width: 90%;
  color: #2f2f2f;
  font-size: 14px;
  font-weight: 600;
  background: #fafafa;
  padding: 5%;
  text-align: left;
  margin-top: 20px;
}
.shopContentfooter ul li > div > span {
  color: #ffa32b;
  float: right;
}
.shopContentfooter ul li > div > p {
  color: #666666;
  font-size: 12px;
  padding: 5px 0px;
}
.shopContentfooter img {
  width: 180px;
  height: 135px;
  display: block !important;
  margin: 5px auto !important;
}

.ul-li-table th {
  width: 60px;
}
.ul-li-table td {
  min-width: 90px;
  max-width: 110px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.ul-li-table {
  width: 520px;
  height: 90px;
  margin: 0px auto;
}
.first-block-body > ul .li6 div {
  margin-left: 22px;
  margin-top: 10px;
  color: #2f2f2f;
  font-size: 12px;
  font-weight: 600;
}
.first-block-body > ul .li6 {
  width: 100%;
  height: 120px;
  background: #f5f5f5;
}
.first-block-body > ul .li5 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.first-block-body > ul .li4 img {
  width: 12px;
  height: 12px;
  display: inline-block;
  padding-top: 2px;
}
.w-90 {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
}
.w-100 {
  width: 95%;
  display: inline-block;
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.first-block-body > ul .li3 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.first-block-body > ul .li3 span {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.w-400 {
  width: 400px;
  padding: 5px 0px;
}
.first-block-body > ul .li2 {
  width: 400px;
  color: #2f2f2f;
  font-size: 14px;
  padding: 5px 0px;
  margin-top: 10px;
}
.first-block-body > ul .li2 span {
  width: 100%;
  display: inline-block;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.first-block-body > ul li {
  float: left;
  font-size: 12px;
  color: #959595;
}
.first-block-body > ul .i1 {
  width: 100px;
  height: 100px;
  margin: 10px;
}
.first-block-body > ul {
  width: 550px;
  height: 240px;
  background: #fafafa;
  float: left;
  margin-right: 10px;
  margin-bottom: 10px;
}
.first-block-body {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.first-block > .header {
  display: flex;
}
.first-block-d1 > div {
  font-size: 18px;
  font-weight: 600;
  padding: 0px 10px;
  float: left;
  margin-top: -3px;
  color: #2f2f2f;
}
.first-block-d1 {
  width: 140px;
  height: 18px;
  border-left: 4px solid #26a9e1;
}
.first-block {
  margin-top: 10px;
  background: #ffffff;
  padding: 20px;
}
.mt {
  margin-top: 10px;
  background: #eeeeee;
  padding: 0.01px;
}
.Wleft {
  width: 190px;
  height: 310px;
  background-color: #ffffff;
  float: left;
}
.Wleft ul li {
  padding: 14.3px 0px;
  font-size: 16px;
  text-align: left;
  padding-left: 18%;
  color: #959595;
  display: flex;
  cursor: pointer;
  height: 23px;
}
.Wleft ul li:hover {
  background-color: #e5fbff;
  color: #33cdf4;
}
.Wleft ul li img {
  width: 23px;
  margin-right: 15px;
}
.contentW {
  margin-top: 1px;
  background-color: #eeeeee;
  min-height: 1000px;
}
.contentW .main {
  width: 1170px;
  margin: 0 auto;
}
.swipercontent {
  float: right;
  width: 980px;
  height: 312px;
  overflow: hidden;
  background-color: #ffffff;
  font-size: 0;
  padding: 0;
  margin-top: -1px;
}
.swipercontent img {
  width: 100%;
  height: 100%;
}
.clear {
  clear: both;
}
.WrightList-d1 {
  height: 14px;
  border-left: 4px solid #26a9e1;
}
.WrightList-d1 > div {
  font-size: 14px;
  font-weight: 600;
  padding: 0px 10px;
  float: left;
  margin-top: -3px;
}
.WrightList-d2 {
  position: relative;
  padding-top: 10px;
}
.WrightList-d2 > input {
  width: 80%;
  height: 20px;
  padding: 5px 0px 5px 20%;
  margin: 7px auto;
  border: 1px solid #c0c4cc;
}
.WrightList-d2 > input:hover {
  border: 1px solid #26a9e1;
}
.WrightList-d2 > p {
  color: #696969;
  font-size: 12px;
  display: block;
  margin: 5px auto;
}
.WrightList-d2 > button {
  border: 0px;
  width: 100%;
  padding: 6px 0px;
  text-align: center;
  background: #33cdf4;
  color: #ffffff;
  font-size: 13px;
  margin-top: 5px;
}
.WrightList-d2 > img {
  position: absolute;
  width: 14px;
}
.WrightList-d2 > img:nth-child(1) {
  top: 25px;
  left: 10px;
}
.WrightList-d2 > img:nth-child(2) {
  top: 72px;
  left: 10px;
}
.WrightList-d2 > img:nth-child(3) {
  top: 116px;
  left: 10px;
}
.WrightList-d2 > img:nth-child(4) {
  top: 163px;
  left: 10px;
}

.search-d1 {
  margin-top: 10px;
}
.search-d1 ul li {
  float: left;
  width: 24.36%;
  padding: 20px 0px;
  background: #fff;
  text-align: center;
  color: #2f2f2f;
  cursor: pointer;
}
.search-d1 ul li img {
  display: block;
  margin: 10px auto;
  width: 45px;
  height: 40px;
}
.search-d1 ul li:nth-child(1) {
  margin-right: 10px;
}
.search-d1 ul li:nth-child(2) {
  margin-right: 10px;
}
.search-d1 ul li:nth-child(3) {
  margin-right: 10px;
}
</style>
