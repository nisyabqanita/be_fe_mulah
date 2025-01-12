const fs = require('fs');
const path = require('path');

const processCSV = (csvFilePath) => {
    return new Promise((resolve, reject) => {
        fs.readFile(csvFilePath, 'utf8', (err, data) => {
            if (err) return reject(err);

            const rows = data.split('\n');
            console.log(rows);

            const tableData = rows.slice(1).reduce((dict, row) => {
                const [index, value] = row.split(','); 
                if (index && value) { 
                    dict[index.trim()] = parseFloat(value.trim()) || 0; 
                }
                return dict;
            }, {}); 

            console.log(tableData); // debug. can remove

            const table2 = {
                Alpha: (tableData['A5'] || 0) + (tableData['A20'] || 0), 
                Beta: (tableData['A15'] || 0) / (tableData['A7'] || 1), 
                Charlie: (tableData['A13'] || 0) * (tableData['A12'] || 0), 
            };
            
            console.log(table2);

            resolve({ tableData, table2 });
        });
    });
};

module.exports = processCSV;
