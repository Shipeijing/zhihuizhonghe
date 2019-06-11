<template>
  <div class="right">
    <el-form
      :model="goodsEditForm"
      ref="goodsEditForm"
      :validate-on-rule-change="false"
      label-width="120px"
      class="demo-ruleForm"
      :rules="goodsRules"
    >
      <el-form-item label="产品标题" prop="title">
        <el-input
          size="small"
          type="text"
          v-model="goodsEditForm.title"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品子标题" prop="subTitle">
        <el-input
          size="small"
          type="text"
          v-model="goodsEditForm.subTitle"
        ></el-input>
      </el-form-item>
      <el-form-item label="产品类别" class="is-required" prop="productClassId">
        <el-cascader
          style="width:300px"
          size="small"
          :options="productClassList"
          v-model="goodsEditForm.productClassId"
          :props="props"
          @change="productClassIdChange"
        ></el-cascader>
      </el-form-item>
      <!-- <el-form-item
        v-if="goodsEditForm.productClassId[goodsEditForm.productClassId.length-1] == '28' || goodsEditForm.productClassId[goodsEditForm.productClassId.length-1] == '39'"
        label="资源类别"
        class="is-required"
        prop="resourceCategoryId"
      >
        <el-cascader
          style="width:300px"
          size="small"
          :options="resourceCategoryList"
          v-model="goodsEditForm.resourceCategoryId"
          :props="props"
        ></el-cascader>resourceCategoryListVisable -->

      <el-form-item
        v-if="resourceCategoryListVisable === true"
        label="资源类别"
        class="is-required"
        prop="resourceCategoryId"
      >
        <el-cascader
          style="width:300px"
          size="small"
          :options="resourceCategoryList"
          v-model="goodsEditForm.resourceCategoryId"
          :props="props"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        v-if="classification == '商标'"
        label="商标分类"
        class="is-required"
        prop="listTrademarkTypeId"
      >
        <el-cascader
          style="width:300px"
          size="small"
          :options="listTrademarkType"
          v-model="listTrademarkTypeId"
          :props="propsP"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        v-if="classification == '专利' || classification == '版权'"
        label="交易类型"
        class="is-required"
        prop="leixingList"
      >
        <el-cascader
          style="width:300px"
          size="small"
          :options="leixing"
          v-model="leixingList"
          :props="propsP"
        ></el-cascader>
      </el-form-item>
      <el-form-item
        v-if="classification == '专利'"
        label="专利分类"
        class="is-required"
        prop="zhuanliList"
      >
        <el-cascader
          style="width:300px"
          size="small"
          :options="zhuanli"
          v-model="zhuanliList"
          :props="propsP"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="产品简介" prop="summary">
        <el-input
          size="small"
          type="text"
          v-model="goodsEditForm.summary"
        ></el-input>
      </el-form-item>
      <good-value
        :paramsList="paramsList"
        @paramsList-change="paramsListChange"
      >
      </good-value>
      <el-form-item label="产品图片：" prop="images">
        <el-upload
          :action="$store.state.baseImgUrl + '/api/upload/upload'"
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
      <el-form-item label="产品内容" prop="content">
        <quill-editor
          ref="myTextEditor"
          v-model="goodsEditForm.content"
          :options="editorOption"
        >
          <div id="toolbar" slot="toolbar">
            <span class="ql-formats"
              ><button type="button" class="ql-bold"></button
            ></span>
            <span class="ql-formats"
              ><button type="button" class="ql-italic"></button
            ></span>
            <span class="ql-formats"
              ><button type="button" class="ql-blockquote"></button
            ></span>
            <span class="ql-formats"
              ><button type="button" class="ql-list" value="ordered"></button
            ></span>
            <span class="ql-formats"
              ><button type="button" class="ql-list" value="bullet"></button
            ></span>
            <span class="ql-formats"
              ><button type="button" class="ql-link"></button
            ></span>
            <span class="ql-formats">
              <el-upload
                :action="$store.state.baseImgUrl + '/api/upload/upload'"
                name="imgFile"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleNegativeSuccess"
                accept="image/gif,image/jpeg,image/jpg,image/bmp,image/png"
              >
                <button type="button" style="outline:none;margin-top: 12px">
                  <svg viewBox="0 0 18 18">
                    <rect
                      class="ql-stroke"
                      height="10"
                      width="12"
                      x="3"
                      y="4"
                    ></rect>
                    <circle class="ql-fill" cx="6" cy="7" r="1"></circle>
                    <polyline
                      class="ql-even ql-fill"
                      points="5 12 5 11 7 9 8 10 11 7 13 9 13 12 5 12"
                    ></polyline>
                  </svg>
                </button>
              </el-upload>
            </span>
          </div>
        </quill-editor>
      </el-form-item>
      <el-form-item>
        <el-button @click="submitFrom('goodsEditForm')" type="primary"
          >提交</el-button
        >
        <el-button @click="cancel" type="info">取消</el-button>
      </el-form-item>
    </el-form>
    <el-dialog class="preview-modal" :visible.sync="imgVisible" append-to-body>
      <img width="100%" :src="dialogImageUrl" alt="photo" />
    </el-dialog>
  </div>
