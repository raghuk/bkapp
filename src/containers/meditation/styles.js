import {Dimensions} from 'react-native';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

function wp(percentage) {
    const value = (percentage * deviceWidth) / 100;
    return Math.round(value);
}

export const sliderWidth = deviceWidth;
export const itemWidth = wp(75) + (wp(2) * 2);

export const styles = {
    content: {
        flex: 1,
        padding: 15,
        backgroundColor: '#f9f9f9'
    },
    title: {
        color: '#323c46',
        fontSize: 18,
        fontFamily: 'Titillium',
        marginBottom: 10
    },
    info: {
        color: '#323c46',
        fontSize: 16,
        fontFamily: 'Titillium',
        marginBottom: 25
    },
    header: {
        color: '#fff',
        fontSize: 20,
        fontFamily: 'Titillium',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 30
    }
};
