!function(e) {
    var t = {};
    function n(r) {
        if (t[r]) return t[r].exports;
        var o = t[r] = {
            i: r,
            l: !1,
            exports: {}
        };
        return e[r].call(o.exports, o, o.exports, n), o.l = !0, o.exports;
    }
    n.m = e, n.c = t, n.d = function(e, t, r) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, n.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, n.t = function(e, t) {
        if (1 & t && (e = n(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (n.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) n.d(r, o, function(t) {
            return e[t];
        }.bind(null, o));
        return r;
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 13);
}([ function(e, t, n) {
    "use strict";
    var r = class {
        constructor(e) {
            this.mono = e, this.onChanged = {
                addListener: e => {
                    chrome.storage.onChanged.addListener(e);
                },
                hasListener: e => chrome.storage.onChanged.hasListener(e),
                hasListeners: () => chrome.storage.onChanged.hasListeners(),
                removeListener: e => {
                    chrome.storage.onChanged.removeListener(e);
                }
            };
        }
        callback(e, t, n) {
            this.mono.lastError = chrome.runtime.lastError, (n || e) && e(t), this.mono.clearLastError();
        }
        get(e, t) {
            chrome.storage.local.get(e, e => this.callback(t, e, !0));
        }
        set(e, t) {
            chrome.storage.local.set(e, () => this.callback(t));
        }
        remove(e, t) {
            chrome.storage.local.remove(e, () => this.callback(t));
        }
        clear(e) {
            chrome.storage.local.clear(() => this.callback(e));
        }
    };
    var o = e => class extends e {
        initI18n() {
            this.i18n = {
                getMessage: chrome.i18n.getMessage.bind(chrome.i18n)
            };
        }
        initMessages() {
            this.transport = {
                sendMessage: (e, t) => {
                    t ? chrome.runtime.sendMessage(e, e => {
                        this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
                    }) : chrome.runtime.sendMessage(e);
                },
                sendMessageToActiveTab: (e, t) => {
                    chrome.tabs.query({
                        active: !0,
                        currentWindow: !0
                    }, n => {
                        const r = n[0];
                        r && r.id >= 0 ? t ? chrome.tabs.sendMessage(r.id, e, e => {
                            this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
                        }) : chrome.tabs.sendMessage(r.id, e) : (this.lastError = new Error("Active tab is not found"), 
                        t && t(), this.clearLastError());
                    });
                },
                addListener: e => {
                    chrome.runtime.onMessage.addListener(e);
                },
                hasListener: e => chrome.runtime.onMessage.hasListener(e),
                hasListeners: () => chrome.runtime.onMessage.hasListeners(),
                removeListener: e => {
                    chrome.runtime.onMessage.removeListener(e);
                },
                onBeforeRequest: (e, t, n) => {
                    chrome.webRequest.onBeforeRequest.addListener(e, t, n);
                },
                removeOnBeforeRequestListener: e => {
                    chrome.webRequest.onBeforeRequest.removeListener(e);
                }
            }, super.initMessages();
        }
        initStorage() {
            this.storage = new r(this);
        }
    };
    var i = class {
        constructor() {
            this.listeners = [];
        }
        addListener(e) {
            -1 === this.listeners.indexOf(e) && this.listeners.push(e);
        }
        dispatch() {
            for (var e = arguments.length, t = new Array(e), n = 0; n < e; n++) t[n] = arguments[n];
            this.listeners.forEach(e => {
                e(...t);
            });
        }
        hasListener(e) {
            return -1 !== this.listeners.indexOf(e);
        }
        hasListeners() {
            return this.listeners.length > 0;
        }
        removeListener(e) {
            const t = this.listeners.indexOf(e);
            -1 !== t && this.listeners.splice(t, 1);
        }
    };
    const s = (e => {
        let t = null;
        return t = () => {}, t.t = t.log = t.info = t.warn = t.error = t.debug = t, t;
    })("mono");
    var a = class {
        constructor() {
            this.onDestroy = new i, this._lastErrorFired = !1, this._lastError = null;
        }
        get lastError() {
            return this._lastErrorFired = !0, this._lastError;
        }
        set lastError(e) {
            this._lastErrorFired = !e, this._lastError = e;
        }
        clearLastError() {
            this._lastError && !this._lastErrorFired && s.error("Unhandled mono.lastError error:", this.lastError), 
            this._lastError = null;
        }
        unimplemented() {
            throw new Error("Unimplemented");
        }
        destroy() {
            this.onDestroy.dispatch();
        }
    };
    var l = e => class extends e {
        initMessages() {
            this.sendMessage = this.transport.sendMessage.bind(this.transport), this.sendMessageToActiveTab = this.transport.sendMessageToActiveTab.bind(this.transport), 
            this.onMessage = {
                addListener: this.transport.addListener.bind(this.transport),
                hasListener: this.transport.hasListener.bind(this.transport),
                hasListeners: this.transport.hasListeners.bind(this.transport),
                removeListener: this.transport.removeListener.bind(this.transport)
            }, this.transport.onBeforeRequest && this.transport.removeOnBeforeRequestListener && (this.onBeforeRequest = this.transport.onBeforeRequest.bind(this.transport), 
            this.removeOnBeforeRequestListener = this.transport.removeOnBeforeRequestListener.bind(this.transport));
        }
    };
    const u = n(5);
    var c = e => class extends e {
        callFn(e, t) {
            return this.waitPromise({
                action: "callFn",
                fn: e,
                args: t
            });
        }
        waitPromise(e) {
            return new Promise((t, n) => {
                this.sendMessage(e, e => {
                    if (e) {
                        if (e.err) {
                            const t = u(e.err);
                            return n(t);
                        }
                        return t(e.result);
                    }
                    {
                        const e = this.lastError || new Error("Unexpected response");
                        return n(e);
                    }
                });
            });
        }
    };
    var _ = e => class extends e {};
    var f = e => class extends(_(e)){};
    class p extends(f(c(l(a)))){}
    var d = p;
    var h = e => class extends e {
        constructor() {
            super(), this.isChrome = !0;
        }
        get isChromeMobile() {
            return /Mobile Safari\/(\d+)|Android (\d+)/.test(navigator.userAgent);
        }
        get isOperaNext() {
            return /OPR\/(\d+)/.test(navigator.userAgent);
        }
    };
    var m = e => class extends(h(e)){};
    class v extends(m(o(d))){
        constructor() {
            super(), this.initMessages(), this.initStorage(), this.initI18n();
        }
    }
    const b = new v;
    t.a = b;
}, function(e, t, n) {
    "use strict";
    const r = {
        on: function(e, t, n, r) {
            e.addEventListener(t, n, r);
        },
        off: function(e, t, n, r) {
            e.removeEventListener(t, n, r);
        },
        one: function(e, t, n, o) {
            const i = [ "oneFn", t, !!o ].join("_");
            let s = n[i];
            s || (n[i] = s = function(e) {
                r.off(this, t, s, o), n.apply(this, arguments);
            }), r.on(e, t, s, o), e = null;
        }
    }, o = "sf-removed-" + Math.floor(1e6 * Math.random()), i = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
    r.onRemoveEventName = o, r.onRemoveClassName = i, r.onRemoveListener = function(e) {
        r.trigger(e, o, {
            cancelable: !0,
            bubbles: !1
        });
    }, r.onRemoveEvent = (e, t) => {
        e.classList.add(i), e.addEventListener(o, t);
    }, r.offRemoveEvent = function(e, t) {
        e.removeEventListener(r.onRemoveEventName, t);
    }, r.trigger = function(e, t, n) {
        void 0 === n && (n = {}), void 0 === n.bubbles && (n.bubbles = !1), void 0 === n.cancelable && (n.cancelable = !1);
        let r = null;
        r = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, n) : new CustomEvent(t, n), 
        e.dispatchEvent(r);
    };
    var s = r;
    const a = {
        create: function(e, t) {
            let n, r;
            n = "object" != typeof e ? document.createElement(e) : e;
            for (let e in t) {
                const o = t[e];
                (r = l[e]) ? r(n, o) : n[e] = o;
            }
            return n;
        }
    }, l = {
        text: function(e, t) {
            e.textContent = t;
        },
        data: function(e, t) {
            for (let n in t) e.dataset[n] = t[n];
        },
        class: function(e, t) {
            if (Array.isArray(t)) for (let n = 0, r = t.length; n < r; n++) e.classList.add(t[n]); else e.setAttribute("class", t);
        },
        style: function(e, t) {
            if ("object" == typeof t) for (let n in t) {
                let r = n;
                "float" === r && (r = "cssFloat");
                const o = t[n];
                if (Array.isArray(o)) for (let t = 0, n = o.length; t < n; t++) e.style[r] = o[t]; else e.style[r] = o;
            } else e.setAttribute("style", t);
        },
        append: function(e, t) {
            Array.isArray(t) || (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                let r = t[n];
                (r || 0 === r) && ("object" != typeof r && (r = document.createTextNode(r)), e.appendChild(r));
            }
        },
        on: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                const r = t[n];
                Array.isArray(r) && s.on.apply(s, [ e ].concat(r));
            }
        },
        one: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, r = t.length; n < r; n++) {
                const r = t[n];
                Array.isArray(r) && s.one.apply(s, [ e ].concat(r));
            }
        },
        onCreate: function(e, t) {
            t.call(e, e);
        },
        attr: function(e, t) {
            let n, r;
            for (n in t) r = t[n], e.setAttribute(n, r);
        }
    };
    t.a = a;
}, function(e, t, n) {
    "use strict";
    e.exports = function(e) {
        var t = [];
        return t.toString = function() {
            return this.map((function(t) {
                var n = function(e, t) {
                    var n = e[1] || "", r = e[3];
                    if (!r) return n;
                    if (t && "function" == typeof btoa) {
                        var o = (s = r, a = btoa(unescape(encodeURIComponent(JSON.stringify(s)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a), 
                        "/*# ".concat(l, " */")), i = r.sources.map((function(e) {
                            return "/*# sourceURL=".concat(r.sourceRoot || "").concat(e, " */");
                        }));
                        return [ n ].concat(i).concat([ o ]).join("\n");
                    }
                    var s, a, l;
                    return [ n ].join("\n");
                }(t, e);
                return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
            })).join("");
        }, t.i = function(e, n, r) {
            "string" == typeof e && (e = [ [ null, e, "" ] ]);
            var o = {};
            if (r) for (var i = 0; i < this.length; i++) {
                var s = this[i][0];
                null != s && (o[s] = !0);
            }
            for (var a = 0; a < e.length; a++) {
                var l = [].concat(e[a]);
                r && o[l[0]] || (n && (l[2] ? l[2] = "".concat(n, " and ").concat(l[2]) : l[2] = n), 
                t.push(l));
            }
        }, t;
    };
}, function(e, t, n) {
    var r;
    !function() {
        "use strict";
        var n = {}.hasOwnProperty;
        function o() {
            for (var e = "", t = 0; t < arguments.length; t++) {
                var n = arguments[t];
                n && (e = s(e, i(n)));
            }
            return e;
        }
        function i(e) {
            if ("string" == typeof e || "number" == typeof e) return e;
            if ("object" != typeof e) return "";
            if (Array.isArray(e)) return o.apply(null, e);
            if (e.toString !== Object.prototype.toString && !e.toString.toString().includes("[native code]")) return e.toString();
            var t = "";
            for (var r in e) n.call(e, r) && e[r] && (t = s(t, r));
            return t;
        }
        function s(e, t) {
            return t ? e ? e + " " + t : e + t : e;
        }
        e.exports ? (o.default = o, e.exports = o) : void 0 === (r = function() {
            return o;
        }.apply(t, [])) || (e.exports = r);
    }();
}, function(e, t, n) {
    "use strict";
    var r, o = function() {
        return void 0 === r && (r = Boolean(window && document && document.all && !window.atob)), 
        r;
    }, i = function() {
        var e = {};
        return function(t) {
            if (void 0 === e[t]) {
                var n = document.querySelector(t);
                if (window.HTMLIFrameElement && n instanceof window.HTMLIFrameElement) try {
                    n = n.contentDocument.head;
                } catch (e) {
                    n = null;
                }
                e[t] = n;
            }
            return e[t];
        };
    }(), s = [];
    function a(e) {
        for (var t = -1, n = 0; n < s.length; n++) if (s[n].identifier === e) {
            t = n;
            break;
        }
        return t;
    }
    function l(e, t) {
        for (var n = {}, r = [], o = 0; o < e.length; o++) {
            var i = e[o], l = t.base ? i[0] + t.base : i[0], u = n[l] || 0, c = "".concat(l, " ").concat(u);
            n[l] = u + 1;
            var _ = a(c), f = {
                css: i[1],
                media: i[2],
                sourceMap: i[3]
            };
            -1 !== _ ? (s[_].references++, s[_].updater(f)) : s.push({
                identifier: c,
                updater: m(f, t),
                references: 1
            }), r.push(c);
        }
        return r;
    }
    function u(e) {
        var t = document.createElement("style"), r = e.attributes || {};
        if (void 0 === r.nonce) {
            var o = n.nc;
            o && (r.nonce = o);
        }
        if (Object.keys(r).forEach((function(e) {
            t.setAttribute(e, r[e]);
        })), "function" == typeof e.insert) e.insert(t); else {
            var s = i(e.insert || "head");
            if (!s) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            s.appendChild(t);
        }
        return t;
    }
    var c, _ = (c = [], function(e, t) {
        return c[e] = t, c.filter(Boolean).join("\n");
    });
    function f(e, t, n, r) {
        var o = n ? "" : r.media ? "@media ".concat(r.media, " {").concat(r.css, "}") : r.css;
        if (e.styleSheet) e.styleSheet.cssText = _(t, o); else {
            var i = document.createTextNode(o), s = e.childNodes;
            s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(i, s[t]) : e.appendChild(i);
        }
    }
    function p(e, t, n) {
        var r = n.css, o = n.media, i = n.sourceMap;
        if (o ? e.setAttribute("media", o) : e.removeAttribute("media"), i && "undefined" != typeof btoa && (r += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(i)))), " */")), 
        e.styleSheet) e.styleSheet.cssText = r; else {
            for (;e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(r));
        }
    }
    var d = null, h = 0;
    function m(e, t) {
        var n, r, o;
        if (t.singleton) {
            var i = h++;
            n = d || (d = u(t)), r = f.bind(null, n, i, !1), o = f.bind(null, n, i, !0);
        } else n = u(t), r = p.bind(null, n, t), o = function() {
            !function(e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e);
            }(n);
        };
        return r(e), function(t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                r(e = t);
            } else o();
        };
    }
    e.exports = function(e, t) {
        (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = o());
        var n = l(e = e || [], t);
        return function(e) {
            if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                for (var r = 0; r < n.length; r++) {
                    var o = a(n[r]);
                    s[o].references--;
                }
                for (var i = l(e, t), u = 0; u < n.length; u++) {
                    var c = a(n[u]);
                    0 === s[c].references && (s[c].updater(), s.splice(c, 1));
                }
                n = i;
            }
        };
    };
}, function(e, t, n) {
    var r = n(6).default;
    e.exports = r;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
    };
    function o(e) {
        return e && "object" === (void 0 === e ? "undefined" : r(e)) && "string" == typeof e.name && "string" == typeof e.message;
    }
    t.default = function(e) {
        return o(e) ? Object.assign(new Error, {
            stack: void 0
        }, e) : e;
    }, t.isSerializedError = o;
}, , function(e, t, n) {
    var r = n(4), o = n(11);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.i, o, "" ] ]);
    var i, s = 0, a = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = o.locals || {}, l.use = function() {
        return s++ || (i = r(o, a)), l;
    }, l.unuse = function() {
        s > 0 && !--s && (i(), i = null);
    }, e.exports = l;
}, function(e, t, n) {
    var r = n(4), o = n(12);
    "string" == typeof (o = o.__esModule ? o.default : o) && (o = [ [ e.i, o, "" ] ]);
    var i, s = 0, a = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = o.locals || {}, l.use = function() {
        return s++ || (i = r(o, a)), l;
    }, l.unuse = function() {
        s > 0 && !--s && (i(), i = null);
    }, e.exports = l;
}, , function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(2), o = n.n(r)()(!1);
    o.push([ e.i, ".sf-options-body{background-color:#e9eaf0;font-family:sans-serif;font-size:small}.sf-options-body.loading>*{visibility:hidden}.sf-options-body .sf-options-container{background-color:#f6f6f9;border:1px solid #cacdd9;border-radius:7px;width:700px;margin:12px auto;padding:15px}.sf-options-body .sf-options-container h1{font-family:sans-serif;font-size:1.3em;margin:0 0 1.3em 0}.sf-options-body .sf-options-container div{display:block}.sf-options-body .sf-options-container form{margin:0;padding:0}.sf-options-body .sf-options-container label{display:block;margin:.2em 0;padding:0}.sf-options-body .sf-options-container .sf-inline label{display:inline}.sf-options-body .sf-options-container .sf-clear{clear:both;height:0;font-size:0;line-height:0}.sf-options-body .sf-options-container .sf-block{border-top:1px solid #dfe1e8;padding:1.5em 0 0 0;margin:1.5em 0 0 0;min-width:160px}.sf-options-body .sf-options-container .sf-browser{display:none}.sf-options-body .sf-options-container .sf-title{font-weight:700;margin-bottom:.5em}.sf-options-body .sf-options-container .sf-module{font-weight:700;margin-top:1em}.sf-options-body .sf-options-container .sf-module:first-child{margin-top:0}.sf-options-body .sf-options-container .sf-module_options{font-weight:400;margin-left:2em}.sf-options-popup{z-index:9999;display:block;float:none;position:fixed;margin:0;padding:0;visibility:hidden;color:#000;background:#fff;border:3px solid #c0cad5;border-radius:7px;overflow:auto}.sf-options-popup .sf-options-body{display:block;float:none;position:relative;overflow:auto;margin:0;padding:10px 15px;background:#fff}.sf-options-popup .sf-options-body .sf-options-container{background-color:#fff;border:none;font:13px/1 Arial,Helvetica,sans-serif;width:580px;margin:0;padding:9px;text-align:left}.sf-options-popup img.sf-close{position:absolute;top:10px;right:15px;opacity:.5;cursor:pointer}.sf-options-popup img.sf-close:hover{opacity:.9}", "" ]), 
    t.default = o;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r = n(2), o = n.n(r)()(!1);
    o.push([ e.i, '.sf-block div.sf-table{display:table!important;width:100%}.sf-block div.sf-table-row,.sf-block div.sf-table-row-head,.sf-block form.sf-table-row{display:table-row!important}.sf-block .sf-table-row:hover{display:table-row!important;background:#ebffe8}.sf-block div.sf-table-row-head{background:#00bf80;color:#fff}.sf-block div.sf-table-row-head .sf-table-cell{border:1px solid #01ab73}.sf-block div.sf-table-cell{display:table-cell!important;border:1px solid #e8e9eb;padding:10px;width:25%;word-break:break-all;vertical-align:middle}.sf-block div.sf-table-body{display:table-row-group!important}.sf-block .sf-group-buttons{margin-top:15px;margin-bottom:65px}.sf-block .sf-btn{float:left;padding:5px;cursor:pointer;font-weight:700;font-size:12px;background:#e9eaf0;border:1px solid #c1c1c7;border-radius:4px;margin-right:5px}.sf-block .sf-badge{padding:3px;float:left;margin-right:7px;background:#536760;border-radius:4px;color:#fff;margin-bottom:4px}.sf-block .sf-input{padding:4px;border:1px solid #d0c6c6;border-radius:4px;width:90%}.sf-block .sf-disabled{opacity:.4;pointer-events:none}.sf-block .text-muted{opacity:.6}.sf-block .div-hover{position:absolute;bottom:45px;background:#484444;padding:5px;border-radius:6px;min-width:32px;text-align:center;font-size:12px;word-break:break-word}.sf-block .div-hover::after{content:" ";position:absolute;top:100%;left:50%;margin-left:-10px;border-width:6px;border-style:solid;border-color:#2d2b2b transparent transparent transparent}.sf-block .hide{display:none!important}.sf-block .show{display:block!important}', "" ]), 
    t.default = o;
}, function(e, t, n) {
    "use strict";
    n.r(t);
    var r, o, i, s, a, l, u, c, _ = n(8), f = n.n(_), p = n(0), d = n(1), h = {}, m = [], v = /acit|ex(?:s|g|n|p|$)|rph|grid|ows|mnc|ntw|ine[ch]|zoo|^ord|itera/i, b = Array.isArray;
    function y(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function g(e) {
        var t = e.parentNode;
        t && t.removeChild(e);
    }
    function k(e, t, n) {
        var o, i, s, a = {};
        for (s in t) "key" == s ? o = t[s] : "ref" == s ? i = t[s] : a[s] = t[s];
        if (arguments.length > 2 && (a.children = arguments.length > 3 ? r.call(arguments, 2) : n), 
        "function" == typeof e && null != e.defaultProps) for (s in e.defaultProps) void 0 === a[s] && (a[s] = e.defaultProps[s]);
        return E(e, a, o, i, null);
    }
    function E(e, t, n, r, s) {
        var a = {
            type: e,
            props: t,
            key: n,
            ref: r,
            __k: null,
            __: null,
            __b: 0,
            __e: null,
            __d: void 0,
            __c: null,
            constructor: void 0,
            __v: null == s ? ++i : s,
            __i: -1,
            __u: 0
        };
        return null == s && null != o.vnode && o.vnode(a), a;
    }
    function x(e) {
        return e.children;
    }
    function w(e, t) {
        this.props = e, this.context = t;
    }
    function S(e, t) {
        if (null == t) return e.__ ? S(e.__, e.__i + 1) : null;
        for (var n; t < e.__k.length; t++) if (null != (n = e.__k[t]) && null != n.__e) return n.__e;
        return "function" == typeof e.type ? S(e) : null;
    }
    function C(e, t, n) {
        var r, i = e.__v, s = i.__e, a = e.__P;
        if (a) return (r = y({}, i)).__v = i.__v + 1, o.vnode && o.vnode(r), H(a, r, i, e.__n, void 0 !== a.ownerSVGElement, 32 & i.__u ? [ s ] : null, t, null == s ? S(i) : s, !!(32 & i.__u), n), 
        r.__v = i.__v, r.__.__k[r.__i] = r, r.__d = void 0, r.__e != s && function e(t) {
            var n, r;
            if (null != (t = t.__) && null != t.__c) {
                for (t.__e = t.__c.base = null, n = 0; n < t.__k.length; n++) if (null != (r = t.__k[n]) && null != r.__e) {
                    t.__e = t.__c.base = r.__e;
                    break;
                }
                return e(t);
            }
        }(r), r;
    }
    function M(e) {
        (!e.__d && (e.__d = !0) && s.push(e) && !O.__r++ || a !== o.debounceRendering) && ((a = o.debounceRendering) || l)(O);
    }
    function O() {
        var e, t, n, r = [], i = [];
        for (s.sort(u); e = s.shift(); ) e.__d && (n = s.length, t = C(e, r, i) || t, 0 === n || s.length > n ? (F(r, t, i), 
        i.length = r.length = 0, t = void 0, s.sort(u)) : t && o.__c && o.__c(t, m));
        t && F(r, t, i), O.__r = 0;
    }
    function N(e, t, n, r, o, i, s, a, l, u, c) {
        var _, f, p, d, v, b = r && r.__k || m, y = t.length;
        for (n.__d = l, L(n, t, b), l = n.__d, _ = 0; _ < y; _++) null != (p = n.__k[_]) && "boolean" != typeof p && "function" != typeof p && (f = -1 === p.__i ? h : b[p.__i] || h, 
        p.__i = _, H(e, p, f, o, i, s, a, l, u, c), d = p.__e, p.ref && f.ref != p.ref && (f.ref && q(f.ref, null, p), 
        c.push(p.ref, p.__c || d, p)), null == v && null != d && (v = d), 65536 & p.__u || f.__k === p.__k ? l = P(p, l, e) : "function" == typeof p.type && void 0 !== p.__d ? l = p.__d : d && (l = d.nextSibling), 
        p.__d = void 0, p.__u &= -196609);
        n.__d = l, n.__e = v;
    }
    function L(e, t, n) {
        var r, o, i, s, a, l = t.length, u = n.length, c = u, _ = 0;
        for (e.__k = [], r = 0; r < l; r++) s = r + _, null != (o = e.__k[r] = null == (o = t[r]) || "boolean" == typeof o || "function" == typeof o ? null : "string" == typeof o || "number" == typeof o || "bigint" == typeof o || o.constructor == String ? E(null, o, null, null, null) : b(o) ? E(x, {
            children: o
        }, null, null, null) : void 0 === o.constructor && o.__b > 0 ? E(o.type, o.props, o.key, o.ref ? o.ref : null, o.__v) : o) ? (o.__ = e, 
        o.__b = e.__b + 1, a = A(o, n, s, c), o.__i = a, i = null, -1 !== a && (c--, (i = n[a]) && (i.__u |= 131072)), 
        null == i || null === i.__v ? (-1 == a && _--, "function" != typeof o.type && (o.__u |= 65536)) : a !== s && (a === s + 1 ? _++ : a > s ? c > l - s ? _ += a - s : _-- : a < s ? a == s - 1 && (_ = a - s) : _ = 0, 
        a !== r + _ && (o.__u |= 65536))) : (i = n[s]) && null == i.key && i.__e && 0 == (131072 & i.__u) && (i.__e == e.__d && (e.__d = S(i)), 
        B(i, i, !1), n[s] = null, c--);
        if (c) for (r = 0; r < u; r++) null != (i = n[r]) && 0 == (131072 & i.__u) && (i.__e == e.__d && (e.__d = S(i)), 
        B(i, i));
    }
    function P(e, t, n) {
        var r, o;
        if ("function" == typeof e.type) {
            for (r = e.__k, o = 0; r && o < r.length; o++) r[o] && (r[o].__ = e, t = P(r[o], t, n));
            return t;
        }
        e.__e != t && (n.insertBefore(e.__e, t || null), t = e.__e);
        do {
            t = t && t.nextSibling;
        } while (null != t && 8 === t.nodeType);
        return t;
    }
    function j(e, t) {
        return t = t || [], null == e || "boolean" == typeof e || (b(e) ? e.some((function(e) {
            j(e, t);
        })) : t.push(e)), t;
    }
    function A(e, t, n, r) {
        var o = e.key, i = e.type, s = n - 1, a = n + 1, l = t[n];
        if (null === l || l && o == l.key && i === l.type && 0 == (131072 & l.__u)) return n;
        if (r > (null != l && 0 == (131072 & l.__u) ? 1 : 0)) for (;s >= 0 || a < t.length; ) {
            if (s >= 0) {
                if ((l = t[s]) && 0 == (131072 & l.__u) && o == l.key && i === l.type) return s;
                s--;
            }
            if (a < t.length) {
                if ((l = t[a]) && 0 == (131072 & l.__u) && o == l.key && i === l.type) return a;
                a++;
            }
        }
        return -1;
    }
    function R(e, t, n) {
        "-" === t[0] ? e.setProperty(t, null == n ? "" : n) : e[t] = null == n ? "" : "number" != typeof n || v.test(t) ? n : n + "px";
    }
    function T(e, t, n, r, o) {
        var i;
        e: if ("style" === t) if ("string" == typeof n) e.style.cssText = n; else {
            if ("string" == typeof r && (e.style.cssText = r = ""), r) for (t in r) n && t in n || R(e.style, t, "");
            if (n) for (t in n) r && n[t] === r[t] || R(e.style, t, n[t]);
        } else if ("o" === t[0] && "n" === t[1]) i = t !== (t = t.replace(/(PointerCapture)$|Capture$/i, "$1")), 
        t = t.toLowerCase() in e ? t.toLowerCase().slice(2) : t.slice(2), e.l || (e.l = {}), 
        e.l[t + i] = n, n ? r ? n.u = r.u : (n.u = Date.now(), e.addEventListener(t, i ? U : D, i)) : e.removeEventListener(t, i ? U : D, i); else {
            if (o) t = t.replace(/xlink(H|:h)/, "h").replace(/sName$/, "s"); else if ("width" !== t && "height" !== t && "href" !== t && "list" !== t && "form" !== t && "tabIndex" !== t && "download" !== t && "rowSpan" !== t && "colSpan" !== t && "role" !== t && t in e) try {
                e[t] = null == n ? "" : n;
                break e;
            } catch (e) {}
            "function" == typeof n || (null == n || !1 === n && "-" !== t[4] ? e.removeAttribute(t) : e.setAttribute(t, n));
        }
    }
    function D(e) {
        if (this.l) {
            var t = this.l[e.type + !1];
            if (e.t) {
                if (e.t <= t.u) return;
            } else e.t = Date.now();
            return t(o.event ? o.event(e) : e);
        }
    }
    function U(e) {
        if (this.l) return this.l[e.type + !0](o.event ? o.event(e) : e);
    }
    function H(e, t, n, r, i, s, a, l, u, c) {
        var _, f, p, d, h, m, v, g, k, E, S, C, M, O, L, P = t.type;
        if (void 0 !== t.constructor) return null;
        128 & n.__u && (u = !!(32 & n.__u), s = [ l = t.__e = n.__e ]), (_ = o.__b) && _(t);
        e: if ("function" == typeof P) try {
            if (g = t.props, k = (_ = P.contextType) && r[_.__c], E = _ ? k ? k.props.value : _.__ : r, 
            n.__c ? v = (f = t.__c = n.__c).__ = f.__E : ("prototype" in P && P.prototype.render ? t.__c = f = new P(g, E) : (t.__c = f = new w(g, E), 
            f.constructor = P, f.render = W), k && k.sub(f), f.props = g, f.state || (f.state = {}), 
            f.context = E, f.__n = r, p = f.__d = !0, f.__h = [], f._sb = []), null == f.__s && (f.__s = f.state), 
            null != P.getDerivedStateFromProps && (f.__s == f.state && (f.__s = y({}, f.__s)), 
            y(f.__s, P.getDerivedStateFromProps(g, f.__s))), d = f.props, h = f.state, f.__v = t, 
            p) null == P.getDerivedStateFromProps && null != f.componentWillMount && f.componentWillMount(), 
            null != f.componentDidMount && f.__h.push(f.componentDidMount); else {
                if (null == P.getDerivedStateFromProps && g !== d && null != f.componentWillReceiveProps && f.componentWillReceiveProps(g, E), 
                !f.__e && (null != f.shouldComponentUpdate && !1 === f.shouldComponentUpdate(g, f.__s, E) || t.__v === n.__v)) {
                    for (t.__v !== n.__v && (f.props = g, f.state = f.__s, f.__d = !1), t.__e = n.__e, 
                    t.__k = n.__k, t.__k.forEach((function(e) {
                        e && (e.__ = t);
                    })), S = 0; S < f._sb.length; S++) f.__h.push(f._sb[S]);
                    f._sb = [], f.__h.length && a.push(f);
                    break e;
                }
                null != f.componentWillUpdate && f.componentWillUpdate(g, f.__s, E), null != f.componentDidUpdate && f.__h.push((function() {
                    f.componentDidUpdate(d, h, m);
                }));
            }
            if (f.context = E, f.props = g, f.__P = e, f.__e = !1, C = o.__r, M = 0, "prototype" in P && P.prototype.render) {
                for (f.state = f.__s, f.__d = !1, C && C(t), _ = f.render(f.props, f.state, f.context), 
                O = 0; O < f._sb.length; O++) f.__h.push(f._sb[O]);
                f._sb = [];
            } else do {
                f.__d = !1, C && C(t), _ = f.render(f.props, f.state, f.context), f.state = f.__s;
            } while (f.__d && ++M < 25);
            f.state = f.__s, null != f.getChildContext && (r = y(y({}, r), f.getChildContext())), 
            p || null == f.getSnapshotBeforeUpdate || (m = f.getSnapshotBeforeUpdate(d, h)), 
            N(e, b(L = null != _ && _.type === x && null == _.key ? _.props.children : _) ? L : [ L ], t, n, r, i, s, a, l, u, c), 
            f.base = t.__e, t.__u &= -161, f.__h.length && a.push(f), v && (f.__E = f.__ = null);
        } catch (e) {
            t.__v = null, u || null != s ? (t.__e = l, t.__u |= u ? 160 : 32, s[s.indexOf(l)] = null) : (t.__e = n.__e, 
            t.__k = n.__k), o.__e(e, t, n);
        } else null == s && t.__v === n.__v ? (t.__k = n.__k, t.__e = n.__e) : t.__e = I(n.__e, t, n, r, i, s, a, u, c);
        (_ = o.diffed) && _(t);
    }
    function F(e, t, n) {
        for (var r = 0; r < n.length; r++) q(n[r], n[++r], n[++r]);
        o.__c && o.__c(t, e), e.some((function(t) {
            try {
                e = t.__h, t.__h = [], e.some((function(e) {
                    e.call(t);
                }));
            } catch (e) {
                o.__e(e, t.__v);
            }
        }));
    }
    function I(e, t, n, o, i, s, a, l, u) {
        var c, _, f, p, d, m, v, y = n.props, k = t.props, E = t.type;
        if ("svg" === E && (i = !0), null != s) for (c = 0; c < s.length; c++) if ((d = s[c]) && "setAttribute" in d == !!E && (E ? d.localName === E : 3 === d.nodeType)) {
            e = d, s[c] = null;
            break;
        }
        if (null == e) {
            if (null === E) return document.createTextNode(k);
            e = i ? document.createElementNS("http://www.w3.org/2000/svg", E) : document.createElement(E, k.is && k), 
            s = null, l = !1;
        }
        if (null === E) y === k || l && e.data === k || (e.data = k); else {
            if (s = s && r.call(e.childNodes), y = n.props || h, !l && null != s) for (y = {}, 
            c = 0; c < e.attributes.length; c++) y[(d = e.attributes[c]).name] = d.value;
            for (c in y) d = y[c], "children" == c || ("dangerouslySetInnerHTML" == c ? f = d : "key" === c || c in k || T(e, c, null, d, i));
            for (c in k) d = k[c], "children" == c ? p = d : "dangerouslySetInnerHTML" == c ? _ = d : "value" == c ? m = d : "checked" == c ? v = d : "key" === c || l && "function" != typeof d || y[c] === d || T(e, c, d, y[c], i);
            if (_) l || f && (_.__html === f.__html || _.__html === e.innerHTML) || (e.innerHTML = _.__html), 
            t.__k = []; else if (f && (e.innerHTML = ""), N(e, b(p) ? p : [ p ], t, n, o, i && "foreignObject" !== E, s, a, s ? s[0] : n.__k && S(n, 0), l, u), 
            null != s) for (c = s.length; c--; ) null != s[c] && g(s[c]);
            l || (c = "value", void 0 !== m && (m !== e[c] || "progress" === E && !m || "option" === E && m !== y[c]) && T(e, c, m, y[c], !1), 
            c = "checked", void 0 !== v && v !== e[c] && T(e, c, v, y[c], !1));
        }
        return e;
    }
    function q(e, t, n) {
        try {
            "function" == typeof e ? e(t) : e.current = t;
        } catch (e) {
            o.__e(e, n);
        }
    }
    function B(e, t, n) {
        var r, i;
        if (o.unmount && o.unmount(e), (r = e.ref) && (r.current && r.current !== e.__e || q(r, null, t)), 
        null != (r = e.__c)) {
            if (r.componentWillUnmount) try {
                r.componentWillUnmount();
            } catch (e) {
                o.__e(e, t);
            }
            r.base = r.__P = null, e.__c = void 0;
        }
        if (r = e.__k) for (i = 0; i < r.length; i++) r[i] && B(r[i], t, n || "function" != typeof e.type);
        n || null == e.__e || g(e.__e), e.__ = e.__e = e.__d = void 0;
    }
    function W(e, t, n) {
        return this.constructor(e, n);
    }
    function V(e, t, n) {
        var i, s, a, l;
        o.__ && o.__(e, t), s = (i = "function" == typeof n) ? null : n && n.__k || t.__k, 
        a = [], l = [], H(t, e = (!i && n || t).__k = k(x, null, [ e ]), s || h, h, void 0 !== t.ownerSVGElement, !i && n ? [ n ] : s ? null : t.firstChild ? r.call(t.childNodes) : null, a, !i && n ? n : s ? s.__e : t.firstChild, i, l), 
        e.__d = void 0, F(a, e, l);
    }
    function $(e, t) {
        V(e, t, $);
    }
    function z(e, t, n) {
        var o, i, s, a, l = y({}, e.props);
        for (s in e.type && e.type.defaultProps && (a = e.type.defaultProps), t) "key" == s ? o = t[s] : "ref" == s ? i = t[s] : l[s] = void 0 === t[s] && void 0 !== a ? a[s] : t[s];
        return arguments.length > 2 && (l.children = arguments.length > 3 ? r.call(arguments, 2) : n), 
        E(e.type, l, o || e.key, i || e.ref, null);
    }
    r = m.slice, o = {
        __e: function(e, t, n, r) {
            for (var o, i, s; t = t.__; ) if ((o = t.__c) && !o.__) try {
                if ((i = o.constructor) && null != i.getDerivedStateFromError && (o.setState(i.getDerivedStateFromError(e)), 
                s = o.__d), null != o.componentDidCatch && (o.componentDidCatch(e, r || {}), s = o.__d), 
                s) return o.__E = o;
            } catch (t) {
                e = t;
            }
            throw e;
        }
    }, i = 0, w.prototype.setState = function(e, t) {
        var n;
        n = null != this.__s && this.__s !== this.state ? this.__s : this.__s = y({}, this.state), 
        "function" == typeof e && (e = e(y({}, n), this.props)), e && y(n, e), null != e && this.__v && (t && this._sb.push(t), 
        M(this));
    }, w.prototype.forceUpdate = function(e) {
        this.__v && (this.__e = !0, e && this.__h.push(e), M(this));
    }, w.prototype.render = x, s = [], l = "function" == typeof Promise ? Promise.prototype.then.bind(Promise.resolve()) : setTimeout, 
    u = function(e, t) {
        return e.__v.__b - t.__v.__b;
    }, O.__r = 0, c = 0;
    var G, J, Y, Z, Q = 0, X = [], K = [], ee = o, te = ee.__b, ne = ee.__r, re = ee.diffed, oe = ee.__c, ie = ee.unmount, se = ee.__;
    function ae(e, t) {
        ee.__h && ee.__h(J, e, Q || t), Q = 0;
        var n = J.__H || (J.__H = {
            __: [],
            __h: []
        });
        return e >= n.__.length && n.__.push({
            __V: K
        }), n.__[e];
    }
    function le(e) {
        return Q = 1, ue(ye, e);
    }
    function ue(e, t, n) {
        var r = ae(G++, 2);
        if (r.t = e, !r.__c && (r.__ = [ n ? n(t) : ye(void 0, t), function(e) {
            var t = r.__N ? r.__N[0] : r.__[0], n = r.t(t, e);
            t !== n && (r.__N = [ n, r.__[1] ], r.__c.setState({}));
        } ], r.__c = J, !J.u)) {
            var o = function(e, t, n) {
                if (!r.__c.__H) return !0;
                var o = r.__c.__H.__.filter((function(e) {
                    return !!e.__c;
                }));
                if (o.every((function(e) {
                    return !e.__N;
                }))) return !i || i.call(this, e, t, n);
                var s = !1;
                return o.forEach((function(e) {
                    if (e.__N) {
                        var t = e.__[0];
                        e.__ = e.__N, e.__N = void 0, t !== e.__[0] && (s = !0);
                    }
                })), !(!s && r.__c.props === e) && (!i || i.call(this, e, t, n));
            };
            J.u = !0;
            var i = J.shouldComponentUpdate, s = J.componentWillUpdate;
            J.componentWillUpdate = function(e, t, n) {
                if (this.__e) {
                    var r = i;
                    i = void 0, o(e, t, n), i = r;
                }
                s && s.call(this, e, t, n);
            }, J.shouldComponentUpdate = o;
        }
        return r.__N || r.__;
    }
    function ce(e, t) {
        var n = ae(G++, 3);
        !ee.__s && be(n.__H, t) && (n.__ = e, n.i = t, J.__H.__h.push(n));
    }
    function _e(e, t) {
        var n = ae(G++, 4);
        !ee.__s && be(n.__H, t) && (n.__ = e, n.i = t, J.__h.push(n));
    }
    function fe(e, t) {
        var n = ae(G++, 7);
        return be(n.__H, t) ? (n.__V = e(), n.i = t, n.__h = e, n.__V) : n.__;
    }
    function pe() {
        for (var e; e = X.shift(); ) if (e.__P && e.__H) try {
            e.__H.__h.forEach(me), e.__H.__h.forEach(ve), e.__H.__h = [];
        } catch (t) {
            e.__H.__h = [], ee.__e(t, e.__v);
        }
    }
    ee.__b = function(e) {
        J = null, te && te(e);
    }, ee.__ = function(e, t) {
        e && t.__k && t.__k.__m && (e.__m = t.__k.__m), se && se(e, t);
    }, ee.__r = function(e) {
        ne && ne(e), G = 0;
        var t = (J = e.__c).__H;
        t && (Y === J ? (t.__h = [], J.__h = [], t.__.forEach((function(e) {
            e.__N && (e.__ = e.__N), e.__V = K, e.__N = e.i = void 0;
        }))) : (t.__h.forEach(me), t.__h.forEach(ve), t.__h = [], G = 0)), Y = J;
    }, ee.diffed = function(e) {
        re && re(e);
        var t = e.__c;
        t && t.__H && (t.__H.__h.length && (1 !== X.push(t) && Z === ee.requestAnimationFrame || ((Z = ee.requestAnimationFrame) || he)(pe)), 
        t.__H.__.forEach((function(e) {
            e.i && (e.__H = e.i), e.__V !== K && (e.__ = e.__V), e.i = void 0, e.__V = K;
        }))), Y = J = null;
    }, ee.__c = function(e, t) {
        t.some((function(e) {
            try {
                e.__h.forEach(me), e.__h = e.__h.filter((function(e) {
                    return !e.__ || ve(e);
                }));
            } catch (n) {
                t.some((function(e) {
                    e.__h && (e.__h = []);
                })), t = [], ee.__e(n, e.__v);
            }
        })), oe && oe(e, t);
    }, ee.unmount = function(e) {
        ie && ie(e);
        var t, n = e.__c;
        n && n.__H && (n.__H.__.forEach((function(e) {
            try {
                me(e);
            } catch (e) {
                t = e;
            }
        })), n.__H = void 0, t && ee.__e(t, n.__v));
    };
    var de = "function" == typeof requestAnimationFrame;
    function he(e) {
        var t, n = function() {
            clearTimeout(r), de && cancelAnimationFrame(t), setTimeout(e);
        }, r = setTimeout(n, 100);
        de && (t = requestAnimationFrame(n));
    }
    function me(e) {
        var t = J, n = e.__c;
        "function" == typeof n && (e.__c = void 0, n()), J = t;
    }
    function ve(e) {
        var t = J;
        e.__c = e.__(), J = t;
    }
    function be(e, t) {
        return !e || e.length !== t.length || t.some((function(t, n) {
            return t !== e[n];
        }));
    }
    function ye(e, t) {
        return "function" == typeof t ? t(e) : t;
    }
    function ge(e, t) {
        for (var n in t) e[n] = t[n];
        return e;
    }
    function ke(e, t) {
        for (var n in e) if ("__source" !== n && !(n in t)) return !0;
        for (var r in t) if ("__source" !== r && e[r] !== t[r]) return !0;
        return !1;
    }
    function Ee(e, t) {
        this.props = e, this.context = t;
    }
    (Ee.prototype = new w).isPureReactComponent = !0, Ee.prototype.shouldComponentUpdate = function(e, t) {
        return ke(this.props, e) || ke(this.state, t);
    };
    var xe = o.__b;
    o.__b = function(e) {
        e.type && e.type.__f && e.ref && (e.props.ref = e.ref, e.ref = null), xe && xe(e);
    };
    var we = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.forward_ref") || 3911;
    var Se = function(e, t) {
        return null == e ? null : j(j(e).map(t));
    }, Ce = {
        map: Se,
        forEach: Se,
        count: function(e) {
            return e ? j(e).length : 0;
        },
        only: function(e) {
            var t = j(e);
            if (1 !== t.length) throw "Children.only";
            return t[0];
        },
        toArray: j
    }, Me = o.__e;
    o.__e = function(e, t, n, r) {
        if (e.then) for (var o, i = t; i = i.__; ) if ((o = i.__c) && o.__c) return null == t.__e && (t.__e = n.__e, 
        t.__k = n.__k), o.__c(e, t);
        Me(e, t, n, r);
    };
    var Oe = o.unmount;
    function Ne() {
        this.__u = 0, this.t = null, this.__b = null;
    }
    function Le(e) {
        var t = e.__.__c;
        return t && t.__a && t.__a(e);
    }
    function Pe() {
        this.u = null, this.o = null;
    }
    o.unmount = function(e) {
        var t = e.__c;
        t && t.__R && t.__R(), t && 32 & e.__u && (e.type = null), Oe && Oe(e);
    }, (Ne.prototype = new w).__c = function(e, t) {
        var n = t.__c, r = this;
        null == r.t && (r.t = []), r.t.push(n);
        var o = Le(r.__v), i = !1, s = function() {
            i || (i = !0, n.__R = null, o ? o(a) : a());
        };
        n.__R = s;
        var a = function() {
            if (!--r.__u) {
                if (r.state.__a) {
                    var e = r.state.__a;
                    r.__v.__k[0] = function e(t, n, r) {
                        return t && r && (t.__v = null, t.__k = t.__k && t.__k.map((function(t) {
                            return e(t, n, r);
                        })), t.__c && t.__c.__P === n && (t.__e && r.appendChild(t.__e), t.__c.__e = !0, 
                        t.__c.__P = r)), t;
                    }(e, e.__c.__P, e.__c.__O);
                }
                var t;
                for (r.setState({
                    __a: r.__b = null
                }); t = r.t.pop(); ) t.forceUpdate();
            }
        };
        r.__u++ || 32 & t.__u || r.setState({
            __a: r.__b = r.__v.__k[0]
        }), e.then(s, s);
    }, Ne.prototype.componentWillUnmount = function() {
        this.t = [];
    }, Ne.prototype.render = function(e, t) {
        if (this.__b) {
            if (this.__v.__k) {
                var n = document.createElement("div"), r = this.__v.__k[0].__c;
                this.__v.__k[0] = function e(t, n, r) {
                    return t && (t.__c && t.__c.__H && (t.__c.__H.__.forEach((function(e) {
                        "function" == typeof e.__c && e.__c();
                    })), t.__c.__H = null), null != (t = ge({}, t)).__c && (t.__c.__P === r && (t.__c.__P = n), 
                    t.__c = null), t.__k = t.__k && t.__k.map((function(t) {
                        return e(t, n, r);
                    }))), t;
                }(this.__b, n, r.__O = r.__P);
            }
            this.__b = null;
        }
        var o = t.__a && k(x, null, e.fallback);
        return o && (o.__u &= -33), [ k(x, null, t.__a ? null : e.children), o ];
    };
    var je = function(e, t, n) {
        if (++n[1] === n[0] && e.o.delete(t), e.props.revealOrder && ("t" !== e.props.revealOrder[0] || !e.o.size)) for (n = e.u; n; ) {
            for (;n.length > 3; ) n.pop()();
            if (n[1] < n[0]) break;
            e.u = n = n[2];
        }
    };
    function Ae(e) {
        return this.getChildContext = function() {
            return e.context;
        }, e.children;
    }
    function Re(e) {
        var t = this, n = e.i;
        t.componentWillUnmount = function() {
            V(null, t.l), t.l = null, t.i = null;
        }, t.i && t.i !== n && t.componentWillUnmount(), t.l || (t.i = n, t.l = {
            nodeType: 1,
            parentNode: n,
            childNodes: [],
            appendChild: function(e) {
                this.childNodes.push(e), t.i.appendChild(e);
            },
            insertBefore: function(e, n) {
                this.childNodes.push(e), t.i.appendChild(e);
            },
            removeChild: function(e) {
                this.childNodes.splice(this.childNodes.indexOf(e) >>> 1, 1), t.i.removeChild(e);
            }
        }), V(k(Ae, {
            context: t.context
        }, e.__v), t.l);
    }
    function Te(e, t) {
        var n = k(Re, {
            __v: e,
            i: t
        });
        return n.containerInfo = t, n;
    }
    (Pe.prototype = new w).__a = function(e) {
        var t = this, n = Le(t.__v), r = t.o.get(e);
        return r[0]++, function(o) {
            var i = function() {
                t.props.revealOrder ? (r.push(o), je(t, e, r)) : o();
            };
            n ? n(i) : i();
        };
    }, Pe.prototype.render = function(e) {
        this.u = null, this.o = new Map;
        var t = j(e.children);
        e.revealOrder && "b" === e.revealOrder[0] && t.reverse();
        for (var n = t.length; n--; ) this.o.set(t[n], this.u = [ 1, 0, this.u ]);
        return e.children;
    }, Pe.prototype.componentDidUpdate = Pe.prototype.componentDidMount = function() {
        var e = this;
        this.o.forEach((function(t, n) {
            je(e, n, t);
        }));
    };
    var De = "undefined" != typeof Symbol && Symbol.for && Symbol.for("react.element") || 60103, Ue = /^(?:accent|alignment|arabic|baseline|cap|clip(?!PathU)|color|dominant|fill|flood|font|glyph(?!R)|horiz|image(!S)|letter|lighting|marker(?!H|W|U)|overline|paint|pointer|shape|stop|strikethrough|stroke|text(?!L)|transform|underline|unicode|units|v|vector|vert|word|writing|x(?!C))[A-Z]/, He = /^on(Ani|Tra|Tou|BeforeInp|Compo)/, Fe = /[A-Z0-9]/g, Ie = "undefined" != typeof document, qe = function(e) {
        return ("undefined" != typeof Symbol && "symbol" == typeof Symbol() ? /fil|che|rad/ : /fil|che|ra/).test(e);
    };
    w.prototype.isReactComponent = {}, [ "componentWillMount", "componentWillReceiveProps", "componentWillUpdate" ].forEach((function(e) {
        Object.defineProperty(w.prototype, e, {
            configurable: !0,
            get: function() {
                return this["UNSAFE_" + e];
            },
            set: function(t) {
                Object.defineProperty(this, e, {
                    configurable: !0,
                    writable: !0,
                    value: t
                });
            }
        });
    }));
    var Be = o.event;
    function We() {}
    function Ve() {
        return this.cancelBubble;
    }
    function $e() {
        return this.defaultPrevented;
    }
    o.event = function(e) {
        return Be && (e = Be(e)), e.persist = We, e.isPropagationStopped = Ve, e.isDefaultPrevented = $e, 
        e.nativeEvent = e;
    };
    var ze, Ge = {
        enumerable: !1,
        configurable: !0,
        get: function() {
            return this.class;
        }
    }, Je = o.vnode;
    o.vnode = function(e) {
        "string" == typeof e.type && function(e) {
            var t = e.props, n = e.type, r = {};
            for (var o in t) {
                var i = t[o];
                if (!("value" === o && "defaultValue" in t && null == i || Ie && "children" === o && "noscript" === n || "class" === o || "className" === o)) {
                    var s = o.toLowerCase();
                    "defaultValue" === o && "value" in t && null == t.value ? o = "value" : "download" === o && !0 === i ? i = "" : "translate" === s && "no" === i ? i = !1 : "ondoubleclick" === s ? o = "ondblclick" : "onchange" !== s || "input" !== n && "textarea" !== n || qe(t.type) ? "onfocus" === s ? o = "onfocusin" : "onblur" === s ? o = "onfocusout" : He.test(o) ? o = s : -1 === n.indexOf("-") && Ue.test(o) ? o = o.replace(Fe, "-$&").toLowerCase() : null === i && (i = void 0) : s = o = "oninput", 
                    "oninput" === s && r[o = s] && (o = "oninputCapture"), r[o] = i;
                }
            }
            "select" == n && r.multiple && Array.isArray(r.value) && (r.value = j(t.children).forEach((function(e) {
                e.props.selected = -1 != r.value.indexOf(e.props.value);
            }))), "select" == n && null != r.defaultValue && (r.value = j(t.children).forEach((function(e) {
                e.props.selected = r.multiple ? -1 != r.defaultValue.indexOf(e.props.value) : r.defaultValue == e.props.value;
            }))), t.class && !t.className ? (r.class = t.class, Object.defineProperty(r, "className", Ge)) : (t.className && !t.class || t.class && t.className) && (r.class = r.className = t.className), 
            e.props = r;
        }(e), e.$$typeof = De, Je && Je(e);
    };
    var Ye = o.__r;
    o.__r = function(e) {
        Ye && Ye(e), ze = e.__c;
    };
    var Ze = o.diffed;
    o.diffed = function(e) {
        Ze && Ze(e);
        var t = e.props, n = e.__e;
        null != n && "textarea" === e.type && "value" in t && t.value !== n.value && (n.value = null == t.value ? "" : t.value), 
        ze = null;
    };
    function Qe(e) {
        return !!e && e.$$typeof === De;
    }
    function Xe(e) {
        return Qe(e) ? z.apply(null, arguments) : e;
    }
    function Ke(e) {
        return !!e.__k && (V(null, e), !0);
    }
    function et(e) {
        e();
    }
    function tt(e) {
        var t, n, r = e.v, o = e.__;
        try {
            var i = r();
            return !((t = o) === (n = i) && (0 !== t || 1 / t == 1 / n) || t != t && n != n);
        } catch (e) {
            return !0;
        }
    }
    var nt = {
        useState: le,
        useId: function() {
            var e = ae(G++, 11);
            if (!e.__) {
                for (var t = J.__v; null !== t && !t.__m && null !== t.__; ) t = t.__;
                var n = t.__m || (t.__m = [ 0, 0 ]);
                e.__ = "P" + n[0] + "-" + n[1]++;
            }
            return e.__;
        },
        useReducer: ue,
        useEffect: ce,
        useLayoutEffect: _e,
        useInsertionEffect: _e,
        useTransition: function() {
            return [ !1, et ];
        },
        useDeferredValue: function(e) {
            return e;
        },
        useSyncExternalStore: function(e, t) {
            var n = t(), r = le({
                h: {
                    __: n,
                    v: t
                }
            }), o = r[0].h, i = r[1];
            return _e((function() {
                o.__ = n, o.v = t, tt(o) && i({
                    h: o
                });
            }), [ e, n, t ]), ce((function() {
                return tt(o) && i({
                    h: o
                }), e((function() {
                    tt(o) && i({
                        h: o
                    });
                }));
            }), [ e ]), n;
        },
        startTransition: et,
        useRef: function(e) {
            return Q = 5, fe((function() {
                return {
                    current: e
                };
            }), []);
        },
        useImperativeHandle: function(e, t, n) {
            Q = 6, _e((function() {
                return "function" == typeof e ? (e(t()), function() {
                    return e(null);
                }) : e ? (e.current = t(), function() {
                    return e.current = null;
                }) : void 0;
            }), null == n ? n : n.concat(e));
        },
        useMemo: fe,
        useCallback: function(e, t) {
            return Q = 8, fe((function() {
                return e;
            }), t);
        },
        useContext: function(e) {
            var t = J.context[e.__c], n = ae(G++, 9);
            return n.c = e, t ? (null == n.__ && (n.__ = !0, t.sub(J)), t.props.value) : e.__;
        },
        useDebugValue: function(e, t) {
            ee.useDebugValue && ee.useDebugValue(t ? t(e) : e);
        },
        version: "17.0.2",
        Children: Ce,
        render: function(e, t, n) {
            return null == t.__k && (t.textContent = ""), V(e, t), "function" == typeof n && n(), 
            e ? e.__c : null;
        },
        hydrate: function(e, t, n) {
            return $(e, t), "function" == typeof n && n(), e ? e.__c : null;
        },
        unmountComponentAtNode: Ke,
        createPortal: Te,
        createElement: k,
        createContext: function(e, t) {
            var n = {
                __c: t = "__cC" + c++,
                __: e,
                Consumer: function(e, t) {
                    return e.children(t);
                },
                Provider: function(e) {
                    var n, r;
                    return this.getChildContext || (n = [], (r = {})[t] = this, this.getChildContext = function() {
                        return r;
                    }, this.shouldComponentUpdate = function(e) {
                        this.props.value !== e.value && n.some((function(e) {
                            e.__e = !0, M(e);
                        }));
                    }, this.sub = function(e) {
                        n.push(e);
                        var t = e.componentWillUnmount;
                        e.componentWillUnmount = function() {
                            n.splice(n.indexOf(e), 1), t && t.call(e);
                        };
                    }), e.children;
                }
            };
            return n.Provider.__ = n.Consumer.contextType = n;
        },
        createFactory: function(e) {
            return k.bind(null, e);
        },
        cloneElement: Xe,
        createRef: function() {
            return {
                current: null
            };
        },
        Fragment: x,
        isValidElement: Qe,
        isElement: Qe,
        isFragment: function(e) {
            return Qe(e) && e.type === x;
        },
        findDOMNode: function(e) {
            return e && (e.base || 1 === e.nodeType && e) || null;
        },
        Component: w,
        PureComponent: Ee,
        memo: function(e, t) {
            function n(e) {
                var n = this.props.ref, r = n == e.ref;
                return !r && n && (n.call ? n(null) : n.current = null), t ? !t(this.props, e) || !r : ke(this.props, e);
            }
            function r(t) {
                return this.shouldComponentUpdate = n, k(e, t);
            }
            return r.displayName = "Memo(" + (e.displayName || e.name) + ")", r.prototype.isReactComponent = !0, 
            r.__f = !0, r;
        },
        forwardRef: function(e) {
            function t(t) {
                var n = ge({}, t);
                return delete n.ref, e(n, t.ref || null);
            }
            return t.$$typeof = we, t.render = t, t.prototype.isReactComponent = t.__f = !0, 
            t.displayName = "ForwardRef(" + (e.displayName || e.name) + ")", t;
        },
        flushSync: function(e, t) {
            return e(t);
        },
        unstable_batchedUpdates: function(e, t) {
            return e(t);
        },
        StrictMode: x,
        Suspense: Ne,
        SuspenseList: Pe,
        lazy: function(e) {
            var t, n, r;
            function o(o) {
                if (t || (t = e()).then((function(e) {
                    n = e.default || e;
                }), (function(e) {
                    r = e;
                })), r) throw r;
                if (!n) throw t;
                return k(n, o);
            }
            return o.displayName = "Lazy", o.__f = !0, o;
        },
        __SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED: {
            ReactCurrentDispatcher: {
                current: {
                    readContext: function(e) {
                        return ze.__n[e.__c].props.value;
                    }
                }
            }
        }
    };
    var rt = (e, t) => {
        let n = document.createElement("div");
        if ("string" == typeof t) if (document.getElementById(t)) t = document.getElementById(t); else {
            const e = document.createElement("div");
            e.setAttribute("id", t), (t = e).style.position = "fixed", t.style.bottom = "20px", 
            t.style.right = "30px", t.style.display = "flex", t.style.flexDirection = "column-reverse", 
            t.style.overflowX = "hidden", t.style.overflowY = "scroll", t.style.zIndex = "100000", 
            t.style.maxHeight = "95%", document.body.appendChild(t);
        }
        function r() {
            n && (Ke(n), n = null);
        }
        return V(Te(Xe(e, {
            unmountLayer: r
        }), t), n), r;
    }, ot = n(9), it = n.n(ot), st = n(3), at = n.n(st);
    function lt(e, t) {
        if (null == e) return {};
        var n, r, o = function(e, t) {
            if (null == e) return {};
            var n, r, o = {}, i = Object.keys(e);
            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || (o[n] = e[n]);
            return o;
        }(e, t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (r = 0; r < i.length; r++) n = i[r], t.indexOf(n) >= 0 || Object.prototype.propertyIsEnumerable.call(e, n) && (o[n] = e[n]);
        }
        return o;
    }
    const ut = [ "hoverText", "children" ];
    function ct() {
        return (ct = Object.assign ? Object.assign.bind() : function(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = arguments[t];
                for (var r in n) Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
            }
            return e;
        }).apply(this, arguments);
    }
    const _t = {
        position: "relative"
    };
    var ft = nt.memo(e => {
        let {hoverText: t, children: n} = e, r = lt(e, ut);
        const o = nt.useRef(), [i, s] = nt.useState(!1), a = nt.useCallback(() => s(!0), []), l = nt.useCallback(() => s(!1), []);
        return nt.createElement("div", ct({
            onmouseenter: a,
            onmouseout: l,
            style: _t
        }, r), nt.createElement("div", {
            ref: o,
            className: at()("div-hover", i ? "show" : "hide")
        }, t), n);
    });
    function pt(e) {
        return (pt = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }
    function dt(e) {
        var t = function(e, t) {
            if ("object" != pt(e) || !e) return e;
            var n = e[Symbol.toPrimitive];
            if (void 0 !== n) {
                var r = n.call(e, t || "default");
                if ("object" != pt(r)) return r;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
        }(e, "string");
        return "symbol" == pt(t) ? t : String(t);
    }
    function ht(e, t, n) {
        return (t = dt(t)) in e ? Object.defineProperty(e, t, {
            value: n,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = n, e;
    }
    const mt = {
        isEnabled: !1,
        groups: [ {
            dir: "pictures",
            formats: [ "jpg", "jpeg", "png", "gif", "svg", "bmp", "ico", "webp" ]
        }, {
            dir: "music",
            formats: [ "mp3", "aac", "wav", "ogg", "flac", "wma", "m4a", "m4p" ]
        }, {
            dir: "videos",
            formats: [ "mkv", "avi", "3gp", "3g2", "mov", "flv", "mp4", "m4v", "mpg", "mpeg", "webm", "ogv" ]
        } ]
    };
    function vt(e, t, n) {
        p.a.sendMessage({
            action: "track",
            t: "event",
            ec: e,
            ea: t,
            el: n,
            tid: "G-4WQE4RFM8F"
        });
    }
    function bt(e, t) {
        var n = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var r = Object.getOwnPropertySymbols(e);
            t && (r = r.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), n.push.apply(n, r);
        }
        return n;
    }
    function yt(e) {
        for (var t = 1; t < arguments.length; t++) {
            var n = null != arguments[t] ? arguments[t] : {};
            t % 2 ? bt(Object(n), !0).forEach((function(t) {
                ht(e, t, n[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : bt(Object(n)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
            }));
        }
        return e;
    }
    const gt = {
        groups: [],
        isEnabled: !1
    }, kt = "initOption", Et = [ kt, "startEdit" ];
    function xt(e, t) {
        const n = function(e, t) {
            switch (t.type) {
              case kt:
                return vt("menu", "click", "settings"), {
                    groups: t.groups,
                    isEnabled: t.isEnabled
                };

              case "toggleEnable":
                return vt("settings", "sort_downloads", t.isEnabled ? "check" : "uncheck"), yt(yt({}, e), {}, {
                    isEnabled: t.isEnabled
                });

              case "resetOption":
                return vt("sort_downloads", "click", "reset"), yt(yt({}, mt), {}, {
                    isEnabled: e.isEnabled
                });

              case "addItem":
                return vt("sort_downloads", "click", "add"), yt(yt({}, e), {}, {
                    groups: [ ...e.groups, {
                        dir: "my-folder",
                        formats: []
                    } ]
                });

              case "removeItem":
                return e.groups[t.id] && vt("sort_downloads", "delete", e.groups[t.id].dir), yt(yt({}, e), {}, {
                    groups: [ ...e.groups.filter((e, n) => n !== t.id) ]
                });

              case "startEdit":
                return e.groups[t.id] && vt("sort_downloads", "edit", e.groups[t.id].dir), yt({}, e);

              case "saveItem":
                {
                    const n = e.groups.map((e, n) => {
                        if (t.id === n) {
                            t.dir !== e.dir && vt("sort_downloads", "rename_folder", `${e.dir} ${t.dir}`);
                            const n = () => !t.formats.every(t => e.formats.includes(t));
                            if (t.formats.length !== e.formats.length || n()) {
                                vt("sort_downloads", "add_format", `${t.dir}, ${e.formats.join(" ")}, ${t.formats.join(" ")}`);
                            }
                            return {
                                formats: t.formats,
                                dir: t.dir
                            };
                        }
                        return yt({}, e);
                    });
                    return yt(yt({}, e), {}, {
                        groups: n
                    });
                }

              default:
                return e;
            }
        }(e, t);
        var r, o;
        return Et.includes(t.type) || (r = n.isEnabled, o = n.groups, p.a.sendMessage({
            action: "updateOption",
            key: "sortDownloads",
            value: {
                isEnabled: r,
                groups: o
            }
        })), n;
    }
    var wt = e => {
        let {locals: t, use: n, unuse: r} = e;
        return nt.useMemo(n, []), nt.useEffect(() => r, []), t;
    };
    const St = nt.createContext(), Ct = {
        marginBottom: 15
    }, Mt = nt.memo(e => {
        let {options: t} = e;
        wt(it.a);
        const [n, r] = nt.useReducer(xt, gt), o = nt.useCallback(e => {
            e.preventDefault(), r({
                type: "addItem"
            });
        }, []), i = nt.useCallback(e => {
            e.preventDefault(), r({
                type: "resetOption"
            });
        }, []), s = nt.useCallback(e => {
            r({
                type: "toggleEnable",
                isEnabled: e.target.checked
            });
        }, []);
        return nt.useMemo(() => {
            r({
                type: kt,
                groups: t.groups,
                isEnabled: t.isEnabled
            });
        }, []), nt.createElement(St.Provider, {
            value: {
                state: n,
                dispatch: r
            }
        }, nt.createElement("div", {
            style: Ct
        }, nt.createElement("label", null, nt.createElement("input", {
            type: "checkbox",
            onClick: s,
            checked: n.isEnabled ? 1 : 0
        }), nt.createElement("span", null, p.a.i18n.getMessage("options_management")))), nt.createElement("div", {
            className: at()("sf-table", !n.isEnabled && "sf-disabled")
        }, nt.createElement("div", {
            className: "sf-table-row-head"
        }, nt.createElement(ft, {
            className: "sf-table-cell",
            hoverText: p.a.i18n.getMessage("optionsDirectory")
        }, p.a.i18n.getMessage("options_Directory_title")), nt.createElement(ft, {
            className: "sf-table-cell",
            hoverText: p.a.i18n.getMessage("optionsFormats")
        }, p.a.i18n.getMessage("options_Formats_title")), nt.createElement("div", {
            className: "sf-table-cell"
        }, p.a.i18n.getMessage("options_Actions_title"))), nt.createElement("div", {
            className: "sf-table-body"
        }, n.groups.map((e, t) => nt.createElement(Ot, {
            group: e,
            id: t,
            key: t.toString()
        })))), nt.createElement("div", {
            className: at()("sf-group-buttons", !n.isEnabled && "sf-disabled")
        }, nt.createElement("button", {
            className: "sf-btn",
            onClick: o
        }, p.a.i18n.getMessage("options_button_add")), nt.createElement("button", {
            className: "sf-btn",
            onClick: i
        }, p.a.i18n.getMessage("options_button_reset"))));
    }), Ot = nt.memo(e => {
        let {id: t, group: n} = e;
        const {dispatch: r} = nt.useContext(St), [o, i] = nt.useState(!1), s = nt.useCallback(e => {
            e.preventDefault(), e.stopPropagation(), r({
                type: "removeItem",
                id: t
            });
        }, []), a = nt.useCallback(e => {
            e.preventDefault(), e.stopPropagation(), i(!1);
        }, []), l = nt.useCallback(e => {
            e.preventDefault(), e.stopPropagation(), r({
                type: "startEdit",
                id: t
            }), i(!0);
        }, []), u = nt.useCallback(e => {
            e.preventDefault(), e.stopPropagation();
            const n = e.target, o = /[.,!:;\/_+=']/g;
            let s = n.elements.dir.value, a = n.elements.formats.value;
            s = s.replace(o, ""), a = a.replace(o, "").split(" ").filter(Boolean), r({
                type: "saveItem",
                id: t,
                dir: s,
                formats: a
            }), i(!1);
        }, []), c = nt.useMemo(() => 0 === n.formats.length, [ n ]);
        return nt.createElement("form", {
            className: "sf-table-row",
            onSubmit: u
        }, nt.createElement("div", {
            className: "sf-table-cell"
        }, nt.createElement(Nt, {
            name: "dir",
            input: n.dir,
            editable: o,
            type: 1
        })), nt.createElement("div", {
            className: "sf-table-cell"
        }, (o || !c) && nt.createElement(Nt, {
            name: "formats",
            input: n.formats,
            editable: o,
            type: 0
        }), !o && c && nt.createElement("span", {
            className: "text-muted"
        }, p.a.i18n.getMessage("options_no_type_msg"))), nt.createElement("div", {
            className: "sf-table-cell"
        }, !o && nt.createElement("div", null, nt.createElement("button", {
            className: "sf-btn",
            onClick: l
        }, p.a.i18n.getMessage("options_button_edit")), nt.createElement("button", {
            className: "sf-btn",
            onClick: s
        }, p.a.i18n.getMessage("options_button_delete"))), o && nt.createElement("div", null, nt.createElement("button", {
            className: "sf-btn",
            type: "submit"
        }, p.a.i18n.getMessage("options_button_save")), nt.createElement("button", {
            className: "sf-btn",
            onClick: a
        }, p.a.i18n.getMessage("options_button_cancel")))));
    }), Nt = nt.memo(e => {
        let {name: t, input: n, editable: r, type: o} = e;
        return nt.createElement("div", null, r && nt.createElement("input", {
            type: "text",
            name: t,
            className: "sf-input",
            value: 0 === o ? n.join(" ") : n
        }), !r && 0 === o && n.map(e => nt.createElement("div", {
            className: "sf-badge"
        }, e)), !r && 1 === o && nt.createElement("div", null, n));
    });
    var Lt = Mt;
    f.a.use();
    const Pt = [];
    p.a.onDestroy.addListener(() => {
        f.a.unuse(), Pt.forEach(e => e());
    }), function(e) {
        e = e || document.body;
        var t = {};
        var n = function(t, n) {
            var r = e.querySelector("#" + t);
            r && (r.style.display = n ? "none" : "");
        }, r = function(e) {
            var t = e.target;
            p.a.sendMessage({
                action: "updateOption",
                key: t.id,
                value: t.checked
            });
        }, o = function() {
            var o, i, s, a;
            for (i = 0, s = (a = e.querySelectorAll("*[data-i18n]")).length; i < s; i++) (o = a[i]).textContent = p.a.i18n.getMessage(o.dataset.i18n);
            t.hasSovetnik || n("blockSovetnikEnabled", !0), t.showUmmyItem || n("blockUmmyInfo", !0);
            {
                const t = d.a.create("div", {
                    id: "blockFfmpegEnabled",
                    class: "sf-block",
                    append: [ d.a.create("label", {
                        append: [ d.a.create("input", {
                            type: "checkbox",
                            id: "ffmpegEnabled",
                            checked: !1
                        }), String.fromCharCode(160), d.a.create("span", {
                            text: p.a.i18n.getMessage("optionsFfmpegEnabled")
                        }) ]
                    }) ]
                }), n = e.querySelector(".sf-options-container .sf-clear");
                n.parentNode.insertBefore(t, n);
            }
            for (p.a.isFirefox && function() {
                var t = "blockSaveAsDialogEnabled";
                if (!e.querySelector("#" + t)) {
                    var n = d.a.create("div", {
                        id: t,
                        class: "sf-block",
                        append: [ d.a.create("label", {
                            append: [ d.a.create("input", {
                                type: "checkbox",
                                id: "saveAsDialog",
                                checked: !1
                            }), String.fromCharCode(160), d.a.create("span", {
                                text: p.a.i18n.getMessage("optionsSaveAsDialog")
                            }) ]
                        }) ]
                    }), r = e.querySelector(".sf-options-container .sf-block");
                    r.parentNode.insertBefore(n, r);
                }
            }(), i = 0, s = (a = e.querySelectorAll('form input[type="checkbox"]')).length; i < s; i++) (o = a[i]).id && void 0 !== t[o.id] && (o.checked = !!t[o.id], 
            o.addEventListener("change", r, !1));
            if (p.a.isGM) {
                for (i = 0, s = (a = e.querySelectorAll(".sf-browser.sf-userscript")).length; i < s; i++) (o = a[i]).style.display = "block";
                if ("undefined" != typeof GM_download) {
                    const t = e.querySelector("#blockGmNativeDownload");
                    t && (t.style.display = "block");
                }
            }
            if (t.sortDownloads) {
                const n = rt(k(Lt, {
                    options: t.sortDownloads
                }), e.querySelector("#sortDownloads"));
                Pt.push(n);
            }
        };
        p.a.callFn("getPreferences").then(n => {
            t = n, o(), e.classList.remove("loading");
        }), setTimeout((function() {
            e.classList.remove("loading");
        }), 1e3);
    }(p.a.container);
} ]);