/*! Copyright 2011 Trigger Corp. All rights reserved. */
(function(){var m={flags:{}};var h={};m.config=window.forge.config;if(!Object.keys){Object.keys=(function(){var s=Object.prototype.hasOwnProperty,t=!({toString:null}).propertyIsEnumerable("toString"),r=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],q=r.length;return function(w){if(typeof w!=="object"&&typeof w!=="function"||w===null){throw new TypeError("Object.keys called on non-object")}var u=[];for(var x in w){if(s.call(w,x)){u.push(x)}}if(t){for(var v=0;v<q;v++){if(s.call(w,r[v])){u.push(r[v])}}}return u}})()}
/*! https://mths.be/startswith v0.2.0 by @mathias */
;if(!String.prototype.startsWith){(function(){var q=(function(){var t;try{var w={};var v=Object.defineProperty;t=v(w,w,w)&&v}catch(u){}return t}());var s={}.toString;var r=function(A){if(this===null){throw new TypeError("String.startsWith called on non-String")}var x=String(this);if(A&&s.call(A)=="[object RegExp]"){throw new TypeError("String.startsWith called with non-String")}var t=x.length;var B=String(A);var v=B.length;var w=arguments.length>1?arguments[1]:undefined;var z=w?Number(w):0;if(z!=z){z=0}var u=Math.min(Math.max(z,0),t);if(v+u>t){return false}var y=-1;while(++y<v){if(x.charCodeAt(u+y)!=B.charCodeAt(y)){return false}}return true};if(q){q(String.prototype,"startsWith",{value:r,configurable:true,writable:true})}else{String.prototype.startsWith=r}}())}(function(q){var D=false;if(!q.forceJURL){try{var x=new URL("b","http://a");x.pathname="c%20d";D=x.href==="http://a/c%20d"}catch(G){}}if(D){return}var H=Object.create(null);H.ftp=21;H.file=0;H.gopher=70;H.http=80;H.https=443;H.ws=80;H.wss=443;var s=Object.create(null);s["%2e"]=".";s[".%2e"]="..";s["%2e."]="..";s["%2e%2e"]="..";function y(u){return H[u]!==undefined}function F(){B.call(this);this._isInvalid=true}function C(u){if(""==u){F.call(this)}return u.toLowerCase()}function t(J){var u=J.charCodeAt(0);if(u>32&&u<127&&[34,35,60,62,63,96].indexOf(u)==-1){return J}return encodeURIComponent(J)}function I(J){var u=J.charCodeAt(0);if(u>32&&u<127&&[34,35,60,62,96].indexOf(u)==-1){return J}return encodeURIComponent(J)}var z=undefined,E=/[a-zA-Z]/,v=/[a-zA-Z0-9\+\-\.]/;function A(S,u,M){function L(aa){Q.push(aa)}var K=u||"scheme start",J=0,U="",Z=false,N=false,Q=[];loop:while((S[J-1]!=z||J==0)&&!this._isInvalid){var Y=S[J];switch(K){case"scheme start":if(Y&&E.test(Y)){U+=Y.toLowerCase();K="scheme"}else{if(!u){U="";K="no scheme";continue}else{L("Invalid scheme.");break loop}}break;case"scheme":if(Y&&v.test(Y)){U+=Y.toLowerCase()}else{if(":"==Y){this._scheme=U;U="";if(u){break loop}if(y(this._scheme)){this._isRelative=true}if("file"==this._scheme){K="relative"}else{if(this._isRelative&&M&&M._scheme==this._scheme){K="relative or authority"}else{if(this._isRelative){K="authority first slash"}else{K="scheme data"}}}}else{if(!u){U="";J=0;K="no scheme";continue}else{if(z==Y){break loop}else{L("Code point not allowed in scheme: "+Y);break loop}}}}break;case"scheme data":if("?"==Y){query="?";K="query"}else{if("#"==Y){this._fragment="#";K="fragment"}else{if(z!=Y&&"\t"!=Y&&"\n"!=Y&&"\r"!=Y){this._schemeData+=t(Y)}}}break;case"no scheme":if(!M||!(y(M._scheme))){L("Missing scheme.");F.call(this)}else{K="relative";continue}break;case"relative or authority":if("/"==Y&&"/"==S[J+1]){K="authority ignore slashes"}else{L("Expected /, got: "+Y);K="relative";continue}break;case"relative":this._isRelative=true;if("file"!=this._scheme){this._scheme=M._scheme}if(z==Y){this._host=M._host;this._port=M._port;this._path=M._path.slice();this._query=M._query;this._username=M._username;this._password=M._password;break loop}else{if("/"==Y||"\\"==Y){if("\\"==Y){L("\\ is an invalid code point.")}K="relative slash"}else{if("?"==Y){this._host=M._host;this._port=M._port;this._path=M._path.slice();this._query="?";this._username=M._username;this._password=M._password;K="query"}else{if("#"==Y){this._host=M._host;this._port=M._port;this._path=M._path.slice();this._query=M._query;this._fragment="#";this._username=M._username;this._password=M._password;K="fragment"}else{var P=S[J+1];var R=S[J+2];if("file"!=this._scheme||!E.test(Y)||(P!=":"&&P!="|")||(z!=R&&"/"!=R&&"\\"!=R&&"?"!=R&&"#"!=R)){this._host=M._host;this._port=M._port;this._username=M._username;this._password=M._password;this._path=M._path.slice();this._path.pop()}K="relative path";continue}}}}break;case"relative slash":if("/"==Y||"\\"==Y){if("\\"==Y){L("\\ is an invalid code point.")}if("file"==this._scheme){K="file host"}else{K="authority ignore slashes"}}else{if("file"!=this._scheme){this._host=M._host;this._port=M._port;this._username=M._username;this._password=M._password}K="relative path";continue}break;case"authority first slash":if("/"==Y){K="authority second slash"}else{L("Expected '/', got: "+Y);K="authority ignore slashes";continue}break;case"authority second slash":K="authority ignore slashes";if("/"!=Y){L("Expected '/', got: "+Y);continue}break;case"authority ignore slashes":if("/"!=Y&&"\\"!=Y){K="authority";continue}else{L("Expected authority, got: "+Y)}break;case"authority":if("@"==Y){if(Z){L("@ already seen.");U+="%40"}Z=true;for(var V=0;V<U.length;V++){var O=U[V];if("\t"==O||"\n"==O||"\r"==O){L("Invalid whitespace in authority.");continue}if(":"==O&&null===this._password){this._password="";continue}var T=t(O);(null!==this._password)?this._password+=T:this._username+=T}U=""}else{if(z==Y||"/"==Y||"\\"==Y||"?"==Y||"#"==Y){J-=U.length;U="";K="host";continue}else{U+=Y}}break;case"file host":if(z==Y||"/"==Y||"\\"==Y||"?"==Y||"#"==Y){if(U.length==2&&E.test(U[0])&&(U[1]==":"||U[1]=="|")){K="relative path"}else{if(U.length==0){K="relative path start"}else{this._host=C.call(this,U);U="";K="relative path start"}}continue}else{if("\t"==Y||"\n"==Y||"\r"==Y){L("Invalid whitespace in file host.")}else{U+=Y}}break;case"host":case"hostname":if(":"==Y&&!N){this._host=C.call(this,U);U="";K="port";if("hostname"==u){break loop}}else{if(z==Y||"/"==Y||"\\"==Y||"?"==Y||"#"==Y){this._host=C.call(this,U);U="";K="relative path start";if(u){break loop}continue}else{if("\t"!=Y&&"\n"!=Y&&"\r"!=Y){if("["==Y){N=true}else{if("]"==Y){N=false}}U+=Y}else{L("Invalid code point in host/hostname: "+Y)}}}break;case"port":if(/[0-9]/.test(Y)){U+=Y}else{if(z==Y||"/"==Y||"\\"==Y||"?"==Y||"#"==Y||u){if(""!=U){var W=parseInt(U,10);if(W!=H[this._scheme]){this._port=W+""}U=""}if(u){break loop}K="relative path start";continue}else{if("\t"==Y||"\n"==Y||"\r"==Y){L("Invalid code point in port: "+Y)}else{F.call(this)}}}break;case"relative path start":if("\\"==Y){L("'\\' not allowed in path.")}K="relative path";if("/"!=Y&&"\\"!=Y){continue}break;case"relative path":if(z==Y||"/"==Y||"\\"==Y||(!u&&("?"==Y||"#"==Y))){if("\\"==Y){L("\\ not allowed in relative path.")}var X;if(X=s[U.toLowerCase()]){U=X}if(".."==U){this._path.pop();if("/"!=Y&&"\\"!=Y){this._path.push("")}}else{if("."==U&&"/"!=Y&&"\\"!=Y){this._path.push("")}else{if("."!=U){if("file"==this._scheme&&this._path.length==0&&U.length==2&&E.test(U[0])&&U[1]=="|"){U=U[0]+":"}this._path.push(U)}}}U="";if("?"==Y){this._query="?";K="query"}else{if("#"==Y){this._fragment="#";K="fragment"}}}else{if("\t"!=Y&&"\n"!=Y&&"\r"!=Y){U+=t(Y)}}break;case"query":if(!u&&"#"==Y){this._fragment="#";K="fragment"}else{if(z!=Y&&"\t"!=Y&&"\n"!=Y&&"\r"!=Y){this._query+=I(Y)}}break;case"fragment":if(z!=Y&&"\t"!=Y&&"\n"!=Y&&"\r"!=Y){this._fragment+=Y}break}J++}}function B(){this._scheme="";this._schemeData="";this._username="";this._password=null;this._host="";this._port="";this._path=[];this._query="";this._fragment="";this._isInvalid=false;this._isRelative=false}function r(J,K){if(K!==undefined&&!(K instanceof r)){K=new r(String(K))}J=String(J);this._url=J;B.call(this);var u=J.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");A.call(this,u,null,K)}r.prototype={toString:function(){return this.href},get href(){if(this._isInvalid){return this._url}var u="";if(""!=this._username||null!=this._password){u=this._username+(null!=this._password?":"+this._password:"")+"@"}return this.protocol+(this._isRelative?"//"+u+this.host:"")+this.pathname+this._query+this._fragment},set href(u){B.call(this);A.call(this,u)},get protocol(){return this._scheme+":"},set protocol(u){if(this._isInvalid){return}A.call(this,u+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(u){if(this._isInvalid||!this._isRelative){return}A.call(this,u,"host")},get hostname(){return this._host},set hostname(u){if(this._isInvalid||!this._isRelative){return}A.call(this,u,"hostname")},get port(){return this._port},set port(u){if(this._isInvalid||!this._isRelative){return}A.call(this,u,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(u){if(this._isInvalid||!this._isRelative){return}this._path=[];A.call(this,u,"relative path start")},get search(){return this._isInvalid||!this._query||"?"==this._query?"":this._query},set search(u){if(this._isInvalid||!this._isRelative){return}this._query="?";if("?"==u[0]){u=u.slice(1)}A.call(this,u,"query")},get hash(){return this._isInvalid||!this._fragment||"#"==this._fragment?"":this._fragment},set hash(u){if(this._isInvalid){return}this._fragment="#";if("#"==u[0]){u=u.slice(1)}A.call(this,u,"fragment")},get origin(){var u;if(this._isInvalid||!this._scheme){return""}switch(this._scheme){case"data":case"file":case"javascript":case"mailto":return"null"}u=this.host;if(!u){return""}return this._scheme+"://"+u}};var w=q.URL;if(w){r.createObjectURL=function(u){return w.createObjectURL.apply(w,arguments)};r.revokeObjectURL=function(u){w.revokeObjectURL(u)}}q.URL=r})(this);
/*! Native Promise Only
  v0.8.1 (c) Kyle Simpson
  MIT License: http://getify.mit-license.org
  https://github.com/getify/native-promise-only
*/
(function l(q,s,r){s[q]=s[q]||r();if(typeof module!="undefined"&&module.exports){module.exports=s[q]}else{if(typeof define=="function"&&define.amd){define(function t(){return s[q]})}}})("Promise",typeof global!="undefined"?global:this,function n(){var v,z,L,A=Object.prototype.toString,x=(typeof setImmediate!="undefined")?function x(M){return setImmediate(M)}:setTimeout;try{Object.defineProperty({},"x",{});v=function v(O,N,P,M){return Object.defineProperty(O,N,{value:P,writable:true,configurable:M!==false})}}catch(u){v=function v(N,M,O){N[M]=O;return N}}L=(function J(){var R,P,O;function N(T,S){this.fn=T;this.self=S;this.next=void 0}return{add:function Q(T,S){O=new N(T,S);if(P){P.next=O}else{R=O}P=O;O=void 0},drain:function M(){var S=R;R=P=z=void 0;while(S){S.fn.call(S.self);S=S.next}}}})();function H(N,M){L.add(N,M);if(!z){z=x(L.drain)}}function K(O){var N,M=typeof O;if(O!=null&&(M=="object"||M=="function")){N=O.then}return typeof N=="function"?N:false}function y(){for(var M=0;M<this.chain.length;M++){q(this,(this.state===1)?this.chain[M].success:this.chain[M].failure,this.chain[M])}this.chain.length=0}function q(N,M,P){var O,R;try{if(M===false){P.reject(N.msg)}else{if(M===true){O=N.msg}else{O=M.call(void 0,N.msg)}if(O===P.promise){P.reject(TypeError("Promise-chain cycle"))}else{if(R=K(O)){R.call(O,P.resolve,P.reject)}else{P.resolve(O)}}}}catch(Q){P.reject(Q)}}function D(P){var O,M=this;if(M.triggered){return}M.triggered=true;if(M.def){M=M.def}try{if(O=K(P)){H(function(){var R=new w(M);try{O.call(P,function T(){D.apply(R,arguments)},function Q(){t.apply(R,arguments)})}catch(S){t.call(R,S)}})}else{M.msg=P;M.state=1;if(M.chain.length>0){H(y,M)}}}catch(N){t.call(new w(M),N)}}function t(N){var M=this;if(M.triggered){return}M.triggered=true;if(M.def){M=M.def}M.msg=N;M.state=2;if(M.chain.length>0){H(y,M)}}function B(Q,N,P,O){for(var M=0;M<N.length;M++){(function R(S){Q.resolve(N[S]).then(function T(U){P(S,U)},O)})(M)}}function w(M){this.def=M;this.triggered=false}function E(M){this.promise=M;this.state=0;this.triggered=false;this.chain=[];this.msg=void 0}function s(S){if(typeof S!="function"){throw TypeError("Not a function")}if(this.__NPO__!==0){throw TypeError("Not a promise")}this.__NPO__=1;var Q=new E(this);this["then"]=function R(W,T){var V={success:typeof W=="function"?W:true,failure:typeof T=="function"?T:false};V.promise=new this.constructor(function U(Y,X){if(typeof Y!="function"||typeof X!="function"){throw TypeError("Not a function")}V.resolve=Y;V.reject=X});Q.chain.push(V);if(Q.state!==0){H(y,Q)}return V.promise};this["catch"]=function N(T){return this.then(void 0,T)};try{S.call(void 0,function P(T){D.call(Q,T)},function M(T){t.call(Q,T)})}catch(O){t.call(Q,O)}}var r=v({},"constructor",s,false);s.prototype=r;v(r,"__NPO__",0,false);v(s,"resolve",function G(N){var M=this;if(N&&typeof N=="object"&&N.__NPO__===1){return N}return new M(function O(Q,P){if(typeof Q!="function"||typeof P!="function"){throw TypeError("Not a function")}Q(N)})});v(s,"reject",function I(M){return new this(function N(P,O){if(typeof P!="function"||typeof O!="function"){throw TypeError("Not a function")}O(M)})});v(s,"all",function C(M){var N=this;if(A.call(M)!="[object Array]"){return N.reject(TypeError("Not an array"))}if(M.length===0){return N.resolve([])}return new N(function O(T,S){if(typeof T!="function"||typeof S!="function"){throw TypeError("Not a function")}var P=M.length,R=Array(P),Q=0;B(N,M,function U(V,W){R[V]=W;if(++Q===P){T(R)}},S)})});v(s,"race",function F(M){var N=this;if(A.call(M)!="[object Array]"){return N.reject(TypeError("Not an array"))}return new N(function O(Q,P){if(typeof Q!="function"||typeof P!="function"){throw TypeError("Not a function")}B(N,M,function R(S,T){Q(T)},P)})});return s});h.promisify=function(q){return function(){var r=Array.prototype.slice.call(arguments);var s=new Promise(function(u,t){r.push(u);r.push(t);q.apply(this,r)});return s}};h.promisify_module=function(u,t){function s(x){h.priv.call("logging.log",{message:"Error promisifying module '"+t+"' "+JSON.stringify(x),level:40})}var v=u[t];var r={};try{r=Object.keys(v).reduce(function(x,y){x[y]=v[y];return x},r)}catch(w){s(w)}try{var q=[];if("_syncmethods" in v){q=v._syncmethods}r=Object.keys(v).filter(function(x){return q.indexOf(x)===-1}).filter(function(x){return v.hasOwnProperty(x)}).filter(function(x){return x[0]!=="_"}).filter(function(x){return typeof v[x]==="function"}).reduce(function(x,y){x[y]=h.promisify(v[y]);return x},r)}catch(w){s(w)}return r};h.listeners={};h.eventQueue={};h.queueEvents=true;var c={};var g=[];var f=null;var k=false;var p=function(){if(g.length>0){if(!h.debug||window.catalystConnected){k=true;while(g.length>0){var q=g.shift();if(q[0]=="logging.log"){console.log(q[1].message)}h.priv.call.apply(h.priv,q)}k=false}else{f=setTimeout(p,500)}}};h.priv={call:function(x,w,v,r){if((!h.debug||window.catalystConnected||x==="internal.showDebugWarning")&&(g.length===0||k)){var q=m.tools.UUID();var t=true;if(x==="button.onClicked.addListener"||x==="message.toFocussed"){t=false}if(v||r){c[q]={success:v,error:r,onetime:t}}var s={callid:q,method:x,params:w};h.priv.send(s);if(window._forgeDebug){try{s.start=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiRequest(s)}catch(u){}}}else{g.push(arguments);if(!f){f=setTimeout(p,500)}}},send:function(){throw new Error("Forge error: missing bridge to privileged code")},lastResult:undefined,receive:function(q,r){if(r!==undefined&&r===h.priv.lastResult){return"success"}h.priv.lastResult=r;if(q.callid){if(typeof c[q.callid]===undefined){m.log("Nothing stored for call ID: "+q.callid)}var s=c[q.callid];if(s&&s[q.status]){s[q.status](q.content)}if(s&&s.onetime){delete c[q.callid]}if(window._forgeDebug){try{q.end=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiResponse(q)}catch(t){}}}else{if(q.event){if(h.listeners[q.event]){h.listeners[q.event].forEach(function(u){if(q.params){u(q.params)}else{u()}})}else{if(h.queueEvents){if(h.eventQueue[q.event]){h.eventQueue[q.event].push(q.params)}else{h.eventQueue[q.event]=[q.params]}}}if(h.listeners["*"]){h.listeners["*"].forEach(function(u){if(q.params){u(q.event,q.params)}else{u(q.event)}})}if(window._forgeDebug){try{q.start=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiEvent(q)}catch(t){}}}}return"success"}};setTimeout(function(){h.queueEvents=false;h.eventQueue={}},30000);h.addEventListener=function(q,r){if(h.listeners[q]){h.listeners[q].push(r)}else{h.listeners[q]=[r]}if(h.eventQueue[q]){h.eventQueue[q].forEach(function(s){r(s)});delete h.eventQueue[q]}};h.generateQueryString=function(r){if(!r){return""}if(!(r instanceof Object)){return new String(r).toString()}var s=[];var q=function(y,w){if(y===null){return}else{if(y instanceof Array){var u=0;for(var t in y){var v=(w?w:"")+"["+u+"]";u+=1;if(!y.hasOwnProperty(t)){continue}q(y[t],v)}}else{if(y instanceof Object){for(var t in y){if(!y.hasOwnProperty(t)){continue}var v=t;if(w){v=w+"["+t+"]"}q(y[t],v)}}else{s.push(encodeURIComponent(w)+"="+encodeURIComponent(y))}}}};q(r);return s.join("&").replace("%20","+")};h.generateMultipartString=function(r,t){if(typeof r==="string"){return""}var s="";for(var q in r){if(!r.hasOwnProperty(q)){continue}if(r[q]===null){continue}s+="--"+t+"\r\n";s+='Content-Disposition: form-data; name="'+q.replace('"','\\"')+'"\r\n\r\n';s+=r[q].toString()+"\r\n"}return s};h.generateURI=function(r,q){var s="";if(r.indexOf("?")!==-1){s+=r.split("?")[1]+"&";r=r.split("?")[0]}s+=this.generateQueryString(q)+"&";s=s.substring(0,s.length-1);return r+(s?"?"+s:"")};h.disabledModule=function(q,r){var s="The '"+r+"' module is disabled for this app, enable it in your app config and rebuild in order to use this function";m.logging.error(s);q&&q({message:s,type:"UNAVAILABLE",subtype:"DISABLED_MODULE"})};m.enableDebug=function(){h.debug=true;h.priv.call("internal.showDebugWarning",{},null,null);h.priv.call("internal.hideDebugWarning",{},null,null)};setTimeout(function(){if(window.forge&&window.forge.debug){alert("Warning!\n\n'forge.debug = true;' is no longer supported\n\nUse 'forge.enableDebug();' instead.")}},3000);m.is={mobile:function(){return false},desktop:function(){return false},android:function(){return false},ios:function(){return false},chrome:function(){return false},firefox:function(){return false},safari:function(){return false},ie:function(){return false},web:function(){return false},orientation:{portrait:function(){return false},landscape:function(){return false}},connection:{connected:function(){return true},wifi:function(){return true}}};m.is["mobile"]=function(){return true};m.is["android"]=function(){return true};m.is["orientation"]["portrait"]=function(){return h.currentOrientation=="portrait"};m.is["orientation"]["landscape"]=function(){return h.currentOrientation=="landscape"};m.is["connection"]["connected"]=function(){return h.currentConnectionState.connected};m.is["connection"]["wifi"]=function(){return h.currentConnectionState.wifi};var d=function(w,u,x){var s=[];stylize=function(z,y){return z};function q(y){return y instanceof RegExp||(typeof y==="object"&&Object.prototype.toString.call(y)==="[object RegExp]")}function r(y){return y instanceof Array||Array.isArray(y)||(y&&y!==Object.prototype&&r(y.__proto__))}function t(A){if(A instanceof Date){return true}if(typeof A!=="object"){return false}var y=Date.prototype&&Object.getOwnPropertyNames(Date.prototype);var z=A.__proto__&&Object.getOwnPropertyNames(A.__proto__);return JSON.stringify(z)===JSON.stringify(y)}function v(K,H){try{if(K&&typeof K.inspect==="function"&&!(K.constructor&&K.constructor.prototype===K)){return K.inspect(H)}switch(typeof K){case"undefined":return stylize("undefined","undefined");case"string":var y="'"+JSON.stringify(K).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return stylize(y,"string");case"number":return stylize(""+K,"number");case"boolean":return stylize(""+K,"boolean")}if(K===null){return stylize("null","null")}if(K instanceof Document){return(new XMLSerializer()).serializeToString(K)}var E=Object.keys(K);var L=u?Object.getOwnPropertyNames(K):E;if(typeof K==="function"&&L.length===0){var z=K.name?": "+K.name:"";return stylize("[Function"+z+"]","special")}if(q(K)&&L.length===0){return stylize(""+K,"regexp")}if(t(K)&&L.length===0){return stylize(K.toUTCString(),"date")}var A,I,F;if(r(K)){I="Array";F=["[","]"]}else{I="Object";F=["{","}"]}if(typeof K==="function"){var D=K.name?": "+K.name:"";A=" [Function"+D+"]"}else{A=""}if(q(K)){A=" "+K}if(t(K)){A=" "+K.toUTCString()}if(L.length===0){return F[0]+A+F[1]}if(H<0){if(q(K)){return stylize(""+K,"regexp")}else{return stylize("[Object]","special")}}s.push(K);var C=L.map(function(N){var M,O;if(K.__lookupGetter__){if(K.__lookupGetter__(N)){if(K.__lookupSetter__(N)){O=stylize("[Getter/Setter]","special")}else{O=stylize("[Getter]","special")}}else{if(K.__lookupSetter__(N)){O=stylize("[Setter]","special")}}}if(E.indexOf(N)<0){M="["+N+"]"}if(!O){if(s.indexOf(K[N])<0){if(H===null){O=v(K[N])}else{O=v(K[N],H-1)}if(O.indexOf("\n")>-1){if(r(K)){O=O.split("\n").map(function(P){return"  "+P}).join("\n").substr(2)}else{O="\n"+O.split("\n").map(function(P){return"   "+P}).join("\n")}}}else{O=stylize("[Circular]","special")}}if(typeof M==="undefined"){if(I==="Array"&&N.match(/^\d+$/)){return O}M=JSON.stringify(""+N);if(M.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){M=M.substr(1,M.length-2);M=stylize(M,"name")}else{M=M.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");M=stylize(M,"string")}}return M+": "+O});s.pop();var J=0;var B=C.reduce(function(M,N){J++;if(N.indexOf("\n")>=0){J++}return M+N.length+1},0);if(B>50){C=F[0]+(A===""?"":A+"\n ")+" "+C.join(",\n  ")+" "+F[1]}else{C=F[0]+A+" "+C.join(", ")+" "+F[1]}return C}catch(G){return"[No string representation]"}}return v(w,(typeof x==="undefined"?2:x))};var i=function(r,s){if("logging" in m.config){var q=m.config.logging.marker||"FORGE"}else{var q="FORGE"}r="["+q+"] "+(r.indexOf("\n")===-1?"":"\n")+r;h.priv.call("logging.log",{message:r,level:s});if(typeof console!=="undefined"){switch(s){case 10:if(console.debug!==undefined&&!(console.debug.toString&&console.debug.toString().match("alert"))){console.debug(r)}break;case 30:if(console.warn!==undefined&&!(console.warn.toString&&console.warn.toString().match("alert"))){console.warn(r)}break;case 40:case 50:if(console.error!==undefined&&!(console.error.toString&&console.error.toString().match("alert"))){console.error(r)}break;default:case 20:if(console.info!==undefined&&!(console.info.toString&&console.info.toString().match("alert"))){console.info(r)}break}}};var a=function(q,r){if(q in m.logging.LEVELS){return m.logging.LEVELS[q]}else{m.logging.__logMessage("Unknown configured logging level: "+q);return r}};var b=function(r){var u=function(v){if(v.message){return v.message}else{if(v.description){return v.description}else{return""+v}}};if(r){var t="\nError: "+u(r);try{if(r.lineNumber){t+=" on line number "+r.lineNumber}if(r.fileName){var q=r.fileName;t+=" in file "+q.substr(q.lastIndexOf("/")+1)}}catch(s){}if(r.stack){t+="\r\nStack trace:\r\n"+r.stack}return t}return""};m.logging={LEVELS:{ALL:0,DEBUG:10,INFO:20,WARNING:30,ERROR:40,CRITICAL:50},debug:function(r,q){m.logging.log(r,q,m.logging.LEVELS.DEBUG)},info:function(r,q){m.logging.log(r,q,m.logging.LEVELS.INFO)},warning:function(r,q){m.logging.log(r,q,m.logging.LEVELS.WARNING)},error:function(r,q){m.logging.log(r,q,m.logging.LEVELS.ERROR)},critical:function(r,q){m.logging.log(r,q,m.logging.LEVELS.CRITICAL)},log:function(r,q,u){if(typeof(u)==="undefined"){var u=m.logging.LEVELS.INFO}try{var s=a(m.config.core.general.logging.level,m.logging.LEVELS.ALL)}catch(t){var s=m.logging.LEVELS.ALL}if(u>=s){i(d(r,false,10)+b(q),u)}}};m.internal={ping:function(r,s,q){h.priv.call("internal.ping",{data:[r]},s,q)},call:h.priv.call,addEventListener:h.addEventListener,listeners:h.listeners,configForModule:function(q){return m.config.modules[m.module_mapping[q]].config},promisify_module:h.promisify_module};var j={};h.currentOrientation=j;h.currentConnectionState=j;h.addEventListener("internal.orientationChange",function(q){if(h.currentOrientation!=q.orientation){h.currentOrientation=q.orientation;h.priv.receive({event:"event.orientationChange"})}});h.addEventListener("internal.connectionStateChange",function(q){if(q.connected!=h.currentConnectionState.connected||q.wifi!=h.currentConnectionState.wifi){h.currentConnectionState=q;h.priv.receive({event:"event.connectionStateChange"})}});m.event={menuPressed:{addListener:function(r,q){h.addEventListener("event.menuPressed",r)}},backPressed:{addListener:function(r,q){h.addEventListener("event.backPressed",function(){r(function(){h.priv.call("event.backPressed_closeApplication",{})},function(){h.priv.call("event.backPressed_pauseApplication",{})})})},preventDefault:function(r,q){h.priv.call("event.backPressed_preventDefault",{},r,q)},restoreDefault:function(r,q){h.priv.call("event.backPressed_restoreDefault",{},r,q)}},messagePushed:{addListener:function(r,q){h.addEventListener("event.messagePushed",r)}},orientationChange:{addListener:function(r,q){h.addEventListener("event.orientationChange",r);if(typeof j!=="undefined"&&h.currentOrientation!==j){h.priv.receive({event:"event.orientationChange"})}}},connectionStateChange:{addListener:function(r,q){h.addEventListener("event.connectionStateChange",r)}},appPaused:{addListener:function(r,q){h.addEventListener("event.appPaused",r)}},appResumed:{addListener:function(r,q){h.addEventListener("event.appResumed",r)}},statusBarTapped:{addListener:function(r,q){h.addEventListener("event.statusBarTapped",r)}}};m.reload={updateAvailable:function(r,q){h.priv.call("reload.updateAvailable",{},r,q)},update:function(r,q){h.priv.call("reload.update",{},r,q)},pauseUpdate:function(r,q){h.priv.call("reload.pauseUpdate",{},r,q)},applyNow:function(r,q){m.logging.error("reload.applyNow has been disabled, please see docs.trigger.io for more information.");q({message:"reload.applyNow has been disabled, please see docs.trigger.io for more information.",type:"UNAVAILABLE"})},applyAndRestartApp:function(r,q){h.priv.call("reload.applyAndRestartApp",{},r,q)},switchStream:function(r,s,q){h.priv.call("reload.switchStream",{streamid:r},s,q)},updateReady:{addListener:function(r,q){h.addEventListener("reload.updateReady",r)}},updateProgress:{addListener:function(r,q){h.addEventListener("reload.updateProgress",r)}}};m.live={restartApp:function(r,q){h.priv.call("live.restartApp",{},r,q)}};var e=true;var o=function(){document.removeEventListener("DOMContentLoaded",o,false);if(typeof window.LiveReload!=="undefined"&&m.is.mobile()){var q=(function(){function r(t,s){this.window=t;this.host=s}r.prototype.reload=function(t,s){if(t.match(/\.css$/i)){return false}else{if(t.match(/\.(jpe?g|png|gif)$/i)){return false}}if(e){e=false;m.live.restartApp()}return true};r.identifier="forgelive";r.version="1.0";return r})();window.LiveReload.addPlugin(q)}};document.addEventListener("DOMContentLoaded",o,false);m.tools={UUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(t){var s=Math.random()*16|0;var q=t=="x"?s:(s&3|8);return q.toString(16)}).toUpperCase()},getURL:function(r,s,q){h.priv.call("tools.getURL",{name:r.toString()},s,q)}};h.priv.send=function(r){if(window.__forge["callJavaFromJavaScript"]===undefined){return}var q=((r.params!==undefined)?JSON.stringify(r.params):"");window.__forge["callJavaFromJavaScript"](r.callid,r.method,q)};h.priv.send({callid:"ready",method:""});m._receive=h.priv.receive;window.forge=m})();if(!("flags" in forge)){forge.flags={}}forge.flags.promises=function(a){if(a!==true||forge.flags._promises===true){return}forge.flags._promises=true;window.forge=(function(b){return Object.keys(b).filter(function(c){return c[0]!=="_"}).filter(function(c){return["config","enableDebug","event","flags","inspector","internal","is","logging","live","reload","tools"].indexOf(c)===-1}).reduce(function(c,d){b.logging.debug("Enabling promises for: "+d);c[d]=b.internal.promisify_module(b,d);return c},b)})(window.forge)};if("flags" in forge.config){forge.flags.promises(forge.config.flags.promises)};(function () {
//Class: forge.pushwoosh
//Class to interact with Pushwoosh Push Notifications plugin
//
//Example:
//(start code)
//                forge.internal.addEventListener("pushwoosh.pushReceived",
//                    function (notification) {
//                            alert('push received: ' + notification);
//                    }
//                );
//
//                forge.internal.addEventListener("pushwoosh.registrationSuccess",
//                    function (status) {
//                            log('registered with token: ' + status['deviceToken']);
//                    }
//                );
//
//                forge.internal.addEventListener("pushwoosh.registrationFail",
//                    function (error) {
//                            log('Failed to register: ' + error);
//                    }
//                );
//
//                forge.pushwoosh.onDeviceReady({"pw_appid":"XXXXX-XXXXX", "gcm_id":"XXXXXXXXXXXX"});
//                forge.pushwoosh.registerDevice();
//(end)
// Expose the native API to javascript
forge.pushwoosh = {

//Function: onDeviceReady
//Call this first thing with your Pushwoosh App ID (pw_appid parameter) and Google Project ID for Android (gcm_id parameter)
//
//Example:
//(start code)
//  //initialize Pushwoosh with projectid: "GOOGLE_PROJECT_ID", gcm_id : "PUSHWOOSH_APP_ID". This will also trigger all pending push notifications on start.
//  forge.pushwoosh.onDeviceReady({"pw_appid":"XXXXX-XXXXX", "gcm_id":"XXXXXXXXXXXX"});
//(end)
    onDeviceReady: function (params, success, error) {
        forge.internal.call('pushwoosh.onDeviceReady', params, success, error);
    },

//Function: registerDevice
//Call this to register for push notifications and retreive a push token via callbacks
//
//Example:
//(start code)
//  forge.pushwoosh.registerDevice();
//(end)
    registerDevice: function (success, error) {
        forge.internal.call('pushwoosh.registerDevice', {}, success, error);
    },

//Function: unregisterDevice
//Unregisters device from push notifications
//
//Example:
//(start code)
//  forge.pushwoosh.unregisterDevice();
//(end)
    unregisterDevice: function (success, error) {
        forge.internal.call('pushwoosh.unregisterDevice', {}, success, error);
    },

//Function: startLocationTracking
//Starts geolocation based push notifications. You need to configure Geozones in Pushwoosh Control panel.
//
//Example:
//(start code)
//  forge.pushwoosh.startLocationTracking();
//(end)
    startLocationTracking: function (success, error) {
        forge.internal.call('pushwoosh.startLocationTracking', {}, success, error);
    },

//Function: stopLocationTracking
//Stops geolocation based push notifications
    stopLocationTracking: function (success, error) {
        forge.internal.call('pushwoosh.stopLocationTracking', {}, success, error);
    },

//Function: setTags
//Call this to set tags for the device
//
//Example:
//sets the following tags: "deviceName" with value "hello" and "deviceId" with value 10
//(start code)
//  forge.pushwoosh.setTags({tags : {deviceName:"hello", deviceId:10}},
//      function(status) {
//          forge.logging.log('setTags success');
//      },
//      function(status) {
//          forge.logging.log('setTags failed');
//      }
//  );
//
//  //setings list tags "tag1" with values (array) "item1", "item2"
//  forge.pushwoosh.setTags({tags : {"tag1" : ["item1", "item2"]}},
//    function (status) {
//        forge.logging.log('set tags success');
//    },
//    function(status) {
//        forge.logging.log('setTags failed');
//    }
//  );
//(end)
    setTags: function (params, success, error) {
        forge.internal.call('pushwoosh.setTags', params, success, error);
    },

//Function: getTags
//Call this to get tags for the device
//
//Example:
//(start code)
//  forge.pushwoosh.getTags(
//    function (tags) {
//        log('tags loaded: ' + JSON.stringify(tags));
//    },
//    function(status) {
//        forge.logging.log('getTags failed');
//    }
//  );
//(end)
    getTags: function (success, error) {
        forge.internal.call('pushwoosh.getTags', {}, success, error);
    },

//Function: getPushToken
//Call this to get push token if it is available. Note the token also comes in "pushwoosh.registrationSuccess" function callback.
//
//Example:
//(start code)
//  forge.pushwoosh.getPushToken(
//    function (token) {
//        forge.logging.log('token : ' + token);
//  });
//(end)
    getPushToken: function (success, error) {
        forge.internal.call('pushwoosh.getPushToken', {}, success, error);
    },

//Function: getHWID
//Call this to get Pushwoosh HWID used for communications with Pushwoosh API
//
//Example:
//(start code)
//  forge.pushwoosh.getHWID(
//    function (hwid) {
//        forge.logging.log('HWID : ' + hwid);
//  });
//(end)
    getHWID: function (success, error) {
        forge.internal.call('pushwoosh.getHWID', {}, success, error);
    },

//Function: getRemoteNotificationStatus
//iOS only,
//Call this to get a detailed status of push notification permissions.
//
//Returns array with the following items:
//
//"enabled" - if push notificaions enabled.
//"pushBadge" -  badges permission granted.
//"pushAlert" -  alert permission granted.
//"pushSound" -  sound permission granted.
    getRemoteNotificationStatus: function (success, error) {
        forge.internal.call('pushwoosh.getRemoteNotificationStatus', {}, success, error);
    },

//Function: setApplicationIconBadgeNumber
//iOS only,
//Call this to set the application icon badge   
//
//Example:
//(start code)
//  forge.pushwoosh.setApplicationIconBadgeNumber({badge:10});
//(end)
    setApplicationIconBadgeNumber: function (params, success, error) {
        forge.internal.call('pushwoosh.setApplicationIconBadgeNumber', params, success, error);
    },

//Function: cancelAllLocalNotifications
//iOS only,
//Call this to clear all notifications from the notification center
    cancelAllLocalNotifications: function (success, error) {
        forge.internal.call('pushwoosh.cancelAllLocalNotifications', {}, success, error);
    },

//Function: setForegroundAlert
//Set to true to disable automatic push handing in foreground
//By default is set to true on iOS and false on Android
//
//Example:
//(start code)
//  forge.pushwoosh.setForegroundAlert({alert:true});
//(end)
    setForegroundAlert: function(params, success, error) {
        forge.internal.call('pushwoosh.setForegroundAlert', params, success, error);
    },

//Function: setUserId
//Set User indentifier. This could be Facebook ID, username or email, or any other user ID.
//This allows data and events to be matched across multiple user devices.
    setUserId: function(params, success, error) {
        forge.internal.call('pushwoosh.setUserId', params, success, error);
    },

//Function: postEvent
//Post events for In-App Messages. This can trigger In-App message display as specified in Pushwoosh Control Panel.
//
//Parameters:
// "event" - event to trigger
// "attributes" - object with additional event attributes
// 
// Example:
//(start code)
// forge.pushwoosh.postEvent({event:"buttonPressed", attributes:{ "buttonNumber" : 4, "buttonLabel" : "banner" }});
//(end)
    postEvent: function(params, success, error) {
        forge.internal.call('pushwoosh.postEvent', params, success, error);
    }
};


})();