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
    addData,
} from '../../../Services/Admin/CommissionManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import { commissionHeadersMap } from '../../../Utils/Constants/TableHeaders';
import { formatDate, serialNum, showErrorToast } from '../../../Utils/Utils';
import CustomButton from '../../../Components/CustomButton';
import { Formik } from 'formik';
import "./styles.css"
import CustomInput from '../../../Components/CustomInput';
import { commissionValidationSchema } from '../../../Utils/Validations/ValidationSchemas';

const CommissionManagement = ({
    showModal,
    closeModal,
    filters,
    setFilters,
    pagination,
    updatePagination,
}) => {
    usePageTitle('Commission Management');
    const navigate = useNavigate();
    const location = useLocation();
    // const [activeTab, setActiveTab] = useState("videos");
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || "service_provider");
    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [selectedObj, setSelectedObj] = useState(null);
    let queryClient = useQueryClient();

    // ✅ Fetch table data based on tab
    const {
        data: commissionManagement,
        isLoading,
        isError,
        error,
    } = useFetchTableData(
        ['commissionManagementListing', activeTab],
        { ...filters, type: activeTab },
        updatePagination,
        getListing)


    if (isError) {
        showErrorToast(error);
    }


    const { mutate, isPending } = useMutation({
        mutationFn: addData,
        onSuccess: (data) => {
            showToast(data?.message || 'Commission Rate updated successfully', 'success');
            queryClient.invalidateQueries(['getListing']); // refresh table data
            closeModal();
        },
        onError: (error) => {
            showErrorToast(error);
        },
    });
    const handleSubmit = (values) => {
        const payload = {
            type: activeTab, // send the active tab as type
            percentage: values.commission_rate, // send entered percentage
        };
        showModal(
            '',
            'Are You Sure You Want To Update Commission Rate?',
            () => {
                mutate(payload);
            },
            'warning',
            null
        );
    };

    return (
        <>
            <section>
                <div className=' d-card border-0 mb-4'>
                    <div className="d-flex justify-content-between flex-wrap mb-3">
                        <h2 className="screen-title mb-0">Commission Management</h2>
                    </div>
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(key) => setActiveTab(key)}
                        className="tabsActive"
                    >
                        <Tab eventKey="service_provider" title="Service Provider" />
                        <Tab eventKey="coach" title="Coach Appointment" />
                        <Tab eventKey="webinar" title="Webinar" />
                        <Tab eventKey="workshop" title="Workshop" />
                    </Tabs>
                    <div className="row">
                        <div className="col-md-12">
                            <Formik
                                initialValues={{
                                    commission_rate: '',
                                }}
                                validationSchema={commissionValidationSchema}
                                onSubmit={handleSubmit}
                            >
                                {({
                                    values,
                                    errors,
                                    touched,
                                    handleChange,
                                    handleBlur,
                                    handleSubmit,
                                    setFieldValue,
                                }) => (
                                    <form onSubmit={handleSubmit} className="category-wrap">
                                        <div className="row">
                                            <div className="col-md-4">
                                                <CustomInput
                                                    label="Commission Rate"
                                                    labelclass="mainLabel"
                                                    type="number"
                                                    required
                                                    placeholder="05"
                                                    inputclass="mainInput"
                                                    id="commission_rate"
                                                    value={values.commission_rate}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    error={touched.commission_rate && errors.commission_rate}
                                                    rightText="%"
                                                />
                                            </div>
                                        </div>
                                        <div className="row ">
                                            <div className="col-md-12">
                                                <div className="d-flex">
                                                    <CustomButton
                                                        variant="primeryButton"
                                                        className="px-5"
                                                        text="Update"
                                                        pendingText="Submitting..."
                                                        isPending={isPending} // ✅ Mutation pending state
                                                        type="submit"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
                <div className=' d-card border-0'>
                    <div className="d-flex justify-content-between flex-wrap mb-3">
                        <h2 className="screen-title mb-0">
                            {/* {`${activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}`} */}
                            Commission Logs
                        </h2>
                    </div>
                    <Row>
                        <Col xs={12}>
                            <CustomTable
                                hasFilters={false}
                                filters={filters}
                                setFilters={setFilters}
                                headers={commissionHeadersMap[activeTab]}
                                pagination={pagination}
                                isLoading={isLoading}
                            >
                                {/* ✅ Loading & Empty States */}
                                {isLoading ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan={commissionHeadersMap[activeTab].length}>
                                                <p className="text-center mb-0">Loading {activeTab}...</p>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : isError ? (
                                    <tbody>
                                        <tr>
                                            <td colSpan={commissionHeadersMap[activeTab].length}>
                                                <p className="text-danger mb-0">
                                                    Unable to fetch data at this time
                                                </p>
                                            </td>
                                        </tr>
                                    </tbody>
                                ) : commissionManagement?.data?.length ? (
                                    <tbody>
                                        {commissionManagement.data.map((item, index) => (
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
                                            <td colSpan={commissionHeadersMap[activeTab].length}>
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

export default withModal(withFilters(CommissionManagement));
