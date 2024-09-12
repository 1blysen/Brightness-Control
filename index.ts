import definePlugin from "@utils/types";

export default definePlugin({
    name: "BrightnessControl",
    description: "Allows manual adjustment, toggling, and persistent saving of the Discord interface brightness.",
    authors: ["1blysen"],
    start() {
        this.createBrightnessControl();
        this.loadBrightnessSetting();
        this.setBrightnessEnabled(this.isBrightnessEnabled()); // Load brightness state
    },
    stop() {
        this.removeBrightnessControl();
        this.removeBrightness();
    },
    createBrightnessControl() {
        // Container for the controls
        const controlContainer = document.createElement('div');
        controlContainer.id = 'brightness-control-container';
        controlContainer.style.position = 'fixed';
        controlContainer.style.bottom = '10px';
        controlContainer.style.right = '10px';
        controlContainer.style.zIndex = '9999';
        controlContainer.style.backgroundColor = '#333';
        controlContainer.style.padding = '10px';
        controlContainer.style.borderRadius = '5px';
        controlContainer.style.color = '#fff';
        controlContainer.style.fontFamily = 'Arial, sans-serif';
        controlContainer.style.fontSize = '14px';

        // Close Button
        const closeButton = document.createElement('button');
        closeButton.id = 'brightness-close-button';
        closeButton.textContent = '×'; // Unicode for multiplication sign (X)
        closeButton.style.position = 'absolute';
        closeButton.style.top = '5px';
        closeButton.style.right = '5px';
        closeButton.style.width = '25px';
        closeButton.style.height = '25px';
        closeButton.style.backgroundColor = '#444';
        closeButton.style.border = 'none';
        closeButton.style.borderRadius = '50%';
        closeButton.style.color = '#fff';
        closeButton.style.fontSize = '18px';
        closeButton.style.cursor = 'pointer';
        closeButton.addEventListener('click', () => {
            this.removeBrightnessControl();
        });

        // Toggle Button
        const toggleButton = document.createElement('button');
        toggleButton.id = 'brightness-toggle-button';
        toggleButton.textContent = this.isBrightnessEnabled() ? 'Disable Brightness' : 'Enable Brightness';
        toggleButton.style.marginBottom = '10px';
        toggleButton.style.width = '100%';
        toggleButton.style.padding = '5px';
        toggleButton.style.backgroundColor = '#444';
        toggleButton.style.border = 'none';
        toggleButton.style.borderRadius = '5px';
        toggleButton.style.color = '#fff';
        toggleButton.style.cursor = 'pointer';
        toggleButton.addEventListener('click', () => {
            const isEnabled = toggleButton.textContent.includes('Enable');
            this.setBrightnessEnabled(!isEnabled);
        });

        // Brightness Slider
        const label = document.createElement('label');
        label.textContent = 'Brightness:';
        label.style.marginRight = '10px';

        const slider = document.createElement('input');
        slider.type = 'range';
        slider.min = '0';
        slider.max = '100';
        slider.value = localStorage.getItem('brightnessValue') || '70'; // Load saved value or default to 70
        slider.style.verticalAlign = 'middle';
        slider.style.cursor = 'pointer';
        slider.addEventListener('input', () => {
            this.applyBrightness(slider.value);
            localStorage.setItem('brightnessValue', slider.value); // Save value to localStorage
        });

        controlContainer.appendChild(closeButton);
        controlContainer.appendChild(toggleButton);
        controlContainer.appendChild(label);
        controlContainer.appendChild(slider);
        document.body.appendChild(controlContainer);
    },
    removeBrightnessControl() {
        const controlContainer = document.getElementById('brightness-control-container');
        if (controlContainer) {
            controlContainer.remove();
        }
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
    },
    setBrightnessEnabled(enabled) {
        const toggleButton = document.getElementById('brightness-toggle-button');
        if (enabled) {
            this.applyBrightness(localStorage.getItem('brightnessValue') || '70');
            toggleButton.textContent = 'Disable Brightness';
        } else {
            this.removeBrightness();
            toggleButton.textContent = 'Enable Brightness';
        }
    },
    isBrightnessEnabled() {
        // Check if brightness is enabled based on the button text or localStorage
        return localStorage.getItem('brightnessEnabled') === 'true';
    }
});
