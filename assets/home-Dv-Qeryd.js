import{g as _,a as F,r as M,u as H,j as e,s as S,c as W,b as l,d as X,m as R,e as I,f as ee,l as re,h as te,i as D,k as w,n as G,o as K,p as C,B as n,T as h,q as oe,t as B,v as j,w as ne,C as ae,x as se,y as U,z as ie}from"./routes-HNxAJ3wC.js";import{F as le}from"./ForumRounded-aPZzzFd5.js";import{D as ce}from"./DataExplorationRounded-DmpL9Syc.js";import{O as de}from"./OpenInNewRounded-BfnWo5b9.js";import{S as $,D as pe,M as m,I as Q}from"./DarkModeRounded-BcFV06RJ.js";import{C as ue}from"./Chip-ClU5wa3A.js";import{B as me}from"./ButtonGroup-C7iE8oMh.js";import{E as k,I as z,S as J}from"./ExpandMoreRounded-B7e8HWqr.js";import{S as Y}from"./SortRounded-Bb4B3lB2.js";import{D as N}from"./Divider-Bxx0iyhR.js";function xe(t){return _("MuiIcon",t)}F("MuiIcon",["root","colorPrimary","colorSecondary","colorAction","colorError","colorDisabled","fontSizeInherit","fontSizeSmall","fontSizeMedium","fontSizeLarge"]);const fe=t=>{const{color:r,fontSize:o,classes:a}=t,s={root:["root",r!=="inherit"&&`color${l(r)}`,`fontSize${l(o)}`]};return X(s,xe,a)},he=S("span",{name:"MuiIcon",slot:"Root",overridesResolver:(t,r)=>{const{ownerState:o}=t;return[r.root,o.color!=="inherit"&&r[`color${l(o.color)}`],r[`fontSize${l(o.fontSize)}`]]}})(R(({theme:t})=>({userSelect:"none",width:"1em",height:"1em",overflow:"hidden",display:"inline-block",textAlign:"center",flexShrink:0,variants:[{props:{fontSize:"inherit"},style:{fontSize:"inherit"}},{props:{fontSize:"small"},style:{fontSize:t.typography.pxToRem(20)}},{props:{fontSize:"medium"},style:{fontSize:t.typography.pxToRem(24)}},{props:{fontSize:"large"},style:{fontSize:t.typography.pxToRem(36)}},{props:{color:"action"},style:{color:(t.vars||t).palette.action.active}},{props:{color:"disabled"},style:{color:(t.vars||t).palette.action.disabled}},{props:{color:"inherit"},style:{color:void 0}},...Object.entries(t.palette).filter(I()).map(([r])=>({props:{color:r},style:{color:(t.vars||t).palette[r].main}}))]}))),Z=M.forwardRef(function(r,o){const a=H({props:r,name:"MuiIcon"}),{baseClassName:s="material-icons",className:b,color:x="inherit",component:g="span",fontSize:p="medium",...y}=a,c={...a,baseClassName:s,color:x,component:g,fontSize:p},d=fe(c);return e.jsx(he,{as:g,className:W(s,"notranslate",d.root,b),ownerState:c,"aria-hidden":!0,ref:o,...y})});Z.muiName="Icon";function be(t){return _("MuiLinearProgress",t)}F("MuiLinearProgress",["root","colorPrimary","colorSecondary","determinate","indeterminate","buffer","query","dashed","dashedColorPrimary","dashedColorSecondary","bar","bar1","bar2","barColorPrimary","barColorSecondary","bar1Indeterminate","bar1Determinate","bar1Buffer","bar2Indeterminate","bar2Buffer"]);const L=4,T=w`
  0% {
    left: -35%;
    right: 100%;
  }

  60% {
    left: 100%;
    right: -90%;
  }

  100% {
    left: 100%;
    right: -90%;
  }
`,ge=typeof T!="string"?D`
        animation: ${T} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
      `:null,O=w`
  0% {
    left: -200%;
    right: 100%;
  }

  60% {
    left: 107%;
    right: -8%;
  }

  100% {
    left: 107%;
    right: -8%;
  }
`,ye=typeof O!="string"?D`
        animation: ${O} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite;
      `:null,A=w`
  0% {
    opacity: 1;
    background-position: 0 -23px;
  }

  60% {
    opacity: 0;
    background-position: 0 -23px;
  }

  100% {
    opacity: 1;
    background-position: -200px -23px;
  }
`,ve=typeof A!="string"?D`
        animation: ${A} 3s infinite linear;
      `:null,je=t=>{const{classes:r,variant:o,color:a}=t,s={root:["root",`color${l(a)}`,o],dashed:["dashed",`dashedColor${l(a)}`],bar1:["bar","bar1",`barColor${l(a)}`,(o==="indeterminate"||o==="query")&&"bar1Indeterminate",o==="determinate"&&"bar1Determinate",o==="buffer"&&"bar1Buffer"],bar2:["bar","bar2",o!=="buffer"&&`barColor${l(a)}`,o==="buffer"&&`color${l(a)}`,(o==="indeterminate"||o==="query")&&"bar2Indeterminate",o==="buffer"&&"bar2Buffer"]};return X(s,be,r)},E=(t,r)=>t.vars?t.vars.palette.LinearProgress[`${r}Bg`]:t.palette.mode==="light"?re(t.palette[r].main,.62):te(t.palette[r].main,.5),Ie=S("span",{name:"MuiLinearProgress",slot:"Root",overridesResolver:(t,r)=>{const{ownerState:o}=t;return[r.root,r[`color${l(o.color)}`],r[o.variant]]}})(R(({theme:t})=>({position:"relative",overflow:"hidden",display:"block",height:4,zIndex:0,"@media print":{colorAdjust:"exact"},variants:[...Object.entries(t.palette).filter(I()).map(([r])=>({props:{color:r},style:{backgroundColor:E(t,r)}})),{props:({ownerState:r})=>r.color==="inherit"&&r.variant!=="buffer",style:{"&::before":{content:'""',position:"absolute",left:0,top:0,right:0,bottom:0,backgroundColor:"currentColor",opacity:.3}}},{props:{variant:"buffer"},style:{backgroundColor:"transparent"}},{props:{variant:"query"},style:{transform:"rotate(180deg)"}}]}))),Ce=S("span",{name:"MuiLinearProgress",slot:"Dashed",overridesResolver:(t,r)=>{const{ownerState:o}=t;return[r.dashed,r[`dashedColor${l(o.color)}`]]}})(R(({theme:t})=>({position:"absolute",marginTop:0,height:"100%",width:"100%",backgroundSize:"10px 10px",backgroundPosition:"0 -23px",variants:[{props:{color:"inherit"},style:{opacity:.3,backgroundImage:"radial-gradient(currentColor 0%, currentColor 16%, transparent 42%)"}},...Object.entries(t.palette).filter(I()).map(([r])=>{const o=E(t,r);return{props:{color:r},style:{backgroundImage:`radial-gradient(${o} 0%, ${o} 16%, transparent 42%)`}}})]})),ve||{animation:`${A} 3s infinite linear`}),Se=S("span",{name:"MuiLinearProgress",slot:"Bar1",overridesResolver:(t,r)=>{const{ownerState:o}=t;return[r.bar,r.bar1,r[`barColor${l(o.color)}`],(o.variant==="indeterminate"||o.variant==="query")&&r.bar1Indeterminate,o.variant==="determinate"&&r.bar1Determinate,o.variant==="buffer"&&r.bar1Buffer]}})(R(({theme:t})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[{props:{color:"inherit"},style:{backgroundColor:"currentColor"}},...Object.entries(t.palette).filter(I()).map(([r])=>({props:{color:r},style:{backgroundColor:(t.vars||t).palette[r].main}})),{props:{variant:"determinate"},style:{transition:`transform .${L}s linear`}},{props:{variant:"buffer"},style:{zIndex:1,transition:`transform .${L}s linear`}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:ge||{animation:`${T} 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite`}}]}))),Re=S("span",{name:"MuiLinearProgress",slot:"Bar2",overridesResolver:(t,r)=>{const{ownerState:o}=t;return[r.bar,r.bar2,r[`barColor${l(o.color)}`],(o.variant==="indeterminate"||o.variant==="query")&&r.bar2Indeterminate,o.variant==="buffer"&&r.bar2Buffer]}})(R(({theme:t})=>({width:"100%",position:"absolute",left:0,bottom:0,top:0,transition:"transform 0.2s linear",transformOrigin:"left",variants:[...Object.entries(t.palette).filter(I()).map(([r])=>({props:{color:r},style:{"--LinearProgressBar2-barColor":(t.vars||t).palette[r].main}})),{props:({ownerState:r})=>r.variant!=="buffer"&&r.color!=="inherit",style:{backgroundColor:"var(--LinearProgressBar2-barColor, currentColor)"}},{props:({ownerState:r})=>r.variant!=="buffer"&&r.color==="inherit",style:{backgroundColor:"currentColor"}},{props:{color:"inherit"},style:{opacity:.3}},...Object.entries(t.palette).filter(I()).map(([r])=>({props:{color:r,variant:"buffer"},style:{backgroundColor:E(t,r),transition:`transform .${L}s linear`}})),{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:{width:"auto"}},{props:({ownerState:r})=>r.variant==="indeterminate"||r.variant==="query",style:ye||{animation:`${O} 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) 1.15s infinite`}}]}))),ke=M.forwardRef(function(r,o){const a=H({props:r,name:"MuiLinearProgress"}),{className:s,color:b="primary",value:x,valueBuffer:g,variant:p="indeterminate",...y}=a,c={...a,color:b,variant:p},d=je(c),v=ee(),u={},f={bar1:{},bar2:{}};if((p==="determinate"||p==="buffer")&&x!==void 0){u["aria-valuenow"]=Math.round(x),u["aria-valuemin"]=0,u["aria-valuemax"]=100;let i=x-100;v&&(i=-i),f.bar1.transform=`translateX(${i}%)`}if(p==="buffer"&&g!==void 0){let i=(g||0)-100;v&&(i=-i),f.bar2.transform=`translateX(${i}%)`}return e.jsxs(Ie,{className:W(d.root,s),ownerState:c,role:"progressbar",...u,ref:o,...y,children:[p==="buffer"?e.jsx(Ce,{className:d.dashed,ownerState:c}):null,e.jsx(Se,{className:d.bar1,ownerState:c,style:f.bar1}),p==="determinate"?null:e.jsx(Re,{className:d.bar2,ownerState:c,style:f.bar2})]})}),ze=G(),P=G({cssVariables:{colorSchemeSelector:".mode-%s"},typography:{fontFamily:'Comfortaa, "jf openhuninn"'},colorSchemes:{light:{palette:{text:{primary:"#000"},primary:{main:"#e783ad",contrastText:"#fff"},secondary:{main:"#e783ad90",dark:"color-mix(in srgb, #e783ad 50%, var(--mui-palette-text-primary) 50%)"}}},dark:{palette:{primary:{main:"#e783ad",contrastText:"#fff"},secondary:{main:"#e783ad90",dark:"color-mix(in srgb, #e783ad 50%, var(--mui-palette-text-primary) 50%)"},background:{default:"#222",paper:"#222"}}}},breakpoints:{values:{...ze.breakpoints.values,md:1e3}},spacing:"0.5rem"}),Me=K(e.jsx("path",{d:"M17.59 3.41 15 6V5c0-1.1-.9-2-2-2H9C6.24 3 4 5.24 4 8h5v3h6V8l2.59 2.59c.26.26.62.41 1 .41h.01c.77 0 1.4-.63 1.4-1.41V4.41C20 3.63 19.37 3 18.59 3h-.01c-.37 0-.73.15-.99.41M9 13v7c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-7z"})),we=w`
  from {
    translate: -50% 0;
  }
  to {
    translate: 50% 0;
  }
`,Pe=t=>t<=10?"剛起步":t<=30?"初步架構完成":t<=50?"功能建構中":t<=70?"進入整合階段":t<=90?"細節優化中":"快完成了！",q=({title:t,description:r,progress:o=0,color:a,icon:s,actionLabel:b="開始探索",actionHref:x,actionTarget:g="_blank",images:p=[...Array(16)].map(()=>"")})=>{const y=C(c=>c.breakpoints.up("sm"));return e.jsxs(n,{sx:{height:"400px",position:"relative",borderRadius:2,overflow:"hidden"},children:[e.jsx(n,{sx:{position:"absolute",inset:0,bgcolor:a,opacity:.4,pointerEvents:"none",zIndex:1}}),e.jsxs($,{sx:{height:1},children:[e.jsxs(n,{sx:{display:"flex",gap:2,alignItems:"center",p:2,pb:{xs:0,sm:2}},children:[s,e.jsxs(n,{sx:{display:"flex",alignItems:"flex-end",gap:1},children:[e.jsx(h,{variant:"h4",component:"h2",sx:{fontFamily:"timemachine-wa",textWrap:"nowrap"},children:t}),y&&e.jsx(h,{variant:"body2",component:"p",sx:{color:"text.secondary"},children:r})]})]}),!y&&e.jsx(h,{variant:"body2",component:"p",sx:{color:"text.secondary",p:2,pt:0},children:r}),e.jsx($,{sx:{alignItems:"center",flex:1,gap:1},children:[...Array(2)].map((c,d)=>e.jsx(n,{sx:{display:"flex",flex:1},onMouseEnter:v=>{const u=v.currentTarget.children;Array.from(u).forEach(f=>{const i=f;i.style.animationPlayState="paused"})},onMouseLeave:v=>{const u=v.currentTarget.children;Array.from(u).forEach(f=>{const i=f;i.style.animationPlayState="running"})},children:[...Array(2)].map((v,u)=>e.jsx(n,{sx:{display:"flex",height:1,animation:`${we} 20s linear infinite`,animationDirection:d===1?"reverse":"normal"},children:p.slice(d*8,d*8+8).map((f,i)=>e.jsx(n,{sx:{position:"relative",aspectRatio:"16/9",height:1,px:.5},children:e.jsx(n,{sx:{width:1,height:1,borderRadius:2,overflow:"hidden",bgcolor:"divider",opacity:.7}})},i))},u))},d))}),e.jsxs(n,{sx:{display:"flex",justifyContent:"space-between",alignItems:"flex-end",p:2},children:[e.jsxs(n,{sx:{display:"flex",gap:1,alignItems:"center",pr:{xs:1,sm:0}},children:[e.jsx(Me,{sx:{fontSize:"1.5em",color:"text.secondary"}}),e.jsxs(h,{variant:y?"subtitle1":"body2",sx:{opacity:.7},children:[o===0&&"準備中",o>0&&o<100&&`目前進度 ${o}%（${Pe(o)}）`,o===100&&"已完成 ✅"]})]}),e.jsx(ue,{clickable:!0,label:b,variant:"filled",icon:e.jsx(de,{}),sx:{p:1,height:"auto",borderRadius:99,"&:hover":{scale:"1.05"},scale:"1.001",transition:"all 0.2s ease"},component:"a",href:x,target:g,rel:"noopener noreferrer"}),e.jsx(ke,{sx:{position:"absolute",inset:"auto 0 0 0",opacity:.2},variant:"determinate",value:o,color:"inherit"})]})]})]})},Be=t=>e.jsx(Z,{...t,sx:{position:"relative",...t.sx},children:e.jsx("svg",{role:"img",viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",style:{position:"absolute",inset:0,fill:"currentColor"},children:e.jsx("path",{d:"M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"})})}),$e=K(e.jsx("path",{d:"M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5M2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1m18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1M11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1m0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1M5.99 4.58c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41zm12.37 12.37c-.39-.39-1.03-.39-1.41 0-.39.39-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0 .39-.39.39-1.03 0-1.41zm1.06-10.96c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0zM7.05 18.36c.39-.39.39-1.03 0-1.41-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0z"})),Le=()=>{const t=C(x=>x.breakpoints.up("sm")),{mode:r,setMode:o,systemMode:a}=oe(),s=r==="light"||a==="light",b=r==="dark"||a==="dark";return e.jsxs(me,{fullWidth:!0,variant:"outlined",sx:{borderRadius:2},children:[e.jsx(B,{startIcon:e.jsx($e,{}),onClick:()=>o("light"),color:s?"primary":"inherit",variant:s?"contained":"outlined",sx:{textWrap:"none",whiteSpace:"nowrap"},disableElevation:!t,children:"淺色"}),e.jsx(B,{startIcon:e.jsx(pe,{}),onClick:()=>o("dark"),color:b?"primary":"inherit",variant:b?"contained":"outlined",sx:{textWrap:"none",whiteSpace:"nowrap"},disableElevation:!t,children:"深色"})]})},Te=()=>e.jsxs(n,{sx:{display:"flex",alignItems:"center"},children:[e.jsxs(j,{select:!0,label:"主題",variant:"outlined",size:"small",defaultValue:"all",sx:{"& .MuiOutlinedInput-notchedOutline":{borderRadius:2,borderTopRightRadius:0,borderBottomRightRadius:0}},slotProps:{select:{IconComponent:k}},children:[e.jsx(m,{value:"all",dense:!0,children:"全部"}),e.jsx(m,{value:"web",dense:!0,children:"社交"}),e.jsx(m,{value:"tool",dense:!0,children:"工具"})]}),e.jsx(j,{label:"搜尋",variant:"outlined",size:"small",sx:{"& .MuiOutlinedInput-notchedOutline":{borderRadius:2,borderTopLeftRadius:0,borderBottomLeftRadius:0}},slotProps:{input:{endAdornment:e.jsx(z,{position:"end",sx:{color:"text.secondary"},children:e.jsx(Q,{edge:"end",color:"inherit",children:e.jsx(J,{})})})}}}),e.jsx(n,{sx:{flex:1}}),e.jsxs(j,{select:!0,label:"排序",variant:"outlined",size:"small",defaultValue:"latest",sx:{"& .MuiOutlinedInput-notchedOutline":{borderRadius:2}},slotProps:{input:{startAdornment:e.jsx(z,{position:"start",sx:{color:"text.secondary"},children:e.jsx(Y,{})})},select:{IconComponent:k}},children:[e.jsx(m,{value:"latest",dense:!0,children:"最新"}),e.jsx(m,{value:"title",dense:!0,children:"標題"})]})]}),Oe=()=>e.jsxs(n,{sx:{display:"flex",alignItems:"stretch",flexDirection:"column",gap:1},children:[e.jsxs(n,{sx:{display:"flex",alignItems:"center"},children:[e.jsxs(j,{select:!0,label:"主題",variant:"outlined",size:"small",defaultValue:"all",fullWidth:!0,sx:{"& .MuiOutlinedInput-notchedOutline":{borderRadius:2,borderTopRightRadius:0,borderBottomRightRadius:0}},slotProps:{select:{IconComponent:k}},children:[e.jsx(m,{value:"all",dense:!0,children:"全部"}),e.jsx(m,{value:"web",dense:!0,children:"社交"}),e.jsx(m,{value:"tool",dense:!0,children:"工具"})]}),e.jsxs(j,{select:!0,label:"排序",variant:"outlined",size:"small",defaultValue:"latest",fullWidth:!0,sx:{"& .MuiOutlinedInput-notchedOutline":{borderRadius:2,borderTopLeftRadius:0,borderBottomLeftRadius:0}},slotProps:{input:{startAdornment:e.jsx(z,{position:"start",sx:{color:"text.secondary"},children:e.jsx(Y,{})})},select:{IconComponent:k}},children:[e.jsx(m,{value:"latest",dense:!0,children:"最新"}),e.jsx(m,{value:"title",dense:!0,children:"標題"})]})]}),e.jsx(j,{label:"搜尋",variant:"outlined",size:"small",sx:{"& .MuiOutlinedInput-notchedOutline":{borderRadius:2}},slotProps:{input:{endAdornment:e.jsx(z,{position:"end",sx:{color:"text.secondary"},children:e.jsx(Q,{edge:"end",color:"inherit",children:e.jsx(J,{})})})}}})]}),Ae=()=>C(r=>r.breakpoints.up("sm"))?e.jsx(Te,{}):e.jsx(Oe,{}),De=()=>e.jsxs(e.Fragment,{children:[e.jsxs(n,{sx:{display:"flex",alignItems:"flex-end"},children:[e.jsx(h,{variant:"h2",component:"h1",sx:{fontFamily:"timemachine-wa","&:first-letter":{color:"primary.main"}},children:"1ureka"}),e.jsxs(n,{sx:{position:"relative",display:"grid",placeItems:"center"},children:[e.jsx(n,{sx:{p:1,borderRadius:1,bgcolor:"primary.light",m:2}}),e.jsx(n,{sx:{p:2,borderRadius:1,bgcolor:"primary.main",opacity:.3,position:"absolute",rotate:"45deg"}})]})]}),e.jsx(h,{variant:"h2",component:"h1",sx:{fontFamily:"timemachine-wa"},children:"Space"})]}),V=({sx:t,...r})=>e.jsxs(n,{sx:{color:"text.secondary",...t},...r,children:[e.jsxs(B,{color:"inherit",variant:"outlined",sx:{borderRadius:2,display:"flex",alignItems:"center",gap:1,p:1.5,mb:2},href:"https://github.com/1ureka",target:"_blank",rel:"noopener noreferrer",children:[e.jsx(Be,{fontSize:"large"}),e.jsx(h,{variant:"h6",component:"span",children:"GitHub"})]}),e.jsx(Le,{})]});function Ee(){const t=C(P.breakpoints.up("md")),r=C(P.breakpoints.up("sm"));return M.useEffect(()=>{document.documentElement.style.fontSize=r?"16px":"14px"},[r]),e.jsxs(ne,{theme:P,children:[e.jsx(ae,{}),e.jsx(se,{}),e.jsxs(n,{sx:{p:{xs:2.5,sm:3.5,md:5},display:"flex",flexDirection:{xs:"column",md:"row"},height:"100dvh",overflow:"auto"},children:[e.jsxs($,{component:"aside",sx:{flexDirection:{xs:"row",md:"column"},justifyContent:"space-between",height:1,width:{xs:1,md:"13rem",lg:"15rem"},position:"relative"},children:[e.jsxs(n,{children:[e.jsx(De,{}),t&&e.jsx(h,{variant:"body1",component:"p",sx:{color:"text.primary",mt:2,opacity:.9},children:"這是一個模組化的 UI/UX 展示平台，透過各種類型的樣板，探索多種真實場景中的介面開發與使用者流程設計。專案將持續打磨，期盼從視覺層次、結構邏輯到互動細節，逐步走向更完整、細膩且具啟發性的使用體驗。"})]}),r&&e.jsx(V,{})]}),!t&&e.jsx(h,{variant:"body1",component:"p",sx:{color:"text.primary",mt:2,opacity:.9},children:"這是一個模組化的 UI/UX 展示平台，透過各種類型的樣板，探索多種真實場景中的介面開發與使用者流程設計。專案將持續打磨，期盼從視覺層次、結構邏輯到互動細節，逐步走向更完整、細膩且具啟發性的使用體驗。"}),!r&&e.jsx(V,{sx:{mt:2}}),t?e.jsx(N,{orientation:"vertical",flexItem:!0,sx:{mx:5}}):e.jsx(N,{orientation:"horizontal",flexItem:!0,sx:{my:3}}),e.jsxs(n,{component:"main",sx:{flex:1},children:[e.jsx(Ae,{}),e.jsxs(n,{sx:{mt:5,display:"grid",gridTemplateColumns:{xs:"1fr",sm:"repeat(auto-fill, minmax(500px, 1fr))"},gap:2},children:[e.jsx(q,{title:"資料樣板",description:"探索資料結構、互動體驗與儀表板 UX 的設計樣板，結合可視化與開發工具的一站式後台模組",color:"#66cccc",icon:e.jsx(ce,{sx:{fontSize:"4em",color:"#66cccc"}}),actionLabel:"開始探索",actionHref:U.datahub_home,actionTarget:"_blank",progress:5}),e.jsx(q,{title:"論壇樣板",description:"模擬真實社群互動平台，展示從發文、留言到通知的完整 UI/UX 流程與資料驅動的體驗",color:"#ff9d69",icon:e.jsx(le,{sx:{fontSize:"4em",color:"#ff9d69"}}),actionLabel:"開始探索",actionHref:U.forum_home,actionTarget:"_blank",progress:80})]})]})]})]})}ie.createRoot(document.getElementById("root")).render(e.jsx(M.StrictMode,{children:e.jsx(Ee,{})}));
