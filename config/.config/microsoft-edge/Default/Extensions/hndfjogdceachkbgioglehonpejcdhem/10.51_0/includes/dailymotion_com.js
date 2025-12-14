!function(e) {
    function t(t) {
        for (var o, i, c = t[0], s = t[1], u = t[2], l = 0, f = []; l < c.length; l++) i = c[l], 
        Object.prototype.hasOwnProperty.call(a, i) && a[i] && f.push(a[i][0]), a[i] = 0;
        for (o in s) Object.prototype.hasOwnProperty.call(s, o) && (e[o] = s[o]);
        for (d && d(t); f.length; ) f.shift()();
        return r.push.apply(r, u || []), n();
    }
    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], o = !0, c = 1; c < n.length; c++) {
                var s = n[c];
                0 !== a[s] && (o = !1);
            }
            o && (r.splice(t--, 1), e = i(i.s = n[0]));
        }
        return e;
    }
    var o = {}, a = {
        3: 0
    }, r = [];
    function i(t) {
        if (o[t]) return o[t].exports;
        var n = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, i), n.l = !0, n.exports;
    }
    i.m = e, i.c = o, i.d = function(e, t, n) {
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
        }), 2 & t && "string" != typeof e) for (var o in e) i.d(n, o, function(t) {
            return e[t];
        }.bind(null, o));
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
    var c = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], s = c.push.bind(c);
    c.push = t, c = c.slice();
    for (var u = 0; u < c.length; u++) t(c[u]);
    var d = s;
    r.push([ 104, 0 ]), n();
}({
    104: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(0), a = n(9), r = n(18), i = n(30), c = n(24), s = n(64), u = n(40), d = n(12), l = n(3), f = n(1), p = n(7), m = n(20), b = n(11), h = n(10), v = n(61), g = n(8);
        const y = Object(p.a)("dailymotion_com");
        m.a.isSingle() && Object(r.b)("dailymotion", (function(e, t) {
            const n = Object(a.a)(t);
            var r = t.preferences, p = r.moduleDailymotion ? 1 : 0;
            const {selectorsConfig: m} = t.preferences;
            var M = Object(i.a)() && /\/embed\/([\w\-]+)/i.test(document.location.href);
            o.a.onMessage.addListener((function(t, n, o) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return o({
                        state: p,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return k.changeState(t.state);
                }
                "updatePreferences" !== t.action ? p && "updateLinks" === t.action && k.updateLinks() : Object.assign(r, t.preferences);
            })), p && setTimeout((function() {
                Object(h.a)({
                    category: "append",
                    subcategory: "da",
                    event: "b"
                }), k.run();
            }));
            var k = {
                contextMenu: null,
                linkCache: {},
                embed: null,
                title: "",
                styleIndex: 0,
                btnId: "sf__download_btn",
                result: null,
                popupIsShow: !1,
                run: function() {
                    return p = 1, M ? (Object(h.a)({
                        category: "download",
                        subcategory: "da",
                        event: "video"
                    }), void k.appendIframeButtons()) : b.a.isAvailable() ? k.mutationMode.enable() : void 0;
                },
                changeState: function(e) {
                    M || (p = e, k.rmBtn(), k.mutationMode.stop(), e && k.run());
                },
                hideMenu: function() {
                    k.contextMenu && k.contextMenu.isShow && (k.contextMenu.hide(), k.contextMenu = null);
                },
                updateLinks: function() {
                    k.changeState(0), k.changeState(1), n.showLinksUpdatedNotification();
                },
                appendIframeButtons: function() {
                    var e = this, t = n.frameMenu.getBtn({
                        quickBtnStyleObj: {
                            display: "inline-block",
                            cursor: "pointer",
                            position: "relative",
                            padding: "9px 10px"
                        },
                        quickBtnCssStyle: {
                            backgroundColor: "rgba(0,0,0,.75)"
                        },
                        singleBtn: !0,
                        btnId: e.btnId,
                        containerStyle: {
                            right: "50px",
                            top: "10px"
                        },
                        quickBtnIcon: f.a.create(n.svg.getSvg("download", "#ffffff"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "middle"
                            }
                        }),
                        on: [ [ "click", function(a) {
                            if (a.preventDefault(), a.stopPropagation(), e.contextMenu && e.contextMenu.isShow) e.hideMenu(); else {
                                var r = e.getIdFromUrl(), i = o.a.i18n.getMessage("download") + " ...", c = e.linkCache[r];
                                c && (i = n.popupMenu.prepareLinks.dailymotion(c.links, c.title));
                                var s = e.contextMenu = n.frameMenu.getMenu(this, i, "sf-frame-menu", {
                                    container: t.container,
                                    onShow: function() {
                                        t.node.classList.add("sf-over");
                                    },
                                    onHide: function() {
                                        e.contextMenu = null, t.node.classList.remove("sf-over");
                                    }
                                });
                                c || o.a.sendMessage({
                                    action: "getDailymotionLinks",
                                    extVideoId: r,
                                    metadata: e.getMetadata(r)
                                }, (function(t) {
                                    var a = o.a.i18n.getMessage("noLinksFound");
                                    t.links && (e.linkCache[r] = t, a = n.popupMenu.prepareLinks.dailymotion(t.links, t.title)), 
                                    s.update(a);
                                }));
                            }
                        } ], [ "mousedown", function(n) {
                            n.stopPropagation(), 2 === n.button && (l.a.off(document.body, "mousemove", c), 
                            e.hideMenu(), t.container.parentNode && t.container.parentNode.removeChild(t.container));
                        } ] ]
                    });
                    t.quickBtn.title = o.a.i18n.getMessage("download"), t.container = f.a.create("div", {
                        class: "sf-btn-ctr",
                        append: t.node
                    }), l.a.on(t.container, "mouseenter", (function() {
                        t.lockHide = !0;
                    })), l.a.on(t.container, "mouseleave", (function() {
                        t.lockHide = !1;
                    }));
                    var a = null, r = !1, i = function() {
                        t.lockHide || (t.container.classList.add("sf-hide-ui"), r = !0);
                    }, c = function() {
                        r && (t.container.classList.remove("sf-hide-ui"), r = !1), clearTimeout(a), a = setTimeout(i, 3e3);
                    };
                    l.a.on(document.body, "mousemove", c), t.node.appendChild(f.a.create("style", {
                        text: Object(d.a)([ {
                            selector: [ "body:hover .sf-btn-ctr:not(.sf-hide-ui) #" + e.btnId, "body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-frame-menu" ],
                            style: {
                                display: "block"
                            }
                        } ])
                    })), document.body.appendChild(t.container);
                },
                getIdFromUrl: function(e) {
                    var t = (e = e || location.href).match(/\/embed\/video\/([a-z0-9]+)/);
                    return t = t && t[1];
                },
                getMetadata: function(e) {
                    var t = null;
                    return Object(s.a)(document.body.innerHTML, /playerV5/).some((function(n) {
                        return Object(u.a)(n).some((function(n) {
                            if (n && n.metadata && n.metadata.id === e) return t = n.metadata, !0;
                        }));
                    })), t;
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll([ "#" + k.btnId, ".sf-wrapper" ]), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    k.result = null, k.popupIsShow = !1;
                },
                insertBtn: function(e) {
                    if (!e.querySelector(".sf-dl-btn")) {
                        var a = f.a.create("button", {
                            id: k.btnId,
                            class: [ "sf-dl-btn" ],
                            title: o.a.i18n.getMessage("download"),
                            append: [ f.a.create("span", {
                                append: [ n.svg.getSvg("download", "#000") ]
                            }), f.a.create("style", {
                                text: Object(d.a)({
                                    selector: ".sf-dl-btn",
                                    style: {
                                        display: "block",
                                        border: 0,
                                        borderRadius: "50%",
                                        cursor: "pointer",
                                        background: "#e8e8e8",
                                        minWidth: "40px",
                                        maxWidth: "40px",
                                        height: "40px",
                                        alignSelf: "center"
                                    },
                                    append: {
                                        selector: "span",
                                        style: {
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            marginRight: "auto",
                                            marginLeft: "auto",
                                            width: "16px",
                                            height: "16px"
                                        }
                                    }
                                })
                            }) ],
                            on: [ "click", async function(e) {
                                e.preventDefault(), e.stopPropagation();
                                if (k.contextMenu && k.contextMenu.isShow) k.hideMenu(); else {
                                    var a = o.a.i18n.getMessage("download") + " ...";
                                    try {
                                        const e = v.a.getPageType(window.location.href);
                                        var r = k.contextMenu = n.popupMenu.quickInsert(this, a, "sf-popupMenu");
                                        const o = await g.a.createLinkExtractor(e).extractLinks({
                                            initData: t
                                        });
                                        r.update(o.map(e => ({
                                            ext: e.ext,
                                            forceDownload: e.forceDownload,
                                            format: e.format,
                                            href: e.url,
                                            quality: e.quality,
                                            title: e.filename,
                                            func: t => {
                                                e.func && e.func(t);
                                            }
                                        })));
                                    } catch (e) {
                                        y.debug("Load links error", e), r.update(o.a.i18n.getMessage("noLinksFound"));
                                    }
                                }
                            } ]
                        });
                        l.a.onRemoveEvent(a, t => {
                            e.dataset.sfSkip = 0, document.body.contains(e) && this.mutationMode.observer.trigger(e);
                        }), e.appendChild(a);
                    }
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(c.a)(e), o = document.querySelectorAll("[" + n + "]"), a = 0; t = o[a]; a++) t.removeAttribute(n);
                        }));
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        this.observer = new b.a({
                            queries: [ {
                                css: m.dailymotion.video,
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    k.insertBtn(t));
                                }
                            }, {
                                css: "." + l.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) l.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                }
            };
        }), (function() {
            if (!Object(i.a)()) return !0;
            if (/\/embed\/([\w\-]+)/i.test(location.href)) {
                let e = !1;
                try {
                    e = location.hostname === window.parent.location.hostname;
                } catch (e) {}
                return !e;
            }
        }));
    }
});