</template>
<script>
import axios from 'axios'
import Services from '../../../store/services'
import QuillEditor from '~/components/QuillEditor.vue'
import GoodValue from '~/components/GoodValue.vue'
export default {
  async asyncData () {
    let [data, resourceCategory] = await Promise.all([
      Services.getProductClass(),
      // Services.getResourceCategoryList()
    ])
    return {
      originProductClassList: data.data.result.productClassList,
      productClassList: data.data.result.productClassList,
      // listTrademarkType: listTrademarkType.data.result
      // originResourceCategoryList: resourceCategory.data.result.resourceCategoryList,
      // resourceCategoryList: resourceCategory.data.result.resourceCategoryList,
    }
  },
  components: {
    QuillEditor,
    GoodValue
  },
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
  data () {
    return {
      leixingList: [],
      zhuanliList: [],
      classification: '',
      leixing: [{ tCode: '1', name: '转让' }, { tCode: '2', name: '许可' }],
      zhuanli: [{ tCode: '1', name: '发明专利' }, { tCode: '2', name: '实用新型专利' }, { tCode: '3', name: '外观设计专利' }],
      listTrademarkTypeId: [],
      listTrademarkType: [],
      loading: true,
      editFiles: [],// 编辑时已上传图片初始化
      editorOption: {
        modules: {
          toolbar: '#toolbar'
        }
      },
      paramsList: [{
        id: '',
        tagName: '',
        tagPrice: '',
        isEnable: 'true'
      }],
      goodsEditForm: {
        productClassId: new Array(),
        resourceCategoryId: new Array(),
        title: '',
        subTitle: '',
        summary: '',
        content: '',
        images: '',
        productTags: '',
        isEnable: true
      },
      goodsRules: {
        title: [
          { required: true, message: '请填写产品标题' }
        ],
        productClassId: [
          { required: true, message: '请选择产品类别', trigger: 'blur' }
        ],
        resourceCategoryId: [
          { required: true, message: '请选择资源类别', trigger: 'blur' }
        ],
        subTitle: [
          { required: true, message: '请填写产品子标题' }
        ],
        summary: [
          { required: true, message: '请填写产品简介' }
        ],
        content: [
          { required: true, message: '请填写产品内容' }
        ],
        images: [
          { required: true, message: '请上传产品图片' }
        ],
        productTags: [
          { required: true, message: '请填写产品型号' }
        ]
      },
      imgP: '',
      uploadComplete: true, // 图片上传完成状态
      imgVisible: false, // 上传图片预览
      dialogImageUrl: '', // 图片预览地址
      props: {
        value: 'id',
        label: 'name',
        children: 'children'
      },
      propsP: {
        value: 'tCode',
        label: 'name',
      },
      resourceCategoryListVisable: false,
      resourceCategoryList: []
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
      this.productClassList = this.setTreeData(this.productClassList)
      // this.resourceCategoryList = this.setTreeData(this.resourceCategoryList)
      if (this.$route.query.id) {
        this.getProductDetail(this.$route.query.id)
      }
    } else {
      this.$router.push({ path: '/personalCenter/config/shopApply' })
      return
    }
    Services.listTrademarkType().then(response => {
      this.listTrademarkType = response.data.result
    })
  },
  methods: {
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
      console.log(fileList)
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
      console.log("temp_str")
      console.log(temp_str)
      this.goodsEditForm.images = temp_str;
    },
    // 图片预览
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url;
      this.imgVisible = true;
    },
    getProductDetail (id) {
      let self = this
      Services.getProductDetail(id).then(response => {
        if (response.data.code == 200) {
          let data = response.data.result.product
          //self.imgP = self.$store.state.baseImgUrl+data.images
          var arr = data.images.split(',')
          if (arr.length > 0) {
            for (let t = 0; t < arr.length; t++) {
              self.editFiles.push({ name: 'name' + t, url: self.$store.state.baseImgUrl + arr[t] });
            }
          }
          self.paramsList = []
          data.productTags.forEach(element => {
            var obj = element
            obj.isEnable = obj.isEnable.toString()
            self.paramsList.push(obj)
          });
          self.goodsEditForm = {
            productClassId: self.getClassFun(data.productClassId),
            resourceCategoryId: self.getZyClassFun(data.resourceCategoryId),
            title: data.title,
            subTitle: data.subTitle,
            summary: data.summary,
            content: data.content,
            images: data.images,
            productTags: data.productTags,
            isEnable: data.isEnable.toString()
          }
          console.log(self.goodsEditForm)
        } else {
          self.$message.error('商品信息出错，无法编辑')
          self.$routet.go(-1)
        }
      })
    },
    getClassFun (id) {
      let arr = []
      let self = this
      let cid = id
      self.productClassList.forEach(function (item) {
        for (var i in item.children) {
          if (item.children[i].id != cid) {
            for (var a in item.children[i].children) {
              if (item.children[i].children[a].id == cid) {
                arr = [item.id, item.children[i].id, item.children[i].children[a].id]
              }
            }
          } else {
            arr = [item.id, item.children[i].id]
          }
        }
      })
      console.log(arr)
      return arr
    },
    getZyClassFun (id) {
      let arr = []
      let self = this
      let cid = id
      self.resourceCategoryList.forEach(function (item) {
        for (var i in item.children) {
          if (item.children[i].id != cid) {
            for (var a in item.children[i].children) {
              if (item.children[i].children[a].id == cid) {
                arr = [item.id, item.children[i].id, item.children[i].children[a].id]
              }
            }
          } else {
            arr = [item.id, item.children[i].id]
          }
        }
      })
      console.log(arr)
      return arr
    },
    paramsListChange (list) {
      this.paramsList = list
      this.goodsEditForm.productTags = list
    },
    handleNegativeSuccess (res, file) {
      if (res.code == 200) {
        this.editor.focus()
        this.editor.insertEmbed(this.editor.getSelection().index, 'image', this.$store.state.baseImgUrl + res.result.image.path)
      } else {
        this.$message.error(res.message);
      }
    },
    beforeAvatarUpload (file) {
      // const isJPG = file.type === 'image/jpeg';

      // // if (!isJPG) {
      // //   this.$message.error('上传图片只能是 JPG 格式!');
      // // }
      // return isJPG;
    },
    setTreeData (data) {
      let tree = data.filter((father) => {              //循环所有项
        let branchArr = data.filter((child) => {
          return father.id == child.parentId      //返回每一项的子级数组
        });
        if (branchArr.length > 0) {
          father.children = branchArr;    //如果存在子级，则给父级添加一个children属性，并赋值
        }
        return father.parentId == 0;      //返回第一层
      });
      return tree     //返回树形数据
    },
    validateParams () {
      // 校验参数
      for (var i of this.paramsList) {
        if (i.tagName == '' || i.tagPrice == '') {
          return false
        }
      }
      return true
    },
    setParams (params) {
      let finalList = []
      for (var i of this.paramsList) {
        finalList.push({
          id: i.id,
          tagName: i.tagName,
          tagPrice: Number(i.tagPrice),
          isEnable: i.isEnable
        })
      }
      // params.productTags = JSON.stringify(finalList)
      params.productTags = finalList
      return params
    },
    submitFrom (formName) {
      let self = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (!this.validateParams()) {
            this.$message.error('请将商品参数填写完整')
            return false
          }
          if (!self.goodsEditForm.images) {
            self.$message.error('请上传产品图片')
            return false
          }
          let params = this.goodsEditForm
          params = this.setParams(params)
          var param = {
            productClassId: params.productClassId[params.productClassId.length - 1],
            resourceCategoryId: params.resourceCategoryId[params.resourceCategoryId.length - 1],
            title: params.title,
            tradeType: self.leixingList[0],
            tCode: self.listTrademarkTypeId[0],
            patentType: self.zhuanliList[0],
            subTitle: params.subTitle,
            summary: params.summary,
            content: params.content,
            images: params.images,
            productTags: params.productTags,
            isEnable: params.isEnable

          }
          if (self.$route.query.id) {
            Services.updateProduct(self.$route.query.id, param).then(response => {
              if (response.data.code == 200) {
                self.$message.success('修改成功')
                self.$router.replace({ path: '/personalCenter/shop/productList' })
              } else {
                if (response.data.result.errors[0].field == 'title') {
                  self.$message.error('产品型号：' + response.data.result.errors[0].message)
                } else if (response.data.result.errors[0].field == 'productTags[0].tagName') {
                  self.$message.error('产品标题：' + response.data.result.errors[0].message)
                } else {
                  self.$message.error(response.data.message)
                }
              }
            })
          } else {
            Services.createProduct(param).then(response => {
              if (response.data.code == 200) {
                self.$message.success('发布成功')
                self.$router.replace({ path: '/personalCenter/shop/productList' })
              } else {
                if (response.data.result.errors[0].field == 'title') {
                  self.$message.error('产品型号：' + response.data.result.errors[0].message)
                } else if (response.data.result.errors[0].field == 'productTags[0].tagName') {
                  self.$message.error('产品标题：' + response.data.result.errors[0].message)
                } else {
                  self.$message.error(response.data.message)
                }
              }
            })
          }
        }
      })
    },
    cancel () {
      this.$router.go(-1)
    },
    productClassIdChange (value) {
      this.goodsEditForm.resourceCategoryId = new Array()
      let pcId = value[value.length - 1]
      const target = this.originProductClassList.filter(item => pcId === item.id)[0]
      const resourceCategory = this.resourceCategoryList.filter(item => target.pCode === item.pCode)[0]
      if (target.type === '资源') {
        Services.getResourceCategoryListByCode(target.pCode).then(response => {
          if (response.data.code == 200) {
            if (response.data.result.resourceCategoryList[0].id == '1') {
              this.classification = '商标'
            } else if (response.data.result.resourceCategoryList[0].id == '2') {
              this.classification = '专利'
            } else if (response.data.result.resourceCategoryList[0].id == '703') {
              this.classification = '版权'
            }
            this.resourceCategoryList = this.setTreeData(response.data.result.resourceCategoryList)
          }
        })
        if (this.resourceCategoryList !== null) this.resourceCategoryListVisable = true
      } else {
        this.resourceCategoryListVisable = false
      }
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
</style>
<style>
.avatar-uploader {
  display: inline-block;
  margin-right: 30px;
}
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
  height: 128px;
  margin-top: 50px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.avatar-uploader-icon span {
  font-size: 12px;
  display: block;
  margin-top: 30px;
}
.ql-editor {
  min-height: 300px;
}
</style>