import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';

class HomeView extends Component {
    constructor(props) {
        super(props);
    }
    goBack = () => {
        this.props.navigation.goBack();
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>Home</Text>
                <TouchableOpacity onPress={this.goBack}>
                    <Text>Go Back</Text>
                </TouchableOpacity>
            </View>
        );
    }
}
HomeView.propTypes = {
    onHome: PropTypes.func
};

export default HomeView;
