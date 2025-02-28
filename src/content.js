function getRandomEmoji() {
    const emojiRanges = [
        [0x1F600, 0x1F64F], // Emoticons
        [0x1F300, 0x1F5FF], // Miscellaneous Symbols and Pictographs
        [0x1F680, 0x1F6FF], // Transport and Map Symbols
        [0x1F700, 0x1F77F], // Alchemical Symbols
        [0x1F780, 0x1F7FF], // Geometric Shapes Extended
        [0x2600, 0x26FF],   // Miscellaneous Symbols
        // [0x1F800, 0x1F8FF], // Supplemental Arrows-C
        [0x1F900, 0x1F9FF], // Supplemental Symbols and Pictographs
        // [0x1FA00, 0x1FA6F], // Chess Symbols
        [0x1FA70, 0x1FAFF], // Symbols and Pictographs Extended-A
        // [0x1F1E6, 0x1F1FF], // Regional Indicator Symbols (Flags)
        [0x1F0A0, 0x1F0FF], // Playing Cards
        [0x1F030, 0x1F093], // Dominos
    ];

    const range = emojiRanges[Math.floor(Math.random() * emojiRanges.length)];
    const codePoint = Math.floor(Math.random() * (range[1] - range[0] + 1)) + range[0];
    console.log('codePoint: ' + codePoint);
    return String.fromCodePoint(codePoint);
}

function isEmojiRenderable(emoji) {
    try {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        context.canvas.width = context.canvas.height = 1;
        context.fillText(emoji, -4, 4);
        const getImageDataAplhaChannel = context.getImageData(0, 0, 1, 1).data[3];
        console.log('emoji: ' + emoji + ' has getImageDataAplhaChannel: ' + getImageDataAplhaChannel);
        return getImageDataAplhaChannel > 0; // Not a transparent pixel
    } catch (e) {
        return false
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const emojiElement = document.getElementById('emoji');
    let randomEmoji = getRandomEmoji();

    if (!isEmojiRenderable(randomEmoji)) {
        randomEmoji = '😀'; // Fallback emoji
    }

    if (emojiElement) {
        emojiElement.textContent = randomEmoji;
    } else {
        const newEmojiElement = document.createElement('div');
        newEmojiElement.id = 'emoji';
        newEmojiElement.textContent = randomEmoji;
        document.body.appendChild(newEmojiElement);
    }
});