import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  StatusBar,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';

import GroupConfigSlice from '../../components/GroupConfigSlice.js';

function selectGroups(state) {
  return {
    groups: state.groups.groups,
  };
}

// Config groups of circuits and their names.
function GroupConfigScreen({ groups }) {
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
    <View style={styles.container}>
      <Text style={styles.text}>Config - Separate Circuits with Commas</Text>
      <FlatList
        data={groups}
        renderItem={renderGroupSlices}
        keyExtractor={(item) => item.id}
      />
    </View>
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
  });
  return styles;
}

const ConnectedGroupConfigScreen = connect(selectGroups)(GroupConfigScreen);

export default ConnectedGroupConfigScreen;
