import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// GET
export const getListing = async (params) => {
  try {
    // ✅ Extract type and remove it from the params before sending to API
    const { type = 'videos', ...restParams } = params || {};

    // ✅ choose correct endpoint dynamically
    const endpoint = `/admin/content/${type}`;

    // ✅ only send relevant params (without type)
    const { data } = await axiosInstance.get(endpoint, { params: restParams });
    return data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
// getLanguages;
export const getLanguages = async () => {
  try {
    const { data } = await axiosInstance.get('/get-languages');
    return data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unable to fetch languages' };
  }
};

export const updateStatus = async (id, type) => {
  try {
    const response = await axiosInstance.post(
      `/admin/content/${type}/${id}/status` // ✅ dynamic path
    );
    const {
      data: { message, status },
    } = response;
    return { message, status };
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
// DETAILS
export const viewUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/content/videos/${id}`);
    return data.data; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
// ✅ FIXED addData function
export const addData = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      '/admin/content/videos',
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
export const editData = async ({ id, payload }) => {
  try {
    const { data } = await axiosInstance.post(
      `/admin/content/videos/${id}/update`,
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

// ebooks
export const addEbooksData = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      '/admin/content/ebooks',
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
export const viewEbooks = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/content/ebooks/${id}`);
    return data.data; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const editEbooksData = async ({ id, payload }) => {
  try {
    const { data } = await axiosInstance.post(
      `/admin/content/ebooks/${id}/update`,
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
export const updateStatusEbooks = async (id) => {
  try {
    const response = await axiosInstance.post(
      `/admin/content/ebooks/${id}/status`
    );
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
// Articles
export const addArticlesData = async (payload) => {
  try {
    const { data } = await axiosInstance.post(
      '/admin/content/articles',
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
export const viewArticles = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/content/articles/${id}`);
    return data.data; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const editArticlesData = async ({ id, payload }) => {
  try {
    const { data } = await axiosInstance.post(
      `/admin/content/articles/${id}/update`,
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

export const updateStatusArticles = async (id) => {
  try {
    const response = await axiosInstance.post(
      `/admin/content/articles/${id}/status`
    );
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
// getLanguages;
export const getLanguagesM = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/languages', { params });
    return data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const addLanguageData = async (payload) => {
  try {
    const { data } = await axiosInstance.post('/admin/languages', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const viewLanguage = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/languages/${id}`);
    return data.data; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const editLanguageData = async ({ id, payload }) => {
  try {
    const { data } = await axiosInstance.post(
      `/admin/languages/${id}/update`,
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
export const updateStatusLanguage = async (id) => {
  try {
    const response = await axiosInstance.post(`/admin/languages/${id}/status`);
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
