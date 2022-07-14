import {Dimensions} from 'react-native';
import {
  widthPercentageToDP as wdp,
  heightPercentageToDP as hdp,
} from 'react-native-responsive-screen';
import moment from 'moment';
import {groupBy, sortBy} from 'lodash';
import * as COLORS from './colors';
import {ItemProps} from '../types';

const CustomHeight = 812;
const CustomWidth = 375;

export const hp = (value: number) => {
  const dimension = (value / CustomHeight) * 100;
  return hdp(`${dimension}%`);
};

export const wp = (value: number) => {
  const dimension = (value / CustomWidth) * 100;
  return wdp(`${dimension}%`);
};

export const DEVICE_WIDTH = Dimensions.get('window').width;
export const DEVICE_HEIGHT = Dimensions.get('window').height;

export const formatDataByDate = (data: ItemProps[] = []) => {
  let transGroup: {title: string; data: ItemProps[]}[] = [];
  const sorted = sortBy(data, ['created']);
  const groups = groupBy(sorted, (d: {created: moment.MomentInput}) =>
    moment(d.created).startOf('day').format(),
  );
  Object.keys(groups).forEach(i => {
    transGroup.push({
      title: moment(i).format('DD MMM YYYY'),
      data: groups[i],
    });
  });
  return transGroup.reverse();
};

export {COLORS};
