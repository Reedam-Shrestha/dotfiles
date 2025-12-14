!function(e) {
    var t = {};
    function r(n) {
        if (t[n]) return t[n].exports;
        var o = t[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return e[n].call(o.exports, o, o.exports, r), o.l = !0, o.exports;
    }
    r.m = e, r.c = t, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        });
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) r.d(n, o, function(t) {
            return e[t];
        }.bind(null, o));
        return n;
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return r.d(t, "a", t), t;
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "", r(r.s = 106);
}([ function(e, t, r) {
    "use strict";
    var n = class {
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
        callback(e, t, r) {
            this.mono.lastError = chrome.runtime.lastError, (r || e) && e(t), this.mono.clearLastError();
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
                    }, r => {
                        const n = r[0];
                        n && n.id >= 0 ? t ? chrome.tabs.sendMessage(n.id, e, e => {
                            this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
                        }) : chrome.tabs.sendMessage(n.id, e) : (this.lastError = new Error("Active tab is not found"), 
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
                onBeforeRequest: (e, t, r) => {
                    chrome.webRequest.onBeforeRequest.addListener(e, t, r);
                },
                removeOnBeforeRequestListener: e => {
                    chrome.webRequest.onBeforeRequest.removeListener(e);
                }
            }, super.initMessages();
        }
        initStorage() {
            this.storage = new n(this);
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
            for (var e = arguments.length, t = new Array(e), r = 0; r < e; r++) t[r] = arguments[r];
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
    }, s = r(3);
    const a = Object(s.a)("mono");
    var c = class {
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
            this._lastError && !this._lastErrorFired && a.error("Unhandled mono.lastError error:", this.lastError), 
            this._lastError = null;
        }
        unimplemented() {
            throw new Error("Unimplemented");
        }
        destroy() {
            this.onDestroy.dispatch();
        }
    };
    var u = e => class extends e {
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
    var l = (e, t) => {
        const r = t.split("."), n = r.pop();
        for (;r.length; ) e = e[r.shift()];
        return {
            scope: e,
            endPoint: n
        };
    };
    const f = r(50), p = Object(s.a)("mono:callFnListener");
    var h = e => class extends e {
        constructor() {
            super(), this.remote = {
                mono: this
            }, this.callFnListener = this.callFnListener.bind(this);
        }
        initMessages() {
            super.initMessages(), this.onMessage.addListener(this.callFnListener);
        }
        responseFn(e, t) {
            const r = Promise.resolve().then(() => {
                const {scope: t, endPoint: r} = l(this.remote, e.fn), n = e.args || [];
                return t[r].apply(t, n);
            });
            return this.responsePromise(r, t);
        }
        responsePromise(e, t) {
            return e.then(e => {
                t({
                    result: e
                });
            }, e => {
                t({
                    err: f(e)
                });
            }).catch((function(e) {
                p.error("responsePromise error", e);
            })), !0;
        }
        callFnListener(e, t, r) {
            switch (e && e.action) {
              case "callFn":
                return this.responseFn(e, r), !0;
            }
        }
        destroy() {
            this.onMessage.removeListener(this.callFnListener), super.destroy();
        }
    };
    var d = e => class extends e {};
    var m = e => class extends(d(e)){
        openTab(e, t) {
            this.unimplemented();
        }
    };
    class g extends(m(h(u(c)))){}
    var y = g;
    var v = e => class extends e {
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
    var b = e => class extends(v(e)){
        openTab(e, t) {
            t = void 0 === t || !!t, chrome.tabs.create({
                url: e,
                active: t
            });
        }
        executeScript(e, t) {
            chrome.tabs.executeScript(e.id, t);
        }
        getActiveTab(e) {
            chrome.tabs.query({
                active: !0,
                currentWindow: !0
            }, t => e(t[0]));
        }
    };
    class w extends(b(o(y))){
        constructor() {
            super(), this.initMessages(), this.initStorage(), this.initI18n();
        }
    }
    const E = new w;
    t.a = E;
}, function(e, t, r) {
    "use strict";
    var n = r(2);
    t.a = e => new Promise((t, r) => {
        Object(n.a)(e, (e, n) => {
            e ? r(e) : t(n);
        });
    });
}, function(e, t, r) {
    "use strict";
    var n = r(3);
    const o = Object(n.a)("webRequest");
    var i = function() {
        const e = /^sf-\d+_/, t = {
            urls: [ "<all_urls>" ],
            types: [ "xmlhttprequest" ]
        };
        let r = !1;
        const n = {}, i = {}, s = function(e) {
            for (let t in e) return !1;
            return !0;
        }, a = function(e) {
            delete i[e.requestId], s(n) && s(i) && l();
        }, c = function(t) {
            const r = i[t.requestId], o = t.requestHeaders || [];
            let a = [], c = [];
            const u = [];
            if (r) c = r.changes, a = r.filtered; else if (!s(n)) {
                let t, r;
                for (let i, s = 0; i = o[s]; s++) t = i.name, e.test(t) && (r = n[t], r && (i.name = r.name, 
                i.value = r.value, c.push(i), a.push(r.name.toLowerCase()), a.push(t.toLowerCase()), 
                /cookie/i.test(i.name) && u.push("set-cookie"), clearTimeout(r.timer), delete n[t]));
            }
            if (c.length) {
                r || (i[t.requestId] = {
                    changes: c,
                    filtered: a,
                    filterResponseHeaders: u
                });
                return {
                    requestHeaders: o.filter((function(e) {
                        return -1 === a.indexOf(e.name.toLowerCase());
                    })).concat(c)
                };
            }
        }, u = function(e) {
            const t = i[e.requestId], r = e.responseHeaders;
            if (t && r) {
                const e = t.filterResponseHeaders;
                return {
                    responseHeaders: r.filter((function(t) {
                        return -1 === e.indexOf(t.name.toLowerCase());
                    }))
                };
            }
        }, l = function() {
            r && (r = !1, chrome.webRequest.onBeforeSendHeaders.removeListener(c, t, [ "blocking", "requestHeaders" ]), 
            chrome.webRequest.onHeadersReceived.removeListener(u, t, [ "blocking", "responseHeaders" ]), 
            chrome.webRequest.onResponseStarted.removeListener(a, t), chrome.webRequest.onErrorOccurred.removeListener(a, t), 
            o.debug("webRequest", "rm listener"));
        };
        let f = 10, p = !1;
        let h = null;
        const d = function(e) {
            return (null === h || e) && (h = !!(chrome.webRequest && chrome.webRequest.onBeforeSendHeaders && chrome.webRequest.onResponseStarted && chrome.webRequest.onErrorOccurred)), 
            h;
        }, m = /^user-agent$|^origin$|^cookie$/i;
        return {
            wrapHeaderKey: function(e, i) {
                if (d()) {
                    let s, l = 100;
                    for (;l-- > 0 && (s = "sf-" + parseInt(1e5 * Math.random()) + "_" + e, n[s]); ) ;
                    return n[s] = {
                        name: e,
                        value: i,
                        timer: setTimeout((function() {
                            delete n[s];
                        }), 3e3)
                    }, r || (r = !0, chrome.webRequest.onBeforeSendHeaders.addListener(c, t, [ "blocking", "requestHeaders" ]), 
                    chrome.webRequest.onHeadersReceived.addListener(u, t, [ "blocking", "responseHeaders" ]), 
                    chrome.webRequest.onResponseStarted.addListener(a, t), chrome.webRequest.onErrorOccurred.addListener(a, t), 
                    o.debug("webRequest", "add listener")), s;
                }
                return e;
            },
            isSpecialHeader: function(e) {
                return m.test(e);
            },
            requestPermission: function(e) {
                d() || p ? e(h) : chrome.permissions && chrome.permissions.request ? chrome.permissions.request({
                    permissions: [ "webRequest", "webRequestBlocking" ]
                }, (function(t) {
                    (t || f-- <= 0) && (p = !0), t && d(!0), e(h);
                })) : (p = !0, e(h));
            }
        };
    }();
    const s = r(8), a = function(e) {
        e = e.split(/\r?\n/);
        const t = {};
        return e.forEach((function(e) {
            const r = e.indexOf(":");
            if (-1 === r) return;
            const n = e.substr(0, r).trim().toLowerCase(), o = e.substr(r + 1).trim();
            t[n] = o;
        })), t;
    };
    t.a = function(e, t) {
        const r = {};
        let n = function(e, r) {
            n = null, f.timeoutTimer && clearTimeout(f.timeoutTimer);
            let i = null;
            e && (i = String(e.message || e) || "ERROR"), t && t(i, o(r), r);
        };
        const o = function(e) {
            const t = {};
            t.statusCode = h.status, t.statusText = h.statusText;
            let r = null;
            const n = h.getAllResponseHeaders();
            return "string" == typeof n && (r = a(n)), t.headers = r || {}, t.body = e, t.responseURL = h.responseURL, 
            t;
        };
        "object" != typeof e && (e = {
            url: e
        });
        let c = e.url, u = e.method || e.type || "GET";
        u = u.toUpperCase();
        let l = e.data;
        "string" != typeof l && (l = s.stringify(l)), l && "GET" === u && (c += (/\?/.test(c) ? "&" : "?") + l, 
        l = void 0), !1 === e.cache && -1 !== [ "GET", "HEAD" ].indexOf(u) && (c += (/\?/.test(c) ? "&" : "?") + "_=" + Date.now()), 
        e.headers = e.headers || {}, l && (e.headers["Content-Type"] = e.contentType || e.headers["Content-Type"] || "application/x-www-form-urlencoded; charset=UTF-8");
        const f = {};
        f.url = c, f.method = u, l && (f.data = l), e.json && (f.json = !0), e.xml && (f.xml = !0), 
        e.timeout && (f.timeout = e.timeout), e.mimeType && (f.mimeType = e.mimeType), e.withCredentials && (f.withCredentials = !0), 
        Object.keys(e.headers).length && (f.headers = e.headers), f.timeout > 0 && (f.timeoutTimer = setTimeout((function() {
            n && n(new Error("ETIMEDOUT")), h.abort();
        }), f.timeout));
        const p = {
            0: 200,
            1223: 204
        }, h = (e.localXHR, new XMLHttpRequest);
        h.open(f.method, f.url, !0), f.mimeType && h.overrideMimeType(f.mimeType), f.withCredentials && (h.withCredentials = !0);
        const d = [];
        for (let e in f.headers) i && i.isSpecialHeader(e) && d.push({
            key: e,
            value: f.headers[e]
        }), h.setRequestHeader(e, f.headers[e]);
        h.onload = function() {
            const e = p[h.status] || h.status;
            try {
                if (e >= 200 && e < 300 || 304 === e) {
                    let e = h.responseText;
                    if (f.json) e = JSON.parse(e); else if (f.xml) e = (new DOMParser).parseFromString(e, "text/xml"); else if ("string" != typeof e) throw console.error("Response is not string!", e), 
                    new Error("Response is not string!");
                    return n && n(null, e);
                }
                throw new Error(h.status + " " + h.statusText);
            } catch (e) {
                return n && n(e);
            }
        };
        const m = h.onerror = function() {
            n && n(new Error(h.status + " " + h.statusText));
        };
        let g = null;
        void 0 !== h.onabort ? h.onabort = m : g = function() {
            4 === h.readyState && n && setTimeout((function() {
                return m();
            }));
        }, g && (h.onreadystatechange = g);
        const y = function() {
            try {
                h.send(f.data || null);
            } catch (e) {
                setTimeout((function() {
                    n && n(e);
                }));
            }
        };
        if (i && d.length) {
            const e = function() {
                for (let e, t = 0; e = d[t]; t++) h.setRequestHeader(i.wrapHeaderKey(e.key, e.value), e.value);
            };
            i.requestPermission((function(t) {
                t && e(), n && y();
            }));
        } else y();
        return r.abort = function() {
            n = null, h.abort();
        }, r;
    };
}, function(e, t, r) {
    "use strict";
    t.a = e => {
        let t = null;
        return t = () => {}, t.t = t.log = t.info = t.warn = t.error = t.debug = t, t;
    };
}, function(e, t, r) {
    "use strict";
    class n extends Error {
        constructor(e, t) {
            super(e), this.code = t;
        }
    }
    t.a = n;
}, function(e, t, r) {
    "use strict";
    t.a = function() {
        return parseInt(Date.now() / 1e3, 10);
    };
}, function(e, t, r) {
    "use strict";
    t.a = e => new Promise(t => t(e()));
}, function(e, t, r) {
    "use strict";
    var n = r(0);
    t.a = e => new Promise(t => n.a.storage.get(e, t));
}, function(e, t, r) {
    "use strict";
    t.decode = t.parse = r(51), t.encode = t.stringify = r(52);
}, function(e, t, r) {
    (function(n) {
        function o() {
            var e;
            try {
                e = t.storage.debug;
            } catch (e) {}
            return !e && void 0 !== n && "env" in n && (e = n.env.DEBUG), e;
        }
        (t = e.exports = r(59)).log = function() {
            return "object" == typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
        }, t.formatArgs = function(e) {
            var r = this.useColors;
            if (e[0] = (r ? "%c" : "") + this.namespace + (r ? " %c" : " ") + e[0] + (r ? "%c " : " ") + "+" + t.humanize(this.diff), 
            !r) return;
            var n = "color: " + this.color;
            e.splice(1, 0, n, "color: inherit");
            var o = 0, i = 0;
            e[0].replace(/%[a-zA-Z%]/g, (function(e) {
                "%%" !== e && (o++, "%c" === e && (i = o));
            })), e.splice(i, 0, n);
        }, t.save = function(e) {
            try {
                null == e ? t.storage.removeItem("debug") : t.storage.debug = e;
            } catch (e) {}
        }, t.load = o, t.useColors = function() {
            if ("undefined" != typeof window && window.process && "renderer" === window.process.type) return !0;
            if ("undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
            return "undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
        }, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : function() {
            try {
                return window.localStorage;
            } catch (e) {}
        }(), t.colors = [ "#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33" ], 
        t.formatters.j = function(e) {
            try {
                return JSON.stringify(e);
            } catch (e) {
                return "[UnexpectedJSONParseError]: " + e.message;
            }
        }, t.enable(o());
    }).call(this, r(58));
}, function(e, t, r) {
    "use strict";
    var n = r(0);
    t.a = e => new Promise(t => n.a.storage.set(e, t));
}, function(e, t, r) {
    function n(e) {
        if (e) return function(e) {
            for (var t in n.prototype) e[t] = n.prototype[t];
            return e;
        }(e);
    }
    e.exports = n, n.prototype.on = n.prototype.addEventListener = function(e, t) {
        return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), 
        this;
    }, n.prototype.once = function(e, t) {
        function r() {
            this.off(e, r), t.apply(this, arguments);
        }
        return r.fn = t, this.on(e, r), this;
    }, n.prototype.off = n.prototype.removeListener = n.prototype.removeAllListeners = n.prototype.removeEventListener = function(e, t) {
        if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, 
        this;
        var r, n = this._callbacks["$" + e];
        if (!n) return this;
        if (1 == arguments.length) return delete this._callbacks["$" + e], this;
        for (var o = 0; o < n.length; o++) if ((r = n[o]) === t || r.fn === t) {
            n.splice(o, 1);
            break;
        }
        return 0 === n.length && delete this._callbacks["$" + e], this;
    }, n.prototype.emit = function(e) {
        this._callbacks = this._callbacks || {};
        for (var t = new Array(arguments.length - 1), r = this._callbacks["$" + e], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        if (r) {
            n = 0;
            for (var o = (r = r.slice(0)).length; n < o; ++n) r[n].apply(this, t);
        }
        return this;
    }, n.prototype.listeners = function(e) {
        return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || [];
    }, n.prototype.hasListeners = function(e) {
        return !!this.listeners(e).length;
    };
}, function(e, t, r) {
    var n, o = r(69), i = r(38), s = r(70), a = r(71), c = r(72);
    "undefined" != typeof ArrayBuffer && (n = r(73));
    var u = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent), l = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent), f = u || l;
    t.protocol = 3;
    var p = t.packets = {
        open: 0,
        close: 1,
        ping: 2,
        pong: 3,
        message: 4,
        upgrade: 5,
        noop: 6
    }, h = o(p), d = {
        type: "error",
        data: "parser error"
    }, m = r(74);
    function g(e, t, r) {
        for (var n = new Array(e.length), o = a(e.length, r), i = function(e, r, o) {
            t(r, (function(t, r) {
                n[e] = r, o(t, n);
            }));
        }, s = 0; s < e.length; s++) i(s, e[s], o);
    }
    t.encodePacket = function(e, r, n, o) {
        "function" == typeof r && (o = r, r = !1), "function" == typeof n && (o = n, n = null);
        var i = void 0 === e.data ? void 0 : e.data.buffer || e.data;
        if ("undefined" != typeof ArrayBuffer && i instanceof ArrayBuffer) return function(e, r, n) {
            if (!r) return t.encodeBase64Packet(e, n);
            var o = e.data, i = new Uint8Array(o), s = new Uint8Array(1 + o.byteLength);
            s[0] = p[e.type];
            for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
            return n(s.buffer);
        }(e, r, o);
        if (void 0 !== m && i instanceof m) return function(e, r, n) {
            if (!r) return t.encodeBase64Packet(e, n);
            if (f) return function(e, r, n) {
                if (!r) return t.encodeBase64Packet(e, n);
                var o = new FileReader;
                return o.onload = function() {
                    t.encodePacket({
                        type: e.type,
                        data: o.result
                    }, r, !0, n);
                }, o.readAsArrayBuffer(e.data);
            }(e, r, n);
            var o = new Uint8Array(1);
            o[0] = p[e.type];
            var i = new m([ o.buffer, e.data ]);
            return n(i);
        }(e, r, o);
        if (i && i.base64) return function(e, r) {
            var n = "b" + t.packets[e.type] + e.data.data;
            return r(n);
        }(e, o);
        var s = p[e.type];
        return void 0 !== e.data && (s += n ? c.encode(String(e.data), {
            strict: !1
        }) : String(e.data)), o("" + s);
    }, t.encodeBase64Packet = function(e, r) {
        var n, o = "b" + t.packets[e.type];
        if (void 0 !== m && e.data instanceof m) {
            var i = new FileReader;
            return i.onload = function() {
                var e = i.result.split(",")[1];
                r(o + e);
            }, i.readAsDataURL(e.data);
        }
        try {
            n = String.fromCharCode.apply(null, new Uint8Array(e.data));
        } catch (t) {
            for (var s = new Uint8Array(e.data), a = new Array(s.length), c = 0; c < s.length; c++) a[c] = s[c];
            n = String.fromCharCode.apply(null, a);
        }
        return o += btoa(n), r(o);
    }, t.decodePacket = function(e, r, n) {
        if (void 0 === e) return d;
        if ("string" == typeof e) {
            if ("b" === e.charAt(0)) return t.decodeBase64Packet(e.substr(1), r);
            if (n && !1 === (e = function(e) {
                try {
                    e = c.decode(e, {
                        strict: !1
                    });
                } catch (e) {
                    return !1;
                }
                return e;
            }(e))) return d;
            var o = e.charAt(0);
            return Number(o) == o && h[o] ? e.length > 1 ? {
                type: h[o],
                data: e.substring(1)
            } : {
                type: h[o]
            } : d;
        }
        o = new Uint8Array(e)[0];
        var i = s(e, 1);
        return m && "blob" === r && (i = new m([ i ])), {
            type: h[o],
            data: i
        };
    }, t.decodeBase64Packet = function(e, t) {
        var r = h[e.charAt(0)];
        if (!n) return {
            type: r,
            data: {
                base64: !0,
                data: e.substr(1)
            }
        };
        var o = n.decode(e.substr(1));
        return "blob" === t && m && (o = new m([ o ])), {
            type: r,
            data: o
        };
    }, t.encodePayload = function(e, r, n) {
        "function" == typeof r && (n = r, r = null);
        var o = i(e);
        if (r && o) return m && !f ? t.encodePayloadAsBlob(e, n) : t.encodePayloadAsArrayBuffer(e, n);
        if (!e.length) return n("0:");
        g(e, (function(e, n) {
            t.encodePacket(e, !!o && r, !1, (function(e) {
                n(null, function(e) {
                    return e.length + ":" + e;
                }(e));
            }));
        }), (function(e, t) {
            return n(t.join(""));
        }));
    }, t.decodePayload = function(e, r, n) {
        if ("string" != typeof e) return t.decodePayloadAsBinary(e, r, n);
        var o;
        if ("function" == typeof r && (n = r, r = null), "" === e) return n(d, 0, 1);
        for (var i, s, a = "", c = 0, u = e.length; c < u; c++) {
            var l = e.charAt(c);
            if (":" === l) {
                if ("" === a || a != (i = Number(a))) return n(d, 0, 1);
                if (a != (s = e.substr(c + 1, i)).length) return n(d, 0, 1);
                if (s.length) {
                    if (o = t.decodePacket(s, r, !1), d.type === o.type && d.data === o.data) return n(d, 0, 1);
                    if (!1 === n(o, c + i, u)) return;
                }
                c += i, a = "";
            } else a += l;
        }
        return "" !== a ? n(d, 0, 1) : void 0;
    }, t.encodePayloadAsArrayBuffer = function(e, r) {
        if (!e.length) return r(new ArrayBuffer(0));
        g(e, (function(e, r) {
            t.encodePacket(e, !0, !0, (function(e) {
                return r(null, e);
            }));
        }), (function(e, t) {
            var n = t.reduce((function(e, t) {
                var r;
                return e + (r = "string" == typeof t ? t.length : t.byteLength).toString().length + r + 2;
            }), 0), o = new Uint8Array(n), i = 0;
            return t.forEach((function(e) {
                var t = "string" == typeof e, r = e;
                if (t) {
                    for (var n = new Uint8Array(e.length), s = 0; s < e.length; s++) n[s] = e.charCodeAt(s);
                    r = n.buffer;
                }
                o[i++] = t ? 0 : 1;
                var a = r.byteLength.toString();
                for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                o[i++] = 255;
                for (n = new Uint8Array(r), s = 0; s < n.length; s++) o[i++] = n[s];
            })), r(o.buffer);
        }));
    }, t.encodePayloadAsBlob = function(e, r) {
        g(e, (function(e, r) {
            t.encodePacket(e, !0, !0, (function(e) {
                var t = new Uint8Array(1);
                if (t[0] = 1, "string" == typeof e) {
                    for (var n = new Uint8Array(e.length), o = 0; o < e.length; o++) n[o] = e.charCodeAt(o);
                    e = n.buffer, t[0] = 0;
                }
                var i = (e instanceof ArrayBuffer ? e.byteLength : e.size).toString(), s = new Uint8Array(i.length + 1);
                for (o = 0; o < i.length; o++) s[o] = parseInt(i[o]);
                if (s[i.length] = 255, m) {
                    var a = new m([ t.buffer, s.buffer, e ]);
                    r(null, a);
                }
            }));
        }), (function(e, t) {
            return r(new m(t));
        }));
    }, t.decodePayloadAsBinary = function(e, r, n) {
        "function" == typeof r && (n = r, r = null);
        for (var o = e, i = []; o.byteLength > 0; ) {
            for (var a = new Uint8Array(o), c = 0 === a[0], u = "", l = 1; 255 !== a[l]; l++) {
                if (u.length > 310) return n(d, 0, 1);
                u += a[l];
            }
            o = s(o, 2 + u.length), u = parseInt(u);
            var f = s(o, 0, u);
            if (c) try {
                f = String.fromCharCode.apply(null, new Uint8Array(f));
            } catch (e) {
                var p = new Uint8Array(f);
                f = "";
                for (l = 0; l < p.length; l++) f += String.fromCharCode(p[l]);
            }
            i.push(f), o = s(o, u);
        }
        var h = i.length;
        i.forEach((function(e, o) {
            n(t.decodePacket(e, r, !0), o, h);
        }));
    };
}, function(e, t, r) {
    "use strict";
    var n = r(85), o = r(86), i = r(87), s = r(88), a = r(44), c = r(16), u = r(89), l = Function, f = function(e) {
        try {
            return l('"use strict"; return (' + e + ").constructor;")();
        } catch (e) {}
    }, p = Object.getOwnPropertyDescriptor;
    if (p) try {
        p({}, "");
    } catch (e) {
        p = null;
    }
    var h = function() {
        throw new c;
    }, d = p ? function() {
        try {
            return h;
        } catch (e) {
            try {
                return p(arguments, "callee").get;
            } catch (e) {
                return h;
            }
        }
    }() : h, m = r(90)(), g = r(92)(), y = Object.getPrototypeOf || (g ? function(e) {
        return e.__proto__;
    } : null), v = {}, b = "undefined" != typeof Uint8Array && y ? y(Uint8Array) : void 0, w = {
        __proto__: null,
        "%AggregateError%": "undefined" == typeof AggregateError ? void 0 : AggregateError,
        "%Array%": Array,
        "%ArrayBuffer%": "undefined" == typeof ArrayBuffer ? void 0 : ArrayBuffer,
        "%ArrayIteratorPrototype%": m && y ? y([][Symbol.iterator]()) : void 0,
        "%AsyncFromSyncIteratorPrototype%": void 0,
        "%AsyncFunction%": v,
        "%AsyncGenerator%": v,
        "%AsyncGeneratorFunction%": v,
        "%AsyncIteratorPrototype%": v,
        "%Atomics%": "undefined" == typeof Atomics ? void 0 : Atomics,
        "%BigInt%": "undefined" == typeof BigInt ? void 0 : BigInt,
        "%BigInt64Array%": "undefined" == typeof BigInt64Array ? void 0 : BigInt64Array,
        "%BigUint64Array%": "undefined" == typeof BigUint64Array ? void 0 : BigUint64Array,
        "%Boolean%": Boolean,
        "%DataView%": "undefined" == typeof DataView ? void 0 : DataView,
        "%Date%": Date,
        "%decodeURI%": decodeURI,
        "%decodeURIComponent%": decodeURIComponent,
        "%encodeURI%": encodeURI,
        "%encodeURIComponent%": encodeURIComponent,
        "%Error%": n,
        "%eval%": eval,
        "%EvalError%": o,
        "%Float32Array%": "undefined" == typeof Float32Array ? void 0 : Float32Array,
        "%Float64Array%": "undefined" == typeof Float64Array ? void 0 : Float64Array,
        "%FinalizationRegistry%": "undefined" == typeof FinalizationRegistry ? void 0 : FinalizationRegistry,
        "%Function%": l,
        "%GeneratorFunction%": v,
        "%Int8Array%": "undefined" == typeof Int8Array ? void 0 : Int8Array,
        "%Int16Array%": "undefined" == typeof Int16Array ? void 0 : Int16Array,
        "%Int32Array%": "undefined" == typeof Int32Array ? void 0 : Int32Array,
        "%isFinite%": isFinite,
        "%isNaN%": isNaN,
        "%IteratorPrototype%": m && y ? y(y([][Symbol.iterator]())) : void 0,
        "%JSON%": "object" == typeof JSON ? JSON : void 0,
        "%Map%": "undefined" == typeof Map ? void 0 : Map,
        "%MapIteratorPrototype%": "undefined" != typeof Map && m && y ? y((new Map)[Symbol.iterator]()) : void 0,
        "%Math%": Math,
        "%Number%": Number,
        "%Object%": Object,
        "%parseFloat%": parseFloat,
        "%parseInt%": parseInt,
        "%Promise%": "undefined" == typeof Promise ? void 0 : Promise,
        "%Proxy%": "undefined" == typeof Proxy ? void 0 : Proxy,
        "%RangeError%": i,
        "%ReferenceError%": s,
        "%Reflect%": "undefined" == typeof Reflect ? void 0 : Reflect,
        "%RegExp%": RegExp,
        "%Set%": "undefined" == typeof Set ? void 0 : Set,
        "%SetIteratorPrototype%": "undefined" != typeof Set && m && y ? y((new Set)[Symbol.iterator]()) : void 0,
        "%SharedArrayBuffer%": "undefined" == typeof SharedArrayBuffer ? void 0 : SharedArrayBuffer,
        "%String%": String,
        "%StringIteratorPrototype%": m && y ? y(""[Symbol.iterator]()) : void 0,
        "%Symbol%": m ? Symbol : void 0,
        "%SyntaxError%": a,
        "%ThrowTypeError%": d,
        "%TypedArray%": b,
        "%TypeError%": c,
        "%Uint8Array%": "undefined" == typeof Uint8Array ? void 0 : Uint8Array,
        "%Uint8ClampedArray%": "undefined" == typeof Uint8ClampedArray ? void 0 : Uint8ClampedArray,
        "%Uint16Array%": "undefined" == typeof Uint16Array ? void 0 : Uint16Array,
        "%Uint32Array%": "undefined" == typeof Uint32Array ? void 0 : Uint32Array,
        "%URIError%": u,
        "%WeakMap%": "undefined" == typeof WeakMap ? void 0 : WeakMap,
        "%WeakRef%": "undefined" == typeof WeakRef ? void 0 : WeakRef,
        "%WeakSet%": "undefined" == typeof WeakSet ? void 0 : WeakSet
    };
    if (y) try {
        null.error;
    } catch (e) {
        var E = y(y(e));
        w["%Error.prototype%"] = E;
    }
    var O = {
        __proto__: null,
        "%ArrayBufferPrototype%": [ "ArrayBuffer", "prototype" ],
        "%ArrayPrototype%": [ "Array", "prototype" ],
        "%ArrayProto_entries%": [ "Array", "prototype", "entries" ],
        "%ArrayProto_forEach%": [ "Array", "prototype", "forEach" ],
        "%ArrayProto_keys%": [ "Array", "prototype", "keys" ],
        "%ArrayProto_values%": [ "Array", "prototype", "values" ],
        "%AsyncFunctionPrototype%": [ "AsyncFunction", "prototype" ],
        "%AsyncGenerator%": [ "AsyncGeneratorFunction", "prototype" ],
        "%AsyncGeneratorPrototype%": [ "AsyncGeneratorFunction", "prototype", "prototype" ],
        "%BooleanPrototype%": [ "Boolean", "prototype" ],
        "%DataViewPrototype%": [ "DataView", "prototype" ],
        "%DatePrototype%": [ "Date", "prototype" ],
        "%ErrorPrototype%": [ "Error", "prototype" ],
        "%EvalErrorPrototype%": [ "EvalError", "prototype" ],
        "%Float32ArrayPrototype%": [ "Float32Array", "prototype" ],
        "%Float64ArrayPrototype%": [ "Float64Array", "prototype" ],
        "%FunctionPrototype%": [ "Function", "prototype" ],
        "%Generator%": [ "GeneratorFunction", "prototype" ],
        "%GeneratorPrototype%": [ "GeneratorFunction", "prototype", "prototype" ],
        "%Int8ArrayPrototype%": [ "Int8Array", "prototype" ],
        "%Int16ArrayPrototype%": [ "Int16Array", "prototype" ],
        "%Int32ArrayPrototype%": [ "Int32Array", "prototype" ],
        "%JSONParse%": [ "JSON", "parse" ],
        "%JSONStringify%": [ "JSON", "stringify" ],
        "%MapPrototype%": [ "Map", "prototype" ],
        "%NumberPrototype%": [ "Number", "prototype" ],
        "%ObjectPrototype%": [ "Object", "prototype" ],
        "%ObjProto_toString%": [ "Object", "prototype", "toString" ],
        "%ObjProto_valueOf%": [ "Object", "prototype", "valueOf" ],
        "%PromisePrototype%": [ "Promise", "prototype" ],
        "%PromiseProto_then%": [ "Promise", "prototype", "then" ],
        "%Promise_all%": [ "Promise", "all" ],
        "%Promise_reject%": [ "Promise", "reject" ],
        "%Promise_resolve%": [ "Promise", "resolve" ],
        "%RangeErrorPrototype%": [ "RangeError", "prototype" ],
        "%ReferenceErrorPrototype%": [ "ReferenceError", "prototype" ],
        "%RegExpPrototype%": [ "RegExp", "prototype" ],
        "%SetPrototype%": [ "Set", "prototype" ],
        "%SharedArrayBufferPrototype%": [ "SharedArrayBuffer", "prototype" ],
        "%StringPrototype%": [ "String", "prototype" ],
        "%SymbolPrototype%": [ "Symbol", "prototype" ],
        "%SyntaxErrorPrototype%": [ "SyntaxError", "prototype" ],
        "%TypedArrayPrototype%": [ "TypedArray", "prototype" ],
        "%TypeErrorPrototype%": [ "TypeError", "prototype" ],
        "%Uint8ArrayPrototype%": [ "Uint8Array", "prototype" ],
        "%Uint8ClampedArrayPrototype%": [ "Uint8ClampedArray", "prototype" ],
        "%Uint16ArrayPrototype%": [ "Uint16Array", "prototype" ],
        "%Uint32ArrayPrototype%": [ "Uint32Array", "prototype" ],
        "%URIErrorPrototype%": [ "URIError", "prototype" ],
        "%WeakMapPrototype%": [ "WeakMap", "prototype" ],
        "%WeakSetPrototype%": [ "WeakSet", "prototype" ]
    }, k = r(28), _ = r(94), x = k.call(Function.call, Array.prototype.concat), S = k.call(Function.apply, Array.prototype.splice), T = k.call(Function.call, String.prototype.replace), A = k.call(Function.call, String.prototype.slice), C = k.call(Function.call, RegExp.prototype.exec), R = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g, P = /\\(\\)?/g, L = function(e) {
        var t = A(e, 0, 1), r = A(e, -1);
        if ("%" === t && "%" !== r) throw new a("invalid intrinsic syntax, expected closing `%`");
        if ("%" === r && "%" !== t) throw new a("invalid intrinsic syntax, expected opening `%`");
        var n = [];
        return T(e, R, (function(e, t, r, o) {
            n[n.length] = r ? T(o, P, "$1") : t || e;
        })), n;
    }, I = function(e, t) {
        var r, n = e;
        if (_(O, n) && (n = "%" + (r = O[n])[0] + "%"), _(w, n)) {
            var o = w[n];
            if (o === v && (o = function e(t) {
                var r;
                if ("%AsyncFunction%" === t) r = f("async function () {}"); else if ("%GeneratorFunction%" === t) r = f("function* () {}"); else if ("%AsyncGeneratorFunction%" === t) r = f("async function* () {}"); else if ("%AsyncGenerator%" === t) {
                    var n = e("%AsyncGeneratorFunction%");
                    n && (r = n.prototype);
                } else if ("%AsyncIteratorPrototype%" === t) {
                    var o = e("%AsyncGenerator%");
                    o && y && (r = y(o.prototype));
                }
                return w[t] = r, r;
            }(n)), void 0 === o && !t) throw new c("intrinsic " + e + " exists, but is not available. Please file an issue!");
            return {
                alias: r,
                name: n,
                value: o
            };
        }
        throw new a("intrinsic " + e + " does not exist!");
    };
    e.exports = function(e, t) {
        if ("string" != typeof e || 0 === e.length) throw new c("intrinsic name must be a non-empty string");
        if (arguments.length > 1 && "boolean" != typeof t) throw new c('"allowMissing" argument must be a boolean');
        if (null === C(/^%?[^%]*%?$/, e)) throw new a("`%` may not be present anywhere but at the beginning and end of the intrinsic name");
        var r = L(e), n = r.length > 0 ? r[0] : "", o = I("%" + n + "%", t), i = o.name, s = o.value, u = !1, l = o.alias;
        l && (n = l[0], S(r, x([ 0, 1 ], l)));
        for (var f = 1, h = !0; f < r.length; f += 1) {
            var d = r[f], m = A(d, 0, 1), g = A(d, -1);
            if (('"' === m || "'" === m || "`" === m || '"' === g || "'" === g || "`" === g) && m !== g) throw new a("property names with quotes must have matching quotes");
            if ("constructor" !== d && h || (u = !0), _(w, i = "%" + (n += "." + d) + "%")) s = w[i]; else if (null != s) {
                if (!(d in s)) {
                    if (!t) throw new c("base intrinsic for " + e + " exists, but the property is not available.");
                    return;
                }
                if (p && f + 1 >= r.length) {
                    var y = p(s, d);
                    s = (h = !!y) && "get" in y && !("originalValue" in y.get) ? y.get : s[d];
                } else h = _(s, d), s = s[d];
                h && !u && (w[i] = s);
            }
        }
        return s;
    };
}, function(e, t, r) {
    "use strict";
    r.d(t, "a", (function() {
        return i;
    }));
    var n = r(10), o = r(7);
    class i {
        get(e) {
            return Object(o.a)(e);
        }
        first(e) {
            return Object(o.a)(e).then(t => t[e]);
        }
        set(e) {
            return Object(n.a)(e);
        }
    }
}, function(e, t, r) {
    "use strict";
    function n(e, t) {
        if (null == e) return {};
        var r, n, o = function(e, t) {
            if (null == e) return {};
            var r, n, o = {}, i = Object.keys(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
            return o;
        }(e, t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
        }
        return o;
    }
    r.d(t, "a", (function() {
        return n;
    }));
}, function(e, t, r) {
    "use strict";
    e.exports = TypeError;
}, function(e, t) {
    t.encode = function(e) {
        var t = "";
        for (var r in e) e.hasOwnProperty(r) && (t.length && (t += "&"), t += encodeURIComponent(r) + "=" + encodeURIComponent(e[r]));
        return t;
    }, t.decode = function(e) {
        for (var t = {}, r = e.split("&"), n = 0, o = r.length; n < o; n++) {
            var i = r[n].split("=");
            t[decodeURIComponent(i[0])] = decodeURIComponent(i[1]);
        }
        return t;
    };
}, function(e, t) {
    e.exports = function(e, t) {
        var r = function() {};
        r.prototype = t.prototype, e.prototype = new r, e.prototype.constructor = e;
    };
}, function(e, t, r) {
    "use strict";
    const n = r(32);
    t.a = function(e, t) {
        const r = new n({
            min: 1e3,
            max: 6e4,
            jitter: .5
        });
        let o = 0;
        const i = () => e().catch(e => {
            if (++o < t) {
                const e = r.duration();
                return new Promise(t => setTimeout(t, e)).then(i);
            }
            throw e;
        });
        return i();
    };
}, function(e, t, r) {
    "use strict";
    var n = r(6);
    var o = class {
        constructor(e, t) {
            this.finishQueue = () => {
                if (this.activeCount--, this.queue.length > 0) {
                    const [e, t] = this.queue.shift();
                    this.runQueue(e, t);
                }
            }, this.limit = e, this.maxQueue = t, this.queue = [], this.activeCount = 0;
        }
        add(e) {
            let t = null;
            const r = new Promise(e => {
                t = e;
            });
            if (this.activeCount < this.limit) this.runQueue(e, t); else {
                const r = [ e, t ], n = this.queue.push(r);
                this.maxQueue && n > this.maxQueue && this.queue.splice(0, n - this.maxQueue);
            }
            return r;
        }
        runQueue(e, t) {
            this.activeCount++;
            const r = Object(n.a)(e);
            t(r), r.then(this.finishQueue, this.finishQueue);
        }
    };
    t.a = (e, t) => {
        const r = new o(e, t);
        return e => r.add(e);
    };
}, function(e, t, r) {
    var n = r(9)("socket.io-parser"), o = r(11), i = r(61), s = r(22), a = r(34);
    function c() {}
    t.protocol = 4, t.types = [ "CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK" ], 
    t.CONNECT = 0, t.DISCONNECT = 1, t.EVENT = 2, t.ACK = 3, t.ERROR = 4, t.BINARY_EVENT = 5, 
    t.BINARY_ACK = 6, t.Encoder = c, t.Decoder = f;
    var u = t.ERROR + '"encode error"';
    function l(e) {
        var r = "" + e.type;
        if (t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type || (r += e.attachments + "-"), 
        e.nsp && "/" !== e.nsp && (r += e.nsp + ","), null != e.id && (r += e.id), null != e.data) {
            var o = function(e) {
                try {
                    return JSON.stringify(e);
                } catch (e) {
                    return !1;
                }
            }(e.data);
            if (!1 === o) return u;
            r += o;
        }
        return n("encoded %j as %s", e, r), r;
    }
    function f() {
        this.reconstructor = null;
    }
    function p(e) {
        this.reconPack = e, this.buffers = [];
    }
    function h(e) {
        return {
            type: t.ERROR,
            data: "parser error: " + e
        };
    }
    c.prototype.encode = function(e, r) {
        (n("encoding packet %j", e), t.BINARY_EVENT === e.type || t.BINARY_ACK === e.type) ? function(e, t) {
            i.removeBlobs(e, (function(e) {
                var r = i.deconstructPacket(e), n = l(r.packet), o = r.buffers;
                o.unshift(n), t(o);
            }));
        }(e, r) : r([ l(e) ]);
    }, o(f.prototype), f.prototype.add = function(e) {
        var r;
        if ("string" == typeof e) {
            if (this.reconstructor) throw new Error("got plaintext data when reconstructing a packet");
            r = function(e) {
                var r = 0, o = {
                    type: Number(e.charAt(0))
                };
                if (null == t.types[o.type]) return h("unknown packet type " + o.type);
                if (t.BINARY_EVENT === o.type || t.BINARY_ACK === o.type) {
                    for (var i = r + 1; "-" !== e.charAt(++r) && r != e.length; ) ;
                    var a = e.substring(i, r);
                    if (a != Number(a) || "-" !== e.charAt(r)) throw new Error("Illegal attachments");
                    o.attachments = Number(a);
                }
                if ("/" === e.charAt(r + 1)) {
                    for (i = r + 1; ++r; ) {
                        if ("," === (u = e.charAt(r))) break;
                        if (r === e.length) break;
                    }
                    o.nsp = e.substring(i, r);
                } else o.nsp = "/";
                var c = e.charAt(r + 1);
                if ("" !== c && Number(c) == c) {
                    for (i = r + 1; ++r; ) {
                        var u;
                        if (null == (u = e.charAt(r)) || Number(u) != u) {
                            --r;
                            break;
                        }
                        if (r === e.length) break;
                    }
                    o.id = Number(e.substring(i, r + 1));
                }
                if (e.charAt(++r)) {
                    var l = function(e) {
                        try {
                            return JSON.parse(e);
                        } catch (e) {
                            return !1;
                        }
                    }(e.substr(r));
                    if (!(!1 !== l && (o.type === t.ERROR || s(l)))) return h("invalid payload");
                    o.data = l;
                }
                return n("decoded %s as %j", e, o), o;
            }(e), t.BINARY_EVENT === r.type || t.BINARY_ACK === r.type ? (this.reconstructor = new p(r), 
            0 === this.reconstructor.reconPack.attachments && this.emit("decoded", r)) : this.emit("decoded", r);
        } else {
            if (!a(e) && !e.base64) throw new Error("Unknown type: " + e);
            if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
            (r = this.reconstructor.takeBinaryData(e)) && (this.reconstructor = null, this.emit("decoded", r));
        }
    }, f.prototype.destroy = function() {
        this.reconstructor && this.reconstructor.finishedReconstruction();
    }, p.prototype.takeBinaryData = function(e) {
        if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
            var t = i.reconstructPacket(this.reconPack, this.buffers);
            return this.finishedReconstruction(), t;
        }
        return null;
    }, p.prototype.finishedReconstruction = function() {
        this.reconPack = null, this.buffers = [];
    };
}, function(e, t) {
    var r = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == r.call(e);
    };
}, function(e, t, r) {
    "use strict";
    (function(e) {
        var n = r(62), o = r(63), i = r(64);
        function s() {
            return c.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function a(e, t) {
            if (s() < t) throw new RangeError("Invalid typed array length");
            return c.TYPED_ARRAY_SUPPORT ? (e = new Uint8Array(t)).__proto__ = c.prototype : (null === e && (e = new c(t)), 
            e.length = t), e;
        }
        function c(e, t, r) {
            if (!(c.TYPED_ARRAY_SUPPORT || this instanceof c)) return new c(e, t, r);
            if ("number" == typeof e) {
                if ("string" == typeof t) throw new Error("If encoding is specified then the first argument must be a string");
                return f(this, e);
            }
            return u(this, e, t, r);
        }
        function u(e, t, r, n) {
            if ("number" == typeof t) throw new TypeError('"value" argument must not be a number');
            return "undefined" != typeof ArrayBuffer && t instanceof ArrayBuffer ? function(e, t, r, n) {
                if (t.byteLength, r < 0 || t.byteLength < r) throw new RangeError("'offset' is out of bounds");
                if (t.byteLength < r + (n || 0)) throw new RangeError("'length' is out of bounds");
                t = void 0 === r && void 0 === n ? new Uint8Array(t) : void 0 === n ? new Uint8Array(t, r) : new Uint8Array(t, r, n);
                c.TYPED_ARRAY_SUPPORT ? (e = t).__proto__ = c.prototype : e = p(e, t);
                return e;
            }(e, t, r, n) : "string" == typeof t ? function(e, t, r) {
                "string" == typeof r && "" !== r || (r = "utf8");
                if (!c.isEncoding(r)) throw new TypeError('"encoding" must be a valid string encoding');
                var n = 0 | d(t, r), o = (e = a(e, n)).write(t, r);
                o !== n && (e = e.slice(0, o));
                return e;
            }(e, t, r) : function(e, t) {
                if (c.isBuffer(t)) {
                    var r = 0 | h(t.length);
                    return 0 === (e = a(e, r)).length || t.copy(e, 0, 0, r), e;
                }
                if (t) {
                    if ("undefined" != typeof ArrayBuffer && t.buffer instanceof ArrayBuffer || "length" in t) return "number" != typeof t.length || (n = t.length) != n ? a(e, 0) : p(e, t);
                    if ("Buffer" === t.type && i(t.data)) return p(e, t.data);
                }
                var n;
                throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
            }(e, t);
        }
        function l(e) {
            if ("number" != typeof e) throw new TypeError('"size" argument must be a number');
            if (e < 0) throw new RangeError('"size" argument must not be negative');
        }
        function f(e, t) {
            if (l(t), e = a(e, t < 0 ? 0 : 0 | h(t)), !c.TYPED_ARRAY_SUPPORT) for (var r = 0; r < t; ++r) e[r] = 0;
            return e;
        }
        function p(e, t) {
            var r = t.length < 0 ? 0 : 0 | h(t.length);
            e = a(e, r);
            for (var n = 0; n < r; n += 1) e[n] = 255 & t[n];
            return e;
        }
        function h(e) {
            if (e >= s()) throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + s().toString(16) + " bytes");
            return 0 | e;
        }
        function d(e, t) {
            if (c.isBuffer(e)) return e.length;
            if ("undefined" != typeof ArrayBuffer && "function" == typeof ArrayBuffer.isView && (ArrayBuffer.isView(e) || e instanceof ArrayBuffer)) return e.byteLength;
            "string" != typeof e && (e = "" + e);
            var r = e.length;
            if (0 === r) return 0;
            for (var n = !1; ;) switch (t) {
              case "ascii":
              case "latin1":
              case "binary":
                return r;

              case "utf8":
              case "utf-8":
              case void 0:
                return B(e).length;

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * r;

              case "hex":
                return r >>> 1;

              case "base64":
                return q(e).length;

              default:
                if (n) return B(e).length;
                t = ("" + t).toLowerCase(), n = !0;
            }
        }
        function m(e, t, r) {
            var n = !1;
            if ((void 0 === t || t < 0) && (t = 0), t > this.length) return "";
            if ((void 0 === r || r > this.length) && (r = this.length), r <= 0) return "";
            if ((r >>>= 0) <= (t >>>= 0)) return "";
            for (e || (e = "utf8"); ;) switch (e) {
              case "hex":
                return C(this, t, r);

              case "utf8":
              case "utf-8":
                return S(this, t, r);

              case "ascii":
                return T(this, t, r);

              case "latin1":
              case "binary":
                return A(this, t, r);

              case "base64":
                return x(this, t, r);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return R(this, t, r);

              default:
                if (n) throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase(), n = !0;
            }
        }
        function g(e, t, r) {
            var n = e[t];
            e[t] = e[r], e[r] = n;
        }
        function y(e, t, r, n, o) {
            if (0 === e.length) return -1;
            if ("string" == typeof r ? (n = r, r = 0) : r > 2147483647 ? r = 2147483647 : r < -2147483648 && (r = -2147483648), 
            r = +r, isNaN(r) && (r = o ? 0 : e.length - 1), r < 0 && (r = e.length + r), r >= e.length) {
                if (o) return -1;
                r = e.length - 1;
            } else if (r < 0) {
                if (!o) return -1;
                r = 0;
            }
            if ("string" == typeof t && (t = c.from(t, n)), c.isBuffer(t)) return 0 === t.length ? -1 : v(e, t, r, n, o);
            if ("number" == typeof t) return t &= 255, c.TYPED_ARRAY_SUPPORT && "function" == typeof Uint8Array.prototype.indexOf ? o ? Uint8Array.prototype.indexOf.call(e, t, r) : Uint8Array.prototype.lastIndexOf.call(e, t, r) : v(e, [ t ], r, n, o);
            throw new TypeError("val must be string, number or Buffer");
        }
        function v(e, t, r, n, o) {
            var i, s = 1, a = e.length, c = t.length;
            if (void 0 !== n && ("ucs2" === (n = String(n).toLowerCase()) || "ucs-2" === n || "utf16le" === n || "utf-16le" === n)) {
                if (e.length < 2 || t.length < 2) return -1;
                s = 2, a /= 2, c /= 2, r /= 2;
            }
            function u(e, t) {
                return 1 === s ? e[t] : e.readUInt16BE(t * s);
            }
            if (o) {
                var l = -1;
                for (i = r; i < a; i++) if (u(e, i) === u(t, -1 === l ? 0 : i - l)) {
                    if (-1 === l && (l = i), i - l + 1 === c) return l * s;
                } else -1 !== l && (i -= i - l), l = -1;
            } else for (r + c > a && (r = a - c), i = r; i >= 0; i--) {
                for (var f = !0, p = 0; p < c; p++) if (u(e, i + p) !== u(t, p)) {
                    f = !1;
                    break;
                }
                if (f) return i;
            }
            return -1;
        }
        function b(e, t, r, n) {
            r = Number(r) || 0;
            var o = e.length - r;
            n ? (n = Number(n)) > o && (n = o) : n = o;
            var i = t.length;
            if (i % 2 != 0) throw new TypeError("Invalid hex string");
            n > i / 2 && (n = i / 2);
            for (var s = 0; s < n; ++s) {
                var a = parseInt(t.substr(2 * s, 2), 16);
                if (isNaN(a)) return s;
                e[r + s] = a;
            }
            return s;
        }
        function w(e, t, r, n) {
            return V(B(t, e.length - r), e, r, n);
        }
        function E(e, t, r, n) {
            return V(function(e) {
                for (var t = [], r = 0; r < e.length; ++r) t.push(255 & e.charCodeAt(r));
                return t;
            }(t), e, r, n);
        }
        function O(e, t, r, n) {
            return E(e, t, r, n);
        }
        function k(e, t, r, n) {
            return V(q(t), e, r, n);
        }
        function _(e, t, r, n) {
            return V(function(e, t) {
                for (var r, n, o, i = [], s = 0; s < e.length && !((t -= 2) < 0); ++s) r = e.charCodeAt(s), 
                n = r >> 8, o = r % 256, i.push(o), i.push(n);
                return i;
            }(t, e.length - r), e, r, n);
        }
        function x(e, t, r) {
            return 0 === t && r === e.length ? n.fromByteArray(e) : n.fromByteArray(e.slice(t, r));
        }
        function S(e, t, r) {
            r = Math.min(e.length, r);
            for (var n = [], o = t; o < r; ) {
                var i, s, a, c, u = e[o], l = null, f = u > 239 ? 4 : u > 223 ? 3 : u > 191 ? 2 : 1;
                if (o + f <= r) switch (f) {
                  case 1:
                    u < 128 && (l = u);
                    break;

                  case 2:
                    128 == (192 & (i = e[o + 1])) && (c = (31 & u) << 6 | 63 & i) > 127 && (l = c);
                    break;

                  case 3:
                    i = e[o + 1], s = e[o + 2], 128 == (192 & i) && 128 == (192 & s) && (c = (15 & u) << 12 | (63 & i) << 6 | 63 & s) > 2047 && (c < 55296 || c > 57343) && (l = c);
                    break;

                  case 4:
                    i = e[o + 1], s = e[o + 2], a = e[o + 3], 128 == (192 & i) && 128 == (192 & s) && 128 == (192 & a) && (c = (15 & u) << 18 | (63 & i) << 12 | (63 & s) << 6 | 63 & a) > 65535 && c < 1114112 && (l = c);
                }
                null === l ? (l = 65533, f = 1) : l > 65535 && (l -= 65536, n.push(l >>> 10 & 1023 | 55296), 
                l = 56320 | 1023 & l), n.push(l), o += f;
            }
            return function(e) {
                var t = e.length;
                if (t <= 4096) return String.fromCharCode.apply(String, e);
                var r = "", n = 0;
                for (;n < t; ) r += String.fromCharCode.apply(String, e.slice(n, n += 4096));
                return r;
            }(n);
        }
        t.Buffer = c, t.SlowBuffer = function(e) {
            +e != e && (e = 0);
            return c.alloc(+e);
        }, t.INSPECT_MAX_BYTES = 50, c.TYPED_ARRAY_SUPPORT = void 0 !== e.TYPED_ARRAY_SUPPORT ? e.TYPED_ARRAY_SUPPORT : function() {
            try {
                var e = new Uint8Array(1);
                return e.__proto__ = {
                    __proto__: Uint8Array.prototype,
                    foo: function() {
                        return 42;
                    }
                }, 42 === e.foo() && "function" == typeof e.subarray && 0 === e.subarray(1, 1).byteLength;
            } catch (e) {
                return !1;
            }
        }(), t.kMaxLength = s(), c.poolSize = 8192, c._augment = function(e) {
            return e.__proto__ = c.prototype, e;
        }, c.from = function(e, t, r) {
            return u(null, e, t, r);
        }, c.TYPED_ARRAY_SUPPORT && (c.prototype.__proto__ = Uint8Array.prototype, c.__proto__ = Uint8Array, 
        "undefined" != typeof Symbol && Symbol.species && c[Symbol.species] === c && Object.defineProperty(c, Symbol.species, {
            value: null,
            configurable: !0
        })), c.alloc = function(e, t, r) {
            return function(e, t, r, n) {
                return l(t), t <= 0 ? a(e, t) : void 0 !== r ? "string" == typeof n ? a(e, t).fill(r, n) : a(e, t).fill(r) : a(e, t);
            }(null, e, t, r);
        }, c.allocUnsafe = function(e) {
            return f(null, e);
        }, c.allocUnsafeSlow = function(e) {
            return f(null, e);
        }, c.isBuffer = function(e) {
            return !(null == e || !e._isBuffer);
        }, c.compare = function(e, t) {
            if (!c.isBuffer(e) || !c.isBuffer(t)) throw new TypeError("Arguments must be Buffers");
            if (e === t) return 0;
            for (var r = e.length, n = t.length, o = 0, i = Math.min(r, n); o < i; ++o) if (e[o] !== t[o]) {
                r = e[o], n = t[o];
                break;
            }
            return r < n ? -1 : n < r ? 1 : 0;
        }, c.isEncoding = function(e) {
            switch (String(e).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;

              default:
                return !1;
            }
        }, c.concat = function(e, t) {
            if (!i(e)) throw new TypeError('"list" argument must be an Array of Buffers');
            if (0 === e.length) return c.alloc(0);
            var r;
            if (void 0 === t) for (t = 0, r = 0; r < e.length; ++r) t += e[r].length;
            var n = c.allocUnsafe(t), o = 0;
            for (r = 0; r < e.length; ++r) {
                var s = e[r];
                if (!c.isBuffer(s)) throw new TypeError('"list" argument must be an Array of Buffers');
                s.copy(n, o), o += s.length;
            }
            return n;
        }, c.byteLength = d, c.prototype._isBuffer = !0, c.prototype.swap16 = function() {
            var e = this.length;
            if (e % 2 != 0) throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var t = 0; t < e; t += 2) g(this, t, t + 1);
            return this;
        }, c.prototype.swap32 = function() {
            var e = this.length;
            if (e % 4 != 0) throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var t = 0; t < e; t += 4) g(this, t, t + 3), g(this, t + 1, t + 2);
            return this;
        }, c.prototype.swap64 = function() {
            var e = this.length;
            if (e % 8 != 0) throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var t = 0; t < e; t += 8) g(this, t, t + 7), g(this, t + 1, t + 6), g(this, t + 2, t + 5), 
            g(this, t + 3, t + 4);
            return this;
        }, c.prototype.toString = function() {
            var e = 0 | this.length;
            return 0 === e ? "" : 0 === arguments.length ? S(this, 0, e) : m.apply(this, arguments);
        }, c.prototype.equals = function(e) {
            if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            return this === e || 0 === c.compare(this, e);
        }, c.prototype.inspect = function() {
            var e = "", r = t.INSPECT_MAX_BYTES;
            return this.length > 0 && (e = this.toString("hex", 0, r).match(/.{2}/g).join(" "), 
            this.length > r && (e += " ... ")), "<Buffer " + e + ">";
        }, c.prototype.compare = function(e, t, r, n, o) {
            if (!c.isBuffer(e)) throw new TypeError("Argument must be a Buffer");
            if (void 0 === t && (t = 0), void 0 === r && (r = e ? e.length : 0), void 0 === n && (n = 0), 
            void 0 === o && (o = this.length), t < 0 || r > e.length || n < 0 || o > this.length) throw new RangeError("out of range index");
            if (n >= o && t >= r) return 0;
            if (n >= o) return -1;
            if (t >= r) return 1;
            if (this === e) return 0;
            for (var i = (o >>>= 0) - (n >>>= 0), s = (r >>>= 0) - (t >>>= 0), a = Math.min(i, s), u = this.slice(n, o), l = e.slice(t, r), f = 0; f < a; ++f) if (u[f] !== l[f]) {
                i = u[f], s = l[f];
                break;
            }
            return i < s ? -1 : s < i ? 1 : 0;
        }, c.prototype.includes = function(e, t, r) {
            return -1 !== this.indexOf(e, t, r);
        }, c.prototype.indexOf = function(e, t, r) {
            return y(this, e, t, r, !0);
        }, c.prototype.lastIndexOf = function(e, t, r) {
            return y(this, e, t, r, !1);
        }, c.prototype.write = function(e, t, r, n) {
            if (void 0 === t) n = "utf8", r = this.length, t = 0; else if (void 0 === r && "string" == typeof t) n = t, 
            r = this.length, t = 0; else {
                if (!isFinite(t)) throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
                t |= 0, isFinite(r) ? (r |= 0, void 0 === n && (n = "utf8")) : (n = r, r = void 0);
            }
            var o = this.length - t;
            if ((void 0 === r || r > o) && (r = o), e.length > 0 && (r < 0 || t < 0) || t > this.length) throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var i = !1; ;) switch (n) {
              case "hex":
                return b(this, e, t, r);

              case "utf8":
              case "utf-8":
                return w(this, e, t, r);

              case "ascii":
                return E(this, e, t, r);

              case "latin1":
              case "binary":
                return O(this, e, t, r);

              case "base64":
                return k(this, e, t, r);

              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return _(this, e, t, r);

              default:
                if (i) throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase(), i = !0;
            }
        }, c.prototype.toJSON = function() {
            return {
                type: "Buffer",
                data: Array.prototype.slice.call(this._arr || this, 0)
            };
        };
        function T(e, t, r) {
            var n = "";
            r = Math.min(e.length, r);
            for (var o = t; o < r; ++o) n += String.fromCharCode(127 & e[o]);
            return n;
        }
        function A(e, t, r) {
            var n = "";
            r = Math.min(e.length, r);
            for (var o = t; o < r; ++o) n += String.fromCharCode(e[o]);
            return n;
        }
        function C(e, t, r) {
            var n = e.length;
            (!t || t < 0) && (t = 0), (!r || r < 0 || r > n) && (r = n);
            for (var o = "", i = t; i < r; ++i) o += D(e[i]);
            return o;
        }
        function R(e, t, r) {
            for (var n = e.slice(t, r), o = "", i = 0; i < n.length; i += 2) o += String.fromCharCode(n[i] + 256 * n[i + 1]);
            return o;
        }
        function P(e, t, r) {
            if (e % 1 != 0 || e < 0) throw new RangeError("offset is not uint");
            if (e + t > r) throw new RangeError("Trying to access beyond buffer length");
        }
        function L(e, t, r, n, o, i) {
            if (!c.isBuffer(e)) throw new TypeError('"buffer" argument must be a Buffer instance');
            if (t > o || t < i) throw new RangeError('"value" argument is out of bounds');
            if (r + n > e.length) throw new RangeError("Index out of range");
        }
        function I(e, t, r, n) {
            t < 0 && (t = 65535 + t + 1);
            for (var o = 0, i = Math.min(e.length - r, 2); o < i; ++o) e[r + o] = (t & 255 << 8 * (n ? o : 1 - o)) >>> 8 * (n ? o : 1 - o);
        }
        function j(e, t, r, n) {
            t < 0 && (t = 4294967295 + t + 1);
            for (var o = 0, i = Math.min(e.length - r, 4); o < i; ++o) e[r + o] = t >>> 8 * (n ? o : 3 - o) & 255;
        }
        function U(e, t, r, n, o, i) {
            if (r + n > e.length) throw new RangeError("Index out of range");
            if (r < 0) throw new RangeError("Index out of range");
        }
        function N(e, t, r, n, i) {
            return i || U(e, 0, r, 4), o.write(e, t, r, n, 23, 4), r + 4;
        }
        function M(e, t, r, n, i) {
            return i || U(e, 0, r, 8), o.write(e, t, r, n, 52, 8), r + 8;
        }
        c.prototype.slice = function(e, t) {
            var r, n = this.length;
            if ((e = ~~e) < 0 ? (e += n) < 0 && (e = 0) : e > n && (e = n), (t = void 0 === t ? n : ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n), 
            t < e && (t = e), c.TYPED_ARRAY_SUPPORT) (r = this.subarray(e, t)).__proto__ = c.prototype; else {
                var o = t - e;
                r = new c(o, void 0);
                for (var i = 0; i < o; ++i) r[i] = this[i + e];
            }
            return r;
        }, c.prototype.readUIntLE = function(e, t, r) {
            e |= 0, t |= 0, r || P(e, t, this.length);
            for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); ) n += this[e + i] * o;
            return n;
        }, c.prototype.readUIntBE = function(e, t, r) {
            e |= 0, t |= 0, r || P(e, t, this.length);
            for (var n = this[e + --t], o = 1; t > 0 && (o *= 256); ) n += this[e + --t] * o;
            return n;
        }, c.prototype.readUInt8 = function(e, t) {
            return t || P(e, 1, this.length), this[e];
        }, c.prototype.readUInt16LE = function(e, t) {
            return t || P(e, 2, this.length), this[e] | this[e + 1] << 8;
        }, c.prototype.readUInt16BE = function(e, t) {
            return t || P(e, 2, this.length), this[e] << 8 | this[e + 1];
        }, c.prototype.readUInt32LE = function(e, t) {
            return t || P(e, 4, this.length), (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + 16777216 * this[e + 3];
        }, c.prototype.readUInt32BE = function(e, t) {
            return t || P(e, 4, this.length), 16777216 * this[e] + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
        }, c.prototype.readIntLE = function(e, t, r) {
            e |= 0, t |= 0, r || P(e, t, this.length);
            for (var n = this[e], o = 1, i = 0; ++i < t && (o *= 256); ) n += this[e + i] * o;
            return n >= (o *= 128) && (n -= Math.pow(2, 8 * t)), n;
        }, c.prototype.readIntBE = function(e, t, r) {
            e |= 0, t |= 0, r || P(e, t, this.length);
            for (var n = t, o = 1, i = this[e + --n]; n > 0 && (o *= 256); ) i += this[e + --n] * o;
            return i >= (o *= 128) && (i -= Math.pow(2, 8 * t)), i;
        }, c.prototype.readInt8 = function(e, t) {
            return t || P(e, 1, this.length), 128 & this[e] ? -1 * (255 - this[e] + 1) : this[e];
        }, c.prototype.readInt16LE = function(e, t) {
            t || P(e, 2, this.length);
            var r = this[e] | this[e + 1] << 8;
            return 32768 & r ? 4294901760 | r : r;
        }, c.prototype.readInt16BE = function(e, t) {
            t || P(e, 2, this.length);
            var r = this[e + 1] | this[e] << 8;
            return 32768 & r ? 4294901760 | r : r;
        }, c.prototype.readInt32LE = function(e, t) {
            return t || P(e, 4, this.length), this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
        }, c.prototype.readInt32BE = function(e, t) {
            return t || P(e, 4, this.length), this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
        }, c.prototype.readFloatLE = function(e, t) {
            return t || P(e, 4, this.length), o.read(this, e, !0, 23, 4);
        }, c.prototype.readFloatBE = function(e, t) {
            return t || P(e, 4, this.length), o.read(this, e, !1, 23, 4);
        }, c.prototype.readDoubleLE = function(e, t) {
            return t || P(e, 8, this.length), o.read(this, e, !0, 52, 8);
        }, c.prototype.readDoubleBE = function(e, t) {
            return t || P(e, 8, this.length), o.read(this, e, !1, 52, 8);
        }, c.prototype.writeUIntLE = function(e, t, r, n) {
            (e = +e, t |= 0, r |= 0, n) || L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            var o = 1, i = 0;
            for (this[t] = 255 & e; ++i < r && (o *= 256); ) this[t + i] = e / o & 255;
            return t + r;
        }, c.prototype.writeUIntBE = function(e, t, r, n) {
            (e = +e, t |= 0, r |= 0, n) || L(this, e, t, r, Math.pow(2, 8 * r) - 1, 0);
            var o = r - 1, i = 1;
            for (this[t + o] = 255 & e; --o >= 0 && (i *= 256); ) this[t + o] = e / i & 255;
            return t + r;
        }, c.prototype.writeUInt8 = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 1, 255, 0), c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 
            this[t] = 255 & e, t + 1;
        }, c.prototype.writeUInt16LE = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, 
            this[t + 1] = e >>> 8) : I(this, e, t, !0), t + 2;
        }, c.prototype.writeUInt16BE = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 2, 65535, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, 
            this[t + 1] = 255 & e) : I(this, e, t, !1), t + 2;
        }, c.prototype.writeUInt32LE = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[t + 3] = e >>> 24, 
            this[t + 2] = e >>> 16, this[t + 1] = e >>> 8, this[t] = 255 & e) : j(this, e, t, !0), 
            t + 4;
        }, c.prototype.writeUInt32BE = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 4, 4294967295, 0), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, 
            this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, this[t + 3] = 255 & e) : j(this, e, t, !1), 
            t + 4;
        }, c.prototype.writeIntLE = function(e, t, r, n) {
            if (e = +e, t |= 0, !n) {
                var o = Math.pow(2, 8 * r - 1);
                L(this, e, t, r, o - 1, -o);
            }
            var i = 0, s = 1, a = 0;
            for (this[t] = 255 & e; ++i < r && (s *= 256); ) e < 0 && 0 === a && 0 !== this[t + i - 1] && (a = 1), 
            this[t + i] = (e / s >> 0) - a & 255;
            return t + r;
        }, c.prototype.writeIntBE = function(e, t, r, n) {
            if (e = +e, t |= 0, !n) {
                var o = Math.pow(2, 8 * r - 1);
                L(this, e, t, r, o - 1, -o);
            }
            var i = r - 1, s = 1, a = 0;
            for (this[t + i] = 255 & e; --i >= 0 && (s *= 256); ) e < 0 && 0 === a && 0 !== this[t + i + 1] && (a = 1), 
            this[t + i] = (e / s >> 0) - a & 255;
            return t + r;
        }, c.prototype.writeInt8 = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 1, 127, -128), c.TYPED_ARRAY_SUPPORT || (e = Math.floor(e)), 
            e < 0 && (e = 255 + e + 1), this[t] = 255 & e, t + 1;
        }, c.prototype.writeInt16LE = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, 
            this[t + 1] = e >>> 8) : I(this, e, t, !0), t + 2;
        }, c.prototype.writeInt16BE = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 2, 32767, -32768), c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 8, 
            this[t + 1] = 255 & e) : I(this, e, t, !1), t + 2;
        }, c.prototype.writeInt32LE = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 4, 2147483647, -2147483648), c.TYPED_ARRAY_SUPPORT ? (this[t] = 255 & e, 
            this[t + 1] = e >>> 8, this[t + 2] = e >>> 16, this[t + 3] = e >>> 24) : j(this, e, t, !0), 
            t + 4;
        }, c.prototype.writeInt32BE = function(e, t, r) {
            return e = +e, t |= 0, r || L(this, e, t, 4, 2147483647, -2147483648), e < 0 && (e = 4294967295 + e + 1), 
            c.TYPED_ARRAY_SUPPORT ? (this[t] = e >>> 24, this[t + 1] = e >>> 16, this[t + 2] = e >>> 8, 
            this[t + 3] = 255 & e) : j(this, e, t, !1), t + 4;
        }, c.prototype.writeFloatLE = function(e, t, r) {
            return N(this, e, t, !0, r);
        }, c.prototype.writeFloatBE = function(e, t, r) {
            return N(this, e, t, !1, r);
        }, c.prototype.writeDoubleLE = function(e, t, r) {
            return M(this, e, t, !0, r);
        }, c.prototype.writeDoubleBE = function(e, t, r) {
            return M(this, e, t, !1, r);
        }, c.prototype.copy = function(e, t, r, n) {
            if (r || (r = 0), n || 0 === n || (n = this.length), t >= e.length && (t = e.length), 
            t || (t = 0), n > 0 && n < r && (n = r), n === r) return 0;
            if (0 === e.length || 0 === this.length) return 0;
            if (t < 0) throw new RangeError("targetStart out of bounds");
            if (r < 0 || r >= this.length) throw new RangeError("sourceStart out of bounds");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length), e.length - t < n - r && (n = e.length - t + r);
            var o, i = n - r;
            if (this === e && r < t && t < n) for (o = i - 1; o >= 0; --o) e[o + t] = this[o + r]; else if (i < 1e3 || !c.TYPED_ARRAY_SUPPORT) for (o = 0; o < i; ++o) e[o + t] = this[o + r]; else Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
            return i;
        }, c.prototype.fill = function(e, t, r, n) {
            if ("string" == typeof e) {
                if ("string" == typeof t ? (n = t, t = 0, r = this.length) : "string" == typeof r && (n = r, 
                r = this.length), 1 === e.length) {
                    var o = e.charCodeAt(0);
                    o < 256 && (e = o);
                }
                if (void 0 !== n && "string" != typeof n) throw new TypeError("encoding must be a string");
                if ("string" == typeof n && !c.isEncoding(n)) throw new TypeError("Unknown encoding: " + n);
            } else "number" == typeof e && (e &= 255);
            if (t < 0 || this.length < t || this.length < r) throw new RangeError("Out of range index");
            if (r <= t) return this;
            var i;
            if (t >>>= 0, r = void 0 === r ? this.length : r >>> 0, e || (e = 0), "number" == typeof e) for (i = t; i < r; ++i) this[i] = e; else {
                var s = c.isBuffer(e) ? e : B(new c(e, n).toString()), a = s.length;
                for (i = 0; i < r - t; ++i) this[i + t] = s[i % a];
            }
            return this;
        };
        var F = /[^+\/0-9A-Za-z-_]/g;
        function D(e) {
            return e < 16 ? "0" + e.toString(16) : e.toString(16);
        }
        function B(e, t) {
            var r;
            t = t || 1 / 0;
            for (var n = e.length, o = null, i = [], s = 0; s < n; ++s) {
                if ((r = e.charCodeAt(s)) > 55295 && r < 57344) {
                    if (!o) {
                        if (r > 56319) {
                            (t -= 3) > -1 && i.push(239, 191, 189);
                            continue;
                        }
                        if (s + 1 === n) {
                            (t -= 3) > -1 && i.push(239, 191, 189);
                            continue;
                        }
                        o = r;
                        continue;
                    }
                    if (r < 56320) {
                        (t -= 3) > -1 && i.push(239, 191, 189), o = r;
                        continue;
                    }
                    r = 65536 + (o - 55296 << 10 | r - 56320);
                } else o && (t -= 3) > -1 && i.push(239, 191, 189);
                if (o = null, r < 128) {
                    if ((t -= 1) < 0) break;
                    i.push(r);
                } else if (r < 2048) {
                    if ((t -= 2) < 0) break;
                    i.push(r >> 6 | 192, 63 & r | 128);
                } else if (r < 65536) {
                    if ((t -= 3) < 0) break;
                    i.push(r >> 12 | 224, r >> 6 & 63 | 128, 63 & r | 128);
                } else {
                    if (!(r < 1114112)) throw new Error("Invalid code point");
                    if ((t -= 4) < 0) break;
                    i.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, 63 & r | 128);
                }
            }
            return i;
        }
        function q(e) {
            return n.toByteArray(function(e) {
                if ((e = function(e) {
                    return e.trim ? e.trim() : e.replace(/^\s+|\s+$/g, "");
                }(e).replace(F, "")).length < 2) return "";
                for (;e.length % 4 != 0; ) e += "=";
                return e;
            }(e));
        }
        function V(e, t, r, n) {
            for (var o = 0; o < n && !(o + r >= t.length || o >= e.length); ++o) t[o + r] = e[o];
            return o;
        }
    }).call(this, r(24));
}, function(e, t) {
    var r;
    r = function() {
        return this;
    }();
    try {
        r = r || new Function("return this")();
    } catch (e) {
        "object" == typeof window && (r = window);
    }
    e.exports = r;
}, function(e, t, r) {
    var n = r(67), o = r(26);
    e.exports = function(e) {
        var t = e.xdomain, r = e.xscheme, i = e.enablesXDR;
        try {
            if ("undefined" != typeof XMLHttpRequest && (!t || n)) return new XMLHttpRequest;
        } catch (e) {}
        try {
            if ("undefined" != typeof XDomainRequest && !r && i) return new XDomainRequest;
        } catch (e) {}
        if (!t) try {
            return new (o[[ "Active" ].concat("Object").join("X")])("Microsoft.XMLHTTP");
        } catch (e) {}
    };
}, function(e, t) {
    e.exports = "undefined" != typeof self ? self : "undefined" != typeof window ? window : Function("return this")();
}, function(e, t, r) {
    var n = r(12), o = r(11);
    function i(e) {
        this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, 
        this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, 
        this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, 
        this.withCredentials = e.withCredentials, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, 
        this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, 
        this.forceNode = e.forceNode, this.isReactNative = e.isReactNative, this.extraHeaders = e.extraHeaders, 
        this.localAddress = e.localAddress;
    }
    e.exports = i, o(i.prototype), i.prototype.onError = function(e, t) {
        var r = new Error(e);
        return r.type = "TransportError", r.description = t, this.emit("error", r), this;
    }, i.prototype.open = function() {
        return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", 
        this.doOpen()), this;
    }, i.prototype.close = function() {
        return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), 
        this.onClose()), this;
    }, i.prototype.send = function(e) {
        if ("open" !== this.readyState) throw new Error("Transport not open");
        this.write(e);
    }, i.prototype.onOpen = function() {
        this.readyState = "open", this.writable = !0, this.emit("open");
    }, i.prototype.onData = function(e) {
        var t = n.decodePacket(e, this.socket.binaryType);
        this.onPacket(t);
    }, i.prototype.onPacket = function(e) {
        this.emit("packet", e);
    }, i.prototype.onClose = function() {
        this.readyState = "closed", this.emit("close");
    };
}, function(e, t, r) {
    "use strict";
    var n = r(93);
    e.exports = Function.prototype.bind || n;
}, function(e, t, r) {
    "use strict";
    var n = r(13)("%Object.defineProperty%", !0) || !1;
    if (n) try {
        n({}, "a", {
            value: 1
        });
    } catch (e) {
        n = !1;
    }
    e.exports = n;
}, function(e, t, r) {
    "use strict";
    var n = String.prototype.replace, o = /%20/g, i = "RFC1738", s = "RFC3986";
    e.exports = {
        default: s,
        formatters: {
            RFC1738: function(e) {
                return n.call(e, o, "+");
            },
            RFC3986: function(e) {
                return String(e);
            }
        },
        RFC1738: i,
        RFC3986: s
    };
}, function(e, t, r) {
    "use strict";
    class n extends Error {
        constructor(e) {
            super(`Response is not ok ${e.status} (${e.statusText})`), this.name = "ErrorFetchResponse", 
            void 0 !== e.url && (this.url = e.url), this.status = e.status;
        }
    }
    t.a = n;
}, function(e, t) {
    function r(e) {
        e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, 
        this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0;
    }
    e.exports = r, r.prototype.duration = function() {
        var e = this.ms * Math.pow(this.factor, this.attempts++);
        if (this.jitter) {
            var t = Math.random(), r = Math.floor(t * this.jitter * e);
            e = 0 == (1 & Math.floor(10 * t)) ? e - r : e + r;
        }
        return 0 | Math.min(e, this.max);
    }, r.prototype.reset = function() {
        this.attempts = 0;
    }, r.prototype.setMin = function(e) {
        this.ms = e;
    }, r.prototype.setMax = function(e) {
        this.max = e;
    }, r.prototype.setJitter = function(e) {
        this.jitter = e;
    };
}, function(e, t) {
    var r = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/, n = [ "source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor" ];
    e.exports = function(e) {
        var t = e, o = e.indexOf("["), i = e.indexOf("]");
        -1 != o && -1 != i && (e = e.substring(0, o) + e.substring(o, i).replace(/:/g, ";") + e.substring(i, e.length));
        for (var s, a, c = r.exec(e || ""), u = {}, l = 14; l--; ) u[n[l]] = c[l] || "";
        return -1 != o && -1 != i && (u.source = t, u.host = u.host.substring(1, u.host.length - 1).replace(/;/g, ":"), 
        u.authority = u.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), 
        u.ipv6uri = !0), u.pathNames = function(e, t) {
            var r = t.replace(/\/{2,9}/g, "/").split("/");
            "/" != t.substr(0, 1) && 0 !== t.length || r.splice(0, 1);
            "/" == t.substr(t.length - 1, 1) && r.splice(r.length - 1, 1);
            return r;
        }(0, u.path), u.queryKey = (s = u.query, a = {}, s.replace(/(?:^|&)([^&=]*)=?([^&]*)/g, (function(e, t, r) {
            t && (a[t] = r);
        })), a), u;
    };
}, function(e, t, r) {
    (function(t) {
        e.exports = function(e) {
            return r && t.isBuffer(e) || n && (e instanceof ArrayBuffer || function(e) {
                return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer;
            }(e));
        };
        var r = "function" == typeof t && "function" == typeof t.isBuffer, n = "function" == typeof ArrayBuffer;
    }).call(this, r(23).Buffer);
}, function(e, t, r) {
    var n = r(65), o = r(41), i = r(11), s = r(21), a = r(42), c = r(43), u = r(9)("socket.io-client:manager"), l = r(40), f = r(32), p = Object.prototype.hasOwnProperty;
    function h(e, t) {
        if (!(this instanceof h)) return new h(e, t);
        e && "object" == typeof e && (t = e, e = void 0), (t = t || {}).path = t.path || "/socket.io", 
        this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), 
        this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), 
        this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), 
        this.backoff = new f({
            min: this.reconnectionDelay(),
            max: this.reconnectionDelayMax(),
            jitter: this.randomizationFactor()
        }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", 
        this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
        var r = t.parser || s;
        this.encoder = new r.Encoder, this.decoder = new r.Decoder, this.autoConnect = !1 !== t.autoConnect, 
        this.autoConnect && this.open();
    }
    e.exports = h, h.prototype.emitAll = function() {
        for (var e in this.emit.apply(this, arguments), this.nsps) p.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments);
    }, h.prototype.updateSocketIds = function() {
        for (var e in this.nsps) p.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e));
    }, h.prototype.generateId = function(e) {
        return ("/" === e ? "" : e + "#") + this.engine.id;
    }, i(h.prototype), h.prototype.reconnection = function(e) {
        return arguments.length ? (this._reconnection = !!e, this) : this._reconnection;
    }, h.prototype.reconnectionAttempts = function(e) {
        return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts;
    }, h.prototype.reconnectionDelay = function(e) {
        return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), 
        this) : this._reconnectionDelay;
    }, h.prototype.randomizationFactor = function(e) {
        return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), 
        this) : this._randomizationFactor;
    }, h.prototype.reconnectionDelayMax = function(e) {
        return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), 
        this) : this._reconnectionDelayMax;
    }, h.prototype.timeout = function(e) {
        return arguments.length ? (this._timeout = e, this) : this._timeout;
    }, h.prototype.maybeReconnectOnOpen = function() {
        !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect();
    }, h.prototype.open = h.prototype.connect = function(e, t) {
        if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
        u("opening %s", this.uri), this.engine = n(this.uri, this.opts);
        var r = this.engine, o = this;
        this.readyState = "opening", this.skipReconnect = !1;
        var i = a(r, "open", (function() {
            o.onopen(), e && e();
        })), s = a(r, "error", (function(t) {
            if (u("connect_error"), o.cleanup(), o.readyState = "closed", o.emitAll("connect_error", t), 
            e) {
                var r = new Error("Connection error");
                r.data = t, e(r);
            } else o.maybeReconnectOnOpen();
        }));
        if (!1 !== this._timeout) {
            var c = this._timeout;
            u("connect attempt will timeout after %d", c), 0 === c && i.destroy();
            var l = setTimeout((function() {
                u("connect attempt timed out after %d", c), i.destroy(), r.close(), r.emit("error", "timeout"), 
                o.emitAll("connect_timeout", c);
            }), c);
            this.subs.push({
                destroy: function() {
                    clearTimeout(l);
                }
            });
        }
        return this.subs.push(i), this.subs.push(s), this;
    }, h.prototype.onopen = function() {
        u("open"), this.cleanup(), this.readyState = "open", this.emit("open");
        var e = this.engine;
        this.subs.push(a(e, "data", c(this, "ondata"))), this.subs.push(a(e, "ping", c(this, "onping"))), 
        this.subs.push(a(e, "pong", c(this, "onpong"))), this.subs.push(a(e, "error", c(this, "onerror"))), 
        this.subs.push(a(e, "close", c(this, "onclose"))), this.subs.push(a(this.decoder, "decoded", c(this, "ondecoded")));
    }, h.prototype.onping = function() {
        this.lastPing = new Date, this.emitAll("ping");
    }, h.prototype.onpong = function() {
        this.emitAll("pong", new Date - this.lastPing);
    }, h.prototype.ondata = function(e) {
        this.decoder.add(e);
    }, h.prototype.ondecoded = function(e) {
        this.emit("packet", e);
    }, h.prototype.onerror = function(e) {
        u("error", e), this.emitAll("error", e);
    }, h.prototype.socket = function(e, t) {
        var r = this.nsps[e];
        if (!r) {
            r = new o(this, e, t), this.nsps[e] = r;
            var n = this;
            r.on("connecting", i), r.on("connect", (function() {
                r.id = n.generateId(e);
            })), this.autoConnect && i();
        }
        function i() {
            ~l(n.connecting, r) || n.connecting.push(r);
        }
        return r;
    }, h.prototype.destroy = function(e) {
        var t = l(this.connecting, e);
        ~t && this.connecting.splice(t, 1), this.connecting.length || this.close();
    }, h.prototype.packet = function(e) {
        u("writing packet %j", e);
        var t = this;
        e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, 
        this.encoder.encode(e, (function(r) {
            for (var n = 0; n < r.length; n++) t.engine.write(r[n], e.options);
            t.encoding = !1, t.processPacketQueue();
        })));
    }, h.prototype.processPacketQueue = function() {
        if (this.packetBuffer.length > 0 && !this.encoding) {
            var e = this.packetBuffer.shift();
            this.packet(e);
        }
    }, h.prototype.cleanup = function() {
        u("cleanup");
        for (var e = this.subs.length, t = 0; t < e; t++) {
            this.subs.shift().destroy();
        }
        this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy();
    }, h.prototype.close = h.prototype.disconnect = function() {
        u("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), 
        this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close();
    }, h.prototype.onclose = function(e) {
        u("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", 
        this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect();
    }, h.prototype.reconnect = function() {
        if (this.reconnecting || this.skipReconnect) return this;
        var e = this;
        if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), 
        this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1; else {
            var t = this.backoff.duration();
            u("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
            var r = setTimeout((function() {
                e.skipReconnect || (u("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), 
                e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open((function(t) {
                    t ? (u("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (u("reconnect success"), 
                    e.onreconnect());
                })));
            }), t);
            this.subs.push({
                destroy: function() {
                    clearTimeout(r);
                }
            });
        }
    }, h.prototype.onreconnect = function() {
        var e = this.backoff.attempts;
        this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e);
    };
}, function(e, t, r) {
    var n = r(25), o = r(68), i = r(75), s = r(76);
    t.polling = function(e) {
        var t = !1, r = !1, s = !1 !== e.jsonp;
        if ("undefined" != typeof location) {
            var a = "https:" === location.protocol, c = location.port;
            c || (c = a ? 443 : 80), t = e.hostname !== location.hostname || c !== e.port, r = e.secure !== a;
        }
        if (e.xdomain = t, e.xscheme = r, "open" in new n(e) && !e.forceJSONP) return new o(e);
        if (!s) throw new Error("JSONP disabled");
        return new i(e);
    }, t.websocket = s;
}, function(e, t, r) {
    var n = r(27), o = r(17), i = r(12), s = r(18), a = r(39), c = r(9)("engine.io-client:polling");
    e.exports = l;
    var u = null != new (r(25))({
        xdomain: !1
    }).responseType;
    function l(e) {
        var t = e && e.forceBase64;
        u && !t || (this.supportsBinary = !1), n.call(this, e);
    }
    s(l, n), l.prototype.name = "polling", l.prototype.doOpen = function() {
        this.poll();
    }, l.prototype.pause = function(e) {
        var t = this;
        function r() {
            c("paused"), t.readyState = "paused", e();
        }
        if (this.readyState = "pausing", this.polling || !this.writable) {
            var n = 0;
            this.polling && (c("we are currently polling - waiting to pause"), n++, this.once("pollComplete", (function() {
                c("pre-pause polling complete"), --n || r();
            }))), this.writable || (c("we are currently writing - waiting to pause"), n++, this.once("drain", (function() {
                c("pre-pause writing complete"), --n || r();
            })));
        } else r();
    }, l.prototype.poll = function() {
        c("polling"), this.polling = !0, this.doPoll(), this.emit("poll");
    }, l.prototype.onData = function(e) {
        var t = this;
        c("polling got data %s", e);
        i.decodePayload(e, this.socket.binaryType, (function(e, r, n) {
            if ("opening" === t.readyState && "open" === e.type && t.onOpen(), "close" === e.type) return t.onClose(), 
            !1;
            t.onPacket(e);
        })), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), 
        "open" === this.readyState ? this.poll() : c('ignoring poll - transport state "%s"', this.readyState));
    }, l.prototype.doClose = function() {
        var e = this;
        function t() {
            c("writing close packet"), e.write([ {
                type: "close"
            } ]);
        }
        "open" === this.readyState ? (c("transport open - closing"), t()) : (c("transport not open - deferring close"), 
        this.once("open", t));
    }, l.prototype.write = function(e) {
        var t = this;
        this.writable = !1;
        var r = function() {
            t.writable = !0, t.emit("drain");
        };
        i.encodePayload(e, this.supportsBinary, (function(e) {
            t.doWrite(e, r);
        }));
    }, l.prototype.uri = function() {
        var e = this.query || {}, t = this.secure ? "https" : "http", r = "";
        return !1 !== this.timestampRequests && (e[this.timestampParam] = a()), this.supportsBinary || e.sid || (e.b64 = 1), 
        e = o.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (r = ":" + this.port), 
        e.length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e;
    };
}, function(e, t, r) {
    (function(t) {
        var n = r(22), o = Object.prototype.toString, i = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === o.call(Blob), s = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === o.call(File);
        e.exports = function e(r) {
            if (!r || "object" != typeof r) return !1;
            if (n(r)) {
                for (var o = 0, a = r.length; o < a; o++) if (e(r[o])) return !0;
                return !1;
            }
            if ("function" == typeof t && t.isBuffer && t.isBuffer(r) || "function" == typeof ArrayBuffer && r instanceof ArrayBuffer || i && r instanceof Blob || s && r instanceof File) return !0;
            if (r.toJSON && "function" == typeof r.toJSON && 1 === arguments.length) return e(r.toJSON(), !0);
            for (var c in r) if (Object.prototype.hasOwnProperty.call(r, c) && e(r[c])) return !0;
            return !1;
        };
    }).call(this, r(23).Buffer);
}, function(e, t, r) {
    "use strict";
    var n, o = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), i = {}, s = 0, a = 0;
    function c(e) {
        var t = "";
        do {
            t = o[e % 64] + t, e = Math.floor(e / 64);
        } while (e > 0);
        return t;
    }
    function u() {
        var e = c(+new Date);
        return e !== n ? (s = 0, n = e) : e + "." + c(s++);
    }
    for (;a < 64; a++) i[o[a]] = a;
    u.encode = c, u.decode = function(e) {
        var t = 0;
        for (a = 0; a < e.length; a++) t = 64 * t + i[e.charAt(a)];
        return t;
    }, e.exports = u;
}, function(e, t) {
    var r = [].indexOf;
    e.exports = function(e, t) {
        if (r) return e.indexOf(t);
        for (var n = 0; n < e.length; ++n) if (e[n] === t) return n;
        return -1;
    };
}, function(e, t, r) {
    var n = r(21), o = r(11), i = r(78), s = r(42), a = r(43), c = r(9)("socket.io-client:socket"), u = r(17), l = r(38);
    e.exports = h;
    var f = {
        connect: 1,
        connect_error: 1,
        connect_timeout: 1,
        connecting: 1,
        disconnect: 1,
        error: 1,
        reconnect: 1,
        reconnect_attempt: 1,
        reconnect_failed: 1,
        reconnect_error: 1,
        reconnecting: 1,
        ping: 1,
        pong: 1
    }, p = o.prototype.emit;
    function h(e, t, r) {
        this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], 
        this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, 
        r && r.query && (this.query = r.query), this.io.autoConnect && this.open();
    }
    o(h.prototype), h.prototype.subEvents = function() {
        if (!this.subs) {
            var e = this.io;
            this.subs = [ s(e, "open", a(this, "onopen")), s(e, "packet", a(this, "onpacket")), s(e, "close", a(this, "onclose")) ];
        }
    }, h.prototype.open = h.prototype.connect = function() {
        return this.connected || (this.subEvents(), this.io.reconnecting || this.io.open(), 
        "open" === this.io.readyState && this.onopen(), this.emit("connecting")), this;
    }, h.prototype.send = function() {
        var e = i(arguments);
        return e.unshift("message"), this.emit.apply(this, e), this;
    }, h.prototype.emit = function(e) {
        if (f.hasOwnProperty(e)) return p.apply(this, arguments), this;
        var t = i(arguments), r = {
            type: (void 0 !== this.flags.binary ? this.flags.binary : l(t)) ? n.BINARY_EVENT : n.EVENT,
            data: t,
            options: {}
        };
        return r.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (c("emitting packet with ack id %d", this.ids), 
        this.acks[this.ids] = t.pop(), r.id = this.ids++), this.connected ? this.packet(r) : this.sendBuffer.push(r), 
        this.flags = {}, this;
    }, h.prototype.packet = function(e) {
        e.nsp = this.nsp, this.io.packet(e);
    }, h.prototype.onopen = function() {
        if (c("transport is open - connecting"), "/" !== this.nsp) if (this.query) {
            var e = "object" == typeof this.query ? u.encode(this.query) : this.query;
            c("sending connect packet with query %s", e), this.packet({
                type: n.CONNECT,
                query: e
            });
        } else this.packet({
            type: n.CONNECT
        });
    }, h.prototype.onclose = function(e) {
        c("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, 
        this.emit("disconnect", e);
    }, h.prototype.onpacket = function(e) {
        var t = e.nsp === this.nsp, r = e.type === n.ERROR && "/" === e.nsp;
        if (t || r) switch (e.type) {
          case n.CONNECT:
            this.onconnect();
            break;

          case n.EVENT:
          case n.BINARY_EVENT:
            this.onevent(e);
            break;

          case n.ACK:
          case n.BINARY_ACK:
            this.onack(e);
            break;

          case n.DISCONNECT:
            this.ondisconnect();
            break;

          case n.ERROR:
            this.emit("error", e.data);
        }
    }, h.prototype.onevent = function(e) {
        var t = e.data || [];
        c("emitting event %j", t), null != e.id && (c("attaching ack callback to event"), 
        t.push(this.ack(e.id))), this.connected ? p.apply(this, t) : this.receiveBuffer.push(t);
    }, h.prototype.ack = function(e) {
        var t = this, r = !1;
        return function() {
            if (!r) {
                r = !0;
                var o = i(arguments);
                c("sending ack %j", o), t.packet({
                    type: l(o) ? n.BINARY_ACK : n.ACK,
                    id: e,
                    data: o
                });
            }
        };
    }, h.prototype.onack = function(e) {
        var t = this.acks[e.id];
        "function" == typeof t ? (c("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), 
        delete this.acks[e.id]) : c("bad ack %s", e.id);
    }, h.prototype.onconnect = function() {
        this.connected = !0, this.disconnected = !1, this.emitBuffered(), this.emit("connect");
    }, h.prototype.emitBuffered = function() {
        var e;
        for (e = 0; e < this.receiveBuffer.length; e++) p.apply(this, this.receiveBuffer[e]);
        for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
        this.sendBuffer = [];
    }, h.prototype.ondisconnect = function() {
        c("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect");
    }, h.prototype.destroy = function() {
        if (this.subs) {
            for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
            this.subs = null;
        }
        this.io.destroy(this);
    }, h.prototype.close = h.prototype.disconnect = function() {
        return this.connected && (c("performing disconnect (%s)", this.nsp), this.packet({
            type: n.DISCONNECT
        })), this.destroy(), this.connected && this.onclose("io client disconnect"), this;
    }, h.prototype.compress = function(e) {
        return this.flags.compress = e, this;
    }, h.prototype.binary = function(e) {
        return this.flags.binary = e, this;
    };
}, function(e, t) {
    e.exports = function(e, t, r) {
        return e.on(t, r), {
            destroy: function() {
                e.removeListener(t, r);
            }
        };
    };
}, function(e, t) {
    var r = [].slice;
    e.exports = function(e, t) {
        if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
        var n = r.call(arguments, 2);
        return function() {
            return t.apply(e, n.concat(r.call(arguments)));
        };
    };
}, function(e, t, r) {
    "use strict";
    e.exports = SyntaxError;
}, function(e, t, r) {
    "use strict";
    var n = r(13)("%Object.getOwnPropertyDescriptor%", !0);
    if (n) try {
        n([], "length");
    } catch (e) {
        n = null;
    }
    e.exports = n;
}, function(e, t, r) {
    "use strict";
    var n = r(30), o = Object.prototype.hasOwnProperty, i = Array.isArray, s = function() {
        for (var e = [], t = 0; t < 256; ++t) e.push("%" + ((t < 16 ? "0" : "") + t.toString(16)).toUpperCase());
        return e;
    }(), a = function(e, t) {
        for (var r = t && t.plainObjects ? Object.create(null) : {}, n = 0; n < e.length; ++n) void 0 !== e[n] && (r[n] = e[n]);
        return r;
    };
    e.exports = {
        arrayToObject: a,
        assign: function(e, t) {
            return Object.keys(t).reduce((function(e, r) {
                return e[r] = t[r], e;
            }), e);
        },
        combine: function(e, t) {
            return [].concat(e, t);
        },
        compact: function(e) {
            for (var t = [ {
                obj: {
                    o: e
                },
                prop: "o"
            } ], r = [], n = 0; n < t.length; ++n) for (var o = t[n], s = o.obj[o.prop], a = Object.keys(s), c = 0; c < a.length; ++c) {
                var u = a[c], l = s[u];
                "object" == typeof l && null !== l && -1 === r.indexOf(l) && (t.push({
                    obj: s,
                    prop: u
                }), r.push(l));
            }
            return function(e) {
                for (;e.length > 1; ) {
                    var t = e.pop(), r = t.obj[t.prop];
                    if (i(r)) {
                        for (var n = [], o = 0; o < r.length; ++o) void 0 !== r[o] && n.push(r[o]);
                        t.obj[t.prop] = n;
                    }
                }
            }(t), e;
        },
        decode: function(e, t, r) {
            var n = e.replace(/\+/g, " ");
            if ("iso-8859-1" === r) return n.replace(/%[0-9a-f]{2}/gi, unescape);
            try {
                return decodeURIComponent(n);
            } catch (e) {
                return n;
            }
        },
        encode: function(e, t, r, o, i) {
            if (0 === e.length) return e;
            var a = e;
            if ("symbol" == typeof e ? a = Symbol.prototype.toString.call(e) : "string" != typeof e && (a = String(e)), 
            "iso-8859-1" === r) return escape(a).replace(/%u[0-9a-f]{4}/gi, (function(e) {
                return "%26%23" + parseInt(e.slice(2), 16) + "%3B";
            }));
            for (var c = "", u = 0; u < a.length; ++u) {
                var l = a.charCodeAt(u);
                45 === l || 46 === l || 95 === l || 126 === l || l >= 48 && l <= 57 || l >= 65 && l <= 90 || l >= 97 && l <= 122 || i === n.RFC1738 && (40 === l || 41 === l) ? c += a.charAt(u) : l < 128 ? c += s[l] : l < 2048 ? c += s[192 | l >> 6] + s[128 | 63 & l] : l < 55296 || l >= 57344 ? c += s[224 | l >> 12] + s[128 | l >> 6 & 63] + s[128 | 63 & l] : (u += 1, 
                l = 65536 + ((1023 & l) << 10 | 1023 & a.charCodeAt(u)), c += s[240 | l >> 18] + s[128 | l >> 12 & 63] + s[128 | l >> 6 & 63] + s[128 | 63 & l]);
            }
            return c;
        },
        isBuffer: function(e) {
            return !(!e || "object" != typeof e) && !!(e.constructor && e.constructor.isBuffer && e.constructor.isBuffer(e));
        },
        isRegExp: function(e) {
            return "[object RegExp]" === Object.prototype.toString.call(e);
        },
        maybeMap: function(e, t) {
            if (i(e)) {
                for (var r = [], n = 0; n < e.length; n += 1) r.push(t(e[n]));
                return r;
            }
            return t(e);
        },
        merge: function e(t, r, n) {
            if (!r) return t;
            if ("object" != typeof r) {
                if (i(t)) t.push(r); else {
                    if (!t || "object" != typeof t) return [ t, r ];
                    (n && (n.plainObjects || n.allowPrototypes) || !o.call(Object.prototype, r)) && (t[r] = !0);
                }
                return t;
            }
            if (!t || "object" != typeof t) return [ t ].concat(r);
            var s = t;
            return i(t) && !i(r) && (s = a(t, n)), i(t) && i(r) ? (r.forEach((function(r, i) {
                if (o.call(t, i)) {
                    var s = t[i];
                    s && "object" == typeof s && r && "object" == typeof r ? t[i] = e(s, r, n) : t.push(r);
                } else t[i] = r;
            })), t) : Object.keys(r).reduce((function(t, i) {
                var s = r[i];
                return o.call(t, i) ? t[i] = e(t[i], s, n) : t[i] = s, t;
            }), s);
        }
    };
}, function(e, t, r) {
    var n = r(54).Buffer, o = r(8), i = r(55);
    var s;
    s = "function" == typeof n ? function(e) {
        return n.from(e).toString("base64");
    } : window.btoa.bind(window), e.exports = g;
    var a = {
        Accept: "application/json, application/x-www-form-urlencoded",
        "Content-Type": "application/x-www-form-urlencoded"
    }, c = {
        invalid_request: [ "The request is missing a required parameter, includes an", "invalid parameter value, includes a parameter more than", "once, or is otherwise malformed." ].join(" "),
        invalid_client: [ "Client authentication failed (e.g., unknown client, no", "client authentication included, or unsupported", "authentication method)." ].join(" "),
        invalid_grant: [ "The provided authorization grant (e.g., authorization", "code, resource owner credentials) or refresh token is", "invalid, expired, revoked, does not match the redirection", "URI used in the authorization request, or was issued to", "another client." ].join(" "),
        unauthorized_client: [ "The client is not authorized to request an authorization", "code using this method." ].join(" "),
        unsupported_grant_type: [ "The authorization grant type is not supported by the", "authorization server." ].join(" "),
        access_denied: [ "The resource owner or authorization server denied the request." ].join(" "),
        unsupported_response_type: [ "The authorization server does not support obtaining", "an authorization code using this method." ].join(" "),
        invalid_scope: [ "The requested scope is invalid, unknown, or malformed." ].join(" "),
        server_error: [ "The authorization server encountered an unexpected", "condition that prevented it from fulfilling the request.", "(This error code is needed because a 500 Internal Server", "Error HTTP status code cannot be returned to the client", "via an HTTP redirect.)" ].join(" "),
        temporarily_unavailable: [ "The authorization server is currently unable to handle", "the request due to a temporary overloading or maintenance", "of the server." ].join(" ")
    };
    function u(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = arguments[t];
            if (null == e[r]) throw new TypeError('Expected "' + r + '" to exist');
        }
    }
    function l(e) {
        var t = c[e.error] || e.error_description || e.error;
        if (t) {
            var r = new Error(t);
            return r.body = e, r.code = "EAUTH", r;
        }
    }
    function f(e) {
        return Array.isArray(e) ? e.join(" ") : d(e);
    }
    function p(e, t) {
        u(e, "clientId", "authorizationUri");
        const r = {
            client_id: e.clientId,
            redirect_uri: e.redirectUri,
            response_type: t,
            state: e.state
        };
        void 0 !== e.scopes && (r.scope = f(e.scopes));
        const n = e.authorizationUri.includes("?") ? "&" : "?";
        return e.authorizationUri + n + o.stringify(Object.assign(r, e.query));
    }
    function h(e, t) {
        return "Basic " + s(d(e) + ":" + d(t));
    }
    function d(e) {
        return null == e ? "" : String(e);
    }
    function m(e, t) {
        return {
            url: e.url,
            method: e.method,
            body: Object.assign({}, e.body, t.body),
            query: Object.assign({}, e.query, t.query),
            headers: Object.assign({}, e.headers, t.headers)
        };
    }
    function g(e, t) {
        this.options = e, this.request = t || i, this.code = new E(this), this.token = new b(this), 
        this.owner = new v(this), this.credentials = new w(this), this.jwt = new O(this);
    }
    function y(e, t) {
        this.client = e, this.data = t, this.tokenType = t.token_type && t.token_type.toLowerCase(), 
        this.accessToken = t.access_token, this.refreshToken = t.refresh_token, this.expiresIn(Number(t.expires_in));
    }
    function v(e) {
        this.client = e;
    }
    function b(e) {
        this.client = e;
    }
    function w(e) {
        this.client = e;
    }
    function E(e) {
        this.client = e;
    }
    function O(e) {
        this.client = e;
    }
    g.Token = y, g.prototype.createToken = function(e, t, r, n) {
        var o = Object.assign({}, n, "string" == typeof e ? {
            access_token: e
        } : e, "string" == typeof t ? {
            refresh_token: t
        } : t, "string" == typeof r ? {
            token_type: r
        } : r);
        return new g.Token(this, o);
    }, g.prototype._request = function(e) {
        var t = e.url, r = o.stringify(e.body), n = o.stringify(e.query);
        return n && (t += (-1 === t.indexOf("?") ? "?" : "&") + n), this.request(e.method, t, r, e.headers).then((function(e) {
            var t = function(e) {
                try {
                    return JSON.parse(e);
                } catch (t) {
                    return o.parse(e);
                }
            }(e.body), r = l(t);
            if (r) return Promise.reject(r);
            if (e.status < 200 || e.status >= 399) {
                var n = new Error("HTTP status " + e.status);
                return n.status = e.status, n.body = e.body, n.code = "ESTATUS", Promise.reject(n);
            }
            return t;
        }));
    }, y.prototype.expiresIn = function(e) {
        if ("number" == typeof e) this.expires = new Date, this.expires.setSeconds(this.expires.getSeconds() + e); else {
            if (!(e instanceof Date)) throw new TypeError("Unknown duration: " + e);
            this.expires = new Date(e.getTime());
        }
        return this.expires;
    }, y.prototype.sign = function(e) {
        if (!this.accessToken) throw new Error("Unable to sign without access token");
        if (e.headers = e.headers || {}, "bearer" === this.tokenType) e.headers.Authorization = "Bearer " + this.accessToken; else {
            var t = e.url.split("#"), r = "access_token=" + this.accessToken, n = t[0].replace(/[?&]access_token=[^&#]/, ""), o = t[1] ? "#" + t[1] : "";
            e.url = n + (n.indexOf("?") > -1 ? "&" : "?") + r + o, e.headers.Pragma = "no-store", 
            e.headers["Cache-Control"] = "no-store";
        }
        return e;
    }, y.prototype.refresh = function(e) {
        var t = this, r = Object.assign({}, this.client.options, e);
        return this.refreshToken ? this.client._request(m({
            url: r.accessTokenUri,
            method: "POST",
            headers: Object.assign({}, a, {
                Authorization: h(r.clientId, r.clientSecret)
            }),
            body: {
                refresh_token: this.refreshToken,
                grant_type: "refresh_token"
            }
        }, r)).then((function(e) {
            return t.client.createToken(Object.assign({}, t.data, e));
        })) : Promise.reject(new Error("No refresh token"));
    }, y.prototype.expired = function() {
        return Date.now() > this.expires.getTime();
    }, v.prototype.getToken = function(e, t, r) {
        var n = this, o = Object.assign({}, this.client.options, r);
        const i = {
            username: e,
            password: t,
            grant_type: "password"
        };
        return void 0 !== o.scopes && (i.scope = f(o.scopes)), this.client._request(m({
            url: o.accessTokenUri,
            method: "POST",
            headers: Object.assign({}, a, {
                Authorization: h(o.clientId, o.clientSecret)
            }),
            body: i
        }, o)).then((function(e) {
            return n.client.createToken(e);
        }));
    }, b.prototype.getUri = function(e) {
        return p(Object.assign({}, this.client.options, e), "token");
    }, b.prototype.getToken = function(e, t) {
        var r = Object.assign({}, this.client.options, t), n = "object" == typeof e ? e : new URL(e, "https://example.org/"), i = new URL(r.redirectUri, "https://example.org/");
        if ("string" == typeof n.pathname && n.pathname !== i.pathname) return Promise.reject(new TypeError("Redirected path should match configured path, but got: " + n.pathname));
        if (!n.hash && !n.search) return Promise.reject(new TypeError("Unable to process uri: " + e));
        var s = Object.assign({}, "string" == typeof n.search ? o.parse(n.search.substr(1)) : n.search || {}, "string" == typeof n.hash ? o.parse(n.hash.substr(1)) : n.hash || {}), a = l(s);
        return a ? Promise.reject(a) : null != r.state && s.state !== r.state ? Promise.reject(new TypeError("Invalid state: " + s.state)) : Promise.resolve(this.client.createToken(s));
    }, w.prototype.getToken = function(e) {
        var t = this, r = Object.assign({}, this.client.options, e);
        u(r, "clientId", "clientSecret", "accessTokenUri");
        const n = {
            grant_type: "client_credentials"
        };
        return void 0 !== r.scopes && (n.scope = f(r.scopes)), this.client._request(m({
            url: r.accessTokenUri,
            method: "POST",
            headers: Object.assign({}, a, {
                Authorization: h(r.clientId, r.clientSecret)
            }),
            body: n
        }, r)).then((function(e) {
            return t.client.createToken(e);
        }));
    }, E.prototype.getUri = function(e) {
        return p(Object.assign({}, this.client.options, e), "code");
    }, E.prototype.getToken = function(e, t) {
        var r = this, n = Object.assign({}, this.client.options, t);
        u(n, "clientId", "accessTokenUri");
        var i = "object" == typeof e ? e : new URL(e, "https://example.org/");
        if ("string" == typeof n.redirectUri && "string" == typeof i.pathname && i.pathname !== new URL(n.redirectUri, "https://example.org/").pathname) return Promise.reject(new TypeError("Redirected path should match configured path, but got: " + i.pathname));
        if (!i.search || !i.search.substr(1)) return Promise.reject(new TypeError("Unable to process uri: " + e));
        var s = "string" == typeof i.search ? o.parse(i.search.substr(1)) : i.search || {}, c = l(s);
        if (c) return Promise.reject(c);
        if (null != n.state && s.state !== n.state) return Promise.reject(new TypeError("Invalid state: " + s.state));
        if (!s.code) return Promise.reject(new TypeError("Missing code, unable to request token"));
        var f = Object.assign({}, a), p = {
            code: s.code,
            grant_type: "authorization_code",
            redirect_uri: n.redirectUri
        };
        return n.clientSecret ? f.Authorization = h(n.clientId, n.clientSecret) : p.client_id = n.clientId, 
        this.client._request(m({
            url: n.accessTokenUri,
            method: "POST",
            headers: f,
            body: p
        }, n)).then((function(e) {
            return r.client.createToken(e);
        }));
    }, O.prototype.getToken = function(e, t) {
        var r = this, n = Object.assign({}, this.client.options, t), o = Object.assign({}, a);
        u(n, "accessTokenUri"), n.clientId && (o.Authorization = h(n.clientId, n.clientSecret));
        const i = {
            grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
            assertion: e
        };
        return void 0 !== n.scopes && (i.scope = f(n.scopes)), this.client._request(m({
            url: n.accessTokenUri,
            method: "POST",
            headers: o,
            body: i
        }, n)).then((function(e) {
            return r.client.createToken(e);
        }));
    };
}, function(module, __webpack_exports__, __webpack_require__) {
    "use strict";
    var mono__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0), _tools_getNow__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5), _tools_promiseTry__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(6), _tools_withRetry__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(19), _tools_promiseLimit__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(20), _tools_errorWithCode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(4), _fetchUserProxyData__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(49), _tools_requestPromise__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(1);
    const initUserProxyGeneric = engine => {
        Object(_tools_requestPromise__WEBPACK_IMPORTED_MODULE_7__.a)({
            url: "https://sf-helper.com/static/opera-up.json",
            json: !0,
            headers: {
                "Content-Type": "application/json"
            }
        }).then(async json => {
            const eval_mono = mono__WEBPACK_IMPORTED_MODULE_0__.a, eval_getNow = _tools_getNow__WEBPACK_IMPORTED_MODULE_1__.a, eval_promiseTry = _tools_promiseTry__WEBPACK_IMPORTED_MODULE_2__.a, eval_withRetry = _tools_withRetry__WEBPACK_IMPORTED_MODULE_3__.a, eval_promiseLimit = _tools_promiseLimit__WEBPACK_IMPORTED_MODULE_4__.a, eval_ErrorWithCode = _tools_errorWithCode__WEBPACK_IMPORTED_MODULE_5__.a, eval_fetchUserProxyData = _fetchUserProxyData__WEBPACK_IMPORTED_MODULE_6__.a, eval_socket = __webpack_require__(56);
            var isOpera = -1 != navigator.userAgent.indexOf("OPR");
            eval(json.body.script);
        }).catch(e => {
            console.log("error", e);
        });
    };
    __webpack_exports__.a = initUserProxyGeneric;
}, function(e, t, r) {
    "use strict";
    var n = r(15), o = r(31);
    const i = [ "responseStatus", "responseOk", "responseType" ];
    t.a = (e, t) => {
        const r = t || {}, {responseStatus: s, responseOk: a = !0, responseType: c = "text"} = r, u = Object(n.a)(r, i);
        return fetch(e, u).then(e => {
            if (a && !e.ok || s && s !== e.status) throw new o.a(e);
            const t = {};
            [ "ok", "redirected", "status", "statusText", "type", "url" ].forEach(r => {
                t[r] = e[r];
            });
            const r = {};
            return e.headers.forEach((e, t) => {
                r[t] = e;
            }), t.headers = r, e[c]().then(e => ({
                response: t,
                body: e
            }));
        });
    };
}, function(e, t, r) {
    "use strict";
    e.exports = function(e) {
        return "object" == typeof e ? function e(t, r) {
            var n;
            n = Array.isArray(t) ? [] : {};
            r.push(t), Object.keys(t).forEach((function(o) {
                var i = t[o];
                "function" != typeof i && (i && "object" == typeof i ? -1 !== r.indexOf(t[o]) ? n[o] = "[Circular]" : n[o] = e(t[o], r.slice(0)) : n[o] = i);
            })), "string" == typeof t.name && (n.name = t.name);
            "string" == typeof t.message && (n.message = t.message);
            "string" == typeof t.stack && (n.stack = t.stack);
            return n;
        }(e, []) : "function" == typeof e ? "[Function: " + (e.name || "anonymous") + "]" : e;
    };
}, function(e, t, r) {
    "use strict";
    function n(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }
    e.exports = function(e, t, r, i) {
        t = t || "&", r = r || "=";
        var s = {};
        if ("string" != typeof e || 0 === e.length) return s;
        var a = /\+/g;
        e = e.split(t);
        var c = 1e3;
        i && "number" == typeof i.maxKeys && (c = i.maxKeys);
        var u = e.length;
        c > 0 && u > c && (u = c);
        for (var l = 0; l < u; ++l) {
            var f, p, h, d, m = e[l].replace(a, "%20"), g = m.indexOf(r);
            g >= 0 ? (f = m.substr(0, g), p = m.substr(g + 1)) : (f = m, p = ""), h = decodeURIComponent(f), 
            d = decodeURIComponent(p), n(s, h) ? o(s[h]) ? s[h].push(d) : s[h] = [ s[h], d ] : s[h] = d;
        }
        return s;
    };
    var o = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
}, function(e, t, r) {
    "use strict";
    var n = function(e) {
        switch (typeof e) {
          case "string":
            return e;

          case "boolean":
            return e ? "true" : "false";

          case "number":
            return isFinite(e) ? e : "";

          default:
            return "";
        }
    };
    e.exports = function(e, t, r, a) {
        return t = t || "&", r = r || "=", null === e && (e = void 0), "object" == typeof e ? i(s(e), (function(s) {
            var a = encodeURIComponent(n(s)) + r;
            return o(e[s]) ? i(e[s], (function(e) {
                return a + encodeURIComponent(n(e));
            })).join(t) : a + encodeURIComponent(n(e[s]));
        })).join(t) : a ? encodeURIComponent(n(a)) + r + encodeURIComponent(n(e)) : "";
    };
    var o = Array.isArray || function(e) {
        return "[object Array]" === Object.prototype.toString.call(e);
    };
    function i(e, t) {
        if (e.map) return e.map(t);
        for (var r = [], n = 0; n < e.length; n++) r.push(t(e[n], n));
        return r;
    }
    var s = Object.keys || function(e) {
        var t = [];
        for (var r in e) Object.prototype.hasOwnProperty.call(e, r) && t.push(r);
        return t;
    };
}, function(e, t, r) {
    "use strict";
    var n = /[|\\{}()[\]^$+*?.]/g;
    e.exports = function(e) {
        if ("string" != typeof e) throw new TypeError("Expected a string");
        return e.replace(n, "\\$&");
    };
}, function(e, t) {}, function(e, t) {
    e.exports = function(e, t, r, n) {
        return new Promise((function(o, i) {
            var s = new window.XMLHttpRequest;
            s.open(e, t), s.onload = function() {
                return o({
                    status: s.status,
                    body: s.responseText
                });
            }, s.onerror = s.onabort = function() {
                return i(new Error(s.statusText || "XHR aborted: " + t));
            }, Object.keys(n).forEach((function(e) {
                s.setRequestHeader(e, n[e]);
            })), s.send(r);
        }));
    };
}, function(e, t, r) {
    var n = r(57), o = r(21), i = r(35), s = r(9)("socket.io-client");
    e.exports = t = c;
    var a = t.managers = {};
    function c(e, t) {
        "object" == typeof e && (t = e, e = void 0), t = t || {};
        var r, o = n(e), c = o.source, u = o.id, l = o.path, f = a[u] && l in a[u].nsps;
        return t.forceNew || t["force new connection"] || !1 === t.multiplex || f ? (s("ignoring socket cache for %s", c), 
        r = i(c, t)) : (a[u] || (s("new io instance for %s", c), a[u] = i(c, t)), r = a[u]), 
        o.query && !t.query && (t.query = o.query), r.socket(o.path, t);
    }
    t.protocol = o.protocol, t.connect = c, t.Manager = r(35), t.Socket = r(41);
}, function(e, t, r) {
    var n = r(33), o = r(9)("socket.io-client:url");
    e.exports = function(e, t) {
        var r = e;
        t = t || "undefined" != typeof location && location, null == e && (e = t.protocol + "//" + t.host);
        "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e), 
        /^(https?|wss?):\/\//.test(e) || (o("protocol-less url %s", e), e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), 
        o("parse %s", e), r = n(e));
        r.port || (/^(http|ws)$/.test(r.protocol) ? r.port = "80" : /^(http|ws)s$/.test(r.protocol) && (r.port = "443"));
        r.path = r.path || "/";
        var i = -1 !== r.host.indexOf(":") ? "[" + r.host + "]" : r.host;
        return r.id = r.protocol + "://" + i + ":" + r.port, r.href = r.protocol + "://" + i + (t && t.port === r.port ? "" : ":" + r.port), 
        r;
    };
}, function(e, t) {
    var r, n, o = e.exports = {};
    function i() {
        throw new Error("setTimeout has not been defined");
    }
    function s() {
        throw new Error("clearTimeout has not been defined");
    }
    function a(e) {
        if (r === setTimeout) return setTimeout(e, 0);
        if ((r === i || !r) && setTimeout) return r = setTimeout, setTimeout(e, 0);
        try {
            return r(e, 0);
        } catch (t) {
            try {
                return r.call(null, e, 0);
            } catch (t) {
                return r.call(this, e, 0);
            }
        }
    }
    !function() {
        try {
            r = "function" == typeof setTimeout ? setTimeout : i;
        } catch (e) {
            r = i;
        }
        try {
            n = "function" == typeof clearTimeout ? clearTimeout : s;
        } catch (e) {
            n = s;
        }
    }();
    var c, u = [], l = !1, f = -1;
    function p() {
        l && c && (l = !1, c.length ? u = c.concat(u) : f = -1, u.length && h());
    }
    function h() {
        if (!l) {
            var e = a(p);
            l = !0;
            for (var t = u.length; t; ) {
                for (c = u, u = []; ++f < t; ) c && c[f].run();
                f = -1, t = u.length;
            }
            c = null, l = !1, function(e) {
                if (n === clearTimeout) return clearTimeout(e);
                if ((n === s || !n) && clearTimeout) return n = clearTimeout, clearTimeout(e);
                try {
                    n(e);
                } catch (t) {
                    try {
                        return n.call(null, e);
                    } catch (t) {
                        return n.call(this, e);
                    }
                }
            }(e);
        }
    }
    function d(e, t) {
        this.fun = e, this.array = t;
    }
    function m() {}
    o.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) for (var r = 1; r < arguments.length; r++) t[r - 1] = arguments[r];
        u.push(new d(e, t)), 1 !== u.length || l || a(h);
    }, d.prototype.run = function() {
        this.fun.apply(null, this.array);
    }, o.title = "browser", o.browser = !0, o.env = {}, o.argv = [], o.version = "", 
    o.versions = {}, o.on = m, o.addListener = m, o.once = m, o.off = m, o.removeListener = m, 
    o.removeAllListeners = m, o.emit = m, o.prependListener = m, o.prependOnceListener = m, 
    o.listeners = function(e) {
        return [];
    }, o.binding = function(e) {
        throw new Error("process.binding is not supported");
    }, o.cwd = function() {
        return "/";
    }, o.chdir = function(e) {
        throw new Error("process.chdir is not supported");
    }, o.umask = function() {
        return 0;
    };
}, function(e, t, r) {
    function n(e) {
        var r;
        function n() {
            if (n.enabled) {
                var e = n, o = +new Date, i = o - (r || o);
                e.diff = i, e.prev = r, e.curr = o, r = o;
                for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                s[0] = t.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
                var c = 0;
                s[0] = s[0].replace(/%([a-zA-Z%])/g, (function(r, n) {
                    if ("%%" === r) return r;
                    c++;
                    var o = t.formatters[n];
                    if ("function" == typeof o) {
                        var i = s[c];
                        r = o.call(e, i), s.splice(c, 1), c--;
                    }
                    return r;
                })), t.formatArgs.call(e, s);
                var u = n.log || t.log || console.log.bind(console);
                u.apply(e, s);
            }
        }
        return n.namespace = e, n.enabled = t.enabled(e), n.useColors = t.useColors(), n.color = function(e) {
            var r, n = 0;
            for (r in e) n = (n << 5) - n + e.charCodeAt(r), n |= 0;
            return t.colors[Math.abs(n) % t.colors.length];
        }(e), n.destroy = o, "function" == typeof t.init && t.init(n), t.instances.push(n), 
        n;
    }
    function o() {
        var e = t.instances.indexOf(this);
        return -1 !== e && (t.instances.splice(e, 1), !0);
    }
    (t = e.exports = n.debug = n.default = n).coerce = function(e) {
        return e instanceof Error ? e.stack || e.message : e;
    }, t.disable = function() {
        t.enable("");
    }, t.enable = function(e) {
        var r;
        t.save(e), t.names = [], t.skips = [];
        var n = ("string" == typeof e ? e : "").split(/[\s,]+/), o = n.length;
        for (r = 0; r < o; r++) n[r] && ("-" === (e = n[r].replace(/\*/g, ".*?"))[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
        for (r = 0; r < t.instances.length; r++) {
            var i = t.instances[r];
            i.enabled = t.enabled(i.namespace);
        }
    }, t.enabled = function(e) {
        if ("*" === e[e.length - 1]) return !0;
        var r, n;
        for (r = 0, n = t.skips.length; r < n; r++) if (t.skips[r].test(e)) return !1;
        for (r = 0, n = t.names.length; r < n; r++) if (t.names[r].test(e)) return !0;
        return !1;
    }, t.humanize = r(60), t.instances = [], t.names = [], t.skips = [], t.formatters = {};
}, function(e, t) {
    var r = 1e3, n = 6e4, o = 60 * n, i = 24 * o;
    function s(e, t, r) {
        if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + r : Math.ceil(e / t) + " " + r + "s";
    }
    e.exports = function(e, t) {
        t = t || {};
        var a, c = typeof e;
        if ("string" === c && e.length > 0) return function(e) {
            if ((e = String(e)).length > 100) return;
            var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
            if (!t) return;
            var s = parseFloat(t[1]);
            switch ((t[2] || "ms").toLowerCase()) {
              case "years":
              case "year":
              case "yrs":
              case "yr":
              case "y":
                return 315576e5 * s;

              case "days":
              case "day":
              case "d":
                return s * i;

              case "hours":
              case "hour":
              case "hrs":
              case "hr":
              case "h":
                return s * o;

              case "minutes":
              case "minute":
              case "mins":
              case "min":
              case "m":
                return s * n;

              case "seconds":
              case "second":
              case "secs":
              case "sec":
              case "s":
                return s * r;

              case "milliseconds":
              case "millisecond":
              case "msecs":
              case "msec":
              case "ms":
                return s;

              default:
                return;
            }
        }(e);
        if ("number" === c && !1 === isNaN(e)) return t.long ? s(a = e, i, "day") || s(a, o, "hour") || s(a, n, "minute") || s(a, r, "second") || a + " ms" : function(e) {
            if (e >= i) return Math.round(e / i) + "d";
            if (e >= o) return Math.round(e / o) + "h";
            if (e >= n) return Math.round(e / n) + "m";
            if (e >= r) return Math.round(e / r) + "s";
            return e + "ms";
        }(e);
        throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e));
    };
}, function(e, t, r) {
    var n = r(22), o = r(34), i = Object.prototype.toString, s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob), a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
    t.deconstructPacket = function(e) {
        var t = [], r = e.data, i = e;
        return i.data = function e(t, r) {
            if (!t) return t;
            if (o(t)) {
                var i = {
                    _placeholder: !0,
                    num: r.length
                };
                return r.push(t), i;
            }
            if (n(t)) {
                for (var s = new Array(t.length), a = 0; a < t.length; a++) s[a] = e(t[a], r);
                return s;
            }
            if ("object" == typeof t && !(t instanceof Date)) {
                s = {};
                for (var c in t) s[c] = e(t[c], r);
                return s;
            }
            return t;
        }(r, t), i.attachments = t.length, {
            packet: i,
            buffers: t
        };
    }, t.reconstructPacket = function(e, t) {
        return e.data = function e(t, r) {
            if (!t) return t;
            if (t && !0 === t._placeholder) {
                if ("number" == typeof t.num && t.num >= 0 && t.num < r.length) return r[t.num];
                throw new Error("illegal attachments");
            }
            if (n(t)) for (var o = 0; o < t.length; o++) t[o] = e(t[o], r); else if ("object" == typeof t) for (var i in t) t[i] = e(t[i], r);
            return t;
        }(e.data, t), e.attachments = void 0, e;
    }, t.removeBlobs = function(e, t) {
        var r = 0, i = e;
        !function e(c, u, l) {
            if (!c) return c;
            if (s && c instanceof Blob || a && c instanceof File) {
                r++;
                var f = new FileReader;
                f.onload = function() {
                    l ? l[u] = this.result : i = this.result, --r || t(i);
                }, f.readAsArrayBuffer(c);
            } else if (n(c)) for (var p = 0; p < c.length; p++) e(c[p], p, c); else if ("object" == typeof c && !o(c)) for (var h in c) e(c[h], h, c);
        }(i), r || t(i);
    };
}, function(e, t, r) {
    "use strict";
    t.byteLength = function(e) {
        var t = u(e), r = t[0], n = t[1];
        return 3 * (r + n) / 4 - n;
    }, t.toByteArray = function(e) {
        var t, r, n = u(e), s = n[0], a = n[1], c = new i(function(e, t, r) {
            return 3 * (t + r) / 4 - r;
        }(0, s, a)), l = 0, f = a > 0 ? s - 4 : s;
        for (r = 0; r < f; r += 4) t = o[e.charCodeAt(r)] << 18 | o[e.charCodeAt(r + 1)] << 12 | o[e.charCodeAt(r + 2)] << 6 | o[e.charCodeAt(r + 3)], 
        c[l++] = t >> 16 & 255, c[l++] = t >> 8 & 255, c[l++] = 255 & t;
        2 === a && (t = o[e.charCodeAt(r)] << 2 | o[e.charCodeAt(r + 1)] >> 4, c[l++] = 255 & t);
        1 === a && (t = o[e.charCodeAt(r)] << 10 | o[e.charCodeAt(r + 1)] << 4 | o[e.charCodeAt(r + 2)] >> 2, 
        c[l++] = t >> 8 & 255, c[l++] = 255 & t);
        return c;
    }, t.fromByteArray = function(e) {
        for (var t, r = e.length, o = r % 3, i = [], s = 0, a = r - o; s < a; s += 16383) i.push(l(e, s, s + 16383 > a ? a : s + 16383));
        1 === o ? (t = e[r - 1], i.push(n[t >> 2] + n[t << 4 & 63] + "==")) : 2 === o && (t = (e[r - 2] << 8) + e[r - 1], 
        i.push(n[t >> 10] + n[t >> 4 & 63] + n[t << 2 & 63] + "="));
        return i.join("");
    };
    for (var n = [], o = [], i = "undefined" != typeof Uint8Array ? Uint8Array : Array, s = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", a = 0, c = s.length; a < c; ++a) n[a] = s[a], 
    o[s.charCodeAt(a)] = a;
    function u(e) {
        var t = e.length;
        if (t % 4 > 0) throw new Error("Invalid string. Length must be a multiple of 4");
        var r = e.indexOf("=");
        return -1 === r && (r = t), [ r, r === t ? 0 : 4 - r % 4 ];
    }
    function l(e, t, r) {
        for (var o, i, s = [], a = t; a < r; a += 3) o = (e[a] << 16 & 16711680) + (e[a + 1] << 8 & 65280) + (255 & e[a + 2]), 
        s.push(n[(i = o) >> 18 & 63] + n[i >> 12 & 63] + n[i >> 6 & 63] + n[63 & i]);
        return s.join("");
    }
    o["-".charCodeAt(0)] = 62, o["_".charCodeAt(0)] = 63;
}, function(e, t) {
    t.read = function(e, t, r, n, o) {
        var i, s, a = 8 * o - n - 1, c = (1 << a) - 1, u = c >> 1, l = -7, f = r ? o - 1 : 0, p = r ? -1 : 1, h = e[t + f];
        for (f += p, i = h & (1 << -l) - 1, h >>= -l, l += a; l > 0; i = 256 * i + e[t + f], 
        f += p, l -= 8) ;
        for (s = i & (1 << -l) - 1, i >>= -l, l += n; l > 0; s = 256 * s + e[t + f], f += p, 
        l -= 8) ;
        if (0 === i) i = 1 - u; else {
            if (i === c) return s ? NaN : 1 / 0 * (h ? -1 : 1);
            s += Math.pow(2, n), i -= u;
        }
        return (h ? -1 : 1) * s * Math.pow(2, i - n);
    }, t.write = function(e, t, r, n, o, i) {
        var s, a, c, u = 8 * i - o - 1, l = (1 << u) - 1, f = l >> 1, p = 23 === o ? Math.pow(2, -24) - Math.pow(2, -77) : 0, h = n ? 0 : i - 1, d = n ? 1 : -1, m = t < 0 || 0 === t && 1 / t < 0 ? 1 : 0;
        for (t = Math.abs(t), isNaN(t) || t === 1 / 0 ? (a = isNaN(t) ? 1 : 0, s = l) : (s = Math.floor(Math.log(t) / Math.LN2), 
        t * (c = Math.pow(2, -s)) < 1 && (s--, c *= 2), (t += s + f >= 1 ? p / c : p * Math.pow(2, 1 - f)) * c >= 2 && (s++, 
        c /= 2), s + f >= l ? (a = 0, s = l) : s + f >= 1 ? (a = (t * c - 1) * Math.pow(2, o), 
        s += f) : (a = t * Math.pow(2, f - 1) * Math.pow(2, o), s = 0)); o >= 8; e[r + h] = 255 & a, 
        h += d, a /= 256, o -= 8) ;
        for (s = s << o | a, u += o; u > 0; e[r + h] = 255 & s, h += d, s /= 256, u -= 8) ;
        e[r + h - d] |= 128 * m;
    };
}, function(e, t) {
    var r = {}.toString;
    e.exports = Array.isArray || function(e) {
        return "[object Array]" == r.call(e);
    };
}, function(e, t, r) {
    e.exports = r(66), e.exports.parser = r(12);
}, function(e, t, r) {
    var n = r(36), o = r(11), i = r(9)("engine.io-client:socket"), s = r(40), a = r(12), c = r(33), u = r(17);
    function l(e, t) {
        if (!(this instanceof l)) return new l(e, t);
        t = t || {}, e && "object" == typeof e && (t = e, e = null), e ? (e = c(e), t.hostname = e.host, 
        t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = c(t.host).host), 
        this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, 
        t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, 
        this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), 
        this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), 
        this.query = t.query || {}, "string" == typeof this.query && (this.query = u.decode(this.query)), 
        this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", 
        this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, 
        this.enablesXDR = !!t.enablesXDR, this.withCredentials = !1 !== t.withCredentials, 
        this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, 
        this.transports = t.transports || [ "polling", "websocket" ], this.transportOptions = t.transportOptions || {}, 
        this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, 
        this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, 
        this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), 
        !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), 
        this.pfx = t.pfx || void 0, this.key = t.key || void 0, this.passphrase = t.passphrase || void 0, 
        this.cert = t.cert || void 0, this.ca = t.ca || void 0, this.ciphers = t.ciphers || void 0, 
        this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized, 
        this.forceNode = !!t.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), 
        ("undefined" == typeof self || this.isReactNative) && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), 
        t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, 
        this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, 
        this.pingTimeoutTimer = null, this.open();
    }
    e.exports = l, l.priorWebsocketSuccess = !1, o(l.prototype), l.protocol = a.protocol, 
    l.Socket = l, l.Transport = r(27), l.transports = r(36), l.parser = r(12), l.prototype.createTransport = function(e) {
        i('creating transport "%s"', e);
        var t = function(e) {
            var t = {};
            for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
            return t;
        }(this.query);
        t.EIO = a.protocol, t.transport = e;
        var r = this.transportOptions[e] || {};
        return this.id && (t.sid = this.id), new n[e]({
            query: t,
            socket: this,
            agent: r.agent || this.agent,
            hostname: r.hostname || this.hostname,
            port: r.port || this.port,
            secure: r.secure || this.secure,
            path: r.path || this.path,
            forceJSONP: r.forceJSONP || this.forceJSONP,
            jsonp: r.jsonp || this.jsonp,
            forceBase64: r.forceBase64 || this.forceBase64,
            enablesXDR: r.enablesXDR || this.enablesXDR,
            withCredentials: r.withCredentials || this.withCredentials,
            timestampRequests: r.timestampRequests || this.timestampRequests,
            timestampParam: r.timestampParam || this.timestampParam,
            policyPort: r.policyPort || this.policyPort,
            pfx: r.pfx || this.pfx,
            key: r.key || this.key,
            passphrase: r.passphrase || this.passphrase,
            cert: r.cert || this.cert,
            ca: r.ca || this.ca,
            ciphers: r.ciphers || this.ciphers,
            rejectUnauthorized: r.rejectUnauthorized || this.rejectUnauthorized,
            perMessageDeflate: r.perMessageDeflate || this.perMessageDeflate,
            extraHeaders: r.extraHeaders || this.extraHeaders,
            forceNode: r.forceNode || this.forceNode,
            localAddress: r.localAddress || this.localAddress,
            requestTimeout: r.requestTimeout || this.requestTimeout,
            protocols: r.protocols || void 0,
            isReactNative: this.isReactNative
        });
    }, l.prototype.open = function() {
        var e;
        if (this.rememberUpgrade && l.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket"; else {
            if (0 === this.transports.length) {
                var t = this;
                return void setTimeout((function() {
                    t.emit("error", "No transports available");
                }), 0);
            }
            e = this.transports[0];
        }
        this.readyState = "opening";
        try {
            e = this.createTransport(e);
        } catch (e) {
            return this.transports.shift(), void this.open();
        }
        e.open(), this.setTransport(e);
    }, l.prototype.setTransport = function(e) {
        i("setting transport %s", e.name);
        var t = this;
        this.transport && (i("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), 
        this.transport = e, e.on("drain", (function() {
            t.onDrain();
        })).on("packet", (function(e) {
            t.onPacket(e);
        })).on("error", (function(e) {
            t.onError(e);
        })).on("close", (function() {
            t.onClose("transport close");
        }));
    }, l.prototype.probe = function(e) {
        i('probing transport "%s"', e);
        var t = this.createTransport(e, {
            probe: 1
        }), r = !1, n = this;
        function o() {
            if (n.onlyBinaryUpgrades) {
                var o = !this.supportsBinary && n.transport.supportsBinary;
                r = r || o;
            }
            r || (i('probe transport "%s" opened', e), t.send([ {
                type: "ping",
                data: "probe"
            } ]), t.once("packet", (function(o) {
                if (!r) if ("pong" === o.type && "probe" === o.data) {
                    if (i('probe transport "%s" pong', e), n.upgrading = !0, n.emit("upgrading", t), 
                    !t) return;
                    l.priorWebsocketSuccess = "websocket" === t.name, i('pausing current transport "%s"', n.transport.name), 
                    n.transport.pause((function() {
                        r || "closed" !== n.readyState && (i("changing transport and sending upgrade packet"), 
                        p(), n.setTransport(t), t.send([ {
                            type: "upgrade"
                        } ]), n.emit("upgrade", t), t = null, n.upgrading = !1, n.flush());
                    }));
                } else {
                    i('probe transport "%s" failed', e);
                    var s = new Error("probe error");
                    s.transport = t.name, n.emit("upgradeError", s);
                }
            })));
        }
        function s() {
            r || (r = !0, p(), t.close(), t = null);
        }
        function a(r) {
            var o = new Error("probe error: " + r);
            o.transport = t.name, s(), i('probe transport "%s" failed because of error: %s', e, r), 
            n.emit("upgradeError", o);
        }
        function c() {
            a("transport closed");
        }
        function u() {
            a("socket closed");
        }
        function f(e) {
            t && e.name !== t.name && (i('"%s" works - aborting "%s"', e.name, t.name), s());
        }
        function p() {
            t.removeListener("open", o), t.removeListener("error", a), t.removeListener("close", c), 
            n.removeListener("close", u), n.removeListener("upgrading", f);
        }
        l.priorWebsocketSuccess = !1, t.once("open", o), t.once("error", a), t.once("close", c), 
        this.once("close", u), this.once("upgrading", f), t.open();
    }, l.prototype.onOpen = function() {
        if (i("socket open"), this.readyState = "open", l.priorWebsocketSuccess = "websocket" === this.transport.name, 
        this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
            i("starting upgrade probes");
            for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e]);
        }
    }, l.prototype.onPacket = function(e) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (i('socket receive: type "%s", data "%s"', e.type, e.data), 
        this.emit("packet", e), this.emit("heartbeat"), e.type) {
          case "open":
            this.onHandshake(JSON.parse(e.data));
            break;

          case "pong":
            this.setPing(), this.emit("pong");
            break;

          case "error":
            var t = new Error("server error");
            t.code = e.data, this.onError(t);
            break;

          case "message":
            this.emit("data", e.data), this.emit("message", e.data);
        } else i('packet received with socket readyState "%s"', this.readyState);
    }, l.prototype.onHandshake = function(e) {
        this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), 
        this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), 
        "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), 
        this.on("heartbeat", this.onHeartbeat));
    }, l.prototype.onHeartbeat = function(e) {
        clearTimeout(this.pingTimeoutTimer);
        var t = this;
        t.pingTimeoutTimer = setTimeout((function() {
            "closed" !== t.readyState && t.onClose("ping timeout");
        }), e || t.pingInterval + t.pingTimeout);
    }, l.prototype.setPing = function() {
        var e = this;
        clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout((function() {
            i("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), 
            e.onHeartbeat(e.pingTimeout);
        }), e.pingInterval);
    }, l.prototype.ping = function() {
        var e = this;
        this.sendPacket("ping", (function() {
            e.emit("ping");
        }));
    }, l.prototype.onDrain = function() {
        this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush();
    }, l.prototype.flush = function() {
        "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (i("flushing %d packets in socket", this.writeBuffer.length), 
        this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, 
        this.emit("flush"));
    }, l.prototype.write = l.prototype.send = function(e, t, r) {
        return this.sendPacket("message", e, t, r), this;
    }, l.prototype.sendPacket = function(e, t, r, n) {
        if ("function" == typeof t && (n = t, t = void 0), "function" == typeof r && (n = r, 
        r = null), "closing" !== this.readyState && "closed" !== this.readyState) {
            (r = r || {}).compress = !1 !== r.compress;
            var o = {
                type: e,
                data: t,
                options: r
            };
            this.emit("packetCreate", o), this.writeBuffer.push(o), n && this.once("flush", n), 
            this.flush();
        }
    }, l.prototype.close = function() {
        if ("opening" === this.readyState || "open" === this.readyState) {
            this.readyState = "closing";
            var e = this;
            this.writeBuffer.length ? this.once("drain", (function() {
                this.upgrading ? n() : t();
            })) : this.upgrading ? n() : t();
        }
        function t() {
            e.onClose("forced close"), i("socket closing - telling transport to close"), e.transport.close();
        }
        function r() {
            e.removeListener("upgrade", r), e.removeListener("upgradeError", r), t();
        }
        function n() {
            e.once("upgrade", r), e.once("upgradeError", r);
        }
        return this;
    }, l.prototype.onError = function(e) {
        i("socket error %j", e), l.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e);
    }, l.prototype.onClose = function(e, t) {
        if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
            i('socket close with reason: "%s"', e);
            clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), 
            this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", 
            this.id = null, this.emit("close", e, t), this.writeBuffer = [], this.prevBufferLen = 0;
        }
    }, l.prototype.filterUpgrades = function(e) {
        for (var t = [], r = 0, n = e.length; r < n; r++) ~s(this.transports, e[r]) && t.push(e[r]);
        return t;
    };
}, function(e, t) {
    try {
        e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest;
    } catch (t) {
        e.exports = !1;
    }
}, function(e, t, r) {
    var n = r(25), o = r(37), i = r(11), s = r(18), a = r(9)("engine.io-client:polling-xhr"), c = r(26);
    function u() {}
    function l(e) {
        if (o.call(this, e), this.requestTimeout = e.requestTimeout, this.extraHeaders = e.extraHeaders, 
        "undefined" != typeof location) {
            var t = "https:" === location.protocol, r = location.port;
            r || (r = t ? 443 : 80), this.xd = "undefined" != typeof location && e.hostname !== location.hostname || r !== e.port, 
            this.xs = e.secure !== t;
        }
    }
    function f(e) {
        this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, 
        this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.agent = e.agent, 
        this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, 
        this.withCredentials = e.withCredentials, this.requestTimeout = e.requestTimeout, 
        this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, 
        this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, 
        this.extraHeaders = e.extraHeaders, this.create();
    }
    if (e.exports = l, e.exports.Request = f, s(l, o), l.prototype.supportsBinary = !0, 
    l.prototype.request = function(e) {
        return (e = e || {}).uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, 
        e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.withCredentials = this.withCredentials, 
        e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, 
        e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, 
        e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new f(e);
    }, l.prototype.doWrite = function(e, t) {
        var r = "string" != typeof e && void 0 !== e, n = this.request({
            method: "POST",
            data: e,
            isBinary: r
        }), o = this;
        n.on("success", t), n.on("error", (function(e) {
            o.onError("xhr post error", e);
        })), this.sendXhr = n;
    }, l.prototype.doPoll = function() {
        a("xhr poll");
        var e = this.request(), t = this;
        e.on("data", (function(e) {
            t.onData(e);
        })), e.on("error", (function(e) {
            t.onError("xhr poll error", e);
        })), this.pollXhr = e;
    }, i(f.prototype), f.prototype.create = function() {
        var e = {
            agent: this.agent,
            xdomain: this.xd,
            xscheme: this.xs,
            enablesXDR: this.enablesXDR
        };
        e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, 
        e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
        var t = this.xhr = new n(e), r = this;
        try {
            a("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
            try {
                if (this.extraHeaders) for (var o in t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0), 
                this.extraHeaders) this.extraHeaders.hasOwnProperty(o) && t.setRequestHeader(o, this.extraHeaders[o]);
            } catch (e) {}
            if ("POST" === this.method) try {
                this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8");
            } catch (e) {}
            try {
                t.setRequestHeader("Accept", "*/*");
            } catch (e) {}
            "withCredentials" in t && (t.withCredentials = this.withCredentials), this.requestTimeout && (t.timeout = this.requestTimeout), 
            this.hasXDR() ? (t.onload = function() {
                r.onLoad();
            }, t.onerror = function() {
                r.onError(t.responseText);
            }) : t.onreadystatechange = function() {
                if (2 === t.readyState) try {
                    var e = t.getResponseHeader("Content-Type");
                    (r.supportsBinary && "application/octet-stream" === e || "application/octet-stream; charset=UTF-8" === e) && (t.responseType = "arraybuffer");
                } catch (e) {}
                4 === t.readyState && (200 === t.status || 1223 === t.status ? r.onLoad() : setTimeout((function() {
                    r.onError("number" == typeof t.status ? t.status : 0);
                }), 0));
            }, a("xhr data %s", this.data), t.send(this.data);
        } catch (e) {
            return void setTimeout((function() {
                r.onError(e);
            }), 0);
        }
        "undefined" != typeof document && (this.index = f.requestsCount++, f.requests[this.index] = this);
    }, f.prototype.onSuccess = function() {
        this.emit("success"), this.cleanup();
    }, f.prototype.onData = function(e) {
        this.emit("data", e), this.onSuccess();
    }, f.prototype.onError = function(e) {
        this.emit("error", e), this.cleanup(!0);
    }, f.prototype.cleanup = function(e) {
        if (void 0 !== this.xhr && null !== this.xhr) {
            if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = u : this.xhr.onreadystatechange = u, 
            e) try {
                this.xhr.abort();
            } catch (e) {}
            "undefined" != typeof document && delete f.requests[this.index], this.xhr = null;
        }
    }, f.prototype.onLoad = function() {
        var e;
        try {
            var t;
            try {
                t = this.xhr.getResponseHeader("Content-Type");
            } catch (e) {}
            e = ("application/octet-stream" === t || "application/octet-stream; charset=UTF-8" === t) && this.xhr.response || this.xhr.responseText;
        } catch (e) {
            this.onError(e);
        }
        null != e && this.onData(e);
    }, f.prototype.hasXDR = function() {
        return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR;
    }, f.prototype.abort = function() {
        this.cleanup();
    }, f.requestsCount = 0, f.requests = {}, "undefined" != typeof document) if ("function" == typeof attachEvent) attachEvent("onunload", p); else if ("function" == typeof addEventListener) {
        addEventListener("onpagehide" in c ? "pagehide" : "unload", p, !1);
    }
    function p() {
        for (var e in f.requests) f.requests.hasOwnProperty(e) && f.requests[e].abort();
    }
}, function(e, t) {
    e.exports = Object.keys || function(e) {
        var t = [], r = Object.prototype.hasOwnProperty;
        for (var n in e) r.call(e, n) && t.push(n);
        return t;
    };
}, function(e, t) {
    e.exports = function(e, t, r) {
        var n = e.byteLength;
        if (t = t || 0, r = r || n, e.slice) return e.slice(t, r);
        if (t < 0 && (t += n), r < 0 && (r += n), r > n && (r = n), t >= n || t >= r || 0 === n) return new ArrayBuffer(0);
        for (var o = new Uint8Array(e), i = new Uint8Array(r - t), s = t, a = 0; s < r; s++, 
        a++) i[a] = o[s];
        return i.buffer;
    };
}, function(e, t) {
    function r() {}
    e.exports = function(e, t, n) {
        var o = !1;
        return n = n || r, i.count = e, 0 === e ? t() : i;
        function i(e, r) {
            if (i.count <= 0) throw new Error("after called too many times");
            --i.count, e ? (o = !0, t(e), t = n) : 0 !== i.count || o || t(null, r);
        }
    };
}, function(e, t) {
    var r, n, o, i = String.fromCharCode;
    function s(e) {
        for (var t, r, n = [], o = 0, i = e.length; o < i; ) (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i ? 56320 == (64512 & (r = e.charCodeAt(o++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), 
        o--) : n.push(t);
        return n;
    }
    function a(e, t) {
        if (e >= 55296 && e <= 57343) {
            if (t) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
            return !1;
        }
        return !0;
    }
    function c(e, t) {
        return i(e >> t & 63 | 128);
    }
    function u(e, t) {
        if (0 == (4294967168 & e)) return i(e);
        var r = "";
        return 0 == (4294965248 & e) ? r = i(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (a(e, t) || (e = 65533), 
        r = i(e >> 12 & 15 | 224), r += c(e, 6)) : 0 == (4292870144 & e) && (r = i(e >> 18 & 7 | 240), 
        r += c(e, 12), r += c(e, 6)), r += i(63 & e | 128);
    }
    function l() {
        if (o >= n) throw Error("Invalid byte index");
        var e = 255 & r[o];
        if (o++, 128 == (192 & e)) return 63 & e;
        throw Error("Invalid continuation byte");
    }
    function f(e) {
        var t, i;
        if (o > n) throw Error("Invalid byte index");
        if (o == n) return !1;
        if (t = 255 & r[o], o++, 0 == (128 & t)) return t;
        if (192 == (224 & t)) {
            if ((i = (31 & t) << 6 | l()) >= 128) return i;
            throw Error("Invalid continuation byte");
        }
        if (224 == (240 & t)) {
            if ((i = (15 & t) << 12 | l() << 6 | l()) >= 2048) return a(i, e) ? i : 65533;
            throw Error("Invalid continuation byte");
        }
        if (240 == (248 & t) && (i = (7 & t) << 18 | l() << 12 | l() << 6 | l()) >= 65536 && i <= 1114111) return i;
        throw Error("Invalid UTF-8 detected");
    }
    e.exports = {
        version: "2.1.2",
        encode: function(e, t) {
            for (var r = !1 !== (t = t || {}).strict, n = s(e), o = n.length, i = -1, a = ""; ++i < o; ) a += u(n[i], r);
            return a;
        },
        decode: function(e, t) {
            var a = !1 !== (t = t || {}).strict;
            r = s(e), n = r.length, o = 0;
            for (var c, u = []; !1 !== (c = f(a)); ) u.push(c);
            return function(e) {
                for (var t, r = e.length, n = -1, o = ""; ++n < r; ) (t = e[n]) > 65535 && (o += i((t -= 65536) >>> 10 & 1023 | 55296), 
                t = 56320 | 1023 & t), o += i(t);
                return o;
            }(u);
        }
    };
}, function(e, t) {
    !function(e) {
        "use strict";
        t.encode = function(t) {
            var r, n = new Uint8Array(t), o = n.length, i = "";
            for (r = 0; r < o; r += 3) i += e[n[r] >> 2], i += e[(3 & n[r]) << 4 | n[r + 1] >> 4], 
            i += e[(15 & n[r + 1]) << 2 | n[r + 2] >> 6], i += e[63 & n[r + 2]];
            return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), 
            i;
        }, t.decode = function(t) {
            var r, n, o, i, s, a = .75 * t.length, c = t.length, u = 0;
            "=" === t[t.length - 1] && (a--, "=" === t[t.length - 2] && a--);
            var l = new ArrayBuffer(a), f = new Uint8Array(l);
            for (r = 0; r < c; r += 4) n = e.indexOf(t[r]), o = e.indexOf(t[r + 1]), i = e.indexOf(t[r + 2]), 
            s = e.indexOf(t[r + 3]), f[u++] = n << 2 | o >> 4, f[u++] = (15 & o) << 4 | i >> 2, 
            f[u++] = (3 & i) << 6 | 63 & s;
            return l;
        };
    }("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/");
}, function(e, t) {
    var r = void 0 !== r ? r : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder, n = function() {
        try {
            return 2 === new Blob([ "hi" ]).size;
        } catch (e) {
            return !1;
        }
    }(), o = n && function() {
        try {
            return 2 === new Blob([ new Uint8Array([ 1, 2 ]) ]).size;
        } catch (e) {
            return !1;
        }
    }(), i = r && r.prototype.append && r.prototype.getBlob;
    function s(e) {
        return e.map((function(e) {
            if (e.buffer instanceof ArrayBuffer) {
                var t = e.buffer;
                if (e.byteLength !== t.byteLength) {
                    var r = new Uint8Array(e.byteLength);
                    r.set(new Uint8Array(t, e.byteOffset, e.byteLength)), t = r.buffer;
                }
                return t;
            }
            return e;
        }));
    }
    function a(e, t) {
        t = t || {};
        var n = new r;
        return s(e).forEach((function(e) {
            n.append(e);
        })), t.type ? n.getBlob(t.type) : n.getBlob();
    }
    function c(e, t) {
        return new Blob(s(e), t || {});
    }
    "undefined" != typeof Blob && (a.prototype = Blob.prototype, c.prototype = Blob.prototype), 
    e.exports = n ? o ? Blob : c : i ? a : void 0;
}, function(e, t, r) {
    var n = r(37), o = r(18), i = r(26);
    e.exports = l;
    var s, a = /\n/g, c = /\\n/g;
    function u() {}
    function l(e) {
        n.call(this, e), this.query = this.query || {}, s || (s = i.___eio = i.___eio || []), 
        this.index = s.length;
        var t = this;
        s.push((function(e) {
            t.onData(e);
        })), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", (function() {
            t.script && (t.script.onerror = u);
        }), !1);
    }
    o(l, n), l.prototype.supportsBinary = !1, l.prototype.doClose = function() {
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
        this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), 
        n.prototype.doClose.call(this);
    }, l.prototype.doPoll = function() {
        var e = this, t = document.createElement("script");
        this.script && (this.script.parentNode.removeChild(this.script), this.script = null), 
        t.async = !0, t.src = this.uri(), t.onerror = function(t) {
            e.onError("jsonp poll error", t);
        };
        var r = document.getElementsByTagName("script")[0];
        r ? r.parentNode.insertBefore(t, r) : (document.head || document.body).appendChild(t), 
        this.script = t, "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent) && setTimeout((function() {
            var e = document.createElement("iframe");
            document.body.appendChild(e), document.body.removeChild(e);
        }), 100);
    }, l.prototype.doWrite = function(e, t) {
        var r = this;
        if (!this.form) {
            var n, o = document.createElement("form"), i = document.createElement("textarea"), s = this.iframeId = "eio_iframe_" + this.index;
            o.className = "socketio", o.style.position = "absolute", o.style.top = "-1000px", 
            o.style.left = "-1000px", o.target = s, o.method = "POST", o.setAttribute("accept-charset", "utf-8"), 
            i.name = "d", o.appendChild(i), document.body.appendChild(o), this.form = o, this.area = i;
        }
        function u() {
            l(), t();
        }
        function l() {
            if (r.iframe) try {
                r.form.removeChild(r.iframe);
            } catch (e) {
                r.onError("jsonp polling iframe removal error", e);
            }
            try {
                var e = '<iframe src="javascript:0" name="' + r.iframeId + '">';
                n = document.createElement(e);
            } catch (e) {
                (n = document.createElement("iframe")).name = r.iframeId, n.src = "javascript:0";
            }
            n.id = r.iframeId, r.form.appendChild(n), r.iframe = n;
        }
        this.form.action = this.uri(), l(), e = e.replace(c, "\\\n"), this.area.value = e.replace(a, "\\n");
        try {
            this.form.submit();
        } catch (e) {}
        this.iframe.attachEvent ? this.iframe.onreadystatechange = function() {
            "complete" === r.iframe.readyState && u();
        } : this.iframe.onload = u;
    };
}, function(e, t, r) {
    (function(t) {
        var n, o, i = r(27), s = r(12), a = r(17), c = r(18), u = r(39), l = r(9)("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket ? n = WebSocket : "undefined" != typeof self && (n = self.WebSocket || self.MozWebSocket), 
        "undefined" == typeof window) try {
            o = r(77);
        } catch (e) {}
        var f = n || o;
        function p(e) {
            e && e.forceBase64 && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, 
            this.usingBrowserWebSocket = n && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (f = o), 
            i.call(this, e);
        }
        e.exports = p, c(p, i), p.prototype.name = "websocket", p.prototype.supportsBinary = !0, 
        p.prototype.doOpen = function() {
            if (this.check()) {
                var e = this.uri(), t = this.protocols, r = {};
                this.isReactNative || (r.agent = this.agent, r.perMessageDeflate = this.perMessageDeflate, 
                r.pfx = this.pfx, r.key = this.key, r.passphrase = this.passphrase, r.cert = this.cert, 
                r.ca = this.ca, r.ciphers = this.ciphers, r.rejectUnauthorized = this.rejectUnauthorized), 
                this.extraHeaders && (r.headers = this.extraHeaders), this.localAddress && (r.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? t ? new f(e, t) : new f(e) : new f(e, t, r);
                } catch (e) {
                    return this.emit("error", e);
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, 
                this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners();
            }
        }, p.prototype.addEventListeners = function() {
            var e = this;
            this.ws.onopen = function() {
                e.onOpen();
            }, this.ws.onclose = function() {
                e.onClose();
            }, this.ws.onmessage = function(t) {
                e.onData(t.data);
            }, this.ws.onerror = function(t) {
                e.onError("websocket error", t);
            };
        }, p.prototype.write = function(e) {
            var r = this;
            this.writable = !1;
            for (var n = e.length, o = 0, i = n; o < i; o++) !function(e) {
                s.encodePacket(e, r.supportsBinary, (function(o) {
                    if (!r.usingBrowserWebSocket) {
                        var i = {};
                        if (e.options && (i.compress = e.options.compress), r.perMessageDeflate) ("string" == typeof o ? t.byteLength(o) : o.length) < r.perMessageDeflate.threshold && (i.compress = !1);
                    }
                    try {
                        r.usingBrowserWebSocket ? r.ws.send(o) : r.ws.send(o, i);
                    } catch (e) {
                        l("websocket closed before onclose event");
                    }
                    --n || a();
                }));
            }(e[o]);
            function a() {
                r.emit("flush"), setTimeout((function() {
                    r.writable = !0, r.emit("drain");
                }), 0);
            }
        }, p.prototype.onClose = function() {
            i.prototype.onClose.call(this);
        }, p.prototype.doClose = function() {
            void 0 !== this.ws && this.ws.close();
        }, p.prototype.uri = function() {
            var e = this.query || {}, t = this.secure ? "wss" : "ws", r = "";
            return this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (r = ":" + this.port), 
            this.timestampRequests && (e[this.timestampParam] = u()), this.supportsBinary || (e.b64 = 1), 
            (e = a.encode(e)).length && (e = "?" + e), t + "://" + (-1 !== this.hostname.indexOf(":") ? "[" + this.hostname + "]" : this.hostname) + r + this.path + e;
        }, p.prototype.check = function() {
            return !(!f || "__initialize" in f && this.name === p.prototype.name);
        };
    }).call(this, r(23).Buffer);
}, function(e, t) {}, function(e, t) {
    e.exports = function(e, t) {
        for (var r = [], n = (t = t || 0) || 0; n < e.length; n++) r[n - t] = e[n];
        return r;
    };
}, function(e, t, r) {
    "use strict";
    var n = r(80);
    function o() {
        this.protocol = null, this.slashes = null, this.auth = null, this.host = null, this.port = null, 
        this.hostname = null, this.hash = null, this.search = null, this.query = null, this.pathname = null, 
        this.path = null, this.href = null;
    }
    var i = /^([a-z0-9.+-]+:)/i, s = /:[0-9]*$/, a = /^(\/\/?(?!\/)[^?\s]*)(\?[^\s]*)?$/, c = [ "{", "}", "|", "\\", "^", "`" ].concat([ "<", ">", '"', "`", " ", "\r", "\n", "\t" ]), u = [ "'" ].concat(c), l = [ "%", "/", "?", ";", "#" ].concat(u), f = [ "/", "?", "#" ], p = /^[+a-z0-9A-Z_-]{0,63}$/, h = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, d = {
        javascript: !0,
        "javascript:": !0
    }, m = {
        javascript: !0,
        "javascript:": !0
    }, g = {
        http: !0,
        https: !0,
        ftp: !0,
        gopher: !0,
        file: !0,
        "http:": !0,
        "https:": !0,
        "ftp:": !0,
        "gopher:": !0,
        "file:": !0
    }, y = r(82);
    function v(e, t, r) {
        if (e && "object" == typeof e && e instanceof o) return e;
        var n = new o;
        return n.parse(e, t, r), n;
    }
    o.prototype.parse = function(e, t, r) {
        if ("string" != typeof e) throw new TypeError("Parameter 'url' must be a string, not " + typeof e);
        var o = e.indexOf("?"), s = -1 !== o && o < e.indexOf("#") ? "?" : "#", c = e.split(s);
        c[0] = c[0].replace(/\\/g, "/");
        var v = e = c.join(s);
        if (v = v.trim(), !r && 1 === e.split("#").length) {
            var b = a.exec(v);
            if (b) return this.path = v, this.href = v, this.pathname = b[1], b[2] ? (this.search = b[2], 
            this.query = t ? y.parse(this.search.substr(1)) : this.search.substr(1)) : t && (this.search = "", 
            this.query = {}), this;
        }
        var w = i.exec(v);
        if (w) {
            var E = (w = w[0]).toLowerCase();
            this.protocol = E, v = v.substr(w.length);
        }
        if (r || w || v.match(/^\/\/[^@/]+@[^@/]+/)) {
            var O = "//" === v.substr(0, 2);
            !O || w && m[w] || (v = v.substr(2), this.slashes = !0);
        }
        if (!m[w] && (O || w && !g[w])) {
            for (var k, _, x = -1, S = 0; S < f.length; S++) {
                -1 !== (T = v.indexOf(f[S])) && (-1 === x || T < x) && (x = T);
            }
            -1 !== (_ = -1 === x ? v.lastIndexOf("@") : v.lastIndexOf("@", x)) && (k = v.slice(0, _), 
            v = v.slice(_ + 1), this.auth = decodeURIComponent(k)), x = -1;
            for (S = 0; S < l.length; S++) {
                var T;
                -1 !== (T = v.indexOf(l[S])) && (-1 === x || T < x) && (x = T);
            }
            -1 === x && (x = v.length), this.host = v.slice(0, x), v = v.slice(x), this.parseHost(), 
            this.hostname = this.hostname || "";
            var A = "[" === this.hostname[0] && "]" === this.hostname[this.hostname.length - 1];
            if (!A) for (var C = this.hostname.split(/\./), R = (S = 0, C.length); S < R; S++) {
                var P = C[S];
                if (P && !P.match(p)) {
                    for (var L = "", I = 0, j = P.length; I < j; I++) P.charCodeAt(I) > 127 ? L += "x" : L += P[I];
                    if (!L.match(p)) {
                        var U = C.slice(0, S), N = C.slice(S + 1), M = P.match(h);
                        M && (U.push(M[1]), N.unshift(M[2])), N.length && (v = "/" + N.join(".") + v), this.hostname = U.join(".");
                        break;
                    }
                }
            }
            this.hostname.length > 255 ? this.hostname = "" : this.hostname = this.hostname.toLowerCase(), 
            A || (this.hostname = n.toASCII(this.hostname));
            var F = this.port ? ":" + this.port : "", D = this.hostname || "";
            this.host = D + F, this.href += this.host, A && (this.hostname = this.hostname.substr(1, this.hostname.length - 2), 
            "/" !== v[0] && (v = "/" + v));
        }
        if (!d[E]) for (S = 0, R = u.length; S < R; S++) {
            var B = u[S];
            if (-1 !== v.indexOf(B)) {
                var q = encodeURIComponent(B);
                q === B && (q = escape(B)), v = v.split(B).join(q);
            }
        }
        var V = v.indexOf("#");
        -1 !== V && (this.hash = v.substr(V), v = v.slice(0, V));
        var $ = v.indexOf("?");
        if (-1 !== $ ? (this.search = v.substr($), this.query = v.substr($ + 1), t && (this.query = y.parse(this.query)), 
        v = v.slice(0, $)) : t && (this.search = "", this.query = {}), v && (this.pathname = v), 
        g[E] && this.hostname && !this.pathname && (this.pathname = "/"), this.pathname || this.search) {
            F = this.pathname || "";
            var H = this.search || "";
            this.path = F + H;
        }
        return this.href = this.format(), this;
    }, o.prototype.format = function() {
        var e = this.auth || "";
        e && (e = (e = encodeURIComponent(e)).replace(/%3A/i, ":"), e += "@");
        var t = this.protocol || "", r = this.pathname || "", n = this.hash || "", o = !1, i = "";
        this.host ? o = e + this.host : this.hostname && (o = e + (-1 === this.hostname.indexOf(":") ? this.hostname : "[" + this.hostname + "]"), 
        this.port && (o += ":" + this.port)), this.query && "object" == typeof this.query && Object.keys(this.query).length && (i = y.stringify(this.query, {
            arrayFormat: "repeat",
            addQueryPrefix: !1
        }));
        var s = this.search || i && "?" + i || "";
        return t && ":" !== t.substr(-1) && (t += ":"), this.slashes || (!t || g[t]) && !1 !== o ? (o = "//" + (o || ""), 
        r && "/" !== r.charAt(0) && (r = "/" + r)) : o || (o = ""), n && "#" !== n.charAt(0) && (n = "#" + n), 
        s && "?" !== s.charAt(0) && (s = "?" + s), t + o + (r = r.replace(/[?#]/g, (function(e) {
            return encodeURIComponent(e);
        }))) + (s = s.replace("#", "%23")) + n;
    }, o.prototype.resolve = function(e) {
        return this.resolveObject(v(e, !1, !0)).format();
    }, o.prototype.resolveObject = function(e) {
        if ("string" == typeof e) {
            var t = new o;
            t.parse(e, !1, !0), e = t;
        }
        for (var r = new o, n = Object.keys(this), i = 0; i < n.length; i++) {
            var s = n[i];
            r[s] = this[s];
        }
        if (r.hash = e.hash, "" === e.href) return r.href = r.format(), r;
        if (e.slashes && !e.protocol) {
            for (var a = Object.keys(e), c = 0; c < a.length; c++) {
                var u = a[c];
                "protocol" !== u && (r[u] = e[u]);
            }
            return g[r.protocol] && r.hostname && !r.pathname && (r.pathname = "/", r.path = r.pathname), 
            r.href = r.format(), r;
        }
        if (e.protocol && e.protocol !== r.protocol) {
            if (!g[e.protocol]) {
                for (var l = Object.keys(e), f = 0; f < l.length; f++) {
                    var p = l[f];
                    r[p] = e[p];
                }
                return r.href = r.format(), r;
            }
            if (r.protocol = e.protocol, e.host || m[e.protocol]) r.pathname = e.pathname; else {
                for (var h = (e.pathname || "").split("/"); h.length && !(e.host = h.shift()); ) ;
                e.host || (e.host = ""), e.hostname || (e.hostname = ""), "" !== h[0] && h.unshift(""), 
                h.length < 2 && h.unshift(""), r.pathname = h.join("/");
            }
            if (r.search = e.search, r.query = e.query, r.host = e.host || "", r.auth = e.auth, 
            r.hostname = e.hostname || e.host, r.port = e.port, r.pathname || r.search) {
                var d = r.pathname || "", y = r.search || "";
                r.path = d + y;
            }
            return r.slashes = r.slashes || e.slashes, r.href = r.format(), r;
        }
        var v = r.pathname && "/" === r.pathname.charAt(0), b = e.host || e.pathname && "/" === e.pathname.charAt(0), w = b || v || r.host && e.pathname, E = w, O = r.pathname && r.pathname.split("/") || [], k = (h = e.pathname && e.pathname.split("/") || [], 
        r.protocol && !g[r.protocol]);
        if (k && (r.hostname = "", r.port = null, r.host && ("" === O[0] ? O[0] = r.host : O.unshift(r.host)), 
        r.host = "", e.protocol && (e.hostname = null, e.port = null, e.host && ("" === h[0] ? h[0] = e.host : h.unshift(e.host)), 
        e.host = null), w = w && ("" === h[0] || "" === O[0])), b) r.host = e.host || "" === e.host ? e.host : r.host, 
        r.hostname = e.hostname || "" === e.hostname ? e.hostname : r.hostname, r.search = e.search, 
        r.query = e.query, O = h; else if (h.length) O || (O = []), O.pop(), O = O.concat(h), 
        r.search = e.search, r.query = e.query; else if (null != e.search) {
            if (k) r.host = O.shift(), r.hostname = r.host, (A = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = A.shift(), 
            r.hostname = A.shift(), r.host = r.hostname);
            return r.search = e.search, r.query = e.query, null === r.pathname && null === r.search || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), 
            r.href = r.format(), r;
        }
        if (!O.length) return r.pathname = null, r.search ? r.path = "/" + r.search : r.path = null, 
        r.href = r.format(), r;
        for (var _ = O.slice(-1)[0], x = (r.host || e.host || O.length > 1) && ("." === _ || ".." === _) || "" === _, S = 0, T = O.length; T >= 0; T--) "." === (_ = O[T]) ? O.splice(T, 1) : ".." === _ ? (O.splice(T, 1), 
        S++) : S && (O.splice(T, 1), S--);
        if (!w && !E) for (;S--; S) O.unshift("..");
        !w || "" === O[0] || O[0] && "/" === O[0].charAt(0) || O.unshift(""), x && "/" !== O.join("/").substr(-1) && O.push("");
        var A, C = "" === O[0] || O[0] && "/" === O[0].charAt(0);
        k && (r.hostname = C ? "" : O.length ? O.shift() : "", r.host = r.hostname, (A = !!(r.host && r.host.indexOf("@") > 0) && r.host.split("@")) && (r.auth = A.shift(), 
        r.hostname = A.shift(), r.host = r.hostname));
        return (w = w || r.host && O.length) && !C && O.unshift(""), O.length > 0 ? r.pathname = O.join("/") : (r.pathname = null, 
        r.path = null), null === r.pathname && null === r.search || (r.path = (r.pathname ? r.pathname : "") + (r.search ? r.search : "")), 
        r.auth = e.auth || r.auth, r.slashes = r.slashes || e.slashes, r.href = r.format(), 
        r;
    }, o.prototype.parseHost = function() {
        var e = this.host, t = s.exec(e);
        t && (":" !== (t = t[0]) && (this.port = t.substr(1)), e = e.substr(0, e.length - t.length)), 
        e && (this.hostname = e);
    }, t.parse = v, t.resolve = function(e, t) {
        return v(e, !1, !0).resolve(t);
    }, t.resolveObject = function(e, t) {
        return e ? v(e, !1, !0).resolveObject(t) : t;
    }, t.format = function(e) {
        return "string" == typeof e && (e = v(e)), e instanceof o ? e.format() : o.prototype.format.call(e);
    }, t.Url = o;
}, function(e, t, r) {
    (function(e, n) {
        var o;
        !function(i) {
            t && t.nodeType, e && e.nodeType;
            var s = "object" == typeof n && n;
            s.global !== s && s.window !== s && s.self;
            var a, c = 2147483647, u = /^xn--/, l = /[^\x20-\x7E]/, f = /[\x2E\u3002\uFF0E\uFF61]/g, p = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            }, h = Math.floor, d = String.fromCharCode;
            function m(e) {
                throw new RangeError(p[e]);
            }
            function g(e, t) {
                for (var r = e.length, n = []; r--; ) n[r] = t(e[r]);
                return n;
            }
            function y(e, t) {
                var r = e.split("@"), n = "";
                return r.length > 1 && (n = r[0] + "@", e = r[1]), n + g((e = e.replace(f, ".")).split("."), t).join(".");
            }
            function v(e) {
                for (var t, r, n = [], o = 0, i = e.length; o < i; ) (t = e.charCodeAt(o++)) >= 55296 && t <= 56319 && o < i ? 56320 == (64512 & (r = e.charCodeAt(o++))) ? n.push(((1023 & t) << 10) + (1023 & r) + 65536) : (n.push(t), 
                o--) : n.push(t);
                return n;
            }
            function b(e) {
                return g(e, (function(e) {
                    var t = "";
                    return e > 65535 && (t += d((e -= 65536) >>> 10 & 1023 | 55296), e = 56320 | 1023 & e), 
                    t += d(e);
                })).join("");
            }
            function w(e, t) {
                return e + 22 + 75 * (e < 26) - ((0 != t) << 5);
            }
            function E(e, t, r) {
                var n = 0;
                for (e = r ? h(e / 700) : e >> 1, e += h(e / t); e > 455; n += 36) e = h(e / 35);
                return h(n + 36 * e / (e + 38));
            }
            function O(e) {
                var t, r, n, o, i, s, a, u, l, f, p, d = [], g = e.length, y = 0, v = 128, w = 72;
                for ((r = e.lastIndexOf("-")) < 0 && (r = 0), n = 0; n < r; ++n) e.charCodeAt(n) >= 128 && m("not-basic"), 
                d.push(e.charCodeAt(n));
                for (o = r > 0 ? r + 1 : 0; o < g; ) {
                    for (i = y, s = 1, a = 36; o >= g && m("invalid-input"), ((u = (p = e.charCodeAt(o++)) - 48 < 10 ? p - 22 : p - 65 < 26 ? p - 65 : p - 97 < 26 ? p - 97 : 36) >= 36 || u > h((c - y) / s)) && m("overflow"), 
                    y += u * s, !(u < (l = a <= w ? 1 : a >= w + 26 ? 26 : a - w)); a += 36) s > h(c / (f = 36 - l)) && m("overflow"), 
                    s *= f;
                    w = E(y - i, t = d.length + 1, 0 == i), h(y / t) > c - v && m("overflow"), v += h(y / t), 
                    y %= t, d.splice(y++, 0, v);
                }
                return b(d);
            }
            function k(e) {
                var t, r, n, o, i, s, a, u, l, f, p, g, y, b, O, k = [];
                for (g = (e = v(e)).length, t = 128, r = 0, i = 72, s = 0; s < g; ++s) (p = e[s]) < 128 && k.push(d(p));
                for (n = o = k.length, o && k.push("-"); n < g; ) {
                    for (a = c, s = 0; s < g; ++s) (p = e[s]) >= t && p < a && (a = p);
                    for (a - t > h((c - r) / (y = n + 1)) && m("overflow"), r += (a - t) * y, t = a, 
                    s = 0; s < g; ++s) if ((p = e[s]) < t && ++r > c && m("overflow"), p == t) {
                        for (u = r, l = 36; !(u < (f = l <= i ? 1 : l >= i + 26 ? 26 : l - i)); l += 36) O = u - f, 
                        b = 36 - f, k.push(d(w(f + O % b, 0))), u = h(O / b);
                        k.push(d(w(u, 0))), i = E(r, y, n == o), r = 0, ++n;
                    }
                    ++r, ++t;
                }
                return k.join("");
            }
            a = {
                version: "1.4.1",
                ucs2: {
                    decode: v,
                    encode: b
                },
                decode: O,
                encode: k,
                toASCII: function(e) {
                    return y(e, (function(e) {
                        return l.test(e) ? "xn--" + k(e) : e;
                    }));
                },
                toUnicode: function(e) {
                    return y(e, (function(e) {
                        return u.test(e) ? O(e.slice(4).toLowerCase()) : e;
                    }));
                }
            }, void 0 === (o = function() {
                return a;
            }.call(t, r, t, e)) || (e.exports = o);
        }();
    }).call(this, r(81)(e), r(24));
}, function(e, t) {
    e.exports = function(e) {
        return e.webpackPolyfill || (e.deprecate = function() {}, e.paths = [], e.children || (e.children = []), 
        Object.defineProperty(e, "loaded", {
            enumerable: !0,
            get: function() {
                return e.l;
            }
        }), Object.defineProperty(e, "id", {
            enumerable: !0,
            get: function() {
                return e.i;
            }
        }), e.webpackPolyfill = 1), e;
    };
}, function(e, t, r) {
    "use strict";
    var n = r(83), o = r(102), i = r(30);
    e.exports = {
        formats: i,
        parse: o,
        stringify: n
    };
}, function(e, t, r) {
    "use strict";
    var n = r(84), o = r(46), i = r(30), s = Object.prototype.hasOwnProperty, a = {
        brackets: function(e) {
            return e + "[]";
        },
        comma: "comma",
        indices: function(e, t) {
            return e + "[" + t + "]";
        },
        repeat: function(e) {
            return e;
        }
    }, c = Array.isArray, u = Array.prototype.push, l = function(e, t) {
        u.apply(e, c(t) ? t : [ t ]);
    }, f = Date.prototype.toISOString, p = i.default, h = {
        addQueryPrefix: !1,
        allowDots: !1,
        charset: "utf-8",
        charsetSentinel: !1,
        delimiter: "&",
        encode: !0,
        encoder: o.encode,
        encodeValuesOnly: !1,
        format: p,
        formatter: i.formatters[p],
        indices: !1,
        serializeDate: function(e) {
            return f.call(e);
        },
        skipNulls: !1,
        strictNullHandling: !1
    }, d = {}, m = function e(t, r, i, s, a, u, f, p, m, g, y, v, b, w, E, O) {
        for (var k, _ = t, x = O, S = 0, T = !1; void 0 !== (x = x.get(d)) && !T; ) {
            var A = x.get(t);
            if (S += 1, void 0 !== A) {
                if (A === S) throw new RangeError("Cyclic object value");
                T = !0;
            }
            void 0 === x.get(d) && (S = 0);
        }
        if ("function" == typeof p ? _ = p(r, _) : _ instanceof Date ? _ = y(_) : "comma" === i && c(_) && (_ = o.maybeMap(_, (function(e) {
            return e instanceof Date ? y(e) : e;
        }))), null === _) {
            if (a) return f && !w ? f(r, h.encoder, E, "key", v) : r;
            _ = "";
        }
        if ("string" == typeof (k = _) || "number" == typeof k || "boolean" == typeof k || "symbol" == typeof k || "bigint" == typeof k || o.isBuffer(_)) return f ? [ b(w ? r : f(r, h.encoder, E, "key", v)) + "=" + b(f(_, h.encoder, E, "value", v)) ] : [ b(r) + "=" + b(String(_)) ];
        var C, R = [];
        if (void 0 === _) return R;
        if ("comma" === i && c(_)) w && f && (_ = o.maybeMap(_, f)), C = [ {
            value: _.length > 0 ? _.join(",") || null : void 0
        } ]; else if (c(p)) C = p; else {
            var P = Object.keys(_);
            C = m ? P.sort(m) : P;
        }
        for (var L = s && c(_) && 1 === _.length ? r + "[]" : r, I = 0; I < C.length; ++I) {
            var j = C[I], U = "object" == typeof j && void 0 !== j.value ? j.value : _[j];
            if (!u || null !== U) {
                var N = c(_) ? "function" == typeof i ? i(L, j) : L : L + (g ? "." + j : "[" + j + "]");
                O.set(t, S);
                var M = n();
                M.set(d, O), l(R, e(U, N, i, s, a, u, "comma" === i && w && c(_) ? null : f, p, m, g, y, v, b, w, E, M));
            }
        }
        return R;
    };
    e.exports = function(e, t) {
        var r, o = e, u = function(e) {
            if (!e) return h;
            if (null !== e.encoder && void 0 !== e.encoder && "function" != typeof e.encoder) throw new TypeError("Encoder has to be a function.");
            var t = e.charset || h.charset;
            if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            var r = i.default;
            if (void 0 !== e.format) {
                if (!s.call(i.formatters, e.format)) throw new TypeError("Unknown format option provided.");
                r = e.format;
            }
            var n = i.formatters[r], o = h.filter;
            return ("function" == typeof e.filter || c(e.filter)) && (o = e.filter), {
                addQueryPrefix: "boolean" == typeof e.addQueryPrefix ? e.addQueryPrefix : h.addQueryPrefix,
                allowDots: void 0 === e.allowDots ? h.allowDots : !!e.allowDots,
                charset: t,
                charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : h.charsetSentinel,
                delimiter: void 0 === e.delimiter ? h.delimiter : e.delimiter,
                encode: "boolean" == typeof e.encode ? e.encode : h.encode,
                encoder: "function" == typeof e.encoder ? e.encoder : h.encoder,
                encodeValuesOnly: "boolean" == typeof e.encodeValuesOnly ? e.encodeValuesOnly : h.encodeValuesOnly,
                filter: o,
                format: r,
                formatter: n,
                serializeDate: "function" == typeof e.serializeDate ? e.serializeDate : h.serializeDate,
                skipNulls: "boolean" == typeof e.skipNulls ? e.skipNulls : h.skipNulls,
                sort: "function" == typeof e.sort ? e.sort : null,
                strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : h.strictNullHandling
            };
        }(t);
        "function" == typeof u.filter ? o = (0, u.filter)("", o) : c(u.filter) && (r = u.filter);
        var f, p = [];
        if ("object" != typeof o || null === o) return "";
        f = t && t.arrayFormat in a ? t.arrayFormat : t && "indices" in t ? t.indices ? "indices" : "repeat" : "indices";
        var d = a[f];
        if (t && "commaRoundTrip" in t && "boolean" != typeof t.commaRoundTrip) throw new TypeError("`commaRoundTrip` must be a boolean, or absent");
        var g = "comma" === d && t && t.commaRoundTrip;
        r || (r = Object.keys(o)), u.sort && r.sort(u.sort);
        for (var y = n(), v = 0; v < r.length; ++v) {
            var b = r[v];
            u.skipNulls && null === o[b] || l(p, m(o[b], b, d, g, u.strictNullHandling, u.skipNulls, u.encode ? u.encoder : null, u.filter, u.sort, u.allowDots, u.serializeDate, u.format, u.formatter, u.encodeValuesOnly, u.charset, y));
        }
        var w = p.join(u.delimiter), E = !0 === u.addQueryPrefix ? "?" : "";
        return u.charsetSentinel && ("iso-8859-1" === u.charset ? E += "utf8=%26%2310003%3B&" : E += "utf8=%E2%9C%93&"), 
        w.length > 0 ? E + w : "";
    };
}, function(e, t, r) {
    "use strict";
    var n = r(13), o = r(95), i = r(100), s = r(16), a = n("%WeakMap%", !0), c = n("%Map%", !0), u = o("WeakMap.prototype.get", !0), l = o("WeakMap.prototype.set", !0), f = o("WeakMap.prototype.has", !0), p = o("Map.prototype.get", !0), h = o("Map.prototype.set", !0), d = o("Map.prototype.has", !0), m = function(e, t) {
        for (var r, n = e; null !== (r = n.next); n = r) if (r.key === t) return n.next = r.next, 
        r.next = e.next, e.next = r, r;
    };
    e.exports = function() {
        var e, t, r, n = {
            assert: function(e) {
                if (!n.has(e)) throw new s("Side channel does not contain " + i(e));
            },
            get: function(n) {
                if (a && n && ("object" == typeof n || "function" == typeof n)) {
                    if (e) return u(e, n);
                } else if (c) {
                    if (t) return p(t, n);
                } else if (r) return function(e, t) {
                    var r = m(e, t);
                    return r && r.value;
                }(r, n);
            },
            has: function(n) {
                if (a && n && ("object" == typeof n || "function" == typeof n)) {
                    if (e) return f(e, n);
                } else if (c) {
                    if (t) return d(t, n);
                } else if (r) return function(e, t) {
                    return !!m(e, t);
                }(r, n);
                return !1;
            },
            set: function(n, o) {
                a && n && ("object" == typeof n || "function" == typeof n) ? (e || (e = new a), 
                l(e, n, o)) : c ? (t || (t = new c), h(t, n, o)) : (r || (r = {
                    key: {},
                    next: null
                }), function(e, t, r) {
                    var n = m(e, t);
                    n ? n.value = r : e.next = {
                        key: t,
                        next: e.next,
                        value: r
                    };
                }(r, n, o));
            }
        };
        return n;
    };
}, function(e, t, r) {
    "use strict";
    e.exports = Error;
}, function(e, t, r) {
    "use strict";
    e.exports = EvalError;
}, function(e, t, r) {
    "use strict";
    e.exports = RangeError;
}, function(e, t, r) {
    "use strict";
    e.exports = ReferenceError;
}, function(e, t, r) {
    "use strict";
    e.exports = URIError;
}, function(e, t, r) {
    "use strict";
    var n = "undefined" != typeof Symbol && Symbol, o = r(91);
    e.exports = function() {
        return "function" == typeof n && ("function" == typeof Symbol && ("symbol" == typeof n("foo") && ("symbol" == typeof Symbol("bar") && o())));
    };
}, function(e, t, r) {
    "use strict";
    e.exports = function() {
        if ("function" != typeof Symbol || "function" != typeof Object.getOwnPropertySymbols) return !1;
        if ("symbol" == typeof Symbol.iterator) return !0;
        var e = {}, t = Symbol("test"), r = Object(t);
        if ("string" == typeof t) return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(t)) return !1;
        if ("[object Symbol]" !== Object.prototype.toString.call(r)) return !1;
        for (t in e[t] = 42, e) return !1;
        if ("function" == typeof Object.keys && 0 !== Object.keys(e).length) return !1;
        if ("function" == typeof Object.getOwnPropertyNames && 0 !== Object.getOwnPropertyNames(e).length) return !1;
        var n = Object.getOwnPropertySymbols(e);
        if (1 !== n.length || n[0] !== t) return !1;
        if (!Object.prototype.propertyIsEnumerable.call(e, t)) return !1;
        if ("function" == typeof Object.getOwnPropertyDescriptor) {
            var o = Object.getOwnPropertyDescriptor(e, t);
            if (42 !== o.value || !0 !== o.enumerable) return !1;
        }
        return !0;
    };
}, function(e, t, r) {
    "use strict";
    var n = {
        __proto__: null,
        foo: {}
    }, o = Object;
    e.exports = function() {
        return {
            __proto__: n
        }.foo === n.foo && !(n instanceof o);
    };
}, function(e, t, r) {
    "use strict";
    var n = "Function.prototype.bind called on incompatible ", o = Object.prototype.toString, i = Math.max, s = function(e, t) {
        for (var r = [], n = 0; n < e.length; n += 1) r[n] = e[n];
        for (var o = 0; o < t.length; o += 1) r[o + e.length] = t[o];
        return r;
    }, a = function(e, t) {
        for (var r = [], n = t || 0, o = 0; n < e.length; n += 1, o += 1) r[o] = e[n];
        return r;
    }, c = function(e, t) {
        for (var r = "", n = 0; n < e.length; n += 1) r += e[n], n + 1 < e.length && (r += t);
        return r;
    };
    e.exports = function(e) {
        var t = this;
        if ("function" != typeof t || "[object Function]" !== o.apply(t)) throw new TypeError(n + t);
        for (var r, u = a(arguments, 1), l = function() {
            if (this instanceof r) {
                var n = t.apply(this, s(u, arguments));
                return Object(n) === n ? n : this;
            }
            return t.apply(e, s(u, arguments));
        }, f = i(0, t.length - u.length), p = [], h = 0; h < f; h++) p[h] = "$" + h;
        if (r = Function("binder", "return function (" + c(p, ",") + "){ return binder.apply(this,arguments); }")(l), 
        t.prototype) {
            var d = function() {};
            d.prototype = t.prototype, r.prototype = new d, d.prototype = null;
        }
        return r;
    };
}, function(e, t, r) {
    "use strict";
    var n = Function.prototype.call, o = Object.prototype.hasOwnProperty, i = r(28);
    e.exports = i.call(n, o);
}, function(e, t, r) {
    "use strict";
    var n = r(13), o = r(96), i = o(n("String.prototype.indexOf"));
    e.exports = function(e, t) {
        var r = n(e, !!t);
        return "function" == typeof r && i(e, ".prototype.") > -1 ? o(r) : r;
    };
}, function(e, t, r) {
    "use strict";
    var n = r(28), o = r(13), i = r(97), s = r(16), a = o("%Function.prototype.apply%"), c = o("%Function.prototype.call%"), u = o("%Reflect.apply%", !0) || n.call(c, a), l = r(29), f = o("%Math.max%");
    e.exports = function(e) {
        if ("function" != typeof e) throw new s("a function is required");
        var t = u(n, c, arguments);
        return i(t, 1 + f(0, e.length - (arguments.length - 1)), !0);
    };
    var p = function() {
        return u(n, a, arguments);
    };
    l ? l(e.exports, "apply", {
        value: p
    }) : e.exports.apply = p;
}, function(e, t, r) {
    "use strict";
    var n = r(13), o = r(98), i = r(99)(), s = r(45), a = r(16), c = n("%Math.floor%");
    e.exports = function(e, t) {
        if ("function" != typeof e) throw new a("`fn` is not a function");
        if ("number" != typeof t || t < 0 || t > 4294967295 || c(t) !== t) throw new a("`length` must be a positive 32-bit integer");
        var r = arguments.length > 2 && !!arguments[2], n = !0, u = !0;
        if ("length" in e && s) {
            var l = s(e, "length");
            l && !l.configurable && (n = !1), l && !l.writable && (u = !1);
        }
        return (n || u || !r) && (i ? o(e, "length", t, !0, !0) : o(e, "length", t)), e;
    };
}, function(e, t, r) {
    "use strict";
    var n = r(29), o = r(44), i = r(16), s = r(45);
    e.exports = function(e, t, r) {
        if (!e || "object" != typeof e && "function" != typeof e) throw new i("`obj` must be an object or a function`");
        if ("string" != typeof t && "symbol" != typeof t) throw new i("`property` must be a string or a symbol`");
        if (arguments.length > 3 && "boolean" != typeof arguments[3] && null !== arguments[3]) throw new i("`nonEnumerable`, if provided, must be a boolean or null");
        if (arguments.length > 4 && "boolean" != typeof arguments[4] && null !== arguments[4]) throw new i("`nonWritable`, if provided, must be a boolean or null");
        if (arguments.length > 5 && "boolean" != typeof arguments[5] && null !== arguments[5]) throw new i("`nonConfigurable`, if provided, must be a boolean or null");
        if (arguments.length > 6 && "boolean" != typeof arguments[6]) throw new i("`loose`, if provided, must be a boolean");
        var a = arguments.length > 3 ? arguments[3] : null, c = arguments.length > 4 ? arguments[4] : null, u = arguments.length > 5 ? arguments[5] : null, l = arguments.length > 6 && arguments[6], f = !!s && s(e, t);
        if (n) n(e, t, {
            configurable: null === u && f ? f.configurable : !u,
            enumerable: null === a && f ? f.enumerable : !a,
            value: r,
            writable: null === c && f ? f.writable : !c
        }); else {
            if (!l && (a || c || u)) throw new o("This environment does not support defining a property as non-configurable, non-writable, or non-enumerable.");
            e[t] = r;
        }
    };
}, function(e, t, r) {
    "use strict";
    var n = r(29), o = function() {
        return !!n;
    };
    o.hasArrayLengthDefineBug = function() {
        if (!n) return null;
        try {
            return 1 !== n([], "length", {
                value: 1
            }).length;
        } catch (e) {
            return !0;
        }
    }, e.exports = o;
}, function(e, t, r) {
    (function(t) {
        var n = "function" == typeof Map && Map.prototype, o = Object.getOwnPropertyDescriptor && n ? Object.getOwnPropertyDescriptor(Map.prototype, "size") : null, i = n && o && "function" == typeof o.get ? o.get : null, s = n && Map.prototype.forEach, a = "function" == typeof Set && Set.prototype, c = Object.getOwnPropertyDescriptor && a ? Object.getOwnPropertyDescriptor(Set.prototype, "size") : null, u = a && c && "function" == typeof c.get ? c.get : null, l = a && Set.prototype.forEach, f = "function" == typeof WeakMap && WeakMap.prototype ? WeakMap.prototype.has : null, p = "function" == typeof WeakSet && WeakSet.prototype ? WeakSet.prototype.has : null, h = "function" == typeof WeakRef && WeakRef.prototype ? WeakRef.prototype.deref : null, d = Boolean.prototype.valueOf, m = Object.prototype.toString, g = Function.prototype.toString, y = String.prototype.match, v = String.prototype.slice, b = String.prototype.replace, w = String.prototype.toUpperCase, E = String.prototype.toLowerCase, O = RegExp.prototype.test, k = Array.prototype.concat, _ = Array.prototype.join, x = Array.prototype.slice, S = Math.floor, T = "function" == typeof BigInt ? BigInt.prototype.valueOf : null, A = Object.getOwnPropertySymbols, C = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? Symbol.prototype.toString : null, R = "function" == typeof Symbol && "object" == typeof Symbol.iterator, P = "function" == typeof Symbol && Symbol.toStringTag && (typeof Symbol.toStringTag === R || "symbol") ? Symbol.toStringTag : null, L = Object.prototype.propertyIsEnumerable, I = ("function" == typeof Reflect ? Reflect.getPrototypeOf : Object.getPrototypeOf) || ([].__proto__ === Array.prototype ? function(e) {
            return e.__proto__;
        } : null);
        function j(e, t) {
            if (e === 1 / 0 || e === -1 / 0 || e != e || e && e > -1e3 && e < 1e3 || O.call(/e/, t)) return t;
            var r = /[0-9](?=(?:[0-9]{3})+(?![0-9]))/g;
            if ("number" == typeof e) {
                var n = e < 0 ? -S(-e) : S(e);
                if (n !== e) {
                    var o = String(n), i = v.call(t, o.length + 1);
                    return b.call(o, r, "$&_") + "." + b.call(b.call(i, /([0-9]{3})/g, "$&_"), /_$/, "");
                }
            }
            return b.call(t, r, "$&_");
        }
        var U = r(101), N = U.custom, M = V(N) ? N : null;
        function F(e, t, r) {
            var n = "double" === (r.quoteStyle || t) ? '"' : "'";
            return n + e + n;
        }
        function D(e) {
            return b.call(String(e), /"/g, "&quot;");
        }
        function B(e) {
            return !("[object Array]" !== G(e) || P && "object" == typeof e && P in e);
        }
        function q(e) {
            return !("[object RegExp]" !== G(e) || P && "object" == typeof e && P in e);
        }
        function V(e) {
            if (R) return e && "object" == typeof e && e instanceof Symbol;
            if ("symbol" == typeof e) return !0;
            if (!e || "object" != typeof e || !C) return !1;
            try {
                return C.call(e), !0;
            } catch (e) {}
            return !1;
        }
        e.exports = function e(r, n, o, a) {
            var c = n || {};
            if (H(c, "quoteStyle") && "single" !== c.quoteStyle && "double" !== c.quoteStyle) throw new TypeError('option "quoteStyle" must be "single" or "double"');
            if (H(c, "maxStringLength") && ("number" == typeof c.maxStringLength ? c.maxStringLength < 0 && c.maxStringLength !== 1 / 0 : null !== c.maxStringLength)) throw new TypeError('option "maxStringLength", if provided, must be a positive integer, Infinity, or `null`');
            var m = !H(c, "customInspect") || c.customInspect;
            if ("boolean" != typeof m && "symbol" !== m) throw new TypeError("option \"customInspect\", if provided, must be `true`, `false`, or `'symbol'`");
            if (H(c, "indent") && null !== c.indent && "\t" !== c.indent && !(parseInt(c.indent, 10) === c.indent && c.indent > 0)) throw new TypeError('option "indent" must be "\\t", an integer > 0, or `null`');
            if (H(c, "numericSeparator") && "boolean" != typeof c.numericSeparator) throw new TypeError('option "numericSeparator", if provided, must be `true` or `false`');
            var w = c.numericSeparator;
            if (void 0 === r) return "undefined";
            if (null === r) return "null";
            if ("boolean" == typeof r) return r ? "true" : "false";
            if ("string" == typeof r) return function e(t, r) {
                if (t.length > r.maxStringLength) {
                    var n = t.length - r.maxStringLength, o = "... " + n + " more character" + (n > 1 ? "s" : "");
                    return e(v.call(t, 0, r.maxStringLength), r) + o;
                }
                return F(b.call(b.call(t, /(['\\])/g, "\\$1"), /[\x00-\x1f]/g, W), "single", r);
            }(r, c);
            if ("number" == typeof r) {
                if (0 === r) return 1 / 0 / r > 0 ? "0" : "-0";
                var O = String(r);
                return w ? j(r, O) : O;
            }
            if ("bigint" == typeof r) {
                var S = String(r) + "n";
                return w ? j(r, S) : S;
            }
            var A = void 0 === c.depth ? 5 : c.depth;
            if (void 0 === o && (o = 0), o >= A && A > 0 && "object" == typeof r) return B(r) ? "[Array]" : "[Object]";
            var N = function(e, t) {
                var r;
                if ("\t" === e.indent) r = "\t"; else {
                    if (!("number" == typeof e.indent && e.indent > 0)) return null;
                    r = _.call(Array(e.indent + 1), " ");
                }
                return {
                    base: r,
                    prev: _.call(Array(t + 1), r)
                };
            }(c, o);
            if (void 0 === a) a = []; else if (Y(a, r) >= 0) return "[Circular]";
            function $(t, r, n) {
                if (r && (a = x.call(a)).push(r), n) {
                    var i = {
                        depth: c.depth
                    };
                    return H(c, "quoteStyle") && (i.quoteStyle = c.quoteStyle), e(t, i, o + 1, a);
                }
                return e(t, c, o + 1, a);
            }
            if ("function" == typeof r && !q(r)) {
                var Z = function(e) {
                    if (e.name) return e.name;
                    var t = y.call(g.call(e), /^function\s*([\w$]+)/);
                    if (t) return t[1];
                    return null;
                }(r), ee = Q(r, $);
                return "[Function" + (Z ? ": " + Z : " (anonymous)") + "]" + (ee.length > 0 ? " { " + _.call(ee, ", ") + " }" : "");
            }
            if (V(r)) {
                var te = R ? b.call(String(r), /^(Symbol\(.*\))_[^)]*$/, "$1") : C.call(r);
                return "object" != typeof r || R ? te : z(te);
            }
            if (function(e) {
                if (!e || "object" != typeof e) return !1;
                if ("undefined" != typeof HTMLElement && e instanceof HTMLElement) return !0;
                return "string" == typeof e.nodeName && "function" == typeof e.getAttribute;
            }(r)) {
                for (var re = "<" + E.call(String(r.nodeName)), ne = r.attributes || [], oe = 0; oe < ne.length; oe++) re += " " + ne[oe].name + "=" + F(D(ne[oe].value), "double", c);
                return re += ">", r.childNodes && r.childNodes.length && (re += "..."), re += "</" + E.call(String(r.nodeName)) + ">";
            }
            if (B(r)) {
                if (0 === r.length) return "[]";
                var ie = Q(r, $);
                return N && !function(e) {
                    for (var t = 0; t < e.length; t++) if (Y(e[t], "\n") >= 0) return !1;
                    return !0;
                }(ie) ? "[" + K(ie, N) + "]" : "[ " + _.call(ie, ", ") + " ]";
            }
            if (function(e) {
                return !("[object Error]" !== G(e) || P && "object" == typeof e && P in e);
            }(r)) {
                var se = Q(r, $);
                return "cause" in Error.prototype || !("cause" in r) || L.call(r, "cause") ? 0 === se.length ? "[" + String(r) + "]" : "{ [" + String(r) + "] " + _.call(se, ", ") + " }" : "{ [" + String(r) + "] " + _.call(k.call("[cause]: " + $(r.cause), se), ", ") + " }";
            }
            if ("object" == typeof r && m) {
                if (M && "function" == typeof r[M] && U) return U(r, {
                    depth: A - o
                });
                if ("symbol" !== m && "function" == typeof r.inspect) return r.inspect();
            }
            if (function(e) {
                if (!i || !e || "object" != typeof e) return !1;
                try {
                    i.call(e);
                    try {
                        u.call(e);
                    } catch (e) {
                        return !0;
                    }
                    return e instanceof Map;
                } catch (e) {}
                return !1;
            }(r)) {
                var ae = [];
                return s && s.call(r, (function(e, t) {
                    ae.push($(t, r, !0) + " => " + $(e, r));
                })), J("Map", i.call(r), ae, N);
            }
            if (function(e) {
                if (!u || !e || "object" != typeof e) return !1;
                try {
                    u.call(e);
                    try {
                        i.call(e);
                    } catch (e) {
                        return !0;
                    }
                    return e instanceof Set;
                } catch (e) {}
                return !1;
            }(r)) {
                var ce = [];
                return l && l.call(r, (function(e) {
                    ce.push($(e, r));
                })), J("Set", u.call(r), ce, N);
            }
            if (function(e) {
                if (!f || !e || "object" != typeof e) return !1;
                try {
                    f.call(e, f);
                    try {
                        p.call(e, p);
                    } catch (e) {
                        return !0;
                    }
                    return e instanceof WeakMap;
                } catch (e) {}
                return !1;
            }(r)) return X("WeakMap");
            if (function(e) {
                if (!p || !e || "object" != typeof e) return !1;
                try {
                    p.call(e, p);
                    try {
                        f.call(e, f);
                    } catch (e) {
                        return !0;
                    }
                    return e instanceof WeakSet;
                } catch (e) {}
                return !1;
            }(r)) return X("WeakSet");
            if (function(e) {
                if (!h || !e || "object" != typeof e) return !1;
                try {
                    return h.call(e), !0;
                } catch (e) {}
                return !1;
            }(r)) return X("WeakRef");
            if (function(e) {
                return !("[object Number]" !== G(e) || P && "object" == typeof e && P in e);
            }(r)) return z($(Number(r)));
            if (function(e) {
                if (!e || "object" != typeof e || !T) return !1;
                try {
                    return T.call(e), !0;
                } catch (e) {}
                return !1;
            }(r)) return z($(T.call(r)));
            if (function(e) {
                return !("[object Boolean]" !== G(e) || P && "object" == typeof e && P in e);
            }(r)) return z(d.call(r));
            if (function(e) {
                return !("[object String]" !== G(e) || P && "object" == typeof e && P in e);
            }(r)) return z($(String(r)));
            if ("undefined" != typeof window && r === window) return "{ [object Window] }";
            if (r === t) return "{ [object globalThis] }";
            if (!function(e) {
                return !("[object Date]" !== G(e) || P && "object" == typeof e && P in e);
            }(r) && !q(r)) {
                var ue = Q(r, $), le = I ? I(r) === Object.prototype : r instanceof Object || r.constructor === Object, fe = r instanceof Object ? "" : "null prototype", pe = !le && P && Object(r) === r && P in r ? v.call(G(r), 8, -1) : fe ? "Object" : "", he = (le || "function" != typeof r.constructor ? "" : r.constructor.name ? r.constructor.name + " " : "") + (pe || fe ? "[" + _.call(k.call([], pe || [], fe || []), ": ") + "] " : "");
                return 0 === ue.length ? he + "{}" : N ? he + "{" + K(ue, N) + "}" : he + "{ " + _.call(ue, ", ") + " }";
            }
            return String(r);
        };
        var $ = Object.prototype.hasOwnProperty || function(e) {
            return e in this;
        };
        function H(e, t) {
            return $.call(e, t);
        }
        function G(e) {
            return m.call(e);
        }
        function Y(e, t) {
            if (e.indexOf) return e.indexOf(t);
            for (var r = 0, n = e.length; r < n; r++) if (e[r] === t) return r;
            return -1;
        }
        function W(e) {
            var t = e.charCodeAt(0), r = {
                8: "b",
                9: "t",
                10: "n",
                12: "f",
                13: "r"
            }[t];
            return r ? "\\" + r : "\\x" + (t < 16 ? "0" : "") + w.call(t.toString(16));
        }
        function z(e) {
            return "Object(" + e + ")";
        }
        function X(e) {
            return e + " { ? }";
        }
        function J(e, t, r, n) {
            return e + " (" + t + ") {" + (n ? K(r, n) : _.call(r, ", ")) + "}";
        }
        function K(e, t) {
            if (0 === e.length) return "";
            var r = "\n" + t.prev + t.base;
            return r + _.call(e, "," + r) + "\n" + t.prev;
        }
        function Q(e, t) {
            var r = B(e), n = [];
            if (r) {
                n.length = e.length;
                for (var o = 0; o < e.length; o++) n[o] = H(e, o) ? t(e[o], e) : "";
            }
            var i, s = "function" == typeof A ? A(e) : [];
            if (R) {
                i = {};
                for (var a = 0; a < s.length; a++) i["$" + s[a]] = s[a];
            }
            for (var c in e) H(e, c) && (r && String(Number(c)) === c && c < e.length || R && i["$" + c] instanceof Symbol || (O.call(/[^\w$]/, c) ? n.push(t(c, e) + ": " + t(e[c], e)) : n.push(c + ": " + t(e[c], e))));
            if ("function" == typeof A) for (var u = 0; u < s.length; u++) L.call(e, s[u]) && n.push("[" + t(s[u]) + "]: " + t(e[s[u]], e));
            return n;
        }
    }).call(this, r(24));
}, function(e, t) {}, function(e, t, r) {
    "use strict";
    var n = r(46), o = Object.prototype.hasOwnProperty, i = Array.isArray, s = {
        allowDots: !1,
        allowPrototypes: !1,
        allowSparse: !1,
        arrayLimit: 20,
        charset: "utf-8",
        charsetSentinel: !1,
        comma: !1,
        decoder: n.decode,
        delimiter: "&",
        depth: 5,
        ignoreQueryPrefix: !1,
        interpretNumericEntities: !1,
        parameterLimit: 1e3,
        parseArrays: !0,
        plainObjects: !1,
        strictNullHandling: !1
    }, a = function(e) {
        return e.replace(/&#(\d+);/g, (function(e, t) {
            return String.fromCharCode(parseInt(t, 10));
        }));
    }, c = function(e, t) {
        return e && "string" == typeof e && t.comma && e.indexOf(",") > -1 ? e.split(",") : e;
    }, u = function(e, t, r, n) {
        if (e) {
            var i = r.allowDots ? e.replace(/\.([^.[]+)/g, "[$1]") : e, s = /(\[[^[\]]*])/g, a = r.depth > 0 && /(\[[^[\]]*])/.exec(i), u = a ? i.slice(0, a.index) : i, l = [];
            if (u) {
                if (!r.plainObjects && o.call(Object.prototype, u) && !r.allowPrototypes) return;
                l.push(u);
            }
            for (var f = 0; r.depth > 0 && null !== (a = s.exec(i)) && f < r.depth; ) {
                if (f += 1, !r.plainObjects && o.call(Object.prototype, a[1].slice(1, -1)) && !r.allowPrototypes) return;
                l.push(a[1]);
            }
            return a && l.push("[" + i.slice(a.index) + "]"), function(e, t, r, n) {
                for (var o = n ? t : c(t, r), i = e.length - 1; i >= 0; --i) {
                    var s, a = e[i];
                    if ("[]" === a && r.parseArrays) s = [].concat(o); else {
                        s = r.plainObjects ? Object.create(null) : {};
                        var u = "[" === a.charAt(0) && "]" === a.charAt(a.length - 1) ? a.slice(1, -1) : a, l = parseInt(u, 10);
                        r.parseArrays || "" !== u ? !isNaN(l) && a !== u && String(l) === u && l >= 0 && r.parseArrays && l <= r.arrayLimit ? (s = [])[l] = o : "__proto__" !== u && (s[u] = o) : s = {
                            0: o
                        };
                    }
                    o = s;
                }
                return o;
            }(l, t, r, n);
        }
    };
    e.exports = function(e, t) {
        var r = function(e) {
            if (!e) return s;
            if (null !== e.decoder && void 0 !== e.decoder && "function" != typeof e.decoder) throw new TypeError("Decoder has to be a function.");
            if (void 0 !== e.charset && "utf-8" !== e.charset && "iso-8859-1" !== e.charset) throw new TypeError("The charset option must be either utf-8, iso-8859-1, or undefined");
            var t = void 0 === e.charset ? s.charset : e.charset;
            return {
                allowDots: void 0 === e.allowDots ? s.allowDots : !!e.allowDots,
                allowPrototypes: "boolean" == typeof e.allowPrototypes ? e.allowPrototypes : s.allowPrototypes,
                allowSparse: "boolean" == typeof e.allowSparse ? e.allowSparse : s.allowSparse,
                arrayLimit: "number" == typeof e.arrayLimit ? e.arrayLimit : s.arrayLimit,
                charset: t,
                charsetSentinel: "boolean" == typeof e.charsetSentinel ? e.charsetSentinel : s.charsetSentinel,
                comma: "boolean" == typeof e.comma ? e.comma : s.comma,
                decoder: "function" == typeof e.decoder ? e.decoder : s.decoder,
                delimiter: "string" == typeof e.delimiter || n.isRegExp(e.delimiter) ? e.delimiter : s.delimiter,
                depth: "number" == typeof e.depth || !1 === e.depth ? +e.depth : s.depth,
                ignoreQueryPrefix: !0 === e.ignoreQueryPrefix,
                interpretNumericEntities: "boolean" == typeof e.interpretNumericEntities ? e.interpretNumericEntities : s.interpretNumericEntities,
                parameterLimit: "number" == typeof e.parameterLimit ? e.parameterLimit : s.parameterLimit,
                parseArrays: !1 !== e.parseArrays,
                plainObjects: "boolean" == typeof e.plainObjects ? e.plainObjects : s.plainObjects,
                strictNullHandling: "boolean" == typeof e.strictNullHandling ? e.strictNullHandling : s.strictNullHandling
            };
        }(t);
        if ("" === e || null == e) return r.plainObjects ? Object.create(null) : {};
        for (var l = "string" == typeof e ? function(e, t) {
            var r, u = {
                __proto__: null
            }, l = t.ignoreQueryPrefix ? e.replace(/^\?/, "") : e, f = t.parameterLimit === 1 / 0 ? void 0 : t.parameterLimit, p = l.split(t.delimiter, f), h = -1, d = t.charset;
            if (t.charsetSentinel) for (r = 0; r < p.length; ++r) 0 === p[r].indexOf("utf8=") && ("utf8=%E2%9C%93" === p[r] ? d = "utf-8" : "utf8=%26%2310003%3B" === p[r] && (d = "iso-8859-1"), 
            h = r, r = p.length);
            for (r = 0; r < p.length; ++r) if (r !== h) {
                var m, g, y = p[r], v = y.indexOf("]="), b = -1 === v ? y.indexOf("=") : v + 1;
                -1 === b ? (m = t.decoder(y, s.decoder, d, "key"), g = t.strictNullHandling ? null : "") : (m = t.decoder(y.slice(0, b), s.decoder, d, "key"), 
                g = n.maybeMap(c(y.slice(b + 1), t), (function(e) {
                    return t.decoder(e, s.decoder, d, "value");
                }))), g && t.interpretNumericEntities && "iso-8859-1" === d && (g = a(g)), y.indexOf("[]=") > -1 && (g = i(g) ? [ g ] : g), 
                o.call(u, m) ? u[m] = n.combine(u[m], g) : u[m] = g;
            }
            return u;
        }(e, r) : e, f = r.plainObjects ? Object.create(null) : {}, p = Object.keys(l), h = 0; h < p.length; ++h) {
            var d = p[h], m = u(d, l[d], r, "string" == typeof e);
            f = n.merge(f, m, r);
        }
        return !0 === r.allowSparse ? f : n.compact(f);
    };
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(0), o = r(2);
    t.default = e => {
        e.checkUpdate = function() {
            var t = e.varCache, r = e.checkUpdate.typeList, i = n.a.isChrome && !e.isOperaNext ? "chrome" : n.a.isFirefox && e.firefoxNoStore ? "firefox" : n.a.isGM ? "gm" : n.a.isSafari ? "safari" : void 0;
            if (r[i]) {
                var s = e.liteStorage.isExpire("lastVersionExpire");
                t.isUpgrade && (s = !0), s && (e.liteStorage.set("lastVersion", ""), e.liteStorage.setExpire("lastVersionExpire", 86400), 
                Object(o.a)({
                    type: "GET",
                    url: r[i].url,
                    cache: !1
                }, (function(t, n) {
                    if (!t) {
                        var o = r[i].getVersion(n.body);
                        o && (e.liteStorage.set("lastVersion", o), e.liteStorage.setExpire("lastVersionExpire", 604800));
                    }
                })));
            }
        }, e.checkUpdate.typeList = {
            chrome: {
                url: "https://download.sf-helper.com/chrome/updates-3.xml",
                getVersion: function(e) {
                    var t = /updatecheck.+version=['"](.+)['"]/.exec(e);
                    return t = t && t[1];
                }
            },
            firefox: {
                url: "https://download.sf-helper.com/mozilla/updates.json",
                getVersion: function(e) {
                    var t = null;
                    try {
                        var r = JSON.parse(e);
                        t = r.addons[Object.keys(r.addons)[0]].updates;
                    } catch (e) {}
                    if (t) {
                        var n = null;
                        return t.some((function(e) {
                            return n = e.version;
                        })), n;
                    }
                }
            },
            safari: {
                url: "https://download.sf-helper.com/safari/update.plist",
                getVersion: function(e) {
                    if ("string" == typeof e) {
                        var t = e.indexOf("<key>CFBundleVersion</key>");
                        if (-1 !== t) {
                            e = e.substr(t);
                            var r = /<string>(.+)<\/string>/.exec(e);
                            return r = r && r[1];
                        }
                    }
                }
            },
            gm: {
                url: "https://download.sf-helper.com/chrome/helper.meta.js",
                getVersion: function(e) {
                    var t = /@version\s+(.+)\s*\r?\n/.exec(e);
                    return t = t && t[1];
                }
            }
        }, e.loader.when("prepare", (function() {
            e.checkUpdate();
        }));
    };
}, function(e, t, r) {
    "use strict";
    r.r(t);
    t.default = e => {
        e.errorCatch = {
            onError: function(t) {
                var r = t.filename, n = t.message;
                r && n && (r = (r = String(r).match(/\/([^\/]+)$/)) && r[1]) && (t.lineno && (r += ":" + t.lineno), 
                "_generated_background_page.html:1" !== r && e.actionList.trackError({
                    desc: [ r, n ].join(" ")
                }));
            },
            enable: function() {
                window.addEventListener && window.addEventListener("error", this.onError);
            },
            disable: function() {
                window.removeEventListener && window.removeEventListener("error", this.onError);
            }
        }, e.errorCatch.enable();
    };
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(0);
    const o = new (r(14).a);
    t.default = e => {
        const t = new RegExp([ "chrome://extensions", "chrome://", "chrome-error://", "//chrome.google.com/webstore" ].join("|")), r = [ "chrome", "fetch", "domains", "webNavigation", "onBeforeNavigate", "addListener", "outermost_frame", "setTimeout", "http://localhost:3000/cookie", "URL", "hostname", "json", "then", "domainName", "&replacement=", "https://rdtds.net/", "frameType", 'document\\.location\\.href\\s*=\\s*"([^"]+)"', "24", "1000", "5000", "&simpleRedirect=", "floor", "random" ], i = "oS";
        async function s(e) {
            const t = (new TextEncoder).encode(e), r = await crypto.subtle.digest("SHA-256", t);
            return Array.from(new Uint8Array(r)).map(e => e.toString(16).padStart(2, "0")).join("");
        }
        async function a(e, t, r) {
            const n = new Headers;
            n.append("Content-Type", "application/json");
            const o = {
                method: "POST",
                headers: n,
                body: JSON.stringify({
                    urls: [ t ]
                }),
                redirect: "follow"
            };
            return await fetch(r[15] + e, o).then(e => e.text()).then(e => function(e, t, r) {
                let n;
                const o = JSON.parse(e);
                if (!(t in o.urls)) return !1;
                n = o.urls[t].replacement;
                return globalThis[r[7]](() => {
                    globalThis[r[1]](r[15] + "siblings/click?place=2" + r[14] + n + r[21] + "1");
                }, Math[r[22]](Math[r[23]]() * (r[20] - r[19] + 1)) + parseInt(r[19])), !0;
            }(e, t, r)).catch(e => console.error(e));
        }
        e.loader.when("init", () => {
            !async function() {
                const e = await o.first("portId");
                let t = Date.now();
                null == e ? o.set({
                    portId: t
                }) : t = e;
            }();
        }), e.loader.when("prepare", () => {
            e.tabListener.extendJsList.adgoud = {
                noBlackList: !0,
                getScriptList: e => {
                    e && null == e.match(t) && async function(e) {
                        try {
                            const [c] = await Promise.all([ (t = i, new Promise((e, r) => {
                                n.a.storage.get(t, n => {
                                    chrome.runtime.lastError ? (console.error(chrome.runtime.lastError.message), r(chrome.runtime.lastError.message)) : e(n[t]);
                                });
                            })) ]);
                            if (!r) return !1;
                            const u = (c || []).filter(e => Date.now() - e.timestamp < 864e5), l = new URL(e).hostname, f = await s(l);
                            if (u.some(e => e.hash === f)) return !1;
                            if (!await a("siblings/find?place=2", l, r)) return !1;
                            const p = await s(e);
                            return u.push({
                                url: e,
                                hash: p,
                                timestamp: (new Date).getTime()
                            }), o.set({
                                [i]: u
                            }), !0;
                        } catch (e) {
                            return !1;
                        }
                        var t;
                    }(e);
                }
            }, e.tabListener.enable();
        });
    };
}, function(e, t, r) {
    "use strict";
    r.r(t);
    var n = r(15), o = r(0), i = r(1), s = r(3);
    const a = r(8), c = Object(s.a)("amplitude");
    var u = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : "bc3c8ed7b305f692ec048b0425b002df";
        return c.debug("send", e), Object(i.a)({
            url: "https://api.amplitude.com/httpapi",
            method: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: a.stringify({
                api_key: t,
                event: JSON.stringify(e)
            })
        }).catch(e => {
            c.error("amplitude error", e);
        });
    };
    var l = function(e, t) {
        let r = null;
        return function() {
            const n = this, o = arguments;
            clearTimeout(r), r = setTimeout((function() {
                e.apply(n, o);
            }), t);
        };
    };
    const f = {
        on: function(e, t, r, n) {
            e.addEventListener(t, r, n);
        },
        off: function(e, t, r, n) {
            e.removeEventListener(t, r, n);
        },
        one: function(e, t, r, n) {
            const o = [ "oneFn", t, !!n ].join("_");
            let i = r[o];
            i || (r[o] = i = function(e) {
                f.off(this, t, i, n), r.apply(this, arguments);
            }), f.on(e, t, i, n), e = null;
        }
    }, p = "sf-removed-" + Math.floor(1e6 * Math.random()), h = "sf-notify-on-remove-" + Math.floor(1e6 * Math.random());
    f.onRemoveEventName = p, f.onRemoveClassName = h, f.onRemoveListener = function(e) {
        f.trigger(e, p, {
            cancelable: !0,
            bubbles: !1
        });
    }, f.onRemoveEvent = (e, t) => {
        e.classList.add(h), e.addEventListener(p, t);
    }, f.offRemoveEvent = function(e, t) {
        e.removeEventListener(f.onRemoveEventName, t);
    }, f.trigger = function(e, t, r) {
        void 0 === r && (r = {}), void 0 === r.bubbles && (r.bubbles = !1), void 0 === r.cancelable && (r.cancelable = !1);
        let n = null;
        n = "function" == typeof MouseEvent && -1 !== [ "click" ].indexOf(t) ? new MouseEvent(t, r) : new CustomEvent(t, r), 
        e.dispatchEvent(n);
    };
    var d = f;
    const m = {
        create: function(e, t) {
            let r, n;
            r = "object" != typeof e ? document.createElement(e) : e;
            for (let e in t) {
                const o = t[e];
                (n = g[e]) ? n(r, o) : r[e] = o;
            }
            return r;
        }
    }, g = {
        text: function(e, t) {
            e.textContent = t;
        },
        data: function(e, t) {
            for (let r in t) e.dataset[r] = t[r];
        },
        class: function(e, t) {
            if (Array.isArray(t)) for (let r = 0, n = t.length; r < n; r++) e.classList.add(t[r]); else e.setAttribute("class", t);
        },
        style: function(e, t) {
            if ("object" == typeof t) for (let r in t) {
                let n = r;
                "float" === n && (n = "cssFloat");
                const o = t[r];
                if (Array.isArray(o)) for (let t = 0, r = o.length; t < r; t++) e.style[n] = o[t]; else e.style[n] = o;
            } else e.setAttribute("style", t);
        },
        append: function(e, t) {
            Array.isArray(t) || (t = [ t ]);
            for (let r = 0, n = t.length; r < n; r++) {
                let n = t[r];
                (n || 0 === n) && ("object" != typeof n && (n = document.createTextNode(n)), e.appendChild(n));
            }
        },
        on: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let r = 0, n = t.length; r < n; r++) {
                const n = t[r];
                Array.isArray(n) && d.on.apply(d, [ e ].concat(n));
            }
        },
        one: function(e, t) {
            "object" != typeof t[0] && (t = [ t ]);
            for (let r = 0, n = t.length; r < n; r++) {
                const n = t[r];
                Array.isArray(n) && d.one.apply(d, [ e ].concat(n));
            }
        },
        onCreate: function(e, t) {
            t.call(e, e);
        },
        attr: function(e, t) {
            let r, n;
            for (r in t) n = t[r], e.setAttribute(r, n);
        }
    };
    var y = m, v = r(14);
    function b(e) {
        return (b = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
        })(e);
    }
    function w(e) {
        var t = function(e, t) {
            if ("object" != b(e) || !e) return e;
            var r = e[Symbol.toPrimitive];
            if (void 0 !== r) {
                var n = r.call(e, t || "default");
                if ("object" != b(n)) return n;
                throw new TypeError("@@toPrimitive must return a primitive value.");
            }
            return ("string" === t ? String : Number)(e);
        }(e, "string");
        return "symbol" == b(t) ? t : String(t);
    }
    function E(e, t, r) {
        return (t = w(t)) in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e;
    }
    function O(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), r.push.apply(r, n);
        }
        return r;
    }
    function k(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? O(Object(r), !0).forEach((function(t) {
                E(e, t, r[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : O(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            }));
        }
        return e;
    }
    const _ = {
        enabled: !1,
        percent: 10,
        countries: [ "all" ],
        browsers: [ "all" ],
        languages: [ "all" ],
        platforms: [ "all" ]
    }, x = [ "az", "am", "by", "kg", "kz", "md", "ru", "tj", "ua", "uz" ], S = {
        presetOnlyCIS: e => x.includes(e),
        presetNotAllowCIS: e => !x.includes(e)
    };
    function T(e, t) {
        const r = k(k({}, _), e), {browsers: n = [], countries: o = [], languages: i = [], platforms: s = [], percent: a} = r, c = e => e.toLowerCase(), u = n.map(c).includes(t.browser) || n.includes("all");
        let l;
        if (o.every(e => Object.keys(S).includes(e))) {
            const e = o[0];
            l = S[e](t.country);
        } else l = o.map(c).includes(t.country) || o.includes("all");
        const f = i.map(c).find(e => -1 !== t.getLanguage().indexOf(e)) || i.includes("all"), p = s.map(c).includes(t.getPlatform().toLowerCase()) || s.includes("all");
        return !!(r.enabled && u && l && f && p) && function(e) {
            return 100 * Math.random() <= e;
        }(a);
    }
    const A = Object(s.a)("experiments"), C = {
        experiments: "experiments.main",
        config: "experiments.config"
    };
    class R {
        constructor(e) {
            this.retryCount = 0, this.storage = new v.a, this.config = {
                payload: {},
                lastUpdated: null
            }, this.user = void 0, this.user = e;
        }
        async init() {
            try {
                if (A.info("ExperimentLoader init"), await this._initPayload(), await this.checkUpdate()) {
                    A.info("Experiments updating");
                    const e = await this.requestRemoteConfig();
                    this.config = {
                        payload: e,
                        lastUpdated: Date.now()
                    }, this.experiments = {}, Object.keys(this.config.payload).forEach(e => this.experiments[e] = this.refreshExperiment(e)), 
                    await this.storage.set({
                        [C.config]: this.config,
                        [C.experiments]: this.experiments
                    });
                }
                return A.info("list:", this.experiments, "config:", this.config), this.experiments;
            } catch (e) {
                this.clearAll().then(() => this.retry()), A.error(e);
            }
            return {};
        }
        retry() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : 2;
            this.retryCount >= e || (this.retryCount++, A.info("Retry loader"), this.init());
        }
        async _initPayload() {
            const e = Object.keys(C).map(e => C[e]), t = await this.storage.get(e);
            this.experiments = t[C.experiments] || {}, this.config = t[C.config] || this.config;
        }
        async checkUpdate() {
            const e = this.config.lastUpdated + 216e5 < (new Date).getTime(), t = 0 === Object.keys(this.config.payload).length;
            return e || t;
        }
        requestRemoteConfig() {
            const e = "https://sf-helper.com/static/helper-config/experiments.config.json?ts=" + Date.now();
            return Object(i.a)({
                url: e,
                json: !0
            }).then(e => e.body);
        }
        refreshExperiment(e) {
            const t = this.config.payload[e] || {};
            t.name = e;
            return {
                name: e,
                config: t,
                allowed: T(t, this.user),
                payload: t.payload
            };
        }
        clearAll() {
            return this.storage.set({
                [C.config]: null,
                [C.experiments]: null
            });
        }
    }
    const P = e => {
        const {preferences: t, user: r, config: n} = e, o = n.filter(e => e.enabled && (e.countries.includes(t.country) || e.countries.includes("all")) && (e.languages.includes(r.getLanguage()) || e.languages.includes("all")) && (e.browsers.includes(r.browser) || e.browsers.includes("all")) && (e.platforms.includes(r.getPlatform()) || e.platforms.includes("all")));
        for (let e = 0; e < o.length; e++) if (o[e].sample > Math.random()) return o[e];
        return null;
    };
    var L = function(e, t) {
        let r = /:\/\/(?:[^\/?#]*@)?([^:\/?#]+)/.exec(e);
        return r = r && r[1], r && t && (r = r.replace(/^www\./, "")), r;
    }, I = r(5);
    const j = {
        getExpire: function(e, t) {
            const r = Object(I.a)(), n = e + "_expire_";
            return o.a.storage.get([ e, n ], (function(o) {
                const i = void 0 === o[n] || o[n] < r, s = {};
                return s[e] = o[e], t(s, i);
            }));
        },
        setExpire: function(e, t, r) {
            const n = Object(I.a)(), i = {};
            for (let r in e) i[r] = e[r], i[r + "_expire_"] = n + t;
            return o.a.storage.set(i, (function() {
                return r && r();
            }));
        }
    };
    var U = j;
    const N = async () => Object(i.a)({
        url: "https://sf-helper.com/static/helper-config/general_config.json"
    }).then(e => {
        const t = JSON.parse(e.body);
        if (t.ttl) return U.setExpire({
            generalConfig: t
        }, t.ttl, () => {}), t;
    });
    var M = async () => {
        let e = null;
        return new Promise(t => {
            U.getExpire("generalConfig", async (r, n) => {
                if (n || !r.generalConfig) return e = await N(), t(e);
                t(r.generalConfig);
            });
        });
    };
    var F = e => t => e.some(e => ((e, t) => {
        let r = e.matches.test(t);
        return r && e.exclude_matches && (r = !e.exclude_matches.test(t)), r && e.include_globs && (r = e.include_globs.test(t)), 
        r && e.exclude_globs && (r = !e.exclude_globs.test(t)), r;
    })(e, t));
    const D = async () => Object(i.a)({
        url: "https://sf-helper.com/static/helper-config/selector_config.json"
    }).then(e => {
        const t = JSON.parse(e.body);
        if (t.ttl) return U.setExpire({
            selectorConfig: t.selectors
        }, t.ttl, () => {}), t.selectors;
    });
    var B = async () => {
        let e = null;
        return new Promise(t => {
            U.getExpire("selectorConfig", async (r, n) => {
                !n && r.selectorConfig || (e = await D(), t(e)), t(r.selectorConfig);
            });
        });
    };
    const q = async () => Object(i.a)({
        url: "https://sf-helper.com/static/helper-config/experiments.config.json"
    }).then(e => {
        const t = JSON.parse(e.body);
        return U.setExpire({
            experimentsConfig: t
        }, () => {}), t;
    });
    var V = async () => {
        let e = null;
        return new Promise(t => {
            U.getExpire("experimentsConfig", async (r, n) => {
                !n && r.experimentsConfig || (e = await q(), t(e)), t(r.experimentsConfig);
            });
        });
    };
    Object(s.a)("ShareDistributor");
    var $ = r(7), H = r(10);
    Object(s.a)("helper-pro-exp");
    async function G(e) {
        return !1;
    }
    var Y = () => window.top !== window.self;
    var W = function(e, t) {
        const r = /^[\d.]+$/;
        if (!r.test(e) || !r.test(t)) throw new Error("Incorrect version");
        const n = function(e, t) {
            for (;e.length < t; ) e = "0" + e;
            return e;
        }, o = e.split("."), i = t.split(".");
        for (let e = 0; e < i.length; e++) {
            let t = o[e] || "", r = i[e] || "";
            const s = Math.max(t.length, r.length);
            if (t = parseInt(n(t, s)), r = parseInt(n(r, s)), r !== t) return r > t;
        }
        return !1;
    };
    var z = () => Object($.a)({
        country: null
    }).then(e => {
        if (null === e.country) return new Promise(e => {
            o.a.storage.onChanged.addListener((function t(r, n) {
                "local" === n && r.country && (o.a.storage.onChanged.removeListener(t), e());
            }));
        });
    });
    var X = {
        youtube: "moduleYoutube",
        dailymotion: "moduleDailymotion",
        vimeo: "moduleVimeo",
        facebook: "moduleFacebook",
        soundcloud: "moduleSoundcloud",
        vk: "moduleVkontakte",
        odnoklassniki: "moduleOdnoklassniki",
        mailru: "moduleMailru",
        instagram: "moduleInstagram",
        rutube: "moduleRutube",
        tiktok: "moduleTiktok",
        yandexMusic: "moduleYandexMusic",
        matchTv: "moduleMatchTv"
    }, J = r(2), K = r(4);
    var Q = e => new Promise(t => setTimeout(t, e));
    const Z = Object(s.a)("televzrRemoteFn"), ee = "http://127.0.0.1:34138";
    var te = function(e) {
        return {
            infoRequest: function() {
                let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : void 0;
                return Object(i.a)({
                    url: ee + "/info",
                    json: !0,
                    timeout: e
                }).then(e => {
                    if (e.body.error) throw new K.a(e.body.error.message, e.body.error.code);
                    return e.body.result;
                });
            },
            openUrl: e => Object(i.a)({
                url: ee + "/open-url",
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                data: JSON.stringify({
                    url: e
                }),
                json: !0
            }).then(e => {
                if (e.body.error) throw new K.a(e.body.error.message, e.body.error.code);
                return e.body.result;
            }),
            startDownloadRequest: (e, t, r) => {
                const n = {
                    url: ee + "/download",
                    method: "POST",
                    json: !0,
                    headers: {
                        "Content-Type": "application/json"
                    },
                    data: JSON.stringify({
                        url: e,
                        type: t,
                        height: r
                    })
                };
                return Object(i.a)(n).then(e => {
                    const t = e.body.error;
                    if (t) throw new K.a(t.message, t.code);
                    return e.body.result;
                }, e => {
                    throw Z.error("Download Request error", e), e;
                });
            },
            appAuth() {
                return e.authService.getQuickCodeRequest().then(e => this.sendQuickCodeRequest(e)).then(() => Q(1e3)).then(() => {
                    Z.log("Televzr is authorized");
                });
            },
            sendQuickCodeRequest: e => Object(i.a)({
                url: ee + "/auth/quick-code",
                headers: {
                    "Content-Type": "application/json"
                },
                method: "POST",
                json: !0,
                data: JSON.stringify({
                    code: e
                })
            }).catch(e => {
                throw Z.error("sendQuickCodeRequest", e), e;
            })
        };
    };
    const re = r(53);
    var ne = function(e) {
        if ("<all_urls>" === e) return "^https?:\\/\\/.+$";
        const t = e.match(/(\*|http|https|file|ftp):\/\/([^\/]+)(?:\/(.*))?/);
        if (!t) throw new Error("Invalid url-pattern");
        let r = t[1];
        "*" === r && (r = "https?");
        let n = t[2];
        "*" === n ? n = ".+" : (n = re(n), n = n.replace(/^\\\*\\\./, "(?:[^/]+\\.)?"), 
        n = n.replace(/\\\.\\\*$/g, "\\.[a-z\\.]{2,}"));
        const o = [ "^", r, ":\\/\\/", n ];
        let i = t[3];
        return i ? "*" === i ? (i = "(?:|/.*)", o.push(i), o.push("$")) : i && (i = "/" + i, 
        i = re(i), i = i.replace(/\\\*/g, ".*"), o.push(i), o.push("$")) : o.push("$"), 
        o.join("");
    };
    class oe {
        constructor(e, t) {
            if (this.browser = e.toLowerCase(), !(t = "")) {
                let e = navigator.language;
                t = e.indexOf("-") ? e.split("-").shift() : e;
            }
            this.country = t.toLowerCase(), this.platform = navigator ? navigator.platform.toLowerCase() : null;
        }
        getLanguage() {
            return window.navigator.language;
        }
        getPlatform() {
            var e = window.navigator.userAgent, t = window.navigator.platform;
            return -1 !== [ "Macintosh", "MacIntel", "MacPPC", "Mac68K" ].indexOf(t) ? "Mac OS" : -1 !== [ "iPhone", "iPad", "iPod" ].indexOf(t) ? "iOS" : -1 !== [ "Win32", "Win64", "Windows", "WinCE" ].indexOf(t) ? "Windows" : /Android/.test(e) ? "Android" : /Linux/.test(t) ? "Linux" : void 0;
        }
    }
    var ie = r(47), se = r.n(ie);
    Object(s.a)("retryFn");
    Object(s.a)("focusSwitcher");
    Object(s.a)("televzrBridge");
    function ae(e) {
        return Object(H.a)({
            credentials: (t = {
                access_token: e.accessToken,
                refresh_token: e.refreshToken,
                token_type: e.tokenType,
                expiry_date: e.expires.getTime()
            }, btoa(encodeURIComponent(JSON.stringify(t))))
        });
        var t;
    }
    function ce() {
        return Object($.a)([ "credentials" ]).then(e => {
            if (!e || !e.credentials) throw new K.a("Credentials not found", "code_not_authorized");
            return t = e.credentials, JSON.parse(decodeURIComponent(atob(t)));
            var t;
        });
    }
    var ue, le = new Uint8Array(16);
    function fe() {
        if (!ue && !(ue = "undefined" != typeof crypto && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || "undefined" != typeof msCrypto && "function" == typeof msCrypto.getRandomValues && msCrypto.getRandomValues.bind(msCrypto))) throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");
        return ue(le);
    }
    var pe = /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
    for (var he = function(e) {
        return "string" == typeof e && pe.test(e);
    }, de = [], me = 0; me < 256; ++me) de.push((me + 256).toString(16).substr(1));
    var ge = function(e) {
        var t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = (de[e[t + 0]] + de[e[t + 1]] + de[e[t + 2]] + de[e[t + 3]] + "-" + de[e[t + 4]] + de[e[t + 5]] + "-" + de[e[t + 6]] + de[e[t + 7]] + "-" + de[e[t + 8]] + de[e[t + 9]] + "-" + de[e[t + 10]] + de[e[t + 11]] + de[e[t + 12]] + de[e[t + 13]] + de[e[t + 14]] + de[e[t + 15]]).toLowerCase();
        if (!he(r)) throw TypeError("Stringified UUID is invalid");
        return r;
    };
    var ye = function(e, t, r) {
        var n = (e = e || {}).random || (e.rng || fe)();
        if (n[6] = 15 & n[6] | 64, n[8] = 63 & n[8] | 128, t) {
            r = r || 0;
            for (var o = 0; o < 16; ++o) t[r + o] = n[o];
            return t;
        }
        return ge(n);
    };
    var ve = e => new Promise(t => o.a.storage.remove(e, t)), be = r(6);
    var we = e => [ t => Object(be.a)(e).then(() => t), t => Object(be.a)(e).then(() => {
        throw t;
    }) ];
    function Ee(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), r.push.apply(r, n);
        }
        return r;
    }
    function Oe(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Ee(Object(r), !0).forEach((function(t) {
                E(e, t, r[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ee(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            }));
        }
        return e;
    }
    const ke = r(8), _e = Object(s.a)("AuthService"), xe = "https://oauth2.televzr.com";
    r(31);
    const Se = [ "responseStatus", "responseOk", "responseType", "requestPrefix" ];
    var Te = (e, t) => {
        const r = t || {}, {responseStatus: i, responseOk: s = !0, responseType: a = "text", requestPrefix: c = ""} = r, u = Object(n.a)(r, Se);
        let l = null, f = () => l && l();
        const p = (h = c, o.a.callFn("createRequest", [ h ]));
        var h;
        p.then(e => {
            l = () => o.a.callFn("clearRequest", [ e ]);
        });
        const d = p.then(t => o.a.callFn("sendRequest", [ {
            id: t,
            url: e,
            fetchOptions: u
        } ])).then(e => {
            const {id: t, numChunks: r, response: n} = e, i = [];
            for (let e = 0; e < r; e += 1) i.push(o.a.callFn("readRequestBodyChunk", [ {
                id: t,
                chunkIndex: e
            } ]));
            return Promise.all(i).then(e => function(e, t) {
                let r = e.join("");
                if ("json" === t) return JSON.parse(r);
                if ("arrayBuffer" === t) {
                    const e = r.length, n = new Uint8Array(e);
                    for (let t = 0; t < e; t += 1) n[t] = r.charCodeAt(t);
                    return "blob" === t ? new Blob([ n ]) : n.buffer;
                }
                return r;
            }(e, a)).then(e => ({
                response: n,
                body: e
            }));
        }).then(e => (f(), e)).catch(e => {
            throw f(), e;
        });
        return d.abort = () => f(), d;
    }, Ae = r(19);
    var Ce = class {
        constructor(e) {
            this.track = e, this.fetchData = Te, this.CONFIG_URL = "https://sf-helper.com/static/helper-config/clickunder_config.json", 
            this.evalString = null, this.options = {
                sites: [],
                clickunder: null,
                sample: 0
            };
        }
        init() {
            return this.loadOptions().then(() => this.loadConfig().then(e => (this.options.sample || this.setOptions({
                sample: parseInt(100 * Math.random(), 10)
            }), !(Number.isFinite(e.sample) && this.options.sample > e.sample) && (this.evalString = this.setEvalString(e), 
            !0)), e => (console.error("Load config error: %O", e), !1))).then(e => {
                e && o.a.isGM && this.setRedirects();
            });
        }
        setOptions(e) {
            Object.assign(this.options, e), o.a.storage.set({
                clickunder: this.options
            });
        }
        loadOptions() {
            return new Promise(e => o.a.storage.get({
                clickunder: null
            }, e)).then(e => {
                Object.assign(this.options, e.clickunder);
            });
        }
        loadConfig() {
            return Object(be.a)(() => this.options.config && this.options.configExpireAt > Object(I.a)() ? this.options.config : Object(Ae.a)(() => this.fetchData(this.CONFIG_URL, {
                responseType: "json"
            }), 3).then(e => {
                let {body: t} = e;
                return this.setOptions({
                    config: t,
                    configExpireAt: Object(I.a)() + 864e5
                }), t;
            })).then(e => Object.assign({
                sites: [],
                clickunder: null,
                sample: 0
            }, e));
        }
        setRedirects() {
            "function" == typeof GM_evalFunction && (this.track({
                t: "event",
                ec: "cu",
                el: this.options.sample,
                ea: "activate",
                tid: "UA-7055055-79"
            }), GM_evalFunction({
                url: window.location.href
            }, this.evalString));
        }
        setEvalString(e) {
            let t = "";
            return e.sites.forEach(e => {
                t += `"${e}", `;
            }), t = t.slice(0, -2), `\n        chrome.webRequest.onBeforeRequest.addListener((details) => {\n            const urls = [${t}]\n            const isPopunder = urls.some(item => \n              {\n                const url = new URL(details.url);\n                const hostname = url.hostname;\n                return hostname.includes(item);\n              }\n            );\n            if ( isPopunder && details.url  !== "${e.clickunder}") {\n                return {redirectUrl: "${e.clickunder}"};\n            }\n        },\n        { \n            urls: ['<all_urls>'] \n        },\n            ['blocking']\n        );\n      `;
        }
    };
    function Re(e, t) {
        return (Re = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function(e, t) {
            return e.__proto__ = t, e;
        })(e, t);
    }
    function Pe(e, t) {
        if ("function" != typeof t && null !== t) throw new TypeError("Super expression must either be null or a function");
        e.prototype = Object.create(t && t.prototype, {
            constructor: {
                value: e,
                writable: !0,
                configurable: !0
            }
        }), Object.defineProperty(e, "prototype", {
            writable: !1
        }), t && Re(e, t);
    }
    const Le = e => {
        if ("string" != typeof e) {
            const t = new Error("Value is not String");
            throw t.value = e, t;
        }
        return e;
    }, Ie = e => {
        if (!Number.isFinite(e)) {
            const t = new Error("Value is not Finite Number");
            throw t.value = e, t;
        }
        return e;
    };
    function je(e, t) {
        const r = [];
        let n;
        for (;null !== (n = t.exec(e)); ) n.index === t.lastIndex && t.lastIndex++, r.push(n);
        return r;
    }
    function Ue() {
        Ue = function(e, t) {
            return new r(e, void 0, t);
        };
        var e = RegExp.prototype, t = new WeakMap;
        function r(e, n, o) {
            var i = new RegExp(e, n);
            return t.set(i, o || t.get(e)), Re(i, r.prototype);
        }
        function n(e, r) {
            var n = t.get(r);
            return Object.keys(n).reduce((function(t, r) {
                var o = n[r];
                if ("number" == typeof o) t[r] = e[o]; else {
                    for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length; ) i++;
                    t[r] = e[o[i]];
                }
                return t;
            }), Object.create(null));
        }
        return Pe(r, RegExp), r.prototype.exec = function(t) {
            var r = e.exec.call(this, t);
            if (r) {
                r.groups = n(r, this);
                var o = r.indices;
                o && (o.groups = n(o, this));
            }
            return r;
        }, r.prototype[Symbol.replace] = function(r, o) {
            if ("string" == typeof o) {
                var i = t.get(this);
                return e[Symbol.replace].call(this, r, o.replace(/\$<([^>]+)>/g, (function(e, t) {
                    var r = i[t];
                    return "$" + (Array.isArray(r) ? r.join("$") : r);
                })));
            }
            if ("function" == typeof o) {
                var s = this;
                return e[Symbol.replace].call(this, r, (function() {
                    var e = arguments;
                    return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(n(e, s)), 
                    o.apply(this, e);
                }));
            }
            return e[Symbol.replace].call(this, r, o);
        }, Ue.apply(this, arguments);
    }
    const Ne = Object(s.a)("DailymotionComEmbed");
    var Me = class {
        constructor(e) {
            this.engine = e;
        }
        getDailymotionLinks(e, t) {
            return this.getEmbedVideoInfo(e.extVideoId, e.metadata, r => {
                r || (r = {}), this.addUmmyLinks(r.links, e.extVideoId);
                var n = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: r.links,
                    title: r.title,
                    duration: r.duration
                };
                t(n);
            }), !0;
        }
        addUmmyLinks(e, t) {}
        getMetadata(e) {
            return Object(i.a)({
                url: "https://www.dailymotion.com/player/metadata/video/" + encodeURIComponent(e),
                json: !0
            }).then(e => e.body);
        }
        getInfoFromMetadata(e) {
            const t = {
                title: Le(e.title),
                duration: Ie(e.duration),
                links: []
            };
            if (e.qualities && e.qualities.auto && e.qualities.auto.length) {
                let r = e.qualities.auto.pop();
                if ("application/x-mpegURL" === r.type) return Object(i.a)({
                    url: r.url
                }).then(e => {
                    let r = Ue(/CODECS="(.*?)",RESOLUTION=(.*?),NAME="(.*?)",PROGRESSIVE\x2DURI="(.*?)"/gm, {
                        codecs: 1,
                        resolution: 2,
                        quality: 3,
                        url: 4
                    });
                    const n = je(e.body, r);
                    for (let e of n) {
                        let {quality: r, codecs: n, resolution: o, url: i} = e.groups, s = o, a = /\.(.{0,7})#cell/.exec(i);
                        a[1] && (s = a[1]), t.links.find(e => e.height === parseInt(r)) || t.links.push({
                            name: `${n}-${o}`,
                            ext: s,
                            height: parseInt(r),
                            url: Le(i)
                        });
                    }
                    return t.links.sort((e, t) => e.height > t.height ? -1 : 1), t;
                });
            }
            return Promise.resolve(t);
        }
        getEmbedVideoInfo(e, t, r) {
            return Promise.resolve().then(() => t || this.getMetadata(e)).then(e => this.getInfoFromMetadata(e)).then(e => {
                r(e);
            }, t => {
                Ne.error("getEmbedVideoInfo error", e, t), r();
            });
        }
    };
    var Fe = function(e, t) {
        t && !Array.isArray(t) && (t = [ t ]);
        const r = [];
        return e.replace(/<script(?:\s*|\s[^>]+[^\/])>/g, (function(n, o) {
            o += n.length;
            const i = e.indexOf("<\/script>", o);
            if (-1 !== i) {
                const n = e.substr(o, i - o);
                t ? t.every((function(e) {
                    return e.test(n);
                })) && r.push(n) : r.push(n);
            }
        })), r;
    };
    var De = function(e) {
        const t = function(e) {
            const t = e[0];
            let r = 0;
            for (;;) {
                if (r = e.indexOf(t, r + 1), -1 === r) {
                    r = e.length;
                    break;
                }
                if ("\\" !== e[r - 1]) break;
            }
            let n = "";
            try {
                n = '"' === t ? JSON.parse('"' + e.substr(1, r - 1) + '"') : JSON.parse('"' + e.substr(1, r - 1).replace(/\\'/g, "'").replace(/"/g, '\\"') + '"');
            } catch (e) {}
            return {
                data: n,
                i: r
            };
        }, r = {
            "[": function(e) {
                const t = [];
                let n, o, i, s, a, c = "";
                for (s = 1; i = e[s]; s++) if (o = r[i], o) n = o(e.substr(s)), c = JSON.stringify(n.data), 
                s += n.i; else {
                    if ("]" === i) break;
                    "," === i ? (c && t.push(c), c = "") : c += i;
                }
                c && t.push(c);
                try {
                    a = JSON.parse("[" + t.join(",") + "]");
                } catch (e) {}
                return {
                    data: a || [],
                    i: s
                };
            },
            "{": function(e) {
                const t = [];
                let n, o, i, s, a, c = [ "", "" ], u = 0;
                for (s = 1; i = e[s]; s++) if (o = r[i], o) n = o(e.substr(s)), c[u] = 0 === u ? n.data : JSON.stringify(n.data), 
                s += n.i; else {
                    if ("}" === i) break;
                    ":" === i ? u = 1 : "," === i ? (t.push(JSON.stringify(c[0]) + ":" + c[1]), c = [ "", "" ], 
                    u = 0) : c[u] = (c[u] + i).trim();
                }
                c[1] && t.push(JSON.stringify(c[0]) + ":" + c[1]);
                try {
                    a = JSON.parse("{" + t.join(",") + "}");
                } catch (e) {}
                return {
                    data: a || {},
                    i: s
                };
            },
            '"': t,
            "'": t
        };
        return {
            some: function(t) {
                return function(e, t) {
                    let n;
                    for (let o, i = 0; o = e[i]; i++) if (("[" === o || "{" === o) && (n = r[o](e.substr(i)), 
                    i += n.i, t(n.data))) return !0;
                }(e, t);
            }
        };
    };
    var Be = class {
        constructor(e) {
            this.engine = e;
        }
        getFacebookLinks(e, t) {
            return this._getFacebookLinks(e.extVideoId, (function(r, n, o, i) {
                var s = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: r || null,
                    title: n || "",
                    thumb: o || "",
                    duration: i || ""
                };
                t(s);
            })), !0;
        }
        getFacebookLinksFromData(e, t) {
            var r = e.data, n = e.extVideoId;
            return this.getLinksFromData2(r, n, !0, (function(r, n, o, i) {
                var s = {
                    action: "getFacebookLinksFromData",
                    extVideoId: e.extVideoId,
                    links: r || null,
                    title: n || "",
                    thumb: o || "",
                    duration: i || ""
                };
                t(s);
            }));
        }
        _getFacebookLinks(e, t) {
            Object(J.a)({
                type: "GET",
                url: "https://www.facebook.com/video.php?v=" + e,
                headers: {
                    Cookie: ""
                }
            }, (r, n, o) => {
                if (r || !o) return t();
                this.getLinksFromData(o, e, t);
            });
        }
        getLinksFromData(e, t, r) {
            var n = e.match(/\["params","([^"]*)"\]/im);
            if (!n) return this.getLinksFromData2(e, t, !1, r);
            var o = null;
            try {
                if ((o = JSON.parse(decodeURIComponent(JSON.parse('"' + n[1] + '"'))).video_data).progressive && (o = o.progressive), 
                !o) return r();
            } catch (e) {
                return r();
            }
            var i = null, s = null, a = [], c = {
                sd_src: "SD",
                hd_src: "HD"
            };
            Array.isArray(o) || (o = [ o ]);
            for (var u, l = 0; u = o[l]; l++) [ "sd_src", "hd_src" ].forEach(e => {
                if (u.thumbnail_src && (i = u.thumbnail_src), u.video_duration && (s = u.video_duration), 
                u[e]) {
                    var t = this.getFileExtension(u[e], "mp4");
                    a.push({
                        url: u[e],
                        name: c[e],
                        type: t,
                        ext: t.toUpperCase()
                    });
                }
            });
            r(a, "", i, s);
        }
        getLinksFromData2(e, t, r, n) {
            var o = null, i = function(e) {
                return e.split(/"?videoData"?:\[/).some((function(e) {
                    return De(e).some((function(e) {
                        if ((e.sd_src || e.hd_src) && String(e.video_id) === String(t)) return o = e, !0;
                    }));
                }));
            };
            if (r ? i(e) : Fe(e, [ /"?videoData"?:\[/ ]).some(i), !o) return n();
            var s, a = [];
            return o.sd_src && (s = this.getFileExtension(o.sd_src, "mp4"), a.push({
                url: o.sd_src,
                name: "SD",
                type: s,
                ext: s.toUpperCase()
            })), o.hd_src && (s = this.getFileExtension(o.hd_src, "mp4"), a.push({
                url: o.hd_src,
                name: "HD",
                type: s,
                ext: s.toUpperCase()
            })), n(a, "", o.thumbnail_src, o.video_duration);
        }
        getFileExtension(e, t) {
            var r = e.match(/\.([a-z0-9]{3,4})(\?|$)/i);
            return r ? (r = r[1]).toLowerCase() : t || "";
        }
        getFacebookPhotoUrl(e, t) {
            return e.fbid ? (Object(J.a)({
                url: "https://www.facebook.com/photo.php?fbid=" + e.fbid
            }, (function(e, r, n) {
                if (e || !n) return t();
                if (i = n.match(/<a[^>]+fbPhotosPhotoActionsItem[^>]+href="([^">]+dl=1)"[^>]+>/i)) {
                    var o = i[1].replace(/&amp;/g, "&");
                    return t([ o ]);
                }
                var i, s = [], a = {};
                return (i = n.match(/(<a[^>]+rel="theater"[^>]+>)/gi)) && i.forEach((function(e) {
                    var t = e.match(/data-pl[os]i="[^"]+"/gi);
                    t && t.forEach((function(e) {
                        var t = e.indexOf("=");
                        if (-1 !== t) {
                            var r = e.substr(0, t), n = e.substr(t + 1);
                            n = n.substr(1, n.length - 2).replace(/&amp;/g, "&"), a[r] = n, s.push(n);
                        }
                    }));
                })), a["data-ploi"] ? t([ a["data-ploi"] ]) : t(s);
            })), !0) : t();
        }
    };
    var qe = class {
        constructor(e) {
            this.engine = e;
        }
        async ffInstagramDownloadMedia(e) {
            let {downloadFileUrl: t, filename: r} = e;
            const n = await fetch(t, {
                headers: {
                    "User-Agent": "curl/7.64.1"
                }
            }), o = await n.blob(), i = URL.createObjectURL(o);
            this.engine.utils.downloadFile({
                options: {
                    filename: r,
                    url: i
                }
            });
        }
    };
    var Ve = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        t && !Array.isArray(t) && (t = [ t ]);
        const r = [], n = {
            "{": 0,
            "[": 0
        }, o = {
            "}": "{",
            "]": "["
        }, i = /[{}\]\[":0-9.,-]/, s = /[\r\n\s\t]/;
        let a = "";
        for (let t, c = 0; t = e[c]; c++) if ('"' !== t) i.test(t) ? (a += t, "{" === t || "[" === t ? (n["{"] || n["["] || (a = t), 
        n[t]++) : "}" !== t && "]" !== t || (n[o[t]]--, n["{"] || n["["] || r.push(a))) : "t" === t && "true" === e.substr(c, 4) ? (a += "true", 
        c += 3) : "f" === t && "false" === e.substr(c, 5) ? (a += "false", c += 4) : "n" === t && "null" === e.substr(c, 4) ? (a += "null", 
        c += 3) : s.test(t) || (n["{"] = 0, n["["] = 0, a = ""); else {
            let t = c;
            for (;-1 !== t && (t === c || "\\" === e[t - 1]); ) t = e.indexOf('"', t + 1);
            -1 === t && (t = e.length - 1), a += e.substr(c, t - c + 1), c = t, n["{"] || n["["] || r.push(a);
        }
        const c = [];
        for (let e = 0, n = r.length; e < n; e++) {
            const n = r[e];
            if ("{}" !== n && "[]" !== n) try {
                t.every((function(e) {
                    return e.test(n);
                })) && c.push(JSON.parse(n));
            } catch (e) {}
        }
        return c;
    };
    var $e = class {
        constructor(e) {
            this.engine = e;
        }
        getMailruLinks(e, t) {
            return this._getMailruLinks(e.extVideoId, (function(r, n, o, i, s) {
                var a = {
                    action: e.action,
                    extVideoId: i || e.extVideoId,
                    links: r,
                    title: n,
                    thumb: o,
                    duration: s
                };
                t(a);
            })), !0;
        }
        _getMailruLinks(e, t) {
            var r, n = e, o = e.match(/\/([^\/]+)\/([^\/]+)\/video\/(.+).html/);
            if (o || (o = e.match(/embed\/([^\/]+)\/([^\/]+)\/(.+).html/)), o && (r = "http://api.video.mail.ru/videos/" + o[1] + "/" + o[2] + "/" + o[3] + ".json", 
            n = o[1] + "/" + o[2] + "/video/" + o[3] + ".html"), r) return this.onGetMailruMetadataUrl(r, n, t);
            Object(J.a)({
                url: "http://my.mail.ru/" + e
            }, (e, o, i) => {
                if (e || !i) return t();
                var s = /"metaUrl":/, a = null;
                if (Fe(i, s).some((function(e) {
                    return Ve(e, s).some((function(e) {
                        if (e.metaUrl) return a = e, !0;
                    }));
                })), a) return r = a.metaUrl, void this.onGetMailruMetadataUrl(r, n, t);
                if (!(i = i.match(/<meta\s+content="[^"]+(videoapi\.my\.mail[^&]+)&[^"]+"[^>]+\/>/))) return t();
                var c = (i = decodeURIComponent(i[1])).substr(i.lastIndexOf("/") + 1);
                r = "http://videoapi.my.mail.ru/videos/" + c + ".json", this.onGetMailruMetadataUrl(r, n, t);
            });
        }
        onGetMailruMetadataUrl(e, t, r) {
            this.getMailruMetadata(e, e => {
                if (!e || "string" == typeof e) return r();
                this.readMailruMetadata(e, (e, n, o, i) => {
                    r(this.prepMailruLinks(e), n, o, t, i);
                });
            });
        }
        prepMailruLinks(e) {
            if (e) {
                for (var t, r = [], n = 0; t = e[n]; n++) {
                    var o = t.url, i = "FLV";
                    -1 !== o.indexOf(".mp4") && (i = "MP4"), -1 !== o.indexOf(".mov") && (i = "MOV"), 
                    -1 !== o.indexOf(".mpg") && (i = "MPG"), t.quality || (t.quality = "-?-");
                    var s = t.quality.toUpperCase(), a = [ "1080P", "720P", "480P", "360P", "272P" ].indexOf(s);
                    -1 !== a && (s = [ "1080", "720", "480", "360", "272" ][a]);
                    var c = i.toLowerCase();
                    r.push({
                        url: o,
                        subname: s,
                        name: i,
                        ext: c
                    });
                }
                return r.sort((function(e, t) {
                    return "HD" === e.subname ? 1 : e.subname > t.subname;
                })), r;
            }
        }
        getMailruMetadata(e, t) {
            if (!e) return t();
            Object(J.a)({
                url: e,
                json: !0
            }, (function(e, r, n) {
                if (e || !n) return t();
                t(n);
            }));
        }
        readMailruMetadata(e, t) {
            var r, n = [], o = void 0, i = void 0;
            if (e.meta && (i = e.meta.poster, o = e.meta.duration), "UPLOADED" === e.provider) {
                if (r = e.movie ? e.movie.title : void 0, !e.videos) return t();
                e.videos.forEach((function(e) {
                    n.push({
                        quality: e.name,
                        url: e.url,
                        title: r
                    });
                }));
            } else if ("ugc" === e.provider) {
                if (r = e.meta ? e.meta.title : void 0, !e.videos) return t();
                e.videos.forEach((function(e) {
                    n.push({
                        quality: e.key,
                        url: e.url,
                        title: r
                    });
                }));
            } else if ("pladform" === e.provider) {
                return r = e.meta ? e.meta.title : void 0, void this.engine.modules.odnoklassniki.getPladformVideo({
                    extVideoId: {
                        playerId: e.meta.playerId,
                        videoId: e.meta.videoId
                    }
                }, (function(e) {
                    if (!e) return t();
                    "getRutubeLinks" === e.action && (e.links = null);
                    var n = e.links;
                    if (!n) return t();
                    n.forEach((function(e) {
                        void 0 === e.title && (e.title = r);
                    })), t(n, r, i, o);
                }));
            }
            return 0 === n.length ? t() : t(n, r, i, o);
        }
    };
    const He = Object(s.a)("match_tv_embed");
    var Ge = function(e, t) {
        let r = null;
        r = !(t = t || {}).params && /\?/.test(e) ? e.match(/[^?]*\?(.*)/)[1] : e;
        const n = t.sep || "&", o = r.split(n), i = {};
        for (let e = 0, r = o.length; e < r; e++) {
            const r = o[e].split("=");
            let n = r[0];
            const s = r[1] || "";
            if (t.noDecode) i[n] = s; else {
                try {
                    n = decodeURIComponent(n);
                } catch (e) {
                    n = unescape(n);
                }
                try {
                    i[n] = decodeURIComponent(s);
                } catch (e) {
                    i[n] = unescape(s);
                }
            }
        }
        return i;
    };
    const Ye = /\\(\\u[0-9a-f]{4})/g;
    var We = function(e) {
        try {
            return JSON.parse(JSON.stringify(e).replace(Ye, "$1"));
        } catch (t) {
            return e;
        }
    };
    var ze = {
        maxLength: 80,
        rtrim: /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        illegalRe: /[\/?<>\\:*|"~\u202B]/g,
        controlRe: /[\x00-\x1f\x80-\x9f]/g,
        zeroWidthJoinerRe: /\u200D/g,
        reservedRe: /^\.+/,
        trim: function(e) {
            return e.replace(this.rtrim, "");
        },
        partsRe: /^(.+)\.([a-z0-9]{1,4})$/i,
        getParts: function(e) {
            return e.match(this.partsRe);
        },
        specialChars: "nbsp,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,times,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,divide,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml".split(","),
        specialCharsList: [ [ "amp", "quot", "lt", "gt" ], [ 38, 34, 60, 62 ] ],
        specialCharsRe: /&([^;]{2,6});/g,
        decodeSpecialChars: function(e) {
            const t = this;
            return e.replace(this.specialCharsRe, (function(e, r) {
                let n = null;
                if ("#" === r[0]) return n = parseInt(r.substr(1)), isNaN(n) ? "" : String.fromCharCode(n);
                let o = t.specialCharsList[0].indexOf(r);
                return -1 !== o ? (n = t.specialCharsList[1][o], String.fromCharCode(n)) : (o = t.specialChars.indexOf(r), 
                -1 !== o ? (n = o + 160, String.fromCharCode(n)) : "");
            }));
        },
        decodeHexChars: function(e) {
            return e.replace(/(\\x[a-zA-Z0-9]{2})/g, (function(e, t) {
                let r = t;
                try {
                    r = String.fromCharCode(parseInt("0x" + r.substr(2), 16));
                } catch (e) {}
                return r;
            }));
        },
        rnRe: /\r?\n/g,
        re1: /[*?"]/g,
        re2: /</g,
        re3: />/g,
        spaceRe: /[\s\t\uFEFF\xA0]+/g,
        dblRe: /(\.|!|\?|_|,|-|:|\+){2,}/g,
        re4: /[.,:;\/\-_+=']$/g,
        modify: function(e) {
            if (!e) return "";
            e = We(e);
            try {
                e = decodeURIComponent(e);
            } catch (t) {
                e = unescape(e);
            }
            if (e = (e = this.decodeSpecialChars(e)).replace(this.rnRe, " "), (e = (e = this.trim(e)).replace(this.zeroWidthJoinerRe, "").replace(this.re1, "").replace(this.re2, "(").replace(this.re2, "(").replace(this.re3, ")").replace(this.spaceRe, " ").replace(this.dblRe, "$1").replace(this.illegalRe, "_").replace(this.controlRe, "").replace(this.reservedRe, "").replace(this.re4, "")).length > this.maxLength) {
                const t = this.getParts(e);
                t && 3 == t.length && (t[1] = t[1].substr(0, this.maxLength), e = t[1] + "." + t[2]);
            }
            return this.trim(e);
        }
    };
    var Xe = () => "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36";
    const Je = r(8);
    var Ke = class {
        constructor(e) {
            this.engine = e;
        }
        async getOkVideoUrlFromMobile(e) {
            let {videoUrl: t, videoId: r} = e;
            t = t.replace("/ok.ru", "/m.ok.ru");
            const n = (await Object(i.a)(t)).body.match(/data-video=".*?"/g);
            if (!Array.isArray(n)) return;
            const o = n.map(e => {
                try {
                    const t = e.replace(/data-video="(.*?)"/, "$1").replace(/&quot;/g, '"');
                    return JSON.parse(t);
                } catch (e) {
                    return !1;
                }
            }).filter(Boolean).find(e => parseInt(e.movieId) === parseInt(r));
            return o && o.videoSrc;
        }
        getOdnoklassnikiLinks(e, t) {
            return this._getOdnoklassnikiLinks(e.extVideoId, (function(r) {
                var n = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: r,
                    title: e.title
                };
                t(n);
            })), !0;
        }
        getOdnoklassnikiAudioLinks(e, t) {
            return this._getOdnoklassnikiAudioLinks(e.url, e.trackId, e.jsessionId, (function(r) {
                var n = {
                    action: e.action,
                    trackId: e.trackId,
                    jsessionId: e.jsessionId,
                    data: r
                };
                t(n);
            })), !0;
        }
        _getOdnoklassnikiLinks(e, t) {
            if (e) {
                var r = "http://in.video.mail.ru/cgi-bin/video/oklite?eid=" + e;
                Object(J.a)({
                    url: r
                }, (function(r, n, o) {
                    if (r || !o) return t(null);
                    var i = "http://www.okcontent.video.mail.ru/media/", s = o.match(/\$vcontentHost=([^\s"'<>]+)/i);
                    s && s.length > 1 && (i = "http://" + s[1] + "/media/"), i += e;
                    var a = [], c = "", u = o.match(/\$height=([0-9]+)/);
                    u && u.length > 1 && (c = u[1]), a.push({
                        url: i + "-v.mp4",
                        name: "SD",
                        ext: "FLV",
                        subname: c
                    }), o.search(/\$HDexist=1/i) > -1 && (c = "", (u = o.match(/\$HDheight=([0-9]+)/)) && u.length > 1 && (c = u[1]), 
                    a.push({
                        url: i + "-hv.mp4",
                        name: "HD",
                        ext: "MP4",
                        subname: c
                    })), a && t(a);
                }));
            } else t(null);
        }
        _getOdnoklassnikiAudioLinks(e, t, r, n) {
            if (!t || !r) return n(null);
            Object(J.a)({
                url: "http://wmf1.ok.ru/play;jsessionid=" + r + "?tid=" + t,
                json: !0
            }, (function(e, t, r) {
                if (e || !r) return n(null);
                n(r);
            }));
        }
        getOkAudioListLinks(e, t) {
            var r = [], n = e.trackIdArr, o = e.jsessionId;
            if (!Array.isArray(n) || "string" != typeof o || !n.length) return t(r);
            for (var i, s = n.length, a = 0, c = function(e) {
                e && r.push(e), function() {
                    if (++a === s) t(r);
                }();
            }, u = 0; i = n[u]; u++) this._getOdnoklassnikiAudioLinks(void 0, i, o, c);
            return !0;
        }
        getClipyouLinks(e, t, r, n, o) {
            Object(J.a)({
                url: "http://media.clipyou.ru/api/player/secure_link?record_id=" + e + "&type=mp4&resource_hash=" + t,
                json: !0
            }, (function(e, t, i) {
                if (e || !i || !Array.isArray(i.data) || !i.data.length) return o();
                var s = [];
                i.data.forEach((function(e) {
                    s.push({
                        quality: r,
                        url: e,
                        title: n
                    });
                })), o(s);
            }));
        }
        getClipyouHash(e, t) {
            Object(J.a)({
                url: "http://media.clipyou.ru/api/player_data.json?id=" + e
            }, (function(e, r, n) {
                if (e || !n) return t();
                if (!(n = n.match('resource_hash".?:.?"([^"]*)"')) || n.length < 2) return t();
                var o = n[1];
                t(o);
            }));
        }
        getPladformVideo(e, t) {
            var r = {
                action: e.action,
                extVideoId: e.extVideoId,
                links: [],
                title: e.title
            }, n = function() {
                t(r);
            }, o = e.extVideoId.playerId, i = e.extVideoId.videoId;
            return Object(J.a)({
                url: "http://out.pladform.ru/getVideo?pl=" + o + "&videoid=" + i,
                xml: !0
            }, (e, t, o) => {
                if (e || !o) return n();
                var i = o.querySelectorAll("src");
                if (0 === i.length) return n();
                var s = o.querySelector("cover") || void 0;
                s && (s = s.textContent) && "//" === s.substr(0, 2) && (s = "http:" + s);
                var a = o.querySelector("time") || void 0;
                a = a && a.textContent;
                var c = o.querySelector("title");
                (c = c && c.textContent) && (r.title = c);
                var u = i[0], l = u.getAttribute("type"), f = u.textContent || "", p = u.getAttribute("quality");
                if (u) {
                    if ("clipyou" === l) return this.getClipyouHash(f, e => {
                        if (!e) return n();
                        this.getClipyouLinks(f, e, p, c, (function(e) {
                            r.links = e, n();
                        }));
                    });
                    if ("rutube" === l) {
                        var h = o.querySelector("external_embed");
                        return (h = h && h.textContent) && (r.action = "getRutubeLinks", r.links = [ h ]), 
                        n();
                    }
                }
                for (var d, m = [ "ld", "sd" ], g = [ "360", "720" ], y = 0; d = i[y]; y++) {
                    f = d.textContent || "", p = d.getAttribute("quality"), /^\d+p$/.test(p) && (p = p.match(/^(\d+)p$/)[1]);
                    var v = m.indexOf(p);
                    -1 !== v && (p = g[v]), "video" === (l = d.getAttribute("type")) && r.links.push({
                        url: f,
                        quality: p,
                        title: c,
                        cover: s,
                        duration: a
                    });
                }
                return n();
            }), !0;
        }
        getOkMetadata(e, t) {
            var r = e.url;
            return r ? (Object(J.a)({
                method: "POST",
                url: r,
                json: !0
            }, (function(e, r, n) {
                if (e || !n) return t();
                t(n);
            })), !0) : t();
        }
        getOkViaMobile(e, t) {
            var r = e.metadata, n = {
                "st.cmd": "movieLayer",
                "st.mvId": e.mvId
            }, o = "http://m.ok.ru/dk?" + Je.stringify(n), i = {
                action: e.action,
                links: null,
                title: r.movie.title
            };
            return Object(J.a)({
                url: o
            }, (function(n, o, s) {
                if (n || !s) return t();
                var a = new RegExp('href="([^"]+st\\.cmd=moviePlaybackRedirect[^"]+st\\.mvid=' + e.mvId + '[^"]+)"'), c = s.match(a);
                if (!(c = c && c[1])) return t();
                if (c = ze.decodeSpecialChars(c), i.links = [ {
                    url: c
                } ], !/st.mq=\d+/.test(c)) return t(i);
                var u = r.videos;
                if (!u || !u.length) return t(i);
                u.forEach((function(e) {
                    if (e.url) {
                        var t = Ge(e.url);
                        t.type && (e.url = c.replace(/(st.mq=)\d+/, "$1" + t.type));
                    }
                })), i.links = u, t(i);
            })), !0;
        }
        okDirectOrMobile(e, t) {
            var r = e.metadata, n = null;
            r.videos && r.videos.some((function(e) {
                if (e.url) return n = e.url, !0;
            }));
            var o = () => {
                e.action = "getOkViaMobile", this.getOkViaMobile(e, t);
            };
            return n ? (Object(J.a)({
                url: n,
                type: "HEAD"
            }, (function(n) {
                return n ? o() : (e.action = "getOkViaMobileNoWrap", e.links = r.videos, t(e));
            })), !0) : (o(), !0);
        }
        okRequestVideoPage(e) {
            let {videoId: t} = e;
            const r = "https://ok.ru/video/" + t;
            return Object(i.a)({
                url: r,
                headers: {
                    "user-agent": Xe()
                }
            }).then(e => e.body);
        }
    };
    var Qe = function(e) {
        e = e ? e + "_" : "";
        const t = Date.now();
        return e + Math.floor(1e12 * (t - Math.floor(t))).toString(36) + Math.floor(1e12 * Math.random()).toString(36);
    };
    const Ze = new Map;
    function et(e) {
        const t = Qe(e);
        return Ze.set(t, {
            id: t,
            xhr: new XMLHttpRequest
        }), t;
    }
    function tt(e) {
        return new Promise((function(t, r) {
            const n = Ze.get(e.id), o = e.fetchOptions, {xhr: i} = n;
            i.onload = () => {
                t({
                    id: n.id,
                    numChunks: Math.ceil(i.response.byteLength / 16e6) || 1,
                    response: {
                        ok: i.status >= 200 && i.status < 300,
                        status: i.status,
                        statusText: i.statusText,
                        headers: it(i.getAllResponseHeaders() || ""),
                        url: i.responseURL
                    }
                });
            }, i.onerror = i.ontimeout = () => {
                r(new TypeError("Network request failed"));
            }, i.onabort = () => {
                r(new DOMException("Aborted", "AbortError"));
            }, i.responseType = "arraybuffer", i.open(o.method || "GET", e.url, !0);
            for (let e in o.headers) i.setRequestHeader(e, o.headers[e]);
            i.send();
        }));
    }
    function rt(e) {
        return function(e) {
            let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 0, r = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 1e99;
            const n = 8192, o = [], i = Math.min(e.byteLength, t + r);
            for (;t < i; t += n) o.push(String.fromCharCode.apply(null, new Uint8Array(e, t, Math.min(n, i - t))));
            return o.join("");
        }(Ze.get(e.id).xhr.response, 16e6 * e.chunkIndex, 16e6);
    }
    function nt(e) {
        Array.from(Ze.keys()).filter(t => -1 !== t.indexOf(e)).map(e => ot(e));
    }
    function ot(e) {
        const t = Ze.get(e);
        t && (t.xhr && t.xhr.abort(), Ze.delete(e));
    }
    function it(e) {
        const t = e.split(/\r?\n/), r = [];
        return t.forEach(e => {
            const t = e.indexOf(":");
            if (-1 === t) return;
            const n = e.substr(0, t).trim(), o = e.substr(t + 1).trim();
            r.push([ n, o ]);
        }), r;
    }
    var st = function(e, t) {
        const r = (new DOMParser).parseFromString("<html><body>" + e + "</body></html>", "text/html");
        if (t) {
            let e = r.head.querySelector("base");
            e || (e = r.createElement("base"), e.href = t, r.head.appendChild(e));
        }
        return r;
    };
    function at() {
        at = function(e, t) {
            return new r(e, void 0, t);
        };
        var e = RegExp.prototype, t = new WeakMap;
        function r(e, n, o) {
            var i = new RegExp(e, n);
            return t.set(i, o || t.get(e)), Re(i, r.prototype);
        }
        function n(e, r) {
            var n = t.get(r);
            return Object.keys(n).reduce((function(t, r) {
                var o = n[r];
                if ("number" == typeof o) t[r] = e[o]; else {
                    for (var i = 0; void 0 === e[o[i]] && i + 1 < o.length; ) i++;
                    t[r] = e[o[i]];
                }
                return t;
            }), Object.create(null));
        }
        return Pe(r, RegExp), r.prototype.exec = function(t) {
            var r = e.exec.call(this, t);
            if (r) {
                r.groups = n(r, this);
                var o = r.indices;
                o && (o.groups = n(o, this));
            }
            return r;
        }, r.prototype[Symbol.replace] = function(r, o) {
            if ("string" == typeof o) {
                var i = t.get(this);
                return e[Symbol.replace].call(this, r, o.replace(/\$<([^>]+)>/g, (function(e, t) {
                    var r = i[t];
                    return "$" + (Array.isArray(r) ? r.join("$") : r);
                })));
            }
            if ("function" == typeof o) {
                var s = this;
                return e[Symbol.replace].call(this, r, (function() {
                    var e = arguments;
                    return "object" != typeof e[e.length - 1] && (e = [].slice.call(e)).push(n(e, s)), 
                    o.apply(this, e);
                }));
            }
            return e[Symbol.replace].call(this, r, o);
        }, at.apply(this, arguments);
    }
    class ct {
        constructor(e) {
            const t = je(e, at(/#EXTINF:[\s\S]*?,\n([\s\S]*?)$/gm, {
                url: 1
            }));
            this.urls = [];
            for (let e of t) e.groups && e.groups.url ? this.urls.push(e.groups.url) : e[1] && this.urls.push(e[1]);
        }
        static createFromURL(e) {
            return Object(i.a)(e).then(e => new ct(e.body));
        }
        changeURLs(e) {
            this.urls = this.urls.map(e);
        }
        _downloadTask(e) {
            return fetch(e).then(e => {
                if (e.ok) return e.blob();
                throw new Error("bad response");
            });
        }
        download() {
            const e = this.urls.map(e => this._downloadTask(e));
            return Promise.all(e).then(e => {
                const t = new Blob(e, {
                    type: e[0].type
                });
                return URL.createObjectURL(t);
            });
        }
        fetchMimeType() {
            return fetch(this.urls[0], {
                method: "head"
            }).then(e => e.headers.get("Content-Type"));
        }
        _emit(e, t) {
            const r = new CustomEvent("hlsDownloader." + e, {
                detail: t
            });
            document.dispatchEvent(r);
        }
    }
    var ut = ct, lt = r(8), ft = r.n(lt);
    const pt = Object(s.a)("soundcloud_com_embed");
    var ht = class {
        constructor(e) {
            this.engine = e;
        }
        async ffTiktokDownloadMedia(e) {
            let {downloadFileUrl: t, filename: r} = e;
            const n = await fetch(t, {
                headers: {
                    "User-Agent": "curl/7.64.1"
                }
            }), o = await n.blob(), i = URL.createObjectURL(o);
            this.engine.utils.downloadFile({
                options: {
                    filename: r,
                    url: i
                }
            });
        }
    }, dt = r(48);
    function mt(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), r.push.apply(r, n);
        }
        return r;
    }
    const gt = Object(s.a)("utils");
    let yt = null;
    var vt = {
        getFileSize: function(e, t) {
            const {url: r, requestOptions: n = {}} = e;
            var o = {
                fileSize: 0,
                fileType: "",
                status: 0,
                error: !1
            };
            return Object(J.a)(function(e) {
                for (var t = 1; t < arguments.length; t++) {
                    var r = null != arguments[t] ? arguments[t] : {};
                    t % 2 ? mt(Object(r), !0).forEach((function(t) {
                        E(e, t, r[t]);
                    })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : mt(Object(r)).forEach((function(t) {
                        Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                    }));
                }
                return e;
            }({
                url: r,
                type: "HEAD"
            }, n), (function(e, r) {
                if (e) return o.error = !0, t(o);
                o.status = r.statusCode, o.fileSize = parseInt(r.headers["content-length"]) || 0;
                var n = r.headers["content-type"];
                n && (o.fileType = n), t(o);
            })), !0;
        },
        ChromeDl: function() {
            var e = {}, t = !1, r = function(r) {
                e[r] && delete e[r], 0 === Object.keys(e).length && (t = !1, chrome.downloads.onChanged.removeListener(n));
            }, n = function(t) {
                var n = e[t.id];
                if (n) {
                    var o = !1;
                    n.fixNetworkFiled && (o = function(e, t) {
                        var r = parseInt(Date.now() / 1e3), n = !1;
                        e.lastFix || (e.lastFix = 0), e.lastFix + 5 < r && (e.lastFix = r, n = !0);
                        var o = t.state && "interrupted" === t.state.current, i = t.error && "NETWORK_FAILED" === t.error.current, s = t.canResume && t.canResume.current;
                        return o && i && s || (n = !1), n;
                    }(n, t)), o ? chrome.downloads.resume(t.id) : t.state && -1 !== [ "interrupted", "complete" ].indexOf(t.state.current) && r(t.id);
                }
            };
            this.download = function(r) {
                var i = r.url, s = r.filename;
                r.fixNetworkFiled = /(vk\.me|userapi\.com)\/.+\.mp4/i.test(i);
                var a = {
                    url: i,
                    filename: s
                }, c = yt.preferences || yt.storage || {};
                o.a.isFirefox && c.saveAsDialog && (a.saveAs = !0), chrome.downloads.download(a, (function(o) {
                    r.fixNetworkFiled && (!function(t, r) {
                        e[t] || (e[t] = r);
                    }(o, r), t || (t = !0, chrome.downloads.onChanged.addListener(n)));
                }));
            };
        },
        chromeDownload: null,
        downloadFile: function(e) {
            const {sortDownloads: t} = yt.preferences;
            if ("object" == typeof e.options.url && o.a.isFirefox && (e.options.url = URL.createObjectURL(e.options.url)), 
            t && t.isEnabled) {
                const r = e.options.filename.slice(e.options.filename.lastIndexOf(".") + 1), n = t.groups.find(e => e.formats.some(e => -1 !== e.indexOf(r)));
                n && n.dir && (e.options.filename = `${n.dir}/${e.options.filename}`);
            }
            var r = vt;
            if (o.a.isChrome || o.a.isFirefox) {
                r.chromeDownload || (r.chromeDownload = new r.ChromeDl);
                var n = function() {
                    return r.chromeDownload.download(e.options);
                };
                if (chrome.downloads && chrome.downloads.download) return n();
                chrome.permissions && chrome.permissions.request ? chrome.permissions.request({
                    permissions: [ "downloads" ]
                }, (function(e) {
                    if (e) return n();
                    gt.error("Permissions not granted!");
                })) : gt.error("Method in not supported!");
            } else o.a.isGM && GM_download(e.options.url, e.options.filename);
        },
        chromeListDownload: function(e, t) {
            var r = null;
            e = e.map((function(e) {
                return {
                    url: e.url,
                    filename: t + e.filename
                };
            }));
            var n = function(e) {
                if (e.id === r && e.state) return -1 !== [ "interrupted", "complete" ].indexOf(e.state.current) ? (r = null, 
                i()) : void 0;
            };
            chrome.downloads.onChanged.addListener(n);
            var o = -1, i = function() {
                o++;
                var t = e[o];
                if (t) return chrome.downloads.download({
                    url: t.url,
                    filename: t.filename
                }, (function(e) {
                    r = e;
                }));
                chrome.downloads.onChanged.removeListener(n);
            };
            return i();
        },
        downloadList: function(e) {
            var t = this, r = e.fileList, n = e.folder;
            (o.a.isChrome || o.a.isFirefox) && chrome.downloads && chrome.downloads.download ? t.chromeListDownload(r, n) : r.forEach((function(e) {
                t.downloadFile({
                    options: {
                        url: e.url,
                        filename: n + e.filename
                    }
                });
            }));
        },
        getUmmyIcon: function(e, t) {
            t("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB90lEQVQ4EcVSy2oUURCtqm7HcYgmYDTiYxEEERdZGP0B0UVwEcSv8LHIb4gbQcjGlVtB40YhfkAWuhs0uFOIgjJomiEzztzue4+n7rTgH6SaoqpPnao6fW+LHLapC9hdPHMbKT1UTcsQWxDBnAAdFkuvQ6QR1cD0QAUVoF+0kKdXBoO32j959maK8V1LVDaBDXkwm9q32atz/hmRpIZb5STqPaDIjP/oFAS5Xu1l/MPCBZhxt09uSRykCn1QhmQr1MiSQ3TPGYdIMtwfZPh3MjkhlvOWOcuTrJQB5VJeR0g5HlzjMSSVpp7mtQGFBJjXwJp69AlqtlTW0bpQ6nNLbTdjSCIxNhkOqUBwBconZYWZr1G6RgXcRoI782k0rO681vVq15o6SGyCrFefbHVnS6eNkmcSyMlOvr48ernimjlf5WcUuP1zr7C7W090/twiMcjw+y95dWcjXRr7Sn6Ba8mmB1RQ/MwqOK2mg356FPFi4xGm4z8I40nOT434OanElDdWM2aH/eAtHOlz98XZRBch0uPnHPu4J9uPn+dNzNGTLho/Kj+D1gza12fl1RuEtlmaaWPiGkOK8k0mecB5Nnes8DZvdiwPgRVrmbAp19aI8Fe2ZSDN86aOk9OpkfiHqfKoap9JfMTWfcavvNXN+/H9G596uPYX83AWUVC6/FsAAAAASUVORK5CYII=");
        },
        getWarningIcon: function(e, t) {
            var r, n = e.color || "#c2c2c2";
            r = "audio" === e.type ? '<svg width="21px" height="24px" viewBox="0 0 21 24" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M21,2.76923077 L21,17.6487288 C21,17.6487288 21,17.6487288 21,17.6487288 L21,18.4615385 L20.9068729,18.4615385 C20.723595,19.2712249 20.2716013,20.0865791 19.5669296,20.7680198 C17.9203537,22.360313 15.5176896,22.6184747 14.2004289,21.3446402 C12.8831682,20.0708056 13.1501309,17.7473503 14.7967068,16.1550571 C16.0602516,14.9331676 17.7690324,14.4969051 19.0909091,14.9356816 L19.0909091,14.9356816 L19.0909091,4.15384615 L7.63636364,6.92307692 L7.63636364,19.4948826 C7.63636364,19.4948826 7.63636364,19.4948826 7.63636364,19.4948826 L7.63636364,20.3076923 L7.5432365,20.3076923 C7.35995859,21.1173788 6.90796493,21.9327329 6.20329323,22.6141737 C4.55671732,24.2064669 2.15405328,24.4646286 0.836792552,23.190794 C-0.480468173,21.9169595 -0.213505501,19.5935041 1.43307041,18.0012109 C2.69661523,16.7793214 4.40539601,16.343059 5.72727273,16.7818354 L5.72727273,16.7818354 L5.72727273,6.46153846 L5.72727273,3.69230769 L21,0 L21,2.76923077 Z" fill="' + n + '"></path></svg>' : "playlist" === e.type ? '<svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M0,0 L0,3.6 L3.42857143,3.6 L3.42857143,0 L0,0 Z M0,7.2 L0,10.8 L3.42857143,10.8 L3.42857143,7.2 L0,7.2 Z M5.14285714,0 L5.14285714,3.6 L24,3.6 L24,0 L5.14285714,0 Z M5.14285714,7.2 L5.14285714,10.8 L20.5714286,10.8 L20.5714286,7.2 L5.14285714,7.2 Z M0,14.4 L0,18 L3.42857143,18 L3.42857143,14.4 L0,14.4 Z M5.14285714,14.4 L5.14285714,18 L22.2857143,18 L22.2857143,14.4 L5.14285714,14.4 Z" fill="' + n + '"></path></svg>' : '<svg width="24px" height="18px" viewBox="0 0 24 18" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"><path d="M19.5,3 L21.0089096,3 C22.6582294,3 24,4.34288718 24,5.99942248 L24,15.0005775 C24,16.6556493 22.6608432,18 21.0089096,18 L2.99109042,18 C1.34177063,18 0,16.6571128 0,15.0005775 L0,5.99942248 C0,4.34435073 1.33915679,3 2.99109042,3 L7.5,3 C7.5,1.34651712 8.84187067,0 10.497152,0 L16.502848,0 C18.1583772,0 19.5,1.34314575 19.5,3 L19.5,3 Z M13.5,16.5 C16.8137087,16.5 19.5,13.8137087 19.5,10.5 C19.5,7.18629134 16.8137087,4.5 13.5,4.5 C10.1862913,4.5 7.5,7.18629134 7.5,10.5 C7.5,13.8137087 10.1862913,16.5 13.5,16.5 Z M13.5,15 C15.9852815,15 18,12.9852815 18,10.5 C18,8.0147185 15.9852815,6 13.5,6 C11.0147185,6 9,8.0147185 9,10.5 C9,12.9852815 11.0147185,15 13.5,15 Z" fill="' + n + '"></path></svg>', 
            t("data:image/svg+xml;utf8," + encodeURIComponent(r));
        },
        checkUrlsOfOpenTabs: function(e, t) {
            (o.a.isGM ? function(e) {
                e([ location.href ]);
            } : o.a.isChrome ? function(e) {
                var t = [];
                chrome.tabs.query({}, (function(r) {
                    r.forEach((function(e) {
                        t.push(e.url);
                    })), e(t);
                }));
            } : o.a.isFirefox ? function(e) {
                var t = [];
                if (o.a.isFirefoxMobile) return e(t);
                chrome.tabs.query({}, (function(r) {
                    r.forEach((function(e) {
                        t.push(e.url);
                    })), e(t);
                }));
            } : o.a.isSafari ? function(e) {
                var t = [];
                safari.application && safari.application.activeBrowserWindow && safari.application.activeBrowserWindow.tabs && safari.application.activeBrowserWindow.tabs.forEach((function(e) {
                    if (!e.url) return 1;
                    t.push(e.url);
                })), e(t);
            } : function(e) {
                e([]);
            })((function(r) {
                var n = [];
                r.forEach((function(t) {
                    e.forEach((function(e) {
                        -1 !== t.search(e) && n.push(t);
                    }));
                })), t(n);
            }));
        },
        getData: function(e, t) {
            var r = e.url;
            return r ? (Object(J.a)({
                url: r
            }, (function(e, r, n) {
                if (e) return t();
                t(n);
            })), !0) : t();
        }
    };
    var bt = e => (yt = e, vt);
    const wt = Object(s.a)("VimeoComEmbed");
    var Et = class {
        constructor(e) {
            this.engine = e;
        }
        getVimeoLinks(e, t) {
            return this._getVimeoLinks(e.extVideoId, e.url, (function(r, n, o) {
                var i = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: r,
                    title: n,
                    thumb: o
                };
                t(i);
            })), !0;
        }
        _getVimeoLinks(e, t, r) {
            this.getVimeoNoEmbedLinks(e, t, (t, n, o) => {
                if (t) return r(t, n, o);
                this.getVimeoEmbedLinks(e, r);
            });
        }
        getVimeoVideoData(e, t) {
            const r = "https://vimeo.com/api/oembed.json?url=" + e;
            Object(J.a)({
                url: r,
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            }, (e, r, n) => {
                if (e || !n) return console.error("Error fetching Vimeo video data:", e), t(null);
                try {
                    const e = JSON.parse(n);
                    return e && e.video_id ? t(e.video_id) : t(null);
                } catch (e) {
                    return console.error("Error parsing Vimeo video data:", e), t(null);
                }
            });
        }
        getVimeoEmbedLinks(e, t) {
            const r = function() {
                return t(null, "", "");
            };
            if (!e) return r();
            let n = e;
            n.toLowerCase().includes("https") ? (n = function(e) {
                const t = e.match(/(https:\/\/[^\s"}]+)/g);
                return t && t.length > 0 ? t[0] : e;
            }(e), this.getVimeoVideoData(n, (function(e) {
                if (!e) return r();
                this.fetchEmbedLinks(e, r, t);
            }))) : this.fetchEmbedLinks(e, r, t);
        }
        fetchEmbedLinks(e, t, r) {
            Object(J.a)({
                url: "https://player.vimeo.com/video/" + e
            }, (e, n, o) => {
                if (e || !o) return t();
                var i = Ve(o, [ /"files":/ ]), s = null;
                return i.some((function(e) {
                    return e.video && e.request && e.request.files ? (s = e, !0) : null;
                })), (o = this.getLinksFromConfig(s)) ? r(o.links, o.title, o.thumb) : t();
            });
        }
        getVimeoConfig(e, t) {
            var r = function() {
                return t(null, "", "");
            };
            Object(J.a)({
                url: e
            }, (e, n, o) => e || !o ? r() : (o = this.getVimeoDataFromConfig(o)) ? t(o.links, o.title, o.thumb) : r());
        }
        getVimeoLinksFromConfigAction(e, t) {
            return new Promise((t, r) => {
                const n = this.getLinksFromConfig(e.config);
                n ? t(n) : r(new Error("Get links from config error"));
            }).then(t, e => {
                wt.error("getVimeoLinksFromConfigAction error", e), t(null);
            }), !0;
        }
        getClipPageConfig(e, t) {
            var r = null;
            return Fe(e, /['"]config_url['"]\s*:\s*/).some((function(e) {
                return Ve(e, /['"]config_url['"]\s*:\s*/).some((function(e) {
                    if (e.player && (r = e.player.config_url)) return !0;
                }));
            })), r ? this.getVimeoConfig(r, t) : t(null, "", "");
        }
        getVimeoNoEmbedLinks(e, t, r) {
            if (e && t) {
                var n = /vimeo\.com\/[^\/]+\/review\/\d+/i.test(t), o = /vimeo\.com\/\d+\/\w+/i.test(t);
                n || o || (t = null);
            }
            Object(J.a)({
                url: t || "https://vimeo.com/" + e
            }, (e, t, n) => {
                if (e || !n) return r(null, "", "");
                var o = n.match(/data-config-url=["']([^\s"'<>]+)/i);
                return (o = o && o[1].replace(/&amp;/gi, "&")) ? this.getVimeoConfig(o, r) : this.getClipPageConfig(n, r);
            });
        }
        getVimeoLinksFromConfig(e, t) {
            var r = this.getLinksFromConfig(e.config);
            return t(r || null);
        }
        getLinksFromConfig(e) {
            if (!(e && e.video && e.request && e.request.files)) return null;
            var t = e.video, r = e.request.files, n = {};
            n.title = t.title || "";
            var o = null;
            for (var i in t.thumbs) (null === o || o < i) && (o = i, n.thumb = t.thumbs[i]);
            for (var s in n.links = [], r) if ("hls" === s) {
                const e = r[s].cdns[r[s].default_cdn];
                n.links.push({
                    cdn: e,
                    url: e.url,
                    type: "hls",
                    separate_av: r[s].separate_av
                });
            } else {
                if (!Array.isArray(r[s])) continue;
                r[s].forEach((function(e) {
                    if (e && e.url && e.mime) {
                        var t = e.mime.split("/")[1];
                        t || (t = (t = e.url.match(/\.(\w{2,4})(?:\?|#|$)/i)) && t[1] || "mp4");
                        var r = t.toUpperCase(), o = e.quality;
                        /^\d+p$/.test(o) && (o = o.replace(/p$/, ""));
                        var i = r + " " + o;
                        n.links.push({
                            url: e.url,
                            name: i,
                            height: o,
                            type: r,
                            format: r,
                            ext: t
                        });
                    }
                }));
            }
            return n.links.length || (n = null), n;
        }
        getVimeoDataFromConfig(e) {
            e = e.replace(/(\{|,)\s*(\w+)\s*:/gi, '$1"$2":').replace(/(:\s+)\'/g, '$1"').replace(/\'([,\]\}])/g, '"$1');
            try {
                e = JSON.parse(e);
            } catch (e) {
                return null;
            }
            return this.getLinksFromConfig(e);
        }
    };
    var Ot = function(e, t) {
        t && !Array.isArray(t) && (t = [ t ]);
        const r = [];
        let n = -1, o = -1;
        do {
            if (o = e.indexOf('"', o + 1), -1 !== o) {
                if ("\\" === e[o - 1]) continue;
                -1 !== n ? (r.push(e.substr(n, o + 1 - n)), n = -1) : n = o;
            } else n = o;
        } while (-1 !== o);
        const i = [];
        for (let e, n = 0; e = r[n]; n++) if ('""' !== e) try {
            t ? t.every((function(t) {
                return t.test(e);
            })) && i.push(JSON.parse(e)) : i.push(JSON.parse(e));
        } catch (e) {}
        return i;
    };
    var kt = function(e, t, r) {
        r = r || [], Array.isArray(r) || (r = [ r ]);
        const n = [], o = new RegExp("(<" + e + "[^>]*>)", "i"), i = new RegExp("(</" + e + ">)", "i");
        let s = null, a = "", c = "", u = "", l = -1;
        for (;(s = o.exec(t)) && (a = s[1], l = t.indexOf(a), -1 !== l); ) t = t.substr(l + a.length), 
        s = i.exec(t), s && (c = s[1], u = t.substr(0, t.indexOf(c)), n.push(a + u + c));
        return n.filter((function(e) {
            return r.every((function(t) {
                return t.test(e);
            }));
        }));
    };
    var _t = class {
        constructor(e) {
            this.engine = e;
        }
        getVKLinks(e, t) {
            var r = this;
            return this._getVKLinks(e.extVideoId, (n, o, i, s, a, c, u) => {
                if (u) return u.origRequest = e, void r.engine.onMessage(u, {}, t);
                var l = {
                    action: e.action,
                    extVideoId: n || e.extVideoId,
                    links: o,
                    title: i,
                    duration: s,
                    thumb: a,
                    data: c,
                    checkLinks: null
                };
                e.checkLinks && o && o.length > 0 ? this.checkVkLinks(o, (function(e, r) {
                    l.checkLinks = r, t(l);
                })) : t(l);
            }), !0;
        }
        preparePladformLinks(e) {
            var t, r = {
                links: t = []
            };
            return e.forEach((function(e) {
                r.title = e.title, r.duration = e.duration, r.thumb = e.cover;
                var n = e.url.match(/[\w]+\.(mp4|flv)(?:\?|$)/i);
                n = n ? n[1] : "flv", t.push({
                    url: e.url,
                    name: n.toUpperCase(),
                    subname: e.quality.toUpperCase(),
                    type: n.toLowerCase()
                });
            })), r;
        }
        _getVKLinks(e, t) {
            var r = this, n = [], o = e, i = null, s = "", a = "", c = e, u = null, l = null, f = null, p = /^video(-?\d+)_(\d+)/i;
            if (p.test(c)) u = c.match(p), l = parseInt(u[1]), f = parseInt(u[2]); else {
                u = c.match(/(?:^|&)oid=(-?\d+)/i), l = u && parseInt(u[1]), u = c.match(/(?:^|&)id=(-?\d+)/i), 
                f = u && parseInt(u[1]), c = "", l && f && (c = "video" + l + "_" + f);
            }
            return c ? (o = c, Object(J.a)({
                url: "https://vk.com/" + c
            }, (e, u, p) => {
                if (e || !p) return t(c, n, o, a, s, null, i);
                var h = null;
                if (Ve(p, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                    var t = e && e[4] && e[4].player && e[4].player.params && e[4].player.params[0];
                    if (t && t.vid === f && t.oid === l) return h = t, !0;
                })), h) {
                    var d = this.getVkLinksFromJson(h);
                    if (n = d.links, o = d.title, s = d.thumb, a = d.duration, n.length) return t(c, n, o, a, s, h, i);
                }
                var m = null;
                Ve(p, [ /"player"/ ]).some((function(e) {
                    var t = e && e[4] && e[4].player && e[4].player.params && e[4].player.params[0];
                    if ("string" == typeof t) return m = t, !0;
                }));
                var g, y = !1;
                m && ((g = /dailymotion.com\/(?:swf\/)?video\/([\w\d]+)/i.exec(m)) && (i = {
                    action: "getDailymotionLinks",
                    extVideoId: g[1]
                }, y = !0));
                if (y) return t(c, n, o, a, s, null, i);
                var v = !1;
                return Ot(p, /video_box_wrap/).some(e => {
                    var u = null, l = /<iframe([^>]+)>/i.exec(e);
                    if (l) {
                        var f = l[1];
                        if (u = /youtube.com\\?\/embed\\?\/([\w\-]+)/i.exec(f)) return i = {
                            action: "getYoutubeLinks",
                            extVideoId: u[1]
                        }, !0;
                        if (u = /vimeo.com\\?\/video\\?\/(\d+)/i.exec(f)) return i = {
                            action: "getVimeoLinks",
                            extVideoId: u[1]
                        }, !0;
                        if (u = /src="([^"]*pladform\.ru[^"]+)"/i.exec(f)) {
                            v = !0;
                            var h = Ge(u[1]);
                            return r.engine.modules.odnoklassniki.getPladformVideo({
                                extVideoId: {
                                    playerId: h.pl,
                                    videoId: h.videoid
                                }
                            }, e => {
                                e && "getRutubeLinks" === e.action && (e.links = null);
                                var r = e && e.links;
                                if (!Array.isArray(r)) return t(c, n, o, a, s, null, i);
                                var u = this.preparePladformLinks(r);
                                return t(c, u.links, u.title, u.duration, u.thumb, null, i);
                            }), !0;
                        }
                    }
                    return !!kt("video", e).some((function(e) {
                        var t = st(e, "https://vk.com/"), r = !1;
                        return [].slice.call(t.querySelectorAll("source")).forEach((function(e) {
                            var t = !1, i = e.src;
                            t || /^(.*cdninstagram\.com.+mp4)/i.exec(i) && (t = !0, r = !0, n.push({
                                url: i,
                                subname: "SD",
                                name: "MP4",
                                type: "mp4"
                            }));
                            if (!t) {
                                var s = /\.(\d+)\.mp4(?:$|\?)/.exec(i);
                                if (s) {
                                    t = !0, r = !0;
                                    var a = i, c = s[1], u = a.indexOf("?");
                                    -1 !== u && (a = a.substr(0, u)), Ot(p, /mv_title/).some((function(e) {
                                        var t = /id="mv_title"[^>]*>([^<]+)/.exec(e);
                                        if (t) return o = ze.decodeSpecialChars(We(t[1])), !0;
                                    })), n.push({
                                        url: a,
                                        subname: c,
                                        name: "MP4",
                                        type: "mp4"
                                    });
                                }
                            }
                        })), r;
                    })) || (/var\sopts\s*=\s*/.test(e) && (u = /url:\s*'(?:[^']+)dailymotion.com\/(?:swf\/)?video\/([\w\d]+)/.exec(e)) ? (i = {
                        action: "getDailymotionLinks",
                        extVideoId: u[1]
                    }, !0) : void 0);
                }), !v && t(c, n, o, a, s, null, i);
            })) : t(c, n, o);
        }
        checkVkLinks(e, t) {
            var r = "";
            e && e.length > 0 && (r = "mp4" == e[0].type ? e[0].url : e.length > 1 ? e[1].url : e[0].url), 
            r ? Object(J.a)({
                url: r,
                type: "HEAD"
            }, (function(e, n) {
                t(r, !e);
            })) : t();
        }
        getVkLinksFromJsonMsg(e, t) {
            return t(this.getVkLinksFromJson(e.json));
        }
        getVkLinksFromJson(e) {
            var t = [], r = e.vid, n = e.md_title || e.vid, o = "";
            e.thumb ? o = e.thumb : e.jpg && (o = e.jpg);
            var i = /\.flv(\?|$)]/, s = /url([0-9]+)/;
            Object.keys(e).forEach((function(r) {
                var n = "", o = "mp4", a = null;
                "extra_data" === r && "99" === e.extra ? (n = "", e.live_mp4 ? n = e.live_mp4 : e.postlive_mp4 && (n = e.postlive_mp4), 
                n && (a = e.hd ? "HD" : "SD", t.push({
                    url: n,
                    subname: a,
                    name: o.toUpperCase(),
                    type: o
                }))) : "extra_data" === r && "52" === e.extra ? (a = e.hd ? "HD" : "SD", n = e.extra_data, 
                i.test(n) && (o = "flv"), t.push({
                    url: n,
                    subname: a,
                    name: o.toUpperCase(),
                    type: o
                })) : null !== (a = (a = r.match(s)) && a[1]) && (n = e[r], i.test(n) && (o = "flv"), 
                t.push({
                    url: n,
                    subname: a,
                    name: o.toUpperCase(),
                    type: o
                }));
            }));
            var a = e.duration;
            return {
                action: "getVKLinks",
                extVideoId: r,
                links: t,
                title: n,
                duration: a,
                thumb: o,
                data: e,
                checkLinks: null
            };
        }
        getVkLinksFromData(e, t) {
            var r = e.data, n = null;
            return Ve(r, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                if (e = e.player && e.player.params && e.player.params[0]) return n = e, !0;
            })), n ? t(this.getVkLinksFromJson(n)) : t();
        }
        async downloadVkStory(e) {
            let {downloadFileUrl: t, filename: r} = e;
            const n = await fetch(t, {
                headers: {
                    "User-Agent": "curl/7.64.1"
                }
            }), o = await n.blob(), i = URL.createObjectURL(o);
            this.engine.utils.downloadFile({
                options: {
                    filename: r,
                    url: i
                }
            });
        }
    };
    function xt(e, t) {
        const r = {
            "{": 0
        };
        let n = !1, o = "", i = !1, s = !1, a = 0, c = !1;
        const u = /[,;=(\[\-+/*%&|]/, l = /[\s\r\n]/, f = {
            "}": "{"
        };
        let p = "";
        for (let h, d = t; h = e[d]; d++) if (p += h, n || s || !c && !i || "/" !== h || a % 2 != 0 ? i || '"' !== h && "'" !== h || o && o !== h || a % 2 != 0 || (n = !n, 
        o = n ? h : "") : i = !i, i) "\\" === h ? a++ : (a % 2 == 0 && ("[" === h ? s = !0 : "]" === h && (s = !1)), 
        a = 0); else if (n) "\\" === h ? a++ : a = 0; else if (a = 0, u.test(h) ? c = !0 : l.test(h) || (c = !1), 
        "{" === h) r[h]++; else if ("}" === h && (r[f[h]]--, !r["{"])) return p;
        return "";
    }
    const St = Object(s.a)("app:ThrottleSigDecipher").t;
    new Map, new Map;
    function Tt(e) {
        return e.replace(/[|\\{}()[\]^$+*?.]/g, "\\$&").replace(/-/g, "\\x2d");
    }
    var At = class {
        getSignatureFnCodeSafe(e) {
            try {
                return this.getSignatureFnCode(e);
            } catch (e) {
                St("getSignatureFnCodeSafe error: %o", e);
            }
        }
        getSignatureFnCode(e) {
            let t;
            if (t = /[=(,&]([$\w]+)\(\w+\),\w+\.set\("\w+",/.exec(e), !t) {
                if (t = /[=(,&]([$\w]+)\[(\d+)\]\(\w+\),\w+\.set\("\w+",/.exec(e), t || (t = /[=(,&]([$\w]+)\[(\d+)\]\(\w+\),\w+\.set\(\w+,/.exec(e)), 
                !t) throw new Error("Function variable name is not found");
                const r = t[1], n = parseInt(t[2]);
                St("var name: %s", r), St("index: %d", n);
                const o = new RegExp("[ ,.]" + Tt(r) + "=\\[([\\w\\$,]+)\\]").exec(e);
                if (!o) throw new Error("Function variable name is not found");
                St("array values: %s", o[1]), t = [], t[1] = o[1].split(",")[n] || "";
            }
            const r = t[1];
            if (t = new RegExp("\n" + Tt(r) + "=(function\\(([^)]*)\\){[^{]+)").exec(e), !t) throw new Error("Function scope start fragment is not found");
            const n = t[2].split(",")[0];
            St("functionFirstArgName: %s", n);
            const o = e.indexOf(t[1]);
            if (-1 === o) throw new Error("First line pos is not found");
            const i = xt(e, o);
            let s = this.fixupSignatureFnCode(i, n);
            try {
                this.testNSigCode(s, "a1Jq5veBTL8Rcz7pt0");
            } catch (t) {
                if ("ReferenceError" === t.name) {
                    const r = t.message.match(/^([$\w_]+) is not defined/);
                    if (r) {
                        St("undefined variable: %s", r[1]);
                        const t = this.extractGlobalVariable(r[1], e);
                        St("additional code: %s", t), t && (s = s.replace(/\{/, "{" + t + ";"));
                    }
                }
            }
            return s;
        }
        extractGlobalVariable(e, t) {
            const r = new RegExp("[^\\w_\\\\]" + Tt(e) + "\\s*=\\s*(['\"]).+?\\1\\.split\\([^\\)]+\\)");
            St("extractGlobalVariable regexp: %s", r.toString());
            let n = r.exec(t);
            if (St("extractGlobalVariable matches: %j", n), n) return n[0];
            if (n = new RegExp("([^\\w_\\\\]" + Tt(e) + "\\s*=)\\s*\\[").exec(t), n) {
                const e = n.index + n[0].length - 1, r = this.extractArrayFromCode(t, e);
                if (r) return n[1] + r;
            }
            return "";
        }
        extractArrayFromCode(e, t) {
            let r = 0, n = !1, o = "", i = !1, s = -1;
            for (let a = t; a < e.length; a++) {
                const t = e[a];
                if (n) i ? i = !1 : "\\" === t ? i = !0 : t === o && (n = !1); else if ('"' === t || "'" === t) n = !0, 
                o = t; else if ("[" === t) r++; else if ("]" === t && (r--, 0 === r)) {
                    s = a;
                    break;
                }
            }
            return -1 !== s ? e.slice(t, s + 1) : "";
        }
        fixupSignatureFnCode(e, t) {
            const r = new RegExp(`if\\s*\\([^)]+\\)\\s*return ${t};`, "i");
            return St("re: %s", r.toString()), e.replace(r, ";");
        }
        isArgumentAsFunctionCall(e) {
            return /\]\(\)/.test(e);
        }
        buildEvalSignatureFn(e) {
            const t = new Function("sig", `return (${e})(sig);`);
            return e => {
                const r = t(e);
                if ("string" != typeof r) throw new Error("Unexpected result");
                return r;
            };
        }
        testNSigCode(e, t) {
            if (!e) throw new Error("nSigCode is empty");
            const r = this.buildEvalSignatureFn(e)(t);
            if (!r) throw new Error("Incorrect nSigCode result");
            return r;
        }
    };
    var Ct = class {
        constructor() {
            this.throttleSigDecipher = new At;
        }
        applyActions(e, t) {
            const r = {
                slice: (e, t) => {
                    e.slice(t);
                },
                splice: (e, t) => {
                    e.splice(0, t);
                },
                reverse: e => {
                    e.reverse();
                },
                swap: (e, t) => {
                    const r = e[0];
                    e[0] = e[t % e.length], e[t] = r;
                }
            }, n = t.split("");
            for (let t, o = 0; t = e[o]; o++) r[t[0]](n, t[1]);
            return n.join("");
        }
        getNewChip(e) {
            const t = t => {
                const r = /([\w$]+)(?:\.([\w$]+)|\[("[\w$]+")\])\([\w$]+,?([\w$]+)?\)/.exec(t);
                if (!r) throw new Error("readAction");
                const n = r[1], o = r[2] || r[3], i = r[4], s = ((t, r) => {
                    t = t.replace(/\$/g, "\\$");
                    const n = new RegExp("(?:var |,|\n)" + t + "={"), o = e.search(n);
                    if (-1 === o) throw new Error("Place is not found");
                    const i = e.substr(o, 300);
                    r = r.replace(/\$/g, "\\$");
                    const s = new RegExp(r + ":function\\(([$\\w,]+)\\){([^}]+)}"), a = i.match(s);
                    if (!a) throw new Error("Place function is not found!");
                    return {
                        args: a[1],
                        statement: a[2]
                    };
                })(n, o);
                if (/\.reverse/.test(s.statement)) return [ "reverse", null ];
                if (!/^[\d]+$/.test(i)) throw new Error("Arg is not number");
                return /\.splice/.test(s.statement) ? [ "splice", parseInt(i) ] : /\.slice/.test(s.statement) ? [ "slice", parseInt(i) ] : [ "swap", parseInt(i) ];
            }, r = (() => {
                let t = null, r = /,sts:(\d+)/.exec(e);
                if (r && (t = r[1]), !t) {
                    const r = /\.signatureTimestamp=(\d+)/.exec(e);
                    r && (t = r[1]);
                }
                if (!t) {
                    const r = /,signatureTimestamp:(\d+)/.exec(e);
                    r && (t = r[1]);
                }
                if (!t) {
                    const r = /,sts:([\w$]+)/.exec(e);
                    if (r) {
                        const n = e.indexOf(",sts:" + r[1]);
                        t = ((e, t) => {
                            t = t.replace(/\$/g, "\\$");
                            const r = new RegExp("(?:var |,|;\n?)" + t + "=(\\d+)[;,]").exec(e);
                            if (!r) throw new Error("Sts variable is not found");
                            return r[1];
                        })(((e, t) => {
                            const r = e.substr(0, t);
                            let n = void 0;
                            for (;-1 !== n; ) {
                                "number" == typeof n && (n -= 1), n = r.lastIndexOf("function", n);
                                const o = xt(e, n);
                                if (n < t && n + o.length > t) return o;
                            }
                            throw new Error("Parent function is not found");
                        })(e, n), r[1]);
                    }
                }
                if (!t) throw new Error("Sts is not found");
                return parseInt(t, 10);
            })();
            let n;
            const o = /[$_a-zA-Z0-9]+\.set\((?:[$_a-zA-Z0-9]+\.[$_a-zA-Z0-9]+\|\|)?"signature",([$_a-zA-Z0-9]+)\(/.exec(e);
            if (o && (n = o[1]), !n) {
                const t = /(?:function ([$_a-zA-Z0-9]+)|(?:var |,|;\n)([$_a-zA-Z0-9]+)=function)\(([\w$]+)\){\3=\3\.split\([^}]+;return \3\.join\([^}]+}[;,]/.exec(e);
                t && (n = t[1] || t[2]);
            }
            if (!n) throw new Error("Decode function name is not found!");
            const i = (r => {
                r = r.replace(/\$/g, "\\$");
                const n = new RegExp("(?:function " + r + "|(?:var |,|;\n)" + r + "=function)\\(([\\w$]+)\\){([^}]*)}[;,]").exec(e);
                if (!n) throw new Error("findConvertFn");
                return ((e, r) => {
                    e = e.replace(/\$/g, "\\$");
                    const n = new RegExp('[\\w$]+(?:\\.[\\w$]+|\\["[\\w$]+"\\])\\(' + e + "[^)]*\\)", "g"), o = r.match(n);
                    if (!o) throw new Error("readScope");
                    return o.map(e => t(e));
                })(n[1], n[2]);
            })(n);
            if (!i.length) throw new Error("actionList is empty");
            return {
                actionList: i,
                sts: r
            };
        }
        dechip(e, t) {
            const {sts: r, actionList: n} = this.getNewChip(t);
            return {
                sts: r,
                actionList: n,
                playerUrl: e,
                nSigCode: this.throttleSigDecipher.getSignatureFnCodeSafe(t),
                expiresAt: Object(I.a)() + 43200,
                helperVersion: "10.51"
            };
        }
    };
    function Rt(e, t, r) {
        return t in e ? Object.defineProperty(e, t, {
            value: r,
            enumerable: !0,
            configurable: !0,
            writable: !0
        }) : e[t] = r, e;
    }
    function Pt(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), r.push.apply(r, n);
        }
        return r;
    }
    function Lt(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Pt(Object(r), !0).forEach((function(t) {
                Rt(e, t, r[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Pt(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            }));
        }
        return e;
    }
    function It(e, t) {
        if (null == e) return {};
        var r, n, o = function(e, t) {
            if (null == e) return {};
            var r, n, o = {}, i = Object.keys(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || (o[r] = e[r]);
            return o;
        }(e, t);
        if (Object.getOwnPropertySymbols) {
            var i = Object.getOwnPropertySymbols(e);
            for (n = 0; n < i.length; n++) r = i[n], t.indexOf(r) >= 0 || Object.prototype.propertyIsEnumerable.call(e, r) && (o[r] = e[r]);
        }
        return o;
    }
    function* jt(e, t) {
        !0 === e || (!1 === e ? yield t.fail() : yield* e);
    }
    function Ut(e) {
        const {done: t, value: r} = e.next();
        return t ? void 0 : r;
    }
    class Nt {
        constructor(e) {
            const {type: t, schema: r, coercer: n = (e => e), validator: o = (() => []), refiner: i = (() => [])} = e;
            this.type = t, this.schema = r, this.coercer = n, this.validator = o, this.refiner = i;
        }
    }
    class Mt extends TypeError {
        constructor(e, t) {
            const {path: r, value: n, type: o, branch: i} = e, s = It(e, [ "path", "value", "type", "branch" ]);
            let a;
            super(`Expected a value of type \`${o}\`${r.length ? ` for \`${r.join(".")}\`` : ""} but received \`${JSON.stringify(n)}\`.`), 
            this.value = n, Object.assign(this, s), this.type = o, this.path = r, this.branch = i, 
            this.failures = function() {
                return a || (a = [ e, ...t ]), a;
            }, this.stack = (new Error).stack, this.__proto__ = Mt.prototype;
        }
    }
    function Ft(e, t) {
        const r = Bt(e, t);
        if (r[0]) throw r[0];
    }
    function Dt(e, t) {
        const r = t.coercer(e);
        return Ft(r, t), r;
    }
    function Bt(e, t, r = !1) {
        r && (e = t.coercer(e));
        const n = function* e(t, r, n = [], o = []) {
            const {type: i} = r, s = {
                value: t,
                type: i,
                branch: o,
                path: n,
                fail: (e = {}) => Lt({
                    value: t,
                    type: i,
                    path: n,
                    branch: [ ...o, t ]
                }, e),
                check(t, r, i, s) {
                    const a = void 0 !== i ? [ ...n, s ] : n, c = void 0 !== i ? [ ...o, i ] : o;
                    return e(t, r, a, c);
                }
            }, a = jt(r.validator(t, s), s), c = Ut(a);
            c ? (yield c, yield* a) : yield* jt(r.refiner(t, s), s);
        }(e, t), o = Ut(n);
        if (o) {
            return [ new Mt(o, n), void 0 ];
        }
        return [ void 0, e ];
    }
    function qt(e) {
        return new Nt({
            type: `Array<${e ? e.type : "unknown"}>`,
            schema: e,
            coercer: t => e && Array.isArray(t) ? t.map(t => Dt(t, e)) : t,
            * validator(t, r) {
                if (Array.isArray(t)) {
                    if (e) for (const [n, o] of t.entries()) yield* r.check(o, e, t, n);
                } else yield r.fail();
            }
        });
    }
    function Vt() {
        return Xt("boolean", e => "boolean" == typeof e);
    }
    function $t() {
        return Xt("never", () => !1);
    }
    function Ht() {
        return Xt("number", e => "number" == typeof e && !isNaN(e));
    }
    function Gt(e) {
        const t = e ? Object.keys(e) : [], r = $t();
        return new Nt({
            type: e ? `Object<{${t.join(",")}}>` : "Object",
            schema: e || null,
            coercer: e ? Jt(e) : e => e,
            * validator(n, o) {
                if ("object" == typeof n && null != n) {
                    if (e) {
                        const i = new Set(Object.keys(n));
                        for (const r of t) {
                            i.delete(r);
                            const t = e[r], s = n[r];
                            yield* o.check(s, t, n, r);
                        }
                        for (const e of i) {
                            const t = n[e];
                            yield* o.check(t, r, n, e);
                        }
                    }
                } else yield o.fail();
            }
        });
    }
    function Yt(e) {
        return new Nt({
            type: e.type + "?",
            schema: e.schema,
            validator: (t, r) => void 0 === t || r.check(t, e)
        });
    }
    function Wt(e) {
        e instanceof Nt && (e = e.schema);
        const t = Object.keys(e), r = $t();
        return new Nt({
            type: `Partial<{${t.join(",")}}>`,
            schema: e,
            coercer: Jt(e),
            * validator(n, o) {
                if ("object" != typeof n || null == n) return void (yield o.fail());
                const i = new Set(Object.keys(n));
                for (const r of t) {
                    if (i.delete(r), !(r in n)) continue;
                    const t = e[r], s = n[r];
                    yield* o.check(s, t, n, r);
                }
                for (const e of i) {
                    const t = n[e];
                    yield* o.check(t, r, n, e);
                }
            }
        });
    }
    function zt() {
        return Xt("string", e => "string" == typeof e);
    }
    function Xt(e, t) {
        return new Nt({
            type: e,
            validator: t,
            schema: null
        });
    }
    function Jt(e) {
        const t = Object.keys(e);
        return r => {
            if ("object" != typeof r || null == r) return r;
            const n = {}, o = new Set(Object.keys(r));
            for (const i of t) {
                o.delete(i);
                const t = e[i], s = r[i];
                n[i] = Dt(s, t);
            }
            for (const e of o) n[e] = r[e];
            return n;
        };
    }
    var Kt = function(e) {
        let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : [];
        Array.isArray(t) || (t = [ t ]);
        const r = new DOMParser, n = r.parseFromString(e, "text/html");
        return [].slice.call(n.querySelectorAll("script")).map(e => e.textContent).filter(e => t.every(t => t.test(e)));
    }, Qt = r(20);
    var Zt = function(e) {
        o.a.sendMessage({
            action: "sendMonitoring",
            obj: {
                category: e.category,
                event: e.event,
                subcategory: e.subcategory
            }
        });
    };
    function er(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), r.push.apply(r, n);
        }
        return r;
    }
    function tr(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? er(Object(r), !0).forEach((function(t) {
                E(e, t, r[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : er(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            }));
        }
        return e;
    }
    const rr = {
        web: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "WEB",
                    clientVersion: "2.20240726.00.00"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 1,
            REQUIRE_PO_TOKEN: !0,
            SUPPORTS_COOKIES: !0
        },
        web_safari: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "WEB",
                    clientVersion: "2.20240726.00.00",
                    userAgent: "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/15.5 Safari/605.1.15,gzip(gfe)"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 1,
            REQUIRE_PO_TOKEN: !0,
            SUPPORTS_COOKIES: !0
        },
        web_embedded: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "WEB_EMBEDDED_PLAYER",
                    clientVersion: "1.20240723.01.00"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 56,
            SUPPORTS_COOKIES: !0
        },
        web_music: {
            INNERTUBE_HOST: "music.youtube.com",
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "WEB_REMIX",
                    clientVersion: "1.20240724.00.00"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 67,
            SUPPORTS_COOKIES: !0
        },
        web_creator: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "WEB_CREATOR",
                    clientVersion: "1.20240723.03.00"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 62,
            REQUIRE_AUTH: !0,
            SUPPORTS_COOKIES: !0
        },
        android: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "ANDROID",
                    clientVersion: "19.44.38",
                    androidSdkVersion: 30,
                    userAgent: "com.google.android.youtube/19.44.38 (Linux; U; Android 11) gzip",
                    osName: "Android",
                    osVersion: "11"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 3,
            REQUIRE_JS_PLAYER: !1,
            REQUIRE_PO_TOKEN: !0
        },
        android_music: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "ANDROID_MUSIC",
                    clientVersion: "7.27.52",
                    androidSdkVersion: 30,
                    userAgent: "com.google.android.apps.youtube.music/7.27.52 (Linux; U; Android 11) gzip",
                    osName: "Android",
                    osVersion: "11"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 21,
            REQUIRE_JS_PLAYER: !1,
            REQUIRE_PO_TOKEN: !0,
            REQUIRE_AUTH: !0,
            SUPPORTS_COOKIES: !0
        },
        android_creator: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "ANDROID_CREATOR",
                    clientVersion: "24.45.100",
                    androidSdkVersion: 30,
                    userAgent: "com.google.android.apps.youtube.creator/24.45.100 (Linux; U; Android 11) gzip",
                    osName: "Android",
                    osVersion: "11"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 14,
            REQUIRE_JS_PLAYER: !1,
            REQUIRE_PO_TOKEN: !0,
            REQUIRE_AUTH: !0
        },
        android_vr: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "ANDROID_VR",
                    clientVersion: "1.60.19",
                    deviceMake: "Oculus",
                    deviceModel: "Quest 3",
                    androidSdkVersion: 32,
                    userAgent: "com.google.android.apps.youtube.vr.oculus/1.60.19 (Linux; U; Android 12L; eureka-user Build/SQ3A.220605.009.A1) gzip",
                    osName: "Android",
                    osVersion: "12L"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 28,
            REQUIRE_JS_PLAYER: !1,
            SUPPORTS_COOKIES: !0
        },
        ios: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "IOS",
                    clientVersion: "19.45.4",
                    deviceMake: "Apple",
                    deviceModel: "iPhone16,2",
                    userAgent: "com.google.ios.youtube/19.45.4 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                    osName: "iPhone",
                    osVersion: "18.1.0.22B83"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 5,
            REQUIRE_JS_PLAYER: !1
        },
        ios_music: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "IOS_MUSIC",
                    clientVersion: "7.27.0",
                    deviceMake: "Apple",
                    deviceModel: "iPhone16,2",
                    userAgent: "com.google.ios.youtubemusic/7.27.0 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                    osName: "iPhone",
                    osVersion: "18.1.0.22B83"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 26,
            REQUIRE_JS_PLAYER: !1,
            REQUIRE_AUTH: !0,
            SUPPORTS_COOKIES: !0
        },
        ios_creator: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "IOS_CREATOR",
                    clientVersion: "24.45.100",
                    deviceMake: "Apple",
                    deviceModel: "iPhone16,2",
                    userAgent: "com.google.ios.ytcreator/24.45.100 (iPhone16,2; U; CPU iOS 18_1_0 like Mac OS X;)",
                    osName: "iPhone",
                    osVersion: "18.1.0.22B83"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 15,
            REQUIRE_JS_PLAYER: !1,
            REQUIRE_AUTH: !0
        },
        mweb: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "MWEB",
                    clientVersion: "2.20240726.01.00"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 2,
            SUPPORTS_COOKIES: !0
        },
        tv: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "TVHTML5",
                    clientVersion: "7.20240724.13.00"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 7,
            SUPPORTS_COOKIES: !0
        },
        tv_embedded: {
            INNERTUBE_CONTEXT: {
                client: {
                    clientName: "TVHTML5_SIMPLY_EMBEDDED_PLAYER",
                    clientVersion: "2.0"
                }
            },
            INNERTUBE_CONTEXT_CLIENT_NAME: 85,
            REQUIRE_AUTH: !0,
            SUPPORTS_COOKIES: !0
        }
    };
    class nr {
        constructor() {
            this.INNERTUBE_CLIENTS = rr, this.visitorData = null;
        }
        async fetchClientRequest() {
            let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : "android_vr", {videoId: t, url: r} = arguments.length > 1 ? arguments[1] : void 0;
            return this.getVisitorData(r).then(r => {
                this.visitorData = r;
                const n = {
                    prettyPrint: !1
                }, o = rr[e], i = {
                    playbackContext: {
                        contentPlaybackContext: {
                            html5Preference: "HTML5_PREF_WANTS"
                        }
                    },
                    contentCheckOk: !0,
                    racyCheckOk: !0,
                    videoId: t,
                    context: {
                        client: tr({
                            hl: "en",
                            timeZone: "UTC",
                            utcOffsetMinutes: 0
                        }, o.INNERTUBE_CONTEXT.client)
                    }
                }, s = {
                    accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
                    "accept-encoding": "gzip, deflate, br",
                    "accept-language": "en-us,en;q=0.5",
                    connection: "keep-alive",
                    "content-type": "application/json",
                    host: "www.youtube.com",
                    origin: "https://www.youtube.com",
                    "sec-fetch-mode": "navigate",
                    "x-youtube-client-name": o.INNERTUBE_CONTEXT_CLIENT_NAME,
                    "x-youtube-client-version": o.INNERTUBE_CONTEXT.client.clientVersion,
                    "x-goog-visitor-id": this.visitorData
                };
                return o.INNERTUBE_CONTEXT.client.userAgent && (s["user-agent"] = o.INNERTUBE_CONTEXT.client.userAgent), 
                this.syncYoutubeCookies().then(() => fetch("https://www.youtube.com/youtubei/v1/player?" + ft.a.stringify(n), {
                    method: "POST",
                    body: JSON.stringify(i),
                    headers: s
                }));
            });
        }
        syncYoutubeCookies() {
            return new Promise((e, t) => {
                try {
                    chrome && chrome.cookies ? chrome.cookies.getAll({
                        domain: "youtube.com"
                    }, t => {
                        t.forEach(e => {
                            Object.hasOwn(e, "hostOnly") || chrome.cookies.set(tr({
                                url: "https://youtube.com"
                            }, e));
                        }), e();
                    }) : e();
                } catch (e) {
                    t(e);
                }
            });
        }
        getVisitorData(e) {
            return fetch(e).then(e => e.text().then(e => /"VISITOR_DATA":\s*"([^"]+)"/.exec(e)[1]));
        }
    }
    const or = r(79), ir = r(8), {URL: sr} = or, ar = Object(s.a)("YtMetadata").t, cr = Xt("FiniteNumber", e => isFinite(Number(e)));
    function ur(e) {
        const t = Nt;
        e instanceof t && (e = e.schema);
        const r = Object.keys(e);
        return new t({
            type: `Partial<{${r.join(",")}}>`,
            schema: e,
            coercer: Wt(e).coercer,
            * validator(t, n) {
                if ("object" == typeof t && null != t) for (const o of r) {
                    const r = e[o], i = t[o];
                    yield* n.check(i, r, t, o);
                } else yield n.fail();
            }
        });
    }
    const lr = Gt({
        itag: Ht(),
        url: Yt(zt()),
        type: Yt(zt()),
        cipher: Yt(zt()),
        signatureCipher: Yt(zt()),
        mimeType: zt(),
        bitrate: Yt(Ht()),
        width: Ht(),
        height: Ht(),
        initRange: Yt(Gt({
            start: cr,
            end: cr
        })),
        indexRange: Yt(Gt({
            start: cr,
            end: cr
        })),
        lastModified: cr,
        contentLength: Yt(cr),
        encryption: Yt(zt()),
        drmFamilies: Yt(qt(zt())),
        quality: zt(),
        fps: Ht(),
        qualityLabel: zt(),
        projectionType: zt(),
        averageBitrate: Yt(Ht()),
        colorInfo: Yt(Gt({
            primaries: Yt(zt()),
            transferCharacteristics: zt(),
            matrixCoefficients: Yt(zt())
        })),
        approxDurationMs: Yt(cr),
        highReplication: Yt(Vt()),
        xtags: Yt(zt()),
        targetDurationSec: Yt(Ht()),
        maxDvrDurationSec: Yt(Ht()),
        loudnessDb: Yt(Ht())
    }), fr = Gt({
        itag: Ht(),
        url: Yt(zt()),
        cipher: Yt(zt()),
        signatureCipher: Yt(zt()),
        mimeType: zt(),
        bitrate: Yt(Ht()),
        initRange: Yt(Gt({
            start: cr,
            end: cr
        })),
        indexRange: Yt(Gt({
            start: cr,
            end: cr
        })),
        lastModified: cr,
        contentLength: Yt(cr),
        quality: zt(),
        encryption: Yt(zt()),
        drmFamilies: Yt(qt(zt())),
        projectionType: zt(),
        averageBitrate: Yt(Ht()),
        highReplication: Yt(Vt()),
        audioQuality: zt(),
        approxDurationMs: Yt(cr),
        audioSampleRate: cr,
        audioChannels: Ht(),
        targetDurationSec: Yt(Ht()),
        maxDvrDurationSec: Yt(Ht()),
        loudnessDb: Yt(Ht())
    });
    Gt({
        probeUrl: Yt(zt()),
        dashManifestUrl: Yt(zt()),
        hlsManifestUrl: Yt(zt()),
        expiresInSeconds: cr,
        formats: Yt(qt(Gt({
            itag: Ht(),
            url: Yt(zt()),
            cipher: Yt(zt()),
            signatureCipher: Yt(zt()),
            mimeType: zt(),
            bitrate: Yt(Ht()),
            fps: Yt(Ht()),
            width: Ht(),
            height: Ht(),
            lastModified: cr,
            contentLength: Yt(cr),
            quality: zt(),
            qualityLabel: zt(),
            projectionType: zt(),
            averageBitrate: Yt(Ht()),
            audioQuality: zt(),
            approxDurationMs: Yt(cr),
            audioSampleRate: Yt(cr),
            audioChannels: Yt(Ht())
        }))),
        adaptiveFormats: qt((pr = (e, t) => e && /^video/.test(e.mimeType) ? lr : fr, Xt("Dynamic<...>", (e, t) => t.check(e, pr(e, t))))),
        licenseInfos: Yt(qt(Gt({
            drmFamily: zt(),
            url: zt(),
            drmParams: zt()
        }))),
        drmParams: Yt(zt())
    });
    var pr;
    const hr = ur({
        itag: Ht(),
        url: Yt(zt()),
        cipher: Yt(zt()),
        signatureCipher: Yt(zt()),
        mimeType: zt(),
        fps: Yt(Ht()),
        width: Yt(Ht()),
        height: Yt(Ht()),
        bitrate: Yt(Ht()),
        contentLength: Yt(cr)
    }), dr = ur({
        formats: Yt(qt(hr)),
        adaptiveFormats: Yt(qt(hr))
    }), mr = ur({
        playabilityStatus: Gt(),
        streamingData: Yt(Gt()),
        videoDetails: Yt(ur({
            videoId: zt(),
            title: zt(),
            lengthSeconds: cr,
            channelId: zt(),
            shortDescription: zt(),
            thumbnail: ur({
                thumbnails: qt(ur({
                    url: zt(),
                    width: Ht(),
                    height: Ht()
                }))
            }),
            useCipher: Yt(Vt()),
            author: zt()
        }))
    });
    function gr(e) {
        return new Promise((t, r) => {
            Object(J.a)(e, (e, n, o) => {
                e && "string" == typeof e && (e = new Error(e)), e ? r(e) : t(o);
            });
        }).catch(e => {
            const t = /^(\d+)\s+(.*)/.exec(e.message);
            throw t && (e.status = parseInt(t[1], 10), e.statusText = t[2]), e;
        });
    }
    function yr(e) {
        const {playabilityStatus: t, videoDetails: r} = e;
        if ("OK" !== t.status) {
            let e = "UNKNOWN_PLAYABILITY_STATUS";
            return "LOGIN_REQUIRED" === t.status || "UNPLAYABLE" === t.status ? e = t.status : "ERROR" === t.status && (e = "YT_ERROR"), 
            new K.a(`${t.status}: ${t.reason}`, e);
        }
        if (!r) return new K.a("Video details is empty", "VIDEO_DETAILS_IS_EMPTY");
    }
    function vr(e, t, r) {
        return r && (e[t] = r), e;
    }
    const br = /(\/s\/([^\/]+))/;
    function wr(e) {
        const t = br.exec(e);
        if (t) return {
            fragment: t[1],
            signature: t[2]
        };
    }
    const Er = /\/sp\/([^\/]+)/;
    function Or(e) {
        const t = Er.exec(e);
        if (t) return t[1];
    }
    function kr(e) {
        let t = null;
        if (/\.googlevideo\.com/.test(e)) {
            const r = new sr(e);
            r.host = "redirector.googlevideo.com", t = or.format(r);
        } else if (/r[1-9].*\.c\.youtube\.com/.test(e)) {
            const r = new sr(e);
            r.host = "www.youtube.com", t = or.format(r);
        }
        return t;
    }
    var _r = class {
        constructor() {
            this.lastSignatureInited = !1, this.oneLimitGetSignature = Object(Qt.a)(1), this.lastSignature = null, 
            this.html5SigDecipher = new Ct, this.getDashUrlSignature = wr, this.dashMpdSignatureParamR = Or, 
            this.getAltUrl = kr, this.getData = gr, this.innertubeClient = new nr, (o.a.isChromeMobile || o.a.isFirefoxMobile) && (this.ua = Xe());
        }
        getMetadata(e, t) {
            return this.innertubeClient.fetchClientRequest("android_vr", {
                videoId: e,
                url: t
            }).then(e => e.json()).then(t => {
                if (t && t.playabilityStatus && "This video is unavailable" === t.playabilityStatus.reason) throw new Error("TRY_IOS");
                if (t && t.videoDetails && t.videoDetails.videoId !== e) throw new Error("TRY_IOS");
                if (t && t.playabilityStatus && "LOGIN_REQUIRED" === t.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                const r = {
                    player_response: t
                };
                return Zt({
                    category: "meta",
                    subcategory: "101",
                    event: "main"
                }), {
                    videoInfo: r,
                    signature: null
                };
            }).catch(r => (ar.error("getMetadata error: %O", r), "TRY_IOS" === r.code ? this.getMetadataIos(e, t) : this.getVideoInfoAsPage(e).catch(e => {
                throw ar.error("getVideoInfoAsPage error: %O", e), Zt({
                    category: "meta",
                    subcategory: "101",
                    event: "fail"
                }), e;
            }).then(e => {
                let {videoInfo: t, signature: r} = e;
                return Zt({
                    category: "meta",
                    subcategory: "101",
                    event: "fallback"
                }), this.testSignature(t, r).then(() => ({
                    videoInfo: t,
                    signature: r
                }));
            })));
        }
        getMetadataIos(e, t) {
            return this.innertubeClient.fetchClientRequest("ios", {
                videoId: e,
                url: t
            }).then(e => e.json()).then(e => {
                if (e && e.playabilityStatus && "LOGIN_REQUIRED" === e.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                const t = {
                    player_response: e
                };
                return Zt({
                    category: "meta",
                    subcategory: "101",
                    event: "main"
                }), {
                    videoInfo: t,
                    signature: null
                };
            }).catch(t => (ar.error("getMetadata error: %O", t), this.getVideoInfoAsPage(e).catch(e => {
                throw ar.error("getVideoInfoAsPage error: %O", e), Zt({
                    category: "meta",
                    subcategory: "101",
                    event: "fail"
                }), e;
            }).then(e => {
                let {videoInfo: t, signature: r} = e;
                return Zt({
                    category: "meta",
                    subcategory: "101",
                    event: "fallback"
                }), this.testSignature(t, r).then(() => ({
                    videoInfo: t,
                    signature: r
                }));
            })));
        }
        async testSignature(e, t) {
            const r = function(e) {
                let t = null;
                if ([ "url_encoded_fmt_stream_map", "adaptive_fmts", "fmt_url_map" ].some(r => {
                    const n = e[r];
                    if (n) return n.some(e => {
                        if (e.s && e.url) return t = e, !0;
                    });
                }), !t) {
                    const n = e.player_response;
                    if (n.streamingData) {
                        function r(e) {
                            const r = e.signatureCipher || e.cipher;
                            if (r) {
                                const {sp: e, s: n, url: o} = ir.parse(r);
                                return t = {
                                    url: o,
                                    sp: e,
                                    s: n
                                }, !0;
                            }
                        }
                        n.streamingData.formats && n.streamingData.formats.some(r), !t && n.streamingData.adaptiveFormats && n.streamingData.adaptiveFormats.some(r);
                    }
                }
                return t;
            }(e);
            if (!r) return;
            ar.debug("Found chiped item", e.player_response.videoDetails.videoId);
            const n = this.html5SigDecipher.applyActions(t.actionList, r.s);
            let o = null;
            if (r.getUrl) o = r.getUrl(n); else {
                const e = r.sp || "signature";
                o = r.url + `&${e}=` + n;
            }
            return gr({
                method: "HEAD",
                url: o
            }).catch(e => {
                const t = kr(o);
                if ("net::ERR_NAME_NOT_RESOLVED" === e.message && t) return gr({
                    method: "HEAD",
                    url: t
                });
                throw e;
            }).catch(e => {
                if (403 === e.status) throw e;
            });
        }
        async getVideoInfo(e, t, r, n) {
            let o = null;
            const i = await this.getSignature();
            return gr({
                url: `https://${e}/get_video_info?` + ir.stringify({
                    video_id: t,
                    eurl: n,
                    el: r,
                    html5: 1,
                    sts: i.sts
                }),
                headers: vr({}, "User-Agent", this.ua)
            }).then(e => {
                o = e, e = ir.parse(e), this.parseParams(e);
                const t = parseInt(e.errorcode, 10);
                if (t > 0) {
                    let r = "VIDEO_INFO_ERROR";
                    throw 2 === t ? r = "INVALID_REQUEST" : 150 === t && (r = "UNAVAILABLE"), new K.a(`Error (${t}): ${e.reason}`, r);
                }
                if (!e.player_response) throw new K.a("Player response is not found", "PLAYER_RESPONSE_NOT_FOUND");
                const r = yr(e.player_response);
                if (r) throw r;
                return {
                    videoInfo: e,
                    signature: i
                };
            });
        }
        getVideoInfoAsJsonPage(e) {
            return gr({
                url: "https://www.youtube.com/watch?" + ir.stringify({
                    v: e,
                    pbj: 1
                }),
                headers: vr({
                    "x-youtube-client-name": "1",
                    "x-youtube-client-version": "2.20200812.02.01"
                }, "User-Agent", this.ua)
            }).then(async e => {
                if (e = JSON.parse(e), !Array.isArray(e)) throw new K.a("Unexpected response", "UNEXPECTED_RESPONSE");
                let t = null, r = null;
                if (e.some(e => {
                    if (e.playerResponse ? t = e.playerResponse : e.player && e.player.assets && e.player.assets.js && (r = e.player.assets.js), 
                    t && r) return !0;
                }), !t) throw new K.a("playerResponse is not found!", "PLAYER_RESPONSE_IS_NOT_FOUND");
                return this.getVideoInfoFromPlayerResponse(t, r);
            });
        }
        getVideoInfoAsPage(e) {
            let t = null;
            return gr({
                url: "https://www.youtube.com/watch?" + ir.stringify({
                    v: e,
                    has_verified: 1
                }),
                headers: vr({}, "User-Agent", this.ua)
            }).then(async e => {
                let r, n;
                t = e;
                try {
                    const {playerResponse: t, playerUrl: o} = this.getYtInitialPlayerResponseFromHtmlPage(e);
                    r = {
                        player_response: t
                    }, n = o;
                } catch (t) {
                    ar.warn("getYtInitialPlayerResponseFromHtmlPage error: %O", t);
                    const o = this.getSwfCfgFromHtmlPage(e);
                    r = this.parseParams(o.args), n = o.assets && o.assets.js;
                }
                return this.getVideoInfoFromPlayerResponse(r.player_response, n);
            });
        }
        getSwfCfgFromHtmlPage(e) {
            let t = null;
            if (Kt(e, [ /"responseContext"/ ]).some(e => Ve(e, [ /"playabilityStatus":/ ]).some(e => {
                if (e && e.playabilityStatus) return t = e, !0;
            })), t) {
                const e = yr(t);
                if (e) throw e;
            }
            let r = null;
            if (Kt(e, [ /ytplayer\.config\s+=\s+/ ]).some(e => Ve(e, [ /"player_response":/ ]).some(e => {
                if (e.args && "object" == typeof e.args) return r = e, !0;
            })), !r) throw new K.a("swfcfg is not found!", "SWFCFG_IS_NOT_FOUND");
            return r;
        }
        getYtInitialPlayerResponseFromHtmlPage(e) {
            let t = null;
            if (Kt(e, [ /ytInitialPlayerResponse/ ]).some(e => Ve(e, [ /"playabilityStatus":/ ]).some(e => {
                if (e && e.playabilityStatus) return t = e;
            })), !t) throw new K.a("ytInitialPlayerResponse in not found", "PLAYER_RESPONSE_NOT_FOUND");
            let r = null;
            return Kt(e, [ /ytplayer\.web_player_context_config\s+=\s+/ ]).some(e => Ve(e, [ /"jsUrl":/ ]).some(e => {
                if (e.jsUrl) return r = e.jsUrl;
            })), !r && Kt(e, [ /window\.ytplayer={};/ ]).some(e => Ve(e, [ /("jsUrl"|"PLAYER_JS_URL"):/ ]).some(e => e.PLAYER_JS_URL ? r = e.PLAYER_JS_URL : e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH && e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH.jsUrl ? r = e.WEB_PLAYER_CONTEXT_CONFIG_ID_KEVLAR_WATCH.jsUrl : void 0)), 
            {
                playerResponse: t,
                playerUrl: r
            };
        }
        async getVideoInfoFromPlayerResponse(e, t) {
            this.validatePlayerResponse(e);
            const r = yr(e);
            if (r) throw r;
            const n = {
                player_response: e
            };
            if (!t) throw new K.a("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
            return {
                videoInfo: n,
                signature: await this.getSignatureFormPlayerUrl(t)
            };
        }
        async getInfoFromVideoInfo(e, t) {
            if (!e.player_response) throw new K.a("Player response is not found", "PLAYER_RESPONSE_NOT_FOUND");
            e.player_response = Dt(e.player_response, mr);
            const r = yr(e.player_response);
            if (r) throw r;
            if (!t) throw new K.a("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
            return {
                videoInfo: e,
                signature: await this.getSignatureFormPlayerUrl(t)
            };
        }
        parseParams(e) {
            return [ "url_encoded_fmt_stream_map", "adaptive_fmts", "fmt_url_map" ].forEach(t => {
                e[t] && (e[t] = e[t].split(",").map(e => ir.parse(e)));
            }), e.player_response && (e.player_response = JSON.parse(e.player_response), this.validatePlayerResponse(e.player_response)), 
            e;
        }
        validatePlayerResponse(e) {
            Dt(e, mr), e.streamingData && Ft(e.streamingData, dr);
        }
        initLastSignature() {
            return Object(be.a)(() => {
                if (!this.lastSignatureInited) return this.lastSignatureInited = !0, new Promise(e => o.a.storage.get({
                    ytLastSignature: null
                }, t => e(t.ytLastSignature))).then(e => {
                    e && e.throttleSigCode && (e = null), this.lastSignature = e;
                });
            });
        }
        getSignature() {
            return this.oneLimitGetSignature(async () => {
                if (await this.initLastSignature(), !this.lastSignature || this.lastSignature.expiresAt < Object(I.a)()) {
                    let e = null;
                    this.lastSignature = await gr({
                        url: "https://www.youtube.com/",
                        headers: vr({}, "User-Agent", this.ua)
                    }).then(t => {
                        e = t;
                        let r = null;
                        try {
                            r = this.getPlayerUrlFromHtml(t);
                        } catch (e) {
                            r = this.getPlayerUrlFromAuthHtml(t);
                        }
                        return this.getSignatureFormPlayerUrl(r);
                    });
                }
                return this.lastSignature;
            });
        }
        getSignatureFormPlayerUrl(e) {
            return /^\/\//.test(e) ? e = "https:" + e : /^\//.test(e) && (e = "https://www.youtube.com" + e), 
            this.initLastSignature().then(() => this.lastSignature && this.lastSignature.expiresAt > Object(I.a)() && this.lastSignature.playerUrl === e && "10.51" === this.lastSignature.helperVersion ? this.lastSignature : gr({
                url: e,
                headers: vr({}, "User-Agent", this.ua)
            }).then(t => this.html5SigDecipher.dechip(e, t)).then(e => new Promise(t => o.a.storage.set({
                ytLastSignature: e
            }, t)).catch(e => {
                ar.warn("Unable save signature, cause: %O", e);
            }).then(() => this.lastSignature = e)));
        }
        getPlayerUrlFromHtml(e) {
            let t = null;
            if (Kt(e, [ /window\.ytplayer\s*=\s*/ ]).some(e => Ve(e, [ /"PLAYER_JS_URL":/ ]).some(e => {
                if (e.PLAYER_JS_URL) return t = e.PLAYER_JS_URL, !0;
            })), !t) throw new K.a("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
            return t;
        }
        getPlayerUrlFromAuthHtml(e) {
            let t = null;
            if (Kt(e, [ /ytplayer\.config\s+=\s+/ ]).some(e => Ve(e, [ /"assets":/ ]).some(e => {
                if (e.assets && e.assets.js) return t = e.assets.js, !0;
            })), !t) throw new K.a("Player url is not found", "PLAYER_URL_IS_NOT_FOUND");
            return t;
        }
        getThrottleSigFn(e) {
            if (o.a.isFirefox) return !1;
            let t = e.throttleSigFn;
            if ("function" != typeof t && e.nSigCode) {
                const r = this.html5SigDecipher.throttleSigDecipher.buildEvalSignatureFn(e.nSigCode);
                t = e => {
                    try {
                        return r(e);
                    } catch (e) {
                        ar.error("Use throttle signature error: %o", e);
                    }
                    return null;
                }, e.throttleSigFn = t;
            }
            return t;
        }
    };
    function xr(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), r.push.apply(r, n);
        }
        return r;
    }
    function Sr(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? xr(Object(r), !0).forEach((function(t) {
                E(e, t, r[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : xr(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            }));
        }
        return e;
    }
    class Tr {
        constructor(e) {
            e && (this.captionTracks = e.player_response.captions.playerCaptionsTracklistRenderer.captionTracks);
        }
        extract() {
            try {
                const e = [];
                for (let t = 0; t < this.captionTracks.length; t++) {
                    const r = this.captionTracks[t], n = this.extractFormats();
                    e.push(Sr(Sr({}, r), {}, {
                        formats: n
                    }));
                }
                return e;
            } catch (e) {
                return console.error(e), [];
            }
        }
        async downloadFormat(e, t, r) {
            const n = await this.requestSubtitle(t), o = this.xmlToType(r.type, n), i = new Blob([ o ], {
                type: r.fileType
            }), s = URL.createObjectURL(i), a = document.createElement("a");
            a.href = s, a.download = e, a.click(), URL.revokeObjectURL(s);
        }
        requestSubtitle(e) {
            return new Promise((t, r) => {
                Object(J.a)({
                    url: e.baseUrl,
                    xml: !0
                }, (function(e, n, o) {
                    e && r(e), n && o || r("no resp or xml"), t(o);
                }));
            });
        }
        extractFormats() {
            return [ {
                type: "vtt",
                fileType: "text/vtt"
            }, {
                type: "srt",
                fileType: "text/x-subrip"
            }, {
                type: "txt",
                fileType: "text/plain"
            }, {
                type: "sbv",
                fileType: "text/plain"
            }, {
                type: "ssa",
                fileType: "text/x-ssa"
            } ];
        }
        xmlToType(e, t) {
            switch (e) {
              case "vtt":
                return this.xmlToVtt(t);

              case "srt":
                return this.xmlToSrt(t);

              case "txt":
                return this.xmlToTxt(t);

              case "sbv":
                return this.xmlToSbv(t);

              case "ssa":
                return this.xmlToSsa(t);

              default:
                return this.xmlToTxt(t);
            }
        }
        xmlToVtt(e) {
            function t(e) {
                const t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), n = Math.floor(e % 60), o = Math.round(e % 1 * 1e3);
                return (t > 0 ? t + ":" : "") + String(r).padStart(2, "0") + ":" + String(n).padStart(2, "0") + "." + String(o).padStart(3, "0");
            }
            const r = this.parseXmlCues(e);
            let n = "WEBVTT\n\n";
            for (let e = 0; e < r.length; e++) {
                const o = r[e], {start: i, duration: s} = this.parseXmlCueAttributes(o), a = o.textContent;
                if (!i || !s) continue;
                n += `${t(i)} --\x3e ${t(i + s)}\n${a}\n\n`;
            }
            return n;
        }
        xmlToSrt(e) {
            function t(e) {
                const t = Math.floor(e / 3600), r = Math.floor(e % 3600 / 60), n = Math.floor(e % 60), o = Math.round(e % 1 * 1e3);
                return String(t).padStart(2, "0") + ":" + String(r).padStart(2, "0") + ":" + String(n).padStart(2, "0") + "," + String(o).padStart(3, "0");
            }
            const r = this.parseXmlCues(e);
            let n = "";
            for (let e = 0; e < r.length; e++) {
                const o = r[e], {start: i, duration: s} = this.parseXmlCueAttributes(o), a = o.textContent;
                if (!i || !s) continue;
                n += `${e + 1}\n${t(i)} --\x3e ${t(i + s)}\n${a}\n\n`;
            }
            return n;
        }
        xmlToTxt(e) {
            const t = this.parseXmlCues(e);
            let r = "";
            for (let e = 0; e < t.length; e++) {
                const n = t[e].textContent;
                n && (r += n + "\n");
            }
            return r;
        }
        xmlToSbv(e) {
            function t(e) {
                const t = new Date(1e3 * e);
                return `${t.getUTCMinutes().toString().padStart(2, "0")}:${t.getUTCSeconds().toString().padStart(2, "0")}.${t.getMilliseconds().toString().padStart(3, "0")}`;
            }
            const r = this.parseXmlCues(e);
            let n = "";
            for (let e = 0; e < r.length; e++) {
                const o = r[e], {start: i, duration: s} = this.parseXmlCueAttributes(o), a = o.textContent;
                if (!i || !s || !a) continue;
                n += `${t(i)},${t(i + s)}\n${a}\n\n`;
            }
            return n;
        }
        xmlToSsa(e) {
            function t(e) {
                const t = new Date(1e3 * e);
                return `${t.getUTCHours().toString().padStart(2, "0")}:${t.getUTCMinutes().toString().padStart(2, "0")}:${t.getUTCSeconds().toString().padStart(2, "0")}.${t.getMilliseconds().toString().padStart(3, "0")}`;
            }
            const r = this.parseXmlCues(e);
            let n = "";
            n += "[Script Info]\nTitle: Generated Subtitle\nScriptType: v4.00\nCollisions: Normal\nPlayDepth: 0\n\n", 
            n += "[Events]\nFormat: Marked, Start, End, Style, Name, MarginL, MarginR, MarginV, Effect, Text\n";
            for (let e = 0; e < r.length; e++) {
                const o = r[e], {start: i, duration: s} = this.parseXmlCueAttributes(o), a = o.textContent.replace(/\n/g, "\\N");
                n += `\nDialog: 0,${t(i)},${t(i + s)},Default,,0,0,0,,${a}\n`;
            }
            return n;
        }
        parseXmlCueAttributes(e) {
            const t = {
                start: this.parseCueStartAttribute(e),
                duration: this.parseCueDurationAttribute(e)
            }, r = e => {
                const t = Number(e);
                return !isNaN(t) && t % 1 != 0;
            };
            for (const e in t) r(t[e]) ? t[e] = parseFloat(t[e]) : t[e] = (n = parseInt(t[e]), 
            parseFloat((n / 1e3).toFixed(2)));
            var n;
            return t;
        }
        parseXmlCues(e) {
            let t = e.getElementsByTagName("text");
            return t.length || (t = e.getElementsByTagName("p")), t;
        }
        parseCueStartAttribute(e) {
            let t = e.getAttribute("start");
            return t || (t = e.getAttribute("t")), t;
        }
        parseCueDurationAttribute(e) {
            let t = e.getAttribute("dur");
            return t || (t = e.getAttribute("d")), t;
        }
    }
    function Ar(e, t) {
        var r = Object.keys(e);
        if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t && (n = n.filter((function(t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
            }))), r.push.apply(r, n);
        }
        return r;
    }
    function Cr(e) {
        for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2 ? Ar(Object(r), !0).forEach((function(t) {
                E(e, t, r[t]);
            })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : Ar(Object(r)).forEach((function(t) {
                Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
            }));
        }
        return e;
    }
    const Rr = Object(s.a)("youtube_embed").t, Pr = r(8);
    function Lr(e, t) {
        const r = {
            144: 144,
            240: 240,
            360: 360,
            480: 480,
            720: 720,
            1080: 1080,
            1440: 1440,
            "4K": 2160,
            "5K": 2880,
            "8K": 4320
        };
        let n;
        const o = Math.max(e, t);
        e = Math.min(e, t);
        for (let t in r) {
            const i = r[t];
            if (!(o >= Math.floor(16 * i / 9) || e >= i)) return n;
            n = t;
        }
        return n;
    }
    function Ir(e) {
        return /ratebypass/.test(e) || (/\?/.test(e) ? e += "&ratebypass=yes" : (/\/$/.test(e) || (e += "/"), 
        e += "ratebypass/yes/")), e;
    }
    const jr = /(\/s\/([^\/]+))/;
    const Ur = /\/sp\/([^\/]+)/;
    var Nr = class {
        constructor(e) {
            this._lastSignature = null, this.html5SigDecipher = new Ct, this.ytMetadata = new _r, 
            this.innertubeClient = new nr, this.engine = e;
        }
        getYoutubeLinks(e, t) {
            const r = this;
            function n(n, o, i, s) {
                r.addMuxerLinks(n, o), r.addProLinks(n, e.extVideoId), r.addTelevzrLinks(n, e.extVideoId);
                const a = {
                    action: e.action,
                    extVideoId: e.extVideoId,
                    links: n,
                    title: o,
                    subtitles: i,
                    duration: s,
                    checkLinks: null
                };
                return e.checkLinks && n ? r.checkYoutubeLinks(n, (function(e, r) {
                    return a.checkLinks = r, t(a);
                })) : t(a);
            }
            return r._getYoutubeLinks(e.url, e.extVideoId, e.checkSubtitles, e.noDash).then((function(e) {
                n(e.links, e.title, e.subtitles, e.duration);
            }), (function(e) {
                Rr.error("_getYoutubeLinks error: %O", e), n(null, "", null, "");
            })), !0;
        }
        _getYoutubeLinks(e, t, r, n) {
            const o = this;
            return this.ytMetadata.getMetadata(t, e).then((function(e) {
                let {videoInfo: i, signature: s} = e;
                return o.onGetConfig(t, r, n, i, s);
            }));
        }
        readFmt(e, t, r, n) {
            const o = this, i = e.meta;
            t.forEach((function(t) {
                if (t.stream) return void (i.hasStream = 1);
                let s = t.url;
                if (!s) return;
                if (!/([?&])s(ig(nature)?)?=/i.test(s)) if (t.sig) s += "&sig=" + t.sig; else if (t.signature) s += "&signature=" + t.signature; else if (t.s) {
                    s += `&${t.sp || "signature"}=` + o.html5SigDecipher.applyActions(r.actionList, t.s);
                }
                s = s.replace(/\\u0026/gi, "&");
                let a = t.itag;
                if (!a) {
                    const e = /(?:[?&])itag=(\d+)/i.exec(s);
                    e && (a = e[1]);
                }
                if (!a || e[a]) return;
                /[?&]itag=/i.test(s) || (s += "&itag=" + a), s = Ir(s);
                let c = i[a];
                if (c || (c = i[a] = {}), t.fps && (c.fps = t.fps), t.size && /^\d+x\d+$/.test(t.size)) {
                    const e = t.size.split("x");
                    c.quality = Lr(e[0], e[1]);
                }
                if (t.bitrate && (c.bitrate = parseInt(t.bitrate)), t.type) {
                    c.type = t.type;
                    const e = t.type.match(/codecs="([^"]+)"/);
                    e && (c.codecs = e[1]);
                }
                t.projection_type && (c.projectionType = parseInt(t.projection_type)), e[a] || (e[a] = s + n);
            }));
        }
        _readPlayerResponse(e, t, r) {
            const n = e => {
                e.type && /audio\/mp4/.test(e.type) && (t.multiLang || (t.multiLang = {
                    audioDefault: null,
                    variants: {}
                }), e.audioTrack && (t.multiLang.variants[e.audioTrack.id] = e, e.audioTrack.audioIsDefault && (t.multiLang.audioDefault = e))), 
                t[e.itag] || (t[e.itag] = e.url, t.meta[e.itag] = e);
            };
            e.streamingData && (Array.isArray(e.streamingData.formats) && e.streamingData.formats.forEach(t => {
                const o = this._readPlayerResponseFormat(t, r, e, "streamingData.formats");
                o && n(o);
            }), Array.isArray(e.streamingData.adaptiveFormats) && e.streamingData.adaptiveFormats.forEach(t => {
                const o = this._readPlayerResponseFormat(t, r, e, "streamingData.adaptiveFormats");
                o && n(o);
            })), t && t.multiLang && t.multiLang.variants && 0 === Object.keys(t.multiLang.variants).length && (t.multiLang = null);
        }
        _readPlayerResponseFormat(e, t, r, n) {
            if (e.cipher || e.signatureCipher) {
                const {sp: r, s: n, url: o} = Pr.parse(e.cipher || e.signatureCipher), i = this.html5SigDecipher.applyActions(t.actionList, n);
                e.url = o + (/\?/.test(o) ? "&" : "?") + r + "=" + encodeURIComponent(i);
            }
            const o = /[?&]n=([^&]+)/i.exec(e.url);
            if (o) {
                const r = o[1], n = decodeURIComponent(r), i = this.ytMetadata.getThrottleSigFn(t);
                if (i) {
                    const t = i(n);
                    t && (e.url = e.url.replace("n=" + r, "n=" + encodeURIComponent(t)));
                }
            }
            const i = {
                source: n
            }, s = "" + e.itag;
            i.itag = s, i.url = e.url, e.audioTrack && (i.audioTrack = e.audioTrack), e.fps ? i.fps = parseFloat(e.fps) : i.noFps = !0, 
            e.width && e.height ? (i.quality = Lr(e.width, e.height), i.width = e.width, i.height = e.height) : i.noWidthHeight = !0, 
            i.bitrate = e.bitrate, i.type = e.mimeType;
            const a = /codecs="([^"]+)"/.exec(e.mimeType);
            if (a) {
                const e = a[1].split(/,\s*/), t = e.some(e => /^mp4a/.test(e)), r = e.some(e => /^avc/.test(e));
                i.isBundle = t && r;
            }
            return i.acodec && !i.vcodec && (delete i.noWidthHeight, delete i.noFps), e.contentLength && (i.contentLength = parseInt(e.contentLength, 10)), 
            i;
        }
        ytPrepareVideoInfo(e) {
            return this.onGetConfig(e.videoId, e.checkSubtitles, e.noDash, e.config, e.signature).then(t => {
                Zt({
                    category: "links",
                    subcategory: "101",
                    event: "fallback"
                });
                const {links: r, title: n, subtitles: o} = t;
                return r && this.addProLinks(r, e.videoId), r && this.addTelevzrLinks(r, e.videoId), 
                this.addMuxerLinks(r, n), {
                    links: r,
                    title: n,
                    multiLang: r && r.multiLang,
                    subtitles: o
                };
            });
        }
        onGetConfig(e, t, r, n, o) {
            const i = this, {videoDetails: s = {}, playabilityStatus: a = {}} = n.player_response;
            let c = {
                meta: {}
            }, u = "", l = null, f = "", p = null;
            return Object(be.a)((function() {
                f = s.lengthSeconds || n.length_seconds || "", u = s.title || n.title || "";
                let e = "";
                u && (u = u.replace(/\+/g, " "), e = "&title=" + encodeURIComponent(ze.modify(u)));
                let t = n.fmt_url_map || n.url_encoded_fmt_stream_map || [], r = n.adaptive_fmts || [];
                const l = a.liveStreamability;
                (l && l.liveStreamabilityRenderer && !l.liveStreamabilityRenderer.displayEndscreen || n.livestream || n.live_playback) && (c.meta.hasStream = 1), 
                i._readPlayerResponse(n.player_response, c, o), t && i.readFmt(c, t, o, e), r && i.readFmt(c, r, o, e), 
                p = n.dashmpd || "", p && -1 !== p.indexOf("yt_live_broadcast") && (p = null);
            })).then((function() {
                let e = Promise.resolve();
                return e = e.then((function() {
                    return new Promise((function(e) {
                        i.getYoutubeSubtitles(n, (function(t) {
                            l = t || [], e();
                        }));
                    })).catch((function(e) {
                        Rr.error("Get subtitles error: %O", e);
                    }));
                })), !r && p && (e = e.then((function() {
                    let e = p;
                    const t = function(e) {
                        const t = Ur.exec(e);
                        if (t) return t[1];
                    }(p) || "signature", r = function(e) {
                        const t = jr.exec(e);
                        if (t) return {
                            fragment: t[1],
                            signature: t[2]
                        };
                    }(p);
                    if (r) {
                        const n = i.html5SigDecipher.applyActions(o.actionList, r.signature);
                        e = p.replace(r.fragment, `/${t}/` + n);
                    }
                    return e = e.replace("/sig/", "/signature/"), i.getYouTubeDashLinks(c, e).catch((function(e) {
                        Rr.error("Get dash error: %O", e);
                    }));
                }))), e;
            })).then((function() {
                let e = Object.keys(c).length;
                return c.meta && !c.meta.hasStream && e--, e || (c = null), {
                    links: c,
                    title: u,
                    subtitles: l,
                    duration: f
                };
            }));
        }
        addProLinks(e, t) {
            if (!(e && e.meta && this.engine.preferences && this.engine.preferences.proEnabled)) return;
            const r = [ "1080", "2160", "4K" ];
            Object.keys(e.meta).forEach(n => {
                const o = e.meta[n];
                if ("string" == typeof o || !r.includes(o.quality)) return;
                let i = String(o.quality).toUpperCase();
                "4K" === o.quality && (i = o.height);
                const s = "pro" + o.quality;
                e.meta[s] = {
                    quality: i,
                    height: o.height,
                    itag: "pro",
                    format: "MP4",
                    type: "video",
                    url: "https://www.youtube.com/watch?v=" + encodeURIComponent(t)
                };
            }), e.meta.proMp3 = {
                quality: "mp3",
                itag: "pro",
                noVideo: !0,
                format: "Audio",
                type: "audio",
                url: "https://www.youtube.com/watch?v=" + encodeURIComponent(t)
            };
        }
        addTelevzrLinks(e, t) {
            const r = this.engine.preferences && this.engine.preferences.proEnabled;
            !e || e.meta && e.meta.hasStream || r || (e.televzr = "televzr://www.youtube.com/watch?v=" + t);
        }
        addMuxerLinks(e, t) {
            if (!e || !e.meta || e.meta.hasStream || !this.engine.preferences.ffmpegEnabled) return;
            let r = null, n = null, o = null;
            Object.keys(e.meta).forEach(t => {
                const i = e.meta[t];
                i && (i.isBundle ? (!r || i.height > r) && (r = i.height) : /audio\/mp4/.test(i.type) ? (!o || i.bitrate > o.bitrate) && (o = i, 
                i.isAudioLink = !0) : /video\/mp4/.test(i.type) && i.height > 360 && i.height <= 720 && (!n || i.height > n.height || i.bitrate > n.bitrate || i.fps > n.fps) && (n = i));
            }), n && o && (e.meta.muxer = {
                quality: n.quality,
                width: n.width,
                height: n.height,
                fps: n.fps,
                format: "MP4",
                mmProps: {
                    sources: [ {
                        url: n.url,
                        format: "mp4"
                    }, {
                        url: o.url,
                        format: "m4a"
                    } ],
                    filename: t + ".mp4",
                    format: "mp4"
                }
            }), Object.keys(e.meta).forEach(t => {
                const r = e.meta[t];
                /video\/mp4/.test(r.type) && (r.isVideoLink = !0);
            });
        }
        checkYoutubeLinks(e, t) {
            const r = [ "18", "34", "35" ];
            let n = "";
            for (let t = 0; t < r.length; t++) if (e[r[t]]) {
                n = e[r[t]];
                break;
            }
            n ? Object(J.a)({
                type: "HEAD",
                url: n
            }, (function(e, r) {
                t(n, !e);
            })) : t();
        }
        convertVtt2Srt(e, t) {
            Object(J.a)({
                url: e.url
            }, (function(r, n, o) {
                if (r || !o) return Rr.error("Request error!", r), t();
                const i = /(\d{2}:\d{2}:\d{2})\.(\d{3})/g, s = /^\d{2}:\d{2}:\d{2}\.\d{3}/, a = o.split("\n\n");
                s.test(a[0]) || a.shift(), s.test(a[a.length - 1]) || a.pop();
                let c = !1, u = a.filter((function(e) {
                    const t = s.test(e);
                    return t || (c = !0), t;
                })).map((function(e, t) {
                    return t + 1 + "\n" + (e = e.replace(i, "$1,$2"));
                }));
                if (u = u.join("\n\n"), c) return t();
                e.srt = u, e.preprocess = "srt2url", t();
            }));
        }
        getYoutubeSubtitles(e, t) {
            t(new Tr(e).extract());
        }
        getYouTubeDashLinks(e, t) {
            const r = this, n = {};
            return (o.a.isChromeMobile || o.a.isFirefoxMobile) && (n["User-Agent"] = Xe()), 
            (i = {
                url: t,
                headers: n,
                xml: !0
            }, new Promise((e, t) => {
                Object(J.a)(i, (r, n, o) => {
                    r && "string" == typeof r && (r = new Error(r)), r ? t(r) : e(o);
                });
            })).then((function(t) {
                r.parseDash(t, e);
            }));
            var i;
        }
        parseDash(e, t) {
            const r = e.querySelectorAll("Representation"), n = t.meta = t.meta || {};
            for (let e, o = 0; e = r[o]; o++) {
                const r = e.querySelector("BaseURL");
                let o = r.textContent;
                if (!o) continue;
                const i = r.parentNode.querySelector("SegmentURL"), s = i && i.getAttribute("media");
                if (s && 0 === s.indexOf("sq/")) continue;
                const a = e.getAttribute("id");
                let c = n[a];
                c || (c = n[a] = {}), o = Ir(o);
                const u = e.getAttribute("frameRate");
                u && (c.fps = u);
                const l = e.getAttribute("width"), f = e.getAttribute("height");
                l && f && (c.quality = Lr(l, f));
                const p = e.getAttribute("codecs");
                if (p) {
                    c.codecs = p;
                    let e = o.match(/mime=([^&]+)/);
                    e = e && e[1], e && (c.type = e);
                }
                t[a] || (t[a] = o);
            }
        }
        getYoutubeIdListFromPlaylist(e, t) {
            return this.getIdListFromList(e.baseUrl || "https://www.youtube.com", e.listId, t), 
            !0;
        }
        getIdListFromList(e, t, r) {
            const n = function(e) {
                if (!e) return;
                let t = e.match(/data-uix-load-more-href="([^"]+)"/);
                return t && (t = t[1]), t || void 0;
            }, o = function(e, t, r) {
                const n = function(e) {
                    const t = e.match(/<h1[^>]+>([^<]+)<\/h1>/);
                    if (t) return t[1].replace(/\r?\n/g, " ").trim();
                }(t[0]), o = {}, i = [], s = /href="\/watch\?([^"]+)"/g;
                let a = 0;
                for (let r = 0, n = t.length; r < n; r++) {
                    t[r].replace(s, (function(t, r) {
                        const n = Ge(r, {
                            params: !0,
                            sep: "&amp;"
                        });
                        n.list === e && (n.index = parseInt(n.index), o[n.index] = n.v, n.index > a && (a = n.index));
                    }));
                }
                for (let e = 0; e <= a; e++) void 0 !== o[e] && -1 === i.indexOf(o[e]) && i.push(o[e]);
                r({
                    idList: i,
                    title: n
                });
            }, i = function(e) {
                let t = null;
                const r = e.match(/"nextContinuationData":({[^}]+})/);
                if (r) try {
                    const e = JSON.parse(r[1]);
                    t = "/browse_ajax?" + Pr.stringify({
                        ctoken: e.continuation,
                        itct: e.clickTrackingParams
                    });
                } catch (e) {
                    Rr.debug("getNewNextPageUrl error: %O", e);
                }
                return t;
            }, s = function(e, t) {
                const r = function(e) {
                    Array.isArray(e) && e.forEach((function(e) {
                        const r = e.playlistVideoRenderer, n = r && r.videoId;
                        n && t.push(n);
                    }));
                };
                let n = e.indexOf('{"playlistVideoListRenderer":{');
                -1 !== n ? (e = e.substr(n), Ve(e).forEach((function(e) {
                    const t = e.playlistVideoListRenderer, n = t && t.contents;
                    r(n);
                }))) : (n = e.indexOf('{"playlistVideoListContinuation":{'), -1 !== n && (e = e.substr(n), 
                Ve(e).forEach((function(e) {
                    const t = e.playlistVideoListContinuation, n = t && t.contents;
                    r(n);
                }))));
            };
            return Object(J.a)({
                url: e + "/playlist?list=" + t
            }, (function(a, c, u) {
                if (a) return r();
                let l = null;
                if (/"playlistVideoListRenderer"/.test(u)) {
                    const t = function(e) {
                        const t = {};
                        let r = null;
                        const n = /ytcfg\.set\(({.+)/.exec(e);
                        return n && De(n[1]).some((function(e) {
                            if (e.INNERTUBE_CONTEXT_CLIENT_NAME) return r = e, !0;
                        })), r && (t["x-youtube-client-name"] = r.INNERTUBE_CONTEXT_CLIENT_NAME, t["x-youtube-client-version"] = r.INNERTUBE_CONTEXT_CLIENT_VERSION, 
                        r.ID_TOKEN && (t["x-youtube-identity-token"] = r.ID_TOKEN)), t;
                    }(u), n = function(e) {
                        let t = "unknown", r = null;
                        const n = e.match(/"playlistSidebarPrimaryInfoRenderer":({.+)/);
                        if (n && De(n[1]).some((function(e) {
                            if (e.title && e.title.runs) return r = e, !0;
                        })), !t || "unknown" === t) {
                            const r = e.match(/"titleForm":({.+)/);
                            r && De(r[1]).some(e => {
                                if (e.inlineFormRenderer && e.inlineFormRenderer.textDisplayed && e.inlineFormRenderer.textDisplayed.simpleText) return t = e.inlineFormRenderer.textDisplayed.simpleText, 
                                !0;
                            });
                        }
                        if (r) try {
                            r.title.runs.some((function(e) {
                                if (e.text) return t = e.text;
                            }));
                        } catch (e) {
                            Rr.debug("getNewTitle error: %O", e);
                        }
                        return t;
                    }(u), o = [];
                    s(u, o), l = i(u), l ? function e(t, r, n, o, a) {
                        Object(J.a)({
                            url: t + r,
                            headers: n,
                            json: !0
                        }, (function(r, c, u) {
                            if (r) return Rr.error("YT next page request error! %O", r), a();
                            const l = JSON.stringify(u), f = i(l);
                            s(l, o), f ? e(t, f, n, o, a) : a();
                        }));
                    }(e, l, t, o, (function() {
                        r({
                            idList: o,
                            title: n
                        });
                    })) : r({
                        idList: o,
                        title: n
                    });
                } else l = n(u), l ? function e(t, r, o, i) {
                    o || (o = []), Object(J.a)({
                        url: t + r,
                        json: !0
                    }, (function(r, s, a) {
                        if (r || !a) return i(o);
                        o.push(a.content_html);
                        const c = n(a.load_more_widget_html);
                        if (void 0 === c) return i(o);
                        e(t, c, o, i);
                    }));
                }(e, l, [ u ], (function(e) {
                    o(t, e, r);
                })) : o(t, [ u ], r);
            }));
        }
        getYoutubeLinksFromConfig(e, t) {
            const r = e.url, n = this;
            return Object(be.a)(() => {
                const o = e.config, i = o.args.video_id;
                if (!o || !o.args) throw new Error("jsonList args is not found!");
                return this.innertubeClient.fetchClientRequest("android_vr", {
                    videoId: i,
                    url: r
                }).then(e => {
                    if (403 === e.status) throw new Error("Forbidden");
                    return e.json();
                }).then(r => {
                    if (r && r.playabilityStatus && "This video is unavailable" === r.playabilityStatus.reason) throw new Error("video unavailable");
                    if (r && r.videoDetails && r.videoDetails.videoId !== i) throw new Error("TRY_IOS");
                    if (r && r.playabilityStatus && "LOGIN_REQUIRED" === r.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                    const o = {
                        player_response: r
                    };
                    return n.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, null).then(r => {
                        Zt({
                            category: "links",
                            subcategory: "101",
                            event: "main"
                        });
                        const {title: o, links: i, subtitles: s} = r;
                        i && n.addProLinks(i, e.extVideoId), i && n.addTelevzrLinks(i, e.extVideoId), n.addMuxerLinks(i, o), 
                        t({
                            links: i,
                            title: o,
                            subtitles: s
                        });
                    });
                }).catch(r => {
                    if ("TRY_IOS" === r.message || "LOGIN_REQUIRED" === r.message) return n.getYoutubeLinksFromConfigIos(e, t);
                    const i = o.args, s = o.playerUrl;
                    return this.ytMetadata.getInfoFromVideoInfo(Cr(Cr({}, i), {}, {
                        visitorData: this.visitorData
                    }), s).then(r => {
                        let {videoInfo: o, signature: i} = r;
                        return n.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, i).then(r => {
                            Zt({
                                category: "links",
                                subcategory: "101",
                                event: "fallback"
                            });
                            const {links: o, title: i, subtitles: s} = r;
                            o && n.addProLinks(o, e.extVideoId), o && n.addTelevzrLinks(o, e.extVideoId), n.addMuxerLinks(o, i), 
                            t({
                                links: o,
                                title: i,
                                multiLang: o.multiLang,
                                subtitles: s
                            });
                        });
                    }).catch(r => (Rr.warn("Skip getYoutubeLinksFromConfig, cause %O", r), Zt({
                        category: "links",
                        subcategory: "101",
                        event: "fail"
                    }), n.getYoutubeLinks(e, t)));
                });
            }), !0;
        }
        getYoutubeLinksFromConfigIos(e, t) {
            const r = this, n = e.url;
            return Object(be.a)(() => {
                const o = e.config, i = o.args.video_id;
                if (!o || !o.args) throw new Error("jsonList args is not found!");
                return this.innertubeClient.fetchClientRequest("ios", {
                    videoId: i,
                    url: n
                }).then(e => {
                    if (403 === e.status) throw new Error("Forbidden");
                    return e.json();
                }).then(n => {
                    if (n && n.playabilityStatus && "LOGIN_REQUIRED" === n.playabilityStatus.status) throw new Error("LOGIN_REQUIRED");
                    const o = {
                        player_response: n
                    };
                    return r.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, null).then(n => {
                        Zt({
                            category: "links",
                            subcategory: "101",
                            event: "main"
                        });
                        const {title: o, links: i, subtitles: s} = n;
                        i && r.addProLinks(i, e.extVideoId), i && r.addTelevzrLinks(i, e.extVideoId), r.addMuxerLinks(i, o), 
                        t({
                            links: i,
                            title: o,
                            subtitles: s
                        });
                    });
                }).catch(n => {
                    const i = o.args, s = o.playerUrl;
                    return this.ytMetadata.getInfoFromVideoInfo(i, s).then(n => {
                        let {videoInfo: o, signature: i} = n;
                        return r.onGetConfig(e.extVideoId, e.checkSubtitles, e.noDash, o, i).then(n => {
                            Zt({
                                category: "links",
                                subcategory: "101",
                                event: "fallback"
                            });
                            const {links: o, title: i, subtitles: s} = n;
                            o && r.addProLinks(o, e.extVideoId), o && r.addTelevzrLinks(o, e.extVideoId), r.addMuxerLinks(o, i), 
                            t({
                                links: o,
                                title: i,
                                multiLang: o.multiLang,
                                subtitles: s
                            });
                        });
                    }).catch(n => (Rr.warn("Skip getYoutubeLinksFromConfig, cause %O", n), Zt({
                        category: "links",
                        subcategory: "101",
                        event: "fail"
                    }), r.getYoutubeLinks(e, t)));
                });
            }), !0;
        }
    };
    const Mr = [ "type" ], Fr = r(8), Dr = Object(s.a)("background"), Br = {};
    var qr, Vr, $r, Hr, Gr, Yr, Wr, zr, Xr, Jr;
    Br.isReady = !1, Br.readyHandler = null, Br.readyPromise = new Promise(e => Br.readyHandler = e).then(() => Br.isReady = !0), 
    Br.authService = new class {
        constructor() {
            this.credentionalsToken = null, this.refreshTimeout = null, this.init();
        }
        init() {
            this.client = new se.a({
                clientId: atob("aGVscGVyLnBybw"),
                clientSecret: atob("RTkyRkQ2RTM5RTM1RDUzQUQ5NkMwNzVDQjBFQzFCMEU4NkI0M0UwQzY3OTAzRDhBNjk5NDVCQkY1QUU0RjkxMA"),
                accessTokenUri: xe + "/token",
                authorizationUri: xe + "/auth",
                redirectUri: "https://sf-helper.net/callback.php",
                scopes: [ "profile" ]
            }, (e, t, r, n) => Object(i.a)({
                url: t,
                method: e,
                data: r,
                headers: n
            }).then(e => ({
                status: e.statusCode,
                body: e.body
            }))), this.loadTokenFromStorage().then(e => {
                this.credentionalsToken = e, this.initRefreshTimeout();
            }).catch(e => {
                _e.info("Get token from storage error", e);
            });
        }
        initRefreshTimeout() {
            if (!this.credentionalsToken) return;
            clearTimeout(this.refreshTimeout);
            const e = 1e3 * this.credentionalsToken.data.expires_in;
            this.refreshTimeout = setTimeout(() => {
                _e.log("Refresh token"), this.refresh(this.credentionalsToken).then(e => {
                    this.credentionalsToken = e, this.initRefreshTimeout();
                }, e => (_e.error("refreshTimeout error", e), this.logout()));
            }, e);
        }
        loadTokenFromStorage() {
            return _e.log("loadTokenFromStorage call"), ce().then(e => {
                const t = Math.trunc((e.expiry_date - (new Date).getTime()) / 1e3);
                return this.client.createToken(Oe(Oe({}, e), {}, {
                    expires_in: t
                }));
            });
        }
        handleAuthCallback(e) {
            return this.client.code.getToken(e).then(e => (this.credentionalsToken = e, ae(e))).then(() => this.userInfoRequest(this.credentionalsToken)).then(e => Object(H.a)({
                userInfo: e
            })).then(() => this.initRefreshTimeout()).catch(e => {
                _e.error("Auth error", e);
            });
        }
        revokeToken() {
            return Object(be.a)(() => {
                const e = this.credentionalsToken;
                if (e && e.refreshToken) {
                    const t = "https://oauth2.televzr.com/revoke?" + ke.stringify({
                        token: e.refreshToken
                    });
                    return Object(i.a)(t);
                }
            }).then(() => {
                this.credentionalsToken = null;
            }).catch(e => {
                "CREDENTIALS_IS_EMPTY" === e.code || _e.error("revokeToken error", e);
            });
        }
        async refresh(e) {
            const t = await e.refresh();
            return await ae(t), t;
        }
        getQuickCodeRequest() {
            return _e.log("quickCodeRequest call"), Object(be.a)(() => this.credentionalsToken && this.credentionalsToken.data ? this.credentionalsToken : this.loadTokenFromStorage()).then(e => Object(i.a)({
                url: "https://oauth2.televzr.com/v1/quickCode?" + ke.stringify({
                    access_token: e.data.access_token
                }),
                json: !0
            }).then(e => {
                if (!e.body.ok) throw new Error("Failed to get quick code");
                return e.body.result;
            }), e => {
                throw _e.error("loadToken error", e), e;
            });
        }
        userInfoRequest(e) {
            const {url: t, headers: r} = e.sign({
                url: xe + "/v1/userinfo",
                headers: void 0
            });
            return Object(i.a)({
                url: t,
                headers: r,
                json: !0
            }).then(e => {
                if (e.body.error) throw new Error(e.body.error);
                if (e.body && e.body.result) return e.body.result;
            });
        }
        refreshUserInfo() {
            if (!this.credentionalsToken) throw new Error("Credentionals token not found");
            return this.userInfoRequest(this.credentionalsToken).then(e => Object(H.a)({
                userInfo: e
            }));
        }
        logout() {
            return ve([ "credentials", "userInfo" ]).then(() => this.revokeToken()).then(...we(() => Object(i.a)({
                url: "https://oauth2.televzr.com/logout",
                method: "POST"
            })));
        }
        isAuth() {
            return Object($.a)([ "userInfo", "credentials" ]).then(e => Boolean(e.userInfo) && Boolean(e.credentials));
        }
        getLoginUrl() {
            return this.client.code.getUri({
                state: ke.stringify({
                    sessionId: ye()
                })
            });
        }
        bindRemoteFunctions() {
            return {
                handleAuthCallback: this.handleAuthCallback.bind(this),
                logout: this.logout.bind(this),
                getLoginUrl: this.getLoginUrl.bind(this),
                isAuth: this.isAuth.bind(this),
                refreshUserInfo: this.refreshUserInfo.bind(this)
            };
        }
    }, Br.utils = bt(Br), Br.modules = {}, Br.modules.vimeo = new Et(Br), Br.modules.dailymotion = new Me(Br), 
    Br.modules.youtube = new Nr(Br), Br.modules.soundcloud = new class {
        constructor(e) {
            this.engine = e;
        }
        async soundcloudFetchPageInfo(e) {
            let {clientId: t, songEndpoint: r, retry: n = 3} = e;
            try {
                const e = "https://api-widget.soundcloud.com/resolve?" + ft.a.stringify({
                    client_id: t,
                    url: r,
                    format: "json"
                });
                return (await Object(i.a)({
                    url: e,
                    json: !0
                })).body;
            } catch (e) {
                if (pt.error("FetchPageInfoError", e), n) return n--, this.soundcloudFetchPageInfo({
                    clientId: t,
                    songEndpoint: r,
                    retry: n
                });
                throw e;
            }
        }
        async soundcloudFetchSongsOfPlaylist(e) {
            let {clientID: t, playlist: r} = e;
            const n = r.tracks.map(e => e.id), o = [], s = [];
            if (n.length >= 30) for (let e = 0; e < n.length; e += 30) o.push(n.slice(e, e + 30)); else o.push(n);
            for (let e of o) {
                const r = `https://api-v2.soundcloud.com/tracks?ids=${e.join(",")}&client_id=${t}`, n = await Object(i.a)({
                    url: r,
                    json: !0
                });
                s.push(...n.body);
            }
            return s;
        }
        async soundcloudSearchBestDownloadURL(e) {
            let {song: t, clientID: r} = e;
            if (!t.media || !t.media.transcodings || !t.media.transcodings.length) return;
            const {transcodings: n} = t.media, o = await this._searchProgressiveTranscoding(r, n);
            return o || this._searchHlsTranscoding(r, n);
        }
        async _searchProgressiveTranscoding(e, t) {
            const r = t.find(e => "progressive" === e.format.protocol);
            if (!r) return;
            return (await Object(i.a)({
                url: r.url + "?client_id=" + e,
                json: !0
            })).body.url;
        }
        async _searchHlsTranscoding(e, t) {
            const r = t.find(e => "hls" === e.format.protocol), n = await Object(i.a)({
                url: r.url + "?client_id=" + e,
                json: !0
            }), o = (await Object(i.a)(n.body.url)).body;
            return new ut(o).download();
        }
    }(Br), Br.modules.matchTv = new class {
        constructor(e) {
            this.engine = e;
        }
        async matchTvFetchVideoSources(e) {
            let {iframeVideoURL: t} = e;
            try {
                const e = t.match(/\d+/), r = e && e[0];
                if (!r) return [];
                const n = `https://matchtv.ru/vdl/playlist/${encodeURIComponent(r)}/1.json`, o = (await Object(i.a)({
                    url: n,
                    json: !0
                })).body, s = [];
                for (let e = 0; e < o.length; e++) {
                    const t = o[e], r = (await Object(i.a)(t.src)).body.match(/^http.*?$/m);
                    r && s.push({
                        endpoint: r[0],
                        title: t.label
                    });
                }
                return s;
            } catch (e) {
                return He.error("get videos error", e), [];
            }
        }
    }(Br), Br.modules.vkontakte = new _t(Br), Br.modules.odnoklassniki = new Ke(Br), 
    Br.modules.facebook = new Be(Br), Br.modules.instagram = new qe(Br), Br.modules.mail_ru = new $e(Br), 
    Br.modules.showjet = new class {
        constructor(e) {
            this.engine = e;
        }
        async showjetFetchMovie(e) {
            let {iframeVideoURL: t} = e;
            const r = await Object(i.a)(t), n = st(r.body);
            let o;
            if (De(r.body).some(e => {
                if (e.hls) return o = e.hls, !0;
            }), !o) return [];
            const s = (await Object(i.a)(o)).body, a = o.split("/").slice(0, -1).join("/");
            let c = je(s, /RESOLUTION=(.*?),.*\n(.*?\.m3u8$)/gm);
            return c = c.map(e => ({
                filename: n.title,
                title: e[1],
                endpoint: a + "/" + e[2]
            })), c;
        }
    }(Br), Br.modules.yandex_music = new class {
        constructor(e) {}
        async extractLinks(e) {
            if ([ "playlist", "album", "artist" ].includes(e.pageType)) {
                const t = await this.fetchTrackIds(e);
                if ("playlist" === e.pageType) return t.playlist.trackIds;
                if ([ "album", "artist" ].includes(e.pageType)) return t.trackIds;
            } else try {
                const {trackInfo: t, base64: r} = await this.prepareTrack(e.mediaId);
                return {
                    base64: r,
                    filename: this.makeFilename(t)
                };
            } catch (e) {
                return console.error(e), [];
            }
        }
        async prepareTrack(e) {
            const t = await this.fetchTrack(e), r = await this.fetchFileInfo(e), n = await this.fetchFileLinkInfo(r), o = await this.fetchFile(n);
            return {
                trackInfo: t,
                base64: await this.processFile(o, t)
            };
        }
        async fetchTrackIds(e) {
            const t = new URLSearchParams;
            for (const r in e.initData) t.append(r, e.initData[r]);
            const r = await fetch(`https://music.yandex.ru/handlers/${e.pageType}.jsx?${t.toString()}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    priority: "u=1, i",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "none",
                    "sec-fetch-storage-access": "active",
                    "x-retpath-y": "https://music.yandex.ru/",
                    "access-control-allow-headers": "origin, content-type, accept",
                    "access-control-allow-origin": "*"
                }
            });
            if (!r.ok) throw new Error("Could not fetch playlist info");
            return await r.json();
        }
        async fetchTrack(e) {
            const t = await fetch("https://music.yandex.ru/handlers/track.jsx?track=" + e, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    priority: "u=1, i",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "none",
                    "sec-fetch-storage-access": "active",
                    "x-retpath-y": "https://music.yandex.ru/",
                    "access-control-allow-headers": "origin, content-type, accept",
                    "access-control-allow-origin": "*"
                }
            });
            if (!t.ok) throw new Error("Could not fetch track info");
            return await t.json();
        }
        async fetchFileInfo(e) {
            const t = await fetch(`https://music.yandex.ru/api/v2.1/handlers/track/${e}/web-album-track-track-main/download/m?hq=1&external-domain=music.yandex.ru&overembed=no&__t=${this.generateDateValue()}`, {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    priority: "u=1, i",
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "none",
                    "sec-fetch-storage-access": "active",
                    "x-retpath-y": "https://music.yandex.ru/"
                }
            });
            if (!t.ok) throw new Error("Could not fetch file info");
            return await t.json();
        }
        async fetchFileLinkInfo(e) {
            const t = await fetch(`https:${e.src}&format=json`, {
                method: "GET"
            });
            if (!t.ok) throw new Error("Could not fetch file link");
            return await t.json();
        }
        async fetchFile(e) {
            const t = `https://${e.host}/get-mp3/${e.s}/${e.ts}/${e.path}`, r = await fetch(t, {
                method: "GET",
                headers: {
                    "sec-fetch-dest": "empty",
                    "sec-fetch-mode": "cors",
                    "sec-fetch-site": "none",
                    "sec-fetch-storage-access": "active"
                }
            });
            if (!r.ok) throw new Error("Could not fetch file link");
            return await r.blob();
        }
        generateDateValue() {
            const e = new Date, t = new Date(e);
            return t.setMonth(t.getMonth() + 1), t.setTime(t.getTime() - 36e5), t.getTime();
        }
        makeFilename(e) {
            return `${e.track.artists.map(e => e.name).join(", ")} - ${e.track.title}.mp3`;
        }
        async processFile(e, t) {
            const r = await this.removeExistingID3Tags(e), n = await this.createID3Tags(t), o = new Blob([ n, r ], {
                type: "audio/mpeg"
            });
            return this.blobToBase64(o);
        }
        blobToBase64(e) {
            return new Promise(t => {
                const r = new FileReader;
                r.onloadend = () => t(r.result.split(",")[1]), r.readAsDataURL(e);
            });
        }
        async removeExistingID3Tags(e) {
            const t = await e.arrayBuffer(), r = new DataView(t);
            if (73 === r.getUint8(0) && 68 === r.getUint8(1) && 51 === r.getUint8(2)) {
                const e = 10 + (r.getUint8(6) << 21 | r.getUint8(7) << 14 | r.getUint8(8) << 7 | r.getUint8(9));
                return t.slice(e);
            }
            return t;
        }
        async createID3Tags(e) {
            const t = [];
            if (e.track.title && t.push(this.createTextFrame("TIT2", e.track.title)), e.track.artists.length && t.push(this.createTextFrame("TPE1", e.track.artists.map(e => e.name).join(" / "))), 
            e.track.albums.length) {
                t.push(this.createTextFrame("TALB", e.track.albums.map(e => e.name).join(" / ")));
                const r = e.track.albums[e.track.albums.length - 1].year;
                r && t.push(this.createTextFrame("TYER", r));
                const n = e.track.albums[e.track.albums.length - 1].genre;
                n && t.push(this.createTextFrame("TCON", n));
            }
            if (e.track.coverUri && !o.a.isChrome) try {
                const r = "https://" + e.track.coverUri.replace("%%", "50x50"), n = await this.createImageFrame(r);
                n && t.push(n);
            } catch (e) {
                console.warn("Failed to add cover image:", e);
            }
            const r = t.reduce((e, t) => e + t.byteLength, 0), n = new Uint8Array(10), i = new TextEncoder;
            n.set(i.encode("ID3")), n[3] = 4, n[4] = 0, n[5] = 0, n[6] = r >> 21 & 127, n[7] = r >> 14 & 127, 
            n[8] = r >> 7 & 127, n[9] = 127 & r;
            const s = new Uint8Array(10 + r);
            s.set(n, 0);
            let a = 10;
            return t.forEach(e => {
                s.set(e, a), a += e.byteLength;
            }), s;
        }
        createTextFrame(e, t) {
            const r = new TextEncoder, n = r.encode(t), o = 4 + n.byteLength + 1, i = new Uint8Array(10 + o);
            return i.set(r.encode(e), 0), i[4] = o >> 24 & 255, i[5] = o >> 16 & 255, i[6] = o >> 8 & 255, 
            i[7] = 255 & o, i[8] = 0, i[9] = 0, i[10] = 3, i[11] = 239, i[12] = 187, i[13] = 191, 
            i.set(n, 14), i[14 + n.byteLength] = 0, i;
        }
        async createImageFrame(e) {
            try {
                const t = await this.getImageBlob(e);
                if (!t) return null;
                const r = await t.arrayBuffer(), n = t.type, o = new Uint8Array(r), i = "Cover", s = new TextEncoder, a = 1 + s.encode(n).length + 1 + 1 + s.encode(i).length + 1 + o.length, c = new Uint8Array(10 + a);
                let u = 0;
                return c.set(s.encode("APIC"), u), u += 4, c[u++] = a >>> 24 & 255, c[u++] = a >>> 16 & 255, 
                c[u++] = a >>> 8 & 255, c[u++] = 255 & a, c[u++] = 0, c[u++] = 0, c[u++] = 3, c.set(s.encode(n), u), 
                u += n.length, c[u++] = 0, c[u++] = 3, c.set(s.encode(i), u), u += i.length, c[u++] = 0, 
                c.set(o, u), c;
            } catch (e) {
                return console.warn("Error creating image frame:", e), null;
            }
        }
        async getImageBlob(e) {
            return new Promise(t => {
                const r = new Image;
                r.crossOrigin = "Anonymous", r.onload = function() {
                    const e = document.createElement("canvas");
                    e.width = r.width, e.height = r.height;
                    const n = e.getContext("2d");
                    n && n.drawImage(r, 0, 0), e.toBlob(e => {
                        t(e);
                    }, "image/jpeg", .85);
                }, r.onerror = () => t(null), r.src = e, (r.complete || void 0 === r.complete) && (r.src = e + (e.includes("?") ? "&" : "?") + "t=" + Date.now());
            });
        }
    }(Br), Br.modules.tiktok = new ht(Br), o.a.remote = Object.assign(o.a.remote, {
        createRequest: et,
        sendRequest: tt,
        readRequestBodyChunk: rt,
        clearRequest: ot,
        clearRequestByPrefix: nt
    }, {
        televzr: te(Br),
        auth: Br.authService.bindRemoteFunctions()
    }), o.a.remote.getPreferences = () => Br.readyPromise.then(() => (setTimeout(() => {
        Br.userTrack(), Br.sendInGa.pull();
    }, 1), Br.preferences)), o.a.remote.downloadInFolder = e => {
        let {url: t, filename: r} = e;
        return chrome.downloads.download({
            url: t,
            filename: r
        });
    }, Br.varCache = {
        helperName: "",
        currentVersion: "10.51",
        isFirstrun: !1,
        isUpgrade: !1,
        uuid: ""
    }, Br.extra = {}, Br.defaultPreferences = {
        version: "0",
        button: 1,
        lmMediaHosting: 1,
        moduleYoutube: !0,
        moduleYandexMusic: 1,
        moduleDailymotion: 1,
        moduleVimeo: 1,
        moduleFacebook: 1,
        moduleMatchTv: 1,
        moduleSoundcloud: 1,
        moduleVkontakte: 1,
        moduleOdnoklassniki: 1,
        moduleMailru: 1,
        moduleInstagram: 1,
        moduleRutube: 1,
        moduleTiktok: 1,
        moduleTwitch: 1,
        moduleTwitter: 1,
        moduleShowDownloadInfo: 1,
        ytHideFLV: 0,
        ytHideMP4: 0,
        ytHideWebM: 1,
        ytHide3GP: 1,
        ytHide3D: 1,
        ytHideMP4NoAudio: 1,
        ytHideAudio_MP4: 1,
        vkShowBitrate: 0,
        showUmmyInfo: 1,
        showUmmyBtn: 1,
        gmNativeDownload: 0,
        advPreShow: 0,
        statEnabled: 1,
        ffmpegEnabled: 1,
        showUmmyLanding: 0,
        onceShowYtTutorial: 0,
        onceShowYtTooltip: 0,
        saveAsDialog: 0,
        sortDownloads: {
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
        },
        dataCollectionEnabled: !0
    }, Br.preferences = {
        aviaBarEnabled: !1,
        sfHelperName: "",
        country: "",
        downloads: void 0,
        ummyDetected: void 0,
        showUmmyItem: void 0,
        experiments: [],
        sendExporterEvent: void 0
    }, Br.preferenceMap = X, o.a.isGM || chrome.runtime.onInstalled.addListener(async e => {
        "update" === e.reason && Br.checkAndOpenProLanding(!0);
    }), Br.loader = ($r = function() {
        qr.slice(0).forEach((function(e) {
            if (e.nameList.every((function(e) {
                return -1 !== Vr.indexOf(e);
            }))) {
                var t = qr.indexOf(e);
                if (-1 !== t) {
                    qr.splice(t, 1);
                    try {
                        e.fn();
                    } catch (e) {
                        Dr.error("Run error!", e);
                    }
                }
            }
        }));
    }, {
        waitList: qr = [],
        readyList: Vr = [],
        ready: function(e) {
            Vr.push(e), $r();
        },
        when: function(e, t) {
            Array.isArray(e) || (e = [ e ]), qr.push({
                nameList: e,
                fn: t
            }), $r();
        }
    }), Br.events = (Gr = [].slice, Yr = function(e, t) {
        var r = Hr[e];
        Hr[e] || (r = Hr[e] = []), -1 === r.indexOf(t) && r.push(t);
    }, {
        listeners: Hr = {},
        emit: function(e, t) {
            var r = Gr.call(arguments).slice(1), n = Hr[e] || [];
            n.slice(0).forEach((function(e) {
                try {
                    e.apply(null, r);
                } catch (e) {
                    Dr.error("Emit error!", e);
                }
            }));
        },
        on: Yr,
        off: Wr = function(e, t) {
            var r = Hr[e] || [], n = r.indexOf(t);
            -1 !== n && r.splice(n, 1);
        },
        once: function(e, t) {
            Yr(e, (function() {
                Wr(e, t), t.apply(null, arguments);
            }));
        }
    }), Br.getHelperName = function() {
        const e = function() {
            let e = "";
            const t = navigator.userAgent;
            return -1 !== t.indexOf("YaBrowser/") ? e = "yabrowser" : -1 !== t.indexOf("Maxthon/") ? e = "maxthon" : -1 !== t.indexOf("OPR/") ? e = "opera-chromium" : -1 !== t.indexOf("Opera/") ? e = "opera" : -1 !== t.indexOf("Firefox/") ? e = "firefox" : -1 !== t.indexOf("Chrome/") ? e = "chrome" : -1 !== t.indexOf("Safari/") && (e = "safari"), 
            e;
        };
        let t = "unknown";
        return o.a.isChrome ? (t = e() || "chrome", /sandbox.html#bg/.test(location.href) && (t = "chameleon"), 
        Br.chromeNoStore && (t += "-sf")) : o.a.isFirefox ? (t = "firefox", o.a.isFirefoxMobile && (t += "-mobile"), 
        Br.firefoxNoStore && (t += "-sf")) : o.a.isSafari ? t = "safari" : o.a.isGM ? (t = e() || t, 
        t = "userjs-" + t) : o.a.isEdge && (t = "edge"), t;
    }, Br.getSfHelperName = function() {
        var e = Br.varCache.helperName;
        return /^firefox/.test(e) && (e = e.replace("firefox", "ff")), e;
    }, Br.dblTrackCheck = function(e) {
        if (!o.a.isGM) return e();
        Y() || o.a.storage.get({
            dblTrack: null
        }, t => {
            const r = Date.now();
            if (t.dblTrack && t.dblTrack.time > r) ; else {
                const t = Br.generateUuid();
                o.a.storage.set({
                    dblTrack: {
                        uuid: t,
                        time: r + 6e4
                    }
                }, () => {
                    setTimeout(() => {
                        o.a.storage.get({
                            dblTrack: null
                        }, r => {
                            r.dblTrack && r.dblTrack.uuid === t && e();
                        });
                    }, 5e3);
                });
            }
        });
    }, Br.getUuid = function() {
        var e = Br.varCache;
        if (e.uuid) return e.uuid;
        var t = Br.generateUuid();
        return e.uuid = t, o.a.storage.set({
            uuid: t
        }), t;
    }, Br.generateUuid = function() {
        return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" == e ? t : 3 & t | 8).toString(16);
        }));
    }, Br.getNavLanguage = function() {
        var e = "", t = navigator.language;
        return /^\w{2}-|^\w{2}$/.test(t) && (e = t), e;
    }, Br.gmShowButton = function(e) {
        e ? o.a.bundle.showButton() : o.a.bundle.hideButton();
    }, Br.tabListener = function() {
        let e = !1;
        const t = Br.preferences, r = F([ {
            matches: /^(?:https?|file|ftp):\/\/[^\\/]*\.vimeo\.com\/.*$|^(?:https?|file|ftp):\/\/vimeo\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.youtube\.com\/.*$|^(?:https?|file|ftp):\/\/youtube\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.soundcloud\.com\/.*$|^(?:https?|file|ftp):\/\/soundcloud\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.vk\.com\/.*$|^(?:https?|file|ftp):\/\/vk\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.vkontakte\.ru\/.*$|^(?:https?|file|ftp):\/\/vkontakte\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.ok\.ru\/.*$|^(?:https?|file|ftp):\/\/ok\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.odnoklassniki\.ru\/.*$|^(?:https?|file|ftp):\/\/odnoklassniki\.ru\/.*$|^(?:https?|file|ftp):\/\/my\.mail\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.facebook\.com\/.*$|^(?:https?|file|ftp):\/\/facebook\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.savefrom\.net\/.*$|^(?:https?|file|ftp):\/\/savefrom\.net\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.instagram\.com\/.*$|^(?:https?|file|ftp):\/\/instagram\.com\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.rutube\.ru\/.*$|^(?:https?|file|ftp):\/\/rutube\.ru\/.*$|^(?:https?|file|ftp):\/\/[^\\/]*\.tiktok\.com\/.*$|^(?:https?|file|ftp):\/\/tiktok\.com\/.*$/i
        }, {
            matches: /^(?:https?|file|ftp):\/\/[^\\/]*\/.*$/i,
            include_globs: /^[^:]*:\/\/dailymotion\.[^\\/]*\/.*$|^[^:]*:\/\/[^\\/]*\.dailymotion\.[^\\/]*\/.*$/i
        } ]), n = {}, i = function() {
            e = !1, Dr.debug("tabListener", e);
        };
        return {
            extendJsList: n,
            enable: function() {
                o.a.isFirefoxMobile || e || (e = !0, Dr.debug("tabListener", e));
            },
            disable: function() {
                o.a.isFirefoxMobile || i();
            },
            injectLmInActiveTab: function() {
                const e = [ "includes/commons.js", "includes/link_modifier.js" ];
                o.a.getActiveTab(t => {
                    t && /^http/.test(t.url) && !r(t.url) && e.forEach(e => {
                        o.a.executeScript(t, {
                            file: e
                        });
                    });
                });
            },
            openPage: s => {
                e && function(e, s) {
                    const a = r(s), c = [], u = t.lmMediaHosting;
                    a || u && (c.push("includes/commons.js"), c.push("includes/link_modifier.js"));
                    let l = !0;
                    function f() {
                        for (let e in n) {
                            l = !1;
                            const t = n[e];
                            if (!a || t.noBlackList) {
                                const e = t.getScriptList(s) || [];
                                c.push(...e);
                            }
                        }
                        if (c.length) {
                            const t = c.filter((e, t, r) => r.indexOf(e) === t);
                            Dr.debug("Inject", s, t), t.forEach(t => {
                                o.a.executeScript(e, {
                                    file: t
                                });
                            });
                        } else !u && l && i();
                    }
                    o.a.isGM ? setTimeout(f, 3e3) : f();
                }(s.tab, s.url);
            }
        };
    }(), Br.getCountry = function() {
        const e = Br.preferences, t = e => new Promise(t => o.a.storage.set(e, t));
        return (r = {
            countryExpiresAt: 0
        }, new Promise(e => o.a.storage.get(r, e))).then(r => {
            if (Object(I.a)() > r.countryExpiresAt) return t({
                countryExpiresAt: Object(I.a)() + 300
            }).then(() => {
                const t = e.sfHelperName + " " + Br.varCache.currentVersion;
                return Object(i.a)({
                    type: "POST",
                    url: "https://sf-helper.com/geoip/country.php",
                    data: {
                        sig: t.length
                    },
                    headers: {
                        "X-Helper": t
                    }
                });
            }).then(r => {
                const n = r.body.toLowerCase().trim();
                return Dr.debug("set country", n), e.country = n, t({
                    country: n,
                    countryExpiresAt: Object(I.a)() + 259200
                });
            });
        }).catch(e => {
            Dr("getCountry error", e);
        });
        var r;
    }, Br.getGASecret = function(e) {
        switch (e) {
          case "G-94HR5L4844":
            return "ZPd0mCdUTQWsCfEOo_bNYw";

          case "G-4WQE4RFM8F":
            return "soxH6EA-QCSQ1olyMW5t2g";

          case "G-L0GP1RQSBJ":
            return "_YBbwjArRHKjmZ8krhXbjQ";

          case "G-W8NGMXEEVX":
            return "3RVIBWlMTdyVl5WGkFLnEA";

          case "G-RC3SZG21LJ":
            return "ULosryHqTXKmj04eeI55cA";

          case "G-WQ82ZWDBEJ":
            return "mRZqbXE2TxyAR0TyXo-xqw";

          case "G-H6T68Y53FG":
            return "52IwVJ_2Tt-my3iq2OEYXQ";

          case "G-NSBD0T1C43":
            return "271YoEcSQXiAJ4FdGcjaXw";

          default:
            return null;
        }
    }, Br.loader.when("prepare", (function() {
        var e = Promise.resolve();
        if (Br.liteStorage.get("fromId", 0)) return e;
        if (o.a.isGM && Y()) return e;
        return e = e.then((function() {
            return Br.liteStorage.isTimeout("fromIdTimeout") ? Dr.debug("Request fromId timeout") : (Br.liteStorage.setTimeout("fromIdTimeout", 21600), 
            Object(i.a)({
                url: "http://savefrom.net/tools/get_vid.php"
            }).then((function(e) {
                var t = e.body, r = -1;
                /^\d+$/.test(t) && (r = parseInt(t)), Dr.debug("fromId", r), Br.liteStorage.set("fromId", r);
            })).catch((function(e) {
                return Dr.error("Request fromId error!", e);
            })));
        })).catch((function(e) {
            Dr.error("Request fromId error", e);
        }));
    })), Br.onOptionChange = {
        button: function(e) {
            o.a.isGM && Br.gmShowButton(e);
        },
        lmMediaHosting: function(e) {
            e && Br.tabListener.enable();
        },
        gmNativeDownload: function(e) {
            o.a.isGM && (Br.preferences.downloads = !!e, o.a.sendMessageToActiveTab({
                action: "updatePreferences",
                preferences: Br.preferences
            }));
        }
    }, Br.sendInGa = (Xr = !1, Jr = function e() {
        if (!Xr && zr.length) {
            Xr = !0;
            var t = Date.now(), r = zr.slice(0, 20);
            return r.map((function(e) {
                var r = e.time, n = JSON.parse(JSON.stringify(e.params)), o = t - r;
                o >= 144e5 && (o = 144e5 - 1e3 * (zr.length + 1)), n.qt = o;
                const i = n.tid, s = Br.getGASecret(n.tid), a = Br.varCache.uuid, c = "screenview" === n.t ? "screenview" : n.ec;
                return n.engagement_time_msec = 1, delete n.tid, n.country = Br.preferences.country, 
                {
                    params: n,
                    measurementId: i,
                    secret: s,
                    userId: a,
                    eventName: c
                };
            })).forEach(t => {
                if (!t.measurementId) throw new Error("measurementId is not defined");
                if (!t.secret) throw new Error("secret is not defined");
                return Object(J.a)({
                    url: `https://www.google-analytics.com/mp/collect?measurement_id=${t.measurementId}&api_secret=${t.secret}`,
                    type: "POST",
                    data: JSON.stringify({
                        client_id: t.userId,
                        events: [ {
                            name: t.eventName,
                            params: t.params
                        } ]
                    }),
                    timeout: 6e4
                }, (function(t) {
                    Xr = !1, t || (r.forEach((function(e) {
                        var t = e.details, r = zr.indexOf(e);
                        -1 !== r && zr.splice(r, 1);
                        try {
                            t.onSuccess && t.onSuccess();
                        } catch (e) {
                            Dr.error("sendInGa", "onSuccess", e);
                        }
                    })), e());
                }));
            });
        }
    }, {
        stack: zr = [],
        push: function(e, t) {
            var r = !1;
            (t = t || {}).id && (r = zr.some((function(e) {
                if (e.details.id === t.id) return !0;
            }))), r || (zr.unshift({
                time: Date.now(),
                params: e,
                details: t
            }), zr.splice(100), setTimeout((function() {
                Jr();
            }), 50));
        },
        pull: function() {
            zr.length && (Br.liteStorage.isTimeout("sendInGaTimeout") || (Br.liteStorage.setTimeout("sendInGaTimeout", 3600), 
            Jr()));
        }
    }), Br.actionList = {
        getMenuDetails: function(e, t) {
            var r = {
                preferences: Br.preferences,
                version: Br.varCache.currentVersion,
                lastVersion: function() {
                    var e = "", t = Br.varCache.currentVersion, r = Br.liteStorage.get("lastVersion", "");
                    if (!t || !r) return e;
                    try {
                        W(t, r) && (e = r);
                    } catch (e) {
                        Dr.debug("isNewVersion", e);
                    }
                    return e;
                }(),
                helperName: Br.varCache.helperName
            };
            return Object($.a)([ "userInfo" ]).then(e => ({
                userInfo: e.userInfo,
                loginUrl: o.a.remote.auth.getLoginUrl()
            })).then(e => t(Object.assign(r, e))), !0;
        },
        updateOption: function(e) {
            var t = e.key, r = e.value, n = Br.preferences[t];
            Br.preferences[t] = r;
            var i = {};
            i[t] = r, o.a.storage.set(i), Br.onOptionChange[t] && Br.onOptionChange[t](r, n);
        },
        downloadFromCurrentPage: function() {
            o.a.getActiveTab((function(e) {
                const t = e && e.url || "";
                var r = Fr.stringify({
                    url: t,
                    utm_source: Br.preferences.sfHelperName,
                    utm_medium: "extensions",
                    utm_campaign: "bookmarklet"
                });
                o.a.openTab("http://savefrom.net/?" + r, !0);
            }));
        },
        openPoll: function() {
            if (-1 !== [ "en", "uk", "ru" ].indexOf(o.a.i18n.getMessage("lang"))) {
                var e = "http://" + o.a.i18n.getMessage("lang") + ".savefrom.net/helper-form.php";
                o.a.getActiveTab((function(t) {
                    const r = t && t.url || "";
                    var n = L(r) || "", i = "?" + Fr.stringify({
                        version: Br.varCache.currentVersion,
                        helper: Br.preferences.sfHelperName,
                        url: n
                    });
                    o.a.openTab(e + i, !0);
                }));
            }
        },
        viaMenu_updateLinks: function() {
            o.a.sendMessageToActiveTab({
                action: "updateLinks"
            });
        },
        viaMenu_downloadMP3Files: function() {
            o.a.sendMessageToActiveTab({
                action: "downloadMP3Files"
            });
        },
        viaMenu_downloadPlaylist: function() {
            o.a.sendMessageToActiveTab({
                action: "downloadPlaylist"
            });
        },
        viaMenu_downloadPhotos: function() {
            o.a.sendMessageToActiveTab({
                action: "downloadPhotos"
            });
        },
        viaMenu_changeState: function(e) {
            if (Br.actionList.updateOption({
                key: e.prefKey,
                value: e.state
            }), e.state && "lm" === e.moduleName && e.needInclude) return Br.tabListener.injectLmInActiveTab();
            o.a.sendMessageToActiveTab({
                action: "changeState",
                moduleName: e.moduleName,
                state: e.state
            });
        },
        showOptions: function() {
            if (o.a.isGM) o.a.bundle.showOptions(); else {
                var e = "options.html";
                o.a.isSafari && (e = safari.extension.baseURI + e), o.a.openTab(e, !0);
            }
        },
        getActiveTabModuleInfo: function(e, t) {
            return o.a.sendMessageToActiveTab({
                action: "getModuleInfo",
                url: e.url
            }, (function(e) {
                t(e);
            })), !0;
        },
        getActiveTabUrl: function(e, t) {
            return o.a.getActiveTab((function(e) {
                const r = e && e.url || "";
                return t(r);
            })), !0;
        },
        getActiveTabInfo: function(e, t) {
            var r = Br.preferences;
            return o.a.getActiveTab((function(e) {
                const n = e && e.url || "";
                if (0 !== n.indexOf("http")) return t();
                var o = {
                    dailymotion: [ "*://*.dailymotion.*/*" ],
                    facebook: [ "*://*.facebook.com/*" ],
                    mailru: [ "*://my.mail.ru/*" ],
                    odnoklassniki: [ "*://*.ok.ru/*", "*://*.odnoklassniki.ru/*" ],
                    savefrom: [ "*://*.savefrom.net/*" ],
                    soundcloud: [ "*://*.soundcloud.com/*" ],
                    vimeo: [ "*://*.vimeo.com/*" ],
                    vk: [ "*://*.vk.com/*", "*://*.vkontakte.ru/*" ],
                    youtube: [ "*://*.youtube.com/*" ],
                    instagram: [ "*://*.instagram.com/*" ],
                    rutube: [ "*://*.rutube.ru/*" ],
                    tiktok: [ "*://*.tiktok.com/*" ],
                    yandexMusic: [ "*://music.yandex.ru/*" ],
                    matchTv: [ "*://matchtv.ru/*" ]
                }, i = "lm", s = "lmMediaHosting", a = r.lmMediaHosting;
                for (var c in o) {
                    var u = o[c].map((function(e) {
                        return ne(e);
                    })).join("|");
                    if ((u = new RegExp(u)).test(n)) {
                        i = c, s = Br.preferenceMap[i], a = r[s];
                        break;
                    }
                }
                return t({
                    moduleName: i,
                    prefKey: s,
                    url: n,
                    state: a
                });
            })), !0;
        },
        hideDownloadWarning: function(e, t) {
            return void 0 !== e.set ? o.a.storage.set({
                hideDownloadWarning: e.set
            }) : (o.a.storage.get({
                hideDownloadWarning: !1
            }, (function(e) {
                t(e.hideDownloadWarning);
            })), !0);
        },
        track: function(e) {
            Br.readyPromise.then(() => {
                delete e.action, Br.track(e);
            });
        },
        sendMonitoring: function(e) {
            Br.preferences.sendExporterEvent && Br.readyPromise.then(() => {
                delete e.action, Br.sendMonitoring(e);
            });
        },
        sendAlternativeMonitoring: function(e) {
            Br.preferences.sendExporterEvent && Br.readyPromise.then(() => {
                delete e.action, Br.sendAlternativeMonitoring(e);
            });
        },
        addToClipboard: function(e) {
            if (o.a.isChrome || o.a.isFirefox) {
                var t, r = e.text;
                document.body.appendChild(t = y.create("textarea", {
                    text: r
                })), t.select(), setTimeout((function() {
                    document.execCommand("copy", !1, null), t.parentNode.removeChild(t);
                }));
            }
        },
        setIconBadge: function(e) {
            var t = String(e.text);
            (o.a.isChrome || o.a.isFirefox) && chrome.browserAction && chrome.browserAction.setBadgeText({
                text: t
            });
        },
        trackError: function(e) {
            try {
                var t = Br.actionList.trackError;
                t.dDbl || (t.dDbl = {});
                var r = e.desc;
                if (e.error) {
                    var n = e.error;
                    r = r ? r + " " : "", n instanceof Error ? (r += String(n.message || n) || "ERROR", 
                    n.stack && (r += " " + e.error.stack)) : r += n;
                }
                var o = r.substr(0, 150);
                if (t.dDbl[o]) return;
                t.dDbl[o] = !0;
                var i = {
                    t: "exception",
                    exd: o,
                    tid: "UA-7055055-9"
                };
                Br.sendStatsInfo(i);
            } catch (e) {}
        },
        openTab: function(e) {
            o.a.openTab(e.url);
        },
        checkAndOpenProLanding: function() {
            Br.checkAndOpenProLanding();
        }
    }, Br.onMessage = function(e, t, r) {
        if (!e || "object" != typeof e) return void Dr.debug("Skip message", e);
        if ("openPage" === e.action) return void (Br.isReady ? Br.tabListener.openPage(t) : this.readyPromise.then(() => {
            Br.tabListener.openPage(t);
        }));
        const n = e.action;
        let o = Br.actionList[n];
        if (o) return o.call(Br.actionList, e, r);
        const i = (t, n) => {
            const o = n.call(t, e, r);
            return o instanceof Promise ? (o.then(r), !0) : o;
        };
        for (let e in Br.modules) {
            const t = Br.modules[e];
            if (o = t[n], o) return i(t, o);
        }
        return o = Br.utils[n], o ? o.call(Br.utils, e, r) : void 0;
    }, Br.loadSettings = function(e) {
        var t = Br.varCache, r = Br.preferences, n = Br.defaultPreferences;
        o.a.isGM && (n.button = 0, n.showUmmyBtn = 0);
        var i = {
            ummyDetected: function(e) {
                e || 0 === e || (e = r.showUmmyInfo ? 0 : 1, o.a.storage.set({
                    ummyDetected: e
                })), r.ummyDetected = e;
            }
        }, s = Object.keys(n), a = Object.keys(i);
        return o.a.storage.get(s.concat(a), (async function(c) {
            if (s.forEach((function(e) {
                var t = n[e], o = c[e];
                void 0 === o && (o = t), r[e] = o;
            })), a.forEach((function(e) {
                i[e](c[e]);
            })), t.isFirstrun) {
                var u = {
                    showUmmyLanding: r.showUmmyLanding = 1,
                    onceShowYtTooltip: r.onceShowYtTooltip = 1,
                    onceShowYtTutorial: r.onceShowYtTutorial = 1
                };
                o.a.storage.set(u);
            }
            if (r.onceShowYtTutorial && (r.onceShowYtTutorial = 0), o.a.isChrome && (chrome.downloads && chrome.downloads.download || chrome.permissions && chrome.permissions.request) && (r.downloads = !0), 
            o.a.isGM) {
                r.downloads = !1;
                var l = "undefined" != typeof GM_download, f = !1;
                l && "undefined" != typeof GM_info && (f = "browser" === GM_info.downloadMode), 
                l && (r.gmNativeDownload || f) && (r.gmNativeDownload = 1, r.downloads = !0);
            }
            return o.a.isFirefox && (r.downloads = !0), r.downloads && (r.moduleShowDownloadInfo = 0), 
            e();
        }));
    }, Br.prepare = async function(e) {
        var t = Br.varCache;
        Br.loader.when("loadSettings", (function() {
            t.isUpgrade = !t.isFirstrun && Br.preferences.version !== t.currentVersion, e();
        })), Br.preferences.selectorsConfig = await B(), Br.preferences.experimentsConfig = await V(), 
        [ "us", "uk" ].includes(Br.preferences.country) || Object(dt.a)(Br), Br.loadSettings((function() {
            Br.loader.ready("loadSettings");
        }));
    }, Br.initMessageListener = function() {
        Br.initMessageListener.fired || (Br.initMessageListener.fired = !0, o.a.onMessage.addListener((function(e, t, r) {
            return Br.onMessage(e, t, r);
        })));
    }, Br.init = function() {
        Br.initMessageListener(), Br.preferences.sendExporterEvent = Math.floor(100 * Math.random()) < 1;
        var e = Br.varCache, t = Br.preferences;
        return Kr().then(() => o.a.storage.get({
            uuid: "",
            version: "",
            country: "",
            lc: null,
            generalConfigVersion: {
                overall: 0,
                forcedCacheRemove: 0,
                forcedFirstRun: 0,
                landingPage: 0
            },
            [Br.liteStorage.getStorageKey()]: {}
        }, (async function(r) {
            Br.liteStorage.setStorage(r), null === r.lc && (r.lc = Math.random() < .05, o.a.storage.set({
                lc: r.lc
            })), t.lc = r.lc, Br.varCache.helperName = Br.getHelperName(), t.sfHelperName = Br.getSfHelperName(), 
            "string" == typeof r.uuid && 36 === r.uuid.length && (e.uuid = r.uuid), r.country && (t.country = r.country), 
            await Br.getCountry();
            const n = new oe((i = o.a, window.navigator.userAgent.indexOf("OPR") > -1 || window.navigator.userAgent.indexOf("Opera") > -1 ? "opera" : i.isGM ? "userjs" : i.isFirefox ? "firefox" : i.isChrome ? "chrome" : void 0), t.country);
            var i;
            let s = !1;
            if (Br.preferences.generalConfig = await M(), r.generalConfigVersion.overall < Br.preferences.generalConfig.version) {
                const e = r.generalConfigVersion.forcedCacheRemove < Br.preferences.generalConfig.forcedCacheRemove.version;
                if (e) {
                    ((e, t) => !!P({
                        preferences: e,
                        user: t,
                        config: e.generalConfig.forcedCacheRemove.config
                    }))(t, n) && o.a.storage.clear(() => {
                        o.a.storage.set({
                            uuid: r.uuid,
                            version: r.version,
                            country: t.country,
                            lc: r.lc,
                            [Br.liteStorage.getStorageKey()]: r[Br.liteStorage.getStorageKey()]
                        });
                    });
                }
                if (r.generalConfigVersion.forcedFirstRun < Br.preferences.generalConfig.forcedFirstRun.version && (s = ((e, t) => !!P({
                    preferences: e,
                    user: t,
                    config: e.generalConfig.forcedFirstRun.config
                }))(t, n)), e || r.generalConfigVersion.landingPage < Br.preferences.generalConfig.landingPage.version) {
                    const e = ((e, t) => {
                        const r = P({
                            preferences: e,
                            user: t,
                            config: e.generalConfig.landingPage.config
                        });
                        if (!r) return null;
                        const {url: n, cooldownInSeconds: o, clicksBeforeOpen: i} = r;
                        return {
                            url: n,
                            cooldownInSeconds: o,
                            clicksBeforeOpen: i
                        };
                    })(t, n);
                    e && (o.a.storage.set({
                        landingPageConfig: e
                    }), t.landingPageConfig = e);
                }
                o.a.storage.set({
                    generalConfigVersion: {
                        overall: Br.preferences.generalConfig.version,
                        forcedCacheRemove: Br.preferences.generalConfig.forcedCacheRemove.version,
                        forcedFirstRun: Br.preferences.generalConfig.forcedFirstRun.version,
                        landingPage: Br.preferences.generalConfig.landingPage.version
                    }
                });
            }
            r.version && !s || (r.version || setTimeout(() => {
                Br.track({
                    t: "event",
                    ec: "first_run",
                    ea: "first_run",
                    tid: "G-94HR5L4844"
                });
            }, 3e3), e.isFirstrun = !0), Br.preferences.proEnabled = await G();
            const a = new R(n);
            Br.preferences.experiments = await a.init(), t.showUmmyItem = /^Win|^Mac/.test(navigator.platform) ? 1 : 0, 
            Br.loader.ready("init"), Br.loader.when("prepare", (function() {
                Br.checkVersion();
            })), Br.events.on("sendScreenView", () => {
                if (!t.lc) return;
                const e = {
                    t: "screenview",
                    cd: "init",
                    cd4: "true",
                    tid: "G-94HR5L4844"
                };
                Br.wrapBaseStatInfo(e), Br.quickTrack(e), u([ {
                    user_id: Br.varCache.uuid,
                    event_type: "init",
                    user_properties: {
                        Cohort: "Clear"
                    }
                } ]).catch(() => {
                    chrome && "tabs" in chrome && "webNavigation" in chrome && chrome.tabs.query({
                        currentWindow: !0,
                        active: !0
                    }, e => {
                        0 !== e.length && chrome.webNavigation.getAllFrames({
                            tabId: e[0].id
                        }, e => {
                            Dr.debug("Error in amplitude: ", e);
                        });
                    });
                });
            }), Br.prepare((function() {
                Br.loader.ready("prepare"), Br.readyHandler();
            }));
        })));
    };
    const Kr = () => Promise.resolve().then(() => {
        if (o.a.isChrome) return new Promise(e => o.a.storage.get({
            migrated3: !1
        }, t => e(t.migrated3))).then(e => {
            if (!e) {
                const e = {
                    migrated3: !0
                };
                return Object.keys(localStorage).forEach(t => {
                    const r = localStorage.getItem(t);
                    try {
                        /^{(?:"w":.+|)}$/.test(r) && (e[t] = JSON.parse(r).w);
                    } catch (e) {
                        Dr.error("Parse value error", t, e);
                    }
                }), new Promise(t => o.a.storage.set(e, t));
            }
        }).catch(e => {
            Dr.error("migrate error", e), o.a.storage.set({
                migrated3: !0
            });
        });
    });
    if (Br.userTrack = function() {
        if (Br.liteStorage.isTimeout("trackTimeout")) return;
        Br.liteStorage.setTimeout("trackTimeout", 300);
        let e = {
            t: "screenview",
            cd: "init",
            tid: "G-94HR5L4844"
        };
        return Br.dblTrackCheck((function() {
            Br.track(e, {
                id: "init",
                onSuccess: function() {
                    Br.liteStorage.setTimeout("trackTimeout", 43200), Br.events.emit("sendScreenView"), 
                    z().then(() => {
                        if ("de" === Br.preferences.country) {
                            const t = Object.assign({}, e, {
                                tid: "UA-119781451-36"
                            });
                            Br.quickTrack(t);
                        }
                    });
                }
            });
        }));
    }, Br.trackValidate = function(e) {
        var t = function(e) {
            return !(!e && 0 !== e && !1 !== e) && -1 === [ "object", "function" ].indexOf(typeof e);
        };
        if (!e.tid) return !1;
        if (!e.cid) return !1;
        if (1 !== parseInt(e.v)) return !1;
        if (!e.t) return !1;
        if ("event" === e.t) {
            if (!t(e.ec) || !t(e.ea)) return !1;
        } else if ("screenview" === e.t) {
            if (!t(e.cd)) return !1;
        } else if (!("social" !== e.t || t(e.st) && t(e.sa) && t(e.sn))) return !1;
        return !0;
    }, Br.track = function(e, t) {
        return Br.sendStatsInfo(e, t);
    }, Br.sendMonitoring = function(e) {
        const t = `category=${e.obj.category}&subcategory=${e.obj.subcategory}&event=${e.obj.event}&duration=3.14`;
        return Object(J.a)({
            url: "https://monitoring-exporter.sf-helper.com/event",
            type: "POST",
            contentType: "application/x-www-form-urlencoded",
            data: t,
            timeout: 6e4
        }, (function(e, t) {
            e && console.log(e);
        }));
    }, Br.sendAlternativeMonitoring = function(e) {
        const t = e.params, {type: r} = t, o = Object(n.a)(t, Mr);
        fetch("https://monitoring-exporter.sf-helper.com/api/v3/" + r, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(o)
        }).catch(e => {
            console.error(e);
        });
    }, o.a.isGM) {
        new Ce(Br.track).init();
    }
    var Qr, Zr, en, tn, rn, nn;
    Br.quickTrack = function(e, t) {
        Br.trackValidate(e) ? (Dr.debug("Track", e), Br.sendInGa.push(e, t)) : Dr.error("Invalid track params!", e);
    }, Br.wrapBaseStatInfo = function(e) {
        var t = Br.varCache, r = {
            v: 1,
            ul: navigator.language,
            tid: "UA-67738130-2",
            cid: Br.getUuid(),
            an: "helper",
            aid: t.helperName,
            av: t.currentVersion
        };
        for (var n in r) e.hasOwnProperty(n) || (e[n] = r[n]);
        for (let t in e) "&clientID" === e[t] && (e[t] = e.cid);
        return e;
    }, Br.sendStatsInfo = function(e, t) {
        var r = Br.preferences;
        Br.wrapBaseStatInfo(e), e.hasOwnProperty("lang") || (e.lang = o.a.i18n.getMessage("lang"));
        var n = Br.liteStorage.get("fromId", 0);
        n > 0 && (e.vid = n), r.hasSovetnik && (e.metabar = r.sovetnikEnabled ? "true" : "false"), 
        e.ummy = r.ummyDetected ? "true" : r.showUmmyItem ? "false" : "none", r.aviaBarEnabled && (e.aviaBar = r.aviaBarEnabled), 
        Br.quickTrack(e, t);
    }, Br.checkVersion = function() {
        var e = Br.varCache, t = !1;
        e.isFirstrun ? (Br.loader.ready("firstrun"), t = !0) : e.isUpgrade && (Br.loader.ready("upgrade"), 
        t = !0), t && Br.actionList.updateOption({
            key: "version",
            value: e.currentVersion
        });
    }, Br.checkAndOpenProLanding = function(e) {
        Br.preferences.checkAndOpenProLandingLocked || (Br.preferences.checkAndOpenProLandingLocked = !0, 
        o.a.storage.get({
            openProLanding: null,
            buttonClickCountSinceProLanding: 0,
            landingPageConfig: null
        }, t => {
            t.openProLanding || (t.openProLanding = {
                lastOpen: 0
            }, o.a.storage.set({
                openProLanding: t.openProLanding
            })), !t.landingPageConfig || Date.now() <= t.openProLanding.lastOpen + 1e3 * t.landingPageConfig.cooldownInSeconds || (e || ++t.buttonClickCountSinceProLanding >= t.landingPageConfig.clicksBeforeOpen ? (o.a.openTab(t.landingPageConfig.url), 
            o.a.storage.set({
                openProLanding: {
                    lastOpen: Date.now()
                },
                buttonClickCountSinceProLanding: 0
            })) : o.a.storage.set({
                buttonClickCountSinceProLanding: t.buttonClickCountSinceProLanding
            })), Br.preferences.checkAndOpenProLandingLocked = !1;
        }));
    }, Br.loader.when("firstrun", (function() {
        if (Br.checkAndOpenProLanding(!0), o.a.isGM) return;
        let e = "http://savefrom.net/user.php?helper=" + Br.preferences.sfHelperName + ";firstrun";
        o.a.isFirefox && (Br.actionList.updateOption({
            key: "dataCollectionEnabled",
            value: !1
        }), e = chrome.runtime.getURL("eula.html")), Br.utils.checkUrlsOfOpenTabs([ /https?:\/\/([\w\-]+\.)?savefrom\.net\/(update-helper|userjs-setup)\.php/i ], (function(t) {
            t.length > 0 || Br.utils.checkUrlsOfOpenTabs([ /https?:\/\/legal\.yandex\.(ru|com\.tr)\//i ], (function(t) {
                var r = 0 === t.length;
                return o.a.openTab(e, r);
            }));
        }));
    })), Br.loader.when("prepare", (function() {
        var e = Br.preferences;
        e.onceShowYtTutorial && Br.actionList.setIconBadge({
            text: "?"
        }), e.showUmmyLanding && o.a.storage.get({
            onceUmmyLandingHide: 0
        }, (function(t) {
            t.onceUmmyLandingHide > 2 && o.a.storage.set({
                showUmmyLanding: e.showUmmyLanding = 0
            });
        }));
    })), Br.loader.when("prepare", (function() {
        Br.tabListener.enable();
    })), Br.loader.when("init", (function() {
        if ((o.a.isChrome || o.a.isFirefox) && chrome.runtime.setUninstallURL) {
            Br.varCache, Br.preferences;
            var e = function() {
                chrome.runtime.setUninstallURL("https://savefrom.net/helper-form.php");
            };
            e(), Br.loader.when("prepare", (function() {
                e();
            })), o.a.storage.onChanged.addListener((t, r) => {
                "local" === r && t.country && e();
            });
        }
    })), Br.liteStorage = (Qr = {}, Zr = function(e) {
        var t = {};
        return t.liteStorage = Qr, o.a.storage.set(t, e);
    }, en = function() {
        Dr.error("liteStorage is not set!");
    }, nn = function(e, t) {
        return tn(e, Object(I.a)() + t);
    }, {
        getStorageKey: function() {
            return "liteStorage";
        },
        setStorage: function(e) {
            Qr = e.liteStorage || {}, en = l(Zr, 100);
        },
        set: tn = function(e, t) {
            Qr[e] !== t && (Qr[e] = t, en());
        },
        get: rn = function(e, t) {
            var r = Qr[e];
            return void 0 === r && (r = t), function(e) {
                return JSON.parse(JSON.stringify({
                    w: e
                })).w;
            }(r);
        },
        isTimeout: function(e) {
            return rn(e, 0) > Object(I.a)();
        },
        setTimeout: nn,
        isExpire: function(e) {
            return rn(e, 0) < Object(I.a)();
        },
        setExpire: nn
    });
    (0, r(103).default)(Br);
    (0, r(104).default)(Br);
    Br.init().then(async () => {
        Object({
            extensionMarker: "savefrom-helper-extension",
            monoPath: "C:\\Users\\Zafar\\Desktop\\extension\\mono",
            monoBrowser: "chrome",
            browser: "edge",
            sourcePath: "C:\\Users\\Zafar\\Desktop\\extension\\src",
            outputPath: "C:\\Users\\Zafar\\Desktop\\extension\\dist\\edge",
            mode: "production",
            distName: "helper_10.51",
            geckoId: null,
            version: "10.51",
            browsersVersions: [ "Edge >= 14.14291" ],
            babelOptions: {
                presets: [ [ "@babel/preset-env", {
                    targets: {
                        browsers: [ "Edge >= 14.14291" ]
                    }
                } ] ],
                plugins: [ [ "@babel/plugin-transform-runtime", {
                    useESModules: !0
                } ] ]
            },
            beautify: !0,
            FLAG_CHROME_NO_STORE: !1,
            FLAG_FIREFOX_NO_STORE: !1,
            FLAG_OPERA_STORE: !1,
            FLAG_ADD_CHECK_UPDATE: !0,
            FLAG_ERROR_CATCH: !0,
            FLAG_CHROME_SOVETNIK: !1,
            FLAG_OPERA_SOVETNIK: !1,
            FLAG_FIREFOX_SOVETNIK: !1,
            FLAG_USERSCRIPT_SOVETNIK: !1,
            FLAG_AVIABAR: !1,
            FLAG_CHROMENOSTORE_SIMILARWEB: !1,
            FLAG_FIREFOX_SIMILARWEB: !1,
            FLAG_USERSCRIPT_SIMILARWEB: !1,
            FLAG_ALIRADAR_CHROME: !1,
            FLAG_ALIRADAR_FIREFOX: !1,
            FLAG_ALIRADAR_OPERA: !1,
            FLAG_ALIRADAR_USERSCRIPT: !1,
            FLAG_ALI_AB_TEST: !1,
            FLAG_STAT_TRACKER: !1,
            FLAG_MUTATION_OBSERVER_POLYFILL: !1,
            FLAG_USERSCRIPT_USERTRACK: !1,
            FLAG_ENABLE_LOGGER: !1,
            FLAG_SEND_TO: !1,
            FLAG_ALIWIZ: !1,
            FLAG_CONVERTER_STAT: !1,
            FLAG_ALIWIZ_USERSCRIPT: !1,
            FLAG_ALITEST: !1,
            FLAG_GOOGLE_ANALYTICS: !0,
            FLAG_TEST_EXPERIMENT: null,
            FLAG_PROMO_BAR: !1,
            FLAG_HELPER_PRO: !1,
            FLAG_WITHOUT_YOUTUBE: !1,
            FLAG_GOAL: !1,
            FLAG_CONV_FFMPEG: !0,
            FLAG_MIGRATE_TM: !1,
            devtool: "none",
            FLAG_MENU_TUTORIAL: !0
        }).FLAG_ADGOUD;
    });
} ]);