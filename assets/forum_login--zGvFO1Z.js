import{y as l,j as e,B as t,T as h,t as d,q as m,P as f,z as v,r as b}from"./routes-BF-Brp0S.js";import{a as y,A as w,N as S,S as B,b as A}from"./ScrollArea-DNegD6Ww.js";import{A as I}from"./AuthIntro-0n9PR1Gi.js";import{z as i,d as F,e as z,g as u,f as x,c as C}from"./CommentRounded-CRIcDY47.js";import{S as p}from"./DarkModeRounded-Bn0R_6pu.js";import"./forum-DB1wLXRP.js";import"./ForumRounded-Cx0Wn4X7.js";import"./useQuery-GDYZV5d2.js";import"./useMutation-C8meJFDJ.js";const E=i.object({username:i.string().trim().min(4,"使用者名稱至少 4 個字元").max(20,"使用者名稱最多 20 個字元").regex(/^[a-zA-Z0-9 ]+$/,"使用者名稱只能包含英文字母與數字"),password:i.string().trim().min(1,"密碼不能為空")}),R=()=>{const{mutateAsync:s,isPending:c}=F(),o=z({defaultValues:{username:"",password:""},validators:{onBlur:E},onSubmit:async({value:r})=>{if(c)return;const{username:a,password:j}=r,n=await s({username:a,password:j});if(n.error)return console.error(n.error);n.authenticated&&(window.location.href=l.forum_home)},onSubmitInvalid:()=>{console.error("請檢查表單是否填寫正確")}}),g=async r=>{if(r.preventDefault(),!o.state.canSubmit)return console.error("請檢查表單是否填寫正確");o.handleSubmit()};return e.jsxs(p,{component:"form",sx:{p:6,flex:1,justifyContent:"center"},onSubmit:g,children:[e.jsx(t,{sx:{display:"grid",placeItems:"center",mb:2},children:e.jsx(h,{variant:"h4",component:"h2",gutterBottom:!0,sx:{textAlign:"center"},children:"歡迎回來"})}),e.jsx(o.Field,{name:"username",children:r=>e.jsx(d,{required:!0,name:r.name,type:"text",fullWidth:!0,size:"small",variant:"filled",sx:{mb:.5},label:"使用者名稱",error:x(r.state.meta.errors),helperText:u(r.state.meta.errors),value:r.state.value,onChange:a=>r.handleChange(a.target.value),onBlur:r.handleBlur})}),e.jsx(o.Field,{name:"password",children:r=>e.jsx(d,{required:!0,name:r.name,type:"password",fullWidth:!0,size:"small",variant:"filled",label:"密碼",sx:{mb:.5},error:x(r.state.meta.errors),helperText:u(r.state.meta.errors),value:r.state.value,onChange:a=>r.handleChange(a.target.value),onBlur:r.handleBlur})}),e.jsx(m,{type:"submit",variant:"contained",loading:c,sx:{mt:1.5,width:.8,alignSelf:"center",borderRadius:99,"&:hover":{bgcolor:"primary.light",scale:1.02},"&:active":{scale:.98},transition:"all 0.2s ease"},children:"登入"})]})};function T(){const{isMd:s}=y();return e.jsxs(w,{children:[!s&&e.jsx(S,{}),s&&e.jsx(t,{sx:{position:"fixed",inset:"0 auto 0 0",width:.5,bgcolor:"secondary.main"}}),e.jsx(B,{children:s&&e.jsx(C,{maxWidth:"lg",sx:{position:"relative",display:"grid",placeItems:"center",minHeight:"100vh"},children:e.jsxs(f,{sx:{position:"relative",my:10,borderRadius:3,overflow:"hidden",display:"flex",width:1},elevation:6,children:[e.jsx(t,{sx:{flex:1,position:"relative"},children:e.jsxs(p,{sx:{height:1},children:[e.jsx(t,{sx:{mb:2,p:2},children:e.jsx(m,{sx:{textWrap:"nowrap",width:"fit-content"},href:l.forum_home,startIcon:e.jsx(A,{}),children:"返回首頁"})}),e.jsx(R,{}),e.jsx(t,{sx:{mt:3,p:2},children:e.jsxs(h,{variant:"caption",gutterBottom:!0,children:["還沒有帳號？",e.jsx(m,{href:l.forum_register,variant:"outlined",size:"small",sx:{ml:1},children:"註冊"})]})})]})}),e.jsx(t,{className:"mode-dark",sx:{position:"relative",flex:1,bgcolor:"secondary.main",color:"text.primary"},children:e.jsx(I,{})})]})})})]})}v.createRoot(document.getElementById("root")).render(e.jsx(b.StrictMode,{children:e.jsx(T,{})}));
