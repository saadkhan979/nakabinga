import axiosInstance from '../../Config/axiosConfig';
import { newsfeedData } from '../../Mocks/MockData';
import { buildFormData } from '../../Utils/Utils';

// GET
export const getListing = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/users', {
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
    const response = await axiosInstance.post(`/admin/users/${id}/status`);
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
    const { data } = await axiosInstance.get(`/admin/users/${id}`);
    return data.data; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// USER BRANCHES
export const getListingB = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin-api/users/branches/${id}`);
    return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// GET ACCOUNT TYPE
export const getAccountType = async (type) => {
  try {
    const { data } = await axiosInstance.get(
      `/user-api/beneficiary-register/type?type=${type}`
    );
    return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const getNewsfeed = async (type) => {
  try {
    // const { data } = await axiosInstance.get(
    //   `/user-api/beneficiary-register/type?type=${type}`
    // );
    return newsfeedData; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
