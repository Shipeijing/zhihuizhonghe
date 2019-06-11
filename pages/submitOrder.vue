<style scoped lang="scss">
.submitOrder {
  width: 1162px;
  margin: 30px auto;
  .title {
    font-size: 18px;
    color: #666666;
    margin-bottom: 10px;
  }
  .userInfo {
    border: 1px solid #efefef;
    padding: 20px;

    p {
      font-size: 14px;
      font-weight: bold;
      span {
        font-size: 14px;
        display: inline-block;
        float: right;
        padding: 10px 20px;
        background: #f6f6f6;
        font-weight: normal;
        cursor: pointer;
      }
      span:hover {
        background: #26a9e1;
        color: #ffffff;
      }
    }
    .infoBox {
      border-bottom: 1px solid #efefef;
      margin-bottom: 20px;
      .addressItem {
        margin-top: 10px;
        span {
          display: inline-block;
          margin-right: 15px;
          font-size: 14px;
        }
        .box {
          border: 2px solid #efefef;
          text-align: center;
          min-width: 100px;
          line-height: 30px;
          border-radius: 5px;
        }
        .boxed {
          border: 2px solid #26a9e1 !important;
          background-image: url(../static/img/selectbg.png);
          background-repeat: no-repeat;
          background-position: top right;
        }
        .mr {
          background-color: #666666;
          font-size: 10px;
          color: #efefef;
        }
        .bj {
          font-size: 10px;
          color: #26a9e1;
          cursor: pointer;
        }
      }
      .adM {
        font-size: 10px;
        cursor: pointer;
        margin: 10px 0;
      }
    }
    .remark {
      margin: 20px 0 0;
    }
    .goodsList {
      background-color: rgba(246, 246, 246, 1);
      margin: 20px 0;
      div {
        padding: 15px;
        border-bottom: 1px solid #ffffff;
        span {
          display: inline-block;
          font-size: 14px;
          width: 20%;
          line-height: 70px;
          img {
            width: 70px;
            height: 70px;
          }
        }
        .s1 {
          text-align: left;
          width: 100%;
          font-size: 12px;
          margin-bottom: 15px;
          line-height: 15px;
        }
      }
    }
  }
  .price {
    text-align: right;
    margin: 20px 0;
    p {
      font-size: 14px;
      line-height: 30px;
      span {
        color: #fb400e;
        font-size: 20px;
      }
    }
    .button {
      width: 150px;
      background-color: #26a9e1;
      text-align: center;
      color: #ffffff;
      float: right;
      margin-top: 10px;
      line-height: 40px;
      cursor: pointer;
    }
  }
}
</style>
<template>
  <div class="submitOrder">
    <!-- {{orderGoodsList}} -->
    <div>
      <div class="title">填写并核对订单信息</div>
      <div class="userInfo">
        <p>
          寄送地址<span v-on:click="dialogFormVisible = true">+新增收件地址</span>
        </p>
        <div class="infoBox">
          <div
            v-if="item.id == isDefault"
            class="addressItem"
            v-for="(item, i) in addressData"
          >
            <span
              :class="selectAddress == item.id ? 'box boxed' : 'box'"
              v-on:click="changeAddress(item.id)"
            >{{ item.contact }}</span>
            <span>{{ item.contact }}</span>
            <span>{{ item.detail }}</span>
            <span>{{ item.mobilePhone }}</span>
            <span
              v-if="item.idDefault"
              class="mr"
            >默认地址</span>
            <span
              class="bj"
              v-on:click="editAddress(item)"
            >编辑</span>
          </div>
          <div
            v-show="showMoreAddress"
            v-if="item.id != isDefault"
            class="addressItem"
            v-for="(item, i) in addressData"
          >
            <span
              :class="selectAddress == item.id ? 'box boxed' : 'box'"
              v-on:click="changeAddress(item.id)"
            >{{ item.contact }}</span>
            <span>{{ item.contact }}</span>
            <span>{{ item.detail }}</span>
            <span>{{ item.mobilePhone }}</span>
            <span
              class="bj"
              v-on:click="editAddress(item)"
            >编辑</span>
          </div>
          <div
            class="adM"
            v-on:click="addressMore()"
          >
            <i :class="
                showMoreAddress ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
              "></i>{{ showMoreAddress ? "收起地址" : "更多地址" }}
          </div>
        </div>
        <p>
          主体信息<span v-on:click="dialogVisible1 = true">+添加合约主体</span>
        </p>
        <div class="infoBox">
          <div
            v-if="zhuangtai == true"
            style="color:red;text-align: center"
          >
            请先添加主体信息！
          </div>
          <div
            v-if="i == 0"
            class="addressItem"
            v-for="(item, i) in subjectList"
          >
            <span
              :class="selectSubject == item.id ? 'box boxed' : 'box'"
              v-on:click="changeSubject(item.id, item.type)"
            >{{ item.name }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.type == 0 ? "个人" : "企业" }}</span>
            <span>{{ item.detailAddress }}</span>
            <span>{{ item.mobilePhone }}</span>
            <span
              class="bj"
              v-on:click="editSubjsct(item)"
            >编辑</span>
          </div>
          <div
            v-show="showMoreSubject"
            v-if="i != 0"
            class="addressItem"
            v-for="(item, i) in subjectList"
          >
            <span
              :class="selectSubject == item.id ? 'box boxed' : 'box'"
              v-on:click="changeSubject(item.id, item.type)"
            >{{ item.name }}</span>
            <span>{{ item.name }}</span>
            <span>{{ item.type == 0 ? "个人" : "企业" }}</span>
            <span>{{ item.detailAddress }}</span>
            <span>{{ item.mobilePhone }}</span>
            <span
              class="bj"
              v-on:click="editSubjsct(item)"
            >编辑</span>
          </div>
          <div
            class="adM"
            v-on:click="subjectMore()"
          >
            <i :class="
                showMoreSubject ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
              "></i>{{ showMoreSubject ? "收起主体" : "更多主体" }}
          </div>
        </div>
        <p>产品清单</p>
        <div class="goodsList">
          <div v-for="item in orderGoodsList">
            <span class="s1">商家：{{ item.shopName }}</span><br />
            <span><img :src="$store.state.baseImgUrl + item.defalutImage" /></span>
            <span>{{ item.productName }}</span>
            <span>{{ item.productTagName }}</span>
            <span>￥{{ item.currentPrice }}</span>
            <span>×{{ item.num }}</span>
          </div>
        </div>
        <p>备注信息</p>
        <div class="remark">
          <el-input
            type="textarea"
            autosize
            placeholder="请输入备注信息"
            v-model="remark"
          >
          </el-input>
        </div>
      </div>
      <div class="price">
        <p>
          <i><span>{{ orderGoodsList.length }}</span>件商品</i>
        </p>
        <p>
          <i>应付总额：<span>￥{{ totalPrice }}</span></i>
        </p>
        <p
          class="button"
          v-on:click="submit()"
        >提交订单</p>
        <div style="clear: both"></div>
      </div>
    </div>
    <el-dialog
      :title="isEdit ? '修改收件地址' : '新增收件地址'"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="form"
        :rules="fromRules"
        ref="addressFrom"
      >
        <el-form-item
          label="联系人姓名"
          :label-width="formLabelWidth"
          prop="contact"
        >
          <el-input
            size="small"
            v-model="form.contact"
            placeholder="请填写联系人姓名"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系地址"
          :label-width="formLabelWidth"
          prop="cityCode"
        >
          <el-cascader
            size="small"
            :options="options"
            v-model="form.cityCode"
          ></el-cascader>
          <el-input
            size="small"
            style="margin-top:20px"
            v-model="form.detail"
            placeholder="请填写详细地址"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="联系电话"
          :label-width="formLabelWidth"
          prop="mobilePhone"
        >
          <el-input
            size="small"
            v-model="form.mobilePhone"
            placeholder="请填写联系电话"
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="dialogFormVisible = false"
        >取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click="submitData('addressFrom')"
        >确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog
      title="编辑主体"
      :visible.sync="dialogVisible"
    >
      <el-form
        :model="subjectForm"
        :rules="subjectFromRules"
        ref="subjectFrom"
      >
        <el-form-item
          prop="name"
          v-if="editSubjectType == 0"
          label="名称"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="subjectForm.name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          v-if="editSubjectType == 1"
          label="企业名称"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="subjectForm.name"
            placeholder="请输入企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="idCard"
          v-if="editSubjectType == 0"
          label="身份证号码"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="subjectForm.idCard"
            placeholder="请输入身份证号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="businessLicense"
          v-if="editSubjectType == 1"
          label="营业执照号码"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="subjectForm.businessLicense"
            placeholder="请输入营业执照号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="contact"
          label="联系人"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="subjectForm.contact"
            placeholder="请输入企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="mobilePhone"
          label="手机号码"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="subjectForm.mobilePhone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="cityCode"
          label="详细地址"
          :label-width="formLabelWidth"
        >
          <el-cascader
            size="small"
            :options="options"
            v-model="subjectForm.cityCode"
          ></el-cascader>
          <el-input
            size="small"
            style="margin-top:20px"
            v-model="subjectForm.detailAddress"
            placeholder="请填写详细地址"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="phoneCode"
          label="固话"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="subjectForm.phoneCode"
            placeholder="请输入固定电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="电子邮件"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="subjectForm.email"
            placeholder="请输入电子邮件"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click.native="submitSubjectData('subjectFrom')"
        >确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="新增主体"
      :visible.sync="dialogVisible1"
      :before-close="handleClose"
    >
      <el-form
        :model="form1"
        :rules="fromRules"
        ref="subjectFrom1"
      >
        <el-radio-group
          class="marginauto"
          v-model="activeName"
        >
          <el-radio-button label="添加个人主体"></el-radio-button>
          <el-radio-button label="添加企业主体"></el-radio-button>
        </el-radio-group>
        <el-form-item
          prop="name"
          v-if="activeName == '添加个人主体'"
          label="名称"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form1.name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          v-if="activeName == '添加企业主体'"
          label="企业名称"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form1.name"
            placeholder="请输入企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="idCard"
          v-if="activeName == '添加个人主体'"
          label="身份证号码"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form1.idCard"
            placeholder="请输入身份证号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="businessLicense"
          v-if="activeName == '添加企业主体'"
          label="营业执照号码"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form1.businessLicense"
            placeholder="请输入营业执照号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="contact"
          label="联系人"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form1.contact"
            placeholder="请输入企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="mobilePhone"
          label="手机号码"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form1.mobilePhone"
            placeholder="请输入手机号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="cityCode"
          label="详细地址"
          :label-width="formLabelWidth"
        >
          <el-cascader
            size="small"
            :options="options"
            v-model="form1.cityCode"
          ></el-cascader>
          <el-input
            size="small"
            style="margin-top:20px"
            v-model="form1.detailAddress"
            placeholder="请填写详细地址"
            auto-complete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="phoneCode"
          label="固话"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form1.phoneCode"
            placeholder="请输入固定电话号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="email"
          label="电子邮件"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form1.email"
            placeholder="请输入电子邮件"
          ></el-input>
        </el-form-item>
      </el-form>
      <span
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          size="small"
          @click="dialogVisible1 = false"
        >取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click.native="submitData1()"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Services from '../store/services'
