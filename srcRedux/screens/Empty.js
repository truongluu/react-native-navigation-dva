import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
    SafeAreaView,
    Text,
    StyleSheet,
    Button,
} from 'react-native';
import { connect } from 'react-redux';

const Empty = ({ dispatch, product: { counter } }) => {

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.text}>Just an Empty Screen 🤷‍♂️</Text>
            <Text style={styles.text}>Selected subreddit {counter}</Text>
            <Button onPress={() => dispatch({type: 'product/incr'})} title="Incr" />
            <Icon name={'react'} size={100} />
        </SafeAreaView>
    );
};

Empty.options = {
    topBar: {
        visible: true,
        title: {
            text: 'Redux App 1',
        },
        rightButtons: [{
            id: 'hi_button_id',
            text: 'Hi',
        }],
    },
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 26,
        margin: 16,
        textAlign: 'center',
    },
});

export default connect(({ product }) => ({ product }))(Empty);
