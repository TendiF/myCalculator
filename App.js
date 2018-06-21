/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Button,
  Alert,
  TextInput
} from 'react-native';

const Board = (props) => {
  return (
    <View>
      <View style={styles.boardCalculator}>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '1' }) }}
          >1</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '2' }) }}
          >2</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '3' }) }}
          >3</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'arm', value: '+' }) }}
          >+</Text>
        </View>
      </View>
      <View style={styles.boardCalculator}>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '4' }) }}
          >4</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '5' }) }}
          >5</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '6' }) }}
          >6</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'arm', value: '-' }) }}
          >-</Text>
        </View>
      </View>
      <View style={styles.boardCalculator}>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '7' }) }}
          >7</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '8' }) }}
          >8</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '9' }) }}
          >9</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'arm', value: 'x' }) }}
          >x</Text>
        </View>
      </View>
      <View style={styles.boardCalculator}>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'delete', value: 'C' }) }}
          >C</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'number', value: '0' }) }}
          >0</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'equal', value: '=' }) }}
          >=</Text>
        </View>
        <View>
          <Text
            style={styles.textButton}
            onPress={() => { props.handleClick({ type: 'arm', value: '/' }) }}
          >/</Text>
        </View>
      </View>
    </View>
  );
}

export default class App extends Component<Props> {
  constructor(props){
    super();
    this.state = {
      display : '',
      number1 : '',
      number2 : '',
      arm     : null,
      status  : null,
      result  : ''
    };
  }
  
  render() {
    
    const handleClick = (data) => {
      if(data.type == 'number' && this.state.arm == null){
        this.setState(prevData =>{
          if(prevData.status == 'done'){
            return {
              display : data.value,
              number1 : data.value,
              arm     : null,
              result  : '',
              status  : 'process'
            }
          }else{
            return {
              display : prevData.display + data.value,
              number1 : prevData.number1 + data.value,
              status  : 'process'
            }
          }
        });
      }
      
      if(data.type == 'arm' && this.state.arm == null && this.state.status == 'process'){
        this.setState(prevData =>{
          return {
           display : prevData.display + data.value,
           arm : data.value,
           status  : 'process'
          }
        });
      }

      if(data.type == 'arm' && this.state.status == 'done' && this.state.result != ''){
        this.setState(prevData =>{
          return {
            display : prevData.result + data.value,
            number1 : prevData.result.toString(),
            number2 : '',
            arm     : data.value,
            status  : 'process',
            result  : ''
          }
        });
      }

      if(this.state.arm != null && data.type == 'number'){
        this.setState(prevData =>{
          return {
            display : prevData.display + data.value,
            number2 : prevData.number2 + data.value,
            status  : 'process'
          }
        });
      }

      if(data.type == 'delete'){
        if(this.state.status == 'done'){
          this.setState(prevData =>{
            return {
              display : '',
              number1 : '',
              number2 : '',
              arm     : null,
              status  : null,
              result  : '', 
            }
          });
        }else if(this.state.status == 'process'){
          this.setState(prevData =>{
            
            let arrayDisplay = prevData.display.split('');
            let arrayNumber1 = prevData.number1.split('');
            let arrayNumber2 = prevData.number2.split('');

            if(prevData.number2 != ''){
              return {
                display : arrayDisplay.filter((v,i) => { return i < arrayDisplay.length - 1 }).join(''),
                number2 : arrayNumber2.filter((v,i) => { return i < arrayNumber2.length - 1 }).join(''),
                // arm     : arrayDisplay[arrayDisplay.length - 1] == prevData.arm ? null : prevData.arm,
                status  : 'process'
              }
            }else{
              return {
                display : arrayDisplay.filter((v,i) => { return i < arrayDisplay.length - 1 }).join(''),
                number1 : arrayDisplay[arrayDisplay.length - 1] != prevData.arm ? arrayNumber1.filter((v,i) => { return i < arrayNumber1.length - 1 }).join('') : prevData.number1,
                arm     : arrayDisplay[arrayDisplay.length - 1] == prevData.arm ? null : prevData.arm,
                status  : 'process'
              }
            }
          });
        }
      }

      const result = {
        '+' : () => {
          this.setState(prevData =>{
            return {
              display : prevData.display+'='+ (parseFloat(prevData.number1) + parseFloat(prevData.number2)),
              number1 : '',
              number2 : '',
              arm     : null,
              status  : 'done',
              result  : (parseFloat(prevData.number1) + parseFloat(prevData.number2))
            }
          });
        },
        '-' : () => {
          this.setState(prevData =>{
            return {
              display : prevData.display+'='+ (parseFloat(prevData.number1) - parseFloat(prevData.number2)),
              number1 : '',
              number2 : '',
              arm     : null,
              status  : 'done',
              result  : (parseFloat(prevData.number1) - parseFloat(prevData.number2))
            }
          });
        },
        'x' : () => {
          this.setState(prevData =>{
            return {
              display : prevData.display+'='+ (parseFloat(prevData.number1) * parseFloat(prevData.number2)),
              number1 : '',
              number2 : '',
              arm     : null,
              status  : 'done',
              result  : (parseFloat(prevData.number1) * parseFloat(prevData.number2))
            }
          });
        },
        '/' : () => {
          this.setState(prevData =>{
            return {
              display : prevData.display+'='+ (parseFloat(prevData.number1) / parseFloat(prevData.number2)),
              number1 : '',
              number2 : '',
              arm     : null,
              status  : 'done',
              result  : (parseFloat(prevData.number1) / parseFloat(prevData.number2))
            }
          });
        },
      }

      if(data.type == 'equal'){
        if(this.state.result){
          this.setState(prevData =>{
            return {
              display : prevData.result.toString(),
              number1 : prevData.result.toString(),
              number2 : '',
              arm     : null,
              status  : 'process',
              result  : ''
            }
          });
        }else if(this.state.arm && this.state.number1 && this.state.number2){
          result[this.state.arm]();
        }
      }
    }

    return (
      <View style={styles.container}>
        <View style={{flex:1}}>
          <Text style={{flex:1, fontSize:30}}> 
            {this.state.display}
          </Text>
        </View>
        <View style={{flex:1.2}}>
          <Board style={{flex:1}} handleClick={ handleClick } state={ this.state } />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    // alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  boardCalculator: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    margin: 10,
  },
  textButton:{
    fontSize:40,
    width:25
  }
});
