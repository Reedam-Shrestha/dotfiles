!function(e) {
    function t(t) {
        for (var o, i, s = t[0], l = t[1], d = t[2], u = 0, p = []; u < s.length; u++) i = s[u], 
        Object.prototype.hasOwnProperty.call(a, i) && a[i] && p.push(a[i][0]), a[i] = 0;
        for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (e[o] = l[o]);
        for (c && c(t); p.length; ) p.shift()();
        return r.push.apply(r, d || []), n();
    }
    function n() {
        for (var e, t = 0; t < r.length; t++) {
            for (var n = r[t], o = !0, s = 1; s < n.length; s++) {
                var l = n[s];
                0 !== a[l] && (o = !1);
            }
            o && (r.splice(t--, 1), e = i(i.s = n[0]));
        }
        return e;
    }
    var o = {}, a = {
        20: 0
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
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var d = 0; d < s.length; d++) t(s[d]);
    var c = l;
    r.push([ 125, 0 ]), n();
}({
    125: function(e, t, n) {
        "use strict";
        n.r(t);
        var o = n(17), a = n(0), r = n(9), i = n(18), s = n(30), l = n(31), d = n(27), c = n(24), u = n(40), p = n(12), f = n(23), h = n(19), m = n(57), g = n(33), v = n(21), b = n(3), y = n(1), k = n(49), w = n(6), x = n(13), _ = n(7), S = n(20), A = n(11), L = n(41), M = n(34), O = n(50), C = n(46), P = n(16), q = n(43), B = n(45), N = n(2), j = n(14), I = n(5), D = n(28);
        function R(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), n.push.apply(n, o);
            }
            return n;
        }
        function F(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? R(Object(n), !0).forEach((function(t) {
                    Object(o.a)(e, t, n[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : R(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                }));
            }
            return e;
        }
        const E = Object(r.a)({}).svg.getSrc("download", "#4986cc", "20px");
        var T = N.c.memo(e => {
            let {iframeSrc: t} = e;
            const [n, o] = N.c.useState([]);
            return N.c.useEffect(() => {
                Object(x.a)({
                    action: "showjetFetchMovie",
                    iframeVideoURL: t
                }).then(e => {
                    e = e.map(e => F(F({}, e), {}, {
                        onClick() {
                            Object(j.a)(Object(I.e)(D.a, {
                                filename: w.a.modify(e.filename) + ".mp4",
                                format: "mp4",
                                sources: [ {
                                    url: e.endpoint,
                                    format: "mp4"
                                } ],
                                convertType: "hls"
                            }), "sf-muxer-parent");
                        }
                    })), o(e);
                });
            }, []), N.c.createElement(B.b, {
                items: n,
                theme: B.d
            }, N.c.createElement(B.a, null, N.c.createElement("div", {
                className: "like_btn",
                style: {
                    marginLeft: "14px"
                }
            }, N.c.createElement("img", {
                src: E,
                style: {
                    opacity: .5
                },
                alt: ""
            }), N.c.createElement("div", {
                className: "like_button_label"
            }, a.a.i18n.getMessage("download")))));
        }), V = n(54), H = n(10), U = n(15), z = n(8);
        function $(e, t) {
            var n = Object.keys(e);
            if (Object.getOwnPropertySymbols) {
                var o = Object.getOwnPropertySymbols(e);
                t && (o = o.filter((function(t) {
                    return Object.getOwnPropertyDescriptor(e, t).enumerable;
                }))), n.push.apply(n, o);
            }
            return n;
        }
        function W(e) {
            for (var t = 1; t < arguments.length; t++) {
                var n = null != arguments[t] ? arguments[t] : {};
                t % 2 ? $(Object(n), !0).forEach((function(t) {
                    Object(o.a)(e, t, n[t]);
                })) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n)) : $(Object(n)).forEach((function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                }));
            }
            return e;
        }
        const J = n(35), K = Object(_.a)("vkontakte_ru"), X = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        S.a.isSingle() && Object(i.b)("vk", (function(e, t) {
            const n = Object(r.a)(t);
            var o = t.preferences, i = o.moduleVkontakte ? 1 : 0, _ = a.a.isChrome || a.a.isFirefox || a.a.isGM && a.a.isTM;
            const {selectorsConfig: S} = t.preferences;
            var B = Object(s.a)(), N = !1;
            if (B) if (/\/video_ext\.php\?.+/.test(location.href)) N = !0; else {
                if (!/\/widget_comments\.php\?.+/.test(location.href)) return;
                B = !1;
            }
            a.a.onMessage.addListener((function(t, n, a) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return a({
                        state: i,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return E.changeState(t.state);
                }
                "updatePreferences" !== t.action ? i && ("updateLinks" === t.action && G(), "downloadMP3Files" === t.action && (_ ? te.downloadMP3Files() : te.showListOfAudioFiles(!1)), 
                "downloadPlaylist" === t.action && te.showListOfAudioFiles(!0), "downloadPhotos" === t.action && ae.downloadPhoto()) : Object.assign(o, t.preferences);
            })), i && setTimeout((function() {
                E.run();
            }));
            const R = [], F = {};
            var E = {
                contextMenu: null,
                isMutation: !1,
                run: function() {
                    if (i = 1, /m\.vk\.com/.test(location.hostname)) return re.run();
                    N ? ne.addFrameBtn() : (ae.injectStyle(), A.a.isAvailable() && (E.isMutation = !0, 
                    te.addCustomStyle(), E.mutationMode.enable()));
                },
                changeState: function(e) {
                    B || (i = e, Q(), te.hideLinks(), oe.off(), E.hideMenu(), ae.rmCurrentPhotoBtn(), 
                    te.rmBitrate(), ae.rmPhotoAlbumDlBtn(), E.mutationMode.stop(), e && E.run());
                },
                hideMenu: function() {
                    E.contextMenu && (E.contextMenu.hide(), E.contextMenu = null);
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(c.a)(e), o = document.querySelectorAll("[" + n + "]"), a = 0; t = o[a]; a++) t.removeAttribute(n);
                        }));
                    },
                    wrapNewAudioOnMouseOver: function() {
                        i && te.onNewMouseOver.apply(this, arguments);
                    },
                    wrapNewVoiceOnMouseOver: function() {
                        const e = Object(h.a)(this, ".im-mess");
                        if (e && e.querySelector(".sf-voice-btn") || !i) return;
                        let t = y.a.create("a", {
                            href: this.getAttribute("data-mp3") || "#sf-preload",
                            class: [ te.className, "sf-audio-btn", "sf-voice-btn" ],
                            download: w.a.modify(this.getAttribute("data-mp3")) || "",
                            style: {
                                width: "3px",
                                height: "3px",
                                padding: "0px 9px 9px"
                            },
                            on: [ [ "click", e => {
                                e.stopPropagation(), n.downloadOnClick(e);
                            } ] ]
                        });
                        const o = e.querySelector(".im-mess--actions, .audio-msg-track--duration");
                        Object(H.a)({
                            category: "append",
                            subcategory: "vk",
                            event: "b"
                        }), o && (o.classList.contains("audio-msg-track--duration") && t.classList.add("sf-voice-btn-in-dur"), 
                        o.appendChild(t), e.addEventListener("mouseleave", () => t.style.display = "none"), 
                        e.addEventListener("mouseenter", () => t.style.display = "inline")), n.addStyleRules(`.${te.className}.sf-voice-btn`, {
                            "background-size": "12px !important"
                        }), n.addStyleRules(`.${te.className}.sf-voice-btn-in-dur`, {
                            position: "absolute",
                            top: "23px",
                            right: "-13px"
                        });
                    },
                    wrapVideoFeedOnMouseOver: function() {
                        i && (Object(H.a)({
                            category: "append",
                            subcategory: "vk",
                            event: "b"
                        }), oe.onLinkHover.apply(this, arguments));
                    },
                    onVideoInsert: function(e) {
                        Object(P.a)("function(){return window.mvcur&&window.mvcur.mvData&&window.mvcur.mvData.is_active_live}").then(t => {
                            var o = n.getParentById(e, "mv_box");
                            o || (o = e);
                            var a = ne.getPlayerNode(o);
                            let r = o.querySelector(S.vk.videoPostPanelBtnsList);
                            r || (r = o.querySelector(".PostBottomActionLikeBtns"), ne.newAppendButton2(a, o)), 
                            r && (r.style.position = "relative", o = r, ne.newAppendButton(a, o)), a && !t ? e.closest(".ShortVideoPost") || window.location.href.includes("clip") ? ne.newClipButton(a, o) : ne.newAppendButton(a, o) : e.dataset.sfSkip = 0;
                        });
                    },
                    onVideoChange: async function(e) {
                        if (await Object(P.a)("function(){return window.mvcur&&window.mvcur.mvData&&window.mvcur.mvData.is_active_live}")) return;
                        var t = this;
                        let n = e;
                        if (n = (e.className, e.closest('div[id*="video_box_wrap"]')), n || (n = e), /video_box_wrap-?\d+_-?\d+/.test(n.id) && window.location.href.includes("clip") || /post-?\d+_?\d+/.test(n.id) ? t.onVideoInsert(n) : /video_box_wrap-?\d+_-?\d+/.test(n.id) || t.onVideoInsert(n), 
                        n.sfWatch) t.onVideoInsert(n); else {
                            n.sfWatch = !0;
                            const e = new M.a({
                                attrs: [ {
                                    name: "id",
                                    callback() {
                                        t.onVideoInsert(n);
                                    }
                                } ],
                                target: n
                            });
                            e.trigger(), b.a.onRemoveEvent(n, (function() {
                                e.stop(), n.sfWatch = !1, n.dataset.sfSkip = 0;
                            }));
                        }
                        if (document.querySelector('iframe[src*="showjet"]')) {
                            let e = document.querySelector('iframe[src*="showjet"]');
                            const t = document.createElement("div"), n = document.querySelector(".like_btns");
                            n && (n.insertBefore(t, n.querySelector(".ui_actions_menu_wrap._ui_menu_wrap")), 
                            Object(j.a)(Object(I.e)(T, {
                                iframeSrc: e.src
                            }), t));
                        }
                    },
                    addClipsButton: async function(e) {
                        const o = e.parentNode.parentNode;
                        if (o.querySelector(".savefrom__yt_btn")) return;
                        const r = y.a.create("div", {
                            id: "savefrom__yt_btn",
                            style: {
                                display: "flex",
                                marginLeft: "10px",
                                verticalAlign: "middle",
                                position: "absolute",
                                top: "10px",
                                left: "10px"
                            },
                            append: [ y.a.create("a", {
                                class: "sf-quick-dl-btn",
                                href: "javascript:void(0)",
                                style: {
                                    display: "inline-block",
                                    fontSize: "inherit",
                                    height: "22px",
                                    border: "1px solid #00B75A",
                                    borderRadius: "3px",
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    paddingLeft: "28px",
                                    cursor: "pointer",
                                    verticalAlign: "middle",
                                    position: "relative",
                                    lineHeight: "22px",
                                    textDecoration: "none",
                                    zIndex: 1,
                                    color: "#fff",
                                    marginRight: "8px"
                                },
                                append: [ y.a.create("i", {
                                    style: {
                                        position: "absolute",
                                        display: "inline-block",
                                        left: "6px",
                                        top: "3px",
                                        backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                        backgroundSize: "12px",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        width: "16px",
                                        height: "16px"
                                    }
                                }) ],
                                on: [ [ "click", async function(a) {
                                    if (a.stopPropagation(), b.a.onRemoveEvent(this, E.hideMenu), E.contextMenu && E.contextMenu.isShow) return void E.hideMenu();
                                    E.contextMenu = n.popupMenu.quickInsert(this, "Скачивается...", "sf-single-video-menu", {
                                        parent: o
                                    }, "clips");
                                    const r = function(e) {
                                        return e.map(e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                        e));
                                    }(await z.a.createLinkExtractor("vk-clips").extractLinks({
                                        element: o,
                                        initData: t
                                    }));
                                    if (0 === r.length) return this.href = e.querySelector("video").src, Object(x.a)({
                                        action: "downloadVkStory",
                                        downloadFileUrl: this.href,
                                        fileName: Date.now() + ".mp4"
                                    });
                                    this.href = $(r), this.click(), this.href = "javascript:void(0)", a.preventDefault();
                                } ] ]
                            }), y.a.create("style", {
                                text: Object(p.a)({
                                    selector: "#savefrom__yt_btn",
                                    append: [ {
                                        "button::-moz-focus-inner": {
                                            padding: 0,
                                            margin: 0
                                        },
                                        ".sf-quick-dl-btn": {
                                            backgroundColor: "#00B75A"
                                        },
                                        ".sf-quick-dl-btn:hover": {
                                            backgroundColor: "rgb(0, 163, 80)"
                                        },
                                        ".sf-quick-dl-btn:active": {
                                            backgroundColor: "rgb(0, 151, 74)"
                                        }
                                    }, {
                                        media: "@media screen and (max-width: 1293px)",
                                        append: {
                                            ".sf-quick-dl-btn .sf-btn-name": {
                                                display: "none"
                                            }
                                        }
                                    } ]
                                })
                            }), y.a.create("button", {
                                style: {
                                    position: "relative",
                                    display: "inline-block",
                                    marginLeft: "-2px",
                                    fontSize: "inherit",
                                    height: "24px",
                                    paddingRight: "21px",
                                    backgroundColor: "#F8F8F8",
                                    border: "1px solid #CCCCCC",
                                    borderRadius: "3px",
                                    borderTopLeftRadius: "0",
                                    borderBottomLeftRadius: "0",
                                    cursor: "pointer",
                                    color: "#9B9B9B",
                                    zIndex: 1,
                                    verticalAlign: "middle",
                                    boxSizing: "border-box",
                                    lineHeight: "22px"
                                },
                                on: [ [ "click", async function(e) {
                                    if (e.stopPropagation(), b.a.onRemoveEvent(this, E.hideMenu), E.contextMenu && E.contextMenu.isShow) return void E.hideMenu();
                                    const r = E.contextMenu = n.popupMenu.quickInsert(this, a.a.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                        parent: o
                                    }, "clips");
                                    const i = function(e) {
                                        return e.map(e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                        e));
                                    }(await z.a.createLinkExtractor("vk-clips").extractLinks({
                                        element: o,
                                        initData: t
                                    }));
                                    return r.update(i);
                                } ], [ "mousedown", function(e) {
                                    e.stopPropagation();
                                } ], [ "keydown", function(e) {
                                    e.stopPropagation();
                                } ] ],
                                append: [ y.a.create("i", {
                                    style: {
                                        position: "absolute",
                                        display: "inline-block",
                                        top: "9px",
                                        right: "6px",
                                        border: "5px solid #868282",
                                        borderBottomColor: "transparent",
                                        borderLeftColor: "transparent",
                                        borderRightColor: "transparent"
                                    }
                                }), y.a.create("span", {
                                    text: "HD"
                                }) ]
                            }) ]
                        });
                        o.append(r);
                    },
                    newStoryButton: function(e) {
                        setTimeout(() => {
                            let t = e.querySelector(".stories_item_cont_wrap"), o = t.querySelector(".stories_header_content");
                            const r = y.a.create("div", {
                                id: "savefrom__yt_btn",
                                style: {
                                    display: "flex",
                                    position: "absolute",
                                    right: "0px",
                                    top: "60px",
                                    zIndex: 1e3,
                                    pointerEvents: "auto",
                                    marginLeft: "10px",
                                    verticalAlign: "middle"
                                },
                                append: [ y.a.create("a", {
                                    class: "sf-quick-dl-btn",
                                    style: {
                                        display: "inline-block",
                                        fontSize: "inherit",
                                        height: "22px",
                                        border: "1px solid #00B75A",
                                        borderRadius: "3px",
                                        borderTopRightRadius: 0,
                                        borderBottomRightRadius: 0,
                                        paddingLeft: "28px",
                                        cursor: "pointer",
                                        verticalAlign: "middle",
                                        position: "relative",
                                        lineHeight: "22px",
                                        textDecoration: "none",
                                        zIndex: 1,
                                        color: "#fff",
                                        marginRight: "8px"
                                    },
                                    append: [ y.a.create("i", {
                                        style: {
                                            position: "absolute",
                                            display: "inline-block",
                                            left: "6px",
                                            top: "3px",
                                            backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                            backgroundSize: "12px",
                                            backgroundRepeat: "no-repeat",
                                            backgroundPosition: "center",
                                            width: "16px",
                                            height: "16px"
                                        }
                                    }) ],
                                    on: [ [ "click", async function(e) {
                                        e.preventDefault();
                                        const [n] = await z.a.createLinkExtractor("vk-story").extractLinks({
                                            element: t
                                        });
                                        return a.a.sendMessage({
                                            action: "checkAndOpenProLanding",
                                            id: "vk-1"
                                        }), Object(x.a)({
                                            action: "downloadVkStory",
                                            downloadFileUrl: n.url,
                                            filename: n.filename
                                        });
                                    } ] ]
                                }), y.a.create("style", {
                                    text: Object(p.a)({
                                        selector: "#savefrom__yt_btn",
                                        append: [ {
                                            "button::-moz-focus-inner": {
                                                padding: 0,
                                                margin: 0
                                            },
                                            ".sf-quick-dl-btn": {
                                                backgroundColor: "#00B75A"
                                            },
                                            ".sf-quick-dl-btn:hover": {
                                                backgroundColor: "rgb(0, 163, 80)"
                                            },
                                            ".sf-quick-dl-btn:active": {
                                                backgroundColor: "rgb(0, 151, 74)"
                                            }
                                        }, {
                                            media: "@media screen and (max-width: 1293px)",
                                            append: {
                                                ".sf-quick-dl-btn .sf-btn-name": {
                                                    display: "none"
                                                }
                                            }
                                        } ]
                                    })
                                }) ]
                            }), i = new URLSearchParams(window.location.search).get("w");
                            !o.querySelector("#savefrom__yt_btn") && i && o.append(r);
                        }, 500);
                    },
                    enable: function() {
                        var e = this;
                        if (this.observer) return this.observer.start();
                        const t = t => {
                            for (let n, o = 0; n = t.added[o]; o++) if (!(n.dataset.sfSkip > 0)) {
                                if ("like_cont" === n.className && !window.location.href.includes("clips")) return;
                                n.dataset.sfSkip = "1", e.onVideoChange(n);
                            }
                        }, n = t => {
                            const n = document.querySelector(S.vk.videoPostPanel);
                            n && e.onVideoChange(n);
                            for (let n, o = 0; n = t.added[o]; o++) n = n.parentNode, n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                            e.onVideoChange(n));
                        }, o = e => {
                            for (let t, n = 0; t = e.added[n]; n++) Object(H.a)({
                                category: "append",
                                subcategory: "vk",
                                event: "b"
                            }), t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", b.a.one(t, "mouseenter", E.mutationMode.wrapNewAudioOnMouseOver));
                        };
                        this.observer = new A.a({
                            queries: [ {
                                css: S.vk.chatAudioBtn,
                                is: "added",
                                callback: async e => {
                                    let t = await te.downloadMP3Files("getdlBtnAudio");
                                    const n = document.querySelector(S.vk.chatAudioBtn);
                                    if (!n) return;
                                    const o = new Set, a = [], r = () => {
                                        te.getdlBtnAudio(n, t, o, a);
                                    };
                                    if (r(), n.dataset.observerAttached) return;
                                    let i;
                                    i = new MutationObserver(e => {
                                        let t = !1;
                                        for (const n of e) "childList" === n.type && Array.from(n.addedNodes).some(e => {
                                            var t;
                                            return 1 === e.nodeType && (null === (t = e.classList) || void 0 === t ? void 0 : t.contains("sf-audio-btn"));
                                        }) || ("childList" === n.type && n.addedNodes.length > 0 && (t = !0), "attributes" === n.type && "class" === n.attributeName && (t = !0));
                                        t && (i.disconnect(), r(), i.observe(n, {
                                            childList: !0,
                                            subtree: !0,
                                            attributes: !0,
                                            attributeFilter: [ "class" ]
                                        }));
                                    }), i.observe(n, {
                                        childList: !0,
                                        subtree: !0,
                                        attributes: !0,
                                        attributeFilter: [ "class" ]
                                    }), n.dataset.observerAttached = "true";
                                }
                            }, {
                                css: S.vk.newContentButtonAdd,
                                is: "added",
                                callback: t
                            }, {
                                css: S.vk.storyButtonAdd,
                                is: "added",
                                callback: t => {
                                    for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                    e.newStoryButton(n));
                                }
                            }, {
                                css: S.vk.videoLinkAdd,
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    b.a.one(t, "mouseenter", E.mutationMode.wrapVideoFeedOnMouseOver));
                                }
                            }, {
                                css: S.vk.videoBoxAdd,
                                is: "added",
                                callback: t => {
                                    for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                    e.onVideoChange(n));
                                }
                            }, {
                                css: S.vk.newContentButtonAdd2,
                                is: "added",
                                callback: t
                            }, {
                                css: S.vk.videoPlayerAdd,
                                is: "added",
                                callback: n
                            }, {
                                css: S.vk.videoPlayerAdd2,
                                is: "added",
                                callback: n
                            }, {
                                css: S.vk.videoPostPanel,
                                is: "added",
                                callback: n
                            }, {
                                css: S.vk.photosAdd,
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    ae.addNewPhotoAlbumDlBtn(t));
                                }
                            }, {
                                css: S.vk.photoAreaAdd,
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    ae.addNewDlCurrentPhotoBtn(t));
                                }
                            }, {
                                css: S.vk.audioAdd,
                                is: "added",
                                callback: o
                            }, {
                                css: S.vk.audioAdd2,
                                is: "added",
                                callback: o
                            }, {
                                css: S.vk.audioAdd3,
                                is: "added",
                                callback: o
                            }, {
                                css: S.vk.audioPlaylistAdd,
                                is: "added",
                                callback: o
                            }, {
                                css: S.vk.audioAdd4,
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfSkip > 0 || (t.dataset.sfSkip = "1", 
                                    b.a.one(t, "mouseenter", E.mutationMode.wrapNewVoiceOnMouseOver));
                                }
                            }, {
                                css: '[class*="ClipsCarousel-module__verticalItemWrapper"] video',
                                is: "added",
                                callback: t => {
                                    for (let n, o = 0; n = t.added[o]; o++) e.addClipsButton(n);
                                }
                            }, {
                                css: "." + b.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) b.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                }
            };
            const $ = e => {
                let t = e[0].quality, n = 0;
                for (let o = 0; o < e.length; o++) t < Number(e[o].quality) && (t = e[o].quality, 
                n = o);
                return e[n].href;
            };
            var G = function() {
                E.changeState(0), E.changeState(1), n.showLinksUpdatedNotification();
            }, Q = function() {
                te.lastRow = null;
                for (var e = document.querySelectorAll("a.savefrom_vk_download,div.savefrom_vk_download,span.savefrom_vk_download"), t = e.length - 1; t >= 0; t--) te.elIsHidden(e[t]) && e[t].parentNode.removeChild(e[t]);
            }, Y = function() {
                if (null !== document.querySelector('.page_block_header_inner._header_inner a.ui_crumb[href="/audio"]')) {
                    const e = document.querySelector(".page_block_header_inner._header_inner div.ui_crumb");
                    if (e && e.textContent) return w.a.modify(e.textContent);
                }
                var e = document.title, t = e.indexOf("|");
                return -1 !== t && (e = e.substr(0, t - 1)), w.a.modify(e);
            }, Z = function(e) {
                try {
                    const t = JSON.parse(e).payload[1];
                    return [ null, null, null, null, null, t[0], t[1], null, t[3] ];
                } catch (e) {}
                for (var t = function(e) {
                    return !0 === e ? 1 : parseInt(e) || 0;
                }, n = function(e) {
                    return !0 === e ? 1 : parseFloat(e) || 0;
                }, o = e.split("<!>"), a = o.length - 1; a >= 0; --a) {
                    var r = o[a];
                    if ("<!" == r.substr(0, 2)) {
                        var i = r.indexOf(">"), s = r.substr(2, i - 2);
                        switch (r = r.substr(i + 1), s) {
                          case "json":
                            var l = null;
                            try {
                                l = JSON.parse(r);
                            } catch (e) {}
                            o[a] = l;
                            break;

                          case "int":
                            o[a] = t(r);
                            break;

                          case "float":
                            o[a] = n(r);
                            break;

                          case "bool":
                            o[a] = !!t(r);
                            break;

                          case "null":
                            o[a] = null;
                            break;

                          case "pageview_candidate":
                            o.pop();
                            break;

                          case "debug":
                            o.pop();
                        }
                    }
                }
                return o;
            }, ee = function(e) {
                return /<em>.*<\/em>/.test(e) && (e = e.replace(/<\/?em>/g, "")), e;
            }, te = {
                audioElClassList: [ "audio", "audioRow", "audioRowWall" ],
                lastRow: null,
                className: "savefrom_vk_download",
                cache: {},
                lastValidRequest: null,
                waitUntilUnblock: function(e) {
                    var t = this, n = 10;
                    if (!t.lastValidRequest) return Promise.reject(new Error("Last valid request is empty!"));
                    return function o() {
                        return new Promise((function(e) {
                            setTimeout(e, 15e3);
                        })).then((function() {
                            if (e.abort) throw new Error("Abort");
                            return Object(v.a)(t.lastValidRequest).then((function(e) {
                                if (n--, !Z(e.body)[5]) {
                                    if (n > 0) return o();
                                    throw new Error("Can't request data");
                                }
                            }));
                        }));
                    }().then((function() {
                        return new Promise((function(e) {
                            setTimeout(e, 250);
                        }));
                    }));
                },
                needUnmask: function(e) {
                    var t = /audio_api_unavailable/;
                    return e.some((function(e) {
                        if (t.test(e[2])) return !0;
                    }));
                },
                unmaskUrlViaUtil: function(e) {
                    return te.needUnmask(e) ? Object(P.a)([], "function(){return vk.id}").then(t => {
                        const n = e.map(e => {
                            try {
                                return Array.isArray(e) && e[2] ? (e[2] = O.a(t, e[2]), e) : null;
                            } catch (e) {
                                return K.debug("track decode error: ", e), null;
                            }
                        });
                        return Promise.all(n).then(e => e.filter(e => null !== e));
                    }) : Promise.resolve(e);
                },
                unmaskUrl: function(e) {
                    return te.needUnmask(e) ? Object(P.a)([ e ], 'function(idsArr){var aFail=false;var bFail=false;var cFail=false;var unmaskUrl=function unmaskUrl(url){var _url="";if(!aFail&&window.sfUnmaskUrl){try{_url=window.sfUnmaskUrl(url)}catch(err){aFail=true}}if(!cFail&&!_url&&window.AudioPlayerHTML5){try{var res=null;var r={_isHlsUrl:function _isHlsUrl(url){res=url;return true},_initHls:function _initHls(){}};window.AudioPlayerHTML5.prototype._setAudioNodeUrl.apply(r,[null,url]);_url=res}catch(err){cFail=true}}if(!bFail&&!_url&&window.AudioPlayerFlash){try{var r={};window.AudioPlayerFlash.prototype.setUrl.apply(r,[url]);_url=r._url}catch(err){bFail=true}}if(typeof _url!=="string"){_url=""}return _url};idsArr.forEach(function(item){var url=unmaskUrl(item[2]);if(url){item[2]=url}});return idsArr}').then((function(t) {
                        return t || e;
                    })) : Promise.resolve(e);
                },
                _getNewTrackListByIdsWithActionHash(e) {
                    let t = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : {};
                    let n = 0;
                    const o = {}, a = this.cache, r = e.filter(e => {
                        const t = e.fullId;
                        return !a[t] || (o[t] = a[t], n++, !1);
                    }), i = [];
                    for (;r.length; ) i.push(r.splice(0, 9));
                    const s = e.length;
                    let l = Promise.resolve();
                    i.forEach(e => {
                        l = l.then(() => {
                            const r = () => {
                                if (t.abort) throw new Error("Abort");
                                const r = e.filter(e => e.fullId && e.actionHash && e.urlHash).map(e => e.fullId + "_" + e.actionHash + "_" + e.urlHash), i = {
                                    type: "POST",
                                    headers: {
                                        "Content-Type": "application/x-www-form-urlencoded",
                                        "X-Requested-With": "XMLHttpRequest"
                                    },
                                    data: J.stringify({
                                        act: "reload_audio",
                                        al: 1,
                                        ids: r.join(",")
                                    }),
                                    url: "/al_audio.php",
                                    localXHR: !0
                                };
                                return Object(v.a)(i).then(e => {
                                    const r = Z(e.body)[5];
                                    if (!r || !Array.isArray(r)) throw new Error("Track list is not found!");
                                    return this.lastValidRequest = i, r.forEach(e => {
                                        const t = e[1] + "_" + e[0];
                                        a[t] = e, o[t] = e, n++;
                                    }), t.onProgress && t.onProgress(n, s), new Promise(e => {
                                        setTimeout(e, 250);
                                    });
                                });
                            };
                            let i = 2;
                            const l = () => r().catch(e => {
                                if ("Track list is not found!" === e.message && !t.withoutUnblock) {
                                    if (this.lastValidRequest) return this.waitUntilUnblock(t).then(r);
                                    if (i-- > 0) return new Promise(e => setTimeout(e, 15e3)).then(() => l());
                                }
                                throw e;
                            });
                            return l().catch(e => {
                                "Abort" !== e.message && K.debug("requestIds error!", e);
                            });
                        });
                    }), l = l.then((function() {
                        Object.keys(a).slice(1e3).forEach((function(e) {
                            delete a[e];
                        }));
                        const t = [];
                        return e.forEach(e => {
                            const n = e.fullId, a = o[n];
                            a && t.push(a);
                        }), t;
                    }));
                    return l = l.then(e => te.unmaskUrlViaUtil(e)).then(e => {
                        const t = Object(V.a)(5), n = e.map(e => t(() => {
                            const t = e[2], n = (e => {
                                if (te.isHlsLink(e)) {
                                    const t = (e = e.replace("/index.m3u8", ".mp3")).split("/"), n = -1 !== e.indexOf("audios") ? 1 : 0;
                                    return t.splice(t.length - (2 + n), 1), t.join("/");
                                }
                                return e;
                            })(t);
                            return te.isHlsLink(t) ? Object(v.a)({
                                method: "HEAD",
                                url: n
                            }).then(() => (e[2] = n, e), t => (K.warn("getNewTrackListByIdsWithActionHash: mp3 file not available. ", t), 
                            e)) : e;
                        }));
                        return Promise.all(n);
                    }), l;
                },
                _getAlbumIdFromUrl: function(e) {
                    var t = this, n = [ e ], o = Object(d.a)(e);
                    o.z && n.unshift(o.z);
                    var a = null;
                    return n.some((function(e) {
                        if (a = t._getAlbumId(e)) return !0;
                    })), a;
                },
                _getAlbumId: function(e) {
                    if (/[?&]q=/.test(e)) return null;
                    var t = {
                        url: "/al_audio.php",
                        data: {}
                    }, n = /audio_playlist(-?\d+)_(-?\d+)(?:\/(\w+))?/.exec(e);
                    if (n && (t.data.access_hash = n[3] || "", t.data.act = "load_section", t.data.al = 1, 
                    t.data.claim = 0, t.data.owner_id = n[1], t.data.playlist_id = n[2], t.data.type = "playlist", 
                    t.data.offset = 0), !t.data.act) {
                        var o = /audios(-?\d+)/.exec(e);
                        if (o) {
                            var a = /[?&]section=(\w+)/.exec(e), r = a && a[1];
                            if (r && -1 === [ "playlists", "all" ].indexOf(r)) return null;
                            t.data.access_hash = "", t.data.act = "load_section", t.data.al = 1, t.data.claim = 0, 
                            t.data.owner_id = o[1], t.data.playlist_id = -1, t.data.type = "playlist", t.data.offset = 0;
                        }
                    }
                    return t.data.act ? t : null;
                },
                getNewNodeTrackInfo: async function(e) {
                    const t = this.readNewDataAudio(e.dataset.audio), n = this.getNewTrackInfo(t);
                    if (!n || !n.fullId) throw new Error("Track info is not found");
                    return n.url ? te.unmaskUrlViaUtil([ [ null, null, n.url ] ]).then(e => (n.url = e[0][2], 
                    n)) : n;
                },
                _getAlbumTrackViaApi: function(e, t) {
                    if (!e.url) throw K.debug("Page is not exists!", e), new Error("Page is not exists!");
                    var n = JSON.parse(JSON.stringify(e.data)), o = function() {
                        return t.abort ? Promise.reject(new Error("Abort")) : Object(v.a)({
                            type: "POST",
                            headers: {
                                "Content-Type": "application/x-www-form-urlencoded",
                                "X-Requested-With": "XMLHttpRequest"
                            },
                            url: e.url,
                            data: n,
                            timeout: 6e4,
                            localXHR: !0
                        }).then((function(e) {
                            const t = Z(e.body)[5];
                            if (!t) throw new Error("Album data is empty!");
                            return new Promise((function(e) {
                                setTimeout(e, 250);
                            })).then((function() {
                                return t;
                            }));
                        }));
                    };
                    return o().then((function(e) {
                        var t = 20;
                        return e.hasMore ? function a(r) {
                            return !r || t < 0 ? e : (t--, n.offset = r, o().then((function(t) {
                                return t.list.length ? (e.list.push.apply(e.list, t.list), t.hasMore ? a(t.nextOffset) : e) : e;
                            }), (function(t) {
                                return "Abort" !== t.message && K.debug("getOffset error!", t), e;
                            })));
                        }(e.nextOffset) : e;
                    }));
                },
                _getAllTrackViaDom: function(e, t) {
                    var n = this;
                    t = t || {};
                    var o = [];
                    return [].slice.call(e.querySelectorAll(".audio_row")).forEach((function(e) {
                        if ((!t.fromPage || !n.elIsHidden(e)) && (t.grabReply || !ae.isReply(e))) {
                            var a = null;
                            try {
                                a = JSON.parse(e.dataset.audio);
                            } catch (e) {}
                            a && o.push(a);
                        }
                    })), {
                        list: o
                    };
                },
                _getNewAudioLinks: function(e, t) {
                    var n = this;
                    t = t || {};
                    var o = (e = e || document) === document, r = ae.getPopup("", "audio", (function() {
                        t.abort = !0;
                    }));
                    r.onPrepare(a.a.i18n.getMessage("download") + " ...");
                    var i = function() {
                        return Promise.resolve().then((function() {
                            return n._getAllTrackViaDom(e, {
                                fromPage: o,
                                grabReply: !1
                            });
                        }));
                    };
                    t.onProgress = function(e, t) {
                        r.onProgress(e, t);
                    };
                    var s = Promise.resolve();
                    return s = (s = (s = (s = o ? s.then((function() {
                        return Promise.resolve().then((function() {
                            var e = n._getAlbumIdFromUrl(location.href);
                            if (!e) throw new Error("Album is not found");
                            return n._getAlbumTrackViaApi(e, t);
                        }));
                    })).catch((function(e) {
                        throw "Album is not found" !== e.message && K.debug("findAlbumLinks error!", e), 
                        e;
                    })).catch((function() {
                        return i();
                    })) : s.then(i)).then((function(e) {
                        var t = e.list;
                        if (!t.length) throw new Error("Audio is not found");
                        return r.onProgress(0, t.length), e;
                    }))).then((function(e) {
                        var o = [], a = "";
                        "string" == typeof e.title && (a = w.a.modify(e.title));
                        const r = [];
                        return e.list.forEach((function(e) {
                            const t = e[1] + "_" + e[0], n = te.getTrackActionHash(e), a = te.getTrackUrlHash(e);
                            -1 === r.indexOf(t) && (r.push(t), o.push({
                                fullId: t,
                                actionHash: n,
                                urlHash: a
                            }));
                        })), n._getNewTrackListByIdsWithActionHash(o, t).then((function(e) {
                            var t = {}, o = [];
                            return e.forEach((function(e) {
                                var a = n.getNewTrackInfo(e);
                                if (a && a.url) {
                                    var r = n.getNewAudioFilename(a), i = n.getNewAudioFullTitle(a);
                                    t[a.fullId] = a.url, o.push({
                                        url: a.url,
                                        title: i,
                                        filename: r
                                    });
                                }
                            })), {
                                linkList: t,
                                trackList: o,
                                title: a
                            };
                        }));
                    }))).then((function(e) {
                        return r.onReady(), e;
                    }), (function(e) {
                        throw r.onReady(), e;
                    }));
                },
                tooltip: {
                    tooltip: void 0,
                    updatePos: function(e, t) {
                        var o = n.getPosition(e), a = n.getSize(this.tooltip);
                        this.tooltip.style.top = o.top + t.top - a.height + "px";
                        var r = o.left + parseInt(t.width / 2) - parseInt(a.width / 2), i = document.body.clientWidth + document.body.scrollLeft;
                        i < r + a.width && (r = i - a.width), this.tooltip.style.left = r + "px";
                    },
                    show: function(e, t) {
                        var n = this;
                        return void 0 !== this.tooltip ? this.hide() : (this.tooltip = y.a.create("div", {
                            class: "sf-tooltip",
                            style: Object.assign({
                                position: "absolute",
                                display: "none",
                                zIndex: 9999,
                                opacity: 0,
                                transition: "opacity 0.2s",
                                whiteSpace: "nowrap"
                            }, t.style),
                            on: [ "mouseenter", function(e) {
                                n.hide();
                            } ]
                        }), document.body.appendChild(this.tooltip)), this.tooltip.style.display = "block", 
                        setTimeout((function() {
                            n.updatePos(e, t), n.tooltip.style.opacity = 1;
                        }), 0), this.tooltip;
                    },
                    hide: function() {
                        this.tooltip && (this.tooltip.style.opacity = 0, this.tooltip.style.display = "none");
                    }
                },
                rmBitrate: function() {
                    void 0 === te.rmBitrate.style && document.body.appendChild(te.rmBitrate.style = y.a.create("style", {
                        text: ".sf-bitrate-value {display: none;}"
                    }));
                    for (var e, t = document.querySelectorAll(".sf-bitrate-value"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                },
                insertNewBitrate: function(e, t) {
                    if (e && t && t.classList.contains("audio_row__info")) {
                        var n = t.querySelector(".audio_row__duration");
                        if (n && (void 0 !== te.rmBitrate.style && (te.rmBitrate.style.parentNode.removeChild(te.rmBitrate.style), 
                        te.rmBitrate.style = void 0), !n.querySelector(".sf-bitrate-value"))) {
                            var o = y.a.create("span", {
                                text: " " + e,
                                class: "sf-bitrate-value",
                                style: {
                                    position: "absolute",
                                    textAlign: "right",
                                    right: 0,
                                    opacity: "0.8",
                                    top: "14px",
                                    fontSize: "11px",
                                    whiteSpace: "nowrap"
                                }
                            });
                            n.appendChild(o);
                        }
                    }
                },
                onDlBtnLeave: function() {
                    te.tooltip.hide();
                },
                onDlBtnOver: function() {
                    var e = te, t = e.tooltip, n = this, o = n.dataset.fullId, r = n.parentNode && n.parentNode.parentNode, i = -6;
                    n.dataset.bitrateOffsetTop && (i = parseInt(n.dataset.bitrateOffsetTop));
                    var s = {
                        top: i,
                        width: 24,
                        style: {
                            backgroundColor: "#fff",
                            border: "1px solid #ccc",
                            color: "rgb(48, 48, 48)"
                        }
                    }, l = t.show(n, s);
                    l.dataset.fullId = o;
                    var d = function() {
                        var t = n.dataset.bitrate, o = n.dataset.size, i = "";
                        e.isHlsLink(n.href) ? i = a.a.i18n.getMessage("download") : o ? t ? (e.insertNewBitrate(t, r), 
                        i = o + " ~ " + t) : i = o : i = a.a.i18n.getMessage("getFileSizeFailTitle"), l.style.padding = "2px 5px 3px", 
                        l.textContent = i;
                    };
                    n.dataset.size || e.isHlsLink(n.href) ? d() : (l.style.padding = "2px 2px 0 2px", 
                    l.textContent = "", l.appendChild(y.a.create("img", {
                        src: "/images/upload.gif",
                        height: 8,
                        width: 32,
                        style: {
                            marginTop: "2px",
                            marginBottom: "1px"
                        }
                    })), n.dataset.preloadOver || (n.dataset.preloadOver = 1, e._preloadNewTrackUrl(n).then((function(a) {
                        if (n.dataset.preloadOver = 2, n.href = a, !e.isHlsLink(a)) return e._onOverInsertBitrate(n, r).then((function() {
                            l.dataset.fullId === o && (d(), t.updatePos(n, s));
                        }));
                        d(), t.updatePos(n, s);
                    })).catch((function(e) {
                        K.error("_preloadNewTrackUrl error", e), n.dataset.preloadOver = "", l.dataset.fullId === o && (d(), 
                        t.updatePos(n, s));
                    }))));
                },
                preloadIdPromiseMap: {},
                _preloadNewTrackUrl: function(e) {
                    var t = this.preloadIdPromiseMap, n = e.dataset.fullId;
                    e.dataset.actionHash, e.dataset.urlHash, t[n];
                    return e;
                },
                isHlsLink: function(e) {
                    return /\.m3u8(\?|$)/.test(e);
                },
                onNewDlBtnClick: function(e) {
                    te.isHlsLink(this.href) ? (e.preventDefault(), a.a.sendMessage({
                        action: "checkAndOpenProLanding",
                        id: "vk-2"
                    }), Object(j.a)(Object(I.e)(D.a, {
                        sources: [ {
                            url: this.href,
                            format: "hls"
                        } ],
                        filename: this.download,
                        format: "mp3",
                        convertType: "hlsToMp3"
                    }), "sf-muxer-parent")) : n.downloadOnClick(e);
                },
                _onNewDlBtnClickWrapper: function(e) {
                    e.stopPropagation(), (this.dataset.preloadOver > 1 || this.dataset.preloadBitrate > 1) && (this.dataset.preloadDl = 2), 
                    this.dataset.preloadDl ? this.dataset.preloadDl > 1 ? te.onNewDlBtnClick.call(this, e) : e.preventDefault() : (e.preventDefault(), 
                    this.dataset.preloadDl = 1, te.onNewDlBtnClick.call(this, e));
                },
                getNewDlBtn: function(e) {
                    var t = {
                        href: e.url || "#sf-preload",
                        class: [ te.className, "sf-audio-btn" ],
                        download: e.filename || "",
                        data: {
                            duration: e.duration || "",
                            fullId: e.fullId,
                            actionHash: e.actionHash,
                            urlHash: e.urlHash
                        },
                        style: {
                            width: "16px",
                            height: "16px"
                        },
                        on: [ [ "mouseenter", this.onDlBtnOver ], [ "mouseleave", this.onDlBtnLeave ], [ "click", this._onNewDlBtnClickWrapper ], [ "mousedown", function(e) {
                            e.stopPropagation();
                        } ] ]
                    };
                    return (a.a.isGM || a.a.isSafari) && (t.title = a.a.i18n.getMessage("downloadTitle")), 
                    y.a.create("a", t);
                },
                preloadSizePromiseMap: {},
                _onOverInsertBitrate: function(e, t) {
                    var o = this, r = o.preloadSizePromiseMap, i = e.dataset.fullId, s = r[i];
                    return s || (s = r[i] = (e => {
                        let t = F[e];
                        if (t) {
                            const t = R.indexOf(e);
                            -1 !== t && (R.splice(t, 1), R.unshift(e));
                        } else if (t = F[e] = Object(x.a)({
                            action: "getFileSize",
                            url: e
                        }).then(t => (t && !t.error || delete F[e], t)).catch(t => {
                            throw delete F[e], t;
                        }), R.unshift(e), R.length > 100) {
                            const e = R.pop();
                            delete F[e];
                        }
                        return t;
                    })(e.href).then((function(s) {
                        if (delete r[i], !s) throw new Error("Response is empty");
                        if (!s.fileSize) throw delete o.cache[i], new Error("File size is empty");
                        var l = n.sizeHuman(s.fileSize, 2), d = "";
                        e.dataset.duration && (d = Math.floor(s.fileSize / e.dataset.duration / 125) + " " + a.a.i18n.getMessage("kbps")), 
                        e.dataset.bitrate = d, e.dataset.size = l, te.insertNewBitrate(d, t);
                    }), (function(e) {
                        throw delete r[i], e;
                    }))), s;
                },
                getNewAudioFullTitle: function(e) {
                    var t = [];
                    return e.title && t.push(e.title), e.performer && (t.length && t.unshift(" - "), 
                    t.unshift(e.performer)), t.join("");
                },
                getNewAudioFilename: function(e) {
                    var t = this.getNewAudioFullTitle(e);
                    return t && (t += ".mp3"), t;
                },
                getdlBtnAudio: async function(e, t, o, a) {
                    t && setTimeout(() => {
                        let r = Array.from(e.children).flatMap(e => Array.from(e.querySelectorAll("section")).filter(e => e.querySelector(".ConvoMessageWithoutBubble__attachments") || e.querySelector(".ConvoMessageWithoutBubble__forwardedMessages")));
                        r.forEach(e => {
                            Array.from(e.querySelectorAll("div[data-itemkey]")).filter(e => e.querySelector(".AttachVoice")).forEach(e => {
                                const t = e.getAttribute("data-itemkey");
                                o.has(t) || (o.add(t), a.push(e));
                            });
                        }), a.sort((e, t) => parseInt(e.getAttribute("data-itemkey"), 10) - parseInt(t.getAttribute("data-itemkey"), 10)), 
                        r.forEach(e => {
                            Array.from(e.querySelectorAll("div[data-itemkey]")).filter(e => e.querySelector(".AttachVoice")).forEach(e => {
                                const o = e.getAttribute("data-itemkey"), r = e.querySelector(".AttachVoice__player");
                                if (!r) return;
                                const i = r.querySelector(".sf-audio-btn");
                                i && i.remove();
                                const s = a.findIndex(e => e.getAttribute("data-itemkey") === o);
                                if (-1 === s) return;
                                let l;
                                if (a.length < t.length) {
                                    const e = t.length - a.length;
                                    l = t[e + s];
                                } else l = t[s];
                                if (!l) return;
                                const d = {
                                    href: l.url || "#sf-preload",
                                    class: [ "sf-audio-btn" ],
                                    download: l.filename || "",
                                    style: {
                                        width: "16px",
                                        height: "16px"
                                    }
                                }, c = y.a.create("a", d);
                                y.a.create(c, {
                                    style: {
                                        background: "url(" + n.svg.getSrc("download", "#6C8CAC") + ") center no-repeat",
                                        backgroundSize: "12px",
                                        width: "20px",
                                        height: "20px",
                                        padding: 0,
                                        margin: 0,
                                        cssFloat: "left"
                                    }
                                }), c.addEventListener("click", async e => {
                                    e.preventDefault();
                                    try {
                                        const e = await fetch(l.url), t = await e.blob(), n = URL.createObjectURL(t);
                                        let o = document.createElement("a");
                                        o.href = n;
                                        const a = `audio_${Date.now()}.mp3`;
                                        o.setAttribute("download", l.filename || a), document.body.appendChild(o), o.click(), 
                                        document.body.removeChild(o), URL.revokeObjectURL(n);
                                    } catch (e) {
                                        console.error("Download error:", e.message);
                                    }
                                }), r.append(c);
                            });
                        });
                    }, 1e3);
                },
                handleTrackBtnPlaylist: async function(e, t) {
                    if (e.querySelector("." + te.className)) return;
                    const n = e.querySelector(".vkitAudioRow__buttonGroup--aaeEd > a");
                    if (!n) return;
                    const o = n.getAttribute("href");
                    if (!o) return;
                    const a = new URLSearchParams(o.split("?")[1]).get("audio_id"), [r, i] = a.split("_");
                    let {access_token: s} = JSON.parse(localStorage.getItem("6287487:web_token:login:auth"));
                    const l = e.querySelector(".vkitAudioRow__actions--e9Qex .vkitAudioRow__buttonGroup--aaeEd");
                    let d = await (async () => {
                        let e = await fetch(`https://api.vk.com/method/audio.getById?audios=${r}_${i}&access_token=${s}&v=5.131`), t = await e.json();
                        return {
                            url: t.response[0].url,
                            title: t.response[0].title,
                            perfomer: t.response[0].artist,
                            duration: t.response[0].duration,
                            filename: `${t.response[0].artist} - ${t.response[0].title}.mp3`
                        };
                    })();
                    var c = this.getNewDlBtn(d);
                    y.a.create(c, {
                        class: [ "audio_row__action" ],
                        style: {
                            width: "24px",
                            height: "24px",
                            cssFloat: "left"
                        },
                        on: [ [ "mouseover", e => {
                            if (X) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(U.b)(c, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {});
                                Object(U.a)(c, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    }), l.appendChild(c);
                },
                handleNewCurrentAudioRow: async function(e, t) {
                    if (e.querySelector("." + te.className)) return;
                    const [o] = await z.a.createLinkExtractor("vk-audios").extractLinks({
                        element: e
                    });
                    var a = this.getNewDlBtn(o), r = "#6C8CAC";
                    1 === t && (r = "#C4D1DE"), a.classList.remove("sf-audio-btn"), y.a.create(a, {
                        style: {
                            background: "url(" + n.svg.getSrc("download", r) + ") center no-repeat",
                            backgroundSize: "12px",
                            width: "12px",
                            height: "12px",
                            padding: 0,
                            margin: 0,
                            cssFloat: "left",
                            marginRight: "3px",
                            marginTop: "6px",
                            marginBottom: "-2px"
                        }
                    });
                    var i = null;
                    if (b.a.onRemoveEvent(a, (function() {
                        b.a.one(e, "mouseenter", E.mutationMode.wrapNewAudioOnMouseOver), i && i.stop();
                    })), 2 === t) {
                        var s = Object(h.a)(e, ".audio_page_player");
                        s && (i = new M.a({
                            target: s,
                            attrs: [ {
                                name: "data-full-id",
                                callback() {
                                    a.parentNode && a.parentNode.removeChild(a), i && i.stop();
                                }
                            } ]
                        })).trigger();
                    }
                    1 === t && (a.dataset.bitrateOffsetTop = 1), e.insertBefore(a, e.firstChild);
                },
                handleNewAudioRow: async function(e) {
                    if (e.querySelector("." + te.className)) return;
                    const t = e.querySelector(".audio_row__actions"), [n] = await z.a.createLinkExtractor("vk-audios").extractLinks({
                        element: e
                    });
                    var a = this, r = this.getNewDlBtn(n), i = t.parentNode;
                    y.a.create(r, {
                        class: [ "audio_row__action" ],
                        style: {
                            width: "24px",
                            height: "24px",
                            cssFloat: "left"
                        },
                        on: [ [ "mouseover", e => {
                            if (X) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(U.b)(r, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                }, {});
                                Object(U.a)(r, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    var s = t.firstChild;
                    s ? t.insertBefore(r, s) : t.appendChild(r), 1 == +o.vkShowBitrate && (r.dataset.preloadBitrate || (r.dataset.preloadBitrate = 1, 
                    a._preloadNewTrackUrl(r).then((function(e) {
                        return r.dataset.preloadBitrate = 2, r.href = e, a._onOverInsertBitrate(r, i);
                    })).catch((function(e) {
                        K.error("_preloadNewTrackUrl error", e);
                    }))));
                },
                addNewDlTrackBtn: function(e) {
                    var t = this, n = function() {
                        a.disconnect();
                    }, o = function() {
                        t.handleNewAudioRow(e).catch(() => n());
                    }, a = new (Object(L.a)())((function(e) {
                        if (i) {
                            for (var t = null, a = null, r = 0; t = e.shift(); ) if ("childList" === t.type && t.addedNodes.length && t.target.classList.contains("audio_row__info")) for (r = 0, 
                            t.addedNodes; a = t.addedNodes[r]; r++) if (a.classList.contains("audio_row__actions")) return void o();
                        } else n();
                    }));
                    a.observe(e, {
                        childList: !0,
                        subtree: !0
                    });
                    var r = e.querySelector(".audio_row__actions");
                    r && (o(), r = null);
                },
                getNewTrackInfo: function(e) {
                    if (!e) return null;
                    var t = {};
                    return "string" == typeof e[2] && (t.url = e[2]), t.title = e[3], t.title && (t.title = w.a.decodeSpecialChars(ee(t.title))), 
                    t.performer = e[4], t.performer && (t.performer = w.a.decodeSpecialChars(ee(t.performer))), 
                    t.duration = parseInt(e[5]), t.actionHash = te.getTrackActionHash(e), t.urlHash = te.getTrackUrlHash(e), 
                    e[1] && e[0] && (t.fullId = e[1] + "_" + e[0]), t.id = e[0], t.ownerId = e[1], t;
                },
                getTrackActionHash: e => (e[13] || "").split("/")[2] || "",
                getTrackUrlHash: e => (e[13] || "").split("/")[5] || "",
                readNewDataAudio: function(e) {
                    try {
                        return JSON.parse(e);
                    } catch (e) {
                        return null;
                    }
                },
                addNewDlCurrentTrackBtn: function(e, t) {
                    this.handleNewCurrentAudioRow(e, t);
                },
                addTrackBtnPlaylist: function(e, t) {
                    this.handleTrackBtnPlaylist(e, t);
                },
                onNewMouseOver: function(e) {
                    var t = te;
                    if (this && !this.querySelector("." + te.className)) {
                        var n = null;
                        this.classList.contains("top_audio_player_title") && (n = 1), this.classList.contains("audio_page_player_title_performer") && (n = 2), 
                        this.classList.contains("vkitAudioRow__root--QsCMC") && (n = 3), 1 === n || 2 === n ? t.addNewDlCurrentTrackBtn(this, n) : 3 === n ? t.addTrackBtnPlaylist(this, n) : t.addNewDlTrackBtn(this);
                    }
                },
                addCustomStyle: function() {
                    if (1 !== this.addCustomStyle.hasStyle) {
                        this.addCustomStyle.hasStyle = 1;
                        var e = document.querySelector("#savefrom-styles.sf-audio");
                        e && e.parentNode.removeChild(e), n.addStyleRules(".savefrom_vk_download.sf-audio-btn", {
                            background: "url(" + n.svg.getSrc("download", "#5f7fa2") + ") center no-repeat !important",
                            opacity: "0.4"
                        }, "sf-audio");
                    }
                },
                hideLinks: function() {
                    if (this.addCustomStyle.hasStyle) {
                        this.addCustomStyle.hasStyle = 0;
                        var e = document.querySelector("#savefrom-styles.sf-audio");
                        e && e.parentNode.removeChild(e), n.addStyleRules(".savefrom_vk_download", {
                            display: "none"
                        }, "sf-audio");
                    }
                    te.tooltip.tooltip && (te.tooltip.tooltip.parentNode.removeChild(te.tooltip.tooltip), 
                    te.tooltip.tooltip = void 0), te.cache = {};
                },
                elIsHidden: function(e) {
                    return null === e.offsetParent;
                },
                downloadMP3Files: async function(e) {
                    let {access_token: t} = JSON.parse(localStorage.getItem("6287487:web_token:login:auth"));
                    const o = location.href.match(/convo\/(\d+)/);
                    let r = await async function(e) {
                        let t = await fetch(`https://api.vk.com/method/messages.getHistory?peer_id=${o[1]}&count=200&access_token=${e}&v=5.131`), {response: n} = await t.json();
                        return n;
                    }(t);
                    if (r) {
                        const t = e => {
                            const t = new Date(1e3 * e);
                            return `Audio-${t.getFullYear()}-${String(t.getMonth() + 1).padStart(2, "0")}-${String(t.getDate()).padStart(2, "0")} ${String(t.getHours()).padStart(2, "0")}:${String(t.getMinutes()).padStart(2, "0")}:${String(t.getSeconds()).padStart(2, "0")}.mp3`;
                        }, o = r.items.map(e => e.attachments.length > 0 && "audio_message" == e.attachments[0].type ? {
                            filename: t(e.date),
                            url: e.attachments[0].audio_message.link_mp3
                        } : e.fwd_messages.length > 0 && "audio_message" == e.fwd_messages[0].attachments[0].type ? {
                            filename: t(e.date),
                            url: e.fwd_messages[0].attachments[0].audio_message.link_mp3
                        } : null).filter(Boolean);
                        o.sort((e, t) => {
                            const n = e.filename.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})/), o = t.filename.match(/(\d{4}-\d{2}-\d{2}) (\d{2}:\d{2}:\d{2})/);
                            return new Date(`${n[1]}T${n[2]}`) - new Date(`${o[1]}T${o[2]}`);
                        });
                        var i = Y();
                        let s = o.map(e => te.isHlsLink(e.url) ? {
                            filename: e.filename,
                            sources: [ {
                                url: e.url,
                                format: "hls"
                            } ],
                            format: "hls",
                            useConverter: !0
                        } : e);
                        if (0 === s.length && console.log(a.a.i18n.getMessage("vkMp3LinksNotFound")), "getdlBtnAudio" == e) return o;
                        n.downloadList.showBeforeDownloadPopup(s, {
                            type: "audio",
                            folderName: i
                        });
                    }
                },
                function(e) {
                    "Abort" !== e.message && (K.debug("_getNewAudioLinks error!", e), alert(a.a.i18n.getMessage("vkMp3LinksNotFound")));
                },
                showListOfAudioFiles: function(e) {
                    var t = ae.getLayer() || document;
                    te._getNewAudioLinks(t).then((function(t) {
                        var o = t.linkList, r = t.trackList, i = t.title || Y(), s = null;
                        if (e) {
                            if (0 !== (s = r).length) return n.playlist.popupPlaylist(s, i, !0);
                        } else {
                            for (var l in s = [], o) s.push({
                                url: o[l]
                            });
                            if (0 !== s.length) return n.playlist.popupFilelist(s);
                        }
                        alert(a.a.i18n.getMessage("vkMp3LinksNotFound"));
                    }), (function(e) {
                        "Abort" !== e.message && (K.debug("_getNewAudioLinks error!", e), alert(a.a.i18n.getMessage("vkMp3LinksNotFound")));
                    }));
                },
                requestReloadAudio: function(e, t, n) {
                    const o = {
                        act: "reload_audio",
                        ids: `${e}_${t}_${n}`
                    };
                    return Object(v.a)({
                        type: "POST",
                        url: "/audio",
                        json: !0,
                        data: o
                    }).then(e => {
                        const {data: t} = e.body;
                        return te.getNewTrackInfo(t[0][0]);
                    });
                }
            }, ne = {
                panelId: "savefrom__vk_video_links",
                videoAttr: "data-savefrom-video",
                hiddenAttr: "data-savefrom-hidden",
                btnBoxId: "sf-iframe-dl-btn",
                btnBox: null,
                style: {
                    fontSize: "10pt",
                    margin: "15px 0",
                    padding: "0"
                },
                getLinksFormUrl: function(e) {
                    if (e) {
                        if ("//" === e.substr(0, 2) && (e = "http:" + e), o.showUmmyItem && this.isRutubeLink(e)) return ne.getRutubeLinks(e);
                        if (this.isPladformLink(e)) return ne.getPladformLinks(e);
                        var t, a = n.embedDownloader.hostings;
                        for (var r in a) {
                            for (var i, s = a[r], l = 0; i = s.re[l]; l++) {
                                var d = e.match(i);
                                if (d) {
                                    t = {
                                        hosting: r,
                                        action: s.action,
                                        extVideoId: d[1]
                                    };
                                    break;
                                }
                            }
                            if (t) break;
                        }
                        if (t) return {
                            request: t
                        };
                    }
                },
                getLinksFromFlashVars: function(e) {
                    var t = Object(d.a)(e, {
                        params: !0
                    });
                    return ne.getLinksFromHtml5MetaData(t);
                },
                getLinksFromHtml5MetaData: function(e) {
                    if (!e) return;
                    var t = e.md_title;
                    if (void 0 === t) return;
                    let n = Object.keys(e).some(e => e.match(/cache([0-9]+)/)) ? /cache([0-9]+)/ : /url([0-9]+)/;
                    var o = {}, a = !1;
                    for (var r in e) {
                        var i = null;
                        if ("extra_data" !== r || "52" !== e.extra) {
                            if (null !== (i = r.match(n))) {
                                var s = e[r], l = s.indexOf("?");
                                -1 !== l && (s = s.substr(0, l)), a = !0, o[i[1]] = s;
                            }
                        } else o[i = e.hd ? "HD" : "SD"] = e[r], a = !0;
                    }
                    return a ? {
                        title: t,
                        links: o
                    } : void 0;
                },
                getRutubeLinks: function(e) {
                    if (/rutube[^\/]+\/(?:play|video)\/embed\/(\d+)/.test(e) || /video\.rutube\./.test(e)) return {
                        isUmmy: !0,
                        links: n.popupMenu.prepareLinks.rutube(e)
                    };
                },
                isRutubeLink: function(e) {
                    return /\/\/.*rutube\..*/.test(e);
                },
                getPladformLinks: function(e) {
                    if (e) {
                        var t = Object(d.a)(e);
                        return {
                            request: {
                                action: "getPladformVideo",
                                extVideoId: {
                                    playerId: t.pl,
                                    videoId: t.videoid
                                }
                            }
                        };
                    }
                },
                isPladformLink: function(e) {
                    return /\/\/.*pladform\..*/.test(e);
                },
                getLinksVideoEl: function(e, t) {
                    var n = t.querySelector(".vv_summary");
                    if (!n) return null;
                    n = n.textContent;
                    for (var o, a, r = {}, i = e.querySelectorAll("source"), s = 0; a = i[s]; s++) {
                        var l = a.src || "", d = l.indexOf("?");
                        -1 !== d && (l = l.substr(0, d));
                        var c = l.match(/\.(\d+)\.[^\/]+$/);
                        null !== c && (r[c[1]] = l, o = !0);
                    }
                    return o ? {
                        title: n,
                        links: r
                    } : void 0;
                },
                getPlayerNode: function(e) {
                    var t = null;
                    return e.closest(".ShortVideoPage__container") ? e : ([ "iframe.video_yt_player", "#html5_player", "#flash_video_obj", "#playerObj", "#player", ".video_box_wrap > #video_player" ].some((function(n) {
                        if (t = e.querySelector(n)) return !0;
                    })), t);
                },
                getLinksFromMv: function(e, t, n) {
                    return Object(P.a)([ t, e ], (e, t) => {
                        const o = window.mvcur;
                        if (o && o.player && o.player.vars) {
                            var a = o.player.vars;
                            return a.vid !== e || a.oid !== t ? n() : {
                                vars: o.player.vars
                            };
                        }
                    }).then(e => e ? ne.getLinksFromHtml5MetaData(e.vars) : null);
                },
                getLinksFromFrame: function(e) {
                    var t = document.body.innerHTML, n = Object(d.a)(location.href), o = parseInt(n.oid), a = parseInt(n.id);
                    if (o && a) {
                        var r = null;
                        if (Object(u.a)(t, [ /"vid":/, /"oid":/, /"md_title":/ ]).some((function(e) {
                            return r = e, !0;
                        })), r && r.vid === a && r.oid === o) return e(null, {
                            request: {
                                hosting: "vk",
                                action: "getVkLinksFromJsonMsg",
                                json: r
                            }
                        });
                        var i = document.body, s = ne.getPlayerNode(i);
                        if (s) return ne.getLinksFromPlayer(i, s, (function(t) {
                            t && e(null, t);
                        }));
                    }
                    return e("ERROR");
                },
                getLinksFromPlayer: function(e, t, o) {
                    if (t) {
                        var a, r;
                        if ("OBJECT" === t.tagName) (r = t.querySelector('param[name="flashvars"]')) && (r = r.getAttribute("value"), 
                        a = ne.getLinksFromFlashVars(r)); else if ("IFRAME" === t.tagName) {
                            var i = t.getAttribute("src");
                            a || (a = ne.getLinksFormUrl(i));
                        } else if ("EMBED" === t.tagName) {
                            var s = t.getAttribute("src");
                            a || (r = t.getAttribute("flashvars")) && (a = ne.getLinksFromFlashVars(r)), a || (a = ne.getLinksFormUrl(s));
                        }
                        if (a) return o(a, e);
                        if ("DIV" === t.tagName && "video_player" === t.id) {
                            var l = t.parentNode.id, c = l && l.match(/video_box_wrap(-?\d+)_(-?\d+)/);
                            if (c) return c.shift(), c = c.map((function(e) {
                                return parseInt(e);
                            })), Object(P.a)(c, (e, t) => {
                                let n = window.mvcur;
                                var o = "video" + e + "_" + t;
                                return n && n.listId && (o = "" + o), {
                                    path: o
                                };
                            }).then(t => {
                                if (t) return o({
                                    request: {
                                        hosting: "vk",
                                        action: "getVKLinks",
                                        extVideoId: t.path,
                                        oidVid: c
                                    }
                                }, e);
                            });
                        }
                        if ("html5_player" === t.id) return Object(P.a)(() => window.html5video && window.html5video.vars ? window.html5video.vars : o()).then(t => {
                            var n = ne.getLinksFromHtml5MetaData(t);
                            if (n) return o(n, e);
                        });
                        if ("A" === t.tagName) {
                            var u = t.href, p = Object(d.a)(u);
                            if (p.to) return a = n.embedDownloader.checkUrl(p.to), o(a ? {
                                request: a
                            } : null, e);
                        }
                        return o(null, e);
                    }
                },
                preparePladformLinks: function(e) {
                    e && "getRutubeLinks" === e.action && (e.links = null);
                    var t = e && e.links, n = "noname", o = {};
                    if (t) for (var a, r = 0; a = t[r]; r++) n = a.title, o[a.quality] && (a.quality = 0), 
                    o[a.quality.toUpperCase()] = a.url;
                    return {
                        title: n,
                        links: o
                    };
                },
                prepareLinks: function(e) {
                    var t = e.title, n = [];
                    for (var o in e.links) {
                        var a = e.links[o], r = a.match(/[\w]+\.(mp4|flv)(?:\?|$)/i), i = (r = r ? r[1] : "flv").toUpperCase();
                        n.push({
                            href: a,
                            quality: o,
                            title: t,
                            ext: r,
                            format: i,
                            forceDownload: !0
                        });
                    }
                    return n;
                },
                getVideoLinksAsAjax: function(e) {
                    var t = /video(-?\d+_-?\d+)/.exec(e);
                    t = t && t[1];
                    var n = Object(d.a)(e).list;
                    return ae._getModuleName().then((function(e) {
                        return new Promise((function(o) {
                            oe.getLinkAsAjax([ t, n ], (function(e, t) {
                                o({
                                    hosting: t,
                                    response: e
                                });
                            }), e);
                        }));
                    }));
                },
                formatFilenameForDownload: e => e && e.replace(/[<>:"/\\|?*\x00-\x1f]/g, "_").replace(/^[.\s]+|[.\s]+$/g, "").replace(/\.{2,}/g, ".").substring(0, 255) || "download",
                getVideoTitle() {
                    const e = document.querySelector('[data-testid="video_modal_title"]');
                    if (e) return e.textContent;
                },
                async prepareVideoLinks(e) {
                    let t = [];
                    if (e && e.oidVid) {
                        const [n, o] = e.oidVid;
                        let a = await ne.getLinksFromMv(n, o);
                        a && t.push(...ne.prepareLinks(a));
                    }
                    const a = await Object(x.a)(e);
                    if (a) if ("getPladformVideo" === e.action) o.showUmmyItem && "getRutubeLinks" === a.action ? t.push(...n.popupMenu.prepareLinks.rutube(a.links)) : t.push(...ne.prepareLinks(ne.preparePladformLinks(a))); else if (a.links) {
                        const e = n.embedDownloader.reMapHosting(a.action);
                        e && t.push(...n.popupMenu.prepareLinks[e](a.links, a.title));
                    }
                    if (!t.length && "getVKLinks" === e.action) {
                        const {hosting: o, response: a} = await ne.getVideoLinksAsAjax(e.extVideoId);
                        a && a.links && (a.isUmmy ? t.push(...a.links) : t.push(...n.popupMenu.prepareLinks[o](a.links, a.title)));
                    }
                    let r = t.filter(e => -1 !== e.href.indexOf("mycdn.me/")), i = t.filter(e => -1 !== e.href.indexOf("vkuser"));
                    if ((r.length || i || t.length <= 2) && e.extVideoId) {
                        let n = {}, o = document.querySelector('a[href*="' + e.extVideoId + '"]');
                        if (o && o.dataset.length) {
                            let e = o.closest('[id*="post"]');
                            e && (n.post_id = e.dataset.postId), n.list = o.dataset.list, n.paylist_id = "wall_" + o.dataset.video.split("_")[0];
                        }
                        n.video = e.extVideoId.split("?")[0].replace("video", "");
                        const r = location.href.match(/pl_(wall_.\d+)/);
                        r && r[1] && (n.playlist_id = r[1]);
                        const i = document.querySelector(`a[data-video="${n.video}"]`);
                        i && i.dataset.list && (n.list = i.dataset.list);
                        const s = await Object(v.a)({
                            type: "POST",
                            url: `https://${location.hostname}/al_video.php?act=show`,
                            data: W({
                                act: "show",
                                al: 1,
                                autoplay: 1,
                                module: "groups"
                            }, n)
                        });
                        let {hls: l, mp4: d} = await C.b(a, s.body);
                        if (!l.length && !d.length) {
                            const e = await C.a(a, s.body);
                            l = e.hls, d = e.mp4;
                        }
                        t.push(...d, ...l), t = Object(q.a)(t, "href");
                    }
                    t = await C.c(Object(q.a)(t, "quality", "itag"), e => 22 == e.itag);
                    const s = this.getVideoTitle();
                    return t = t.map(e => (e.title = s ? this.formatFilenameForDownload(s) : "." === e.title ? "video-" + e.quality : e.title, 
                    e)), t;
                },
                getVkTheme: function() {
                    var e = document.querySelector('meta[name="color-scheme"]');
                    return e && "dark" === e.getAttribute("content") ? "dark" : "light";
                },
                getColors: function() {
                    var e = this.getVkTheme();
                    return {
                        iconColor: "dark" === e ? "#828282" : "#99A2AD",
                        backgroundColor: "dark" === e ? "#333333" : "#E8EAEF"
                    };
                },
                newAppendButton: function(e, o) {
                    Object(H.a)({
                        category: "append",
                        subcategory: "vk",
                        event: "b"
                    });
                    var r = o.querySelector("#mv_info"), i = r && r.querySelector(".mv_actions_block .like_cont .like_btns");
                    r = null;
                    const s = e => e ? e.querySelector("#mv_top_controls, #VideoLayerInfo__topControls") : null;
                    var l = s(o);
                    if (l || (l = s(o.closest("#mv_container"))), l || (l = document.querySelector(S.vk.videoPostPanelBtnsList)), 
                    i && te.elIsHidden(i) && (i = null), !i && !l) return;
                    if (l.querySelector(".sf-under-video")) return;
                    for (var d, c = !(i || !l), u = o.querySelectorAll(".savefrom_vk_download"), p = 0; d = u[p]; p++) d.parentNode.removeChild(d);
                    d = null, u = null;
                    var f = y.a.create("div", {
                        class: [ "savefrom_vk_download", "sf-under-video" ],
                        style: {
                            cursor: "pointer"
                        },
                        on: [ [ "click", async function(r) {
                            if (r.stopPropagation(), b.a.onRemoveEvent(this, E.hideMenu), E.contextMenu && E.contextMenu.isShow) return void E.hideMenu();
                            var i = E.contextMenu = n.popupMenu.quickInsert(this, a.a.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                parent: o,
                                offsetRight: -120
                            });
                            const s = await z.a.createLinkExtractor("vk-video").extractLinks({
                                element: e,
                                initData: t
                            });
                            return i.update(function(e) {
                                return e.map(e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                e));
                            }(s));
                        } ], [ "mousedown", function(e) {
                            e.stopPropagation();
                        } ], [ "keydown", function(e) {
                            e.stopPropagation();
                        } ] ]
                    });
                    const {backgroundColor: h, iconColor: m} = this.getColors();
                    if (i) {
                        y.a.create(f, {
                            class: [ "like_btn" ],
                            style: {
                                backgroundColor: h,
                                borderRadius: "8px"
                            },
                            append: [ y.a.create("div", {
                                class: [ "like_button_icon" ],
                                append: [ y.a.create("img", {
                                    src: n.svg.getSrc("download", m),
                                    width: 16,
                                    height: 16,
                                    style: {
                                        margin: "4px"
                                    }
                                }) ]
                            }), y.a.create("div", {
                                class: [ "like_button_label" ],
                                text: a.a.i18n.getMessage("download"),
                                style: {
                                    color: m
                                }
                            }) ]
                        });
                        var g = i.querySelector(".ui_actions_menu_wrap");
                        g ? g.parentNode.insertBefore(f, g) : i.appendChild(f);
                    } else if (c) {
                        y.a.create(f, {
                            class: [ "mv_top_button" ],
                            style: {
                                textAlign: "center",
                                backgroundColor: h,
                                padding: "6px 20px",
                                borderRadius: "32px",
                                marginLeft: "8px",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                opacity: 1
                            },
                            append: [ y.a.create("img", {
                                class: [ "mv_small_close_icon" ],
                                style: {
                                    backgroundImage: "none",
                                    width: "20px",
                                    height: "20px"
                                },
                                src: n.svg.getSrc("download", m),
                                width: 20,
                                height: 20
                            }) ]
                        });
                        var v = l.firstChild;
                        if (v) if (te.elIsHidden(l.lastChild)) {
                            for (;v.nextElementSibling && !te.elIsHidden(v.nextElementSibling); ) v = v.nextElementSibling;
                            v.parentNode.insertBefore(f, v);
                        } else l.appendChild(f); else l.appendChild(f);
                        !function(e) {
                            const t = () => {
                                const {backgroundColor: t, iconColor: o} = ne.getColors();
                                e.style.backgroundColor = t;
                                const a = e.querySelector("img");
                                a && (a.src = n.svg.getSrc("download", o));
                                const r = e.querySelector(".like_button_label");
                                r && (r.style.color = o);
                            };
                            t(), new MutationObserver(t).observe(document.body, {
                                attributes: !0,
                                attributeFilter: [ "scheme" ]
                            });
                        }(f);
                    }
                },
                newAppendButton2: function(e, o) {
                    Object(H.a)({
                        category: "append",
                        subcategory: "vk",
                        event: "b"
                    });
                    const r = Object(l.a)(e, "_post_content"), i = r.querySelector(".PostBottomActionLikeBtns .like_btns"), s = [ r.querySelector('[class*="vkitPrimaryAttachment__root"]'), r.querySelector(".video_box_wrap") ];
                    for (const e of s) e.style.overflow = "visible";
                    const d = y.a.create("div", {
                        class: [ "savefrom_vk_download", "sf-under-video" ],
                        style: {
                            cursor: "pointer"
                        },
                        on: [ [ "click", async function(o) {
                            if (o.stopPropagation(), b.a.onRemoveEvent(this, E.hideMenu), E.contextMenu && E.contextMenu.isShow) return void E.hideMenu();
                            let r = document.querySelector(".like_btns");
                            var i = E.contextMenu = n.popupMenu.quickInsert(this, a.a.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                parent: r,
                                offsetRight: 0
                            });
                            const s = await z.a.createLinkExtractor("vk-video").extractLinks({
                                element: e,
                                initData: t
                            });
                            return i.update(function(e) {
                                return e.map(e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                e));
                            }(s));
                        } ], [ "mousedown", function(e) {
                            e.stopPropagation();
                        } ], [ "keydown", function(e) {
                            e.stopPropagation();
                        } ] ]
                    }), {backgroundColor: c, iconColor: u} = this.getColors();
                    i && (y.a.create(d, {
                        class: [ "mv_top_button" ],
                        style: {
                            textAlign: "center",
                            backgroundColor: c,
                            padding: "6px 20px",
                            borderRadius: "32px",
                            marginLeft: "8px",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            opacity: 1
                        },
                        append: [ y.a.create("img", {
                            class: [ "mv_small_close_icon" ],
                            style: {
                                backgroundImage: "none",
                                width: "20px",
                                height: "20px"
                            },
                            src: n.svg.getSrc("download", u),
                            width: 20,
                            height: 20
                        }) ]
                    }), i.appendChild(d));
                },
                newClipButton: function(e, o) {
                    setTimeout(() => {
                        if (!e) return;
                        Object(H.a)({
                            category: "append",
                            subcategory: "vk",
                            event: "b"
                        });
                        let r = o.closest(".ShortVideoPost");
                        r || (r = o);
                        let i = r.querySelector(".like_btns");
                        i || (i = r.querySelector(".like_cont"));
                        let s = o.closest("#mv_layer_wrap");
                        const l = y.a.create("div", {
                            id: "savefrom__yt_btn",
                            style: {
                                display: "flex",
                                marginLeft: "10px",
                                verticalAlign: "middle"
                            },
                            append: [ y.a.create("a", {
                                class: "sf-quick-dl-btn",
                                href: "javascript:void(0)",
                                style: {
                                    display: "inline-block",
                                    fontSize: "inherit",
                                    height: "22px",
                                    border: "1px solid #00B75A",
                                    borderRadius: "3px",
                                    borderTopRightRadius: 0,
                                    borderBottomRightRadius: 0,
                                    paddingLeft: "28px",
                                    cursor: "pointer",
                                    verticalAlign: "middle",
                                    position: "relative",
                                    lineHeight: "22px",
                                    textDecoration: "none",
                                    zIndex: 1,
                                    color: "#fff",
                                    marginRight: "8px"
                                },
                                append: [ y.a.create("i", {
                                    style: {
                                        position: "absolute",
                                        display: "inline-block",
                                        left: "6px",
                                        top: "3px",
                                        backgroundImage: "url(" + n.svg.getSrc("download", "#ffffff") + ")",
                                        backgroundSize: "12px",
                                        backgroundRepeat: "no-repeat",
                                        backgroundPosition: "center",
                                        width: "16px",
                                        height: "16px"
                                    }
                                }) ],
                                on: [ [ "click", async function(o) {
                                    if (o.stopPropagation(), b.a.onRemoveEvent(this, E.hideMenu), E.contextMenu && E.contextMenu.isShow) return void E.hideMenu();
                                    E.contextMenu = n.popupMenu.quickInsert(this, "Скачивается...", "sf-single-video-menu", {
                                        parent: i
                                    }, "clip"), a.a.sendMessage({
                                        action: "checkAndOpenProLanding"
                                    });
                                    const r = function(e) {
                                        return e.map(e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                        e));
                                    }(await z.a.createLinkExtractor("vk-clip").extractLinks({
                                        element: e,
                                        initData: t
                                    }));
                                    if (0 === r.length) return this.href = s.querySelector("video").src, Object(x.a)({
                                        action: "downloadVkStory",
                                        downloadFileUrl: this.href,
                                        fileName: Date.now() + ".mp4"
                                    });
                                    this.href = $(r), this.click(), this.href = "javascript:void(0)", o.preventDefault();
                                } ] ]
                            }), y.a.create("style", {
                                text: Object(p.a)({
                                    selector: "#savefrom__yt_btn",
                                    append: [ {
                                        "button::-moz-focus-inner": {
                                            padding: 0,
                                            margin: 0
                                        },
                                        ".sf-quick-dl-btn": {
                                            backgroundColor: "#00B75A"
                                        },
                                        ".sf-quick-dl-btn:hover": {
                                            backgroundColor: "rgb(0, 163, 80)"
                                        },
                                        ".sf-quick-dl-btn:active": {
                                            backgroundColor: "rgb(0, 151, 74)"
                                        }
                                    }, {
                                        media: "@media screen and (max-width: 1293px)",
                                        append: {
                                            ".sf-quick-dl-btn .sf-btn-name": {
                                                display: "none"
                                            }
                                        }
                                    } ]
                                })
                            }), y.a.create("button", {
                                style: {
                                    position: "relative",
                                    display: "inline-block",
                                    marginLeft: "-2px",
                                    fontSize: "inherit",
                                    height: "24px",
                                    paddingRight: "21px",
                                    backgroundColor: "#F8F8F8",
                                    border: "1px solid #CCCCCC",
                                    borderRadius: "3px",
                                    borderTopLeftRadius: "0",
                                    borderBottomLeftRadius: "0",
                                    cursor: "pointer",
                                    color: "#9B9B9B",
                                    zIndex: 0,
                                    verticalAlign: "middle",
                                    boxSizing: "border-box",
                                    lineHeight: "22px"
                                },
                                on: [ [ "click", async function(o) {
                                    if (o.stopPropagation(), b.a.onRemoveEvent(this, E.hideMenu), E.contextMenu && E.contextMenu.isShow) return void E.hideMenu();
                                    var r = E.contextMenu = n.popupMenu.quickInsert(this, a.a.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                        parent: i
                                    }, "clip");
                                    const s = function(e) {
                                        return e.map(e => (e.href = e.url, e.title = e.filename, delete e.url, delete e.filename, 
                                        e));
                                    }(await z.a.createLinkExtractor("vk-clip").extractLinks({
                                        element: e,
                                        initData: t
                                    }));
                                    return r.update(s);
                                } ], [ "mousedown", function(e) {
                                    e.stopPropagation();
                                } ], [ "keydown", function(e) {
                                    e.stopPropagation();
                                } ] ],
                                append: [ y.a.create("i", {
                                    style: {
                                        position: "absolute",
                                        display: "inline-block",
                                        top: "9px",
                                        right: "6px",
                                        border: "5px solid #868282",
                                        borderBottomColor: "transparent",
                                        borderLeftColor: "transparent",
                                        borderRightColor: "transparent"
                                    }
                                }), y.a.create("span", {
                                    text: "HD"
                                }) ]
                            }) ]
                        });
                        i && (i.querySelector("#savefrom__yt_btn") || i.append(l));
                    }, 500);
                },
                appendNewFrameBtn: function(e, t) {
                    var r = this;
                    if (!t.querySelector(".savefrom_vk_download")) {
                        var i = n.frameMenu.getBtn({
                            singleBtn: !0,
                            btnId: r.btnBoxId,
                            containerStyle: {
                                top: "10px",
                                right: "10px"
                            },
                            on: [ [ "click", function(t) {
                                if (t.preventDefault(), t.stopPropagation(), E.contextMenu && E.contextMenu.isShow) E.hideMenu(); else {
                                    var s = E.contextMenu = n.frameMenu.getMenu(this, a.a.i18n.getMessage("download") + "...", "sf-frame-menu", {
                                        container: i.container,
                                        onShow: function() {
                                            i.node.classList.add("sf-over");
                                        },
                                        onHide: function() {
                                            E.contextMenu = null, i.node.classList.remove("sf-over");
                                        }
                                    });
                                    if (e.request) {
                                        var l = function(t) {
                                            var i = a.a.i18n.getMessage("noLinksFound");
                                            if (t && "getPladformVideo" === e.request.action) i = o.showUmmyItem && "getRutubeLinks" === t.action ? n.popupMenu.prepareLinks.rutube(t.links) : r.prepareLinks(r.preparePladformLinks(t)); else if (t && t.links) {
                                                var l = n.embedDownloader.reMapHosting(t.action);
                                                l && (i = n.popupMenu.prepareLinks[l](t.links, t.title));
                                            }
                                            s.update(i);
                                        };
                                        try {
                                            a.a.sendMessage(e.request, l);
                                        } catch (t) {
                                            l();
                                        }
                                    } else s.update(r.prepareLinks(e));
                                    !1;
                                }
                            } ], [ "mousedown", function(e) {
                                e.stopPropagation(), 2 === e.button && (E.hideMenu(), i.container.parentNode && i.container.parentNode.removeChild(i.container));
                            } ] ]
                        });
                        i.container = y.a.create("div", {
                            class: "sf-btn-ctr",
                            append: i.node
                        }), i.node.appendChild(y.a.create("style", {
                            text: Object(p.a)([ {
                                selector: [ "body:hover .sf-btn-ctr #" + r.btnBoxId, "body:hover .sf-btn-ctr .sf-frame-menu" ],
                                style: {
                                    display: "block"
                                }
                            } ])
                        })), document.body.appendChild(i.container);
                    }
                },
                addFrameBtn: function() {
                    var e = document.getElementById("page_wrap");
                    e && ne.getLinksFromFrame((function(t, n) {
                        t || ne.appendNewFrameBtn(n, e);
                    }));
                }
            }, oe = {
                linkDataAttr: "savefromHasBtn",
                getLinkAsAjaxRequest: function(e, t) {
                    t = t || 0;
                    var n = Object.assign({}, e), o = function() {
                        if (t < 1) return oe.getLinkAsAjaxRequest(e, ++t);
                        e.error && e.error();
                    }, a = n.data;
                    0 === t ? a.act = "show_inline" : 1 === t && (a.act = "show"), Object(g.a)(n, (function(t, n, a) {
                        return t || !a || -1 !== a.indexOf('href="/join"') ? o() : void e.success(a);
                    }));
                },
                getVideoDataFromLink: function(e) {
                    var t = e.getAttribute("onclick"), n = /showVideo\(['"]{1}([^'"]+)['"]{1},.?['"]{1}([^'"]+)['"]{1},.*\)/.exec(t);
                    return n && n.shift(), n;
                },
                getLinkAsAjax: function(e, t, r) {
                    oe.getLinkAsAjaxRequest({
                        localXHR: 1,
                        type: "POST",
                        url: "/al_video.php",
                        data: {
                            list: e[1],
                            video: e[0],
                            act: "show_inline",
                            module: r,
                            al: 1
                        },
                        success: function(e) {
                            if (!e) return t();
                            var r = e.match(/<iframe[^>]+src=['"]{1}([^'">]+)['"]{1}[^>]+>/i);
                            if (r || (r = e.match(/var\s+opts\s+=\s+({[^}]*})/im)) && (r = r[1].match(/url:\s+['"]{1}([^'"]+)['"]{1}/i)) && 0 !== r[1].indexOf("//") && 0 !== r[1].indexOf("http") && (r = null), 
                            r) {
                                var i = r[1];
                                if (o.showUmmyItem && ne.isRutubeLink(i)) return t(ne.getRutubeLinks(i));
                                if (0 === i.indexOf("//") && (i = "http:" + i), 0 !== i.indexOf("http")) return t();
                                var s = n.embedDownloader.checkUrl(i);
                                if (!s) return t();
                                var l = {
                                    action: s.action,
                                    extVideoId: s.extVideoId
                                };
                                a.a.sendMessage(l, (function(e) {
                                    var o = s.hosting;
                                    return e.action !== l.action && (o = n.embedDownloader.reMapHosting(e.action)), 
                                    t(e, o);
                                }));
                            } else Object(x.a)({
                                action: "getVkLinksFromData",
                                data: e
                            }).then((function(e) {
                                return t(e, "vk");
                            })).catch((function() {
                                return t({}, "vk");
                            }));
                        },
                        error: function() {
                            t();
                        }
                    });
                },
                addDownloadBtn: function(e) {
                    var t = e.href;
                    const o = {
                        display: "inline-block",
                        width: "16px",
                        height: "16px",
                        marginLeft: "5px",
                        backgroundImage: "url(" + n.svg.getSrc("download", "#78A2CC") + ")",
                        backgroundRepeat: "no-repeat",
                        marginBottom: "-4px"
                    };
                    var r = y.a.create("a", {
                        href: "http://savefrom.net/?url=" + encodeURIComponent(t),
                        style: o,
                        on: [ "click", function(e) {
                            if (e.preventDefault(), b.a.onRemoveEvent(i, E.hideMenu), E.contextMenu && E.contextMenu.isShow) E.hideMenu(); else {
                                var t = document.querySelector("#wk_box");
                                t && t.contains(this) || (t = null);
                                var o = {
                                    parent: t
                                }, s = this.getAttribute(n.embedDownloader.dataAttr), l = n.embedDownloader.checkUrl(s);
                                if (l) {
                                    var d = {
                                        action: l.action,
                                        extVideoId: l.extVideoId
                                    }, c = E.contextMenu = n.popupMenu.quickInsert(r, a.a.i18n.getMessage("download") + " ...", "sf-popupMenu", o);
                                    ne.prepareVideoLinks(d).then(e => {
                                        e.map(e => ("MP4" === e.format && (e.forceDownload = !0), e)), c.update(e);
                                    });
                                } else E.contextMenu = n.popupMenu.quickInsert(r, a.a.i18n.getMessage("noLinksFound"), "sf-popupMenu", o);
                            }
                        } ]
                    });
                    r.setAttribute(n.embedDownloader.dataAttr, t);
                    var i = y.a.create("span", {
                        class: "sf-video-feed-container",
                        on: [ "click", function(e) {
                            a.a.sendMessage({
                                action: "checkAndOpenProLanding",
                                id: "vk-4"
                            }), e.stopPropagation();
                        } ],
                        append: [ r ]
                    }), s = e.querySelector(".post_video_title");
                    s ? s.appendChild(i) : e.appendChild(i);
                },
                onLinkHover: function() {
                    if ("A" === this.tagName) {
                        var e = this.href || "";
                        0 === this.id.indexOf("post_media_lnk") && -1 !== e.indexOf("/video") && (E.contextMenu && E.contextMenu.isShow && E.hideMenu(), 
                        this.dataset[oe.linkDataAttr] || (this.dataset[oe.linkDataAttr] = 1, oe.addDownloadBtn(this)));
                    }
                },
                off: function() {
                    for (var e, t = document.querySelectorAll(".sf-video-feed-container"), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                    var o = Object(c.a)(oe.linkDataAttr), a = document.querySelectorAll("*[" + o + "]");
                    for (n = 0; e = a[n]; n++) e.removeAttribute(o);
                }
            }, ae = {
                photoCache: {},
                getAlbumId: function(e) {
                    if (!/(\?|&|#)act=edit/i.test(e)) {
                        var t = [];
                        t.push(e);
                        var n = Object(d.a)(e);
                        n.w && t.push(n.w), n.z && t.push.apply(t, n.z.split("/")), /#/.test(e) && (t.push(e.substr(e.indexOf("#") + 1)), 
                        t.push(decodeURIComponent(e.substr(e.indexOf("#") + 1)))), t.reverse();
                        var o = null, a = null;
                        return t.some((function(e) {
                            if (a = e.match(/(?:\/|#|=|^)(albums?|tag|photos|feed(?:\d+)?_|wall)(-?\d+)(?:_(\d+))?/i)) return a[3] ? o = /^(feed|wall)/.test(a[1]) ? a[1] + a[2] + "_" + a[3] : "album" + a[2] + "_" + a[3] : ("albums" == a[1] && (a[1] = "photos"), 
                            o = a[1] + a[2]), !0;
                        })), o;
                    }
                },
                getModuleName: function(e) {
                    var t = y.a.create("script", {
                        text: "(" + 'function(){if(window.cur&&window.cur.module&&typeof window.cur.module==="string"){document.body.dataset["{dataArg}"]=window.cur.module}}'.replace("{dataArg}", "sfModule") + ")();"
                    });
                    document.body.appendChild(t), setTimeout((function() {
                        t.parentNode.removeChild(t), e(document.body.dataset.sfModule);
                    }), 0);
                },
                isReply: function(e) {
                    return Object(f.a)(e, ".replies " + e.tagName) || Object(f.a)(e, ".wl_replies " + e.tagName);
                },
                getPopup: function(e, t, o) {
                    var r, i = n.playlist.getInfoPopupTemplate();
                    y.a.create(i.textContainer, {
                        append: [ y.a.create("p", {
                            text: e,
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "13px"
                            }
                        }), r = y.a.create("p", {
                            text: "",
                            style: {
                                color: "#868686",
                                fontSize: "14px",
                                lineHeight: "24px"
                            }
                        }) ]
                    });
                    var s = n.popupDiv(i.body, "sf_progress_popup", void 0, void 0, o), l = function e(n) {
                        e.state !== n && (e.state = n, i.buttonContainer.style.display = "none", r.style.display = "none", 
                        a.a.sendMessage({
                            action: "getWarningIcon",
                            type: t,
                            color: "#77D1FA"
                        }, (function(e) {
                            i.icon.style.backgroundImage = "url(" + e + ")";
                        })), "progress" === n && (r.style.display = "block"), "error" === n && (a.a.sendMessage({
                            action: "getWarningIcon",
                            type: t,
                            color: "#AAAAAA"
                        }, (function(e) {
                            i.icon.style.backgroundImage = "url(" + e + ")";
                        })), r.style.display = "block"));
                    };
                    return {
                        onPrepare: function(e) {
                            l("progress"), r.textContent = e;
                        },
                        onProgress: function(e, t) {
                            r.textContent = a.a.i18n.getMessage("vkFoundFiles").replace("%d", e) + " " + a.a.i18n.getMessage("vkFoundOf") + " " + t;
                        },
                        onReady: function() {
                            b.a.trigger(s, "kill");
                        },
                        onError: function(e) {
                            l("error"), r.textContent = e;
                        }
                    };
                },
                getLayer: function() {
                    var e = document.getElementById("layer_wrap");
                    return null !== e && "none" !== e.style.display && 0 !== e.textContent.length || (e = null), 
                    null === e && (null !== (e = document.getElementById("wk_layer_wrap")) && "none" !== e.style.display && 0 !== e.textContent.length || (e = null)), 
                    e;
                },
                _getModuleName: function() {
                    return new Promise((function(e, t) {
                        var n = y.a.create("script", {
                            text: '(function(dataArg){if(window.cur&&window.cur.module&&typeof window.cur.module==="string"){document.body.dataset[dataArg]=window.cur.module}})(' + JSON.stringify("sfModule") + ");"
                        });
                        document.body.appendChild(n), setTimeout((function() {
                            n.parentNode.removeChild(n), e(document.body.dataset.sfModule);
                        }), 0);
                    }));
                },
                _getLinks: async function(e) {
                    var t = this, o = Promise.resolve(), r = {}, i = t.getPopup(Y(), "photo", (function() {
                        r.abort = !0;
                    }));
                    r.onProgress = function(e, t) {
                        i.onProgress(e, t);
                    }, i.onPrepare(a.a.i18n.getMessage("download") + " ...");
                    try {
                        const o = await z.a.createLinkExtractor("vk-albums").extractLinks({
                            mediaId: e,
                            details: r
                        });
                        i.onReady();
                        const a = Y();
                        _ ? n.downloadList.showBeforeDownloadPopup(o, {
                            count: o.length,
                            folderName: a,
                            type: "photo",
                            onShowList: function() {
                                t.showListOfLinks(a, o, !0);
                            }
                        }) : t.showListOfLinks(a, o, !0);
                    } catch (e) {
                        "Abort" !== e.message && K.debug("_getLinks error", e), i.onError(a.a.i18n.getMessage("noLinksFound"));
                    }
                    return o;
                },
                rmPhotoAlbumDlBtn: function() {
                    for (var e, t = document.querySelectorAll([ ".sf-dl-ablum-btn-divide", ".sf-dl-ablum-btn" ]), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                },
                addNewPhotoAlbumDlBtn: function(e) {
                    var t = this, n = e.querySelector(".photos_album_intro_info"), o = e.querySelector(".page_block_header_extra"), r = n || o;
                    if (r && !r.querySelector(".sf-dl-ablum-btn")) {
                        var i = y.a.create("a", {
                            text: a.a.i18n.getMessage("vkDownloadPhotoAlbum"),
                            href: "#",
                            class: "sf-dl-ablum-btn",
                            on: [ "click", function(e) {
                                e.preventDefault(), a.a.sendMessage({
                                    action: "checkAndOpenProLanding",
                                    id: "vk-5"
                                });
                                var n = ae.getAlbumId(location.href);
                                t._getLinks(n);
                            } ]
                        }), s = y.a.create("span", {
                            append: i
                        });
                        n ? (s.classList.add("photos_album_info"), s = y.a.create(document.createDocumentFragment(), {
                            append: [ y.a.create("span", {
                                class: "divide sf-dl-ablum-btn-divide",
                                text: "|"
                            }), s ]
                        })) : o && (s.classList.add("photos_comments_link"), s.style.margin = "0 15px"), 
                        r.appendChild(s);
                    }
                },
                getContainer: function() {
                    var e = document.getElementById("photos_albums_container");
                    return e || (e = document.getElementById("photos_container")), e;
                },
                rmCurrentPhotoBtn: function(e) {
                    for (var t, n = void 0, o = document.querySelectorAll(".sf-dl-current-photo-btn"), a = 0; t = o[a]; a++) e && e.contains(t) ? n = t : t.parentNode.removeChild(t);
                    return n;
                },
                style: null,
                injectStyle: function() {
                    this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = y.a.create("style", {
                        text: Object(p.a)({
                            "div > .sf-dl-current-photo-btn": {
                                display: "none",
                                border: "1px solid #F8F8F8",
                                width: "20px",
                                height: "20px",
                                padding: 0,
                                position: "absolute",
                                background: "url(" + n.svg.getSrc("download", "#777777") + ") center no-repeat #F8F8F8",
                                backgroundSize: "12px",
                                top: "20px",
                                left: "30px",
                                zIndex: 10,
                                cursor: "pointer"
                            },
                            "div > .sf-dl-current-photo-btn.sf-style-black": {
                                border: 0,
                                background: "url(" + n.svg.getSrc("download", "#FFF") + ") center no-repeat #000",
                                backgroundSize: "14px",
                                padding: "2px 4px",
                                borderRadius: "2px",
                                opacity: .4,
                                transition: "opacity 100ms linear"
                            },
                            "div > .sf-dl-current-photo-btn:hover": {
                                background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #F8F8F8",
                                backgroundSize: "12px",
                                opacity: .8
                            },
                            "div > .sf-dl-current-photo-btn.sf-style-black:hover": {
                                background: "url(" + n.svg.getSrc("download", "#00B75A") + ") center no-repeat #000",
                                backgroundSize: "14px"
                            },
                            "div > .sf-dl-current-photo-btn:active": {
                                outline: 0,
                                boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                            },
                            "div:hover > .sf-dl-current-photo-btn": {
                                display: "block"
                            }
                        })
                    }), document.head.appendChild(this.style));
                },
                getMaxPhotoSize: function(e) {
                    var t = null, n = null;
                    [ "w", "z", "y", "x" ].some((function(o) {
                        return !!(t = e[o + "_"]) || (!!(n = e[o + "_src"]) || void 0);
                    })), t || (t = [ n ]);
                    var o, a;
                    return t[0] ? {
                        url: (o = e.base, a = t[0], a.match(/https?:\/\//i) ? ((a = new URL(a)).pathname.match(/\.[a-z]{3}$/i) || (a += ".jpg"), 
                        a.toString()) : (a.match(/\.[a-z]{3}$/i) || (a += ".jpg"), (o || "").replace(/\/[a-z0-9_:\.]*$/i, "") + "/" + a)),
                        width: t[2] && t[1],
                        height: t[1] && t[2]
                    } : null;
                },
                addNewDlCurrentPhotoBtn: function(e) {
                    var t = e;
                    if (Object(H.a)({
                        category: "append",
                        subcategory: "vk",
                        event: "b"
                    }), !this.rmCurrentPhotoBtn(t)) {
                        var o = e.closest(".pv_photo_wrap");
                        if (o) {
                            var r = y.a.create("a", {
                                class: [ "sf-dl-current-photo-btn", "sf-style-black" ],
                                href: "#",
                                title: a.a.i18n.getMessage("download"),
                                on: [ [ "click", async function(e) {
                                    if (e.stopPropagation(), e.preventDefault(), b.a.onRemoveEvent(this, E.hideMenu), 
                                    E.contextMenu && E.contextMenu.isShow) return void E.hideMenu();
                                    var r = E.contextMenu = n.popupMenu.quickInsert(this, a.a.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                        parent: t
                                    });
                                    const i = o.querySelector(".like_wrap").classList;
                                    let s = null;
                                    i.forEach(e => {
                                        const t = e.match(/photo(-?\d+_\d+)/);
                                        s = t && t[1];
                                    });
                                    try {
                                        let e = await z.a.createLinkExtractor("vk-photo").extractLinks({
                                            mediaId: s
                                        });
                                        e = Array.isArray(e) ? e[0] : e;
                                        var l = [];
                                        l.push({
                                            href: e.url,
                                            title: e.filename,
                                            quality: a.a.i18n.getMessage("download"),
                                            format: " ",
                                            ext: e.ext,
                                            forceDownload: !0,
                                            isOther: !0,
                                            isBlank: !0,
                                            func: function() {
                                                "undefined" != typeof GM_info && "Tampermonkey" === GM_info.scriptHandler ? setTimeout(() => r.hide(), 2500) : r.hide();
                                            }
                                        }), l.push({
                                            href: "#getAlbum",
                                            title: "",
                                            quality: a.a.i18n.getMessage("vkDownloadPhotoAlbum"),
                                            format: " ",
                                            ext: "",
                                            noSize: !0,
                                            isOther: !0,
                                            func: function(e) {
                                                e.preventDefault(), ae.downloadPhoto(), r.hide();
                                            }
                                        }), r.update(l);
                                    } catch (e) {
                                        return console.error(e), r.update(a.a.i18n.getMessage("noLinksFound"));
                                    }
                                } ], [ "mousedown", function(e) {
                                    e.stopPropagation();
                                } ] ]
                            });
                            new A.a({
                                queries: [ {
                                    css: S.vk.contextMenu,
                                    is: "added",
                                    callback: () => {
                                        E.contextMenu && E.contextMenu.isShow && (E.hideMenu(), r.click());
                                    }
                                } ]
                            }), t.appendChild(r);
                        }
                    }
                },
                downloadPhoto: function() {
                    let e = this.getAlbumId(location.href);
                    if (!e) {
                        const t = document.querySelector(".pv_album_name a");
                        t && !te.elIsHidden(t) && (e = this.getAlbumId(t.href));
                    }
                    this._getLinks(e);
                },
                showListOfPhotosContent: function(e, t) {
                    var n;
                    return "<!DOCTYPE html><html>" + y.a.create("html", {
                        append: [ y.a.create("head", {
                            append: [ y.a.create("meta", {
                                attr: {
                                    charset: "utf-8"
                                }
                            }), y.a.create("style", {
                                text: "a,img{display:block;margin-bottom:5px;}p{width: 640px}"
                            }) ]
                        }), y.a.create("body", {
                            append: [ e, y.a.create("p", {
                                text: a.a.i18n.getMessage("vkListOfPhotosInstruction")
                            }), y.a.create("br"), y.a.create("br"), (n = document.createDocumentFragment(), 
                            t.forEach((function(e) {
                                var t = e.url, o = e.filename || "", a = y.a.create("img", {
                                    src: t,
                                    alt: "photo"
                                });
                                o && (a = y.a.create("a", {
                                    href: t,
                                    download: o,
                                    append: a
                                })), n.appendChild(a);
                            })), n) ]
                        }) ]
                    }).innerHTML + "</html>";
                },
                showListOfLinks: function(e, t, o) {
                    var r;
                    r = o ? y.a.create(document.createDocumentFragment(), {
                        append: [ y.a.create("p", {
                            append: [ y.a.create("a", {
                                text: a.a.i18n.getMessage("vkListOfPhotos"),
                                href: "#",
                                class: "sf__hidden",
                                style: {
                                    fontWeight: "bolder",
                                    border: "none",
                                    textDecoration: "underline"
                                },
                                on: [ "click", function(n) {
                                    n.preventDefault();
                                    var o = ae.showListOfPhotosContent(e, t), r = "";
                                    a.a.isChrome || a.a.isTM ? (r = Object(m.a)(o, "text/html", !0), a.a.sendMessage({
                                        action: "openTab",
                                        url: r
                                    })) : (r = Object(m.a)(o, "text/html"), window.open(r, "_blank"));
                                } ]
                            }) ]
                        }) ]
                    }) : "";
                    for (var i, s, l = "", d = 0; i = t[d]; d++) l += i.url + "\r\n";
                    var c = y.a.create(document.createDocumentFragment(), {
                        append: [ y.a.create("p", {
                            text: e,
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "5px"
                            }
                        }), y.a.create("p", {
                            append: Object(k.a)(a.a.i18n.getMessage("vkListOfLinksInstruction"))
                        }), r, s = y.a.create("textarea", {
                            text: l,
                            cols: 60,
                            rows: 10,
                            style: {
                                width: "100%"
                            }
                        }), a.a.isChrome || a.a.isFirefox ? y.a.create("button", {
                            text: a.a.i18n.getMessage("copy"),
                            style: {
                                height: "27px",
                                backgroundColor: "#ffffff",
                                border: "1px solid #9e9e9e",
                                marginTop: "6px",
                                paddingLeft: "10px",
                                paddingRight: "10px",
                                borderRadius: "5px",
                                fontSize: "14px",
                                cursor: "pointer",
                                cssFloat: "right"
                            },
                            on: [ "click", function(e) {
                                var t = this;
                                t.disabled = !0, a.a.isFirefox ? (s.select(), document.execCommand("copy")) : a.a.sendMessage({
                                    action: "addToClipboard",
                                    text: l
                                }), setTimeout((function() {
                                    t.disabled = !1;
                                }), 1e3);
                            } ],
                            append: y.a.create("style", {
                                text: Object(p.a)({
                                    "#savefrom_popup_box button:hover:not(:disabled)": {
                                        backgroundColor: "#597A9E !important",
                                        borderColor: "#597A9E !important",
                                        color: "#fff"
                                    },
                                    "#savefrom_popup_box button:active": {
                                        opacity: .9
                                    }
                                })
                            })
                        }) : void 0 ]
                    });
                    n.popupDiv(c);
                }
            }, re = {
                mobileMenu: null,
                observer: null,
                styleEl: null,
                run: function() {
                    var e = this;
                    if (!A.a.isAvailable()) return;
                    if (e.observer) return e.observer.start();
                    const t = t => {
                        for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                        e.insertVideoBtn(n));
                    };
                    e.observer = new A.a({
                        queries: [ {
                            css: S.vk.audioItemAdd,
                            is: "added",
                            callback: t => {
                                for (let n, o = 0; n = t.added[o]; o++) n.dataset.sfSkip > 0 || (n.dataset.sfSkip = "1", 
                                e.insertAudioBtn(n));
                            }
                        }, {
                            css: S.vk.bodyAdd,
                            is: "added",
                            callback: t
                        }, {
                            css: S.vk.videoPostPanel,
                            is: "added",
                            callback: t
                        }, {
                            css: "." + b.a.onRemoveClassName,
                            is: "removed",
                            callback: e => {
                                for (let t, n = 0; t = e.removed[n]; n++) b.a.onRemoveListener(t);
                            }
                        } ]
                    }), e.insertStyle();
                },
                hideMenu: function() {
                    re.mobileMenu && (re.mobileMenu.hide(), re.mobileMenu = null);
                },
                insertStyle: function() {
                    this.styleEl ? this.styleEl.parentNode || document.head.appendChild(this.styleEl) : (this.styleEl = y.a.create("style", {
                        class: "sf-style",
                        text: Object(p.a)([ {
                            selector: ".savefrom_vk_download.sf-audio",
                            style: {
                                display: "block",
                                float: "right",
                                borderRadius: "3px",
                                width: "22px",
                                height: "22px",
                                marginTop: "1px",
                                marginLeft: "3px",
                                marginRight: "3px",
                                background: "url(" + n.svg.getSrc("download", "#ffffff") + ") center no-repeat",
                                backgroundSize: "12px",
                                backgroundColor: "#5E80AA"
                            }
                        }, {
                            selector: ".audio_item .savefrom_vk_download.sf-audio",
                            style: {
                                position: "absolute",
                                right: "32px",
                                top: 0,
                                bottom: 0,
                                margin: "auto"
                            }
                        }, {
                            selector: ".audio_item.ai_current .savefrom_vk_download.sf-audio",
                            style: {
                                bottom: "auto",
                                top: "6px"
                            }
                        } ])
                    }), document.head.appendChild(this.styleEl));
                },
                getAudioUrlFromNode: async function(e) {
                    const t = await te.getNewNodeTrackInfo(e);
                    if (!t.fullId || !t.actionHash || !t.urlHash) throw new Error("Track info not valid for fetch audio link");
                    const n = te.requestReloadAudio(t.fullId, t.actionHash, t.urlHash), o = Object(P.a)([], "function(){return vk.id}");
                    return Promise.all([ n, o ]).then(e => {
                        let [t, n] = e, o = O.a(n, t.url);
                        return O.b(o) ? O.c(o) : o;
                    });
                },
                onAudioBtnClick: function(e) {
                    if (e.preventDefault(), e.stopPropagation(), e.target.href) return n.downloadOnClick(e);
                    const t = e.target.closest(".audio_item");
                    t && this.getAudioUrlFromNode(t).then(t => {
                        e.target.href = t, n.downloadOnClick(e);
                    }).catch(e => {
                        K.error("getAudioUrlFromNode error: " + e.message);
                    });
                },
                getAudioDlBtnNode: function(e) {
                    return y.a.create("a", {
                        class: [ "savefrom_vk_download", "sf-audio" ],
                        download: w.a.modify(e),
                        target: "_blank",
                        on: [ "click", this.onAudioBtnClick.bind(this) ],
                        title: a.a.i18n.getMessage("download")
                    });
                },
                insertAudioBtn: function(e) {
                    let t = null;
                    const n = e.querySelector(".ai_label");
                    if (n) {
                        const e = n.textContent.trim(), o = n.querySelector(".ai_title"), a = n.querySelector(".ai_artist"), r = o && o.textContent.trim(), i = a && a.textContent.trim();
                        t = r && i ? `${i.trim()} – ${r.trim()}` : e;
                    }
                    t = (t || "unknown") + ".mp3";
                    const o = e.querySelector(".ai_dur");
                    if (!o) return;
                    const a = o.parentNode, r = this.getAudioDlBtnNode(t), i = a.querySelector(".savefrom_vk_download");
                    if (i) i.parentNode.replaceChild(r, i); else {
                        const e = o.nextElementSibling;
                        if (!e) return;
                        a.insertBefore(r, e);
                    }
                },
                onVideoBtnClick: function(e, t) {
                    t.preventDefault(), t.stopPropagation(), re.hideMenu();
                    var o = re.mobileMenu = n.mobileLightBox.show(a.a.i18n.getMessage("download") + " ..."), r = a.a.i18n.getMessage("noLinksFound");
                    if (e.request) {
                        var i = function(t) {
                            if (t && "getPladformVideo" === e.request.action) r = ne.prepareLinks(ne.preparePladformLinks(t)); else {
                                var a = n.embedDownloader.reMapHosting(t.action);
                                a && t && t.links && (r = n.popupMenu.prepareLinks[a](t.links, t.title));
                            }
                            if (!r.length) {
                                const e = Array.from(document.body.querySelectorAll('.vv_inline_video source[type="video/mp4"]'));
                                r = e.map(e => {
                                    let t = document.querySelector(".VideoPageInfoRow__title"), n = e.src.match(/.(\d+)\.mp4/);
                                    return {
                                        title: t ? t.textContent : "video",
                                        href: e.src,
                                        forceDownload: !0,
                                        ext: "mp4",
                                        format: "MP4",
                                        quality: n ? n[1] : ""
                                    };
                                });
                            }
                            o.update(r);
                        };
                        try {
                            a.a.sendMessage(e.request, i);
                        } catch (t) {
                            i();
                        }
                    } else r = ne.prepareLinks(e), o.update(r);
                },
                appendVideoBtn: function(e, t) {
                    var o = t.querySelector(".VideoPageInfoRow__title");
                    const a = n.svg.getSvg("download", "#4986cc", "20px");
                    a.style.marginLeft = "17px", a.style.marginTop = "6px", a.style.float = "right", 
                    a.style.cursor = "pointer", a.addEventListener("click", this.onVideoBtnClick.bind(this, e)), 
                    o && o.appendChild(a), b.a.onRemoveEvent(a, re.hideMenu);
                },
                insertVideoBtn: function(e) {
                    var t = this, n = e.querySelectorAll("iframe, video, a")[0], o = Object(l.a)(e, "VideoPage"), a = function() {
                        var e = /video(-?\d+)_(-?\d+)/.exec(location.href);
                        return e && {
                            request: {
                                hosting: "vk",
                                action: "getVKLinks",
                                extVideoId: "video" + e[1] + "_" + e[2]
                            }
                        };
                    };
                    n ? ne.getLinksFromPlayer(o, n, (function(e, n) {
                        e || (e = a()), e && t.appendVideoBtn(e, n);
                    })) : e.querySelector(".vv_not_support") && a() && t.appendVideoBtn(a(), o);
                }
            };
        }));
    }
});