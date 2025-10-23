import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// GET
export const getListing = async (params) => {
  try {
    // ✅ Extract type and remove it from the params before sending to API
    const { type = 'service_provider', ...restParams } = params || {};

    // ✅ choose correct endpoint dynamically
    // const endpoint = `/admin/commissions/${type}`;
    const endpoint = `/admin/commissions?type=${type}`;

    // ✅ only send relevant params (without type)
    const { data } = await axiosInstance.get(endpoint, { params: restParams });
    return data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const getSubscriptionPlan = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/subscriptions', {
      params,
    });
    return data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const addPlanData = async (payload) => {
  try {
    const { data } = await axiosInstance.post('/admin/subscriptions', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const updateStatusSubPlan = async (id) => {
  try {
    const response = await axiosInstance.post(
      `/admin/subscriptions//${id}/status`
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
export const viewUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/subscriptions/${id}`);
    return data.data; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const editData = async ({ id, payload }) => {
  try {
    const { data } = await axiosInstance.post(
      `/admin/subscriptions/${id}/update`,
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
