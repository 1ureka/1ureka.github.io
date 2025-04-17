import{r as a,h as b,j as e,f as _,i as R,B as i,S as k,T as p,n as I,t as G,p as K,C as X,q as J,o as Y,I as j,l as Z,y as W,ar as E,L as A,al as ee,v as te}from"./routes-DSS9LKLr.js";import{C as T,L as se}from"./LightModeRounded-BVPSujkA.js";import{R as oe,Q as ne,b as re,E as ie}from"./RefreshRounded-Cbc-M9dA.js";import{A as ae,a as ce}from"./ArrowDropDownRounded-C-bqklcR.js";import{E as le}from"./ErrorOutlineRounded-Cn_6pIwV.js";import{I as de,S as pe,E as xe,D as O}from"./ExpandMoreRounded-He5Ma60b.js";import{T as f}from"./Tooltip-4_5Bwrwa.js";import{B as g,S as ue}from"./Motion-CvsZx3N4.js";import{D as he}from"./DarkModeRounded-Dwbm1YBu.js";import{P as D}from"./PublishRounded-DF6G-VuS.js";import{a as B}from"./formatters-C9bWSe0O.js";import{u as z,m as me,M as $,n as ge,f as fe,a as je,i as F,b as be}from"./proxy-3iHDZR4I.js";function ye(t){const s=z(()=>me(t)),{isStatic:o}=a.useContext($);if(o){const[,n]=a.useState(t);a.useEffect(()=>s.on("change",n),[])}return s}function ve(t,s={}){const{isStatic:o}=a.useContext($),n=a.useRef(null),r=z(()=>F(t)?t.get():t),c=z(()=>typeof r=="string"?r.replace(/[\d.-]/g,""):void 0),l=ye(r),d=a.useRef(r),y=a.useRef(ge),v=()=>{h(),n.current=be({keyframes:[P(l.get()),P(d.current)],velocity:l.getVelocity(),type:"spring",restDelta:.001,restSpeed:.01,...s,onUpdate:y.current})},h=()=>{n.current&&n.current.stop()};return a.useInsertionEffect(()=>l.attach((m,x)=>o?x(m):(d.current=m,y.current=u=>x(H(u,c)),fe.postRender(v),l.get()),h),[JSON.stringify(s)]),je(()=>{if(F(t))return t.on("change",m=>l.set(H(m,c)))},[l,c]),l}function H(t,s){return s?t+s:t}function P(t){return typeof t=="number"?t:parseFloat(t)}const we=b(e.jsx("path",{d:"M19.5 12c0-.23-.01-.45-.03-.68l1.86-1.41c.4-.3.51-.86.26-1.3l-1.87-3.23c-.25-.44-.79-.62-1.25-.42l-2.15.91c-.37-.26-.76-.49-1.17-.68l-.29-2.31c-.06-.5-.49-.88-.99-.88h-3.73c-.51 0-.94.38-1 .88l-.29 2.31c-.41.19-.8.42-1.17.68l-2.15-.91c-.46-.2-1-.02-1.25.42L2.41 8.62c-.25.44-.14.99.26 1.3l1.86 1.41c-.02.22-.03.44-.03.67s.01.45.03.68l-1.86 1.41c-.4.3-.51.86-.26 1.3l1.87 3.23c.25.44.79.62 1.25.42l2.15-.91c.37.26.76.49 1.17.68l.29 2.31c.06.5.49.88.99.88h3.73c.5 0 .93-.38.99-.88l.29-2.31c.41-.19.8-.42 1.17-.68l2.15.91c.46.2 1 .02 1.25-.42l1.87-3.23c.25-.44.14-.99-.26-1.3l-1.86-1.41c.03-.23.04-.45.04-.68m-7.46 3.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5"})),Ie=b(e.jsx("path",{d:"M19 9H5c-.55 0-1 .45-1 1s.45 1 1 1h14c.55 0 1-.45 1-1s-.45-1-1-1M5 15h14c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1 .45-1 1s.45 1 1 1"})),S=_({cssVariables:{colorSchemeSelector:".mode-%s"},typography:{fontFamily:'Comfortaa, "jf openhuninn"'},colorSchemes:{light:{palette:{border:{main:"var(--mui-palette-divider)"},text:{colored:"color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)"},primary:{main:"#d077a1"},background:{paper:"#f9f9f9",default:"#f3f3f3"}}},dark:{palette:{border:{main:"transparent"},text:{colored:"color-mix(in srgb, var(--mui-palette-primary-main) 50%, var(--mui-palette-text-primary) 50%)"},primary:{main:"#d077a1"},background:{paper:"#272727",default:"#202020"}}}},components:{MuiInputBase:{defaultProps:{sx:{"&.Mui-disabled::before":{borderBottomStyle:"solid"}}}},MuiButton:{styleOverrides:{contained:{"&:hover":{backgroundColor:"var(--mui-palette-primary-light)"}}}}},spacing:"0.5rem"}),U=()=>{const t=R(S.breakpoints.up("lg")),s=R(S.breakpoints.up("md")),o=R(S.breakpoints.up("sm"));return a.useEffect(()=>{t&&(document.documentElement.style.fontSize="16px")},[t,s,o]),{isLg:t,isMd:s,isSm:o}};class Re extends Error{constructor(s,o){super(o),this.name=s,Object.setPrototypeOf(this,new.target.prototype)}}class q extends Re{constructor(s){super("ScreenWidthError",`請使用寬度超過 ${s}px 的裝置或將視窗放大，以使用此應用程式。`),Object.setPrototypeOf(this,new.target.prototype)}}const Se=({error:t,resetErrorBoundary:s})=>{const{isSm:o,isMd:n}=U(),r=t instanceof Error,c=t instanceof q,l=r?t.name:"UnknownError",d=l==="AbortError"||l==="NetworkError"||l==="TypeError"||c;return a.useEffect(()=>{c&&o&&(s==null||s())},[c,o,s]),e.jsxs(i,{sx:{position:"fixed",inset:0,display:"grid",placeItems:"center",p:2,bgcolor:"background.default"},children:[e.jsx(i,{sx:{position:"absolute",inset:0,...n?{}:{left:"50%",right:"-50%"},pointerEvents:"none",display:"grid",placeItems:"center",containerType:"inline-size"},children:e.jsx(T,{color:"primary",sx:{position:"absolute",aspectRatio:"1/1",width:"max(135cqw, 120cqh)",height:"auto"}})}),e.jsx(i,{sx:{position:"relative",display:"grid",placeItems:"center"},children:e.jsxs(k,{sx:{gap:5,alignItems:"center"},children:[e.jsxs(i,{sx:{position:"relative"},children:[e.jsx(p,{variant:"h2",component:"h1",sx:{position:"absolute",inset:0,fontFamily:'"timemachine-wa"',WebkitTextStroke:"15px var(--mui-palette-background-default)"},children:"相簿樣板"}),e.jsx(p,{variant:"h2",component:"h1",sx:{position:"relative",fontFamily:'"timemachine-wa"',color:"primary.main"},children:"相簿樣板"})]}),e.jsxs(k,{sx:{gap:1,alignItems:"center"},children:[e.jsx(p,{variant:"h5",component:"h3",children:"發生錯誤"}),e.jsx(p,{variant:"body1",sx:{color:"text.secondary"},children:(t==null?void 0:t.message)||"未知錯誤"})]}),e.jsxs(i,{sx:{display:"flex",gap:2,mt:2,color:"text.secondary"},children:[!d&&e.jsx(I,{variant:"outlined",color:"inherit",disableElevation:!0,href:G.photos_home,startIcon:e.jsx(ae,{}),children:"返回首頁"}),!d&&s&&e.jsx(I,{variant:"text",color:"inherit",onClick:()=>s(),startIcon:e.jsx(oe,{}),children:"重新載入"}),d&&e.jsx(I,{variant:"outlined",color:"inherit",startIcon:e.jsx(le,{}),sx:{pointerEvents:"none"},children:"該錯誤無法透過重新載入修正"})]})]})})]})},Ce=new ne;function ke({children:t}){return e.jsxs(K,{theme:S,children:[e.jsx(X,{}),e.jsx(J,{}),e.jsx(re,{client:Ce,children:e.jsx(ie,{fallbackRender:s=>e.jsx(Se,{...s}),children:t})})]})}const Me=()=>{const[t,s]=a.useState(""),o=c=>s(c.target.value),n="#"+t,r=({key:c})=>{if(c==="Enter"){if(!t.trim())return console.error("請輸入搜尋內容");console.log("還沒寫完，請稍後再試"),window.location.href="#"}};return e.jsx(Y,{variant:"filled",label:"搜尋",size:"small",sx:{width:"37.5vw",maxWidth:"30rem",minWidth:"15rem",scale:"0.9",transformOrigin:"left"},value:t,onChange:o,onKeyDown:r,slotProps:{input:{sx:{borderRadius:2,overflow:"hidden","&::before":{borderBottom:0},"&:hover:not(.Mui-disabled, .Mui-error):before":{borderBottom:0}},endAdornment:e.jsx(f,{title:t.trim()?"搜尋":"請輸入搜尋內容",arrow:!0,children:e.jsx(de,{position:"end",children:e.jsx(j,{edge:"end",href:n,disabled:!t.trim(),children:e.jsx(pe,{})})})})}}})},Ee=()=>{const{mode:t,setMode:s,systemMode:o}=Z(),n=t==="light"||o==="light",r=t==="dark"||o==="dark";return e.jsxs(i,{sx:{position:"relative",p:.5,gap:.5,bgcolor:"action.hover",borderRadius:2,display:"flex",alignItems:"center"},children:[e.jsx(g,{layout:!0,sx:{position:"absolute",left:n?0:void 0,ml:n?.5:void 0,right:r?0:void 0,mr:r?.5:void 0,p:1,width:"1.25rem",height:"1.25rem",boxSizing:"content-box",bgcolor:"primary.light",borderRadius:1.5}}),e.jsx(j,{onClick:()=>s("light"),centerRipple:!1,sx:{position:"relative",borderRadius:1.5,overflow:"hidden",color:n?"background.paper":void 0,transition:"0.25s all ease"},children:e.jsx(se,{fontSize:"small"})}),e.jsx(j,{onClick:()=>s("dark"),centerRipple:!1,sx:{position:"relative",borderRadius:1.5,overflow:"hidden",color:r?"background.paper":void 0,transition:"0.25s all ease"},children:e.jsx(he,{fontSize:"small"})})]})},ze=()=>{throw new Error("Menu is not implemented yet.")},Ae=()=>{const[t,s]=a.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsxs(W,{onClick:()=>s(!0),sx:{display:"flex",alignItems:"center",p:.5,pr:0,borderRadius:2,textAlign:"left","&:hover":{bgcolor:"action.hover"}},children:[e.jsx(i,{sx:{width:"2.3rem",aspectRatio:1,borderRadius:1.5,bgcolor:"primary.light",display:"grid",placeItems:"center",mr:1},children:e.jsx(p,{variant:"h6",component:"span",sx:{color:"primary.contrastText"},children:"1"})}),e.jsx(p,{variant:"subtitle1",component:"h6",children:"1ureka"}),e.jsx(i,{sx:{color:"text.secondary"},children:e.jsx(ce,{color:"inherit"})})]}),t&&e.jsx(ze,{})]})},L=b(e.jsx("path",{d:"M20 6h-8l-1.41-1.41C10.21 4.21 9.7 4 9.17 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-2 8h-2v2c0 .55-.45 1-1 1s-1-.45-1-1v-2h-2c-.55 0-1-.45-1-1s.45-1 1-1h2v-2c0-.55.45-1 1-1s1 .45 1 1v2h2c.55 0 1 .45 1 1s-.45 1-1 1"})),De=b(e.jsx("path",{d:"M22 16V4c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2m-10.6-3.47 1.63 2.18 2.58-3.22c.2-.25.58-.25.78 0l2.96 3.7c.26.33.03.81-.39.81H9c-.41 0-.65-.47-.4-.8l2-2.67c.2-.26.6-.26.8 0M2 7v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H5c-.55 0-1-.45-1-1V7c0-.55-.45-1-1-1s-1 .45-1 1"})),Be=b(e.jsx("path",{d:"m19 18 2 1V3c0-1.1-.9-2-2-2H8.99C7.89 1 7 1.9 7 3h10c1.1 0 2 .9 2 2zM15 5H5c-1.1 0-2 .9-2 2v16l7-3 7 3V7c0-1.1-.9-2-2-2"})),w=b(e.jsx("path",{d:"M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96"})),V=b(e.jsx("path",{d:"M20 6h-8l-1.41-1.41C10.21 4.21 9.7 4 9.17 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2m-1 12H5c-.55 0-1-.45-1-1V9c0-.55.45-1 1-1h14c.55 0 1 .45 1 1v8c0 .55-.45 1-1 1"})),Fe=b(e.jsx("path",{d:"M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1m0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1M3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1"})),He={borderRadius:2,"& svg":{transition:"scale 0.15s ease"},"&:active svg":{scale:"0.5 1"}},Pe=({onClick:t})=>e.jsx(j,{onClick:t,centerRipple:!1,sx:He,children:e.jsx(Fe,{})}),N=t=>t.some(s=>s.active?!0:s.children&&s.children.length>0?N(s.children):!1),C=({expanded:t,active:s,icon:o,title:n,action:r,onClick:c,children:l,nestedLevel:d})=>{const[y,v]=a.useState(!1),[h,m]=a.useState(d===void 0),x=s||N(l??[]);return e.jsxs(e.Fragment,{children:[e.jsx(f,{title:t?null:e.jsx(p,{variant:"body2",children:n}),arrow:!0,placement:"right",children:e.jsx(g,{layout:!0,sx:{width:1},children:e.jsxs(W,{onClick:c,sx:{pl:d?d*2:0,width:t?1:void 0,borderRadius:2,display:"flex",justifyContent:t?"space-between":"center",alignItems:"center",bgcolor:x?"FilledInput.bg":"transparent","&:hover":{bgcolor:"action.hover"}},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:3,p:1.2},children:[e.jsx(i,{sx:{color:"action.active",display:"contents"},children:o}),t&&e.jsx(p,{variant:"subtitle1",component:"h6",sx:{...E,lineHeight:1},children:n})]}),t&&e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:1},children:[r,l&&l.length>0&&e.jsx(f,{title:e.jsx(p,{variant:"body2",children:h?"收起資料夾":"展開資料夾"}),placement:"right",arrow:!0,children:e.jsx(j,{centerRipple:!1,sx:{borderRadius:2},onMouseDown:u=>u.stopPropagation(),onClick:u=>{u.stopPropagation(),m(M=>!M)},component:"span",children:e.jsx(xe,{fontSize:"small",sx:{rotate:h?"180deg":"0deg",transition:"rotate 0.2s ease"}})})})]}),x&&e.jsx(g,{layoutId:`selected-bar-${d??-1}`,onLayoutAnimationStart:()=>v(!0),onLayoutAnimationComplete:()=>v(!1),sx:{position:"absolute",inset:"0 auto 0 0",display:"grid",placeItems:"center"},children:e.jsx(i,{sx:{px:.2,height:.5,bgcolor:"primary.main",borderRadius:99,translate:"-50%",scale:y?"1 1.5":"1 1",transition:"scale 0.7s cubic-bezier(0.4, 0, 0.25, 1)",transitionDuration:y?"0.2s":"0.7s"}})})]})})}),l&&l.length>0&&t?e.jsx(ue,{sx:{gap:.5,width:1,clipPath:"polygon(-50% 0, 150% 0, 150% 100%, -50% 100%)",transformOrigin:"top"},transition:{type:"spring",bounce:.3},variants:{initial:{height:0,x:-20,opacity:0},animate:{height:"auto",x:0,opacity:1}},initial:"initial",animate:h?"animate":"initial",children:l.map((u,M)=>e.jsx(C,{...u,expanded:t,nestedLevel:(d??0)+1},M))}):e.jsx(e.Fragment,{})]})},Le=({expanded:t})=>{const o=685362447908864e-7,n=o/104857600*100,r=`已使用 ${B(o)}，總共 ${B(104857600)} (${n.toFixed(2)}%)`;return t?e.jsx(i,{sx:{ml:-1,p:1,borderTop:1,borderColor:"divider",width:1,boxSizing:"content-box"},children:e.jsxs(i,{sx:{p:3,display:"flex",gap:2},children:[e.jsxs(i,{sx:{color:"text.secondary",display:"grid",placeItems:"center",height:"fit-content",position:"relative"},children:[e.jsx(w,{color:"inherit",sx:{opacity:0}}),e.jsx(g,{layoutId:"cloud-icon",layout:"position",sx:{color:"text.secondary",position:"absolute"},children:e.jsx(w,{color:"inherit",sx:{display:"block"}})})]}),e.jsxs(k,{sx:{width:1,gap:1,"& p":E,"& h6":E},children:[e.jsx(p,{variant:"subtitle1",children:"儲存空間"}),e.jsx(A,{variant:"determinate",value:n,sx:{borderRadius:9}}),e.jsx(f,{title:e.jsx(p,{variant:"body2",children:r}),arrow:!0,placement:"right",children:e.jsx(p,{variant:"body2",sx:{color:"text.secondary",...ee},children:r})}),e.jsx(g,{layoutId:"import-button",layout:"position",children:e.jsx(I,{variant:"contained",size:"small",disableElevation:!0,startIcon:e.jsx(D,{}),fullWidth:!0,sx:{borderRadius:1.5,flexWrap:"nowrap"},children:e.jsx(p,{variant:"body2",children:"匯入"})})})]})]})}):e.jsxs(e.Fragment,{children:[e.jsx(f,{title:e.jsx(p,{variant:"body2",children:r}),arrow:!0,placement:"right",children:e.jsxs(i,{sx:{color:"text.secondary",display:"grid",placeItems:"center",width:"2.5rem",p:.5,bgcolor:"action.hover",borderRadius:2},children:[e.jsxs(i,{sx:{width:0,display:"grid",placeItems:"center"},children:[e.jsx(i,{sx:{opacity:0},children:e.jsx(w,{color:"inherit",sx:{translate:"-50%"}})}),e.jsx(g,{layoutId:"cloud-icon",layout:"position",sx:{position:"absolute"},children:e.jsx(w,{color:"inherit"})})]}),e.jsx(A,{variant:"determinate",value:n,sx:{borderRadius:9,width:1}})]})}),e.jsx(f,{title:e.jsx(p,{variant:"body2",children:"從本地匯入圖片"}),arrow:!0,placement:"right",children:e.jsx(g,{layoutId:"import-button",layout:"position",children:e.jsx(I,{variant:"contained",size:"small",disableElevation:!0,sx:{borderRadius:2,flexWrap:"nowrap",p:1,minWidth:0,width:"2.5rem",height:"2.5rem",mt:.5},children:e.jsx(D,{})})})})]})},Ve=({onMenuClick:t,expanded:s})=>{const[o,n]=a.useState(0);return e.jsxs(k,{sx:{gap:.5,p:1,pr:0,alignItems:"flex-start",minHeight:1},children:[e.jsx(Pe,{onClick:t}),!s&&e.jsx(g,{layoutId:"add-folder",children:e.jsx(f,{title:e.jsx(p,{variant:"body2",children:"新增資料夾"}),arrow:!0,placement:"right",children:e.jsx(j,{centerRipple:!1,sx:{borderRadius:2,width:"2.5rem",height:"2.5rem"},onMouseDown:r=>r.stopPropagation(),onClick:r=>r.stopPropagation(),children:e.jsx(L,{fontSize:"small"})})})}),e.jsx(C,{expanded:s,active:o===0,icon:e.jsx(De,{fontSize:"small",color:"inherit"}),title:"圖庫",action:e.jsx(g,{layoutId:"add-folder",children:e.jsx(f,{title:e.jsx(p,{variant:"body2",children:"新增資料夾"}),arrow:!0,placement:"right",children:e.jsx(j,{centerRipple:!1,sx:{borderRadius:2},onMouseDown:r=>r.stopPropagation(),onClick:r=>r.stopPropagation(),component:"span",children:e.jsx(L,{fontSize:"small"})})})}),onClick:()=>n(0)}),e.jsx(C,{expanded:s,active:o===1,icon:e.jsx(Be,{fontSize:"small",color:"inherit"}),title:"我的最愛",onClick:()=>n(1)}),e.jsx(O,{flexItem:!0}),e.jsx(C,{expanded:s,active:o===2,icon:e.jsx(w,{fontSize:"small",color:"inherit"}),title:"個人相簿",onClick:()=>n(2),children:[...Array(5)].map((r,c)=>({active:o===c+3,icon:e.jsx(V,{fontSize:"small",color:"inherit"}),title:`資料夾${c+1}`,onClick:()=>n(c+3),children:c===3?[...Array(2)].map((l,d)=>({active:o===d+8,icon:e.jsx(V,{fontSize:"small",color:"inherit"}),title:`子資料夾${d+1}`,onClick:()=>n(d+8)})):[]}))}),e.jsx(i,{sx:{flex:1}}),e.jsx(Le,{expanded:s})]})},Q=72,We=()=>{const t=a.useRef(320),s=a.useRef(64),o=ve(t.current,{bounce:.3}),[n,r]=a.useState(!1),[c,l]=a.useState(!0),d=a.useRef(null),y=()=>{l(x=>(x?o.set(s.current):o.set(t.current),!x))},v=()=>{r(!0),document.body.style.cursor="ew-resize",document.getElementById("root").style.pointerEvents="none"},h=a.useCallback(()=>{r(!1),document.body.style.cursor="default",document.getElementById("root").style.pointerEvents=""},[]),m=a.useCallback(x=>{if(!n||!d.current)return;const u=x.clientX-d.current.getBoundingClientRect().left;u>=200&&u<=800&&(t.current=u,o.set(u))},[n,o]);return a.useEffect(()=>(window.addEventListener("mousemove",m),window.addEventListener("mouseup",h),()=>{window.removeEventListener("mousemove",m),window.removeEventListener("mouseup",h)}),[m,h]),e.jsxs(i,{sx:{display:"flex",height:`calc(100dvh - ${Q}px)`,position:"relative"},children:[e.jsx(g,{ref:d,sx:{height:1,overflowY:"auto",overflowX:"hidden",scrollbarGutter:"stable"},style:{width:o},children:e.jsx(Ve,{expanded:c,onMenuClick:y})}),e.jsxs(i,{sx:{position:"relative",height:1,flex:1,overflow:"hidden",bgcolor:"background.paper",borderRadius:x=>`${x.shape.borderRadius*6}px 0 0 0`,border:1,borderColor:"border.main"},children:[e.jsx(i,{sx:{height:1,overflow:"auto",scrollbarGutter:"stable"},children:e.jsx(i,{sx:{height:1500}})}),e.jsx(i,{onMouseDown:v,sx:{position:"absolute",inset:"0 auto 0 0",cursor:"ew-resize","&:hover":{bgcolor:"action.hover"},display:"grid",pointerEvents:n||!c?"none":"auto",opacity:c?1:0,bgcolor:n?"divider":"transparent",scale:n?"0.7 1":"1 1",transformOrigin:"left",transition:"all 0.2s ease",placeItems:"center"},children:e.jsx(Ie,{sx:{fontSize:"1.2rem",color:"text.secondary",rotate:"90deg",scale:"1.5 1"}})})]})]})},Te=()=>{if(R(s=>s.breakpoints.up("sm")))return null;throw new q(600)};function Oe(){return U(),e.jsxs(ke,{children:[e.jsx(Te,{}),e.jsxs(i,{component:"header",sx:{display:"flex",alignItems:"center",justifyContent:"space-between",p:1.5,px:{xs:1.5,sm:3.5},height:Q},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:1},children:[e.jsx(T,{sx:{fontSize:"3em",color:"primary.main"}}),e.jsx(p,{variant:"h4",component:"h1",sx:{fontFamily:'"timemachine-wa"',color:"text.colored"},children:"相簿樣板"})]}),e.jsx(Me,{})]}),e.jsxs(i,{sx:{display:"flex",alignItems:"center",gap:2},children:[e.jsxs(j,{sx:{borderRadius:2,overflow:"hidden","&:hover > p":{ml:1,width:"2rem",opacity:1}},centerRipple:!1,children:[e.jsx(we,{}),e.jsx(p,{variant:"body1",sx:{ml:0,textWrap:"nowrap",width:0,opacity:0,transition:"0.2s all ease"},children:"設定"})]}),e.jsx(Ee,{}),e.jsx(O,{flexItem:!0,orientation:"vertical"}),e.jsx(Ae,{})]})]}),e.jsx(We,{})]})}te.createRoot(document.getElementById("root")).render(e.jsx(a.StrictMode,{children:e.jsx(Oe,{})}));
