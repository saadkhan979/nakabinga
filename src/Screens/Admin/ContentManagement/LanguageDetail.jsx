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
    updateStatusLanguage,
    viewLanguage,
} from '../../../Services/Admin/ContentManagement';
import { statusClassMap } from '../../../Utils/Constants/SelectOptions';
import { appointmentlogsHeaders } from '../../../Utils/Constants/TableHeaders';
import { formatDate, getCountryFlag } from '../../../Utils/Utils';
import { formatPhoneNumberIntl } from 'react-phone-number-input';
import './styles.css';
import { FaUser } from 'react-icons/fa6';
import withModal from '../../../HOC/withModal';
import withFilters from '../../../HOC/withFilters ';
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';

const LanguageDetail = ({
    filters,
    setFilters,
    pagination,
    updatePagination,
}) => {
    usePageTitle('Language Detail');
    const [changeStatusModal, setChangeStatusModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const { id } = useParams();
    let queryClient = useQueryClient();

    // Mutation for updating status
    const { mutate: updateStatusMutation, isPending: isStatusUpdating } =
        useMutation({
            mutationFn: async () => await updateStatusLanguage(id),
            onSuccess: (data) => {
                showToast('Status updated successfully', 'success');
                setChangeStatusModal(false);
                setShowSuccessModal(true);
                queryClient.invalidateQueries(['languageDetail', id]);
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
        queryKey: ['languageDetail', id],
        queryFn: () => viewLanguage(id),
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
                        Language Detail</h2>
                </div>
            </div>
            <div className="d-card py-45 mb-45">
                <div className="d-flex flex-wrap-reverse justify-content-between">
                    <div className="mb-3">
                        <p className="text-label">Language name:</p>
                        <p className="text-data">{user?.name}</p>
                    </div>
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
                            className="bg-success mt-2"
                            text={
                                user?.is_active === 1 ? 'Deactivate' : 'Activate'
                            }
                        />
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12'>
                        <div className='d-inline-block'>
                            <Link to={`/admin/content-management/language-management/edit-language/${user?.id}`} className='customButton'>Edit</Link>
                        </div>
                    </div>

                </div>
            </div >
            <CustomModal
                show={changeStatusModal}
                close={() => setChangeStatusModal(false)}
                disableClick={isStatusUpdating}
                action={updateStatusMutation}
                description={`Are You Sure, You Want To ${user?.is_active === 1 ? 'Inactivated' : 'Activated'
                    } This Language`}
            />

            <CustomModal
                show={showSuccessModal}
                close={() => setShowSuccessModal(false)}
                variant="success"
                title="Success"
                description={`Language has been ${user?.is_active === 0 ? 'Inactivated' : 'Activated'
                    } Successfully.`}
            />

        </div >
    );
};

export default withModal(withFilters(LanguageDetail));
