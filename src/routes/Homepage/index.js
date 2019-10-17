import React from 'react';
import { connect } from 'dva';
import Page from 'components/Page';
import style from './index.less';

class Homepage extends React.Component {
  componentDidMount() {
    this.props.dispatch({ type: 'global/queryConfig' });
  }

  render() {
    const { config } = this.props;
    return (
      <Page title="首页">
        <span className={style.error}>配置版本是：{config.version}</span>
      </Page>
    );
  }
}

export default connect(({ global }) => ({
  config: global.config,
}))(Homepage);
