import React from 'react';
import { actions } from '@storybook/addon-actions';
import styled, { css } from 'styled-components';
import VideoListTemplate from '.';

export default { title: 'templates/VideoListTemplate' };

const commonStyle = css`
  background: #f0f0f0;
  text-align: center;
`;

const Header = styled.div`
  width: 100%;
  height: 33px;
  ${commonStyle};
`;

const SearchForm = styled.div`
  width: 100%;
  height: 47px;
  ${commonStyle};
`;

const VideoList = styled.div`
  width: 100%;
  height: 1000px;
  ${commonStyle};
`;

export const Default = () => (
  <VideoListTemplate
    headerContents={<Header>header</Header>}
    searchFormContents={<SearchForm>searchForm</SearchForm>}
    videoListContents={<VideoList>videoList</VideoList>}
    {...actions('onScrollEnd')}
  />
);