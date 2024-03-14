import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';

const Pages = () => (
	<Routes>
		<Route path="*" element={<Navigate to="register" replace />} />
	</Routes>
);

export default Pages;