import React, { useCallback } from 'react';
import { Navigation } from 'react-native-navigation';
import { useNavigationButtonPress } from 'react-native-navigation-hooks';
import { connect } from 'react-redux';
import Item from '../components/listItem';
import SubredditInput from '../components/subredditInput';
import { LAND } from '../screens';
import {
    SafeAreaView,
    FlatList,
    KeyboardAvoidingView,
    Dimensions,
    Platform,
    Alert,
} from 'react-native';



const Home = ({
    componentId,
    subeddits,
    dispatch
}) => {
    console.log('subeddits', subeddits)
    const onSelectSubreddit = useCallback(
        (sr) => dispatch(selectSubreddit(sr)),
        [dispatch],
    );
    const onDeleteSubreddit = useCallback(
        (sr) => dispatch(deleteSubreddit(sr)),
        [dispatch],
    );
    const onAddSubreddit = useCallback(
        (sr) => dispatch({
            type: 'subeddits/addSubReddit',
            subreddit: sr
        }),
        [dispatch],
    );
    // ===========

    const listRef = React.useRef(null);
    const [keyboardVerticalOffset, setKeyboardVerticalOffset] = React.useState(0);

    // equivalent to componentDidMount
    // see - https://stackoverflow.com/questions/53945763/componentdidmount-equivalent-on-a-react-function-hooks-component
    // and - https://stackoverflow.com/questions/53120972/how-to-call-loading-function-with-react-useeffect-only-once
    React.useEffect(() => {
        Dimensions.addEventListener('change', () => {
            getStatusBarHeight();
        });

        getStatusBarHeight();

        // equivalent to componentWillUnmount
        // return () => {};
    }, [componentId]);

    useNavigationButtonPress((_) => {
        Alert.alert('This is just a simple button');
    }, componentId, 'hi_button_id');

    const getStatusBarHeight = async () => {
        const navConstants = await Navigation.constants();

        // for more info - https://stackoverflow.com/a/48759750
        if (Platform.OS === 'ios') {
            setKeyboardVerticalOffset(navConstants.statusBarHeight + navConstants.topBarHeight);
        }
    };

    const onItemPressed = (subreddit) => {
        // onSelectSubreddit(subreddit);

        Navigation.push(componentId, {
            component: {
                name: LAND,
                passProps: {
                    title: subreddit,
                },
            },
        });
    };

    const onItemLongPressed = (subreddit) => {
        Alert.alert(
            'Action required',
            `Would you like to delete ${subreddit} subreddit?`,
            [{
                text: 'Yes',
                onPress: () => onDeleteSubreddit(subreddit),
            }, {
                text: 'Cancel',
                style: 'cancel',
            }],
        );
    };

    const onAddSubredditPressed = (subreddit) => {
        onAddSubreddit(subreddit);
    };

    const listScrollToBottom = () =>
        listRef.current && listRef.current.scrollToEnd({animated: true});

    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView
                style={{flex: 1}}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
                keyboardVerticalOffset={keyboardVerticalOffset}
            >
                <FlatList
                    ref={listRef}
                    onContentSizeChange={listScrollToBottom}
                    onLayout={listScrollToBottom}
                    refreshControl
                    refreshing={true}
                    data={subeddits}
                    keyExtractor={(item) => item.title }
                    renderItem={({ item }) =>
                        <Item
                            data={item.title}
                            title={item.title}
                            textSize={22}
                            onPressed={onItemPressed}
                            onLongPressed={onItemLongPressed}
                        />
                    }
                />

                <SubredditInput
                    onAddSubreddit={onAddSubredditPressed}
                />
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const HomeConnect = connect(({subeddits}) => ({subeddits: subeddits.list }))(Home);

HomeConnect.options = () => ({
    topBar: {
        visible: true,
        title: {
            text: 'Subreddits',
        },
        rightButtons: [{
            id: 'hi_button_id',
            text: 'Hi',
        }],
    },
});

export default HomeConnect;
