/*! Copyright 2011 Trigger Corp. All rights reserved. */
(function(){var n={flags:{}};var o={};n.config=window.forge.config;if(!Object.keys){Object.keys=(function(){var A=Object.prototype.hasOwnProperty,B=!({toString:null}).propertyIsEnumerable("toString"),z=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"],y=z.length;return function(E){if(typeof E!=="object"&&typeof E!=="function"||E===null){throw new TypeError("Object.keys called on non-object")}var C=[];for(var F in E){if(A.call(E,F)){C.push(F)}}if(B){for(var D=0;D<y;D++){if(A.call(E,z[D])){C.push(z[D])}}}return C}})()}
/*! https://mths.be/startswith v0.2.0 by @mathias */
;if(!String.prototype.startsWith){(function(){var y=(function(){var B;try{var E={};var D=Object.defineProperty;B=D(E,E,E)&&D}catch(C){}return B}());var A={}.toString;var z=function(I){if(this===null){throw new TypeError("String.startsWith called on non-String")}var F=String(this);if(I&&A.call(I)=="[object RegExp]"){throw new TypeError("String.startsWith called with non-String")}var B=F.length;var J=String(I);var D=J.length;var E=arguments.length>1?arguments[1]:undefined;var H=E?Number(E):0;if(H!=H){H=0}var C=Math.min(Math.max(H,0),B);if(D+C>B){return false}var G=-1;while(++G<D){if(F.charCodeAt(C+G)!=J.charCodeAt(G)){return false}}return true};if(y){y(String.prototype,"startsWith",{value:z,configurable:true,writable:true})}else{String.prototype.startsWith=z}}())}(function(y){var K=false;if(!y.forceJURL){try{var E=new URL("b","http://a");E.pathname="c%20d";K=E.href==="http://a/c%20d"}catch(N){}}if(K){return}var O=Object.create(null);O.ftp=21;O.file=0;O.gopher=70;O.http=80;O.https=443;O.ws=80;O.wss=443;var A=Object.create(null);A["%2e"]=".";A[".%2e"]="..";A["%2e."]="..";A["%2e%2e"]="..";function F(Q){return O[Q]!==undefined}function M(){I.call(this);this._isInvalid=true}function J(Q){if(""==Q){M.call(this)}return Q.toLowerCase()}function B(R){var Q=R.charCodeAt(0);if(Q>32&&Q<127&&[34,35,60,62,63,96].indexOf(Q)==-1){return R}return encodeURIComponent(R)}function P(R){var Q=R.charCodeAt(0);if(Q>32&&Q<127&&[34,35,60,62,96].indexOf(Q)==-1){return R}return encodeURIComponent(R)}var G=undefined,L=/[a-zA-Z]/,C=/[a-zA-Z0-9\+\-\.]/;function H(aa,Q,U){function T(ai){Y.push(ai)}var S=Q||"scheme start",R=0,ac="",ah=false,V=false,Y=[];loop:while((aa[R-1]!=G||R==0)&&!this._isInvalid){var ag=aa[R];switch(S){case"scheme start":if(ag&&L.test(ag)){ac+=ag.toLowerCase();S="scheme"}else{if(!Q){ac="";S="no scheme";continue}else{T("Invalid scheme.");break loop}}break;case"scheme":if(ag&&C.test(ag)){ac+=ag.toLowerCase()}else{if(":"==ag){this._scheme=ac;ac="";if(Q){break loop}if(F(this._scheme)){this._isRelative=true}if("file"==this._scheme){S="relative"}else{if(this._isRelative&&U&&U._scheme==this._scheme){S="relative or authority"}else{if(this._isRelative){S="authority first slash"}else{S="scheme data"}}}}else{if(!Q){ac="";R=0;S="no scheme";continue}else{if(G==ag){break loop}else{T("Code point not allowed in scheme: "+ag);break loop}}}}break;case"scheme data":if("?"==ag){query="?";S="query"}else{if("#"==ag){this._fragment="#";S="fragment"}else{if(G!=ag&&"\t"!=ag&&"\n"!=ag&&"\r"!=ag){this._schemeData+=B(ag)}}}break;case"no scheme":if(!U||!(F(U._scheme))){T("Missing scheme.");M.call(this)}else{S="relative";continue}break;case"relative or authority":if("/"==ag&&"/"==aa[R+1]){S="authority ignore slashes"}else{T("Expected /, got: "+ag);S="relative";continue}break;case"relative":this._isRelative=true;if("file"!=this._scheme){this._scheme=U._scheme}if(G==ag){this._host=U._host;this._port=U._port;this._path=U._path.slice();this._query=U._query;this._username=U._username;this._password=U._password;break loop}else{if("/"==ag||"\\"==ag){if("\\"==ag){T("\\ is an invalid code point.")}S="relative slash"}else{if("?"==ag){this._host=U._host;this._port=U._port;this._path=U._path.slice();this._query="?";this._username=U._username;this._password=U._password;S="query"}else{if("#"==ag){this._host=U._host;this._port=U._port;this._path=U._path.slice();this._query=U._query;this._fragment="#";this._username=U._username;this._password=U._password;S="fragment"}else{var X=aa[R+1];var Z=aa[R+2];if("file"!=this._scheme||!L.test(ag)||(X!=":"&&X!="|")||(G!=Z&&"/"!=Z&&"\\"!=Z&&"?"!=Z&&"#"!=Z)){this._host=U._host;this._port=U._port;this._username=U._username;this._password=U._password;this._path=U._path.slice();this._path.pop()}S="relative path";continue}}}}break;case"relative slash":if("/"==ag||"\\"==ag){if("\\"==ag){T("\\ is an invalid code point.")}if("file"==this._scheme){S="file host"}else{S="authority ignore slashes"}}else{if("file"!=this._scheme){this._host=U._host;this._port=U._port;this._username=U._username;this._password=U._password}S="relative path";continue}break;case"authority first slash":if("/"==ag){S="authority second slash"}else{T("Expected '/', got: "+ag);S="authority ignore slashes";continue}break;case"authority second slash":S="authority ignore slashes";if("/"!=ag){T("Expected '/', got: "+ag);continue}break;case"authority ignore slashes":if("/"!=ag&&"\\"!=ag){S="authority";continue}else{T("Expected authority, got: "+ag)}break;case"authority":if("@"==ag){if(ah){T("@ already seen.");ac+="%40"}ah=true;for(var ad=0;ad<ac.length;ad++){var W=ac[ad];if("\t"==W||"\n"==W||"\r"==W){T("Invalid whitespace in authority.");continue}if(":"==W&&null===this._password){this._password="";continue}var ab=B(W);(null!==this._password)?this._password+=ab:this._username+=ab}ac=""}else{if(G==ag||"/"==ag||"\\"==ag||"?"==ag||"#"==ag){R-=ac.length;ac="";S="host";continue}else{ac+=ag}}break;case"file host":if(G==ag||"/"==ag||"\\"==ag||"?"==ag||"#"==ag){if(ac.length==2&&L.test(ac[0])&&(ac[1]==":"||ac[1]=="|")){S="relative path"}else{if(ac.length==0){S="relative path start"}else{this._host=J.call(this,ac);ac="";S="relative path start"}}continue}else{if("\t"==ag||"\n"==ag||"\r"==ag){T("Invalid whitespace in file host.")}else{ac+=ag}}break;case"host":case"hostname":if(":"==ag&&!V){this._host=J.call(this,ac);ac="";S="port";if("hostname"==Q){break loop}}else{if(G==ag||"/"==ag||"\\"==ag||"?"==ag||"#"==ag){this._host=J.call(this,ac);ac="";S="relative path start";if(Q){break loop}continue}else{if("\t"!=ag&&"\n"!=ag&&"\r"!=ag){if("["==ag){V=true}else{if("]"==ag){V=false}}ac+=ag}else{T("Invalid code point in host/hostname: "+ag)}}}break;case"port":if(/[0-9]/.test(ag)){ac+=ag}else{if(G==ag||"/"==ag||"\\"==ag||"?"==ag||"#"==ag||Q){if(""!=ac){var ae=parseInt(ac,10);if(ae!=O[this._scheme]){this._port=ae+""}ac=""}if(Q){break loop}S="relative path start";continue}else{if("\t"==ag||"\n"==ag||"\r"==ag){T("Invalid code point in port: "+ag)}else{M.call(this)}}}break;case"relative path start":if("\\"==ag){T("'\\' not allowed in path.")}S="relative path";if("/"!=ag&&"\\"!=ag){continue}break;case"relative path":if(G==ag||"/"==ag||"\\"==ag||(!Q&&("?"==ag||"#"==ag))){if("\\"==ag){T("\\ not allowed in relative path.")}var af;if(af=A[ac.toLowerCase()]){ac=af}if(".."==ac){this._path.pop();if("/"!=ag&&"\\"!=ag){this._path.push("")}}else{if("."==ac&&"/"!=ag&&"\\"!=ag){this._path.push("")}else{if("."!=ac){if("file"==this._scheme&&this._path.length==0&&ac.length==2&&L.test(ac[0])&&ac[1]=="|"){ac=ac[0]+":"}this._path.push(ac)}}}ac="";if("?"==ag){this._query="?";S="query"}else{if("#"==ag){this._fragment="#";S="fragment"}}}else{if("\t"!=ag&&"\n"!=ag&&"\r"!=ag){ac+=B(ag)}}break;case"query":if(!Q&&"#"==ag){this._fragment="#";S="fragment"}else{if(G!=ag&&"\t"!=ag&&"\n"!=ag&&"\r"!=ag){this._query+=P(ag)}}break;case"fragment":if(G!=ag&&"\t"!=ag&&"\n"!=ag&&"\r"!=ag){this._fragment+=ag}break}R++}}function I(){this._scheme="";this._schemeData="";this._username="";this._password=null;this._host="";this._port="";this._path=[];this._query="";this._fragment="";this._isInvalid=false;this._isRelative=false}function z(R,S){if(S!==undefined&&!(S instanceof z)){S=new z(String(S))}R=String(R);this._url=R;I.call(this);var Q=R.replace(/^[ \t\r\n\f]+|[ \t\r\n\f]+$/g,"");H.call(this,Q,null,S)}z.prototype={toString:function(){return this.href},get href(){if(this._isInvalid){return this._url}var Q="";if(""!=this._username||null!=this._password){Q=this._username+(null!=this._password?":"+this._password:"")+"@"}return this.protocol+(this._isRelative?"//"+Q+this.host:"")+this.pathname+this._query+this._fragment},set href(Q){I.call(this);H.call(this,Q)},get protocol(){return this._scheme+":"},set protocol(Q){if(this._isInvalid){return}H.call(this,Q+":","scheme start")},get host(){return this._isInvalid?"":this._port?this._host+":"+this._port:this._host},set host(Q){if(this._isInvalid||!this._isRelative){return}H.call(this,Q,"host")},get hostname(){return this._host},set hostname(Q){if(this._isInvalid||!this._isRelative){return}H.call(this,Q,"hostname")},get port(){return this._port},set port(Q){if(this._isInvalid||!this._isRelative){return}H.call(this,Q,"port")},get pathname(){return this._isInvalid?"":this._isRelative?"/"+this._path.join("/"):this._schemeData},set pathname(Q){if(this._isInvalid||!this._isRelative){return}this._path=[];H.call(this,Q,"relative path start")},get search(){return this._isInvalid||!this._query||"?"==this._query?"":this._query},set search(Q){if(this._isInvalid||!this._isRelative){return}this._query="?";if("?"==Q[0]){Q=Q.slice(1)}H.call(this,Q,"query")},get hash(){return this._isInvalid||!this._fragment||"#"==this._fragment?"":this._fragment},set hash(Q){if(this._isInvalid){return}this._fragment="#";if("#"==Q[0]){Q=Q.slice(1)}H.call(this,Q,"fragment")},get origin(){var Q;if(this._isInvalid||!this._scheme){return""}switch(this._scheme){case"data":case"file":case"javascript":case"mailto":return"null"}Q=this.host;if(!Q){return""}return this._scheme+"://"+Q}};var D=y.URL;if(D){z.createObjectURL=function(Q){return D.createObjectURL.apply(D,arguments)};z.revokeObjectURL=function(Q){D.revokeObjectURL(Q)}}y.URL=z})(this);
/*! Native Promise Only
  v0.8.1 (c) Kyle Simpson
  MIT License: http://getify.mit-license.org
  https://github.com/getify/native-promise-only
*/
(function v(y,A,z){A[y]=A[y]||z();if(typeof module!="undefined"&&module.exports){module.exports=A[y]}else{if(typeof define=="function"&&define.amd){define(function B(){return A[y]})}}})("Promise",typeof global!="undefined"?global:this,function r(){var D,H,T,I=Object.prototype.toString,F=(typeof setImmediate!="undefined")?function F(U){return setImmediate(U)}:setTimeout;try{Object.defineProperty({},"x",{});D=function D(W,V,X,U){return Object.defineProperty(W,V,{value:X,writable:true,configurable:U!==false})}}catch(C){D=function D(V,U,W){V[U]=W;return V}}T=(function R(){var Z,X,W;function V(ab,aa){this.fn=ab;this.self=aa;this.next=void 0}return{add:function Y(ab,aa){W=new V(ab,aa);if(X){X.next=W}else{Z=W}X=W;W=void 0},drain:function U(){var aa=Z;Z=X=H=void 0;while(aa){aa.fn.call(aa.self);aa=aa.next}}}})();function P(V,U){T.add(V,U);if(!H){H=F(T.drain)}}function S(W){var V,U=typeof W;if(W!=null&&(U=="object"||U=="function")){V=W.then}return typeof V=="function"?V:false}function G(){for(var U=0;U<this.chain.length;U++){y(this,(this.state===1)?this.chain[U].success:this.chain[U].failure,this.chain[U])}this.chain.length=0}function y(V,U,X){var W,Z;try{if(U===false){X.reject(V.msg)}else{if(U===true){W=V.msg}else{W=U.call(void 0,V.msg)}if(W===X.promise){X.reject(TypeError("Promise-chain cycle"))}else{if(Z=S(W)){Z.call(W,X.resolve,X.reject)}else{X.resolve(W)}}}}catch(Y){X.reject(Y)}}function L(X){var W,U=this;if(U.triggered){return}U.triggered=true;if(U.def){U=U.def}try{if(W=S(X)){P(function(){var Z=new E(U);try{W.call(X,function ab(){L.apply(Z,arguments)},function Y(){B.apply(Z,arguments)})}catch(aa){B.call(Z,aa)}})}else{U.msg=X;U.state=1;if(U.chain.length>0){P(G,U)}}}catch(V){B.call(new E(U),V)}}function B(V){var U=this;if(U.triggered){return}U.triggered=true;if(U.def){U=U.def}U.msg=V;U.state=2;if(U.chain.length>0){P(G,U)}}function J(Y,V,X,W){for(var U=0;U<V.length;U++){(function Z(aa){Y.resolve(V[aa]).then(function ab(ac){X(aa,ac)},W)})(U)}}function E(U){this.def=U;this.triggered=false}function M(U){this.promise=U;this.state=0;this.triggered=false;this.chain=[];this.msg=void 0}function A(aa){if(typeof aa!="function"){throw TypeError("Not a function")}if(this.__NPO__!==0){throw TypeError("Not a promise")}this.__NPO__=1;var Y=new M(this);this["then"]=function Z(ae,ab){var ad={success:typeof ae=="function"?ae:true,failure:typeof ab=="function"?ab:false};ad.promise=new this.constructor(function ac(ag,af){if(typeof ag!="function"||typeof af!="function"){throw TypeError("Not a function")}ad.resolve=ag;ad.reject=af});Y.chain.push(ad);if(Y.state!==0){P(G,Y)}return ad.promise};this["catch"]=function V(ab){return this.then(void 0,ab)};try{aa.call(void 0,function X(ab){L.call(Y,ab)},function U(ab){B.call(Y,ab)})}catch(W){B.call(Y,W)}}var z=D({},"constructor",A,false);A.prototype=z;D(z,"__NPO__",0,false);D(A,"resolve",function O(V){var U=this;if(V&&typeof V=="object"&&V.__NPO__===1){return V}return new U(function W(Y,X){if(typeof Y!="function"||typeof X!="function"){throw TypeError("Not a function")}Y(V)})});D(A,"reject",function Q(U){return new this(function V(X,W){if(typeof X!="function"||typeof W!="function"){throw TypeError("Not a function")}W(U)})});D(A,"all",function K(U){var V=this;if(I.call(U)!="[object Array]"){return V.reject(TypeError("Not an array"))}if(U.length===0){return V.resolve([])}return new V(function W(ab,aa){if(typeof ab!="function"||typeof aa!="function"){throw TypeError("Not a function")}var X=U.length,Z=Array(X),Y=0;J(V,U,function ac(ad,ae){Z[ad]=ae;if(++Y===X){ab(Z)}},aa)})});D(A,"race",function N(U){var V=this;if(I.call(U)!="[object Array]"){return V.reject(TypeError("Not an array"))}return new V(function W(Y,X){if(typeof Y!="function"||typeof X!="function"){throw TypeError("Not a function")}J(V,U,function Z(aa,ab){Y(ab)},X)})});return A});o.promisify=function(y){return function(){var z=Array.prototype.slice.call(arguments);var A=new Promise(function(C,B){z.push(C);z.push(B);y.apply(this,z)});return A}};o.promisify_module=function(C,B){function A(F){o.priv.call("logging.log",{message:"Error promisifying module '"+B+"' "+JSON.stringify(F),level:40})}var D=C[B];var z={};try{z=Object.keys(D).reduce(function(F,G){F[G]=D[G];return F},z)}catch(E){A(E)}try{var y=[];if("_syncmethods" in D){y=D._syncmethods}z=Object.keys(D).filter(function(F){return y.indexOf(F)===-1}).filter(function(F){return D.hasOwnProperty(F)}).filter(function(F){return F[0]!=="_"}).filter(function(F){return typeof D[F]==="function"}).reduce(function(F,G){F[G]=o.promisify(D[G]);return F},z)}catch(E){A(E)}return z};o.listeners={};o.eventQueue={};o.queueEvents=true;var t={};var j=[];var h=null;var a=false;var x=function(){if(j.length>0){if(!o.debug||window.catalystConnected){a=true;while(j.length>0){var y=j.shift();if(y[0]=="logging.log"){console.log(y[1].message)}o.priv.call.apply(o.priv,y)}a=false}else{h=setTimeout(x,500)}}};o.priv={call:function(F,E,D,z){if((!o.debug||window.catalystConnected||F==="internal.showDebugWarning")&&(j.length===0||a)){var y=n.tools.UUID();var B=true;if(F==="button.onClicked.addListener"||F==="message.toFocussed"){B=false}if(D||z){t[y]={success:D,error:z,onetime:B}}var A={callid:y,method:F,params:E};o.priv.send(A);if(window._forgeDebug){try{A.start=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiRequest(A)}catch(C){}}}else{j.push(arguments);if(!h){h=setTimeout(x,500)}}},send:function(){throw new Error("Forge error: missing bridge to privileged code")},lastResult:undefined,receive:function(y,z){if(z!==undefined&&z===o.priv.lastResult){return"success"}o.priv.lastResult=z;if(y.callid){if(typeof t[y.callid]===undefined){n.log("Nothing stored for call ID: "+y.callid)}var A=t[y.callid];if(A&&A[y.status]){A[y.status](y.content)}if(A&&A.onetime){delete t[y.callid]}if(window._forgeDebug){try{y.end=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiResponse(y)}catch(B){}}}else{if(y.event){if(o.listeners[y.event]){o.listeners[y.event].forEach(function(C){if(y.params){C(y.params)}else{C()}})}else{if(o.queueEvents){if(o.eventQueue[y.event]){o.eventQueue[y.event].push(y.params)}else{o.eventQueue[y.event]=[y.params]}}}if(o.listeners["*"]){o.listeners["*"].forEach(function(C){if(y.params){C(y.event,y.params)}else{C(y.event)}})}if(window._forgeDebug){try{y.start=(new Date().getTime())/1000;window._forgeDebug.forge.APICall.apiEvent(y)}catch(B){}}}}return"success"}};setTimeout(function(){o.queueEvents=false;o.eventQueue={}},30000);o.addEventListener=function(y,z){if(o.listeners[y]){o.listeners[y].push(z)}else{o.listeners[y]=[z]}if(o.eventQueue[y]){o.eventQueue[y].forEach(function(A){z(A)});delete o.eventQueue[y]}};o.generateQueryString=function(z){if(!z){return""}if(!(z instanceof Object)){return new String(z).toString()}var A=[];var y=function(F,E){if(F===null){return}else{if(F instanceof Array){var C=0;for(var B in F){var D=(E?E:"")+"["+C+"]";C+=1;if(!F.hasOwnProperty(B)){continue}y(F[B],D)}}else{if(F instanceof Object){for(var B in F){if(!F.hasOwnProperty(B)){continue}var D=B;if(E){D=E+"["+B+"]"}y(F[B],D)}}else{A.push(encodeURIComponent(E)+"="+encodeURIComponent(F))}}}};y(z);return A.join("&").replace("%20","+")};o.generateMultipartString=function(z,B){if(typeof z==="string"){return""}var A="";for(var y in z){if(!z.hasOwnProperty(y)){continue}if(z[y]===null){continue}A+="--"+B+"\r\n";A+='Content-Disposition: form-data; name="'+y.replace('"','\\"')+'"\r\n\r\n';A+=z[y].toString()+"\r\n"}return A};o.generateURI=function(z,y){var A="";if(z.indexOf("?")!==-1){A+=z.split("?")[1]+"&";z=z.split("?")[0]}A+=this.generateQueryString(y)+"&";A=A.substring(0,A.length-1);return z+(A?"?"+A:"")};o.disabledModule=function(y,z){var A="The '"+z+"' module is disabled for this app, enable it in your app config and rebuild in order to use this function";n.logging.error(A);y&&y({message:A,type:"UNAVAILABLE",subtype:"DISABLED_MODULE"})};n.enableDebug=function(){o.debug=true;o.priv.call("internal.showDebugWarning",{},null,null);o.priv.call("internal.hideDebugWarning",{},null,null)};setTimeout(function(){if(window.forge&&window.forge.debug){alert("Warning!\n\n'forge.debug = true;' is no longer supported\n\nUse 'forge.enableDebug();' instead.")}},3000);n.is={mobile:function(){return false},desktop:function(){return false},android:function(){return false},ios:function(){return false},chrome:function(){return false},firefox:function(){return false},safari:function(){return false},ie:function(){return false},web:function(){return false},development:function(){if("config" in n&&"development" in n.config){return n.config.development}else{return false}},orientation:{portrait:function(){return false},landscape:function(){return false}},connection:{connected:function(){return true},wifi:function(){return true}}};n.is["mobile"]=function(){return true};n.is["ios"]=function(){return true};n.is["orientation"]["portrait"]=function(){return o.currentOrientation=="portrait"};n.is["orientation"]["landscape"]=function(){return o.currentOrientation=="landscape"};n.is["connection"]["connected"]=function(){return o.currentConnectionState.connected};n.is["connection"]["wifi"]=function(){return o.currentConnectionState.wifi};var k=function(E,C,F){var A=[];stylize=function(H,G){return H};function y(G){return G instanceof RegExp||(typeof G==="object"&&Object.prototype.toString.call(G)==="[object RegExp]")}function z(G){return G instanceof Array||Array.isArray(G)||(G&&G!==Object.prototype&&z(G.__proto__))}function B(I){if(I instanceof Date){return true}if(typeof I!=="object"){return false}var G=Date.prototype&&Object.getOwnPropertyNames(Date.prototype);var H=I.__proto__&&Object.getOwnPropertyNames(I.__proto__);return JSON.stringify(H)===JSON.stringify(G)}function D(S,P){try{if(S&&typeof S.inspect==="function"&&!(S.constructor&&S.constructor.prototype===S)){return S.inspect(P)}switch(typeof S){case"undefined":return stylize("undefined","undefined");case"string":var G="'"+JSON.stringify(S).replace(/^"|"$/g,"").replace(/'/g,"\\'").replace(/\\"/g,'"')+"'";return stylize(G,"string");case"number":return stylize(""+S,"number");case"boolean":return stylize(""+S,"boolean")}if(S===null){return stylize("null","null")}if(S instanceof Document){return(new XMLSerializer()).serializeToString(S)}var M=Object.keys(S);var T=C?Object.getOwnPropertyNames(S):M;if(typeof S==="function"&&T.length===0){var H=S.name?": "+S.name:"";return stylize("[Function"+H+"]","special")}if(y(S)&&T.length===0){return stylize(""+S,"regexp")}if(B(S)&&T.length===0){return stylize(S.toUTCString(),"date")}var I,Q,N;if(z(S)){Q="Array";N=["[","]"]}else{Q="Object";N=["{","}"]}if(typeof S==="function"){var L=S.name?": "+S.name:"";I=" [Function"+L+"]"}else{I=""}if(y(S)){I=" "+S}if(B(S)){I=" "+S.toUTCString()}if(T.length===0){return N[0]+I+N[1]}if(P<0){if(y(S)){return stylize(""+S,"regexp")}else{return stylize("[Object]","special")}}A.push(S);var K=T.map(function(V){var U,W;if(S.__lookupGetter__){if(S.__lookupGetter__(V)){if(S.__lookupSetter__(V)){W=stylize("[Getter/Setter]","special")}else{W=stylize("[Getter]","special")}}else{if(S.__lookupSetter__(V)){W=stylize("[Setter]","special")}}}if(M.indexOf(V)<0){U="["+V+"]"}if(!W){if(A.indexOf(S[V])<0){if(P===null){W=D(S[V])}else{W=D(S[V],P-1)}if(W.indexOf("\n")>-1){if(z(S)){W=W.split("\n").map(function(X){return"  "+X}).join("\n").substr(2)}else{W="\n"+W.split("\n").map(function(X){return"   "+X}).join("\n")}}}else{W=stylize("[Circular]","special")}}if(typeof U==="undefined"){if(Q==="Array"&&V.match(/^\d+$/)){return W}U=JSON.stringify(""+V);if(U.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)){U=U.substr(1,U.length-2);U=stylize(U,"name")}else{U=U.replace(/'/g,"\\'").replace(/\\"/g,'"').replace(/(^"|"$)/g,"'");U=stylize(U,"string")}}return U+": "+W});A.pop();var R=0;var J=K.reduce(function(U,V){R++;if(V.indexOf("\n")>=0){R++}return U+V.length+1},0);if(J>50){K=N[0]+(I===""?"":I+"\n ")+" "+K.join(",\n  ")+" "+N[1]}else{K=N[0]+I+" "+K.join(", ")+" "+N[1]}return K}catch(O){return"[No string representation]"}}return D(E,(typeof F==="undefined"?2:F))};var b=function(z,A){if("logging" in n.config){var y=n.config.logging.marker||"FORGE"}else{var y="FORGE"}z="["+y+"] "+(z.indexOf("\n")===-1?"":"\n")+z;o.priv.call("logging.log",{message:z,level:A});if(typeof console!=="undefined"){switch(A){case 10:if(console.debug!==undefined&&!(console.debug.toString&&console.debug.toString().match("alert"))){console.debug(z)}break;case 30:if(console.warn!==undefined&&!(console.warn.toString&&console.warn.toString().match("alert"))){console.warn(z)}break;case 40:case 50:if(console.error!==undefined&&!(console.error.toString&&console.error.toString().match("alert"))){console.error(z)}break;default:case 20:if(console.info!==undefined&&!(console.info.toString&&console.info.toString().match("alert"))){console.info(z)}break}}};var m=function(y,z){if(y in n.logging.LEVELS){return n.logging.LEVELS[y]}else{n.logging.__logMessage("Unknown configured logging level: "+y);return z}};var u=function(z){var C=function(D){if(D.message){return D.message}else{if(D.description){return D.description}else{return""+D}}};if(z){var B="\nError: "+C(z);try{if(z.lineNumber){B+=" on line number "+z.lineNumber}if(z.fileName){var y=z.fileName;B+=" in file "+y.substr(y.lastIndexOf("/")+1)}}catch(A){}if(z.stack){B+="\r\nStack trace:\r\n"+z.stack}return B}return""};n.logging={LEVELS:{ALL:0,DEBUG:10,INFO:20,WARNING:30,ERROR:40,CRITICAL:50},debug:function(z,y){n.logging.log(z,y,n.logging.LEVELS.DEBUG)},info:function(z,y){n.logging.log(z,y,n.logging.LEVELS.INFO)},warning:function(z,y){n.logging.log(z,y,n.logging.LEVELS.WARNING)},error:function(z,y){n.logging.log(z,y,n.logging.LEVELS.ERROR)},critical:function(z,y){n.logging.log(z,y,n.logging.LEVELS.CRITICAL)},log:function(z,y,C){if(typeof(C)==="undefined"){var C=n.logging.LEVELS.INFO}try{var A=m(n.config.core.general.logging.level,n.logging.LEVELS.ALL)}catch(B){var A=n.logging.LEVELS.ALL}if(C>=A){b(k(z,false,10)+u(y),C)}}};n.internal={ping:function(z,A,y){o.priv.call("internal.ping",{data:[z]},A,y)},call:o.priv.call,addEventListener:o.addEventListener,listeners:o.listeners,configForModule:function(y){return n.config.modules[n.module_mapping[y]].config},promisify_module:o.promisify_module};var w={};o.currentOrientation=w;o.currentConnectionState=w;o.addEventListener("internal.orientationChange",function(y){if(o.currentOrientation!=y.orientation){o.currentOrientation=y.orientation;o.priv.receive({event:"event.orientationChange"})}});o.addEventListener("internal.connectionStateChange",function(y){if(y.connected!=o.currentConnectionState.connected||y.wifi!=o.currentConnectionState.wifi){o.currentConnectionState=y;o.priv.receive({event:"event.connectionStateChange"})}});n.event={menuPressed:{addListener:function(z,y){o.addEventListener("event.menuPressed",z)}},backPressed:{addListener:function(z,y){o.addEventListener("event.backPressed",function(){z(function(){o.priv.call("event.backPressed_closeApplication",{})},function(){o.priv.call("event.backPressed_pauseApplication",{})})})},preventDefault:function(z,y){o.priv.call("event.backPressed_preventDefault",{},z,y)},restoreDefault:function(z,y){o.priv.call("event.backPressed_restoreDefault",{},z,y)}},messagePushed:{addListener:function(z,y){o.addEventListener("event.messagePushed",z)}},orientationChange:{addListener:function(z,y){o.addEventListener("event.orientationChange",z);if(typeof w!=="undefined"&&o.currentOrientation!==w){o.priv.receive({event:"event.orientationChange"})}}},connectionStateChange:{addListener:function(z,y){o.addEventListener("event.connectionStateChange",z)}},appPaused:{addListener:function(z,y){o.addEventListener("event.appPaused",z)}},appResumed:{addListener:function(z,y){o.addEventListener("event.appResumed",z)}},statusBarTapped:{addListener:function(z,y){o.addEventListener("event.statusBarTapped",z)}},keyboardWillShow:{addListener:function(z,y){o.addEventListener("event.keyboardWillShow",z)}},keyboardWillHide:{addListener:function(z,y){o.addEventListener("event.keyboardWillHide",z)}},keyboardDidShow:{addListener:function(z,y){o.addEventListener("event.keyboardDidShow",z)}},keyboardDidHide:{addListener:function(z,y){o.addEventListener("event.keyboardDidHide",z)}}};n.layout={getSafeAreaInsets:function(z,y){o.priv.call("layout.getSafeAreaInsets",{},z,y)},setContentInsetAdjustmentBehavior:function(z,A,y){o.priv.call("layout.setContentInsetAdjustmentBehavior",{behavior:z},A,y)}};n.reload={updateAvailable:function(z,y){o.priv.call("reload.updateAvailable",{},z,y)},update:function(z,y){o.priv.call("reload.update",{},z,y)},pauseUpdate:function(z,y){o.priv.call("reload.pauseUpdate",{},z,y)},applyNow:function(z,y){n.logging.error("reload.applyNow has been disabled, please see docs.trigger.io for more information.");y({message:"reload.applyNow has been disabled, please see docs.trigger.io for more information.",type:"UNAVAILABLE"})},applyAndRestartApp:function(z,y){o.priv.call("reload.applyAndRestartApp",{},z,y)},switchStream:function(z,A,y){o.priv.call("reload.switchStream",{streamid:z},A,y)},updateReady:{addListener:function(z,y){o.addEventListener("reload.updateReady",z)}},updateProgress:{addListener:function(z,y){o.addEventListener("reload.updateProgress",z)}}};n.live={restartApp:function(z,y){o.priv.call("live.restartApp",{},z,y)}};var s=true;var p=function(){document.removeEventListener("DOMContentLoaded",p,false);if(typeof window.LiveReload!=="undefined"&&n.is.mobile()){var y=(function(){function z(B,A){this.window=B;this.host=A}z.prototype.reload=function(B,A){if(B.match(/\.css$/i)){return false}else{if(B.match(/\.(jpe?g|png|gif)$/i)){return false}}if(s){s=false;n.live.restartApp()}return true};z.identifier="forgelive";z.version="1.0";return z})();window.LiveReload.addPlugin(y)}};document.addEventListener("DOMContentLoaded",p,false);n.tools={UUID:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(A){var z=Math.random()*16|0;var y=A=="x"?z:(z&3|8);return y.toString(16)}).toUpperCase()},getURL:function(z,A,y){o.priv.call("tools.getURL",{name:z.toString()},A,y)}};var q=[];var g=false;o.priv.get=function(){var y=JSON.stringify(q);q=[];return y};var f=[],l="zero-timeout-message";function d(y){f.push(y);window.postMessage(l,"*")}function c(y){setTimeout(y,0)}function e(y){if(y.source==window&&y.data==l){if(y.stopPropagation){y.stopPropagation()}if(f.length){f.shift()()}}}if(window.postMessage){if(window.addEventListener){window.addEventListener("message",e,true)}else{if(window.attachEvent){window.attachEvent("onmessage",e)}}window.setZeroTimeout=d}else{window.setZeroTimeout=c}var i=function(){if(g&&!window.forge._flushing){window.forge._flushing=true;window.forge._flushingInterval=setInterval(function(){window.location.href="forge://go"},100);window.location.href="forge://go"}};o.priv.send=function(y){if(window.webkit&&g){window.webkit.messageHandlers.forge.postMessage(y)}else{q.push(y);i()}};document.addEventListener("DOMContentLoaded",function(){g=true;n.internal.call("internal.ping",{data:"hello"})},false);n._get=o.priv.get;n._receive=function(){var y=arguments;o.priv.receive.apply(this,y);return"success"};window.forge=n})();if(!("flags" in forge)){forge.flags={}}forge.flags.promises=function(a){if(a!==true||forge.flags._promises===true){return}forge.flags._promises=true;window.forge=(function(b){return Object.keys(b).filter(function(c){return c[0]!=="_"}).filter(function(c){return["config","enableDebug","event","flags","inspector","internal","is","logging","live","reload","tools"].indexOf(c)===-1}).reduce(function(c,d){b.logging.debug("Enabling promises for: "+d);c[d]=b.internal.promisify_module(b,d);return c},b)})(window.forge)};if("flags" in forge.config){forge.flags.promises(forge.config.flags.promises)};(function () {
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