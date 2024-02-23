import React from "react";
import DetailsForm from "../DetailsForm";
import { useParams } from "react-router-dom";

const EditProduct = () => {
  const params = useParams();
//   console.log(params);

  return <DetailsForm mode="EDIT" param={params} />;
};

export default EditProduct;
