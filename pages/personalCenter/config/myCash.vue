<template>
  <div class="right">
    <div class="title">
      <p>账户余额：<span>{{cash ? cash : 0}}</span>元</p>
      <span
        class="addBtn"
        v-on:click="showczBox = true"
      ><img src="~/static/img/i_cash_1.png" />立即充值</span>
      <span
        class="addBtn"
        v-on:click="showTxBox = true"
      ><img src="~/static/img/i_cash_3.png" />立即提现</span>
    </div>
    <div class="bottomLine"></div>
    <div class="topBodya">
      <p>账单</p>
      <div style="float:right">
        <el-date-picker
          v-model="selectDate"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions2"
          size="mini"
        >
        </el-date-picker>
        <el-button
          style="margin-left:15px"
          @click="search"
          type="primary"
          icon="search"
          size="mini"
        >查询</el-button>
      </div>
    </div>
    <div style="padding: 0 20px;">
      <el-table
        :data="walletList"
        style="width: 100%"
      >
        <el-table-column
          prop="id"
          label="订单号"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="cash"
          label="金额"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="useDesc"
          label="描述"
          align="center"
        >
        </el-table-column>
        <el-table-column
          prop="createDate"
          label="时间"
          align="center"
        >
        </el-table-column>
      </el-table>
      <div style="text-align: right;margin-top:20px;">
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
    <el-dialog
      title="支付宝充值金额"
      :visible.sync="showczBox"
      width="30%"
    >
      <el-input
        size="small"
        v-model="total_amount"
        placeholder="请填写充值金额"
      ></el-input>
      <span
        class="tipMsg"
        v-show="tipShow"
      >{{tipName}}</span>
      <el-input
        style="margin-top: 20px;"
        type="textarea"
        :rows="2"
        v-model="body"
        placeholder="请填写充值描述"
      ></el-input>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showczBox = false">取 消</el-button>
        <el-button
          type="primary"
          @click="walletRecharge"
        >确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="提现"
      :visible.sync="showTxBox"
      width="30%"
    >
      <p style="margin-bottom: 20px;">当前可提现金额：{{cash}}元;&nbsp;
        <span
          class="tipMsg"
          v-show="tipShow"
        >{{tipName}}</span>
      </p>
      <el-input
        size="small"
        v-model="amount"
        placeholder="请填写提现金额"
      ></el-input>

      <el-input
        size="small"
        style="margin-top: 20px;"
        v-model="payee_account"
        placeholder="请填写支付宝账号"
      ></el-input>
      <div class="c">
        <el-input
          v-model="verifyCode"
          type="text"
          size="small"
          placeholder="手机验证码"
        ></el-input>
        <button
          v-if="disabled"
          class="sendcode gray"
          :disabled="disabled"
          @click="sendVerifyCode"
        >{{sms}}</button>
        <button
          v-else
          class="sendcode"
          :disabled="disabled"
          @click="sendVerifyCode"
        >{{sms}}</button>
      </div>

      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="showTxBox = false">取 消</el-button>
        <el-button
          type="primary"
          @click="withdrawCash"
          :loading="withdrawCashLoading"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../../../store/services'
