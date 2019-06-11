<template>
  <div>
    <div class="clear"></div>
    <div class="content">
      <div class="main">
        <div class="broadcast">
          <div class="hoverNavList">
            <ul>
              <li
                class="active"
                v-for="list in productClassList"
                v-if="list.parentId == 0"
                v-on:mouseenter="showMoreClass(list.id)"
                v-on:mouseleave="showMoreC = false"
              >
                <h1>{{ list.name }}</h1>
                <div class="box">
                  <a
                    v-for="item in productClassList"
                    v-if="item.parentId == list.id"
                    v-on:click="goProductsList(item.id, item.name)"
                    >{{ item.name }}</a
                  >
                </div>
                <div
                  class="moreClassList"
                  v-show="showMoreC && list.id == hoverClassId"
                >
                  <div
                    v-for="a in productClassList"
                    v-if="a.parentId == hoverClassId"
                  >
                    <span
                      class="title"
                      v-on:click="goProductsList(a.id, a.name)"
                      >{{ a.name }}></span
                    >
                    <div class="listI">
                      <span
                        class="name"
                        v-on:click="goProductsList(b.id, b.name)"
                        v-for="b in productClassList"
                        v-if="b.parentId == a.id"
                        >{{ b.name }}</span
                      >
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!--轮播图开始-->
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
          <!--轮播图结束-->
          <!--右侧list开始-->
          <div class="rightList">
            <!-- <ul>
                <li>
                  <nuxt-link to="/serviceMall">
                    <img src="~/static/img/l2.png"/>
                    <h1>IP服务商城</h1>
                    <p>知识产权服务，保护创新成果</p>
                  </nuxt-link>
                </li>
                <li>
                  <nuxt-link to="/resources">
                    <img src="~/static/img/l1.png"/>
                    <h1>资源商城</h1>
                    <p>免费入住商城，发布海量需求</p>
                  </nuxt-link>
                </li>
                <li>
                  <img src="~/static/img/l3.png"/>
                  <h1>智慧云</h1>
                  <p>免费入住商城，发布海量需求</p>
                </li>
              </ul> -->
            <div class="rightList-d1">
              <div><span style="color:#26a9e1;">智能</span>招标</div>
            </div>
            <div class="rightList-d2">
              <img
                class="rightList-d2-img-1"
                src="~/static/img/shouji (2).png"
                alt=""
              />
              <input
                :class="rightListd2input2"
                type="text"
                v-model="tenderName"
                @input="changeinputcolor"
                placeholder="姓名"
              />
              <img
                class="rightList-d2-img-2"
                src="~/static/img/shouji (1).png"
                alt=""
              />
              <input
                :class="rightListd2input1"
                type="text"
                v-model="mobilePhone"
                @input="changeinputcolor"
                placeholder="手机号"
              />
              <input
                :class="rightListd2input3"
                type="text"
                v-model="yanzhengma"
                @input="changeinputcolor"
                placeholder="验证码"
              />
              <button
                :class="changecolor"
                :disabled="disabled"
                @click="sendVerifyCode"
              >
                {{ sms }}
              </button>
              <img
                class="rightList-d2-img-3"
                src="~/static/img/shouji (3).png"
                alt=""
              />
              <textarea
                v-model="tenderbody"
                @input="changeinputcolor"
                :class="rightListd2textarea"
                cols="30"
                rows="10"
                placeholder="招标内容"
              ></textarea>
              <button class="rightList-d2-but2" @click="Submission">
                发布招标
              </button>
            </div>
            <div class="rightList-d3">
              <h1>大家都在求购</h1>
              <div>
                <marquee
                  height="420"
                  class="rightList-d3-marquee"
                  behavior="scroll"
                  direction="up"
                  scrolldelay="3000"
                  scrollamount="13"
                >
                  <p class="rightList-d3-p" v-for="item in gundong">
                    {{ item.mobilePhone + " " + item.tenderContent }}
                  </p>
                </marquee>
              </div>
            </div>
          </div>
          <!--右侧list结束-->
        </div>
        <!--知识产权服务开始-->
        <div class="clear"></div>
        <div class="propertyRight floorItem" id="item1">
          <p class="topx">知识产权<span class="black">服务</span></p>
          <ul>
            <li v-on:click="getProductDetail('2149377838039040')">
              <img src="~/static/img/i1.png" />
              <h1>国家专利申请</h1>
              <p>攻防兼备 内外兼修</p>
              <p class="detail"><i>￥1000元起</i><span>了解详情</span></p>
            </li>
            <li v-on:click="getProductDetail('2151554555985920')">
              <img src="~/static/img/i2.png" />
              <h1>商标注册</h1>
              <p>建设品牌 树立形象</p>
              <p class="detail"><i>￥1000元起</i><span>了解详情</span></p>
            </li>
            <li v-on:click="getProductDetail('2149386021126144')">
              <img src="~/static/img/i3.png" />
              <h1>高新企业认定</h1>
              <p>企业税收减免 政府资金补贴</p>
              <p class="detail"><i>￥50000元起</i><span>了解详情</span></p>
            </li>
            <li v-on:click="getProductDetail('2154001269669888')">
              <img src="~/static/img/i4.png" />
              <h1>科技项目申报</h1>
              <p>提高项目补贴 提升企业高度</p>
              <p class="detail"><i>￥10000元起</i><span>了解详情</span></p>
            </li>
          </ul>
        </div>
        <!--知识产权服务结束-->

        <!--广告位开始-->
        <!-- <div class="advertisement">
            <img src="~/static/img/ban.png" />
          </div> -->
        <!--广告位结束-->
        <div class="main-container t_shop_content floorItem" id="item2">
          <div class="grid_content_1190 t_shop">
            <div class="floor_header fl">
              <div class="floor_nahot_key_wordme fl">
                <i class="color_mark fl"></i>知识产权交易
              </div>
              <div class="hot_key_word fr">
                <ul>
                  <li
                    :class="zscqjyNow == item ? 'active' : ''"
                    v-for="item in zscqJyType"
                    v-on:mouseenter="changeType(item, 'zscqjy')"
                  >
                    {{ item }}
                  </li>
                  <li @click="goUrl(1)">查看更多></li>
                </ul>
              </div>
              <div class="clear"></div>
              <div class="floor_body fl clearfix transaction">
                <div class="tRight">
                  <el-carousel arrow="never" height="500px" :interval="4000">
                    <el-carousel-item
                      v-for="item in advertList4"
                      :key="item.id"
                    >
                      <img
                        :src="$store.state.baseImgUrl + item.imageUrl"
                        v-on:click="goLink(item.url)"
                      />
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <div class="tLeft">
                  <ul>
                    <li
                      v-for="(shop, index) in activeZscqJyList"
                      @click="getProductDetail(shop.objectId)"
                      v-show="index < 10"
                    >
                      <img :src="$store.state.baseImgUrl + shop.images" />
                      <p>{{ shop.title }}</p>
                      <div class="price">
                        <i
                          >￥
                          {{
                            shop.filed1 == 0 ? "价格面议" : shop.filed1 + "元"
                          }}</i
                        >
                      </div>
                      <img
                        class="gwc"
                        :src="$store.state.baseImgUrl + shop.images"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>

        <div class="main-container t_shop_content floorItem" id="item3">
          <div class="grid_content_1190 t_shop">
            <div class="floor_header fl">
              <div class="floor_nahot_key_wordme fl">
                <i class="color_mark fl"></i>推荐商铺
              </div>
              <div class="hot_key_word fr">
                <ul>
                  <li
                    :class="shopTypeNow == item ? 'active' : ''"
                    v-for="item in shopType"
                    v-on:mouseenter="changeType(item, 'tjsp')"
                  >
                    {{ item }}
                  </li>
                  <li @click="goUrl(2)">查看更多></li>
                </ul>
              </div>
              <div class="clear"></div>
              <div class="floor_body fl clearfix">
                <div class="big_banner fl">
                  <el-carousel arrow="never" height="500px" :interval="4000">
                    <el-carousel-item
                      v-for="item in advertList3"
                      :key="item.id"
                    >
                      <img
                        :src="$store.state.baseImgUrl + item.imageUrl"
                        v-on:click="goLink(item.url)"
                      />
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <div class="shop_con fr">
                  <div
                    class="shop"
                    v-for="(item, index) in activeRecommendList"
                    @click="getShopDetail(item.objectId)"
                    v-show="index < 10"
                  >
                    <div class="company_logo">
                      <img :src="$store.state.baseImgUrl + item.images" />
                    </div>
                    <div class="company_name">
                      <a href="#">{{ item.title }}</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="main-container t_shop_content floorItem" id="item4">
          <div class="grid_content_1190 t_shop">
            <div class="floor_header fl">
              <div class="floor_nahot_key_wordme fl">
                <i class="color_mark fl"></i>推荐服务
              </div>
              <div class="hot_key_word fr">
                <ul>
                  <li
                    :class="productTypeNow == item ? 'active' : ''"
                    v-for="item in productType"
                    v-on:mouseenter="changeType(item, 'tjfw')"
                  >
                    {{ item }}
                  </li>
                  <li @click="goUrl(3)">查看更多></li>
                </ul>
              </div>
              <div class="clear"></div>
              <div class="floor_body fl clearfix transaction">
                <div class="tRight">
                  <el-carousel arrow="never" height="500px" :interval="4000">
                    <el-carousel-item
                      v-for="item in advertList2"
                      :key="item.id"
                    >
                      <img
                        :src="$store.state.baseImgUrl + item.imageUrl"
                        v-on:click="goLink(item.url)"
                      />
                    </el-carousel-item>
                  </el-carousel>
                </div>
                <div class="tLeft">
                  <ul>
                    <li
                      v-for="(shop, index) in activeProductList"
                      @click="getProductDetail(shop.objectId)"
                      v-show="index < 10"
                    >
                      <img :src="$store.state.baseImgUrl + shop.images" />
                      <p>{{ shop.title }}</p>
                      <div class="price">
                        <i
                          >￥
                          {{
                            shop.filed1 == 0 ? "价格面议" : shop.filed1 + "元"
                          }}</i
                        >
                      </div>
                      <img
                        class="gwc"
                        :src="$store.state.baseImgUrl + shop.images"
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="clear"></div>

        <!--新闻资讯开始-->
        <div class="news floorItem" id="item5">
          <p class="topx">新闻<span class="black">资讯</span></p>
          <div class="newsList">
            <div class="left">
              <ul>
                <li
                  v-for="item in newsList"
                  v-on:click="seeInfo(index, item.id)"
                >
                  <img
                    class="leftimg"
                    :src="$store.state.baseImgUrl + item.image"
                  />
                  <h1>{{ item.title }}</h1>
                  <p>{{ item.remark }}</p>
                  <a>查看详情</a>
                  <ol>
                    <li>
                      <img class="ly" src="~/static/img/ly.png" />
                      <p>{{ item.author }}</p>
                    </li>
                    <li>
                      <img class="ll" src="~/static/img/ll.png" />
                      <p>{{ item.hitCount }}</p>
                    </li>
                    <li>
                      <img class="sj" src="~/static/img/sj.png" />
                      <p>{{ item.createDate }}</p>
                    </li>
                  </ol>
                </li>
              </ul>
            </div>
            <div class="right">
              <ul>
                <li v-for="item in advertList5" :key="item.id">
                  <img
                    class="cus"
                    :src="$store.state.baseImgUrl + item.imageUrl"
                    v-on:click="goLink(item.url)"
                  />
                </li>
              </ul>
            </div>
          </div>
        </div>
        <br />
        <!--新闻资讯结束-->
      </div>
      <div id="menu">
        <ul>
          <li>
            <a href="#item1" @click="scrollTo('#item1')" class="cur"
              >知识产权服务</a
            >
          </li>
          <li><a href="#item2" @click="scrollTo('#item2')">知识产权交易</a></li>
          <li><a href="#item3" @click="scrollTo('#item3')">推荐商铺</a></li>
          <li><a href="#item4" @click="scrollTo('#item4')">推荐服务</a></li>
          <li><a href="#item5" @click="scrollTo('#item5')">新闻资讯</a></li>
          <li>
            <a href="#" @click="scrollTo()"
              ><i class="el-icon-arrow-up"></i>TOP</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Services from '../store/services'
