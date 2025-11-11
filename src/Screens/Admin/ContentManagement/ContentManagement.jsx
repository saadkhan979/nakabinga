import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Col, Row, Tab, Tabs } from 'react-bootstrap';
import {
  HiOutlineCheckCircle,
  HiOutlineEye,
  HiOutlineXCircle,
} from 'react-icons/hi2';
import { MdEditSquare } from "react-icons/md";

import { Link, useLocation, useNavigate } from 'react-router-dom';
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
} from '../../../Services/Admin/ContentManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import { contentManagementHeadersMap } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';
import CustomButton from '../../../Components/CustomButton';
import "./styles.css"

const ContentManagement = ({
  showModal,
  closeModal,
  filters,
  setFilters,
  pagination,
  updatePagination,
}) => {
  usePageTitle('Content Management');
  const navigate = useNavigate();
  const location = useLocation();
  // const [activeTab, setActiveTab] = useState("videos");
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "videos");
  const [changeStatusModal, setChangeStatusModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedObj, setSelectedObj] = useState(null);
  let queryClient = useQueryClient();

  // ✅ Fetch table data based on tab
  const {
    data: contentManagement,
    isLoading,
    isError,
    error,
  } = useFetchTableData(
    ['contentManagementlisting', activeTab],
    { ...filters, type: activeTab },
    updatePagination,
    getListing)


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
      // mutationFn: async (id) => await updateStatus(id),
      mutationFn: async ({ id, type }) => await updateStatus(id, type),
      onSuccess: (data) => {
        showToast('Status updated successfully', 'success');
        setChangeStatusModal(false);
        setShowSuccessModal(true);
        queryClient.invalidateQueries(['listing', filters]);
      },
      onError: (error) => {
        console.error('Error updating status:', error);
      },
    });

  // Confirm status change
  const confirmStatusChange = () => {
    if (selectedObj) {
      // updateStatusMutation(selectedObj.id);
      updateStatusMutation({ id: selectedObj.id, type: activeTab });
    }
  };

  return (
    <>
      <section>
        <div className=' d-card border-0 mb-4'>
          <div className="d-flex justify-content-between flex-wrap mb-3">
            <h2 className="screen-title mb-0">Content Management</h2>
            <CustomButton
              text="Language Management"
              onClick={() => (navigate("language-management"))}
            />
          </div>
          <Tabs
            activeKey={activeTab}
            onSelect={(key) => setActiveTab(key)}
            className="tabsActive"
          >
            <Tab eventKey="videos" title="Videos" />
            <Tab eventKey="ebooks" title="E-Books" />
            <Tab eventKey="articles" title="Articles" />
          </Tabs>
        </div>
        <div className=' d-card border-0'>
          <div className="d-flex justify-content-between flex-wrap mb-3">
            <h2 className="screen-title mb-0">
              {`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
            </h2>

            <CustomButton
              text={`Add ${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`}
              onClick={() => navigate(`add-${activeTab}`)}
            />
          </div>
          <Row>
            <Col xs={12}>
              <CustomTable
                filters={filters}
                setFilters={setFilters}
                headers={contentManagementHeadersMap[activeTab]}
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
                {/* ✅ Loading & Empty States */}
                {isLoading ? (
                  <tbody>
                    <tr>
                      <td colSpan={contentManagementHeadersMap[activeTab].length}>
                        <p className="text-center mb-0">Loading {activeTab}...</p>
                      </td>
                    </tr>
                  </tbody>
                ) : isError ? (
                  <tbody>
                    <tr>
                      <td colSpan={contentManagementHeadersMap[activeTab].length}>
                        <p className="text-danger mb-0">
                          Unable to fetch data at this time
                        </p>
                      </td>
                    </tr>
                  </tbody>
                ) : contentManagement?.data?.length ? (
                  <tbody>
                    {contentManagement.data.map((item, index) => (
                      <tr key={item.id}>
                        <td>
                          {serialNum(
                            (filters?.page - 1) * filters?.per_page + index + 1
                          )}
                        </td>
                        <td>{item?.title}</td>
                        <td>{item?.language?.name}</td>
                        <td>{formatDate(item?.created_at)}</td>
                        <td>
                          <span
                            className={`chip ${statusClassMap[
                              item.is_active === 1 ? 'Active' : 'Inactive'
                            ]
                              }`}
                          >
                            {item?.is_active === 1 ? 'Active' : 'Inactive'}
                          </span>
                        </td>
                        <td>
                          <TableActionDropDown
                            actions={[
                              {
                                name: 'View',
                                icon: HiOutlineEye,
                                onClick: () => navigate(`${activeTab}/${item.id}`),
                                className: 'view',
                              },
                              {
                                name: 'Edit',
                                icon: MdEditSquare,
                                onClick: () => navigate(`edit-${activeTab}/${item.id}`),
                                className: 'edit',
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
                ) : (
                  <tbody>
                    <tr>
                      <td colSpan={contentManagementHeadersMap[activeTab].length}>
                        <p className="text-center mb-0">
                          No {activeTab} found.
                        </p>
                      </td>
                    </tr>
                  </tbody>
                )}
              </CustomTable>

            </Col>
          </Row>
        </div>
      </section>

      <CustomModal
        show={changeStatusModal}
        close={() => setChangeStatusModal(false)}
        disableClick={isStatusUpdating}
        action={confirmStatusChange}
        description={`Are You Sure, You Want To ${isStatusActive(selectedObj) ? 'Inactivated' : 'Activated'
          } This ${activeTab}`}
      />

      <CustomModal
        show={showSuccessModal}
        close={() => setShowSuccessModal(false)}
        variant="success"
        title="Success"
        description={`${activeTab} has been ${isStatusActive(selectedObj) ? 'Inactivated' : 'Activated'
          } Successfully.`}
      />
    </>
  );
};

export default withModal(withFilters(ContentManagement));
