let aa=window.location.host,c=document.getElementById("canvas"),d=c.getContext("2d"),ba=document.getElementById("form"),e=document.getElementById("message"),[f,h,k,n,p,r,t,u,v,w,x,y,B,C,D,ca,da,ea,fa]=[document.getElementById("bLeft"),document.getElementById("bRight"),document.getElementById("bUp"),document.getElementById("bDown"),document.getElementById("bShift"),document.getElementById("ChatMessage"),document.getElementById("Notification"),document.getElementById("cb1"),document.getElementById("cb2"),
document.getElementById("cb3"),document.getElementById("cb4"),document.getElementById("cb5"),document.getElementById("cb6"),document.getElementById("cb1t"),document.getElementById("cb2t"),document.getElementById("cb3t"),document.getElementById("cb4t"),document.getElementById("cb5t"),document.getElementById("cb6t")];ba.addEventListener("submit",a=>{a.preventDefault();e.value&&(a=e.value,null!==a&&(E.send(JSON.stringify(["message",a.slice(0,128).toString()])),e.value=""))});
if(0<=window.navigator.appVersion.indexOf("Android")||0<=window.navigator.appVersion.indexOf("iOS"))f.removeAttribute("hidden"),h.removeAttribute("hidden"),k.removeAttribute("hidden"),n.removeAttribute("hidden"),p.removeAttribute("hidden");d.font="bold 16px Calibri, Carlito, sans-serif";const E=new WebSocket(`wss://${aa}`);
var F={},G=u.checked,H=v.checked,ha=w.checked,ia=x.checked,ja=y.checked,I=B.checked,ka=C.checked,la=D.checked,ma=ca.checked,na=da.checked,oa=ea.checked,J=fa.checked,K=0,pa=0,L=0,M=0,N=!1,O=60,R=(a,m,b,g="#FFFFFF",l=!1)=>{l&&(d.fillStyle="#00000080",d.fillRect(m-("center"==d.textAlign?d.measureText(a).width/2:0),b-12,d.measureText(a).width,16));d.font="bold 16px Calibri";d.fillStyle=g;l=d.fillStyle;let q="FF";void 0!==l[6]&&void 0!==l[7]&&(q=l[6]+l[7]);d.fillStyle=`#000000${q}`;d.fillText(a,m+1,b+
1);d.fillStyle=g;d.fillText(a,m,b)},S={},T="",qa=0,ra=0,U=[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],V=[],W=0,X="",Y=0,sa=!1,Z=[],ta=a=>{let m=a-K;O=1E3/m;K=a;d.clearRect(0,0,c.width,c.height);d.fillStyle="gray";d.fillRect(0,0,c.width,c.height);
[G,H,ha,ia,ja,I,ka,la,ma,na,oa,J]=[u.checked,v.checked,w.checked,x.checked,y.checked,B.checked,C.checked,D.checked,ca.checked,da.checked,ea.checked,fa.checked];if(void 0!==U[8])for(a=0;16>a;a++)for(var b=0;9>b;b++)if(0<U[b][a])switch(U[b][a]){case 1:d.fillStyle="#858585";d.fillRect(80*a,80*b,80,80);break;case 2:d.fillStyle="#909090";d.fillRect(80*a,80*b,80,80);break;case 3:d.fillStyle="#AAAAAA",d.fillRect(80*a,80*b,80,80)}for(a=0;a<Z.length;a++)1>Z[a][2]||(d.fillStyle=`#DDDDDD${1==Z[a][2].toString(16).length?
"0"+Z[a][2].toString(16):Z[a][2].toString(16)}`,d.fillRect(Z[a][0]+4,Z[a][1]+4,8,8),Z[a][2]--);d.textAlign="center";for(a=0;a<Object.keys(S).length;a++)if(b=S[Object.keys(S)[a]],Object.keys(S)[a]!=T?d.fillStyle="#FF6969":d.fillStyle="#3369FF",Object.keys(S)[a]!=T){var g=b.g;g=Math.floor(g+2/65*m*(b.x-g));var l=b.h;l=Math.floor(l+2/65*m*(b.y-l));b.g=b.x;b.h=b.y;d.beginPath();d.arc(g+8,l+8,8,0,2*Math.PI);d.fill();d.closePath();if(J){b=Object.keys(S)[a];var q=d.measureText(Object.keys(S)[a]).width/2,
wa=1280-d.measureText(Object.keys(S)[a]).width/2;R(b,Math.min(Math.max(g+8,q),wa),Math.min(Math.max(l-16,16),704),"#FFFFFF",I)}}else d.beginPath(),d.arc(b.x+8,b.y+8,8,0,2*Math.PI),d.fill(),d.closePath(),J&&(g=Object.keys(S)[a],l=d.measureText(Object.keys(S)[a]).width/2,q=1280-d.measureText(Object.keys(S)[a]).width/2,R(g,Math.min(Math.max(b.x+8,l),q),Math.min(Math.max(b.y-16,16),704),"#FFFFFF",I));[qa,ra]=[void 0===S[T]?0:S[T].x,void 0===S[T]?0:S[T].y];let [,,z,A,,P,Q]=[0,0,0,0,0,!1,!1];b=2/15*m;a=
S[T];try{if(F[37]||F.left)z=-b;if(F[39]||F.right)z=b;if(F[38]||F.j)A=-b;if(F[40]||F.i)A=b;if(a.x!==a.g)for(b=0;9>b;b++)for(g=0;16>g;g++)2<=U[b][g]&&!P&&(P=a.x+z<80*g+80&&a.x+z+16>80*g&&a.y<80*b+80&&a.y+16>80*b);if(a.y!==a.h)for(b=0;9>b;b++)for(g=0;16>g;g++)2<=U[b][g]&&!Q&&(Q=a.x<80*g+80&&a.x+16>80*g&&a.y+A<80*b+80&&a.y+A+16>80*b);P||(S[T].x=Math.min(Math.max(S[T].x+z,0),1264));Q||(S[T].y=Math.min(Math.max(S[T].y+A,0),704));sa=F[16]||F.shift?!0:!1}catch(xa){}d.textAlign="left";R("Balls Online",16,
16,"#EEEEEE");ka&&(R(`FPS: ${Math.ceil(O)}`,16,32,30>O?15>O?"red":"yellow":"lime",G),R(`Ping: ${isNaN(L)?0:L}ms`,16,48,100<L?250<L?"red":"yellow":"lime",G),R(`Status: ${0==E.readyState||3==E.readyState||2==E.readyState?"offline":"online"}`,16,64,0==E.readyState||3==E.readyState||2==E.readyState?"red":"lime",G),R(`Client run: ${Math.floor(K/1E3)}s`,16,96,"#AAAAFF",G),R(`Server run: ${Math.floor((pa+K)/1E3)}s`,16,112,"#AAAAFF",G),R("Version: 0.3.6",16,144,"#AAAAFF",G),R(`Platform: ${window.navigator.platform}`,
16,160,"#AAAAFF",G));la&&(R("Info",192,16,"#EEEEEE"),R(`Client ID: ${T}`,192,32,"#DDDDDD",H),R(`Client X: ${Math.floor(void 0===S[T]?0:S[T].x)}`,192,48,"#DDDDDD",H),R(`Client Y: ${Math.floor(void 0===S[T]?0:S[T].y)}`,192,64,"#DDDDDD",H),R(`Players: ${Object.keys(S).length}`,192,96,"#DDDDDD",H));if(ma)for(R("Chat",384,16,"#EEEEEE"),a=0;a<V.length;a++)R(V[a],384,16*(a+2),a==V.length-1?`${"#DDDD"}${1==Math.round(W).toString(16).length?"0"+Math.round(W).toString(16):Math.round(W).toString(16)}`:"#DDDDDD",
ha),221>W&&(W+=.1*m);if(na)for(R("Player list",16,192,"#EEEEEE"),a=0;a<Object.keys(S).length;a++)b=S[Object.keys(S)[a]],R(`${Object.keys(S)[a]} - ${Math.round(b.x)}, ${Math.round(b.y)}`,16,192+16*(a+1),"#DDDDDD",ia);oa&&0<Y&&(R(X,(1280-d.measureText(X).width)/2,360,`#EEEEEE${255<Y?"FF":(1==Math.round(Y).toString(16).length?"0":"")+Math.round(Y).toString(16)}`,ja),Y-=.1*m);requestAnimationFrame(ta)},ua;E.addEventListener("open",()=>{console.log("Connected to server")});
E.addEventListener("message",a=>{a=JSON.parse(a.data);switch(a[0]){case "id":T=a[1];null!==window.localStorage.getItem("name")&&E.send(JSON.stringify(["message",`/name ${window.localStorage.getItem("name")}`]));break;case "time":pa=a[1];break;case "spawn":S[a[1]]={x:a[2],y:a[3],g:0,h:0};break;case "despawn":delete S[a[1]];break;case "move":S[a[1]].x=a[2];S[a[1]].y=a[3];break;case "ping":N=!1;M=0;L=Math.ceil(performance.now()-ua);break;case "map":U=a[1];break;case "message":V.push(`${a[1]}: ${a[2]}`);
5<V.length&&V.shift();W=document.hasFocus()?0:221;r.currentTime=0;r.play();break;case "rename":let m=S[a[1]];delete S[a[1]];a[1]==T&&(T=a[2],window.localStorage.setItem("name",a[2]));S[a[2]]={x:m.x,y:m.y,g:0,h:0};break;case "restart":location.reload();break;case "notification":X=a[1];Y=510;r.pause();t.currentTime=0;t.play();break;case "draw":Z.push([a[1],a[2],255]);break;case "audio":console.log("Audio loading from "+a[1]),(new Audio(a[1])).play()}});
window.addEventListener("keydown",a=>{F[a.keyCode]=!0});window.addEventListener("keyup",a=>{F[a.keyCode]=!1});k.addEventListener("touchstart",()=>{F.j=!0});n.addEventListener("touchstart",()=>{F.i=!0});f.addEventListener("touchstart",()=>{F.left=!0});h.addEventListener("touchstart",()=>{F.right=!0});p.addEventListener("touchstart",()=>{F.shift=!0});k.addEventListener("touchend",()=>{F.j=!1});n.addEventListener("touchend",()=>{F.i=!1});f.addEventListener("touchend",()=>{F.left=!1});
h.addEventListener("touchend",()=>{F.right=!1});p.addEventListener("touchend",()=>{F.shift=!1});setInterval(()=>{try{E.readyState==WebSocket.CLOSED||qa==S[T].x&&ra==S[T].y||(E.send(JSON.stringify(["move",Math.round(S[T].x),Math.round(S[T].y)])),sa&&E.send(JSON.stringify(["draw"])))}catch(a){}},50);
let va=setInterval(()=>{E.readyState!=WebSocket.CLOSED?(N?10<M&&(E.close(),location.reload(),clearInterval(va)):(E.send(JSON.stringify(["ping"])),N=!0,ua=performance.now()),M++):(location.reload(),clearInterval(va))},1E3);requestAnimationFrame(ta);
