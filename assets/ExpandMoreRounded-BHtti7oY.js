import{a as I,g as C,r as h,u as S,a0 as A,j as s,aA as P,s as j,c as R,T as z,b as c,d as L,m as M,o as f}from"./routes-n0rROGIf.js";function w(t){return C("MuiInputAdornment",t)}const x=I("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]);var b;const T=(t,n)=>{const{ownerState:e}=t;return[n.root,n[`position${c(e.position)}`],e.disablePointerEvents===!0&&n.disablePointerEvents,n[e.variant]]},$=t=>{const{classes:n,disablePointerEvents:e,hiddenLabel:r,position:o,size:i,variant:l}=t,d={root:["root",e&&"disablePointerEvents",o&&`position${c(o)}`,l,r&&"hiddenLabel",i&&`size${c(i)}`]};return L(d,w,n)},F=j("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:T})(M(({theme:t})=>({display:"flex",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(t.vars||t).palette.action.active,variants:[{props:{variant:"filled"},style:{[`&.${x.positionStart}&:not(.${x.hiddenLabel})`]:{marginTop:16}}},{props:{position:"start"},style:{marginRight:8}},{props:{position:"end"},style:{marginLeft:8}},{props:{disablePointerEvents:!0},style:{pointerEvents:"none"}}]}))),N=h.forwardRef(function(n,e){const r=S({props:n,name:"MuiInputAdornment"}),{children:o,className:i,component:l="div",disablePointerEvents:d=!1,disableTypography:g=!1,position:m,variant:u,...y}=r,a=A()||{};let p=u;u&&a.variant,a&&!p&&(p=a.variant);const v={...r,hiddenLabel:a.hiddenLabel,size:a.size,disablePointerEvents:d,position:m,variant:p},E=$(v);return s.jsx(P.Provider,{value:null,children:s.jsx(F,{as:l,ownerState:v,className:R(E.root,i),ref:e,...y,children:typeof o=="string"&&!g?s.jsx(z,{color:"textSecondary",children:o}):s.jsxs(h.Fragment,{children:[m==="start"?b||(b=s.jsx("span",{className:"notranslate","aria-hidden":!0,children:"​"})):null,o]})})})}),D=f(s.jsx("path",{d:"M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0s.41-1.08 0-1.49zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"})),H=f(s.jsx("path",{d:"M15.88 9.29 12 13.17 8.12 9.29a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0l4.59-4.59c.39-.39.39-1.02 0-1.41-.39-.38-1.03-.39-1.42 0"}));export{H as E,N as I,D as S};
