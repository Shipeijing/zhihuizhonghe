<style lang="less">
.webContent {
  width: 1170px;
  margin: 0px auto;
  min-height: 750px;
  padding-top: 10px;
  overflow-y: auto;
  position: relative;
  .left {
    width: 80%;
    float: right;
    margin-right: 2%;
  }
  .left h1 {
    font-size: 20px;
    color: #2f2f2f;
    margin: 25px 0 10px 15px;
  }
  .left ol {
    height: 20px;
    line-height: 20px;
    padding: 0 0 15px;
    border-bottom: 1px dashed #cccccc;
  }
  .left ol li {
    float: left;
    margin-left: 20px;
  }
  .left ol li span {
    font-size: 12px;
    color: #959595;
    margin: 0;
    float: left;
    padding-right: 10px;
  }
  .content {
    width: 96%;
    margin: 20px auto 0;
    font-size: 16px;
    text-indent: 2em;
    line-height: 24px;
    color: #515151;
  }
}
</style>

<template>
  <div class="webContent">
    <div class="left">
      <h1>{{ webContent.title }}</h1>
      <ol>
        <li>
          <span>发布者：</span>
          <span>{{ webContent.author }}</span>
        </li>
        <li>
          <span>阅读次数：</span>
          <span>{{ webContent.hitCount }}</span>
        </li>
        <li>
          <span>{{ webContent.createDate }}</span>
        </li>
      </ol>
      <div class="content" v-html="webContent.content"></div>
    </div>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Services from '../store/services'
import Sidebar from '~/components/Sidebar'
export default {
  components: {
    Sidebar
  },
  data () {
    return {
      linkId: '',
      webContent: ''
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '导航栏')
  },
  watch: {
    $route: {
      handler: function (val) {
        if (val.query) {
          if (val.query.code != this.linkId) {
            this.getData()
          }
        }
      },
      // 深度观察监听
      deep: true
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      window.scrollTo(0, 0)
      this.linkId = this.$route.query.id
      this.getLinkInfo()
    },
    getLinkInfo () {
      Services.getWebContent(this.linkId).then(response => {
        if (response.data.code == 200) {
          this.webContent = response.data.result.webContent
        }
      })
    }
  }
}
</script>
