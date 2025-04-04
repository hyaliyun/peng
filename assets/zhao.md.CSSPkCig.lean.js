import{_ as h,c as d,o as e,j as a,am as _,F as r,B as b,n as u,t as v,e as p,G as g}from"./chunks/framework.BfSFLCaK.js";const y="/assets/logo.DjECHND_.png",f="/assets/1.DQM61ol8.jpg",j="/assets/2.CjwvsGiZ.jpg",C="/assets/3.DsKWCemd.jpg",T="/assets/4.BjSlc0DH.jpg",k="/assets/11.CaZ831oD.jpg",I="/assets/6.DjVnaKXq.jpg",P="/assets/7.C1SHmtHU.jpg",D="/assets/8.mCTLXTCd.jpg",E="/assets/18.t974Zyo8.jpg",L="/assets/16.gNgD0uip.jpg",S="/assets/14.B1vM-G8i.jpg",B="/assets/17.CFVTD7i1.jpg",N="/assets/12.BYRMG4tA.jpg",V="/assets/9.DCdJXTL3.jpg",A="/assets/10.ekeZvuNb.jpg",M="/assets/15.Dljjefp3.png",w={data(){return{applyLink:"https://hpyapp.avaryholding.com/weixin/jobwanted.html?user_id=165932&pos_id=133",activeTab:0,tabs:[{title:"工程师类"},{title:"技术员类"},{title:"普工"}],engineerPositions:[{title:"产品研发工程师",desc:"负责新产品、新制程、新材料的研发工作",major:"材料/化工类、物理/光学类、电子/电气类等"},{title:"生产管理师",desc:"负责生产计划、品质管理、安全管理等工作",major:"工业工程、化学/化工类、工业安全等"},{title:"电子工程师",desc:"负责电子电路设计、测试及相关技术支持",major:"电子/电气类、机电/机械类、自动化等"},{title:"IT工程师",desc:"负责公司信息系统开发与维护",major:"IT/计算机类、数学类相关专业"}],technicianPositions:[{title:"生产技术员",desc:"负责生产线操作与维护"},{title:"品保技术员",desc:"负责产品质量检验与控制"},{title:"设备技术员",desc:"负责生产设备维护与保养"},{title:"仓管员",desc:"负责物料收发与库存管理"}],elitePositions:[{title:"车间操作员（普工）",desc:"负责生产车间操作工作"},{title:"重磅福利",desc:`
      新人入职奖900元（分3月发放）
      免费住宿 拎包入住
      入职体检0费用
      综合薪资5295-7095元
      每月7号准时发薪
    `},{title:"岗位要求",desc:`
      年龄18-45岁
      无经验免费培训
      适应两班倒
      需身份证原件
      无案底及纹身
    `},{title:"薪资结构",desc:`
      底薪2520元 + 补贴400元（夜班另享10元/天）
      加班费：平日21.72元/h、周末28.97元/h、节假日43.45元/h
      津贴奖金：岗位津贴100元+绩效奖400-1100元+旺季奖700元
    `}]}},methods:{handleImageLoad(n){n.target.classList.add("loaded")},handleImageError(n){n.target.style.display="none";const t=document.createElement("div");t.className="img-placeholder",t.textContent="图片加载失败",n.target.parentNode.appendChild(t)}},mounted(){document.querySelectorAll("img").forEach(t=>{if(t.complete?t.classList.add("loaded"):(t.addEventListener("load",this.handleImageLoad),t.addEventListener("error",this.handleImageError)),"IntersectionObserver"in window){const c=new IntersectionObserver(m=>{m.forEach(s=>{if(s.isIntersecting){const o=s.target;o.dataset.src&&(o.src=o.dataset.src),c.unobserve(o)}})});t.dataset.src&&c.observe(t)}})},beforeDestroy(){document.querySelectorAll("img").forEach(t=>{t.removeEventListener("load",this.handleImageLoad),t.removeEventListener("error",this.handleImageError)})}},x={class:"pengding-recruitment"},z={class:"hero"},q={class:"hero-content"},F=["href"],G={class:"positions-section"},H={class:"container"},O={class:"tabs"},Z=["onClick"],R={class:"tab-content"},X={key:0,class:"position-grid"},J={class:"requirements"},K={key:1,class:"position-grid"},W={key:2,class:"position-grid"},Q={key:0,class:"requirements"},U={class:"apply-section"},Y={class:"container"},$={class:"apply-content"},aa={class:"apply-action"},ta=["href"];function sa(n,t,c,m,s,o){return e(),d("div",x,[a("header",z,[t[2]||(t[2]=a("div",{class:"logo-container"},[a("img",{src:y,alt:"鹏鼎控股招聘",class:"hero-logo"})],-1)),a("div",q,[t[0]||(t[0]=a("h1",null,"加入鹏鼎控股 · 共创芯未来",-1)),t[1]||(t[1]=a("p",{class:"tagline"},"全球PCB行业领导者 · 连续7年全球第一",-1)),a("a",{href:s.applyLink,class:"apply-button"},"立即报名",8,F)])]),t[9]||(t[9]=_("",2)),a("section",G,[a("div",H,[t[5]||(t[5]=a("h2",null,"招聘岗位 · 期待你的加入",-1)),a("div",O,[(e(!0),d(r,null,b(s.tabs,(i,l)=>(e(),d("button",{key:l,onClick:ia=>s.activeTab=l,class:u({active:s.activeTab===l})},v(i.title),11,Z))),128))]),a("div",R,[s.activeTab===0?(e(),d("div",X,[(e(!0),d(r,null,b(s.engineerPositions,(i,l)=>(e(),d("div",{class:"position-card",key:l},[a("h3",null,v(i.title),1),a("p",null,v(i.desc),1),a("div",J,[t[3]||(t[3]=a("h4",null,"需求专业:",-1)),a("p",null,v(i.major),1)])]))),128))])):p("",!0),s.activeTab===1?(e(),d("div",K,[(e(!0),d(r,null,b(s.technicianPositions,(i,l)=>(e(),d("div",{class:"position-card",key:l},[a("h3",null,v(i.title),1),a("p",null,v(i.desc),1)]))),128))])):p("",!0),s.activeTab===2?(e(),d("div",W,[(e(!0),d(r,null,b(s.elitePositions,(i,l)=>(e(),d("div",{class:"position-card",key:l},[a("h3",null,v(i.title),1),a("p",null,v(i.desc),1),i.major?(e(),d("div",Q,[t[4]||(t[4]=a("h4",null,"需求专业:",-1)),a("p",null,v(i.major),1)])):p("",!0)]))),128))])):p("",!0)])])]),t[10]||(t[10]=_("",3)),a("section",U,[a("div",Y,[t[8]||(t[8]=a("h2",null,"加入我们 · 开启职业新篇章",-1)),a("div",$,[t[7]||(t[7]=a("div",{class:"apply-info"},[a("h3",null,"面试须知"),a("ul",null,[a("li",null,"面试时间: 周一至周六 (上午8:00-10:30 下午13:30-15:30)"),a("li",null,"请携带身份证原件及相关证件"),a("li",null,"公司地址: 深圳市宝安区燕罗街道燕川社区松罗路鹏鼎控股"),a("li",null,"乘车路线: M248/M332/M260/M542/M495等公交线路")]),a("div",{class:"highlight-box"},[a("h4",null,"推荐有奖"),a("p",null,"推荐成功入职可获得丰厚奖金，详情请咨询招聘专员")])],-1)),a("div",aa,[a("a",{href:s.applyLink,class:"apply-button-large"},"立即在线报名",8,ta),t[6]||(t[6]=a("p",{class:"note"},"* 本招聘长期有效，欢迎随时报名",-1))])])])])])}const da=h(w,[["render",sa],["__scopeId","data-v-32bed351"]]),va=JSON.parse('{"title":"","description":"","frontmatter":{"page":true,"head":[["link",{"rel":"canonical","href":"https://b.14ll.com/zhao"}],["meta",{"property":"og:title","content":""}]]},"headers":[],"relativePath":"zhao.md","filePath":"zhao.md"}'),ea={name:"zhao.md"},na=Object.assign(ea,{setup(n){return(t,c)=>(e(),d("div",null,[g(da)]))}});export{va as __pageData,na as default};
