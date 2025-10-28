import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Accordion } from 'react-bootstrap';
import { useQueryClient } from '@tanstack/react-query';
import CustomModal from '../../../Components/CustomModal';
import CustomButton from '../../../Components/CustomButton';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { useFetchTableData } from '../../../Hooks/useTable';
import withModal from '../../../HOC/withModal';
import withFilters from '../../../HOC/withFilters ';
import { getListing } from '../../../Services/Admin/FAQsManagement';
import { showErrorToast } from '../../../Utils/Utils';
// import videoThumbnail from '../../../assets/images/video-thumbnail.jpg'; // optional
import "./styles.css"

const FAQsManagement = ({
    showModal,
    closeModal,
    filters,
    setFilters,
    pagination,
    updatePagination,
}) => {
    usePageTitle('FAQs Management');
    const navigate = useNavigate();
    const queryClient = useQueryClient();

    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // GET FAQs
    const {
        data: fetchData,
        isLoading,
        isError,
        error,
    } = useFetchTableData('faqListing', filters, updatePagination, getListing);

    if (isError) {
        showErrorToast(error);
    }

    // ✅ Extract actual array safely
    // const faqs = fetchData?.data?.data || [];
    // const meta = fetchData?.data?.meta;
    console.log(fetchData?.data, "fetchData?.data?.data");

    return (
        <>
            <section>
                <div className="d-flex justify-content-between flex-wrap mb-3">
                    <h2 className="screen-title mb-0">FAQs Management</h2>
                    <div className="d-flex gap-2">
                        <CustomButton text="Add" onClick={() => navigate('add')} />
                        {/* <CustomButton
                            text="Edit"
                            onClick={() => navigate('edit')}
                            className="customButtonBor"
                        /> */}
                    </div>
                </div>
            </section>

            <div className="d-card py-45 mb-45 faqsMain">
                {/* Loader */}
                {isLoading && <p>Loading FAQs...</p>}

                {/* Empty State */}
                {!isLoading && fetchData?.data?.length === 0 && (
                    <p className="text-center text-muted">No FAQs found.</p>
                )}

                {/* FAQs Accordion */}
                {!isLoading && fetchData?.data?.length > 0 && (
                    <Accordion defaultActiveKey="0">
                        {fetchData?.data?.map((faq, index) => (
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
                                        <p className="text-muted mb-0">A) {faq.answer || 'No answer provided'}</p>
                                    )}
                                    {faq.type === 'image' && (
                                        <img src={faq.file} alt="" />
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
                                            onClick={() => navigate(`/admin/faq-Management/edit/${faq.id}`, { state: faq })}
                                        />
                                        <CustomButton
                                            text="Delete"
                                            className="dangerButton"
                                            onClick={() => handleDeleteFAQ(faq.id)}
                                        />
                                    </div>
                                </Accordion.Body>
                            </Accordion.Item>
                        ))}
                    </Accordion>
                )}

                {/* Pagination */}
                {/* {meta && (
                    <div className="d-flex justify-content-between align-items-center mt-3">
                        <p className="mb-0 small text-muted">
                            Showing {meta.from} to {meta.to} of {meta.total} entries
                        </p>
                        <ul className="pagination mb-0">
                            {meta.links.map((link, index) => (
                                <li
                                    key={index}
                                    className={`page-item ${link.active ? 'active' : ''} ${!link.url ? 'disabled' : ''
                                        }`}
                                >
                                    <button
                                        className="page-link"
                                        onClick={() => {
                                            if (link.url) {
                                                const pageParam = new URL(link.url).searchParams.get('page');
                                                setFilters((prev) => ({ ...prev, page: pageParam }));
                                            }
                                        }}
                                        dangerouslySetInnerHTML={{ __html: link.label }}
                                    />
                                </li>
                            ))}
                        </ul>
                    </div>
                )} */}
            </div>

            {/* Success Modal */}
            <CustomModal
                show={showSuccessModal}
                close={() => setShowSuccessModal(false)}
                variant="success"
                title="Success"
                description="FAQs have been updated successfully."
            />
        </>
    );
};

export default withModal(withFilters(FAQsManagement));
