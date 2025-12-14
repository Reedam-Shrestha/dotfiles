!function(e) {
    function t(t) {
        for (var i, a, d = t[0], s = t[1], c = t[2], l = 0, u = []; l < d.length; l++) a = d[l], 
        Object.prototype.hasOwnProperty.call(n, a) && n[a] && u.push(n[a][0]), n[a] = 0;
        for (i in s) Object.prototype.hasOwnProperty.call(s, i) && (e[i] = s[i]);
        for (p && p(t); u.length; ) u.shift()();
        return o.push.apply(o, c || []), r();
    }
    function r() {
        for (var e, t = 0; t < o.length; t++) {
            for (var r = o[t], i = !0, d = 1; d < r.length; d++) {
                var s = r[d];
                0 !== n[s] && (i = !1);
            }
            i && (o.splice(t--, 1), e = a(a.s = r[0]));
        }
        return e;
    }
    var i = {}, n = {
        18: 0
    }, o = [];
    function a(t) {
        if (i[t]) return i[t].exports;
        var r = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, a), r.l = !0, r.exports;
    }
    a.m = e, a.c = i, a.d = function(e, t, r) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
        });
    }, a.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, a.t = function(e, t) {
        if (1 & t && (e = a(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var r = Object.create(null);
        if (a.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) a.d(r, i, function(t) {
            return e[t];
        }.bind(null, i));
        return r;
    }, a.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return a.d(t, "a", t), t;
    }, a.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, a.p = "";
    var d = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], s = d.push.bind(d);
    d.push = t, d = d.slice();
    for (var c = 0; c < d.length; c++) t(d[c]);
    var p = s;
    o.push([ 103, 0 ]), r();
}({
    103: function(e, t, r) {
        "use strict";
        r.r(t);
        var i = r(0), n = r(9), o = r(18), a = r(30), d = r(7), s = r(20), c = r(11), p = r(1), l = r(8);
        const u = Object(d.a)("twitter_com");
        s.a.isSingle() && Object(o.b)("twitter", (function(e, t) {
            const r = Object(n.a)(t);
            var o = t.preferences, d = o.moduleTwitter ? 1 : 0, s = Object(a.a)();
            const {selectorsConfig: f} = t.preferences;
            u.log("selectorsConfig", f), i.a.onMessage.addListener((function(t, r, i) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return i({
                        state: d,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return v.changeState(t.state);
                }
                "updatePreferences" !== t.action || Object.assign(o, t.preferences);
            })), d && setTimeout((function() {
                v.run();
            }));
            var v = {
                currentMenu: null,
                run: function() {
                    d = 1, c.a.isAvailable() && this.mutationMode.enable();
                },
                changeState: function(e) {
                    s || (d = e, v.mutationMode.stop(), e && v.run());
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop();
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        const e = (e, t) => {
                            try {
                                if (e.dataset.sfSkip > 0) return;
                                e.dataset.sfSkip = "1";
                                const n = new URL(e.src), o = n.searchParams.get("format"), a = n.pathname.split("/").pop(), d = p.a.create("button", {
                                    class: "sf-dl-current-photo-btn",
                                    style: {
                                        position: "absolute",
                                        top: "25px",
                                        right: "20px",
                                        cursor: "pointer",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        zIndex: 9999,
                                        background: "white",
                                        width: "25px",
                                        height: "25px",
                                        borderRadius: "50%"
                                    },
                                    title: i.a.i18n.getMessage("download"),
                                    append: [ r.svg.getSvg("download", "#84bd07", 16) ],
                                    on: [ [ "click", function(t) {
                                        t.stopPropagation(), t.preventDefault(), r.download(`${a}.${o}`, e.src);
                                    } ] ]
                                });
                                "profile" === t ? e.closest("a").appendChild(d) : e.parentNode.appendChild(d);
                            } catch (e) {
                                u.log(e);
                            }
                        };
                        this.observer = new c.a({
                            queries: [ {
                                css: "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > div > div > div:nth-child(1) > div.css-175oi2r.r-3pj75a.r-ttdzmv.r-1ifxtd0 > div.css-175oi2r.r-1habvwh.r-18u37iz.r-1w6e6rj.r-1wtj0ep > div.css-175oi2r.r-1adg3ll.r-bztko3.r-16l9doz.r-6gpygo.r-2o1y69.r-1v6e3re.r-1xce0ei > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div > a > div:nth-child(3) > div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div > img",
                                is: "added",
                                callback: t => {
                                    for (let r, i = 0; r = t.added[i]; i++) r.src.includes("profile_images") && e(r, "profile");
                                }
                            }, {
                                css: "#react-root > div > div > div.css-175oi2r.r-1f2l425.r-13qz1uu.r-417010.r-18u37iz > main > div > div > div > div.css-175oi2r.r-kemksi.r-1kqtdi0.r-1ua6aaf.r-th6na.r-1phboty.r-16y2uox.r-184en5c.r-1abdc3e.r-1lg4w6u.r-f8sm7e.r-13qz1uu.r-1ye8kvj > div > div:nth-child(3) > div > div > div:nth-child(1) > a > div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div > img",
                                is: "added",
                                callback: t => {
                                    for (let r, i = 0; r = t.added[i]; i++) r.src.includes("profile_banners") && e(r);
                                }
                            }, {
                                css: "#id__1zinprbke5d > div > div > div > div > div > div > a > div > div.r-1p0dtai.r-1pi2tsx.r-1d2f490.r-u8s1d.r-ipm5af.r-13qz1uu > div > img",
                                is: "added",
                                callback: t => {
                                    for (let r, i = 0; r = t.added[i]; i++) e(r);
                                }
                            }, {
                                css: '[data-testid="image"] img, [data-testid="swipe-to-dismiss"] img',
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) try {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = new URL(t.src), n = t.src.split(":")[1].split(".")[t.src.split(":")[1].split(".").length - 1], o = e.pathname.split("/").pop(), a = p.a.create("button", {
                                            class: "sf-dl-current-photo-btn",
                                            style: {
                                                position: "absolute",
                                                top: "60px",
                                                right: "40px",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                zIndex: 9999,
                                                background: "white",
                                                width: "30px",
                                                height: "30px",
                                                borderRadius: "50%"
                                            },
                                            title: i.a.i18n.getMessage("download"),
                                            append: [ r.svg.getSvg("download", "#84bd07", 16) ],
                                            on: [ [ "click", function(e) {
                                                e.stopPropagation(), e.preventDefault();
                                                const i = document.createElement("a");
                                                i.href = t.src, i.download = `${o}.${n}`, i.click(), r.download(`${o}.${n}`, t.src);
                                            } ] ]
                                        });
                                        t.parentNode.appendChild(a);
                                    } catch (e) {
                                        u.log(e);
                                    }
                                }
                            }, {
                                css: '[data-testid="videoComponent"] video',
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) try {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = t.closest("article");
                                        let n, o;
                                        if (e) {
                                            const t = e.querySelector("time");
                                            n = t.parentNode.href.split("/").pop(t.parentNode.href.split("/").length - 1), o = "tw-video";
                                        } else n = t.poster.split("/")[4], o = "tw-dm-video";
                                        const a = p.a.create("button", {
                                            class: "sf-dl-current-photo-btn",
                                            style: {
                                                position: "absolute",
                                                top: "10px",
                                                right: "10px",
                                                cursor: "pointer",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                zIndex: 9999
                                            },
                                            title: i.a.i18n.getMessage("download"),
                                            append: [ r.svg.getSvg("download", "#FFF", 16) ],
                                            on: [ [ "click", async function(e) {
                                                e.stopPropagation(), e.preventDefault();
                                                const t = v.currentMenu = r.popupMenu.quickInsert(a, i.a.i18n.getMessage("download") + " ...", "sf-popupMenu"), d = await l.a.createLinkExtractor(o).extractLinks({
                                                    mediaId: n
                                                });
                                                t.update(d);
                                            } ] ]
                                        });
                                        t.parentNode.appendChild(a);
                                    } catch (e) {
                                        u.error(e);
                                    }
                                }
                            } ]
                        });
                    }
                }
            };
        }));
    }
});