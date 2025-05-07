"use strict";exports.id=354,exports.ids=[354],exports.modules={12803:(e,t,i)=>{i.d(t,{A:()=>h});var a=i(60687),r=i(43210),o=i(15319),n=i(82948),l=i(88931),s=i(83685),d=i(87088),c=i(91176),p=i(44873),m=i(86411),u=i(97498),y=i(6353),f=i(92245),x=i(99737),b=i(12818);function h({open:e,onClose:t,job:i,applied:h=!1}){let[g,A]=(0,r.useState)(!1);return i?(0,a.jsxs)(n.Ay,{anchor:"right",open:g,onClose:t,hideBackdrop:!1,sx:{zIndex:1e5},PaperProps:{sx:{width:800,backgroundColor:"#ffffff",padding:2,borderTopLeftRadius:"16px",borderBottomLeftRadius:"16px",overflow:"visible",boxShadow:"0px 0px 20px rgba(0, 0, 0, 0.1)",zIndex:1e5}},children:[(0,a.jsx)(l.default,{sx:{position:"absolute",top:100,left:0,transform:"translateX(-50%)",width:60,height:90,backgroundColor:"#ffffff",borderTopLeftRadius:"10px",borderBottomLeftRadius:"10px",display:"flex",alignItems:"center",justifyContent:"center",zIndex:0,boxShadow:"-5px 0px 10px rgba(0, 0, 0, 0.05)"},children:(0,a.jsx)(s.default,{onClick:t,size:"small",sx:{color:"#555",paddingRight:3,zIndex:1,"&:hover":{backgroundColor:"transparent",color:"#000"}},children:(0,a.jsx)(p.A,{})})}),(0,a.jsxs)(l.default,{className:"pl-8 pt-8 pr-8 flex flex-col gap-6 w-full overflow-y-scroll",children:[(0,a.jsx)(l.default,{className:"flex w-full items-start justify-between",children:(0,a.jsxs)(l.default,{className:"flex gap-4",children:[(0,a.jsx)("img",{src:"/icon.png",alt:"Company Logo",className:"h-20 w-20 rounded-lg object-contain border border-gray-200"}),(0,a.jsxs)(l.default,{children:[(0,a.jsx)(d.A,{variant:"h5",fontWeight:"bold",color:"text.primary",children:i.title}),(0,a.jsx)(d.A,{color:"#7e5ca0",children:i.company.name||"Nomad"}),(0,a.jsxs)(l.default,{className:"flex items-center mt-1",children:[(0,a.jsx)(m.A,{sx:{fontSize:16,mr:1,color:"text.secondary"}}),(0,a.jsxs)(d.A,{variant:"body2",color:"text.secondary",children:["Updated"," ",(0,o.m)(new Date(i.updatedAt),{addSuffix:!0})]})]})]})]})}),(0,a.jsx)(c.A,{sx:{my:1}}),(0,a.jsxs)(l.default,{className:"grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg",children:[(0,a.jsxs)(l.default,{className:"flex items-center gap-2",children:[(0,a.jsx)(u.A,{className:"text-[#636363]"}),(0,a.jsxs)(l.default,{children:[(0,a.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Location"}),(0,a.jsx)(d.A,{variant:"body2",children:i.city})]})]}),(0,a.jsxs)(l.default,{className:"flex items-center gap-2",children:[(0,a.jsx)(y.A,{className:"text-[#636363]"}),(0,a.jsxs)(l.default,{children:[(0,a.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Work Mode"}),(0,a.jsx)(d.A,{variant:"body2",children:{on_site:"On Site",remote:"Remote",hybrid:"Hybrid"}[i.workMode]})]})]}),(0,a.jsxs)(l.default,{className:"flex items-center gap-2",children:[(0,a.jsx)(f.A,{className:"text-[#636363]"}),(0,a.jsxs)(l.default,{children:[(0,a.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Employment Type"}),(0,a.jsx)(d.A,{variant:"body2",children:{full_time:"Full Time",part_time:"Part Time",contract:"Contract"}[i.employmentType]})]})]}),(0,a.jsxs)(l.default,{className:"flex items-center gap-2",children:[(0,a.jsx)(m.A,{className:"text-[#636363]"}),(0,a.jsxs)(l.default,{children:[(0,a.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Availability"}),(0,a.jsx)(d.A,{variant:"body2",children:{immediate:"Immediate",two_weeks_notice:"2 weeks notice",three_weeks_notice:"3 weeks notice",four_weeks_notice:"4 weeks notice"}[i.availibility]})]})]}),(0,a.jsxs)(l.default,{className:"flex items-center gap-2",children:[(0,a.jsx)(x.A,{className:"text-[#636363]"}),(0,a.jsxs)(l.default,{children:[(0,a.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Salary"}),(0,a.jsxs)(d.A,{variant:"body2",children:["$",i.minSalary," - $",i.maxSalary]})]})]}),(0,a.jsxs)(l.default,{className:"flex items-center gap-2",children:[(0,a.jsx)(b.A,{className:"text-[#636363]"}),(0,a.jsxs)(l.default,{children:[(0,a.jsx)(d.A,{variant:"caption",color:"text.secondary",children:"Client"}),(0,a.jsx)(d.A,{variant:"body2",children:i.department})]})]})]}),(0,a.jsxs)(l.default,{className:"mt-4",children:[(0,a.jsx)(d.A,{variant:"h6",fontWeight:"bold",gutterBottom:!0,children:"Job Description"}),(0,a.jsx)(l.default,{sx:{"& h1":{fontSize:"2em",margin:"0.67em 0"},"& h2":{fontSize:"1.5em",margin:"0.75em 0"},"& h3":{fontSize:"1.17em",margin:"0.83em 0"},"& p":{margin:"0 0"},"& ul":{listStyleType:"disc",paddingLeft:"2.5em",margin:"1em 0","& li":{display:"list-item",paddingLeft:"0.5em",'&[data-list="ordered"]':{listStyleType:"none"}}},"& ol":{listStyleType:"decimal",paddingLeft:"2.5em",margin:"1em 0","& li":{display:"list-item",paddingLeft:"0.5em",'&[data-list="bullet"]':{listStyleType:"none"}}},"& strong":{fontWeight:"bold"},"& em":{fontStyle:"italic"},"& u":{textDecoration:"underline"},"& a":{color:"primary.main",textDecoration:"underline","&:hover":{textDecoration:"none"}},"& blockquote":{borderLeft:"4px solid #ccc",margin:"1em 0",paddingLeft:"1em",color:"#666"},"& .ql-ui":{display:"none"},'& li[data-list="bullet"]':{listStyleType:"disc !important"},'& li[data-list="ordered"]':{listStyleType:"decimal !important"}},dangerouslySetInnerHTML:{__html:i.description||"<p>No job description provided.</p>"}})]})]})]}):null}},64796:(e,t,i)=>{i.d(t,{AG:()=>p,fi:()=>m,cr:()=>u,MO:()=>y,NH:()=>f,bC:()=>z,wc:()=>H,RB:()=>D,nF:()=>v,AY:()=>b,OD:()=>S,bE:()=>L,Br:()=>w,_L:()=>T,FM:()=>k,LF:()=>C,lI:()=>J,jb:()=>_,GF:()=>q,EL:()=>O,n6:()=>B});var a=i(54050),r=i(29494);class o extends Error{constructor(e="Validation Error",t=500,i={}){super(e),this.name=this.constructor.name,this.status=t,this.message=e,i&&(this.meta=i),Error.captureStackTrace?.(this,this.constructor)}}var n=i(99638),l=i(56002),s=i.n(l);let d=new n.l4("https://prototype-apriora.duckdns.org/graphql",{fetch:s(),credentials:"include"});function c(e,t,i){return async()=>d.request(e,t,i).catch(({response:e})=>{throw new o(e?.error,e?.status,{response:e})})}var p=function(e){return e.FourWeeksNotice="FOUR_WEEKS_NOTICE",e.Immediate="IMMEDIATE",e.ThreeWeeksNotice="THREE_WEEKS_NOTICE",e.TwoWeeksNotice="TWO_WEEKS_NOTICE",e}({}),m=function(e){return e.Contract="CONTRACT",e.FullTime="FULL_TIME",e.PartTime="PART_TIME",e}({}),u=function(e){return e.Hourly="HOURLY",e.Unit="UNIT",e}({}),y=function(e){return e.Archived="ARCHIVED",e.Draft="DRAFT",e.Published="PUBLISHED",e}({}),f=function(e){return e.Hybrid="HYBRID",e.OnSite="ON_SITE",e.Remote="REMOTE",e}({});let x=`
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
    `,b=e=>(0,a.n)({mutationKey:["CreateJobPostApplication"],mutationFn:e=>c(x,e)(),...e});b.getKey=()=>["CreateJobPostApplication"],b.fetcher=(e,t)=>c(x,e,t);let h=`
    mutation AbortUpload($uploadId: String!, $key: String!) {
  abortUpload(uploadId: $uploadId, key: $key)
}
    `,g=e=>(0,a.n)({mutationKey:["AbortUpload"],mutationFn:e=>c(h,e)(),...e});g.getKey=()=>["AbortUpload"],g.fetcher=(e,t)=>c(h,e,t);let A=`
    mutation CompleteUpload($uploadId: String!, $key: String!, $parts: [PartETagInput!]!) {
  completeUpload(uploadId: $uploadId, key: $key, parts: $parts)
}
    `,v=e=>(0,a.n)({mutationKey:["CompleteUpload"],mutationFn:e=>c(A,e)(),...e});v.getKey=()=>["CompleteUpload"],v.fetcher=(e,t)=>c(A,e,t);let j=`
    mutation CreateJobPost($data: JobPostCreateInput!) {
  jobPostCreate(data: $data) {
    id
  }
}
    `,S=e=>(0,a.n)({mutationKey:["CreateJobPost"],mutationFn:e=>c(j,e)(),...e});S.getKey=()=>["CreateJobPost"],S.fetcher=(e,t)=>c(j,e,t);let I=`
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
    `,w=e=>(0,a.n)({mutationKey:["getInterviewSumary"],mutationFn:e=>c(I,e)(),...e});w.getKey=()=>["getInterviewSumary"],w.fetcher=(e,t)=>c(I,e,t);let P=`
    mutation GetUploadPartUrl($uploadId: String!, $partNumber: Int!, $key: String!) {
  getUploadPartUrl(uploadId: $uploadId, partNumber: $partNumber, key: $key)
}
    `,T=e=>(0,a.n)({mutationKey:["GetUploadPartUrl"],mutationFn:e=>c(P,e)(),...e});T.getKey=()=>["GetUploadPartUrl"],T.fetcher=(e,t)=>c(P,e,t);let K=`
    mutation InitiateUpload($filename: String!, $contentType: String!) {
  initiateUpload(filename: $filename, contentType: $contentType) {
    uploadId
    key
  }
}
    `,k=e=>(0,a.n)({mutationKey:["InitiateUpload"],mutationFn:e=>c(K,e)(),...e});k.getKey=()=>["InitiateUpload"],k.fetcher=(e,t)=>c(K,e,t);let U=`
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
    `,C=(e,t)=>(0,r.I)({queryKey:["Interview",e],queryFn:c(U,e),...t});C.getKey=e=>["Interview",e],C.fetcher=(e,t)=>c(U,e,t);let N=`
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
    `,J=(e,t)=>(0,r.I)({queryKey:void 0===e?["JobSeekerKpis"]:["JobSeekerKpis",e],queryFn:c(N,e),...t});J.getKey=e=>void 0===e?["JobSeekerKpis"]:["JobSeekerKpis",e],J.fetcher=(e,t)=>c(N,e,t);let $=`
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
    `,q=(e,t)=>(0,r.I)({queryKey:void 0===e?["RecruiterKpis"]:["RecruiterKpis",e],queryFn:c($,e),...t});q.getKey=e=>void 0===e?["RecruiterKpis"]:["RecruiterKpis",e],q.fetcher=(e,t)=>c($,e,t);let E=`
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
      minSalary
      maxSalary
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
    `,D=(e,t)=>(0,r.I)({queryKey:void 0===e?["AppliedJobs"]:["AppliedJobs",e],queryFn:c(E,e),...t});D.getKey=e=>void 0===e?["AppliedJobs"]:["AppliedJobs",e],D.fetcher=(e,t)=>c(E,e,t);let F=`
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
      id
      scheduledAt
    }
  }
}
    `,L=(e,t)=>(0,r.I)({queryKey:void 0===e?["getAllSummaries"]:["getAllSummaries",e],queryFn:c(F,e),...t});L.getKey=e=>void 0===e?["getAllSummaries"]:["getAllSummaries",e],L.fetcher=(e,t)=>c(F,e,t);let R=`
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
    minSalary
    maxSalary
    status
    title
    totalApplications
    updatedAt
    workMode
    workStartDate
  }
}
    `,_=(e,t)=>(0,r.I)({queryKey:void 0===e?["JobsPosts"]:["JobsPosts",e],queryFn:c(R,e),...t});_.getKey=e=>void 0===e?["JobsPosts"]:["JobsPosts",e],_.fetcher=(e,t)=>c(R,e,t);let M=`
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
    minSalary
    maxSalary
    status
    title
    totalApplications
    updatedAt
    workMode
    workStartDate
  }
}
    `,O=(e,t)=>(0,r.I)({queryKey:void 0===e?["UnappliedJobs"]:["UnappliedJobs",e],queryFn:c(M,e),...t});O.getKey=e=>void 0===e?["UnappliedJobs"]:["UnappliedJobs",e],O.fetcher=(e,t)=>c(M,e,t);let W=`
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
        minSalary
        maxSalary
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
    `,B=(e,t)=>(0,r.I)({queryKey:void 0===e?["UpcomingInterview"]:["UpcomingInterview",e],queryFn:c(W,e),...t});function H(e,t){return t?Buffer.from(`${e}:${t}`).toString("base64"):""}function z(e){return e?Buffer.from(e,"base64").toString("ascii").split(":")?.[1]:""}B.getKey=e=>void 0===e?["UpcomingInterview"]:["UpcomingInterview",e],B.fetcher=(e,t)=>c(W,e,t)}};