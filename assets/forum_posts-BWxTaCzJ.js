import{j as e,B as i,T as n,r as y,q as b,P as A,y as I,z as S}from"./routes-BF-Brp0S.js";import{T as C,P}from"./TopicAutocomplete-DbTHaF54.js";import{E as g,S as T,a as B,A as k}from"./ExpandedPost-Dmb3HVoQ.js";import{a as D,A as w,S as R}from"./ScrollArea-DNegD6Ww.js";import{u as m,d as E,e as z,f as F,g as M}from"./PostHeader-B0ccVIt0.js";import{S as N}from"./SortRounded-CIHi4UdN.js";import{A as _}from"./ArrowUpwardRounded-Ck4XeNKg.js";import{T as L,a as O}from"./Tabs-BUj4_-wz.js";import{T as v}from"./useMutation-C8meJFDJ.js";import{S as x}from"./DarkModeRounded-Bn0R_6pu.js";import{i as W,k as q,c as H}from"./CommentRounded-CRIcDY47.js";import{S as U}from"./useQuery-GDYZV5d2.js";import{D as f}from"./OpenInNewRounded-CfpVJteo.js";import"./Autocomplete-Ym-7jwlo.js";import"./NotificationsRounded-CI0aEuaj.js";import"./Chip-D_FJO1ew.js";import"./forum-DB1wLXRP.js";import"./ForumRounded-Cx0Wn4X7.js";import"./ExpandMoreRounded-DNgopNN4.js";const u=["title","createdAt","updatedAt","commentCount","viewCount","likeCount"],$=["標題","建立時間","更新時間","回覆數","瀏覽數","讚數"],G=()=>{const{searchParams:t,updateSearchParams:r}=m(),o=t.get("orderBy")||u[0],c=t.get("orderDesc")==="true";let s=u.findIndex(a=>a===o);s===-1&&(s=1);const p=(a,l)=>{r({orderBy:u[l],orderDesc:c.toString()})},h=a=>()=>{s===a&&r({orderBy:u[a],orderDesc:(!c).toString()})};return e.jsxs(i,{sx:{display:"flex",alignItems:{xs:"normal",md:"center"},gap:{xs:0,md:1.5},flexDirection:{xs:"column",md:"row"}},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:1,p:{xs:1,md:0},pb:0},children:[e.jsx(N,{sx:{color:"inherit"}}),e.jsx(n,{variant:"subtitle1",component:"h2",sx:{lineHeight:1},children:"排序依據"})]}),e.jsx(L,{value:s,onChange:p,variant:"scrollable",allowScrollButtonsMobile:!0,sx:{"& button:hover":{bgcolor:"action.hover"}},children:$.map((a,l)=>e.jsx(O,{onClick:h(l),label:e.jsx(v,{title:"再次點擊可以切換升冪或降冪排序",arrow:!0,placement:"top",children:e.jsxs(x,{direction:"row",sx:{alignItems:"center"},children:[e.jsx(n,{variant:"subtitle1",component:"span",children:a}),s===l&&e.jsx(_,{fontSize:"small",sx:{transform:c?"rotate(180deg)":"none",transition:"all 0.2s ease"}})]})})},l))})]})},J=()=>{const{searchParams:t}=m(),[r,o]=y.useState(null),c=p=>o(p.currentTarget),s=()=>o(null);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"換一個主題",arrow:!0,children:e.jsxs(n,{variant:"h6",component:"h2",sx:{color:"text.secondary","&:hover":{cursor:"pointer",textDecoration:"underline",color:"text.primary"}},onClick:c,children:["#",t.get("topic")??"全部"]})}),e.jsx(C,{type:"query",open:!!r,anchorEl:r,onClose:s,onSelect:s})]})},K=["title","createdAt","updatedAt","commentCount","viewCount","likeCount"],Q=t=>K.includes(t),V=()=>{const{searchParams:t}=m(),r=t.get("topic")??void 0,o=t.get("orderBy")??"title",c=t.get("orderDesc")==="true",{data:s,isLoading:p,isFetchingNextPage:h,hasNextPage:a,fetchNextPage:l}=q({topic:r,orderBy:Q(o)?o:"createdAt",order:c?"desc":"asc"});return p||!s?e.jsx(x,{sx:{alignItems:"stretch",mb:1.5},children:[...Array(3)].map((j,d)=>e.jsx(g,{},d))}):s.pages[0].posts.length===0?e.jsxs(i,{sx:{py:6,display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(T,{sx:{fontSize:"6rem",color:"action.disabled"}}),e.jsx(n,{variant:"body1",component:"p",sx:{color:"text.secondary",textAlign:"center"},children:"沒有符合條件的貼文"})]}):e.jsxs(x,{sx:{alignItems:"stretch",mb:1.5},children:[s.pages.map(j=>j.posts.map(d=>e.jsx(B,{postId:d},d))),h&&e.jsx(x,{sx:{alignItems:"stretch",mt:1.5},children:[...Array(3)].map((j,d)=>e.jsx(g,{},d))}),a?h?e.jsx(n,{sx:{color:"text.secondary",textAlign:"center",mt:3},children:"載入中..."}):e.jsxs(i,{sx:{display:"flex",justifyContent:"center",alignItems:"center",mt:3,gap:1},children:[e.jsx(n,{sx:{color:"text.secondary"},children:"滾動以載入更多，或點擊"}),e.jsx(b,{onClick:()=>l(),children:"載入更多"})]}):e.jsx(n,{sx:{color:"text.secondary",textAlign:"center",mt:3},children:"已經到底了"})]})},X=()=>{const{searchParams:t}=m(),r=t.get("topic")??void 0,{data:o}=W({topic:r});return o?e.jsxs(n,{variant:"body2",component:"span",sx:{color:"text.secondary"},children:["共 ",o," 篇"]}):e.jsx(U,{variant:"rounded",animation:"wave",children:e.jsx(n,{variant:"body2",component:"span",sx:{color:"text.secondary"},children:"共 0 篇"})})},Y=()=>{const{searchParams:t}=m(),r=t.get("topic")??"全部";return e.jsx("title",{children:`論壇樣板 | 貼文 #${r}`})};function Z(){const{isMd:t}=D();return e.jsxs(w,{children:[e.jsx(Y,{}),e.jsx(E,{}),e.jsxs(R,{children:[t?e.jsx(z,{}):e.jsx(F,{}),e.jsx(H,{maxWidth:"lg",sx:{position:"relative",my:10,px:0},children:e.jsxs(A,{sx:{py:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:[e.jsxs(i,{sx:{display:"flex",gap:1,alignItems:"center",pr:{xs:3,md:5},pl:2},children:[e.jsx(x,{sx:{alignItems:"flex-start",flex:1},children:e.jsx(b,{href:I.forum_home,startIcon:e.jsx(k,{}),variant:"outlined",sx:{textWrap:"nowrap"},children:t?"返回首頁":"首頁"})}),e.jsxs(i,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(P,{className:"mode-light",sx:{fontSize:48,mr:1,bgcolor:"primary.main",borderRadius:1,color:"background.default",p:1,opacity:.8}}),e.jsx(n,{variant:"h5",component:"h2",children:"貼文列表"}),e.jsx(J,{})]}),e.jsx(x,{sx:{alignItems:"flex-end",flex:1},children:e.jsx(X,{})})]}),e.jsx(f,{sx:{mt:2}}),e.jsxs(i,{sx:{position:"relative",px:{xs:1,sm:2,md:5}},children:[e.jsx(i,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),e.jsx(G,{})]}),e.jsx(f,{}),e.jsx(V,{})]})}),e.jsx(M,{})]})]})}S.createRoot(document.getElementById("root")).render(e.jsx(y.StrictMode,{children:e.jsx(Z,{})}));
