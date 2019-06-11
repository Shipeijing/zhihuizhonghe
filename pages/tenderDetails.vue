<template>
  <div>
    <div class="clear"></div>
    <div class="content2">
      <!-- 第一块 -->
      <div class="main">
        <div class="dingge">
          <div class="tender-h1-span">
            <h1>第一步:</h1>
            <span>选择对应招标的公司（可不选）</span>
          </div>
          <div class="centerCon">
            <ul class="tabs">
              <li
                v-for="(list, index) in productClassList"
                v-if="list.parentId == 0"
              >
                <a class="tab-link">{{ list.name }}:</a>
                <ul class="tabs2">
                  <li
                    v-for="(listlist, index) in productClassList"
                    v-if="list.id == listlist.parentId"
                    :class="secondClass == listlist.id ? 'active' : ''"
                    v-on:click="changeClassId(listlist.id)"
                  >
                    <p>{{ listlist.name }}</p>
                  </li>
                </ul>
              </li>
              <div class="clear"></div>
            </ul>
            <div class="clear"></div>
            <ul class="tabs3">
              <li
                v-for="(item, index) in shopList"
                v-on:click="selection(item.id, item.shopName, index)"
                v-show="index < 5"
              >
                <div class="shopImg">
                  <img :src="$store.state.baseImgUrl + item.shopLogo" />
                  <div class="checklist" v-if="item.isState == 1"></div>
                </div>
                <img
                  v-if="item.isState == 1"
                  src="~/static/img/zu.png"
                  alt=""
                />
              </li>
            </ul>
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
            <div class="isStateListName">
              <h1>您已选择:</h1>
              <span v-for="(item, index) in isStateListName"
                >{{ item }}
                <img
                  src="~/static/img/guanbi.png"
                  alt=""
                  @click="clearName(item)"
                />
              </span>
            </div>
          </div>
        </div>
      </div>
      <!-- 第二块 -->
      <div class="main">
        <div class="dingge">
          <div class="tender-h1-span">
            <h1>第二步:</h1>
            <span>填写招标信息</span>
          </div>
          <div class="tender-d2">
            <ul class="tender-d2-ul1">
              <li>
                <span class="tender-d2-ul1-span1">1</span>
                <span class="tender-d2-ul1-span2"
                  >提交信息
                  <p>在线提交招标信息</p></span
                >
              </li>
              <li>
                <img src="~/static/img/duibianxing.png" alt="" />
              </li>
              <li>
                <span class="tender-d2-ul1-span1">2</span
                ><span class="tender-d2-ul1-span2"
                  >信息审核
                  <p>审核招标信息</p></span
                >
              </li>
              <li>
                <img src="~/static/img/duibianxing.png" alt="" />
              </li>
              <li>
                <span class="tender-d2-ul1-span1">3</span
                ><span class="tender-d2-ul1-span2"
                  >对接资料
                  <p>对接招标详细内容</p></span
                >
              </li>
              <li>
                <img src="~/static/img/duibianxing.png" alt="" />
              </li>
              <li>
                <span class="tender-d2-ul1-span1">4</span
                ><span class="tender-d2-ul1-span2"
                  >招标结束
                  <p>招标流程结束</p></span
                >
              </li>
              <li>
                <img src="~/static/img/duibianxing.png" alt="" />
              </li>
              <li>
                <span class="tender-d2-ul1-span1">5</span
                ><span class="tender-d2-ul1-span2"
                  >对方对接
                  <p>双方进行接触</p></span
                >
              </li>
              <li>
                <img src="~/static/img/duibianxing.png" alt="" />
              </li>
              <li>
                <span class="tender-d2-ul1-span1">6</span
                ><span class="tender-d2-ul1-span2"
                  >通知公司
                  <p>通知招标公司</p></span
                >
              </li>
            </ul>
            <div class="clear"></div>
            <div style="margin-top:30px">
              <ul class="tender-d2-ul2">
                <li>
                  <img src="~/static/img/yonghunicheng.png" alt="" /><input
                    type="text"
                    v-model="tenderName"
                    @input="changeinputcolor"
                    :class="rightListd2input1"
                    placeholder="姓名"
                  />
                </li>

                <li>
                  <img src="~/static/img/shouji2.png" alt="" /><input
                    type="text"
                    :class="rightListd2input2"
                    v-model="mobilePhone"
                    @input="changeinputcolor"
                    placeholder="输入你的手机号"
                  />
                </li>

                <li>
                  <img src="~/static/img/gongsi.png" alt="" /><input
                    :class="rightListd2input3"
                    type="text"
                    v-model="company"
                    @input="changeinputcolor"
                    placeholder="公司名称"
                  />
                </li>

                <li>
                  <img src="~/static/img/youxiang.png" alt="" /><input
                    type="text"
                    :class="rightListd2input4"
                    @input="changeinputcolor"
                    v-model="email"
                    placeholder="邮箱"
                  />
                </li>

                <li>
                  <img src="~/static/img/riqi.png" alt="" />
                  <el-date-picker
                    v-model="startTime"
                    type="datetime"
                    placeholder="开始时间"
                  >
                  </el-date-picker>
                </li>
                <li style="padding-top:17px;color:#959595;">-</li>
                <li>
                  <img src="~/static/img/riqi.png" alt="" />
                  <el-date-picker
                    v-model="endTime"
                    type="datetime"
                    placeholder="结束时间"
                  >
                  </el-date-picker>
                </li>
                <li>
                  <img src="~/static/img/neirong.png" alt="" /><textarea
                    name=""
                    id=""
                    cols="30"
                    :class="rightListd2textarea"
                    rows="10"
                    v-model="tenderbody"
                    @input="changeinputcolor"
                    placeholder="请输入招标内容"
                  ></textarea>
                </li>
              </ul>
            </div>
          </div>
          <div class="clear"></div>
          <div class="tender-d3">
            <img src="~/static/img/laba.png" alt="" />
            <span>最新招标需求 :</span>
            <div class="clear"></div>
            <div class="tender-d3-gundong">
              <marquee
                height="200"
                class="rightList-d3-marquee"
                behavior="scroll"
                direction="up"
                scrolldelay="3000"
                scrollamount="32"
              >
                <p class="rightList-d3-p" v-for="item in gundong">
                  {{ item.mobilePhone + " " + item.tenderContent }}
                </p>
              </marquee>
            </div>
            <div class="clear"></div>
            <div class="tender-d3-d">
              <img src="~/static/img/yanzhengma.png" alt="" />
              <input
                type="text"
                :class="rightListd2input5"
                @input="changeinputcolor"
                v-model="yanzhengma"
                placeholder="请输入验证码"
              />
              <button
                :class="changecolor"
                :disabled="disabled"
                @click="sendVerifyCode"
              >
                {{ sms }}
              </button>
            </div>
          </div>
          <button class="tijiao" @click="Submission()">立即发布招标</button>
        </div>
      </div>
    </div>
    <div class="clear"></div>
  </div>
