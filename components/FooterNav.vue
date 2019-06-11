<template>
  <div>
    <div class="footer">
      <div>
        <ul v-for="(i, index) in footerLink" :key="i.id">
          <li>{{ i.name }}</li>
          <li
            style="cursor: pointer"
            v-for="(a, iindex) in i.children"
            v-on:click="getLinkList(a.id, index + '-' + iindex)"
          >
            {{ a.name }}
          </li>
        </ul>
        <div class="ewm">
          <p>新浪微博</p>
          <img src="~/static/img/wb.png" />
        </div>
        <div class="ewm">
          <p>微信</p>
          <img src="~/static/img/wx.png" />
        </div>
        <div class="rightphone">
          <i>智慧众合服务热线</i>
          <h2>0550-3532009</h2>
          <i>周一至周日：09:00-22:00</i>
        </div>
      </div>
    </div>
    <div class="footerbottom">
      <p>
        ©2018 智慧众合版权所有 | 皖公网安备 34110202000291号<span
          >法律声明</span
        >
      </p>
    </div>
  </div>
</template>

<script>
import Services from '../store/services'
export default {
  data () {
    return {
      footerLink: ''
    }
  },
  mounted () {
    this.getFooterLink()
  },
  methods: {
    getFooterLink () {
      Services.getFooterLink().then(response => {
        if (response.data.code == 200) {
          this.footerLink = response.data.result
        }
      })
    },
    getLinkList (id, key) {
      sessionStorage.setItem("active-key", key)
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
    }
  }
}
</script>
