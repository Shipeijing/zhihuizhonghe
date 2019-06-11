<template>
  <div class="sidebar">
    <el-menu
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      :default-active="active"
      unique-opened="true"
      @select="open"
    >
      <el-submenu
        v-for="(item, index) in footerLink"
        :index="String(index)"
        :key="item.id"
      >
        <template slot="title">
          <span slot="title">{{ item.name }}</span>
        </template>
        <el-menu-item-group>
          <el-menu-item
            v-for="(i, ii) in item.children"
            :index="index + '-' + ii"
            v-on:click="getLinkList(i.id, index + '-' + ii)"
            :key="i.id"
            >{{ i.name }}</el-menu-item
          >
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import Services from '../store/services'
export default {
  data () {
    return {
      isCollapse: false,
      footerLink: [],
      active: "1-1"
    };
  },
  mounted () {
    if (sessionStorage.getItem("active-key")) {
      this.active = sessionStorage.getItem("active-key")
    }
    this.getFooterLink()
  },
  methods: {
    open (key, keyPath) {
      this.active = key
      sessionStorage.setItem("active-key", key)
    },
    getFooterLink () {
      Services.getFooterLink().then(response => {
        if (response.data.code == 200) {
          this.footerLink = response.data.result
        }
      })
    },
    getLinkList (id) {
      Services.getWebContentList(id).then(response => {
        if (response.data.code == 200) {
          if (response.data.result.webContent) {
            this.getLinkInfo(response.data.result.webContent.id)
          } else {
            if (response.data.result.webContentClass.type == '目录') {
              this.$router.push({ path: '/webContentList', query: { id: id } })
            } else {
              window.location.href = response.data.result.webContentClass.url
            }
          }
        }
      })
    },
    getLinkInfo (id) {
      this.$router.push({ path: '/webContent', query: { id: id } })
    },
  }

}
</script>
<style>
.el-menu-item.is-active {
  background-color: rgb(231, 235, 240) !important;
}
.sidebar {
  position: absolute;
  left: 0px;
  top: 0px;
}
.sidebar > span {
  width: 100%;
  display: block;
  text-align: center;
  padding: 15px 0px;
  background: #26a9e1;
  color: #ffffff;
}
.el-submenu__title {
  color: #ffffff;
}
.el-submenu__title img {
  width: 14px;
}
.el-submenu__title:focus {
  background-color: #ecf5ff;
}
.el-submenu__title:hover {
  color: #393939;
}
.el-submenu .el-menu-item {
  min-width: 190px;
}
.el-menu-item {
  background-color: #696969;
  color: #ffffff;
}
.el-menu-item:hover {
  color: #393939;
}
.el-menu-item-group__title {
  padding: 0px;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 190px;
  min-height: 200px;
  text-align: center;
  background-color: #393939;
}
</style>
