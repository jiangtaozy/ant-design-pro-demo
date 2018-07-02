/*
 * Created by jemo on 2018-6-27.
 * 图库
 */

import React, { Component } from 'react';
import Modal from 'react-modal';
import ImageSort from './ImageSort';
import ImageShow from './ImageShow';
import axios from 'axios';
import { imgApi } from '../../utils/axios';
import { imgUrl, kehuId, kehuAppName } from '../../common/config';
import { toast } from 'react-toastify';

Modal.setAppElement('#root');
const perPage = 50;

class Gallery extends Component {
  constructor() {
    super();
    this.state = {
      images: [], // 全部图片列表
      currentImages: [], // 当前文件夹下图片列表
      currentPage: 0, // 当前页数
      treeData: [], // 文件树data
      cursor: {}, // 文件树当前指针
    };
    this.onSelectImage = this.onSelectImage.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.onFileTreeToggle = this.onFileTreeToggle.bind(this);
    this.uploadImg = this.uploadImg.bind(this);
  }

  // 选择分页
  handlePageClick(data) {
    this.setState({
      currentPage: data.selected,
    });
  }

  // 选择图片
  onSelectImage(index, image) {
    const { currentPage } = this.state;
    const currentImages = this.state.currentImages.slice();
    const img = currentImages[currentPage * perPage + index];
    img.isSelected = !img.isSelected;
    this.setState({
        currentImages: currentImages,
    });
  }

  // 选择文件夹
  async onFileTreeToggle(node, toggled) {
    const { cursor, images } = this.state;
    cursor.active = false;
    node.active = true;
    let currentImages = [];
    if(node.id === -1) {
      currentImages = images.slice();
    } else {
      for(let i = 0; i < images.length; i++) {
        const img = images[i];
        if(img.dirId.toString() === node.id.toString()) {
          currentImages.push(img);
        }
      }
    }
    // todo 获取子目录
    if(node.children){
      node.toggled = toggled;
    }
    const treeData = this.state.treeData;
    this.setState({
      treeData,
      currentImages,
      cursor: node,
      currentPage: 0,
    });
  }

  // 获取分类列表
  async getDirArray(dirId) {
    const dirResponse = await imgApi.post('/imgdir/query', {
      dir_id: dirId,
    });
    if(dirResponse.data.result !== 'ok' || !Array.isArray(dirResponse.data.data)) {
      console.error('dirResponse.data: ', dirResponse.data);
      return [];
    }
    const dirData = dirResponse.data.data;
    const dirArray = [];
    for(let i = 0; i  < dirData.length; i++) {
      const dir = dirData[i];
      dirArray.push({
        id: dir.id,
        pId: dir.p_id,
        name: dir.dir_name,
      });
    }
    return dirArray;
  }

  // 上传图片
  async uploadImg(file) {
    let { cursor, images, currentImages } = this.state;
    let dirId = cursor.id;
    if(dirId === -1) {
      dirId = 0;
    }
    const config = {
      baseURL: imgUrl,
      onUploadProgress: function(progressEvent) {
        let percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
        // todo 显示上传进度
        console.log('percentCompleted: ', percentCompleted);
      },
    };
    const data = new FormData();
    data.append('dir_id', dirId);
    data.append('imgs', file);
    data.append('kefu_id', kehuId);
    data.append('kefu_app_name', kehuAppName);
    const response = await axios.post('/img/upload', data, config);
    if(response.data.result !== 'ok') {
      toast.error('上传失败');
      return console.error('上传失败, response.data: ', response.data);
    }
    const uploadedImages = this.getImages(response.data.data, 'http://img.chslab.com:8780/img/');
    if(cursor.id === -1) {
      currentImages = [...currentImages, ...uploadedImages];
    } else {
      for(let i = 0; i < uploadedImages.length; i++) {
        const img = uploadedImages[i];
        if(img.dirId.toString() === cursor.id.toString()) {
          currentImages.push(img);
        }
      }
    }
    this.setState({
      images: [...images, ...uploadedImages],
      currentImages,
    });
    toast.success('上传成功');
  }

  // 获取图片列表
  getImages(rawArray, domain) {
    const images = [];
    for(let i = 0; i < rawArray.length; i++) {
      const img = rawArray[i];
      images.push({
        dirId: img.dir_id,
        src: domain + img.img_name,
        thumbnail: domain + img.img_name,
        thumbnailWidth: 100,
        thumbnailHeight: 100,
        caption: img.img_nickname,
      });
    }
    return images;
  }

  async componentDidMount() {
    try {
      // 获取图片列表和分类列表
      const [imgResponse, dirArray] = await Promise.all([
        imgApi.post('/img/query', {}),
        this.getDirArray(0),
      ]);
      dirArray.splice(0, 0, {
        id: 0,
        name: '未分类',
      });
      if(imgResponse.data.result !== 'ok' || !Array.isArray(imgResponse.data.data)) {
        console.error('imgResponse.data: ', imgResponse.data);
        return;
      }
      const treeData = {
        id: -1,
        name: '所有图片',
        toggled: true,
        active: true,
        children: dirArray,
      };
      const { data: imgArray, domain } = imgResponse.data;
      const images = this.getImages(imgArray, domain);
      this.setState({
        treeData,
        images,
        currentImages: images,
        cursor: treeData,
      });
    } catch(error) {
      console.error('error: ', error.message);
    }
  }

  render() {
    const { currentImages, currentPage, treeData } = this.state;
    const pageCount = currentImages.length / perPage; // 总页数
    const showImages = currentImages.slice(currentPage * perPage, (currentPage + 1) * perPage);
    return(
      <Modal
        style={customStyle}
        isOpen={true}>
        <div>
          {/* 标题 */}
          <div
            style={{
              fontSize: 14,
              fontWeight: 600,
              color: 'black',
            }}>
            我的图库
          </div>
          <div
            style={{
              display: 'flex',
            }}>
            {/* 图片分类 */}
            <ImageSort
              treeData={treeData}
              onFileTreeToggle={this.onFileTreeToggle}
            />
            {/* 图片展示 */}
            <ImageShow
              showImages={showImages}
              onSelectImage={this.onSelectImage}
              pageCount={pageCount}
              handlePageClick={this.handlePageClick}
              uploadImg={this.uploadImg}
            />
          </div>
        </div>
      </Modal>
    );
  }
}

// 弹框样式
const customStyle = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    borderRadius: 8,
    maxHeight: '90vh',
  },
};

export default Gallery;
