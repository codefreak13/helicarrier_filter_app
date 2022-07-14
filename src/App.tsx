import React from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {Home} from './screens';
import {ApolloProvider} from '@apollo/client';
import {client} from './apollo';

const App = () => {
  return (
    <SafeAreaView style={styles.backgroundStyle}>
      <StatusBar barStyle={'light-content'} />
      <ApolloProvider client={client}>
        <Home />
      </ApolloProvider>
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({
  backgroundStyle: {
    flex: 1,
  },
});
