import{g as _,a as tt,r as E,u as et,aP as nt,J as it,ae as ot,aH as st,a0 as rt,j as h,s as S,c as at,d as lt,av as N,m as pt,h as ct}from"./routes-DSS9LKLr.js";function dt(n){return _("MuiCollapse",n)}tt("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const ut=n=>{const{orientation:e,classes:s}=n,m={root:["root",`${e}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${e}`],wrapperInner:["wrapperInner",`${e}`]};return lt(m,dt,s)},ht=S("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(n,e)=>{const{ownerState:s}=n;return[e.root,e[s.orientation],s.state==="entered"&&e.entered,s.state==="exited"&&!s.in&&s.collapsedSize==="0px"&&e.hidden]}})(pt(({theme:n})=>({height:0,overflow:"hidden",transition:n.transitions.create("height"),variants:[{props:{orientation:"horizontal"},style:{height:"auto",width:0,transition:n.transitions.create("width")}},{props:{state:"entered"},style:{height:"auto",overflow:"visible"}},{props:{state:"entered",orientation:"horizontal"},style:{width:"auto"}},{props:({ownerState:e})=>e.state==="exited"&&!e.in&&e.collapsedSize==="0px",style:{visibility:"hidden"}}]}))),mt=S("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(n,e)=>e.wrapper})({display:"flex",width:"100%",variants:[{props:{orientation:"horizontal"},style:{width:"auto",height:"100%"}}]}),ft=S("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(n,e)=>e.wrapperInner})({width:"100%",variants:[{props:{orientation:"horizontal"},style:{width:"auto",height:"100%"}}]}),U=E.forwardRef(function(e,s){const m=et({props:e,name:"MuiCollapse"}),{addEndListener:R,children:A,className:L,collapsedSize:f="0px",component:b,easing:T,in:D,onEnter:$,onEntered:M,onEntering:I,onExit:j,onExited:J,onExiting:H,orientation:W="vertical",style:v,timeout:r=nt.standard,TransitionComponent:O=it,...k}=m,g={...m,orientation:W,collapsedSize:f},p=ut(g),F=ot(),q=st(),a=E.useRef(null),C=E.useRef(),x=typeof f=="number"?`${f}px`:f,c=W==="horizontal",d=c?"width":"height",w=E.useRef(null),B=rt(s,w),l=t=>i=>{if(t){const o=w.current;i===void 0?t(o):t(o,i)}},z=()=>a.current?a.current[c?"clientWidth":"clientHeight"]:0,G=l((t,i)=>{a.current&&c&&(a.current.style.position="absolute"),t.style[d]=x,$&&$(t,i)}),K=l((t,i)=>{const o=z();a.current&&c&&(a.current.style.position="");const{duration:u,easing:y}=N({style:v,timeout:r,easing:T},{mode:"enter"});if(r==="auto"){const P=F.transitions.getAutoHeightDuration(o);t.style.transitionDuration=`${P}ms`,C.current=P}else t.style.transitionDuration=typeof u=="string"?u:`${u}ms`;t.style[d]=`${o}px`,t.style.transitionTimingFunction=y,I&&I(t,i)}),Q=l((t,i)=>{t.style[d]="auto",M&&M(t,i)}),V=l(t=>{t.style[d]=`${z()}px`,j&&j(t)}),X=l(J),Y=l(t=>{const i=z(),{duration:o,easing:u}=N({style:v,timeout:r,easing:T},{mode:"exit"});if(r==="auto"){const y=F.transitions.getAutoHeightDuration(i);t.style.transitionDuration=`${y}ms`,C.current=y}else t.style.transitionDuration=typeof o=="string"?o:`${o}ms`;t.style[d]=x,t.style.transitionTimingFunction=u,H&&H(t)}),Z=t=>{r==="auto"&&q.start(C.current||0,t),R&&R(w.current,t)};return h.jsx(O,{in:D,onEnter:G,onEntered:Q,onEntering:K,onExit:V,onExited:X,onExiting:Y,addEndListener:Z,nodeRef:w,timeout:r==="auto"?null:r,...k,children:(t,{ownerState:i,...o})=>h.jsx(ht,{as:b,className:at(p.root,L,{entered:p.entered,exited:!D&&x==="0px"&&p.hidden}[t]),style:{[c?"minWidth":"minHeight"]:x,...v},ref:B,ownerState:{...g,state:t},...o,children:h.jsx(mt,{ownerState:{...g,state:t},className:p.wrapper,ref:a,children:h.jsx(ft,{ownerState:{...g,state:t},className:p.wrapperInner,children:A})})})})});U&&(U.muiSupportAuto=!0);const xt=ct(h.jsx("path",{d:"M6 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m12 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}));export{U as C,xt as M};
