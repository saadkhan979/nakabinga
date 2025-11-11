
import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import AudioUploader from '../../../Components/AudioUploader/AudioUploader';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomInput from '../../../Components/CustomInput';
import CustomSelect from '../../../Components/CustomSelect';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { editData, getAudioCategory, viewUser } from '../../../Services/Admin/AudioManagement';
import { statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import "./styles.css";
import { audioValidationSchema } from '../../../Utils/Validations/ValidationSchemas';

const EditAudio = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Edit Audio');
    const navigate = useNavigate();
    const { id } = useParams();
    const [picture, setPicture] = useState(null);

    const { data: audioCategoryData } = useQuery({
        queryKey: ['audioCategory'],
        queryFn: getAudioCategory, // imported from ../../../Services/Admin/ContentManagement
        staleTime: 5 * 60 * 1000, // cache 5 mins
    });

    const audioCategoryOptions =
        audioCategoryData?.data?.map((cat) => ({
            label: cat.name,
            value: cat.id,
        })) || [];

    // ✅ Fetch existing category details
    const {
        data: fetchedData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['audio', id],
        queryFn: () => viewUser(id),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // ✅ Mutation for editing
    const { mutate, isPending } = useMutation({
        mutationFn: ({ formData, id }) => editData(formData, id),
        onSuccess: () => {
            closeModal();
            showToast('Audio has been updated successfully!', 'success');
            showModal(
                "",
                "Audio Has Been Updated Successfully!",
                () => navigate('/admin/audio-management'),
                "success",
                null
            );
        },
        onError: (error) => {
            closeModal();
            showToast(error?.message || 'Failed to update category', 'error');
        },
    });

    const handleSubmit = (values) => {
        showModal(
            "",
            "Are You Sure You Want To Update This Audio?",
            () => {
                setModalLoading(true);
                mutate(
                    { formData: values, id },
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
                    <h3 className="screen-title m-0 d-inline">Edit Audio</h3>
                </div>
            </div>

            <Formik
                enableReinitialize
                initialValues={{
                    title: fetchedData?.title || '',
                    category_id: fetchedData?.category_id ?? '',
                    is_active: fetchedData?.is_active ?? '',
                    file: fetchedData?.file
                        ? { url: fetchedData.file, file: null }
                        : { url: '', file: null },
                }}
                validationSchema={audioValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    <form onSubmit={handleSubmit} className="category-wrap">

                        <div className="row">
                            <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4">
                                <CustomInput
                                    label="Title"
                                    labelclass="mainLabel"
                                    type="text"
                                    required
                                    placeholder="Enter Title"
                                    inputclass="mainInput"
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
                                    label="Category"
                                    required
                                    name="category_id"
                                    options={audioCategoryOptions}
                                    firstIsLabel={true}
                                    fullWidth
                                    className="mainInput"
                                    extraClass="w-100"
                                    onChange={handleChange}
                                    value={values.category_id}
                                    onBlur={handleBlur}
                                    error={touched.category_id && errors.category_id}
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
                                <AudioUploader
                                    label="Upload Audio"
                                    required={true}
                                    audio={values.file}  // ✅ prop name matches component
                                    onChange={(fileObj) => setFieldValue("file", fileObj)} // ✅ Formik field update
                                    height="200px"
                                    className="inputWrapper"
                                    uploadText="Click to Upload an Audio File"
                                    error={touched.file && errors.file}
                                />
                                {/* {values.audio && (
                                        <div className="mt-3">
                                            <strong>File selected:</strong> {values.audio.file?.name}
                                        </div>
                                    )} */}

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
        </div>
    );
};

export default withModal(EditAudio);
