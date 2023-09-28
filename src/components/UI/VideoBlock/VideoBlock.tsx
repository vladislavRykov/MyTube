import React, { ComponentPropsWithoutRef } from 'react';
import s from './VideoBlock.module.scss';
import cn from 'classnames';
import { Player } from '../../../types/VideoById';

interface VideoBlockProps extends ComponentPropsWithoutRef<'div'> {
  player: Player;
}

const VideoBlock: React.FC<VideoBlockProps> = ({ player, ...rest }) => {
  return (
    <div {...rest} style={{ maxWidth: player.embedWidth, maxHeight: player.embedHeight }}>
      <div className={s.videowrapper}>
        <div dangerouslySetInnerHTML={{ __html: player.embedHtml }}></div>
      </div>
    </div>
  );
};

export default VideoBlock;
