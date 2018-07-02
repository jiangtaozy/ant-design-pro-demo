/*
 * Created by jemo on 2018-6-30.
 * 消息框
 */

import React, { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { css } from 'glamor';

class Toast extends Component {
  render() {
    return(
      <ToastContainer
        autoClose={2000}
        closeButton={false}
        hideProgressBar={true}
        style={{
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          transform: 'translate(-50%, -50%)',
          width: 200,
        }}
        bodyClassName={css({
          textAlign: 'center',
        })}
        toastClassName={css({
          borderRadius: 4,
        })}
      />
    );
  }
}

export default Toast;

