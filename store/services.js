import axios from 'axios'
import {
  fetch
} from '../plugins/http' //get请求被浏览器缓存，这里get换为http.js里封装的fetch方法避免缓存

class Services {
  //招标滚动条内容
  tenderList() {
    return axios.post('/tender/TenderList')
  }
  //身份认证
  login(params) {
    return axios.post('/auth/login', params)
  }
  //用户注册
  register(params) {
    return axios.post('/api/member/register', params)
  }
  //校验推荐人账号（手机号码）
  checkRecommendMember(params) {
    return fetch('/api/member/checkRecommendMember', params)
  }
  //刷新令牌
  refreshToken(params) {
    return axios.post('/oauth/access_token?grant_type=refresh_token&refresh_token=' + params.refresh_token)
  }
  //发送验证码
  sendVerifyCode(params) {
    return axios.post('/api/member/sendVerifyCode', params)
  }
  //发送提现验证码
  sendWithDrawVerifyCode(params) {
    return axios.get('/api/member/sendWithDrawVerifyCode', params)
  }
  //找回密码发送验证码
  sendLostPasswordVerifyCode(params) {
    return axios.post('/api/member/sendLostPasswordVerifyCode', params)
  }
  //发布招标验证码
  tenderSendVerifyCode(params) {
    return axios.post('/api/tender/sendVerifyCode', params)
  }
  //提交招标信息
  saveTender(params) {
    return axios.post('/api/tender/save', params)
  }
  //更新会员信息
  lostPassword(params) {
    return axios.post('/api/member/lostPassword', params)
  }


  //获取新闻列表
  getNewsList(params) {
    return axios.post('/api/news/newsList', params)
  }
  //查看新闻详情
  showNewsDetail(id) {
    return fetch('/api/news/show/' + id)
  }
  //根据类别获取新闻列表
  getNewsCategoryList(id, params) {
    return axios.post('/api/news/newsListByClass/' + id, params)
  }
  //新闻类别列表全部
  getNewsCategory() {
    return fetch('/api/news/newsClassList')
  }
  //推荐查询
  searchRecommendList(params) {
    return axios.post('api/recommend/listByCode', params)
  }
  //广告查询
  advertList(id) {
    return fetch('api/public/advertList/' + id)
  }


  //获取登陆用户信息
  getAuthUser(params) {
    return fetch('/api/member/getAuthUser', {
      params: params
    })
  }
  //企业性质
  getNature(params) {
    return fetch('/api/public/getNature', {
      params: params
    })
  }
  //人员规模
  getPersonnelScale(params) {
    return fetch('/api/public/getPersonnelScale', {
      params: params
    })
  }
  //所属行业
  getIndustryList(params) {
    return fetch('/api/public/getIndustryList', {
      params: params
    })
  }
  //更新会员信息
  updateUserInfo(params) {
    return axios.put('/api/member/update', params)
  }
  //个人重置密码
  resetPassword(params) {
    return axios.put('/api/member/resetPassword', params)
  }


  //图片上传
  uploadImg(params, config) {
    return axios.post('/api/upload/upload', params, config)
  }
  //提交个人身份认证
  saveSelfCert(params) {
    return axios.post('/api/memberCert/saveSelfCert', params)
  }
  //获取个人身份认证
  getMemberSelfCert(params) {
    return fetch('/api/memberCert/getMemberSelfCert', params)
  }
  //修改个人身份认证
  updateSelfCert(params) {
    return axios.put('/api/memberCert/updateSelfCert', params)
  }
  //提交企业身份认证
  saveCoCert(params) {
    return axios.post('/api/memberCert/saveCoCert', params)
  }
  //添加托管
  saveHostedProject(params) {
    return axios.post('/api/hostedProject/saveHostedProject', params)
  }
  //获取托管
  hostedProjectList() {
    return axios.post('/api/hostedProject/hostedProjectList')
  }
  //获取待支付托管
  hostedProjectListNoPay() {
    return axios.post('/api/hostedProject/hostedProjectListNoPay')
  }
  //提交托管
  insertHostedProjectNoPay() {
    return axios.post('/api/hostedProject/insertHostedProjectNoPay')
  }
  //查询托管
  searchHostedProject(id) {
    return fetch('/api/hostedProject/searchHostedProject/' + id)
  }

