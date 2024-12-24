const { log } = console;
const datas = {
  "schedule": {
    "1APIC-10": {
      "class": "1APIC-10",
      "day1": [
        "8:30 ← 9:30",
        "10:30 ← 11:30",
        "11:30 ← 12:30",
        "9:30 ← 10:30",
        "15:30 ← 16:30",
        "16:30 ← 17:30",
        "17:30 ← 18:30"
      ],
      "day2": [],
      "day3": [],
      "day4": [
        "10:30 ← 11:30",
        "11:30 ← 12:30"
      ],
      "day5": [
        "9:30 ← 10:30",
        "10:30 ← 11:30",
        "11:30 ← 12:30"
      ]
    },
    "2APIC-1": {
      "class": "2APIC-1",
      "day1": [
        "8:30 ← 9:30",
        "9:30 ← 10:30"
      ],
      "day2": [
        "15:30 ← 16:30",
        "14:30 ← 15:30",
        "16:30 ← 17:30",
        "17:30 ← 18:30"
      ],
      "day3": [],
      "day4": [],
      "day5": []
    },
    "1APIC-9": {
      "class": "1APIC-9",
      "day1": [
        "9:30 ← 10:30",
        "8:30 ← 9:30"
      ],
      "day2": [],
      "day3": [],
      "day4": [],
      "day5": []
    },
    "3APIC-4": {
      "class": "3APIC-4",
      "day1": [
        "8:30 ← 9:30",
        "9:30 ← 10:30"
      ],
      "day2": [],
      "day3": [],
      "day4": [
        "8:30 ← 9:30",
        "9:30 ← 10:30"
      ],
      "day5": []
    }
  },
  "students": [
    {
      "contractID": "2023/01",
      "name": "أحمد علي",
      "classe": "2APIC-1",
      "station": "مكتبة الطالب",
      "phoneNumber": "06.61.06.61.06",
      "address": "مرجان 2",
      "parent": "خديجة علي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3300
    },
    {
      "contractID": "2023/02",
      "name": "محمد الغزواني",
      "classe": "2APIC-1",
      "station": "حديقة مكتبة القراء",
      "phoneNumber": "06.61.06.61.06",
      "address": "اناسي",
      "parent": "عائشة الغزواني",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3150
    },
    {
      "contractID": "2023/03",
      "name": "ياسين بن شرقي",
      "classe": "2APIC-5",
      "station": "ملاعب القرب",
      "phoneNumber": "00",
      "address": "مرجان 2",
      "parent": "ليلى بن شرقي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 2650
    },
    {
      "contractID": "2023/04",
      "name": "إيمان الباز",
      "classe": "2APIC-1",
      "station": "السوق الممتاز الأناسي",
      "phoneNumber": "00",
      "address": "اناسي",
      "parent": "عبدالله الباز",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3300
    },
    {
      "contractID": "2023/07",
      "name": "سلمى حمدي",
      "classe": "TCSF-5",
      "school": "anassi 2",
      "station": "مقهى بلقاضي",
      "phoneNumber": "07.61.06.61.06",
      "address": "النعيم",
      "parent": "مريم حمدي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3600
    },
    {
      "contractID": "2023/08",
      "name": "نور الزهراء غازي",
      "classe": "2BAC_SH1",
      "station": "مجزرة الريف شارع النخلة",
      "phoneNumber": "00",
      "address": "مرجان 2",
      "parent": "سعاد غازي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3800
    },
    {
      "contractID": "2023/09",
      "name": "ليلى باحقي",
      "classe": "2APIC-3",
      "school": "anassi 2",
      "station": "صيدلية الخليل",
      "phoneNumber": "06.61.06.61.06",
      "address": "المنتزه 1",
      "parent": "زينب باحقي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3800
    },
    {
      "contractID": "2023/10",
      "name": "ماجد خولقي",
      "classe": "1APIC-9",
      "station": "مكتب العمران",
      "phoneNumber": "06.61.06.61.06",
      "address": "رياض الزيتون",
      "parent": "فاطمة خولقي",
      "parentNumber": "06.61.06.61.06",
      "school": "anassi 2",
      "totalAmountToPay": 2500
    },
    {
      "contractID": "2023/11",
      "name": "هدى برشاش",
      "classe": "1APIC-10",
      "station": "ملاعب القرب",
      "phoneNumber": "-",
      "address": "مرجان 2",
      "parent": "علي برشاش",
      "parentNumber": "06.61.06.61.06",
      "school": "anassi 2",
      "totalAmountToPay": 3800
    },
    {
      "contractID": "2023/12",
      "name": "أميرة اللوزاتي",
      "classe": "3APC2",
      "station": "زنقة الملبنة",
      "phoneNumber": "00",
      "address": "مرجان 2",
      "parent": "حسن اللوزاتي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3800
    },
    {
      "contractID": "2023/14",
      "name": "آية تيسي",
      "classe": "2APIC-1",
      "station": "مقهى أمورال",
      "phoneNumber": "00",
      "address": "المنتزه 2 الدالية",
      "parent": "نورة تيسي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3600
    },
    {
      "contractID": "2023/15",
      "name": "بسمة اليعقوبي",
      "classe": "2APIC-1",
      "station": "جهة الحرث",
      "phoneNumber": "06.61.06.61.06",
      "address": "المنتزه 2 الدالية",
      "parent": "منى اليعقوبي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3600
    },
    {
      "contractID": "2023/16",
      "name": "دينا بن يوسف",
      "classe": "3APIC2",
      "station": "رومبوان العمارات",
      "phoneNumber": "00",
      "address": "منازل الاسماعيلية",
      "parent": "عبدالله بن يوسف",
      "parentNumber": "07.61.06.61.06",
      "totalAmountToPay": 3800
    },
    {
      "contractID": "2023/17",
      "name": "رانيا الضو",
      "classe": "2APIC3",
      "station": "الرونبوان",
      "phoneNumber": "06.61.06.61.06",
      "address": "المنتزه 1",
      "parent": "محسن الضو",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3800
    },
    {
      "contractID": "2023/18",
      "name": "آية العفر",
      "classe": "1APIC-10",
      "station": "مقهى جيرونا",
      "phoneNumber": "00",
      "address": "النعيم",
      "parent": "فاطمة العفر",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 1800
    },
    {
      "contractID": "2023/21",
      "name": "أمين الجلالي",
      "classe": "1APIC-7",
      "station": "زنقة الملبنة",
      "phoneNumber": "00",
      "address": "مرجان 2",
      "parent": "خديجة الجلالي",
      "parentNumber": "07.61.06.61.06",
      "totalAmountToPay": 3000
    },
    {
      "contractID": "2023/23",
      "name": "آية بياتي",
      "classe": "2BAC_SH1",
      "station": "مقهى بلقاضي",
      "phoneNumber": "00",
      "address": "النعيم",
      "parent": "علي بياتي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3800
    },
    {
      "contractID": "2023/24",
      "name": "عبدالله شطي",
      "classe": "2APIC-6",
      "station": "مقهى امام بريستيج",
      "phoneNumber": "00",
      "address": "اناسي 1",
      "parent": "ليلى شطي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3300
    },
    {
      "contractID": "2023/25",
      "name": "وليد خشاعي",
      "classe": "1APIC-7",
      "station": "ملاعب القرب اكسترا فينيست",
      "phoneNumber": "06.61.06.61.06",
      "address": "مرجان 2",
      "parent": "أحمد خشاعي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 2700
    },
    {
      "contractID": "2023/26",
      "name": "وجدان أبودان",
      "classe": "3APC",
      "station": "رونبوان العمارات",
      "phoneNumber": "00",
      "address": "منازل الاسماعيلية",
      "parent": "خولة أبودان",
      "parentNumber": "07.61.06.61.06",
      "totalAmountToPay": 3000
    },
    {
      "contractID": "2023/27",
      "name": "أيمن موعلي",
      "classe": "1APIC-9",
      "station": "00",
      "phoneNumber": "06.61.06.61.06",
      "address": "00",
      "parent": "مصطفى موعلي",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3800
    },
    {
      "contractID": "04/2023",
      "name": "مريم بلقايد",
      "classe": "1APIC-9",
      "station": "صيدلية المعتمد بن عباد",
      "phoneNumber": "00",
      "address": "المنتزه",
      "parent": "علي بلقايد",
      "parentNumber": "06.61.06.61.06",
      "totalAmountToPay": 3300
    }
  ],
  "paychecks": [
    {
      "id": "97cd4602-1672945671304-1adc",
      "cid": "2023/25",
      "amount": "1500",
      "date": "28/12/2022"
    },
    {
      "id": "d25f0d80-1672945429058-3f89",
      "cid": "2023/24",
      "amount": "3300",
      "date": "15/09/2022"
    },
    {
      "id": "cae85748-1672943541514-b290",
      "cid": "04/2023",
      "amount": "1200",
      "date": "15/10/2022"
    },
    {
      "id": "904f1a25-1672943422044-2a86",
      "cid": "01",
      "amount": "400",
      "date": "19/12/2022"
    },
    {
      "id": "6b0dcc65-1672942473642-3a23",
      "cid": "2023/21",
      "amount": "1500",
      "date": "02/01/2023"
    },
    {
      "id": "91fb1e3c-1672941341255-693a",
      "cid": "2023/15",
      "amount": "1500",
      "date": "04/01/2023"
    },
    {
      "id": "aac60c1b-1672941266144-65e8",
      "cid": "2023/14",
      "amount": "1500",
      "date": "04/01/2023"
    },
    {
      "id": "705b5aac-1672940985301-402d",
      "cid": "2023/12",
      "amount": "1500",
      "date": "02/12/2022"
    },
    {
      "id": "78b0fa91-1672940600442-8d4d",
      "cid": "2023/09",
      "amount": "2400",
      "date": "11/12/2022"
    },
    {
      "id": "d6d42cdd-1672927551121-f8b4",
      "cid": "2023/03",
      "amount": "500",
      "date": "06/11/2022"
    },
    {
      "id": "bdb8079a-1672912443514-de93",
      "cid": "2023/01",
      "amount": "1040",
      "date": "04/11/2022"
    },
    {
      "id": "83754dc6-1672912296452-e5d8",
      "cid": "2023/02",
      "amount": "1200",
      "date": "14/10/2022"
    },
    {
      "id": "b6993317-1672912697424-b291",
      "cid": "2023/04",
      "amount": "1200",
      "date": "15/10/2022"
    },
    {
      "id": "3b56f742-1672913966536-3e7e",
      "cid": "2023/07",
      "amount": "2100",
      "date": "02/11/2022"
    },
    {
      "id": "4cc9876d-1672927955452-13e9",
      "cid": "2023/08",
      "amount": "600",
      "date": "15/09/2022"
    },
    {
      "id": "0966fe46-1672940733080-9122",
      "cid": "2023/10",
      "amount": "500",
      "date": "15/09/2022"
    },
    {
      "id": "fbef38f2-1672940801014-3b5f",
      "cid": "2023/11",
      "amount": "900",
      "date": "15/09/2022"
    },
    {
      "id": "bff8dc97-1672941526502-ec86",
      "cid": "2023/16",
      "amount": "900",
      "date": "21/11/2022"
    },
    {
      "id": "558fcc8f-1672941627380-f6dc",
      "cid": "2023/17",
      "amount": "600",
      "date": "15/09/2022"
    },
    {
      "id": "d88b4fc6-1672942153413-bee6",
      "cid": "2023/18",
      "amount": "550",
      "date": "28/12/2022"
    },
    {
      "id": "3a3fa406-1672943292167-26fa",
      "cid": "2023/23",
      "amount": "2400",
      "date": "02/01/2023"
    },
    {
      "id": "41e8f79b-1672945861557-ded0",
      "cid": "2023/26",
      "amount": "1000",
      "date": "20/12/2022"
    },
    {
      "id": "092c9cf9-1673088098697-f2a5",
      "cid": "2023/07",
      "amount": "600",
      "date": "06/01/2023"
    }
  ]
}
console.clear();
function prepareData(myData) {
  const classStation = {};
  const classes = Array.from(new Set(myData.students.map((l) => l.classe)));

  for (let i in myData.students) {
    const student = myData.students[i];

    if (classStation[student.classe] == null) classStation[student.classe] = { stations: {} };
    if (classStation[student.classe].stations[student.station] == null) classStation[student.classe].stations[student.station] = [];

    const allStudents = classStation[student.classe]["stations"][student.station];
    classStation[student.classe]["stations"][student.station] = Array.from(new Set([...allStudents, student.name]));
  }

  for (let classe in myData.schedule) {
    const emploi = myData.schedule[classe];
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

  const allTimes = [];
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

log(prepareData(datas));
