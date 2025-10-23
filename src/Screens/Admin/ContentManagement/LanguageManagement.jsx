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
    getLanguagesM,
    updateStatusLanguage,
} from '../../../Services/Admin/ContentManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import { languageManagementHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';
import CustomButton from '../../../Components/CustomButton';
import { MdEditSquare } from 'react-icons/md';

const LanguageManagement = ({
    showModal,
    closeModal,
    filters,
    setFilters,
    pagination,
    updatePagination,
}) => {
    usePageTitle('Language Management');
    const navigate = useNavigate();
    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedObj, setSelectedObj] = useState(null);
    let queryClient = useQueryClient();

    //GET USERS
    const {
        data: userManagement,
        isLoading,
        isError,
        error,
        refetch,
    } = useFetchTableData(
        'languageManagement',
        filters,
        updatePagination,
        getLanguagesM
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
            mutationFn: async (id) => await updateStatusLanguage(id),
            onSuccess: (data) => {
                showToast('Status updated successfully', 'success');
                setChangeStatusModal(false);
                setShowSuccessModal(true);
                queryClient.invalidateQueries(['languageManagement', filters]);
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
                    <h2 className="screen-title mb-0">Language Management</h2>
                    <CustomButton
                        text="Add Language"
                        onClick={() => (navigate("add-language"))}
                    />
                </div>
                <Row>
                    <Col xs={12}>
                        <CustomTable
                            filters={filters}
                            setFilters={setFilters}
                            headers={languageManagementHeaders}
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
                            {(userManagement?.data?.length || isError) && (
                                <tbody>
                                    {isError && (
                                        <tr>
                                            <td colSpan={languageManagementHeaders.length}>
                                                <p className="text-danger mb-0">
                                                    Unable to fetch data at this time
                                                </p>
                                            </td>
                                        </tr>
                                    )}
                                    {userManagement?.data?.map((item, index) => (
                                        <tr key={item.id}>
                                            <td>
                                                {serialNum(
                                                    (filters?.page - 1) * filters?.per_page + index + 1
                                                )}
                                            </td>
                                            <td>{item?.name}</td>
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
                                                            name: 'Edit',
                                                            icon: MdEditSquare,
                                                            onClick: () => navigate(`edit-language/${item.id}`),
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
                    } This language?`}
            />

            <CustomModal
                show={showSuccessModal}
                close={() => setShowSuccessModal(false)}
                variant="success"
                title="Success"
                description={`language has been ${isStatusActive(selectedObj) ? 'Inactivated' : 'Activated'
                    } Successfully.`}
            />

        </>
    );
};

export default withModal(withFilters(LanguageManagement));
