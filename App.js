/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import styles from './style'
import {Platform,Image, ScrollView,ToolbarAndroid, Text, View, TextInput, FlatList, Dimensions} from 'react-native';
import { Container, Header, Title, Content, Footer, FooterTab, Button, Left, Right, Body, Icon } from 'native-base';
// 3rd party libraries
import NumberFormat from 'react-number-format';

const BLUE = "#428AF8";
const LIGHT_GREEN ="#7ee7e4";
const LIGHT_GRAY = "#D3D3D3";
const WHITE = "#FFFFFF";

export default class App extends Component {


handleFocus = event => {
  this.setState({ isFocused: true });
  if (this.props.onFocus) {
    this.props.onFocus(event);
  }
};

handleBlur = event => {
  this.setState({ isFocused: false });
  if (this.props.onBlur) {
    this.props.onBlur(event);
  }
};

onActionSelected(position) {
}

handleTextChanged(text) {
  console.warn('text changed !');
  this.setState({ text });
}


state = {
  year: '',
  isFocused: false,
  age: '26',
  investment: '14000',
  income: '54000',
  spending: '40000',
  savings: '',
  incGrowth: '3',
  retSpending: '35000',
  wrRate: '4',
  invReturns: '7',
  fireNumber: '',
  currencySymbol:'£',
  percentageSymbol:'%',
  fireData:[] 
};


onFireReady = () => { 
  console.log("\n---------BEGIN---------");
  
  this.state.fireData = [];
  this.state.savings = this.state.income - this.state.spending;

  // Calculate FireNumber 
  this.state.fireNumber = ((this.state.retSpending / this.state.wrRate) * 100).toFixed(0);

  this.compound(this.state.investment, (this.state.invReturns/100) + 1,
  this.state.age, this.state.income, this.state.savings);
 
  console.log("---------END---------\n");
}

increaseIncome(income)
{ 
  return income *= ((this.state.incGrowth/100) + 1);
}

increaseSavings(income, spending)
{
  return newSavingsValue = (income * ((this.state.incGrowth/100) + 1)) - spending;
}

compound( investment, interest, age, income, savings) {
  var accumulated = parseInt(investment);  

  console.log("this.state.fireNumber:" + this.state.fireNumber);

	for ( i=age, j = 0; accumulated < this.state.fireNumber; i++, j++ ) {    

    accumulated = (accumulated + savings) * interest.toFixed(2);

    savings = this.increaseSavings(income, this.state.spending);

    income = this.increaseIncome(income);

    var objToPush = {
      index: j,
      age: i,
      value: accumulated.toFixed(0)
    };

    console.log(objToPush);

    var newStateArray = this.state.fireData.slice();

    newStateArray.push(objToPush);

    this.setState({fireData: newStateArray});

    this.state.fireData = newStateArray;    
  }
  
  console.log(investment + ' to ' + accumulated.toFixed(0) + ' at ' + interest +  ' over ' + age + ' years' )
}


componentDidMount(){
  this.onFireReady()
}


