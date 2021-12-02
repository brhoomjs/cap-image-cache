## Introduction

Easy way to cache images with angular + capacitor or with (ionic + capacitor)

## Compatibility

- [x] Angular + ionic + capacitor
      Whoever **ionic** is an **optional** package.

## Installation

To use this package you have to make sure you've already install capacitor successfully.

1.  use `npm install cap-image-cache`
2.  import it intro the main module file **app.module.ts** by adding `CapImageCacheModule.forRoot(config)` into the imports array.
3.  import it into your child module or page module by adding `CapImageCacheModule`
4.  add `[cache-img]="urlString"` into your desired element `<img>` or `<div>`
5.  add `[bg]="true"` if you want to add it as `background-image`

## Example

```
<div [bg]="true" [cache-img]="'https://example.com/image.jpg">
	<p>Hello, World!</p>
</div>
```

or
`<img [bg]="true" [cache-img]="'https://example.com/image.jpg" />`

## Configuration

```
const config = {
	cachePath: 'CACHE_IMAGES'
}
CapImageCacheModule.forRoot(config)
```

## To-Do

- [ ] Remove `[bg]` and auto detect element type
- [ ] Add Lazy-Loading indector
- [ ] Add on-view port loading
