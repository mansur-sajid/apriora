(()=>{var e={};e.id=307,e.ids=[307],e.modules={3295:e=>{"use strict";e.exports=require("next/dist/server/app-render/after-task-async-storage.external.js")},9798:(e,t,r)=>{Promise.resolve().then(r.bind(r,80911))},10846:e=>{"use strict";e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},11997:e=>{"use strict";e.exports=require("punycode")},19121:e=>{"use strict";e.exports=require("next/dist/server/app-render/action-async-storage.external.js")},27910:e=>{"use strict";e.exports=require("stream")},29294:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-async-storage.external.js")},33873:e=>{"use strict";e.exports=require("path")},40528:(e,t,r)=>{"use strict";r.r(t),r.d(t,{GlobalError:()=>n.a,__next_app__:()=>p,pages:()=>c,routeModule:()=>u,tree:()=>d});var o=r(65239),i=r(48088),a=r(88170),n=r.n(a),s=r(30893),l={};for(let e in s)0>["default","tree","pages","GlobalError","__next_app__","routeModule"].indexOf(e)&&(l[e]=()=>s[e]);r.d(t,l);let d={children:["",{children:["(main)",{children:["reports",{children:["__PAGE__",{},{page:[()=>Promise.resolve().then(r.bind(r,69283)),"/home/mirza-zeeshan/Apriora/apriora/src/app/(main)/reports/page.tsx"]}]},{}]},{layout:[()=>Promise.resolve().then(r.bind(r,60448)),"/home/mirza-zeeshan/Apriora/apriora/src/app/(main)/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[],apple:[],openGraph:[],twitter:[],manifest:"/manifest.webmanifest"}}]},{layout:[()=>Promise.resolve().then(r.bind(r,94431)),"/home/mirza-zeeshan/Apriora/apriora/src/app/layout.tsx"],"not-found":[()=>Promise.resolve().then(r.t.bind(r,57398,23)),"next/dist/client/components/not-found-error"],forbidden:[()=>Promise.resolve().then(r.t.bind(r,89999,23)),"next/dist/client/components/forbidden-error"],unauthorized:[()=>Promise.resolve().then(r.t.bind(r,65284,23)),"next/dist/client/components/unauthorized-error"],metadata:{icon:[],apple:[],openGraph:[],twitter:[],manifest:"/manifest.webmanifest"}}]}.children,c=["/home/mirza-zeeshan/Apriora/apriora/src/app/(main)/reports/page.tsx"],p={require:r,loadChunk:()=>Promise.resolve()},u=new o.AppPageRouteModule({definition:{kind:i.RouteKind.APP_PAGE,page:"/(main)/reports/page",pathname:"/reports",bundlePath:"",filename:"",appPaths:[]},userland:{loaderTree:d}})},41342:(e,t,r)=>{Promise.resolve().then(r.bind(r,69283))},55591:e=>{"use strict";e.exports=require("https")},63033:e=>{"use strict";e.exports=require("next/dist/server/app-render/work-unit-async-storage.external.js")},64796:(e,t,r)=>{"use strict";r.d(t,{AG:()=>p,fi:()=>u,cr:()=>m,MO:()=>y,NH:()=>h,bC:()=>$,wc:()=>J,RB:()=>M,AY:()=>f,OD:()=>x,bE:()=>R,Br:()=>A,LF:()=>w,lI:()=>C,jb:()=>q,GF:()=>T,EL:()=>K,n6:()=>D});var o=r(54050),i=r(29494);class a extends Error{constructor(e="Validation Error",t=500,r={}){super(e),this.name=this.constructor.name,this.status=t,this.message=e,r&&(this.meta=r),Error.captureStackTrace?.(this,this.constructor)}}var n=r(99638),s=r(56002),l=r.n(s);let d=new n.l4("https://prototype-apriora.duckdns.org/graphql",{fetch:l(),credentials:"include"});function c(e,t,r){return async()=>d.request(e,t,r).catch(({response:e})=>{throw new a(e?.error,e?.status,{response:e})})}var p=function(e){return e.FourWeeksNotice="FOUR_WEEKS_NOTICE",e.Immediate="IMMEDIATE",e.ThreeWeeksNotice="THREE_WEEKS_NOTICE",e.TwoWeeksNotice="TWO_WEEKS_NOTICE",e}({}),u=function(e){return e.Contract="CONTRACT",e.FullTime="FULL_TIME",e.PartTime="PART_TIME",e}({}),m=function(e){return e.Hourly="HOURLY",e.Unit="UNIT",e}({}),y=function(e){return e.Archived="ARCHIVED",e.Draft="DRAFT",e.Published="PUBLISHED",e}({}),h=function(e){return e.Hybrid="HYBRID",e.OnSite="ON_SITE",e.Remote="REMOTE",e}({});let b=`
    mutation CreateJobPostApplication($data: JobPostApplicationCreateInput!) {
  createJobPostApplication(data: $data) {
    ... on JobPostApplicationType {
      id
    }
    ... on GraphQLErrorType {
      message
      code
    }
  }
}
    `,f=e=>(0,o.n)({mutationKey:["CreateJobPostApplication"],mutationFn:e=>c(b,e)(),...e});f.getKey=()=>["CreateJobPostApplication"],f.fetcher=(e,t)=>c(b,e,t);let v=`
    mutation CreateJobPost($data: JobPostCreateInput!) {
  jobPostCreate(data: $data) {
    id
  }
}
    `,x=e=>(0,o.n)({mutationKey:["CreateJobPost"],mutationFn:e=>c(v,e)(),...e});x.getKey=()=>["CreateJobPost"],x.fetcher=(e,t)=>c(v,e,t);let g=`
    mutation getInterviewSumary($interviewId: UUID!) {
  getSummary(interviewId: $interviewId) {
    summary
    communication
    cultureFit
    curiosity
    experience
    overallScore
    problemSolving
    technicalAbility
  }
}
    `,A=e=>(0,o.n)({mutationKey:["getInterviewSumary"],mutationFn:e=>c(g,e)(),...e});A.getKey=()=>["getInterviewSumary"],A.fetcher=(e,t)=>c(g,e,t);let j=`
    query Interview($id: GlobalID!) {
  interviews(filters: {id: $id}) {
    edges {
      node {
        id
        questions {
          question
        }
        user {
          name
        }
        jobPostApplication {
          jobPost {
            company {
              name
            }
            title
          }
        }
      }
    }
  }
}
    `,w=(e,t)=>(0,i.I)({queryKey:["Interview",e],queryFn:c(j,e),...t});w.getKey=e=>["Interview",e],w.fetcher=(e,t)=>c(j,e,t);let P=`
    query JobSeekerKpis {
  jobSeekerKpis {
    followUps
    followUpsChangePercent
    interviewsAttended
    interviewsAttendedChangePercent
    jobsApplied
    jobsAppliedChangePercent
    pendingInterviews
    pendingInterviewsChangePercent
  }
}
    `,C=(e,t)=>(0,i.I)({queryKey:void 0===e?["JobSeekerKpis"]:["JobSeekerKpis",e],queryFn:c(P,e),...t});C.getKey=e=>void 0===e?["JobSeekerKpis"]:["JobSeekerKpis",e],C.fetcher=(e,t)=>c(P,e,t);let k=`
    query RecruiterKpis {
  recruiterKpis {
    interviewed
    interviewedChangePercent
    jobsPosted
    jobsPostedChangePercent
    totalApplicants
    totalApplicantsChangePercent
  }
}
    `,T=(e,t)=>(0,i.I)({queryKey:void 0===e?["RecruiterKpis"]:["RecruiterKpis",e],queryFn:c(k,e),...t});T.getKey=e=>void 0===e?["RecruiterKpis"]:["RecruiterKpis",e],T.fetcher=(e,t)=>c(k,e,t);let S=`
    query AppliedJobs {
  appliedJobPosts {
    jobPost {
      availibility
      applicationLimit
      city
      country
      company {
        name
      }
      workStartDate
      workMode
      updatedAt
      totalApplications
      title
      status
      startDate
      salary
      payType
      id
      firstPublishedAt
      expiresAt
      endDate
      employmentType
      description
      department
      deletedAt
      createdAt
    }
    interview {
      scheduledAt
      user {
        name
      }
    }
  }
}
    `,M=(e,t)=>(0,i.I)({queryKey:void 0===e?["AppliedJobs"]:["AppliedJobs",e],queryFn:c(S,e),...t});M.getKey=e=>void 0===e?["AppliedJobs"]:["AppliedJobs",e],M.fetcher=(e,t)=>c(S,e,t);let I=`
    query getAllSummaries {
  summary {
    summary {
      summary
    }
    jobPost {
      title
    }
    user {
      email
      lastName
      firstName
    }
    interview {
      scheduledAt
    }
  }
}
    `,R=(e,t)=>(0,i.I)({queryKey:void 0===e?["getAllSummaries"]:["getAllSummaries",e],queryFn:c(I,e),...t});R.getKey=e=>void 0===e?["getAllSummaries"]:["getAllSummaries",e],R.fetcher=(e,t)=>c(I,e,t);let _=`
    query JobsPosts {
  jobPosts {
    applicationLimit
    availibility
    city
    company {
      name
    }
    country
    createdAt
    deletedAt
    department
    description
    employmentType
    endDate
    expiresAt
    firstPublishedAt
    id
    payType
    startDate
    salary
    status
    title
    totalApplications
    updatedAt
    workMode
    workStartDate
  }
}
    `,q=(e,t)=>(0,i.I)({queryKey:void 0===e?["JobsPosts"]:["JobsPosts",e],queryFn:c(_,e),...t});q.getKey=e=>void 0===e?["JobsPosts"]:["JobsPosts",e],q.fetcher=(e,t)=>c(_,e,t);let z=`
    query UnappliedJobs {
  unappliedJobPosts {
    applicationLimit
    availibility
    city
    company {
      name
    }
    country
    createdAt
    deletedAt
    department
    description
    employmentType
    endDate
    expiresAt
    firstPublishedAt
    id
    payType
    startDate
    salary
    status
    title
    totalApplications
    updatedAt
    workMode
    workStartDate
  }
}
    `,K=(e,t)=>(0,i.I)({queryKey:void 0===e?["UnappliedJobs"]:["UnappliedJobs",e],queryFn:c(z,e),...t});K.getKey=e=>void 0===e?["UnappliedJobs"]:["UnappliedJobs",e],K.fetcher=(e,t)=>c(z,e,t);let E=`
    query UpcomingInterview {
  upcomingInterview {
    id
    scheduledAt
    jobPostApplication {
      jobPost {
        applicationLimit
        availibility
        city
        company {
          name
        }
        country
        createdAt
        deletedAt
        department
        description
        employmentType
        endDate
        expiresAt
        firstPublishedAt
        id
        payType
        startDate
        salary
        status
        title
        totalApplications
        updatedAt
        workMode
        workStartDate
      }
    }
  }
}
    `,D=(e,t)=>(0,i.I)({queryKey:void 0===e?["UpcomingInterview"]:["UpcomingInterview",e],queryFn:c(E,e),...t});function J(e,t){return t?Buffer.from(`${e}:${t}`).toString("base64"):""}function $(e){return e?Buffer.from(e,"base64").toString("ascii").split(":")?.[1]:""}D.getKey=e=>void 0===e?["UpcomingInterview"]:["UpcomingInterview",e],D.fetcher=(e,t)=>c(E,e,t)},69283:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>o});let o=(0,r(12907).registerClientReference)(function(){throw Error("Attempted to call the default export of \"/home/mirza-zeeshan/Apriora/apriora/src/app/(main)/reports/page.tsx\" from the server, but it's on the client. It's not possible to invoke a client function from the server, it can only be rendered as a Component or passed to props of a Client Component.")},"/home/mirza-zeeshan/Apriora/apriora/src/app/(main)/reports/page.tsx","default")},74075:e=>{"use strict";e.exports=require("zlib")},74557:(e,t,r)=>{"use strict";r.d(t,{A:()=>w});var o=r(43210),i=r(49384),a=r(43648),n=r(82816),s=r(99282);let l=(0,r(88316).Ay)();var d=r(72814),c=r(44426),p=r(44018),u=r(30437),m=r(98896),y=r(27887),h=r(60687);let b=(0,u.A)(),f=l("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root});function v(e){return function({props:e,name:t,defaultTheme:r,themeId:o}){let i=(0,c.A)(r);return o&&(i=i[o]||i),function(e){let{theme:t,name:r,props:o}=e;return t&&t.components&&t.components[r]&&t.components[r].defaultProps?(0,d.A)(t.components[r].defaultProps,o):o}({theme:i,name:t,props:e})}({props:e,name:"MuiStack",defaultTheme:b})}let x=e=>({row:"Left","row-reverse":"Right",column:"Top","column-reverse":"Bottom"})[e],g=({ownerState:e,theme:t})=>{let r={display:"flex",flexDirection:"column",...(0,m.NI)({theme:t},(0,m.kW)({values:e.direction,breakpoints:t.breakpoints.values}),e=>({flexDirection:e}))};if(e.spacing){let o=(0,y.LX)(t),i=Object.keys(t.breakpoints.values).reduce((t,r)=>(("object"==typeof e.spacing&&null!=e.spacing[r]||"object"==typeof e.direction&&null!=e.direction[r])&&(t[r]=!0),t),{}),n=(0,m.kW)({values:e.direction,base:i}),s=(0,m.kW)({values:e.spacing,base:i});"object"==typeof n&&Object.keys(n).forEach((e,t,r)=>{if(!n[e]){let o=t>0?n[r[t-1]]:"column";n[e]=o}}),r=(0,a.A)(r,(0,m.NI)({theme:t},s,(t,r)=>e.useFlexGap?{gap:(0,y._W)(o,t)}:{"& > :not(style):not(style)":{margin:0},"& > :not(style) ~ :not(style)":{[`margin${x(r?n[r]:e.direction)}`]:(0,y._W)(o,t)}}))}return(0,m.iZ)(t.breakpoints,r)};var A=r(13555),j=r(49580);let w=function(e={}){let{createStyledComponent:t=f,useThemeProps:r=v,componentName:a="MuiStack"}=e,l=()=>(0,s.A)({root:["root"]},e=>(0,n.Ay)(a,e),{}),d=t(g);return o.forwardRef(function(e,t){let a=r(e),{component:n="div",direction:s="column",spacing:c=0,divider:u,children:m,className:y,useFlexGap:b=!1,...f}=(0,p.A)(a),v=l();return(0,h.jsx)(d,{as:n,ownerState:{direction:s,spacing:c,useFlexGap:b},ref:t,className:(0,i.A)(v.root,y),...f,children:u?function(e,t){let r=o.Children.toArray(e).filter(Boolean);return r.reduce((e,i,a)=>(e.push(i),a<r.length-1&&e.push(o.cloneElement(t,{key:`separator-${a}`})),e),[])}(m,u):m})})}({createStyledComponent:(0,A.Ay)("div",{name:"MuiStack",slot:"Root",overridesResolver:(e,t)=>t.root}),useThemeProps:e=>(0,j.b)({props:e,name:"MuiStack"})})},79551:e=>{"use strict";e.exports=require("url")},80911:(e,t,r)=>{"use strict";r.r(t),r.d(t,{default:()=>en});var o=r(60687),i=r(88931),a=r(87088),n=r(66803),s=r(43210),l=r(49384),d=r(99282),c=r(13555),p=r(49580),u=r(4144),m=r(82816);function y(e){return(0,m.Ay)("MuiTableContainer",e)}(0,u.A)("MuiTableContainer",["root"]);let h=e=>{let{classes:t}=e;return(0,d.A)({root:["root"]},y,t)},b=(0,c.Ay)("div",{name:"MuiTableContainer",slot:"Root",overridesResolver:(e,t)=>t.root})({width:"100%",overflowX:"auto"}),f=s.forwardRef(function(e,t){let r=(0,p.b)({props:e,name:"MuiTableContainer"}),{className:i,component:a="div",...n}=r,s={...r,component:a},d=h(s);return(0,o.jsx)(b,{ref:t,as:a,className:(0,l.A)(d.root,i),ownerState:s,...n})});var v=r(51067);let x=s.createContext();var g=r(45258);function A(e){return(0,m.Ay)("MuiTable",e)}(0,u.A)("MuiTable",["root","stickyHeader"]);let j=e=>{let{classes:t,stickyHeader:r}=e;return(0,d.A)({root:["root",r&&"stickyHeader"]},A,t)},w=(0,c.Ay)("table",{name:"MuiTable",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.stickyHeader&&t.stickyHeader]}})((0,g.A)(({theme:e})=>({display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":{...e.typography.body2,padding:e.spacing(2),color:(e.vars||e).palette.text.secondary,textAlign:"left",captionSide:"bottom"},variants:[{props:({ownerState:e})=>e.stickyHeader,style:{borderCollapse:"separate"}}]}))),P="table",C=s.forwardRef(function(e,t){let r=(0,p.b)({props:e,name:"MuiTable"}),{className:i,component:a=P,padding:n="normal",size:d="medium",stickyHeader:c=!1,...u}=r,m={...r,component:a,padding:n,size:d,stickyHeader:c},y=j(m),h=s.useMemo(()=>({padding:n,size:d,stickyHeader:c}),[n,d,c]);return(0,o.jsx)(x.Provider,{value:h,children:(0,o.jsx)(w,{as:a,role:a===P?null:"table",ref:t,className:(0,l.A)(y.root,i),ownerState:m,...u})})}),k=s.createContext();function T(e){return(0,m.Ay)("MuiTableHead",e)}(0,u.A)("MuiTableHead",["root"]);let S=e=>{let{classes:t}=e;return(0,d.A)({root:["root"]},T,t)},M=(0,c.Ay)("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-header-group"}),I={variant:"head"},R="thead",_=s.forwardRef(function(e,t){let r=(0,p.b)({props:e,name:"MuiTableHead"}),{className:i,component:a=R,...n}=r,s={...r,component:a},d=S(s);return(0,o.jsx)(k.Provider,{value:I,children:(0,o.jsx)(M,{as:a,className:(0,l.A)(d.root,i),ref:t,role:a===R?null:"rowgroup",ownerState:s,...n})})});var q=r(69300);function z(e){return(0,m.Ay)("MuiTableRow",e)}let K=(0,u.A)("MuiTableRow",["root","selected","hover","head","footer"]),E=e=>{let{classes:t,selected:r,hover:o,head:i,footer:a}=e;return(0,d.A)({root:["root",r&&"selected",o&&"hover",i&&"head",a&&"footer"]},z,t)},D=(0,c.Ay)("tr",{name:"MuiTableRow",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,r.head&&t.head,r.footer&&t.footer]}})((0,g.A)(({theme:e})=>({color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,[`&.${K.hover}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${K.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:(0,q.X4)(e.palette.primary.main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:(0,q.X4)(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)}}}))),J=s.forwardRef(function(e,t){let r=(0,p.b)({props:e,name:"MuiTableRow"}),{className:i,component:a="tr",hover:n=!1,selected:d=!1,...c}=r,u=s.useContext(k),m={...r,component:a,hover:n,selected:d,head:u&&"head"===u.variant,footer:u&&"footer"===u.variant},y=E(m);return(0,o.jsx)(D,{as:a,ref:t,className:(0,l.A)(y.root,i),role:"tr"===a?null:"row",ownerState:m,...c})});var $=r(61543);function N(e){return(0,m.Ay)("MuiTableCell",e)}let H=(0,u.A)("MuiTableCell",["root","head","body","footer","sizeSmall","sizeMedium","paddingCheckbox","paddingNone","alignLeft","alignCenter","alignRight","alignJustify","stickyHeader"]),F=e=>{let{classes:t,variant:r,align:o,padding:i,size:a,stickyHeader:n}=e,s={root:["root",r,n&&"stickyHeader","inherit"!==o&&`align${(0,$.A)(o)}`,"normal"!==i&&`padding${(0,$.A)(i)}`,`size${(0,$.A)(a)}`]};return(0,d.A)(s,N,t)},O=(0,c.Ay)("td",{name:"MuiTableCell",slot:"Root",overridesResolver:(e,t)=>{let{ownerState:r}=e;return[t.root,t[r.variant],t[`size${(0,$.A)(r.size)}`],"normal"!==r.padding&&t[`padding${(0,$.A)(r.padding)}`],"inherit"!==r.align&&t[`align${(0,$.A)(r.align)}`],r.stickyHeader&&t.stickyHeader]}})((0,g.A)(({theme:e})=>({...e.typography.body2,display:"table-cell",verticalAlign:"inherit",borderBottom:e.vars?`1px solid ${e.vars.palette.TableCell.border}`:`1px solid
    ${"light"===e.palette.mode?(0,q.a)((0,q.X4)(e.palette.divider,1),.88):(0,q.e$)((0,q.X4)(e.palette.divider,1),.68)}`,textAlign:"left",padding:16,variants:[{props:{variant:"head"},style:{color:(e.vars||e).palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium}},{props:{variant:"body"},style:{color:(e.vars||e).palette.text.primary}},{props:{variant:"footer"},style:{color:(e.vars||e).palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)}},{props:{size:"small"},style:{padding:"6px 16px",[`&.${H.paddingCheckbox}`]:{width:24,padding:"0 12px 0 16px","& > *":{padding:0}}}},{props:{padding:"checkbox"},style:{width:48,padding:"0 0 0 4px"}},{props:{padding:"none"},style:{padding:0}},{props:{align:"left"},style:{textAlign:"left"}},{props:{align:"center"},style:{textAlign:"center"}},{props:{align:"right"},style:{textAlign:"right",flexDirection:"row-reverse"}},{props:{align:"justify"},style:{textAlign:"justify"}},{props:({ownerState:e})=>e.stickyHeader,style:{position:"sticky",top:0,zIndex:2,backgroundColor:(e.vars||e).palette.background.default}}]}))),U=s.forwardRef(function(e,t){let r;let i=(0,p.b)({props:e,name:"MuiTableCell"}),{align:a="inherit",className:n,component:d,padding:c,scope:u,size:m,sortDirection:y,variant:h,...b}=i,f=s.useContext(x),v=s.useContext(k),g=v&&"head"===v.variant,A=u;"td"===(r=d||(g?"th":"td"))?A=void 0:!A&&g&&(A="col");let j=h||v&&v.variant,w={...i,align:a,component:r,padding:c||(f&&f.padding?f.padding:"normal"),size:m||(f&&f.size?f.size:"medium"),sortDirection:y,stickyHeader:"head"===j&&f&&f.stickyHeader,variant:j},P=F(w),C=null;return y&&(C="asc"===y?"ascending":"descending"),(0,o.jsx)(O,{as:r,ref:t,className:(0,l.A)(P.root,n),"aria-sort":C,scope:A,ownerState:w,...b})});function L(e){return(0,m.Ay)("MuiTableBody",e)}(0,u.A)("MuiTableBody",["root"]);let W=e=>{let{classes:t}=e;return(0,d.A)({root:["root"]},L,t)},B=(0,c.Ay)("tbody",{name:"MuiTableBody",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-row-group"}),G={variant:"body"},V="tbody",X=s.forwardRef(function(e,t){let r=(0,p.b)({props:e,name:"MuiTableBody"}),{className:i,component:a=V,...n}=r,s={...r,component:a},d=W(s);return(0,o.jsx)(k.Provider,{value:G,children:(0,o.jsx)(B,{className:(0,l.A)(d.root,i),as:a,ref:t,role:a===V?null:"rowgroup",ownerState:s,...n})})});var Y=r(16184),Q=r(64796),Z=r(22164),ee=r(83685),et=r(91176),er=r(74557);let eo=(0,r(8322).A)((0,o.jsx)("path",{d:"m10 16.5 6-4.5-6-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2m0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8"}),"PlayCircleOutline"),ei=e=>e<.5?2*e*e:-1+(4-2*e)*e,ea=({open:e,onClose:t,summary:r,jobTitle:l,userName:d,interviewDate:c})=>{let[p,u]=(0,s.useState)({curiosity:0,experience:0,culture_fit:0,communication:0,problem_solving:0,technical_ability:0,overall_score:0});(0,s.useEffect)(()=>{if(!e){u({curiosity:0,experience:0,culture_fit:0,communication:0,problem_solving:0,technical_ability:0,overall_score:0});return}let t=Date.now(),o=()=>{let e=Math.min((Date.now()-t)/1e3,1),i=ei(e);u({curiosity:Math.floor(i*r.curiosity*10),experience:Math.floor(i*r.experience*10),culture_fit:Math.floor(i*r.culture_fit*10),communication:Math.floor(i*r.communication*10),problem_solving:Math.floor(i*r.problem_solving*10),technical_ability:Math.floor(i*r.technical_ability*10),overall_score:Math.floor(i*r.overall_score*10)}),e<1&&requestAnimationFrame(o)},i=requestAnimationFrame(o);return()=>cancelAnimationFrame(i)},[e,r]);let m=e=>e<=3?"#ff3d47":e<=7?"#ff9100":"#4caf50";return(0,o.jsx)(Z.A,{open:e,onClose:t,children:(0,o.jsxs)(i.default,{sx:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",width:1200,bgcolor:"background.paper",boxShadow:24,p:3,borderRadius:2},children:[(0,o.jsx)(a.A,{variant:"h6",gutterBottom:!0,sx:{fontWeight:"bold",mb:2,textAlign:"center"},children:d}),(0,o.jsxs)(i.default,{sx:{display:"flex",flexDirection:"row",gap:3},children:[(0,o.jsxs)(i.default,{sx:{width:"68%",display:"flex",alignItems:"center",justifyContent:"center",bgcolor:"#f5f5f5",borderRadius:1,position:"relative",minHeight:400},children:[(0,o.jsx)(ee.default,{sx:{fontSize:60,color:"#555"},children:(0,o.jsx)(eo,{fontSize:"inherit"})}),(0,o.jsx)(a.A,{variant:"caption",sx:{position:"absolute",bottom:8,left:8,color:"#777"},children:"Interview Recording"})]}),(0,o.jsxs)(i.default,{sx:{width:"32%",overflow:"hidden",display:"flex",flexDirection:"column"},children:[(0,o.jsxs)(i.default,{sx:{mb:2},children:[(0,o.jsxs)(a.A,{variant:"body2",color:"text.secondary",children:["Position: ",l]}),(0,o.jsxs)(a.A,{variant:"body2",color:"text.secondary",children:["Interview Date: ",(e=>e?new Date(e).toLocaleDateString("en-US",{year:"numeric",month:"long",day:"numeric",hour:"2-digit",minute:"2-digit"}):"")(c)]})]}),(0,o.jsx)(et.A,{sx:{my:1}}),(0,o.jsx)(a.A,{variant:"body1",gutterBottom:!0,sx:{mb:2,maxHeight:120,overflow:"auto"},children:r.summary}),(0,o.jsx)(i.default,{sx:{display:"flex",justifyContent:"center",mb:3},children:(0,o.jsxs)(er.A,{direction:"column",alignItems:"center",spacing:1,children:[(0,o.jsx)(a.A,{variant:"body2",children:"Overall Score"}),(0,o.jsxs)(i.default,{position:"relative",display:"inline-flex",children:[(0,o.jsx)(n.A,{variant:"determinate",value:100,size:50,thickness:5,sx:{position:"absolute",color:"#e0e0e0","& .MuiCircularProgress-circle":{strokeLinecap:"round"}}}),(0,o.jsx)(n.A,{variant:"determinate",value:p.overall_score,size:50,thickness:5,sx:{color:m(r.overall_score),"& .MuiCircularProgress-circle":{strokeLinecap:"round"},zIndex:1,transition:"none"}}),(0,o.jsx)(i.default,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,o.jsx)(a.A,{variant:"h6",component:"div",color:"text.secondary",children:Math.floor(p.overall_score/10)})})]})]})}),(0,o.jsx)(i.default,{sx:{display:"grid",gridTemplateColumns:"repeat(2, 1fr)",gap:2,overflow:"auto",pr:1},children:[{label:"Curiosity",value:r.curiosity,animatedValue:p.curiosity},{label:"Experience",value:r.experience,animatedValue:p.experience},{label:"Culture Fit",value:r.culture_fit,animatedValue:p.culture_fit},{label:"Communication",value:r.communication,animatedValue:p.communication},{label:"Problem Solving",value:r.problem_solving,animatedValue:p.problem_solving},{label:"Technical Ability",value:r.technical_ability,animatedValue:p.technical_ability}].map(e=>(0,o.jsxs)(er.A,{direction:"row",alignItems:"center",spacing:2,children:[(0,o.jsxs)(i.default,{position:"relative",display:"inline-flex",children:[(0,o.jsx)(n.A,{variant:"determinate",value:100,size:40,thickness:5,sx:{position:"absolute",color:"#e0e0e0","& .MuiCircularProgress-circle":{strokeLinecap:"round"}}}),(0,o.jsx)(n.A,{variant:"determinate",value:e.animatedValue,size:40,thickness:5,sx:{color:m(e.value),"& .MuiCircularProgress-circle":{strokeLinecap:"round"},zIndex:1,transition:"none"}}),(0,o.jsx)(i.default,{sx:{top:0,left:0,bottom:0,right:0,position:"absolute",display:"flex",alignItems:"center",justifyContent:"center"},children:(0,o.jsx)(a.A,{variant:"caption",component:"div",color:"text.secondary",children:Math.floor(e.animatedValue/10)})})]}),(0,o.jsx)(a.A,{variant:"body2",children:e.label})]},e.label))}),(0,o.jsx)(i.default,{sx:{mt:3,textAlign:"center"},children:(0,o.jsx)(a.A,{variant:"h6",color:m(r.overall_score),children:r.overall_score<=3?"Not Recommended":"Recommended"})})]})]})]})})},en=()=>{let{data:e,isLoading:t}=(0,Q.bE)(),[r,l]=(0,s.useState)(!1),[d,c]=(0,s.useState)(null),p=e=>{c(e),l(!0)};return(0,o.jsxs)(i.default,{p:4,children:[(0,o.jsx)(a.A,{variant:"h4",gutterBottom:!0,children:"Interview Summaries"}),t?(0,o.jsx)(i.default,{display:"flex",justifyContent:"center",mt:4,children:(0,o.jsx)(n.A,{})}):(0,o.jsx)(f,{component:v.A,children:(0,o.jsxs)(C,{children:[(0,o.jsx)(_,{children:(0,o.jsxs)(J,{children:[(0,o.jsx)(U,{sx:{fontWeight:"bold"},children:"User Name"}),(0,o.jsx)(U,{sx:{fontWeight:"bold"},children:"Job Title"}),(0,o.jsx)(U,{sx:{fontWeight:"bold"},children:"Scheduled At"}),(0,o.jsx)(U,{sx:{fontWeight:"bold"},children:"Actions"})]})}),(0,o.jsx)(X,{children:e?.summary.map((e,t)=>o.jsxs(J,{children:[o.jsx(U,{children:`${e.user.firstName} ${e.user.lastName}`}),o.jsx(U,{children:e.jobPost.title}),o.jsx(U,{children:new Date(e.interview.scheduledAt).toLocaleString()}),o.jsx(U,{children:o.jsx(Y.A,{variant:"outlined",onClick:()=>p(e),children:"Details"})})]},t))})]})}),d&&(0,o.jsx)(ea,{open:r,onClose:()=>l(!1),summary:d.summary.summary,jobTitle:d.jobPost.title,userName:`${d.user.firstName} ${d.user.lastName}`,interviewDate:d.interview.scheduledAt})]})}},81630:e=>{"use strict";e.exports=require("http")}};var t=require("../../../webpack-runtime.js");t.C(e);var r=e=>t(t.s=e),o=t.X(0,[51,811,495,939,617,929,317,184,186],()=>r(40528));module.exports=o})();