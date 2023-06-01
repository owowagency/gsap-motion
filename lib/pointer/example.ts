import { Pointer } from "..";
import gsap from "gsap";

const fragment = document.createDocumentFragment();
const elements = Array.from({ length: 3 }, () => {
  const el = document.createElement("div");
  const color = `rgb(${Array.from({ length: 3 }, () => Math.random())
    .map((n) => n * 255)
    .join(",")})`;

  gsap.set(el, {
    position: "fixed",
    background: `radial-gradient(circle at 25% 25%, white, ${color})`,
    width: 50,
    height: 50,
    left: -25,
    top: -25,
    borderRadius: "25px",
    pointerEvents: "none",
  });

  fragment.append(el);
  return el;
});

document.getElementById("app")!.append(fragment);

gsap.ticker.add(() => {
  let index = 0;

  for (const el of elements) {
    const progress = 0.1 + 0.05 * index;

    const x = gsap.utils.interpolate(
      gsap.getProperty(el, "x") as number,
      Pointer.instance.clientX,
      progress * gsap.ticker.deltaRatio()
    );

    const y = gsap.utils.interpolate(
      gsap.getProperty(el, "y") as number,
      Pointer.instance.clientY,
      progress * gsap.ticker.deltaRatio()
    );

    gsap.set(el, { x, y });
    index++;
  }
  Pointer.instance.clientX;
});
