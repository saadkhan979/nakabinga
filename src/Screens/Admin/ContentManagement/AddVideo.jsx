import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomInput from '../../../Components/CustomInput';
import CustomSelect from '../../../Components/CustomSelect';
import ImageUploader from '../../../Components/ImageUploader/ImageUploader';
import { showToast } from '../../../Components/Toast/Toast';
import VideoUploader from '../../../Components/VideoUploader/VideoUploader';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { addData, getLanguages } from '../../../Services/Admin/ContentManagement';
import { statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import { addVideoValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import "./styles.css";

const AddVideo = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Add Video');
    const navigate = useNavigate();

    // Fetch languages list for dropdown
    const { data: languagesData } = useQuery({
        queryKey: ['languagesList'],
        queryFn: getLanguages, // imported from ../../../Services/Admin/ContentManagement
        staleTime: 5 * 60 * 1000, // cache 5 mins
    });

    // Format languages for CustomSelect
    const languageOptions =
        languagesData?.data?.map((lang) => ({
            label: lang.name,
            value: lang.id,
        })) || [];

    // React Query Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: addData,
        onSuccess: () => {
            closeModal(); // Close any open modals
            showToast('video has been added successfully!', 'success'); // ✅ Toast on success
            showModal(
                "",
                "video has been added successfully!",
                () => navigate('/admin/content-management'),
                "success",
                null
            );
        },
        onError: (error) => {
            closeModal();
            showToast(error?.message);
        },
    });
    const handleSubmit = (values) => {
        const payload = {
            title: values.title,
            language_id: values.language_id,
            is_active: values.is_active,
            description: values.description,
            image: values.thumbnail.file,
            file: values.video.file,
        };
        showModal(
            "",
            "Are You Sure, You Want To Add Video?",
            () => {
                setModalLoading(true); // ✅ Start loader on Yes button
                mutate(payload, {
                    onSettled: () => setModalLoading(false), // ✅ Stop loader after API call
                });
            },
            "warning",
            null,
        );
    };

    return (
        <div className='d-card py-45 mb-45'>
            <div className="d-flex align-items-start mb-4 justify-content-between flex-wrap">
                <div className="d-flex gap-2">
                    <BackButton url="/admin/content-management" state={{ activeTab: 'videos' }} />
                    <h3 className="screen-title m-0 d-inline">Add Video</h3>
                </div>
            </div>

            <div className="">
                <Formik
                    initialValues={{
                        title: "",
                        language_id: "",
                        is_active: "",
                        description: "",
                        thumbnail: "",
                        video: "",
                    }}
                    validationSchema={addVideoValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className="category-wrap">
                            <div className="row">
                                <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4">
                                    <CustomInput
                                        label="Video Title"
                                        labelclass="mainLabel"
                                        type="text"
                                        required
                                        placeholder="Enter Video Title"
                                        inputClass="mainInput"
                                        id="title"
                                        value={values.title}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.title && errors.title}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4">
                                    <CustomSelect
                                        label="Language"
                                        required
                                        name="language_id"
                                        options={languageOptions}
                                        firstIsLabel={true}
                                        fullWidth
                                        className="mainInput"
                                        extraClass="w-100"
                                        onChange={(e) => setFieldValue('language_id', e.target.value)}
                                        value={values.language_id}
                                        onBlur={handleBlur}
                                        error={touched.language_id && errors.language_id}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4">
                                    <CustomSelect
                                        label="Status"
                                        required
                                        name="is_active"
                                        options={statusNumberOptions}
                                        firstIsLabel={true}
                                        fullWidth
                                        className="mainInput"
                                        extraClass="w-100"
                                        onChange={handleChange}
                                        value={values.is_active}
                                        onBlur={handleBlur}
                                        error={touched.is_active && errors.is_active}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4">
                                    <CustomInput
                                        label="Description"
                                        labelclass="mainLabel"
                                        type="textarea"
                                        required
                                        placeholder="Enter Description"
                                        inputClass="mainInput rounded-4"
                                        id="description"
                                        rows={6}
                                        value={values.description}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.description && errors.description}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <ImageUploader
                                        label="Thumbnail Image"
                                        required={true}
                                        image={values.thumbnail}
                                        onChange={(fileObj) => setFieldValue("thumbnail", fileObj)} // 👈 Update Formik
                                        height="252px"
                                        className="inputWrapper"
                                        uploadImage="Upload Image"
                                        error={touched.thumbnail && errors.thumbnail}
                                    />
                                </div>
                                <div className="col-md-6 col-lg-6 col-xl-6 col-xxl-6">
                                    <VideoUploader
                                        label="Upload Video"
                                        required={true}
                                        video={values.video} // 👈 use Formik field for video
                                        onChange={(fileObj) => setFieldValue("video", fileObj)} // 👈 update Formik value
                                        height="252px"
                                        className="inputWrapper"
                                        uploadText="Upload Video"
                                        error={touched.video && errors.video}
                                    />
                                </div>
                            </div>
                            <div className="row ">
                                <div className="col-md-12">
                                    <div className="d-flex">
                                        <CustomButton
                                            variant="primeryButton"
                                            className="px-5"
                                            text="Add Video"
                                            pendingText="Submitting..."
                                            isPending={isPending} // ✅ Mutation pending state
                                            type="submit"
                                        />
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                </Formik >
            </div >
        </div >
    );
};

export default withModal(AddVideo);

