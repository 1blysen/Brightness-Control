import definePlugin from "@utils/types";

// Assuming there's a method to inject settings UI into Vencord
export default definePlugin({
    name: "BrightnessControl",
    description: "Integrates a brightness control into the Vencord settings menu.",
    authors: ["1blysen"],
    start() {
        console.log("Starting BrightnessControl plugin...");
        this.addSettingsPanel();
        this.loadBrightnessSetting();
    },
    stop() {
        console.log("Stopping BrightnessControl plugin...");
        this.removeSettingsPanel();
        this.removeBrightness();
    },
    addSettingsPanel() {
        console.log("Adding brightness control to settings panel...");
        
        // Get the Vencord settings container element
        const settingsContainer = document.querySelector('.vencord-settings-container');
        if (!settingsContainer) {
            console.error("Settings container not found.");
            return;
        }

        // Create the brightness control section
        const brightnessSection = document.createElement('div');
        brightnessSection.id = 'brightness-settings-section';
        brightnessSection.style.padding = '10px';
        brightnessSection.style.borderBottom = '1px solid #ddd';

        const title = document.createElement('h3');
        title.textContent = 'Brightness Control';
        brightnessSection.appendChild(title);

        const sliderLabel = document.createElement('label');
        sliderLabel.textContent = 'Brightness:';
        sliderLabel.style.display = 'block';
        sliderLabel.style.marginBottom = '5px';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = localStorage.getItem('brightnessValue') || '70'; // Default value
        slider.style.width = '100%';
        slider.addEventListener('input', () => {
            this.applyBrightness(slider.value);
            localStorage.setItem('brightnessValue', slider.value); // Save value to localStorage
        });

        brightnessSection.appendChild(sliderLabel);
        brightnessSection.appendChild(slider);
        settingsContainer.appendChild(brightnessSection);

        console.log("Brightness control added to settings panel.");
    },
    removeSettingsPanel() {
        console.log("Removing brightness control from settings panel...");
        const brightnessSection = document.getElementById('brightness-settings-section');
        if (brightnessSection) {
            brightnessSection.remove();
        }
    },
    applyBrightness(value) {
        console.log(`Applying brightness: ${value}%`);
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
        console.log("Removing brightness effect...");
        const style = document.getElementById('brightness-control-style');
        if (style) {
            style.remove();
        }
    },
    loadBrightnessSetting() {
        console.log("Loading brightness setting...");
        const brightnessValue = localStorage.getItem('brightnessValue');
        if (brightnessValue) {
            this.applyBrightness(brightnessValue);
        }
    }
});
