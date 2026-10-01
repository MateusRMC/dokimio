export default function manifest() {
  return {
    id: "/",
    name: "Dokimio",
    short_name: "Dokimio",
    description: "Write and nothing more",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#fcfcfb",
    theme_color: "#fcfcfb",
    icons: [
      {
        src: "/icons/d-logo-whitebg.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
