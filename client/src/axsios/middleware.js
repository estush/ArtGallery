import axiosInstance from './axios.js';  // ייבוא האינסטנס שנוצר בקובץ axios.js

export async function handleGet(path) {
  try {
    const response = await axiosInstance.get(path);
    return response;
  } catch (error) {
    console.error('Error in GET request:', error);
    throw error;
  }
}

export async function handlePost(path, data) {
  try {
    const response = await axiosInstance.post(path, data, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response;
  } catch (error) {
    console.error('Error in POST request:', error);
    throw error;
  }
}


