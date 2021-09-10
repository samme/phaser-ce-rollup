/* global DEBUG */

import logo from './assets/phaser.png';

// See rollup.config.js
console.info('debug', DEBUG);

// eslint-disable-next-line no-new
new Phaser.Game({
  enableDebug: DEBUG,
  width: 1024,
  height: 768,
  state: {
    init: function () {
      console.log('game.config', this.game.config);
    },

    preload: function () {
      this.load.image('logo', logo);
    },

    create: function () {
      const logo = this.add.image(512, 384, 'logo');
      logo.anchor.set(0.5, 0.5);
    },

    render: function () {
      this.game.debug.phaser(8, 16);
    }
  }
});
