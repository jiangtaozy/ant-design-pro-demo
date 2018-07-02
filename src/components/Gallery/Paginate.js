/*
 * Created by jemo on 2018-6-29
 * 分页导航
 * props: {
 *   pageCount, // 总页数
 *   onPageChange, // 选页事件
 * }
 */

import React, { Component } from 'react';
import { css } from 'glamor';
import ReactPaginate from 'react-paginate';

class Paginate extends Component {
  render() {
    const { pageCount, onPageChange } = this.props;
    return(
      <ReactPaginate
        previousLabel={'<'}
        nextLabel={'>'}
        pageCount={pageCount}
        pageRangeDisplayed={5}
        marginPagesDisplayed={5}
        onPageChange={onPageChange}
        containerClassName={`${styles.paginate.container}`}
        pageClassName={`${styles.paginate.page}`}
        pageLinkClassName={`${styles.paginate.pageLink}`}
        activeClassName={`${styles.paginate.activePage}`}
        previousClassName={`${styles.paginate.page}`}
        previousLinkClassName={`${styles.paginate.pageLink}`}
        nextClassName={`${styles.paginate.page}`}
        nextLinkClassName={`${styles.paginate.pageLink}`}
      />
    );
  }
}

export default Paginate;

// 分页样式
const styles = {
  paginate: {
    container: css({
      display: 'flex',
      alignItems: 'center',
      paddingLeft: 0,
      marginBottom: 0,
    }),
    page: css({
      listStyle: 'none',
      height: 28,
      lineHeight: '28px',
      minWidth: 28,
      textAlign: 'center',
      borderRadius: 6,
      border: '1px solid #d9d9d9',
      backgroundColor: '#fff',
      marginRight: 8,
      color: '#666',
    }),
    pageLink: css({
      textDecoration: 'none',
      display: 'block',
      color: 'inherit',
      ':hover': {
        color: 'inherit',
      },
      ':focus': {
        textDecoration: 'none',
      },
    }),
    activePage: css({
      backgroundColor: '#2db7f5',
      color: '#fff',
    }),
  }
}
