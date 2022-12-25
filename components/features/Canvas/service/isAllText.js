function isAllText(activeObject) {
  const type = activeObject.get('type');
  if (type === 'activeSelection') {
    const result = [];
    activeObject.forEachObject((obj) => {
      if (obj.get('type') !== 'textbox') result.push(false);
      result.push(true);
    });
    if (result.includes(false)) return false;
    return true;
  }
  return false;
}

export default isAllText;
