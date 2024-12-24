function aggregateClassSchedules(myData) {
    if (JSON.stringify(myData) === JSON.stringify({})) return;

    const classStation = {};
    const classes = Array.from(new Set(myData.students.map((l) => l.classe)));

    for (let i in myData.students) {
        const student = myData.students[i];

        if (classStation[student.classe] == null) classStation[student.classe] = { stations: {} };
        if (classStation[student.classe].stations[student.station] == null) classStation[student.classe].stations[student.station] = [];

        const allStudents = classStation[student.classe]["stations"][student.station];
        classStation[student.classe]["stations"][student.station] = Array.from(
            new Set([...allStudents, `${student.name} : [${student.phoneNumber?.replace("-", "") || student.parentNumber}]`])
        );
    }

    for (let i in classes) {
        const classe = classes[i];
        const emploi = myData.schedule[classe];
        if (emploi) {
            for (let x = 0; x < 5; x++) {
                emploi[`day${x + 1}`].forEach((el, i) => (emploi[`day${x + 1}`][i] = parseInt(el.split(":")[0])));

                const mTimes = emploi[`day${x + 1}`].filter((n) => n <= 12);
                const eTimes = emploi[`day${x + 1}`].filter((n) => n > 12);

                if (mTimes.length || eTimes.length) classStation[classe][`day${x + 1}`] = {};
                if (mTimes.length) {
                    classStation[classe][`day${x + 1}`].morning = {
                        start: Math.min(...mTimes),
                        end: Math.max(...mTimes) + 1,
                    };
                }
                if (eTimes.length)
                    classStation[classe][`day${x + 1}`].evening = {
                        start: Math.min(...eTimes),
                        end: Math.max(...eTimes) + 1,
                    };
            }
        }
    }

    const allTimes = {};
    for (let i = 0; i < 5; i++) {
        const meTime = classes.map((k) => {
            return [classStation[k].stations, classStation[k][`day${i + 1}`]?.morning, classStation[k][`day${i + 1}`]?.evening];
        });

        // log(classsStation)
        function mergeStations(statosList) {
            let obj = {};
            statosList.forEach((el) => {
                for (let k in el) {
                    obj[k] = [...(obj[k] || []), ...el[k]];
                }
            });
            obj = JSON.stringify(obj) === JSON.stringify({}) ? undefined : obj;

            return obj;
        }

        allTimes[`day${i + 1}`] = {
            8: {
                stations: mergeStations(meTime.filter((l) => l[1]?.start === 8).map((l) => l[0])),
            },
            9: {
                stations: mergeStations(meTime.filter((l) => l[1]?.start === 9).map((l) => l[0])),
            },
            10: {
                in: {
                    stations: mergeStations(meTime.filter((l) => l[1]?.start === 10).map((l) => l[0])),
                },
                out: {
                    stations: mergeStations(meTime.filter((l) => l[1]?.end === 10).map((l) => l[0])),
                },
            },
            12: {
                stations: mergeStations(meTime.filter((l) => l[1]?.end === 12).map((l) => l[0])),
            },
            14: {
                stations: mergeStations(meTime.filter((l) => l[2]?.start === 14).map((l) => l[0])),
            },
            15: {
                stations: mergeStations(meTime.filter((l) => l[2]?.start === 15).map((l) => l[0])),
            },
            16: {
                in: {
                    stations: mergeStations(meTime.filter((l) => l[2]?.start === 16).map((l) => l[0])),
                },
                out: {
                    stations: mergeStations(meTime.filter((l) => l[2]?.end === 16).map((l) => l[0])),
                },
            },
            18: {
                stations: mergeStations(meTime.filter((l) => l[2]?.end === 18).map((l) => l[0])),
            },
        };
        if (allTimes[`day${i + 1}`][8].stations === undefined) delete allTimes[`day${i + 1}`][8];
        if (allTimes[`day${i + 1}`][9].stations === undefined) delete allTimes[`day${i + 1}`][9];
        if (allTimes[`day${i + 1}`][12].stations === undefined) delete allTimes[`day${i + 1}`][12];
        if (allTimes[`day${i + 1}`][14].stations === undefined) delete allTimes[`day${i + 1}`][14];
        if (allTimes[`day${i + 1}`][15].stations === undefined) delete allTimes[`day${i + 1}`][15];
        if (allTimes[`day${i + 1}`][18].stations === undefined) delete allTimes[`day${i + 1}`][18];

        if (allTimes[`day${i + 1}`][10].in.stations === undefined) delete allTimes[`day${i + 1}`][10].in;
        if (allTimes[`day${i + 1}`][10].out.stations === undefined) delete allTimes[`day${i + 1}`][10].out;
        if (Object.keys(allTimes[`day${i + 1}`][10]) == 0) delete allTimes[`day${i + 1}`][10];

        if (allTimes[`day${i + 1}`][16].in.stations === undefined) delete allTimes[`day${i + 1}`][16].in;
        if (allTimes[`day${i + 1}`][16].out.stations === undefined) delete allTimes[`day${i + 1}`][16].out;
        if (Object.keys(allTimes[`day${i + 1}`][16]) == 0) delete allTimes[`day${i + 1}`][16];

        if (Object.keys(allTimes[`day${i + 1}`]) == 0) delete allTimes[`day${i + 1}`];
    }

    return allTimes;
}


export default aggregateClassSchedules;