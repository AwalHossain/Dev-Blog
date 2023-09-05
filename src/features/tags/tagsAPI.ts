import axios from "../utils/axios";

export const getTags = async (
  relatedPosts: string[],
  currentId: string | undefined
) => {
  const limit = 5;
  let queryString =
    relatedPosts?.length > 0
      ? relatedPosts.map((tag) => `tags_like=${tag}`).join("&") +
        `&id_ne=${currentId}&_limit=${limit}`
      : `id_ne=${currentId}&_limit=${limit}`;

  const response = await axios.get(`/blogs?${queryString}`);
  const data = response.data;
  return data;
};
