import React from 'react';
import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputFocusEventData,
  ViewStyle,
  View,
} from 'react-native';
import {COLORS, hp} from '../utils/Utils';
import Ionicons from 'react-native-vector-icons/Ionicons';

type InputProps = {
  customstyle?: ViewStyle;
  value?: string;
  setValue?: (x: string) => void;
  placeholder?: string;
  numberOfLines?: number;
  multiline?: boolean;
  testID?: string;
  editable?: boolean;
  onClear?: () => void;
  onBlur?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  keyboardType?:
    | 'default'
    | 'email-address'
    | 'numeric'
    | 'phone-pad'
    | 'number-pad'
    | 'decimal-pad';
};

const Input = (props: InputProps) => {
  const {
    customstyle,
    value,
    setValue,
    placeholder,
    numberOfLines,
    multiline,
    testID,
    editable,
    keyboardType,
    onBlur,
    onClear,
  } = props;

  return (
    <View style={styles.main}>
      <TextInput
        value={value}
        onChangeText={text => setValue && setValue(text)}
        style={{...styles.input, ...customstyle}}
        placeholder={placeholder}
        numberOfLines={numberOfLines}
        multiline={multiline}
        testID={testID}
        editable={editable}
        keyboardType={keyboardType}
        onBlur={onBlur}
      />
      {value && (
        <Ionicons
          onPress={onClear}
          name="close-circle-outline"
          size={20}
          color={COLORS.Black}
          style={styles.clearStyle}
        />
      )}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    maxHeight: hp(60),
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: hp(0.7),
    borderColor: COLORS.Black,
    backgroundColor: COLORS.White,
    borderRadius: hp(8),
  },
  input: {
    minHeight: hp(50),
  },
  clearStyle: {
    marginRight: hp(10),
  },
});
