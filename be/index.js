const express = require('express');
const path = require('path');
const processCSV = require('./processCSV');

const app = express();
const PORT = 3000;

// GET req for index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../fe/index.html'));
});
  

// API endpoint to process and return the tables
app.get('/tables', async (req, res) => {
    const csvFilePath = path.join(__dirname, 'Table_Input.csv');
    try {
        const { tableData, table2 } = await processCSV(csvFilePath);
        res.json({ table1: tableData, table2 });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
