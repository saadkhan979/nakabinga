import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import StatusChip from '../../../Components/StatusChip/StatusChip';
import { showToast } from '../../../Components/Toast/Toast';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import {
  getListingB,
  updateStatus,
  viewUser,
} from '../../../Services/Admin/CoachManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { appointmentlogsHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, getCountryFlag } from '../../../Utils/Utils';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './styles.css';
import { FaUser } from 'react-icons/fa6';
import withModal from '../../../HOC/withModal';
import withFilters from '../../../HOC/withFilters ';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';

const CoachDetails = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Coach profile');
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const { id } = useParams();
  let queryClient = useQueryClient();

  // Mutation for updating status
  const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
    useMutation({
      mutationFn: async () => await updateStatus(id),
      onSuccess: (data) => {
        showToast('Status updated successfully', 'success');
        setChangeStatusModal(false);
        queryClient.invalidateQueries(['userDetails', id]);
      },
      onError: (error) => {
        showToast('Failed to update status', 'error');
        console.error('Error updating status:', error);
      },
    });

  const handleStatusChange = () => {
    const newStatus = user?.is_active === 1 ? 'Inactive' : 'Active';
    updateStatusMutation(newStatus);
  };

  // User Details
  const {
    data: user,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ['userDetails', id],
    queryFn: () => viewUser(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  // User appointment
  const {
    data: appointment = [],
    isLoading: isLoadingappointmentlogs,
    isError: isErrorappointmentlogs,
    error: errorappointmentlogs,
  } = useQuery({
    queryKey: ['appointment', id],
    queryFn: () => getListingB(id),
    refetchOnWindowFocus: false,
    retry: 1,
  });

  const appointmentlogs = appointment?.data ?? [];

  if (isLoading && isLoadingappointmentlogs) {
    return (
      <>
        <div className="d-card ">
          <div className="row">
            <div className="col-12 col-lg-10 col-xl-9 col-xxl-7">
              <div className="row mb-4">
                {Array.from({ length: 19 }).map((_, i) => (
                  <div
                    key={i}
                    className="col-12 col-sm-6 mb-3  align-items-center"
                    style={{ height: 56 }}
                  >
                    <Skeleton
                      style={{ marginTop: 28 }}
                      duration={1}
                      width={'50%'}
                      baseColor="#ddd"
                      height={22}
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  if (isError && isErrorappointmentlogs) {
    return (
      <>
        <div className="d-card">
          <p className="text-danger">{error.message}</p>
        </div>
      </>
    );
  }

  return (
    <div>
      <div className="d-flex align-items-start mb-4 justify-content-between flex-wrap">
        <div className="d-flex flex-column gap-2">
          <h2 className="screen-title m-0 d-inline"><BackButton /> Coach Profile</h2>
        </div>
      </div>
      <div className="d-card py-45 mb-45">
        <div className="row flex-wrap-reverse">

          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12">
                {/* <div className="userProfile">
                  <img src={user?.avatar} alt="" />
                </div> */}
                <div className="user-details">
                  {user?.avatar ? (
                    <img src={user?.avatar} alt="" className="img-fluid user-details" />
                  ) : <FaUser className='user-details-placeholder' />}
                </div>
              </div>
              <div className="col-md-8">
                <div className="row">
                  <div className="col-md-4 mb-3">
                    <p className="text-label">User Name:</p>
                    <p className="text-data">{user?.first_name} {user?.last_name}</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <p className="text-label">Email Address:</p>
                    <p className="text-data">{user?.email}</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <p className="text-label">Gender:</p>
                    <p className="text-data">{user?.gender}</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <p className="text-label">City:</p>
                    <p className="text-data">{user?.city}</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <p className="text-label">State:</p>
                    <p className="text-data">{user?.state}</p>
                  </div>
                  <div className="col-md-4 mb-3">
                    <p className="text-label">Phone no:</p>
                    <span>{getCountryFlag(user?.dial_code)}</span> {user?.dial_code} {user?.phone}
                  </div>
                </div>
              </div>
              <div className='col-md-12'>
                <div className='d-flex gap-3 mt-4'>
                  <CustomButton
                    text="View Webinar"
                  />
                  <CustomButton
                    className="customButtonBor"
                    text="View Services"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-md-2 d-flex justify-content-end">
            <div className='d-lg-inline-block'>
              <p className="text-label">
                Status:{' '}
                <span
                  className={`status ${statusClassMap[user?.is_active === 1 ? "Active" : "Inactive"]}`} // change with user status
                >
                  {user?.is_active === 1 ? "Active" : "Inactive"}
                </span>
              </p>
              <CustomButton
                onClick={() => setChangeStatusModal(true)}
                className="bg-success"
                text={
                  user?.is_active === 1 ? 'Deactivate' : 'Activate'
                }
              />
            </div>
          </div>
        </div>
      </div>
      <div className="d-card py-45 mb-45">
        <div className="row">
          <div className='col-md-12'>
            <h2 className="screen-title">Certification Detail</h2>
          </div>
          <div className="col-md-6">
            <div className="row">
              <div className="col-md-4 mb-3">
                <p className="text-label">Institute Name:</p>
                <p className="text-data">{user?.institute_name}</p>
              </div>
              <div className="col-md-4 mb-3">
                <p className="text-label">Certificate Title:</p>
                <p className="text-data">{user?.certificate_title}</p>
              </div>
            </div>
            <div className="row">
              <div className="col-md-4 mb-3">
                <div className='certificateImg'>
                  <img src={user?.avatar} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="d-card py-45 mb-45">
        <h2 className="screen-title">Appointment logs</h2>
        <Row>
          <Col xs={12}>
            <CustomTable
              headers={appointmentlogsHeaders}

              filters={filters}
              setFilters={setFilters}
              pagination={pagination}
              // isLoading={isLoading}
              selectOptions={[
                {
                  title: 'status',
                  options: userStatusFilters,
                },
              ]}
              dateFilters={[
                { title: 'Registration Date', from: 'from', to: 'to' },
              ]}
            >
              <tbody>
                {appointmentlogs?.map((item, index) => (
                  <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.address}</td>
                    <td>{item?.manager?.user_name}</td>
                    <td>{item?.supervisor?.user_name}</td>
                    <td>{item?.currency?.currency}</td>
                    <td>
                      <StatusChip status={item.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </CustomTable>
          </Col>
        </Row>
      </div>
      <CustomModal
        show={changeStatusModal}
        close={() => setChangeStatusModal(false)}
        action={handleStatusChange}
        disableClick={isStatusUpdating}
        title={user?.is_active === 1 ? 'Deactivate' : 'Activate'}
        description={`Are you sure you want to ${user?.is_active === 1 ? 'deactivate' : 'activate'
          } this user?`}
      />
    </div>
  );
};

export default withModal(withFilters(CoachDetails));
