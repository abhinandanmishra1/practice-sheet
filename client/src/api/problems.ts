import { axios } from "../axiosClient";

export const fetchProblems = async (offset = 0, limit = 20) => {
  try {
    const { data } = await axios.get("/problems", {
      params: {
        limit,
        offset,
      },
    });

    console.log(data);
    return data;
  } catch (error) {
    throw("There was some error in loading the problems.")
  }
};
