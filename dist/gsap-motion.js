import { fromEventPattern as so, fromEvent as si, noop as Hl, debounceTime as Xs, Observable as So, BehaviorSubject as Vl, skip as Gl, map as To } from "rxjs";
import { gsap as $ } from "gsap";
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
function me() {
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
      return function(u, p) {
        return function(h) {
          return $s(u, p.concat([h]));
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
      return function(n, i, s, a, l, u) {
        return t(e, n, i, s, a, l, u);
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
  const t = _i(), e = el(!0), r = $.ticker.add(() => void e.setValue(!0)), n = (i) => (s) => oe(
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
        $.ticker.remove(r), t().removeEventListener("resize", n(i));
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
      me(
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
  var n, i, s, a, l, u, p = 0, h = !1, y = !1, g = !0;
  if (typeof t != "function")
    throw new TypeError(za);
  e = ls(e) || 0, Wi(r) && (h = !!r.leading, y = "maxWait" in r, s = y ? Ka(ls(r.maxWait) || 0, e) : s, g = "trailing" in r ? !!r.trailing : g);
  function o(O) {
    var E = n, L = i;
    return n = i = void 0, p = O, a = t.apply(L, E), a;
  }
  function w(O) {
    return p = O, l = setTimeout(P, e), h ? o(O) : a;
  }
  function D(O) {
    var E = O - u, L = O - p, pe = e - E;
    return y ? Za(pe, s - L) : pe;
  }
  function z(O) {
    var E = O - u, L = O - p;
    return u === void 0 || E >= e || E < 0 || y && L >= s;
  }
  function P() {
    var O = Mi();
    if (z(O))
      return de(O);
    l = setTimeout(P, D(O));
  }
  function de(O) {
    return l = void 0, g && n ? o(O) : (n = i = void 0, a);
  }
  function U() {
    l !== void 0 && clearTimeout(l), p = 0, n = u = i = l = void 0;
  }
  function X() {
    return l === void 0 ? a : de(Mi());
  }
  function k() {
    var O = Mi(), E = z(O);
    if (n = arguments, i = this, u = O, E) {
      if (l === void 0)
        return w(u);
      if (y)
        return l = setTimeout(P, e), o(u);
    }
    return l === void 0 && (l = setTimeout(P, e)), a;
  }
  return k.cancel = U, k.flush = X, k;
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
      return this.context = $.context(Hl), [
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
    return t * $.ticker.deltaRatio(this.referenceFramerate);
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
  const r = oe(e, De, Rr(me(Ut, De))), n = Ra(), i = el(hr), s = new Vl(t);
  s.subscribe(() => {
    var g;
    i.getValue()(!1), i.setValue(
      oe(
        [r.enable ?? !0, ((g = r.mediaQueryList) == null ? void 0 : g.matches) ?? !0],
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
  const a = (g) => (o) => oe(
    o.pipe(Gl((g == null ? void 0 : g.skip) ?? 0), Xs((g == null ? void 0 : g.debounce) ?? 300)).subscribe(
      me(
        Lt(`run effect from subscription: ${g == null ? void 0 : g.name}`),
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
  ), u = oe(
    l,
    Vn(ta, "No elements to observe."),
    it(n),
    it(
      me(
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
      me(
        a({ debounce: r.debounceTime, name: "window resize" }),
        Lt()
      )
    ),
    sn(Ti)
  ), h = oe(
    r.mediaQueryList,
    Vn((g) => !!g, "Media query observing disabled."),
    it(Na),
    it(
      me(
        a({ debounce: r.debounceTime, name: "media query change" }),
        Lt()
      )
    ),
    sn(Ti)
  );
  function y() {
    on(u, (g) => g.unsubscribe()), on(p, (g) => g.unsubscribe()), on(h, (g) => g.unsubscribe()), i.getValue()(!0);
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
            this.clientX = r.clientX, this.clientY = r.clientY, this.normalX = $.utils.mapRange(0, this.viewWidth, 0, 1, this.clientX), this.normalY = $.utils.mapRange(0, this.viewHeight, 0, 1, this.clientY);
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
    me(
      es(
        (a, l) => oe(
          r(a),
          Ut,
          Gs((u) => Qr(l, u)),
          gi((u) => e(a, u))
        )
      )
    )
  ), i.subscribe(me(es(n))), {
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
  me(po, (t) => [
    ["client", Qr(ln(0, 0), t.client)],
    ["page", Qr(ln(0, 0), t.page)],
    ["screen", Qr(ln(0, 0), t.screen)]
  ])
), us = Zs(me(po, Sa));
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
  let l = n, u = n, p = 0;
  function h(y, g) {
    const o = (g - l) / y, w = Math.max(s, y * y / 2 + y * i / 2, y * i);
    return l = g, u = u + y * p, p = p + y * (g + a * o - u - i * p) / w, u;
  }
  return Object.freeze({ update: h });
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
  var l = ne[s + a], u = l || (ne[s + a] = li(_n(e, n), !0) || (_r(e) ? i : li(function(p) {
    return arguments.length ? e[n] = p : e[n];
  })));
  return u.target = e, l || (u.smooth = tt.getProperty(e, "scrollBehavior") === "smooth"), u;
}, Ui = function(e, r, n) {
  var i = e, s = e, a = mr(), l = a, u = r || 50, p = Math.max(500, u * 3), h = function(w, D) {
    var z = mr();
    D || z - a > u ? (s = i, i = w, l = a, a = z) : n ? i += w : i = s + (w - s) / (z - l) * (a - l);
  }, y = function() {
    s = i = n ? 0 : i, l = a = 0;
  }, g = function(w) {
    var D = l, z = s, P = mr();
    return (w || w === 0) && w !== i && h(w), a === l || P - l > p ? 0 : (i + (n ? z : -z)) / ((n ? P : a) - D) * 1e3;
  };
  return {
    update: h,
    reset: y,
    getVelocity: g
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
    var i = n.tolerance, s = n.dragMinimum, a = n.type, l = n.target, u = n.lineHeight, p = n.debounce, h = n.preventDefault, y = n.onStop, g = n.onStopDelay, o = n.ignore, w = n.wheelSpeed, D = n.event, z = n.onDragStart, P = n.onDragEnd, de = n.onDrag, U = n.onPress, X = n.onRelease, k = n.onRight, O = n.onLeft, E = n.onUp, L = n.onDown, pe = n.onChangeX, B = n.onChangeY, Y = n.onChange, M = n.onToggleX, I = n.onToggleY, K = n.onHover, _e = n.onHoverEnd, ae = n.onMove, F = n.ignoreCheck, xe = n.isNormalizer, Ce = n.onGestureStart, m = n.onGestureEnd, G = n.onWheel, he = n.onEnable, ve = n.onDisable, ue = n.onClick, pt = n.scrollSpeed, J = n.capture, Pe = n.allowClicks, le = n.lockAxis, qt = n.onLockAxis;
    this.target = l = dt(l) || hn, this.vars = n, o && (o = tt.utils.toArray(o)), i = i || 1e-9, s = s || 0, w = w || 1, pt = pt || 1, a = a || "wheel,touch,pointer", p = p !== !1, u || (u = parseFloat(vt.getComputedStyle(Gn).lineHeight) || 22);
    var ke, Re, H, Ee, ge, Q, Ue, v = this, Ne = 0, ye = 0, wt = vn(l, ut), kt = vn(l, Ge), Be = wt(), qe = kt(), Ft = ~a.indexOf("touch") && !~a.indexOf("pointer") && Rt[0] === "pointerdown", Ot = _r(l), fe = l.ownerDocument || pn, Ae = [0, 0, 0], $e = [0, 0, 0], yn = 0, We = function() {
      return yn = mr();
    }, bt = function(f, d) {
      return (v.event = f) && o && ~o.indexOf(f.target) || d && Ft && f.pointerType !== "touch" || F && F(f, d);
    }, xn = function() {
      v._vx.reset(), v._vy.reset(), Re.pause(), y && y(v);
    }, Et = function() {
      var f = v.deltaX = fs(Ae), d = v.deltaY = fs($e), x = Math.abs(f) >= i, b = Math.abs(d) >= i;
      Y && (x || b) && Y(v, f, d, Ae, $e), x && (k && v.deltaX > 0 && k(v), O && v.deltaX < 0 && O(v), pe && pe(v), M && v.deltaX < 0 != Ne < 0 && M(v), Ne = v.deltaX, Ae[0] = Ae[1] = Ae[2] = 0), b && (L && v.deltaY > 0 && L(v), E && v.deltaY < 0 && E(v), B && B(v), I && v.deltaY < 0 != ye < 0 && I(v), ye = v.deltaY, $e[0] = $e[1] = $e[2] = 0), (Ee || H) && (ae && ae(v), H && (de(v), H = !1), Ee = !1), Q && !(Q = !1) && qt && qt(v), ge && (G(v), ge = !1), ke = 0;
    }, Qt = function(f, d, x) {
      Ae[x] += f, $e[x] += d, v._vx.update(f), v._vy.update(d), p ? ke || (ke = requestAnimationFrame(Et)) : Et();
    }, St = function(f, d) {
      le && !Ue && (v.axis = Ue = Math.abs(f) > Math.abs(d) ? "x" : "y", Q = !0), Ue !== "y" && (Ae[2] += f, v._vx.update(f, !0)), Ue !== "x" && ($e[2] += d, v._vy.update(d, !0)), p ? ke || (ke = requestAnimationFrame(Et)) : Et();
    }, ht = function(f) {
      if (!bt(f, 1)) {
        f = rr(f, h);
        var d = f.clientX, x = f.clientY, b = d - v.x, S = x - v.y, T = v.isDragging;
        v.x = d, v.y = x, (T || Math.abs(v.startX - d) >= s || Math.abs(v.startY - x) >= s) && (de && (H = !0), T || (v.isDragging = !0), St(b, S), T || z && z(v));
      }
    }, Z = v.onPress = function(_) {
      bt(_, 1) || _ && _.button || (v.axis = Ue = null, Re.pause(), v.isPressed = !0, _ = rr(_), Ne = ye = 0, v.startX = v.x = _.clientX, v.startY = v.y = _.clientY, v._vx.reset(), v._vy.reset(), ft(xe ? l : fe, Rt[1], ht, h, !0), v.deltaX = v.deltaY = 0, U && U(v));
    }, ot = v.onRelease = function(_) {
      if (!bt(_, 1)) {
        st(xe ? l : fe, Rt[1], ht, !0);
        var f = !isNaN(v.y - v.startY), d = v.isDragging && (Math.abs(v.x - v.startX) > 3 || Math.abs(v.y - v.startY) > 3), x = rr(_);
        !d && f && (v._vx.reset(), v._vy.reset(), h && Pe && tt.delayedCall(0.08, function() {
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
        f = rr(f, h), G && (ge = !0);
        var d = (f.deltaMode === 1 ? u : f.deltaMode === 2 ? vt.innerHeight : 1) * w;
        Qt(f.deltaX * d, f.deltaY * d, 0), y && !xe && Re.restart(!0);
      }
    }, $t = function(f) {
      if (!bt(f)) {
        var d = f.clientX, x = f.clientY, b = d - v.x, S = x - v.y;
        v.x = d, v.y = x, Ee = !0, (b || S) && St(b, S);
      }
    }, jt = function(f) {
      v.event = f, K(v);
    }, C = function(f) {
      v.event = f, _e(v);
    }, c = function(f) {
      return bt(f) || rr(f, h) && ue(v);
    };
    Re = v._dc = tt.delayedCall(g || 0.25, xn).pause(), v.deltaX = v.deltaY = 0, v._vx = Ui(0, 50, !0), v._vy = Ui(0, 50, !0), v.scrollX = wt, v.scrollY = kt, v.isDragging = v.isGesturing = v.isPressed = !1, ul(this), v.enable = function(_) {
      return v.isEnabled || (ft(Ot ? fe : l, "scroll", Gi), a.indexOf("scroll") >= 0 && ft(Ot ? fe : l, "scroll", Se, h, J), a.indexOf("wheel") >= 0 && ft(l, "wheel", nt, h, J), (a.indexOf("touch") >= 0 && ll || a.indexOf("pointer") >= 0) && (ft(l, Rt[0], Z, h, J), ft(fe, Rt[2], ot), ft(fe, Rt[3], ot), Pe && ft(l, "click", We, !1, !0), ue && ft(l, "click", c), Ce && ft(fe, "gesturestart", He), m && ft(fe, "gestureend", Je), K && ft(l, Sn + "enter", jt), _e && ft(l, Sn + "leave", C), ae && ft(l, Sn + "move", $t)), v.isEnabled = !0, _ && _.type && Z(_), he && he(v)), v;
    }, v.disable = function() {
      v.isEnabled && (Wn.filter(function(_) {
        return _ !== v && _r(_.target);
      }).length || st(Ot ? fe : l, "scroll", Gi), v.isPressed && (v._vx.reset(), v._vy.reset(), st(xe ? l : fe, Rt[1], ht, !0)), st(Ot ? fe : l, "scroll", Se, J), st(l, "wheel", nt, J), st(l, Rt[0], Z, J), st(fe, Rt[2], ot), st(fe, Rt[3], ot), st(l, "click", We, !0), st(l, "click", c), st(fe, "gesturestart", He), st(fe, "gestureend", Je), st(l, Sn + "enter", jt), st(l, Sn + "leave", C), st(l, Sn + "move", $t), v.isEnabled = v.isPressed = v.isDragging = !1, ve && ve(v));
    }, v.kill = v.revert = function() {
      v.disable();
      var _ = Wn.indexOf(v);
      _ >= 0 && Wn.splice(_, 1), en === v && (en = 0);
    }, Wn.push(v), xe && _r(l) && (en = v), v.enable(D);
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
var R, Fn, ie, Me, It, Oe, hl, ai, ui, Hn, jr, Xr, rt, wi, qi, lt, ds, ps, $n, gl, Di, ml, gt, _l, vl, yl, fn, Qi, ho, Ci, zr = 1, at = Date.now, Pi = at(), Pt = 0, sr = 0, hu = function t() {
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
  return R || xl() && (R = window.gsap) && R.registerPlugin && R;
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
  var n = r && Xt(e)[qi] !== "matrix(1, 0, 0, 1, 0, 0)" && R.to(e, {
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
    return R.utils.snap(Tl(e), r);
  };
}, vo = function(e) {
  var r = R.utils.snap(e), n = Array.isArray(e) && e.slice(0).sort(function(i, s) {
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
}, Hr = function(e, r, n, i, s, a, l, u) {
  var p = s.startColor, h = s.endColor, y = s.fontSize, g = s.indent, o = s.fontWeight, w = Me.createElement("div"), D = Nn(n) || _n(n, "pinType") === "fixed", z = e.indexOf("scroller") !== -1, P = D ? Oe : n, de = e.indexOf("start") !== -1, U = de ? p : h, X = "border-color:" + U + ";font-size:" + y + ";color:" + U + ";font-weight:" + o + ";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";
  return X += "position:" + ((z || u) && D ? "fixed;" : "absolute;"), (z || u || !D) && (X += (i === Ge ? go : mo) + ":" + (a + parseFloat(g)) + "px;"), l && (X += "box-sizing:border-box;text-align:left;width:" + l.offsetWidth + "px;"), w._isStart = de, w.setAttribute("class", "gsap-marker-" + e + (r ? " marker-" + r : "")), w.style.cssText = X, w.innerText = r || r === 0 ? e + "-" + r : e, P.children[0] ? P.insertBefore(w, P.children[0]) : P.appendChild(w), w._offset = w["offset" + i.op.d2], Jr(w, 0, i, de), w;
}, Jr = function(e, r, n, i) {
  var s = {
    display: "block"
  }, a = n[i ? "os2" : "p2"], l = n[i ? "p2" : "os2"];
  e._isFlipped = i, s[n.a + "Percent"] = i ? -100 : 0, s[n.a] = i ? "1px" : 0, s["border" + a + Zn] = 1, s["border" + l + Zn] = 0, s[n.p] = r + "px", R.set(e, s);
}, ee = [], Ki = {}, Cr, vs = function() {
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
  for (lt = 0; lt < ee.length; lt++)
    n = ee[lt], n && (!r || n._ctx === r) && (e ? n.kill(1) : n.revert(!0, !0));
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
  }), ee.slice(0).forEach(function(i) {
    return i.refresh();
  }), ee.forEach(function(i, s) {
    if (i._subPinOffset && i.pin) {
      var a = i.vars.horizontal ? "offsetWidth" : "offsetHeight", l = i.pin[a];
      i.revert(!0, 1), i.adjustPinSpacing(i.pin[a] - l), i.refresh();
    }
  }), ee.forEach(function(i) {
    return i.vars.end === "max" && i.setPositions(i.start, Math.max(i.start + 1, gn(i.scroller, i._dir)));
  }), n.forEach(function(i) {
    return i && i.render && i.render(-1);
  }), ne.forEach(function(i) {
    ct(i) && (i.smooth && requestAnimationFrame(function() {
      return i.target.style.scrollBehavior = "smooth";
    }), i.rec && i(i.rec));
  }), Cl(ho, 1), ai.pause(), Pn++, _t = 2, an(2), ee.forEach(function(i) {
    return ct(i.vars.onRefresh) && i.vars.onRefresh(i);
  }), _t = q.isRefreshing = !1, Ln("refresh");
}, Zi = 0, ei = 1, br, an = function(e) {
  if (!_t || e === 2) {
    q.isUpdating = !0, br && br.update(0);
    var r = ee.length, n = at(), i = n - Pi >= 50, s = r && ee[0].scroll();
    if (ei = Zi > s ? -1 : 1, _t || (Zi = s), i && (Pt && !wi && n - Pt > 200 && (Pt = 0, Ln("scrollEnd")), jr = Pi, Pi = n), ei < 0) {
      for (lt = r; lt-- > 0; )
        ee[lt] && ee[lt].update(0, i);
      ei = 1;
    } else
      for (lt = 0; lt < r; lt++)
        ee[lt] && ee[lt].update(0, i);
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
    for (var s = Ji.length, a = r.style, l = e.style, u; s--; )
      u = Ji[s], a[u] = n[u];
    a.position = n.position === "absolute" ? "absolute" : "relative", n.display === "inline" && (a.display = "inline-block"), l[mo] = l[go] = "auto", a.flexBasis = n.flexBasis || "auto", a.overflow = "visible", a.boxSizing = "border-box", a[Dn] = ji(e, ut) + et, a[Cn] = ji(e, Ge) + et, a[Ie] = l[Dt] = l[Sl] = l[El] = "0", Un(i), l[Dn] = l["max" + Zn] = n[Dn], l[Cn] = l["max" + _o] = n[Cn], l[Ie] = n[Ie], e.parentNode !== r && (e.parentNode.insertBefore(r, e), r.appendChild(e)), e._gsap.swappedIn = !0;
  }
}, Eu = /([A-Z])/g, Un = function(e) {
  if (e) {
    var r = e.t.style, n = e.length, i = 0, s, a;
    for ((e.t._gsap || R.core.getCache(e.t)).uncache = 1; i < n; i += 2)
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
}, xs = function(e, r, n, i, s, a, l, u, p, h, y, g, o) {
  ct(e) && (e = e(u)), At(e) && e.substr(0, 3) === "max" && (e = g + (e.charAt(4) === "=" ? Zr("0" + e.substr(3), n) : 0));
  var w = o ? o.time() : 0, D, z, P;
  if (o && o.seek(0), ar(e))
    o && (e = R.utils.mapRange(o.scrollTrigger.start, o.scrollTrigger.end, 0, g, e)), l && Jr(l, n, i, !0);
  else {
    ct(r) && (r = r(u));
    var de = (e || "0").split(" "), U, X, k, O;
    P = dt(r) || Oe, U = Jt(P) || {}, (!U || !U.left && !U.top) && Xt(P).display === "none" && (O = P.style.display, P.style.display = "block", U = Jt(P), O ? P.style.display = O : P.style.removeProperty("display")), X = Zr(de[0], U[i.d]), k = Zr(de[1] || "0", n), e = U[i.p] - p[i.p] - h + X + s - k, l && Jr(l, k, i, n - k < 20 || l._isStart && k > 20), n -= n - k;
  }
  if (a) {
    var E = e + n, L = a._isStart;
    D = "scroll" + i.d2, Jr(a, E, i, L && E > 20 || !L && (y ? Math.max(Oe[D], It[D]) : a.parentNode[D]) <= E + 1), y && (p = Jt(l), y && (a.style[i.op.p] = p[i.op.p] - i.op.m - a._offset + et));
  }
  return o && P && (D = Jt(P), o.seek(g), z = Jt(P), o._caScrollDist = D[i.p] - z[i.p], e = e / o._caScrollDist * g), o && o.seek(w), o ? e : Math.round(e);
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
    R.core.getCache(e).uncache = 1, r.appendChild(e);
  }
}, Pl = function(e, r, n) {
  var i = r, s = i;
  return function(a) {
    var l = Math.round(e());
    return l !== i && l !== s && Math.abs(l - i) > 3 && Math.abs(l - s) > 3 && (a = l, n && n()), s = i, i = a, a;
  };
}, bs = function(e, r) {
  var n = vn(e, r), i = "_scroll" + r.p2, s = function a(l, u, p, h, y) {
    var g = a.tween, o = u.onComplete, w = {};
    p = p || n();
    var D = Pl(n, p, function() {
      g.kill(), a.tween = 0;
    });
    return y = h && y || 0, h = h || l - p, g && g.kill(), u[i] = l, u.modifiers = w, w[i] = function() {
      return D(p + h * g.ratio + y * g.ratio * g.ratio);
    }, u.onUpdate = function() {
      ne.cache++, an();
    }, u.onComplete = function() {
      a.tween = 0, o && o.call(g);
    }, g = a.tween = R.to(e, u), g;
  };
  return e[i] = n, n.wheelHandler = function() {
    return s.tween && s.tween.kill() && (s.tween = 0);
  }, Ze(e, "wheel", n.wheelHandler), q.isTouch && Ze(e, "touchmove", n.wheelHandler), s;
}, q = /* @__PURE__ */ function() {
  function t(r, n) {
    Fn || t.register(R) || console.warn("Please gsap.registerPlugin(ScrollTrigger)"), this.init(r, n);
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
    var s = n, a = s.onUpdate, l = s.toggleClass, u = s.id, p = s.onToggle, h = s.onRefresh, y = s.scrub, g = s.trigger, o = s.pin, w = s.pinSpacing, D = s.invalidateOnRefresh, z = s.anticipatePin, P = s.onScrubComplete, de = s.onSnapComplete, U = s.once, X = s.snap, k = s.pinReparent, O = s.pinSpacer, E = s.containerAnimation, L = s.fastScrollEnd, pe = s.preventOverlaps, B = n.horizontal || n.containerAnimation && n.horizontal !== !1 ? ut : Ge, Y = !y && y !== 0, M = dt(n.scroller || ie), I = R.core.getCache(M), K = Nn(M), _e = ("pinType" in n ? n.pinType : _n(M, "pinType") || K && "fixed") === "fixed", ae = [n.onEnter, n.onLeave, n.onEnterBack, n.onLeaveBack], F = Y && n.toggleActions.split(" "), xe = "markers" in n ? n.markers : Wr.markers, Ce = K ? 0 : parseFloat(Xt(M)["border" + B.p2 + Zn]) || 0, m = this, G = n.onRefreshInit && function() {
      return n.onRefreshInit(m);
    }, he = gu(M, K, B), ve = mu(M, K), ue = 0, pt = 0, J = vn(M, B), Pe, le, qt, ke, Re, H, Ee, ge, Q, Ue, v, Ne, ye, wt, kt, Be, qe, Ft, Ot, fe, Ae, $e, yn, We, bt, xn, Et, Qt, St, ht, Z, ot, He, Je, Se, nt, $t, jt, C;
    if (Qi(m), m._dir = B, z *= 45, m.scroller = M, m.scroll = E ? E.time.bind(E) : J, ke = J(), m.vars = n, i = i || n.animation, "refreshPriority" in n && (gl = 1, n.refreshPriority === -9999 && (br = m)), I.tweenScroll = I.tweenScroll || {
      top: bs(M, Ge),
      left: bs(M, ut)
    }, m.tweenTo = Pe = I.tweenScroll[B.p], m.scrubDuration = function(d) {
      ot = ar(d) && d, ot ? Z ? Z.duration(d) : Z = R.to(i, {
        ease: "expo",
        totalProgress: "+=0.001",
        duration: ot,
        paused: !0,
        onComplete: function() {
          return P && P(m);
        }
      }) : (Z && Z.progress(1).kill(), Z = 0);
    }, i && (i.vars.lazy = !1, i._initted || i.vars.immediateRender !== !1 && n.immediateRender !== !1 && i.duration() && i.render(0, !0, !0), m.animation = i.pause(), i.scrollTrigger = m, m.scrubDuration(y), Z && Z.resetTo && Z.resetTo("totalProgress", 0), St = 0, u || (u = i.vars.id)), ee.push(m), X && ((!Kr(X) || X.push) && (X = {
      snapTo: X
    }), "scrollBehavior" in Oe.style && R.set(K ? [Oe, It] : M, {
      scrollBehavior: "auto"
    }), ne.forEach(function(d) {
      return ct(d) && d.target === (K ? Me.scrollingElement || It : M) && (d.smooth = !1);
    }), qt = ct(X.snapTo) ? X.snapTo : X.snapTo === "labels" ? vu(i) : X.snapTo === "labelsDirectional" ? yu(i) : X.directional !== !1 ? function(d, x) {
      return vo(X.snapTo)(d, at() - pt < 500 ? 0 : x.direction);
    } : R.utils.snap(X.snapTo), He = X.duration || {
      min: 0.1,
      max: 2
    }, He = Kr(He) ? Hn(He.min, He.max) : Hn(He, He), Je = R.delayedCall(X.delay || ot / 2 || 0.1, function() {
      var d = J(), x = at() - pt < 500, b = Pe.tween;
      if ((x || Math.abs(m.getVelocity()) < 10) && !b && !wi && ue !== d) {
        var S = (d - H) / ye, T = i && !Y ? i.totalProgress() : S, N = x ? 0 : (T - ht) / (at() - jr) * 1e3 || 0, A = R.utils.clamp(-S, 1 - S, Bn(N / 2) * N / 0.185), W = S + (X.inertia === !1 ? 0 : A), j = Hn(0, 1, qt(W, m)), te = Math.round(H + j * ye), ce = X, be = ce.onStart, Te = ce.onInterrupt, re = ce.onComplete;
        if (d <= Ee && d >= H && te !== d) {
          if (b && !b._initted && b.data <= Bn(te - d))
            return;
          X.inertia === !1 && (A = j - S), Pe(te, {
            duration: He(Bn(Math.max(Bn(W - T), Bn(j - T)) * 0.185 / N / 0.05 || 0)),
            ease: X.ease || "power3",
            data: Bn(te - d),
            // record the distance so that if another snap tween occurs (conflict) we can prioritize the closest snap.
            onInterrupt: function() {
              return Je.restart(!0) && Te && Te(m);
            },
            onComplete: function() {
              m.update(), ue = J(), St = ht = i && !Y ? i.totalProgress() : m.progress, de && de(m), re && re(m);
            }
          }, d, A * ye, te - d - A * ye), be && be(m, Pe.tween);
        }
      } else
        m.isActive && ue !== d && Je.restart(!0);
    }).pause()), u && (Ki[u] = m), g = m.trigger = dt(g || o), C = g && g._gsap && g._gsap.stRevert, C && (C = C(m)), o = o === !0 ? g : dt(o), At(l) && (l = {
      targets: g,
      className: l
    }), o && (w === !1 || w === Dt || (w = !w && o.parentNode && o.parentNode.style && Xt(o.parentNode).display === "flex" ? !1 : Ie), m.pin = o, le = R.core.getCache(o), le.spacer ? wt = le.pinState : (O && (O = dt(O), O && !O.nodeType && (O = O.current || O.nativeElement), le.spacerIsNative = !!O, O && (le.spacerState = Vr(O))), le.spacer = qe = O || Me.createElement("div"), qe.classList.add("pin-spacer"), u && qe.classList.add("pin-spacer-" + u), le.pinState = wt = Vr(o)), n.force3D !== !1 && R.set(o, {
      force3D: !0
    }), m.spacer = qe = le.spacer, Qt = Xt(o), yn = Qt[w + B.os2], Ot = R.getProperty(o), fe = R.quickSetter(o, B.a, et), Ri(o, qe, Qt), Be = Vr(o)), xe) {
      Ne = Kr(xe) ? ms(xe, _s) : _s, Ue = Hr("scroller-start", u, M, B, Ne, 0), v = Hr("scroller-end", u, M, B, Ne, 0, Ue), Ft = Ue["offset" + B.op.d2];
      var c = dt(_n(M, "content") || M);
      ge = this.markerStart = Hr("start", u, c, B, Ne, Ft, 0, E), Q = this.markerEnd = Hr("end", u, c, B, Ne, Ft, 0, E), E && (jt = R.quickSetter([ge, Q], B.a, et)), !_e && !(Gt.length && _n(M, "fixedMarkers") === !0) && (_u(K ? Oe : M), R.set([Ue, v], {
        force3D: !0
      }), bt = R.quickSetter(Ue, B.a, et), Et = R.quickSetter(v, B.a, et));
    }
    if (E) {
      var _ = E.vars.onUpdate, f = E.vars.onUpdateParams;
      E.eventCallback("onUpdate", function() {
        m.update(0, 0, 1), _ && _.apply(E, f || []);
      });
    }
    m.previous = function() {
      return ee[ee.indexOf(m) - 1];
    }, m.next = function() {
      return ee[ee.indexOf(m) + 1];
    }, m.revert = function(d, x) {
      if (!x)
        return m.kill(!0);
      var b = d !== !1 || !m.enabled, S = rt;
      b !== m.isReverted && (b && (nt = Math.max(J(), m.scroll.rec || 0), Se = m.progress, $t = i && i.progress()), ge && [ge, Q, Ue, v].forEach(function(T) {
        return T.style.display = b ? "none" : "block";
      }), b && (rt = m, m.update(b)), o && (!k || !m.isActive) && (b ? bu(o, qe, wt) : Ri(o, qe, Xt(o), We)), b || m.update(b), rt = S, m.isReverted = b);
    }, m.refresh = function(d, x) {
      if (!((rt || !m.enabled) && !x)) {
        if (o && d && Pt) {
          Ze(t, "scrollEnd", Ml);
          return;
        }
        !_t && G && G(m), rt = m, pt = at(), Pe.tween && (Pe.tween.kill(), Pe.tween = 0), Z && Z.pause(), D && i && i.revert({
          kill: !1
        }).invalidate(), m.isReverted || m.revert(!0, !0), m._subPinOffset = !1;
        for (var b = he(), S = ve(), T = E ? E.duration() : gn(M, B), N = ye <= 0.01, A = 0, W = 0, j = n.end, te = n.endTrigger || g, ce = n.start || (n.start === 0 || !g ? 0 : o ? "0 0" : "0 100%"), be = m.pinnedContainer = n.pinnedContainer && dt(n.pinnedContainer), Te = g && Math.max(0, ee.indexOf(m)) || 0, re = Te, V, Xe, Qe, wn, ze, je, Wt, bi, Eo, tr, Ht; re--; )
          je = ee[re], je.end || je.refresh(0, 1) || (rt = m), Wt = je.pin, Wt && (Wt === g || Wt === o || Wt === be) && !je.isReverted && (tr || (tr = []), tr.unshift(je), je.revert(!0, !0)), je !== ee[re] && (Te--, re--);
        for (ct(ce) && (ce = ce(m)), H = xs(ce, g, b, B, J(), ge, Ue, m, S, Ce, _e, T, E) || (o ? -1e-3 : 0), ct(j) && (j = j(m)), At(j) && !j.indexOf("+=") && (~j.indexOf(" ") ? j = (At(ce) ? ce.split(" ")[0] : "") + j : (A = Zr(j.substr(2), b), j = At(ce) ? ce : (E ? R.utils.mapRange(0, E.duration(), E.scrollTrigger.start, E.scrollTrigger.end, H) : H) + A, te = g)), Ee = Math.max(H, xs(j || (te ? "100% 0" : T), te, b, B, J() + A, Q, v, m, S, Ce, _e, T, E)) || -1e-3, ye = Ee - H || (H -= 0.01) && 1e-3, A = 0, re = Te; re--; )
          je = ee[re], Wt = je.pin, Wt && je.start - je._pinPush <= H && !E && je.end > 0 && (V = je.end - je.start, (Wt === g && je.start - je._pinPush < H || Wt === be) && !ar(ce) && (A += V * (1 - je.progress)), Wt === o && (W += V));
        if (H += A, Ee += A, N && (Se = R.utils.clamp(0, 1, R.utils.normalize(H, Ee, nt))), m._pinPush = W, ge && A && (V = {}, V[B.a] = "+=" + A, be && (V[B.p] = "-=" + J()), R.set([ge, Q], V)), o)
          V = Xt(o), wn = B === Ge, Qe = J(), Ae = parseFloat(Ot(B.a)) + W, !T && Ee > 1 && (Ht = (K ? Me.scrollingElement || It : M).style, Ht = {
            style: Ht,
            value: Ht["overflow" + B.a.toUpperCase()]
          }, Ht.style["overflow" + B.a.toUpperCase()] = "scroll"), Ri(o, qe, V), Be = Vr(o), Xe = Jt(o, !0), bi = _e && vn(M, wn ? ut : Ge)(), w && (We = [w + B.os2, ye + W + et], We.t = qe, re = w === Ie ? ji(o, B) + ye + W : 0, re && We.push(B.d, re + et), Un(We), be && ee.forEach(function(nr) {
            nr.pin === be && nr.vars.pinSpacing !== !1 && (nr._subPinOffset = !0);
          }), _e && J(nt)), _e && (ze = {
            top: Xe.top + (wn ? Qe - H : bi) + et,
            left: Xe.left + (wn ? bi : Qe - H) + et,
            boxSizing: "border-box",
            position: "fixed"
          }, ze[Dn] = ze["max" + Zn] = Math.ceil(Xe.width) + et, ze[Cn] = ze["max" + _o] = Math.ceil(Xe.height) + et, ze[Dt] = ze[Dt + xr] = ze[Dt + vr] = ze[Dt + wr] = ze[Dt + yr] = "0", ze[Ie] = V[Ie], ze[Ie + xr] = V[Ie + xr], ze[Ie + vr] = V[Ie + vr], ze[Ie + wr] = V[Ie + wr], ze[Ie + yr] = V[Ie + yr], kt = Su(wt, ze, k), _t && J(0)), i ? (Eo = i._initted, Di(1), i.render(i.duration(), !0, !0), $e = Ot(B.a) - Ae + ye + W, xn = Math.abs(ye - $e) > 1, _e && xn && kt.splice(kt.length - 2, 2), i.render(0, !0, !0), Eo || i.invalidate(!0), i.parent || i.totalTime(i.totalTime()), Di(0)) : $e = ye, Ht && (Ht.value ? Ht.style["overflow" + B.a.toUpperCase()] = Ht.value : Ht.style.removeProperty("overflow-" + B.a));
        else if (g && J() && !E)
          for (Xe = g.parentNode; Xe && Xe !== Oe; )
            Xe._pinOffset && (H -= Xe._pinOffset, Ee -= Xe._pinOffset), Xe = Xe.parentNode;
        tr && tr.forEach(function(nr) {
          return nr.revert(!1, !0);
        }), m.start = H, m.end = Ee, ke = Re = _t ? nt : J(), !E && !_t && (ke < nt && J(nt), m.scroll.rec = 0), m.revert(!1, !0), Je && (ue = -1, m.isActive && J(H + ye * Se), Je.restart(!0)), rt = 0, i && Y && (i._initted || $t) && i.progress() !== $t && i.progress($t, !0).render(i.time(), !0, !0), (N || Se !== m.progress || E) && (i && !Y && i.totalProgress(E && H < -1e-3 && !Se ? R.utils.normalize(H, Ee, 0) : Se, !0), m.progress = (ke - H) / ye === Se ? 0 : Se), o && w && (qe._pinOffset = Math.round(m.progress * $e)), Z && Z.invalidate(), h && !_t && h(m);
      }
    }, m.getVelocity = function() {
      return (J() - Re) / (at() - jr) * 1e3 || 0;
    }, m.endAnimation = function() {
      ir(m.callbackAnimation), i && (Z ? Z.progress(1) : i.paused() ? Y || ir(i, m.direction < 0, 1) : ir(i, i.reversed()));
    }, m.labelToScroll = function(d) {
      return i && i.labels && (H || m.refresh() || H) + i.labels[d] / i.duration() * ye || 0;
    }, m.getTrailing = function(d) {
      var x = ee.indexOf(m), b = m.direction > 0 ? ee.slice(0, x).reverse() : ee.slice(x + 1);
      return (At(d) ? b.filter(function(S) {
        return S.vars.preventOverlaps === d;
      }) : b).filter(function(S) {
        return m.direction > 0 ? S.end <= H : S.start >= Ee;
      });
    }, m.update = function(d, x, b) {
      if (!(E && !b && !d)) {
        var S = _t === !0 ? nt : m.scroll(), T = d ? 0 : (S - H) / ye, N = T < 0 ? 0 : T > 1 ? 1 : T || 0, A = m.progress, W, j, te, ce, be, Te, re, V;
        if (x && (Re = ke, ke = E ? J() : S, X && (ht = St, St = i && !Y ? i.totalProgress() : N)), z && !N && o && !rt && !zr && Pt && H < S + (S - Re) / (at() - jr) * z && (N = 1e-4), N !== A && m.enabled) {
          if (W = m.isActive = !!N && N < 1, j = !!A && A < 1, Te = W !== j, be = Te || !!N != !!A, m.direction = N > A ? 1 : -1, m.progress = N, be && !rt && (te = N && !A ? 0 : N === 1 ? 1 : A === 1 ? 2 : 3, Y && (ce = !Te && F[te + 1] !== "none" && F[te + 1] || F[te], V = i && (ce === "complete" || ce === "reset" || ce in i))), pe && (Te || V) && (V || y || !i) && (ct(pe) ? pe(m) : m.getTrailing(pe).forEach(function(ze) {
            return ze.endAnimation();
          })), Y || (Z && !rt && !zr ? (Z._dp._time - Z._start !== Z._time && Z.render(Z._dp._time - Z._start), Z.resetTo ? Z.resetTo("totalProgress", N, i._tTime / i._tDur) : (Z.vars.totalProgress = N, Z.invalidate().restart())) : i && i.totalProgress(N, !!rt)), o) {
            if (d && w && (qe.style[w + B.os2] = yn), !_e)
              fe(lr(Ae + $e * N));
            else if (be) {
              if (re = !d && N > A && Ee + 1 > S && S + 1 >= gn(M, B), k)
                if (!d && (W || re)) {
                  var Xe = Jt(o, !0), Qe = S - H;
                  ws(o, Oe, Xe.top + (B === Ge ? Qe : 0) + et, Xe.left + (B === Ge ? 0 : Qe) + et);
                } else
                  ws(o, qe);
              Un(W || re ? kt : Be), xn && N < 1 && W || fe(Ae + (N === 1 && !re ? $e : 0));
            }
          }
          X && !Pe.tween && !rt && !zr && Je.restart(!0), l && (Te || U && N && (N < 1 || !Ci)) && ui(l.targets).forEach(function(ze) {
            return ze.classList[W || U ? "add" : "remove"](l.className);
          }), a && !Y && !d && a(m), be && !rt ? (Y && (V && (ce === "complete" ? i.pause().totalProgress(1) : ce === "reset" ? i.restart(!0).pause() : ce === "restart" ? i.restart(!0) : i[ce]()), a && a(m)), (Te || !Ci) && (p && Te && ki(m, p), ae[te] && ki(m, ae[te]), U && (N === 1 ? m.kill(!1, 1) : ae[te] = 0), Te || (te = N === 1 ? 1 : 3, ae[te] && ki(m, ae[te]))), L && !W && Math.abs(m.getVelocity()) > (ar(L) ? L : 2500) && (ir(m.callbackAnimation), Z ? Z.progress(1) : ir(i, ce === "reverse" ? 1 : !N, 1))) : Y && a && !rt && a(m);
        }
        if (Et) {
          var wn = E ? S / E.duration() * (E._caScrollDist || 0) : S;
          bt(wn + (Ue._isFlipped ? 1 : 0)), Et(wn);
        }
        jt && jt(-S / E.duration() * (E._caScrollDist || 0));
      }
    }, m.enable = function(d, x) {
      m.enabled || (m.enabled = !0, Ze(M, "resize", ur), Ze(K ? Me : M, "scroll", Xn), G && Ze(t, "refreshInit", G), d !== !1 && (m.progress = Se = 0, ke = Re = ue = J()), x !== !1 && m.refresh());
    }, m.getTween = function(d) {
      return d && Pe ? Pe.tween : Z;
    }, m.setPositions = function(d, x) {
      o && (Ae += d - H, $e += x - d - ye, w === Ie && m.adjustPinSpacing(x - d - ye)), m.start = H = d, m.end = Ee = x, ye = x - d, m.update();
    }, m.adjustPinSpacing = function(d) {
      if (We && d) {
        var x = We.indexOf(B.d) + 1;
        We[x] = parseFloat(We[x]) + d + et, We[1] = parseFloat(We[1]) + d + et, Un(We);
      }
    }, m.disable = function(d, x) {
      if (m.enabled && (d !== !1 && m.revert(!0, !0), m.enabled = m.isActive = !1, x || Z && Z.pause(), nt = 0, le && (le.uncache = 1), G && Ke(t, "refreshInit", G), Je && (Je.pause(), Pe.tween && Pe.tween.kill() && (Pe.tween = 0)), !K)) {
        for (var b = ee.length; b--; )
          if (ee[b].scroller === M && ee[b] !== m)
            return;
        Ke(M, "resize", ur), Ke(M, "scroll", Xn);
      }
    }, m.kill = function(d, x) {
      m.disable(d, x), Z && !x && Z.kill(), u && delete Ki[u];
      var b = ee.indexOf(m);
      b >= 0 && ee.splice(b, 1), b === lt && ei > 0 && lt--, b = 0, ee.forEach(function(S) {
        return S.scroller === m.scroller && (b = 1);
      }), b || _t || (m.scroll.rec = 0), i && (i.scrollTrigger = null, d && i.revert({
        kill: !1
      }), x || i.kill()), ge && [ge, Q, Ue, v].forEach(function(S) {
        return S.parentNode && S.parentNode.removeChild(S);
      }), br === m && (br = 0), o && (le && (le.uncache = 1), b = 0, ee.forEach(function(S) {
        return S.pin === o && b++;
      }), b || (le.spacer = 0)), n.onKill && n.onKill(m);
    }, m.enable(!1, !1), C && C(m), !i || !i.add || ye ? m.refresh() : R.delayedCall(0.01, function() {
      return H || Ee || m.refresh();
    }) && (ye = 0.01) && (H = Ee = 0), o && wu();
  }, t.register = function(n) {
    return Fn || (R = n || wl(), xl() && window.document && t.enable(), Fn = sr), Fn;
  }, t.defaults = function(n) {
    if (n)
      for (var i in n)
        Wr[i] = n[i];
    return Wr;
  }, t.disable = function(n, i) {
    sr = 0, ee.forEach(function(a) {
      return a[i ? "kill" : "disable"](n);
    }), Ke(ie, "wheel", Xn), Ke(Me, "scroll", Xn), clearInterval(Xr), Ke(Me, "touchcancel", Vt), Ke(Oe, "touchstart", Vt), Fr(Ke, Me, "pointerdown,touchstart,mousedown", hs), Fr(Ke, Me, "pointerup,touchend,mouseup", gs), ai.kill(), Yr(Ke);
    for (var s = 0; s < ne.length; s += 3)
      $r(Ke, ne[s], ne[s + 1]), $r(Ke, ne[s], ne[s + 2]);
  }, t.enable = function() {
    if (ie = window, Me = document, It = Me.documentElement, Oe = Me.body, R && (ui = R.utils.toArray, Hn = R.utils.clamp, Qi = R.core.context || Vt, Di = R.core.suppressOverwrites || Vt, ho = ie.history.scrollRestoration || "auto", Zi = ie.pageYOffset, R.core.globals("ScrollTrigger", t), Oe)) {
      sr = 1, hu(), Fe.register(R), t.isTouch = Fe.isTouch, fn = Fe.isTouch && /(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent), Ze(ie, "wheel", Xn), hl = [ie, Me, It, Oe], R.matchMedia ? (t.matchMedia = function(u) {
        var p = R.matchMedia(), h;
        for (h in u)
          p.add(h, u[h]);
        return p;
      }, R.addEventListener("matchMediaInit", function() {
        return yo();
      }), R.addEventListener("matchMediaRevert", function() {
        return Dl();
      }), R.addEventListener("matchMedia", function() {
        Mn(0, 1), Ln("matchMedia");
      }), R.matchMedia("(orientation: portrait)", function() {
        return Oi(), Oi;
      })) : console.warn("Requires GSAP 3.11.0 or later"), Oi(), Ze(Me, "scroll", Xn);
      var n = Oe.style, i = n.borderTopStyle, s = R.core.Animation.prototype, a, l;
      for (s.revert || Object.defineProperty(s, "revert", {
        value: function() {
          return this.time(-0.01, !0);
        }
      }), n.borderTopStyle = "solid", a = Jt(Oe), Ge.m = Math.round(a.top + Ge.sc()) || 0, ut.m = Math.round(a.left + ut.sc()) || 0, i ? n.borderTopStyle = i : n.removeProperty("border-top-style"), Xr = setInterval(vs, 250), R.delayedCall(0.5, function() {
        return zr = 0;
      }), Ze(Me, "touchcancel", Vt), Ze(Oe, "touchstart", Vt), Fr(Ze, Me, "pointerdown,touchstart,mousedown", hs), Fr(Ze, Me, "pointerup,touchend,mouseup", gs), qi = R.utils.checkPrefix("transform"), ti.push(qi), Fn = at(), ai = R.delayedCall(0.2, Mn).pause(), $n = [Me, "visibilitychange", function() {
        var u = ie.innerWidth, p = ie.innerHeight;
        Me.hidden ? (ds = u, ps = p) : (ds !== u || ps !== p) && ur();
      }, Me, "DOMContentLoaded", Mn, ie, "load", Mn, ie, "resize", ur], Yr(Ze), ee.forEach(function(u) {
        return u.enable(0, 1);
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
    ee.forEach(function(i) {
      return i._ctx && i._ctx.query === n && i._ctx.kill(!0, !0);
    });
  }, t.isInViewport = function(n, i, s) {
    var a = (At(n) ? dt(n) : n).getBoundingClientRect(), l = a[s ? Dn : Cn] * i || 0;
    return s ? a.right - l > 0 && a.left + l < ie.innerWidth : a.bottom - l > 0 && a.top + l < ie.innerHeight;
  }, t.positionInViewport = function(n, i, s) {
    At(n) && (n = dt(n));
    var a = n.getBoundingClientRect(), l = a[s ? Dn : Cn], u = i == null ? l / 2 : i in ci ? ci[i] * l : ~i.indexOf("%") ? parseFloat(i) * l / 100 : parseFloat(i) || 0;
    return s ? (a.left + u) / ie.innerWidth : (a.top + u) / ie.innerHeight;
  }, t.killAll = function(n) {
    if (ee.slice(0).forEach(function(s) {
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
      r >= 0 && mt.splice(r, 5), mt.push(e, e.style.cssText, e.getBBox && e.getAttribute("transform"), R.core.getCache(e), Qi());
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
  return ee.filter(function(t) {
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
  var r = [], n = {}, i = e.interval || 0.016, s = e.batchMax || 1e9, a = function(p, h) {
    var y = [], g = [], o = R.delayedCall(i, function() {
      h(y, g), y = [], g = [];
    }).pause();
    return function(w) {
      y.length || o.restart(!0), y.push(w.trigger), g.push(w), s <= y.length && o.progress(1);
    };
  }, l;
  for (l in e)
    n[l] = l.substr(0, 2) === "on" && ct(e[l]) && l !== "onRefreshInit" ? a(l, e[l]) : e[l];
  return ct(s) && (s = s(), Ze(q, "refresh", function() {
    return s = e.batchMax();
  })), ui(t).forEach(function(u) {
    var p = {};
    for (l in n)
      p[l] = n[l];
    p.trigger = u, r.push(q.create(p));
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
  var r = e.event, n = e.target, i = e.axis, s = (r.changedTouches ? r.changedTouches[0] : r).target, a = s._gsap || R.core.getCache(s), l = at(), u;
  if (!a._isScrollT || l - a._isScrollT > 2e3) {
    for (; s && s !== Oe && (s.scrollHeight <= s.clientHeight && s.scrollWidth <= s.clientWidth || !(Gr[(u = Xt(s)).overflowY] || Gr[u.overflowX])); )
      s = s.parentNode;
    a._isScroll = s && s !== n && !Nn(s) && (Gr[(u = Xt(s)).overflowY] || Gr[u.overflowX]), a._isScrollT = l;
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
  var r = e, n = r.normalizeScrollX, i = r.momentum, s = r.allowNestedScroll, a = r.onRelease, l, u, p = dt(e.target) || It, h = R.core.globals().ScrollSmoother, y = h && h.get(), g = fn && (e.content && dt(e.content) || y && e.content !== !1 && !y.smooth() && y.content()), o = vn(p, Ge), w = vn(p, ut), D = 1, z = (Fe.isTouch && ie.visualViewport ? ie.visualViewport.scale * ie.visualViewport.width : ie.outerWidth) / ie.innerWidth, P = 0, de = ct(i) ? function() {
    return i(l);
  } : function() {
    return i || 2.8;
  }, U, X, k = kl(p, e.type, !0, s), O = function() {
    return X = !1;
  }, E = Vt, L = Vt, pe = function() {
    u = gn(p, Ge), L = Hn(fn ? 1 : 0, u), n && (E = Hn(0, gn(p, ut))), U = Pn;
  }, B = function() {
    g._gsap.y = lr(parseFloat(g._gsap.y) + o.offset) + "px", g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + parseFloat(g._gsap.y) + ", 0, 1)", o.offset = o.cacheID = 0;
  }, Y = function() {
    if (X) {
      requestAnimationFrame(O);
      var xe = lr(l.deltaY / 2), Ce = L(o.v - xe);
      if (g && Ce !== o.v + o.offset) {
        o.offset = Ce - o.v;
        var m = lr((parseFloat(g && g._gsap.y) || 0) - o.offset);
        g.style.transform = "matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, " + m + ", 0, 1)", g._gsap.y = m + "px", o.cacheID = ne.cache, an();
      }
      return !0;
    }
    o.offset && B(), X = !0;
  }, M, I, K, _e, ae = function() {
    pe(), M.isActive() && M.vars.scrollY > u && (o() > u ? M.progress(1) && o(u) : M.resetTo("scrollY", u));
  };
  return g && R.set(g, {
    y: "+=0"
  }), e.ignoreCheck = function(F) {
    return fn && F.type === "touchmove" && Y() || D > 1.05 && F.type !== "touchstart" || l.isGesturing || F.touches && F.touches.length > 1;
  }, e.onPress = function() {
    X = !1;
    var F = D;
    D = lr((ie.visualViewport && ie.visualViewport.scale || 1) / z), M.pause(), F !== D && Ni(p, D > 1.01 ? !0 : n ? !1 : "x"), I = w(), K = o(), pe(), U = Pn;
  }, e.onRelease = e.onGestureStart = function(F, xe) {
    if (o.offset && B(), !xe)
      _e.restart(!0);
    else {
      ne.cache++;
      var Ce = de(), m, G;
      n && (m = w(), G = m + Ce * 0.05 * -F.velocityX / 0.227, Ce *= Es(w, m, G, gn(p, ut)), M.vars.scrollX = E(G)), m = o(), G = m + Ce * 0.05 * -F.velocityY / 0.227, Ce *= Es(o, m, G, gn(p, Ge)), M.vars.scrollY = L(G), M.invalidate().duration(Ce).play(0.01), (fn && M.vars.scrollY >= u || m >= u - 1) && R.to({}, {
        onUpdate: ae,
        duration: Ce
      });
    }
    a && a(F);
  }, e.onWheel = function() {
    M._ts && M.pause(), at() - P > 1e3 && (U = 0, P = at());
  }, e.onChange = function(F, xe, Ce, m, G) {
    if (Pn !== U && pe(), xe && n && w(E(m[2] === xe ? I + (F.startX - F.x) : w() + xe - m[1])), Ce) {
      o.offset && B();
      var he = G[2] === Ce, ve = he ? K + F.startY - F.y : o() + Ce - G[1], ue = L(ve);
      he && ve !== ue && (K += ue - ve), o(ue);
    }
    (Ce || xe) && an();
  }, e.onEnable = function() {
    Ni(p, n ? !1 : "x"), q.addEventListener("refresh", ae), Ze(ie, "resize", ae), o.smooth && (o.target.style.scrollBehavior = "auto", o.smooth = w.smooth = !1), k.enable();
  }, e.onDisable = function() {
    Ni(p, !0), Ke(ie, "resize", ae), q.removeEventListener("refresh", ae), k.kill();
  }, e.lockAxis = e.lockAxis !== !1, l = new Fe(e), l.iOS = fn, fn && !o() && o(1), fn && R.ticker.add(Vt), _e = l._dc, M = R.to(l, {
    ease: "power4",
    paused: !0,
    scrollX: n ? "+=0.1" : "+=0",
    scrollY: "+=0.1",
    modifiers: {
      scrollY: Pl(o, o(), function() {
        return M.pause();
      })
    },
    onUpdate: an,
    onComplete: _e.vars.onComplete
  }), l;
};
q.sort = function(t) {
  return ee.sort(t || function(e, r) {
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
wl() && R.registerPlugin(q);
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
    var n = wo(e), i = n ? n.getAttribute("xmlns") || "http://www.w3.org/2000/svg" : "http://www.w3.org/1999/xhtml", s = n ? r ? "rect" : "g" : "div", a = r !== 2 ? 0 : 100, l = r === 3 ? 100 : 0, u = "position:absolute;display:block;pointer-events:none;margin:0;padding:0;", p = tn.createElementNS ? tn.createElementNS(i.replace(/^https/, "http"), s) : tn.createElement(s);
    return r && (n ? (ri || (ri = t(e)), p.setAttribute("width", 0.01), p.setAttribute("height", 0.01), p.setAttribute("transform", "translate(" + a + "," + l + ")"), ri.appendChild(p)) : (cr || (cr = t(e), cr.style.cssText = u), p.style.cssText = u + "width:0.1px;height:0.1px;top:" + l + "px;left:" + a + "px", cr.appendChild(p))), p;
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
  var n = wo(e), i = e === n, s = n ? Nl : Al, a = e.parentNode, l, u, p, h, y, g;
  if (e === kn)
    return e;
  if (s.length || s.push(Ai(e, 1), Ai(e, 2), Ai(e, 3)), l = n ? ri : cr, n)
    i ? (p = Au(e), h = -p.e / p.a, y = -p.f / p.d, u = fi) : e.getBBox ? (p = e.getBBox(), u = e.transform ? e.transform.baseVal : {}, u = u.numberOfItems ? u.numberOfItems > 1 ? Nu(u) : u.getItem(0).matrix : fi, h = u.a * p.x + u.c * p.y, y = u.b * p.x + u.d * p.y) : (u = new In(), h = y = 0), r && e.tagName.toLowerCase() === "g" && (h = y = 0), (i ? n : a).appendChild(l), l.setAttribute("transform", "matrix(" + u.a + "," + u.b + "," + u.c + "," + u.d + "," + (u.e + h) + "," + (u.f + y) + ")");
  else {
    if (h = y = 0, Ol)
      for (u = e.offsetParent, p = e; p && (p = p.parentNode) && p !== u && p.parentNode; )
        (kn.getComputedStyle(p)[Ct] + "").length > 4 && (h = p.offsetLeft, y = p.offsetTop, p = 0);
    if (g = kn.getComputedStyle(e), g.position !== "absolute" && g.position !== "fixed")
      for (u = e.offsetParent; a && a !== u; )
        h += a.scrollLeft || 0, y += a.scrollTop || 0, a = a.parentNode;
    p = l.style, p.top = e.offsetTop - y + "px", p.left = e.offsetLeft - h + "px", p[Ct] = g[Ct], p[eo] = g[eo], p.position = g.position === "fixed" ? "fixed" : "absolute", e.parentNode.appendChild(l);
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
    var n = this.a, i = this.b, s = this.c, a = this.d, l = this.e, u = this.f, p = n * a - i * s || 1e-10;
    return Li(this, a / p, -i / p, -s / p, n / p, (s * u - a * l) / p, -(n * u - i * l) / p);
  }, e.multiply = function(n) {
    var i = this.a, s = this.b, a = this.c, l = this.d, u = this.e, p = this.f, h = n.a, y = n.c, g = n.b, o = n.d, w = n.e, D = n.f;
    return Li(this, h * i + g * a, h * s + g * l, y * i + o * a, y * s + o * l, u + w * i + D * a, p + w * s + D * l);
  }, e.clone = function() {
    return new t(this.a, this.b, this.c, this.d, this.e, this.f);
  }, e.equals = function(n) {
    var i = this.a, s = this.b, a = this.c, l = this.d, u = this.e, p = this.f;
    return i === n.a && s === n.b && a === n.c && l === n.d && u === n.e && p === n.f;
  }, e.apply = function(n, i) {
    i === void 0 && (i = {});
    var s = n.x, a = n.y, l = this.a, u = this.b, p = this.c, h = this.d, y = this.e, g = this.f;
    return i.x = s * l + a * p + y || 0, i.y = s * u + a * h + g || 0, i;
  }, t;
}();
function Tn(t, e, r, n) {
  if (!t || !t.parentNode || (tn || Rl(t)).documentElement === t)
    return new In();
  var i = Pu(t), s = wo(t), a = s ? Nl : Al, l = Lu(t, r), u = a[0].getBoundingClientRect(), p = a[1].getBoundingClientRect(), h = a[2].getBoundingClientRect(), y = l.parentNode, g = !n && Ru(t), o = new In((p.left - u.left) / 100, (p.top - u.top) / 100, (h.left - u.left) / 100, (h.top - u.top) / 100, u.left + (g ? 0 : Ou()), u.top + (g ? 0 : ku()));
  if (y.removeChild(l), i)
    for (u = i.length; u--; )
      p = i[u], p.scaleX = p.scaleY = 0, p.renderTransform(1, p);
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
  var n = e.getBBox && e.ownerSVGElement, i = e.ownerDocument || yt, s, a, l, u, p, h, y, g, o, w, D, z, P;
  if (e === we)
    l = jn(i), s = Kn(i), a = s + (i.documentElement.clientWidth || e.innerWidth || i.body.clientWidth || 0), u = l + ((e.innerHeight || 0) - 20 < i.documentElement.clientHeight ? i.documentElement.clientHeight : e.innerHeight || i.body.clientHeight || 0);
  else {
    if (r === we || Bt(r))
      return e.getBoundingClientRect();
    s = l = 0, n ? (w = e.getBBox(), D = w.width, z = w.height) : (e.viewBox && (w = e.viewBox.baseVal) && (s = w.x || 0, l = w.y || 0, D = w.width, z = w.height), D || (P = kr(e), w = P.boxSizing === "border-box", D = (parseFloat(P.width) || e.clientWidth || 0) + (w ? 0 : parseFloat(P.borderLeftWidth) + parseFloat(P.borderRightWidth)), z = (parseFloat(P.height) || e.clientHeight || 0) + (w ? 0 : parseFloat(P.borderTopWidth) + parseFloat(P.borderBottomWidth)))), a = D, u = z;
  }
  return e === r ? {
    left: s,
    top: l,
    width: a - s,
    height: u - l
  } : (p = Tn(r, !0).multiply(Tn(e)), h = p.apply({
    x: s,
    y: l
  }), y = p.apply({
    x: a,
    y: l
  }), g = p.apply({
    x: a,
    y: u
  }), o = p.apply({
    x: s,
    y: u
  }), s = Math.min(h.x, y.x, g.x, o.x), l = Math.min(h.y, y.y, g.y, o.y), {
    left: s,
    top: l,
    width: Math.max(h.x, y.x, g.x, o.x) - s,
    height: Math.max(h.y, y.y, g.y, o.y) - l
  });
}, zi = function(e, r, n, i, s, a) {
  var l = {}, u, p, h;
  if (r)
    if (s !== 1 && r instanceof Array) {
      if (l.end = u = [], h = r.length, Sr(r[0]))
        for (p = 0; p < h; p++)
          u[p] = zl(r[p], s);
      else
        for (p = 0; p < h; p++)
          u[p] = r[p] * s;
      n += 1.1, i -= 1.1;
    } else
      dn(r) ? l.end = function(y) {
        var g = r.call(e, y), o, w;
        if (s !== 1)
          if (Sr(g)) {
            o = {};
            for (w in g)
              o[w] = g[w] * s;
            g = o;
          } else
            g *= s;
        return g;
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
  var n = document.createElement("div"), i = n.style, s = e.firstChild, a = 0, l = 0, u = e.scrollTop, p = e.scrollLeft, h = e.scrollWidth, y = e.scrollHeight, g = 0, o = 0, w = 0, D, z, P, de, U, X;
  Fl && r.force3D !== !1 ? (U = "translate3d(", X = "px,0px)") : Tr && (U = "translate(", X = "px)"), this.scrollTop = function(k, O) {
    if (!arguments.length)
      return -this.top();
    this.top(-k, O);
  }, this.scrollLeft = function(k, O) {
    if (!arguments.length)
      return -this.left();
    this.left(-k, O);
  }, this.left = function(k, O) {
    if (!arguments.length)
      return -(e.scrollLeft + l);
    var E = e.scrollLeft - p, L = l;
    if ((E > 2 || E < -2) && !O) {
      p = e.scrollLeft, se.killTweensOf(this, {
        left: 1,
        scrollLeft: 1
      }), this.left(-p), r.onKill && r.onKill();
      return;
    }
    k = -k, k < 0 ? (l = k - 0.5 | 0, k = 0) : k > o ? (l = k - o | 0, k = o) : l = 0, (l || L) && (this._skip || (i[Tr] = U + -l + "px," + -a + X), l + g >= 0 && (i.paddingRight = l + g + "px")), e.scrollLeft = k | 0, p = e.scrollLeft;
  }, this.top = function(k, O) {
    if (!arguments.length)
      return -(e.scrollTop + a);
    var E = e.scrollTop - u, L = a;
    if ((E > 2 || E < -2) && !O) {
      u = e.scrollTop, se.killTweensOf(this, {
        top: 1,
        scrollTop: 1
      }), this.top(-u), r.onKill && r.onKill();
      return;
    }
    k = -k, k < 0 ? (a = k - 0.5 | 0, k = 0) : k > w ? (a = k - w | 0, k = w) : a = 0, (a || L) && (this._skip || (i[Tr] = U + -l + "px," + -a + X)), e.scrollTop = k | 0, u = e.scrollTop;
  }, this.maxScrollTop = function() {
    return w;
  }, this.maxScrollLeft = function() {
    return o;
  }, this.disable = function() {
    for (s = n.firstChild; s; )
      de = s.nextSibling, e.appendChild(s), s = de;
    e === n.parentNode && e.removeChild(n);
  }, this.enable = function() {
    if (s = e.firstChild, s !== n) {
      for (; s; )
        de = s.nextSibling, n.appendChild(s), s = de;
      e.appendChild(n), this.calibrate();
    }
  }, this.calibrate = function(k) {
    var O = e.clientWidth === D, E, L, pe;
    u = e.scrollTop, p = e.scrollLeft, !(O && e.clientHeight === z && n.offsetHeight === P && h === e.scrollWidth && y === e.scrollHeight && !k) && ((a || l) && (L = this.left(), pe = this.top(), this.left(-e.scrollLeft), this.top(-e.scrollTop)), E = kr(e), (!O || k) && (i.display = "block", i.width = "auto", i.paddingRight = "0px", g = Math.max(0, e.scrollWidth - e.clientWidth), g && (g += parseFloat(E.paddingLeft) + (oo ? parseFloat(E.paddingRight) : 0))), i.display = "inline-block", i.position = "relative", i.overflow = "visible", i.verticalAlign = "top", i.boxSizing = "content-box", i.width = "100%", i.paddingRight = g + "px", oo && (i.paddingBottom = E.paddingBottom), D = e.clientWidth, z = e.clientHeight, h = e.scrollWidth, y = e.scrollHeight, o = e.scrollWidth - D, w = e.scrollHeight - z, P = n.offsetHeight, i.display = "block", (L || pe) && (this.left(L), this.top(pe)));
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
    var s = (n.type || "x,y").toLowerCase(), a = ~s.indexOf("x") || ~s.indexOf("y"), l = s.indexOf("rotation") !== -1, u = l ? "rotation" : a ? "x" : "left", p = a ? "y" : "top", h = !!(~s.indexOf("x") || ~s.indexOf("left") || s === "scroll"), y = !!(~s.indexOf("y") || ~s.indexOf("top") || s === "scroll"), g = n.minimumMovement || 2, o = Ms(i), w = mn(n.trigger || n.handle || r), D = {}, z = 0, P = !1, de = n.autoScrollMarginTop || 40, U = n.autoScrollMarginRight || 40, X = n.autoScrollMarginBottom || 40, k = n.autoScrollMarginLeft || 40, O = n.clickableTest || Gu, E = 0, L = r._gsap || se.core.getCache(r), pe = Uu(r), B = function(c, _) {
      return parseFloat(L.get(r, c, _));
    }, Y = r.ownerDocument || yt, M, I, K, _e, ae, F, xe, Ce, m, G, he, ve, ue, pt, J, Pe, le, qt, ke, Re, H, Ee, ge, Q, Ue, v, Ne, ye, wt, kt, Be, qe, Ft, Ot = function(c) {
      return Tt(c), c.stopImmediatePropagation && c.stopImmediatePropagation(), !1;
    }, fe = function C(c) {
      if (o.autoScroll && o.isDragging && (P || le)) {
        var _ = r, f = o.autoScroll * 15, d, x, b, S, T, N, A, W;
        for (P = !1, Kt.scrollTop = we.pageYOffset != null ? we.pageYOffset : Y.documentElement.scrollTop != null ? Y.documentElement.scrollTop : Y.body.scrollTop, Kt.scrollLeft = we.pageXOffset != null ? we.pageXOffset : Y.documentElement.scrollLeft != null ? Y.documentElement.scrollLeft : Y.body.scrollLeft, S = o.pointerX - Kt.scrollLeft, T = o.pointerY - Kt.scrollTop; _ && !x; )
          x = Jn(_.parentNode), d = x ? Kt : _.parentNode, b = x ? {
            bottom: Math.max(zt.clientHeight, we.innerHeight || 0),
            right: Math.max(zt.clientWidth, we.innerWidth || 0),
            left: 0,
            top: 0
          } : d.getBoundingClientRect(), N = A = 0, y && (W = d._gsMaxScrollY - d.scrollTop, W < 0 ? A = W : T > b.bottom - X && W ? (P = !0, A = Math.min(W, f * (1 - Math.max(0, b.bottom - T) / X) | 0)) : T < b.top + de && d.scrollTop && (P = !0, A = -Math.min(d.scrollTop, f * (1 - Math.max(0, T - b.top) / de) | 0)), A && (d.scrollTop += A)), h && (W = d._gsMaxScrollX - d.scrollLeft, W < 0 ? N = W : S > b.right - U && W ? (P = !0, N = Math.min(W, f * (1 - Math.max(0, b.right - S) / U) | 0)) : S < b.left + k && d.scrollLeft && (P = !0, N = -Math.min(d.scrollLeft, f * (1 - Math.max(0, S - b.left) / k) | 0)), N && (d.scrollLeft += N)), x && (N || A) && (we.scrollTo(d.scrollLeft, d.scrollTop), Je(o.pointerX + N, o.pointerY + A)), _ = d;
      }
      if (le) {
        var j = o.x, te = o.y;
        l ? (o.deltaX = j - parseFloat(L.rotation), o.rotation = j, L.rotation = j + "deg", L.renderTransform(1, L)) : I ? (y && (o.deltaY = te - I.top(), I.top(te)), h && (o.deltaX = j - I.left(), I.left(j))) : a ? (y && (o.deltaY = te - parseFloat(L.y), L.y = te + "px"), h && (o.deltaX = j - parseFloat(L.x), L.x = j + "px"), L.renderTransform(1, L)) : (y && (o.deltaY = te - parseFloat(r.style.top || 0), r.style.top = te + "px"), h && (o.deltaX = j - parseFloat(r.style.left || 0), r.style.left = j + "px")), Ce && !c && !ye && (ye = !0, Le(o, "drag", "onDrag") === !1 && (h && (o.x -= o.deltaX), y && (o.y -= o.deltaY), C(!0)), ye = !1);
      }
      le = !1;
    }, Ae = function(c, _) {
      var f = o.x, d = o.y, x, b;
      r._gsap || (L = se.core.getCache(r)), L.uncache && se.getProperty(r, "x"), a ? (o.x = parseFloat(L.x), o.y = parseFloat(L.y)) : l ? o.x = o.rotation = parseFloat(L.rotation) : I ? (o.y = I.top(), o.x = I.left()) : (o.y = parseFloat(r.style.top || (b = kr(r)) && b.top) || 0, o.x = parseFloat(r.style.left || (b || {}).left) || 0), (ke || Re || H) && !_ && (o.isDragging || o.isThrowing) && (H && (zn.x = o.x, zn.y = o.y, x = H(zn), x.x !== o.x && (o.x = x.x, le = !0), x.y !== o.y && (o.y = x.y, le = !0)), ke && (x = ke(o.x), x !== o.x && (o.x = x, l && (o.rotation = x), le = !0)), Re && (x = Re(o.y), x !== o.y && (o.y = x), le = !0)), le && fe(!0), c || (o.deltaX = o.x - f, o.deltaY = o.y - d, Le(o, "throwupdate", "onThrowUpdate"));
    }, $e = function(c, _, f, d) {
      return _ == null && (_ = -bn), f == null && (f = bn), dn(c) ? function(x) {
        var b = o.isPressed ? 1 - o.edgeResistance : 1;
        return c.call(o, (x > f ? f + (x - f) * b : x < _ ? _ + (x - _) * b : x) * d) * d;
      } : or(c) ? function(x) {
        for (var b = c.length, S = 0, T = bn, N, A; --b > -1; )
          N = c[b], A = N - x, A < 0 && (A = -A), A < T && N >= _ && N <= f && (S = b, T = A);
        return c[S];
      } : isNaN(c) ? function(x) {
        return x;
      } : function() {
        return c * d;
      };
    }, yn = function(c, _, f, d, x, b, S) {
      return b = b && b < bn ? b * b : bn, dn(c) ? function(T) {
        var N = o.isPressed ? 1 - o.edgeResistance : 1, A = T.x, W = T.y, j, te, ce;
        return T.x = A = A > f ? f + (A - f) * N : A < _ ? _ + (A - _) * N : A, T.y = W = W > x ? x + (W - x) * N : W < d ? d + (W - d) * N : W, j = c.call(o, T), j !== T && (T.x = j.x, T.y = j.y), S !== 1 && (T.x *= S, T.y *= S), b < bn && (te = T.x - A, ce = T.y - W, te * te + ce * ce > b && (T.x = A, T.y = W)), T;
      } : or(c) ? function(T) {
        for (var N = c.length, A = 0, W = bn, j, te, ce, be; --N > -1; )
          ce = c[N], j = ce.x - T.x, te = ce.y - T.y, be = j * j + te * te, be < W && (A = N, W = be);
        return W <= b ? c[A] : T;
      } : function(T) {
        return T;
      };
    }, We = function() {
      var c, _, f, d;
      xe = !1, I ? (I.calibrate(), o.minX = he = -I.maxScrollLeft(), o.minY = ue = -I.maxScrollTop(), o.maxX = G = o.maxY = ve = 0, xe = !0) : n.bounds && (c = Is(n.bounds, r.parentNode), l ? (o.minX = he = c.left, o.maxX = G = c.left + c.width, o.minY = ue = o.maxY = ve = 0) : !Bt(n.bounds.maxX) || !Bt(n.bounds.maxY) ? (c = n.bounds, o.minX = he = c.minX, o.minY = ue = c.minY, o.maxX = G = c.maxX, o.maxY = ve = c.maxY) : (_ = Is(r, r.parentNode), o.minX = he = Math.round(B(u, "px") + c.left - _.left), o.minY = ue = Math.round(B(p, "px") + c.top - _.top), o.maxX = G = Math.round(he + (c.width - _.width)), o.maxY = ve = Math.round(ue + (c.height - _.height))), he > G && (o.minX = G, o.maxX = G = he, he = o.minX), ue > ve && (o.minY = ve, o.maxY = ve = ue, ue = o.minY), l && (o.minRotation = he, o.maxRotation = G), xe = !0), n.liveSnap && (f = n.liveSnap === !0 ? n.snap || {} : n.liveSnap, d = or(f) || dn(f), l ? (ke = $e(d ? f : f.rotation, he, G, 1), Re = null) : f.points ? H = yn(d ? f : f.points, he, G, ue, ve, f.radius, I ? -1 : 1) : (h && (ke = $e(d ? f : f.x || f.left || f.scrollLeft, he, G, I ? -1 : 1)), y && (Re = $e(d ? f : f.y || f.top || f.scrollTop, ue, ve, I ? -1 : 1))));
    }, bt = function() {
      o.isThrowing = !1, Le(o, "throwcomplete", "onThrowComplete");
    }, xn = function() {
      o.isThrowing = !1;
    }, Et = function(c, _) {
      var f, d, x, b;
      c && Nt ? (c === !0 && (f = n.snap || n.liveSnap || {}, d = or(f) || dn(f), c = {
        resistance: (n.throwResistance || n.resistance || 1e3) / (l ? 10 : 1)
      }, l ? c.rotation = zi(o, d ? f : f.rotation, G, he, 1, _) : (h && (c[u] = zi(o, d ? f : f.points || f.x || f.left, G, he, I ? -1 : 1, _ || o.lockedAxis === "x")), y && (c[p] = zi(o, d ? f : f.points || f.y || f.top, ve, ue, I ? -1 : 1, _ || o.lockedAxis === "y")), (f.points || or(f) && Sr(f[0])) && (c.linkedProps = u + "," + p, c.radius = f.radius))), o.isThrowing = !0, b = isNaN(n.overshootTolerance) ? n.edgeResistance === 1 ? 0 : 1 - o.edgeResistance + 0.2 : n.overshootTolerance, c.duration || (c.duration = {
        max: Math.max(n.minDuration || 0, "maxDuration" in n ? n.maxDuration : 2),
        min: isNaN(n.minDuration) ? b === 0 || Sr(c) && c.resistance > 1e3 ? 0 : 0.5 : n.minDuration,
        overshoot: b
      }), o.tween = x = se.to(I || r, {
        inertia: c,
        data: "_draggable",
        onComplete: bt,
        onInterrupt: xn,
        onUpdate: n.fastMode ? Le : Ae,
        onUpdateParams: n.fastMode ? [o, "onthrowupdate", "onThrowUpdate"] : f && f.radius ? [!1, !0] : []
      }), n.fastMode || (I && (I._skip = !0), x.render(1e9, !0, !0), Ae(!0, !0), o.endX = o.x, o.endY = o.y, l && (o.endRotation = o.x), x.play(0), Ae(!0, !0), I && (I._skip = !1))) : xe && o.applyBounds();
    }, Qt = function(c) {
      var _ = Q, f;
      Q = Tn(r.parentNode, !0), c && o.isPressed && !Q.equals(_ || new In()) && (f = _.inverse().apply({
        x: K,
        y: _e
      }), Q.apply(f, f), K = f.x, _e = f.y), Q.equals(Bu) && (Q = null);
    }, St = function() {
      var c = 1 - o.edgeResistance, _ = pe ? Kn(Y) : 0, f = pe ? jn(Y) : 0, d, x, b;
      a && (L.x = B(u, "px") + "px", L.y = B(p, "px") + "px", L.renderTransform()), Qt(!1), Mt.x = o.pointerX - _, Mt.y = o.pointerY - f, Q && Q.apply(Mt, Mt), K = Mt.x, _e = Mt.y, le && (Je(o.pointerX, o.pointerY), fe(!0)), qe = Tn(r), I ? (We(), F = I.top(), ae = I.left()) : (ht() ? (Ae(!0, !0), We()) : o.applyBounds(), l ? (d = r.ownerSVGElement ? [L.xOrigin - r.getBBox().x, L.yOrigin - r.getBBox().y] : (kr(r)[io] || "0 0").split(" "), Pe = o.rotationOrigin = Tn(r).apply({
        x: parseFloat(d[0]) || 0,
        y: parseFloat(d[1]) || 0
      }), Ae(!0, !0), x = o.pointerX - Pe.x - _, b = Pe.y - o.pointerY + f, ae = o.x, F = o.y = Math.atan2(b, x) * Ds) : (F = B(p, "px"), ae = B(u, "px"))), xe && c && (ae > G ? ae = G + (ae - G) / c : ae < he && (ae = he - (he - ae) / c), l || (F > ve ? F = ve + (F - ve) / c : F < ue && (F = ue - (ue - F) / c))), o.startX = ae = un(ae), o.startY = F = un(F);
    }, ht = function() {
      return o.tween && o.tween.isActive();
    }, Z = function() {
      Zt.parentNode && !ht() && !o.isDragging && Zt.parentNode.removeChild(Zt);
    }, ot = function(c, _) {
      var f;
      if (!M || o.isPressed || !c || (c.type === "mousedown" || c.type === "pointerdown") && !_ && cn() - E < 30 && Pr[o.pointerEvent.type]) {
        Be && c && M && Tt(c);
        return;
      }
      if (Ue = ht(), Ft = !1, o.pointerEvent = c, Pr[c.type] ? (ge = ~c.type.indexOf("touch") ? c.currentTarget || c.target : Y, Ve(ge, "touchend", Se), Ve(ge, "touchmove", He), Ve(ge, "touchcancel", Se), Ve(Y, "touchstart", Rs)) : (ge = null, Ve(Y, "mousemove", He)), Ne = null, (!ii || !ge) && (Ve(Y, "mouseup", Se), c && c.target && Ve(c.target, "mouseup", Se)), Ee = O.call(o, c.target) && n.dragClickables === !1 && !_, Ee) {
        Ve(c.target, "change", Se), Le(o, "pressInit", "onPressInit"), Le(o, "press", "onPress"), qr(w, !0), Be = !1;
        return;
      }
      if (v = !ge || h === y || o.vars.allowNativeTouchScrolling === !1 || o.vars.allowContextMenu && c && (c.ctrlKey || c.which > 2) ? !1 : h ? "y" : "x", Be = !v && !o.allowEventDefault, Be && (Tt(c), Ve(we, "touchforcechange", Tt)), c.changedTouches ? (c = pt = c.changedTouches[0], J = c.identifier) : c.pointerId ? J = c.pointerId : pt = J = null, di++, Fu(fe), _e = o.pointerY = c.pageY, K = o.pointerX = c.pageX, Le(o, "pressInit", "onPressInit"), (v || o.autoScroll) && Bi(r.parentNode), r.parentNode && o.autoScroll && !I && !l && r.parentNode._gsMaxScrollX && !Zt.parentNode && !r.getBBox && (Zt.style.width = r.parentNode.scrollWidth + "px", r.parentNode.appendChild(Zt)), St(), o.tween && o.tween.kill(), o.isThrowing = !1, se.killTweensOf(I || r, D, !0), I && se.killTweensOf(r, {
        scrollTo: 1
      }, !0), o.tween = o.lockedAxis = null, (n.zIndexBoost || !l && !I && n.zIndexBoost !== !1) && (r.style.zIndex = e.zIndex++), o.isPressed = !0, Ce = !!(n.onDrag || o._listeners.drag), m = !!(n.onMove || o._listeners.move), n.cursor !== !1 || n.activeCursor)
        for (f = w.length; --f > -1; )
          se.set(w[f], {
            cursor: n.activeCursor || n.cursor || (pr === "grab" ? "grabbing" : pr)
          });
      Le(o, "press", "onPress");
    }, He = function(c) {
      var _ = c, f, d, x, b, S, T;
      if (!M || bo || !o.isPressed || !c) {
        Be && c && M && Tt(c);
        return;
      }
      if (o.pointerEvent = c, f = c.changedTouches, f) {
        if (c = f[0], c !== pt && c.identifier !== J) {
          for (b = f.length; --b > -1 && (c = f[b]).identifier !== J && c.target !== r; )
            ;
          if (b < 0)
            return;
        }
      } else if (c.pointerId && J && c.pointerId !== J)
        return;
      if (ge && v && !Ne && (Mt.x = c.pageX - (pe ? Kn(Y) : 0), Mt.y = c.pageY - (pe ? jn(Y) : 0), Q && Q.apply(Mt, Mt), d = Mt.x, x = Mt.y, S = Math.abs(d - K), T = Math.abs(x - _e), (S !== T && (S > g || T > g) || dr && v === Ne) && (Ne = S > T && h ? "x" : "y", v && Ne !== v && Ve(we, "touchforcechange", Tt), o.vars.lockAxisOnTouchScroll !== !1 && h && y && (o.lockedAxis = Ne === "x" ? "y" : "x", dn(o.vars.onLockAxis) && o.vars.onLockAxis.call(o, _)), dr && v === Ne))) {
        Se(_);
        return;
      }
      !o.allowEventDefault && (!v || Ne && v !== Ne) && _.cancelable !== !1 ? (Tt(_), Be = !0) : Be && (Be = !1), o.autoScroll && (P = !0), Je(c.pageX, c.pageY, m);
    }, Je = function(c, _, f) {
      var d = 1 - o.dragResistance, x = 1 - o.edgeResistance, b = o.pointerX, S = o.pointerY, T = F, N = o.x, A = o.y, W = o.endX, j = o.endY, te = o.endRotation, ce = le, be, Te, re, V, Xe, Qe;
      o.pointerX = c, o.pointerY = _, pe && (c -= Kn(Y), _ -= jn(Y)), l ? (V = Math.atan2(Pe.y - _, c - Pe.x) * Ds, Xe = o.y - V, Xe > 180 ? (F -= 360, o.y = V) : Xe < -180 && (F += 360, o.y = V), o.x !== ae || Math.abs(F - V) > g ? (o.y = V, re = ae + (F - V) * d) : re = ae) : (Q && (Qe = c * Q.a + _ * Q.c + Q.e, _ = c * Q.b + _ * Q.d + Q.f, c = Qe), Te = _ - _e, be = c - K, Te < g && Te > -g && (Te = 0), be < g && be > -g && (be = 0), (o.lockAxis || o.lockedAxis) && (be || Te) && (Qe = o.lockedAxis, Qe || (o.lockedAxis = Qe = h && Math.abs(be) > Math.abs(Te) ? "y" : y ? "x" : null, Qe && dn(o.vars.onLockAxis) && o.vars.onLockAxis.call(o, o.pointerEvent)), Qe === "y" ? Te = 0 : Qe === "x" && (be = 0)), re = un(ae + be * d), V = un(F + Te * d)), (ke || Re || H) && (o.x !== re || o.y !== V && !l) && (H && (zn.x = re, zn.y = V, Qe = H(zn), re = un(Qe.x), V = un(Qe.y)), ke && (re = un(ke(re))), Re && (V = un(Re(V)))), xe && (re > G ? re = G + Math.round((re - G) * x) : re < he && (re = he + Math.round((re - he) * x)), l || (V > ve ? V = Math.round(ve + (V - ve) * x) : V < ue && (V = Math.round(ue + (V - ue) * x)))), (o.x !== re || o.y !== V && !l) && (l ? (o.endRotation = o.x = o.endX = re, le = !0) : (y && (o.y = o.endY = V, le = !0), h && (o.x = o.endX = re, le = !0)), !f || Le(o, "move", "onMove") !== !1 ? !o.isDragging && o.isPressed && (o.isDragging = Ft = !0, Le(o, "dragstart", "onDragStart")) : (o.pointerX = b, o.pointerY = S, F = T, o.x = N, o.y = A, o.endX = W, o.endY = j, o.endRotation = te, le = ce));
    }, Se = function C(c, _) {
      if (!M || !o.isPressed || c && J != null && !_ && (c.pointerId && c.pointerId !== J && c.target !== r || c.changedTouches && !Wu(c.changedTouches, J))) {
        Be && c && M && Tt(c);
        return;
      }
      o.isPressed = !1;
      var f = c, d = o.isDragging, x = o.vars.allowContextMenu && c && (c.ctrlKey || c.which > 2), b = se.delayedCall(1e-3, Z), S, T, N, A, W;
      if (ge ? (Ye(ge, "touchend", C), Ye(ge, "touchmove", He), Ye(ge, "touchcancel", C), Ye(Y, "touchstart", Rs)) : Ye(Y, "mousemove", He), Ye(we, "touchforcechange", Tt), (!ii || !ge) && (Ye(Y, "mouseup", C), c && c.target && Ye(c.target, "mouseup", C)), le = !1, d && (z = Cs = cn(), o.isDragging = !1), Os(fe), Ee && !x) {
        c && (Ye(c.target, "change", C), o.pointerEvent = f), qr(w, !1), Le(o, "release", "onRelease"), Le(o, "click", "onClick"), Ee = !1;
        return;
      }
      for (T = w.length; --T > -1; )
        Xi(w[T], "cursor", n.cursor || (n.cursor !== !1 ? pr : null));
      if (di--, c) {
        if (S = c.changedTouches, S && (c = S[0], c !== pt && c.identifier !== J)) {
          for (T = S.length; --T > -1 && (c = S[T]).identifier !== J && c.target !== r; )
            ;
          if (T < 0 && !_)
            return;
        }
        o.pointerEvent = f, o.pointerX = c.pageX, o.pointerY = c.pageY;
      }
      return x && f ? (Tt(f), Be = !0, Le(o, "release", "onRelease")) : f && !d ? (Be = !1, Ue && (n.snap || n.bounds) && Et(n.inertia || n.throwProps), Le(o, "release", "onRelease"), (!dr || f.type !== "touchmove") && f.type.indexOf("cancel") === -1 && (Le(o, "click", "onClick"), cn() - E < 300 && Le(o, "doubleclick", "onDoubleClick"), A = f.target || r, E = cn(), W = function() {
        E !== wt && o.enabled() && !o.isPressed && !f.defaultPrevented && (A.click ? A.click() : Y.createEvent && (N = Y.createEvent("MouseEvents"), N.initMouseEvent("click", !0, !0, we, 1, o.pointerEvent.screenX, o.pointerEvent.screenY, o.pointerX, o.pointerY, !1, !1, !1, !1, 0, null), A.dispatchEvent(N)));
      }, !dr && !f.defaultPrevented && se.delayedCall(0.05, W))) : (Et(n.inertia || n.throwProps), !o.allowEventDefault && f && (n.dragClickables !== !1 || !O.call(o, f.target)) && d && (!v || Ne && v === Ne) && f.cancelable !== !1 ? (Be = !0, Tt(f)) : Be = !1, Le(o, "release", "onRelease")), ht() && b.duration(o.tween.duration()), d && Le(o, "dragend", "onDragEnd"), !0;
    }, nt = function(c) {
      if (c && o.isDragging && !I) {
        var _ = c.target || r.parentNode, f = _.scrollLeft - _._gsScrollX, d = _.scrollTop - _._gsScrollY;
        (f || d) && (Q ? (K -= f * Q.a + d * Q.c, _e -= d * Q.d + f * Q.b) : (K -= f, _e -= d), _._gsScrollX += f, _._gsScrollY += d, Je(o.pointerX, o.pointerY));
      }
    }, $t = function(c) {
      var _ = cn(), f = _ - E < 100, d = _ - z < 50, x = f && wt === E, b = o.pointerEvent && o.pointerEvent.defaultPrevented, S = f && kt === E, T = c.isTrusted || c.isTrusted == null && f && x;
      if ((x || d && o.vars.suppressClickOnDrag !== !1) && c.stopImmediatePropagation && c.stopImmediatePropagation(), f && !(o.pointerEvent && o.pointerEvent.defaultPrevented) && (!x || T && !S)) {
        T && x && (kt = E), wt = E;
        return;
      }
      (o.isPressed || d || f) && (!T || !c.detail || !f || b) && Tt(c), !f && !d && !Ft && (c && c.target && (o.pointerEvent = c), Le(o, "click", "onClick"));
    }, jt = function(c) {
      return Q ? {
        x: c.x * Q.a + c.y * Q.c + Q.e,
        y: c.x * Q.b + c.y * Q.d + Q.f
      } : {
        x: c.x,
        y: c.y
      };
    };
    return qt = e.get(r), qt && qt.kill(), i.startDrag = function(C, c) {
      var _, f, d, x;
      ot(C || o.pointerEvent, !0), c && !o.hitTest(C || o.pointerEvent) && (_ = Yn(C || o.pointerEvent), f = Yn(r), d = jt({
        x: _.left + _.width / 2,
        y: _.top + _.height / 2
      }), x = jt({
        x: f.left + f.width / 2,
        y: f.top + f.height / 2
      }), K -= d.x - x.x, _e -= d.y - x.y), o.isDragging || (o.isDragging = Ft = !0, Le(o, "dragstart", "onDragStart"));
    }, i.drag = He, i.endDrag = function(C) {
      return Se(C || o.pointerEvent, !0);
    }, i.timeSinceDrag = function() {
      return o.isDragging ? 0 : (cn() - z) / 1e3;
    }, i.timeSinceClick = function() {
      return (cn() - E) / 1e3;
    }, i.hitTest = function(C, c) {
      return e.hitTest(o.target, C, c);
    }, i.getDirection = function(C, c) {
      var _ = C === "velocity" && Nt ? C : Sr(C) && !l ? "element" : "start", f, d, x, b, S, T;
      return _ === "element" && (S = Yn(o.target), T = Yn(C)), f = _ === "start" ? o.x - ae : _ === "velocity" ? Nt.getVelocity(r, u) : S.left + S.width / 2 - (T.left + T.width / 2), l ? f < 0 ? "counter-clockwise" : "clockwise" : (c = c || 2, d = _ === "start" ? o.y - F : _ === "velocity" ? Nt.getVelocity(r, p) : S.top + S.height / 2 - (T.top + T.height / 2), x = Math.abs(f / d), b = x < 1 / c ? "" : f < 0 ? "left" : "right", x < c && (b !== "" && (b += "-"), b += d < 0 ? "up" : "down"), b);
    }, i.applyBounds = function(C, c) {
      var _, f, d, x, b, S;
      if (C && n.bounds !== C)
        return n.bounds = C, o.update(!0, c);
      if (Ae(!0), We(), xe && !ht()) {
        if (_ = o.x, f = o.y, _ > G ? _ = G : _ < he && (_ = he), f > ve ? f = ve : f < ue && (f = ue), (o.x !== _ || o.y !== f) && (d = !0, o.x = o.endX = _, l ? o.endRotation = _ : o.y = o.endY = f, le = !0, fe(!0), o.autoScroll && !o.isDragging))
          for (Bi(r.parentNode), x = r, Kt.scrollTop = we.pageYOffset != null ? we.pageYOffset : Y.documentElement.scrollTop != null ? Y.documentElement.scrollTop : Y.body.scrollTop, Kt.scrollLeft = we.pageXOffset != null ? we.pageXOffset : Y.documentElement.scrollLeft != null ? Y.documentElement.scrollLeft : Y.body.scrollLeft; x && !S; )
            S = Jn(x.parentNode), b = S ? Kt : x.parentNode, y && b.scrollTop > b._gsMaxScrollY && (b.scrollTop = b._gsMaxScrollY), h && b.scrollLeft > b._gsMaxScrollX && (b.scrollLeft = b._gsMaxScrollX), x = b;
        o.isThrowing && (d || o.endX > G || o.endX < he || o.endY > ve || o.endY < ue) && Et(n.inertia || n.throwProps, d);
      }
      return o;
    }, i.update = function(C, c, _) {
      if (c && o.isPressed) {
        var f = Tn(r), d = qe.apply({
          x: o.x - ae,
          y: o.y - F
        }), x = Tn(r.parentNode, !0);
        x.apply({
          x: f.e - d.x,
          y: f.f - d.y
        }, d), o.x -= d.x - x.e, o.y -= d.y - x.f, fe(!0), St();
      }
      var b = o.x, S = o.y;
      return Qt(!c), C ? o.applyBounds() : (le && _ && fe(!0), Ae(!0)), c && (Je(o.pointerX, o.pointerY), le && fe(!0)), o.isPressed && !c && (h && Math.abs(b - o.x) > 0.01 || y && Math.abs(S - o.y) > 0.01 && !l) && St(), o.autoScroll && (Bi(r.parentNode, o.isDragging), P = o.isDragging, fe(!0), As(r, nt), Ns(r, nt)), o;
    }, i.enable = function(C) {
      var c = {
        lazy: !0
      }, _, f, d;
      if (n.cursor !== !1 && (c.cursor = n.cursor || pr), se.utils.checkPrefix("touchCallout") && (c.touchCallout = "none"), C !== "soft") {
        for (Ps(w, h === y ? "none" : n.allowNativeTouchScrolling && r.scrollHeight === r.clientHeight == (r.scrollWidth === r.clientHeight) || n.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"), f = w.length; --f > -1; )
          d = w[f], ii || Ve(d, "mousedown", ot), Ve(d, "touchstart", ot), Ve(d, "click", $t, !0), se.set(d, c), d.getBBox && d.ownerSVGElement && h !== y && se.set(d.ownerSVGElement, {
            touchAction: n.allowNativeTouchScrolling || n.allowEventDefault ? "manipulation" : h ? "pan-y" : "pan-x"
          }), n.allowContextMenu || Ve(d, "contextmenu", Ot);
        qr(w, !1);
      }
      return Ns(r, nt), M = !0, Nt && C !== "soft" && Nt.track(I || r, a ? "x,y" : l ? "rotation" : "top,left"), r._gsDragID = _ = "d" + Xu++, Qn[_] = o, I && (I.enable(), I.element._gsDragID = _), (n.bounds || l) && St(), n.bounds && o.applyBounds(), o;
    }, i.disable = function(C) {
      for (var c = o.isDragging, _ = w.length, f; --_ > -1; )
        Xi(w[_], "cursor", null);
      if (C !== "soft") {
        for (Ps(w, null), _ = w.length; --_ > -1; )
          f = w[_], Xi(f, "touchCallout", null), Ye(f, "mousedown", ot), Ye(f, "touchstart", ot), Ye(f, "click", $t, !0), Ye(f, "contextmenu", Ot);
        qr(w, !0), ge && (Ye(ge, "touchcancel", Se), Ye(ge, "touchend", Se), Ye(ge, "touchmove", He)), Ye(Y, "mouseup", Se), Ye(Y, "mousemove", He);
      }
      return As(r, nt), M = !1, Nt && C !== "soft" && Nt.untrack(I || r, a ? "x,y" : l ? "rotation" : "top,left"), I && I.disable(), Os(fe), o.isDragging = o.isPressed = Ee = !1, c && Le(o, "dragend", "onDragEnd"), o;
    }, i.enabled = function(C, c) {
      return arguments.length ? C ? o.enable(c) : o.disable(c) : M;
    }, i.kill = function() {
      return o.isThrowing = !1, o.tween && o.tween.kill(), o.disable(), se.set(w, {
        clearProps: "userSelect"
      }), delete Qn[r._gsDragID], o;
    }, i.revert = function() {
      this.kill(), this.styles && this.styles.revert();
    }, ~s.indexOf("scroll") && (I = i.scrollProxy = new qu(r, Yu({
      onKill: function() {
        o.isPressed && Se(null);
      }
    }, n)), r.style.overflowY = y && !no ? "auto" : "hidden", r.style.overflowX = h && !no ? "auto" : "hidden", r = I.content), l ? D.rotation = 1 : (h && (D[u] = 1), y && (D[p] = 1)), L.force3D = "force3D" in n ? n.force3D : !0, Il(Ms(i)), i.enable(), i;
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
    var a = Yn(n), l = Yn(i), u = a.top, p = a.left, h = a.right, y = a.bottom, g = a.width, o = a.height, w = l.left > h || l.right < p || l.top > y || l.bottom < u, D, z, P;
    return w || !s ? !w : (P = (s + "").indexOf("%") !== -1, s = parseFloat(s) || 0, D = {
      left: Math.max(p, l.left),
      top: Math.max(u, l.top)
    }, D.width = Math.min(h, l.right) - D.left, D.height = Math.min(y, l.bottom) - D.top, D.width < 0 || D.height < 0 ? !1 : P ? (s *= 0.01, z = D.width * D.height, z >= g * o * s || z >= l.width * l.height * s) : D.width > s && D.height > s);
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
$.registerPlugin(q);
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
        var M, I;
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
        const u = a ? document.createElement("div") : l == null ? void 0 : l.querySelector(".owow-marquee-inner");
        if (u == null || u.classList.add("owow-marquee-inner"), !s || !l || !u)
          throw console.error({
            targetContainer: s,
            outerContainer: l,
            innerContainer: u
          }), new Error("Invalid marquee DOM structure");
        i.meta.sourceDOM = s.cloneNode(!0), i.meta.target = s, u.append(...s.childNodes), l.append(u), s == null || s.append(l), $.set(u, { display: "inline-flex" });
        const p = s.getBoundingClientRect(), h = u.getBoundingClientRect(), y = p.width + h.width, g = document.createDocumentFragment(), o = [];
        let w = h.width;
        if (!y || !w)
          return;
        for (; w <= y; ) {
          const K = u.cloneNode(!0);
          w += h.width, o.push(K);
        }
        g.append(...o), l.append(g);
        const D = $.context(() => {
          $.set(l, {
            x: 0,
            force3D: !0,
            width: w,
            display: "flex",
            flexWrap: "nowrap"
          });
        }), z = $.utils.pipe(
          (K) => Math.floor(K * 1e3) / 1e3,
          $.quickSetter(l, "x", "px")
        ), P = $.utils.wrap(0, -h.width), de = $.utils.normalize(0, -h.width);
        let U, X, k, O, E, L, pe, B;
        const Y = $.ticker.add(() => {
          var K, _e;
          switch (B = $.ticker.deltaRatio(), X = $.utils.interpolate(
            X ?? 0,
            i.meta.scrollTrigger.getVelocity(),
            0.5 * B
          ), k = X * i.meta.velocity, i.meta.direction) {
            case "ltr":
              U = -1, k = -Math.abs(k);
              break;
            case "rtl":
              U = 1, k = Math.abs(k);
              break;
            case "scroll":
              U = i.meta.scrollTrigger.direction ?? 1;
              break;
            case "scroll-reverse":
              U = -(i.meta.scrollTrigger.direction ?? 1), k = -k;
          }
          O = $.getProperty(l, "x"), E = i.meta.speed * -U, L = (E - k) * B, pe = P(O + L), z(pe), (_e = (K = i.meta).onUpdate) == null || _e.call(K, de(pe));
        });
        return (I = (M = i.meta).onCreated) == null || I.call(M), () => {
          var K;
          for (D.kill(!0), $.ticker.remove(Y), s == null || s.replaceChildren(...i.meta.sourceDOM.childNodes); o.length; )
            (K = o.pop()) == null || K.remove();
        };
      },
      {
        shouldResetOnResize: [document.body, "horizontal"],
        ...n
      }
    );
  }
}
$.registerPlugin(q);
const { wrap: Ku, normalize: Zu, interpolate: Ju } = $.utils, ec = { display: "inline-flex" }, tc = "owow-marquee-outer", nc = "owow-marquee-inner";
function yc(t, e = {}, r = {}) {
  const n = oe(
    e,
    De,
    Ks(["onUpdate", "onCreated", "beforeCreate"])
  ), i = oe(
    e,
    De,
    js(["onUpdate", "onCreated"]),
    Rr(me(Ut, De)),
    pi
  ), s = Yt(() => q.create(i.scrollTriggerVars ?? {})), a = yi(t), l = me(
    xt(lc(i.createDOM ?? !0)),
    xt(
      me(
        it(ic),
        it(rc(i, n, s()))
      )
    ),
    Lt("create marquee instances", { config: i })
  );
  return xi(() => {
    const p = l(a);
    return () => oe(
      p,
      Lt(),
      rn(on((h) => h.revert()))
    );
  }, De(r));
}
function rc(t, e, r) {
  var s;
  (s = e.beforeCreate) == null || s.call(e);
  const n = Yt(Ia());
  let i = 0;
  return (a) => {
    const l = (M = a.rects.innerRect.width, I = a.rects.boundingWidth) => oe(
      M > 0 && I > 0,
      Vn(Ql, new Error("Zero width")),
      it(
        me(
          () => M <= I,
          mi(() => {
            const K = a.dom.innerContainer.cloneNode(!0);
            return i = M + a.rects.innerRect.width, n().append(K), l(i, I), n();
          }, n)
        )
      )
    ), u = oc(a.dom, t), p = $.quickSetter(a.dom.outerContainer, "x", "px"), h = t.stopOnDrag ?? !0, y = me(ju(1e3), p), g = Ku(0, -a.rects.innerRect.width), o = Zu(0, -a.rects.innerRect.width);
    let w, D, z, P, de, U, X, k, O, E, L;
    const pe = Yt(
      () => $.ticker.add(() => {
        var M;
        switch (O = (u == null ? void 0 : u.x) ?? 0, E ?? (E = O), L = ((u == null ? void 0 : u.isDragging) || (u == null ? void 0 : u.isPressed)) ?? !1, D = $.ticker.deltaRatio(), P = Ju(
          P ?? 0,
          r.getVelocity(),
          0.5 * D
        ), z = P * (t.scrollVelocity || 0), t.direction || "rtl") {
          case "ltr":
            w = -1, z = -Math.abs(z);
            break;
          case "rtl":
            w = 1, z = Math.abs(z);
            break;
          case "scroll":
            w = r.direction ?? 1;
            break;
          case "scroll-reverse":
            w = -(r.direction ?? 1), z = -z;
        }
        de = $.getProperty(a.dom.outerContainer, "x"), de -= E, U = (t.speed ?? 1) * -w, X = L && h ? 0 : (U - z) * D, k = g(de + X + O), E = O, y(k), (M = e.onUpdate) == null || M.call(e, o(k));
      })
    );
    me(
      l,
      it(La(a.dom.outerContainer)),
      on(
        (M) => $.set(M, {
          x: 0,
          force3D: !0,
          width: i,
          display: "flex",
          flexWrap: "nowrap"
        })
      ),
      pe,
      () => {
        var M;
        return (M = e.onCreated) == null ? void 0 : M.call(e, { draggable: u });
      }
    )();
    function Y() {
      u == null || u.kill(), $.ticker.remove(pe()), a.dom.target.replaceChildren(...a.dom.targetClone.childNodes);
    }
    return Object.freeze({ revert: Y });
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
    gi((n) => $.registerPlugin(n))
  ), oe(
    e.draggable,
    Or(
      (n) => n ?? !1,
      () => ($.registerPlugin(er), er.create(r(), {
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
      gi(({ target: a, innerContainer: l, outerContainer: u }) => {
        zs(!!t, Boolean, () => {
          l.append(...a.childNodes), u.append(l), a.append(u);
        }), $.set(l, ec);
      }),
      hi(new Error("Invalid marquee DOM.")),
      sn(e)
    );
  };
}
function Bs(t, e) {
  return me(
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
      const l = $.utils.toArray(e);
      for (const g of l)
        if (!(g instanceof HTMLElement))
          throw new TypeError("Target should be HTML Element");
      const u = i.meta.childSplit = new a(e, {
        type: "lines",
        linesClass: "owow-split-child",
        ...De(r.childSplitVars)
      }), p = i.meta.parentSplit = new a(e, {
        type: "lines",
        linesClass: "owow-split-parent",
        ...De(r.parentSplitVars)
      }), h = {
        y: (g, o) => {
          const w = parseFloat(getComputedStyle(o).lineHeight);
          return isNaN(w) ? $.getProperty(o, "height") : w;
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
        i.meta.setup = $.set(p.lines, { overflow: "hidden" }), i.meta.tween = $.fromTo(u.lines, h, y);
      }), () => {
        u.revert(), s.kill(!0);
      };
    }, n);
  }
}
function xc(t, e, r = {}) {
  const n = oe(
    e,
    De,
    Rr(me(Ut, De)),
    pi
  ), i = hi(
    n.SplitText,
    new Error("Missing `SplitText` GSAP member plugin.")
  ), s = me(
    yi,
    Lt(),
    xt(
      (p) => oe(
        i,
        it((h) => ({
          childSplit: new h(p, {
            type: "lines",
            linesClass: "owow-split-child",
            ...n.childSplitVars
          }),
          parentSplit: new h(p, {
            type: "lines",
            linesClass: "owow-split-parent",
            ...n.parentSplitVars
          })
        })),
        sn(Nr())
      )
    )
  ), a = {
    y: (p, h) => {
      const y = parseFloat(getComputedStyle(h).lineHeight);
      return isNaN(y) ? $.getProperty(h, "height") : y;
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
    const p = s(t), h = $.context(() => {
      Fs(
        p,
        on(({ parentSplit: y, childSplit: g }) => {
          $.set(y.lines, { overflow: "hidden" }), $.fromTo(g.lines, a, l);
        })
      );
    });
    return () => {
      rn(
        p,
        on(({ childSplit: y }) => y.revert())
      ), h.kill(!0);
    };
  }, De(r));
}
$.registerPlugin(q);
function ac(t, e = {}, r = {}) {
  const n = oe(e, De, Ks(["updater"])), i = oe(
    e,
    De,
    js(["updater"]),
    Rr(me(Ut, De)),
    pi
  ), s = (h) => () => h.progress, a = (h = 1) => (y) => n.updater ? n.updater(y, h) : $.utils.interpolate(100 * h, -100 * h, y), l = (h, y, g) => me(s(h), a(g), y, hr), u = me(
    yi,
    xt(
      uc(i.createDOM ?? !0, "owow-parallax-outer", "owow-parallax-inner")
    ),
    xt(
      it((h) => {
        const y = q.create({
          trigger: h.outer,
          start: "top bottom",
          end: "bottom top",
          ...i.scrollTriggerVars
        }), g = $.quickSetter(h.inner, "y", i.cssUnit ?? "%"), o = $.quickSetter(h.inner, "x", i.cssUnit ?? "%"), w = Ba(h.inner, "data-parallax-speed");
        return Object.freeze({
          dom: h,
          scrollTrigger: y,
          updateY: l(y, g, w ?? i.speed),
          updateX: l(y, o, w ?? i.speed),
          destroy: () => y.kill(),
          revert: () => h.outer.replaceWith(h.original)
        });
      })
    ),
    xt($i),
    Mr(Dr)
  );
  return xi(() => {
    const h = u(t), y = $.ticker.add(() => {
      rn(h, ({ updateY: g }) => {
        g();
      });
    });
    return () => {
      $.ticker.remove(y), rn(h, (g) => {
        g.revert(), g.destroy();
      });
    };
  }, De(r));
}
function uc(t, e, r) {
  const n = me(
    vi("div"),
    lo((i) => i.classList.add(e))
  );
  return me(
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
    Rr(me(Ut, De)),
    pi
  ), i = n.size ?? 1.5, s = me(
    yi,
    xt(fc(n.createDOM ?? !0, "owow-diorama-outer", "owow-diorama-inner")),
    xt(
      it(
        (l) => Object.freeze({
          dom: l,
          outerRect: l.outer.getBoundingClientRect(),
          revert: () => {
            l.outer.replaceWith(l.original);
          }
        })
      )
    )
  );
  return xi(() => {
    const l = s(t), u = $.context(() => {
      oe(
        xt(l, $i),
        Mr(Dr),
        rn(({ dom: h, outerRect: y }) => {
          $.set(h.outer, { height: y.height, overflow: "hidden" }), $.set(h.inner, { height: y.height * i });
        })
      );
    }), p = oe(
      xt(
        l,
        me(
          it((h) => {
            const y = $.utils.interpolate(
              -(h.outerRect.height * i - h.outerRect.height),
              0
            );
            return ac(h.dom.inner, {
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
      u.kill(!0), rn(p, (h) => h()), rn(l, me(on((h) => h.revert())));
    };
  }, De(r));
}
function fc(t, e, r) {
  const n = me(
    vi("div"),
    lo((i) => i.classList.add(e))
  );
  return me(
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
