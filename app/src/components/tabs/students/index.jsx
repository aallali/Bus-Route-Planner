/* eslint-disable react-hooks/exhaustive-deps */
import { Table } from "react-bootstrap";
import Autocomplete from "react-autocomplete";
import { useEffect, useState } from "react";
import { updateData } from "../../../utils/dataHooks";
const headers = [
  "التلميـــــــذ(ة)",
  "رقم العقـــد",
  "القســـــــم",
  "المحطـــــــة",
  "هاتــــــف التلميذ(ة)",
  "ولي الأمر",
  "هاتف ولي الامر",
  "السكن",
  // "استعمال الزمن",
];
const studInfoSkeleton = {
  contractID: "",
  name: "",
  classe: "",
  station: "",
  phoneNumber: "",
  address: "",
  parent: "",
  parentNumber: "",
};
function trimAllProps(obj = {}) {
  for (let key in obj) {
    if (typeof obj[key] === "string") {
      obj[key] = obj[key].trim();
    }
  }
  return obj;
}
function InputAutoComplete({ property, stateValue, callback, options }) {
  return (
    <Autocomplete
      getItemValue={(item) => item}
      items={options}
      inputProps={{ className: "form-control input-sm" }}
      renderItem={(item, isHighlighted) => (
        <div
          key={`${property}-${item}`}
          style={{
            background: isHighlighted ? "lightgray" : "white",
          }}
        >
          {item}
        </div>
      )}
      value={stateValue}
      onChange={(e) =>
        callback((prev) => ({ ...prev, [property]: e.target.value }))
      }
      onSelect={(val) => callback((prev) => ({ ...prev, [property]: val }))}
    />
  );
}
export default function Students({ globData }) {
  const [students, updateStudents] = useState(globData.students);

  const options = {
    classe: Array.from(new Set(students.map((l) => l.classe))),
    // school: Array.from(new Set(students.map((l) => l.school))),
    station: Array.from(new Set(students.map((l) => l.station))),
    address: Array.from(new Set(students.map((l) => l.address))),
    schedule: Array.from(new Set(students.map((l) => l.schedule))),
  };

  const [studInfo, setStudInfo] = useState(studInfoSkeleton);
  const [isValidStudInfo, setValidStudInfo] = useState(false);

  useEffect(() => {
    const {
      name,
      classe,
      station,
      phoneNumber,
      address,
      parent,
      parentNumber,
    } = studInfo;
    if (
      name &&
      classe &&
      station &&
      phoneNumber &&
      address &&
      parent &&
      parentNumber
    ) {
      setValidStudInfo(true);
    } else setValidStudInfo(false);
  }, [studInfo]);

  function addNewStudent() {
    if (isValidStudInfo) {
      updateStudents((prev) => [
        ...prev.filter((l) => l.contractID !== studInfo.contractID),
        trimAllProps(studInfo),
      ]);

      setStudInfo(studInfoSkeleton);
    }
    return;
  }
  function deleteStudentRecord(contractID) {
    if (window.confirm("هل انت متأكد من حدف هادا التلميد من قاعدة البيانات ؟"))
      updateStudents((prev) => prev.filter((l) => l.contractID !== contractID));
  }
  function modifyStudentRecord(contractID) {
    setStudInfo(students.find((l) => l.contractID === contractID));
  }

  useEffect(() => {
    if (students.length) updateData(students, "students");
  }, [students]);
  return (
    <>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#({students.length})</th>
            {headers.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              {isValidStudInfo ? (
                <input
                  type="button"
                  value="save"
                  className="btn btn-primary"
                  onClick={addNewStudent}
                />
              ) : null}
            </td>
            <td>
              <InputAutoComplete
                property="name"
                stateValue={studInfo["name"]}
                callback={setStudInfo}
                options={[]}
              />
            </td>
            <td>
              <InputAutoComplete
                property="contractID"
                stateValue={studInfo["contractID"]}
                callback={setStudInfo}
                options={[]}
              />
            </td>
            <td>
              <InputAutoComplete
                property="classe"
                stateValue={studInfo["classe"]}
                callback={setStudInfo}
                options={options.classe}
              />
            </td>
            <td>
              <InputAutoComplete
                property="station"
                stateValue={studInfo["station"]}
                callback={setStudInfo}
                options={options.station}
              />
            </td>
            <td>
              <InputAutoComplete
                property="phoneNumber"
                stateValue={studInfo["phoneNumber"]}
                callback={setStudInfo}
                options={[]}
              />
            </td>
            <td>
              <InputAutoComplete
                property="parent"
                stateValue={studInfo["parent"]}
                callback={setStudInfo}
                options={[]}
              />
            </td>
            <td>
              <InputAutoComplete
                property="parentNumber"
                stateValue={studInfo["parentNumber"]}
                callback={setStudInfo}
                options={[]}
              />
            </td>
            <td>
              <InputAutoComplete
                property="address"
                stateValue={studInfo["address"]}
                callback={setStudInfo}
                options={options.address}
              />
            </td>
          </tr>
          {students
            .sort(
              (a, b) =>
                parseInt(a.contractID.split("/")[1]) -
                parseInt(b.contractID.split("/")[1])
            )
            .map((l, i) => (
              <tr key={i + "student-row"} className="text-nowrap">
                <td>
                  <button
                    className="bg-danger"
                    onClick={() => deleteStudentRecord(l.contractID)}
                  >
                    احدف
                  </button>
                  <button
                    type="button"
                    className="bg-success"
                    onClick={() => modifyStudentRecord(l.contractID)}
                  >
                    عدل
                  </button>
                </td>
                <td>{l.name}</td>
                <td>{l.contractID}</td>
                <td>{l.classe}</td>

                <td>{l.station}</td>
                <td>{l.phoneNumber}</td>
                <td>{l.parent}</td>
                <td>{l.parentNumber}</td>
                <td>{l.address}</td>
                {/* <td>
                  <button>افتح</button>
                </td> */}
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  );
}
