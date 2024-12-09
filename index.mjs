// Copyright (c) 2024 The Stdlib Authors. License is Apache-2.0: http://www.apache.org/licenses/LICENSE-2.0
/// <reference types="./index.d.ts" />
import t from"https://cdn.jsdelivr.net/gh/stdlib-js/array-base-assert-is-complex-floating-point-data-type@v0.2.1-esm/index.mjs";import e from"https://cdn.jsdelivr.net/gh/stdlib-js/array-base-assert-is-boolean-data-type@v0.0.1-esm/index.mjs";import s from"https://cdn.jsdelivr.net/gh/stdlib-js/array-base-arraylike2object@v0.2.1-esm/index.mjs";import r from"https://cdn.jsdelivr.net/gh/stdlib-js/strided-base-reinterpret-complex@v0.1.2-esm/index.mjs";import a from"https://cdn.jsdelivr.net/gh/stdlib-js/strided-base-reinterpret-boolean@v0.0.2-esm/index.mjs";import o from"https://cdn.jsdelivr.net/gh/stdlib-js/array-base-count-truthy@v0.2.0-esm/index.mjs";function n(n,i,d,l){var c,m,f,h;if(h=d.length,"strict"===l){if(o(i)!==h)throw new Error("invalid arguments. Number of values does not equal the number of truthy values in the mask array.")}else if("broadcast"===l){if(1!==h&&o(i)>h)throw new Error("invalid arguments. Insufficient values to satisfy mask array.")}else if("strict_broadcast"===l){if(1!==h&&o(i)!==h)throw new Error("invalid arguments. Number of values does not equal the number of truthy values in the mask array.")}else if("non_strict"===l&&o(i)>h)throw new Error("invalid arguments. Insufficient values to satisfy mask array.");return c=s(n),m=s(i),f=s(d),c.accessorProtocol||m.accessorProtocol||f.accessorProtocol?t(c.dtype)&&t(f.dtype)?(function(t,e,s){var r,a,o,n,i;for(r=e.data,a=e.accessors[0],n=s.length,o=0,i=0;i<t.length;i+=2)a(r,i/2)&&(t[i]=s[o],t[i+1]=s[o+1],o=(o+2)%n)}(r(n,0),m,r(d,0)),n):e(c.dtype)&&e(f.dtype)?(function(t,e,s){var r,a,o,n,i;for(r=e.data,a=e.accessors[0],n=s.length,o=0,i=0;i<t.length;i++)a(r,i)&&(t[i]=s[o],o=(i+1)%n)}(a(n,0),m,a(d,0)),n):(function(t,e,s){var r,a,o,n,i,d,l,c,m;for(r=t.data,a=e.data,o=s.data,n=t.accessors[1],i=e.accessors[0],d=s.accessors[0],c=o.length,l=0,m=0;m<r.length;m++)i(a,m)&&(n(r,m,d(o,l)),l=(l+1)%c)}(c,m,f),n):(function(t,e,s){var r,a,o;for(a=s.length,r=0,o=0;o<t.length;o++)e[o]&&(t[o]=s[r],r=(r+1)%a)}(n,i,d),n)}export{n as default};
//# sourceMappingURL=index.mjs.map
