import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// GET
export const getListing = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/audios', {
      params,
    });
    return data; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const updateStatus = async (id) => {
  try {
    const response = await axiosInstance.post(`/admin/audios/${id}/status`);
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
export const viewUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/audios/${id}`);
    return data.data; // Assume this returns success obj
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

    const { data } = await axiosInstance.post('/admin/audios', payload);
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const editData = async (formData, id) => {
  try {
    const payload = new FormData();
    buildFormData(payload, formData);

    const { data } = await axiosInstance.post(
      `/admin/audios/${id}/update`,
      payload
    );

    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// getLanguages;
export const getAudioCategory = async () => {
  try {
    const { data } = await axiosInstance.get('/get-categories?type=audio');
    return data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unable to fetch languages' };
  }
};

// Audio Category ManagementHeaders
export const getListingAudioCategory = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/categories?type=audio', {
      params,
    });
    return data; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const addAudioCategoryData = async (formData) => {
  try {
    const payload = new FormData();
    buildFormData(payload, formData);

    const { data } = await axiosInstance.post('/admin/categories', payload);
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const updateStatusAudioCategory = async (id) => {
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
export const editAudioCategoryData = async (formData, id) => {
  try {
    const payload = new FormData();
    buildFormData(payload, formData);

    const { data } = await axiosInstance.post(
      `/admin/categories/${id}/update`,
      payload
    );

    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const viewAudioCategoryData = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/categories/${id}`);
    return data.data; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
// Audio Category ManagementHeaders
