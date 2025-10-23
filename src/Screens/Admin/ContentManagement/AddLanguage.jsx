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
import { addLanguageData, getLanguages } from '../../../Services/Admin/ContentManagement';
import { statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import { addLanguageValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import "./styles.css";
import FileUploader from '../../../Components/FileUploader/FileUploader';

const AddLanguage = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Add Language');
    const navigate = useNavigate();

    // React Query Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: addLanguageData,
        onSuccess: () => {
            closeModal(); // Close any open modals
            showToast('Language has been added successfully!', 'success'); // ✅ Toast on success
            showModal(
                "",
                "Language has been added successfully!",
                null,
                "success",
                () => navigate('/admin/content-management/language-management')
            );
        },
        onError: (error) => {
            closeModal();
            showToast(error?.message);
        },
    });
    const handleSubmit = (values) => {
        const payload = {
            name: values.name,
            language_id: values.language_id,
            is_active: values.is_active,
        };
        showModal(
            "",
            "Are You Sure, You Want To Add Language?",
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
                    <BackButton />
                    <h3 className="screen-title m-0 d-inline">Add Language</h3>
                </div>
            </div>

            <div className="">
                <Formik
                    initialValues={{
                        name: "",
                        language_id: "",
                        is_active: "",
                    }}
                    validationSchema={addLanguageValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className="category-wrap">
                            <div className="row">
                                <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4">
                                    <CustomInput
                                        label="Language"
                                        labelclass="mainLabel"
                                        type="text"
                                        required
                                        placeholder="Enter Language"
                                        inputClass="mainInput"
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
                                            text="Add Language"
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

export default withModal(AddLanguage);

