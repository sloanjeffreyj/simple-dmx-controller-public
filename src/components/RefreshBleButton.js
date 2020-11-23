// Used to disconnect current device and start scan again.

import React from 'react';
import { Text, TouchableHighlight, StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect }  from 'react-redux';

import { startBleScan } from '../redux/thunk/startBleScan.js';

// Connect to Redux for props
function mapStateToProps(state) {
  return {
    bleManager: state.bleManager
  }
}

// Connect to Redux to dispatch
function mapDispatchToProps(dispatch) {
  return {
    startBleScan: () => dispatch(startBleScan()),
  };
}

function RefreshBleButton(props) {
  const styles = createStyle();

  function handleClick() {
    props.startBleScan();
  }

  return (
    <View style={styles.container}>
      <TouchableHighlight
        onPress={() => handleClick()}
        style={styles.button}
      >
      <Text style={styles.text}>Refresh Scan</Text>
      </TouchableHighlight>
    </View>
  )
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    button: {
      backgroundColor: 'rgba(255, 41, 41, 0.5)',
      borderRadius: 10,
      fontSize: 16,
      height: 40,
      justifyContent: 'center',
      margin: 5,
      padding: 5,
      width: '100%',
    },
    container: {
      alignItems: 'center',
      alignSelf: 'center',
      justifyContent: 'center',
      width: '40%',
    },
    text: {
      alignSelf: 'center',
      color: colors.text,
      fontSize: 16,
    }
  });
  return styles;
}

const ConnectedRefreshBleButton = connect(
  mapStateToProps,
  mapDispatchToProps)
  (RefreshBleButton);

export default ConnectedRefreshBleButton;
