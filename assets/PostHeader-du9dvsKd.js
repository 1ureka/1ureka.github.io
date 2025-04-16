import{h,j as e,n as l,T as o,r as g,B as c,y as b,i as y,aj as C}from"./Toast-DFhmycbX.js";import{j as k,E as I,U as M}from"./AttachFileRounded-D87Q7oyR.js";import{T as f}from"./Tooltip-DBfet0F0.js";import{r as x}from"./routes-J5yqRWDh.js";import{C as p}from"./Chip-iQCJKZd0.js";import{k as T}from"./post-ACurZod_.js";import{f as j}from"./formatters-C9bWSe0O.js";import{S as m}from"./Skeleton-6aagTK1R.js";const D=h(e.jsx("path",{d:"M12 4C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4m0 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5m0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3"})),A=h(e.jsx("path",{d:"M13.12 2.06 7.58 7.6c-.37.37-.58.88-.58 1.41V19c0 1.1.9 2 2 2h9c.8 0 1.52-.48 1.84-1.21l3.26-7.61C23.94 10.2 22.49 8 20.34 8h-5.65l.95-4.58c.1-.5-.05-1.01-.41-1.37-.59-.58-1.53-.58-2.11.01M3 21c1.1 0 2-.9 2-2v-8c0-1.1-.9-2-2-2s-2 .9-2 2v8c0 1.1.9 2 2 2"})),H=h(e.jsx("path",{d:"M12 2c-4.2 0-8 3.22-8 8.2 0 3.18 2.45 6.92 7.34 11.22.36.32.97.32 1.33 0C17.55 17.12 20 13.38 20 10.2 20 5.22 16.2 2 12 2M7.69 12.49C8.88 11.56 10.37 11 12 11s3.12.56 4.31 1.49C15.45 13.98 13.85 15 12 15s-3.45-1.02-4.31-2.51M12 6c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2"})),N=({postId:t,likeCount:s})=>{const{liked:r,likeCount:a,handleLike:n,disabled:i}=k(t);return e.jsx(f,{title:r?"取消喜歡":"喜歡",arrow:!0,placement:"left",children:e.jsx("span",{children:e.jsx(l,{startIcon:e.jsx(A,{}),size:"small",color:r?"primary":"inherit",onClick:n,disabled:i,children:e.jsxs(o,{variant:"caption",component:"span",children:[a??s," 個讚"]})})})})},U=({post:t,displayCount:s=3})=>{const{tags:r,id:a}=t;return e.jsxs(e.Fragment,{children:[r.map((n,i)=>i<s&&e.jsx(p,{label:n,clickable:!0,size:"small",component:"a",href:`${x.forum_posts}?topic=${n}`},n)),r.length>s&&e.jsx(p,{label:`+${r.length-s}`,clickable:!0,size:"small",variant:"outlined",component:"a",href:`${x.forum_post}?postId=${a}`})]})},S=h(e.jsx("path",{d:"M16 16h2c.55 0 1 .45 1 1s-.45 1-1 1h-2c-.55 0-1-.45-1-1s.45-1 1-1m0-8h5c.55 0 1 .45 1 1s-.45 1-1 1h-5c-.55 0-1-.45-1-1s.45-1 1-1m0 4h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1s.45-1 1-1M3 18c0 1.1.9 2 2 2h6c1.1 0 2-.9 2-2V8H3zM13 5h-2l-.71-.71c-.18-.18-.44-.29-.7-.29H6.41c-.26 0-.52.11-.7.29L5 5H3c-.55 0-1 .45-1 1s.45 1 1 1h10c.55 0 1-.45 1-1s-.45-1-1-1"})),V=({post:t})=>{const[s,r]=g.useState(null),a=d=>r(d.currentTarget),n=()=>r(null),{mutateAsync:i,isPending:u}=T(),v=async()=>{const d=await i(t.id);if(d===null){window.location.reload();return}console.error("刪除貼文失敗"+d.error),n()};return e.jsxs(c,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(l,{size:"small",startIcon:e.jsx(I,{}),href:`${x.forum_edit}?postId=${t.id}`,children:"編輯貼文"}),e.jsx(l,{size:"small",color:"error",startIcon:e.jsx(S,{}),onClick:a,children:"刪除貼文"}),e.jsx(b,{open:!!s,anchorEl:s,onClose:n,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},elevation:6,children:e.jsxs(c,{sx:{p:2,maxWidth:300},children:[e.jsx(o,{variant:"subtitle1",sx:{mb:1},children:"確認刪除貼文"}),e.jsx(o,{variant:"body2",sx:{mb:2,color:"text.secondary"},children:"確認刪除貼文後，將無法復原，請謹慎操作。"}),e.jsxs(c,{sx:{display:"flex",justifyContent:"flex-end",gap:1},children:[e.jsx(l,{variant:"outlined",size:"small",onClick:n,color:"inherit",loading:u,children:"取消"}),e.jsx(l,{variant:"contained",color:"error",size:"small",onClick:v,loading:u,disableElevation:!0,children:"確認刪除"})]})]})})]})},_=({post:t,sx:s,...r})=>{const a=y(i=>i.breakpoints.up("md")),n=Math.abs(t.updatedAt.getTime()-t.createdAt.getTime())>1e3;return e.jsxs(c,{sx:{display:"flex",gap:1.5,mb:2,alignItems:"center",...s},...r,children:[e.jsx(M,{name:t.userName}),e.jsxs(o,{variant:"subtitle1",component:"a",href:`${x.forum_users}?user=${t.userName}`,sx:{color:"text.secondary",textDecoration:"none","&:hover":{textDecoration:"underline",color:"text.primary"}},children:["by ",t.userName]}),e.jsx(c,{sx:{flex:1}}),n?e.jsx(f,{title:`上次編輯於 ${t.updatedAt.toLocaleString()}`,arrow:!0,children:e.jsxs(o,{variant:"body2",sx:{color:"text.secondary",opacity:.9,...C},children:[a?t.createdAt.toLocaleString():j(t.createdAt)," (已編輯)"]})}):e.jsx(o,{variant:"body2",sx:{color:"text.secondary",opacity:.9},children:a?t.createdAt.toLocaleString():j(t.createdAt)})]})},O=({sx:t,...s})=>e.jsxs(c,{sx:{display:"flex",gap:1.5,mb:2,alignItems:"center",...t},...s,children:[e.jsx(m,{variant:"circular",sx:{width:"2rem",height:"2rem"},animation:"wave"}),e.jsx(m,{variant:"rounded",animation:"wave",children:e.jsx(o,{variant:"subtitle1",children:"by loading..."})}),e.jsx(c,{sx:{flex:1}}),e.jsx(m,{variant:"rounded",animation:"wave",children:e.jsx(o,{variant:"body2",children:"0000-00-00 00:00"})})]});export{O as L,_ as P,V as S,A as T,D as V,U as a,H as b,N as c};
