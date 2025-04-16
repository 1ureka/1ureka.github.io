import{r as a,h as b,j as e,f as N,i as C,p as Q,C as q,q as G,o as J,I as j,l as K,B as i,x as F,T as u,ap as M,S as T,L as E,aj as X,n as z,t as _}from"./Toast-DFhmycbX.js";import{L as Y,C as Z}from"./LightModeRounded-DjiWPopD.js";import{Q as ee,b as te,E as re}from"./react-error-boundary.esm-tCjZQMqL.js";import{I as oe,S as se,E as ne,D as W}from"./ExpandMoreRounded-DwbyZy5l.js";import{T as f}from"./Tooltip-DBfet0F0.js";import{B as g,S as ie}from"./Motion-DH1gSD0B.js";import{D as ae}from"./DarkModeRounded-DnQ6G5u7.js";import{A as le}from"./ArrowDropDownRounded-BvlBdhXR.js";import{P as B}from"./PublishRounded-DjbyFT6c.js";import{a as A}from"./formatters-C9bWSe0O.js";import{u as k,m as ce,M as $,n as de,f as ue,a as pe,i as D,b as xe}from"./proxy-Dz7OrOhq.js";function he(t){const r=k(()=>ce(t)),{isStatic:s}=a.useContext($);if(s){const[,o]=a.useState(t);a.useEffect(()=>r.on("change",o),[])}return r}function me(t,r={}){const{isStatic:s}=a.useContext($),o=a.useRef(null),n=k(()=>D(t)?t.get():t),l=k(()=>typeof n=="string"?n.replace(/[\d.-]/g,""):void 0),c=he(n),d=a.useRef(n),y=a.useRef(de),v=()=>{h(),o.current=xe({keyframes:[L(c.get()),L(d.current)],velocity:c.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...r,onUpdate:y.current})},h=()=>{o.current&&o.current.stop()};return a.useInsertionEffect(()=>c.attach((m,p)=>s?p(m):(d.current=m,y.current=x=>p(H(x,l)),ue.postRender(v),c.get()),h),[JSON.stringify(r)]),pe(()=>{if(D(t))return t.on("change",m=>c.set(H(m,l)))},[c,l]),c}function H(t,r){return r?t+r:t}function L(t){return typeof t=="number"?t:parseFloat(t)}const ge=b(e.jsx("path",{d:"M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23c-.25-.44-.79-.62-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41c-.02.22-.03.44-.03.67s.01.45.03.68l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5"})),fe=b(e.jsx("path",{d:"M19 9H5c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1M5 15h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1"})),R=N({cssVariables:{colorSchemeSelector:".mode-%s"},typography:{fontFamily:'Comfortaa, "jf openhuninn"'},colorSchemes:{light:{palette:{border:{main:"var(--mui-palette-divider)"},text:{colored:"color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)"},primary:{main:"#d077a1"},background:{paper:"#f9f9f9",default:"#f3f3f3"}}},dark:{palette:{border:{main:"transparent"},text:{colored:"color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)"},primary:{main:"#d077a1"},background:{paper:"#272727",default:"#202020"}}}},components:{MuiInputBase:{defaultProps:{sx:{"&.Mui-disabled::before":{borderBottomStyle:"solid"}}}},MuiButton:{styleOverrides:{contained:{"&:hover":{backgroundColor:"var(--mui-palette-primary-light)"}}}}},spacing:"0.5rem"}),je=()=>{const t=C(R.breakpoints.up("lg")),r=C(R.breakpoints.up("md")),s=C(R.breakpoints.up("sm"));return a.useEffect(()=>{t&&(document.documentElement.style.fontSize="16px")},[t,r,s]),{isLg:t,isMd:r,isSm:s}},be=new ee;function ye({children:t}){return e.jsxs(Q,{theme:R,children:[e.jsx(q,{}),e.jsx(G,{}),e.jsx(te,{client:be,children:e.jsx(re,{fallbackRender:r=>e.jsx("div",{children:JSON.stringify(r)}),children:t})})]})}const ve=()=>{const[t,r]=a.useState(""),s=l=>r(l.target.value),o="#"+t,n=({key:l})=>{if(l==="Enter"){if(!t.trim())return console.error("請輸入搜尋內容");console.log("還沒寫完，請稍後再試"),window.location.href="#"}};return e.jsx(J,{variant:"filled",label:"搜尋",size:"small",sx:{width:"37.5vw",maxWidth:"30rem",minWidth:"15rem",scale:"0.9",transformOrigin:"left"},value:t,onChange:s,onKeyDown:n,slotProps:{input:{sx:{borderRadius:2,overflow:"hidden","&::before":{borderBottom:0},"&:hover:not(.Mui-disabled, .Mui-error):before":{borderBottom:0}},endAdornment:e.jsx(f,{title:t.trim()?"搜尋":"請輸入搜尋內容",arrow:!0,children:e.jsx(oe,{position:"end",children:e.jsx(j,{edge:"end",href:o,disabled:!t.trim(),children:e.jsx(se,{})})})})}}})},we=()=>{const{mode:t,setMode:r,systemMode:s}=K(),o=t==="light"||s==="light",n=t==="dark"||s==="dark";return e.jsxs(i,{sx:{position:"relative",p:.5,gap:.5,bgcolor:"action.hover",borderRadius:2,display:"flex",alignItems:"center"},children:[e.jsx(g,{layout:!0,sx:{position:"absolute",left:o?0:void 0,ml:o?.5:void 0,right:n?0:void 0,mr:n?.5:void 0,p:1,width:"1.25rem",height:"1.25rem",boxSizing:"content-box",bgcolor:"primary.light",borderRadius:1.5}}),e.jsx(j,{onClick:()=>r("light"),centerRipple:!1,sx:{position:"relative",borderRadius:1.5,overflow:"hidden",color:o?"background.paper":void 0,transition:"0.25s all ease"},children:e.jsx(Y,{fontSize:"small"})}),e.jsx(j,{onClick:()=>r("dark"),centerRipple:!1,sx:{position:"relative",borderRadius:1.5,overflow:"hidden",color:n?"background.paper":void 0,transition:"0.25s all ease"},children:e.jsx(ae,{fontSize:"small"})})]})},Re=()=>e.jsxs(F,{sx:{display:"flex",alignItems:"center",p:.5,pr:0,borderRadius:2,textAlign:"left","&:hover":{bgcolor:"action.hover"}},children:[e.jsx(i,{sx:{width:"2.3rem",aspectRatio:1,borderRadius:1.5,bgcolor:"primary.light",display:"grid",placeItems:"center",mr:1},children:e.jsx(u,{variant:"h6",component:"span",sx:{color:"primary.contrastText"},children:"1"})}),e.jsx(u,{variant:"subtitle1",component:"h6",children:"1ureka"}),e.jsx(i,{sx:{color:"text.secondary"},children:e.jsx(le,{color:"inherit"})})]}),V=b(e.jsx("path",{d:"M20 6h-8l-1.41-1.41C10.21 4.21 9.7 4 9.17 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-2 8h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2h-2c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1"})),Se=b(e.jsx("path",{d:"M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2m-10.6-3.47 1.63 2.18 2.58-3.22c.2-.25.58-.25.78 0l2.96 3.7c.26.33.03.81-.39.81H9c-.41 0-.65-.47-.4-.8l2-2.67c.2-.26.6-.26.8 0M2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1"})),Ie=b(e.jsx("path",{d:"m19 18 2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2"})),w=b(e.jsx("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96"})),P=b(e.jsx("path",{d:"M20 6h-8l-1.41-1.41C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-1 12H5c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1"})),Ce=b(e.jsx("path",{d:"M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"})),Me={borderRadius:2,"& svg":{transition:"scale 0.15s ease"},"&:active svg":{scale:"0.5 1"}},ke=({onClick:t})=>e.jsx(j,{onClick:t,centerRipple:!1,sx:Me,children:e.jsx(Ce,{})}),O=t=>t.some(r=>r.active?!0:r.children&&r.children.length>0?O(r.children):!1),S=({expanded:t,active:r,icon:s,title:o,action:n,onClick:l,children:c,nestedLevel:d})=>{const[y,v]=a.useState(!1),[h,m]=a.useState(d===void 0),p=r||O(c??[]);return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:t?null:e.jsx(u,{variant:"body2",children:o}),arrow:!0,placement:"right",children:e.jsx(g,{layout:!0,sx:{width:1},children:e.jsxs(F,{onClick:l,sx:{pl:d?d*2:0,width:t?1:void 0,borderRadius:2,display:"flex",justifyContent:t?"space-between":"center",alignItems:"center",bgcolor:p?"FilledInput.bg":"transparent","&:hover":{bgcolor:"action.hover"}},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:3,p:1.2},children:[e.jsx(i,{sx:{color:"action.active",display:"contents"},children:s}),t&&e.jsx(u,{variant:"subtitle1",component:"h6",sx:{...M,lineHeight:1},children:o})]}),t&&e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:1},children:[n,c&&c.length>0&&e.jsx(f,{title:e.jsx(u,{variant:"body2",children:h?"收起資料夾":"展開資料夾"}),placement:"right",arrow:!0,children:e.jsx(j,{centerRipple:!1,sx:{borderRadius:2},onMouseDown:x=>x.stopPropagation(),onClick:x=>{x.stopPropagation(),m(I=>!I)},component:"span",children:e.jsx(ne,{fontSize:"small",sx:{rotate:h?"180deg":"0deg",transition:"rotate 0.2s ease"}})})})]}),p&&e.jsx(g,{layoutId:`selected-bar-${d??-1}`,onLayoutAnimationStart:()=>v(!0),onLayoutAnimationComplete:()=>v(!1),sx:{position:"absolute",inset:"0 auto 0 0",display:"grid",placeItems:"center"},children:e.jsx(i,{sx:{px:.2,height:.5,bgcolor:"primary.main",borderRadius:99,translate:"-50%",scale:y?"1 1.5":"1 1",transition:"scale 0.7s cubic-bezier(0.4, 0, 0.25, 1)",transitionDuration:y?"0.2s":"0.7s"}})})]})})}),c&&c.length>0&&t?e.jsx(ie,{sx:{gap:.5,width:1,clipPath:"polygon(-50% 0, 150% 0, 150% 100%, -50% 100%)",transformOrigin:"top"},transition:{type:"spring",bounce:.3},variants:{initial:{height:0,x:-20,opacity:0},animate:{height:"auto",x:0,opacity:1}},initial:"initial",animate:h?"animate":"initial",children:c.map((x,I)=>e.jsx(S,{...x,expanded:t,nestedLevel:(d??0)+1},I))}):e.jsx(e.Fragment,{})]})},Ee=({expanded:t})=>{const s=685362447908864e-7,o=s/104857600*100,n=`已使用 ${A(s)}，總共 ${A(104857600)} (${o.toFixed(2)}%)`;return t?e.jsx(i,{sx:{ml:-1,p:1,borderTop:1,borderColor:"divider",width:1,boxSizing:"content-box"},children:e.jsxs(i,{sx:{p:3,display:"flex",gap:2},children:[e.jsxs(i,{sx:{color:"text.secondary",display:"grid",placeItems:"center",height:"fit-content",position:"relative"},children:[e.jsx(w,{color:"inherit",sx:{opacity:0}}),e.jsx(g,{layoutId:"cloud-icon",layout:"position",sx:{color:"text.secondary",position:"absolute"},children:e.jsx(w,{color:"inherit",sx:{display:"block"}})})]}),e.jsxs(T,{sx:{width:1,gap:1,"& p":M,"& h6":M},children:[e.jsx(u,{variant:"subtitle1",children:"儲存空間"}),e.jsx(E,{variant:"determinate",value:o,sx:{borderRadius:9}}),e.jsx(f,{title:e.jsx(u,{variant:"body2",children:n}),arrow:!0,placement:"right",children:e.jsx(u,{variant:"body2",sx:{color:"text.secondary",...X},children:n})}),e.jsx(g,{layoutId:"import-button",layout:"position",children:e.jsx(z,{variant:"contained",size:"small",disableElevation:!0,startIcon:e.jsx(B,{}),fullWidth:!0,sx:{borderRadius:1.5,flexWrap:"nowrap"},children:e.jsx(u,{variant:"body2",children:"匯入"})})})]})]})}):e.jsxs(e.Fragment,{children:[e.jsx(f,{title:e.jsx(u,{variant:"body2",children:n}),arrow:!0,placement:"right",children:e.jsxs(i,{sx:{color:"text.secondary",display:"grid",placeItems:"center",width:"2.5rem",p:.5,bgcolor:"action.hover",borderRadius:2},children:[e.jsxs(i,{sx:{width:0,display:"grid",placeItems:"center"},children:[e.jsx(i,{sx:{opacity:0},children:e.jsx(w,{color:"inherit",sx:{translate:"-50%"}})}),e.jsx(g,{layoutId:"cloud-icon",layout:"position",sx:{position:"absolute"},children:e.jsx(w,{color:"inherit"})})]}),e.jsx(E,{variant:"determinate",value:o,sx:{borderRadius:9,width:1}})]})}),e.jsx(f,{title:e.jsx(u,{variant:"body2",children:"從本地匯入圖片"}),arrow:!0,placement:"right",children:e.jsx(g,{layoutId:"import-button",layout:"position",children:e.jsx(z,{variant:"contained",size:"small",disableElevation:!0,sx:{borderRadius:2,flexWrap:"nowrap",p:1,minWidth:0,width:"2.5rem",height:"2.5rem",mt:.5},children:e.jsx(B,{})})})})]})},ze=({onMenuClick:t,expanded:r})=>{const[s,o]=a.useState(0);return e.jsxs(T,{sx:{gap:.5,p:1,pr:0,alignItems:"flex-start",minHeight:1},children:[e.jsx(ke,{onClick:t}),!r&&e.jsx(g,{layoutId:"add-folder",children:e.jsx(f,{title:e.jsx(u,{variant:"body2",children:"新增資料夾"}),arrow:!0,placement:"right",children:e.jsx(j,{centerRipple:!1,sx:{borderRadius:2,width:"2.5rem",height:"2.5rem"},onMouseDown:n=>n.stopPropagation(),onClick:n=>n.stopPropagation(),children:e.jsx(V,{fontSize:"small"})})})}),e.jsx(S,{expanded:r,active:s===0,icon:e.jsx(Se,{fontSize:"small",color:"inherit"}),title:"圖庫",action:e.jsx(g,{layoutId:"add-folder",children:e.jsx(f,{title:e.jsx(u,{variant:"body2",children:"新增資料夾"}),arrow:!0,placement:"right",children:e.jsx(j,{centerRipple:!1,sx:{borderRadius:2},onMouseDown:n=>n.stopPropagation(),onClick:n=>n.stopPropagation(),component:"span",children:e.jsx(V,{fontSize:"small"})})})}),onClick:()=>o(0)}),e.jsx(S,{expanded:r,active:s===1,icon:e.jsx(Ie,{fontSize:"small",color:"inherit"}),title:"我的最愛",onClick:()=>o(1)}),e.jsx(W,{flexItem:!0}),e.jsx(S,{expanded:r,active:s===2,icon:e.jsx(w,{fontSize:"small",color:"inherit"}),title:"個人相簿",onClick:()=>o(2),children:[...Array(5)].map((n,l)=>({active:s===l+3,icon:e.jsx(P,{fontSize:"small",color:"inherit"}),title:`資料夾${l+1}`,onClick:()=>o(l+3),children:l===3?[...Array(2)].map((c,d)=>({active:s===d+8,icon:e.jsx(P,{fontSize:"small",color:"inherit"}),title:`子資料夾${d+1}`,onClick:()=>o(d+8)})):[]}))}),e.jsx(i,{sx:{flex:1}}),e.jsx(Ee,{expanded:r})]})},U=72,Be=()=>{const t=a.useRef(320),r=a.useRef(64),s=me(t.current,{bounce:.3}),[o,n]=a.useState(!1),[l,c]=a.useState(!0),d=a.useRef(null),y=()=>{c(p=>(p?s.set(r.current):s.set(t.current),!p))},v=()=>{n(!0),document.body.style.cursor="ew-resize",document.getElementById("root").style.pointerEvents="none"},h=a.useCallback(()=>{n(!1),document.body.style.cursor="default",document.getElementById("root").style.pointerEvents=""},[]),m=a.useCallback(p=>{if(!o||!d.current)return;const x=p.clientX-d.current.getBoundingClientRect().left;x>=200&&x<=800&&(t.current=x,s.set(x))},[o,s]);return a.useEffect(()=>(window.addEventListener("mousemove",m),window.addEventListener("mouseup",h),()=>{window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",h)}),[m,h]),e.jsxs(i,{sx:{display:"flex",height:`calc(100dvh - ${U}px)`,position:"relative"},children:[e.jsx(g,{ref:d,sx:{height:1,overflowY:"auto",overflowX:"hidden",scrollbarGutter:"stable"},style:{width:s},children:e.jsx(ze,{expanded:l,onMenuClick:y})}),e.jsxs(i,{sx:{position:"relative",height:1,flex:1,overflow:"hidden",bgcolor:"background.paper",borderRadius:p=>`${p.shape.borderRadius*6}px 0 0 0`,border:1,borderColor:"border.main"},children:[e.jsx(i,{sx:{height:1,overflow:"auto",scrollbarGutter:"stable"},children:e.jsx(i,{sx:{height:1500}})}),e.jsx(i,{onMouseDown:v,sx:{position:"absolute",inset:"0 auto 0 0",cursor:"ew-resize","&:hover":{bgcolor:"action.hover"},display:"grid",pointerEvents:o||!l?"none":"auto",opacity:l?1:0,bgcolor:o?"divider":"transparent",scale:o?"0.7 1":"1 1",transformOrigin:"left",transition:"all 0.2s ease",placeItems:"center"},children:e.jsx(fe,{sx:{fontSize:"1.2rem",color:"text.secondary",rotate:"90deg",scale:"1.5 1"}})})]})]})};function Ae(){return je(),e.jsxs(ye,{children:[e.jsxs(i,{component:"header",sx:{display:"flex",alignItems:"center",justifyContent:"space-between",p:1.5,px:{xs:1.5,sm:3.5},height:U},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:1},children:[e.jsx(Z,{sx:{fontSize:"3em",color:"primary.main"}}),e.jsx(u,{variant:"h4",component:"h1",sx:{fontFamily:'"timemachine-wa"',color:"text.colored"},children:"相簿樣板"})]}),e.jsx(ve,{})]}),e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(j,{sx:{borderRadius:2,overflow:"hidden","&:hover > p":{ml:1,width:"2rem",opacity:1}},centerRipple:!1,children:[e.jsx(ge,{}),e.jsx(u,{variant:"body1",sx:{ml:0,textWrap:"nowrap",width:0,opacity:0,transition:"0.2s all ease"},children:"設定"})]}),e.jsx(we,{}),e.jsx(W,{flexItem:!0,orientation:"vertical"}),e.jsx(Re,{})]})]}),e.jsx(Be,{})]})}_.createRoot(document.getElementById("root")).render(e.jsx(a.StrictMode,{children:e.jsx(Ae,{})}));
