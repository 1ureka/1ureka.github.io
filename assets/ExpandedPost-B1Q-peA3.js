import{j as e,B as s,n as i,i as n,S as p,z as b,q as h}from"./routes-C-BkZgtt.js";import{C as j}from"./CommentRounded-CG_IBl8V.js";import{L as w,T as y,V as u,P as I,a as C,S as k,c as z,b as m}from"./PostHeader-CdGFhS8L.js";import{f as B,F}from"./AttachFileRounded-DgnORxk3.js";import{a as W}from"./post-D3SAkd4W.js";import{S as a}from"./Skeleton-GnPJ5GGB.js";import{C as o}from"./Chip-B_B3n0JL.js";import{D as l}from"./SearchRounded-DZA1yzSm.js";import{T as d}from"./Tooltip-Bnxvlrw1.js";const P=()=>e.jsxs(e.Fragment,{children:[e.jsxs(s,{sx:{p:1.5,cursor:"pointer","&:hover":{bgcolor:"action.hover"}},children:[e.jsx(w,{}),e.jsx(a,{variant:"rounded",animation:"wave",children:e.jsx(i,{variant:"h6",component:"h3",sx:{textAlign:"start"},children:"正在載入標題..."})}),e.jsx(a,{variant:"text",sx:{width:.8},animation:"wave"}),e.jsx(a,{variant:"text",sx:{width:.7},animation:"wave"}),e.jsx(a,{variant:"text",sx:{width:.2},animation:"wave"}),e.jsx(s,{sx:{display:"flex",gap:1.5,mt:2},children:new Array(3).fill(null).map((c,t)=>e.jsx(a,{variant:"rounded",animation:"wave",children:e.jsx(o,{label:"loading...",size:"small"})},t))})]}),e.jsx(l,{flexItem:!0}),e.jsxs(s,{sx:{p:1.5,py:1,display:"flex",gap:1.5,alignItems:"center",position:"relative",color:"text.secondary",flexWrap:"wrap"},children:[e.jsx(s,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),e.jsx(n,{color:"inherit",startIcon:e.jsx(y,{}),size:"small",loading:!0,children:e.jsx(i,{variant:"caption",component:"span",children:"100 個讚"})}),e.jsx(n,{color:"inherit",startIcon:e.jsx(j,{}),size:"small",loading:!0,children:e.jsx(i,{variant:"caption",component:"span",children:"100 則回覆"})}),e.jsx(s,{sx:{flex:1}}),e.jsx(n,{color:"inherit",startIcon:e.jsx(u,{}),size:"small",loading:!0,children:e.jsx(i,{variant:"caption",component:"span",children:"1000 次瀏覽"})})]}),e.jsx(l,{flexItem:!0})]}),_=({postId:c})=>{const{data:t,isFetching:f}=W({postId:c});if(f||!t)return e.jsx(P,{});const v=()=>{window.location.href=`${h.forum_post}?postId=${t.id}`};return e.jsxs(e.Fragment,{children:[e.jsxs(s,{sx:{p:1.5,cursor:"pointer","&:hover":{bgcolor:"action.hover"}},onClick:v,children:[e.jsx(I,{post:t}),e.jsxs(p,{sx:{gap:1.5,flexDirection:{xs:"column",md:"row"},justifyContent:"space-between",mb:2},children:[e.jsxs(s,{sx:{flex:1},children:[e.jsx(i,{variant:"h6",component:"h3",sx:{textAlign:"start",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:t.title}),e.jsx(i,{variant:"body2",component:"p",sx:{color:"text.secondary",textAlign:"start",display:"-webkit-box",WebkitLineClamp:4,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"pre-line"},children:t.content})]}),t.photos&&t.photos.length>0&&e.jsxs(s,{sx:{flex:.5,display:"flex",gap:1,mt:1,flexWrap:"wrap",justifyContent:{xs:"flex-start",md:"flex-end"}},children:[t.photos.slice(0,3).map(({name:r,url:x},g)=>e.jsx(d,{title:"查看圖片",arrow:!0,placement:"top",children:e.jsx(b,{sx:{position:"relative",width:100,height:100,bgcolor:"divider",borderRadius:1,overflow:"hidden"},children:e.jsx(s,{sx:{position:"absolute",inset:"auto 0 0 0",pb:1,display:"grid",placeItems:"center"},children:e.jsx(s,{sx:{maxWidth:90},children:e.jsx(o,{label:r,size:"small"})})})})},`${x}${g}`)),t.photos.length>3&&e.jsx(d,{title:"查看更多圖片",arrow:!0,placement:"top",children:e.jsxs(n,{color:"inherit",sx:{position:"relative",width:100,height:100,bgcolor:"divider",borderRadius:1},children:["+",t.photos.length-3]})})]})]}),e.jsxs(p,{sx:{gap:1.5,flexDirection:{xs:"column",md:"row"},justifyContent:"space-between",alignItems:{xs:"flex-start",md:"flex-end"},mt:1},children:[e.jsx(s,{sx:{display:"flex",gap:1.5,flexWrap:"wrap"},children:e.jsx(C,{post:t,displayCount:5})}),t.attachments&&t.attachments.length>0&&e.jsxs(s,{sx:{display:"flex",gap:1,flexWrap:"wrap",justifyContent:{xs:"flex-start",md:"flex-end"}},children:[t.attachments.slice(0,3).map((r,x)=>e.jsx(d,{title:"下載附件",arrow:!0,placement:"top",children:e.jsx(o,{label:`${r.name} (${(r.size/1024).toFixed(1)}KB)`,clickable:!0,icon:e.jsx(B,{})})},x)),t.attachments.length>3&&e.jsx(o,{label:`+${t.attachments.length-3}`,variant:"outlined",clickable:!0})]})]})]}),e.jsx(l,{flexItem:!0}),e.jsxs(s,{sx:{p:1.5,py:1,display:"flex",gap:1.5,alignItems:"center",position:"relative",color:"text.secondary",flexWrap:"wrap"},children:[e.jsx(s,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),t.isSelf?e.jsx(k,{post:t}):e.jsxs(e.Fragment,{children:[e.jsx(z,{postId:t.id,likeCount:t.likeCount}),e.jsx(F,{postId:t.id})]}),e.jsx(n,{color:"inherit",startIcon:e.jsx(j,{}),size:"small",href:`${h.forum_post}?postId=${t.id}`,children:e.jsxs(i,{variant:"caption",component:"span",children:[t.commentCount," 則回覆"]})}),e.jsx(s,{sx:{flex:1}}),t.isFromFollowing&&e.jsx(o,{size:"small",label:"來自追蹤者",variant:"outlined",icon:e.jsx(m,{})}),t.isSelf&&e.jsx(o,{size:"small",label:"我的貼文",variant:"outlined",icon:e.jsx(m,{})}),e.jsx(n,{startIcon:e.jsx(u,{}),disabled:!0,size:"small",sx:{"button&.Mui-disabled":{color:"text.secondary",opacity:.8}},children:e.jsxs(i,{variant:"caption",component:"span",children:[t.viewCount," 次瀏覽"]})})]}),e.jsx(l,{flexItem:!0})]})};export{P as E,_ as a};
