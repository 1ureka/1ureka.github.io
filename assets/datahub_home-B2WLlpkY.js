const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/LargeTiles-CSl5OyVa.js","assets/routes-n0rROGIf.js","assets/TileText-CaeMnMNs.js","assets/useMutation-3TE3W5MO.js","assets/forum-CVzoj8Ed.js","assets/DarkModeRounded-BstcUZiJ.js","assets/Skeleton-DVK1y20g.js","assets/Chip-Dr4JwOJ2.js","assets/style-BZ8kDvS8.js","assets/DatasetRounded-vP4S5ZKA.js","assets/with-selector-DaOtV0DI.js","assets/style-77Si7Yrt.css","assets/formatters-CWrkKLZ2.js","assets/SwitchBase-C9J9CAMN.js","assets/DataExplorationRounded-BiheqLbW.js","assets/NotificationsRounded-D9n4jbA0.js","assets/ExpandMoreRounded-BHtti7oY.js","assets/DownloadRounded-oUOmt0y3.js","assets/dayjs.min-B5fokDD_.js","assets/SmallTiles-B-kniDDN.js","assets/OpenInNewRounded-B6wH2E-Q.js","assets/Divider-DiSxJ-uN.js","assets/Sidebar-D_ePTDnV.js","assets/proxy-CmkFMDIz.js","assets/Collapse-BIXy2GHj.js","assets/useThemeProps-Du8WbH_9.js","assets/FlowChart-CRjUj3Q3.js","assets/Motion-CpIRI559.js"])))=>i.map(i=>d[i]);
var Fe=Object.defineProperty;var Be=(t,s,n)=>s in t?Fe(t,s,{enumerable:!0,configurable:!0,writable:!0,value:n}):t[s]=n;var z=(t,s,n)=>Be(t,typeof s!="symbol"?s+"":s,n);import{o as y,j as e,s as B,D as Y,m as Ae,ay as oe,a as Oe,g as _e,r as p,u as ze,W as He,c as qe,d as Ke,T as m,n as me,v as D,R as ae,az as $e,B as u,q as F,y as Ve,w as Ue,C as Ne,x as Qe,t as X,p as We,ac as fe,at as Ze,E as Ge,ad as Je,P as G,A as Ye,z as Xe}from"./routes-n0rROGIf.js";import{t as C,f as et,j as ie,g as tt,s as ce,a as ge,k as st,R as nt,d as rt,e as ot,E as at,l as it,u as E}from"./forum-CVzoj8Ed.js";import{D as ee}from"./DataExplorationRounded-BiheqLbW.js";import{S as K,M as w,I as $,D as ct}from"./DarkModeRounded-BstcUZiJ.js";import{B as lt,N as dt}from"./NotificationsRounded-D9n4jbA0.js";import{I as ut,S as ht,E as pt}from"./ExpandMoreRounded-BHtti7oY.js";import{T as A,D as xt,u as ye}from"./useMutation-3TE3W5MO.js";import{D as mt}from"./DownloadRounded-oUOmt0y3.js";import{d as ft}from"./dayjs.min-B5fokDD_.js";const gt=y(e.jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"})),yt=B(Y)(Ae(({theme:t})=>({display:"flex",marginLeft:`calc(${t.spacing(1)} * 0.5)`,marginRight:`calc(${t.spacing(1)} * 0.5)`,...t.palette.mode==="light"?{backgroundColor:t.palette.grey[100],color:t.palette.grey[700]}:{backgroundColor:t.palette.grey[700],color:t.palette.grey[100]},borderRadius:2,"&:hover, &:focus":{...t.palette.mode==="light"?{backgroundColor:t.palette.grey[200]}:{backgroundColor:t.palette.grey[600]}},"&:active":{boxShadow:t.shadows[0],...t.palette.mode==="light"?{backgroundColor:oe(t.palette.grey[200],.12)}:{backgroundColor:oe(t.palette.grey[600],.12)}}}))),bt=B(gt)({width:24,height:16});function jt(t){const{slots:s={},slotProps:n={},...r}=t,a=t;return e.jsx("li",{children:e.jsx(yt,{focusRipple:!0,...r,ownerState:a,children:e.jsx(bt,{as:s.CollapsedIcon,ownerState:a,...n.collapsedIcon})})})}function wt(t){return _e("MuiBreadcrumbs",t)}const vt=Oe("MuiBreadcrumbs",["root","ol","li","separator"]),Ct=t=>{const{classes:s}=t;return Ke({root:["root"],li:["li"],ol:["ol"],separator:["separator"]},wt,s)},St=B(m,{name:"MuiBreadcrumbs",slot:"Root",overridesResolver:(t,s)=>[{[`& .${vt.li}`]:s.li},s.root]})({}),Et=B("ol",{name:"MuiBreadcrumbs",slot:"Ol",overridesResolver:(t,s)=>s.ol})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"}),It=B("li",{name:"MuiBreadcrumbs",slot:"Separator",overridesResolver:(t,s)=>s.separator})({display:"flex",userSelect:"none",marginLeft:8,marginRight:8});function kt(t,s,n,r){return t.reduce((a,c,o)=>(o<t.length-1?a=a.concat(c,e.jsx(It,{"aria-hidden":!0,className:s,ownerState:r,children:n},`separator-${o}`)):a.push(c),a),[])}const Rt=p.forwardRef(function(s,n){const r=ze({props:s,name:"MuiBreadcrumbs"}),{children:a,className:c,component:o="nav",slots:i={},slotProps:d={},expandText:l="Show path",itemsAfterCollapse:x=1,itemsBeforeCollapse:h=1,maxItems:f=8,separator:g="/",...b}=r,[k,U]=p.useState(!1),R={...r,component:o,expanded:k,expandText:l,itemsAfterCollapse:x,itemsBeforeCollapse:h,maxItems:f,separator:g},_=Ct(R),Te=He({elementType:i.CollapsedIcon,externalSlotProps:d.collapsedIcon,ownerState:R}),ne=p.useRef(null),De=j=>{const Q=()=>{U(!0);const re=ne.current.querySelector("a[href],button,[tabindex]");re&&re.focus()};return h+x>=j.length?j:[...j.slice(0,h),e.jsx(jt,{"aria-label":l,slots:{CollapsedIcon:i.CollapsedIcon},slotProps:{collapsedIcon:Te},onClick:Q},"ellipsis"),...j.slice(j.length-x,j.length)]},N=p.Children.toArray(a).filter(j=>p.isValidElement(j)).map((j,Q)=>e.jsx("li",{className:_.li,children:j},`child-${Q}`));return e.jsx(St,{ref:n,component:o,color:"textSecondary",className:qe(_.root,c),ownerState:R,...b,children:e.jsx(Et,{className:_.ol,ref:ne,ownerState:R,children:kt(k||f&&N.length<=f?N:De(N),_.separator,g,R)})})}),Pt=me(),q=me({cssVariables:{colorSchemeSelector:".mode-%s"},typography:{fontFamily:'Comfortaa, "jf openhuninn"'},colorSchemes:{light:{palette:{primary:{main:"#66cccc",dark:"#45a1a1"},secondary:{main:"#66cccc90",dark:"color-mix(in srgb, #66cccc 50%, var(--mui-palette-text-primary) 50%)"}}},dark:{palette:{primary:{main:"#66cccc",dark:"#2d8686"},secondary:{main:"#66cccc90",dark:"color-mix(in srgb, #66cccc 50%, var(--mui-palette-text-primary) 50%)"},background:{default:"#222",paper:"#222"}}}},breakpoints:{values:{...Pt.breakpoints.values,sm:700,ml:1440}},components:{MuiInputBase:{defaultProps:{sx:{"&.Mui-disabled::before":{borderBottomStyle:"solid"}}}}},spacing:"0.5rem"}),be=()=>{const t=D(q.breakpoints.up("lg")),s=D(q.breakpoints.up("md")),n=D(q.breakpoints.up("sm"));return p.useEffect(()=>{t?document.documentElement.style.fontSize="16px":s&&(document.documentElement.style.fontSize="14px")},[t,s,n]),{isLg:t,isMd:s,isSm:n}},le=t=>{let s;const n=new Set,r=(l,x)=>{const h=typeof l=="function"?l(s):l;if(!Object.is(h,s)){const f=s;s=x??(typeof h!="object"||h===null)?h:Object.assign({},s,h),n.forEach(g=>g(s,f))}},a=()=>s,i={setState:r,getState:a,getInitialState:()=>d,subscribe:l=>(n.add(l),()=>n.delete(l))},d=s=t(r,a,i);return i},Mt=t=>t?le(t):le,Lt=t=>t;function Tt(t,s=Lt){const n=ae.useSyncExternalStore(t.subscribe,()=>s(t.getState()),()=>s(t.getInitialState()));return ae.useDebugValue(n),n}const de=t=>{const s=Mt(t),n=r=>Tt(s,r);return Object.assign(n,s),n},Dt=t=>t?de(t):de,te=Dt(t=>({client:null,setClient:s=>t({client:s}),resetClient:()=>t({client:null})})),S=500;class Ft{constructor(s){z(this,"dbPromise",null);z(this,"dbPath");z(this,"storageKey");this.dbPath=s.dbPath,this.storageKey=s.storageKey}async ready(){this.dbPromise=this.dbPromise===null?this.loadDatabase():this.dbPromise,await this.dbPromise}async downloadDatabase(s="database.db"){const n=Date.now();try{this.dbPromise=this.dbPromise===null?this.loadDatabase():this.dbPromise;const a=(await this.dbPromise).export(),c=new Blob([a],{type:"application/x-sqlite3"}),o=URL.createObjectURL(c),i=document.createElement("a");i.href=o,i.download=s,i.style.display="none",document.body.appendChild(i);const d=Date.now()-n;return d<S&&await new Promise(l=>setTimeout(l,S-d)),i.click(),setTimeout(()=>{document.body.removeChild(i),URL.revokeObjectURL(o)},100),!0}catch(r){return console.error("下載資料庫失敗",r),!1}}async exec(s,n){const r=Date.now();this.dbPromise=this.dbPromise===null?this.loadDatabase():this.dbPromise;const a=await this.dbPromise;a.run("PRAGMA foreign_keys = ON;");const[{values:c}]=a.exec("PRAGMA foreign_keys;");if(c[0][0]!==1)return console.error("Failed to enable foreign keys"),this.parse([]);const o=await C((async()=>{const d=a.exec(s,n);return await this.saveDatabase(a),d})());if(o.error!==null)return console.error("Failed to execute SQL query",o.error),this.parse([]);const i=Date.now()-r;return i<S&&await new Promise(d=>setTimeout(d,S-i)),this.parse(o.data)}async reset(){const s=Date.now(),{error:n}=await C(et(this.storageKey)),r=Date.now()-s;r<S&&await new Promise(a=>setTimeout(a,S-r)),n?console.error("刪除本地資料庫失敗"):console.log("刪除本地資料庫成功"),this.dbPromise=this.loadDatabase()}async getDatabaseSize(){await this.ready();const{data:s,error:n}=await C(ie(this.storageKey));return n?(console.error("Failed to get database size",n),0):s?s.byteLength:0}parse(s){if(s.length===0||!s[0])return[];const{columns:n,values:r}=s[0];return r.map(a=>Object.fromEntries(n.map((c,o)=>[c,a[o]])))}async loadDatabase(){const s=await tt({locateFile:d=>`https://sql.js.org/dist/${d}`}),{data:n,error:r}=await C(ie(this.storageKey));if(r&&console.error("Failed to get cached database",r),n)return new s.Database(n);const{data:a,error:c}=await C((async()=>{const l=await(await fetch(this.dbPath)).arrayBuffer();return new s.Database(new Uint8Array(l))})());if(c)return console.error("Failed to fetch database file",c),new s.Database;const o=a.export(),{error:i}=await C(ce(this.storageKey,o));return i&&console.error("Failed to save database to IndexedDB",i),a}async saveDatabase(s){const n=s.export(),{error:r}=await C(ce(this.storageKey,n));r&&console.error("Failed to save database to IndexedDB",r)}}const je=new Event("locationchange"),Bt=window.history.pushState,At=window.history.replaceState;window.history.pushState=function(...t){Bt.apply(this,t),window.dispatchEvent(je)};window.history.replaceState=function(...t){At.apply(this,t),window.dispatchEvent(je)};const Ot=t=>t.startsWith("/")?t:"/"+t;function ue(t){document.startViewTransition?document.startViewTransition(t):t()}const W="__preserved__hash__key__";function O(){const[t,s]=p.useState(new URLSearchParams(window.location.search)),[n,r]=p.useState(window.location.hash),a=p.useRef(new Set),c=p.useMemo(()=>({get:l=>(a.current.add(l),t.get(l)),getAll:l=>(a.current.add(l),t.getAll(l)),has:l=>(a.current.add(l),t.has(l))}),[t]),o=p.useMemo(()=>({get:l=>(a.current.add(W),l!=null&&l.raw?n:n.replace(/^#/,"")),getParts:()=>(a.current.add(W),n.replace(/^#/,"").split("/").filter(Boolean))}),[n]),i=p.useCallback(l=>{const x=new URL(window.location.href);Object.entries(l).forEach(([h,f])=>{f===null?x.searchParams.delete(h):x.searchParams.set(h,f)}),x.hash=window.location.hash,ue(()=>window.history.pushState({},"",x))},[]),d=p.useCallback(l=>{const x=new URL(window.location.href);x.hash=Ot(l),ue(()=>window.history.pushState({},"",x))},[]);return p.useEffect(()=>{const l=()=>{const x=new URLSearchParams(window.location.search),h=window.location.hash;let f=!1;a.current.forEach(g=>{(g===W&&n!==h||t.get(g)!==x.get(g))&&(f=!0)}),f&&(s(x),r(h))};return window.addEventListener("popstate",l),window.addEventListener("locationchange",l),()=>{window.removeEventListener("popstate",l),window.removeEventListener("locationchange",l)}},[t,a,n]),{searchParams:c,updateSearchParams:i,hash:o,updateHash:d}}const we={forum:st},_t=t=>$e(we).includes(t);function zt(){const{searchParams:t}=O(),s=te(r=>r.setClient),n=ge();p.useEffect(()=>{let r=t.get("db");if((r===null||r.trim()==="")&&(r="forum"),!_t(r))throw new Error(`要求資料庫 "${r}" 不存在`);const a=new Ft({dbPath:we[r],storageKey:`sqlite-db-${r}`});s(a),n.resetQueries({queryKey:[]})},[s,t,n])}const ve=72,Ht=y(e.jsx("path",{d:"M19 11H7.83l4.88-4.88c.39-.39.39-1.03 0-1.42a.996.996 0 0 0-1.41 0l-6.59 6.59c-.39.39-.39 1.02 0 1.41l6.59 6.59c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L7.83 13H19c.55 0 1-.45 1-1s-.45-1-1-1"}));function Ce({error:t,resetErrorBoundary:s,isFatal:n}){return be(),e.jsxs(u,{sx:{position:"fixed",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",p:{xs:2,sm:4},bgcolor:"background.default"},children:[e.jsx(u,{sx:{position:"absolute",inset:0,bgcolor:"primary.main",opacity:.1,pointerEvents:"none"}}),e.jsx(u,{sx:{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",display:"flex",justifyContent:"center"},children:e.jsxs(u,{sx:{position:"absolute",maskImage:"radial-gradient(circle at 50% 25%, #0008 0%, #0008 100%)",pointerEvents:"none",bgcolor:"primary.main",fill:"var(--mui-palette-background-paper)",fillOpacity:.2,width:1,minWidth:1200,height:1},children:[e.jsxs("svg",{style:{scale:"1 -1"},width:"100%",height:"200",viewBox:"0 0 1920 300",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",children:[e.jsx("path",{d:"M0,160 C160,180 320,140 480,160 C640,180 800,120 960,150 C1120,180 1280,130 1440,160 C1600,190 1760,150 1920,170 L1920,300 L0,300 Z"}),e.jsx("path",{d:"M0,190 C120,210 240,160 360,190 C480,220 600,140 720,180 C840,220 960,130 1080,180 C1200,230 1320,160 1440,200 C1560,240 1740,180 1920,210 L1920,300 L0,300 Z"}),e.jsx("path",{d:"M0,230 C160,250 320,190 480,230 C640,270 800,180 960,220 C1120,260 1280,170 1440,210 C1600,250 1760,200 1920,230 L1920,300 L0,300 Z"})]}),e.jsxs("svg",{style:{position:"absolute",inset:"auto 0 0 0"},width:"100%",height:"200",viewBox:"0 0 1920 300",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",children:[e.jsx("path",{d:"M0,160 C160,180 320,140 480,160 C640,180 800,120 960,150 C1120,180 1280,130 1440,160 C1600,190 1760,150 1920,170 L1920,300 L0,300 Z"}),e.jsx("path",{d:"M0,190 C120,210 240,160 360,190 C480,220 600,140 720,180 C840,220 960,130 1080,180 C1200,230 1320,160 1440,200 C1560,240 1740,180 1920,210 L1920,300 L0,300 Z"}),e.jsx("path",{d:"M0,230 C160,250 320,190 480,230 C640,270 800,180 960,220 C1120,260 1280,170 1440,210 C1600,250 1760,200 1920,230 L1920,300 L0,300 Z"})]})]})}),e.jsx(u,{sx:{position:"relative",zIndex:1,display:"grid",placeItems:"center"},children:e.jsxs(K,{sx:{gap:5,alignItems:"center"},children:[e.jsxs(u,{sx:{display:"flex",gap:1,alignItems:"center",translate:"-2.5%"},children:[e.jsx(ee,{sx:{fontSize:"4rem",color:"secondary.dark"}}),e.jsx(m,{variant:"h3",component:"h1",sx:{fontFamily:'"timemachine-wa"',color:"secondary.dark"},children:"資料樣板"})]}),e.jsxs(K,{sx:{gap:1,alignItems:"center"},children:[e.jsx(m,{variant:"h5",component:"h3",children:"發生錯誤"}),e.jsx(m,{variant:"body1",sx:{color:"text.secondary"},children:(t==null?void 0:t.message)||"未知錯誤"})]}),e.jsxs(u,{sx:{display:"flex",gap:2,mt:2,color:"text.secondary"},children:[!n&&e.jsx(F,{variant:"outlined",color:"inherit",disableElevation:!0,href:Ve.datahub_home,startIcon:e.jsx(Ht,{}),children:"返回首頁"}),s&&e.jsx(F,{variant:"text",color:"inherit",onClick:()=>s(),startIcon:e.jsx(nt,{}),children:"重新載入"})]})]})})]})}const qt=()=>e.jsx(Ce,{error:{message:"請使用寬度超過 700px 的裝置或將視窗放大，以使用此應用程式。"},isFatal:!0}),Kt=new rt;function he({children:t}){return e.jsxs(Ue,{theme:q,children:[e.jsx(Ne,{}),e.jsx(Qe,{}),e.jsx(ot,{client:Kt,children:e.jsx(at,{fallbackRender:s=>e.jsx(Ce,{...s}),children:t})})]})}const $t=()=>e.jsxs(X,{select:!0,defaultValue:"db",size:"small",variant:"outlined",sx:{bgcolor:"background.paper",backgroundImage:"linear-gradient(#fff1, #fff1)",borderRadius:1},slotProps:{input:{sx:{"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:"secondary.main"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"divider"}}}},children:[e.jsx(w,{value:"db",dense:!0,children:"資料庫"}),e.jsx(w,{value:"table",dense:!0,children:"資料表"}),e.jsx(w,{value:"column",dense:!0,children:"欄位"}),e.jsx(w,{value:"record",dense:!0,children:"紀錄"})]}),Vt=()=>{const[t,s]=p.useState(""),n=c=>s(c.target.value),r="#"+t,a=({key:c})=>{if(c==="Enter"){if(!t.trim())return console.error("請輸入搜尋內容");console.log("還沒寫完，請稍後再試"),window.location.href="#"}};return e.jsx(X,{variant:"outlined",label:"搜尋",size:"small",sx:{width:"20vw",maxWidth:"22rem",bgcolor:"background.paper",backgroundImage:"linear-gradient(#fff1, #fff1)",borderRadius:1},value:t,onChange:n,onKeyDown:a,slotProps:{input:{sx:{"&:hover .MuiOutlinedInput-notchedOutline":{borderColor:"secondary.main"},"& .MuiOutlinedInput-notchedOutline":{borderColor:"divider"}},endAdornment:e.jsx(A,{title:t.trim()?"搜尋":"請輸入搜尋內容",arrow:!0,children:e.jsx(ut,{position:"end",children:e.jsx($,{edge:"end",href:r,disabled:!t.trim(),children:e.jsx(ht,{})})})})}}})},Ut=()=>{const[t,s]=p.useState(null),n=a=>s(a.currentTarget),r=()=>s(null);return e.jsxs(e.Fragment,{children:[e.jsx(A,{title:"切換主題",arrow:!0,children:e.jsx($,{onClick:n,children:e.jsx(ct,{})})}),e.jsx(Nt,{open:!!t,anchorEl:t,onClose:r,anchorOrigin:{horizontal:"center",vertical:"bottom"},transformOrigin:{horizontal:"center",vertical:"top"}})]})},Nt=({onClose:t,...s})=>{const{mode:n,setMode:r}=We(),a=c=>()=>{r(c),t()};return e.jsx(fe,{anchorOrigin:{horizontal:"right",vertical:"top"},onClose:t,...s,children:e.jsxs(Ze,{dense:!0,children:[e.jsx(w,{onClick:a("light"),selected:n==="light",children:"淺色"}),e.jsx(w,{onClick:a("dark"),selected:n==="dark",children:"暗色"}),e.jsx(w,{onClick:a("system"),selected:n==="system",children:"跟隨系統"})]})})},Qt=y(e.jsx("path",{d:"m8.71 11.71 2.59 2.59c.39.39 1.02.39 1.41 0l2.59-2.59c.63-.63.18-1.71-.71-1.71H9.41c-.89 0-1.33 1.08-.7 1.71"})),Wt=()=>{const t=D(s=>s.breakpoints.up("md"));return e.jsxs(Y,{sx:{display:"flex",flexDirection:"row",alignItems:"center",gap:1,textAlign:"left",borderRadius:1,p:.5,px:1.5,"&:hover":{bgcolor:"action.hover"}},children:[e.jsx(u,{sx:{width:"2.8rem",aspectRatio:1,borderRadius:1,bgcolor:"primary.main",display:"grid",placeItems:"center"},children:e.jsx(m,{variant:"h6",component:"span",sx:{color:"primary.contrastText"},children:"1"})}),e.jsxs(u,{sx:{pr:{xs:0,md:1}},children:[e.jsx(m,{variant:"subtitle1",component:"h6",children:"1ureka"}),t&&e.jsx(m,{variant:"body2",component:"p",color:"text.secondary",children:"資料庫管理員"})]}),e.jsx(u,{sx:{color:"text.secondary"},children:e.jsx(Qt,{color:"inherit"})})]})},P={display:"flex",flexDirection:"row",alignItems:"center"},Zt=()=>{const t=D(s=>s.breakpoints.up("md"));return e.jsxs(u,{component:"header",sx:{position:"relative",gap:3,justifyContent:"space-between",px:3.5,bgcolor:"background.paper",height:ve,...P},children:[e.jsx(u,{sx:{position:"absolute",inset:0,bgcolor:"primary.main",opacity:.1,pointerEvents:"none"}}),e.jsxs(u,{sx:{gap:6,...P},children:[e.jsxs(u,{sx:{gap:1,...P},children:[e.jsx(ee,{sx:{fontSize:"3em",color:"primary.main"}}),t&&e.jsx(m,{variant:"h4",component:"h1",sx:{fontFamily:'"timemachine-wa"',color:"secondary.dark"},children:"資料樣板"})]}),e.jsxs(u,{sx:{gap:.5,...P},children:[e.jsx($t,{}),e.jsx(Vt,{})]})]}),e.jsxs(u,{sx:{gap:2,...P},children:[e.jsx(Ut,{}),e.jsx(A,{title:"通知",arrow:!0,children:e.jsx($,{children:e.jsx(lt,{variant:"dot",badgeContent:1,color:"error",children:e.jsx(dt,{})})})}),e.jsx(Wt,{})]})]})},Se=y(e.jsx("path",{d:"M4 13h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1m0 8h6c.55 0 1-.45 1-1v-4c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v4c0 .55.45 1 1 1m10 0h6c.55 0 1-.45 1-1v-8c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1v8c0 .55.45 1 1 1M13 4v4c0 .55.45 1 1 1h6c.55 0 1-.45 1-1V4c0-.55-.45-1-1-1h-6c-.55 0-1 .45-1 1"})),Ee=y(e.jsx("path",{d:"M14 10.5v.5h-3v-.5c0-.83-.67-1.5-1.5-1.5h-1V7h1c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-4C4.67 1 4 1.67 4 2.5v3C4 6.33 4.67 7 5.5 7h1v2h-1C4.67 9 4 9.67 4 10.5v3c0 .83.67 1.5 1.5 1.5h1v2h-1c-.83 0-1.5.67-1.5 1.5v3c0 .83.67 1.5 1.5 1.5h4c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-1v-2h1c.83 0 1.5-.67 1.5-1.5V13h3v.5c0 .83.67 1.5 1.5 1.5h4c.83 0 1.5-.67 1.5-1.5v-3c0-.83-.67-1.5-1.5-1.5h-4c-.83 0-1.5.67-1.5 1.5"})),Ie=y(e.jsx("path",{d:"M4 14h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1m0 5h2c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1M4 9h2c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1m5 5h11c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1m0 5h11c.55 0 1-.45 1-1v-2c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1v2c0 .55.45 1 1 1M8 6v2c0 .55.45 1 1 1h11c.55 0 1-.45 1-1V6c0-.55-.45-1-1-1H9c-.55 0-1 .45-1 1"})),ke=y(e.jsx("path",{d:"M20 4H4c-1.11 0-2 .9-2 2v12c0 1.1.89 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.89-2-2-2m0 14H4V8h16zm-8-2c0-.55.45-1 1-1h4c.55 0 1 .45 1 1s-.45 1-1 1h-4c-.55 0-1-.45-1-1M6.79 9.71c.39-.39 1.02-.39 1.41 0l2.59 2.59c.39.39.39 1.02 0 1.41L8.2 16.3c-.39.39-1.02.39-1.41 0a.996.996 0 0 1 0-1.41L8.67 13l-1.88-1.88a.996.996 0 0 1 0-1.41"})),Gt=y(e.jsx("path",{d:"M5 10h10c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1m0-4h10c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1m0 8h6c.55 0 1 .45 1 1s-.45 1-1 1H5c-.55 0-1-.45-1-1s.45-1 1-1m9 .88v4.23c0 .39.42.63.76.43l3.53-2.12c.32-.19.32-.66 0-.86l-3.53-2.12c-.34-.19-.76.05-.76.44"})),Jt=y(e.jsx("path",{d:"M17.7 15.89 13.82 12l3.89-3.89c.39-.39.39-1.02 0-1.41a.996.996 0 0 0-1.41 0l-4.59 4.59c-.39.39-.39 1.02 0 1.41l4.59 4.59c.39.39 1.02.39 1.41 0 .38-.38.38-1.02-.01-1.4M7 6c.55 0 1 .45 1 1v10c0 .55-.45 1-1 1s-1-.45-1-1V7c0-.55.45-1 1-1"})),M=({title:t,active:s,onClick:n,children:r})=>e.jsx(A,{title:t,arrow:!0,placement:"right",children:e.jsx($,{color:"inherit",centerRipple:!1,onClick:n,sx:{borderRadius:1,aspectRatio:1,bgcolor:s?"#fffc":void 0,boxShadow:s?1:void 0,color:s?"primary.dark":void 0,"&:hover":{bgcolor:s?"#fffe":void 0},transition:"all 0.2s ease-in-out"},children:r})}),L=({title:t,description:s,icon:n,active:r,onClick:a})=>e.jsx(Y,{onClick:a,sx:{borderRadius:1,bgcolor:r?"#fffc":void 0,boxShadow:r?1:void 0,"&:hover":{bgcolor:r?"#fffe":"#fff1"},transition:"all 0.2s ease-in-out"},children:e.jsxs(u,{sx:{display:"flex",gap:2,alignItems:"center",p:2,width:1},children:[e.jsx(u,{children:n}),e.jsxs(u,{sx:{flex:1,textAlign:"left"},children:[e.jsx(m,{variant:"h6",component:"h6",sx:{color:r?"primary.dark":"#fffc"},children:t}),s&&e.jsx(m,{variant:"body2",component:"p",sx:{color:r?"primary.dark":"#fffc",opacity:.8},children:s})]})]})}),Yt=({open:t,onClose:s})=>{const{searchParams:n,updateSearchParams:r,updateHash:a,hash:c}=O(),o=i=>()=>{r({db:i})};return e.jsxs(xt,{anchor:"left",open:t,onClose:s,sx:{"& .MuiDrawer-paper":{width:450,maxWidth:"100vw",bgcolor:"primary.dark",p:3,display:"flex",flexDirection:"column",gap:2}},children:[e.jsxs(u,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:2,mb:2},children:[e.jsxs(u,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsx(ee,{sx:{fontSize:"3em",color:"#fffc"}}),e.jsx(m,{variant:"h4",component:"h1",sx:{fontFamily:'"timemachine-wa"',color:"#fffc"},children:"資料樣板"})]}),e.jsx(X,{className:"mode-dark",select:!0,label:"資料庫",variant:"outlined",slotProps:{select:{IconComponent:pt}},value:n.get("db")||"forum",children:e.jsx(w,{value:"forum",dense:!0,children:e.jsx(m,{variant:"body2",sx:{color:"text.primary"},onClick:o("forum"),children:"論壇資料庫"})})})]}),e.jsx(L,{title:"概覽",description:"快速掌握資料庫狀態與視覺化圖表",icon:e.jsx(Se,{sx:{color:c.getParts().length===0?"primary.dark":"#fffc",fontSize:"3.5rem"}}),active:c.getParts().length===0,onClick:()=>{a(""),s()}}),e.jsx(L,{title:"資料庫結構",description:"圖像化呈現資料表間的關聯",icon:e.jsx(Ee,{sx:{color:c.getParts()[0]==="schema"?"primary.dark":"#fffc",fontSize:"3.5rem"}}),active:c.getParts()[0]==="schema",onClick:()=>{a("schema"),s()}}),e.jsx(L,{title:"資料表",description:"檢視、編輯與標準化資料表內容",icon:e.jsx(Ie,{sx:{color:"#fffc",fontSize:"3.5rem"}}),onClick:s}),e.jsx(L,{title:"撰寫查詢",description:"手動撰寫 SQL 以進行自定義查詢",icon:e.jsx(ke,{sx:{color:"#fffc",fontSize:"3.5rem"}}),onClick:s}),e.jsx(u,{sx:{flex:1}}),e.jsx(L,{title:"收起側邊欄",icon:e.jsx(Jt,{sx:{color:"#fffc",fontSize:"2rem"}}),onClick:s})]})},Xt=()=>{const{updateHash:t,hash:s}=O(),[n,r]=p.useState(!1),a=()=>r(!n);return e.jsxs(K,{sx:{position:"relative",bgcolor:"primary.dark",p:2,py:4,color:"#fffc",height:1,gap:2},children:[e.jsx(M,{title:"概覽",active:s.getParts().length===0,onClick:()=>t(""),children:e.jsx(Se,{})}),e.jsx(M,{title:"資料庫結構",active:s.getParts()[0]==="schema",onClick:()=>t("schema"),children:e.jsx(Ee,{})}),e.jsx(M,{title:"資料表",children:e.jsx(Ie,{})}),e.jsx(M,{title:"撰寫查詢",children:e.jsx(ke,{})}),e.jsx(u,{sx:{flex:1}}),e.jsx(M,{title:"展開面板",onClick:a,children:e.jsx(Gt,{})}),e.jsx(Yt,{open:n,onClose:a})]})},es=y(e.jsx("path",{d:"M19 13H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-4c0-1.1-.9-2-2-2M7 19c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2M19 3H5c-1.1 0-2 .9-2 2v4c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2M7 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2"})),ts=()=>e.jsx(u,{sx:{position:"absolute",inset:0,pointerEvents:"none",overflow:"hidden",display:"flex",justifyContent:"center"},children:e.jsx(u,{sx:{position:"relative",maskImage:"radial-gradient(circle at 50% 25%, #0003 0%, #000a 100%)",bgcolor:"primary.main",fill:"var(--mui-palette-background-paper)",fillOpacity:.375,width:1,minWidth:1200,height:1},children:e.jsxs("svg",{style:{scale:"1.01 -1"},width:"100%",height:"200",viewBox:"0 0 1920 300",xmlns:"http://www.w3.org/2000/svg",preserveAspectRatio:"none",children:[e.jsx("path",{d:"M0,160 C160,180 320,140 480,160 C640,180 800,120 960,150 C1120,180 1280,130 1440,160 C1600,190 1760,150 1920,170 L1920,300 L0,300 Z"}),e.jsx("path",{d:"M0,190 C120,210 240,160 360,190 C480,220 600,140 720,180 C840,220 960,130 1080,180 C1200,230 1320,160 1440,200 C1560,240 1740,180 1920,210 L1920,300 L0,300 Z"}),e.jsx("path",{d:"M0,230 C160,250 320,190 480,230 C640,270 800,180 960,220 C1120,260 1280,170 1440,210 C1600,250 1760,200 1920,230 L1920,300 L0,300 Z"})]})})}),ss=y(e.jsx("path",{d:"M12 5V3.21c0-.45-.54-.67-.85-.35l-2.8 2.79c-.2.2-.2.51 0 .71l2.79 2.79c.32.31.86.09.86-.36V7c3.31 0 6 2.69 6 6 0 2.72-1.83 5.02-4.31 5.75-.42.12-.69.52-.69.95 0 .65.62 1.16 1.25.97C17.57 19.7 20 16.64 20 13c0-4.42-3.58-8-8-8m-6 8c0-1.34.44-2.58 1.19-3.59.3-.4.26-.95-.09-1.31-.42-.42-1.14-.38-1.5.1-1 1.34-1.6 3-1.6 4.8 0 3.64 2.43 6.7 5.75 7.67.63.19 1.25-.32 1.25-.97 0-.43-.27-.83-.69-.95C7.83 18.02 6 15.72 6 13"})),ns=y(e.jsx("path",{d:"M10 16h4c.55 0 1-.45 1-1v-5h1.59c.89 0 1.34-1.08.71-1.71L12.71 3.7a.996.996 0 0 0-1.41 0L6.71 8.29c-.63.63-.19 1.71.7 1.71H9v5c0 .55.45 1 1 1m-4 2h12c.55 0 1 .45 1 1s-.45 1-1 1H6c-.55 0-1-.45-1-1s.45-1 1-1"})),rs=()=>{const{client:t}=te.getState();if(!t)throw new Error("SQLite client is not initialized.");return t},os=()=>rs().reset(),as=()=>{const t=ge();return ye({mutationFn:os,onSuccess:()=>{t.resetQueries({queryKey:[]})},onError:s=>{console.error("重置資料庫失敗:",s),t.resetQueries({queryKey:[]})}})};function is(t,s=.9){if(!Array.isArray(t)||t.length===0)return null;if(s<0||s>1)throw new Error("Ratio must be between 0 and 1");const n=t.reduce((o,i)=>(o[i]=(o[i]||0)+1,o),{});let r=t[0],a=0;for(const[o,i]of Ge(n))i>a&&(r=o,a=i);return a/t.length>=s?r:null}const v=()=>{const{client:t}=te.getState();if(!t)throw new Error("SQLite client is not initialized.");return t},cs=async(t="database.sqlite")=>v().downloadDatabase(t),ls=async()=>await v().getDatabaseSize(),Re=async t=>{const s=v(),n=[];return await Promise.all(t.map(async r=>{(await s.exec("SELECT name FROM sqlite_master WHERE type = $type AND name NOT LIKE 'sqlite_%';",{$type:r})).forEach(o=>{typeof o.name=="string"&&n.push({type:r,name:o.name})})})),n},ds=async t=>{const s=v(),n={},r=await Re(t);return await Promise.all(r.map(async({name:a})=>{const c=`SELECT COUNT(*) as count FROM ${a};`,o=await s.exec(c);o.length>0?n[a]=Number(o[0].count??0):n[a]=0})),n},us=t=>{if(t==null)return"empty";if(typeof t=="number"&&Number.isInteger(t))return"integer";if(typeof t=="number")return"real";if(typeof t!="string")return"unknown";if(t.trim()==="")return"empty";if(/^[0-9a-f]{8}-[0-9a-f]{4}/.test(t))return"uuid";if(["true","false","0","1"].includes(t.toLowerCase()))return"boolean";if(ft(t).isValid())return"date";const n=it(()=>JSON.parse(t));if(n.error)return"text";const r=n.data;return Array.isArray(r)?"json_array":typeof r=="object"&&r!==null?"json_object":"text"},hs=async(t,s,n)=>{const r=v(),a=`SELECT "${s}" FROM "${t}" LIMIT 20;`,c=await r.exec(a);if(c.length===0)return n;const o=c.map(d=>us(d[s])).filter(d=>d!=="empty"),i=is(o,.9);return!i||i==="unknown"?n:i},ps=async t=>{const s=v(),n=`PRAGMA table_info(${t});`,r=await s.exec(n);if(r.length===0)return null;const c=(await Promise.all(r.map(o=>hs(t,o.name,o.type)))).map(o=>o.toLowerCase());return r.map((o,i)=>({...o,type:c[i]}))},xs=async t=>{const s=v(),n=`PRAGMA foreign_key_list(${t});`;return await s.exec(n)},ms=async t=>{const s=v(),n=`PRAGMA index_list(${t});`,r=await s.exec(n);return await Promise.all(r.map(async c=>{const o=`PRAGMA index_info(${c.name});`,i=await s.exec(o);return{...c,columns:i}}))},I=0,fs=()=>ye({mutationFn:cs,onSuccess:t=>{t?console.log("下載資料庫成功"):console.error("下載資料庫失敗")},onError:t=>{console.error("下載資料庫失敗:",t)}}),Ns=()=>E({queryKey:["dbBytes"],queryFn:()=>ls(),staleTime:I}),se=({types:t})=>E({queryKey:["objects",t],queryFn:()=>Re(t),staleTime:I}),Qs=({types:t})=>E({queryKey:["rowCounts",t],queryFn:()=>ds(t),staleTime:I}),Pe=({types:t})=>{const{data:s=[],isFetching:n}=se({types:t}),{data:r,isFetching:a}=E({queryKey:["tableInfos",s],queryFn:async()=>(await Promise.all(s.map(async({name:o,type:i})=>({table:o,type:i,columns:await ps(o)})))).filter(o=>o.columns!==null),enabled:s.length>0,staleTime:I});return{data:r,isFetching:n||a}},gs=({types:t})=>{const{data:s=[],isFetching:n}=se({types:t}),{data:r,isFetching:a}=E({queryKey:["foreignKeys",s],queryFn:async()=>(await Promise.all(s.map(async({name:o,type:i})=>({table:o,type:i,keys:await xs(o)})))).filter(o=>o.keys.length>0),enabled:s.length>0,staleTime:I});return{data:r,isFetching:n||a}},ys=({types:t})=>{const{data:s=[],isFetching:n}=se({types:t}),{data:r,isFetching:a}=E({queryKey:["indexes",s],queryFn:async()=>(await Promise.all(s.map(async({name:o,type:i})=>({table:o,type:i,indexes:await ms(o)})))).filter(o=>o.indexes.length>0),enabled:s.length>0,staleTime:I});return{data:r,isFetching:n||a}},Ws=()=>{const{data:t=[],isFetching:s}=Pe({types:["table","view"]}),{data:n=[],isFetching:r}=gs({types:["table","view"]}),a=p.useMemo(()=>{if(t.length===0||n.length===0)return[];const o={};return n.forEach(({keys:i})=>{i.forEach(({table:d,to:l})=>{o[d]||(o[d]=new Set),o[d].add(l)})}),t.toSorted((i,d)=>i.type.localeCompare(d.type)).map(({table:i,type:d,columns:l},x)=>{const h=n.find(({table:b})=>b===i)||null,f=l.map(b=>{var k;return{fieldName:b.name,fieldType:b.type,nullable:b.pk===1?"pk":b.notnull===0?"yes":"no",isSource:((k=o[i])==null?void 0:k.has(b.name))||!1,isTarget:(h==null?void 0:h.keys.some(U=>U.from===b.name))||!1}}),g=x%7;return{tableName:i,tableType:d,hueIndex:g,fields:f}})},[t,n]),c=p.useMemo(()=>{if(t.length===0||n.length===0)return[];const o=[];return n.forEach(({table:i,keys:d})=>{d.forEach(({from:l,to:x,table:h})=>{const f=x,g=h===i?`${l}_self`:l;o.push({id:`${h}.${g}->${i}.${f}`,source:h,target:i,sourceHandle:f,targetHandle:g})})}),o},[t,n]);return{nodes:a,edges:c,isFetching:s||r}},Zs=()=>{const{data:t=[],isFetching:s}=Pe({types:["table","view"]}),{data:n=[],isFetching:r}=ys({types:["table","view"]});return{data:p.useMemo(()=>{if(t.length===0||n.length===0)return{};const c={};return t.toSorted((o,i)=>o.type.localeCompare(i.type)).forEach(({table:o,columns:i,type:d},l)=>{c[o]={columns:i,indexes:[],type:d,hueIndex:l%7}}),n.forEach(({table:o,indexes:i})=>{c[o]&&c[o].indexes.push(...i)}),c},[t,n]),isFetching:s||r}},pe={outlined:{variant:"outlined",color:"inherit"},main:{variant:"contained",color:"inherit"},danger:{variant:"contained",color:"error"}},Z=({variant:t,sx:s,children:n,...r})=>e.jsx(F,{variant:pe[t].variant,color:pe[t].color,sx:{scale:"1.001","&:hover":{scale:"1.05"},"&:active":{scale:"0.95"},transition:"all 0.2s ease",...s},...r,children:n}),bs=()=>{const{status:t,mutate:s}=as(),{status:n,mutate:r}=fs(),[a,c]=p.useState(null),o=l=>{t!=="pending"&&c(l.currentTarget)},i=()=>{s(),c(null)},d=()=>{c(null)};return e.jsxs(u,{sx:{display:"flex",gap:1.5,color:"text.primary"},children:[e.jsx(Z,{startIcon:e.jsx(mt,{}),variant:"outlined",children:"匯入"}),e.jsx(Z,{startIcon:e.jsx(ns,{}),variant:"main",disableElevation:!0,sx:{bgcolor:"background.paper"},loading:n==="pending",onClick:()=>{n!=="pending"&&r("sqlite3.db")},children:"匯出"}),e.jsx(A,{title:e.jsx(m,{variant:"body2",children:"從伺服器複製一份副本取代目前資料"}),placement:"bottom",arrow:!0,children:e.jsx("span",{children:e.jsx(Z,{startIcon:e.jsx(ss,{}),variant:"danger",disableElevation:!0,sx:{cursor:"help",pr:2.5},loading:t==="pending",onClick:o,children:"重置"})})}),e.jsx(fe,{open:!!a,anchorEl:a,onClose:d,anchorOrigin:{vertical:"bottom",horizontal:"center"},transformOrigin:{vertical:"top",horizontal:"center"},elevation:3,children:e.jsxs(u,{sx:{p:2,maxWidth:300},children:[e.jsx(m,{variant:"subtitle1",sx:{mb:1},children:"確認重置資料庫"}),e.jsx(m,{variant:"body2",sx:{mb:2,color:"text.secondary"},children:"此操作將從伺服器複製一份新的資料庫，並覆蓋所有本地修改。為避免資料庫不一致，請先關閉所有本網站的分頁再繼續。確定要繼續嗎？"}),e.jsxs(u,{sx:{display:"flex",justifyContent:"flex-end",gap:1},children:[e.jsx(F,{variant:"outlined",size:"small",onClick:d,color:"inherit",children:"取消"}),e.jsx(F,{variant:"contained",color:"error",size:"small",onClick:i,disabled:t==="pending",disableElevation:!0,children:"確認重置"})]})]})})]})},T={color:"text.secondary"},H={...T,borderRadius:1,bgcolor:"divider",p:.7},js=()=>e.jsxs(u,{sx:{display:"flex",alignItems:"center",gap:.5},children:[e.jsx(m,{variant:"body2",sx:H,children:"⇧ Shift"}),e.jsx(m,{variant:"body2",sx:T,children:" + "}),e.jsx(m,{variant:"body2",sx:H,children:"LMB"}),e.jsx(m,{variant:"body2",sx:T,children:"可選取方框範圍內的所有項目，"}),e.jsx(m,{variant:"body2",sx:H,children:"⌘ / Ctrl"}),e.jsx(m,{variant:"body2",sx:T,children:" + "}),e.jsx(m,{variant:"body2",sx:H,children:"LMB"}),e.jsx(m,{variant:"body2",sx:T,children:"可多選個別項目。"})]}),Me={home:"概覽",schema:"結構圖"},ws={home:e.jsx(bs,{}),schema:e.jsx(js,{})},vs=t=>Object.keys(Me).includes(t),Cs=()=>{const[t,s]=p.useState(null),n=x=>s(h=>h?null:x.currentTarget),r=()=>s(null),{updateSearchParams:a,searchParams:c,hash:o}=O(),i=x=>()=>{a({db:x}),s(null)},d=o.getParts(),l=d[0]||"home";if(!vs(l)||d.length>1)throw new Error(`頁面不存在: ${o.get()}`);return e.jsxs(u,{sx:{position:"relative",p:5,overflow:"hidden",borderRadius:4,borderTopLeftRadius:0,borderTopRightRadius:0},children:[e.jsx(ts,{}),e.jsxs(u,{sx:{position:"relative",display:"flex",justifyContent:"space-between",alignItems:"flex-end"},children:[e.jsxs(u,{children:[e.jsxs(u,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(es,{fontSize:"small",sx:{color:"text.secondary"}}),e.jsxs(Rt,{children:[e.jsx(m,{variant:"body2",sx:{color:"text.secondary"},children:"資料庫"}),e.jsx(m,{variant:"body2",sx:{"&:hover":{textDecoration:"underline"},cursor:"pointer",color:"text.primary"},onClick:n,children:"論壇資料庫"})]}),e.jsx(Je,{open:!!t,anchorEl:t,onClose:r,children:e.jsx(w,{onClick:r,selected:(c.get("db")||"forum")==="forum",children:e.jsx(m,{variant:"body2",sx:{color:"text.primary"},onClick:i("forum"),children:"論壇資料庫"})})})]}),e.jsx(m,{variant:"h4",component:"h2",sx:{pt:1.5},children:Me[l]})]}),ws[l]]})]})},Ss="modulepreload",Es=function(t){return"/"+t},xe={},V=function(s,n,r){let a=Promise.resolve();if(n&&n.length>0){document.getElementsByTagName("link");const o=document.querySelector("meta[property=csp-nonce]"),i=(o==null?void 0:o.nonce)||(o==null?void 0:o.getAttribute("nonce"));a=Promise.allSettled(n.map(d=>{if(d=Es(d),d in xe)return;xe[d]=!0;const l=d.endsWith(".css"),x=l?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${d}"]${x}`))return;const h=document.createElement("link");if(h.rel=l?"stylesheet":Ss,l||(h.as="script"),h.crossOrigin="",h.href=d,i&&h.setAttribute("nonce",i),document.head.appendChild(h),l)return new Promise((f,g)=>{h.addEventListener("load",f),h.addEventListener("error",()=>g(new Error(`Unable to preload CSS for ${d}`)))})}))}function c(o){const i=new Event("vite:preloadError",{cancelable:!0});if(i.payload=o,window.dispatchEvent(i),!i.defaultPrevented)throw o}return a.then(o=>{for(const i of o||[])i.status==="rejected"&&c(i.reason);return s().catch(c)})},Gs={xs:4,md:6,xl:8},Is={xs:3,md:4,xl:5},Js={xs:1,md:2,xl:3},Ys={xs:0,md:0,xl:0},Xs={color:"background.paper",bgcolor:"primary.main",borderRadius:1,p:1,fontSize:"3rem"},en={"&:hover":{textDecoration:"underline"},cursor:"pointer"},tn={display:"-webkit-box",WebkitLineClamp:1,WebkitBoxOrient:"vertical",overflow:"hidden",textOverflow:"ellipsis",wordBreak:"break-all"},sn="all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",ks=p.lazy(()=>V(()=>import("./LargeTiles-CSl5OyVa.js"),__vite__mapDeps([0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18])).then(t=>({default:t.LargeTiles}))),Rs=p.lazy(()=>V(()=>import("./SmallTiles-B-kniDDN.js"),__vite__mapDeps([19,1,20,2,3,4,12,5,21,6,14,15,16,17,18])).then(t=>({default:t.SmallTiles}))),Ps=p.lazy(()=>V(()=>import("./Sidebar-D_ePTDnV.js"),__vite__mapDeps([22,1,9,23,24,25,5,13,3,4,14,15,16,17,18]))),Ms=p.lazy(()=>V(()=>import("./FlowChart-CRjUj3Q3.js"),__vite__mapDeps([26,1,27,23,8,9,10,5,11,3,4,21,14,15,16,17,18]))),J={borderRadius:4,boxShadow:"none",flex:1},Le={home:()=>e.jsxs(G,{sx:{...J,p:Is},children:[e.jsx(Rs,{}),e.jsx(ks,{})]}),schema:()=>e.jsxs(G,{sx:{...J,position:"relative",overflow:"hidden",display:"flex",alignItems:"stretch"},children:[e.jsx("title",{children:"資料樣板 | 結構圖"}),e.jsx(Ps,{}),e.jsx(Ms,{})]})},Ls=t=>Object.keys(Le).includes(t),Ts=()=>e.jsx(G,{sx:{...J,position:"relative",display:"grid",placeItems:"stretch"},children:e.jsx(u,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center"},children:e.jsx(Ye,{})})}),Ds=()=>{const{hash:t}=O(),s=t.getParts(),n=s[0]||"home";if(!Ls(n)||s.length>1)throw new Error(`頁面不存在: ${t.get()}`);return e.jsx(p.Suspense,{fallback:e.jsx(Ts,{}),children:Le[n]()})},Fs=()=>(zt(),null);function Bs(){const{isSm:t}=be();return t?e.jsxs(he,{children:[e.jsx(Fs,{}),e.jsx(Zt,{}),e.jsxs(u,{component:"main",sx:{position:"relative",display:"flex",height:`calc(100dvh - ${ve}px)`},children:[e.jsx(u,{sx:{position:"absolute",inset:0,bgcolor:"primary.main",opacity:.2,pointerEvents:"none"}}),e.jsx(Xt,{}),e.jsx(u,{sx:{position:"relative",flex:1,height:1,overflow:"auto"},id:"scroll-area",children:e.jsxs(K,{sx:{minHeight:1,gap:3,px:2,pb:3},children:[e.jsx(Cs,{}),e.jsx(Ds,{})]})})]})]}):e.jsx(he,{children:e.jsx(qt,{})})}Xe.createRoot(document.getElementById("root")).render(e.jsx(p.StrictMode,{children:e.jsx(Bs,{})}));export{Qt as A,ss as R,en as a,Pe as b,sn as c,O as d,tn as e,Ws as f,Ns as g,se as h,Zs as i,Gs as l,Is as m,Ys as n,Js as s,Xs as t,Qs as u};
