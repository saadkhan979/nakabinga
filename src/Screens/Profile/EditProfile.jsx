import { useMutation } from '@tanstack/react-query';
import { ErrorMessage, Form, Formik } from 'formik';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// import UploadprofileIcone from '../../assets/images/uploadprofileIcone.svg?react';
import BackButton from '../../Components/BackButton';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';
import CustomModal from '../../Components/CustomModal';
import useUserStore from '../../Stores/UserStore';
import { validateImage, isNullOrEmpty, countriesWithdialingCodesAndFlag } from '../../Utils/Utils';
import { showToast } from '../../Components/Toast/Toast';
import { editAdminProfileSchema } from '../../Utils/Validations/ValidationSchemas';
import { userProfileUpdate } from '../../Services/Admin/Profile';
import { Col, Row } from 'react-bootstrap';
import PhoneInput, { parsePhoneNumber } from 'react-phone-number-input';
import { FaCamera } from 'react-icons/fa6';

const EditProfile = ({ setModalLoading }) => {
    const navigate = useNavigate();
    const { user, setUser } = useUserStore();
    const [showModal, setShowModal] = useState(false);
    const { mutate, isPending } = useMutation({
        mutationFn: userProfileUpdate,
        onSuccess: (response) => {
            setUser(response.data.data);
            setShowModal(true);
        },
        onError: (error) => {
            showToast(error?.message || 'Failed to update profile', 'error');
        },
    });
    const handleSubmit = (values) => {
        mutate(values);
    };


    const [profilePic, setProfilePic] = useState();

    const handleImageChange = (e, setFieldValue, setFieldError) => {
        const file = e.target.files[0];
        if (validateImage(file)) {
            setFieldValue("image", file);
            setProfilePic(URL.createObjectURL(file));
        } else {
            setFieldValue("image", "");
            // setProfilePic(URL.createObjectURL(file));
            // setFieldValue('avatar', file);
        }
    };
    return (
        <div>
            <h2 className="screen-title"><BackButton /> Edit Profile</h2>
            <div className="d-card py-45 px-4">
                <Formik
                    initialValues={{
                        first_name: user?.first_name || '',
                        last_name: user?.last_name || '',
                        country_code: user?.country_code || "",
                        dial_code: user?.dial_code || "",
                        phone: user?.phone || "",
                        image: user?.avatar || "",
                    }}
                    validationSchema={editAdminProfileSchema}
                    onSubmit={handleSubmit}
                >
                    {({
                        values,
                        errors,
                        touched,
                        handleChange,
                        handleBlur,
                        setFieldValue,
                        handleSubmit,
                        setFieldError,

                    }) => (
                        <Form onSubmit={handleSubmit}>
                            <Row>
                                <Col md={6} xs={6}>
                                    <Row>
                                        <Col md={12} xs={12}>
                                            <div className="adminProfileImage mb-4">
                                                {/* <img src={profilePic ?? user?.avatar} alt="User" /> */}
                                                <img src={profilePic || values?.image} alt="User" />
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    className="d-none"
                                                    id="profileImage"
                                                    onChange={(event) => handleImageChange(event, setFieldValue, setFieldError)}
                                                />
                                                <label htmlFor="profileImage" className="imageUploadButton">
                                                    <FaCamera />
                                                </label>
                                            </div>
                                            {errors.image && <div className="errorText red-text">{errors.image}</div>}
                                        </Col>
                                        <Col md={12} xs={12}>
                                            <CustomInput
                                                label="First Name"
                                                required
                                                name="first_name"
                                                id="first_name"
                                                type="text"
                                                placeholder="Enter First Name"
                                                value={values.first_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.first_name && errors.first_name}
                                            />
                                        </Col>
                                        <Col md={12} xs={12}>
                                            <CustomInput
                                                label="Last Name"
                                                required
                                                name="last_name"
                                                id="last_name"
                                                type="text"
                                                placeholder="Enter Last Name"
                                                value={values.last_name}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                error={touched.last_name && errors.last_name}
                                            />
                                        </Col>
                                        <Col md={12} xs={12} className="inputWrapper">
                                            <label className="mainLabel bold">Phone Number <span className='text-danger'>*</span></label>
                                            <PhoneInput
                                                placeholder="Enter phone number"
                                                className="mainInput"
                                                defaultCountry={values.country_code}
                                                // value={values?.phone}
                                                value={values.dial_code + values.phone}
                                                onChange={(value) => {
                                                    if (!value) {
                                                        setFieldValue('dial_code', '');
                                                        setFieldValue('country_code', '');
                                                        setFieldValue('phone', '');
                                                        return;
                                                    }

                                                    const parsed = parsePhoneNumber(value);
                                                    if (parsed) {
                                                        setFieldValue('country_code', parsed.country);
                                                        setFieldValue('dial_code', parsed.countryCallingCode ? `+${parsed.countryCallingCode}` : '');
                                                        setFieldValue('phone', parsed.nationalNumber || '');
                                                    }
                                                }}
                                                onBlur={handleBlur}
                                                error={touched.phone && errors.phone}
                                            />
                                            <ErrorMessage
                                                name="phone"
                                                component="div"
                                                className="input-error-message text-danger"
                                            />
                                        </Col>
                                        <Col xs={12}>
                                            <div className="my-md-0 my-2 d-inline-block">
                                                <CustomButton
                                                    className="primeryButton"
                                                    type="Update"
                                                    loading={isPending}
                                                >
                                                    Update
                                                </CustomButton>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                            </Row>
                        </Form>
                    )}
                </Formik>

            </div >

            <CustomModal
                show={showModal}
                close={() => setShowModal(false)}
                variant="success"
                title="Successful"
                description="Profile Has Been Updated Successfully"
                action={() => {
                    setShowModal(false);
                }}
            />
        </div >
    );
};

export default EditProfile;
