import { Dimensions, StyleSheet } from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

export default StyleSheet.create({
  safeView: {
    flex: 1,
    backgroundColor: '#f1f5f8'
  },
  view: {
    paddingTop: 20,
    backgroundColor: '#ffffff'
  },
  listView: {
    backgroundColor: '#f1f5f8'
  },
  drawerLogo: {
    width: deviceWidth * 0.80,
    height: deviceHeight * 0.25,
    resizeMode: 'contain',
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  drawerCover: {
    width: '100%',
    height: 20,
    resizeMode: 'contain',
    marginTop: 10
  },
  list: {
    marginVertical: 10
  },
  label: {
    color: '#323c46',
    fontSize: 18,
    fontFamily: 'Titillium',
    fontWeight: 'normal',
    marginLeft: 5
  }
});
