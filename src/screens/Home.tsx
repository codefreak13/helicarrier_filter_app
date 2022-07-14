import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Header, ListView, Loader} from '../components';
import {BoldText, Button, Input, PickerSelect} from '../ui';
import {COLORS, hp} from '../utils/Utils';
import {useBiodata} from '../hooks';
import {nameData, genderData, originData, statusData, typeData} from '../data';

const Home = () => {
  const {
    onChangeFormValue,
    clearSelection,
    renderedData,
    onChangeText,
    searchParam,
    onClearText,
    loading,
    gender,
    status,
    origin,
    error,
    name,
    type,
  } = useBiodata();

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <BoldText customstyle={styles.errorText}>Network Error</BoldText>
      ) : (
        <View style={styles.mainStyle}>
          <Header title="BIODATA" customMiddleIcon />
          <Input
            value={searchParam}
            placeholder="Search"
            setValue={onChangeText}
            onClear={onClearText}
          />
          <View style={styles.filterBar}>
            <PickerSelect
              items={nameData}
              value={name}
              placeholder="Name"
              onValueChange={onChangeFormValue('name')}
            />
            <PickerSelect
              items={statusData}
              value={status}
              placeholder="Status"
              onValueChange={onChangeFormValue('status')}
            />
            <PickerSelect
              items={genderData}
              value={gender}
              placeholder="Gender"
              onValueChange={onChangeFormValue('gender')}
            />
            <PickerSelect
              items={originData}
              value={origin}
              placeholder="Origin"
              onValueChange={onChangeFormValue('origin')}
            />
            <PickerSelect
              items={typeData}
              value={type}
              placeholder="Type"
              onValueChange={onChangeFormValue('type')}
            />
          </View>
          {(!!name || !!status || !!gender || !!origin || !!type) && (
            <Button
              title="Clear Selection(s)"
              onPress={clearSelection}
              customstyle={styles.buttonStyle}
            />
          )}
          <ListView data={renderedData} />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  mainStyle: {
    flex: 1,
    marginVertical: hp(20),
    alignItems: 'center',
    marginHorizontal: hp(15),
  },
  buttonStyle: {
    alignSelf: 'center',
    alignItems: 'center',
    borderWidth: hp(0.7),
    borderColor: COLORS.Black,
    backgroundColor: COLORS.White,
    borderRadius: hp(8),
    padding: hp(5),
  },
  errorText: {
    alignSelf: 'center',
    marginVertical: hp(50),
    color: COLORS.Danger,
  },
  filterBar: {
    flexDirection: 'row',
    marginVertical: hp(20),
  },
});

export default Home;
