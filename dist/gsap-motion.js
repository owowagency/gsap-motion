import { fromEventPattern as Gn, fromEvent as ln, noop as as, debounceTime as po, Observable as li, BehaviorSubject as cs, skip as ls, map as fi } from "rxjs";
import { gsap as M } from "gsap";
const Tn = 1.70158, xn = 0.7, da = {
  /**
   * Easing function that starts slow, accelerates and then slows down.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inSine: (e) => -1 * Math.cos(e * (Math.PI / 2)) + 1,
  /**
   * Easing function that starts fast, decelerates and then speeds up.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outSine: (e) => Math.sin(e * (Math.PI / 2)),
  /**
   * Easing function that combines inSine and outSine, creating a slow start and end with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutSine: (e) => -0.5 * (Math.cos(Math.PI * e) - 1),
  /**
   * Easing function that accelerates from zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inQuad: (e) => e * e,
  /**
   * Easing function that decelerates to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outQuad: (e) => e * (2 - e),
  /**
   * Easing function that combines inQuad and outQuad, creating an acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutQuad: (e) => e < 0.5 ? 2 * e * e : -1 + (4 - 2 * e) * e,
  /**
   * Easing function that accelerates from zero velocity faster than inQuad.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inCubic: (e) => e * e * e,
  /**
   * Easing function that decelerates to zero velocity faster than outQuad.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outCubic: (e) => --e * e * e + 1,
  /**
   * Easing function that combines inCubic and outCubic, creating a faster acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutCubic: (e) => e < 0.5 ? 4 * e * e * e : (e - 1) * (2 * e - 2) * (2 * e - 2) + 1,
  /**
   * Easing function that accelerates from zero velocity even faster than inCubic.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inQuart: (e) => e * e * e * e,
  /**
   * Easing function that decelerates to zero velocity even faster than outCubic.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outQuart: (e) => 1 - --e * e * e * e,
  /**
   * Easing function that combines inQuart and outQuart, creating an even faster acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutQuart: (e) => e < 0.5 ? 8 * e * e * e * e : 1 - 8 * --e * e * e * e,
  /**
   * Easing function that accelerates from zero velocity at the fastest rate.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inQuint: (e) => e * e * e * e * e,
  /**
   * Easing function that decelerates to zero velocity at the fastest rate.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outQuint: (e) => 1 + --e * e * e * e * e,
  /**
   * Easing function that combines inQuint and outQuint, creating the fastest acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutQuint: (e) => e < 0.5 ? 16 * e * e * e * e * e : 1 + 16 * --e * e * e * e * e,
  /**
   * Easing function that starts slow, accelerates rapidly and then slows down to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inExpo: (e) => e === 0 ? 0 : 2 ** (10 * (e - 1)),
  /**
   * Easing function that starts fast, decelerates rapidly and then speeds up to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outExpo: (e) => e === 1 ? 1 : -(2 ** (-10 * e)) + 1,
  /**
   * Easing function that combines inExpo and outExpo, creating a rapid acceleration and deceleration with a slow start and end.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutExpo: (e) => e === 0 || e === 1 ? e : e * 2 < 1 ? 0.5 * 2 ** (10 * (e * 2 - 1)) : 0.5 * (-(2 ** (-10 * (e * 2 - 1))) + 2),
  /**
   * Easing function that starts slow, accelerates and then decelerates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inCirc: (e) => -1 * (Math.sqrt(1 - e / 1 * e) - 1),
  /**
   * Easing function that starts fast, decelerates and then accelerates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outCirc: (e) => Math.sqrt(1 - (e - 1) ** 2),
  /**
   * Easing function that combines inCirc and outCirc, creating an acceleration and deceleration with a fast start and end.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutCirc: (e) => e * 2 < 1 ? -0.5 * (Math.sqrt(1 - (e * 2) ** 2) - 1) : 0.5 * (Math.sqrt(1 - (e * 2 - 2) ** 2) + 1),
  /**
   * Easing function that starts slow, accelerates beyond the destination and then settles back to the destination.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inBack: (e, t = Tn) => e * e * ((t + 1) * e - t),
  /**
   * Easing function that starts fast, decelerates beyond the destination and then settles back to the destination.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  outBack: (e, t = Tn) => {
    const r = e / 1 - 1;
    return r * r * ((t + 1) * r + t) + 1;
  },
  /**
   * Easing function that combines inBack and outBack, creating a start and end beyond the destination with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inOutBack: (e, t = Tn) => {
    const r = e * 2, n = r - 2, i = t * 1.525;
    return r < 1 ? 0.5 * r * r * ((i + 1) * r - i) : 0.5 * (n * n * ((i + 1) * n + i) + 2);
  },
  /**
   * Easing function that starts slow, accelerates, overshoots the destination and then oscillates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inElastic: (e, t = xn) => {
    if (e === 0 || e === 1)
      return e;
    const n = e / 1 - 1, i = 1 - t, o = i / (2 * Math.PI) * Math.asin(1);
    return -(2 ** (10 * n) * Math.sin((n - o) * (2 * Math.PI) / i));
  },
  /**
   * Easing function that starts fast, decelerates, overshoots the destination and then oscillates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  outElastic: (e, t = xn) => {
    if (e === 0 || e === 1)
      return e;
    const r = 1 - t, n = e * 2, i = r / (2 * Math.PI) * Math.asin(1);
    return 2 ** (-10 * n) * Math.sin((n - i) * (2 * Math.PI) / r) + 1;
  },
  /**
   * Easing function that combines inElastic and outElastic, creating an overshoot at both the start and end with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inOutElastic: (e, t = xn) => {
    if (e === 0 || e === 1)
      return e;
    const r = 1 - t, n = e * 2, i = n - 1, o = r / (2 * Math.PI) * Math.asin(1);
    return n < 1 ? -0.5 * (2 ** (10 * i) * Math.sin((i - o) * (2 * Math.PI) / r)) : 2 ** (-10 * i) * Math.sin((i - o) * (2 * Math.PI) / r) * 0.5 + 1;
  }
};
function L() {
  let e = arguments[0];
  for (let t = 1, r = arguments.length; t < r; t++)
    e = arguments[t](e);
  return e;
}
function Y() {
  let e = arguments;
  return function() {
    let t = e[0].apply(null, arguments);
    for (let r = 1, n = e.length; r < n; r++)
      t = e[r](t);
    return t;
  };
}
function fs(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function ds(e) {
  if (!(e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0))
    return e;
  var t = e.BS_PRIVATE_NESTED_SOME_NONE;
  if (t !== 0)
    return {
      BS_PRIVATE_NESTED_SOME_NONE: t - 1 | 0
    };
}
function gs(e) {
  return e;
}
function di(e, t, r, n) {
  return t(e) ? r(e) : n(e);
}
function hn() {
  if (arguments.length === 3) {
    const e = arguments;
    return function(r) {
      return di(r, e[0], e[1], e[2]);
    };
  }
  return di(arguments[0], arguments[1], arguments[2], arguments[3]);
}
function Cr(e) {
}
function gi(e, t, r) {
  return t(e) ? r(e) : e;
}
function ho() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return gi(r, e[0], e[1]);
    };
  }
  return gi(arguments[0], arguments[1], arguments[2]);
}
function pi(e, t) {
  return t(e), e;
}
function jn() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return pi(r, e[0]);
    };
  }
  return pi(arguments[0], arguments[1]);
}
function ft(e) {
  var t = {
    contents: void 0
  };
  return function(...r) {
    var n = t.contents;
    if (n !== void 0)
      return ds(n);
    var i = e(...r);
    return t.contents = fs(i), i;
  };
}
function mn(e) {
  return e;
}
function ps(e, t) {
  if (e <= 0)
    return [];
  for (var r = new Array(e), n = 0; n < e; ++n)
    r[n] = t;
  return r;
}
function Qn(e, t) {
  for (var r = 0, n = e.length; r < n; ++r)
    t(e[r]);
}
function hs(e, t) {
  for (var r = e.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = t(e[i]);
  return n;
}
function ms(e, t, r) {
  for (var n = t, i = 0, o = e.length; i < o; ++i)
    n = r(n, e[i]);
  return n;
}
function _s(e, t) {
  for (var r = e.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !0;
    if (!t(e[i]))
      return !1;
    n = i + 1 | 0;
  }
}
function vs(e, t) {
  for (var r = e.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !1;
    if (t(e[i]))
      return !0;
    n = i + 1 | 0;
  }
}
var hi = ps;
function mo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return hi(r, e[0]);
    };
  }
  return hi(arguments[0], arguments[1]);
}
function bs(e) {
  return e.length !== 0;
}
function mi(e, t) {
  return hs(e, t);
}
function Qe() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return mi(r, e[0]);
    };
  }
  return mi(arguments[0], arguments[1]);
}
function _i(e, t) {
  for (var r = 0, n = []; r < e.length; ) {
    var i = e[r];
    t(i) && n.push(i), r = r + 1 | 0;
  }
  return n;
}
function Lr() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return _i(r, e[0]);
    };
  }
  return _i(arguments[0], arguments[1]);
}
var vi = vs;
function ws() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return vi(r, e[0]);
    };
  }
  return vi(arguments[0], arguments[1]);
}
var bi = Qn;
function Ft() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return bi(r, e[0]);
    };
  }
  return bi(arguments[0], arguments[1]);
}
function In(e) {
  return ms(e, [], function(t, r) {
    return Array.isArray(r) ? Qn(r, function(n) {
      t.push(n);
    }) : t.push(r), t;
  });
}
function wi(e, t) {
  return Qn(e, t), e;
}
function _o() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return wi(r, e[0]);
    };
  }
  return wi(arguments[0], arguments[1]);
}
function yi(e, t) {
  return _s(e, t);
}
function Kn() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return yi(r, e[0]);
    };
  }
  return yi(arguments[0], arguments[1]);
}
function Ei(e, t, r) {
  for (var n = new Array(r), i = 0, o = t; i < r; )
    n[i] = e[o], i = i + 1 | 0, o = o + 1 | 0;
  return n;
}
function vo(e, t) {
  for (; ; ) {
    var r = t, n = e, i = n.length, o = i === 0 ? 1 : i, u = r.length, s = o - u | 0;
    if (s === 0)
      return n.apply(null, r);
    if (s >= 0)
      return function(f, m) {
        return function(g) {
          return vo(f, m.concat([g]));
        };
      }(n, r);
    t = Ei(r, o, -s | 0), e = n.apply(null, Ei(r, 0, o));
  }
}
function ys(e, t) {
  var r = e.length;
  if (r === 1)
    return e(t);
  switch (r) {
    case 1:
      return e(t);
    case 2:
      return function(n) {
        return e(t, n);
      };
    case 3:
      return function(n, i) {
        return e(t, n, i);
      };
    case 4:
      return function(n, i, o) {
        return e(t, n, i, o);
      };
    case 5:
      return function(n, i, o, u) {
        return e(t, n, i, o, u);
      };
    case 6:
      return function(n, i, o, u, s) {
        return e(t, n, i, o, u, s);
      };
    case 7:
      return function(n, i, o, u, s, f) {
        return e(t, n, i, o, u, s, f);
      };
    default:
      return vo(e, [t]);
  }
}
function Es(e) {
  var t = e.length;
  return t === 1 ? e : function(r) {
    return ys(e, r);
  };
}
function Ss(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function Ts(e, t) {
  return e.TAG === 0 ? {
    TAG: 0,
    _0: t(e._0)
  } : {
    TAG: 1,
    _0: e._0
  };
}
function bo(e, t) {
  return e.TAG === 0 ? t(e._0) : {
    TAG: 1,
    _0: e._0
  };
}
function xs(e, t) {
  return bo(e, Es(t));
}
function Ms(e, t) {
  return e.TAG === 0 ? e._0 : t;
}
function Si(e, t) {
  return e == null ? {
    TAG: 1,
    _0: t
  } : {
    TAG: 0,
    _0: e
  };
}
function _n() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Si(r, e[0]);
    };
  }
  return Si(arguments[0], arguments[1]);
}
function Ti(e, t, r) {
  return xs(_n(e, r), function(n) {
    return t(n) ? {
      TAG: 0,
      _0: n
    } : {
      TAG: 1,
      _0: r
    };
  });
}
function fr() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return Ti(r, e[0], e[1]);
    };
  }
  return Ti(arguments[0], arguments[1], arguments[2]);
}
var xi = Ts;
function Oe() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return xi(r, e[0]);
    };
  }
  return xi(arguments[0], arguments[1]);
}
var Mi = bo;
function Os() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Mi(r, e[0]);
    };
  }
  return Mi(arguments[0], arguments[1]);
}
function zn(e) {
  return Ms(e, void 0);
}
function Cs(e) {
  if (e.TAG === 0)
    return Ss(e._0);
}
function Oi(e, t) {
  return e.TAG !== 0 || t(e._0), e;
}
function Lt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Oi(r, e[0]);
    };
  }
  return Oi(arguments[0], arguments[1]);
}
function Ci(e, t) {
  return e.TAG === 0 || t(e._0), e;
}
function St() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ci(r, e[0]);
    };
  }
  return Ci(arguments[0], arguments[1]);
}
var wo = (e) => ({
  TAG: 0,
  _0: e
});
function yo(e) {
  return typeof e == "string";
}
function ki(e) {
  return typeof e == "function";
}
function Br(e) {
  return e != null;
}
function Zn(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function ks(e) {
  if (e != null)
    return Zn(e);
}
function Kt(e) {
  if (!(e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0))
    return e;
  var t = e.BS_PRIVATE_NESTED_SOME_NONE;
  if (t !== 0)
    return {
      BS_PRIVATE_NESTED_SOME_NONE: t - 1 | 0
    };
}
function Ps(e, t) {
  if (e !== void 0)
    return Zn(t(Kt(e)));
}
function Rs(e, t) {
  if (e !== void 0)
    return t(Kt(e));
}
function Ds(e, t) {
  return e !== void 0 ? Kt(e) : t;
}
function Mt(e) {
  if (e != null)
    return Zn(e);
}
var Pi = Ps;
function Eo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Pi(r, e[0]);
    };
  }
  return Pi(arguments[0], arguments[1]);
}
var Ri = Rs;
function So() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ri(r, e[0]);
    };
  }
  return Ri(arguments[0], arguments[1]);
}
function Di(e, t) {
  if (e !== void 0)
    return ks(t(Kt(e)));
}
function As() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Di(r, e[0]);
    };
  }
  return Di(arguments[0], arguments[1]);
}
function To(e) {
  return Ds(e, void 0);
}
function Ai(e, t) {
  return e !== void 0 && t(Kt(e)), e;
}
function Jn() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ai(r, e[0]);
    };
  }
  return Ai(arguments[0], arguments[1]);
}
function Ni(e, t) {
  if (e !== void 0 && t !== void 0)
    return [
      Kt(e),
      Kt(t)
    ];
}
function Ns() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ni(r, e[0]);
    };
  }
  return Ni(arguments[0], arguments[1]);
}
var Is = (e) => e, zs = void 0, Ls = function(e, t) {
  delete e[t];
};
function ei(e) {
  for (var t = {}, r = e.length, n = 0; n < r; ++n) {
    var i = e[n];
    t[i[0]] = i[1];
  }
  return t;
}
function Bs(e, t) {
  for (var r = e.length, n = t.length, i = new Array(r + n | 0), o = 0; o < r; ++o)
    i[o] = e[o];
  for (var u = 0; u < n; ++u)
    i[r + u | 0] = t[u];
  return i;
}
function Fs(e, t) {
  for (var r = 0, n = e.length; r < n; ++r)
    t(e[r]);
}
function xo(e, t) {
  for (var r = e.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = t(e[i]);
  return n;
}
function Ws(e, t, r) {
  for (var n = t, i = 0, o = e.length; i < o; ++i)
    n = r(n, e[i]);
  return n;
}
function Ii(e, t) {
  return Bs(e, [t]);
}
function Vs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ii(r, e[0]);
    };
  }
  return Ii(arguments[0], arguments[1]);
}
function $s(e) {
  return Object.entries(e);
}
function zi(e, t) {
  return Object.assign({}, e, t);
}
function Ys() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return zi(r, e[0]);
    };
  }
  return zi(arguments[0], arguments[1]);
}
function Li(e, t) {
  var r = Ys({}, e);
  return Fs(t, function(n) {
    return Ls(r, n);
  }), r;
}
function Mo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Li(r, e[0]);
    };
  }
  return Li(arguments[0], arguments[1]);
}
function Bi(e, t) {
  return ei(xo(Object.keys(e), function(r) {
    var n = t(e[r]);
    return [
      r,
      n
    ];
  }));
}
function Wr() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Bi(r, e[0]);
    };
  }
  return Bi(arguments[0], arguments[1]);
}
function Fi(e, t) {
  return ei(xo(Object.keys(e), function(r) {
    var n = t(r, e[r]);
    return [
      r,
      n
    ];
  }));
}
function Wi() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Fi(r, e[0]);
    };
  }
  return Fi(arguments[0], arguments[1]);
}
function Vi(e, t) {
  return ei(Ws(Object.keys(e), [], function(r, n) {
    var i = e[n];
    return t(n, i) ? Vs(r, [
      n,
      i
    ]) : r;
  }));
}
function Xs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Vi(r, e[0]);
    };
  }
  return Vi(arguments[0], arguments[1]);
}
function $i(e, t) {
  return Xs(e, function(r, n) {
    return t.includes(r);
  });
}
function Oo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return $i(r, e[0]);
    };
  }
  return $i(arguments[0], arguments[1]);
}
function Yi(e, t, r) {
  return e ? t(void 0) : r(void 0);
}
function vn() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return Yi(r, e[0], e[1]);
    };
  }
  return Yi(arguments[0], arguments[1], arguments[2]);
}
function Q(e, ...t) {
  return !ws(
    ["SplitText"],
    (n) => ki(e) && e.name === n
  ) && ki(e) ? e.call(null, t) : e;
}
function Hs(e) {
  return () => e;
}
function bn() {
  return ft(() => globalThis);
}
function qs() {
  const e = bn();
  return ft(() => e().document.documentElement);
}
function Us() {
  const e = bn();
  return ft(() => e().screen);
}
function Gs(e) {
  return new Map(e);
}
function Co(e) {
  return ft(() => Gs(e == null ? void 0 : e()));
}
function Xi(e) {
  return (t) => e.get(t);
}
function Hi(e) {
  return (t, r) => e.set(t, r);
}
const js = () => {
};
function ko(e) {
  let t = e;
  return Object.freeze({
    getValue: () => t,
    setValue: (r) => t = r
  });
}
function Vr() {
  return (e) => console.error(String(e));
}
function at(e, ...t) {
  return jn(
    Cr
  );
}
function Mn(e, ...t) {
}
function Po() {
  const e = bn(), t = ko(!0), r = M.ticker.add(() => void t.setValue(!0)), n = (i) => (o) => L(
    t.getValue(),
    at,
    ho(Boolean, () => {
      t.setValue(!1), i(o);
    })
  );
  return ft(
    () => Gn(
      (i) => {
        e().addEventListener("resize", n(i), { passive: !0 });
      },
      (i) => {
        M.ticker.remove(r), e().removeEventListener("resize", n(i));
      }
    )
  );
}
function Qs() {
  return ft(() => ln(globalThis, "mousemove", { passive: !0 }));
}
function Ks() {
  return ft((e) => {
    const t = /* @__PURE__ */ new Set(), r = new ResizeObserver(() => t.forEach((i) => i()));
    return Gn(
      (i) => (Ft(e, r.observe.bind(r)), t.add(i), r),
      (i) => {
        Ft(e, r.unobserve.bind(r)), t.delete(i);
      }
    );
  });
}
function Zs(e) {
  return Gn(
    (t) => {
      e.addEventListener("change", t, { passive: !0 });
    },
    (t) => {
      e.removeEventListener("change", t);
    }
  );
}
function Ro(e) {
  return L(
    Mt(e),
    As(
      Y(
        yo,
        vn(
          Do(e),
          Hs(e)
        )
      )
    ),
    To
  );
}
function Do(e) {
  return (t = document) => t == null ? void 0 : t.querySelector(e);
}
function Js(e) {
  return (t = document) => Array.from(t.querySelectorAll(e));
}
function ti(e, t) {
  return () => document.createElement(e, t);
}
function eu(e) {
  return (...t) => (e.append(...t), e);
}
function Ao(e) {
  return (...t) => {
    e.replaceWith(...t);
  };
}
function tu() {
  return () => document.createDocumentFragment();
}
function wn(e) {
  return L(
    mo(1, Q(e)),
    In,
    Qe(
      (t) => L(
        t,
        yo,
        vn(Js(t), () => [Ro(t)])
      )
    ),
    In,
    Lr(Br)
  );
}
function ru(e, t) {
  return L(
    Mt(e.getAttribute(t)),
    Eo(parseFloat),
    So((r) => isNaN(r) ? zs : Is(r)),
    To
  );
}
var Yr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var iu = "Expected a function", qi = 0 / 0, ou = "[object Symbol]", su = /^\s+|\s+$/g, uu = /^[-+]0x[0-9a-f]+$/i, au = /^0b[01]+$/i, cu = /^0o[0-7]+$/i, lu = parseInt, fu = typeof Yr == "object" && Yr && Yr.Object === Object && Yr, du = typeof self == "object" && self && self.Object === Object && self, gu = fu || du || Function("return this")(), pu = Object.prototype, hu = pu.toString, mu = Math.max, _u = Math.min, On = function() {
  return gu.Date.now();
};
function vu(e, t, r) {
  var n, i, o, u, s, f, m = 0, g = !1, h = !1, d = !0;
  if (typeof e != "function")
    throw new TypeError(iu);
  t = Ui(t) || 0, Ln(r) && (g = !!r.leading, h = "maxWait" in r, o = h ? mu(Ui(r.maxWait) || 0, t) : o, d = "trailing" in r ? !!r.trailing : d);
  function c(w) {
    var b = n, q = i;
    return n = i = void 0, m = w, u = e.apply(q, b), u;
  }
  function _(w) {
    return m = w, s = setTimeout(R, t), g ? c(w) : u;
  }
  function B(w) {
    var b = w - f, q = w - m, de = t - b;
    return h ? _u(de, o - q) : de;
  }
  function $(w) {
    var b = w - f, q = w - m;
    return f === void 0 || b >= t || b < 0 || h && q >= o;
  }
  function R() {
    var w = On();
    if ($(w))
      return K(w);
    s = setTimeout(R, B(w));
  }
  function K(w) {
    return s = void 0, d && n ? c(w) : (n = i = void 0, u);
  }
  function F() {
    s !== void 0 && clearTimeout(s), m = 0, n = f = i = s = void 0;
  }
  function O() {
    return s === void 0 ? u : K(On());
  }
  function W() {
    var w = On(), b = $(w);
    if (n = arguments, i = this, f = w, b) {
      if (s === void 0)
        return _(f);
      if (h)
        return s = setTimeout(R, t), c(f);
    }
    return s === void 0 && (s = setTimeout(R, t)), u;
  }
  return W.cancel = F, W.flush = O, W;
}
function Ln(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function bu(e) {
  return !!e && typeof e == "object";
}
function wu(e) {
  return typeof e == "symbol" || bu(e) && hu.call(e) == ou;
}
function Ui(e) {
  if (typeof e == "number")
    return e;
  if (wu(e))
    return qi;
  if (Ln(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Ln(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(su, "");
  var r = au.test(e);
  return r || cu.test(e) ? lu(e.slice(2), r ? 2 : 8) : uu.test(e) ? qi : +e;
}
var yu = vu;
const Eu = /* @__PURE__ */ nu(yu), No = class {
  constructor(e, t = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = Eu(
      () => {
        var r;
        (r = this.cleanup) == null || r.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      No.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var r, n;
      (r = this.cleanup) == null || r.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const i of Object.keys(this.meta))
        delete this.meta[i];
      for (; this.subscriptions.length; )
        (n = this.subscriptions.pop()) == null || n.unsubscribe();
    }, this.observeMedia(Q(t.watchMedia)), this.observeResize(Q(t.shouldResetOnResize)), this.create = () => {
      var i;
      return this.context = M.context(as), [
        Q(t.enable) ?? !0,
        ((i = this.mediaQueryList) == null ? void 0 : i.matches) ?? !0
      ].every(Boolean) ? e(this, this.context) : void 0;
    }, this.createAndSetCleanup();
  }
  /**
   * Time between frames in milliseconds based on `Motion.referenceFrameRate`.
   */
  static get referenceFrameTime() {
    return 1e3 / this.referenceFramerate;
  }
  /**
   * Multiplies a given `value` by the current gsap ticker's delta ratio,
   * so the rate of change will always be consistent even if the frame rate fluctuates.
   *
   * Implements `gsap.ticker.deltaRatio()`
   *
   * @param value Value to multiply by delta ratio.
   * @example
   * // move `myObject` by 3 points on every tick.
   * myObject.x += Motion.applyDeltaRatio(3);
   */
  static applyDeltaRatio(e) {
    return e * M.ticker.deltaRatio(this.referenceFramerate);
  }
  createAndSetCleanup() {
    var t;
    const e = (t = this.create) == null ? void 0 : t.call(this, this, this.context);
    e instanceof Promise ? e.then((r) => this.cleanup = r ?? void 0) : this.cleanup = e ?? void 0;
  }
  observeMedia(e) {
    e && (this.mediaQueryList = matchMedia(e), this.subscriptions.push(
      ln(this.mediaQueryList, "change").subscribe(() => this.reset())
    ));
  }
  observeResize(e) {
    e && (this.motionResizeObserver = new Su(e), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(po(100)).subscribe(() => this.reset())
    ));
  }
};
let $r = No;
$r.resetDebounceTime = 100;
$r.referenceFramerate = 60;
class Su {
  constructor(t) {
    const [r, n] = [t].flat();
    this.target = typeof r == "string" ? document.querySelector(r) : r, this.axis = n, this.target === window ? this.observable = new li((i) => {
      const o = () => this.handleWindowResize(i);
      return window.addEventListener("resize", o, { passive: !0 }), () => window.removeEventListener("resize", o);
    }) : this.observable = new li((i) => {
      const o = new ResizeObserver(
        (u) => this.handleElementResize(u, i)
      );
      return this.target && o.observe(this.target), () => o.disconnect();
    });
  }
  handleWindowResize(t) {
    this.emit(t, window.innerWidth, window.innerHeight);
  }
  handleElementResize(t, r) {
    const n = t.find((u) => u.target === this.target);
    if (!n)
      return;
    const { inlineSize: i, blockSize: o } = n.borderBoxSize[0];
    this.emit(r, i, o);
  }
  emit(t, r, n) {
    const i = r !== this.inlineSize, o = n !== this.blockSize, u = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = r, this.blockSize = n, !u) {
      if (this.axis === "horizontal" && i || this.axis === "vertical" && o)
        return t.next();
      !this.axis && (i || o) && t.next();
    }
  }
}
function yn(e, t = {}) {
  const r = L(t, Q, Wr(Y(Mt, Q))), n = Ks(), i = ko(Cr), o = new cs(e);
  o.subscribe(() => {
    var d;
    i.getValue()(!1), i.setValue(
      L(
        [r.enable ?? !0, ((d = r.mediaQueryList) == null ? void 0 : d.matches) ?? !0],
        at(),
        Kn(Boolean),
        at(),
        hn(
          (c) => c ?? !0,
          () => e() ?? Cr,
          () => Cr
        )
      )
    );
  });
  const u = (d) => (c) => L(
    c.pipe(ls((d == null ? void 0 : d.skip) ?? 0), po((d == null ? void 0 : d.debounce) ?? 300)).subscribe(
      Y(
        at(`run effect from subscription: ${d == null ? void 0 : d.name}`),
        () => o.next(e)
      )
    ),
    at()
  ), s = L(
    mo(1, r.observeElementResize),
    In,
    Qe(Ro),
    Lr(Br),
    _o(
      xu("Observing the <body> for resizes may cause chain reactions.")
    )
  ), f = L(
    s,
    fr(bs, "No elements to observe."),
    Oe(n),
    Oe(
      Y(
        u({
          debounce: r.debounceTime,
          skip: 1,
          name: "element resize"
        }),
        at()
      )
    ),
    St(Mn)
  ), m = L(
    r.observeWindowResize,
    fr(Boolean, "Window resize observing disabled."),
    Oe(Tu),
    Oe(
      Y(
        u({ debounce: r.debounceTime, name: "window resize" }),
        at()
      )
    ),
    St(Mn)
  ), g = L(
    r.mediaQueryList,
    fr((d) => !!d, "Media query observing disabled."),
    Oe(Zs),
    Oe(
      Y(
        u({ debounce: r.debounceTime, name: "media query change" }),
        at()
      )
    ),
    St(Mn)
  );
  function h() {
    Lt(f, (d) => d.unsubscribe()), Lt(m, (d) => d.unsubscribe()), Lt(g, (d) => d.unsubscribe()), i.getValue()(!0);
  }
  return h;
}
const Tu = Po();
function xu(e) {
  return (t) => L(
    vn(t.tagName === "BODY", () => `Warning: ${e}`, js),
    Mt,
    Jn(Vr())
  );
}
function Tt(e, t) {
  return { x: e, y: t };
}
function tn(e, t) {
  return {
    ...e,
    nx: e.x / t.x,
    ny: e.y / t.y
  };
}
class Io extends $r {
  constructor() {
    super(
      (t) => {
        t.meta.observable = ln(window, "mousemove"), t.subscriptions.push(
          t.meta.observable.subscribe((r) => {
            this.clientX = r.clientX, this.clientY = r.clientY, this.normalX = M.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = M.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), t.subscriptions.push(
          ln(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), t.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ), this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight, this.clientX = this.viewWidth / 2, this.clientY = this.viewHeight / 2, this.normalX = 0.5, this.normalY = 0.5;
  }
  /**
   * Returns the singleton instance of the Pointer class.
   * If the instance does not exist, it is created.
   */
  static get instance() {
    return this._instance ?? (this._instance = new Io());
  }
  /**
   * Returns the observable for mouse events.
   */
  get observable() {
    return this.meta.observable;
  }
}
const Mu = ft(() => {
  const e = L(Gi(), Xi), t = L(Gi(), Hi), r = L(ji(), Xi), n = L(ji(), Hi), i = Ou().pipe(fi(ri));
  return Cu().pipe(fi(ku)).subscribe(
    Y(
      Wi(
        (u, s) => L(
          r(u),
          Mt,
          Eo((f) => tn(s, f)),
          Jn((f) => t(u, f))
        )
      )
    )
  ), i.subscribe(Y(Wi(n))), {
    get client() {
      return e("client");
    },
    get page() {
      return e("page");
    },
    get screen() {
      return e("screen");
    }
  };
}), ga = Mu, Ou = Po(), Cu = Qs(), Gi = Co(
  Y(ri, (e) => [
    ["client", tn(Tt(0, 0), e.client)],
    ["page", tn(Tt(0, 0), e.page)],
    ["screen", tn(Tt(0, 0), e.screen)]
  ])
), ji = Co(Y(ri, $s));
function ku(e) {
  return {
    client: Tt(e.clientX, e.clientY),
    page: Tt(e.pageX, e.pageY),
    screen: Tt(e.screenX, e.screenY)
  };
}
function ri() {
  const e = qs(), t = bn(), r = Us();
  return {
    client: Tt(t().innerWidth, t().innerHeight),
    page: Tt(e().scrollWidth, e().scrollHeight),
    screen: Tt(r().width, r().height)
  };
}
class pa {
  // Constant derived from response, damping and speed, used in calculations
  constructor(t = 1, r = 1, n = 0, i = 0) {
    this.k1 = r / (Math.PI * t), this.k2 = 1 / (2 * Math.PI * t * (2 * Math.PI * t)), this.k3 = n * r / (2 * Math.PI * t), this.xp = i, this.y = i, this.yd = 0;
  }
  /**
   * Calculates and applies the next position of the object based on the provided step and value.
   * @param step The step size used to calculate the next position. Typically, this is the delta time.
   * @param x The next value or target of the motion
   * @param xd Optional parameter to provide the velocity
   * @returns The updated position of the object
   */
  update(t, r, n) {
    n === void 0 && (n = (r - this.xp) / t, this.xp = r);
    const i = Math.max(
      this.k2,
      t * t / 2 + t * this.k1 / 2,
      t * this.k1
    );
    return this.y = this.y + t * this.yd, this.yd = this.yd + t * (r + this.k3 * n - this.y - this.k1 * this.yd) / i, this.y;
  }
}
function Pu(e = 1, t = 1, r = 0, n = 0) {
  const i = t / (Math.PI * e), o = 1 / (2 * Math.PI * e * (2 * Math.PI * e)), u = r * t / (2 * Math.PI * e);
  let s = n, f = n, m = 0;
  function g(h, d) {
    const c = (d - s) / h, _ = Math.max(o, h * h / 2 + h * i / 2, h * i);
    return s = d, f = f + h * m, m = m + h * (d + u * c - f - i * m) / _, f;
  }
  return Object.freeze({ update: g });
}
const ha = Pu;
function Qi(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Ru(e, t, r) {
  return t && Qi(e.prototype, t), r && Qi(e, r), e;
}
/*!
 * Observer 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var Se, Bn, je, Nt, It, dr, zo, qt, kr, Lo, Et, st, Bo, Fo = function() {
  return Se || typeof window < "u" && (Se = window.gsap) && Se.registerPlugin && Se;
}, Wo = 1, cr = [], N = [], _t = [], Pr = Date.now, Fn = function(t, r) {
  return r;
}, Du = function() {
  var t = kr.core, r = t.bridge || {}, n = t._scrollers, i = t._proxies;
  n.push.apply(n, N), i.push.apply(i, _t), N = n, _t = i, Fn = function(u, s) {
    return r[u](s);
  };
}, Bt = function(t, r) {
  return ~_t.indexOf(t) && _t[_t.indexOf(t) + 1][r];
}, Rr = function(t) {
  return !!~Lo.indexOf(t);
}, We = function(t, r, n, i, o) {
  return t.addEventListener(r, n, {
    passive: !i,
    capture: !!o
  });
}, Ie = function(t, r, n, i) {
  return t.removeEventListener(r, n, !!i);
}, Xr = "scrollLeft", Hr = "scrollTop", Wn = function() {
  return Et && Et.isPressed || N.cache++;
}, fn = function(t, r) {
  var n = function i(o) {
    if (o || o === 0) {
      Wo && (je.history.scrollRestoration = "manual");
      var u = Et && Et.isPressed;
      o = i.v = Math.round(o) || (Et && Et.iOS ? 1 : 0), t(o), i.cacheID = N.cache, u && Fn("ss", o);
    } else
      (r || N.cache !== i.cacheID || Fn("ref")) && (i.cacheID = N.cache, i.v = t());
    return i.v + i.offset;
  };
  return n.offset = 0, t && n;
}, Be = {
  s: Xr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: fn(function(e) {
    return arguments.length ? je.scrollTo(e, fe.sc()) : je.pageXOffset || Nt[Xr] || It[Xr] || dr[Xr] || 0;
  })
}, fe = {
  s: Hr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Be,
  sc: fn(function(e) {
    return arguments.length ? je.scrollTo(Be.sc(), e) : je.pageYOffset || Nt[Hr] || It[Hr] || dr[Hr] || 0;
  })
}, Ve = function(t) {
  return Se.utils.toArray(t)[0] || (typeof t == "string" && Se.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, Wt = function(t, r) {
  var n = r.s, i = r.sc;
  Rr(t) && (t = Nt.scrollingElement || It);
  var o = N.indexOf(t), u = i === fe.sc ? 1 : 2;
  !~o && (o = N.push(t) - 1), N[o + u] || t.addEventListener("scroll", Wn);
  var s = N[o + u], f = s || (N[o + u] = fn(Bt(t, n), !0) || (Rr(t) ? i : fn(function(m) {
    return arguments.length ? t[n] = m : t[n];
  })));
  return f.target = t, s || (f.smooth = Se.getProperty(t, "scrollBehavior") === "smooth"), f;
}, Vn = function(t, r, n) {
  var i = t, o = t, u = Pr(), s = u, f = r || 50, m = Math.max(500, f * 3), g = function(_, B) {
    var $ = Pr();
    B || $ - u > f ? (o = i, i = _, s = u, u = $) : n ? i += _ : i = o + (_ - o) / ($ - s) * (u - s);
  }, h = function() {
    o = i = n ? 0 : i, s = u = 0;
  }, d = function(_) {
    var B = s, $ = o, R = Pr();
    return (_ || _ === 0) && _ !== i && g(_), u === s || R - s > m ? 0 : (i + (n ? $ : -$)) / ((n ? R : u) - B) * 1e3;
  };
  return {
    update: g,
    reset: h,
    getVelocity: d
  };
}, Er = function(t, r) {
  return r && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Ki = function(t) {
  var r = Math.max.apply(Math, t), n = Math.min.apply(Math, t);
  return Math.abs(r) >= Math.abs(n) ? r : n;
}, Vo = function() {
  kr = Se.core.globals().ScrollTrigger, kr && kr.core && Du();
}, $o = function(t) {
  return Se = t || Fo(), Se && typeof document < "u" && document.body && (je = window, Nt = document, It = Nt.documentElement, dr = Nt.body, Lo = [je, Nt, It, dr], Se.utils.clamp, Bo = Se.core.context || function() {
  }, qt = "onpointerenter" in dr ? "pointer" : "mouse", zo = ue.isTouch = je.matchMedia && je.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in je || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, st = ue.eventTypes = ("ontouchstart" in It ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in It ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Wo = 0;
  }, 500), Vo(), Bn = 1), Bn;
};
Be.op = fe;
N.cache = 0;
var ue = /* @__PURE__ */ function() {
  function e(r) {
    this.init(r);
  }
  var t = e.prototype;
  return t.init = function(n) {
    Bn || $o(Se) || console.warn("Please gsap.registerPlugin(Observer)"), kr || Vo();
    var i = n.tolerance, o = n.dragMinimum, u = n.type, s = n.target, f = n.lineHeight, m = n.debounce, g = n.preventDefault, h = n.onStop, d = n.onStopDelay, c = n.ignore, _ = n.wheelSpeed, B = n.event, $ = n.onDragStart, R = n.onDragEnd, K = n.onDrag, F = n.onPress, O = n.onRelease, W = n.onRight, w = n.onLeft, b = n.onUp, q = n.onDown, de = n.onChangeX, x = n.onChangeY, ae = n.onChange, T = n.onToggleX, Ke = n.onToggleY, X = n.onHover, ge = n.onHoverEnd, Ce = n.onMove, H = n.ignoreCheck, ce = n.isNormalizer, ie = n.onGestureStart, a = n.onGestureEnd, le = n.onWheel, Vt = n.onEnable, Ot = n.onDisable, Ze = n.onClick, Ct = n.scrollSpeed, U = n.capture, Te = n.allowClicks, ke = n.lockAxis, hr = n.onLockAxis;
    this.target = s = Ve(s) || It, this.vars = n, c && (c = Se.utils.toArray(c)), i = i || 1e-9, o = o || 0, _ = _ || 1, Ct = Ct || 1, u = u || "wheel,touch,pointer", m = m !== !1, f || (f = parseFloat(je.getComputedStyle(dr).lineHeight) || 22);
    var $e, Je, I, pe, Ye, dt, Pe, l = this, vt = 0, G = 0, kt = Wt(s, Be), Pt = Wt(s, fe), tr = kt(), Re = Pt(), mr = ~u.indexOf("touch") && !~u.indexOf("pointer") && st[0] === "pointerdown", Rt = Rr(s), te = s.ownerDocument || Nt, Xe = [0, 0, 0], De = [0, 0, 0], _r = 0, Ae = function() {
      return _r = Pr();
    }, gt = function(E, p) {
      return (l.event = E) && c && ~c.indexOf(E.target) || p && mr && E.pointerType !== "touch" || H && H(E, p);
    }, vr = function() {
      l._vx.reset(), l._vy.reset(), Je.pause(), h && h(l);
    }, Dt = function() {
      var E = l.deltaX = Ki(Xe), p = l.deltaY = Ki(De), y = Math.abs(E) >= i, S = Math.abs(p) >= i;
      ae && (y || S) && ae(l, E, p, Xe, De), y && (W && l.deltaX > 0 && W(l), w && l.deltaX < 0 && w(l), de && de(l), T && l.deltaX < 0 != vt < 0 && T(l), vt = l.deltaX, Xe[0] = Xe[1] = Xe[2] = 0), S && (q && l.deltaY > 0 && q(l), b && l.deltaY < 0 && b(l), x && x(l), Ke && l.deltaY < 0 != G < 0 && Ke(l), G = l.deltaY, De[0] = De[1] = De[2] = 0), (pe || I) && (Ce && Ce(l), I && (K(l), I = !1), pe = !1), dt && !(dt = !1) && hr && hr(l), Ye && (le(l), Ye = !1), $e = 0;
    }, rr = function(E, p, y) {
      Xe[y] += E, De[y] += p, l._vx.update(E), l._vy.update(p), m ? $e || ($e = requestAnimationFrame(Dt)) : Dt();
    }, $t = function(E, p) {
      ke && !Pe && (l.axis = Pe = Math.abs(E) > Math.abs(p) ? "x" : "y", dt = !0), Pe !== "y" && (Xe[2] += E, l._vx.update(E, !0)), Pe !== "x" && (De[2] += p, l._vy.update(p, !0)), m ? $e || ($e = requestAnimationFrame(Dt)) : Dt();
    }, Yt = function(E) {
      if (!gt(E, 1)) {
        E = Er(E, g);
        var p = E.clientX, y = E.clientY, S = p - l.x, P = y - l.y, he = l.isDragging;
        l.x = p, l.y = y, (he || Math.abs(l.startX - p) >= o || Math.abs(l.startY - y) >= o) && (K && (I = !0), he || (l.isDragging = !0), $t(S, P), he || $ && $(l));
      }
    }, A = l.onPress = function(C) {
      gt(C, 1) || C && C.button || (l.axis = Pe = null, Je.pause(), l.isPressed = !0, C = Er(C), vt = G = 0, l.startX = l.x = C.clientX, l.startY = l.y = C.clientY, l._vx.reset(), l._vy.reset(), We(ce ? s : te, st[1], Yt, g, !0), l.deltaX = l.deltaY = 0, F && F(l));
    }, bt = l.onRelease = function(C) {
      if (!gt(C, 1)) {
        Ie(ce ? s : te, st[1], Yt, !0);
        var E = !isNaN(l.y - l.startY), p = l.isDragging && (Math.abs(l.x - l.startX) > 3 || Math.abs(l.y - l.startY) > 3), y = Er(C);
        !p && E && (l._vx.reset(), l._vy.reset(), g && Te && Se.delayedCall(0.08, function() {
          if (Pr() - _r > 300 && !C.defaultPrevented) {
            if (C.target.click)
              C.target.click();
            else if (te.createEvent) {
              var S = te.createEvent("MouseEvents");
              S.initMouseEvent("click", !0, !0, je, 1, y.screenX, y.screenY, y.clientX, y.clientY, !1, !1, !1, !1, 0, null), C.target.dispatchEvent(S);
            }
          }
        })), l.isDragging = l.isGesturing = l.isPressed = !1, h && !ce && Je.restart(!0), R && p && R(l), O && O(l, p);
      }
    }, nt = function(E) {
      return E.touches && E.touches.length > 1 && (l.isGesturing = !0) && ie(E, l.isDragging);
    }, it = function() {
      return (l.isGesturing = !1) || a(l);
    }, et = function(E) {
      if (!gt(E)) {
        var p = kt(), y = Pt();
        rr((p - tr) * Ct, (y - Re) * Ct, 1), tr = p, Re = y, h && Je.restart(!0);
      }
    }, ot = function(E) {
      if (!gt(E)) {
        E = Er(E, g), le && (Ye = !0);
        var p = (E.deltaMode === 1 ? f : E.deltaMode === 2 ? je.innerHeight : 1) * _;
        rr(E.deltaX * p, E.deltaY * p, 0), h && !ce && Je.restart(!0);
      }
    }, Xt = function(E) {
      if (!gt(E)) {
        var p = E.clientX, y = E.clientY, S = p - l.x, P = y - l.y;
        l.x = p, l.y = y, pe = !0, (S || P) && $t(S, P);
      }
    }, nr = function(E) {
      l.event = E, X(l);
    }, wt = function(E) {
      l.event = E, ge(l);
    }, br = function(E) {
      return gt(E) || Er(E, g) && Ze(l);
    };
    Je = l._dc = Se.delayedCall(d || 0.25, vr).pause(), l.deltaX = l.deltaY = 0, l._vx = Vn(0, 50, !0), l._vy = Vn(0, 50, !0), l.scrollX = kt, l.scrollY = Pt, l.isDragging = l.isGesturing = l.isPressed = !1, Bo(this), l.enable = function(C) {
      return l.isEnabled || (We(Rt ? te : s, "scroll", Wn), u.indexOf("scroll") >= 0 && We(Rt ? te : s, "scroll", et, g, U), u.indexOf("wheel") >= 0 && We(s, "wheel", ot, g, U), (u.indexOf("touch") >= 0 && zo || u.indexOf("pointer") >= 0) && (We(s, st[0], A, g, U), We(te, st[2], bt), We(te, st[3], bt), Te && We(s, "click", Ae, !1, !0), Ze && We(s, "click", br), ie && We(te, "gesturestart", nt), a && We(te, "gestureend", it), X && We(s, qt + "enter", nr), ge && We(s, qt + "leave", wt), Ce && We(s, qt + "move", Xt)), l.isEnabled = !0, C && C.type && A(C), Vt && Vt(l)), l;
    }, l.disable = function() {
      l.isEnabled && (cr.filter(function(C) {
        return C !== l && Rr(C.target);
      }).length || Ie(Rt ? te : s, "scroll", Wn), l.isPressed && (l._vx.reset(), l._vy.reset(), Ie(ce ? s : te, st[1], Yt, !0)), Ie(Rt ? te : s, "scroll", et, U), Ie(s, "wheel", ot, U), Ie(s, st[0], A, U), Ie(te, st[2], bt), Ie(te, st[3], bt), Ie(s, "click", Ae, !0), Ie(s, "click", br), Ie(te, "gesturestart", nt), Ie(te, "gestureend", it), Ie(s, qt + "enter", nr), Ie(s, qt + "leave", wt), Ie(s, qt + "move", Xt), l.isEnabled = l.isPressed = l.isDragging = !1, Ot && Ot(l));
    }, l.kill = l.revert = function() {
      l.disable();
      var C = cr.indexOf(l);
      C >= 0 && cr.splice(C, 1), Et === l && (Et = 0);
    }, cr.push(l), ce && Rr(s) && (Et = l), l.enable(B);
  }, Ru(e, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), e;
}();
ue.version = "3.11.5";
ue.create = function(e) {
  return new ue(e);
};
ue.register = $o;
ue.getAll = function() {
  return cr.slice();
};
ue.getById = function(e) {
  return cr.filter(function(t) {
    return t.vars.id === e;
  })[0];
};
Fo() && Se.registerPlugin(ue);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var v, ur, z, j, ct, ee, Yo, dn, gn, lr, rn, qr, Me, En, $n, ze, Zi, Ji, ar, Xo, Cn, Ho, qe, qo, Uo, Go, At, Yn, ni, kn, Ur = 1, Le = Date.now, Pn = Le(), rt = 0, Tr = 0, Au = function e() {
  return Tr && requestAnimationFrame(e);
}, eo = function() {
  return En = 1;
}, to = function() {
  return En = 0;
}, mt = function(t) {
  return t;
}, xr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, jo = function() {
  return typeof window < "u";
}, Qo = function() {
  return v || jo() && (v = window.gsap) && v.registerPlugin && v;
}, Zt = function(t) {
  return !!~Yo.indexOf(t);
}, Ko = function(t) {
  return Bt(t, "getBoundingClientRect") || (Zt(t) ? function() {
    return cn.width = z.innerWidth, cn.height = z.innerHeight, cn;
  } : function() {
    return yt(t);
  });
}, Nu = function(t, r, n) {
  var i = n.d, o = n.d2, u = n.a;
  return (u = Bt(t, "getBoundingClientRect")) ? function() {
    return u()[i];
  } : function() {
    return (r ? z["inner" + o] : t["client" + o]) || 0;
  };
}, Iu = function(t, r) {
  return !r || ~_t.indexOf(t) ? Ko(t) : function() {
    return cn;
  };
}, zt = function(t, r) {
  var n = r.s, i = r.d2, o = r.d, u = r.a;
  return Math.max(0, (n = "scroll" + i) && (u = Bt(t, n)) ? u() - Ko(t)()[o] : Zt(t) ? (ct[n] || ee[n]) - (z["inner" + i] || ct["client" + i] || ee["client" + i]) : t[n] - t["offset" + i]);
}, Gr = function(t, r) {
  for (var n = 0; n < ar.length; n += 3)
    (!r || ~r.indexOf(ar[n + 1])) && t(ar[n], ar[n + 1], ar[n + 2]);
}, ut = function(t) {
  return typeof t == "string";
}, Fe = function(t) {
  return typeof t == "function";
}, Mr = function(t) {
  return typeof t == "number";
}, nn = function(t) {
  return typeof t == "object";
}, Sr = function(t, r, n) {
  return t && t.progress(r ? 0 : 1) && n && t.pause();
}, Rn = function(t, r) {
  if (t.enabled) {
    var n = r(t);
    n && n.totalTime && (t.callbackAnimation = n);
  }
}, or = Math.abs, Zo = "left", Jo = "top", ii = "right", oi = "bottom", Gt = "width", jt = "height", Dr = "Right", Ar = "Left", Nr = "Top", Ir = "Bottom", ne = "padding", tt = "margin", pr = "Width", si = "Height", Ee = "px", lt = function(t) {
  return z.getComputedStyle(t);
}, zu = function(t) {
  var r = lt(t).position;
  t.style.position = r === "absolute" || r === "fixed" ? r : "relative";
}, ro = function(t, r) {
  for (var n in r)
    n in t || (t[n] = r[n]);
  return t;
}, yt = function(t, r) {
  var n = r && lt(t)[$n] !== "matrix(1, 0, 0, 1, 0, 0)" && v.to(t, {
    x: 0,
    y: 0,
    xPercent: 0,
    yPercent: 0,
    rotation: 0,
    rotationX: 0,
    rotationY: 0,
    scale: 1,
    skewX: 0,
    skewY: 0
  }).progress(1), i = t.getBoundingClientRect();
  return n && n.progress(0).kill(), i;
}, Xn = function(t, r) {
  var n = r.d2;
  return t["offset" + n] || t["client" + n] || 0;
}, es = function(t) {
  var r = [], n = t.labels, i = t.duration(), o;
  for (o in n)
    r.push(n[o] / i);
  return r;
}, Lu = function(t) {
  return function(r) {
    return v.utils.snap(es(t), r);
  };
}, ui = function(t) {
  var r = v.utils.snap(t), n = Array.isArray(t) && t.slice(0).sort(function(i, o) {
    return i - o;
  });
  return n ? function(i, o, u) {
    u === void 0 && (u = 1e-3);
    var s;
    if (!o)
      return r(i);
    if (o > 0) {
      for (i -= u, s = 0; s < n.length; s++)
        if (n[s] >= i)
          return n[s];
      return n[s - 1];
    } else
      for (s = n.length, i += u; s--; )
        if (n[s] <= i)
          return n[s];
    return n[0];
  } : function(i, o, u) {
    u === void 0 && (u = 1e-3);
    var s = r(i);
    return !o || Math.abs(s - i) < u || s - i < 0 == o < 0 ? s : r(o < 0 ? i - t : i + t);
  };
}, Bu = function(t) {
  return function(r, n) {
    return ui(es(t))(r, n.direction);
  };
}, jr = function(t, r, n, i) {
  return n.split(",").forEach(function(o) {
    return t(r, o, i);
  });
}, we = function(t, r, n, i, o) {
  return t.addEventListener(r, n, {
    passive: !i,
    capture: !!o
  });
}, be = function(t, r, n, i) {
  return t.removeEventListener(r, n, !!i);
}, Qr = function(t, r, n) {
  n = n && n.wheelHandler, n && (t(r, "wheel", n), t(r, "touchmove", n));
}, no = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Kr = {
  toggleActions: "play",
  anticipatePin: 0
}, pn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, on = function(t, r) {
  if (ut(t)) {
    var n = t.indexOf("="), i = ~n ? +(t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
    ~n && (t.indexOf("%") > n && (i *= r / 100), t = t.substr(0, n - 1)), t = i + (t in pn ? pn[t] * r : ~t.indexOf("%") ? parseFloat(t) * r / 100 : parseFloat(t) || 0);
  }
  return t;
}, Zr = function(t, r, n, i, o, u, s, f) {
  var m = o.startColor, g = o.endColor, h = o.fontSize, d = o.indent, c = o.fontWeight, _ = j.createElement("div"), B = Zt(n) || Bt(n, "pinType") === "fixed", $ = t.indexOf("scroller") !== -1, R = B ? ee : n, K = t.indexOf("start") !== -1, F = K ? m : g, O = "border-color:" + F + ";font-size:" + h + ";color:" + F + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return O += "position:" + (($ || f) && B ? "fixed;" : "absolute;"), ($ || f || !B) && (O += (i === fe ? ii : oi) + ":" + (u + parseFloat(d)) + "px;"), s && (O += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), _._isStart = K, _.setAttribute("class", "gsap-marker-" + t + (r ? " marker-" + r : "")), _.style.cssText = O, _.innerText = r || r === 0 ? t + "-" + r : t, R.children[0] ? R.insertBefore(_, R.children[0]) : R.appendChild(_), _._offset = _["offset" + i.op.d2], sn(_, 0, i, K), _;
}, sn = function(t, r, n, i) {
  var o = {
    display: "block"
  }, u = n[i ? "os2" : "p2"], s = n[i ? "p2" : "os2"];
  t._isFlipped = i, o[n.a + "Percent"] = i ? -100 : 0, o[n.a] = i ? "1px" : 0, o["border" + u + pr] = 1, o["border" + s + pr] = 0, o[n.p] = r + "px", v.set(t, o);
}, D = [], Hn = {}, Fr, io = function() {
  return Le() - rt > 34 && (Fr || (Fr = requestAnimationFrame(xt)));
}, sr = function() {
  (!qe || !qe.isPressed || qe.startX > ee.clientWidth) && (N.cache++, qe ? Fr || (Fr = requestAnimationFrame(xt)) : xt(), rt || er("scrollStart"), rt = Le());
}, Dn = function() {
  Go = z.innerWidth, Uo = z.innerHeight;
}, Or = function() {
  N.cache++, !Me && !Ho && !j.fullscreenElement && !j.webkitFullscreenElement && (!qo || Go !== z.innerWidth || Math.abs(z.innerHeight - Uo) > z.innerHeight * 0.25) && dn.restart(!0);
}, Jt = {}, Fu = [], ts = function e() {
  return be(k, "scrollEnd", e) || Ut(!0);
}, er = function(t) {
  return Jt[t] && Jt[t].map(function(r) {
    return r();
  }) || Fu;
}, Ue = [], rs = function(t) {
  for (var r = 0; r < Ue.length; r += 5)
    (!t || Ue[r + 4] && Ue[r + 4].query === t) && (Ue[r].style.cssText = Ue[r + 1], Ue[r].getBBox && Ue[r].setAttribute("transform", Ue[r + 2] || ""), Ue[r + 3].uncache = 1);
}, ai = function(t, r) {
  var n;
  for (ze = 0; ze < D.length; ze++)
    n = D[ze], n && (!r || n._ctx === r) && (t ? n.kill(1) : n.revert(!0, !0));
  r && rs(r), r || er("revert");
}, ns = function(t, r) {
  N.cache++, (r || !Ge) && N.forEach(function(n) {
    return Fe(n) && n.cacheID++ && (n.rec = 0);
  }), ut(t) && (z.history.scrollRestoration = ni = t);
}, Ge, Qt = 0, oo, Wu = function() {
  if (oo !== Qt) {
    var t = oo = Qt;
    requestAnimationFrame(function() {
      return t === Qt && Ut(!0);
    });
  }
}, Ut = function(t, r) {
  if (rt && !t) {
    we(k, "scrollEnd", ts);
    return;
  }
  Ge = k.isRefreshing = !0, N.forEach(function(i) {
    return Fe(i) && i.cacheID++ && (i.rec = i());
  });
  var n = er("refreshInit");
  Xo && k.sort(), r || ai(), N.forEach(function(i) {
    Fe(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
  }), D.slice(0).forEach(function(i) {
    return i.refresh();
  }), D.forEach(function(i, o) {
    if (i._subPinOffset && i.pin) {
      var u = i.vars.horizontal ? "offsetWidth" : "offsetHeight", s = i.pin[u];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[u] - s), i.refresh();
    }
  }), D.forEach(function(i) {
    return i.vars.end === "max" && i.setPositions(i.start, Math.max(i.start + 1, zt(i.scroller, i._dir)));
  }), n.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), N.forEach(function(i) {
    Fe(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), ns(ni, 1), dn.pause(), Qt++, Ge = 2, xt(2), D.forEach(function(i) {
    return Fe(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), Ge = k.isRefreshing = !1, er("refresh");
}, qn = 0, un = 1, zr, xt = function(t) {
  if (!Ge || t === 2) {
    k.isUpdating = !0, zr && zr.update(0);
    var r = D.length, n = Le(), i = n - Pn >= 50, o = r && D[0].scroll();
    if (un = qn > o ? -1 : 1, Ge || (qn = o), i && (rt && !En && n - rt > 200 && (rt = 0, er("scrollEnd")), rn = Pn, Pn = n), un < 0) {
      for (ze = r; ze-- > 0; )
        D[ze] && D[ze].update(0, i);
      un = 1;
    } else
      for (ze = 0; ze < r; ze++)
        D[ze] && D[ze].update(0, i);
    k.isUpdating = !1;
  }
  Fr = 0;
}, Un = [Zo, Jo, oi, ii, tt + Ir, tt + Dr, tt + Nr, tt + Ar, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], an = Un.concat([Gt, jt, "boxSizing", "max" + pr, "max" + si, "position", tt, ne, ne + Nr, ne + Dr, ne + Ir, ne + Ar]), Vu = function(t, r, n) {
  gr(n);
  var i = t._gsap;
  if (i.spacerIsNative)
    gr(i.spacerState);
  else if (t._gsap.swappedIn) {
    var o = r.parentNode;
    o && (o.insertBefore(t, r), o.removeChild(r));
  }
  t._gsap.swappedIn = !1;
}, An = function(t, r, n, i) {
  if (!t._gsap.swappedIn) {
    for (var o = Un.length, u = r.style, s = t.style, f; o--; )
      f = Un[o], u[f] = n[f];
    u.position = n.position === "absolute" ? "absolute" : "relative", n.display === "inline" && (u.display = "inline-block"), s[oi] = s[ii] = "auto", u.flexBasis = n.flexBasis || "auto", u.overflow = "visible", u.boxSizing = "border-box", u[Gt] = Xn(t, Be) + Ee, u[jt] = Xn(t, fe) + Ee, u[ne] = s[tt] = s[Jo] = s[Zo] = "0", gr(i), s[Gt] = s["max" + pr] = n[Gt], s[jt] = s["max" + si] = n[jt], s[ne] = n[ne], t.parentNode !== r && (t.parentNode.insertBefore(r, t), r.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, $u = /([A-Z])/g, gr = function(t) {
  if (t) {
    var r = t.t.style, n = t.length, i = 0, o, u;
    for ((t.t._gsap || v.core.getCache(t.t)).uncache = 1; i < n; i += 2)
      u = t[i + 1], o = t[i], u ? r[o] = u : r[o] && r.removeProperty(o.replace($u, "-$1").toLowerCase());
  }
}, Jr = function(t) {
  for (var r = an.length, n = t.style, i = [], o = 0; o < r; o++)
    i.push(an[o], n[an[o]]);
  return i.t = t, i;
}, Yu = function(t, r, n) {
  for (var i = [], o = t.length, u = n ? 8 : 0, s; u < o; u += 2)
    s = t[u], i.push(s, s in r ? r[s] : t[u + 1]);
  return i.t = t.t, i;
}, cn = {
  left: 0,
  top: 0
}, so = function(t, r, n, i, o, u, s, f, m, g, h, d, c) {
  Fe(t) && (t = t(f)), ut(t) && t.substr(0, 3) === "max" && (t = d + (t.charAt(4) === "=" ? on("0" + t.substr(3), n) : 0));
  var _ = c ? c.time() : 0, B, $, R;
  if (c && c.seek(0), Mr(t))
    c && (t = v.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, d, t)), s && sn(s, n, i, !0);
  else {
    Fe(r) && (r = r(f));
    var K = (t || "0").split(" "), F, O, W, w;
    R = Ve(r) || ee, F = yt(R) || {}, (!F || !F.left && !F.top) && lt(R).display === "none" && (w = R.style.display, R.style.display = "block", F = yt(R), w ? R.style.display = w : R.style.removeProperty("display")), O = on(K[0], F[i.d]), W = on(K[1] || "0", n), t = F[i.p] - m[i.p] - g + O + o - W, s && sn(s, W, i, n - W < 20 || s._isStart && W > 20), n -= n - W;
  }
  if (u) {
    var b = t + n, q = u._isStart;
    B = "scroll" + i.d2, sn(u, b, i, q && b > 20 || !q && (h ? Math.max(ee[B], ct[B]) : u.parentNode[B]) <= b + 1), h && (m = yt(s), h && (u.style[i.op.p] = m[i.op.p] - i.op.m - u._offset + Ee));
  }
  return c && R && (B = yt(R), c.seek(d), $ = yt(R), c._caScrollDist = B[i.p] - $[i.p], t = t / c._caScrollDist * d), c && c.seek(_), c ? t : Math.round(t);
}, Xu = /(webkit|moz|length|cssText|inset)/i, uo = function(t, r, n, i) {
  if (t.parentNode !== r) {
    var o = t.style, u, s;
    if (r === ee) {
      t._stOrig = o.cssText, s = lt(t);
      for (u in s)
        !+u && !Xu.test(u) && s[u] && typeof o[u] == "string" && u !== "0" && (o[u] = s[u]);
      o.top = n, o.left = i;
    } else
      o.cssText = t._stOrig;
    v.core.getCache(t).uncache = 1, r.appendChild(t);
  }
}, is = function(t, r, n) {
  var i = r, o = i;
  return function(u) {
    var s = Math.round(t());
    return s !== i && s !== o && Math.abs(s - i) > 3 && Math.abs(s - o) > 3 && (u = s, n && n()), o = i, i = u, u;
  };
}, ao = function(t, r) {
  var n = Wt(t, r), i = "_scroll" + r.p2, o = function u(s, f, m, g, h) {
    var d = u.tween, c = f.onComplete, _ = {};
    m = m || n();
    var B = is(n, m, function() {
      d.kill(), u.tween = 0;
    });
    return h = g && h || 0, g = g || s - m, d && d.kill(), f[i] = s, f.modifiers = _, _[i] = function() {
      return B(m + g * d.ratio + h * d.ratio * d.ratio);
    }, f.onUpdate = function() {
      N.cache++, xt();
    }, f.onComplete = function() {
      u.tween = 0, c && c.call(d);
    }, d = u.tween = v.to(t, f), d;
  };
  return t[i] = n, n.wheelHandler = function() {
    return o.tween && o.tween.kill() && (o.tween = 0);
  }, we(t, "wheel", n.wheelHandler), k.isTouch && we(t, "touchmove", n.wheelHandler), o;
}, k = /* @__PURE__ */ function() {
  function e(r, n) {
    ur || e.register(v) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(r, n);
  }
  var t = e.prototype;
  return t.init = function(n, i) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Tr) {
      this.update = this.refresh = this.kill = mt;
      return;
    }
    n = ro(ut(n) || Mr(n) || n.nodeType ? {
      trigger: n
    } : n, Kr);
    var o = n, u = o.onUpdate, s = o.toggleClass, f = o.id, m = o.onToggle, g = o.onRefresh, h = o.scrub, d = o.trigger, c = o.pin, _ = o.pinSpacing, B = o.invalidateOnRefresh, $ = o.anticipatePin, R = o.onScrubComplete, K = o.onSnapComplete, F = o.once, O = o.snap, W = o.pinReparent, w = o.pinSpacer, b = o.containerAnimation, q = o.fastScrollEnd, de = o.preventOverlaps, x = n.horizontal || n.containerAnimation && n.horizontal !== !1 ? Be : fe, ae = !h && h !== 0, T = Ve(n.scroller || z), Ke = v.core.getCache(T), X = Zt(T), ge = ("pinType" in n ? n.pinType : Bt(T, "pinType") || X && "fixed") === "fixed", Ce = [n.onEnter, n.onLeave, n.onEnterBack, n.onLeaveBack], H = ae && n.toggleActions.split(" "), ce = "markers" in n ? n.markers : Kr.markers, ie = X ? 0 : parseFloat(lt(T)["border" + x.p2 + pr]) || 0, a = this, le = n.onRefreshInit && function() {
      return n.onRefreshInit(a);
    }, Vt = Nu(T, X, x), Ot = Iu(T, X), Ze = 0, Ct = 0, U = Wt(T, x), Te, ke, hr, $e, Je, I, pe, Ye, dt, Pe, l, vt, G, kt, Pt, tr, Re, mr, Rt, te, Xe, De, _r, Ae, gt, vr, Dt, rr, $t, Yt, A, bt, nt, it, et, ot, Xt, nr, wt;
    if (Yn(a), a._dir = x, $ *= 45, a.scroller = T, a.scroll = b ? b.time.bind(b) : U, $e = U(), a.vars = n, i = i || n.animation, "refreshPriority" in n && (Xo = 1, n.refreshPriority === -9999 && (zr = a)), Ke.tweenScroll = Ke.tweenScroll || {
      top: ao(T, fe),
      left: ao(T, Be)
    }, a.tweenTo = Te = Ke.tweenScroll[x.p], a.scrubDuration = function(p) {
      bt = Mr(p) && p, bt ? A ? A.duration(p) : A = v.to(i, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: bt,
        paused: !0,
        onComplete: function() {
          return R && R(a);
        }
      }) : (A && A.progress(1).kill(), A = 0);
    }, i && (i.vars.lazy = !1, i._initted || i.vars.immediateRender !== !1 && n.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), a.animation = i.pause(), i.scrollTrigger = a, a.scrubDuration(h), A && A.resetTo && A.resetTo("totalProgress", 0), $t = 0, f || (f = i.vars.id)), D.push(a), O && ((!nn(O) || O.push) && (O = {
      snapTo: O
    }), "scrollBehavior" in ee.style && v.set(X ? [ee, ct] : T, {
      scrollBehavior: "auto"
    }), N.forEach(function(p) {
      return Fe(p) && p.target === (X ? j.scrollingElement || ct : T) && (p.smooth = !1);
    }), hr = Fe(O.snapTo) ? O.snapTo : O.snapTo === "labels" ? Lu(i) : O.snapTo === "labelsDirectional" ? Bu(i) : O.directional !== !1 ? function(p, y) {
      return ui(O.snapTo)(p, Le() - Ct < 500 ? 0 : y.direction);
    } : v.utils.snap(O.snapTo), nt = O.duration || {
      min: 0.1,
      max: 2
    }, nt = nn(nt) ? lr(nt.min, nt.max) : lr(nt, nt), it = v.delayedCall(O.delay || bt / 2 || 0.1, function() {
      var p = U(), y = Le() - Ct < 500, S = Te.tween;
      if ((y || Math.abs(a.getVelocity()) < 10) && !S && !En && Ze !== p) {
        var P = (p - I) / G, he = i && !ae ? i.totalProgress() : P, V = y ? 0 : (he - Yt) / (Le() - rn) * 1e3 || 0, Z = v.utils.clamp(-P, 1 - P, or(V / 2) * V / 0.185), ye = P + (O.inertia === !1 ? 0 : Z), me = lr(0, 1, hr(ye, a)), oe = Math.round(I + me * G), J = O, He = J.onStart, Ne = J.onInterrupt, _e = J.onComplete;
        if (p <= pe && p >= I && oe !== p) {
          if (S && !S._initted && S.data <= or(oe - p))
            return;
          O.inertia === !1 && (Z = me - P), Te(oe, {
            duration: nt(or(Math.max(or(ye - he), or(me - he)) * 0.185 / V / 0.05 || 0)),
            ease: O.ease || "power3",
            data: or(oe - p),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return it.restart(!0) && Ne && Ne(a);
            },
            onComplete: function() {
              a.update(), Ze = U(), $t = Yt = i && !ae ? i.totalProgress() : a.progress, K && K(a), _e && _e(a);
            }
          }, p, Z * G, oe - p - Z * G), He && He(a, Te.tween);
        }
      } else
        a.isActive && Ze !== p && it.restart(!0);
    }).pause()), f && (Hn[f] = a), d = a.trigger = Ve(d || c), wt = d && d._gsap && d._gsap.stRevert, wt && (wt = wt(a)), c = c === !0 ? d : Ve(c), ut(s) && (s = {
      targets: d,
      className: s
    }), c && (_ === !1 || _ === tt || (_ = !_ && c.parentNode && c.parentNode.style && lt(c.parentNode).display === "flex" ? !1 : ne), a.pin = c, ke = v.core.getCache(c), ke.spacer ? kt = ke.pinState : (w && (w = Ve(w), w && !w.nodeType && (w = w.current || w.nativeElement), ke.spacerIsNative = !!w, w && (ke.spacerState = Jr(w))), ke.spacer = Re = w || j.createElement("div"), Re.classList.add("pin-spacer"), f && Re.classList.add("pin-spacer-" + f), ke.pinState = kt = Jr(c)), n.force3D !== !1 && v.set(c, {
      force3D: !0
    }), a.spacer = Re = ke.spacer, rr = lt(c), _r = rr[_ + x.os2], Rt = v.getProperty(c), te = v.quickSetter(c, x.a, Ee), An(c, Re, rr), tr = Jr(c)), ce) {
      vt = nn(ce) ? ro(ce, no) : no, Pe = Zr("scroller-start", f, T, x, vt, 0), l = Zr("scroller-end", f, T, x, vt, 0, Pe), mr = Pe["offset" + x.op.d2];
      var br = Ve(Bt(T, "content") || T);
      Ye = this.markerStart = Zr("start", f, br, x, vt, mr, 0, b), dt = this.markerEnd = Zr("end", f, br, x, vt, mr, 0, b), b && (nr = v.quickSetter([Ye, dt], x.a, Ee)), !ge && !(_t.length && Bt(T, "fixedMarkers") === !0) && (zu(X ? ee : T), v.set([Pe, l], {
        force3D: !0
      }), gt = v.quickSetter(Pe, x.a, Ee), Dt = v.quickSetter(l, x.a, Ee));
    }
    if (b) {
      var C = b.vars.onUpdate, E = b.vars.onUpdateParams;
      b.eventCallback("onUpdate", function() {
        a.update(0, 0, 1), C && C.apply(b, E || []);
      });
    }
    a.previous = function() {
      return D[D.indexOf(a) - 1];
    }, a.next = function() {
      return D[D.indexOf(a) + 1];
    }, a.revert = function(p, y) {
      if (!y)
        return a.kill(!0);
      var S = p !== !1 || !a.enabled, P = Me;
      S !== a.isReverted && (S && (ot = Math.max(U(), a.scroll.rec || 0), et = a.progress, Xt = i && i.progress()), Ye && [Ye, dt, Pe, l].forEach(function(he) {
        return he.style.display = S ? "none" : "block";
      }), S && (Me = a, a.update(S)), c && (!W || !a.isActive) && (S ? Vu(c, Re, kt) : An(c, Re, lt(c), Ae)), S || a.update(S), Me = P, a.isReverted = S);
    }, a.refresh = function(p, y) {
      if (!((Me || !a.enabled) && !y)) {
        if (c && p && rt) {
          we(e, "scrollEnd", ts);
          return;
        }
        !Ge && le && le(a), Me = a, Ct = Le(), Te.tween && (Te.tween.kill(), Te.tween = 0), A && A.pause(), B && i && i.revert({
          kill: !1
        }).invalidate(), a.isReverted || a.revert(!0, !0), a._subPinOffset = !1;
        for (var S = Vt(), P = Ot(), he = b ? b.duration() : zt(T, x), V = G <= 0.01, Z = 0, ye = 0, me = n.end, oe = n.endTrigger || d, J = n.start || (n.start === 0 || !d ? 0 : c ? "0 0" : "0 100%"), He = a.pinnedContainer = n.pinnedContainer && Ve(n.pinnedContainer), Ne = d && Math.max(0, D.indexOf(a)) || 0, _e = Ne, re, xe, ir, Ht, se, ve, pt, Sn, ci, wr, ht; _e--; )
          ve = D[_e], ve.end || ve.refresh(0, 1) || (Me = a), pt = ve.pin, pt && (pt === d || pt === c || pt === He) && !ve.isReverted && (wr || (wr = []), wr.unshift(ve), ve.revert(!0, !0)), ve !== D[_e] && (Ne--, _e--);
        for (Fe(J) && (J = J(a)), I = so(J, d, S, x, U(), Ye, Pe, a, P, ie, ge, he, b) || (c ? -1e-3 : 0), Fe(me) && (me = me(a)), ut(me) && !me.indexOf("+=") && (~me.indexOf(" ") ? me = (ut(J) ? J.split(" ")[0] : "") + me : (Z = on(me.substr(2), S), me = ut(J) ? J : (b ? v.utils.mapRange(0, b.duration(), b.scrollTrigger.start, b.scrollTrigger.end, I) : I) + Z, oe = d)), pe = Math.max(I, so(me || (oe ? "100% 0" : he), oe, S, x, U() + Z, dt, l, a, P, ie, ge, he, b)) || -1e-3, G = pe - I || (I -= 0.01) && 1e-3, Z = 0, _e = Ne; _e--; )
          ve = D[_e], pt = ve.pin, pt && ve.start - ve._pinPush <= I && !b && ve.end > 0 && (re = ve.end - ve.start, (pt === d && ve.start - ve._pinPush < I || pt === He) && !Mr(J) && (Z += re * (1 - ve.progress)), pt === c && (ye += re));
        if (I += Z, pe += Z, V && (et = v.utils.clamp(0, 1, v.utils.normalize(I, pe, ot))), a._pinPush = ye, Ye && Z && (re = {}, re[x.a] = "+=" + Z, He && (re[x.p] = "-=" + U()), v.set([Ye, dt], re)), c)
          re = lt(c), Ht = x === fe, ir = U(), Xe = parseFloat(Rt(x.a)) + ye, !he && pe > 1 && (ht = (X ? j.scrollingElement || ct : T).style, ht = {
            style: ht,
            value: ht["overflow" + x.a.toUpperCase()]
          }, ht.style["overflow" + x.a.toUpperCase()] = "scroll"), An(c, Re, re), tr = Jr(c), xe = yt(c, !0), Sn = ge && Wt(T, Ht ? Be : fe)(), _ && (Ae = [_ + x.os2, G + ye + Ee], Ae.t = Re, _e = _ === ne ? Xn(c, x) + G + ye : 0, _e && Ae.push(x.d, _e + Ee), gr(Ae), He && D.forEach(function(yr) {
            yr.pin === He && yr.vars.pinSpacing !== !1 && (yr._subPinOffset = !0);
          }), ge && U(ot)), ge && (se = {
            top: xe.top + (Ht ? ir - I : Sn) + Ee,
            left: xe.left + (Ht ? Sn : ir - I) + Ee,
            boxSizing: "border-box",
            position: "fixed"
          }, se[Gt] = se["max" + pr] = Math.ceil(xe.width) + Ee, se[jt] = se["max" + si] = Math.ceil(xe.height) + Ee, se[tt] = se[tt + Nr] = se[tt + Dr] = se[tt + Ir] = se[tt + Ar] = "0", se[ne] = re[ne], se[ne + Nr] = re[ne + Nr], se[ne + Dr] = re[ne + Dr], se[ne + Ir] = re[ne + Ir], se[ne + Ar] = re[ne + Ar], Pt = Yu(kt, se, W), Ge && U(0)), i ? (ci = i._initted, Cn(1), i.render(i.duration(), !0, !0), De = Rt(x.a) - Xe + G + ye, vr = Math.abs(G - De) > 1, ge && vr && Pt.splice(Pt.length - 2, 2), i.render(0, !0, !0), ci || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), Cn(0)) : De = G, ht && (ht.value ? ht.style["overflow" + x.a.toUpperCase()] = ht.value : ht.style.removeProperty("overflow-" + x.a));
        else if (d && U() && !b)
          for (xe = d.parentNode; xe && xe !== ee; )
            xe._pinOffset && (I -= xe._pinOffset, pe -= xe._pinOffset), xe = xe.parentNode;
        wr && wr.forEach(function(yr) {
          return yr.revert(!1, !0);
        }), a.start = I, a.end = pe, $e = Je = Ge ? ot : U(), !b && !Ge && ($e < ot && U(ot), a.scroll.rec = 0), a.revert(!1, !0), it && (Ze = -1, a.isActive && U(I + G * et), it.restart(!0)), Me = 0, i && ae && (i._initted || Xt) && i.progress() !== Xt && i.progress(Xt, !0).render(i.time(), !0, !0), (V || et !== a.progress || b) && (i && !ae && i.totalProgress(b && I < -1e-3 && !et ? v.utils.normalize(I, pe, 0) : et, !0), a.progress = ($e - I) / G === et ? 0 : et), c && _ && (Re._pinOffset = Math.round(a.progress * De)), A && A.invalidate(), g && !Ge && g(a);
      }
    }, a.getVelocity = function() {
      return (U() - Je) / (Le() - rn) * 1e3 || 0;
    }, a.endAnimation = function() {
      Sr(a.callbackAnimation), i && (A ? A.progress(1) : i.paused() ? ae || Sr(i, a.direction < 0, 1) : Sr(i, i.reversed()));
    }, a.labelToScroll = function(p) {
      return i && i.labels && (I || a.refresh() || I) + i.labels[p] / i.duration() * G || 0;
    }, a.getTrailing = function(p) {
      var y = D.indexOf(a), S = a.direction > 0 ? D.slice(0, y).reverse() : D.slice(y + 1);
      return (ut(p) ? S.filter(function(P) {
        return P.vars.preventOverlaps === p;
      }) : S).filter(function(P) {
        return a.direction > 0 ? P.end <= I : P.start >= pe;
      });
    }, a.update = function(p, y, S) {
      if (!(b && !S && !p)) {
        var P = Ge === !0 ? ot : a.scroll(), he = p ? 0 : (P - I) / G, V = he < 0 ? 0 : he > 1 ? 1 : he || 0, Z = a.progress, ye, me, oe, J, He, Ne, _e, re;
        if (y && (Je = $e, $e = b ? U() : P, O && (Yt = $t, $t = i && !ae ? i.totalProgress() : V)), $ && !V && c && !Me && !Ur && rt && I < P + (P - Je) / (Le() - rn) * $ && (V = 1e-4), V !== Z && a.enabled) {
          if (ye = a.isActive = !!V && V < 1, me = !!Z && Z < 1, Ne = ye !== me, He = Ne || !!V != !!Z, a.direction = V > Z ? 1 : -1, a.progress = V, He && !Me && (oe = V && !Z ? 0 : V === 1 ? 1 : Z === 1 ? 2 : 3, ae && (J = !Ne && H[oe + 1] !== "none" && H[oe + 1] || H[oe], re = i && (J === "complete" || J === "reset" || J in i))), de && (Ne || re) && (re || h || !i) && (Fe(de) ? de(a) : a.getTrailing(de).forEach(function(se) {
            return se.endAnimation();
          })), ae || (A && !Me && !Ur ? (A._dp._time - A._start !== A._time && A.render(A._dp._time - A._start), A.resetTo ? A.resetTo("totalProgress", V, i._tTime / i._tDur) : (A.vars.totalProgress = V, A.invalidate().restart())) : i && i.totalProgress(V, !!Me)), c) {
            if (p && _ && (Re.style[_ + x.os2] = _r), !ge)
              te(xr(Xe + De * V));
            else if (He) {
              if (_e = !p && V > Z && pe + 1 > P && P + 1 >= zt(T, x), W)
                if (!p && (ye || _e)) {
                  var xe = yt(c, !0), ir = P - I;
                  uo(c, ee, xe.top + (x === fe ? ir : 0) + Ee, xe.left + (x === fe ? 0 : ir) + Ee);
                } else
                  uo(c, Re);
              gr(ye || _e ? Pt : tr), vr && V < 1 && ye || te(Xe + (V === 1 && !_e ? De : 0));
            }
          }
          O && !Te.tween && !Me && !Ur && it.restart(!0), s && (Ne || F && V && (V < 1 || !kn)) && gn(s.targets).forEach(function(se) {
            return se.classList[ye || F ? "add" : "remove"](s.className);
          }), u && !ae && !p && u(a), He && !Me ? (ae && (re && (J === "complete" ? i.pause().totalProgress(1) : J === "reset" ? i.restart(!0).pause() : J === "restart" ? i.restart(!0) : i[J]()), u && u(a)), (Ne || !kn) && (m && Ne && Rn(a, m), Ce[oe] && Rn(a, Ce[oe]), F && (V === 1 ? a.kill(!1, 1) : Ce[oe] = 0), Ne || (oe = V === 1 ? 1 : 3, Ce[oe] && Rn(a, Ce[oe]))), q && !ye && Math.abs(a.getVelocity()) > (Mr(q) ? q : 2500) && (Sr(a.callbackAnimation), A ? A.progress(1) : Sr(i, J === "reverse" ? 1 : !V, 1))) : ae && u && !Me && u(a);
        }
        if (Dt) {
          var Ht = b ? P / b.duration() * (b._caScrollDist || 0) : P;
          gt(Ht + (Pe._isFlipped ? 1 : 0)), Dt(Ht);
        }
        nr && nr(-P / b.duration() * (b._caScrollDist || 0));
      }
    }, a.enable = function(p, y) {
      a.enabled || (a.enabled = !0, we(T, "resize", Or), we(X ? j : T, "scroll", sr), le && we(e, "refreshInit", le), p !== !1 && (a.progress = et = 0, $e = Je = Ze = U()), y !== !1 && a.refresh());
    }, a.getTween = function(p) {
      return p && Te ? Te.tween : A;
    }, a.setPositions = function(p, y) {
      c && (Xe += p - I, De += y - p - G, _ === ne && a.adjustPinSpacing(y - p - G)), a.start = I = p, a.end = pe = y, G = y - p, a.update();
    }, a.adjustPinSpacing = function(p) {
      if (Ae && p) {
        var y = Ae.indexOf(x.d) + 1;
        Ae[y] = parseFloat(Ae[y]) + p + Ee, Ae[1] = parseFloat(Ae[1]) + p + Ee, gr(Ae);
      }
    }, a.disable = function(p, y) {
      if (a.enabled && (p !== !1 && a.revert(!0, !0), a.enabled = a.isActive = !1, y || A && A.pause(), ot = 0, ke && (ke.uncache = 1), le && be(e, "refreshInit", le), it && (it.pause(), Te.tween && Te.tween.kill() && (Te.tween = 0)), !X)) {
        for (var S = D.length; S--; )
          if (D[S].scroller === T && D[S] !== a)
            return;
        be(T, "resize", Or), be(T, "scroll", sr);
      }
    }, a.kill = function(p, y) {
      a.disable(p, y), A && !y && A.kill(), f && delete Hn[f];
      var S = D.indexOf(a);
      S >= 0 && D.splice(S, 1), S === ze && un > 0 && ze--, S = 0, D.forEach(function(P) {
        return P.scroller === a.scroller && (S = 1);
      }), S || Ge || (a.scroll.rec = 0), i && (i.scrollTrigger = null, p && i.revert({
        kill: !1
      }), y || i.kill()), Ye && [Ye, dt, Pe, l].forEach(function(P) {
        return P.parentNode && P.parentNode.removeChild(P);
      }), zr === a && (zr = 0), c && (ke && (ke.uncache = 1), S = 0, D.forEach(function(P) {
        return P.pin === c && S++;
      }), S || (ke.spacer = 0)), n.onKill && n.onKill(a);
    }, a.enable(!1, !1), wt && wt(a), !i || !i.add || G ? a.refresh() : v.delayedCall(0.01, function() {
      return I || pe || a.refresh();
    }) && (G = 0.01) && (I = pe = 0), c && Wu();
  }, e.register = function(n) {
    return ur || (v = n || Qo(), jo() && window.document && e.enable(), ur = Tr), ur;
  }, e.defaults = function(n) {
    if (n)
      for (var i in n)
        Kr[i] = n[i];
    return Kr;
  }, e.disable = function(n, i) {
    Tr = 0, D.forEach(function(u) {
      return u[i ? "kill" : "disable"](n);
    }), be(z, "wheel", sr), be(j, "scroll", sr), clearInterval(qr), be(j, "touchcancel", mt), be(ee, "touchstart", mt), jr(be, j, "pointerdown,touchstart,mousedown", eo), jr(be, j, "pointerup,touchend,mouseup", to), dn.kill(), Gr(be);
    for (var o = 0; o < N.length; o += 3)
      Qr(be, N[o], N[o + 1]), Qr(be, N[o], N[o + 2]);
  }, e.enable = function() {
    if (z = window, j = document, ct = j.documentElement, ee = j.body, v && (gn = v.utils.toArray, lr = v.utils.clamp, Yn = v.core.context || mt, Cn = v.core.suppressOverwrites || mt, ni = z.history.scrollRestoration || "auto", qn = z.pageYOffset, v.core.globals("ScrollTrigger", e), ee)) {
      Tr = 1, Au(), ue.register(v), e.isTouch = ue.isTouch, At = ue.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), we(z, "wheel", sr), Yo = [z, j, ct, ee], v.matchMedia ? (e.matchMedia = function(f) {
        var m = v.matchMedia(), g;
        for (g in f)
          m.add(g, f[g]);
        return m;
      }, v.addEventListener("matchMediaInit", function() {
        return ai();
      }), v.addEventListener("matchMediaRevert", function() {
        return rs();
      }), v.addEventListener("matchMedia", function() {
        Ut(0, 1), er("matchMedia");
      }), v.matchMedia("(orientation: portrait)", function() {
        return Dn(), Dn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Dn(), we(j, "scroll", sr);
      var n = ee.style, i = n.borderTopStyle, o = v.core.Animation.prototype, u, s;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", u = yt(ee), fe.m = Math.round(u.top + fe.sc()) || 0, Be.m = Math.round(u.left + Be.sc()) || 0, i ? n.borderTopStyle = i : n.removeProperty("border-top-style"), qr = setInterval(io, 250), v.delayedCall(0.5, function() {
        return Ur = 0;
      }), we(j, "touchcancel", mt), we(ee, "touchstart", mt), jr(we, j, "pointerdown,touchstart,mousedown", eo), jr(we, j, "pointerup,touchend,mouseup", to), $n = v.utils.checkPrefix("transform"), an.push($n), ur = Le(), dn = v.delayedCall(0.2, Ut).pause(), ar = [j, "visibilitychange", function() {
        var f = z.innerWidth, m = z.innerHeight;
        j.hidden ? (Zi = f, Ji = m) : (Zi !== f || Ji !== m) && Or();
      }, j, "DOMContentLoaded", Ut, z, "load", Ut, z, "resize", Or], Gr(we), D.forEach(function(f) {
        return f.enable(0, 1);
      }), s = 0; s < N.length; s += 3)
        Qr(be, N[s], N[s + 1]), Qr(be, N[s], N[s + 2]);
    }
  }, e.config = function(n) {
    "limitCallbacks" in n && (kn = !!n.limitCallbacks);
    var i = n.syncInterval;
    i && clearInterval(qr) || (qr = i) && setInterval(io, i), "ignoreMobileResize" in n && (qo = e.isTouch === 1 && n.ignoreMobileResize), "autoRefreshEvents" in n && (Gr(be) || Gr(we, n.autoRefreshEvents || "none"), Ho = (n.autoRefreshEvents + "").indexOf("resize") === -1);
  }, e.scrollerProxy = function(n, i) {
    var o = Ve(n), u = N.indexOf(o), s = Zt(o);
    ~u && N.splice(u, s ? 6 : 2), i && (s ? _t.unshift(z, i, ee, i, ct, i) : _t.unshift(o, i));
  }, e.clearMatchMedia = function(n) {
    D.forEach(function(i) {
      return i._ctx && i._ctx.query === n && i._ctx.kill(!0, !0);
    });
  }, e.isInViewport = function(n, i, o) {
    var u = (ut(n) ? Ve(n) : n).getBoundingClientRect(), s = u[o ? Gt : jt] * i || 0;
    return o ? u.right - s > 0 && u.left + s < z.innerWidth : u.bottom - s > 0 && u.top + s < z.innerHeight;
  }, e.positionInViewport = function(n, i, o) {
    ut(n) && (n = Ve(n));
    var u = n.getBoundingClientRect(), s = u[o ? Gt : jt], f = i == null ? s / 2 : i in pn ? pn[i] * s : ~i.indexOf("%") ? parseFloat(i) * s / 100 : parseFloat(i) || 0;
    return o ? (u.left + f) / z.innerWidth : (u.top + f) / z.innerHeight;
  }, e.killAll = function(n) {
    if (D.slice(0).forEach(function(o) {
      return o.vars.id !== "ScrollSmoother" && o.kill();
    }), n !== !0) {
      var i = Jt.killAll || [];
      Jt = {}, i.forEach(function(o) {
        return o();
      });
    }
  }, e;
}();
k.version = "3.11.5";
k.saveStyles = function(e) {
  return e ? gn(e).forEach(function(t) {
    if (t && t.style) {
      var r = Ue.indexOf(t);
      r >= 0 && Ue.splice(r, 5), Ue.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), v.core.getCache(t), Yn());
    }
  }) : Ue;
};
k.revert = function(e, t) {
  return ai(!e, t);
};
k.create = function(e, t) {
  return new k(e, t);
};
k.refresh = function(e) {
  return e ? Or() : (ur || k.register()) && Ut(!0);
};
k.update = function(e) {
  return ++N.cache && xt(e === !0 ? 2 : 0);
};
k.clearScrollMemory = ns;
k.maxScroll = function(e, t) {
  return zt(e, t ? Be : fe);
};
k.getScrollFunc = function(e, t) {
  return Wt(Ve(e), t ? Be : fe);
};
k.getById = function(e) {
  return Hn[e];
};
k.getAll = function() {
  return D.filter(function(e) {
    return e.vars.id !== "ScrollSmoother";
  });
};
k.isScrolling = function() {
  return !!rt;
};
k.snapDirectional = ui;
k.addEventListener = function(e, t) {
  var r = Jt[e] || (Jt[e] = []);
  ~r.indexOf(t) || r.push(t);
};
k.removeEventListener = function(e, t) {
  var r = Jt[e], n = r && r.indexOf(t);
  n >= 0 && r.splice(n, 1);
};
k.batch = function(e, t) {
  var r = [], n = {}, i = t.interval || 0.016, o = t.batchMax || 1e9, u = function(m, g) {
    var h = [], d = [], c = v.delayedCall(i, function() {
      g(h, d), h = [], d = [];
    }).pause();
    return function(_) {
      h.length || c.restart(!0), h.push(_.trigger), d.push(_), o <= h.length && c.progress(1);
    };
  }, s;
  for (s in t)
    n[s] = s.substr(0, 2) === "on" && Fe(t[s]) && s !== "onRefreshInit" ? u(s, t[s]) : t[s];
  return Fe(o) && (o = o(), we(k, "refresh", function() {
    return o = t.batchMax();
  })), gn(e).forEach(function(f) {
    var m = {};
    for (s in n)
      m[s] = n[s];
    m.trigger = f, r.push(k.create(m));
  }), r;
};
var co = function(t, r, n, i) {
  return r > i ? t(i) : r < 0 && t(0), n > i ? (i - r) / (n - r) : n < 0 ? r / (r - n) : 1;
}, Nn = function e(t, r) {
  r === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = r === !0 ? "auto" : r ? "pan-" + r + (ue.isTouch ? " pinch-zoom" : "") : "none", t === ct && e(ee, r);
}, en = {
  auto: 1,
  scroll: 1
}, Hu = function(t) {
  var r = t.event, n = t.target, i = t.axis, o = (r.changedTouches ? r.changedTouches[0] : r).target, u = o._gsap || v.core.getCache(o), s = Le(), f;
  if (!u._isScrollT || s - u._isScrollT > 2e3) {
    for (; o && o !== ee && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(en[(f = lt(o)).overflowY] || en[f.overflowX])); )
      o = o.parentNode;
    u._isScroll = o && o !== n && !Zt(o) && (en[(f = lt(o)).overflowY] || en[f.overflowX]), u._isScrollT = s;
  }
  (u._isScroll || i === "x") && (r.stopPropagation(), r._gsapAllow = !0);
}, os = function(t, r, n, i) {
  return ue.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: r,
    onWheel: i = i && Hu,
    onPress: i,
    onDrag: i,
    onScroll: i,
    onEnable: function() {
      return n && we(j, ue.eventTypes[0], fo, !1, !0);
    },
    onDisable: function() {
      return be(j, ue.eventTypes[0], fo, !0);
    }
  });
}, qu = /(input|label|select|textarea)/i, lo, fo = function(t) {
  var r = qu.test(t.target.tagName);
  (r || lo) && (t._gsapAllow = !0, lo = r);
}, Uu = function(t) {
  nn(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var r = t, n = r.normalizeScrollX, i = r.momentum, o = r.allowNestedScroll, u = r.onRelease, s, f, m = Ve(t.target) || ct, g = v.core.globals().ScrollSmoother, h = g && g.get(), d = At && (t.content && Ve(t.content) || h && t.content !== !1 && !h.smooth() && h.content()), c = Wt(m, fe), _ = Wt(m, Be), B = 1, $ = (ue.isTouch && z.visualViewport ? z.visualViewport.scale * z.visualViewport.width : z.outerWidth) / z.innerWidth, R = 0, K = Fe(i) ? function() {
    return i(s);
  } : function() {
    return i || 2.8;
  }, F, O, W = os(m, t.type, !0, o), w = function() {
    return O = !1;
  }, b = mt, q = mt, de = function() {
    f = zt(m, fe), q = lr(At ? 1 : 0, f), n && (b = lr(0, zt(m, Be))), F = Qt;
  }, x = function() {
    d._gsap.y = xr(parseFloat(d._gsap.y) + c.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, ae = function() {
    if (O) {
      requestAnimationFrame(w);
      var ce = xr(s.deltaY / 2), ie = q(c.v - ce);
      if (d && ie !== c.v + c.offset) {
        c.offset = ie - c.v;
        var a = xr((parseFloat(d && d._gsap.y) || 0) - c.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + a + ", 0, 1)", d._gsap.y = a + "px", c.cacheID = N.cache, xt();
      }
      return !0;
    }
    c.offset && x(), O = !0;
  }, T, Ke, X, ge, Ce = function() {
    de(), T.isActive() && T.vars.scrollY > f && (c() > f ? T.progress(1) && c(f) : T.resetTo("scrollY", f));
  };
  return d && v.set(d, {
    y: "+=0"
  }), t.ignoreCheck = function(H) {
    return At && H.type === "touchmove" && ae() || B > 1.05 && H.type !== "touchstart" || s.isGesturing || H.touches && H.touches.length > 1;
  }, t.onPress = function() {
    O = !1;
    var H = B;
    B = xr((z.visualViewport && z.visualViewport.scale || 1) / $), T.pause(), H !== B && Nn(m, B > 1.01 ? !0 : n ? !1 : "x"), Ke = _(), X = c(), de(), F = Qt;
  }, t.onRelease = t.onGestureStart = function(H, ce) {
    if (c.offset && x(), !ce)
      ge.restart(!0);
    else {
      N.cache++;
      var ie = K(), a, le;
      n && (a = _(), le = a + ie * 0.05 * -H.velocityX / 0.227, ie *= co(_, a, le, zt(m, Be)), T.vars.scrollX = b(le)), a = c(), le = a + ie * 0.05 * -H.velocityY / 0.227, ie *= co(c, a, le, zt(m, fe)), T.vars.scrollY = q(le), T.invalidate().duration(ie).play(0.01), (At && T.vars.scrollY >= f || a >= f - 1) && v.to({}, {
        onUpdate: Ce,
        duration: ie
      });
    }
    u && u(H);
  }, t.onWheel = function() {
    T._ts && T.pause(), Le() - R > 1e3 && (F = 0, R = Le());
  }, t.onChange = function(H, ce, ie, a, le) {
    if (Qt !== F && de(), ce && n && _(b(a[2] === ce ? Ke + (H.startX - H.x) : _() + ce - a[1])), ie) {
      c.offset && x();
      var Vt = le[2] === ie, Ot = Vt ? X + H.startY - H.y : c() + ie - le[1], Ze = q(Ot);
      Vt && Ot !== Ze && (X += Ze - Ot), c(Ze);
    }
    (ie || ce) && xt();
  }, t.onEnable = function() {
    Nn(m, n ? !1 : "x"), k.addEventListener("refresh", Ce), we(z, "resize", Ce), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = _.smooth = !1), W.enable();
  }, t.onDisable = function() {
    Nn(m, !0), be(z, "resize", Ce), k.removeEventListener("refresh", Ce), W.kill();
  }, t.lockAxis = t.lockAxis !== !1, s = new ue(t), s.iOS = At, At && !c() && c(1), At && v.ticker.add(mt), ge = s._dc, T = v.to(s, {
    ease: "power4",
    paused: !0,
    scrollX: n ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: is(c, c(), function() {
        return T.pause();
      })
    },
    onUpdate: xt,
    onComplete: ge.vars.onComplete
  }), s;
};
k.sort = function(e) {
  return D.sort(e || function(t, r) {
    return (t.vars.refreshPriority || 0) * -1e6 + t.start - (r.start + (r.vars.refreshPriority || 0) * -1e6);
  });
};
k.observe = function(e) {
  return new ue(e);
};
k.normalizeScroll = function(e) {
  if (typeof e > "u")
    return qe;
  if (e === !0 && qe)
    return qe.enable();
  if (e === !1)
    return qe && qe.kill();
  var t = e instanceof ue ? e : Uu(e);
  return qe && qe.target === t.target && qe.kill(), Zt(t.target) && (qe = t), t;
};
k.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: Vn,
  _inputObserver: os,
  _scrollers: N,
  _proxies: _t,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      rt || er("scrollStart"), rt = Le();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Me;
    }
  }
};
Qo() && v.registerPlugin(k);
function Gu(e = 100) {
  return (t) => Math.floor(t * e) / e;
}
M.registerPlugin(k);
class ss extends $r {
  static create(t, r = {}, n = {}) {
    return new ss(t, r, n);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(t) {
    this.meta.speed = t;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(t) {
    this.meta.velocity = t;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(t) {
    this.meta.direction = t;
  }
  constructor(t, r = {}, n = {}) {
    super(
      (i) => {
        var T, Ke;
        Object.assign(i.meta, {
          speed: r.speed ?? 1,
          velocity: r.velocity ?? 0,
          direction: r.direction || "rtl",
          onCreated: r.onCreated,
          onUpdate: r.onUpdate
        }), i.meta.scrollTrigger = k.create(r.scrollTrigger ?? {});
        let o = null;
        typeof t == "string" ? o = document.querySelector(t) : t instanceof HTMLElement && (o = t);
        const u = r.createDOMContainers != null ? r.createDOMContainers : !0, s = u ? document.createElement("div") : o == null ? void 0 : o.querySelector(".owow-marquee-outer");
        s == null || s.classList.add("owow-marquee-outer");
        const f = u ? document.createElement("div") : s == null ? void 0 : s.querySelector(".owow-marquee-inner");
        if (f == null || f.classList.add("owow-marquee-inner"), !o || !s || !f)
          throw console.error({
            targetContainer: o,
            outerContainer: s,
            innerContainer: f
          }), new Error("Invalid marquee DOM structure");
        i.meta.sourceDOM = o.cloneNode(!0), i.meta.target = o, f.append(...o.childNodes), s.append(f), o == null || o.append(s), M.set(f, { display: "inline-flex" });
        const m = o.getBoundingClientRect(), g = f.getBoundingClientRect(), h = m.width + g.width, d = document.createDocumentFragment(), c = [];
        let _ = g.width;
        if (!h || !_)
          return;
        for (; _ <= h; ) {
          const X = f.cloneNode(!0);
          _ += g.width, c.push(X);
        }
        d.append(...c), s.append(d);
        const B = M.context(() => {
          M.set(s, {
            x: 0,
            force3D: !0,
            width: _,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), $ = M.utils.pipe(
          (X) => Math.floor(X * 1e3) / 1e3,
          M.quickSetter(s, "x", "px")
        ), R = M.utils.wrap(0, -g.width), K = M.utils.normalize(0, -g.width);
        let F, O, W, w, b, q, de, x;
        const ae = M.ticker.add(() => {
          var X, ge;
          switch (x = M.ticker.deltaRatio(), O = M.utils.interpolate(
            O ?? 0,
            i.meta.scrollTrigger.getVelocity(),
            0.5 * x
          ), W = O * i.meta.velocity, i.meta.direction) {
            case "ltr":
              F = -1, W = -Math.abs(W);
              break;
            case "rtl":
              F = 1, W = Math.abs(W);
              break;
            case "scroll":
              F = i.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              F = -(i.meta.scrollTrigger.direction ?? 1), W = -W;
          }
          w = M.getProperty(s, "x"), b = i.meta.speed * -F, q = (b - W) * x, de = R(w + q), $(de), (ge = (X = i.meta).onUpdate) == null || ge.call(X, K(de));
        });
        return (Ke = (T = i.meta).onCreated) == null || Ke.call(T), () => {
          var X;
          for (B.kill(!0), M.ticker.remove(ae), o == null || o.replaceChildren(...i.meta.sourceDOM.childNodes); c.length; )
            (X = c.pop()) == null || X.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...n
      }
    );
  }
}
M.registerPlugin(k);
const { wrap: ju, normalize: Qu, interpolate: Ku } = M.utils, Zu = { display: "inline-flex" }, Ju = "owow-marquee-outer", ea = "owow-marquee-inner";
function ma(e, t = {}, r = {}) {
  const n = L(
    t,
    Q,
    Oo(["onUpdate", "onCreated"])
  ), i = L(
    t,
    Q,
    Mo(["onUpdate", "onCreated"]),
    Wr(Y(Mt, Q)),
    mn
  ), o = ft(() => k.create(i.scrollTriggerVars ?? {})), u = wn(e), s = Y(
    Qe(ia(i.createDOM ?? !0)),
    Qe(
      Y(
        Oe(ra),
        Oe(ta(i, n, o()))
      )
    ),
    at("create marquee instances", { config: i })
  );
  return yn(() => {
    const m = s(u);
    return () => L(
      m,
      at(),
      Ft(Lt((g) => g.revert()))
    );
  }, Q(r));
}
function ta(e, t, r) {
  const n = ft(tu());
  let i = 0;
  return (o) => {
    const u = (w = o.rects.innerRect.width, b = o.rects.boundingWidth) => L(
      w > 0 && b > 0,
      fr(gs, new Error("Zero width")),
      Oe(
        Y(
          () => w <= b,
          vn(() => {
            const q = o.dom.innerContainer.cloneNode(!0);
            return i = w + o.rects.innerRect.width, n().append(q), u(i, b), n();
          }, n)
        )
      )
    ), s = M.quickSetter(o.dom.outerContainer, "x", "px"), f = Y(Gu(1e3), s), m = ju(0, -o.rects.innerRect.width), g = Qu(0, -o.rects.innerRect.width);
    let h, d, c, _, B, $, R, K;
    const F = ft(
      () => M.ticker.add(() => {
        var w;
        switch (d = M.ticker.deltaRatio(), _ = Ku(
          _ ?? 0,
          r.getVelocity(),
          0.5 * d
        ), c = _ * (e.scrollVelocity || 0), e.direction || "rtl") {
          case "ltr":
            h = -1, c = -Math.abs(c);
            break;
          case "rtl":
            h = 1, c = Math.abs(c);
            break;
          case "scroll":
            h = r.direction ?? 1;
            break;
          case "scroll-reverse":
            h = -(r.direction ?? 1), c = -c;
        }
        B = M.getProperty(o.dom.outerContainer, "x"), $ = (e.speed || 1) * -h, R = ($ - c) * d, K = m(B + R), f(K), (w = t.onUpdate) == null || w.call(t, g(K));
      })
    );
    Y(
      u,
      Oe(eu(o.dom.outerContainer)),
      Lt(
        (w) => M.set(w, {
          x: 0,
          force3D: !0,
          width: i,
          display: "flex",
          flexWrap: "nowrap"
        })
      ),
      F,
      () => {
        var w;
        return (w = t.onCreated) == null ? void 0 : w.call(t);
      }
    )();
    function W() {
      M.ticker.remove(F()), o.dom.target.replaceChildren(...o.dom.targetClone.childNodes);
    }
    return Object.freeze({ revert: W });
  };
}
function ra(e) {
  return {
    dom: e,
    rects: na(e)
  };
}
function na({ target: e, innerContainer: t }) {
  const r = e.getBoundingClientRect(), n = t.getBoundingClientRect();
  return {
    targetRect: r,
    innerRect: n,
    boundingWidth: r.width + n.width
  };
}
function ia(e) {
  const t = Vr();
  return (r) => {
    const n = L(
      r,
      go(!!e, Ju),
      St(t)
    ), i = L(
      n,
      Os(go(!!e, ea)),
      St(t)
    );
    return L(
      [n, i],
      Qe(Cs),
      ([u, s]) => Ns(u, s),
      So(([u, s]) => ({
        target: r,
        outerContainer: u,
        innerContainer: s,
        targetClone: r.cloneNode(!0)
      })),
      Jn(({ target: u, innerContainer: s, outerContainer: f }) => {
        ho(!!e, Boolean, () => {
          s.append(...u.childNodes), f.append(s), u.append(f);
        }), M.set(s, Zu);
      }),
      _n(new Error("Invalid marquee DOM.")),
      St(t)
    );
  };
}
function go(e, t) {
  return Y(
    hn(() => e, ti("div"), Do(`.${t}`)),
    _n(
      new Error(
        e ? "Could not create marquee container." : `Could not find marquee container .${t}`
      )
    ),
    Lt((r) => r.classList.add(t))
  );
}
class us extends $r {
  constructor(t, r = {}, n = {}) {
    super(async (i, o) => {
      const u = us.SplitText;
      if (!u)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      const s = M.utils.toArray(t);
      for (const d of s)
        if (!(d instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const f = i.meta.childSplit = new u(t, {
        type: "lines",
        linesClass: "owow-split-child",
        ...Q(r.childSplitVars)
      }), m = i.meta.parentSplit = new u(t, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...Q(r.parentSplitVars)
      }), g = {
        y: (d, c) => {
          const _ = parseFloat(getComputedStyle(c).lineHeight);
          return isNaN(_) ? M.getProperty(c, "height") : _;
        },
        ...Q(r.fromVars)
      }, h = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...Q(r.toVars)
      };
      return o.add(() => {
        i.meta.setup = M.set(m.lines, { overflow: "hidden" }), i.meta.tween = M.fromTo(f.lines, g, h);
      }), () => {
        f.revert(), o.kill(!0);
      };
    }, n);
  }
}
function _a(e, t, r = {}) {
  const n = L(
    t,
    Q,
    Wr(Y(Mt, Q)),
    mn
  ), i = _n(
    n.SplitText,
    new Error("Missing `SplitText` GSAP member plugin.")
  ), o = Y(
    wn,
    at(),
    Qe(
      (m) => L(
        i,
        Oe((g) => ({
          childSplit: new g(m, {
            type: "lines",
            linesClass: "owow-split-child",
            ...n.childSplitVars
          }),
          parentSplit: new g(m, {
            type: "lines",
            linesClass: "owow-split-parent",
            ...n.parentSplitVars
          })
        })),
        St(Vr())
      )
    )
  ), u = {
    y: (m, g) => {
      const h = parseFloat(getComputedStyle(g).lineHeight);
      return isNaN(h) ? M.getProperty(g, "height") : h;
    },
    ...n.fromVars
  }, s = {
    y: 0,
    stagger: { each: 0.05 },
    duration: 0.8,
    ease: "power2.inOut",
    ...n.toVars
  };
  return yn(() => {
    const m = o(e), g = M.context(() => {
      _o(
        m,
        Lt(({ parentSplit: h, childSplit: d }) => {
          M.set(h.lines, { overflow: "hidden" }), M.fromTo(d.lines, u, s);
        })
      );
    });
    return () => {
      Ft(
        m,
        Lt(({ childSplit: h }) => h.revert())
      ), g.kill(!0);
    };
  }, Q(r));
}
M.registerPlugin(k);
function oa(e, t = {}, r = {}) {
  const n = L(t, Q, Oo(["updater"])), i = L(
    t,
    Q,
    Mo(["updater"]),
    Wr(Y(Mt, Q)),
    mn
  ), o = (g) => () => g.progress, u = (g = 1) => (h) => n.updater ? n.updater(h, g) : M.utils.interpolate(100 * g, -100 * g, h), s = (g, h, d) => Y(o(g), u(d), h, Cr), f = Y(
    wn,
    Qe(
      sa(i.createDOM ?? !0, "owow-parallax-outer", "owow-parallax-inner")
    ),
    Qe(
      Oe((g) => {
        const h = k.create({
          trigger: g.outer,
          start: "top bottom",
          end: "bottom top",
          ...i.scrollTriggerVars
        }), d = M.quickSetter(g.inner, "y", i.cssUnit ?? "%"), c = M.quickSetter(g.inner, "x", i.cssUnit ?? "%"), _ = ru(g.inner, "data-parallax-speed");
        return Object.freeze({
          dom: g,
          scrollTrigger: h,
          updateY: s(h, d, _ ?? i.speed),
          updateX: s(h, c, _ ?? i.speed),
          destroy: () => h.kill(),
          revert: () => g.outer.replaceWith(g.original)
        });
      })
    ),
    Qe(zn),
    Lr(Br)
  );
  return yn(() => {
    const g = f(e), h = M.ticker.add(() => {
      Ft(g, ({ updateY: d }) => {
        d();
      });
    });
    return () => {
      M.ticker.remove(h), Ft(g, (d) => {
        d.revert(), d.destroy();
      });
    };
  }, Q(r));
}
function sa(e, t, r) {
  const n = Y(
    ti("div"),
    jn((i) => i.classList.add(t))
  );
  return Y(
    hn(
      () => e,
      (i) => {
        const o = Ao(i), u = i.cloneNode(!0), s = n();
        return u.classList.add(r), s.append(u), o(s), wo({
          inner: u,
          outer: s,
          original: i
        });
      },
      (i) => L(
        i,
        fr(
          ua(t, r),
          new Error("Invalid DOM structure for parallax")
        ),
        St(Vr()),
        Oe(() => ({
          inner: i.firstElementChild,
          outer: i,
          original: i
        }))
      )
    )
  );
}
function ua(e, t) {
  return (r) => {
    var n;
    return Kn(
      [
        r.children.length === 1,
        r.classList.contains(e),
        (n = r.firstElementChild) == null ? void 0 : n.classList.contains(t)
      ],
      Boolean
    );
  };
}
function va(e, t = {}, r = {}) {
  const n = L(
    t,
    Q,
    Wr(Y(Mt, Q)),
    mn
  ), i = n.size ?? 1.5, o = Y(
    wn,
    Qe(aa(n.createDOM ?? !0, "owow-diorama-outer", "owow-diorama-inner")),
    Qe(
      Oe(
        (s) => Object.freeze({
          dom: s,
          outerRect: s.outer.getBoundingClientRect(),
          revert: () => {
            s.outer.replaceWith(s.original);
          }
        })
      )
    )
  );
  return yn(() => {
    const s = o(e), f = M.context(() => {
      L(
        Qe(s, zn),
        Lr(Br),
        Ft(({ dom: g, outerRect: h }) => {
          M.set(g.outer, { height: h.height, overflow: "hidden" }), M.set(g.inner, { height: h.height * i });
        })
      );
    }), m = L(
      Qe(
        s,
        Y(
          Oe((g) => {
            const h = M.utils.interpolate(
              -(g.outerRect.height * i - g.outerRect.height),
              0
            );
            return oa(g.dom.inner, {
              cssUnit: "px",
              updater: h
            });
          }),
          zn
        )
      ),
      Lr(Br)
    );
    return () => {
      f.kill(!0), Ft(m, (g) => g());
    };
  }, Q(r));
}
function aa(e, t, r) {
  const n = Y(
    ti("div"),
    jn((i) => i.classList.add(t))
  );
  return Y(
    hn(
      () => e,
      (i) => {
        const o = Ao(i), u = i.cloneNode(!0), s = n();
        return u.classList.add(r), s.append(u), o(s), wo({
          inner: u,
          outer: s,
          original: i
        });
      },
      (i) => L(
        i,
        fr(
          ca(t, r),
          new Error("Invalid DOM structure for diorama")
        ),
        St(Vr()),
        Oe(() => ({
          inner: i.firstElementChild,
          outer: i,
          original: i
        }))
      )
    )
  );
}
function ca(e, t) {
  return (r) => {
    var n;
    return Kn(
      [
        r.children.length === 1,
        r.classList.contains(e),
        (n = r.firstElementChild) == null ? void 0 : n.classList.contains(t)
      ],
      Boolean
    );
  };
}
export {
  da as Ease,
  ss as Marquee,
  $r as Motion,
  Io as Pointer,
  pa as SecondOrderDynamics,
  us as TextClipReveal,
  va as createDiorama,
  ma as createMarquee,
  yn as createMotion,
  oa as createParallax,
  Pu as createPhysicsBasedMotion,
  _a as createTextClipReveal,
  Mu as getMousePosition,
  ga as mousePosition,
  ha as physicsBasedMotion
};
