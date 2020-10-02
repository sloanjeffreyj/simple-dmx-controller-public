import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useTheme } from '@react-navigation/native';

export default function IntensityFlatListSeperator() {
  const styles = createStyle();
  return (
    <View style={styles.container}>
    </View>
  )
}

function createStyle() {
  const { colors } = useTheme();
  const styles = StyleSheet.create({
    container: {
      borderColor: colors.card,
      borderWidth: 2,
    },
  });
  return styles;
}