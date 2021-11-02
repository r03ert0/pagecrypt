#!/usr/bin/env node

// src/cli.ts
import sade from "sade";

// src/index.ts
import { mkdir, readFile, writeFile } from "fs/promises";
import { resolve, dirname } from "path";

// src/core.ts
import { base64 } from "rfc4648";

// src/crypto.ts
async function loadCrypto() {
  if (typeof window !== "undefined" && window.crypto || globalThis && globalThis.crypto) {
    const crypto2 = window.crypto || globalThis.crypto;
    return new Promise((resolve2) => resolve2(crypto2));
  } else {
    const nodeCrypto = await import("crypto");
    return nodeCrypto.webcrypto;
  }
}
var crypto = await loadCrypto();
var crypto_default = crypto;

// src/decrypt-template.html
var decrypt_template_default = `<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="robots" content="noindex, nofollow">
    <title>Protected Page</title>
  <script type="module">
//assets/index.994e488c.js
const T=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))i(r);new MutationObserver(r=>{for(const a of r)if(a.type==="childList")for(const o of a.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&i(o)}).observe(document,{childList:!0,subtree:!0});function s(r){const a={};return r.integrity&&(a.integrity=r.integrity),r.referrerpolicy&&(a.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?a.credentials="include":r.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function i(r){if(r.ep)return;r.ep=!0;const a=s(r);fetch(r.href,a)}};T();function k(t,e,s){var i;if(s===void 0&&(s={}),!e.codes){e.codes={};for(var r=0;r<e.chars.length;++r)e.codes[e.chars[r]]=r}if(!s.loose&&t.length*e.bits&7)throw new SyntaxError("Invalid padding");for(var a=t.length;t[a-1]==="=";)if(--a,!s.loose&&!((t.length-a)*e.bits&7))throw new SyntaxError("Invalid padding");for(var o=new((i=s.out)!=null?i:Uint8Array)(a*e.bits/8|0),n=0,l=0,f=0,d=0;d<a;++d){var b=e.codes[t[d]];if(b===void 0)throw new SyntaxError("Invalid character "+t[d]);l=l<<e.bits|b,n+=e.bits,n>=8&&(n-=8,o[f++]=255&l>>n)}if(n>=e.bits||255&l<<8-n)throw new SyntaxError("Unexpected end of data");return o}function F(t,e,s){s===void 0&&(s={});for(var i=s,r=i.pad,a=r===void 0?!0:r,o=(1<<e.bits)-1,n="",l=0,f=0,d=0;d<t.length;++d)for(f=f<<8|255&t[d],l+=8;l>e.bits;)l-=e.bits,n+=e.chars[o&f>>l];if(l&&(n+=e.chars[o&f<<e.bits-l]),a)for(;n.length*e.bits&7;)n+="=";return n}var x={chars:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",bits:6},I={parse:function(e,s){return k(e,x,s)},stringify:function(e,s){return F(e,x,s)}};const S=document.querySelector.bind(document),[c,u,N,p,h]=["input","header","#msg","form","#load"].map(S);let E,L,g;const O=async()=>{const t=S("pre").innerText;if(!t){c.disabled=!0,m("No encrypted payload.");return}const e=I.parse(t);E=e.slice(0,32),L=e.slice(32,32+16),g=e.slice(32+16),localStorage.passphrase&&(console.log("PASSPHRASE FOUN"),c.value=localStorage.passphrase),c.value?await A():(v(h),w(p),u.classList.replace("hidden","flex"),c.focus())};var K,P;const y=((K=window.crypto)==null?void 0:K.subtle)||((P=window.crypto)==null?void 0:P.webkitSubtle);y||(m("Please use a modern browser."),c.disabled=!0);function w(t){t.classList.remove("hidden")}function v(t){t.classList.add("hidden")}function m(t){N.innerText=t,u.classList.add("text-red-600")}p.addEventListener("submit",async t=>{t.preventDefault(),await A()});async function D(t){return new Promise(e=>setTimeout(e,t))}async function A(){localStorage.passphrase=c.value,h.lastElementChild.innerText="Loading...",v(u),v(p),w(h),await D(60);try{const t=await U({salt:E,iv:L,ciphertext:g},c.value);document.write(t),document.close()}catch(t){v(h),w(p),u.classList.replace("hidden","flex"),sessionStorage.k?sessionStorage.removeItem("k"):m("Wrong password."),c.value="",c.focus()}}async function M(t,e){const s=new TextEncoder,i=await y.importKey("raw",s.encode(e),"PBKDF2",!1,["deriveKey"]);return await y.deriveKey({name:"PBKDF2",salt:t,iterations:2e6,hash:"SHA-256"},i,{name:"AES-GCM",length:256},!0,["decrypt"])}async function U({salt:t,iv:e,ciphertext:s},i){const r=new TextDecoder,a=await M(t,i),o=new Uint8Array(await y.decrypt({name:"AES-GCM",iv:e},a,s));if(!o)throw"Malformed data";return r.decode(o)}O();<\/script>
  <style>*,:before,:after{box-sizing:border-box}html{-moz-tab-size:4;-o-tab-size:4;tab-size:4}html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}body{font-family:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"}hr{height:0;color:inherit}abbr[title]{-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp,pre{font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",Menlo,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}table{text-indent:0;border-color:inherit}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,select{text-transform:none}button,[type=button],[type=reset],[type=submit]{-webkit-appearance:button}::-moz-focus-inner{border-style:none;padding:0}:-moz-focusring{outline:1px dotted ButtonText}:-moz-ui-invalid{box-shadow:none}legend{padding:0}progress{vertical-align:baseline}::-webkit-inner-spin-button,::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}summary{display:list-item}blockquote,dl,dd,h1,h2,h3,h4,h5,h6,hr,figure,p,pre{margin:0}button{background-color:transparent;background-image:none}fieldset{margin:0;padding:0}ol,ul{list-style:none;margin:0;padding:0}html{font-family:ui-sans-serif,system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji";line-height:1.5}body{font-family:inherit;line-height:inherit}*,:before,:after{box-sizing:border-box;border-width:0;border-style:solid;border-color:currentColor}hr{border-top-width:1px}img{border-style:solid}textarea{resize:vertical}input::-moz-placeholder,textarea::-moz-placeholder{opacity:1;color:#a8a29e}input:-ms-input-placeholder,textarea:-ms-input-placeholder{opacity:1;color:#a8a29e}input::placeholder,textarea::placeholder{opacity:1;color:#a8a29e}button,[role=button]{cursor:pointer}:-moz-focusring{outline:auto}table{border-collapse:collapse}h1,h2,h3,h4,h5,h6{font-size:inherit;font-weight:inherit}a{color:inherit;text-decoration:inherit}button,input,optgroup,select,textarea{padding:0;line-height:inherit;color:inherit}pre,code,kbd,samp{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,"Liberation Mono","Courier New",monospace}img,svg,video,canvas,audio,iframe,embed,object{display:block;vertical-align:middle}img,video{max-width:100%;height:auto}[hidden]{display:none}*,:before,:after{--tw-border-opacity: 1;border-color:rgba(231,229,228,var(--tw-border-opacity))}.fixed{position:fixed}.bottom-0{bottom:0px}.right-0{right:0px}.mx-auto{margin-left:auto;margin-right:auto}.mr-4{margin-right:1rem}.mb-4{margin-bottom:1rem}.mt-4{margin-top:1rem}.flex{display:flex}.table{display:table}.hidden{display:none}.h-screen{height:100vh}.h-\\[10\\.625rem\\]{height:10.625rem}.h-full{height:100%}.h-6{height:1.5rem}.w-full{width:100%}.w-6{width:1.5rem}.max-w-sm{max-width:24rem}.cursor-pointer{cursor:pointer}.items-start{align-items:flex-start}.items-center{align-items:center}.justify-center{justify-content:center}.gap-2{gap:.5rem}.rounded-sm{border-radius:.125rem}.border{border-width:1px}.border-gray-700{--tw-border-opacity: 1;border-color:rgba(68,64,60,var(--tw-border-opacity))}.bg-black{--tw-bg-opacity: 1;background-color:rgba(0,0,0,var(--tw-bg-opacity))}.bg-gray-800{--tw-bg-opacity: 1;background-color:rgba(41,37,36,var(--tw-bg-opacity))}.bg-white{--tw-bg-opacity: 1;background-color:rgba(255,255,255,var(--tw-bg-opacity))}.p-4{padding:1rem}.py-2{padding-top:.5rem;padding-bottom:.5rem}.px-4{padding-left:1rem;padding-right:1rem}.pt-16{padding-top:4rem}.text-lg{font-size:1.125rem;line-height:1.75rem}.text-sm{font-size:.875rem;line-height:1.25rem}.font-light{font-weight:300}.font-extralight{font-weight:200}.font-semibold{font-weight:600}.tracking-wide{letter-spacing:.025em}.tracking-wider{letter-spacing:.05em}.text-white{--tw-text-opacity: 1;color:rgba(255,255,255,var(--tw-text-opacity))}.text-black{--tw-text-opacity: 1;color:rgba(0,0,0,var(--tw-text-opacity))}.text-red-600{--tw-text-opacity: 1;color:rgba(220,38,38,var(--tw-text-opacity))}.loading{pointer-events:none;width:2em;height:2em;border:.15em solid transparent;border-color:#fff;border-right-width:.1em;border-radius:50%;-webkit-animation:spin .5s linear infinite;animation:spin .5s linear infinite}@-webkit-keyframes spin{to{transform:rotate(360deg)}}@keyframes spin{to{transform:rotate(360deg)}}.focus\\:outline-none:focus{outline:2px solid transparent;outline-offset:2px}@media (min-width: 475px){.xs\\:pt-40{padding-top:10rem}.xs\\:text-base{font-size:1rem;line-height:1.5rem}}</style>
</head>
<body>
    <main class="bg-black w-full h-screen items-start tracking-wide p-4 pt-16 xs:pt-40 font-light text-white">
        <div class="max-w-sm w-full bg-gray-800 p-4 rounded-sm mx-auto h-[10.625rem]">
            <div id="load" class="flex items-center justify-center h-full">
                <p class="loading w-6 h-6 mr-4"></p><p class="text-lg">Loading...</p>
            </div>
            <header class="hidden gap-2 mb-4 items-center">
                <svg id="locked" class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd"></path>
                </svg>
                <p id="msg" class="text-sm xs:text-base">This page is password protected.</p>
            </header>
            <form class="hidden">
                <input type="password" id="pwd" name="pwd" aria-label="Password" autofocus class="font-extralight flex w-full py-2 px-4 tracking-wider rounded-sm focus:outline-none border border-gray-700 bg-gray-800" />
                <input type="submit" value="Submit" class="text-black w-full py-2 mt-4 cursor-pointer bg-white rounded-sm">
            </form>
        </div>
        <a href="https://github.com/Greenheart/pagecrypt" class="fixed bottom-0 right-0 p-4 text-sm xs:text-base">Created with <span class="font-semibold">PageCrypt</span></a>
    </main>
    <!--ENCRYPTED PAYLOAD-->
</body>
</html>`;

