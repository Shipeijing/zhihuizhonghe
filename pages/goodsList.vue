<template>
	<div class="goodsListMain" id="main">
    <div class="centerCon">
      <ul class="tabs">
        <li v-for="(list,index) in productClassList" v-if="list.parentId == 0">
          <a class="tab-link" @click="tabsSwitch(list.id)" :class="selectParentId == list.id ? 'active' : ''">{{list.name}}</a>
        </li>
        <div class="clear"></div>
      </ul>
      <div class="clear"></div>
      <div class="cards">
        <div class="tab-card">
          <ul>
            <li v-for="(list,index) in productClassList" v-if="selectParentId == list.parentId" :class="secondClass == list.id ? 'active' : ''" v-on:click="changeClassId(list.id,'2',list.name)"><p>{{list.name}}</p></li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
      <div class="cards" v-if="secondClass">
        <div class="tab-card">
          <ul>
            <li v-for="(list,index) in productClassList" v-if="secondClass == list.parentId" :class="classId === list.id ? 'active' : ''" v-on:click="changeClassId(list.id,'',list.name)"><p>{{list.name}}</p></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="centerCon" style="margin-top: 0" v-if="classId == 39 || classId == 28 || classId == 47">
      <div class="cards">
        <div class="tab-card">
          <ul>
            <li v-for="(list,index) in resourceCategoryList" v-if="(classId == 39 && list.parentId==1) || (classId == 28 && list.parentId==2) || (classId == 47 && list.parentId==481)" :class="selectZyClass == list.id ? 'active' : ''" v-on:click="changeZyClassId(list.id,'1',list.name)"><p>{{list.name}}</p></li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
      <div class="cards" v-if="secondClass">
        <div class="tab-card">
          <ul>
            <li v-for="(list,index) in resourceCategoryList" v-if="selectZyClass && selectZyClass == list.parentId" :class="zyTwoclassId === list.id ? 'active' : ''" v-on:click="changeZyClassId(list.id,'2',list.name)"><p>{{list.name}}</p></li>
          </ul>
        </div>
      </div>
    </div>
    <div class="clear"></div>
    <div class="centerCon" style="width:1150px;margin-top: 10px;padding: 0 10px;background-color:#EFEFEF;" v-if="classId == 39">
      <div class="cards">
        <div class="tab-card">
          <ul>
            <li>交易金额：</li>
            <li :class="!minPrice&&!maxPrice ? 'selectPrice' : ''" v-on:click="selectPriceBtn('','')">全部</li>
            <li :class="minPrice == 0 && maxPrice == 5000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('0','5000')">0.5万以下</li>
            <li :class="minPrice == 5000 && maxPrice == 10000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('5000','10000')">0.5-1万</li>
            <li :class="minPrice == 10000 && maxPrice == 20000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('10000','20000')">1-2万</li>
            <li :class="minPrice == 20000 && maxPrice == 30000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('20000','30000')">2-3万</li>
            <li :class="minPrice == 30000 && maxPrice == 50000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('30000','50000')">3-5万</li>
            <li :class="minPrice == 50000 && maxPrice == 100000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('50000','100000')">5-10万</li>
            <li :class="minPrice == 100000 && !maxPrice ? 'selectPrice' : ''" v-on:click="selectPriceBtn('100000','')">10万以上</li>
            <li>
              <input v-model="minPrice" style="width:100px;" type="number"/>
              -
              <input v-model="maxPrice" style="width:100px;" type="number"/>
            </li>
            <li>
              <button @click="subPriceBtn">查询</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="centerCon" style="width:1150px;margin-top: 10px;padding: 0 10px;background-color:#EFEFEF;" v-if="classId == 28">
      <div class="cards">
        <div class="tab-card">
          <ul>
            <li>交易金额：</li>
            <li :class="!minPrice&&!maxPrice ? 'selectPrice' : ''" v-on:click="selectPriceBtn('','')">全部</li>
            <li :class="minPrice == 0 && maxPrice == 5000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('0','5000')">0.5万以下</li>
            <li :class="minPrice == 5000 && maxPrice == 30000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('5000','30000')">0.5-3万</li>
            <li :class="minPrice == 30000 && maxPrice == 50000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('30000','50000')">3-5万</li>
            <li :class="minPrice == 50000 && maxPrice == 100000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('50000','100000')">5-10万</li>
            <li :class="minPrice == 100000 && maxPrice == 200000 ? 'selectPrice' : ''" v-on:click="selectPriceBtn('100000','200000')">10-20万</li>
            <li :class="minPrice == 200000 && !maxPrice ? 'selectPrice' : ''" v-on:click="selectPriceBtn('200000','')">20万以上</li>
            <li>
              <input v-model="minPrice" style="width:100px;" type="number"/>
              -
              <input v-model="maxPrice" style="width:100px;" type="number"/>
            </li>
            <li>
              <button @click="subPriceBtn">查询</button>
            </li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>
		<div class="shopProduct" id="shopProduct">
      <p class="noGoods" v-if="totalPage==0">暂无相关产品</p>
			<div class="imgList">
				<div class="prductList" v-for="item in prductDataList" @click="productDetail(item.id)">
					<div class="productImg">
						<img :src="$store.state.baseImgUrl+item.defalutImage" />
					</div>
					<div class="productInfo">
						<div class="proPrice">￥{{item.price == 0 ? '价格面议' : item.price}}</div>
						<div class="proTitle">{{item.title}}</div>
						<div class="shopName">{{item.shopName}}</div>
					</div>
				</div>
			</div>
		</div>
		<div class="clear"></div>
		<!-- 分页 -->
          <el-pagination class="table-pagination"
              @current-change="handlePageChange"
              :current-page="pageNo"
              :page-size="max"
              layout="total, prev, pager, next, jumper"
              :total="totalPage">
          </el-pagination>
		
		<div class="clear"></div>
	</div>
	
