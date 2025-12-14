!function(e) {
    function t(t) {
        for (var o, i, s = t[0], u = t[1], c = t[2], d = 0, f = []; d < s.length; d++) i = s[d], 
        Object.prototype.hasOwnProperty.call(r, i) && r[i] && f.push(r[i][0]), r[i] = 0;
        for (o in u) Object.prototype.hasOwnProperty.call(u, o) && (e[o] = u[o]);
        for (l && l(t); f.length; ) f.shift()();
        return a.push.apply(a, c || []), n();
    }
    function n() {
        for (var e, t = 0; t < a.length; t++) {
            for (var n = a[t], o = !0, s = 1; s < n.length; s++) {
                var u = n[s];
                0 !== r[u] && (o = !1);
            }
            o && (a.splice(t--, 1), e = i(i.s = n[0]));
        }
        return e;
    }
    var o = {}, r = {
        12: 0
    }, a = [];
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
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], u = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var c = 0; c < s.length; c++) t(s[c]);
    var l = u;
    a.push([ 112, 0 ]), n();
}({
    112: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(0), r = n(9), a = n(18), i = n(30), s = (n(31), n(24)), u = n(12), c = n(19), l = n(3), d = n(1), f = n(20), p = n(11);
        f.a.isSingle() && Object(a.b)("rutube", (function(e, t) {
            const n = Object(r.a)(t);
            var a = t.preferences, f = a.moduleRutube ? 1 : 0;
            const {selectorsConfig: h} = t.preferences, b = Object(i.a)();
            o.a.onMessage.addListener((function(t, n, o) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return o({
                        state: f,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return m.changeState(t.state);
                }
                if ("updatePreferences" !== t.action) {
                    if (f) return "updateLinks" === t.action ? m.updateLinks() : void 0;
                } else Object.assign(a, t.preferences);
            })), f && setTimeout((function() {
                m.run();
            }));
            const m = {
                buttonClassName: "sf-button",
                contextMenu: null,
                run() {
                    if (f = 1, b) return m.frame();
                    p.a.isAvailable() && m.mutationMode.enable();
                },
                changeState: function(e) {
                    f = e, this.hideMenu(), this.rmDlLinks(), this.mutationMode.stop(), e && this.run();
                },
                hideMenu() {
                    m.contextMenu && (m.contextMenu.hide(), m.contextMenu = null);
                },
                updateLinks() {
                    this.changeState(0), this.changeState(1), n.showLinksUpdatedNotification();
                },
                rmDlLinks() {
                    for (var e, t = document.querySelectorAll("." + this.buttonClassName), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                },
                insertDownloadLink(e) {
                    for (var t, r = e.querySelectorAll("." + this.buttonClassName), a = 0; t = r[a]; a++) t.parentNode.removeChild(t);
                    r = null;
                    var i = function() {
                        var e = location.href;
                        return "ummy" + e.substr(e.indexOf("://"));
                    }, s = i();
                    const u = d.a.create("a", {
                        href: s,
                        className: this.buttonClassName + " video-tools__tools-button",
                        target: "_blank",
                        on: [ [ "click", function(t) {
                            var o;
                            if (t.preventDefault(), t.stopPropagation(), o = i(), s !== o && (s = o, u.href = o), 
                            m.contextMenu && m.contextMenu.isShow) return void m.hideMenu();
                            const r = n.popupMenu.prepareLinks.rutube(i());
                            m.contextMenu = n.popupMenu.quickInsert(this, r, "sf-popupMenu", {
                                parent: Object(c.a)(e, ".b-video__description")
                            });
                        } ] ],
                        append: [ n.svg.getSvg("download", "#6c9b01", 20, 20), d.a.create("span", {
                            text: o.a.i18n.getMessage("download"),
                            style: {
                                color: "#6c9b01"
                            }
                        }) ]
                    });
                    l.a.onRemoveEvent(u, m.hideMenu), e.insertAdjacentElement("afterbegin", u);
                },
                frame() {
                    var e = this, t = n.frameMenu.getBtn({
                        singleBtn: !0,
                        btnId: "sfDlBtn",
                        containerStyle: {
                            right: "50px",
                            top: "6px"
                        },
                        quickBtnStyleObj: {
                            display: "inline-block",
                            border: 0,
                            borderRadius: ".3em",
                            cursor: "pointer",
                            position: "relative",
                            padding: "4px 6px"
                        },
                        quickBtnCssStyle: {
                            backgroundColor: "transparent"
                        },
                        quickBtnIcon: d.a.create(n.svg.getSvg("download", "#ffffff"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "middle"
                            }
                        }),
                        nodeCssStyle: {
                            display: "none"
                        },
                        on: [ [ "click", function(r) {
                            if (r.preventDefault(), r.stopPropagation(), o.a.sendMessage({
                                action: "checkAndOpenProLanding",
                                id: "ru-2"
                            }), e.contextMenu && e.contextMenu.isShow) e.hideMenu(); else {
                                var a = n.popupMenu.prepareLinks.rutube(location.href);
                                e.contextMenu = n.frameMenu.getMenu(this, a, "sf-frame-menu", {
                                    container: t.container,
                                    onShow() {
                                        t.node.classList.add("sf-over");
                                    },
                                    onHide() {
                                        e.contextMenu = null, t.node.classList.remove("sf-over");
                                    }
                                });
                            }
                        } ], [ "mousedown", function(n) {
                            n.stopPropagation(), 2 === n.button && (l.a.off(document.body, "mousemove", s), 
                            e.hideMenu(), t.container.parentNode && t.container.parentNode.removeChild(t.container));
                        } ] ]
                    });
                    t.quickBtn.title = o.a.i18n.getMessage("download"), t.container = d.a.create("div", {
                        class: "sf-btn-ctr",
                        append: t.node
                    }), l.a.on(t.container, "mouseenter", (function() {
                        t.lockHide = !0;
                    })), l.a.on(t.container, "mouseleave", (function() {
                        t.lockHide = !1;
                    }));
                    var r = null, a = !1, i = function() {
                        t.lockHide || (t.container.classList.add("sf-hide-ui"), a = !0);
                    }, s = function() {
                        a && (t.container.classList.remove("sf-hide-ui"), a = !1), clearTimeout(r), r = setTimeout(i, 3e3);
                    };
                    l.a.on(document.body, "mousemove", s), t.node.appendChild(d.a.create("style", {
                        text: Object(u.a)([ {
                            selector: [ "body:hover .sf-btn-ctr:not(.sf-hide-ui) #sfDlBtn", "body:hover .sf-btn-ctr:not(.sf-hide-ui) .sf-frame-menu" ],
                            style: {
                                display: "block"
                            }
                        } ])
                    })), document.body.appendChild(t.container);
                },
                mutationMode: {
                    observer: null,
                    stop() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            let t = Object(s.a)(e), n = document.querySelectorAll("[" + t + "]");
                            for (let e, o = 0; e = n[o]; o++) e.removeAttribute(t);
                        }));
                    },
                    enable() {
                        if (this.observer) return this.observer.start();
                        this.observer = new p.a({
                            queries: [ {
                                css: h.rutube.videoToolsAdd,
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    m.insertDownloadLink(t));
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
            return Promise.resolve().then(() => {
                if (Object(i.a)()) {
                    let e = !1;
                    try {
                        e = location.hostname === window.parent.location.hostname;
                    } catch (e) {}
                    return !e;
                }
                return !0;
            }).then(e => !!e && o.a.callFn("getPreferences").then(e => !!e.showUmmyItem));
        }));
    }
});