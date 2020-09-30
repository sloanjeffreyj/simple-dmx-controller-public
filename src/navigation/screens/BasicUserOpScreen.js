import React, { useState, useEffect } from 'react';
import {
  Dimensions,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import { useTheme, useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux';

import IntensitySlider from '../../components/IntensitySlider.js';
import { startBleScan } from '../../redux/thunk/startBleScan.js';
import { connectDevice } from '../../redux/thunk/connectDevice.js';
import Animated from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native-gesture-handler';

// Connect Redux state.
function mapStateToProps(state) {
  return {
    groups: state.groups.groups,
    bleList: state.bleManager['bleList'],
  };
}

// Connect Redux action creators.
const mapDispatchToProps = (dispatch) => ({
  connectDevice: (device) => dispatch(connectDevice(device)),
  startBleScan: () => dispatch(startBleScan()),
});

// The "home" type screen where typical users control intensity of circuit groups.
function BasicUserOpScreen(props) {
  const styles = createStyle();
  const [rowSwipeAnimatedValues, setRowSwipeAnimatedValues] = useState({});
  const [listViewData, setListViewData] = useState();
  const [sectionListData, setSectionListData] = useState();

  useEffect(() => {
    console.log('BasicUserOpScreen is running startBleScan...');
    props.startBleScan();
    Array(props.bleList.length)
      .fill('')
      .forEach((_, i) => {
        rowSwipeAnimatedValues[`${i}`] = new Animated.Value(0);
      });
  }, []);

  function onSelected(id) { }

  function closeRow(rowMap, rowKey) {
    if (rowMap[rowKey]) {
      rowMap[rowKey].closeRow();
    }
  }

  function deleteRow(rowMap, rowKey) {
    closeRow(rowMap, rowKey);
    let newData = [...listViewData];
    const prevIndex = sectionListData[section].data.findIndex(
      (item) => item.key === rowKey
    );
    newData[section].data.splice(prevIndex, 1);
    setListViewData({ newData });
  }

  function handleClick(device) {
    props.connectDevice(device);
  }

  function renderGroupList({ item }) {
    return (
      <IntensitySlider
        id={item.id}
        circuits={item.circuits}
        intensity={item.intensity}
        nickname={item.nickname}
      />
    );
  }

  function renderBleDevices(data) {
    return (
      <TouchableHighlight
        onPress={() => handleClick(data.item)}
        style={styles.rowFront}
        underlayColor={'#aaa'}
      >
        <View>
          <Text>Tap to connect to: {data.item.name}</Text>
        </View>
      </TouchableHighlight>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={props.bleList}
        extraData={props.bleList}
        renderItem={(data) => renderBleDevices(data)}
      />
      <FlatList
        data={props.groups}
        renderItem={renderGroupList}
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
      alignContent: 'center',
      marginTop: StatusBar.currentHeight,
    },
    text: {
      color: colors.text,
    },
    standalone: {
      marginTop: 30,
      marginBottom: 30,
    },
    standaloneRowFront: {
      alignItems: 'center',
      backgroundColor: '#CCC',
      justifyContent: 'center',
      height: 50,
    },
    standaloneRowBack: {
      alignItems: 'center',
      backgroundColor: '#8BC645',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 15,
    },
    backTextWhite: {
      color: '#FFF',
    },
    rowFront: {
      alignSelf: 'center',
      backgroundColor: '#ccc',
      borderBottomColor: '#fff',
      borderWidth: 1,
      justifyContent: 'center',
      height: 50,

      width: 200,
    },
    rowBack: {
      alignItems: 'center',
      backgroundColor: '#DDD',
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
    },
    backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
    },
    backRightBtnLeft: {
      backgroundColor: 'blue',
      right: 75,
    },
    backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
    },
    controls: {
      alignItems: 'center',
      marginBottom: 30,
    },
    switchContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 5,
    },
    switch: {
      alignItems: 'center',
      borderWidth: 1,
      borderColor: 'black',
      paddingVertical: 10,
      width: Dimensions.get('window').width / 4,
    },
    trash: {
      height: 25,
      width: 25,
    },
  });
  return styles;
}

const ConnectedBasicUserOpScreen = connect(
  mapStateToProps,
  mapDispatchToProps
)(BasicUserOpScreen);

export default ConnectedBasicUserOpScreen;
