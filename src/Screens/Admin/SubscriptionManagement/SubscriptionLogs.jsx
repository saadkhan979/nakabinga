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
} from '../../../Services/Admin/SubscriptionManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import { subscriptionHeadersMap } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';
import CustomButton from '../../../Components/CustomButton';
import { Formik } from 'formik';
import "./styles.css"
import CustomInput from '../../../Components/CustomInput';
import { commissionValidationSchema } from '../../../Utils/Validations/ValidationSchemas';

const SubscriptionLogs = ({
    showModal,
    closeModal,
    filters,
    setFilters,
    pagination,
    updatePagination,
}) => {
    usePageTitle('Subscription logs');
    const navigate = useNavigate();
    const location = useLocation();
    // const [activeTab, setActiveTab] = useState("videos");
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || "service_provider_course");
    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedObj, setSelectedObj] = useState(null);
    let queryClient = useQueryClient();

    // ✅ Fetch table data based on tab
    const {
        data: subscriptionLogs,
        isLoading,
        isError,
        error,
    } = useFetchTableData(
        ['subscriptionLogsListing', activeTab],
        { ...filters, type: activeTab },
        updatePagination,
        getListing)


    if (isError) {
        showErrorToast(error);
    }

    return (
        <>
            <section>
                <div className=' d-card border-0'>

                    <Tabs
                        activeKey={activeTab}
                        onSelect={(key) => setActiveTab(key)}
                        className="tabsActive"
                    >
                        <Tab eventKey="service_provider_course" title="Service Provider/Course" />
                        <Tab eventKey="user" title="User" />
                    </Tabs>
                    <div className="d-flex justify-content-between flex-wrap mb-3">
                        <h2 className="screen-title mb-0">
                            {/* {`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`} */}
                            Subscription logs
                        </h2>
                        <CustomButton
                            text="Manage Subscription Plan"
                            onClick={() => (navigate("subscription-plan"))}
                        />
                    </div>
                    <Row>
                        <Col xs={12}>
                            <CustomTable
                                filters={filters}
                                setFilters={setFilters}
                                headers={subscriptionHeadersMap[activeTab]}
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
                                            <td colSpan={subscriptionHeadersMap[activeTab].length}>
                                                <p className="text-center mb-0">Loading {activeTab}...</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : isError ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan={subscriptionHeadersMap[activeTab].length}>
                                                <p className="text-danger mb-0">
                                                    Unable to fetch data at this time
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : subscriptionLogs?.data?.length ? (
                                    <tbody>
                                        {subscriptionLogs.data.map((item, index) => (
                                            <tr key={item.id}>
                                                <td>
                                                    {serialNum(
                                                        (filters?.page - 1) * filters?.per_page + index + 1
                                                    )}
                                                </td>
                                                <td>{item?.percentage}{item?.percentage ? "%" : ""}</td>
                                                <td>{formatDate(item?.updated_at)}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                ) : (
                                    <tbody>
                                        <tr>
                                            <td colSpan={subscriptionHeadersMap[activeTab].length}>
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
        </>
    );
};

export default withModal(withFilters(SubscriptionLogs));
