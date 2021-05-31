import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import Image from '~/components/atoms/Image';
import Typography from '~/components/atoms/Typography';

const Root = styled.div`
  cursor: pointer;
  display: flex;
  padding: 4px;
  border: 1px solid #ccc;
  border-radius: 4px;
  align-items: center;
  position: relative;
  overflow-x: hidden;
`;

const Thumbnail = styled.div`
  flex-shrink: 1;
  min-width: 160px;
  max-width: 160px;
  > * {
    width: 100%;
  }
`;

const InfoWrapper = styled.div`
  margin-left;
  word-break: break-all;
`;

const Description = styled(Typography)`
  margin-top: 5px;
  height: fit-content;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
`;

const ViewCount = styled(Typography)`
  margin-top: 5px;
`;

const VideoListItemPresenter = ({
  className,
  onClick,
  thumbnailUrl,
  title,
  description,
  viewCount,
}) => (
  <Root className={className} onClick={onClick}>
    <Thumbnail>
      <Image src={thumbnailUrl} alt={title} />
    </Thumbnail>
    <InfoWrapper>
      <Typography size="subtitle" bold display="inline-block">{title}</Typography>
      <Description>{description}</Description>
      <ViewCount size="xs" color="gray">
        {viewCount}
        回視聴
      </ViewCount>
    </InfoWrapper>
  </Root>
);

VideoListItemPresenter.propTypes = {
  className: PropTypes.string,
  onClick: PropTypes.func,
  thumbnailUrl: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  viewCount: PropTypes.string.isRequired,
};

VideoListItemPresenter.defaultProps = {
  className: '',
  onClick: null,
};

const VideoListItemContainer = ({
  className,
  video: {
    id,
    snippet: {
      title,
      description,
      thumbnails: {
        medium: {
          url: thumbnailUrl,
        },
      },
    },
    statistics: {
      viewCount,
    },
  },
  presenter,
}) => {
  // ページ遷移させるため、useHistoryを使ってhistoryオブジェクトを取得
  const history = useHistory();
  return presenter({
    className,
    onClick: () => {
      // クリックされた時にページ遷移する
      history.push(`/play/${id}`);
    },
    title,
    thumbnailUrl,
    description,
    viewCount,
  });
};

VideoListItemContainer.propTypes = {
  className: PropTypes.string,
  video: PropTypes.shape({
    id: PropTypes.string.isRequired,
    snippet: PropTypes.shape({
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      thumbnails: PropTypes.shape({
        url: PropTypes.string,
      }),
    }).isRequired,
  }).isRequired
};

VideoListItemContainer.defaultProps = {
  className: '',
};

export default (props) => (
  <VideoListItemContainer
    presenter={VideoListItemPresenter}
    {...props}
  />
);

