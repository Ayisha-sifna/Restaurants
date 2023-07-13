import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ path, element: Component, isAuthenticated }) => {
    return (
        <Route
            path={path}
            element={isAuthenticated ? <Component /> : <Navigate to="/login" replace />}
        />
    );
};

export default ProtectedRoute;
