import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }  
  
  preload() {
    // Images
    this.load.image('room', 'assets/images/room.png');
    this.load.image('menu-bg', 'assets/images/menu-bg.png');
    // Assets
    this.load.image('icon_examine', 'assets/images/icon_examine.png');
    this.load.image('icon_smell', 'assets/images/icon_smell.png');
    this.load.image('icon_ignore', 'assets/images/icon_ignore.png');
    this.load.image('flower', 'assets/images/flower.png');
    this.load.image('frame', 'assets/images/frame.png');
    this.load.image('book', 'assets/images/diary.png');
    this.load.image('computer', 'assets/images/computer.png');
    this.load.image('lavalamp', 'assets/images/lavalamp.png');
    this.load.image('window', 'assets/images/window.png');
    this.load.image('diskman', 'assets/images/diskman.png');
    this.load.image('rug', 'assets/images/rug.png');
    // Non-interactifs
    this.load.image('chair', 'assets/images/chair.png');
    this.load.image('nightstand', 'assets/images/nightstand.png');
    this.load.image('desk', 'assets/images/desk.png');
    this.load.image('bed', 'assets/images/bed.png');


    // Audio

    // Curseur personnalisé
    this.load.image('cursor', 'assets/images/arrow.png');
    this.load.image('cursor_hover', 'assets/images/arrow_hover.png');
  }

  create() {
    this.scene.start("RoomScene");
  }
}