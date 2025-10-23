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

export const addData = async (payload) => {
  try {
    const { data } = await axiosInstance.post('/admin/commissions', payload, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return data.data;
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
