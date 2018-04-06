import {StyleSheet, Dimensions, Platform} from 'react-native';

const IS_IOS = Platform.OS === 'ios';
const { width: deviceWidth, height: deviceHeight } = Dimensions.get('window');

function wp(percentage) {
    const value = (percentage * deviceWidth) / 100;
    return Math.round(value);
}

const entryBorderRadius = 8;
const slideHeight = deviceHeight * 0.75;
const slideWidth = wp(75);
const itemHorizontalMargin = wp(2);


export const sliderWidth = deviceWidth;
export const itemWidth = slideWidth + (itemHorizontalMargin * 2);

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
        marginTop: 15,
        marginBottom: 25
    }
};

export const layoutStyles = StyleSheet.create({
    slideInnerContainer: {
        flex: 1,
        width: itemWidth,
        height: slideHeight,
        paddingHorizontal: itemHorizontalMargin,
        paddingBottom: 18 // needed for shadow
    },
    shadow: {
        position: 'absolute',
        top: 0,
        left: itemHorizontalMargin,
        right: itemHorizontalMargin,
        bottom: 18,
        elevation: 2,
        shadowColor: '#1a1917',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 10,
        borderRadius: entryBorderRadius
    },
    imageContainer: {
        flex: 1,
        marginBottom: IS_IOS ? 0 : -1, // Prevent a random Android rendering issue
        backgroundColor: 'white',
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    image: {
        width: itemWidth - (itemHorizontalMargin * 2),
        height: slideHeight * 0.48,
        overflow: 'hidden',
        resizeMode: 'cover',
        borderRadius: IS_IOS ? entryBorderRadius : 0,
        borderTopLeftRadius: entryBorderRadius,
        borderTopRightRadius: entryBorderRadius
    },
    // image's border radius is buggy on iOS; let's hack it!
    radiusMask: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: entryBorderRadius,
        backgroundColor: 'transparent'
    },
    textContainer: {
        justifyContent: 'center',
        paddingTop: 14,
        paddingBottom: 18,
        paddingHorizontal: 14,
        backgroundColor: 'white',
        borderBottomLeftRadius: entryBorderRadius,
        borderBottomRightRadius: entryBorderRadius
    },
    title: {
        color: '#1a1917',
        fontSize: 20,
        fontFamily: 'Titillium',
        textAlign: 'center'
    },
    subtitle: {
        // height: slideHeight * 0.30,
        marginTop: 6,
        color: '#323c46',
        fontSize: 16,
        fontStyle: 'normal',
        fontFamily: 'Titillium',
        textAlign: 'center'
    },
    slider: {
        marginTop: 15,
        overflow: 'visible' // for custom animations
    },
    sliderContentContainer: {
        paddingVertical: 10 // for custom animation
    }
});
