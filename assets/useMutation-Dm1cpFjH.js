var ot=e=>{throw TypeError(e)};var Q=(e,t,r)=>t.has(e)||ot("Cannot "+r);var i=(e,t,r)=>(Q(e,t,"read from private field"),r?r.call(e):t.get(e)),$=(e,t,r)=>t.has(e)?ot("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,r),O=(e,t,r,s)=>(Q(e,t,"write to private field"),s?s.call(e,r):t.set(e,r),r),A=(e,t,r)=>(Q(e,t,"access private method"),r);import{r as f,a3 as lt,D as gt,J as vt,aw as yt,a8 as xt,a9 as pt,j as L,as as nt,ax as bt,g as wt,a as kt,u as Pt,W as Et,au as Rt,G as W,c as Z,s as tt,b as I,d as St,ai as Dt,m as ct,P as Tt,ak as Ct}from"./Toast-CQU7HRxP.js";import{S as Mt,s as $t,c as it,g as Ot,n as ut,u as At}from"./react-error-boundary.esm-r1noas7X.js";import{n as Lt,s as zt}from"./SQLiteClient-CAkP0qTy.js";function Bt(e,t,r){const s=t.getBoundingClientRect(),n=r&&r.getBoundingClientRect(),g=pt(t);let a;if(t.fakeTransform)a=t.fakeTransform;else{const p=g.getComputedStyle(t);a=p.getPropertyValue("-webkit-transform")||p.getPropertyValue("transform")}let u=0,d=0;if(a&&a!=="none"&&typeof a=="string"){const p=a.split("(")[1].split(")")[0].split(",");u=parseInt(p[4],10),d=parseInt(p[5],10)}return e==="left"?n?`translateX(${n.right+u-s.left}px)`:`translateX(${g.innerWidth+u-s.left}px)`:e==="right"?n?`translateX(-${s.right-n.left-u}px)`:`translateX(-${s.left+s.width-u}px)`:e==="up"?n?`translateY(${n.bottom+d-s.top}px)`:`translateY(${g.innerHeight+d-s.top}px)`:n?`translateY(-${s.top-n.top+s.height-d}px)`:`translateY(-${s.top+s.height-d}px)`}function jt(e){return typeof e=="function"?e():e}function Y(e,t,r){const s=jt(r),n=Bt(e,t,s);n&&(t.style.webkitTransform=n,t.style.transform=n)}const It=f.forwardRef(function(t,r){const s=lt(),n={enter:s.transitions.easing.easeOut,exit:s.transitions.easing.sharp},g={enter:s.transitions.duration.enteringScreen,exit:s.transitions.duration.leavingScreen},{addEndListener:a,appear:u=!0,children:d,container:p,direction:l="down",easing:v=n,in:w,onEnter:F,onEntered:N,onEntering:U,onExit:T,onExited:z,onExiting:X,style:B,timeout:C=g,TransitionComponent:M=gt,...H}=t,m=f.useRef(null),j=vt(yt(d),m,r),y=o=>c=>{o&&(c===void 0?o(m.current):o(m.current,c))},q=y((o,c)=>{Y(l,o,p),bt(o),F&&F(o,c)}),et=y((o,c)=>{const D=nt({timeout:C,style:B,easing:v},{mode:"enter"});o.style.webkitTransition=s.transitions.create("-webkit-transform",{...D}),o.style.transition=s.transitions.create("transform",{...D}),o.style.webkitTransform="none",o.style.transform="none",U&&U(o,c)}),R=y(N),S=y(X),k=y(o=>{const c=nt({timeout:C,style:B,easing:v},{mode:"exit"});o.style.webkitTransition=s.transitions.create("-webkit-transform",c),o.style.transition=s.transitions.create("transform",c),Y(l,o,p),T&&T(o)}),G=y(o=>{o.style.webkitTransition="",o.style.transition="",z&&z(o)}),J=o=>{a&&a(m.current,o)},V=f.useCallback(()=>{m.current&&Y(l,m.current,p)},[l,p]);return f.useEffect(()=>{if(w||l==="down"||l==="right")return;const o=xt(()=>{m.current&&Y(l,m.current,p)}),c=pt(m.current);return c.addEventListener("resize",o),()=>{o.clear(),c.removeEventListener("resize",o)}},[l,w,p]),f.useEffect(()=>{w||V()},[w,V]),L.jsx(M,{nodeRef:m,onEnter:q,onEntered:R,onEntering:et,onExit:k,onExited:G,onExiting:S,addEndListener:J,appear:u,in:w,timeout:C,...H,children:(o,{ownerState:c,...D})=>f.cloneElement(d,{ref:j,style:{visibility:o==="exited"&&!w?"hidden":void 0,...B,...d.props.style},...D})})});function Ft(e){return wt("MuiDrawer",e)}kt("MuiDrawer",["root","docked","paper","anchorLeft","anchorRight","anchorTop","anchorBottom","paperAnchorLeft","paperAnchorRight","paperAnchorTop","paperAnchorBottom","paperAnchorDockedLeft","paperAnchorDockedRight","paperAnchorDockedTop","paperAnchorDockedBottom","modal"]);const dt=(e,t)=>{const{ownerState:r}=e;return[t.root,(r.variant==="permanent"||r.variant==="persistent")&&t.docked,t.modal]},Ut=e=>{const{classes:t,anchor:r,variant:s}=e,n={root:["root",`anchor${I(r)}`],docked:[(s==="permanent"||s==="persistent")&&"docked"],modal:["modal"],paper:["paper",`paperAnchor${I(r)}`,s!=="temporary"&&`paperAnchorDocked${I(r)}`]};return St(n,Ft,t)},Vt=tt(Dt,{name:"MuiDrawer",slot:"Root",overridesResolver:dt})(ct(({theme:e})=>({zIndex:(e.vars||e).zIndex.drawer}))),Wt=tt("div",{shouldForwardProp:Ct,name:"MuiDrawer",slot:"Docked",skipVariantsResolver:!1,overridesResolver:dt})({flex:"0 0 auto"}),Yt=tt(Tt,{name:"MuiDrawer",slot:"Paper",overridesResolver:(e,t)=>{const{ownerState:r}=e;return[t.paper,t[`paperAnchor${I(r.anchor)}`],r.variant!=="temporary"&&t[`paperAnchorDocked${I(r.anchor)}`]]}})(ct(({theme:e})=>({overflowY:"auto",display:"flex",flexDirection:"column",height:"100%",flex:"1 0 auto",zIndex:(e.vars||e).zIndex.drawer,WebkitOverflowScrolling:"touch",position:"fixed",top:0,outline:0,variants:[{props:{anchor:"left"},style:{left:0}},{props:{anchor:"top"},style:{top:0,left:0,right:0,height:"auto",maxHeight:"100%"}},{props:{anchor:"right"},style:{right:0}},{props:{anchor:"bottom"},style:{top:"auto",left:0,bottom:0,right:0,height:"auto",maxHeight:"100%"}},{props:({ownerState:t})=>t.anchor==="left"&&t.variant!=="temporary",style:{borderRight:`1px solid ${(e.vars||e).palette.divider}`}},{props:({ownerState:t})=>t.anchor==="top"&&t.variant!=="temporary",style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`}},{props:({ownerState:t})=>t.anchor==="right"&&t.variant!=="temporary",style:{borderLeft:`1px solid ${(e.vars||e).palette.divider}`}},{props:({ownerState:t})=>t.anchor==="bottom"&&t.variant!=="temporary",style:{borderTop:`1px solid ${(e.vars||e).palette.divider}`}}]}))),ht={left:"right",right:"left",top:"down",bottom:"up"};function Kt(e){return["left","right"].includes(e)}function Nt({direction:e},t){return e==="rtl"&&Kt(t)?ht[t]:t}const Qt=f.forwardRef(function(t,r){const s=Pt({props:t,name:"MuiDrawer"}),n=lt(),g=Et(),a={enter:n.transitions.duration.enteringScreen,exit:n.transitions.duration.leavingScreen},{anchor:u="left",BackdropProps:d,children:p,className:l,elevation:v=16,hideBackdrop:w=!1,ModalProps:{BackdropProps:F,...N}={},onClose:U,open:T=!1,PaperProps:z={},SlideProps:X,TransitionComponent:B,transitionDuration:C=a,variant:M="temporary",slots:H={},slotProps:m={},...j}=s,y=f.useRef(!1);f.useEffect(()=>{y.current=!0},[]);const q=Nt({direction:g?"rtl":"ltr"},u),R={...s,anchor:u,elevation:v,open:T,variant:M,...j},S=Ut(R),k={slots:{transition:B,...H},slotProps:{paper:z,transition:X,...m,backdrop:Rt(m.backdrop||{...d,...F},{transitionDuration:C})}},[G,J]=W("root",{ref:r,elementType:Vt,className:Z(S.root,S.modal,l),shouldForwardComponentProp:!0,ownerState:R,externalForwardedProps:{...k,...j,...N},additionalProps:{open:T,onClose:U,hideBackdrop:w,slots:{backdrop:k.slots.backdrop},slotProps:{backdrop:k.slotProps.backdrop}}}),[V,o]=W("paper",{elementType:Yt,shouldForwardComponentProp:!0,className:Z(S.paper,z.className),ownerState:R,externalForwardedProps:k,additionalProps:{elevation:M==="temporary"?v:0,square:!0}}),[c,D]=W("docked",{elementType:Wt,ref:r,className:Z(S.root,S.docked,l),ownerState:R,externalForwardedProps:k,additionalProps:j}),[ft,mt]=W("transition",{elementType:It,ownerState:R,externalForwardedProps:k,additionalProps:{in:T,direction:ht[q],timeout:C,appear:y.current}}),rt=L.jsx(V,{...o,children:p});if(M==="permanent")return L.jsx(c,{...D,children:rt});const st=L.jsx(ft,{...mt,children:rt});return M==="persistent"?L.jsx(c,{...D,children:st}):L.jsx(G,{...J,children:st})});var P,E,h,x,b,K,_,at,Xt=(at=class extends Mt{constructor(t,r){super();$(this,b);$(this,P);$(this,E);$(this,h);$(this,x);O(this,P,t),this.setOptions(r),this.bindMethods(),A(this,b,K).call(this)}bindMethods(){this.mutate=this.mutate.bind(this),this.reset=this.reset.bind(this)}setOptions(t){var s;const r=this.options;this.options=i(this,P).defaultMutationOptions(t),$t(this.options,r)||i(this,P).getMutationCache().notify({type:"observerOptionsUpdated",mutation:i(this,h),observer:this}),r!=null&&r.mutationKey&&this.options.mutationKey&&it(r.mutationKey)!==it(this.options.mutationKey)?this.reset():((s=i(this,h))==null?void 0:s.state.status)==="pending"&&i(this,h).setOptions(this.options)}onUnsubscribe(){var t;this.hasListeners()||(t=i(this,h))==null||t.removeObserver(this)}onMutationUpdate(t){A(this,b,K).call(this),A(this,b,_).call(this,t)}getCurrentResult(){return i(this,E)}reset(){var t;(t=i(this,h))==null||t.removeObserver(this),O(this,h,void 0),A(this,b,K).call(this),A(this,b,_).call(this)}mutate(t,r){var s;return O(this,x,r),(s=i(this,h))==null||s.removeObserver(this),O(this,h,i(this,P).getMutationCache().build(i(this,P),this.options)),i(this,h).addObserver(this),i(this,h).execute(t)}},P=new WeakMap,E=new WeakMap,h=new WeakMap,x=new WeakMap,b=new WeakSet,K=function(){var r;const t=((r=i(this,h))==null?void 0:r.state)??Ot();O(this,E,{...t,isPending:t.status==="pending",isSuccess:t.status==="success",isError:t.status==="error",isIdle:t.status==="idle",mutate:this.mutate,reset:this.reset})},_=function(t){ut.batch(()=>{var r,s,n,g,a,u,d,p;if(i(this,x)&&this.hasListeners()){const l=i(this,E).variables,v=i(this,E).context;(t==null?void 0:t.type)==="success"?((s=(r=i(this,x)).onSuccess)==null||s.call(r,t.data,l,v),(g=(n=i(this,x)).onSettled)==null||g.call(n,t.data,null,l,v)):(t==null?void 0:t.type)==="error"&&((u=(a=i(this,x)).onError)==null||u.call(a,t.error,l,v),(p=(d=i(this,x)).onSettled)==null||p.call(d,void 0,t.error,l,v))}this.listeners.forEach(l=>{l(i(this,E))})})},at);function Zt(e,t){const r=At(),[s]=f.useState(()=>new Xt(r,e));f.useEffect(()=>{s.setOptions(e)},[s,e]);const n=f.useSyncExternalStore(f.useCallback(a=>s.subscribe(ut.batchCalls(a)),[s]),()=>s.getCurrentResult(),()=>s.getCurrentResult()),g=f.useCallback((a,u)=>{s.mutate(a,u).catch(Lt)},[s]);if(n.error&&zt(s.options.throwOnError,[n.error]))throw n.error;return{...n,mutate:g,mutateAsync:n.mutate}}export{Qt as D,Nt as g,Kt as i,Zt as u};
