import { Dimensions, PixelRatio, Platform } from 'react-native';

const dim = Dimensions.get('window');

export function getScale() {
    switch (PixelRatio.get()) {
        case 1:
            return 2;
        case 1.5:
            return 4 / 3;
        case 2:
            if (dim.width <= 320) {
                return 1;
            } else if (dim.width > 320 && dim.width <= 384) {
                return 1.1
            } else if (dim.width > 384 && dim.width <= 480) {
                return 1.1
            } else if (dim.width > 480 && dim.width <= 640) {
                return 1.2
            } else {
                return 1.3
            }
        case 2.5:
            if (dim.width <= 320) {
                return 1;
            } else if (dim.width > 320 && dim.width <= 384) {
                return 1.1
            } else if (dim.width > 384 && dim.width <= 480) {
                return 1.1
            } else if (dim.width > 480 && dim.width <= 640) {
                return 1.2
            } else {
                return 1.3
            }
        case 3:
            if (dim.width <= 320) {
                return 1;
            } else if (dim.width > 320 && dim.width <= 384) {
                if (dim.height < 700) {
                    return 1.05
                } else {
                    return 1.15
                }
            } else if (dim.width > 384 && dim.width <= 480) {
                return 1.25
            } else if (dim.width > 480 && dim.width <= 640) {
                return 1.2
            } else {
                return 1.3
            }
        case 3.5:
            if (dim.width <= 320) {
                return 1;
            } else if (dim.width > 320 && dim.width <= 384) {
                return 1.1
            } else if (dim.width > 384 && dim.width <= 480) {
                return 1.1
            } else if (dim.width > 480 && dim.width <= 640) {
                return 1.2
            } else {
                return 1.3
            }
        case 4:
            if (dim.width <= 320) {
                return 1;
            } else if (dim.width > 320 && dim.width <= 384) {
                return 1.1
            } else if (dim.width > 384 && dim.width <= 480) {
                return 1.1
            } else if (dim.width > 480 && dim.width <= 640) {
                return 1.2
            } else {
                return 1.3
            }
        default:
            return 1.1
    }
}

const scale = () => {
    return Platform.OS === 'ios' ? 1 : getScale();
}

export default scale();