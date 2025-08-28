const modules = import.meta.glob("/digityle/*.{png,jpg,jpeg,svg,PNG,JPG,JPEG,SVG}", {
  eager: true,
});

export const digityleImages = Object.keys(modules).map((path) => ({
  src: path.replace("/public", ""),
  title: path.split("/").pop().split(".")[0],
}));