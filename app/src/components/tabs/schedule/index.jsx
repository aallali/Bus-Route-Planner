/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from "react";
import { Table, Row, Col, Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { updateData, prepareData, guidGenerator } from "../../../utils/dataHooks";

const days = ["الأثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعه"];
const times = ["8:30-9:30", "9:30-10:30", "10:30-11:30", "11:30-12:30", "#", "14:30-15:30", "15:30-16:30", "16:30-17:30", "17:30-18:30"].map((l) =>
  l.split("-").join(" ← ")
);

export default function Schedule({ globData }) {
  const data = globData;
  const [day, updateDay] = useState(days[0]);
  const [schedules, updateSchedules] = useState(globData.schedule);
  const [allClasses, setAllClasses] = useState([]);
  const [schedule, updateSchedule] = useState({
    class: "",
    day1: [],
    day2: [],
    day3: [],
    day4: [],
    day5: [],
  });
  const [allTimes, updateAllTimes] = useState(prepareData(JSON.parse(JSON.stringify(data))));

  /**
   * local shecule updater
   */
  function saveSchedule() {
    if (schedule.class)
      updateSchedules((prev) => {
        prev[schedule.class] = { ...schedule };
        delete prev.class;
        return { ...prev };
      });
  }

  function deleteScheduleRecord(classTitle) {
    if (window.confirm("هل انت متأكد من حدف استعمال الزمن هادا من قاعدة البيانات ؟")) {
      updateSchedules((prev) => {
        delete prev[classTitle];
        return { ...prev };
      });
      updateSchedule({
        class: "",
        day1: [],
        day2: [],
        day3: [],
        day4: [],
        day5: [],
      });
    }
  }

  useEffect(() => {
    updateSchedule((prev) => {
      return { ...prev, ...schedules[schedule.class] };
    });
  }, [schedule.class]);

  useEffect(() => {
    if (data.students) {
      setAllClasses(Array.from(new Set([...Object.keys(schedules), ...data.students.map((l) => l.classe)])).sort());
      if (Object.keys(schedules).length !== 0) {
        updateData({ ...schedules }, "schedule");
      }
    }
    updateAllTimes(prepareData(JSON.parse(JSON.stringify(data))));
  }, [schedules]);

  if (!(data.students && data.schedule)) return null;
  return (
    <>
      <h3>البرنامج اليومي</h3>
      <Row>
        <Col className="col-1">اختر اليوم:</Col>

        <Col>
          <select onChange={(e) => updateDay(e.target.value)} value={day}>
            {days.map((d) => (
              <option key={d} value={d}>
                {d}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      {allTimes[`day${days.indexOf(day) + 1}`] ? (
        <Table striped bordered hover size="sm" className="table-fixed ">
          <thead>
            <tr>
              <th className="bg-primary"> </th>
              <th className="bg-warning" style={{ width: "16%" }}>
                {"8:30".split("-").reverse().join("-")}
              </th>
              <th className="bg-warning" style={{ width: "16%" }}>
                {"10:30".split("-").reverse().join("-")}
              </th>
              <th className="bg-warning" style={{ width: "16%" }}>
                {"12:30".split("-").reverse().join("-")}
              </th>
              <th className="bg-primary"></th>
              <th className="bg-warning" style={{ width: "16%" }}>
                {"14:30".split("-").reverse().join("-")}
              </th>
              <th className="bg-warning" style={{ width: "16%" }}>
                {"16:30".split("-").reverse().join("-")}
              </th>
              <th className="bg-warning" style={{ width: "16%" }}>
                {"18:30".split("-").reverse().join("-")}
              </th>
            </tr>
          </thead>
          {allTimes[`day${days.indexOf(day) + 1}`] ? (
            <>
              <tbody>
                <tr>
                  <td className="bg-primary"></td>
                  {allTimes[`day${days.indexOf(day) + 1}`][8] || allTimes[`day${days.indexOf(day) + 1}`][9] ? (
                    <td>
                      {allTimes[`day${days.indexOf(day) + 1}`][8] != null ? (
                        <>
                          <b>دخول:</b>
                          <ul>
                            {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][8].stations).map((l) => (
                              <li key={guidGenerator()}>
                                <i style={{ color: "blue" }}> محطة : {l}</i>
                                <ul>
                                  {allTimes[`day${days.indexOf(day) + 1}`][8].stations[l].map((s) => (
                                    <li key={guidGenerator()}>{s}</li>
                                  ))}
                                </ul>
                                <hr />
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}

                      {allTimes[`day${days.indexOf(day) + 1}`][9] ? (
                        <>
                          <b>دخول:</b>
                          <ul>
                            {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][9].stations).map((l) => (
                              <li key={guidGenerator()}>
                                <i style={{ color: "red" }}> محطة : {l}</i>
                                <ul>
                                  {allTimes[`day${days.indexOf(day) + 1}`][9].stations[l].map((s) => (
                                    <li key={guidGenerator()}>{s}</li>
                                  ))}
                                </ul>
                                <hr />
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </td>
                  ) : (
                    <td className="bg-secondary"></td>
                  )}
                  {allTimes[`day${days.indexOf(day) + 1}`][10] ? (
                    <td>
                      {allTimes[`day${days.indexOf(day) + 1}`][10] && allTimes[`day${days.indexOf(day) + 1}`][10]?.in ? (
                        <>
                          <b>دخول:</b>
                          <ul>
                            {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][10].in.stations).map((l) => (
                              <li key={guidGenerator()}>
                                <i style={{ color: "blue" }}> محطة : {l}</i>
                                <ul>
                                  {allTimes[`day${days.indexOf(day) + 1}`][10].in.stations[l].map((s) => (
                                    <li key={guidGenerator()}>{s}</li>
                                  ))}
                                </ul>
                                <hr />
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                      {allTimes[`day${days.indexOf(day) + 1}`][10] && allTimes[`day${days.indexOf(day) + 1}`][10]?.out ? (
                        <>
                          <b>خروج:</b>
                          <ul>
                            {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][10].out.stations).map((l) => (
                              <li key={guidGenerator()}>
                                <i style={{ color: "blue" }}> محطة : {l}</i>
                                <ul>
                                  {allTimes[`day${days.indexOf(day) + 1}`][10].out.stations[l].map((s) => (
                                    <li key={guidGenerator()}>{s}</li>
                                  ))}
                                </ul>
                                <hr />
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </td>
                  ) : (
                    <td className="bg-secondary"></td>
                  )}

                  {allTimes[`day${days.indexOf(day) + 1}`][12] ? (
                    <td>
                      <b>خروج:</b>
                      <ul>
                        {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][12].stations).map((l) => (
                          <li key={guidGenerator()}>
                            <i style={{ color: "blue" }}> محطة : {l}</i>

                            <ul>
                              {allTimes[`day${days.indexOf(day) + 1}`][12].stations[l].map((s) => (
                                <li key={guidGenerator()}>{s}</li>
                              ))}
                            </ul>
                            <hr />
                          </li>
                        ))}
                      </ul>
                    </td>
                  ) : (
                    <td className="bg-secondary"></td>
                  )}

                  <td className="bg-primary"></td>
                  {allTimes[`day${days.indexOf(day) + 1}`][14] || allTimes[`day${days.indexOf(day) + 1}`][15] ? (
                    <td>
                      {allTimes[`day${days.indexOf(day) + 1}`][14] ? (
                        <>
                          <b>دخول:</b>
                          <ul>
                            {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][14].stations).map((l) => (
                              <li key={guidGenerator()}>
                                <i style={{ color: "blue" }}> محطة : {l}</i>
                                <ul>
                                  {allTimes[`day${days.indexOf(day) + 1}`][14].stations[l].map((s) => (
                                    <li key={guidGenerator()}>{s}</li>
                                  ))}
                                </ul>
                                <hr />
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}

                      {allTimes[`day${days.indexOf(day) + 1}`][15] ? (
                        <>
                          <b>دخول:</b>
                          <ul>
                            {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][15].stations).map((l) => (
                              <li key={guidGenerator()}>
                                <i style={{ color: "red" }}> محطة : {l}</i>
                                <ul>
                                  {allTimes[`day${days.indexOf(day) + 1}`][15].stations[l].map((s) => (
                                    <li key={guidGenerator()}>{s}</li>
                                  ))}
                                </ul>
                                <hr />
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </td>
                  ) : (
                    <td className="bg-secondary"></td>
                  )}

                  {allTimes[`day${days.indexOf(day) + 1}`][16] ? (
                    <td>
                      {allTimes[`day${days.indexOf(day) + 1}`][16] && allTimes[`day${days.indexOf(day) + 1}`][16]?.in ? (
                        <>
                          <b>دخول:</b>
                          <ul>
                            {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][16].in.stations).map((l) => (
                              <li key={16 + l}>
                                <i style={{ color: "blue" }}> محطة : {l}</i>
                                <ul>
                                  {allTimes[`day${days.indexOf(day) + 1}`][16].in.stations[l].map((s) => (
                                    <li key={16 + l + "studs"}>{s}</li>
                                  ))}
                                </ul>
                                <hr />
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                      {allTimes[`day${days.indexOf(day) + 1}`][16] && allTimes[`day${days.indexOf(day) + 1}`][16]?.out ? (
                        <>
                          <b>خروج:</b>
                          <ul>
                            {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][16].out.stations).map((l) => (
                              <li key={guidGenerator()}>
                                <i style={{ color: "blue" }}> محطة : {l}</i>
                                <ul>
                                  {allTimes[`day${days.indexOf(day) + 1}`][16].out.stations[l].map((s) => (
                                    <li key={guidGenerator()}>{s}</li>
                                  ))}
                                </ul>
                                <hr />
                              </li>
                            ))}
                          </ul>
                        </>
                      ) : null}
                    </td>
                  ) : (
                    <td className="bg-secondary"></td>
                  )}
                  {allTimes[`day${days.indexOf(day) + 1}`][18] ? (
                    <>
                      <td>
                        <b>خروج:</b>
                        <ul>
                          {Object.keys(allTimes[`day${days.indexOf(day) + 1}`][18].stations).map((l) => (
                            <li key={guidGenerator()}>
                              <i style={{ color: "blue" }}> محطة : {l}</i>
                              <ul>
                                {allTimes[`day${days.indexOf(day) + 1}`][18].stations[l].map((s) => (
                                  <li key={guidGenerator()}>{s}</li>
                                ))}
                              </ul>
                              <hr />
                            </li>
                          ))}
                        </ul>
                      </td>
                    </>
                  ) : (
                    <td className="bg-secondary"></td>
                  )}
                </tr>
              </tbody>
            </>
          ) : (
            <>
              <tbody>لا شيء</tbody>
            </>
          )}
        </Table>
      ) : null}

      <hr></hr>
      <h3>إستعمالات الزمن:</h3>

      <Row>
        <Col className="col-1">المستوى/القسم:</Col>
        <Col className="col-5">
          <Row>
            <Col>
              <InputGroup size="sm" className="mb-3">
                <InputGroup.Text style={{ borderRadius: "0px" }}>
                  <select
                    value={schedule.class}
                    onChange={(e) =>
                      updateSchedule({
                        class: e.target.value,
                        day1: [],
                        day2: [],
                        day3: [],
                        day4: [],
                        day5: [],
                      })
                    }
                  >
                    <option value="" disabled={true}>
                      select
                    </option>
                    {allClasses.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </InputGroup.Text>
                <InputGroup.Text style={{ borderRadius: "0px" }}>او اكتب واحد جديد</InputGroup.Text>
                <Form.Control
                  onChange={(e) =>
                    updateSchedule({
                      class: e.target.value,
                      day1: [],
                      day2: [],
                      day3: [],
                      day4: [],
                      day5: [],
                    })
                  }
                  aria-label="Small2"
                  aria-describedby="inputGroup-sizing-sm"
                  style={{ borderRadius: "0px" }}
                />
              </InputGroup>
            </Col>
          </Row>
        </Col>
        <Col></Col>
      </Row>

      <Row>
        <Col></Col>
      </Row>
      {schedule.class ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="bg-warning"> </th>
                {times.map((l) => {
                  if (l === "#") return <th key={l + "headers"} className="bg-warning" style={{ width: "5px" }}></th>;
                  return (
                    <th key={l + "headers"} className="bg-warning">
                      {l}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {schedule &&
                days.map((d) => (
                  <tr key={d + ".emploi"}>
                    <td className="bg-warning">{d}</td>
                    {times.map((l, i) => {
                      if (l === "#") return <td key={l + "i"} className="bg-warning" style={{ width: "5px", border: "none" }}></td>;
                      return (
                        <td
                          key={l + "i"}
                          className={
                            schedules?.[schedule.class] && schedules[schedule.class][`day${days.indexOf(d) + 1}`].includes(times[i])
                              ? "bg-primary"
                              : ""
                          }
                          onClick={(e) => {
                            e.currentTarget.classList.toggle("bg-primary");
                            const prop = `day${days.indexOf(d) + 1}`;
                            updateSchedule((prev) => {
                              if (prev[prop].includes(times[i])) {
                                prev[prop].splice(prev[prop].indexOf(times[i]), 1);
                                return { ...prev };
                              }
                              return { ...prev, [prop]: Array.from(new Set([...prev[prop], times[i]])) };
                            });
                          }}
                        ></td>
                      );
                    })}
                  </tr>
                ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-center">
            <Button variant="primary" size="md" className="col-2 mx-2" onClick={() => saveSchedule()}>
              حفظ
            </Button>
            <Button variant="danger" size="md" className="col-2" onClick={() => deleteScheduleRecord(schedule.class)}>
              حدف
            </Button>
          </div>
        </>
      ) : null}
    </>
  );
}
