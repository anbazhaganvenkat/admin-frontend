const REACT_APP_API_URL = process.env.REACT_APP_API_URL;

const appApi = (path) => `${REACT_APP_API_URL}/${path}`;

// API call routes
export const endpoints = (version) => ({
  userLogin: appApi("v1/admin"),
  userAvatarUpdate: appApi("v1/user/updateAvatar"),
  dashboardAPI: appApi("v1/dashboard"),
  tagAPI: appApi("v1/tag"),
  tagTypeAPI: appApi("v1/tagType"),
  userAPI: appApi("v1/user"),
  settingAPI: appApi("v1/setting"),
});

export const REACT_APP_URL = process.env.REACT_APP_URL;

export const GOOGLE_CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

export const LINKEDIN_CLIENT_ID = process.env.REACT_APP_LINKEDIN_CLIENT_ID;

export const LINKEDIN_REDIRECT_URI =
  process.env.REACT_APP_LINKEDIN_REDIRECT_URI;

export const OFFICE365_CLIENT_ID = process.env.REACT_APP_OFFICE365_CLIENT_ID;

export const OFFICE365_REDIRECT_URI =
  process.env.REACT_APP_OFFICE365_REDIRECT_URI;

export const DEFAULT_API_KEY = process.env.REACT_APP_DEFAULT_API_KEY;

export const STRIPE_PROVIDER_API_KEY =
  process.env.REACT_APP_STRIPE_PROVIDER_API_KEY;

export const SALESFORCE_REDIRECT_URL =
  process.env.REACT_APP_SALESFORCE_REDIRECT_URL;

export const SALESFORCE_CLIENT_ID = process.env.REACT_APP_SALESFORCE_CLIENT_ID;

export const METACX_CLIENT_ID = process.env.REACT_APP_METACX_CLIENT_ID;
export const METACX_CLIENT_SECRET = process.env.REACT_APP_METACX_CLIENT_SECRET;
export const METACX_API_URL = process.env.REACT_APP_METACX_API_URL;

export const TORCHLITE_WEBSITE_URL =
  process.env.REACT_APP_TORCHLITE_WEBSITE_URL;
