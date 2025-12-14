!function(e) {
    function t(t) {
        for (var r, i, s = t[0], c = t[1], l = t[2], u = 0, p = []; u < s.length; u++) i = s[u], 
        Object.prototype.hasOwnProperty.call(o, i) && o[i] && p.push(o[i][0]), o[i] = 0;
        for (r in c) Object.prototype.hasOwnProperty.call(c, r) && (e[r] = c[r]);
        for (d && d(t); p.length; ) p.shift()();
        return a.push.apply(a, l || []), n();
    }
    function n() {
        for (var e, t = 0; t < a.length; t++) {
            for (var n = a[t], r = !0, s = 1; s < n.length; s++) {
                var c = n[s];
                0 !== o[c] && (r = !1);
            }
            r && (a.splice(t--, 1), e = i(i.s = n[0]));
        }
        return e;
    }
    var r = {}, o = {
        17: 0
    }, a = [];
    function i(t) {
        if (r[t]) return r[t].exports;
        var n = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports;
    }
    i.m = e, i.c = r, i.d = function(e, t, n) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        });
    }, i.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, i.t = function(e, t) {
        if (1 & t && (e = i(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (i.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var r in e) i.d(n, r, function(t) {
            return e[t];
        }.bind(null, r));
        return n;
    }, i.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return i.d(t, "a", t), t;
    }, i.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, i.p = "";
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], c = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var l = 0; l < s.length; l++) t(s[l]);
    var d = c;
    a.push([ 123, 0 ]), n();
}({
    123: function(e, t, n) {
        "use strict";
        n.r(t);
        var r = n(0), o = n(20), a = n(18), i = n(11), s = n(7), c = n(14), l = n(5), d = n(21), u = n(38);
        var p = function(e) {
            return function(e) {
                const t = {
                    operationName: "PlaybackAccessToken_Template",
                    variables: {
                        vodID: e,
                        login: "",
                        isLive: !1,
                        isVod: !0,
                        playerType: "site"
                    },
                    query: 'query PlaybackAccessToken_Template($login: String!, $isLive: Boolean!, $vodID: ID!, $isVod: Boolean!, $playerType: String!) {\n  streamPlaybackAccessToken(\n    channelName: $login\n    params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}\n  ) @include(if: $isLive) {\n    value\n    signature\n    __typename\n  }\n  videoPlaybackAccessToken(\n    id: $vodID\n    params: {platform: "web", playerBackend: "mediaplayer", playerType: $playerType}\n  ) @include(if: $isVod) {\n    value\n    signature\n    __typename\n  }\n}\n'
                };
                return Object(d.a)({
                    url: "https://gql.twitch.tv/gql",
                    method: "POST",
                    headers: {
                        "client-id": "kimne78kx3ncx6brgo4mv6wki5h1ko"
                    },
                    json: !0,
                    data: JSON.stringify(t)
                }).then(t => {
                    if (!t.body || !t.body.data || !t.body.data.videoPlaybackAccessToken) throw new Error("Response not valid");
                    const n = t.body.data.videoPlaybackAccessToken;
                    if (!n.signature || !n.value) throw new Error("Signature or Value not found for video " + e);
                    return n;
                });
            }(e).then(t => {
                let {signature: n, value: r} = t;
                const o = `https://usher.ttvnw.net/vod/${e}.m3u8?sig=${n}&supported_codecs=avc1&token=${r}&cdm=wv&player_version=0.9.80`;
                return Object(d.a)(o);
            }).then(e => {
                const t = new RegExp('(https.*?)\\n#EXT-X-MEDIA.*?NAME="(.*?)"', "g");
                return Object(u.a)(e.body, t).map(e => ({
                    url: e[1],
                    quality: parseInt(e[2])
                }));
            });
        }, h = n(28), f = n(6), g = n(9), v = n(10), b = n(53);
        const y = Object(s.a)("twitch");
        let m = void 0;
        class w {
            constructor() {
                this._unmount = void 0, this._hasEvents = !1;
            }
            start() {
                y.log("start"), r.a.callFn("getPreferences").then(e => {
                    m = Object(g.a)({
                        preferences: e
                    }), this.preferences = e, this.isActive = Boolean(e.moduleTwitch), this._bindEvents(), 
                    e.moduleTwitch && this._bindMutationWatcher();
                });
            }
            onFoundToolbar(e) {
                if (!e && e.parentElement) return;
                e = e.parentElement;
                let t = {
                    style: {
                        background: "rgb(145, 71, 255)",
                        padding: "5px 8px",
                        borderRadius: "4px",
                        paddingLeft: "10px",
                        paddingRight: "11px",
                        cursor: "pointer",
                        marginLeft: "9px",
                        marginRight: /\/clip\//.test(location.href) || document.querySelector('[data-a-target="login-button"]') ? "60px" : 0,
                        top: 0,
                        position: "absolute",
                        left: "-49px"
                    },
                    href: "#",
                    title: r.a.i18n.getMessage("download")
                };
                if (/videos\/\d+/.test(location.href)) t.onClick = this.handleDownloadStream.bind(this); else {
                    if (!/\/clip\//.test(location.href)) return void y.error("media type not found");
                    t.onClick = e => this.handleDownloadClip(e);
                }
                this._unmount = Object(c.a)(Object(l.e)("a", t, Object(l.e)("img", {
                    src: m.svg.getSrc("download", "#fff", "8px"),
                    style: {
                        width: "14px",
                        marginTop: "2px",
                        opacity: .8
                    }
                })), e);
            }
            handleDownloadStream(e) {
                e.preventDefault(), e.stopPropagation(), r.a.sendMessage({
                    action: "checkAndOpenProLanding"
                });
                const t = location.href.match(/videos\/(\d+)/), n = t && t[1] ? t[1] : void 0, o = this.getVideoName();
                return p(n).then(e => {
                    const t = e.find(e => e.quality <= 720);
                    Object(c.a)(Object(l.e)(h.a, {
                        filename: o,
                        format: "mp4",
                        sources: [ {
                            url: t.url,
                            format: "mp4"
                        } ],
                        convertType: "hls"
                    }), "sf-muxer-parent");
                }).catch(t => {
                    y.error("handleDownloadStream err", t), e.target && (e.target.style.opacity = .3, 
                    e.target.title = "An error has occurred");
                });
            }
            handleDownloadClip(e) {
                e.preventDefault(), e.stopPropagation(), r.a.sendMessage({
                    action: "checkAndOpenProLanding"
                }), Object(v.a)({
                    category: "download",
                    subcategory: "tw",
                    event: "video"
                });
                const t = document.querySelector("video");
                if (!t) return;
                const n = this.getVideoName();
                if (!m.download(n, t.src)) {
                    const e = document.createElement("a");
                    e.href = t.src, e.download = n, e.target = "_blank", e.click(), e.remove();
                }
            }
            getVideoName() {
                const e = document.querySelector('[data-a-target="stream-title"]'), t = e ? e.textContent.split("•")[0] : document.title;
                return f.a.modify(t) + ".mp4";
            }
            changeActive(e) {
                y.log("change active", e), this.isActive = e ? 1 : 0, this.isActive ? this.start() : this._unmount && this._unmount();
            }
            _bindEvents() {
                if (this._hasEvents) return void y.log("bind events skip");
                this._hasEvents = !0;
                const e = (() => {
                    const e = [];
                    return r.a.onMessage.addListener((t, n, r) => {
                        y.log("message", t);
                        const o = e.find(e => {
                            let {action: n} = e;
                            return t.action === n;
                        });
                        o && o.handleCb(t, r);
                    }), (t, n) => e.push({
                        action: t,
                        handleCb: n
                    });
                })();
                e("getModuleInfo", (e, t) => {
                    let {url: n} = e;
                    n === location.href && t({
                        moduleName: "twitch",
                        state: this.isActive
                    });
                }), e("changeState", e => {
                    let {moduleName: t, state: n} = e;
                    return "twitch" === t && this.changeActive(n);
                }), e("updatePreferences", e => {
                    let {preferences: t} = e;
                    this.preferences = Object.assign(this.preferences, t);
                });
            }
            async _bindMutationWatcher() {
                var e;
                y.log("_bindMutationWatcher call"), this.observer && (this.observer.stop(), this.observer.queries.forEach(e => {
                    let {css: t} = e;
                    document.querySelectorAll(t).forEach(e => (e => e.dataset.sfLock = "")(e));
                }));
                try {
                    e = await Object(b.a)();
                } catch (e) {
                    y.error("get selectors config error", e);
                }
                this.observer = new i.a({
                    queries: [ {
                        is: "added",
                        css: e.twitch.default,
                        callback: e => {
                            let {added: t} = e;
                            return t.forEach(e => {
                                var t, n;
                                Object(v.a)({
                                    category: "append",
                                    subcategory: "tw",
                                    event: "b"
                                }), t = e, n = this.onFoundToolbar.bind(this), t && !t.dataset.sfLock && (t.dataset.sfLock = "1", 
                                n(t));
                            });
                        }
                    } ]
                }), this.observer.start();
            }
        }
        o.a.isSingle() && Object(a.a)("twitch", () => {
            (new w).start();
        }, () => !0);
    }
});