!function(e) {
    function t(t) {
        for (var i, r, s = t[0], l = t[1], d = t[2], u = 0, p = []; u < s.length; u++) r = s[u], 
        Object.prototype.hasOwnProperty.call(a, r) && a[r] && p.push(a[r][0]), a[r] = 0;
        for (i in l) Object.prototype.hasOwnProperty.call(l, i) && (e[i] = l[i]);
        for (c && c(t); p.length; ) p.shift()();
        return o.push.apply(o, d || []), n();
    }
    function n() {
        for (var e, t = 0; t < o.length; t++) {
            for (var n = o[t], i = !0, s = 1; s < n.length; s++) {
                var l = n[s];
                0 !== a[l] && (i = !1);
            }
            i && (o.splice(t--, 1), e = r(r.s = n[0]));
        }
        return e;
    }
    var i = {}, a = {
        8: 0
    }, o = [];
    function r(t) {
        if (i[t]) return i[t].exports;
        var n = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(n.exports, n, n.exports, r), n.l = !0, n.exports;
    }
    r.m = e, r.c = i, r.d = function(e, t, n) {
        r.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: n
        });
    }, r.r = function(e) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(e, "__esModule", {
            value: !0
        });
    }, r.t = function(e, t) {
        if (1 & t && (e = r(e)), 8 & t) return e;
        if (4 & t && "object" == typeof e && e && e.__esModule) return e;
        var n = Object.create(null);
        if (r.r(n), Object.defineProperty(n, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) r.d(n, i, function(t) {
            return e[t];
        }.bind(null, i));
        return n;
    }, r.n = function(e) {
        var t = e && e.__esModule ? function() {
            return e.default;
        } : function() {
            return e;
        };
        return r.d(t, "a", t), t;
    }, r.o = function(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t);
    }, r.p = "";
    var s = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = s.push.bind(s);
    s.push = t, s = s.slice();
    for (var d = 0; d < s.length; d++) t(s[d]);
    var c = l;
    o.push([ 108, 0 ]), n();
}({
    108: function(e, t, n) {
        "use strict";
        n.r(t);
        var i = n(0), a = n(9), o = n(18), r = n(31), s = n(27), l = n(24), d = n(12), c = n(33), u = n(3), p = n(1), f = n(6), m = n(20), h = n(11), g = n(16), v = n(10), y = n(15);
        const b = {
            position: "absolute",
            top: "38px",
            right: "14px",
            background: "white",
            padding: "4px 9px",
            color: "#3F3F3F",
            fontWeight: "bold",
            textDecoration: "none",
            border: "1px solid #cecece"
        };
        m.a.isSingle() && Object(o.b)("mailru", (function(e, t) {
            const n = Object(a.a)(t);
            var o = t.preferences, m = o.moduleMailru ? 1 : 0;
            const _ = navigator.userAgent.includes("Safari") && !navigator.userAgent.includes("Chrome"), {selectorsConfig: x} = t.preferences;
            var k = i.a.isChrome || i.a.isFirefox || i.a.isGM && i.a.isTM;
            i.a.onMessage.addListener((function(t, n, i) {
                if ("getModuleInfo" === t.action) {
                    if (t.url !== location.href) return;
                    return i({
                        state: m,
                        moduleName: e
                    });
                }
                if ("changeState" === t.action) {
                    if (e !== t.moduleName) return;
                    return S.changeState(t.state);
                }
                "updatePreferences" !== t.action ? m && ("downloadMP3Files" === t.action && (k ? O.downloadMP3Files() : O.showListOfAudioFiles(!1)), 
                "downloadPlaylist" === t.action && O.showListOfAudioFiles(!0)) : Object.assign(o, t.preferences);
            })), m && setTimeout((function() {
                S.run();
            }));
            var S = {
                contextMenu: null,
                run: function() {
                    m = 1, O.injectStyle(), h.a.isAvailable() && this.mutationMode.enable();
                },
                changeState: function(e) {
                    m = e, O.rmBtn(), M.rmBtn(), this.mutationMode.stop(), this.hideMenu(), e && this.run();
                },
                hideMenu: function() {
                    S.contextMenu && (S.contextMenu.hide(), S.contextMenu = null);
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop(), [ "sfSkip" ].forEach((function(e) {
                            for (var t, n = Object(l.a)(e), i = document.querySelectorAll("[" + n + "]"), a = 0; t = i[a]; a++) t.removeAttribute(n);
                        }));
                    },
                    wrapAudioOnMouseOver: function() {
                        if (m && !(this.dataset.sfSkip > 0)) {
                            this.dataset.sfSkip = "1";
                            var e = JSON.parse(this.dataset.sfContext);
                            O.onTrackOver(this, e.type);
                        }
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        const e = e => {
                            for (let t, n = 0; t = e.added[n]; n++) {
                                if (t.dataset.sfSkip > 0) continue;
                                t.dataset.sfSkip = "1";
                                const e = M.getVideoId(t);
                                if (!e) continue;
                                const n = Object(r.a)(t, "b-video__left");
                                if (!n) continue;
                                const i = n.querySelector(".b-video__info-time");
                                i && M.insertBtnInPopup(e, i);
                            }
                        }, t = e => {
                            for (let t, n = 0; t = e.added[n]; n++) {
                                if (t.dataset.sfSkip > 0) continue;
                                t.dataset.sfSkip = "1";
                                const e = M.getVideoId(t);
                                if (!e) continue;
                                const n = Object(r.a)(t, "sp-video__item-page");
                                if (!n) continue;
                                const i = n.querySelector(".sp-video__item-page__info__additional");
                                i && M.insertBtnInPage(e, i, 1);
                            }
                        }, a = e => {
                            for (let t, n = 0; t = e.added[n]; n++) {
                                if (t.dataset.sfSkip > 0) continue;
                                t.dataset.sfSkip = "1";
                                let e = Object(r.a)(t, "sp-video__item-page-new__video-content"), n = e && e.querySelector(".sp-video__item-page-new__actions"), i = e && M.getVideoContentVideoId(e);
                                n && i && M.insertBtnInPage(i, n, 2);
                            }
                        };
                        this.observer = new h.a({
                            queries: [ {
                                css: x.mail_ru.trackAdd,
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfContext = JSON.stringify({
                                        type: 0
                                    }), u.a.one(t, "mouseenter", S.mutationMode.wrapAudioOnMouseOver);
                                }
                            }, {
                                css: x.mail_ru.songAdd,
                                is: "added",
                                callback: e => {
                                    for (let t, n = 0; t = e.added[n]; n++) t.dataset.sfContext = JSON.stringify({
                                        type: 1
                                    }), u.a.one(t, "mouseenter", S.mutationMode.wrapAudioOnMouseOver);
                                }
                            }, {
                                css: x.mail_ru.leftVideoAdd,
                                is: "added",
                                callback: e
                            }, {
                                css: x.mail_ru.leftVideoAdd2,
                                is: "added",
                                callback: e
                            }, {
                                css: x.mail_ru.spVideoAdd,
                                is: "added",
                                callback: t
                            }, {
                                css: x.mail_ru.spVideoAdd2,
                                is: "added",
                                callback: t
                            }, {
                                css: x.mail_ru.newSpVideoAdd,
                                is: "added",
                                callback: a
                            }, {
                                css: x.mail_ru.newSpVideoAdd2,
                                is: "added",
                                callback: a
                            }, {
                                css: x.mail_ru.images,
                                is: "added",
                                callback: e => {
                                    let {added: t} = e;
                                    t.forEach(e => {
                                        const t = e.querySelector(".b-photo__container"), a = document.createElement("a");
                                        for (let e in b) a.style[e] = b[e];
                                        const o = n.svg.getSvg("download", "#2665a9", "13");
                                        o.style.float = "left", o.style.margin = "2px 5px 0 0";
                                        const r = document.createElement("span");
                                        r.innerText = i.a.i18n.getMessage("download"), a.appendChild(o), a.appendChild(r), 
                                        t.appendChild(a), a.addEventListener("click", e => {
                                            e.preventDefault();
                                            const i = t.querySelector(".b-photo__image");
                                            if (i && i.src) {
                                                const e = f.a.modify(i.src.split("/").pop());
                                                n.download(e, i.src);
                                            }
                                        });
                                    });
                                }
                            }, {
                                css: "." + u.a.onRemoveClassName,
                                is: "removed",
                                callback: e => {
                                    for (let t, n = 0; t = e.removed[n]; n++) u.a.onRemoveListener(t);
                                }
                            } ]
                        });
                    }
                }
            }, w = {
                tooltip: void 0,
                updatePos: function(e, t) {
                    var i = n.getPosition(e), a = n.getSize(this.tooltip);
                    this.tooltip.style.top = i.top + t.top - a.height + "px";
                    var o = i.left + parseInt(t.width / 2) - parseInt(a.width / 2), r = document.body.clientWidth + document.body.scrollLeft;
                    r < o + a.width && (o = r - a.width), this.tooltip.style.left = o + "px";
                },
                show: function(e, t) {
                    var n = this;
                    return void 0 !== this.tooltip ? this.hide() : (this.tooltip = p.a.create("div", {
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
                        }, t.style),
                        on: [ "mouseenter", function(e) {
                            n.hide();
                        } ]
                    }), document.body.appendChild(this.tooltip)), this.tooltip.style.display = "block", 
                    setTimeout((function() {
                        n.updatePos(e, t), n.tooltip.style.opacity = 1;
                    })), this.tooltip;
                },
                hide: function() {
                    this.tooltip.style.opacity = 0, this.tooltip.style.display = "none";
                }
            }, C = function() {
                var e = document.title, t = e.indexOf("-");
                return -1 !== t && (e = e.substr(0, t - 1)), f.a.modify(e);
            }, O = {
                className: "sf-audio-panel",
                lastRow: null,
                style: void 0,
                secondsFromDuration: function(e) {
                    var t = e.split(":").map((function(e) {
                        return parseInt(e);
                    }));
                    return 60 * t[0] + t[1];
                },
                getTitle: function(e) {
                    var t = e.querySelector(".jp__track-fullname"), n = e.querySelector(".jp__track-performer");
                    if (null === n && null !== (n = e.querySelector(".jp__track-name-text")) && null !== (n = n.querySelector("a:not(.jp__track-fullname)"))) {
                        var i = t;
                        t = n, n = i;
                    }
                    if (null !== n ? (n = n.textContent.trim()) || (n = "noname") : n = "", n ? n += " - " : n = "", 
                    null !== t) {
                        var a = n + (t = t.textContent);
                        return a = a.replace(/[\r\n\t\s]+/gim, " ").replace(/\s+/g, " ").trim();
                    }
                },
                getTitle2: function(e) {
                    var t = e.querySelector(".title"), n = e.querySelector(".name") || e.querySelector(".b-music__songs__row__body__inner__title__name__link"), i = e.querySelector(".author") || e.querySelector(".b-music__songs__row__body__inner__title__author");
                    n && ((n = n.textContent).length || (n = "noname")), i && (i = i.textContent);
                    return (n && i ? i + " - " + n : t ? t.textContent : "unknown").replace(/[\r\n\t\s]+/gim, " ").replace(/\s+/g, " ").trim();
                },
                getMp3UrlList: function(e) {
                    var t = 1, n = document.querySelectorAll(".b-music__section__content__playlist-songs .song-item");
                    0 === n.length && (n = document.querySelectorAll(".jp__track"), t = 0);
                    for (var i, a = [], o = {}, r = function(e) {
                        s = s.then((function() {
                            return new Promise((function(n) {
                                O.getUrl(e, t, n);
                            }));
                        })).then((function(n) {
                            if (n && !o[n]) {
                                o[n] = 1;
                                var i = "", r = "";
                                if (0 === t ? (i = e.querySelector(".jp__track-duration-total"), r = O.getTitle(e)) : (i = e.querySelector(".time"), 
                                r = O.getTitle2(e)), r) {
                                    var s = f.a.modify(r) + ".mp3", l = i && O.secondsFromDuration(i.textContent);
                                    a.push({
                                        url: n,
                                        filename: s,
                                        title: r,
                                        duration: l
                                    });
                                }
                            }
                        })).catch((function(e) {}));
                    }, s = Promise.resolve(), l = 0; i = n[l]; l++) r(i);
                    s.then((function() {
                        e(a);
                    }));
                },
                showListOfAudioFiles: function(e) {
                    O.getMp3UrlList((function(t) {
                        0 !== t.length && (e ? n.playlist.popupPlaylist(t, C(), !0) : n.playlist.popupFilelist(t));
                    }));
                },
                downloadMP3Files: function() {
                    O.getMp3UrlList((function(e) {
                        0 !== e.length && n.downloadList.showBeforeDownloadPopup(e, {
                            type: "audio",
                            folderName: C()
                        });
                    }));
                },
                onDlBtnOver: function(e) {
                    if (!i.a.isSafari) {
                        var t = this.dataset.duration;
                        if ("mouseenter" === e.type) {
                            var a, o = this, r = w.show(o, a = {
                                top: -14,
                                width: 16,
                                style: {
                                    backgroundColor: "#fff",
                                    border: "1px solid #ccc",
                                    color: "rgb(48, 48, 48)"
                                }
                            });
                            return o.dataset.bitrate ? (r.style.padding = "2px 5px 3px", void (r.textContent = " (" + o.dataset.size + " ~ " + o.dataset.bitrate + ")")) : o.dataset.size ? (r.style.padding = "2px 5px 3px", 
                            void (r.textContent = " (" + o.dataset.size + ")")) : (r.style.padding = "2px 2px 0 2px", 
                            r.textContent = "", r.appendChild(p.a.create("img", {
                                src: "//my9.imgsmail.ru/r/my/preloader_circle_16.gif",
                                height: 16,
                                width: 16
                            })), void fetch(o.href, {
                                method: "GET",
                                credentials: "include"
                            }).then(e => e.headers.get("content-length")).then(e => {
                                if (r.style.padding = "2px 5px 3px", !e) return r.textContent = i.a.i18n.getMessage("getFileSizeFailTitle"), 
                                void w.updatePos(o, a);
                                var s = n.sizeHuman(e, 2);
                                if (t) {
                                    var l = Math.floor(e / t / 125) + " " + i.a.i18n.getMessage("kbps");
                                    o.dataset.bitrate = l, o.dataset.size = s, r.textContent = " (" + s + " ~ " + l + ")";
                                } else o.dataset.size = s, r.textContent = " (" + s + ")";
                                w.updatePos(o, a);
                            }));
                        }
                        w.hide();
                    }
                },
                getUrlViaBridge: function(e, t) {
                    void 0 === O.getUrlViaBridge.index && (O.getUrlViaBridge.index = 0);
                    var n = "sf-bridge-item-" + O.getUrlViaBridge.index;
                    O.getUrlViaBridge.index++, e.classList.add(n);
                    let i = {
                        className: n
                    };
                    Object(g.a)([ i ], (function(e) {
                        var t = e.className, n = document.getElementsByClassName(t)[0];
                        n.classList.remove(t);
                        var i = jQuery(n).data();
                        if (i && i.item) return i.item.url;
                    })).then(e => t(e));
                },
                getUrlById: function(e) {
                    return Object(g.a)([ e ], 'function(id){var url="";var findUrl=function findUrl(items,id){var url="";items.some(function(item){if(item._attr&&item._attr.file===id){url=item._attr.url;return true}});return url};try{url=findUrl(APP.activePage.collection.items,id)}catch(err){}try{if(!url){url=findUrl(APP.player.collection.items,id)}}catch(err){}return url}').then(e => {
                        if (!e) throw new Error("Url is not found");
                        return /^\/\//.test(e) && (e = "https:" + e), e;
                    });
                },
                getUrl: function(e, t, n) {
                    var i = e.dataset.url;
                    if (i) return n(i);
                    if (0 === t) {
                        var a = e.querySelector("a.jp__track-fullname-link");
                        if (null === a) return n();
                        a = a.href;
                        var o = Object(s.a)(a);
                        return o.file && o.uid ? n("https://music.my.mail.ru/file/" + o.file + ".mp3?u=" + encodeURIComponent(o.uid)) : O.getUrlViaBridge(e, (function(t) {
                            t && (e.dataset.url = t), n(t);
                        }));
                    }
                    if (1 === t) {
                        var r = e.dataset.file;
                        return O.getUrlById(r).then((function(e) {
                            n(e);
                        }), (function() {
                            n("https://music.my.mail.ru/file/" + r + ".mp3");
                        }));
                    }
                },
                onDlBtnClick: function(e) {
                    e.stopPropagation(), n.downloadOnClick(e);
                },
                getDlLink: function(e, t, n) {
                    return p.a.create("a", {
                        data: {
                            duration: t || ""
                        },
                        href: e,
                        style: {
                            position: "relative",
                            display: "inline-block",
                            width: "16px",
                            height: "16px",
                            verticalAlign: "middle"
                        },
                        download: f.a.modify(n + ".mp3"),
                        on: [ [ "mouseenter", O.onDlBtnOver ], [ "mouseleave", O.onDlBtnOver ], [ "click", this.onDlBtnClick ] ]
                    });
                },
                addDownloadPanelNew: function(e, t) {
                    if (Object(v.a)({
                        category: "append",
                        subcategory: "ma",
                        event: "b"
                    }), t) {
                        var n = O.getTitle2(e);
                        if (n) {
                            var i = e.querySelector(".time"), a = i && O.secondsFromDuration(i.textContent), o = this.getDlLink(t, a, n), r = p.a.create("div", {
                                class: [ O.className, "type-2" ],
                                append: [ o ],
                                on: [ [ "mouseover", e => {
                                    if (_) {
                                        if (!e.altKey && !e.ctrlKey) return e.preventDefault(), void Object(y.b)(r, {
                                            defaultWidth: 400,
                                            defaultHeight: 60
                                        }, {});
                                        Object(y.a)(r, {
                                            defaultWidth: 400,
                                            defaultHeight: 60
                                        }, {});
                                    }
                                } ] ]
                            }), s = e.querySelector(".icons");
                            if (s) s.appendChild(r); else {
                                const t = e.querySelector(".b-music__songs__row__body__inner__controls");
                                t && (o.classList.add(this.className + "-btn"), p.a.create(r, {
                                    class: [ this.className, "type-3" ],
                                    style: {
                                        background: "none",
                                        verticalAlign: "top"
                                    },
                                    append: [ o ]
                                }), t.appendChild(r));
                            }
                        }
                    }
                },
                addDownloadPanel: function(e, t) {
                    var n = e.querySelector(".jp__track-duration-total");
                    if (null !== n && void 0 !== t) {
                        var i = O.getTitle(e);
                        if (i) {
                            n = O.secondsFromDuration(n.textContent);
                            var a = p.a.create("div", {
                                class: [ O.className, "type-0" ],
                                append: [ this.getDlLink(t, n, i) ]
                            }), o = e.querySelector(".jp__track-management");
                            o && (o.firstChild ? o.insertBefore(a, o.firstChild) : o.appendChild(a));
                        }
                    }
                },
                onTrackOver: function(e, t) {
                    0 === e.getElementsByClassName(O.className).length && O.getUrl(e, t, (function(n) {
                        1 === t ? O.addDownloadPanelNew(e, n) : O.addDownloadPanel(e, n);
                    }));
                },
                injectStyle: function() {
                    this.style ? this.style.parentNode || document.head.appendChild(this.style) : (this.style = p.a.create("style", {
                        text: Object(d.a)([ {
                            selector: "." + this.className,
                            style: {
                                display: "none",
                                left: "22px",
                                backgroundImage: "url(" + n.svg.getSrc("download", "#168DE2") + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "16px"
                            }
                        }, {
                            selector: "." + this.className + "-btn",
                            style: {
                                backgroundImage: "url(" + n.svg.getSrc("download", "#168DE2") + ")",
                                backgroundRepeat: "no-repeat",
                                backgroundPosition: "center",
                                backgroundSize: "16px"
                            }
                        }, {
                            selector: ".jp__track:hover ." + this.className,
                            style: {
                                display: "block",
                                opacity: .5
                            }
                        }, {
                            selector: ".jp__track:hover ." + this.className + ".type-0",
                            style: {
                                display: "inline-block",
                                marginLeft: "-16px",
                                position: "relative",
                                left: "-2px"
                            }
                        }, {
                            selector: ".jp__track.jp__track-plays ." + this.className,
                            style: {
                                left: "-18px"
                            }
                        }, {
                            selector: "." + this.className + ":hover",
                            style: {
                                opacity: "1 !important"
                            }
                        }, {
                            selector: "." + this.className + ".type-2",
                            style: {
                                marginRight: "5px",
                                marginLeft: "5px"
                            }
                        }, {
                            selector: ".song-item:hover ." + this.className + ".type-2",
                            style: {
                                display: "inline-block",
                                opacity: .5
                            }
                        }, {
                            selector: ".b-music__section__content--songs ." + this.className + ".type-3",
                            style: {
                                marginTop: "18px"
                            }
                        }, {
                            selector: ".b-music__section__content--songs .b-music__songs--inline ." + this.className + ".type-3",
                            style: {
                                marginTop: "9px"
                            }
                        } ])
                    }), document.head.appendChild(this.style));
                },
                rmBtn: function() {
                    O.style && (O.style.parentNode.removeChild(O.style), O.style = void 0);
                    for (var e, t = document.querySelectorAll("." + O.className), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                }
            }, M = {
                btnIndex: 0,
                domCache: {},
                className: "sf-video-btn",
                prepareLinks: function(e) {
                    for (var t, n = [], i = 0; t = e[i]; i++) {
                        var a = t.url, o = "FLV";
                        -1 !== a.indexOf(".mp4") && (o = "MP4"), -1 !== a.indexOf(".mov") && (o = "MOV"), 
                        -1 !== a.indexOf(".mpg") && (o = "MPG"), t.quality || (t.quality = "-?-");
                        var r = t.quality.toUpperCase(), s = [ "1080P", "720P", "480P", "360P", "272P" ].indexOf(r);
                        -1 !== s && (r = [ "1080", "720", "480", "360", "272" ][s]);
                        var l = o.toLowerCase(), d = {
                            href: a,
                            title: t.title,
                            ext: l,
                            format: o,
                            quality: r,
                            forceDownload: !0
                        };
                        n.push(d);
                    }
                    if (0 !== n.length) return n;
                },
                showLinkList: function(e, t, a) {
                    if (e || (e = i.a.i18n.getMessage("noLinksFound")), a) {
                        if (!S.contextMenu) return;
                        return e.map(e => (e.noSize = i.a.isFirefox, e)), void S.contextMenu.update(e);
                    }
                    S.contextMenu && S.contextMenu.isShow ? S.hideMenu() : S.contextMenu = n.popupMenu.quickInsert(t, e, "video-links-popup", {
                        parent: Object(r.a)(t, "b-video__main")
                    });
                },
                appendPageBtn: function(e, t, a) {
                    if (null === e.querySelector("." + M.className)) {
                        Object(v.a)({
                            category: "append",
                            subcategory: "ma",
                            event: "b"
                        });
                        var o = null, r = p.a.create("span", {
                            class: M.className,
                            append: [ o = p.a.create("a", {
                                data: {
                                    index: t
                                },
                                href: "#",
                                on: [ "click", function(e) {
                                    e.preventDefault(), u.a.onRemoveEvent(this, S.hideMenu), M.readDomCache(this.dataset.index, this);
                                } ]
                            }) ]
                        });
                        if (1 === a ? (o.style.marginLeft = "15px", o.textContent = i.a.i18n.getMessage("download")) : 2 === a && (p.a.create(o, {
                            style: {
                                fontSize: 0,
                                lineHeight: 0,
                                padding: "6px",
                                boxShadow: "inset 0 0 0 1px #ccc",
                                borderRadius: "3px",
                                display: "inline-block"
                            }
                        }), o.appendChild(n.svg.getSvg("download", "#666", 18, 18))), 2 === a) e.appendChild(r); else if (1 === a) {
                            var s = e.lastChild;
                            e.insertBefore(r, s), s = null;
                        }
                    }
                },
                appendBtn: function(e, t) {
                    if (null === e.querySelector("." + M.className)) {
                        var n = void 0, a = {};
                        e.childNodes.length > 1 ? n = e.childNodes[1] : (n = e.lastChild, a.marginRight = "5px");
                        var o = p.a.create("span", {
                            class: e.lastChild.getAttribute("class") + " " + M.className,
                            append: [ p.a.create("a", {
                                data: {
                                    index: t
                                },
                                text: i.a.i18n.getMessage("download"),
                                href: "#",
                                on: [ "click", function(e) {
                                    e.preventDefault(), u.a.onRemoveEvent(this, S.hideMenu), M.readDomCache(this.dataset.index, this);
                                } ],
                                style: a
                            }) ]
                        });
                        e.insertBefore(o, n), n = null;
                    }
                },
                readDomCache: function(e, t) {
                    M.showLinkList(i.a.i18n.getMessage("download"), t);
                    var a = function() {
                        M.showLinkList(void 0, t, 1);
                    }, r = function(e) {
                        if ("getRutubeLinks" === e.action) {
                            if (!o.showUmmyItem) return a();
                            M.showLinkList(n.popupMenu.prepareLinks.rutube(e.links), t, 1);
                        } else "getMailruLinks" === e.action ? M.showLinkList(n.popupMenu.prepareLinks.mailru(e.links, e.title), t, 1) : M.showLinkList(M.prepareLinks(e.links), t, 1);
                    }, s = M.domCache[parseInt(e)];
                    if (s.links) r(s); else if (s.metadataUrl) {
                        var l = s.metadataUrl;
                        /^\/\//.test(l) && (l = "http:" + l);
                        Object(c.a)({
                            url: l,
                            withCredentials: !0,
                            json: !0,
                            localXHR: !0
                        }, (function(e, t) {
                            var n;
                            (n = e ? null : t.body) && "object" == typeof n ? M.readMeta(n, (function(e) {
                                e.links ? (s.links = e.links, s.action = e.action, r(s)) : a();
                            })) : a();
                        }));
                    } else s.url ? i.a.sendMessage({
                        action: "getMailruLinks",
                        extVideoId: s.url
                    }, (function(e) {
                        e.links ? (s.title = e.title, s.links = e.links, s.action = e.action, r(s)) : a();
                    })) : a();
                },
                readMeta: function(e, t) {
                    var n, a = [];
                    if ("UPLOADED" === e.provider) {
                        if (n = e.movie ? e.movie.title : void 0, !e.videos) return t();
                        e.videos.forEach((function(e) {
                            a.push({
                                quality: e.name,
                                url: e.url,
                                title: n
                            });
                        }));
                    }
                    if ("ugc" === e.provider) {
                        if (n = e.meta ? e.meta.title : void 0, !e.videos) return t();
                        e.videos.forEach((function(e) {
                            a.push({
                                quality: e.key,
                                url: e.url,
                                title: n
                            });
                        }));
                    }
                    return "pladform" === e.provider ? (n = e.meta ? e.meta.title : void 0, void i.a.sendMessage({
                        action: "getPladformVideo",
                        extVideoId: {
                            playerId: e.meta.playerId,
                            videoId: e.meta.videoId
                        }
                    }, (function(e) {
                        if (!e) return t();
                        var i = e.links;
                        if (!i) return t();
                        i.forEach((function(e) {
                            "object" == typeof e && void 0 === e.title && (e.title = n);
                        })), t(e);
                    }))) : 0 === a.length ? t() : t({
                        links: a
                    });
                },
                getFlashVars: function(e) {
                    if (e) {
                        var t = e.querySelector('param[name="flashvars"]');
                        if (t) {
                            var n = t.value, i = Object(s.a)(n, {
                                params: !0
                            });
                            return i.metadataUrl ? {
                                metadataUrl: i.metadataUrl
                            } : void 0;
                        }
                    }
                },
                matchUrl: function(e) {
                    var t = e.match(/\/([^\/]+)\/([^\/]+)\/video\/(.+).html/);
                    return t || (t = e.match(/embed\/([^\/]+)\/([^\/]+)\/(.+).html/)), t;
                },
                getVideoId: function(e) {
                    "OBJECT" !== e.tagName && (e = e.querySelector('object[name="b-video-player"]'));
                    var t = this.getFlashVars(e);
                    if (t) return t;
                    var n = document.querySelector('[data-type="album-json"]');
                    if (n) try {
                        if ((n = JSON.parse(n.textContent)).signVideoUrl) return {
                            metadataUrl: n.signVideoUrl
                        };
                    } catch (e) {}
                    var i = this.matchUrl(location.pathname);
                    return i ? {
                        metadataUrl: "http://api.video.mail.ru/videos/" + i[1] + "/" + i[2] + "/" + i[3] + ".json"
                    } : void 0;
                },
                getVideoContentVideoId: function(e) {
                    var t = null, n = e.querySelector(".sp-video__item-page-new__share__item[data-share-type][data-location]");
                    return n && (t = {
                        url: n.dataset.location
                    }), t;
                },
                insertBtnInPage: function(e, t, n) {
                    e.metadataUrl ? (e.metadataUrl = decodeURIComponent(e.metadataUrl), M.domCache[M.btnIndex] = {
                        metadataUrl: e.metadataUrl
                    }) : M.domCache[M.btnIndex] = Object.assign({}, e), M.appendPageBtn(t, M.btnIndex, n), 
                    M.btnIndex++;
                },
                insertBtnInPopup: function(e, t) {
                    e.metadataUrl && (e.metadataUrl = decodeURIComponent(e.metadataUrl), M.domCache[M.btnIndex] = {
                        metadataUrl: e.metadataUrl
                    }), M.appendBtn(t, M.btnIndex), M.btnIndex++;
                },
                rmBtn: function() {
                    for (var e, t = document.querySelectorAll("." + M.className), n = 0; e = t[n]; n++) e.parentNode.removeChild(e);
                }
            };
        }));
    }
});