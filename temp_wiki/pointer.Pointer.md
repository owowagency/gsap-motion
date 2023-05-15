# Class: Pointer

[pointer](../wiki/pointer).Pointer

## Table of contents

### Constructors

- [constructor](../wiki/pointer.Pointer#constructor)

### Properties

- [clientX](../wiki/pointer.Pointer#clientx)
- [clientY](../wiki/pointer.Pointer#clienty)
- [motion](../wiki/pointer.Pointer#motion)
- [normalX](../wiki/pointer.Pointer#normalx)
- [normalY](../wiki/pointer.Pointer#normaly)
- [observable](../wiki/pointer.Pointer#observable)
- [subscriptions](../wiki/pointer.Pointer#subscriptions)
- [viewHeight](../wiki/pointer.Pointer#viewheight)
- [viewWidth](../wiki/pointer.Pointer#viewwidth)
- [\_instance](../wiki/pointer.Pointer#_instance)

### Accessors

- [instance](../wiki/pointer.Pointer#instance)

### Methods

- [destroy](../wiki/pointer.Pointer#destroy)

## Constructors

### constructor

• `Private` **new Pointer**()

Utility for doing stuff with the mouse/pointer.

**`Example`**

```ts
// Make a custom cursor that copies the current pointer position
gsap.ticker.add(() => {
   gsap.set("#custom-cursor", {
     x: Pointer.instance.clientX,
     y: Pointer.instance.clientY
   })
})
```

#### Defined in

[pointer.ts:20](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L20)

## Properties

### clientX

• **clientX**: `number`

Pointer absolute x position

#### Defined in

[pointer.ts:37](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L37)

___

### clientY

• **clientY**: `number`

Pointer absolute y position

#### Defined in

[pointer.ts:39](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L39)

___

### motion

• `Readonly` **motion**: [`Motion`](../wiki/motion.Motion)<{ `label`: `string`  }\>

Internal motion instance

#### Defined in

[pointer.ts:51](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L51)

___

### normalX

• **normalX**: `number` = `0.5`

Pointer normalized x position (0 to 1)

#### Defined in

[pointer.ts:42](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L42)

___

### normalY

• **normalY**: `number` = `0.5`

Pointer normalized y position (0 to 1)

#### Defined in

[pointer.ts:44](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L44)

___

### observable

• `Readonly` **observable**: `Observable`<`MouseEvent`\>

#### Defined in

[pointer.ts:46](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L46)

___

### subscriptions

• `Private` **subscriptions**: `Subscription`[] = `[]`

#### Defined in

[pointer.ts:29](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L29)

___

### viewHeight

• **viewHeight**: `number` = `window.innerHeight`

Window inner height

#### Defined in

[pointer.ts:34](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L34)

___

### viewWidth

• **viewWidth**: `number` = `window.innerWidth`

Window inner width

#### Defined in

[pointer.ts:32](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L32)

___

### \_instance

▪ `Static` `Private` **\_instance**: [`Pointer`](../wiki/pointer.Pointer)

#### Defined in

[pointer.ts:6](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L6)

## Accessors

### instance

• `Static` `get` **instance**(): [`Pointer`](../wiki/pointer.Pointer)

Get the current singleton Pointer instance.

#### Returns

[`Pointer`](../wiki/pointer.Pointer)

#### Defined in

[pointer.ts:25](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L25)

## Methods

### destroy

▸ **destroy**(): `void`

Destroys this instance, clearing any subscriptions and making it eligible for garbage collection.
Note that referencing `Pointer.instance` will create a new instance.

#### Returns

`void`

#### Defined in

[pointer.ts:78](https://github.com/owowagency/gsap-motion/blob/b906818/lib/pointer.ts#L78)
