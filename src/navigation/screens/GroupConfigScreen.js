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
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Config - Separate Circuits with Commas</Text>
        <FlatList
          data={props.groups}
          renderItem={renderGroupSlices}
          keyExtractor={(item) => item.id}
          removeClippedSubviews={false}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      marginTop: StatusBar.currentHeight,
    },
    text: {
      color: colors.text,
      fontSize: 18,
    },
    title: {
      
    },
  });
  return styles;
}

const ConnectedGroupConfigScreen = connect(mapStateToProps)(GroupConfigScreen);

export default ConnectedGroupConfigScreen;