  //查询费用
  getHostingFeeList() {
    return axios.post('/api/HostingFee/getHostingFeeList')
  }
  //删除托管
  deleteHostedProject(id) {
    return fetch('/api/hostedProject/deleteHostedProject/' + id)
  }
  //获取价格
  getHostedPayTypePrice(params) {
    return axios.post('/api/hostedProject/getHostedPayTypePrice', params)
  }
  //获取年份
  getYear(id) {
    return fetch('/api/hostedProject/getYear/' + id)
  }
  //获取企业身份认证
  getMemberCoCert(params) {
    return fetch('/api/memberCert/getMemberCoCert', params)
  }
  //修改企业身份认证
  updateCoCert(params) {
    return axios.put('/api/memberCert/updateCoCert', params)
  }

  //获取主体列表-个人
  listSubjectSelf(params) {
    return fetch('/api/subject/listSubjectSelf', params)
  }
  //获取主体列表-企业
  listSubjectCo(params) {
    return fetch('/api/subject/listSubjectCo', params)
  }
  //获取主体信息-个人
  getSubjectSelf(id) {
    return fetch('/api/subject/getSubjectSelf/' + id)
  }

  //获取主体信息-企业
  getSubjectCo(id) {
    return fetch('/api/subject/getSubjectCo/' + id)
  }
  //添加主体信息-个人
  addSubjectSelf(params) {
    return axios.post('/api/subject/addSubjectSelf', params)
  }
  //添加主体信息-企业
  addSubjectCo(params) {
    return axios.post('/api/subject/addSubjectCo', params)
  }
  //修改主体-个人
  updateSubjectSelf(id, params) {
    return axios.put('/api/subject/updateSubjectSelf/' + id, params)
  }
  //修改主体-企业
  updateSubjectCo(id, params) {
    return axios.put('/api/subject/updateSubjectCo/' + id, params)
  }
  //删除主体-个人
  deleteSubjectSelf(id, params) {
    return axios.delete('/api/subject/deleteSubjectSelf/' + id, params)
  }
  //删除主体-个人
  deleteSubjectCo(id, params) {
    return axios.delete('/api/subject/deleteSubjectCo/' + id, params)
  }

  //添加寄送地址
  addAddress(params) {
    return axios.post('/api/address/add', params)
  }
  //首页获取信息
  listHostedProject(params) {
    return fetch('/api/hostedProject/listHostedProject/' + params)
  }
  //修改寄送地址
  updateAddress(id, params) {
    return axios.put('/api/address/update/' + id, params)
  }
  //删除地址
  deleteAddress(id, params) {
    return axios.delete('/api/address/delete/' + id, params)
  }
  //获取地址
  getAddress(id, params) {
    return fetch('/api/address/getAddress/' + id, params)
  }
  //寄送地址列表
  listAddress(params) {
    return fetch('/api/address/list', params)
  }
  //设置默认地址
  setDefaultAddress(id, params) {
    return axios.put('/api/address/setDefault/' + id, params)
  }
  //获取区域列表（全部）
  getCityList(params) {
    return fetch('/api/city/list', {
      params: params
    })
  }
  //用户消息列表（全部）
  getNewsAll(params) {
    return fetch('/api/sysMessage/list', {
      params: params
    })
  }
  //未读消息列表
  getListNotRead(params) {
    return fetch('/api/sysMessage/listNotRead', params)
  }
  //消息详情
  getNewsDetail(params) {
    return axios.post('/api/sysMessage/show', params)
  }
  //未读消息数
  getNotReadCount(params) {
    return fetch('/api/sysMessage/notReadCount', params)
  }
  //申请开店
  applyShopManage(params) {
    return axios.post('/api/shopManage/apply', params)
  }
  //店铺状态
  myShopStatus(params) {
    return fetch('/api/shopManage/myShopStatus', {
      params: params
    })
  }
  //获取店铺模版
  shopTemplateList(params) {
    return fetch('/api/shopManage/shopTemplateList', {
      params: params
    })
  }
  //设置店铺基本信息
  setMyShop(params) {
    return axios.put('/api/shopManage/setMyShop', params)
  }
  //获取登陆会员的店铺
  getMyShop(params) {
    return fetch('/api/shopManage/getMyShop', {
      params: params
    })
  }
  //装饰店铺首页
  decorateShop(params) {
    return axios.put('/api/shopManage/decorateShop', params)
  }
  //入驻行业列表
  getIndustryCode(params) {
    return fetch('/api/shopManage/getIndustryCode', {
      params: params
    })
  }
  //获取荣誉资质列表
  listShopHonors(params) {
    return fetch('/api/shopManage/listShopHonors', {
      params: params
    })
  }
  //添加荣誉资质
  createShopHonors(params) {
    return axios.post('/api/shopManage/createShopHonors', params)
  }
  //删除荣誉资质
  deleteShopHonors(id, params) {
    return axios.put('/api/shopManage/deleteShopHonors/' + id, params)
  }

