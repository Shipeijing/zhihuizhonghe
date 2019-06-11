<template>
  <div
    :class="$route.path.substring(0, 15) != '/personalCenter' ? 'mainTop' : ''"
  >
    <div class="head">
      <div class="top">
        <div class="topc">
          <p>
            <nuxt-link :to="{ path: '/' }">欢迎来到智慧众合！！</nuxt-link>
          </p>
          <!-- <img class="dl" src="~/static/img/dl.png" /> -->
          <span class="header-g-s" v-if="$store.state.user">
            <nuxt-link :to="{ path: '/personalCenter' }">个人中心 </nuxt-link>|
            <nuxt-link :to="{ path: '/' }">首页</nuxt-link>
          </span>
          <span class="login" v-if="!$store.state.user" v-on:click="goLogin()"
            >登陆</span
          >
          <span class="register orange" v-if="!$store.state.user">
            <nuxt-link :to="{ path: '/login', query: { type: 'register' } }"
              >注册</nuxt-link
            >
          </span>
          <div class="topr">
            <img src="~/static/img/dh.png" />
            <p class="phone">咨询热线：0550-3532009</p>
            <nuxt-link :to="{ path: '/personalCenter/myShoppingCart' }"
              ><img src="~/static/img/gwc.png" />
              <p>
                购物车<span
                  style="color: #fb400e;display:inline-block;
            margin-left: 5px;"
                  >{{ $store.state.shoppingCarNum }}</span
                >
              </p>
            </nuxt-link>
          </div>
        </div>
        <div class="topz">
          <nuxt-link :to="{ path: '/' }"
            ><img class="logo" src="~/static/img/zh-logo.png"
          /></nuxt-link>
          <div class="searchBox">
            <label>
              <input
                type="text"
                placeholder="请在这里输入你想搜索的关键字"
                v-model="keyName"
              />
              <button @click="serchNow()" type="button">
                <img src="~/static/img/ss.png" />
              </button>
              <div class="clear"></div>
              <ul>
                <li>热搜词：</li>
                <li v-on:click="searchHot('商标')">商标</li>
                <li v-on:click="searchHot('专利')">专利</li>
                <li v-on:click="searchHot('版权登记')">
                  版权登记
                </li>
                <li v-on:click="searchHot('广告设计')">
                  广告设计
                </li>
                <li v-on:click="searchHot('公司注册')">
                  公司注册
                </li>
              </ul>
            </label>
          </div>
          <div class="loginBox">
            <img class="tx" src="~/static/img/tx.png" />
            <div class="loginBoxR">
              <p>Hi，{{ getDetaStr() }}~</p>
              <a v-if="!$store.state.user" class="loginB" v-on:click="goLogin()"
                >登陆</a
              >
              <nuxt-link
                v-if="!$store.state.user"
                :to="{ path: '/login', query: { type: 'register' } }"
                class="registerB"
                >注册</nuxt-link
              >
              <div
                v-if="$store.state.user"
                class="loginOut"
                v-on:click="loginOut"
              >
                退出登陆
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--网页头部结束-->
    <!--导航栏开始-->
    <div class="clear"></div>
    <nav
      v-show="
        $route.path.substring(0, 12) != '/information' &&
          $route.path.substring(0, 15) != '/personalCenter' &&
          $route.path.substring(0, 12) != '/tradingMall' &&
          $route.path.substring(0, 12) != '/TradingMall'
      "
    >
      <div class="leftList">
        <p>
          <img src="~/static/img/fl.png" /><span>{{
            $store.state.navName
          }}</span>
        </p>
      </div>
      <ul class="navList">
        <li>
          <nuxt-link to="/" class="alink">首页</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/serviceMall" class="alink">服务商城</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/resources" class="alink">资源商城</nuxt-link>
        </li>
        <li><nuxt-link to="/wisdomCloud" class="alink">智慧云</nuxt-link></li>
        <li>
          <nuxt-link to="/tenderDetails" class="alink">招标中心</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/tradingMall" class="alink">知产交易</nuxt-link>
        </li>
        <li>
          <nuxt-link to="/information" class="alink">百科问答</nuxt-link>
        </li>
      </ul>
    </nav>
    <nav v-show="$route.path.substring(0, 12) == '/information'">
      <div class="leftList">
        <p>
          <img src="~/static/img/fl.png" /><span>{{
            $store.state.navName
          }}</span>
        </p>
      </div>
      <ul class="newNavList">
        <li>
          <nuxt-link
            :to="{ path: '/information', query: { code: 15, _n: '专利百科' } }"
            class="alink"
            >专利百科</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{ path: '/information', query: { code: 16, _n: '商标知识' } }"
            class="alink"
            >商标知识</nuxt-link
          >
          <div class="itemNav">
            <nuxt-link
              :to="{
                path: '/information',
                query: { code: 17, _n: '版权知识' }
              }"
              class="alink"
              >版权知识</nuxt-link
            >
          </div>
        </li>
        <li>
          <nuxt-link
            :to="{ path: '/information', query: { code: 18, _n: '工商财税' } }"
            class="alink"
            >工商财税</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{ path: '/information', query: { code: 19, _n: '项目申报' } }"
            class="alink"
            >项目申报</nuxt-link
          >
          <div class="itemNav">
            <nuxt-link
              :to="{
                path: '/information',
                query: { code: 20, _n: '科技政策' }
              }"
              class="alink"
              >科技政策</nuxt-link
            >
          </div>
        </li>
        <li>
          <nuxt-link
            :to="{ path: '/information', query: { code: 21, _n: '工业设计' } }"
            class="alink"
            >工业设计</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              path: '/information',
              query: { code: 22, _n: '产学研合作' }
            }"
            class="alink"
            >产学研合作</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/" class="alink">返回首页</nuxt-link>
        </li>
      </ul>
    </nav>
    <!-- 交易商城 -->
    <nav
      v-show="
        $route.path.substring(0, 12) == '/TradingMall' ||
          $route.path.substring(0, 12) == '/tradingMall'
      "
    >
      <div class="leftList">
        <p>
          <img src="~/static/img/fl.png" /><span>{{
            $store.state.navName
          }}</span>
        </p>
      </div>
      <ul class="newNavList">
        <li>
          <nuxt-link
            :to="{ path: '/tradingMall', query: { code: 15, _n: '商城首页' } }"
            class="alink"
            >商城首页</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              path: '/TradingMall/trademark',
              query: { code: 15, _n: '商标交易' }
            }"
            class="alink"
            >商标交易</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              path: '/TradingMall/domainName',
              query: { code: 15, _n: '域名交易' }
            }"
            class="alink"
            >域名交易</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              path: '/TradingMall/copyright',
              query: { code: 15, _n: '版权交易' }
            }"
            class="alink"
            >版权交易</nuxt-link
          >
        </li>
        <li>
          <nuxt-link
            :to="{
              path: '/TradingMall/patent',
              query: { code: 15, _n: '专利交易' }
            }"
            class="alink"
            >专利交易</nuxt-link
          >
        </li>
        <li>
          <nuxt-link to="/" class="alink">返回首页</nuxt-link>
        </li>
      </ul>
    </nav>
  </div>
