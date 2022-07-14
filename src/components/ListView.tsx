import React from 'react';
import {View, SectionList, StyleSheet} from 'react-native';
import {formatDataByDate, hp} from '../utils/Utils';
import {BoldText, MediumText} from '../ui';
import ListItem from './ListItem';
import {ItemProps} from '../types';

type Props = {
  data: ItemProps[];
};

const ListView = (props: Props) => {
  const {data} = props;
  return (
    <SectionList
      style={styles.listStyle}
      keyExtractor={(item, index) => item.id + index}
      showsVerticalScrollIndicator={false}
      sections={formatDataByDate(data)}
      ListEmptyComponent={
        <View style={styles.emptyListStyle}>
          <BoldText>No Item</BoldText>
        </View>
      }
      renderItem={({item}) => <ListItem {...item} />}
      renderSectionHeader={({section: {title}}) => (
        <View style={styles.titleContainerStyle}>
          <MediumText>{title}</MediumText>
        </View>
      )}
      stickyHeaderHiddenOnScroll={true}
    />
  );
};

const styles = StyleSheet.create({
  listStyle: {
    flex: 1,
    width: '100%',
  },
  titleContainerStyle: {
    alignItems: 'flex-start',
    marginHorizontal: hp(10),
    marginTop: hp(20),
    backgroundColor: 'transparent',
  },
  emptyListStyle: {
    alignItems: 'center',
    marginTop: hp(200),
  },
});

export default ListView;
