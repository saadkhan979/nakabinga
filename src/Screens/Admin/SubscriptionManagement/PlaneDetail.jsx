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
    updateStatusSubPlan,
    viewUser,
} from '../../../Services/Admin/SubscriptionManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { appointmentlogsHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, getCountryFlag } from '../../../Utils/Utils';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './styles.css';
import { FaUser } from 'react-icons/fa6';
import withModal from '../../../HOC/withModal';
import withFilters from '../../../HOC/withFilters ';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';

const PlaneDetail = ({
    filters,
    setFilters,
    pagination,
    updatePagination,
}) => {
    usePageTitle('Plane Detail');
    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { id } = useParams();
    let queryClient = useQueryClient();

    // Mutation for updating status
    const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
        useMutation({
            mutationFn: async () => await updateStatusSubPlan(id),
            onSuccess: (data) => {
                showToast('Status updated successfully', 'success');
                setChangeStatusModal(false);
                setShowSuccessModal(true);
                queryClient.invalidateQueries(['planDetails', id]);
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
        queryKey: ['planDetails', id],
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
                    <h2 className="screen-title m-0 d-inline">
                        <BackButton />
                        Plane Detail</h2>
                </div>
            </div>
            <div className="d-card py-45 mb-45">
                <div className="d-flex flex-wrap-reverse justify-content-between">
                    <div className="mb-3">
                        <p className="text-label">Subscription Title:</p>
                        <p className="text-data">{user?.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <p className="text-label">Duration:</p>
                        <p className="text-data">{user?.duration}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <p className="text-label">Category:</p>
                        <p className="text-data">{user?.category}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <p className="text-label">Price:</p>
                        <p className="text-data">{user?.price}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6 mb-3">
                        <p className="text-label">Description:</p>
                        <p className="text-data">{user?.description}</p>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='d-inline-block'>
                            <Link to={`/admin/subscription-management/subscription-plan/edit-plan/${user?.id}`} className='customButton'>Edit</Link>
                        </div>
                    </div>

                </div>
            </div >
        </div >
    );
};

export default withModal(withFilters(PlaneDetail));
