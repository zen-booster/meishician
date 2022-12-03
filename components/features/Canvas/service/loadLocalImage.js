function loadLocalImage() {
  const imagesJSON = localStorage.getItem('images');
  if (!imagesJSON) return null;
  return JSON.parse(imagesJSON);
}

export default loadLocalImage;
