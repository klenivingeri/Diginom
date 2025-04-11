import spriteSrc from "/chxk2csydkh81.png";
export const hero = {
  name: "Herói",
  reset: 0,
  rounds: 30,
  level: 1,
  experience: {
    current: 0,
    nextLevel: 200,
  },
  health: {
    current: 100,
    max: 100,
  },
  stamina: {
    current: 50,
    max: 50,
  },
  strength: 10,
  agility: 8,
  intelligence: 6,
  speed: 1,
  critical: 0,
  defense: 5,
  attackPower: 12,
  inventory: [],
  equipped: {
    weapon: null,
    armor: null,
    accessory: null,
  },
  position: {
    x: 0,
    y: 0,
  },
  direction: "down",
  statusEffects: [],
  gold: 0,
  skills: [],
  sprite: {
    img: spriteSrc,
    height: 32,
    width: 32,
    frameCount: 4,
    boxSize: 30,
    speed: 4,
  },
  directionRowMap: {
    down: 0,
    left: 1,
    right: 2,
    up: 3,
  },
};