var timer = null
export default {
  async asyncData () {
    let [productClassList, getAdvertList1001, getAdvertList1005, getAdvertList1006, getAdvertList1007, getAdvertList1008] = await Promise.all([
      Services.getProductClass(),
      Services.advertList('1001'),
      Services.advertList('1005'),
      Services.advertList('1006'),
      Services.advertList('1007'),
      Services.advertList('1008')
    ])
    return {
      productClassList: productClassList.data.result.productClassList,
      advertList1: getAdvertList1001.data.result,
      advertList2: getAdvertList1005.data.result,
      advertList3: getAdvertList1006.data.result,
      advertList4: getAdvertList1007.data.result,
      advertList5: getAdvertList1008.data.result,
    }
  },
  data () {
    return {

      rightListd2textarea: "rightList-d2-input rightList-d2-input-40px inputcolorbai",
      rightListd2input1: 'rightList-d2-input inputcolorbai',
      rightListd2input2: 'rightList-d2-input inputcolorbai',
      rightListd2input3: 'rightList-d2-input1 inputcolorbai',

      gundong: [],
      recommendList: [],
      productList: [],
      sliderList: [],
      //分页
      pageNo: 1,
      totalPage: 999,
      max: 10,
      shopType: [],
      productType: [],
      zscqjyNow: '',
      shopTypeNow: '',
      productTypeNow: '',
      zscqfuType: [],
      zscqfuList: [],
      zscqJyType: [],
      zscqJyList: [],
      newsList: [],
      hoverClassId: '',
      showMoreC: false,
      disabled: false,
      sms: '获取验证码',
      time: 60,
      tipShow: false,
      tipName: '',
      changecolor: 'rightList-d2-but1 rightList-d2-but1-huang',
      tenderName: null,
      tenderbody: null,
      yanzhengma: null,
      mobilePhone: null,
    }
  },
  async beforeCreate () {
    this.$store.dispatch('setNavName', '商品分类')
  },
  head () {
    return {
      title: '企业一站式知识产权与创业服务资源共享平台-智慧众合',
      meta: [
        { hid: 'keywords', name: 'keywords', content: '知识产权交易,专利申请交易,商标注册转让,工商财税,高新企业科技项目申报,工业设计' },
        { hid: 'description', name: 'description', content: '智慧众合网（www.zhihuizhonghe.com）是通过“智慧+互联网+共享经济”的方式，以企业个性化服务为核心的，资源共享企业服务平台，主要为企业提供专利申请、项目申报等知识产权服务，创意设计、产学研合作等创新服务，工商财税、管理培训等创业服务，以及产业链服务。' }
      ]
    }
  },
  computed: {
    activeProductList: function () {
      let self = this
      return self.productList.filter(function (item) {
        return !self.productTypeNow || (self.productTypeNow && self.productTypeNow == item.positionType)
      })
    },
    activeRecommendList: function () {
      let self = this
      return self.recommendList.filter(function (item) {
        return !self.shopTypeNow || (self.shopTypeNow && self.shopTypeNow == item.positionType)
      })
    },
    activeZscqJyList: function () {
      let self = this
      return self.zscqJyList.filter(function (item) {
        return !self.zscqjyNow || (self.zscqjyNow && self.zscqjyNow == item.positionType)
      })
    }

  },
  mounted () {
    this.categoryId = this.$route.query.newsClassId
    this.searchZscqJy()
    this.searchProduct()
    this.searchShopInit()
    this.getNewsInfo()
    this.gundongm()
  },
  methods: {
    changeinputcolor () {
      let self = this
      if (self.mobilePhone || self.tenderName || self.yanzhengma || self.tenderbody) {
        if (self.mobilePhone != '' && self.mobilePhone != null) {
          self.rightListd2input1 = 'rightList-d2-input inputcolorhui'
        } else {
          self.rightListd2input1 = 'rightList-d2-input inputcolorbai'
        }
        if (self.tenderName != '' && self.tenderName != null) {
          self.rightListd2input2 = 'rightList-d2-input inputcolorhui'
        } else {
          self.rightListd2input2 = 'rightList-d2-input inputcolorbai'
        }
        if (self.yanzhengma != '' && self.yanzhengma != null) {
          self.rightListd2input3 = 'rightList-d2-input1 inputcolorhui'
        } else {
          self.rightListd2input3 = 'rightList-d2-input1 inputcolorbai'
        }
        if (self.tenderbody != '' && self.tenderbody != null) {
          self.rightListd2textarea = "rightList-d2-input rightList-d2-input-40px inputcolorhui"
        } else {
          self.rightListd2textarea = 'rightList-d2-input rightList-d2-input-40px inputcolorbai'
        }
      }
    },
    Submission () {
      let self = this
      if (!self.mobilePhone || !self.tenderName || !self.yanzhengma || !self.tenderbody) {
        if (!self.mobilePhone) {
          self.tipShow = true
          self.tipName = '请输入手机号'
          return false
        }
        if (!self.tenderName) {
          self.tipShow = true
          self.tipName = '请设置姓名'
          return false
        }
        if (!self.yanzhengma) {
          self.tipShow = true
          self.tipName = '请输入验证码'
          return false
        }
        if (!self.tenderbody) {
          self.tipShow = true
          self.tipName = '请输入招标内容'
          return false
        }
      }
      let params = {
        mobilePhone: self.mobilePhone,
        name: self.tenderName,
        verifyCode: self.yanzhengma,
        tenderContent: self.tenderbody
      }
      // if (this.recommendMember) {
      //   if (!self.checkRecommendMember()) {
      //     return false
      //   } else {
      //     params.recommendMember = String(self.recommendMember)
      //   }
      // }
      Services.saveTender(params).then(response => {
        if (response.data.code == 200) {
          self.$message.success('发布成功！我们会在24小时之内联系您！')
          self.tenderName = null
          self.tenderbody = null
          self.yanzhengma = null
          self.mobilePhone = null
        } else {
          self.tipShow = true
          self.tipName = response.data.message
          self.$message.error(response.data.message)
        }
      })
    },
    sendVerifyCode () {
      if (!this.mobilePhone) {
        this.tipShow = true
        this.tipName = '请输入注册手机号'
        return false
      }
      let params = {
        mobilePhone: this.mobilePhone
      }
      this.disabled = true
      Services.tenderSendVerifyCode(params).then(response => {
        if (response.data.code == 200) {
          this.$message.success('验证码发送成功')
          this.changecolor = 'rightList-d2-but1 rightList-d2-but1-hui'
          timer = setInterval(() => {
            if (this.time == 0) {
              clearInterval(timer)
              this.time = 60,
                this.sms = '发送验证码',
                this.disabled = false,
                this.changecolor = 'rightList-d2-but1 rightList-d2-but1-huang'
            } else {
              this.time = this.time - 1,
                this.sms = '重新发送(' + this.time + ')'
            }
          }, 1000)
        } else {
          this.disabled = false
          this.tipShow = true
          this.tipName = response.data.message
          this.$message.error(response.data.message)
        }
      })
    },
    scrollTo (ele, speed) {
      if (!speed) speed = 300;
      if (!ele) {
        $("html,body").animate({ scrollTop: 0 }, speed);
      } else {
        if (ele.length > 0) $("html,body").animate({ scrollTop: $(ele).offset().top }, speed);
      }
      return false;
    },
    gundongm () {
      let params = {}
      Services.tenderList().then(response => {
        if (response.data.code == 200) {
          this.gundong = response.data.result
        }
      })
    },
    showMoreClass (id) {
      this.showMoreC = true
      this.hoverClassId = id
    },
    seeInfo (index, id) {
      var tempwindow = window.open();
      tempwindow.location = '/informationDetail?id=' + id
    },
    changeType (name, floor) {
      if (floor == 'zscqjy') {
        this.zscqjyNow = name
      }
      if (floor == 'tjsp') {
        this.shopTypeNow = name
      }
      if (floor == 'tjfw') {
        this.productTypeNow = name
      }
    },
    goProductsList (id, name) {
      this.$router.push({ path: '/goodsList', query: { productClassId: id, _n: name } })
    },
    searchZscqFw () {
      let params = {
        posCode: "1004",
        max: 999
      }
      Services.searchRecommendList(params).then(response => {
        if (response.data.code == 200) {
          if (response.data.recommendPosition.types) {
            this.zscqfuType = response.data.recommendPosition.types.split(',')
          }
          this.zscqfuList = response.data.recomments
        }
      })
    },
    searchZscqJy () {
      let params = {
        posCode: "1005",
        max: 999
      }
      Services.searchRecommendList(params).then(response => {
        if (response.data.code == 200) {
          if (response.data.recommendPosition.types) {
            this.zscqJyType = response.data.recommendPosition.types.split(',')
          }
          this.zscqJyList = response.data.recomments
        }
      })
    },
    searchProduct () {
      let params = {
        posCode: "1001",
        max: 999
      }
      Services.searchRecommendList(params).then(response => {
        if (response.data.code == 200) {
          if (response.data.recommendPosition.types) {
            this.productType = response.data.recommendPosition.types.split(',')
          }
          this.productList = response.data.recomments;
        }
      })
    },
    getProductDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/productDetail?id=' + id
    },
    searchShopInit () {
      let params = {
        posCode: "1002",
        max: 999
      }
      Services.searchRecommendList(params).then(response => {
        if (response.data.code == 200) {
          if (response.data.recommendPosition.types) {
            this.shopType = response.data.recommendPosition.types.split(',')
          }
          this.recommendList = response.data.recomments
        }
      })
    },
    getShopDetail (id) {
      var tempwindow = window.open();
      tempwindow.location = '/shopDetail?id=' + id
    },
    goUrl (id) {
      if (id == 1) {
        var tempwindow = window.open();
        tempwindow.location = '/tradingMall'
      } else if (id == 2) {
        var tempwindow = window.open();
        tempwindow.location = '/resources'
      } else {
        var tempwindow = window.open();
        tempwindow.location = '/serviceMall'
      }

    },
    initIndexJs () {
      //新闻资讯鼠标移入效果
      $(".newsList li").hover(function () {
        $(this).addClass("active").siblings().removeClass("active")
      });
    },
    getNewsInfo () {
      let params = {
        order: "desc",
        max: 3
      }
      Services.getNewsList(params).then(response => {
        if (response.data.code == 200) {
          this.newsList = response.data.result.newsList
          this.initIndexJs()
        }
      })
    },
    goLink (url) {
      var tempwindow = window.open();
      tempwindow.location = url
    }
  }
}
</script>

