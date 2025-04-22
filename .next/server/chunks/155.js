"use strict";exports.id=155,exports.ids=[155],exports.modules={12803:(e,t,a)=>{a.d(t,{A:()=>f});var s=a(60687),i=a(43210),l=a(15319),r=a(82948),n=a(88931),o=a(83685),c=a(87088),d=a(91176),p=a(44873),x=a(86411),m=a(97498),u=a(6353),h=a(92245),y=a(99737),b=a(12818);function f({open:e,onClose:t,job:a,applied:f=!1}){let[j,v]=(0,i.useState)(!1);return a?(0,s.jsxs)(r.Ay,{anchor:"right",open:j,onClose:t,hideBackdrop:!1,PaperProps:{sx:{width:800,backgroundColor:"#ffffff",padding:2,borderTopLeftRadius:"16px",borderBottomLeftRadius:"16px",overflow:"visible",boxShadow:"0px 0px 20px rgba(0, 0, 0, 0.1)"}},children:[(0,s.jsx)(n.default,{sx:{position:"absolute",top:100,left:0,transform:"translateX(-50%)",width:60,height:90,backgroundColor:"#ffffff",borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",zIndex:0,boxShadow:"-5px 0px 10px rgba(0, 0, 0, 0.05)"},children:(0,s.jsx)(o.default,{onClick:t,size:"small",sx:{color:"#555",paddingRight:3,zIndex:1,"&:hover":{backgroundColor:"transparent",color:"#000"}},children:(0,s.jsx)(p.A,{})})}),(0,s.jsxs)(n.default,{className:"pl-8 pt-8 pr-8 flex flex-col gap-6 w-full overflow-y-scroll",children:[(0,s.jsx)(n.default,{className:"flex w-full items-start justify-between",children:(0,s.jsxs)(n.default,{className:"flex gap-4",children:[(0,s.jsx)("img",{src:"/icon.png",alt:"Company Logo",className:"h-20 w-20 rounded-lg object-contain border border-gray-200"}),(0,s.jsxs)(n.default,{children:[(0,s.jsx)(c.A,{variant:"h5",fontWeight:"bold",color:"text.primary",children:a.title}),(0,s.jsx)(c.A,{color:"#7e5ca0",children:a.company.name||"Nomad"}),(0,s.jsxs)(n.default,{className:"flex items-center mt-1",children:[(0,s.jsx)(x.A,{sx:{fontSize:16,mr:1,color:"text.secondary"}}),(0,s.jsxs)(c.A,{variant:"body2",color:"text.secondary",children:["Updated ",(0,l.m)(new Date(a.updatedAt),{addSuffix:!0})]})]})]})]})}),(0,s.jsx)(d.A,{sx:{my:1}}),(0,s.jsxs)(n.default,{className:"grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg",children:[(0,s.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,s.jsx)(m.A,{className:"text-[#636363]"}),(0,s.jsxs)(n.default,{children:[(0,s.jsx)(c.A,{variant:"caption",color:"text.secondary",children:"Location"}),(0,s.jsx)(c.A,{variant:"body2",children:a.city})]})]}),(0,s.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,s.jsx)(u.A,{className:"text-[#636363]"}),(0,s.jsxs)(n.default,{children:[(0,s.jsx)(c.A,{variant:"caption",color:"text.secondary",children:"Work Mode"}),(0,s.jsx)(c.A,{variant:"body2",children:{on_site:"On Site",remote:"Remote",hybrid:"Hybrid"}[a.workMode]})]})]}),(0,s.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,s.jsx)(h.A,{className:"text-[#636363]"}),(0,s.jsxs)(n.default,{children:[(0,s.jsx)(c.A,{variant:"caption",color:"text.secondary",children:"Employment Type"}),(0,s.jsx)(c.A,{variant:"body2",children:{full_time:"Full Time",part_time:"Part Time",contract:"Contract"}[a.employmentType]})]})]}),(0,s.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,s.jsx)(x.A,{className:"text-[#636363]"}),(0,s.jsxs)(n.default,{children:[(0,s.jsx)(c.A,{variant:"caption",color:"text.secondary",children:"Availability"}),(0,s.jsx)(c.A,{variant:"body2",children:{immediate:"Immediate",two_weeks_notice:"2 weeks notice",three_weeks_notice:"3 weeks notice",four_weeks_notice:"4 weeks notice"}[a.availibility]})]})]}),(0,s.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,s.jsx)(y.A,{className:"text-[#636363]"}),(0,s.jsxs)(n.default,{children:[(0,s.jsx)(c.A,{variant:"caption",color:"text.secondary",children:"Salary"}),(0,s.jsxs)(c.A,{variant:"body2",children:["$",a.salary,"K"]})]})]}),(0,s.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,s.jsx)(b.A,{className:"text-[#636363]"}),(0,s.jsxs)(n.default,{children:[(0,s.jsx)(c.A,{variant:"caption",color:"text.secondary",children:"Department"}),(0,s.jsx)(c.A,{variant:"body2",children:a.department})]})]})]}),(0,s.jsxs)(n.default,{className:"mt-4",children:[(0,s.jsx)(c.A,{variant:"h6",fontWeight:"bold",gutterBottom:!0,children:"Job Description"}),(0,s.jsx)(c.A,{variant:"caption",paragraph:!0,children:a.description||"No job description provided."})]})]})]}):null}},18822:(e,t,a)=>{a.d(t,{A:()=>p});var s=a(60687),i=a(43210),l=a(12803),r=a(78398),n=a(64796),o=a(46788),c=a(97306),d=a(8693);function p({title:e="Hiring Pipeline",itemsPerPage:t=5,applied:a=!1,jobs:p}){let[x,m]=(0,i.useState)(1),u=(0,d.jE)(),[h,y]=(0,i.useState)(null),[b,f]=(0,i.useState)(!1),{data:j}=(0,n.RB)();function v(e){return(0,o.GP)((0,c.H)(e),"MMMM d, yyyy")}console.log("appliedJobs",j);let g={on_site:"On Site",remote:"Remote",hybrid:"Hybrid"},A={immediate:"Immediate",two_weeks_notice:"2 weeks notice",three_weeks_notice:"3 weeks notice",four_weeks_notice:"4 weeks notice"},{mutateAsync:w}=(0,n.AY)({onSuccess:()=>{u.invalidateQueries({queryKey:["UnappliedJobs"]}),u.invalidateQueries({queryKey:["AppliedJobs"]}),u.invalidateQueries({queryKey:["UpcomingInterview"]})}}),[N,k]=(0,i.useState)(!1),[S,I]=(0,i.useState)({top:0,left:0}),[C,P]=(0,i.useState)({date:"",time:""}),T=(e,t)=>{let a=e.target.getBoundingClientRect();I({top:a.bottom,left:a.left+a.width/2}),y(t),k(!0)},D=()=>{k(!1),P({date:"",time:""})},E=(x-1)*t,J=p.slice(E,E+t),L=Math.ceil(p.length/t),K=e=>{y(e),f(!0)};return(0,s.jsxs)("div",{className:"bg-white w-full rounded-xl shadow-md",children:[(0,s.jsxs)("div",{className:"flex justify-between p-3",children:[(0,s.jsx)("h2",{className:"text-lg font-semibold",children:e}),(0,s.jsx)("button",{className:"p-1 hover:bg-gray-100 rounded-full",children:(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-gray-500",fill:"currentColor",viewBox:"0 0 20 20",children:(0,s.jsx)("path",{d:"M10 3a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"})})})]}),(0,s.jsx)("div",{className:"overflow-x-auto border border-gray-200 shadow-sm max-w-full",children:(0,s.jsxs)("table",{className:"w-full table-auto text-left text-sm min-w-[900px]",children:[(0,s.jsx)("thead",{children:(0,s.jsxs)("tr",{className:"purpleshade",children:[(0,s.jsx)("th",{className:"px-4 py-3 font-medium text-[#7e5ca0]",children:"Salary"}),(0,s.jsx)("th",{className:"px-4 py-3 font-medium text-[#7e5ca0]",children:"Position"}),(0,s.jsx)("th",{className:"px-4 py-3 font-medium text-[#7e5ca0]",children:"Department"}),(0,s.jsx)("th",{className:"px-4 py-3 font-medium text-[#7e5ca0]",children:"Availability"}),(0,s.jsx)("th",{className:"px-4 py-3 font-medium text-[#7e5ca0]",children:"Location"}),(0,s.jsx)("th",{className:"px-4 py-3 font-medium text-[#7e5ca0] whitespace-nowrap",children:"Posted At"}),(0,s.jsx)("th",{className:"px-4 py-3 font-medium text-[#7e5ca0] whitespace-nowrap",children:"Expires At"}),(0,s.jsx)("th",{className:"px-4 py-3 font-medium text-[#7e5ca0]"})]})}),(0,s.jsx)("tbody",{className:"divide-y divide-gray-300",children:J.map((e,t)=>(0,s.jsxs)("tr",{className:"hover:bg-white/40 transition",children:[(0,s.jsxs)("td",{className:"px-4 py-3",children:["$",e.salary,"K"]}),(0,s.jsx)("td",{className:"px-4 py-3",children:e.title}),(0,s.jsx)("td",{className:"px-4 py-3",children:e.department}),(0,s.jsx)("td",{className:"px-4 py-3",children:A[e.availibility]||e.availibility}),(0,s.jsx)("td",{className:"px-4 py-3",children:`${g[e.workMode]||e.workMode} - ${e.city}`}),(0,s.jsx)("td",{className:"px-4 py-3",children:v(e.createdAt)}),(0,s.jsx)("td",{className:"px-4 py-3",children:v(e.expiresAt)}),(0,s.jsx)("td",{className:"px-4 py-3",children:(0,s.jsxs)("div",{className:"flex gap-5",children:[(0,s.jsx)("div",{className:"custom-button border-1px border-[#7e5ca0] p-2 rounded cursor-pointer",onClick:()=>K(e),children:"Details"}),a?(0,s.jsx)(s.Fragment,{}):(0,s.jsx)("button",{onClick:t=>T(t,e),className:"custom-button border px-4 py-1 font-semibold rounded-[15px] hover:bg-[var(--foreground)] hover:text-white w-full inline-block text-center justify-center",children:"Apply"})]})})]},t))})]})}),(0,s.jsxs)("div",{className:"flex justify-end items-center gap-3 px-4 py-2 mt-2",children:[(0,s.jsx)("button",{onClick:()=>m(e=>Math.max(e-1,1)),disabled:1===x,className:"px-3 py-1 text-sm border rounded bg-[#7e5ca0] text-white hover:bg-[#6b4b8c] disabled:opacity-50",children:"Prev"}),(0,s.jsxs)("span",{className:"text-sm text-gray-700",children:["Page ",x]}),(0,s.jsx)("button",{onClick:()=>m(e=>e+1),disabled:x===L,className:`px-3 py-1 text-sm border rounded disabled:opacity-50 ${x===L?"bg-gray-200 text-gray-500 cursor-not-allowed":"bg-[#7e5ca0] text-white hover:bg-[#6b4b8c]"}`,children:"Next"})]}),(0,s.jsx)(l.A,{open:b,onClose:()=>f(!1),job:h}),(0,s.jsx)(r.A,{isOpen:N,onClose:D,onApply:()=>{console.log("Applied for:",h),console.log("Details:",C);let e=`${C.date}T${C.time}:00.000Z`;try{w({data:{jobPostId:h.id,interviewDate:e}}),D()}catch(e){console.error("Error applying for job:",e)}},handleChange:e=>{P({...C,[e.target.name]:e.target.value})},applicationDetails:C})]})}},64796:(e,t,a)=>{a.d(t,{AG:()=>p,fi:()=>x,cr:()=>m,MO:()=>u,NH:()=>h,bC:()=>K,wc:()=>L,RB:()=>k,AY:()=>b,OD:()=>j,bE:()=>I,Br:()=>g,LF:()=>w,jb:()=>P,EL:()=>D,n6:()=>J});var s=a(54050),i=a(29494);class l extends Error{constructor(e="Validation Error",t=500,a={}){super(e),this.name=this.constructor.name,this.status=t,this.message=e,a&&(this.meta=a),Error.captureStackTrace?.(this,this.constructor)}}var r=a(99638),n=a(56002),o=a.n(n);let c=new r.l4("https://ec2-34-224-67-13.compute-1.amazonaws.com/graphql",{fetch:o(),credentials:"include"});function d(e,t,a){return async()=>c.request(e,t,a).catch(({response:e})=>{throw new l(e?.error,e?.status,{response:e})})}var p=function(e){return e.FourWeeksNotice="FOUR_WEEKS_NOTICE",e.Immediate="IMMEDIATE",e.ThreeWeeksNotice="THREE_WEEKS_NOTICE",e.TwoWeeksNotice="TWO_WEEKS_NOTICE",e}({}),x=function(e){return e.Contract="CONTRACT",e.FullTime="FULL_TIME",e.PartTime="PART_TIME",e}({}),m=function(e){return e.Hourly="HOURLY",e.Unit="UNIT",e}({}),u=function(e){return e.Archived="ARCHIVED",e.Draft="DRAFT",e.Published="PUBLISHED",e}({}),h=function(e){return e.Hybrid="HYBRID",e.OnSite="ON_SITE",e.Remote="REMOTE",e}({});let y=`
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
    `,b=e=>(0,s.n)({mutationKey:["CreateJobPostApplication"],mutationFn:e=>d(y,e)(),...e});b.getKey=()=>["CreateJobPostApplication"],b.fetcher=(e,t)=>d(y,e,t);let f=`
    mutation CreateJobPost($data: JobPostCreateInput!) {
  jobPostCreate(data: $data) {
    id
  }
}
    `,j=e=>(0,s.n)({mutationKey:["CreateJobPost"],mutationFn:e=>d(f,e)(),...e});j.getKey=()=>["CreateJobPost"],j.fetcher=(e,t)=>d(f,e,t);let v=`
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
    `,g=e=>(0,s.n)({mutationKey:["getInterviewSumary"],mutationFn:e=>d(v,e)(),...e});g.getKey=()=>["getInterviewSumary"],g.fetcher=(e,t)=>d(v,e,t);let A=`
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
    `,w=(e,t)=>(0,i.I)({queryKey:["Interview",e],queryFn:d(A,e),...t});w.getKey=e=>["Interview",e],w.fetcher=(e,t)=>d(A,e,t);let N=`
    query AppliedJobs {
  appliedJobPosts {
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
    `,k=(e,t)=>(0,i.I)({queryKey:void 0===e?["AppliedJobs"]:["AppliedJobs",e],queryFn:d(N,e),...t});k.getKey=e=>void 0===e?["AppliedJobs"]:["AppliedJobs",e],k.fetcher=(e,t)=>d(N,e,t);let S=`
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
    `,I=(e,t)=>(0,i.I)({queryKey:void 0===e?["getAllSummaries"]:["getAllSummaries",e],queryFn:d(S,e),...t});I.getKey=e=>void 0===e?["getAllSummaries"]:["getAllSummaries",e],I.fetcher=(e,t)=>d(S,e,t);let C=`
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
    `,P=(e,t)=>(0,i.I)({queryKey:void 0===e?["JobsPosts"]:["JobsPosts",e],queryFn:d(C,e),...t});P.getKey=e=>void 0===e?["JobsPosts"]:["JobsPosts",e],P.fetcher=(e,t)=>d(C,e,t);let T=`
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
    `,D=(e,t)=>(0,i.I)({queryKey:void 0===e?["UnappliedJobs"]:["UnappliedJobs",e],queryFn:d(T,e),...t});D.getKey=e=>void 0===e?["UnappliedJobs"]:["UnappliedJobs",e],D.fetcher=(e,t)=>d(T,e,t);let E=`
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
    `,J=(e,t)=>(0,i.I)({queryKey:void 0===e?["UpcomingInterview"]:["UpcomingInterview",e],queryFn:d(E,e),...t});function L(e,t){return t?Buffer.from(`${e}:${t}`).toString("base64"):""}function K(e){return e?Buffer.from(e,"base64").toString("ascii").split(":")?.[1]:""}J.getKey=e=>void 0===e?["UpcomingInterview"]:["UpcomingInterview",e],J.fetcher=(e,t)=>d(E,e,t)},78398:(e,t,a)=>{a.d(t,{A:()=>d});var s=a(60687);a(43210);var i=a(37204),l=a(24296),r=a(90764),n=a(88931),o=a(60997),c=a(27674);function d({isOpen:e,onClose:t,onApply:a,applicationDetails:d,handleChange:p}){return(0,s.jsxs)(i.A,{open:e,onClose:t,"aria-labelledby":"apply-modal-title",maxWidth:"xs",fullWidth:!0,children:[(0,s.jsx)(l.A,{id:"apply-modal-title",children:"Schedule Your Interview"}),(0,s.jsx)(r.A,{dividers:!0,children:(0,s.jsxs)(n.default,{display:"flex",flexDirection:"column",gap:2,children:[(0,s.jsx)("p",{className:"text-sm text-gray-600",children:"Please choose a date and time when you’d like to give interview."}),(0,s.jsx)(o.A,{label:"Date",type:"date",name:"date",value:d.date,onChange:p,InputLabelProps:{shrink:!0},fullWidth:!0}),(0,s.jsx)(o.A,{label:"Time",type:"time",name:"time",value:d.time,onChange:p,InputLabelProps:{shrink:!0},fullWidth:!0})]})}),(0,s.jsxs)(c.A,{sx:{justifyContent:"space-between",px:3,pb:2},children:[(0,s.jsx)("button",{onClick:t,className:"px-4 py-1 font-semibold bg-gray-200 text-black rounded hover:bg-gray-300",children:"Cancel"}),(0,s.jsx)("button",{onClick:a,className:"px-4 py-1 font-semibold bg-black text-white rounded hover:opacity-80",children:"Confirm"})]})]})}},89888:(e,t,a)=>{a.d(t,{A:()=>x});var s=a(60687),i=a(43832),l=a(52260),r=a(41629),n=a(47651),o=a(83487),c=a(72318),d=a(21771),p=a(43210);function x(){let[e,t]=(0,p.useState)({contract:!0,partTime:!0,fullTime:!0}),[a,x]=(0,p.useState)({hired:!1,open:!0}),[m,u]=(0,p.useState)([6e4,2e5]),[h,y]=(0,p.useState)(""),b=e=>{y(e.target.value)};return(0,s.jsxs)("div",{className:"p-4 bg-white rounded-[20px] space-y-6 w-full text-sm h-full flex flex-col",children:[(0,s.jsxs)("div",{className:"flex items-center justify-between",children:[(0,s.jsx)("h2",{className:"text-base font-semibold text-[var(--foreground)] uppercase tracking-wide",children:"Filters"}),(0,s.jsx)("svg",{xmlns:"http://www.w3.org/2000/svg",className:"h-5 w-5 text-[var(--foreground)]",viewBox:"0 0 20 20",fill:"currentColor",children:(0,s.jsx)("path",{d:"M10 6a2 2 0 114.001.001A2 2 0 0110 6zm0 5a2 2 0 114.001.001A2 2 0 0110 11zm0 5a2 2 0 114.001.001A2 2 0 0110 16z"})})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"uppercase font-semibold text-xs textcolor mb-2",children:"Role"}),(0,s.jsxs)(i.A,{fullWidth:!0,size:"small",children:[(0,s.jsx)(l.A,{id:"location-label",children:"Role"}),(0,s.jsxs)(r.A,{labelId:"location-label",value:h,label:"Select Location",onChange:b,children:[(0,s.jsx)(n.A,{value:"frontend-engineer",children:"Frontend Engineer"}),(0,s.jsx)(n.A,{value:"backend-developer",children:"Backend Developer"}),(0,s.jsx)(n.A,{value:"fullstack-engineer",children:"Fullstack Engineer"}),(0,s.jsx)(n.A,{value:"product-designer",children:"Product Designer"}),(0,s.jsx)(n.A,{value:"data-analyst",children:"Data Analyst"}),(0,s.jsx)(n.A,{value:"devops-engineer",children:"DevOps Engineer"})]})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"uppercase font-semibold text-xs textcolor mb-2",children:"Job Type"}),(0,s.jsx)("div",{className:"space-y-1",children:["contract","partTime","fullTime"].map(a=>(0,s.jsx)("div",{className:"rounded px-1 py-1",children:(0,s.jsx)(o.A,{control:(0,s.jsx)(c.A,{checked:e[a],onChange:()=>t({...e,[a]:!e[a]}),sx:{color:"var(--icons)","&.Mui-checked":{color:"var(--icons)"},borderRadius:"6px"}}),label:"contract"===a?"Contract":"partTime"===a?"Part-Time":"Full-Time"})},a))})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"uppercase font-semibold text-xs textcolor mb-2",children:"Salary"}),(0,s.jsx)(d.Ay,{value:m,onChange:(e,t)=>{u(t)},valueLabelDisplay:"off",min:0,max:2e5,sx:{color:"var(--icons)"}}),(0,s.jsxs)("div",{className:"flex justify-between text-xs textcolor",children:[(0,s.jsxs)("span",{children:["$",m[0].toLocaleString()]}),(0,s.jsxs)("span",{children:["$",m[1].toLocaleString()]})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"uppercase font-semibold text-xs textcolor mb-2",children:"Skills"}),(0,s.jsxs)(i.A,{fullWidth:!0,size:"small",children:[(0,s.jsx)(l.A,{id:"location-label",children:"Skills"}),(0,s.jsxs)(r.A,{labelId:"location-label",value:h,label:"Select Location",onChange:b,children:[(0,s.jsx)(n.A,{value:"new-york",children:"web development"}),(0,s.jsx)(n.A,{value:"san-francisco",children:"Figma"}),(0,s.jsx)(n.A,{value:"london",children:"Web Design"}),(0,s.jsx)(n.A,{value:"berlin",children:"CSS"}),(0,s.jsx)(n.A,{value:"remote",children:"HTML"})]})]})]}),(0,s.jsxs)("div",{children:[(0,s.jsx)("h3",{className:"uppercase font-semibold text-xs textcolor mb-2",children:"Location"}),(0,s.jsxs)(i.A,{fullWidth:!0,size:"small",children:[(0,s.jsx)(l.A,{id:"location-label",children:"Location"}),(0,s.jsxs)(r.A,{labelId:"location-label",value:h,label:"Select Location",onChange:b,children:[(0,s.jsx)(n.A,{value:"new-york",children:"New York"}),(0,s.jsx)(n.A,{value:"san-francisco",children:"San Francisco"}),(0,s.jsx)(n.A,{value:"london",children:"London"}),(0,s.jsx)(n.A,{value:"berlin",children:"Berlin"}),(0,s.jsx)(n.A,{value:"remote",children:"Remote"})]})]})]}),(0,s.jsx)("div",{className:"flex-grow"})," ",(0,s.jsx)("div",{className:"flex justify-center pt-4",children:(0,s.jsx)("button",{className:"py-2 px-6 rounded-full border border-[var(--icons)] text-[var(--icons)] hover:bg-[var(--icons)] hover:text-white transition-all duration-200",children:"Apply"})})]})}}};