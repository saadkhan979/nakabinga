import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// GET
export const getListing = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/faqs', {
      params,
    });
    return data; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const addData = async (formData) => {
  try {
    const payload = new FormData();
    buildFormData(payload, formData);
    const { data } = await axiosInstance.post('/admin/faqs', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const updateData = async (id, formData) => {
  try {
    const payload = new FormData();
    buildFormData(payload, formData);
    const { data } = await axiosInstance.post(
      `/admin/faqs/${id}/update`,
      payload
    );
    // Try PUT request first (more RESTful for updates)
    // try {
    //   const { data } = await axiosInstance.put(`/admin/faqs/${id}`, payload, {
    //     headers: { 'Content-Type': 'multipart/form-data' },
    //   });
    //   return data.data;
    // } catch (putError) {
    //   // If PUT fails, try POST with update endpoint
    //   const { data } = await axiosInstance.post(
    //     `/admin/faqs/${id}/update`,
    //     payload,
    //     {
    //       headers: { 'Content-Type': 'multipart/form-data' },
    //     }
    //   );
    //   return data.data;
    // }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const editData = async (id, formData) => {
  try {
    const payload = new FormData();
    buildFormData(payload, formData);
    const { data } = await axiosInstance.post(
      `/admin/faqs/${id}/update`,
      payload
    );
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
