import { Plugin } from 'vencord';

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
        const style = document.createElement('style');
        style.id = 'brightness-control-style'; // ID para facilitar a remoção
        style.textContent = `
            .app-3pQdFm { /* Atualize a classe conforme necessário */
                filter: brightness(70%) !important;
            }
        `;
        document.head.appendChild(style);
    }

    removeBrightness() {
        // Remove o CSS aplicado
        const style = document.getElementById('brightness-control-style');
        if (style) {
            style.remove();
        }
    }
}
