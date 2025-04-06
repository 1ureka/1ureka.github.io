import{a as oe,g as re,r as b,u as ae,$ as ue,aR as xe,M as N,T as m,j as e,c as X,s as R,b as C,d as ne,m as I,G as Q,e as he,l as me,h as be,B as a,A as q,D as ge,aj as fe,at as ve,o as ie,p as ye,q as je,a2 as we}from"./routes-CadzfG2E.js";import{n as K,s as f,c as B,e as w,u as _,A as Ce,t as ke,m as Se,a as $e,l as Z}from"./datahub_home-DIQveoM4.js";import{u as Te,a as le,b as Ie}from"./read-z02N_0vW.js";import{T as F,a as Me,b as H}from"./TileText-b3BDNp19.js";import{S as M,M as U}from"./DarkModeRounded-BeOhhBQh.js";import{S as G}from"./Skeleton-Pg_F8lei.js";import{C as Re}from"./Chip-DcZTGwOD.js";import{a as Ae,b as Pe,i as Be,M as Fe,T as ze,B as Ee,g as De}from"./style-Ber0AdyF.js";import{a as Le}from"./formatters-CWrkKLZ2.js";import{S as Oe}from"./SwitchBase-DJebDWRN.js";import"./forum-J-R9UQLq.js";import"./DataExplorationRounded-C235fV8C.js";import"./NotificationsRounded-DSSC8er_.js";import"./ExpandMoreRounded-EvpBNzDo.js";import"./useMutation-Ctl-1Wtr.js";import"./useQuery-ItHSqdRD.js";import"./dayjs.min-CsIQ6MD_.js";import"./DatasetRounded-Dyd0d1IU.js";import"./with-selector-DbUq2SiO.js";function Ne(t){return re("MuiFormControlLabel",t)}const P=oe("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),qe=t=>{const{classes:s,disabled:o,labelPlacement:n,error:h,required:l}=t,i={root:["root",o&&"disabled",`labelPlacement${C(n)}`,h&&"error",l&&"required"],label:["label",o&&"disabled"],asterisk:["asterisk",h&&"error"]};return ne(i,Ne,s)},We=R("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:o}=t;return[{[`& .${P.label}`]:s.label},s.root,s[`labelPlacement${C(o.labelPlacement)}`]]}})(I(({theme:t})=>({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${P.disabled}`]:{cursor:"default"},[`& .${P.label}`]:{[`&.${P.disabled}`]:{color:(t.vars||t).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:({labelPlacement:s})=>s==="start"||s==="top"||s==="bottom",style:{marginLeft:16}}]}))),Ve=R("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(t,s)=>s.asterisk})(I(({theme:t})=>({[`&.${P.error}`]:{color:(t.vars||t).palette.error.main}}))),He=b.forwardRef(function(s,o){const n=ae({props:s,name:"MuiFormControlLabel"}),{checked:h,className:l,componentsProps:i={},control:r,disabled:c,disableTypography:u,inputRef:d,label:x,labelPlacement:p="end",name:g,onChange:y,required:$,slots:z={},slotProps:A={},value:E,...k}=n,j=ue(),S=c??r.props.disabled??(j==null?void 0:j.disabled),W=$??r.props.required,J={disabled:S,required:W};["checked","name","onChange","value","inputRef"].forEach(O=>{typeof r.props[O]>"u"&&typeof n[O]<"u"&&(J[O]=n[O])});const ce=xe({props:n,muiFormControl:j,states:["error"]}),D={...n,disabled:S,labelPlacement:p,required:W,error:ce.error},V=qe(D),de={slots:z,slotProps:{...i,...A}},[pe,L]=N("typography",{elementType:m,externalForwardedProps:de,ownerState:D});let T=x;return T!=null&&T.type!==m&&!u&&(T=e.jsx(pe,{component:"span",...L,className:X(V.label,L==null?void 0:L.className),children:T})),e.jsxs(We,{className:X(V.root,l),ownerState:D,ref:o,...k,children:[b.cloneElement(r,J),W?e.jsxs("div",{children:[T,e.jsxs(Ve,{ownerState:D,"aria-hidden":!0,className:V.asterisk,children:[" ","*"]})]}):T]})});function Ue(t){return re("MuiSwitch",t)}const v=oe("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),Xe=t=>{const{classes:s,edge:o,size:n,color:h,checked:l,disabled:i}=t,r={root:["root",o&&`edge${C(o)}`,`size${C(n)}`],switchBase:["switchBase",`color${C(h)}`,l&&"checked",i&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},c=ne(r,Ue,s);return{...s,...c}},_e=R("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:o}=t;return[s.root,o.edge&&s[`edge${C(o.edge)}`],s[`size${C(o.size)}`]]}})({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${v.thumb}`]:{width:16,height:16},[`& .${v.switchBase}`]:{padding:4,[`&.${v.checked}`]:{transform:"translateX(16px)"}}}}]}),Ke=R(Oe,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(t,s)=>{const{ownerState:o}=t;return[s.switchBase,{[`& .${v.input}`]:s.input},o.color!=="default"&&s[`color${C(o.color)}`]]}})(I(({theme:t})=>({position:"absolute",top:0,left:0,zIndex:1,color:t.vars?t.vars.palette.Switch.defaultColor:`${t.palette.mode==="light"?t.palette.common.white:t.palette.grey[300]}`,transition:t.transitions.create(["left","transform"],{duration:t.transitions.duration.shortest}),[`&.${v.checked}`]:{transform:"translateX(20px)"},[`&.${v.disabled}`]:{color:t.vars?t.vars.palette.Switch.defaultDisabledColor:`${t.palette.mode==="light"?t.palette.grey[100]:t.palette.grey[600]}`},[`&.${v.checked} + .${v.track}`]:{opacity:.5},[`&.${v.disabled} + .${v.track}`]:{opacity:t.vars?t.vars.opacity.switchTrackDisabled:`${t.palette.mode==="light"?.12:.2}`},[`& .${v.input}`]:{left:"-100%",width:"300%"}})),I(({theme:t})=>({"&:hover":{backgroundColor:t.vars?`rgba(${t.vars.palette.action.activeChannel} / ${t.vars.palette.action.hoverOpacity})`:Q(t.palette.action.active,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(t.palette).filter(he(["light"])).map(([s])=>({props:{color:s},style:{[`&.${v.checked}`]:{color:(t.vars||t).palette[s].main,"&:hover":{backgroundColor:t.vars?`rgba(${t.vars.palette[s].mainChannel} / ${t.vars.palette.action.hoverOpacity})`:Q(t.palette[s].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${v.disabled}`]:{color:t.vars?t.vars.palette.Switch[`${s}DisabledColor`]:`${t.palette.mode==="light"?me(t.palette[s].main,.62):be(t.palette[s].main,.55)}`}},[`&.${v.checked} + .${v.track}`]:{backgroundColor:(t.vars||t).palette[s].main}}}))]}))),Ge=R("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(t,s)=>s.track})(I(({theme:t})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:t.vars?t.vars.palette.common.onBackground:`${t.palette.mode==="light"?t.palette.common.black:t.palette.common.white}`,opacity:t.vars?t.vars.opacity.switchTrack:`${t.palette.mode==="light"?.38:.3}`}))),Ye=R("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(t,s)=>s.thumb})(I(({theme:t})=>({boxShadow:(t.vars||t).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),Je=b.forwardRef(function(s,o){const n=ae({props:s,name:"MuiSwitch"}),{className:h,color:l="primary",edge:i=!1,size:r="medium",sx:c,slots:u={},slotProps:d={},...x}=n,p={...n,color:l,edge:i,size:r},g=Xe(p),y={slots:u,slotProps:d},[$,z]=N("root",{className:X(g.root,h),elementType:_e,externalForwardedProps:y,ownerState:p,additionalProps:{sx:c}}),[A,E]=N("thumb",{className:g.thumb,elementType:Ye,externalForwardedProps:y,ownerState:p}),k=e.jsx(A,{...E}),[j,S]=N("track",{className:g.track,elementType:Ge,externalForwardedProps:y,ownerState:p});return e.jsxs($,{...z,children:[e.jsx(Ke,{type:"checkbox",icon:k,checkedIcon:k,ref:o,ownerState:p,...x,classes:{...g,root:g.switchBase},slots:{...u.switchBase&&{root:u.switchBase},...u.input&&{input:u.input}},slotProps:{...d.switchBase&&{root:typeof d.switchBase=="function"?d.switchBase(p):d.switchBase},...d.input&&{input:typeof d.input=="function"?d.input(p):d.input}}}),e.jsx(j,{...S})]})});function ee(t){if(!t)return;const s=t.match(/^([a-z]+)(?:\.(\w+))?$/);if(s){const[,o,n]=s,h=["--mui-palette",o];return n&&h.push(n),`var(${h.join("-")})`}return t}const Y=({color1:t="white",color2:s="transparent",angle:o=45,stripeWidth:n=10,backgroundSize:h,zIndex:l=0,className:i="",style:r={}})=>{const c=ee(t),u=ee(s),d=h??n*2,x=`repeating-linear-gradient(
    ${o}deg,
    ${c},
    ${c} ${n}px,
    ${u} ${n}px,
    ${u} ${d}px
  )`;return e.jsx("div",{className:i,style:{position:"absolute",inset:0,zIndex:l,background:x,pointerEvents:"none",...r}})},Qe=({value:t,onClick:s})=>{const[o,n]=b.useState(null),h=r=>n(c=>c?null:r.currentTarget),l=()=>n(null),i=r=>()=>{s(r),l()};return e.jsxs(a,{sx:{display:"flex",gap:f,justifyContent:"space-between",alignItems:"center",p:f},children:[e.jsx(m,{variant:"h5",component:"h3",children:"紀錄數"}),e.jsxs(ge,{sx:{"&:hover":{bgcolor:"action.hover"},p:1,pr:0,borderRadius:1},onClick:h,children:[e.jsxs(m,{sx:{color:"text.secondary"},children:["前 ",t," 筆"]}),e.jsx(Ce,{sx:{color:"text.secondary"}})]}),e.jsx(fe,{anchorEl:o,anchorOrigin:{horizontal:"center",vertical:"bottom"},transformOrigin:{horizontal:"center",vertical:"top"},open:!!o,onClose:l,children:e.jsxs(ve,{dense:!0,children:[e.jsx(U,{onClick:i(3),selected:t===3,children:"前 3 筆"}),e.jsx(U,{onClick:i(5),selected:t===5,children:"前 5 筆"}),e.jsx(U,{onClick:i(7),selected:t===7,children:"前 7 筆"})]})})]})},Ze=(t,s)=>{if(t===null)return{dataArray:[...Array(s)].map((x,p)=>({label:"載入中"+p,records:0,percentage:0,loading:!0,noData:!1})),averageAmount:0,averagePercentages:0};const o=Object.entries(t).sort(([,x],[,p])=>p-x).slice(0,s),n=o.map(([x])=>x),h=o.map(([,x])=>x),l=1.75,i=Object.values(h).reduce((x,p)=>x+p,0),r=Math.round(i/s),c=Math.round(r/i*100*l),u=h.map(x=>Math.round(x/i*100*l)),d=n.map((x,p)=>({label:x,records:h[p],percentage:u[p],loading:!1,noData:!1}));if(d.length<s){const x=[...Array(s-d.length)].map(()=>({label:"",records:0,percentage:0,loading:!1,noData:!0}));return{dataArray:[...d,...x],averageAmount:r,averagePercentages:c}}return{dataArray:d,averageAmount:r,averagePercentages:c}},et=()=>{const[t,s]=b.useState(5),{data:o,isFetching:n}=Te({types:["table","view"]}),{dataArray:h,averageAmount:l,averagePercentages:i}=Ze(n?null:o??null,t);return e.jsxs(M,{sx:{aspectRatio:{xs:"2/1",ml:"2/1.2"},borderTop:"1px solid",borderColor:"divider"},children:[e.jsx(Qe,{value:t,onClick:s}),e.jsxs(a,{sx:{position:"relative",flex:1,display:"flex",gap:f,p:f,py:K,justifyContent:"space-around",alignItems:"stretch"},children:[h.map(({label:r,records:c,percentage:u,loading:d,noData:x},p)=>e.jsx(F,{title:d||x?null:e.jsxs(a,{children:[e.jsx(m,{variant:"subtitle2",children:r}),e.jsxs(m,{children:[c," 筆紀錄"]})]}),children:e.jsxs(a,{sx:{position:"relative",flex:1,borderRadius:2,overflow:"clip",transition:"all 0.2s ease-in-out","&:hover":{bgcolor:"action.hover","& .bar-content":{opacity:1}}},children:[e.jsx(Y,{color1:"divider",color2:"#fff0",angle:-20,stripeWidth:5}),e.jsx(a,{sx:{position:"absolute",inset:`${d||x?100:Math.max(0,100-u)}% 0 0 0`,borderRadius:2,overflow:"hidden",bgcolor:"background.paper",transition:B},children:e.jsx(a,{className:"bar-content",sx:{position:"absolute",inset:0,bgcolor:"primary.main",opacity:p===0?.9:.65,transition:"all 0.2s ease-in-out"}})})]})},p)),e.jsx(a,{sx:{position:"absolute",inset:`0 0 ${n?0:i}% 0`,borderBottom:"4px dashed",borderColor:"divider",pointerEvents:"none",mx:f,scale:"1.02 1",transition:B,"&:before":{content:`"平均 ${n?0:l} 筆"`,position:"absolute",right:0,bottom:0,fontSize:"1rem",color:"text.secondary",opacity:.75}}}),n&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",pointerEvents:"none"},children:e.jsx(q,{})})]}),e.jsx(a,{sx:{display:"flex",gap:f,p:f,justifyContent:"space-around",alignItems:"center"},children:h.map(({label:r,loading:c,noData:u},d)=>c?e.jsx(G,{variant:"rounded",animation:"wave",children:e.jsx(m,{variant:"body1",component:"p",sx:{flex:1,textAlign:"center"},children:"載入中"})},d):u?e.jsx(m,{variant:"body1",component:"p",sx:{flex:1,color:"text.secondary",...w,textAlign:"center"},children:"---"},d):e.jsx(F,{title:e.jsx(m,{children:r}),children:e.jsx(m,{variant:"body1",component:"p",sx:{flex:1,color:"text.secondary",..._,...w,textAlign:"center"},children:r})},d))})]})},tt=ie([e.jsx("path",{d:"M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H4V7c0-.55-.45-1-1-1"},"0"),e.jsx("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3.54 12.01-.63-1.82H12.2l-.65 1.82c-.1.29-.38.48-.68.48-.51 0-.86-.51-.68-.98l2.73-7.27c.16-.44.6-.74 1.08-.74s.92.3 1.09.75l2.73 7.27c.18.47-.17.98-.68.98-.31 0-.58-.19-.68-.49"},"1"),e.jsx("path",{d:"m13.96 7.17-1.31 3.72h2.69l-1.3-3.72z"},"2")]),te=({children:t,loading:s,...o})=>s?e.jsx(G,{variant:"rounded",animation:"wave",...o,children:t}):t,st=()=>{const{data:t,isFetching:s}=le({types:["table","view"]}),o=b.useMemo(()=>{if(!t||s)return null;const i={};let r=0;t.forEach(({columns:x})=>{x.forEach(({type:p})=>{i[p]=(i[p]||0)+1,r+=1})});const c=[],u=new Set;let d=0;for(const[x,p]of Object.entries(i).sort((g,y)=>y[1]-g[1])){const g=p/r;c.length<3||g>=.1?c.push([x,p]):(d+=p,u.add(x))}if(d>0){const x=Array.from(u).slice(0,5),p=x.join(", ")+(x.length>5?", ...":"");c.push([`其他 (${p})`,d])}return c.map(([x,p])=>({type:x,count:p,percentage:p/r}))},[t,s]),n=o===null,h=!n&&o.length<3,l=!n&&!h;return e.jsxs(M,{sx:{aspectRatio:{xs:"2/1",ml:"2/1.2"},borderTop:"1px solid",borderColor:"divider",position:"relative"},children:[e.jsxs(a,{sx:{display:"flex",gap:f,justifyContent:"space-between",alignItems:"flex-start",p:f},children:[e.jsxs(M,{sx:{gap:1},children:[e.jsx(Me,{children:"最常使用的型別"}),e.jsx(te,{loading:n,children:e.jsx(H,{variant:"h4",sx:{textTransform:"uppercase"},children:n?"載入中":h?"N/A":o[0].type})})]}),e.jsx(tt,{sx:{...ke,mt:.5}})]}),e.jsxs(a,{sx:{flex:1,position:"relative"},children:[e.jsxs(a,{sx:{position:"absolute",inset:"auto 0 0 0",p:1.5,borderRadius:9,overflow:"clip"},children:[e.jsx(Y,{color1:"divider",color2:"#fff0",angle:-35,stripeWidth:4}),l&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"flex",alignItems:"stretch",zIndex:1},children:o.map(({type:i,count:r,percentage:c},u)=>e.jsx(F,{title:e.jsxs(H,{variant:"body1",sx:{textTransform:"uppercase"},children:[i," 型別使用了 ",r," 次"]}),children:e.jsx(a,{sx:{width:c,"&:hover":{bgcolor:"divider"},opacity:.9,transition:"all 0.2s ease-in-out"}})},u))})]}),e.jsx(a,{sx:{position:"absolute",inset:"auto 0 0 0",my:1.5,display:"grid",placeItems:"center"},children:e.jsx(a,{sx:{position:"absolute",width:1,display:"flex",alignItems:"center",scale:l?"1 1":"0 1",opacity:l?1:0,transition:B},children:l&&o.map(({percentage:i},r)=>e.jsx(a,{sx:{width:i,px:.5,pl:r===0?1:.5,pr:r===o.length-1?1:.5},children:e.jsx(a,{sx:{py:.5,borderRadius:9,bgcolor:"primary.main",filter:`hue-rotate(-${r*30+10}deg)`}})},r))})}),e.jsx(a,{sx:{position:"absolute",inset:0,display:"flex",transformOrigin:"left",scale:l?"1 1":"1 0",transition:B},children:l&&o.map(({type:i,percentage:r},c)=>e.jsx(a,{sx:{width:r,height:1,position:"relative"},children:e.jsx(a,{sx:{position:"absolute",inset:0,ml:c===0?1:0,mb:3,borderLeft:4,borderColor:"divider"},children:e.jsxs(a,{sx:{position:"absolute",inset:"0 auto auto 0"},children:[e.jsx(m,{variant:"body2",sx:{textTransform:"uppercase",color:"text.secondary",ml:1,...w},children:i}),e.jsxs(H,{sx:{textTransform:"uppercase",opacity:.8,ml:1},children:[Math.round(r*100),"%"]})]})})},c))}),n&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",pointerEvents:"none"},children:e.jsx(q,{})}),h&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",pointerEvents:"none"},children:e.jsx(Re,{sx:{p:3,borderRadius:99},label:e.jsx(m,{variant:"h6",component:"p",sx:{color:"text.secondary"},children:"資料不足"})})})]}),e.jsx(a,{sx:{display:"flex",gap:Se,p:f,alignItems:"center",justifyContent:"space-around",width:"fit-content",minWidth:.5},children:l?o.map(({type:i},r)=>e.jsxs(a,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(a,{sx:{borderRadius:99,width:"1rem",height:"1rem",bgcolor:"primary.main",filter:`hue-rotate(-${r*30+10}deg)`}}),e.jsx(m,{variant:"body1",component:"p",sx:{color:"text.secondary",textTransform:"uppercase",...w},children:i})]},r)):[...Array(3)].map((i,r)=>e.jsxs(a,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(a,{sx:{borderRadius:99,width:"1rem",height:"1rem",bgcolor:"primary.main",filter:`hue-rotate(-${r*30+10}deg)`}}),e.jsx(te,{loading:!0,children:e.jsx(m,{variant:"body1",component:"p",children:"載入中"})})]},r))})]})},ot=ie(e.jsx("path",{d:"M6 7c0 .55.45 1 1 1h7.59l-8.88 8.88c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L16 9.41V17c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1"})),rt={tableNode:ze};function at({nodes:t,edges:s,isFetching:o}){const{mode:n}=ye(),[h,l]=b.useState(t),[i,r]=b.useState(s),[c,u]=b.useState(!1);b.useEffect(()=>{if(c)return;let p,g=0;const y=$=>{if($-g<200){p=requestAnimationFrame(y);return}if(g=$,!h.every(k=>{var j,S;return((j=k.measured)==null?void 0:j.width)&&((S=k.measured)==null?void 0:S.height)})){p=requestAnimationFrame(y);return}const{nodes:A,edges:E}=De(h,i,"horizontal");l(A),r(E),u(!0)};return p=requestAnimationFrame(y),()=>cancelAnimationFrame(p)},[h,i,c]),b.useEffect(()=>{o||(l(t),r(s),u(!1))},[t,s,o]);const d=b.useCallback(p=>l(g=>Ae(p,g)),[l]),x=b.useCallback(p=>r(g=>Pe(p,g)),[r]);return e.jsxs(e.Fragment,{children:[e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",bgcolor:"action.hover"},children:e.jsx(q,{})}),e.jsx(Be,{nodes:h,nodeTypes:rt,edges:i,onNodesChange:d,onEdgesChange:x,deleteKeyCode:null,colorMode:n,defaultViewport:{x:10,y:10,zoom:.7},defaultEdgeOptions:{type:"smoothstep",animated:!0,selectable:!1,style:{strokeWidth:2,stroke:"#b1b1b7"},markerEnd:{type:Fe.Arrow,width:20,height:20}},style:{position:"relative",opacity:!c||o?0:1,transition:!c||o?void 0:"opacity 0.5s ease",background:"var(--mui-palette-background-paper)"},nodesDraggable:!1,nodesConnectable:!1,nodesFocusable:!1,panOnDrag:!1,panOnScroll:!1,zoomOnPinch:!1,zoomOnDoubleClick:!1,zoomOnScroll:!1,children:e.jsx(Ee,{bgColor:"var(--mui-palette-action-hover)"})})]})}const nt=b.memo(at),it=()=>{const{updateHash:t}=$e(),s=()=>t("schema"),{nodes:o,edges:n,isFetching:h}=Ie(),l=b.useMemo(()=>o.map(i=>({id:i.tableName,type:"tableNode",data:i,position:{x:0,y:0}})),[o]);return e.jsxs(M,{sx:{aspectRatio:{xs:"2/1",ml:"2/1.2"},borderTop:"1px solid",borderColor:"divider"},children:[e.jsxs(a,{sx:{display:"flex",gap:f,alignItems:"flex-end",p:f},children:[e.jsx(m,{variant:"h5",component:"h3",sx:{textWrap:"noWrap"},children:"資料表關聯圖"}),e.jsx(m,{variant:"body1",sx:{opacity:.8,...w},children:"透過視覺化的節點與連線，探索資料表彼此的結構與關聯。"})]}),e.jsx(a,{sx:{flex:1,width:1,position:"relative"},children:e.jsx(a,{sx:{position:"absolute",inset:0,p:f,pt:K},children:e.jsxs(a,{sx:{position:"relative",width:1,height:1,borderRadius:3,border:3,borderColor:"divider",borderStyle:"dashed"},children:[e.jsxs(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center"},children:[e.jsx(a,{sx:{position:"absolute",inset:0,zIndex:1}}),e.jsx(nt,{nodes:l,edges:n,isFetching:h})]}),e.jsx(a,{sx:{position:"absolute",inset:"auto 0 0 auto",color:"secondary.dark",translate:"1rem 50%"},children:e.jsx(je,{color:"inherit",size:"large",variant:"outlined",onClick:s,endIcon:e.jsx(ot,{}),sx:{"&:hover":{scale:"1.02"},scale:"1.001",transition:"all 0.2s ease-in-out",bgcolor:"background.paper"},children:"查看完整關聯圖"})})]})})})]})},se=({children:t,loading:s,...o})=>s?e.jsx(G,{variant:"rounded",animation:"wave",...o,children:t}):t,lt=t=>{const s=t.toLowerCase();return["id","create","update","delete","timestamp","modif"].some(n=>s.includes(n))},ct=1.375,dt=()=>{const[t,s]=b.useState(!1),{data:o,isFetching:n}=le({types:["table","view"]}),h=b.useMemo(()=>{if(!o||n)return[...Array(5)].map(()=>({field:"",count:0,percentage:0,loading:!0,noData:!1}));const l={};o.forEach(({columns:u})=>{u.forEach(({name:d})=>{l[d]=(l[d]||0)+1})});const i=Object.entries(l).filter(([u])=>t||!lt(u)).toSorted((u,d)=>d[1]-u[1]).slice(0,5),r=i.reduce((u,[d,x])=>u+x,0),c=i.map(([u,d])=>({field:u,count:d,percentage:d/r,loading:!1,noData:!1}));if(c.length<5){const u=[...Array(5-c.length)].map(()=>({field:"",count:0,percentage:0,loading:!1,noData:!0}));return[...c,...u]}return c},[o,n,t]);return e.jsxs(M,{sx:{aspectRatio:{xs:"2/1",ml:"2/1.2"},borderTop:"1px solid",borderColor:"divider",position:"relative"},children:[e.jsxs(a,{sx:{display:"flex",gap:f,justifyContent:"space-between",alignItems:"flex-start",p:f},children:[e.jsx(m,{variant:"h5",component:"h3",children:"使用的欄位名稱"}),e.jsxs(M,{sx:{alignItems:"flex-end"},children:[e.jsx(He,{checked:t,onChange:({target:l})=>s(l.checked),control:e.jsx(Je,{}),labelPlacement:"start",label:e.jsx(m,{variant:"body1",sx:{opacity:.9},children:"包含系統欄位"})}),e.jsx(we,{children:"(id, createdAt, updatedAt, ...)"})]})]}),e.jsxs(a,{sx:{position:"relative",maxWidth:1,flex:1,overflowX:"auto",overflowY:"hidden"},children:[e.jsxs(a,{sx:{display:"grid",gridTemplateColumns:"auto 1fr auto",gap:f,placeItems:"center","& > :nth-of-type(3n + 1)":{justifySelf:"flex-start"},p:f,pt:K,width:1,height:1},children:[e.jsx(a,{children:e.jsx(m,{variant:"body1",sx:{color:"text.secondary"},children:"最常使用"})}),e.jsx(a,{}),e.jsx(a,{children:e.jsx(m,{variant:"body1",sx:{color:"text.secondary"},children:"出現次數"})}),h.map(({field:l,count:i,percentage:r,loading:c,noData:u},d)=>e.jsxs(b.Fragment,{children:[e.jsx(a,{children:c?e.jsx(se,{loading:!0,children:e.jsx(m,{variant:"body1",sx:{...w,..._,width:"6rem"},children:"載入中"})}):u?e.jsx(m,{variant:"body1",sx:{...w,width:"6rem"},children:"---"}):e.jsx(F,{title:e.jsx(m,{children:l}),children:e.jsx(m,{variant:"body1",sx:{...w,..._,width:"6rem"},children:l})})}),e.jsx(F,{title:c||u?null:e.jsxs(a,{children:[e.jsx(m,{variant:"subtitle2",children:l}),e.jsxs(m,{children:["所有欄位名稱中的 ",`${Math.round(r*100)}%`]})]}),children:e.jsxs(a,{sx:{width:1,height:"1rem",borderRadius:99,position:"relative",overflow:"clip",display:"flex",alignItems:"center","&:hover":{bgcolor:"action.hover","& .bar-content":{opacity:1}},transition:"all 0.2s ease-in-out"},children:[e.jsx(Y,{color1:"divider",color2:"#fff0",angle:-35,stripeWidth:5}),e.jsx(a,{sx:{position:"absolute",width:Math.max(0,Math.min(r*ct,1)),height:1,borderRadius:9,overflow:"clip",bgcolor:"background.paper",transition:B},children:e.jsx(a,{className:"bar-content",sx:{position:"absolute",inset:0,bgcolor:"primary.main",opacity:d===0?.9:.65,transition:"all 0.2s ease-in-out"}})})]})}),e.jsx(a,{children:e.jsx(se,{loading:c,children:e.jsx(m,{variant:"body1",sx:{...w,maxWidth:"10rem"},children:c?"載入中":u?"---":Le(i)})})})]},d))]}),n&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",pointerEvents:"none"},children:e.jsx(q,{})})]})]})},Rt=()=>e.jsxs(a,{sx:{position:"relative",mt:Z,display:"grid",gap:Z,gridTemplateColumns:{xs:"1fr",ml:"repeat(2, 1fr)"},width:1},children:[e.jsx(et,{}),e.jsx(st,{}),e.jsx(it,{}),e.jsx(dt,{})]});export{Rt as LargeTiles};
