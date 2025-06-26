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

export const getArticleById = (article_id) => {
  return fetch(`${baseUrl}/articles/${article_id}`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          if (response.status === 404) {
            return Promise.reject({
              status: response.status,
              msg: "Article not found.",
            });
          }
          return Promise.reject({
            status: response.status,
            msg: errorData.msg || "Failed to load article.",
          });
        });
      }
      return response.json();
    })
    .then((data) => {
      return data.article;
    });
};

export const getCommentsByArticleId = (article_id) => {
  return fetch(`${baseUrl}/articles/${article_id}/comments`)
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          return Promise.reject({
            status: response.status,
            msg: errorData.msg || "Failed to load comments.",
          });
        });
      }
      return response.json();
    })
    .then((data) => {
      return data.comments;
    });
};

export const patchArticleVotes = (article_id, inc_votes) => {
  return fetch(`${baseUrl}/articles/${article_id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inc_votes }),
  })
    .then((response) => {
      if (!response.ok) {
        return response.json().then((errorData) => {
          return Promise.reject({
            status: response.status,
            msg: errorData.msg || "Error occurred",
          });
        });
      }
      return response.json();
    })
    .then((data) => {
      return data.article;
    });
};
