const express = require("express");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

app.post("/", function (req, res) {
  //   console.log(req.body);
  const reqSudoku = req.body;

  const chunkedArr = [];
  const size = 9;
  //  convert array in to row subarray

  let copied = [...reqSudoku]; // ES6 destructuring
  const numOfChild = Math.ceil(copied.length / size); // Round up to the nearest integer
  for (let i = 0; i < numOfChild; i++) {
    chunkedArr.push(copied.splice(0, size));
  }

  //  convert array in to column subarray

  const chunkedColArr = [];
  for (let i = 0; i < size; i++) {
    const chunkedColArrTemp = [];
    chunkedArr.map((val, key) => {
      chunkedColArrTemp.push(val[i]);
    });
    chunkedColArr.push(chunkedColArrTemp);
  }

  // find max filled row or column
  let optedcol = "";
  chunkedColArr.map((val, key) => {
    let count = 0;
    let i = val.length;

    while (i--) {
      if (val[i] !== null) count++;
    }
    if (count > 3) {
      optedcol = key;
    }
  });
  let optedrow = "";

  if (!optedcol) {
    chunkedArr.map((val, key) => {
      let count = 0;
      let i = val.length;

      while (i--) {
        if (val[i] !== null) count++;
      }
      if (count > 3) {
        optedrow = key;
      }
    });
  }
  let filablesArr = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  if (optedcol) {
  }
  if (optedrow) {
    let copyfilablesArr1 = [...filablesArr];
    chunkedArr[optedrow].map((val, key) => {
      if (val !== null) {
        const index = copyfilablesArr1.indexOf(val);
        if (index > -1) {
          copyfilablesArr1.splice(index, 1);
        }
      }
    });

    chunkedArr[optedrow].map((val, key) => {
      if (val === null) {
        let copyfilablesArr2 = [...filablesArr];

        const chunkedColKeyArr = chunkedColArr[key];
        chunkedColKeyArr.map((val, key) => {
          if (val !== null) {
            const index = copyfilablesArr2.indexOf(val);
            if (index > -1) {
              copyfilablesArr2.splice(index, 1);
            }
          }
        });
        const intersacted = copyfilablesArr1.filter((value) =>
          copyfilablesArr2.includes(value)
        );
        chunkedArr[optedrow][key] = intersacted[intersacted.length - 1];
        const ind = copyfilablesArr1.indexOf(val);
        if (ind > -1) {
          copyfilablesArr1.splice(ind, 1);
        }
      }
    });
  }

  res.send(chunkedArr);
});

app.listen(3000, () => {
  console.log("Sudoku app started on port: 3000");
});
