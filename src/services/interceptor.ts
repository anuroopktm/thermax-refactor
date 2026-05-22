import axios, { type AxiosInstance } from "axios";

const createApi = (baseURL: string): AxiosInstance => {
  return axios.create({
    baseURL,
    // timeout: 30000,
  });
};

// Axios instances for different services
export const ssoApi = createApi(import.meta.env.VITE_BACKEND_SERVICE_SSO_URL);

export const gptApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_THERMAX_GPT_URL,
);

export const salesApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_SALES_URL,
);

export const tbwesApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_TBWES_OCR_URL,
);

export const smartTroubleshootApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_SMART_TROUBLESHOOT_URL,
);

export const conbotApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_DOCTOR_CONBOT_URL,
);

export const cyberbuddyApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_CYBERBUDDY_URL,
);

export const heatingApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_HEATING_OCR_URL,
);

export const transmitterApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_TRANSMITTER_OCR_URL,
);

export const translatorApi = createApi(
  import.meta.env.VITE_BACKEND_SERVICE_DOCUMENT_TRANSLATOR_URL,
);

export const edgeApi = createApi(import.meta.env.VITE_BACKEND_SERVICE_EDGE_URL);

let isRedirecting = false;

// Request interceptor to add the bearer token
const addAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("access_token");

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const status = error?.response?.status;

      if (status === 401 && !isRedirecting) {
        isRedirecting = true;
        localStorage.clear();
        window.location.href = "/";
      }

      return Promise.reject(error);
    },
  );
};

const allInstances: AxiosInstance[] = [
  ssoApi,
  gptApi,
  salesApi,
  tbwesApi,
  smartTroubleshootApi,
  conbotApi,
  cyberbuddyApi,
  heatingApi,
  transmitterApi,
  translatorApi,
  edgeApi,
];

allInstances.forEach(addAuthInterceptor);