// src/core.ts
async function getEncryptedPayload(content, password) {
  const encoder = new TextEncoder();
  const salt = crypto_default.getRandomValues(new Uint8Array(32));
  const baseKey = await crypto_default.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveKey"]);
  const key = await crypto_default.subtle.deriveKey({ name: "PBKDF2", salt, iterations: 2e6, hash: "SHA-256" }, baseKey, { name: "AES-GCM", length: 256 }, false, ["encrypt"]);
  const iv = crypto_default.getRandomValues(new Uint8Array(16));
  const ciphertext = new Uint8Array(await crypto_default.subtle.encrypt({ name: "AES-GCM", iv }, key, encoder.encode(content)));
  const totalLength = salt.length + iv.length + ciphertext.length;
  const mergedData = new Uint8Array(totalLength);
  mergedData.set(salt);
  mergedData.set(iv, salt.length);
  mergedData.set(ciphertext, salt.length + iv.length);
  return base64.stringify(mergedData);
}
async function encryptHTML(inputHTML, password) {
  return decrypt_template_default.replace(/<!--ENCRYPTED PAYLOAD-->/, `<pre class="hidden">${await getEncryptedPayload(inputHTML, password)}</pre>`);
}
function generatePassword(length = 80, characters = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz") {
  return Array.from({ length }, (_) => getRandomCharacter(characters)).join("");
}
function getRandomCharacter(characters) {
  let randomNumber;
  do {
    randomNumber = crypto_default.getRandomValues(new Uint8Array(1))[0];
  } while (randomNumber >= 256 - 256 % characters.length);
  return characters[randomNumber % characters.length];
}

