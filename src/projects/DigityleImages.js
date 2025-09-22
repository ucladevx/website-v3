const modules = import.meta.glob("/src/assets/digityle/*.{png,jpg,jpeg,svg,PNG,JPG,JPEG,SVG}", {
  eager: true,
});

export const digityleImages = Object.keys(modules).map((path) => ({
  src: modules[path].default,
  title: path.split("/").pop().split(".")[0],
}));