import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import {
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { useNavigate } from 'react-router-dom';
import CustomModal from '../../../Components/CustomModal';
import CustomTable from '../../../Components/CustomTable/CustomTable';
import TableActionDropDown from '../../../Components/TableActionDropDown/TableActionDropDown';
import { showToast } from '../../../Components/Toast/Toast';
import withFilters from '../../../HOC/withFilters ';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../Hooks/useTable';
import {
  getListing,
  updateStatus,
} from '../../../Services/Admin/CoachManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import { coachManagementHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';
import CustomButton from '../../../Components/CustomButton';

const CoachManagement = ({
  showModal,
  closeModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Coach Management');
  const navigate = useNavigate();
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null);
  let queryClient = useQueryClient();

  //GET USERS
  const {
    data: coachManagement,
    isLoading,
    isError,
    error,
    refetch,
  } = useFetchTableData(
    'coachManagementListing',
    filters,
    updatePagination,
    getListing
  );


  if (isError) {
    showErrorToast(error);
  }
  const isStatusActive = (item) => {
    return item?.is_active === 1;
  };
  //UPDATE STATUS
  const handleStatusChange = (item) => {
    setSelectedObj(item);
    setChangeStatusModal(true);
  };

  // Mutation for updating status
  const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
    useMutation({
      mutationFn: async (id) => await updateStatus(id),
      onSuccess: (data) => {
        showToast('Status updated successfully', 'success');
        setChangeStatusModal(false);
        setShowSuccessModal(true);
        queryClient.invalidateQueries(['userListing', filters]);
      },
      onError: (error) => {
        console.error('Error updating status:', error);
      },
    });

  // Confirm status change
  const confirmStatusChange = () => {
    if (selectedObj) {
      updateStatusMutation(selectedObj.id);
    }
  };

  return (
    <>
      <section>
        <div className="d-flex justify-content-between flex-wrap mb-3">
          <h2 className="screen-title mb-0">Coach Management</h2>
          <CustomButton
            text="new coach’s request"
            onClick={() => (navigate("coach-requests"))}
          />
        </div>
        <Row>
          <Col xs={12}>
            <CustomTable
              filters={filters}
              setFilters={setFilters}
              headers={coachManagementHeaders}
              pagination={pagination}
              isLoading={isLoading}
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
              {(coachManagement?.data?.length || isError) && (
                <tbody>
                  {isError && (
                    <tr>
                      <td colSpan={coachManagementHeaders.length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  )}
                  {coachManagement?.data?.map((item, index) => (
                    <tr key={item.id}>
                      <td>
                        {serialNum(
                          (filters?.page - 1) * filters?.per_page + index + 1
                        )}
                      </td>
                      <td>{item?.first_name} {item?.last_name}</td>
                      <td>{item?.email}</td>
                      <td>{formatDate(item?.created_at)}</td>
                      <td>
                        <span
                          className={`chip ${statusClassMap[item.is_active === 1 ? "Active" : "Inactive"]
                            }`}
                        >
                          {item?.is_active === 1 ? "Active" : "Inactive"}
                        </span>
                      </td>
                      <td>
                        <TableActionDropDown
                          actions={[
                            {
                              name: 'View',
                              icon: HiOutlineEye,
                              onClick: () => navigate(`${item.id}`),
                              className: 'view',
                            },
                            {
                              name: isStatusActive(item)
                                ? 'Deactivate'
                                : 'Activate',
                              icon: isStatusActive(item)
                                ? HiOutlineXCircle
                                : HiOutlineCheckCircle,
                              onClick: () => handleStatusChange(item),
                              className: isStatusActive(item)
                                ? 'delete with-color'
                                : 'view with-color',
                            },
                          ]}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </CustomTable>
          </Col>
        </Row>
      </section>

      <CustomModal
        show={changeStatusModal}
        close={() => setChangeStatusModal(false)}
        disableClick={isStatusUpdating}
        action={confirmStatusChange}
        description={`Are You Sure, You Want To ${isStatusActive(selectedObj) ? 'Inactivated' : 'Activated'
          } This Coach?`}
      />

      <CustomModal
        show={showSuccessModal}
        close={() => setShowSuccessModal(false)}
        variant="success"
        title="Success"
        description={`Coach has been ${isStatusActive(selectedObj) ? 'Inactivated' : 'Activated'
          } Successfully.`}
      />

    </>
  );
};

export default withModal(withFilters(CoachManagement));
