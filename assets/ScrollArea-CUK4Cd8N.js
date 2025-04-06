var k=Object.defineProperty;var H=(e,t,s)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var F=(e,t,s)=>H(e,typeof t!="symbol"?t+"":t,s);import{n as B,v,r as W,o as M,j as i,B as S,T as g,P as _,q as O,y as Q,w as z,C as J,x as K}from"./routes-6viKbL0G.js";import{i as D,h as G,a as V,R as Y,Q as X,b as Z,E as ee,t as w,d as te,c as se,g as re,f as ae,s as j}from"./forum-Crq1S1o7.js";import{F as ne}from"./ForumRounded-Pin0pi4o.js";import{Q as oe,a as ie,u as T}from"./useQuery-NVyx1-1v.js";var ce=class extends oe{constructor(e,t){super(e,t)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,t){super.setOptions({...e,behavior:D()},t)}getOptimisticResult(e){return e.behavior=D(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,t){var x,y;const{state:s}=e,a=super.createResult(e,t),{isFetching:r,isRefetching:o,isError:n,isRefetchError:u}=a,c=(y=(x=s.fetchMeta)==null?void 0:x.fetchMore)==null?void 0:y.direction,d=n&&c==="forward",h=r&&c==="forward",f=n&&c==="backward",p=r&&c==="backward";return{...a,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:V(t,s.data),hasPreviousPage:G(t,s.data),isFetchNextPageError:d,isFetchingNextPage:h,isFetchPreviousPageError:f,isFetchingPreviousPage:p,isRefetchError:u&&!d&&!f,isRefetching:o&&!h&&!p}}};function ue(e,t){return ie(e,ce)}const P=B({cssVariables:{colorSchemeSelector:".mode-%s"},typography:{fontFamily:'Comfortaa, "jf openhuninn", "Noto Sans TC"'},colorSchemes:{light:{palette:{text:{primary:"#000"},primary:{main:"#FF772E",contrastText:"#fff"},secondary:{main:"#2f5d6f"}}},dark:{palette:{primary:{main:"#FF772E",contrastText:"#fff"},secondary:{main:"#2f5d6f"},background:{default:"#222",paper:"#222"}}}},components:{MuiInputBase:{defaultProps:{sx:{"&.Mui-disabled::before":{borderBottomStyle:"solid"}}}}},spacing:"0.5rem"}),be=()=>{const e=v(P.breakpoints.up("lg")),t=v(P.breakpoints.up("md")),s=v(P.breakpoints.up("sm"));return W.useEffect(()=>{e?document.documentElement.style.fontSize="16px":s?document.documentElement.style.fontSize="15px":document.documentElement.style.fontSize="13px"},[e,t,s]),{isLg:e,isMd:t,isSm:s}},le=M(i.jsx("path",{d:"M16.88 2.88c-.49-.49-1.28-.49-1.77 0L6.7 11.29c-.39.39-.39 1.02 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77"})),de=M(i.jsx("path",{d:"M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1m-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m1-3h-2v-2h2z"})),he=({error:e,resetErrorBoundary:t})=>i.jsxs(S,{sx:{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",p:3,bgcolor:"secondary.main",color:"text.primary",textAlign:"center"},children:[i.jsxs(S,{className:"mode-dark",sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1,mb:4},children:[i.jsx(ne,{color:"primary",sx:{fontSize:"2.5rem"}}),i.jsx(g,{variant:"h4",component:"h1",sx:{color:"text.primary",fontFamily:'"timemachine-wa"'},children:"論壇樣板"})]}),i.jsxs(_,{elevation:4,sx:{p:4,borderRadius:3,maxWidth:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[i.jsx(de,{fontSize:"large",sx:{color:"error.main"}}),i.jsx(g,{variant:"h5",component:"p",gutterBottom:!0,children:"發生錯誤"}),i.jsx(g,{variant:"body1",color:"text.secondary",children:e==null?void 0:e.message}),i.jsx(g,{variant:"body1",color:"text.secondary",children:"很抱歉，頁面載入時發生問題，請稍後再試"}),i.jsxs(S,{sx:{display:"flex",gap:2,mt:2},children:[i.jsx(O,{variant:"contained",href:Q.forum_home,startIcon:i.jsx(le,{}),children:"返回首頁"}),i.jsx(O,{variant:"outlined",onClick:()=>t(),startIcon:i.jsx(Y,{}),children:"重新載入"})]})]}),i.jsxs(g,{className:"mode-dark",variant:"body2",sx:{mt:4,color:"text.secondary"},children:["如需協助，請聯繫",i.jsx(g,{component:"span",variant:"body2",sx:{cursor:"pointer",color:"primary.light","&:hover":{textDecoration:"underline"}},children:" 論壇樣板客服 "})]})]}),fe=new X;function ve({children:e}){return i.jsxs(z,{theme:P,children:[i.jsx(J,{}),i.jsx(K,{}),i.jsx(Z,{client:fe,children:i.jsx(ee,{fallbackRender:t=>i.jsx(he,{...t}),children:e})})]})}const q=500,E="sqlite-db-forum";class l{static async exec(t,s){const a=Date.now();this.dbPromise=this.dbPromise===null?this.loadDatabase():this.dbPromise;const r=await this.dbPromise;r.run("PRAGMA foreign_keys = ON;");const[{values:o}]=r.exec("PRAGMA foreign_keys;");if(o[0][0]!==1)return console.error("Failed to enable foreign keys"),this.parse([]);const n=await w((async()=>{const c=r.exec(t,s);return await this.saveDatabase(r),c})());if(n.error!==null)return console.error("Failed to execute SQL query",n.error),this.parse([]);const u=Date.now()-a;return u<q&&await new Promise(c=>setTimeout(c,q-u)),this.parse(n.data)}static async reset(){await te(E),this.dbPromise=this.loadDatabase()}static parse(t){if(t.length===0||!t[0])return[];const{columns:s,values:a}=t[0];return a.map(r=>Object.fromEntries(s.map((o,n)=>[o,r[n]])))}static async loadDatabase(){const t=await se({locateFile:c=>`https://sql.js.org/dist/${c}`}),{data:s,error:a}=await w(re(E));if(a&&console.error("Failed to get cached database",a),s)return new t.Database(s);const{data:r,error:o}=await w((async()=>{const d=await(await fetch(ae)).arrayBuffer();return new t.Database(new Uint8Array(d))})());if(o)return console.error("Failed to fetch database file",o),new t.Database;const n=r.export(),{error:u}=await w(j(E,n));return u&&console.error("Failed to save database to IndexedDB",u),r}static async saveDatabase(t){const s=t.export(),{error:a}=await w(j(E,s));a&&console.error("Failed to save database to IndexedDB",a)}}F(l,"dbPromise",null);const me=async()=>{var s;return((s=(await l.exec(`
      SELECT COUNT(*) as count
      FROM users
    `))[0])==null?void 0:s.count)||0},pe=async({page:e=0,limit:t=10,isAuthor:s=!1,isUnfollowed:a=!1,orderBy:r="createdAt",order:o="desc"}={})=>{var A;let n=null;if(a){const N=await R();n=N.authenticated?N.user.id:null}const u=[],c={};s&&u.push("EXISTS (SELECT 1 FROM posts WHERE posts.userId = u.id)"),a&&n&&(u.push(`
      u.id <> $currentUserId AND
      NOT EXISTS (
        SELECT 1 FROM user_interactions
        WHERE followerId = $currentUserId AND followeeId = u.id AND type = 'follow'
      )
    `),c.$currentUserId=n);const d=u.length>0?`WHERE ${u.join(" AND ")}`:"";let h="u.createdAt";r==="postCount"||r==="followerCount"?h=`uic.${r}`:h=`u.${r}`;const f=`
      SELECT COUNT(*) as totalCount
      FROM users u
      ${d}
    `,C=((A=(await l.exec(f,c))[0])==null?void 0:A.totalCount)||0,x=Math.ceil(C/t),y=e+1<x?e+1:null;c.$limit=t,c.$offset=e*t;const U=`
      SELECT u.id, u.name, u.description
      FROM users u
      LEFT JOIN user_interaction_counts uic ON u.id = uic.userId
      ${d}
      ORDER BY ${h} ${o.toUpperCase()}, datetime(u.createdAt) DESC
      LIMIT $limit OFFSET $offset
    `;return{users:await l.exec(U,c),nextPage:y,totalPages:x}},$=async({name:e})=>{const s=await l.exec(`
      SELECT id, name, description, email
      FROM users
      WHERE name = $name
      LIMIT 1
    `,{$name:e});return s.length===0?null:s[0]},L=async({email:e})=>{const s=await l.exec(`
        SELECT id, name, description, email
        FROM users
        WHERE email = $email
        LIMIT 1
      `,{$email:e});return s.length===0?null:s[0]},ge=async({userId:e})=>(await l.exec(`
      SELECT
        followerCount,
        followingCount,
        postCount,
        totalLikeCount as likeCount,
        totalViewCount as viewCount
      FROM user_interaction_counts
      WHERE userId = $userId
    `,{$userId:e}))[0];async function I(e){const s=new TextEncoder().encode(e),a=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(a)).map(o=>o.toString(16).padStart(2,"0")).join("")}const m="forum_session",xe=1e3*60*60*1,Te=async({username:e,password:t})=>{const s=await $({name:e});if(!s)return{authenticated:!1,user:null,loading:!1,error:"使用者不存在"};const a=`
    SELECT id
    FROM users
    WHERE name = $username AND hashedPassword = $hashedPassword
  `,r=await I(t);if((await l.exec(a,{$username:e,$hashedPassword:r})).length===0)return{authenticated:!1,user:null,loading:!1,error:"密碼錯誤"};const n={authenticated:!0,user:s,loading:!1,error:null},u={...n,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(u)),n},R=async()=>{const e=localStorage.getItem(m);if(!e)return{authenticated:!1,user:null,loading:!1,error:null};const t=JSON.parse(e);if(!t.authenticated)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:null};const s=Date.now();if(s-t.timestamp>xe)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:"會話已過期，請重新登入"};const r=await l.exec(`
    SELECT id, name, description, email
    FROM users
    WHERE id = $userId
    LIMIT 1
  `,{$userId:t.user.id});if(r.length===0)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:"使用者不存在"};const o=r[0],n={...t,user:o},u={...n,timestamp:s};return localStorage.setItem(m,JSON.stringify(u)),n},we=async()=>{localStorage.removeItem(m)},Ce=async({username:e,password:t,email:s,description:a=""})=>{if(await $({name:e}))return{authenticated:!1,user:null,loading:!1,error:"使用者名稱已存在"};if(await L({email:s}))return{authenticated:!1,user:null,loading:!1,error:"電子郵件已被使用"};const n=await I(t),u=new Date().toISOString(),d=await l.exec(`
      INSERT INTO users (name, email, hashedPassword, description, createdAt, updatedAt)
      VALUES ($name, $email, $hashedPassword, $description, $createdAt, $updatedAt)
      RETURNING id, name, description
    `,{$name:e,$email:s,$hashedPassword:n,$description:a,$createdAt:u,$updatedAt:u});if(!d||d.length===0)return{authenticated:!1,user:null,loading:!1,error:"註冊失敗"};const f={authenticated:!0,user:d[0],loading:!1,error:null},p={...f,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(p)),f},Ae=async({userId:e,username:t,email:s,description:a})=>{const r=await R();if(!r.authenticated||r.user.id!==e)return{authenticated:!1,user:null,loading:!1,error:"未登入或無權限"};if(!t&&!s&&a===void 0)return{...r,error:"沒有要更新的欄位"};if(t===r.user.name&&s===r.user.email&&a===r.user.description)return{...r,error:"個人資料沒有任何變更需要更新"};if(t&&t!==r.user.name&&await $({name:t}))return{...r,error:"使用者名稱已存在"};if(s&&s!==r.user.email&&await L({email:s}))return{...r,error:"電子郵件已被使用"};const o=[],n={$userId:e};t&&(o.push("name = $username"),n.$username=t),s&&(o.push("email = $email"),n.$email=s),a!==void 0&&(o.push("description = $description"),n.$description=a),o.push("updatedAt = $updatedAt"),n.$updatedAt=new Date().toISOString();const u=`
      UPDATE users
      SET ${o.join(", ")}
      WHERE id = $userId
      RETURNING id, name, email, description
    `,c=await l.exec(u,n);if(!c||c.length===0)return{...r,error:"更新失敗"};const h={authenticated:!0,user:c[0],loading:!1,error:null},f={...h,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(f)),h},Ne=async({userId:e,currentPassword:t,newPassword:s})=>{const a=await R();if(!a.authenticated||a.user.id!==e)return{authenticated:!1,user:null,loading:!1,error:"未登入或無權限"};const r=await I(t);if((await l.exec(`
      SELECT id
      FROM users
      WHERE id = $userId AND hashedPassword = $hashedPassword
    `,{$userId:e,$hashedPassword:r})).length===0)return{...a,error:"當前密碼錯誤"};const u=await I(s),c=new Date().toISOString();return await l.exec(`
      UPDATE users
      SET hashedPassword = $hashedPassword,
          updatedAt = $updatedAt
      WHERE id = $userId
    `,{$userId:e,$hashedPassword:u,$updatedAt:c}),{...a,error:null}},Fe=async({userId:e})=>{const t=await R();return!t.authenticated||t.user.id!==e?{success:!1,error:"未登入或無權限"}:(await l.exec(`
      DELETE FROM users
      WHERE id = $userId
    `,{$userId:e}),await we(),{success:!0,error:null})},b=1*60*1e3,Oe=()=>T({queryKey:["userCounts"],queryFn:me,staleTime:b}),De=({page:e=0,limit:t,isAuthor:s=!0,isUnfollowed:a,orderBy:r,order:o}={})=>ue({queryKey:["users",e,t,s,a,r,o],queryFn:async({pageParam:n})=>pe({page:n,limit:t,isAuthor:s,isUnfollowed:a,orderBy:r,order:o}),initialPageParam:0,getNextPageParam:n=>n.nextPage,staleTime:b}),je=e=>T({queryKey:["user",e],queryFn:()=>e==null?null:$({name:e}),staleTime:b}),qe=e=>T({queryKey:["userStats",e],queryFn:()=>ge({userId:e}),staleTime:b}),ye={position:"relative",height:"100dvh",overflow:"auto",scrollbarWidth:"thin",scrollbarColor:"gray transparent",display:"flex",flexDirection:"column"},Me=({children:e,...t})=>i.jsx(S,{sx:ye,id:"scroll-area",className:"top",onScroll:s=>{const a=s.target;a.scrollTop<25?a.classList.add("top"):a.classList.remove("top")},...t,children:e});export{ve as A,Me as S,be as a,le as b,Oe as c,l as d,ue as e,je as f,qe as g,Ae as h,Ne as i,Fe as j,R as k,Te as l,we as m,Ce as r,P as t,De as u};
