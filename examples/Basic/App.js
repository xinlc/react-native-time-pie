/**
 * Example
 * Created by xinlc on 13/04/2018.
 */
import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Pie from 'react-native-time-pie';

type Props = {};
export default class App extends Component<Props> {
  state ={
  }

  render() {
    const foo = { startTime: '08:00', endTime: '11:00', fillColor: 'green' };
    const bar = { startTime: '20:00', endTime: '23:30', fillColor: 'blue' };
    const pieData = [foo, bar];

    return (
      <View style={styles.container}>
        <Pie 
          data={pieData}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
