import React from 'react';
import {View, StyleSheet, Platform} from 'react-native';
import {ItemProps} from '../types';
import {BoldText} from '../ui';
import {hp, COLORS} from '../utils/Utils';

const ListItem = (props: ItemProps) => {
  const {id, name, status, gender, origin, type} = props;
  return (
    <View style={styles.mainStyle}>
      <View style={styles.titleContainerStyle}>
        <BoldText customstyle={styles.titleStyle}>ID</BoldText>
        <BoldText customstyle={styles.titleStyle}>Name</BoldText>
        <BoldText customstyle={styles.titleStyle}>Status</BoldText>
        <BoldText customstyle={styles.titleStyle}>Gender</BoldText>
        <BoldText customstyle={styles.titleStyle}>Origin</BoldText>
        <BoldText customstyle={styles.titleStyle}>Type</BoldText>
      </View>
      <View style={styles.detailContainerStyle}>
        <BoldText customstyle={styles.detailsStyle}>{id}</BoldText>
        <BoldText customstyle={styles.detailsStyle}>{name}</BoldText>
        <BoldText customstyle={styles.detailsStyle}>{status}</BoldText>
        <BoldText customstyle={styles.detailsStyle}>{gender}</BoldText>
        <BoldText customstyle={styles.detailsStyle}>{origin?.name}</BoldText>
        <BoldText customstyle={styles.detailsStyle}>{type}</BoldText>
      </View>
    </View>
  );
};

export default ListItem;

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: hp(10),
    backgroundColor: COLORS.White,
    padding: hp(13),
    ...Platform.select({
      android: {
        elevation: 5,
      },
      ios: {
        shadowOffset: {width: hp(10), height: hp(10)},
        shadowColor: COLORS.Grey,
        shadowOpacity: 1,
        zIndex: 999,
      },
    }),
  },
  detailContainerStyle: {
    marginLeft: hp(20),
  },
  titleContainerStyle: {
    backgroundColor: COLORS.OffWhite,
    paddingHorizontal: hp(10),
  },
  titleStyle: {
    color: COLORS.Black,
  },
  detailsStyle: {
    color: COLORS.Black,
  },
});
