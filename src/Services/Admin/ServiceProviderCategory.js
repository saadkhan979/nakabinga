import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// GET
export const getListing = async (params) => {
  try {
    const { data } = await axiosInstance.get(
      '/admin/categories?type=service_provider',
      {
        params,
      }
    );
    return data; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const updateStatus = async (id) => {
  try {
    const response = await axiosInstance.post(`/admin/categories/${id}/status`);
    const {
      data: { message, status },
    } = response;
    return { message, status }; // Assume this returns the success object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
// DETAILS
export const viewUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/categories/${id}`);
    return data.data; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const addData = async (payload) => {
  try {
    const { data } = await axiosInstance.post('/admin/categories', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const editData = async ({ id, payload }) => {
  try {
    const { data } = await axiosInstance.post(
      `/admin/categories/${id}/update`,
      payload,
      {
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