</template>
<script>
import Services from '../store/services'
var timer = null
export default {
  async asyncData () {
    let [data, resourceCategory] = await Promise.all([
      Services.getProductClass(),
      Services.getResourceCategoryList()
    ])
    return {
      productClassList: data.data.result.productClassList,
      resourceCategoryList: resourceCategory.data.result.resourceCategoryList
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '招标中心')
  },
  data () {
    return {
      rightListd2textarea: "rightList-d2-input-40px inputcolorbai",
      rightListd2input5: 'rightList-d2-input inputcolorbai',
      rightListd2input4: 'rightList-d2-input inputcolorbai',
      rightListd2input3: 'rightList-d2-input inputcolorbai',
      rightListd2input2: 'rightList-d2-input inputcolorbai',
      rightListd2input1: 'rightList-d2-input inputcolorbai',
      selectParentId: '',
      classId: '',
      shopList: [],
      serviceList: [],
      advertList: [],
      pageNo: 1,
      totalPage: 0,
      max: 5,
      secondClass: '',
      selectZyClass: '',
      zyTwoclassId: '',
      zyClassId: '',
      maxPrice: '',
      minPrice: '',
      isStateListName: [],
      isStateList: [],
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
      email: null,
      company: null,
      startTime: null,
      endTime: null,
      gundong: [],
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
    this.searchShop()
    this.searchService()
    this.gundongm()
  },
  methods: {
    clearName (item) {
      for (let i = 0; i < this.isStateListName.length; i++) {
        if (this.isStateListName[i] == item) {
          this.isStateListName.splice(i, 1)
          break
        }
      }
      for (let x = 0; x < this.shopList.length; x++) {
        if (this.shopList[x].shopName == item) {
          this.shopList[x].isState = 0
          for (let j = 0; j < this.isStateList.length; j++) {
            if (this.isStateList[j] == this.shopList[x].id) {
              this.isStateList.splice(j, 1)
              break
            }
          }
        }
      }
    },
    gundongm () {
      let params = {}
      Services.tenderList().then(response => {
        if (response.data.code == 200) {
          this.gundong = response.data.result
        }
      })
    },
    changeinputcolor () {
      let self = this
      if (self.tenderName != '' && self.tenderName != null) {
        self.rightListd2input1 = 'rightList-d2-input inputcolorhui'
      } else {
        self.rightListd2input1 = 'rightList-d2-input inputcolorbai'
      }
      if (self.mobilePhone != '' && self.mobilePhone != null) {
        self.rightListd2input2 = 'rightList-d2-input inputcolorhui'
      } else {
        self.rightListd2input2 = 'rightList-d2-input inputcolorbai'
      }
      if (self.company != '' && self.company != null) {
        self.rightListd2input3 = 'rightList-d2-input inputcolorhui'
      } else {
        self.rightListd2input3 = 'rightList-d2-input inputcolorbai'
      }
      if (self.email != '' && self.email != null) {
        self.rightListd2input4 = 'rightList-d2-input inputcolorhui'
      } else {
        self.rightListd2input4 = 'rightList-d2-input inputcolorbai'
      }
      if (self.yanzhengma != '' && self.yanzhengma != null) {
        self.rightListd2input5 = 'rightList-d2-input inputcolorhui'
      } else {
        self.rightListd2input5 = 'rightList-d2-input inputcolorbai'
      }
      if (self.tenderbody != '' && self.tenderbody != null) {
        self.rightListd2textarea = "rightList-d2-input-40px inputcolorhui"
      } else {
        self.rightListd2textarea = 'rightList-d2-input-40px inputcolorbai'
      }
    },
    Submission () {
      let self = this
      if (!self.mobilePhone || !self.tenderName || !self.yanzhengma || !self.tenderbody) {
        if (!self.mobilePhone) {
          self.$message.error('请输入手机号')
          return false
        }
        if (!self.tenderName) {
          self.$message.error('请设置姓名')
          return false
        }
        if (!self.yanzhengma) {
          self.$message.error('请输入验证码')
          return false
        }
        if (!self.tenderbody) {
          self.$message.error('请输入招标内容！')
          return false
        }
      }
      let params = {
        mobilePhone: self.mobilePhone,
        name: self.tenderName,
        verifyCode: self.yanzhengma,
        tenderContent: self.tenderbody,
        endTime: self.endTime,
        email: self.email,
        startTime: self.startTime,
        companyName: self.company,
        shopIds: self.isStateList,
        categoryId: self.secondClass
      }
      Services.saveTender(params).then(response => {
        if (response.data.code == 200) {
          self.tenderName = null
          self.tenderbody = null
          self.yanzhengma = null
          self.mobilePhone = null
          self.isStateList = []
          self.company = null
          self.startTime = null
          self.endTime = null
          self.email = null
          self.isStateListName = []
          self.secondClass = ''
          self.searchShop()
          self.$message.success('发布成功！我们会在24小时之内联系您！')
        } else {
          self.$message.error(response.data.message)
        }
      })
    },
    sendVerifyCode () {
      if (!this.mobilePhone) {
        this.$message.success('请输入手机号！')
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
    selection (id, item, i) {
      if (this.isStateList.length < 4) {
        if (this.shopList[i].isState == 0) {
          this.isStateList.push(id)
          this.isStateListName.push(item)
          this.shopList[i].isState = 1
        } else {
          this.shopList[i].isState = 0
          for (let i = 0; i < this.isStateList.length; i++) {
            if (this.isStateList[i] == id) {
              this.isStateList.splice(i, 1)
              this.isStateListName.splice(i, 1)
            }
          }
        }
      } else {
        if (this.shopList[i].isState == 1) {
          this.shopList[i].isState = 0
          for (let i = 0; i < this.isStateList.length; i++) {
            if (this.isStateList[i] == id) {
              this.isStateList.splice(i, 1)
              this.isStateListName.splice(i, 1)
            }
          }
        }
        if (this.isStateList.length >= 4) {
          this.$message.success("请勿选择超过4家企业或公司！")
        }
      }
    },
    //分页
    handlePageChange (val) {
      this.pageNo = val
      this.searchShop()
    },
    changeClassId (val) {
      this.secondClass = val
      this.searchShop()
    },
    tabsSwitch (id) {
      if (this.selectParentId != id) {
        this.secondClass = ''
        this.selectParentId = id
      }
    },
    searchService () {
      let params = {
        posCode: "1008"
      }
      Services.searchRecommendList(params).then(response => {
        if (response.data.code == 200) {
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
    searchShop () {
      let params = {
        max: this.max,
        pageNo: this.pageNo,
        order: "desc",
        enterIndustryCode: Number(this.secondClass),
      }
      Services.searchShop(params).then(response => {
        if (response.data.code == 200) {
          this.shopList = response.data.result.shopList
          this.totalPage = Number(response.data.result.pageable.total);
          for (let j = 0; j < this.isStateList.length; j++) {
            for (let i = 0; i < this.shopList.length; i++) {
              if (this.isStateList[j] == this.shopList[i].id) {
                this.shopList[i].isState = 1
              }
            }
          }
        }
      })
    },
  }
}
</script>
<style scoped>
.isStateListName {
  margin-top: 20px;
  color: #959595;
}
.isStateListName > h1 {
  font-size: 12px;
  display: inline;
  margin: 0px 20px;
}
.isStateListName > span {
  font-size: 12px;
  margin: 0px 10px;
}
.isStateListName > span > img {
  width: 12px;
  height: 12px;
  margin-top: 7px;
  margin-left: 10px;
  cursor: pointer;
}
.inputcolorhui {
  color: #606266;
}
.inputcolorbai {
  color: #d3d3d3;
}
.rightList-d2-but1 {
  width: 120px;
  padding: 8px 20px;
  color: #ffffff;
  border: 0px;
  float: right;
  margin-right: 10px;
  border-radius: 5px;
  margin-top: 10px;
}
.rightList-d2-but1-huang {
  background: #33cdf4;
}
.rightList-d2-but1-hui {
  background: #959595;
}
.tender-d3-d {
  position: relative;
  display: inline-block;
  float: right;
}
.tender-d3-d > img {
  width: 14px;
  height: 16px;
  position: absolute;
  top: 20px;
  left: 25px;
}

.tender-d3-d > input {
  width: 110px;
  padding: 10px 10px 10px 40px;
  margin: 10px 10px;
  border-radius: 5px;
  border: 0px;
  background: #f7f7f7;
}
.tijiao {
  padding: 7px 40px;
  color: #ffffff;
  background: #ffa32b;
  border: 0px;
  border-radius: 5px;
  display: block;
  margin: 20px auto;
}
.tender-d3 > span {
  height: 40px;
  font-size: 13px;
  color: #959595;
  margin-top: 21px;
  padding-left: 10px;
  display: inline-block;
}
.tender-d3-gundong {
  width: 500px;
  height: 30px;
  margin-top: 15px;
  margin-left: 10px;
  display: inline-block;
  overflow: hidden;
}
.rightList-d3-marquee {
  margin-top: -170px;
  font-size: 13px;
  color: #959595;
}
.rightList-d3-p {
  width: 100%;
  padding: 8px 0px;
  overflow: hidden;
  color: #959595;
  font-size: 12px;
}
.tender-d3 > img {
  width: 15px;
  height: 15px;
  margin-top: 23px;
  display: inline-block;
}
.tender-d3 {
  margin-top: 20px;
  margin-left: 10px;
  display: flex;
  flex-wrap: nowrap;
  justify-content: space-between;
}
.tender-d2-ul2 > li > img {
  width: 11px;
  height: 13px;
  position: absolute;
  top: 23px;
  left: 21px;
}
.rightList-d2-input-40px {
  width: 1030px;
  height: 40px;
  padding: 11px 10px 11px 30px;
  margin: 10px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
.el-date-editor.el-input,
.el-date-editor {
  width: 160px;
  margin: 10px 9px;
}
.el-input__inner {
  height: 20px;
  border: 0px;
  background: #f7f7f7;
  color: #d3d3d3;
  padding: 0px 10px 0px 40px;
}
.rightList-d2-input {
  width: 119px;
  padding: 11px 10px 11px 30px;
  margin: 10px 10px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
.tender-d2-ul2 > li {
  float: left;
  position: relative;
}
.tender-d2-ul1 > li {
  height: 35px;
  float: left;
  display: flex;
  flex-wrap: nowrap;
  margin: 0px 9px;
}
.tender-d2-ul1 > li > img {
  width: 10px;
  height: 10px;
  margin-top: 15px;
}
.tender-d2-ul1-span1 {
  display: block;
  background-color: #ffa32b;
  border-radius: 50%;
  padding: 8px 14px;
  color: #ffffff;
  font-weight: 900;
  font-family: "NSimSun";
}
.tender-d2-ul1-span2 {
  display: block;
  font-weight: 900;
  margin-left: 10px;
  font-family: "NSimSun";
}
.tender-d2-ul1-span2 > p {
  color: #959595;
  border-radius: 50%;
  font-size: 12px;
}
.tender-d2 {
  margin-top: 40px;
}
.shopImg {
  position: relative;
  border: 1px solid #ffffff;
}
.checklist {
  position: absolute;
  width: 180px;
  height: 180px;
  top: 0px;
  left: 0px;
  border: 1px solid #ffa32b;
  box-shadow: 0px 0px 10px #ffa32b;
}
.shopImg > img {
  width: 180px;
  height: 180px;
  display: block;
  margin: 0 auto;
  border: none;
}
.tabs3 {
  margin-top: 30px;
  padding: 0 20px;
}
.tabs3 > li {
  float: left;
  margin: 14px;
  position: relative;
}
.tabs3 > li > img {
  width: 30px;
  height: 30px;
  position: absolute;
  top: 152px;
  left: 152px;
}
.tabs2 {
}
.tabs2 > li {
  float: left;
  padding: 8px 10px;
  margin: 10px 10px;
  cursor: pointer;
}
.tabs {
  width: 100%;
  margin-top: 20px;
}
.tabs > li {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  border-bottom: 1px solid #e5e5e5;
}
.tab-link {
  width: 110px;
  height: auto;
  padding: 18px 10px;
  display: inline-block;
  font-weight: 600;
}
.tender-h1-span {
  width: 100%;
}
.tender-h1-span > h1 {
  width: 60px;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  padding: 5px 15px;
  border-radius: 20px;
  background-color: #33cdf4;
  display: inline;
  margin-right: 30px;
}
.tender-h1-span > span {
  color: #33cdf4;
}
.clear {
  clear: both;
}
.content2 {
  background-color: #eeeeee;
  min-height: 1000px;
  padding-bottom: 30px;
  margin: 0 auto;
}
.content2 .main {
  width: 1170px;
}
.main {
  background: #ffffff;
  margin: 0px auto;
}
.main:last-child {
  margin-top: 10px;
}
.dingge {
  padding: 40px;
}
.active {
  color: #33cdf4;
}
/*分页*/
.table-pagination {
  margin: 20px 0 0;
  text-align: center;
}
</style>
