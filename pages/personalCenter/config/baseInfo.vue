<template>
  <div class="right">
    <el-form ref="userInfoFrom">
      <el-form-item label="昵称" :label-width="formLabelWidth">
        <el-input size="small" v-model="editform.nickName" placeholder="请填写昵称"></el-input>
      </el-form-item>
      <el-form-item label="类型" :label-width="formLabelWidth">
        <el-select size="small" v-model="editform.type" placeholder="请选择">
            <el-option label="个人" value='个人'></el-option>
            <el-option label="企业" value='企业'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="editform.type == '个人'" label="性别" :label-width="formLabelWidth">
        <el-select size="small" v-model="editform.sex" placeholder="请选择">
            <el-option label="男" value='男'></el-option>
            <el-option label="女" value='女'></el-option>
            <el-option label="保密" value='保密'></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="editform.type == '个人'" label="生日" :label-width="formLabelWidth">
        <el-date-picker
          size="small"
          v-model="editform.birthday"
          type="date"
          placeholder="选择日期"
          format="yyyy 年 MM 月 dd 日"
          value-format="yyyy-MM-dd">
        </el-date-picker>
      </el-form-item>
      <el-form-item v-if="editform.type == '企业'" label="企业性质" :label-width="formLabelWidth">
        <el-select size="small" v-model="editform.nature" placeholder="请选择">
            <el-option v-for="i in natureList" :label="i" :value='i' :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item v-if="editform.type == '企业'" label="人员规模" :label-width="formLabelWidth">
        <el-select size="small" v-model="editform.personnelScale" placeholder="请选择">
            <el-option v-for="i in personnelScaleList" :label="i" :value='i' :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所属行业" :label-width="formLabelWidth">
        <el-select size="small" v-model="editform.industry" placeholder="请选择">
            <el-option v-for="i in industryList" :label="i.name" :value='i.name' :key="i"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="所在区域" :label-width="formLabelWidth">
        <el-cascader
          size="small"
          :options="options"
          v-model="cityCode"
        ></el-cascader>
      </el-form-item>
      <el-form-item v-if="editform.type == '企业'" label="企业信息" :label-width="formLabelWidth">
        <el-input size="small" v-model="editform.enterpriseInfo" placeholder="请填写企业信息"></el-input>
      </el-form-item>
      <el-form-item v-if="editform.type == '个人'" label="个人信息" :label-width="formLabelWidth">
        <el-input size="small" v-model="editform.personalInfo" placeholder="请填写个人信息"></el-input>
      </el-form-item>
      <el-form-item label="微信号" :label-width="formLabelWidth">
        <el-input size="small" v-model="editform.wexin" placeholder="请填写微信号"></el-input>
      </el-form-item>
      <el-form-item label="qq号码" :label-width="formLabelWidth">
        <el-input size="small" v-model="editform.qq" placeholder="请填写qq号码"></el-input>
      </el-form-item>
      <el-form-item label="擅长领域" :label-width="formLabelWidth">
        <el-input size="small" v-model="editform.personalFiled" placeholder="请填写昵称"></el-input>
      </el-form-item>
      <el-form-item :label-width="formLabelWidth">
          <!-- <el-button @click="getAuthUser()">取 消</el-button> -->
          <el-button size="small" type="primary" @click="submitData('userInfoFrom')">保 存</el-button>
      </el-form-item>
    </el-form>
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
      loading: true,
      formLabelWidth: '120px',
      editform: '',
      options: [],
      natureList: [],
      personnelScaleList: [],
      industryList: [],
      cityCode: []
    }
  },
  head() {
    return {
      title: '智慧众合-基础信息'
    }
  },
  mounted(){
    this.getAddressData()
    this.getAuthUser()
    this.getNature()
    this.getPersonnelScale()
    this.getIndustryList()
  },
  methods: {
    getAuthUser(){
      let self = this
      Services.getAuthUser().then(response => {
        if(response.data.code == 200){
          self.setFromData(response.data.result.member)
        }else{
          self.$message.error(response.data.message)
        }
      })
    },
    getNature(){
      let self = this
      Services.getNature().then(response => {
        if(response.data.code == 200){
          self.natureList = response.data.result.nature
        }else{
          self.$message.error(response.data.message)
        }
      })
    },
    getPersonnelScale(){
      let self = this
      Services.getPersonnelScale().then(response => {
        if(response.data.code == 200){
          self.personnelScaleList = response.data.result.personnelScale
        }else{
          self.$message.error(response.data.message)
        }
      })
    },
    getIndustryList(){
      let self = this
      Services.getIndustryList().then(response => {
        if(response.data.code == 200){
          self.industryList = response.data.result.industryCategory
        }else{
          self.$message.error(response.data.message)
        }
      })
    },
    setFromData(params){
      let self = this
      self.editform = params
      self.editform.cityCode ? 
      self.cityCode = [self.editform.cityCode.substr(0,2)+'0000',self.editform.cityCode.substr(0,4)+'00',self.editform.cityCode]
      : self.cityCode = []
    },
    getAddressData(){
      let self = this
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
    },
    submitData(formName){
      let self = this
      console.log(self.editform)
      let params = self.editform
      params.cityCode = self.cityCode[self.cityCode.length-1]
      Services.updateUserInfo(params).then(response => {
        if(response.data.code == 200){
          self.$message.success('更新成功！')
          self.getAuthUser()
        }else{
          self.$message.error(response.data.message)
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
		float: right;
		background-color: #FFFFFF;
		padding: 22px 42px;
		padding-bottom: 95px;
		margin-bottom: 15px;
	}
  
</style>