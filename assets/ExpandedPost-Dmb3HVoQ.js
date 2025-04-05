import{o as m,j as e,B as s,T as i,q as o,D as b,y as p}from"./routes-BF-Brp0S.js";import{C as j,a as w}from"./CommentRounded-CRIcDY47.js";import{L as y,T as I,V as u,P as C,b as k,h as B,c as W,F as R}from"./PostHeader-B0ccVIt0.js";import{S as n}from"./useQuery-GDYZV5d2.js";import{C as r}from"./Chip-D_FJO1ew.js";import{D as l}from"./OpenInNewRounded-CfpVJteo.js";import{S as h}from"./DarkModeRounded-Bn0R_6pu.js";import{T as c}from"./useMutation-C8meJFDJ.js";const E=m(e.jsx("path",{d:"M16.62 2.99c-.49-.49-1.28-.49-1.77 0L6.54 11.3c-.39.39-.39 1.02 0 1.41l8.31 8.31c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.38 12l7.25-7.25c.48-.48.48-1.28-.01-1.76"})),M=m([e.jsx("circle",{cx:"15.5",cy:"9.5",r:"1.5"},"0"),e.jsx("circle",{cx:"8.5",cy:"9.5",r:"1.5"},"1"),e.jsx("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m0-6c-1.9 0-3.63.97-4.65 2.58-.22.35-.11.81.24 1.03s.81.11 1.03-.24c.74-1.18 2-1.88 3.38-1.88s2.64.7 3.38 1.88c.14.23.39.35.64.35.14 0 .27-.04.4-.11.35-.22.46-.68.24-1.03C15.63 14.96 13.9 14 12 14"},"2")]),S=()=>e.jsxs(e.Fragment,{children:[e.jsxs(s,{sx:{p:1.5,cursor:"pointer","&:hover":{bgcolor:"action.hover"}},children:[e.jsx(y,{}),e.jsx(n,{variant:"rounded",animation:"wave",children:e.jsx(i,{variant:"h6",component:"h3",sx:{textAlign:"start"},children:"正在載入標題..."})}),e.jsx(n,{variant:"text",sx:{width:.8},animation:"wave"}),e.jsx(n,{variant:"text",sx:{width:.7},animation:"wave"}),e.jsx(n,{variant:"text",sx:{width:.2},animation:"wave"}),e.jsx(s,{sx:{display:"flex",gap:1.5,mt:2},children:new Array(3).fill(null).map((d,t)=>e.jsx(n,{variant:"rounded",animation:"wave",children:e.jsx(r,{label:"loading...",size:"small"})},t))})]}),e.jsx(l,{flexItem:!0}),e.jsxs(s,{sx:{p:1.5,py:1,display:"flex",gap:1.5,alignItems:"center",position:"relative",color:"text.secondary",flexWrap:"wrap"},children:[e.jsx(s,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),e.jsx(o,{color:"inherit",startIcon:e.jsx(I,{}),size:"small",loading:!0,children:e.jsx(i,{variant:"caption",component:"span",children:"100 個讚"})}),e.jsx(o,{color:"inherit",startIcon:e.jsx(j,{}),size:"small",loading:!0,children:e.jsx(i,{variant:"caption",component:"span",children:"100 則回覆"})}),e.jsx(s,{sx:{flex:1}}),e.jsx(o,{color:"inherit",startIcon:e.jsx(u,{}),size:"small",loading:!0,children:e.jsx(i,{variant:"caption",component:"span",children:"1000 次瀏覽"})})]}),e.jsx(l,{flexItem:!0})]}),O=({postId:d})=>{const{data:t,isFetching:f}=w({postId:d});if(f||!t)return e.jsx(S,{});const v=()=>{window.location.href=`${p.forum_post}?postId=${t.id}`};return e.jsxs(e.Fragment,{children:[e.jsxs(s,{sx:{p:1.5,cursor:"pointer","&:hover":{bgcolor:"action.hover"}},onClick:v,children:[e.jsx(C,{post:t}),e.jsxs(h,{sx:{gap:1.5,flexDirection:{xs:"column",md:"row"},justifyContent:"space-between",mb:2},children:[e.jsxs(s,{sx:{flex:1},children:[e.jsx(i,{variant:"h6",component:"h3",sx:{textAlign:"start",display:"-webkit-box",WebkitLineClamp:2,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis"},children:t.title}),e.jsx(i,{variant:"body2",component:"p",sx:{color:"text.secondary",textAlign:"start",display:"-webkit-box",WebkitLineClamp:4,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"pre-line"},children:t.content})]}),t.photos&&t.photos.length>0&&e.jsxs(s,{sx:{flex:.5,display:"flex",gap:1,mt:1,flexWrap:"wrap",justifyContent:{xs:"flex-start",md:"flex-end"}},children:[t.photos.slice(0,3).map(({name:a,url:x},g)=>e.jsx(c,{title:"查看圖片",arrow:!0,placement:"top",children:e.jsx(b,{sx:{position:"relative",width:100,height:100,bgcolor:"divider",borderRadius:1,overflow:"hidden"},children:e.jsx(s,{sx:{position:"absolute",inset:"auto 0 0 0",pb:1,display:"grid",placeItems:"center"},children:e.jsx(s,{sx:{maxWidth:90},children:e.jsx(r,{label:a,size:"small"})})})})},`${x}${g}`)),t.photos.length>3&&e.jsx(c,{title:"查看更多圖片",arrow:!0,placement:"top",children:e.jsxs(o,{color:"inherit",sx:{position:"relative",width:100,height:100,bgcolor:"divider",borderRadius:1},children:["+",t.photos.length-3]})})]})]}),e.jsxs(h,{sx:{gap:1.5,flexDirection:{xs:"column",md:"row"},justifyContent:"space-between",alignItems:{xs:"flex-start",md:"flex-end"},mt:1},children:[e.jsx(s,{sx:{display:"flex",gap:1.5,flexWrap:"wrap"},children:e.jsx(k,{post:t,displayCount:5})}),t.attachments&&t.attachments.length>0&&e.jsxs(s,{sx:{display:"flex",gap:1,flexWrap:"wrap",justifyContent:{xs:"flex-start",md:"flex-end"}},children:[t.attachments.slice(0,3).map((a,x)=>e.jsx(c,{title:"下載附件",arrow:!0,placement:"top",children:e.jsx(r,{label:`${a.name} (${(a.size/1024).toFixed(1)}KB)`,clickable:!0,icon:e.jsx(B,{})})},x)),t.attachments.length>3&&e.jsx(r,{label:`+${t.attachments.length-3}`,variant:"outlined",clickable:!0})]})]})]}),e.jsx(l,{flexItem:!0}),e.jsxs(s,{sx:{p:1.5,py:1,display:"flex",gap:1.5,alignItems:"center",position:"relative",color:"text.secondary",flexWrap:"wrap"},children:[e.jsx(s,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35}}),e.jsx(W,{postId:t.id,likeCount:t.likeCount}),e.jsx(R,{postId:t.id}),e.jsx(o,{color:"inherit",startIcon:e.jsx(j,{}),size:"small",href:`${p.forum_post}?postId=${t.id}`,children:e.jsxs(i,{variant:"caption",component:"span",children:[t.commentCount," 則回覆"]})}),e.jsx(s,{sx:{flex:1}}),e.jsx(o,{startIcon:e.jsx(u,{}),disabled:!0,size:"small",sx:{"button&.Mui-disabled":{color:"text.secondary",opacity:.8}},children:e.jsxs(i,{variant:"caption",component:"span",children:[t.viewCount," 次瀏覽"]})})]}),e.jsx(l,{flexItem:!0})]})};export{E as A,S as E,M as S,O as a};
