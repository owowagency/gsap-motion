import { fromEventPattern as qn, fromEvent as un, noop as ss, debounceTime as lo, Observable as si, BehaviorSubject as us, skip as as, map as ui } from "rxjs";
import { gsap as M } from "gsap";
const Sn = 1.70158, Tn = 0.7, la = {
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
  inBack: (e, t = Sn) => e * e * ((t + 1) * e - t),
  /**
   * Easing function that starts fast, decelerates beyond the destination and then settles back to the destination.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  outBack: (e, t = Sn) => {
    const r = e / 1 - 1;
    return r * r * ((t + 1) * r + t) + 1;
  },
  /**
   * Easing function that combines inBack and outBack, creating a start and end beyond the destination with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inOutBack: (e, t = Sn) => {
    const r = e * 2, n = r - 2, i = t * 1.525;
    return r < 1 ? 0.5 * r * r * ((i + 1) * r - i) : 0.5 * (n * n * ((i + 1) * n + i) + 2);
  },
  /**
   * Easing function that starts slow, accelerates, overshoots the destination and then oscillates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inElastic: (e, t = Tn) => {
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
  outElastic: (e, t = Tn) => {
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
  inOutElastic: (e, t = Tn) => {
    if (e === 0 || e === 1)
      return e;
    const r = 1 - t, n = e * 2, i = n - 1, o = r / (2 * Math.PI) * Math.asin(1);
    return n < 1 ? -0.5 * (2 ** (10 * i) * Math.sin((i - o) * (2 * Math.PI) / r)) : 2 ** (-10 * i) * Math.sin((i - o) * (2 * Math.PI) / r) * 0.5 + 1;
  }
};
function F() {
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
function cs(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function ls(e) {
  if (!(e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0))
    return e;
  var t = e.BS_PRIVATE_NESTED_SOME_NONE;
  if (t !== 0)
    return {
      BS_PRIVATE_NESTED_SOME_NONE: t - 1 | 0
    };
}
function fs(e) {
  return e;
}
function ai(e, t, r, n) {
  return t(e) ? r(e) : n(e);
}
function Un() {
  if (arguments.length === 3) {
    const e = arguments;
    return function(r) {
      return ai(r, e[0], e[1], e[2]);
    };
  }
  return ai(arguments[0], arguments[1], arguments[2], arguments[3]);
}
function Cr(e) {
}
function ci(e, t, r) {
  return t(e) ? r(e) : e;
}
function fo() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return ci(r, e[0], e[1]);
    };
  }
  return ci(arguments[0], arguments[1], arguments[2]);
}
function li(e, t) {
  return t(e), e;
}
function go() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return li(r, e[0]);
    };
  }
  return li(arguments[0], arguments[1]);
}
function ft(e) {
  var t = {
    contents: void 0
  };
  return function(...r) {
    var n = t.contents;
    if (n !== void 0)
      return ls(n);
    var i = e(...r);
    return t.contents = cs(i), i;
  };
}
function hn(e) {
  return e;
}
function ds(e, t) {
  if (e <= 0)
    return [];
  for (var r = new Array(e), n = 0; n < e; ++n)
    r[n] = t;
  return r;
}
function Gn(e, t) {
  for (var r = 0, n = e.length; r < n; ++r)
    t(e[r]);
}
function gs(e, t) {
  for (var r = e.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = t(e[i]);
  return n;
}
function hs(e, t, r) {
  for (var n = t, i = 0, o = e.length; i < o; ++i)
    n = r(n, e[i]);
  return n;
}
function ps(e, t) {
  for (var r = e.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !0;
    if (!t(e[i]))
      return !1;
    n = i + 1 | 0;
  }
}
function ms(e, t) {
  for (var r = e.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !1;
    if (t(e[i]))
      return !0;
    n = i + 1 | 0;
  }
}
var fi = ds;
function ho() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return fi(r, e[0]);
    };
  }
  return fi(arguments[0], arguments[1]);
}
function _s(e) {
  return e.length !== 0;
}
function di(e, t) {
  return gs(e, t);
}
function tt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return di(r, e[0]);
    };
  }
  return di(arguments[0], arguments[1]);
}
function gi(e, t) {
  for (var r = 0, n = []; r < e.length; ) {
    var i = e[r];
    t(i) && n.push(i), r = r + 1 | 0;
  }
  return n;
}
function an() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return gi(r, e[0]);
    };
  }
  return gi(arguments[0], arguments[1]);
}
var hi = ms;
function vs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return hi(r, e[0]);
    };
  }
  return hi(arguments[0], arguments[1]);
}
var pi = Gn;
function Ft() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return pi(r, e[0]);
    };
  }
  return pi(arguments[0], arguments[1]);
}
function Nn(e) {
  return hs(e, [], function(t, r) {
    return Array.isArray(r) ? Gn(r, function(n) {
      t.push(n);
    }) : t.push(r), t;
  });
}
function mi(e, t) {
  return Gn(e, t), e;
}
function po() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return mi(r, e[0]);
    };
  }
  return mi(arguments[0], arguments[1]);
}
function _i(e, t) {
  return ps(e, t);
}
function mo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return _i(r, e[0]);
    };
  }
  return _i(arguments[0], arguments[1]);
}
function vi(e, t, r) {
  for (var n = new Array(r), i = 0, o = t; i < r; )
    n[i] = e[o], i = i + 1 | 0, o = o + 1 | 0;
  return n;
}
function _o(e, t) {
  for (; ; ) {
    var r = t, n = e, i = n.length, o = i === 0 ? 1 : i, u = r.length, s = o - u | 0;
    if (s === 0)
      return n.apply(null, r);
    if (s >= 0)
      return function(f, p) {
        return function(m) {
          return _o(f, p.concat([m]));
        };
      }(n, r);
    t = vi(r, o, -s | 0), e = n.apply(null, vi(r, 0, o));
  }
}
function bs(e, t) {
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
      return _o(e, [t]);
  }
}
function ws(e) {
  var t = e.length;
  return t === 1 ? e : function(r) {
    return bs(e, r);
  };
}
function ys(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function Es(e, t) {
  return e.TAG === 0 ? {
    TAG: 0,
    _0: t(e._0)
  } : {
    TAG: 1,
    _0: e._0
  };
}
function vo(e, t) {
  return e.TAG === 0 ? t(e._0) : {
    TAG: 1,
    _0: e._0
  };
}
function Ss(e, t) {
  return vo(e, ws(t));
}
function Ts(e, t) {
  return e.TAG === 0 ? e._0 : t;
}
function bi(e, t) {
  return e == null ? {
    TAG: 1,
    _0: t
  } : {
    TAG: 0,
    _0: e
  };
}
function pn() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return bi(r, e[0]);
    };
  }
  return bi(arguments[0], arguments[1]);
}
function wi(e, t, r) {
  return Ss(pn(e, r), function(n) {
    return t(n) ? {
      TAG: 0,
      _0: n
    } : {
      TAG: 1,
      _0: r
    };
  });
}
function Or() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return wi(r, e[0], e[1]);
    };
  }
  return wi(arguments[0], arguments[1], arguments[2]);
}
var yi = Es;
function We() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return yi(r, e[0]);
    };
  }
  return yi(arguments[0], arguments[1]);
}
var Ei = vo;
function xs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ei(r, e[0]);
    };
  }
  return Ei(arguments[0], arguments[1]);
}
function Si(e) {
  return Ts(e, void 0);
}
function Ms(e) {
  if (e.TAG === 0)
    return ys(e._0);
}
function Ti(e, t) {
  return e.TAG !== 0 || t(e._0), e;
}
function zt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ti(r, e[0]);
    };
  }
  return Ti(arguments[0], arguments[1]);
}
function xi(e, t) {
  return e.TAG === 0 || t(e._0), e;
}
function Lt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return xi(r, e[0]);
    };
  }
  return xi(arguments[0], arguments[1]);
}
var Cs = (e) => ({
  TAG: 0,
  _0: e
});
function bo(e) {
  return typeof e == "string";
}
function Mi(e) {
  return typeof e == "function";
}
function cn(e) {
  return e != null;
}
function jn(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function Os(e) {
  if (e != null)
    return jn(e);
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
function ks(e, t) {
  if (e !== void 0)
    return jn(t(Kt(e)));
}
function Ps(e, t) {
  if (e !== void 0)
    return t(Kt(e));
}
function Rs(e, t) {
  return e !== void 0 ? Kt(e) : t;
}
function xt(e) {
  if (e != null)
    return jn(e);
}
var Ci = ks;
function wo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ci(r, e[0]);
    };
  }
  return Ci(arguments[0], arguments[1]);
}
var Oi = Ps;
function yo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Oi(r, e[0]);
    };
  }
  return Oi(arguments[0], arguments[1]);
}
function ki(e, t) {
  if (e !== void 0)
    return Os(t(Kt(e)));
}
function Ds() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return ki(r, e[0]);
    };
  }
  return ki(arguments[0], arguments[1]);
}
function Eo(e) {
  return Rs(e, void 0);
}
function Pi(e, t) {
  return e !== void 0 && t(Kt(e)), e;
}
function Qn() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Pi(r, e[0]);
    };
  }
  return Pi(arguments[0], arguments[1]);
}
function Ri(e, t) {
  if (e !== void 0 && t !== void 0)
    return [
      Kt(e),
      Kt(t)
    ];
}
function As() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ri(r, e[0]);
    };
  }
  return Ri(arguments[0], arguments[1]);
}
var Ns = (e) => e, Is = void 0, zs = function(e, t) {
  delete e[t];
};
function Kn(e) {
  for (var t = {}, r = e.length, n = 0; n < r; ++n) {
    var i = e[n];
    t[i[0]] = i[1];
  }
  return t;
}
function Ls(e, t) {
  for (var r = e.length, n = t.length, i = new Array(r + n | 0), o = 0; o < r; ++o)
    i[o] = e[o];
  for (var u = 0; u < n; ++u)
    i[r + u | 0] = t[u];
  return i;
}
function Bs(e, t) {
  for (var r = 0, n = e.length; r < n; ++r)
    t(e[r]);
}
function So(e, t) {
  for (var r = e.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = t(e[i]);
  return n;
}
function Fs(e, t, r) {
  for (var n = t, i = 0, o = e.length; i < o; ++i)
    n = r(n, e[i]);
  return n;
}
function Di(e, t) {
  return Ls(e, [t]);
}
function Vs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Di(r, e[0]);
    };
  }
  return Di(arguments[0], arguments[1]);
}
function Ws(e) {
  return Object.entries(e);
}
function Ai(e, t) {
  return Object.assign({}, e, t);
}
function $s() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ai(r, e[0]);
    };
  }
  return Ai(arguments[0], arguments[1]);
}
function Ni(e, t) {
  var r = $s({}, e);
  return Bs(t, function(n) {
    return zs(r, n);
  }), r;
}
function To() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ni(r, e[0]);
    };
  }
  return Ni(arguments[0], arguments[1]);
}
function Ii(e, t) {
  return Kn(So(Object.keys(e), function(r) {
    var n = t(e[r]);
    return [
      r,
      n
    ];
  }));
}
function Br() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ii(r, e[0]);
    };
  }
  return Ii(arguments[0], arguments[1]);
}
function zi(e, t) {
  return Kn(So(Object.keys(e), function(r) {
    var n = t(r, e[r]);
    return [
      r,
      n
    ];
  }));
}
function Li() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return zi(r, e[0]);
    };
  }
  return zi(arguments[0], arguments[1]);
}
function Bi(e, t) {
  return Kn(Fs(Object.keys(e), [], function(r, n) {
    var i = e[n];
    return t(n, i) ? Vs(r, [
      n,
      i
    ]) : r;
  }));
}
function Ys() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Bi(r, e[0]);
    };
  }
  return Bi(arguments[0], arguments[1]);
}
function Fi(e, t) {
  return Ys(e, function(r, n) {
    return t.includes(r);
  });
}
function xo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Fi(r, e[0]);
    };
  }
  return Fi(arguments[0], arguments[1]);
}
function Vi(e, t, r) {
  return e ? t(void 0) : r(void 0);
}
function mn() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return Vi(r, e[0], e[1]);
    };
  }
  return Vi(arguments[0], arguments[1], arguments[2]);
}
function Q(e, ...t) {
  return !vs(
    ["SplitText"],
    (n) => Mi(e) && e.name === n
  ) && Mi(e) ? e.call(null, t) : e;
}
function Xs(e) {
  return () => e;
}
function _n() {
  return ft(() => globalThis);
}
function Hs() {
  const e = _n();
  return ft(() => e().document.documentElement);
}
function qs() {
  const e = _n();
  return ft(() => e().screen);
}
function Us(e) {
  return new Map(e);
}
function Mo(e) {
  return ft(() => Us(e == null ? void 0 : e()));
}
function Wi(e) {
  return (t) => e.get(t);
}
function $i(e) {
  return (t, r) => e.set(t, r);
}
const Gs = () => {
};
function Co(e) {
  let t = e;
  return Object.freeze({
    getValue: () => t,
    setValue: (r) => t = r
  });
}
function vn() {
  return (e) => console.error(String(e));
}
function at(e, ...t) {
  return go(
    Cr
  );
}
function xn(e, ...t) {
}
function Oo() {
  const e = _n(), t = Co(!0), r = M.ticker.add(() => void t.setValue(!0)), n = (i) => (o) => F(
    t.getValue(),
    at,
    fo(Boolean, () => {
      t.setValue(!1), i(o);
    })
  );
  return ft(
    () => qn(
      (i) => {
        e().addEventListener("resize", n(i), { passive: !0 });
      },
      (i) => {
        M.ticker.remove(r), e().removeEventListener("resize", n(i));
      }
    )
  );
}
function js() {
  return ft(() => un(globalThis, "mousemove", { passive: !0 }));
}
function Qs() {
  return ft((e) => {
    const t = /* @__PURE__ */ new Set(), r = new ResizeObserver(() => t.forEach((i) => i()));
    return qn(
      (i) => (Ft(e, r.observe.bind(r)), t.add(i), r),
      (i) => {
        Ft(e, r.unobserve.bind(r)), t.delete(i);
      }
    );
  });
}
function Ks(e) {
  return qn(
    (t) => {
      e.addEventListener("change", t, { passive: !0 });
    },
    (t) => {
      e.removeEventListener("change", t);
    }
  );
}
function ko(e) {
  return F(
    xt(e),
    Ds(
      Y(
        bo,
        mn(
          Po(e),
          Xs(e)
        )
      )
    ),
    Eo
  );
}
function Po(e) {
  return (t = document) => t == null ? void 0 : t.querySelector(e);
}
function Zs(e) {
  return (t = document) => Array.from(t.querySelectorAll(e));
}
function Ro(e, t) {
  return () => document.createElement(e, t);
}
function Js(e) {
  return (...t) => (e.append(...t), e);
}
function eu(e) {
  return (...t) => {
    e.replaceWith(...t);
  };
}
function tu() {
  return () => document.createDocumentFragment();
}
function bn(e) {
  return F(
    ho(1, Q(e)),
    Nn,
    tt(
      (t) => F(
        t,
        bo,
        mn(Zs(t), () => [ko(t)])
      )
    ),
    Nn,
    an(cn)
  );
}
function ru(e, t) {
  return F(
    xt(e.getAttribute(t)),
    wo(parseFloat),
    yo((r) => isNaN(r) ? Is : Ns(r)),
    Eo
  );
}
var Vr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function nu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var iu = "Expected a function", Yi = 0 / 0, ou = "[object Symbol]", su = /^\s+|\s+$/g, uu = /^[-+]0x[0-9a-f]+$/i, au = /^0b[01]+$/i, cu = /^0o[0-7]+$/i, lu = parseInt, fu = typeof Vr == "object" && Vr && Vr.Object === Object && Vr, du = typeof self == "object" && self && self.Object === Object && self, gu = fu || du || Function("return this")(), hu = Object.prototype, pu = hu.toString, mu = Math.max, _u = Math.min, Mn = function() {
  return gu.Date.now();
};
function vu(e, t, r) {
  var n, i, o, u, s, f, p = 0, m = !1, g = !1, d = !0;
  if (typeof e != "function")
    throw new TypeError(iu);
  t = Xi(t) || 0, In(r) && (m = !!r.leading, g = "maxWait" in r, o = g ? mu(Xi(r.maxWait) || 0, t) : o, d = "trailing" in r ? !!r.trailing : d);
  function c(w) {
    var b = n, q = i;
    return n = i = void 0, p = w, u = e.apply(q, b), u;
  }
  function _(w) {
    return p = w, s = setTimeout(R, t), m ? c(w) : u;
  }
  function L(w) {
    var b = w - f, q = w - p, de = t - b;
    return g ? _u(de, o - q) : de;
  }
  function $(w) {
    var b = w - f, q = w - p;
    return f === void 0 || b >= t || b < 0 || g && q >= o;
  }
  function R() {
    var w = Mn();
    if ($(w))
      return K(w);
    s = setTimeout(R, L(w));
  }
  function K(w) {
    return s = void 0, d && n ? c(w) : (n = i = void 0, u);
  }
  function B() {
    s !== void 0 && clearTimeout(s), p = 0, n = f = i = s = void 0;
  }
  function C() {
    return s === void 0 ? u : K(Mn());
  }
  function V() {
    var w = Mn(), b = $(w);
    if (n = arguments, i = this, f = w, b) {
      if (s === void 0)
        return _(f);
      if (g)
        return s = setTimeout(R, t), c(f);
    }
    return s === void 0 && (s = setTimeout(R, t)), u;
  }
  return V.cancel = B, V.flush = C, V;
}
function In(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function bu(e) {
  return !!e && typeof e == "object";
}
function wu(e) {
  return typeof e == "symbol" || bu(e) && pu.call(e) == ou;
}
function Xi(e) {
  if (typeof e == "number")
    return e;
  if (wu(e))
    return Yi;
  if (In(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = In(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(su, "");
  var r = au.test(e);
  return r || cu.test(e) ? lu(e.slice(2), r ? 2 : 8) : uu.test(e) ? Yi : +e;
}
var yu = vu;
const Eu = /* @__PURE__ */ nu(yu), Do = class {
  constructor(e, t = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = Eu(
      () => {
        var r;
        (r = this.cleanup) == null || r.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      Do.resetDebounceTime,
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
      return this.context = M.context(ss), [
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
      un(this.mediaQueryList, "change").subscribe(() => this.reset())
    ));
  }
  observeResize(e) {
    e && (this.motionResizeObserver = new Su(e), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(lo(100)).subscribe(() => this.reset())
    ));
  }
};
let Fr = Do;
Fr.resetDebounceTime = 100;
Fr.referenceFramerate = 60;
class Su {
  constructor(t) {
    const [r, n] = [t].flat();
    this.target = typeof r == "string" ? document.querySelector(r) : r, this.axis = n, this.target === window ? this.observable = new si((i) => {
      const o = () => this.handleWindowResize(i);
      return window.addEventListener("resize", o, { passive: !0 }), () => window.removeEventListener("resize", o);
    }) : this.observable = new si((i) => {
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
function wn(e, t = {}) {
  const r = F(t, Q, Br(Y(xt, Q))), n = Qs(), i = Co(Cr), o = new us(e);
  o.subscribe(() => {
    var d;
    i.getValue()(!1), i.setValue(
      F(
        [r.enable ?? !0, ((d = r.mediaQueryList) == null ? void 0 : d.matches) ?? !0],
        at(),
        mo(Boolean),
        at(),
        Un(
          (c) => c ?? !0,
          () => e() ?? Cr,
          () => Cr
        )
      )
    );
  });
  const u = (d) => (c) => F(
    c.pipe(as((d == null ? void 0 : d.skip) ?? 0), lo((d == null ? void 0 : d.debounce) ?? 300)).subscribe(
      Y(
        at(`run effect from subscription: ${d == null ? void 0 : d.name}`),
        () => o.next(e)
      )
    ),
    at()
  ), s = F(
    ho(1, r.observeElementResize),
    Nn,
    tt(ko),
    an(cn),
    po(
      xu("Observing the <body> for resizes may cause chain reactions.")
    )
  ), f = F(
    s,
    Or(_s, "No elements to observe."),
    We(n),
    We(
      Y(
        u({
          debounce: r.debounceTime,
          skip: 1,
          name: "element resize"
        }),
        at()
      )
    ),
    Lt(xn)
  ), p = F(
    r.observeWindowResize,
    Or(Boolean, "Window resize observing disabled."),
    We(Tu),
    We(
      Y(
        u({ debounce: r.debounceTime, name: "window resize" }),
        at()
      )
    ),
    Lt(xn)
  ), m = F(
    r.mediaQueryList,
    Or((d) => !!d, "Media query observing disabled."),
    We(Ks),
    We(
      Y(
        u({ debounce: r.debounceTime, name: "media query change" }),
        at()
      )
    ),
    Lt(xn)
  );
  function g() {
    zt(f, (d) => d.unsubscribe()), zt(p, (d) => d.unsubscribe()), zt(m, (d) => d.unsubscribe()), i.getValue()(!0);
  }
  return g;
}
const Tu = Oo();
function xu(e) {
  return (t) => F(
    mn(t.tagName === "BODY", () => `Warning: ${e}`, Gs),
    xt,
    Qn(vn())
  );
}
function St(e, t) {
  return { x: e, y: t };
}
function Zr(e, t) {
  return {
    ...e,
    nx: e.x / t.x,
    ny: e.y / t.y
  };
}
class Ao extends Fr {
  constructor() {
    super(
      (t) => {
        t.meta.observable = un(window, "mousemove"), t.subscriptions.push(
          t.meta.observable.subscribe((r) => {
            this.clientX = r.clientX, this.clientY = r.clientY, this.normalX = M.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = M.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), t.subscriptions.push(
          un(window, "resize").subscribe(() => {
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
    return this._instance ?? (this._instance = new Ao());
  }
  /**
   * Returns the observable for mouse events.
   */
  get observable() {
    return this.meta.observable;
  }
}
const Mu = ft(() => {
  const e = F(Hi(), Wi), t = F(Hi(), $i), r = F(qi(), Wi), n = F(qi(), $i), i = Cu().pipe(ui(Zn));
  return Ou().pipe(ui(ku)).subscribe(
    Y(
      Li(
        (u, s) => F(
          r(u),
          xt,
          wo((f) => Zr(s, f)),
          Qn((f) => t(u, f))
        )
      )
    )
  ), i.subscribe(Y(Li(n))), {
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
}), fa = Mu, Cu = Oo(), Ou = js(), Hi = Mo(
  Y(Zn, (e) => [
    ["client", Zr(St(0, 0), e.client)],
    ["page", Zr(St(0, 0), e.page)],
    ["screen", Zr(St(0, 0), e.screen)]
  ])
), qi = Mo(Y(Zn, Ws));
function ku(e) {
  return {
    client: St(e.clientX, e.clientY),
    page: St(e.pageX, e.pageY),
    screen: St(e.screenX, e.screenY)
  };
}
function Zn() {
  const e = Hs(), t = _n(), r = qs();
  return {
    client: St(t().innerWidth, t().innerHeight),
    page: St(e().scrollWidth, e().scrollHeight),
    screen: St(r().width, r().height)
  };
}
class da {
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
  let s = n, f = n, p = 0;
  function m(g, d) {
    const c = (d - s) / g, _ = Math.max(o, g * g / 2 + g * i / 2, g * i);
    return s = d, f = f + g * p, p = p + g * (d + u * c - f - i * p) / _, f;
  }
  return Object.freeze({ update: m });
}
const ga = Pu;
function Ui(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Ru(e, t, r) {
  return t && Ui(e.prototype, t), r && Ui(e, r), e;
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
var Se, zn, je, At, Nt, fr, No, qt, kr, Io, Et, st, zo, Lo = function() {
  return Se || typeof window < "u" && (Se = window.gsap) && Se.registerPlugin && Se;
}, Bo = 1, cr = [], N = [], _t = [], Pr = Date.now, Ln = function(t, r) {
  return r;
}, Du = function() {
  var t = kr.core, r = t.bridge || {}, n = t._scrollers, i = t._proxies;
  n.push.apply(n, N), i.push.apply(i, _t), N = n, _t = i, Ln = function(u, s) {
    return r[u](s);
  };
}, Bt = function(t, r) {
  return ~_t.indexOf(t) && _t[_t.indexOf(t) + 1][r];
}, Rr = function(t) {
  return !!~Io.indexOf(t);
}, Fe = function(t, r, n, i, o) {
  return t.addEventListener(r, n, {
    passive: !i,
    capture: !!o
  });
}, Ne = function(t, r, n, i) {
  return t.removeEventListener(r, n, !!i);
}, Wr = "scrollLeft", $r = "scrollTop", Bn = function() {
  return Et && Et.isPressed || N.cache++;
}, ln = function(t, r) {
  var n = function i(o) {
    if (o || o === 0) {
      Bo && (je.history.scrollRestoration = "manual");
      var u = Et && Et.isPressed;
      o = i.v = Math.round(o) || (Et && Et.iOS ? 1 : 0), t(o), i.cacheID = N.cache, u && Ln("ss", o);
    } else
      (r || N.cache !== i.cacheID || Ln("ref")) && (i.cacheID = N.cache, i.v = t());
    return i.v + i.offset;
  };
  return n.offset = 0, t && n;
}, Le = {
  s: Wr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: ln(function(e) {
    return arguments.length ? je.scrollTo(e, fe.sc()) : je.pageXOffset || At[Wr] || Nt[Wr] || fr[Wr] || 0;
  })
}, fe = {
  s: $r,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Le,
  sc: ln(function(e) {
    return arguments.length ? je.scrollTo(Le.sc(), e) : je.pageYOffset || At[$r] || Nt[$r] || fr[$r] || 0;
  })
}, Ve = function(t) {
  return Se.utils.toArray(t)[0] || (typeof t == "string" && Se.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, Vt = function(t, r) {
  var n = r.s, i = r.sc;
  Rr(t) && (t = At.scrollingElement || Nt);
  var o = N.indexOf(t), u = i === fe.sc ? 1 : 2;
  !~o && (o = N.push(t) - 1), N[o + u] || t.addEventListener("scroll", Bn);
  var s = N[o + u], f = s || (N[o + u] = ln(Bt(t, n), !0) || (Rr(t) ? i : ln(function(p) {
    return arguments.length ? t[n] = p : t[n];
  })));
  return f.target = t, s || (f.smooth = Se.getProperty(t, "scrollBehavior") === "smooth"), f;
}, Fn = function(t, r, n) {
  var i = t, o = t, u = Pr(), s = u, f = r || 50, p = Math.max(500, f * 3), m = function(_, L) {
    var $ = Pr();
    L || $ - u > f ? (o = i, i = _, s = u, u = $) : n ? i += _ : i = o + (_ - o) / ($ - s) * (u - s);
  }, g = function() {
    o = i = n ? 0 : i, s = u = 0;
  }, d = function(_) {
    var L = s, $ = o, R = Pr();
    return (_ || _ === 0) && _ !== i && m(_), u === s || R - s > p ? 0 : (i + (n ? $ : -$)) / ((n ? R : u) - L) * 1e3;
  };
  return {
    update: m,
    reset: g,
    getVelocity: d
  };
}, yr = function(t, r) {
  return r && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Gi = function(t) {
  var r = Math.max.apply(Math, t), n = Math.min.apply(Math, t);
  return Math.abs(r) >= Math.abs(n) ? r : n;
}, Fo = function() {
  kr = Se.core.globals().ScrollTrigger, kr && kr.core && Du();
}, Vo = function(t) {
  return Se = t || Lo(), Se && typeof document < "u" && document.body && (je = window, At = document, Nt = At.documentElement, fr = At.body, Io = [je, At, Nt, fr], Se.utils.clamp, zo = Se.core.context || function() {
  }, qt = "onpointerenter" in fr ? "pointer" : "mouse", No = ue.isTouch = je.matchMedia && je.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in je || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, st = ue.eventTypes = ("ontouchstart" in Nt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Nt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Bo = 0;
  }, 500), Fo(), zn = 1), zn;
};
Le.op = fe;
N.cache = 0;
var ue = /* @__PURE__ */ function() {
  function e(r) {
    this.init(r);
  }
  var t = e.prototype;
  return t.init = function(n) {
    zn || Vo(Se) || console.warn("Please gsap.registerPlugin(Observer)"), kr || Fo();
    var i = n.tolerance, o = n.dragMinimum, u = n.type, s = n.target, f = n.lineHeight, p = n.debounce, m = n.preventDefault, g = n.onStop, d = n.onStopDelay, c = n.ignore, _ = n.wheelSpeed, L = n.event, $ = n.onDragStart, R = n.onDragEnd, K = n.onDrag, B = n.onPress, C = n.onRelease, V = n.onRight, w = n.onLeft, b = n.onUp, q = n.onDown, de = n.onChangeX, x = n.onChangeY, ae = n.onChange, T = n.onToggleX, Qe = n.onToggleY, X = n.onHover, ge = n.onHoverEnd, Ce = n.onMove, H = n.ignoreCheck, ce = n.isNormalizer, ie = n.onGestureStart, a = n.onGestureEnd, le = n.onWheel, Wt = n.onEnable, Mt = n.onDisable, Ke = n.onClick, Ct = n.scrollSpeed, U = n.capture, Te = n.allowClicks, Oe = n.lockAxis, hr = n.onLockAxis;
    this.target = s = Ve(s) || Nt, this.vars = n, c && (c = Se.utils.toArray(c)), i = i || 1e-9, o = o || 0, _ = _ || 1, Ct = Ct || 1, u = u || "wheel,touch,pointer", p = p !== !1, f || (f = parseFloat(je.getComputedStyle(fr).lineHeight) || 22);
    var $e, Ze, I, he, Ye, dt, ke, l = this, vt = 0, G = 0, Ot = Vt(s, Le), kt = Vt(s, fe), tr = Ot(), Pe = kt(), pr = ~u.indexOf("touch") && !~u.indexOf("pointer") && st[0] === "pointerdown", Pt = Rr(s), te = s.ownerDocument || At, Xe = [0, 0, 0], Re = [0, 0, 0], mr = 0, De = function() {
      return mr = Pr();
    }, gt = function(E, h) {
      return (l.event = E) && c && ~c.indexOf(E.target) || h && pr && E.pointerType !== "touch" || H && H(E, h);
    }, _r = function() {
      l._vx.reset(), l._vy.reset(), Ze.pause(), g && g(l);
    }, Rt = function() {
      var E = l.deltaX = Gi(Xe), h = l.deltaY = Gi(Re), y = Math.abs(E) >= i, S = Math.abs(h) >= i;
      ae && (y || S) && ae(l, E, h, Xe, Re), y && (V && l.deltaX > 0 && V(l), w && l.deltaX < 0 && w(l), de && de(l), T && l.deltaX < 0 != vt < 0 && T(l), vt = l.deltaX, Xe[0] = Xe[1] = Xe[2] = 0), S && (q && l.deltaY > 0 && q(l), b && l.deltaY < 0 && b(l), x && x(l), Qe && l.deltaY < 0 != G < 0 && Qe(l), G = l.deltaY, Re[0] = Re[1] = Re[2] = 0), (he || I) && (Ce && Ce(l), I && (K(l), I = !1), he = !1), dt && !(dt = !1) && hr && hr(l), Ye && (le(l), Ye = !1), $e = 0;
    }, rr = function(E, h, y) {
      Xe[y] += E, Re[y] += h, l._vx.update(E), l._vy.update(h), p ? $e || ($e = requestAnimationFrame(Rt)) : Rt();
    }, $t = function(E, h) {
      Oe && !ke && (l.axis = ke = Math.abs(E) > Math.abs(h) ? "x" : "y", dt = !0), ke !== "y" && (Xe[2] += E, l._vx.update(E, !0)), ke !== "x" && (Re[2] += h, l._vy.update(h, !0)), p ? $e || ($e = requestAnimationFrame(Rt)) : Rt();
    }, Yt = function(E) {
      if (!gt(E, 1)) {
        E = yr(E, m);
        var h = E.clientX, y = E.clientY, S = h - l.x, P = y - l.y, pe = l.isDragging;
        l.x = h, l.y = y, (pe || Math.abs(l.startX - h) >= o || Math.abs(l.startY - y) >= o) && (K && (I = !0), pe || (l.isDragging = !0), $t(S, P), pe || $ && $(l));
      }
    }, A = l.onPress = function(O) {
      gt(O, 1) || O && O.button || (l.axis = ke = null, Ze.pause(), l.isPressed = !0, O = yr(O), vt = G = 0, l.startX = l.x = O.clientX, l.startY = l.y = O.clientY, l._vx.reset(), l._vy.reset(), Fe(ce ? s : te, st[1], Yt, m, !0), l.deltaX = l.deltaY = 0, B && B(l));
    }, bt = l.onRelease = function(O) {
      if (!gt(O, 1)) {
        Ne(ce ? s : te, st[1], Yt, !0);
        var E = !isNaN(l.y - l.startY), h = l.isDragging && (Math.abs(l.x - l.startX) > 3 || Math.abs(l.y - l.startY) > 3), y = yr(O);
        !h && E && (l._vx.reset(), l._vy.reset(), m && Te && Se.delayedCall(0.08, function() {
          if (Pr() - mr > 300 && !O.defaultPrevented) {
            if (O.target.click)
              O.target.click();
            else if (te.createEvent) {
              var S = te.createEvent("MouseEvents");
              S.initMouseEvent("click", !0, !0, je, 1, y.screenX, y.screenY, y.clientX, y.clientY, !1, !1, !1, !1, 0, null), O.target.dispatchEvent(S);
            }
          }
        })), l.isDragging = l.isGesturing = l.isPressed = !1, g && !ce && Ze.restart(!0), R && h && R(l), C && C(l, h);
      }
    }, nt = function(E) {
      return E.touches && E.touches.length > 1 && (l.isGesturing = !0) && ie(E, l.isDragging);
    }, it = function() {
      return (l.isGesturing = !1) || a(l);
    }, Je = function(E) {
      if (!gt(E)) {
        var h = Ot(), y = kt();
        rr((h - tr) * Ct, (y - Pe) * Ct, 1), tr = h, Pe = y, g && Ze.restart(!0);
      }
    }, ot = function(E) {
      if (!gt(E)) {
        E = yr(E, m), le && (Ye = !0);
        var h = (E.deltaMode === 1 ? f : E.deltaMode === 2 ? je.innerHeight : 1) * _;
        rr(E.deltaX * h, E.deltaY * h, 0), g && !ce && Ze.restart(!0);
      }
    }, Xt = function(E) {
      if (!gt(E)) {
        var h = E.clientX, y = E.clientY, S = h - l.x, P = y - l.y;
        l.x = h, l.y = y, he = !0, (S || P) && $t(S, P);
      }
    }, nr = function(E) {
      l.event = E, X(l);
    }, wt = function(E) {
      l.event = E, ge(l);
    }, vr = function(E) {
      return gt(E) || yr(E, m) && Ke(l);
    };
    Ze = l._dc = Se.delayedCall(d || 0.25, _r).pause(), l.deltaX = l.deltaY = 0, l._vx = Fn(0, 50, !0), l._vy = Fn(0, 50, !0), l.scrollX = Ot, l.scrollY = kt, l.isDragging = l.isGesturing = l.isPressed = !1, zo(this), l.enable = function(O) {
      return l.isEnabled || (Fe(Pt ? te : s, "scroll", Bn), u.indexOf("scroll") >= 0 && Fe(Pt ? te : s, "scroll", Je, m, U), u.indexOf("wheel") >= 0 && Fe(s, "wheel", ot, m, U), (u.indexOf("touch") >= 0 && No || u.indexOf("pointer") >= 0) && (Fe(s, st[0], A, m, U), Fe(te, st[2], bt), Fe(te, st[3], bt), Te && Fe(s, "click", De, !1, !0), Ke && Fe(s, "click", vr), ie && Fe(te, "gesturestart", nt), a && Fe(te, "gestureend", it), X && Fe(s, qt + "enter", nr), ge && Fe(s, qt + "leave", wt), Ce && Fe(s, qt + "move", Xt)), l.isEnabled = !0, O && O.type && A(O), Wt && Wt(l)), l;
    }, l.disable = function() {
      l.isEnabled && (cr.filter(function(O) {
        return O !== l && Rr(O.target);
      }).length || Ne(Pt ? te : s, "scroll", Bn), l.isPressed && (l._vx.reset(), l._vy.reset(), Ne(ce ? s : te, st[1], Yt, !0)), Ne(Pt ? te : s, "scroll", Je, U), Ne(s, "wheel", ot, U), Ne(s, st[0], A, U), Ne(te, st[2], bt), Ne(te, st[3], bt), Ne(s, "click", De, !0), Ne(s, "click", vr), Ne(te, "gesturestart", nt), Ne(te, "gestureend", it), Ne(s, qt + "enter", nr), Ne(s, qt + "leave", wt), Ne(s, qt + "move", Xt), l.isEnabled = l.isPressed = l.isDragging = !1, Mt && Mt(l));
    }, l.kill = l.revert = function() {
      l.disable();
      var O = cr.indexOf(l);
      O >= 0 && cr.splice(O, 1), Et === l && (Et = 0);
    }, cr.push(l), ce && Rr(s) && (Et = l), l.enable(L);
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
ue.register = Vo;
ue.getAll = function() {
  return cr.slice();
};
ue.getById = function(e) {
  return cr.filter(function(t) {
    return t.vars.id === e;
  })[0];
};
Lo() && Se.registerPlugin(ue);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var v, ur, z, j, ct, ee, Wo, fn, dn, lr, Jr, Yr, Me, yn, Vn, Ie, ji, Qi, ar, $o, Cn, Yo, qe, Xo, Ho, qo, Dt, Wn, Jn, On, Xr = 1, ze = Date.now, kn = ze(), rt = 0, Sr = 0, Au = function e() {
  return Sr && requestAnimationFrame(e);
}, Ki = function() {
  return yn = 1;
}, Zi = function() {
  return yn = 0;
}, mt = function(t) {
  return t;
}, Tr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Uo = function() {
  return typeof window < "u";
}, Go = function() {
  return v || Uo() && (v = window.gsap) && v.registerPlugin && v;
}, Zt = function(t) {
  return !!~Wo.indexOf(t);
}, jo = function(t) {
  return Bt(t, "getBoundingClientRect") || (Zt(t) ? function() {
    return sn.width = z.innerWidth, sn.height = z.innerHeight, sn;
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
  return !r || ~_t.indexOf(t) ? jo(t) : function() {
    return sn;
  };
}, It = function(t, r) {
  var n = r.s, i = r.d2, o = r.d, u = r.a;
  return Math.max(0, (n = "scroll" + i) && (u = Bt(t, n)) ? u() - jo(t)()[o] : Zt(t) ? (ct[n] || ee[n]) - (z["inner" + i] || ct["client" + i] || ee["client" + i]) : t[n] - t["offset" + i]);
}, Hr = function(t, r) {
  for (var n = 0; n < ar.length; n += 3)
    (!r || ~r.indexOf(ar[n + 1])) && t(ar[n], ar[n + 1], ar[n + 2]);
}, ut = function(t) {
  return typeof t == "string";
}, Be = function(t) {
  return typeof t == "function";
}, xr = function(t) {
  return typeof t == "number";
}, en = function(t) {
  return typeof t == "object";
}, Er = function(t, r, n) {
  return t && t.progress(r ? 0 : 1) && n && t.pause();
}, Pn = function(t, r) {
  if (t.enabled) {
    var n = r(t);
    n && n.totalTime && (t.callbackAnimation = n);
  }
}, or = Math.abs, Qo = "left", Ko = "top", ei = "right", ti = "bottom", Gt = "width", jt = "height", Dr = "Right", Ar = "Left", Nr = "Top", Ir = "Bottom", ne = "padding", et = "margin", gr = "Width", ri = "Height", Ee = "px", lt = function(t) {
  return z.getComputedStyle(t);
}, zu = function(t) {
  var r = lt(t).position;
  t.style.position = r === "absolute" || r === "fixed" ? r : "relative";
}, Ji = function(t, r) {
  for (var n in r)
    n in t || (t[n] = r[n]);
  return t;
}, yt = function(t, r) {
  var n = r && lt(t)[Vn] !== "matrix(1, 0, 0, 1, 0, 0)" && v.to(t, {
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
}, $n = function(t, r) {
  var n = r.d2;
  return t["offset" + n] || t["client" + n] || 0;
}, Zo = function(t) {
  var r = [], n = t.labels, i = t.duration(), o;
  for (o in n)
    r.push(n[o] / i);
  return r;
}, Lu = function(t) {
  return function(r) {
    return v.utils.snap(Zo(t), r);
  };
}, ni = function(t) {
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
    return ni(Zo(t))(r, n.direction);
  };
}, qr = function(t, r, n, i) {
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
}, Ur = function(t, r, n) {
  n = n && n.wheelHandler, n && (t(r, "wheel", n), t(r, "touchmove", n));
}, eo = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Gr = {
  toggleActions: "play",
  anticipatePin: 0
}, gn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, tn = function(t, r) {
  if (ut(t)) {
    var n = t.indexOf("="), i = ~n ? +(t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
    ~n && (t.indexOf("%") > n && (i *= r / 100), t = t.substr(0, n - 1)), t = i + (t in gn ? gn[t] * r : ~t.indexOf("%") ? parseFloat(t) * r / 100 : parseFloat(t) || 0);
  }
  return t;
}, jr = function(t, r, n, i, o, u, s, f) {
  var p = o.startColor, m = o.endColor, g = o.fontSize, d = o.indent, c = o.fontWeight, _ = j.createElement("div"), L = Zt(n) || Bt(n, "pinType") === "fixed", $ = t.indexOf("scroller") !== -1, R = L ? ee : n, K = t.indexOf("start") !== -1, B = K ? p : m, C = "border-color:" + B + ";font-size:" + g + ";color:" + B + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return C += "position:" + (($ || f) && L ? "fixed;" : "absolute;"), ($ || f || !L) && (C += (i === fe ? ei : ti) + ":" + (u + parseFloat(d)) + "px;"), s && (C += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), _._isStart = K, _.setAttribute("class", "gsap-marker-" + t + (r ? " marker-" + r : "")), _.style.cssText = C, _.innerText = r || r === 0 ? t + "-" + r : t, R.children[0] ? R.insertBefore(_, R.children[0]) : R.appendChild(_), _._offset = _["offset" + i.op.d2], rn(_, 0, i, K), _;
}, rn = function(t, r, n, i) {
  var o = {
    display: "block"
  }, u = n[i ? "os2" : "p2"], s = n[i ? "p2" : "os2"];
  t._isFlipped = i, o[n.a + "Percent"] = i ? -100 : 0, o[n.a] = i ? "1px" : 0, o["border" + u + gr] = 1, o["border" + s + gr] = 0, o[n.p] = r + "px", v.set(t, o);
}, D = [], Yn = {}, Lr, to = function() {
  return ze() - rt > 34 && (Lr || (Lr = requestAnimationFrame(Tt)));
}, sr = function() {
  (!qe || !qe.isPressed || qe.startX > ee.clientWidth) && (N.cache++, qe ? Lr || (Lr = requestAnimationFrame(Tt)) : Tt(), rt || er("scrollStart"), rt = ze());
}, Rn = function() {
  qo = z.innerWidth, Ho = z.innerHeight;
}, Mr = function() {
  N.cache++, !Me && !Yo && !j.fullscreenElement && !j.webkitFullscreenElement && (!Xo || qo !== z.innerWidth || Math.abs(z.innerHeight - Ho) > z.innerHeight * 0.25) && fn.restart(!0);
}, Jt = {}, Fu = [], Jo = function e() {
  return be(k, "scrollEnd", e) || Ut(!0);
}, er = function(t) {
  return Jt[t] && Jt[t].map(function(r) {
    return r();
  }) || Fu;
}, Ue = [], es = function(t) {
  for (var r = 0; r < Ue.length; r += 5)
    (!t || Ue[r + 4] && Ue[r + 4].query === t) && (Ue[r].style.cssText = Ue[r + 1], Ue[r].getBBox && Ue[r].setAttribute("transform", Ue[r + 2] || ""), Ue[r + 3].uncache = 1);
}, ii = function(t, r) {
  var n;
  for (Ie = 0; Ie < D.length; Ie++)
    n = D[Ie], n && (!r || n._ctx === r) && (t ? n.kill(1) : n.revert(!0, !0));
  r && es(r), r || er("revert");
}, ts = function(t, r) {
  N.cache++, (r || !Ge) && N.forEach(function(n) {
    return Be(n) && n.cacheID++ && (n.rec = 0);
  }), ut(t) && (z.history.scrollRestoration = Jn = t);
}, Ge, Qt = 0, ro, Vu = function() {
  if (ro !== Qt) {
    var t = ro = Qt;
    requestAnimationFrame(function() {
      return t === Qt && Ut(!0);
    });
  }
}, Ut = function(t, r) {
  if (rt && !t) {
    we(k, "scrollEnd", Jo);
    return;
  }
  Ge = k.isRefreshing = !0, N.forEach(function(i) {
    return Be(i) && i.cacheID++ && (i.rec = i());
  });
  var n = er("refreshInit");
  $o && k.sort(), r || ii(), N.forEach(function(i) {
    Be(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
  }), D.slice(0).forEach(function(i) {
    return i.refresh();
  }), D.forEach(function(i, o) {
    if (i._subPinOffset && i.pin) {
      var u = i.vars.horizontal ? "offsetWidth" : "offsetHeight", s = i.pin[u];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[u] - s), i.refresh();
    }
  }), D.forEach(function(i) {
    return i.vars.end === "max" && i.setPositions(i.start, Math.max(i.start + 1, It(i.scroller, i._dir)));
  }), n.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), N.forEach(function(i) {
    Be(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), ts(Jn, 1), fn.pause(), Qt++, Ge = 2, Tt(2), D.forEach(function(i) {
    return Be(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), Ge = k.isRefreshing = !1, er("refresh");
}, Xn = 0, nn = 1, zr, Tt = function(t) {
  if (!Ge || t === 2) {
    k.isUpdating = !0, zr && zr.update(0);
    var r = D.length, n = ze(), i = n - kn >= 50, o = r && D[0].scroll();
    if (nn = Xn > o ? -1 : 1, Ge || (Xn = o), i && (rt && !yn && n - rt > 200 && (rt = 0, er("scrollEnd")), Jr = kn, kn = n), nn < 0) {
      for (Ie = r; Ie-- > 0; )
        D[Ie] && D[Ie].update(0, i);
      nn = 1;
    } else
      for (Ie = 0; Ie < r; Ie++)
        D[Ie] && D[Ie].update(0, i);
    k.isUpdating = !1;
  }
  Lr = 0;
}, Hn = [Qo, Ko, ti, ei, et + Ir, et + Dr, et + Nr, et + Ar, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], on = Hn.concat([Gt, jt, "boxSizing", "max" + gr, "max" + ri, "position", et, ne, ne + Nr, ne + Dr, ne + Ir, ne + Ar]), Wu = function(t, r, n) {
  dr(n);
  var i = t._gsap;
  if (i.spacerIsNative)
    dr(i.spacerState);
  else if (t._gsap.swappedIn) {
    var o = r.parentNode;
    o && (o.insertBefore(t, r), o.removeChild(r));
  }
  t._gsap.swappedIn = !1;
}, Dn = function(t, r, n, i) {
  if (!t._gsap.swappedIn) {
    for (var o = Hn.length, u = r.style, s = t.style, f; o--; )
      f = Hn[o], u[f] = n[f];
    u.position = n.position === "absolute" ? "absolute" : "relative", n.display === "inline" && (u.display = "inline-block"), s[ti] = s[ei] = "auto", u.flexBasis = n.flexBasis || "auto", u.overflow = "visible", u.boxSizing = "border-box", u[Gt] = $n(t, Le) + Ee, u[jt] = $n(t, fe) + Ee, u[ne] = s[et] = s[Ko] = s[Qo] = "0", dr(i), s[Gt] = s["max" + gr] = n[Gt], s[jt] = s["max" + ri] = n[jt], s[ne] = n[ne], t.parentNode !== r && (t.parentNode.insertBefore(r, t), r.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, $u = /([A-Z])/g, dr = function(t) {
  if (t) {
    var r = t.t.style, n = t.length, i = 0, o, u;
    for ((t.t._gsap || v.core.getCache(t.t)).uncache = 1; i < n; i += 2)
      u = t[i + 1], o = t[i], u ? r[o] = u : r[o] && r.removeProperty(o.replace($u, "-$1").toLowerCase());
  }
}, Qr = function(t) {
  for (var r = on.length, n = t.style, i = [], o = 0; o < r; o++)
    i.push(on[o], n[on[o]]);
  return i.t = t, i;
}, Yu = function(t, r, n) {
  for (var i = [], o = t.length, u = n ? 8 : 0, s; u < o; u += 2)
    s = t[u], i.push(s, s in r ? r[s] : t[u + 1]);
  return i.t = t.t, i;
}, sn = {
  left: 0,
  top: 0
}, no = function(t, r, n, i, o, u, s, f, p, m, g, d, c) {
  Be(t) && (t = t(f)), ut(t) && t.substr(0, 3) === "max" && (t = d + (t.charAt(4) === "=" ? tn("0" + t.substr(3), n) : 0));
  var _ = c ? c.time() : 0, L, $, R;
  if (c && c.seek(0), xr(t))
    c && (t = v.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, d, t)), s && rn(s, n, i, !0);
  else {
    Be(r) && (r = r(f));
    var K = (t || "0").split(" "), B, C, V, w;
    R = Ve(r) || ee, B = yt(R) || {}, (!B || !B.left && !B.top) && lt(R).display === "none" && (w = R.style.display, R.style.display = "block", B = yt(R), w ? R.style.display = w : R.style.removeProperty("display")), C = tn(K[0], B[i.d]), V = tn(K[1] || "0", n), t = B[i.p] - p[i.p] - m + C + o - V, s && rn(s, V, i, n - V < 20 || s._isStart && V > 20), n -= n - V;
  }
  if (u) {
    var b = t + n, q = u._isStart;
    L = "scroll" + i.d2, rn(u, b, i, q && b > 20 || !q && (g ? Math.max(ee[L], ct[L]) : u.parentNode[L]) <= b + 1), g && (p = yt(s), g && (u.style[i.op.p] = p[i.op.p] - i.op.m - u._offset + Ee));
  }
  return c && R && (L = yt(R), c.seek(d), $ = yt(R), c._caScrollDist = L[i.p] - $[i.p], t = t / c._caScrollDist * d), c && c.seek(_), c ? t : Math.round(t);
}, Xu = /(webkit|moz|length|cssText|inset)/i, io = function(t, r, n, i) {
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
}, rs = function(t, r, n) {
  var i = r, o = i;
  return function(u) {
    var s = Math.round(t());
    return s !== i && s !== o && Math.abs(s - i) > 3 && Math.abs(s - o) > 3 && (u = s, n && n()), o = i, i = u, u;
  };
}, oo = function(t, r) {
  var n = Vt(t, r), i = "_scroll" + r.p2, o = function u(s, f, p, m, g) {
    var d = u.tween, c = f.onComplete, _ = {};
    p = p || n();
    var L = rs(n, p, function() {
      d.kill(), u.tween = 0;
    });
    return g = m && g || 0, m = m || s - p, d && d.kill(), f[i] = s, f.modifiers = _, _[i] = function() {
      return L(p + m * d.ratio + g * d.ratio * d.ratio);
    }, f.onUpdate = function() {
      N.cache++, Tt();
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
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Sr) {
      this.update = this.refresh = this.kill = mt;
      return;
    }
    n = Ji(ut(n) || xr(n) || n.nodeType ? {
      trigger: n
    } : n, Gr);
    var o = n, u = o.onUpdate, s = o.toggleClass, f = o.id, p = o.onToggle, m = o.onRefresh, g = o.scrub, d = o.trigger, c = o.pin, _ = o.pinSpacing, L = o.invalidateOnRefresh, $ = o.anticipatePin, R = o.onScrubComplete, K = o.onSnapComplete, B = o.once, C = o.snap, V = o.pinReparent, w = o.pinSpacer, b = o.containerAnimation, q = o.fastScrollEnd, de = o.preventOverlaps, x = n.horizontal || n.containerAnimation && n.horizontal !== !1 ? Le : fe, ae = !g && g !== 0, T = Ve(n.scroller || z), Qe = v.core.getCache(T), X = Zt(T), ge = ("pinType" in n ? n.pinType : Bt(T, "pinType") || X && "fixed") === "fixed", Ce = [n.onEnter, n.onLeave, n.onEnterBack, n.onLeaveBack], H = ae && n.toggleActions.split(" "), ce = "markers" in n ? n.markers : Gr.markers, ie = X ? 0 : parseFloat(lt(T)["border" + x.p2 + gr]) || 0, a = this, le = n.onRefreshInit && function() {
      return n.onRefreshInit(a);
    }, Wt = Nu(T, X, x), Mt = Iu(T, X), Ke = 0, Ct = 0, U = Vt(T, x), Te, Oe, hr, $e, Ze, I, he, Ye, dt, ke, l, vt, G, Ot, kt, tr, Pe, pr, Pt, te, Xe, Re, mr, De, gt, _r, Rt, rr, $t, Yt, A, bt, nt, it, Je, ot, Xt, nr, wt;
    if (Wn(a), a._dir = x, $ *= 45, a.scroller = T, a.scroll = b ? b.time.bind(b) : U, $e = U(), a.vars = n, i = i || n.animation, "refreshPriority" in n && ($o = 1, n.refreshPriority === -9999 && (zr = a)), Qe.tweenScroll = Qe.tweenScroll || {
      top: oo(T, fe),
      left: oo(T, Le)
    }, a.tweenTo = Te = Qe.tweenScroll[x.p], a.scrubDuration = function(h) {
      bt = xr(h) && h, bt ? A ? A.duration(h) : A = v.to(i, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: bt,
        paused: !0,
        onComplete: function() {
          return R && R(a);
        }
      }) : (A && A.progress(1).kill(), A = 0);
    }, i && (i.vars.lazy = !1, i._initted || i.vars.immediateRender !== !1 && n.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), a.animation = i.pause(), i.scrollTrigger = a, a.scrubDuration(g), A && A.resetTo && A.resetTo("totalProgress", 0), $t = 0, f || (f = i.vars.id)), D.push(a), C && ((!en(C) || C.push) && (C = {
      snapTo: C
    }), "scrollBehavior" in ee.style && v.set(X ? [ee, ct] : T, {
      scrollBehavior: "auto"
    }), N.forEach(function(h) {
      return Be(h) && h.target === (X ? j.scrollingElement || ct : T) && (h.smooth = !1);
    }), hr = Be(C.snapTo) ? C.snapTo : C.snapTo === "labels" ? Lu(i) : C.snapTo === "labelsDirectional" ? Bu(i) : C.directional !== !1 ? function(h, y) {
      return ni(C.snapTo)(h, ze() - Ct < 500 ? 0 : y.direction);
    } : v.utils.snap(C.snapTo), nt = C.duration || {
      min: 0.1,
      max: 2
    }, nt = en(nt) ? lr(nt.min, nt.max) : lr(nt, nt), it = v.delayedCall(C.delay || bt / 2 || 0.1, function() {
      var h = U(), y = ze() - Ct < 500, S = Te.tween;
      if ((y || Math.abs(a.getVelocity()) < 10) && !S && !yn && Ke !== h) {
        var P = (h - I) / G, pe = i && !ae ? i.totalProgress() : P, W = y ? 0 : (pe - Yt) / (ze() - Jr) * 1e3 || 0, Z = v.utils.clamp(-P, 1 - P, or(W / 2) * W / 0.185), ye = P + (C.inertia === !1 ? 0 : Z), me = lr(0, 1, hr(ye, a)), oe = Math.round(I + me * G), J = C, He = J.onStart, Ae = J.onInterrupt, _e = J.onComplete;
        if (h <= he && h >= I && oe !== h) {
          if (S && !S._initted && S.data <= or(oe - h))
            return;
          C.inertia === !1 && (Z = me - P), Te(oe, {
            duration: nt(or(Math.max(or(ye - pe), or(me - pe)) * 0.185 / W / 0.05 || 0)),
            ease: C.ease || "power3",
            data: or(oe - h),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return it.restart(!0) && Ae && Ae(a);
            },
            onComplete: function() {
              a.update(), Ke = U(), $t = Yt = i && !ae ? i.totalProgress() : a.progress, K && K(a), _e && _e(a);
            }
          }, h, Z * G, oe - h - Z * G), He && He(a, Te.tween);
        }
      } else
        a.isActive && Ke !== h && it.restart(!0);
    }).pause()), f && (Yn[f] = a), d = a.trigger = Ve(d || c), wt = d && d._gsap && d._gsap.stRevert, wt && (wt = wt(a)), c = c === !0 ? d : Ve(c), ut(s) && (s = {
      targets: d,
      className: s
    }), c && (_ === !1 || _ === et || (_ = !_ && c.parentNode && c.parentNode.style && lt(c.parentNode).display === "flex" ? !1 : ne), a.pin = c, Oe = v.core.getCache(c), Oe.spacer ? Ot = Oe.pinState : (w && (w = Ve(w), w && !w.nodeType && (w = w.current || w.nativeElement), Oe.spacerIsNative = !!w, w && (Oe.spacerState = Qr(w))), Oe.spacer = Pe = w || j.createElement("div"), Pe.classList.add("pin-spacer"), f && Pe.classList.add("pin-spacer-" + f), Oe.pinState = Ot = Qr(c)), n.force3D !== !1 && v.set(c, {
      force3D: !0
    }), a.spacer = Pe = Oe.spacer, rr = lt(c), mr = rr[_ + x.os2], Pt = v.getProperty(c), te = v.quickSetter(c, x.a, Ee), Dn(c, Pe, rr), tr = Qr(c)), ce) {
      vt = en(ce) ? Ji(ce, eo) : eo, ke = jr("scroller-start", f, T, x, vt, 0), l = jr("scroller-end", f, T, x, vt, 0, ke), pr = ke["offset" + x.op.d2];
      var vr = Ve(Bt(T, "content") || T);
      Ye = this.markerStart = jr("start", f, vr, x, vt, pr, 0, b), dt = this.markerEnd = jr("end", f, vr, x, vt, pr, 0, b), b && (nr = v.quickSetter([Ye, dt], x.a, Ee)), !ge && !(_t.length && Bt(T, "fixedMarkers") === !0) && (zu(X ? ee : T), v.set([ke, l], {
        force3D: !0
      }), gt = v.quickSetter(ke, x.a, Ee), Rt = v.quickSetter(l, x.a, Ee));
    }
    if (b) {
      var O = b.vars.onUpdate, E = b.vars.onUpdateParams;
      b.eventCallback("onUpdate", function() {
        a.update(0, 0, 1), O && O.apply(b, E || []);
      });
    }
    a.previous = function() {
      return D[D.indexOf(a) - 1];
    }, a.next = function() {
      return D[D.indexOf(a) + 1];
    }, a.revert = function(h, y) {
      if (!y)
        return a.kill(!0);
      var S = h !== !1 || !a.enabled, P = Me;
      S !== a.isReverted && (S && (ot = Math.max(U(), a.scroll.rec || 0), Je = a.progress, Xt = i && i.progress()), Ye && [Ye, dt, ke, l].forEach(function(pe) {
        return pe.style.display = S ? "none" : "block";
      }), S && (Me = a, a.update(S)), c && (!V || !a.isActive) && (S ? Wu(c, Pe, Ot) : Dn(c, Pe, lt(c), De)), S || a.update(S), Me = P, a.isReverted = S);
    }, a.refresh = function(h, y) {
      if (!((Me || !a.enabled) && !y)) {
        if (c && h && rt) {
          we(e, "scrollEnd", Jo);
          return;
        }
        !Ge && le && le(a), Me = a, Ct = ze(), Te.tween && (Te.tween.kill(), Te.tween = 0), A && A.pause(), L && i && i.revert({
          kill: !1
        }).invalidate(), a.isReverted || a.revert(!0, !0), a._subPinOffset = !1;
        for (var S = Wt(), P = Mt(), pe = b ? b.duration() : It(T, x), W = G <= 0.01, Z = 0, ye = 0, me = n.end, oe = n.endTrigger || d, J = n.start || (n.start === 0 || !d ? 0 : c ? "0 0" : "0 100%"), He = a.pinnedContainer = n.pinnedContainer && Ve(n.pinnedContainer), Ae = d && Math.max(0, D.indexOf(a)) || 0, _e = Ae, re, xe, ir, Ht, se, ve, ht, En, oi, br, pt; _e--; )
          ve = D[_e], ve.end || ve.refresh(0, 1) || (Me = a), ht = ve.pin, ht && (ht === d || ht === c || ht === He) && !ve.isReverted && (br || (br = []), br.unshift(ve), ve.revert(!0, !0)), ve !== D[_e] && (Ae--, _e--);
        for (Be(J) && (J = J(a)), I = no(J, d, S, x, U(), Ye, ke, a, P, ie, ge, pe, b) || (c ? -1e-3 : 0), Be(me) && (me = me(a)), ut(me) && !me.indexOf("+=") && (~me.indexOf(" ") ? me = (ut(J) ? J.split(" ")[0] : "") + me : (Z = tn(me.substr(2), S), me = ut(J) ? J : (b ? v.utils.mapRange(0, b.duration(), b.scrollTrigger.start, b.scrollTrigger.end, I) : I) + Z, oe = d)), he = Math.max(I, no(me || (oe ? "100% 0" : pe), oe, S, x, U() + Z, dt, l, a, P, ie, ge, pe, b)) || -1e-3, G = he - I || (I -= 0.01) && 1e-3, Z = 0, _e = Ae; _e--; )
          ve = D[_e], ht = ve.pin, ht && ve.start - ve._pinPush <= I && !b && ve.end > 0 && (re = ve.end - ve.start, (ht === d && ve.start - ve._pinPush < I || ht === He) && !xr(J) && (Z += re * (1 - ve.progress)), ht === c && (ye += re));
        if (I += Z, he += Z, W && (Je = v.utils.clamp(0, 1, v.utils.normalize(I, he, ot))), a._pinPush = ye, Ye && Z && (re = {}, re[x.a] = "+=" + Z, He && (re[x.p] = "-=" + U()), v.set([Ye, dt], re)), c)
          re = lt(c), Ht = x === fe, ir = U(), Xe = parseFloat(Pt(x.a)) + ye, !pe && he > 1 && (pt = (X ? j.scrollingElement || ct : T).style, pt = {
            style: pt,
            value: pt["overflow" + x.a.toUpperCase()]
          }, pt.style["overflow" + x.a.toUpperCase()] = "scroll"), Dn(c, Pe, re), tr = Qr(c), xe = yt(c, !0), En = ge && Vt(T, Ht ? Le : fe)(), _ && (De = [_ + x.os2, G + ye + Ee], De.t = Pe, _e = _ === ne ? $n(c, x) + G + ye : 0, _e && De.push(x.d, _e + Ee), dr(De), He && D.forEach(function(wr) {
            wr.pin === He && wr.vars.pinSpacing !== !1 && (wr._subPinOffset = !0);
          }), ge && U(ot)), ge && (se = {
            top: xe.top + (Ht ? ir - I : En) + Ee,
            left: xe.left + (Ht ? En : ir - I) + Ee,
            boxSizing: "border-box",
            position: "fixed"
          }, se[Gt] = se["max" + gr] = Math.ceil(xe.width) + Ee, se[jt] = se["max" + ri] = Math.ceil(xe.height) + Ee, se[et] = se[et + Nr] = se[et + Dr] = se[et + Ir] = se[et + Ar] = "0", se[ne] = re[ne], se[ne + Nr] = re[ne + Nr], se[ne + Dr] = re[ne + Dr], se[ne + Ir] = re[ne + Ir], se[ne + Ar] = re[ne + Ar], kt = Yu(Ot, se, V), Ge && U(0)), i ? (oi = i._initted, Cn(1), i.render(i.duration(), !0, !0), Re = Pt(x.a) - Xe + G + ye, _r = Math.abs(G - Re) > 1, ge && _r && kt.splice(kt.length - 2, 2), i.render(0, !0, !0), oi || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), Cn(0)) : Re = G, pt && (pt.value ? pt.style["overflow" + x.a.toUpperCase()] = pt.value : pt.style.removeProperty("overflow-" + x.a));
        else if (d && U() && !b)
          for (xe = d.parentNode; xe && xe !== ee; )
            xe._pinOffset && (I -= xe._pinOffset, he -= xe._pinOffset), xe = xe.parentNode;
        br && br.forEach(function(wr) {
          return wr.revert(!1, !0);
        }), a.start = I, a.end = he, $e = Ze = Ge ? ot : U(), !b && !Ge && ($e < ot && U(ot), a.scroll.rec = 0), a.revert(!1, !0), it && (Ke = -1, a.isActive && U(I + G * Je), it.restart(!0)), Me = 0, i && ae && (i._initted || Xt) && i.progress() !== Xt && i.progress(Xt, !0).render(i.time(), !0, !0), (W || Je !== a.progress || b) && (i && !ae && i.totalProgress(b && I < -1e-3 && !Je ? v.utils.normalize(I, he, 0) : Je, !0), a.progress = ($e - I) / G === Je ? 0 : Je), c && _ && (Pe._pinOffset = Math.round(a.progress * Re)), A && A.invalidate(), m && !Ge && m(a);
      }
    }, a.getVelocity = function() {
      return (U() - Ze) / (ze() - Jr) * 1e3 || 0;
    }, a.endAnimation = function() {
      Er(a.callbackAnimation), i && (A ? A.progress(1) : i.paused() ? ae || Er(i, a.direction < 0, 1) : Er(i, i.reversed()));
    }, a.labelToScroll = function(h) {
      return i && i.labels && (I || a.refresh() || I) + i.labels[h] / i.duration() * G || 0;
    }, a.getTrailing = function(h) {
      var y = D.indexOf(a), S = a.direction > 0 ? D.slice(0, y).reverse() : D.slice(y + 1);
      return (ut(h) ? S.filter(function(P) {
        return P.vars.preventOverlaps === h;
      }) : S).filter(function(P) {
        return a.direction > 0 ? P.end <= I : P.start >= he;
      });
    }, a.update = function(h, y, S) {
      if (!(b && !S && !h)) {
        var P = Ge === !0 ? ot : a.scroll(), pe = h ? 0 : (P - I) / G, W = pe < 0 ? 0 : pe > 1 ? 1 : pe || 0, Z = a.progress, ye, me, oe, J, He, Ae, _e, re;
        if (y && (Ze = $e, $e = b ? U() : P, C && (Yt = $t, $t = i && !ae ? i.totalProgress() : W)), $ && !W && c && !Me && !Xr && rt && I < P + (P - Ze) / (ze() - Jr) * $ && (W = 1e-4), W !== Z && a.enabled) {
          if (ye = a.isActive = !!W && W < 1, me = !!Z && Z < 1, Ae = ye !== me, He = Ae || !!W != !!Z, a.direction = W > Z ? 1 : -1, a.progress = W, He && !Me && (oe = W && !Z ? 0 : W === 1 ? 1 : Z === 1 ? 2 : 3, ae && (J = !Ae && H[oe + 1] !== "none" && H[oe + 1] || H[oe], re = i && (J === "complete" || J === "reset" || J in i))), de && (Ae || re) && (re || g || !i) && (Be(de) ? de(a) : a.getTrailing(de).forEach(function(se) {
            return se.endAnimation();
          })), ae || (A && !Me && !Xr ? (A._dp._time - A._start !== A._time && A.render(A._dp._time - A._start), A.resetTo ? A.resetTo("totalProgress", W, i._tTime / i._tDur) : (A.vars.totalProgress = W, A.invalidate().restart())) : i && i.totalProgress(W, !!Me)), c) {
            if (h && _ && (Pe.style[_ + x.os2] = mr), !ge)
              te(Tr(Xe + Re * W));
            else if (He) {
              if (_e = !h && W > Z && he + 1 > P && P + 1 >= It(T, x), V)
                if (!h && (ye || _e)) {
                  var xe = yt(c, !0), ir = P - I;
                  io(c, ee, xe.top + (x === fe ? ir : 0) + Ee, xe.left + (x === fe ? 0 : ir) + Ee);
                } else
                  io(c, Pe);
              dr(ye || _e ? kt : tr), _r && W < 1 && ye || te(Xe + (W === 1 && !_e ? Re : 0));
            }
          }
          C && !Te.tween && !Me && !Xr && it.restart(!0), s && (Ae || B && W && (W < 1 || !On)) && dn(s.targets).forEach(function(se) {
            return se.classList[ye || B ? "add" : "remove"](s.className);
          }), u && !ae && !h && u(a), He && !Me ? (ae && (re && (J === "complete" ? i.pause().totalProgress(1) : J === "reset" ? i.restart(!0).pause() : J === "restart" ? i.restart(!0) : i[J]()), u && u(a)), (Ae || !On) && (p && Ae && Pn(a, p), Ce[oe] && Pn(a, Ce[oe]), B && (W === 1 ? a.kill(!1, 1) : Ce[oe] = 0), Ae || (oe = W === 1 ? 1 : 3, Ce[oe] && Pn(a, Ce[oe]))), q && !ye && Math.abs(a.getVelocity()) > (xr(q) ? q : 2500) && (Er(a.callbackAnimation), A ? A.progress(1) : Er(i, J === "reverse" ? 1 : !W, 1))) : ae && u && !Me && u(a);
        }
        if (Rt) {
          var Ht = b ? P / b.duration() * (b._caScrollDist || 0) : P;
          gt(Ht + (ke._isFlipped ? 1 : 0)), Rt(Ht);
        }
        nr && nr(-P / b.duration() * (b._caScrollDist || 0));
      }
    }, a.enable = function(h, y) {
      a.enabled || (a.enabled = !0, we(T, "resize", Mr), we(X ? j : T, "scroll", sr), le && we(e, "refreshInit", le), h !== !1 && (a.progress = Je = 0, $e = Ze = Ke = U()), y !== !1 && a.refresh());
    }, a.getTween = function(h) {
      return h && Te ? Te.tween : A;
    }, a.setPositions = function(h, y) {
      c && (Xe += h - I, Re += y - h - G, _ === ne && a.adjustPinSpacing(y - h - G)), a.start = I = h, a.end = he = y, G = y - h, a.update();
    }, a.adjustPinSpacing = function(h) {
      if (De && h) {
        var y = De.indexOf(x.d) + 1;
        De[y] = parseFloat(De[y]) + h + Ee, De[1] = parseFloat(De[1]) + h + Ee, dr(De);
      }
    }, a.disable = function(h, y) {
      if (a.enabled && (h !== !1 && a.revert(!0, !0), a.enabled = a.isActive = !1, y || A && A.pause(), ot = 0, Oe && (Oe.uncache = 1), le && be(e, "refreshInit", le), it && (it.pause(), Te.tween && Te.tween.kill() && (Te.tween = 0)), !X)) {
        for (var S = D.length; S--; )
          if (D[S].scroller === T && D[S] !== a)
            return;
        be(T, "resize", Mr), be(T, "scroll", sr);
      }
    }, a.kill = function(h, y) {
      a.disable(h, y), A && !y && A.kill(), f && delete Yn[f];
      var S = D.indexOf(a);
      S >= 0 && D.splice(S, 1), S === Ie && nn > 0 && Ie--, S = 0, D.forEach(function(P) {
        return P.scroller === a.scroller && (S = 1);
      }), S || Ge || (a.scroll.rec = 0), i && (i.scrollTrigger = null, h && i.revert({
        kill: !1
      }), y || i.kill()), Ye && [Ye, dt, ke, l].forEach(function(P) {
        return P.parentNode && P.parentNode.removeChild(P);
      }), zr === a && (zr = 0), c && (Oe && (Oe.uncache = 1), S = 0, D.forEach(function(P) {
        return P.pin === c && S++;
      }), S || (Oe.spacer = 0)), n.onKill && n.onKill(a);
    }, a.enable(!1, !1), wt && wt(a), !i || !i.add || G ? a.refresh() : v.delayedCall(0.01, function() {
      return I || he || a.refresh();
    }) && (G = 0.01) && (I = he = 0), c && Vu();
  }, e.register = function(n) {
    return ur || (v = n || Go(), Uo() && window.document && e.enable(), ur = Sr), ur;
  }, e.defaults = function(n) {
    if (n)
      for (var i in n)
        Gr[i] = n[i];
    return Gr;
  }, e.disable = function(n, i) {
    Sr = 0, D.forEach(function(u) {
      return u[i ? "kill" : "disable"](n);
    }), be(z, "wheel", sr), be(j, "scroll", sr), clearInterval(Yr), be(j, "touchcancel", mt), be(ee, "touchstart", mt), qr(be, j, "pointerdown,touchstart,mousedown", Ki), qr(be, j, "pointerup,touchend,mouseup", Zi), fn.kill(), Hr(be);
    for (var o = 0; o < N.length; o += 3)
      Ur(be, N[o], N[o + 1]), Ur(be, N[o], N[o + 2]);
  }, e.enable = function() {
    if (z = window, j = document, ct = j.documentElement, ee = j.body, v && (dn = v.utils.toArray, lr = v.utils.clamp, Wn = v.core.context || mt, Cn = v.core.suppressOverwrites || mt, Jn = z.history.scrollRestoration || "auto", Xn = z.pageYOffset, v.core.globals("ScrollTrigger", e), ee)) {
      Sr = 1, Au(), ue.register(v), e.isTouch = ue.isTouch, Dt = ue.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), we(z, "wheel", sr), Wo = [z, j, ct, ee], v.matchMedia ? (e.matchMedia = function(f) {
        var p = v.matchMedia(), m;
        for (m in f)
          p.add(m, f[m]);
        return p;
      }, v.addEventListener("matchMediaInit", function() {
        return ii();
      }), v.addEventListener("matchMediaRevert", function() {
        return es();
      }), v.addEventListener("matchMedia", function() {
        Ut(0, 1), er("matchMedia");
      }), v.matchMedia("(orientation: portrait)", function() {
        return Rn(), Rn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Rn(), we(j, "scroll", sr);
      var n = ee.style, i = n.borderTopStyle, o = v.core.Animation.prototype, u, s;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", u = yt(ee), fe.m = Math.round(u.top + fe.sc()) || 0, Le.m = Math.round(u.left + Le.sc()) || 0, i ? n.borderTopStyle = i : n.removeProperty("border-top-style"), Yr = setInterval(to, 250), v.delayedCall(0.5, function() {
        return Xr = 0;
      }), we(j, "touchcancel", mt), we(ee, "touchstart", mt), qr(we, j, "pointerdown,touchstart,mousedown", Ki), qr(we, j, "pointerup,touchend,mouseup", Zi), Vn = v.utils.checkPrefix("transform"), on.push(Vn), ur = ze(), fn = v.delayedCall(0.2, Ut).pause(), ar = [j, "visibilitychange", function() {
        var f = z.innerWidth, p = z.innerHeight;
        j.hidden ? (ji = f, Qi = p) : (ji !== f || Qi !== p) && Mr();
      }, j, "DOMContentLoaded", Ut, z, "load", Ut, z, "resize", Mr], Hr(we), D.forEach(function(f) {
        return f.enable(0, 1);
      }), s = 0; s < N.length; s += 3)
        Ur(be, N[s], N[s + 1]), Ur(be, N[s], N[s + 2]);
    }
  }, e.config = function(n) {
    "limitCallbacks" in n && (On = !!n.limitCallbacks);
    var i = n.syncInterval;
    i && clearInterval(Yr) || (Yr = i) && setInterval(to, i), "ignoreMobileResize" in n && (Xo = e.isTouch === 1 && n.ignoreMobileResize), "autoRefreshEvents" in n && (Hr(be) || Hr(we, n.autoRefreshEvents || "none"), Yo = (n.autoRefreshEvents + "").indexOf("resize") === -1);
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
    var u = n.getBoundingClientRect(), s = u[o ? Gt : jt], f = i == null ? s / 2 : i in gn ? gn[i] * s : ~i.indexOf("%") ? parseFloat(i) * s / 100 : parseFloat(i) || 0;
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
  return e ? dn(e).forEach(function(t) {
    if (t && t.style) {
      var r = Ue.indexOf(t);
      r >= 0 && Ue.splice(r, 5), Ue.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), v.core.getCache(t), Wn());
    }
  }) : Ue;
};
k.revert = function(e, t) {
  return ii(!e, t);
};
k.create = function(e, t) {
  return new k(e, t);
};
k.refresh = function(e) {
  return e ? Mr() : (ur || k.register()) && Ut(!0);
};
k.update = function(e) {
  return ++N.cache && Tt(e === !0 ? 2 : 0);
};
k.clearScrollMemory = ts;
k.maxScroll = function(e, t) {
  return It(e, t ? Le : fe);
};
k.getScrollFunc = function(e, t) {
  return Vt(Ve(e), t ? Le : fe);
};
k.getById = function(e) {
  return Yn[e];
};
k.getAll = function() {
  return D.filter(function(e) {
    return e.vars.id !== "ScrollSmoother";
  });
};
k.isScrolling = function() {
  return !!rt;
};
k.snapDirectional = ni;
k.addEventListener = function(e, t) {
  var r = Jt[e] || (Jt[e] = []);
  ~r.indexOf(t) || r.push(t);
};
k.removeEventListener = function(e, t) {
  var r = Jt[e], n = r && r.indexOf(t);
  n >= 0 && r.splice(n, 1);
};
k.batch = function(e, t) {
  var r = [], n = {}, i = t.interval || 0.016, o = t.batchMax || 1e9, u = function(p, m) {
    var g = [], d = [], c = v.delayedCall(i, function() {
      m(g, d), g = [], d = [];
    }).pause();
    return function(_) {
      g.length || c.restart(!0), g.push(_.trigger), d.push(_), o <= g.length && c.progress(1);
    };
  }, s;
  for (s in t)
    n[s] = s.substr(0, 2) === "on" && Be(t[s]) && s !== "onRefreshInit" ? u(s, t[s]) : t[s];
  return Be(o) && (o = o(), we(k, "refresh", function() {
    return o = t.batchMax();
  })), dn(e).forEach(function(f) {
    var p = {};
    for (s in n)
      p[s] = n[s];
    p.trigger = f, r.push(k.create(p));
  }), r;
};
var so = function(t, r, n, i) {
  return r > i ? t(i) : r < 0 && t(0), n > i ? (i - r) / (n - r) : n < 0 ? r / (r - n) : 1;
}, An = function e(t, r) {
  r === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = r === !0 ? "auto" : r ? "pan-" + r + (ue.isTouch ? " pinch-zoom" : "") : "none", t === ct && e(ee, r);
}, Kr = {
  auto: 1,
  scroll: 1
}, Hu = function(t) {
  var r = t.event, n = t.target, i = t.axis, o = (r.changedTouches ? r.changedTouches[0] : r).target, u = o._gsap || v.core.getCache(o), s = ze(), f;
  if (!u._isScrollT || s - u._isScrollT > 2e3) {
    for (; o && o !== ee && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(Kr[(f = lt(o)).overflowY] || Kr[f.overflowX])); )
      o = o.parentNode;
    u._isScroll = o && o !== n && !Zt(o) && (Kr[(f = lt(o)).overflowY] || Kr[f.overflowX]), u._isScrollT = s;
  }
  (u._isScroll || i === "x") && (r.stopPropagation(), r._gsapAllow = !0);
}, ns = function(t, r, n, i) {
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
      return n && we(j, ue.eventTypes[0], ao, !1, !0);
    },
    onDisable: function() {
      return be(j, ue.eventTypes[0], ao, !0);
    }
  });
}, qu = /(input|label|select|textarea)/i, uo, ao = function(t) {
  var r = qu.test(t.target.tagName);
  (r || uo) && (t._gsapAllow = !0, uo = r);
}, Uu = function(t) {
  en(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var r = t, n = r.normalizeScrollX, i = r.momentum, o = r.allowNestedScroll, u = r.onRelease, s, f, p = Ve(t.target) || ct, m = v.core.globals().ScrollSmoother, g = m && m.get(), d = Dt && (t.content && Ve(t.content) || g && t.content !== !1 && !g.smooth() && g.content()), c = Vt(p, fe), _ = Vt(p, Le), L = 1, $ = (ue.isTouch && z.visualViewport ? z.visualViewport.scale * z.visualViewport.width : z.outerWidth) / z.innerWidth, R = 0, K = Be(i) ? function() {
    return i(s);
  } : function() {
    return i || 2.8;
  }, B, C, V = ns(p, t.type, !0, o), w = function() {
    return C = !1;
  }, b = mt, q = mt, de = function() {
    f = It(p, fe), q = lr(Dt ? 1 : 0, f), n && (b = lr(0, It(p, Le))), B = Qt;
  }, x = function() {
    d._gsap.y = Tr(parseFloat(d._gsap.y) + c.offset) + "px", d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(d._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, ae = function() {
    if (C) {
      requestAnimationFrame(w);
      var ce = Tr(s.deltaY / 2), ie = q(c.v - ce);
      if (d && ie !== c.v + c.offset) {
        c.offset = ie - c.v;
        var a = Tr((parseFloat(d && d._gsap.y) || 0) - c.offset);
        d.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + a + ", 0, 1)", d._gsap.y = a + "px", c.cacheID = N.cache, Tt();
      }
      return !0;
    }
    c.offset && x(), C = !0;
  }, T, Qe, X, ge, Ce = function() {
    de(), T.isActive() && T.vars.scrollY > f && (c() > f ? T.progress(1) && c(f) : T.resetTo("scrollY", f));
  };
  return d && v.set(d, {
    y: "+=0"
  }), t.ignoreCheck = function(H) {
    return Dt && H.type === "touchmove" && ae() || L > 1.05 && H.type !== "touchstart" || s.isGesturing || H.touches && H.touches.length > 1;
  }, t.onPress = function() {
    C = !1;
    var H = L;
    L = Tr((z.visualViewport && z.visualViewport.scale || 1) / $), T.pause(), H !== L && An(p, L > 1.01 ? !0 : n ? !1 : "x"), Qe = _(), X = c(), de(), B = Qt;
  }, t.onRelease = t.onGestureStart = function(H, ce) {
    if (c.offset && x(), !ce)
      ge.restart(!0);
    else {
      N.cache++;
      var ie = K(), a, le;
      n && (a = _(), le = a + ie * 0.05 * -H.velocityX / 0.227, ie *= so(_, a, le, It(p, Le)), T.vars.scrollX = b(le)), a = c(), le = a + ie * 0.05 * -H.velocityY / 0.227, ie *= so(c, a, le, It(p, fe)), T.vars.scrollY = q(le), T.invalidate().duration(ie).play(0.01), (Dt && T.vars.scrollY >= f || a >= f - 1) && v.to({}, {
        onUpdate: Ce,
        duration: ie
      });
    }
    u && u(H);
  }, t.onWheel = function() {
    T._ts && T.pause(), ze() - R > 1e3 && (B = 0, R = ze());
  }, t.onChange = function(H, ce, ie, a, le) {
    if (Qt !== B && de(), ce && n && _(b(a[2] === ce ? Qe + (H.startX - H.x) : _() + ce - a[1])), ie) {
      c.offset && x();
      var Wt = le[2] === ie, Mt = Wt ? X + H.startY - H.y : c() + ie - le[1], Ke = q(Mt);
      Wt && Mt !== Ke && (X += Ke - Mt), c(Ke);
    }
    (ie || ce) && Tt();
  }, t.onEnable = function() {
    An(p, n ? !1 : "x"), k.addEventListener("refresh", Ce), we(z, "resize", Ce), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = _.smooth = !1), V.enable();
  }, t.onDisable = function() {
    An(p, !0), be(z, "resize", Ce), k.removeEventListener("refresh", Ce), V.kill();
  }, t.lockAxis = t.lockAxis !== !1, s = new ue(t), s.iOS = Dt, Dt && !c() && c(1), Dt && v.ticker.add(mt), ge = s._dc, T = v.to(s, {
    ease: "power4",
    paused: !0,
    scrollX: n ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: rs(c, c(), function() {
        return T.pause();
      })
    },
    onUpdate: Tt,
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
  _getVelocityProp: Fn,
  _inputObserver: ns,
  _scrollers: N,
  _proxies: _t,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      rt || er("scrollStart"), rt = ze();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Me;
    }
  }
};
Go() && v.registerPlugin(k);
function Gu(e = 100) {
  return (t) => Math.floor(t * e) / e;
}
M.registerPlugin(k);
class is extends Fr {
  static create(t, r = {}, n = {}) {
    return new is(t, r, n);
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
        var T, Qe;
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
        const p = o.getBoundingClientRect(), m = f.getBoundingClientRect(), g = p.width + m.width, d = document.createDocumentFragment(), c = [];
        let _ = m.width;
        if (!g || !_)
          return;
        for (; _ <= g; ) {
          const X = f.cloneNode(!0);
          _ += m.width, c.push(X);
        }
        d.append(...c), s.append(d);
        const L = M.context(() => {
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
        ), R = M.utils.wrap(0, -m.width), K = M.utils.normalize(0, -m.width);
        let B, C, V, w, b, q, de, x;
        const ae = M.ticker.add(() => {
          var X, ge;
          switch (x = M.ticker.deltaRatio(), C = M.utils.interpolate(
            C ?? 0,
            i.meta.scrollTrigger.getVelocity(),
            0.5 * x
          ), V = C * i.meta.velocity, i.meta.direction) {
            case "ltr":
              B = -1, V = -Math.abs(V);
              break;
            case "rtl":
              B = 1, V = Math.abs(V);
              break;
            case "scroll":
              B = i.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              B = -(i.meta.scrollTrigger.direction ?? 1), V = -V;
          }
          w = M.getProperty(s, "x"), b = i.meta.speed * -B, q = (b - V) * x, de = R(w + q), $(de), (ge = (X = i.meta).onUpdate) == null || ge.call(X, K(de));
        });
        return (Qe = (T = i.meta).onCreated) == null || Qe.call(T), () => {
          var X;
          for (L.kill(!0), M.ticker.remove(ae), o == null || o.replaceChildren(...i.meta.sourceDOM.childNodes); c.length; )
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
function ha(e, t = {}, r = {}) {
  const n = F(
    t,
    Q,
    xo(["onUpdate", "onCreated"])
  ), i = F(
    t,
    Q,
    To(["onUpdate", "onCreated"]),
    Br(Y(xt, Q)),
    hn
  ), o = ft(() => k.create(i.scrollTriggerVars ?? {})), u = bn(e), s = Y(
    tt(ia(i.createDOM ?? !0)),
    tt(
      Y(
        We(ra),
        We(ta(i, n, o()))
      )
    ),
    at("create marquee instances", { config: i })
  );
  return wn(() => {
    const p = s(u);
    return () => F(
      p,
      at(),
      Ft(zt((m) => m.revert()))
    );
  }, Q(r));
}
function ta(e, t, r) {
  const n = ft(tu());
  let i = 0;
  return (o) => {
    const u = (w = o.rects.innerRect.width, b = o.rects.boundingWidth) => F(
      w > 0 && b > 0,
      Or(fs, new Error("Zero width")),
      We(
        Y(
          () => w <= b,
          mn(() => {
            const q = o.dom.innerContainer.cloneNode(!0);
            return i = w + o.rects.innerRect.width, n().append(q), u(i, b), n();
          }, n)
        )
      )
    ), s = M.quickSetter(o.dom.outerContainer, "x", "px"), f = Y(Gu(1e3), s), p = ju(0, -o.rects.innerRect.width), m = Qu(0, -o.rects.innerRect.width);
    let g, d, c, _, L, $, R, K;
    const B = ft(
      () => M.ticker.add(() => {
        var w;
        switch (d = M.ticker.deltaRatio(), _ = Ku(
          _ ?? 0,
          r.getVelocity(),
          0.5 * d
        ), c = _ * (e.scrollVelocity || 0), e.direction || "rtl") {
          case "ltr":
            g = -1, c = -Math.abs(c);
            break;
          case "rtl":
            g = 1, c = Math.abs(c);
            break;
          case "scroll":
            g = r.direction ?? 1;
            break;
          case "scroll-reverse":
            g = -(r.direction ?? 1), c = -c;
        }
        L = M.getProperty(o.dom.outerContainer, "x"), $ = (e.speed || 1) * -g, R = ($ - c) * d, K = p(L + R), f(K), (w = t.onUpdate) == null || w.call(t, m(K));
      })
    );
    Y(
      u,
      We(Js(o.dom.outerContainer)),
      zt(
        (w) => M.set(w, {
          x: 0,
          force3D: !0,
          width: i,
          display: "flex",
          flexWrap: "nowrap"
        })
      ),
      B,
      () => {
        var w;
        return (w = t.onCreated) == null ? void 0 : w.call(t);
      }
    )();
    function V() {
      M.ticker.remove(B()), o.dom.target.replaceChildren(...o.dom.targetClone.childNodes);
    }
    return Object.freeze({ revert: V });
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
  const t = vn();
  return (r) => {
    const n = F(
      r,
      co(!!e, Ju),
      Lt(t)
    ), i = F(
      n,
      xs(co(!!e, ea)),
      Lt(t)
    );
    return F(
      [n, i],
      tt(Ms),
      ([u, s]) => As(u, s),
      yo(([u, s]) => ({
        target: r,
        outerContainer: u,
        innerContainer: s,
        targetClone: r.cloneNode(!0)
      })),
      Qn(({ target: u, innerContainer: s, outerContainer: f }) => {
        fo(!!e, Boolean, () => {
          s.append(...u.childNodes), f.append(s), u.append(f);
        }), M.set(s, Zu);
      }),
      pn(new Error("Invalid marquee DOM.")),
      Lt(t)
    );
  };
}
function co(e, t) {
  return Y(
    Un(() => e, Ro("div"), Po(`.${t}`)),
    pn(
      new Error(
        e ? "Could not create marquee container." : `Could not find marquee container .${t}`
      )
    ),
    zt((r) => r.classList.add(t))
  );
}
class os extends Fr {
  constructor(t, r = {}, n = {}) {
    super(async (i, o) => {
      const u = os.SplitText;
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
      }), p = i.meta.parentSplit = new u(t, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...Q(r.parentSplitVars)
      }), m = {
        y: (d, c) => {
          const _ = parseFloat(getComputedStyle(c).lineHeight);
          return isNaN(_) ? M.getProperty(c, "height") : _;
        },
        ...Q(r.fromVars)
      }, g = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...Q(r.toVars)
      };
      return o.add(() => {
        i.meta.setup = M.set(p.lines, { overflow: "hidden" }), i.meta.tween = M.fromTo(f.lines, m, g);
      }), () => {
        f.revert(), o.kill(!0);
      };
    }, n);
  }
}
function pa(e, t, r = {}) {
  const n = F(
    t,
    Q,
    Br(Y(xt, Q)),
    hn
  ), i = pn(
    n.SplitText,
    new Error("Missing `SplitText` GSAP member plugin.")
  ), o = Y(
    bn,
    at(),
    tt(
      (p) => F(
        i,
        We((m) => ({
          childSplit: new m(p, {
            type: "lines",
            linesClass: "owow-split-child",
            ...n.childSplitVars
          }),
          parentSplit: new m(p, {
            type: "lines",
            linesClass: "owow-split-parent",
            ...n.parentSplitVars
          })
        })),
        Lt(vn())
      )
    )
  ), u = {
    y: (p, m) => {
      const g = parseFloat(getComputedStyle(m).lineHeight);
      return isNaN(g) ? M.getProperty(m, "height") : g;
    },
    ...n.fromVars
  }, s = {
    y: 0,
    stagger: { each: 0.05 },
    duration: 0.8,
    ease: "power2.inOut",
    ...n.toVars
  };
  return wn(() => {
    const p = o(e), m = M.context(() => {
      po(
        p,
        zt(({ parentSplit: g, childSplit: d }) => {
          M.set(g.lines, { overflow: "hidden" }), M.fromTo(d.lines, u, s);
        })
      );
    });
    return () => {
      Ft(
        p,
        zt(({ childSplit: g }) => g.revert())
      ), m.kill(!0);
    };
  }, Q(r));
}
M.registerPlugin(k);
function oa(e, t = {}, r = {}) {
  const n = F(t, Q, xo(["updater"])), i = F(
    t,
    Q,
    To(["updater"]),
    Br(Y(xt, Q)),
    hn
  ), o = Y(
    bn,
    tt(
      (g) => k.create({
        trigger: g,
        start: "top bottom",
        end: "bottom top",
        ...i.scrollTriggerVars
      })
    )
  ), u = (g) => () => g.progress, s = (g = 1) => (d) => {
    var c;
    return ((c = n.updater) == null ? void 0 : c.call(n, d, g)) ?? -d * 100 * g;
  }, f = (g, d, c) => Y(
    u(d),
    s(
      ru(g, "data-parallax-speed") ?? i.speed
    ),
    c,
    Cr
  ), p = Y(
    o,
    tt((g) => {
      const d = g.trigger, c = M.quickSetter(d, "y", i.cssUnit ?? "%"), _ = M.quickSetter(d, "x", i.cssUnit ?? "%");
      return {
        scrollTrigger: g,
        updateY: f(d, g, c),
        updateX: f(d, g, _),
        destroy: () => g.kill()
      };
    })
  );
  return wn(() => {
    const g = p(e), d = M.ticker.add(() => {
      Ft(g, ({ updateY: c }) => {
        c();
      });
    });
    return () => {
      M.ticker.remove(d), Ft(g, (c) => c.destroy());
    };
  }, Q(r));
}
function ma(e, t = {}, r = {}) {
  const n = F(
    t,
    Q,
    Br(Y(xt, Q)),
    hn
  ), i = n.size ?? 1.5, o = Y(
    bn,
    tt(sa(n.createDOM ?? !0, "owow-diorama-outer", "owow-diorama-inner")),
    tt(
      We(
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
  return wn(() => {
    const s = o(e), f = M.context(() => {
      F(
        tt(s, Si),
        an(cn),
        Ft(({ dom: m, outerRect: g }) => {
          M.set(m.outer, { height: g.height, overflow: "hidden" }), M.set(m.inner, { height: g.height * i });
        })
      );
    }), p = F(
      tt(
        s,
        Y(
          We((m) => {
            const g = M.utils.interpolate(
              -(m.outerRect.height * i - m.outerRect.height),
              0
            );
            return oa(m.dom.inner, {
              cssUnit: "px",
              updater: g
            });
          }),
          Si
        )
      ),
      an(cn)
    );
    return () => {
      f.kill(!0), Ft(p, (m) => m());
    };
  }, Q(r));
}
function sa(e, t, r) {
  const n = Y(
    Ro("div"),
    go((i) => i.classList.add(t))
  );
  return Y(
    Un(
      () => e,
      (i) => {
        const o = eu(i), u = i.cloneNode(!0), s = n();
        return u.classList.add(r), s.append(u), o(s), Cs({
          inner: u,
          outer: s,
          original: i
        });
      },
      (i) => F(
        i,
        Or(
          ua(t, r),
          new Error("Invalid DOM structure for diorama")
        ),
        Lt(vn()),
        We(() => ({
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
    return mo(
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
  la as Ease,
  is as Marquee,
  Fr as Motion,
  Ao as Pointer,
  da as SecondOrderDynamics,
  os as TextClipReveal,
  ma as createDiorama,
  ha as createMarquee,
  wn as createMotion,
  oa as createParallax,
  Pu as createPhysicsBasedMotion,
  pa as createTextClipReveal,
  Mu as getMousePosition,
  fa as mousePosition,
  ga as physicsBasedMotion
};
