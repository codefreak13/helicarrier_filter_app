import React from 'react';
import RNPickerSelect, {PickerStyle} from 'react-native-picker-select';
import {StyleSheet, View, ViewStyle} from 'react-native';
import {COLORS, hp} from '../utils/Utils';

interface itemsProps {
  label: string;
  value: string;
}

type Props = {
  items: itemsProps[];
  onValueChange: (value: string) => void;
  placeholder?: string;
  value?: string;
  style?: ViewStyle;
  textInputProps?: ViewStyle;
};

export default function PickerSelect(props: Props) {
  const {items, onValueChange, placeholder, value, style, textInputProps} =
    props;
  return (
    <View style={styles.container}>
      <RNPickerSelect
        onValueChange={value => onValueChange(value)}
        items={items}
        value={value}
        placeholder={{label: placeholder, value: ''}}
        style={{...pickerSelectStyles, ...style}}
        textInputProps={textInputProps}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: hp(50),
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: hp(16),
    paddingVertical: hp(12),
    paddingHorizontal: hp(10),
    borderWidth: 1,
    borderColor: COLORS.Grey,
    borderRadius: 4,
    color: COLORS.Black,
    paddingRight: hp(30), // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: hp(16),
    paddingHorizontal: hp(10),
    paddingVertical: hp(8),
    borderWidth: 0.5,
    borderColor: COLORS.DarkGrey,
    borderRadius: hp(8),
    color: COLORS.Black,
    // paddingRight: hp(30), // to ensure the text is never behind the icon
  },
  inputAndroidContainer: {
    margin: hp(5),
    marginHorizontal: hp(10),
  },
});
