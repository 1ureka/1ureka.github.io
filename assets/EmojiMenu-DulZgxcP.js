import{o as p,j as e,r as d,ae as h,B as l,T as j}from"./routes-DVE_20A7.js";import{T as u}from"./Tooltip-D6sM6jqj.js";import{I as m}from"./DarkModeRounded-BcA9CbiF.js";import{D as E}from"./SearchRounded-BeeGGA9i.js";const f=p(e.jsx("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2M8.5 8c.83 0 1.5.67 1.5 1.5S9.33 11 8.5 11 7 10.33 7 9.5 7.67 8 8.5 8m8.21 6.72C15.8 16.67 14.04 18 12 18s-3.8-1.33-4.71-3.28c-.16-.33.08-.72.45-.72h8.52c.37 0 .61.39.45.72M15.5 11c-.83 0-1.5-.67-1.5-1.5S14.67 8 15.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5"})),n=[{name:"表情",emojis:["😀","😃","😄","😁","😆","😅","😂","🤣","😊","😇"]},{name:"手勢",emojis:["👍","👎","✌️","🤞","👌","🤟","👏","🙌","🤝","👊"]},{name:"符號",emojis:["❤️","💔","💯","✨","🔥","💩","⭐","🌟","💪","🎉"]},{name:"動物",emojis:["🐶","🐱","🐭","🐹","🦊","🐻","🐼","🐨","🦁","🐮"]}],R=({onEmojiClick:c,disabled:r})=>{const[a,t]=d.useState(null),x=s=>{t(s.currentTarget)},i=()=>{t(null)};return e.jsxs(e.Fragment,{children:[e.jsx(u,{title:"表情符號",arrow:!0,children:e.jsx("span",{children:e.jsx(m,{size:"small",onClick:x,disabled:r,children:e.jsx(f,{fontSize:"small"})})})}),e.jsx(h,{anchorEl:a,open:!!a,onClose:i,slotProps:{paper:{sx:{borderRadius:2,maxHeight:300,width:280}}},children:n.map(s=>e.jsxs(l,{sx:{px:1},children:[e.jsx(j,{variant:"caption",sx:{color:"text.secondary",pl:1},children:s.name}),e.jsx(l,{sx:{display:"flex",flexWrap:"wrap"},children:s.emojis.map(o=>e.jsx(m,{size:"small",disableRipple:!0,onClick:()=>{r||c(o),i()},sx:{fontSize:"1.2rem",p:.5,minWidth:"auto",borderRadius:1,"&:hover":{bgcolor:"action.hover"}},children:o},o))}),s!==n[n.length-1]&&e.jsx(E,{sx:{mt:.5}})]},s.name))})]})};export{R as E};
