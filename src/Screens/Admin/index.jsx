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
import ContentManagement from './ContentManagement/ContentManagement';
import AddVideo from './ContentManagement/AddVideo';
import EditVideo from './ContentManagement/EditVideo';
import VideoDetail from './ContentManagement/VideoDetail';
import AddEbook from './ContentManagement/AddEbook';
import EditEbook from './ContentManagement/EditEbook';
import EbookDetail from './ContentManagement/EbookDetail';
import AddArticles from './ContentManagement/AddArticles';
import EditArticles from './ContentManagement/EditArticles';
import ArticlesDetail from './ContentManagement/ArticlesDetail';
import LanguageManagement from './ContentManagement/LanguageManagement';
import AddLanguage from './ContentManagement/AddLanguage';
import LanguageDetail from './ContentManagement/LanguageDetail';
import EditLanguage from './ContentManagement/EditLanguage';
import CommissionManagement from './CommissionManagement/CommissionManagement';
import SubscriptionLogs from './SubscriptionManagement/SubscriptionLogs';
import SubscriptionPlan from './SubscriptionManagement/SubscriptionPlan';
import AddPlan from './SubscriptionManagement/AddPlan';
import EditPlan from './SubscriptionManagement/EditPlan';
import PlaneDetail from './SubscriptionManagement/PlaneDetail';
import Profile from '../Profile/Profile';
import EditProfile from '../Profile/EditProfile';
import ChangePassword from '../Profile/ChangePassword';
import FAQsManagement from './FAQsManagement/FAQsManagement';
import AddFAQs from './FAQsManagement/AddFAQs';
import EditFAQs from './FAQsManagement/EditFAQs';
import Queries from './Queries/Queries';
import Newsfeed from './UserManagement/Newsfeed';
import AudioManagement from './AudioManagement/AudioManagement';
import AddAudio from './AudioManagement/AddAudio';
import EditAudio from './AudioManagement/EditAudio';
import AudioDetails from './AudioManagement/AudioDetails';
import AudioCategoryManagement from './AudioManagement/AudioCategoryManagement';
import AddAudioCategory from './AudioManagement/AddAudioCategory';
import EditAudioCategory from './AudioManagement/EditAudioCategory';
import AudioCategoryDetails from './AudioManagement/AudioCategoryDetails';

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="user-management/:id" element={<UserDetails />} />
      {/* <Route path="user-management/:id/newsfeed" element={<Newsfeed />} /> */}

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

      <Route path="content-management" element={<ContentManagement />} />
      <Route path="content-management/add-videos" element={<AddVideo />} />
      <Route path="content-management/edit-videos/:id" element={<EditVideo />} />
      <Route path="content-management/videos/:id" element={<VideoDetail />} />

      <Route path="content-management/add-ebooks" element={<AddEbook />} />
      <Route path="content-management/edit-ebooks/:id" element={<EditEbook />} />
      <Route path="content-management/ebooks/:id" element={<EbookDetail />} />

      <Route path="content-management/add-articles" element={<AddArticles />} />
      <Route path="content-management/edit-articles/:id" element={<EditArticles />} />
      <Route path="content-management/articles/:id" element={<ArticlesDetail />} />

      <Route path="content-management/language-management" element={<LanguageManagement />} />
      <Route path="content-management/language-management/add-language" element={<AddLanguage />} />
      <Route path="content-management/language-management/:id" element={<LanguageDetail />} />
      <Route path="content-management/language-management/edit-language/:id" element={<EditLanguage />} />

      <Route path="commission-management" element={<CommissionManagement />} />

      <Route path="subscription-management" element={<SubscriptionLogs />} />
      <Route path="subscription-management/subscription-plan" element={<SubscriptionPlan />} />
      <Route path="subscription-management/subscription-plan/:id" element={<PlaneDetail />} />
      <Route path="subscription-management/subscription-plan/add-plan" element={<AddPlan />} />
      <Route path="subscription-management/subscription-plan/edit-plan/:id" element={<EditPlan />} />

      <Route path="faq-Management" element={<FAQsManagement />} />
      <Route path="faq-Management/add" element={<AddFAQs />} />
      <Route path="faq-Management/edit/:id" element={<EditFAQs />} />

      <Route path="audio-management" element={<AudioManagement />} />
      <Route path="audio-management/:id" element={<AudioDetails />} />
      <Route path="audio-management/add" element={<AddAudio />} />
      <Route path="audio-management/edit-audio/:id" element={<EditAudio />} />
      <Route path="audio-management/audio-category-management" element={<AudioCategoryManagement />} />
      <Route path="audio-management/audio-category-management/:id" element={<AudioCategoryDetails />} />
      <Route path="audio-management/audio-category-management/add" element={<AddAudioCategory />} />
      <Route path="audio-management/audio-category-management/edit/:id" element={<EditAudioCategory />} />

      <Route path="queries" element={<Queries />} />

      <Route path="profile" element={<Profile />} />
      <Route path="edit-profile" element={<EditProfile />} />
      <Route path="change-password" element={<ChangePassword />} />

      <Route path="*" element={<Navigate to="/admin/dashboard" />} />

      <Route path="notifications" element={<Notifications />} />
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

