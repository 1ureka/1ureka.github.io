import{o as F,j as s,T as t,q as l,y as x,B as o,A as k,P as c,z as P,r as R}from"./routes-Crf9tycC.js";import{u as S,a as B,A as _,S as z}from"./ScrollArea-B3DFcJyt.js";import{A as D,a as L,L as T,T as W,V as v,P as $,b as M,c as O,d as E,e as H,f as N,g as U}from"./PostHeader-Drgz7VMf.js";import{N as V}from"./NewPost-D2nvDEMn.js";import{u as g,a as b,b as q,C as f,c as G}from"./CommentRounded-D4aTN9tY.js";import{S as p}from"./DarkModeRounded-DrGacEM6.js";import{D as d}from"./Divider-BLaT7GpB.js";import{S as m}from"./Skeleton-DIHwTmsH.js";import{C as u}from"./Chip-8KLuaQx8.js";import"./forum-BONQ0wXt.js";import"./ForumRounded-DecewDtG.js";import"./useQuery-CIQlhpKo.js";import"./ExpandMoreRounded-CGEXZoVD.js";import"./useMutation-laxjeK80.js";import"./OpenInNewRounded-CAy333s4.js";import"./NotificationsRounded-Cp2RNbN_.js";import"./TopicAutocomplete-B-g0sES7.js";import"./Autocomplete-B8ONkqi9.js";import"./EmojiMenu-BV0md6lq.js";import"./with-selector-DQrlekJR.js";const h=F(s.jsx("path",{d:"M16.01 11H5c-.55 0-1 .45-1 1s.45 1 1 1h11.01v1.79c0 .45.54.67.85.35l2.78-2.79c.19-.2.19-.51 0-.71l-2.78-2.79c-.31-.32-.85-.09-.85.35z"})),y=()=>s.jsxs(s.Fragment,{children:[s.jsx(m,{variant:"rounded",animation:"wave",children:s.jsx(t,{variant:"subtitle1",component:"h3",children:"正在載入..."})}),s.jsx(m,{variant:"rounded",animation:"wave",children:s.jsx(t,{variant:"body2",component:"p",sx:{color:"text.secondary",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"正在載入內容中. . ."})}),s.jsx(l,{endIcon:s.jsx(h,{}),sx:{width:"fit-content"},loading:!0,children:"查看更多"})]}),J=({postId:r})=>{const{data:e,isFetching:n}=b({postId:r});return n||!e?s.jsx(y,{}):s.jsxs(s.Fragment,{children:[s.jsx(t,{variant:"subtitle1",component:"h3",children:e.title}),s.jsx(t,{variant:"body2",component:"p",sx:{color:"text.secondary",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.content}),s.jsx(l,{endIcon:s.jsx(h,{}),sx:{width:"fit-content"},href:`${x.forum_post}?postId=${e.id}`,children:"查看更多"})]})},w=({length:r})=>{const{data:e,isFetching:n}=g({limit:r,order:"desc",orderBy:"viewCount"});return s.jsxs(s.Fragment,{children:[s.jsx(t,{variant:"h6",component:"h2",sx:{mb:1.5},children:"本週熱門討論 🔥"}),n||!e?[...Array(r)].map((a,i)=>s.jsxs(p,{sx:{gap:.5,my:i<2?1:0},children:[s.jsx(y,{}),i<2&&s.jsx(d,{})]},i)):e.map((a,i)=>s.jsxs(p,{sx:{gap:.5,my:i<2?1:0},children:[s.jsx(J,{postId:a}),i<2&&s.jsx(d,{})]},a))]})},K=()=>s.jsx(u,{label:s.jsx(k,{size:"1rem",sx:{mx:2,color:"divider"}})}),I=({length:r})=>{const{data:e,isFetching:n}=q(),a=e?e.slice(0,r):null;return s.jsxs(s.Fragment,{children:[s.jsx(t,{variant:"h6",component:"h2",children:"你可能會喜歡"}),s.jsx(o,{sx:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:1,mt:1},children:n||!a?[...Array(r)].map((i,j)=>s.jsx(K,{},j)):a.map(i=>s.jsx(u,{label:i,clickable:!0,component:"a",href:`${x.forum_posts}?topic=${i}`},i))}),s.jsx(l,{sx:{mt:1},endIcon:s.jsx(h,{}),href:x.forum_posts,children:"更多主題"})]})},A=({length:r})=>{const{data:e,isFetching:n}=S({limit:r,orderBy:"followerCount",order:"desc"}),a=e?e.pages[0]?e.pages[0].users:[]:[];return s.jsxs(s.Fragment,{children:[s.jsx(t,{variant:"h6",component:"h2",sx:{mb:1.5},children:"推薦追蹤"}),s.jsx(o,{sx:{display:"grid",gridTemplateColumns:"auto 1fr auto",alignItems:"center",gap:2},children:n||!a?[...Array(r)].map((i,j)=>s.jsx(D,{},j)):a.map(i=>s.jsx(L,{...i},i.id))})]})},Q=()=>s.jsxs(s.Fragment,{children:[s.jsx(c,{sx:{p:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:s.jsx(w,{length:3})}),s.jsx(c,{sx:{p:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:s.jsx(I,{length:5})}),s.jsx(c,{sx:{p:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:s.jsx(A,{length:5})})]}),X=()=>s.jsxs(c,{sx:{borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:[s.jsx(o,{sx:{p:3},children:s.jsx(w,{length:3})}),s.jsx(d,{}),s.jsxs(o,{sx:{p:3,position:"relative"},children:[s.jsx(o,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),s.jsx(I,{length:5})]}),s.jsx(d,{}),s.jsx(o,{sx:{p:3},children:s.jsx(A,{length:5})})]}),C=()=>s.jsxs(s.Fragment,{children:[s.jsxs(o,{sx:{p:1.5,cursor:"pointer","&:hover":{bgcolor:"action.hover"}},children:[s.jsx(T,{}),s.jsx(m,{variant:"rounded",animation:"wave",children:s.jsx(t,{variant:"h6",component:"h3",sx:{textAlign:"start"},children:"正在載入標題..."})}),s.jsx(t,{variant:"body2",component:"p",sx:{textAlign:"start",opacity:0},children:"正在載入內容..."}),s.jsx(o,{sx:{display:"flex",gap:1.5,mt:2},children:new Array(3).fill(null).map((r,e)=>s.jsx(m,{variant:"rounded",animation:"wave",children:s.jsx(u,{label:"loading...",size:"small"})},e))})]}),s.jsx(d,{flexItem:!0}),s.jsxs(o,{sx:{p:1.5,py:1,display:"flex",gap:1.5,alignItems:"center",position:"relative",color:"text.secondary"},children:[s.jsx(o,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),s.jsx(l,{color:"inherit",startIcon:s.jsx(W,{}),size:"small",loading:!0,children:s.jsx(t,{variant:"caption",component:"span",children:"100 個讚"})}),s.jsx(l,{color:"inherit",startIcon:s.jsx(f,{}),size:"small",loading:!0,children:s.jsx(t,{variant:"caption",component:"span",children:"100 則回覆"})}),s.jsx(l,{color:"inherit",startIcon:s.jsx(v,{}),size:"small",loading:!0,children:s.jsx(t,{variant:"caption",component:"span",children:"1000 次瀏覽"})})]}),s.jsx(d,{flexItem:!0})]}),Y=({postId:r})=>{const{data:e,isFetching:n}=b({postId:r});if(n||!e)return s.jsx(C,{});const a=()=>{window.location.href=`${x.forum_post}?postId=${e.id}`};return s.jsxs(s.Fragment,{children:[s.jsxs(o,{sx:{p:1.5,cursor:"pointer","&:hover":{bgcolor:"action.hover"}},onClick:a,children:[s.jsx($,{post:e}),s.jsx(t,{variant:"h6",component:"h3",sx:{textAlign:"start",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:e.title}),s.jsx(t,{variant:"body2",component:"p",sx:{color:"text.secondary",textAlign:"start",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"pre-line"},children:e.content}),s.jsx(o,{sx:{display:"flex",gap:1.5,mt:2},children:s.jsx(M,{post:e,displayCount:3})})]}),s.jsx(d,{flexItem:!0}),s.jsxs(o,{sx:{p:1.5,py:1,display:"flex",gap:1.5,alignItems:"center",position:"relative",color:"text.secondary"},children:[s.jsx(o,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),s.jsx(O,{postId:e.id,likeCount:e.likeCount}),s.jsx(l,{color:"inherit",startIcon:s.jsx(f,{}),size:"small",href:`${x.forum_post}?postId=${e.id}`,children:s.jsxs(t,{variant:"caption",component:"span",children:[e.commentCount," 則回覆"]})}),s.jsx(l,{startIcon:s.jsx(v,{}),disabled:!0,size:"small",sx:{"button&.Mui-disabled":{color:"text.secondary",opacity:.8}},children:s.jsxs(t,{variant:"caption",component:"span",children:[e.viewCount," 次瀏覽"]})})]}),s.jsx(d,{flexItem:!0})]})},Z=()=>{const{data:r,isFetching:e}=g({limit:5,orderBy:"createdAt",order:"desc"});return e||!r?s.jsx(p,{sx:{alignItems:"stretch",mb:1.5},children:[...Array(5)].map((n,a)=>s.jsx(C,{},a))}):s.jsx(p,{sx:{alignItems:"stretch",mb:1.5},children:r.map(n=>s.jsx(Y,{postId:n},n))})};function ss(){const{isMd:r}=B();return s.jsxs(_,{children:[s.jsx(E,{}),s.jsxs(z,{children:[r?s.jsx(H,{}):s.jsx(N,{}),s.jsxs(G,{maxWidth:!1,sx:{position:"relative",my:10,display:"flex",gap:4,maxWidth:1400,flexDirection:{xs:"column-reverse",md:"row"},px:0},children:[s.jsx(o,{sx:{flex:1},children:s.jsxs(c,{sx:{py:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:[s.jsx(V,{}),s.jsx(d,{}),s.jsx(Z,{}),s.jsx(o,{sx:{mx:1.5},children:s.jsx(l,{variant:"outlined",color:"primary",fullWidth:!0,href:x.forum_posts,endIcon:s.jsx(h,{}),children:"查看更多"})})]})}),s.jsx(p,{sx:{gap:{xs:1,md:4},maxWidth:{xs:1,md:400},width:{xs:1,md:"30vw"}},children:r?s.jsx(Q,{}):s.jsx(X,{})})]}),s.jsx(U,{})]})]})}P.createRoot(document.getElementById("root")).render(s.jsx(R.StrictMode,{children:s.jsx(ss,{})}));
