var k=Object.defineProperty;var H=(e,t,s)=>t in e?k(e,t,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[t]=s;var N=(e,t,s)=>H(e,typeof t!="symbol"?t+"":t,s);import{n as B,v as b,r as W,o as M,j as u,B as S,T as g,P as _,q as O,y as Q,w as z,C as J,x as K}from"./routes-n0rROGIf.js";import{Q as G,i as D,h as V,b as Y,c as X,R as Z,d as ee,e as te,E as se,t as w,f as re,g as ae,j as ne,k as oe,s as j,u as T}from"./forum-CVzoj8Ed.js";import{F as ie}from"./ForumRounded-Cdgm9z_Q.js";var ce=class extends G{constructor(e,t){super(e,t)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,t){super.setOptions({...e,behavior:D()},t)}getOptimisticResult(e){return e.behavior=D(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,t){var x,y;const{state:s}=e,r=super.createResult(e,t),{isFetching:a,isRefetching:n,isError:o,isRefetchError:i}=r,c=(y=(x=s.fetchMeta)==null?void 0:x.fetchMore)==null?void 0:y.direction,l=o&&c==="forward",h=a&&c==="forward",f=o&&c==="backward",p=a&&c==="backward";return{...r,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:Y(t,s.data),hasPreviousPage:V(t,s.data),isFetchNextPageError:l,isFetchingNextPage:h,isFetchPreviousPageError:f,isFetchingPreviousPage:p,isRefetchError:i&&!l&&!f,isRefetching:n&&!h&&!p}}};function ue(e,t){return X(e,ce)}const P=B({cssVariables:{colorSchemeSelector:".mode-%s"},typography:{fontFamily:'Comfortaa, "jf openhuninn"'},colorSchemes:{light:{palette:{text:{primary:"#000"},primary:{main:"#FF772E",contrastText:"#fff"},secondary:{main:"#2f5d6f"}}},dark:{palette:{primary:{main:"#FF772E",contrastText:"#fff"},secondary:{main:"#2f5d6f"},background:{default:"#222",paper:"#222"}}}},components:{MuiInputBase:{defaultProps:{sx:{"&.Mui-disabled::before":{borderBottomStyle:"solid"}}}}},spacing:"0.5rem"}),$e=()=>{const e=b(P.breakpoints.up("lg")),t=b(P.breakpoints.up("md")),s=b(P.breakpoints.up("sm"));return W.useEffect(()=>{e?document.documentElement.style.fontSize="16px":s?document.documentElement.style.fontSize="15px":document.documentElement.style.fontSize="13px"},[e,t,s]),{isLg:e,isMd:t,isSm:s}},le=M(u.jsx("path",{d:"M16.88 2.88c-.49-.49-1.28-.49-1.77 0L6.7 11.29c-.39.39-.39 1.02 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77"})),de=M(u.jsx("path",{d:"M12 7c.55 0 1 .45 1 1v4c0 .55-.45 1-1 1s-1-.45-1-1V8c0-.55.45-1 1-1m-.01-5C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8m1-3h-2v-2h2z"})),he=({error:e,resetErrorBoundary:t})=>u.jsxs(S,{sx:{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",p:3,bgcolor:"secondary.main",color:"text.primary",textAlign:"center"},children:[u.jsxs(S,{className:"mode-dark",sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1,mb:4},children:[u.jsx(ie,{color:"primary",sx:{fontSize:"2.5rem"}}),u.jsx(g,{variant:"h4",component:"h1",sx:{color:"text.primary",fontFamily:'"timemachine-wa"'},children:"論壇樣板"})]}),u.jsxs(_,{elevation:4,sx:{p:4,borderRadius:3,maxWidth:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[u.jsx(de,{fontSize:"large",sx:{color:"error.main"}}),u.jsx(g,{variant:"h5",component:"p",gutterBottom:!0,children:"發生錯誤"}),u.jsx(g,{variant:"body1",color:"text.secondary",children:e==null?void 0:e.message}),u.jsx(g,{variant:"body1",color:"text.secondary",children:"很抱歉，頁面載入時發生問題，請稍後再試"}),u.jsxs(S,{sx:{display:"flex",gap:2,mt:2},children:[u.jsx(O,{variant:"contained",href:Q.forum_home,startIcon:u.jsx(le,{}),children:"返回首頁"}),u.jsx(O,{variant:"outlined",onClick:()=>t(),startIcon:u.jsx(Z,{}),children:"重新載入"})]})]}),u.jsxs(g,{className:"mode-dark",variant:"body2",sx:{mt:4,color:"text.secondary"},children:["如需協助，請聯繫",u.jsx(g,{component:"span",variant:"body2",sx:{cursor:"pointer",color:"primary.light","&:hover":{textDecoration:"underline"}},children:" 論壇樣板客服 "})]})]}),fe=new ee;function Re({children:e}){return u.jsxs(z,{theme:P,children:[u.jsx(J,{}),u.jsx(K,{}),u.jsx(te,{client:fe,children:u.jsx(se,{fallbackRender:t=>u.jsx(he,{...t}),children:e})})]})}const q=500,E="sqlite-db-forum";class d{static async exec(t,s,r=!1){const a=Date.now();this.dbPromise=this.dbPromise===null?this.loadDatabase():this.dbPromise;const n=await this.dbPromise;n.run("PRAGMA foreign_keys = ON;");const[{values:o}]=n.exec("PRAGMA foreign_keys;");if(o[0][0]!==1)return console.error("Failed to enable foreign keys"),this.parse([]);const i=await w((async()=>{const l=n.exec(t,s);return await this.saveDatabase(n),l})());if(i.error!==null)return console.error("Failed to execute SQL query",i.error),this.parse([]);const c=Date.now()-a;return c<q&&!r&&await new Promise(l=>setTimeout(l,q-c)),this.parse(i.data)}static async reset(){await re(E),this.dbPromise=this.loadDatabase()}static parse(t){if(t.length===0||!t[0])return[];const{columns:s,values:r}=t[0];return r.map(a=>Object.fromEntries(s.map((n,o)=>[n,a[o]])))}static async loadDatabase(){const t=await ae({locateFile:c=>`https://sql.js.org/dist/${c}`}),{data:s,error:r}=await w(ne(E));if(r&&console.error("Failed to get cached database",r),s)return new t.Database(s);const{data:a,error:n}=await w((async()=>{const l=await(await fetch(oe)).arrayBuffer();return new t.Database(new Uint8Array(l))})());if(n)return console.error("Failed to fetch database file",n),new t.Database;const o=a.export(),{error:i}=await w(j(E,o));return i&&console.error("Failed to save database to IndexedDB",i),a}static async saveDatabase(t){const s=t.export(),{error:r}=await w(j(E,s));r&&console.error("Failed to save database to IndexedDB",r)}}N(d,"dbPromise",null);const me=async()=>{var s;return((s=(await d.exec(`
      SELECT COUNT(*) as count
      FROM users
    `))[0])==null?void 0:s.count)||0},pe=async({page:e=0,limit:t=10,isAuthor:s=!1,isUnfollowed:r=!1,orderBy:a="createdAt",order:n="desc"}={})=>{var A;let o=null;if(r){const F=await $({server:!0});o=F.authenticated?F.user.id:null}const i=[],c={};s&&i.push("EXISTS (SELECT 1 FROM posts WHERE posts.userId = u.id)"),r&&o&&(i.push(`
      u.id <> $currentUserId AND
      NOT EXISTS (
        SELECT 1 FROM user_interactions
        WHERE followerId = $currentUserId AND followeeId = u.id AND type = 'follow'
      )
    `),c.$currentUserId=o);const l=i.length>0?`WHERE ${i.join(" AND ")}`:"";let h="u.createdAt";a==="postCount"||a==="followerCount"?h=`uic.${a}`:h=`u.${a}`;const f=`
      SELECT COUNT(*) as totalCount
      FROM users u
      ${l}
    `,C=((A=(await d.exec(f,c))[0])==null?void 0:A.totalCount)||0,x=Math.ceil(C/t),y=e+1<x?e+1:null;c.$limit=t,c.$offset=e*t;const U=`
      SELECT u.id, u.name, u.description
      FROM users u
      LEFT JOIN user_interaction_counts uic ON u.id = uic.userId
      ${l}
      ORDER BY ${h} ${n.toUpperCase()}, datetime(u.createdAt) DESC
      LIMIT $limit OFFSET $offset
    `;return{users:await d.exec(U,c),nextPage:y,totalPages:x}},I=async({name:e})=>{const s=await d.exec(`
      SELECT id, name, description, email
      FROM users
      WHERE name = $name
      LIMIT 1
    `,{$name:e});return s.length===0?null:s[0]},L=async({email:e})=>{const s=await d.exec(`
        SELECT id, name, description, email
        FROM users
        WHERE email = $email
        LIMIT 1
      `,{$email:e});return s.length===0?null:s[0]},ge=async({userId:e})=>(await d.exec(`
      SELECT
        followerCount,
        followingCount,
        postCount,
        totalLikeCount as likeCount,
        totalViewCount as viewCount
      FROM user_interaction_counts
      WHERE userId = $userId
    `,{$userId:e}))[0];async function v(e){const s=new TextEncoder().encode(e),r=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(r)).map(n=>n.toString(16).padStart(2,"0")).join("")}const m="forum_session",xe=1e3*60*60*1,be=async({username:e,password:t})=>{const s=await I({name:e});if(!s)return{authenticated:!1,user:null,loading:!1,error:"使用者不存在"};const r=`
    SELECT id
    FROM users
    WHERE name = $username AND hashedPassword = $hashedPassword
  `,a=await v(t);if((await d.exec(r,{$username:e,$hashedPassword:a})).length===0)return{authenticated:!1,user:null,loading:!1,error:"密碼錯誤"};const o={authenticated:!0,user:s,loading:!1,error:null},i={...o,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(i)),o},$=async({server:e}={server:!1})=>{const t=localStorage.getItem(m);if(!t)return{authenticated:!1,user:null,loading:!1,error:null};const s=JSON.parse(t);if(!s.authenticated)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:null};const r=Date.now();if(r-s.timestamp>xe)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:"會話已過期，請重新登入"};const n=await d.exec(`
    SELECT id, name, description, email
    FROM users
    WHERE id = $userId
    LIMIT 1
  `,{$userId:s.user.id},e);if(n.length===0)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:"使用者不存在"};const o=n[0],i={...s,user:o},c={...i,timestamp:r};return localStorage.setItem(m,JSON.stringify(c)),i},we=async()=>{localStorage.removeItem(m)},Te=async({username:e,password:t,email:s,description:r=""})=>{if(await I({name:e}))return{authenticated:!1,user:null,loading:!1,error:"使用者名稱已存在"};if(await L({email:s}))return{authenticated:!1,user:null,loading:!1,error:"電子郵件已被使用"};const o=await v(t),i=new Date().toISOString(),l=await d.exec(`
      INSERT INTO users (name, email, hashedPassword, description, createdAt, updatedAt)
      VALUES ($name, $email, $hashedPassword, $description, $createdAt, $updatedAt)
      RETURNING id, name, description
    `,{$name:e,$email:s,$hashedPassword:o,$description:r,$createdAt:i,$updatedAt:i});if(!l||l.length===0)return{authenticated:!1,user:null,loading:!1,error:"註冊失敗"};const f={authenticated:!0,user:l[0],loading:!1,error:null},p={...f,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(p)),f},Ce=async({userId:e,username:t,email:s,description:r})=>{const a=await $({server:!0});if(!a.authenticated||a.user.id!==e)return{authenticated:!1,user:null,loading:!1,error:"未登入或無權限"};if(!t&&!s&&r===void 0)return{...a,error:"沒有要更新的欄位"};if(t===a.user.name&&s===a.user.email&&r===a.user.description)return{...a,error:"個人資料沒有任何變更需要更新"};if(t&&t!==a.user.name&&await I({name:t}))return{...a,error:"使用者名稱已存在"};if(s&&s!==a.user.email&&await L({email:s}))return{...a,error:"電子郵件已被使用"};const n=[],o={$userId:e};t&&(n.push("name = $username"),o.$username=t),s&&(n.push("email = $email"),o.$email=s),r!==void 0&&(n.push("description = $description"),o.$description=r),n.push("updatedAt = $updatedAt"),o.$updatedAt=new Date().toISOString();const i=`
      UPDATE users
      SET ${n.join(", ")}
      WHERE id = $userId
      RETURNING id, name, email, description
    `,c=await d.exec(i,o);if(!c||c.length===0)return{...a,error:"更新失敗"};const h={authenticated:!0,user:c[0],loading:!1,error:null},f={...h,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(f)),h},Ae=async({userId:e,currentPassword:t,newPassword:s})=>{const r=await $({server:!0});if(!r.authenticated||r.user.id!==e)return{authenticated:!1,user:null,loading:!1,error:"未登入或無權限"};const a=await v(t);if((await d.exec(`
      SELECT id
      FROM users
      WHERE id = $userId AND hashedPassword = $hashedPassword
    `,{$userId:e,$hashedPassword:a})).length===0)return{...r,error:"當前密碼錯誤"};const i=await v(s),c=new Date().toISOString();return await d.exec(`
      UPDATE users
      SET hashedPassword = $hashedPassword,
          updatedAt = $updatedAt
      WHERE id = $userId
    `,{$userId:e,$hashedPassword:i,$updatedAt:c}),{...r,error:null}},Fe=async({userId:e})=>{const t=await $({server:!0});return!t.authenticated||t.user.id!==e?{success:!1,error:"未登入或無權限"}:(await d.exec(`
      DELETE FROM users
      WHERE id = $userId
    `,{$userId:e}),await we(),{success:!0,error:null})},R=1*60*1e3,Ne=()=>T({queryKey:["userCounts"],queryFn:me,staleTime:R}),Oe=({page:e=0,limit:t,isAuthor:s=!0,isUnfollowed:r,orderBy:a,order:n}={})=>ue({queryKey:["users",e,t,s,r,a,n],queryFn:async({pageParam:o})=>pe({page:o,limit:t,isAuthor:s,isUnfollowed:r,orderBy:a,order:n}),initialPageParam:0,getNextPageParam:o=>o.nextPage,staleTime:R}),De=e=>T({queryKey:["user",e],queryFn:()=>e==null?null:I({name:e}),staleTime:R}),je=e=>T({queryKey:["userStats",e],queryFn:()=>ge({userId:e}),staleTime:R}),ye={position:"relative",height:"100dvh",overflow:"auto",scrollbarWidth:"thin",scrollbarColor:"gray transparent",display:"flex",flexDirection:"column"},qe=({children:e,...t})=>u.jsx(S,{sx:ye,id:"scroll-area",className:"top",onScroll:s=>{const r=s.target;r.scrollTop<25?r.classList.add("top"):r.classList.remove("top")},...t,children:e});export{Re as A,qe as S,$e as a,le as b,Ne as c,d,ue as e,De as f,$ as g,je as h,Ce as i,Ae as j,Fe as k,we as l,be as m,Te as r,P as t,Oe as u};
