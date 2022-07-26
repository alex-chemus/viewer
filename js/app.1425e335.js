(function(){"use strict";var t={9806:function(t,e,r){var n=r(9963),o=r(2119),i=r(6252),a=r(3577),u=r(4870);const c={class:"nav justify-content-start"},s={class:"nav-item"},l=(0,i.Uk)(" Watchlist "),d={class:"nav-item"},f=(0,i.Uk)(" Popular movies "),h={class:"nav-item"},p=(0,i.Uk)(" Popular series "),v=(0,i.uE)('<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" data-v-262dfbe4><circle cx="8.00001" cy="8.00001" r="5.46366" stroke="currentColor" stroke-width="1" data-v-262dfbe4></circle><rect x="7.60976" width="1" height="2.34146" fill="currentColor" data-v-262dfbe4></rect><rect x="16" y="7.60976" width="1" height="2.34146" transform="rotate(90 16 7.60976)" fill="currentColor" data-v-262dfbe4></rect><rect x="14.11" y="13.363" width="1" height="2.34146" transform="rotate(135 14.11 13.363)" fill="currentColor" data-v-262dfbe4></rect><rect x="2.50311" y="13.9149" width="1" height="2.34146" transform="rotate(-135 2.50311 13.9149)" fill="currentColor" data-v-262dfbe4></rect><rect x="4.15877" y="3.60689" width="1" height="2.34146" transform="rotate(135 4.15877 3.60689)" fill="currentColor" data-v-262dfbe4></rect><rect x="12.2592" y="4.15877" width="1" height="2.34146" transform="rotate(-135 12.2592 4.15877)" fill="currentColor" data-v-262dfbe4></rect><rect x="2.34146" y="7.60976" width="1" height="2.34146" transform="rotate(90 2.34146 7.60976)" fill="currentColor" data-v-262dfbe4></rect><rect x="7.60976" y="13.6585" width="1" height="2.34146" fill="currentColor" data-v-262dfbe4></rect></svg>',1),m=[v];var g=(0,i.aZ)({__name:"App",setup(t){const e=(0,u.iH)(window.matchMedia("(prefers-color-scheme: dark)").matches);function r(){const t=document.querySelector("main");t.classList.contains("dark")?(t.classList.remove("dark"),t.classList.add("light")):(t.classList.remove("light"),t.classList.add("dark"))}return(t,n)=>{const o=(0,i.up)("router-link"),u=(0,i.up)("router-view");return(0,i.wg)(),(0,i.iD)("main",{class:(0,a.C_)(e.value?"dark":"light")},[(0,i._)("nav",c,[(0,i._)("div",s,[(0,i.Wm)(o,{to:"/watchlist",class:(0,a.C_)("/watchlist"===t.$route.path?"nav-link text-primary":"nav-link")},{default:(0,i.w5)((()=>[l])),_:1},8,["class"])]),(0,i._)("div",d,[(0,i.Wm)(o,{to:"/popular/movies",class:(0,a.C_)("/popular-movies"===t.$route.path||"/"===t.$route.path?"nav-link btn-hide text-primary":"nav-link btn-hide")},{default:(0,i.w5)((()=>[f])),_:1},8,["class"])]),(0,i._)("div",h,[(0,i.Wm)(o,{to:"/popular/series",class:(0,a.C_)("/popular-series"===t.$route.path?"nav-link btn-hide text-primary":"nav-link btn-hide")},{default:(0,i.w5)((()=>[p])),_:1},8,["class"])]),(0,i._)("div",{class:"nav-item toggle px-2 py-1"},[(0,i._)("button",{class:"btn btn-primary",onClick:r},m)])]),((0,i.wg)(),(0,i.j4)(u,{key:t.$route.fullPath}))],2)}}}),b=r(8118);const y=(0,b.Z)(g,[["__scopeId","data-v-262dfbe4"]]);var w=y,k=r(8637);const C=(0,k.MT)({state:{pages:[],apiKey:"k_zealvkev",url:"https://imdb-api.com/en/API",isDarkTheme:!1},mutations:{addPage(t,e){t.pages.push(e)}},getters:{getPage(t){return e=>t.pages.find((t=>t.id===e))},hasPage(t){return e=>!!t.pages.find((t=>t.id===e))},url(t){return t.url},apiKey(t){return t.apiKey}}}),_=()=>Promise.all([r.e(813),r.e(486)]).then(r.bind(r,2486)),x=()=>r.e(79).then(r.bind(r,5079)),P=()=>Promise.all([r.e(813),r.e(9)]).then(r.bind(r,5009)),O=()=>r.e(60).then(r.bind(r,5060)),j=()=>r.e(321).then(r.bind(r,1370)),E=[{path:"/",redirect:"/popular/movies"},{path:"/popular/:type",component:_},{path:"/:type/:id",component:P},{path:"/watchlist",component:O},{path:"/error",component:j},{path:"/:pathMatch(.*)",component:x,alias:"/notfound"}];var A=E;const S=Symbol(),T=(0,o.p7)({routes:A,history:(0,o.r5)()});(0,n.ri)(w).provide("key",S).use(T).use(C,S).mount("#app")}},e={};function r(n){var o=e[n];if(void 0!==o)return o.exports;var i=e[n]={exports:{}};return t[n](i,i.exports,r),i.exports}r.m=t,function(){var t=[];r.O=function(e,n,o,i){if(!n){var a=1/0;for(l=0;l<t.length;l++){n=t[l][0],o=t[l][1],i=t[l][2];for(var u=!0,c=0;c<n.length;c++)(!1&i||a>=i)&&Object.keys(r.O).every((function(t){return r.O[t](n[c])}))?n.splice(c--,1):(u=!1,i<a&&(a=i));if(u){t.splice(l--,1);var s=o();void 0!==s&&(e=s)}}return e}i=i||0;for(var l=t.length;l>0&&t[l-1][2]>i;l--)t[l]=t[l-1];t[l]=[n,o,i]}}(),function(){r.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return r.d(e,{a:e}),e}}(),function(){r.d=function(t,e){for(var n in e)r.o(e,n)&&!r.o(t,n)&&Object.defineProperty(t,n,{enumerable:!0,get:e[n]})}}(),function(){r.f={},r.e=function(t){return Promise.all(Object.keys(r.f).reduce((function(e,n){return r.f[n](t,e),e}),[]))}}(),function(){r.u=function(t){return"js/"+t+"."+{9:"24d2211e",60:"1d9daffa",79:"d9855785",321:"a8c663f1",486:"a18a5d05",813:"a6519de3"}[t]+".js"}}(),function(){r.miniCssF=function(t){return"css/"+t+"."+{60:"3435bf98",79:"fe9e9ed9",321:"6217d7f1",486:"9052d039",813:"f52594f8"}[t]+".css"}}(),function(){r.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}()}(),function(){r.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)}}(),function(){var t={},e="viewer:";r.l=function(n,o,i,a){if(t[n])t[n].push(o);else{var u,c;if(void 0!==i)for(var s=document.getElementsByTagName("script"),l=0;l<s.length;l++){var d=s[l];if(d.getAttribute("src")==n||d.getAttribute("data-webpack")==e+i){u=d;break}}u||(c=!0,u=document.createElement("script"),u.charset="utf-8",u.timeout=120,r.nc&&u.setAttribute("nonce",r.nc),u.setAttribute("data-webpack",e+i),u.src=n),t[n]=[o];var f=function(e,r){u.onerror=u.onload=null,clearTimeout(h);var o=t[n];if(delete t[n],u.parentNode&&u.parentNode.removeChild(u),o&&o.forEach((function(t){return t(r)})),e)return e(r)},h=setTimeout(f.bind(null,void 0,{type:"timeout",target:u}),12e4);u.onerror=f.bind(null,u.onerror),u.onload=f.bind(null,u.onload),c&&document.head.appendChild(u)}}}(),function(){r.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})}}(),function(){r.p="https://alex-chemus.github.io/viewer/"}(),function(){var t=function(t,e,r,n){var o=document.createElement("link");o.rel="stylesheet",o.type="text/css";var i=function(i){if(o.onerror=o.onload=null,"load"===i.type)r();else{var a=i&&("load"===i.type?"missing":i.type),u=i&&i.target&&i.target.href||e,c=new Error("Loading CSS chunk "+t+" failed.\n("+u+")");c.code="CSS_CHUNK_LOAD_FAILED",c.type=a,c.request=u,o.parentNode.removeChild(o),n(c)}};return o.onerror=o.onload=i,o.href=e,document.head.appendChild(o),o},e=function(t,e){for(var r=document.getElementsByTagName("link"),n=0;n<r.length;n++){var o=r[n],i=o.getAttribute("data-href")||o.getAttribute("href");if("stylesheet"===o.rel&&(i===t||i===e))return o}var a=document.getElementsByTagName("style");for(n=0;n<a.length;n++){o=a[n],i=o.getAttribute("data-href");if(i===t||i===e)return o}},n=function(n){return new Promise((function(o,i){var a=r.miniCssF(n),u=r.p+a;if(e(a,u))return o();t(n,u,o,i)}))},o={143:0};r.f.miniCss=function(t,e){var r={60:1,79:1,321:1,486:1,813:1};o[t]?e.push(o[t]):0!==o[t]&&r[t]&&e.push(o[t]=n(t).then((function(){o[t]=0}),(function(e){throw delete o[t],e})))}}(),function(){var t={143:0};r.f.j=function(e,n){var o=r.o(t,e)?t[e]:void 0;if(0!==o)if(o)n.push(o[2]);else{var i=new Promise((function(r,n){o=t[e]=[r,n]}));n.push(o[2]=i);var a=r.p+r.u(e),u=new Error,c=function(n){if(r.o(t,e)&&(o=t[e],0!==o&&(t[e]=void 0),o)){var i=n&&("load"===n.type?"missing":n.type),a=n&&n.target&&n.target.src;u.message="Loading chunk "+e+" failed.\n("+i+": "+a+")",u.name="ChunkLoadError",u.type=i,u.request=a,o[1](u)}};r.l(a,c,"chunk-"+e,e)}},r.O.j=function(e){return 0===t[e]};var e=function(e,n){var o,i,a=n[0],u=n[1],c=n[2],s=0;if(a.some((function(e){return 0!==t[e]}))){for(o in u)r.o(u,o)&&(r.m[o]=u[o]);if(c)var l=c(r)}for(e&&e(n);s<a.length;s++)i=a[s],r.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return r.O(l)},n=self["webpackChunkviewer"]=self["webpackChunkviewer"]||[];n.forEach(e.bind(null,0)),n.push=e.bind(null,n.push.bind(n))}();var n=r.O(void 0,[998],(function(){return r(9806)}));n=r.O(n)})();
//# sourceMappingURL=app.1425e335.js.map