<style scoped>
.inputcolorhui {
  color: #959595;
}
.inputcolorbai {
  color: #d3d3d3;
}
/*轮播模块*/
.clear {
  clear: both;
}
.content {
  margin-top: 1px;
  background-color: #eeeeee;
  min-height: 1000px;
}
.content .main {
  width: 1170px;
  margin: 0 auto;
}
.content .broadcast {
  margin-top: -1px;
}
.hoverNavList {
  width: 190px;
  height: 405px;
  background-color: #2f2f2f;
  float: left;
  margin-top: -1px;
  padding-top: 9px;
  position: relative;
}
.hoverNavList ul {
  padding: 0;
  margin-top: 9px;
  height: 396px;
  overflow: hidden;
}
.hoverNavList ul li {
  clear: both;
  width: 100%;
  line-height: 16px;
  padding-bottom: 9px;
}
.hoverNavList ul h1 {
  font-size: 14px;
  color: #26a9e1;
  padding-left: 25px;
}
.hoverNavList ul li a {
  font-size: 12px;
  color: #ffffff;
  display: inline-block;
  /* float: left; */
  padding: 4px 18px;
  cursor: pointer;
}
.hoverNavList ul .box:hover {
  background-color: #3b3b3b;
}
.hoverNavList ul li .box {
  margin-left: 7px;
  margin-top: 10px;
  clear: both;
}
.moreClassList {
  width: 710px;
  position: absolute;
  top: 0;
  right: -750px;
  z-index: 9999;
  background-color: #ffffff;
  padding: 20px;
  font-size: 12px;
  color: #333333;
  height: 374px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3),
    0px 0px 20px rgba(0, 0, 0, 0.1) inset;
}
.moreClassList > div {
  line-height: 35px;
}
.moreClassList > div span {
  cursor: pointer;
}
.moreClassList > div span:hover {
  color: #26a9e1;
}
.moreClassList .title {
  font-weight: bold;
  display: inline-block;
  margin-right: 20px;
  vertical-align: top;
}
.moreClassList .listI {
  display: inline-block;
  width: 630px;
}
.moreClassList .name {
  display: inline-block;
  margin-right: 20px;
}
.swipercontent {
  float: left;
  width: 750px;
  height: 413px;
  overflow: hidden;
  background-color: #ffffff;
  font-size: 0;
  padding: 0;
}
.swipercontent img {
  width: 100%;
  height: 100%;
}
.rightList {
  width: 190px;
  height: 368.5px;
  float: left;
  background-color: #ffffff;
  padding: 20px 20px 25px;
}
.rightList-d1 {
  height: 19px;
  border-left: 4px solid #26a9e1;
}
.rightList-d2 {
  margin-top: 15px;
  position: relative;
}
img[class^="rightList-d2-img"] {
  width: 12px;
  position: absolute;
}
.rightList-d2-img-1 {
  top: 17px;
  left: 17px;
}
.rightList-d2-img-2 {
  top: 60px;
  left: 17px;
}
.rightList-d2-img-3 {
  top: 153px;
  left: 17px;
}
.rightList-d3 {
  margin-top: 14px;
  border-top: 1px solid #c0c4cc;
}
.rightList-d3 > h1 {
  width: 72px;
  font-size: 12px;
  display: block;
  margin: -9px auto 0px auto;
  background: #ffffff;
  padding: 0px 15px;
  color: #2f2f2f;
  font-weight: 100;
}
.rightList-d3 > div {
  height: 65px;
  overflow: hidden;
  margin-top: 5px;
}
.rightList-d3-marquee {
  margin-top: -350px;
}
.rightList-d3-p {
  width: 100%;
  height: 18px;
  overflow: hidden;
  color: #959595;
  font-size: 12px;
}
.rightList-d1 > div {
  font-size: 18px;
  font-weight: 600;
  padding: 0px 15px;
  float: left;
  margin-top: -3px;
}
.rightList-d2-input {
  width: 80%;
  height: 20px;
  padding: 5px 0px 5px 20%;
  margin: 7px auto;
  border: 1px solid #c0c4cc;
}
.rightList-d2-input-40px {
  height: 40px;
}
.rightList-d2-input:focus {
  /* border-color: #26a9e1; */
}
.rightList-d2-input:hover {
  border-color: #26a9e1;
  color: #959595;
}
.rightList-d2-input1 {
  width: 39%;
  height: 20px;
  padding: 5px 5%;
  margin: 7px auto;
  border: 1px solid #c0c4cc;
}
.rightList-d2-input1:focus {
  /* border-color: #26a9e1; */
}
.rightList-d2-input1:hover {
  border-color: #26a9e1;
  color: #959595;
}
.el-textarea__inner {
  border-radius: 0px;
}
.rightList-d2-but1 {
  width: 85px;
  padding: 7px 0px;
  text-align: center;
  color: #ffffff;
  border: 0px;
  font-size: 13px;
  margin-left: 5px;
  float: right;
  margin-top: 7px;
}
.rightList-d2-but1-huang {
  background: #ffa32b;
}
.rightList-d2-but1-hui {
  background: #959595;
}
.rightList-d2-but2 {
  width: 100%;
  text-align: center;
  padding: 7px 0px;
  background: #33cdf4;
  color: #ffffff;
  border: 0px;
  font-size: 13px;
  margin: 7px auto;
}
.rightList li {
  width: 204px;
  cursor: pointer;
  float: left;
  margin-bottom: 35px;
}
.rightList li img {
  display: block;
  float: left;
  margin-right: 15px;
}
.rightList li h1 {
  font-size: 18px;
  color: #eb7b03;
  padding-top: 10px;
}
.rightList li p {
  font-size: 12px;
  color: #2f2f2f;
  padding-top: 5px;
}
/*知识产品模块*/
.propertyRight {
  width: 100%;
  height: 328px;
  background-color: #ffffff;
  margin-top: 15px;
  padding-top: 40px;
}
.propertyRight .topx {
  width: 1066px;
  margin: 0 auto;
  text-align: center;
  background: url(~/static/img/xx.png) no-repeat;
  background-size: 100%;
  font-size: 20px;
  color: #26a9e1;
  line-height: 30px;
  font-weight: bold;
}
.propertyRight ul {
  margin-top: 45px;
}
.propertyRight ul li {
  width: 292px;
  text-align: center;
  float: left;
}
.propertyRight ul li img {
  display: block;
  margin: 0 auto;
  margin-bottom: 15px;
}
.propertyRight ul li h1 {
  color: #2f2f2f;
  font-size: 16px;
  margin-bottom: 15px;
}
.propertyRight ul li p {
  font-size: 14px;
  color: #959595;
  margin-bottom: 15px;
}
.propertyRight ul li p i {
  font-style: normal;
  color: #ff7c11;
  float: left;
  font-weight: bold;
  margin-left: 15px;
}
.propertyRight ul li p span {
  display: block;
  float: right;
  width: 77px;
  height: 20px;
  line-height: 20px;
  border-radius: 15px;
  color: #ff7c11;
  font-size: 12px;
  border: 1px solid #ff7c11;
  cursor: pointer;
  margin-top: -1px;
  margin-right: 15px;
}
.propertyRight ul li .detail {
  width: 200px;
  margin: 0 auto;
}
/*广告位*/
.advertisement {
  width: 100%;
  margin-top: 15px;
}
.advertisement img {
  width: 100%;
}

