## Introduction [![npm version](https://badge.fury.io/js/cap-image-cache.svg)](https://www.npmjs.com/package/cap-image-cache)
Easy way to cache images with angular + capacitor or with (ionic + capacitor)
## Compatibility
-  [x] Angular >= 10.0
-  [x] ~~ionic >= 5.x~~ (optional)
-  [x] capacitor
## Features
-  [x] Store images inside local cache folder
-  [x] Lazy loading indector **coming soon**
-  [x] Load image once it enter the view port
-  [x] Auto detect element type ***src*** for `<img>` and ***background-image*** for other elements
## Installation
To use this package you have to make sure you've already install capacitor successfully.
1. use `npm install cap-image-cache`
2. import the module from `import { CapImageCacheModule } from "cap-image-cache";`
3. import it into the main module file **app.module.ts** by adding `CapImageCacheModule.forRoot(config)` into the imports array.
4. import it into your child module or page module by adding `CapImageCacheModule`
5. add `[cache-img]="urlString"` into your desired element `<img>` or `<div>`
6. use `[lazy]="true"` if you want to load on viewport
## Example
Cache image as element **background-image** style
```
<div [lazy]="true" cache-img="https://example.com/image.jpg">
	<p>Hello, World!</p>
</div>
```
or add image as source base64 to an existing img element
`<img [lazy]="true" cache-img="https://example.com/image.jpg" />`
## Configuration
```
const config = {
	cachePath: 'CACHE_IMAGES'
}
CapImageCacheModule.forRoot(config)
```
## To-Do
-  [x] ~~Remove `[bg]` and auto detect element type~~
- [ ] Add Lazy-Loading indector
-  [x] ~~Add on view port loading~~
## Credits
Inspired by:
- How to Cache Image Files with Ionic & Capacitor [Youtube Video](https://www.youtube.com/watch?v=l7hsRrjLGUY&t=899s) by [@saimon24](https://github.com/saimon24)