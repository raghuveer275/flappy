(this.webpackJsonpflap=this.webpackJsonpflap||[]).push([[0],[,,,,function(e,t,n){e.exports=n(12)},,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){"use strict";n.r(t);var o=n(0),i=n.n(o),a=n(3),s=n.n(a),r=(n(9),n(10),n(1));var d=function(){return i.a.useEffect((function(){var e,t,n,o,i,a,s=r.World,d=r.Engine,c=r.Render,l=r.Bodies,u=r.Body,m=r.Events;function y(){window.location.reload()}function h(e){32===e.keyCode&&M()}function p(e){M()}function w(e){e.preventDefault(),M()}var f,g=function(){this.x=200,this.y=200,this.w=30,this.static=!0,this.body=l.circle(this.x,this.y,this.w,this.static),this.body.render.sprite.texture="https://www.stickpng.com/assets/thumbs/584c69846e7d5809d2fa6366.png",this.body.render.sprite.xScale=.2,this.body.render.sprite.yScale=.2,this.body.restitution=.1};function v(){var t=i+30,n=P(60,a-120),o=P(120,160),r=a-60-n-o,d=n-o,c=r/2,u=a-d/2-20,m={top:l.rectangle(t,c,60,r,{isStatic:!0}),bottom:l.rectangle(t,u,60,d,{isStatic:!0})};I.push(m),s.add(e.world,[m.top,m.bottom])}function E(t){s.remove(e.world,[t.top,t.bottom]),I.shift()}function b(){!R&&L&&I.forEach((function(e,t){e.top.position.x<-30&&(E(e),document.getElementById("myScore").play(),A+=1,B.innerText=A,v());var n={x:-6,y:0};u.translate(e.top,n),u.translate(e.bottom,n)}))}g.prototype.addBird=function(){s.add(e.world,this.body)},g.prototype.removeBird=function(){s.remove(e.world,this.body)},g.prototype.setHit=function(){this.body.render.fillStyle="tomato",this.body.render.strokeStyle="red"},g.prototype.sad=function(){this.body.render.sprite.xScale=1,this.body.render.sprite.yScale=1,this.body.render.sprite.texture="https://vignette.wikia.nocookie.net/angry-birds-fanon/images/e/e2/ABGO_Sad_Red.png/revision/latest/scale-to-width-down/340?cb=20160624181829"};var B,k,x,S,I=[],A=0,L=!1,R=!1;function H(){(f=new g).addBird()}function M(){if(document.getElementById("myAudio").play(),!R&&L){var e=f.body,t=f.body.position;u.applyForce(e,t,{x:0,y:-.1})}}function W(){L=!0,e.world.gravity.y=1.5,k.style.display="none"}function z(){document.getElementById("sad").play(),R=!0,f.setHit(),f.sad(),S.style.display="block"}function C(){k.style.display="block",S.style.display="none",A=0,B.innerText=A,L=!1,R=!1,e.world.gravity.y=0,f.removeBird(),I.forEach((function(e){E(e)})),I=[],H(),v()}function P(e,t){return Math.floor(Math.random()*(t-e+1))+e}window.onload=(n=document.getElementById("main"),o=window.devicePixelRatio||1,i=window.innerWidth,a=window.innerHeight,(e=d.create()).world.gravity.y=0,t=c.create({element:n,engine:e,options:{width:i,height:a,pixelRatio:o,background:"orange",hasBounds:!1,enabled:!1,wireframes:!1,showSleeping:!1,showDebug:!1,showBroadphase:!1,showBounds:!1,showVelocity:!1,showCollisions:!1,showSeparations:!1,showAxes:!1,showPositions:!1,showAngleIndicator:!1,showIds:!1,showShadows:!1,showVertexNumbers:!1,showConvexHulls:!1,showInternalEdges:!1,showMousePosition:!1}}),window.addEventListener("click",w,!1),window.addEventListener("touchstart",p,!1),window.addEventListener("keydown",h,!1),window.addEventListener("resize",y,!1),H(),v(),function(){var t=i/2,n=a-10,o=i,r=l.rectangle(t,n-a,o,20,{isStatic:!0}),d=l.rectangle(t,n,o,20,{isStatic:!0});s.add(e.world,[r,d])}(),(B=document.getElementById("score")).innerText=A,document.getElementById("gui"),k=document.getElementById("start"),x=document.getElementById("reset"),(S=document.getElementById("fail")).style.display="none",k.addEventListener("click",W,!1),x.addEventListener("click",C,!1),d.run(e),c.run(t),m.on(e,"tick",b),void m.on(e,"collisionStart",z))})),i.a.createElement("div",{id:"main"},i.a.createElement("div",{id:"gui"},i.a.createElement("audio",{id:"myAudio"},i.a.createElement("source",{src:"http://s1download-universal-soundbank.com/mp3/sounds/22372.mp3",type:"audio/mpeg"})),i.a.createElement("audio",{id:"sad"},i.a.createElement("source",{src:"http://shing.mobile9.com/download/media/702/angrybirds_oaw366ij.mp3",type:"audio/mpeg"})),i.a.createElement("audio",{id:"myScore"},i.a.createElement("source",{src:"http://plantsvszombies.clan.su/publfiles/downloads/soundspvz/points.mp3",type:"audio/mpeg"})),i.a.createElement("span",{id:"score"}),i.a.createElement("button",{id:"start"},"Start"),i.a.createElement("div",{id:"fail",style:{display:"none"}},i.a.createElement("h2",null,"GAME OVER"),i.a.createElement("button",{id:"reset"},"Restart"))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));s.a.render(i.a.createElement(d,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}],[[4,1,2]]]);
//# sourceMappingURL=main.c8ce07f1.chunk.js.map