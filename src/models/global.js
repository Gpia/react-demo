import { queryConfig } from 'services/global';

export default {
  namespace: 'global',

  state: {
    config: {},
  },

  effects: {
    *queryConfig({ payload }, { call, put }) {
      const response = yield call(queryConfig, payload);
      yield put({
        type: 'save',
        payload: {
          config: response.data || {},
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
