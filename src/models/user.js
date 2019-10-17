import { queryUserInfo } from 'services/user';

export default {
  namespace: 'user',

  state: {
    info: {},
  },

  effects: {
    *queryUserInfo(action, { call, put }) {
      const response = yield call(queryUserInfo);
      yield put({
        type: 'save',
        payload: {
          info: response.data || {},
        },
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
  },
};
