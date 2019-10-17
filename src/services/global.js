import request from 'utils/request';
import { stringify } from 'qs';

export function queryConfig(params) {
  return request(`/api/config?${stringify(params)}`);
}
