import{j as e,B as l,T as n,S as m,n as y,h as D,i as F,r as g,P as R,t as k,v as L}from"./routes-DSS9LKLr.js";import{S as W,u as $,A as B}from"./SentimentDissatisfiedRounded-C4Aanmqm.js";import{e as p,u as E,t as S,f as A,a as z,A as N,S as _}from"./ScrollArea-DW48nQoO.js";import{A as j,a as f,u as M,h as T,b as O,c as Q,d as V,P as q,i as G,e as H}from"./AttachFileRounded-_dckUoQS.js";import{S as x}from"./Skeleton-DNNkVTV4.js";import{E as v,a as J}from"./ExpandedPost-D9BIjrcC.js";import{D as h}from"./ExpandMoreRounded-He5Ma60b.js";import{N as K}from"./NewPost-B8mw4fMH.js";import{i as X,j as Y,C as Z}from"./post-FMo2HOjY.js";import{P as w}from"./TopicPicker-DC5pLZy3.js";import{D as ee}from"./NotificationsRounded-D6OdW2xh.js";import{a as se,D as re}from"./DialogContent-5SCe7So5.js";import"./RefreshRounded-Cbc-M9dA.js";import"./ForumRounded-C42-tg7b.js";import"./ErrorOutlineRounded-Cn_6pIwV.js";import"./SQLiteClient-CAvm5Amv.js";import"./Tooltip-4_5Bwrwa.js";import"./DarkModeRounded-Dwbm1YBu.js";import"./OpenInNewRounded-CW-4eeXH.js";import"./index-mSkvzYyn.js";import"./MenuItem-DAsKIElH.js";import"./MoreHorizRounded-DRlJ7Kcx.js";import"./formatters-C9bWSe0O.js";import"./Chip-CZDJKnuP.js";import"./useMutation-52fvlAR0.js";import"./CommentRounded-uQ0cbAHs.js";import"./PostHeader-D_ySs6FH.js";import"./Motion-CvsZx3N4.js";import"./proxy-3iHDZR4I.js";import"./array-BnKUIoLK.js";import"./PublishRounded-DF6G-VuS.js";import"./EmojiMenu-D8xHWhGt.js";import"./with-selector-DgkZje48.js";import"./fuse-SvuQAZ8A.js";const te=()=>{const r=new URLSearchParams(window.location.search),{data:s}=p(r.get("user"));return s?e.jsx("title",{children:`論壇樣板 | ${s.name}`}):r.get("user")&&!s?e.jsx("title",{children:`論壇樣板 | ${r.get("user")}`}):null},ne=()=>{const r=new URLSearchParams(window.location.search),{data:s,isFetching:t}=p(r.get("user"));return t||!s?e.jsxs(l,{sx:{m:2},children:[r.get("user")?e.jsx(n,{variant:"h5",component:"h2",children:r.get("user")}):e.jsx(x,{variant:"rounded",animation:"wave",children:e.jsx(n,{variant:"h5",component:"h2",children:"使用者名稱"})}),e.jsx(x,{variant:"text",animation:"wave",children:e.jsx(n,{variant:"body2",children:"佔位符佔位符佔位符佔位符佔位符佔位符佔位符"})})]}):e.jsxs(l,{sx:{m:2},children:[e.jsx(n,{variant:"h5",component:"h2",children:s.name}),e.jsx(n,{variant:"body2",color:"text.secondary",children:s.description||"這個使用者很懶，什麼都沒寫"})]})},oe=({length:r})=>{const{data:s,isFetching:t}=E({limit:r,orderBy:"postCount",order:"desc",isUnfollowed:!0}),i=s&&s.pages[0]?s.pages[0].users:null;return e.jsx(l,{sx:{position:"relative",display:"grid",gridTemplateColumns:{xs:"auto 1fr auto",md:"auto 1fr auto auto 1fr auto"},alignItems:"center",gap:2,p:2,"& > *:nth-of-type(6n - 3)":{"&::after":{content:'""',position:"absolute",display:{xs:"none",md:"block"},inset:0,pointerEvents:"none",borderRight:"1px solid",borderColor:"divider",mr:-1,my:-2.1}}},children:t||!i?[...Array(r)].map((o,a)=>e.jsx(j,{},a)):i.map(o=>e.jsx(f,{...o},o.id))})},ie=()=>e.jsxs(e.Fragment,{children:[e.jsxs(l,{sx:{py:6,display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[e.jsx(W,{sx:{fontSize:"6rem",color:"action.disabled"}}),e.jsx(n,{variant:"body1",component:"p",sx:{color:"text.secondary",textAlign:"center"},children:"使用者不存在或已被刪除"})]}),e.jsx(h,{}),e.jsxs(l,{sx:{position:"relative"},children:[e.jsx(l,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35,pointerEvents:"none"}}),e.jsx(n,{variant:"subtitle1",sx:{p:2},children:"我們找不到這位使用者...這裡有其他活躍的使用者供你參考！"})]}),e.jsx(h,{}),e.jsx(oe,{length:6})]}),ae=({userId:r})=>{const{data:s,isLoading:t,isFetchingNextPage:i,hasNextPage:o,fetchNextPage:a}=Y({userId:r,orderBy:"createdAt",order:"desc"});return t||!s?e.jsx(m,{sx:{alignItems:"stretch"},children:[...Array(3)].map((c,d)=>e.jsx(v,{},d))}):s.pages[0].posts.length===0?e.jsx(n,{sx:{textAlign:"center",mt:9,mb:6,color:"text.secondary"},children:"他/她還沒有發布過任何文章"}):e.jsxs(m,{sx:{alignItems:"stretch"},children:[s.pages.map(c=>c.posts.map(d=>e.jsx(J,{postId:d},d))),i&&e.jsx(m,{sx:{alignItems:"stretch",mt:1.5},children:[...Array(3)].map((c,d)=>e.jsx(v,{},d))}),o?i?e.jsx(n,{sx:{color:"text.secondary",textAlign:"center",mt:3},children:"載入中..."}):e.jsxs(l,{sx:{display:"flex",justifyContent:"center",alignItems:"center",mt:3,gap:1},children:[e.jsx(n,{sx:{color:"text.secondary"},children:"滾動以載入更多，或點擊"}),e.jsx(y,{onClick:()=>a(),children:"載入更多"})]}):e.jsx(n,{sx:{color:"text.secondary",textAlign:"center",mt:3},children:"已經到底了"})]})},le=()=>{const r=new URLSearchParams(window.location.search),{data:s,isFetching:t}=p(r.get("user")),{user:i}=X();return!t&&s===null?e.jsx(ie,{}):t||!s?e.jsx(m,{sx:{alignItems:"stretch"},children:[...Array(3)].map((o,a)=>e.jsx(v,{},a))}):e.jsxs(e.Fragment,{children:[i&&i.name===s.name&&e.jsxs(e.Fragment,{children:[e.jsx(m,{sx:{p:1}}),e.jsx(K,{}),e.jsx(h,{})]}),e.jsx(ae,{userId:s.id})]})},P=D(e.jsx("path",{d:"M6 20c1.1 0 2-.9 2-2v-7c0-1.1-.9-2-2-2s-2 .9-2 2v7c0 1.1.9 2 2 2m10-5v3c0 1.1.9 2 2 2s2-.9 2-2v-3c0-1.1-.9-2-2-2s-2 .9-2 2m-4 5c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2s-2 .9-2 2v12c0 1.1.9 2 2 2"})),I=()=>{const r=F(S.breakpoints.up("md"));return e.jsxs(e.Fragment,{children:[e.jsx(P,{fontSize:"small",color:"inherit"}),e.jsx(x,{variant:"rounded",animation:"wave",children:e.jsx(n,{variant:"body2",children:r?"發布了 0 篇文章":"0 篇文章"})}),e.jsx(n,{variant:"body2",children:"·"}),e.jsx(x,{variant:"rounded",animation:"wave",children:e.jsx(n,{variant:"body2",children:r?"獲得了 0 次讚":"0 次讚"})}),e.jsx(n,{variant:"body2",children:"·"}),e.jsx(x,{variant:"rounded",animation:"wave",children:e.jsx(n,{variant:"body2",children:r?"文章總瀏覽次數 0 次":"0 次瀏覽"})})]})},ce=({user:r})=>{const s=F(S.breakpoints.up("md")),{data:t,isFetching:i}=A(r.id);if(t===void 0||i)return e.jsx(I,{});const{postCount:o,likeCount:a,viewCount:c}=t;return e.jsxs(e.Fragment,{children:[e.jsx(P,{fontSize:"small",color:"inherit"}),e.jsx(n,{variant:"body2",children:s?`發布了 ${o} 篇文章`:`${o} 篇文章`}),e.jsx(n,{variant:"body2",children:"·"}),e.jsx(n,{variant:"body2",children:s?`獲得了 ${a} 次讚`:`${a} 次讚`}),e.jsx(n,{variant:"body2",children:"·"}),e.jsx(n,{variant:"body2",children:s?`文章總瀏覽次數 ${c} 次`:`${c} 次瀏覽`})]})},de=()=>{const r=new URLSearchParams(window.location.search),{data:s,isFetching:t}=p(r.get("user"));return t||s===void 0||s===null?e.jsx(I,{}):e.jsx(ce,{user:s})},xe=({userId:r,counts:s})=>{const{data:t,isFetching:i}=M({userId:r});return i||t===void 0||t===null?e.jsx(e.Fragment,{children:[...Array(s)].map((o,a)=>e.jsx(j,{},a))}):e.jsx(e.Fragment,{children:t.map(o=>e.jsx(f,{...o},o.id))})},pe=({userId:r,counts:s})=>{const{data:t,isFetching:i}=T({userId:r});return i||t===void 0||t===null?e.jsx(e.Fragment,{children:[...Array(s)].map((o,a)=>e.jsx(j,{},a))}):e.jsx(e.Fragment,{children:t.map(o=>e.jsx(f,{...o},o.id))})},b=({open:r,onClose:s,type:t,counts:i})=>{const{searchParams:o}=$(),a=o.get("user"),{data:c,isFetching:d}=p(a);return e.jsxs(ee,{open:r,onClose:s,maxWidth:"sm",fullWidth:!0,children:[e.jsxs(l,{sx:{display:"flex",gap:1,alignItems:"center",p:2,bgcolor:"action.hover"},children:[e.jsx(w,{className:"mode-light",sx:{fontSize:36,mr:1,bgcolor:"primary.main",borderRadius:1,color:"background.default",p:1}}),e.jsx(n,{variant:"h6",component:"h2",sx:{color:"text.primary"},children:t==="followers"?"追蹤者":"正在追蹤"})]}),e.jsx(se,{children:e.jsx(l,{sx:{display:"grid",gridTemplateColumns:"auto 1fr auto",alignItems:"center",gap:2},children:d||(c==null?void 0:c.id)===void 0?e.jsx(e.Fragment,{children:[...Array(i)].map((u,U)=>e.jsx(j,{},U))}):t==="followers"?e.jsx(xe,{userId:c.id,counts:i}):e.jsx(pe,{userId:c.id,counts:i})})}),e.jsx(re,{children:e.jsx(y,{onClick:s,children:"關閉"})})]})},C=()=>e.jsxs(e.Fragment,{children:[e.jsx(w,{fontSize:"small",color:"inherit"}),e.jsx(x,{variant:"rounded",animation:"wave",children:e.jsx(n,{variant:"body2",children:"0 位追蹤者"})}),e.jsx(n,{variant:"body2",children:"·"}),e.jsx(x,{variant:"rounded",animation:"wave",children:e.jsx(n,{variant:"body2",children:"正在追蹤 0 人"})})]}),me=({user:r})=>{const[s,t]=g.useState(!1),[i,o]=g.useState(!1),{data:a,isFetching:c}=A(r.id);if(a===void 0||c)return e.jsx(C,{});const{followerCount:d,followingCount:u}=a;return e.jsxs(e.Fragment,{children:[e.jsx(w,{fontSize:"small",color:"inherit"}),e.jsx(n,{variant:"body2",sx:{"&:hover":{textDecoration:"underline",cursor:"pointer",color:"text.primary"}},onClick:()=>t(!0),children:`${d} 位追蹤者`}),e.jsx(n,{variant:"body2",children:"·"}),e.jsx(n,{variant:"body2",sx:{"&:hover":{textDecoration:"underline",cursor:"pointer",color:"text.primary"}},onClick:()=>o(!0),children:`正在追蹤 ${u} 人`}),e.jsx(b,{open:s,onClose:()=>t(!1),type:"followers",counts:d}),e.jsx(b,{open:i,onClose:()=>o(!1),type:"following",counts:u})]})},he=()=>{const r=new URLSearchParams(window.location.search),{data:s,isFetching:t}=p(r.get("user"));return t||s===void 0||s===null?e.jsx(C,{}):e.jsx(me,{user:s})};function je(){const{isMd:r}=z();return e.jsxs(N,{children:[e.jsx(te,{}),e.jsx(O,{}),e.jsxs(_,{children:[r?e.jsx(Q,{}):e.jsx(V,{}),e.jsx(Z,{maxWidth:"lg",sx:{position:"relative",my:10,px:0},children:e.jsxs(R,{sx:{pb:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:[e.jsxs(l,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center",px:3,flexWrap:"wrap"},children:[e.jsxs(l,{sx:{display:"flex",alignItems:"center"},children:[e.jsx(q,{}),e.jsx(ne,{})]}),e.jsx(l,{sx:{m:2},children:e.jsx(G,{})})]}),e.jsx(h,{}),e.jsxs(l,{sx:{position:"relative",display:"flex",justifyContent:"space-between",gap:3,alignItems:"center",px:3,py:2,flexWrap:"wrap"},children:[e.jsx(l,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35,pointerEvents:"none"}}),e.jsxs(l,{sx:{display:"flex",gap:1,alignItems:"center",color:"text.secondary"},children:[e.jsx(y,{variant:"outlined",startIcon:e.jsx(B,{}),size:"small",sx:{mr:1},href:k.forum_home,children:r?"返回首頁":"首頁"}),e.jsx(de,{})]}),e.jsx(l,{sx:{display:"flex",gap:1,alignItems:"center",color:"text.secondary"},children:e.jsx(he,{})})]}),e.jsx(h,{}),e.jsx(l,{children:e.jsx(le,{})})]})}),e.jsx(H,{})]})]})}L.createRoot(document.getElementById("root")).render(e.jsx(g.StrictMode,{children:e.jsx(je,{})}));
