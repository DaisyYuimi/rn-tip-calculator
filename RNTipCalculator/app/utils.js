import {
  StyleSheet
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 60, 
    padding: 10, 
    backgroundColor: "white" 
  }
});

let routes = {
  CalculatorPage: {
    id: "CalculatorPage",
    title: "Tip Calculator Page",
    labelLeft: "",
    labelRight: "Settings",
    parentPage: null
  },
  SettingPage: {
    id: "SettingPage",
    title: "Settings Page",
    labelLeft: "Cancel",
    labelRight: "Save",
    parentPage: null
  }
}

let currencies = { 
  dong:     { label: "Viet Nam Dong", locale: "en-US", option: { style: 'currency', currency: 'VND' }},
  usdollar: { label: "US Dollar",     locale: "en-US", option: { style: 'currency', currency: 'USD' }},
  euro:     { label: "Euro",          locale: "en-US", option: { style: 'currency', currency: 'EUR' }}
}

let formatNumber = (value, currency) => {
  if (Object.keys(currencies).indexOf(currency) == -1) {
    return 0;
  }

  let locale = currencies[currency].locale;
  let option = currencies[currency].option;
  return value.toLocaleString(locale, option);
}

export default {
  routes: routes,
  currencies: currencies,
  formatNumber: formatNumber,
  styles: styles
}
