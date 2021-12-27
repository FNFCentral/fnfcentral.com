"use strict";(self.webpackChunkfnfcentral_docs=self.webpackChunkfnfcentral_docs||[]).push([[862],{3905:function(e,t,n){n.d(t,{Zo:function(){return s},kt:function(){return p}});var r=n(7294);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var u=r.createContext({}),c=function(e){var t=r.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},s=function(e){var t=c(e.components);return r.createElement(u.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},f=r.forwardRef((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,u=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),f=c(n),p=a,h=f["".concat(u,".").concat(p)]||f[p]||d[p]||o;return n?r.createElement(h,i(i({ref:t},s),{},{components:n})):r.createElement(h,i({ref:t},s))}));function p(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=f;var l={};for(var u in t)hasOwnProperty.call(t,u)&&(l[u]=t[u]);l.originalType=e,l.mdxType="string"==typeof e?e:a,i[1]=l;for(var c=2;c<o;c++)i[c]=n[c];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}f.displayName="MDXCreateElement"},3801:function(e,t,n){n.r(t),n.d(t,{frontMatter:function(){return l},contentTitle:function(){return u},metadata:function(){return c},assets:function(){return s},toc:function(){return d},default:function(){return p}});var r=n(7462),a=n(3366),o=(n(7294),n(3905)),i=["components"],l={slug:"0.0.5-and-outages",title:"0.0.5 Release and First Outage",authors:"jred"},u=void 0,c={permalink:"/blog/0.0.5-and-outages",editUrl:"https://github.com/fnfcentral/fnfcentral.com/edit/main/docs/blog/blog/2021-12-20-0.0.5-and-outages/index.md",source:"@site/blog/2021-12-20-0.0.5-and-outages/index.md",title:"0.0.5 Release and First Outage",description:"0.0.5",date:"2021-12-20T00:00:00.000Z",formattedDate:"December 20, 2021",tags:[],readingTime:.995,truncated:!0,authors:[{name:"Joseph (JRed)",title:"Creator of FNF Central",url:"https://github.com/jredow",imageURL:"https://github.com/jredow.png",key:"jred"}],nextItem:{title:"Canary Initial Deployment",permalink:"/blog/canary-deployment"}},s={authorsImageUrls:[void 0]},d=[{value:"0.0.5",id:"005",children:[],level:2},{value:"The Outage",id:"the-outage",children:[],level:2},{value:"Changes in The Update",id:"changes-in-the-update",children:[{value:"New Features",id:"new-features",children:[],level:3},{value:"Changes",id:"changes",children:[],level:3},{value:"Bug Fixes",id:"bug-fixes",children:[],level:3}],level:2}],f={toc:d};function p(e){var t=e.components,l=(0,a.Z)(e,i);return(0,o.kt)("wrapper",(0,r.Z)({},f,l,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h2",{id:"005"},"0.0.5"),(0,o.kt)("p",null,"This is mostly a QoL update, with a few new nice features. Nothing groundbreaking, as I am currently on Holiday vacation in a totally different state."),(0,o.kt)("h2",{id:"the-outage"},"The Outage"),(0,o.kt)("p",null,"At approximately 23:50 UTC on the 23rd, one of the worker nodes went offline. Within 5 minuets the entire cluster had collapsed, as there are only two worker nodes in the Canary. The server was back online 00:19 on the 24th."),(0,o.kt)("p",null,(0,o.kt)("img",{alt:"Boyfriend Miss",src:n(4137).Z})),(0,o.kt)("p",null,"Thanks to some late notice from Linode, I learned that this was a hardware failure that forced them to relocate my node which was running one of the two workers, bringing it offline for about 30 minuets. Why it took that long, don't ask me. All this really proved was that the official cluster will be at least three nodes."),(0,o.kt)("h2",{id:"changes-in-the-update"},"Changes in The Update"),(0,o.kt)("h3",{id:"new-features"},"New Features"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Account Recovery (Yes I Know Email Still Does Not Work On the Canary)"),(0,o.kt)("li",{parentName:"ul"},"Added Error Page"),(0,o.kt)("li",{parentName:"ul"},"Added Dashboard (Kinda)")),(0,o.kt)("h3",{id:"changes"},"Changes"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Added Output for Registration and Login"),(0,o.kt)("li",{parentName:"ul"},"Removed FNF OG From Home Page As It Longer Is Supported")),(0,o.kt)("h3",{id:"bug-fixes"},"Bug Fixes"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"Fixed Weird Bug That Rarely Happens On Game Page")))}p.isMDXComponent=!0},4137:function(e,t,n){t.Z=n.p+"assets/images/DoBetter-d9463d526e96fdd796b7189fbbba3718.gif"}}]);