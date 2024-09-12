import definePlugin from "@utils/types";

export default definePlugin({
    name: "BrightnessControl",
    description: "Adjusts the brightness of the Discord interface.",
    authors: ["Blysen"],
    patches: [
        {
            find: ".app-3pQdFm { /* Atualize a classe conforme necessário */",
            replacement: {
                match: /filter: brightness\(70%\) !important;/,
                replace: `
                    filter: brightness(70%) !important;
                `
            }
        }
    ],
    start() {
        this.applyBrightness();
    },
    stop() {
        this.removeBrightness();
    },
    applyBrightness() {
        const style = document.createElement('style');
        style.id = 'brightness-control-style'; // ID para facilitar a remoção
        style.textContent = `
            .app-3pQdFm { /* Atualize a classe conforme necessário */
                filter: brightness(70%) !important;
            }
        `;
        document.head.appendChild(style);
    },
    removeBrightness() {
        const style = document.getElementById('brightness-control-style');
        if (style) {
            style.remove();
        }
    }
});
