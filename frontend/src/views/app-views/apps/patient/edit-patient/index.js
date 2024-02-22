import React from 'react'
import ProductForm from '../PatientForm';
import { useParams } from 'react-router-dom';

const EditProduct = () => {
	const params = useParams();

	return (
		<ProductForm mode="EDIT" param={params}/>
	)
}

export default EditProduct
