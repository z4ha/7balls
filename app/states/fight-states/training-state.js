import FightState from './fight-state';

let utils = require('../../helpers/utils');
let { displaySingleLineMessage } = require('../../helpers/message');
let OptionsPlayerMixin = require('../mixins/options-player-mixin');

/**
 * @extends FightState
 */
export default class TrainingState extends FightState {
    options = {
        player: {
            hp: null,
            exp: null,
            lvl: null
        }
    };

    create() {
        Object.assign(this, OptionsPlayerMixin);

        this.add.image(0, 0, 'bg-training-capsule');

        this._setupWorld();
        this._setupSprite(150, 360, this.game.player);
        this._setupOrientation(this.game.player, 'left');
        this._setupPlayerOptions();
        this._setupKeyboard();

        this.displayLogo();
        displaySingleLineMessage(this.game, `${this.game.locale.TRAINING_STATE_WELCOME}`);

        utils.timeout(this, Phaser.Timer.SECOND * 5, () => {
            this.game.emit('game:training-finished');
        });

        // TODO(piecioshka): dodać countdown
    }

    update() {
        super.update();
        this._handleTrainingKeyboard();
    }

    _handleTrainingKeyboard() {
        let keyboard = this.input.keyboard;

        if (keyboard.isDown(Phaser.Keyboard.LEFT)) {
            this._setupOrientation(this.game.player, 'left');
        } else if (keyboard.isDown(Phaser.Keyboard.RIGHT)) {
            this._setupOrientation(this.game.player, 'right');
        }
    }

    render() {
        let playerSprite = this.game.player.getSprite();
        // this.game.debug.bodyInfo(playerSprite, 25, 25);
        this.game.debug.body(playerSprite);
    }
}