/*推荐商铺*/
.main-container {
  float: left;
  width: 100%;
}

.grid_content_1190 {
  width: 1170px;
  margin: 0 auto;
}
.t_shop_content {
  margin: 20px auto 0;
}

.t_shop {
  height: 400px;
}

.t_shop .floor_header {
  width: 100%;
  height: 40px;
  line-height: 40px;
}

.t_shop .floor_name {
  font-size: 16px;
  line-height: 40px;
}

.t_shop .hot_key_word {
  float: right;
  font-size: 14px;
  line-height: 25px;
  margin-top: 5px;
}
.t_shop .hot_key_word li {
  float: left;
  margin-left: 20px;
  cursor: pointer;
}
.t_shop .hot_key_word li.active {
  color: #26a9e1;
  border-bottom: 2px solid #26a9e1;
}
.t_shop .hot_key_word li:hover {
  color: #26a9e1;
}
.t_shop a {
  color: #666666;
  margin-right: 5px;
  line-height: 35px;
}

.t_shop .floor_body {
  width: 100%;
  height: 375px;
}

.t_shop .floor_body .big_banner {
  background-color: #ffffff;
  width: 235px;
  height: 500px;
  overflow: hidden;
  float: left;
  text-align: center;
}
.t_shop .floor_body .big_banner img {
  width: 235px;
  height: 500px;
  cursor: pointer;
}

