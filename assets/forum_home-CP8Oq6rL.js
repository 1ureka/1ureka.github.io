import{h as g,j as s,T as o,S as p,B as t,t as k,P as c,q as P,r as S}from"./Toast-CQU7HRxP.js";import{u as R,a as B,A as z,S as _}from"./ScrollArea-bXVFt1-o.js";import{A as D,a as L,b as T,c as W,d as M,e as $}from"./url-d6RWfuGc.js";import{B as l,r as x}from"./routes-CbqUgxKc.js";import{N as O}from"./NewPost-DuCeajdc.js";import{u as v,a as f,b as E,C as H}from"./post-DqTxsVj6.js";import{D as d}from"./Divider-BVbYJDzj.js";import{S as m}from"./Skeleton-BJlzAjuB.js";import{C as h}from"./Chip-D_kpsi0I.js";import{C as b}from"./CommentRounded-Dt1_l1yi.js";import{L as N,T as U,V as y,P as V,a as q,S as G,b as J}from"./PostHeader-p6a6Q3na.js";import"./react-error-boundary.esm-r1noas7X.js";import"./ForumRounded-CuQuEyof.js";import"./SQLiteClient-CAkP0qTy.js";import"./ExpandMoreRounded-f5NKdB9D.js";import"./Tooltip-B2u5Anbs.js";import"./DarkModeRounded-Ch8L_na1.js";import"./OpenInNewRounded-Dg5lu0UK.js";import"./MenuItem-DmDsFyHS.js";import"./NotificationsRounded-BessYIZ7.js";import"./ListItemText-bZtqOhoY.js";import"./useMutation-Dm1cpFjH.js";import"./Collapse-fiT4VskB.js";import"./Motion-BUsNN59t.js";import"./proxy-BjpRcbyX.js";import"./AddRounded-hnXTMAld.js";import"./TopicAutocomplete-CKy4fDme.js";import"./Autocomplete-DDSK7rHF.js";import"./EmojiMenu-BUaZAOQL.js";import"./formatters-C9bWSe0O.js";import"./with-selector-CVzttz-H.js";const j=g(s.jsx("path",{d:"M16.01 11H5c-.55 0-1 .45-1 1s.45 1 1 1h11.01v1.79c0 .45.54.67.85.35l2.78-2.79c.19-.2.19-.51 0-.71l-2.78-2.79c-.31-.32-.85-.09-.85.35z"})),w=()=>s.jsxs(s.Fragment,{children:[s.jsx(m,{variant:"rounded",animation:"wave",children:s.jsx(o,{variant:"subtitle1",component:"h3",children:"正在載入..."})}),s.jsx(m,{variant:"rounded",animation:"wave",children:s.jsx(o,{variant:"body2",component:"p",sx:{color:"text.secondary",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:"正在載入內容中. . ."})}),s.jsx(l,{endIcon:s.jsx(j,{}),sx:{width:"fit-content"},loading:!0,children:"查看更多"})]}),K=({postId:r})=>{const{data:e,isFetching:n}=f({postId:r});return n||!e?s.jsx(w,{}):s.jsxs(s.Fragment,{children:[s.jsx(o,{variant:"subtitle1",component:"h3",children:e.title}),s.jsx(o,{variant:"body2",component:"p",sx:{color:"text.secondary",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},children:e.content}),s.jsx(l,{endIcon:s.jsx(j,{}),sx:{width:"fit-content"},href:`${x.forum_post}?postId=${e.id}`,children:"查看更多"})]})},I=({length:r})=>{const{data:e,isFetching:n}=v({limit:r,order:"desc",orderBy:"viewCount"});return s.jsxs(s.Fragment,{children:[s.jsx(o,{variant:"h6",component:"h2",sx:{mb:1.5},children:"本週熱門討論 🔥"}),n||!e?[...Array(r)].map((a,i)=>s.jsxs(p,{sx:{gap:.5,my:i<2?1:0},children:[s.jsx(w,{}),i<2&&s.jsx(d,{})]},i)):e.map((a,i)=>s.jsxs(p,{sx:{gap:.5,my:i<2?1:0},children:[s.jsx(K,{postId:a}),i<2&&s.jsx(d,{})]},a))]})},Q=()=>s.jsx(h,{label:s.jsx(k,{size:"1rem",sx:{mx:2,color:"divider"}})}),C=({length:r})=>{const{data:e,isFetching:n}=E(),a=e?e.slice(0,r):null;return s.jsxs(s.Fragment,{children:[s.jsx(o,{variant:"h6",component:"h2",children:"你可能會喜歡"}),s.jsx(t,{sx:{display:"flex",flexWrap:"wrap",alignItems:"center",gap:1,mt:1},children:n||!a?[...Array(r)].map((i,u)=>s.jsx(Q,{},u)):a.map(i=>s.jsx(h,{label:i,clickable:!0,component:"a",href:`${x.forum_posts}?topic=${i}`},i))}),s.jsx(l,{sx:{mt:1},endIcon:s.jsx(j,{}),href:x.forum_posts,children:"更多主題"})]})},A=({length:r})=>{const{data:e,isFetching:n}=R({limit:r,orderBy:"followerCount",order:"desc",isUnfollowed:!0}),a=e?e.pages[0]?e.pages[0].users:[]:[];return s.jsxs(s.Fragment,{children:[s.jsx(o,{variant:"h6",component:"h2",sx:{mb:1.5},children:"推薦追蹤"}),s.jsx(t,{sx:{display:"grid",gridTemplateColumns:"auto 1fr auto",alignItems:"center",gap:2},children:n||!a?[...Array(r)].map((i,u)=>s.jsx(D,{},u)):a.map(i=>s.jsx(L,{...i},i.id))})]})},X=()=>s.jsxs(s.Fragment,{children:[s.jsx(c,{sx:{p:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:s.jsx(I,{length:3})}),s.jsx(c,{sx:{p:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:s.jsx(C,{length:5})}),s.jsx(c,{sx:{p:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:s.jsx(A,{length:5})})]}),Y=()=>s.jsxs(c,{sx:{borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:[s.jsx(t,{sx:{p:3},children:s.jsx(I,{length:3})}),s.jsx(d,{}),s.jsxs(t,{sx:{p:3,position:"relative"},children:[s.jsx(t,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),s.jsx(C,{length:5})]}),s.jsx(d,{}),s.jsx(t,{sx:{p:3},children:s.jsx(A,{length:5})})]}),Z=g(s.jsx("path",{d:"M12 2c-4.2 0-8 3.22-8 8.2 0 3.18 2.45 6.92 7.34 11.22.36.32.97.32 1.33 0C17.55 17.12 20 13.38 20 10.2 20 5.22 16.2 2 12 2M7.69 12.49C8.88 11.56 10.37 11 12 11s3.12.56 4.31 1.49C15.45 13.98 13.85 15 12 15s-3.45-1.02-4.31-2.51M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2"})),F=()=>s.jsxs(s.Fragment,{children:[s.jsxs(t,{sx:{p:1.5,cursor:"pointer","&:hover":{bgcolor:"action.hover"}},children:[s.jsx(N,{}),s.jsx(m,{variant:"rounded",animation:"wave",children:s.jsx(o,{variant:"h6",component:"h3",sx:{textAlign:"start"},children:"正在載入標題..."})}),s.jsx(o,{variant:"body2",component:"p",sx:{textAlign:"start",opacity:0},children:"正在載入內容..."}),s.jsx(t,{sx:{display:"flex",gap:1.5,mt:2},children:new Array(3).fill(null).map((r,e)=>s.jsx(m,{variant:"rounded",animation:"wave",children:s.jsx(h,{label:"loading...",size:"small"})},e))})]}),s.jsx(d,{flexItem:!0}),s.jsxs(t,{sx:{p:1.5,py:1,display:"flex",gap:1.5,alignItems:"center",position:"relative",color:"text.secondary"},children:[s.jsx(t,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),s.jsx(l,{color:"inherit",startIcon:s.jsx(U,{}),size:"small",loading:!0,children:s.jsx(o,{variant:"caption",component:"span",children:"100 個讚"})}),s.jsx(l,{color:"inherit",startIcon:s.jsx(b,{}),size:"small",loading:!0,children:s.jsx(o,{variant:"caption",component:"span",children:"100 則回覆"})}),s.jsx(l,{color:"inherit",startIcon:s.jsx(y,{}),size:"small",loading:!0,children:s.jsx(o,{variant:"caption",component:"span",children:"1000 次瀏覽"})})]}),s.jsx(d,{flexItem:!0})]}),ss=({postId:r})=>{const{data:e,isFetching:n}=f({postId:r});if(n||!e)return s.jsx(F,{});const a=()=>{window.location.href=`${x.forum_post}?postId=${e.id}`};return s.jsxs(s.Fragment,{children:[s.jsxs(t,{sx:{p:1.5,cursor:"pointer","&:hover":{bgcolor:"action.hover"}},onClick:a,children:[s.jsx(V,{post:e}),s.jsx(o,{variant:"h6",component:"h3",sx:{textAlign:"start",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:e.title}),s.jsx(o,{variant:"body2",component:"p",sx:{color:"text.secondary",textAlign:"start",display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"pre-line"},children:e.content}),s.jsxs(t,{sx:{display:"flex",gap:1.5,mt:2,alignItems:"center"},children:[s.jsx(q,{post:e,displayCount:3}),e.isFromFollowing&&s.jsxs(s.Fragment,{children:[s.jsx(t,{sx:{flex:1}}),s.jsx(h,{size:"small",label:"來自追蹤者",variant:"outlined",icon:s.jsx(Z,{})})]})]})]}),s.jsx(d,{flexItem:!0}),s.jsxs(t,{sx:{p:1.5,py:1,display:"flex",gap:1.5,alignItems:"center",position:"relative",color:"text.secondary"},children:[s.jsx(t,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),e.isSelf?s.jsx(G,{post:e}):s.jsx(J,{postId:e.id,likeCount:e.likeCount}),s.jsx(l,{color:"inherit",startIcon:s.jsx(b,{}),size:"small",href:`${x.forum_post}?postId=${e.id}`,children:s.jsxs(o,{variant:"caption",component:"span",children:[e.commentCount," 則回覆"]})}),s.jsx(l,{startIcon:s.jsx(y,{}),disabled:!0,size:"small",sx:{"button&.Mui-disabled":{color:"text.secondary",opacity:.8}},children:s.jsxs(o,{variant:"caption",component:"span",children:[e.viewCount," 次瀏覽"]})})]}),s.jsx(d,{flexItem:!0})]})},es=()=>{const{data:r,isFetching:e}=v({limit:5,orderBy:"createdAt",order:"desc",prioritizeFollowers:!0});return e||!r?s.jsx(p,{sx:{alignItems:"stretch",mb:1.5},children:[...Array(5)].map((n,a)=>s.jsx(F,{},a))}):s.jsx(p,{sx:{alignItems:"stretch",mb:1.5},children:r.map(n=>s.jsx(ss,{postId:n},n))})};function rs(){const{isMd:r}=B();return s.jsxs(z,{children:[s.jsx(T,{}),s.jsxs(_,{children:[r?s.jsx(W,{}):s.jsx(M,{}),s.jsxs(H,{maxWidth:!1,sx:{position:"relative",my:10,display:"flex",gap:4,maxWidth:1400,flexDirection:{xs:"column-reverse",md:"row"},px:0},children:[s.jsx(t,{sx:{flex:1},children:s.jsxs(c,{sx:{py:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:[s.jsx(O,{}),s.jsx(d,{}),s.jsx(es,{}),s.jsx(t,{sx:{mx:1.5},children:s.jsx(l,{variant:"outlined",color:"primary",fullWidth:!0,href:x.forum_posts,endIcon:s.jsx(j,{}),children:"查看更多"})})]})}),s.jsx(p,{sx:{gap:{xs:1,md:4},maxWidth:{xs:1,md:400},width:{xs:1,md:"30vw"}},children:r?s.jsx(X,{}):s.jsx(Y,{})})]}),s.jsx($,{})]})]})}P.createRoot(document.getElementById("root")).render(s.jsx(S.StrictMode,{children:s.jsx(rs,{})}));
