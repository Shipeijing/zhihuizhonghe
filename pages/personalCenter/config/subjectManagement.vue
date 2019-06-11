<template>
  <div class="right">
    <el-tabs v-model="activeName" @tab-click="changeTab">
      <el-tab-pane label="个人主体" name="0"></el-tab-pane>
      <el-tab-pane label="企业主体" name="1"></el-tab-pane>
    </el-tabs>
    <div>
      <div class="addBtn" @click="dialogVisible = true">
        <i class="el-icon-circle-plus-outline"></i>
        <span>新增主体</span>
      </div>
      <el-table
        :data="listSubject"
        v-loading="loading"
        style="width: 100%;text-align: center;"
        element-loading-text="数据加载中..."
      >
        <el-table-column align="center" prop="name" label="名称" width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="contact"
          label="联系人"
          width="180"
        >
        </el-table-column>
        <el-table-column prop="detailAddress" label="地址"> </el-table-column>
        <el-table-column
          align="center"
          v-if="activeName == 0"
          prop="idCard"
          label="证件号码"
        >
        </el-table-column>
        <el-table-column
          align="center"
          v-if="activeName == 1"
          prop="businessLicense"
          label="营业执照号码"
        >
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button @click="editSubjsct(scope.row)" type="text" size="small"
              >修改</el-button
            >
            <el-button @click="delSubjsct(scope.row)" type="text" size="small"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>
    <el-dialog
      title="新增主体"
      :visible.sync="dialogVisible"
      :before-close="handleClose"
    >
      <el-form :model="form" :rules="fromRules" ref="subjectFrom">
        <el-form-item
          prop="name"
          v-if="activeName == 0"
          label="名称"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form.name"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="name"
          v-if="activeName == 1"
          label="企业名称"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form.name"
            placeholder="请输入企业名称"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="idCard"
          v-if="activeName == 0"
          label="身份证号码"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form.idCard"
            placeholder="请输入身份证号码"
          ></el-input>
        </el-form-item>
        <el-form-item
          prop="businessLicense"
          v-if="activeName == 1"
          label="营业执照号码"
          :label-width="formLabelWidth"
        >
          <el-input
            size="small"
            v-model="form.businessLicense"
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
            v-model="form.contact"
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
            v-model="form.mobilePhone"
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
            v-model="form.cityCode"
          ></el-cascader>
          <el-input
            size="small"
            style="margin-top:20px"
            v-model="form.detailAddress"
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
            v-model="form.phoneCode"
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
            v-model="form.email"
            placeholder="请输入电子邮件"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogVisible = false">取 消</el-button>
        <el-button
          size="small"
          type="primary"
          @click.native="submitData('subjectFrom')"
          >确 定</el-button
        >
      </span>
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
      loading: true,
      activeName: 0,
      listSubject: [],
      dialogVisible: false,
      formLabelWidth: '120px',
      form: {
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
      ROLE_SELF: false,
      ROLE_CO: false,
      showRZ: false,
      showList: false,
      fromRules: {
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
      editId: ''
    }
  },
  head () {
    return {
      title: '智慧众合-主体管理'
    }
  },
  watch: {
    dialogVisible () {
      let self = this
      if (self.dialogVisible == true) {
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
        this.restData()
      }
    }
  },
  mounted () {
    let self = this
    self.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
    if (self.$store.state.roles && self.$store.state.roles.indexOf('ROLE_SELF') > -1) {
      self.ROLE_SELF = true
      self.showList = true
      self.listSubjectSelf()
    }
    if (self.$store.state.roles && self.$store.state.roles.indexOf('ROLE_CO') > -1) {
      self.ROLE_CO = true
      self.showList = true
      self.listSubjectSelf()
    }
    //  else {
    //   self.showRZ = true
    // }
  },
  methods: {
    changeTab (val) {
      let self = this
      console.log(val.name)
      if (val.name == 1) {
        if (self.ROLE_CO) {
          self.listSubjectCo()
          self.showRZ = false
          self.showList = true
        } else {
          self.showRZ = true
          self.showList = false
        }
      } else {
        if (self.ROLE_SELF) {
          self.listSubjectSelf()
          self.showRZ = false
          self.showList = true
        } else {
          self.showRZ = true
          self.showList = false
        }
      }
    },
    restData () {
      this.form = {
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
    listSubjectSelf () {
      this.loading = true
      Services.listSubjectSelf().then(response => {
        if (response.data.code == 200) {
          this.listSubject = response.data.result.subjectSelfList
          this.loading = false
        }
      })
    },
    listSubjectCo () {
      this.loading = true
      Services.listSubjectCo().then(response => {
        if (response.data.code == 200) {
          this.listSubject = response.data.result.subjectCoList
          this.loading = false
        }
      })
    },
    handleClose (done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    submitData (formName) {
      let _this = this
      _this.$refs[formName].validate((valid) => {
        if (valid) {
          let params = {
            name: _this.form.name,
            idCard: _this.form.idCard,
            businessLicense: _this.form.businessLicense,
            contact: _this.form.contact,
            phoneCode: _this.form.phoneCode,
            detailAddress: _this.form.detailAddress,
            mobilePhone: _this.form.mobilePhone,
            cityCode: _this.form.cityCode[_this.form.cityCode.length - 1],
            email: _this.form.email
          }
          console.log(params)
          if (_this.isEdit) {
            if (_this.activeName == 0) {
              Services.updateSubjectSelf(_this.editId, params).then(response => {
                if (response.data.code == 200) {
                  _this.$message.success('个人主体修改成功')
                  _this.dialogVisible = false
                  _this.listSubjectSelf()
                } else {
                  _this.$message.error(response.data.message)
                }
              })
            } else {
              Services.updateSubjectCo(_this.editId, params).then(response => {
                if (response.data.code == 200) {
                  _this.$message.success('企业主体修改成功')
                  _this.dialogVisible = false
                  _this.listSubjectCo()
                } else {
                  _this.$message.error(response.data.message)
                }
              })
            }
          } else {
            if (_this.activeName == 0) {
              Services.addSubjectSelf(params).then(response => {
                if (response.data.code == 200) {
                  _this.$message.success('个人主体添加成功')
                  _this.dialogVisible = false
                  _this.listSubjectSelf()
                } else {
                  _this.$message.error(response.data.message)
                }
              })
            } else {
              Services.addSubjectCo(params).then(response => {
                if (response.data.code == 200) {
                  _this.$message.success('企业主体添加成功')
                  _this.dialogVisible = false
                  _this.listSubjectCo()
                } else {
                  _this.$message.error(response.data.message)
                }
              })
            }
          }
        }
      })
    },
    editSubjsct (row) {
      this.editId = row.id
      this.isEdit = true
      this.form = row
      this.form.cityCode = [row.cityCode.substr(0, 2) + '0000', row.cityCode.substr(0, 4) + '00', row.cityCode]
      this.dialogVisible = true
    },
    delSubjsct (row) {
      this.$confirm('确认删除？')
        .then(_ => {
          if (this.activeName == 0) {
            Services.deleteSubjectSelf(row.id).then(response => {
              if (response.data.code == 200) {
                this.$message.success('删除成功')
                this.listSubjectSelf()
              } else {
                this.$message.error(response.data.message)
              }
            })
          } else {
            Services.deleteSubjectCo(row.id).then(response => {
              if (response.data.code == 200) {
                this.$message.success('删除成功')
                this.listSubjectCo()
              } else {
                this.$message.error(response.data.message)
              }
            })
          }
        })
        .catch(_ => { });
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
  float: right;
  background-color: #ffffff;
  padding: 22px 42px;
  padding-bottom: 95px;
  margin-bottom: 15px;
}
/*新增主体按钮*/

.addBtn {
  color: #409eff;
  padding: 10px 0 20px 0;
  line-height: 20px;
  cursor: pointer;
}

.addBtn i {
  margin-right: 5px;
  font-size: 22px;
  display: block;
  float: left;
}

.addBtn span {
  font-size: 14px;
}
/*新增主体弹窗*/
.showRZ {
  text-align: center;
}
.showRZ p {
  line-height: 50px;
}
</style>
<style>
th {
  background-color: #efefef !important;
  text-align: center !important;
}
</style>