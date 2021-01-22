import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { connect } from 'react-redux';

import setGroupNickname from '../redux/actions/setGroupNickname.js';
import setGroupCircuits from '../redux/actions/setGroupCircuits.js';
import selectDisplayName from '../helpers/selectDisplayName.js';
import { RESTART_DEVICE_CODE, SET_CONFIG_CODE } from '../constants/actionTypes.js'

function dispatchSetGroupConfig(dispatch) {
  return {
    setGroupNickname: (groupInfo) => dispatch(setGroupNickname(groupInfo)),
    setGroupCircuits: (groupInfo) => dispatch(setGroupCircuits(groupInfo)),
  };
}

function ConnectGroupConfigSlice(props) {
  const styles = createStyle();
  const [displayCircuits, setDisplayCircuits] = useState(
    formatCircuitText(props.circuits)
  );
  const [displayName, setDisplayName] = useState(
    selectDisplayName(props.nickname)
  );

  // Handles changing nickname
  function handleNicknameChange(value) {
    let groupInfo = {
      operation: SET_CONFIG_CODE,
      id: props.id,
      circuits: props.circuits,
      intensity: props.intensity,
      nickname: value.nativeEvent.text,
    };
    props.setGroupNickname(groupInfo);
  }

  // Handles changing circuits
  function handleCircuitChange(value) {
    // Check that user input is valid, format, turn into array
    let formattedString = formatCircuitText(value.nativeEvent.text);
    formattedString = formattedString.split(',');

    // Turn ranges of numbers (ex. "10-12") into individual int's separated by commas (ex. "10,11,12").
    // Handle range of numbers from user input (ex. 20-45). Transformed into all numbers inbetween.
    // if (x.indexOf('-') > -1) {
    //   let circuitRangeString = x.split('-');
    //   let beginRange = parseInt(circuitRange[0]);
    //   let endRange = parseInt(circuitRange[2]);
    //   let rangeIndex = beginRange;
    //   while (beginRange < endRange) {

    //   }
    // }

    // Turn into array of numbers.
    let numArr = formattedString.map((x) => {
      return parseInt(x, 10);
    });

    // Filter out non numbers that slipped through.
    let circuitsPayload = numArr.filter((item) => {
      return !isNaN(item);
    });

    // Format payload
    let groupInfo = {
      id: props.id,
      circuits: circuitsPayload,
      intensity: props.intensity,
      nickname: props.nickname,
    };
    setDisplayCircuits(formatCircuitText(circuitsPayload));
    console.log(groupInfo);
    props.setGroupCircuits(groupInfo);
  }

  // Format circuits for display to user
  function formatCircuitText(circuits) {
    let unformattedCircuits = JSON.stringify(circuits);
    let formattedCircuits = unformattedCircuits.replace(/[^0-9,-]/g, '');
    return formattedCircuits;
  }

  return (
    <View style={styles.container}>
      <View style={styles.groupNameContainer}>
        <Text style={styles.text}>Group: </Text>
        <TextInput
          style={styles.textInput}
          defaultValue={selectDisplayName(props.nickname, props.id)}
          onSubmitEditing={(value) => handleNicknameChange(value)}
          selectTextonFocus={true}
        />
      </View>
      <View style={styles.circuitsContainer}>
        <Text style={styles.text}>Circuits: </Text>
        <TextInput
          ellipsizeMode={'middle'}
          numberOfLines={1}
          style={styles.textInput}
          onSubmitEditing={(value) => handleCircuitChange(value)}
          defaultValue={formatCircuitText(props.circuits)}
          keyboardType={'numeric'}
          multiline={true}
          returnKeyType={'done'}
          value={displayCircuits}
          onChangeText={(value) => setDisplayCircuits(formatCircuitText(value))}
        />
      </View>
    </View>
  );
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      justifyContent: 'space-around',
      width: 380,
      height: 90,
      paddingLeft: 8,
      margin: 8,
    },
    circuitsContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    groupNameContainer: {
      alignItems: 'center',
      flex: 1,
      flexDirection: 'row',
    },
    text: {
      color: colors.text,
      fontSize: 18,
    },
    textInput: {
      color: colors.text,
      flex: 1,
      fontSize: 18,
      backgroundColor: 'rgba(255, 165, 20, 0.2)',
      borderColor: colors.border,
      borderRadius: 10,
      borderWidth: 2,
      margin: 2,
      paddingLeft: 4,
      paddingRight: 4,
      textAlign: 'center',
    },
  });
  return styles;
}

const GroupConfigSlice = connect(
  null,
  dispatchSetGroupConfig
)(ConnectGroupConfigSlice);

export default GroupConfigSlice;
