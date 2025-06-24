const baseUrl = "https://nc-news-be-ltni.onrender.com/api";

export const getArticles = () => {
  return fetch(`${baseUrl}/articles`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          return Promise.reject({
            status: response.status,
            msg: errorData.msg || "Failed to load articles.",
          });
        });
      }
      return response.json();
    })
    .then((data) => {
      return data.articles;
    });
};

export const getUser = (username) => {
  return fetch(`${baseUrl}/users/${username}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          return Promise.reject({
            status: response.status,
            msg: errorData.msg || "Failed to load user.",
          });
        });
      }
      return response.json();
    })
    .then((data) => {
      return data.user;
    });
};
