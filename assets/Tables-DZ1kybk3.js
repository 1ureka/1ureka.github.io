import{r as p,u as k,aq as _,a6 as $e,a0 as Me,j as o,s as w,c as R,d as $,y as xe,an as Be,m as L,F as M,O as F,T as C,aS as Q,g as B,a as P,b as I,aK as Pe,aL as He,h as Le,o as me,B as j,w as ze,I as ye,A as Fe,a8 as Oe,ar as Ne,S as Ae,n as V}from"./routes-DSS9LKLr.js";import{a as ge}from"./ArrowDropDownRounded-C-bqklcR.js";import{t as Ue,A as De}from"./array-BnKUIoLK.js";import{f as Ee,b as K,a as be}from"./main-CegN3VAg.js";import{t as Ve}from"./SQLiteClient-CAvm5Amv.js";import{z as Z}from"./index-mSkvzYyn.js";import{a as We,l as U,M as ee}from"./MenuItem-DAsKIElH.js";import{D as q,I as Ge}from"./ExpandMoreRounded-He5Ma60b.js";import{g as Je,l as z,F as fe,L as W}from"./FilterAltRounded-CmPovaWS.js";import{T as X}from"./Tooltip-4_5Bwrwa.js";import{C as D}from"./Checkbox-DI4ZXGPk.js";import{S as _e}from"./SortRounded-DTCw2PGF.js";import{S as te}from"./Skeleton-DNNkVTV4.js";import"./RefreshRounded-Cbc-M9dA.js";import"./DataExplorationRounded-BB4c2e-V.js";import"./NotificationsRounded-D6OdW2xh.js";import"./DarkModeRounded-Dwbm1YBu.js";import"./useMutation-52fvlAR0.js";import"./DownloadRounded-COxy94Ud.js";import"./dayjs.min-DumrRsId.js";import"./SwitchBase-IYU4KGFu.js";const Ke=(e,t)=>{const{ownerState:s}=e;return[t.root,s.dense&&t.dense,s.alignItems==="flex-start"&&t.alignItemsFlexStart,s.divider&&t.divider,!s.disableGutters&&t.gutters]},qe=e=>{const{alignItems:t,classes:s,dense:r,disabled:i,disableGutters:n,divider:a,selected:l}=e,u=$({root:["root",r&&"dense",!n&&"gutters",a&&"divider",i&&"disabled",t==="flex-start"&&"alignItemsFlexStart",l&&"selected"]},Je,s);return{...s,...u}},Xe=w(xe,{shouldForwardProp:e=>Be(e)||e==="classes",name:"MuiListItemButton",slot:"Root",overridesResolver:Ke})(L(({theme:e})=>({display:"flex",flexGrow:1,justifyContent:"flex-start",alignItems:"center",position:"relative",textDecoration:"none",minWidth:0,boxSizing:"border-box",textAlign:"left",paddingTop:8,paddingBottom:8,transition:e.transitions.create("background-color",{duration:e.transitions.duration.shortest}),"&:hover":{textDecoration:"none",backgroundColor:(e.vars||e).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${z.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity),[`&.${z.focusVisible}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.focusOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.focusOpacity)}},[`&.${z.selected}:hover`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity)}},[`&.${z.focusVisible}`]:{backgroundColor:(e.vars||e).palette.action.focus},[`&.${z.disabled}`]:{opacity:(e.vars||e).palette.action.disabledOpacity},variants:[{props:({ownerState:t})=>t.divider,style:{borderBottom:`1px solid ${(e.vars||e).palette.divider}`,backgroundClip:"padding-box"}},{props:{alignItems:"flex-start"},style:{alignItems:"flex-start"}},{props:({ownerState:t})=>!t.disableGutters,style:{paddingLeft:16,paddingRight:16}},{props:({ownerState:t})=>t.dense,style:{paddingTop:4,paddingBottom:4}}]}))),oe=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiListItemButton"}),{alignItems:i="center",autoFocus:n=!1,component:a="div",children:l,dense:c=!1,disableGutters:u=!1,divider:d=!1,focusVisibleClassName:m,selected:T=!1,className:g,...b}=r,v=p.useContext(_),x=p.useMemo(()=>({dense:c||v.dense||!1,alignItems:i,disableGutters:u}),[i,v.dense,c,u]),y=p.useRef(null);$e(()=>{n&&y.current&&y.current.focus()},[n]);const f={...r,alignItems:i,dense:x.dense,disableGutters:u,divider:d,selected:T},h=qe(f),S=Me(y,s);return o.jsx(_.Provider,{value:x,children:o.jsx(Xe,{ref:S,href:b.href||b.to,component:(b.href||b.to)&&a==="div"?"button":a,focusVisibleClassName:R(h.focusVisible,m),ownerState:f,className:R(h.root,g),...b,classes:h,children:l})})}),Ye=e=>{const{classes:t,inset:s,primary:r,secondary:i,dense:n}=e;return $({root:["root",s&&"inset",n&&"dense",r&&i&&"multiline"],primary:["primary"],secondary:["secondary"]},We,t)},Qe=w("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[{[`& .${U.primary}`]:t.primary},{[`& .${U.secondary}`]:t.secondary},t.root,s.inset&&t.inset,s.primary&&s.secondary&&t.multiline,s.dense&&t.dense]}})({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4,[`.${Q.root}:where(& .${U.primary})`]:{display:"block"},[`.${Q.root}:where(& .${U.secondary})`]:{display:"block"},variants:[{props:({ownerState:e})=>e.primary&&e.secondary,style:{marginTop:6,marginBottom:6}},{props:({ownerState:e})=>e.inset,style:{paddingLeft:56}}]}),se=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiListItemText"}),{children:i,className:n,disableTypography:a=!1,inset:l=!1,primary:c,primaryTypographyProps:u,secondary:d,secondaryTypographyProps:m,slots:T={},slotProps:g={},...b}=r,{dense:v}=p.useContext(_);let x=c??i,y=d;const f={...r,disableTypography:a,inset:l,primary:!!x,secondary:!!y,dense:v},h=Ye(f),S={slots:T,slotProps:{primary:u,secondary:m,...g}},[H,Re]=F("root",{className:R(h.root,n),elementType:Qe,externalForwardedProps:{...S,...b},ownerState:f,ref:s}),[we,A]=F("primary",{className:h.primary,elementType:C,externalForwardedProps:S,ownerState:f}),[Ie,ke]=F("secondary",{className:h.secondary,elementType:C,externalForwardedProps:S,ownerState:f});return x!=null&&x.type!==C&&!a&&(x=o.jsx(we,{variant:v?"body2":"body1",component:A!=null&&A.variant?void 0:"span",...A,children:x})),y!=null&&y.type!==C&&!a&&(y=o.jsx(Ie,{variant:"body2",color:"textSecondary",...ke,children:y})),o.jsxs(H,{...Re,children:[x,y]})}),ve=p.createContext();function Ze(e){return B("MuiTable",e)}P("MuiTable",["root","stickyHeader"]);const et=e=>{const{classes:t,stickyHeader:s}=e;return $({root:["root",s&&"stickyHeader"]},Ze,t)},tt=w("table",{name:"MuiTable",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,s.stickyHeader&&t.stickyHeader]}})(L(({theme:e})=>({display:"table",width:"100%",borderCollapse:"collapse",borderSpacing:0,"& caption":{...e.typography.body2,padding:e.spacing(2),color:(e.vars||e).palette.text.secondary,textAlign:"left",captionSide:"bottom"},variants:[{props:({ownerState:t})=>t.stickyHeader,style:{borderCollapse:"separate"}}]}))),re="table",ot=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiTable"}),{className:i,component:n=re,padding:a="normal",size:l="medium",stickyHeader:c=!1,...u}=r,d={...r,component:n,padding:a,size:l,stickyHeader:c},m=et(d),T=p.useMemo(()=>({padding:a,size:l,stickyHeader:c}),[a,l,c]);return o.jsx(ve.Provider,{value:T,children:o.jsx(tt,{as:n,role:n===re?null:"table",ref:s,className:R(m.root,i),ownerState:d,...u})})}),E=p.createContext();function st(e){return B("MuiTableBody",e)}P("MuiTableBody",["root"]);const rt=e=>{const{classes:t}=e;return $({root:["root"]},st,t)},at=w("tbody",{name:"MuiTableBody",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-row-group"}),nt={variant:"body"},ae="tbody",it=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiTableBody"}),{className:i,component:n=ae,...a}=r,l={...r,component:n},c=rt(l);return o.jsx(E.Provider,{value:nt,children:o.jsx(at,{className:R(c.root,i),as:n,ref:s,role:n===ae?null:"rowgroup",ownerState:l,...a})})});function lt(e){return B("MuiTableCell",e)}const ct=P("MuiTableCell",["root","head","body","footer","sizeSmall","sizeMedium","paddingCheckbox","paddingNone","alignLeft","alignCenter","alignRight","alignJustify","stickyHeader"]),dt=e=>{const{classes:t,variant:s,align:r,padding:i,size:n,stickyHeader:a}=e,l={root:["root",s,a&&"stickyHeader",r!=="inherit"&&`align${I(r)}`,i!=="normal"&&`padding${I(i)}`,`size${I(n)}`]};return $(l,lt,t)},pt=w("td",{name:"MuiTableCell",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,t[s.variant],t[`size${I(s.size)}`],s.padding!=="normal"&&t[`padding${I(s.padding)}`],s.align!=="inherit"&&t[`align${I(s.align)}`],s.stickyHeader&&t.stickyHeader]}})(L(({theme:e})=>({...e.typography.body2,display:"table-cell",verticalAlign:"inherit",borderBottom:e.vars?`1px solid ${e.vars.palette.TableCell.border}`:`1px solid
    ${e.palette.mode==="light"?Pe(M(e.palette.divider,1),.88):He(M(e.palette.divider,1),.68)}`,textAlign:"left",padding:16,variants:[{props:{variant:"head"},style:{color:(e.vars||e).palette.text.primary,lineHeight:e.typography.pxToRem(24),fontWeight:e.typography.fontWeightMedium}},{props:{variant:"body"},style:{color:(e.vars||e).palette.text.primary}},{props:{variant:"footer"},style:{color:(e.vars||e).palette.text.secondary,lineHeight:e.typography.pxToRem(21),fontSize:e.typography.pxToRem(12)}},{props:{size:"small"},style:{padding:"6px 16px",[`&.${ct.paddingCheckbox}`]:{width:24,padding:"0 12px 0 16px","& > *":{padding:0}}}},{props:{padding:"checkbox"},style:{width:48,padding:"0 0 0 4px"}},{props:{padding:"none"},style:{padding:0}},{props:{align:"left"},style:{textAlign:"left"}},{props:{align:"center"},style:{textAlign:"center"}},{props:{align:"right"},style:{textAlign:"right",flexDirection:"row-reverse"}},{props:{align:"justify"},style:{textAlign:"justify"}},{props:({ownerState:t})=>t.stickyHeader,style:{position:"sticky",top:0,zIndex:2,backgroundColor:(e.vars||e).palette.background.default}}]}))),O=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiTableCell"}),{align:i="inherit",className:n,component:a,padding:l,scope:c,size:u,sortDirection:d,variant:m,...T}=r,g=p.useContext(ve),b=p.useContext(E),v=b&&b.variant==="head";let x;a?x=a:x=v?"th":"td";let y=c;x==="td"?y=void 0:!y&&v&&(y="col");const f=m||b&&b.variant,h={...r,align:i,component:x,padding:l||(g&&g.padding?g.padding:"normal"),size:u||(g&&g.size?g.size:"medium"),sortDirection:d,stickyHeader:f==="head"&&g&&g.stickyHeader,variant:f},S=dt(h);let H=null;return d&&(H=d==="asc"?"ascending":"descending"),o.jsx(pt,{as:x,ref:s,className:R(S.root,n),"aria-sort":H,scope:y,ownerState:h,...T})});function ut(e){return B("MuiTableContainer",e)}P("MuiTableContainer",["root"]);const xt=e=>{const{classes:t}=e;return $({root:["root"]},ut,t)},mt=w("div",{name:"MuiTableContainer",slot:"Root",overridesResolver:(e,t)=>t.root})({width:"100%",overflowX:"auto"}),yt=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiTableContainer"}),{className:i,component:n="div",...a}=r,l={...r,component:n},c=xt(l);return o.jsx(mt,{ref:s,as:n,className:R(c.root,i),ownerState:l,...a})});function gt(e){return B("MuiTableHead",e)}P("MuiTableHead",["root"]);const bt=e=>{const{classes:t}=e;return $({root:["root"]},gt,t)},ft=w("thead",{name:"MuiTableHead",slot:"Root",overridesResolver:(e,t)=>t.root})({display:"table-header-group"}),vt={variant:"head"},ne="thead",ht=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiTableHead"}),{className:i,component:n=ne,...a}=r,l={...r,component:n},c=bt(l);return o.jsx(E.Provider,{value:vt,children:o.jsx(ft,{as:n,className:R(c.root,i),ref:s,role:n===ne?null:"rowgroup",ownerState:l,...a})})});function Ct(e){return B("MuiTableRow",e)}const ie=P("MuiTableRow",["root","selected","hover","head","footer"]),jt=e=>{const{classes:t,selected:s,hover:r,head:i,footer:n}=e;return $({root:["root",s&&"selected",r&&"hover",i&&"head",n&&"footer"]},Ct,t)},Tt=w("tr",{name:"MuiTableRow",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,s.head&&t.head,s.footer&&t.footer]}})(L(({theme:e})=>({color:"inherit",display:"table-row",verticalAlign:"middle",outline:0,[`&.${ie.hover}:hover`]:{backgroundColor:(e.vars||e).palette.action.hover},[`&.${ie.selected}`]:{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / ${e.vars.palette.action.selectedOpacity})`:M(e.palette.primary.main,e.palette.action.selectedOpacity),"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.primary.mainChannel} / calc(${e.vars.palette.action.selectedOpacity} + ${e.vars.palette.action.hoverOpacity}))`:M(e.palette.primary.main,e.palette.action.selectedOpacity+e.palette.action.hoverOpacity)}}}))),le="tr",he=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiTableRow"}),{className:i,component:n=le,hover:a=!1,selected:l=!1,...c}=r,u=p.useContext(E),d={...r,component:n,hover:a,selected:l,head:u&&u.variant==="head",footer:u&&u.variant==="footer"},m=jt(d);return o.jsx(Tt,{as:n,ref:s,className:R(m.root,i),role:n===le?null:"row",ownerState:d,...c})}),St=Le(o.jsx("path",{d:"M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"}));function Rt(e){return B("MuiTableSortLabel",e)}const G=P("MuiTableSortLabel",["root","active","icon","iconDirectionDesc","iconDirectionAsc","directionDesc","directionAsc"]),wt=e=>{const{classes:t,direction:s,active:r}=e,i={root:["root",r&&"active",`direction${I(s)}`],icon:["icon",`iconDirection${I(s)}`]};return $(i,Rt,t)},It=w(xe,{name:"MuiTableSortLabel",slot:"Root",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.root,s.active&&t.active]}})(L(({theme:e})=>({cursor:"pointer",display:"inline-flex",justifyContent:"flex-start",flexDirection:"inherit",alignItems:"center","&:focus":{color:(e.vars||e).palette.text.secondary},"&:hover":{color:(e.vars||e).palette.text.secondary,[`& .${G.icon}`]:{opacity:.5}},[`&.${G.active}`]:{color:(e.vars||e).palette.text.primary,[`& .${G.icon}`]:{opacity:1,color:(e.vars||e).palette.text.secondary}}}))),kt=w("span",{name:"MuiTableSortLabel",slot:"Icon",overridesResolver:(e,t)=>{const{ownerState:s}=e;return[t.icon,t[`iconDirection${I(s.direction)}`]]}})(L(({theme:e})=>({fontSize:18,marginRight:4,marginLeft:4,opacity:0,transition:e.transitions.create(["opacity","transform"],{duration:e.transitions.duration.shorter}),userSelect:"none",variants:[{props:{direction:"desc"},style:{transform:"rotate(0deg)"}},{props:{direction:"asc"},style:{transform:"rotate(180deg)"}}]}))),$t=p.forwardRef(function(t,s){const r=k({props:t,name:"MuiTableSortLabel"}),{active:i=!1,children:n,className:a,direction:l="asc",hideSortIcon:c=!1,IconComponent:u=St,slots:d={},slotProps:m={},...T}=r,g={...r,active:i,direction:l,hideSortIcon:c,IconComponent:u},b=wt(g),v={slots:d,slotProps:m},[x,y]=F("root",{elementType:It,externalForwardedProps:v,ownerState:g,className:R(b.root,a),ref:s}),[f,h]=F("icon",{elementType:kt,externalForwardedProps:v,ownerState:g,className:b.icon});return o.jsxs(x,{disableRipple:!0,component:"span",...y,...T,children:[n,c&&!i?null:o.jsx(f,{as:u,...h})]})}),N={xs:.5,sm:1},J={xs:1,md:1.5},Mt={xs:1.5,md:2},Bt=Z.array(Z.number().int()),Y=()=>{const{data:e,isFetching:t}=Ee({types:["table","view"]}),{searchParams:s,updateSearchParams:r}=K(),i=s.get("table")??null,n=p.useCallback(u=>{if(!e)return 0;const d=e.findIndex(({name:m})=>m===u);return d!==-1?d:0},[e]),[a,l]=p.useState(0),c=u=>{e&&r({table:e[n(u.target.value)].name,hiddenColumns:null,orderBy:null,order:null})};return p.useEffect(()=>{e&&l(n(i??e[0].name))},[i,e,n]),{data:e,selected:e&&e.length>0?e[a]:null,handleChange:c,isFetching:t}},Ce=()=>{const{searchParams:e,updateSearchParams:t}=K(),s=e.get("hiddenColumns")??null,r=p.useMemo(()=>{if(!s)return[];const{data:a,error:l}=Ve(()=>JSON.parse(s));if(l)return[];const c=Bt.safeParse(a);return c.success?Array.from(new Set(c.data)):[]},[s]),i=p.useCallback(a=>()=>{const l=r.length?[]:Array.from({length:a},(c,u)=>u);t({hiddenColumns:JSON.stringify(l)},!0)},[r,t]),n=p.useCallback(a=>()=>{const l=Ue(r,a);t({hiddenColumns:JSON.stringify(l)},!0)},[r,t]);return{hiddenColumns:r,createToggleAllColumns:i,createToggleHandler:n}},Pt=e=>{const{searchParams:t,updateSearchParams:s}=K(),r=p.useMemo(()=>{if(!e)return 0;const a=t.get("orderBy")??null;if(!a)return 0;const l=parseInt(a,10);return!Number.isInteger(l)||l<0||l>=e?0:l},[t,e]),i=p.useMemo(()=>{const a=t.get("order")??null;return a&&["asc","desc"].includes(a)?a:"asc"},[t]),n=p.useCallback(a=>()=>{const l=a,c=r===a&&i==="asc"?"desc":"asc";s({orderBy:l.toString(),order:c},!0)},[r,i,s]);return{orderBy:r,order:i,createToggleHandler:n}},je={borderRadius:1,overflow:"hidden","&::before":{borderBottom:0},"&:hover:not(.Mui-disabled, .Mui-error):before":{borderBottom:0},"& input":{p:N},"& div[role='combobox']":{p:N}},Te={sx:{width:"18rem"},size:"small",variant:"filled"},Ht=()=>o.jsxs(j,{sx:{position:"relative"},children:[o.jsx(me,{...Te,disabled:!0,slotProps:{input:{sx:je}}}),o.jsx(j,{sx:{position:"absolute",inset:0,display:"grid",placeItems:"center",color:"text.secondary"},children:o.jsx(ze,{color:"inherit",size:16})})]}),Lt=()=>{const{data:e,selected:t,handleChange:s,isFetching:r}=Y();return!e||!t||r?o.jsx(Ht,{}):o.jsxs(me,{select:!0,value:t.name,onChange:s,...Te,slotProps:{select:{IconComponent:ge,MenuProps:{slotProps:{paper:{sx:{maxHeight:350}}},elevation:3}},input:{sx:{...je,"& #tables-ias":{color:"text.secondary",m:0}},startAdornment:o.jsx(Ge,{position:"start",id:"tables-ias",children:o.jsx(C,{variant:"caption",color:"inherit",sx:{p:.5,borderRadius:1,bgcolor:"divider",textTransform:"uppercase"},children:t.type})})}},children:[o.jsxs(ee,{dense:!0,onClickCapture:i=>i.stopPropagation(),children:[o.jsx(De,{fontSize:"small",sx:{mr:.5}})," 新增資料表"]}),o.jsx(q,{}),e.map(({name:i},n)=>o.jsx(ee,{value:i,dense:!0,children:i},n))]})},ce={edge:"start",tabIndex:-1,disableRipple:!0,size:"small",sx:{py:0}},Se={bgcolor:"FilledInput.disabledBg","&:hover":{bgcolor:"FilledInput.hoverBg"},borderRadius:1,height:1,width:"auto",aspectRatio:1},zt=()=>o.jsx(X,{title:"篩選欄位",arrow:!0,children:o.jsxs("span",{style:{position:"relative"},children:[o.jsx(ye,{loading:!0,centerRipple:!1,size:"small",sx:Se,children:o.jsx(fe,{fontSize:"small"})}),o.jsx(j,{sx:{position:"absolute",top:0,bgcolor:"FilledInput.disabledBg",borderRadius:1,height:1,width:"auto",aspectRatio:1}})]})}),Ft=({columns:e})=>{const[t,s]=p.useState(null),r=d=>s(m=>m?null:d.currentTarget),i=()=>s(null),{hiddenColumns:n,createToggleAllColumns:a,createToggleHandler:l}=Ce(),c=n.every(d=>d>e.length-1),u=e.every((d,m)=>n.includes(m));return o.jsxs(o.Fragment,{children:[o.jsx(X,{title:"篩選欄位",arrow:!0,children:o.jsx("span",{children:o.jsx(ye,{onClick:r,centerRipple:!1,size:"small",sx:Se,children:o.jsx(fe,{fontSize:"small"})})})}),o.jsx(Fe,{open:!!t,anchorEl:t,onClose:i,elevation:3,anchorOrigin:{vertical:"bottom",horizontal:"left"},transformOrigin:{vertical:"top",horizontal:"left"},slotProps:{paper:{sx:{maxHeight:350}}},children:o.jsxs(Oe,{dense:!0,children:[o.jsx(W,{children:o.jsx(C,{variant:"body2",sx:{color:"text.secondary"},children:"篩選欄位"})}),o.jsx(W,{disablePadding:!0,children:o.jsxs(oe,{role:void 0,onClick:a(e.length),dense:!0,children:[o.jsx(D,{...ce,checked:c,indeterminate:!c&&!u}),o.jsx(se,{primary:"顯示所有"})]})}),o.jsx(q,{sx:{my:.5}}),e.toSorted((d,m)=>d.cid-m.cid).map((d,m)=>o.jsx(W,{disablePadding:!0,children:o.jsxs(oe,{role:void 0,onClick:l(m),dense:!0,children:[o.jsx(D,{...ce,checked:!n.includes(m)}),o.jsx(se,{sx:{display:"flex",width:1,gap:N,justifyContent:"space-between",my:.5},primary:d.name,secondary:d.type.toUpperCase()})]})},m))]})})]})},Ot=()=>{var a;const{selected:e,isFetching:t}=Y(),{data:s,isFetching:r}=be({types:["table","view"]});if(r||!s||t||!e)return o.jsx(zt,{});const n=(a=s.find(({table:l})=>l===e.name))==null?void 0:a.columns;return o.jsx(Ft,{columns:n??[]})},Nt=()=>o.jsxs(he,{children:[o.jsx(O,{padding:"checkbox",sx:{border:"none"},children:o.jsx(D,{disabled:!0,size:"small"})}),o.jsx(O,{sx:{border:"none"},children:o.jsx(te,{variant:"rounded",animation:"wave",children:o.jsx(C,{variant:"body2",children:"載入中. . ."})})}),[...Array(4)].map((e,t)=>o.jsx(O,{sx:{border:"none"},children:o.jsx(j,{sx:{display:"flex",justifyContent:"flex-end"},children:o.jsx(te,{variant:"rounded",animation:"wave",children:o.jsx(C,{variant:"body2",children:"載入中. . ."})})})},t))]}),de={p:.5,borderRadius:1,bgcolor:"divider"},pe={textTransform:"uppercase",lineHeight:1,color:"text.secondary"},At=({isPk:e,type:t})=>o.jsxs(j,{sx:{display:"flex",alignItems:"center",gap:N,color:"text.secondary"},children:[e&&o.jsx(C,{variant:"caption",sx:{...de,...pe},children:"PK"}),o.jsx(j,{sx:de,children:o.jsx(C,{variant:"caption",sx:{...pe,...Ne},children:t})})]}),Ut=()=>o.jsx(j,{component:"tr","aria-hidden":"true",sx:{position:"absolute",inset:0,borderRadius:3,borderBottomRightRadius:"calc(1 * var(--mui-shape-borderRadius))",borderBottomLeftRadius:"calc(1 * var(--mui-shape-borderRadius))",bgcolor:"divider",opacity:.8,pointerEvents:"none"}}),Dt=()=>{const{selected:e,isFetching:t}=Y(),{data:s,isFetching:r}=be({types:["table","view"]}),i=r||!s||t||!e,{hiddenColumns:n}=Ce(),a=p.useMemo(()=>{if(!s||!e)return null;const g=s.find(({table:x})=>x===e.name);if(!g)return null;const{columns:b}=g;return b.filter(({cid:x})=>!n.includes(x)).toSorted((x,y)=>x.pk!==y.pk?y.pk-x.pk:x.type==="text"&&y.type!=="text"?-1:x.type!=="text"&&y.type==="text"?1:x.cid-y.cid)},[s,e,n]),{order:l,orderBy:c,createToggleHandler:u}=Pt((a==null?void 0:a.length)??0),d=Math.random()>.5,m=Math.random()>.5,T=!d&&!m;return o.jsxs(ht,{sx:{position:"relative"},children:[o.jsx(Ut,{}),i||!a?o.jsx(Nt,{}):o.jsxs(he,{children:[o.jsx(O,{padding:"checkbox",sx:{border:"none"},children:o.jsx(D,{color:"default",indeterminate:m,checked:d,size:"small",sx:{color:T?void 0:"color-mix(in srgb, var(--mui-palette-text-primary) 30%, var(--mui-palette-primary-main) 70%)"}})}),a.map((g,b)=>{const{cid:v,name:x,type:y}=g,f=g.pk>=1,h=y!=="text"&&!f?"flex-end":void 0,S=c===b,H=S&&l==="desc"?1:-1;return o.jsx(O,{sx:{border:"none",minWidth:"10rem"},children:o.jsxs(j,{sx:{display:"flex",alignItems:"center",justifyContent:h},children:[o.jsx($t,{active:S,direction:S?l:"asc",IconComponent:_e,slotProps:{icon:{sx:{transform:`scaleY(${H})`}}},onClick:u(b),children:o.jsx(C,{variant:"body2",children:x})}),o.jsx(At,{isPk:f,type:y})]})},v)})]})]})},ue=e=>({"--temporary-color":e,bgcolor:"color-mix(in srgb, var(--temporary-color) 30%, transparent 70%)","&:hover":{bgcolor:"color-mix(in srgb, var(--temporary-color) 40%, transparent 60%)"},color:"color-mix(in srgb, var(--temporary-color) 40%, var(--mui-palette-text-primary) 60%)",px:1.5}),Et=e=>({"--temporary-color":e,bgcolor:"color-mix(in srgb, var(--temporary-color) 90%, var(--mui-palette-text-primary) 10%)","&:hover":{bgcolor:"color-mix(in srgb, var(--temporary-color) 80%, var(--mui-palette-text-primary) 20%)"},color:"color-mix(in srgb, var(--temporary-color) 5%, var(--mui-palette-background-paper) 95%)",px:1.5}),po=()=>o.jsxs(Ae,{children:[o.jsxs(j,{sx:{display:"flex",alignItems:"center",justifyContent:"space-between",gap:J},children:[o.jsxs(j,{sx:{display:"flex",alignItems:"stretch",gap:J},children:[o.jsx(Lt,{}),o.jsx(Ot,{})]}),o.jsxs(j,{sx:{display:"flex",alignItems:"center",gap:J},children:[o.jsx(C,{sx:{color:"text.secondary"},children:"已選取 0 個:"}),o.jsxs(j,{sx:{display:"flex",alignItems:"center",gap:N},children:[o.jsx(X,{title:"以指定值覆蓋選取資料的某個欄位",arrow:!0,children:o.jsx(V,{sx:ue("var(--mui-palette-primary-main)"),children:"覆蓋欄位"})}),o.jsx(V,{sx:ue("var(--mui-palette-error-main)"),children:"刪除紀錄"})]}),o.jsx(q,{flexItem:!0,orientation:"vertical"}),o.jsx(V,{sx:Et("var(--mui-palette-primary-main)"),endIcon:o.jsx(ge,{}),children:"標準化"})]})]}),o.jsx(yt,{sx:{mt:Mt},children:o.jsxs(ot,{children:[o.jsx(Dt,{}),o.jsx(it,{})]})})]});export{po as default};
