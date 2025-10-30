import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomInput from '../../../Components/CustomInput';
import ImageUploader from '../../../Components/ImageUploader/ImageUploader';
import { showToast } from '../../../Components/Toast/Toast';
import VideoUploader from '../../../Components/VideoUploader/VideoUploader';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { editData } from '../../../Services/Admin/FAQsManagement';
import { addFAQsValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import "./styles.css";

const EditFAQs = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Edit FAQs');
    const navigate = useNavigate();
    const location = useLocation();
    const { id } = useParams();

    // FAQ data from navigation state
    const faqData = location.state;

    const { mutate, isPending } = useMutation({
        mutationFn: ({ id, formData }) => editData(id, formData),
        onSuccess: () => {
            closeModal();
            showToast('FAQs has been updated successfully!', 'success');
            showModal(
                "",
                "FAQs has been updated successfully!",
                null,
                "success",
                () => navigate('/admin/faq-Management')
            );
        },
        onError: (error) => {
            closeModal();
            showToast(error?.message);
        },
    });

    const handleFormSubmit = (values) => {
        const payload = {
            question: values.question,
            type: values.type,
        };

        if (values.type === 'text') {
            payload.answer = values.answer;
        } else if (values.type === 'image' || values.type === 'video') {
            payload.file = values.file?.file || values.file || values.video?.file || values.video;
        }

        showModal(
            "",
            "Are You Sure, You Want To Update FAQs?",
            () => {
                setModalLoading(true);
                mutate(
                    { id: faqData.id, formData: payload },
                    { onSettled: () => setModalLoading(false) }
                );
            },
            "warning",
            null
        );
    };

    return (
        <div className='d-card py-45 mb-45'>
            <div className="d-flex align-items-start mb-4 justify-content-between flex-wrap">
                <div className="d-flex gap-2">
                    <BackButton />
                    <h3 className="screen-title m-0 d-inline">Edit FAQs</h3>
                </div>
            </div>

            <Formik
                initialValues={{
                    question: faqData?.question || '',
                    answer: faqData?.answer || '',
                    type: faqData?.type || '',
                    file: faqData?.type === 'image' && faqData?.file ? { url: faqData.file } : null,
                    video: faqData?.type === 'video' && faqData?.file ? { url: faqData.file } : null,
                }}
                validationSchema={addFAQsValidationSchema}
                onSubmit={handleFormSubmit}
                enableReinitialize
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit} className="category-wrap">
                        {/* Question Field */}
                        <div className="row">
                            <div className="col-md-12">
                                <CustomInput
                                    label="Question"
                                    labelclass="mainLabel"
                                    type="text"
                                    required
                                    placeholder="Enter Question"
                                    inputClass="mainInput"
                                    id="question"
                                    value={values.question}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.question && errors.question}
                                />
                            </div>
                        </div>

                        {/* Radio Buttons */}
                        <div className="row">
                            <div className="col-md-12">
                                <label className="mainLabel fw-semibold mb-2">Answer Type:</label>
                                <div className="d-flex gap-4 mb-3 flex-wrap">
                                    <label className="d-flex align-items-center gap-2">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="text"
                                            checked={values.type === 'text'}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setFieldValue('answer', '');
                                                setFieldValue('file', null);
                                                setFieldValue('video', null);
                                            }}
                                        />
                                        Text
                                    </label>

                                    <label className="d-flex align-items-center gap-2">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="image"
                                            checked={values.type === 'image'}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setFieldValue('answer', '');
                                                setFieldValue('file', null);
                                                setFieldValue('video', null);
                                            }}
                                        />
                                        Image
                                    </label>

                                    <label className="d-flex align-items-center gap-2">
                                        <input
                                            type="radio"
                                            name="type"
                                            value="video"
                                            checked={values.type === 'video'}
                                            onChange={(e) => {
                                                handleChange(e);
                                                setFieldValue('answer', '');
                                                setFieldValue('file', null);
                                                setFieldValue('video', null);
                                            }}
                                        />
                                        Video
                                    </label>
                                </div>
                                {touched.type && errors.type && (
                                    <div className="error">{errors.type}</div>
                                )}
                            </div>
                        </div>

                        {/* Conditional Fields */}
                        {values.type === 'text' && (
                            <div className="row">
                                <div className="col-md-12">
                                    <CustomInput
                                        label="Text Answer:"
                                        labelclass="mainLabel"
                                        type="textarea"
                                        placeholder="Enter Answer"
                                        inputClass="mainInput rounded-4"
                                        id="answer"
                                        rows={6}
                                        value={values.answer}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.answer && errors.answer}
                                    />
                                </div>
                            </div>
                        )}

                        {values.type === 'image' && (
                            <div className="row">
                                <div className="col-md-6">
                                    <ImageUploader
                                        label="Upload Image:"
                                        required={true}
                                        image={values.file}
                                        onChange={(fileObj) => setFieldValue("file", fileObj)}
                                        height="252px"
                                        className="inputWrapper"
                                        uploadImage="Upload Image"
                                        error={touched.file && errors.file}
                                    />
                                </div>
                            </div>
                        )}

                        {values.type === 'video' && (
                            <div className="row">
                                <div className="col-md-6">
                                    <VideoUploader
                                        label="Upload Video:"
                                        required={true}
                                        video={values.video}
                                        onChange={(fileObj) => setFieldValue("video", fileObj)}
                                        height="252px"
                                        className="inputWrapper"
                                        uploadText="Upload Video"
                                        error={touched.video && errors.video}
                                    />
                                </div>
                            </div>
                        )}

                        {/* Submit Button */}
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex">
                                    <CustomButton
                                        variant="primeryButton"
                                        className="px-5"
                                        text="Update"
                                        pendingText="Updating..."
                                        isPending={isPending}
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default withModal(EditFAQs);
