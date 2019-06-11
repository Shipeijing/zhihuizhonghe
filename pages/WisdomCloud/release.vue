<template>
  <div class="contentWr">
    <div class="main">
      <div class="release-d1">
        <div class="first-block-d1">
          <div><span style="color:#26a9e1;">我要</span>托管</div>
        </div>
        <div class="infoBox">
          <h1>选择托管主体</h1>
          <div
            v-if="i == 0"
            class="addressItem"
            v-for="(item, i) in subjectList"
          >
            <span
              :class="selectSubject == item.id ? 'box boxed' : 'box'"
              v-on:click="changeSubject(item.id, item.type, item)"
              >{{ item.name }}</span
            >
            <span>{{ item.contact }}</span>
            <span>{{ item.type == 0 ? "个人" : "企业" }}</span>
            <span>{{ item.detailAddress }}</span>
            <span>{{ item.mobilePhone }}</span>
          </div>
          <div
            v-show="showMoreSubject"
            v-if="i != 0"
            class="addressItem"
            v-for="(item, i) in subjectList"
          >
            <span
              :class="selectSubject == item.id ? 'box boxed' : 'box'"
              v-on:click="changeSubject(item.id, item.type, item)"
              >{{ item.name }}</span
            >
            <span>{{ item.name }}</span>
            <span>{{ item.type == 0 ? "个人" : "企业" }}</span>
            <span>{{ item.detailAddress }}</span>
            <span>{{ item.mobilePhone }}</span>
          </div>
          <div class="adM" v-on:click="subjectMore()">
            <i
              :class="
                showMoreSubject ? 'el-icon-caret-top' : 'el-icon-caret-bottom'
              "
            ></i
            >{{ showMoreSubject ? "收起主体" : "更多主体" }}
          </div>
        </div>
        <table style="width:50%;margin-left:50px;" class="d1-table">
          <tr>
            <th>添加专利</th>
            <td
              style="cursor: pointer;"
              @click="
                dataL.hostedType = '0';
                dialogVisible = true;
              "
            >
              <span><img src="~/static/wimg/tianjia.png" alt=""/></span>
            </td>
            <th>添加商标</th>
            <td
              style="cursor: pointer;"
              @click="
                dataL.hostedType = '1';
                dialogVisible = true;
              "
            >
              <span><img src="~/static/wimg/tianjia.png" alt=""/></span>
            </td>
          </tr>
        </table>
      </div>
      <div class="clear"></div>
      <div class="release-d1" style="  margin-top: 10px;">
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
                <td v-show="item.hostedType == 0" colspan="4">
                  {{ item.patentType }}
                </td>
                <td v-show="item.hostedType == 1" colspan="5"></td>
                <td><span class="del" @click="del(item.id)">删 除</span></td>
              </tr>
            </table>
          </div>
        </div>
        <button class="sub" @click="openpay()">提交</button>
        <div class="clear"></div>
      </div>
    </div>
    <el-dialog
      title="发布托管"
      @close="Initialization"
      :visible.sync="dialogVisible"
      width="712.3px"
    >
      <el-form style=" display: inline-block;width:50%">
        <el-form-item label="托管图片" prop="images">
          <img
            class="imgFile"
            :src="$store.state.baseImgUrl + dataL.images"
            alt=""
          />
          <el-upload
            :action="$store.state.baseImgUrl + '/api/upload/upload'"
            :headers="headers"
            name="imgFile"
            multiple
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-progress="uploadProgress"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :file-list="editFiles"
            :show-file-list="false"
            accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
        </el-form-item>
      </el-form>
      <div v-show="dataL.hostedType == 0" class="Tshuoming">
        <h5>信息填写说明</h5>
        <p>图片请上传1:1比例图片</p>
        <p>申请人有多名时，请用、号隔开填写</p>
        <p>填写前请先确认专利或商标是否超过缴费时间</p>
        <p>
          查询是否超过缴费时间或缴纳滞纳金请点击<span
            @click="openc"
            style="cursor: pointer;color:#26a9e1;"
          >
            查询入口</span
          >
        </p>
        <p>
          不知道是否有费用减缓？<span
            @click="openj"
            style="cursor: pointer;color:#26a9e1;"
            >点击这里查询</span
          >
        </p>
        <p>收费原则：按照一次性收取全部托管费用，若代缴官费需一年一缴！</p>
      </div>
      <div v-show="dataL.hostedType == 1" class="Tshuoming">
        <h5>信息填写说明</h5>
        <p>图片请上传1:1比例图片</p>
        <p>请详细确认商标是否失效</p>
        <p>若商标超期需要缴纳宽展费，可选择本平台委托办理</p>
        <p>
          若选择自己缴费，请<span
            @click="dialogVisible = false"
            style="cursor: pointer;color:#26a9e1;"
          >
            点击这里</span
          >关闭当前弹窗
        </p>
        <p>托管有效年限为十年有效期，填写前请明确了解托管规则和流程</p>
      </div>
      <table class="d1-table">
        <tr v-show="dataL.hostedType == 0">
          <th>申请人</th>
          <td colspan="3">
            <input
              style="width:88%"
              type="text"
              v-model="dataL.applicationUserName"
            />
          </td>
        </tr>
        <tr v-show="dataL.hostedType == 1">
          <th>商标名称</th>
          <td>
            <input type="text" style="width:81.5%" v-model="dataL.patentName" />
          </td>
          <th>商标注册号</th>
          <td><input type="text" v-model="dataL.patentCode" /></td>
        </tr>
        <tr v-show="dataL.hostedType == 1">
          <th>注册日期</th>
          <td>
            <el-date-picker
              v-model="dataL.applicationTime"
              @change="changeNian1()"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
            ></el-date-picker>
          </td>
          <th>托管方式</th>
          <td>
            <div>
              <el-cascader
                class="is-required"
                :options="options1"
                v-model="hostedPayType"
                :props="props"
              >
              </el-cascader>
            </div>
          </td>
        </tr>
        <tr v-show="dataL.hostedType == 0">
          <th>专利名称</th>
          <td><input type="text" v-model="dataL.patentName" /></td>
          <th>专利编号</th>
          <td>
            <input style="width:200px" type="text" v-model="dataL.patentCode" />
          </td>
        </tr>
        <tr v-show="dataL.hostedType == 0">
          <th>专利类型</th>
          <td v-if="dataL.hostedType == '0'">
            <div>
              <el-cascader
                :options="zhuanli"
                v-model="patentType"
                @change="changeNianxian()"
                :props="props"
              ></el-cascader>
            </div>
          </td>
          <td v-else><input type="text" v-model="dataL.trademarkType" /></td>
          <th>申请时间</th>
          <td>
            <el-date-picker
              v-model="dataL.applicationTime"
              @change="changeNian()"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
            ></el-date-picker>
          </td>
        </tr>
        <tr v-show="dataL.hostedType == 0">
          <th>托管方式</th>
          <td>
            <div>
              <el-cascader
                class="is-required"
                :options="options"
                v-model="hostedPayType"
                :props="props"
              >
              </el-cascader>
            </div>
          </td>
          <th>授权时间</th>
          <td>
            <el-date-picker
              v-model="dataL.authorizationTime"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              type="date"
            >
            </el-date-picker>
          </td>
        </tr>
        <tr v-show="dataL.hostedType == 0">
          <th>托管年限</th>
          <td>
            <el-select
              v-model="dataL.date"
              :value="dataL.date + '年'"
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
          </td>
          <th>费用减缓</th>
          <td>
            <el-radio v-model="costReductionl" label="1">有</el-radio>
            <el-radio v-model="costReductionl" label="0">无</el-radio>
          </td>
        </tr>
        <tr v-show="costReductionl == '1'">
          <td colspan="2"></td>
          <td colspan="2">
            <el-radio v-model="dataL.costReduction" label="2" border
              >85%减免</el-radio
            >
            <el-radio v-model="dataL.costReduction" label="1" border
              >70%减免</el-radio
            >
          </td>
        </tr>
      </table>

      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="sub()">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import Services from '../../store/services'
