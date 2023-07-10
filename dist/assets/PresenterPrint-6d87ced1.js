import{d,i as _,a as p,u as h,b as u,c as m,e as f,f as n,g as t,t as o,h as a,F as g,r as v,n as x,j as y,o as r,k as b,l as N,m as k,p as P,q as V,_ as j}from"./index-723711d1.js";import{N as w}from"./NoteDisplay-7f924f42.js";const S={class:"m-4"},L={class:"mb-10"},T={class:"text-4xl font-bold mt-2"},z={class:"opacity-50"},B={class:"text-lg"},C={class:"font-bold flex gap-2"},D={class:"opacity-50"},H=t("div",{class:"flex-auto"},null,-1),F={key:0,class:"border-gray-400/50 mb-8"},M=d({__name:"PresenterPrint",setup(q){_(p),h(`
@page {
  size: A4;
  margin-top: 1.5cm;
  margin-bottom: 1cm;
}
* {
  -webkit-print-color-adjust: exact;
}
html,
html body,
html #app,
html #page-root {
  height: auto;
  overflow: auto !important;
}
`),u({title:`Notes - ${m.title}`});const i=f(()=>y.map(s=>{var l;return(l=s.meta)==null?void 0:l.slide}).filter(s=>s!==void 0&&s.noteHTML!==""));return(s,l)=>(r(),n("div",{id:"page-root",style:x(a(V))},[t("div",S,[t("div",L,[t("h1",T,o(a(m).title),1),t("div",z,o(new Date().toLocaleString()),1)]),(r(!0),n(g,null,v(a(i),(e,c)=>(r(),n("div",{key:c,class:"flex flex-col gap-4 break-inside-avoid-page"},[t("div",null,[t("h2",B,[t("div",C,[t("div",D,o(e==null?void 0:e.no)+"/"+o(a(b)),1),N(" "+o(e==null?void 0:e.title)+" ",1),H])]),k(w,{"note-html":e.noteHTML,class:"max-w-full"},null,8,["note-html"])]),c<a(i).length-1?(r(),n("hr",F)):P("v-if",!0)]))),128))])],4))}}),R=j(M,[["__file","/Users/yuzhihang/VscodeProjects/performance/node_modules/.pnpm/@slidev+client@0.42.5_postcss@8.4.25_vite@4.4.2/node_modules/@slidev/client/internals/PresenterPrint.vue"]]);export{R as default};
