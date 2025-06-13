import Phaser from "phaser";

export default class BootScene extends Phaser.Scene {
  constructor() {
    super("BootScene");
  }  
  
  preload() {
    // Images
    this.load.image('background', 'assets/backgrounds/room.png');
    // Assets
    this.load.image('icon_examine', 'assets/images/icon_examine.png');
    this.load.image('icon_smell', 'assets/images/icon_smell.png');
    this.load.image('icon_ignore', 'assets/images/icon_ignore.png');
    this.load.image('flower', 'assets/images/flower.png');
    this.load.image('frame', 'assets/images/frame.png');
    this.load.image('frame_glow', 'assets/images/frame_glow.png');
    this.load.image('book', 'assets/images/book.png');
    this.load.image('book_glow', 'assets/images/book_glow.png');
    // Non-interactifs
    this.load.image('chair', 'assets/images/chair.png');
    this.load.image('desk', 'assets/images/desk.png');
    this.load.image('curtain', 'assets/images/curtain.png');


    // Audio
    // this.load.audio('ambience', 'assets/audio/ambience_room.mp3');
    // this.load.audio('select', 'assets/audio/memory_select.wav');

    // Curseur personnalisé
    this.load.image('cursor', 'assets/images/arrow.png');
    this.load.image('cursor_hover', 'assets/images/arrow_hover.png');
  }

  create() {
    this.scene.start("MenuScene");
  }
}