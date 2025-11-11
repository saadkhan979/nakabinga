import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import AudioUploader from '../../../Components/AudioUploader/AudioUploader';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomInput from '../../../Components/CustomInput';
import CustomSelect from '../../../Components/CustomSelect';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { addData, getAudioCategory } from '../../../Services/Admin/AudioManagement';
import { statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import "./styles.css";
import { audioValidationSchema } from '../../../Utils/Validations/ValidationSchemas';

const AddAudio = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Add Audio');
    const navigate = useNavigate();

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

    // ✅ React Query Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: addData,
        onSuccess: () => {
            closeModal(); // Close any open modals
            showToast('Audio has been added successfully!', 'success'); // ✅ Toast on success
            showModal(
                "",
                "Audio Has Been Added Successfully!",
                () => navigate('/admin/audio-management'),
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
        showModal(
            "",
            "Are You Sure, You Want To Add Audio?",
            () => {
                setModalLoading(true);
                mutate(values, {
                    onSettled: () => setModalLoading(false),
                });
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
                    <h3 className="screen-title m-0 d-inline">Add Audio</h3>
                </div>
            </div>

            <div className="">
                <Formik
                    initialValues={{
                        title: "",
                        category_id: "",
                        is_active: "",
                        file: "",
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
                                        onChange={(fileObj) => setFieldValue("audio", fileObj)} // ✅ Formik field update
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
                            <div className="row ">
                                <div className="col-md-12">
                                    <div className="d-flex">
                                        <CustomButton
                                            variant="primeryButton"
                                            className="px-5"
                                            text="Add Audio"
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

export default withModal(AddAudio);
