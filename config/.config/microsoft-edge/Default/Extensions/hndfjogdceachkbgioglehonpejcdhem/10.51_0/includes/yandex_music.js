!function(e) {
    function t(t) {
        for (var n, s, i = t[0], l = t[1], d = t[2], u = 0, h = []; u < i.length; u++) s = i[u], 
        Object.prototype.hasOwnProperty.call(o, s) && o[s] && h.push(o[s][0]), o[s] = 0;
        for (n in l) Object.prototype.hasOwnProperty.call(l, n) && (e[n] = l[n]);
        for (c && c(t); h.length; ) h.shift()();
        return a.push.apply(a, d || []), r();
    }
    function r() {
        for (var e, t = 0; t < a.length; t++) {
            for (var r = a[t], n = !0, i = 1; i < r.length; i++) {
                var l = r[i];
                0 !== o[l] && (n = !1);
            }
            n && (a.splice(t--, 1), e = s(s.s = r[0]));
        }
        return e;
    }
    var n = {}, o = {
        21: 0
    }, a = [];
    function s(t) {
        if (n[t]) return n[t].exports;
        var r = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, s), r.l = !0, r.exports;
    }
    s.m = e, s.c = n, s.d = function(e, t, r) {
        s.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, s.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, s.t = function(e, t) {
        if (1 & t && (e = s(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (s.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var n in e) s.d(r, n, function(t) {
            return e[t];
        }.bind(null, n));
        return r;
    }, s.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return s.d(t, "a", t), t;
    }, s.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, s.p = "";
    var i = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = i.push.bind(i);
    i.push = t, i = i.slice();
    for (var d = 0; d < i.length; d++) t(i[d]);
    var c = l;
    a.push([ 119, 0 ]), r();
}({
    119: function(e, t, r) {
        "use strict";
        r.r(t);
        var n = r(17), o = r(0), a = r(11), s = r(9), i = r(52), l = r(1), d = r(15);
        const c = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        class u {
            constructor() {
                this.utils = Object(s.a)({
                    preferences: this.settings
                });
            }
            downloadMusic(e, t) {
                const r = this.base64ToUrl(e);
                this.downloadFile(r, t);
            }
            base64ToUrl(e) {
                return URL.createObjectURL(this.base64ToBlob(e, "audio/mpeg"));
            }
            base64ToBlob(e, t) {
                const r = atob(e), n = new Uint8Array(r.length);
                for (let e = 0; e < r.length; e++) n[e] = r.charCodeAt(e);
                return new Blob([ n ], {
                    type: t
                });
            }
            downloadFile(e, t) {
                const r = document.createElement("a");
                r.href = e, r.download = t, document.body.appendChild(r), r.click(), document.body.removeChild(r);
            }
            prepareDownloadIcon() {
                return l.a.create(this.utils.svg.getSvg("download", "currentColor", 19, 19), {
                    style: {
                        marginTop: "3px"
                    }
                });
            }
            prepareLoadingIcon() {
                return '<span style="font-size: 20px;"><svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"><path stroke-dasharray="16" stroke-dashoffset="16" d="M12 3c4.97 0 9 4.03 9 9"><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.3s" values="16;0"/><animateTransform attributeName="transform" dur="1.5s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path><path stroke-dasharray="64" stroke-dashoffset="64" stroke-opacity=".3" d="M12 3c4.97 0 9 4.03 9 9c0 4.97 -4.03 9 -9 9c-4.97 0 -9 -4.03 -9 -9c0 -4.97 4.03 -9 9 -9Z"><animate fill="freeze" attributeName="stroke-dashoffset" dur="1.2s" values="64;0"/></path></g></svg></span>';
            }
            downloadButtonMouseEvents() {
                return [ [ "mouseover", e => {
                    e.target.style.color = "white", c && (e.altKey || e.ctrlKey ? Object(d.a)(this.renderedElement, {
                        defaultWidth: 400,
                        defaultHeight: 60
                    }) : (e.preventDefault(), Object(d.b)(this.renderedElement, {
                        defaultWidth: 400,
                        defaultHeight: 60
                    })));
                } ], [ "mouseout", e => {
                    e.target.style.color = "#747474";
                } ] ];
            }
        }
        class h extends u {
            constructor(e) {
                super(), this.selectors = [ 'div[class*="PageHeaderBase_controls"]' ], this.type = "added", 
                this.renderedElement = null, this.utils = e;
            }
            handle(e) {
                let {added: t} = e;
                const r = document.querySelector('div[class*="PageHeaderBase_controls"]');
                if (!r) return;
                let n = window.location.href.split("/")[window.location.href.split("/").length - 2];
                n.includes("playlist") && (n = "playlist"), this.prepareButton(r, n);
            }
            prepareButton(e, t) {
                e.dataset.sfReady || (this.renderedElement = l.a.create("a", {
                    class: [ "d-track__hover", "sf-download" ],
                    title: o.a.i18n.getMessage("download"),
                    style: {
                        order: "99",
                        color: "#747474",
                        cursor: "pointer"
                    },
                    append: [ this.prepareDownloadIcon() ],
                    on: [ [ "click", async e => {
                        e.stopPropagation(), e.preventDefault();
                        const r = this.extractInitData(t);
                        this.renderedElement.innerHTML = this.prepareLoadingIcon(), this.renderedElement.style.pointerEvents = "none", 
                        o.a.sendMessage({
                            action: "extractLinks",
                            pageType: t,
                            initData: r
                        }, function(e) {
                            if (0 === e.length) return;
                            let t = 0;
                            const r = () => {
                                if (t < 2) for (let n = 0; n < 2; n++) if (e.length > 0) {
                                    const n = e.shift();
                                    t++, o.a.sendMessage({
                                        action: "extractLinks",
                                        mediaId: n,
                                        pageType: "track"
                                    }, function(n) {
                                        let {base64: o, filename: a} = n;
                                        this.downloadMusic(o, a), t--, r(), 0 === e.length && (this.renderedElement.innerHTML = "", 
                                        this.renderedElement.append(this.prepareDownloadIcon()), this.renderedElement.style.pointerEvents = "auto");
                                    }.bind(this));
                                }
                            };
                            r();
                        }.bind(this));
                    } ], ...this.downloadButtonMouseEvents() ]
                }), e.append(this.renderedElement), e.dataset.sfReady = "1");
            }
            extractInitData(e) {
                switch (e) {
                  case "playlist":
                    return this.extractPlaylistData();

                  case "album":
                    return this.extractAlbumData();

                  case "artist":
                    return this.extractArtistData();

                  default:
                    return null;
                }
            }
            extractPlaylistData() {
                const e = Array.from(document.querySelectorAll("script[nonce]")).find(e => e.textContent.includes("preloadedPlaylistByUuid") && e.textContent.includes("playlistUuid"));
                if (!e) return console.error("Target script not found"), null;
                const t = e.textContent, r = /\\"uid\\":(\d+)|\\"kind\\":(\d+)/g;
                let n, o = null, a = null;
                for (;null !== (n = r.exec(t)) && (n[1] && (o = n[1]), n[2] && (a = n[2]), !o || !a); ) ;
                return o && a ? {
                    owner: o,
                    kinds: a
                } : (console.error("UID or kind not found"), null);
            }
            extractAlbumData() {
                return {
                    album: window.location.href.split("/").pop()
                };
            }
            extractArtistData() {
                return {
                    artist: window.location.href.split("/").pop()
                };
            }
            disable() {
                const e = [ "data-sf-song-ready", "data-sf-info" ], t = document.querySelectorAll(e.map(e => `[${e}]`).join(","));
                Array.from(t).forEach(t => ((e, t) => t.forEach(t => e.removeAttribute(t)))(t, e)), 
                Array.from(document.querySelectorAll(".sf-download")).forEach(e => e.remove());
            }
        }
        class p extends u {
            constructor(e) {
                super(), this.selectors = [ 'div[class*="PlayerBarDesktopWithBackgroundProgressBar_player"]' ], 
                this.type = "added", this.observer = void 0, this.button = void 0, this.mediaId = null, 
                this.renderedElement = null, this.attributeObserver = void 0, this.utils = e;
            }
            handle(e) {
                let {added: t} = e;
                const r = t.pop();
                if (!r) return;
                const n = [ 'div[class*="PlayerBarDesktopWithBackgroundProgressBar_player"]' ].map(e => r.closest(e)).find(Boolean), o = [ 'div[class*="PlayerBarDesktopWithBackgroundProgressBar_meta"]' ].map(e => n.querySelector(e)).find(Boolean);
                o && this.renderButton(o);
            }
            renderButton(e) {
                e.dataset.sfReady || (this.renderedElement = l.a.create("a", {
                    title: o.a.i18n.getMessage("download"),
                    class: [ "player-controls__btn", "deco-player-controls__button", "sf-download-in-control" ],
                    style: {
                        color: "#747474",
                        cursor: "pointer",
                        zIndex: 1e3
                    },
                    append: [ this.prepareDownloadIcon() ],
                    on: [ [ "click", async e => {
                        e.stopPropagation(), e.preventDefault();
                        const t = e.target.closest("div[class*='PlayerBarDesktopWithBackgroundProgressBar_playerBar']");
                        this.mediaId = t.querySelector("div[class*='Meta_titleContainer'] a").getAttribute("href").split("/").pop(), 
                        this.renderedElement.innerHTML = this.prepareLoadingIcon(), this.renderedElement.style.pointerEvents = "none", 
                        o.a.sendMessage({
                            action: "extractLinks",
                            mediaId: this.mediaId,
                            pageType: "track"
                        }, function(e) {
                            let {base64: t, filename: r} = e;
                            this.downloadMusic(t, r), this.renderedElement.innerHTML = "", this.renderedElement.append(this.prepareDownloadIcon()), 
                            this.renderedElement.style.pointerEvents = "auto";
                        }.bind(this));
                    } ], ...this.downloadButtonMouseEvents() ]
                }), e.append(this.renderedElement), e.dataset.sfReady = "1", this.handlePlayerTrackChange());
            }
            handlePlayerTrackChange() {
                document.querySelector('div[class*="PlayerBarDesktop_description"] a[class*="Meta_albumLink"]') && (this.attributeObserver = new MutationObserver(e => {
                    for (const t of e) "attributes" === t.type && "href" === t.attributeName && (this.mediaId = t.target.getAttribute("href").split("/").pop());
                }));
            }
            disable() {
                this.observer && this.observer.stop(), Array.from(document.querySelectorAll("[data-sf-ready]")).forEach(e => e.removeAttribute("data-sf-ready")), 
                this.renderedElement && this.renderedElement.remove(), this.attributeObserver && this.attributeObserver.disconnect();
            }
        }
        class f extends u {
            constructor(e) {
                super(), this.selectors = [ 'div[class*="HorizontalCardContainer_root"]' ], this.type = "added", 
                this.observer = void 0, this.button = void 0, this.cache = new Map, this.utils = e;
            }
            handle(e) {
                let {added: t} = e;
                for (const e of t) {
                    const t = e.querySelector('div[class*="CommonControlsBar_root"]');
                    t && this.renderButton(t);
                }
            }
            renderButton(e) {
                if (e.dataset.sfReady) return;
                const t = l.a.create("a", {
                    title: o.a.i18n.getMessage("download"),
                    class: [ "player-controls__btn", "deco-player-controls__button", "sf-download-in-control" ],
                    style: {
                        color: "#747474",
                        cursor: "pointer"
                    },
                    append: [ this.prepareDownloadIcon() ],
                    on: [ [ "click", async e => {
                        e.stopPropagation(), e.preventDefault();
                        const t = e.target.closest("div[class*='HorizontalCardContainer_root']").querySelector("div[class*='Meta_titleContainer'] a").getAttribute("href").split("/").pop(), r = this.cache.get(t);
                        r.innerHTML = this.prepareLoadingIcon(), r.style.pointerEvents = "none", o.a.sendMessage({
                            action: "extractLinks",
                            mediaId: t,
                            pageType: "track"
                        }, function(e) {
                            let {base64: t, filename: n} = e;
                            this.downloadMusic(t, n), r.innerHTML = "", r.append(this.prepareDownloadIcon()), 
                            r.style.pointerEvents = "auto";
                        }.bind(this));
                    } ], ...this.downloadButtonMouseEvents() ]
                });
                e.append(t), e.dataset.sfReady = "1";
                const r = t.closest("div[class*='HorizontalCardContainer_root']").querySelector("div[class*='Meta_titleContainer'] a").getAttribute("href").split("/").pop();
                this.cache.set(r, t);
            }
            disable() {
                this.observer && this.observer.stop(), Array.from(document.querySelectorAll("[data-sf-ready]")).forEach(e => e.removeAttribute("data-sf-ready"));
                const e = document.querySelector(".sf-download-in-control");
                e && e.remove(), this.cache.clear();
            }
        }
        function m(e, t) {
            var r = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var n = Object.getOwnPropertySymbols(e);
                t && (n = n.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), r.push.apply(r, n);
            }
            return r;
        }
        function y(e) {
            for (var t = 1; t < arguments.length; t++) {
                var r = null != arguments[t] ? arguments[t] : {};
                t % 2 ? m(Object(r), !0).forEach((function(t) {
                    Object(n.a)(e, t, r[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r)) : m(Object(r)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(r, t));
                }));
            }
            return e;
        }
        class b extends i.a {
            constructor() {
                super(...arguments), this.active = 1, this.mutationHandlers = [];
            }
            async init() {
                this.settings = await o.a.callFn("getPreferences"), this.active = Number(this.settings.moduleYandexMusic), 
                this.utils = Object(s.a)({
                    preferences: this.settings
                }), this.registerListeners(), this.active && this.initObserver(), this.appendStyle("\n      .theme-white .sf-download { background: white;  box-shadow: 0 0 7px 7px white; }\n      .theme_dark .sf-download { background: #181818; box-shadow: 0 0 7px 7px #181818; } \n      \n      .theme-white .sf-download:hover path { fill: black; }\n      .theme_dark .sf-download:hover path { fill: white; }\n        \n      .theme-white .sf-download path { fill: #a7a7a7; }  \n      \n      .sf-download {\n            margin-top: 3px;\n            margin-right: 6px;\n            padding-right: 10px;\n            padding-left: 10px;\n            float:left;\n      }\n      \n      .sf-download-in-control {\n            margin: 12px;\n            width: 11px;\n            height: 22px;\n            margin-top: 9px;\n      }\n      \n      .theme_dark .sf-download-in-control path { fill: white; }\n      .theme-white .sf-download-in-control path { fill: #3c3b3b; }\n      \n      .sf-icon-error path, .sf-icon-error:hover path { fill: #ff33334a!important; }\n");
            }
            initObserver() {
                this.mutationHandlers = [ new h(this.utils), new p(this.utils), new f(this.utils) ];
                this.observer = new a.a({
                    queries: this.mutationHandlers.flatMap(e => e.selectors.flatMap(t => ({
                        css: t,
                        callback: e.handle.bind(e),
                        is: e.type
                    })))
                }), this.observer.start();
            }
            registerListeners() {
                o.a.onMessage.addListener(async (e, t, r) => {
                    const {action: n, moduleName: o, state: a} = e;
                    if ("getModuleInfo" === n) return r({
                        state: this.active,
                        moduleName: b.moduleName
                    });
                    "updatePreferences" !== n ? (this.handleMonoChangeActive(n, o, a), this.handleMonoDownloadAll(n)) : this.settings = y(y({}, this.settings), e.preferences);
                });
            }
            async handleMonoDownloadAll(e) {
                if ("downloadMP3Files" !== e) return;
                let t = Array.from(document.querySelectorAll("a.sf-download[download][href]"));
                t = t.map(e => ({
                    url: e.href,
                    title: e.download,
                    filename: e.download
                })), this.utils.downloadList.showBeforeDownloadPopup(t, {
                    type: "audio",
                    folderName: document.title.trim()
                });
            }
            handleMonoChangeActive(e, t, r) {
                if (b.moduleName === t && "changeState" === e) {
                    if (this.active = r, this.active) return this.initObserver();
                    this.observer.stop(), this.mutationHandlers.forEach(e => e.disable());
                }
            }
        }
        b.moduleName = "yandexMusic";
        var g = r(18), v = r(20);
        const w = new b;
        v.a.isSingle() && Object(g.a)(b.moduleName, () => w.start(), () => -1 === location.href.indexOf("api/"));
    }
});