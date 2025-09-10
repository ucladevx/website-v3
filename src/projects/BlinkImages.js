const modules = import.meta.glob("/src/assets/blink/*.{png,jpg,jpeg,svg,PNG,JPG,JPEG,SVG}", {
  eager: true,
});

export const blinkImages = Object.keys(modules).map((path) => ({
  src: path.replace("/public", ""),
  title: path.split("/").pop().split(".")[0],
}));