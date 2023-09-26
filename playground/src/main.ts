import "./style.css";

import { createMotion } from "../../lib";

const m1 = createMotion(() => {
  console.log('create m1');
  return (destroyed) => {
    console.log('cleanup m1', {destroyed})
  }
}, {
  mediaQueryList: matchMedia("(min-width: 800px)"),
  observeWindowResize: true
})

const m2 = createMotion(() => {
  console.log('create m2');
  return (destroyed) => {
    console.log('cleanup m2', {destroyed})
  }
}, {
  mediaQueryList: matchMedia("(min-width: 900px)")
})