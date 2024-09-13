import definePlugin from "@utils/types";

export default definePlugin({
    name: "BrightnessControl",
    description: "Allows manual adjustment of the Discord interface brightness via Vencord settings.",
    authors: ["Blysen"],
    settings: [
        {
            id: "brightness",
            name: "Adjust Brightness",
            type: "slider",
            value: 70, // Valor inicial de brilho
            min: 0,
            max: 100,
            step: 1,  // Ajuste preciso para o slider
            render: (value) => `Brightness: ${value}%`, // Exibir o valor atual do brilho
            onChange: (value) => {
                this.applyBrightness(value);
            }
        }
    ],
    start() {
        const savedBrightness = this.settings.get("brightness");
        this.applyBrightness(savedBrightness || 70); // Aplica o valor salvo ou o valor inicial
    },
    stop() {
        this.removeBrightness();
    },
    applyBrightness(value) {
        const style = document.getElementById('brightness-control-style') || document.createElement('style');
        style.id = 'brightness-control-style';
        style.textContent = `
            body, html, .appMount_ea7e65 {
                filter: brightness(${value}%) !important;
            }
        `;
        if (!document.getElementById('brightness-control-style')) {
            document.head.appendChild(style);
        }
    },
    removeBrightness() {
        const style = document.getElementById('brightness-control-style');
        if (style) {
            style.remove();
        }
    }
});
