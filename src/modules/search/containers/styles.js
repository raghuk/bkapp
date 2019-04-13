import { Dimensions } from 'react-native';

const { height } = Dimensions.get('window');

export default {
  listView: {
    flex: 1
  },
  content: {
    flex: 1,
    backgroundColor: '#f9f9f9'
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.75,
    backgroundColor: '#fcfcfc'
  },
  searchContainer: {
    backgroundColor: '#706993',
    borderTopColor: '#706993',
    borderBottomColor: '#706993'
  },
  searchInput: {
    color: '#323c46',
    fontSize: 16,
    fontFamily: 'Titillium',
    backgroundColor: '#fdfdfd'
  },
  listItem: {
    backgroundColor: '#fdfdfd',
    borderBottomWidth: 2,
    borderBottomColor: '#706993'
  },
  notice: {
    color: '#323c46',
    fontSize: 18,
    fontFamily: 'Titillium',
    textAlign: 'center',
    padding: 20
  },
  title: {
    fontSize: 16,
    fontFamily: 'Titillium',
    textAlign: 'center'
  },
  searchView: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 20,
    paddingRight: 20,
    backgroundColor: '#f9f9f9'
  },
  pickerView: {
    paddingLeft: 10,
    paddingRight: 10
  },
  picker: {
    backgroundColor: '#e2e2e2'
  },
  label: {
    color: '#323c46',
    fontSize: 16,
    fontFamily: 'Titillium',
    marginTop: 25,
    marginBottom: 10
  },
  mapView: {
    alignSelf: 'stretch',
    height: height / 2.2
  },
  info: {
    color: '#323c46',
    fontSize: 16,
    fontFamily: 'Titillium',
    marginTop: 15,
    paddingLeft: 20,
    paddingRight: 20
  },
  contacts: {
    marginTop: 10,
    marginBottom: 15
  },
  phone: {
    color: '#323c46',
    fontSize: 16,
    fontFamily: 'Titillium',
    marginTop: 5,
    paddingLeft: 20,
    paddingRight: 20
  }
};
