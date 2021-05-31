import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import VideoListItem from '~/components/organisms/VideoListItem';
import Spinner from '~/components/atoms/Spinner';
import Typography from '~/components/atoms/Typography';

const StyledVideoListItem = styled(VideoListItem)`
  margin-top: 10px;
`;

const Loading = styled.div`
  position: relative;
  width: 100%;
  height: 100px;
`;

const VideoList = ({
  loading,
  videos,
}) => (
  <>
    {!loading && !videos.length && <Typography>ビデオがありません</Typography>}
    {/* videoの中身の数だけVideoListItemを表示 */}
    {videos.map((video) => (
      <StyledVideoListItem key={video.id} video={video} />
    ))}
    {/* ロード中はSpinnerを表示 */}
    {loading && <Loading><Spinner /></Loading>}
  </>
);

VideoList.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.shape({})),
  loading: PropTypes.bool,
};

VideoList.defaultProps = {
  video: [],
  loading: false,
};

export default VideoList;