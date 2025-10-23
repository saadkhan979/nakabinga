import { useMutation } from '@tanstack/react-query';
import { Formik } from 'formik';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../../Components/BackButton';
import CustomButton from '../../../Components/CustomButton';
import CustomInput from '../../../Components/CustomInput';
import CustomSelect from '../../../Components/CustomSelect';
import { showToast } from '../../../Components/Toast/Toast';
import withModal from '../../../HOC/withModal';
import { usePageTitle } from '../../../Hooks/usePageTitle';
import { addPlanData } from '../../../Services/Admin/SubscriptionManagement';
import { categoryOptions, durationOptions, statusNumberOptions } from '../../../Utils/Constants/SelectOptions';
import { addPlanValidationSchema } from '../../../Utils/Validations/ValidationSchemas';
import './styles.css';

const AddPlan = ({ showModal, closeModal, setModalLoading }) => {
    usePageTitle('New Plan');
    const navigate = useNavigate();

    // ✅ React Query Mutation
    const { mutate, isPending } = useMutation({
        mutationFn: addPlanData,
        onSuccess: (response) => {
            closeModal();
            showToast('Subscription Plan has been added successfully!', 'success');
            showModal(
                '',
                'Subscription Plan has been added successfully!',
                () => navigate('/admin/subscription-management/subscription-plan'),
                'success',
                null
            );
        },
        onError: (error) => {
            closeModal();
            showToast(error?.message || 'Something went wrong');
        },
    });

    // ✅ Submit handler
    const handleSubmit = (values) => {
        const payload = {
            name: values.name,
            description: values.description,
            price: values.price,
            duration: values.duration,
            is_active: values.is_active,
        };

        showModal(
            '',
            'Are you sure you want to add this plan?',
            () => {
                setModalLoading(true);
                mutate(payload, {
                    onSettled: () => setModalLoading(false),
                });
            },
            'warning',
            null
        );
    };

    return (
        <div className="d-card py-45 mb-45">
            <div className="d-flex align-items-start mb-4 justify-content-between flex-wrap">
                <div className="d-flex gap-2">
                    <BackButton />
                    <h3 className="screen-title m-0 d-inline">New Plan</h3>
                </div>
            </div>

            <Formik
                initialValues={{
                    name: "",
                    description: "",
                    price: "",
                    duration: "",
                    is_active: "",
                }}
                validationSchema={addPlanValidationSchema}
                onSubmit={handleSubmit}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                }) => (
                    <form onSubmit={handleSubmit} className="category-wrap">
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
                                    label="Price"
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
                        <div className="d-flex mt-4">
                            <CustomButton
                                variant="primeryButton"
                                className="px-5"
                                text="Add Plan"
                                pendingText="Submitting..."
                                isPending={isPending}
                                type="submit"
                            />
                        </div>
                    </form>
                )}
            </Formik>
        </div>
    );
};

export default withModal(AddPlan);
