const express = require('express');
const crypto = require('crypto');
const fs = require('fs');

const app = express();
app.use(express.json());

// Generate keys and save them in a file
app.get('/generate-keys-file', (req, res) => {
    const keyCount = 200; // Number of keys to generate
    const prefix = "FRXE_"; // Key prefix
    const keys = [];

    // Generate keys
    for (let i = 0; i < keyCount; i++) {
        const randomKey = prefix + crypto.randomBytes(8).toString('hex'); // Format: FRXE_xxxxx
        keys.push(randomKey);
    }

    // Save keys to a file
    const filePath = 'keys.txt';
    fs.writeFileSync(filePath, keys.join('\n'));

    // Send the file to the client
    res.download(filePath, 'keys.txt', (err) => {
        if (err) {
            console.error('Error sending the file:', err);
        } else {
            console.log('File sent successfully!');
        }
    });
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
