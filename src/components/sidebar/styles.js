import {Platform, Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;


export default {
    view: {
        flex: 1
    },
    drawerCover: {
        alignSelf: 'stretch',
        // resizeMode: 'cover',
        height: deviceHeight / 3.5,
        width: null,
        position: 'relative',
        marginBottom: 10
    },
    drawerImage: {
        position: 'absolute',
        left: (Platform.OS === 'android') ? deviceWidth / 18 : deviceWidth / 16,
        top: (Platform.OS === 'android') ? deviceHeight / 22 : deviceHeight / 16,
        width: deviceWidth * 0.7,
        height: 110,
        resizeMode: 'cover'
    },
    list: {
        marginVertical: 10
    },
    label: {
        fontSize: 16,
        fontWeight: 'normal',
        marginLeft: 0
    }
};
