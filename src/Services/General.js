import axiosInstance from '../Config/axiosConfig';

export const fetchNationalities = async () => {
  try {
    const response = await axiosInstance.get(`/user-api/general/countries`);
    return response.data.detail.map((country) => ({
      label: country.name,
      value: country.id,
    }));
  } catch (error) {
    console.error('Failed to fetch nationalities:', error);
    return [];
  }
};
export const fetchStatesForCountry = async (params) => {
  try {
    const response = await axiosInstance.get(`/user-api/general/states`, {
      params,
    });
    return response.data.detail.map((state) => ({
      label: state.name,
      value: state.id,
    }));
  } catch (error) {
    console.error('Failed to fetch states:', error);
    return [];
  }
};

export const fetchCountries = async () => {
  try {
    const response = await axiosInstance.get(
      `/user-api/general/country-register`
    );
    return response.data.detail.map((country) => ({
      label: country.country,
      value: country.id,
    }));
  } catch (error) {
    console.error('Failed to fetch counrties:', error);
    return [];
  }
};

export const fetchCurrencies = async () => {
  try {
    const { data } = await axiosInstance.get(`/user-api/general/currencies`);
    return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const getClassificationsWithType = async (params) => {
  try {
    const { data } = await axiosInstance.get(
      '/user-api/general/classification-type',
      {
        params,
      }
    );
    return data.detail; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const sendSupportForm = async (formData) => {
  try {
    const response = await axiosInstance.post('/user-api/contact-us', formData);

    if (!response.data.status) {
      throw new Error('Error submitting form', response);
    }
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

export const getSupportType = async () => {
  try {
    const { data } = await axiosInstance.get('/user-api/contact-us');
    return data.detail; // Assume this returns the listing object
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};

// USERS
export const getAllUsers = async () => {
  try {
    const { data } = await axiosInstance.get(`/user-api/branch/users`);
    return data.detail; // Assume this returns success obj
  } catch (error) {
    throw error.response
      ? error.response.data
      : { message: 'Unknown error occurred' };
  }
};
