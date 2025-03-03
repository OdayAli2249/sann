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
  }
};
