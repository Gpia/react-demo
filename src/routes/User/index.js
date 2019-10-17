import React from 'react';
import { connect } from 'dva';
import Page from 'components/Page';
import style from './index.less';

class User extends React.Component {
  componentDidMount() {
    this.loadUserInfo();
  }

  loadUserInfo() {
    this.props.dispatch({ type: 'user/queryUserInfo' });
  }

  render() {
    const { info } = this.props;
    return (
      <Page title="用户">
        <span className={style.user}>用户名是：{info.user}</span>
        <br />
        <button onClick={this.loadUserInfo.bind(this)}>刷新</button>
      </Page>
    );
  }
}

export default connect(({ user }) => ({
  info: user.info,
}))(User);
