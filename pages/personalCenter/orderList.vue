<template>
  <div id="orderList" class="orderList">
		<div class="content">
			<div class="main">
				<div class="right">
					<h1>我的订单</h1>
					<ul class="navList">
						<li :class="active == '00' ? 'active' : ''" v-on:click="changeActive('00')">全部</li>
						<li :class="active == '0' ? 'active' : ''" v-on:click="changeActive('0')">待付款<span></span></li>
						<li :class="active == '1' ? 'active' : ''" v-on:click="changeActive('1')">待发货<span></span></li>
						<li :class="active == '3' ? 'active' : ''" v-on:click="changeActive('3')">待收货<span></span></li>
						<li :class="active == '6' ? 'active' : ''" v-on:click="changeActive('6')">已完成<span></span></li>
					</ul>
					<div class="clear"></div>
					<section class="orderList">
						<ul>
							<li>订单信息</li>
							<li>单价（元）</li>
							<li>数量</li>
							<li>总价（元）</li>
							<li>状态</li>
							<li>操作</li>
						</ul>
						<div v-for="(item,ind) in orderList">
							<div v-if="item.state == 0  && (ind == 0 || orderList[ind].tOrderNo != orderList[ind-1].tOrderNo)">
								<p><span>{{item.createTime}}</span>订单号：<span style="cursor: pointer" v-on:click="goOrderPay(item.tOrderNo)">{{item.tOrderNo}}</span></p>
								<div>
									<ul class="order" v-for="(li,index) in item.orderDetails">
										<li>
											<img :src="$store.state.baseImgUrl+li.productImage" />
											<p>{{li.productName}}<br/>规格：{{li.productTagName}}</p>
										</li>
										<li>￥{{li.realPrice}}</li>
										<li>x{{li.num}}</li>
										<li>￥{{li.realPrice*li.num}}</li>
										<li v-if="index == 0" class="orange">{{item.state == 0 ? '待付款' : (item.state == 1 ? '待发货' : (item.state == 3 ? '待收货' : (item.state == 6 ? '已完成' : '已取消')))}}</li>
										<li v-if="index == 0">
											<a class="button" v-on:click="goOrderPay(item.tOrderNo)">立即付款</a>
											<a v-on:click="cancelOrders(item.tOrderNo)" class="cancel">取消订单</a>
										</li>
									</ul>
								</div>
								<div v-for="(list,inde) in orderList" v-if="list.state == 0 && list.tOrderNo == item.tOrderNo && list.id != item.id" :key="list.tOrderNo">
									<ul class="order" v-for="goods in list.orderDetails" k:>
										<li>
											<img :src="$store.state.baseImgUrl+goods.productImage" />
											<p>{{goods.productName}}<br/>规格：{{goods.productTagName}}</p>
										</li>
										<li>￥{{goods.realPrice}}</li>
										<li>x{{goods.num}}</li>
										<li>￥{{goods.realPrice*goods.num}}</li>
									</ul>
								</div>
							</div>
							<div v-if="item.state != 0">
								<p><span>{{item.createTime}}</span>订单号：<span style="cursor: pointer" v-on:click="goOrderDetail(item.id)">{{item.id}}</span></p>
								<div>
									<ul class="order" v-for="(li,index) in item.orderDetails">
										<li>
											<img :src="$store.state.baseImgUrl+li.productImage" />
											<p>{{li.productName}}<br/>规格：{{li.productTagName}}</p>
										</li>
										<li>￥{{li.realPrice}}</li>
										<li>x{{li.num}}</li>
										<li>￥{{li.realPrice*li.num}}</li>
										<li v-if="index == 0" class="orange">{{item.refundRecord.state ? (item.refundRecord.state == 1 ? '退款中' : (item.refundRecord.state == 2 ? '同意退款' : (item.refundRecord.state == 3 ? '拒绝退款' : '取消退款'))) : (item.state == 0 ? '待付款' : (item.state == 1 ? '待发货' : (item.state == 3 ? '待收货' : (item.state == 4 ? '退款中' : (item.state == 6 ? '已完成' : '已取消')))))}}</li>
										<li v-if="index == 0">
                      <a v-if="item.canRefund" class="del" v-on:click="showRefundConfirm(item)">申请退款</a>
											<a v-if="item.refundRecord.state == 1" class="del" v-on:click="cancelRefund(item.refundRecord.id)">取消退款</a>
											<a v-if="li.evaluationStatus == 1" class="orange"  @click="openDialogFormVisible(li.orderDetailsId,li.productId,item.id)">立即评价</a>
											<a v-if="li.evaluationStatus == 2" class="del">已评价</a>
											<a v-if="li.evaluationStatus == 3" class="del">不可评价</a>
											<a v-if="item.state == 6 || item.state == 9" class="del" v-on:click="deleteOrders(item.id)">删除订单</a>
											<a v-if="item.state == 3" class="conf" v-on:click="confirmOrders(item.id)">确认收货</a>
											<!-- <a v-if="item.state == 6" class="button lan" href="javascript:;">立即评价</a> -->
										</li>
									</ul>
								</div>
							</div>
						</div>
						<div v-show="showMore" v-on:click="getOrderList()" class="lookMore">加载更多</div>
            <div class="noOrder" v-if="orderList.length<1">暂无订单信息</div>
					</section>
				</div>
        <el-dialog title="申请退款" :visible.sync="showRefundConfirmDialog">
          <el-form>
            <el-form-item label="订单编号：" :label-width="formLabelWidth">
              {{refundOrderInfo.id}}
            </el-form-item>
            <el-form-item label="实付金额：" :label-width="formLabelWidth">
              {{refundOrderInfo.totalPrice}}
            </el-form-item>
						<el-form-item label="退款原因：" :label-width="formLabelWidth">
              <el-select size="mini" v-model="selectRefundMsm" placeholder="选择退款原因" >
                  <el-option label="不想购买了" value="不想购买了"></el-option>
                  <el-option label="正常退款" value="正常退款"></el-option>
                  <el-option label="假冒资源" value="假冒资源"></el-option>
                  <el-option label="长时间未发货" value="长时间未发货"></el-option>
									<el-option label="与商品描述不一致" value="与商品描述不一致"></el-option>
                  <el-option label="其他原因" value="其他原因"></el-option>
              </el-select>
          	</el-form-item>
            <el-form-item label="退款说明：" :label-width="formLabelWidth">
              <el-input type="textarea" :rows="3" v-model="refundMsm"></el-input>
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="showRefundConfirmDialog = false">取 消</el-button>
            <el-button type="primary" @click="refundSubmit(refundOrderInfo.id)">确 定</el-button>
          </div>
        </el-dialog>
				<div class="clear"></div>
			</div>
		</div>
