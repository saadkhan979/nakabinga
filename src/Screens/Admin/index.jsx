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
import ServiceProviderManagement from './ServiceProviderManagement/ServiceProviderManagement';
import ServiceProviderCategory from './ServiceProviderCategory/ServiceProviderCategory';
import ServiceProviderCategoryDetail from './ServiceProviderCategory/ServiceProviderCategoryDetail';
import AddCategory from './ServiceProviderCategory/AddCategory';
import EditCategory from './ServiceProviderCategory/EditCategory';
import CoachCategory from './CoachCategory/CoachCategory';
import AddCoach from './CoachCategory/AddCoach';
import CoachDetail from './CoachCategory/CoachDetail';
import EditCoach from './CoachCategory/EditCoach';
import ServiceProviderDetails from './ServiceProviderManagement/ServiceProviderDetails';
import ServiceProvidersRequests from './ServiceProviderManagement/ServiceProvidersRequests';
import ServiceProvidersRequestsDetails from './ServiceProviderManagement/ServiceProvidersRequestsDetails';

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

      <Route path="service-provider-management" element={<ServiceProviderManagement />} />
      <Route path="service-provider-management/:id" element={<ServiceProviderDetails />} />
      <Route path="service-provider-management/requests" element={<ServiceProvidersRequests />} />
      <Route path="service-provider-management/requests/:id" element={<ServiceProvidersRequestsDetails />} />

      <Route path="service-provider-category" element={<ServiceProviderCategory />} />
      <Route path="service-provider-category/:id" element={<ServiceProviderCategoryDetail />} />
      <Route path="service-provider-category/add" element={<AddCategory />} />
      <Route path="service-provider-category/edit/:id" element={<EditCategory />} />

      <Route path="coach-category" element={<CoachCategory />} />
      <Route path="coach-category/:id" element={<CoachDetail />} />
      <Route path="coach-category/add" element={<AddCoach />} />
      <Route path="coach-category/edit/:id" element={<EditCoach />} />

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