  render() {

    const { isFocused } = this.state;
    var NumberFormat = require('react-number-format');
    return (
    
      
      <View style={styles.container}>

      {/* <ToolbarAndroid
        style={styles.toolbar}
        title="FireCalc"
        onActionSelected={this.onActionSelected}
        titleColor= "#FFFFFF"        
        actions = {[
          {title: "Log out", show: "never"}
        ]}
      /> */}


        <Header>
          <Left>
            <Button transparent style={styles.header}>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title style={styles.h2}>Firecalc</Title>
          </Body>
          <Right />
        </Header>
     

      <ScrollView>
     
     
      <View style={styles.MoneyRowText}>       
        <View style={styles.h2}>
          <Text style={styles.text}>Age</Text>
          <TextInput
            maxLength={2}    
            keyboardType = "numeric"
            selectionColor={LIGHT_GREEN}
            underlineColorAndroid={
              isFocused ? LIGHT_GREEN : LIGHT_GRAY
            }
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={styles.textInput}           
            onChangeText={(age) => (this.setState({age}))}    
            onEndEditing={() => this.onFireReady()} 
            onSelectionChange={() => this.onFireReady()}          
            value={this.state.age}             
          />
        </View>
        <View style={styles.h2}>
          <Text style={styles.text}>Investments</Text>
          <TextInput
            keyboardType = "numeric"
            selectionColor={LIGHT_GREEN}
            underlineColorAndroid={
              isFocused ? LIGHT_GREEN : LIGHT_GRAY
            }
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            style={styles.textInput}
            onChangeText={(investment) => this.setState({investment})}
            onEndEditing={() => this.onFireReady()} 
            onSelectionChange={() => this.onFireReady()} 
            value={this.state.investment}
          />
        </View>
      </View>

      <View style={styles.MoneyRowText}>
        <View style={styles.h2}>
            <Text style={styles.text}>Income(-Tax)</Text>
            <TextInput
              keyboardType = "numeric"
              selectionColor={LIGHT_GREEN}
              underlineColorAndroid={
                isFocused ? LIGHT_GREEN : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(income) => this.setState({income})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()} 
              value={this.state.income}
            />
        </View>
        <View style={styles.h2}>
            <Text style={styles.text}>Spending</Text>
            <NumberFormat
            
              displayType={'text'}  
              thousandSeparator={true}
              prefix={'£'}
              renderText={value => (
              <TextInput
                keyboardType = "numeric"
                selectionColor={LIGHT_GREEN}
                underlineColorAndroid={
                  isFocused ? LIGHT_GREEN : LIGHT_GRAY
                }
                onFocus={this.handleFocus}
                onBlur={this.handleBlur}
                style={styles.textInput}
                onChangeText={(spending) => this.setState({spending})}
                onEndEditing={() => this.onFireReady()} 
                onSelectionChange={() => this.onFireReady()} 
                value={this.state.spending}
              />
              )}
            />
        </View>
        <View style={styles.h2}>
            <Text style={styles.text}>Savings</Text>
            <Text style={styles.textInput}> {'\u00A3'} {this.state.income - this.state.spending } 
            {' '}({(100 - ((this.state.spending * 100) / this.state.income)).toFixed(1)}{this.state.percentageSymbol}) </Text>
            
          </View>
        </View>

        <View style={styles.MoneyRowText}>
          <View style={styles.h2}>
            <Text style={styles.text}>Inc. Growth</Text> 
            <TextInput  
              keyboardType = "numeric"
              selectionColor={LIGHT_GREEN}
              underlineColorAndroid={
                isFocused ? LIGHT_GREEN : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(incGrowth) => this.setState({incGrowth})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()} 
              value={this.state.incGrowth} 
            /> 
            
          </View>

          <View style={styles.h2}>
            <Text style={styles.text}>Ret. Spending</Text>
            <TextInput    
              keyboardType = "numeric"
              selectionColor={LIGHT_GREEN}
              underlineColorAndroid={
                isFocused ? LIGHT_GREEN : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(retSpending) => this.setState({retSpending})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()}                
              value={this.state.retSpending}
            />
          </View>
          <View style={styles.h2}>
            <Text style={styles.text}>WR Rate</Text>
            <TextInput    
              keyboardType = "numeric"
              selectionColor={LIGHT_GREEN}
              underlineColorAndroid={
                isFocused ? LIGHT_GREEN : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(wrRate) => this.setState({wrRate})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()}               
              value={this.state.wrRate}
            />
          </View>
        </View>

        <View style={styles.MoneyRowText}>
          <View style={styles.h2}>
            <Text style={styles.text}>Inv. Returns</Text>
            <TextInput    
              keyboardType = "numeric"
              selectionColor={LIGHT_GREEN}
              underlineColorAndroid={
                isFocused ? LIGHT_GREEN : LIGHT_GRAY
              }
              onFocus={this.handleFocus}
              onBlur={this.handleBlur}
              style={styles.textInput}
              onChangeText={(invReturns) => this.setState({invReturns})}
              onEndEditing={() => this.onFireReady()} 
              onSelectionChange={() => this.onFireReady()}  
              value={this.state.invReturns}
            />
          </View>

          <View style={styles.h2}>
            <Text style={styles.text}>FIRE #</Text>
            <Text style={styles.textInput}>{ ((this.state.retSpending / this.state.wrRate) * 100).toFixed(0) }
            
            </Text>                  
          </View>
        </View>

        <View style={styles.itemContainer}>
        {
          <FlatList
          style={styles.flatList}
            data={this.state.fireData}
            renderItem={({item}) => <Text style={styles.item}>{" " + item.index} {"  Age:" + item.age}{"     " + this.state.currencySymbol + item.value}</Text>}
            keyExtractor={(item, index) => 'key' + index}
          />
        }
        </View> 
    

      </ScrollView>

      {/* <Content />
        <Footer>
          <FooterTab>
            <Button>
              <Icon name="apps" />
            </Button>
            <Button>
              <Icon name="camera" />
            </Button>
            <Button active>
              <Icon active name="navigate" />
            </Button>
            <Button>
              <Icon name="person" />
            </Button>
          </FooterTab>
        </Footer> */}

      </View>
    );
  }        
}
