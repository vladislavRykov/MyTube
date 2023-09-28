import { SearchQueryObj } from '../../../types/Common';
export const convertFiltersToSearchApiObj = (qObj: SearchQueryObj) => {
  const newObj: SearchQueryObj & {
    videoType?: string;
    videoDimension?: string;
    videoCaption?: string;
    eventType?: string;
    videoDefinition?: string;
  } = { ...qObj };
  if (newObj.hasOwnProperty('type')) {
    switch (newObj.type) {
      case 'movie':
        newObj.videoType = newObj.type;
        delete newObj.type;
        break;
    }
  }
  if (newObj.hasOwnProperty('special')) {
    const specialMassive = newObj.special?.split('%2C');
    if (specialMassive?.includes('3d')) {
      newObj.videoDimension = '3d';
    }
    if (specialMassive?.includes('closedCaption')) {
      newObj.videoCaption = 'closedCaption';
    }
    if (specialMassive?.includes('live')) {
      newObj.eventType = 'live';
    }
    if (specialMassive?.includes('high')) {
      newObj.videoDefinition = 'high';
    }
    delete newObj.special;
  }
  return newObj;
};
