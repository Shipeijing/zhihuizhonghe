<template>
  <div>
    <header-top/>
    <personal-top v-if="$route.path.substring(0,15) == '/personalCenter'"/>
    <nuxt/>
    <footer-nav/>
  </div>
</template>

<script>
  import HeaderTop from '~/components/HeaderTop.vue'
  import PersonalTop from '~/components/PersonalTop.vue'
  import FooterNav from '~/components/FooterNav.vue'
  export default {
    components: {
      HeaderTop,
      PersonalTop,
      FooterNav
    },
    mounted() {
      if(localStorage.getItem('user')){
        this.$store.state.user = localStorage.getItem('user')
        this.$store.state.access_token = localStorage.getItem('access_token')
        this.$store.state.refresh_token = localStorage.getItem('refresh_token')
        this.$store.state.tokenTime = localStorage.getItem('tokenTime')
        this.$store.state.username = localStorage.getItem('username')
        this.$store.state.roles = JSON.parse(localStorage.getItem('roles'))
        this.$store.state.shoppingCarNum = localStorage.getItem('shoppingCarNum')
      }
    }
  }
</script>
<style>
body{
  font-family: "Microsoft YaHei", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "WenQuanYi Micro Hei" !important;
}
</style>
