const fs = require('fs');
// get text file
let filename = require.resolve('./binaryInput.txt')

// sync file read operation, since we don't need to optimize for web.
const diagnosticData = fs.readFileSync(filename).toString().split(/\n/g);

// flip the axis of the 2D array
const transpose = function (matrix) {
  return matrix.reduce((prev, next) => next.map((item, i) =>
  (prev[i] || []).concat(next[i])
  ), []);
};

// get most common element in array (simplified since only 2 possible values, 0/1)
const getArrayMode = function(array) {
  const sortedArray = [...array].sort();
  const zerosCount = sortedArray.filter(v => v==='0').length
  const onesCount = sortedArray.filter(v => v==='1').length
  if (zerosCount > onesCount) {
    return '0';
  } else {
    return '1';
  }
};

// get 2D array representation of binary input data
const diagnosticDataArray = diagnosticData.map(row => {
  const rowArray = row.split('')
  return rowArray;
});

// helper utility to convert binary to decimal
const binaryToDecimal = function (binary) {
  return parseInt(binary, 2);
};

// this is where the magic happens
const gammaRate = transpose(diagnosticDataArray).map(row => {
  return getArrayMode(row);
}).join('');

// epsilon rate is just flipped gamma rate (i.e. 100110 => 011001)
const epsilonRate = gammaRate.split('').map(element => {
  // bang operator converts 1/0 to true/false, + operator converts back to Int from boolean
  return + !parseInt(element);
}).join('');

// get the submarine power consumption, which is product of gamma and epsilon rates
const powerConsumption = binaryToDecimal(gammaRate) * binaryToDecimal(epsilonRate);

const oxygenGeneratorRating = diagnosticDataArray.map(row, i => {
  // TODO
});

console.log(powerConsumption)