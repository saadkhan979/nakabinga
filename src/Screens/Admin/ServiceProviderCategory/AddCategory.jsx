import { useMutation } from '@tanstack/react-query';
import { FieldArray, Formik } from 'formik';
import { FaPlus } from 'react-icons/fa';
import { IoCloseOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomInput from '../../../Components/CustomInput';
import CustomSelect from '../../../Components/CustomSelect';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { addData } from '../../../Services/Admin/ServiceProviderCategory';
import { statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import { categoryValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import "./styles.css";
import { userStatusFilters } from '../../../Utils/Constants/TableFilter';
import ImageUploader from '../../../Components/ImageUploader/ImageUploader';
import { useState } from 'react';

const AddCategory = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Add Category');
    const navigate = useNavigate();

    const [picture, setPicture] = useState(null);

    // ✅ React Query Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: addData,
        onSuccess: () => {
            closeModal(); // Close any open modals
            showToast('Category has been added successfully!', 'success'); // ✅ Toast on success
            showModal(
                "",
                "Category Has Been Added Successfully!",
                () => navigate('/admin/service-provider-category'),
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
            "Are You Sure, You Want To Add Category?",
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
                        image: "",
                        type: 'service_provider',
                    }}
                    validationSchema={categoryValidationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                        <form onSubmit={handleSubmit} className="category-wrap">
                            <div className="row">
                                <div className="col-md-8 col-lg-6 col-xl-4 col-xxl-4">
                                    <CustomInput
                                        label="Category Title"
                                        labelclass="mainLabel"
                                        type="text"
                                        required
                                        placeholder="Enter Category Title"
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
                            <div className="row">
                                <div className="col-md-12 col-lg-12 col-xl-12 col-xxl-12 categoryPicture">
                                    <ImageUploader
                                        label="Category Picture"
                                        required={true}
                                        image={values.image}   // 👈 Use Formik value
                                        onChange={(fileObj) => setFieldValue("image", fileObj)} // 👈 Update Formik
                                        height="200px"
                                        className="inputWrapper"
                                        uploadImage="Upload Image"
                                        error={touched.image && errors.image}
                                    />

                                    {picture && (
                                        <div className="mt-3">
                                            <strong>File selected:</strong> {picture.file.name}
                                        </div>
                                    )}
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

export default withModal(AddCategory);
