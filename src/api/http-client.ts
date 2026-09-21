import axios from 'axios';
import { Invalid } from '../auth/auth.service';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});


httpClient.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem("token");

    if (token) {
      const authorization = `Bearer ${token}`;
      config.headers.Authorization = authorization;
    }

    return config
  },
  function (error) {
    return Promise.reject(error)
  })


httpClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const status = error.response.status;
    let message = "Une erreur est survenue.";

    switch (status) {
      case 401:
        if (window.location.href === "http://localhost:4200/") {
          message = "username ou password invalide."
        } else {
          message = "Action non authorisée.";
        }
        break;


      case 403:
        message = "action interdite.";
        break;


    }

    return Promise.reject<Invalid>({
      success: false,
      message
    })

  }
)