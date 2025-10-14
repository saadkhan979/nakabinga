import * as Yup from 'yup';

export const signUpValidationSchema = Yup.object().shape({
  business_name: Yup.string()
    .required('Business Name is required')
    .max(50, 'Business Name must be at most 50 characters'),
  user_name: Yup.string()
    .required('Full Name is required')
    .matches(
      /^[a-zA-Z]+(?: [a-zA-Z]+)*$/,
      'Full Name must contain only letters'
    )
    .max(39, 'Full Name must be at most 39 characters'),
  user_id: Yup.string()
    .required('User ID is required')
    .max(30, 'User ID must be at most 30 characters'),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be atleast 8 characters long'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Please re-enter your new password'),
});
export const changePasswordValidation = Yup.object().shape({
  current_password: Yup.string().required('Current Password is required'),
  password: Yup.string()
    .required('New Password is required')
    .min(8, 'Password must be atleast 8 characters long'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match.')
    .label('Confirm Password'),
});
export const loginValidationSchema = Yup.object().shape({
  user_id: Yup.string().required('User ID is required'),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});
export const forgotEmail = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email address is required'),
});
export const forgotCode = Yup.object().shape({
  verificationCode: Yup.string()
    .required('Verification code is required')
    .matches(/^\d{6}$/, 'Verification code must be 6 digits'),
});
export const forgotPassword = Yup.object().shape({
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
  password_confirmation: Yup.string()
    .required('Confirm Password is required')
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .label('Confirm Password'),
});
export const adminLoginValidationSchema = Yup.object().shape({
  email: Yup.string().required('Email is required'),
  password: Yup.string()
    // .min(8, 'Password must be at least 8 characters')
    .required('Password is required'),
});

export const editAdminProfileSchema = Yup.object({
  first_name: Yup.string().required('First name is required'),
  last_name: Yup.string().required('Last name is required'),
  country_code: Yup.string().required('Country Code is required'),
  phone: Yup.string().required('Phone Number is required'),
});
export const editProfileSchema = Yup.object({
  business_name: Yup.string().required('Business name is required'),
  user_name: Yup.string().required('User name is required'),
  phone: Yup.string().required('Phone Number is required'),
});
export const changePasswordSchema = Yup.object({
  current_password: Yup.string().required('Current Password is required'),
  password: Yup.string().required('New Password is required'),
  password_confirmation: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords do not match')
    .required('Please re-enter your new password'),
});



export const reasonValidationSchema = Yup.object({
  reason: Yup.string()
    .required('Reason is required')
    .max(200, 'Maximum 200 characters allowed'),
});
export const categoryValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Category Title is required")
    .max(100, "Category Title must be at most 100 characters"),

  is_active: Yup.string()
    .required("Status is required"),

  image: Yup.mixed()
    .required("Category picture is required")
    .test("fileSize", "File size is too large", (value) => {
      // 🧩 If no value, skip
      if (!value) return false;

      // 🧩 If API image (has url but no file) → allow up to 2MB (though usually not checked)
      if (value.url && !value.file) {
        return true; // skip validation for existing images
      }

      // 🧩 If uploaded image → max 5MB
      if (value.file && value.file.size) {
        return value.file.size <= 5 * 1024 * 1024; // 5MB limit
      }

      return false;
    })
    .test("fileType", "Unsupported file format", (value) => {
      if (!value || !value.file) return true; // skip if existing image
      return ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        value.file.type
      );
    }),
});