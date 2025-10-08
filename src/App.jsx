import { lazy, Suspense } from 'react';
import 'react-phone-number-input/style.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import SkeletonLoader from './Components/SkeletonLoader/SkeletonLoader';
import Toast from './Components/Toast/Toast';
import AppLayout from './Layout/AppLayout';
import PublicRoutes from './Router/PublicRoutes';
import useUserStore from './Stores/UserStore';
import UserLayout from './Layout/UserLayout';
import Home from './Screens/User/Home';

// Freelance work: move all these imports to their respective files -> Lazy load module wise

// User auth components
const UserAuthScreens = lazy(() => import('./Screens/Auth/index'));

// Admin auth components loaded together as a group
const AdminAuthScreens = lazy(() => import('./Screens/Admin/Auth/index'));

// Admin screens should be loaded separately from admin auth screens
const AdminScreens = lazy(() => import('./Screens/Admin/index'));

// Other individual components
const Dashboard = lazy(() => import('./Screens/Dashboard/Dashboard'));
const AdminProfile = lazy(() => import('./Screens/Profile/AdminProfile'));
const Profile = lazy(() => import('./Screens/Profile/Profile'));
const Notifications = lazy(() => import('./Screens/Admin/Notifications/Notifications'));
const Preferences = lazy(() => import('./Screens/Theme/Preferences'));
function App() {
  const { user, role = 'guest' } = useUserStore();
  const isAuthenticated = !!user; // Checks if user is logged in

  return (
    <Suspense fallback={<SkeletonLoader />}>
      <Router basename="/nakabinga">
        <Routes>
          {/* Public Routes */}
          <Route
            element={
              <PublicRoutes
                isAuthenticated={isAuthenticated}
                redirectTo={role === 'admin' ? (isAuthenticated ? '/admin' : '/admin/login') : isAuthenticated ? '/' : '/login'}
              />
            }
          >
            {/* Home page accessible to both guests and authenticated users */}
            <Route path="/" element={<Home />} />

            {/* User auth routes - loaded together */}
            <Route path="login" element={<UserAuthScreens screen="login" />} />
            <Route path="forget-id" element={<UserAuthScreens screen="forget-id" />} />
            <Route path="forget-id2" element={<UserAuthScreens screen="forget-id2" />} />
            <Route path="forget-password" element={<UserAuthScreens screen="forget-password" />} />
            <Route path="forget-password2" element={<UserAuthScreens screen="forget-password2" />} />
            <Route path="forget-password3" element={<UserAuthScreens screen="forget-password3" />} />
            <Route path="signup" element={<UserAuthScreens screen="signup" />} />

            {/* Admin auth routes - loaded together */}
            <Route path="admin/login" element={<AdminAuthScreens screen="login" />} />
            <Route path="admin/forget-password" element={<AdminAuthScreens screen="forget-password" />} />
            <Route path="admin/forget-password2" element={<AdminAuthScreens screen="forget-password2" />} />
            <Route path="admin/forget-password3" element={<AdminAuthScreens screen="forget-password3" />} />
          </Route>

          {/* Authenticated Routes Admin */}
          <Route element={isAuthenticated ? <AppLayout /> : <Navigate to="/admin/login" />}>
            {/* <Route path="profile" element={<Profile />} />
            <Route path="admin/profile" element={<AdminProfile />} />
            <Route path="notifications" element={<Notifications />} />*/}
            {/* Admin Routes - use the grouped component for admin routes */}
            {role === 'admin' && (
              <>
                <Route path="admin/*" element={<AdminScreens />} />
                <Route path="/" element={<Navigate to="/admin/dashboard" />} />
              </>
            )}
          </Route>

          {/* Authenticated Routes User - only for protected routes, not home */}
          <Route element={isAuthenticated ? <UserLayout /> : <Navigate to="/admin/login" />}>
            {/*<Route path="preferences" element={<Preferences />} />
            <Route path="profile" element={<Profile />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="preferences" element={<Preferences />} />*/}
          </Route>

          {/* Optional: Catch all for 404 */}
          <Route path="*" element={isAuthenticated ? role === 'admin' ? <Navigate to="/admin" /> : <Navigate to="/" /> : <Navigate to="/admin/login" />} />
        </Routes>
      </Router>
      <Toast />
    </Suspense>
  );
}

export default App;
