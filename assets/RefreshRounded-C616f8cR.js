var Et=e=>{throw TypeError(e)};var bt=(e,t,s)=>t.has(e)||Et("Cannot "+s);var i=(e,t,s)=>(bt(e,t,"read from private field"),s?s.call(e):t.get(e)),l=(e,t,s)=>t.has(e)?Et("Cannot add the same private member more than once"):t instanceof WeakSet?t.add(e):t.set(e,s),h=(e,t,s,r)=>(bt(e,t,"write to private field"),r?r.call(e,s):t.set(e,s),s),P=(e,t,s)=>(bt(e,t,"access private method"),s);var yt=(e,t,s,r)=>({set _(n){h(e,t,n,s)},get _(){return i(e,t,r)}});import{r as $,j as Lt,o as Zt}from"./routes-DMR351mu.js";var vt=class{constructor(){this.listeners=new Set,this.subscribe=this.subscribe.bind(this)}subscribe(e){return this.listeners.add(e),this.onSubscribe(),()=>{this.listeners.delete(e),this.onUnsubscribe()}}hasListeners(){return this.listeners.size>0}onSubscribe(){}onUnsubscribe(){}},gt=typeof window>"u"||"Deno"in globalThis;function A(){}function _t(e,t){return typeof e=="function"?e(t):e}function $t(e){return typeof e=="number"&&e>=0&&e!==1/0}function te(e,t){return Math.max(e+(t||0)-Date.now(),0)}function Qt(e,t){return typeof e=="function"?e(t):e}function ee(e,t){return typeof e=="function"?e(t):e}function Dt(e,t){const{type:s="all",exact:r,fetchStatus:n,predicate:a,queryKey:o,stale:u}=e;if(o){if(r){if(t.queryHash!==St(o,t.options))return!1}else if(!ct(t.queryKey,o))return!1}if(s!=="all"){const d=t.isActive();if(s==="active"&&!d||s==="inactive"&&d)return!1}return!(typeof u=="boolean"&&t.isStale()!==u||n&&n!==t.state.fetchStatus||a&&!a(t))}function Mt(e,t){const{exact:s,status:r,predicate:n,mutationKey:a}=e;if(a){if(!t.options.mutationKey)return!1;if(s){if(ht(t.options.mutationKey)!==ht(a))return!1}else if(!ct(t.options.mutationKey,a))return!1}return!(r&&t.state.status!==r||n&&!n(t))}function St(e,t){return((t==null?void 0:t.queryKeyHashFn)||ht)(e)}function ht(e){return JSON.stringify(e,(t,s)=>Ct(s)?Object.keys(s).sort().reduce((r,n)=>(r[n]=s[n],r),{}):s)}function ct(e,t){return e===t?!0:typeof e!=typeof t?!1:e&&t&&typeof e=="object"&&typeof t=="object"?!Object.keys(t).some(s=>!ct(e[s],t[s])):!1}function Gt(e,t){if(e===t)return e;const s=qt(e)&&qt(t);if(s||Ct(e)&&Ct(t)){const r=s?e:Object.keys(e),n=r.length,a=s?t:Object.keys(t),o=a.length,u=s?[]:{};let d=0;for(let w=0;w<o;w++){const m=s?w:a[w];(!s&&r.includes(m)||s)&&e[m]===void 0&&t[m]===void 0?(u[m]=void 0,d++):(u[m]=Gt(e[m],t[m]),u[m]===e[m]&&e[m]!==void 0&&d++)}return n===o&&d===n?e:u}return t}function Ce(e,t){if(!t||Object.keys(e).length!==Object.keys(t).length)return!1;for(const s in e)if(e[s]!==t[s])return!1;return!0}function qt(e){return Array.isArray(e)&&e.length===Object.keys(e).length}function Ct(e){if(!At(e))return!1;const t=e.constructor;if(t===void 0)return!0;const s=t.prototype;return!(!At(s)||!s.hasOwnProperty("isPrototypeOf")||Object.getPrototypeOf(e)!==Object.prototype)}function At(e){return Object.prototype.toString.call(e)==="[object Object]"}function se(e){return new Promise(t=>{setTimeout(t,e)})}function re(e,t,s){return typeof s.structuralSharing=="function"?s.structuralSharing(e,t):s.structuralSharing!==!1?Gt(e,t):t}function ie(e,t,s=0){const r=[...e,t];return s&&r.length>s?r.slice(1):r}function ne(e,t,s=0){const r=[t,...e];return s&&r.length>s?r.slice(0,-1):r}var Ft=Symbol();function Bt(e,t){return!e.queryFn&&(t!=null&&t.initialPromise)?()=>t.initialPromise:!e.queryFn||e.queryFn===Ft?()=>Promise.reject(new Error(`Missing queryFn: '${e.queryHash}'`)):e.queryFn}var W,G,tt,jt,ae=(jt=class extends vt{constructor(){super();l(this,W);l(this,G);l(this,tt);h(this,tt,t=>{if(!gt&&window.addEventListener){const s=()=>t();return window.addEventListener("visibilitychange",s,!1),()=>{window.removeEventListener("visibilitychange",s)}}})}onSubscribe(){i(this,G)||this.setEventListener(i(this,tt))}onUnsubscribe(){var t;this.hasListeners()||((t=i(this,G))==null||t.call(this),h(this,G,void 0))}setEventListener(t){var s;h(this,tt,t),(s=i(this,G))==null||s.call(this),h(this,G,t(r=>{typeof r=="boolean"?this.setFocused(r):this.onFocus()}))}setFocused(t){i(this,W)!==t&&(h(this,W,t),this.onFocus())}onFocus(){const t=this.isFocused();this.listeners.forEach(s=>{s(t)})}isFocused(){var t;return typeof i(this,W)=="boolean"?i(this,W):((t=globalThis.document)==null?void 0:t.visibilityState)!=="hidden"}},W=new WeakMap,G=new WeakMap,tt=new WeakMap,jt),Nt=new ae,et,B,st,Tt,ue=(Tt=class extends vt{constructor(){super();l(this,et,!0);l(this,B);l(this,st);h(this,st,t=>{if(!gt&&window.addEventListener){const s=()=>t(!0),r=()=>t(!1);return window.addEventListener("online",s,!1),window.addEventListener("offline",r,!1),()=>{window.removeEventListener("online",s),window.removeEventListener("offline",r)}}})}onSubscribe(){i(this,B)||this.setEventListener(i(this,st))}onUnsubscribe(){var t;this.hasListeners()||((t=i(this,B))==null||t.call(this),h(this,B,void 0))}setEventListener(t){var s;h(this,st,t),(s=i(this,B))==null||s.call(this),h(this,B,t(this.setOnline.bind(this)))}setOnline(t){i(this,et)!==t&&(h(this,et,t),this.listeners.forEach(r=>{r(t)}))}isOnline(){return i(this,et)}},et=new WeakMap,B=new WeakMap,st=new WeakMap,Tt),mt=new ue;function oe(){let e,t;const s=new Promise((n,a)=>{e=n,t=a});s.status="pending",s.catch(()=>{});function r(n){Object.assign(s,n),delete s.resolve,delete s.reject}return s.resolve=n=>{r({status:"fulfilled",value:n}),e(n)},s.reject=n=>{r({status:"rejected",reason:n}),t(n)},s}function he(e){return Math.min(1e3*2**e,3e4)}function zt(e){return(e??"online")==="online"?mt.isOnline():!0}var Vt=class extends Error{constructor(e){super("CancelledError"),this.revert=e==null?void 0:e.revert,this.silent=e==null?void 0:e.silent}};function wt(e){return e instanceof Vt}function Jt(e){let t=!1,s=0,r=!1,n;const a=oe(),o=c=>{var p;r||(y(new Vt(c)),(p=e.abort)==null||p.call(e))},u=()=>{t=!0},d=()=>{t=!1},w=()=>Nt.isFocused()&&(e.networkMode==="always"||mt.isOnline())&&e.canRun(),m=()=>zt(e.networkMode)&&e.canRun(),f=c=>{var p;r||(r=!0,(p=e.onSuccess)==null||p.call(e,c),n==null||n(),a.resolve(c))},y=c=>{var p;r||(r=!0,(p=e.onError)==null||p.call(e,c),n==null||n(),a.reject(c))},E=()=>new Promise(c=>{var p;n=Q=>{(r||w())&&c(Q)},(p=e.onPause)==null||p.call(e)}).then(()=>{var c;n=void 0,r||(c=e.onContinue)==null||c.call(e)}),O=()=>{if(r)return;let c;const p=s===0?e.initialPromise:void 0;try{c=p??e.fn()}catch(Q){c=Promise.reject(Q)}Promise.resolve(c).then(f).catch(Q=>{var x;if(r)return;const q=e.retry??(gt?0:3),g=e.retryDelay??he,D=typeof g=="function"?g(s,Q):g,T=q===!0||typeof q=="number"&&s<q||typeof q=="function"&&q(s,Q);if(t||!T){y(Q);return}s++,(x=e.onFail)==null||x.call(e,s,Q),se(D).then(()=>w()?void 0:E()).then(()=>{t?y(Q):O()})})};return{promise:a,cancel:o,continue:()=>(n==null||n(),a),cancelRetry:u,continueRetry:d,canStart:m,start:()=>(m()?O():E().then(O),a)}}function ce(){let e=[],t=0,s=u=>{u()},r=u=>{u()},n=u=>setTimeout(u,0);const a=u=>{t?e.push(u):n(()=>{s(u)})},o=()=>{const u=e;e=[],u.length&&n(()=>{r(()=>{u.forEach(d=>{s(d)})})})};return{batch:u=>{let d;t++;try{d=u()}finally{t--,t||o()}return d},batchCalls:u=>(...d)=>{a(()=>{u(...d)})},schedule:a,setNotifyFunction:u=>{s=u},setBatchNotifyFunction:u=>{r=u},setScheduler:u=>{n=u}}}var F=ce(),X,xt,Wt=(xt=class{constructor(){l(this,X)}destroy(){this.clearGcTimeout()}scheduleGc(){this.clearGcTimeout(),$t(this.gcTime)&&h(this,X,setTimeout(()=>{this.optionalRemove()},this.gcTime))}updateGcTime(e){this.gcTime=Math.max(this.gcTime||0,e??(gt?1/0:5*60*1e3))}clearGcTimeout(){i(this,X)&&(clearTimeout(i(this,X)),h(this,X,void 0))}},X=new WeakMap,xt),rt,it,M,Y,C,lt,Z,R,k,Kt,le=(Kt=class extends Wt{constructor(t){super();l(this,R);l(this,rt);l(this,it);l(this,M);l(this,Y);l(this,C);l(this,lt);l(this,Z);h(this,Z,!1),h(this,lt,t.defaultOptions),this.setOptions(t.options),this.observers=[],h(this,Y,t.client),h(this,M,i(this,Y).getQueryCache()),this.queryKey=t.queryKey,this.queryHash=t.queryHash,h(this,rt,fe(this.options)),this.state=t.state??i(this,rt),this.scheduleGc()}get meta(){return this.options.meta}get promise(){var t;return(t=i(this,C))==null?void 0:t.promise}setOptions(t){this.options={...i(this,lt),...t},this.updateGcTime(this.options.gcTime)}optionalRemove(){!this.observers.length&&this.state.fetchStatus==="idle"&&i(this,M).remove(this)}setData(t,s){const r=re(this.state.data,t,this.options);return P(this,R,k).call(this,{data:r,type:"success",dataUpdatedAt:s==null?void 0:s.updatedAt,manual:s==null?void 0:s.manual}),r}setState(t,s){P(this,R,k).call(this,{type:"setState",state:t,setStateOptions:s})}cancel(t){var r,n;const s=(r=i(this,C))==null?void 0:r.promise;return(n=i(this,C))==null||n.cancel(t),s?s.then(A).catch(A):Promise.resolve()}destroy(){super.destroy(),this.cancel({silent:!0})}reset(){this.destroy(),this.setState(i(this,rt))}isActive(){return this.observers.some(t=>ee(t.options.enabled,this)!==!1)}isDisabled(){return this.getObserversCount()>0?!this.isActive():this.options.queryFn===Ft||this.state.dataUpdateCount+this.state.errorUpdateCount===0}isStale(){return this.state.isInvalidated?!0:this.getObserversCount()>0?this.observers.some(t=>t.getCurrentResult().isStale):this.state.data===void 0}isStaleByTime(t=0){return this.state.isInvalidated||this.state.data===void 0||!te(this.state.dataUpdatedAt,t)}onFocus(){var s;const t=this.observers.find(r=>r.shouldFetchOnWindowFocus());t==null||t.refetch({cancelRefetch:!1}),(s=i(this,C))==null||s.continue()}onOnline(){var s;const t=this.observers.find(r=>r.shouldFetchOnReconnect());t==null||t.refetch({cancelRefetch:!1}),(s=i(this,C))==null||s.continue()}addObserver(t){this.observers.includes(t)||(this.observers.push(t),this.clearGcTimeout(),i(this,M).notify({type:"observerAdded",query:this,observer:t}))}removeObserver(t){this.observers.includes(t)&&(this.observers=this.observers.filter(s=>s!==t),this.observers.length||(i(this,C)&&(i(this,Z)?i(this,C).cancel({revert:!0}):i(this,C).cancelRetry()),this.scheduleGc()),i(this,M).notify({type:"observerRemoved",query:this,observer:t}))}getObserversCount(){return this.observers.length}invalidate(){this.state.isInvalidated||P(this,R,k).call(this,{type:"invalidate"})}fetch(t,s){var d,w,m;if(this.state.fetchStatus!=="idle"){if(this.state.data!==void 0&&(s!=null&&s.cancelRefetch))this.cancel({silent:!0});else if(i(this,C))return i(this,C).continueRetry(),i(this,C).promise}if(t&&this.setOptions(t),!this.options.queryFn){const f=this.observers.find(y=>y.options.queryFn);f&&this.setOptions(f.options)}const r=new AbortController,n=f=>{Object.defineProperty(f,"signal",{enumerable:!0,get:()=>(h(this,Z,!0),r.signal)})},a=()=>{const f=Bt(this.options,s),y={client:i(this,Y),queryKey:this.queryKey,meta:this.meta};return n(y),h(this,Z,!1),this.options.persister?this.options.persister(f,y,this):f(y)},o={fetchOptions:s,options:this.options,queryKey:this.queryKey,client:i(this,Y),state:this.state,fetchFn:a};n(o),(d=this.options.behavior)==null||d.onFetch(o,this),h(this,it,this.state),(this.state.fetchStatus==="idle"||this.state.fetchMeta!==((w=o.fetchOptions)==null?void 0:w.meta))&&P(this,R,k).call(this,{type:"fetch",meta:(m=o.fetchOptions)==null?void 0:m.meta});const u=f=>{var y,E,O,c;wt(f)&&f.silent||P(this,R,k).call(this,{type:"error",error:f}),wt(f)||((E=(y=i(this,M).config).onError)==null||E.call(y,f,this),(c=(O=i(this,M).config).onSettled)==null||c.call(O,this.state.data,f,this)),this.scheduleGc()};return h(this,C,Jt({initialPromise:s==null?void 0:s.initialPromise,fn:o.fetchFn,abort:r.abort.bind(r),onSuccess:f=>{var y,E,O,c;if(f===void 0){u(new Error(`${this.queryHash} data is undefined`));return}try{this.setData(f)}catch(p){u(p);return}(E=(y=i(this,M).config).onSuccess)==null||E.call(y,f,this),(c=(O=i(this,M).config).onSettled)==null||c.call(O,f,this.state.error,this),this.scheduleGc()},onError:u,onFail:(f,y)=>{P(this,R,k).call(this,{type:"failed",failureCount:f,error:y})},onPause:()=>{P(this,R,k).call(this,{type:"pause"})},onContinue:()=>{P(this,R,k).call(this,{type:"continue"})},retry:o.options.retry,retryDelay:o.options.retryDelay,networkMode:o.options.networkMode,canRun:()=>!0})),i(this,C).start()}},rt=new WeakMap,it=new WeakMap,M=new WeakMap,Y=new WeakMap,C=new WeakMap,lt=new WeakMap,Z=new WeakMap,R=new WeakSet,k=function(t){const s=r=>{switch(t.type){case"failed":return{...r,fetchFailureCount:t.failureCount,fetchFailureReason:t.error};case"pause":return{...r,fetchStatus:"paused"};case"continue":return{...r,fetchStatus:"fetching"};case"fetch":return{...r,...de(r.data,this.options),fetchMeta:t.meta??null};case"success":return{...r,data:t.data,dataUpdateCount:r.dataUpdateCount+1,dataUpdatedAt:t.dataUpdatedAt??Date.now(),error:null,isInvalidated:!1,status:"success",...!t.manual&&{fetchStatus:"idle",fetchFailureCount:0,fetchFailureReason:null}};case"error":const n=t.error;return wt(n)&&n.revert&&i(this,it)?{...i(this,it),fetchStatus:"idle"}:{...r,error:n,errorUpdateCount:r.errorUpdateCount+1,errorUpdatedAt:Date.now(),fetchFailureCount:r.fetchFailureCount+1,fetchFailureReason:n,fetchStatus:"idle",status:"error"};case"invalidate":return{...r,isInvalidated:!0};case"setState":return{...r,...t.state}}};this.state=s(this.state),F.batch(()=>{this.observers.forEach(r=>{r.onQueryUpdate()}),i(this,M).notify({query:this,type:"updated",action:t})})},Kt);function de(e,t){return{fetchFailureCount:0,fetchFailureReason:null,fetchStatus:zt(t.networkMode)?"fetching":"paused",...e===void 0&&{error:null,status:"pending"}}}function fe(e){const t=typeof e.initialData=="function"?e.initialData():e.initialData,s=t!==void 0,r=s?typeof e.initialDataUpdatedAt=="function"?e.initialDataUpdatedAt():e.initialDataUpdatedAt:0;return{data:t,dataUpdateCount:0,dataUpdatedAt:s?r??Date.now():0,error:null,errorUpdateCount:0,errorUpdatedAt:0,fetchFailureCount:0,fetchFailureReason:null,fetchMeta:null,isInvalidated:!1,status:s?"success":"pending",fetchStatus:"idle"}}var K,Ut,ye=(Ut=class extends vt{constructor(t={}){super();l(this,K);this.config=t,h(this,K,new Map)}build(t,s,r){const n=s.queryKey,a=s.queryHash??St(n,s);let o=this.get(a);return o||(o=new le({client:t,queryKey:n,queryHash:a,options:t.defaultQueryOptions(s),state:r,defaultOptions:t.getQueryDefaults(n)}),this.add(o)),o}add(t){i(this,K).has(t.queryHash)||(i(this,K).set(t.queryHash,t),this.notify({type:"added",query:t}))}remove(t){const s=i(this,K).get(t.queryHash);s&&(t.destroy(),s===t&&i(this,K).delete(t.queryHash),this.notify({type:"removed",query:t}))}clear(){F.batch(()=>{this.getAll().forEach(t=>{this.remove(t)})})}get(t){return i(this,K).get(t)}getAll(){return[...i(this,K).values()]}find(t){const s={exact:!0,...t};return this.getAll().find(r=>Dt(s,r))}findAll(t={}){const s=this.getAll();return Object.keys(t).length>0?s.filter(r=>Dt(t,r)):s}notify(t){F.batch(()=>{this.listeners.forEach(s=>{s(t)})})}onFocus(){F.batch(()=>{this.getAll().forEach(t=>{t.onFocus()})})}onOnline(){F.batch(()=>{this.getAll().forEach(t=>{t.onOnline()})})}},K=new WeakMap,Ut),U,S,_,I,L,It,pe=(It=class extends Wt{constructor(t){super();l(this,I);l(this,U);l(this,S);l(this,_);this.mutationId=t.mutationId,h(this,S,t.mutationCache),h(this,U,[]),this.state=t.state||me(),this.setOptions(t.options),this.scheduleGc()}setOptions(t){this.options=t,this.updateGcTime(this.options.gcTime)}get meta(){return this.options.meta}addObserver(t){i(this,U).includes(t)||(i(this,U).push(t),this.clearGcTimeout(),i(this,S).notify({type:"observerAdded",mutation:this,observer:t}))}removeObserver(t){h(this,U,i(this,U).filter(s=>s!==t)),this.scheduleGc(),i(this,S).notify({type:"observerRemoved",mutation:this,observer:t})}optionalRemove(){i(this,U).length||(this.state.status==="pending"?this.scheduleGc():i(this,S).remove(this))}continue(){var t;return((t=i(this,_))==null?void 0:t.continue())??this.execute(this.state.variables)}async execute(t){var n,a,o,u,d,w,m,f,y,E,O,c,p,Q,q,g,D,T,x,ft;h(this,_,Jt({fn:()=>this.options.mutationFn?this.options.mutationFn(t):Promise.reject(new Error("No mutationFn found")),onFail:(b,J)=>{P(this,I,L).call(this,{type:"failed",failureCount:b,error:J})},onPause:()=>{P(this,I,L).call(this,{type:"pause"})},onContinue:()=>{P(this,I,L).call(this,{type:"continue"})},retry:this.options.retry??0,retryDelay:this.options.retryDelay,networkMode:this.options.networkMode,canRun:()=>i(this,S).canRun(this)}));const s=this.state.status==="pending",r=!i(this,_).canStart();try{if(!s){P(this,I,L).call(this,{type:"pending",variables:t,isPaused:r}),await((a=(n=i(this,S).config).onMutate)==null?void 0:a.call(n,t,this));const J=await((u=(o=this.options).onMutate)==null?void 0:u.call(o,t));J!==this.state.context&&P(this,I,L).call(this,{type:"pending",context:J,variables:t,isPaused:r})}const b=await i(this,_).start();return await((w=(d=i(this,S).config).onSuccess)==null?void 0:w.call(d,b,t,this.state.context,this)),await((f=(m=this.options).onSuccess)==null?void 0:f.call(m,b,t,this.state.context)),await((E=(y=i(this,S).config).onSettled)==null?void 0:E.call(y,b,null,this.state.variables,this.state.context,this)),await((c=(O=this.options).onSettled)==null?void 0:c.call(O,b,null,t,this.state.context)),P(this,I,L).call(this,{type:"success",data:b}),b}catch(b){try{throw await((Q=(p=i(this,S).config).onError)==null?void 0:Q.call(p,b,t,this.state.context,this)),await((g=(q=this.options).onError)==null?void 0:g.call(q,b,t,this.state.context)),await((T=(D=i(this,S).config).onSettled)==null?void 0:T.call(D,void 0,b,this.state.variables,this.state.context,this)),await((ft=(x=this.options).onSettled)==null?void 0:ft.call(x,void 0,b,t,this.state.context)),b}finally{P(this,I,L).call(this,{type:"error",error:b})}}finally{i(this,S).runNext(this)}}},U=new WeakMap,S=new WeakMap,_=new WeakMap,I=new WeakSet,L=function(t){const s=r=>{switch(t.type){case"failed":return{...r,failureCount:t.failureCount,failureReason:t.error};case"pause":return{...r,isPaused:!0};case"continue":return{...r,isPaused:!1};case"pending":return{...r,context:t.context,data:void 0,failureCount:0,failureReason:null,error:null,isPaused:t.isPaused,status:"pending",variables:t.variables,submittedAt:Date.now()};case"success":return{...r,data:t.data,failureCount:0,failureReason:null,error:null,status:"success",isPaused:!1};case"error":return{...r,data:void 0,error:t.error,failureCount:r.failureCount+1,failureReason:t.error,isPaused:!1,status:"error"}}};this.state=s(this.state),F.batch(()=>{i(this,U).forEach(r=>{r.onMutationUpdate(t)}),i(this,S).notify({mutation:this,type:"updated",action:t})})},It);function me(){return{context:void 0,data:void 0,error:null,failureCount:0,failureReason:null,isPaused:!1,status:"idle",variables:void 0,submittedAt:0}}var H,j,dt,kt,ve=(kt=class extends vt{constructor(t={}){super();l(this,H);l(this,j);l(this,dt);this.config=t,h(this,H,new Set),h(this,j,new Map),h(this,dt,0)}build(t,s,r){const n=new pe({mutationCache:this,mutationId:++yt(this,dt)._,options:t.defaultMutationOptions(s),state:r});return this.add(n),n}add(t){i(this,H).add(t);const s=pt(t);if(typeof s=="string"){const r=i(this,j).get(s);r?r.push(t):i(this,j).set(s,[t])}this.notify({type:"added",mutation:t})}remove(t){if(i(this,H).delete(t)){const s=pt(t);if(typeof s=="string"){const r=i(this,j).get(s);if(r)if(r.length>1){const n=r.indexOf(t);n!==-1&&r.splice(n,1)}else r[0]===t&&i(this,j).delete(s)}}this.notify({type:"removed",mutation:t})}canRun(t){const s=pt(t);if(typeof s=="string"){const r=i(this,j).get(s),n=r==null?void 0:r.find(a=>a.state.status==="pending");return!n||n===t}else return!0}runNext(t){var r;const s=pt(t);if(typeof s=="string"){const n=(r=i(this,j).get(s))==null?void 0:r.find(a=>a!==t&&a.state.isPaused);return(n==null?void 0:n.continue())??Promise.resolve()}else return Promise.resolve()}clear(){F.batch(()=>{i(this,H).forEach(t=>{this.notify({type:"removed",mutation:t})}),i(this,H).clear(),i(this,j).clear()})}getAll(){return Array.from(i(this,H))}find(t){const s={exact:!0,...t};return this.getAll().find(r=>Mt(s,r))}findAll(t={}){return this.getAll().filter(s=>Mt(t,s))}notify(t){F.batch(()=>{this.listeners.forEach(s=>{s(t)})})}resumePausedMutations(){const t=this.getAll().filter(s=>s.state.isPaused);return F.batch(()=>Promise.all(t.map(s=>s.continue().catch(A))))}},H=new WeakMap,j=new WeakMap,dt=new WeakMap,kt);function pt(e){var t;return(t=e.options.scope)==null?void 0:t.id}function Rt(e){return{onFetch:(t,s)=>{var m,f,y,E,O;const r=t.options,n=(y=(f=(m=t.fetchOptions)==null?void 0:m.meta)==null?void 0:f.fetchMore)==null?void 0:y.direction,a=((E=t.state.data)==null?void 0:E.pages)||[],o=((O=t.state.data)==null?void 0:O.pageParams)||[];let u={pages:[],pageParams:[]},d=0;const w=async()=>{let c=!1;const p=g=>{Object.defineProperty(g,"signal",{enumerable:!0,get:()=>(t.signal.aborted?c=!0:t.signal.addEventListener("abort",()=>{c=!0}),t.signal)})},Q=Bt(t.options,t.fetchOptions),q=async(g,D,T)=>{if(c)return Promise.reject();if(D==null&&g.pages.length)return Promise.resolve(g);const x={client:t.client,queryKey:t.queryKey,pageParam:D,direction:T?"backward":"forward",meta:t.options.meta};p(x);const ft=await Q(x),{maxPages:b}=t.options,J=T?ne:ie;return{pages:J(g.pages,ft,b),pageParams:J(g.pageParams,D,b)}};if(n&&a.length){const g=n==="backward",D=g?Xt:Ot,T={pages:a,pageParams:o},x=D(r,T);u=await q(T,x,g)}else{const g=e??a.length;do{const D=d===0?o[0]??r.initialPageParam:Ot(r,u);if(d>0&&D==null)break;u=await q(u,D),d++}while(d<g)}return u};t.options.persister?t.fetchFn=()=>{var c,p;return(p=(c=t.options).persister)==null?void 0:p.call(c,w,{client:t.client,queryKey:t.queryKey,meta:t.options.meta,signal:t.signal},s)}:t.fetchFn=w}}}function Ot(e,{pages:t,pageParams:s}){const r=t.length-1;return t.length>0?e.getNextPageParam(t[r],t,s[r],s):void 0}function Xt(e,{pages:t,pageParams:s}){var r;return t.length>0?(r=e.getPreviousPageParam)==null?void 0:r.call(e,t[0],t,s[0],s):void 0}function Oe(e,t){return t?Ot(e,t)!=null:!1}function Se(e,t){return!t||!e.getPreviousPageParam?!1:Xt(e,t)!=null}var v,N,z,nt,at,V,ut,ot,Ht,Fe=(Ht=class{constructor(e={}){l(this,v);l(this,N);l(this,z);l(this,nt);l(this,at);l(this,V);l(this,ut);l(this,ot);h(this,v,e.queryCache||new ye),h(this,N,e.mutationCache||new ve),h(this,z,e.defaultOptions||{}),h(this,nt,new Map),h(this,at,new Map),h(this,V,0)}mount(){yt(this,V)._++,i(this,V)===1&&(h(this,ut,Nt.subscribe(async e=>{e&&(await this.resumePausedMutations(),i(this,v).onFocus())})),h(this,ot,mt.subscribe(async e=>{e&&(await this.resumePausedMutations(),i(this,v).onOnline())})))}unmount(){var e,t;yt(this,V)._--,i(this,V)===0&&((e=i(this,ut))==null||e.call(this),h(this,ut,void 0),(t=i(this,ot))==null||t.call(this),h(this,ot,void 0))}isFetching(e){return i(this,v).findAll({...e,fetchStatus:"fetching"}).length}isMutating(e){return i(this,N).findAll({...e,status:"pending"}).length}getQueryData(e){var s;const t=this.defaultQueryOptions({queryKey:e});return(s=i(this,v).get(t.queryHash))==null?void 0:s.state.data}ensureQueryData(e){const t=this.defaultQueryOptions(e),s=i(this,v).build(this,t),r=s.state.data;return r===void 0?this.fetchQuery(e):(e.revalidateIfStale&&s.isStaleByTime(Qt(t.staleTime,s))&&this.prefetchQuery(t),Promise.resolve(r))}getQueriesData(e){return i(this,v).findAll(e).map(({queryKey:t,state:s})=>{const r=s.data;return[t,r]})}setQueryData(e,t,s){const r=this.defaultQueryOptions({queryKey:e}),n=i(this,v).get(r.queryHash),a=n==null?void 0:n.state.data,o=_t(t,a);if(o!==void 0)return i(this,v).build(this,r).setData(o,{...s,manual:!0})}setQueriesData(e,t,s){return F.batch(()=>i(this,v).findAll(e).map(({queryKey:r})=>[r,this.setQueryData(r,t,s)]))}getQueryState(e){var s;const t=this.defaultQueryOptions({queryKey:e});return(s=i(this,v).get(t.queryHash))==null?void 0:s.state}removeQueries(e){const t=i(this,v);F.batch(()=>{t.findAll(e).forEach(s=>{t.remove(s)})})}resetQueries(e,t){const s=i(this,v);return F.batch(()=>(s.findAll(e).forEach(r=>{r.reset()}),this.refetchQueries({type:"active",...e},t)))}cancelQueries(e,t={}){const s={revert:!0,...t},r=F.batch(()=>i(this,v).findAll(e).map(n=>n.cancel(s)));return Promise.all(r).then(A).catch(A)}invalidateQueries(e,t={}){return F.batch(()=>(i(this,v).findAll(e).forEach(s=>{s.invalidate()}),(e==null?void 0:e.refetchType)==="none"?Promise.resolve():this.refetchQueries({...e,type:(e==null?void 0:e.refetchType)??(e==null?void 0:e.type)??"active"},t)))}refetchQueries(e,t={}){const s={...t,cancelRefetch:t.cancelRefetch??!0},r=F.batch(()=>i(this,v).findAll(e).filter(n=>!n.isDisabled()).map(n=>{let a=n.fetch(void 0,s);return s.throwOnError||(a=a.catch(A)),n.state.fetchStatus==="paused"?Promise.resolve():a}));return Promise.all(r).then(A)}fetchQuery(e){const t=this.defaultQueryOptions(e);t.retry===void 0&&(t.retry=!1);const s=i(this,v).build(this,t);return s.isStaleByTime(Qt(t.staleTime,s))?s.fetch(t):Promise.resolve(s.state.data)}prefetchQuery(e){return this.fetchQuery(e).then(A).catch(A)}fetchInfiniteQuery(e){return e.behavior=Rt(e.pages),this.fetchQuery(e)}prefetchInfiniteQuery(e){return this.fetchInfiniteQuery(e).then(A).catch(A)}ensureInfiniteQueryData(e){return e.behavior=Rt(e.pages),this.ensureQueryData(e)}resumePausedMutations(){return mt.isOnline()?i(this,N).resumePausedMutations():Promise.resolve()}getQueryCache(){return i(this,v)}getMutationCache(){return i(this,N)}getDefaultOptions(){return i(this,z)}setDefaultOptions(e){h(this,z,e)}setQueryDefaults(e,t){i(this,nt).set(ht(e),{queryKey:e,defaultOptions:t})}getQueryDefaults(e){const t=[...i(this,nt).values()],s={};return t.forEach(r=>{ct(e,r.queryKey)&&Object.assign(s,r.defaultOptions)}),s}setMutationDefaults(e,t){i(this,at).set(ht(e),{mutationKey:e,defaultOptions:t})}getMutationDefaults(e){const t=[...i(this,at).values()],s={};return t.forEach(r=>{ct(e,r.mutationKey)&&Object.assign(s,r.defaultOptions)}),s}defaultQueryOptions(e){if(e._defaulted)return e;const t={...i(this,z).queries,...this.getQueryDefaults(e.queryKey),...e,_defaulted:!0};return t.queryHash||(t.queryHash=St(t.queryKey,t)),t.refetchOnReconnect===void 0&&(t.refetchOnReconnect=t.networkMode!=="always"),t.throwOnError===void 0&&(t.throwOnError=!!t.suspense),!t.networkMode&&t.persister&&(t.networkMode="offlineFirst"),t.queryFn===Ft&&(t.enabled=!1),t}defaultMutationOptions(e){return e!=null&&e._defaulted?e:{...i(this,z).mutations,...(e==null?void 0:e.mutationKey)&&this.getMutationDefaults(e.mutationKey),...e,_defaulted:!0}}clear(){i(this,v).clear(),i(this,N).clear()}},v=new WeakMap,N=new WeakMap,z=new WeakMap,nt=new WeakMap,at=new WeakMap,V=new WeakMap,ut=new WeakMap,ot=new WeakMap,Ht),Yt=$.createContext(void 0),Ee=e=>{const t=$.useContext(Yt);if(!t)throw new Error("No QueryClient set, use QueryClientProvider to set one");return t},Qe=({client:e,children:t})=>($.useEffect(()=>(e.mount(),()=>{e.unmount()}),[e]),Lt.jsx(Yt.Provider,{value:e,children:t}));const ge=$.createContext(null),Pt={didCatch:!1,error:null};class De extends $.Component{constructor(t){super(t),this.resetErrorBoundary=this.resetErrorBoundary.bind(this),this.state=Pt}static getDerivedStateFromError(t){return{didCatch:!0,error:t}}resetErrorBoundary(){const{error:t}=this.state;if(t!==null){for(var s,r,n=arguments.length,a=new Array(n),o=0;o<n;o++)a[o]=arguments[o];(s=(r=this.props).onReset)===null||s===void 0||s.call(r,{args:a,reason:"imperative-api"}),this.setState(Pt)}}componentDidCatch(t,s){var r,n;(r=(n=this.props).onError)===null||r===void 0||r.call(n,t,s)}componentDidUpdate(t,s){const{didCatch:r}=this.state,{resetKeys:n}=this.props;if(r&&s.error!==null&&be(t.resetKeys,n)){var a,o;(a=(o=this.props).onReset)===null||a===void 0||a.call(o,{next:n,prev:t.resetKeys,reason:"keys"}),this.setState(Pt)}}render(){const{children:t,fallbackRender:s,FallbackComponent:r,fallback:n}=this.props,{didCatch:a,error:o}=this.state;let u=t;if(a){const d={error:o,resetErrorBoundary:this.resetErrorBoundary};if(typeof s=="function")u=s(d);else if(r)u=$.createElement(r,d);else if(n!==void 0)u=n;else throw o}return $.createElement(ge.Provider,{value:{didCatch:a,error:o,resetErrorBoundary:this.resetErrorBoundary}},u)}}function be(){let e=arguments.length>0&&arguments[0]!==void 0?arguments[0]:[],t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:[];return e.length!==t.length||e.some((s,r)=>!Object.is(s,t[r]))}const Me=Zt(Lt.jsx("path",{d:"M17.65 6.35c-1.63-1.63-3.94-2.57-6.48-2.31-3.67.37-6.69 3.35-7.1 7.02C3.52 15.91 7.27 20 12 20c3.19 0 5.93-1.87 7.21-4.56.32-.67-.16-1.44-.9-1.44-.37 0-.72.2-.88.53-1.13 2.43-3.84 3.97-6.8 3.31-2.22-.49-4.01-2.3-4.48-4.52C5.31 9.44 8.26 6 12 6c1.66 0 3.14.69 4.22 1.78l-1.51 1.51c-.63.63-.19 1.71.7 1.71H19c.55 0 1-.45 1-1V6.41c0-.89-1.08-1.34-1.71-.71z"}));export{De as E,Fe as Q,Me as R,vt as S,Qt as a,A as b,$t as c,de as d,re as e,Nt as f,me as g,ht as h,gt as i,Rt as j,Se as k,Oe as l,Qe as m,F as n,oe as p,ee as r,Ce as s,te as t,Ee as u};