<el-dialog title="评价" :visible.sync="dialogFormVisible">
   <div class="xingxing">
		 <span>满意度：</span>
		 <div>
				 <img
           v-for="(item, index) in evaluate.evaluationGrade" @mouseover="changeinevaluationGrade(index+1)" src="~/static/img/shoucang1.png"  alt="" /></div>
          		 <div> <img
            v-for="(item, index) in 5"  @mouseover="changeinevaluationGrade(index+1)" src="~/static/img/shoucang.png" alt=""/></div>
	 </div>
	 <div class="el-textarea__inner-d">
<el-input type="textarea" v-model="evaluate.evaluationDetails" placeholder="评价内容"></el-input>
	 </div>
	 <el-form>
<el-form-item
        label="晒图："
        prop="images"
      >
        <el-upload
          :action="$store.state.baseImgUrl+'/api/upload/upload'"
          :headers="headers"
          name="imgFile"
          multiple
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-progress="uploadProgress"
          :on-remove="handleRemove"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :file-list="editFiles"
          :show-file-list="true"
          accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
        >
          <i class="el-icon-plus"></i>
        </el-upload>
      </el-form-item> 
			</el-form>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="submitP()">确 定</el-button>
  </div>
</el-dialog>

  </div>
</template>
<script>
import Services from '../../store/services'
export default {
  computed: { //返回富文本编辑内容
    editor () {
      return this.$refs.myTextEditor.quill
    },
    headers () {
      return {
        'Authorization': 'Bearer ' + this.$store.state.access_token
      }
    }
  },
  head () {
    return {
      title: '智慧众合-我的订单'
    }
  },
  data () {
    return {
      editFiles: [],// 编辑时已上传图片初始化
      dialogTableVisible: false,
      dialogFormVisible: false,
      active: '00',
      orderList: [],
      max: 10,
      pageNo: 0,
      showMore: false,
      total_num: 0,
      totalNum: '',
      showRefundConfirmDialog: false,
      refundOrderInfo: {},

      refundMsm: '',
      formLabelWidth: '120px',
      selectRefundMsm: '',
      imgP: '',
      uploadComplete: true, // 图片上传完成状态
      imgVisible: false, // 上传图片预览
      dialogImageUrl: '', // 图片预览地址
      evaluate: {
        ordersId: null,
        ordersDetailId: null,
        productId: null,
        evaluationGrade: 0,
        evaluationDetails: null,
        images: null,
      },
    }
  },
  mounted () {
    this.getOrderList()
  },
  methods: {
    submitP () {
      Services.insertReview(this.evaluate).then(response => {
        if (response.data.code == 200) {
          this.$message.success("评价成功！");
          this.dialogFormVisible = false,
            this.getOrderList()
        } else {
          this.$message.error("评价失败请重试！");
        }

      })
    },
    openDialogFormVisible (d, id, i) {
      this.dialogFormVisible = true
      this.evaluate.ordersDetailId = d
      this.evaluate.productId = id
      this.evaluate.ordersId = i
    },
    uploadProgress (event, file, fileList) {
      this.uploadComplete = false;
    },
    // 上传图片成功
    uploadSuccess (res, file, fileList) {
      this.uploadComplete = true;
      this.fileChange(fileList, res);
    },
    // 上传图片出错
    uploadError (err, file, fileList) {
      this.$message.error("上传出错");
    },
    // 移除图片
    handleRemove (file, fileList) {
      this.fileChange(fileList);
    },
    // 设置photo值
    fileChange (fileList, res) {
      let self = this
      let temp_str = '';
      if (fileList.length > 0) {
        for (let i = 0; i < fileList.length; i++) {
          if (fileList[i].response) {
            if (fileList[i].response.code === 200) {
              if (i === 0) {
                temp_str += fileList[i].response.result.image.thumbnail;
              } else {
                // 最终photo的格式是所有已上传的图片的url拼接的字符串（逗号隔开）
                temp_str += ',' + fileList[i].response.result.image.thumbnail;
              }
            }
          } else if (fileList[i].status && fileList[i].status === 'success') {
            if (i === 0) {
              temp_str += fileList[i].url.replace(self.$store.state.baseImgUrl, "");
            } else {
              temp_str += ',' + fileList[i].url.replace(self.$store.state.baseImgUrl, "");
            }
          }
        }
      }
      this.evaluate.images = temp_str;
    },
    // 图片预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.imgVisible = true;
    },


    changeinevaluationGrade (i) {
      this.evaluate.evaluationGrade = i
    },
    getOrderList () {
      let self = this
      self.pageNo += 1
      let params = {
        max: self.max,
        pageNo: self.pageNo,
        order: 'desc'
      }
      if (this.active != '00') {
        params.state = Number(this.active)
      }
      Services.listOrders(params).then(response => {
        if (response.data.code == 200) {
          self.totalNum = response.data.result.pageable.total
          if (self.pageNo >= response.data.result.pageable.totalPage) {
            self.showMore = false
          } else {
            self.showMore = true
          }
          response.data.result.ordersList.forEach(element => {
            self.orderList.push(element)
          });
        }
      })
    },
    changeActive (val) {
      if (this.active != val) {
        this.active = val
        this.pageNo = 0
        this.orderList = []
        this.getOrderList()
      }
    },
    cancelOrders (id) {
      Services.cancelOrders(id).then(response => {
        if (response.data.code == 200) {
          this.$message.success('订单取消成功')
          this.pageNo = 0
          this.orderList = []
          this.getOrderList()
        }
      })
    },
    deleteOrders (id) {
      this.$confirm('确认删除？')
        .then(_ => {
          Services.deleteOrders(id).then(response => {
            if (response.data.code == 200) {
              this.$message.success('删除成功')
              this.pageNo = 0
              this.orderList = []
              this.getOrderList()
            }
          })
        })
        .catch(_ => { });
    },
    goOrderPay (id) {
      this.$router.push({ path: '/orderDetail', query: { id: id } })
    },
    goOrderDetail (id) {
      this.$router.push({ path: '/orderDetail', query: { oid: id } })
    },
    showRefundConfirm (row) {
      this.refundMsm = ''
      this.selectRefundMsm = ''
      this.refundOrderInfo = row
      this.showRefundConfirmDialog = true
    },
    refundSubmit (id) {
      if (!this.selectRefundMsm) {
        this.$message.error('请选择退款原因')
        return false
      }
      let param = {
        ordersId: id,
        refundReason: '退款原因：' + this.selectRefundMsm + '; 退款说明：' + (this.refundMsm || '无')
      }
      Services.requestRefund(param).then(response => {
        if (response.data.code == 200) {
          this.$message.success('退款申请已提交')
          this.showRefundConfirmDialog = false
          this.pageNo -= 1
          this.orderList = []
          this.getOrderList()
        } else {
          this.$message.error(response.data.message)
        }
      })
    },
    cancelRefund (id) {
      this.$confirm('确认取消？')
        .then(_ => {
          let param = {
            id: id
          }
          Services.cancelRefund(param).then(response => {
            if (response.data.code == 200) {
              this.$message.success('提交成功')
              this.pageNo -= 1
              this.orderList = []
              this.getOrderList()
            } else {
              this.$message.error(response.data.message)
            }
          })
        })
        .catch(_ => { });
    },
    confirmOrders (id) {
      this.$confirm('确认收货？')
        .then(_ => {
          Services.confirmOrders(id).then(response => {
            if (response.data.code == 200) {
              this.$message.success('确认成功')
              this.pageNo -= 1
              this.orderList = []
              this.getOrderList()
            } else {
              this.$message.error(response.data.message)
            }
          })
        })
        .catch(_ => { });
    }
  }
}
</script>
<style scoped lang="scss">
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}

