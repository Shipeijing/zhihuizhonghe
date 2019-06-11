<template>
  <div class="contentW">
    <div class="main">
      <div class="first-block-d1">
        <div><span style="color:#26a9e1;">托管</span>支付</div>
      </div>
      <div class="wBody">
        <div v-for="item in dataList" class="first-block-body">
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
              <tr>
                <th v-show="item.hostedType == 0">
                  类&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;别：
                </th>
                <td v-show="item.hostedType == 0" colspan="5">
                  {{ item.patentType }}
                </td>
                <td v-show="item.hostedType == 1" colspan="6">&nbsp;</td>
              </tr>
            </table>
          </div>
        </div>
        <div class="payment">
          <p>
            共计：<span>￥{{ gongji }}元</span>
          </p>
          <span>托管项目共计：{{ size }}个</span>
          <span>需缴纳托管费用：{{ hostingTotal }}元</span>
          <span>官费代缴共计：{{ paySize }}个</span>
          <span>需缴纳官费费用：{{ payTotal }}元</span>
        </div>
        <div class="clear"></div>
        <button class="pay" @click="goPay()">立即支付</button>
        <div class="clear"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Services from '../../store/services'
export default {
  beforeCreate () {
    this.$store.dispatch('setNavName', '托管订单')
  },
  data () {
    return {
      renzheng: '',
      dataList: [],
      size: 0,
      paySize: 0,
      hostingTotal: 0,
      payTotal: 0,
      gongji: 0,
    }
  },
  mounted () {
    this.hostedProjectListNoPay()
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
    goPay () {
      let data = []
      for (let i = 0; i < this.dataList.length; i++) {
        data.push(this.dataList[i].id)
      }
      const loading = this.$loading({
        lock: true,
        text: '等待支付',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let params = {
        subject: data
      }
      Services.recharge(params).then(response => {
        if (response.data.code == 200) {
          $('body').html(response.data.result)
        } else {
          loading.close();
        }
      })
    },
    hostedProjectListNoPay () {
      Services.hostedProjectListNoPay().then(response => {
        this.dataList = response.data.result
        this.size = response.data.size
        this.paySize = response.data.paySize
        this.hostingTotal = parseFloat(response.data.hostingTotal).toFixed(2)
        this.payTotal = parseFloat(response.data.payTotal).toFixed(2)
        this.gongji = parseFloat(this.hostingTotal + this.payTotal).toFixed(2)
      })
    },
  }
}
</script>
<style scoped>
.contentW .pay {
  float: right;
  border: 0px;
  background: #ffa32b;
  color: #ffffff;
  padding: 8px 45px;
  border-radius: 3px;
  margin-bottom: 10px;
  cursor: pointer;
}
.contentW .payment {
  width: 320px;
  border: 1px solid #f5f5f5;
  padding: 20px 20px 20px 10px;
  float: right;
  color: #959595;
  font-size: 12px;
  margin-bottom: 10px;
}
.contentW .payment > p > span {
  font-size: 14px;
  color: #ffa32b;
}
.contentW .payment > p {
  display: inline-block;
  width: 100%;
  text-align: right;
}
.contentW .payment > span {
  margin: 5px 0px 5px 5px;
  display: inline-block;
  width: 155px;
  text-align: right;
}
.contentW .price {
  display: inline-block;
  color: #ffa32b;
  font-size: 14px;
  width: 86%;
  text-align: right;
}
.contentW .ul-li-table th {
  width: 60px;
  font-size: 12px;
  text-align: left;
  color: #959595;
}
.contentW .ul-li-table td {
  font-size: 12px;
  color: #959595;
  min-width: 90px;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.contentW .ul-li-table {
  width: 520px;
  height: 90px;
  margin: 0px auto;
}
.contentW .li6 div {
  margin-left: 22px;
  margin-top: 10px;
  color: #2f2f2f;
  font-size: 12px;
  font-weight: 600;
}
.contentW .li6 {
  width: 50%;
  height: 130px;
  background: #f5f5f5;
  float: right;
}
.contentW .first-block-body > ul .li5 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.contentW .first-block-body > ul .li4 img {
  width: 12px;
  height: 12px;
  display: inline-block;
  padding-top: 2px;
}
.contentW .w-90 {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
}
.contentW .first-block-body > ul .li3 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.contentW .first-block-body > ul .li3 span {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.contentW .w-400 {
  width: 400px;
  padding: 5px 0px;
}
.contentW .first-block-body > ul .li2 {
  width: 400px;
  color: #2f2f2f;
  font-size: 14px;
  padding: 5px 0px;
  margin-top: 10px;
}
.contentW .first-block-body > ul .li2 span {
  width: 80%;
  display: inline-block;
}
.contentW .first-block-body > ul .li2 button {
  border: 0px;
  background: #fff6f6;
  color: #ffa32b;
  font-size: 12px;
}
.contentW .first-block-body > ul li {
  float: left;
  font-size: 12px;
  color: #959595;
}
.contentW .first-block-body > ul .i1 {
  width: 100px;
  height: 100px;
  margin: 15px;
}
.contentW .first-block-body > ul {
  width: 50%;
  height: 130px;
  background: #fafafa;
}
.contentW .first-block-body {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
}
.contentW .wBody {
}
.contentW {
  margin-top: 1px;
  background-color: #ffffff;
  min-height: 1000px;
}
.contentW .main {
  width: 1130px;
  margin: 0 auto;
  background-color: #ffffff;
  padding: 20px;
}
.contentW .first-block-d1 > div {
  font-size: 18px;
  font-weight: 600;
  padding: 0px 10px;
  float: left;
  margin-top: -3px;
  color: #2f2f2f;
}
.contentW .first-block-d1 {
  width: 140px;
  height: 18px;
  border-left: 4px solid #26a9e1;
  margin-bottom: 20px;
}
.clear {
  clear: both;
}
</style>
