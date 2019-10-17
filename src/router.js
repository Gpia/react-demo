import React from 'react';
import { routerRedux, Route, Switch } from 'dva/router';
import getRouteData from './common/router';
import BasicLayout from './layout/BasicLayout';

const { ConnectedRouter } = routerRedux;
const getWrapBasicLayout = app => {
  return props => {
    const routeData = getRouteData(app);
    return (
      <BasicLayout {...props}>
        <Switch>
          {routeData.map((item, index) => (
            <Route path={item.path} component={item.component} exact key={index} />
          ))}
        </Switch>
      </BasicLayout>
    );
  };
};

function RouterConfig({ history, app }) {
  const WrapBasicLayout = getWrapBasicLayout(app);

  return (
    <ConnectedRouter history={history}>
      <Route component={WrapBasicLayout} />
    </ConnectedRouter>
  );
}

export default RouterConfig;
