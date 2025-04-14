import{j as e,B as i,T as n,S as x,r as y,P as A,q as S}from"./Toast-CQU7HRxP.js";import{T as I,P as C}from"./TopicAutocomplete-CKy4fDme.js";import{S as P,A as B}from"./SentimentDissatisfiedRounded-DMr8Wksk.js";import{a as T,A as D,S as k}from"./ScrollArea-bXVFt1-o.js";import{u as m,b as w,c as R,d as E,e as z}from"./url-d6RWfuGc.js";import{B as b,r as F}from"./routes-CbqUgxKc.js";import{S as M}from"./SortRounded-Cwg-j1If.js";import{A as N}from"./ArrowUpwardRounded-CEZZA8hQ.js";import{T as _,a as L}from"./Tabs-D9SqooEt.js";import{T as v}from"./Tooltip-B2u5Anbs.js";import{h as O,j as W,C as q}from"./post-DqTxsVj6.js";import{E as g,a as H}from"./ExpandedPost-CqQbIoGa.js";import{S as U}from"./Skeleton-BJlzAjuB.js";import{D as f}from"./Divider-BVbYJDzj.js";import"./Autocomplete-DDSK7rHF.js";import"./NotificationsRounded-BessYIZ7.js";import"./Chip-D_kpsi0I.js";import"./react-error-boundary.esm-r1noas7X.js";import"./ForumRounded-CuQuEyof.js";import"./SQLiteClient-CAkP0qTy.js";import"./ExpandMoreRounded-f5NKdB9D.js";import"./DarkModeRounded-Ch8L_na1.js";import"./OpenInNewRounded-Dg5lu0UK.js";import"./MenuItem-DmDsFyHS.js";import"./ListItemText-bZtqOhoY.js";import"./useMutation-Dm1cpFjH.js";import"./Collapse-fiT4VskB.js";import"./with-selector-CVzttz-H.js";import"./CommentRounded-Dt1_l1yi.js";import"./PostHeader-p6a6Q3na.js";import"./formatters-C9bWSe0O.js";const u=["title","createdAt","updatedAt","commentCount","viewCount","likeCount"],$=["標題","建立時間","更新時間","回覆數","瀏覽數","讚數"],G=()=>{const{searchParams:t,updateSearchParams:r}=m(),o=t.get("orderBy")||u[0],c=t.get("orderDesc")==="true";let s=u.findIndex(a=>a===o);s===-1&&(s=1);const p=(a,l)=>{r({orderBy:u[l],orderDesc:c.toString()})},h=a=>()=>{s===a&&r({orderBy:u[a],orderDesc:(!c).toString()})};return e.jsxs(i,{sx:{display:"flex",alignItems:{xs:"normal",md:"center"},gap:{xs:0,md:1.5},flexDirection:{xs:"column",md:"row"}},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:1,p:{xs:1,md:0},pb:0},children:[e.jsx(M,{sx:{color:"inherit"}}),e.jsx(n,{variant:"subtitle1",component:"h2",sx:{lineHeight:1},children:"排序依據"})]}),e.jsx(_,{value:s,onChange:p,variant:"scrollable",allowScrollButtonsMobile:!0,sx:{"& button:hover":{bgcolor:"action.hover"}},children:$.map((a,l)=>e.jsx(L,{onClick:h(l),label:e.jsx(v,{title:"再次點擊可以切換升冪或降冪排序",arrow:!0,placement:"top",children:e.jsxs(x,{direction:"row",sx:{alignItems:"center"},children:[e.jsx(n,{variant:"subtitle1",component:"span",children:a}),s===l&&e.jsx(N,{fontSize:"small",sx:{transform:c?"rotate(180deg)":"none",transition:"all 0.2s ease"}})]})})},l))})]})},J=()=>{const{searchParams:t}=m(),[r,o]=y.useState(null),c=p=>o(p.currentTarget),s=()=>o(null);return e.jsxs(e.Fragment,{children:[e.jsx(v,{title:"換一個主題",arrow:!0,children:e.jsxs(n,{variant:"h6",component:"h2",sx:{color:"text.secondary","&:hover":{cursor:"pointer",textDecoration:"underline",color:"text.primary"}},onClick:c,children:["#",t.get("topic")??"全部"]})}),e.jsx(I,{type:"query",open:!!r,anchorEl:r,onClose:s,onSelect:s})]})},K=["title","createdAt","updatedAt","commentCount","viewCount","likeCount"],Q=t=>K.includes(t),V=()=>{const{searchParams:t}=m(),r=t.get("topic")??void 0,o=t.get("orderBy")??"title",c=t.get("orderDesc")==="true",{data:s,isLoading:p,isFetchingNextPage:h,hasNextPage:a,fetchNextPage:l}=W({topic:r,orderBy:Q(o)?o:"createdAt",order:c?"desc":"asc"});return p||!s?e.jsx(x,{sx:{alignItems:"stretch",mb:1.5},children:[...Array(3)].map((j,d)=>e.jsx(g,{},d))}):s.pages[0].posts.length===0?e.jsxs(i,{sx:{py:6,display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(P,{sx:{fontSize:"6rem",color:"action.disabled"}}),e.jsx(n,{variant:"body1",component:"p",sx:{color:"text.secondary",textAlign:"center"},children:"沒有符合條件的貼文"})]}):e.jsxs(x,{sx:{alignItems:"stretch",mb:1.5},children:[s.pages.map(j=>j.posts.map(d=>e.jsx(H,{postId:d},d))),h&&e.jsx(x,{sx:{alignItems:"stretch",mt:1.5},children:[...Array(3)].map((j,d)=>e.jsx(g,{},d))}),a?h?e.jsx(n,{sx:{color:"text.secondary",textAlign:"center",mt:3},children:"載入中..."}):e.jsxs(i,{sx:{display:"flex",justifyContent:"center",alignItems:"center",mt:3,gap:1},children:[e.jsx(n,{sx:{color:"text.secondary"},children:"滾動以載入更多，或點擊"}),e.jsx(b,{onClick:()=>l(),children:"載入更多"})]}):e.jsx(n,{sx:{color:"text.secondary",textAlign:"center",mt:3},children:"已經到底了"})]})},X=()=>{const{searchParams:t}=m(),r=t.get("topic")??void 0,{data:o}=O({topic:r});return o?e.jsxs(n,{variant:"body2",component:"span",sx:{color:"text.secondary"},children:["共 ",o," 篇"]}):e.jsx(U,{variant:"rounded",animation:"wave",children:e.jsx(n,{variant:"body2",component:"span",sx:{color:"text.secondary"},children:"共 0 篇"})})},Y=()=>{const{searchParams:t}=m(),r=t.get("topic")??"全部";return e.jsx("title",{children:`論壇樣板 | 貼文 #${r}`})};function Z(){const{isMd:t,isSm:r}=T();return e.jsxs(D,{children:[e.jsx(Y,{}),e.jsx(w,{}),e.jsxs(k,{children:[t?e.jsx(R,{}):e.jsx(E,{}),e.jsx(q,{maxWidth:"lg",sx:{position:"relative",my:10,px:0},children:e.jsxs(A,{sx:{py:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:[e.jsxs(i,{sx:{display:"flex",gap:1,alignItems:"center",pr:{xs:3,md:5},pl:2},children:[r&&e.jsx(x,{sx:{alignItems:"flex-start",flex:1},children:e.jsx(b,{href:F.forum_home,startIcon:e.jsx(B,{}),variant:"outlined",sx:{textWrap:"nowrap"},children:t?"返回首頁":"首頁"})}),e.jsxs(i,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(C,{className:"mode-light",sx:{fontSize:48,mr:1,bgcolor:"primary.main",borderRadius:1,color:"background.default",p:1,opacity:.8}}),e.jsx(n,{variant:"h5",component:"h2",children:"貼文列表"}),e.jsx(J,{})]}),e.jsx(x,{sx:{alignItems:"flex-end",flex:1},children:e.jsx(X,{})})]}),e.jsx(f,{sx:{mt:2}}),e.jsxs(i,{sx:{position:"relative",px:{xs:1,sm:2,md:5}},children:[e.jsx(i,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),e.jsx(G,{})]}),e.jsx(f,{}),e.jsx(V,{})]})}),e.jsx(z,{})]})]})}S.createRoot(document.getElementById("root")).render(e.jsx(y.StrictMode,{children:e.jsx(Z,{})}));