export default {
  beforeCreate () {
    this.$store.dispatch('setNavName', '提交订单')
  },
  head () {
    return {
      title: '智慧众合-' + this.$store.state.navName,
    }
  },
  data () {
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请填写联系电话'));
      }
      if (value.length != 11) {
        return callback(new Error('请填写正确的手机号码'));
      }
      var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1})|(19[0-9]{1}))+\d{8})$/
      if (!myreg.test(value)) {
        return callback(new Error('请填写正确的手机号码'));
      }
      callback();
    };
    return {
      dialogVisible1: false,
      addressData: [],
      orderGoodsList: [],
      selectAddress: '',
      isDefault: '',
      showMoreAddress: false,
      formLabelWidth: '120px',
      form: {
        contact: '',
        cityCode: [],
        detail: '',
        mobilePhone: ''
      },
      form1: {
        name: '',
        idCard: '',
        businessLicense: '',
        contact: '',
        phoneCode: '',
        detailAddress: '',
        mobilePhone: '',
        cityCode: [],
        email: ''
      },
      options: [],
      dialogFormVisible: false,
      isEdit: false,
      fromRules: {
        contact: [
          { required: true, message: '请填写联系人姓名', trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请填写联系电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        cityCode: [
          { required: true, message: '请填写收件地址', trigger: 'blur' }
        ]
      },
      editId: '',
      activeName: '添加个人主体',
      subjectList: [],
      selectSubject: '',
      selectSubjectType: '',
      showMoreSubject: false,
      dialogVisible: false,
      zhuangtai: false,
      subjectForm: {
        name: '',
        idCard: '',
        businessLicense: '',
        contact: '',
        phoneCode: '',
        detailAddress: '',
        mobilePhone: '',
        cityCode: [],
        email: ''
      },
      subjectFromRules: {
        name: [
          { required: true, message: '请填写名称', trigger: 'blur' }
        ],
        idCard: [
          { required: true, message: '请填写身份证号', trigger: 'blur' }
        ],
        businessLicense: [
          { required: true, message: '营业执照号码', trigger: 'blur' }
        ],
        contact: [
          { required: true, message: '请填写联系人姓名', trigger: 'blur' }
        ],
        mobilePhone: [
          { required: true, message: '请填写联系电话', trigger: 'blur' },
          { validator: checkPhone, trigger: 'blur' }
        ],
        cityCode: [
          { required: true, message: '请填写收件地址', trigger: 'blur' }
        ]
      },
      editSubjectId: '',
      editSubjectType: '',
      remark: '',
      totalPrice: 0,
      ids: []
    }
  },
  watch: {
    subjectList () {
      if (this.subjectList == '') {
        this.zhuangtai = true
      } else {
        this.zhuangtai = false
      }
    },
    dialogVisible1 () {
      let self = this
      if (self.dialogVisible1 == true) {
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
                } else if (item.level == 2) {
                  self.options.forEach(function (a) {
                    for (var i in a.children) {
                      if (item.parentId == a.children[i].id) {
                        var s = { value: item.code, label: item.name, id: item.id }
                        if (a.children[i].children) {
                          a.children[i].children.push(s)
                        } else {
                          a.children[i].children = [{ value: item.code, label: item.name, id: item.id }]
                        }
                        break
                      }
                    }
                  })
                }
              })
              localStorage.setItem('cityCedeList', JSON.stringify(self.options))
            }
          })
        }
      } else {
        this.restData1()
      }
    },
    dialogFormVisible () {
      let self = this
      if (self.dialogFormVisible == true) {
        self.getAddressData()
      } else {
        this.isEdit = false
        this.restData()
      }
    },
    dialogVisible () {
      let self = this
      if (self.dialogVisible == true) {
        self.getAddressData()
      } else {
        this.restSubjectData()
      }
    }
  },
  mounted () {
    if (localStorage.getItem('orderInfo')) {
      this.orderGoodsList = JSON.parse(localStorage.getItem('orderInfo')).goods
      this.totalPrice = JSON.parse(localStorage.getItem('orderInfo')).orderPrice
      this.ids = JSON.parse(localStorage.getItem('orderInfo')).ids
      this.getAddressList()
      this.getSubject()
    } else {
      this.$message.error('无效的商品信息')
      this.$router.go(-1)
    }
  },
  methods: {
    restData1 () {
      this.form1 = {
        name: '',
        idCard: '',
        businessLicense: '',
        contact: '',
        phoneCode: '',
        detailAddress: '',
        mobilePhone: '',
        cityCode: [],
        email: '',
        isEdit: false
      }
      this.$refs['subjectFrom1'].resetFields();
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    submitData1 () {
      let _this = this
      let params = {
        name: _this.form1.name,
        idCard: _this.form1.idCard,
        businessLicense: _this.form1.businessLicense,
        contact: _this.form1.contact,
        phoneCode: _this.form1.phoneCode,
        detailAddress: _this.form1.detailAddress,
        mobilePhone: _this.form1.mobilePhone,
        cityCode: _this.form1.cityCode[_this.form1.cityCode.length - 1],
        email: _this.form1.email
      }
      if (_this.activeName == '添加个人主体') {
        Services.addSubjectSelf(params).then(response => {
          if (response.data.code == 200) {
            _this.$message.success('个人主体添加成功')
            _this.dialogVisible1 = false
            _this.getSubject()
          } else {
            _this.$message.error(response.data.result.errors[0].message)
          }
        })
      } else {
        Services.addSubjectCo(params).then(response => {
          if (response.data.code == 200) {
            _this.$message.success('企业主体添加成功')
            _this.dialogVisible1 = false
            _this.getSubject()
          } else {
            _this.$message.error(response.data.result.errors[0].message)
          }
        })
      }
    },
    getAddressData () {
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
              } else if (item.level == 2) {
                self.options.forEach(function (a) {
                  for (var i in a.children) {
                    if (item.parentId == a.children[i].id) {
                      var s = { value: item.code, label: item.name, id: item.id }
                      if (a.children[i].children) {
                        a.children[i].children.push(s)
                      } else {
                        a.children[i].children = [{ value: item.code, label: item.name, id: item.id }]
                      }
                      break
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
    getSubject () {
      let self = this
      this.subjectList = []
      Services.listSubjectCo().then(response => {
        if (response.data.code == 200) {
          if (response.data.result.subjectCoList.length > 0) {
            response.data.result.subjectCoList.forEach(ele => {
              ele.type = 1
              self.subjectList.push(ele)
            });
          }
        }
      })
      Services.listSubjectSelf().then(response => {
        if (response.data.code == 200) {
          if (response.data.result.subjectSelfList.length > 0) {
            response.data.result.subjectSelfList.forEach(ele => {
              ele.type = 0
              self.subjectList.push(ele)
            });
          }
          if (self.subjectList.length > 0) {
            self.selectSubject = self.subjectList[0].id
            self.selectSubjectType = self.subjectList[0].type
          }
        }
      })
      if (this.subjectList == '') {
        this.zhuangtai = true
      } else {
        this.zhuangtai = false
      }
    },
    subjectMore () {
      this.showMoreSubject = !this.showMoreSubject
    },
    restSubjectData () {
      this.subjectForm = {
        name: '',
        idCard: '',
        businessLicense: '',
        contact: '',
        phoneCode: '',
        detailAddress: '',
        mobilePhone: '',
        cityCode: [],
        email: '',
        isEdit: false
      }
      this.$refs['subjectFrom'].resetFields();
    },
    submitSubjectData (formName) {
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            name: _this.subjectForm.name,
            idCard: _this.subjectForm.idCard,
            businessLicense: _this.subjectForm.businessLicense,
            contact: _this.subjectForm.contact,
            phoneCode: _this.subjectForm.phoneCode,
            detailAddress: _this.subjectForm.detailAddress,
            mobilePhone: _this.subjectForm.mobilePhone,
            cityCode: _this.subjectForm.cityCode[_this.subjectForm.cityCode.length - 1],
            email: _this.subjectForm.email
          }
          console.log(params)
          if (_this.editSubjectType == 0) {
            Services.updateSubjectSelf(_this.editSubjectId, params).then(response => {
              if (response.data.code == 200) {
                _this.$message.success('个人主体修改成功')
                _this.dialogVisible = false
                _this.getSubject()
              } else {
                _this.$message.error(response.data.message)
              }
            })
          } else {
            Services.updateSubjectCo(_this.editSubjectId, params).then(response => {
              if (response.data.code == 200) {
                _this.$message.success('企业主体修改成功')
                _this.dialogVisible = false
                _this.getSubject()
              } else {
                _this.$message.error(response.data.message)
              }
            })
          }
        }
      })
    },
    editSubjsct (row) {
      this.editSubjectId = row.id
      this.isEdit = true
      this.subjectForm = row
      this.subjectForm.cityCode = [row.cityCode.substr(0, 2) + '0000', row.cityCode.substr(0, 4) + '00', row.cityCode]
      this.dialogVisible = true
      this.editSubjectType = row.type
    },
    changeSubject (id, type) {
      this.selectSubject = id
      this.selectSubjectType = type
    },
    addressMore () {
      this.showMoreAddress = !this.showMoreAddress
    },
    changeAddress (id) {
      this.selectAddress = id;
    },
    restData () {
      this.form = {
        contact: '',
        cityCode: [],
        detail: '',
        mobilePhone: ''
      }
      this.$refs['addressFrom'].resetFields();
    },
    submitData (formName) {
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            contact: _this.form.contact,
            cityCode: _this.form.cityCode[_this.form.cityCode.length - 1],
            detail: _this.form.detail,
            mobilePhone: _this.form.mobilePhone
          }
          console.log(params)
          if (_this.isEdit) {
            Services.updateAddress(_this.editId, params).then(response => {
              if (response.data.code == 200) {
                _this.$message.success('地址修改成功')
                _this.dialogFormVisible = false
                _this.getAddressList()
              } else {
                _this.$message.error(response.data.message)
              }
            })
          } else {
            Services.addAddress(params).then(response => {
              if (response.data.code == 200) {
                _this.$message.success('地址添加成功')
                _this.dialogFormVisible = false
                _this.getAddressList()
              } else {
                _this.$message.error(response.data.message)
              }
            })
          }
        }
      })
    },
    editAddress (row) {
      this.editId = row.id
      this.isEdit = true
      this.form = {
        contact: row.contact,
        cityCode: [row.cityCode.substr(0, 2) + '0000', row.cityCode.substr(0, 4) + '00', row.cityCode],
        detail: row.detail,
        mobilePhone: row.mobilePhone
      }
      this.dialogFormVisible = true
    },
    getAddressList () {
      Services.listAddress().then(response => {
        if (response.data.code == 200) {
          this.addressData = response.data.result.addressList
          for (var i in this.addressData) {
            if (this.addressData[i].idDefault == true) {
              this.isDefault = this.addressData[i].id
              this.selectAddress = this.addressData[i].id
              break
            }
          }
          if (!this.isDefault && this.addressData.length > 0) {
            this.isDefault = this.addressData[0].id
            this.selectAddress = this.addressData[0].id
          }
        }
      })
    },
    submit () {
      let self = this
      if (!self.selectAddress) {
        self.$message.error('请选择寄送地址或新增地址！')
        return false
      }
      if (!self.selectSubject) {
        self.$message.error('请选择主体或新增主体！')
        return false
      }
      let params = {
        addressId: self.selectAddress,
        remark: self.remark,
        ids: self.ids
      }
      if (self.selectSubjectType == 0) {
        params.subjectSelfId = self.selectSubject
      } else {
        params.subjectCoId = self.selectSubject
      }
      Services.createOrders(params).then(response => {
        if (response.data.code == 200) {
          console.log(response.data)
          let that = this
          Services.getCarCount().then(response => {
            if (response.data.code == 200) {
              that.$store.dispatch('shoppingCarNum', response.data.result)
            }
          })
          self.$router.replace({ path: '/orderDetail', query: { id: response.data.result.tOrderNo } })
          localStorage.removeItem('orderInfo')
        }
      })
    }
  }
}
</script>
