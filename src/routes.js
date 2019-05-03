import { createStackNavigator, createAppContainer } from 'react-navigation';
import Main from './pages/main';

const MainNavigator = createStackNavigator({
    Main
});

export default (App = createAppContainer(MainNavigator));