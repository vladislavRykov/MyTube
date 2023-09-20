import React, { ComponentProps, ComponentPropsWithoutRef, useState } from 'react';
import mockImg from '../../../assets/static/mockVideoAva.jpg';
import { DefaultOrMediumOrHighOrStandardOrMaxres as ChannelThumbnail } from './../../../types/Videos';

interface VideoAvaProps extends Omit<ComponentPropsWithoutRef<'img'>, 'src'> {
  imageData: ChannelThumbnail | null | undefined;
  // rest: ComponentProps<typeof Image>;
}
const Avatar = ({ imageData, ...rest }: VideoAvaProps) => {
  const [img, setImg] = useState<string>(imageData?.url || mockImg);
  return (
    <img
      {...rest}
      height={imageData?.height}
      width={imageData?.width}
      src={img}
      onError={() => {
        setImg(mockImg);
      }}
      alt="image"
    />
  );
};

export default Avatar;
