!function(e) {
    function t(t) {
        for (var o, i, c = t[0], l = t[1], u = t[2], f = 0, p = []; f < c.length; f++) i = c[f], 
        Object.prototype.hasOwnProperty.call(n, i) && n[i] && p.push(n[i][0]), n[i] = 0;
        for (o in l) Object.prototype.hasOwnProperty.call(l, o) && (e[o] = l[o]);
        for (s && s(t); p.length; ) p.shift()();
        return a.push.apply(a, u || []), r();
    }
    function r() {
        for (var e, t = 0; t < a.length; t++) {
            for (var r = a[t], o = !0, c = 1; c < r.length; c++) {
                var l = r[c];
                0 !== n[l] && (o = !1);
            }
            o && (a.splice(t--, 1), e = i(i.s = r[0]));
        }
        return e;
    }
    var o = {}, n = {
        10: 0
    }, a = [];
    function i(t) {
        if (o[t]) return o[t].exports;
        var r = o[t] = {
            i: t,
            l: !1,
            exports: {}
        };
        return e[t].call(r.exports, r, r.exports, i), r.l = !0, r.exports;
    }
    i.m = e, i.c = o, i.d = function(e, t, r) {
        i.o(e, t) || Object.defineProperty(e, t, {
            enumerable: !0,
            get: r
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
        var r = Object.create(null);
        if (i.r(r), Object.defineProperty(r, "default", {
            enumerable: !0,
            value: e
        }), 2 & t && "string" != typeof e) for (var o in e) i.d(r, o, function(t) {
            return e[t];
        }.bind(null, o));
        return r;
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
    var c = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], l = c.push.bind(c);
    c.push = t, c = c.slice();
    for (var u = 0; u < c.length; u++) t(c[u]);
    var s = l;
    a.push([ 122, 0 ]), r();
}({
    122: function(e, t, r) {
        "use strict";
        r.r(t);
        var o = r(0), n = r(32), a = r(7), i = r(51), c = r(48);
        r(66);
        Object(a.a)("ShareDistributor");
        Object(a.a)("helper-pro-exp");
        const l = Object(a.a)("oauth");
        if (/\/callback\.php/.test(location.href) && /code=/.test(location.href) && o.a.callFn("auth.isAuth").then(e => {
            if (e) throw new Error("User is already logged in");
            return o.a.callFn("auth.handleAuthCallback", [ location.href ]);
        }).then(() => {
            o.a.sendMessage({
                action: "track",
                t: "event",
                tid: "UA-181742122-2",
                ec: "login-helper-page",
                el: location.host,
                ea: "sign-in"
            });
        }).catch(e => l.error(e)), /helper-pro\?force-activate=100/.test(location.href) && Object(c.a)({
            helper_pro_force: !0
        }), /helper-pro\?force-deactivate=100/.test(location.href) && Object(c.a)({
            helper_pro_force: !1
        }), /\/login/.test(location.href) && /helper\.pro/.test(location.href) && o.a.sendMessage({
            action: "track",
            t: "event",
            tid: "UA-181742122-2",
            ec: "login-helper-page",
            el: location.host,
            ea: "loaded"
        }), /helper\-pro\-manual/.test(location.href) && /purchase=1/.test(location.href)) {
            const e = () => Object(n.a)([ "userInfo" ]).then(e => ({
                isAuth: Boolean(e.userInfo),
                isPremium: e.userInfo && e.userInfo.isPremium
            })), t = window.localStorage, r = t.getItem("lastActive"), a = Number(r) + 2e4, c = r && a > Date.now();
            l.log("is skip", c), e().then(e => {
                let {isAuth: r, isPremium: n} = e;
                if (!r) throw new Error("User not auth");
                if (l.log("refresh info", n, c), !n && !c) return Object(i.a)(1e3).then(() => (t.setItem("lastActive", String(Date.now())), 
                o.a.callFn("auth.refreshUserInfo")));
            }).then(() => e()).then(e => {
                let {isPremium: t} = e;
                if (t) {
                    const e = document.querySelector(".premium-info");
                    e && e.classList.remove("hidden");
                    const t = document.querySelector("#step-email-check");
                    t && t.remove();
                    document.querySelectorAll(".step .number").forEach((e, t) => {
                        e.textContent = String(t + 1);
                    });
                }
                l.log("activate premium", t);
            }).catch(e => {
                l.warn("activate premium error", e);
            });
        }
    }
});