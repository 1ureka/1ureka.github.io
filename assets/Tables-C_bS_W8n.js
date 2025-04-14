import{r as p,u as J,an as O,V as X,J as q,j as t,s as K,c as T,d as Q,w as Y,ak as Z,m as _,y as b,S as ee,B as x,T as B,n as A,t as te,I as D,x as se,X as re}from"./Toast-CQU7HRxP.js";import{a as oe,f as ae,b as ie}from"./main-CmlvCcV_.js";import{A as E}from"./ArrowDropDownRounded-BCuiIPMd.js";import{A as ne}from"./AddRounded-hnXTMAld.js";import{F as V}from"./FilterAltRounded-BMgW-UgW.js";import{T as F}from"./Tooltip-B2u5Anbs.js";import{B as j}from"./routes-CbqUgxKc.js";import{D as R}from"./Divider-BVbYJDzj.js";import{M as P}from"./MenuItem-DmDsFyHS.js";import{I as le}from"./ExpandMoreRounded-f5NKdB9D.js";import{g as ce,l as g,L as I,a as $}from"./ListItemText-bZtqOhoY.js";import{C as L}from"./Checkbox-DGDEuZ7k.js";import"./react-error-boundary.esm-r1noas7X.js";import"./SQLiteClient-CAkP0qTy.js";import"./DataExplorationRounded-nkAP26lB.js";import"./NotificationsRounded-BessYIZ7.js";import"./DarkModeRounded-Ch8L_na1.js";import"./useMutation-Dm1cpFjH.js";import"./DownloadRounded-BelZQRWi.js";import"./dayjs.min-C0-ROvTL.js";import"./SwitchBase-Begv0bdi.js";const de=(e,s)=>{const{ownerState:r}=e;return[s.root,r.dense&&s.dense,r.alignItems==="flex-start"&&s.alignItemsFlexStart,r.divider&&s.divider,!r.disableGutters&&s.gutters]},pe=e=>{const{alignItems:s,classes:r,dense:l,disabled:i,disableGutters:a,divider:c,selected:d}=e,o=Q({root:["root",l&&"dense",!a&&"gutters",c&&"divider",i&&"disabled",s==="flex-start"&&"alignItemsFlexStart",d&&"selected"]},ce,r);return{...r,...o}},ue=K(Y,{shouldForwardProp:e=>Z(e)||e==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:de})(_(({theme:e})=>({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${g.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:b(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${g.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:b(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${g.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:b(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:b(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${g.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${g.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},variants:[{props:({ownerState:s})=>s.divider,style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"}},{props:{alignItems:"flex-start"},style:{alignItems:"flex-start"}},{props:({ownerState:s})=>!s.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:s})=>s.dense,style:{paddingTop:4,paddingBottom:4}}]}))),z=p.forwardRef(function(s,r){const l=J({props:s,name:"MuiListItemButton"}),{alignItems:i="center",autoFocus:a=!1,component:c="div",children:d,dense:n=!1,disableGutters:o=!1,divider:u=!1,focusVisibleClassName:v,selected:U=!1,className:H,...m}=l,k=p.useContext(O),w=p.useMemo(()=>({dense:n||k.dense||!1,alignItems:i,disableGutters:o}),[i,k.dense,n,o]),h=p.useRef(null);X(()=>{a&&h.current&&h.current.focus()},[a]);const S={...l,alignItems:i,dense:w.dense,disableGutters:o,divider:u,selected:U},y=pe(S),W=q(h,r);return t.jsx(O.Provider,{value:w,children:t.jsx(ue,{ref:W,href:m.href||m.to,component:(m.href||m.to)&&c==="div"?"button":c,focusVisibleClassName:T(y.focusVisible,v),ownerState:S,className:T(y.root,H),...m,classes:y,children:d})})}),f={xs:.5,sm:1},C={xs:1,md:1.5},G="18rem",xe=()=>t.jsxs(x,{sx:{position:"relative"},children:[t.jsx(A,{size:"small",variant:"filled",sx:{width:G},disabled:!0,slotProps:{input:{sx:{borderRadius:1,overflow:"hidden","&::before":{borderBottom:0},"&:hover:not(.Mui-disabled, .Mui-error):before":{borderBottom:0},"& input":{p:f}}}}}),t.jsx(x,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",color:"text.secondary"},children:t.jsx(te,{color:"inherit",size:16})})]}),N=()=>{const{data:e,isFetching:s}=ae({types:["table","view"]}),{searchParams:r,updateSearchParams:l}=ie(),i=r.get("table")??null,a=p.useCallback(o=>{if(!e)return 0;const u=e.findIndex(({name:v})=>v===o);return u!==-1?u:0},[e]),[c,d]=p.useState(0),n=o=>{e&&l({table:e[a(o.target.value)].name})};return p.useEffect(()=>{e&&d(a(i??e[0].name))},[i,e,a]),{data:e,selected:e?e[c]:null,handleChange:n,isFetching:s}},me=()=>{const{data:e,selected:s,handleChange:r,isFetching:l}=N();return!e||!s||l?t.jsx(xe,{}):t.jsxs(A,{select:!0,value:s.name,onChange:r,size:"small",variant:"filled",sx:{width:G},slotProps:{select:{IconComponent:E,MenuProps:{slotProps:{paper:{sx:{maxHeight:350}}},elevation:3}},input:{sx:{borderRadius:1,overflow:"hidden","&::before":{borderBottom:0},"&:hover:not(.Mui-disabled, .Mui-error):before":{borderBottom:0},"& #tables-ias":{color:"text.secondary",m:0},"& div[role='combobox']":{p:f}},startAdornment:t.jsx(le,{position:"start",id:"tables-ias",children:t.jsx(B,{variant:"caption",color:"inherit",sx:{p:.5,borderRadius:1,bgcolor:"divider",textTransform:"uppercase"},children:s.type})})}},children:[t.jsxs(P,{dense:!0,onClickCapture:i=>i.stopPropagation(),children:[t.jsx(ne,{fontSize:"small",sx:{mr:.5}})," 新增資料表"]}),t.jsx(R,{}),e.map(({name:i},a)=>t.jsx(P,{value:i,dense:!0,children:i},a))]})},ge=()=>t.jsx(F,{title:"篩選欄位",arrow:!0,children:t.jsxs("span",{style:{position:"relative"},children:[t.jsx(D,{loading:!0,centerRipple:!1,size:"small",sx:{bgcolor:"FilledInput.disabledBg","&:hover":{bgcolor:"FilledInput.hoverBg"},borderRadius:1,height:1,width:"auto",aspectRatio:1},children:t.jsx(V,{fontSize:"small"})}),t.jsx(x,{sx:{position:"absolute",top:0,bgcolor:"FilledInput.disabledBg",borderRadius:1,height:1,width:"auto",aspectRatio:1}})]})}),be=({columns:e})=>{const[s,r]=p.useState(null),l=n=>r(o=>o?null:n.currentTarget),i=()=>r(null),[a,c]=p.useState([0]),d=n=>()=>{const o=a.indexOf(n),u=[...a];o===-1?u.push(n):u.splice(o,1),c(u)};return t.jsxs(t.Fragment,{children:[t.jsx(F,{title:"篩選欄位",arrow:!0,children:t.jsx("span",{children:t.jsx(D,{onClick:l,centerRipple:!1,size:"small",sx:{bgcolor:"FilledInput.disabledBg","&:hover":{bgcolor:"FilledInput.hoverBg"},borderRadius:1,height:1,width:"auto",aspectRatio:1},children:t.jsx(V,{fontSize:"small"})})})}),t.jsx(se,{open:!!s,anchorEl:s,onClose:i,elevation:3,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},slotProps:{paper:{sx:{maxHeight:350}}},children:t.jsxs(re,{dense:!0,children:[t.jsx(I,{children:t.jsx(B,{variant:"body2",sx:{color:"text.secondary"},children:"篩選欄位"})}),t.jsx(I,{disablePadding:!0,children:t.jsxs(z,{role:void 0,onClick:d(0),dense:!0,children:[t.jsx(L,{edge:"start",checked:a.includes(0),tabIndex:-1,disableRipple:!0,size:"small",sx:{py:0}}),t.jsx($,{primary:"顯示所有"})]})}),t.jsx(R,{sx:{my:.5}}),e.map((n,o)=>t.jsx(I,{disablePadding:!0,children:t.jsxs(z,{role:void 0,onClick:d(o+1),dense:!0,children:[t.jsx(L,{edge:"start",checked:a.includes(o+1),tabIndex:-1,disableRipple:!0,size:"small",sx:{py:0}}),t.jsx($,{sx:{display:"flex",width:1,gap:f,justifyContent:"space-between",my:.5},primary:n.name,secondary:n.type.toUpperCase()})]})},o))]})})]})},fe=()=>{var c;const{selected:e,isFetching:s}=N(),{data:r,isFetching:l}=oe({types:["table","view"]});if(l||!r||s||!e)return t.jsx(ge,{});const a=(c=r.find(({table:d})=>d===e.name))==null?void 0:c.columns;return t.jsx(be,{columns:a??[]})},M=e=>({"--temporary-color":e,bgcolor:"color-mix(in srgb, var(--temporary-color) 30%, transparent 70%)","&:hover":{bgcolor:"color-mix(in srgb, var(--temporary-color) 40%, transparent 60%)"},color:"color-mix(in srgb, var(--temporary-color) 40%, var(--mui-palette-text-primary) 60%)",px:1.5}),ve=e=>({"--temporary-color":e,bgcolor:"color-mix(in srgb, var(--temporary-color) 90%, var(--mui-palette-text-primary) 10%)","&:hover":{bgcolor:"color-mix(in srgb, var(--temporary-color) 80%, var(--mui-palette-text-primary) 20%)"},color:"color-mix(in srgb, var(--temporary-color) 5%, var(--mui-palette-background-paper) 95%)",px:1.5}),Ve=()=>t.jsx(ee,{children:t.jsxs(x,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:C},children:[t.jsxs(x,{sx:{display:"flex",alignItems:"stretch",gap:C},children:[t.jsx(me,{}),t.jsx(fe,{})]}),t.jsxs(x,{sx:{display:"flex",alignItems:"center",gap:C},children:[t.jsx(B,{sx:{color:"text.secondary"},children:"已選取 0 個:"}),t.jsxs(x,{sx:{display:"flex",alignItems:"center",gap:f},children:[t.jsx(F,{title:"以指定值覆蓋選取資料的某個欄位",arrow:!0,children:t.jsx(j,{sx:M("var(--mui-palette-primary-main)"),children:"覆蓋欄位"})}),t.jsx(j,{sx:M("var(--mui-palette-error-main)"),children:"刪除紀錄"})]}),t.jsx(R,{flexItem:!0,orientation:"vertical"}),t.jsx(j,{sx:ve("var(--mui-palette-primary-main)"),endIcon:t.jsx(E,{}),children:"標準化"})]})]})});export{Ve as default};
