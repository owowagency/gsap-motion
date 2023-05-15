"use strict";var c=Object.defineProperty;var a=(s,t,e)=>t in s?c(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var i=(s,t,e)=>(a(s,typeof t!="symbol"?t+"":t,e),e);Object.defineProperty(exports,Symbol.toStringTag,{value:"Module"});const r=require("gsap"),h=require("rxjs"),w=require("./motion.cjs"),o=class{constructor(){i(this,"subscriptions",[]);i(this,"viewWidth",window.innerWidth);i(this,"viewHeight",window.innerHeight);i(this,"clientX",this.viewWidth/2);i(this,"clientY",this.viewHeight/2);i(this,"normalX",.5);i(this,"normalY",.5);i(this,"observable",h.fromEvent(window,"mousemove"));i(this,"motion",new w.Motion(t=>{this.subscriptions.push(this.observable.subscribe(e=>{this.clientX=e.clientX,this.clientY=e.clientY,this.normalX=r.utils.mapRange(0,this.viewWidth,0,1,this.clientX),this.normalY=r.utils.mapRange(0,this.viewHeight,0,1,this.clientY)})),this.subscriptions.push(h.fromEvent(window,"resize").subscribe(()=>{this.viewWidth=window.innerWidth,this.viewHeight=window.innerHeight})),t.meta.label="Pointer"},{watchMedia:"(pointer: fine)"}));i(this,"destroy",()=>{this.subscriptions.forEach(t=>t.unsubscribe()),this.motion.destroy()})}static get instance(){return this._instance??(this._instance=new o)}};let n=o;i(n,"_instance");exports.Pointer=n;
