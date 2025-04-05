import{g as se,a as oe,r as w,O as $e,a2 as be,Q as N,s as I,j as e,b as k,d as re,D as ge,ap as Pe,u as fe,aT as Re,T as m,c as ee,m as q,G as pe,e as Te,l as Ie,h as Be,o as ve,B as a,A as ae,aw as Fe,ax as Me,a5 as Ae,q as ze}from"./routes-Crf9tycC.js";import{n as ne,s as g,c as V,e as S,u as te,A as Ee,t as Le,m as De,l as ue,a as Oe}from"./datahub_home-Co6NVMOf.js";import{u as Ne,a as je}from"./read-BIBzOakl.js";import{T as X,a as qe,b as J,f as Ue}from"./formatters-BgGhOzMi.js";import{S as U,M as Z}from"./DarkModeRounded-DrGacEM6.js";import{S as ie}from"./Skeleton-DIHwTmsH.js";import{C as We}from"./Chip-8KLuaQx8.js";import"./forum-BONQ0wXt.js";import"./DataExplorationRounded-TTczTo4g.js";import"./NotificationsRounded-Cp2RNbN_.js";import"./ExpandMoreRounded-CGEXZoVD.js";import"./useMutation-laxjeK80.js";import"./useQuery-CIQlhpKo.js";import"./dayjs.min-DBRfvL7M.js";function He(t){return se("PrivateSwitchBase",t)}oe("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const Ve=t=>{const{classes:s,checked:o,disabled:n,edge:x}=t,d={root:["root",o&&"checked",n&&"disabled",x&&`edge${k(x)}`],input:["input"]};return re(d,He,s)},Xe=I(ge)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:t,ownerState:s})=>t==="start"&&s.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:t,ownerState:s})=>t==="end"&&s.size!=="small",style:{marginRight:-12}}]}),_e=I("input",{shouldForwardProp:Pe})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),Ge=w.forwardRef(function(s,o){const{autoFocus:n,checked:x,checkedIcon:d,defaultChecked:l,disabled:r,disableFocusRipple:c=!1,edge:p=!1,icon:i,id:u,inputProps:h,inputRef:v,name:$,onBlur:B,onChange:F,onFocus:M,readOnly:_,required:A=!1,tabIndex:P,type:C,value:z,slots:G={},slotProps:K={},...E}=s,[L,Q]=$e({controlled:x,default:!!l,name:"SwitchBase",state:"checked"}),y=be(),D=b=>{M&&M(b),y&&y.onFocus&&y.onFocus(b)},R=b=>{B&&B(b),y&&y.onBlur&&y.onBlur(b)},O=b=>{if(b.nativeEvent.defaultPrevented)return;const j=b.target.checked;Q(j),F&&F(b,j)};let W=r;y&&typeof W>"u"&&(W=y.disabled);const ye=C==="checkbox"||C==="radio",Y={...s,checked:L,disabled:W,disableFocusRipple:c,edge:p},ce=Ve(Y),de={slots:G,slotProps:{input:h,...K}},[we,Ce]=N("root",{ref:o,elementType:Xe,className:ce.root,shouldForwardComponentProp:!0,externalForwardedProps:{...de,component:"span",...E},getSlotProps:b=>({...b,onFocus:j=>{var T;(T=b.onFocus)==null||T.call(b,j),D(j)},onBlur:j=>{var T;(T=b.onBlur)==null||T.call(b,j),R(j)}}),ownerState:Y,additionalProps:{centerRipple:!0,focusRipple:!c,disabled:W,role:void 0,tabIndex:null}}),[Se,ke]=N("input",{ref:v,elementType:_e,className:ce.input,externalForwardedProps:de,getSlotProps:b=>({...b,onChange:j=>{var T;(T=b.onChange)==null||T.call(b,j),O(j)}}),ownerState:Y,additionalProps:{autoFocus:n,checked:x,defaultChecked:l,disabled:W,id:ye?u:void 0,name:$,readOnly:_,required:A,tabIndex:P,type:C,...C==="checkbox"&&z===void 0?{}:{value:z}}});return e.jsxs(we,{...Ce,children:[e.jsx(Se,{...ke}),L?d:i]})});function Ke(t){return se("MuiFormControlLabel",t)}const H=oe("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),Qe=t=>{const{classes:s,disabled:o,labelPlacement:n,error:x,required:d}=t,l={root:["root",o&&"disabled",`labelPlacement${k(n)}`,x&&"error",d&&"required"],label:["label",o&&"disabled"],asterisk:["asterisk",x&&"error"]};return re(l,Ke,s)},Ye=I("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:o}=t;return[{[`& .${H.label}`]:s.label},s.root,s[`labelPlacement${k(o.labelPlacement)}`]]}})(q(({theme:t})=>({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${H.disabled}`]:{cursor:"default"},[`& .${H.label}`]:{[`&.${H.disabled}`]:{color:(t.vars||t).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:({labelPlacement:s})=>s==="start"||s==="top"||s==="bottom",style:{marginLeft:16}}]}))),Je=I("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(t,s)=>s.asterisk})(q(({theme:t})=>({[`&.${H.error}`]:{color:(t.vars||t).palette.error.main}}))),Ze=w.forwardRef(function(s,o){const n=fe({props:s,name:"MuiFormControlLabel"}),{checked:x,className:d,componentsProps:l={},control:r,disabled:c,disableTypography:p,inputRef:i,label:u,labelPlacement:h="end",name:v,onChange:$,required:B,slots:F={},slotProps:M={},value:_,...A}=n,P=be(),C=c??r.props.disabled??(P==null?void 0:P.disabled),z=B??r.props.required,G={disabled:C,required:z};["checked","name","onChange","value","inputRef"].forEach(O=>{typeof r.props[O]>"u"&&typeof n[O]<"u"&&(G[O]=n[O])});const K=Re({props:n,muiFormControl:P,states:["error"]}),E={...n,disabled:C,labelPlacement:h,required:z,error:K.error},L=Qe(E),Q={slots:F,slotProps:{...l,...M}},[y,D]=N("typography",{elementType:m,externalForwardedProps:Q,ownerState:E});let R=u;return R!=null&&R.type!==m&&!p&&(R=e.jsx(y,{component:"span",...D,className:ee(L.label,D==null?void 0:D.className),children:R})),e.jsxs(Ye,{className:ee(L.root,d),ownerState:E,ref:o,...A,children:[w.cloneElement(r,G),z?e.jsxs("div",{children:[R,e.jsxs(Je,{ownerState:E,"aria-hidden":!0,className:L.asterisk,children:[" ","*"]})]}):R]})});function et(t){return se("MuiSwitch",t)}const f=oe("MuiSwitch",["root","edgeStart","edgeEnd","switchBase","colorPrimary","colorSecondary","sizeSmall","sizeMedium","checked","disabled","input","thumb","track"]),tt=t=>{const{classes:s,edge:o,size:n,color:x,checked:d,disabled:l}=t,r={root:["root",o&&`edge${k(o)}`,`size${k(n)}`],switchBase:["switchBase",`color${k(x)}`,d&&"checked",l&&"disabled"],thumb:["thumb"],track:["track"],input:["input"]},c=re(r,et,s);return{...s,...c}},st=I("span",{name:"MuiSwitch",slot:"Root",overridesResolver:(t,s)=>{const{ownerState:o}=t;return[s.root,o.edge&&s[`edge${k(o.edge)}`],s[`size${k(o.size)}`]]}})({display:"inline-flex",width:34+12*2,height:14+12*2,overflow:"hidden",padding:12,boxSizing:"border-box",position:"relative",flexShrink:0,zIndex:0,verticalAlign:"middle","@media print":{colorAdjust:"exact"},variants:[{props:{edge:"start"},style:{marginLeft:-8}},{props:{edge:"end"},style:{marginRight:-8}},{props:{size:"small"},style:{width:40,height:24,padding:7,[`& .${f.thumb}`]:{width:16,height:16},[`& .${f.switchBase}`]:{padding:4,[`&.${f.checked}`]:{transform:"translateX(16px)"}}}}]}),ot=I(Ge,{name:"MuiSwitch",slot:"SwitchBase",overridesResolver:(t,s)=>{const{ownerState:o}=t;return[s.switchBase,{[`& .${f.input}`]:s.input},o.color!=="default"&&s[`color${k(o.color)}`]]}})(q(({theme:t})=>({position:"absolute",top:0,left:0,zIndex:1,color:t.vars?t.vars.palette.Switch.defaultColor:`${t.palette.mode==="light"?t.palette.common.white:t.palette.grey[300]}`,transition:t.transitions.create(["left","transform"],{duration:t.transitions.duration.shortest}),[`&.${f.checked}`]:{transform:"translateX(20px)"},[`&.${f.disabled}`]:{color:t.vars?t.vars.palette.Switch.defaultDisabledColor:`${t.palette.mode==="light"?t.palette.grey[100]:t.palette.grey[600]}`},[`&.${f.checked} + .${f.track}`]:{opacity:.5},[`&.${f.disabled} + .${f.track}`]:{opacity:t.vars?t.vars.opacity.switchTrackDisabled:`${t.palette.mode==="light"?.12:.2}`},[`& .${f.input}`]:{left:"-100%",width:"300%"}})),q(({theme:t})=>({"&:hover":{backgroundColor:t.vars?`rgba(${t.vars.palette.action.activeChannel} / ${t.vars.palette.action.hoverOpacity})`:pe(t.palette.action.active,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},variants:[...Object.entries(t.palette).filter(Te(["light"])).map(([s])=>({props:{color:s},style:{[`&.${f.checked}`]:{color:(t.vars||t).palette[s].main,"&:hover":{backgroundColor:t.vars?`rgba(${t.vars.palette[s].mainChannel} / ${t.vars.palette.action.hoverOpacity})`:pe(t.palette[s].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${f.disabled}`]:{color:t.vars?t.vars.palette.Switch[`${s}DisabledColor`]:`${t.palette.mode==="light"?Ie(t.palette[s].main,.62):Be(t.palette[s].main,.55)}`}},[`&.${f.checked} + .${f.track}`]:{backgroundColor:(t.vars||t).palette[s].main}}}))]}))),rt=I("span",{name:"MuiSwitch",slot:"Track",overridesResolver:(t,s)=>s.track})(q(({theme:t})=>({height:"100%",width:"100%",borderRadius:14/2,zIndex:-1,transition:t.transitions.create(["opacity","background-color"],{duration:t.transitions.duration.shortest}),backgroundColor:t.vars?t.vars.palette.common.onBackground:`${t.palette.mode==="light"?t.palette.common.black:t.palette.common.white}`,opacity:t.vars?t.vars.opacity.switchTrack:`${t.palette.mode==="light"?.38:.3}`}))),at=I("span",{name:"MuiSwitch",slot:"Thumb",overridesResolver:(t,s)=>s.thumb})(q(({theme:t})=>({boxShadow:(t.vars||t).shadows[1],backgroundColor:"currentColor",width:20,height:20,borderRadius:"50%"}))),nt=w.forwardRef(function(s,o){const n=fe({props:s,name:"MuiSwitch"}),{className:x,color:d="primary",edge:l=!1,size:r="medium",sx:c,slots:p={},slotProps:i={},...u}=n,h={...n,color:d,edge:l,size:r},v=tt(h),$={slots:p,slotProps:i},[B,F]=N("root",{className:ee(v.root,x),elementType:st,externalForwardedProps:$,ownerState:h,additionalProps:{sx:c}}),[M,_]=N("thumb",{className:v.thumb,elementType:at,externalForwardedProps:$,ownerState:h}),A=e.jsx(M,{..._}),[P,C]=N("track",{className:v.track,elementType:rt,externalForwardedProps:$,ownerState:h});return e.jsxs(B,{...F,children:[e.jsx(ot,{type:"checkbox",icon:A,checkedIcon:A,ref:o,ownerState:h,...u,classes:{...v,root:v.switchBase},slots:{...p.switchBase&&{root:p.switchBase},...p.input&&{input:p.input}},slotProps:{...i.switchBase&&{root:typeof i.switchBase=="function"?i.switchBase(h):i.switchBase},...i.input&&{input:typeof i.input=="function"?i.input(h):i.input}}}),e.jsx(P,{...C})]})}),it=ve(e.jsx("path",{d:"M6 7c0 .55.45 1 1 1h7.59l-8.88 8.88c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L16 9.41V17c0 .55.45 1 1 1s1-.45 1-1V7c0-.55-.45-1-1-1H7c-.55 0-1 .45-1 1"}));function he(t){if(!t)return;const s=t.match(/^([a-z]+)(?:\.(\w+))?$/);if(s){const[,o,n]=s,x=["--mui-palette",o];return n&&x.push(n),`var(${x.join("-")})`}return t}const le=({color1:t="white",color2:s="transparent",angle:o=45,stripeWidth:n=10,backgroundSize:x,zIndex:d=0,className:l="",style:r={}})=>{const c=he(t),p=he(s),i=x??n*2,u=`repeating-linear-gradient(
    ${o}deg,
    ${c},
    ${c} ${n}px,
    ${p} ${n}px,
    ${p} ${i}px
  )`;return e.jsx("div",{className:l,style:{position:"absolute",inset:0,zIndex:d,background:u,pointerEvents:"none",...r}})},lt=({value:t,onClick:s})=>{const[o,n]=w.useState(null),x=r=>n(c=>c?null:r.currentTarget),d=()=>n(null),l=r=>()=>{s(r),d()};return e.jsxs(a,{sx:{display:"flex",gap:g,justifyContent:"space-between",alignItems:"center",p:g},children:[e.jsx(m,{variant:"h5",component:"h3",children:"紀錄數"}),e.jsxs(ge,{sx:{"&:hover":{bgcolor:"action.hover"},p:1,pr:0,borderRadius:1},onClick:x,children:[e.jsxs(m,{sx:{color:"text.secondary"},children:["前 ",t," 筆"]}),e.jsx(Ee,{sx:{color:"text.secondary"}})]}),e.jsx(Fe,{anchorEl:o,anchorOrigin:{horizontal:"center",vertical:"bottom"},transformOrigin:{horizontal:"center",vertical:"top"},open:!!o,onClose:d,children:e.jsxs(Me,{dense:!0,children:[e.jsx(Z,{onClick:l(3),selected:t===3,children:"前 3 筆"}),e.jsx(Z,{onClick:l(5),selected:t===5,children:"前 5 筆"}),e.jsx(Z,{onClick:l(7),selected:t===7,children:"前 7 筆"})]})})]})},ct=(t,s)=>{if(t===null)return{dataArray:[...Array(s)].map((u,h)=>({label:"載入中"+h,records:0,percentage:0,loading:!0,noData:!1})),averageAmount:0,averagePercentages:0};const o=Object.entries(t).sort(([,u],[,h])=>h-u).slice(0,s),n=o.map(([u])=>u),x=o.map(([,u])=>u),d=1.75,l=Object.values(x).reduce((u,h)=>u+h,0),r=Math.round(l/s),c=Math.round(r/l*100*d),p=x.map(u=>Math.round(u/l*100*d)),i=n.map((u,h)=>({label:u,records:x[h],percentage:p[h],loading:!1,noData:!1}));if(i.length<s){const u=[...Array(s-i.length)].map(()=>({label:"",records:0,percentage:0,loading:!1,noData:!0}));return{dataArray:[...i,...u],averageAmount:r,averagePercentages:c}}return{dataArray:i,averageAmount:r,averagePercentages:c}},dt=()=>{const[t,s]=w.useState(5),{data:o,isFetching:n}=Ne({types:["table","view"]}),{dataArray:x,averageAmount:d,averagePercentages:l}=ct(n?null:o??null,t);return e.jsxs(U,{sx:{aspectRatio:{xs:"2/1",ml:"2/1.2"},borderTop:"1px solid",borderColor:"divider"},children:[e.jsx(lt,{value:t,onClick:s}),e.jsxs(a,{sx:{position:"relative",flex:1,display:"flex",gap:g,p:g,py:ne,justifyContent:"space-around",alignItems:"stretch"},children:[x.map(({label:r,records:c,percentage:p,loading:i,noData:u},h)=>e.jsx(X,{title:i||u?null:e.jsxs(a,{children:[e.jsx(m,{variant:"subtitle2",children:r}),e.jsxs(m,{children:[c," 筆紀錄"]})]}),children:e.jsxs(a,{sx:{position:"relative",flex:1,borderRadius:2,overflow:"clip",transition:"all 0.2s ease-in-out","&:hover":{bgcolor:"action.hover","& .bar-content":{opacity:1}}},children:[e.jsx(le,{color1:"divider",color2:"#fff0",angle:-20,stripeWidth:5}),e.jsx(a,{sx:{position:"absolute",inset:`${i||u?100:Math.max(0,100-p)}% 0 0 0`,borderRadius:2,overflow:"hidden",bgcolor:"background.paper",transition:V},children:e.jsx(a,{className:"bar-content",sx:{position:"absolute",inset:0,bgcolor:"primary.main",opacity:h===0?.9:.65,transition:"all 0.2s ease-in-out"}})})]})},h)),e.jsx(a,{sx:{position:"absolute",inset:`0 0 ${n?0:l}% 0`,borderBottom:"4px dashed",borderColor:"divider",pointerEvents:"none",mx:g,scale:"1.02 1",transition:V,"&:before":{content:`"平均 ${n?0:d} 筆"`,position:"absolute",right:0,bottom:0,fontSize:"1rem",color:"text.secondary",opacity:.75}}}),n&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",pointerEvents:"none"},children:e.jsx(ae,{})})]}),e.jsx(a,{sx:{display:"flex",gap:g,p:g,justifyContent:"space-around",alignItems:"center"},children:x.map(({label:r,loading:c,noData:p},i)=>c?e.jsx(ie,{variant:"rounded",animation:"wave",children:e.jsx(m,{variant:"body1",component:"p",sx:{flex:1,textAlign:"center"},children:"載入中"})},i):p?e.jsx(m,{variant:"body1",component:"p",sx:{flex:1,color:"text.secondary",...S,textAlign:"center"},children:"---"},i):e.jsx(X,{title:e.jsx(m,{children:r}),children:e.jsx(m,{variant:"body1",component:"p",sx:{flex:1,color:"text.secondary",...te,...S,textAlign:"center"},children:r})},i))})]})},pt=ve([e.jsx("path",{d:"M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H4V7c0-.55-.45-1-1-1"},"0"),e.jsx("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3.54 12.01-.63-1.82H12.2l-.65 1.82c-.1.29-.38.48-.68.48-.51 0-.86-.51-.68-.98l2.73-7.27c.16-.44.6-.74 1.08-.74s.92.3 1.09.75l2.73 7.27c.18.47-.17.98-.68.98-.31 0-.58-.19-.68-.49"},"1"),e.jsx("path",{d:"m13.96 7.17-1.31 3.72h2.69l-1.3-3.72z"},"2")]),xe=({children:t,loading:s,...o})=>s?e.jsx(ie,{variant:"rounded",animation:"wave",...o,children:t}):t,ut=()=>{const{data:t,isFetching:s}=je({types:["table","view"]}),o=w.useMemo(()=>{if(!t||s)return null;const l={};let r=0;t.forEach(({columns:u})=>{u.forEach(({type:h})=>{l[h]=(l[h]||0)+1,r+=1})});const c=[],p=new Set;let i=0;for(const[u,h]of Object.entries(l).sort((v,$)=>$[1]-v[1])){const v=h/r;c.length<3||v>=.1?c.push([u,h]):(i+=h,p.add(u))}if(i>0){const u=Array.from(p).slice(0,5),h=u.join(", ")+(u.length>5?", ...":"");c.push([`其他 (${h})`,i])}return c.map(([u,h])=>({type:u,count:h,percentage:h/r}))},[t,s]),n=o===null,x=!n&&o.length<3,d=!n&&!x;return e.jsxs(U,{sx:{aspectRatio:{xs:"2/1",ml:"2/1.2"},borderTop:"1px solid",borderColor:"divider",position:"relative"},children:[e.jsxs(a,{sx:{display:"flex",gap:g,justifyContent:"space-between",alignItems:"flex-start",p:g},children:[e.jsxs(U,{sx:{gap:1},children:[e.jsx(qe,{children:"最常使用的型別"}),e.jsx(xe,{loading:n,children:e.jsx(J,{variant:"h4",sx:{textTransform:"uppercase"},children:n?"載入中":x?"N/A":o[0].type})})]}),e.jsx(pt,{sx:{...Le,mt:.5}})]}),e.jsxs(a,{sx:{flex:1,position:"relative"},children:[e.jsxs(a,{sx:{position:"absolute",inset:"auto 0 0 0",p:1.5,borderRadius:9,overflow:"clip"},children:[e.jsx(le,{color1:"divider",color2:"#fff0",angle:-35,stripeWidth:4}),d&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"flex",alignItems:"stretch",zIndex:1},children:o.map(({type:l,count:r,percentage:c},p)=>e.jsx(X,{title:e.jsxs(J,{variant:"body1",sx:{textTransform:"uppercase"},children:[l," 型別使用了 ",r," 次"]}),children:e.jsx(a,{sx:{width:c,"&:hover":{bgcolor:"divider"},opacity:.9,transition:"all 0.2s ease-in-out"}})},p))})]}),e.jsx(a,{sx:{position:"absolute",inset:"auto 0 0 0",my:1.5,display:"grid",placeItems:"center"},children:e.jsx(a,{sx:{position:"absolute",width:1,display:"flex",alignItems:"center",scale:d?"1 1":"0 1",opacity:d?1:0,transition:V},children:d&&o.map(({percentage:l},r)=>e.jsx(a,{sx:{width:l,px:.5,pl:r===0?1:.5,pr:r===o.length-1?1:.5},children:e.jsx(a,{sx:{py:.5,borderRadius:9,bgcolor:"primary.main",filter:`hue-rotate(-${r*30+10}deg)`}})},r))})}),e.jsx(a,{sx:{position:"absolute",inset:0,display:"flex",transformOrigin:"left",scale:d?"1 1":"1 0",transition:V},children:d&&o.map(({type:l,percentage:r},c)=>e.jsx(a,{sx:{width:r,height:1,position:"relative"},children:e.jsx(a,{sx:{position:"absolute",inset:0,ml:c===0?1:0,mb:3,borderLeft:4,borderColor:"divider"},children:e.jsxs(a,{sx:{position:"absolute",inset:"0 auto auto 0"},children:[e.jsx(m,{variant:"body2",sx:{textTransform:"uppercase",color:"text.secondary",ml:1,...S},children:l}),e.jsxs(J,{sx:{textTransform:"uppercase",opacity:.8,ml:1},children:[Math.round(r*100),"%"]})]})})},c))}),n&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",pointerEvents:"none"},children:e.jsx(ae,{})}),x&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",pointerEvents:"none"},children:e.jsx(We,{sx:{p:3,borderRadius:99},label:e.jsx(m,{variant:"h6",component:"p",sx:{color:"text.secondary"},children:"資料不足"})})})]}),e.jsx(a,{sx:{display:"flex",gap:De,p:g,alignItems:"center",justifyContent:"space-around",width:"fit-content",minWidth:.5},children:d?o.map(({type:l},r)=>e.jsxs(a,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(a,{sx:{borderRadius:99,width:"1rem",height:"1rem",bgcolor:"primary.main",filter:`hue-rotate(-${r*30+10}deg)`}}),e.jsx(m,{variant:"body1",component:"p",sx:{color:"text.secondary",textTransform:"uppercase",...S},children:l})]},r)):[...Array(3)].map((l,r)=>e.jsxs(a,{sx:{display:"flex",gap:1,alignItems:"center"},children:[e.jsx(a,{sx:{borderRadius:99,width:"1rem",height:"1rem",bgcolor:"primary.main",filter:`hue-rotate(-${r*30+10}deg)`}}),e.jsx(xe,{loading:!0,children:e.jsx(m,{variant:"body1",component:"p",children:"載入中"})})]},r))})]})},me=({children:t,loading:s,...o})=>s?e.jsx(ie,{variant:"rounded",animation:"wave",...o,children:t}):t,ht=t=>{const s=t.toLowerCase();return["id","create","update","delete","timestamp","modif"].some(n=>s.includes(n))},xt=1.375,mt=()=>{const[t,s]=w.useState(!1),{data:o,isFetching:n}=je({types:["table","view"]}),x=w.useMemo(()=>{if(!o||n)return[...Array(5)].map(()=>({field:"",count:0,percentage:0,loading:!0,noData:!1}));const d={};o.forEach(({columns:p})=>{p.forEach(({name:i})=>{d[i]=(d[i]||0)+1})});const l=Object.entries(d).filter(([p])=>t||!ht(p)).toSorted((p,i)=>i[1]-p[1]).slice(0,5),r=l.reduce((p,[i,u])=>p+u,0),c=l.map(([p,i])=>({field:p,count:i,percentage:i/r,loading:!1,noData:!1}));if(c.length<5){const p=[...Array(5-c.length)].map(()=>({field:"",count:0,percentage:0,loading:!1,noData:!0}));return[...c,...p]}return c},[o,n,t]);return e.jsxs(U,{sx:{aspectRatio:{xs:"2/1",ml:"2/1.2"},borderTop:"1px solid",borderColor:"divider",position:"relative"},children:[e.jsxs(a,{sx:{display:"flex",gap:g,justifyContent:"space-between",alignItems:"flex-start",p:g},children:[e.jsx(m,{variant:"h5",component:"h3",children:"使用的欄位名稱"}),e.jsxs(U,{sx:{alignItems:"flex-end"},children:[e.jsx(Ze,{checked:t,onChange:({target:d})=>s(d.checked),control:e.jsx(nt,{}),labelPlacement:"start",label:e.jsx(m,{variant:"body1",sx:{opacity:.9},children:"包含系統欄位"})}),e.jsx(Ae,{children:"(id, createdAt, updatedAt, ...)"})]})]}),e.jsxs(a,{sx:{position:"relative",maxWidth:1,flex:1,overflowX:"auto",overflowY:"hidden"},children:[e.jsxs(a,{sx:{display:"grid",gridTemplateColumns:"auto 1fr auto",gap:g,placeItems:"center","& > :nth-of-type(3n + 1)":{justifySelf:"flex-start"},p:g,pt:ne,width:1,height:1},children:[e.jsx(a,{children:e.jsx(m,{variant:"body1",sx:{color:"text.secondary"},children:"最常使用"})}),e.jsx(a,{}),e.jsx(a,{children:e.jsx(m,{variant:"body1",sx:{color:"text.secondary"},children:"出現次數"})}),x.map(({field:d,count:l,percentage:r,loading:c,noData:p},i)=>e.jsxs(w.Fragment,{children:[e.jsx(a,{children:c?e.jsx(me,{loading:!0,children:e.jsx(m,{variant:"body1",sx:{...S,...te,width:"6rem"},children:"載入中"})}):p?e.jsx(m,{variant:"body1",sx:{...S,width:"6rem"},children:"---"}):e.jsx(X,{title:e.jsx(m,{children:d}),children:e.jsx(m,{variant:"body1",sx:{...S,...te,width:"6rem"},children:d})})}),e.jsx(X,{title:c||p?null:e.jsxs(a,{children:[e.jsx(m,{variant:"subtitle2",children:d}),e.jsxs(m,{children:["所有欄位名稱中的 ",`${Math.round(r*100)}%`]})]}),children:e.jsxs(a,{sx:{width:1,height:"1rem",borderRadius:99,position:"relative",overflow:"clip",display:"flex",alignItems:"center","&:hover":{bgcolor:"action.hover","& .bar-content":{opacity:1}},transition:"all 0.2s ease-in-out"},children:[e.jsx(le,{color1:"divider",color2:"#fff0",angle:-35,stripeWidth:5}),e.jsx(a,{sx:{position:"absolute",width:Math.max(0,Math.min(r*xt,1)),height:1,borderRadius:9,overflow:"clip",bgcolor:"background.paper",transition:V},children:e.jsx(a,{className:"bar-content",sx:{position:"absolute",inset:0,bgcolor:"primary.main",opacity:i===0?.9:.65,transition:"all 0.2s ease-in-out"}})})]})}),e.jsx(a,{children:e.jsx(me,{loading:c,children:e.jsx(m,{variant:"body1",sx:{...S,maxWidth:"10rem"},children:c?"載入中":p?"---":Ue(l)})})})]},i))]}),n&&e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",pointerEvents:"none"},children:e.jsx(ae,{})})]})]})},bt=()=>{const{updateHash:t}=Oe(),s=()=>{t("schema")};return e.jsxs(U,{sx:{aspectRatio:{xs:"2/1",ml:"2/1.2"},borderTop:"1px solid",borderColor:"divider"},children:[e.jsxs(a,{sx:{display:"flex",gap:g,alignItems:"flex-end",p:g},children:[e.jsx(m,{variant:"h5",component:"h3",sx:{textWrap:"noWrap"},children:"資料表關聯圖"}),e.jsx(m,{variant:"body1",sx:{opacity:.8,...S},children:"透過視覺化的節點與連線，探索資料表彼此的結構與關聯。"})]}),e.jsx(a,{sx:{flex:1,width:1,position:"relative"},children:e.jsx(a,{sx:{position:"absolute",inset:0,p:g,pt:ne},children:e.jsxs(a,{sx:{position:"relative",width:1,height:1,borderRadius:3,border:3,borderColor:"divider",borderStyle:"dashed"},children:[e.jsx(a,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center"},children:e.jsx(m,{variant:"body1",sx:{color:"text.secondary"},children:"資料表關聯圖正在開發中，敬請期待！"})}),e.jsx(a,{sx:{position:"absolute",inset:"auto 0 0 auto",color:"secondary.dark",translate:"1rem 50%"},children:e.jsx(ze,{color:"inherit",size:"large",variant:"outlined",onClick:s,endIcon:e.jsx(it,{}),sx:{"&:hover":{scale:"1.02"},scale:"1.001",transition:"all 0.2s ease-in-out",bgcolor:"background.paper"},children:"查看完整關聯圖"})})]})})})]})},Bt=()=>e.jsxs(a,{sx:{position:"relative",mt:ue,display:"grid",gap:ue,gridTemplateColumns:{xs:"1fr",ml:"repeat(2, 1fr)"},width:1},children:[e.jsx(dt,{}),e.jsx(ut,{}),e.jsx(bt,{}),e.jsx(mt,{})]});export{Bt as LargeTiles};
