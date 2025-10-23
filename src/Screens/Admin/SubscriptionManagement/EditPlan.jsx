import { useMutation, useQuery } from '@tanstack/react-query';
import { Formik } from 'formik';
import Skeleton from 'react-loading-skeleton';
import { useNavigate, useParams } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomInput from '../../../Components/CustomInput';
import CustomSelect from '../../../Components/CustomSelect';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { editData, viewUser } from '../../../Services/Admin/SubscriptionManagement';
import { categoryOptions, durationOptions, statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import { addPlanValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import "./styles.css";
import { FaDollarSign } from 'react-icons/fa6';

const EditPlan = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('Edit Plan');
    const navigate = useNavigate();
    const { id } = useParams();

    // ✅ Fetch existing category details
    const {
        data: fetchedData,
        isLoading,
        isError,
        error,
    } = useQuery({
        queryKey: ['Plan', id],
        queryFn: () => viewUser(id),
        refetchOnWindowFocus: false,
        retry: 1,
    });

    // ✅ Mutation for editing
    const { mutate, isPending } = useMutation({
        mutationFn: editData,
        onSuccess: () => {
            closeModal();
            showToast('Plan has been updated successfully!', 'success');
            showModal(
                "",
                "Plan Has Been Updated Successfully!",
                () => navigate('/admin/subscription-management/subscription-plan'),
                "success",
                null
            );
        },
        onError: (error) => {
            closeModal();
            showToast(error?.message || 'Failed To Update Plan', 'Error');
        },
    });

    const handleSubmit = (values) => {
        const payload = {
            name: values.name,
            duration: values.duration,
            category: values.category,
            price: values.price,
            is_active: values.is_active,
            description: values.description,
        };
        showModal(
            "",
            "Are You Sure You Want To Update This Plan?",
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
                    <h3 className="screen-title m-0 d-inline">Edit Plan</h3>
                </div>
            </div>

            <Formik
                enableReinitialize
                initialValues={{

                    name: fetchedData?.name || '',
                    duration: fetchedData?.duration || '',
                    category: fetchedData?.category || '',
                    price: fetchedData?.price || '',
                    is_active: fetchedData?.is_active?.toString() || '',
                    description: fetchedData?.description || '',
                }}
                validationSchema={addPlanValidationSchema}
                onSubmit={handleSubmit}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, setFieldValue }) => (
                    < form onSubmit={handleSubmit} className="category-wrap">
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    label="Subscription Plan Title"
                                    labelclass="mainLabel"
                                    type="text"
                                    required
                                    placeholder="Enter Subscription Plan Title"
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
                            <div className="col-md-6">
                                <CustomSelect
                                    label="Duration"
                                    required
                                    name="duration"
                                    options={durationOptions}
                                    firstIsLabel={true}
                                    fullWidth
                                    className="mainInput"
                                    extraClass="w-100"
                                    onChange={handleChange}
                                    value={values.duration}
                                    onBlur={handleBlur}
                                    error={touched.duration && errors.duration}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomSelect
                                    label="Category"
                                    required
                                    name="category"
                                    options={categoryOptions}
                                    firstIsLabel={true}
                                    fullWidth
                                    className="mainInput"
                                    extraClass="w-100"
                                    onChange={handleChange}
                                    value={values.category}
                                    onBlur={handleBlur}
                                    error={touched.category && errors.category}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <CustomInput
                                    label="Price 123"
                                    labelclass="mainLabel"
                                    type="number"
                                    required
                                    placeholder="Enter Price"
                                    inputClass="mainInput"
                                    containerClass="iconleft"
                                    id="price"
                                    value={values.price}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.price && errors.price}
                                    rightIcon={FaDollarSign}
                                />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
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
                            <div className="col-md-6">
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

export default withModal(EditPlan);
