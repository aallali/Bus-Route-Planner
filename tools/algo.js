// Description: This file is used to test the aggregateClassSchedulesV1 and aggregateClassSchedulesV2 functions.
import aggregateClassSchedulesV1 from './v1.js';
import aggregateClassSchedulesV2 from './v2.js';
import data from './data.json'  assert { type: "json" };
import expectedOutput from './output.json'  assert { type: "json" };

const { log } = console;

console.clear();
const dataStr = JSON.stringify(data);

const output1 = aggregateClassSchedulesV1(JSON.parse(dataStr));
const output2 = aggregateClassSchedulesV2(JSON.parse(dataStr));

// stringify each var and save into output1Str
const output1Str = JSON.stringify(output1);
const output2Str = JSON.stringify(output2);
const expectedOutputStr = JSON.stringify(expectedOutput);
// the V1 isnt clean, but its 100% correct
// so i am going to clean it up and compare the two outputs
log("output1 vs output2        :", output1Str === output2Str);
log("output1 vs expectedOutput :", output1Str === expectedOutputStr);
log("output2 vs expectedOutput :", output2Str === expectedOutputStr);
