import{y as n,j as e,B as t,T as u,t as c,q as o,P as j,z as B,r as S}from"./routes-6viKbL0G.js";import{a as A,A as I,S as z,b as g}from"./ScrollArea-CUK4Cd8N.js";import{A as v}from"./AuthIntro-Mo3rfVOe.js";import{z as l,h as F,e as R,g as x,f as d,c as C}from"./CommentRounded-BPXzCwHo.js";import{S as h}from"./DarkModeRounded-Lrqg7oSU.js";import"./forum-Crq1S1o7.js";import"./ForumRounded-Pin0pi4o.js";import"./useQuery-NVyx1-1v.js";import"./Skeleton-BDqUCout.js";import"./useMutation-DpfIkxrB.js";import"./with-selector-tCt2MiXk.js";const T=l.object({email:l.string().trim().email("請輸入有效的電子郵件地址").max(100,"電子郵件地址過長"),username:l.string().trim().min(4,"使用者名稱至少 4 個字元").max(20,"使用者名稱最多 20 個字元").regex(/^[a-zA-Z0-9 ]+$/,"使用者名稱只能包含英文字母與數字"),password:l.string().trim().min(1,"密碼不能為空")}),f=()=>{const{mutateAsync:i,isPending:p}=F(),a=R({defaultValues:{email:"",username:"",password:""},validators:{onBlur:T},onSubmit:async({value:r})=>{if(p)return;const{email:s,username:y,password:w}=r,m=await i({email:s,username:y.trim(),password:w});if(m.error)return console.error(m.error);m.authenticated&&(window.location.href=n.forum_home)},onSubmitInvalid:()=>{console.error("請檢查表單是否填寫正確")}}),b=async r=>{if(r.preventDefault(),!a.state.canSubmit)return console.error("請檢查表單是否填寫正確");a.handleSubmit()};return e.jsxs(h,{component:"form",sx:{p:6,flex:1,justifyContent:"center"},onSubmit:b,children:[e.jsx(t,{sx:{display:"grid",placeItems:"center",mb:2},children:e.jsx(u,{variant:"h4",component:"h2",gutterBottom:!0,sx:{textAlign:"center"},children:"加入我們"})}),e.jsx(a.Field,{name:"email",children:r=>e.jsx(c,{required:!0,name:r.name,type:"email",fullWidth:!0,size:"small",variant:"filled",sx:{mb:.5},label:"電子郵件",error:d(r.state.meta.errors),helperText:x(r.state.meta.errors),value:r.state.value,onChange:s=>r.handleChange(s.target.value),onBlur:r.handleBlur})}),e.jsx(a.Field,{name:"username",children:r=>e.jsx(c,{required:!0,name:r.name,type:"text",fullWidth:!0,size:"small",variant:"filled",sx:{mb:.5},label:"使用者名稱",error:d(r.state.meta.errors),helperText:x(r.state.meta.errors),value:r.state.value,onChange:s=>r.handleChange(s.target.value),onBlur:r.handleBlur})}),e.jsx(a.Field,{name:"password",children:r=>e.jsx(c,{required:!0,name:r.name,type:"password",fullWidth:!0,size:"small",variant:"filled",sx:{mb:.5},label:"密碼",error:d(r.state.meta.errors),helperText:x(r.state.meta.errors),value:r.state.value,onChange:s=>r.handleChange(s.target.value),onBlur:r.handleBlur})}),e.jsx(o,{type:"submit",variant:"contained",loading:p,sx:{mt:1.5,width:.8,alignSelf:"center",borderRadius:99,"&:hover":{bgcolor:"primary.light",scale:1.02},"&:active":{scale:.98},transition:"all 0.2s ease"},children:"註冊"})]})},W=()=>e.jsx(C,{maxWidth:"lg",sx:{position:"relative",display:"grid",placeItems:"center",minHeight:"100vh"},children:e.jsxs(j,{sx:{position:"relative",my:10,borderRadius:3,overflow:"hidden",display:"flex",width:1},elevation:6,children:[e.jsx(t,{sx:{flex:1,position:"relative"},children:e.jsxs(h,{sx:{height:1},children:[e.jsx(t,{sx:{mb:2,p:2},children:e.jsx(o,{sx:{textWrap:"nowrap",width:"fit-content"},href:n.forum_home,startIcon:e.jsx(g,{}),children:"返回首頁"})}),e.jsx(f,{}),e.jsx(t,{sx:{mt:3,p:2},children:e.jsxs(u,{variant:"caption",gutterBottom:!0,children:["已經有帳號？",e.jsx(o,{href:n.forum_login,variant:"outlined",size:"small",sx:{ml:1},children:"登入"})]})})]})}),e.jsx(t,{className:"mode-dark",sx:{position:"relative",flex:1,bgcolor:"secondary.main",color:"text.primary"},children:e.jsx(v,{})})]})}),E=()=>e.jsxs(j,{sx:{position:"relative",borderRadius:0,width:1},elevation:0,children:[e.jsxs(h,{children:[e.jsx(t,{sx:{mb:2,p:2},children:e.jsx(o,{sx:{textWrap:"nowrap",width:"fit-content"},href:n.forum_home,startIcon:e.jsx(g,{}),children:"返回首頁"})}),e.jsx(f,{}),e.jsx(t,{sx:{mt:3,p:2},children:e.jsxs(u,{variant:"caption",gutterBottom:!0,children:["已經有帳號？",e.jsx(o,{href:n.forum_login,variant:"outlined",size:"small",sx:{ml:1},children:"登入"})]})})]}),e.jsx(t,{className:"mode-dark",sx:{position:"relative",bgcolor:"secondary.main",color:"text.primary"},children:e.jsx(v,{})})]});function k(){const{isMd:i}=A();return e.jsxs(I,{children:[i&&e.jsx(t,{sx:{position:"fixed",inset:"0 auto 0 0",width:.5,bgcolor:"secondary.main"}}),e.jsx(z,{children:i?e.jsx(W,{}):e.jsx(E,{})})]})}B.createRoot(document.getElementById("root")).render(e.jsx(S.StrictMode,{children:e.jsx(k,{})}));
