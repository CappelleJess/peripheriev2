import Phaser from 'phaser';
import MenuScene from './scenes/MenuScene';
import HelpScene from './scenes/HelpScene';
import RoomScene from './scenes/RoomScene';

const gameConfig = {
  type: Phaser.AUTO,
  width: 1024,
  height: 724,
  parent: 'phaser-container',
  backgroundColor: '#1b1f3b',
  scene: [MenuScene, HelpScene, RoomScene],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false,
    },
  },
};

export default gameConfig;