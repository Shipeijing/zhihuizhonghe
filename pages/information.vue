<template>
  <div>
    <div class="clear"></div>
    <div class="content">
      <div class="main">
        <div class="left">
          <!--智慧社区轮播图开始-->
          <div class="swipercontent">
            <el-carousel
              trigger="click"
              height="400px"
              :interval="8000"
            >
              <el-carousel-item
                v-for="zhuihui in bannerList"
                :key="zhuihui.id"
              >
                <img
                  :src="$store.state.baseImgUrl+zhuihui.image"
                  @click="seeInfo(index,zhuihui)"
                />
              </el-carousel-item>
            </el-carousel>
          </div>
          <!--轮播图结束-->
          <div class="clear"></div>
          <!--公司动态-->
          <div class="zxList">
            <div
              v-if="navName"
              class="top"
            >
              <h1>{{navName}}</h1>
              <span
                class="more"
                @click="moreInit(navCode)"
              >更多>></span>
            </div>
            <div
              v-if="!navName"
              class="top listTit"
            >
              <p
                v-on:click="changeLicode(6)"
                :class="liactive == 6 ? 'active' : ''"
              >本地政策</p>
              <p
                v-on:click="changeLicode(13)"
                :class="liactive == 13 ? 'active' : ''"
              >省政策</p>
              <p
                v-on:click="changeLicode(14)"
                :class="liactive == 14 ? 'active' : ''"
              >国家政策</p>
              <span
                class="more"
                @click="moreInit(liactive)"
              >更多>></span>
            </div>
            <div>
              <div class="newsleft">
                <ul v-for="(item,index) in news">
                  <li
                    class="newsleftLi"
                    :class="{active:index == bgColor}"
                    v-on:click="seeInfo(index,item)"
                  >
                    <img
                      class="leftimg"
                      :src="$store.state.baseImgUrl+item.image"
                    />
                    <h1>{{item.title}}</h1>
                    <p class="intor">{{item.remark}}</p>
                    <a @click="seeInfo(index,item)">查看详情</a>
                    <ol>
                      <li>
                        <img
                          class="ly"
                          src="~/static/img/ly.png"
                        />
                        <p>{{item.author}}</p>
                      </li>
                      <li>
                        <img
                          class="ll"
                          src="~/static/img/ll.png"
                        />
                        <p>{{item.hitCount}}</p>
                      </li>
                      <li>
                        <img
                          class="sj"
                          src="~/static/img/sj.png"
                        />
                        <p>{{item.createDate}}</p>
                      </li>
                    </ol>
                  </li>
                </ul>
                <div class="clear"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="right">
          <!--热搜资讯开始-->
          <div class="zxTop">
            <div class="top">
              <h1>热门<span class="black">资讯</span></h1>
              <!--<input v-model="rsMoreId" />-->
              <a
                class="more"
                @click="moreInit(1)"
              >更多>></a>
            </div>
            <div class="rsList">
              <ul v-for="hot in hotNews">
                <li
                  class="figcaption"
                  v-on:click="seeInfoTwo(hot)"
                >
                  <h1>{{hot.title}}</h1>
                  <img :src="$store.state.baseImgUrl+hot.image" />
                  <p>{{hot.remark}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
          <!--热搜资讯结束-->
          <!--公司动态开始-->
          <div class="zxTop">
            <div class="top">
              <h1>公司<span class="black">动态</span></h1>
              <!--<input v-model="rsMoreId" />-->
              <a
                class="more"
                @click="moreInit(4)"
              >更多>></a>
            </div>
            <div class="rsList">
              <ul v-for="hot in gsdtList">
                <li
                  class="figcaption"
                  v-on:click="seeInfoTwo(hot)"
                >
                  <h1>{{hot.title}}</h1>
                  <img :src="$store.state.baseImgUrl+hot.image" />
                  <p>{{hot.remark}}</p>
                </li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
          <!--公司动态结束-->
          <!--热搜词条开始-->
          <div class="zxctList">
            <div class="top">
              <h1>前瞻<span class="black">政策</span></h1>
              <!--<input v-model="qzMoreId" />-->
              <a
                class="more"
                @click="moreInit(3)"
              >更多>></a>
            </div>
            <div class="rankings">
              <ul>
                <li
                  v-for="(hotTwo,index) in hotNewsTwo"
                  class="rankingsLi"
                  @click="seeInfoTwo(hotTwo)"
                >
                  <span :class="index>2 ? 'grey' : ''">{{index+1}}</span>
                  <p>{{hotTwo.title}}</p>
                  <i>{{hotTwo.hitCount}}</i>
                  <div class="clear"></div>
                </li>
                <div class="clear"></div>
              </ul>
            </div>
          </div>
          <!--热搜词条结束-->
        </div>
        <div class="clear"></div>
      </div>
      <br />
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../store/services'
function queryInformationChange (name) {
  let title = ''
  let keywords = ''
  let description = ''
  switch (name) {
    case '专利百科':
      title = '专利申请转让要走哪些流程_提供哪些资料-智慧众合'
      keywords = '专利申请,专利转让'
      description = '智慧众合百科问答为企业解决专利申请、专利装让等相关流程问题、价格、资料填写等相关问题。'
      break;
    case '商标知识':
      title = '商标注册交易具体流程_如何进行商标注册交易-智慧众合'
      keywords = '商标注册流程,商标交易流程'
      description = '智慧众合为企业提供商标注册交易的具体流程，查看相关对应流程，解决办事过程中的复杂混乱，尽快完成对应申请。'
      break;
    case '项目申报':
      title = '项目申报流程有哪些_项目申报材料怎么写-智慧众合'
      keywords = '项目申报流程有哪些,项目申报材料'
      description = '项目申报栏目专为企业解决项目申报流程不会走，项目申报材料不会写的问题，助力企业完成项目申报。'
      break;
    case '科技政策':
      title = '2019最新知识产权政策_知识产权政策有哪些-智慧众合'
      keywords = '2019最新知识产权政策,知识产权政策'
      description = '科技政策主要是为企业提供2019年最新的知识产权政策，并且不断的更新，让企业了解相关知识产权政策的内容，以及企业如何应对政策的变化。'
      break;
    case '工商财税':
      title = '工商财税有哪些服务_工商财税需要注意哪些事项-智慧众合'
      keywords = '公司注册,代理记账'
      description = '工商财税栏目为企业提供对应的公司注册、注销、变更，以及财务报表制作和代理记账等服务，解决公司注册以及代理记账等出现的问题。'
      break;
    case '工业设计':
      title = '工业设计_企业产品设计-智慧众合'
      keywords = '工业设计,企业产品设计'
      description = '工业设计栏目为企业进行产品设计提供专业的知识、案例，让企业能够从栏目中学习借鉴，提供企业发展自身的能力。'
      break;
    case '产学研合作':
      title = '产学研合作内容_校企产学研合作服务中心-智慧众合'
      keywords = '产学研合作,校企合作,科技成果合作'
      description = '产学研合作栏目也是智慧众合校企产学研合作服务中心，为企业和学校提供知识产权对接的渠道，促进学校和企业关于科技成果、知识产权等方面的合作。'
      break;
    case '版权知识':
      title = '版权基本知识_版权保护交易需要注意哪些事项-智慧众合'
      keywords = '版权基本知识,版权保护交易'
      description = '智慧众合版权知识栏目让企业充分了解版权的基本知识、保全保护交易的注意事项，帮助企业保护自己的版权，增强版权意识。'
      break;
    default:
      title = '知识产权百科_专业解决知识产权流程|申请|资料相关问题'
      keywords = '知识产权百科,知识产权交易'
      description = '知识产权百科问答专业解决知识产权流程办理、项目申请、专利申请、商标注册以及知识产权交易等出现的问题。除此之外，还会给企业带来最新的相关政策、科技成果等，帮助企业对发展有一个新的认识。'
  }
  var obj = {
    title: title,
    keywords: keywords,
    description: description,
  }
  return obj
}
export default {
  async asyncData (route) {
    var obj = queryInformationChange(route.query._n)
    return {
      title: obj.title,
      keywords: obj.keywords,
      description: obj.description
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '百科问答')
  },
  head () {
    return {
      title: this.title,
      meta: [
        { hid: 'keywords', name: 'keywords', content: this.keywords },
        { hid: 'description', name: 'description', content: this.description }
      ]
    }
  },
  data () {
    return {
      bgColor: '',
      hotNews: [],
      hotNewsTwo: [],
      news: [],
      bannerList: [],
      gsdtList: [],
      navCode: '',
      navName: '',
      liactive: 6
    }
  },
  watch: {
    $route: {
      handler: function (val) {
        if (val.query) {
          if (val.query.code != this.navCode) {
            var obj = queryInformationChange(this.$route.query._n)
            this.title = obj.title
            this.keywords = obj.keywords
            this.description = obj.description
            this.navCode = this.$route.query.code
            this.navName = this.$route.query._n
            this.$store.dispatch('setNavName', this.$route.query._n)
            this.getNewsList()
          }
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted () {
    this.getBanner()
    this.getRmzx()
    this.getGsdt()
    this.getQzzc()
    if (this.$route.query && this.$route.query.code) {
      this.navCode = this.$route.query.code
      this.navName = this.$route.query._n
      this.$store.dispatch('setNavName', this.$route.query._n)
    }
    this.getNewsList()
  },
  methods: {
    changeLicode (val) {
      if (this.liactive != val) {
        this.liactive = val
        this.getNewsList()
      }
    },
    getNewsList () {
      this.news = []
      if (this.navCode) {
        let params = {
          order: "desc",
          sort: 'createDate',
          max: 6
        }
        Services.getNewsCategoryList(this.navCode, params).then(response => {
          if (response.data.code == 200) {
            this.news = response.data.result.newsList
          }
        })
      } else {
        let params = {
          order: "desc",
          sort: 'createDate',
          max: 6
        }
        Services.getNewsCategoryList(this.liactive, params).then(response => {
          if (response.data.code == 200) {
            this.news = response.data.result.newsList
          }
        })
      }

    },
    getBanner () {
      let params = {
        order: "desc",
        sort: 'createDate',
        max: 999
      }
      Services.getNewsCategoryList('5', params).then(response => {
        if (response.data.code == 200) {
          this.bannerList = response.data.result.newsList
        }
      })
    },
    getRmzx () {
      let params = {
        order: "desc",
        sort: 'createDate',
        max: 3
      }
      Services.getNewsCategoryList('1', params).then(response => {
        if (response.data.code == 200) {
          this.hotNews = response.data.result.newsList
        }
      })
    },
    getGsdt () {
      let params = {
        order: "desc",
        sort: 'createDate',
        max: 3
      }
      Services.getNewsCategoryList('4', params).then(response => {
        if (response.data.code == 200) {
          this.gsdtList = response.data.result.newsList
        }
      })
    },
    getQzzc () {
      let params = {
        order: "desc",
        sort: 'createDate',
        max: 10
      }
      Services.getNewsCategoryList('3', params).then(response => {
        if (response.data.code == 200) {
          this.hotNewsTwo = response.data.result.newsList
        }
      })
    },
    moreInit (id) {
      var tempwindow = window.open();
      tempwindow.location = '/moreNews?newsClassId=' + id
    },
    seeInfo (index, item) {
      this.bgColor = index;
      var tempwindow = window.open();
      tempwindow.location = '/informationDetail?id=' + item.id
    },
    seeInfoTwo (item) {
      var tempwindow = window.open();
      tempwindow.location = '/informationDetail?id=' + item.id
    }
  }
}
</script>

<style scoped>
.listTit p {
  display: inline-block;
  font-size: 18px;
  color: #2f2f2f;
  width: 120px;
  padding-bottom: 15px;
  margin-bottom: -2px;
  font-weight: bold;
  cursor: pointer;
}
.listTit p.active {
  color: #26a9e1;
  border-bottom: 2px solid #26a9e1;
}
.listTit .more {
  margin-top: 0 !important;
}
.content {
  background-color: #eeeeee;
  min-height: 1000px;
  /*margin-bottom: 15px;*/
}
.content .main {
  width: 1170px;
  margin: 0 auto;
}
.content .broadcast {
  margin-top: -1px;
}
.content .main .left {
  width: 782px;
  float: left;
}
/*轮播图*/
.swipercontent {
  float: left;
  width: 782px;
  margin-top: 15px;
}
.swipercontent img {
  width: 100%;
}
/*资讯列表*/
.content .main .left {
  width: 785px;
  float: left;
}
.content .main .left .zxList {
  width: 732px;
  height: auto;
  zoom: 1;
  overflow: hidden;
  background-color: #ffffff;
  margin-top: 20px;
  padding: 25px;
}
.content .main .left .zxList .top {
  border-bottom: 2px solid #ececec;
}
.content .main .left .zxList .top h1 {
  font-size: 18px;
  color: #26a9e1;
  width: 140px;
  border-bottom: 2px solid #26a9e1;
  padding-bottom: 15px;
  margin-bottom: -2px;
}
.content .main .left .zxList .top .more {
  display: block;
  float: right;
  width: 74px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border: 1px solid #ececec;
  background-color: #efefef;
  font-size: 12px;
  color: #959595;
  margin-top: -38px;
  border-radius: 20px;
  cursor: pointer;
}

.content .main .left .newsleft {
  width: 732px;
  float: left;
  margin-top: 20px;
}
.newsleftLi:hover {
  background-color: #f9f9f9;
}
.content .main .left .newsleft ul > li {
  padding: 10px;
  height: 152px;
  position: relative;
  margin-bottom: 10px;
}
.content .main .left .newsleft .leftimg {
  display: block;
  float: left;
  width: 228px;
  height: 152px;
  margin-right: 15px;
}
.content .main .left .newsleft h1 {
  /*width: 430px;*/
  /*white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;*/
  font-size: 15px;
  color: #2f2f2f;
  cursor: pointer;
}
.content .main .left .newsleft li a {
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
.content .main .left .newsleft .intor {
  font-size: 12px;
  color: #959595;
  margin-top: 10px;
  line-height: 22px;
  overflow: hidden;
  height: 66px;
  position: relative;
}
.content .main .left .newsleft .intor::after {
  content: "...";
  font-weight: bold;
  position: absolute;
  bottom: 0;
  right: 0;
  padding: 0 10px 1px 45px;
  background: url(http://newimg88.b0.upaiyun.com/newimg88/2014/09/ellipsis_bg.png)
    repeat-y;
}
.content .main .left .newsleft .ly {
  width: 13px;
  height: 13px;
  margin-top: 5px;
}
.content .main .left .newsleft .ll {
  width: 19px;
  height: 11px;
  margin-top: 5px;
}
.content .main .left .newsleft .sj {
  width: 13px;
  height: 13px;
  margin-top: 4px;
}
.content .main .left .newsleft ul > li ol {
  float: right;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.content .main .left .newsleft ul > li ol li {
  float: left;
  margin-left: 25px;
}
.content .main .left .newsleft ul > li ol li img {
  display: block;
  float: left;
}
.content .main .left .newsleft ul > li ol li p {
  font-size: 12px;
  color: #959595;
  margin: 0;
  line-height: 22px;
  float: left;
  padding-left: 10px;
}
/*热搜资讯*/
.content .main .right {
  float: left;
  width: 370px;
  margin-left: 15px;
}
.content .main .right .zxTop {
  width: 323px;
  height: auto;
  background-color: #ffffff;
  margin-top: 15px;
  padding: 25px;
}
.content .main .right .zxTop .top {
  border-bottom: 2px solid #ececec;
}
.content .main .right .zxTop .top h1 {
  font-size: 18px;
  color: #26a9e1;
  width: 140px;
  border-bottom: 2px solid #26a9e1;
  padding-bottom: 15px;
  margin-bottom: -2px;
}
.zxTop .top .more {
  display: block;
  float: right;
  width: 74px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border: 1px solid #ececec;
  background-color: #efefef;
  font-size: 12px;
  color: #959595;
  margin-top: -38px;
  border-radius: 20px;
  cursor: pointer;
}
.content .main .right .rsList ul li {
  padding: 15px 0;
  height: 110px;
  border-bottom: 1px dashed #cbcbcb;
}
.content .main .right .rsList .figcaption {
  cursor: pointer;
}
.content .main .right .rsList ul li h1 {
  width: 100%;
  /*white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;*/
  font-size: 15px;
  color: #ff7301;
  margin-bottom: 10px;
  cursor: pointer;
}
.content .main .right .rsList ul li img {
  width: 110px;
  height: 70px;
  display: block;
  float: left;
  margin-right: 15px;
}
.content .main .right .rsList ul li p {
  width: 198px;
  height: 75px;
  font-size: 12px;
  color: #2f2f2f;
  float: left;
  line-height: 18px;
  overflow: hidden;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
/*热搜词条*/
.content .main .right .zxctList {
  width: 323px;
  height: auto;
  background-color: #ffffff;
  margin-top: 15px;
  padding: 25px;
}
.content .main .right .zxctList .top {
  border-bottom: 2px solid #ececec;
}
.content .main .right .zxctList .top h1 {
  font-size: 18px;
  color: #26a9e1;
  width: 140px;
  border-bottom: 2px solid #26a9e1;
  padding-bottom: 15px;
  margin-bottom: -2px;
}
.content .main .right .zxctList .top .more {
  display: block;
  float: right;
  width: 74px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border: 1px solid #ececec;
  background-color: #efefef;
  font-size: 12px;
  color: #959595;
  margin-top: -38px;
  border-radius: 20px;
  cursor: pointer;
}
.content .main .right .zxctList .rankings {
  margin-top: 25px;
  margin-left: -11px;
  height: auto;
}
.content .main .right .zxctList .rankings li {
  cursor: pointer;
  width: 327px;
  height: auto;
  padding: 5px 10px;
}
.content .main .right .zxctList .rankings li:hover {
  background-color: #f0f0f0;
}
.content .main .right .zxctList .rankings li span {
  display: block;
  width: 40px;
  height: 22px;
  border-radius: 15px;
  background-color: #d80b0b;
  text-align: center;
  line-height: 22px;
  color: #ffffff;
  font-size: 12px;
  display: block;
  float: left;
  margin-top: 3px;
}
.content .main .right .zxctList .rankings li span.grey {
  background-color: grey;
}
/*Top1~Top3*/
/*.content .main .right .zxctList .rankings li:nth-child(1) span{
	background-color: #d80b0b;
}
.content .main .right .zxctList .rankings li:nth-child(2) span{
	background-color: #ff4c1c;
}
.content .main .right .zxctList .rankings li:nth-child(3) span{
	background-color: #ff8c1c;
}*/
.content .main .right .zxctList .rankings li p {
  width: 240px;
  /*height: 22px;*/
  line-height: 22px;
  /*white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;*/
  float: left;
  font-size: 14px;
  margin-left: 15px;
}
.content .main .right .zxctList .rankings li i {
  font-style: normal;
  font-size: 16px;
  color: #c0c0c0;
  float: right;
}
</style>
