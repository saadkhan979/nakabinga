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
  phone: Yup.string().required('Phone Number is required'),
});
export const editProfileSchema = Yup.object({
  business_name: Yup.string().required('Business name is required'),
  user_name: Yup.string().required('User name is required'),
  phone: Yup.string().required('Phone Number is required'),
});
export const changePasswordSchema = Yup.object({
  old_password: Yup.string().required('Current Password is required'),
  new_password: Yup.string().required('New Password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords do not match')
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

export const addVideoValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Video title is required")
    .max(100, "Title must be under 100 characters"),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .max(500, "Description must be under 500 characters"),

  is_active: Yup.number()
    .required("Status is required")
    .oneOf([0, 1], "Invalid status"),

  language_id: Yup.string()
    .required("Language is required"),

  thumbnail: Yup.mixed()
    .required("Thumbnail image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      // ✅ Allow if existing URL or new image file
      if (!value) return false;
      if (value.url && !value.file) return true; // existing image
      return value.file && value.file.type.startsWith("image/");
    }),

  video: Yup.mixed()
    .required("Video file is required")
    .test("fileType", "Only video files are allowed", (value) => {
      if (!value) return false;

      // ✅ Allow existing video URL
      if (value.url && !value.file) return true;

      // ✅ Allow new uploaded video file
      if (value.file && value.file.type) {
        return value.file.type.startsWith("video/");
      }

      return false;
    }),
});

export const addEbookValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("E-book title is required")
    .max(100, "Title must be under 100 characters"),

  description: Yup.string()
    .trim()
    // .required("Description is required")
    .max(500, "Description must be under 500 characters"),

  is_active: Yup.number()
    .required("Status is required")
    .oneOf([0, 1], "Invalid status"),

  language_id: Yup.string()
    .required("Language is required"),

  thumbnail: Yup.mixed()
    .required("Upload E-book image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      // ✅ Allow if existing URL or new image file
      if (!value) return false;
      if (value.url && !value.file) return true; // existing image
      return value.file && value.file.type.startsWith("image/");
    }),

  file: Yup.mixed()
    .required("E-book file is required")
    .test("fileType", "Only document files are allowed", (value) => {
      if (!value) return false;
      if (value.url && !value.file) return true; // existing file from server
      if (value.file && value.file.type) {
        return [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
          "application/epub+zip",
        ].includes(value.file.type);
      }
      return false;
    }),
});
export const addArticlesValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Articles title is required")
    .max(100, "Title must be under 100 characters"),

  description: Yup.string()
    .trim()
    .required("Description is required")
    .max(500, "Description must be under 500 characters"),

  is_active: Yup.number()
    .required("Status is required")
    .oneOf([0, 1], "Invalid status"),

  language_id: Yup.string()
    .required("Language is required"),

  thumbnail: Yup.mixed()
    .required("Upload Articles image is required")
    .test("fileType", "Only image files are allowed", (value) => {
      // ✅ Allow if existing URL or new image file
      if (!value) return false;
      if (value.url && !value.file) return true; // existing image
      return value.file && value.file.type.startsWith("image/");
    }),

  file: Yup.mixed()
    .required("Articles file is required")
    .test("fileType", "Only document files are allowed", (value) => {
      if (!value) return false;
      if (value.url && !value.file) return true; // existing file from server
      if (value.file && value.file.type) {
        return [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "text/plain",
          "application/epub+zip",
        ].includes(value.file.type);
      }
      return false;
    }),
});
export const addLanguageValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Language is required")
    .max(100, "Language must be under 100 characters"),

  is_active: Yup.number()
    .required("Status is required")
    .oneOf([0, 1], "Invalid status"),
});
export const commissionValidationSchema = Yup.object({
  commission_rate: Yup.number()
    .typeError('Commission rate must be a number')
    .min(0, 'Commission rate cannot be negative')
    .max(100, 'Commission rate cannot exceed 100%')
    .required('Commission rate is required'),
});
export const addPlanValidationSchema = Yup.object({
  name: Yup.string().required('Plan name is required'),
  duration: Yup.string().required('Duration is required'),
  category: Yup.string().required('Category is required'),
  price: Yup.number().required('Price is required').positive('Price must be positive'),
  description: Yup.string().required('Description is required'),
});

export const addFAQsValidationSchema = Yup.object({
  question: Yup.string()
    .trim()
    .required('Question is required'),

  type: Yup.string()
    .oneOf(['text', 'image', 'video'], 'Invalid answer type')
    .required('Answer type is required'),

  answer: Yup.string().when('type', {
    is: 'text',
    // then: (schema) =>
    //   schema.trim().required('Answer text is required'),
    otherwise: (schema) => schema.notRequired(),
  }),

  file: Yup.mixed().when('type', {
    is: 'image',
    then: (schema) =>
      schema
        .test('fileType', 'Only image files are allowed', (value) => {
          if (!value) return true; // Allow empty for edit mode

          // If it's an existing file with URL (edit mode), allow it
          if (value.url && !value.file) {
            return true;
          }

          // If it's a new file upload, check the type
          const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp'];
          return allowedTypes.includes(value?.file?.type || value?.type);
        }),
    otherwise: (schema) => schema.notRequired(),
  }),

  video: Yup.mixed().when('type', {
    is: 'video',
    then: (schema) =>
      schema
        .test('fileType', 'Only video files are allowed', (value) => {
          if (!value) return true; // Allow empty for edit mode

          // If it's an existing file with URL (edit mode), allow it
          if (value.url && !value.file) {
            return true;
          }

          // If it's a new file upload, check the type
          const allowedTypes = ['video/mp4', 'video/webm', 'video/ogg'];
          return allowedTypes.includes(value?.file?.type || value?.type);
        }),
    otherwise: (schema) => schema.notRequired(),
  }),
});

export const audioValidationSchema = Yup.object({
  title: Yup.string()
    .trim()
    .required("Title is required")
    .max(100, "Title must be at most 100 characters"),

  category_id: Yup.string()
    .required("Category is required"),

  is_active: Yup.string()
    .required("Status is required"),

  file: Yup.mixed()
    .required("Audio file is required"),
});
export const audioCategoryValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Name is required")
    .max(100, "Name must be at most 100 characters"),

  is_active: Yup.string()
    .required("Status is required"),
});