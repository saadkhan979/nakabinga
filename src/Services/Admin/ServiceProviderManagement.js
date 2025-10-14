import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// GET
export const getListing = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/service-providers', {
      params,
    });
    return data; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
export const getRequestsListing = async (params) => {
  try {
    const { data } = await axiosInstance.get('/admin/coach/request', {
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
    const response = await axiosInstance.post(`/admin/coach/${id}/status`);
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
// export const updateRequestsStatus = async (id, payload) => {
//   try {
//     const response = await axiosInstance.post(
//       `/admin/coach/${id}/update-request`,
//       payload // ✅ send status/reason here
//     );

//     const {
//       data: { message, status },
//     } = response;

//     return { message, status };
//   } catch (error) {
//     throw error.response
//       ? error.response.data
//       : { message: 'Unknown error occurred' };
//   }
// };
// Services/Admin/CoachManagement.js
export const updateRequestsStatus = async (id, payload) => {
  try {
    const response = await axiosInstance.post(
      `/admin/coach/${id}/update-request`,
      payload // <-- ensure the payload is sent in the body
    );

    // return full response data so mutation handlers can inspect it
    return response.data;
  } catch (error) {
    // normalize error shape so component can read .message / .errors
    if (error.response && error.response.data) {
      throw error.response.data;
    }
    throw { message: 'Unknown error occurred' };
  }
};
// DETAILS
export const viewUser = async (id) => {
  try {
    const { data } = await axiosInstance.get(`/admin/coach/${id}`);
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
