import 'babel-polyfill';
import dva from 'dva';
import createLoading from 'dva-loading';
import globalModel from './models/global';
import router from './router';
import './index.less';

// 1. Initialize
const app = dva();

// 2. Plugins
app.use(createLoading());

// 3. Model
app.model(globalModel);

// 4. Router
app.router(router);

// 5. Start
app.start('#root');

// export global store
export default app._store; // eslint-disable-line