.el-textarea__inner-d {
  margin: 20px auto;
}
.xingxing {
  margin-top: 20px;
}
.xingxing > span {
  color: #606266;
  font-size: 14px;
}
.xingxing > div {
  position: absolute;
  left: 80px;
  top: 107px;
}
.xingxing > div > img {
  width: 14px;
  margin: 0px 3px;
  cursor: pointer;
}

.content {
  background-color: #ffffff;
}
.content .main {
  width: 1170px;
  margin: 0 auto;
  padding-top: 15px;
  padding-bottom: 100px;
}

/*右侧开始*/
.main .right {
  width: 1126px;
  background-color: #ffffff;
  padding: 22px;
  padding-bottom: 100px;
}
h1 {
  font-size: 16px;
  height: 30px;
  line-height: 30px;
  color: #26a9e1;
  border-left: 5px solid #26a9e1;
  padding-left: 15px;
}
.main .right .navList {
  margin-top: 25px;
  padding-left: 45px;
}
.main .right .navList li {
  float: left;
  font-size: 14px;
  color: #2c2c2c;
  padding: 0 10px;
  margin-right: 25px;
  line-height: 30px;
}
.main .right .navList li span {
  color: #ff7301;
}
.main .right .navList .active {
  border-bottom: 2px solid #26a9e1;
}
.main .right .orderList {
  margin-top: 25px;
}
.main .right .orderList ul {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background-color: #f6f6f6;
}
.main .right .orderList ul li {
  float: left;
  font-size: 14px;
  color: #2f2f2f;
  text-align: center;
}
.main .right .orderList ul li:nth-child(1) {
  width: 356px;
  padding-left: 44px;
}
.main .right .orderList ul li:nth-child(2) {
  width: 185px;
}
.main .right .orderList ul li:nth-child(3) {
  width: 76px;
}
.main .right .orderList ul li:nth-child(4) {
  width: 185px;
  padding-left: 25px;
}
.main .right .orderList ul li:nth-child(5) {
  width: 132px;
}
.main .right .orderList ul li:nth-child(6) {
  width: 90px;
  text-align: center;
}
.main .right .orderList p {
  font-size: 12px;
  color: #2f2f2f;
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}
.main .right .orderList span {
  display: inline-block;
  margin-right: 20px;
}
.main .right .order {
  width: 1090px !important;
  height: 72px !important;
  line-height: 72px !important;
  padding: 12px 20px;
}
.main .right .order img {
  width: 102px;
  height: 72px;
  display: block;
  float: left;
}
.main .right .order li {
  font-size: 12px !important;
  padding: 0 !important;
  line-height: 40px;
}
.main .right .order li:nth-child(1) {
  padding-right: 24px !important;
}
.main .right .order li:nth-child(4) {
  padding-left: 25px !important;
}
.main .right .order li:nth-child(6) {
  width: 90px;
  text-align: center;
}
.main .right .order li p {
  height: 72px !important;
  float: left !important;
  width: 230px;
  line-height: 16px;
  padding-top: 10px;
  text-align: left;
}
.main .right .order .button {
  display: block;
  width: 75px;
  height: 30px;
  font-size: 12px;
  text-align: center;
  margin: 0 auto;
  line-height: 30px;
  background: rgba(253, 136, 51, 1);
  border-radius: 6px;
  color: #ffffff;
  margin-top: 8px;
}
.main .right .order .lan {
  background: rgba(99, 168, 227, 1);
}
.main .right .order .cancel {
  width: 48px;
  height: 20px !important;
  font-size: 12px;
  font-family: MicrosoftYaHei;
  color: rgba(239, 26, 26, 1);
  line-height: 20px;
  display: block;
  margin: 0 auto;
  margin-top: 5px;
  cursor: pointer;
}
.navList {
  li {
    cursor: pointer;
  }
}
.lookMore {
  width: 100%;
  line-height: 50px;
  text-align: center;
  background-color: rgba(246, 246, 246, 1);
  color: #666;
  margin-top: 30px;
}
.noOrder {
  width: 100%;
  line-height: 50px;
  text-align: center;
  color: #666;
  margin-top: 30px;
}
.del {
  color: #666;
  display: block;
  cursor: pointer;
  margin-top: 10px;
  line-height: 20px;
}
.conf {
  color: #26a9e1;
  display: block;
  cursor: pointer;
  margin-top: 10px;
  line-height: 20px;
}
</style>
