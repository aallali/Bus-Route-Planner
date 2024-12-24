# Bus-Route-Planner - مخطط مسار الحافلة

**Bus Route Planner** is a serverless React application designed to streamline student transportation management. It generates optimized bus routes, organizes station stops with precise timings, and manages subscriptions for students and their guardians. The app demonstrates the integration of scheduling algorithms with external JSON data storage to solve logistical challenges effectively.

---

## Context

This project was built upon a real request from a bus company owner (January 2023) who faced challenges in writing schedules and creating roadmaps for bus drivers due to complicated schedules from different students/schools. The app was developed as a practical solution to address these issues, saving time and reducing errors in manual scheduling. By automating the process, the app not only solved a logistical problem but also improved operational efficiency for the bus company.

To demonstrate its capabilities without exposing sensitive information, fake data has been generated for demo purposes.

---

## Features

- **Dynamic Schedule Aggregation**: Processes class schedules to generate an efficient roadmap for bus drivers.
- **Optimized Driver Itinerary**: Automatically organizes station stops and timings to minimize travel time.
- **Subscription Management**: Tracks student subscriptions, payments, and facilitates coordination between parents and the bus owner.
- **External JSON Storage**: Uses a lightweight, serverless architecture powered by external JSON blob storage for data management.


---

## Screenshots

- **Student Schedule Overview**
  ![Student Schedule](./screenshot.png)


---

## Demo



---
# Documentation of `aggregateClassSchedules` function

## Overview
The `aggregateClassSchedules` function serves as the main algorithm powering the idea of organizing and structuring schedule data for students and classes. It transforms raw input data into a structured and accessible format by:

1. **Grouping Students**: Aggregating students by their classes and associated stations.
2. **Processing Schedules**: Dividing schedules into distinct morning and evening time slots.
3. **Aggregating Data**: Organizing the information by days, time slots, and stations for easy accessibility.

## Features
- **Class and Station Mapping**: Groups students by their respective classes and associated stations.
- **Time Slot Division**: Splits schedules into `morning` and `evening` periods for each day.
- **Station Aggregation**: Collates station-specific data for all classes across all days.

---

## Function Details

### `populateClassStation`
**Purpose**: Groups students by their respective classes and stations, while formatting their contact information.

**Signature**:
```javascript
function populateClassStation(students)
```

**Parameters**:
- `students` (Array): An array of student objects, each containing class, station, and contact details.

**Returns**:
- `Object`: A nested structure mapping classes to stations, with student details under each station.

---

### `processClassSchedule`
**Purpose**: Processes a class's schedule by dividing it into morning and evening time slots, and updates the respective classStation object.

**Signature**:
```javascript
function processClassSchedule(classe, emploi, classStation)
```

**Parameters**:
- `classe` (string): The name of the class.
- `emploi` (Object): The schedule associated with the class.
- `classStation` (Object): The main object storing aggregated data for classes and stations.

**Returns**:
- `void`

---

### `mergeStations`
**Purpose**: Consolidates multiple station objects into one, avoiding duplicate entries.

**Signature**:
```javascript
function mergeStations(stationsList)
```

**Parameters**:
- `stationsList` (Array): A list of station objects.

**Returns**:
- `Object`: A single consolidated station object.

---

### `removeEmptySlots`
**Purpose**: Cleans up a day's data by removing empty or undefined slots.

**Signature**:
```javascript
function removeEmptySlots(dayData)
```

**Parameters**:
- `dayData` (Object): The day's data containing time slots.

**Returns**:
- `Object|undefined`: Cleaned day data, or `undefined` if empty.

---

### `aggregateAllTimes`
**Purpose**: Aggregates station data across all days and organizes them by time slots.

**Signature**:
```javascript
function aggregateAllTimes(classes, classStation)
```

**Parameters**:
- `classes` (Array): A list of class names.
- `classStation` (Object): Aggregated class and station data.

**Returns**:
- `Object`: A structured dataset with day-wise, slot-wise, and station-wise organization.

---

### `aggregateClassSchedules`
**Purpose**: Processes and organizes schedule data for students and classes by grouping students, processing schedules, and aggregating station data.

**Signature**:
```javascript
function aggregateClassSchedules(myData)
```

**Parameters**:
- `myData` (Object): The raw input data containing student details and schedules.

**Returns**:
- `Object`: A processed dataset with class and station mappings, organized by day and time slot.

---

## Example Usage

### Input
```javascript
const inputData = {
  students: [
    {
      contractID: "2023/01",
      name: "عمر القاسمي",
      classe: "2APIC-1",
      station: "مكتبة الطالب",
      phoneNumber: "06.61.06.61.06",
      parentNumber: "06.61.06.61.06",
    },
    {
      contractID: "2023/02",
      name: "نورا العلوي",
      classe: "2APIC-1",
      station: "حديقة مكتبة القراء",
      phoneNumber: "06.61.06.61.06",
      parentNumber: "06.61.06.61.06",
    },
  ],
  schedule: {
    "2APIC-1": {
      day1: ["8:30 ← 9:30", "10:30 ← 11:30"],
      day2: ["14:30 ← 15:30"],
    },
  },
};

const result = aggregateClassSchedules(inputData);
console.log(result);
```

### Output
```javascript
{
  day1: {
    8: {
      stations: {
        "مكتبة الطالب": ["عمر القاسمي : [06.61.06.61.06]"],
        "حديقة مكتبة القراء": ["نورا العلوي : [06.61.06.61.06]"],
      },
    },
    10: {
      out: {
        stations: {
          "مكتبة الطالب": ["عمر القاسمي : [06.61.06.61.06]"],
          "حديقة مكتبة القراء": ["نورا العلوي : [06.61.06.61.06]"],
        },
      },
    },
  },
  day2: {
    14: {
      stations: {
        "مكتبة الطالب": ["عمر القاسمي : [06.61.06.61.06]"],
        "حديقة مكتبة القراء": ["نورا العلوي : [06.61.06.61.06]"],
      },
    },
  },
}
```

---

## Contact

For production implementation assistance, please reach out:  
**linkedin**: https://www.linkedin.com/in/aallali/
 

---

## License

This project is shared for demonstration purposes under the **MIT Licence**. Please contact me for production rights or commercial use.

