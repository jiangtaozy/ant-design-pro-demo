/*
 * Created by jemo on 2018-6-29.
 * 图片分类列表
 * props: {
 *   treeData, // 文件夹数据
 *   onFileTreeToggle, // 选择文件夹事件
 * }
 */

import React, { Component } from 'react';
import FileTree from './FileTree';
import { Button } from 'antd';
import { MdAdd, MdCreate, MdDelete } from 'react-icons/lib/md';

class ImageSort extends Component {
  render() {
    const { treeData, onFileTreeToggle } = this.props;
    return(
      <div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            paddingBottom: 7,
          }}>
          <Button
            size='small'
            style={{
              border: 'none',
            }}>
            <MdAdd size={15} />
            添加
          </Button>
          <Button
            size='small'
            style={{
              border: 'none',
            }}>
            <MdCreate size={15} />
            重命名
          </Button>
          <Button
            size='small'
            style={{
              border: 'none',
            }}>
            <MdDelete size={15} />
            删除
          </Button>
        </div>
        {/* 文件树 */}
        <FileTree
          data={treeData}
          onToggle={onFileTreeToggle}
        />
      </div>
    );
  }
}

export default ImageSort;
