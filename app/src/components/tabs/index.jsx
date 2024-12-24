import { useEffect, useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import "./index.css";
import Schedule from "./schedule";
import Students from "./students";
import Contracts from "./contracts";
import { fetchDB } from "../../utils/dataHooks";

export default function AllTabs() {

  const [dataReady, setDataReady] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    fetchDB()
      .then((r) => {
        setDataReady(true);
        setData(r);
      })
      .catch((err) => setDataReady(false));
  }, []);

  if (!dataReady || !data) return <h2>اعد المحاولة لاحقا</h2>;
  
  return (
    <div className="inner-products">
      <Tabs defaultActiveKey="schedule" id="uncontrolled-tab-example" className="mb-3">
        <Tab eventKey="students" title="لائحة التلاميد">
          <Students globData={data} />
        </Tab>
        <Tab eventKey="schedule" title="استعمال الزمن">
          <Schedule globData={data} />
        </Tab>
        <Tab eventKey="contracts" title="العقود">
          <Contracts globData={data} />
        </Tab>
      </Tabs>
    </div>
  );
}
