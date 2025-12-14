!function(e) {
    function t(t) {
        for (var r, s, i = t[0], l = t[1], d = t[2], u = 0, f = []; u < i.length; u++) s = i[u], 
        Object.prototype.hasOwnProperty.call(o, s) && o[s] && f.push(o[s][0]), o[s] = 0;
        for (r in l) Object.prototype.hasOwnProperty.call(l, r) && (e[r] = l[r]);
        for (c && c(t); f.length; ) f.shift()();
        return n.push.apply(n, d || []), a();
    }
    function a() {
        for (var e, t = 0; t < n.length; t++) {
            for (var a = n[t], r = !0, i = 1; i < a.length; i++) {
                var l = a[i];
                0 !== o[l] && (r = !1);
            }
            r && (n.splice(t--, 1), e = s(s.s = a[0]));
        }
        return e;
    }
    var r = {}, o = {
        6: 0
    }, n = [];
    function s(t) {
        if (r[t]) return r[t].exports;
        var a = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(a.exports, a, a.exports, s), a.l = !0, a.exports;
    }
    s.m = e, s.c = r, s.d = function(e, t, a) {
        s.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: a
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
        var a = Object.create(null);
        if (s.r(a), Object.defineProperty(a, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var r in e) s.d(a, r, function(t) {
            return e[t];
        }.bind(null, r));
        return a;
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
    n.push([ 111, 0 ]), a();
}({
    111: function(e, t, a) {
        "use strict";
        a.r(t);
        var r = a(0), o = a(1), n = a(30), s = a(60), i = a(3), l = a(12), d = a(20), c = a(11), u = a(9), f = a(24), m = a(34), p = a(18), h = a(19), y = a(13), v = a(10), g = a(15), b = a(8);
        d.a.isSingle() && Object(p.b)("instagram", (function(e, t) {
            const a = Object(u.a)(t), n = t.preferences;
            let d = n.moduleInstagram ? 1 : 0;
            const {selectorsConfig: p} = t.preferences, x = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
            r.a.onMessage.addListener((function(t, a, r) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return r({
                        state: d,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return S.changeState(t.state);
                }
                if ("updatePreferences" !== t.action) {
                    if (d) return "updateLinks" === t.action ? S.updateLinks() : void 0;
                } else Object.assign(n, t.preferences);
            })), d && setTimeout((function() {
                S.run();
            })), document.addEventListener("mutationwatcher:hrefchange", () => {
                d && location.href.includes("reels") && S.updateLinks();
            });
            const S = {
                dlBtnClassName: "savefrom-helper--btn",
                styleEl: null,
                run: function() {
                    d = 1, this.insertStyle(), c.a.isAvailable() && this.mutationMode.enable();
                },
                rmStyle: function() {
                    this.styleEl && this.styleEl.parentNode && this.styleEl.parentNode.removeChild(this.styleEl);
                },
                insertStyle: function() {
                    this.styleEl ? this.styleEl.parentNode || document.head.appendChild(this.styleEl) : (this.styleEl = o.a.create("style", {
                        text: Object(l.a)([ {
                            selector: "." + this.dlBtnClassName,
                            style: {
                                display: "none",
                                border: "1px solid #F8F8F8",
                                top: "8px",
                                right: "8px",
                                padding: 0,
                                position: "absolute",
                                backgroundColor: "#F8F8F8",
                                cursor: "pointer",
                                lineHeight: 0
                            }
                        }, {
                            selector: "." + this.dlBtnClassName + " svg",
                            style: {
                                margin: "2px"
                            }
                        }, {
                            selector: "." + this.dlBtnClassName + " svg path",
                            style: {
                                fill: "#777777"
                            }
                        }, {
                            selector: ".Embed ." + this.dlBtnClassName,
                            style: {
                                border: "1px solid #B5B5B5",
                                borderRadius: "4px",
                                padding: "3px"
                            }
                        }, {
                            selector: "." + this.dlBtnClassName + ":hover svg path",
                            style: {
                                fill: "#3f729b"
                            }
                        }, {
                            selector: "." + this.dlBtnClassName + ":active",
                            style: {
                                outline: 0,
                                boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                            }
                        }, {
                            selector: [ "*:hover > ." + this.dlBtnClassName, "*.sf-touch-show > ." + this.dlBtnClassName ],
                            style: {
                                display: "block"
                            }
                        }, {
                            selector: "*.sf-touch-hide > ." + this.dlBtnClassName,
                            style: {
                                display: "none"
                            }
                        } ])
                    }), document.head.appendChild(this.styleEl));
                },
                updateLinks: function() {
                    this.changeState(0), this.changeState(1), a.showLinksUpdatedNotification();
                },
                changeState: function(e) {
                    d = e, this.rmDlBtn(), this.rmStyle(), this.mutationMode.stop(), e && this.run();
                },
                rmDlBtn: function() {
                    const e = document.querySelectorAll("." + this.dlBtnClassName);
                    for (let t, a = 0; t = e[a]; a++) t.parentNode.removeChild(t);
                },
                getDbBtnEl: function(e) {
                    Object(v.a)({
                        category: "append",
                        subcategory: "in",
                        event: "b"
                    });
                    const t = o.a.create("a", {
                        class: [ this.dlBtnClassName ],
                        href: e.url,
                        download: e.filename,
                        title: r.a.i18n.getMessage("download"),
                        style: {
                            position: "absolute",
                            zIndex: 100
                        },
                        on: [ [ "click", k ], [ "mouseover", e => {
                            if (x) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(g.b)(t, {
                                    content: r.a.i18n.getMessage("downloadTitle"),
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {
                                    el: {
                                        className: "mp4",
                                        download: "mp4"
                                    }
                                });
                                Object(g.a)(t, {
                                    content: r.a.i18n.getMessage("downloadTitle"),
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ],
                        append: [ a.svg.getSvg("download", null, 16, 16) ]
                    });
                    return t;
                },
                showOnTouch: function(e, t) {
                    if (e.dataset.sfTouch > 0) return;
                    let a = !1, r = null;
                    const n = function() {
                        a && (clearTimeout(r), r = setTimeout((function() {
                            a && (a = !1, e.classList.remove("sf-touch-show"), e.classList.add("sf-touch-hide"));
                        }), 3e3));
                    };
                    o.a.create(e, {
                        data: {
                            sfTouch: "1"
                        },
                        on: [ [ "touchstart", function(t) {
                            a || (a = !0, e.classList.remove("sf-touch-hide"), e.classList.add("sf-touch-show"));
                        } ], [ "touchend", function(e) {
                            n();
                        } ] ]
                    });
                },
                addDlBtn: async function(e, t, a, r) {
                    if (a.querySelector(".sf--story-container")) return;
                    const n = "embed" === t;
                    let l, d = e, c = null, u = null, f = 0;
                    if (r && (f = Array.from(r.children).findIndex(e => e.classList.contains("_acnf")), 
                    f = -1 === f ? 0 : f), u = null, e.classList.add("sf-root-media-container"), e.style.position = "relative", 
                    u = e.querySelector("div > div > video"), u) {
                        var p, h;
                        c = null;
                        let e = null === (p = u) || void 0 === p ? void 0 : p.closest("article");
                        var y;
                        if (!e) e = null === (y = u) || void 0 === y ? void 0 : y.closest("section.x78zum5.xdt5ytf.x1iyjqo2.xg6iff7");
                        const [t] = await b.a.createLinkExtractor("ig-post-video").extractLinks({
                            element: u
                        });
                        c = t;
                        const a = this.getDbBtnEl(c), r = null === (h = e) || void 0 === h ? void 0 : h.querySelectorAll("a.savefrom-helper--btn");
                        if (r && r.length > 0) r.forEach(e => {
                            e.parentNode.firstChild.querySelector("img") || (e.href = c.url, e.download = c.filename);
                        }); else if (e) {
                            e.querySelector("div.sf-root-media-container").appendChild(a);
                        }
                    }
                    if (!c) if (n) {
                        if (l = d.querySelector(".EmbedFrame img.EmbeddedMediaImage"), l) {
                            const [e] = await b.a.createLinkExtractor("ig-post-photo").extractLinks({
                                element: l
                            });
                            c = e;
                        }
                    } else if (l = d.querySelector("div > img[src][srcset]"), l) {
                        const [e] = await b.a.createLinkExtractor("ig-post-photo").extractLinks({
                            element: l
                        });
                        c = e;
                    } else {
                        if (l = d.querySelector("div > img"), l) {
                            const [e] = await b.a.createLinkExtractor("ig-post-photo").extractLinks({
                                element: l
                            });
                            c = e;
                        }
                        if (l && ("hidden" === l.style.visibility || !l.src)) {
                            const r = new m.a({
                                target: l,
                                attrs: [ {
                                    name: "src",
                                    callback: o => {
                                        o.value && (this.addDlBtn(e, t, a), r.stop());
                                    }
                                } ]
                            });
                        }
                    }
                    if (!c) return;
                    const v = this.getDbBtnEl(c);
                    let g = "", x = null;
                    l ? (g = "image", x = l) : (g = "video", x = u);
                    const k = new m.a({
                        target: x,
                        attrs: [ {
                            name: "src",
                            callback: async e => {
                                if (e.value !== c.url) {
                                    if (c = null, "image" === g) {
                                        const [e] = await b.a.createLinkExtractor("ig-post-photo").extractLinks({
                                            element: x
                                        });
                                        c = e;
                                    }
                                    c && v.parentNode ? (v.href = c.url, v.download = c.filename) : k.stop();
                                }
                            }
                        } ]
                    });
                    if (i.a.onRemoveEvent(x, (function() {
                        Object(s.a)(document.body, a) && (a.dataset.sfSkip = 0, S.mutationMode.observer.trigger(a));
                    })), n) {
                        const e = document.querySelector(".Header");
                        e && (d = e, o.a.create(v, {
                            style: {
                                position: "relative",
                                zIndex: 100,
                                display: "block",
                                left: "auto",
                                top: "auto",
                                marginLeft: "10px"
                            }
                        }));
                    }
                    "article" === d.tagName.toLowerCase() || "div" === d.tagName.toLowerCase() && d.classList.contains("x9f619") || d.appendChild(v), 
                    this.showOnTouch(d, v);
                },
                addBtnVideoStory(e) {
                    if (!e) return;
                    const t = e.closest("section").querySelector("div.x5yr21d.x1n2onr6.xh8yej3:has(video)");
                    if (!t) return;
                    const a = t.querySelectorAll(".savefrom-helper--btn");
                    a && a.length && a.length > 0 && a.forEach(e => e.remove());
                    let r = 0;
                    const o = t.querySelector("div.x1ned7t2.x78zum5");
                    o && (r = Array.from(o.children).findIndex(e => "DIV" === e.tagName && "" !== e.innerHTML.trim())), 
                    setTimeout(async () => {
                        const [{url: e, filename: a}] = await b.a.createLinkExtractor("ig-story-video").extractLinks({
                            elementIndex: r
                        }), o = S.createStoryButton(e, a);
                        o.addEventListener("click", k);
                        const n = S.createStoryContainerForVideo(t);
                        n.appendChild(o), t.appendChild(n), t.addEventListener("mouseover", () => {
                            o.style.display = "block";
                        }), t.addEventListener("mouseleave", () => {
                            o.style.display = "none";
                        });
                    }, 100);
                },
                addBtnImage(e, t) {
                    if (!t) return;
                    const a = S.createImgStoryContainer(t);
                    setTimeout(async () => {
                        const [{url: r, filename: o}] = await b.a.createLinkExtractor("ig-story-photo").extractLinks({
                            element: e
                        }), n = S.createStoryButton(r, o);
                        n.addEventListener("click", k), a.appendChild(n), t.appendChild(a), t.addEventListener("mouseover", () => {
                            n.style.display = "block";
                        }), t.addEventListener("mouseleave", () => {
                            n.style.display = "none";
                        });
                    }, 100);
                },
                addBtnImageStory(e) {
                    let t = document.querySelector("section > div > header, a > img");
                    if (!t) return;
                    "img" === t.tagName.toLowerCase() && (t = t.parentNode.parentNode.parentNode.parentNode);
                    const a = S.createStoryContainer(t);
                    setTimeout(async () => {
                        const [{url: t, filename: r}] = await b.a.createLinkExtractor("ig-story-photo").extractLinks({
                            element: e
                        }), o = S.createStoryButton(t, r);
                        o.addEventListener("click", k), a.appendChild(o);
                    }, 100);
                },
                createStoryContainerForVideo(e) {
                    if (!e) return;
                    let t = e.querySelector(".sf--story-container");
                    t && t instanceof Node && t.remove();
                    return o.a.create("div", {
                        className: "sf--story-container",
                        style: {
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "10px",
                            position: "absolute",
                            top: 0,
                            right: 0
                        }
                    });
                },
                createImgStoryContainer(e) {
                    if (!e) return;
                    let t = e.querySelector(".sf--story-container");
                    if (t) return t;
                    return o.a.create("div", {
                        className: "sf--story-container",
                        style: {
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "10px",
                            position: "absolute",
                            top: 0,
                            right: 0
                        }
                    });
                },
                createStoryContainer(e) {
                    if (!e) return;
                    let t = document.querySelector(".sf--story-container");
                    t && t.remove();
                    const a = o.a.create("div", {
                        className: "sf--story-container"
                    }), r = document.querySelector("header > div:nth-child(2) > div:nth-child(2)");
                    if (!r) return e.appendChild(a), a;
                    const n = r.querySelector("button");
                    return n ? r.insertBefore(a, n) : e.appendChild(a), a;
                },
                createStoryButton(e, t) {
                    Object(v.a)({
                        category: "append",
                        subcategory: "in",
                        event: "b"
                    });
                    const n = o.a.create("a", {
                        className: "sf--story-btn",
                        append: [ a.svg.getSvg("download", "white", 15, 15) ],
                        download: t,
                        href: e,
                        style: {
                            display: "none",
                            cursor: "pointer",
                            marginRight: "2px",
                            marginTop: "2px"
                        },
                        on: [ "mouseover", e => {
                            if (x) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(g.b)(n, {
                                    content: r.a.i18n.getMessage("downloadTitle"),
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {
                                    el: {
                                        className: "story"
                                    }
                                });
                                Object(g.a)(n, {
                                    content: r.a.i18n.getMessage("downloadTitle"),
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ]
                    });
                    return n;
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            const t = Object(f.a)(e), a = document.querySelectorAll("[" + t + "]");
                            for (let e, r = 0; e = a[r]; r++) e.removeAttribute(t);
                        }));
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        const e = e => [ "x1lliihq", "x1qjc9v5" ].some(t => e.classList.contains(t));
                        this.observer = new c.a({
                            queries: [ {
                                css: p.instagram.story,
                                is: "added",
                                callback(e) {
                                    let {added: t} = e;
                                    const a = () => {
                                        document.querySelectorAll(".sf--story-btn").forEach(e => e.remove());
                                    }, r = () => {
                                        document.querySelectorAll(".sf--story-container").forEach(e => e.remove());
                                    };
                                    t.forEach(e => {
                                        const t = e.closest("div video.x1lliihq.x5yr21d.xh8yej3"), o = e.querySelector("div video"), n = e.closest("div:has(div.x6s0dn4.x1lq5wgf.xgqcy7u.x30kzoy.x9jhf4c.x78zum5.xdt5ytf.x5yr21d.xl56j7k.x6ikm8r.x10wlt62.x1n2onr6.xh8yej3)");
                                        let s = "";
                                        n && (s = n.querySelector("img.xl1xv1r.x5yr21d.xmz0i5r.x193iq5w.xh8yej3"));
                                        const i = e.querySelector("div > img");
                                        if (o) return a(), void S.addBtnVideoStory(o);
                                        if (s) {
                                            a(), r();
                                            const t = e.closest("div:has(img)");
                                            if (t.querySelector(".savefrom-helper--btn")) return;
                                            if (!t) return;
                                            S.addBtnImage(s, t);
                                        } else {
                                            if (i) return a(), r(), void S.addBtnImageStory(i);
                                            if (t) return a(), void S.addBtnVideoStory(t);
                                        }
                                    });
                                }
                            }, {
                                css: p.instagram.story2,
                                is: "added",
                                callback: t => {
                                    for (let a, r = 0; a = t.added[r]; r++) a.dataset.sfSkip > 0 || e(a) || (a.dataset.sfSkip = "1", 
                                    S.addDlBtn(a.parentNode, "story2", a));
                                }
                            }, {
                                css: p.instagram.strangeVideo,
                                is: "added",
                                callback: e => {
                                    for (let t, a = 0; t = e.added[a]; a++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    S.addDlBtn(t.parentNode, "strangeVideo", t));
                                }
                            }, {
                                css: p.instagram.story3,
                                is: "added",
                                callback: t => {
                                    for (let a, r = 0; a = t.added[r]; r++) a.dataset.sfSkip > 0 || a.querySelector("ul > li") || e(a) || (a.dataset.sfSkip = "1", 
                                    S.addDlBtn(a.parentNode, "story3", a));
                                }
                            }, {
                                css: p.instagram.reelsModal,
                                is: "added",
                                callback: t => {
                                    let a = document.querySelector("article._aatb._aate._aatg._aath._aati"), r = null;
                                    a && (r = a.querySelector("div.x6s0dn4.x1oozmrk.x1f889gz.xrr41r3.xl56j7k.x47corl.x10l6tqk._acvz._acnc._acng"));
                                    for (let a, o = 0; a = t.added[o]; o++) a.dataset.sfSkip > 0 || a.querySelector("ul > li") || e(a) || (a.dataset.sfSkip = "1", 
                                    S.addDlBtn(a.parentNode, "reelsModal", a, r));
                                    if (!a) return;
                                    if (!r || r.dataset.observerAttached) return;
                                    new MutationObserver(e => {
                                        e.forEach(e => {
                                            "attributes" === e.type && "class" === e.attributeName && e.target.classList.contains("_acnf") && (Array.from(a.children).forEach(e => {
                                                e.matches("a.savefrom-helper--btn") && e.remove();
                                            }), S.addDlBtn(a, "reelsModal", t.added[0], r), Array.from(a.children).forEach(e => {
                                                e.matches("a.savefrom-helper--btn") && e.remove();
                                            }));
                                        });
                                    }).observe(r, {
                                        childList: !0,
                                        subtree: !0,
                                        attributes: !0,
                                        attributeFilter: [ "class" ]
                                    }), r.dataset.observerAttached = "true";
                                }
                            }, {
                                css: p.instagram.reelsModal735,
                                is: "added",
                                callback: e => {
                                    for (let t, a = 0; t = e.added[a]; a++) t.dataset.sfSkip > 0 || t.querySelector("ul > li") || (t.dataset.sfSkip = "1", 
                                    S.addDlBtn(t.parentNode, "reelsModal735", t));
                                }
                            }, {
                                css: p.instagram.videoPostsAndReelNoCarousel,
                                is: "added",
                                callback: t => {
                                    let a = document.querySelector("div.x9f619.x1n2onr6.x1ja2u2z"), r = null;
                                    a && (r = a.querySelector("div.x6s0dn4.x1oozmrk.x4r51d9.xi8xln7.xl56j7k.x47corl.x10l6tqk._acvz._acnc._acng"));
                                    for (let a, o = 0; a = t.added[o]; o++) a.dataset.sfSkip > 0 || a.querySelector("ul > li") || e(a) || (a.dataset.sfSkip = "1", 
                                    S.addDlBtn(a.parentNode, "reelsModal", a, r));
                                    if (!a) return;
                                    if (!r || r.dataset.observerAttached) return;
                                    new MutationObserver(e => {
                                        e.forEach(e => {
                                            "attributes" === e.type && "class" === e.attributeName && e.target.classList.contains("_acnf") && (Array.from(a.children).forEach(e => {
                                                e.matches("a.savefrom-helper--btn") && e.remove();
                                            }), S.addDlBtn(a, "reelsModal", t.added[0], r), Array.from(a.children).forEach(e => {
                                                e.matches("a.savefrom-helper--btn") && e.remove();
                                            }));
                                        });
                                    }).observe(r, {
                                        childList: !0,
                                        subtree: !0,
                                        attributes: !0,
                                        attributeFilter: [ "class" ]
                                    }), r.dataset.observerAttached = "true";
                                }
                            }, {
                                css: p.instagram.videoPostsCarouselCatalog,
                                is: "added",
                                callback: e => {
                                    let {added: t} = e;
                                    for (let e, a = 0; e = t[a]; a++) "1" !== e.dataset.sfSkip && (e.dataset.sfSkip = "1", 
                                    S.addDlBtn(e.parentNode, "videoPostsCarouselCatalog", e));
                                }
                            }, {
                                css: p.instagram.summary,
                                is: "added",
                                callback: e => {
                                    for (let t, a = 0; t = e.added[a]; a++) t.dataset.sfSkip > 0 || t.querySelector("ul > li") || (t.dataset.sfSkip = "1", 
                                    S.addDlBtn(t.parentNode, "summary", t));
                                }
                            }, {
                                css: p.instagram.embed,
                                is: "added",
                                callback: e => {
                                    for (let t, a = 0; t = e.added[a]; a++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(h.a)(t, ".Embed");
                                        e && (e.dataset.sfSkip = "1", S.addDlBtn(e, "embed", e));
                                    }
                                }
                            }, {
                                css: p.instagram.embed2,
                                is: "added",
                                callback: e => {
                                    for (let t, a = 0; t = e.added[a]; a++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(h.a)(t, ".Embed");
                                        if (e && e.dataset.sfSkip > 0) {
                                            const e = document.querySelector(".Header");
                                            e && w(e);
                                        }
                                        S.addDlBtn(t.parentNode, "embed2", t);
                                    }
                                }
                            }, {
                                css: p.instagram.embed3,
                                is: "added",
                                callback: e => {
                                    for (let t, a = 0; t = e.added[a]; a++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    S.addDlBtn(t, "embed", t));
                                }
                            }, {
                                css: "." + i.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, a = 0; t = e.removed[a]; a++) i.a.onRemoveListener(t);
                                }
                            } ],
                            options: {
                                subtree: !0,
                                childList: !0,
                                attributes: !0
                            }
                        });
                    }
                }
            };
            function k(e) {
                return e.stopPropagation(), r.a.isFirefox ? (e.preventDefault(), function(e, t, a) {
                    "sf--story-btn" === a ? Object(v.a)({
                        category: "download",
                        subcategory: "in",
                        event: "story"
                    }) : t.includes("mp4") ? Object(v.a)({
                        category: "download",
                        subcategory: "in",
                        event: "video"
                    }) : Object(v.a)({
                        category: "download",
                        subcategory: "in",
                        event: "photo"
                    });
                    return Object(y.a)({
                        action: "ffInstagramDownloadMedia",
                        downloadFileUrl: e,
                        filename: t
                    });
                }(this.href, this.download)) : a.downloadOnClick(e, void 0, {
                    el: this
                });
            }
            function w(e) {
                const t = e.querySelectorAll("." + S.dlBtnClassName);
                for (let e, a = 0; e = t[a]; a++) e.classList.remove(i.a.onRemoveClassName), e.parentNode.removeChild(e);
            }
        }), (function() {
            return !Object(n.a)() || !!/\/\/[^\/]+\.[^\/]+\/p\//.test(location.href);
        }));
    }
});