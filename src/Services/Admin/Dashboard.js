import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// GET CARD
export const getDashboardData = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/dashboard', { params });
    return data.data; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// GET USER CHART
export const getUserChart = async (params) => {
  try {
    const { data } = await axiosInstance.get(
      `/admin-api/charts/user?role=user&type=${params}`
    );
    return data.detail; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// GET EARNING CHART
export const getEarningChart = async (params) => {
  try {
    const { data } = await axiosInstance.get(
      `/admin-api/charts/payment?type=${params}`
    );
    return data.detail; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
