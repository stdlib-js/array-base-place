"use strict";var b=function(r,a){return function(){return a||r((a={exports:{}}).exports,a),a.exports}};var q=b(function(D,m){"use strict";var h=require("@stdlib/array-base-assert-is-complex-floating-point-data-type"),g=require("@stdlib/array-base-assert-is-boolean-data-type"),f=require("@stdlib/array-base-arraylike2object"),y=require("@stdlib/strided-base-reinterpret-complex"),p=require("@stdlib/strided-base-reinterpret-boolean"),u=require("@stdlib/array-base-count-truthy");function w(r,a,o){var i,n,e;for(n=o.length,i=0,e=0;e<r.length;e++)a[e]&&(r[e]=o[i],i=(i+1)%n);return r}function N(r,a,o){var i,n,e,s,t,l,c,d,v;for(i=r.data,n=a.data,e=o.data,s=r.accessors[1],t=a.accessors[0],l=o.accessors[0],d=e.length,c=0,v=0;v<i.length;v++)t(n,v)&&(s(i,v,l(e,c)),c=(c+1)%d);return i}function E(r,a,o){var i,n,e,s,t;for(i=a.data,n=a.accessors[0],s=o.length,e=0,t=0;t<r.length;t+=2)n(i,t/2)&&(r[t]=o[e],r[t+1]=o[e+1],e=(e+2)%s);return r}function P(r,a,o){var i,n,e,s,t;for(i=a.data,n=a.accessors[0],s=o.length,e=0,t=0;t<r.length;t++)n(i,t)&&(r[t]=o[e],e=(t+1)%s);return r}function T(r,a,o,i){var n,e,s,t;if(t=o.length,i==="strict"){if(u(a)!==t)throw new Error("invalid arguments. Number of values does not equal the number of truthy values in the mask array.")}else if(i==="broadcast"){if(t!==1&&u(a)>t)throw new Error("invalid arguments. Insufficient values to satisfy mask array.")}else if(i==="strict_broadcast"){if(t!==1&&u(a)!==t)throw new Error("invalid arguments. Number of values does not equal the number of truthy values in the mask array.")}else if(i==="non_strict"&&u(a)>t)throw new Error("invalid arguments. Insufficient values to satisfy mask array.");return n=f(r),e=f(a),s=f(o),n.accessorProtocol||e.accessorProtocol||s.accessorProtocol?h(n.dtype)&&h(s.dtype)?(E(y(r,0),e,y(o,0)),r):g(n.dtype)&&g(s.dtype)?(P(p(r,0),e,p(o,0)),r):(N(n,e,s),r):(w(r,a,o),r)}m.exports=T});var B=q();module.exports=B;
/**
* @license Apache-2.0
*
* Copyright (c) 2024 The Stdlib Authors.
*
* Licensed under the Apache License, Version 2.0 (the "License");
* you may not use this file except in compliance with the License.
* You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software
* distributed under the License is distributed on an "AS IS" BASIS,
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
* See the License for the specific language governing permissions and
* limitations under the License.
*/
//# sourceMappingURL=index.js.map