.t_shop .floor_body .shop_con {
  width: 920px;
  height: 500px;
  background-color: #ffffff;
  float: right;
}
.t_shop .floor_body .shop_con .shop:hover {
  -moz-box-shadow: 0px 5px 13px #bdbdbd;
  -webkit-box-shadow: 0px 5px 13px #bdbdbd;
  box-shadow: 0px 5px 13px #bdbdbd;
}
.t_shop .floor_body .shop_con .shop {
  width: 184px;
  float: left;
  height: 220px;
  text-align: center;
  cursor: pointer;
  margin-top: 20px;
}

.t_shop .floor_body .shop_con .company_logo {
  width: 90%;
  height: 100px;
  margin: 45px auto 0;
}

.t_shop .floor_body .shop_con .company_logo img {
  max-width: 100%;
  max-height: 100px;
  padding: 0px 0px;
  margin: 0 auto;
}

.t_shop .floor_body .shop_con .company_name {
  height: 35px;
  line-height: 35px;
  margin-top: 10px;
  font-size: 12px;
}
.t_shop .floor_nahot_key_wordme {
  float: left;
  font-size: 18px;
  line-height: 40px;
  height: 42px;
  margin-bottom: 5px;
}
/*专利交易*/
.transaction {
  width: 100%;
  height: 270px;
}
.transaction .tLeft {
  width: 920px;
  background-color: #ffffff;
  float: left;
}
.transaction .tRight {
  background-color: #ffffff;
  width: 235px;
  height: 500px;
  overflow: hidden;
  float: right;
  text-align: center;
}
.transaction .tRight img {
  width: 235px;
  height: 500px;
  cursor: pointer;
}
.transaction .topx {
  width: 786px;
  margin: 0 auto;
  text-align: center;
  background: url(~/static/img/xty.png) no-repeat;
  background-size: 100%;
  font-size: 20px;
  color: #26a9e1;
  line-height: 30px;
  font-weight: bold;
  margin-bottom: 30px;
}
.transaction .tLeft ul {
  clear: both;
  width: 920px;
  height: 500px;
  margin: 0 auto;
}
.transaction .tLeft li {
  width: 160px;
  height: 220px;
  margin-left: 20px;
  margin-top: 20px;
  float: left;
  cursor: pointer;
}
.transaction .tLeft li:hover {
  -moz-box-shadow: 0px 5px 13px #bdbdbd;
  -webkit-box-shadow: 0px 5px 13px #bdbdbd;
  box-shadow: 0px 5px 13px #bdbdbd;
}
.transaction .tLeft li img {
  width: 160px;
  height: 160px;
  margin-bottom: 10px;
}
.transaction .tLeft li p {
  color: #2f2f2f;
  font-size: 14px;
  padding-left: 10px;
  margin-bottom: 10px;
  line-height: 14px;
}
.transaction .tLeft li .price {
  line-height: 20px;
}
.transaction .tLeft li .price i {
  font-style: normal;
  font-size: 12px;
  color: #ff7301;
  padding-left: 8px;
}
.gwc {
  width: 18px !important;
  height: 17px !important;
  display: block !important;
  float: right !important;
  margin-top: -20px;
  margin-right: 13px;
  display: none !important;
}
.transaction .tLeft li:hover .gwc {
  display: block !important;
}
/*新闻资讯*/
.news {
  width: 100%;
  height: 644px;
  background-color: #ffffff;
  margin-top: 15px;
  padding-top: 40px;
}
.news .topx {
  width: 1066px;
  margin: 0 auto;
  text-align: center;
  background: url(~/static/img/xt.png) no-repeat;
  background-size: 100%;
  font-size: 20px;
  color: #26a9e1;
  line-height: 30px;
  font-weight: bold;
}
.news .newsList {
  width: 1066px;
  margin: 0 auto;
  margin-top: 20px;
}
.news .newsList .left {
  width: 838px;
  float: left;
}
.news .newsList .left ul > li {
  padding: 10px;
  height: 152px;
  position: relative;
  cursor: pointer;
}
.news .newsList .left ul > li:hover {
  background-color: #f0f0f0;
}
.news .newsList .left .leftimg {
  display: block;
  float: left;
  width: 228px;
  height: 152px;
  margin-right: 15px;
}
.news .newsList .left h1 {
  font-size: 20px;
  color: #2f2f2f;
}
.news .newsList .left li a {
  float: left;
  display: block;
  width: 78px;
  height: 20px;
  line-height: 20px;
  text-align: center;
  color: #26a9e1;
  font-size: 12px;
  border: 1px solid #26a9e1;
  border-radius: 18px;
  position: absolute;
  left: 253px;
  bottom: 10px;
  cursor: pointer;
}
.news .newsList .left p {
  font-size: 12px;
  color: #959595;
  margin-top: 20px;
  line-height: 22px;
  max-height: 66px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.news .newsList .left .ly {
  width: 13px;
  height: 13px;
  margin-top: 5px;
}
.news .newsList .left .ll {
  width: 19px;
  height: 11px;
  margin-top: 5px;
}
.news .newsList .left .sj {
  width: 13px;
  height: 13px;
  margin-top: 4px;
}
.news .newsList .left ul > li ol {
  float: right;
  position: absolute;
  right: 10px;
  bottom: 10px;
}
.news .newsList .left ul > li ol li {
  float: left;
  margin-left: 25px;
}
.news .newsList .left ul > li ol li img {
  display: block;
  float: left;
}
.news .newsList .left ul > li ol li p {
  margin: 0;
  float: left;
  padding-left: 10px;
}
.news .right li {
  width: 208px;
  height: 155px;
  padding: 0 10px;
  padding-top: 17px;
}
.news .right li img {
  display: block;
  width: 208px;
  height: 138px;
}
.news .right {
  width: 228px;
  height: 564px;
  float: right;
}
#menu {
  width: 45px;
  height: auto;
  position: fixed;
  top: 202px;
  left: 50%;
  display: none;
  margin-left: -635px;
}
#menu ul {
  display: block;
  list-style: none;
}
#menu ul li {
  margin-top: 2px;
}
#menu ul li a {
  padding: 8px;
  width: 29px;
  line-height: 15px;
  font-size: 12px;
  text-align: center;
  background-color: #fff;
  color: #666666;
  display: block;
}
#menu ul li a:hover,
#menu ul li a.cur {
  background-color: #26a9e1;
  color: #fff;
}
.color_mark {
  font-size: 0;
  display: inline-block;
  width: 5px;
  background-color: #26a9e1;
  height: 20px;
  vertical-align: middle;
  margin-right: 5px;
}
</style>
