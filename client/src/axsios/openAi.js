import { handlePost } from './middleware';

export const getAiAnswer = async (message) => {
  try {
    const response = await handlePost('/chat', message);
    return response.data;
  } catch (err) {
    console.error('Error get answer', err);
    throw err;
  }
};
