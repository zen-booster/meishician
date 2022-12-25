export const HORIZON = {
  width: 648,
  height: 360,
};

export const VERTICAL = {
  width: 360,
  height: 648,
};

export const CANVAS = {
  backgroundColor: '#CCCCCC',
  preserveObjectStacking: true,
  id: 'front',
};

export const BACKGROUND = {
  ...HORIZON,
  fill: '#ffffff',
  strokeWidth: 0,
  id: 'background',
  selectable: false,
  evented: false,
  lockMovementX: true,
  lockMovementY: true,
};

export const CIRCLE = {
  radius: 50,
  fill: '#cccccc',
  originX: 'center',
  originY: 'center',
  strokeWidth: 0,
  stroke: '#000000',
  strokeUniform: true,
};

export const RECTANGLE = {
  fill: '#cccccc',
  width: 100,
  height: 100,
  angle: 0,
  originX: 'center',
  originY: 'center',
  strokeWidth: 0,
  stroke: '#000000',
  strokeUniform: true,
};

export const TRIANGLE = {
  fill: '#cccccc',
  width: 100,
  height: 100,
  angle: 0,
  originX: 'center',
  originY: 'center',
  strokeWidth: 0,
  stroke: '#000000',
  strokeUniform: true,
};

export const LINE = {
  coords: [50, 100, 150, 100],
  options: {
    stroke: '#cccccc',
    fill: '#cccccc',
    strokeWidth: 3,
    originX: 'center',
    originY: 'center',
  },
};

export const TEXTBOX = {
  editable: true,
  fill: '#000000',
  textAlign: 'left',
  originX: 'center',
  originY: 'center',
};
