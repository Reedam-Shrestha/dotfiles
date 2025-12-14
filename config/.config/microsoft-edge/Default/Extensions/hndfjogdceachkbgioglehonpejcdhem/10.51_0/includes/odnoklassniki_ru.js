!function(e) {
    function t(t) {
        for (var n, i, s = t[0], d = t[1], l = t[2], u = 0, p = []; u < s.length; u++) i = s[u], 
        Object.prototype.hasOwnProperty.call(a, i) && a[i] && p.push(a[i][0]), a[i] = 0;
        for (n in d) Object.prototype.hasOwnProperty.call(d, n) && (e[n] = d[n]);
        for (c && c(t); p.length; ) p.shift()();
        return r.push.apply(r, l || []), o();
    }
    function o() {
        for (var e, t = 0; t < r.length; t++) {
            for (var o = r[t], n = !0, s = 1; s < o.length; s++) {
                var d = o[s];
                0 !== a[d] && (n = !1);
            }
            n && (r.splice(t--, 1), e = i(i.s = o[0]));
        }
        return e;
    }
    var n = {}, a = {
        11: 0
    }, r = [];
    function i(t) {
        if (n[t]) return n[t].exports;
        var o = n[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(o.exports, o, o.exports, i), o.l = !0, o.exports;
    }
    i.m = e, i.c = n, i.d = function(e, t, o) {
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
        }), 2 & t && "string" != typeof e) for (var n in e) i.d(o, n, function(t) {
            return e[t];
        }.bind(null, n));
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
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], d = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var l = 0; l < s.length; l++) t(s[l]);
    var c = d;
    r.push([ 107, 0 ]), o();
}({
    107: function(e, t, o) {
        "use strict";
        o.r(t);
        var n = o(0), a = o(9), r = o(18), i = o(31), s = o(27), d = o(24), l = o(40), c = o(12), u = o(23), p = o(19), f = o(33), h = o(3), m = o(1), g = o(16), v = o(6), k = o(7), y = o(59), b = o(20), w = o(11), x = o(41), M = o(13), O = o(65), _ = o(10), S = o(15), L = o(8);
        const P = o(35), C = Object(k.a)("odnoklassniki_ru"), I = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome");
        b.a.isSingle() && Object(r.b)("odnoklassniki", (function(e, t) {
            const r = Object(a.a)(t);
            var k = t.preferences, b = k.moduleOdnoklassniki ? 1 : 0, A = n.a.isChrome || n.a.isFirefox || n.a.isGM && n.a.isTM;
            const {selectorsConfig: N} = t.preferences;
            n.a.onMessage.addListener((function(t, o, n) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return n({
                        state: b,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return q.changeState(t.state);
                }
                "updatePreferences" !== t.action ? b && ("updateLinks" === t.action && j(), "downloadMP3Files" === t.action && (A ? R.downloadMP3Files() : R.showListOfAudioFiles(!1)), 
                "downloadPlaylist" === t.action && R.showListOfAudioFiles(!0)) : Object.assign(k, t.preferences);
            })), b && setTimeout((function() {
                q.run();
            }));
            var q = {
                linkCache: {},
                contextMenu: null,
                videoToken: null,
                run: function() {
                    if (b = 1, R.getJsSessionId(), F.injectStyle(), D.injectStyle(), w.a.isAvailable()) return q.mutationMode.enable();
                },
                changeState: function(e) {
                    b = e, T.rmBtn(), R.disable(), D.rmCurrentPhotoBtn(), F.disable(), F.rmBtn(), q.hideMenu(), 
                    q.mutationMode.stop(), q.clearCache(), e && q.run();
                },
                hideMenu: function() {
                    q.contextMenu && (q.contextMenu.hide(), q.contextMenu = null);
                },
                clearCache: function() {
                    var e = q.linkCache;
                    for (var t in e) delete e[t];
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, o = Object(d.a)(e), n = document.querySelectorAll("[" + o + "]"), a = 0; t = n[a]; a++) t.removeAttribute(o);
                        }));
                    },
                    wrapOnPhotoOver: function() {
                        b && D.addCurrentDlBtn(this);
                    },
                    wrapVideoFeedOnImgOver: function() {
                        b && F.onImgOver.call(this);
                    },
                    wrapAudioOnMouseOver: function() {
                        b && R.onMouseOver.apply(this, arguments);
                    },
                    wrapAudioOnMouseOut: function() {
                        b && R.onMouseOut.apply(this, arguments);
                    },
                    wrapNewAudioOnMouseEnter: function() {
                        if (b) try {
                            R.onNewMouseEnter.apply(this, arguments);
                        } catch (e) {
                            C.error("wrapNewAudioOnMouseEnter error", e);
                        }
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        var e = this;
                        const t = t => {
                            for (let o, n = 0; o = t.added[n]; n++) o.sfSkip > 0 || (o.sfSkip = "1", h.a.on(o, "mouseenter", e.wrapAudioOnMouseOver), 
                            h.a.on(o, "mouseleave", e.wrapAudioOnMouseOut));
                        }, o = e => {
                            let {added: t} = e;
                            t.forEach(e => {
                                e.sfSkip || (e.sfSkip = "1", R.appendDownloadMobileMusic(e));
                            });
                        }, a = t => {
                            for (let o, n = 0; o = t.added[n]; n++) o.dataset.sfSkip > 0 || (o.dataset.sfSkip = "1", 
                            h.a.one(o, "mouseenter", e.wrapVideoFeedOnImgOver));
                        }, s = e => {
                            let {added: t} = e;
                            t.forEach(e => {
                                if (e.dataset.sfSkip) return;
                                e.dataset.sfSkip = "1";
                                let t = e.closest(".section, .feed-card, .theme-comments-head");
                                t && T.appendDownloadMobileVideo(t);
                            });
                        }, d = [];
                        "m.ok.ru" === location.host && d.push({
                            css: N.ok_ru.mobileMusic,
                            is: "added",
                            callback: o
                        }, {
                            css: N.ok_ru.mobileVideo,
                            is: "added",
                            callback: s
                        }), this.observer = new w.a({
                            queries: [ ...d, {
                                css: N.ok_ru.musicAdd,
                                is: "added",
                                callback: t
                            }, {
                                css: N.ok_ru.rowOnPageOkMusic,
                                is: "added",
                                callback: async e => {
                                    let {added: t} = e;
                                    t.filter(e => !e.dataset.sfReady).map(e => (e.dataset.sfReady = 1, e)).map(e => {
                                        const t = document.createElement("a");
                                        Object(_.a)({
                                            category: "append",
                                            subcategory: "ok",
                                            event: "b"
                                        }), t.classList.add("sf-audio", "savefrom_ok_download"), e.style.position = "relative", 
                                        e.appendChild(t), t.style.position = "absolute", t.style.top = "10px", t.style.right = "15px", 
                                        t.style.width = "16px", t.style.height = "16px", e.closest(".track-with-cover").addEventListener("mouseleave", () => t.style.display = "none"), 
                                        e.addEventListener("mouseenter", () => {
                                            t.style.display = "block", t.href || L.a.createLinkExtractor("ok-profile_music").extractLinks({
                                                element: e
                                            }).then(e => {
                                                t.href = e[0].url;
                                                const o = e[0].bitrate + " " + n.a.i18n.getMessage("kbps"), a = r.sizeHuman(e[0].size, 2);
                                                t.title = `${a} ~ ${o}`;
                                            });
                                        }), t.addEventListener("click", t => {
                                            Object(_.a)({
                                                category: "download",
                                                subcategory: "ok",
                                                event: "track"
                                            }), t.stopPropagation(), t.preventDefault(), n.a.sendMessage({
                                                action: "checkAndOpenProLanding",
                                                id: "ok-1"
                                            });
                                            const o = e.closest(".track-with-cover"), a = o.querySelector('[data-l="t,artist"]').textContent, r = o.querySelector('[data-l="t,title"]').textContent, i = v.a.modify(`${a} - ${r}`);
                                            n.a.sendMessage({
                                                action: "downloadFile",
                                                options: {
                                                    filename: i + ".mp3",
                                                    url: t.target.href
                                                }
                                            });
                                        });
                                    });
                                }
                            }, {
                                css: N.ok_ru.musicAdd2,
                                is: "added",
                                callback: t
                            }, {
                                css: N.ok_ru.photoLayerAdd,
                                is: "added",
                                callback: t => {
                                    if (!n.a.isSafari) for (let o, n = 0; o = t.added[n]; n++) o.dataset.sfSkip > 0 || (o.dataset.sfSkip = "1", 
                                    h.a.one(o, "mouseenter", e.wrapOnPhotoOver));
                                }
                            }, {
                                css: N.ok_ru.videoAdd,
                                is: "added",
                                callback: e => {
                                    for (let t, o = 0; t = e.added[o]; o++) {
                                        if (t.dataset.sfSkip > 0) continue;
                                        t.dataset.sfSkip = "1";
                                        const e = Object(p.a)(t, ".vp_video");
                                        if (!e) return;
                                        const o = T.getPlayerOptions(t);
                                        o && T.appendLinkUnderVideo(e.parentNode, o, t);
                                    }
                                }
                            }, {
                                css: N.ok_ru.videoImageAdd,
                                is: "added",
                                callback: t => {
                                    for (let o, n = 0; o = t.added[n]; n++) if (!(o.dataset.sfSkip > 0)) {
                                        if (o.dataset.sfSkip = "1", o = Object(i.a)(o, "vid-card_cnt"), o.dataset.sfSkip) return;
                                        h.a.one(o, "mouseenter", e.wrapVideoFeedOnImgOver);
                                    }
                                }
                            }, {
                                css: N.ok_ru.imageAdd,
                                is: "added",
                                callback: a
                            }, {
                                css: N.ok_ru.imageAdd2,
                                is: "added",
                                callback: a
                            }, {
                                css: N.ok_ru.imageAdd3,
                                is: "added",
                                callback: a
                            }, {
                                css: "." + h.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, o = 0; t = e.removed[o]; o++) h.a.onRemoveListener(t);
                                }
                            }, {
                                css: N.ok_ru.sfVideoFeedAdd,
                                is: "added",
                                callback: e => {
                                    const t = e.target;
                                    for (let o, n = 0; o = e.added[n]; n++) o.addEventListener("click", (function(e) {
                                        F.onBtnClick(e, this, t);
                                    })), Object(_.a)({
                                        category: "append",
                                        subcategory: "ok",
                                        event: "b"
                                    });
                                }
                            }, {
                                css: N.ok_ru.wmTrackAdd,
                                is: "added",
                                callback: t => {
                                    for (let o, n = 0; o = t.added[n]; n++) o.dataset.sfSkip > 0 || (o.dataset.sfSkip = "1", 
                                    h.a.one(o, "mouseenter", e.wrapNewAudioOnMouseEnter));
                                }
                            } ]
                        });
                    }
                }
            }, j = function() {
                try {
                    q.clearCache(), E(), R.getJsSessionId(), T.catchPopup();
                } finally {
                    r.showLinksUpdatedNotification();
                }
            }, E = function() {
                for (var e = document.querySelectorAll(".savefrom_ok_download"), t = e.length - 1; t >= 0; t--) e[t].parentNode.removeChild(e[t]);
            }, R = {
                downloadIdPrefix: "savefrom_ok_audio_download_",
                infoIdPrefix: "savefrom_ok_audio_info_",
                lastRow: null,
                lastRowCandidate: null,
                timer: 0,
                jsessionId: "",
                clientHashV: "",
                scriptNode: null,
                cache: {},
                ajaxTimer: {},
                appendDownloadMobileMusic(e) {
                    const t = m.a.create("a", {
                        style: {
                            position: "absolute",
                            top: "-6px",
                            left: "16px"
                        },
                        append: [ r.svg.getSvg("download", "#f1bc7f", 14, 14) ],
                        on: [ "click", async function(t) {
                            t.preventDefault(), t.stopPropagation(), L.a.createLinkExtractor("ok-music").extractLinks({
                                element: e
                            }).then(e => {
                                r.download(e[0].filename, e[0].url);
                            }).catch(e => {
                                C.error("appendDownloadMobileMusic. click download error", e), this.style.opacity = .3;
                            });
                        } ]
                    }), o = e.querySelector(".music_track_aux");
                    o && o.appendChild(t);
                },
                showRowElements: function(e, t, o) {
                    if (e) {
                        var n = e.querySelectorAll("div.savefrom_ok_download");
                        n = e.querySelectorAll("div.savefrom_ok_download");
                        for (var a = 0; a < n.length; a++) n[a].style.display = t ? "" : "none";
                    }
                },
                getNodeTrackId: function(e) {
                    var t = e.getAttribute("data-query");
                    if (t) try {
                        if ((t = JSON.parse(t)) && t.trackId) return t.trackId;
                    } catch (e) {
                        return null;
                    }
                    var o = e.querySelector("span.track_play[onclick]");
                    if (o) {
                        var n = /(?:playMediatopic|playFeedTrack)\(['"]?(\d+)['"]?/.exec(o.getAttribute("onclick"));
                        return n && n[1];
                    }
                    return e.dataset.trackId ? e.dataset.trackId : null;
                },
                getTrackId: function(e) {
                    var t = R.getNodeTrackId(e);
                    if (t) return (n = {})[t] = e, n;
                    var o = e.id;
                    if (o) {
                        var n, a = o.indexOf("#");
                        if (-1 !== a && (o = o.substr(a + 1)), (t = r.getMatchFirst(o, /^\w+_(\d+)$/i)) || -1 !== o.indexOf("GROUP_FEED") && (t = o.substr(o.lastIndexOf("_") + 1)), 
                        t) return (n = {})[t] = e, n;
                    }
                    return null;
                },
                showRowLinks: function(e) {
                    var t = R.getTrackId(e);
                    for (var o in t) if (R.handleRow(o, t[o])) return !0;
                    return !1;
                },
                disable: function() {
                    R.lastRowCandidate = null, R.lastRow = null;
                    for (var e, t = document.querySelectorAll(".savefrom_ok_download"), o = 0; e = t[o]; o++) e.parentNode.removeChild(e);
                },
                getJsSessionId: function() {
                    return ("m.ok.ru" === location.host ? () => {
                        const e = Array.from(document.querySelectorAll("script"));
                        for (let t = 0; t < e.length; t++) {
                            if (!e[t].textContent) continue;
                            const o = e[t].textContent.match(/"jsid":"(.*?)"/);
                            if (o && o[1]) return Promise.resolve(o[1]);
                        }
                        return Promise.resolve(void 0);
                    } : function() {
                        return new Promise((function(e, t) {
                            var o = location.protocol + "//" + location.host + "/web-api/music/conf";
                            Object(f.a)({
                                type: "POST",
                                url: o,
                                data: "_",
                                json: !0,
                                localXHR: !0
                            }, (function(o, n, a) {
                                !o && a && a.sid ? e(a.sid) : t(new Error("Get jsSessionId error!"));
                            }));
                        }));
                    })().then((function(e) {
                        R.jsessionId = e;
                    }), (function(e) {
                        C.debug("getJsSessionId error", e);
                    }));
                },
                getLink: function(e) {
                    e && R.jsessionId && (R.ajaxTimer[e] = window.setTimeout((function() {
                        delete R.ajaxTimer[e], R.deleteLink(e);
                    }), 3e4), n.a.sendMessage({
                        action: "getOdnoklassnikiAudioLinks",
                        url: location.href,
                        trackId: e,
                        jsessionId: R.jsessionId
                    }, (function(e) {
                        R.setLink(e.trackId, e.data);
                    })));
                },
                onMouseOver: function() {
                    if (R.jsessionId) {
                        var e = this;
                        e && (R.lastRowCandidate = e, clearTimeout(R.timer), R.lastRow !== e && (R.timer = window.setTimeout((function() {
                            R.showRowElements(R.lastRow, !1), R.lastRow = e, R.lastRowCandidate = null, R.showRowElements(R.lastRow, !0);
                        }), 250)));
                    }
                },
                onMouseOut: function() {
                    var e = this;
                    (R.lastRow && R.lastRow.contains(e) || R.lastRowCandidate && R.lastRowCandidate.contains(e)) && (clearTimeout(R.timer), 
                    R.timer = window.setTimeout((function() {
                        R.showRowElements(R.lastRow, !1), R.lastRow = null, R.lastRowCandidate = null;
                    }), 1e3)), e = null;
                },
                onNewMouseEnter(e) {
                    if (!this.querySelector(".savefrom_ok_download")) {
                        const e = Object(y.a)(this);
                        if (document.querySelector(e) !== this) throw new Error("Node path is incorrect");
                        return R.getNodeTrack(e).then(e => {
                            "WM-TRACK2" === this.tagName ? R.insertButtonOnOver(this, e) : R.insertButton(this, e);
                        });
                    }
                },
                insertButtonOnOver(e, t) {
                    const o = new (Object(x.a)())(o => {
                        if (!b) return n();
                        let a = null, r = null, i = 0, s = 0;
                        for (;a = o.shift(); ) if ("childList" === a.type && a.target === e) for (i = 0, 
                        s = a.addedNodes; r = a.addedNodes[i]; i++) if ("SLOT" === r.tagName && "controls" === r.name) {
                            e.querySelector(".savefrom_ok_download") || (this.insertButton(e, t), n());
                            break;
                        }
                    }), n = function() {
                        o.disconnect();
                    };
                    o.observe(e, {
                        childList: !0
                    });
                },
                insertButton(e, t) {
                    let o = [ "sf-audio", "savefrom_ok_download" ], n = null;
                    if ("WM-TRACK" === e.tagName ? n = e.querySelector(".wm-track_controls") : "WM-TRACK2" === e.tagName && (o.push("sf-audio-2"), 
                    n = e.querySelector('slot[name="controls"]')), e.classList.contains("track-with-cover") && (n = e.querySelector('[data-l="t,addTrack"]')), 
                    !n) {
                        const t = e.querySelector('slot[name="controls"], wm-duration');
                        n = document.createElement("div"), e.insertBefore(n, t);
                    }
                    const a = m.a.create("a", {
                        href: "#",
                        data: {
                            state: "idle",
                            trackId: t.id
                        },
                        class: o,
                        style: {
                            display: "none",
                            position: "relative",
                            width: "16px",
                            height: "16px",
                            verticalAlign: "middle"
                        },
                        on: [ [ "mouseenter", R.handlePreload ], [ "click", R.handleClickNewButton ], [ "mouseenter", function() {
                            B.tooltip.textContent = R.getNewButtonTooltipLabel(this), B.show(this);
                        } ], [ "mouseleave", function() {
                            B.hide();
                        } ], [ "sf-state-change", function() {
                            B.tooltip.textContent = R.getNewButtonTooltipLabel(this), B.updatePos(this);
                        } ], [ "mouseover", e => {
                            if (I) {
                                if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(S.b)(a, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                                Object(S.a)(a, {
                                    defaultWidth: 400,
                                    defaultHeight: 60
                                });
                            }
                        } ] ]
                    });
                    Object(_.a)({
                        category: "append",
                        subcategory: "ok",
                        event: "b"
                    }), n.appendChild(a);
                },
                getNewButtonTooltipLabel(e) {
                    switch (e.dataset.state) {
                      case "pending":
                        return "...";

                      case "done":
                        {
                            const {duration: t, size: o} = JSON.parse(e.dataset.data);
                            let a = "";
                            if (o) {
                                const e = r.sizeHuman(o, 2);
                                if (t) {
                                    a = `${e} ~ ${Math.floor(o / t / 125) + " " + n.a.i18n.getMessage("kbps")}`;
                                } else a = "" + e;
                            } else a = n.a.i18n.getMessage("getFileSizeFailTitle");
                            return a;
                        }

                      case "error":
                        return n.a.i18n.getMessage("noLinksFound");

                      default:
                        return "";
                    }
                },
                handlePreload(e) {
                    const t = e.target.closest("wm-track") || e.target.closest("wm-track2");
                    return L.a.createLinkExtractor("ok-music").extractLinks({
                        element: t
                    }).then(t => {
                        this.href = t[0].url, this.download = t[0].filename, this.dataset.data = JSON.stringify({
                            duration: t[0].duration,
                            size: t[0].size
                        }), this.dataset.state = "done", this.dispatchEvent(new CustomEvent("sf-state-change")), 
                        this.dataset.downloadOnReady > 0 && R.handleClickNewButton.call(this, e);
                    }).catch(e => {
                        C.error("LinkExtractor error", e), this.dataset.state = "error", this.dispatchEvent(new CustomEvent("sf-state-change"));
                    });
                },
                handleClickNewButton(e) {
                    e.stopPropagation(), "done" !== this.dataset.state ? (e.preventDefault(), "1" !== this.dataset.downloadOnReady && (this.dataset.downloadOnReady = "1")) : r.downloadOnClick(e);
                },
                getNodeTrack: e => Object(g.a)([ e ], 'function(nodePath){var el=document.querySelector(nodePath);if(el&&el.props&&el.props.track){return el.props.track}if(el&&el.model&&el.model._data.get("track")){return el.model._data.get("track")}throw new Error("Track information not found")}'),
                getNodePath(e) {
                    const t = [];
                    for (;e.parentNode && 1 === e.parentNode.nodeType; ) {
                        let o = "";
                        const n = [].slice.call(e.parentNode.childNodes);
                        n.length > 1 && (o = `:nth-child(${n.indexOf(e) + 1})`), t.unshift(`${e.tagName}${o}`), 
                        e = e.parentNode;
                    }
                    return t.join(">");
                },
                handleRow: function(e, t) {
                    if (!e || !t) return !1;
                    var o = t;
                    o.style.position = "relative";
                    var a = t.querySelector(".m_c_duration, .m_portal_duration"), i = document.createElement("div");
                    i.className = "savefrom_ok_download";
                    var s = 40, d = document.getElementById("mmpcw");
                    d && d.contains(t) && (s = 65), r.setStyle(i, {
                        color: "#fff",
                        background: "#46aa19",
                        border: "1px solid #337d12",
                        borderRadius: "3px",
                        padding: "1px 5px",
                        position: "absolute",
                        right: s + "px",
                        top: "50%",
                        lineHeight: "15px",
                        fontSize: "12px",
                        opacity: 0,
                        zIndex: 9999,
                        cursor: "pointer"
                    }), i.addEventListener("click", R.onBoxClick, !1), i.addEventListener("mousedown", (function(e) {
                        e.stopPropagation();
                    }), !1);
                    var l = R.getTitle(e, t), c = function(e, t, o) {
                        null == o && (o = !0);
                        var n = document.createElement("a");
                        return n.href = e, n.className = "savefrom_ok_download", n.textContent = t, o && n.setAttribute("target", "_blank"), 
                        n;
                    }("#", "...");
                    c.id = R.downloadIdPrefix + e, c.title = n.a.i18n.getMessage("downloadTitle"), a && c.setAttribute("data-savefrom-helper-duration", R.secondsFromDurationNode(a)), 
                    l && (l += ".mp3", c.setAttribute("download", v.a.modify(l))), r.setStyle(c, {
                        color: "#fff",
                        fontWeight: "normal"
                    }), c.addEventListener("click", R.onDownloadLinkClick, !1), i.appendChild(c), o.appendChild(i), 
                    R.cache[e] ? R.setLinkFromCache(e, c) : R.getLink(e), i.style.marginTop = "-" + i.offsetHeight / 2 + "px", 
                    i.style.opacity = "1";
                    var u = document.createElement("span");
                    return u.textContent = String.fromCharCode(215), u.title = n.a.i18n.getMessage("close"), 
                    r.setStyle(u, {
                        color: "#fff",
                        fontFamily: "Tahoma,Helvetica,sans-serif",
                        fontSize: "15px",
                        marginLeft: "7px",
                        opacity: ".7",
                        cursor: "pointer"
                    }), u.addEventListener("click", R.onCloseBtnClick, !1), i.appendChild(u), !0;
                },
                onBoxClick: function(e) {
                    e.preventDefault(), e.stopPropagation();
                    var t = this.querySelector("a.savefrom_ok_download");
                    return t ? (h.a.trigger(t, "click", {
                        cancelable: !0
                    }), !1) : (this.style.display = "none", !1);
                },
                onDownloadLinkClick: function(e) {
                    return 2 != e.button && (e.stopPropagation(), "#" == this.href ? (e.preventDefault(), 
                    !1) : (r.downloadOnClick(e), !1));
                },
                onCloseBtnClick: function(e) {
                    if (2 == e.button) return !0;
                    e.preventDefault(), e.stopPropagation();
                    var t = Object(p.a)(this, ".savefrom_ok_download");
                    return t && (t.style.display = "none"), !1;
                },
                deleteLink: function(e, t) {
                    if (!t && e && (t = document.getElementById(R.downloadIdPrefix + e)), t) {
                        var o = t.parentNode;
                        o && o.parentNode.removeChild(o);
                    }
                },
                getHash: function(e, t) {
                    t || (t = [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ]);
                    for (var o = [], n = 0; n < e.length; n++) o.push(parseInt("0x0" + e.charAt(n)));
                    var a = [];
                    (e = (e = o).slice(0))[32] = e[31];
                    var r = 0;
                    for (n = 32; n-- > 0; ) r += e[n];
                    for (var i = 0; i < 32; i++) a[i] = Math.abs(r - e[i + 1] * e[i] * t[i]);
                    return a.join("");
                },
                setLinkFromCache: function(e, t) {
                    if (!R.cache[e]) return !1;
                    if (t || (t = document.getElementById(R.downloadIdPrefix + e)), t) {
                        t.href = R.cache[e].url, t.textContent = "", R.cache[e].downloadAttr && t.setAttribute("download", R.cache[e].downloadAttr);
                        var o = m.a.create(r.svg.getSvg("download", "#ffffff"), {
                            style: {
                                display: "inline-block",
                                width: "16px",
                                height: "16px",
                                verticalAlign: "middle",
                                opacity: "0.9"
                            }
                        });
                        t.appendChild(o);
                        var n = document.createTextNode(R.cache[e].info);
                        return t.nextSibling ? t.parentNode.insertBefore(n, t.nextSibling) : t.parentNode.appendChild(n), 
                        !0;
                    }
                },
                getClientHash: function(e) {
                    return Promise.resolve(function() {
                        const t = o(70);
                        return function(e, t) {
                            for (var o, n = [ 4, 3, 5, 6, 1, 2, 8, 7, 2, 9, 3, 5, 7, 1, 4, 8, 8, 3, 4, 3, 1, 7, 3, 5, 9, 8, 1, 4, 3, 7, 2, 8 ], a = t(/md5=(\w*)/g.exec(e)[1] + "secret"), r = a.length, i = "", s = 0, d = 0; d < r; d++) s += parseInt(a[d], 16);
                            for (var l = 0; l < r; l++) {
                                var c = parseInt(a[l], 16);
                                o = l === r - 1 ? c : parseInt(a[l + 1], 16), i += Math.abs(s - c * o * n[l]);
                            }
                            return i;
                        }(e, e => t(e).toString());
                    }());
                },
                setLink: function(e, t, o) {
                    if (e) {
                        clearTimeout(R.ajaxTimer[e]);
                        var a = document.getElementById(R.downloadIdPrefix + e);
                        if (a && !R.setLinkFromCache(e, a)) {
                            if (!t || !t.play) return R.deleteLink(e, a), void (a.textContent = "?");
                            if (void 0 === o) return this.getClientHash(t.play).then((function(o) {
                                R.setLink(e, t, o);
                            }), (function(t) {
                                R.deleteLink(e, a);
                            }));
                            var i = t.track && t.track.size || -1;
                            R.cache[e] = {}, R.cache[e].url = t.play + (o ? "&clientHash=" + o : "");
                            var s = " (" + r.sizeHuman(i, 2), d = a.getAttribute("data-savefrom-helper-duration");
                            if (t.track && (t.track.duration && (d = t.track.duration), t.track.ensemble && t.track.name)) {
                                var l = t.track.ensemble + " - " + t.track.name;
                                R.cache[e].title = l, R.cache[e].downloadAttr = v.a.modify(l + ".mp3");
                            }
                            if (i && i > 0 && d) {
                                if (d = parseInt(d), isNaN(d)) return void delete R.cache[e];
                                s += " ~ " + (Math.floor(i / d / 125) + " " + n.a.i18n.getMessage("kbps"));
                            }
                            s += ")", R.cache[e].info = s, R.setLinkFromCache(e, a);
                        }
                    }
                },
                getTitle: function(e, t) {
                    if (!e || !t) return "";
                    var o = "", n = t.querySelector(".m_c_artist, .mus-tr_artist, .m_portal_c_artist"), a = t.querySelector(".m_track_source, .mus-tr_song, .m_portla_track_name");
                    return n && (n = n.textContent) && (o += n.trim()), a && (a = a.textContent) && (o && (o += " - "), 
                    o += a.trim()), o ? o.replace(/\<a\s+[^\>]+\>/gi, "").replace(/\<\/a\>/gi, "") : "";
                },
                secondsFromDurationNode: function(e) {
                    if (!e) return 0;
                    var t = e.textContent;
                    if (!t) return 0;
                    var o = t.match(/^(?:\s*(\d+)\s*\:)?\s*(\d+)\s*\:\s*(\d+)/);
                    return o && o.length > 3 ? (o[1] || (o[1] = 0), 3600 * parseInt(o[1]) + 60 * parseInt(o[2]) + parseInt(o[3])) : 0;
                },
                getPlaylistName: function(e) {
                    if (e === document) return;
                    const t = e.querySelector(".mus_h2_tx");
                    return t && v.a.modify(t.textContent) || void 0;
                },
                getNewPlaylistName: function(e) {
                    if (e === document) return;
                    const t = e.querySelector(".wm-list-description_header");
                    return t && v.a.modify(t.textContent) || void 0;
                },
                elIsHidden: function(e) {
                    return null === e.offsetParent;
                },
                getLayer: function() {
                    let e = document.querySelector("#mmpcw");
                    if (e && !e.classList.contains("__hidden") && (e = e.querySelector('div.m_c_s[aria-hidden="false"]'), 
                    e && !R.elIsHidden(e))) return e;
                },
                getNewLayer: function() {
                    let e = document.querySelector("#music_layer wm-collection-section");
                    if (e || (e = document.querySelector("#music_layer")), !e || !R.elIsHidden(e)) return e;
                },
                getPopup: function(e, t, o) {
                    var a, i = r.playlist.getInfoPopupTemplate();
                    m.a.create(i.textContainer, {
                        append: [ e ? m.a.create("p", {
                            text: e,
                            style: {
                                color: "#0D0D0D",
                                fontSize: "20px",
                                marginBottom: "11px",
                                marginTop: "13px"
                            }
                        }) : void 0, a = m.a.create("p", {
                            text: "",
                            style: {
                                color: "#868686",
                                fontSize: "14px",
                                lineHeight: "24px"
                            }
                        }) ]
                    });
                    var s = r.popupDiv(i.body, "sf_progress_popup", void 0, void 0, o), d = function e(o) {
                        e.state !== o && (e.state = o, i.buttonContainer.style.display = "none", a.style.display = "none", 
                        n.a.sendMessage({
                            action: "getWarningIcon",
                            type: t,
                            color: "#77D1FA"
                        }, (function(e) {
                            i.icon.style.backgroundImage = "url(" + e + ")";
                        })), "progress" === o && (a.style.display = "block"), "error" === o && (n.a.sendMessage({
                            action: "getWarningIcon",
                            type: t,
                            color: "#AAAAAA"
                        }, (function(e) {
                            i.icon.style.backgroundImage = "url(" + e + ")";
                        })), a.style.display = "block"));
                    };
                    return {
                        onPrepare: function(e) {
                            d("progress"), a.textContent = e;
                        },
                        onProgress: function(e, t) {
                            a.textContent = n.a.i18n.getMessage("vkFoundFiles").replace("%d", e) + " " + n.a.i18n.getMessage("vkFoundOf") + " " + t;
                        },
                        onReady: function() {
                            h.a.trigger(s, "kill");
                        },
                        onError: function(e) {
                            d("error"), a.textContent = e;
                        }
                    };
                },
                getAudioLinksViaAPI: function(e, t, o) {
                    var a = !1, r = [], i = e.length;
                    return function s() {
                        if (!a) {
                            var d = e.splice(0, 10);
                            if (0 === d.length) return o(r);
                            n.a.sendMessage({
                                action: "getOkAudioListLinks",
                                trackIdArr: d,
                                jsessionId: R.jsessionId
                            }, (function(o) {
                                var n = Promise.resolve();
                                Array.isArray(o) && o.forEach((function(e) {
                                    n = n.then((function() {
                                        if ("string" == typeof e.play && "object" == typeof e.track) {
                                            var t, o = e.play;
                                            return e.track.name && (t = e.track.name), e.track.ensemble && (t = e.track.ensemble + (t ? " - " + t : "")), 
                                            t || (t = "noname"), R.getClientHash(o).then((function(n) {
                                                o += "&clientHash=" + n, r.push({
                                                    url: o,
                                                    duration: e.track.duration || 0,
                                                    title: t,
                                                    filename: v.a.modify(t) + ".mp3"
                                                });
                                            }));
                                        }
                                    })).catch((function(t) {
                                        C.debug("process item error", e, t);
                                    }));
                                })), n.then((function() {
                                    t(i - e.length, i), s();
                                }));
                            }));
                        }
                    }(), {
                        abort: function() {
                            a = !0;
                        }
                    };
                },
                getAudioListLinksPopup: function(e, t, o) {
                    var a, r = this.getPopup(t, "audio", (function() {
                        a && a.abort();
                    }));
                    r.onPrepare(n.a.i18n.getMessage("download") + " ..."), a = this.getAudioLinksViaAPI(e, r.onProgress, (function(e) {
                        0 !== e.length ? (r.onReady(), o(e)) : r.onError(n.a.i18n.getMessage("vkMp3LinksNotFound"));
                    }));
                },
                getAudioLinksIds: e => Promise.resolve().then(() => {
                    for (var t, o = e.querySelectorAll([ ".m_portal_track", ".m_c_tr", ".mus-tr_i" ]), n = [], a = 0; t = o[a]; a++) {
                        var r = R.getTrackId(t);
                        for (var i in r) n.push(i);
                    }
                    return n;
                }),
                getNewAudioLinksIds(e) {
                    const t = Object(y.a)(e);
                    if (!t || document.querySelector(t) === e) return Object(g.a)([ t ], 'function(nodePath){var result=null;try{var container=nodePath===""?document:document.querySelector(nodePath);var ids=[].slice.call(container.querySelectorAll(["wm-track","wm-track2"])).reduce(function(result,node){try{var getTrack=function getTrack(){if(node&&node.props&&node.props.track){return node.props.track}if(node&&node.model&&node.model._data.get("track")){return node.model._data.get("track")}throw new Error("getNewAudioLinksIds")};var track=getTrack();if(track){result.push(track.id)}}catch(err){// console.error(\'getNewAudioLinksIds error\', err);\n}return result},[]);result={result:ids}}catch(err){result={error:{message:err.message,stack:err.stack}}}if(result.error){throw new Error(result.error.message)}else{return result.result}}');
                },
                async getAudioFromWall(e) {
                    let t = e.querySelector(".media-layer.__active");
                    const o = (e = t || e).querySelectorAll(".track-with-cover_cnt");
                    return Array.from(o).map(e => e.closest(".track-with-cover").dataset.trackId);
                },
                getAudioLinks: function(e, t, o) {
                    return Promise.all([ this.getAudioLinksIds(e), this.getNewAudioLinksIds(e), this.getAudioFromWall(e) ]).then(e => [].concat(...e).filter((e, t, o) => o.indexOf(e) === t)).then(e => {
                        this.getAudioListLinksPopup(e, t, o);
                    });
                },
                downloadMP3Files: function() {
                    const e = R.getLayer() || R.getNewLayer() || document, t = R.getPlaylistName(e) || R.getNewPlaylistName(e);
                    R.getAudioLinks(e, t, (function(e) {
                        r.downloadList.showBeforeDownloadPopup(e, {
                            type: "audio",
                            folderName: t
                        });
                    }));
                },
                showListOfAudioFiles: function(e) {
                    const t = R.getLayer() || R.getNewLayer() || document, o = R.getPlaylistName(t) || R.getNewPlaylistName(t);
                    R.getAudioLinks(t, o, (function(t) {
                        t.length ? e ? r.playlist.popupPlaylist(t, o, !0) : r.playlist.popupFilelist(t) : alert(n.a.i18n.getMessage("vkMp3LinksNotFound"));
                    }));
                }
            }, T = {
                requestMobileToken: function(e, t) {
                    let o = null;
                    e.links.some((function(e) {
                        var t = e.url.match(/\/\/([^/]+)/);
                        if (t = t && t[1]) return o = t, !0;
                    }));
                    const a = e => new Promise(t => {
                        const o = new XMLHttpRequest;
                        o.open("POST", location.protocol + "//" + e + "/usr_login", !1), o.withCredentials = !0, 
                        o.setRequestHeader("X-Requested-With", "XMLHttpRequest"), o.onreadystatechange = () => {
                            try {
                                let e = JSON.parse(o.responseText);
                                if (!e.vtkn || !e.ttl) return t();
                                t({
                                    ttl: e.ttl,
                                    vtkn: e.vtkn
                                });
                            } catch (e) {}
                        }, o.send();
                    });
                    Object(g.a)(() => {
                        const e = document.cookie && document.cookie.match(/vdsig=([^;]+);/);
                        if (e && e[1]) return e[1];
                    }).then(r => {
                        if (r) return e.vtkn = r, t(e);
                        const i = o => {
                            let {ttl: n, vtkn: a} = o;
                            n && a && (q.videoToken = {
                                ttl: Date.now() + 1e3 * n,
                                vtkn: a
                            }, e.vtkn = a, t(e));
                        };
                        n.a.isChrome || n.a.isFirefox ? Object(g.a)([ o ], a).then(i) : a(o).then(i);
                    });
                },
                getMobileToken: function(e, t) {
                    if (e.vtkn) return t(e);
                    var o = q.videoToken;
                    return o && o.expire > Date.now() ? (e.vtkn = o.vtkn, t(e)) : T.requestMobileToken(e, t);
                },
                wrapMobileLinks: function(e, t) {
                    T.getMobileToken(e, (function(e) {
                        if (!e || !e.vtkn) return t();
                        e.action = "getOkViaMobileWrapped", e.links.forEach((function(t) {
                            var o = /\?/.test(t.url) ? "&" : "?";
                            t.url += o + "vdsig=" + e.vtkn;
                        })), t(e);
                    }));
                },
                prepareResponse: function(e, t) {
                    var o = function() {
                        t(n.a.i18n.getMessage("noLinksFound"));
                    };
                    if (!e || !e.links) return o();
                    if (!k.showUmmyItem && "getRutubeLinks" === e.action) return o();
                    if ("getOkViaMobile" === e.action) return T.wrapMobileLinks(e, (function(e) {
                        if (!e) return o();
                        T.prepareResponse(e, t);
                    }));
                    var a = null;
                    "getYoutubeLinks" === e.action ? a = "youtube" : "getVimeoLinks" === e.action ? a = "vimeo" : "getDailymotionLinks" === e.action ? a = "dailymotion" : "getRutubeLinks" === e.action && (a = "rutube");
                    var i = null;
                    return i = a ? r.popupMenu.prepareLinks[a](e.links, e.title) : F.prepareLinks(e.links, e.title), 
                    t(i);
                },
                matchOpenGraph: function(e) {
                    if (e && e.movie && e.movie.contentId) {
                        var t = e.movie.contentId;
                        if (-1 !== t.indexOf("rutube.") && k.showUmmyItem) return {
                            action: "getRutubeLinks",
                            links: [ t ]
                        };
                        if (-1 !== t.indexOf("pladform")) {
                            var o = Object(s.a)(t);
                            return {
                                action: "getPladformVideo",
                                extVideoId: {
                                    playerId: o.pl,
                                    videoId: o.videoid
                                }
                            };
                        }
                        var n = r.embedDownloader.checkUrl(t);
                        if (n) return n;
                        var a = e.movie.poster;
                        if ("string" == typeof a) {
                            var i = (Object(s.a)(a).url || a).match(/ytimg\.com\/vi\/([^\/]+)\//);
                            if (i = i && i[1]) return {
                                action: "getYoutubeLinks",
                                extVideoId: i
                            };
                        }
                    }
                },
                switchMetadataProvider: function(e) {
                    if (e && e.provider && e.movie) switch (e.provider) {
                      case "USER_YOUTUBE":
                        if (e.movie.contentId) return {
                            request: {
                                action: "getYoutubeLinks",
                                extVideoId: e.movie.contentId
                            }
                        };
                        break;

                      case "OPEN_GRAPH":
                        var t = this.matchOpenGraph(e);
                        if (t) return {
                            request: t
                        };
                        break;

                      case "LIVE_TV_APP":
                      case "SLIDE_SHOW":
                      case "LIVE_TV_ODKL":
                      case "UPLOADED_ODKL":
                      case "UPLOADED_ATTACHMENT":
                      case "UPLOADED":
                      case "PARTNER":
                      case "YKL":
                        if (e.videos && e.movie.title) return {
                            request: {
                                action: "wrapMobileLinks",
                                title: e.movie.title,
                                links: e.videos
                            }
                        };
                    }
                },
                getPlayerMetadata: function(e, t, o, n) {
                    var a = {
                        cmd: "videoPlayerMetadata",
                        mid: e,
                        rnd: Date.now()
                    };
                    n && (a.mtId = t), Object(f.a)({
                        method: "POST",
                        url: location.protocol + "//" + location.host + "/dk?" + P.stringify(a),
                        json: !0,
                        localXHR: !0
                    }, (function(a, r, i) {
                        return a ? !n && t ? void T.getPlayerMetadata(e, t, o, 1) : o() : o(i);
                    }));
                },
                getEmbed: function(e, t) {
                    var o = Object(s.a)(e);
                    if (!o.id || !o.sig) return t();
                    var a = "http://cdn-ok.com/video/get/?" + P.stringify({
                        id: o.id,
                        format: 1,
                        sig: o.sig,
                        sig2: "oldRotator"
                    });
                    n.a.sendMessage({
                        action: "getData",
                        url: a
                    }, (function(e) {
                        return e && Object(l.a)(e, [ /"sourceType":/, /"sourceId":/ ]).some((function(e) {
                            if ("youtube" === e.sourceType && e.sourceId) return t({
                                request: {
                                    action: "getYoutubeLinks",
                                    extVideoId: e.sourceId
                                }
                            }), !0;
                        })) ? void 0 : t();
                    }));
                },
                readMetadata: function(e, t, o) {
                    if (e.movie && /cdn-ok\.com\/embed/.test(e.movie.contentId)) return this.getEmbed(e.movie.contentId, (function(e) {
                        if (!e || !e.request) return t();
                        n.a.sendMessage(e.request, (function(e) {
                            T.prepareResponse(e, t);
                        }));
                    }));
                    if (!o && e.movie && e.movie.movieId) {
                        var a = e.movie.link && Object(s.a)(e.movie.link, {
                            sep: "&amp;"
                        })["st.vpl.sid"];
                        return this.getPlayerMetadata(e.movie.movieId, a, (function(o) {
                            T.readMetadata(o || e, t, 1);
                        }));
                    }
                    var r = this.switchMetadataProvider(e);
                    return r ? r.links ? t(r.links) : void (r.request ? "getRutubeLinks" === r.request.action ? T.prepareResponse(r.request, t) : "wrapMobileLinks" === r.request.action ? T.wrapMobileLinks(r.request, (function(e) {
                        T.prepareResponse(e, (function(e) {
                            t(e, 1);
                        }));
                    })) : n.a.sendMessage(r.request, (function(e) {
                        T.prepareResponse(e, t);
                    })) : t()) : t();
                },
                prepareVideoUrl(e, t) {
                    let o = e.split("?"), [n, a] = t.split("?");
                    if (!o[1] || !a) return t;
                    if (o = new URLSearchParams(o[1]), a = new URLSearchParams(a), !o.has("type")) return t;
                    const r = o.get("type");
                    return a.has("st.mq") && a.set("st.mq", r), a.has("st.hls") && a.set("st.hls", "off"), 
                    n + "?" + a.toString();
                },
                getMobileVideoSrc: e => e && e.dataMobile && e.dataMobile.videoSrc ? Promise.resolve(e.dataMobile.videoSrc) : e && e.movie && e.movie.id ? Object(M.a)({
                    action: "getOkVideoUrlFromMobile",
                    videoUrl: location.href,
                    videoId: e.movie.id
                }) : Promise.resolve(void 0),
                loadLinks: function(e, o, a) {
                    var r = q.linkCache, i = JSON.stringify(e), s = r[i];
                    if (s) return o.update(s);
                    var d = function(e, s) {
                        var d = function() {
                            o.update(n.a.i18n.getMessage("noLinksFound"));
                        };
                        return e ? e.hlsManifestUrl ? L.a.createLinkExtractor("ok-video").extractLinks({
                            element: a,
                            initData: t
                        }).then(e => {
                            o.update(e);
                        }).catch(e => {
                            d(), C.error("hls error", e);
                        }) : void T.readMetadata(e, (e, t) => {
                            if (!e) return d();
                            Array.isArray(e) && !e.length && (t = 1), t || (r[i] = e), o.update(e);
                        }, s) : d();
                    };
                    e.metadata ? d(e.metadata) : e.request ? "getOkMetadata" === e.request.action ? n.a.sendMessage(e.request, d) : "getPlayerMetadata" === e.request.action ? this.getPlayerMetadata(e.request.extVideoId, e.request.sid, (function(e) {
                        d(e, 1);
                    })) : "getRutubeLinks" === e.request.action ? T.prepareResponse(e.request, (function(e) {
                        o.update(e);
                    })) : n.a.sendMessage(e.request, (function(e) {
                        T.prepareResponse(e, (function(e) {
                            o.update(e);
                        }));
                    })) : o.update(n.a.i18n.getMessage("noLinksFound"));
                },
                appendLinkUnderVideo: function(e, t, o) {
                    Object(_.a)({
                        category: "append",
                        subcategory: "ok",
                        event: "b"
                    });
                    var a = e.querySelector(".vp-layer-info_cnt");
                    if (a) {
                        var i = a.querySelector(".savefrom_ok_download"), s = m.a.create("span", {
                            className: "savefrom_ok_download",
                            style: {
                                marginLeft: "12px"
                            },
                            on: [ [ "click", function(e) {
                                e.stopPropagation();
                            } ], [ "mousedown", function(e) {
                                e.stopPropagation();
                            } ], [ "keydown", function(e) {
                                e.stopPropagation();
                            } ] ],
                            append: [ m.a.create("a", {
                                href: "#",
                                text: n.a.i18n.getMessage("download"),
                                on: [ "click", function(a) {
                                    if (a.preventDefault(), h.a.onRemoveEvent(s, q.hideMenu), q.contextMenu && q.contextMenu.isShow) {
                                        if (q.contextMenu.button === this) return void q.hideMenu();
                                        q.hideMenu();
                                    }
                                    n.a.sendMessage({
                                        action: "checkAndOpenProLanding",
                                        id: "ok-5"
                                    });
                                    var i = q.contextMenu = r.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + "...", "sf-single-video-menu", {
                                        parent: e
                                    });
                                    T.loadLinks(t, i, o);
                                } ]
                            }) ]
                        });
                        i && i.parentNode ? (i.parentNode.replaceChild(s, i), i = null) : a.appendChild(s);
                    }
                },
                appendDownloadMobileVideo(e) {
                    const t = {
                        float: "right",
                        display: "flex",
                        alignItems: "center",
                        width: "fit-content"
                    }, o = e.querySelector(".widget-list_infos"), n = e.querySelector("[data-video]");
                    if (!o || !n) return;
                    o.querySelector(".widget-list_actors, .ic") || (t.position = "absolute", t.top = "-7px", 
                    t.right = "0");
                    const a = T.createMobileDownloadContainer(n, {
                        containerStyle: t,
                        menuClass: "sf-mobile-video-menu"
                    });
                    o.appendChild(a);
                },
                createMobileDownloadContainer(e, t) {
                    let {containerStyle: o, menuClass: a} = t;
                    const i = m.a.create("div", {
                        style: o || {},
                        append: [ r.svg.getSvg("download", "#f1bc7f", 14, 14), m.a.create("a", {
                            href: "#",
                            text: n.a.i18n.getMessage("download"),
                            style: {
                                marginLeft: "4px"
                            }
                        }) ],
                        on: [ "click", function(t) {
                            t.preventDefault(), t.stopPropagation(), q.contextMenu = r.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + " ...", a, {
                                parent: i || t.target
                            }), T.getMobilePlayerOptions(e).then(t => {
                                if (!t) return q.contextMenu.update(n.a.i18n.getMessage("noLinksFound"));
                                T.loadLinks(t, q.contextMenu, e);
                            });
                        } ]
                    });
                    return i;
                },
                getPlayerOptions: function(e) {
                    var t = Object(p.a)(e, "[data-player-element-id][data-options]"), o = t && t.dataset.options;
                    if (o) {
                        try {
                            o = JSON.parse(o);
                        } catch (e) {}
                        var n = o.flashvars;
                        if (n) {
                            if (n.metadata) {
                                var a = null;
                                try {
                                    a = JSON.parse(n.metadata);
                                } catch (e) {}
                                if (a) return {
                                    metadata: a
                                };
                            }
                            if (n.metadataUrl) return {
                                request: {
                                    action: "getOkMetadata",
                                    url: decodeURIComponent(n.metadataUrl)
                                }
                            };
                            var i = o.url;
                            if (i) {
                                var s = r.embedDownloader.checkUrl(i);
                                if (s) return {
                                    request: s
                                };
                                if (-1 !== i.indexOf("rutube.")) return {
                                    request: {
                                        action: "getRutubeLinks",
                                        links: [ i ]
                                    }
                                };
                            }
                        }
                    }
                },
                async getMobilePlayerOptions(e) {
                    let t, o;
                    try {
                        t = JSON.parse(e.dataset.video);
                    } catch (e) {}
                    if (t && t.movieId) o = t.movieId, o.indexOf("_") && (o = o.split("_")[0]); else {
                        o = new URLSearchParams(location.search).get("st.discId");
                    }
                    if (!o) return void C.error("getMobilePlayerOptions. video id not found");
                    const n = await Object(M.a)({
                        action: "okRequestVideoPage",
                        videoId: o
                    });
                    if (!n) return void C.error("getMobilePlayerOptions. videoPage fetch failed");
                    const a = Object(O.a)(n, "").querySelector(".vp_video .vid-card_cnt");
                    if (!a) return void C.error("getMobilePlayerOptions. Video dataset not found");
                    const r = T.getPlayerOptions(a);
                    return r.metadata ? r.metadata.dataMobile = t : r.metadata = {
                        dataMobile: t
                    }, r;
                },
                catchPopup: function() {
                    var e = null;
                    this.lastWaitEl && this.lastWaitEl.abort(), this.lastWaitEl = this.waitEl((function() {
                        if (e = document.querySelector(".vp_video .vid-card_cnt")) return e;
                    }), (function() {
                        var t = Object(p.a)(e, ".vp_video");
                        if (t) {
                            var o = T.getPlayerOptions(e);
                            o && T.appendLinkUnderVideo(t.parentNode, o, e);
                        }
                    }));
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll(".savefrom_ok_download"), o = 0; e = t[o]; o++) e.parentNode.removeChild(e);
                },
                lastWaitEl: null,
                waitEl: function(e, t, o) {
                    var n, a = Object.assign({
                        abort: function() {
                            clearInterval(a.timeout), a.isAborted = !0;
                        }
                    }, {
                        delay: 500,
                        repeat: 12,
                        isAborted: !1,
                        timeout: null
                    }, o);
                    return (n = e()) ? (t(n), a) : (function o() {
                        a.repeat--, a.timeout = setTimeout((function() {
                            if (!a.isAborted) return (n = e()) ? t(n) : void (!a.isAborted && a.repeat && o());
                        }), a.delay);
                    }(), a);
                }
            }, F = {
                btnClassName: "sf-feed-dl-btn",
                style: void 0,
                thumbClassName: "vid-card_img",
                prepareLinks: function(e, t) {
                    if (!e || !e.length) return n.a.i18n.getMessage("noLinksFound");
                    if ("string" == typeof e) return e;
                    t = t || "";
                    for (var o, a, i, s, d = [], l = 0, c = e.length; l < c; l++) {
                        var u = e[l];
                        if ("object" == typeof u && u.url) {
                            s = u.url;
                            var p = u.ext;
                            p || (p = "MP4", -1 !== u.url.indexOf(".mp4") && (p = "MP4"), -1 !== s.indexOf(".flv") && (p = "FLV"), 
                            -1 !== u.url.indexOf(".mov") && (p = "MOV"), -1 !== u.url.indexOf(".mpg") && (p = "MPG")), 
                            i = (p = p.toLowerCase()).toUpperCase(), a = u.subname || u.quality || u.name || p;
                        } else {
                            p = "MP4", -1 !== (s = u).indexOf(".mp4") && (p = "MP4"), -1 !== s.indexOf(".flv") && (p = "FLV"), 
                            -1 !== s.indexOf(".mov") && (p = "MOV"), -1 !== s.indexOf(".mpg") && (p = "MPG"), 
                            i = (p = p.toLowerCase()).toUpperCase(), a = p;
                            var f = r.getMatchFirst(e[l], /\.(\d+)\.mp4/i);
                            f && (a = f);
                        }
                        var h = [ "mobile", "lowest", "low", "sd", "hd", "full", "quad", "ultra" ].indexOf(a);
                        -1 !== h && (a = [ 144, 240, 360, 480, 720, 1080, 1440, "4K" ][h]), o = {
                            href: s,
                            title: u.title ? u.title : t,
                            ext: p,
                            format: i,
                            quality: a,
                            forceDownload: !0
                        }, d.push(o);
                    }
                    return d;
                },
                getPosterData: function(e) {
                    var t = Object(p.a)(e, "[hrefattrs]"), o = t && t.getAttribute("hrefattrs");
                    if (o) {
                        var n = Object(s.a)(o, {
                            params: !0
                        }), a = n["st.vpl.sid"], i = n["st.vpl.id"];
                        if (!i) {
                            var d = Object(p.a)(e, "[data-id]");
                            if ((i = d && d.dataset.id) && "c" === i[0]) return;
                        }
                        if (i && "OK_" === i.substr(0, 3) && (i = r.getMatchFirst(i, /OK_\d+_(\d+)/)), i) return {
                            request: {
                                sid: a,
                                action: "getPlayerMetadata",
                                extVideoId: i
                            }
                        };
                    }
                },
                onBtnClick: function(e, t, o) {
                    e.preventDefault(), e.stopPropagation();
                    var a = JSON.parse(t.dataset.sfContext);
                    if (h.a.onRemoveEvent(t, q.hideMenu), q.contextMenu && q.contextMenu.isShow) {
                        if (q.contextMenu.button === t) return void q.hideMenu();
                        q.hideMenu();
                    }
                    var s = document.querySelector("#mtLayer.__active #mtLayerMain > div");
                    s || (s = document.getElementById("vv_content")), s || Object(u.a)(t, ".js-messages-list " + t.tagName) && (s = Object(i.a)(t, "js-messages-list")) && !s.offsetParent && (s = null), 
                    !s && Object(u.a)(t, "#mainContent " + t.tagName) && (s = Object(p.a)(t, "#mainContent"));
                    var d = q.contextMenu = r.popupMenu.quickInsert(t, n.a.i18n.getMessage("download") + " ...", "sf-popupMenu", {
                        parent: s || void 0
                    });
                    Object(_.a)({
                        category: "download",
                        subcategory: "ok",
                        event: "video"
                    }), T.loadLinks(a, d, o);
                },
                onImgOver: function(e) {
                    var t = Object(u.a)(this, ".mdialog_chat_window .d_comment_text_w " + this.tagName), o = null;
                    if ((t ? o = Object(i.a)(this, "d_comment_text_w") : Object(u.a)(this, ".video-card > .video-card_img-w " + this.tagName) ? o = Object(i.a)(this, "video-card_img-w") : this.classList.contains("vid-card_cnt") ? o = this : Object(u.a)(this, ".vid-card_cnt " + this.tagName) && (o = Object(i.a)(this, "vid-card_cnt")), 
                    o) && (!o.getElementsByClassName(F.btnClassName).length && !!!o.querySelector(".vid-card_live.__active"))) {
                        var a = Object(u.a)(this, ".vid-card_img__link " + this.tagName), s = T.getPlayerOptions(this);
                        if (s || (s = F.getPosterData(this)), s) {
                            s.isChat = t;
                            var d = {};
                            t && Object.assign(d, {
                                left: "15px",
                                top: "15px"
                            }), a && Object.assign(d, {
                                backgroundColor: "#454648",
                                borderColor: "rgb(53, 53, 53)"
                            });
                            var l = m.a.create("i", {
                                class: [ F.btnClassName, "sf-video-feed-bind-on-insert" ],
                                style: d,
                                data: {
                                    sfContext: JSON.stringify(s)
                                },
                                title: n.a.i18n.getMessage("download")
                            });
                            l.appendChild(m.a.create(r.svg.getSvg("download"), {
                                style: {
                                    width: "12px",
                                    height: "12px",
                                    margin: "4px"
                                }
                            })), o.appendChild(l);
                        }
                    }
                },
                injectStyle: function() {
                    this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = m.a.create("style", {
                        text: Object(c.a)({
                            "div > .sf-feed-dl-btn": {
                                display: "none",
                                border: "1px solid #F8F8F8",
                                width: "20px",
                                height: "20px",
                                padding: 0,
                                position: "absolute",
                                top: 0,
                                left: 0,
                                zIndex: 1,
                                cursor: "pointer",
                                backgroundColor: "#F8F8F8"
                            },
                            "div > .sf-feed-dl-btn svg path": {
                                fill: "#eb722e"
                            },
                            "div > .sf-feed-dl-btn:hover svg path": {
                                fill: "#00B75A"
                            },
                            "div > .sf-feed-dl-btn:active": {
                                outline: 0,
                                boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                            },
                            "div:hover > .sf-feed-dl-btn": {
                                display: "block"
                            },
                            ".sf-audio.savefrom_ok_download": {
                                display: "none",
                                backgroundImage: "url(" + r.svg.getSrc("download", "#ee8208") + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "16px",
                                opacity: .5,
                                marginLeft: "11px"
                            },
                            ".sf-audio.sf-audio-2.savefrom_ok_download": {
                                margin: "0 6px"
                            },
                            ".sf-audio.savefrom_ok_download:hover": {
                                opacity: 1
                            },
                            "wm-track:hover .sf-audio": {
                                display: "flex !important"
                            },
                            "wm-track2:hover .sf-audio": {
                                display: "flex !important"
                            },
                            "#sf-mobile-video-menu": {
                                left: "auto !important",
                                right: "0"
                            }
                        })
                    }), document.head.appendChild(this.style));
                },
                disable: function() {
                    this.style && this.style.parentNode && this.style.parentNode.removeChild(this.style);
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll(".sf-feed-dl-btn"), o = 0; e = t[o]; o++) e.parentNode.removeChild(e);
                    var n = Object(d.a)("sfSkip2"), a = document.querySelectorAll("[" + n + "]");
                    for (o = 0; e = a[o]; o++) e.removeAttribute(n);
                }
            }, D = {
                style: null,
                rmCurrentPhotoBtn: function(e) {
                    for (var t, o = void 0, n = document.querySelectorAll(".sf-dl-current-photo-btn"), a = 0; t = n[a]; a++) e && e.contains(t) ? o = t : t.parentNode.removeChild(t);
                    return o;
                },
                addDlCurrentPhotoBtn: function(e) {
                    if (!this.rmCurrentPhotoBtn(e)) {
                        var t = q;
                        e.appendChild(m.a.create("a", {
                            class: "sf-dl-current-photo-btn",
                            href: "#",
                            title: n.a.i18n.getMessage("download"),
                            on: [ "click", function(o) {
                                if (o.stopPropagation(), o.preventDefault(), t.contextMenu && t.contextMenu.isShow && t.contextMenu.button === this) {
                                    if (t.contextMenu.button === this) return void t.hideMenu();
                                    t.hideMenu();
                                }
                                var a = function e(t) {
                                    18 !== t.keyCode && 17 !== t.keyCode && (i.hide(), document.removeEventListener("keydown", e));
                                }, i = t.contextMenu = r.popupMenu.quickInsert(this, n.a.i18n.getMessage("download") + " ...", "photoDlMenu", {
                                    parent: e,
                                    onShow: function() {
                                        document.addEventListener("keydown", a);
                                    },
                                    onHide: function() {
                                        document.removeEventListener("keydown", a);
                                    }
                                }), s = [], d = e.querySelector("img.photo-layer_img");
                                if (d) {
                                    var l = d.dataset.fsSrc || d.dataset.nfsSrc || d.src;
                                    l && s.push({
                                        href: l,
                                        title: "photo_" + parseInt(Date.now() / 1e3),
                                        quality: n.a.i18n.getMessage("download"),
                                        format: " ",
                                        ext: "jpg",
                                        forceDownload: !0,
                                        isBlank: !0,
                                        func: function() {
                                            n.a.sendMessage({
                                                action: "checkAndOpenProLanding",
                                                id: "ok-6"
                                            }), i.hide();
                                        }
                                    });
                                }
                                if (d || (d = e.querySelector("div.gif[data-gifsrc]")), d) {
                                    var c = {
                                        webmsrc: "webm",
                                        mp4src: "mp4",
                                        gifsrc: "gif"
                                    };
                                    Object.keys(c).forEach((function(e) {
                                        var t = d.dataset[e];
                                        if (t) {
                                            var o = c[e];
                                            s.push({
                                                href: t,
                                                title: "gif_" + parseInt(Date.now() / 1e3),
                                                quality: n.a.i18n.getMessage("download"),
                                                format: o.toUpperCase(),
                                                ext: o,
                                                forceDownload: !0,
                                                isBlank: !0,
                                                func: function() {
                                                    i.hide();
                                                }
                                            });
                                        }
                                    }));
                                }
                                0 !== s.length ? i.update(s) : i.update(n.a.i18n.getMessage("noLinksFound"));
                            } ],
                            append: [ m.a.create(r.svg.getSvg("download"), {
                                style: {
                                    width: "12px",
                                    height: "12px",
                                    margin: "4px"
                                }
                            }) ]
                        }));
                    }
                },
                injectStyle: function() {
                    D.style ? D.style.parentNode || document.head.appendChild(D.style) : (D.style = m.a.create("style", {
                        text: Object(c.a)({
                            "div > .sf-dl-current-photo-btn": {
                                display: "none",
                                border: "1px solid #F8F8F8",
                                width: "20px",
                                height: "20px",
                                padding: 0,
                                position: "absolute",
                                backgroundColor: "#F8F8F8",
                                top: "73px",
                                left: "90px",
                                zIndex: 100,
                                cursor: "pointer"
                            },
                            "div > .sf-dl-current-photo-btn svg path": {
                                fill: "#eb722e"
                            },
                            "div > .sf-dl-current-photo-btn:hover svg path": {
                                fill: "#00B75A"
                            },
                            "div > .sf-dl-current-photo-btn:active": {
                                outline: 0,
                                boxShadow: "inset 0 3px 5px rgba(0, 0, 0, 0.125)"
                            },
                            "div:hover > .sf-dl-current-photo-btn": {
                                display: "block"
                            }
                        })
                    }), document.head.appendChild(D.style));
                },
                addCurrentDlBtn: function(e) {
                    if ("1" !== e.dataset.sfSkip2) {
                        e.dataset.sfSkip2 = "1";
                        var t = e.querySelector("img.photo-layer_img");
                        if (t) t.dataset.fsSrc || t.dataset.nfsSrc || t.src || (t = null);
                        t || (t = e.querySelector("div.gif[data-gifsrc]")), t && this.addDlCurrentPhotoBtn(e);
                    }
                }
            };
            const B = new class {
                constructor() {
                    let e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {};
                    this.options = e, this.tooltip = null, this.init();
                }
                init() {
                    this.tooltip = m.a.create("div", {
                        class: "sf-tooltip",
                        style: Object.assign({
                            position: "absolute",
                            display: "none",
                            zIndex: 9999,
                            opacity: 0,
                            transition: "opacity 0.2s",
                            whiteSpace: "nowrap",
                            fontSize: "12px",
                            color: "#111",
                            fontFamily: "arial, verdana, sans-serif, Lucida Sans"
                        }, this.options.style),
                        on: [ "mouseenter", e => {
                            this.hide();
                        } ]
                    }), document.body.appendChild(this.tooltip);
                }
                updatePos(e) {
                    const t = r.getPosition(e), o = r.getSize(this.tooltip);
                    this.tooltip.style.top = t.top + this.options.top - o.height + "px";
                    let n = t.left + parseInt(this.options.width / 2, 10) - parseInt(o.width / 2, 10);
                    const a = document.body.clientWidth + document.body.scrollLeft;
                    a < n + o.width && (n = a - o.width), this.tooltip.style.left = n + "px";
                }
                show(e) {
                    this.tooltip.style.display = "block", setTimeout(() => {
                        this.updatePos(e), this.tooltip.style.opacity = 1;
                    });
                }
                hide() {
                    this.tooltip.style.opacity = 0, this.tooltip.style.display = "none";
                }
                destroy() {
                    this.tooltip.parentNode && (this.tooltip.parentNode.removeChild(this.tooltip), this.tooltip = null);
                }
            }({
                top: -12,
                width: 16,
                style: {
                    backgroundColor: "#fff",
                    border: "1px solid #ccc",
                    color: "rgb(48, 48, 48)",
                    fontSize: "12px",
                    padding: "3px"
                }
            });
        }));
    }
});