export default {
  beforeCreate () {
    this.$store.dispatch('setNavName', '发布托管')
  },
  data () {
    return {
      props: {
        value: 'label',
        label: 'label',
      },
      renzheng: '',
      costReductionl: '',
      nianxianL: 20,
      nianxian: 0,
      options1: [{ label: '仅提醒' }, { label: '提醒+代缴官费+代缴宽展费' }],
      zhuanli: [{ label: '发明专利' }, { label: '实用新型专利' }, { label: '外观设计专利' }],
      options: [{ label: '仅提醒' }, { label: '提醒+整理资料' }, { label: '提醒+整理资料+代缴年费' }],
      dialogVisible: false,
      idialogVisible: false,
      subjectList: [],
      selectSubject: '',
      selectSubjectType: '',
      showMoreSubject: false,
      activeName: '0',
      patentType: [],
      hostedPayType: [],
      dataL: {
        subjectId: 0,
        subjectType: 0,
        images: '',
        hostedType: '',
        patentCode: '',
        patentType: '',
        trademarkType: '',
        hostedPayType: '',
        patentName: '',
        authorizationTime: '',
        applicationTime: '',
        applicationUserName: '',//申请人姓名
        date: null,//托管年限
        costReduction: '',
      },
      dataList: [],
      disabled: false,//是否禁用
      editFiles: [],// 编辑时已上传图片初始化
      uploadComplete: false, // 图片上传完成状态
      imgVisible: false, // 上传图片预览
      dialogImageUrl: '', // 图片预览地址
    }
  },
  computed: { //返回富文本编辑内容
    headers () {
      return {
        'Authorization': 'Bearer ' + this.$store.state.access_token
      }
    },
  },
  mounted () {
    this.getSubject()
    this.hostedProjectList()
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
    openc () {
      var tempwindow = window.open();
      tempwindow.location = 'http://cpservice.cnipa.gov.cn/index.jsp'
    },
    openj () {
      var tempwindow = window.open();
      tempwindow.location = 'http://cpservice.cnipa.gov.cn/index.jsp'
    },
    subjectMore () {
      this.showMoreSubject = !this.showMoreSubject
    },
    hostedProjectList () {
      Services.hostedProjectList().then(response => {
        this.dataList = response.data.result
      })
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
              self.dataL.subjectId = self.subjectList[0].id
              self.dataL.subjectType = self.subjectList[0].type
            }
          })
        }
      })
    },
    sub () {
      if (this.costReductionl == '0') {
        this.dataL.costReduction = '0'
      }
      this.dataL.patentType = this.patentType[0]
      this.dataL.hostedPayType = this.hostedPayType[0]
      Services.saveHostedProject(this.dataL).then(response => {
        if (response.data.code == 200) {
          this.dialogVisible = false
          this.dataList.push(response.data.result)
          this.$message({
            message: '添加成功！',
            type: 'success'
          });
        } else {
          this.$message({
            message: '添加出错请重试！',
            type: 'error'
          });
        }
      })
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.idialogVisible = true;
    },
    uploadProgress (event, file, fileList) {
      this.uploadComplete = false;
    },
    // 上传图片成功
    uploadSuccess (res, file, fileList) {
      document.getElementsByClassName('el-upload--picture-card ')[0].style.opacity = 0;
      this.uploadComplete = true
      this.fileChange(fileList, res)

    },
    // 上传图片出错
    uploadError (err, file, fileList) {
      this.$message.error("上传出错");
      this.uploadComplete = false;
    },
    // 设置photo值
    fileChange (fileList, res) {
      this.dataL.images = res.result.image.path
    },
    del (id) {
      Services.deleteHostedProject(id).then(response => {
        if (response.data.code == 200) {
          this.hostedProjectList()
          this.$notify({
            title: '提示',
            message: '删除成功！',
            type: 'success',
            duration: '1000',
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
    Initialization () {
      this.dataL.images = '',
        this.dataL.patentCode = '',
        this.patentType = [],
        this.dataL.trademarkType = '',
        this.hostedPayType = [],
        this.dataL.patentName = '',
        this.dataL.authorizationTime = '',
        this.dataL.applicationTime = '',
        this.dataL.applicationUserName = '',//申请人姓名
        this.dataL.date = null,//托管年限
        this.dataL.costReduction = '',
        this.costReductionl = '',
        document.getElementsByClassName('el-upload--picture-card ')[0].style.opacity = 1
    },
    changeSubject (id, type, item) {
      this.selectSubject = id
      this.selectSubjectType = type
      this.dataL.subjectId = item.id
      this.dataL.subjectType = item.type
    },
    changeNianxian () {
      this.dataL.date = null
      if (this.patentType[0] == '发明专利') {
        this.nianxianL = 20
      } else {
        this.nianxianL = 10
      }
      if (this.dataL.applicationTime != '') {
        this.changeNian()
      }
    },
    openpay () {
      Services.insertHostedProjectNoPay().then(response => { })
      this.$router.push({ path: '/WisdomCloud/payment' })
    },
    changeNian1 () {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let strDate = date.getDate()
      let d = this.dataL.applicationTime.split('-')
      let s = strDate - Number(d[2])
      let ss = month - Number(d[1])
      if (s < 0) {
        ss = ss - 1
      }
      let sss = year - Number(d[0])
      if (ss < 0) {
        sss = sss - 1
        ss = 12 + ss
      }
      if (s < 0) {
        if (ss == 1 || ss == 3 || ss == 5 || ss == 7 || ss == 8 || ss == 10 || ss == 1 || ss == 12) {
          s = 31 + s
        } else if (ss == 2) {
          s = 28 + s
        } else {
          s = 30 + s
        }
      }
      if (sss % 10 == 0 && sss >= 10) {
        if (ss <= 6) {
          this.options1 = [{ label: '仅提醒' }, { label: '提醒+代缴官费' }, { label: '提醒+代缴官费+代缴宽展费' }]
        } else {
          this.$alert('您选择的商标注册时间超出最大宽展期，商标已失效无法托管！', '提醒', {
            confirmButtonText: '确定',
            callback: action => {
              this.dialogVisible = false
            }
          });
        }
      } else {
        this.options1 = [{ label: '仅提醒' }, { label: '提醒+代缴官费' }]
      }
      console.log("超出" + sss + "年" + ss + "月" + s + "日")
    },
    changeNian () {
      this.dataL.date = null
      if (this.patentType.length == 1) {
        let date = new Date()
        let year = date.getFullYear()
        let month = date.getMonth() + 1
        let strDate = date.getDate()
        let d = this.dataL.applicationTime.split('-')
        let sss = (year - Number(d[0])) * 365
        let s = (strDate - Number(d[2]))
        let ss = (month - Number(d[1])) * 30
        this.nianxian = this.nianxianL - Math.floor((sss + s + ss) / 365)
      } else {
        this.dataL.applicationTime = ''
        this.$message({
          message: '请先选择专利类型！',
          type: 'warning'
        });

      }
    }
  }
}
</script>
<style>
.contentWr .price {
  display: inline-block;
  color: #ffa32b;
  font-size: 14px;
  width: 86%;
  text-align: right;
}
.contentWr .del {
  color: #ffa32b;
  text-align: right;
  display: inline-block;
  float: right;
  cursor: pointer;
}
.contentWr .Tshuoming {
  width: 43%;
  display: inline-block;
  float: right;
  padding-top: 10px;
}
.contentWr .Tshuoming p {
  font-size: 12px;
  margin: 5px 0px;
  color: #a7a7a7;
}
.contentWr .el-radio.is-bordered {
  height: 35px;
  padding: 10px 20px;
}

.contentWr .infoBox {
  border-bottom: 1px solid #efefef;
  margin-bottom: 20px;
  width: 90%;
  margin: 10px auto;
}
.contentWr .infoBox > h1 {
  font-size: 14px;
  color: #2f2f2f;
  margin-bottom: 10px;
}
.contentWr .adM {
  font-size: 10px;
  cursor: pointer;
  margin: 20px 0;
}
.contentWr .addressItem {
  margin-top: 10px;
}
.contentWr .addressItem > span {
  display: inline-block;
  margin-right: 35px;
  font-size: 14px;
  color: #666666;
  width: 100px;
}
.contentWr .box {
  border: 2px solid #efefef;
  text-align: center;
  min-width: 100px;
  line-height: 30px;
  border-radius: 5px;
}
.contentWr .boxed {
  border: 2px solid #26a9e1 !important;
  background-image: url(../../static/img/selectbg.png);
  background-repeat: no-repeat;
  background-position: top right;
}
.contentWr .mr {
  background-color: #666666;
  font-size: 10px;
  color: #efefef;
}
.contentWr .bj {
  font-size: 10px;
  color: #26a9e1;
  cursor: pointer;
}

.contentWr .butFile {
  border: 0px;
  background: #ffffff;
  color: #26a9e1;
  height: 30px;
  margin-top: 120px;
  margin-left: 20px;
}
.contentWr .imgFile {
  width: 148px;
  height: 148px;
  border-radius: 3px;
}
.contentWr .el-form-item__content {
  line-height: 0px;
  display: flex;
  flex-wrap: nowrap;
  position: relative;
}
.contentWr .el-alert {
  width: 350px;
  line-height: 50px;
  height: 32px;
  margin-top: 115px;
  background: #ffffff;
}
.contentWr .el-message-box__message p {
  padding: 20px 0px;
}
.contentWr .el-form-item__label {
  padding: 0px 20px;
}
.contentWr .el-upload--picture-card {
  position: absolute;
  top: 0;
  left: 0;
  opacity: 1;
}
.contentWr .el-checkbox {
  top: 56px;
  left: -30px;
}
.contentWr .sub {
  float: right;
  border: 0px;
  background: #ffa32b;
  color: #ffffff;
  padding: 8px 45px;
  border-radius: 3px;
  margin-top: 20px;
  margin-bottom: 10px;
  cursor: pointer;
}
.contentWr .el-dialog {
  padding: 10px 5px;
}
.contentWr .el-button {
  width: 150px;
}
.contentW .el-button + .el-button {
  margin-left: 30px;
}
.contentWr .el-dialog__footer {
  text-align: center;
}
.contentWr .ul-li-table th {
  width: 60px;
  font-size: 12px;
  text-align: left;
  color: #959595;
}
.contentWr .ul-li-table td {
  font-size: 12px;
  color: #959595;
  min-width: 90px;
  max-width: 120px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
.contentWr .ul-li-table {
  width: 520px;
  height: 90px;
  margin: 0px auto;
}
.contentWr .li6 div {
  margin-left: 22px;
  margin-top: 10px;
  color: #2f2f2f;
  font-size: 12px;
  font-weight: 600;
}
.contentWr .li6 {
  width: 50%;
  height: 130px;
  background: #f5f5f5;
  float: right;
}
.contentWr .first-block-body > ul .li5 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.contentWr .first-block-body > ul .li4 img {
  width: 12px;
  height: 12px;
  display: inline-block;
  padding-top: 2px;
}
.contentWr .w-90 {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
}
.contentWr .first-block-body > ul .li3 img {
  width: 12px;
  height: 13px;
  display: inline-block;
}
.contentWr .first-block-body > ul .li3 span {
  width: 45%;
  display: inline-block;
  margin-left: 8px;
  white-space: nowrap; /* 不换行 */
  overflow: hidden; /* 内容超出宽度时隐藏超出部分的内容 */
  text-overflow: ellipsis; /* 当对象内文本溢出时显示省略标记(...) ；需与overflow:hidden;一起使用。*/
}
.contentWr .w-400 {
  width: 400px;
  padding: 5px 0px;
}
.contentWr .first-block-body > ul .li2 {
  width: 400px;
  color: #2f2f2f;
  font-size: 14px;
  padding: 5px 0px;
  margin-top: 10px;
}
.contentWr .first-block-body > ul .li2 span {
  width: 80%;
  display: inline-block;
}
.contentWr .first-block-body > ul .li2 button {
  border: 0px;
  background: #fff6f6;
  color: #ffa32b;
  font-size: 12px;
}
.contentWr .first-block-body > ul li {
  float: left;
  font-size: 12px;
  color: #959595;
}
.contentWr .first-block-body > ul .i1 {
  width: 100px;
  height: 100px;
  margin: 15px;
}
.contentWr .first-block-body > ul {
  width: 50%;
  height: 130px;
  background: #fafafa;
}
.contentWr .first-block-body {
  width: 100%;
  margin-bottom: 10px;
  display: flex;
  flex-wrap: nowrap;
}
.contentWr .d1-table {
  width: 100%;
}
.el-form-item {
  margin-top: 22px;
}
.contentWr .d1-table th {
  width: 75px;
  color: #2f2f2f;
  font-weight: 100;
  font-size: 14px;
  padding: 8px 0;
  text-align: center;
}
.contentWr .d1-table > tr > td > span {
  display: block;
  width: 100%;
  background: #f7f7f7;
  padding: 20px 0;
  margin: 5px auto;
}
.contentWr .d1-table span img {
  width: 40px;
  margin: 0px auto;
  display: block;
}
.contentWr .el-dialog__body {
  padding: 0px 20px 10px 20px;
}
.contentWr .d1-table td {
  width: 170px;
  padding: 10px;
}
.contentWr .d1-table > tr > td > input {
  width: 94%;
  border: 1px solid #dcdfe6;
  background: #fff;
  padding: 10.4px 3%;
  border-radius: 4px;
  color: #606266;
  font-size: 14px;
}
.contentWr .release-d1 {
  background: #ffffff;
  padding: 20px;
}
.contentWr {
  margin-top: 1px;
  background-color: #eeeeee;
  min-height: 1000px;
}
.contentWr .main {
  width: 1170px;
  margin: 0 auto;
}
.contentWr .first-block-d1 > div {
  font-size: 18px;
  font-weight: 600;
  padding: 0px 10px;
  float: left;
  margin-top: -3px;
  color: #2f2f2f;
}
.contentWr .first-block-d1 {
  width: 140px;
  height: 18px;
  border-left: 4px solid #26a9e1;
  margin-bottom: 20px;
}
.clear {
  clear: both;
}
</style>
