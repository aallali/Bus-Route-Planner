function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

/**
 * Groups students by their class and station, and formats their contact information.
 *
 * @param {Array} students - List of student objects containing class, station, and contact information.
 * @returns {Object} - A nested object structure organizing students by class and station.
 */
function populateClassStation(students) {
    const classStation = {};

    students.forEach((student) => {
        const { classe, station, name, phoneNumber, parentNumber } = student;

        if (!classStation[classe]) {
            classStation[classe] = { stations: {} };
        }

        if (!classStation[classe].stations[station]) {
            classStation[classe].stations[station] = [];
        }

        const formattedContact = `${name} : [${phoneNumber?.replace("-", "") || parentNumber}]`;
        const stationStudents = classStation[classe].stations[station];

        classStation[classe].stations[station] = Array.from(new Set([...stationStudents, formattedContact]));
    });

    return classStation;
}

/**
 * Processes the schedule for a given class and updates classStation with morning and evening time ranges.
 *
 * @param {string} classe - The class being processed.
 * @param {Object} emploi - The schedule for the class.
 * @param {Object} classStation - The class station object to update.
 */
function processClassSchedule(classe, emploi, classStation) {
    Array.from({ length: 5 }, (_, dayIndex) => `day${dayIndex + 1}`).forEach((dayKey) => {
        const daySchedule = emploi[dayKey]?.map((el) => parseInt(el.split("."[0]))) || [];

        const morningTimes = daySchedule.filter((time) => time <= 12);
        const eveningTimes = daySchedule.filter((time) => time > 12);

        if (morningTimes.length || eveningTimes.length) {
            classStation[classe][dayKey] = {};
            if (morningTimes.length) {
                classStation[classe][dayKey].morning = {
                    start: Math.min(...morningTimes),
                    end: Math.max(...morningTimes) + 1,
                };
            }

            if (eveningTimes.length) {
                classStation[classe][dayKey].evening = {
                    start: Math.min(...eveningTimes),
                    end: Math.max(...eveningTimes) + 1,
                };
            }
        }
    });
}

/**
 * Merges multiple station objects into a single consolidated object.
 *
 * @param {Array} stationsList - A list of station objects to merge.
 * @returns {Object} - A merged station object.
 */
function mergeStations(stationsList) {
    return stationsList.reduce((acc, station) => {
        Object.entries(station).forEach(([key, value]) => {
            acc[key] = [...(acc[key] || []), ...value];
        });
        return acc;
    }, {});
}

/**
 * Removes empty or undefined time slots from the day's data.
 *
 * @param {Object} dayData - The day's data containing time slots.
 * @returns {Object|undefined} - Cleaned day data or undefined if empty.
 */
function removeEmptySlots(dayData) {
    const timeKeys = [8, 9, 12, 14, 15, 18];
    timeKeys.forEach((key) => {
        if (isEmpty(dayData[key]?.stations ))
            delete dayData[key]; 
    });

    [10, 16].forEach((key) => {
        const periodData = dayData[key];
        if (isEmpty(periodData?.in?.stations)) delete periodData?.in;
        if (isEmpty(periodData?.out?.stations)) delete periodData?.out;
        if (Object.keys(periodData || {}).length === 0) delete dayData[key];
    });

    return Object.keys(dayData).length ? dayData : undefined;
}

/**
 * Aggregates station data across all days and organizes them by time slots.
 *
 * @param {Array} classes - List of class names.
 * @param {Object} classStation - The class station data containing schedules and student info.
 * @returns {Object} - Aggregated station data organized by days.
 */
function aggregateAllTimes(classes, classStation) {
    const allTimes = {};

    Array.from({ length: 5 }, (_, i) => `day${i + 1}`).forEach((dayKey) => {
        const timeEntries = classes.map((classe) => [
            classStation[classe]?.stations,
            classStation[classe]?.[dayKey]?.morning,
            classStation[classe]?.[dayKey]?.evening,
        ]);

        const dayData = {
            8: { stations: mergeStations(timeEntries.filter(([_, morning]) => morning?.start === 8).map(([stations]) => stations)) },
            9: { stations: mergeStations(timeEntries.filter(([_, morning]) => morning?.start === 9).map(([stations]) => stations)) },
            10: {
                in: { stations: mergeStations(timeEntries.filter(([_, morning]) => morning?.start === 10).map(([stations]) => stations)) },
                out: { stations: mergeStations(timeEntries.filter(([_, morning]) => morning?.end === 10).map(([stations]) => stations)) },
            },
            12: { stations: mergeStations(timeEntries.filter(([_, morning]) => morning?.end === 12).map(([stations]) => stations)) },
            14: { stations: mergeStations(timeEntries.filter(([_, , evening]) => evening?.start === 14).map(([stations]) => stations)) },
            15: { stations: mergeStations(timeEntries.filter(([_, , evening]) => evening?.start === 15).map(([stations]) => stations)) },
            16: {
                in: { stations: mergeStations(timeEntries.filter(([_, , evening]) => evening?.start === 16).map(([stations]) => stations)) },
                out: { stations: mergeStations(timeEntries.filter(([_, , evening]) => evening?.end === 16).map(([stations]) => stations)) },
            },
            18: { stations: mergeStations(timeEntries.filter(([_, , evening]) => evening?.end === 18).map(([stations]) => stations)) },
        };

        const cleanedDayData = removeEmptySlots(dayData);
        if (cleanedDayData) {
            allTimes[dayKey] = cleanedDayData;
        }
    });

    return allTimes;
}

/**
 * Prepares and organizes schedule data for all students and classes.
 *
 * This function processes raw input data, grouping students by class and station, 
 * processing schedules into morning and evening times, and aggregating the results 
 * into an organized format that is easy to use for further operations.
 *
 * @param {Object} myData - Input data containing students and schedules.
 * @returns {Object} - Processed data grouped and aggregated by class and days.
 */
function aggregateClassSchedules(myData) {
    if (!myData || Object.keys(myData).length === 0) return;

    const classStation = populateClassStation(myData.students);
    const classes = [...new Set(myData.students.map((student) => student.classe))];

    classes.forEach((classe) => {
        const emploi = myData.schedule[classe];
        if (emploi) {
            processClassSchedule(classe, emploi, classStation);
        }
    });

    return aggregateAllTimes(classes, classStation);
}

export default aggregateClassSchedules;
