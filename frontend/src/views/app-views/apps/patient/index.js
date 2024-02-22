import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Patient = () => (
	<Routes>
		<Route path="*" element={<Navigate to="patient-list" replace />} />
	</Routes>
);

export default Patient

