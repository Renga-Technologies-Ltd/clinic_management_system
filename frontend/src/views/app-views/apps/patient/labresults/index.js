import React, { useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Row, Form } from "antd";
import Flex from "components/shared-components/Flex";
import { useParams } from "react-router-dom";
// import LabRequest from "views/app-views/dashboards/doctor/Consultation/Lab";
import LabResults from "views/app-views/dashboards/doctor/Consultation/LabResults";

const Payment = (props) => {
  const appointmentId = useParams();
  const appointment_id = appointmentId.appointment_id;
  const [form] = Form.useForm();

  useEffect(() => {}, []);

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 className="mb-3">Input Lab results</h2>
            </Flex>
          </div>
        </PageHeaderAlt>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <Row gutter={16}>
          <div className="container">
            <LabResults appointment_id={appointment_id} />
          </div>
        </Row>
      </Form>
    </>
  );
};

export default Payment;
