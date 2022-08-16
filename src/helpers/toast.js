import Toast from 'react-native-simple-toast';
const duration = 5;

const ShowMessage = (message) => {
    if (message) {
        Toast.showWithGravity(message, duration, Toast.TOP);
    }
};

export default ShowMessage;