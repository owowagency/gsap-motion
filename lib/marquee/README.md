# Marquee

## Simple example

We turn the `<h1>` into an animated marquee:

```html
<h1>
  <div class="owow-marquee-outer">
    <div class="owow-marquee-inner">
      <div>TEXT</div>
    </div>
  </div>
</h1>
```

```js
// app.js
import { Marquee } from "./marquee";

const marquee = new Marquee("h1");
```

## Advanced example

```js
const marquee new Marquee("h1", {
  // marquee speed
  speed: 2,
  // animate based on scroll direction
  direction: "scroll",
  // increase speed by scroll velocity
  velocity: 0.001,
  // gets marquee cycle progress between 0 and 1
  onUpdate: (progress) => console.log(progress),
  // do something when the marquee is created, for example apply SplitText or mutate dom
  onCreate: () => console.log('created')
});


```
