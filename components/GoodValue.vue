<style lang="less">
.params-form {
  margin-bottom: 20px;
  .el-form-item {
    // width: 50%;
    display: inline-flex;
    margin-bottom: 0;
  }
  .el-form-item__content {
    display: block;
    margin-left: 0 !important;
    .el-input {
      margin-right: 5px !important;
    }
  }
  .operate {
    margin-left: 120px !important;
  }
}
</style>
<template>
  <div class="params-form">
    <el-form-item
      label="产品型号"
      prop="productTags"
    >
      <div
        style="display: block;margin-bottom:20px"
        v-for="(item, index) in paramsList"
      >
        <el-input
          size="small"
          style="width: 150px;"
          v-model="item.tagName"
          placeholder="型号"
        />金额：
        <el-input
          size="small"
          style="width: 150px;"
          v-model="item.tagPrice"
          placeholder="金额"
        />
        <el-select
          size="small"
          style="width: 150px;"
          v-model="item.isEnable"
        >
          <el-option
            label="上架"
            value='true'
          ></el-option>
          <el-option
            label="下架"
            value='false'
          ></el-option>
        </el-select>
        <el-button
          size="small"
          @click="minus(index)"
          type="danger"
          icon="el-icon-delete"
        ></el-button>
      </div>
    </el-form-item>
    <div class="operate">
      <el-button
        size="small"
        @click="plus"
        type="primary"
        icon="el-icon-plus"
      ></el-button>
    </div>
  </div>
</template>
<script>
// 自定义商品属性
export default {
  props: {
    paramsList: {
      type: Array,
      required: true,
      default: []
    }
  },
  data () {
    return {

    }
  },
  watch: {
    'paramsList': {
      handler: function (val, oldval) {
        this.$emit('paramsList-change', val)
      },
      deep: true
    }
  },
  methods: {
    plus () {
      //添加参数
      let o = {
        id: '',
        tagName: '',
        tagPrice: '',
        isEnable: 'true'
      }
      this.paramsList.push(o)
    },
    minus (index) {
      if (this.paramsList.length == 1) {
        this.$message.error('至少有一个产品型号')
        return
      }
      //splice array
      this.paramsList.splice(index, 1)
    }
  }
}
</script>