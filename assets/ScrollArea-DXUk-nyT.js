import{f as j,i as R,r as q,n as M,j as o,o as S,l as g,A as D,B as O,w as L,T as U,C as k,h as H}from"./routes-BRMzLzhC.js";import{i as A,h as W,a as Q,R as B,Q as _,b as z,E as J}from"./RefreshRounded-Drv__rWw.js";import{F as K}from"./ForumRounded-bYBIrNtf.js";import{E as G}from"./ErrorOutlineRounded-U2JzTVkw.js";import{Q as V,a as X,S as Y,f as Z,u as v}from"./SQLiteClient-C_VbyDMl.js";var ee=class extends V{constructor(e,t){super(e,t)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e,t){super.setOptions({...e,behavior:A()},t)}getOptimisticResult(e){return e.behavior=A(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,t){var x,E;const{state:s}=e,r=super.createResult(e,t),{isFetching:a,isRefetching:i,isError:n,isRefetchError:u}=r,c=(E=(x=s.fetchMeta)==null?void 0:x.fetchMore)==null?void 0:E.direction,d=n&&c==="forward",h=a&&c==="forward",f=n&&c==="backward",p=a&&c==="backward";return{...r,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:Q(t,s.data),hasPreviousPage:W(t,s.data),isFetchNextPageError:d,isFetchingNextPage:h,isFetchPreviousPageError:f,isFetchingPreviousPage:p,isRefetchError:u&&!d&&!f,isRefetching:i&&!h&&!p}}};function te(e,t){return X(e,ee)}const y=j({cssVariables:{colorSchemeSelector:".mode-%s"},typography:{fontFamily:'Comfortaa, "jf openhuninn"'},colorSchemes:{light:{palette:{text:{primary:"#000"},primary:{main:"#FF772E",contrastText:"#fff"},secondary:{main:"#2f5d6f"}}},dark:{palette:{primary:{main:"#FF772E",contrastText:"#fff"},secondary:{main:"#2f5d6f"},background:{default:"#222",paper:"#222"}}}},components:{MuiInputBase:{defaultProps:{sx:{"&.Mui-disabled::before":{borderBottomStyle:"solid"}}}}},spacing:"0.5rem"}),xe=()=>{const e=R(y.breakpoints.up("lg")),t=R(y.breakpoints.up("md")),s=R(y.breakpoints.up("sm"));return q.useEffect(()=>{e?document.documentElement.style.fontSize="16px":s?document.documentElement.style.fontSize="15px":document.documentElement.style.fontSize="13px"},[e,t,s]),{isLg:e,isMd:t,isSm:s}},se=M(o.jsx("path",{d:"M16.88 2.88c-.49-.49-1.28-.49-1.77 0L6.7 11.29c-.39.39-.39 1.02 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77"})),re=({error:e,resetErrorBoundary:t})=>o.jsxs(S,{sx:{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",p:3,bgcolor:"secondary.main",color:"text.primary",textAlign:"center"},children:[o.jsxs(S,{className:"mode-dark",sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1,mb:4},children:[o.jsx(K,{color:"primary",sx:{fontSize:"2.5rem"}}),o.jsx(g,{variant:"h4",component:"h1",sx:{color:"text.primary",fontFamily:'"timemachine-wa"'},children:"論壇樣板"})]}),o.jsxs(D,{elevation:4,sx:{p:4,borderRadius:3,maxWidth:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[o.jsx(G,{fontSize:"large",sx:{color:"error.main"}}),o.jsx(g,{variant:"h5",component:"p",gutterBottom:!0,children:"發生錯誤"}),o.jsx(g,{variant:"body1",color:"text.secondary",children:e==null?void 0:e.message}),o.jsx(g,{variant:"body1",color:"text.secondary",children:"很抱歉，頁面載入時發生問題，請稍後再試"}),o.jsxs(S,{sx:{display:"flex",gap:2,mt:2},children:[o.jsx(O,{variant:"contained",href:L.forum_home,startIcon:o.jsx(se,{}),children:"返回首頁"}),o.jsx(O,{variant:"outlined",onClick:()=>t(),startIcon:o.jsx(B,{}),children:"重新載入"})]})]}),o.jsxs(g,{className:"mode-dark",variant:"body2",sx:{mt:4,color:"text.secondary"},children:["如需協助，請聯繫",o.jsx(g,{component:"span",variant:"body2",sx:{cursor:"pointer",color:"primary.light","&:hover":{textDecoration:"underline"}},children:" 論壇樣板客服 "})]})]}),ae=new _;function Ee({children:e}){return o.jsxs(U,{theme:y,children:[o.jsx(k,{}),o.jsx(H,{}),o.jsx(z,{client:ae,children:o.jsx(J,{fallbackRender:t=>o.jsx(re,{...t}),children:e})})]})}const l=new Y({dbPath:Z,storageKey:"sqlite-db-forum"}),ne=async()=>{var s;return((s=(await l.exec(`
      SELECT COUNT(*) as count
      FROM users
    `))[0])==null?void 0:s.count)||0},oe=async({page:e=0,limit:t=10,isAuthor:s=!1,isUnfollowed:r=!1,orderBy:a="createdAt",order:i="desc"}={})=>{var T;let n=null;if(r){const N=await $({server:!0});n=N.authenticated?N.user.id:null}const u=[],c={};s&&u.push("EXISTS (SELECT 1 FROM posts WHERE posts.userId = u.id)"),r&&n&&(u.push(`
      u.id <> $currentUserId AND
      NOT EXISTS (
        SELECT 1 FROM user_interactions
        WHERE followerId = $currentUserId AND followeeId = u.id AND type = 'follow'
      )
    `),c.$currentUserId=n);const d=u.length>0?`WHERE ${u.join(" AND ")}`:"";let h="u.createdAt";a==="postCount"||a==="followerCount"?h=`uic.${a}`:h=`u.${a}`;const f=`
      SELECT COUNT(*) as totalCount
      FROM users u
      ${d}
    `,C=((T=(await l.exec(f,c))[0])==null?void 0:T.totalCount)||0,x=Math.ceil(C/t),E=e+1<x?e+1:null;c.$limit=t,c.$offset=e*t;const F=`
      SELECT u.id, u.name, u.description
      FROM users u
      LEFT JOIN user_interaction_counts uic ON u.id = uic.userId
      ${d}
      ORDER BY ${h} ${i.toUpperCase()}, datetime(u.createdAt) DESC
      LIMIT $limit OFFSET $offset
    `;return{users:await l.exec(F,c),nextPage:E,totalPages:x}},P=async({name:e})=>{const s=await l.exec(`
      SELECT id, name, description, email
      FROM users
      WHERE name = $name
      LIMIT 1
    `,{$name:e});return s.length===0?null:s[0]},b=async({email:e})=>{const s=await l.exec(`
        SELECT id, name, description, email
        FROM users
        WHERE email = $email
        LIMIT 1
      `,{$email:e});return s.length===0?null:s[0]},ie=async({userId:e})=>(await l.exec(`
      SELECT
        followerCount,
        followingCount,
        postCount,
        totalLikeCount as likeCount,
        totalViewCount as viewCount
      FROM user_interaction_counts
      WHERE userId = $userId
    `,{$userId:e}))[0];async function w(e){const s=new TextEncoder().encode(e),r=await crypto.subtle.digest("SHA-256",s);return Array.from(new Uint8Array(r)).map(i=>i.toString(16).padStart(2,"0")).join("")}const m="forum_session",ce=1e3*60*60*1,Se=async({username:e,password:t})=>{const s=await P({name:e});if(!s)return{authenticated:!1,user:null,loading:!1,error:"使用者不存在"};const r=`
    SELECT id
    FROM users
    WHERE name = $username AND hashedPassword = $hashedPassword
  `,a=await w(t);if((await l.exec(r,{$username:e,$hashedPassword:a})).length===0)return{authenticated:!1,user:null,loading:!1,error:"密碼錯誤"};const n={authenticated:!0,user:s,loading:!1,error:null},u={...n,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(u)),n},$=async({server:e}={server:!1})=>{const t=localStorage.getItem(m);if(!t)return{authenticated:!1,user:null,loading:!1,error:null};const s=JSON.parse(t);if(!s.authenticated)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:null};const r=Date.now();if(r-s.timestamp>ce)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:"會話已過期，請重新登入"};const i=await l.exec(`
    SELECT id, name, description, email
    FROM users
    WHERE id = $userId
    LIMIT 1
  `,{$userId:s.user.id},e);if(i.length===0)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:"使用者不存在"};const n=i[0],u={...s,user:n},c={...u,timestamp:r};return localStorage.setItem(m,JSON.stringify(c)),u},ue=async()=>{localStorage.removeItem(m)},ye=async({username:e,password:t,email:s,description:r=""})=>{if(await P({name:e}))return{authenticated:!1,user:null,loading:!1,error:"使用者名稱已存在"};if(await b({email:s}))return{authenticated:!1,user:null,loading:!1,error:"電子郵件已被使用"};const n=await w(t),u=new Date().toISOString(),d=await l.exec(`
      INSERT INTO users (name, email, hashedPassword, description, createdAt, updatedAt)
      VALUES ($name, $email, $hashedPassword, $description, $createdAt, $updatedAt)
      RETURNING id, name, description
    `,{$name:e,$email:s,$hashedPassword:n,$description:r,$createdAt:u,$updatedAt:u});if(!d||d.length===0)return{authenticated:!1,user:null,loading:!1,error:"註冊失敗"};const f={authenticated:!0,user:d[0],loading:!1,error:null},p={...f,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(p)),f},we=async({userId:e,username:t,email:s,description:r})=>{const a=await $({server:!0});if(!a.authenticated||a.user.id!==e)return{authenticated:!1,user:null,loading:!1,error:"未登入或無權限"};if(!t&&!s&&r===void 0)return{...a,error:"沒有要更新的欄位"};if(t===a.user.name&&s===a.user.email&&r===a.user.description)return{...a,error:"個人資料沒有任何變更需要更新"};if(t&&t!==a.user.name&&await P({name:t}))return{...a,error:"使用者名稱已存在"};if(s&&s!==a.user.email&&await b({email:s}))return{...a,error:"電子郵件已被使用"};const i=[],n={$userId:e};t&&(i.push("name = $username"),n.$username=t),s&&(i.push("email = $email"),n.$email=s),r!==void 0&&(i.push("description = $description"),n.$description=r),i.push("updatedAt = $updatedAt"),n.$updatedAt=new Date().toISOString();const u=`
      UPDATE users
      SET ${i.join(", ")}
      WHERE id = $userId
      RETURNING id, name, email, description
    `,c=await l.exec(u,n);if(!c||c.length===0)return{...a,error:"更新失敗"};const h={authenticated:!0,user:c[0],loading:!1,error:null},f={...h,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(f)),h},Pe=async({userId:e,currentPassword:t,newPassword:s})=>{const r=await $({server:!0});if(!r.authenticated||r.user.id!==e)return{authenticated:!1,user:null,loading:!1,error:"未登入或無權限"};const a=await w(t);if((await l.exec(`
      SELECT id
      FROM users
      WHERE id = $userId AND hashedPassword = $hashedPassword
    `,{$userId:e,$hashedPassword:a})).length===0)return{...r,error:"當前密碼錯誤"};const u=await w(s),c=new Date().toISOString();return await l.exec(`
      UPDATE users
      SET hashedPassword = $hashedPassword,
          updatedAt = $updatedAt
      WHERE id = $userId
    `,{$userId:e,$hashedPassword:u,$updatedAt:c}),{...r,error:null}},$e=async({userId:e})=>{const t=await $({server:!0});return!t.authenticated||t.user.id!==e?{success:!1,error:"未登入或無權限"}:(await l.exec(`
      DELETE FROM users
      WHERE id = $userId
    `,{$userId:e}),await ue(),{success:!0,error:null})},I=1*60*1e3,Ie=()=>v({queryKey:["userCounts"],queryFn:ne,staleTime:I}),Re=({page:e=0,limit:t,isAuthor:s=!0,isUnfollowed:r,orderBy:a,order:i}={})=>te({queryKey:["users",e,t,s,r,a,i],queryFn:async({pageParam:n})=>oe({page:n,limit:t,isAuthor:s,isUnfollowed:r,orderBy:a,order:i}),initialPageParam:0,getNextPageParam:n=>n.nextPage,staleTime:I}),ve=e=>v({queryKey:["user",e],queryFn:()=>e==null?null:P({name:e}),staleTime:I}),Ce=e=>v({queryKey:["userStats",e],queryFn:()=>ie({userId:e}),staleTime:I}),le={position:"relative",height:"100dvh",overflow:"auto",scrollbarWidth:"thin",scrollbarColor:"gray transparent",display:"flex",flexDirection:"column"},Te=({children:e,...t})=>o.jsx(S,{sx:le,id:"scroll-area",className:"top",onScroll:s=>{const r=s.target;r.scrollTop<25?r.classList.add("top"):r.classList.remove("top")},...t,children:e});export{Ee as A,Te as S,xe as a,se as b,Ie as c,te as d,ve as e,Ce as f,$ as g,we as h,Pe as i,$e as j,Se as k,ue as l,ye as r,l as s,y as t,Re as u};
