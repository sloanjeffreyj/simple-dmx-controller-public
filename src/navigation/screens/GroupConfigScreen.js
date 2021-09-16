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
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

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
    // <PanGestureHandler
    //  minDist={40}
     //   onGestureEvent={() => props.navigation.navigate('Config')}
    // >
      <KeyboardAvoidingView
        // This line may be redundant? Haven't checked the iOS version yet.
        // behavior={Platform.OS === 'ios' ? 18 : 0}
        style={{flex: 1}}
      >
        <View style={styles.container}>
          <Text style={styles.title}>Config - Separate Circuits with Commas</Text>
          <FlatList
            data={props.groups}
            renderItem={renderGroupSlices}
            keyExtractor={(item) => item.id}
            removeClippedSubviews={false}
          />
        </View>
        </KeyboardAvoidingView>
      //</PanGestureHandler>
  );
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: (Platform.OS === 'ios') ? 18 : 2,
    },
    flatList: {
      width: '95%',
    },
    title: {
      color: colors.text,
      fontSize: 18,
      marginBottom: 4,
    },
  });
  return styles;
}

const ConnectedGroupConfigScreen = connect(mapStateToProps)(GroupConfigScreen);

export default ConnectedGroupConfigScreen;
