"use strict";var B=Object.defineProperty;var D=(e,t,i)=>t in e?B(e,t,{enumerable:!0,configurable:!0,writable:!0,value:i}):e[t]=i;var r=(e,t,i)=>(D(e,typeof t!="symbol"?t+"":t,i),i);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const S=require("rxjs"),Q=require("gsap");var p=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function $(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var A="Expected a function",L=0/0,N="[object Symbol]",P=/^\s+|\s+$/g,W=/^[-+]0x[0-9a-f]+$/i,_=/^0b[01]+$/i,q=/^0o[0-7]+$/i,G=parseInt,H=typeof p=="object"&&p&&p.Object===Object&&p,U=typeof self=="object"&&self&&self.Object===Object&&self,X=H||U||Function("return this")(),J=Object.prototype,K=J.toString,V=Math.max,Y=Math.min,O=function(){return X.Date.now()};function Z(e,t,i){var c,u,a,s,o,l,d=0,x=!1,h=!1,y=!0;if(typeof e!="function")throw new TypeError(A);t=C(t)||0,T(i)&&(x=!!i.leading,h="maxWait"in i,a=h?V(C(i.maxWait)||0,t):a,y="trailing"in i?!!i.trailing:y);function g(n){var f=c,b=u;return c=u=void 0,d=n,s=e.apply(b,f),s}function E(n){return d=n,o=setTimeout(v,t),x?g(n):s}function F(n){var f=n-l,b=n-d,I=t-f;return h?Y(I,a-b):I}function R(n){var f=n-l,b=n-d;return l===void 0||f>=t||f<0||h&&b>=a}function v(){var n=O();if(R(n))return k(n);o=setTimeout(v,F(n))}function k(n){return o=void 0,y&&c?g(n):(c=u=void 0,s)}function M(){o!==void 0&&clearTimeout(o),d=0,c=l=u=o=void 0}function w(){return o===void 0?s:k(O())}function z(){var n=O(),f=R(n);if(c=arguments,u=this,l=n,f){if(o===void 0)return E(l);if(h)return o=setTimeout(v,t),g(l)}return o===void 0&&(o=setTimeout(v,t)),s}return z.cancel=M,z.flush=w,z}function T(e){var t=typeof e;return!!e&&(t=="object"||t=="function")}function ee(e){return!!e&&typeof e=="object"}function te(e){return typeof e=="symbol"||ee(e)&&K.call(e)==N}function C(e){if(typeof e=="number")return e;if(te(e))return L;if(T(e)){var t=typeof e.valueOf=="function"?e.valueOf():e;e=T(t)?t+"":t}if(typeof e!="string")return e===0?e:+e;e=e.replace(P,"");var i=_.test(e);return i||q.test(e)?G(e.slice(2),i?2:8):W.test(e)?L:+e}var ie=Z;const ne=$(ie),j=class{constructor(t,i={}){r(this,"mediaQueryList");r(this,"motionResizeObserver");r(this,"meta",{});r(this,"subscriptions",[]);r(this,"create");r(this,"cleanup");r(this,"reset",ne(()=>{var t;(t=this.cleanup)==null||t.call(this),requestAnimationFrame(()=>{var i;this.cleanup=((i=this.create)==null?void 0:i.call(this,this))??void 0})},j.resetDebounceTime,{leading:!0}));r(this,"destroy",()=>{var t,i;for((t=this.cleanup)==null||t.call(this),this.cleanup=void 0,this.create=void 0,this.mediaQueryList=void 0,this.motionResizeObserver=void 0;this.subscriptions.length;)(i=this.subscriptions.pop())==null||i.unsubscribe()});this.observeMedia(i.watchMedia),this.observeResize(i.shouldResetOnResize),this.create=()=>{var a,s;return[((a=i.enable)==null?void 0:a.call(i))??!0,((s=this.mediaQueryList)==null?void 0:s.matches)??!0].every(Boolean)?t(this):void 0},this.cleanup=this.create(this)??void 0}static get referenceFrameTime(){return 1e3/this.referenceFramerate}static applyDeltaRatio(t){return t*Q.ticker.deltaRatio(this.referenceFramerate)}observeMedia(t){t&&(this.mediaQueryList=matchMedia(t),this.subscriptions.push(S.fromEvent(this.mediaQueryList,"change").subscribe(()=>this.reset())))}observeResize(t){t&&(this.motionResizeObserver=new re(t),this.subscriptions.push(this.motionResizeObserver.observable.pipe(S.debounceTime(500)).subscribe(()=>this.reset())))}};let m=j;r(m,"resetDebounceTime",100),r(m,"referenceFramerate",60);class re{constructor(t){r(this,"axis");r(this,"element");r(this,"inlineSize");r(this,"blockSize");r(this,"observable");const[i,c]=[t].flat();this.element=typeof i=="string"?document.querySelector(i):i,this.axis=c,this.observable=new S.Observable(u=>{const a=new ResizeObserver(s=>this.handleResize(s,u));return this.element&&a.observe(this.element),()=>a.disconnect()})}handleResize(t,i){const c=t.find(d=>d.target===this.element);if(!c)return;const{inlineSize:u,blockSize:a}=c.borderBoxSize[0],s=u!==this.inlineSize,o=a!==this.blockSize,l=this.inlineSize==null||this.blockSize==null;if(this.inlineSize=u,this.blockSize=a,!l){if(this.axis==="horizontal"&&s||this.axis==="vertical"&&o)return i.next();!this.axis&&(s||o)&&i.next()}}}exports.Motion=m;