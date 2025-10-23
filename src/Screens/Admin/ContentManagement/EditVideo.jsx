import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomInput from '../../../Components/CustomInput';
import CustomSelect from '../../../Components/CustomSelect';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { editData, getLanguages, viewUser } from '../../../Services/Admin/ContentManagement';
import { statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import { addVideoValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import ImageUploader from '../../../Components/ImageUploader/ImageUploader';
import { useState } from 'react';
import "./styles.css";
import Skeleton from 'react-loading-skeleton';
import VideoUploader from '../../../Components/VideoUploader/VideoUploader';

const EditVideo = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Edit Video');
    const navigate = useNavigate();
    const { id } = useParams();
    const [picture, setPicture] = useState(null);

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


    // ✅ Fetch existing category details
    const {
        data: fetchedData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['video', id],
        queryFn: () => viewUser(id),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // ✅ Mutation for editing
    const { mutate, isPending } = useMutation({
        mutationFn: editData,
        onSuccess: () => {
            closeModal();
            showToast('Video has been updated successfully!', 'success');
            showModal(
                "",
                "Video Has Been Updated Successfully!",
                () => navigate('/admin/content-management'),
                "success",
                null
            );
        },
        onError: (error) => {
            closeModal();
            showToast(error?.message || 'Failed To Update Video', 'Error');
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
            "Are You Sure You Want To Update This Video?",
            () => {
                setModalLoading(true);
                // mutate({ id, payload }); // ✅ Pass id & payload correctly
                // mutate(id, payload, {
                //     onSettled: () => setModalLoading(false), // ✅ Stop loader after API call
                // });
                mutate(
                    { id, payload },
                    {
                        onSettled: () => setModalLoading(false),
                    }
                );

            },
            "warning",
            null
        );
    };

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
        <div className='d-card py-45 mb-45'>
            <div className="d-flex align-items-start mb-4 justify-content-between flex-wrap">
                <div className="d-flex gap-2">
                    <BackButton />
                    <h3 className="screen-title m-0 d-inline">Edit Video</h3>
                </div>
            </div>

            <Formik
                enableReinitialize
                initialValues={{

                    title: fetchedData?.title || '',
                    language_id: fetchedData?.language?.id || '',
                    is_active: fetchedData?.is_active?.toString() || '',
                    description: fetchedData?.description || '',
                    // thumbnail: fetchedData?.thumbnail || '',
                    // video: fetchedData?.video || '',

                    thumbnail: fetchedData?.thumbnail
                        ? { url: fetchedData.thumbnail, file: null }
                        : { url: '', file: null },
                    video: fetchedData?.video
                        ? { url: fetchedData.video, file: null }
                        : { url: '', file: null },
                }}
                validationSchema={addVideoValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    < form onSubmit={handleSubmit} className="category-wrap">
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
                        <div className="row">
                            <div className="col-md-12">
                                <div className="d-flex">
                                    <CustomButton
                                        variant="primeryButton"
                                        className="px-5"
                                        text="Update"
                                        pendingText="Submitting..."
                                        isPending={isPending}
                                        type="submit"
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
        </div >
    );
};

export default withModal(EditVideo);
