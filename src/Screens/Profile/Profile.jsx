import { Link, useNavigate } from 'react-router-dom';
import CustomButton from '../../Components/CustomButton';
import { usePageTitle } from '../../Hooks/usePageTitle';
import useUserStore from '../../Stores/UserStore';
import { getCountryFlag, isNullOrEmpty } from '../../Utils/Utils';
import './style.css';

const Profile = () => {
  usePageTitle('My Profile');

  const { user } = useUserStore();
  const navigate = useNavigate();
  const handleEditProfile = () => {
    navigate('/admin/edit-profile'); // Make sure this route is defined
  };
  const handleChangePassword = () => {
    navigate('/admin/change-password'); // Make sure this route is defined
  };
  return (
    <>
      <div className="d-card py-45">
        <div className="row">
          <div className="col-md-12">
            <h2 className="screen-title">My Profile</h2>
          </div>
        </div>
        <div className="row mb-4">
          <div className="col-md-12">
            <div className="adminProfileImage">
              <img src={user?.avatar} alt="User" />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="row">
              {[
                {
                  label: 'Full Name:',
                  value: `${user?.first_name ?? ""} ${user?.last_name ?? ""}`
                },
                {
                  label: 'Email Address',
                  value: user?.email,
                },
                {
                  label: 'Phone Number',
                  value: (
                    <>
                      <span className='pe-1'>{getCountryFlag(user?.dial_code)} </span>
                      {user?.dial_code} {user?.phone}
                    </>
                  ),

                  // <span>{getCountryFlag(user?.dial_code)}</span> {user?.dial_code} {user?.phone}
                },
              ].map((x, i) => {
                if (isNullOrEmpty(x.value)) return null;
                return (
                  <div className='col-md-4 mb-4'>
                    <div key={i}>
                      <p className="detail-title detail-label-color mb-1">
                        {x.label}
                      </p>
                      <p className="detail-text wrapText mb-0">{x.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="row flex-grow-1 mb-4">
          <div className="col-md-12">
            <div className="d-flex gap-3 mb-3">
              <CustomButton
                text="Edit Profile"
                className="primeryButton"
                onClick={handleEditProfile}
              />
              <CustomButton
                text="Change Password"
                className="whiteButtonBor"
                onClick={handleChangePassword}
              />
            </div>
          </div>
        </div>


      </div >
    </>
  );
};

export default Profile;
