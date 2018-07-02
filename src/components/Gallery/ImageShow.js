/*
 * Created by jemo on 2018-6-29.
 * 图片展示
 * props: {
 *   showImages, // 显示的图片列表
 *   onSelectImage, // 选择图片事件
 *   pageCount, // 总页数
 *   handlePageClick, // 选页事件
 *   uploadImg, // 上传图片, 参数file
 * }
 */

import React, { Component } from 'react';
import { Button } from 'antd';
import ReactGridGallery from './react-grid-gallery/Gallery';
import Paginate from './Paginate';

class ImageShow extends Component {
  constructor() {
    super();
    this.handleUploadClick = this.handleUploadClick.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
  }

  // 点击上传图片
  handleUploadClick() {
    this.refs.upload.click();
  }

  onFileChange(e) {
    //console.log('e.target.files[0]: ', e.target.files[0]);
    const file = e.target.files[0];
    if(file) {
      this.props.uploadImg(file);
    }
  }

  render() {
    const {
      showImages,
      onSelectImage,
      pageCount,
      handlePageClick,
    } = this.props;
    return(
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '60vw',
        }}>
        {/* 图片操作 */}
        <div
          style={{
            display: 'flex',
            paddingBottom: 10,
            paddingLeft: 2,
          }}>
          <Button
            type='primary'
            onClick={this.handleUploadClick}
            style={{
              marginRight: 10,
            }}>
            上传图片
          </Button>
          <input
            type='file'
            onChange={this.onFileChange}
            ref='upload'
            style={{
              display: 'none',
            }}
          />
          <Button
            style={{
              marginRight: 10,
            }}>
            移动图片到
          </Button>
          <Button
            style={{
              marginRight: 10,
            }}>
            移动分类到
          </Button>
          <Button
            type='danger'
            style={{
              marginRight: 10,
            }}>
            删除所选图片
          </Button>
          <input
            style={{
              width: 200,
              marginRight: 10,
              border: '1px solid #d9d9d9',
              paddingLeft: 10,
            }}
            placeholder='请输入关键字'
          />
          <Button>
            搜索
          </Button>
        </div>
        {/* 展示图片 */}
        <div
          style={{
            minHeight: 520,
          }}>
          <ReactGridGallery
            images={showImages}
            onSelectImage={onSelectImage}
            rowHeight={100}
          />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 10,
          }}>
          <Button
            type='primary'
            style={{
              marginLeft: 2,
            }}>
            使用选中的图片
          </Button>
          {/* 分页导航 */}
          <Paginate
            pageCount={pageCount}
            onPageChange={handlePageClick}
          />
        </div>
      </div>
    );
  }
}

export default ImageShow;
