import axiosInstance from '../../Config/axiosConfig';
import { buildFormData } from '../../Utils/Utils';

// GET
export const getNotifications = async (params) => {
  try {
    const { data } = await axiosInstance.get('/notifications/all/list', {
      params,
    });
    // console.log(data, 'getNotifications');
    return data; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

//MARK READ
export const editNotification = async (id) => {
  try {
    const response = await axiosInstance.post(`/notifications/${id}`);
    // console.log(data, 'editNotification');
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
