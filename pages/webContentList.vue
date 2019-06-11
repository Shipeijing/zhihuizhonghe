<style lang="less">
.webContentList {
  width: 1170px;
  margin: 30px auto;
  min-height: 700px;
  position: relative;
  .list {
    width: 80%;
    margin-bottom: 20px;
    float: right;
    margin-right: 2%;
    cursor: pointer;
    .box {
      display: block;
      float: left;
      width: 60px;
      height: 60px;
      margin-right: 20px;
      background-color: #efefef;
      img {
        width: 100%;
      }
    }
    p {
      width: auto;
      display: block;
      float: left;
      width: 100%;
      line-height: 60px;
      font-size: 14px;
      border-bottom: 1px dashed #cccccc;
    }
    p:hover {
      color: #26a9e1;
    }
  }
}
</style>

<template>
  <div class="webContentList">
    <div v-for="i in webContentList" :key="i.id" class="list">
      <!-- <div class="box"><img :src="i.image"></div> -->
      <p v-on:click="getLinkInfo(i.id)">{{ i.title }}</p>
      <div class="clear"></div>
    </div>
    <Sidebar></Sidebar>
  </div>
</template>

<script>
import Sidebar from '~/components/Sidebar'
import Services from '../store/services'
export default {
  components: {
    Sidebar
  },
  data () {
    return {
      linkId: '',
      webContentList: []
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
      this.linkId = this.$route.query.id
      this.getLinkList()
    },
    getLinkList () {
      Services.getWebContentList(this.linkId).then(response => {
        if (response.data.code == 200) {
          this.webContentList = response.data.result.webContentList
        }
      })
    },
    getLinkInfo (id) {
      this.$router.push({ path: '/webContent', query: { id: id } })
    }
  }
}
</script>
