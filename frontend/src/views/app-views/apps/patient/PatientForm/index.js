import React, { useState, useEffect } from "react";
import PageHeaderAlt from "components/layout-components/PageHeaderAlt";
import { Tabs, Form, Button, message } from "antd";
import Flex from "components/shared-components/Flex";
import GeneralField from "./GeneralField";
import NextOfKin from "./NextOfKin";
// import VariationField from './VariationField'
// import ShippingField from './ShippingField'
import ProductListData from "assets/data/product-list.data.json";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const ADD = "ADD";
const EDIT = "EDIT";

const PatientForm = (props) => {
  const { mode = ADD, param } = props;

  const [form] = Form.useForm();
  const [uploadedImg, setImage] = useState("");
  const [uploadLoading, setUploadLoading] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);

  useEffect(() => {
    if (mode === EDIT) {
      console.log("is edit");
      console.log("props", props);
      const { id } = param;
      const produtId = parseInt(id);
      const productData = ProductListData.filter(
        (product) => product.id === produtId
      );
      const product = productData[0];
      form.setFieldsValue({
        comparePrice: 0.0,
        cost: 0.0,
        taxRate: 6,
        description:
          "There are many variations of passages of Lorem Ipsum available.",
        category: product.category,
        name: product.name,
        price: product.price,
      });
      setImage(product.image);
    }
  }, [form, mode, param, props]);

  const handleUploadChange = (info) => {
    if (info.file.status === "uploading") {
      setUploadLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (imageUrl) => {
        setImage(imageUrl);
        setUploadLoading(true);
      });
    }
  };

  const onFinish = () => {
    setSubmitLoading(true);
    form
      .validateFields()
      .then((values) => {
        const apiUrl = "http://localhost:5000/api/addPatient"; // replace with your actual API endpoint
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        };

        // Make the API request
        fetch(apiUrl, requestOptions)
          .then((response) => response.json())
          .then((data) => {
            setSubmitLoading(false);
            if (mode === ADD) {
              message.success(`Created ${values.firstName} in patients list`);
              form.resetFields(); // Clear the form after successful submission
            }
            if (mode === EDIT) {
              message.success(`Patient data saved`);
            }
          })
          .catch((error) => {
            setSubmitLoading(false);
            console.error("Error:", error);
            message.error("Failed to submit the form. Please try again.");
          });
      })
      .catch((info) => {
        setSubmitLoading(false);
        console.log("info", info);
        message.error("Please enter all required fields");
      });
  };

  return (
    <>
      <Form
        layout="vertical"
        form={form}
        name="advanced_search"
        className="ant-advanced-search-form"
        initialValues={{
          heightUnit: "cm",
          widthUnit: "cm",
          weightUnit: "kg",
        }}
      >
        <PageHeaderAlt className="border-bottom" overlap>
          <div className="container">
            <Flex
              className="py-2"
              mobileFlex={false}
              justifyContent="space-between"
              alignItems="center"
            >
              <h2 className="mb-3">
                {mode === "ADD" ? "New Patient" : `Edit Patient`}{" "}
              </h2>
              <div className="mb-3">
                <Button className="mr-2">Discard</Button>
                <Button
                  type="primary"
                  onClick={() => onFinish()}
                  htmlType="submit"
                  loading={submitLoading}
                >
                  {mode === "ADD" ? "Add" : `Save`}
                </Button>
              </div>
            </Flex>
          </div>
        </PageHeaderAlt>
        <div className="container">
          <Tabs
            defaultActiveKey="1"
            style={{ marginTop: 30 }}
            items={[
              {
                label: "General",
                key: "1",
                children: (
                  <GeneralField
                    uploadedImg={uploadedImg}
                    uploadLoading={uploadLoading}
                    handleUploadChange={handleUploadChange}
                  />
                ),
              },
              {
                label: "Next of Kin",
                key: "2",
                children: (
                  <NextOfKin
                    uploadedImg={uploadedImg}
                    uploadLoading={uploadLoading}
                    handleUploadChange={handleUploadChange}
                  />
                ),
              },
            ]}
          />
        </div>
      </Form>
    </>
  );
};

export default PatientForm;
