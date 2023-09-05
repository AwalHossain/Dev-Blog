import axios from "../utils/axios";

export const getLikes = async (id: number, likes: number) => {
  const response = await axios.patch(`/blogs/${id}`, {
    likes: likes + 1,
  });
  const data = response.data;
  return data;
};
