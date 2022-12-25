function isShape(activeObject) {
  const type = activeObject.get('type');
  if (type === 'circle') return true;
  if (type === 'triangle') return true;
  if (type === 'rect' && activeObject.id !== 'background') return true;
  return false;
}

export default isShape;
