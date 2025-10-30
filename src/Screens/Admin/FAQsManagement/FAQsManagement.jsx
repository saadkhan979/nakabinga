import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import CustomModal from '../../../Components/CustomModal';
import CustomButton from '../../../Components/CustomButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../Hooks/useTable';
import withModal from '../../../HOC/withModal';
import withFilters from '../../../HOC/withFilters ';
import { deleteData, getListing } from '../../../Services/Admin/FAQsManagement';
import { showErrorToast } from '../../../Utils/Utils';
import "./styles.css"
import { showToast } from '../../../Components/Toast/Toast';

import CustomPagination from '../../../Components/CustomPagination/CustomPagination';

const FAQsManagement = ({
    showModal,
    closeModal,
    filters,
    setFilters,
    pagination,
    setModalLoading,
    updatePagination,
}) => {
    usePageTitle('FAQs Management');
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    // Local copy of fetched data for instant delete
    const [faqs, setFaqs] = useState([]);

    // GET FAQs
    const {
        data: fetchData,
        isLoading,
        isError,
        error,
    } = useFetchTableData(
        'faqListing',
        filters,
        updatePagination,
        getListing,
    );
    // When API data changes, update local state
    useEffect(() => {
        if (fetchData?.data) {
            setFaqs(fetchData.data);
        }
    }, [fetchData]);

    // DELETE Mutation
    const { mutate: deleteFAQ, isPending: isDeleting } = useMutation({
        mutationFn: (id) => deleteData(id),
        onSuccess: (data, id) => {
            showToast('FAQ deleted successfully!', 'success');
            setFaqs((prev) => prev.filter((item) => item.id !== id));
            queryClient.invalidateQueries(['faqListing']);
        },
        onError: (error) => {
            showErrorToast(error?.message || 'Failed to delete FAQ');
        },
    });

    // ✅ Handle Delete Click
    const handleDeleteFAQ = (id) => {
        showModal(
            '',
            'Are you sure you want to delete this FAQ?',
            () => {
                setModalLoading(true);
                deleteFAQ(id, {
                    onSettled: () => {
                        setModalLoading(false);
                        closeModal();
                    },
                });
            },
            'warning'
        );
    };

    if (isError) {
        showErrorToast(error);
    }

    // const faqList = faqs.length ? faqs : fetchData?.data || [];

    return (
        <>
            <section>
                <div className="d-flex justify-content-between flex-wrap mb-3">
                    <h2 className="screen-title mb-0">FAQs Management</h2>
                    <div className="d-flex gap-2">
                        <CustomButton text="Add" onClick={() => navigate('add')} />
                    </div>
                </div>
            </section>

            <div className="d-card py-45 mb-45 faqsMain">
                {/* Loader */}
                {isLoading && <p>Loading FAQs...</p>}

                {/* Empty State */}
                {!isLoading && faqs?.length === 0 && (
                    <p className="text-center text-muted">No FAQs found.</p>
                )}

                {/* FAQs Accordion */}
                {!isLoading && faqs?.length > 0 && (
                    <>
                        <Accordion defaultActiveKey="0">
                            {faqs.map((faq, index) => (
                                <Accordion.Item
                                    eventKey={index.toString()}
                                    key={faq.id}
                                    className="mb-2 border-0 rounded-3 overflow-hidden"
                                >
                                    <Accordion.Header>
                                        <span className="fw-semibold">Q) {faq.question}</span>
                                    </Accordion.Header>
                                    <Accordion.Body>
                                        {faq.type === 'text' && (
                                            <p className="text-muted mb-0">
                                                A) {faq.answer || 'No answer provided'}
                                            </p>
                                        )}
                                        {faq.type === 'image' && (
                                            <img src={faq.file} alt="FAQ Image" />
                                        )}
                                        {faq.type === 'video' && faq.file && (
                                            <div className="ratio ratio-16x9 rounded-4 overflow-hidden">
                                                <video
                                                    controls
                                                    poster={faq.file}
                                                    style={{ width: '100%', borderRadius: '20px' }}
                                                >
                                                    <source src={faq.file} type="video/mp4" />
                                                    Your browser does not support the video tag.
                                                </video>
                                            </div>
                                        )}

                                        {/* --- Action Buttons --- */}
                                        <div className="d-flex gap-2 mt-2">
                                            <CustomButton
                                                text="Edit"
                                                className="primeryButton"
                                                onClick={() =>
                                                    navigate(`/admin/faq-Management/edit/${faq.id}`, {
                                                        state: faq,
                                                    })
                                                }
                                            />
                                            <CustomButton
                                                text={'Delete'}
                                                className="dangerButton"
                                                onClick={() => handleDeleteFAQ(faq.id)}
                                            />
                                        </div>
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>

                        {/* ✅ Pagination Component */}
                        <div className="mt-4">
                            <CustomPagination
                                pagination={pagination}
                                setFilters={setFilters}
                            />
                        </div>
                    </>
                )}
            </div>
        </>
    );
};

export default withModal(withFilters(FAQsManagement));
