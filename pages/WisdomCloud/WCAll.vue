<template>
  <div class="contentWC">
    <div class="main">
      <div class="header">
        <div class="first-block-d1">
          <div><span style="color:#26a9e1;">YUN</span>管家</div>
        </div>
        <span
          @click="hostedTypechange(1)"
          :class="hostedType == 1 ? 'active' : ''"
        >
          待支付
        </span>
        <span
          @click="hostedTypechange(2)"
          :class="hostedType == 2 ? 'active' : ''"
        >
          已托管
        </span>
        <span
          @click="hostedTypechange(3)"
          :class="hostedType == 3 ? 'active' : ''"
        >
          已过期
        </span>
        <span
          @click="hostedTypechange(4)"
          :class="hostedType == 4 ? 'active' : ''"
        >
          如何托管
        </span>
        <span
          @click="hostedTypechange(5)"
          :class="hostedType == 5 ? 'active' : ''"
        >
          托管费用
        </span>
        <h4 @click="open()">我要托管</h4>
      </div>
      <div class="box"></div>
      <div class="clear"></div>
      <div v-show="hostedType == 4" class="first-block">
        <div class="first-block-d1">
          <div><span style="color:#26a9e1;">托管</span>流程</div>
        </div>
        <div class="clear"></div>
        <div class="liucheng">
          <p>
            <strong>专利托管人在进行托管时请务必详细阅读以下内容：</strong
            ><br />
            1.托管人在进行专利托管时，请务必仔细填写专利和个人详细信息，平台会对提交信息进行审核，如若发现提交信息存在出入，将不会进行托管服务。同时请保持电话畅通，我们将会与您详细核对信息，保证托管的顺利进行。<br />
            2.托管费用属于透明化，网站计算费用是依据《智慧众合专利托管费用说明》，如果对托管费用存在疑问，可进行查看。<br />
            3.
            最后支付的费用为托管费用或者托管费用加官费。取决于您选择的托管类别，不同托管方式的费用不同。<br />
            4.专利托管后，平台会根据专利的申请和授权时间，提前一个月并且分多个频次进行提醒，直到完成续费操作。其中如果平台多次提醒，托管方仍未进行续费，该行为属于托管方自动放弃行为，与平台无关。如若在平台选择的是全权委托的方式，专利在应该续费期间，平台未帮助托管方进行续费，导致专利过期等后果，平台负全部责任。<br />
            注意：法定节假日、非工作时间年费缴纳可能出现异常，请合理安排时间进行费用缴纳，因此未能及时续费的，平台不承担任何责任。<br />
            5.在托管年限中，选择不同的年限时，需要将该年限的托管费用一次性缴纳；如果选择全权委托方式，需要将该年限的托管费用一次性缴纳，代缴的年费每年收取一次。<br />
            6.年费的收取是根据国家标准收取费用，平台不会恶意增加年费金额，托管人查看《2019专利年费和滞纳金说明》，平台收取年费根据国家标准随便变动，托管人如若有疑问可联系我们。<br />
            7.
            如果专利存在费用减缓，请在进行托管时认真选择费用减缓的类别，导致提交信息不符合查询的专利信息，平台将不接受该次托管。<br />
            8.当托管方提交的专利已经出现延迟续费，从而需要缴纳滞纳金时，如若需要平台代理缴纳滞纳金，请直接联系我们。如若不是，请自行缴纳滞纳金后再进行托管。<br />
            9.托管方托管专利不满一年时间的按照一年计算。<br />
            10.托管费用会根据当前的行业情况进行调整，作出调整时，平台会第一时间在平台上公布，同时会以短信的方式通知托管方。在价格变动之前，已经托管的专利，其价格不变，只针对调整之日后托管专利。<br />
          </p>
          <p><strong>专利费用减缓查询操作示例</strong></p>
          <p>第一步：登录http://cpservice.cnipa.gov.cn/index.jsp网址</p>
          <img style="margin-left:10%" src="~/static/wimg/w1.png" alt="" />
          <p>输入账号密码：账号 zhihui0550&nbsp;&nbsp;密码 zhihui0550</p>
          <p>第二步：同意责任声明</p>
          <img style="margin-left:10%" src="~/static/wimg/w2.png" alt="" />
          <img style="margin-left:10%" src="~/static/wimg/w3.png" alt="" />
          <p>登录后会出现如上声明，需同意才可进入</p>
          <p>第三步：专利事务服务系统</p>
          <img style="margin-left:10%" src="~/static/wimg/w4.png" alt="" />
          <img style="margin-left:10%" src="~/static/wimg/w5.png" alt="" />
          <p>
            同意后，我们进入专利事务服务系统，点击“业务办理”，进入费用减缓查询界面，点击费用减缓公共查询
          </p>
          <p>第四步：查询信息</p>
          <img style="margin-left:10%" src="~/static/wimg/w6.png" alt="" />
          <p>
            输入企业/申请人和统一社会信用代码/个人身份证号码，点击查询，即可出现如下费用减缓信息
          </p>
          <p>第五步：判断费减</p>
          <table
            style="margin-left:10%"
            border="1px"
            cellpadding="10"
            cellspacing="0"
          >
            <tr>
              <td>无备案信息</td>
              <td>无费用减缓</td>
            </tr>
            <tr>
              <td>备案信息显示合格</td>
              <td>存在费用减缓</td>
            </tr>
            <tr>
              <td>备案信息显示不合格</td>
              <td>费用减缓过期</td>
            </tr>
          </table>

          <p>
            如果显示有费用减缓，那么用户需要联系自己的专利代理人或者企业专利申请人，咨询费用减缓具体比例，费用减缓比例为85%或者70%。
          </p>
          <p>
            2016年10月1日起实施的，申请人是一个人或者一个单位的，费减比例是85%的费用，发明专利的实质审查费全部减免，申请人是2个人或者是2个以上单位的，费减比例是70%。
          </p>
        </div>
      </div>
      <div v-show="hostedType == 5" class="first-block">
        <div class="first-block-d1">
          <div><span style="color:#26a9e1;">托管</span>费用</div>
        </div>
        <div class="shopContentfooter">
          <p>
            智慧众合平台根据用户所托管专利进行收费，整个线上提交费用均根据此规则进行计算，如若发现费用计算错误请及时联系我们，我们将尽快解决问题，并如实落实费用。整个费用说明包括：托管费用说明、年费说明、滞纳金说明。电话：0550-3239005
          </p>
          <table border="1px" cellpadding="10" cellspacing="0">
            <tr>
              <th colspan="5">专利托管手续费用明细表</th>
            </tr>
            <tr>
              <th>托管方式</th>
              <th>手续费</th>
            </tr>
            <tr v-for="(item, index) in getFeiList.typePrice">
              <td>{{ item.hosted }}</td>
              <td>{{ item.noPaymentFee }}</td>
            </tr>
          </table>

          <p>
            注意：托管费用根据当前市场情况会作出调整，作出调整时，平台会第一时间在平台上公布，同时会以短信的方式通知托管方。在价格变动之前，已经托管的专利，其价格不变，只针对调整之日后托管专利。
          </p>
          <table border="1px" cellpadding="10" cellspacing="0">
            <tr>
              <th colspan="5">最新国家知识产权局国内专利收费标准</th>
            </tr>
            <tr>
              <th>类别</th>
              <th>名目</th>
              <th>金额（无费减）</th>
              <th>金额（费减70%）</th>
              <th>金额（费减85%）</th>
            </tr>
            <tr
              v-for="(item, index) in getFeiList.patent.patent1"
              v-if="index != 0"
            >
              <td rowspan="6" v-if="index == 1">
                {{ item.hosted }}
              </td>
              <td>第{{ item.betweenTime }}年年费</td>
              <td>{{ item.noPaymentFee }}</td>
              <td>{{ item.smallerPaymentFee }}</td>
              <td>{{ item.smallPaymentFee }}</td>
            </tr>
            <tr
              v-for="(item, index) in getFeiList.patent.patent2"
              v-if="index != 0"
            >
              <td rowspan="4" v-if="index == 1">{{ item.hosted }}</td>
              <td>第{{ item.betweenTime }}年年费</td>
              <td>{{ item.noPaymentFee }}</td>
              <td>{{ item.smallerPaymentFee }}</td>
              <td>{{ item.smallPaymentFee }}</td>
            </tr>
            <tr
              v-for="(item, index) in getFeiList.patent.patent3"
              v-if="index != 0"
            >
              <td rowspan="4" v-if="index == 1">{{ item.hosted }}</td>
              <td>第{{ item.betweenTime }}年年费</td>
              <td>{{ item.noPaymentFee }}</td>
              <td>{{ item.smallerPaymentFee }}</td>
              <td>{{ item.smallPaymentFee }}</td>
            </tr>
          </table>

          <p><strong>滞纳金说明</strong></p>
          <p>
            当您的专利已经超过官费缴纳时间，此时如果想要继续拥有专利，则需要缴纳滞纳金和官费。滞纳金收取如下<br />自专利缴费最后截止日期为准，其公式为：<br />
            第一个月不加费用<br />
            第二个月到第六个月分别为5%-10%-15%20%25%递增，只有6个月期限<br />
            滞纳金=不计算费用减缓官费x滞纳比例<br />
            示例：最后截止日期为2019.4.1 没有费用减缓时的年费800
          </p>
          <table border="1px" cellpadding="10" cellspacing="0">
            <tr>
              <th>月份</th>
              <th>计算</th>
              <th>滞纳金</th>
            </tr>
            <tr v-for="item in zhidata">
              <td>{{ item.y }}</td>
              <td>{{ item.j }}</td>
              <td>{{ item.z }}</td>
            </tr>
          </table>

          <p>超出6个月范围，属于自动放弃。</p>
          <table border="1px" cellpadding="10" cellspacing="0">
            <tr>
              <th colspan="5">商标托管收费明细表</th>
            </tr>
            <tr>
              <th>托管方式</th>
              <th>价格</th>
            </tr>
            <tr v-for="item in getFeiList.trademark">
              <td>{{ item.hosted }}</td>
              <td>{{ item.noPaymentFee }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div
        v-show="hostedType == 1 || hostedType == 2 || hostedType == 3"
        class="wBody"
      >
        <div
          v-for="(item, index) in dataList"
          @mouseover="openDiv = index"
          @mouseout="openDiv = null"
          class="first-block-body"
        >
          <ul>
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
                >认证状态：{{ renzheng }}</span
              ><img src="~/static/wimg/lianxi.png" alt="" /><span
                style="margin-left:8px;"
                >联系电话：{{ item.moblePhone }}</span
              >
            </li>
            <li class="li5 w-400">
              <img src="~/static/wimg/dizhi.png" alt="" /><span class="w-90">{{
                item.companyAddress
              }}</span>
            </li>
          </ul>
          <div class="li6">
            <div>
              <span style="color:#26a9e1;">托管</span>信息
              <p class="price">￥ {{ item.price }}元</p>
            </div>
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
              <tr v-show="hostedType == 1">
                <th v-show="item.hostedType == 0">
                  类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                </th>
                <td v-show="item.hostedType == 0" colspan="5">
                  {{ item.patentType }}
                </td>
                <th v-show="item.hostedType == 1" colspan="5">&nbsp;</th>
              </tr>
              <tr v-show="hostedType != 1">
                <th v-show="item.hostedType == 0">
                  类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                </th>
                <td v-show="item.hostedType == 0">
                  {{ item.patentType }}
                </td>
                <th>托管时间：</th>
                <td>{{ item.submitTime }}</td>
                <th v-show="item.hostedType == 0">结束时间：</th>
                <td v-show="item.hostedType == 0">{{ item.hostedEndTime }}</td>
              </tr>
            </table>

            <div class="openDiv" v-show="openDiv == index && hostedType != 2">
              <button @click="openDialog(item)" v-show="hostedType == 3">
                立即续费
              </button>
              <button @click="openDialog(item)" v-show="hostedType == 1">
                立即支付
              </button>
              <button @click="del(item.id)">删除</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-dialog
      title="支付托管"
      @open="getYear"
      @close="Initialization"
      :visible.sync="dialogVisible"
      width="1170px"
    >
      <div class="first-block-body">
        <ul>
          <li>
            <img
              class="i1"
              :src="$store.state.baseImgUrl + changeItem.image"
              alt=""
            />
          </li>
          <li class="li2 w-400">
            <span>{{ changeItem.companyName }}</span>
          </li>
          <li class="li3 w-400">
            <img src="~/static/wimg/ren.png" alt="" /><span
              >主体人：{{ changeItem.userName }}</span
            ><img src="~/static/wimg/shenqingren.png" alt="" /><span
              >申请人：{{ changeItem.applicationUserName }}</span
            >
          </li>
          <li class="li4 w-400">
            <img src="~/static/wimg/renzheng.png" alt="" /><span class="w-90"
              >认证状态：{{ renzheng }}</span
            ><img src="~/static/wimg/lianxi.png" alt="" /><span
              style="margin-left:8px;"
              >联系电话：{{ changeItem.moblePhone }}</span
            >
          </li>
          <li class="li5 w-400">
            <img src="~/static/wimg/dizhi.png" alt="" /><span class="w-90">{{
              changeItem.companyAddress
            }}</span>
          </li>
        </ul>
        <div class="li6">
          <div>
            <span style="color:#26a9e1;">托管</span>信息
            <p class="price">￥ {{ changeItem.price }}元</p>
          </div>
          <table class="ul-li-table">
            <tr>
              <th>托管类型：</th>
              <td v-if="changeItem.hostedType == 0">专利托管</td>
              <td v-else>商标托管</td>
              <th>编&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;号：</th>
              <td>{{ changeItem.patentCode }}</td>
              <th>授权时间：</th>
              <td>{{ changeItem.authorizationTime }}</td>
            </tr>
            <tr>
              <th>托管方式：</th>
              <td>{{ changeItem.hostedPayType }}</td>
              <th>名&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;称：</th>
              <td>{{ changeItem.patentName }}</td>
              <th v-show="changeItem.hostedType == 0">
                类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
              </th>
              <td v-show="changeItem.hostedType == 0">
                {{ changeItem.patentType }}
              </td>
            </tr>
            <tr v-show="hostedType == 1">
              <th>申请时间：</th>
              <td>{{ changeItem.applicationTime }}</td>
            </tr>
            <tr v-show="hostedType != 1">
              <th>申请时间：</th>
              <td>{{ changeItem.applicationTime }}</td>
              <th>托管时间：</th>
              <td>{{ changeItem.submitTime }}</td>
              <th>结束时间：</th>
              <td>{{ changeItem.hostedEndTime }}</td>
            </tr>
          </table>
        </div>
      </div>
      <div v-show="hostedType == 3" class="yearUp">
        <span style="margin:10px 20px;">请选择续费年限</span>
        <el-select
          v-model="yearUp"
          @change="ObtainP"
          :value="yearUp + '年'"
          placeholder="请选择"
        >
          <el-option
            v-for="item in nianxian"
            :key="item"
            :label="item + ' 年'"
            :value="item"
          >
          </el-option>
        </el-select>
        <span v-show="price != 0" style="margin:10px 20px;"
          >金额 : <strong style="color:#ffa32b;"> {{ price }}元</strong></span
        >
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button v-show="hostedType == 1" type="primary" @click="goPay()"
          >支 付</el-button
        >
        <el-button v-show="hostedType == 3" type="primary" @click="goPay()"
          >续 费</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Services from '../../store/services'
import services from '../../store/services';
export default {
  data () {
    return {
      zhidata: [{ y: '4.1-5.1', j: '无需', z: '0元' },
      { y: '5.1-6.1', j: '800*5%', z: '40元' },
      { y: '6.1-7.1', j: '800*10%', z: '80元' },
      { y: '7.1-8.1', j: '800*15%', z: '120元' },
      { y: '8.1-9.1', j: '800*20%', z: '160元' },
      { y: '9.1-10.1', j: '800*25%', z: '200元' }],
      hostedType: null,
      dataList: [],
      renzheng: '',
      openDiv: null,
      dialogVisible: false,
      changeItem: [],
      nianxian: 0,
      yearUp: null,
      price: 0,
      getFeiList: {
        patent: { patent1: [], patent2: [], patent3: [] },
        typePrice: {},
        trademark: {},
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '智慧云')
  },
  beforeMount () {
  },
  mounted () {
    this.hostedType = this.$route.query.i

    this.hostedTypechange(this.hostedType)
    this.getFei()
    let self = this
    self.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
    if (self.$store.state.roles && self.$store.state.roles.indexOf('ROLE_SELF') > -1) {
      self.renzheng = "已认证"
    }
    if (self.$store.state.roles && self.$store.state.roles.indexOf('ROLE_CO') > -1) {
      self.renzheng = "已认证"
    } else {
      self.renzheng = "未认证"
    }
  },
  methods: {
    getFei () {
      Services.getHostingFeeList().then(response => {
        this.getFeiList = response.data
      })
    },
    Initialization () {
      this.price = 0,
        this.nianxian = 0,
        this.yearUp = null
    },
    ObtainP () {
      Services.getHostedPayTypePrice({ hostedPayType: this.changeItem.hostedPayType }).then(response => {
        this.price = response.data.price * this.yearUp
      })
    },
    getYear () {
      if (this.hostedType == 3) {
        Services.getYear(this.changeItem.id).then(response => {
          this.nianxian = response.data.year
        })
      }
    },
    goPay () {
      if (this.yearUp != null || this.hostedType == 1) {
        let data = []
        data.push(this.changeItem.id)
        const loading = this.$loading({
          lock: true,
          text: '等待支付',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.7)'
        });
        if (this.hostedType == 3) {
          var params = {
            subject: data,
            year: Number(this.yearUp)
          }
        } else {
          var params = {
            subject: data
          }
        }
        Services.recharge(params).then(response => {
          if (response.data.code == 200) {
            $('body').html(response.data.result)
          } else {
            loading.close();
          }
        })      } else {
        this.$notify.error({
          title: '提示',
          duration: '2000',
          message: '请先选择续费年限！'
        });
      }
    },
    openDialog (item) {
      this.changeItem = item
      this.dialogVisible = true
    },
    del (id) {
      Services.deleteHostedProject(id).then(response => {
        if (response.data.code == 200) {
          this.hostedTypechange(this.hostedType)
          this.$notify({
            title: '提示',
            message: '删除成功！',
            duration: '1000',
            type: 'success'
          });
        } else {
          this.$notify.error({
            title: '提示',
            duration: '1000',
            message: '删除失败！请重试！'
          });

        }
      })
    },
    open () {
      var tempwindow = window.open();
      tempwindow.location = '/WisdomCloud/release'
    },
    hostedTypechange (i) {
      this.hostedType = i
      if (i == 1 || i == 2 || i == 3) {
        Services.searchHostedProject(i).then(response => {
          this.dataList = response.data.result
        })
      }
    },
  }
}
</script>
<style >
.yearUp {
  text-align: center;
}
.contentWC .el-dialog__footer {
  text-align: center;
}
.contentWC .openDiv {
  width: 160px;
  position: absolute;
  left: 67.7%;
  top: 92px;
}
.contentWC .el-button {
  width: 150px;
}
.contentWC .openDiv button {
  background: #26a9e1;
  color: #ffffff;
  padding: 5px 0px;
  width: 80px;
  text-align: center;
  color: #ffffff;
  border: 0px;
  cursor: pointer;
  font-size: 12px;
}
.contentWC .openDiv button:last-child {
  background: #f74141;
  padding: 5px 0px;
  width: 80px;
  text-align: center;
  color: #ffffff;
  border: 0px;
  float: right;
  cursor: pointer;
}
.contentWC .box {
  height: 2px;
  width: 100%;
  background: #eeeeee;
}
.clear {
  clear: both;
}
.contentWC .liucheng {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.contentWC .liucheng img {
  max-width: 80%;
}
.contentWC .liucheng p {
  width: 80%;
  line-height: 30px;
  margin: 10px auto;
  display: block;
}
.contentWC .shopContentfooter {
  padding: 30px 30px 10px 30px;
  height: auto;
}
.contentWC .shopContentfooter p {
  width: 685px;
  margin: 0px auto;
  display: block;
  text-indent: 2em;
}
.shopContentfooter table {
  margin: 20px auto;
  text-align: center;
  min-width: 685px;
}
.contentWC .del {
  color: #ffa32b;
  text-align: right;
  display: inline-block;
  float: right;
  cursor: pointer;
}
.contentWC .ul-li-table th {
  width: 60px;
}
.contentWC .ul-li-table {
  width: 520px;
  height: 90px;
  margin: 0px auto;
}
.contentWC .first-block-body > ul .li5 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.contentWC .first-block-body > ul .li4 img {
  width: 12px;
  height: 12px;
  display: inline-block;
  padding-top: 2px;
}
.contentWC .w-90 {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
}
.contentWC .first-block-body > ul .li3 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.contentWC .first-block-body > ul .li3 span {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
}
.contentWC .w-400 {
  width: 400px;
  padding: 5px 0px;
}
.contentWC .first-block-body > ul .li2 {
  width: 400px;
  color: #2f2f2f;
  font-size: 14px;
  padding: 5px 0px;
  margin-top: 10px;
}
.contentWC .first-block-body > ul .li2 span {
  width: 80%;
  display: inline-block;
}
.contentWC .first-block-body > ul li {
  float: left;
  font-size: 12px;
  color: #959595;
}
.contentWC .first-block-body > ul .i1 {
  width: 100px;
  height: 100px;
  margin: 10px;
}
.contentWC .first-block-body > ul {
  width: 550px;
  height: 240px;
  background: #fafafa;
  float: left;
  margin-bottom: 10px;
}
.contentWC .first-block-body {
  width: 100%;
  margin-top: 20px;
  margin-bottom: 10px;
}
.contentWC .first-block > .header {
  display: flex;
}
.contentWC .first-block-d1 > div {
  font-size: 18px;
  font-weight: 600;
  padding: 0px 10px;
  float: left;
  margin-top: -3px;
  color: #2f2f2f;
}
.contentWC .first-block-d1 {
  width: 140px;
  height: 18px;
  border-left: 4px solid #26a9e1;
}
.contentWC .first-block {
  margin-top: 10px;
  background: #ffffff;
  padding: 20px;
  min-height: 500px;
}

.contentWC .price {
  display: inline-block;
  color: #ffa32b;
  font-size: 14px;
  width: 86%;
  text-align: right;
}
.contentWC .ul-li-table th {
  width: 60px;
  font-size: 12px;
  text-align: left;
  color: #959595;
}
.contentWC .ul-li-table td {
  font-size: 12px;
  color: #959595;
  min-width: 90px;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.contentWC .ul-li-table {
  width: 520px;
  height: 90px;
  margin: 0px auto;
}
.contentWC .li6 div {
  margin-left: 22px;
  margin-top: 10px;
  color: #2f2f2f;
  font-size: 12px;
  font-weight: 600;
}
.contentWC .li6 {
  width: 50%;
  height: 130px;
  background: #f5f5f5;
  float: right;
  position: relative;
}
.contentWC .first-block-body > ul .li5 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.contentWC .first-block-body > ul .li4 img {
  width: 12px;
  height: 12px;
  display: inline-block;
  padding-top: 2px;
}
.contentWC .w-90 {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
}
.contentWC .first-block-body > ul .li3 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.contentWC .first-block-body > ul .li3 span {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.contentWC .w-400 {
  width: 400px;
  padding: 5px 0px;
}
.contentWC .first-block-body > ul .li2 {
  width: 400px;
  color: #2f2f2f;
  font-size: 14px;
  padding: 5px 0px;
  margin-top: 10px;
}
.contentWC .first-block-body > ul .li2 span {
  width: 80%;
  display: inline-block;
}
.contentWC .first-block-body > ul .li2 button {
  border: 0px;
  background: #fff6f6;
  color: #ffa32b;
  font-size: 12px;
}
.contentWC .first-block-body > ul li {
  float: left;
  font-size: 12px;
  color: #959595;
}
.contentWC .first-block-body > ul .i1 {
  width: 100px;
  height: 100px;
  margin: 15px;
}
.contentWC .first-block-body > ul {
  width: 50%;
  height: 130px;
  background: #fafafa;
}
.contentWC .first-block-body {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
}
.contentWC .wBody {
  padding: 20px;
  min-height: 500px;
}
.contentWC .active {
  color: #26a9e1;
  border-bottom: 2px solid #26a9e1;
}
.contentWC .header {
  display: flex;
  padding: 20px;
}
.contentWC .header > span {
  margin-right: 30px;
  padding: 5px 0px;
  font-size: 14px;
  cursor: pointer;
}
.contentWC .header h4 {
  color: #26a9e1;
  font-size: 14px;
  padding: 5px;
  float: right;
  display: inline-block;
  margin-left: 520px;
  cursor: pointer;
}
.contentWC .first-block-d1 > div {
  font-size: 18px;
  font-weight: 600;
  padding: 0px 10px;
  float: left;
  margin-top: -3px;
  color: #2f2f2f;
}
.contentWC .first-block-d1 {
  width: 130px;
  height: 18px;
  border-left: 4px solid #26a9e1;
  margin-top: 5px;
}
.contentWC {
  margin-top: 1px;
  background-color: #eeeeee;
  min-height: 1000px;
}
.contentWC .main {
  width: 1170px;
  margin: 0 auto;
  background: #ffffff;
}
</style>
