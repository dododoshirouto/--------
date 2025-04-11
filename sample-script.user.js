// ==UserScript==
// @name         sample-script
// @namespace    http://tampermonkey.net/
// @version      <$DATE$>.01
// @description  ...
// @author       @super_amateur_c どどど素人
// @match        <$URL$>
// @icon         <$ICON$>
// @grant        none
// @run-at       document-end
// @noframes
// @updateURL    https://test.dodoneko.site/tempermonkey/sample-script.user.js
// @downloadURL  https://test.dodoneko.site/tempermonkey/sample-script.user.js
// @supportURL   https://www.twitter.com/super_amateur_c
// ==/UserScript==

const SCRIPT_ID = "sample-script".replace(/[\s\-]+/g, "_");

/** @type {TrustedTypesPolicy} */
const myPolicy = trustedTypes
    ? trustedTypes.createPolicy("my-policy", {
          createHTML: (unsafeValue) => {
              return unsafeValue;
          },
      })
    : {
          createHTML: function (html) {
              return html;
          },
      };

function init() {
    createStyleElement();
}

function createStyleElement() {
    createElement('style', {
        id: 'style',
        html: `

        `,
    });
}


function createButton(name, parentQuery, onclick) {
    let id = SCRIPT_ID+name.replace(/\s+/g, '-');
    let parent = document.querySelector(parentQuery);
    console.log(name, parent, onclick);
    if (document.querySelector(id) || !parent) {
        setTimeout(_=>{createButton(name, parentQuery, onclick)}, 1);
        return;
    }
    let b = createElement('button', {
        html: name,
        id: id,
        class: 'gradio-button lg secondary svelte-cmf5ev tool'.split(' '),
    }, parent);
    b.addEventListener('click', onclick);
}

function copy(s) {
    try {
        let e = document;
        let t = e.createElement('textarea');
        t.value = s;
        e.body.appendChild(t);
        t.select();
        e.execCommand('copy');
        t.remove();
    } catch(e) {
        console.error('copy error.', e);
        return false;
    }
    return true;
}

function createElement(tag, options={id:'', class:[], style:{}, html:""}, parent=document.head) {
    let e = document.createElement(tag);
    for (let op in options) {
        let v = options[op];
        switch (op) {
            case 'id':
                e.id = `${v}-${SCRIPT_ID}`;
                break;
            case 'class':
                e.classList.add(...v);
                break;
            case 'style':
                for (let k in v) {
                    e.style[k] = v[k];
                }
                break;
            case 'html':
                e.innerHTML = myPolicy.createHTML(v);
                break;
            default:
                e[op] = v;
                break;
        }
    }
    parent.appendChild(e);
    return e;
}

init();