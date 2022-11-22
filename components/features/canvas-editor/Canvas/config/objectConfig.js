export const HORIZON = {
  width: 648,
  height: 360,
};

export const VERTICAL = {
  width: 360,
  height: 648,
};

export const CANVAS = {
  backgroundColor: '#DDDDDD',
  id: 'FRONT',
};

export const BACKGROUND = {
  ...HORIZON,
  fill: '#ffffff',
  strokeWidth: 0,
  selectable: false,
  evented: false,
  id: 'background',
};

export const CIRCLE = {
  radius: 50,
  fill: '#cccccc',
};

export const RECTANGLE = {
  fill: '#cccccc',
  width: 100,
  height: 100,
  angle: 0,
};

export const TRIANGLE = {
  fill: '#cccccc',
  width: 100,
  height: 100,
  angle: 0,
};

export const LINE = {
  coords: [50, 100, 250, 100],
  options: {
    stroke: '#000000',
    fill: '#000000',
    strokeWidth: 3,
  },
};

export const TEXTBOX = {
  id: Math.random(),
  editable: true,
  fill: '#000000',
  textAlign: 'left',
};
