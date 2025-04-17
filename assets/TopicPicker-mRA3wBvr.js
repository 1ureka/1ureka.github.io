import{h as ot,j as g,r as R,B as y,T as W,A as Et,S as q,o as Bt,I as Ft,n as tt,w as Mt}from"./routes-DSS9LKLr.js";import{b as Dt,n as yt}from"./post-FMo2HOjY.js";import{B as It}from"./NotificationsRounded-D6OdW2xh.js";import{C as at}from"./Chip-CZDJKnuP.js";import{I as St,D as et}from"./ExpandMoreRounded-He5Ma60b.js";const Ie=ot(g.jsx("path",{d:"M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5s-3 1.34-3 3 1.34 3 3 3m-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3m0 2c-2.33 0-7 1.17-7 3.5V18c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5m8 0c-.29 0-.62.02-.97.05.02.01.03.03.04.04 1.14.83 1.93 1.94 1.93 3.41V18c0 .35-.07.69-.18 1H22c.55 0 1-.45 1-1v-1.5c0-2.33-4.67-3.5-7-3.5"}));function S(e){return Array.isArray?Array.isArray(e):dt(e)==="[object Array]"}function bt(e){if(typeof e=="string")return e;let t=e+"";return t=="0"&&1/e==-1/0?"-0":t}function _t(e){return e==null?"":bt(e)}function I(e){return typeof e=="string"}function ht(e){return typeof e=="number"}function jt(e){return e===!0||e===!1||wt(e)&&dt(e)=="[object Boolean]"}function lt(e){return typeof e=="object"}function wt(e){return lt(e)&&e!==null}function E(e){return e!=null}function K(e){return!e.trim().length}function dt(e){return e==null?e===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(e)}const vt="Incorrect 'index' type",kt=e=>`Invalid value for key ${e}`,Lt=e=>`Pattern length exceeds max of ${e}.`,Rt=e=>`Missing ${e} property in key`,Ot=e=>`Property 'weight' in key '${e}' must be a positive integer`,st=Object.prototype.hasOwnProperty;class Tt{constructor(t){this._keys=[],this._keyMap={};let s=0;t.forEach(n=>{let r=ft(n);this._keys.push(r),this._keyMap[r.id]=r,s+=r.weight}),this._keys.forEach(n=>{n.weight/=s})}get(t){return this._keyMap[t]}keys(){return this._keys}toJSON(){return JSON.stringify(this._keys)}}function ft(e){let t=null,s=null,n=null,r=1,i=null;if(I(e)||S(e))n=e,t=nt(e),s=H(e);else{if(!st.call(e,"name"))throw new Error(Rt("name"));const c=e.name;if(n=c,st.call(e,"weight")&&(r=e.weight,r<=0))throw new Error(Ot(c));t=nt(c),s=H(c),i=e.getFn}return{path:t,id:s,weight:r,src:n,getFn:i}}function nt(e){return S(e)?e:e.split(".")}function H(e){return S(e)?e.join("."):e}function $t(e,t){let s=[],n=!1;const r=(i,c,u)=>{if(E(i))if(!c[u])s.push(i);else{let o=c[u];const a=i[o];if(!E(a))return;if(u===c.length-1&&(I(a)||ht(a)||jt(a)))s.push(_t(a));else if(S(a)){n=!0;for(let h=0,d=a.length;h<d;h+=1)r(a[h],c,u+1)}else c.length&&r(a,c,u+1)}};return r(e,I(t)?t.split("."):t,0),n?s:s[0]}const Nt={includeMatches:!1,findAllMatches:!1,minMatchCharLength:1},Pt={isCaseSensitive:!1,ignoreDiacritics:!1,includeScore:!1,keys:[],shouldSort:!0,sortFn:(e,t)=>e.score===t.score?e.idx<t.idx?-1:1:e.score<t.score?-1:1},zt={location:0,threshold:.6,distance:100},Kt={useExtendedSearch:!1,getFn:$t,ignoreLocation:!1,ignoreFieldNorm:!1,fieldNormWeight:1};var l={...Pt,...Nt,...zt,...Kt};const Wt=/[^ ]+/g;function Ht(e=1,t=3){const s=new Map,n=Math.pow(10,t);return{get(r){const i=r.match(Wt).length;if(s.has(i))return s.get(i);const c=1/Math.pow(i,.5*e),u=parseFloat(Math.round(c*n)/n);return s.set(i,u),u},clear(){s.clear()}}}class J{constructor({getFn:t=l.getFn,fieldNormWeight:s=l.fieldNormWeight}={}){this.norm=Ht(s,3),this.getFn=t,this.isCreated=!1,this.setIndexRecords()}setSources(t=[]){this.docs=t}setIndexRecords(t=[]){this.records=t}setKeys(t=[]){this.keys=t,this._keysMap={},t.forEach((s,n)=>{this._keysMap[s.id]=n})}create(){this.isCreated||!this.docs.length||(this.isCreated=!0,I(this.docs[0])?this.docs.forEach((t,s)=>{this._addString(t,s)}):this.docs.forEach((t,s)=>{this._addObject(t,s)}),this.norm.clear())}add(t){const s=this.size();I(t)?this._addString(t,s):this._addObject(t,s)}removeAt(t){this.records.splice(t,1);for(let s=t,n=this.size();s<n;s+=1)this.records[s].i-=1}getValueForItemAtKeyId(t,s){return t[this._keysMap[s]]}size(){return this.records.length}_addString(t,s){if(!E(t)||K(t))return;let n={v:t,i:s,n:this.norm.get(t)};this.records.push(n)}_addObject(t,s){let n={i:s,$:{}};this.keys.forEach((r,i)=>{let c=r.getFn?r.getFn(t):this.getFn(t,r.path);if(E(c)){if(S(c)){let u=[];const o=[{nestedArrIndex:-1,value:c}];for(;o.length;){const{nestedArrIndex:a,value:h}=o.pop();if(E(h))if(I(h)&&!K(h)){let d={v:h,i:a,n:this.norm.get(h)};u.push(d)}else S(h)&&h.forEach((d,f)=>{o.push({nestedArrIndex:f,value:d})})}n.$[i]=u}else if(I(c)&&!K(c)){let u={v:c,n:this.norm.get(c)};n.$[i]=u}}}),this.records.push(n)}toJSON(){return{keys:this.keys,records:this.records}}}function gt(e,t,{getFn:s=l.getFn,fieldNormWeight:n=l.fieldNormWeight}={}){const r=new J({getFn:s,fieldNormWeight:n});return r.setKeys(e.map(ft)),r.setSources(t),r.create(),r}function Vt(e,{getFn:t=l.getFn,fieldNormWeight:s=l.fieldNormWeight}={}){const{keys:n,records:r}=e,i=new J({getFn:t,fieldNormWeight:s});return i.setKeys(n),i.setIndexRecords(r),i}function T(e,{errors:t=0,currentLocation:s=0,expectedLocation:n=0,distance:r=l.distance,ignoreLocation:i=l.ignoreLocation}={}){const c=t/e.length;if(i)return c;const u=Math.abs(n-s);return r?c+u/r:u?1:c}function Yt(e=[],t=l.minMatchCharLength){let s=[],n=-1,r=-1,i=0;for(let c=e.length;i<c;i+=1){let u=e[i];u&&n===-1?n=i:!u&&n!==-1&&(r=i-1,r-n+1>=t&&s.push([n,r]),n=-1)}return e[i-1]&&i-n>=t&&s.push([n,i-1]),s}const v=32;function Gt(e,t,s,{location:n=l.location,distance:r=l.distance,threshold:i=l.threshold,findAllMatches:c=l.findAllMatches,minMatchCharLength:u=l.minMatchCharLength,includeMatches:o=l.includeMatches,ignoreLocation:a=l.ignoreLocation}={}){if(t.length>v)throw new Error(Lt(v));const h=t.length,d=e.length,f=Math.max(0,Math.min(n,d));let A=i,m=f;const p=u>1||o,C=p?Array(d):[];let D;for(;(D=e.indexOf(t,m))>-1;){let F=T(t,{currentLocation:D,expectedLocation:f,distance:r,ignoreLocation:a});if(A=Math.min(F,A),m=D+h,p){let b=0;for(;b<h;)C[D+b]=1,b+=1}}m=-1;let B=[],x=1,w=h+d;const Ct=1<<h-1;for(let F=0;F<h;F+=1){let b=0,_=w;for(;b<_;)T(t,{errors:F,currentLocation:f+_,expectedLocation:f,distance:r,ignoreLocation:a})<=A?b=_:w=_,_=Math.floor((w-b)/2+b);w=_;let X=Math.max(1,f-_+1),z=c?d:Math.min(f+_,d)+h,k=Array(z+2);k[z+1]=(1<<F)-1;for(let M=z;M>=X;M-=1){let O=M-1,Z=s[e.charAt(O)];if(p&&(C[O]=+!!Z),k[M]=(k[M+1]<<1|1)&Z,F&&(k[M]|=(B[M+1]|B[M])<<1|1|B[M+1]),k[M]&Ct&&(x=T(t,{errors:F,currentLocation:O,expectedLocation:f,distance:r,ignoreLocation:a}),x<=A)){if(A=x,m=O,m<=f)break;X=Math.max(1,2*f-m)}}if(T(t,{errors:F+1,currentLocation:f,expectedLocation:f,distance:r,ignoreLocation:a})>A)break;B=k}const P={isMatch:m>=0,score:Math.max(.001,x)};if(p){const F=Yt(C,u);F.length?o&&(P.indices=F):P.isMatch=!1}return P}function Ut(e){let t={};for(let s=0,n=e.length;s<n;s+=1){const r=e.charAt(s);t[r]=(t[r]||0)|1<<n-s-1}return t}const $=String.prototype.normalize?e=>e.normalize("NFD").replace(/[\u0300-\u036F\u0483-\u0489\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u0711\u0730-\u074A\u07A6-\u07B0\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u08D3-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A70\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B56\u0B57\u0B62\u0B63\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0C00-\u0C04\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D82\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0EB1\u0EB4-\u0EB9\u0EBB\u0EBC\u0EC8-\u0ECD\u0F18\u0F19\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F\u109A-\u109D\u135D-\u135F\u1712-\u1714\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u180B-\u180D\u1885\u1886\u18A9\u1920-\u192B\u1930-\u193B\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F\u1AB0-\u1ABE\u1B00-\u1B04\u1B34-\u1B44\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BE6-\u1BF3\u1C24-\u1C37\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF2-\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DF9\u1DFB-\u1DFF\u20D0-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\uA66F-\uA672\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA880\uA881\uA8B4-\uA8C5\uA8E0-\uA8F1\uA8FF\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9E5\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F]/g,""):e=>e;class pt{constructor(t,{location:s=l.location,threshold:n=l.threshold,distance:r=l.distance,includeMatches:i=l.includeMatches,findAllMatches:c=l.findAllMatches,minMatchCharLength:u=l.minMatchCharLength,isCaseSensitive:o=l.isCaseSensitive,ignoreDiacritics:a=l.ignoreDiacritics,ignoreLocation:h=l.ignoreLocation}={}){if(this.options={location:s,threshold:n,distance:r,includeMatches:i,findAllMatches:c,minMatchCharLength:u,isCaseSensitive:o,ignoreDiacritics:a,ignoreLocation:h},t=o?t:t.toLowerCase(),t=a?$(t):t,this.pattern=t,this.chunks=[],!this.pattern.length)return;const d=(A,m)=>{this.chunks.push({pattern:A,alphabet:Ut(A),startIndex:m})},f=this.pattern.length;if(f>v){let A=0;const m=f%v,p=f-m;for(;A<p;)d(this.pattern.substr(A,v),A),A+=v;if(m){const C=f-v;d(this.pattern.substr(C),C)}}else d(this.pattern,0)}searchIn(t){const{isCaseSensitive:s,ignoreDiacritics:n,includeMatches:r}=this.options;if(t=s?t:t.toLowerCase(),t=n?$(t):t,this.pattern===t){let p={isMatch:!0,score:0};return r&&(p.indices=[[0,t.length-1]]),p}const{location:i,distance:c,threshold:u,findAllMatches:o,minMatchCharLength:a,ignoreLocation:h}=this.options;let d=[],f=0,A=!1;this.chunks.forEach(({pattern:p,alphabet:C,startIndex:D})=>{const{isMatch:B,score:x,indices:w}=Gt(t,p,C,{location:i+D,distance:c,threshold:u,findAllMatches:o,minMatchCharLength:a,includeMatches:r,ignoreLocation:h});B&&(A=!0),f+=x,B&&w&&(d=[...d,...w])});let m={isMatch:A,score:A?f/this.chunks.length:1};return A&&r&&(m.indices=d),m}}class j{constructor(t){this.pattern=t}static isMultiMatch(t){return rt(t,this.multiRegex)}static isSingleMatch(t){return rt(t,this.singleRegex)}search(){}}function rt(e,t){const s=e.match(t);return s?s[1]:null}class Qt extends j{constructor(t){super(t)}static get type(){return"exact"}static get multiRegex(){return/^="(.*)"$/}static get singleRegex(){return/^=(.*)$/}search(t){const s=t===this.pattern;return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class Jt extends j{constructor(t){super(t)}static get type(){return"inverse-exact"}static get multiRegex(){return/^!"(.*)"$/}static get singleRegex(){return/^!(.*)$/}search(t){const n=t.indexOf(this.pattern)===-1;return{isMatch:n,score:n?0:1,indices:[0,t.length-1]}}}class Xt extends j{constructor(t){super(t)}static get type(){return"prefix-exact"}static get multiRegex(){return/^\^"(.*)"$/}static get singleRegex(){return/^\^(.*)$/}search(t){const s=t.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,this.pattern.length-1]}}}class Zt extends j{constructor(t){super(t)}static get type(){return"inverse-prefix-exact"}static get multiRegex(){return/^!\^"(.*)"$/}static get singleRegex(){return/^!\^(.*)$/}search(t){const s=!t.startsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}}class qt extends j{constructor(t){super(t)}static get type(){return"suffix-exact"}static get multiRegex(){return/^"(.*)"\$$/}static get singleRegex(){return/^(.*)\$$/}search(t){const s=t.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[t.length-this.pattern.length,t.length-1]}}}class te extends j{constructor(t){super(t)}static get type(){return"inverse-suffix-exact"}static get multiRegex(){return/^!"(.*)"\$$/}static get singleRegex(){return/^!(.*)\$$/}search(t){const s=!t.endsWith(this.pattern);return{isMatch:s,score:s?0:1,indices:[0,t.length-1]}}}class At extends j{constructor(t,{location:s=l.location,threshold:n=l.threshold,distance:r=l.distance,includeMatches:i=l.includeMatches,findAllMatches:c=l.findAllMatches,minMatchCharLength:u=l.minMatchCharLength,isCaseSensitive:o=l.isCaseSensitive,ignoreDiacritics:a=l.ignoreDiacritics,ignoreLocation:h=l.ignoreLocation}={}){super(t),this._bitapSearch=new pt(t,{location:s,threshold:n,distance:r,includeMatches:i,findAllMatches:c,minMatchCharLength:u,isCaseSensitive:o,ignoreDiacritics:a,ignoreLocation:h})}static get type(){return"fuzzy"}static get multiRegex(){return/^"(.*)"$/}static get singleRegex(){return/^(.*)$/}search(t){return this._bitapSearch.searchIn(t)}}class mt extends j{constructor(t){super(t)}static get type(){return"include"}static get multiRegex(){return/^'"(.*)"$/}static get singleRegex(){return/^'(.*)$/}search(t){let s=0,n;const r=[],i=this.pattern.length;for(;(n=t.indexOf(this.pattern,s))>-1;)s=n+i,r.push([n,s-1]);const c=!!r.length;return{isMatch:c,score:c?0:1,indices:r}}}const V=[Qt,mt,Xt,Zt,te,qt,Jt,At],it=V.length,ee=/ +(?=(?:[^\"]*\"[^\"]*\")*[^\"]*$)/,se="|";function ne(e,t={}){return e.split(se).map(s=>{let n=s.trim().split(ee).filter(i=>i&&!!i.trim()),r=[];for(let i=0,c=n.length;i<c;i+=1){const u=n[i];let o=!1,a=-1;for(;!o&&++a<it;){const h=V[a];let d=h.isMultiMatch(u);d&&(r.push(new h(d,t)),o=!0)}if(!o)for(a=-1;++a<it;){const h=V[a];let d=h.isSingleMatch(u);if(d){r.push(new h(d,t));break}}}return r})}const re=new Set([At.type,mt.type]);class ie{constructor(t,{isCaseSensitive:s=l.isCaseSensitive,ignoreDiacritics:n=l.ignoreDiacritics,includeMatches:r=l.includeMatches,minMatchCharLength:i=l.minMatchCharLength,ignoreLocation:c=l.ignoreLocation,findAllMatches:u=l.findAllMatches,location:o=l.location,threshold:a=l.threshold,distance:h=l.distance}={}){this.query=null,this.options={isCaseSensitive:s,ignoreDiacritics:n,includeMatches:r,minMatchCharLength:i,findAllMatches:u,ignoreLocation:c,location:o,threshold:a,distance:h},t=s?t:t.toLowerCase(),t=n?$(t):t,this.pattern=t,this.query=ne(this.pattern,this.options)}static condition(t,s){return s.useExtendedSearch}searchIn(t){const s=this.query;if(!s)return{isMatch:!1,score:1};const{includeMatches:n,isCaseSensitive:r,ignoreDiacritics:i}=this.options;t=r?t:t.toLowerCase(),t=i?$(t):t;let c=0,u=[],o=0;for(let a=0,h=s.length;a<h;a+=1){const d=s[a];u.length=0,c=0;for(let f=0,A=d.length;f<A;f+=1){const m=d[f],{isMatch:p,indices:C,score:D}=m.search(t);if(p){if(c+=1,o+=D,n){const B=m.constructor.type;re.has(B)?u=[...u,...C]:u.push(C)}}else{o=0,c=0,u.length=0;break}}if(c){let f={isMatch:!0,score:o/c};return n&&(f.indices=u),f}}return{isMatch:!1,score:1}}}const Y=[];function ce(...e){Y.push(...e)}function G(e,t){for(let s=0,n=Y.length;s<n;s+=1){let r=Y[s];if(r.condition(e,t))return new r(e,t)}return new pt(e,t)}const N={AND:"$and",OR:"$or"},U={PATH:"$path",PATTERN:"$val"},Q=e=>!!(e[N.AND]||e[N.OR]),ue=e=>!!e[U.PATH],oe=e=>!S(e)&&lt(e)&&!Q(e),ct=e=>({[N.AND]:Object.keys(e).map(t=>({[t]:e[t]}))});function xt(e,t,{auto:s=!0}={}){const n=r=>{let i=Object.keys(r);const c=ue(r);if(!c&&i.length>1&&!Q(r))return n(ct(r));if(oe(r)){const o=c?r[U.PATH]:i[0],a=c?r[U.PATTERN]:r[o];if(!I(a))throw new Error(kt(o));const h={keyId:H(o),pattern:a};return s&&(h.searcher=G(a,t)),h}let u={children:[],operator:i[0]};return i.forEach(o=>{const a=r[o];S(a)&&a.forEach(h=>{u.children.push(n(h))})}),u};return Q(e)||(e=ct(e)),n(e)}function ae(e,{ignoreFieldNorm:t=l.ignoreFieldNorm}){e.forEach(s=>{let n=1;s.matches.forEach(({key:r,norm:i,score:c})=>{const u=r?r.weight:null;n*=Math.pow(c===0&&u?Number.EPSILON:c,(u||1)*(t?1:i))}),s.score=n})}function he(e,t){const s=e.matches;t.matches=[],E(s)&&s.forEach(n=>{if(!E(n.indices)||!n.indices.length)return;const{indices:r,value:i}=n;let c={indices:r,value:i};n.key&&(c.key=n.key.src),n.idx>-1&&(c.refIndex=n.idx),t.matches.push(c)})}function le(e,t){t.score=e.score}function de(e,t,{includeMatches:s=l.includeMatches,includeScore:n=l.includeScore}={}){const r=[];return s&&r.push(he),n&&r.push(le),e.map(i=>{const{idx:c}=i,u={item:t[c],refIndex:c};return r.length&&r.forEach(o=>{o(i,u)}),u})}class L{constructor(t,s={},n){this.options={...l,...s},this.options.useExtendedSearch,this._keyStore=new Tt(this.options.keys),this.setCollection(t,n)}setCollection(t,s){if(this._docs=t,s&&!(s instanceof J))throw new Error(vt);this._myIndex=s||gt(this.options.keys,this._docs,{getFn:this.options.getFn,fieldNormWeight:this.options.fieldNormWeight})}add(t){E(t)&&(this._docs.push(t),this._myIndex.add(t))}remove(t=()=>!1){const s=[];for(let n=0,r=this._docs.length;n<r;n+=1){const i=this._docs[n];t(i,n)&&(this.removeAt(n),n-=1,r-=1,s.push(i))}return s}removeAt(t){this._docs.splice(t,1),this._myIndex.removeAt(t)}getIndex(){return this._myIndex}search(t,{limit:s=-1}={}){const{includeMatches:n,includeScore:r,shouldSort:i,sortFn:c,ignoreFieldNorm:u}=this.options;let o=I(t)?I(this._docs[0])?this._searchStringList(t):this._searchObjectList(t):this._searchLogical(t);return ae(o,{ignoreFieldNorm:u}),i&&o.sort(c),ht(s)&&s>-1&&(o=o.slice(0,s)),de(o,this._docs,{includeMatches:n,includeScore:r})}_searchStringList(t){const s=G(t,this.options),{records:n}=this._myIndex,r=[];return n.forEach(({v:i,i:c,n:u})=>{if(!E(i))return;const{isMatch:o,score:a,indices:h}=s.searchIn(i);o&&r.push({item:i,idx:c,matches:[{score:a,value:i,norm:u,indices:h}]})}),r}_searchLogical(t){const s=xt(t,this.options),n=(u,o,a)=>{if(!u.children){const{keyId:d,searcher:f}=u,A=this._findMatches({key:this._keyStore.get(d),value:this._myIndex.getValueForItemAtKeyId(o,d),searcher:f});return A&&A.length?[{idx:a,item:o,matches:A}]:[]}const h=[];for(let d=0,f=u.children.length;d<f;d+=1){const A=u.children[d],m=n(A,o,a);if(m.length)h.push(...m);else if(u.operator===N.AND)return[]}return h},r=this._myIndex.records,i={},c=[];return r.forEach(({$:u,i:o})=>{if(E(u)){let a=n(s,u,o);a.length&&(i[o]||(i[o]={idx:o,item:u,matches:[]},c.push(i[o])),a.forEach(({matches:h})=>{i[o].matches.push(...h)}))}}),c}_searchObjectList(t){const s=G(t,this.options),{keys:n,records:r}=this._myIndex,i=[];return r.forEach(({$:c,i:u})=>{if(!E(c))return;let o=[];n.forEach((a,h)=>{o.push(...this._findMatches({key:a,value:c[h],searcher:s}))}),o.length&&i.push({idx:u,item:c,matches:o})}),i}_findMatches({key:t,value:s,searcher:n}){if(!E(s))return[];let r=[];if(S(s))s.forEach(({v:i,i:c,n:u})=>{if(!E(i))return;const{isMatch:o,score:a,indices:h}=n.searchIn(i);o&&r.push({score:a,key:t,value:i,idx:c,norm:u,indices:h})});else{const{v:i,n:c}=s,{isMatch:u,score:o,indices:a}=n.searchIn(i);u&&r.push({score:o,key:t,value:i,norm:c,indices:a})}return r}}L.version="7.1.0";L.createIndex=gt;L.parseIndex=Vt;L.config=l;L.parseQuery=xt;ce(ie);const fe=(e,t)=>{if(!t||t.length===0)return[{text:e,highlight:!1}];const s=[];let n=0;return t.forEach(([r,i])=>{r>n&&s.push({text:e.slice(n,r),highlight:!1}),s.push({text:e.slice(r,i+1),highlight:!0}),n=i+1}),n<e.length&&s.push({text:e.slice(n),highlight:!1}),s},ge=(e,t)=>{const s={};return Object.entries(e).forEach(([n,r])=>{const i=t==null?void 0:t.find(c=>c.key===n);i&&typeof i.value=="string"&&typeof i.key=="string"?s[i.key]=fe(i.value,i.indices):s[n]=[{text:String(r),highlight:!1}]}),s};function ut(e,t){const s=R.useMemo(()=>new L(e,{keys:t,threshold:.5,includeMatches:!0}),[e,t]);return R.useCallback(r=>r.trim()?s.search(r).map(({item:i,matches:c})=>({item:i,highlights:ge(i,c)})):[],[s])}const pe=ot(g.jsx("path",{d:"M18.3 5.71a.996.996 0 0 0-1.41 0L12 10.59 7.11 5.7a.996.996 0 0 0-1.41 0c-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41s1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0s.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4"})),Ae=({children:e})=>g.jsx(y,{sx:{borderRadius:99,bgcolor:"primary.main",width:"0.9rem",aspectRatio:"1/1",display:"grid",placeItems:"center",mr:.5},children:g.jsx(W,{variant:"caption",sx:{position:"absolute",color:"background.paper",fontSize:"0.6rem"},children:e})}),me=R.memo(({title:e,hint:t,tags:s,onSelect:n,showAfter:r=1})=>g.jsxs(y,{children:[g.jsxs(y,{sx:{display:"flex",alignItems:"center",gap:1.5,justifyContent:"space-between"},children:[g.jsx(W,{variant:"subtitle1",sx:{color:"text.secondary"},children:`${e}:`}),g.jsxs(y,{sx:{display:"flex",alignItems:"center",gap:1},children:[g.jsx(It,{badgeContent:10,color:"primary",variant:"dot",overlap:"circular",children:g.jsx(y,{sx:{width:0,height:0}})}),g.jsx(W,{variant:"body2",sx:{color:"text.secondary"},children:`為${t}`})]})]}),g.jsx(y,{sx:{mt:1.5,display:"flex",flexWrap:"wrap",gap:1.5},children:s.map(({name:i,count:c})=>g.jsx(at,{size:"small",label:i,clickable:!0,onClick:()=>n(i),deleteIcon:g.jsx(Ae,{children:c}),onDelete:c>r?()=>n(i):void 0},i))})]})),xe=()=>g.jsx(y,{sx:{height:300,display:"grid",placeItems:"center"},children:g.jsx(Mt,{size:"1.5rem",sx:{color:"divider"}})}),Ce=({type:e,onConfirm:t,onClose:s})=>{const{data:n,isFetching:r}=Dt(),{data:i,isFetching:c}=yt(),u=r||!n||c||!i,[o,a]=R.useState(""),h=ut((n==null?void 0:n.map(p=>({...p,count:p.count.toString()})))??[],["name"]),d=ut((i==null?void 0:i.map(p=>({...p,count:p.count.toString()})))??[],["name"]),f=R.useMemo(()=>{if(!n)return[];let p=n,C=i??[];o.trim()&&(p=h(o).map(x=>({...x.item,count:Number(x.item.count)})),C=d(o).map(x=>({...x.item,count:Number(x.item.count)})));const D={title:"最近使用的標籤",hint:"你使用過的次數",tags:C,showAfter:0},B=[{title:"A ~ Z",hint:"總使用次數",tags:p.filter(x=>/^[a-zA-Z]/.test(x.name))},{title:"0 ~ 9",hint:"總使用次數",tags:p.filter(x=>/^[0-9]/.test(x.name))},{title:"中文",hint:"總使用次數",tags:p.filter(x=>!/^[a-zA-Z0-9]/.test(x.name))}];return e==="add"?[D,...B]:B},[n,i,e,h,d,o]),A=u||o.trim()===""||e==="query"&&!n.map(({name:p})=>p).includes(o.trim()),m=p=>{A||p.key==="Enter"&&t(o)};return g.jsxs(q,{onKeyDown:m,children:[g.jsx(y,{sx:{p:2,pt:1},children:g.jsx(Bt,{value:o,onChange:p=>a(p.target.value),disabled:u,size:"small",label:e==="add"?"查詢或新增標籤":"查詢標籤",variant:"standard",fullWidth:!0,autoFocus:!0,slotProps:{input:{endAdornment:g.jsx(St,{position:"end",children:g.jsx(Ft,{onClick:()=>a(""),disabled:!o,children:g.jsx(pe,{})})})}}})}),g.jsx(et,{}),u?g.jsx(xe,{}):g.jsx(y,{sx:{maxHeight:300,overflowY:"auto",overflowX:"hidden"},children:g.jsxs(q,{sx:{gap:2,p:2},children:[e==="query"&&g.jsx(at,{label:"全部主題",clickable:!0,onClick:()=>t(null)}),f.map((p,C)=>p.tags.length>0&&g.jsx(me,{...p,onSelect:t},C))]})}),g.jsx(et,{}),g.jsxs(y,{sx:{display:"flex",alignItems:"center",p:2,gap:1,justifyContent:"flex-end"},children:[g.jsx(tt,{size:"small",variant:"outlined",disabled:u,onClick:s,children:"取消"}),g.jsx(tt,{size:"small",variant:"contained",disabled:A,onClick:()=>t(o),children:e==="add"?"新增":"前往"})]})]})},Se=({type:e,onConfirm:t,onClose:s,...n})=>g.jsx(Et,{...n,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},elevation:6,slotProps:{paper:{sx:{borderRadius:2,width:320}}},onClose:s,children:g.jsx(Ce,{type:e,onConfirm:t,onClose:s})});export{Ie as P,Se as T};
