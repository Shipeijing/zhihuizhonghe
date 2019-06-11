module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: '智慧众合',
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'keywords',
        name: 'keywords',
        content: '知识产权,知识产权交易,法律咨询,商标注册,网络开发,商标转让,专利技术交易,工商财税,建站服务,科技项目,知识产权百科,知识产权资讯,安徽知识产权与企业资源共享平台,智慧众合'
      },
      {
        hid: 'description',
        name: 'description',
        content: '咨询电话：0550-303209，智慧众合（众合（www.zhihuizhonghe.com）提供线）提供线上线下一站式的创新服务，创建知识产权交易和综合服务线上线下相融合的新模式，汇聚全国创新资源为企业和个人提供定制化解决方案，将创意、技能，智慧转化为商业价值和社会价值。目前公司主要有四大服务类知识产权服务、创新服务、创业服务、产业链服务。'
      }
    ],
    link: [{
      rel: 'icon',
      type: 'image/x-icon',
      href: '/favicon.ico'
    }]
  },
  /*
   ** Customize the progress bar color
   */
  loading: {
    color: '#3B8070'
  },
  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios', 'element-ui'],
  },
  /*
   ** 页面过渡效果
   */
  css: [
    'static/css/main.css',
    'assets/main.css',
    'element-ui/lib/theme-chalk/index.css',
    'vue-social-share/dist/client.css'
  ],
  /*
   ** 解决跨域
   */
  plugins: [{
      src: '~plugins/jquery-3.2.1.min',
      ssr: false
    },
    {
      src: '~plugins/share',
      ssr: false
    },
    {
      src: '~plugins/menu',
      ssr: false
    },
    {
      src: '~plugins/http',
      ssr: true
    },
    {
      src: '~plugins/ElementUI',
      ssr: true
    },
    {
      src: '~plugins/global',
      ssr: false
    }
  ],
  router: {
    base: "/"
  },
  render: {
    resourceHints: false,
  },

}