  //添加商品
  createProduct(params) {
    return axios.post('/api/shopManage/createProduct', params)
  }
  //修改商品
  updateProduct(id, params) {
    return axios.put('/api/shopManage/updateProduct/' + id, params)
  }
  //产品类别列表
  getProductClass(params) {
    return fetch('/api/productClass/list', {
      params: params
    })
  }
  //产品类别列表
  listForServer(params) {
    return fetch('/api/productClass/listForServer', {
      params: params
    })
  }
  //会员商品列表
  productList(params) {
    return axios.post('/api/shopManage/productList', params)
  }
  //获取会员商品详情
  getProductDetail(id, params) {
    return fetch('/api/shopManage/getProduct/' + id, params)
  }
  //删除商品
  deleteProduct(id, params) {
    return axios.put('/api/shopManage/deleteProduct/' + id, params)
  }
  //上下架
  setProductEnable(id, params) {
    return axios.put('/api/shopManage/setProductEnable/' + id, params)
  }

  /*卖方订单*/
  //订单列表
  getShopOrderList(params) {
    return axios.post('/api/ordersManage/listOrders', params)
  }
  //订单详情
  getShopOrdersDetail(id) {
    return fetch('/api/ordersManage/getOrders/' + id)
  }
  //发货
  consignOrders(id, params) {
    return axios.put('/api/ordersManage/consignOrders/' + id, params)
  }
  //退款
  aliRefund(params) {
    return axios.post('/api/pays/aliRefund', params)
  }
  //获取分类
  listByCodePs(params) {
    return fetch('/api/resourceCategory/listByCodePs', params)
  }
  //获取收藏
  collection(params) {
    return axios.post('/api/ProductCollection/insertProductCollection', params)
  }
  //获取全部收藏
  listProductCollection(params) {
    return axios.post('/api/ProductCollection/listProductCollection', params)
  }
  //删除全部收藏
  clearProductCollection() {
    return axios.post('/api/ProductCollection/clearProductCollection')
  }
  //获取城市详情
  getByCode(params) {
    return fetch('/api/city/getByCode', params)
  }
  //首页-产品分类
  homeProductClass(params) {
    return fetch('/api/public/homeProductClass', params)
  }
  //店铺列表查询
  searchShop(params) {
    return axios.post('/api/shop/searchShop', params)
  }
  //组合类型
  listTrademarkType() {
    return fetch('/api/product/listTrademarkType')
  }
  //详情页组合类型
  getTrademarkName(params) {
    return axios.post('/api/product/getTrademarkName', params)
  }
  //展示店铺
  showShop(id) {
    return fetch('/api/shop/show/' + id)
  }
  //在线预约
  onlineBooking(params) {
    return axios.post('/api/public/onlineBooking', params)
  }
  //产品展示
  showProduct(params) {
    return axios.post('/api/product/searchProduct', params)
  }
  //过滤交易的
  searchProductForServer(params) {
    return axios.post('/api/product/searchProductForServer', params)
  }
  //查看产品详情
  showProductDetail(id) {
    return fetch('/api/product/show/' + id)
  }
  getResourceCategoryName(id) {
    return fetch('/api/product/getResourceCategoryName/' + id)
  }
  //添加购物车
  addShopCar(params) {
    return axios.post('/api/shopCart/add', params)
  }
  //购物车数量
  getCarCount() {
    return fetch('/api/shopCart/getCount')
  }
  //购物车列表
  shopCarList(params) {
    return axios.post('/api/shopCart/list', params)
  }
  //删除购物车商品
  deleteShopCar(id, params) {
    return axios.delete('/api/shopCart/delete/' + id, params)
  }
  //删除购物车商品(多条)
  deleteSelected(params) {
    return axios.delete('/api/shopCart/deleteSelected', {
      data: params
    })
  }
  //修改购物车数量
  updateCartNum(id, params) {
    return axios.put('/api/shopCart/update/' + id, params)
  }
  //清空购物车
  clearCart() {
    return axios.delete('/api/shopCart/clear')
  }
  //购物车结算
  submitOrders(params) {
    return axios.post('/api/shopCart/submitOrders', params)
  }
  //商品推荐
  randomProduct(params) {
    return axios.post('/api/shop/randomProduct', params)
  }
  //获取评论
  commentList(params) {
    return axios.post('/api/Evaluation/getEvaluation', params)
  }
  //创建订单
  createOrders(params) {
    return axios.post('/api/orders/createOrders', params)
  }
  //订单详情
  getOrders(id) {
    return fetch('/api/orders/getOrders/' + id)
  }
  //订单列表
  listOrders(params) {
    return axios.post('/api/orders/listOrders', params)
  }
  //发布评价
  insertReview(params) {
    return axios.post('/api/orders/insertReview', params)
  }
  //未支付订单查看详情
  getOrderByTOrderNo(id) {
    return fetch('/api/orders/getOrderByTOrderNo/' + id)
  }
  //取消订单
  cancelOrders(id, params) {
    return axios.put('/api/orders/cancelOrders/' + id, params)
  }
  //删除订单
  deleteOrders(id, params) {
    return axios.put('/api/orders/deleteOrders/' + id, params)
  }
  //确认收货
  confirmOrders(id, params) {
    return axios.put('/api/orders/confirmOrders/' + id, params)
  }
  //申请退款(买方)
  requestRefund(params) {
    return axios.post('/api/orders/requestRefund', params)
  }
  //取消退款申请（买方）
  cancelRefund(params) {
    return axios.post('/api/orders/cancelRefund', params)
  }
  //同意退款（卖方）
  confirmRefund(params) {
    return axios.post('/api/ordersManage/confirmRefund', params)
  }

