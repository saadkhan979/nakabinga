import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { } from 'react-bootstrap';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomModal from '../../../Components/CustomModal';


import { showToast } from '../../../Components/Toast/Toast';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { updateRequestsStatus, viewUser } from '../../../Services/Admin/CoachManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { getCountryFlag } from '../../../Utils/Utils';
import './styles.css';
import { FaUser } from 'react-icons/fa6';
import withModal from '../../../HOC/withModal';
import withFilters from '../../../HOC/withFilters ';
import { Formik, Form } from 'formik';
import { reasonValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import CustomInput from '../../../Components/CustomInput';

const ServiceProvidersRequestsDetails = () => {
  usePageTitle('Service Provider Profile');
  const { id } = useParams();
  const navigate = useNavigate();
  let queryClient = useQueryClient();


  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingAction, setPendingAction] = useState(null);

  const [rejectedReason, setRejectedReason] = useState(false);

  const { mutate: updateStatusMutation, isPending: isStatusUpdating } = useMutation({
    mutationFn: (payload) => updateRequestsStatus(id, payload),
    onSuccess: () => {
      showToast('Status updated successfully', 'success');
      setChangeStatusModal(false);
      setRejectedReason(false);
      setShowSuccessModal(true);
      queryClient.invalidateQueries(['coachrequests', id]);
    },
    onError: (error) => {
      showToast(error?.message || 'Failed to update status', 'error');
      console.error('Error updating status:', error);
    },
  });


  const handleStatusChange = (payload) => {
    updateStatusMutation(payload);
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

  const handleSubmit = (values) => {
    handleStatusChange({ status: 'rejected', reason: values.reason });
    console.log(values, "values999999");
  };

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
          <h2 className="screen-title m-0 d-inline"><BackButton /> Service Provider Profile</h2>
        </div>
      </div>
      <div className="d-card py-45 mb-45">
        <div className="row flex-wrap-reverse">

          <div className="col-md-10">
            <div className="row">
              <div className="col-md-12">
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
                    <p className="text-data"><span>{getCountryFlag(user?.dial_code)}</span> {user?.dial_code} {user?.phone}</p>
                  </div>
                  {user?.status === "rejected" && (
                    <div className="col-md-8 mb-3">
                      <p className="text-label">Rejection Reason:</p>
                      <p className="text-data">{user?.reject_reason}</p>
                    </div>

                  )}
                </div>
              </div>
              {/* {user?.status === "pending" && (
                <div className='col-md-12'>
                  <div className='d-flex gap-3 mt-4'>
                    <CustomButton
                      className="px-5"
                      text="Approve"
                      onClick={() => setChangeStatusModal(true)}
                    />
                    <CustomButton
                      className="customButtonBor px-5"
                      text="Reject"
                      onClick={() => setRejectedReason(true)}
                    />
                  </div>
                </div>
              )} */}
              {user?.status === "pending" && (
                <div className="col-md-12">
                  <div className="d-flex gap-3 mt-4">
                    {/* ✅ APPROVE BUTTON */}
                    <CustomButton
                      className="px-5"
                      text="Approve"
                      onClick={() => {
                        setChangeStatusModal(true);
                        setPendingAction('approve'); // keep track of which action was clicked
                      }}
                    />

                    {/* ✅ REJECT BUTTON */}
                    <CustomButton
                      className="customButtonBor px-5"
                      text="Reject"
                      onClick={() => {
                        setChangeStatusModal(true);
                        setPendingAction('rejected');
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-md-2 d-flex justify-content-end">
            <div className='d-lg-inline-block'>
              <p className="text-label">
                Status:{' '}
                <span
                  className={`status text-capitalize ${statusClassMap[user?.status]}`} // change with user status
                >
                  {user?.status}
                </span>
              </p>
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
              <div className="col-md-8 mb-3">
                <div className='certificateImg'>
                  <img src={user?.avatar} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CustomModal
        show={changeStatusModal}
        close={() => setChangeStatusModal(false)}
        disableClick={isStatusUpdating}
        // title={pendingAction === 'approve' ? 'Approve Coach' : 'Reject Coach'}
        description={
          pendingAction === 'approve'
            ? 'Are you sure you want to approve this provider?'
            : 'Are you sure you want to reject this provider?'
        }
        action={() => {
          if (pendingAction === 'approve') {
            // Directly approve
            handleStatusChange({ status: 'approved' });
          } else {
            // First confirm rejection → then open reason modal
            setChangeStatusModal(false);
            setRejectedReason(true);
          }
        }}
      />
      <CustomModal
        show={showSuccessModal}
        close={() => setShowSuccessModal(false)}
        variant="success"
        title="Success"
        description={`provider has been ${pendingAction === 'rejected' ? 'rejected' : 'approved'
          } successfully.`}
        action={() => {
          navigate("/admin/service-provider-management/requests");
        }}
      />
      <CustomModal
        show={rejectedReason}
        close={() => setRejectedReason(false)}
        variant="error"
      >
        <div>
          <div className="text-center mb-4">
            <h4 className="modalTitle">Reject Reason*</h4>
          </div>
          <Formik
            initialValues={{
              reason: '',
            }}
            validationSchema={reasonValidationSchema}
            onSubmit={handleSubmit}
          >
            {({ values, errors, touched, handleChange, handleBlur }) => (
              <Form>
                <CustomInput
                  labelClass="ps-3 mb-3"
                  label="Reason"
                  required
                  id="reason"
                  type="textarea"
                  inputClass="rounded-4"
                  placeholder="Enter Reason...."
                  value={values.reason}
                  rows={5}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.reason && errors.reason}
                />
                <div className="d-flex justify-content-center">
                  <CustomButton
                    type="submit"
                    className="customButton primeryButton w-100"
                    text="Submit"
                  />
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </CustomModal>

    </div >
  );
};

export default withModal(withFilters(ServiceProvidersRequestsDetails));
