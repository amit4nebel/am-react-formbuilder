"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

(function () {
  function l() {
    function n(a) {
      return a ? "object" === (typeof a === "undefined" ? "undefined" : _typeof(a)) || "function" === typeof a : !1;
    }var p = null;var g = function g(a, b) {
      function f() {}if (!n(a) || !n(b)) throw new TypeError("Cannot create proxy with a non-object as target or handler");p = function p() {
        f = function f(a) {
          throw new TypeError("Cannot perform '" + a + "' on a proxy that has been revoked");
        };
      };var e = b;b = { get: null, set: null, apply: null, construct: null };for (var k in e) {
        if (!(k in b)) throw new TypeError("Proxy polyfill does not support trap '" + k + "'");b[k] = e[k];
      }"function" === typeof e && (b.apply = e.apply.bind(e));var _c = this,
          g = !1,
          q = !1;"function" === typeof a ? (_c = function c() {
        var h = this && this.constructor === _c,
            d = Array.prototype.slice.call(arguments);f(h ? "construct" : "apply");return h && b.construct ? b.construct.call(this, a, d) : !h && b.apply ? b.apply(a, this, d) : h ? (d.unshift(a), new (a.bind.apply(a, d))()) : a.apply(this, d);
      }, g = !0) : a instanceof Array && (_c = [], q = !0);var r = b.get ? function (a) {
        f("get");return b.get(this, a, _c);
      } : function (a) {
        f("get");return this[a];
      },
          v = b.set ? function (a, d) {
        f("set");b.set(this, a, d, _c);
      } : function (a, b) {
        f("set");this[a] = b;
      },
          t = {};Object.getOwnPropertyNames(a).forEach(function (b) {
        if (!((g || q) && b in _c)) {
          var d = { enumerable: !!Object.getOwnPropertyDescriptor(a, b).enumerable, get: r.bind(a, b), set: v.bind(a, b) };Object.defineProperty(_c, b, d);t[b] = !0;
        }
      });e = !0;Object.setPrototypeOf ? Object.setPrototypeOf(_c, Object.getPrototypeOf(a)) : _c.__proto__ ? _c.__proto__ = a.__proto__ : e = !1;if (b.get || !e) for (var m in a) {
        t[m] || Object.defineProperty(_c, m, { get: r.bind(a, m) });
      }Object.seal(a);Object.seal(_c);return _c;
    };g.revocable = function (a, b) {
      return { proxy: new g(a, b), revoke: p };
    };return g;
  };var u = "undefined" !== typeof process && "[object process]" === {}.toString.call(process) || "undefined" !== typeof navigator && "ReactNative" === navigator.product ? global : self;u.Proxy || (u.Proxy = l(), u.Proxy.revocable = u.Proxy.revocable);
})();