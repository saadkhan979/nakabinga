import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { Link, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import StatusChip from '../../../Components/StatusChip/StatusChip';
import { showToast } from '../../../Components/Toast/Toast';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import {
  updateStatus,
  viewUser,
} from '../../../Services/Admin/CoachCategory';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { appointmentlogsHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, getCountryFlag } from '../../../Utils/Utils';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './styles.css';
import { FaUser } from 'react-icons/fa6';
import withModal from '../../../HOC/withModal';
import withFilters from '../../../HOC/withFilters ';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';

const CoachDetail = ({
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Coach Detail');
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { id } = useParams();
  let queryClient = useQueryClient();

  // Mutation for updating status
  const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
    useMutation({
      mutationFn: async () => await updateStatus(id),
      onSuccess: (data) => {
        showToast('Status updated successfully', 'success');
        setChangeStatusModal(false);
        setShowSuccessModal(true);
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



  if (isLoading) {
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

  if (isError) {
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
          <h2 className="screen-title m-0 d-inline"><BackButton /> Coach Detail</h2>
        </div>
      </div>
      <div className="d-card py-45 mb-45">
        <div className="row flex-wrap-reverse">

          <div className="col-md-10">
            <div className="row">
              <div className="col-md-4 mb-3">
                <p className="text-label">Category Name:</p>
                <p className="text-data">{user?.name}</p>
              </div>
            </div>
          </div>
          <div className="col-md-2 d-flex justify-content-lg-end justify-content-start mb-3">
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
        <div className="row">
          <div className="col-md-12 mb-3">
            <div className='categoryImg border'>
              <img src={user?.image} alt="" />
            </div>
          </div>
        </div>
        <div className='row'>
          <div className='col-md-12'>
            <div className='d-inline-block'>
              <Link to={`/admin/coach-category/edit/${user?.id}`} className='customButton'>Edit Category</Link>
            </div>
          </div>

        </div>
      </div>
      <CustomModal
        show={changeStatusModal}
        close={() => setChangeStatusModal(false)}
        disableClick={isStatusUpdating}
        action={updateStatusMutation}
        description={`Are You Sure, You Want To ${user?.is_active === 1 ? 'Inactivated' : 'Activated'
          } This Coach`}
      />

      <CustomModal
        show={showSuccessModal}
        close={() => setShowSuccessModal(false)}
        variant="success"
        title="Success"
        description={`Coach has been ${user?.is_active === 0 ? 'Inactivated' : 'Activated'
          } Successfully.`}
      />

    </div >
  );
};

export default withModal(withFilters(CoachDetail));
