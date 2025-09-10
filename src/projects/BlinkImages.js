const modules = import.meta.glob("/src/assets/blink/*.{png,jpg,jpeg,svg,PNG,JPG,JPEG,SVG}", {
  eager: true,
});

export const blinkImages = Object.keys(modules).map((path) => ({
  src: modules[path].default,
  title: path.split("/").pop().split(".")[0],
}));