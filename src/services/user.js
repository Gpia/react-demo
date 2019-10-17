import request from 'utils/request';
import { stringify } from 'qs';

export function queryUserInfo(params) {
  return request(`/api/userInfo?${stringify(params)}`);
}
