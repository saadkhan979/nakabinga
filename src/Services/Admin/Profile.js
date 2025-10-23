import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// Admin
export const profileUpdate = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      '/admin-api/account',
      credentials
    );
    const {
      data: { message, status, detail },
    } = response;
    return { message, status, detail }; // Assume this returns the user object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// Business / Users
// export const userProfileUpdate = async ({ payload }) => {
//   try {
//     const { data } = await axiosInstance.post(`/edit-profile`, payload);
//     return data.data;
//   } catch (error) {
//     throw error.response
//       ? error.response.data
//       : { message: 'Unknown error occurred' };
//   }
// };

export const userProfileUpdate = async (formData) => {
  try {
    const payload = new FormData();
    buildFormData(payload, formData);
    const response = await axiosInstance.post('/edit-profile', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// Admin
export const passwordUpdate = async (credentials) => {
  try {
    const response = await axiosInstance.post('/change-password', credentials);
    return response;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// Business / Users
export const userPasswordUpdate = async (credentials) => {
  try {
    const response = await axiosInstance.post(
      '/user-api/account/change-password',
      credentials
    );
    const {
      data: { message, status },
    } = response;
    return { message, status }; // Assume this returns the user object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
