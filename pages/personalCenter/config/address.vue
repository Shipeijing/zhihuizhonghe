<template>
  <div class="right">
    <div class="title">收件地址</div>
    <el-button size="small" class="addBtn" type="primary" icon="el-icon-plus" v-on:click="dialogFormVisible = true">添加收货地址</el-button>
    <el-table
      v-loading="loading"
      :data="addressData"
      style="width: 100%;text-align: center;"
      element-loading-text="数据加载中...">
      <el-table-column
        prop="contact"
        label="联系人名称"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="mobilePhone"
        label="联系电话"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        prop="detail"
        label="联系地址">
      </el-table-column>
      <el-table-column
        align="center"
        label="操作">
        <template slot-scope="scope">
          <el-button @click="editAddress(scope.row)" type="text" size="small">修改</el-button>
          <el-button @click="delAddress(scope.row)" type="text" size="small">删除</el-button>
          <el-radio @change="changeRadio" style="margin-left: 30px" v-model="isDefault" :label="scope.row.id">默认地址</el-radio>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="isEdit ? '修改收件地址' : '新增收件地址'" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="fromRules" ref="addressFrom">
        <el-form-item label="联系人姓名" :label-width="formLabelWidth" prop="contact">
          <el-input size="small" v-model="form.contact" placeholder="请填写联系人姓名"></el-input>
        </el-form-item>
        <el-form-item label="联系地址" :label-width="formLabelWidth" prop="cityCode">
          <el-cascader
            size="small"
            :options="options"
            v-model="form.cityCode"
          ></el-cascader>
          <el-input size="small" style="margin-top:20px" v-model="form.detail" placeholder="请填写详细地址" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="联系电话" :label-width="formLabelWidth" prop="mobilePhone">
          <el-input size="small" v-model="form.mobilePhone" placeholder="请填写联系电话"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" @click="dialogFormVisible = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitData('addressFrom')">确 定</el-button>
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
      addressData: [],
      formLabelWidth: '120px',
      form: {
        contact: '',
        cityCode: [],
        detail: '',
        mobilePhone: ''
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
      isDefault: ''
    }
  },
  head() {
    return {
      title: '智慧众合-地址管理'
    }
  },
  watch: {
    dialogFormVisible(){
      let self = this
      if(self.dialogFormVisible == true){
        if(localStorage.getItem('cityCedeList')){
          self.options = JSON.parse(localStorage.getItem('cityCedeList'))
        }else{
          Services.getCityList().then(response => {
            if(response.data.code == 200){
              response.data.result.city.forEach(function(item) {
                if(item.level == 0){
                  var obj = {value: item.code, label: item.name, id: item.id}
                  self.options.push(obj)
                }else if(item.level == 1){
                  self.options.forEach(function(a) {
                    if(item.parentId == a.id){
                      var o = {value: item.code, label: item.name, id: item.id}
                      if(a.children){
                        a.children.push(o)
                      }else{
                        a.children = [{value: item.code, label: item.name, id: item.id}]
                      }
                    }
                  })
                }else if(item.level == 2){
                  self.options.forEach(function(a) {
                    for(var i in a.children){
                      if(item.parentId == a.children[i].id){
                        var s = {value: item.code, label: item.name, id: item.id}
                        if(a.children[i].children){
                          a.children[i].children.push(s)
                        }else{
                          a.children[i].children = [{value: item.code, label: item.name, id: item.id}]
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
      }else{
        this.isEdit = false
        this.restData()
      }
    }
  },
  mounted(){
    this.getAddressList()
    console.log(this.$router);
  },
  methods: {
    getAddressList(){
      this.loading = true
      Services.listAddress().then(response => {
				if(response.data.code == 200){
          this.addressData = response.data.result.addressList
          for(var i in this.addressData){
            if(this.addressData[i].idDefault == true){
              this.isDefault = this.addressData[i].id
              break
            }
          }
          this.loading = false
        }
      })
    },
    restData(){
      this.form = {
        contact: '',
        cityCode: [],
        detail: '',
        mobilePhone: ''
      }
      this.$refs['addressFrom'].resetFields();
    },
    submitData(formName){
      let _this = this
      if(_this.form.detail.length<3 || _this.form.detail.length>50){
        _this.$message.error('详细地址3-50个字符')
        return false
      }
      _this.$refs[formName].validate((valid) => {
    		if (valid) {
          let params = {
            contact: _this.form.contact,
            cityCode: _this.form.cityCode[_this.form.cityCode.length-1],
            detail: _this.form.detail,
            mobilePhone: _this.form.mobilePhone
          }
          console.log(params)
          if(_this.isEdit){
            Services.updateAddress(_this.editId,params).then(response => {
              if(response.data.code == 200){
                _this.$message.success('地址修改成功')
                _this.dialogFormVisible = false
                _this.getAddressList()
              }else{
                _this.$message.error(response.data.message)
              }
            })
          }else{
            Services.addAddress(params).then(response => {
              if(response.data.code == 200){
                _this.$message.success('地址添加成功')
                _this.dialogFormVisible = false
                _this.getAddressList()
              }else{
                _this.$message.error(response.data.message)
              }
            })
          }
        }
      })
    },
    editAddress(row){
      this.editId = row.id
      this.isEdit = true
      this.form = {
        contact: row.contact,
        cityCode: [row.cityCode.substr(0,2)+'0000',row.cityCode.substr(0,4)+'00',row.cityCode],
        detail: row.detail,
        mobilePhone: row.mobilePhone
      }
      this.dialogFormVisible = true
    },
    delAddress(row){
      let self = this
      self.$confirm('确认删除？')
      .then(_ => {
        Services.deleteAddress(row.id).then(response => {
          if(response.data.code == 200){
            self.$message.success('删除成功')
            self.getAddressList()
          }else{
            self.$message.error(response.data.message)
          }
        })
      })
      .catch(_ => {});
    },
    changeRadio(id){
      Services.setDefaultAddress(id).then(response => {
        if(response.data.code == 200){
          this.$message.success('设置默认成功')
        }else{
          this.$message.error(response.data.message)
        }
      })
    }
  }
}
</script>
<style scoped>
	.content{
		background-color: #eeeeee;
	}
	.content .main{
		width: 1170px;
		margin: 0 auto;
		padding-top: 15px;
	}
	/*右侧开始*/
	.main .right {
		width: 896px;
    min-height: 500px;
		background-color: #FFFFFF;
		padding: 22px 42px;
		padding-bottom: 95px;
    margin-bottom: 15px;
	}
  .main .right .title{
		font-size: 18px;
		font-weight: bold;
	}
  .main .right .addBtn{
    margin: 20px 0;
  }
</style>
<style>
th{
  background-color: #EFEFEF !important;
  text-align: center !important;
}
</style>