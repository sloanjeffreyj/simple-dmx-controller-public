import React, { useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  KeyboardAvoidingView,
  StatusBar,
  Platform,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-navigation';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import { PanGestureHandler } from 'react-native-gesture-handler';

import GroupConfigSlice from '../../components/GroupConfigSlice.js';

function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
  };
}

// Config groups of circuits and their names.
function GroupConfigScreen(props) {
  const styles = createStyle();

  function renderGroupSlices({ item }) {
    return (
      <GroupConfigSlice
        id={item.id}
        circuits={item.circuits}
        intensity={item.intensity}
        nickname={item.nickname}
      />
    );
  }

  return (
        <SafeAreaView style={styles.container}>
          <KeyboardAvoidingView
            style={{flex: 1, alignItems: 'center'}}
          >
            <PanGestureHandler
            minDist={40}
            onGestureEvent={() => props.navigation.navigate('Basic User Operation')}
          >
            <View style={{flex: 1}}>
              <Text style={styles.title}>Config - Separate Circuits with Commas</Text>
              <FlatList
                data={props.groups}
                renderItem={renderGroupSlices}
                keyExtractor={(item) => item.id}
                removeClippedSubviews={false}
              />
            </View>
            </PanGestureHandler>
          </KeyboardAvoidingView>
        </SafeAreaView>
  );
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignContent: 'center',
      alignItems: 'center',
    },
    flatList: {
      width: '95%',
    },
    title: {
      color: colors.text,
      fontSize: 18,
      marginBottom: 4,
      marginTop: 4,
    },
  });
  return styles;
}

const ConnectedGroupConfigScreen = connect(mapStateToProps)(GroupConfigScreen);

export default ConnectedGroupConfigScreen;
