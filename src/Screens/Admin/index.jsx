import { Navigate, Route, Routes } from 'react-router-dom';

import AdminLogin from './Auth/AdminLogin';
import ForgetPassword from './Auth/ForgetPassword';
import ForgetPassword2 from './Auth/ForgetPassword2';
import ForgetPassword3 from './Auth/ForgetPassword3';
import Dashboard from './Dashboard';
import Notifications from './Notifications/Notifications';
import UserDetails from './UserManagement/UserDetails';
import UserManagement from './UserManagement/UserManagement';
import CoachManagement from './CoachManagement/CoachManagement';
import CoachDetails from './CoachManagement/CoachDetails';
import CoachRequests from './CoachManagement/CoachRequests';
import CoachRequestsDetails from './CoachManagement/CoachRequestsDetails';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="user-management/:id" element={<UserDetails />} />

      <Route path="coach-management" element={<CoachManagement />} />
      <Route path="coach-management/:id" element={<CoachDetails />} />
      <Route path="coach-management/coach-requests" element={<CoachRequests />} />
      <Route path="coach-management/coach-requests/:id" element={<CoachRequestsDetails />} />

      <Route path="*" element={<Navigate to="/admin/dashboard" />} />
    </Routes>
  );
};

export default AdminRoutes;

export {
  AdminLogin,
  Dashboard,
  ForgetPassword,
  ForgetPassword2,
  ForgetPassword3,
  Notifications,
  UserDetails,
  UserManagement
};

