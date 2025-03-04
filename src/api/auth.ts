import { RequestCollection } from "@/types/shared";

const PREFIX = "/auth";

export const authRequestCollection: RequestCollection = {
  getIndustries: {
    url: `${PREFIX}/industries`,
    queryKey: 'INDUSTRIES',
    method: 'GET'
  },
  getTimezones: {
    url: `${PREFIX}/time-zones`,
    queryKey: 'TIME-ZONES',
    method: 'GET'
  },
  getCountries: {
    url: `${PREFIX}/countries`,
    queryKey: 'COUNTRIES',
    method: 'GET'
  },
  getCurrencies: {
    url: `${PREFIX}/currencies`,
    queryKey: 'CURRENCIES',
    method: 'GET'
  },
  register: {
    url: `${PREFIX}/register`,
    queryKey: 'REGISTER',
    method: 'POST'
  },
  forgotPassword: {
    url: `${PREFIX}/forgot-password`,
    queryKey: 'FORGOT-PASSWORD',
    method: 'POST'
  },
  resetPassword: {
    url: `${PREFIX}/reset-password`,
    queryKey: 'RESET-PASSWORD',
    method: 'POST'
  },
  resendVerificationEmail: {
    url: `${PREFIX}/resend-verification-email`,
    queryKey: 'RESEND-VERIFICATION-EMAIL',
    method: 'POST'
  },
  verfiyEmail: {
    url: `${PREFIX}/verfiy-email`,
    queryKey: 'VERIFY-EMAIL',
    method: 'POST'
  },
  login: {
    url: `${PREFIX}/login`,
    queryKey: 'LOGIN',
    method: 'POST'
  },
  logout: {
    url: `${PREFIX}/logout`,
    queryKey: 'LOGOUT',
    method: 'POST'
  }
};
