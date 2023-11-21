import api from "../api";

export const searchRepository = async (username: string, id: number) => {
  const { data } = await api
    .post("/gitrepositories/getallrepositories", {
      username,
      id,
    })
    .catch((error) => {
      return error;
    });

  return data;
};

export const getUserRepository = async (username: string) => {
  const { data } = await api
    .get(`/gitrepositories/getuserrepository/${username}`)
    .catch((error) => {
      return error;
    });

  return data;
};

export const getHistoryRepo = async (id: number) => {
  const { data } = await api
    .get(`/gitrepositories/gethistory/${id}`)
    .catch((error) => {
      return error;
    });

  return data;
};
