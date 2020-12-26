import fs from 'fs';
import path from 'path';

let cnt = 0;
let classCntMap = new Map<number, number>();

while (true) {
    let filename: string = `test (${cnt}).txt`;
    if (fs.existsSync(filename) === false) {
        console.log('search done');
        break;
    }
    let data = fs.readFileSync(filename).toString('utf8');
    data = data.split('\n')[0];
    let splt = data.split(' ');
    let classType: number = Number(splt[0]);

    if (classCntMap.has(classType) === false) {
        classCntMap.set(classType, 0);
    }

    classCntMap.set(classType, classCntMap.get(classType) + 1);

    //console.log('done ' + filename);

    cnt++;
}

for (let [key, value] of classCntMap) {
    let numTest: number = Math.ceil(value * 0.2);
    classCntMap.set(key, numTest);
}

let rootDir: string = process.cwd();
cnt = 0;

let trainData: string = '';
let testData: string = '';

while (true) {
    let filename: string = `test (${cnt}).txt`;
    if (fs.existsSync(filename) === false) {
        console.log('split done');
        break;
    }
    let data = fs.readFileSync(filename).toString('utf8');
    data = data.split('\n')[0];
    let splt = data.split(' ');
    let classType: number = Number(splt[0]);

    let finalName: string = path.join(rootDir, filename);

    if (classCntMap.has(classType) === false || classCntMap.get(classType) <= 0) {
        trainData += finalName + '\n';
    } else {
        classCntMap.set(classType, classCntMap.get(classType) - 1);
        testData += finalName + '\n';
    }

    //console.log('done ' + filename);

    cnt++;
}

fs.writeFileSync('./train.txt', trainData, 'utf8');
fs.writeFileSync('./val.txt', testData, 'utf8');
