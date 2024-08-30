const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const folderPath = path.join(__dirname, 'files'); // specify the folder

// Create a folder if it doesn't exist
if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath);
}

// Endpoint to create a file
app.post('/create-file', (req, res) => {
    const dateTime = new Date().toISOString().replace(/:/g, '-'); // format date-time for file name
    const fileName = `${dateTime}.txt`;
    const filePath = path.join(folderPath, fileName);
    const content = new Date().toISOString();

    fs.writeFile(filePath, content, (err) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to create file', error: err });
        }
        res.json({ message: `File ${fileName} created successfully!` });
    });
});

// Endpoint to list all text files
app.get('/list-files', (req, res) => {
    fs.readdir(folderPath, (err, files) => {
        if (err) {
            return res.status(500).json({ message: 'Failed to read directory', error: err });
        }
        const txtFiles = files.filter(file => path.extname(file) === '.txt');
        res.json(txtFiles);
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
