import { axios } from "../axiosClient";

export const fetchProblems = async (offset = 0, limit = 10) => {
  try {
    const { data } = await axios.get("/problems", {
      params: {
        limit,
        offset,
      },
    });

    return data;
  } catch (error) {
    console.log(error);

    return [];
  }
};
