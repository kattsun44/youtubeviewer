import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
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

const TopPageContainer = ({
  api,
  presenter,
  defaultKeyword,
}) => {
  const [videos, setVideos] = useState([]);
  const [nextPageToken, setNextPagetoken] = useState(null);
  const [keyword, setKeyword] = useState(defaultKeyword);
  const [loading, setLoading] = useState(false);
  const cleanedUp = useRef(false);

  /**
   * ビデオの取得
   * @param pageToken 続きを取得する場合は前回取得時のレスポンスに含まれるnextPageTokenを指定する
   * @returns {Promise<void>}
   */
  const getVideos = async (pageToken) => {
    setLoading(true);
    const {
      data: {
        items,
        nextPageToken: newNextPageToken,
      },
    } = await api.search(keyword, { pageToken });
    if (cleanedUp.current) {
      return;
    }
    let nextVideos;
    if (pageToken) {
      // 重複を取り除く
      const itemsWithoutDuplicated = items.filter(
        ({ id: itemId }) => !videos.find(({ id }) => id === itemId),
      );
      nextVideos = videos.concat(itemsWithoutDuplicated);
    } else {
      nextVideos = items;
    }
    setVideos(nextVideos);
    setNextPagetoken(newNextPageToken);
    setLoading(false);
  };

  // keywordが変更されたらビデオを取得する
  useEffect(() => {
    setNextPagetoken(undefined);
    setVideos([]);
    getVideos();
  }, [keyword]);

  // コンポーネントがunmountされたらそれを覚えておく
  useEffect(() => (() => {
    cleanedUp.current = true;
  }), []);

  return presenter({
    search: setKeyword,
    searchNext: () => {
      if (loading || !nextPageToken) {
        // 現在ロード中、または次のページがない場合は何もしない
        return;
      }
      getVideos(nextPageToken);
    },
    defaultKeyword,
    videos,
    loading,
  });
};

TopPageContainer.propTypes = {
  api: PropTypes.shape({
    search: PropTypes.func,
  }),
  defaultKeyword: PropTypes.string,
  presenter: PropTypes.func.isRequired,
};

TopPageContainer.defaultProps = {
  api: {
    search: (keyword, params) => axios.get(`/api/videos/search/${keyword}`, { params }),
  },
  defaultKeyword: 'ねこ',
};

export default (props) => (
  <TopPageContainer
    presenter={TopPagePresenter}
    {...props}
  />
);