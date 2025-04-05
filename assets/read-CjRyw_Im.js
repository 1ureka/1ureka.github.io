import{aR as T,r as w}from"./routes-6viKbL0G.js";import{u as g}from"./useQuery-B2a_c7zo.js";import{o as C}from"./forum-CQ6vMwqh.js";import{b as S}from"./datahub_home-ChEC01MG.js";import{d as x}from"./dayjs.min-Ds0WJk-z.js";function j(e,r=.9){if(!Array.isArray(e)||e.length===0)return null;if(r<0||r>1)throw new Error("Ratio must be between 0 and 1");const n=e.reduce((t,s)=>(t[s]=(t[s]||0)+1,t),{});let o=e[0],a=0;for(const[t,s]of T(n))s>a&&(o=t,a=s);return a/e.length>=r?o:null}const f=()=>{const{client:e}=S.getState();if(!e)throw new Error("SQLite client is not initialized.");return e},K=async()=>await f().getDatabaseSize(),F=async e=>{const r=f(),n=[];return await Promise.all(e.map(async o=>{(await r.exec("SELECT name FROM sqlite_master WHERE type = $type AND name NOT LIKE 'sqlite_%';",{$type:o})).forEach(t=>{typeof t.name=="string"&&n.push({type:o,name:t.name})})})),n},R=async e=>{const r=f(),n={},o=await F(e);return await Promise.all(o.map(async({name:a})=>{const c=`SELECT COUNT(*) as count FROM ${a};`,t=await r.exec(c);t.length>0?n[a]=Number(t[0].count??0):n[a]=0})),n},$=e=>{if(e==null)return"empty";if(typeof e=="number"&&Number.isInteger(e))return"integer";if(typeof e=="number")return"real";if(typeof e!="string")return"unknown";if(e.trim()==="")return"empty";if(/^[0-9a-f]{8}-[0-9a-f]{4}/.test(e))return"uuid";if(["true","false","0","1"].includes(e.toLowerCase()))return"boolean";if(x(e).isValid())return"date";const n=C(()=>JSON.parse(e));if(n.error)return"text";const o=n.data;return Array.isArray(o)?"json_array":typeof o=="object"&&o!==null?"json_object":"text"},A=async(e,r,n)=>{const o=f(),a=`SELECT "${r}" FROM "${e}" LIMIT 20;`,c=await o.exec(a);if(c.length===0)return n;const t=c.map(i=>$(i[r])).filter(i=>i!=="empty"),s=j(t,.9);return!s||s==="unknown"?n:s},I=async e=>{const r=f(),n=`PRAGMA table_info(${e});`,o=await r.exec(n);if(o.length===0)return null;const c=(await Promise.all(o.map(t=>A(e,t.name,t.type)))).map(t=>t.toLowerCase());return o.map((t,s)=>({...t,type:c[s]}))},O=async e=>{const r=f(),n=`PRAGMA foreign_key_list(${e});`;return await r.exec(n)},m=0,D=()=>g({queryKey:["dbBytes"],queryFn:()=>K(),staleTime:m}),q=({types:e})=>g({queryKey:["objects",e],queryFn:()=>F(e),staleTime:m}),z=({types:e})=>g({queryKey:["rowCounts",e],queryFn:()=>R(e),staleTime:m}),L=({types:e})=>{const{data:r=[],isFetching:n}=q({types:e}),{data:o,isFetching:a}=g({queryKey:["tableInfos",r],queryFn:async()=>(await Promise.all(r.map(async({name:t,type:s})=>({table:t,type:s,columns:await I(t)})))).filter(t=>t.columns!==null),enabled:r.length>0,staleTime:m});return{data:o,isFetching:n||a}},M=({types:e})=>{const{data:r=[],isFetching:n}=q({types:e}),{data:o,isFetching:a}=g({queryKey:["foreignKeys",r],queryFn:async()=>(await Promise.all(r.map(async({name:t,type:s})=>({table:t,type:s,keys:await O(t)})))).filter(t=>t.keys.length>0),enabled:r.length>0,staleTime:m});return{data:o,isFetching:n||a}},H=()=>{const{data:e=[],isFetching:r}=L({types:["table","view"]}),{data:n=[],isFetching:o}=M({types:["table","view"]}),a=w.useMemo(()=>{if(e.length===0||n.length===0)return[];const t={};return n.forEach(({keys:s})=>{s.forEach(({table:i,to:y})=>{t[i]||(t[i]=new Set),t[i].add(y)})}),e.toSorted((s,i)=>s.type.localeCompare(i.type)).map(({table:s,type:i,columns:y},d)=>{const l=n.find(({table:u})=>u===s)||null,p=y.map(u=>{var b;return{fieldName:u.name,fieldType:u.type,nullable:u.pk===1?"pk":u.notnull===0?"yes":"no",isSource:((b=t[s])==null?void 0:b.has(u.name))||!1,isTarget:(l==null?void 0:l.keys.some(E=>E.from===u.name))||!1}}),h=d%7;return{tableName:s,tableType:i,hueIndex:h,fields:p}})},[e,n]),c=w.useMemo(()=>{if(e.length===0||n.length===0)return[];const t=[];return n.forEach(({table:s,keys:i})=>{i.forEach(({from:y,to:d,table:l})=>{const p=d,h=l===s?`${y}_self`:y;t.push({id:`${l}.${h}->${s}.${p}`,source:l,target:s,sourceHandle:p,targetHandle:h})})}),t},[e,n]);return{nodes:a,edges:c,isFetching:r||o}};export{L as a,D as b,q as c,H as d,z as u};
