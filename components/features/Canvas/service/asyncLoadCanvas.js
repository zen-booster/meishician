function asyncLoadCanvas(canvas, canvasData) {
  return new Promise((resolve, reject) => {
    try {
      canvas.loadFromJSON(canvasData, () => {
        resolve();
      });
    } catch (error) {
      reject(error);
    }
  });
}

export default asyncLoadCanvas;
