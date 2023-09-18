import { fromEventPattern as co, fromEvent as sn, noop as ns, debounceTime as lo, Observable as ii, BehaviorSubject as is, skip as os, map as oi } from "rxjs";
import $, { gsap as We } from "gsap";
const Tn = 1.70158, xn = 0.7, oa = {
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
  inExpo: (e) => e === 0 ? 0 : Math.pow(2, 10 * (e - 1)),
  /**
   * Easing function that starts fast, decelerates rapidly and then speeds up to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outExpo: (e) => e === 1 ? 1 : -Math.pow(2, -10 * e) + 1,
  /**
   * Easing function that combines inExpo and outExpo, creating a rapid acceleration and deceleration with a slow start and end.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutExpo: (e) => e === 0 || e === 1 ? e : e * 2 < 1 ? 0.5 * Math.pow(2, 10 * (e * 2 - 1)) : 0.5 * (-Math.pow(2, -10 * (e * 2 - 1)) + 2),
  /**
   * Easing function that starts slow, accelerates and then decelerates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inCirc: (e) => -1 * (Math.sqrt(1 - e / 1 * e) - 1),
  /**
   * Easing function that starts fast, decelerates and then accelerates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outCirc: (e) => Math.sqrt(1 - Math.pow(e - 1, 2)),
  /**
   * Easing function that combines inCirc and outCirc, creating an acceleration and deceleration with a fast start and end.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutCirc: (e) => e * 2 < 1 ? -0.5 * (Math.sqrt(1 - Math.pow(e * 2, 2)) - 1) : 0.5 * (Math.sqrt(1 - Math.pow(e * 2 - 2, 2)) + 1),
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
    return -(Math.pow(2, 10 * n) * Math.sin((n - o) * (2 * Math.PI) / i));
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
    return Math.pow(2, -10 * n) * Math.sin((n - i) * (2 * Math.PI) / r) + 1;
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
    return n < 1 ? -0.5 * (Math.pow(2, 10 * i) * Math.sin((i - o) * (2 * Math.PI) / r)) : Math.pow(2, -10 * i) * Math.sin((i - o) * (2 * Math.PI) / r) * 0.5 + 1;
  }
};
function V() {
  let e = arguments[0];
  for (let t = 1, r = arguments.length; t < r; t++)
    e = arguments[t](e);
  return e;
}
function H() {
  let e = arguments;
  return function() {
    let t = e[0].apply(null, arguments);
    for (let r = 1, n = e.length; r < n; r++)
      t = e[r](t);
    return t;
  };
}
function ss(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function us(e) {
  if (!(e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0))
    return e;
  var t = e.BS_PRIVATE_NESTED_SOME_NONE;
  if (t !== 0)
    return {
      BS_PRIVATE_NESTED_SOME_NONE: t - 1 | 0
    };
}
function as(e) {
  return e;
}
function si(e, t, r, n) {
  return t(e) ? r(e) : n(e);
}
function fo() {
  if (arguments.length === 3) {
    const e = arguments;
    return function(r) {
      return si(r, e[0], e[1], e[2]);
    };
  }
  return si(arguments[0], arguments[1], arguments[2], arguments[3]);
}
function un(e) {
}
function ui(e, t, r) {
  return t(e) ? r(e) : e;
}
function go() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return ui(r, e[0], e[1]);
    };
  }
  return ui(arguments[0], arguments[1], arguments[2]);
}
function ai(e, t) {
  return t(e), e;
}
function ho() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return ai(r, e[0]);
    };
  }
  return ai(arguments[0], arguments[1]);
}
function it(e) {
  var t = {
    contents: void 0
  };
  return function(...r) {
    var n = t.contents;
    if (n !== void 0)
      return us(n);
    var i = e(...r);
    return t.contents = ss(i), i;
  };
}
function pn(e) {
  return e;
}
function cs(e, t) {
  if (e <= 0)
    return [];
  for (var r = new Array(e), n = 0; n < e; ++n)
    r[n] = t;
  return r;
}
function Un(e, t) {
  for (var r = 0, n = e.length; r < n; ++r)
    t(e[r]);
}
function ls(e, t) {
  for (var r = e.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = t(e[i]);
  return n;
}
function fs(e, t, r) {
  for (var n = t, i = 0, o = e.length; i < o; ++i)
    n = r(n, e[i]);
  return n;
}
function ds(e, t) {
  for (var r = e.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !0;
    if (!t(e[i]))
      return !1;
    n = i + 1 | 0;
  }
}
function gs(e, t) {
  for (var r = e.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !1;
    if (t(e[i]))
      return !0;
    n = i + 1 | 0;
  }
}
var ci = cs;
function po() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return ci(r, e[0]);
    };
  }
  return ci(arguments[0], arguments[1]);
}
function hs(e) {
  return e.length !== 0;
}
function li(e, t) {
  return ls(e, t);
}
function tt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return li(r, e[0]);
    };
  }
  return li(arguments[0], arguments[1]);
}
function fi(e, t) {
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
      return fi(r, e[0]);
    };
  }
  return fi(arguments[0], arguments[1]);
}
var di = gs;
function ps() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return di(r, e[0]);
    };
  }
  return di(arguments[0], arguments[1]);
}
var gi = Un;
function Bt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return gi(r, e[0]);
    };
  }
  return gi(arguments[0], arguments[1]);
}
function Nn(e) {
  return fs(e, [], function(t, r) {
    return Array.isArray(r) ? Un(r, function(n) {
      t.push(n);
    }) : t.push(r), t;
  });
}
function hi(e, t) {
  return Un(e, t), e;
}
function mo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return hi(r, e[0]);
    };
  }
  return hi(arguments[0], arguments[1]);
}
function pi(e, t) {
  return ds(e, t);
}
function ms() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return pi(r, e[0]);
    };
  }
  return pi(arguments[0], arguments[1]);
}
function mi(e, t, r) {
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
    t = mi(r, o, -s | 0), e = n.apply(null, mi(r, 0, o));
  }
}
function _s(e, t) {
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
function vs(e) {
  var t = e.length;
  return t === 1 ? e : function(r) {
    return _s(e, r);
  };
}
function bs(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function ws(e, t) {
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
function ys(e, t) {
  return vo(e, vs(t));
}
function Es(e, t) {
  return e.TAG === 0 ? e._0 : t;
}
function _i(e, t) {
  return e == null ? {
    TAG: 1,
    _0: t
  } : {
    TAG: 0,
    _0: e
  };
}
function mn() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return _i(r, e[0]);
    };
  }
  return _i(arguments[0], arguments[1]);
}
function vi(e, t, r) {
  return ys(mn(e, r), function(n) {
    return t(n) ? {
      TAG: 0,
      _0: n
    } : {
      TAG: 1,
      _0: r
    };
  });
}
function cn() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return vi(r, e[0], e[1]);
    };
  }
  return vi(arguments[0], arguments[1], arguments[2]);
}
var bi = ws;
function rt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return bi(r, e[0]);
    };
  }
  return bi(arguments[0], arguments[1]);
}
var wi = vo;
function Ss() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return wi(r, e[0]);
    };
  }
  return wi(arguments[0], arguments[1]);
}
function yi(e) {
  return Es(e, void 0);
}
function Ts(e) {
  if (e.TAG === 0)
    return bs(e._0);
}
function Ei(e, t) {
  return e.TAG !== 0 || t(e._0), e;
}
function Kt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ei(r, e[0]);
    };
  }
  return Ei(arguments[0], arguments[1]);
}
function Si(e, t) {
  return e.TAG === 0 || t(e._0), e;
}
function Gt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Si(r, e[0]);
    };
  }
  return Si(arguments[0], arguments[1]);
}
var xs = (e) => ({
  TAG: 0,
  _0: e
});
function bo(e) {
  return typeof e == "string";
}
function Ti(e) {
  return typeof e == "function";
}
function ln(e) {
  return e != null;
}
function Gn(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function Ms(e) {
  if (e != null)
    return Gn(e);
}
function Zt(e) {
  if (!(e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0))
    return e;
  var t = e.BS_PRIVATE_NESTED_SOME_NONE;
  if (t !== 0)
    return {
      BS_PRIVATE_NESTED_SOME_NONE: t - 1 | 0
    };
}
function Cs(e, t) {
  if (e !== void 0)
    return Gn(t(Zt(e)));
}
function Os(e, t) {
  if (e !== void 0)
    return t(Zt(e));
}
function ks(e, t) {
  return e !== void 0 ? Zt(e) : t;
}
function Ft(e) {
  if (e != null)
    return Gn(e);
}
var xi = Cs;
function Ps() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return xi(r, e[0]);
    };
  }
  return xi(arguments[0], arguments[1]);
}
var Mi = Os;
function Rs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Mi(r, e[0]);
    };
  }
  return Mi(arguments[0], arguments[1]);
}
function Ci(e, t) {
  if (e !== void 0)
    return Ms(t(Zt(e)));
}
function Ds() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ci(r, e[0]);
    };
  }
  return Ci(arguments[0], arguments[1]);
}
function As(e) {
  return ks(e, void 0);
}
function Oi(e, t) {
  return e !== void 0 && t(Zt(e)), e;
}
function qn() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Oi(r, e[0]);
    };
  }
  return Oi(arguments[0], arguments[1]);
}
function ki(e, t) {
  if (e !== void 0 && t !== void 0)
    return [
      Zt(e),
      Zt(t)
    ];
}
function Ns() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return ki(r, e[0]);
    };
  }
  return ki(arguments[0], arguments[1]);
}
var Is = function(e, t) {
  delete e[t];
};
function jn(e) {
  for (var t = {}, r = e.length, n = 0; n < r; ++n) {
    var i = e[n];
    t[i[0]] = i[1];
  }
  return t;
}
function zs(e, t) {
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
function wo(e, t) {
  for (var r = e.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = t(e[i]);
  return n;
}
function Ls(e, t, r) {
  for (var n = t, i = 0, o = e.length; i < o; ++i)
    n = r(n, e[i]);
  return n;
}
function Pi(e, t) {
  return zs(e, [t]);
}
function Fs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Pi(r, e[0]);
    };
  }
  return Pi(arguments[0], arguments[1]);
}
function Vs(e) {
  return Object.entries(e);
}
function Ri(e, t) {
  return Object.assign({}, e, t);
}
function Ws() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ri(r, e[0]);
    };
  }
  return Ri(arguments[0], arguments[1]);
}
function Di(e, t) {
  var r = Ws({}, e);
  return Bs(t, function(n) {
    return Is(r, n);
  }), r;
}
function yo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Di(r, e[0]);
    };
  }
  return Di(arguments[0], arguments[1]);
}
function Ai(e, t) {
  return jn(wo(Object.keys(e), function(r) {
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
      return Ai(r, e[0]);
    };
  }
  return Ai(arguments[0], arguments[1]);
}
function Ni(e, t) {
  return jn(wo(Object.keys(e), function(r) {
    var n = t(r, e[r]);
    return [
      r,
      n
    ];
  }));
}
function Ii() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ni(r, e[0]);
    };
  }
  return Ni(arguments[0], arguments[1]);
}
function zi(e, t) {
  return jn(Ls(Object.keys(e), [], function(r, n) {
    var i = e[n];
    return t(n, i) ? Fs(r, [
      n,
      i
    ]) : r;
  }));
}
function $s() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return zi(r, e[0]);
    };
  }
  return zi(arguments[0], arguments[1]);
}
function Bi(e, t) {
  return $s(e, function(r, n) {
    return t.includes(r);
  });
}
function Eo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Bi(r, e[0]);
    };
  }
  return Bi(arguments[0], arguments[1]);
}
function Li(e, t, r) {
  return e ? t(void 0) : r(void 0);
}
function _n() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return Li(r, e[0], e[1]);
    };
  }
  return Li(arguments[0], arguments[1], arguments[2]);
}
function Q(e, ...t) {
  return !ps(["SplitText"], (n) => Ti(e) && n.includes(e.name)) && Ti(e) ? e.call(null, t) : e;
}
function Ys(e) {
  return () => e;
}
function vn() {
  return it(() => globalThis);
}
function Xs() {
  const e = vn();
  return it(() => e().document.documentElement);
}
function Hs() {
  const e = vn();
  return it(() => e().screen);
}
function Us(e) {
  return new Map(e);
}
function So(e) {
  return it(() => Us(e == null ? void 0 : e()));
}
function Fi(e) {
  return (t) => e.get(t);
}
function Vi(e) {
  return (t, r) => e.set(t, r);
}
const Gs = () => {
};
function To(e) {
  let t = e;
  return Object.freeze({
    getValue: () => t,
    setValue: (r) => t = r
  });
}
function bn() {
  return (e) => console.error(String(e));
}
function Dt(e, ...t) {
  return ho(
    un
  );
}
function Wi(e, ...t) {
}
function xo() {
  const e = vn(), t = To(!0), r = We.ticker.add(() => void t.setValue(!0)), n = it((i) => (o) => V(
    t.getValue(),
    Dt,
    go(Boolean, () => {
      t.setValue(!1), i(o);
    })
  ));
  return it(
    () => co(
      (i) => {
        e().addEventListener("resize", n(i), { passive: !0 });
      },
      (i) => {
        We.ticker.remove(r), e().removeEventListener("resize", n(i));
      }
    )
  );
}
function qs() {
  return it(() => sn(globalThis, "mousemove", { passive: !0 }));
}
function js() {
  return it((e) => {
    const t = /* @__PURE__ */ new Set(), r = new ResizeObserver(() => t.forEach((i) => i()));
    return co(
      (i) => (Bt(e, r.observe.bind(r)), t.add(i), r),
      (i) => {
        Bt(e, r.unobserve.bind(r)), t.delete(i);
      }
    );
  });
}
function Mo(e) {
  return V(
    Ft(e),
    Ds(
      H(
        bo,
        _n(Co(e), Ys(e))
      )
    ),
    As
  );
}
function Co(e) {
  return (t = document) => t == null ? void 0 : t.querySelector(e);
}
function Qs(e) {
  return (t = document) => Array.from(t.querySelectorAll(e));
}
function Oo(e, t) {
  return () => document.createElement(e, t);
}
function Ks(e) {
  return (...t) => (e.append(...t), e);
}
function Zs(e) {
  return (...t) => {
    e.replaceWith(...t);
  };
}
function Js() {
  return () => document.createDocumentFragment();
}
function wn(e) {
  return V(
    po(1, Q(e)),
    Nn,
    tt(
      (t) => V(
        t,
        bo,
        _n(Qs(t), () => [Mo(t)])
      )
    ),
    Nn,
    an(ln)
  );
}
var Fr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function eu(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var tu = "Expected a function", $i = 0 / 0, ru = "[object Symbol]", nu = /^\s+|\s+$/g, iu = /^[-+]0x[0-9a-f]+$/i, ou = /^0b[01]+$/i, su = /^0o[0-7]+$/i, uu = parseInt, au = typeof Fr == "object" && Fr && Fr.Object === Object && Fr, cu = typeof self == "object" && self && self.Object === Object && self, lu = au || cu || Function("return this")(), fu = Object.prototype, du = fu.toString, gu = Math.max, hu = Math.min, Mn = function() {
  return lu.Date.now();
};
function pu(e, t, r) {
  var n, i, o, u, s, f, p = 0, m = !1, d = !1, h = !0;
  if (typeof e != "function")
    throw new TypeError(tu);
  t = Yi(t) || 0, In(r) && (m = !!r.leading, d = "maxWait" in r, o = d ? gu(Yi(r.maxWait) || 0, t) : o, h = "trailing" in r ? !!r.trailing : h);
  function c(w) {
    var b = n, U = i;
    return n = i = void 0, p = w, u = e.apply(U, b), u;
  }
  function _(w) {
    return p = w, s = setTimeout(k, t), m ? c(w) : u;
  }
  function z(w) {
    var b = w - f, U = w - p, de = t - b;
    return d ? hu(de, o - U) : de;
  }
  function W(w) {
    var b = w - f, U = w - p;
    return f === void 0 || b >= t || b < 0 || d && U >= o;
  }
  function k() {
    var w = Mn();
    if (W(w))
      return K(w);
    s = setTimeout(k, z(w));
  }
  function K(w) {
    return s = void 0, h && n ? c(w) : (n = i = void 0, u);
  }
  function B() {
    s !== void 0 && clearTimeout(s), p = 0, n = f = i = s = void 0;
  }
  function M() {
    return s === void 0 ? u : K(Mn());
  }
  function L() {
    var w = Mn(), b = W(w);
    if (n = arguments, i = this, f = w, b) {
      if (s === void 0)
        return _(f);
      if (d)
        return s = setTimeout(k, t), c(f);
    }
    return s === void 0 && (s = setTimeout(k, t)), u;
  }
  return L.cancel = B, L.flush = M, L;
}
function In(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function mu(e) {
  return !!e && typeof e == "object";
}
function _u(e) {
  return typeof e == "symbol" || mu(e) && du.call(e) == ru;
}
function Yi(e) {
  if (typeof e == "number")
    return e;
  if (_u(e))
    return $i;
  if (In(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = In(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(nu, "");
  var r = ou.test(e);
  return r || su.test(e) ? uu(e.slice(2), r ? 2 : 8) : iu.test(e) ? $i : +e;
}
var vu = pu;
const bu = /* @__PURE__ */ eu(vu), ko = class {
  constructor(e, t = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = bu(
      () => {
        var r;
        (r = this.cleanup) == null || r.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      ko.resetDebounceTime,
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
      return this.context = $.context(ns), [
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
    return e * $.ticker.deltaRatio(this.referenceFramerate);
  }
  createAndSetCleanup() {
    var t;
    const e = (t = this.create) == null ? void 0 : t.call(this, this, this.context);
    e instanceof Promise ? e.then((r) => this.cleanup = r ?? void 0) : this.cleanup = e ?? void 0;
  }
  observeMedia(e) {
    e && (this.mediaQueryList = matchMedia(e), this.subscriptions.push(sn(this.mediaQueryList, "change").subscribe(() => this.reset())));
  }
  observeResize(e) {
    e && (this.motionResizeObserver = new wu(e), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(lo(100)).subscribe(() => this.reset())
    ));
  }
};
let Lr = ko;
Lr.resetDebounceTime = 100;
Lr.referenceFramerate = 60;
class wu {
  constructor(t) {
    const [r, n] = [t].flat();
    this.target = typeof r == "string" ? document.querySelector(r) : r, this.axis = n, this.target === window ? this.observable = new ii((i) => {
      const o = () => this.handleWindowResize(i);
      return window.addEventListener("resize", o, { passive: !0 }), () => window.removeEventListener("resize", o);
    }) : this.observable = new ii((i) => {
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
  const r = V(t, Q, Br(H(Ft, Q))), n = js(), i = To(un), o = new is(e);
  o.subscribe(() => {
    i.getValue()(!1), i.setValue(e() ?? un);
  });
  const u = (d) => (h) => V(
    h.pipe(os((d == null ? void 0 : d.skip) ?? 0), lo((d == null ? void 0 : d.debounce) ?? 300)).subscribe(
      H(
        Dt(`run effect from subscription: ${d == null ? void 0 : d.name}`),
        () => o.next(e)
      )
    ),
    Dt()
  ), s = V(
    po(1, r.observeElementResize),
    Nn,
    tt(Mo),
    an(ln),
    mo(Eu("Observing the <body> for resizes may cause chain reactions."))
  ), f = V(
    s,
    cn(hs, "No elements to observe."),
    rt(n),
    rt(
      H(
        u({ debounce: r.debounceTime, skip: 1, name: "element resize" }),
        Dt()
      )
    ),
    Gt(Wi)
  ), p = V(
    r.observeWindowResize,
    cn(Boolean, "Window resize observing disabled."),
    rt(yu),
    rt(
      H(
        u({ debounce: r.debounceTime, name: "window resize" }),
        Dt()
      )
    ),
    Gt(Wi)
  );
  function m() {
    Kt(f, (d) => d.unsubscribe()), Kt(p, (d) => d.unsubscribe()), i.getValue()(!0);
  }
  return m;
}
const yu = xo();
function Eu(e) {
  return (t) => V(
    _n(t.tagName === "BODY", () => `Warning: ${e}`, Gs),
    Ft,
    qn(bn())
  );
}
function St(e, t) {
  return { x: e, y: t };
}
function Kr(e, t) {
  return {
    ...e,
    nx: e.x / t.x,
    ny: e.y / t.y
  };
}
class Po extends Lr {
  constructor() {
    super(
      (t) => {
        t.meta.observable = sn(window, "mousemove"), t.subscriptions.push(
          t.meta.observable.subscribe((r) => {
            this.clientX = r.clientX, this.clientY = r.clientY, this.normalX = $.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = $.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), t.subscriptions.push(
          sn(window, "resize").subscribe(() => {
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
    return this._instance ?? (this._instance = new Po());
  }
  /**
   * Returns the observable for mouse events.
   */
  get observable() {
    return this.meta.observable;
  }
}
const sa = it(() => {
  const e = V(Xi(), Fi), t = V(Xi(), Vi), r = V(Hi(), Fi), n = V(Hi(), Vi), i = Su().pipe(oi(Qn));
  return Tu().pipe(oi(xu)).subscribe(
    H(
      Ii(
        (u, s) => V(
          r(u),
          Ft,
          Ps((f) => Kr(s, f)),
          qn((f) => t(u, f))
        )
      )
    )
  ), i.subscribe(H(Ii(n))), {
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
}), Su = xo(), Tu = qs(), Xi = So(
  H(Qn, (e) => [
    ["client", Kr(St(0, 0), e.client)],
    ["page", Kr(St(0, 0), e.page)],
    ["screen", Kr(St(0, 0), e.screen)]
  ])
), Hi = So(H(Qn, Vs));
function xu(e) {
  return {
    client: St(e.clientX, e.clientY),
    page: St(e.pageX, e.pageY),
    screen: St(e.screenX, e.screenY)
  };
}
function Qn() {
  const e = Xs(), t = vn(), r = Hs();
  return {
    client: St(t().innerWidth, t().innerHeight),
    page: St(e().scrollWidth, e().scrollHeight),
    screen: St(r().width, r().height)
  };
}
class ua {
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
    const i = Math.max(this.k2, t * t / 2 + t * this.k1 / 2, t * this.k1);
    return this.y = this.y + t * this.yd, this.yd = this.yd + t * (r + this.k3 * n - this.y - this.k1 * this.yd) / i, this.y;
  }
}
function aa(e = 1, t = 1, r = 0, n = 0) {
  const i = t / (Math.PI * e), o = 1 / (2 * Math.PI * e * (2 * Math.PI * e)), u = r * t / (2 * Math.PI * e);
  let s = n, f = n, p = 0;
  function m(d, h) {
    const c = (h - s) / d, _ = Math.max(o, d * d / 2 + d * i / 2, d * i);
    return s = h, f = f + d * p, p = p + d * (h + u * c - f - i * p) / _, f;
  }
  return Object.freeze({ update: m });
}
function Ui(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Mu(e, t, r) {
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
var Se, zn, je, At, Nt, dr, Ro, Ht, Or, Do, Et, at, Ao, No = function() {
  return Se || typeof window < "u" && (Se = window.gsap) && Se.registerPlugin && Se;
}, Io = 1, lr = [], A = [], _t = [], kr = Date.now, Bn = function(t, r) {
  return r;
}, Cu = function() {
  var t = Or.core, r = t.bridge || {}, n = t._scrollers, i = t._proxies;
  n.push.apply(n, A), i.push.apply(i, _t), A = n, _t = i, Bn = function(u, s) {
    return r[u](s);
  };
}, zt = function(t, r) {
  return ~_t.indexOf(t) && _t[_t.indexOf(t) + 1][r];
}, Pr = function(t) {
  return !!~Do.indexOf(t);
}, Fe = function(t, r, n, i, o) {
  return t.addEventListener(r, n, {
    passive: !i,
    capture: !!o
  });
}, Ne = function(t, r, n, i) {
  return t.removeEventListener(r, n, !!i);
}, Vr = "scrollLeft", Wr = "scrollTop", Ln = function() {
  return Et && Et.isPressed || A.cache++;
}, fn = function(t, r) {
  var n = function i(o) {
    if (o || o === 0) {
      Io && (je.history.scrollRestoration = "manual");
      var u = Et && Et.isPressed;
      o = i.v = Math.round(o) || (Et && Et.iOS ? 1 : 0), t(o), i.cacheID = A.cache, u && Bn("ss", o);
    } else
      (r || A.cache !== i.cacheID || Bn("ref")) && (i.cacheID = A.cache, i.v = t());
    return i.v + i.offset;
  };
  return n.offset = 0, t && n;
}, Be = {
  s: Vr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: fn(function(e) {
    return arguments.length ? je.scrollTo(e, fe.sc()) : je.pageXOffset || At[Vr] || Nt[Vr] || dr[Vr] || 0;
  })
}, fe = {
  s: Wr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Be,
  sc: fn(function(e) {
    return arguments.length ? je.scrollTo(Be.sc(), e) : je.pageYOffset || At[Wr] || Nt[Wr] || dr[Wr] || 0;
  })
}, Ve = function(t) {
  return Se.utils.toArray(t)[0] || (typeof t == "string" && Se.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, Lt = function(t, r) {
  var n = r.s, i = r.sc;
  Pr(t) && (t = At.scrollingElement || Nt);
  var o = A.indexOf(t), u = i === fe.sc ? 1 : 2;
  !~o && (o = A.push(t) - 1), A[o + u] || t.addEventListener("scroll", Ln);
  var s = A[o + u], f = s || (A[o + u] = fn(zt(t, n), !0) || (Pr(t) ? i : fn(function(p) {
    return arguments.length ? t[n] = p : t[n];
  })));
  return f.target = t, s || (f.smooth = Se.getProperty(t, "scrollBehavior") === "smooth"), f;
}, Fn = function(t, r, n) {
  var i = t, o = t, u = kr(), s = u, f = r || 50, p = Math.max(500, f * 3), m = function(_, z) {
    var W = kr();
    z || W - u > f ? (o = i, i = _, s = u, u = W) : n ? i += _ : i = o + (_ - o) / (W - s) * (u - s);
  }, d = function() {
    o = i = n ? 0 : i, s = u = 0;
  }, h = function(_) {
    var z = s, W = o, k = kr();
    return (_ || _ === 0) && _ !== i && m(_), u === s || k - s > p ? 0 : (i + (n ? W : -W)) / ((n ? k : u) - z) * 1e3;
  };
  return {
    update: m,
    reset: d,
    getVelocity: h
  };
}, Er = function(t, r) {
  return r && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Gi = function(t) {
  var r = Math.max.apply(Math, t), n = Math.min.apply(Math, t);
  return Math.abs(r) >= Math.abs(n) ? r : n;
}, zo = function() {
  Or = Se.core.globals().ScrollTrigger, Or && Or.core && Cu();
}, Bo = function(t) {
  return Se = t || No(), Se && typeof document < "u" && document.body && (je = window, At = document, Nt = At.documentElement, dr = At.body, Do = [je, At, Nt, dr], Se.utils.clamp, Ao = Se.core.context || function() {
  }, Ht = "onpointerenter" in dr ? "pointer" : "mouse", Ro = ue.isTouch = je.matchMedia && je.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in je || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, at = ue.eventTypes = ("ontouchstart" in Nt ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in Nt ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return Io = 0;
  }, 500), zo(), zn = 1), zn;
};
Be.op = fe;
A.cache = 0;
var ue = /* @__PURE__ */ function() {
  function e(r) {
    this.init(r);
  }
  var t = e.prototype;
  return t.init = function(n) {
    zn || Bo(Se) || console.warn("Please gsap.registerPlugin(Observer)"), Or || zo();
    var i = n.tolerance, o = n.dragMinimum, u = n.type, s = n.target, f = n.lineHeight, p = n.debounce, m = n.preventDefault, d = n.onStop, h = n.onStopDelay, c = n.ignore, _ = n.wheelSpeed, z = n.event, W = n.onDragStart, k = n.onDragEnd, K = n.onDrag, B = n.onPress, M = n.onRelease, L = n.onRight, w = n.onLeft, b = n.onUp, U = n.onDown, de = n.onChangeX, x = n.onChangeY, ae = n.onChange, T = n.onToggleX, Qe = n.onToggleY, Y = n.onHover, ge = n.onHoverEnd, Ce = n.onMove, X = n.ignoreCheck, ce = n.isNormalizer, ie = n.onGestureStart, a = n.onGestureEnd, le = n.onWheel, Vt = n.onEnable, xt = n.onDisable, Ke = n.onClick, Mt = n.scrollSpeed, G = n.capture, Te = n.allowClicks, Oe = n.lockAxis, pr = n.onLockAxis;
    this.target = s = Ve(s) || Nt, this.vars = n, c && (c = Se.utils.toArray(c)), i = i || 1e-9, o = o || 0, _ = _ || 1, Mt = Mt || 1, u = u || "wheel,touch,pointer", p = p !== !1, f || (f = parseFloat(je.getComputedStyle(dr).lineHeight) || 22);
    var $e, Ze, N, he, Ye, dt, ke, l = this, vt = 0, q = 0, Ct = Lt(s, Be), Ot = Lt(s, fe), rr = Ct(), Pe = Ot(), mr = ~u.indexOf("touch") && !~u.indexOf("pointer") && at[0] === "pointerdown", kt = Pr(s), te = s.ownerDocument || At, Xe = [0, 0, 0], Re = [0, 0, 0], _r = 0, De = function() {
      return _r = kr();
    }, gt = function(E, g) {
      return (l.event = E) && c && ~c.indexOf(E.target) || g && mr && E.pointerType !== "touch" || X && X(E, g);
    }, vr = function() {
      l._vx.reset(), l._vy.reset(), Ze.pause(), d && d(l);
    }, Pt = function() {
      var E = l.deltaX = Gi(Xe), g = l.deltaY = Gi(Re), y = Math.abs(E) >= i, S = Math.abs(g) >= i;
      ae && (y || S) && ae(l, E, g, Xe, Re), y && (L && l.deltaX > 0 && L(l), w && l.deltaX < 0 && w(l), de && de(l), T && l.deltaX < 0 != vt < 0 && T(l), vt = l.deltaX, Xe[0] = Xe[1] = Xe[2] = 0), S && (U && l.deltaY > 0 && U(l), b && l.deltaY < 0 && b(l), x && x(l), Qe && l.deltaY < 0 != q < 0 && Qe(l), q = l.deltaY, Re[0] = Re[1] = Re[2] = 0), (he || N) && (Ce && Ce(l), N && (K(l), N = !1), he = !1), dt && !(dt = !1) && pr && pr(l), Ye && (le(l), Ye = !1), $e = 0;
    }, nr = function(E, g, y) {
      Xe[y] += E, Re[y] += g, l._vx.update(E), l._vy.update(g), p ? $e || ($e = requestAnimationFrame(Pt)) : Pt();
    }, Wt = function(E, g) {
      Oe && !ke && (l.axis = ke = Math.abs(E) > Math.abs(g) ? "x" : "y", dt = !0), ke !== "y" && (Xe[2] += E, l._vx.update(E, !0)), ke !== "x" && (Re[2] += g, l._vy.update(g, !0)), p ? $e || ($e = requestAnimationFrame(Pt)) : Pt();
    }, $t = function(E) {
      if (!gt(E, 1)) {
        E = Er(E, m);
        var g = E.clientX, y = E.clientY, S = g - l.x, O = y - l.y, pe = l.isDragging;
        l.x = g, l.y = y, (pe || Math.abs(l.startX - g) >= o || Math.abs(l.startY - y) >= o) && (K && (N = !0), pe || (l.isDragging = !0), Wt(S, O), pe || W && W(l));
      }
    }, D = l.onPress = function(C) {
      gt(C, 1) || C && C.button || (l.axis = ke = null, Ze.pause(), l.isPressed = !0, C = Er(C), vt = q = 0, l.startX = l.x = C.clientX, l.startY = l.y = C.clientY, l._vx.reset(), l._vy.reset(), Fe(ce ? s : te, at[1], $t, m, !0), l.deltaX = l.deltaY = 0, B && B(l));
    }, bt = l.onRelease = function(C) {
      if (!gt(C, 1)) {
        Ne(ce ? s : te, at[1], $t, !0);
        var E = !isNaN(l.y - l.startY), g = l.isDragging && (Math.abs(l.x - l.startX) > 3 || Math.abs(l.y - l.startY) > 3), y = Er(C);
        !g && E && (l._vx.reset(), l._vy.reset(), m && Te && Se.delayedCall(0.08, function() {
          if (kr() - _r > 300 && !C.defaultPrevented) {
            if (C.target.click)
              C.target.click();
            else if (te.createEvent) {
              var S = te.createEvent("MouseEvents");
              S.initMouseEvent("click", !0, !0, je, 1, y.screenX, y.screenY, y.clientX, y.clientY, !1, !1, !1, !1, 0, null), C.target.dispatchEvent(S);
            }
          }
        })), l.isDragging = l.isGesturing = l.isPressed = !1, d && !ce && Ze.restart(!0), k && g && k(l), M && M(l, g);
      }
    }, ot = function(E) {
      return E.touches && E.touches.length > 1 && (l.isGesturing = !0) && ie(E, l.isDragging);
    }, st = function() {
      return (l.isGesturing = !1) || a(l);
    }, Je = function(E) {
      if (!gt(E)) {
        var g = Ct(), y = Ot();
        nr((g - rr) * Mt, (y - Pe) * Mt, 1), rr = g, Pe = y, d && Ze.restart(!0);
      }
    }, ut = function(E) {
      if (!gt(E)) {
        E = Er(E, m), le && (Ye = !0);
        var g = (E.deltaMode === 1 ? f : E.deltaMode === 2 ? je.innerHeight : 1) * _;
        nr(E.deltaX * g, E.deltaY * g, 0), d && !ce && Ze.restart(!0);
      }
    }, Yt = function(E) {
      if (!gt(E)) {
        var g = E.clientX, y = E.clientY, S = g - l.x, O = y - l.y;
        l.x = g, l.y = y, he = !0, (S || O) && Wt(S, O);
      }
    }, ir = function(E) {
      l.event = E, Y(l);
    }, wt = function(E) {
      l.event = E, ge(l);
    }, br = function(E) {
      return gt(E) || Er(E, m) && Ke(l);
    };
    Ze = l._dc = Se.delayedCall(h || 0.25, vr).pause(), l.deltaX = l.deltaY = 0, l._vx = Fn(0, 50, !0), l._vy = Fn(0, 50, !0), l.scrollX = Ct, l.scrollY = Ot, l.isDragging = l.isGesturing = l.isPressed = !1, Ao(this), l.enable = function(C) {
      return l.isEnabled || (Fe(kt ? te : s, "scroll", Ln), u.indexOf("scroll") >= 0 && Fe(kt ? te : s, "scroll", Je, m, G), u.indexOf("wheel") >= 0 && Fe(s, "wheel", ut, m, G), (u.indexOf("touch") >= 0 && Ro || u.indexOf("pointer") >= 0) && (Fe(s, at[0], D, m, G), Fe(te, at[2], bt), Fe(te, at[3], bt), Te && Fe(s, "click", De, !1, !0), Ke && Fe(s, "click", br), ie && Fe(te, "gesturestart", ot), a && Fe(te, "gestureend", st), Y && Fe(s, Ht + "enter", ir), ge && Fe(s, Ht + "leave", wt), Ce && Fe(s, Ht + "move", Yt)), l.isEnabled = !0, C && C.type && D(C), Vt && Vt(l)), l;
    }, l.disable = function() {
      l.isEnabled && (lr.filter(function(C) {
        return C !== l && Pr(C.target);
      }).length || Ne(kt ? te : s, "scroll", Ln), l.isPressed && (l._vx.reset(), l._vy.reset(), Ne(ce ? s : te, at[1], $t, !0)), Ne(kt ? te : s, "scroll", Je, G), Ne(s, "wheel", ut, G), Ne(s, at[0], D, G), Ne(te, at[2], bt), Ne(te, at[3], bt), Ne(s, "click", De, !0), Ne(s, "click", br), Ne(te, "gesturestart", ot), Ne(te, "gestureend", st), Ne(s, Ht + "enter", ir), Ne(s, Ht + "leave", wt), Ne(s, Ht + "move", Yt), l.isEnabled = l.isPressed = l.isDragging = !1, xt && xt(l));
    }, l.kill = l.revert = function() {
      l.disable();
      var C = lr.indexOf(l);
      C >= 0 && lr.splice(C, 1), Et === l && (Et = 0);
    }, lr.push(l), ce && Pr(s) && (Et = l), l.enable(z);
  }, Mu(e, [{
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
ue.register = Bo;
ue.getAll = function() {
  return lr.slice();
};
ue.getById = function(e) {
  return lr.filter(function(t) {
    return t.vars.id === e;
  })[0];
};
No() && Se.registerPlugin(ue);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var v, ar, I, j, lt, ee, Lo, dn, gn, fr, Zr, $r, Me, En, Vn, Ie, qi, ji, cr, Fo, Cn, Vo, Ue, Wo, $o, Yo, Rt, Wn, Kn, On, Yr = 1, ze = Date.now, kn = ze(), nt = 0, Tr = 0, Ou = function e() {
  return Tr && requestAnimationFrame(e);
}, Qi = function() {
  return En = 1;
}, Ki = function() {
  return En = 0;
}, mt = function(t) {
  return t;
}, xr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Xo = function() {
  return typeof window < "u";
}, Ho = function() {
  return v || Xo() && (v = window.gsap) && v.registerPlugin && v;
}, Jt = function(t) {
  return !!~Lo.indexOf(t);
}, Uo = function(t) {
  return zt(t, "getBoundingClientRect") || (Jt(t) ? function() {
    return on.width = I.innerWidth, on.height = I.innerHeight, on;
  } : function() {
    return yt(t);
  });
}, ku = function(t, r, n) {
  var i = n.d, o = n.d2, u = n.a;
  return (u = zt(t, "getBoundingClientRect")) ? function() {
    return u()[i];
  } : function() {
    return (r ? I["inner" + o] : t["client" + o]) || 0;
  };
}, Pu = function(t, r) {
  return !r || ~_t.indexOf(t) ? Uo(t) : function() {
    return on;
  };
}, It = function(t, r) {
  var n = r.s, i = r.d2, o = r.d, u = r.a;
  return Math.max(0, (n = "scroll" + i) && (u = zt(t, n)) ? u() - Uo(t)()[o] : Jt(t) ? (lt[n] || ee[n]) - (I["inner" + i] || lt["client" + i] || ee["client" + i]) : t[n] - t["offset" + i]);
}, Xr = function(t, r) {
  for (var n = 0; n < cr.length; n += 3)
    (!r || ~r.indexOf(cr[n + 1])) && t(cr[n], cr[n + 1], cr[n + 2]);
}, ct = function(t) {
  return typeof t == "string";
}, Le = function(t) {
  return typeof t == "function";
}, Mr = function(t) {
  return typeof t == "number";
}, Jr = function(t) {
  return typeof t == "object";
}, Sr = function(t, r, n) {
  return t && t.progress(r ? 0 : 1) && n && t.pause();
}, Pn = function(t, r) {
  if (t.enabled) {
    var n = r(t);
    n && n.totalTime && (t.callbackAnimation = n);
  }
}, sr = Math.abs, Go = "left", qo = "top", Zn = "right", Jn = "bottom", qt = "width", jt = "height", Rr = "Right", Dr = "Left", Ar = "Top", Nr = "Bottom", ne = "padding", et = "margin", hr = "Width", ei = "Height", Ee = "px", ft = function(t) {
  return I.getComputedStyle(t);
}, Ru = function(t) {
  var r = ft(t).position;
  t.style.position = r === "absolute" || r === "fixed" ? r : "relative";
}, Zi = function(t, r) {
  for (var n in r)
    n in t || (t[n] = r[n]);
  return t;
}, yt = function(t, r) {
  var n = r && ft(t)[Vn] !== "matrix(1, 0, 0, 1, 0, 0)" && v.to(t, {
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
}, jo = function(t) {
  var r = [], n = t.labels, i = t.duration(), o;
  for (o in n)
    r.push(n[o] / i);
  return r;
}, Du = function(t) {
  return function(r) {
    return v.utils.snap(jo(t), r);
  };
}, ti = function(t) {
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
}, Au = function(t) {
  return function(r, n) {
    return ti(jo(t))(r, n.direction);
  };
}, Hr = function(t, r, n, i) {
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
}, Ji = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Gr = {
  toggleActions: "play",
  anticipatePin: 0
}, hn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, en = function(t, r) {
  if (ct(t)) {
    var n = t.indexOf("="), i = ~n ? +(t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
    ~n && (t.indexOf("%") > n && (i *= r / 100), t = t.substr(0, n - 1)), t = i + (t in hn ? hn[t] * r : ~t.indexOf("%") ? parseFloat(t) * r / 100 : parseFloat(t) || 0);
  }
  return t;
}, qr = function(t, r, n, i, o, u, s, f) {
  var p = o.startColor, m = o.endColor, d = o.fontSize, h = o.indent, c = o.fontWeight, _ = j.createElement("div"), z = Jt(n) || zt(n, "pinType") === "fixed", W = t.indexOf("scroller") !== -1, k = z ? ee : n, K = t.indexOf("start") !== -1, B = K ? p : m, M = "border-color:" + B + ";font-size:" + d + ";color:" + B + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return M += "position:" + ((W || f) && z ? "fixed;" : "absolute;"), (W || f || !z) && (M += (i === fe ? Zn : Jn) + ":" + (u + parseFloat(h)) + "px;"), s && (M += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), _._isStart = K, _.setAttribute("class", "gsap-marker-" + t + (r ? " marker-" + r : "")), _.style.cssText = M, _.innerText = r || r === 0 ? t + "-" + r : t, k.children[0] ? k.insertBefore(_, k.children[0]) : k.appendChild(_), _._offset = _["offset" + i.op.d2], tn(_, 0, i, K), _;
}, tn = function(t, r, n, i) {
  var o = {
    display: "block"
  }, u = n[i ? "os2" : "p2"], s = n[i ? "p2" : "os2"];
  t._isFlipped = i, o[n.a + "Percent"] = i ? -100 : 0, o[n.a] = i ? "1px" : 0, o["border" + u + hr] = 1, o["border" + s + hr] = 0, o[n.p] = r + "px", v.set(t, o);
}, P = [], Yn = {}, zr, eo = function() {
  return ze() - nt > 34 && (zr || (zr = requestAnimationFrame(Tt)));
}, ur = function() {
  (!Ue || !Ue.isPressed || Ue.startX > ee.clientWidth) && (A.cache++, Ue ? zr || (zr = requestAnimationFrame(Tt)) : Tt(), nt || tr("scrollStart"), nt = ze());
}, Rn = function() {
  Yo = I.innerWidth, $o = I.innerHeight;
}, Cr = function() {
  A.cache++, !Me && !Vo && !j.fullscreenElement && !j.webkitFullscreenElement && (!Wo || Yo !== I.innerWidth || Math.abs(I.innerHeight - $o) > I.innerHeight * 0.25) && dn.restart(!0);
}, er = {}, Nu = [], Qo = function e() {
  return be(R, "scrollEnd", e) || Ut(!0);
}, tr = function(t) {
  return er[t] && er[t].map(function(r) {
    return r();
  }) || Nu;
}, Ge = [], Ko = function(t) {
  for (var r = 0; r < Ge.length; r += 5)
    (!t || Ge[r + 4] && Ge[r + 4].query === t) && (Ge[r].style.cssText = Ge[r + 1], Ge[r].getBBox && Ge[r].setAttribute("transform", Ge[r + 2] || ""), Ge[r + 3].uncache = 1);
}, ri = function(t, r) {
  var n;
  for (Ie = 0; Ie < P.length; Ie++)
    n = P[Ie], n && (!r || n._ctx === r) && (t ? n.kill(1) : n.revert(!0, !0));
  r && Ko(r), r || tr("revert");
}, Zo = function(t, r) {
  A.cache++, (r || !qe) && A.forEach(function(n) {
    return Le(n) && n.cacheID++ && (n.rec = 0);
  }), ct(t) && (I.history.scrollRestoration = Kn = t);
}, qe, Qt = 0, to, Iu = function() {
  if (to !== Qt) {
    var t = to = Qt;
    requestAnimationFrame(function() {
      return t === Qt && Ut(!0);
    });
  }
}, Ut = function(t, r) {
  if (nt && !t) {
    we(R, "scrollEnd", Qo);
    return;
  }
  qe = R.isRefreshing = !0, A.forEach(function(i) {
    return Le(i) && i.cacheID++ && (i.rec = i());
  });
  var n = tr("refreshInit");
  Fo && R.sort(), r || ri(), A.forEach(function(i) {
    Le(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
  }), P.slice(0).forEach(function(i) {
    return i.refresh();
  }), P.forEach(function(i, o) {
    if (i._subPinOffset && i.pin) {
      var u = i.vars.horizontal ? "offsetWidth" : "offsetHeight", s = i.pin[u];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[u] - s), i.refresh();
    }
  }), P.forEach(function(i) {
    return i.vars.end === "max" && i.setPositions(i.start, Math.max(i.start + 1, It(i.scroller, i._dir)));
  }), n.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), A.forEach(function(i) {
    Le(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), Zo(Kn, 1), dn.pause(), Qt++, qe = 2, Tt(2), P.forEach(function(i) {
    return Le(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), qe = R.isRefreshing = !1, tr("refresh");
}, Xn = 0, rn = 1, Ir, Tt = function(t) {
  if (!qe || t === 2) {
    R.isUpdating = !0, Ir && Ir.update(0);
    var r = P.length, n = ze(), i = n - kn >= 50, o = r && P[0].scroll();
    if (rn = Xn > o ? -1 : 1, qe || (Xn = o), i && (nt && !En && n - nt > 200 && (nt = 0, tr("scrollEnd")), Zr = kn, kn = n), rn < 0) {
      for (Ie = r; Ie-- > 0; )
        P[Ie] && P[Ie].update(0, i);
      rn = 1;
    } else
      for (Ie = 0; Ie < r; Ie++)
        P[Ie] && P[Ie].update(0, i);
    R.isUpdating = !1;
  }
  zr = 0;
}, Hn = [Go, qo, Jn, Zn, et + Nr, et + Rr, et + Ar, et + Dr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], nn = Hn.concat([qt, jt, "boxSizing", "max" + hr, "max" + ei, "position", et, ne, ne + Ar, ne + Rr, ne + Nr, ne + Dr]), zu = function(t, r, n) {
  gr(n);
  var i = t._gsap;
  if (i.spacerIsNative)
    gr(i.spacerState);
  else if (t._gsap.swappedIn) {
    var o = r.parentNode;
    o && (o.insertBefore(t, r), o.removeChild(r));
  }
  t._gsap.swappedIn = !1;
}, Dn = function(t, r, n, i) {
  if (!t._gsap.swappedIn) {
    for (var o = Hn.length, u = r.style, s = t.style, f; o--; )
      f = Hn[o], u[f] = n[f];
    u.position = n.position === "absolute" ? "absolute" : "relative", n.display === "inline" && (u.display = "inline-block"), s[Jn] = s[Zn] = "auto", u.flexBasis = n.flexBasis || "auto", u.overflow = "visible", u.boxSizing = "border-box", u[qt] = $n(t, Be) + Ee, u[jt] = $n(t, fe) + Ee, u[ne] = s[et] = s[qo] = s[Go] = "0", gr(i), s[qt] = s["max" + hr] = n[qt], s[jt] = s["max" + ei] = n[jt], s[ne] = n[ne], t.parentNode !== r && (t.parentNode.insertBefore(r, t), r.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, Bu = /([A-Z])/g, gr = function(t) {
  if (t) {
    var r = t.t.style, n = t.length, i = 0, o, u;
    for ((t.t._gsap || v.core.getCache(t.t)).uncache = 1; i < n; i += 2)
      u = t[i + 1], o = t[i], u ? r[o] = u : r[o] && r.removeProperty(o.replace(Bu, "-$1").toLowerCase());
  }
}, jr = function(t) {
  for (var r = nn.length, n = t.style, i = [], o = 0; o < r; o++)
    i.push(nn[o], n[nn[o]]);
  return i.t = t, i;
}, Lu = function(t, r, n) {
  for (var i = [], o = t.length, u = n ? 8 : 0, s; u < o; u += 2)
    s = t[u], i.push(s, s in r ? r[s] : t[u + 1]);
  return i.t = t.t, i;
}, on = {
  left: 0,
  top: 0
}, ro = function(t, r, n, i, o, u, s, f, p, m, d, h, c) {
  Le(t) && (t = t(f)), ct(t) && t.substr(0, 3) === "max" && (t = h + (t.charAt(4) === "=" ? en("0" + t.substr(3), n) : 0));
  var _ = c ? c.time() : 0, z, W, k;
  if (c && c.seek(0), Mr(t))
    c && (t = v.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, h, t)), s && tn(s, n, i, !0);
  else {
    Le(r) && (r = r(f));
    var K = (t || "0").split(" "), B, M, L, w;
    k = Ve(r) || ee, B = yt(k) || {}, (!B || !B.left && !B.top) && ft(k).display === "none" && (w = k.style.display, k.style.display = "block", B = yt(k), w ? k.style.display = w : k.style.removeProperty("display")), M = en(K[0], B[i.d]), L = en(K[1] || "0", n), t = B[i.p] - p[i.p] - m + M + o - L, s && tn(s, L, i, n - L < 20 || s._isStart && L > 20), n -= n - L;
  }
  if (u) {
    var b = t + n, U = u._isStart;
    z = "scroll" + i.d2, tn(u, b, i, U && b > 20 || !U && (d ? Math.max(ee[z], lt[z]) : u.parentNode[z]) <= b + 1), d && (p = yt(s), d && (u.style[i.op.p] = p[i.op.p] - i.op.m - u._offset + Ee));
  }
  return c && k && (z = yt(k), c.seek(h), W = yt(k), c._caScrollDist = z[i.p] - W[i.p], t = t / c._caScrollDist * h), c && c.seek(_), c ? t : Math.round(t);
}, Fu = /(webkit|moz|length|cssText|inset)/i, no = function(t, r, n, i) {
  if (t.parentNode !== r) {
    var o = t.style, u, s;
    if (r === ee) {
      t._stOrig = o.cssText, s = ft(t);
      for (u in s)
        !+u && !Fu.test(u) && s[u] && typeof o[u] == "string" && u !== "0" && (o[u] = s[u]);
      o.top = n, o.left = i;
    } else
      o.cssText = t._stOrig;
    v.core.getCache(t).uncache = 1, r.appendChild(t);
  }
}, Jo = function(t, r, n) {
  var i = r, o = i;
  return function(u) {
    var s = Math.round(t());
    return s !== i && s !== o && Math.abs(s - i) > 3 && Math.abs(s - o) > 3 && (u = s, n && n()), o = i, i = u, u;
  };
}, io = function(t, r) {
  var n = Lt(t, r), i = "_scroll" + r.p2, o = function u(s, f, p, m, d) {
    var h = u.tween, c = f.onComplete, _ = {};
    p = p || n();
    var z = Jo(n, p, function() {
      h.kill(), u.tween = 0;
    });
    return d = m && d || 0, m = m || s - p, h && h.kill(), f[i] = s, f.modifiers = _, _[i] = function() {
      return z(p + m * h.ratio + d * h.ratio * h.ratio);
    }, f.onUpdate = function() {
      A.cache++, Tt();
    }, f.onComplete = function() {
      u.tween = 0, c && c.call(h);
    }, h = u.tween = v.to(t, f), h;
  };
  return t[i] = n, n.wheelHandler = function() {
    return o.tween && o.tween.kill() && (o.tween = 0);
  }, we(t, "wheel", n.wheelHandler), R.isTouch && we(t, "touchmove", n.wheelHandler), o;
}, R = /* @__PURE__ */ function() {
  function e(r, n) {
    ar || e.register(v) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(r, n);
  }
  var t = e.prototype;
  return t.init = function(n, i) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !Tr) {
      this.update = this.refresh = this.kill = mt;
      return;
    }
    n = Zi(ct(n) || Mr(n) || n.nodeType ? {
      trigger: n
    } : n, Gr);
    var o = n, u = o.onUpdate, s = o.toggleClass, f = o.id, p = o.onToggle, m = o.onRefresh, d = o.scrub, h = o.trigger, c = o.pin, _ = o.pinSpacing, z = o.invalidateOnRefresh, W = o.anticipatePin, k = o.onScrubComplete, K = o.onSnapComplete, B = o.once, M = o.snap, L = o.pinReparent, w = o.pinSpacer, b = o.containerAnimation, U = o.fastScrollEnd, de = o.preventOverlaps, x = n.horizontal || n.containerAnimation && n.horizontal !== !1 ? Be : fe, ae = !d && d !== 0, T = Ve(n.scroller || I), Qe = v.core.getCache(T), Y = Jt(T), ge = ("pinType" in n ? n.pinType : zt(T, "pinType") || Y && "fixed") === "fixed", Ce = [n.onEnter, n.onLeave, n.onEnterBack, n.onLeaveBack], X = ae && n.toggleActions.split(" "), ce = "markers" in n ? n.markers : Gr.markers, ie = Y ? 0 : parseFloat(ft(T)["border" + x.p2 + hr]) || 0, a = this, le = n.onRefreshInit && function() {
      return n.onRefreshInit(a);
    }, Vt = ku(T, Y, x), xt = Pu(T, Y), Ke = 0, Mt = 0, G = Lt(T, x), Te, Oe, pr, $e, Ze, N, he, Ye, dt, ke, l, vt, q, Ct, Ot, rr, Pe, mr, kt, te, Xe, Re, _r, De, gt, vr, Pt, nr, Wt, $t, D, bt, ot, st, Je, ut, Yt, ir, wt;
    if (Wn(a), a._dir = x, W *= 45, a.scroller = T, a.scroll = b ? b.time.bind(b) : G, $e = G(), a.vars = n, i = i || n.animation, "refreshPriority" in n && (Fo = 1, n.refreshPriority === -9999 && (Ir = a)), Qe.tweenScroll = Qe.tweenScroll || {
      top: io(T, fe),
      left: io(T, Be)
    }, a.tweenTo = Te = Qe.tweenScroll[x.p], a.scrubDuration = function(g) {
      bt = Mr(g) && g, bt ? D ? D.duration(g) : D = v.to(i, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: bt,
        paused: !0,
        onComplete: function() {
          return k && k(a);
        }
      }) : (D && D.progress(1).kill(), D = 0);
    }, i && (i.vars.lazy = !1, i._initted || i.vars.immediateRender !== !1 && n.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), a.animation = i.pause(), i.scrollTrigger = a, a.scrubDuration(d), D && D.resetTo && D.resetTo("totalProgress", 0), Wt = 0, f || (f = i.vars.id)), P.push(a), M && ((!Jr(M) || M.push) && (M = {
      snapTo: M
    }), "scrollBehavior" in ee.style && v.set(Y ? [ee, lt] : T, {
      scrollBehavior: "auto"
    }), A.forEach(function(g) {
      return Le(g) && g.target === (Y ? j.scrollingElement || lt : T) && (g.smooth = !1);
    }), pr = Le(M.snapTo) ? M.snapTo : M.snapTo === "labels" ? Du(i) : M.snapTo === "labelsDirectional" ? Au(i) : M.directional !== !1 ? function(g, y) {
      return ti(M.snapTo)(g, ze() - Mt < 500 ? 0 : y.direction);
    } : v.utils.snap(M.snapTo), ot = M.duration || {
      min: 0.1,
      max: 2
    }, ot = Jr(ot) ? fr(ot.min, ot.max) : fr(ot, ot), st = v.delayedCall(M.delay || bt / 2 || 0.1, function() {
      var g = G(), y = ze() - Mt < 500, S = Te.tween;
      if ((y || Math.abs(a.getVelocity()) < 10) && !S && !En && Ke !== g) {
        var O = (g - N) / q, pe = i && !ae ? i.totalProgress() : O, F = y ? 0 : (pe - $t) / (ze() - Zr) * 1e3 || 0, Z = v.utils.clamp(-O, 1 - O, sr(F / 2) * F / 0.185), ye = O + (M.inertia === !1 ? 0 : Z), me = fr(0, 1, pr(ye, a)), oe = Math.round(N + me * q), J = M, He = J.onStart, Ae = J.onInterrupt, _e = J.onComplete;
        if (g <= he && g >= N && oe !== g) {
          if (S && !S._initted && S.data <= sr(oe - g))
            return;
          M.inertia === !1 && (Z = me - O), Te(oe, {
            duration: ot(sr(Math.max(sr(ye - pe), sr(me - pe)) * 0.185 / F / 0.05 || 0)),
            ease: M.ease || "power3",
            data: sr(oe - g),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return st.restart(!0) && Ae && Ae(a);
            },
            onComplete: function() {
              a.update(), Ke = G(), Wt = $t = i && !ae ? i.totalProgress() : a.progress, K && K(a), _e && _e(a);
            }
          }, g, Z * q, oe - g - Z * q), He && He(a, Te.tween);
        }
      } else
        a.isActive && Ke !== g && st.restart(!0);
    }).pause()), f && (Yn[f] = a), h = a.trigger = Ve(h || c), wt = h && h._gsap && h._gsap.stRevert, wt && (wt = wt(a)), c = c === !0 ? h : Ve(c), ct(s) && (s = {
      targets: h,
      className: s
    }), c && (_ === !1 || _ === et || (_ = !_ && c.parentNode && c.parentNode.style && ft(c.parentNode).display === "flex" ? !1 : ne), a.pin = c, Oe = v.core.getCache(c), Oe.spacer ? Ct = Oe.pinState : (w && (w = Ve(w), w && !w.nodeType && (w = w.current || w.nativeElement), Oe.spacerIsNative = !!w, w && (Oe.spacerState = jr(w))), Oe.spacer = Pe = w || j.createElement("div"), Pe.classList.add("pin-spacer"), f && Pe.classList.add("pin-spacer-" + f), Oe.pinState = Ct = jr(c)), n.force3D !== !1 && v.set(c, {
      force3D: !0
    }), a.spacer = Pe = Oe.spacer, nr = ft(c), _r = nr[_ + x.os2], kt = v.getProperty(c), te = v.quickSetter(c, x.a, Ee), Dn(c, Pe, nr), rr = jr(c)), ce) {
      vt = Jr(ce) ? Zi(ce, Ji) : Ji, ke = qr("scroller-start", f, T, x, vt, 0), l = qr("scroller-end", f, T, x, vt, 0, ke), mr = ke["offset" + x.op.d2];
      var br = Ve(zt(T, "content") || T);
      Ye = this.markerStart = qr("start", f, br, x, vt, mr, 0, b), dt = this.markerEnd = qr("end", f, br, x, vt, mr, 0, b), b && (ir = v.quickSetter([Ye, dt], x.a, Ee)), !ge && !(_t.length && zt(T, "fixedMarkers") === !0) && (Ru(Y ? ee : T), v.set([ke, l], {
        force3D: !0
      }), gt = v.quickSetter(ke, x.a, Ee), Pt = v.quickSetter(l, x.a, Ee));
    }
    if (b) {
      var C = b.vars.onUpdate, E = b.vars.onUpdateParams;
      b.eventCallback("onUpdate", function() {
        a.update(0, 0, 1), C && C.apply(b, E || []);
      });
    }
    a.previous = function() {
      return P[P.indexOf(a) - 1];
    }, a.next = function() {
      return P[P.indexOf(a) + 1];
    }, a.revert = function(g, y) {
      if (!y)
        return a.kill(!0);
      var S = g !== !1 || !a.enabled, O = Me;
      S !== a.isReverted && (S && (ut = Math.max(G(), a.scroll.rec || 0), Je = a.progress, Yt = i && i.progress()), Ye && [Ye, dt, ke, l].forEach(function(pe) {
        return pe.style.display = S ? "none" : "block";
      }), S && (Me = a, a.update(S)), c && (!L || !a.isActive) && (S ? zu(c, Pe, Ct) : Dn(c, Pe, ft(c), De)), S || a.update(S), Me = O, a.isReverted = S);
    }, a.refresh = function(g, y) {
      if (!((Me || !a.enabled) && !y)) {
        if (c && g && nt) {
          we(e, "scrollEnd", Qo);
          return;
        }
        !qe && le && le(a), Me = a, Mt = ze(), Te.tween && (Te.tween.kill(), Te.tween = 0), D && D.pause(), z && i && i.revert({
          kill: !1
        }).invalidate(), a.isReverted || a.revert(!0, !0), a._subPinOffset = !1;
        for (var S = Vt(), O = xt(), pe = b ? b.duration() : It(T, x), F = q <= 0.01, Z = 0, ye = 0, me = n.end, oe = n.endTrigger || h, J = n.start || (n.start === 0 || !h ? 0 : c ? "0 0" : "0 100%"), He = a.pinnedContainer = n.pinnedContainer && Ve(n.pinnedContainer), Ae = h && Math.max(0, P.indexOf(a)) || 0, _e = Ae, re, xe, or, Xt, se, ve, ht, Sn, ni, wr, pt; _e--; )
          ve = P[_e], ve.end || ve.refresh(0, 1) || (Me = a), ht = ve.pin, ht && (ht === h || ht === c || ht === He) && !ve.isReverted && (wr || (wr = []), wr.unshift(ve), ve.revert(!0, !0)), ve !== P[_e] && (Ae--, _e--);
        for (Le(J) && (J = J(a)), N = ro(J, h, S, x, G(), Ye, ke, a, O, ie, ge, pe, b) || (c ? -1e-3 : 0), Le(me) && (me = me(a)), ct(me) && !me.indexOf("+=") && (~me.indexOf(" ") ? me = (ct(J) ? J.split(" ")[0] : "") + me : (Z = en(me.substr(2), S), me = ct(J) ? J : (b ? v.utils.mapRange(0, b.duration(), b.scrollTrigger.start, b.scrollTrigger.end, N) : N) + Z, oe = h)), he = Math.max(N, ro(me || (oe ? "100% 0" : pe), oe, S, x, G() + Z, dt, l, a, O, ie, ge, pe, b)) || -1e-3, q = he - N || (N -= 0.01) && 1e-3, Z = 0, _e = Ae; _e--; )
          ve = P[_e], ht = ve.pin, ht && ve.start - ve._pinPush <= N && !b && ve.end > 0 && (re = ve.end - ve.start, (ht === h && ve.start - ve._pinPush < N || ht === He) && !Mr(J) && (Z += re * (1 - ve.progress)), ht === c && (ye += re));
        if (N += Z, he += Z, F && (Je = v.utils.clamp(0, 1, v.utils.normalize(N, he, ut))), a._pinPush = ye, Ye && Z && (re = {}, re[x.a] = "+=" + Z, He && (re[x.p] = "-=" + G()), v.set([Ye, dt], re)), c)
          re = ft(c), Xt = x === fe, or = G(), Xe = parseFloat(kt(x.a)) + ye, !pe && he > 1 && (pt = (Y ? j.scrollingElement || lt : T).style, pt = {
            style: pt,
            value: pt["overflow" + x.a.toUpperCase()]
          }, pt.style["overflow" + x.a.toUpperCase()] = "scroll"), Dn(c, Pe, re), rr = jr(c), xe = yt(c, !0), Sn = ge && Lt(T, Xt ? Be : fe)(), _ && (De = [_ + x.os2, q + ye + Ee], De.t = Pe, _e = _ === ne ? $n(c, x) + q + ye : 0, _e && De.push(x.d, _e + Ee), gr(De), He && P.forEach(function(yr) {
            yr.pin === He && yr.vars.pinSpacing !== !1 && (yr._subPinOffset = !0);
          }), ge && G(ut)), ge && (se = {
            top: xe.top + (Xt ? or - N : Sn) + Ee,
            left: xe.left + (Xt ? Sn : or - N) + Ee,
            boxSizing: "border-box",
            position: "fixed"
          }, se[qt] = se["max" + hr] = Math.ceil(xe.width) + Ee, se[jt] = se["max" + ei] = Math.ceil(xe.height) + Ee, se[et] = se[et + Ar] = se[et + Rr] = se[et + Nr] = se[et + Dr] = "0", se[ne] = re[ne], se[ne + Ar] = re[ne + Ar], se[ne + Rr] = re[ne + Rr], se[ne + Nr] = re[ne + Nr], se[ne + Dr] = re[ne + Dr], Ot = Lu(Ct, se, L), qe && G(0)), i ? (ni = i._initted, Cn(1), i.render(i.duration(), !0, !0), Re = kt(x.a) - Xe + q + ye, vr = Math.abs(q - Re) > 1, ge && vr && Ot.splice(Ot.length - 2, 2), i.render(0, !0, !0), ni || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), Cn(0)) : Re = q, pt && (pt.value ? pt.style["overflow" + x.a.toUpperCase()] = pt.value : pt.style.removeProperty("overflow-" + x.a));
        else if (h && G() && !b)
          for (xe = h.parentNode; xe && xe !== ee; )
            xe._pinOffset && (N -= xe._pinOffset, he -= xe._pinOffset), xe = xe.parentNode;
        wr && wr.forEach(function(yr) {
          return yr.revert(!1, !0);
        }), a.start = N, a.end = he, $e = Ze = qe ? ut : G(), !b && !qe && ($e < ut && G(ut), a.scroll.rec = 0), a.revert(!1, !0), st && (Ke = -1, a.isActive && G(N + q * Je), st.restart(!0)), Me = 0, i && ae && (i._initted || Yt) && i.progress() !== Yt && i.progress(Yt, !0).render(i.time(), !0, !0), (F || Je !== a.progress || b) && (i && !ae && i.totalProgress(b && N < -1e-3 && !Je ? v.utils.normalize(N, he, 0) : Je, !0), a.progress = ($e - N) / q === Je ? 0 : Je), c && _ && (Pe._pinOffset = Math.round(a.progress * Re)), D && D.invalidate(), m && !qe && m(a);
      }
    }, a.getVelocity = function() {
      return (G() - Ze) / (ze() - Zr) * 1e3 || 0;
    }, a.endAnimation = function() {
      Sr(a.callbackAnimation), i && (D ? D.progress(1) : i.paused() ? ae || Sr(i, a.direction < 0, 1) : Sr(i, i.reversed()));
    }, a.labelToScroll = function(g) {
      return i && i.labels && (N || a.refresh() || N) + i.labels[g] / i.duration() * q || 0;
    }, a.getTrailing = function(g) {
      var y = P.indexOf(a), S = a.direction > 0 ? P.slice(0, y).reverse() : P.slice(y + 1);
      return (ct(g) ? S.filter(function(O) {
        return O.vars.preventOverlaps === g;
      }) : S).filter(function(O) {
        return a.direction > 0 ? O.end <= N : O.start >= he;
      });
    }, a.update = function(g, y, S) {
      if (!(b && !S && !g)) {
        var O = qe === !0 ? ut : a.scroll(), pe = g ? 0 : (O - N) / q, F = pe < 0 ? 0 : pe > 1 ? 1 : pe || 0, Z = a.progress, ye, me, oe, J, He, Ae, _e, re;
        if (y && (Ze = $e, $e = b ? G() : O, M && ($t = Wt, Wt = i && !ae ? i.totalProgress() : F)), W && !F && c && !Me && !Yr && nt && N < O + (O - Ze) / (ze() - Zr) * W && (F = 1e-4), F !== Z && a.enabled) {
          if (ye = a.isActive = !!F && F < 1, me = !!Z && Z < 1, Ae = ye !== me, He = Ae || !!F != !!Z, a.direction = F > Z ? 1 : -1, a.progress = F, He && !Me && (oe = F && !Z ? 0 : F === 1 ? 1 : Z === 1 ? 2 : 3, ae && (J = !Ae && X[oe + 1] !== "none" && X[oe + 1] || X[oe], re = i && (J === "complete" || J === "reset" || J in i))), de && (Ae || re) && (re || d || !i) && (Le(de) ? de(a) : a.getTrailing(de).forEach(function(se) {
            return se.endAnimation();
          })), ae || (D && !Me && !Yr ? (D._dp._time - D._start !== D._time && D.render(D._dp._time - D._start), D.resetTo ? D.resetTo("totalProgress", F, i._tTime / i._tDur) : (D.vars.totalProgress = F, D.invalidate().restart())) : i && i.totalProgress(F, !!Me)), c) {
            if (g && _ && (Pe.style[_ + x.os2] = _r), !ge)
              te(xr(Xe + Re * F));
            else if (He) {
              if (_e = !g && F > Z && he + 1 > O && O + 1 >= It(T, x), L)
                if (!g && (ye || _e)) {
                  var xe = yt(c, !0), or = O - N;
                  no(c, ee, xe.top + (x === fe ? or : 0) + Ee, xe.left + (x === fe ? 0 : or) + Ee);
                } else
                  no(c, Pe);
              gr(ye || _e ? Ot : rr), vr && F < 1 && ye || te(Xe + (F === 1 && !_e ? Re : 0));
            }
          }
          M && !Te.tween && !Me && !Yr && st.restart(!0), s && (Ae || B && F && (F < 1 || !On)) && gn(s.targets).forEach(function(se) {
            return se.classList[ye || B ? "add" : "remove"](s.className);
          }), u && !ae && !g && u(a), He && !Me ? (ae && (re && (J === "complete" ? i.pause().totalProgress(1) : J === "reset" ? i.restart(!0).pause() : J === "restart" ? i.restart(!0) : i[J]()), u && u(a)), (Ae || !On) && (p && Ae && Pn(a, p), Ce[oe] && Pn(a, Ce[oe]), B && (F === 1 ? a.kill(!1, 1) : Ce[oe] = 0), Ae || (oe = F === 1 ? 1 : 3, Ce[oe] && Pn(a, Ce[oe]))), U && !ye && Math.abs(a.getVelocity()) > (Mr(U) ? U : 2500) && (Sr(a.callbackAnimation), D ? D.progress(1) : Sr(i, J === "reverse" ? 1 : !F, 1))) : ae && u && !Me && u(a);
        }
        if (Pt) {
          var Xt = b ? O / b.duration() * (b._caScrollDist || 0) : O;
          gt(Xt + (ke._isFlipped ? 1 : 0)), Pt(Xt);
        }
        ir && ir(-O / b.duration() * (b._caScrollDist || 0));
      }
    }, a.enable = function(g, y) {
      a.enabled || (a.enabled = !0, we(T, "resize", Cr), we(Y ? j : T, "scroll", ur), le && we(e, "refreshInit", le), g !== !1 && (a.progress = Je = 0, $e = Ze = Ke = G()), y !== !1 && a.refresh());
    }, a.getTween = function(g) {
      return g && Te ? Te.tween : D;
    }, a.setPositions = function(g, y) {
      c && (Xe += g - N, Re += y - g - q, _ === ne && a.adjustPinSpacing(y - g - q)), a.start = N = g, a.end = he = y, q = y - g, a.update();
    }, a.adjustPinSpacing = function(g) {
      if (De && g) {
        var y = De.indexOf(x.d) + 1;
        De[y] = parseFloat(De[y]) + g + Ee, De[1] = parseFloat(De[1]) + g + Ee, gr(De);
      }
    }, a.disable = function(g, y) {
      if (a.enabled && (g !== !1 && a.revert(!0, !0), a.enabled = a.isActive = !1, y || D && D.pause(), ut = 0, Oe && (Oe.uncache = 1), le && be(e, "refreshInit", le), st && (st.pause(), Te.tween && Te.tween.kill() && (Te.tween = 0)), !Y)) {
        for (var S = P.length; S--; )
          if (P[S].scroller === T && P[S] !== a)
            return;
        be(T, "resize", Cr), be(T, "scroll", ur);
      }
    }, a.kill = function(g, y) {
      a.disable(g, y), D && !y && D.kill(), f && delete Yn[f];
      var S = P.indexOf(a);
      S >= 0 && P.splice(S, 1), S === Ie && rn > 0 && Ie--, S = 0, P.forEach(function(O) {
        return O.scroller === a.scroller && (S = 1);
      }), S || qe || (a.scroll.rec = 0), i && (i.scrollTrigger = null, g && i.revert({
        kill: !1
      }), y || i.kill()), Ye && [Ye, dt, ke, l].forEach(function(O) {
        return O.parentNode && O.parentNode.removeChild(O);
      }), Ir === a && (Ir = 0), c && (Oe && (Oe.uncache = 1), S = 0, P.forEach(function(O) {
        return O.pin === c && S++;
      }), S || (Oe.spacer = 0)), n.onKill && n.onKill(a);
    }, a.enable(!1, !1), wt && wt(a), !i || !i.add || q ? a.refresh() : v.delayedCall(0.01, function() {
      return N || he || a.refresh();
    }) && (q = 0.01) && (N = he = 0), c && Iu();
  }, e.register = function(n) {
    return ar || (v = n || Ho(), Xo() && window.document && e.enable(), ar = Tr), ar;
  }, e.defaults = function(n) {
    if (n)
      for (var i in n)
        Gr[i] = n[i];
    return Gr;
  }, e.disable = function(n, i) {
    Tr = 0, P.forEach(function(u) {
      return u[i ? "kill" : "disable"](n);
    }), be(I, "wheel", ur), be(j, "scroll", ur), clearInterval($r), be(j, "touchcancel", mt), be(ee, "touchstart", mt), Hr(be, j, "pointerdown,touchstart,mousedown", Qi), Hr(be, j, "pointerup,touchend,mouseup", Ki), dn.kill(), Xr(be);
    for (var o = 0; o < A.length; o += 3)
      Ur(be, A[o], A[o + 1]), Ur(be, A[o], A[o + 2]);
  }, e.enable = function() {
    if (I = window, j = document, lt = j.documentElement, ee = j.body, v && (gn = v.utils.toArray, fr = v.utils.clamp, Wn = v.core.context || mt, Cn = v.core.suppressOverwrites || mt, Kn = I.history.scrollRestoration || "auto", Xn = I.pageYOffset, v.core.globals("ScrollTrigger", e), ee)) {
      Tr = 1, Ou(), ue.register(v), e.isTouch = ue.isTouch, Rt = ue.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), we(I, "wheel", ur), Lo = [I, j, lt, ee], v.matchMedia ? (e.matchMedia = function(f) {
        var p = v.matchMedia(), m;
        for (m in f)
          p.add(m, f[m]);
        return p;
      }, v.addEventListener("matchMediaInit", function() {
        return ri();
      }), v.addEventListener("matchMediaRevert", function() {
        return Ko();
      }), v.addEventListener("matchMedia", function() {
        Ut(0, 1), tr("matchMedia");
      }), v.matchMedia("(orientation: portrait)", function() {
        return Rn(), Rn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Rn(), we(j, "scroll", ur);
      var n = ee.style, i = n.borderTopStyle, o = v.core.Animation.prototype, u, s;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", u = yt(ee), fe.m = Math.round(u.top + fe.sc()) || 0, Be.m = Math.round(u.left + Be.sc()) || 0, i ? n.borderTopStyle = i : n.removeProperty("border-top-style"), $r = setInterval(eo, 250), v.delayedCall(0.5, function() {
        return Yr = 0;
      }), we(j, "touchcancel", mt), we(ee, "touchstart", mt), Hr(we, j, "pointerdown,touchstart,mousedown", Qi), Hr(we, j, "pointerup,touchend,mouseup", Ki), Vn = v.utils.checkPrefix("transform"), nn.push(Vn), ar = ze(), dn = v.delayedCall(0.2, Ut).pause(), cr = [j, "visibilitychange", function() {
        var f = I.innerWidth, p = I.innerHeight;
        j.hidden ? (qi = f, ji = p) : (qi !== f || ji !== p) && Cr();
      }, j, "DOMContentLoaded", Ut, I, "load", Ut, I, "resize", Cr], Xr(we), P.forEach(function(f) {
        return f.enable(0, 1);
      }), s = 0; s < A.length; s += 3)
        Ur(be, A[s], A[s + 1]), Ur(be, A[s], A[s + 2]);
    }
  }, e.config = function(n) {
    "limitCallbacks" in n && (On = !!n.limitCallbacks);
    var i = n.syncInterval;
    i && clearInterval($r) || ($r = i) && setInterval(eo, i), "ignoreMobileResize" in n && (Wo = e.isTouch === 1 && n.ignoreMobileResize), "autoRefreshEvents" in n && (Xr(be) || Xr(we, n.autoRefreshEvents || "none"), Vo = (n.autoRefreshEvents + "").indexOf("resize") === -1);
  }, e.scrollerProxy = function(n, i) {
    var o = Ve(n), u = A.indexOf(o), s = Jt(o);
    ~u && A.splice(u, s ? 6 : 2), i && (s ? _t.unshift(I, i, ee, i, lt, i) : _t.unshift(o, i));
  }, e.clearMatchMedia = function(n) {
    P.forEach(function(i) {
      return i._ctx && i._ctx.query === n && i._ctx.kill(!0, !0);
    });
  }, e.isInViewport = function(n, i, o) {
    var u = (ct(n) ? Ve(n) : n).getBoundingClientRect(), s = u[o ? qt : jt] * i || 0;
    return o ? u.right - s > 0 && u.left + s < I.innerWidth : u.bottom - s > 0 && u.top + s < I.innerHeight;
  }, e.positionInViewport = function(n, i, o) {
    ct(n) && (n = Ve(n));
    var u = n.getBoundingClientRect(), s = u[o ? qt : jt], f = i == null ? s / 2 : i in hn ? hn[i] * s : ~i.indexOf("%") ? parseFloat(i) * s / 100 : parseFloat(i) || 0;
    return o ? (u.left + f) / I.innerWidth : (u.top + f) / I.innerHeight;
  }, e.killAll = function(n) {
    if (P.slice(0).forEach(function(o) {
      return o.vars.id !== "ScrollSmoother" && o.kill();
    }), n !== !0) {
      var i = er.killAll || [];
      er = {}, i.forEach(function(o) {
        return o();
      });
    }
  }, e;
}();
R.version = "3.11.5";
R.saveStyles = function(e) {
  return e ? gn(e).forEach(function(t) {
    if (t && t.style) {
      var r = Ge.indexOf(t);
      r >= 0 && Ge.splice(r, 5), Ge.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), v.core.getCache(t), Wn());
    }
  }) : Ge;
};
R.revert = function(e, t) {
  return ri(!e, t);
};
R.create = function(e, t) {
  return new R(e, t);
};
R.refresh = function(e) {
  return e ? Cr() : (ar || R.register()) && Ut(!0);
};
R.update = function(e) {
  return ++A.cache && Tt(e === !0 ? 2 : 0);
};
R.clearScrollMemory = Zo;
R.maxScroll = function(e, t) {
  return It(e, t ? Be : fe);
};
R.getScrollFunc = function(e, t) {
  return Lt(Ve(e), t ? Be : fe);
};
R.getById = function(e) {
  return Yn[e];
};
R.getAll = function() {
  return P.filter(function(e) {
    return e.vars.id !== "ScrollSmoother";
  });
};
R.isScrolling = function() {
  return !!nt;
};
R.snapDirectional = ti;
R.addEventListener = function(e, t) {
  var r = er[e] || (er[e] = []);
  ~r.indexOf(t) || r.push(t);
};
R.removeEventListener = function(e, t) {
  var r = er[e], n = r && r.indexOf(t);
  n >= 0 && r.splice(n, 1);
};
R.batch = function(e, t) {
  var r = [], n = {}, i = t.interval || 0.016, o = t.batchMax || 1e9, u = function(p, m) {
    var d = [], h = [], c = v.delayedCall(i, function() {
      m(d, h), d = [], h = [];
    }).pause();
    return function(_) {
      d.length || c.restart(!0), d.push(_.trigger), h.push(_), o <= d.length && c.progress(1);
    };
  }, s;
  for (s in t)
    n[s] = s.substr(0, 2) === "on" && Le(t[s]) && s !== "onRefreshInit" ? u(s, t[s]) : t[s];
  return Le(o) && (o = o(), we(R, "refresh", function() {
    return o = t.batchMax();
  })), gn(e).forEach(function(f) {
    var p = {};
    for (s in n)
      p[s] = n[s];
    p.trigger = f, r.push(R.create(p));
  }), r;
};
var oo = function(t, r, n, i) {
  return r > i ? t(i) : r < 0 && t(0), n > i ? (i - r) / (n - r) : n < 0 ? r / (r - n) : 1;
}, An = function e(t, r) {
  r === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = r === !0 ? "auto" : r ? "pan-" + r + (ue.isTouch ? " pinch-zoom" : "") : "none", t === lt && e(ee, r);
}, Qr = {
  auto: 1,
  scroll: 1
}, Vu = function(t) {
  var r = t.event, n = t.target, i = t.axis, o = (r.changedTouches ? r.changedTouches[0] : r).target, u = o._gsap || v.core.getCache(o), s = ze(), f;
  if (!u._isScrollT || s - u._isScrollT > 2e3) {
    for (; o && o !== ee && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(Qr[(f = ft(o)).overflowY] || Qr[f.overflowX])); )
      o = o.parentNode;
    u._isScroll = o && o !== n && !Jt(o) && (Qr[(f = ft(o)).overflowY] || Qr[f.overflowX]), u._isScrollT = s;
  }
  (u._isScroll || i === "x") && (r.stopPropagation(), r._gsapAllow = !0);
}, es = function(t, r, n, i) {
  return ue.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: r,
    onWheel: i = i && Vu,
    onPress: i,
    onDrag: i,
    onScroll: i,
    onEnable: function() {
      return n && we(j, ue.eventTypes[0], uo, !1, !0);
    },
    onDisable: function() {
      return be(j, ue.eventTypes[0], uo, !0);
    }
  });
}, Wu = /(input|label|select|textarea)/i, so, uo = function(t) {
  var r = Wu.test(t.target.tagName);
  (r || so) && (t._gsapAllow = !0, so = r);
}, $u = function(t) {
  Jr(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var r = t, n = r.normalizeScrollX, i = r.momentum, o = r.allowNestedScroll, u = r.onRelease, s, f, p = Ve(t.target) || lt, m = v.core.globals().ScrollSmoother, d = m && m.get(), h = Rt && (t.content && Ve(t.content) || d && t.content !== !1 && !d.smooth() && d.content()), c = Lt(p, fe), _ = Lt(p, Be), z = 1, W = (ue.isTouch && I.visualViewport ? I.visualViewport.scale * I.visualViewport.width : I.outerWidth) / I.innerWidth, k = 0, K = Le(i) ? function() {
    return i(s);
  } : function() {
    return i || 2.8;
  }, B, M, L = es(p, t.type, !0, o), w = function() {
    return M = !1;
  }, b = mt, U = mt, de = function() {
    f = It(p, fe), U = fr(Rt ? 1 : 0, f), n && (b = fr(0, It(p, Be))), B = Qt;
  }, x = function() {
    h._gsap.y = xr(parseFloat(h._gsap.y) + c.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, ae = function() {
    if (M) {
      requestAnimationFrame(w);
      var ce = xr(s.deltaY / 2), ie = U(c.v - ce);
      if (h && ie !== c.v + c.offset) {
        c.offset = ie - c.v;
        var a = xr((parseFloat(h && h._gsap.y) || 0) - c.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + a + ", 0, 1)", h._gsap.y = a + "px", c.cacheID = A.cache, Tt();
      }
      return !0;
    }
    c.offset && x(), M = !0;
  }, T, Qe, Y, ge, Ce = function() {
    de(), T.isActive() && T.vars.scrollY > f && (c() > f ? T.progress(1) && c(f) : T.resetTo("scrollY", f));
  };
  return h && v.set(h, {
    y: "+=0"
  }), t.ignoreCheck = function(X) {
    return Rt && X.type === "touchmove" && ae() || z > 1.05 && X.type !== "touchstart" || s.isGesturing || X.touches && X.touches.length > 1;
  }, t.onPress = function() {
    M = !1;
    var X = z;
    z = xr((I.visualViewport && I.visualViewport.scale || 1) / W), T.pause(), X !== z && An(p, z > 1.01 ? !0 : n ? !1 : "x"), Qe = _(), Y = c(), de(), B = Qt;
  }, t.onRelease = t.onGestureStart = function(X, ce) {
    if (c.offset && x(), !ce)
      ge.restart(!0);
    else {
      A.cache++;
      var ie = K(), a, le;
      n && (a = _(), le = a + ie * 0.05 * -X.velocityX / 0.227, ie *= oo(_, a, le, It(p, Be)), T.vars.scrollX = b(le)), a = c(), le = a + ie * 0.05 * -X.velocityY / 0.227, ie *= oo(c, a, le, It(p, fe)), T.vars.scrollY = U(le), T.invalidate().duration(ie).play(0.01), (Rt && T.vars.scrollY >= f || a >= f - 1) && v.to({}, {
        onUpdate: Ce,
        duration: ie
      });
    }
    u && u(X);
  }, t.onWheel = function() {
    T._ts && T.pause(), ze() - k > 1e3 && (B = 0, k = ze());
  }, t.onChange = function(X, ce, ie, a, le) {
    if (Qt !== B && de(), ce && n && _(b(a[2] === ce ? Qe + (X.startX - X.x) : _() + ce - a[1])), ie) {
      c.offset && x();
      var Vt = le[2] === ie, xt = Vt ? Y + X.startY - X.y : c() + ie - le[1], Ke = U(xt);
      Vt && xt !== Ke && (Y += Ke - xt), c(Ke);
    }
    (ie || ce) && Tt();
  }, t.onEnable = function() {
    An(p, n ? !1 : "x"), R.addEventListener("refresh", Ce), we(I, "resize", Ce), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = _.smooth = !1), L.enable();
  }, t.onDisable = function() {
    An(p, !0), be(I, "resize", Ce), R.removeEventListener("refresh", Ce), L.kill();
  }, t.lockAxis = t.lockAxis !== !1, s = new ue(t), s.iOS = Rt, Rt && !c() && c(1), Rt && v.ticker.add(mt), ge = s._dc, T = v.to(s, {
    ease: "power4",
    paused: !0,
    scrollX: n ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Jo(c, c(), function() {
        return T.pause();
      })
    },
    onUpdate: Tt,
    onComplete: ge.vars.onComplete
  }), s;
};
R.sort = function(e) {
  return P.sort(e || function(t, r) {
    return (t.vars.refreshPriority || 0) * -1e6 + t.start - (r.start + (r.vars.refreshPriority || 0) * -1e6);
  });
};
R.observe = function(e) {
  return new ue(e);
};
R.normalizeScroll = function(e) {
  if (typeof e > "u")
    return Ue;
  if (e === !0 && Ue)
    return Ue.enable();
  if (e === !1)
    return Ue && Ue.kill();
  var t = e instanceof ue ? e : $u(e);
  return Ue && Ue.target === t.target && Ue.kill(), Jt(t.target) && (Ue = t), t;
};
R.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: Fn,
  _inputObserver: es,
  _scrollers: A,
  _proxies: _t,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      nt || tr("scrollStart"), nt = ze();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return Me;
    }
  }
};
Ho() && v.registerPlugin(R);
function Yu(e = 100) {
  return (t) => Math.floor(t * e) / e;
}
class ts extends Lr {
  static create(t, r = {}, n = {}) {
    return new ts(t, r, n);
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
        }), i.meta.scrollTrigger = R.create(r.scrollTrigger ?? {});
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
        i.meta.sourceDOM = o.cloneNode(!0), i.meta.target = o, f.append(...o.childNodes), s.append(f), o == null || o.append(s), $.set(f, { display: "inline-flex" });
        const p = o.getBoundingClientRect(), m = f.getBoundingClientRect(), d = p.width + m.width, h = document.createDocumentFragment(), c = [];
        let _ = m.width;
        if (!d || !_)
          return;
        for (; _ <= d; ) {
          const Y = f.cloneNode(!0);
          _ += m.width, c.push(Y);
        }
        h.append(...c), s.append(h);
        const z = $.context(() => {
          $.set(s, {
            x: 0,
            force3D: !0,
            width: _,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), W = $.utils.pipe(
          (Y) => Math.floor(Y * 1e3) / 1e3,
          $.quickSetter(s, "x", "px")
        ), k = $.utils.wrap(0, -m.width), K = $.utils.normalize(0, -m.width);
        let B, M, L, w, b, U, de, x;
        const ae = $.ticker.add(() => {
          var Y, ge;
          switch (x = $.ticker.deltaRatio(), M = $.utils.interpolate(
            M ?? 0,
            i.meta.scrollTrigger.getVelocity(),
            0.5 * x
          ), L = M * i.meta.velocity, i.meta.direction) {
            case "ltr":
              B = -1, L = -Math.abs(L);
              break;
            case "rtl":
              B = 1, L = Math.abs(L);
              break;
            case "scroll":
              B = i.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              B = -(i.meta.scrollTrigger.direction ?? 1), L = -L;
          }
          w = $.getProperty(s, "x"), b = i.meta.speed * -B, U = (b - L) * x, de = k(w + U), W(de), (ge = (Y = i.meta).onUpdate) == null || ge.call(Y, K(de));
        });
        return (Qe = (T = i.meta).onCreated) == null || Qe.call(T), () => {
          var Y;
          for (z.kill(!0), $.ticker.remove(ae), o == null || o.replaceChildren(...i.meta.sourceDOM.childNodes); c.length; )
            (Y = c.pop()) == null || Y.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...n
      }
    );
  }
}
const { wrap: Xu, normalize: Hu, interpolate: Uu } = $.utils, Gu = { display: "inline-flex" }, qu = "owow-marquee-outer", ju = "owow-marquee-inner";
function ca(e, t = {}, r = {}) {
  const n = V(
    t,
    Q,
    Eo(["onUpdate", "onCreated"])
  ), i = V(
    t,
    Q,
    yo(["onUpdate", "onCreated"]),
    Br(H(Ft, Q)),
    pn
  ), o = it(() => R.create(i.scrollTriggerVars ?? {})), u = wn(e), s = H(
    tt(Ju(i.createDOM ?? !0)),
    tt(
      H(
        rt(Ku),
        rt(Qu(i, n, o()))
      )
    ),
    Dt("create marquee instances", { config: i })
  );
  return yn(() => {
    const p = s(u);
    return () => V(
      p,
      Dt(),
      Bt(Kt((m) => m.revert()))
    );
  }, Q(r));
}
function Qu(e, t, r) {
  const n = it(Js());
  let i = 0;
  return (o) => {
    const u = (w = o.rects.innerRect.width, b = o.rects.boundingWidth) => V(
      w > 0 && b > 0,
      cn(as, new Error("Zero width")),
      rt(
        H(
          () => w <= b,
          _n(() => {
            const U = o.dom.innerContainer.cloneNode(!0);
            return i = w + o.rects.innerRect.width, n().append(U), u(i, b), n();
          }, n)
        )
      )
    ), s = $.quickSetter(o.dom.outerContainer, "x", "px"), f = H(Yu(1e3), s), p = Xu(0, -o.rects.innerRect.width), m = Hu(0, -o.rects.innerRect.width);
    let d, h, c, _, z, W, k, K;
    const B = it(
      () => $.ticker.add(() => {
        var w;
        switch (h = $.ticker.deltaRatio(), _ = Uu(
          _ ?? 0,
          r.getVelocity(),
          0.5 * h
        ), c = _ * (e.scrollVelocity || 0), e.direction || "rtl") {
          case "ltr":
            d = -1, c = -Math.abs(c);
            break;
          case "rtl":
            d = 1, c = Math.abs(c);
            break;
          case "scroll":
            d = r.direction ?? 1;
            break;
          case "scroll-reverse":
            d = -(r.direction ?? 1), c = -c;
        }
        z = $.getProperty(o.dom.outerContainer, "x"), W = (e.speed || 1) * -d, k = (W - c) * h, K = p(z + k), f(K), (w = t.onUpdate) == null || w.call(t, m(K));
      })
    );
    H(
      u,
      rt(Ks(o.dom.outerContainer)),
      Kt(
        (w) => $.set(w, {
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
    function L() {
      $.ticker.remove(B()), o.dom.target.replaceChildren(...o.dom.targetClone.childNodes);
    }
    return Object.freeze({ revert: L });
  };
}
function Ku(e) {
  return {
    dom: e,
    rects: Zu(e)
  };
}
function Zu({ target: e, innerContainer: t }) {
  const r = e.getBoundingClientRect(), n = t.getBoundingClientRect();
  return {
    targetRect: r,
    innerRect: n,
    boundingWidth: r.width + n.width
  };
}
function Ju(e) {
  const t = bn();
  return (r) => {
    const n = V(
      r,
      ao(!!e, qu),
      Gt(t)
    ), i = V(
      n,
      Ss(ao(!!e, ju)),
      Gt(t)
    );
    return V(
      [n, i],
      tt(Ts),
      ([u, s]) => Ns(u, s),
      Rs(([u, s]) => ({
        target: r,
        outerContainer: u,
        innerContainer: s,
        targetClone: r.cloneNode(!0)
      })),
      qn(({ target: u, innerContainer: s, outerContainer: f }) => {
        go(!!e, Boolean, () => {
          s.append(...u.childNodes), f.append(s), u.append(f);
        }), $.set(s, Gu);
      }),
      mn(new Error("Invalid marquee DOM.")),
      Gt(t)
    );
  };
}
function ao(e, t) {
  return H(
    fo(() => e, Oo("div"), Co(`.${t}`)),
    mn(
      new Error(
        e ? "Could not create marquee container." : `Could not find marquee container .${t}`
      )
    ),
    Kt((r) => r.classList.add(t))
  );
}
class rs extends Lr {
  constructor(t, r = {}, n = {}) {
    super(async (i, o) => {
      const u = rs.SplitText;
      if (!u)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      const s = We.utils.toArray(t);
      for (const h of s)
        if (!(h instanceof HTMLElement))
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
        y: (h, c) => {
          const _ = parseFloat(getComputedStyle(c).lineHeight);
          return isNaN(_) ? We.getProperty(c, "height") : _;
        },
        ...Q(r.fromVars)
      }, d = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...Q(r.toVars)
      };
      return o.add(() => {
        i.meta.setup = We.set(p.lines, { overflow: "hidden" }), i.meta.tween = We.fromTo(f.lines, m, d);
      }), () => {
        f.revert(), o.kill(!0);
      };
    }, n);
  }
}
function la(e, t, r = {}) {
  const n = V(
    t,
    Q,
    Br(H(Ft, Q)),
    pn
  ), i = mn(n.SplitText, new Error("Missing `SplitText` GSAP member plugin.")), o = H(
    wn,
    Dt(),
    tt(
      (p) => V(
        i,
        rt((m) => ({
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
        Gt(bn())
      )
    )
  ), u = {
    y: (p, m) => {
      const d = parseFloat(getComputedStyle(m).lineHeight);
      return isNaN(d) ? $.getProperty(m, "height") : d;
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
    const p = o(e), m = $.context(() => {
      mo(
        p,
        Kt(({ parentSplit: d, childSplit: h }) => {
          $.set(d.lines, { overflow: "hidden" }), $.fromTo(h.lines, u, s);
        })
      );
    });
    return () => {
      Bt(
        p,
        Kt(({ childSplit: d }) => d.revert())
      ), m.kill(!0);
    };
  }, Q(r));
}
function ea(e, t = {}, r = {}) {
  const n = V(t, Q, Eo(["updater"])), i = V(
    t,
    Q,
    yo(["updater"]),
    Br(H(Ft, Q)),
    pn
  ), o = H(
    wn,
    tt(
      (d) => R.create({
        trigger: d,
        start: "top bottom",
        end: "bottom top",
        ...i.scrollTriggerVars
      })
    )
  ), u = (d) => () => d.progress, s = (d = 1) => (h) => {
    var c;
    return ((c = n.updater) == null ? void 0 : c.call(n, h, d)) ?? -h * 100 * d;
  }, f = (d, h) => H(
    u(d),
    s(i.speed),
    h,
    un
  ), p = H(
    o,
    tt((d) => {
      const h = We.quickSetter(d.trigger, "y", i.cssUnit ?? "%"), c = We.quickSetter(d.trigger, "x", i.cssUnit ?? "%");
      return {
        scrollTrigger: d,
        updateY: f(d, h),
        updateX: f(d, c),
        destroy: () => d.kill()
      };
    })
  );
  return yn(() => {
    const d = p(e), h = We.ticker.add(() => {
      Bt(d, ({ updateY: c }) => {
        c();
      });
    });
    return () => {
      We.ticker.remove(h), Bt(d, (c) => c.destroy());
    };
  }, Q(r));
}
function fa(e, t = {}, r = {}) {
  const n = V(
    t,
    Q,
    Br(H(Ft, Q)),
    pn
  ), i = n.size ?? 1.5, o = H(
    wn,
    tt(ta(n.createDOM ?? !0, "owow-diorama-outer", "owow-diorama-inner")),
    tt(
      rt(
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
    const s = o(e), f = We.context(() => {
      V(
        tt(s, yi),
        an(ln),
        Bt(({ dom: m, outerRect: d }) => {
          We.set(m.outer, { height: d.height, overflow: "hidden" }), We.set(m.inner, { height: d.height * i });
        })
      );
    }), p = V(
      tt(
        s,
        H(
          rt((m) => {
            const d = We.utils.interpolate(
              -(m.outerRect.height * i - m.outerRect.height),
              0
            );
            return ea(m.dom.inner, {
              cssUnit: "px",
              updater: d
            });
          }),
          yi
        )
      ),
      an(ln)
    );
    return () => {
      f.kill(!0), Bt(p, (m) => m());
    };
  }, Q(r));
}
function ta(e, t, r) {
  const n = H(
    Oo("div"),
    ho((i) => i.classList.add(t))
  );
  return H(
    fo(
      () => e,
      (i) => {
        const o = Zs(i), u = i.cloneNode(!0), s = n();
        return u.classList.add(r), s.append(u), o(s), xs({
          inner: u,
          outer: s,
          original: i
        });
      },
      (i) => V(
        i,
        cn(
          ra(t, r),
          new Error("Invalid DOM structure for diorama")
        ),
        Gt(bn()),
        rt(() => ({
          inner: i.firstElementChild,
          outer: i,
          original: i
        }))
      )
    )
  );
}
function ra(e, t) {
  return (r) => {
    var n;
    return ms(
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
  oa as Ease,
  ts as Marquee,
  Lr as Motion,
  Po as Pointer,
  ua as SecondOrderDynamics,
  rs as TextClipReveal,
  fa as createDiorama,
  ca as createMarquee,
  yn as createMotion,
  ea as createParallax,
  la as createTextClipReveal,
  sa as mousePosition,
  aa as physicsBasedMotion
};
