import{r as c,a as P,g as W,u as j,j as C,s as O,c as V,b as a,d as L,m as M,e as z,y as k}from"./Toast-BWSE98qv.js";import{a as H,b as N}from"./routes-C5afn4F_.js";function U(o){return c.Children.toArray(o).filter(r=>c.isValidElement(r))}function F(o){return W("MuiButtonGroup",o)}const t=P("MuiButtonGroup",["root","contained","outlined","text","disableElevation","disabled","firstButton","fullWidth","horizontal","vertical","colorPrimary","colorSecondary","grouped","groupedHorizontal","groupedVertical","groupedText","groupedTextHorizontal","groupedTextVertical","groupedTextPrimary","groupedTextSecondary","groupedOutlined","groupedOutlinedHorizontal","groupedOutlinedVertical","groupedOutlinedPrimary","groupedOutlinedSecondary","groupedContained","groupedContainedHorizontal","groupedContainedVertical","groupedContainedPrimary","groupedContainedSecondary","lastButton","middleButton"]),D=(o,r)=>{const{ownerState:e}=o;return[{[`& .${t.grouped}`]:r.grouped},{[`& .${t.grouped}`]:r[`grouped${a(e.orientation)}`]},{[`& .${t.grouped}`]:r[`grouped${a(e.variant)}`]},{[`& .${t.grouped}`]:r[`grouped${a(e.variant)}${a(e.orientation)}`]},{[`& .${t.grouped}`]:r[`grouped${a(e.variant)}${a(e.color)}`]},{[`& .${t.firstButton}`]:r.firstButton},{[`& .${t.lastButton}`]:r.lastButton},{[`& .${t.middleButton}`]:r.middleButton},r.root,r[e.variant],e.disableElevation===!0&&r.disableElevation,e.fullWidth&&r.fullWidth,e.orientation==="vertical"&&r.vertical]},A=o=>{const{classes:r,color:e,disabled:u,disableElevation:B,fullWidth:g,orientation:i,variant:n}=o,l={root:["root",n,i,g&&"fullWidth",B&&"disableElevation",`color${a(e)}`],grouped:["grouped",`grouped${a(i)}`,`grouped${a(n)}`,`grouped${a(n)}${a(i)}`,`grouped${a(n)}${a(e)}`,u&&"disabled"],firstButton:["firstButton"],lastButton:["lastButton"],middleButton:["middleButton"]};return L(l,F,r)},q=O("div",{name:"MuiButtonGroup",slot:"Root",overridesResolver:D})(M(({theme:o})=>({display:"inline-flex",borderRadius:(o.vars||o).shape.borderRadius,variants:[{props:{variant:"contained"},style:{boxShadow:(o.vars||o).shadows[2]}},{props:{disableElevation:!0},style:{boxShadow:"none"}},{props:{fullWidth:!0},style:{width:"100%"}},{props:{orientation:"vertical"},style:{flexDirection:"column",[`& .${t.lastButton},& .${t.middleButton}`]:{borderTopRightRadius:0,borderTopLeftRadius:0},[`& .${t.firstButton},& .${t.middleButton}`]:{borderBottomRightRadius:0,borderBottomLeftRadius:0}}},{props:{orientation:"horizontal"},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderTopRightRadius:0,borderBottomRightRadius:0},[`& .${t.lastButton},& .${t.middleButton}`]:{borderTopLeftRadius:0,borderBottomLeftRadius:0}}},{props:{variant:"text",orientation:"horizontal"},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderRight:o.vars?`1px solid rgba(${o.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${o.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${t.disabled}`]:{borderRight:`1px solid ${(o.vars||o).palette.action.disabled}`}}}},{props:{variant:"text",orientation:"vertical"},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderBottom:o.vars?`1px solid rgba(${o.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${o.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${t.disabled}`]:{borderBottom:`1px solid ${(o.vars||o).palette.action.disabled}`}}}},...Object.entries(o.palette).filter(z()).flatMap(([r])=>[{props:{variant:"text",color:r},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderColor:o.vars?`rgba(${o.vars.palette[r].mainChannel} / 0.5)`:k(o.palette[r].main,.5)}}}]),{props:{variant:"outlined",orientation:"horizontal"},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderRightColor:"transparent","&:hover":{borderRightColor:"currentColor"}},[`& .${t.lastButton},& .${t.middleButton}`]:{marginLeft:-1}}},{props:{variant:"outlined",orientation:"vertical"},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderBottomColor:"transparent","&:hover":{borderBottomColor:"currentColor"}},[`& .${t.lastButton},& .${t.middleButton}`]:{marginTop:-1}}},{props:{variant:"contained",orientation:"horizontal"},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderRight:`1px solid ${(o.vars||o).palette.grey[400]}`,[`&.${t.disabled}`]:{borderRight:`1px solid ${(o.vars||o).palette.action.disabled}`}}}},{props:{variant:"contained",orientation:"vertical"},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderBottom:`1px solid ${(o.vars||o).palette.grey[400]}`,[`&.${t.disabled}`]:{borderBottom:`1px solid ${(o.vars||o).palette.action.disabled}`}}}},...Object.entries(o.palette).filter(z(["dark"])).map(([r])=>({props:{variant:"contained",color:r},style:{[`& .${t.firstButton},& .${t.middleButton}`]:{borderColor:(o.vars||o).palette[r].dark}}}))],[`& .${t.grouped}`]:{minWidth:40,boxShadow:"none",props:{variant:"contained"},style:{"&:hover":{boxShadow:"none"}}}}))),K=c.forwardRef(function(r,e){const u=j({props:r,name:"MuiButtonGroup"}),{children:B,className:g,color:i="primary",component:n="div",disabled:l=!1,disableElevation:$=!1,disableFocusRipple:b=!1,disableRipple:v=!1,fullWidth:f=!1,orientation:G="horizontal",size:m="medium",variant:x="outlined",...S}=u,R={...u,color:i,component:n,disabled:l,disableElevation:$,disableFocusRipple:b,disableRipple:v,fullWidth:f,orientation:G,size:m,variant:x},d=A(R),T=c.useMemo(()=>({className:d.grouped,color:i,disabled:l,disableElevation:$,disableFocusRipple:b,disableRipple:v,fullWidth:f,size:m,variant:x}),[i,l,$,b,v,f,m,x,d.grouped]),h=U(B),E=h.length,w=p=>{const s=p===0,y=p===E-1;return s&&y?"":s?d.firstButton:y?d.lastButton:d.middleButton};return C.jsx(q,{as:n,role:"group",className:V(d.root,g),ref:e,ownerState:R,...S,children:C.jsx(H.Provider,{value:T,children:h.map((p,s)=>C.jsx(N.Provider,{value:w(s),children:p},s))})})});export{K as B};
