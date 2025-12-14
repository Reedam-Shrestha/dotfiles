!function(e) {
    var t = {};
    function n(s) {
        if (t[s]) return t[s].exports;
        var r = t[s] = {
            i: s,
            l: !1,
            exports: {}
        };
        return e[s].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
    }
    n.m = e, n.c = t, n.d = function(e, t, s) {
        n.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
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
        var s = Object.create(null);
        if (n.r(s), Object.defineProperty(s, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var r in e) n.d(s, r, function(t) {
            return e[t];
        }.bind(null, r));
        return s;
    }, n.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return n.d(t, "a", t), t;
    }, n.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, n.p = "", n(n.s = 115);
}({
    0: function(e, t, n) {
        "use strict";
        var s = class {
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
        }, r = n(7);
        const i = Object(r.a)("mono");
        var o = class {
            constructor() {
                this.onDestroy = new s, this._lastErrorFired = !1, this._lastError = null;
            }
            get lastError() {
                return this._lastErrorFired = !0, this._lastError;
            }
            set lastError(e) {
                this._lastErrorFired = !e, this._lastError = e;
            }
            clearLastError() {
                this._lastError && !this._lastErrorFired && i.error("Unhandled mono.lastError error:", this.lastError), 
                this._lastError = null;
            }
            unimplemented() {
                throw new Error("Unimplemented");
            }
            destroy() {
                this.onDestroy.dispatch();
            }
        };
        const a = n(62);
        var l = e => class extends e {
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
                                const t = a(e.err);
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
        var c = e => class extends e {};
        var h = e => class extends(c(e)){};
        class d extends(h(l(o))){
            initMessages() {
                this.sendMessage = this.transport.sendMessage.bind(this.transport), this.onMessage = {
                    addListener: this.transport.addListener.bind(this.transport),
                    hasListener: this.transport.hasListener.bind(this.transport),
                    hasListeners: this.transport.hasListeners.bind(this.transport),
                    removeListener: this.transport.removeListener.bind(this.transport)
                };
            }
        }
        var u = d;
        var g = class {
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
        var p = e => class extends e {
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
        var f = e => class extends(p(e)){};
        class m extends(f(u)){
            constructor() {
                super(), this.initMessages(), this.initStorage(), this.initI18n();
            }
            initI18n() {
                const e = [ "de", "en", "es", "fr", "id", "ko", "pt", "ru", "tr", "uk", "zh" ], t = navigator.languages || [ navigator.language || navigator.userLanguage ];
                let n = null;
                for (const s of t) {
                    const t = s.split("-")[0].toLowerCase();
                    if (e.includes(t)) {
                        n = t;
                        break;
                    }
                }
                if (!n) try {
                    const t = chrome.i18n.getUILanguage().split("-")[0].toLowerCase();
                    e.includes(t) && (n = t);
                } catch (e) {}
                n || (n = "en");
                let s = {};
                const r = chrome.runtime.getURL(`_locales/${n}/messages.json`);
                try {
                    const e = new XMLHttpRequest;
                    if (e.open("GET", r, !1), e.send(null), 200 === e.status) s = JSON.parse(e.responseText); else {
                        const t = chrome.runtime.getURL("_locales/en/messages.json");
                        e.open("GET", t, !1), e.send(null), 200 === e.status && (s = JSON.parse(e.responseText), 
                        n = "en");
                    }
                } catch (e) {}
                this._i18nMessages = s, this._i18nLanguage = n;
                this.i18n = {
                    getMessage: (e, t) => {
                        const n = this._i18nMessages[e];
                        if (!n || !n.message) return e;
                        let s = n.message;
                        if (t && s) {
                            (Array.isArray(t) ? t : [ t ]).forEach((e, t) => {
                                const n = "$" + (t + 1);
                                s = s.replace(new RegExp("\\" + n, "g"), e);
                            });
                        }
                        return s;
                    },
                    language: n
                };
            }
            initMessages() {
                this.transport = {
                    sendMessage: (e, t) => {
                        t ? chrome.runtime.sendMessage(e, e => {
                            this.lastError = chrome.runtime.lastError, t(e), this.clearLastError();
                        }) : chrome.runtime.sendMessage(e);
                    },
                    addListener: e => {
                        chrome.runtime.onMessage.addListener(e);
                    },
                    hasListener: e => chrome.runtime.onMessage.hasListener(e),
                    hasListeners: () => chrome.runtime.onMessage.hasListeners(),
                    removeListener: e => {
                        chrome.runtime.onMessage.removeListener(e);
                    }
                }, super.initMessages();
            }
            initStorage() {
                this.storage = new g(this);
            }
        }
        const y = new m;
        t.a = y;
    },
    115: function(e, t, n) {
        "use strict";
        n.r(t);
        var s = n(0), r = n(18), i = n(47);
        Object(r.a)("tab", () => {
            s.a.sendMessage({
                action: "openPage"
            }), Object(i.b)() && new i.a({
                notificationStyle: {
                    top: "50px",
                    right: "50px",
                    position: "fixed"
                }
            });
        });
    },
    18: function(e, t, n) {
        "use strict";
        n.d(t, "b", (function() {
            return o;
        }));
        var s = n(0);
        const r = [], i = (e, t, n) => Promise.resolve().then(() => !n || n()).then(n => {
            n && (-1 === r.indexOf(e) && r.push(e), t());
        }), o = (e, t, n) => i(e, () => s.a.callFn("getPreferences").then(n => {
            t(e, {
                preferences: n
            });
        }), n);
        t.a = i;
    },
    47: function(e, t, n) {
        "use strict";
        n.d(t, "b", (function() {
            return r;
        })), n.d(t, "a", (function() {
            return i;
        }));
        var s = n(0);
        const r = () => "undefined" != typeof GM_info && !GM_info.version.startsWith("2");
        class i {
            constructor(e) {
                let {notificationStyle: t, parentNode: n, alwaysShow: s = !1, onClose: r = null} = e;
                this.overlay = null, this.parentNode = null, this.notificationStyle = void 0, this.notification = null, 
                this.alwaysShow = !1, this.onClose = null, window.trustedTypes && window.trustedTypes.createPolicy && (this.trustedHTML = window.trustedTypes.createPolicy("manifest-onboarding", {
                    createHTML: e => e
                })), this.notificationStyle = t, this.parentNode = n, this.alwaysShow = s, this.onClose = r, 
                this.init();
            }
            init() {
                s.a.storage.get({
                    lastManifestV3OnboardingShown: 0
                }, e => {
                    if (s.a.storage.set({
                        lastManifestV3OnboardingShown: Date.now()
                    }), !(e.lastManifestV3OnboardingShown + 864e5 > Date.now()) || this.alwaysShow) try {
                        this.parentNode || this.createOverlay(), this.addNotification(), s.a.sendMessage({
                            action: "show_update_popup",
                            tid: "G-94HR5L4844"
                        });
                    } catch (e) {
                        console.error(e), this.close();
                    }
                });
            }
            createOverlay() {
                this.overlay = document.createElement("div"), this.overlay.id = "m3-overlay", this.overlay.style.position = "fixed", 
                this.overlay.style.top = "0", this.overlay.style.left = "0", this.overlay.style.right = "0", 
                this.overlay.style.bottom = "0", this.overlay.style.width = "100%", this.overlay.style.height = "100%", 
                this.overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)", this.overlay.style.zIndex = "10000", 
                this.overlay.style.display = "flex", document.body.appendChild(this.overlay);
            }
            insertNotificationStyles() {
                const e = document.createElement("style");
                e.innerHTML = this.trustedHTML.createHTML('    \n      @import url(\'https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap\');\n  \n      .m3-notification {\n          display: flex;\n          background-color: white;\n          border-radius: 12px;\n          z-index: 1000;\n          padding: 20px;\n          color: #1f1f1f;\n        }\n      .m3-logo {\n          margin-right: 20px;\n          width: 44px;\n          height: 44px;\n        }\n      .m3-content {\n          max-width: 330px;\n          display: flex;\n          flex-direction: column;\n          align-items: flex-start;\n        }\n      .m3-header {\n          font-size: 16px;\n          font-weight: 600;\n          line-height: 24px;\n          text-align: left;\n          margin: 0 !important;\n          font-family: "Inter", sans-serif !important;\n    \n        }\n      .m3-text {\n          font-size: 16px;\n          font-weight: 400;\n          line-height: 24px;\n          text-align: left;\n          margin: 16px 0;\n          color: black;\n          font-family: "Inter", sans-serif !important;\n    \n        }\n      .m3-sf {\n          font-weight: 700;\n          background: none;\n          padding: 0;\n          margin: 0;\n          font-family: "Inter", sans-serif !important;\n        }\n      .m3-link {\n          display: inline-block;\n          padding: 6px 20px 6px 20px;\n          border-radius: 20px;\n          font-size: 18px;\n          font-weight: 500;\n          line-height: 24px;\n          text-align: center;\n          background-color: #0957D0;\n          color: white !important;\n          text-decoration: none;\n          font-family: "Inter", sans-serif !important;\n        }\n      .m3-close {\n          margin-left: 20px;\n          cursor: pointer;\n          width: 24px;\n          height: 24px;\n        }\n    '), 
                document.head.appendChild(e);
            }
            close() {
                this.overlay && this.overlay.remove(), this.notification && this.notification.remove(), 
                this.onClose && this.onClose(), s.a.sendMessage({
                    action: "click_update_popup",
                    tid: "G-94HR5L4844"
                });
            }
            addNotification() {
                this.insertNotificationStyles(), this.notification = document.createElement("div"), 
                this.notification.classList.add("m3-notification"), this.notification.innerHTML = this.trustedHTML.createHTML('\n                <img class="m3-logo" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsCAYAAAAehFoBAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAmDSURBVHgB1VhdbFxXEZ5zf+z12nHSQEmEKiUIgVpFtIaoASVI2JGAp0AiCEICpUme6AOq85IiITWbKC8IiTYgBEhI2QpeKirBE+KpthClQhDJKSoCEohL8+c4mzq2d+/f+WFmzjl37zp21k7y0pGv791zz88335mZM3MBPmAi+nX4s/nkQQPBmO1s3t8r/nXuTfPk0QBghwaNrQHOoU3vnaT6XBVttAYRGDO7L7rU/JN5alKA2kx9BeiZveLfv7sfngj6iFRwMAj0EWMAJxSz2HTOgHkOoY7jb2w2wuptSCX+555dG3egJ0EvUA1WQgfBNN6aCP8FHLUT31CHJrY9HOC8o0DEQgQMo5cwzUr0wCOWKyAFvRe67EEa4j6R9kZbQnLJ/Qmv0UE/OP0Bp6mCCBdhZG4+bdfgNm0YJlOJ8BCQ4d4WpBUei7+14beCaPa6F7nmgRrbdGH6wekPOEs1kyICEH4VqVS5x9hOVsGQcckSHPWlRguB9kawamjARitLPQMuFPclwvPsEQDOkWEIAxFGljsSyzCwyQZdLBaqNXbcYr8tHrDh/wRWsyHbdzkCpgm0EiJPoa+swyRwoQjNgmxMWAaktADYsNnvmCPvUNZY2cUMXwa8uWhWVmsodSmkZn1UgbvZ6Ru0egH/5srTk/WR2ubR2kdEFNW47b3rl8bS4qZxpDBiZpi9SkNErUKUzLJ5sAbWXq2bIbNas0kpZYhlF1BQ+Uyzh+oCzPDQ9rG3kr0NS0oKnXwROklr9tAT7zRXBXx1/n/To0n0xnz43y1BEMFgPCKCKAIjA5xAlq6uDK1qLUE5R2T+tGDM/tkBh9KWaKy2gH1DXthoEQYhRDU1duXG38akzFBBicrphbStJtZk+MSehZmX39yyv75JvBEE5rEsvdMTsoRjWEkbh3ANvLxrGbvpFbPwkYQfHPMadSWf9V5XSOvABSiRZtet8laxhSTLJ07sac9UMd4T+E7sW5i528r3Z6lcIO1loQzdi1xBnmvLsLQs0eLo88imJhYNbje7H3k8tXGo0gxQKPzNFwGW9uKtp7l5ne49zdTC4vK9YFcFTHJyoj1zd0lOYIRA0EYQWHIOujuGBYNGnIq9HoDB6qoS4MAa5l27d/jonq0pIAk8L4Y3Q+RkuOYirn1y371g1wRM8n0E3Wolh9KkMBQraVIplTMJZEIyW4LZpdjq2WQWgUHSX6kE9cN9sMpqNitmOJNsFrRGkihotYpDtPZauO57Fp49IKdvXsuPpx1laLvywjHMdmgYuAVJ7CIYzQ7GJkLKUDuzTaGNgeNuILOogJHOJOzOaegsK3HrWnb87IF0+n6Y+h7er3xLNVvX5fHlJWlk7s5/MgcXT+0WE2jLqj8YGLhy9kvgCSi+J0VxPLXxXERCe1HC7dvy6I9wrX54+mcbBPqYat5B0Au3LcOaTEI5B3LsMqvSAbOOJShlYEaduXA72zspapWnOVs35LEff1u9uh4s6wJM8vPnodm5o4/TMy/KkUKXjmXt1F7WLLrvrSOykzKzWjLLPG/7jjhBc68Xh3gr+eZO2KBc/Pv0ebyNx4MGapv8TMKnv5VUGMpD0I9NltBuMwFhFM186qnPH4INivjVpe2NgYGhU4GI8WQbBjqS8YQDOulq+Hs1SZI2XPrP2xDEBdSoizscqgeMMd27HWUTpHQZj+kigk98/GkYGlp9/gJPulwu45Xi7qVQqBTPgmW8F2d4sl+8s7VRi8NTdl7oHm2YOhJ4UiIOayIKB/H3JlEbGIYsy2D26tsQDhUWSw8NoqdNVFIgmcbwsSeegSiOEBiBSdDx2vycIiiNXqsxsegdC9BpF2ee//RCo9yqn17Y0hgejl4y3eVEOcTWGm7D7d7TjjAIIyt9bQ7pj/CedvccBhH31y5H9WuVk9gaplpjiTSRDQR72qMp5Sd/HW3Uh+OXnOX1LFfdXvfW5eVdoNBdsDtpz9IrFOqOX6GWNyBm9vR3n11sVBjvlXN/IdDRKVtB2A4VxsDaJmealUUdImfF1XFVxYytoytFFXQTY9PrrBRdsDw7/cJnu2B5h1YC/sMvs+k9XzWiNhSO03htc3DBSSNVEayIsUWjtx57klEGbBEaV2O4UAauyAQ/l3G5PdjKxFgLd3MCJ1Fzc+npF7/QbqzEdw9gkqlfy+lnD2oxVI/GS4vi6Fou1l2Uny21TjGrkOETrwvS4eZ2r5RvBHAKc4wXt+Y7pxtfzhqrYbtvTXLq9/HLH3p8aDKsfg9xthysiK/VsrPH03qb+Lf2duzavQmRGczfTM6dOVBMroWpbxH1vd+G57dtrx+NIu9dVR/yxHoFvE9B19uN/7ri6j87iaiEPnYvyv5a8+mrZ79SHL0fnr6AGfTrcfPxjw4eCUP2N1ONA6b6MaXKpuunq+yuMT9lgvNzafMHX1PHoI+sCzDJi6+H5z+8ffC5KArArARRDXleEf+++3HCxtqgewqScgXmFC0C+/X+YKvzr0tOvhY2EfSRIHJQoGoevcDBx2ax6oI8hBKg23NZ84ffWB9YknVnayT4nW1y7lpyschtSukqDa486W7LpDKV5OS9rDhseWSrZoweaaLh1rV0ZiNgNwz4lWOwoDIzcfNqOoO1F4egMtfVDpBNM60DUhraUz5Z4GmKNnsjm1GZnoANyoZMwsvkediCnx2mNm+NxoY2hRWDdcW8cSdZbybBJtJpK7N4R14MtJkgAmCD8kCAPWgsKqZGHwufqY+G/vithC1wx57wUQOSZWXuttTFSDwYWDfNgwuBLiRMjTwWjQ2PCgM93y5L4Ziw/D7XblfiED7zoGAfGjDJd34GO/Hrz9Tw5mAnXh4iha8yJW7f1XipKwMx7Eews/AQ8tCASQg0zjQ1sjncOTQqoJJ/IKvGJEvmXXTICazdZuEh5ZEAJmHQmDfFdbGjPhJwBpZy/aav4OP+RwGW5JEBJiHQmLhN4cGygzIHLOdn0fcmHhVYkr5x2KWOdAWNRiNwYygtDQ8fPszX7t27Y/wdIbCr8u7AF1UG78kc3l26bb70z9fGr4L9SuovHktz+fncXVSuNUWsBpBkfHw8WFpaEhcuXKAFgm3btmFSPUfP0cjISKSUipMkiQYHB2Mcw0DyPA/jOA6e/JzeoZDaf/xREVj6+kIFnMS+EqeWQRAUnU6H2tTWrVuLMAw1jtP1el1dvnyZrF+jEnS5zHljUjJcvVAhz1jsnonlgV27dg1U73T5HfD3KtOVOdfF8AdO/g83MgnGmyEIdQAAAABJRU5ErkJggg==" alt="logo" />\n                <div class="m3-content">\n                    <h3 class="m3-header">Reinstall the SaveFrom.net Helper</h3>\n                    <p class="m3-text">The current version of OrangeMonkey and scripts, including <span class="m3-sf">SaveFrom Helper</span>, will soon no longer be supported. Please install a new version of the extension.</p>\n                    <a class="m3-link" id="m3-link" href="https://en1.savefrom.net/1/userjs-for-google-chrome.php" target="_blank">Install new version</a>\n                </div>\n                <svg class="m3-close" id="m3-close" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">\n                    <path d="M18 6L6 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n                    <path d="M6 6L18 18" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>\n                </svg>\n    ');
                const e = this.overlay || this.parentNode;
                if (e) {
                    e.append(this.notification);
                    for (const t in this.notificationStyle) e.querySelector(".m3-notification").style.setProperty(t, this.notificationStyle[t]);
                    e.querySelector(".m3-close").onclick = this.close.bind(this), e.querySelector(".m3-link").onclick = this.close.bind(this);
                }
            }
        }
    },
    62: function(e, t, n) {
        var s = n(69).default;
        e.exports = s;
    },
    69: function(e, t, n) {
        "use strict";
        Object.defineProperty(t, "__esModule", {
            value: !0
        });
        var s = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
            return typeof e;
        } : function(e) {
            return e && "function" == typeof Symbol && e.constructor === Symbol ? "symbol" : typeof e;
        };
        function r(e) {
            return e && "object" === (void 0 === e ? "undefined" : s(e)) && "string" == typeof e.name && "string" == typeof e.message;
        }
        t.default = function(e) {
            return r(e) ? Object.assign(new Error, {
                stack: void 0
            }, e) : e;
        }, t.isSerializedError = r;
    },
    7: function(e, t, n) {
        "use strict";
        t.a = e => {
            let t = null;
            return t = () => {}, t.t = t.log = t.info = t.warn = t.error = t.debug = t, t;
        };
    }
});