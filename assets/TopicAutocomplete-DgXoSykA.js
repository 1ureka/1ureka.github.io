import{o as x,j as s,ac as y,t as h,B as f,A as g}from"./routes-CadzfG2E.js";import{b as j}from"./post-CLX4ZffY.js";import{u as A}from"./url-DTt2Bjh-.js";import{A as S}from"./Autocomplete-dwNSJda9.js";const C=x(s.jsx("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5"})),P=e=>(n,t)=>{if(t===null||!t.trim())return console.error("請輸入標籤名稱");if(t==="顯示全部")return console.error("該標籤名稱無效");e(t.trim())},l=e=>{const{searchParams:n,updateSearchParams:t}=A(),{data:a,isFetching:o}=j(),{type:r}=e,d=Array.from(a??[]),u=r==="query"?["顯示全部",...d]:d,m=r==="query"?n.get("topic")??"":"",p=r==="query"?(i,c)=>{c===null||!c.trim()||(e.type==="query"&&e.onSelect(),t(c==="顯示全部"?{topic:null}:{topic:c.trim()}))}:P(e.onAdd);return s.jsxs(s.Fragment,{children:[s.jsx(S,{freeSolo:r==="add",disabled:o,options:u,noOptionsText:"無相符標籤",value:m,onChange:p,renderInput:i=>s.jsx(h,{...i,autoFocus:!0,label:"主題",variant:"standard",size:"small",sx:{minWidth:150}})}),o&&s.jsx(f,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center"},children:s.jsx(g,{size:"1.5rem"})})]})},R=e=>{const{type:n,...t}=e,a=n==="add"?(({onAdd:o,...r})=>r)(t):(({onSelect:o,...r})=>r)(t);return s.jsx(y,{slotProps:{paper:{sx:{borderRadius:3,scale:"0.9"}},list:{disablePadding:!0,dense:!0,component:"div",sx:{p:1,pl:1.5,pt:0}}},...a,children:n==="query"?s.jsx(l,{type:"query",onSelect:e.onSelect}):s.jsx(l,{type:"add",onAdd:e.onAdd})})};export{C as P,R as T};
