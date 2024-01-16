function loadImage (url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

const formatImageData = (urls, callback) => {
  const pr = [];
  const imgs = [];
  urls.forEach((url) => {
    const p = loadImage(url).then((img) => {
      imgs.push({
        src: url,
        w: img.width,
        h: img.height
      });
    });
    pr.push(p);
  });

  Promise.all(pr)
    .then((res) => {
      callback.call(this, imgs);
    })
    .catch();
};
export { formatImageData };
