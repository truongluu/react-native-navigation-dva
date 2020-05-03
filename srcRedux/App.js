import React from 'react';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import { Navigation } from 'react-native-navigation';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import productModel from './models/product';
import subRedditModel from './models/subreddit';
import { EMPTY, HOME } from './screens';
import EmptyScreen from './screens/Empty';
import HomeScreen from './screens/Home';
import dva from './utils/dva';


const app = dva({
    initialState: {},
    models: [
      productModel,
      subRedditModel
    ],
    onError(e) {
      console.log('onError', e)
    },
  });

const Screens = new Map();

Screens.set(HOME, app.start(HomeScreen));
Screens.set(EMPTY, app.start(EmptyScreen));

// Register screens
Screens.forEach((C, key) => {
    Navigation.registerComponent(
        key,
        () => gestureHandlerRootHOC(C),
    );
});

// Here some global listeners could be placed
// ...

export const startApp = () => {
    Promise.all([
        FontAwesome5.getImageSource('reddit', 25),
        FontAwesome5.getImageSource('react', 25),
    ]).then(([redditIcon, reactIcon]) => {
        Navigation.setRoot({
            root: {
                bottomTabs: {
                    options: {
                        bottomTabs: {
                            titleDisplayMode: 'alwaysShow',
                        },
                    },
                    children: [{
                        stack: {
                            children: [{
                                component: {
                                    name: HOME ,
                                },
                            }],
                            options: {
                                bottomTab: {
                                    text: 'Subreddits',
                                    icon: redditIcon,
                                },
                            },
                        },
                    }, {
                        stack: {
                            children: [{
                                component: {
                                    name: EMPTY,
                                    options: {
                                        topBar: {
                                            visible: true,
                                            title: {
                                                text: 'Emptiness',
                                            },
                                        },
                                    },
                                },
                            }],
                            options: {
                                bottomTab: {
                                    text: 'Redux App',
                                    icon: reactIcon,
                                },
                            },
                        },
                    }],
                },
            },
        });
    });
};