</template>
<script>
export default {
  data () {
    return {
      keyName: ''
    }
  },
  methods: {
    getDetaStr () {
      var now = new Date(), hour = now.getHours()
      if (hour < 8 || hour > 18) {//晚上
        return '晚上好'
      }
      else if (hour >= 8 && hour < 12) {//上午
        return '上午好'
      }
      else {//下午
        return '下午好'
      }
    },
    serchNow () {
      this.$router.push({ path: '/serchDown', query: { keyString: this.keyName } })
    },
    loginOut () {
      this.$store.dispatch('logout')
      this.$router.push({ path: '/login' })
    },
    goLogin () {
      if (this.$route.path != '/login' && this.$route.path != '/retrievePassword') {
        localStorage.setItem('redirectUrl', location.href)
      }
      this.$router.push({ path: '/login' })
    },
    searchHot (val) {
      this.keyName = val
      this.$router.push({ path: '/serchDown', query: { keyString: this.keyName } })
    }
  }
}
</script>
<style>
.header-g-s a {
  margin: 0px 10px;
}
.header-g-s a:hover {
  color: #26a9e1;
}
.loginOut {
  display: block;
  float: left;
  width: 82px;
  height: 28px;
  line-height: 28px;
  text-align: center;
  font-size: 14px;
  border: none;
  color: #ffffff;
  cursor: pointer;
  background-color: #ccc;
}
.login {
  cursor: pointer;
}
nav .newNavList li {
  position: relative;
}
nav .newNavList li:hover .itemNav {
  display: block;
}
nav .newNavList li .itemNav {
  display: none;
  font-size: 16px;
  background-color: #ffffff;
  position: absolute;
  left: 0;
  width: 100%;
  height: 50px;
  bottom: -50px;
  z-index: 9999;
  line-height: 50px;
  box-shadow: 0px 1px 4px rgba(0, 0, 0, 0.3);
}
</style>