  changeRealPrice(id, params) {
    return axios.put('/api/ordersManage/changeRealPrice/' + id, params)
  }
  //拒绝退款（卖方）
  refuseRefund(params) {
    return axios.post('/api/ordersManage/refuseRefund', params)
  }

  //支付
  aliPay(params) {
    return axios.post('/api/pays/aliPay', params)
  }
  //支付
  otherPay(params) {
    return axios.post('/api/pays/otherPay', params)
  }
  //托管支付
  recharge(params) {
    return axios.post('/api/hostedProject/recharge', params)
  }
  //交易资源类别
  getResourceCategoryList() {
    return fetch('/api/resourceCategory/list')
  }
  getResourceCategoryListByCode(pCode) {
    return fetch('/api/resourceCategory/listByCode/' + pCode)
  }

  getResourceCategoryListByCode(pCode) {
    return fetch('/api/resourceCategory/listByCode/' + pCode)
  }

  //底部导航
  getFooterLink() {
    return fetch('/api/public/footerLink')
  }
  //获取底部导航目录内容列表
  getWebContentList(id) {
    return fetch('/api/public/webContentList/' + id)
  }
  //获取底部导航内容详情
  getWebContent(id) {
    return fetch('/api/public/webContent/' + id)
  }
  //个人当前余额
  selfCurrentCash() {
    return fetch('/api/wallet/currentCash')
  }
  //个人账单查询
  walletDetailQuery(params) {
    return axios.post('/api/wallet/walletDetailQuery', params)
  }
  //个人钱包充值
  walletRecharge(params) {
    return axios.post('/api/wallet/recharge', params)
  }
  //个人钱包提现
  withdrawCash(params) {
    return axios.post('/api/wallet/withdrawCash', params)
  }
  //企业账单查询
  coWalletDetailQuery(params) {
    return axios.post('/api/walletCo/walletCoDetailQuery', params)
  }
  //企业钱包充值
  coWalletRecharge(params) {
    return axios.post('/api/walletCo/recharge', params)
  }
  //企业钱包提现
  coWithdrawCash(params) {
    return axios.post('/api/walletCo/withdrawCash', params)
  }
  //企业当前余额
  coCurrentCash() {
    return fetch('/api/walletCo/currentCash')
  }
  //立即购买
  buyNow(params) {
    return axios.post('/api/shopCart/buyNow', params)
  }
  getOfflineAccount() {
    return fetch('/api/pays/getOfflineAccount')
  }
}

export default new Services()
