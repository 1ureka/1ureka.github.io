import{j as t,i as j,P as u,B as e,T as a,t as h,q as g,r as y}from"./Toast-CQU7HRxP.js";import{A as f,S as m}from"./SentimentDissatisfiedRounded-DMr8Wksk.js";import{b,c as I,d as A,e as v,u as S,E}from"./url-CP6b2rFv.js";import{a as w,A as B,S as R}from"./ScrollArea-bXVFt1-o.js";import{B as P,r as D}from"./routes-CbqUgxKc.js";import{C as k,a as z}from"./post-DqTxsVj6.js";import{N as F}from"./NewPost-DwRa_uK7.js";import{D as c}from"./Divider-BVbYJDzj.js";import"./ForumRounded-CuQuEyof.js";import"./SearchRounded-B1OrGODw.js";import"./Tooltip-B2u5Anbs.js";import"./DarkModeRounded-Ch8L_na1.js";import"./Skeleton-BJlzAjuB.js";import"./OpenInNewRounded-Dg5lu0UK.js";import"./MenuItem-DmDsFyHS.js";import"./NotificationsRounded-BessYIZ7.js";import"./SQLiteClient-CAkP0qTy.js";import"./react-error-boundary.esm-r1noas7X.js";import"./ListItemText-bZtqOhoY.js";import"./ExpandMoreRounded-Ctlya0ll.js";import"./useMutation-Dm1cpFjH.js";import"./Chip-D_kpsi0I.js";import"./Collapse-fiT4VskB.js";import"./with-selector-CVzttz-H.js";import"./Motion-C8Wjnrzx.js";import"./proxy-ChN18tHr.js";import"./AddRounded-hnXTMAld.js";import"./TopicAutocomplete-DzGgFR96.js";import"./Autocomplete-DDSK7rHF.js";import"./EmojiMenu-BUaZAOQL.js";import"./formatters-C9bWSe0O.js";const M=()=>{var p,d;const r=j(s=>s.breakpoints.up("md")),{searchParams:l}=S(),n=l.get("postId");if(!n)throw new Error("網址缺失 postId 參數");const{data:o,isFetching:x}=z({postId:Number(n)});return t.jsxs(u,{sx:{pb:3,borderRadius:3,border:"1px solid",borderColor:"divider"},elevation:1,children:[t.jsxs(e,{sx:{display:"flex",gap:1,alignItems:"center",p:3},children:[t.jsx(E,{className:"mode-light",sx:{fontSize:48,mr:1,bgcolor:"primary.main",borderRadius:1,color:"background.default",p:1,opacity:.8}}),t.jsx(a,{variant:"h5",component:"h2",children:"編輯貼文"})]}),t.jsx(c,{}),t.jsxs(e,{sx:{position:"relative",px:3,py:1},children:[t.jsx(e,{sx:{position:"absolute",inset:0,bgcolor:"divider",opacity:.35,pointerEvents:"none"}}),t.jsx(P,{variant:"outlined",startIcon:t.jsx(f,{}),size:"small",href:D.forum_home,children:r?"返回首頁":"首頁"})]}),t.jsx(c,{sx:{mb:2}}),x?t.jsx(e,{sx:{py:8,display:"grid",placeItems:"center"},children:t.jsx(h,{})}):o?o.isSelf?t.jsx(F,{mode:"edit",postId:o.id,initialValues:{title:o.title,content:o.content,tags:o.tags,photos:(p=o.photos)==null?void 0:p.map(({name:s,size:i})=>new File([new Uint8Array(i)],s,{type:"image/jpeg"})),attachments:(d=o.attachments)==null?void 0:d.map(({name:s,size:i})=>new File([new Uint8Array(i)],s,{type:"application/pdf"}))}}):t.jsxs(e,{sx:{py:6,display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[t.jsx(m,{sx:{fontSize:"6rem",color:"action.disabled"}}),t.jsx(a,{variant:"body1",component:"p",sx:{color:"text.secondary",textAlign:"center"},children:"你沒有權限編輯此貼文"})]}):t.jsxs(e,{sx:{py:6,display:"flex",flexDirection:"column",alignItems:"center",gap:2},children:[t.jsx(m,{sx:{fontSize:"6rem",color:"action.disabled"}}),t.jsx(a,{variant:"body1",component:"p",sx:{color:"text.secondary",textAlign:"center"},children:"貼文不存在或已被刪除"})]})]})};function N(){const{isMd:r}=w();return t.jsxs(B,{children:[t.jsx(b,{}),t.jsxs(R,{children:[r?t.jsx(I,{}):t.jsx(A,{}),t.jsx(k,{maxWidth:"lg",sx:{position:"relative",my:10,px:0},children:t.jsx(M,{})}),t.jsx(v,{})]})]})}g.createRoot(document.getElementById("root")).render(t.jsx(y.StrictMode,{children:t.jsx(N,{})}));
