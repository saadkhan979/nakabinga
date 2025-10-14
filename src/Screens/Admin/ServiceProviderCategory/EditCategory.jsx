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
import { editData, viewUser } from '../../../Services/Admin/ServiceProviderCategory';
import { statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import { categoryValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import ImageUploader from '../../../Components/ImageUploader/ImageUploader';
import { useState } from 'react';
import "./styles.css";
import Skeleton from 'react-loading-skeleton';

const EditCategory = ({ showModal, closeModal }) => {
    usePageTitle('Edit Category');
    const navigate = useNavigate();
    const { id } = useParams();
    const [picture, setPicture] = useState(null);

    // ✅ Fetch existing category details
    const {
        data: fetchedData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['category', id],
        queryFn: () => viewUser(id),
        refetchOnWindowFocus: false,
        retry: 1,
    });
    console.log(fetchedData, "fetchedData77777777777");

    // ✅ Mutation for editing
    const { mutate, isPending } = useMutation({
        mutationFn: editData,
        onSuccess: () => {
            closeModal();
            showToast('Category has been updated successfully!', 'success');
            showModal(
                "",
                "Category Has Been Updated Successfully!",
                () => navigate('/admin/service-provider-category'),
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
            "Are You Sure You Want To Update This Category?",
            () => {
                showToast('Updating category, please wait...', 'info');
                const payload = new FormData();
                payload.append('name', values.name);
                payload.append('is_active', values.is_active);
                payload.append('type', 'service_provider');
                if (values.image?.file) payload.append('file', values.image.file);

                mutate({ id, payload }); // ✅ Pass id & payload correctly
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
                    <h3 className="screen-title m-0 d-inline">Edit Category</h3>
                </div>
            </div>

            <Formik
                enableReinitialize
                initialValues={{
                    name: fetchedData?.name || '',
                    is_active: fetchedData?.is_active ?? '',
                    image: fetchedData?.image
                        ? { url: fetchedData.image, file: null }
                        : { url: '', file: null },
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
                            <div className="col-md-12 categoryPicture">
                                <ImageUploader
                                    label="Category Picture"
                                    required={true}
                                    image={values.image}
                                    onChange={(fileObj) => setFieldValue("image", fileObj)}
                                    height="200px"
                                    className="inputWrapper"
                                    uploadImage="Upload Image"
                                    error={touched.image && errors.image}
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
        </div>
    );
};

export default withModal(EditCategory);