var timer = null
export default {
  async asyncData () {

  },
  data () {
    return {
      time: 60,
      sms: '发送验证码',
      verifyCode: '',
      disabled: false,
      pageNo: 1,
      max: 15,
      totalPage: 0,
      cash: 0,
      showjyBox: false,
      walletList: [],
      showczBox: false,
      showTxBox: false,
      total_amount: '',
      body: '',
      tipShow: false,
      tipName: '',
      payee_account: '',
      amount: '',
      pickerOptions2: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      selectDate: '',
      withdrawCashLoading: false
    }
  },
  head () {
    return {
      title: '智慧众合-我的钱包'
    }
  },
  mounted () {
    this.selfCurrentCash()
    this.getJyList()
  },
  methods: {
    selfCurrentCash () {
      Services.selfCurrentCash().then(response => {
        if (response.data.code == 200) {
          this.cash = response.data.result
        }
      })
    },
    getJyList () {
      let self = this
      let parmas = {
        pageNo: self.pageNo,
        max: self.max
      }
      if (self.selectDate) {
        parmas.startDate = getFormatDate('yyyy-MM-dd', self.selectDate[0])
        parmas.endDate = getFormatDate('yyyy-MM-dd', self.selectDate[1])
      }
      Services.walletDetailQuery(parmas).then(response => {
        if (response.data.code == 200) {
          self.walletList = response.data.result.walletCoList
          self.totalPage = Number(response.data.result.pageable.total);
        }
      })
    },
    walletRecharge () {
      let self = this
      if (!this.total_amount) {
        return false
      }
      var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/
      if (!reg.test(this.total_amount) || this.total_amount == 0) {
        self.tipShow = true
        self.tipName = '请填写正确的金额'
        return false
      }
      self.tipShow = false
      self.tipName = ''
      const loading = this.$loading({
        lock: true,
        text: '等待支付',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      let parmas = {
        total_amount: parseFloat(self.total_amount),
        subject: '充值',
        body: self.body ? self.body : ''
      }
      Services.walletRecharge(parmas).then(response => {
        if (response.data.code == 200) {
          $('body').html(response.data.result)
        } else {
          loading.close();
        }

      })
    },
    withdrawCash () {
      let self = this
      if (!this.amount || !this.payee_account) {
        self.tipShow = true
        self.tipName = '请输入提现金额及支付宝账号'
        return false
      }
      if (!this.verifyCode || this.verifyCode.length != 6) {
        self.tipShow = true
        self.tipName = '请输入6位短信验证码'
        return false
      }
      var reg = /(^[\-0-9][0-9]*(.[0-9]+)?)$/
      if (!reg.test(this.amount) || this.amount == 0) {
        self.tipShow = true
        self.tipName = '请填写正确的金额'
        return false
      }
      if (this.amount > this.cash || this.amount < 0.1) {
        self.tipShow = true
        self.tipName = '提现金额不能大于钱包余额，且至少提现0.1元'
        return false
      }
      self.tipShow = false
      self.tipName = ''
      let parmas = {
        payee_account: self.payee_account,
        amount: parseFloat(self.amount),
        verifyCode: self.verifyCode
      }
      this.withdrawCashLoading = true
      Services.withdrawCash(parmas).then(response => {
        if (response.data.code == 200) {
          self.amount = null
          self.payee_account = ''
          self.verifyCode = ''
          self.showTxBox = false
          self.$message.success(response.data.message)
        } else {
          self.$message.error(response.data.message)
        }
        self.withdrawCashLoading = false
        self.selfCurrentCash()
        self.getJyList()
      })
    },
    handlePageChange (val) {
      this.pageNo = val
      this.getJyList()
    },
    search () {
      this.getJyList()
    },
    sendVerifyCode () {
      let params = {}
      this.disabled = true
      let self = this
      Services.sendWithDrawVerifyCode(params).then(response => {
        if (response.data.code == 200) {
          this.$message.success('验证码发送成功')
          timer = setInterval(() => {
            console.log('timer--------------')
            if (self.time == 0) {
              clearInterval(timer)
              self.time = 60
              self.sms = '发送验证码'
              self.disabled = false
            } else {
              self.time = self.time - 1
              self.sms = '重新发送(' + self.time + ')'
            }
          }, 1000)
        } else {
          self.disabled = false
          self.tipShow = true
          self.tipName = response.data.message
          self.$message.error(response.data.message)
        }
      })
    }
  }
}
</script>
<style scoped>
.content {
  background-color: #eeeeee;
}
.content .main {
  width: 1170px;
  margin: 0 auto;
  padding-top: 15px;
}
/*右侧开始*/
.main .right {
  width: 940px;
  min-height: 500px;
  background-color: #ffffff;
  padding-bottom: 95px;
  margin-bottom: 15px;
}
.main .right .title {
  font-size: 0;
  line-height: 70px;
  padding: 0 20px;
}
.main .right .title p {
  display: inline-block;
  font-size: 18px;
  vertical-align: top;
  margin-right: 50px;
}
.main .right .title span {
  color: orange;
  font-weight: bold;
}
.main .right .bottomLine {
  height: 15px;
  background-color: #eeeeee;
}
.main .right .addBtn {
  height: 30px;
  display: inline-block;
  font-size: 13px;
  margin-left: 20px;
  vertical-align: middle;
  background-color: orange;
  color: #ffffff !important;
  line-height: 30px;
  padding: 0 10px;
  font-weight: normal !important;
  cursor: pointer;
}
.main .right .addBtn:last-child {
  background-color: white;
  color: #333333 !important;
  border: 1px solid #cccccc;
}
.main .right .addBtn img {
  display: inline-block;
  margin-top: 6px;
  margin-right: 5px;
}
.main .right .topBodya {
  padding: 0 20px;
  line-height: 50px;
  margin-bottom: 20px;
  box-shadow: 0px 3px 5px 0px rgba(238, 238, 238, 1);
}
.main .right .topBodya p {
  display: inline-block;
  font-size: 18px;
  vertical-align: top;
  margin-right: 50px;
}
.c {
  margin-top: 15px;
  position: relative;
}
.sendcode {
  position: absolute;
  background-color: #26a9e1;
  border: none;
  height: 100%;
  line-height: 100%;
  font-size: 12px;
  color: #ffffff;
  top: 0;
  right: 0;
}
.gray {
  background-color: #cccccc;
}
.tipMsg {
  color: red;
}
</style>
<style>
th {
  background-color: #efefef !important;
  text-align: center !important;
}
</style>