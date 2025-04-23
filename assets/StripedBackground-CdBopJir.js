import{o as $,j as s}from"./routes-DrAjfNKu.js";const h=$([s.jsx("path",{d:"M3 6c-.55 0-1 .45-1 1v13c0 1.1.9 2 2 2h13c.55 0 1-.45 1-1s-.45-1-1-1H4V7c0-.55-.45-1-1-1"},"0"),s.jsx("path",{d:"M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2m-3.54 12.01-.63-1.82H12.2l-.65 1.82c-.1.29-.38.48-.68.48-.51 0-.86-.51-.68-.98l2.73-7.27c.16-.44.6-.74 1.08-.74s.92.3 1.09.75l2.73 7.27c.18.47-.17.98-.68.98-.31 0-.58-.19-.68-.49"},"1"),s.jsx("path",{d:"m13.96 7.17-1.31 3.72h2.69l-1.3-3.72z"},"2")]);function i(e){if(!e)return;const n=e.match(/^([a-z]+)(?:\.(\w+))?$/);if(n){const[,c,t]=n,o=["--mui-palette",c];return t&&o.push(t),`var(${o.join("-")})`}return e}const m=({color1:e="white",color2:n="transparent",angle:c=45,stripeWidth:t=10,backgroundSize:o,zIndex:p=0,className:l="",style:u={}})=>{const r=i(e),a=i(n),d=o??t*2,x=`repeating-linear-gradient(
    ${c}deg,
    ${r},
    ${r} ${t}px,
    ${a} ${t}px,
    ${a} ${d}px
  )`;return s.jsx("div",{className:l,style:{position:"absolute",inset:0,zIndex:p,background:x,pointerEvents:"none",...u}})};export{m as S,h as T};
