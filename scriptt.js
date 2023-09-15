const brightnessRange = document.getElementById('brightnessRange');
const imageCanvas = document.getElementById('imageCanvas');
const imageInput = document.getElementById('imageInput');
const ctx = imageCanvas.getContext('2d');
let img = new Image();
let originalImageData;
let currentImageData;

imageInput.addEventListener('change', () => {
    const file = imageInput.files[0];
    if (file) {
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            imageCanvas.width = img.width;
            imageCanvas.height = img.height;
            ctx.drawImage(img, 0, 0);
            originalImageData = ctx.getImageData(0, 0, img.width, img.height);
            currentImageData = new ImageData(new Uint8ClampedArray(originalImageData.data), img.width, img.height);
            applyBrightness();
        };
    }
});


brightnessRange.addEventListener('input', () => {
    applyBrightness();
    redrawImage();
});



function saveImage() {
    const downloadLink = document.createElement('a');
    downloadLink.href = imageCanvas.toDataURL('image/png');
    downloadLink.download = 'edited_image.png';
    downloadLink.click();
}

function applyBrightness() {
    const brightnessValue = parseFloat(brightnessRange.value);
    const imageData = currentImageData.data;

    for (let i = 0; i < imageData.length; i += 4) {
        imageData[i] = Math.min(255, originalImageData.data[i] * (brightnessValue / 300));
        imageData[i + 1] = Math.min(255, originalImageData.data[i + 1] * (brightnessValue / 300));
        imageData[i + 2] = Math.min(255, originalImageData.data[i + 2] * (brightnessValue / 300));
    }
}

function redrawImage() {
    ctx.putImageData(currentImageData, 0, 0);
}
