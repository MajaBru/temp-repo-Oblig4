import { Routes, Route, Link, Navigate } from 'react-router-dom';

// https://www.robinwieruch.de/react-router-private-routes/

const ProtectedRoute = ({
    isAllowed, children
}) => {
    if (!isAllowed) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;