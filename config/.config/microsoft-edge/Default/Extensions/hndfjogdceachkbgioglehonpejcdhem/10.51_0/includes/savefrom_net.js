!function(e) {
    function t(t) {
        for (var i, a, o = t[0], u = t[1], l = t[2], c = 0, m = []; c < o.length; c++) a = o[c], 
        Object.prototype.hasOwnProperty.call(n, a) && n[a] && m.push(n[a][0]), n[a] = 0;
        for (i in u) Object.prototype.hasOwnProperty.call(u, i) && (e[i] = u[i]);
        for (d && d(t); m.length; ) m.shift()();
        return r.push.apply(r, l || []), s();
    }
    function s() {
        for (var e, t = 0; t < r.length; t++) {
            for (var s = r[t], i = !0, o = 1; o < s.length; o++) {
                var u = s[o];
                0 !== n[u] && (i = !1);
            }
            i && (r.splice(t--, 1), e = a(a.s = s[0]));
        }
        return e;
    }
    var i = {}, n = {
        13: 0
    }, r = [];
    function a(t) {
        if (i[t]) return i[t].exports;
        var s = i[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(s.exports, s, s.exports, a), s.l = !0, s.exports;
    }
    a.m = e, a.c = i, a.d = function(e, t, s) {
        a.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: s
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
        var s = Object.create(null);
        if (a.r(s), Object.defineProperty(s, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var i in e) a.d(s, i, function(t) {
            return e[t];
        }.bind(null, i));
        return s;
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
    var o = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], u = o.push.bind(o);
    o.push = t, o = o.slice();
    for (var l = 0; l < o.length; l++) t(o[l]);
    var d = u;
    r.push([ 110, 0 ]), s();
}({
    110: function(e, t, s) {
        "use strict";
        s.r(t);
        var i = s(0), n = s(9), r = s(18), a = s(30), o = s(3), u = s(1), l = s(6), d = s(20), c = s(11), m = s(34), f = s(16), p = s(14), h = s(5), b = s(28);
        d.a.isSingle() && Object(r.b)("savefrom", (function(e, t) {
            const s = Object(n.a)(t);
            var r = t.preferences;
            const {selectorsConfig: a} = t.preferences;
            i.a.onMessage.addListener((function(e, t, s) {
                "updatePreferences" !== e.action || Object.assign(r, e.preferences);
            })), setTimeout(() => d.run());
            var d = {
                name: e,
                scriptId: "savefrom__ext_script",
                dataAttr: "data-extension-disabled",
                attrObservers: [],
                run: function() {
                    if (d.setExtParams(), location.href.search(/\/(update-helper|userjs-setup)\.php/i) > -1) {
                        var e = document.getElementById("js-not-remind");
                        e && e.addEventListener("click", (function(e) {
                            0 === e.button && i.a.sendMessage({
                                action: "hideUserjsMigrationInfo"
                            });
                        }));
                    } else c.a.isAvailable() && this.mutationMode.enable();
                },
                mutationMode: {
                    observer: null,
                    stop: function() {
                        this.observer && this.observer.stop();
                    },
                    enable: function() {
                        if (this.observer) return this.observer.start();
                        this.observer = new c.a({
                            queries: [ {
                                css: a.savefrom.formAdd,
                                is: "added",
                                callback: e => {
                                    for (let t, s = 0; t = e.added[s]; s++) d.waitFormId(t), d.mutationMode.stop();
                                }
                            }, {
                                css: a.savefrom.muxer,
                                is: "added",
                                callback: e => {
                                    let {added: t} = e;
                                    t.forEach(e => {
                                        e.removeAttribute("download"), e.dataset.watched || (e.dataset.watched = "1", e.addEventListener("click", t => {
                                            t.preventDefault();
                                            const s = JSON.parse(e.dataset.sources);
                                            Object(p.a)(Object(h.e)(b.a, s), "sf-muxer-parent");
                                        }));
                                    });
                                }
                            } ]
                        });
                    }
                },
                waitFormId(e) {
                    const t = new m.a({
                        attrs: [ {
                            name: "id",
                            callback: t => {
                                "sf_form" === t.value && (d.bindForm(e), this.attrObservers.splice(0).forEach(e => e.stop()));
                            }
                        } ],
                        target: e
                    });
                    this.attrObservers.push(t);
                },
                bindForm(e) {
                    e.addEventListener("submit", (function(t) {
                        var n = e.sf_url.value;
                        if (n && "1" != e.getAttribute(d.dataAttr)) {
                            var r = {
                                getVKLinks: [ /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/(video-?\d+_-?\d+)/i, /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/video_ext.php\?(.*oid=-?\d+.*)$/i, /^https?:\/\/(?:[a-z]+\.)?(?:vk\.com|vkontakte\.ru)\/[\w\-\.]+\?.*z=(video-?\d+_-?\d+)/i ],
                                getYoutubeLinks: [ /^https?:\/\/(?:[a-z]+\.)?youtube\.com\/(?:#!?\/)?watch\?.*v=([\w\-]+)/i, /^https?:\/\/(?:[a-z0-9]+\.)?youtube\.com\/(?:embed|v)\/([\w\-]+)/i, /^https?:\/\/(?:[a-z]+\.)?youtu\.be\/([\w\-]+)/i ],
                                getVimeoLinks: [ /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/(?:\w+\#)?(\d+)/i, /^https?:\/\/player\.vimeo\.com\/video\/(\d+)/i, /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/channels\/(?:[^\/]+)\/(\d+)$/i, /^https?:\/\/(?:[\w\-]+\.)?vimeo\.com\/[^\/]+\/review\/(\d+)\/(?:\d+)/i ],
                                getDailymotionLinks: [ /^http:\/\/(?:www\.)?dai\.ly\/([a-z0-9]+)_?/i, /^https?:\/\/(?:[\w]+\.)?dailymotion\.com(?:\/embed|\/swf)?\/video\/([a-z0-9]+)_?/i ],
                                getFacebookLinks: [ /^https?:\/\/(?:[\w]+\.)?facebook\.com(?:\/video)?\/video.php.*[?&]{1}v=([0-9]+).*/i, /^https?:\/\/(?:[\w]+\.)?facebook\.com\/.+\/videos(?:\/\w[^\/]+)?\/(\d+)/i ],
                                getMailruLinks: [ /^https?:\/\/my\.mail\.ru\/([^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\.html).*/i, /^https?:\/\/videoapi\.my\.mail\.ru\/videos\/(embed\/[^\/]+\/[^\/]+\/[^\/]+\/[^\/]+\.html).*/i ]
                            };
                            for (var a in r) for (var o = 0; o < r[a].length; o++) {
                                var u = n.match(r[a][o]);
                                if (u && u.length > 1) {
                                    u = u[1];
                                    var l = s.getMatchFirst(n, /list=([\w\-]+)/i);
                                    t.preventDefault(), t.stopPropagation();
                                    var c = {
                                        extVideoId: u,
                                        action: a,
                                        checkSubtitles: !0,
                                        checkLinks: !0
                                    };
                                    return "getVimeoLinks" === a && (c.url = n), i.a.sendMessage(c, (function(e) {
                                        d.setLinks(e.action, e.extVideoId, e.links, e.title, null, e.subtitles, l, e.duration, e.thumb, e.checkLinks);
                                    })), !1;
                                }
                            }
                        }
                    }), !1), document.body.addEventListener("click", (function(e) {
                        var t = e.target;
                        if ("I" === t.tagName && t.classList.contains("file-info-btn")) d.onInfoBtnClick.call(t, e); else {
                            if ("A" != t.tagName) {
                                if ("A" != t.parentNode.tagName) return;
                                t = t.parentNode;
                            }
                            if ((i.a.isChrome || i.a.isFirefox || i.a.isGM) && t.classList.contains("link-download") && !t.classList.contains("disabled") && t.getAttribute("download")) return t.classList.contains("ga_track_events") && t.getAttribute("data-ga-event") && o.a.trigger(t, "sendstats", {
                                bubbles: !0,
                                cancelable: !1
                            }), s.downloadOnClick(e, null, {
                                withoutPropagation: !0
                            });
                            var n = t.getAttribute("data-video-id");
                            if (n && "1" != t.getAttribute(d.dataAttr)) {
                                var r = {
                                    vk: "getVKLinks",
                                    yt: "getYoutubeLinks"
                                };
                                if (2 == (n = n.split(":", 2)).length && r[n[0]]) {
                                    e.preventDefault(), e.stopPropagation(), t.style.display = "none", t.id || (t.id = n[0] + "_" + n[1] + "_" + 1e3 * Math.random() + "_" + (new Date).getTime());
                                    var a = {
                                        extVideoId: n[1],
                                        action: r[n[0]],
                                        checkSubtitles: !0,
                                        checkLinks: !0
                                    };
                                    return i.a.sendMessage(a, (function(e) {
                                        d.setLinks(e.action, e.extVideoId, e.links, e.title, t, e.subtitles, null, e.duration, e.thumb, e.checkLinks);
                                    })), !1;
                                }
                            }
                        }
                    }), !0);
                },
                onInfoBtnClick: function(e) {
                    if (e.preventDefault(), e.stopPropagation(), !this.classList.contains("sf-clicked")) {
                        this.classList.add("sf-clicked");
                        var t = "sf-btn" + function() {
                            for (var e = Date.now(), t = e; e === t; ) t = Date.now();
                            return t;
                        }();
                        this.classList.add(t);
                        var n = function() {
                            var e = document.getElementsByClassName("sf-script")[0];
                            void 0 !== e && e.parentNode.removeChild(e);
                        };
                        n(), document.body.appendChild(u.a.create("script", {
                            class: "sf-script",
                            text: '(function(btnClassName){try{var btn=document.getElementsByClassName(btnClassName);var $btn=$(btn);$btn.unbind("click").removeAttr("onclick").addClass("active");if(btn.onclick){btn.onclick=null}var parent=$btn.closest(".result-box").find(".meta")[0];if(!parent){return}var boxId="file_info"+btnClassName;var box=sf.append(parent,"div",{"id":boxId,"class":"media-info"});sf.append(box,"span",{id:boxId+"_busy"});sf.busy(boxId+"_busy",true)}catch(err){}})(' + JSON.stringify(t) + ")"
                        }));
                        var r = this.nextElementSibling.href, a = this.nextElementSibling.textContent;
                        i.a.sendMessage({
                            action: "getFileSize",
                            url: r
                        }, (function(e) {
                            var r = e.fileSize, o = {
                                size: {
                                    name: {
                                        trans: i.a.i18n.getMessage("size")
                                    },
                                    value: s.sizeHuman(r)
                                }
                            };
                            n(), document.body.appendChild(u.a.create("script", {
                                class: "sf-script",
                                text: '(function(btnClassName,title,json){try{var busy=document.getElementById("file_info"+btnClassName+"_busy");$(busy).slideUp();var btn=document.getElementsByClassName(btnClassName);sf.fileInfo.show(json,title,btn,busy.parentNode)}catch(err){}})(' + [ JSON.stringify(t), JSON.stringify(a), JSON.stringify(o) ].join(",") + ")"
                            }));
                        }));
                    }
                },
                setExtParams: function() {
                    var e = u.a.create("script", {
                        id: "savefrom__ext_params",
                        type: "text/javascript"
                    }), t = {
                        id: r.sfHelperName,
                        version: r.version,
                        enable: 1
                    };
                    e.textContent = '(function(json){try{if(window.setBrowserExtension&&typeof setBrowserExtension=="function"){setBrowserExtension(json)}}catch(err){}})(' + JSON.stringify(t) + ")", 
                    document.body.appendChild(e);
                },
                setLinks: function(e, t, s, i, n, r, a, o, u, l) {
                    if (!1 !== l) switch (e) {
                      case "getYoutubeLinks":
                        d.setYoutubeLinks(t, s, i, n, r, a, o, u);
                        break;

                      case "getVKLinks":
                        d.setVKLinks(t, s, i, n, o, u);
                        break;

                      case "getVimeoLinks":
                        d.setVimeoLinks(t, s, i, n, o, u);
                        break;

                      case "getDailymotionLinks":
                        d.setDailymotionLinks(t, s, i, n, o, u);
                        break;

                      case "getFacebookLinks":
                        d.setFacebookLinks(t, s, i, n, o, u);
                        break;

                      case "getMailruLinks":
                        d.setMailruLinks(t, s, i, n, o, u);
                    } else d.handleError(n);
                },
                handleError: function(e) {
                    if (e) e && (e.style.display = "", e.setAttribute(d.dataAttr, "1"), e.click()); else {
                        var t = document.getElementById("sf_form");
                        t && (t.setAttribute(d.dataAttr, "1"), t.submit(), t.removeAttribute(d.dataAttr));
                    }
                },
                showVideoResult: function(e, t) {
                    e && e.url && e.url.length ? Object(f.a)([ t && t.id, e ], (e, t) => {
                        if (e) {
                            let s = document.getElementById(e);
                            sf.result.replaceAjaxResult(t, !0, !0, s);
                        } else sf.finishRequest(!0), sf.videoResult.show(t);
                    }) : d.handleError(t);
                },
                setVKLinks: function(e, t, i, n, r, a) {
                    if (e && t) {
                        var o = {
                            id: e,
                            url: t,
                            hosting: "vk.com (h)",
                            meta: {
                                title: i ? l.a.modify(i) : "download",
                                source: "http://vk.com/" + e,
                                duration: s.secondsToDuration(r)
                            }
                        };
                        a && (o.thumb = a);
                        for (var u = 0; u < o.url.length; u++) o.url[u].info_url = "#", !o.url[u].ext && o.url[u].type && (o.url[u].ext = o.url[u].type), 
                        o.sd || o.url[u].subname ? !o.hd && o.url[u].subname && parseInt(o.url[u].subname) >= 720 && (o.hd = {
                            url: o.url[u].url
                        }) : o.sd = {
                            url: o.url[u].url
                        };
                        d.showVideoResult(o, n);
                    } else d.handleError(n);
                },
                setYoutubeLinks(e, t, n, r, a, o, u) {
                    if (!e || !t) return d.handleError(r);
                    let c = {
                        id: e,
                        url: [],
                        hosting: "101 (h)",
                        meta: {
                            title: n ? l.a.modify(n) : "download",
                            source: e ? "http://youtube.com/watch?v=" + e : "",
                            duration: s.secondsToDuration(u)
                        },
                        thumb: e ? "http://i.ytimg.com/vi/" + e + "/hqdefault.jpg" : ""
                    }, m = !1;
                    s.video.yt.init();
                    let f = t.meta || {};
                    const p = s.video.yt.format;
                    for (let e in p) {
                        const s = p[e];
                        for (let i in s) {
                            let n = f[i] || {};
                            if (t[i]) {
                                !m && t[i].search(/(\?|&)sig(nature)?=/i) > -1 && (m = !0);
                                let r = s[i].quality;
                                n.quality && (r = n.quality);
                                let a = {
                                    url: t[i],
                                    name: e,
                                    subname: r,
                                    info_url: "#",
                                    type: e,
                                    quality: r,
                                    attr: {}
                                };
                                s[i].sFps && (a.subname += " " + (n.fps || 60)), [ "Audio AAC", "Audio Vorbis", "Audio Opus" ].includes(e) && (a.attr.style = "white-space: nowrap;");
                                const o = {
                                    "Audio AAC": {
                                        type: "AAC",
                                        ext: "aac"
                                    },
                                    "Audio Vorbis": {
                                        type: "Vorbis",
                                        ext: "webm"
                                    },
                                    "Audio Opus": {
                                        type: "Opus",
                                        ext: "webm"
                                    }
                                };
                                s[i]["3d"] ? (a.name = "3D " + a.name, a["3d"] = !0) : s[i].noAudio ? (a.group = "MP4 ", 
                                a.attr.class = "no-audio") : o[e] ? a = Object.assign({}, a, o[e]) : ("flv" !== e.toLowerCase() || c.sd || (c.sd = {
                                    url: t[i]
                                }), parseInt(r) >= 720 && c.sd && !c.hd && (c.hd = {
                                    url: t[i]
                                })), void 0 === a.ext && a.type && (a.ext = a.type.toLowerCase()), c.url.push(a), 
                                delete t[i];
                            }
                        }
                    }
                    if (!m) return void d.handleError(r);
                    if (a && a.length > 0) {
                        let t = e.replace(/[^\w]/, "_"), n = "yt_subs_btn_" + t;
                        t = "yt_subs_" + t;
                        let r = "extension", a = c.meta.title ? btoa(s.utf8Encode(c.meta.title)) : "";
                        c.action = [], c.action.push({
                            name: i.a.i18n.getMessage("subtitles"),
                            attr: {
                                id: n,
                                href: "#"
                            },
                            bind: {
                                click: {
                                    fn: 'sf.youtubeSubtitles("{vid}","{subsId}","{btnId}","{subtToken}","{subsTitle}")'.replace("{vid}", e).replace("{subsId}", t).replace("{btnId}", "#" + n).replace("{subtToken}", r).replace("{subsTitle}", a)
                                }
                            }
                        });
                    }
                    if (!c.url.find(e => {
                        const t = "MP4" === e.type.toLowerCase() && parseInt(e.quality) >= 720;
                        return (!e.attr || "no-audio" !== e.attr.class) && t;
                    }) && t.meta && t.meta.muxer) {
                        const e = t.meta.muxer;
                        c.url.push({
                            ext: e.mmProps.format,
                            type: e.mmProps.format.toUpperCase(),
                            url: "#muxer",
                            name: "MP4",
                            subname: e.quality,
                            info_url: "#",
                            quality: e.quality,
                            attr: {
                                "data-sources": JSON.stringify(e.mmProps)
                            }
                        });
                    }
                    d.showVideoResult(c, r);
                },
                setVimeoLinks: function(e, t, i, n, r, a) {
                    if (e && t) {
                        t && Array.isArray(t) && (t = t.sort((e, t) => {
                            const s = parseInt(e.height), i = parseInt(t.height);
                            return isNaN(s) && isNaN(i) ? 0 : isNaN(s) ? -1 : isNaN(i) ? 1 : s > i ? -1 : s === i ? 0 : 1;
                        }));
                        var o = {
                            id: e,
                            url: t,
                            hosting: "vimeo.com (h)",
                            meta: {
                                title: i ? l.a.modify(i) : "download",
                                source: "http://vimeo.com/" + e,
                                duration: s.secondsToDuration(r)
                            }
                        };
                        a && (o.thumb = a);
                        for (var u = 0; u < o.url.length; u++) o.url[u].info_url = "#", !o.url[u].ext && o.url[u].type && (o.url[u].ext = o.url[u].type), 
                        o.sd || "SD" != o.url[u].name ? o.hd || "HD" != o.url[u].name || (o.hd = {
                            url: o.url[u].url
                        }) : o.sd = {
                            url: o.url[u].url
                        };
                        d.showVideoResult(o, n);
                    } else d.handleError(n);
                },
                setDailymotionLinks: function(e, t, i, n, r, a) {
                    if (e && t) {
                        var o = t.filter((function(e) {
                            if (!e.extra) return !0;
                        })), u = {
                            id: e,
                            url: o = o.map(e => {
                                const t = /\d+x(\d+)/;
                                if (e.ext && e.name) {
                                    const s = e.name.match(t);
                                    s && s[1] && (e.name = e.ext.toUpperCase() + " " + (s && s[1]));
                                }
                                return e;
                            }),
                            hosting: "dailymotion.com (h)",
                            meta: {
                                title: i ? l.a.modify(i) : "download",
                                source: "http://dai.ly/" + e,
                                duration: s.secondsToDuration(r)
                            }
                        };
                        a && (u.thumb = a);
                        for (var c, m = 0, f = 0, p = 0; c = o[p]; p++) c.info_url = "#", c.height >= 720 ? m < c.height && (u.hd = {
                            url: c.url
                        }, m = c.height) : f < c.height && (u.sd = {
                            url: c.url
                        }, f = c.height), delete c.height;
                        d.showVideoResult(u, n);
                    } else d.handleError(n);
                },
                setFacebookLinks: function(e, t, i, n, r, a) {
                    if (e && t) {
                        var o = {
                            id: e,
                            url: t,
                            hosting: "facebook.com (h)",
                            meta: {
                                title: i ? l.a.modify(i) : "download",
                                source: "https://facebook.com/video.php?v=" + e,
                                duration: s.secondsToDuration(r)
                            }
                        };
                        a && (o.thumb = a);
                        for (var u, c = 0; u = t[c]; c++) u.info_url = "#", "SD" === u.name ? o.sd = {
                            url: u.url
                        } : "HD" === u.name && (o.hd = {
                            url: u.url
                        }), u.subname = u.name, u.name = u.ext;
                        d.showVideoResult(o, n);
                    } else d.handleError(n);
                },
                setMailruLinks: function(e, t, i, n, r, a) {
                    if (e && t) {
                        var o = {
                            id: e,
                            url: t,
                            hosting: "mail.ru (h)",
                            meta: {
                                title: i ? l.a.modify(i) : "download",
                                source: "http://my.mail.ru/" + e,
                                duration: s.secondsToDuration(r)
                            }
                        };
                        a && (o.thumb = a);
                        for (var u, c = 0, m = 0; u = o.url[m]; m++) u.info_url = "#", isNaN(parseInt(u.subname)) ? "sd" === u.subname.toLowerCase() ? o.sd = {
                            url: u.url
                        } : "hd" === u.subname.toLowerCase() && (o.hd = {
                            url: u.url
                        }) : (c < u.subname && u.subname < 720 && (o.sd = {
                            url: u.url
                        }, c = u.subname), !o.hd && u.subname >= "720" && (o.hd = {
                            url: u.url
                        }));
                        d.showVideoResult(o, n);
                    } else d.handleError(n);
                }
            };
        }), (function() {
            return Object(a.a)() ? i.a.isGM && -1 !== location.href.indexOf("/tools/helper-check.html") : [ "/faq.php", "/advertising.php", "/EULA.html", "/terms.html", "/privacy-policy.html", "/apk", "/webmaster.php" ].every(e => -1 === location.href.indexOf(e));
        }));
    }
});