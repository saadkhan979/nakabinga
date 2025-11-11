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
import { addAudioCategoryData } from '../../../Services/Admin/AudioManagement';
import { statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import "./styles.css";
import { audioCategoryValidationSchema } from '../../../Utils/Validations/ValidationSchemas';

const AddAudioCategory = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Add Category');
    const navigate = useNavigate();

    // ✅ React Query Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: addAudioCategoryData,
        onSuccess: () => {
            closeModal(); // Close any open modals
            showToast('Audio Category has been added successfully!', 'success'); // ✅ Toast on success
            showModal(
                "",
                "Audio Category Has Been Added Successfully!",
                () => navigate('/admin/audio-management/audio-category-management'),
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
            "Are You Sure, You Want To Add Audio Category?",
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
                    <h3 className="screen-title m-0 d-inline">Add Category</h3>
                </div>
            </div>

            <div className="">
                <Formik
                    initialValues={{
                        name: "",
                        is_active: "",
                        type: "audio",
                    }}
                    validationSchema={audioCategoryValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className="category-wrap">
                            <div className="row">
                                <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4">
                                    <CustomInput
                                        label="Category Name"
                                        labelclass="mainLabel"
                                        type="text"
                                        required
                                        placeholder="Enter Category Name"
                                        inputclass="mainInput"
                                        id="name"
                                        value={values.name}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.name && errors.name}
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
                            <div className="row ">
                                <div className="col-md-12">
                                    <div className="d-flex">
                                        <CustomButton
                                            variant="primeryButton"
                                            className="px-5"
                                            text="Add Category"
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

export default withModal(AddAudioCategory);
