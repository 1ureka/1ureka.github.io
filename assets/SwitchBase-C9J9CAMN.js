import{g as Q,a as V,r as W,M as X,a0 as Y,N as C,s as k,j as F,b as Z,d as _,D as ee,am as oe}from"./routes-n0rROGIf.js";function te(t){return Q("PrivateSwitchBase",t)}V("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const se=t=>{const{classes:s,checked:l,disabled:d,edge:n}=t,p={root:["root",l&&"checked",d&&"disabled",n&&`edge${Z(n)}`],input:["input"]};return _(p,te,s)},ae=k(ee)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:t,ownerState:s})=>t==="start"&&s.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:t,ownerState:s})=>t==="end"&&s.size!=="small",style:{marginRight:-12}}]}),ie=k("input",{shouldForwardProp:oe})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),re=W.forwardRef(function(s,l){const{autoFocus:d,checked:n,checkedIcon:p,defaultChecked:g,disabled:y,disableFocusRipple:f=!1,edge:x=!1,icon:R,id:I,inputProps:z,inputRef:j,name:E,onBlur:h,onChange:m,onFocus:S,readOnly:U,required:v=!1,tabIndex:L,type:c,value:P,slots:N={},slotProps:T={},...q}=s,[w,D]=X({controlled:n,default:!!g,name:"SwitchBase",state:"checked"}),a=Y(),M=e=>{S&&S(e),a&&a.onFocus&&a.onFocus(e)},O=e=>{h&&h(e),a&&a.onBlur&&a.onBlur(e)},$=e=>{if(e.nativeEvent.defaultPrevented)return;const o=e.target.checked;D(o),m&&m(e,o)};let r=y;a&&typeof r>"u"&&(r=a.disabled);const A=c==="checkbox"||c==="radio",u={...s,checked:w,disabled:r,disableFocusRipple:f,edge:x},B=se(u),b={slots:N,slotProps:{input:z,...T}},[G,H]=C("root",{ref:l,elementType:ae,className:B.root,shouldForwardComponentProp:!0,externalForwardedProps:{...b,component:"span",...q},getSlotProps:e=>({...e,onFocus:o=>{var i;(i=e.onFocus)==null||i.call(e,o),M(o)},onBlur:o=>{var i;(i=e.onBlur)==null||i.call(e,o),O(o)}}),ownerState:u,additionalProps:{centerRipple:!0,focusRipple:!f,disabled:r,role:void 0,tabIndex:null}}),[J,K]=C("input",{ref:j,elementType:ie,className:B.input,externalForwardedProps:b,getSlotProps:e=>({...e,onChange:o=>{var i;(i=e.onChange)==null||i.call(e,o),$(o)}}),ownerState:u,additionalProps:{autoFocus:d,checked:n,defaultChecked:g,disabled:r,id:A?I:void 0,name:E,readOnly:U,required:v,tabIndex:L,type:c,...c==="checkbox"&&P===void 0?{}:{value:P}}});return F.jsxs(G,{...H,children:[F.jsx(J,{...K}),w?p:R]})});export{re as S};