</template>

<script>
	import axios from 'axios'
  import Services from '../store/services'
  import services from '../store/services';
  function queryChange(name){
    let title = ''
    let keywords = ''
    let description = ''
    switch(name)
    {
    case '专利申请':
      title = '专利申请流程及费用_专利申请需要多少钱-智慧众合'
      keywords = '专利申请流程及费用,专利申请需要多少钱'
      description = '专利申请就是向国家专利机关提出申请，经国家专利机关批准并颁发证书，这个流程就是专利申请流程。而在过程中缴纳的费用、找代理公司申请所需要的费用，叫做专利申请费用。智慧众合为企业展示专利申请流程及费用、分类等，让企业了解专利申请需要多少钱。'
      break;
    case '专利检索':
      title = '专利检索与分析_专利查询检索费用是多少-智慧众合'
      keywords = '专利检索与分析,专利查询,专利查询费用,专利查询价格'
      description = '智慧众合为企业提供专利检索查询服务，专利检索过程中会产生一定的费用，具体的专利查询检索费用是多少，智慧众合页面中有详细的价格，企业可以对应不同分类进行选择购买。'
      break;
    case '专利驳回复审':
      title = '专利驳回复审费用是多少_专利驳回复审价格一览-智慧众合'
      keywords = '专利驳回复审费用'
      description = '专利在申请的过程中有可能会被驳回，专利申请驳回之后，我们需要对驳回后的意见进行复审，找出相应的问题并解决，从而能够通过申请。专利驳回复审具体费用价格已经在智慧众合平台上公开的展示出来，专利驳回复审需要多少钱清楚明确。'
      break;
    case '专利无效宣告':
      title = '专利无效宣告流程_专利无效宣告请求费用如何计算-智慧众合'
      keywords = '专利无效宣告流程,专利无效宣告费用'
      description = '专利权无效宣告流程是指自国家知识产权局公告授予专利权之日起，任何单位或个人认为该专利权的授予不符合专利法规定的，可以请求专利复审委员会宣告该专利权无效。专利无效宣告请求费用比较固定，可以通过代理公司对比。'
      break;
    case '专利无效答疑':
      title = '专利无效答疑流程及费用_专利无效检索-智慧众合'
      keywords = '专利无效答疑流程及费用,专利无效检索'
      description = '专利无效宣告之后，企业需要对该流程进行审核，通过寻找代理公司进行答疑和检索。专利无效答疑流程及费用比较明确，通过智慧众合平台可以快速查找代理公司以及答疑的价格。'
      break;
    case '专利转让交易':
      title = '专利转让交易平台_专利交易价格是多少-智慧众合'
      keywords = '专利转让交易,专利转让交易平台,专利交易价格'
      description = '智慧众合提供专利交易平台，企业之间可以通过平台进行专利交易转让，专利交易价格是多少，可以通过平台上显示的价格或者企业之间沟通协调进行了解。'
      break;
    case '商标注册':
      title = '商标注册流程及价格_注册一个商标需要多少钱-智慧众合'
      keywords = '商标注册流程及价格,注册一个商标需要多少钱'
      description = '注册商标在没有被注册的情况下，企业通过向有关部门递交资料并且通过审核后，由机构颁发证书确认商标注册成功。商标注册流程比较复杂，可以通过找代理公司的方式来解决，注册一个商标需要多少钱，可以在智慧众合平台上查看。'
      break;
    case '商标查询':
      title = '商标查询入口_哪里可以查询商标是否被注册-智慧众合'
      keywords = '商标查询入口,查询商标是否被注册,商标查询'
      description = '智慧众合为企业提供商标查询入口等服务，企业可以通过商标查询确认商标是否被注册，如果被注册则该商标不可以进行申请。企业可以联系智慧众合帮助查询商标。'
      break;
    case '商标撤三':
      title = '商标撤三流程及费用_商标撤三答辩申请-智慧众合'
      keywords = '商标撤三流程及费用,商标撤三答辩,商标撤三申请'
      description = '商标撤三是指商标因连续三年不使用而被撤销的情况,任何单位或者个人均可向商标局递交撤销申请。商标撤三要经过答辩申请等流程，在此过程中需要一定的费用。智慧众合提供了具体的流程和价格明细。'
      break;
    case '商标异议':
      title = '商标异议申请答辩_商标异议费用标准-智慧众合'
      keywords = '商标异议,商标异议申请,商标异议答辩,商标异议费用标准'
      description = '商标异议要经过多个流程，包括申请答辩，而整个商标异议的流程一般企业缺乏对应的时间和精力来处理该事件。智慧众合为企业提供合适的代理公司，同时保证价格的合理公正。'
      break;
    case '商标无效宣告':
      title = '商标无效宣告流程申请_商标无效宣告费用-智慧众合'
      keywords = '商标无效宣告流程，商标无效宣告申请，商标无效宣告费用'
      description = '商标无效宣告整个流程从申请一直到最后的裁定是一个周期过程，在这个过程中，通过智慧众合平台可以了解到商标无效宣告的费用以及相关的代理公司，可以让企业更好的度过这个周期。'
      break;
    case '商标续展':
      title = '商标续展流程及费用_商标续展价格-智慧众合'
      keywords = '商标续展流程及费用，商标续展价格'
      description = '智慧众合为企业提供不同服务机构的商标续展服务，不同机构之间的价格费用大同小异。商标续展流程的不同也会影响费用的多少，企业可以直接上智慧众合续展频道了解相关的流程和费用。'
      break;
    case '商标宽展':
      title = '商标宽展有哪些内容_商标宽展需要多少费用-智慧众合'
      keywords = '商标宽展有哪些内容，商标宽展需要多少费用'
      description = '注册商标有效期满，需要继续使用的，商标注册人应当在期满前十二个月内按照规定办理续展手续；在此期间未能办理的，可以给予六个月的宽展期。在商标到期后应该及时进行宽展，保证商标不被注销，商标宽展费用按照本地标准进行计算。'
      break;
    case '商标驳回复审':
      title = '商标驳回复审有哪些流程_需要多少钱-智慧众合'
      keywords = '商标驳回复审有哪些流程，商标驳回复审需要多少钱'
      description = '商标驳回复审，是指申请注册的商标经商标局审查驳回后，申请人对商标局的驳回理由和法律依据不服，而向商标评审委员会申请复审申请。这样复杂的流程是一般企业不愿意花费精力去做的。智慧众合为企业提供可选择的代理公司，以透明付费方式解决这个问题。'
      break;
    case '商标变更':
      title = '商标变更需要哪些材料_商标变更要花多少钱-智慧众合'
      keywords = '商标变更流程,商标变更价格'
      description = '商标变更需要提交注册时相关材料以及企业自身材料，材料准备齐全才能进行商标变更，商标变更的过程费用可以通过智慧众合了解，确认相关价格。'
      break;
    case '商标交易':
      title = '商标交易转让_商标出售价格_商标交易平台-智慧众合'
      keywords = '商标交易转让,商标价格,商标交易平台'
      description = '智慧众合为企业提供商标交易转让平台，将出售的商标明码标价，让购买者能够明确清晰的了解该商标，保证商标交易的可靠运转。'
      break;
    case '版权登记':
      title = '版权登记具体费用_版权登记服务中心-智慧众合'
      keywords = '版权登记费用,版权登记服务中心'
      description = '了解版权登记的具体费用以及相关的流程和注意事项，智慧众合版权登记服务中心为企业提供详细的费用价格、流程详解、相关资料等，保证企业在版权方面的快速顺利进行。'
      break;
    case '版权查询':
      title = '版权怎么查询_国家版权查询系统-智慧众合'
      keywords = '版权怎么查询,国家版权查询系统'
      description = '智慧众合版权查询服务中心，为企业提供专业的国家版权查询系统，同时为企业提供相关的版权政策、版权知识以及版权登记等流程费用帮助，解决关于版权出现的问题。'
      break;
    case '版权变更':
      title = '版权变更转让_版权如何进行变更转让_版权变更费用-智慧众合'
      keywords = '版权变更转让,版权变更费用,版权变更流程'
      description = '智慧众合提供一系列的版权变更的流程资料、下载模板、版权变更转让案例、版权变更转让费用，解决企业在版权变更转让上存在的问题，保证变更转让流程的顺利进行。'
      break;
    case '版权补证':
      title = '版权补证流程及费用_版权补证服务中心-智慧众合'
      keywords = '版权补证流程及费用,版权补证服务中心'
      description = '智慧众合版权补证服务中心为企业提供版权补正的完整流程及相关费用说明，服务中心设有相应的顾问，为每一家企业解决对应存在的问题，保证补证能够顺利的完成。'
      break;
    case '版权交易':
      title = '国内企业版权交易中心_版权专利交易平台-智慧众合'
      keywords = '国内企业版权交易中心,版权专利交易平台'
      description = '智慧众合为国内企业建立了专业的企业版权和专利交易中心，保证每一家企业的版权和专利能够清楚的展现出来，吸引不同的企业查看；同时版权专利交易平台可促成企业间的相关交易，保证交易的透明、公开。'
      break;
    case '域名交易':
      title = '域名买卖交易_域名备案服务中心-智慧众合'
      keywords = '域名买卖交易,域名备案服务中心'
      description = '智慧众合汇集全国域名交易信息，提供域名买卖双方交易的平台场所，保证买卖双方域名交易的正常进行，维护双方的权益。智慧众合域名备案服务中心为企业提供域名备案的咨询、管理等服务，保证域名备案的合法安全。'
      break;
    case '高新技术企业':
      title = '高新技术企业申报认定_高新技术企业年审-智慧众合'
      keywords = '高新技术企业申报认定,高新技术企业年审'
      description = '智慧众合为企业提供高新技术企业申报认定服务、高新技术企业年审服务，按照不同标准进行收费，为广大企业解决申报难、认定难的问题，同时还可以将年审进行托管，保证高新企业的持续使用。'
      break;
    case '高新技术产品':
      title = '高新技术产品申报认定_高新技术产品代理-智慧众合'
      keywords = '高新技术产品申报认定,高新技术产品代理'
      description = '智慧众合高新技术产品服务包括申报、认定、代理等，涵盖几十个行业、百个类别，建立企业与科技部门的通道，解决中间存在的障碍和问题，给企业带来方便、快捷、放心的服务。'
      break;
    case '知识产权贯标':
      title = '企业知识产权贯标_知识产权服务中心-智慧众合'
      keywords = '企业知识产权贯标,知识产权服务中心'
      description = '智慧众合知识产权服务中心为企业提供知识产权贯标服务，让企业充分了解贯标的整个流程和具体步骤，标对于企业发展有哪些重要作用。'
      break;
    case '两化融合贯标':
      title = '两化融合贯标代理_管理体系贯标咨询服务机构-智慧众合'
      keywords = '两化融合贯标代理,管理体系贯标咨询服务机构'
      description = '两化融合贯标具体流程复杂繁多，其具体作用也是非常明确，可以通过管理体系贯标咨询服务机构了解前沿正常和情况。同时机构还为企业提供两化融合贯标代理，协助企业办理相关服务。'
      break;
    case '企业研发平台':
      title = '企业研发平台创建_企业研发平台作用-智慧众合'
      keywords = '企业研发平台创建,企业研发平台作用'
      description = '企业研发平台的创建是为了更好的重组企业资源、改善组织结构，改进科技成果转化，促进企业销售。企业研发平台创建对企业发展是非常有帮助的，进入网页详细了解过程。'
      break;
    case '研发费用加计扣除':
      title = '研发费用加计扣除计算_研发费用加计扣除备案-智慧众合'
      keywords = '研发费用加计扣除计算,研发费用加计扣除备案'
      description = '研发费用加计扣除计算和备案可以交给代理公司进行办理，既可以保证办理的顺利进行，又可以减少中间复杂的程序，为企业带来更多的方便。'
      break;
    case '科技项目申报':
      title = '科技项目申报代理公司_科技项目申报怎么做-智慧众合'
      keywords = '科技项目申报代理公司,科技项目申报怎么做'
      description = '企业不同发展阶段,项目申报类型区域不同,可获不同等级金额的项目补助资金，从而更好的推动项目的发展。科技项目申报交给代理公司企业既可以减少人员成本，同时提高办事效率。'
      break;
    case '人才项目申报':
      title = '人才项目申报_人才计划申报书-智慧众合'
      keywords = '人才项目申报,人才计划申报书'
      description = '人才是企业立足的根本，人才项目申报利于企业的长久发展，能够推动企业发展创新。企业在进行人才项目申报可以通过代理公司去进行申请，能够把控基础，快速顺利的将项目申报完成。'
      break;
    case '工业设计':
      title = '工业产品设计_工业设计费用-智慧众合'
      keywords = '工业产品设计,工业设计费用'
      description = '工业产品设计包含形体和创意等方面，不同形式的设计方式对应的费用和价格也会有所差别。智慧众合将本地工业设计产品尽可能展示，同时表现费用，让企业对于工业设计上有了解和解决的途径。'
      break;
    case 'logo设计':
      title = 'LOGO设计_商标设计_LOGO设计报价-智慧众合'
      keywords = 'LOGO设计,商标设计,LOGO设计报价'
      description = 'LOGO可以理解为商标，企业的商标代表的是企业的品牌，从LOGO可以更好的展示企业的知名度，设计LOGO对于企业相当重要。LOGO设计的价格根据不同的设计公司和设计难度而定，以下只是列出对应的标价。'
      break;
    case 'VI设计':
      title = 'VI设计_企业视觉识别系统设计_VI设计价格-智慧众合'
      keywords = 'VI,企业视觉识别系统设计,VI设计价格'
      description = 'VI设计又叫企业视觉识别系统设计，是企业形象宣传的必备设计要素，其设计价格根据企业需求而定，不同公司展现出来的价格只是初步设计价格设定。'
      break;
    case 'KV设计':
      title = 'KV设计_主视觉画面设计-智慧众合'
      keywords = 'KV设计,主视觉画面设计'
      description = 'KV设计又称主视觉画面设计，通常用于平面设计当中。企业多通过KV设计来制作企业的各类宣传资料，包装成具有品牌效果。'
      break;
    case 'TVC广告':
      title = 'TVC广告设计制作_商业电视广告设计制作-智慧众合'
      keywords = 'TVC广告设计制作,商业电视广告设计制作'
      description = 'TVC广告又称商业电视广告，为企业品牌宣传的一种渠道。设计和制作TVC广告成本较高，通过找专业公司设计制作的成本较低，还能保证广告的专业性。'
      break;
    case 'PPT':
      title = 'PPT设计_PPT制作-智慧众合'
      keywords = 'PPT设计,PPT制作'
      description = '专业公司制作PPT其专业性、美观度等是一般企业所无法办到的，通过制作专业PPT对于很多资料的展示、品牌的宣传具有非常好的效果。'
      break;
    case '卡片设计':
      title = '卡片设计制作_名片设计-智慧众合'
      keywords = '卡片设计制作'
      description = '卡片广告、名片等是不错的销售推广工具，卡片设计制作一般成本不高，通过专业公司设计制作的方式能够有更好的效果。'
      break;
    case '海报设计':
      title = '海报设计_企业活动海报制作-智慧众合'
      keywords = '海报设计,企业活动海报制作'
      description = '企业活动海报制作首选网站，提供全面的海报设计公司信息、价格，促成多方合作共赢。'
      break;
    case '包装设计':
      title = '包装设计_产品包装制作-智慧众合'
      keywords = '包装设计,产品包装制作'
      description = '包装设计对于企业形象及产品功能展示都具有非常重要的意义，能够最大限度的展示产品优势的设计才是好设计，智慧众合提供全方位的包装设计服务。'
      break;
    case '画册':
      title = '画册制作_宣传画册-智慧众合'
      keywords = '画册制作,宣传画册'
      description = '画册制作主要内容包括企业文化内容、企业产品、企业品牌、企业的售后管理等，更多突出企业的优势，带来吸引客户的效果。'
      break;
    case '工商注册':
      title = '工商注册流程_工商注册查询系统-智慧众合'
      keywords = '工商注册流程,工商注册查询系统'
      description = '企业需要走哪些工商注册流程？怎么进行工商注册查询？每一个企业都会遇到这些问题。智慧众合为企业提供工商注册流程详解，帮助企业办理注册；同时提供工商注册查询系统，及时查询注册信息。'
      break;
    case '公司注销':
      title = '公司如何注销_公司注销办理-智慧众合'
      keywords = '公司如何注销,公司注销办理'
      description = '公司当经营不力或者进行更换，需要走注销流程。公司注销流程是什么走的呢？公司注销如何办理？智慧众合为企业提供公司注销办理服务，保障企业最基本的权益。'
      break;
    case '公司变更':
      title = '公司变更流程_公司变更费用-智慧众合'
      keywords = '公司变更流程,公司变更费用'
      description = '公司变更内容有法人、地址、股权变化等，需要经过一定的变更流程。公司变更流程办理找代理公司，费用合理透明，保证企业快速完成办理流程，解决问题。'
      break;
    case '海外公司注册':
      title = '海外公司如何注册_海外公司注册代理-智慧众合'
      keywords = '海外公司如何注册,海外公司注册代理'
      description = '企业想要去国外发展变要进行海外公司注册，注册流程很复杂，交给专业代理公司可以事半功倍。智慧众合为企业个提供海外公司注册代理，保证企业问题快速解决。'
      break;
    case '香港公司注册':
      title = '香港公司注册流程_代理公司费用-智慧众合'
      keywords = '香港公司注册流程,代理公司费用'
      description = '在香港开公司要怎么去注册？需要走哪些流程呢？有没有代理公司可以办理？费用是多少呢？智慧众合给企业提供专业代理公司，费用透明合理，办事专业效率。'
      break;
    case '财务报表':
      title = '财务报表制作_财务报表分析-智慧众合'
      keywords = '财务报表制作,财务报表分析'
      description = '公司财务报表制作-财务报表分析要通过专业的财务代理公司进行制作和分析，才能够得到专业性的数据和分析意见，为之后的财务使用提供指导，保证公司的正常运转。'
      break;
    case '代理记账':
      title = '代理记账公司_代理记账费用-智慧众合'
      keywords = '代理记账公司,代理记账费用'
      description = '平台提供本地区全面的代理记账公司，具有专业性、可选择性、价格透明性等特点，保证广大企业对于代理记账方面服务有全方位的满足。'
      break;
    case '知识产权培训':
      title = '企业知识产权培训_知识产权培训中心-智慧众合'
      keywords = '企业知识产权培训,知识产权培训中心'
      description = '知识产权培训中心助力企业自主完成知识产权流程办理，通过对于知识产权流程了解、申办等过程的详细培训，让企业自己独立能够按照相关政策流程解决项目申报、工商注册、专利申请等问题。'
      break;
    case '工商管理培训':
      title = '企业工商管理培训_工商管理培训机构-智慧众合'
      keywords = '企业工商管理培训,工商管理培训机构'
      description = '企业工商管理培训致力于让全面了解当前经济形势和发展趋势、人力资源开发和管理、知识产权法律和管理、企业战略是市场营销策略和运营等，让企业在当前发展过程中处于不败地位。'
      break;
    case ' 战略培训':
      title = '战略培训-智慧众合'
      keywords = '战略培训'
      description = '企业战略培训涉及到公司的管理、性质和发展等多个关键因素，通过培训弥补企业自身不足，并且进行改进，保证企业对于当前的环境有一定的竞争力。'
      break;
    case 'HR培训':
      title = 'HR培训_人力资源培训-智慧众合'
      keywords = 'HR培训,人力资源培训'
      description = '人才是企业发展的关键因素，HR培训又称人力资源培训，保证企业对于人才的管理和使用的恰当，充分发挥人才的能力，让人才为企业发展带来推动力。'
      break;
    case '战略咨询':
      title = '企业战略咨询-智慧众合'
      keywords = '企业战略咨询'
      description = '企业发展不会一沉不变，要根据不同的经济形势和当前的政策环境作出相应的改变，智慧众合为企业提供战略咨询服务，让企业对发展有充分的了解和认知。'
      break;
    case 'HR咨询':
      title = 'HR咨询-智慧众合'
      keywords = 'HR咨询'
      description = '人力资源咨询是为企业提供的改进人才管理制度，提供人才能力开发而进行的，为企业解决人才资源带来的企业发展问题。'
      break;
    case '扩展培训':
      title = '扩展培训-智慧众合'
      keywords = '扩展培训'
      description = '扩展培训是为企业专门设计和实践的，通过某一事件或者活动的组织，让企业感受到自身存在的问题，以及独立发现处理问题的办法。'
      break;
    case '劳务派遣':
      title = '劳务派遣-智慧众合'
      keywords = '劳务派遣'
      description = '智慧众合为解决企业用工难题，创建劳务派遣中心，将劳务派遣机构和企业进行对接，保证企业用工问题能够得到解决。'
      break;
    case '委托招聘':
      title = '委托招聘-智慧众合'
      keywords = '委托招聘'
      description = '智慧众合为解决企业用工难题，创建劳务派遣中心，将企业用户需求代理发布到人力 资源公司，协助解决企业用工问题。'
      break;
    case '品牌策划':
      title = '品牌策划方案_品牌策划公司-智慧众合'
      keywords = '品牌策划方案,品牌策划公司'
      description = '品牌策划就是使企业形象和产品品牌融合在一起，能够让消费者在心中潜移默化，易记于消费者脑海。品牌策划公司就是通过策划方案，形成品牌效应。'
      break;
    case '互联网推广方案':
      title = '互联网推广方案_互联网推广渠道-智慧众合'
      keywords = '互联网推广方案,互联网推广渠道'
      description = '互联网推广方案利用不同的推广渠道和方法，将企业产品品牌形象展示给用户，并且长期展现于用户眼前，达到品牌效果的方式。'
      break;
    case '线下实体推广':
      title = '线下实体推广-智慧众合'
      keywords = '线下实体推广'
      description = '企业通过线下推广的方式，将自己的广告、产品、品牌形象展示出去，扩大自己的影响，从而提高自己的销售。'
      break;
    case '企业网络代运营':
      title = '企业网络代运营-智慧众合'
      keywords = '企业网络代运营'
      description = '当前很多企业并不会自己通过网络进行运营，可以对接给网路代运营公司，代运营公司每销售一件产品就可以从中获取利润，对于企业和运营公司都是非常有帮助的。'
      break;
    case '电商平台代运营':
      title = '电商平台代运营-智慧众合'
      keywords = '电商平台代运营'
      description = '很多企业的产品是可以通过电商的方式进行销售的，除了自己的电商网站外，还可以通过别人的电商平台进行代运营，开发不同的销售渠道，有利于自己的发展。'
      break;
    case ' 孵化器':
      title = '企业孵化器-智慧众合'
      keywords = '企业孵化器'
      description = '企业孵化器通过为新创办的科技型中小企业提供物理空间和基础设施，提供一系列的服务支持，进而降低创业者的创业风险和创业成本，提高创业成功率。帮助企业进行创业和开发科技成果。'
      break;
    case '众创空间':
      title = '众创空间-智慧众合'
      keywords = '众创空间'
      description = '众创空间要充分发挥社会力量作用，为创业者提供良好的工作空间、网络空间、社交空间和资源共享空间。辅助创业者进行创业，减少创业成本降低创业风险。'
      break;
    case '律师咨询':
      title = '律师咨询-智慧众合'
      keywords = '律师咨询'
      description = '平台为企业提供相应的法律咨询，为企业在发展道路上减少对应的阻碍，让企业能够合法合理的发展，保证自身利益。'
      break;
    case '法律顾问':
      title = '法律顾问-智慧众合'
      keywords = '法律顾问'
      description = '为企业提供法律顾问咨询，在法律上进行援助支持，让企业尽可能避免出现政策上的违规，合同上的漏洞以及权益无法保障。'
      break;
    case '合同文书拟审':
      title = '合同文书拟审-智慧众合'
      keywords = '合同文书拟审'
      description = '为企业对接合同文书拟审的代理公司，审核合同有无漏洞，保障企业正常权益。'
      break;
    case '代理诉讼':
      title = '代理诉讼-智慧众合'
      keywords = '代理诉讼'
      description = '代理诉讼'
      break;
    case '':
      title = '纠纷调解-智慧众合'
      keywords = '纠纷调解'
      description = '纠纷调解'
      break;
    default:
      title = name+'-智慧众合'
      keywords = '知识产权,知识产权交易,法律咨询,商标注册,网络开发,商标转让,专利技术交易,工商财税,建站服务,科技项目,知识产权百科,知识产权资讯,安徽知识产权与企业资源共享平台,智慧众合'
      description = '咨询电话：0550-303209，智慧众合（众合（www.zhihuizhonghe.com）提供线）提供线上线下一站式的创新服务，创建知识产权交易和综合服务线上线下相融合的新模式，汇聚全国创新资源为企业和个人提供定制化解决方案，将创意、技能，智慧转化为商业价值和社会价值。目前公司主要有四大服务类知识产权服务、创新服务、创业服务、产业链服务。'
    }
    var obj = {
      title: title,
      keywords: keywords,
      description: description,
    }
    return obj
  }
	export default {
    async asyncData (route) {
      let [data,resourceCategory] = await Promise.all([
        Services.getProductClass(),
        services.getResourceCategoryList()
      ])
      var obj = queryChange(route.query._n)
      return {
        title: obj.title,
        keywords: obj.keywords,
        description: obj.description,
        productClassList: data.data.result.productClassList,
        resourceCategoryList: resourceCategory.data.result.resourceCategoryList
      }
    },
  	beforeCreate () {
	    this.$store.dispatch('setNavName', '商品列表')
	  },
    head() {
	    return {
        title: this.title,
        meta: [
					{ hid: 'keywords', name: 'keywords', content: this.keywords },
					{ hid: 'description', name: 'description', content: this.description }
				]
	    }
	  },
	  data () {
	  	return {
        searchInfo: {},
	  		prductDataList:[],
	  		//分页
        pageNo: 1,
        totalPage: 0,
        max: 25,
        selectParentId: '',
        classId: '',
        secondClass: '',
        classList: [],
        selectZyClass: '',
        zyTwoclassId: '',
        zyClassId: '',
        maxPrice: '',
        minPrice: ''
	  	}
    },
    watch: {
      $route: {
        handler: function(val){
          if(val.query){
            if(val.query.productClassId != this.classId){
              this.selectZyClass = ''
              this.zyTwoclassId = ''
              this.zyClassId = ''
              var obj = queryChange(this.$route.query._n)
              this.title = obj.title
              this.keywords = obj.keywords
              this.description = obj.description
              this.searchInfo = this.$route.query
              if(this.searchInfo.productClassId){
                this.searchInfo.productClassId = Number(this.searchInfo.productClassId)
              }
              this.pageNo = 1
              this.searchInfo.pageNo = this.pageNo
              this.searchInfo.max = this.max
              this.minPrice = ''
              this.maxPrice = ''
              this.showProductInit(this.searchInfo);
              if(this.$route.query.productClassId){
                this.classList = []
                this.classList.push(this.$route.query.productClassId)
                this.getActiveId()
              }
            }
          }
        },
        // 深度观察监听
        deep: true
      }
    },
	  mounted(){
      this.searchInfo = this.$route.query
      if(this.searchInfo.productClassId){
        this.searchInfo.productClassId = Number(this.searchInfo.productClassId)
      }
      this.searchInfo.pageNo = this.pageNo
      this.searchInfo.max = this.max
      this.minPrice = ''
      this.maxPrice = ''
      this.showProductInit(this.searchInfo);
      if(this.$route.query.productClassId){
        this.classList.push(this.$route.query.productClassId)
        this.getActiveId()
      }
	  },
	  methods: {
      getActiveId(){
        let val = this.classList[this.classList.length-1]
        for(var i = 0; i<this.productClassList.length;i++){
          if(this.productClassList[i].id == val && this.productClassList[i].parentId){
            this.classList.push(this.productClassList[i].parentId)
            val = this.classList[this.classList.length-1]
            i=0
          }
        }
        var len = this.classList.length
        this.classId = this.classList[0]
        this.selectParentId = this.classList[0]
        if(len==2){
          this.secondClass = this.classList[0]
          this.selectParentId = this.classList[1]
        }
        if(len==3){
          this.secondClass = this.classList[1]
          this.selectParentId = this.classList[2]
        }
      },
      tabsSwitch(id){
				if(this.selectParentId != id){
					this.secondClass = ''
					this.selectParentId = id
				}
      },
      changeClassId(val,tow,name){
        this.$router.push({path: '/goodsList', query: {productClassId:val,_n: name}})
        // if(this.classId != val){
				// 	if(tow){
				// 		this.secondClass = val
				// 	}
        //   this.classId = val
        //   this.pageNo = 1
        //   this.showProductInit({
	      //     pageNo: this.pageNo,
        //     max: this.max,
        //     productClassId: Number(this.classId)
	      //   })
        // }
      },
      changeZyClassId(val,tow,name){
        if(this.zyClassId != val){
					if(tow == 1){
						this.selectZyClass = val
          }
          if(tow == 2){
            this.zyTwoclassId = val
          }
          this.zyClassId = val
          this.pageNo = 1
          this.minPrice = ''
          this.maxPrice = ''
          this.showProductInit({
	          pageNo: this.pageNo,
            max: this.max,
            resourceCategoryId: Number(this.zyClassId)
	        })
        }
      },
	    //产品展示
	    showProductInit(param){
        let params = param
        if(this.minPrice){
          params.minPrice = Number(this.minPrice)
        }
        if(this.maxPrice){
          params.maxPrice = Number(this.maxPrice)
        }
	    	Services.showProduct(params).then(response => {
		      	if(response.data.code == 200){
                  	this.prductDataList = response.data.result.productList;
                  	this.totalPage = Number(response.data.result.pageable.total);
              	}
          	})
	    },
	    //分页
	    handlePageChange(val) {
	        this.pageNo = val
	        this.showProductInit({
	          pageNo: this.pageNo,
            max: this.max,
            resourceCategoryId: Number(this.zyClassId),
            productClassId: this.searchInfo.productClassId
	        })
	    },
	    //查看详情
	    productDetail(id){
        var tempwindow=window.open();
        tempwindow.location='/productDetail?id='+id
      },
      selectPriceBtn(min,max){
        this.minPrice = min
        this.maxPrice = max
        this.pageNo = 1
        this.showProductInit({
          pageNo: this.pageNo,
          max: this.max,
          resourceCategoryId: Number(this.zyClassId),
          productClassId: this.searchInfo.productClassId
        })
      },
      subPriceBtn(){
        this.pageNo = 1
        this.showProductInit({
          pageNo: this.pageNo,
          max: this.max,
          resourceCategoryId: Number(this.zyClassId),
          productClassId: this.searchInfo.productClassId
        })
      }
	  }
  }
