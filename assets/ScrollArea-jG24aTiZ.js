import{f as j,l as R,r as q,o as M,j as o,p as E,n as g,A as D,B as O,T as L,C as U,h as k}from"./Toast-6ncYA_Ld.js";import{i as A,h as H,a as W,E as Q,Q as B,b as _,c as z}from"./ErrorOutlineRounded-BWvTI3f4.js";import{F as J}from"./ForumRounded-A_Eulgqu.js";import{R as K}from"./RefreshRounded-BcOkXO49.js";import{r as G}from"./routes-Dr3OAPvi.js";import{Q as V,a as X,u as v}from"./tryCatch-CD0ybv0K.js";import{S as Y,f as Z}from"./SQLiteClient-CQZ5EZ1X.js";var ee=class extends V{constructor(e,s){super(e,s)}bindMethods(){super.bindMethods(),this.fetchNextPage=this.fetchNextPage.bind(this),this.fetchPreviousPage=this.fetchPreviousPage.bind(this)}setOptions(e){super.setOptions({...e,behavior:A()})}getOptimisticResult(e){return e.behavior=A(),super.getOptimisticResult(e)}fetchNextPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"forward"}}})}fetchPreviousPage(e){return this.fetch({...e,meta:{fetchMore:{direction:"backward"}}})}createResult(e,s){var x,S;const{state:t}=e,r=super.createResult(e,s),{isFetching:a,isRefetching:i,isError:n,isRefetchError:u}=r,c=(S=(x=t.fetchMeta)==null?void 0:x.fetchMore)==null?void 0:S.direction,d=n&&c==="forward",f=a&&c==="forward",h=n&&c==="backward",p=a&&c==="backward";return{...r,fetchNextPage:this.fetchNextPage,fetchPreviousPage:this.fetchPreviousPage,hasNextPage:W(s,t.data),hasPreviousPage:H(s,t.data),isFetchNextPageError:d,isFetchingNextPage:f,isFetchPreviousPageError:h,isFetchingPreviousPage:p,isRefetchError:u&&!d&&!h,isRefetching:i&&!f&&!p}}};function te(e,s){return X(e,ee)}const y=j({cssVariables:{colorSchemeSelector:".mode-%s"},typography:{fontFamily:'Comfortaa, "jf openhuninn"'},colorSchemes:{light:{palette:{text:{primary:"#000"},primary:{main:"#FF772E",contrastText:"#fff"},secondary:{main:"#2f5d6f"}}},dark:{palette:{primary:{main:"#FF772E",contrastText:"#fff"},secondary:{main:"#2f5d6f"},background:{default:"#222",paper:"#222"}}}},components:{MuiInputBase:{defaultProps:{sx:{"&.Mui-disabled::before":{borderBottomStyle:"solid"}}}}},spacing:"0.5rem"}),Ee=()=>{const e=R(y.breakpoints.up("lg")),s=R(y.breakpoints.up("md")),t=R(y.breakpoints.up("sm"));return q.useEffect(()=>{e?document.documentElement.style.fontSize="16px":t?document.documentElement.style.fontSize="15px":document.documentElement.style.fontSize="13px"},[e,s,t]),{isLg:e,isMd:s,isSm:t}},se=M(o.jsx("path",{d:"M16.88 2.88c-.49-.49-1.28-.49-1.77 0L6.7 11.29c-.39.39-.39 1.02 0 1.41l8.41 8.41c.49.49 1.28.49 1.77 0s.49-1.28 0-1.77L9.54 12l7.35-7.35c.48-.49.48-1.28-.01-1.77"})),re=({error:e,resetErrorBoundary:s})=>o.jsxs(E,{sx:{minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",p:3,bgcolor:"secondary.main",color:"text.primary",textAlign:"center"},children:[o.jsxs(E,{className:"mode-dark",sx:{display:"flex",justifyContent:"center",alignItems:"center",gap:1,mb:4},children:[o.jsx(J,{color:"primary",sx:{fontSize:"2.5rem"}}),o.jsx(g,{variant:"h4",component:"h1",sx:{color:"text.primary",fontFamily:'"timemachine-wa"'},children:"論壇樣板"})]}),o.jsxs(D,{elevation:4,sx:{p:4,borderRadius:3,maxWidth:"100%",display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[o.jsx(Q,{fontSize:"large",sx:{color:"error.main"}}),o.jsx(g,{variant:"h5",component:"p",gutterBottom:!0,children:"發生錯誤"}),o.jsx(g,{variant:"body1",color:"text.secondary",children:e==null?void 0:e.message}),o.jsx(g,{variant:"body1",color:"text.secondary",children:"很抱歉，頁面載入時發生問題，請稍後再試"}),o.jsxs(E,{sx:{display:"flex",gap:2,mt:2},children:[o.jsx(O,{variant:"contained",href:G.forum_home,startIcon:o.jsx(se,{}),children:"返回首頁"}),o.jsx(O,{variant:"outlined",onClick:()=>s(),startIcon:o.jsx(K,{}),children:"重新載入"})]})]}),o.jsxs(g,{className:"mode-dark",variant:"body2",sx:{mt:4,color:"text.secondary"},children:["如需協助，請聯繫",o.jsx(g,{component:"span",variant:"body2",sx:{cursor:"pointer",color:"primary.light","&:hover":{textDecoration:"underline"}},children:" 論壇樣板客服 "})]})]}),ae=new B;function ye({children:e}){return o.jsxs(L,{theme:y,children:[o.jsx(U,{}),o.jsx(k,{}),o.jsx(_,{client:ae,children:o.jsx(z,{fallbackRender:s=>o.jsx(re,{...s}),children:e})})]})}const l=new Y({dbPath:Z,storageKey:"sqlite-db-forum"}),ne=async()=>{var t;return((t=(await l.exec(`
      SELECT COUNT(*) as count
      FROM users
    `))[0])==null?void 0:t.count)||0},oe=async({page:e=0,limit:s=10,isAuthor:t=!1,isUnfollowed:r=!1,orderBy:a="createdAt",order:i="desc"}={})=>{var T;let n=null;if(r){const N=await $({server:!0});n=N.authenticated?N.user.id:null}const u=[],c={};t&&u.push("EXISTS (SELECT 1 FROM posts WHERE posts.userId = u.id)"),r&&n&&(u.push(`
      u.id <> $currentUserId AND
      NOT EXISTS (
        SELECT 1 FROM user_interactions
        WHERE followerId = $currentUserId AND followeeId = u.id AND type = 'follow'
      )
    `),c.$currentUserId=n);const d=u.length>0?`WHERE ${u.join(" AND ")}`:"";let f="u.createdAt";a==="postCount"||a==="followerCount"?f=`uic.${a}`:f=`u.${a}`;const h=`
      SELECT COUNT(*) as totalCount
      FROM users u
      ${d}
    `,C=((T=(await l.exec(h,c))[0])==null?void 0:T.totalCount)||0,x=Math.ceil(C/s),S=e+1<x?e+1:null;c.$limit=s,c.$offset=e*s;const F=`
      SELECT u.id, u.name, u.description
      FROM users u
      LEFT JOIN user_interaction_counts uic ON u.id = uic.userId
      ${d}
      ORDER BY ${f} ${i.toUpperCase()}, datetime(u.createdAt) DESC
      LIMIT $limit OFFSET $offset
    `;return{users:await l.exec(F,c),nextPage:S,totalPages:x}},P=async({name:e})=>{const t=await l.exec(`
      SELECT id, name, description, email
      FROM users
      WHERE name = $name
      LIMIT 1
    `,{$name:e});return t.length===0?null:t[0]},b=async({email:e})=>{const t=await l.exec(`
        SELECT id, name, description, email
        FROM users
        WHERE email = $email
        LIMIT 1
      `,{$email:e});return t.length===0?null:t[0]},ie=async({userId:e})=>(await l.exec(`
      SELECT
        followerCount,
        followingCount,
        postCount,
        totalLikeCount as likeCount,
        totalViewCount as viewCount
      FROM user_interaction_counts
      WHERE userId = $userId
    `,{$userId:e}))[0];async function w(e){const t=new TextEncoder().encode(e),r=await crypto.subtle.digest("SHA-256",t);return Array.from(new Uint8Array(r)).map(i=>i.toString(16).padStart(2,"0")).join("")}const m="forum_session",ce=1e3*60*60*1,we=async({username:e,password:s})=>{const t=await P({name:e});if(!t)return{authenticated:!1,user:null,loading:!1,error:"使用者不存在"};const r=`
    SELECT id
    FROM users
    WHERE name = $username AND hashedPassword = $hashedPassword
  `,a=await w(s);if((await l.exec(r,{$username:e,$hashedPassword:a})).length===0)return{authenticated:!1,user:null,loading:!1,error:"密碼錯誤"};const n={authenticated:!0,user:t,loading:!1,error:null},u={...n,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(u)),n},$=async({server:e}={server:!1})=>{const s=localStorage.getItem(m);if(!s)return{authenticated:!1,user:null,loading:!1,error:null};const t=JSON.parse(s);if(!t.authenticated)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:null};const r=Date.now();if(r-t.timestamp>ce)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:"會話已過期，請重新登入"};const i=await l.exec(`
    SELECT id, name, description, email
    FROM users
    WHERE id = $userId
    LIMIT 1
  `,{$userId:t.user.id},e);if(i.length===0)return localStorage.removeItem(m),{authenticated:!1,user:null,loading:!1,error:"使用者不存在"};const n=i[0],u={...t,user:n},c={...u,timestamp:r};return localStorage.setItem(m,JSON.stringify(c)),u},ue=async()=>{localStorage.removeItem(m)},Pe=async({username:e,password:s,email:t,description:r=""})=>{if(await P({name:e}))return{authenticated:!1,user:null,loading:!1,error:"使用者名稱已存在"};if(await b({email:t}))return{authenticated:!1,user:null,loading:!1,error:"電子郵件已被使用"};const n=await w(s),u=new Date().toISOString(),d=await l.exec(`
      INSERT INTO users (name, email, hashedPassword, description, createdAt, updatedAt)
      VALUES ($name, $email, $hashedPassword, $description, $createdAt, $updatedAt)
      RETURNING id, name, description
    `,{$name:e,$email:t,$hashedPassword:n,$description:r,$createdAt:u,$updatedAt:u});if(!d||d.length===0)return{authenticated:!1,user:null,loading:!1,error:"註冊失敗"};const h={authenticated:!0,user:d[0],loading:!1,error:null},p={...h,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(p)),h},$e=async({userId:e,username:s,email:t,description:r})=>{const a=await $({server:!0});if(!a.authenticated||a.user.id!==e)return{authenticated:!1,user:null,loading:!1,error:"未登入或無權限"};if(!s&&!t&&r===void 0)return{...a,error:"沒有要更新的欄位"};if(s===a.user.name&&t===a.user.email&&r===a.user.description)return{...a,error:"個人資料沒有任何變更需要更新"};if(s&&s!==a.user.name&&await P({name:s}))return{...a,error:"使用者名稱已存在"};if(t&&t!==a.user.email&&await b({email:t}))return{...a,error:"電子郵件已被使用"};const i=[],n={$userId:e};s&&(i.push("name = $username"),n.$username=s),t&&(i.push("email = $email"),n.$email=t),r!==void 0&&(i.push("description = $description"),n.$description=r),i.push("updatedAt = $updatedAt"),n.$updatedAt=new Date().toISOString();const u=`
      UPDATE users
      SET ${i.join(", ")}
      WHERE id = $userId
      RETURNING id, name, email, description
    `,c=await l.exec(u,n);if(!c||c.length===0)return{...a,error:"更新失敗"};const f={authenticated:!0,user:c[0],loading:!1,error:null},h={...f,timestamp:Date.now()};return localStorage.setItem(m,JSON.stringify(h)),f},Ie=async({userId:e,currentPassword:s,newPassword:t})=>{const r=await $({server:!0});if(!r.authenticated||r.user.id!==e)return{authenticated:!1,user:null,loading:!1,error:"未登入或無權限"};const a=await w(s);if((await l.exec(`
      SELECT id
      FROM users
      WHERE id = $userId AND hashedPassword = $hashedPassword
    `,{$userId:e,$hashedPassword:a})).length===0)return{...r,error:"當前密碼錯誤"};const u=await w(t),c=new Date().toISOString();return await l.exec(`
      UPDATE users
      SET hashedPassword = $hashedPassword,
          updatedAt = $updatedAt
      WHERE id = $userId
    `,{$userId:e,$hashedPassword:u,$updatedAt:c}),{...r,error:null}},Re=async({userId:e})=>{const s=await $({server:!0});return!s.authenticated||s.user.id!==e?{success:!1,error:"未登入或無權限"}:(await l.exec(`
      DELETE FROM users
      WHERE id = $userId
    `,{$userId:e}),await ue(),{success:!0,error:null})},I=1*60*1e3,ve=()=>v({queryKey:["userCounts"],queryFn:ne,staleTime:I}),Ce=({page:e=0,limit:s,isAuthor:t=!0,isUnfollowed:r,orderBy:a,order:i}={})=>te({queryKey:["users",e,s,t,r,a,i],queryFn:async({pageParam:n})=>oe({page:n,limit:s,isAuthor:t,isUnfollowed:r,orderBy:a,order:i}),initialPageParam:0,getNextPageParam:n=>n.nextPage,staleTime:I}),Te=e=>v({queryKey:["user",e],queryFn:()=>e==null?null:P({name:e}),staleTime:I}),Ne=e=>v({queryKey:["userStats",e],queryFn:()=>ie({userId:e}),staleTime:I}),le={position:"relative",height:"100dvh",overflow:"auto",scrollbarWidth:"thin",scrollbarColor:"gray transparent",display:"flex",flexDirection:"column"},Oe=({children:e,...s})=>o.jsx(E,{sx:le,id:"scroll-area",className:"top",onScroll:t=>{const r=t.target;r.scrollTop<25?r.classList.add("top"):r.classList.remove("top")},...s,children:e});export{ye as A,Oe as S,Ee as a,se as b,ve as c,te as d,Te as e,Ne as f,$ as g,$e as h,Ie as i,Re as j,we as k,ue as l,Pe as r,l as s,y as t,Ce as u};
