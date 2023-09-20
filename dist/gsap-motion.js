import { fromEventPattern as ao, fromEvent as on, noop as rs, debounceTime as co, Observable as ni, BehaviorSubject as ns, skip as is, map as ii } from "rxjs";
import { gsap as M } from "gsap";
const Sn = 1.70158, Tn = 0.7, sa = {
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
function W() {
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
function os(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function ss(e) {
  if (!(e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0))
    return e;
  var t = e.BS_PRIVATE_NESTED_SOME_NONE;
  if (t !== 0)
    return {
      BS_PRIVATE_NESTED_SOME_NONE: t - 1 | 0
    };
}
function us(e) {
  return e;
}
function oi(e, t, r, n) {
  return t(e) ? r(e) : n(e);
}
function lo() {
  if (arguments.length === 3) {
    const e = arguments;
    return function(r) {
      return oi(r, e[0], e[1], e[2]);
    };
  }
  return oi(arguments[0], arguments[1], arguments[2], arguments[3]);
}
function sn(e) {
}
function si(e, t, r) {
  return t(e) ? r(e) : e;
}
function fo() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return si(r, e[0], e[1]);
    };
  }
  return si(arguments[0], arguments[1], arguments[2]);
}
function ui(e, t) {
  return t(e), e;
}
function go() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return ui(r, e[0]);
    };
  }
  return ui(arguments[0], arguments[1]);
}
function nt(e) {
  var t = {
    contents: void 0
  };
  return function(...r) {
    var n = t.contents;
    if (n !== void 0)
      return ss(n);
    var i = e(...r);
    return t.contents = os(i), i;
  };
}
function hn(e) {
  return e;
}
function as(e, t) {
  if (e <= 0)
    return [];
  for (var r = new Array(e), n = 0; n < e; ++n)
    r[n] = t;
  return r;
}
function Hn(e, t) {
  for (var r = 0, n = e.length; r < n; ++r)
    t(e[r]);
}
function cs(e, t) {
  for (var r = e.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = t(e[i]);
  return n;
}
function ls(e, t, r) {
  for (var n = t, i = 0, o = e.length; i < o; ++i)
    n = r(n, e[i]);
  return n;
}
function fs(e, t) {
  for (var r = e.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !0;
    if (!t(e[i]))
      return !1;
    n = i + 1 | 0;
  }
}
function ds(e, t) {
  for (var r = e.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !1;
    if (t(e[i]))
      return !0;
    n = i + 1 | 0;
  }
}
var ai = as;
function ho() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return ai(r, e[0]);
    };
  }
  return ai(arguments[0], arguments[1]);
}
function gs(e) {
  return e.length !== 0;
}
function ci(e, t) {
  return cs(e, t);
}
function et() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return ci(r, e[0]);
    };
  }
  return ci(arguments[0], arguments[1]);
}
function li(e, t) {
  for (var r = 0, n = []; r < e.length; ) {
    var i = e[r];
    t(i) && n.push(i), r = r + 1 | 0;
  }
  return n;
}
function un() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return li(r, e[0]);
    };
  }
  return li(arguments[0], arguments[1]);
}
var fi = ds;
function hs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return fi(r, e[0]);
    };
  }
  return fi(arguments[0], arguments[1]);
}
var di = Hn;
function zt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return di(r, e[0]);
    };
  }
  return di(arguments[0], arguments[1]);
}
function An(e) {
  return ls(e, [], function(t, r) {
    return Array.isArray(r) ? Hn(r, function(n) {
      t.push(n);
    }) : t.push(r), t;
  });
}
function gi(e, t) {
  return Hn(e, t), e;
}
function po() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return gi(r, e[0]);
    };
  }
  return gi(arguments[0], arguments[1]);
}
function hi(e, t) {
  return fs(e, t);
}
function ps() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return hi(r, e[0]);
    };
  }
  return hi(arguments[0], arguments[1]);
}
function pi(e, t, r) {
  for (var n = new Array(r), i = 0, o = t; i < r; )
    n[i] = e[o], i = i + 1 | 0, o = o + 1 | 0;
  return n;
}
function mo(e, t) {
  for (; ; ) {
    var r = t, n = e, i = n.length, o = i === 0 ? 1 : i, u = r.length, s = o - u | 0;
    if (s === 0)
      return n.apply(null, r);
    if (s >= 0)
      return function(f, p) {
        return function(m) {
          return mo(f, p.concat([m]));
        };
      }(n, r);
    t = pi(r, o, -s | 0), e = n.apply(null, pi(r, 0, o));
  }
}
function ms(e, t) {
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
      return mo(e, [t]);
  }
}
function _s(e) {
  var t = e.length;
  return t === 1 ? e : function(r) {
    return ms(e, r);
  };
}
function vs(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function bs(e, t) {
  return e.TAG === 0 ? {
    TAG: 0,
    _0: t(e._0)
  } : {
    TAG: 1,
    _0: e._0
  };
}
function _o(e, t) {
  return e.TAG === 0 ? t(e._0) : {
    TAG: 1,
    _0: e._0
  };
}
function ws(e, t) {
  return _o(e, _s(t));
}
function ys(e, t) {
  return e.TAG === 0 ? e._0 : t;
}
function mi(e, t) {
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
      return mi(r, e[0]);
    };
  }
  return mi(arguments[0], arguments[1]);
}
function _i(e, t, r) {
  return ws(pn(e, r), function(n) {
    return t(n) ? {
      TAG: 0,
      _0: n
    } : {
      TAG: 1,
      _0: r
    };
  });
}
function an() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return _i(r, e[0], e[1]);
    };
  }
  return _i(arguments[0], arguments[1], arguments[2]);
}
var vi = bs;
function tt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return vi(r, e[0]);
    };
  }
  return vi(arguments[0], arguments[1]);
}
var bi = _o;
function Es() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return bi(r, e[0]);
    };
  }
  return bi(arguments[0], arguments[1]);
}
function wi(e) {
  return ys(e, void 0);
}
function Ss(e) {
  if (e.TAG === 0)
    return vs(e._0);
}
function yi(e, t) {
  return e.TAG !== 0 || t(e._0), e;
}
function Qt() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return yi(r, e[0]);
    };
  }
  return yi(arguments[0], arguments[1]);
}
function Ei(e, t) {
  return e.TAG === 0 || t(e._0), e;
}
function Ut() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ei(r, e[0]);
    };
  }
  return Ei(arguments[0], arguments[1]);
}
var Ts = (e) => ({
  TAG: 0,
  _0: e
});
function vo(e) {
  return typeof e == "string";
}
function Si(e) {
  return typeof e == "function";
}
function cn(e) {
  return e != null;
}
function Un(e) {
  return e === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : e !== null && e.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: e.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : e;
}
function xs(e) {
  if (e != null)
    return Un(e);
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
function Ms(e, t) {
  if (e !== void 0)
    return Un(t(Kt(e)));
}
function Cs(e, t) {
  if (e !== void 0)
    return t(Kt(e));
}
function Os(e, t) {
  return e !== void 0 ? Kt(e) : t;
}
function Lt(e) {
  if (e != null)
    return Un(e);
}
var Ti = Ms;
function ks() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ti(r, e[0]);
    };
  }
  return Ti(arguments[0], arguments[1]);
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
function Mi(e, t) {
  if (e !== void 0)
    return xs(t(Kt(e)));
}
function Rs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Mi(r, e[0]);
    };
  }
  return Mi(arguments[0], arguments[1]);
}
function Ds(e) {
  return Os(e, void 0);
}
function Ci(e, t) {
  return e !== void 0 && t(Kt(e)), e;
}
function Gn() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ci(r, e[0]);
    };
  }
  return Ci(arguments[0], arguments[1]);
}
function Oi(e, t) {
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
      return Oi(r, e[0]);
    };
  }
  return Oi(arguments[0], arguments[1]);
}
var Ns = function(e, t) {
  delete e[t];
};
function qn(e) {
  for (var t = {}, r = e.length, n = 0; n < r; ++n) {
    var i = e[n];
    t[i[0]] = i[1];
  }
  return t;
}
function Is(e, t) {
  for (var r = e.length, n = t.length, i = new Array(r + n | 0), o = 0; o < r; ++o)
    i[o] = e[o];
  for (var u = 0; u < n; ++u)
    i[r + u | 0] = t[u];
  return i;
}
function zs(e, t) {
  for (var r = 0, n = e.length; r < n; ++r)
    t(e[r]);
}
function bo(e, t) {
  for (var r = e.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = t(e[i]);
  return n;
}
function Bs(e, t, r) {
  for (var n = t, i = 0, o = e.length; i < o; ++i)
    n = r(n, e[i]);
  return n;
}
function ki(e, t) {
  return Is(e, [t]);
}
function Ls() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return ki(r, e[0]);
    };
  }
  return ki(arguments[0], arguments[1]);
}
function Fs(e) {
  return Object.entries(e);
}
function Pi(e, t) {
  return Object.assign({}, e, t);
}
function Vs() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Pi(r, e[0]);
    };
  }
  return Pi(arguments[0], arguments[1]);
}
function Ri(e, t) {
  var r = Vs({}, e);
  return zs(t, function(n) {
    return Ns(r, n);
  }), r;
}
function wo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ri(r, e[0]);
    };
  }
  return Ri(arguments[0], arguments[1]);
}
function Di(e, t) {
  return qn(bo(Object.keys(e), function(r) {
    var n = t(e[r]);
    return [
      r,
      n
    ];
  }));
}
function zr() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Di(r, e[0]);
    };
  }
  return Di(arguments[0], arguments[1]);
}
function Ai(e, t) {
  return qn(bo(Object.keys(e), function(r) {
    var n = t(r, e[r]);
    return [
      r,
      n
    ];
  }));
}
function Ni() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ai(r, e[0]);
    };
  }
  return Ai(arguments[0], arguments[1]);
}
function Ii(e, t) {
  return qn(Bs(Object.keys(e), [], function(r, n) {
    var i = e[n];
    return t(n, i) ? Ls(r, [
      n,
      i
    ]) : r;
  }));
}
function Ws() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return Ii(r, e[0]);
    };
  }
  return Ii(arguments[0], arguments[1]);
}
function zi(e, t) {
  return Ws(e, function(r, n) {
    return t.includes(r);
  });
}
function yo() {
  if (arguments.length === 1) {
    const e = arguments;
    return function(r) {
      return zi(r, e[0]);
    };
  }
  return zi(arguments[0], arguments[1]);
}
function Bi(e, t, r) {
  return e ? t(void 0) : r(void 0);
}
function mn() {
  if (arguments.length === 2) {
    const e = arguments;
    return function(r) {
      return Bi(r, e[0], e[1]);
    };
  }
  return Bi(arguments[0], arguments[1], arguments[2]);
}
function Q(e, ...t) {
  return !hs(["SplitText"], (n) => Si(e) && n.includes(e.name)) && Si(e) ? e.call(null, t) : e;
}
function $s(e) {
  return () => e;
}
function _n() {
  return nt(() => globalThis);
}
function Ys() {
  const e = _n();
  return nt(() => e().document.documentElement);
}
function Xs() {
  const e = _n();
  return nt(() => e().screen);
}
function Hs(e) {
  return new Map(e);
}
function Eo(e) {
  return nt(() => Hs(e == null ? void 0 : e()));
}
function Li(e) {
  return (t) => e.get(t);
}
function Fi(e) {
  return (t, r) => e.set(t, r);
}
const Us = () => {
};
function So(e) {
  let t = e;
  return Object.freeze({
    getValue: () => t,
    setValue: (r) => t = r
  });
}
function vn() {
  return (e) => console.error(String(e));
}
function Rt(e, ...t) {
  return go(
    sn
  );
}
function Vi(e, ...t) {
}
function To() {
  const e = _n(), t = So(!0), r = M.ticker.add(() => void t.setValue(!0)), n = nt((i) => (o) => W(
    t.getValue(),
    Rt,
    fo(Boolean, () => {
      t.setValue(!1), i(o);
    })
  ));
  return nt(
    () => ao(
      (i) => {
        e().addEventListener("resize", n(i), { passive: !0 });
      },
      (i) => {
        M.ticker.remove(r), e().removeEventListener("resize", n(i));
      }
    )
  );
}
function Gs() {
  return nt(() => on(globalThis, "mousemove", { passive: !0 }));
}
function qs() {
  return nt((e) => {
    const t = /* @__PURE__ */ new Set(), r = new ResizeObserver(() => t.forEach((i) => i()));
    return ao(
      (i) => (zt(e, r.observe.bind(r)), t.add(i), r),
      (i) => {
        zt(e, r.unobserve.bind(r)), t.delete(i);
      }
    );
  });
}
function xo(e) {
  return W(
    Lt(e),
    Rs(
      H(
        vo,
        mn(
          Mo(e),
          $s(e)
        )
      )
    ),
    Ds
  );
}
function Mo(e) {
  return (t = document) => t == null ? void 0 : t.querySelector(e);
}
function js(e) {
  return (t = document) => Array.from(t.querySelectorAll(e));
}
function Co(e, t) {
  return () => document.createElement(e, t);
}
function Qs(e) {
  return (...t) => (e.append(...t), e);
}
function Ks(e) {
  return (...t) => {
    e.replaceWith(...t);
  };
}
function Zs() {
  return () => document.createDocumentFragment();
}
function bn(e) {
  return W(
    ho(1, Q(e)),
    An,
    et(
      (t) => W(
        t,
        vo,
        mn(js(t), () => [xo(t)])
      )
    ),
    An,
    un(cn)
  );
}
var Lr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Js(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var eu = "Expected a function", Wi = 0 / 0, tu = "[object Symbol]", ru = /^\s+|\s+$/g, nu = /^[-+]0x[0-9a-f]+$/i, iu = /^0b[01]+$/i, ou = /^0o[0-7]+$/i, su = parseInt, uu = typeof Lr == "object" && Lr && Lr.Object === Object && Lr, au = typeof self == "object" && self && self.Object === Object && self, cu = uu || au || Function("return this")(), lu = Object.prototype, fu = lu.toString, du = Math.max, gu = Math.min, xn = function() {
  return cu.Date.now();
};
function hu(e, t, r) {
  var n, i, o, u, s, f, p = 0, m = !1, d = !1, g = !0;
  if (typeof e != "function")
    throw new TypeError(eu);
  t = $i(t) || 0, Nn(r) && (m = !!r.leading, d = "maxWait" in r, o = d ? du($i(r.maxWait) || 0, t) : o, g = "trailing" in r ? !!r.trailing : g);
  function c(w) {
    var b = n, U = i;
    return n = i = void 0, p = w, u = e.apply(U, b), u;
  }
  function _(w) {
    return p = w, s = setTimeout(R, t), m ? c(w) : u;
  }
  function B(w) {
    var b = w - f, U = w - p, de = t - b;
    return d ? gu(de, o - U) : de;
  }
  function $(w) {
    var b = w - f, U = w - p;
    return f === void 0 || b >= t || b < 0 || d && U >= o;
  }
  function R() {
    var w = xn();
    if ($(w))
      return K(w);
    s = setTimeout(R, B(w));
  }
  function K(w) {
    return s = void 0, g && n ? c(w) : (n = i = void 0, u);
  }
  function L() {
    s !== void 0 && clearTimeout(s), p = 0, n = f = i = s = void 0;
  }
  function C() {
    return s === void 0 ? u : K(xn());
  }
  function F() {
    var w = xn(), b = $(w);
    if (n = arguments, i = this, f = w, b) {
      if (s === void 0)
        return _(f);
      if (d)
        return s = setTimeout(R, t), c(f);
    }
    return s === void 0 && (s = setTimeout(R, t)), u;
  }
  return F.cancel = L, F.flush = C, F;
}
function Nn(e) {
  var t = typeof e;
  return !!e && (t == "object" || t == "function");
}
function pu(e) {
  return !!e && typeof e == "object";
}
function mu(e) {
  return typeof e == "symbol" || pu(e) && fu.call(e) == tu;
}
function $i(e) {
  if (typeof e == "number")
    return e;
  if (mu(e))
    return Wi;
  if (Nn(e)) {
    var t = typeof e.valueOf == "function" ? e.valueOf() : e;
    e = Nn(t) ? t + "" : t;
  }
  if (typeof e != "string")
    return e === 0 ? e : +e;
  e = e.replace(ru, "");
  var r = iu.test(e);
  return r || ou.test(e) ? su(e.slice(2), r ? 2 : 8) : nu.test(e) ? Wi : +e;
}
var _u = hu;
const vu = /* @__PURE__ */ Js(_u), Oo = class {
  constructor(e, t = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = vu(
      () => {
        var r;
        (r = this.cleanup) == null || r.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      Oo.resetDebounceTime,
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
      return this.context = M.context(rs), [
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
      on(this.mediaQueryList, "change").subscribe(() => this.reset())
    ));
  }
  observeResize(e) {
    e && (this.motionResizeObserver = new bu(e), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(co(100)).subscribe(() => this.reset())
    ));
  }
};
let Br = Oo;
Br.resetDebounceTime = 100;
Br.referenceFramerate = 60;
class bu {
  constructor(t) {
    const [r, n] = [t].flat();
    this.target = typeof r == "string" ? document.querySelector(r) : r, this.axis = n, this.target === window ? this.observable = new ni((i) => {
      const o = () => this.handleWindowResize(i);
      return window.addEventListener("resize", o, { passive: !0 }), () => window.removeEventListener("resize", o);
    }) : this.observable = new ni((i) => {
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
  const r = W(t, Q, zr(H(Lt, Q))), n = qs(), i = So(sn), o = new ns(e);
  o.subscribe(() => {
    i.getValue()(!1), i.setValue(e() ?? sn);
  });
  const u = (d) => (g) => W(
    g.pipe(is((d == null ? void 0 : d.skip) ?? 0), co((d == null ? void 0 : d.debounce) ?? 300)).subscribe(
      H(
        Rt(`run effect from subscription: ${d == null ? void 0 : d.name}`),
        () => o.next(e)
      )
    ),
    Rt()
  ), s = W(
    ho(1, r.observeElementResize),
    An,
    et(xo),
    un(cn),
    po(
      yu("Observing the <body> for resizes may cause chain reactions.")
    )
  ), f = W(
    s,
    an(gs, "No elements to observe."),
    tt(n),
    tt(
      H(
        u({
          debounce: r.debounceTime,
          skip: 1,
          name: "element resize"
        }),
        Rt()
      )
    ),
    Ut(Vi)
  ), p = W(
    r.observeWindowResize,
    an(Boolean, "Window resize observing disabled."),
    tt(wu),
    tt(
      H(
        u({ debounce: r.debounceTime, name: "window resize" }),
        Rt()
      )
    ),
    Ut(Vi)
  );
  function m() {
    Qt(f, (d) => d.unsubscribe()), Qt(p, (d) => d.unsubscribe()), i.getValue()(!0);
  }
  return m;
}
const wu = To();
function yu(e) {
  return (t) => W(
    mn(t.tagName === "BODY", () => `Warning: ${e}`, Us),
    Lt,
    Gn(vn())
  );
}
function Et(e, t) {
  return { x: e, y: t };
}
function Qr(e, t) {
  return {
    ...e,
    nx: e.x / t.x,
    ny: e.y / t.y
  };
}
class ko extends Br {
  constructor() {
    super(
      (t) => {
        t.meta.observable = on(window, "mousemove"), t.subscriptions.push(
          t.meta.observable.subscribe((r) => {
            this.clientX = r.clientX, this.clientY = r.clientY, this.normalX = M.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = M.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), t.subscriptions.push(
          on(window, "resize").subscribe(() => {
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
    return this._instance ?? (this._instance = new ko());
  }
  /**
   * Returns the observable for mouse events.
   */
  get observable() {
    return this.meta.observable;
  }
}
const Eu = nt(() => {
  const e = W(Yi(), Li), t = W(Yi(), Fi), r = W(Xi(), Li), n = W(Xi(), Fi), i = Su().pipe(ii(jn));
  return Tu().pipe(ii(xu)).subscribe(
    H(
      Ni(
        (u, s) => W(
          r(u),
          Lt,
          ks((f) => Qr(s, f)),
          Gn((f) => t(u, f))
        )
      )
    )
  ), i.subscribe(H(Ni(n))), {
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
}), ua = Eu, Su = To(), Tu = Gs(), Yi = Eo(
  H(jn, (e) => [
    ["client", Qr(Et(0, 0), e.client)],
    ["page", Qr(Et(0, 0), e.page)],
    ["screen", Qr(Et(0, 0), e.screen)]
  ])
), Xi = Eo(H(jn, Fs));
function xu(e) {
  return {
    client: Et(e.clientX, e.clientY),
    page: Et(e.pageX, e.pageY),
    screen: Et(e.screenX, e.screenY)
  };
}
function jn() {
  const e = Ys(), t = _n(), r = Xs();
  return {
    client: Et(t().innerWidth, t().innerHeight),
    page: Et(e().scrollWidth, e().scrollHeight),
    screen: Et(r().width, r().height)
  };
}
class aa {
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
function Mu(e = 1, t = 1, r = 0, n = 0) {
  const i = t / (Math.PI * e), o = 1 / (2 * Math.PI * e * (2 * Math.PI * e)), u = r * t / (2 * Math.PI * e);
  let s = n, f = n, p = 0;
  function m(d, g) {
    const c = (g - s) / d, _ = Math.max(o, d * d / 2 + d * i / 2, d * i);
    return s = g, f = f + d * p, p = p + d * (g + u * c - f - i * p) / _, f;
  }
  return Object.freeze({ update: m });
}
const ca = Mu;
function Hi(e, t) {
  for (var r = 0; r < t.length; r++) {
    var n = t[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, n.key, n);
  }
}
function Cu(e, t, r) {
  return t && Hi(e.prototype, t), r && Hi(e, r), e;
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
var Se, In, qe, Dt, At, fr, Po, Xt, Cr, Ro, yt, ut, Do, Ao = function() {
  return Se || typeof window < "u" && (Se = window.gsap) && Se.registerPlugin && Se;
}, No = 1, cr = [], N = [], mt = [], Or = Date.now, zn = function(t, r) {
  return r;
}, Ou = function() {
  var t = Cr.core, r = t.bridge || {}, n = t._scrollers, i = t._proxies;
  n.push.apply(n, N), i.push.apply(i, mt), N = n, mt = i, zn = function(u, s) {
    return r[u](s);
  };
}, It = function(t, r) {
  return ~mt.indexOf(t) && mt[mt.indexOf(t) + 1][r];
}, kr = function(t) {
  return !!~Ro.indexOf(t);
}, Fe = function(t, r, n, i, o) {
  return t.addEventListener(r, n, {
    passive: !i,
    capture: !!o
  });
}, Ne = function(t, r, n, i) {
  return t.removeEventListener(r, n, !!i);
}, Fr = "scrollLeft", Vr = "scrollTop", Bn = function() {
  return yt && yt.isPressed || N.cache++;
}, ln = function(t, r) {
  var n = function i(o) {
    if (o || o === 0) {
      No && (qe.history.scrollRestoration = "manual");
      var u = yt && yt.isPressed;
      o = i.v = Math.round(o) || (yt && yt.iOS ? 1 : 0), t(o), i.cacheID = N.cache, u && zn("ss", o);
    } else
      (r || N.cache !== i.cacheID || zn("ref")) && (i.cacheID = N.cache, i.v = t());
    return i.v + i.offset;
  };
  return n.offset = 0, t && n;
}, Be = {
  s: Fr,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: ln(function(e) {
    return arguments.length ? qe.scrollTo(e, fe.sc()) : qe.pageXOffset || Dt[Fr] || At[Fr] || fr[Fr] || 0;
  })
}, fe = {
  s: Vr,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: Be,
  sc: ln(function(e) {
    return arguments.length ? qe.scrollTo(Be.sc(), e) : qe.pageYOffset || Dt[Vr] || At[Vr] || fr[Vr] || 0;
  })
}, Ve = function(t) {
  return Se.utils.toArray(t)[0] || (typeof t == "string" && Se.config().nullTargetWarn !== !1 ? console.warn("Element not found:", t) : null);
}, Bt = function(t, r) {
  var n = r.s, i = r.sc;
  kr(t) && (t = Dt.scrollingElement || At);
  var o = N.indexOf(t), u = i === fe.sc ? 1 : 2;
  !~o && (o = N.push(t) - 1), N[o + u] || t.addEventListener("scroll", Bn);
  var s = N[o + u], f = s || (N[o + u] = ln(It(t, n), !0) || (kr(t) ? i : ln(function(p) {
    return arguments.length ? t[n] = p : t[n];
  })));
  return f.target = t, s || (f.smooth = Se.getProperty(t, "scrollBehavior") === "smooth"), f;
}, Ln = function(t, r, n) {
  var i = t, o = t, u = Or(), s = u, f = r || 50, p = Math.max(500, f * 3), m = function(_, B) {
    var $ = Or();
    B || $ - u > f ? (o = i, i = _, s = u, u = $) : n ? i += _ : i = o + (_ - o) / ($ - s) * (u - s);
  }, d = function() {
    o = i = n ? 0 : i, s = u = 0;
  }, g = function(_) {
    var B = s, $ = o, R = Or();
    return (_ || _ === 0) && _ !== i && m(_), u === s || R - s > p ? 0 : (i + (n ? $ : -$)) / ((n ? R : u) - B) * 1e3;
  };
  return {
    update: m,
    reset: d,
    getVelocity: g
  };
}, yr = function(t, r) {
  return r && !t._gsapAllow && t.preventDefault(), t.changedTouches ? t.changedTouches[0] : t;
}, Ui = function(t) {
  var r = Math.max.apply(Math, t), n = Math.min.apply(Math, t);
  return Math.abs(r) >= Math.abs(n) ? r : n;
}, Io = function() {
  Cr = Se.core.globals().ScrollTrigger, Cr && Cr.core && Ou();
}, zo = function(t) {
  return Se = t || Ao(), Se && typeof document < "u" && document.body && (qe = window, Dt = document, At = Dt.documentElement, fr = Dt.body, Ro = [qe, Dt, At, fr], Se.utils.clamp, Do = Se.core.context || function() {
  }, Xt = "onpointerenter" in fr ? "pointer" : "mouse", Po = ue.isTouch = qe.matchMedia && qe.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in qe || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, ut = ue.eventTypes = ("ontouchstart" in At ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in At ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return No = 0;
  }, 500), Io(), In = 1), In;
};
Be.op = fe;
N.cache = 0;
var ue = /* @__PURE__ */ function() {
  function e(r) {
    this.init(r);
  }
  var t = e.prototype;
  return t.init = function(n) {
    In || zo(Se) || console.warn("Please gsap.registerPlugin(Observer)"), Cr || Io();
    var i = n.tolerance, o = n.dragMinimum, u = n.type, s = n.target, f = n.lineHeight, p = n.debounce, m = n.preventDefault, d = n.onStop, g = n.onStopDelay, c = n.ignore, _ = n.wheelSpeed, B = n.event, $ = n.onDragStart, R = n.onDragEnd, K = n.onDrag, L = n.onPress, C = n.onRelease, F = n.onRight, w = n.onLeft, b = n.onUp, U = n.onDown, de = n.onChangeX, x = n.onChangeY, ae = n.onChange, T = n.onToggleX, je = n.onToggleY, Y = n.onHover, ge = n.onHoverEnd, Ce = n.onMove, X = n.ignoreCheck, ce = n.isNormalizer, ie = n.onGestureStart, a = n.onGestureEnd, le = n.onWheel, Ft = n.onEnable, Tt = n.onDisable, Qe = n.onClick, xt = n.scrollSpeed, G = n.capture, Te = n.allowClicks, Oe = n.lockAxis, hr = n.onLockAxis;
    this.target = s = Ve(s) || At, this.vars = n, c && (c = Se.utils.toArray(c)), i = i || 1e-9, o = o || 0, _ = _ || 1, xt = xt || 1, u = u || "wheel,touch,pointer", p = p !== !1, f || (f = parseFloat(qe.getComputedStyle(fr).lineHeight) || 22);
    var We, Ke, I, he, $e, ft, ke, l = this, _t = 0, q = 0, Mt = Bt(s, Be), Ct = Bt(s, fe), tr = Mt(), Pe = Ct(), pr = ~u.indexOf("touch") && !~u.indexOf("pointer") && ut[0] === "pointerdown", Ot = kr(s), te = s.ownerDocument || Dt, Ye = [0, 0, 0], Re = [0, 0, 0], mr = 0, De = function() {
      return mr = Or();
    }, dt = function(E, h) {
      return (l.event = E) && c && ~c.indexOf(E.target) || h && pr && E.pointerType !== "touch" || X && X(E, h);
    }, _r = function() {
      l._vx.reset(), l._vy.reset(), Ke.pause(), d && d(l);
    }, kt = function() {
      var E = l.deltaX = Ui(Ye), h = l.deltaY = Ui(Re), y = Math.abs(E) >= i, S = Math.abs(h) >= i;
      ae && (y || S) && ae(l, E, h, Ye, Re), y && (F && l.deltaX > 0 && F(l), w && l.deltaX < 0 && w(l), de && de(l), T && l.deltaX < 0 != _t < 0 && T(l), _t = l.deltaX, Ye[0] = Ye[1] = Ye[2] = 0), S && (U && l.deltaY > 0 && U(l), b && l.deltaY < 0 && b(l), x && x(l), je && l.deltaY < 0 != q < 0 && je(l), q = l.deltaY, Re[0] = Re[1] = Re[2] = 0), (he || I) && (Ce && Ce(l), I && (K(l), I = !1), he = !1), ft && !(ft = !1) && hr && hr(l), $e && (le(l), $e = !1), We = 0;
    }, rr = function(E, h, y) {
      Ye[y] += E, Re[y] += h, l._vx.update(E), l._vy.update(h), p ? We || (We = requestAnimationFrame(kt)) : kt();
    }, Vt = function(E, h) {
      Oe && !ke && (l.axis = ke = Math.abs(E) > Math.abs(h) ? "x" : "y", ft = !0), ke !== "y" && (Ye[2] += E, l._vx.update(E, !0)), ke !== "x" && (Re[2] += h, l._vy.update(h, !0)), p ? We || (We = requestAnimationFrame(kt)) : kt();
    }, Wt = function(E) {
      if (!dt(E, 1)) {
        E = yr(E, m);
        var h = E.clientX, y = E.clientY, S = h - l.x, P = y - l.y, pe = l.isDragging;
        l.x = h, l.y = y, (pe || Math.abs(l.startX - h) >= o || Math.abs(l.startY - y) >= o) && (K && (I = !0), pe || (l.isDragging = !0), Vt(S, P), pe || $ && $(l));
      }
    }, A = l.onPress = function(O) {
      dt(O, 1) || O && O.button || (l.axis = ke = null, Ke.pause(), l.isPressed = !0, O = yr(O), _t = q = 0, l.startX = l.x = O.clientX, l.startY = l.y = O.clientY, l._vx.reset(), l._vy.reset(), Fe(ce ? s : te, ut[1], Wt, m, !0), l.deltaX = l.deltaY = 0, L && L(l));
    }, vt = l.onRelease = function(O) {
      if (!dt(O, 1)) {
        Ne(ce ? s : te, ut[1], Wt, !0);
        var E = !isNaN(l.y - l.startY), h = l.isDragging && (Math.abs(l.x - l.startX) > 3 || Math.abs(l.y - l.startY) > 3), y = yr(O);
        !h && E && (l._vx.reset(), l._vy.reset(), m && Te && Se.delayedCall(0.08, function() {
          if (Or() - mr > 300 && !O.defaultPrevented) {
            if (O.target.click)
              O.target.click();
            else if (te.createEvent) {
              var S = te.createEvent("MouseEvents");
              S.initMouseEvent("click", !0, !0, qe, 1, y.screenX, y.screenY, y.clientX, y.clientY, !1, !1, !1, !1, 0, null), O.target.dispatchEvent(S);
            }
          }
        })), l.isDragging = l.isGesturing = l.isPressed = !1, d && !ce && Ke.restart(!0), R && h && R(l), C && C(l, h);
      }
    }, it = function(E) {
      return E.touches && E.touches.length > 1 && (l.isGesturing = !0) && ie(E, l.isDragging);
    }, ot = function() {
      return (l.isGesturing = !1) || a(l);
    }, Ze = function(E) {
      if (!dt(E)) {
        var h = Mt(), y = Ct();
        rr((h - tr) * xt, (y - Pe) * xt, 1), tr = h, Pe = y, d && Ke.restart(!0);
      }
    }, st = function(E) {
      if (!dt(E)) {
        E = yr(E, m), le && ($e = !0);
        var h = (E.deltaMode === 1 ? f : E.deltaMode === 2 ? qe.innerHeight : 1) * _;
        rr(E.deltaX * h, E.deltaY * h, 0), d && !ce && Ke.restart(!0);
      }
    }, $t = function(E) {
      if (!dt(E)) {
        var h = E.clientX, y = E.clientY, S = h - l.x, P = y - l.y;
        l.x = h, l.y = y, he = !0, (S || P) && Vt(S, P);
      }
    }, nr = function(E) {
      l.event = E, Y(l);
    }, bt = function(E) {
      l.event = E, ge(l);
    }, vr = function(E) {
      return dt(E) || yr(E, m) && Qe(l);
    };
    Ke = l._dc = Se.delayedCall(g || 0.25, _r).pause(), l.deltaX = l.deltaY = 0, l._vx = Ln(0, 50, !0), l._vy = Ln(0, 50, !0), l.scrollX = Mt, l.scrollY = Ct, l.isDragging = l.isGesturing = l.isPressed = !1, Do(this), l.enable = function(O) {
      return l.isEnabled || (Fe(Ot ? te : s, "scroll", Bn), u.indexOf("scroll") >= 0 && Fe(Ot ? te : s, "scroll", Ze, m, G), u.indexOf("wheel") >= 0 && Fe(s, "wheel", st, m, G), (u.indexOf("touch") >= 0 && Po || u.indexOf("pointer") >= 0) && (Fe(s, ut[0], A, m, G), Fe(te, ut[2], vt), Fe(te, ut[3], vt), Te && Fe(s, "click", De, !1, !0), Qe && Fe(s, "click", vr), ie && Fe(te, "gesturestart", it), a && Fe(te, "gestureend", ot), Y && Fe(s, Xt + "enter", nr), ge && Fe(s, Xt + "leave", bt), Ce && Fe(s, Xt + "move", $t)), l.isEnabled = !0, O && O.type && A(O), Ft && Ft(l)), l;
    }, l.disable = function() {
      l.isEnabled && (cr.filter(function(O) {
        return O !== l && kr(O.target);
      }).length || Ne(Ot ? te : s, "scroll", Bn), l.isPressed && (l._vx.reset(), l._vy.reset(), Ne(ce ? s : te, ut[1], Wt, !0)), Ne(Ot ? te : s, "scroll", Ze, G), Ne(s, "wheel", st, G), Ne(s, ut[0], A, G), Ne(te, ut[2], vt), Ne(te, ut[3], vt), Ne(s, "click", De, !0), Ne(s, "click", vr), Ne(te, "gesturestart", it), Ne(te, "gestureend", ot), Ne(s, Xt + "enter", nr), Ne(s, Xt + "leave", bt), Ne(s, Xt + "move", $t), l.isEnabled = l.isPressed = l.isDragging = !1, Tt && Tt(l));
    }, l.kill = l.revert = function() {
      l.disable();
      var O = cr.indexOf(l);
      O >= 0 && cr.splice(O, 1), yt === l && (yt = 0);
    }, cr.push(l), ce && kr(s) && (yt = l), l.enable(B);
  }, Cu(e, [{
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
ue.register = zo;
ue.getAll = function() {
  return cr.slice();
};
ue.getById = function(e) {
  return cr.filter(function(t) {
    return t.vars.id === e;
  })[0];
};
Ao() && Se.registerPlugin(ue);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var v, ur, z, j, ct, ee, Bo, fn, dn, lr, Kr, Wr, Me, yn, Fn, Ie, Gi, qi, ar, Lo, Mn, Fo, He, Vo, Wo, $o, Pt, Vn, Qn, Cn, $r = 1, ze = Date.now, On = ze(), rt = 0, Sr = 0, ku = function e() {
  return Sr && requestAnimationFrame(e);
}, ji = function() {
  return yn = 1;
}, Qi = function() {
  return yn = 0;
}, pt = function(t) {
  return t;
}, Tr = function(t) {
  return Math.round(t * 1e5) / 1e5 || 0;
}, Yo = function() {
  return typeof window < "u";
}, Xo = function() {
  return v || Yo() && (v = window.gsap) && v.registerPlugin && v;
}, Zt = function(t) {
  return !!~Bo.indexOf(t);
}, Ho = function(t) {
  return It(t, "getBoundingClientRect") || (Zt(t) ? function() {
    return nn.width = z.innerWidth, nn.height = z.innerHeight, nn;
  } : function() {
    return wt(t);
  });
}, Pu = function(t, r, n) {
  var i = n.d, o = n.d2, u = n.a;
  return (u = It(t, "getBoundingClientRect")) ? function() {
    return u()[i];
  } : function() {
    return (r ? z["inner" + o] : t["client" + o]) || 0;
  };
}, Ru = function(t, r) {
  return !r || ~mt.indexOf(t) ? Ho(t) : function() {
    return nn;
  };
}, Nt = function(t, r) {
  var n = r.s, i = r.d2, o = r.d, u = r.a;
  return Math.max(0, (n = "scroll" + i) && (u = It(t, n)) ? u() - Ho(t)()[o] : Zt(t) ? (ct[n] || ee[n]) - (z["inner" + i] || ct["client" + i] || ee["client" + i]) : t[n] - t["offset" + i]);
}, Yr = function(t, r) {
  for (var n = 0; n < ar.length; n += 3)
    (!r || ~r.indexOf(ar[n + 1])) && t(ar[n], ar[n + 1], ar[n + 2]);
}, at = function(t) {
  return typeof t == "string";
}, Le = function(t) {
  return typeof t == "function";
}, xr = function(t) {
  return typeof t == "number";
}, Zr = function(t) {
  return typeof t == "object";
}, Er = function(t, r, n) {
  return t && t.progress(r ? 0 : 1) && n && t.pause();
}, kn = function(t, r) {
  if (t.enabled) {
    var n = r(t);
    n && n.totalTime && (t.callbackAnimation = n);
  }
}, or = Math.abs, Uo = "left", Go = "top", Kn = "right", Zn = "bottom", Gt = "width", qt = "height", Pr = "Right", Rr = "Left", Dr = "Top", Ar = "Bottom", ne = "padding", Je = "margin", gr = "Width", Jn = "Height", Ee = "px", lt = function(t) {
  return z.getComputedStyle(t);
}, Du = function(t) {
  var r = lt(t).position;
  t.style.position = r === "absolute" || r === "fixed" ? r : "relative";
}, Ki = function(t, r) {
  for (var n in r)
    n in t || (t[n] = r[n]);
  return t;
}, wt = function(t, r) {
  var n = r && lt(t)[Fn] !== "matrix(1, 0, 0, 1, 0, 0)" && v.to(t, {
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
}, Wn = function(t, r) {
  var n = r.d2;
  return t["offset" + n] || t["client" + n] || 0;
}, qo = function(t) {
  var r = [], n = t.labels, i = t.duration(), o;
  for (o in n)
    r.push(n[o] / i);
  return r;
}, Au = function(t) {
  return function(r) {
    return v.utils.snap(qo(t), r);
  };
}, ei = function(t) {
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
}, Nu = function(t) {
  return function(r, n) {
    return ei(qo(t))(r, n.direction);
  };
}, Xr = function(t, r, n, i) {
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
}, Hr = function(t, r, n) {
  n = n && n.wheelHandler, n && (t(r, "wheel", n), t(r, "touchmove", n));
}, Zi = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Ur = {
  toggleActions: "play",
  anticipatePin: 0
}, gn = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Jr = function(t, r) {
  if (at(t)) {
    var n = t.indexOf("="), i = ~n ? +(t.charAt(n - 1) + 1) * parseFloat(t.substr(n + 1)) : 0;
    ~n && (t.indexOf("%") > n && (i *= r / 100), t = t.substr(0, n - 1)), t = i + (t in gn ? gn[t] * r : ~t.indexOf("%") ? parseFloat(t) * r / 100 : parseFloat(t) || 0);
  }
  return t;
}, Gr = function(t, r, n, i, o, u, s, f) {
  var p = o.startColor, m = o.endColor, d = o.fontSize, g = o.indent, c = o.fontWeight, _ = j.createElement("div"), B = Zt(n) || It(n, "pinType") === "fixed", $ = t.indexOf("scroller") !== -1, R = B ? ee : n, K = t.indexOf("start") !== -1, L = K ? p : m, C = "border-color:" + L + ";font-size:" + d + ";color:" + L + ";font-weight:" + c + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return C += "position:" + (($ || f) && B ? "fixed;" : "absolute;"), ($ || f || !B) && (C += (i === fe ? Kn : Zn) + ":" + (u + parseFloat(g)) + "px;"), s && (C += "box-sizing:border-box;text-align:left;width:" + s.offsetWidth + "px;"), _._isStart = K, _.setAttribute("class", "gsap-marker-" + t + (r ? " marker-" + r : "")), _.style.cssText = C, _.innerText = r || r === 0 ? t + "-" + r : t, R.children[0] ? R.insertBefore(_, R.children[0]) : R.appendChild(_), _._offset = _["offset" + i.op.d2], en(_, 0, i, K), _;
}, en = function(t, r, n, i) {
  var o = {
    display: "block"
  }, u = n[i ? "os2" : "p2"], s = n[i ? "p2" : "os2"];
  t._isFlipped = i, o[n.a + "Percent"] = i ? -100 : 0, o[n.a] = i ? "1px" : 0, o["border" + u + gr] = 1, o["border" + s + gr] = 0, o[n.p] = r + "px", v.set(t, o);
}, D = [], $n = {}, Ir, Ji = function() {
  return ze() - rt > 34 && (Ir || (Ir = requestAnimationFrame(St)));
}, sr = function() {
  (!He || !He.isPressed || He.startX > ee.clientWidth) && (N.cache++, He ? Ir || (Ir = requestAnimationFrame(St)) : St(), rt || er("scrollStart"), rt = ze());
}, Pn = function() {
  $o = z.innerWidth, Wo = z.innerHeight;
}, Mr = function() {
  N.cache++, !Me && !Fo && !j.fullscreenElement && !j.webkitFullscreenElement && (!Vo || $o !== z.innerWidth || Math.abs(z.innerHeight - Wo) > z.innerHeight * 0.25) && fn.restart(!0);
}, Jt = {}, Iu = [], jo = function e() {
  return be(k, "scrollEnd", e) || Ht(!0);
}, er = function(t) {
  return Jt[t] && Jt[t].map(function(r) {
    return r();
  }) || Iu;
}, Ue = [], Qo = function(t) {
  for (var r = 0; r < Ue.length; r += 5)
    (!t || Ue[r + 4] && Ue[r + 4].query === t) && (Ue[r].style.cssText = Ue[r + 1], Ue[r].getBBox && Ue[r].setAttribute("transform", Ue[r + 2] || ""), Ue[r + 3].uncache = 1);
}, ti = function(t, r) {
  var n;
  for (Ie = 0; Ie < D.length; Ie++)
    n = D[Ie], n && (!r || n._ctx === r) && (t ? n.kill(1) : n.revert(!0, !0));
  r && Qo(r), r || er("revert");
}, Ko = function(t, r) {
  N.cache++, (r || !Ge) && N.forEach(function(n) {
    return Le(n) && n.cacheID++ && (n.rec = 0);
  }), at(t) && (z.history.scrollRestoration = Qn = t);
}, Ge, jt = 0, eo, zu = function() {
  if (eo !== jt) {
    var t = eo = jt;
    requestAnimationFrame(function() {
      return t === jt && Ht(!0);
    });
  }
}, Ht = function(t, r) {
  if (rt && !t) {
    we(k, "scrollEnd", jo);
    return;
  }
  Ge = k.isRefreshing = !0, N.forEach(function(i) {
    return Le(i) && i.cacheID++ && (i.rec = i());
  });
  var n = er("refreshInit");
  Lo && k.sort(), r || ti(), N.forEach(function(i) {
    Le(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
  }), D.slice(0).forEach(function(i) {
    return i.refresh();
  }), D.forEach(function(i, o) {
    if (i._subPinOffset && i.pin) {
      var u = i.vars.horizontal ? "offsetWidth" : "offsetHeight", s = i.pin[u];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[u] - s), i.refresh();
    }
  }), D.forEach(function(i) {
    return i.vars.end === "max" && i.setPositions(i.start, Math.max(i.start + 1, Nt(i.scroller, i._dir)));
  }), n.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), N.forEach(function(i) {
    Le(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), Ko(Qn, 1), fn.pause(), jt++, Ge = 2, St(2), D.forEach(function(i) {
    return Le(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), Ge = k.isRefreshing = !1, er("refresh");
}, Yn = 0, tn = 1, Nr, St = function(t) {
  if (!Ge || t === 2) {
    k.isUpdating = !0, Nr && Nr.update(0);
    var r = D.length, n = ze(), i = n - On >= 50, o = r && D[0].scroll();
    if (tn = Yn > o ? -1 : 1, Ge || (Yn = o), i && (rt && !yn && n - rt > 200 && (rt = 0, er("scrollEnd")), Kr = On, On = n), tn < 0) {
      for (Ie = r; Ie-- > 0; )
        D[Ie] && D[Ie].update(0, i);
      tn = 1;
    } else
      for (Ie = 0; Ie < r; Ie++)
        D[Ie] && D[Ie].update(0, i);
    k.isUpdating = !1;
  }
  Ir = 0;
}, Xn = [Uo, Go, Zn, Kn, Je + Ar, Je + Pr, Je + Dr, Je + Rr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], rn = Xn.concat([Gt, qt, "boxSizing", "max" + gr, "max" + Jn, "position", Je, ne, ne + Dr, ne + Pr, ne + Ar, ne + Rr]), Bu = function(t, r, n) {
  dr(n);
  var i = t._gsap;
  if (i.spacerIsNative)
    dr(i.spacerState);
  else if (t._gsap.swappedIn) {
    var o = r.parentNode;
    o && (o.insertBefore(t, r), o.removeChild(r));
  }
  t._gsap.swappedIn = !1;
}, Rn = function(t, r, n, i) {
  if (!t._gsap.swappedIn) {
    for (var o = Xn.length, u = r.style, s = t.style, f; o--; )
      f = Xn[o], u[f] = n[f];
    u.position = n.position === "absolute" ? "absolute" : "relative", n.display === "inline" && (u.display = "inline-block"), s[Zn] = s[Kn] = "auto", u.flexBasis = n.flexBasis || "auto", u.overflow = "visible", u.boxSizing = "border-box", u[Gt] = Wn(t, Be) + Ee, u[qt] = Wn(t, fe) + Ee, u[ne] = s[Je] = s[Go] = s[Uo] = "0", dr(i), s[Gt] = s["max" + gr] = n[Gt], s[qt] = s["max" + Jn] = n[qt], s[ne] = n[ne], t.parentNode !== r && (t.parentNode.insertBefore(r, t), r.appendChild(t)), t._gsap.swappedIn = !0;
  }
}, Lu = /([A-Z])/g, dr = function(t) {
  if (t) {
    var r = t.t.style, n = t.length, i = 0, o, u;
    for ((t.t._gsap || v.core.getCache(t.t)).uncache = 1; i < n; i += 2)
      u = t[i + 1], o = t[i], u ? r[o] = u : r[o] && r.removeProperty(o.replace(Lu, "-$1").toLowerCase());
  }
}, qr = function(t) {
  for (var r = rn.length, n = t.style, i = [], o = 0; o < r; o++)
    i.push(rn[o], n[rn[o]]);
  return i.t = t, i;
}, Fu = function(t, r, n) {
  for (var i = [], o = t.length, u = n ? 8 : 0, s; u < o; u += 2)
    s = t[u], i.push(s, s in r ? r[s] : t[u + 1]);
  return i.t = t.t, i;
}, nn = {
  left: 0,
  top: 0
}, to = function(t, r, n, i, o, u, s, f, p, m, d, g, c) {
  Le(t) && (t = t(f)), at(t) && t.substr(0, 3) === "max" && (t = g + (t.charAt(4) === "=" ? Jr("0" + t.substr(3), n) : 0));
  var _ = c ? c.time() : 0, B, $, R;
  if (c && c.seek(0), xr(t))
    c && (t = v.utils.mapRange(c.scrollTrigger.start, c.scrollTrigger.end, 0, g, t)), s && en(s, n, i, !0);
  else {
    Le(r) && (r = r(f));
    var K = (t || "0").split(" "), L, C, F, w;
    R = Ve(r) || ee, L = wt(R) || {}, (!L || !L.left && !L.top) && lt(R).display === "none" && (w = R.style.display, R.style.display = "block", L = wt(R), w ? R.style.display = w : R.style.removeProperty("display")), C = Jr(K[0], L[i.d]), F = Jr(K[1] || "0", n), t = L[i.p] - p[i.p] - m + C + o - F, s && en(s, F, i, n - F < 20 || s._isStart && F > 20), n -= n - F;
  }
  if (u) {
    var b = t + n, U = u._isStart;
    B = "scroll" + i.d2, en(u, b, i, U && b > 20 || !U && (d ? Math.max(ee[B], ct[B]) : u.parentNode[B]) <= b + 1), d && (p = wt(s), d && (u.style[i.op.p] = p[i.op.p] - i.op.m - u._offset + Ee));
  }
  return c && R && (B = wt(R), c.seek(g), $ = wt(R), c._caScrollDist = B[i.p] - $[i.p], t = t / c._caScrollDist * g), c && c.seek(_), c ? t : Math.round(t);
}, Vu = /(webkit|moz|length|cssText|inset)/i, ro = function(t, r, n, i) {
  if (t.parentNode !== r) {
    var o = t.style, u, s;
    if (r === ee) {
      t._stOrig = o.cssText, s = lt(t);
      for (u in s)
        !+u && !Vu.test(u) && s[u] && typeof o[u] == "string" && u !== "0" && (o[u] = s[u]);
      o.top = n, o.left = i;
    } else
      o.cssText = t._stOrig;
    v.core.getCache(t).uncache = 1, r.appendChild(t);
  }
}, Zo = function(t, r, n) {
  var i = r, o = i;
  return function(u) {
    var s = Math.round(t());
    return s !== i && s !== o && Math.abs(s - i) > 3 && Math.abs(s - o) > 3 && (u = s, n && n()), o = i, i = u, u;
  };
}, no = function(t, r) {
  var n = Bt(t, r), i = "_scroll" + r.p2, o = function u(s, f, p, m, d) {
    var g = u.tween, c = f.onComplete, _ = {};
    p = p || n();
    var B = Zo(n, p, function() {
      g.kill(), u.tween = 0;
    });
    return d = m && d || 0, m = m || s - p, g && g.kill(), f[i] = s, f.modifiers = _, _[i] = function() {
      return B(p + m * g.ratio + d * g.ratio * g.ratio);
    }, f.onUpdate = function() {
      N.cache++, St();
    }, f.onComplete = function() {
      u.tween = 0, c && c.call(g);
    }, g = u.tween = v.to(t, f), g;
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
      this.update = this.refresh = this.kill = pt;
      return;
    }
    n = Ki(at(n) || xr(n) || n.nodeType ? {
      trigger: n
    } : n, Ur);
    var o = n, u = o.onUpdate, s = o.toggleClass, f = o.id, p = o.onToggle, m = o.onRefresh, d = o.scrub, g = o.trigger, c = o.pin, _ = o.pinSpacing, B = o.invalidateOnRefresh, $ = o.anticipatePin, R = o.onScrubComplete, K = o.onSnapComplete, L = o.once, C = o.snap, F = o.pinReparent, w = o.pinSpacer, b = o.containerAnimation, U = o.fastScrollEnd, de = o.preventOverlaps, x = n.horizontal || n.containerAnimation && n.horizontal !== !1 ? Be : fe, ae = !d && d !== 0, T = Ve(n.scroller || z), je = v.core.getCache(T), Y = Zt(T), ge = ("pinType" in n ? n.pinType : It(T, "pinType") || Y && "fixed") === "fixed", Ce = [n.onEnter, n.onLeave, n.onEnterBack, n.onLeaveBack], X = ae && n.toggleActions.split(" "), ce = "markers" in n ? n.markers : Ur.markers, ie = Y ? 0 : parseFloat(lt(T)["border" + x.p2 + gr]) || 0, a = this, le = n.onRefreshInit && function() {
      return n.onRefreshInit(a);
    }, Ft = Pu(T, Y, x), Tt = Ru(T, Y), Qe = 0, xt = 0, G = Bt(T, x), Te, Oe, hr, We, Ke, I, he, $e, ft, ke, l, _t, q, Mt, Ct, tr, Pe, pr, Ot, te, Ye, Re, mr, De, dt, _r, kt, rr, Vt, Wt, A, vt, it, ot, Ze, st, $t, nr, bt;
    if (Vn(a), a._dir = x, $ *= 45, a.scroller = T, a.scroll = b ? b.time.bind(b) : G, We = G(), a.vars = n, i = i || n.animation, "refreshPriority" in n && (Lo = 1, n.refreshPriority === -9999 && (Nr = a)), je.tweenScroll = je.tweenScroll || {
      top: no(T, fe),
      left: no(T, Be)
    }, a.tweenTo = Te = je.tweenScroll[x.p], a.scrubDuration = function(h) {
      vt = xr(h) && h, vt ? A ? A.duration(h) : A = v.to(i, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: vt,
        paused: !0,
        onComplete: function() {
          return R && R(a);
        }
      }) : (A && A.progress(1).kill(), A = 0);
    }, i && (i.vars.lazy = !1, i._initted || i.vars.immediateRender !== !1 && n.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), a.animation = i.pause(), i.scrollTrigger = a, a.scrubDuration(d), A && A.resetTo && A.resetTo("totalProgress", 0), Vt = 0, f || (f = i.vars.id)), D.push(a), C && ((!Zr(C) || C.push) && (C = {
      snapTo: C
    }), "scrollBehavior" in ee.style && v.set(Y ? [ee, ct] : T, {
      scrollBehavior: "auto"
    }), N.forEach(function(h) {
      return Le(h) && h.target === (Y ? j.scrollingElement || ct : T) && (h.smooth = !1);
    }), hr = Le(C.snapTo) ? C.snapTo : C.snapTo === "labels" ? Au(i) : C.snapTo === "labelsDirectional" ? Nu(i) : C.directional !== !1 ? function(h, y) {
      return ei(C.snapTo)(h, ze() - xt < 500 ? 0 : y.direction);
    } : v.utils.snap(C.snapTo), it = C.duration || {
      min: 0.1,
      max: 2
    }, it = Zr(it) ? lr(it.min, it.max) : lr(it, it), ot = v.delayedCall(C.delay || vt / 2 || 0.1, function() {
      var h = G(), y = ze() - xt < 500, S = Te.tween;
      if ((y || Math.abs(a.getVelocity()) < 10) && !S && !yn && Qe !== h) {
        var P = (h - I) / q, pe = i && !ae ? i.totalProgress() : P, V = y ? 0 : (pe - Wt) / (ze() - Kr) * 1e3 || 0, Z = v.utils.clamp(-P, 1 - P, or(V / 2) * V / 0.185), ye = P + (C.inertia === !1 ? 0 : Z), me = lr(0, 1, hr(ye, a)), oe = Math.round(I + me * q), J = C, Xe = J.onStart, Ae = J.onInterrupt, _e = J.onComplete;
        if (h <= he && h >= I && oe !== h) {
          if (S && !S._initted && S.data <= or(oe - h))
            return;
          C.inertia === !1 && (Z = me - P), Te(oe, {
            duration: it(or(Math.max(or(ye - pe), or(me - pe)) * 0.185 / V / 0.05 || 0)),
            ease: C.ease || "power3",
            data: or(oe - h),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return ot.restart(!0) && Ae && Ae(a);
            },
            onComplete: function() {
              a.update(), Qe = G(), Vt = Wt = i && !ae ? i.totalProgress() : a.progress, K && K(a), _e && _e(a);
            }
          }, h, Z * q, oe - h - Z * q), Xe && Xe(a, Te.tween);
        }
      } else
        a.isActive && Qe !== h && ot.restart(!0);
    }).pause()), f && ($n[f] = a), g = a.trigger = Ve(g || c), bt = g && g._gsap && g._gsap.stRevert, bt && (bt = bt(a)), c = c === !0 ? g : Ve(c), at(s) && (s = {
      targets: g,
      className: s
    }), c && (_ === !1 || _ === Je || (_ = !_ && c.parentNode && c.parentNode.style && lt(c.parentNode).display === "flex" ? !1 : ne), a.pin = c, Oe = v.core.getCache(c), Oe.spacer ? Mt = Oe.pinState : (w && (w = Ve(w), w && !w.nodeType && (w = w.current || w.nativeElement), Oe.spacerIsNative = !!w, w && (Oe.spacerState = qr(w))), Oe.spacer = Pe = w || j.createElement("div"), Pe.classList.add("pin-spacer"), f && Pe.classList.add("pin-spacer-" + f), Oe.pinState = Mt = qr(c)), n.force3D !== !1 && v.set(c, {
      force3D: !0
    }), a.spacer = Pe = Oe.spacer, rr = lt(c), mr = rr[_ + x.os2], Ot = v.getProperty(c), te = v.quickSetter(c, x.a, Ee), Rn(c, Pe, rr), tr = qr(c)), ce) {
      _t = Zr(ce) ? Ki(ce, Zi) : Zi, ke = Gr("scroller-start", f, T, x, _t, 0), l = Gr("scroller-end", f, T, x, _t, 0, ke), pr = ke["offset" + x.op.d2];
      var vr = Ve(It(T, "content") || T);
      $e = this.markerStart = Gr("start", f, vr, x, _t, pr, 0, b), ft = this.markerEnd = Gr("end", f, vr, x, _t, pr, 0, b), b && (nr = v.quickSetter([$e, ft], x.a, Ee)), !ge && !(mt.length && It(T, "fixedMarkers") === !0) && (Du(Y ? ee : T), v.set([ke, l], {
        force3D: !0
      }), dt = v.quickSetter(ke, x.a, Ee), kt = v.quickSetter(l, x.a, Ee));
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
      S !== a.isReverted && (S && (st = Math.max(G(), a.scroll.rec || 0), Ze = a.progress, $t = i && i.progress()), $e && [$e, ft, ke, l].forEach(function(pe) {
        return pe.style.display = S ? "none" : "block";
      }), S && (Me = a, a.update(S)), c && (!F || !a.isActive) && (S ? Bu(c, Pe, Mt) : Rn(c, Pe, lt(c), De)), S || a.update(S), Me = P, a.isReverted = S);
    }, a.refresh = function(h, y) {
      if (!((Me || !a.enabled) && !y)) {
        if (c && h && rt) {
          we(e, "scrollEnd", jo);
          return;
        }
        !Ge && le && le(a), Me = a, xt = ze(), Te.tween && (Te.tween.kill(), Te.tween = 0), A && A.pause(), B && i && i.revert({
          kill: !1
        }).invalidate(), a.isReverted || a.revert(!0, !0), a._subPinOffset = !1;
        for (var S = Ft(), P = Tt(), pe = b ? b.duration() : Nt(T, x), V = q <= 0.01, Z = 0, ye = 0, me = n.end, oe = n.endTrigger || g, J = n.start || (n.start === 0 || !g ? 0 : c ? "0 0" : "0 100%"), Xe = a.pinnedContainer = n.pinnedContainer && Ve(n.pinnedContainer), Ae = g && Math.max(0, D.indexOf(a)) || 0, _e = Ae, re, xe, ir, Yt, se, ve, gt, En, ri, br, ht; _e--; )
          ve = D[_e], ve.end || ve.refresh(0, 1) || (Me = a), gt = ve.pin, gt && (gt === g || gt === c || gt === Xe) && !ve.isReverted && (br || (br = []), br.unshift(ve), ve.revert(!0, !0)), ve !== D[_e] && (Ae--, _e--);
        for (Le(J) && (J = J(a)), I = to(J, g, S, x, G(), $e, ke, a, P, ie, ge, pe, b) || (c ? -1e-3 : 0), Le(me) && (me = me(a)), at(me) && !me.indexOf("+=") && (~me.indexOf(" ") ? me = (at(J) ? J.split(" ")[0] : "") + me : (Z = Jr(me.substr(2), S), me = at(J) ? J : (b ? v.utils.mapRange(0, b.duration(), b.scrollTrigger.start, b.scrollTrigger.end, I) : I) + Z, oe = g)), he = Math.max(I, to(me || (oe ? "100% 0" : pe), oe, S, x, G() + Z, ft, l, a, P, ie, ge, pe, b)) || -1e-3, q = he - I || (I -= 0.01) && 1e-3, Z = 0, _e = Ae; _e--; )
          ve = D[_e], gt = ve.pin, gt && ve.start - ve._pinPush <= I && !b && ve.end > 0 && (re = ve.end - ve.start, (gt === g && ve.start - ve._pinPush < I || gt === Xe) && !xr(J) && (Z += re * (1 - ve.progress)), gt === c && (ye += re));
        if (I += Z, he += Z, V && (Ze = v.utils.clamp(0, 1, v.utils.normalize(I, he, st))), a._pinPush = ye, $e && Z && (re = {}, re[x.a] = "+=" + Z, Xe && (re[x.p] = "-=" + G()), v.set([$e, ft], re)), c)
          re = lt(c), Yt = x === fe, ir = G(), Ye = parseFloat(Ot(x.a)) + ye, !pe && he > 1 && (ht = (Y ? j.scrollingElement || ct : T).style, ht = {
            style: ht,
            value: ht["overflow" + x.a.toUpperCase()]
          }, ht.style["overflow" + x.a.toUpperCase()] = "scroll"), Rn(c, Pe, re), tr = qr(c), xe = wt(c, !0), En = ge && Bt(T, Yt ? Be : fe)(), _ && (De = [_ + x.os2, q + ye + Ee], De.t = Pe, _e = _ === ne ? Wn(c, x) + q + ye : 0, _e && De.push(x.d, _e + Ee), dr(De), Xe && D.forEach(function(wr) {
            wr.pin === Xe && wr.vars.pinSpacing !== !1 && (wr._subPinOffset = !0);
          }), ge && G(st)), ge && (se = {
            top: xe.top + (Yt ? ir - I : En) + Ee,
            left: xe.left + (Yt ? En : ir - I) + Ee,
            boxSizing: "border-box",
            position: "fixed"
          }, se[Gt] = se["max" + gr] = Math.ceil(xe.width) + Ee, se[qt] = se["max" + Jn] = Math.ceil(xe.height) + Ee, se[Je] = se[Je + Dr] = se[Je + Pr] = se[Je + Ar] = se[Je + Rr] = "0", se[ne] = re[ne], se[ne + Dr] = re[ne + Dr], se[ne + Pr] = re[ne + Pr], se[ne + Ar] = re[ne + Ar], se[ne + Rr] = re[ne + Rr], Ct = Fu(Mt, se, F), Ge && G(0)), i ? (ri = i._initted, Mn(1), i.render(i.duration(), !0, !0), Re = Ot(x.a) - Ye + q + ye, _r = Math.abs(q - Re) > 1, ge && _r && Ct.splice(Ct.length - 2, 2), i.render(0, !0, !0), ri || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), Mn(0)) : Re = q, ht && (ht.value ? ht.style["overflow" + x.a.toUpperCase()] = ht.value : ht.style.removeProperty("overflow-" + x.a));
        else if (g && G() && !b)
          for (xe = g.parentNode; xe && xe !== ee; )
            xe._pinOffset && (I -= xe._pinOffset, he -= xe._pinOffset), xe = xe.parentNode;
        br && br.forEach(function(wr) {
          return wr.revert(!1, !0);
        }), a.start = I, a.end = he, We = Ke = Ge ? st : G(), !b && !Ge && (We < st && G(st), a.scroll.rec = 0), a.revert(!1, !0), ot && (Qe = -1, a.isActive && G(I + q * Ze), ot.restart(!0)), Me = 0, i && ae && (i._initted || $t) && i.progress() !== $t && i.progress($t, !0).render(i.time(), !0, !0), (V || Ze !== a.progress || b) && (i && !ae && i.totalProgress(b && I < -1e-3 && !Ze ? v.utils.normalize(I, he, 0) : Ze, !0), a.progress = (We - I) / q === Ze ? 0 : Ze), c && _ && (Pe._pinOffset = Math.round(a.progress * Re)), A && A.invalidate(), m && !Ge && m(a);
      }
    }, a.getVelocity = function() {
      return (G() - Ke) / (ze() - Kr) * 1e3 || 0;
    }, a.endAnimation = function() {
      Er(a.callbackAnimation), i && (A ? A.progress(1) : i.paused() ? ae || Er(i, a.direction < 0, 1) : Er(i, i.reversed()));
    }, a.labelToScroll = function(h) {
      return i && i.labels && (I || a.refresh() || I) + i.labels[h] / i.duration() * q || 0;
    }, a.getTrailing = function(h) {
      var y = D.indexOf(a), S = a.direction > 0 ? D.slice(0, y).reverse() : D.slice(y + 1);
      return (at(h) ? S.filter(function(P) {
        return P.vars.preventOverlaps === h;
      }) : S).filter(function(P) {
        return a.direction > 0 ? P.end <= I : P.start >= he;
      });
    }, a.update = function(h, y, S) {
      if (!(b && !S && !h)) {
        var P = Ge === !0 ? st : a.scroll(), pe = h ? 0 : (P - I) / q, V = pe < 0 ? 0 : pe > 1 ? 1 : pe || 0, Z = a.progress, ye, me, oe, J, Xe, Ae, _e, re;
        if (y && (Ke = We, We = b ? G() : P, C && (Wt = Vt, Vt = i && !ae ? i.totalProgress() : V)), $ && !V && c && !Me && !$r && rt && I < P + (P - Ke) / (ze() - Kr) * $ && (V = 1e-4), V !== Z && a.enabled) {
          if (ye = a.isActive = !!V && V < 1, me = !!Z && Z < 1, Ae = ye !== me, Xe = Ae || !!V != !!Z, a.direction = V > Z ? 1 : -1, a.progress = V, Xe && !Me && (oe = V && !Z ? 0 : V === 1 ? 1 : Z === 1 ? 2 : 3, ae && (J = !Ae && X[oe + 1] !== "none" && X[oe + 1] || X[oe], re = i && (J === "complete" || J === "reset" || J in i))), de && (Ae || re) && (re || d || !i) && (Le(de) ? de(a) : a.getTrailing(de).forEach(function(se) {
            return se.endAnimation();
          })), ae || (A && !Me && !$r ? (A._dp._time - A._start !== A._time && A.render(A._dp._time - A._start), A.resetTo ? A.resetTo("totalProgress", V, i._tTime / i._tDur) : (A.vars.totalProgress = V, A.invalidate().restart())) : i && i.totalProgress(V, !!Me)), c) {
            if (h && _ && (Pe.style[_ + x.os2] = mr), !ge)
              te(Tr(Ye + Re * V));
            else if (Xe) {
              if (_e = !h && V > Z && he + 1 > P && P + 1 >= Nt(T, x), F)
                if (!h && (ye || _e)) {
                  var xe = wt(c, !0), ir = P - I;
                  ro(c, ee, xe.top + (x === fe ? ir : 0) + Ee, xe.left + (x === fe ? 0 : ir) + Ee);
                } else
                  ro(c, Pe);
              dr(ye || _e ? Ct : tr), _r && V < 1 && ye || te(Ye + (V === 1 && !_e ? Re : 0));
            }
          }
          C && !Te.tween && !Me && !$r && ot.restart(!0), s && (Ae || L && V && (V < 1 || !Cn)) && dn(s.targets).forEach(function(se) {
            return se.classList[ye || L ? "add" : "remove"](s.className);
          }), u && !ae && !h && u(a), Xe && !Me ? (ae && (re && (J === "complete" ? i.pause().totalProgress(1) : J === "reset" ? i.restart(!0).pause() : J === "restart" ? i.restart(!0) : i[J]()), u && u(a)), (Ae || !Cn) && (p && Ae && kn(a, p), Ce[oe] && kn(a, Ce[oe]), L && (V === 1 ? a.kill(!1, 1) : Ce[oe] = 0), Ae || (oe = V === 1 ? 1 : 3, Ce[oe] && kn(a, Ce[oe]))), U && !ye && Math.abs(a.getVelocity()) > (xr(U) ? U : 2500) && (Er(a.callbackAnimation), A ? A.progress(1) : Er(i, J === "reverse" ? 1 : !V, 1))) : ae && u && !Me && u(a);
        }
        if (kt) {
          var Yt = b ? P / b.duration() * (b._caScrollDist || 0) : P;
          dt(Yt + (ke._isFlipped ? 1 : 0)), kt(Yt);
        }
        nr && nr(-P / b.duration() * (b._caScrollDist || 0));
      }
    }, a.enable = function(h, y) {
      a.enabled || (a.enabled = !0, we(T, "resize", Mr), we(Y ? j : T, "scroll", sr), le && we(e, "refreshInit", le), h !== !1 && (a.progress = Ze = 0, We = Ke = Qe = G()), y !== !1 && a.refresh());
    }, a.getTween = function(h) {
      return h && Te ? Te.tween : A;
    }, a.setPositions = function(h, y) {
      c && (Ye += h - I, Re += y - h - q, _ === ne && a.adjustPinSpacing(y - h - q)), a.start = I = h, a.end = he = y, q = y - h, a.update();
    }, a.adjustPinSpacing = function(h) {
      if (De && h) {
        var y = De.indexOf(x.d) + 1;
        De[y] = parseFloat(De[y]) + h + Ee, De[1] = parseFloat(De[1]) + h + Ee, dr(De);
      }
    }, a.disable = function(h, y) {
      if (a.enabled && (h !== !1 && a.revert(!0, !0), a.enabled = a.isActive = !1, y || A && A.pause(), st = 0, Oe && (Oe.uncache = 1), le && be(e, "refreshInit", le), ot && (ot.pause(), Te.tween && Te.tween.kill() && (Te.tween = 0)), !Y)) {
        for (var S = D.length; S--; )
          if (D[S].scroller === T && D[S] !== a)
            return;
        be(T, "resize", Mr), be(T, "scroll", sr);
      }
    }, a.kill = function(h, y) {
      a.disable(h, y), A && !y && A.kill(), f && delete $n[f];
      var S = D.indexOf(a);
      S >= 0 && D.splice(S, 1), S === Ie && tn > 0 && Ie--, S = 0, D.forEach(function(P) {
        return P.scroller === a.scroller && (S = 1);
      }), S || Ge || (a.scroll.rec = 0), i && (i.scrollTrigger = null, h && i.revert({
        kill: !1
      }), y || i.kill()), $e && [$e, ft, ke, l].forEach(function(P) {
        return P.parentNode && P.parentNode.removeChild(P);
      }), Nr === a && (Nr = 0), c && (Oe && (Oe.uncache = 1), S = 0, D.forEach(function(P) {
        return P.pin === c && S++;
      }), S || (Oe.spacer = 0)), n.onKill && n.onKill(a);
    }, a.enable(!1, !1), bt && bt(a), !i || !i.add || q ? a.refresh() : v.delayedCall(0.01, function() {
      return I || he || a.refresh();
    }) && (q = 0.01) && (I = he = 0), c && zu();
  }, e.register = function(n) {
    return ur || (v = n || Xo(), Yo() && window.document && e.enable(), ur = Sr), ur;
  }, e.defaults = function(n) {
    if (n)
      for (var i in n)
        Ur[i] = n[i];
    return Ur;
  }, e.disable = function(n, i) {
    Sr = 0, D.forEach(function(u) {
      return u[i ? "kill" : "disable"](n);
    }), be(z, "wheel", sr), be(j, "scroll", sr), clearInterval(Wr), be(j, "touchcancel", pt), be(ee, "touchstart", pt), Xr(be, j, "pointerdown,touchstart,mousedown", ji), Xr(be, j, "pointerup,touchend,mouseup", Qi), fn.kill(), Yr(be);
    for (var o = 0; o < N.length; o += 3)
      Hr(be, N[o], N[o + 1]), Hr(be, N[o], N[o + 2]);
  }, e.enable = function() {
    if (z = window, j = document, ct = j.documentElement, ee = j.body, v && (dn = v.utils.toArray, lr = v.utils.clamp, Vn = v.core.context || pt, Mn = v.core.suppressOverwrites || pt, Qn = z.history.scrollRestoration || "auto", Yn = z.pageYOffset, v.core.globals("ScrollTrigger", e), ee)) {
      Sr = 1, ku(), ue.register(v), e.isTouch = ue.isTouch, Pt = ue.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), we(z, "wheel", sr), Bo = [z, j, ct, ee], v.matchMedia ? (e.matchMedia = function(f) {
        var p = v.matchMedia(), m;
        for (m in f)
          p.add(m, f[m]);
        return p;
      }, v.addEventListener("matchMediaInit", function() {
        return ti();
      }), v.addEventListener("matchMediaRevert", function() {
        return Qo();
      }), v.addEventListener("matchMedia", function() {
        Ht(0, 1), er("matchMedia");
      }), v.matchMedia("(orientation: portrait)", function() {
        return Pn(), Pn;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Pn(), we(j, "scroll", sr);
      var n = ee.style, i = n.borderTopStyle, o = v.core.Animation.prototype, u, s;
      for (o.revert || Object.defineProperty(o, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", u = wt(ee), fe.m = Math.round(u.top + fe.sc()) || 0, Be.m = Math.round(u.left + Be.sc()) || 0, i ? n.borderTopStyle = i : n.removeProperty("border-top-style"), Wr = setInterval(Ji, 250), v.delayedCall(0.5, function() {
        return $r = 0;
      }), we(j, "touchcancel", pt), we(ee, "touchstart", pt), Xr(we, j, "pointerdown,touchstart,mousedown", ji), Xr(we, j, "pointerup,touchend,mouseup", Qi), Fn = v.utils.checkPrefix("transform"), rn.push(Fn), ur = ze(), fn = v.delayedCall(0.2, Ht).pause(), ar = [j, "visibilitychange", function() {
        var f = z.innerWidth, p = z.innerHeight;
        j.hidden ? (Gi = f, qi = p) : (Gi !== f || qi !== p) && Mr();
      }, j, "DOMContentLoaded", Ht, z, "load", Ht, z, "resize", Mr], Yr(we), D.forEach(function(f) {
        return f.enable(0, 1);
      }), s = 0; s < N.length; s += 3)
        Hr(be, N[s], N[s + 1]), Hr(be, N[s], N[s + 2]);
    }
  }, e.config = function(n) {
    "limitCallbacks" in n && (Cn = !!n.limitCallbacks);
    var i = n.syncInterval;
    i && clearInterval(Wr) || (Wr = i) && setInterval(Ji, i), "ignoreMobileResize" in n && (Vo = e.isTouch === 1 && n.ignoreMobileResize), "autoRefreshEvents" in n && (Yr(be) || Yr(we, n.autoRefreshEvents || "none"), Fo = (n.autoRefreshEvents + "").indexOf("resize") === -1);
  }, e.scrollerProxy = function(n, i) {
    var o = Ve(n), u = N.indexOf(o), s = Zt(o);
    ~u && N.splice(u, s ? 6 : 2), i && (s ? mt.unshift(z, i, ee, i, ct, i) : mt.unshift(o, i));
  }, e.clearMatchMedia = function(n) {
    D.forEach(function(i) {
      return i._ctx && i._ctx.query === n && i._ctx.kill(!0, !0);
    });
  }, e.isInViewport = function(n, i, o) {
    var u = (at(n) ? Ve(n) : n).getBoundingClientRect(), s = u[o ? Gt : qt] * i || 0;
    return o ? u.right - s > 0 && u.left + s < z.innerWidth : u.bottom - s > 0 && u.top + s < z.innerHeight;
  }, e.positionInViewport = function(n, i, o) {
    at(n) && (n = Ve(n));
    var u = n.getBoundingClientRect(), s = u[o ? Gt : qt], f = i == null ? s / 2 : i in gn ? gn[i] * s : ~i.indexOf("%") ? parseFloat(i) * s / 100 : parseFloat(i) || 0;
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
      r >= 0 && Ue.splice(r, 5), Ue.push(t, t.style.cssText, t.getBBox && t.getAttribute("transform"), v.core.getCache(t), Vn());
    }
  }) : Ue;
};
k.revert = function(e, t) {
  return ti(!e, t);
};
k.create = function(e, t) {
  return new k(e, t);
};
k.refresh = function(e) {
  return e ? Mr() : (ur || k.register()) && Ht(!0);
};
k.update = function(e) {
  return ++N.cache && St(e === !0 ? 2 : 0);
};
k.clearScrollMemory = Ko;
k.maxScroll = function(e, t) {
  return Nt(e, t ? Be : fe);
};
k.getScrollFunc = function(e, t) {
  return Bt(Ve(e), t ? Be : fe);
};
k.getById = function(e) {
  return $n[e];
};
k.getAll = function() {
  return D.filter(function(e) {
    return e.vars.id !== "ScrollSmoother";
  });
};
k.isScrolling = function() {
  return !!rt;
};
k.snapDirectional = ei;
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
    var d = [], g = [], c = v.delayedCall(i, function() {
      m(d, g), d = [], g = [];
    }).pause();
    return function(_) {
      d.length || c.restart(!0), d.push(_.trigger), g.push(_), o <= d.length && c.progress(1);
    };
  }, s;
  for (s in t)
    n[s] = s.substr(0, 2) === "on" && Le(t[s]) && s !== "onRefreshInit" ? u(s, t[s]) : t[s];
  return Le(o) && (o = o(), we(k, "refresh", function() {
    return o = t.batchMax();
  })), dn(e).forEach(function(f) {
    var p = {};
    for (s in n)
      p[s] = n[s];
    p.trigger = f, r.push(k.create(p));
  }), r;
};
var io = function(t, r, n, i) {
  return r > i ? t(i) : r < 0 && t(0), n > i ? (i - r) / (n - r) : n < 0 ? r / (r - n) : 1;
}, Dn = function e(t, r) {
  r === !0 ? t.style.removeProperty("touch-action") : t.style.touchAction = r === !0 ? "auto" : r ? "pan-" + r + (ue.isTouch ? " pinch-zoom" : "") : "none", t === ct && e(ee, r);
}, jr = {
  auto: 1,
  scroll: 1
}, Wu = function(t) {
  var r = t.event, n = t.target, i = t.axis, o = (r.changedTouches ? r.changedTouches[0] : r).target, u = o._gsap || v.core.getCache(o), s = ze(), f;
  if (!u._isScrollT || s - u._isScrollT > 2e3) {
    for (; o && o !== ee && (o.scrollHeight <= o.clientHeight && o.scrollWidth <= o.clientWidth || !(jr[(f = lt(o)).overflowY] || jr[f.overflowX])); )
      o = o.parentNode;
    u._isScroll = o && o !== n && !Zt(o) && (jr[(f = lt(o)).overflowY] || jr[f.overflowX]), u._isScrollT = s;
  }
  (u._isScroll || i === "x") && (r.stopPropagation(), r._gsapAllow = !0);
}, Jo = function(t, r, n, i) {
  return ue.create({
    target: t,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: r,
    onWheel: i = i && Wu,
    onPress: i,
    onDrag: i,
    onScroll: i,
    onEnable: function() {
      return n && we(j, ue.eventTypes[0], so, !1, !0);
    },
    onDisable: function() {
      return be(j, ue.eventTypes[0], so, !0);
    }
  });
}, $u = /(input|label|select|textarea)/i, oo, so = function(t) {
  var r = $u.test(t.target.tagName);
  (r || oo) && (t._gsapAllow = !0, oo = r);
}, Yu = function(t) {
  Zr(t) || (t = {}), t.preventDefault = t.isNormalizer = t.allowClicks = !0, t.type || (t.type = "wheel,touch"), t.debounce = !!t.debounce, t.id = t.id || "normalizer";
  var r = t, n = r.normalizeScrollX, i = r.momentum, o = r.allowNestedScroll, u = r.onRelease, s, f, p = Ve(t.target) || ct, m = v.core.globals().ScrollSmoother, d = m && m.get(), g = Pt && (t.content && Ve(t.content) || d && t.content !== !1 && !d.smooth() && d.content()), c = Bt(p, fe), _ = Bt(p, Be), B = 1, $ = (ue.isTouch && z.visualViewport ? z.visualViewport.scale * z.visualViewport.width : z.outerWidth) / z.innerWidth, R = 0, K = Le(i) ? function() {
    return i(s);
  } : function() {
    return i || 2.8;
  }, L, C, F = Jo(p, t.type, !0, o), w = function() {
    return C = !1;
  }, b = pt, U = pt, de = function() {
    f = Nt(p, fe), U = lr(Pt ? 1 : 0, f), n && (b = lr(0, Nt(p, Be))), L = jt;
  }, x = function() {
    g._gsap.y = Tr(parseFloat(g._gsap.y) + c.offset) + "px", g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(g._gsap.y) + ", 0, 1)", c.offset = c.cacheID = 0;
  }, ae = function() {
    if (C) {
      requestAnimationFrame(w);
      var ce = Tr(s.deltaY / 2), ie = U(c.v - ce);
      if (g && ie !== c.v + c.offset) {
        c.offset = ie - c.v;
        var a = Tr((parseFloat(g && g._gsap.y) || 0) - c.offset);
        g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + a + ", 0, 1)", g._gsap.y = a + "px", c.cacheID = N.cache, St();
      }
      return !0;
    }
    c.offset && x(), C = !0;
  }, T, je, Y, ge, Ce = function() {
    de(), T.isActive() && T.vars.scrollY > f && (c() > f ? T.progress(1) && c(f) : T.resetTo("scrollY", f));
  };
  return g && v.set(g, {
    y: "+=0"
  }), t.ignoreCheck = function(X) {
    return Pt && X.type === "touchmove" && ae() || B > 1.05 && X.type !== "touchstart" || s.isGesturing || X.touches && X.touches.length > 1;
  }, t.onPress = function() {
    C = !1;
    var X = B;
    B = Tr((z.visualViewport && z.visualViewport.scale || 1) / $), T.pause(), X !== B && Dn(p, B > 1.01 ? !0 : n ? !1 : "x"), je = _(), Y = c(), de(), L = jt;
  }, t.onRelease = t.onGestureStart = function(X, ce) {
    if (c.offset && x(), !ce)
      ge.restart(!0);
    else {
      N.cache++;
      var ie = K(), a, le;
      n && (a = _(), le = a + ie * 0.05 * -X.velocityX / 0.227, ie *= io(_, a, le, Nt(p, Be)), T.vars.scrollX = b(le)), a = c(), le = a + ie * 0.05 * -X.velocityY / 0.227, ie *= io(c, a, le, Nt(p, fe)), T.vars.scrollY = U(le), T.invalidate().duration(ie).play(0.01), (Pt && T.vars.scrollY >= f || a >= f - 1) && v.to({}, {
        onUpdate: Ce,
        duration: ie
      });
    }
    u && u(X);
  }, t.onWheel = function() {
    T._ts && T.pause(), ze() - R > 1e3 && (L = 0, R = ze());
  }, t.onChange = function(X, ce, ie, a, le) {
    if (jt !== L && de(), ce && n && _(b(a[2] === ce ? je + (X.startX - X.x) : _() + ce - a[1])), ie) {
      c.offset && x();
      var Ft = le[2] === ie, Tt = Ft ? Y + X.startY - X.y : c() + ie - le[1], Qe = U(Tt);
      Ft && Tt !== Qe && (Y += Qe - Tt), c(Qe);
    }
    (ie || ce) && St();
  }, t.onEnable = function() {
    Dn(p, n ? !1 : "x"), k.addEventListener("refresh", Ce), we(z, "resize", Ce), c.smooth && (c.target.style.scrollBehavior = "auto", c.smooth = _.smooth = !1), F.enable();
  }, t.onDisable = function() {
    Dn(p, !0), be(z, "resize", Ce), k.removeEventListener("refresh", Ce), F.kill();
  }, t.lockAxis = t.lockAxis !== !1, s = new ue(t), s.iOS = Pt, Pt && !c() && c(1), Pt && v.ticker.add(pt), ge = s._dc, T = v.to(s, {
    ease: "power4",
    paused: !0,
    scrollX: n ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Zo(c, c(), function() {
        return T.pause();
      })
    },
    onUpdate: St,
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
    return He;
  if (e === !0 && He)
    return He.enable();
  if (e === !1)
    return He && He.kill();
  var t = e instanceof ue ? e : Yu(e);
  return He && He.target === t.target && He.kill(), Zt(t.target) && (He = t), t;
};
k.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: Ln,
  _inputObserver: Jo,
  _scrollers: N,
  _proxies: mt,
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
Xo() && v.registerPlugin(k);
function Xu(e = 100) {
  return (t) => Math.floor(t * e) / e;
}
M.registerPlugin(k);
class es extends Br {
  static create(t, r = {}, n = {}) {
    return new es(t, r, n);
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
        var T, je;
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
        const p = o.getBoundingClientRect(), m = f.getBoundingClientRect(), d = p.width + m.width, g = document.createDocumentFragment(), c = [];
        let _ = m.width;
        if (!d || !_)
          return;
        for (; _ <= d; ) {
          const Y = f.cloneNode(!0);
          _ += m.width, c.push(Y);
        }
        g.append(...c), s.append(g);
        const B = M.context(() => {
          M.set(s, {
            x: 0,
            force3D: !0,
            width: _,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), $ = M.utils.pipe(
          (Y) => Math.floor(Y * 1e3) / 1e3,
          M.quickSetter(s, "x", "px")
        ), R = M.utils.wrap(0, -m.width), K = M.utils.normalize(0, -m.width);
        let L, C, F, w, b, U, de, x;
        const ae = M.ticker.add(() => {
          var Y, ge;
          switch (x = M.ticker.deltaRatio(), C = M.utils.interpolate(
            C ?? 0,
            i.meta.scrollTrigger.getVelocity(),
            0.5 * x
          ), F = C * i.meta.velocity, i.meta.direction) {
            case "ltr":
              L = -1, F = -Math.abs(F);
              break;
            case "rtl":
              L = 1, F = Math.abs(F);
              break;
            case "scroll":
              L = i.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              L = -(i.meta.scrollTrigger.direction ?? 1), F = -F;
          }
          w = M.getProperty(s, "x"), b = i.meta.speed * -L, U = (b - F) * x, de = R(w + U), $(de), (ge = (Y = i.meta).onUpdate) == null || ge.call(Y, K(de));
        });
        return (je = (T = i.meta).onCreated) == null || je.call(T), () => {
          var Y;
          for (B.kill(!0), M.ticker.remove(ae), o == null || o.replaceChildren(...i.meta.sourceDOM.childNodes); c.length; )
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
M.registerPlugin(k);
const { wrap: Hu, normalize: Uu, interpolate: Gu } = M.utils, qu = { display: "inline-flex" }, ju = "owow-marquee-outer", Qu = "owow-marquee-inner";
function la(e, t = {}, r = {}) {
  const n = W(
    t,
    Q,
    yo(["onUpdate", "onCreated"])
  ), i = W(
    t,
    Q,
    wo(["onUpdate", "onCreated"]),
    zr(H(Lt, Q)),
    hn
  ), o = nt(() => k.create(i.scrollTriggerVars ?? {})), u = bn(e), s = H(
    et(ea(i.createDOM ?? !0)),
    et(
      H(
        tt(Zu),
        tt(Ku(i, n, o()))
      )
    ),
    Rt("create marquee instances", { config: i })
  );
  return wn(() => {
    const p = s(u);
    return () => W(
      p,
      Rt(),
      zt(Qt((m) => m.revert()))
    );
  }, Q(r));
}
function Ku(e, t, r) {
  const n = nt(Zs());
  let i = 0;
  return (o) => {
    const u = (w = o.rects.innerRect.width, b = o.rects.boundingWidth) => W(
      w > 0 && b > 0,
      an(us, new Error("Zero width")),
      tt(
        H(
          () => w <= b,
          mn(() => {
            const U = o.dom.innerContainer.cloneNode(!0);
            return i = w + o.rects.innerRect.width, n().append(U), u(i, b), n();
          }, n)
        )
      )
    ), s = M.quickSetter(o.dom.outerContainer, "x", "px"), f = H(Xu(1e3), s), p = Hu(0, -o.rects.innerRect.width), m = Uu(0, -o.rects.innerRect.width);
    let d, g, c, _, B, $, R, K;
    const L = nt(
      () => M.ticker.add(() => {
        var w;
        switch (g = M.ticker.deltaRatio(), _ = Gu(
          _ ?? 0,
          r.getVelocity(),
          0.5 * g
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
        B = M.getProperty(o.dom.outerContainer, "x"), $ = (e.speed || 1) * -d, R = ($ - c) * g, K = p(B + R), f(K), (w = t.onUpdate) == null || w.call(t, m(K));
      })
    );
    H(
      u,
      tt(Qs(o.dom.outerContainer)),
      Qt(
        (w) => M.set(w, {
          x: 0,
          force3D: !0,
          width: i,
          display: "flex",
          flexWrap: "nowrap"
        })
      ),
      L,
      () => {
        var w;
        return (w = t.onCreated) == null ? void 0 : w.call(t);
      }
    )();
    function F() {
      M.ticker.remove(L()), o.dom.target.replaceChildren(...o.dom.targetClone.childNodes);
    }
    return Object.freeze({ revert: F });
  };
}
function Zu(e) {
  return {
    dom: e,
    rects: Ju(e)
  };
}
function Ju({ target: e, innerContainer: t }) {
  const r = e.getBoundingClientRect(), n = t.getBoundingClientRect();
  return {
    targetRect: r,
    innerRect: n,
    boundingWidth: r.width + n.width
  };
}
function ea(e) {
  const t = vn();
  return (r) => {
    const n = W(
      r,
      uo(!!e, ju),
      Ut(t)
    ), i = W(
      n,
      Es(uo(!!e, Qu)),
      Ut(t)
    );
    return W(
      [n, i],
      et(Ss),
      ([u, s]) => As(u, s),
      Ps(([u, s]) => ({
        target: r,
        outerContainer: u,
        innerContainer: s,
        targetClone: r.cloneNode(!0)
      })),
      Gn(({ target: u, innerContainer: s, outerContainer: f }) => {
        fo(!!e, Boolean, () => {
          s.append(...u.childNodes), f.append(s), u.append(f);
        }), M.set(s, qu);
      }),
      pn(new Error("Invalid marquee DOM.")),
      Ut(t)
    );
  };
}
function uo(e, t) {
  return H(
    lo(() => e, Co("div"), Mo(`.${t}`)),
    pn(
      new Error(
        e ? "Could not create marquee container." : `Could not find marquee container .${t}`
      )
    ),
    Qt((r) => r.classList.add(t))
  );
}
class ts extends Br {
  constructor(t, r = {}, n = {}) {
    super(async (i, o) => {
      const u = ts.SplitText;
      if (!u)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      const s = M.utils.toArray(t);
      for (const g of s)
        if (!(g instanceof HTMLElement))
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
        y: (g, c) => {
          const _ = parseFloat(getComputedStyle(c).lineHeight);
          return isNaN(_) ? M.getProperty(c, "height") : _;
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
        i.meta.setup = M.set(p.lines, { overflow: "hidden" }), i.meta.tween = M.fromTo(f.lines, m, d);
      }), () => {
        f.revert(), o.kill(!0);
      };
    }, n);
  }
}
function fa(e, t, r = {}) {
  const n = W(
    t,
    Q,
    zr(H(Lt, Q)),
    hn
  ), i = pn(
    n.SplitText,
    new Error("Missing `SplitText` GSAP member plugin.")
  ), o = H(
    bn,
    Rt(),
    et(
      (p) => W(
        i,
        tt((m) => ({
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
        Ut(vn())
      )
    )
  ), u = {
    y: (p, m) => {
      const d = parseFloat(getComputedStyle(m).lineHeight);
      return isNaN(d) ? M.getProperty(m, "height") : d;
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
        Qt(({ parentSplit: d, childSplit: g }) => {
          M.set(d.lines, { overflow: "hidden" }), M.fromTo(g.lines, u, s);
        })
      );
    });
    return () => {
      zt(
        p,
        Qt(({ childSplit: d }) => d.revert())
      ), m.kill(!0);
    };
  }, Q(r));
}
M.registerPlugin(k);
function ta(e, t = {}, r = {}) {
  const n = W(t, Q, yo(["updater"])), i = W(
    t,
    Q,
    wo(["updater"]),
    zr(H(Lt, Q)),
    hn
  ), o = H(
    bn,
    et(
      (d) => k.create({
        trigger: d,
        start: "top bottom",
        end: "bottom top",
        ...i.scrollTriggerVars
      })
    )
  ), u = (d) => () => d.progress, s = (d = 1) => (g) => {
    var c;
    return ((c = n.updater) == null ? void 0 : c.call(n, g, d)) ?? -g * 100 * d;
  }, f = (d, g) => H(
    u(d),
    s(i.speed),
    g,
    sn
  ), p = H(
    o,
    et((d) => {
      const g = d.trigger, c = M.quickSetter(g, "y", i.cssUnit ?? "%"), _ = M.quickSetter(g, "x", i.cssUnit ?? "%");
      return {
        scrollTrigger: d,
        updateY: f(d, c),
        updateX: f(d, _),
        destroy: () => d.kill()
      };
    })
  );
  return wn(() => {
    const d = p(e), g = M.ticker.add(() => {
      zt(d, ({ updateY: c }) => {
        c();
      });
    });
    return () => {
      M.ticker.remove(g), zt(d, (c) => c.destroy());
    };
  }, Q(r));
}
function da(e, t = {}, r = {}) {
  const n = W(
    t,
    Q,
    zr(H(Lt, Q)),
    hn
  ), i = n.size ?? 1.5, o = H(
    bn,
    et(ra(n.createDOM ?? !0, "owow-diorama-outer", "owow-diorama-inner")),
    et(
      tt(
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
      W(
        et(s, wi),
        un(cn),
        zt(({ dom: m, outerRect: d }) => {
          M.set(m.outer, { height: d.height, overflow: "hidden" }), M.set(m.inner, { height: d.height * i });
        })
      );
    }), p = W(
      et(
        s,
        H(
          tt((m) => {
            const d = M.utils.interpolate(
              -(m.outerRect.height * i - m.outerRect.height),
              0
            );
            return ta(m.dom.inner, {
              cssUnit: "px",
              updater: d
            });
          }),
          wi
        )
      ),
      un(cn)
    );
    return () => {
      f.kill(!0), zt(p, (m) => m());
    };
  }, Q(r));
}
function ra(e, t, r) {
  const n = H(
    Co("div"),
    go((i) => i.classList.add(t))
  );
  return H(
    lo(
      () => e,
      (i) => {
        const o = Ks(i), u = i.cloneNode(!0), s = n();
        return u.classList.add(r), s.append(u), o(s), Ts({
          inner: u,
          outer: s,
          original: i
        });
      },
      (i) => W(
        i,
        an(
          na(t, r),
          new Error("Invalid DOM structure for diorama")
        ),
        Ut(vn()),
        tt(() => ({
          inner: i.firstElementChild,
          outer: i,
          original: i
        }))
      )
    )
  );
}
function na(e, t) {
  return (r) => {
    var n;
    return ps(
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
  sa as Ease,
  es as Marquee,
  Br as Motion,
  ko as Pointer,
  aa as SecondOrderDynamics,
  ts as TextClipReveal,
  da as createDiorama,
  la as createMarquee,
  wn as createMotion,
  ta as createParallax,
  Mu as createPhysicsBasedMotion,
  fa as createTextClipReveal,
  Eu as getMousePosition,
  ua as mousePosition,
  ca as physicsBasedMotion
};
