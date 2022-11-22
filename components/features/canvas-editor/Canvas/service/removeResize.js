export default function removeResize(text) {
  text.setControlsVisibility({
    tl: false,
    bl: false,
    mb: false,
    br: false,
    tr: false,
    mt: false,
  });
}