// src/index.ts
async function encryptFile(inputFile, password) {
  let content;
  try {
    content = await readFile(resolve(process.cwd(), inputFile), {
      encoding: "utf-8"
    });
  } catch (e) {
    console.error("\u274C Error reading file: ", e);
    process.exit(1);
  }
  return await encryptHTML(content, password);
}
async function saveFile(outputFile, content) {
  await mkdir(dirname(outputFile), { recursive: true });
  return writeFile(resolve(process.cwd(), outputFile), content, {
    encoding: "utf8"
  });
}
async function encrypt(inputFile, outputFile, password) {
  const encrypted = await encryptFile(inputFile, password);
  return await saveFile(outputFile, encrypted);
}

// package.json
var name = "pagecrypt";
var version = "5.3.0";

// src/cli.ts
sade(`${name} <src> <dest> [password]`, true).version(version).describe("Encrypt the <src> HTML file with [password] and save the result in the <dest> HTML file.").example("index.html encrypted.html password").example("index.html encrypted.html --generate-password 64").example("index.html encrypted.html -g 64").option("-g, --generate-password", "Generate a random password with given length. Must be a number if used.").action(async (src, dest, password, options) => {
  const length = options["generate-password"];
  if (length) {
    if (Number.isInteger(length)) {
      const pass = generatePassword(length);
      console.log(`\u{1F510} Encrypting ${src} \u2192 ${dest} with \u{1F511}: ${pass}`);
      await encrypt(src, dest, pass);
    } else {
      console.error("\u274C: The <length> must be an integer when using --generate-password <length>");
      process.exit(1);
    }
  } else if (password) {
    console.log(`\u{1F510} Encrypting ${src} \u2192 ${dest} with \u{1F511}: ${password}`);
    await encrypt(src, dest, password);
  } else {
    console.error("\u274C: Either provide a password or use --generate-password <length>");
    process.exit(1);
  }
}).parse(process.argv);
