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
} from '../../../Services/Admin/Queries';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import { queriesHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';

const Queries = ({
    showModal,
    closeModal,
    filters,
    setFilters,
    pagination,
    updatePagination,
}) => {
    usePageTitle('Queries');
    const navigate = useNavigate();
    const [changeStatusModal, setChangeStatusModal] = useState(false);
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
        'userListing',
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

    return (
        <>
            <section>
                <div className="d-flex justify-content-between flex-wrap mb-3">
                    <h2 className="screen-title mb-0">Queries</h2>
                </div>
                <Row>
                    <Col xs={12}>
                        <CustomTable
                            filters={filters}
                            setFilters={setFilters}
                            headers={queriesHeaders}
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
                                            <td colSpan={queriesHeaders.length}>
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
                                            <td>{item?.first_name} {item?.last_name}</td>
                                            <td>{item?.email}</td>
                                            <td>{formatDate(item?.created_at)}</td>
                                            <td>{formatDate(item?.created_at)}</td>
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
        </>
    );
};

export default withModal(withFilters(Queries));
