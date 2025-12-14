!function(e) {
    function t(t) {
        for (var r, i, l = t[0], s = t[1], d = t[2], u = 0, f = []; u < l.length; u++) i = l[u], 
        Object.prototype.hasOwnProperty.call(n, i) && n[i] && f.push(n[i][0]), n[i] = 0;
        for (r in s) Object.prototype.hasOwnProperty.call(s, r) && (e[r] = s[r]);
        for (c && c(t); f.length; ) f.shift()();
        return a.push.apply(a, d || []), o();
    }
    function o() {
        for (var e, t = 0; t < a.length; t++) {
            for (var o = a[t], r = !0, l = 1; l < o.length; l++) {
                var s = o[l];
                0 !== n[s] && (r = !1);
            }
            r && (a.splice(t--, 1), e = i(i.s = o[0]));
        }
        return e;
    }
    var r = {}, n = {
        4: 0
    }, a = [];
    function i(t) {
        if (r[t]) return r[t].exports;
        var o = r[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
    }
    i.m = e, i.c = r, i.d = function(e, t, o) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: o
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
        var o = Object.create(null);
        if (i.r(o), Object.defineProperty(o, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var r in e) i.d(o, r, function(t) {
            return e[t];
        }.bind(null, r));
        return o;
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
    var l = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], s = l.push.bind(l);
    l.push = t, l = l.slice();
    for (var d = 0; d < l.length; d++) t(l[d]);
    var c = s;
    a.push([ 126, 0 ]), o();
}({
    109: function(e, t, o) {
        "use strict";
        o.r(t);
        var r = o(26), n = o.n(r)()(!1);
        n.push([ e.i, ".VUkNZ--container{display:flex;font-family:inherit;font-weight:600;color:#65676b;line-height:1.6;border-radius:4px;padding:5px 4px;cursor:pointer;background:#e4e6eb}.VUkNZ--container:hover{background-color:#fff}.vRyx2--text{margin-left:4px}.BXrR8--circle-container{padding:0;border-radius:100%;width:40px;height:40px;background:#e4e6eb}.BXrR8--circle-container:hover{background-color:#fff}.BXrR8--circle-container .J6uYv--logo{margin:0 auto;max-width:20px}", "" ]), 
        n.locals = {
            container: "VUkNZ--container",
            text: "vRyx2--text",
            "circle-container": "BXrR8--circle-container",
            circleContainer: "BXrR8--circle-container",
            logo: "J6uYv--logo"
        }, t.default = n;
    },
    126: function(e, t, o) {
        "use strict";
        o.r(t);
        var r = o(17), n = o(0), a = o(9), i = o(18), l = o(31), s = o(27), d = o(24), c = o(12), u = o(23), f = o(19), p = o(3), h = o(1), m = o(16), v = o(6), g = o(7), b = o(20), y = o(11), k = o(14), w = o(2), x = o(84), S = o.n(x), O = o(29), M = o(22), j = o.n(M);
        const L = Object(a.a)().svg.getSrc("download", "#84bd07");
        var B = w.c.memo(e => {
            let {classes: t = [], isIcon: o = !0, isText: r = !0, isCircle: a = !1, onClick: i} = e;
            const l = Object(O.a)(S.a);
            return w.c.createElement("div", {
                className: j()(...t, l.container, a && l.circleContainer),
                onClick: i
            }, o && w.c.createElement("img", {
                src: L,
                className: l.logo
            }), r && w.c.createElement("span", {
                className: l.text
            }, n.a.i18n.getMessage("download")));
        }), P = o(5), F = o(10), C = o(15), E = o(8);
        function N(e, t) {
            var o = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var r = Object.getOwnPropertySymbols(e);
                t && (r = r.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), o.push.apply(o, r);
            }
            return o;
        }
        function D(e) {
            for (var t = 1; t < arguments.length; t++) {
                var o = null != arguments[t] ? arguments[t] : {};
                t % 2 ? N(Object(o), !0).forEach((function(t) {
                    Object(r.a)(e, t, o[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(o)) : N(Object(o)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(o, t));
                }));
            }
            return e;
        }
        const I = o(35), q = Object(g.a)("facebook_com"), V = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        let _;
        b.a.isSingle() && Object(i.b)("facebook", (function(e, t) {
            const o = Object(a.a)(t);
            var r = t.preferences, i = r.moduleFacebook ? 1 : 0;
            const {selectorsConfig: g} = t.preferences;
            n.a.onMessage.addListener((function(t, n, a) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return a({
                        state: i,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return b.changeState(t.state);
                }
                "updatePreferences" !== t.action ? i && "updateLinks" === t.action && (b.changeState(0), 
                b.changeState(1), o.showLinksUpdatedNotification()) : Object.assign(r, t.preferences);
            })), i && setTimeout((function() {
                b.run();
            }));
            var b = {
                contextMenu: null,
                className: "savefrom_fb_download",
                isMutation: !1,
                run: function() {
                    if (i = 1, M.addStyle(), O.injectStyle(), y.a.isAvailable()) return this.isMutation = !0, 
                    this.initEmbedDownloader(), void this.mutationMode.enable();
                },
                changeState: function(e) {
                    b.hideMenu(), i = e, w.disable(), O.rmCurrentPhotoBtn(), O.rmDataAttrs(), M.rmBtn(), 
                    S.rmBtn(), b.mutationMode.stop(), e && b.run();
                },
                initEmbedDownloader: function() {
                    o.addStyleRules("." + o.embedDownloader.linkClass + " img", {
                        opacity: ".5"
                    }), o.embedDownloader.init();
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, o = Object(d.a)(e), r = document.querySelectorAll("[" + o + "]"), n = 0; t = r[n]; n++) t.removeAttribute(o);
                        }));
                    },
                    wrapVideoGetLinks: function(e) {
                        switch (e.tagName) {
                          case "EMBED":
                            S.getLinksFromEmbed(e, (function(e) {
                                S.appendLinks(e && e.links);
                            }));
                            break;

                          case "VIDEO":
                            S.getLinksFromVideo(e, (function(e) {
                                S.appendLinks(e && e.links);
                            }));
                        }
                    },
                    wrapVideoFeedOnLinkHover: function() {
                        i && M.onLinkHover.apply(this);
                    },
                    wrapPhotoOnHover: function(e) {
                        i && O.addCurrentDlBtn(this);
                    },
                    wrapExternalMediaMouseEnter: function() {
                        if (i) {
                            this.dataset[w.linkDataAttr] ? clearTimeout(w.timer) : w.handle(this) ? (w.lastLink && w.lastLink !== this && w.removeBtn(w.lastLink), 
                            o.embedDownloader.hidePanel(), w.lastLink = this) : (p.a.off(this, "mouseenter", b.mutationMode.wrapExternalMediaMouseEnter), 
                            p.a.off(this, "mouseleave", b.mutationMode.wrapExternalMediaMouseLeave));
                        }
                    },
                    wrapExternalMediaMouseLeave: function() {
                        if (i) {
                            var e = this;
                            e.dataset[w.linkDataAttr] && (clearTimeout(w.timer), w.timer = setTimeout((function() {
                                w.removeBtn(e);
                            }), 1500));
                        }
                    },
                    wrapExternalMedia: function(e) {
                        p.a.on(e, "mouseenter", b.mutationMode.wrapExternalMediaMouseEnter), p.a.on(e, "mouseleave", b.mutationMode.wrapExternalMediaMouseLeave);
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        const e = (e, t) => {
                            if (!(window.location.href.includes("/watch?") && e.ariaLabel || (e.dataset.sfReady && window.location.href.includes("/watch?") && !e.dataset.waRep && e.removeAttribute("data-sf-ready"), 
                            e.dataset.sfReady))) return e.dataset.sfReady = "1", t(e);
                        };
                        this.observer = new y.a({
                            queries: [ {
                                css: g.facebook.homePage,
                                is: "added",
                                callback: t => {
                                    let {added: o} = t;
                                    const r = /\/watch/.test(location.href);
                                    o.forEach(t => e(t, () => r ? M.addButtonForWatchPage(t) : t.closest('[role="article"]') ? M.addButtonForFeedPage(t) : void 0));
                                }
                            }, {
                                css: g.facebook.watchPage,
                                is: "added",
                                callback: t => {
                                    let {added: o} = t;
                                    o.forEach(t => e(t, () => {
                                        M.addHoverButtonForArticleVideo(t);
                                    }));
                                }
                            }, {
                                css: g.facebook.feedBtn,
                                is: "added",
                                callback: t => {
                                    let {added: o} = t;
                                    o.forEach(t => e(t, () => {
                                        if (!t.closest('a[aria-label*="Reels"]')) return O.addButtonForArticleImage(t);
                                    }));
                                }
                            }, {
                                css: g.facebook.videoDetail,
                                is: "added",
                                callback: t => {
                                    let {added: o} = t;
                                    o.forEach(t => e(t, () => {
                                        M.addButtonForShowPageVideo(t);
                                    }));
                                }
                            }, {
                                css: g.facebook.hoverReelVideo,
                                is: "added",
                                callback: t => {
                                    let {added: o} = t;
                                    o.forEach(t => e(t, () => M.addButtonForReelVideo(t)));
                                }
                            }, {
                                css: g.facebook.hoverReelVideoDetail,
                                is: "added",
                                callback: t => {
                                    let {added: o} = t;
                                    o.forEach(t => e(t, () => {
                                        const e = x.createButton(() => {
                                            const o = S.getVideoIdFromLink(t.href);
                                            o && S.showDownloadMenuByVideoId(e, o);
                                        }, {
                                            preset: "hover"
                                        });
                                        t.appendChild(e);
                                    }));
                                }
                            }, {
                                css: g.facebook.imagesDetail,
                                is: "added",
                                callback: t => {
                                    let {added: o} = t;
                                    o.forEach(t => e(t, () => {
                                        O.addButtonForShowPageImage(t);
                                    }));
                                }
                            }, {
                                css: '.x5yr21d.x1n2onr6.xh8yej3 .x5yr21d.xh8yej3 .x6s0dn4.x78zum5.x5yr21d div[data-pagelet="StoriesCardMedia"]',
                                is: "added",
                                callback: t => {
                                    let {added: o} = t;
                                    o.forEach(t => e(t, () => {
                                        let e = t.querySelector("div video"), o = t.querySelector("div > img");
                                        e ? M.addButtonForStoryVideo(t) : o && O.addButtonForStoryPhoto(t);
                                    }));
                                }
                            }, {
                                css: g.facebook.videoSummary,
                                is: "added",
                                callback: e => {
                                    for (let o, r = 0; o = e.added[r]; r++) {
                                        var t = !1;
                                        Object(u.a)(o, "#fbxPhotoContentContainer .videoStage " + o.tagName) && (t = !0), 
                                        t ? this.wrapVideoGetLinks(o) : p.a.one(o, "mouseenter", this.wrapVideoFeedOnLinkHover);
                                    }
                                }
                            }, {
                                css: g.facebook.photoSummary,
                                is: "added",
                                callback: e => {
                                    for (let r, n = 0; r = e.added[n]; n++) if (b.hideMenu(), !(r.dataset.sfSkip > 0)) {
                                        r.dataset.sfSkip = "1";
                                        var t = o.getParentByClass(r, "stageWrapper");
                                        p.a.one(t, "mouseenter", this.wrapPhotoOnHover);
                                    }
                                }
                            }, {
                                css: g.facebook.externalMediaSummary,
                                is: "added",
                                callback: e => {
                                    for (let t, o = 0; t = e.added[o]; o++) t.sfSkip > 0 || (t.sfSkip = "1", this.wrapExternalMedia(t));
                                }
                            }, {
                                css: "." + p.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, o = 0; t = e.removed[o]; o++) p.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                },
                hideMenu: function() {
                    b.contextMenu && (b.contextMenu.hide(), b.contextMenu = null);
                }
            }, w = {
                linkDataAttr: "savefromEd",
                timer: 0,
                lastLink: null,
                re: [ /https?:\/\/(?:[a-z]+\.)?youtube\.com\/(?:#!?\/)?watch\?[^\s\"\'\<\>]*v=([\w\-]+)/i, /https?:\/\/(?:[a-z0-9]+\.)?youtube\.com\/(?:embed|v)\/([\w\-]+)/i, /https?:\/\/(?:[a-z]+\.)?youtu\.be\/([\w\-]+)/i, /https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/(\d+)(?:\?|$)/i ],
                thumbnail: {
                    youtube: {
                        re: [ /ytimg\.com(?:\/|%2F)vi(?:\/|%2F)([\w\-]+)(?:\/|%2F)/i ],
                        url: "http://www.youtube.com/watch?v={vid}"
                    }
                },
                disable: function() {
                    var e = o.embedDownloader.panel;
                    e && (e.style.display = "none");
                },
                removeBtn: function(e) {
                    if (e && "object" == typeof e) {
                        var t = e.querySelector("." + b.className);
                        t && (t.parentNode.removeAttribute(Object(d.a)(w.linkDataAttr)), t.parentNode.removeChild(t)), 
                        e.removeAttribute(Object(d.a)(w.linkDataAttr)), e == this.lastLink && (this.lastLink = null);
                    }
                },
                checkUrl: function(e, t) {
                    if (!t && e.search(/https?:\/\/([\w\-]+\.)?facebook\.com\/l\.php/i) > -1) return this.checkUrl(decodeURIComponent(e), !0);
                    for (var o = 0, r = this.re.length; o < r; o++) {
                        var n = e.match(this.re[o]);
                        if (n && n.length > 0) return n[0];
                    }
                },
                handle: function(e) {
                    var t = e.querySelector("img");
                    if (t) {
                        var r = t.parentNode;
                        if (t.src && "relative" == o.getStyle(r, "position")) {
                            var n = e.getAttribute("ajaxify");
                            if (n && n.search(/\/flash\/expand_inline/i) > -1) {
                                var a = this.getThumbnailUrl(t.src);
                                if (a) return this.createButton(a, r, e, {
                                    display: "block",
                                    position: "absolute",
                                    bottom: "3px",
                                    right: "3px",
                                    zIndex: 9999,
                                    margin: 0,
                                    width: "16px",
                                    height: "16px"
                                }, {
                                    display: "block"
                                });
                            } else if (this.checkUrl(e.href)) return this.createButton(e.href, r, e, {
                                display: "block",
                                position: "absolute",
                                bottom: "3px",
                                right: "3px",
                                zIndex: 9999,
                                margin: 0,
                                width: "16px",
                                height: "16px"
                            }, {
                                display: "block"
                            });
                        }
                        return !1;
                    }
                    return this.createButton(e.href, e, e);
                },
                getThumbnailUrl: function(e) {
                    for (var t in this.thumbnail) for (var r = 0; r < this.thumbnail[t].re.length; r++) {
                        var n = o.getMatchFirst(e, this.thumbnail[t].re[r]);
                        if (n) return this.thumbnail[t].url.replace(/\{vid\}/gi, n);
                    }
                    return "";
                },
                createButton: function(e, t, r, a, i) {
                    if (!(e = this.checkUrl(e))) return !1;
                    var l = document.createElement("a");
                    l.className = b.className, l.href = "http://savefrom.net/?url=" + encodeURIComponent(e), 
                    l.setAttribute(o.embedDownloader.dataAttr, e), l.title = n.a.i18n.getMessage("download"), 
                    o.setStyle(l, {
                        marginLeft: "7px",
                        verticalAlign: "middle"
                    }), a && o.setStyle(l, a);
                    var s = document.createElement("img");
                    return s.className = "icon", s.src = o.svg.getSrc("download", "#a2db16"), o.setStyle(s, {
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        verticalAlign: "middle",
                        cursor: "pointer"
                    }), i && o.setStyle(s, i), l.appendChild(s), r.dataset[this.linkDataAttr] = 1, t.appendChild(l), 
                    !0;
                }
            };
            const x = {
                createButton(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    const o = {
                        default: {
                            props: {},
                            style: {}
                        },
                        circle: {
                            props: {
                                isText: !1,
                                isCircle: !0
                            },
                            style: {}
                        },
                        withoutText: {
                            props: {
                                isText: !1
                            },
                            style: {}
                        },
                        hover: {
                            className: "sf-hover-container",
                            props: {
                                isText: !1
                            },
                            style: {
                                position: "absolute",
                                top: "8px",
                                left: "8px"
                            }
                        }
                    };
                    let r = t && t.preset ? t.preset : "default", n = o[r] ? o[r] : o.default, {props: a, style: i} = n;
                    t && t.style && (i = Object.assign(i, t.style));
                    const l = h.a.create("div", {
                        class: n.className || "sf-download-container",
                        style: i
                    });
                    return Object(k.a)(Object(P.e)(B, D(D({}, a), {}, {
                        onClick: t => {
                            t.preventDefault(), t.stopPropagation(), e(t);
                        }
                    })), l), l;
                }
            };
            var S = {
                getLinksFromEmbed: function(e, t) {
                    if (!e) return t(null);
                    var o = e.getAttribute("flashvars");
                    if (null === o) return t(null);
                    var r = Object(s.a)(o).params;
                    if (!r) return t(null);
                    var n = null;
                    try {
                        n = JSON.parse(r).video_data;
                    } catch (e) {}
                    if (!n) return t(null);
                    n.progressive && (n = n.progressive);
                    var a = {}, i = {
                        sd_src: "SD",
                        hd_src: "HD"
                    };
                    Array.isArray(n) || (n = [ n ]);
                    for (var l, d = 0; l = n[d]; d++) [ "sd_src", "hd_src" ].forEach((function(e) {
                        l[e] && (a[l[e]] = i[e]);
                    }));
                    return t({
                        links: a
                    });
                },
                getVideoIdFromLink(e) {
                    let t = -1 !== e.indexOf("&") ? e.indexOf("&") : e.length, o = e.match(/videos\/(\d+)/);
                    return o || (o = e.match(/pcb\.\w+\/(.*?)\?/)), !o && e.includes("/watch/?") ? (o = e.substring(34, t), 
                    o) : !o && e.includes("/watch?") ? (o = e.substring(33, 50), o) : (!o && e.includes("permalink&v=") && (o = e.match(/permalink&v=(\d+)/)), 
                    !o && e.includes("/reel/") && (o = e.match(/reel\/(\d+)/)), o && o[1]);
                },
                requestLocalVideoLinks: function(e) {
                    return new Promise((function(e, t) {
                        o.bridge({
                            func: 'function(cb){var err=null;var token=null;try{token=window.require("DTSGInitialData").token}catch(_err){err=_err.message}cb([err,token])}',
                            cb: function(o) {
                                var r = null, n = null;
                                !o || o[0] ? r = new Error("Get token timeout") : n = o[1], r ? t(r) : e(n);
                            }
                        });
                    })).then((function(t) {
                        const o = `https://www.facebook.com/video/tahoe/async/${e}/?${I.stringify({
                            payloadtype: "primary"
                        })}`, r = I.stringify({
                            __a: 1,
                            fb_dtsg: t
                        });
                        return Object(m.a)([ o, r ], 'function(url,data){return fetch(url,{method:"POST",headers:{"content-type":"application/x-www-form-urlencoded"},body:data}).then(function(response){return response.text()})}');
                    })).then((function(t) {
                        return new Promise((function(o, r) {
                            n.a.sendMessage({
                                action: "getFacebookLinksFromData",
                                extVideoId: e,
                                data: t
                            }, (function(e) {
                                e && e.links ? o(e) : r(new Error("Get links from data error"));
                            }));
                        }));
                    })).catch((function(e) {
                        throw q.error("get local links error", e), Object(F.a)({
                            category: "mistake",
                            subcategory: "fa",
                            event: "l"
                        }), e;
                    }));
                },
                requestBgVideoLinks: function(e) {
                    return new Promise((function(t, o) {
                        n.a.sendMessage({
                            action: "getFacebookLinks",
                            extVideoId: e
                        }, (function(e) {
                            e && e.links ? t(e) : o(new Error("Get links error"));
                        }));
                    })).catch((function(e) {
                        throw q.error("get links error", e), e;
                    }));
                },
                requestVideoLinksById: function(e) {
                    return Promise.resolve().then((function() {
                        return S.requestLocalVideoLinks(e);
                    })).catch((function() {
                        return S.requestBgVideoLinks(e);
                    }));
                },
                requestVideoLinks: function(e, t) {
                    return S.requestVideoLinksById(e).then((function(e) {
                        t(e.links, e.title);
                    }), (function(e) {
                        t();
                    }));
                },
                getLinksFromVideo: function(e, t) {
                    if (!e) return t(null);
                    const r = {};
                    var n, a = {}, i = null;
                    if (!i) {
                        let t = Object(f.a)(e, "div[data-ft]");
                        if (t && Object(u.a)(t, ".userContentWrapper[data-ft] " + t.tagName) && (t = Object(f.a)(t, ".userContentWrapper[data-ft]")), 
                        t && (Array.from(t.querySelectorAll("a[href]")).some(e => {
                            const t = /\/videos\/(\d+)/.exec(e.href);
                            if (t) return i = t[1], r.popup_1 = !0, !0;
                        }), !i)) {
                            let e = null;
                            try {
                                e = JSON.parse(t.dataset.ft);
                            } catch (e) {}
                            if (e) {
                                const t = e.mf_story_key, o = e.story_attachment_style;
                                t && "video_inline" === o && (i = t, r.popup_1 = !0);
                            }
                        }
                    }
                    if (!i) {
                        if (Object(f.a)(e, "div._5-yb")) {
                            const e = /\/videos\/(\d+)/.exec(location.href);
                            if (e) {
                                return t({
                                    links: {
                                        id: e[1]
                                    },
                                    popup_1: !0
                                });
                            }
                        }
                    }
                    if (!i) {
                        var s = Object(f.a)(e, ".uiStreamStory[data-story-id]"), d = /:(\d+)$/.exec(s && s.dataset.storyId);
                        (d = d && d[1]) && (i = d);
                    }
                    if (!i && (n = Object(l.a)(e, "fbUserContent"))) {
                        var c = n.querySelector("a[data-video-id]");
                        if (c) (v = c && c.dataset.videoId) && (i = v);
                    }
                    if (!i && (n = Object(f.a)(e, ".userContentWrapper"))) {
                        var p = n.querySelector('div[id^="feed_subtitle_"] a[data-video-channel-id]');
                        if (p) {
                            var h = /\/videos\/(\d+)/.exec(p.href);
                            (v = h && h[1]) && (i = v);
                        } else {
                            var m = n.querySelectorAll('a.profileLink, a[rel="theater"], #fbPhotoSnowliftTimestamp > a[href]'), v = null;
                            [].slice.call(m).some((function(e) {
                                var t = /\/videos\/(\d+)/.exec(e.href);
                                return v = t && t[1];
                            })), v && (i = v);
                        }
                    }
                    if (!i) {
                        var g = !1, b = !1, y = document.getElementById("stream_pagelet"), k = y && y.previousElementSibling;
                        if (k && k.contains(e) && (g = !0), !g) {
                            var w = document.querySelector(".uiStreamStory"), x = w && w.parentNode;
                            (x = x && x.parentNode) && x.contains(e) && (b = !0);
                        }
                        if (g || b) (v = S.getVideoIdFromUrl()) && (i = v);
                    }
                    if (!i && Object(f.a)(e, "#pagelet_group_permalink")) {
                        h = /video_id:"?([^,"]+)/.exec(document.body.innerHTML);
                        (v = h && h[1]) && (i = v);
                    }
                    if (i && (a.id = i), e.src && /^https?:/.test(e.src)) {
                        var O = o.getFileExtension(e.src, "mp4");
                        a[e.src] = O.toUpperCase();
                    }
                    var M = e.querySelectorAll("source");
                    if (M && M.length > 0) for (var j = 0; j < M.length; j++) {
                        O = o.getFileExtension(M[j].src, "mp4");
                        a[M[j].src] = O.toUpperCase();
                    }
                    return Object.keys(a).length ? (r.links = a, t(r)) : t(null);
                },
                getVideoIdFromUrl: function() {
                    var e = null;
                    return o.embedDownloader.hostings.facebook.re.some((function(t) {
                        var o = t.exec(location.href);
                        if (o) return e = o[1], !0;
                    })), e || (e = (e = document.location.href.match(/(\d+).$/)) && e[1] ? e[1] : null), 
                    e;
                },
                getFileName: function(e) {
                    var t = o.getFileName(e);
                    if (t) return t;
                    var r = o.dateToObj();
                    return "facebook_" + (r.year + "-" + r.month + "-" + r.day + "_" + r.hour + "-" + r.min) + "." + o.getFileExtension(e, "mp4");
                },
                prepareLinks: function(e, t) {
                    var o = [];
                    for (var r in e) {
                        var a = this.getFileName(r), i = a.lastIndexOf("."), l = a.substr(i + 1), s = {
                            href: r,
                            title: a = t || a.substr(0, i),
                            format: l.toUpperCase(),
                            quality: e[r],
                            forceDownload: !0
                        };
                        o.push(s);
                    }
                    return 0 === o.length && (o = n.a.i18n.getMessage("noLinksFound")), o;
                },
                appendLinks: function(e) {
                    if (e) {
                        var t = document.getElementById("fbPhotoPageMediaInfo");
                        if (null !== t) {
                            var r = document.querySelector("h2.uiHeaderTitle");
                            if (r && (r = r.textContent), t && !t.querySelector("." + b.className)) {
                                var a = document.createElement("div");
                                a.className = b.className;
                                var i = h.a.create("div", {
                                    title: n.a.i18n.getMessage("download"),
                                    style: {
                                        display: "inline-block",
                                        width: "16px",
                                        height: "16px",
                                        backgroundImage: "url(" + o.svg.getSrc("download", "#a2db16") + ")",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center center",
                                        verticalAlign: "middle",
                                        cursor: "pointer"
                                    }
                                });
                                a.appendChild(i);
                                var l = null;
                                i.addEventListener("click", (function() {
                                    if (b.contextMenu && b.contextMenu.isShow) b.hideMenu(); else {
                                        var t = b.contextMenu = o.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + " ...", b.className + "_popup");
                                        if (l) t.update(l); else if (e.id) {
                                            var a = e.id;
                                            delete e.id, S.requestVideoLinks(a, (function(r, n) {
                                                l = r ? o.popupMenu.prepareLinks.facebook(r, n) : S.prepareLinks(e), t.update(l);
                                            }));
                                        } else l = S.prepareLinks(e, r), t.update(l);
                                    }
                                })), t.appendChild(a), t = null, a = null, i = null;
                            }
                        }
                    }
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll("." + b.className), o = 0; e = t[o]; o++) e.parentNode.removeChild(e);
                },
                showDownloadMenuByVideoId(e, r) {
                    if (b.contextMenu && b.contextMenu.isShow) return void b.hideMenu();
                    const a = b.contextMenu = o.popupMenu.quickInsert(e, n.a.i18n.getMessage("download") + " ...", b.className + "_popup");
                    E.a.createLinkExtractor("fb-video").extractLinks({
                        mediaId: r,
                        initData: t
                    }).then(e => a.update(function(e) {
                        return JSON.parse(JSON.stringify(e)).map(e => (e.href = e.url, e.title = e.filename, 
                        delete e.url, delete e.filename, e));
                    }(e)));
                }
            }, O = {
                style: null,
                getFilenameFromUrl: function(e) {
                    return o.getMatchFirst(e, /\/([^\/]+\.[a-z0-9]{3,4})(?:\?|$)/i);
                },
                getPhotoIdFromUrl: function() {
                    var e = null, t = Object(s.a)(location.href);
                    return t.fbid && (e = t.fbid), e;
                },
                prepPhotoUrl: function(e) {
                    e && (/[?&]dl=1/.test(e) || (e += (/\?/.test(e) ? "&" : "?") + "dl=1"));
                    return e;
                },
                rmCurrentPhotoBtn: function(e) {
                    for (var t, o = void 0, r = document.querySelectorAll(".sf-dl-current-photo-btn"), n = 0; t = r[n]; n++) e && e.contains(t) ? o = t : t.parentNode.removeChild(t);
                    return o;
                },
                injectStyle: function() {
                    this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = h.a.create("style", {
                        text: Object(c.a)({
                            "div > .sf-dl-current-photo-btn": {
                                display: "none",
                                position: "absolute",
                                top: "10px",
                                left: "10px",
                                width: "28px",
                                height: "24px",
                                border: 0,
                                zIndex: 100,
                                cursor: "pointer",
                                backgroundColor: "#000",
                                padding: 0,
                                borderRadius: "2px",
                                opacity: .4,
                                transition: "opacity 100ms linear",
                                lineHeight: 0
                            },
                            "div > .sf-dl-current-photo-btn svg": {
                                margin: "4px"
                            },
                            "div > .sf-dl-current-photo-btn:hover": {
                                opacity: .8
                            },
                            "div > .sf-dl-current-photo-btn:hover svg path": {
                                fill: "#00B75A"
                            },
                            "body:not(.fullScreen) div:hover > .sf-dl-current-photo-btn": {
                                display: "block"
                            }
                        })
                    }), document.head.appendChild(this.style));
                },
                getPhotoUrlFromCtr: function(e) {
                    var t = [], o = e.querySelector("img.spotlight") || e.querySelector("img.fbPhotoImage");
                    return o && t.push(o.src), t;
                },
                getVideoUrlFromPhotoCtr: function(e) {
                    var t = null, o = e.querySelector(".stage .videoStage video");
                    if (o) {
                        var r = Object(f.a)(o, ".fbPhotoSnowliftPopup");
                        if (r) {
                            var n = r.querySelector('div[id^="feed_subtitle_"] a[data-video-channel-id]');
                            if (n) {
                                var a = /\/videos\/(\d+)/.exec(n.href);
                                a && (t = a[1]);
                            }
                        }
                    }
                    return t;
                },
                getLinksFromPhotoCtr: function(e) {
                    return Object(u.a)(e, ".stageWrapper.showVideo") ? Promise.resolve().then((function() {
                        var t = S.getVideoIdFromUrl();
                        if (t || (t = O.getVideoUrlFromPhotoCtr(e)), t) return S.requestVideoLinksById(t);
                    })).then((function(e) {
                        return o.popupMenu.prepareLinks.facebook(e.links, e.title);
                    })) : Promise.resolve().then((function() {
                        var e = O.getPhotoIdFromUrl();
                        if (e) return new Promise((function(t, o) {
                            n.a.sendMessage({
                                action: "getFacebookPhotoUrl",
                                fbid: e
                            }, (function(e) {
                                e && e.length ? t(e) : o(new Error("getFacebookPhotoUrl can't get url"));
                            }));
                        }));
                        throw new Error("Can't get photo id from url");
                    })).catch((function(t) {
                        return O.getPhotoUrlFromCtr(e);
                    })).then((function(e) {
                        if (!e || !e.length) throw new Error("Photo url not found");
                        return e.map((function(e) {
                            var t = O.prepPhotoUrl(e), o = v.a.modify(O.getFilenameFromUrl(t)), r = /(.+)\.([^.]+)$/.exec(o), a = "jpg", i = o;
                            return r && (a = r[1], i = r[2]), {
                                href: t,
                                title: i,
                                quality: n.a.i18n.getMessage("download"),
                                format: " ",
                                ext: a,
                                isBlank: !0
                            };
                        }));
                    }));
                },
                addDlCurrentPhotoBtn: function(e) {
                    if (!this.rmCurrentPhotoBtn(e)) {
                        var t = h.a.create("a", {
                            class: "sf-dl-current-photo-btn",
                            href: "#",
                            title: n.a.i18n.getMessage("download"),
                            append: [ o.svg.getSvg("download", "#FFF", 16) ],
                            on: [ [ "click", function(t) {
                                if (t.stopPropagation(), t.preventDefault(), b.contextMenu && b.contextMenu.isShow) b.hideMenu(); else {
                                    var r = function e(t) {
                                        18 !== t.keyCode && 17 !== t.keyCode && (a.hide(), document.removeEventListener("keydown", e));
                                    }, a = b.contextMenu = o.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                        parent: e,
                                        onShow: function() {
                                            b.isMutation || document.addEventListener("keydown", r);
                                        },
                                        onHide: function() {
                                            b.isMutation || document.removeEventListener("keydown", r);
                                        }
                                    });
                                    O.getLinksFromPhotoCtr(e).then((function(e) {
                                        e.forEach((function(e) {
                                            e.func = function(t) {
                                                t.preventDefault(), o.download(null, e.href), a.hide();
                                            };
                                        })), a.update(e);
                                    })).catch((function(e) {
                                        q.debug("Get photo links error", e), a.update(n.a.i18n.getMessage("noLinksFound"));
                                    }));
                                }
                            } ], [ "mouseover", e => {
                                if (V) {
                                    if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(C.b)(t, {
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    }, {});
                                    Object(C.a)(t, {
                                        defaultWidth: 400,
                                        defaultHeight: 60
                                    });
                                }
                            } ] ]
                        });
                        e.appendChild(t);
                    }
                },
                async addButtonForArticleImage(e) {
                    const r = e.closest("a");
                    if (!r) return;
                    const [n] = await E.a.createLinkExtractor("fb-photo").extractLinks({
                        element: e,
                        initData: t
                    }), a = h.a.create("a", {
                        class: "sf-hover-container",
                        href: n.url,
                        download: n.filename,
                        style: {
                            position: "absolute",
                            top: "8px",
                            left: "8px"
                        },
                        on: [ [ "click", e => {
                            e.stopPropagation(), o.downloadOnClick(e);
                        } ], [ "mouseover", e => {
                            if (V) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(C.b)(a, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {});
                                Object(C.a)(a, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    Object(F.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), Object(k.a)(Object(P.e)(B, {
                        isText: !1
                    }), a), r.appendChild(a);
                },
                async addButtonForShowPageImage(e) {
                    const r = e.closest('div:not([data-visualcompletion="media-vc-image"])').parentElement.parentElement;
                    if (!r) return;
                    const [n] = await E.a.createLinkExtractor("fb-photo").extractLinks({
                        element: e,
                        initData: t
                    }), a = h.a.create("a", {
                        style: {
                            position: "absolute",
                            zIndex: 9999,
                            margin: "15px"
                        },
                        href: n.url,
                        download: n.filename,
                        on: [ [ "click", e => {
                            e.stopPropagation(), o.downloadOnClick(e);
                        } ], [ "mouseover", e => {
                            if (V) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(C.b)(a, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {});
                                Object(C.a)(a, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    Object(F.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), Object(k.a)(Object(P.e)(B, {
                        isText: !1,
                        isCircle: !0
                    }), a), r.prepend(a);
                },
                async addButtonForStoryPhoto(e) {
                    const r = e;
                    if (!r) return;
                    let n = e.querySelector("div >  img");
                    if (!n) return;
                    const [a] = await E.a.createLinkExtractor("fb-story-photo").extractLinks({
                        element: n,
                        initData: t
                    }), i = h.a.create("a", {
                        style: {
                            position: "absolute",
                            zIndex: 9999,
                            margin: "15px",
                            right: "0px",
                            top: "45px"
                        },
                        href: a.url,
                        download: a.filename,
                        on: [ [ "click", e => {
                            e.stopPropagation(), o.downloadOnClick(e);
                        } ], [ "mouseover", e => {
                            if (V) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(C.b)(i, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {});
                                Object(C.a)(i, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    Object(k.a)(Object(P.e)(B, {
                        isText: !1,
                        isCircle: !0
                    }), i), r.prepend(i);
                },
                addCurrentDlBtn: function(e) {
                    e.dataset.sfSkip > 0 || (e.dataset.sfSkip = "1", this.addDlCurrentPhotoBtn(e));
                },
                rmDataAttrs: function() {
                    for (var e, t = Object(d.a)("sfSkip"), o = document.querySelectorAll("*[" + t + "]"), r = 0; e = o[r]; r++) e.removeAttribute(t);
                }
            }, M = {
                style: null,
                addStyle: function() {
                    if (this.style) return void (this.style.parentNode || document.head.appendChild(this.style));
                    this.style = h.a.create("style", {
                        class: "sfFeedStyle",
                        text: Object(c.a)([ {
                            selector: "." + b.className + "-feed.sf-feed",
                            style: {
                                display: "none",
                                width: "20px",
                                height: "20px",
                                padding: 0,
                                position: "absolute",
                                background: "url(" + o.svg.getSrc("download", "#a2db16") + ") center no-repeat transparent",
                                backgroundSize: "16px",
                                top: "5px",
                                left: "5px",
                                zIndex: 1,
                                cursor: "pointer"
                            }
                        }, {
                            selector: 'div[role="dialog"] .' + b.className + "-feed.sf-feed",
                            style: {
                                top: "40px"
                            }
                        }, {
                            selector: "body:not(.fullScreen) div:hover > ." + b.className + "-feed.sf-feed",
                            style: {
                                display: "block"
                            }
                        }, {
                            selector: "." + b.className + "-feed.sf-feed:active",
                            style: {
                                outline: 0
                            }
                        }, {
                            selector: ".sf-hover-container",
                            style: {
                                display: "none"
                            }
                        }, {
                            selector: 'div[role="presentation"]:hover .sf-hover-container, a[role="link"]:hover .sf-hover-container, div[style*="bottom:calc"]:hover .sf-hover-container',
                            style: {
                                display: "block"
                            }
                        } ])
                    }), document.head.appendChild(this.style);
                },
                onDlBtnClick: function(e) {
                    if (e.preventDefault(), e.stopPropagation(), n.a.sendMessage({
                        action: "checkAndOpenProLanding"
                    }), b.contextMenu && b.contextMenu.isShow) b.hideMenu(); else {
                        try {
                            var t = JSON.parse(this.dataset.sfDlLinks);
                        } catch (e) {
                            return;
                        }
                        var r = b.contextMenu = o.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + " ...", b.className + "_popup");
                        if (t.id) {
                            var a = t.id;
                            delete t.id, S.requestVideoLinks(a, (function(e, n) {
                                var a;
                                a = e ? o.popupMenu.prepareLinks.facebook(e, n) : S.prepareLinks(t), r.update(a);
                            }));
                        } else {
                            var i = S.prepareLinks(t);
                            r.update(i);
                        }
                    }
                },
                addDownloadBtn: function(e, t) {
                    var o = e.querySelector("." + b.className + "-feed");
                    o && o.parentNode.removeChild(o), e.appendChild(h.a.create("a", {
                        data: {
                            sfDlLinks: JSON.stringify(t)
                        },
                        title: n.a.i18n.getMessage("download"),
                        class: [ b.className + "-feed", "sf-feed" ],
                        href: "#",
                        on: [ "click", M.onDlBtnClick ]
                    }));
                },
                addButtonForWatchPage(e) {
                    let t = e.closest("._6x84");
                    const o = /\/live/.test(location.href);
                    t || (t = e.closest(".x1n6yrxt, .xvl6max")), !t && o && (t = e.closest(".x1282nqq").parentNode);
                    let r = t.querySelector('a[href*="/videos/"]');
                    if (r || (r = t.querySelector('a[href*="/watch/?"]')), r || (r = {
                        href: window.location.href
                    }), !r || !r.href) return;
                    let n = S.getVideoIdFromLink(r.href);
                    if (!n) return;
                    const a = x.createButton(() => {
                        S.showDownloadMenuByVideoId(a, n);
                    });
                    Object(F.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    });
                    let i = null === t.querySelector('[aria-label="Like"]') ? t.querySelector(".x1u2d2a2") : t.querySelector('[aria-label="Like"]').parentNode;
                    r.href === window.location.href ? (e.dataset.waRep = "1", setTimeout(() => {
                        i.querySelector(".sf-download-container") && _ !== r.href && i.querySelector(".sf-download-container").remove(), 
                        i.prepend(a), _ = r.href;
                    }, 1500)) : (i.querySelector(".sf-download-container") && i.querySelector(".sf-download-container").remove(), 
                    i.prepend(a));
                },
                addButtonForFeedPage(e) {
                    var t;
                    const o = e.closest('[role="article"]');
                    let r = o.querySelector('a[href*="/watch/?v"]');
                    if (r || (r = o.querySelector('a[href*="/videos/"]')), !r) return;
                    let n = r.href, a = S.getVideoIdFromLink(n);
                    if (!a) return;
                    const i = null === o.querySelector('[aria-label="Like"]') ? null === (t = o.querySelector(".x8182xy")) || void 0 === t ? void 0 : t.firstChild : o.querySelector('[aria-label="Like"]').parentNode;
                    if (!i) return;
                    const l = x.createButton(() => {
                        S.showDownloadMenuByVideoId(l, a);
                    }, {
                        preset: "withoutText",
                        style: {
                            alignItems: "center",
                            display: "flex"
                        }
                    });
                    Object(F.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), i.parentElement.insertBefore(l, i);
                },
                addButtonForShowPageVideo(e) {
                    const t = x.createButton(e => {
                        let t = S.getVideoIdFromLink(location.href);
                        t && S.showDownloadMenuByVideoId(e.target, t);
                    }, {
                        preset: "circle",
                        style: {
                            position: "absolute",
                            top: "8px",
                            left: "114px"
                        }
                    });
                    Object(F.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), e.appendChild(t);
                },
                addButtonForReelVideo(e) {
                    if (!e.hasAttribute("data-pagelet")) return;
                    let t = {
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        zIndex: 10
                    }, o = e.querySelector("div[data-video-id]");
                    if (o || (o = e, t = D(D({}, t), {}, {
                        top: "16px"
                    })), !o) return;
                    const r = x.createButton(e => {
                        let t = o.getAttribute("data-video-id");
                        t || (t = S.getVideoIdFromLink(o.getAttribute("href"))), t && S.showDownloadMenuByVideoId(e.target, t);
                    }, {
                        preset: "circle",
                        style: t
                    });
                    Object(F.a)({
                        category: "append",
                        subcategory: "fa",
                        event: "b"
                    }), e.appendChild(r);
                },
                async addButtonForStoryVideo(e) {
                    const r = e.parentNode;
                    if (!r) return;
                    let n = e.parentNode.getAttribute("data-id");
                    if (!n) return;
                    const a = await E.a.createLinkExtractor("fb-story-video").extractLinks({
                        mediaId: n,
                        initData: t
                    }), i = h.a.create("a", {
                        style: {
                            position: "absolute",
                            zIndex: 9999,
                            margin: "15px",
                            right: "0px",
                            top: "45px"
                        },
                        href: a.url,
                        download: a.filename,
                        on: [ [ "click", e => {
                            e.stopPropagation(), o.downloadOnClick(e);
                        } ], [ "mouseover", e => {
                            if (V) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(C.b)(i, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {});
                                Object(C.a)(i, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    Object(k.a)(Object(P.e)(B, {
                        isText: !1,
                        isCircle: !0
                    }), i), r.prepend(i);
                },
                addHoverButtonForArticleVideo(e) {
                    let t = S.getVideoIdFromLink(e.href);
                    if (!t) return;
                    const o = e.closest('[role="article"], ._6x84');
                    if (!o) return;
                    let r = o.querySelector('div[role="presentation"]');
                    if (!r && (r = e.parentNode, !r)) return;
                    const n = x.createButton(e => {
                        S.showDownloadMenuByVideoId(e.target, t);
                    }, {
                        preset: "hover"
                    });
                    r.appendChild(n);
                },
                onLinkHover: function() {
                    var e = this;
                    if (!(this.dataset.hasSfFeedBtn > 1)) {
                        this.dataset.hasSfFeedBtn = "1";
                        var t = this;
                        return "VIDEO" === t.tagName && (t = t.querySelector("embed") || this), new Promise(e => {
                            "EMBED" === t.tagName ? S.getLinksFromEmbed(t, e) : "VIDEO" === t.tagName && S.getLinksFromVideo(t, e);
                        }).catch(e => (q("getLinks error", e), null)).then(t => {
                            const o = t && t.links;
                            if (o) if (t && t.popup_1) M.addDownloadBtn(e.parentNode, o); else if (Object(u.a)(e, ".uiStreamStory " + e.tagName) || Object(u.a)(e, ".fbPhotoSnowliftContainer " + e.tagName)) {
                                Object(f.a)(e, ".fbPhotoSnowliftPopup .stageWrapper") || M.addDownloadBtn(e.parentNode, o);
                            } else {
                                var r = document.getElementById("pagelet_timeline_main_column") || document.getElementById("stream_pagelet") || document.getElementById("mainContainer");
                                if (r && r.contains(e)) M.addDownloadBtn(e.parentNode, o); else {
                                    var n = document.getElementById("stream_pagelet"), a = n && n.previousElementSibling;
                                    if (a && a.contains(e)) M.addDownloadBtn(e.parentNode, o); else {
                                        var i = document.querySelector(".uiStreamStory"), l = i && i.parentNode;
                                        (l = l && l.parentNode) && l.contains(e) && M.addDownloadBtn(e.parentNode, o);
                                    }
                                }
                            } else e.dataset.hasSfFeedBtn = 0;
                        });
                    }
                },
                rmBtn: function() {
                    let e = [ Object(d.a)("hasSfFeedBtn"), Object(d.a)("sfReady") ];
                    const t = e.map(e => `[${e}]`).join(",");
                    document.querySelectorAll(t).forEach(t => {
                        e.forEach(e => t.removeAttribute(e));
                    });
                    const o = [ ".sf-hover-container", ".sf-download-container", "." + b.className + "-feed" ].join(",");
                    document.querySelectorAll(o).forEach(e => {
                        e.parentNode.removeChild(e);
                    });
                }
            };
        }));
    },
    84: function(e, t, o) {
        var r = o(39), n = o(109);
        "string" == typeof (n = n.__esModule ? n.default : n) && (n = [ [ e.i, n, "" ] ]);
        var a, i = 0, l = {
            injectType: "lazyStyleTag",
            insert: "head",
            singleton: !1
        }, s = {};
        s.locals = n.locals || {}, s.use = function() {
            return i++ || (a = r(n, l)), s;
        }, s.unuse = function() {
            i > 0 && !--i && (a(), a = null);
        }, e.exports = s;
    }
});