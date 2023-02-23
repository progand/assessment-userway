# My assessment result

> **Important!** You will only need `process.js` file that is a UMD module written on vanilla JS with no dependencies.
> All other tools like _Vite_ was used for development of demo page only (to speed up this process a bit).

## Example of usage on any site with images

#### With `<script>` tag:

```html
<script src="/process.js" type="text/javascript"></script>
<script>
  processImages();
</script>
```

#### Load via JS

```js
var script = document.createElement("script");
script.src = "/process.js";
script.type = "text/javascript";
script.onload = function () {
  processImages();
};
document.body.appendChild(script);
```
