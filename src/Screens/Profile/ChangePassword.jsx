import { useMutation } from '@tanstack/react-query';
import { Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../../Components/BackButton';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import CustomModal from '../../Components/CustomModal';
import { showToast } from '../../Components/Toast/Toast';
import { passwordUpdate } from '../../Services/Admin/Profile';
import { changePasswordSchema } from '../../Utils/Validations/ValidationSchemas';
import useUserStore from '../../Stores/UserStore';

const ChangePassword = () => {
    const navigate = useNavigate();
    const { setUser } = useUserStore();
    const [showModal, setShowModal] = useState(false);

    const { mutate, isPending } = useMutation({
        mutationFn: passwordUpdate,
        onSuccess: (response) => {
            // setUser(response.data.data);
            console.log(response.data.data, "response999");
            setShowModal(true);
        },
        onError: (error) => {
            showToast(error?.message || 'Failed to update profile', 'error');
        },
    });
    const handleSubmit = (values) => {
        mutate(values);
    };

    return (
        <div>
            <h2 className="screen-title mb-4"><BackButton /> Change Password</h2>
            <div className="d-card py-45 px-4">
                <Formik
                    initialValues={{
                        old_password: '',
                        new_password: '',
                        confirm_password: '',
                    }}
                    validationSchema={changePasswordSchema}
                    onSubmit={handleSubmit}
                >
                    {({ values, handleChange, handleBlur, errors, touched, handleSubmit }) => (
                        <Form onSubmit={handleSubmit}>

                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <CustomInput
                                        name="old_password"
                                        type="password"
                                        label="Current Password"
                                        placeholder="Enter Current Password"
                                        required
                                        value={values.old_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.old_password && errors.old_password}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <CustomInput
                                        name="new_password"
                                        type="password"
                                        label="New Password"
                                        placeholder="Enter New Password"
                                        required
                                        value={values.new_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={touched.new_password && errors.new_password}
                                    />
                                </div>
                            </div>

                            <div className="row mb-4">
                                <div className="col-md-4">
                                    <CustomInput
                                        name="confirm_password"
                                        type="password"
                                        label="Confirm Password"
                                        placeholder="Confirm Password"
                                        required
                                        value={values.confirm_password}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        error={
                                            touched.confirm_password && errors.confirm_password
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mb-4">
                                <div className="col-md-12">
                                    <div className='d-flex'>
                                        <CustomButton
                                            type="submit"
                                            className={'primeryButton'}
                                            // onClick={() => setShowModal(true)}
                                            loading={isPending}
                                            text="Update Password"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
            <CustomModal
                show={showModal}
                close={() => setShowModal(false)}
                variant="success"
                title="Successful"
                description="Password Has Been Updated Successfully!"
                action={() => {
                    navigate('/admin/profile');
                    // navigate(-1);
                }}
            />
        </div>
    );
};

export default ChangePassword;
