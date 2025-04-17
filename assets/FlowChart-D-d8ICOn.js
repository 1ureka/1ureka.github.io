import{a as L,g as D,r as a,aQ as U,u as q,j as t,s as G,c as Z,b as P,d as K,y as Q,m as J,F as x,e as X,h as f,l as Y,B as v,w as _,T as E,n as ee}from"./routes-DSS9LKLr.js";import{B as te}from"./Motion-CvsZx3N4.js";import{R as se,d as ae}from"./main-CegN3VAg.js";import{u as oe,a as le,b as ne,c as re,i as ie,M as ce,T as de,B as pe,g as ue,P as ge,R as xe}from"./style-DRZZNKOB.js";import{T as h}from"./Tooltip-4_5Bwrwa.js";import{D as ve}from"./ExpandMoreRounded-He5Ma60b.js";import"./proxy-3iHDZR4I.js";import"./RefreshRounded-Cbc-M9dA.js";import"./SQLiteClient-CAvm5Amv.js";import"./DataExplorationRounded-BB4c2e-V.js";import"./ArrowDropDownRounded-C-bqklcR.js";import"./NotificationsRounded-D6OdW2xh.js";import"./MenuItem-DAsKIElH.js";import"./DarkModeRounded-Dwbm1YBu.js";import"./useMutation-52fvlAR0.js";import"./DownloadRounded-COxy94Ud.js";import"./dayjs.min-DumrRsId.js";import"./DatasetRounded-j-QIoIvE.js";import"./with-selector-DgkZje48.js";function ye(e){return D("MuiToggleButton",e)}const I=L("MuiToggleButton",["root","disabled","selected","standard","primary","secondary","sizeSmall","sizeMedium","sizeLarge","fullWidth"]),be=a.createContext({}),fe=a.createContext(void 0);function Ce(e,s){return s===void 0||e===void 0?!1:Array.isArray(s)?s.includes(e):e===s}const me=e=>{const{classes:s,fullWidth:o,selected:r,disabled:n,size:c,color:i}=e,p={root:["root",r&&"selected",n&&"disabled",o&&"fullWidth",`size${P(c)}`,i]};return K(p,ye,s)},he=G(Q,{name:"MuiToggleButton",slot:"Root",overridesResolver:(e,s)=>{const{ownerState:o}=e;return[s.root,s[`size${P(o.size)}`]]}})(J(({theme:e})=>({...e.typography.button,borderRadius:(e.vars||e).shape.borderRadius,padding:11,border:`1px solid ${(e.vars||e).palette.divider}`,color:(e.vars||e).palette.action.active,[`&.${I.disabled}`]:{color:(e.vars||e).palette.action.disabled,border:`1px solid ${(e.vars||e).palette.action.disabledBackground}`},"&:hover":{textDecoration:"none",backgroundColor:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.hoverOpacity})`:x(e.palette.text.primary,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[{props:{color:"standard"},style:{[`&.${I.selected}`]:{color:(e.vars||e).palette.text.primary,backgroundColor:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.selectedOpacity})`:x(e.palette.text.primary,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:x(e.palette.text.primary,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.text.primaryChannel} / ${e.vars.palette.action.selectedOpacity})`:x(e.palette.text.primary,e.palette.action.selectedOpacity)}}}}},...Object.entries(e.palette).filter(X()).map(([s])=>({props:{color:s},style:{[`&.${I.selected}`]:{color:(e.vars||e).palette[s].main,backgroundColor:e.vars?`rgba(${e.vars.palette[s].mainChannel} / ${e.vars.palette.action.selectedOpacity})`:x(e.palette[s].main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[s].mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:x(e.palette[s].main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette[s].mainChannel} / ${e.vars.palette.action.selectedOpacity})`:x(e.palette[s].main,e.palette.action.selectedOpacity)}}}}})),{props:{fullWidth:!0},style:{width:"100%"}},{props:{size:"small"},style:{padding:7,fontSize:e.typography.pxToRem(13)}},{props:{size:"large"},style:{padding:15,fontSize:e.typography.pxToRem(15)}}]}))),j=a.forwardRef(function(s,o){const{value:r,...n}=a.useContext(be),c=a.useContext(fe),i=U({...n,selected:Ce(s.value,r)},s),p=q({props:i,name:"MuiToggleButton"}),{children:u,className:C,color:k="standard",disabled:y=!1,disableFocusRipple:S=!1,fullWidth:b=!1,onChange:g,onClick:z,selected:B,size:T="medium",value:m,...$}=p,R={...p,color:k,disabled:y,disableFocusRipple:S,fullWidth:b,size:T},w=me(R),M=d=>{z&&(z(d,m),d.defaultPrevented)||g&&g(d,m)},l=c||"";return t.jsx(he,{className:Z(n.className,w.root,C,l),disabled:y,focusRipple:!S,ref:o,onClick:M,onChange:g,value:m,ownerState:R,"aria-pressed":B,...$,children:u})}),je=f(t.jsx("path",{d:"M21 8.59V4c0-.55-.45-1-1-1h-4.59c-.89 0-1.34 1.08-.71 1.71l1.59 1.59-10 10-1.59-1.59c-.62-.63-1.7-.19-1.7.7V20c0 .55.45 1 1 1h4.59c.89 0 1.34-1.08.71-1.71L7.71 17.7l10-10 1.59 1.59c.62.63 1.7.19 1.7-.7"})),ke=f(t.jsx("path",{d:"M21.29 4.12 16.7 8.71l1.59 1.59c.63.63.18 1.71-.71 1.71H13c-.55 0-1-.45-1-1v-4.6c0-.89 1.08-1.34 1.71-.71l1.59 1.59 4.59-4.59c.39-.39 1.02-.39 1.41 0 .38.4.38 1.03-.01 1.42M4.12 21.29l4.59-4.59 1.59 1.59c.63.63 1.71.18 1.71-.71V13c0-.55-.45-1-1-1h-4.6c-.89 0-1.34 1.08-.71 1.71l1.59 1.59-4.59 4.59c-.39.39-.39 1.02 0 1.41.4.38 1.03.38 1.42-.01"})),Se=f(t.jsx("path",{d:"M20 10h-7.01V8.21c0-.45-.54-.67-.85-.35l-2.78 2.79c-.19.2-.19.51 0 .71l2.78 2.79c.31.32.85.09.85-.35V12H20v5H4V5h16v2c0 .55.45 1 1 1s1-.45 1-1V5c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h4v1c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-1h4c1.1 0 2-.9 2-2v-5c0-1.1-.9-2-2-2"})),ze=f(t.jsx("path",{d:"M3 22c-.55 0-1-.45-1-1V3c0-.55.45-1 1-1s1 .45 1 1v18c0 .55-.45 1-1 1M20.5 7h-13C6.67 7 6 7.67 6 8.5S6.67 10 7.5 10h13c.83 0 1.5-.67 1.5-1.5S21.33 7 20.5 7m-6 7h-7c-.83 0-1.5.67-1.5 1.5S6.67 17 7.5 17h7c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5"})),Re=f(t.jsx("path",{d:"M22 3c0 .55-.45 1-1 1H3c-.55 0-1-.45-1-1s.45-1 1-1h18c.55 0 1 .45 1 1M8.5 22c.83 0 1.5-.67 1.5-1.5v-13C10 6.67 9.33 6 8.5 6S7 6.67 7 7.5v13c0 .83.67 1.5 1.5 1.5m7-6c.83 0 1.5-.67 1.5-1.5v-7c0-.83-.67-1.5-1.5-1.5S14 6.67 14 7.5v7c0 .83.67 1.5 1.5 1.5"})),Be=f(t.jsx("path",{d:"M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4m-8 7c-.55 0-1 .45-1 1v3c0 1.1.9 2 2 2h3c.55 0 1-.45 1-1s-.45-1-1-1H6c-.55 0-1-.45-1-1v-2c0-.55-.45-1-1-1m1-9c0-.55.45-1 1-1h2c.55 0 1-.45 1-1s-.45-1-1-1H5c-1.1 0-2 .9-2 2v3c0 .55.45 1 1 1s1-.45 1-1zm14-3h-3c-.55 0-1 .45-1 1s.45 1 1 1h2c.55 0 1 .45 1 1v2c0 .55.45 1 1 1s1-.45 1-1V5c0-1.1-.9-2-2-2m0 15c0 .55-.45 1-1 1h-2c-.55 0-1 .45-1 1s.45 1 1 1h3c1.1 0 2-.9 2-2v-3c0-.55-.45-1-1-1s-1 .45-1 1z"})),Te=({alignDirection:e,selectedNodes:s,onAlign:o,onResetAlign:r,onResetView:n,onFocus:c})=>t.jsx(ge,{position:"top-left",children:t.jsxs(v,{sx:{display:"flex",gap:1,alignItems:"center",borderRadius:1,bgcolor:"background.paper",p:1,px:2,outline:1,outlineColor:"divider",userSelect:"none"},children:[t.jsx(v,{sx:{position:"absolute",inset:0,pointerEvents:"none",borderRadius:1,boxShadow:2,opacity:.35}}),t.jsxs(v,{sx:{display:"flex",gap:1,alignItems:"center"},children:[t.jsx(E,{variant:"subtitle1",color:"text.secondary",children:"布局"}),t.jsx(h,{title:"水平排列",arrow:!0,children:t.jsx(j,{size:"small",value:"horizontal",selected:e==="horizontal",onClick:()=>o("horizontal"),children:t.jsx(ze,{fontSize:"small"})})}),t.jsx(h,{title:"垂直排列",arrow:!0,children:t.jsx(j,{size:"small",value:"vertical",selected:e==="vertical",onClick:()=>o("vertical"),children:t.jsx(Re,{fontSize:"small"})})}),t.jsx(h,{title:"重新排版",arrow:!0,children:t.jsx(j,{size:"small",value:"none",onClick:r,children:t.jsx(se,{fontSize:"small"})})})]}),t.jsx(ve,{orientation:"vertical",flexItem:!0}),t.jsxs(v,{sx:{display:"flex",gap:1,alignItems:"center"},children:[t.jsx(E,{variant:"subtitle1",color:"text.secondary",children:"視圖"}),t.jsx(h,{title:"重設視圖",arrow:!0,children:t.jsx(j,{size:"small",value:"reset",onClick:n,children:t.jsx(Se,{fontSize:"small"})})}),t.jsx(h,{title:"聚焦至選取元素",arrow:!0,children:t.jsx("span",{children:t.jsx(j,{size:"small",value:"select",onClick:c,disabled:s.length===0,children:t.jsx(Be,{fontSize:"small"})})})})]})]})}),$e={tableNode:de};function we({nodes:e,edges:s,isFetching:o}){const{mode:r}=Y(),{fitView:n}=oe(),[c,i]=a.useState(e),[p,u]=a.useState(s),[C,k]=a.useState([]),[y,S]=a.useState("horizontal"),[b,g]=a.useState(!1);a.useEffect(()=>{if(b)return;let l,d=0;const O=F=>{if(F-d<200){l=requestAnimationFrame(O);return}if(d=F,!c.every(V=>{var A,N;return((A=V.measured)==null?void 0:A.width)&&((N=V.measured)==null?void 0:N.height)})){l=requestAnimationFrame(O);return}const{nodes:H,edges:W}=ue(c,p,y);i(H),u(W),g(!0)};return l=requestAnimationFrame(O),()=>cancelAnimationFrame(l)},[c,p,b,y,n]),a.useEffect(()=>{o||(i(e),u(s),g(!1))},[e,s,o]);const z=a.useCallback(l=>i(d=>le(l,d)),[i]),B=a.useCallback(l=>u(d=>ne(l,d)),[u]),T=a.useCallback(l=>u(d=>re(l,d)),[u]),m=a.useCallback(({nodes:l})=>k(l),[k]),$=a.useCallback(l=>{S(l),g(!1)},[]),R=a.useCallback(()=>g(!1),[]),w=a.useCallback(()=>n({padding:.2,duration:375}),[n]),M=a.useCallback(()=>n({padding:.2,duration:375,nodes:C}),[n,C]);return t.jsxs(t.Fragment,{children:[t.jsx(v,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",bgcolor:"action.hover"},children:t.jsx(_,{})}),t.jsxs(ie,{nodes:c,nodeTypes:$e,edges:p,onConnect:T,onNodesChange:z,onEdgesChange:B,onSelectionChange:m,deleteKeyCode:null,colorMode:r,minZoom:.7,maxZoom:1.5,defaultViewport:{x:100,y:100,zoom:.9},defaultEdgeOptions:{type:"smoothstep",animated:!0,selectable:!1,style:{strokeWidth:2,stroke:"#b1b1b7"},markerEnd:{type:ce.Arrow,width:20,height:20}},style:{position:"relative",opacity:!b||o?0:1,transition:!b||o?void 0:"opacity 0.5s ease",background:"var(--mui-palette-background-paper)"},children:[t.jsx(pe,{bgColor:"var(--mui-palette-action-hover)"}),t.jsx(Te,{alignDirection:y,selectedNodes:C,onAlign:$,onResetAlign:R,onResetView:w,onFocus:M})]})]})}const Me=a.memo(we),Ye=()=>{const{nodes:e,edges:s,isFetching:o}=ae(),[r,n]=a.useState(!1),c=a.useMemo(()=>e.map(i=>({id:i.tableName,type:"tableNode",data:i,position:{x:0,y:0}})),[e]);return t.jsxs(te,{sx:{position:r?"fixed":"relative",flex:1,inset:r?0:void 0,zIndex:r?"snackbar":void 0},layout:"position",children:[t.jsx(v,{sx:{position:"absolute",inset:0,bgcolor:"background.paper"},children:t.jsx(xe,{children:t.jsx(Me,{isFetching:o,nodes:c,edges:s})})}),t.jsx(v,{sx:{position:"absolute",inset:"0 0 auto auto",color:"text.secondary",display:"flex",gap:1,alignItems:"center",borderRadius:1,bgcolor:"background.paper",p:1,px:2,outline:1,outlineColor:"divider",userSelect:"none",m:"15px"},children:t.jsx(ee,{color:"inherit",sx:{py:.2},endIcon:r?t.jsx(ke,{}):t.jsx(je,{}),loading:o,onClick:()=>n(i=>!i),children:r?"退出全螢幕":"全螢幕"})})]})};export{Ye as default};
