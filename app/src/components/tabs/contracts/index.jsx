import { useState, useEffect } from "react";
import { Table, FormControl } from "react-bootstrap";
import { updateData, guidGenerator } from "../../../utils/dataHooks";

function ListContracts({ data, sumPayChecks }) {
  const [studentsData, updateStudents] = useState(data);
  const [taTp, updateTaTps] = useState({});

  function saveNewTATPinDB() {
    let changed = false;

    for (const i in data) {
      const cid = data[i].contractID;

      if (taTp[cid] && !isNaN(taTp[cid]) && data[i].totalAmountToPay !== taTp[cid]) {
        data[i].totalAmountToPay = taTp[cid];
        changed = true;
      }
    }

    if (changed) {
      updateStudents([...data]);
      updateData([...data], "students");
    }
  }

  return (
    <>
      <h3>لائحة مجموع المدفوعات:</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>رقم العقد</th>
            <th>التلميـــــــذ(ة)</th>
            <th>ولي الامر</th>
            <th>رقم ولي الامر</th>
            <th className="col-2">مجموع المبلغ المقرر</th>
            <th>مجموع المدفوعات</th>
            <th>المتبقي من الواجبات</th>
          </tr>
        </thead>
        <tbody>
          {studentsData.map((student) => (
            <tr key={student.contractID}>
              <td>{student.contractID}</td>
              <td>{student.name}</td>
              <td>{student.parent}</td>
              <td>{student.parentNumber}</td>
              <td>
                <div className="row g-0">
                  <div className="col">
                    <FormControl
                      name="totalAmount"
                      type="number"
                      defaultValue={student.totalAmountToPay || 0}
                      onChange={(e) => updateTaTps((prev) => ({ ...prev, [student.contractID]: parseFloat(e.target.value) }))}
                    />
                  </div>
                  {taTp[student.contractID] && taTp[student.contractID] !== student.totalAmountToPay ? (
                    <div className="col-4">
                      <FormControl className="btn-primary" name="totalAmount" type="submit" value={"حفظ"} onClick={saveNewTATPinDB} />
                    </div>
                  ) : null}
                </div>
              </td>
              <td>{sumPayChecks[student.contractID] || 0}</td>
              <td>
                {(() => {
                  const restToPay = (student.totalAmountToPay || 0) - (sumPayChecks[student.contractID] || 0);
                  return restToPay > 0 ? restToPay : 0;
                })()}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

function ListPayments({ contractIDs, payments }) {
  const [paychecks, updatePayChecks] = useState(payments);
  const [newPayCheck, updateNewPayCheck] = useState({
    id: guidGenerator(),
    cid: null,
    amount: 0,
    date: null,
  });

  function verifNewPayCheck() {
    const { cid, amount, date } = newPayCheck;
    if (cid && contractIDs.includes(cid) && !isNaN(amount) && amount > 0 && date?.length === 10 && /\d{2}\/\d{2}\/\d{2}/.test(date)) return true;
    return false;
  }
  function addNewPayCheckToDB() {
    updatePayChecks((prev) => [...prev, { ...newPayCheck, id: guidGenerator() }]);
  }

  function deletePayCheck(e) {
    if (window.confirm("هل تريد المواصلة؟")) {
      updatePayChecks((prev) => prev.filter((p) => p.id !== e.target.attributes.pcid.value));
    }
  }
  useEffect(() => {
    if (paychecks.length > 0) {
      updateData(paychecks, "paychecks");
    }
  }, [paychecks]);
  return (
    <>
      <h3>لائحة المدفوعات :</h3>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th>رقم العقد:</th>
            <th>المبلغ المدفوع:</th>
            <th>تاريخ الدفع:</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{verifNewPayCheck() ? <input type="button" value="حفظ" className="btn btn-primary" onClick={addNewPayCheckToDB} /> : null}</td>
            <td>
              <select
                name="cid"
                className="form-select btn btn-secondary"
                defaultValue={0}
                onChange={(e) => updateNewPayCheck((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
              >
                <option disabled value={0}>
                  اختر العقد
                </option>
                {contractIDs.map((c) => (
                  <option key={"list-" + c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </td>
            <td>
              <input
                type="number"
                name="amount"
                placeholder="ادخل قيمة المبلغ بالدرهم"
                onChange={(e) => updateNewPayCheck((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
              />
            </td>
            <td>
              <input
                type="text"
                name="date"
                placeholder="ادخل تاريخ الدفع بالصيغة التالية 18/07/1999"
                onChange={(e) => updateNewPayCheck((prev) => ({ ...prev, [e.target.name]: e.target.value }))}
              />
            </td>
          </tr>
          {paychecks.map((pc) => (
            <tr key={pc.id}>
              <td>
                <div className="d-flex p-0">
                  <button className="bg-danger btn m-0 p-0" size="sm" pcid={pc.id} onClick={deletePayCheck}>
                    احدف
                  </button>
                </div>
              </td>
              <td>{pc.cid}</td>
              <td>{pc.amount}</td>
              <td>{pc.date}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
export default function Contracts({ globData }) {
  let obj = {};

  const sumPayChecks = globData?.paychecks?.reduce((prev, curr) => {
    if (prev[curr.cid]) prev[curr.cid] += parseFloat(curr.amount);
    else prev[curr.cid] = parseFloat(curr.amount);
    return prev;
  }, obj);

  if (!globData || !sumPayChecks) return <></>;

  return (
    <>
      <ListContracts data={globData.students} sumPayChecks={sumPayChecks} />
      <ListPayments contractIDs={globData.students.map((l) => l.contractID)} payments={globData.paychecks?.reverse() || []} />
    </>
  );
}
