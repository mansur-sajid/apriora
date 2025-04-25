"use strict";exports.id=354,exports.ids=[354],exports.modules={12803:(e,t,i)=>{i.d(t,{A:()=>b});var r=i(60687),a=i(43210),o=i(15319),s=i(82948),n=i(88931),l=i(83685),d=i(87088),c=i(91176),p=i(44873),u=i(86411),m=i(97498),y=i(6353),x=i(92245),f=i(99737),h=i(12818);function b({open:e,onClose:t,job:i,applied:b=!1}){let[A,g]=(0,a.useState)(!1);return i?(0,r.jsxs)(s.Ay,{anchor:"right",open:A,onClose:t,hideBackdrop:!1,sx:{zIndex:1e5},PaperProps:{sx:{width:800,backgroundColor:"#ffffff",padding:2,borderTopLeftRadius:"16px",borderBottomLeftRadius:"16px",overflow:"visible",boxShadow:"0px 0px 20px rgba(0, 0, 0, 0.1)",zIndex:1e5}},children:[(0,r.jsx)(n.default,{sx:{position:"absolute",top:100,left:0,transform:"translateX(-50%)",width:60,height:90,backgroundColor:"#ffffff",borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",zIndex:0,boxShadow:"-5px 0px 10px rgba(0, 0, 0, 0.05)"},children:(0,r.jsx)(l.default,{onClick:t,size:"small",sx:{color:"#555",paddingRight:3,zIndex:1,"&:hover":{backgroundColor:"transparent",color:"#000"}},children:(0,r.jsx)(p.A,{})})}),(0,r.jsxs)(n.default,{className:"pl-8 pt-8 pr-8 flex flex-col gap-6 w-full overflow-y-scroll",children:[(0,r.jsx)(n.default,{className:"flex w-full items-start justify-between",children:(0,r.jsxs)(n.default,{className:"flex gap-4",children:[(0,r.jsx)("img",{src:"/icon.png",alt:"Company Logo",className:"h-20 w-20 rounded-lg object-contain border border-gray-200"}),(0,r.jsxs)(n.default,{children:[(0,r.jsx)(d.A,{variant:"h5",fontWeight:"bold",color:"text.primary",children:i.title}),(0,r.jsx)(d.A,{color:"#7e5ca0",children:i.company.name||"Nomad"}),(0,r.jsxs)(n.default,{className:"flex items-center mt-1",children:[(0,r.jsx)(u.A,{sx:{fontSize:16,mr:1,color:"text.secondary"}}),(0,r.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:["Updated ",(0,o.m)(new Date(i.updatedAt),{addSuffix:!0})]})]})]})]})}),(0,r.jsx)(c.A,{sx:{my:1}}),(0,r.jsxs)(n.default,{className:"grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg",children:[(0,r.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,r.jsx)(m.A,{className:"text-[#636363]"}),(0,r.jsxs)(n.default,{children:[(0,r.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Location"}),(0,r.jsx)(d.A,{variant:"body2",children:i.city})]})]}),(0,r.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,r.jsx)(y.A,{className:"text-[#636363]"}),(0,r.jsxs)(n.default,{children:[(0,r.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Work Mode"}),(0,r.jsx)(d.A,{variant:"body2",children:{on_site:"On Site",remote:"Remote",hybrid:"Hybrid"}[i.workMode]})]})]}),(0,r.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,r.jsx)(x.A,{className:"text-[#636363]"}),(0,r.jsxs)(n.default,{children:[(0,r.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Employment Type"}),(0,r.jsx)(d.A,{variant:"body2",children:{full_time:"Full Time",part_time:"Part Time",contract:"Contract"}[i.employmentType]})]})]}),(0,r.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,r.jsx)(u.A,{className:"text-[#636363]"}),(0,r.jsxs)(n.default,{children:[(0,r.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Availability"}),(0,r.jsx)(d.A,{variant:"body2",children:{immediate:"Immediate",two_weeks_notice:"2 weeks notice",three_weeks_notice:"3 weeks notice",four_weeks_notice:"4 weeks notice"}[i.availibility]})]})]}),(0,r.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,r.jsx)(f.A,{className:"text-[#636363]"}),(0,r.jsxs)(n.default,{children:[(0,r.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Salary"}),(0,r.jsxs)(d.A,{variant:"body2",children:["$",i.salary,"K"]})]})]}),(0,r.jsxs)(n.default,{className:"flex items-center gap-2",children:[(0,r.jsx)(h.A,{className:"text-[#636363]"}),(0,r.jsxs)(n.default,{children:[(0,r.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Department"}),(0,r.jsx)(d.A,{variant:"body2",children:i.department})]})]})]}),(0,r.jsxs)(n.default,{className:"mt-4",children:[(0,r.jsx)(d.A,{variant:"h6",fontWeight:"bold",gutterBottom:!0,children:"Job Description"}),(0,r.jsx)(d.A,{variant:"caption",paragraph:!0,children:i.description||"No job description provided."})]})]})]}):null}},64796:(e,t,i)=>{i.d(t,{AG:()=>p,fi:()=>u,cr:()=>m,MO:()=>y,NH:()=>x,bC:()=>_,wc:()=>F,RB:()=>J,AY:()=>h,OD:()=>A,bE:()=>k,Br:()=>v,LF:()=>w,lI:()=>P,jb:()=>q,GF:()=>S,EL:()=>D,n6:()=>U});var r=i(54050),a=i(29494);class o extends Error{constructor(e="Validation Error",t=500,i={}){super(e),this.name=this.constructor.name,this.status=t,this.message=e,i&&(this.meta=i),Error.captureStackTrace?.(this,this.constructor)}}var s=i(99638),n=i(56002),l=i.n(n);let d=new s.l4("https://prototype-apriora.duckdns.org/graphql",{fetch:l(),credentials:"include"});function c(e,t,i){return async()=>d.request(e,t,i).catch(({response:e})=>{throw new o(e?.error,e?.status,{response:e})})}var p=function(e){return e.FourWeeksNotice="FOUR_WEEKS_NOTICE",e.Immediate="IMMEDIATE",e.ThreeWeeksNotice="THREE_WEEKS_NOTICE",e.TwoWeeksNotice="TWO_WEEKS_NOTICE",e}({}),u=function(e){return e.Contract="CONTRACT",e.FullTime="FULL_TIME",e.PartTime="PART_TIME",e}({}),m=function(e){return e.Hourly="HOURLY",e.Unit="UNIT",e}({}),y=function(e){return e.Archived="ARCHIVED",e.Draft="DRAFT",e.Published="PUBLISHED",e}({}),x=function(e){return e.Hybrid="HYBRID",e.OnSite="ON_SITE",e.Remote="REMOTE",e}({});let f=`
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
    `,h=e=>(0,r.n)({mutationKey:["CreateJobPostApplication"],mutationFn:e=>c(f,e)(),...e});h.getKey=()=>["CreateJobPostApplication"],h.fetcher=(e,t)=>c(f,e,t);let b=`
    mutation CreateJobPost($data: JobPostCreateInput!) {
  jobPostCreate(data: $data) {
    id
  }
}
    `,A=e=>(0,r.n)({mutationKey:["CreateJobPost"],mutationFn:e=>c(b,e)(),...e});A.getKey=()=>["CreateJobPost"],A.fetcher=(e,t)=>c(b,e,t);let g=`
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
    `,v=e=>(0,r.n)({mutationKey:["getInterviewSumary"],mutationFn:e=>c(g,e)(),...e});v.getKey=()=>["getInterviewSumary"],v.fetcher=(e,t)=>c(g,e,t);let j=`
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
    `,w=(e,t)=>(0,a.I)({queryKey:["Interview",e],queryFn:c(j,e),...t});w.getKey=e=>["Interview",e],w.fetcher=(e,t)=>c(j,e,t);let I=`
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
    `,P=(e,t)=>(0,a.I)({queryKey:void 0===e?["JobSeekerKpis"]:["JobSeekerKpis",e],queryFn:c(I,e),...t});P.getKey=e=>void 0===e?["JobSeekerKpis"]:["JobSeekerKpis",e],P.fetcher=(e,t)=>c(I,e,t);let K=`
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
    `,S=(e,t)=>(0,a.I)({queryKey:void 0===e?["RecruiterKpis"]:["RecruiterKpis",e],queryFn:c(K,e),...t});S.getKey=e=>void 0===e?["RecruiterKpis"]:["RecruiterKpis",e],S.fetcher=(e,t)=>c(K,e,t);let T=`
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
    `,J=(e,t)=>(0,a.I)({queryKey:void 0===e?["AppliedJobs"]:["AppliedJobs",e],queryFn:c(T,e),...t});J.getKey=e=>void 0===e?["AppliedJobs"]:["AppliedJobs",e],J.fetcher=(e,t)=>c(T,e,t);let N=`
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
    `,k=(e,t)=>(0,a.I)({queryKey:void 0===e?["getAllSummaries"]:["getAllSummaries",e],queryFn:c(N,e),...t});k.getKey=e=>void 0===e?["getAllSummaries"]:["getAllSummaries",e],k.fetcher=(e,t)=>c(N,e,t);let C=`
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
    `,q=(e,t)=>(0,a.I)({queryKey:void 0===e?["JobsPosts"]:["JobsPosts",e],queryFn:c(C,e),...t});q.getKey=e=>void 0===e?["JobsPosts"]:["JobsPosts",e],q.fetcher=(e,t)=>c(C,e,t);let E=`
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
    `,D=(e,t)=>(0,a.I)({queryKey:void 0===e?["UnappliedJobs"]:["UnappliedJobs",e],queryFn:c(E,e),...t});D.getKey=e=>void 0===e?["UnappliedJobs"]:["UnappliedJobs",e],D.fetcher=(e,t)=>c(E,e,t);let R=`
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
    `,U=(e,t)=>(0,a.I)({queryKey:void 0===e?["UpcomingInterview"]:["UpcomingInterview",e],queryFn:c(R,e),...t});function F(e,t){return t?Buffer.from(`${e}:${t}`).toString("base64"):""}function _(e){return e?Buffer.from(e,"base64").toString("ascii").split(":")?.[1]:""}U.getKey=e=>void 0===e?["UpcomingInterview"]:["UpcomingInterview",e],U.fetcher=(e,t)=>c(R,e,t)}};