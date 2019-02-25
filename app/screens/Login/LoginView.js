import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk'

class LoginView extends Component {
    navigate = () => {
        this.props.onLogin('username', 'password');
    };
    login = () => {
        LoginManager.logInWithReadPermissions(["public_profile"]).then(
            function (result) {
                if (result.isCancelled) {
                    console.log("Login cancelled");
                } else {
                    console.log(
                        "Login success with permissions: " +
                        result.grantedPermissions.toString()
                    );
                }
            },
            function (error) {
                console.log("Login fail with error: " + error);
            }
        );
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <TouchableOpacity onPress={this.navigate}>
                    <Text>Go to Home</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity onPress={this.login}>
                    <Text>Login</Text>
                </TouchableOpacity> */}

                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        console.log('---',data.accessToken.toString())
                                    }
                                )
                            }
                        }
                    }
                    onLogoutFinished={() => console.log("logout.")}
                />

            </View>
        );
    }
}

LoginView.propTypes = {
    onLogin: PropTypes.func
};

export default LoginView;
