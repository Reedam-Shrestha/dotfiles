!function(A) {
    function n(n) {
        for (var e, o, i = n[0], c = n[1], l = n[2], s = 0, g = []; s < i.length; s++) o = i[s], 
        Object.prototype.hasOwnProperty.call(r, o) && r[o] && g.push(r[o][0]), r[o] = 0;
        for (e in c) Object.prototype.hasOwnProperty.call(c, e) && (A[e] = c[e]);
        for (d && d(n); g.length; ) g.shift()();
        return a.push.apply(a, l || []), t();
    }
    function t() {
        for (var A, n = 0; n < a.length; n++) {
            for (var t = a[n], e = !0, i = 1; i < t.length; i++) {
                var c = t[i];
                0 !== r[c] && (e = !1);
            }
            e && (a.splice(n--, 1), A = o(o.s = t[0]));
        }
        return A;
    }
    var e = {}, r = {
        5: 0
    }, a = [];
    function o(n) {
        if (e[n]) return e[n].exports;
        var t = e[n] = {
            i: n,
            l: !1,
            exports: {}
        };
        return A[n].call(t.exports, t, t.exports, o), t.l = !0, t.exports;
    }
    o.m = A, o.c = e, o.d = function(A, n, t) {
        o.o(A, n) || Object.defineProperty(A, n, {
            enumerable: !0,
            get: t
        });
    }, o.r = function(A) {
        "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(A, Symbol.toStringTag, {
            value: "Module"
        }), Object.defineProperty(A, "__esModule", {
            value: !0
        });
    }, o.t = function(A, n) {
        if (1 & n && (A = o(A)), 8 & n) return A;
        if (4 & n && "object" == typeof A && A && A.__esModule) return A;
        var t = Object.create(null);
        if (o.r(t), Object.defineProperty(t, "default", {
            enumerable: !0,
            value: A
        }), 2 & n && "string" != typeof A) for (var e in A) o.d(t, e, function(n) {
            return A[n];
        }.bind(null, e));
        return t;
    }, o.n = function(A) {
        var n = A && A.__esModule ? function() {
            return A.default;
        } : function() {
            return A;
        };
        return o.d(n, "a", n), n;
    }, o.o = function(A, n) {
        return Object.prototype.hasOwnProperty.call(A, n);
    }, o.p = "";
    var i = window.savefromContentScriptWebpackJsonp = window.savefromContentScriptWebpackJsonp || [], c = i.push.bind(i);
    i.push = n, i = i.slice();
    for (var l = 0; l < i.length; l++) n(i[l]);
    var d = c;
    a.push([ 118, 0 ]), t();
}({
    118: function(A, n, t) {
        "use strict";
        t.r(n);
        var e = t(0);
        !function() {
            const A = [ "en", "hi" ];
            if ((navigator.languages || [ navigator.language ]).some(n => A.includes(n.slice(0, 2).toLowerCase()))) {
                const A = document.createElement("div");
                A.id = "thirdModal", A.classList.add("third-modal");
                const t = "data:image/png;base64,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", r = "data:image/png;base64,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", a = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgb3BhY2l0eT0iMC40Ij4KPHBhdGggZD0iTTYuNDAwMDIgMTcuNTk5OUwxNy42IDYuMzk5OTIiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWNhcD0icm91bmQiLz4KPHBhdGggZD0iTTYuNDAwMDIgNi4zOTk5TDE3LjYgMTcuNTk5OCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxLjYiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L2c+Cjwvc3ZnPgo=";
                A.innerHTML = `\n    <div class="third-modal__window">\n      <button class="close"><img src="${a}" alt="" /></button>\n      <img src="${r}" alt="" class="third-modal__img" />\n      <h3 class="third-modal__title">🌟 Help our astrologers! 🌟</h3>\n      <p class="third-modal__txt">\n        Take our quick 2-minute survey and unlock access to an exclusive\n        monthly report!\n      </p>\n      <a\n        class="third-modal__btn"\n      >\n        Get it Now!\n      </a>\n    </div>\n`;
                const o = `\n@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap");\n@import url('https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100..900;1,100..900&display=swap');\n\n  .third-modal a {\n    text-decoration: none;\n  }\n  \n  .third-modal .close {\n    position: absolute;\n    top: 26px;\n    right: 26px;\n    z-index: 1;\n  }\n  \n  .third-modal button {\n    background: transparent;\n    border: none;\n    cursor: pointer;\n  }\n\n.third-modal {\n  position: fixed;\n  inset: 0;\n  background: rgba(0, 0, 0, 0.4);\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 15px;\n}\n\n.third-modal__window {\n  min-height: 304px;\n  background: url(${t}),\n    linear-gradient(145.57deg, #ee8c7d 14.55%, #e75d8b 79.67%);\n  width: min(650px, 100%);\n  border-radius: 16px;\n  display: grid;\n  gap: 20px;\n  place-items: center;\n  place-content: center;\n  position: relative;\n}\n\n.third-modal__title {\n  font-family: "Playfair Display", serif;\n  font-size: 22px;\n  font-weight: 600;\n  color: #fff;\n}\n\n.third-modal__txt {\n    color: #fff;\n    font-family: "Raleway", sans-serif;\n    width: min(402px, 100%);\n    margin-bottom: 4px;\n    text-align: center;\n    line-height: 170%;\n    text-wrap: balance;\n}\n\n.third-modal__btn {\n    width: 140px;\n    padding: 10px;\n    text-align: center;\n    font-family: "Raleway", sans-serif;\n    color: #fff;\n    background: #6F41A8;\n    border-radius: 4px;\n    text-transform: unset;\n    cursor: pointer;\n}\n\n.third-modal__btn:hover {\n    color: #fff;\n}\n`;
                function n(A, n) {
                    let t = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : "";
                    e.a.sendMessage({
                        action: "track",
                        t: "event",
                        tid: "G-94HR5L4844",
                        ec: A,
                        ea: n,
                        el: t
                    });
                }
                const i = document.createElement("style");
                i.id = "style-modal", i.innerHTML = o, document.body.append(i), setTimeout(() => {
                    document.body.append(A), n("toolbar_survey", "show", "toolbar_survey_show");
                }, 1e4), A.querySelector(".third-modal__btn").addEventListener("click", () => {
                    window.open("https://forms.gle/EQwCGiyRpkaQx3qGA"), n("toolbar_survey", "click", "toolbar_survey_click");
                }), A.querySelector(".close").addEventListener("click", () => {
                    A.remove(), n("toolbar_survey", "close", "toolbar_survey_close");
                });
            }
        }();
    }
});