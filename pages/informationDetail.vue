<template>
  <div class="allbody">
    <div class="main">
      <!---->
      <div class="left">
        <div v-if="newsDetail.title">
          <h1>{{newsDetail.title}}</h1>
          <ol>
            <li>
              <span>发布者：</span>
              <span>{{newsDetail.author}}</span>
            </li>
            <li>
              <span>阅读次数：</span>
              <span>{{newsDetail.hitCount}}</span>
            </li>
            <li>
              <span>{{newsDetail.createDate}}</span>
            </li>
          </ol>
          <div
            class="content"
            v-html="newsDetail.content"
          ></div>
        </div>
      </div>
      <div class="right">
        <!--热搜资讯开始-->
        <div class="zxTop">
          <div class="top">
            <h1>热门<span class="black">资讯</span></h1>
            <!--<input v-model="rsMoreId" />-->
            <a
              class="more"
              @click="moreInit(1)"
            >更多>></a>
          </div>
          <div class="rsList">
            <ul v-for="hot in hotNews">
              <li
                class="figcaption"
                v-on:click="seeInfoTwo(hot.id)"
              >
                <h1>{{hot.title}}</h1>
                <img :src="$store.state.baseImgUrl+hot.image" />
                <p>{{hot.remark}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
        <!--热搜资讯结束-->
        <!--公司动态开始-->
        <div class="zxTop">
          <div class="top">
            <h1>公司<span class="black">动态</span></h1>
            <a
              class="more"
              @click="moreInit(4)"
            >更多>></a>
          </div>
          <div class="rsList">
            <ul v-for="hot in gsdtList">
              <li
                class="figcaption"
                v-on:click="seeInfoTwo(hot.id)"
              >
                <h1>{{hot.title}}</h1>
                <img :src="$store.state.baseImgUrl+hot.image" />
                <p>{{hot.remark}}</p>
              </li>
            </ul>
          </div>
        </div>
        <div class="clear"></div>
        <!--公司动态结束-->
        <!--热搜词条开始-->
        <div class="zxctList">
          <div class="top">
            <h1>前瞻<span class="black">政策</span></h1>
            <a
              class="more"
              @click="moreInit(3)"
            >更多>></a>
          </div>
          <div class="rankings">
            <ul>
              <li
                v-for="(hotTwo,index) in hotNewsTwo"
                class="rankingsLi"
                @click="seeInfoTwo(hotTwo.id)"
              >
                <span :class="index>2 ? 'grey' : ''">{{index+1}}</span>
                <p>{{hotTwo.title}}</p>
                <i>{{hotTwo.hitCount}}</i>
                <div class="clear"></div>
              </li>
              <div class="clear"></div>
            </ul>
          </div>
        </div>
        <!--热搜词条结束-->
      </div>
      <div class="clear"></div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Services from '../store/services'
export default {
  async asyncData ({ route }) {
    let [data] = await Promise.all([
      Services.showNewsDetail(route.query.id)
    ])
    return {
      newsDetail: data.data.result.news
    }
  },
  beforeCreate () {
    this.$store.dispatch('setNavName', '资讯')
  },
  head () {
    return {
      title: this.newsDetail ? this.newsDetail.title + '-智慧众合' : '智慧众合',
      meta: [
        { hid: 'description', name: 'description', content: this.newsDetail.remark }
      ]

    }
  },
  data () {
    return {
      newsDetail: {},
      bgColor: '',
      getNewsId: '',
      hotNews: [],
      hotNewsTwo: [],
      gsdtList: []
    }
  },
  mounted () {
    this.getNewsId = this.$route.query.id;
    console.log(this.getNewsId)
    this.geiNewsDetailInit(this.getNewsId);
    this.getRmzx()
    this.getGsdt()
    this.getQzzc()
  },
  methods: {
    geiNewsDetailInit (id) {
      console.log(id);
      Services.showNewsDetail(id).then(response => {
        if (response.data.code == 200) {
          console.log(response.data);
          this.newsDetail = response.data.result.news;
        }
      })
    },
    moreInit (id) {
      var tempwindow = window.open();
      tempwindow.location = '/moreNews?newsClassId=' + id
    },
    seeInfoTwo (id) {
      var tempwindow = window.open();
      tempwindow.location = '/informationDetail?id=' + id
    },
    getRmzx () {
      let params = {
        order: "desc",
        sort: 'createDate',
        max: 3
      }
      Services.getNewsCategoryList('1', params).then(response => {
        if (response.data.code == 200) {
          this.hotNews = response.data.result.newsList
        }
      })
    },
    getGsdt () {
      let params = {
        order: "desc",
        sort: 'createDate',
        max: 3
      }
      Services.getNewsCategoryList('4', params).then(response => {
        if (response.data.code == 200) {
          this.gsdtList = response.data.result.newsList
        }
      })
    },
    getQzzc () {
      let params = {
        order: "desc",
        sort: 'createDate',
        max: 10
      }
      Services.getNewsCategoryList('3', params).then(response => {
        if (response.data.code == 200) {
          this.hotNewsTwo = response.data.result.newsList
        }
      })
    }
  }
}
</script>

<style scoped>
.allbody {
  background-color: #f3f3f3;
}
.main {
  width: 1170px;
  height: auto;
  zoom: 1;
  margin: 0 auto;
  padding: 20px 0;
}
.main .left {
  height: auto;
  background-color: #ffffff;
  border-radius: 15px;
  display: block;
}
.main .left {
  width: 66%;
  float: left;
  padding: 0 5px 25px;
}
.main .left h1 {
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
/*热搜资讯*/
.right {
  float: left;
  width: 370px;
  margin-left: 15px;
}
.right .zxTop {
  width: 323px;
  height: auto;
  background-color: #ffffff;
  margin-bottom: 15px;
  padding: 25px;
}
.right .zxTop .top {
  border-bottom: 2px solid #ececec;
}
.right .zxTop .top h1 {
  font-size: 18px;
  color: #26a9e1;
  width: 140px;
  border-bottom: 2px solid #26a9e1;
  padding-bottom: 15px;
  margin-bottom: -2px;
}
.zxTop .top .more {
  display: block;
  float: right;
  width: 74px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border: 1px solid #ececec;
  background-color: #efefef;
  font-size: 12px;
  color: #959595;
  margin-top: -38px;
  border-radius: 20px;
  cursor: pointer;
}
.right .rsList ul li {
  padding: 15px 0;
  height: 110px;
  border-bottom: 1px dashed #cbcbcb;
}
.right .rsList .figcaption {
  cursor: pointer;
}
.right .rsList ul li h1 {
  width: 100%;
  /*white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;*/
  font-size: 15px;
  color: #ff7301;
  margin-bottom: 10px;
  cursor: pointer;
}
.right .rsList ul li img {
  width: 110px;
  height: 70px;
  display: block;
  float: left;
  margin-right: 15px;
}
.right .rsList ul li p {
  width: 198px;
  height: 75px;
  font-size: 12px;
  color: #2f2f2f;
  float: left;
  line-height: 18px;
  overflow: hidden;
  -webkit-line-clamp: 4;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
/*热搜词条*/
.right .zxctList {
  width: 323px;
  height: auto;
  background-color: #ffffff;
  margin-top: 15px;
  padding: 25px;
}
.right .zxctList .top {
  border-bottom: 2px solid #ececec;
}
.right .zxctList .top h1 {
  font-size: 18px;
  color: #26a9e1;
  width: 140px;
  border-bottom: 2px solid #26a9e1;
  padding-bottom: 15px;
  margin-bottom: -2px;
}
.right .zxctList .top .more {
  display: block;
  float: right;
  width: 74px;
  height: 26px;
  text-align: center;
  line-height: 26px;
  border: 1px solid #ececec;
  background-color: #efefef;
  font-size: 12px;
  color: #959595;
  margin-top: -38px;
  border-radius: 20px;
  cursor: pointer;
}
.right .zxctList .rankings {
  margin-top: 25px;
  margin-left: -11px;
  height: auto;
}
.right .zxctList .rankings li {
  cursor: pointer;
  width: 327px;
  height: auto;
  padding: 5px 10px;
}
.right .zxctList .rankings li:hover {
  background-color: #f0f0f0;
}
.right .zxctList .rankings li span {
  display: block;
  width: 40px;
  height: 22px;
  border-radius: 15px;
  background-color: #d80b0b;
  text-align: center;
  line-height: 22px;
  color: #ffffff;
  font-size: 12px;
  display: block;
  float: left;
  margin-top: 3px;
}
.right .zxctList .rankings li span.grey {
  background-color: grey;
}
.right .zxctList .rankings li p {
  width: 240px;
  /*height: 22px;*/
  line-height: 22px;
  /*white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;*/
  float: left;
  font-size: 14px;
  margin-left: 15px;
}
.right .zxctList .rankings li i {
  font-style: normal;
  font-size: 16px;
  color: #c0c0c0;
  float: right;
}
</style>