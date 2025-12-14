!function(e) {
    var t = {};
    function n(o) {
        if (t[o]) return t[o].exports;
        var i = t[o] = {
            i: o,
            l: !1,
            exports: {}
        };
        return e[o].call(i.exports, i, i.exports, n), i.l = !0, i.exports;
    }
    n.m = e, n.c = t, n.d = function(e, t, o) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
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
        var o = Object.create(null);
        if (n.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) n.d(o, i, function(t) {
            return e[t];
        }.bind(null, i));
        return o;
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 14);
}([ function(e, t, n) {
    "use strict";
    var o = class {
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
    var i = e => class extends e {
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
                        const o = n[0];
                        o && o.id >= 0 ? t ? chrome.tabs.sendMessage(o.id, e, e => {
                            this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
                        }) : chrome.tabs.sendMessage(o.id, e) : (this.lastError = new Error("Active tab is not found"), 
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
            this.storage = new o(this);
        }
    };
    var r = class {
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
            this.onDestroy = new r, this._lastErrorFired = !1, this._lastError = null;
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
    const c = n(5);
    var u = e => class extends e {
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
                            const t = c(e.err);
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
    var d = e => class extends e {};
    var f = e => class extends(d(e)){};
    class m extends(f(u(l(a)))){}
    var p = m;
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
    var A = e => class extends(h(e)){};
    class g extends(A(i(p))){
        constructor() {
            super(), this.initMessages(), this.initStorage(), this.initI18n();
        }
    }
    const b = new g;
    t.a = b;
}, function(e, t, n) {
    "use strict";
    const o = {
        on: function(e, t, n, o) {
            e.addEventListener(t, n, o);
        },
        off: function(e, t, n, o) {
            e.removeEventListener(t, n, o);
        },
        one: function(e, t, n, i) {
            const r = [ "oneFn", t, !!i ].join("_");
            let s = n[r];
            s || (n[r] = s = function(e) {
                o.off(this, t, s, i), n.apply(this, arguments);
            }), o.on(e, t, s, i), e = null;
        }
    }, i = "sf-removed-" + Math.floor(1e6 * Math.random()), r = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
    o.onRemoveEventName = i, o.onRemoveClassName = r, o.onRemoveListener = function(e) {
        o.trigger(e, i, {
            cancelable: !0,
            bubbles: !1
        });
    }, o.onRemoveEvent = (e, t) => {
        e.classList.add(r), e.addEventListener(i, t);
    }, o.offRemoveEvent = function(e, t) {
        e.removeEventListener(o.onRemoveEventName, t);
    }, o.trigger = function(e, t, n) {
        void 0 === n && (n = {}), void 0 === n.bubbles && (n.bubbles = !1), void 0 === n.cancelable && (n.cancelable = !1);
        let o = null;
        o = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, n) : new CustomEvent(t, n), 
        e.dispatchEvent(o);
    };
    var s = o;
    const a = {
        create: function(e, t) {
            let n, o;
            n = "object" != typeof e ? document.createElement(e) : e;
            for (let e in t) {
                const i = t[e];
                (o = l[e]) ? o(n, i) : n[e] = i;
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
            if (Array.isArray(t)) for (let n = 0, o = t.length; n < o; n++) e.classList.add(t[n]); else e.setAttribute("class", t);
        },
        style: function(e, t) {
            if ("object" == typeof t) for (let n in t) {
                let o = n;
                "float" === o && (o = "cssFloat");
                const i = t[n];
                if (Array.isArray(i)) for (let t = 0, n = i.length; t < n; t++) e.style[o] = i[t]; else e.style[o] = i;
            } else e.setAttribute("style", t);
        },
        append: function(e, t) {
            Array.isArray(t) || (t = [ t ]);
            for (let n = 0, o = t.length; n < o; n++) {
                let o = t[n];
                (o || 0 === o) && ("object" != typeof o && (o = document.createTextNode(o)), e.appendChild(o));
            }
        },
        on: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, o = t.length; n < o; n++) {
                const o = t[n];
                Array.isArray(o) && s.on.apply(s, [ e ].concat(o));
            }
        },
        one: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let n = 0, o = t.length; n < o; n++) {
                const o = t[n];
                Array.isArray(o) && s.one.apply(s, [ e ].concat(o));
            }
        },
        onCreate: function(e, t) {
            t.call(e, e);
        },
        attr: function(e, t) {
            let n, o;
            for (n in t) o = t[n], e.setAttribute(n, o);
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
                    var n = e[1] || "", o = e[3];
                    if (!o) return n;
                    if (t && "function" == typeof btoa) {
                        var i = (s = o, a = btoa(unescape(encodeURIComponent(JSON.stringify(s)))), l = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(a), 
                        "/*# ".concat(l, " */")), r = o.sources.map((function(e) {
                            return "/*# sourceURL=".concat(o.sourceRoot || "").concat(e, " */");
                        }));
                        return [ n ].concat(r).concat([ i ]).join("\n");
                    }
                    var s, a, l;
                    return [ n ].join("\n");
                }(t, e);
                return t[2] ? "@media ".concat(t[2], " {").concat(n, "}") : n;
            })).join("");
        }, t.i = function(e, n, o) {
            "string" == typeof e && (e = [ [ null, e, "" ] ]);
            var i = {};
            if (o) for (var r = 0; r < this.length; r++) {
                var s = this[r][0];
                null != s && (i[s] = !0);
            }
            for (var a = 0; a < e.length; a++) {
                var l = [].concat(e[a]);
                o && i[l[0]] || (n && (l[2] ? l[2] = "".concat(n, " and ").concat(l[2]) : l[2] = n), 
                t.push(l));
            }
        }, t;
    };
}, , function(e, t, n) {
    "use strict";
    var o, i = function() {
        return void 0 === o && (o = Boolean(window && document && document.all && !window.atob)), 
        o;
    }, r = function() {
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
        for (var n = {}, o = [], i = 0; i < e.length; i++) {
            var r = e[i], l = t.base ? r[0] + t.base : r[0], c = n[l] || 0, u = "".concat(l, " ").concat(c);
            n[l] = c + 1;
            var d = a(u), f = {
                css: r[1],
                media: r[2],
                sourceMap: r[3]
            };
            -1 !== d ? (s[d].references++, s[d].updater(f)) : s.push({
                identifier: u,
                updater: A(f, t),
                references: 1
            }), o.push(u);
        }
        return o;
    }
    function c(e) {
        var t = document.createElement("style"), o = e.attributes || {};
        if (void 0 === o.nonce) {
            var i = n.nc;
            i && (o.nonce = i);
        }
        if (Object.keys(o).forEach((function(e) {
            t.setAttribute(e, o[e]);
        })), "function" == typeof e.insert) e.insert(t); else {
            var s = r(e.insert || "head");
            if (!s) throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
            s.appendChild(t);
        }
        return t;
    }
    var u, d = (u = [], function(e, t) {
        return u[e] = t, u.filter(Boolean).join("\n");
    });
    function f(e, t, n, o) {
        var i = n ? "" : o.media ? "@media ".concat(o.media, " {").concat(o.css, "}") : o.css;
        if (e.styleSheet) e.styleSheet.cssText = d(t, i); else {
            var r = document.createTextNode(i), s = e.childNodes;
            s[t] && e.removeChild(s[t]), s.length ? e.insertBefore(r, s[t]) : e.appendChild(r);
        }
    }
    function m(e, t, n) {
        var o = n.css, i = n.media, r = n.sourceMap;
        if (i ? e.setAttribute("media", i) : e.removeAttribute("media"), r && "undefined" != typeof btoa && (o += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(r)))), " */")), 
        e.styleSheet) e.styleSheet.cssText = o; else {
            for (;e.firstChild; ) e.removeChild(e.firstChild);
            e.appendChild(document.createTextNode(o));
        }
    }
    var p = null, h = 0;
    function A(e, t) {
        var n, o, i;
        if (t.singleton) {
            var r = h++;
            n = p || (p = c(t)), o = f.bind(null, n, r, !1), i = f.bind(null, n, r, !0);
        } else n = c(t), o = m.bind(null, n, t), i = function() {
            !function(e) {
                if (null === e.parentNode) return !1;
                e.parentNode.removeChild(e);
            }(n);
        };
        return o(e), function(t) {
            if (t) {
                if (t.css === e.css && t.media === e.media && t.sourceMap === e.sourceMap) return;
                o(e = t);
            } else i();
        };
    }
    e.exports = function(e, t) {
        (t = t || {}).singleton || "boolean" == typeof t.singleton || (t.singleton = i());
        var n = l(e = e || [], t);
        return function(e) {
            if (e = e || [], "[object Array]" === Object.prototype.toString.call(e)) {
                for (var o = 0; o < n.length; o++) {
                    var i = a(n[o]);
                    s[i].references--;
                }
                for (var r = l(e, t), c = 0; c < n.length; c++) {
                    var u = a(n[c]);
                    0 === s[u].references && (s[u].updater(), s.splice(u, 1));
                }
                n = r;
            }
        };
    };
}, function(e, t, n) {
    var o = n(6).default;
    e.exports = o;
}, function(e, t, n) {
    "use strict";
    Object.defineProperty(t, "__esModule", {
        value: !0
    });
    var o = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e;
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
    };
    function i(e) {
        return e && "object" === (void 0 === e ? "undefined" : o(e)) && "string" == typeof e.name && "string" == typeof e.message;
    }
    t.default = function(e) {
        return i(e) ? Object.assign(new Error, {
            stack: void 0
        }, e) : e;
    }, t.isSerializedError = i;
}, function(e, t, n) {
    var o = n(4), i = n(10);
    "string" == typeof (i = i.__esModule ? i.default : i) && (i = [ [ e.i, i, "" ] ]);
    var r, s = 0, a = {
        injectType: "lazyStyleTag",
        insert: "head",
        singleton: !1
    }, l = {};
    l.locals = i.locals || {}, l.use = function() {
        return s++ || (r = o(i, a)), l;
    }, l.unuse = function() {
        s > 0 && !--s && (r(), r = null);
    }, e.exports = l;
}, , , function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(2), i = n.n(o)()(!1);
    i.push([ e.i, ".sf-menu-container{width:482px;font:12px/17px Tahoma,Helvetica,OpenSans,sans-serif;color:#000;background-color:#fff;margin:0;box-sizing:inherit;overflow:hidden;flex-direction:initial}.sf-menu-container.loading>*{visibility:hidden}.sf-menu-container>*{box-sizing:inherit;flex-direction:initial}.sf-menu-container p{font-size:12px}.sf-menu-container div.sf-menu-desc,.sf-menu-container div.sf-menu-list{display:inline-block;vertical-align:top;float:left}.sf-menu-container div.sf-menu-desc{width:166px;padding:20px 30px;padding-bottom:36px;color:#6a6a6a}.sf-menu-container div.sf-menu-desc a{text-decoration:none;color:#4a90e2}.sf-menu-container div.sf-menu-desc a:not(.social-btn):hover{text-decoration:underline}.sf-menu-container .sf-menu-desc .icon{width:74px;height:74px;display:inline-block;background-size:74px;background-repeat:no-repeat;background-position:center;padding:0;margin:0}.sf-menu-container .sf-menu-desc .version{vertical-align:top;display:inline-block;float:right;margin-right:-30px;width:110px}.sf-menu-container .sf-menu-desc .version>a,.sf-menu-container .sf-menu-desc .version>span{display:block}.sf-menu-container .sf-menu-desc .icon path{fill:#ccc!important}.sf-menu-container .sf-menu-desc .title{font-size:20px;line-height:1.2;font-weight:400;margin-top:14px;margin-bottom:16px}.sf-menu-container .sf-menu-desc .more{position:absolute;bottom:40px}.sf-menu-container .sf-menu-list{height:348px;width:243px;font-size:14px;padding:14px 6px;border-left:1px solid #d8d8d8}.sf-menu-container .sf-menu-list .separator{border-top:1px solid #d8d8d8;margin-top:10px;margin-bottom:9px;margin-left:59px}.sf-menu-container .sf-menu-list .manual-container .label{font-size:12px!important}.sf-menu-container .sf-menu-list .manual-container a{color:#000}.sf-menu-container .sf-menu-list .manual-container a:hover{color:#fff}.sf-menu-container .sf-menu-list .manual-container .icon.rocket{margin-top:12px}.sf-menu-container .sf-menu-list .hidden{display:none!important}.sf-menu-container .sf-menu-list .login-container{display:flex;justify-content:flex-end;margin-bottom:10px;font-family:Roboto,sans-serif}.sf-menu-container .sf-menu-list .login-container .login-btn{display:flex;background:linear-gradient(89deg,#3fa444 73px,#68c66b 183px,rgba(55,158,60,.97) 103.98%) -57px;background-size:300px;padding-top:13px;padding-bottom:7px;color:#fff;cursor:pointer;transition:background-position .8s linear;letter-spacing:.8px;font-size:14px;line-height:.9;width:93%;margin:0 auto;border-radius:7px;font-weight:400}.sf-menu-container .sf-menu-list .login-container .login-btn:hover{background-position:0}.sf-menu-container .sf-menu-list .login-container .login-btn .logo{width:23px;height:20px;margin-right:19px;margin-top:-4px;margin-left:18px}.sf-menu-container .sf-menu-list .login-container .user-info{display:flex;justify-content:space-between;width:233px}.sf-menu-container .sf-menu-list .login-container .user-info--email{width:150px;font-size:12px;font-family:sans-serif;white-space:nowrap;text-overflow:ellipsis;overflow:hidden}.sf-menu-container .sf-menu-list .login-container .user-info--email .helper--label{display:flex;font-size:14px;line-height:1.5;font-weight:700}.sf-menu-container .sf-menu-list .login-container .user-info--email .helper--label svg{width:20px;height:20px;margin-right:7px}.sf-menu-container .sf-menu-list .login-container .user-info--logout{display:flex;justify-content:flex-end;cursor:pointer;width:71px;color:#db0000;font-size:13px;font-family:sans-serif;margin-top:-2px;line-height:1;margin-right:3px}.sf-menu-container .sf-menu-list .login-container .user-info--logout svg{width:14px;margin-right:4px}.sf-menu-container .sf-menu-list .item{height:40px;cursor:pointer;border-radius:5px;margin-top:-2px;margin-bottom:-2px;overflow:hidden;display:block}.sf-menu-container .sf-menu-list .item .icon{margin:0;margin-left:18px;width:24px;height:24px;margin-bottom:8px;margin-top:8px;float:left;display:block;padding:0}.sf-menu-container .sf-menu-list .item .label{padding-left:18px;padding-right:18px;line-height:40px;font-size:14px;white-space:nowrap;width:165px;display:inline-block;text-overflow:ellipsis;overflow:hidden}.sf-menu-container .sf-menu-list .item .label.dbl{line-height:normal;padding-top:2px;white-space:normal;height:40px}.sf-menu-container.no-poll .sf-menu-list div[data-action=openPoll]{display:none}.sf-menu-container.no-poll .sf-menu-list .item .icon{margin-bottom:10px;margin-top:10px}.sf-menu-container.no-poll .sf-menu-list .item{height:44px}.sf-menu-container.no-poll .sf-menu-list .item .label{line-height:44px}.sf-menu-container .sf-menu-list .item:hover{background-color:#597a9e;color:#fff}.sf-menu-container .sf-menu-list .item.inactive{opacity:.5;cursor:default}.sf-menu-container .sf-menu-list .item.inactive .icon path{fill:#c2c2c2!important}.sf-menu-container .sf-menu-list .item.inactive:hover{background-color:#fff;color:#000}.sf-menu-container .sf-menu-list .icon[data-type=showAboutPage]{visibility:hidden}.sf-menu-container .sf-menu-list .sBtn{text-decoration:none}.sf-menu-container .sf-menu-list .sBtn:hover{text-decoration:none}.sf-menu-container .social-block{position:absolute;bottom:20px;height:16px;cursor:default;flex-direction:initial}.sf-menu-container .social-block .social-btn{display:inline-block;width:16px;height:16px;background-position:center;background-repeat:no-repeat;float:initial;margin:initial;padding:initial;list-style:initial}.sf-menu-container .social-block .social-btn:hover{opacity:.8}.sf-menu-container .social-block .social-btn.vk{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAGWSURBVDhPnZDbK8NhGMfff0bGWpJSSi2HMkxCboTk1MghhwtiY2tNISJzaBeaaE65WEJIshvahSKTcm7MKUUOl1+/5+2nvW9ysX3rU8/z9PlevC8zuX36xmn/QbPbj0igDnVZ5YQvVDCwg2zHVkRQh7os176BLNt6VFCXZZq9ECkb3oZrM/CHusk9yfuFpXUsQ6TNtYv/0ju3L7kE07d5INLi3FR1YGzJh86JVbx/fvPdf3YnuQRLbXJDpHl0jcuUxmEvUkxTCFw98H1l91hyCZZicilSmIYhL5cpp9dPOL155nPw8RXp9U7JJVhy1ThE6vtXeIESuLzH/vEl3j6++L7tP5dcgiWVj0DE5FjkMqXGOgNdkRWtAwvqBSjt8Ug+SywZhEit3aOq4DPdbFPhf6m1z0s+Syjug0iNdVZVgZML5QlHV+oG3IZeoCu0ST7TFdqVY5hqi1vV5azvHSKzwiG5BNPmWyESZ+xGTEbTH2Kz2hGfZ5FcgmlyuoPxRguigbpMazQbNIbOkCanSzlEgNLRGs2GHzakmmoMvlqgAAAAAElFTkSuQmCC)}.sf-menu-container .social-block .social-btn.ok{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAILSURBVDhPldFPaNNQHAfwdxdaqxNBVKQO8aIgeBJl4GkMBNlwyI5eNxBByRhTh4iXHRRcxdlNJqNOUQZD3cSpPaTgxlA2UJzS2kMnbZOuabL8bZp8zYtV35un/eBDyI/v95FHiJXpbHMWzy86Sz3YkqBDu8QUzxSt98dhzR/+y/7QBU9Kw3eq8I0C3NworLdHuQzt0C6xXh+BNRcsmux3p+BZEuj4XiN80nHzKS4XCrrEnDkElv15OCxohQxWU2348fICvLoJv+HAenOay1LEfN4Klr46FR5QFoegPj2ISioOu5oLd/p8N5eliPk4DpacFsKwq+Rgi32oL9+md4FrKlCeBPfelCfGxH6wSvcPQMuL4SHsFF5dhvZwH5eliJHcC5Y5eQz5ByexNncVta+zqHyaQjbVA3niBIzxOJeliJ7YA5anFuAZMrSFEZRmLkKaFWB9ewEEf8RZustlKbJxZzdYysp086P5cfV1VKZ7uSxFNoZ3gZW91oLviQ7Ua8VmFVj/+AxfhlpRvNnCZSmi3dqJzYyFZLP6exqaBH2y678cRbQbO8CyM4mw5Nk6sve6UU6Phu++68AY6+CyFFGvbwerlhmHU/2J7Mg5lAZiyF2JQhIfwdVkKMmzXJYiyuC2NXUwij+ylyJY6YuiJPC75d4oyv3/dhTtElmItav9kaI6EMGWBB1ZiLX/Au4A8snC/izyAAAAAElFTkSuQmCC)}.sf-menu-container .social-block .social-btn.fb{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAFJSURBVDhPlYvBK4NxGMeff8VmCUnTettYvaWtJpmJmmJoOAlHB1syS3IQ0fYmjF5p28EOlKy0mVZ22GkXNxdZUQ7Kcb68P/1W9va+b/vU5/J8ni8Foo/iXKRcmo+W0YzKRtmSf7VYdS3k4Zy9a0plo2xJDGbRN32r6+BiDjfFVzw9f9b1LuehbMkxeQUjS5U3NOJbyrJGwvgl9LRPZFCrfbPR+8cXtg4LWD/IQZzJsE62sRT0FPxpNlZIXldgHT6B1ZeAbTTJOvWMyDCSc5Quqxp1Dx1DSz08wRT7oa4BCVrq4Q7I7Ic63fvQ0tIbYnIkuVC/dbj22A+19+/ASI50XkRjozZxG0Zy4vKDqpHFuQkjOfGze1WjVscGjOTETvOqRmYh/GK2r0FPTiyR+99+t2QSwp4WW6hqEkLQciVywfRO7dZvf5uw5wdeN3Dr307RWAAAAABJRU5ErkJggg==)}.sf-menu-container .social-block .social-btn.tw{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAHKSURBVDhPndDPSxRhHAbw9y+ZXTWXMImQhATJk2QGCR67COGlbp3s4tm7qWiJbmVJEkYeDDos+4NKwxQq/IHFbu1uqzIz6OzOvu/O7s7T+33d0cWWYP3CB96Z93nmHV52Z1N0DWw7qwM7DuoiO9Rl/d945vqGQPuXQl2oQ1127XMBV1fPh7qs7aMA6V4roGPleF2tT54UMctIchezqRIGvxdwV/L22ZUoB5lKONjMltH5Qahn0ib9zpdxdqbjpxl2OcRBhtYttXkgXIzIS+qKCdz+JNS76jFFCb0hU3UIa32fB+kLH+KAFysxwJEHZ/i/p2/oHJfeWapDWMtyHuTBWr4S+f+8jdsq72EXl2yQwGsdL7aPUHLdSrT23I8aKu9hgTc5eAZDRiVWe3ZMgcAr/SRPWPNCDp4LLw08jOzjT+70Lrwpll3cWkyfZD2saT4LcmPZxr0Yx/hXGzm6wapJZx30LybROGeqbDXWNCcX0s0lC8+3OH5ZRZi8hJTlIJywMSz/qOVxHI1BQ+XOYg3PLBD/rAHfZAra2E9oo7vQHv2ANpGA/8keGp4eqUwtTJs5TPmD8gPnQF2mBfUe37SV8c1YqIvsaEG95y/ECyN0UoUvcQAAAABJRU5ErkJggg==)}.sf-menu-container .social-block .social-btn.lj{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAF4SURBVDhPY/j//z8Dg0GYKItu+lIm/bQ/bAYZ/5n007czaSRKgOQIYQaQQqDG2x5exf/7kmv/T0ip/e/sVf6fSSfjBjGGMAA1b/QEagZpLE3v+2+Xu/5/UMOe/x7ZM4kyBGTAH5DNZem9/y1zN/0/euUlUPz//yt3X/xXCuwjaAgDk07azx6gAQ65a/9v2H/1//sPH//XLzr33712///8Rff++9VuxmsIA4tOxnw799L/7uWb/585c+Z/9sSD/10qd/2fceL3/5kn/4IxPkMYGDXDeIChfsw4rOX/jKWb/1sX7Phvkbv5f0j7IaIMARMwQxT9O/87lAFdUH0SbEhox2GChsBNghsSOBVsAF5D9DL2YhhAiiEOeUv/s+hlALWgGQDCYEN00g+jG+JYuvW/SfoaOMZpAAhjMwSk6f+FKXCM1wAQRjeEZANAGGQIi3bGHDm/iSgGTOxqAhsAig2sGtExSDE2DMq1WDUQwiCbmXQzdjFqxqoAAJTWdEqr5+cQAAAAAElFTkSuQmCC)}.sf-menu-container .social-block .social-btn.mailru{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAKISURBVDhPldJbSJNhHAbw9/vmYUTiRXQXhjhn3dhyblPxLLmZE6YoOzgdU5fTeZjZtCnZYUvSZZtUWOnIeSqjsiAIuigL6YBXXUTQTTeWeFN0wKibp/d9XZJ15cUPtv/7PP/3+9iIwr9YoDyz9Erpf45toR3WJXLvk9WEloeQNDzYFtZhXSJtuA+JbWELjXsEwWEjXo6n48W1AwgMmZHZGfwvx7pEYp3HHztt07gVKsGvmwTPxtIxeNqAEV8F3oT38tlMsBQ76mc38wyRmKbBxJsn8eiyGiuRRCjqjiHVegKmLidKXN2QGgLQNrfg04yIhdE8xJineIchYnUYTENPM79FZupFk8eB9RsEbyf28IWvx2VYCGbD3mHhmQp3N+8wRDSMgVm+IkPkbA4U9n4eKrY3QTzkQ5zuFK768vksrbYfdwMZuHM+i3cYIupDYNbnCGwuE4ZPHsbiaBrEsiE+F/VBJFV58G2WQG7pg7dHj7WpuOhZiC7Q0SD1lQbsbSYM9pVuLIjOmeSa4/hOL5AbPfB5tfg4Kd08I+wxmcehVNwezoC8shU/6eOWNTXyeUL5AObPqfgr7Kt2Y+miDHP+DH7GELF4AIyhvpqH8iyNKK+twlokBu8mdmM1Eo+noyn4cF2KewEFz+QbrbzDELHAC0bI7UZ44CC/vc5Rif1lVmhNVdAYjNhV6EBfZyHehxPR1VoEIc/DOwwRc+mXKEHdCv/RbPygP+HnafpnojcvX0rClxmCFK0dQuYRCFntm3mGCDld2ELlRHKREY7GEoR6VbjQo0KNRYv43PatuSgiqNtWhKwOuvkvmja+SFA6NrDP/2YY2iWxGqdOyHStCmoXHWwD7cRqnLrfWEQPCw6Z+WcAAAAASUVORK5CYII=)}.sf-menu-container .social-block .social-btn.gp{background-image:url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAAYdEVYdFNvZnR3YXJlAHBhaW50Lm5ldCA0LjAuM4zml1AAAAIfSURBVDhPldL/SxNhHAfw54+RqY0ck2CU7OZM2bm+LKNiEShNyoaxogTJvoAWVAYJBUX9EBRREoqlY4qa1krdpWzOuVW2llvLU2urOXVm2bu7B7x2yQofeB3P5/3w+fDccWTySpUuctXGCbBOnNhLQg0H+YkaE97YDOsi9oi95O3p/Zh+2o53Tcfw8fEdLH+NQVyp6U+Ie1yItN6Ev7pEkprlpX3AVgryYyGJwI0z8BzSY9jCYMC2C4uxz5jno+CObseIkI1VFUnEPL0m35NzeFWhhaeykHILDeN3r9FbzLzolvJVyamIrCbL83MYEQakc1mNdEAi/B7+84fpPtMi4mP8ghWuA1sknGUrPZxyOfHSrEHbDrUkEQ7Jajog7nNj0LwZA/s0lL+xFj+XluCsKZeyVYlwUFaTwcY6pOJfEHMPYfSUBb76asxyz9FzogK9pnw4d2+S+fZhQlYTuzEP94uV6CxnEbheT68+1HAcXdtU6N+pXuNhiVJWk16jCqKu0jx4m87RATHhlfrLNDT/H9JjVMN79giCty9hsqMZv1ZW6JBk8DWe7WXQbdj4T2QxGsao8NFa2HzcYxS4VahEX50VKeFnWoiE0FdWgM7iDRkRR+UePNAq0KHPhaMoF3ZBszYbrWYDvY3v4kmaZ0IeFWRF7bps/K1FGDrjHYbncu2asz+yosTBqth2RsELkM6uy6H//RMTI8vT8G36HPY3WFKiAfgR588AAAAASUVORK5CYII=)}.sf-menu-container .sf-checkbox{float:left;display:block;padding-top:12px;padding-left:16px;padding-bottom:12px;-webkit-user-select:none;-moz-user-select:none;user-select:none}.sf-menu-container.no-poll .sf-checkbox{padding-top:14px}.sf-menu-container .sf-checkbox>i{width:24px;height:14px;display:block;padding:0;border-width:1px;border-style:solid;border-radius:8px;position:relative;border-color:#78c435;background-color:#78c435}.sf-menu-container .sf-checkbox>i>i{display:block;background-color:#fff;border-width:1px;border-style:solid;border-radius:8px;height:12px;width:12px;border-color:#78c435;margin-left:10px}.sf-menu-container .sf-checkbox.sf-transition>i>i{transition:margin-left .2s;-o-transition:none}.sf-menu-container .inactive .sf-checkbox:not(.enableForce)>i,.sf-menu-container .sf-checkbox.disabled>i{border-color:#be3f2e;background-color:#fff}.sf-menu-container .inactive .sf-checkbox:not(.enableForce)>i>i,.sf-menu-container .sf-checkbox.disabled>i>i{height:14px;width:14px;border-color:#be3f2e;margin:-1px}", "" ]), 
    t.default = i;
}, , , , function(e, t, n) {
    "use strict";
    n.r(t);
    var o = n(7), i = n.n(o), r = n(0);
    var s = e => e.charAt(0).toUpperCase() + e.substr(1), a = n(1);
    i.a.use(), r.a.onDestroy.addListener(() => {
        i.a.unuse();
    }), function(e) {
        var t = {}, n = {
            icons: {},
            activeTabInfo: {},
            helperName: ""
        }, o = function(e) {
            if (!this.classList.contains("ignore-action")) {
                e.preventDefault(), e.stopPropagation();
                if (!this.classList.contains("inactive")) {
                    var o, i, s = this.dataset.action, a = this.classList.contains("module");
                    if ("enableModule" === s) return o = n.activeTabInfo, i = n.moduleTrigger.classList.contains("disabled") ? 1 : 0, 
                    o.state = i, b(i, 1), t[o.prefKey] = i, r.a.sendMessage({
                        action: "viaMenu_changeState",
                        state: i ? 1 : 0,
                        prefKey: o.prefKey,
                        moduleName: o.moduleName,
                        needInclude: o.isNotResponse
                    }), o.isNotResponse = !1, void p(o);
                    r.a.sendMessage({
                        action: (a ? "viaMenu_" : "") + s
                    }), r.a.isGM ? r.a.bundle.buttonUi && r.a.bundle.buttonUi.hideMenuItems() : r.a.isSafari ? safari.extension.popovers[0].hide() : window.close();
                }
            }
        }, i = function(t, n) {
            for (var o = e.querySelectorAll("div." + t), i = 0; i < o.length; i++) n ? o[i].classList.remove("inactive") : o[i].classList.add("inactive");
        }, l = function(t, n) {
            if (!n) return i("module", !1);
            for (var o = e.querySelectorAll("div.module"), r = 0; r < o.length; r++) o[r].classList.contains(t) ? o[r].classList.remove("inactive") : o[r].classList.add("inactive");
        }, c = function(e) {
            e.preventDefault(), r.a.openTab(this.href, !0);
        }, u = function() {
            for (var t = e.querySelectorAll('a[href][target="_blank"]'), n = 0, o = t.length; n < o; n++) t[n].removeEventListener("click", c), 
            t[n].addEventListener("click", c);
        }, d = function(e) {
            if (-1 !== [ "odnoklassniki" ].indexOf(e.moduleName) ? i("bookmarklet", !1) : i("bookmarklet", !0), 
            "vk" === e.moduleName && e.url.includes("m.vk.com")) return l(e.moduleName, 0);
            if (l(e.moduleName, e.state), e.state && "youtube" === e.moduleName) {
                var t = e.url, n = /\/playlist\?|[?&]list=/.test(t);
                n || (n = /(user|channel|c|show)\/[^\/]+(\/feed|\/featured|\/videos|$)/i.test(t)), 
                n || (n = /\/(feed)\/(trending|subscriptions|history)/i.test(t)), i("plYoutube", !!n);
            }
        }, f = function(e) {
            var t = !1, n = !1;
            -1 !== [ "savefrom" ].indexOf(e.moduleName) ? n = "force" : e.moduleName && (n = !!e.state, 
            t = !0), i("enableModule", t), b(n);
        }, m = function(e, t) {
            if (n.activeTabInfo = e = e || {}, f(e), d(e), !t) {
                var o = function(t) {
                    for (var n in clearTimeout(i), e.isNotResponse = !t, t) e[n] = t[n];
                    f(e), d(e);
                }, i = setTimeout(o, 250);
                r.a.sendMessage({
                    action: "getActiveTabModuleInfo",
                    url: e.url
                }, o);
            }
        }, p = function(e) {
            n.activeTabInfo = {}, e ? m(e, 1) : r.a.sendMessage({
                action: "getActiveTabInfo"
            }, m);
        }, h = function(e, t) {
            var n = e.querySelector("path");
            if ("hover" === t) n.setAttribute("fill", "#ffffff"); else if ("active" === t) n.setAttribute("fill", "#AAAAAA"); else {
                var o = e.getAttribute("data-type");
                "downloadMP3Files" === o ? n.setAttribute("fill", "#00CCFF") : "downloadPlaylist" === o ? n.setAttribute("fill", "#77D1FA") : "downloadPhotos" === o ? n.setAttribute("fill", "#88cb66") : "showAboutPage" === o ? n.setAttribute("fill", "#ADE61B") : "updateLinks" === o || "downloadFromCurrentPage" === o ? n.setAttribute("fill", "#CB7FBD") : "howActivateHelperPro" === o && n.setAttribute("fill", "#ADE61B");
            }
        }, A = function(e, t) {
            var o = n.desc, i = n.deskText, l = n.descTitel, c = n.descMore;
            o.dataset.page = e;
            var d = n.icons[e], f = o.querySelector(".icon");
            if (d) {
                var m = d.cloneNode(!0);
                h(m, "active"), f && f.parentNode.replaceChild(m, f), f.style.visibility = "visible";
            } else f.style.visibility = "hidden";
            "showAboutPage" === e ? (l.textContent = r.a.i18n.getMessage("aboutTitle"), i.textContent = "", 
            i.appendChild(a.a.create(document.createDocumentFragment(), {
                append: [ a.a.create("p", {
                    text: r.a.i18n.getMessage("aboutDescription")
                }), a.a.create("a", {
                    href: "http://savefrom.net/faq.php#supported_resourses",
                    target: "_blank",
                    text: r.a.i18n.getMessage("aboutSupported"),
                    style: {
                        display: "block"
                    }
                }), a.a.create("a", {
                    href: "http://savefrom.net/user.php?helper=" + n.helperName,
                    target: "_blank",
                    text: r.a.i18n.getMessage("homePage"),
                    style: {
                        display: "block"
                    }
                }) ]
            })), c.style.display = "none") : (l.textContent = t, i.textContent = r.a.i18n.getMessage("menu" + s(e)) || "", 
            c.style.display = "block"), r.a.isSafari && u();
        }, g = function() {
            !function() {
                for (var t = e.querySelectorAll("*[data-i18n]"), n = 0, o = t.length; n < o; n++) {
                    var i = t[n], s = i.dataset.i18n;
                    i.textContent = r.a.i18n.getMessage(s), i.classList.contains("label") && (i.title = r.a.i18n.getMessage(s));
                }
            }(), n.descMore.href = "http://savefrom.net/user.php?helper=" + n.helperName;
            for (var t = e.querySelectorAll("div[data-action]"), i = 0; i < t.length; i++) {
                var s = t[i].querySelector("svg");
                s && (n.icons[t[i].dataset.action] = s, h(s)), "none" !== t[i].style.display && a.a.create(t[i], {
                    on: [ [ "click", o ], [ "mouseenter", function() {
                        var e = this.dataset.action, t = n.icons[e];
                        t && h(t, "hover");
                        var o = this.querySelector("span"), i = o && o.textContent || "";
                        A(e, i);
                    } ], [ "mouseleave", function() {
                        var e = this.dataset.action, t = n.icons[e];
                        t && h(t);
                    } ] ]
                });
            }
            !function() {
                var t = "http://savefrom.net/user.php", n = encodeURIComponent(t), o = encodeURIComponent("http://savefrom.net/img/icon_100.png"), i = encodeURIComponent(r.a.i18n.getMessage("extName")), s = encodeURIComponent(r.a.i18n.getMessage("socialDesc")), a = {
                    vk: {
                        network: "vkontakte",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "VK"),
                        href: "http://vk.com/share.php?url=" + n + "&image=" + o + "&title=" + i + "&description=" + s
                    },
                    ok: {
                        network: "odnoklassniki",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "OK.ru"),
                        href: "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st._surl=" + n + "&st.comments=" + s
                    },
                    mailru: {
                        network: "mail.ru",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Mail.ru"),
                        href: "http://connect.mail.ru/share?url=" + n + "&title=" + i + "&description=" + s + "&imageurl=" + o
                    },
                    tw: {
                        network: "twitter",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Twitter"),
                        href: "https://twitter.com/intent/tweet?text=" + i + "&url=" + n
                    },
                    fb: {
                        network: "facebook",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Facebook"),
                        href: "http://www.facebook.com/sharer.php?s=100&p[url]=" + n + "&p[title]=" + i + "&p[summary]=" + s + "&p[images][0]=" + o
                    },
                    gp: {
                        network: "google+",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Google+"),
                        href: "https://plus.google.com/share?url=" + n
                    },
                    lj: {
                        network: "livejournal",
                        title: r.a.i18n.getMessage("shareIn").replace("%w", "Livejournal"),
                        href: "http://www.livejournal.com/update.bml?subject=" + i + "&event=" + s + " " + n
                    }
                };
                for (var l in a) {
                    var c = e.querySelector(".social-btn." + l);
                    c && (c.title = a[l].title, c.href = a[l].href, c.dataset.network = a[l].network);
                }
                c.parentNode.addEventListener("click", (function(e) {
                    var n = e.target;
                    if (n.classList.contains("social-btn")) {
                        var o = n.dataset.network;
                        r.a.sendMessage({
                            action: "track",
                            t: "social",
                            st: t,
                            sa: "share",
                            sn: o
                        });
                    }
                }));
            }(), r.a.isSafari && u(), A("showAboutPage"), p(), e.classList.remove("loading");
        }, b = function(e, t) {
            t && n.moduleTrigger.classList.add("sf-transition"), "force" === e ? n.moduleTrigger.classList.add("enableForce") : n.moduleTrigger.classList.remove("enableForce"), 
            e ? (n.moduleTrigger.classList.remove("disabled"), n.moduleTrigger.nextElementSibling.textContent = r.a.i18n.getMessage("disableModule")) : (n.moduleTrigger.classList.add("disabled"), 
            n.moduleTrigger.nextElementSibling.textContent = r.a.i18n.getMessage("enableModule")), 
            "showAboutPage" !== n.desc.dataset.page && A("enableModule", e ? r.a.i18n.getMessage("disableModule") : r.a.i18n.getMessage("enableModule"));
        }, v = {
            tutorialSlides: null,
            show: function() {
                if (t.onceShowYtTutorial) {
                    var n = function() {
                        r.a.sendMessage({
                            action: "updateOption",
                            key: "onceShowYtTutorial",
                            value: t.onceShowYtTutorial = 0
                        }), r.a.sendMessage({
                            action: "setIconBadge",
                            text: ""
                        });
                    };
                    return v.tutorialSlides ? v.tutorialSlides.show({
                        container: e,
                        width: 482,
                        height: 404 + (r.a.isGM ? 2 : 0),
                        padding: 4,
                        slideList: v.tutorialSlides.getYtSlideList("black"),
                        onClose: n,
                        trackId: "Menu",
                        boxStyle: {
                            backgroundColor: "transparent"
                        },
                        containerStyle: {
                            borderRadius: "3px",
                            backgroundColor: "rgba(0, 104, 255, 0.9)",
                            padding: 0,
                            margin: "4px",
                            boxShadow: "none"
                        },
                        slideStyle: {
                            backgroundColor: "transparent",
                            borderRadius: 0
                        },
                        leftBtnStyle: {
                            top: "4px",
                            left: "4px"
                        },
                        rightBtnStyle: {
                            top: "4px",
                            right: "4px"
                        },
                        closeBtnStyle: {
                            backgroundColor: "#fff",
                            color: "rgba(0, 104, 255, 0.9)"
                        },
                        cssStyle: {
                            " .sf-dots": {
                                paddingTop: "2px"
                            },
                            " .sf-dot i": {
                                backgroundColor: "#fff"
                            },
                            " .sf-dot.active i": {
                                backgroundColor: "transparent",
                                borderRadius: "6px",
                                margin: "-1px",
                                width: "6px",
                                height: "6px",
                                border: "2px solid #fff"
                            },
                            " .sf-slider-conteiner span": {
                                color: "#fff !important"
                            },
                            " .sf-slider-conteiner a": {
                                color: "#fff !important"
                            }
                        },
                        arrowColor: "#fff",
                        arrowColorActive: "#fff",
                        onResize: function(e) {
                            e.box.style.position = "absolute";
                        },
                        withOpacity: !0,
                        withDelay: 250,
                        onShow: function() {
                            r.a.isSafari && u(), r.a.sendMessage({
                                action: "setIconBadge",
                                text: "?"
                            });
                        }
                    }) : n();
                }
            }
        };
        const x = n => {
            if (t.proEnabled) {
                const e = document.querySelector(".login-container");
                e && e.classList.remove("hidden");
            }
            const o = n.userInfo, i = n.loginUrl, s = e.querySelector(".login-btn"), a = e.querySelector(".user-info"), l = e.querySelector(".user-info--logout"), c = a.querySelector(".helper--label"), u = document.querySelector(".manual-container"), d = e => {
                e.preventDefault();
                const t = document.createElement("a");
                t.target = "_blank", t.href = i, t.click(), setTimeout(() => t.remove());
            }, f = () => r.a.callFn("auth.logout").then(() => x({
                userInfo: void 0,
                loginUrl: i
            }));
            if (s.removeEventListener("click", d), l.removeEventListener("click", f), o || (s.querySelector(".text").textContent = r.a.i18n.getMessage("login"), 
            s.addEventListener("click", d), s.classList.remove("hidden"), a.classList.add("hidden"), 
            u.classList.add("hidden")), o && t && t.proEnabled) {
                if (u.classList.remove("hidden"), s.classList.add("hidden"), a.classList.remove("hidden"), 
                o.email ? c.classList.add("hidden") : c.classList.remove("hidden"), o.email) {
                    a.querySelector(".user-info--email").textContent = o.email;
                }
                l.addEventListener("click", f);
            }
        };
        setTimeout((function() {
            e.classList.remove("loading");
        }), 1e3), n.list = e.querySelector(".sf-menu-list"), n.desc = e.querySelector(".sf-menu-desc"), 
        n.moduleTrigger = e.querySelector(".sf-checkbox"), n.descTitel = n.desc.querySelector(".title"), 
        n.deskText = n.desc.querySelector(".desc"), n.descMore = n.desc.querySelector(".more"), 
        n.list.style.height = n.list.offsetHeight + "px", r.a.sendMessage({
            action: "getMenuDetails"
        }, (function(o) {
            var i, s, l;
            t = o.preferences, n.helperName = o.helperName, i = o.version, s = o.lastVersion, 
            (l = n.desc.querySelector(".version")).textContent = "", l.appendChild(a.a.create("span", {
                text: r.a.i18n.getMessage("aboutVersion") + " " + i
            })), s && s !== i && l.appendChild(a.a.create("a", {
                text: r.a.i18n.getMessage("updateTo").replace("%d", s),
                href: "http://savefrom.net/user.php?helper=" + n.helperName + "&update=" + i,
                target: "_blank"
            })), -1 === [ "en", "uk", "ru" ].indexOf(r.a.i18n.getMessage("lang")) && e.classList.add("no-poll"), 
            x({
                userInfo: o.userInfo,
                loginUrl: o.loginUrl
            }), v.show(), g();
        }));
    }(r.a.container || document.body);
} ]);