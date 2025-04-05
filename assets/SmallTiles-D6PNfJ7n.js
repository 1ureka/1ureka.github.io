import{o as u,j as s,B as l,aU as S,T as I}from"./routes-Crf9tycC.js";import{O as w}from"./OpenInNewRounded-CAy333s4.js";import{a as x,b as t,c as T,f,T as b}from"./formatters-BgGhOzMi.js";import{l as y,m as z,t as m,u as h,s as v}from"./datahub_home-Co6NVMOf.js";import{b as C,c as H,u as W}from"./read-BIBzOakl.js";import{S as o}from"./DarkModeRounded-DrGacEM6.js";import{D as j}from"./Divider-BLaT7GpB.js";import{S as R}from"./Skeleton-DIHwTmsH.js";import"./useMutation-laxjeK80.js";import"./forum-BONQ0wXt.js";import"./DataExplorationRounded-TTczTo4g.js";import"./NotificationsRounded-Cp2RNbN_.js";import"./ExpandMoreRounded-CGEXZoVD.js";import"./useQuery-CIQlhpKo.js";import"./dayjs.min-DBRfvL7M.js";const F=u([s.jsx("path",{d:"M4 7v13h13c.55 0 1 .45 1 1s-.45 1-1 1H4c-1.1 0-2-.9-2-2V7c0-.55.45-1 1-1s1 .45 1 1"},"0"),s.jsx("path",{d:"M6 4v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2m9 7h5v5h-5zm-7 0h5v5H8zm0-7h12v5H8z"},"1")]),k=u(s.jsx("path",{d:"M15.59 3.59c-.38-.38-.89-.59-1.42-.59H5c-1.1 0-1.99.9-1.99 2L3 19c0 1.1.89 2 1.99 2H19c1.1 0 2-.9 2-2V9.83c0-.53-.21-1.04-.59-1.41zM8 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m0-4c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1m6 0V4.5l5.5 5.5H15c-.55 0-1-.45-1-1"})),M=u(s.jsx("path",{d:"M10.5 13h-1c-.83 0-1.5-.67-1.5-1.5S8.67 10 9.5 10h1V9c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5v1h1c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5h-1v1c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5zm.8-10.74-6 2.25C4.52 4.81 4 5.55 4 6.39v4.7c0 5.05 3.41 9.76 8 10.91 4.59-1.15 8-5.86 8-10.91v-4.7c0-.83-.52-1.58-1.3-1.87l-6-2.25c-.45-.18-.95-.18-1.4-.01"})),p={display:"flex",alignItems:"center",gap:z},c=({children:e,...r})=>s.jsx(R,{variant:"rounded",animation:"wave",...r,children:e}),O=()=>{const{data:e,isFetching:r}=C(),{data:n,isFetching:a}=H({types:["table","view"]});return s.jsxs(l,{sx:{display:"flex",gap:v},children:[s.jsxs(o,{sx:{alignItems:"flex-start"},children:[s.jsx(x,{children:"資料庫大小"}),e===void 0||r?s.jsx(c,{children:s.jsx(t,{sx:{textWrap:"nowrap"},children:"載入中"})}):s.jsx(t,{sx:{textWrap:"nowrap"},children:T(e)})]}),s.jsx(j,{flexItem:!0,orientation:"vertical"}),s.jsxs(o,{sx:{alignItems:"flex-start"},children:[s.jsx(x,{children:"資料表總數"}),n===void 0||a?s.jsx(c,{children:s.jsx(t,{children:"載入中"})}):s.jsx(t,{sx:{textWrap:"nowrap"},children:n.filter(({type:i})=>i==="table").length})]}),s.jsx(j,{flexItem:!0,orientation:"vertical"}),s.jsxs(o,{sx:{alignItems:"flex-start"},children:[s.jsx(x,{children:"檢視表總數"}),n===void 0||a?s.jsx(c,{children:s.jsx(t,{children:"載入中"})}):s.jsx(t,{sx:{textWrap:"nowrap"},children:n.filter(({type:i})=>i==="view").length})]})]})},V=()=>{const{data:e,isFetching:r}=W({types:["table","view"]}),n=e?Object.values(e).reduce((i,d)=>i+d,0):0,a=e?S(e).reduce((i,[d,g])=>g>i[1]?[d,g]:i):["",0];return s.jsxs(l,{sx:{display:"flex",gap:v},children:[s.jsxs(o,{sx:{alignItems:"flex-start"},children:[s.jsx(x,{children:"總紀錄數"}),e===void 0||r?s.jsx(c,{children:s.jsx(t,{sx:{textWrap:"nowrap"},children:"載入中"})}):s.jsx(t,{sx:{textWrap:"nowrap"},children:f(n)})]}),s.jsx(j,{flexItem:!0,orientation:"vertical"}),s.jsxs(o,{sx:{alignItems:"flex-start"},children:[s.jsx(x,{children:"最多紀錄的資料表"}),e===void 0||r?s.jsx(c,{children:s.jsx(t,{sx:h,children:"載入中"})}):s.jsx(b,{title:s.jsxs(I,{children:[a[0]," 有 ",f(a[1])," 筆紀錄"]}),children:s.jsx(t,{sx:h,children:a[0]})})]})]})},Z=()=>s.jsxs(l,{sx:{position:"relative",display:"grid",gap:y,gridTemplateColumns:{xs:"repeat(6, 1fr)",lg:"repeat(3, 1fr)"}},children:[s.jsxs(l,{sx:{gridColumn:{xs:"span 4",lg:"auto"},...p},children:[s.jsx(F,{sx:m}),s.jsx(O,{})]}),s.jsxs(l,{sx:{gridColumn:{xs:"1 / span 4",lg:"auto"},...p},children:[s.jsx(k,{sx:m}),s.jsx(V,{})]}),s.jsxs(l,{sx:{gridRow:{xs:"1",lg:"auto"},gridColumn:{xs:"5 / span 2",lg:"auto"},...p},children:[s.jsx(M,{sx:m}),s.jsxs(o,{sx:{alignItems:"flex-start"},children:[s.jsx(x,{children:"潛在問題"}),s.jsxs(t,{sx:{textWrap:"nowrap",color:"warning.main",display:"inline-block",...h},children:["2",s.jsx(w,{fontSize:"small",sx:{verticalAlign:"middle",ml:.5}})]})]})]})]});export{Z as SmallTiles};
