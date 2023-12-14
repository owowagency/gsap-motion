import { fromEventPattern as so, fromEvent as si, noop as Hl, debounceTime as Xs, Observable as So, BehaviorSubject as Vl, skip as Gl, map as To } from "rxjs";
import { gsap as F } from "gsap";
const Ei = 1.70158, Si = 0.7, gc = {
  /**
   * Easing function that starts slow, accelerates and then slows down.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inSine: (t) => -1 * Math.cos(t * (Math.PI / 2)) + 1,
  /**
   * Easing function that starts fast, decelerates and then speeds up.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outSine: (t) => Math.sin(t * (Math.PI / 2)),
  /**
   * Easing function that combines inSine and outSine, creating a slow start and end with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutSine: (t) => -0.5 * (Math.cos(Math.PI * t) - 1),
  /**
   * Easing function that accelerates from zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inQuad: (t) => t * t,
  /**
   * Easing function that decelerates to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outQuad: (t) => t * (2 - t),
  /**
   * Easing function that combines inQuad and outQuad, creating an acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutQuad: (t) => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t,
  /**
   * Easing function that accelerates from zero velocity faster than inQuad.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inCubic: (t) => t * t * t,
  /**
   * Easing function that decelerates to zero velocity faster than outQuad.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outCubic: (t) => --t * t * t + 1,
  /**
   * Easing function that combines inCubic and outCubic, creating a faster acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutCubic: (t) => t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,
  /**
   * Easing function that accelerates from zero velocity even faster than inCubic.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inQuart: (t) => t * t * t * t,
  /**
   * Easing function that decelerates to zero velocity even faster than outCubic.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outQuart: (t) => 1 - --t * t * t * t,
  /**
   * Easing function that combines inQuart and outQuart, creating an even faster acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutQuart: (t) => t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t,
  /**
   * Easing function that accelerates from zero velocity at the fastest rate.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inQuint: (t) => t * t * t * t * t,
  /**
   * Easing function that decelerates to zero velocity at the fastest rate.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outQuint: (t) => 1 + --t * t * t * t * t,
  /**
   * Easing function that combines inQuint and outQuint, creating the fastest acceleration from and deceleration to zero velocity.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutQuint: (t) => t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,
  /**
   * Easing function that starts slow, accelerates rapidly and then slows down to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inExpo: (t) => t === 0 ? 0 : 2 ** (10 * (t - 1)),
  /**
   * Easing function that starts fast, decelerates rapidly and then speeds up to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outExpo: (t) => t === 1 ? 1 : -(2 ** (-10 * t)) + 1,
  /**
   * Easing function that combines inExpo and outExpo, creating a rapid acceleration and deceleration with a slow start and end.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutExpo: (t) => t === 0 || t === 1 ? t : t * 2 < 1 ? 0.5 * 2 ** (10 * (t * 2 - 1)) : 0.5 * (-(2 ** (-10 * (t * 2 - 1))) + 2),
  /**
   * Easing function that starts slow, accelerates and then decelerates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inCirc: (t) => -1 * (Math.sqrt(1 - t / 1 * t) - 1),
  /**
   * Easing function that starts fast, decelerates and then accelerates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   */
  outCirc: (t) => Math.sqrt(1 - (t - 1) ** 2),
  /**
   * Easing function that combines inCirc and outCirc, creating an acceleration and deceleration with a fast start and end.
   * @param t - The time parameter, a value between 0 and 1.
   */
  inOutCirc: (t) => t * 2 < 1 ? -0.5 * (Math.sqrt(1 - (t * 2) ** 2) - 1) : 0.5 * (Math.sqrt(1 - (t * 2 - 2) ** 2) + 1),
  /**
   * Easing function that starts slow, accelerates beyond the destination and then settles back to the destination.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inBack: (t, e = Ei) => t * t * ((e + 1) * t - e),
  /**
   * Easing function that starts fast, decelerates beyond the destination and then settles back to the destination.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  outBack: (t, e = Ei) => {
    const r = t / 1 - 1;
    return r * r * ((e + 1) * r + e) + 1;
  },
  /**
   * Easing function that combines inBack and outBack, creating a start and end beyond the destination with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inOutBack: (t, e = Ei) => {
    const r = t * 2, n = r - 2, i = e * 1.525;
    return r < 1 ? 0.5 * r * r * ((i + 1) * r - i) : 0.5 * (n * n * ((i + 1) * n + i) + 2);
  },
  /**
   * Easing function that starts slow, accelerates, overshoots the destination and then oscillates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inElastic: (t, e = Si) => {
    if (t === 0 || t === 1)
      return t;
    const n = t / 1 - 1, i = 1 - e, s = i / (2 * Math.PI) * Math.asin(1);
    return -(2 ** (10 * n) * Math.sin((n - s) * (2 * Math.PI) / i));
  },
  /**
   * Easing function that starts fast, decelerates, overshoots the destination and then oscillates to a stop.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  outElastic: (t, e = Si) => {
    if (t === 0 || t === 1)
      return t;
    const r = 1 - e, n = t * 2, i = r / (2 * Math.PI) * Math.asin(1);
    return 2 ** (-10 * n) * Math.sin((n - i) * (2 * Math.PI) / r) + 1;
  },
  /**
   * Easing function that combines inElastic and outElastic, creating an overshoot at both the start and end with a fast middle.
   * @param t - The time parameter, a value between 0 and 1.
   * @param m - The magnitude parameter.
   */
  inOutElastic: (t, e = Si) => {
    if (t === 0 || t === 1)
      return t;
    const r = 1 - e, n = t * 2, i = n - 1, s = r / (2 * Math.PI) * Math.asin(1);
    return n < 1 ? -0.5 * (2 ** (10 * i) * Math.sin((i - s) * (2 * Math.PI) / r)) : 2 ** (-10 * i) * Math.sin((i - s) * (2 * Math.PI) / r) * 0.5 + 1;
  }
};
function oe() {
  let t = arguments[0];
  for (let e = 1, r = arguments.length; e < r; e++)
    t = arguments[e](t);
  return t;
}
function ge() {
  let t = arguments;
  return function() {
    let e = t[0].apply(null, arguments);
    for (let r = 1, n = t.length; r < n; r++)
      e = t[r](e);
    return e;
  };
}
function Ul(t) {
  return t === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : t !== null && t.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: t.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : t;
}
function ql(t) {
  if (!(t !== null && t.BS_PRIVATE_NESTED_SOME_NONE !== void 0))
    return t;
  var e = t.BS_PRIVATE_NESTED_SOME_NONE;
  if (e !== 0)
    return {
      BS_PRIVATE_NESTED_SOME_NONE: e - 1 | 0
    };
}
function Ql(t) {
  return t;
}
function Mo(t, e, r, n) {
  return e(t) ? r(t) : n(t);
}
function Or() {
  if (arguments.length === 3) {
    const t = arguments;
    return function(r) {
      return Mo(r, t[0], t[1], t[2]);
    };
  }
  return Mo(arguments[0], arguments[1], arguments[2], arguments[3]);
}
function hr(t) {
}
function Do(t, e, r) {
  return e(t) ? r(t) : t;
}
function zs() {
  if (arguments.length === 2) {
    const t = arguments;
    return function(r) {
      return Do(r, t[0], t[1]);
    };
  }
  return Do(arguments[0], arguments[1], arguments[2]);
}
function Co(t, e) {
  return e(t), t;
}
function lo() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Co(r, t[0]);
    };
  }
  return Co(arguments[0], arguments[1]);
}
function Yt(t) {
  var e = {
    contents: void 0
  };
  return function(...r) {
    var n = e.contents;
    if (n !== void 0)
      return ql(n);
    var i = t(...r);
    return e.contents = Ul(i), i;
  };
}
function pi(t) {
  return t;
}
function jl(t, e) {
  if (t <= 0)
    return [];
  for (var r = new Array(t), n = 0; n < t; ++n)
    r[n] = e;
  return r;
}
function ao(t, e) {
  for (var r = 0, n = t.length; r < n; ++r)
    e(t[r]);
}
function Kl(t, e) {
  for (var r = t.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = e(t[i]);
  return n;
}
function Zl(t, e, r) {
  for (var n = e, i = 0, s = t.length; i < s; ++i)
    n = r(n, t[i]);
  return n;
}
function Jl(t, e) {
  for (var r = t.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !0;
    if (!e(t[i]))
      return !1;
    n = i + 1 | 0;
  }
}
function ea(t, e) {
  for (var r = t.length, n = 0; ; ) {
    var i = n;
    if (i === r)
      return !1;
    if (e(t[i]))
      return !0;
    n = i + 1 | 0;
  }
}
var Po = jl;
function Ys() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Po(r, t[0]);
    };
  }
  return Po(arguments[0], arguments[1]);
}
function ta(t) {
  return t.length !== 0;
}
function ko(t, e) {
  return Kl(t, e);
}
function xt() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return ko(r, t[0]);
    };
  }
  return ko(arguments[0], arguments[1]);
}
function Oo(t, e) {
  for (var r = 0, n = []; r < t.length; ) {
    var i = t[r];
    e(i) && n.push(i), r = r + 1 | 0;
  }
  return n;
}
function Mr() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Oo(r, t[0]);
    };
  }
  return Oo(arguments[0], arguments[1]);
}
var Ro = ea;
function na() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Ro(r, t[0]);
    };
  }
  return Ro(arguments[0], arguments[1]);
}
var No = ao;
function rn() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return No(r, t[0]);
    };
  }
  return No(arguments[0], arguments[1]);
}
function Fi(t) {
  return Zl(t, [], function(e, r) {
    return Array.isArray(r) ? ao(r, function(n) {
      e.push(n);
    }) : e.push(r), e;
  });
}
function Ao(t, e) {
  return ao(t, e), t;
}
function Fs() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Ao(r, t[0]);
    };
  }
  return Ao(arguments[0], arguments[1]);
}
function Lo(t, e) {
  return Jl(t, e);
}
function uo() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Lo(r, t[0]);
    };
  }
  return Lo(arguments[0], arguments[1]);
}
function Io(t, e, r) {
  for (var n = new Array(r), i = 0, s = e; i < r; )
    n[i] = t[s], i = i + 1 | 0, s = s + 1 | 0;
  return n;
}
function $s(t, e) {
  for (; ; ) {
    var r = e, n = t, i = n.length, s = i === 0 ? 1 : i, a = r.length, l = s - a | 0;
    if (l === 0)
      return n.apply(null, r);
    if (l >= 0)
      return function(c, p) {
        return function(g) {
          return $s(c, p.concat([g]));
        };
      }(n, r);
    e = Io(r, s, -l | 0), t = n.apply(null, Io(r, 0, s));
  }
}
function ra(t, e) {
  var r = t.length;
  if (r === 1)
    return t(e);
  switch (r) {
    case 1:
      return t(e);
    case 2:
      return function(n) {
        return t(e, n);
      };
    case 3:
      return function(n, i) {
        return t(e, n, i);
      };
    case 4:
      return function(n, i, s) {
        return t(e, n, i, s);
      };
    case 5:
      return function(n, i, s, a) {
        return t(e, n, i, s, a);
      };
    case 6:
      return function(n, i, s, a, l) {
        return t(e, n, i, s, a, l);
      };
    case 7:
      return function(n, i, s, a, l, c) {
        return t(e, n, i, s, a, l, c);
      };
    default:
      return $s(t, [e]);
  }
}
function ia(t) {
  var e = t.length;
  return e === 1 ? t : function(r) {
    return ra(t, r);
  };
}
function oa(t) {
  return t === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : t !== null && t.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: t.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : t;
}
function sa(t, e) {
  return t.TAG === 0 ? {
    TAG: 0,
    _0: e(t._0)
  } : {
    TAG: 1,
    _0: t._0
  };
}
function Ws(t, e) {
  return t.TAG === 0 ? e(t._0) : {
    TAG: 1,
    _0: t._0
  };
}
function la(t, e) {
  return Ws(t, ia(e));
}
function aa(t, e) {
  return t.TAG === 0 ? t._0 : e;
}
function Bo(t, e) {
  return t == null ? {
    TAG: 1,
    _0: e
  } : {
    TAG: 0,
    _0: t
  };
}
function hi() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Bo(r, t[0]);
    };
  }
  return Bo(arguments[0], arguments[1]);
}
function Xo(t, e, r) {
  return la(hi(t, r), function(n) {
    return e(n) ? {
      TAG: 0,
      _0: n
    } : {
      TAG: 1,
      _0: r
    };
  });
}
function Vn() {
  if (arguments.length === 2) {
    const t = arguments;
    return function(r) {
      return Xo(r, t[0], t[1]);
    };
  }
  return Xo(arguments[0], arguments[1], arguments[2]);
}
var zo = sa;
function it() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return zo(r, t[0]);
    };
  }
  return zo(arguments[0], arguments[1]);
}
var Yo = Ws;
function ua() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Yo(r, t[0]);
    };
  }
  return Yo(arguments[0], arguments[1]);
}
function $i(t) {
  return aa(t, void 0);
}
function ca(t) {
  if (t.TAG === 0)
    return oa(t._0);
}
function Fo(t, e) {
  return t.TAG !== 0 || e(t._0), t;
}
function on() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Fo(r, t[0]);
    };
  }
  return Fo(arguments[0], arguments[1]);
}
function $o(t, e) {
  return t.TAG === 0 || e(t._0), t;
}
function sn() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return $o(r, t[0]);
    };
  }
  return $o(arguments[0], arguments[1]);
}
var Hs = (t) => ({
  TAG: 0,
  _0: t
});
function Vs(t) {
  return typeof t == "string";
}
function Wo(t) {
  return typeof t == "function";
}
function Dr(t) {
  return t != null;
}
function co(t) {
  return t === void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: 0
  } : t !== null && t.BS_PRIVATE_NESTED_SOME_NONE !== void 0 ? {
    BS_PRIVATE_NESTED_SOME_NONE: t.BS_PRIVATE_NESTED_SOME_NONE + 1 | 0
  } : t;
}
function fa(t) {
  if (t != null)
    return co(t);
}
function Rn(t) {
  if (!(t !== null && t.BS_PRIVATE_NESTED_SOME_NONE !== void 0))
    return t;
  var e = t.BS_PRIVATE_NESTED_SOME_NONE;
  if (e !== 0)
    return {
      BS_PRIVATE_NESTED_SOME_NONE: e - 1 | 0
    };
}
function da(t, e) {
  if (t !== void 0)
    return co(e(Rn(t)));
}
function pa(t, e) {
  if (t !== void 0)
    return e(Rn(t));
}
function ha(t, e) {
  return t !== void 0 ? Rn(t) : e;
}
function Ut(t) {
  if (t != null)
    return co(t);
}
var Ho = da;
function Gs() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Ho(r, t[0]);
    };
  }
  return Ho(arguments[0], arguments[1]);
}
var Vo = pa;
function Us() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Vo(r, t[0]);
    };
  }
  return Vo(arguments[0], arguments[1]);
}
function Go(t, e) {
  if (t !== void 0)
    return fa(e(Rn(t)));
}
function ga() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Go(r, t[0]);
    };
  }
  return Go(arguments[0], arguments[1]);
}
function qs(t) {
  return ha(t, void 0);
}
function Uo(t, e) {
  return t !== void 0 && e(Rn(t)), t;
}
function gi() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Uo(r, t[0]);
    };
  }
  return Uo(arguments[0], arguments[1]);
}
function qo(t, e) {
  if (t !== void 0 && e !== void 0)
    return [
      Rn(t),
      Rn(e)
    ];
}
function ma() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return qo(r, t[0]);
    };
  }
  return qo(arguments[0], arguments[1]);
}
var _a = (t) => t, va = void 0, ya = function(t, e) {
  delete t[e];
};
function fo(t) {
  for (var e = {}, r = t.length, n = 0; n < r; ++n) {
    var i = t[n];
    e[i[0]] = i[1];
  }
  return e;
}
function xa(t, e) {
  for (var r = t.length, n = e.length, i = new Array(r + n | 0), s = 0; s < r; ++s)
    i[s] = t[s];
  for (var a = 0; a < n; ++a)
    i[r + a | 0] = e[a];
  return i;
}
function wa(t, e) {
  for (var r = 0, n = t.length; r < n; ++r)
    e(t[r]);
}
function Qs(t, e) {
  for (var r = t.length, n = new Array(r), i = 0; i < r; ++i)
    n[i] = e(t[i]);
  return n;
}
function ba(t, e, r) {
  for (var n = e, i = 0, s = t.length; i < s; ++i)
    n = r(n, t[i]);
  return n;
}
function Qo(t, e) {
  return xa(t, [e]);
}
function Ea() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Qo(r, t[0]);
    };
  }
  return Qo(arguments[0], arguments[1]);
}
function Sa(t) {
  return Object.entries(t);
}
function jo(t, e) {
  return Object.assign({}, t, e);
}
function Ta() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return jo(r, t[0]);
    };
  }
  return jo(arguments[0], arguments[1]);
}
function Ko(t, e) {
  var r = Ta({}, t);
  return wa(e, function(n) {
    return ya(r, n);
  }), r;
}
function js() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Ko(r, t[0]);
    };
  }
  return Ko(arguments[0], arguments[1]);
}
function Zo(t, e) {
  return fo(Qs(Object.keys(t), function(r) {
    var n = e(t[r]);
    return [
      r,
      n
    ];
  }));
}
function Rr() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Zo(r, t[0]);
    };
  }
  return Zo(arguments[0], arguments[1]);
}
function Jo(t, e) {
  return fo(Qs(Object.keys(t), function(r) {
    var n = e(r, t[r]);
    return [
      r,
      n
    ];
  }));
}
function es() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return Jo(r, t[0]);
    };
  }
  return Jo(arguments[0], arguments[1]);
}
function ts(t, e) {
  return fo(ba(Object.keys(t), [], function(r, n) {
    var i = t[n];
    return e(n, i) ? Ea(r, [
      n,
      i
    ]) : r;
  }));
}
function Ma() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return ts(r, t[0]);
    };
  }
  return ts(arguments[0], arguments[1]);
}
function ns(t, e) {
  return Ma(t, function(r, n) {
    return e.includes(r);
  });
}
function Ks() {
  if (arguments.length === 1) {
    const t = arguments;
    return function(r) {
      return ns(r, t[0]);
    };
  }
  return ns(arguments[0], arguments[1]);
}
function rs(t, e, r) {
  return t ? e(void 0) : r(void 0);
}
function mi() {
  if (arguments.length === 2) {
    const t = arguments;
    return function(r) {
      return rs(r, t[0], t[1]);
    };
  }
  return rs(arguments[0], arguments[1], arguments[2]);
}
function De(t, ...e) {
  return !na(
    ["SplitText", "InertiaPlugin"],
    (n) => Wo(t) && t.name === n
  ) && Wo(t) ? t.call(null, e) : t;
}
function Da(t) {
  return () => t;
}
function _i() {
  return Yt(() => globalThis);
}
function Ca() {
  const t = _i();
  return Yt(() => t().document.documentElement);
}
function Pa() {
  const t = _i();
  return Yt(() => t().screen);
}
function ka(t) {
  return new Map(t);
}
function Zs(t) {
  return Yt(() => ka(t == null ? void 0 : t()));
}
function is(t) {
  return (e) => t.get(e);
}
function os(t) {
  return (e, r) => t.set(e, r);
}
const Js = () => {
};
function el(t) {
  let e = t;
  return Object.freeze({
    getValue: () => e,
    setValue: (r) => e = r
  });
}
function Nr() {
  return (t) => console.error(String(t));
}
function Lt(t, ...e) {
  return lo(
    hr
  );
}
function Ti(t, ...e) {
}
function tl() {
  const t = _i(), e = el(!0), r = F.ticker.add(() => void e.setValue(!0)), n = (i) => (s) => oe(
    e.getValue(),
    Lt,
    zs(Boolean, () => {
      e.setValue(!1), i(s);
    })
  );
  return Yt(
    () => so(
      (i) => {
        t().addEventListener("resize", n(i), { passive: !0 });
      },
      (i) => {
        F.ticker.remove(r), t().removeEventListener("resize", n(i));
      }
    )
  );
}
function Oa() {
  return Yt(() => si(globalThis, "mousemove", { passive: !0 }));
}
function Ra() {
  return Yt((t) => {
    const e = /* @__PURE__ */ new Set(), r = new ResizeObserver(() => e.forEach((i) => i()));
    return so(
      (i) => (rn(t, r.observe.bind(r)), e.add(i), r),
      (i) => {
        rn(t, r.unobserve.bind(r)), e.delete(i);
      }
    );
  });
}
function Na(t) {
  return so(
    (e) => {
      t.addEventListener("change", e, { passive: !0 });
    },
    (e) => {
      t.removeEventListener("change", e);
    }
  );
}
function nl(t) {
  return oe(
    Ut(t),
    ga(
      ge(
        Vs,
        mi(
          rl(t),
          Da(t)
        )
      )
    ),
    qs
  );
}
function rl(t) {
  return (e = document) => e == null ? void 0 : e.querySelector(t);
}
function Aa(t) {
  return (e = document) => Array.from(e.querySelectorAll(t));
}
function vi(t, e) {
  return () => document.createElement(t, e);
}
function La(t) {
  return (...e) => (t.append(...e), t);
}
function il(t) {
  return (...e) => {
    t.replaceWith(...e);
  };
}
function Ia() {
  return () => document.createDocumentFragment();
}
function yi(t) {
  return oe(
    Ys(1, De(t)),
    Fi,
    xt(
      (e) => oe(
        e,
        Vs,
        mi(Aa(e), () => [nl(e)])
      )
    ),
    Fi,
    Mr(Dr)
  );
}
function Ba(t, e) {
  return oe(
    Ut(t.getAttribute(e)),
    Gs(parseFloat),
    Us((r) => isNaN(r) ? va : _a(r)),
    qs
  );
}
var Lr = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function Xa(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default") ? t.default : t;
}
var za = "Expected a function", ss = 0 / 0, Ya = "[object Symbol]", Fa = /^\s+|\s+$/g, $a = /^[-+]0x[0-9a-f]+$/i, Wa = /^0b[01]+$/i, Ha = /^0o[0-7]+$/i, Va = parseInt, Ga = typeof Lr == "object" && Lr && Lr.Object === Object && Lr, Ua = typeof self == "object" && self && self.Object === Object && self, qa = Ga || Ua || Function("return this")(), Qa = Object.prototype, ja = Qa.toString, Ka = Math.max, Za = Math.min, Mi = function() {
  return qa.Date.now();
};
function Ja(t, e, r) {
  var n, i, s, a, l, c, p = 0, g = !1, y = !1, h = !0;
  if (typeof t != "function")
    throw new TypeError(za);
  e = ls(e) || 0, Wi(r) && (g = !!r.leading, y = "maxWait" in r, s = y ? Ka(ls(r.maxWait) || 0, e) : s, h = "trailing" in r ? !!r.trailing : h);
  function o(k) {
    var E = n, I = i;
    return n = i = void 0, p = k, a = t.apply(I, E), a;
  }
  function w(k) {
    return p = k, l = setTimeout(P, e), g ? o(k) : a;
  }
  function M(k) {
    var E = k - c, I = k - p, me = e - E;
    return y ? Za(me, s - I) : me;
  }
  function $(k) {
    var E = k - c, I = k - p;
    return c === void 0 || E >= e || E < 0 || y && I >= s;
  }
  function P() {
    var k = Mi();
    if ($(k))
      return he(k);
    l = setTimeout(P, M(k));
  }
  function he(k) {
    return l = void 0, h && n ? o(k) : (n = i = void 0, a);
  }
  function U() {
    l !== void 0 && clearTimeout(l), p = 0, n = c = i = l = void 0;
  }
  function X() {
    return l === void 0 ? a : he(Mi());
  }
  function D() {
    var k = Mi(), E = $(k);
    if (n = arguments, i = this, c = k, E) {
      if (l === void 0)
        return w(c);
      if (y)
        return l = setTimeout(P, e), o(c);
    }
    return l === void 0 && (l = setTimeout(P, e)), a;
  }
  return D.cancel = U, D.flush = X, D;
}
function Wi(t) {
  var e = typeof t;
  return !!t && (e == "object" || e == "function");
}
function eu(t) {
  return !!t && typeof t == "object";
}
function tu(t) {
  return typeof t == "symbol" || eu(t) && ja.call(t) == Ya;
}
function ls(t) {
  if (typeof t == "number")
    return t;
  if (tu(t))
    return ss;
  if (Wi(t)) {
    var e = typeof t.valueOf == "function" ? t.valueOf() : t;
    t = Wi(e) ? e + "" : e;
  }
  if (typeof t != "string")
    return t === 0 ? t : +t;
  t = t.replace(Fa, "");
  var r = Wa.test(t);
  return r || Ha.test(t) ? Va(t.slice(2), r ? 2 : 8) : $a.test(t) ? ss : +t;
}
var nu = Ja;
const ru = /* @__PURE__ */ Xa(nu), ol = class {
  constructor(t, e = {}) {
    this.meta = {}, this.subscriptions = [], this.reset = ru(
      () => {
        var r;
        (r = this.cleanup) == null || r.call(this, this.context), requestAnimationFrame(() => this.createAndSetCleanup());
      },
      ol.resetDebounceTime,
      { leading: !0 }
    ), this.destroy = () => {
      var r, n;
      (r = this.cleanup) == null || r.call(this, this.context), this.cleanup = void 0, this.create = void 0, this.mediaQueryList = void 0, this.motionResizeObserver = void 0;
      for (const i of Object.keys(this.meta))
        delete this.meta[i];
      for (; this.subscriptions.length; )
        (n = this.subscriptions.pop()) == null || n.unsubscribe();
    }, this.observeMedia(De(e.watchMedia)), this.observeResize(De(e.shouldResetOnResize)), this.create = () => {
      var i;
      return this.context = F.context(Hl), [
        De(e.enable) ?? !0,
        ((i = this.mediaQueryList) == null ? void 0 : i.matches) ?? !0
      ].every(Boolean) ? t(this, this.context) : void 0;
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
  static applyDeltaRatio(t) {
    return t * F.ticker.deltaRatio(this.referenceFramerate);
  }
  createAndSetCleanup() {
    var e;
    const t = (e = this.create) == null ? void 0 : e.call(this, this, this.context);
    t instanceof Promise ? t.then((r) => this.cleanup = r ?? void 0) : this.cleanup = t ?? void 0;
  }
  observeMedia(t) {
    t && (this.mediaQueryList = matchMedia(t), this.subscriptions.push(
      si(this.mediaQueryList, "change").subscribe(() => this.reset())
    ));
  }
  observeResize(t) {
    t && (this.motionResizeObserver = new iu(t), this.subscriptions.push(
      this.motionResizeObserver.observable.pipe(Xs(100)).subscribe(() => this.reset())
    ));
  }
};
let Ar = ol;
Ar.resetDebounceTime = 100;
Ar.referenceFramerate = 60;
class iu {
  constructor(e) {
    const [r, n] = [e].flat();
    this.target = typeof r == "string" ? document.querySelector(r) : r, this.axis = n, this.target === window ? this.observable = new So((i) => {
      const s = () => this.handleWindowResize(i);
      return window.addEventListener("resize", s, { passive: !0 }), () => window.removeEventListener("resize", s);
    }) : this.observable = new So((i) => {
      const s = new ResizeObserver(
        (a) => this.handleElementResize(a, i)
      );
      return this.target && s.observe(this.target), () => s.disconnect();
    });
  }
  handleWindowResize(e) {
    this.emit(e, window.innerWidth, window.innerHeight);
  }
  handleElementResize(e, r) {
    const n = e.find((a) => a.target === this.target);
    if (!n)
      return;
    const { inlineSize: i, blockSize: s } = n.borderBoxSize[0];
    this.emit(r, i, s);
  }
  emit(e, r, n) {
    const i = r !== this.inlineSize, s = n !== this.blockSize, a = this.inlineSize == null || this.blockSize == null;
    if (this.inlineSize = r, this.blockSize = n, !a) {
      if (this.axis === "horizontal" && i || this.axis === "vertical" && s)
        return e.next();
      !this.axis && (i || s) && e.next();
    }
  }
}
function xi(t, e = {}) {
  const r = oe(e, De, Rr(ge(Ut, De))), n = Ra(), i = el(hr), s = new Vl(t);
  s.subscribe(() => {
    var h;
    i.getValue()(!1), i.setValue(
      oe(
        [r.enable ?? !0, ((h = r.mediaQueryList) == null ? void 0 : h.matches) ?? !0],
        Lt(),
        uo(Boolean),
        Lt(),
        Or(
          (o) => o ?? !0,
          () => t() ?? hr,
          () => hr
        )
      )
    );
  });
  const a = (h) => (o) => oe(
    o.pipe(Gl((h == null ? void 0 : h.skip) ?? 0), Xs((h == null ? void 0 : h.debounce) ?? 300)).subscribe(
      ge(
        Lt(`run effect from subscription: ${h == null ? void 0 : h.name}`),
        () => s.next(t)
      )
    ),
    Lt()
  ), l = oe(
    Ys(1, r.observeElementResize),
    Fi,
    xt(nl),
    Mr(Dr),
    Fs(
      su("Observing the <body> for resizes may cause chain reactions.")
    )
  ), c = oe(
    l,
    Vn(ta, "No elements to observe."),
    it(n),
    it(
      ge(
        a({
          debounce: r.debounceTime,
          skip: 1,
          name: "element resize"
        }),
        Lt()
      )
    ),
    sn(Ti)
  ), p = oe(
    r.observeWindowResize,
    Vn(Boolean, "Window resize observing disabled."),
    it(ou),
    it(
      ge(
        a({ debounce: r.debounceTime, name: "window resize" }),
        Lt()
      )
    ),
    sn(Ti)
  ), g = oe(
    r.mediaQueryList,
    Vn((h) => !!h, "Media query observing disabled."),
    it(Na),
    it(
      ge(
        a({ debounce: r.debounceTime, name: "media query change" }),
        Lt()
      )
    ),
    sn(Ti)
  );
  function y() {
    on(c, (h) => h.unsubscribe()), on(p, (h) => h.unsubscribe()), on(g, (h) => h.unsubscribe()), i.getValue()(!0);
  }
  return y;
}
const ou = tl();
function su(t) {
  return (e) => oe(
    mi(e.tagName === "BODY", () => `Warning: ${t}`, Js),
    Ut,
    gi(Nr())
  );
}
function ln(t, e) {
  return { x: t, y: e };
}
function Qr(t, e) {
  return {
    ...t,
    nx: t.x / e.x,
    ny: t.y / e.y
  };
}
class sl extends Ar {
  constructor() {
    super(
      (e) => {
        e.meta.observable = si(window, "mousemove"), e.subscriptions.push(
          e.meta.observable.subscribe((r) => {
            this.clientX = r.clientX, this.clientY = r.clientY, this.normalX = F.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = F.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
          })
        ), e.subscriptions.push(
          si(window, "resize").subscribe(() => {
            this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight;
          })
        ), e.meta.label = "Pointer";
      },
      { watchMedia: "(pointer: fine)" }
    ), this.viewWidth = window.innerWidth, this.viewHeight = window.innerHeight, this.clientX = this.viewWidth / 2, this.clientY = this.viewHeight / 2, this.normalX = 0.5, this.normalY = 0.5;
  }
  /**
   * Returns the singleton instance of the Pointer class.
   * If the instance does not exist, it is created.
   */
  static get instance() {
    return this._instance ?? (this._instance = new sl());
  }
  /**
   * Returns the observable for mouse events.
   */
  get observable() {
    return this.meta.observable;
  }
}
const lu = Yt(() => {
  const t = oe(as(), is), e = oe(as(), os), r = oe(us(), is), n = oe(us(), os), i = au().pipe(To(po));
  return uu().pipe(To(cu)).subscribe(
    ge(
      es(
        (a, l) => oe(
          r(a),
          Ut,
          Gs((c) => Qr(l, c)),
          gi((c) => e(a, c))
        )
      )
    )
  ), i.subscribe(ge(es(n))), {
    get client() {
      return t("client");
    },
    get page() {
      return t("page");
    },
    get screen() {
      return t("screen");
    }
  };
}), mc = lu, au = tl(), uu = Oa(), as = Zs(
  ge(po, (t) => [
    ["client", Qr(ln(0, 0), t.client)],
    ["page", Qr(ln(0, 0), t.page)],
    ["screen", Qr(ln(0, 0), t.screen)]
  ])
), us = Zs(ge(po, Sa));
function cu(t) {
  return {
    client: ln(t.clientX, t.clientY),
    page: ln(t.pageX, t.pageY),
    screen: ln(t.screenX, t.screenY)
  };
}
function po() {
  const t = Ca(), e = _i(), r = Pa();
  return {
    client: ln(e().innerWidth, e().innerHeight),
    page: ln(t().scrollWidth, t().scrollHeight),
    screen: ln(r().width, r().height)
  };
}
class _c {
  // Constant derived from response, damping and speed, used in calculations
  constructor(e = 1, r = 1, n = 0, i = 0) {
    this.k1 = r / (Math.PI * e), this.k2 = 1 / (2 * Math.PI * e * (2 * Math.PI * e)), this.k3 = n * r / (2 * Math.PI * e), this.xp = i, this.y = i, this.yd = 0;
  }
  /**
   * Calculates and applies the next position of the object based on the provided step and value.
   * @param step The step size used to calculate the next position. Typically, this is the delta time.
   * @param x The next value or target of the motion
   * @param xd Optional parameter to provide the velocity
   * @returns The updated position of the object
   */
  update(e, r, n) {
    n === void 0 && (n = (r - this.xp) / e, this.xp = r);
    const i = Math.max(
      this.k2,
      e * e / 2 + e * this.k1 / 2,
      e * this.k1
    );
    return this.y = this.y + e * this.yd, this.yd = this.yd + e * (r + this.k3 * n - this.y - this.k1 * this.yd) / i, this.y;
  }
}
function fu(t = 1, e = 1, r = 0, n = 0) {
  const i = e / (Math.PI * t), s = 1 / (2 * Math.PI * t * (2 * Math.PI * t)), a = r * e / (2 * Math.PI * t);
  let l = n, c = n, p = 0;
  function g(y, h) {
    const o = (h - l) / y, w = Math.max(s, y * y / 2 + y * i / 2, y * i);
    return l = h, c = c + y * p, p = p + y * (h + a * o - c - i * p) / w, c;
  }
  return Object.freeze({ update: g });
}
const vc = fu;
function cs(t, e) {
  for (var r = 0; r < e.length; r++) {
    var n = e[r];
    n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(t, n.key, n);
  }
}
function du(t, e, r) {
  return e && cs(t.prototype, e), r && cs(t, r), t;
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
var tt, Hi, vt, pn, hn, Gn, ll, Sn, gr, al, en, Rt, ul, cl = function() {
  return tt || typeof window < "u" && (tt = window.gsap) && tt.registerPlugin && tt;
}, fl = 1, Wn = [], ne = [], Gt = [], mr = Date.now, Vi = function(e, r) {
  return r;
}, pu = function() {
  var e = gr.core, r = e.bridge || {}, n = e._scrollers, i = e._proxies;
  n.push.apply(n, ne), i.push.apply(i, Gt), ne = n, Gt = i, Vi = function(a, l) {
    return r[a](l);
  };
}, _n = function(e, r) {
  return ~Gt.indexOf(e) && Gt[Gt.indexOf(e) + 1][r];
}, _r = function(e) {
  return !!~al.indexOf(e);
}, ft = function(e, r, n, i, s) {
  return e.addEventListener(r, n, {
    passive: !i,
    capture: !!s
  });
}, st = function(e, r, n, i) {
  return e.removeEventListener(r, n, !!i);
}, Ir = "scrollLeft", Br = "scrollTop", Gi = function() {
  return en && en.isPressed || ne.cache++;
}, li = function(e, r) {
  var n = function i(s) {
    if (s || s === 0) {
      fl && (vt.history.scrollRestoration = "manual");
      var a = en && en.isPressed;
      s = i.v = Math.round(s) || (en && en.iOS ? 1 : 0), e(s), i.cacheID = ne.cache, a && Vi("ss", s);
    } else
      (r || ne.cache !== i.cacheID || Vi("ref")) && (i.cacheID = ne.cache, i.v = e());
    return i.v + i.offset;
  };
  return n.offset = 0, e && n;
}, ut = {
  s: Ir,
  p: "left",
  p2: "Left",
  os: "right",
  os2: "Right",
  d: "width",
  d2: "Width",
  a: "x",
  sc: li(function(t) {
    return arguments.length ? vt.scrollTo(t, Ge.sc()) : vt.pageXOffset || pn[Ir] || hn[Ir] || Gn[Ir] || 0;
  })
}, Ge = {
  s: Br,
  p: "top",
  p2: "Top",
  os: "bottom",
  os2: "Bottom",
  d: "height",
  d2: "Height",
  a: "y",
  op: ut,
  sc: li(function(t) {
    return arguments.length ? vt.scrollTo(ut.sc(), t) : vt.pageYOffset || pn[Br] || hn[Br] || Gn[Br] || 0;
  })
}, dt = function(e) {
  return tt.utils.toArray(e)[0] || (typeof e == "string" && tt.config().nullTargetWarn !== !1 ? console.warn("Element not found:", e) : null);
}, vn = function(e, r) {
  var n = r.s, i = r.sc;
  _r(e) && (e = pn.scrollingElement || hn);
  var s = ne.indexOf(e), a = i === Ge.sc ? 1 : 2;
  !~s && (s = ne.push(e) - 1), ne[s + a] || e.addEventListener("scroll", Gi);
  var l = ne[s + a], c = l || (ne[s + a] = li(_n(e, n), !0) || (_r(e) ? i : li(function(p) {
    return arguments.length ? e[n] = p : e[n];
  })));
  return c.target = e, l || (c.smooth = tt.getProperty(e, "scrollBehavior") === "smooth"), c;
}, Ui = function(e, r, n) {
  var i = e, s = e, a = mr(), l = a, c = r || 50, p = Math.max(500, c * 3), g = function(w, M) {
    var $ = mr();
    M || $ - a > c ? (s = i, i = w, l = a, a = $) : n ? i += w : i = s + (w - s) / ($ - l) * (a - l);
  }, y = function() {
    s = i = n ? 0 : i, l = a = 0;
  }, h = function(w) {
    var M = l, $ = s, P = mr();
    return (w || w === 0) && w !== i && g(w), a === l || P - l > p ? 0 : (i + (n ? $ : -$)) / ((n ? P : a) - M) * 1e3;
  };
  return {
    update: g,
    reset: y,
    getVelocity: h
  };
}, rr = function(e, r) {
  return r && !e._gsapAllow && e.preventDefault(), e.changedTouches ? e.changedTouches[0] : e;
}, fs = function(e) {
  var r = Math.max.apply(Math, e), n = Math.min.apply(Math, e);
  return Math.abs(r) >= Math.abs(n) ? r : n;
}, dl = function() {
  gr = tt.core.globals().ScrollTrigger, gr && gr.core && pu();
}, pl = function(e) {
  return tt = e || cl(), tt && typeof document < "u" && document.body && (vt = window, pn = document, hn = pn.documentElement, Gn = pn.body, al = [vt, pn, hn, Gn], tt.utils.clamp, ul = tt.core.context || function() {
  }, Sn = "onpointerenter" in Gn ? "pointer" : "mouse", ll = Fe.isTouch = vt.matchMedia && vt.matchMedia("(hover: none), (pointer: coarse)").matches ? 1 : "ontouchstart" in vt || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0 ? 2 : 0, Rt = Fe.eventTypes = ("ontouchstart" in hn ? "touchstart,touchmove,touchcancel,touchend" : "onpointerdown" in hn ? "pointerdown,pointermove,pointercancel,pointerup" : "mousedown,mousemove,mouseup,mouseup").split(","), setTimeout(function() {
    return fl = 0;
  }, 500), dl(), Hi = 1), Hi;
};
ut.op = Ge;
ne.cache = 0;
var Fe = /* @__PURE__ */ function() {
  function t(r) {
    this.init(r);
  }
  var e = t.prototype;
  return e.init = function(n) {
    Hi || pl(tt) || console.warn("Please gsap.registerPlugin(Observer)"), gr || dl();
    var i = n.tolerance, s = n.dragMinimum, a = n.type, l = n.target, c = n.lineHeight, p = n.debounce, g = n.preventDefault, y = n.onStop, h = n.onStopDelay, o = n.ignore, w = n.wheelSpeed, M = n.event, $ = n.onDragStart, P = n.onDragEnd, he = n.onDrag, U = n.onPress, X = n.onRelease, D = n.onRight, k = n.onLeft, E = n.onUp, I = n.onDown, me = n.onChangeX, B = n.onChangeY, O = n.onChange, R = n.onToggleX, z = n.onToggleY, ee = n.onHover, _e = n.onHoverEnd, ae = n.onMove, Y = n.ignoreCheck, xe = n.isNormalizer, Ce = n.onGestureStart, m = n.onGestureEnd, G = n.onWheel, de = n.onEnable, ve = n.onDisable, ue = n.onClick, pt = n.scrollSpeed, Z = n.capture, Pe = n.allowClicks, le = n.lockAxis, qt = n.onLockAxis;
    this.target = l = dt(l) || hn, this.vars = n, o && (o = tt.utils.toArray(o)), i = i || 1e-9, s = s || 0, w = w || 1, pt = pt || 1, a = a || "wheel,touch,pointer", p = p !== !1, c || (c = parseFloat(vt.getComputedStyle(Gn).lineHeight) || 22);
    var ke, Re, H, Ee, pe, Q, Ue, v = this, Ne = 0, ye = 0, wt = vn(l, ut), kt = vn(l, Ge), Be = wt(), qe = kt(), Ft = ~a.indexOf("touch") && !~a.indexOf("pointer") && Rt[0] === "pointerdown", Ot = _r(l), fe = l.ownerDocument || pn, Ae = [0, 0, 0], $e = [0, 0, 0], yn = 0, We = function() {
      return yn = mr();
    }, bt = function(f, d) {
      return (v.event = f) && o && ~o.indexOf(f.target) || d && Ft && f.pointerType !== "touch" || Y && Y(f, d);
    }, xn = function() {
      v._vx.reset(), v._vy.reset(), Re.pause(), y && y(v);
    }, Et = function() {
      var f = v.deltaX = fs(Ae), d = v.deltaY = fs($e), x = Math.abs(f) >= i, b = Math.abs(d) >= i;
      O && (x || b) && O(v, f, d, Ae, $e), x && (D && v.deltaX > 0 && D(v), k && v.deltaX < 0 && k(v), me && me(v), R && v.deltaX < 0 != Ne < 0 && R(v), Ne = v.deltaX, Ae[0] = Ae[1] = Ae[2] = 0), b && (I && v.deltaY > 0 && I(v), E && v.deltaY < 0 && E(v), B && B(v), z && v.deltaY < 0 != ye < 0 && z(v), ye = v.deltaY, $e[0] = $e[1] = $e[2] = 0), (Ee || H) && (ae && ae(v), H && (he(v), H = !1), Ee = !1), Q && !(Q = !1) && qt && qt(v), pe && (G(v), pe = !1), ke = 0;
    }, Qt = function(f, d, x) {
      Ae[x] += f, $e[x] += d, v._vx.update(f), v._vy.update(d), p ? ke || (ke = requestAnimationFrame(Et)) : Et();
    }, St = function(f, d) {
      le && !Ue && (v.axis = Ue = Math.abs(f) > Math.abs(d) ? "x" : "y", Q = !0), Ue !== "y" && (Ae[2] += f, v._vx.update(f, !0)), Ue !== "x" && ($e[2] += d, v._vy.update(d, !0)), p ? ke || (ke = requestAnimationFrame(Et)) : Et();
    }, ht = function(f) {
      if (!bt(f, 1)) {
        f = rr(f, g);
        var d = f.clientX, x = f.clientY, b = d - v.x, S = x - v.y, T = v.isDragging;
        v.x = d, v.y = x, (T || Math.abs(v.startX - d) >= s || Math.abs(v.startY - x) >= s) && (he && (H = !0), T || (v.isDragging = !0), St(b, S), T || $ && $(v));
      }
    }, K = v.onPress = function(_) {
      bt(_, 1) || _ && _.button || (v.axis = Ue = null, Re.pause(), v.isPressed = !0, _ = rr(_), Ne = ye = 0, v.startX = v.x = _.clientX, v.startY = v.y = _.clientY, v._vx.reset(), v._vy.reset(), ft(xe ? l : fe, Rt[1], ht, g, !0), v.deltaX = v.deltaY = 0, U && U(v));
    }, ot = v.onRelease = function(_) {
      if (!bt(_, 1)) {
        st(xe ? l : fe, Rt[1], ht, !0);
        var f = !isNaN(v.y - v.startY), d = v.isDragging && (Math.abs(v.x - v.startX) > 3 || Math.abs(v.y - v.startY) > 3), x = rr(_);
        !d && f && (v._vx.reset(), v._vy.reset(), g && Pe && tt.delayedCall(0.08, function() {
          if (mr() - yn > 300 && !_.defaultPrevented) {
            if (_.target.click)
              _.target.click();
            else if (fe.createEvent) {
              var b = fe.createEvent("MouseEvents");
              b.initMouseEvent("click", !0, !0, vt, 1, x.screenX, x.screenY, x.clientX, x.clientY, !1, !1, !1, !1, 0, null), _.target.dispatchEvent(b);
            }
          }
        })), v.isDragging = v.isGesturing = v.isPressed = !1, y && !xe && Re.restart(!0), P && d && P(v), X && X(v, d);
      }
    }, He = function(f) {
      return f.touches && f.touches.length > 1 && (v.isGesturing = !0) && Ce(f, v.isDragging);
    }, Je = function() {
      return (v.isGesturing = !1) || m(v);
    }, Se = function(f) {
      if (!bt(f)) {
        var d = wt(), x = kt();
        Qt((d - Be) * pt, (x - qe) * pt, 1), Be = d, qe = x, y && Re.restart(!0);
      }
    }, nt = function(f) {
      if (!bt(f)) {
        f = rr(f, g), G && (pe = !0);
        var d = (f.deltaMode === 1 ? c : f.deltaMode === 2 ? vt.innerHeight : 1) * w;
        Qt(f.deltaX * d, f.deltaY * d, 0), y && !xe && Re.restart(!0);
      }
    }, $t = function(f) {
      if (!bt(f)) {
        var d = f.clientX, x = f.clientY, b = d - v.x, S = x - v.y;
        v.x = d, v.y = x, Ee = !0, (b || S) && St(b, S);
      }
    }, jt = function(f) {
      v.event = f, ee(v);
    }, C = function(f) {
      v.event = f, _e(v);
    }, u = function(f) {
      return bt(f) || rr(f, g) && ue(v);
    };
    Re = v._dc = tt.delayedCall(h || 0.25, xn).pause(), v.deltaX = v.deltaY = 0, v._vx = Ui(0, 50, !0), v._vy = Ui(0, 50, !0), v.scrollX = wt, v.scrollY = kt, v.isDragging = v.isGesturing = v.isPressed = !1, ul(this), v.enable = function(_) {
      return v.isEnabled || (ft(Ot ? fe : l, "scroll", Gi), a.indexOf("scroll") >= 0 && ft(Ot ? fe : l, "scroll", Se, g, Z), a.indexOf("wheel") >= 0 && ft(l, "wheel", nt, g, Z), (a.indexOf("touch") >= 0 && ll || a.indexOf("pointer") >= 0) && (ft(l, Rt[0], K, g, Z), ft(fe, Rt[2], ot), ft(fe, Rt[3], ot), Pe && ft(l, "click", We, !1, !0), ue && ft(l, "click", u), Ce && ft(fe, "gesturestart", He), m && ft(fe, "gestureend", Je), ee && ft(l, Sn + "enter", jt), _e && ft(l, Sn + "leave", C), ae && ft(l, Sn + "move", $t)), v.isEnabled = !0, _ && _.type && K(_), de && de(v)), v;
    }, v.disable = function() {
      v.isEnabled && (Wn.filter(function(_) {
        return _ !== v && _r(_.target);
      }).length || st(Ot ? fe : l, "scroll", Gi), v.isPressed && (v._vx.reset(), v._vy.reset(), st(xe ? l : fe, Rt[1], ht, !0)), st(Ot ? fe : l, "scroll", Se, Z), st(l, "wheel", nt, Z), st(l, Rt[0], K, Z), st(fe, Rt[2], ot), st(fe, Rt[3], ot), st(l, "click", We, !0), st(l, "click", u), st(fe, "gesturestart", He), st(fe, "gestureend", Je), st(l, Sn + "enter", jt), st(l, Sn + "leave", C), st(l, Sn + "move", $t), v.isEnabled = v.isPressed = v.isDragging = !1, ve && ve(v));
    }, v.kill = v.revert = function() {
      v.disable();
      var _ = Wn.indexOf(v);
      _ >= 0 && Wn.splice(_, 1), en === v && (en = 0);
    }, Wn.push(v), xe && _r(l) && (en = v), v.enable(M);
  }, du(t, [{
    key: "velocityX",
    get: function() {
      return this._vx.getVelocity();
    }
  }, {
    key: "velocityY",
    get: function() {
      return this._vy.getVelocity();
    }
  }]), t;
}();
Fe.version = "3.11.5";
Fe.create = function(t) {
  return new Fe(t);
};
Fe.register = pl;
Fe.getAll = function() {
  return Wn.slice();
};
Fe.getById = function(t) {
  return Wn.filter(function(e) {
    return e.vars.id === t;
  })[0];
};
cl() && tt.registerPlugin(Fe);
/*!
 * ScrollTrigger 3.11.5
 * https://greensock.com
 *
 * @license Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var N, Fn, ie, Me, It, Oe, hl, ai, ui, Hn, jr, Xr, rt, wi, qi, lt, ds, ps, $n, gl, Di, ml, gt, _l, vl, yl, fn, Qi, ho, Ci, zr = 1, at = Date.now, Pi = at(), Pt = 0, sr = 0, hu = function t() {
  return sr && requestAnimationFrame(t);
}, hs = function() {
  return wi = 1;
}, gs = function() {
  return wi = 0;
}, Vt = function(e) {
  return e;
}, lr = function(e) {
  return Math.round(e * 1e5) / 1e5 || 0;
}, xl = function() {
  return typeof window < "u";
}, wl = function() {
  return N || xl() && (N = window.gsap) && N.registerPlugin && N;
}, Nn = function(e) {
  return !!~hl.indexOf(e);
}, bl = function(e) {
  return _n(e, "getBoundingClientRect") || (Nn(e) ? function() {
    return ni.width = ie.innerWidth, ni.height = ie.innerHeight, ni;
  } : function() {
    return Jt(e);
  });
}, gu = function(e, r, n) {
  var i = n.d, s = n.d2, a = n.a;
  return (a = _n(e, "getBoundingClientRect")) ? function() {
    return a()[i];
  } : function() {
    return (r ? ie["inner" + s] : e["client" + s]) || 0;
  };
}, mu = function(e, r) {
  return !r || ~Gt.indexOf(e) ? bl(e) : function() {
    return ni;
  };
}, gn = function(e, r) {
  var n = r.s, i = r.d2, s = r.d, a = r.a;
  return Math.max(0, (n = "scroll" + i) && (a = _n(e, n)) ? a() - bl(e)()[s] : Nn(e) ? (It[n] || Oe[n]) - (ie["inner" + i] || It["client" + i] || Oe["client" + i]) : e[n] - e["offset" + i]);
}, Yr = function(e, r) {
  for (var n = 0; n < $n.length; n += 3)
    (!r || ~r.indexOf($n[n + 1])) && e($n[n], $n[n + 1], $n[n + 2]);
}, At = function(e) {
  return typeof e == "string";
}, ct = function(e) {
  return typeof e == "function";
}, ar = function(e) {
  return typeof e == "number";
}, Kr = function(e) {
  return typeof e == "object";
}, ir = function(e, r, n) {
  return e && e.progress(r ? 0 : 1) && n && e.pause();
}, ki = function(e, r) {
  if (e.enabled) {
    var n = r(e);
    n && n.totalTime && (e.callbackAnimation = n);
  }
}, Bn = Math.abs, El = "left", Sl = "top", go = "right", mo = "bottom", Dn = "width", Cn = "height", vr = "Right", yr = "Left", xr = "Top", wr = "Bottom", Ie = "padding", Dt = "margin", Zn = "Width", _o = "Height", et = "px", Xt = function(e) {
  return ie.getComputedStyle(e);
}, _u = function(e) {
  var r = Xt(e).position;
  e.style.position = r === "absolute" || r === "fixed" ? r : "relative";
}, ms = function(e, r) {
  for (var n in r)
    n in e || (e[n] = r[n]);
  return e;
}, Jt = function(e, r) {
  var n = r && Xt(e)[qi] !== "matrix(1, 0, 0, 1, 0, 0)" && N.to(e, {
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
  }).progress(1), i = e.getBoundingClientRect();
  return n && n.progress(0).kill(), i;
}, ji = function(e, r) {
  var n = r.d2;
  return e["offset" + n] || e["client" + n] || 0;
}, Tl = function(e) {
  var r = [], n = e.labels, i = e.duration(), s;
  for (s in n)
    r.push(n[s] / i);
  return r;
}, vu = function(e) {
  return function(r) {
    return N.utils.snap(Tl(e), r);
  };
}, vo = function(e) {
  var r = N.utils.snap(e), n = Array.isArray(e) && e.slice(0).sort(function(i, s) {
    return i - s;
  });
  return n ? function(i, s, a) {
    a === void 0 && (a = 1e-3);
    var l;
    if (!s)
      return r(i);
    if (s > 0) {
      for (i -= a, l = 0; l < n.length; l++)
        if (n[l] >= i)
          return n[l];
      return n[l - 1];
    } else
      for (l = n.length, i += a; l--; )
        if (n[l] <= i)
          return n[l];
    return n[0];
  } : function(i, s, a) {
    a === void 0 && (a = 1e-3);
    var l = r(i);
    return !s || Math.abs(l - i) < a || l - i < 0 == s < 0 ? l : r(s < 0 ? i - e : i + e);
  };
}, yu = function(e) {
  return function(r, n) {
    return vo(Tl(e))(r, n.direction);
  };
}, Fr = function(e, r, n, i) {
  return n.split(",").forEach(function(s) {
    return e(r, s, i);
  });
}, Ze = function(e, r, n, i, s) {
  return e.addEventListener(r, n, {
    passive: !i,
    capture: !!s
  });
}, Ke = function(e, r, n, i) {
  return e.removeEventListener(r, n, !!i);
}, $r = function(e, r, n) {
  n = n && n.wheelHandler, n && (e(r, "wheel", n), e(r, "touchmove", n));
}, _s = {
  startColor: "green",
  endColor: "red",
  indent: 0,
  fontSize: "16px",
  fontWeight: "normal"
}, Wr = {
  toggleActions: "play",
  anticipatePin: 0
}, ci = {
  top: 0,
  left: 0,
  center: 0.5,
  bottom: 1,
  right: 1
}, Zr = function(e, r) {
  if (At(e)) {
    var n = e.indexOf("="), i = ~n ? +(e.charAt(n - 1) + 1) * parseFloat(e.substr(n + 1)) : 0;
    ~n && (e.indexOf("%") > n && (i *= r / 100), e = e.substr(0, n - 1)), e = i + (e in ci ? ci[e] * r : ~e.indexOf("%") ? parseFloat(e) * r / 100 : parseFloat(e) || 0);
  }
  return e;
}, Hr = function(e, r, n, i, s, a, l, c) {
  var p = s.startColor, g = s.endColor, y = s.fontSize, h = s.indent, o = s.fontWeight, w = Me.createElement("div"), M = Nn(n) || _n(n, "pinType") === "fixed", $ = e.indexOf("scroller") !== -1, P = M ? Oe : n, he = e.indexOf("start") !== -1, U = he ? p : g, X = "border-color:" + U + ";font-size:" + y + ";color:" + U + ";font-weight:" + o + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return X += "position:" + (($ || c) && M ? "fixed;" : "absolute;"), ($ || c || !M) && (X += (i === Ge ? go : mo) + ":" + (a + parseFloat(h)) + "px;"), l && (X += "box-sizing:border-box;text-align:left;width:" + l.offsetWidth + "px;"), w._isStart = he, w.setAttribute("class", "gsap-marker-" + e + (r ? " marker-" + r : "")), w.style.cssText = X, w.innerText = r || r === 0 ? e + "-" + r : e, P.children[0] ? P.insertBefore(w, P.children[0]) : P.appendChild(w), w._offset = w["offset" + i.op.d2], Jr(w, 0, i, he), w;
}, Jr = function(e, r, n, i) {
  var s = {
    display: "block"
  }, a = n[i ? "os2" : "p2"], l = n[i ? "p2" : "os2"];
  e._isFlipped = i, s[n.a + "Percent"] = i ? -100 : 0, s[n.a] = i ? "1px" : 0, s["border" + a + Zn] = 1, s["border" + l + Zn] = 0, s[n.p] = r + "px", N.set(e, s);
}, J = [], Ki = {}, Cr, vs = function() {
  return at() - Pt > 34 && (Cr || (Cr = requestAnimationFrame(an)));
}, Xn = function() {
  (!gt || !gt.isPressed || gt.startX > Oe.clientWidth) && (ne.cache++, gt ? Cr || (Cr = requestAnimationFrame(an)) : an(), Pt || Ln("scrollStart"), Pt = at());
}, Oi = function() {
  yl = ie.innerWidth, vl = ie.innerHeight;
}, ur = function() {
  ne.cache++, !rt && !ml && !Me.fullscreenElement && !Me.webkitFullscreenElement && (!_l || yl !== ie.innerWidth || Math.abs(ie.innerHeight - vl) > ie.innerHeight * 0.25) && ai.restart(!0);
}, An = {}, xu = [], Ml = function t() {
  return Ke(q, "scrollEnd", t) || Mn(!0);
}, Ln = function(e) {
  return An[e] && An[e].map(function(r) {
    return r();
  }) || xu;
}, mt = [], Dl = function(e) {
  for (var r = 0; r < mt.length; r += 5)
    (!e || mt[r + 4] && mt[r + 4].query === e) && (mt[r].style.cssText = mt[r + 1], mt[r].getBBox && mt[r].setAttribute("transform", mt[r + 2] || ""), mt[r + 3].uncache = 1);
}, yo = function(e, r) {
  var n;
  for (lt = 0; lt < J.length; lt++)
    n = J[lt], n && (!r || n._ctx === r) && (e ? n.kill(1) : n.revert(!0, !0));
  r && Dl(r), r || Ln("revert");
}, Cl = function(e, r) {
  ne.cache++, (r || !_t) && ne.forEach(function(n) {
    return ct(n) && n.cacheID++ && (n.rec = 0);
  }), At(e) && (ie.history.scrollRestoration = ho = e);
}, _t, Pn = 0, ys, wu = function() {
  if (ys !== Pn) {
    var e = ys = Pn;
    requestAnimationFrame(function() {
      return e === Pn && Mn(!0);
    });
  }
}, Mn = function(e, r) {
  if (Pt && !e) {
    Ze(q, "scrollEnd", Ml);
    return;
  }
  _t = q.isRefreshing = !0, ne.forEach(function(i) {
    return ct(i) && i.cacheID++ && (i.rec = i());
  });
  var n = Ln("refreshInit");
  gl && q.sort(), r || yo(), ne.forEach(function(i) {
    ct(i) && (i.smooth && (i.target.style.scrollBehavior = "auto"), i(0));
  }), J.slice(0).forEach(function(i) {
    return i.refresh();
  }), J.forEach(function(i, s) {
    if (i._subPinOffset && i.pin) {
      var a = i.vars.horizontal ? "offsetWidth" : "offsetHeight", l = i.pin[a];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[a] - l), i.refresh();
    }
  }), J.forEach(function(i) {
    return i.vars.end === "max" && i.setPositions(i.start, Math.max(i.start + 1, gn(i.scroller, i._dir)));
  }), n.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), ne.forEach(function(i) {
    ct(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), Cl(ho, 1), ai.pause(), Pn++, _t = 2, an(2), J.forEach(function(i) {
    return ct(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), _t = q.isRefreshing = !1, Ln("refresh");
}, Zi = 0, ei = 1, br, an = function(e) {
  if (!_t || e === 2) {
    q.isUpdating = !0, br && br.update(0);
    var r = J.length, n = at(), i = n - Pi >= 50, s = r && J[0].scroll();
    if (ei = Zi > s ? -1 : 1, _t || (Zi = s), i && (Pt && !wi && n - Pt > 200 && (Pt = 0, Ln("scrollEnd")), jr = Pi, Pi = n), ei < 0) {
      for (lt = r; lt-- > 0; )
        J[lt] && J[lt].update(0, i);
      ei = 1;
    } else
      for (lt = 0; lt < r; lt++)
        J[lt] && J[lt].update(0, i);
    q.isUpdating = !1;
  }
  Cr = 0;
}, Ji = [El, Sl, mo, go, Dt + wr, Dt + vr, Dt + xr, Dt + yr, "display", "flexShrink", "float", "zIndex", "gridColumnStart", "gridColumnEnd", "gridRowStart", "gridRowEnd", "gridArea", "justifySelf", "alignSelf", "placeSelf", "order"], ti = Ji.concat([Dn, Cn, "boxSizing", "max" + Zn, "max" + _o, "position", Dt, Ie, Ie + xr, Ie + vr, Ie + wr, Ie + yr]), bu = function(e, r, n) {
  Un(n);
  var i = e._gsap;
  if (i.spacerIsNative)
    Un(i.spacerState);
  else if (e._gsap.swappedIn) {
    var s = r.parentNode;
    s && (s.insertBefore(e, r), s.removeChild(r));
  }
  e._gsap.swappedIn = !1;
}, Ri = function(e, r, n, i) {
  if (!e._gsap.swappedIn) {
    for (var s = Ji.length, a = r.style, l = e.style, c; s--; )
      c = Ji[s], a[c] = n[c];
    a.position = n.position === "absolute" ? "absolute" : "relative", n.display === "inline" && (a.display = "inline-block"), l[mo] = l[go] = "auto", a.flexBasis = n.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Dn] = ji(e, ut) + et, a[Cn] = ji(e, Ge) + et, a[Ie] = l[Dt] = l[Sl] = l[El] = "0", Un(i), l[Dn] = l["max" + Zn] = n[Dn], l[Cn] = l["max" + _o] = n[Cn], l[Ie] = n[Ie], e.parentNode !== r && (e.parentNode.insertBefore(r, e), r.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Eu = /([A-Z])/g, Un = function(e) {
  if (e) {
    var r = e.t.style, n = e.length, i = 0, s, a;
    for ((e.t._gsap || N.core.getCache(e.t)).uncache = 1; i < n; i += 2)
      a = e[i + 1], s = e[i], a ? r[s] = a : r[s] && r.removeProperty(s.replace(Eu, "-$1").toLowerCase());
  }
}, Vr = function(e) {
  for (var r = ti.length, n = e.style, i = [], s = 0; s < r; s++)
    i.push(ti[s], n[ti[s]]);
  return i.t = e, i;
}, Su = function(e, r, n) {
  for (var i = [], s = e.length, a = n ? 8 : 0, l; a < s; a += 2)
    l = e[a], i.push(l, l in r ? r[l] : e[a + 1]);
  return i.t = e.t, i;
}, ni = {
  left: 0,
  top: 0
}, xs = function(e, r, n, i, s, a, l, c, p, g, y, h, o) {
  ct(e) && (e = e(c)), At(e) && e.substr(0, 3) === "max" && (e = h + (e.charAt(4) === "=" ? Zr("0" + e.substr(3), n) : 0));
  var w = o ? o.time() : 0, M, $, P;
  if (o && o.seek(0), ar(e))
    o && (e = N.utils.mapRange(o.scrollTrigger.start, o.scrollTrigger.end, 0, h, e)), l && Jr(l, n, i, !0);
  else {
    ct(r) && (r = r(c));
    var he = (e || "0").split(" "), U, X, D, k;
    P = dt(r) || Oe, U = Jt(P) || {}, (!U || !U.left && !U.top) && Xt(P).display === "none" && (k = P.style.display, P.style.display = "block", U = Jt(P), k ? P.style.display = k : P.style.removeProperty("display")), X = Zr(he[0], U[i.d]), D = Zr(he[1] || "0", n), e = U[i.p] - p[i.p] - g + X + s - D, l && Jr(l, D, i, n - D < 20 || l._isStart && D > 20), n -= n - D;
  }
  if (a) {
    var E = e + n, I = a._isStart;
    M = "scroll" + i.d2, Jr(a, E, i, I && E > 20 || !I && (y ? Math.max(Oe[M], It[M]) : a.parentNode[M]) <= E + 1), y && (p = Jt(l), y && (a.style[i.op.p] = p[i.op.p] - i.op.m - a._offset + et));
  }
  return o && P && (M = Jt(P), o.seek(h), $ = Jt(P), o._caScrollDist = M[i.p] - $[i.p], e = e / o._caScrollDist * h), o && o.seek(w), o ? e : Math.round(e);
}, Tu = /(webkit|moz|length|cssText|inset)/i, ws = function(e, r, n, i) {
  if (e.parentNode !== r) {
    var s = e.style, a, l;
    if (r === Oe) {
      e._stOrig = s.cssText, l = Xt(e);
      for (a in l)
        !+a && !Tu.test(a) && l[a] && typeof s[a] == "string" && a !== "0" && (s[a] = l[a]);
      s.top = n, s.left = i;
    } else
      s.cssText = e._stOrig;
    N.core.getCache(e).uncache = 1, r.appendChild(e);
  }
}, Pl = function(e, r, n) {
  var i = r, s = i;
  return function(a) {
    var l = Math.round(e());
    return l !== i && l !== s && Math.abs(l - i) > 3 && Math.abs(l - s) > 3 && (a = l, n && n()), s = i, i = a, a;
  };
}, bs = function(e, r) {
  var n = vn(e, r), i = "_scroll" + r.p2, s = function a(l, c, p, g, y) {
    var h = a.tween, o = c.onComplete, w = {};
    p = p || n();
    var M = Pl(n, p, function() {
      h.kill(), a.tween = 0;
    });
    return y = g && y || 0, g = g || l - p, h && h.kill(), c[i] = l, c.modifiers = w, w[i] = function() {
      return M(p + g * h.ratio + y * h.ratio * h.ratio);
    }, c.onUpdate = function() {
      ne.cache++, an();
    }, c.onComplete = function() {
      a.tween = 0, o && o.call(h);
    }, h = a.tween = N.to(e, c), h;
  };
  return e[i] = n, n.wheelHandler = function() {
    return s.tween && s.tween.kill() && (s.tween = 0);
  }, Ze(e, "wheel", n.wheelHandler), q.isTouch && Ze(e, "touchmove", n.wheelHandler), s;
}, q = /* @__PURE__ */ function() {
  function t(r, n) {
    Fn || t.register(N) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(r, n);
  }
  var e = t.prototype;
  return e.init = function(n, i) {
    if (this.progress = this.start = 0, this.vars && this.kill(!0, !0), !sr) {
      this.update = this.refresh = this.kill = Vt;
      return;
    }
    n = ms(At(n) || ar(n) || n.nodeType ? {
      trigger: n
    } : n, Wr);
    var s = n, a = s.onUpdate, l = s.toggleClass, c = s.id, p = s.onToggle, g = s.onRefresh, y = s.scrub, h = s.trigger, o = s.pin, w = s.pinSpacing, M = s.invalidateOnRefresh, $ = s.anticipatePin, P = s.onScrubComplete, he = s.onSnapComplete, U = s.once, X = s.snap, D = s.pinReparent, k = s.pinSpacer, E = s.containerAnimation, I = s.fastScrollEnd, me = s.preventOverlaps, B = n.horizontal || n.containerAnimation && n.horizontal !== !1 ? ut : Ge, O = !y && y !== 0, R = dt(n.scroller || ie), z = N.core.getCache(R), ee = Nn(R), _e = ("pinType" in n ? n.pinType : _n(R, "pinType") || ee && "fixed") === "fixed", ae = [n.onEnter, n.onLeave, n.onEnterBack, n.onLeaveBack], Y = O && n.toggleActions.split(" "), xe = "markers" in n ? n.markers : Wr.markers, Ce = ee ? 0 : parseFloat(Xt(R)["border" + B.p2 + Zn]) || 0, m = this, G = n.onRefreshInit && function() {
      return n.onRefreshInit(m);
    }, de = gu(R, ee, B), ve = mu(R, ee), ue = 0, pt = 0, Z = vn(R, B), Pe, le, qt, ke, Re, H, Ee, pe, Q, Ue, v, Ne, ye, wt, kt, Be, qe, Ft, Ot, fe, Ae, $e, yn, We, bt, xn, Et, Qt, St, ht, K, ot, He, Je, Se, nt, $t, jt, C;
    if (Qi(m), m._dir = B, $ *= 45, m.scroller = R, m.scroll = E ? E.time.bind(E) : Z, ke = Z(), m.vars = n, i = i || n.animation, "refreshPriority" in n && (gl = 1, n.refreshPriority === -9999 && (br = m)), z.tweenScroll = z.tweenScroll || {
      top: bs(R, Ge),
      left: bs(R, ut)
    }, m.tweenTo = Pe = z.tweenScroll[B.p], m.scrubDuration = function(d) {
      ot = ar(d) && d, ot ? K ? K.duration(d) : K = N.to(i, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: ot,
        paused: !0,
        onComplete: function() {
          return P && P(m);
        }
      }) : (K && K.progress(1).kill(), K = 0);
    }, i && (i.vars.lazy = !1, i._initted || i.vars.immediateRender !== !1 && n.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), m.animation = i.pause(), i.scrollTrigger = m, m.scrubDuration(y), K && K.resetTo && K.resetTo("totalProgress", 0), St = 0, c || (c = i.vars.id)), J.push(m), X && ((!Kr(X) || X.push) && (X = {
      snapTo: X
    }), "scrollBehavior" in Oe.style && N.set(ee ? [Oe, It] : R, {
      scrollBehavior: "auto"
    }), ne.forEach(function(d) {
      return ct(d) && d.target === (ee ? Me.scrollingElement || It : R) && (d.smooth = !1);
    }), qt = ct(X.snapTo) ? X.snapTo : X.snapTo === "labels" ? vu(i) : X.snapTo === "labelsDirectional" ? yu(i) : X.directional !== !1 ? function(d, x) {
      return vo(X.snapTo)(d, at() - pt < 500 ? 0 : x.direction);
    } : N.utils.snap(X.snapTo), He = X.duration || {
      min: 0.1,
      max: 2
    }, He = Kr(He) ? Hn(He.min, He.max) : Hn(He, He), Je = N.delayedCall(X.delay || ot / 2 || 0.1, function() {
      var d = Z(), x = at() - pt < 500, b = Pe.tween;
      if ((x || Math.abs(m.getVelocity()) < 10) && !b && !wi && ue !== d) {
        var S = (d - H) / ye, T = i && !O ? i.totalProgress() : S, A = x ? 0 : (T - ht) / (at() - jr) * 1e3 || 0, L = N.utils.clamp(-S, 1 - S, Bn(A / 2) * A / 0.185), W = S + (X.inertia === !1 ? 0 : L), j = Hn(0, 1, qt(W, m)), te = Math.round(H + j * ye), ce = X, be = ce.onStart, Te = ce.onInterrupt, re = ce.onComplete;
        if (d <= Ee && d >= H && te !== d) {
          if (b && !b._initted && b.data <= Bn(te - d))
            return;
          X.inertia === !1 && (L = j - S), Pe(te, {
            duration: He(Bn(Math.max(Bn(W - T), Bn(j - T)) * 0.185 / A / 0.05 || 0)),
            ease: X.ease || "power3",
            data: Bn(te - d),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Je.restart(!0) && Te && Te(m);
            },
            onComplete: function() {
              m.update(), ue = Z(), St = ht = i && !O ? i.totalProgress() : m.progress, he && he(m), re && re(m);
            }
          }, d, L * ye, te - d - L * ye), be && be(m, Pe.tween);
        }
      } else
        m.isActive && ue !== d && Je.restart(!0);
    }).pause()), c && (Ki[c] = m), h = m.trigger = dt(h || o), C = h && h._gsap && h._gsap.stRevert, C && (C = C(m)), o = o === !0 ? h : dt(o), At(l) && (l = {
      targets: h,
      className: l
    }), o && (w === !1 || w === Dt || (w = !w && o.parentNode && o.parentNode.style && Xt(o.parentNode).display === "flex" ? !1 : Ie), m.pin = o, le = N.core.getCache(o), le.spacer ? wt = le.pinState : (k && (k = dt(k), k && !k.nodeType && (k = k.current || k.nativeElement), le.spacerIsNative = !!k, k && (le.spacerState = Vr(k))), le.spacer = qe = k || Me.createElement("div"), qe.classList.add("pin-spacer"), c && qe.classList.add("pin-spacer-" + c), le.pinState = wt = Vr(o)), n.force3D !== !1 && N.set(o, {
      force3D: !0
    }), m.spacer = qe = le.spacer, Qt = Xt(o), yn = Qt[w + B.os2], Ot = N.getProperty(o), fe = N.quickSetter(o, B.a, et), Ri(o, qe, Qt), Be = Vr(o)), xe) {
      Ne = Kr(xe) ? ms(xe, _s) : _s, Ue = Hr("scroller-start", c, R, B, Ne, 0), v = Hr("scroller-end", c, R, B, Ne, 0, Ue), Ft = Ue["offset" + B.op.d2];
      var u = dt(_n(R, "content") || R);
      pe = this.markerStart = Hr("start", c, u, B, Ne, Ft, 0, E), Q = this.markerEnd = Hr("end", c, u, B, Ne, Ft, 0, E), E && (jt = N.quickSetter([pe, Q], B.a, et)), !_e && !(Gt.length && _n(R, "fixedMarkers") === !0) && (_u(ee ? Oe : R), N.set([Ue, v], {
        force3D: !0
      }), bt = N.quickSetter(Ue, B.a, et), Et = N.quickSetter(v, B.a, et));
    }
    if (E) {
      var _ = E.vars.onUpdate, f = E.vars.onUpdateParams;
      E.eventCallback("onUpdate", function() {
        m.update(0, 0, 1), _ && _.apply(E, f || []);
      });
    }
    m.previous = function() {
      return J[J.indexOf(m) - 1];
    }, m.next = function() {
      return J[J.indexOf(m) + 1];
    }, m.revert = function(d, x) {
      if (!x)
        return m.kill(!0);
      var b = d !== !1 || !m.enabled, S = rt;
      b !== m.isReverted && (b && (nt = Math.max(Z(), m.scroll.rec || 0), Se = m.progress, $t = i && i.progress()), pe && [pe, Q, Ue, v].forEach(function(T) {
        return T.style.display = b ? "none" : "block";
      }), b && (rt = m, m.update(b)), o && (!D || !m.isActive) && (b ? bu(o, qe, wt) : Ri(o, qe, Xt(o), We)), b || m.update(b), rt = S, m.isReverted = b);
    }, m.refresh = function(d, x) {
      if (!((rt || !m.enabled) && !x)) {
        if (o && d && Pt) {
          Ze(t, "scrollEnd", Ml);
          return;
        }
        !_t && G && G(m), rt = m, pt = at(), Pe.tween && (Pe.tween.kill(), Pe.tween = 0), K && K.pause(), M && i && i.revert({
          kill: !1
        }).invalidate(), m.isReverted || m.revert(!0, !0), m._subPinOffset = !1;
        for (var b = de(), S = ve(), T = E ? E.duration() : gn(R, B), A = ye <= 0.01, L = 0, W = 0, j = n.end, te = n.endTrigger || h, ce = n.start || (n.start === 0 || !h ? 0 : o ? "0 0" : "0 100%"), be = m.pinnedContainer = n.pinnedContainer && dt(n.pinnedContainer), Te = h && Math.max(0, J.indexOf(m)) || 0, re = Te, V, Xe, Qe, wn, ze, je, Wt, bi, Eo, tr, Ht; re--; )
          je = J[re], je.end || je.refresh(0, 1) || (rt = m), Wt = je.pin, Wt && (Wt === h || Wt === o || Wt === be) && !je.isReverted && (tr || (tr = []), tr.unshift(je), je.revert(!0, !0)), je !== J[re] && (Te--, re--);
        for (ct(ce) && (ce = ce(m)), H = xs(ce, h, b, B, Z(), pe, Ue, m, S, Ce, _e, T, E) || (o ? -1e-3 : 0), ct(j) && (j = j(m)), At(j) && !j.indexOf("+=") && (~j.indexOf(" ") ? j = (At(ce) ? ce.split(" ")[0] : "") + j : (L = Zr(j.substr(2), b), j = At(ce) ? ce : (E ? N.utils.mapRange(0, E.duration(), E.scrollTrigger.start, E.scrollTrigger.end, H) : H) + L, te = h)), Ee = Math.max(H, xs(j || (te ? "100% 0" : T), te, b, B, Z() + L, Q, v, m, S, Ce, _e, T, E)) || -1e-3, ye = Ee - H || (H -= 0.01) && 1e-3, L = 0, re = Te; re--; )
          je = J[re], Wt = je.pin, Wt && je.start - je._pinPush <= H && !E && je.end > 0 && (V = je.end - je.start, (Wt === h && je.start - je._pinPush < H || Wt === be) && !ar(ce) && (L += V * (1 - je.progress)), Wt === o && (W += V));
        if (H += L, Ee += L, A && (Se = N.utils.clamp(0, 1, N.utils.normalize(H, Ee, nt))), m._pinPush = W, pe && L && (V = {}, V[B.a] = "+=" + L, be && (V[B.p] = "-=" + Z()), N.set([pe, Q], V)), o)
          V = Xt(o), wn = B === Ge, Qe = Z(), Ae = parseFloat(Ot(B.a)) + W, !T && Ee > 1 && (Ht = (ee ? Me.scrollingElement || It : R).style, Ht = {
            style: Ht,
            value: Ht["overflow" + B.a.toUpperCase()]
          }, Ht.style["overflow" + B.a.toUpperCase()] = "scroll"), Ri(o, qe, V), Be = Vr(o), Xe = Jt(o, !0), bi = _e && vn(R, wn ? ut : Ge)(), w && (We = [w + B.os2, ye + W + et], We.t = qe, re = w === Ie ? ji(o, B) + ye + W : 0, re && We.push(B.d, re + et), Un(We), be && J.forEach(function(nr) {
            nr.pin === be && nr.vars.pinSpacing !== !1 && (nr._subPinOffset = !0);
          }), _e && Z(nt)), _e && (ze = {
            top: Xe.top + (wn ? Qe - H : bi) + et,
            left: Xe.left + (wn ? bi : Qe - H) + et,
            boxSizing: "border-box",
            position: "fixed"
          }, ze[Dn] = ze["max" + Zn] = Math.ceil(Xe.width) + et, ze[Cn] = ze["max" + _o] = Math.ceil(Xe.height) + et, ze[Dt] = ze[Dt + xr] = ze[Dt + vr] = ze[Dt + wr] = ze[Dt + yr] = "0", ze[Ie] = V[Ie], ze[Ie + xr] = V[Ie + xr], ze[Ie + vr] = V[Ie + vr], ze[Ie + wr] = V[Ie + wr], ze[Ie + yr] = V[Ie + yr], kt = Su(wt, ze, D), _t && Z(0)), i ? (Eo = i._initted, Di(1), i.render(i.duration(), !0, !0), $e = Ot(B.a) - Ae + ye + W, xn = Math.abs(ye - $e) > 1, _e && xn && kt.splice(kt.length - 2, 2), i.render(0, !0, !0), Eo || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), Di(0)) : $e = ye, Ht && (Ht.value ? Ht.style["overflow" + B.a.toUpperCase()] = Ht.value : Ht.style.removeProperty("overflow-" + B.a));
        else if (h && Z() && !E)
          for (Xe = h.parentNode; Xe && Xe !== Oe; )
            Xe._pinOffset && (H -= Xe._pinOffset, Ee -= Xe._pinOffset), Xe = Xe.parentNode;
        tr && tr.forEach(function(nr) {
          return nr.revert(!1, !0);
        }), m.start = H, m.end = Ee, ke = Re = _t ? nt : Z(), !E && !_t && (ke < nt && Z(nt), m.scroll.rec = 0), m.revert(!1, !0), Je && (ue = -1, m.isActive && Z(H + ye * Se), Je.restart(!0)), rt = 0, i && O && (i._initted || $t) && i.progress() !== $t && i.progress($t, !0).render(i.time(), !0, !0), (A || Se !== m.progress || E) && (i && !O && i.totalProgress(E && H < -1e-3 && !Se ? N.utils.normalize(H, Ee, 0) : Se, !0), m.progress = (ke - H) / ye === Se ? 0 : Se), o && w && (qe._pinOffset = Math.round(m.progress * $e)), K && K.invalidate(), g && !_t && g(m);
      }
    }, m.getVelocity = function() {
      return (Z() - Re) / (at() - jr) * 1e3 || 0;
    }, m.endAnimation = function() {
      ir(m.callbackAnimation), i && (K ? K.progress(1) : i.paused() ? O || ir(i, m.direction < 0, 1) : ir(i, i.reversed()));
    }, m.labelToScroll = function(d) {
      return i && i.labels && (H || m.refresh() || H) + i.labels[d] / i.duration() * ye || 0;
    }, m.getTrailing = function(d) {
      var x = J.indexOf(m), b = m.direction > 0 ? J.slice(0, x).reverse() : J.slice(x + 1);
      return (At(d) ? b.filter(function(S) {
        return S.vars.preventOverlaps === d;
      }) : b).filter(function(S) {
        return m.direction > 0 ? S.end <= H : S.start >= Ee;
      });
    }, m.update = function(d, x, b) {
      if (!(E && !b && !d)) {
        var S = _t === !0 ? nt : m.scroll(), T = d ? 0 : (S - H) / ye, A = T < 0 ? 0 : T > 1 ? 1 : T || 0, L = m.progress, W, j, te, ce, be, Te, re, V;
        if (x && (Re = ke, ke = E ? Z() : S, X && (ht = St, St = i && !O ? i.totalProgress() : A)), $ && !A && o && !rt && !zr && Pt && H < S + (S - Re) / (at() - jr) * $ && (A = 1e-4), A !== L && m.enabled) {
          if (W = m.isActive = !!A && A < 1, j = !!L && L < 1, Te = W !== j, be = Te || !!A != !!L, m.direction = A > L ? 1 : -1, m.progress = A, be && !rt && (te = A && !L ? 0 : A === 1 ? 1 : L === 1 ? 2 : 3, O && (ce = !Te && Y[te + 1] !== "none" && Y[te + 1] || Y[te], V = i && (ce === "complete" || ce === "reset" || ce in i))), me && (Te || V) && (V || y || !i) && (ct(me) ? me(m) : m.getTrailing(me).forEach(function(ze) {
            return ze.endAnimation();
          })), O || (K && !rt && !zr ? (K._dp._time - K._start !== K._time && K.render(K._dp._time - K._start), K.resetTo ? K.resetTo("totalProgress", A, i._tTime / i._tDur) : (K.vars.totalProgress = A, K.invalidate().restart())) : i && i.totalProgress(A, !!rt)), o) {
            if (d && w && (qe.style[w + B.os2] = yn), !_e)
              fe(lr(Ae + $e * A));
            else if (be) {
              if (re = !d && A > L && Ee + 1 > S && S + 1 >= gn(R, B), D)
                if (!d && (W || re)) {
                  var Xe = Jt(o, !0), Qe = S - H;
                  ws(o, Oe, Xe.top + (B === Ge ? Qe : 0) + et, Xe.left + (B === Ge ? 0 : Qe) + et);
                } else
                  ws(o, qe);
              Un(W || re ? kt : Be), xn && A < 1 && W || fe(Ae + (A === 1 && !re ? $e : 0));
            }
          }
          X && !Pe.tween && !rt && !zr && Je.restart(!0), l && (Te || U && A && (A < 1 || !Ci)) && ui(l.targets).forEach(function(ze) {
            return ze.classList[W || U ? "add" : "remove"](l.className);
          }), a && !O && !d && a(m), be && !rt ? (O && (V && (ce === "complete" ? i.pause().totalProgress(1) : ce === "reset" ? i.restart(!0).pause() : ce === "restart" ? i.restart(!0) : i[ce]()), a && a(m)), (Te || !Ci) && (p && Te && ki(m, p), ae[te] && ki(m, ae[te]), U && (A === 1 ? m.kill(!1, 1) : ae[te] = 0), Te || (te = A === 1 ? 1 : 3, ae[te] && ki(m, ae[te]))), I && !W && Math.abs(m.getVelocity()) > (ar(I) ? I : 2500) && (ir(m.callbackAnimation), K ? K.progress(1) : ir(i, ce === "reverse" ? 1 : !A, 1))) : O && a && !rt && a(m);
        }
        if (Et) {
          var wn = E ? S / E.duration() * (E._caScrollDist || 0) : S;
          bt(wn + (Ue._isFlipped ? 1 : 0)), Et(wn);
        }
        jt && jt(-S / E.duration() * (E._caScrollDist || 0));
      }
    }, m.enable = function(d, x) {
      m.enabled || (m.enabled = !0, Ze(R, "resize", ur), Ze(ee ? Me : R, "scroll", Xn), G && Ze(t, "refreshInit", G), d !== !1 && (m.progress = Se = 0, ke = Re = ue = Z()), x !== !1 && m.refresh());
    }, m.getTween = function(d) {
      return d && Pe ? Pe.tween : K;
    }, m.setPositions = function(d, x) {
      o && (Ae += d - H, $e += x - d - ye, w === Ie && m.adjustPinSpacing(x - d - ye)), m.start = H = d, m.end = Ee = x, ye = x - d, m.update();
    }, m.adjustPinSpacing = function(d) {
      if (We && d) {
        var x = We.indexOf(B.d) + 1;
        We[x] = parseFloat(We[x]) + d + et, We[1] = parseFloat(We[1]) + d + et, Un(We);
      }
    }, m.disable = function(d, x) {
      if (m.enabled && (d !== !1 && m.revert(!0, !0), m.enabled = m.isActive = !1, x || K && K.pause(), nt = 0, le && (le.uncache = 1), G && Ke(t, "refreshInit", G), Je && (Je.pause(), Pe.tween && Pe.tween.kill() && (Pe.tween = 0)), !ee)) {
        for (var b = J.length; b--; )
          if (J[b].scroller === R && J[b] !== m)
            return;
        Ke(R, "resize", ur), Ke(R, "scroll", Xn);
      }
    }, m.kill = function(d, x) {
      m.disable(d, x), K && !x && K.kill(), c && delete Ki[c];
      var b = J.indexOf(m);
      b >= 0 && J.splice(b, 1), b === lt && ei > 0 && lt--, b = 0, J.forEach(function(S) {
        return S.scroller === m.scroller && (b = 1);
      }), b || _t || (m.scroll.rec = 0), i && (i.scrollTrigger = null, d && i.revert({
        kill: !1
      }), x || i.kill()), pe && [pe, Q, Ue, v].forEach(function(S) {
        return S.parentNode && S.parentNode.removeChild(S);
      }), br === m && (br = 0), o && (le && (le.uncache = 1), b = 0, J.forEach(function(S) {
        return S.pin === o && b++;
      }), b || (le.spacer = 0)), n.onKill && n.onKill(m);
    }, m.enable(!1, !1), C && C(m), !i || !i.add || ye ? m.refresh() : N.delayedCall(0.01, function() {
      return H || Ee || m.refresh();
    }) && (ye = 0.01) && (H = Ee = 0), o && wu();
  }, t.register = function(n) {
    return Fn || (N = n || wl(), xl() && window.document && t.enable(), Fn = sr), Fn;
  }, t.defaults = function(n) {
    if (n)
      for (var i in n)
        Wr[i] = n[i];
    return Wr;
  }, t.disable = function(n, i) {
    sr = 0, J.forEach(function(a) {
      return a[i ? "kill" : "disable"](n);
    }), Ke(ie, "wheel", Xn), Ke(Me, "scroll", Xn), clearInterval(Xr), Ke(Me, "touchcancel", Vt), Ke(Oe, "touchstart", Vt), Fr(Ke, Me, "pointerdown,touchstart,mousedown", hs), Fr(Ke, Me, "pointerup,touchend,mouseup", gs), ai.kill(), Yr(Ke);
    for (var s = 0; s < ne.length; s += 3)
      $r(Ke, ne[s], ne[s + 1]), $r(Ke, ne[s], ne[s + 2]);
  }, t.enable = function() {
    if (ie = window, Me = document, It = Me.documentElement, Oe = Me.body, N && (ui = N.utils.toArray, Hn = N.utils.clamp, Qi = N.core.context || Vt, Di = N.core.suppressOverwrites || Vt, ho = ie.history.scrollRestoration || "auto", Zi = ie.pageYOffset, N.core.globals("ScrollTrigger", t), Oe)) {
      sr = 1, hu(), Fe.register(N), t.isTouch = Fe.isTouch, fn = Fe.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ze(ie, "wheel", Xn), hl = [ie, Me, It, Oe], N.matchMedia ? (t.matchMedia = function(c) {
        var p = N.matchMedia(), g;
        for (g in c)
          p.add(g, c[g]);
        return p;
      }, N.addEventListener("matchMediaInit", function() {
        return yo();
      }), N.addEventListener("matchMediaRevert", function() {
        return Dl();
      }), N.addEventListener("matchMedia", function() {
        Mn(0, 1), Ln("matchMedia");
      }), N.matchMedia("(orientation: portrait)", function() {
        return Oi(), Oi;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Oi(), Ze(Me, "scroll", Xn);
      var n = Oe.style, i = n.borderTopStyle, s = N.core.Animation.prototype, a, l;
      for (s.revert || Object.defineProperty(s, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", a = Jt(Oe), Ge.m = Math.round(a.top + Ge.sc()) || 0, ut.m = Math.round(a.left + ut.sc()) || 0, i ? n.borderTopStyle = i : n.removeProperty("border-top-style"), Xr = setInterval(vs, 250), N.delayedCall(0.5, function() {
        return zr = 0;
      }), Ze(Me, "touchcancel", Vt), Ze(Oe, "touchstart", Vt), Fr(Ze, Me, "pointerdown,touchstart,mousedown", hs), Fr(Ze, Me, "pointerup,touchend,mouseup", gs), qi = N.utils.checkPrefix("transform"), ti.push(qi), Fn = at(), ai = N.delayedCall(0.2, Mn).pause(), $n = [Me, "visibilitychange", function() {
        var c = ie.innerWidth, p = ie.innerHeight;
        Me.hidden ? (ds = c, ps = p) : (ds !== c || ps !== p) && ur();
      }, Me, "DOMContentLoaded", Mn, ie, "load", Mn, ie, "resize", ur], Yr(Ze), J.forEach(function(c) {
        return c.enable(0, 1);
      }), l = 0; l < ne.length; l += 3)
        $r(Ke, ne[l], ne[l + 1]), $r(Ke, ne[l], ne[l + 2]);
    }
  }, t.config = function(n) {
    "limitCallbacks" in n && (Ci = !!n.limitCallbacks);
    var i = n.syncInterval;
    i && clearInterval(Xr) || (Xr = i) && setInterval(vs, i), "ignoreMobileResize" in n && (_l = t.isTouch === 1 && n.ignoreMobileResize), "autoRefreshEvents" in n && (Yr(Ke) || Yr(Ze, n.autoRefreshEvents || "none"), ml = (n.autoRefreshEvents + "").indexOf("resize") === -1);
  }, t.scrollerProxy = function(n, i) {
    var s = dt(n), a = ne.indexOf(s), l = Nn(s);
    ~a && ne.splice(a, l ? 6 : 2), i && (l ? Gt.unshift(ie, i, Oe, i, It, i) : Gt.unshift(s, i));
  }, t.clearMatchMedia = function(n) {
    J.forEach(function(i) {
      return i._ctx && i._ctx.query === n && i._ctx.kill(!0, !0);
    });
  }, t.isInViewport = function(n, i, s) {
    var a = (At(n) ? dt(n) : n).getBoundingClientRect(), l = a[s ? Dn : Cn] * i || 0;
    return s ? a.right - l > 0 && a.left + l < ie.innerWidth : a.bottom - l > 0 && a.top + l < ie.innerHeight;
  }, t.positionInViewport = function(n, i, s) {
    At(n) && (n = dt(n));
    var a = n.getBoundingClientRect(), l = a[s ? Dn : Cn], c = i == null ? l / 2 : i in ci ? ci[i] * l : ~i.indexOf("%") ? parseFloat(i) * l / 100 : parseFloat(i) || 0;
    return s ? (a.left + c) / ie.innerWidth : (a.top + c) / ie.innerHeight;
  }, t.killAll = function(n) {
    if (J.slice(0).forEach(function(s) {
      return s.vars.id !== "ScrollSmoother" && s.kill();
    }), n !== !0) {
      var i = An.killAll || [];
      An = {}, i.forEach(function(s) {
        return s();
      });
    }
  }, t;
}();
q.version = "3.11.5";
q.saveStyles = function(t) {
  return t ? ui(t).forEach(function(e) {
    if (e && e.style) {
      var r = mt.indexOf(e);
      r >= 0 && mt.splice(r, 5), mt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), N.core.getCache(e), Qi());
    }
  }) : mt;
};
q.revert = function(t, e) {
  return yo(!t, e);
};
q.create = function(t, e) {
  return new q(t, e);
};
q.refresh = function(t) {
  return t ? ur() : (Fn || q.register()) && Mn(!0);
};
q.update = function(t) {
  return ++ne.cache && an(t === !0 ? 2 : 0);
};
q.clearScrollMemory = Cl;
q.maxScroll = function(t, e) {
  return gn(t, e ? ut : Ge);
};
q.getScrollFunc = function(t, e) {
  return vn(dt(t), e ? ut : Ge);
};
q.getById = function(t) {
  return Ki[t];
};
q.getAll = function() {
  return J.filter(function(t) {
    return t.vars.id !== "ScrollSmoother";
  });
};
q.isScrolling = function() {
  return !!Pt;
};
q.snapDirectional = vo;
q.addEventListener = function(t, e) {
  var r = An[t] || (An[t] = []);
  ~r.indexOf(e) || r.push(e);
};
q.removeEventListener = function(t, e) {
  var r = An[t], n = r && r.indexOf(e);
  n >= 0 && r.splice(n, 1);
};
q.batch = function(t, e) {
  var r = [], n = {}, i = e.interval || 0.016, s = e.batchMax || 1e9, a = function(p, g) {
    var y = [], h = [], o = N.delayedCall(i, function() {
      g(y, h), y = [], h = [];
    }).pause();
    return function(w) {
      y.length || o.restart(!0), y.push(w.trigger), h.push(w), s <= y.length && o.progress(1);
    };
  }, l;
  for (l in e)
    n[l] = l.substr(0, 2) === "on" && ct(e[l]) && l !== "onRefreshInit" ? a(l, e[l]) : e[l];
  return ct(s) && (s = s(), Ze(q, "refresh", function() {
    return s = e.batchMax();
  })), ui(t).forEach(function(c) {
    var p = {};
    for (l in n)
      p[l] = n[l];
    p.trigger = c, r.push(q.create(p));
  }), r;
};
var Es = function(e, r, n, i) {
  return r > i ? e(i) : r < 0 && e(0), n > i ? (i - r) / (n - r) : n < 0 ? r / (r - n) : 1;
}, Ni = function t(e, r) {
  r === !0 ? e.style.removeProperty("touch-action") : e.style.touchAction = r === !0 ? "auto" : r ? "pan-" + r + (Fe.isTouch ? " pinch-zoom" : "") : "none", e === It && t(Oe, r);
}, Gr = {
  auto: 1,
  scroll: 1
}, Mu = function(e) {
  var r = e.event, n = e.target, i = e.axis, s = (r.changedTouches ? r.changedTouches[0] : r).target, a = s._gsap || N.core.getCache(s), l = at(), c;
  if (!a._isScrollT || l - a._isScrollT > 2e3) {
    for (; s && s !== Oe && (s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth || !(Gr[(c = Xt(s)).overflowY] || Gr[c.overflowX])); )
      s = s.parentNode;
    a._isScroll = s && s !== n && !Nn(s) && (Gr[(c = Xt(s)).overflowY] || Gr[c.overflowX]), a._isScrollT = l;
  }
  (a._isScroll || i === "x") && (r.stopPropagation(), r._gsapAllow = !0);
}, kl = function(e, r, n, i) {
  return Fe.create({
    target: e,
    capture: !0,
    debounce: !1,
    lockAxis: !0,
    type: r,
    onWheel: i = i && Mu,
    onPress: i,
    onDrag: i,
    onScroll: i,
    onEnable: function() {
      return n && Ze(Me, Fe.eventTypes[0], Ts, !1, !0);
    },
    onDisable: function() {
      return Ke(Me, Fe.eventTypes[0], Ts, !0);
    }
  });
}, Du = /(input|label|select|textarea)/i, Ss, Ts = function(e) {
  var r = Du.test(e.target.tagName);
  (r || Ss) && (e._gsapAllow = !0, Ss = r);
}, Cu = function(e) {
  Kr(e) || (e = {}), e.preventDefault = e.isNormalizer = e.allowClicks = !0, e.type || (e.type = "wheel,touch"), e.debounce = !!e.debounce, e.id = e.id || "normalizer";
  var r = e, n = r.normalizeScrollX, i = r.momentum, s = r.allowNestedScroll, a = r.onRelease, l, c, p = dt(e.target) || It, g = N.core.globals().ScrollSmoother, y = g && g.get(), h = fn && (e.content && dt(e.content) || y && e.content !== !1 && !y.smooth() && y.content()), o = vn(p, Ge), w = vn(p, ut), M = 1, $ = (Fe.isTouch && ie.visualViewport ? ie.visualViewport.scale * ie.visualViewport.width : ie.outerWidth) / ie.innerWidth, P = 0, he = ct(i) ? function() {
    return i(l);
  } : function() {
    return i || 2.8;
  }, U, X, D = kl(p, e.type, !0, s), k = function() {
    return X = !1;
  }, E = Vt, I = Vt, me = function() {
    c = gn(p, Ge), I = Hn(fn ? 1 : 0, c), n && (E = Hn(0, gn(p, ut))), U = Pn;
  }, B = function() {
    h._gsap.y = lr(parseFloat(h._gsap.y) + o.offset) + "px", h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(h._gsap.y) + ", 0, 1)", o.offset = o.cacheID = 0;
  }, O = function() {
    if (X) {
      requestAnimationFrame(k);
      var xe = lr(l.deltaY / 2), Ce = I(o.v - xe);
      if (h && Ce !== o.v + o.offset) {
        o.offset = Ce - o.v;
        var m = lr((parseFloat(h && h._gsap.y) || 0) - o.offset);
        h.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + m + ", 0, 1)", h._gsap.y = m + "px", o.cacheID = ne.cache, an();
      }
      return !0;
    }
    o.offset && B(), X = !0;
  }, R, z, ee, _e, ae = function() {
    me(), R.isActive() && R.vars.scrollY > c && (o() > c ? R.progress(1) && o(c) : R.resetTo("scrollY", c));
  };
  return h && N.set(h, {
    y: "+=0"
  }), e.ignoreCheck = function(Y) {
    return fn && Y.type === "touchmove" && O() || M > 1.05 && Y.type !== "touchstart" || l.isGesturing || Y.touches && Y.touches.length > 1;
  }, e.onPress = function() {
    X = !1;
    var Y = M;
    M = lr((ie.visualViewport && ie.visualViewport.scale || 1) / $), R.pause(), Y !== M && Ni(p, M > 1.01 ? !0 : n ? !1 : "x"), z = w(), ee = o(), me(), U = Pn;
  }, e.onRelease = e.onGestureStart = function(Y, xe) {
    if (o.offset && B(), !xe)
      _e.restart(!0);
    else {
      ne.cache++;
      var Ce = he(), m, G;
      n && (m = w(), G = m + Ce * 0.05 * -Y.velocityX / 0.227, Ce *= Es(w, m, G, gn(p, ut)), R.vars.scrollX = E(G)), m = o(), G = m + Ce * 0.05 * -Y.velocityY / 0.227, Ce *= Es(o, m, G, gn(p, Ge)), R.vars.scrollY = I(G), R.invalidate().duration(Ce).play(0.01), (fn && R.vars.scrollY >= c || m >= c - 1) && N.to({}, {
        onUpdate: ae,
        duration: Ce
      });
    }
    a && a(Y);
  }, e.onWheel = function() {
    R._ts && R.pause(), at() - P > 1e3 && (U = 0, P = at());
  }, e.onChange = function(Y, xe, Ce, m, G) {
    if (Pn !== U && me(), xe && n && w(E(m[2] === xe ? z + (Y.startX - Y.x) : w() + xe - m[1])), Ce) {
      o.offset && B();
      var de = G[2] === Ce, ve = de ? ee + Y.startY - Y.y : o() + Ce - G[1], ue = I(ve);
      de && ve !== ue && (ee += ue - ve), o(ue);
    }
    (Ce || xe) && an();
  }, e.onEnable = function() {
    Ni(p, n ? !1 : "x"), q.addEventListener("refresh", ae), Ze(ie, "resize", ae), o.smooth && (o.target.style.scrollBehavior = "auto", o.smooth = w.smooth = !1), D.enable();
  }, e.onDisable = function() {
    Ni(p, !0), Ke(ie, "resize", ae), q.removeEventListener("refresh", ae), D.kill();
  }, e.lockAxis = e.lockAxis !== !1, l = new Fe(e), l.iOS = fn, fn && !o() && o(1), fn && N.ticker.add(Vt), _e = l._dc, R = N.to(l, {
    ease: "power4",
    paused: !0,
    scrollX: n ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Pl(o, o(), function() {
        return R.pause();
      })
    },
    onUpdate: an,
    onComplete: _e.vars.onComplete
  }), l;
};
q.sort = function(t) {
  return J.sort(t || function(e, r) {
    return (e.vars.refreshPriority || 0) * -1e6 + e.start - (r.start + (r.vars.refreshPriority || 0) * -1e6);
  });
};
q.observe = function(t) {
  return new Fe(t);
};
q.normalizeScroll = function(t) {
  if (typeof t > "u")
    return gt;
  if (t === !0 && gt)
    return gt.enable();
  if (t === !1)
    return gt && gt.kill();
  var e = t instanceof Fe ? t : Cu(t);
  return gt && gt.target === e.target && gt.kill(), Nn(e.target) && (gt = e), e;
};
q.core = {
  // smaller file size way to leverage in ScrollSmoother and Observer
  _getVelocityProp: Ui,
  _inputObserver: kl,
  _scrollers: ne,
  _proxies: Gt,
  bridge: {
    // when normalizeScroll sets the scroll position (ss = setScroll)
    ss: function() {
      Pt || Ln("scrollStart"), Pt = at();
    },
    // a way to get the _refreshing value in Observer
    ref: function() {
      return rt;
    }
  }
};
wl() && N.registerPlugin(q);
/*!
 * matrix 3.11.5
 * https://greensock.com
 *
 * Copyright 2008-2023, GreenSock. All rights reserved.
 * Subject to the terms at https://greensock.com/standard-license or for
 * Club GreenSock members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/
var tn, kn, xo, qn, cr, ri, fi, Er, Ct = "transform", eo = Ct + "Origin", Ol, Rl = function(e) {
  var r = e.ownerDocument || e;
  for (!(Ct in e.style) && ("msTransform" in e.style) && (Ct = "msTransform", eo = Ct + "Origin"); r.parentNode && (r = r.parentNode); )
    ;
  if (kn = window, fi = new In(), r) {
    tn = r, xo = r.documentElement, qn = r.body, Er = tn.createElementNS("http://www.w3.org/2000/svg", "g"), Er.style.transform = "none";
    var n = r.createElement("div"), i = r.createElement("div");
    qn.appendChild(n), n.appendChild(i), n.style.position = "static", n.style[Ct] = "translate3d(0,0,1px)", Ol = i.offsetParent !== n, qn.removeChild(n);
  }
  return r;
}, Pu = function(e) {
  for (var r, n; e && e !== qn; )
    n = e._gsap, n && n.uncache && n.get(e, "x"), n && !n.scaleX && !n.scaleY && n.renderTransform && (n.scaleX = n.scaleY = 1e-4, n.renderTransform(1, n), r ? r.push(n) : r = [n]), e = e.parentNode;
  return r;
}, Nl = [], Al = [], ku = function() {
  return kn.pageYOffset || tn.scrollTop || xo.scrollTop || qn.scrollTop || 0;
}, Ou = function() {
  return kn.pageXOffset || tn.scrollLeft || xo.scrollLeft || qn.scrollLeft || 0;
}, wo = function(e) {
  return e.ownerSVGElement || ((e.tagName + "").toLowerCase() === "svg" ? e : null);
}, Ru = function t(e) {
  if (kn.getComputedStyle(e).position === "fixed")
    return !0;
  if (e = e.parentNode, e && e.nodeType === 1)
    return t(e);
}, Ai = function t(e, r) {
  if (e.parentNode && (tn || Rl(e))) {
    var n = wo(e), i = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", s = n ? r ? "rect" : "g" : "div", a = r !== 2 ? 0 : 100, l = r === 3 ? 100 : 0, c = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", p = tn.createElementNS ? tn.createElementNS(i.replace(/^https/, "http"), s) : tn.createElement(s);
    return r && (n ? (ri || (ri = t(e)), p.setAttribute("width", 0.01), p.setAttribute("height", 0.01), p.setAttribute("transform", "translate(" + a + "," + l + ")"), ri.appendChild(p)) : (cr || (cr = t(e), cr.style.cssText = c), p.style.cssText = c + "width:0.1px;height:0.1px;top:" + l + "px;left:" + a + "px", cr.appendChild(p))), p;
  }
  throw "Need document and parent.";
}, Nu = function(e) {
  for (var r = new In(), n = 0; n < e.numberOfItems; n++)
    r.multiply(e.getItem(n).matrix);
  return r;
}, Au = function(e) {
  var r = e.getCTM(), n;
  return r || (n = e.style[Ct], e.style[Ct] = "none", e.appendChild(Er), r = Er.getCTM(), e.removeChild(Er), n ? e.style[Ct] = n : e.style.removeProperty(Ct.replace(/([A-Z])/g, "-$1").toLowerCase())), r || fi.clone();
}, Lu = function(e, r) {
  var n = wo(e), i = e === n, s = n ? Nl : Al, a = e.parentNode, l, c, p, g, y, h;
  if (e === kn)
    return e;
  if (s.length || s.push(Ai(e, 1), Ai(e, 2), Ai(e, 3)), l = n ? ri : cr, n)
    i ? (p = Au(e), g = -p.e / p.a, y = -p.f / p.d, c = fi) : e.getBBox ? (p = e.getBBox(), c = e.transform ? e.transform.baseVal : {}, c = c.numberOfItems ? c.numberOfItems > 1 ? Nu(c) : c.getItem(0).matrix : fi, g = c.a * p.x + c.c * p.y, y = c.b * p.x + c.d * p.y) : (c = new In(), g = y = 0), r && e.tagName.toLowerCase() === "g" && (g = y = 0), (i ? n : a).appendChild(l), l.setAttribute("transform", "matrix(" + c.a + "," + c.b + "," + c.c + "," + c.d + "," + (c.e + g) + "," + (c.f + y) + ")");
  else {
    if (g = y = 0, Ol)
      for (c = e.offsetParent, p = e; p && (p = p.parentNode) && p !== c && p.parentNode; )
        (kn.getComputedStyle(p)[Ct] + "").length > 4 && (g = p.offsetLeft, y = p.offsetTop, p = 0);
    if (h = kn.getComputedStyle(e), h.position !== "absolute" && h.position !== "fixed")
      for (c = e.offsetParent; a && a !== c; )
        g += a.scrollLeft || 0, y += a.scrollTop || 0, a = a.parentNode;
    p = l.style, p.top = e.offsetTop - y + "px", p.left = e.offsetLeft - g + "px", p[Ct] = h[Ct], p[eo] = h[eo], p.position = h.position === "fixed" ? "fixed" : "absolute", e.parentNode.appendChild(l);
  }
  return l;
}, Li = function(e, r, n, i, s, a, l) {
  return e.a = r, e.b = n, e.c = i, e.d = s, e.e = a, e.f = l, e;
}, In = /* @__PURE__ */ function() {
  function t(r, n, i, s, a, l) {
    r === void 0 && (r = 1), n === void 0 && (n = 0), i === void 0 && (i = 0), s === void 0 && (s = 1), a === void 0 && (a = 0), l === void 0 && (l = 0), Li(this, r, n, i, s, a, l);
  }
  var e = t.prototype;
  return e.inverse = function() {
    var n = this.a, i = this.b, s = this.c, a = this.d, l = this.e, c = this.f, p = n * a - i * s || 1e-10;
    return Li(this, a / p, -i / p, -s / p, n / p, (s * c - a * l) / p, -(n * c - i * l) / p);
  }, e.multiply = function(n) {
    var i = this.a, s = this.b, a = this.c, l = this.d, c = this.e, p = this.f, g = n.a, y = n.c, h = n.b, o = n.d, w = n.e, M = n.f;
    return Li(this, g * i + h * a, g * s + h * l, y * i + o * a, y * s + o * l, c + w * i + M * a, p + w * s + M * l);
  }, e.clone = function() {
    return new t(this.a, this.b, this.c, this.d, this.e, this.f);
  }, e.equals = function(n) {
    var i = this.a, s = this.b, a = this.c, l = this.d, c = this.e, p = this.f;
    return i === n.a && s === n.b && a === n.c && l === n.d && c === n.e && p === n.f;
  }, e.apply = function(n, i) {
    i === void 0 && (i = {});
    var s = n.x, a = n.y, l = this.a, c = this.b, p = this.c, g = this.d, y = this.e, h = this.f;
    return i.x = s * l + a * p + y || 0, i.y = s * c + a * g + h || 0, i;
  }, t;
}();
function Tn(t, e, r, n) {
  if (!t || !t.parentNode || (tn || Rl(t)).documentElement === t)
    return new In();
  var i = Pu(t), s = wo(t), a = s ? Nl : Al, l = Lu(t, r), c = a[0].getBoundingClientRect(), p = a[1].getBoundingClientRect(), g = a[2].getBoundingClientRect(), y = l.parentNode, h = !n && Ru(t), o = new In((p.left - c.left) / 100, (p.top - c.top) / 100, (g.left - c.left) / 100, (g.top - c.top) / 100, c.left + (h ? 0 : Ou()), c.top + (h ? 0 : ku()));
  if (y.removeChild(l), i)
    for (c = i.length; c--; )
      p = i[c], p.scaleX = p.scaleY = 0, p.renderTransform(1, p);
  return e ? o.inverse() : o;
}
function Ms(t) {
  if (t === void 0)
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  return t;
}
function Iu(t, e) {
  t.prototype = Object.create(e.prototype), t.prototype.constructor = t, t.__proto__ = e;
}
var se, we, yt, zt, nn, Ii, Zt, to, fr, mn, Ll, no, Pr, bo, dr, Nt, pr, ii, Il, ro, di = 0, Bl = function() {
  return typeof window < "u";
}, Xl = function() {
  return se || Bl() && (se = window.gsap) && se.registerPlugin && se;
}, dn = function(e) {
  return typeof e == "function";
}, Sr = function(e) {
  return typeof e == "object";
}, Bt = function(e) {
  return typeof e > "u";
}, oi = function() {
  return !1;
}, Tr = "transform", io = "transformOrigin", un = function(e) {
  return Math.round(e * 1e4) / 1e4;
}, or = Array.isArray, Ur = function(e, r) {
  var n = yt.createElementNS ? yt.createElementNS((r || "http://www.w3.org/1999/xhtml").replace(/^https/, "http"), e) : yt.createElement(e);
  return n.style ? n : yt.createElement(e);
}, Ds = 180 / Math.PI, bn = 1e20, Bu = new In(), cn = Date.now || function() {
  return (/* @__PURE__ */ new Date()).getTime();
}, On = [], Qn = {}, Xu = 0, zu = /^(?:a|input|textarea|button|select)$/i, Cs = 0, zn = {}, Kt = {}, zl = function(e, r) {
  var n = {}, i;
  for (i in e)
    n[i] = r ? e[i] * r : e[i];
  return n;
}, Yu = function(e, r) {
  for (var n in r)
    n in e || (e[n] = r[n]);
  return e;
}, Ps = function t(e, r) {
  for (var n = e.length, i; n--; )
    r ? e[n].style.touchAction = r : e[n].style.removeProperty("touch-action"), i = e[n].children, i && i.length && t(i, r);
}, Yl = function() {
  return On.forEach(function(e) {
    return e();
  });
}, Fu = function(e) {
  On.push(e), On.length === 1 && se.ticker.add(Yl);
}, ks = function() {
  return !On.length && se.ticker.remove(Yl);
}, Os = function(e) {
  for (var r = On.length; r--; )
    On[r] === e && On.splice(r, 1);
  se.to(ks, {
    overwrite: !0,
    delay: 15,
    duration: 0,
    onComplete: ks,
    data: "_draggable"
  });
}, $u = function(e, r) {
  for (var n in r)
    n in e || (e[n] = r[n]);
  return e;
}, Ve = function(e, r, n, i) {
  if (e.addEventListener) {
    var s = Pr[r];
    i = i || (Ll ? {
      passive: !1
    } : null), e.addEventListener(s || r, n, i), s && r !== s && e.addEventListener(r, n, i);
  }
}, Ye = function(e, r, n, i) {
  if (e.removeEventListener) {
    var s = Pr[r];
    e.removeEventListener(s || r, n, i), s && r !== s && e.removeEventListener(r, n, i);
  }
}, Tt = function(e) {
  e.preventDefault && e.preventDefault(), e.preventManipulation && e.preventManipulation();
}, Wu = function(e, r) {
  for (var n = e.length; n--; )
    if (e[n].identifier === r)
      return !0;
}, Hu = function t(e) {
  bo = e.touches && di < e.touches.length, Ye(e.target, "touchend", t);
}, Rs = function(e) {
  bo = e.touches && di < e.touches.length, Ve(e.target, "touchend", Hu);
}, jn = function(e) {
  return we.pageYOffset || e.scrollTop || e.documentElement.scrollTop || e.body.scrollTop || 0;
}, Kn = function(e) {
  return we.pageXOffset || e.scrollLeft || e.documentElement.scrollLeft || e.body.scrollLeft || 0;
}, Ns = function t(e, r) {
  Ve(e, "scroll", r), Jn(e.parentNode) || t(e.parentNode, r);
}, As = function t(e, r) {
  Ye(e, "scroll", r), Jn(e.parentNode) || t(e.parentNode, r);
}, Jn = function(e) {
  return !e || e === zt || e.nodeType === 9 || e === yt.body || e === we || !e.nodeType || !e.parentNode;
}, Ls = function(e, r) {
  var n = r === "x" ? "Width" : "Height", i = "scroll" + n, s = "client" + n;
  return Math.max(0, Jn(e) ? Math.max(zt[i], nn[i]) - (we["inner" + n] || zt[s] || nn[s]) : e[i] - e[s]);
}, Bi = function t(e, r) {
  var n = Ls(e, "x"), i = Ls(e, "y");
  Jn(e) ? e = Kt : t(e.parentNode, r), e._gsMaxScrollX = n, e._gsMaxScrollY = i, r || (e._gsScrollX = e.scrollLeft || 0, e._gsScrollY = e.scrollTop || 0);
}, Xi = function(e, r, n) {
  var i = e.style;
  i && (Bt(i[r]) && (r = fr(r, e) || r), n == null ? i.removeProperty && i.removeProperty(r.replace(/([A-Z])/g, "-$1").toLowerCase()) : i[r] = n);
}, kr = function(e) {
  return we.getComputedStyle(e instanceof Element ? e : e.host || (e.parentNode || {}).host || e);
}, En = {}, Yn = function(e) {
  if (e === we)
    return En.left = En.top = 0, En.width = En.right = zt.clientWidth || e.innerWidth || nn.clientWidth || 0, En.height = En.bottom = (e.innerHeight || 0) - 20 < zt.clientHeight ? zt.clientHeight : e.innerHeight || nn.clientHeight || 0, En;
  var r = e.ownerDocument || yt, n = Bt(e.pageX) ? !e.nodeType && !Bt(e.left) && !Bt(e.top) ? e : mn(e)[0].getBoundingClientRect() : {
    left: e.pageX - Kn(r),
    top: e.pageY - jn(r),
    right: e.pageX - Kn(r) + 1,
    bottom: e.pageY - jn(r) + 1
  };
  return Bt(n.right) && !Bt(n.width) ? (n.right = n.left + n.width, n.bottom = n.top + n.height) : Bt(n.width) && (n = {
    width: n.right - n.left,
    height: n.bottom - n.top,
    right: n.right,
    left: n.left,
    bottom: n.bottom,
    top: n.top
  }), n;
}, Le = function(e, r, n) {
  var i = e.vars, s = i[n], a = e._listeners[r], l;
  return dn(s) && (l = s.apply(i.callbackScope || e, i[n + "Params"] || [e.pointerEvent])), a && e.dispatchEvent(r) === !1 && (l = !1), l;
}, Is = function(e, r) {
  var n = mn(e)[0], i, s, a;
  return !n.nodeType && n !== we ? Bt(e.left) ? (s = e.min || e.minX || e.minRotation || 0, i = e.min || e.minY || 0, {
    left: s,
    top: i,
    width: (e.max || e.maxX || e.maxRotation || 0) - s,
    height: (e.max || e.maxY || 0) - i
  }) : (a = {
    x: 0,
    y: 0
  }, {
    left: e.left - a.x,
    top: e.top - a.y,
    width: e.width,
    height: e.height
  }) : Vu(n, r);
}, Mt = {}, Vu = function(e, r) {
  r = mn(r)[0];
  var n = e.getBBox && e.ownerSVGElement, i = e.ownerDocument || yt, s, a, l, c, p, g, y, h, o, w, M, $, P;
  if (e === we)
    l = jn(i), s = Kn(i), a = s + (i.documentElement.clientWidth || e.innerWidth || i.body.clientWidth || 0), c = l + ((e.innerHeight || 0) - 20 < i.documentElement.clientHeight ? i.documentElement.clientHeight : e.innerHeight || i.body.clientHeight || 0);
  else {
    if (r === we || Bt(r))
      return e.getBoundingClientRect();
    s = l = 0, n ? (w = e.getBBox(), M = w.width, $ = w.height) : (e.viewBox && (w = e.viewBox.baseVal) && (s = w.x || 0, l = w.y || 0, M = w.width, $ = w.height), M || (P = kr(e), w = P.boxSizing === "border-box", M = (parseFloat(P.width) || e.clientWidth || 0) + (w ? 0 : parseFloat(P.borderLeftWidth) + parseFloat(P.borderRightWidth)), $ = (parseFloat(P.height) || e.clientHeight || 0) + (w ? 0 : parseFloat(P.borderTopWidth) + parseFloat(P.borderBottomWidth)))), a = M, c = $;
  }
  return e === r ? {
    left: s,
    top: l,
    width: a - s,
    height: c - l
  } : (p = Tn(r, !0).multiply(Tn(e)), g = p.apply({
    x: s,
    y: l
  }), y = p.apply({
    x: a,
    y: l
  }), h = p.apply({
    x: a,
    y: c
  }), o = p.apply({
    x: s,
    y: c
  }), s = Math.min(g.x, y.x, h.x, o.x), l = Math.min(g.y, y.y, h.y, o.y), {
    left: s,
    top: l,
    width: Math.max(g.x, y.x, h.x, o.x) - s,
    height: Math.max(g.y, y.y, h.y, o.y) - l
  });
}, zi = function(e, r, n, i, s, a) {
  var l = {}, c, p, g;
  if (r)
    if (s !== 1 && r instanceof Array) {
      if (l.end = c = [], g = r.length, Sr(r[0]))
        for (p = 0; p < g; p++)
          c[p] = zl(r[p], s);
      else
        for (p = 0; p < g; p++)
          c[p] = r[p] * s;
      n += 1.1, i -= 1.1;
    } else
      dn(r) ? l.end = function(y) {
        var h = r.call(e, y), o, w;
        if (s !== 1)
          if (Sr(h)) {
            o = {};
            for (w in h)
              o[w] = h[w] * s;
            h = o;
          } else
            h *= s;
        return h;
      } : l.end = r;
  return (n || n === 0) && (l.max = n), (i || i === 0) && (l.min = i), a && (l.velocity = 0), l;
}, Gu = function t(e) {
  var r;
  return !e || !e.getAttribute || e === nn ? !1 : (r = e.getAttribute("data-clickable")) === "true" || r !== "false" && (e.onclick || zu.test(e.nodeName + "") || e.getAttribute("contentEditable") === "true") ? !0 : t(e.parentNode);
}, qr = function(e, r) {
  for (var n = e.length, i; n--; )
    i = e[n], i.ondragstart = i.onselectstart = r ? null : oi, se.set(i, {
      lazy: !0,
      userSelect: r ? "text" : "none"
    });
}, Uu = function t(e) {
  if (kr(e).position === "fixed")
    return !0;
  if (e = e.parentNode, e && e.nodeType === 1)
    return t(e);
}, Fl, oo, qu = function(e, r) {
  e = se.utils.toArray(e)[0], r = r || {};
  var n = document.createElement("div"), i = n.style, s = e.firstChild, a = 0, l = 0, c = e.scrollTop, p = e.scrollLeft, g = e.scrollWidth, y = e.scrollHeight, h = 0, o = 0, w = 0, M, $, P, he, U, X;
  Fl && r.force3D !== !1 ? (U = "translate3d(", X = "px,0px)") : Tr && (U = "translate(", X = "px)"), this.scrollTop = function(D, k) {
    if (!arguments.length)
      return -this.top();
    this.top(-D, k);
  }, this.scrollLeft = function(D, k) {
    if (!arguments.length)
      return -this.left();
    this.left(-D, k);
  }, this.left = function(D, k) {
    if (!arguments.length)
      return -(e.scrollLeft + l);
    var E = e.scrollLeft - p, I = l;
    if ((E > 2 || E < -2) && !k) {
      p = e.scrollLeft, se.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-p), r.onKill && r.onKill();
      return;
    }
    D = -D, D < 0 ? (l = D - 0.5 | 0, D = 0) : D > o ? (l = D - o | 0, D = o) : l = 0, (l || I) && (this._skip || (i[Tr] = U + -l + "px," + -a + X), l + h >= 0 && (i.paddingRight = l + h + "px")), e.scrollLeft = D | 0, p = e.scrollLeft;
  }, this.top = function(D, k) {
    if (!arguments.length)
      return -(e.scrollTop + a);
    var E = e.scrollTop - c, I = a;
    if ((E > 2 || E < -2) && !k) {
      c = e.scrollTop, se.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-c), r.onKill && r.onKill();
      return;
    }
    D = -D, D < 0 ? (a = D - 0.5 | 0, D = 0) : D > w ? (a = D - w | 0, D = w) : a = 0, (a || I) && (this._skip || (i[Tr] = U + -l + "px," + -a + X)), e.scrollTop = D | 0, c = e.scrollTop;
  }, this.maxScrollTop = function() {
    return w;
  }, this.maxScrollLeft = function() {
    return o;
  }, this.disable = function() {
    for (s = n.firstChild; s; )
      he = s.nextSibling, e.appendChild(s), s = he;
    e === n.parentNode && e.removeChild(n);
  }, this.enable = function() {
    if (s = e.firstChild, s !== n) {
      for (; s; )
        he = s.nextSibling, n.appendChild(s), s = he;
      e.appendChild(n), this.calibrate();
    }
  }, this.calibrate = function(D) {
    var k = e.clientWidth === M, E, I, me;
    c = e.scrollTop, p = e.scrollLeft, !(k && e.clientHeight === $ && n.offsetHeight === P && g === e.scrollWidth && y === e.scrollHeight && !D) && ((a || l) && (I = this.left(), me = this.top(), this.left(-e.scrollLeft), this.top(-e.scrollTop)), E = kr(e), (!k || D) && (i.display = "block", i.width = "auto", i.paddingRight = "0px", h = Math.max(0, e.scrollWidth - e.clientWidth), h && (h += parseFloat(E.paddingLeft) + (oo ? parseFloat(E.paddingRight) : 0))), i.display = "inline-block", i.position = "relative", i.overflow = "visible", i.verticalAlign = "top", i.boxSizing = "content-box", i.width = "100%", i.paddingRight = h + "px", oo && (i.paddingBottom = E.paddingBottom), M = e.clientWidth, $ = e.clientHeight, g = e.scrollWidth, y = e.scrollHeight, o = e.scrollWidth - M, w = e.scrollHeight - $, P = n.offsetHeight, i.display = "block", (I || me) && (this.left(I), this.top(me)));
  }, this.content = n, this.element = e, this._skip = !1, this.enable();
}, Yi = function(e) {
  if (Bl() && document.body) {
    var r = window && window.navigator;
    we = window, yt = document, zt = yt.documentElement, nn = yt.body, Ii = Ur("div"), ii = !!window.PointerEvent, Zt = Ur("div"), Zt.style.cssText = "visibility:hidden;height:1px;top:-1px;pointer-events:none;position:relative;clear:both;cursor:grab", pr = Zt.style.cursor === "grab" ? "grab" : "move", dr = r && r.userAgent.toLowerCase().indexOf("android") !== -1, no = "ontouchstart" in zt && "orientation" in we || r && (r.MaxTouchPoints > 0 || r.msMaxTouchPoints > 0), oo = function() {
      var n = Ur("div"), i = Ur("div"), s = i.style, a = nn, l;
      return s.display = "inline-block", s.position = "relative", n.style.cssText = "width:90px;height:40px;padding:10px;overflow:auto;visibility:hidden", n.appendChild(i), a.appendChild(n), l = i.offsetHeight + 18 > n.scrollHeight, a.removeChild(n), l;
    }(), Pr = function(n) {
      for (var i = n.split(","), s = ("onpointerdown" in Ii ? "pointerdown,pointermove,pointerup,pointercancel" : "onmspointerdown" in Ii ? "MSPointerDown,MSPointerMove,MSPointerUp,MSPointerCancel" : n).split(","), a = {}, l = 4; --l > -1; )
        a[i[l]] = s[l], a[s[l]] = i[l];
      try {
        zt.addEventListener("test", null, Object.defineProperty({}, "passive", {
          get: function() {
            Ll = 1;
          }
        }));
      } catch {
      }
      return a;
    }("touchstart,touchmove,touchend,touchcancel"), Ve(yt, "touchcancel", oi), Ve(we, "touchmove", oi), nn && nn.addEventListener("touchstart", oi), Ve(yt, "contextmenu", function() {
      for (var n in Qn)
        Qn[n].isPressed && Qn[n].endDrag();
    }), se = to = Xl();
  }
  se ? (Nt = se.plugins.inertia, Il = se.core.context || function() {
  }, fr = se.utils.checkPrefix, Tr = fr(Tr), io = fr(io), mn = se.utils.toArray, ro = se.core.getStyleSaver, Fl = !!fr("perspective")) : e && console.warn("Please gsap.registerPlugin(Draggable)");
}, Qu = /* @__PURE__ */ function() {
  function t(r) {
    this._listeners = {}, this.target = r || this;
  }
  var e = t.prototype;
  return e.addEventListener = function(n, i) {
    var s = this._listeners[n] || (this._listeners[n] = []);
    ~s.indexOf(i) || s.push(i);
  }, e.removeEventListener = function(n, i) {
    var s = this._listeners[n], a = s && s.indexOf(i);
    a >= 0 && s.splice(a, 1);
  }, e.dispatchEvent = function(n) {
    var i = this, s;
    return (this._listeners[n] || []).forEach(function(a) {
      return a.call(i, {
        type: n,
        target: i.target
      }) === !1 && (s = !1);
    }), s;
  }, t;
}(), er = /* @__PURE__ */ function(t) {
  Iu(e, t);
  function e(r, n) {
    var i;
    i = t.call(this) || this, to || Yi(1), r = mn(r)[0], i.styles = ro && ro(r, "transform,left,top"), Nt || (Nt = se.plugins.inertia), i.vars = n = zl(n || {}), i.target = r, i.x = i.y = i.rotation = 0, i.dragResistance = parseFloat(n.dragResistance) || 0, i.edgeResistance = isNaN(n.edgeResistance) ? 1 : parseFloat(n.edgeResistance) || 0, i.lockAxis = n.lockAxis, i.autoScroll = n.autoScroll || 0, i.lockedAxis = null, i.allowEventDefault = !!n.allowEventDefault, se.getProperty(r, "x");
    var s = (n.type || "x,y").toLowerCase(), a = ~s.indexOf("x") || ~s.indexOf("y"), l = s.indexOf("rotation") !== -1, c = l ? "rotation" : a ? "x" : "left", p = a ? "y" : "top", g = !!(~s.indexOf("x") || ~s.indexOf("left") || s === "scroll"), y = !!(~s.indexOf("y") || ~s.indexOf("top") || s === "scroll"), h = n.minimumMovement || 2, o = Ms(i), w = mn(n.trigger || n.handle || r), M = {}, $ = 0, P = !1, he = n.autoScrollMarginTop || 40, U = n.autoScrollMarginRight || 40, X = n.autoScrollMarginBottom || 40, D = n.autoScrollMarginLeft || 40, k = n.clickableTest || Gu, E = 0, I = r._gsap || se.core.getCache(r), me = Uu(r), B = function(u, _) {
      return parseFloat(I.get(r, u, _));
    }, O = r.ownerDocument || yt, R, z, ee, _e, ae, Y, xe, Ce, m, G, de, ve, ue, pt, Z, Pe, le, qt, ke, Re, H, Ee, pe, Q, Ue, v, Ne, ye, wt, kt, Be, qe, Ft, Ot = function(u) {
      return Tt(u), u.stopImmediatePropagation && u.stopImmediatePropagation(), !1;
    }, fe = function C(u) {
      if (o.autoScroll && o.isDragging && (P || le)) {
        var _ = r, f = o.autoScroll * 15, d, x, b, S, T, A, L, W;
        for (P = !1, Kt.scrollTop = we.pageYOffset != null ? we.pageYOffset : O.documentElement.scrollTop != null ? O.documentElement.scrollTop : O.body.scrollTop, Kt.scrollLeft = we.pageXOffset != null ? we.pageXOffset : O.documentElement.scrollLeft != null ? O.documentElement.scrollLeft : O.body.scrollLeft, S = o.pointerX - Kt.scrollLeft, T = o.pointerY - Kt.scrollTop; _ && !x; )
          x = Jn(_.parentNode), d = x ? Kt : _.parentNode, b = x ? {
            bottom: Math.max(zt.clientHeight, we.innerHeight || 0),
            right: Math.max(zt.clientWidth, we.innerWidth || 0),
            left: 0,
            top: 0
          } : d.getBoundingClientRect(), A = L = 0, y && (W = d._gsMaxScrollY - d.scrollTop, W < 0 ? L = W : T > b.bottom - X && W ? (P = !0, L = Math.min(W, f * (1 - Math.max(0, b.bottom - T) / X) | 0)) : T < b.top + he && d.scrollTop && (P = !0, L = -Math.min(d.scrollTop, f * (1 - Math.max(0, T - b.top) / he) | 0)), L && (d.scrollTop += L)), g && (W = d._gsMaxScrollX - d.scrollLeft, W < 0 ? A = W : S > b.right - U && W ? (P = !0, A = Math.min(W, f * (1 - Math.max(0, b.right - S) / U) | 0)) : S < b.left + D && d.scrollLeft && (P = !0, A = -Math.min(d.scrollLeft, f * (1 - Math.max(0, S - b.left) / D) | 0)), A && (d.scrollLeft += A)), x && (A || L) && (we.scrollTo(d.scrollLeft, d.scrollTop), Je(o.pointerX + A, o.pointerY + L)), _ = d;
      }
      if (le) {
        var j = o.x, te = o.y;
        l ? (o.deltaX = j - parseFloat(I.rotation), o.rotation = j, I.rotation = j + "deg", I.renderTransform(1, I)) : z ? (y && (o.deltaY = te - z.top(), z.top(te)), g && (o.deltaX = j - z.left(), z.left(j))) : a ? (y && (o.deltaY = te - parseFloat(I.y), I.y = te + "px"), g && (o.deltaX = j - parseFloat(I.x), I.x = j + "px"), I.renderTransform(1, I)) : (y && (o.deltaY = te - parseFloat(r.style.top || 0), r.style.top = te + "px"), g && (o.deltaX = j - parseFloat(r.style.left || 0), r.style.left = j + "px")), Ce && !u && !ye && (ye = !0, Le(o, "drag", "onDrag") === !1 && (g && (o.x -= o.deltaX), y && (o.y -= o.deltaY), C(!0)), ye = !1);
      }
      le = !1;
    }, Ae = function(u, _) {
      var f = o.x, d = o.y, x, b;
      r._gsap || (I = se.core.getCache(r)), I.uncache && se.getProperty(r, "x"), a ? (o.x = parseFloat(I.x), o.y = parseFloat(I.y)) : l ? o.x = o.rotation = parseFloat(I.rotation) : z ? (o.y = z.top(), o.x = z.left()) : (o.y = parseFloat(r.style.top || (b = kr(r)) && b.top) || 0, o.x = parseFloat(r.style.left || (b || {}).left) || 0), (ke || Re || H) && !_ && (o.isDragging || o.isThrowing) && (H && (zn.x = o.x, zn.y = o.y, x = H(zn), x.x !== o.x && (o.x = x.x, le = !0), x.y !== o.y && (o.y = x.y, le = !0)), ke && (x = ke(o.x), x !== o.x && (o.x = x, l && (o.rotation = x), le = !0)), Re && (x = Re(o.y), x !== o.y && (o.y = x), le = !0)), le && fe(!0), u || (o.deltaX = o.x - f, o.deltaY = o.y - d, Le(o, "throwupdate", "onThrowUpdate"));
    }, $e = function(u, _, f, d) {
      return _ == null && (_ = -bn), f == null && (f = bn), dn(u) ? function(x) {
        var b = o.isPressed ? 1 - o.edgeResistance : 1;
        return u.call(o, (x > f ? f + (x - f) * b : x < _ ? _ + (x - _) * b : x) * d) * d;
      } : or(u) ? function(x) {
        for (var b = u.length, S = 0, T = bn, A, L; --b > -1; )
          A = u[b], L = A - x, L < 0 && (L = -L), L < T && A >= _ && A <= f && (S = b, T = L);
        return u[S];
      } : isNaN(u) ? function(x) {
        return x;
      } : function() {
        return u * d;
      };
    }, yn = function(u, _, f, d, x, b, S) {
      return b = b && b < bn ? b * b : bn, dn(u) ? function(T) {
        var A = o.isPressed ? 1 - o.edgeResistance : 1, L = T.x, W = T.y, j, te, ce;
        return T.x = L = L > f ? f + (L - f) * A : L < _ ? _ + (L - _) * A : L, T.y = W = W > x ? x + (W - x) * A : W < d ? d + (W - d) * A : W, j = u.call(o, T), j !== T && (T.x = j.x, T.y = j.y), S !== 1 && (T.x *= S, T.y *= S), b < bn && (te = T.x - L, ce = T.y - W, te * te + ce * ce > b && (T.x = L, T.y = W)), T;
      } : or(u) ? function(T) {
        for (var A = u.length, L = 0, W = bn, j, te, ce, be; --A > -1; )
          ce = u[A], j = ce.x - T.x, te = ce.y - T.y, be = j * j + te * te, be < W && (L = A, W = be);
        return W <= b ? u[L] : T;
      } : function(T) {
        return T;
      };
    }, We = function() {
      var u, _, f, d;
      xe = !1, z ? (z.calibrate(), o.minX = de = -z.maxScrollLeft(), o.minY = ue = -z.maxScrollTop(), o.maxX = G = o.maxY = ve = 0, xe = !0) : n.bounds && (u = Is(n.bounds, r.parentNode), l ? (o.minX = de = u.left, o.maxX = G = u.left + u.width, o.minY = ue = o.maxY = ve = 0) : !Bt(n.bounds.maxX) || !Bt(n.bounds.maxY) ? (u = n.bounds, o.minX = de = u.minX, o.minY = ue = u.minY, o.maxX = G = u.maxX, o.maxY = ve = u.maxY) : (_ = Is(r, r.parentNode), o.minX = de = Math.round(B(c, "px") + u.left - _.left), o.minY = ue = Math.round(B(p, "px") + u.top - _.top), o.maxX = G = Math.round(de + (u.width - _.width)), o.maxY = ve = Math.round(ue + (u.height - _.height))), de > G && (o.minX = G, o.maxX = G = de, de = o.minX), ue > ve && (o.minY = ve, o.maxY = ve = ue, ue = o.minY), l && (o.minRotation = de, o.maxRotation = G), xe = !0), n.liveSnap && (f = n.liveSnap === !0 ? n.snap || {} : n.liveSnap, d = or(f) || dn(f), l ? (ke = $e(d ? f : f.rotation, de, G, 1), Re = null) : f.points ? H = yn(d ? f : f.points, de, G, ue, ve, f.radius, z ? -1 : 1) : (g && (ke = $e(d ? f : f.x || f.left || f.scrollLeft, de, G, z ? -1 : 1)), y && (Re = $e(d ? f : f.y || f.top || f.scrollTop, ue, ve, z ? -1 : 1))));
    }, bt = function() {
      o.isThrowing = !1, Le(o, "throwcomplete", "onThrowComplete");
    }, xn = function() {
      o.isThrowing = !1;
    }, Et = function(u, _) {
      var f, d, x, b;
      u && Nt ? (u === !0 && (f = n.snap || n.liveSnap || {}, d = or(f) || dn(f), u = {
        resistance: (n.throwResistance || n.resistance || 1e3) / (l ? 10 : 1)
      }, l ? u.rotation = zi(o, d ? f : f.rotation, G, de, 1, _) : (g && (u[c] = zi(o, d ? f : f.points || f.x || f.left, G, de, z ? -1 : 1, _ || o.lockedAxis === "x")), y && (u[p] = zi(o, d ? f : f.points || f.y || f.top, ve, ue, z ? -1 : 1, _ || o.lockedAxis === "y")), (f.points || or(f) && Sr(f[0])) && (u.linkedProps = c + "," + p, u.radius = f.radius))), o.isThrowing = !0, b = isNaN(n.overshootTolerance) ? n.edgeResistance === 1 ? 0 : 1 - o.edgeResistance + 0.2 : n.overshootTolerance, u.duration || (u.duration = {
        max: Math.max(n.minDuration || 0, "maxDuration" in n ? n.maxDuration : 2),
        min: isNaN(n.minDuration) ? b === 0 || Sr(u) && u.resistance > 1e3 ? 0 : 0.5 : n.minDuration,
        overshoot: b
      }), o.tween = x = se.to(z || r, {
        inertia: u,
        data: "_draggable",
        onComplete: bt,
        onInterrupt: xn,
        onUpdate: n.fastMode ? Le : Ae,
        onUpdateParams: n.fastMode ? [o, "onthrowupdate", "onThrowUpdate"] : f && f.radius ? [!1, !0] : []
      }), n.fastMode || (z && (z._skip = !0), x.render(1e9, !0, !0), Ae(!0, !0), o.endX = o.x, o.endY = o.y, l && (o.endRotation = o.x), x.play(0), Ae(!0, !0), z && (z._skip = !1))) : xe && o.applyBounds();
    }, Qt = function(u) {
      var _ = Q, f;
      Q = Tn(r.parentNode, !0), u && o.isPressed && !Q.equals(_ || new In()) && (f = _.inverse().apply({
        x: ee,
        y: _e
      }), Q.apply(f, f), ee = f.x, _e = f.y), Q.equals(Bu) && (Q = null);
    }, St = function() {
      var u = 1 - o.edgeResistance, _ = me ? Kn(O) : 0, f = me ? jn(O) : 0, d, x, b;
      a && (I.x = B(c, "px") + "px", I.y = B(p, "px") + "px", I.renderTransform()), Qt(!1), Mt.x = o.pointerX - _, Mt.y = o.pointerY - f, Q && Q.apply(Mt, Mt), ee = Mt.x, _e = Mt.y, le && (Je(o.pointerX, o.pointerY), fe(!0)), qe = Tn(r), z ? (We(), Y = z.top(), ae = z.left()) : (ht() ? (Ae(!0, !0), We()) : o.applyBounds(), l ? (d = r.ownerSVGElement ? [I.xOrigin - r.getBBox().x, I.yOrigin - r.getBBox().y] : (kr(r)[io] || "0 0").split(" "), Pe = o.rotationOrigin = Tn(r).apply({
        x: parseFloat(d[0]) || 0,
        y: parseFloat(d[1]) || 0
      }), Ae(!0, !0), x = o.pointerX - Pe.x - _, b = Pe.y - o.pointerY + f, ae = o.x, Y = o.y = Math.atan2(b, x) * Ds) : (Y = B(p, "px"), ae = B(c, "px"))), xe && u && (ae > G ? ae = G + (ae - G) / u : ae < de && (ae = de - (de - ae) / u), l || (Y > ve ? Y = ve + (Y - ve) / u : Y < ue && (Y = ue - (ue - Y) / u))), o.startX = ae = un(ae), o.startY = Y = un(Y);
    }, ht = function() {
      return o.tween && o.tween.isActive();
    }, K = function() {
      Zt.parentNode && !ht() && !o.isDragging && Zt.parentNode.removeChild(Zt);
    }, ot = function(u, _) {
      var f;
      if (!R || o.isPressed || !u || (u.type === "mousedown" || u.type === "pointerdown") && !_ && cn() - E < 30 && Pr[o.pointerEvent.type]) {
        Be && u && R && Tt(u);
        return;
      }
      if (Ue = ht(), Ft = !1, o.pointerEvent = u, Pr[u.type] ? (pe = ~u.type.indexOf("touch") ? u.currentTarget || u.target : O, Ve(pe, "touchend", Se), Ve(pe, "touchmove", He), Ve(pe, "touchcancel", Se), Ve(O, "touchstart", Rs)) : (pe = null, Ve(O, "mousemove", He)), Ne = null, (!ii || !pe) && (Ve(O, "mouseup", Se), u && u.target && Ve(u.target, "mouseup", Se)), Ee = k.call(o, u.target) && n.dragClickables === !1 && !_, Ee) {
        Ve(u.target, "change", Se), Le(o, "pressInit", "onPressInit"), Le(o, "press", "onPress"), qr(w, !0), Be = !1;
        return;
      }
      if (v = !pe || g === y || o.vars.allowNativeTouchScrolling === !1 || o.vars.allowContextMenu && u && (u.ctrlKey || u.which > 2) ? !1 : g ? "y" : "x", Be = !v && !o.allowEventDefault, Be && (Tt(u), Ve(we, "touchforcechange", Tt)), u.changedTouches ? (u = pt = u.changedTouches[0], Z = u.identifier) : u.pointerId ? Z = u.pointerId : pt = Z = null, di++, Fu(fe), _e = o.pointerY = u.pageY, ee = o.pointerX = u.pageX, Le(o, "pressInit", "onPressInit"), (v || o.autoScroll) && Bi(r.parentNode), r.parentNode && o.autoScroll && !z && !l && r.parentNode._gsMaxScrollX && !Zt.parentNode && !r.getBBox && (Zt.style.width = r.parentNode.scrollWidth + "px", r.parentNode.appendChild(Zt)), St(), o.tween && o.tween.kill(), o.isThrowing = !1, se.killTweensOf(z || r, M, !0), z && se.killTweensOf(r, {
        scrollTo: 1
      }, !0), o.tween = o.lockedAxis = null, (n.zIndexBoost || !l && !z && n.zIndexBoost !== !1) && (r.style.zIndex = e.zIndex++), o.isPressed = !0, Ce = !!(n.onDrag || o._listeners.drag), m = !!(n.onMove || o._listeners.move), n.cursor !== !1 || n.activeCursor)
        for (f = w.length; --f > -1; )
          se.set(w[f], {
            cursor: n.activeCursor || n.cursor || (pr === "grab" ? "grabbing" : pr)
          });
      Le(o, "press", "onPress");
    }, He = function(u) {
      var _ = u, f, d, x, b, S, T;
      if (!R || bo || !o.isPressed || !u) {
        Be && u && R && Tt(u);
        return;
      }
      if (o.pointerEvent = u, f = u.changedTouches, f) {
        if (u = f[0], u !== pt && u.identifier !== Z) {
          for (b = f.length; --b > -1 && (u = f[b]).identifier !== Z && u.target !== r; )
            ;
          if (b < 0)
            return;
        }
      } else if (u.pointerId && Z && u.pointerId !== Z)
        return;
      if (pe && v && !Ne && (Mt.x = u.pageX - (me ? Kn(O) : 0), Mt.y = u.pageY - (me ? jn(O) : 0), Q && Q.apply(Mt, Mt), d = Mt.x, x = Mt.y, S = Math.abs(d - ee), T = Math.abs(x - _e), (S !== T && (S > h || T > h) || dr && v === Ne) && (Ne = S > T && g ? "x" : "y", v && Ne !== v && Ve(we, "touchforcechange", Tt), o.vars.lockAxisOnTouchScroll !== !1 && g && y && (o.lockedAxis = Ne === "x" ? "y" : "x", dn(o.vars.onLockAxis) && o.vars.onLockAxis.call(o, _)), dr && v === Ne))) {
        Se(_);
        return;
      }
      !o.allowEventDefault && (!v || Ne && v !== Ne) && _.cancelable !== !1 ? (Tt(_), Be = !0) : Be && (Be = !1), o.autoScroll && (P = !0), Je(u.pageX, u.pageY, m);
    }, Je = function(u, _, f) {
      var d = 1 - o.dragResistance, x = 1 - o.edgeResistance, b = o.pointerX, S = o.pointerY, T = Y, A = o.x, L = o.y, W = o.endX, j = o.endY, te = o.endRotation, ce = le, be, Te, re, V, Xe, Qe;
      o.pointerX = u, o.pointerY = _, me && (u -= Kn(O), _ -= jn(O)), l ? (V = Math.atan2(Pe.y - _, u - Pe.x) * Ds, Xe = o.y - V, Xe > 180 ? (Y -= 360, o.y = V) : Xe < -180 && (Y += 360, o.y = V), o.x !== ae || Math.abs(Y - V) > h ? (o.y = V, re = ae + (Y - V) * d) : re = ae) : (Q && (Qe = u * Q.a + _ * Q.c + Q.e, _ = u * Q.b + _ * Q.d + Q.f, u = Qe), Te = _ - _e, be = u - ee, Te < h && Te > -h && (Te = 0), be < h && be > -h && (be = 0), (o.lockAxis || o.lockedAxis) && (be || Te) && (Qe = o.lockedAxis, Qe || (o.lockedAxis = Qe = g && Math.abs(be) > Math.abs(Te) ? "y" : y ? "x" : null, Qe && dn(o.vars.onLockAxis) && o.vars.onLockAxis.call(o, o.pointerEvent)), Qe === "y" ? Te = 0 : Qe === "x" && (be = 0)), re = un(ae + be * d), V = un(Y + Te * d)), (ke || Re || H) && (o.x !== re || o.y !== V && !l) && (H && (zn.x = re, zn.y = V, Qe = H(zn), re = un(Qe.x), V = un(Qe.y)), ke && (re = un(ke(re))), Re && (V = un(Re(V)))), xe && (re > G ? re = G + Math.round((re - G) * x) : re < de && (re = de + Math.round((re - de) * x)), l || (V > ve ? V = Math.round(ve + (V - ve) * x) : V < ue && (V = Math.round(ue + (V - ue) * x)))), (o.x !== re || o.y !== V && !l) && (l ? (o.endRotation = o.x = o.endX = re, le = !0) : (y && (o.y = o.endY = V, le = !0), g && (o.x = o.endX = re, le = !0)), !f || Le(o, "move", "onMove") !== !1 ? !o.isDragging && o.isPressed && (o.isDragging = Ft = !0, Le(o, "dragstart", "onDragStart")) : (o.pointerX = b, o.pointerY = S, Y = T, o.x = A, o.y = L, o.endX = W, o.endY = j, o.endRotation = te, le = ce));
    }, Se = function C(u, _) {
      if (!R || !o.isPressed || u && Z != null && !_ && (u.pointerId && u.pointerId !== Z && u.target !== r || u.changedTouches && !Wu(u.changedTouches, Z))) {
        Be && u && R && Tt(u);
        return;
      }
      o.isPressed = !1;
      var f = u, d = o.isDragging, x = o.vars.allowContextMenu && u && (u.ctrlKey || u.which > 2), b = se.delayedCall(1e-3, K), S, T, A, L, W;
      if (pe ? (Ye(pe, "touchend", C), Ye(pe, "touchmove", He), Ye(pe, "touchcancel", C), Ye(O, "touchstart", Rs)) : Ye(O, "mousemove", He), Ye(we, "touchforcechange", Tt), (!ii || !pe) && (Ye(O, "mouseup", C), u && u.target && Ye(u.target, "mouseup", C)), le = !1, d && ($ = Cs = cn(), o.isDragging = !1), Os(fe), Ee && !x) {
        u && (Ye(u.target, "change", C), o.pointerEvent = f), qr(w, !1), Le(o, "release", "onRelease"), Le(o, "click", "onClick"), Ee = !1;
        return;
      }
      for (T = w.length; --T > -1; )
        Xi(w[T], "cursor", n.cursor || (n.cursor !== !1 ? pr : null));
      if (di--, u) {
        if (S = u.changedTouches, S && (u = S[0], u !== pt && u.identifier !== Z)) {
          for (T = S.length; --T > -1 && (u = S[T]).identifier !== Z && u.target !== r; )
            ;
          if (T < 0 && !_)
            return;
        }
        o.pointerEvent = f, o.pointerX = u.pageX, o.pointerY = u.pageY;
      }
      return x && f ? (Tt(f), Be = !0, Le(o, "release", "onRelease")) : f && !d ? (Be = !1, Ue && (n.snap || n.bounds) && Et(n.inertia || n.throwProps), Le(o, "release", "onRelease"), (!dr || f.type !== "touchmove") && f.type.indexOf("cancel") === -1 && (Le(o, "click", "onClick"), cn() - E < 300 && Le(o, "doubleclick", "onDoubleClick"), L = f.target || r, E = cn(), W = function() {
        E !== wt && o.enabled() && !o.isPressed && !f.defaultPrevented && (L.click ? L.click() : O.createEvent && (A = O.createEvent("MouseEvents"), A.initMouseEvent("click", !0, !0, we, 1, o.pointerEvent.screenX, o.pointerEvent.screenY, o.pointerX, o.pointerY, !1, !1, !1, !1, 0, null), L.dispatchEvent(A)));
      }, !dr && !f.defaultPrevented && se.delayedCall(0.05, W))) : (Et(n.inertia || n.throwProps), !o.allowEventDefault && f && (n.dragClickables !== !1 || !k.call(o, f.target)) && d && (!v || Ne && v === Ne) && f.cancelable !== !1 ? (Be = !0, Tt(f)) : Be = !1, Le(o, "release", "onRelease")), ht() && b.duration(o.tween.duration()), d && Le(o, "dragend", "onDragEnd"), !0;
    }, nt = function(u) {
      if (u && o.isDragging && !z) {
        var _ = u.target || r.parentNode, f = _.scrollLeft - _._gsScrollX, d = _.scrollTop - _._gsScrollY;
        (f || d) && (Q ? (ee -= f * Q.a + d * Q.c, _e -= d * Q.d + f * Q.b) : (ee -= f, _e -= d), _._gsScrollX += f, _._gsScrollY += d, Je(o.pointerX, o.pointerY));
      }
    }, $t = function(u) {
      var _ = cn(), f = _ - E < 100, d = _ - $ < 50, x = f && wt === E, b = o.pointerEvent && o.pointerEvent.defaultPrevented, S = f && kt === E, T = u.isTrusted || u.isTrusted == null && f && x;
      if ((x || d && o.vars.suppressClickOnDrag !== !1) && u.stopImmediatePropagation && u.stopImmediatePropagation(), f && !(o.pointerEvent && o.pointerEvent.defaultPrevented) && (!x || T && !S)) {
        T && x && (kt = E), wt = E;
        return;
      }
      (o.isPressed || d || f) && (!T || !u.detail || !f || b) && Tt(u), !f && !d && !Ft && (u && u.target && (o.pointerEvent = u), Le(o, "click", "onClick"));
    }, jt = function(u) {
      return Q ? {
        x: u.x * Q.a + u.y * Q.c + Q.e,
        y: u.x * Q.b + u.y * Q.d + Q.f
      } : {
        x: u.x,
        y: u.y
      };
    };
    return qt = e.get(r), qt && qt.kill(), i.startDrag = function(C, u) {
      var _, f, d, x;
      ot(C || o.pointerEvent, !0), u && !o.hitTest(C || o.pointerEvent) && (_ = Yn(C || o.pointerEvent), f = Yn(r), d = jt({
        x: _.left + _.width / 2,
        y: _.top + _.height / 2
      }), x = jt({
        x: f.left + f.width / 2,
        y: f.top + f.height / 2
      }), ee -= d.x - x.x, _e -= d.y - x.y), o.isDragging || (o.isDragging = Ft = !0, Le(o, "dragstart", "onDragStart"));
    }, i.drag = He, i.endDrag = function(C) {
      return Se(C || o.pointerEvent, !0);
    }, i.timeSinceDrag = function() {
      return o.isDragging ? 0 : (cn() - $) / 1e3;
    }, i.timeSinceClick = function() {
      return (cn() - E) / 1e3;
    }, i.hitTest = function(C, u) {
      return e.hitTest(o.target, C, u);
    }, i.getDirection = function(C, u) {
      var _ = C === "velocity" && Nt ? C : Sr(C) && !l ? "element" : "start", f, d, x, b, S, T;
      return _ === "element" && (S = Yn(o.target), T = Yn(C)), f = _ === "start" ? o.x - ae : _ === "velocity" ? Nt.getVelocity(r, c) : S.left + S.width / 2 - (T.left + T.width / 2), l ? f < 0 ? "counter-clockwise" : "clockwise" : (u = u || 2, d = _ === "start" ? o.y - Y : _ === "velocity" ? Nt.getVelocity(r, p) : S.top + S.height / 2 - (T.top + T.height / 2), x = Math.abs(f / d), b = x < 1 / u ? "" : f < 0 ? "left" : "right", x < u && (b !== "" && (b += "-"), b += d < 0 ? "up" : "down"), b);
    }, i.applyBounds = function(C, u) {
      var _, f, d, x, b, S;
      if (C && n.bounds !== C)
        return n.bounds = C, o.update(!0, u);
      if (Ae(!0), We(), xe && !ht()) {
        if (_ = o.x, f = o.y, _ > G ? _ = G : _ < de && (_ = de), f > ve ? f = ve : f < ue && (f = ue), (o.x !== _ || o.y !== f) && (d = !0, o.x = o.endX = _, l ? o.endRotation = _ : o.y = o.endY = f, le = !0, fe(!0), o.autoScroll && !o.isDragging))
          for (Bi(r.parentNode), x = r, Kt.scrollTop = we.pageYOffset != null ? we.pageYOffset : O.documentElement.scrollTop != null ? O.documentElement.scrollTop : O.body.scrollTop, Kt.scrollLeft = we.pageXOffset != null ? we.pageXOffset : O.documentElement.scrollLeft != null ? O.documentElement.scrollLeft : O.body.scrollLeft; x && !S; )
            S = Jn(x.parentNode), b = S ? Kt : x.parentNode, y && b.scrollTop > b._gsMaxScrollY && (b.scrollTop = b._gsMaxScrollY), g && b.scrollLeft > b._gsMaxScrollX && (b.scrollLeft = b._gsMaxScrollX), x = b;
        o.isThrowing && (d || o.endX > G || o.endX < de || o.endY > ve || o.endY < ue) && Et(n.inertia || n.throwProps, d);
      }
      return o;
    }, i.update = function(C, u, _) {
      if (u && o.isPressed) {
        var f = Tn(r), d = qe.apply({
          x: o.x - ae,
          y: o.y - Y
        }), x = Tn(r.parentNode, !0);
        x.apply({
          x: f.e - d.x,
          y: f.f - d.y
        }, d), o.x -= d.x - x.e, o.y -= d.y - x.f, fe(!0), St();
      }
      var b = o.x, S = o.y;
      return Qt(!u), C ? o.applyBounds() : (le && _ && fe(!0), Ae(!0)), u && (Je(o.pointerX, o.pointerY), le && fe(!0)), o.isPressed && !u && (g && Math.abs(b - o.x) > 0.01 || y && Math.abs(S - o.y) > 0.01 && !l) && St(), o.autoScroll && (Bi(r.parentNode, o.isDragging), P = o.isDragging, fe(!0), As(r, nt), Ns(r, nt)), o;
    }, i.enable = function(C) {
      var u = {
        lazy: !0
      }, _, f, d;
      if (n.cursor !== !1 && (u.cursor = n.cursor || pr), se.utils.checkPrefix("touchCallout") && (u.touchCallout = "none"), C !== "soft") {
        for (Ps(w, g === y ? "none" : n.allowNativeTouchScrolling && r.scrollHeight === r.clientHeight == (r.scrollWidth === r.clientHeight) || n.allowEventDefault ? "manipulation" : g ? "pan-y" : "pan-x"), f = w.length; --f > -1; )
          d = w[f], ii || Ve(d, "mousedown", ot), Ve(d, "touchstart", ot), Ve(d, "click", $t, !0), se.set(d, u), d.getBBox && d.ownerSVGElement && g !== y && se.set(d.ownerSVGElement, {
            touchAction: n.allowNativeTouchScrolling || n.allowEventDefault ? "manipulation" : g ? "pan-y" : "pan-x"
          }), n.allowContextMenu || Ve(d, "contextmenu", Ot);
        qr(w, !1);
      }
      return Ns(r, nt), R = !0, Nt && C !== "soft" && Nt.track(z || r, a ? "x,y" : l ? "rotation" : "top,left"), r._gsDragID = _ = "d" + Xu++, Qn[_] = o, z && (z.enable(), z.element._gsDragID = _), (n.bounds || l) && St(), n.bounds && o.applyBounds(), o;
    }, i.disable = function(C) {
      for (var u = o.isDragging, _ = w.length, f; --_ > -1; )
        Xi(w[_], "cursor", null);
      if (C !== "soft") {
        for (Ps(w, null), _ = w.length; --_ > -1; )
          f = w[_], Xi(f, "touchCallout", null), Ye(f, "mousedown", ot), Ye(f, "touchstart", ot), Ye(f, "click", $t, !0), Ye(f, "contextmenu", Ot);
        qr(w, !0), pe && (Ye(pe, "touchcancel", Se), Ye(pe, "touchend", Se), Ye(pe, "touchmove", He)), Ye(O, "mouseup", Se), Ye(O, "mousemove", He);
      }
      return As(r, nt), R = !1, Nt && C !== "soft" && Nt.untrack(z || r, a ? "x,y" : l ? "rotation" : "top,left"), z && z.disable(), Os(fe), o.isDragging = o.isPressed = Ee = !1, u && Le(o, "dragend", "onDragEnd"), o;
    }, i.enabled = function(C, u) {
      return arguments.length ? C ? o.enable(u) : o.disable(u) : R;
    }, i.kill = function() {
      return o.isThrowing = !1, o.tween && o.tween.kill(), o.disable(), se.set(w, {
        clearProps: "userSelect"
      }), delete Qn[r._gsDragID], o;
    }, i.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~s.indexOf("scroll") && (z = i.scrollProxy = new qu(r, Yu({
      onKill: function() {
        o.isPressed && Se(null);
      }
    }, n)), r.style.overflowY = y && !no ? "auto" : "hidden", r.style.overflowX = g && !no ? "auto" : "hidden", r = z.content), l ? M.rotation = 1 : (g && (M[c] = 1), y && (M[p] = 1)), I.force3D = "force3D" in n ? n.force3D : !0, Il(Ms(i)), i.enable(), i;
  }
  return e.register = function(n) {
    se = n, Yi();
  }, e.create = function(n, i) {
    return to || Yi(!0), mn(n).map(function(s) {
      return new e(s, i);
    });
  }, e.get = function(n) {
    return Qn[(mn(n)[0] || {})._gsDragID];
  }, e.timeSinceDrag = function() {
    return (cn() - Cs) / 1e3;
  }, e.hitTest = function(n, i, s) {
    if (n === i)
      return !1;
    var a = Yn(n), l = Yn(i), c = a.top, p = a.left, g = a.right, y = a.bottom, h = a.width, o = a.height, w = l.left > g || l.right < p || l.top > y || l.bottom < c, M, $, P;
    return w || !s ? !w : (P = (s + "").indexOf("%") !== -1, s = parseFloat(s) || 0, M = {
      left: Math.max(p, l.left),
      top: Math.max(c, l.top)
    }, M.width = Math.min(g, l.right) - M.left, M.height = Math.min(y, l.bottom) - M.top, M.width < 0 || M.height < 0 ? !1 : P ? (s *= 0.01, $ = M.width * M.height, $ >= h * o * s || $ >= l.width * l.height * s) : M.width > s && M.height > s);
  }, e;
}(Qu);
$u(er.prototype, {
  pointerX: 0,
  pointerY: 0,
  startX: 0,
  startY: 0,
  deltaX: 0,
  deltaY: 0,
  isDragging: !1,
  isPressed: !1
});
er.zIndex = 1e3;
er.version = "3.11.5";
Xl() && se.registerPlugin(er);
function ju(t = 100) {
  return (e) => Math.floor(e * t) / t;
}
F.registerPlugin(q);
class $l extends Ar {
  static create(e, r = {}, n = {}) {
    return new $l(e, r, n);
  }
  get target() {
    return this.meta.target;
  }
  get speed() {
    return this.meta.speed;
  }
  set speed(e) {
    this.meta.speed = e;
  }
  get velocity() {
    return this.meta.velocity;
  }
  set velocity(e) {
    this.meta.velocity = e;
  }
  get direction() {
    return this.meta.direction;
  }
  set direction(e) {
    this.meta.direction = e;
  }
  constructor(e, r = {}, n = {}) {
    super(
      (i) => {
        var R, z;
        Object.assign(i.meta, {
          speed: r.speed ?? 1,
          velocity: r.velocity ?? 0,
          direction: r.direction || "rtl",
          onCreated: r.onCreated,
          onUpdate: r.onUpdate
        }), i.meta.scrollTrigger = q.create(r.scrollTrigger ?? {});
        let s = null;
        typeof e == "string" ? s = document.querySelector(e) : e instanceof HTMLElement && (s = e);
        const a = r.createDOMContainers != null ? r.createDOMContainers : !0, l = a ? document.createElement("div") : s == null ? void 0 : s.querySelector(".owow-marquee-outer");
        l == null || l.classList.add("owow-marquee-outer");
        const c = a ? document.createElement("div") : l == null ? void 0 : l.querySelector(".owow-marquee-inner");
        if (c == null || c.classList.add("owow-marquee-inner"), !s || !l || !c)
          throw console.error({
            targetContainer: s,
            outerContainer: l,
            innerContainer: c
          }), new Error("Invalid marquee DOM structure");
        i.meta.sourceDOM = s.cloneNode(!0), i.meta.target = s, c.append(...s.childNodes), l.append(c), s == null || s.append(l), F.set(c, { display: "inline-flex" });
        const p = s.getBoundingClientRect(), g = c.getBoundingClientRect(), y = p.width + g.width, h = document.createDocumentFragment(), o = [];
        let w = g.width;
        if (!y || !w)
          return;
        for (; w <= y; ) {
          const ee = c.cloneNode(!0);
          w += g.width, o.push(ee);
        }
        h.append(...o), l.append(h);
        const M = F.context(() => {
          F.set(l, {
            x: 0,
            force3D: !0,
            width: w,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), $ = F.utils.pipe(
          (ee) => Math.floor(ee * 1e3) / 1e3,
          F.quickSetter(l, "x", "px")
        ), P = F.utils.wrap(0, -g.width), he = F.utils.normalize(0, -g.width);
        let U, X, D, k, E, I, me, B;
        const O = F.ticker.add(() => {
          var ee, _e;
          switch (B = F.ticker.deltaRatio(), X = F.utils.interpolate(
            X ?? 0,
            i.meta.scrollTrigger.getVelocity(),
            0.5 * B
          ), D = X * i.meta.velocity, i.meta.direction) {
            case "ltr":
              U = -1, D = -Math.abs(D);
              break;
            case "rtl":
              U = 1, D = Math.abs(D);
              break;
            case "scroll":
              U = i.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              U = -(i.meta.scrollTrigger.direction ?? 1), D = -D;
          }
          k = F.getProperty(l, "x"), E = i.meta.speed * -U, I = (E - D) * B, me = P(k + I), $(me), (_e = (ee = i.meta).onUpdate) == null || _e.call(ee, he(me));
        });
        return (z = (R = i.meta).onCreated) == null || z.call(R), () => {
          var ee;
          for (M.kill(!0), F.ticker.remove(O), s == null || s.replaceChildren(...i.meta.sourceDOM.childNodes); o.length; )
            (ee = o.pop()) == null || ee.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...n
      }
    );
  }
}
F.registerPlugin(q);
const { wrap: Ku, normalize: Zu, interpolate: Ju } = F.utils, ec = { display: "inline-flex" }, tc = "owow-marquee-outer", nc = "owow-marquee-inner";
function yc(t, e = {}, r = {}) {
  const n = oe(
    e,
    De,
    Ks(["onUpdate", "onCreated", "onDestroyed", "beforeCreate", "beforeDestroy"])
  ), i = oe(
    e,
    De,
    js(["onUpdate", "onCreated", "beforeCreate"]),
    Rr(ge(Ut, De)),
    pi
  ), s = Yt(() => q.create(i.scrollTriggerVars ?? {})), a = yi(t), l = ge(
    xt(lc(i.createDOM ?? !0)),
    xt(
      ge(
        it(ic),
        it(rc(i, n, s()))
      )
    ),
    Lt("create marquee instances", { config: i })
  );
  return xi(() => {
    var g;
    (g = n.beforeCreate) == null || g.call(n);
    const p = l(a);
    return () => {
      var y, h;
      (y = n.beforeDestroy) == null || y.call(n), oe(
        p,
        Lt(),
        rn(on((o) => o.revert()))
      ), (h = n.onDestroyed) == null || h.call(n);
    };
  }, De(r));
}
function rc(t, e, r) {
  const n = Yt(Ia());
  let i = 0;
  return (s) => {
    const a = (O = s.rects.innerRect.width, R = s.rects.boundingWidth) => oe(
      O > 0 && R > 0,
      Vn(Ql, new Error("Zero width")),
      it(
        ge(
          () => O <= R,
          mi(() => {
            const z = s.dom.innerContainer.cloneNode(!0);
            return i = O + s.rects.innerRect.width, n().append(z), a(i, R), n();
          }, n)
        )
      )
    ), l = oc(s.dom, t), c = F.quickSetter(s.dom.outerContainer, "x", "px"), p = t.stopOnDrag ?? !0, g = ge(ju(1e3), c), y = Ku(0, -s.rects.innerRect.width), h = Zu(0, -s.rects.innerRect.width);
    let o, w, M, $, P, he, U, X, D, k, E;
    const I = Yt(
      () => F.ticker.add(() => {
        var O;
        switch (D = (l == null ? void 0 : l.x) ?? 0, k ?? (k = D), E = ((l == null ? void 0 : l.isDragging) || (l == null ? void 0 : l.isPressed)) ?? !1, w = F.ticker.deltaRatio(), $ = Ju(
          $ ?? 0,
          r.getVelocity(),
          0.5 * w
        ), M = $ * (t.scrollVelocity || 0), t.direction || "rtl") {
          case "ltr":
            o = -1, M = -Math.abs(M);
            break;
          case "rtl":
            o = 1, M = Math.abs(M);
            break;
          case "scroll":
            o = r.direction ?? 1;
            break;
          case "scroll-reverse":
            o = -(r.direction ?? 1), M = -M;
        }
        P = F.getProperty(s.dom.outerContainer, "x"), P -= k, he = (t.speed ?? 1) * -o, U = E && p ? 0 : (he - M) * w, X = y(P + U + D), k = D, g(X), (O = e.onUpdate) == null || O.call(e, h(X));
      })
    );
    ge(
      a,
      it(La(s.dom.outerContainer)),
      on(
        (O) => F.set(O, {
          x: 0,
          force3D: !0,
          width: i,
          display: "flex",
          flexWrap: "nowrap"
        })
      ),
      I,
      () => {
        var O;
        return (O = e.onCreated) == null ? void 0 : O.call(e, { draggable: l });
      }
    )();
    function B() {
      l == null || l.kill(), F.ticker.remove(I()), s.dom.target.replaceChildren(...s.dom.targetClone.childNodes);
    }
    return Object.freeze({ revert: B });
  };
}
function ic(t) {
  return {
    dom: t,
    rects: sc(t)
  };
}
function oc(t, e) {
  const r = vi("div");
  return oe(
    Ut(e.IntertiaPlugin),
    gi((n) => F.registerPlugin(n))
  ), oe(
    e.draggable,
    Or(
      (n) => n ?? !1,
      () => (F.registerPlugin(er), er.create(r(), {
        inertia: !!e.IntertiaPlugin,
        ...e.draggableVars,
        trigger: t.outerContainer,
        type: "x"
      })[0]),
      Js
    )
  );
}
function sc({ target: t, innerContainer: e }) {
  const r = t.getBoundingClientRect(), n = e.getBoundingClientRect();
  return {
    targetRect: r,
    innerRect: n,
    boundingWidth: r.width + n.width
  };
}
function lc(t) {
  const e = Nr();
  return (r) => {
    const n = oe(
      r,
      Bs(!!t, tc),
      sn(e)
    ), i = oe(
      n,
      ua(Bs(!!t, nc)),
      sn(e)
    );
    return oe(
      [n, i],
      xt(ca),
      ([a, l]) => ma(a, l),
      Us(([a, l]) => ({
        target: r,
        outerContainer: a,
        innerContainer: l,
        targetClone: r.cloneNode(!0)
      })),
      gi(({ target: a, innerContainer: l, outerContainer: c }) => {
        zs(!!t, Boolean, () => {
          l.append(...a.childNodes), c.append(l), a.append(c);
        }), F.set(l, ec);
      }),
      hi(new Error("Invalid marquee DOM.")),
      sn(e)
    );
  };
}
function Bs(t, e) {
  return ge(
    Or(() => t, vi("div"), rl(`.${e}`)),
    hi(
      new Error(
        t ? "Could not create marquee container." : `Could not find marquee container .${e}`
      )
    ),
    on((r) => r.classList.add(e))
  );
}
class Wl extends Ar {
  constructor(e, r = {}, n = {}) {
    super(async (i, s) => {
      const a = Wl.SplitText;
      if (!a)
        throw console.error("SplitText is a GSAP member plugin. Did you forget to include it?"), new Error("SplitText missing.");
      const l = F.utils.toArray(e);
      for (const h of l)
        if (!(h instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const c = i.meta.childSplit = new a(e, {
        type: "lines",
        linesClass: "owow-split-child",
        ...De(r.childSplitVars)
      }), p = i.meta.parentSplit = new a(e, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...De(r.parentSplitVars)
      }), g = {
        y: (h, o) => {
          const w = parseFloat(getComputedStyle(o).lineHeight);
          return isNaN(w) ? F.getProperty(o, "height") : w;
        },
        ...De(r.fromVars)
      }, y = {
        y: 0,
        stagger: { each: 0.05 },
        duration: 0.8,
        ease: "power2.inOut",
        ...De(r.toVars)
      };
      return s.add(() => {
        i.meta.setup = F.set(p.lines, { overflow: "hidden" }), i.meta.tween = F.fromTo(c.lines, g, y);
      }), () => {
        c.revert(), s.kill(!0);
      };
    }, n);
  }
}
function xc(t, e, r = {}) {
  const n = oe(
    e,
    De,
    Rr(ge(Ut, De)),
    pi
  ), i = hi(
    n.SplitText,
    new Error("Missing `SplitText` GSAP member plugin.")
  ), s = ge(
    yi,
    Lt(),
    xt(
      (p) => oe(
        i,
        it((g) => ({
          childSplit: new g(p, {
            type: "lines",
            linesClass: "owow-split-child",
            ...n.childSplitVars
          }),
          parentSplit: new g(p, {
            type: "lines",
            linesClass: "owow-split-parent",
            ...n.parentSplitVars
          })
        })),
        sn(Nr())
      )
    )
  ), a = {
    y: (p, g) => {
      const y = parseFloat(getComputedStyle(g).lineHeight);
      return isNaN(y) ? F.getProperty(g, "height") : y;
    },
    ...n.fromVars
  }, l = {
    y: 0,
    stagger: { each: 0.05 },
    duration: 0.8,
    ease: "power2.inOut",
    ...n.toVars
  };
  return xi(() => {
    const p = s(t), g = F.context(() => {
      Fs(
        p,
        on(({ parentSplit: y, childSplit: h }) => {
          F.set(y.lines, { overflow: "hidden" }), F.fromTo(h.lines, a, l);
        })
      );
    });
    return () => {
      rn(
        p,
        on(({ childSplit: y }) => y.revert())
      ), g.kill(!0);
    };
  }, De(r));
}
F.registerPlugin(q);
function ac(t, e = {}, r = {}) {
  const n = oe(e, De, Ks(["updater"])), i = oe(
    e,
    De,
    js(["updater"]),
    Rr(ge(Ut, De)),
    pi
  ), s = (g) => () => g.progress, a = (g = 1) => (y) => n.updater ? n.updater(y, g) : F.utils.interpolate(100 * g, -100 * g, y), l = (g, y, h) => ge(s(g), a(h), y, hr), c = ge(
    yi,
    xt(
      uc(i.createDOM ?? !0, "owow-parallax-outer", "owow-parallax-inner")
    ),
    xt(
      it((g) => {
        const y = q.create({
          trigger: g.outer,
          start: "top bottom",
          end: "bottom top",
          ...i.scrollTriggerVars
        }), h = F.quickSetter(g.inner, "y", i.cssUnit ?? "%"), o = F.quickSetter(g.inner, "x", i.cssUnit ?? "%"), w = Ba(g.inner, "data-parallax-speed");
        return Object.freeze({
          dom: g,
          scrollTrigger: y,
          updateY: l(y, h, w ?? i.speed),
          updateX: l(y, o, w ?? i.speed),
          destroy: () => y.kill(),
          revert: () => g.outer.replaceWith(g.original)
        });
      })
    ),
    xt($i),
    Mr(Dr)
  );
  return xi(() => {
    const g = c(t), y = F.ticker.add(() => {
      rn(g, ({ updateY: h }) => {
        h();
      });
    });
    return () => {
      F.ticker.remove(y), rn(g, (h) => {
        h.revert(), h.destroy();
      });
    };
  }, De(r));
}
function uc(t, e, r) {
  const n = ge(
    vi("div"),
    lo((i) => i.classList.add(e))
  );
  return ge(
    Or(
      () => t,
      (i) => {
        const s = il(i), a = i.cloneNode(!0), l = n();
        return a.classList.add(r), l.append(a), s(l), Hs({
          inner: a,
          outer: l,
          original: i
        });
      },
      (i) => oe(
        i,
        Vn(
          cc(e, r),
          new Error("Invalid DOM structure for parallax")
        ),
        sn(Nr()),
        it(() => ({
          inner: i.firstElementChild,
          outer: i,
          original: i
        }))
      )
    )
  );
}
function cc(t, e) {
  return (r) => {
    var n;
    return uo(
      [
        r.children.length === 1,
        r.classList.contains(t),
        (n = r.firstElementChild) == null ? void 0 : n.classList.contains(e)
      ],
      Boolean
    );
  };
}
function wc(t, e = {}, r = {}) {
  const n = oe(
    e,
    De,
    Rr(ge(Ut, De)),
    pi
  ), i = n.size ?? 1.5, s = ge(
    yi,
    xt(fc(n.createDOM ?? !0, "owow-diorama-outer", "owow-diorama-inner")),
    xt(
      it(
        (l) => Object.freeze({
          dom: l,
          outerRect: l.outer.getBoundingClientRect(),
          revert: () => l.outer.replaceWith(l.original)
        })
      )
    )
  );
  return xi(() => {
    const l = s(t), c = F.context(() => {
      oe(
        xt(l, $i),
        Mr(Dr),
        rn(({ dom: g, outerRect: y }) => {
          F.set(g.outer, { height: y.height, overflow: "hidden" }), F.set(g.inner, { height: y.height * i });
        })
      );
    }), p = oe(
      xt(
        l,
        ge(
          it((g) => {
            const y = F.utils.interpolate(
              -(g.outerRect.height * i - g.outerRect.height),
              0
            );
            return ac(g.dom.inner, {
              cssUnit: "px",
              updater: y
            });
          }),
          $i
        )
      ),
      Mr(Dr)
    );
    return () => {
      c.kill(!0), rn(p, (g) => g()), rn(l, ge(on((g) => g.revert())));
    };
  }, De(r));
}
function fc(t, e, r) {
  const n = ge(
    vi("div"),
    lo((i) => i.classList.add(e))
  );
  return ge(
    Or(
      () => t,
      (i) => {
        const s = il(i), a = i.cloneNode(!0), l = n();
        return a.classList.add(r), l.append(a), l.classList.add(...i.classList), s(l), Hs({
          inner: a,
          outer: l,
          original: i
        });
      },
      (i) => oe(
        i,
        Vn(
          dc(e, r),
          new Error("Invalid DOM structure for diorama")
        ),
        sn(Nr()),
        it(() => ({
          inner: i.firstElementChild,
          outer: i,
          original: i
        }))
      )
    )
  );
}
function dc(t, e) {
  return (r) => {
    var n;
    return uo(
      [
        r.children.length === 1,
        r.classList.contains(t),
        (n = r.firstElementChild) == null ? void 0 : n.classList.contains(e)
      ],
      Boolean
    );
  };
}
export {
  gc as Ease,
  $l as Marquee,
  Ar as Motion,
  sl as Pointer,
  _c as SecondOrderDynamics,
  Wl as TextClipReveal,
  wc as createDiorama,
  yc as createMarquee,
  xi as createMotion,
  ac as createParallax,
  fu as createPhysicsBasedMotion,
  xc as createTextClipReveal,
  lu as getMousePosition,
  mc as mousePosition,
  vc as physicsBasedMotion
};
