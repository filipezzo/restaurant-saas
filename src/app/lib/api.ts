import axios from 'axios'

export const api = axios.create({
  baseURL: import.meta.env.VITE_API,
  withCredentials: true
})


  /*api.interceptors.request.use(async (config) => {
    await new Promise((resolve) =>
      setTimeout(resolve, Math.round(Math.random() * 3000)),
    )

    return config
  }) */