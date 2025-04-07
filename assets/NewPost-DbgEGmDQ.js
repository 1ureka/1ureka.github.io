import{o as F,j as e,r as O,B as d,T as u,t as z,q as E,E as G}from"./routes-n0rROGIf.js";import{B as k}from"./Motion-CpIRI559.js";import{f as J}from"./url-C4V0Sknt.js";import{P as K,T as Q}from"./TopicAutocomplete-DrjjJBFW.js";import{z as m,m as X,n as Y,j as Z,d as _,e as B,i as ee}from"./post-BnkCC9MM.js";import{E as te}from"./EmojiMenu-Bt7nVSP7.js";import{f as ae}from"./formatters-CWrkKLZ2.js";import{S as se}from"./Skeleton-DVK1y20g.js";import{D as P}from"./Divider-DiSxJ-uN.js";import{I as v}from"./DarkModeRounded-BstcUZiJ.js";import{C as b}from"./Chip-Dr4JwOJ2.js";import{T as w}from"./useMutation-3TE3W5MO.js";const ne=F(e.jsx("path",{d:"M18 13h-5v5c0 .55-.45 1-1 1s-1-.45-1-1v-5H6c-.55 0-1-.45-1-1s.45-1 1-1h5V6c0-.55.45-1 1-1s1 .45 1 1v5h5c.55 0 1 .45 1 1s-.45 1-1 1"})),re=F(e.jsx("path",{d:"M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2M8.9 13.98l2.1 2.53 3.1-3.99c.2-.26.6-.26.8.01l3.51 4.68c.25.33.01.8-.4.8H6.02c-.42 0-.65-.48-.39-.81L8.12 14c.19-.26.57-.27.78-.02"})),oe=F(e.jsx("path",{d:"M5 5c0 .55.45 1 1 1h12c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1 .45-1 1m2.41 9H9v5c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.71 7.7a.996.996 0 0 0-1.41 0l-4.59 4.59c-.63.63-.19 1.71.7 1.71"})),R=(r,o)=>{const i=new Set;return r.filter(f=>{const x=f[o];return i.has(x)?!1:(i.add(x),!0)})},p={title:m.string().trim().min(1,"標題不能為空").max(100,"標題最多 100 個字元"),content:m.string().trim().min(1,"內容不能為空").max(5e3,"內容最多 5000 個字元"),tags:m.array(m.string().trim().min(1,"標籤不能為空")).min(1,"至少選擇一個標籤").max(8,"最多選擇 8 個標籤").refine(r=>new Set(r).size===r.length,{message:"標籤不能重複"}),photos:m.array(m.instanceof(File)).max(10,"最多上傳 10 張圖片").refine(r=>r.every(o=>o.type.startsWith("image/")),{message:"附圖僅允許上傳圖片檔案，其他類型檔案請用附件功能"}).refine(r=>r.every(o=>o.size<=5*1024*1024),{message:"每個附件不得超過 5MB"}).refine(r=>{const o=r.map(i=>i.name);return new Set(o).size===o.length},{message:"不允許上傳重複的圖片檔案"}),attachments:m.array(m.instanceof(File)).max(10,"最多上傳 10 個附件").refine(r=>r.every(o=>o.size<=5*1024*1024),{message:"每個附件不得超過 5MB"}).refine(r=>{const o=r.map(i=>i.name);return new Set(o).size===o.length},{message:"不允許上傳重複的附件檔案"})},ie=m.object(p),le={title:"",content:"",tags:[],photos:[],attachments:[]},be=({mode:r="create",initialValues:o={},postId:i})=>{const{mutateAsync:f,isPending:x}=X(),{mutateAsync:A,isPending:T}=Y(),j=x||T,{user:V,authenticated:l,loading:c}=Z(),n=_({defaultValues:{...le,...o},validators:{onSubmit:ie},onSubmit:async({value:t})=>{if(j)return;const a={...t,photos:t.photos.map(s=>({name:s.name,size:s.size,url:""})),attachments:t.attachments.map(s=>({name:s.name,size:s.size,url:""}))};if(r==="edit"){if(!i)return console.error("編輯模式需要提供 postId");const s=await A({...a,id:i});if(s===null){window.location.reload();return}s.error&&console.error(`貼文更新失敗：${s.error}`)}if(r==="create"){const s=await f(a);if(typeof s=="number")return n.reset(),console.log("發佈成功，貼文 ID：",s);s.error&&console.error(`貼文發佈失敗：${s.error}`)}}}),M=async()=>{if(!n.state.canSubmit){G(n.getAllErrors().fields).forEach(([t,a])=>{a.errors.forEach(s=>{!s||typeof s!="object"||"message"in s&&console.error(`${t}: ${s.message}`)})}),console.error("請檢查表單是否填寫正確");return}n.handleSubmit()},U=t=>{if(!t.target.files)return;const a=Array.from(t.target.files);n.setFieldValue("photos",s=>[...s,...a]),n.validateField("photos","change")},L=t=>{if(!t.target.files)return;const a=Array.from(t.target.files);n.setFieldValue("attachments",s=>[...s,...a])},$=t=>{n.setFieldValue("photos",a=>a.filter(s=>s.name!==t)),n.validateField("photos","change")},D=t=>{n.setFieldValue("attachments",a=>a.filter(s=>s.name!==t)),n.validateField("attachments","change")},[S,C]=O.useState(null),H=t=>C(t.currentTarget),I=()=>C(null),N=t=>{n.setFieldValue("tags",a=>Array.from(new Set([...a,t]))),n.validateField("tags","change"),I()},W=t=>{n.setFieldValue("tags",a=>a.filter(s=>s!==t)),n.validateField("tags","change")},q=t=>{n.setFieldValue("content",a=>{const s=document.querySelector('textarea[placeholder="分享你的想法..."]');if(s){const h=s.selectionStart||0,y=s.selectionEnd||0,g=a.substring(0,h)+t+a.substring(y);return setTimeout(()=>{s.focus(),s.setSelectionRange(h+t.length,h+t.length)},0),g}return a+t})};return e.jsxs(e.Fragment,{children:[r==="create"&&e.jsxs(d,{sx:{display:"flex",gap:1,alignItems:"center",px:3},children:[e.jsx(K,{className:"mode-light",sx:{fontSize:48,mr:1,bgcolor:"primary.main",borderRadius:1,color:"background.default",p:1,opacity:.8}}),l?e.jsxs(e.Fragment,{children:[e.jsx(u,{variant:"h5",component:"h2",color:"primary",sx:{opacity:.8},children:V.name}),e.jsx(u,{variant:"h5",component:"h2",children:"，你在想些什麼？"})]}):c?e.jsx(se,{variant:"rounded",animation:"wave",children:e.jsx(u,{variant:"h5",component:"h2",children:"登入就能分享你的想法喔 ✨"})}):e.jsx(u,{variant:"h5",component:"h2",children:"登入就能分享你的想法喔 ✨"})]}),r==="create"&&e.jsx(P,{sx:{my:2}}),e.jsxs(d,{sx:{px:3},children:[e.jsx(n.Field,{name:"title",validators:{onSubmit:p.title},children:t=>e.jsx(z,{name:t.name,fullWidth:!0,label:"標題",variant:"filled",sx:{mb:.5},disabled:!l||c,type:"text",error:B(t.state.meta.errors),value:t.state.value,onChange:a=>t.handleChange(a.target.value),onBlur:t.handleBlur})}),e.jsx(n.Field,{name:"content",validators:{onSubmit:p.content},children:t=>e.jsx(z,{name:t.name,multiline:!0,fullWidth:!0,placeholder:"分享你的想法...",variant:"filled",minRows:6,maxRows:12,size:"small",sx:{mb:1},disabled:!l||c,type:"text",error:B(t.state.meta.errors),value:t.state.value,onChange:a=>t.handleChange(a.target.value),onBlur:t.handleBlur})}),e.jsx(n.Field,{name:"photos",validators:{onChange:p.photos},children:t=>t.state.value.length>0&&e.jsx(d,{sx:{mb:1,display:"flex",flexWrap:"wrap",gap:1},children:R(t.state.value,"name").map((a,s)=>{const h=URL.createObjectURL(a);return e.jsxs(k,{layout:!0,sx:{position:"relative",width:100,height:100,borderRadius:1,overflow:"hidden"},children:[e.jsx("img",{src:h,alt:`上傳的圖片 ${s+1}`,style:{width:"100%",height:"100%",objectFit:"cover"},onLoad:()=>URL.revokeObjectURL(h),onError:y=>{const g=y.target;g.onerror=null,g.src="data:image/svg+xml;base64,"+btoa('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300"><rect width="100%" height="100%" fill="gray"/></svg>')}}),e.jsx(v,{size:"small",onClick:()=>$(a.name),sx:{position:"absolute",top:4,right:4,bgcolor:"divider",color:"white","&:hover":{bgcolor:"error.main"},p:.5},children:e.jsx(ee,{fontSize:"small"})})]},a.name)})})}),e.jsx(n.Field,{name:"attachments",validators:{onChange:p.attachments},children:t=>t.state.value.length>0&&e.jsxs(d,{sx:{mb:1},children:[e.jsx(u,{variant:"body2",sx:{color:"text.secondary",mb:.5},children:"附件檔案："}),R(t.state.value,"name").map(a=>e.jsx(k,{layout:!0,sx:{mr:1,mb:1,display:"inline-block"},children:e.jsx(b,{label:`${a.name} (${ae(a.size)})`,onDelete:()=>D(a.name)})},a.name))]})}),e.jsxs(d,{sx:{display:"flex",gap:1,alignItems:"center",flexWrap:"wrap"},children:[e.jsx(u,{variant:"body2",component:"span",sx:{color:"text.secondary"},children:"標籤："}),e.jsx(n.Field,{name:"tags",validators:{onChange:p.tags},children:()=>null}),e.jsx(n.Subscribe,{selector:t=>t.values.tags,children:t=>e.jsx(e.Fragment,{children:[...new Set(t)].map(a=>e.jsx(w,{title:"刪除",arrow:!0,placement:"top",children:e.jsx(b,{label:a,clickable:!0,onClick:()=>W(a)})},a))})}),e.jsx(b,{label:"新增標籤",clickable:!0,icon:e.jsx(ne,{}),variant:"outlined",onClick:H,disabled:!l||c}),e.jsx(Q,{type:"add",open:!!S,anchorEl:S,onClose:I,onAdd:N})]})]}),e.jsx(P,{sx:{mt:1}}),e.jsxs(d,{sx:{position:"relative",display:"flex",gap:1,alignItems:"center",justifyContent:"space-between",py:1,px:3},children:[e.jsx(d,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),e.jsxs(d,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(te,{onEmojiClick:q,disabled:!l||c}),e.jsx(w,{title:"插入照片",arrow:!0,children:e.jsx("span",{children:e.jsxs(v,{size:"small",onClick:()=>{var t;return(t=document.getElementById("photo-upload"))==null?void 0:t.click()},disabled:!l||c,children:[e.jsx(re,{fontSize:"small"}),e.jsx("input",{type:"file",id:"photo-upload",accept:"image/*",multiple:!0,style:{display:"none"},onChange:U})]})})}),e.jsx(w,{title:"附加檔案",arrow:!0,children:e.jsx("span",{children:e.jsxs(v,{size:"small",onClick:()=>{var t;return(t=document.getElementById("file-upload"))==null?void 0:t.click()},disabled:!l||c,children:[e.jsx(J,{fontSize:"small"}),e.jsx("input",{type:"file",id:"file-upload",multiple:!0,style:{display:"none"},onChange:L})]})})})]}),e.jsxs(d,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(E,{variant:"outlined",onClick:()=>n.reset(),disabled:!l||c,loading:j,children:"取消"}),e.jsx(E,{variant:"contained",color:"primary",endIcon:e.jsx(oe,{}),onClick:M,disabled:!l||c,loading:j,children:"發佈"})]})]})]})};export{be as N};
