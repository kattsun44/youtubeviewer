import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import VideoListTemplate from '~/components/templates/VideoListTemplate';
import Header from '~/components/organisms/Header';
import SearchForm from '~/components/organisms/SearchForm';
import VideoList from '~/components/organisms/VideoList';

export const TopPagePresenter = ({
  search,
  searchNext,
  defaultKeyword,
  videos,
  loading,
}) => (
  <VideoListTemplate
    headerContents={<Header />}
    searchFormContents={(
      <SearchForm onSubmit={search} defaultValue={defaultKeyword} />
    )}
    videoListContents={<VideoList videos={videos} loading={loading} />}
    onScrollEnd={searchNext}
  />
);

TopPagePresenter.propTypes = {
  search: PropTypes.func.isRequired,
  searchNext: PropTypes.func.isRequired,
  defaultKeyword: PropTypes.string,
  videos: VideoList.propTypes.videos,
  loading: PropTypes.bool,
};

TopPagePresenter.defaultProps = {
  videos: null,
  loading: false,
  defaultKeyword: '',
};

// TODO コンテナー・コンポーネントは後で実装する
export default TopPagePresenter;