</script>

<style scoped lang="scss">
	/*产品介绍*/
  .goodsListMain{
    width: 1170px;
    margin: 0 auto;
    .centerCon{
      width: 100%;
      height: auto;
      zoom: 1;
      overflow: hidden;
      margin-top: 30px;
      background-color: #FFFFFF;
      font-size: 14px;
    }
    .tabs{
      border-bottom: 1px solid #26a9e1;
    }
    .tabs li {
      float: left;
      list-style: none;
      color: #333333;
    }
    .tabs .tab-link {
      display: block;
      padding: 15px 15px;
      text-decoration: none;
      font-weight: bold;
      cursor: pointer;
    }

    .tabs .tab-link.active {
      border-bottom: 1px solid #ffffff;
      color: #26a9e1;
    }
    .cards {
      float: left;
      width: 100%;
      height: 100%;
    }

    .cards .tab-card {
      height: auto;
      overflow: hidden;
      border-bottom: 1px solid #EFEFEF;
    }
    .cards .tab-card ul{
      width: 100%;
      height: auto;	
    }
    .cards .tab-card ul li{
      float: left;
      padding: 10px 10px;
      cursor: pointer;
    }
    .cards .tab-card ul li p{
      padding: 5px 10px;
      border-radius: 15px;
    }
    .cards .tab-card ul li.active p{
      color: #ffffff;
      background-color: #26A9E1;
    }
    .selectPrice{
      color: #26A9E1;
    }
    .noGoods{
      line-height: 80px;
      text-align: center;
      color: #666666;
      font-size: 18px;
    }
    .shopProduct{
      width: 100%;
      height: 300px;
      margin: 30px auto;
    }
    .prductList{
      display: block;
      float: left;
      width: 18.4%;
      height: 300px;
      background-color: #FFFFFF;
      text-align: center;
      padding: 10px 0;
      margin-bottom: 30px;
      margin-right: 2%;
      cursor: pointer;
      position: relative;
      box-shadow: 0px 0px 1px 1px #F1F1F1;
    }
    .prductList:nth-child(5n+5) {
      margin-right: 0;
    }
    .prductList:hover{
      -moz-box-shadow:0px 0px 4px 2px #BDBDBD;
      -webkit-box-shadow:0px 0px 4px 2px #BDBDBD;
      box-shadow:0px 0px 4px 2px #BDBDBD;
    }
    .prductList .productImg{
      width: 200px;
      height: 200px;
      margin: 0 auto;
    }
    .prductList .productImg img{
      display: inline-block;
      vertical-align: middle;
      width:100%;
      height:100%;
    }
    .proTitle{
      position: absolute;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      text-align: left;
      margin: 10px;
      bottom: 40px;
      color: #000000;
      font-size: 14px;
    }
    .proPrice{
      position: absolute;
      bottom: 70px;
      color: #FF7E23;
      text-align: left;
      margin: 10px;
      font-size: 16px;
      font-weight: bold;
    }
    .shopName{
      position: absolute;
      bottom: 0px;
      color: #3d3d3d;
      line-height: 15px;
      text-align: left;
      margin: 10px;
      font-size: 12px;
    }
    /*分页*/
    .table-pagination{
        margin: 15px 0;
        text-align: center;
    }
  }
	
</style>