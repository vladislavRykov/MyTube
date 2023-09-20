import React, { ComponentPropsWithoutRef } from 'react';
import s from './VideoBlock.module.scss';
import cn from 'classnames';
import { Player } from '../../../types/VideoById';

interface VideoBlockProps extends ComponentPropsWithoutRef<'div'> {
  player: Player;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ player, ...rest }) => {
  const { className, ...restProps } = rest;
  return (
    <div
      {...restProps}
      style={{ maxWidth: player.embedWidth, maxHeight: player.embedHeight }}
      className={cn(s.container, className)}>
      <div className={s.videowrapper}>
        <div dangerouslySetInnerHTML={{ __html: player.embedHtml }}></div>
      </div>
    </div>
  );
};

export default VideoBlock;
