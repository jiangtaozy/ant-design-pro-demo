/*
 * Created by jemo on 2018-6-29.
 * 文件树
 * props: {
 *   data, // 文件树数据
 *   onToggle, // 选择文件夹事件
 * }
 */

import React, { Component } from 'react';
import { Treebeard } from 'react-treebeard';

class FileTree extends Component {
  render() {
    const { data, onToggle } = this.props;
    return(
      <Treebeard
        data={data}
        onToggle={onToggle}
        style={styles}
      />
    );
  }
}

export default FileTree;

// 文件树样式
const styles = {
  tree: {
    base: {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      fontFamily: 'lucida grande ,tahoma,verdana,arial,sans-serif',
      fontSize: '14px'
    },
    node: {
      base: {
        position: 'relative'
      },
      link: {
        cursor: 'pointer',
        position: 'relative',
        padding: '0px 5px',
        display: 'block'
      },
      activeLink: {
        background: '#00e5ee'
      },
      toggle: {
        base: {
          position: 'relative',
          display: 'inline-block',
          verticalAlign: 'top',
          marginLeft: '-5px',
          height: '24px',
          width: '24px'
        },
        wrapper: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          margin: '-7px 0 0 -7px',
          height: '14px'
        },
        height: 14,
        width: 14,
        arrow: {
          fill: '#9DA5AB',
          strokeWidth: 0
        }
      },
      header: {
        base: {
          display: 'inline-block',
          verticalAlign: 'top',
        },
        connector: {
          width: '2px',
          height: '12px',
          borderLeft: 'solid 2px black',
          borderBottom: 'solid 2px black',
          position: 'absolute',
          top: '0px',
          left: '-21px'
        },
        title: {
          lineHeight: '24px',
          verticalAlign: 'middle'
        }
      },
      subtree: {
        listStyle: 'none',
        paddingLeft: '19px'
      },
      loading: {
        //color: '#E2C089'
      }
    }
  }
};
