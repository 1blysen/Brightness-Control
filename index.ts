import { Plugin } from 'vencord';
import { injectCSS, removeCSS } from 'vencord/utils';

export default class BrightnessControl extends Plugin {
    constructor() {
        super({
            name: 'BrightnessControl',
            description: 'Adjusts the brightness of the Discord interface.',
            authors: ['Blysen'],
            version: '1.0.0',
        });
    }

    start() {
        this.applyBrightness();
    }

    stop() {
        this.removeBrightness();
    }

    applyBrightness() {
        // Adiciona o CSS para ajustar o brilho
        injectCSS(`
            .app-3pQdFm { /* Atualize a classe conforme necessário */
                filter: brightness(70%) !important;
            }
        `);
    }

    removeBrightness() {
        // Remove o CSS aplicado
        removeCSS(`
            .app-3pQdFm { /* Atualize a classe conforme necessário */
                filter: brightness(70%) !important;
            }
        `);
    }
}
