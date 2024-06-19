const API_URLS = {
    // local: "https://localhost:7128/v1",
    local: "https://econome-api.azurewebsites.net/v1",
    production: "https://econome-api.azurewebsites.net/v1"
};

export const API_URL = process.env.NODE_ENV === 'production' ? API_URLS.production : API_URLS.local;