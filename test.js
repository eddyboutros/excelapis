const express = require('express');
const app = express();
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const excel = require('read-excel-file/node');
app.use(cors());

app.get('/getAvailableExcelFiles', function (req, res) {
  const directoryPath = process.cwd();

  fs.readdir(directoryPath, function(err, files) {
    if (err) {
      return console.log('Unable to scan directory: ' + err);
    }

    const excelFiles = files.filter(function(file) {
      return path.extname(file).toLowerCase() === '.xlsx' || path.extname(file).toLowerCase() === '.xls';
    });

    const names = excelFiles.map(function(file) {
      return { name: file };
    });

    res.send(names);
  });
});

app.get('/readExcelData/:fileName', function (req, res) {
  const fileName = req.params.fileName;
  const directoryPath = process.cwd();

  excel(directoryPath + "/" + fileName).then((rows) => {
    res.send(rows);
  }).catch((error) => {
    res.send("File does not exist!");
  });
});

/*for local server*/
/*app.listen(8080, function () {
  console.log('Server is running on 8080');
});*/

/*process.env.PORT is for render.com. Environment variable PORT is created*/
const port = process.env.PORT;
app.listen(port, function () {
  console.log('Server is running on ' + port);
});