<template>
  <div class="right orderDiv">
    <div class="top-operate">
      <!-- <el-form inline :model="searchForm" class="form-search">
          <el-form-item>
              <el-date-picker
                      v-model="searchForm.startTime"
                      type="datetime"
                      placeholder="开始时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-date-picker
                      v-model="searchForm.endTime"
                      type="datetime"
                      placeholder="结束时间">
              </el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button @click="search" type="primary" icon="search">查询</el-button>
          </el-form-item>
      </el-form> -->
    </div>
    <el-tabs v-model="activeName" @tab-click="selectOrderStatus">
      <el-tab-pane label="全部" name="00"></el-tab-pane>
      <el-tab-pane label="待付款" name="0"></el-tab-pane>
      <el-tab-pane label="待发货" name="1"></el-tab-pane>
      <el-tab-pane label="待确认" name="3"></el-tab-pane>
      <el-tab-pane label="已完成" name="6"></el-tab-pane>
    </el-tabs>
    <!-- 表格 -->
    <el-table
      class="table-data"
      :data="orderList"
      style="width: 100%;font-size:12px"
      v-loading="loading"
      element-loading-text="数据加载中..."
    >
      <el-table-column label="订单编号" width="140" prop="id">
      </el-table-column>
      <el-table-column label="商品信息">
        <template slot-scope="scope">
          <span
            style="margin-right: 10px"
            v-for="item in scope.row.orderDetails"
            >{{ item.productName }}</span
          >
        </template>
      </el-table-column>
      <el-table-column label="下单时间" width="160">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{
            new Date(scope.row.createTime)
              .toLocaleString()
              .replace(/:\d{1,2}$/, " ")
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单状态" width="90">
        <template slot-scope="scope">
          <div v-if="!scope.row.refundRecord.state">
            <el-tag size="mini" v-if="scope.row.state == 0" type="gray"
              >待付款</el-tag
            >
            <el-tag size="mini" v-if="scope.row.state == 1" type="primary"
              >待发货</el-tag
            >
            <el-tag size="mini" v-if="scope.row.state == 3" type="success"
              >待收货</el-tag
            >
            <el-tag size="mini" v-if="scope.row.state == 6" type="warning"
              >已完成</el-tag
            >
            <el-tag size="mini" v-if="scope.row.state == 9" type="danger"
              >已取消</el-tag
            >
          </div>
          <div v-if="scope.row.refundRecord.state">
            <el-tag
              size="mini"
              v-if="scope.row.refundRecord.state == 1"
              type="gray"
              >退款中</el-tag
            >
            <el-tag
              size="mini"
              v-if="scope.row.refundRecord.state == 2"
              type="primary"
              >同意退款</el-tag
            >
            <el-tag
              size="mini"
              v-if="scope.row.refundRecord.state == 3"
              type="success"
              >拒绝退款</el-tag
            >
            <el-tag
              size="mini"
              v-if="scope.row.refundRecord.state == 4"
              type="warning"
              >取消退款</el-tag
            >
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="totalPrice"
        label="订单金额"
        width="80"
      ></el-table-column>
      <el-table-column label="操作" width="220">
        <template slot-scope="scope">
          <el-tag
            class="button-tag"
            type="primary"
            size="mini"
            round
            @click.native="showDialogTable(scope.row.id)"
            >查看详情</el-tag
          >
          <el-tag
            class="button-tag"
            v-if="scope.row.state == 1"
            type="success"
            size="mini"
            round
            @click.native="deliverThisOrder(scope.row.id)"
            >一键发货</el-tag
          >
          <el-tag
            class="button-tag"
            v-if="scope.row.refundRecord.state == 1"
            type="danger"
            size="mini"
            round
            @click.native="showRefundConfirm(scope.row.refundRecord.id)"
            >订单退款</el-tag
          >
          <el-tag
            class="button-tag"
            v-if="scope.row.state == 0"
            type="danger"
            size="mini"
            round
            @click.native="showDialogTableWithEdit(scope.row.id)"
            >修改价格</el-tag
          >
        </template>
      </el-table-column>
    </el-table>
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
    <el-dialog
      title="订单详情"
      width="60%"
      :visible.sync="dialogTableVisible"
      @close="onDialogClose"
    >
      <div v-if="dialogTableVisible">
        <el-card class="box-card">
          <table class="detailTabe">
            <tr class="title">
              <td colspan="2">订单概况</td>
            </tr>
            <tr class="content">
              <td>订单编号：{{ orderDetail.id }}</td>
              <td>
                订单状态：
                <template>
                  <span v-if="orderDetail.state == 0" style="color: red"
                    >待付款</span
                  >
                  <span v-if="orderDetail.state == 1" style="color: red"
                    >待发货</span
                  >
                  <span v-if="orderDetail.state == 3" style="color: red"
                    >待收货</span
                  >
                  <span v-if="orderDetail.state == 6" style="color: red"
                    >已完成</span
                  >
                  <span v-if="orderDetail.state == 9" style="color: red"
                    >已取消</span
                  >
                </template>
              </td>
            </tr>
            <tr class="content">
              <td>下单时间：{{ orderDetail.createTime }}</td>
              <td>支付时间：{{ orderDetail.paymentTime }}</td>
            </tr>
            <tr class="content">
              <td>备注：{{ orderDetail.remark }}</td>
            </tr>
            <tr class="title">
              <td colspan="2">小计</td>
            </tr>
            <tr class="content">
              <td>金额：{{ orderDetail.totalPrice }}</td>
              <td>
                实付：<span style="color: red">{{
                  orderDetail.totalPrice
                }}</span>
              </td>
            </tr>
            <tr class="title">
              <td colspan="2">支付方式</td>
            </tr>
            <tr class="content">
              <td>
                支付方式：
                <template>
                  <span>支付宝</span>
                </template>
              </td>
            </tr>
            <tr class="title">
              <td colspan="2">买方信息</td>
            </tr>
            <tr class="content">
              <td>收货人：{{ orderDetail.address.contact }}</td>
              <td>联系电话：{{ orderDetail.address.mobilePhone }}</td>
            </tr>
            <tr class="content">
              <td colspan="2">配送地址：{{ orderDetail.address.detail }}</td>
            </tr>
            <tr class="title">
              <td colspan="2">主体信息</td>
            </tr>
            <tr class="content">
              <td>名称：{{ orderDetail.subject.subjectName }}</td>
              <td>类型：{{ orderDetail.subject.subjectType }}</td>
            </tr>
            <tr class="content">
              <td>联系人：{{ orderDetail.subject.subjectContact }}</td>
              <td>联系电话：{{ orderDetail.subject.subjectMobilePhone }}</td>
            </tr>
            <tr class="content">
              <td colspan="2">
                地址：{{
                  orderDetail.subject.subjectCity +
                    orderDetail.subject.subjectDetailAddress
                }}
              </td>
            </tr>
          </table>

          <el-table :data="orderDetail.orderDetails" style="width: 100%">
            <el-table-column label="商品名称">
              <template slot-scope="scope">
                <img
                  style="display: inline-block"
                  class="line-image"
                  :src="$store.state.baseImgUrl + scope.row.productImage"
                />
              </template>
            </el-table-column>
            <el-table-column property="productName"> </el-table-column>
            <el-table-column property="productTagName" label="规格">
            </el-table-column>
            <el-table-column
              v-if="isEditPrice === false"
              property="realPrice"
              label="单价"
            >
            </el-table-column>
            <el-table-column v-else label="单价">
              <template slot-scope="scope">
                <p>
                  <el-input
                    v-model="scope.row.realPrice"
                    placeholder="请输入内容"
                    size="mini"
                  ></el-input>
                </p>
              </template>
            </el-table-column>
            <el-table-column property="num" label="数量"> </el-table-column>
            <el-table-column label="商品总价">
              <template slot-scope="scope">
                <span>{{
                  parseFloat(scope.row.num * scope.row.realPrice).toFixed(2)
                }}</span>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              v-if="isEditPrice === true"
            >
              <template slot-scope="scope">
                <el-button
                  type="primary"
                  size="mini"
                  @click="changePrice(scope.row.id, scope.row.realPrice)"
                  >确定</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../../../store/services'
export default {
  async asyncData () {

  },
  data () {
    return {
      loading: false,
      searchForm: {
        startTime: '',
        endTime: ''
      },
      activeName: '00',
      //分页
      pageNo: 1,
      totalPage: 0,
      max: 20,
      isEditPrice: false,
      orderList: [],
      dialogTableVisible: false,
      orderDetail: {},
      changePriceLoading: false
    }
  },
  head () {
    return {
      title: '智慧众合-我的店铺'
    }
  },
  mounted () {
    this.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
    if (this.$store.state.roles && this.$store.state.roles.indexOf('ROLE_SHOP') > -1) {
      this.initPageData()
    } else {
      this.$router.push({ path: '/personalCenter/config/shopApply' })
      return
    }
  },
  methods: {
    selectOrderStatus () {
      this.pageNo = 1
      this.orderList = []
      this.initPageData()
    },
    search () {

    },
    handlePageChange () {

    },
    // handlePageChange(val) {
    //     this.pageNo = val
    //     this.initPageData({
    //       productClassId: this.searchForm.productClassId[1], 
    //       verifyStatus: this.searchForm.verifyStatus, 
    //       productStatus: this.searchForm.productStatus, 
    //       keyString: this.searchForm.keyString, 
    //       isEnable: this.searchForm.isEnable,
    //       pageNo: this.pageNo,
    //       max: this.max
    //     })
    // },
    // search() {
    //   const params = {
    //       productClassId: this.searchForm.productClassId[1], 
    //       verifyStatus: this.searchForm.verifyStatus, 
    //       productStatus: this.searchForm.productStatus, 
    //       keyString: this.searchForm.keyString, 
    //       isEnable: this.searchForm.isEnable
    //   }
    //   this.initPageData(params)
    // },
    initPageData (param) {
      this.loading = true
      this.goodsList = []
      if (param) {
        param.order = 'desc'
        param.max = this.max
      } else {
        var param = {
          order: 'desc',
          max: this.max
        }
      }
      if (this.activeName != '00') {
        param.state = Number(this.activeName)
      }
      param.pageNo = this.pageNo
      setTimeout(() => {
        Services.getShopOrderList(param).then(response => {
          if (response.data.code == 200) {
            this.orderList = response.data.result.ordersList
            this.totalPage = Number(response.data.result.pageable.totalPage)
          }
          this.loading = false
        })
      }, 300)
    },
    showDialogTable (id) {
      Services.getShopOrdersDetail(id).then(response => {
        if (response.data.code == 200) {
          this.orderDetail = response.data.result.orders[0]
        }
        this.dialogTableVisible = true
      })
    },
    showDialogTableWithEdit (id) {
      this.isEditPrice = true
      Services.getShopOrdersDetail(id).then(response => {
        if (response.data.code == 200) {
          this.orderDetail = response.data.result.orders[0]
        }
        this.dialogTableVisible = true
      })
    },
    deliverThisOrder (id) {
      this.$confirm('确认发货？')
        .then(_ => {
          Services.consignOrders(id).then(response => {
            if (response.data.code == 200) {
              this.$message.success('发货成功')
              this.initPageData()
            } else {
              this.$message.error(response.data.message)
            }
          })
        })
        .catch(_ => { });
    },
    showRefundConfirm (id) {
      let self = this
      self.$confirm('是否同意退款申请？', '确认信息', {
        distinguishCancelAndClose: true,
        confirmButtonText: '同意',
        cancelButtonText: '拒绝'
      })
        .then(() => {
          let param = {
            refundRecordId: id
          }
          Services.confirmRefund(param).then(response => {
            if (response.data.code == 200) {
              self.$message.success('提交成功')
              self.initPageData()
            } else {
              self.$message.error(response.data.message)
            }
          })
        })
        .catch(action => {
          if (action === 'cancel') {
            self.$prompt('请输入拒绝理由', '拒绝退款', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              inputErrorMessage: '请输入拒绝退款理由'
            }).then(({ value }) => {
              let param = {
                refundRecordId: id,
                refuseReason: value
              }
              Services.refuseRefund(param).then(response => {
                if (response.data.code == 200) {
                  self.$message.success('提交成功')
                  self.initPageData()
                } else {
                  self.$message.error(response.data.message)
                }
              })
            }).catch(() => {

            });
          }
        });
    },
    onDialogClose () {
      this.isEditPrice = false
    },
    changePrice (id, realPrice) {
      console.log(id)
      console.log(realPrice)
      let params = {
        realPrice: Number(realPrice)
      }
      Services.changeRealPrice(id, params).then(response => {
        if (response.data.code == 200) {
          this.$alert('价格修改成功', '修改成功', {
            confirmButtonText: '确定'

          });
          this.initPageData()
        } else {
          this.$message.error(response.data.message)
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
  width: 896px;
  min-height: 500px;
  float: left;
  background-color: #ffffff;
  padding: 22px 42px;
  padding-bottom: 95px;
  margin-bottom: 15px;
}
.shopInfo p {
  line-height: 50px;
}
.button-tag {
  cursor: pointer;
}
.detailTabe .title td {
  font-size: 16px;
  height: 45px;
  line-height: 45px;
  font-weight: bold;
}
.detailTabe .content td {
  width: 400px;
  height: 30px;
  line-height: 30px;
  background-color: #ffffff;
}
table.detailTabe {
  border-collapse: collapse;
}
table.detailTabe tr.title {
  border-top: 1px solid #efefef;
}
table.detailTabe tr.title:first-child {
  border-top: none;
}
</style>
<style lang="less">
.orderDiv {
  .button-tag {
    font-size: 11px;
    margin-right: 5px;
  }
  .el-dialog__body {
    padding: 5px 15px 20px;
  }
  .el-card__body {
    padding: 0 20px 20px;
  }
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
  .line-image {
    width: 50px !important;
    height: 50px !important;
  }
  .table-pagination {
    margin-top: 20px;
    text-align: right;
  }
  .form-search .el-form-item__content {
    width: 150px;
    margin-right: 20px;
  }
  .spanList span {
    display: inline-block;
    margin-right: 10px;
  }
}
</style>