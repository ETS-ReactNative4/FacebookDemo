import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from './styles';
import PropTypes from 'prop-types';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk'
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,

} from 'react-native-google-signin';

class LoginView extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: '',
        };
    }
    navigate = () => {
        this.props.onLogin('username', 'password');
    };
    // login = () => {
    //     LoginManager.logInWithReadPermissions(["public_profile"]).then(
    //         function (result) {
    //             console.log('Response :', JSON.stringify(result))
    //             if (result.isCancelled) {
    //                 console.log("Login cancelled");
    //             } else {
    //                 console.log(
    //                     "Login success with permissions: " +
    //                     result.grantedPermissions.toString()
    //                 );
    //             }
    //         },
    //         function (error) {
    //             console.log("Login fail with error: " + error);
    //         }
    //     );
    // }

    componentDidMount() {
        GoogleSignin.configure({
            //It is mandatory to call this method before attempting to call signIn()
            scopes: ['https://www.googleapis.com/auth/drive.readonly'],
            // Repleace with your webClientId generated from Firebase console
            webClientId:
                '1026880050979-ftft0djagsk911jck3212qn4lhorftdk.apps.googleusercontent.com',
        });
        // this._getCurrentUser();
    }

    _signIn = async () => {
        //Prompts a modal to let the user sign in into your application.
        try {
            await GoogleSignin.hasPlayServices({
                //Check if device has Google Play Services installed.
                //Always resolves to true on iOS.
                showPlayServicesUpdateDialog: true,
            });
            const userInfo = await GoogleSignin.signIn();
            console.log('User Info --> ', userInfo);
            this.setState({ userInfo: userInfo });
        } catch (error) {
            console.log('Message', error.message);
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log('User Cancelled the Login Flow');
            } else if (error.code === statusCodes.IN_PROGRESS) {
                console.log('Signing In');
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log('Play Services Not Available or Outdated');
            } else {
                console.log('Some Other Error Happened');
            }
        }
    };
    _getCurrentUser = async () => {
        //May be called eg. in the componentDidMount of your main component.
        //This method returns the current user
        //if they already signed in and null otherwise.
        try {
            const userInfo = await GoogleSignin.signInSilently();
            this.setState({ userInfo });
            console.log('UserInfo:',userInfo);
        } catch (error) {
            console.error(error);
        }
    };
    _signOut = async () => {
        //Remove user session from the device.
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({ userInfo: null }); // Remove the user from your app's state as well
        } catch (error) {
            console.error(error);
        }
    };
    _revokeAccess = async () => {
        //Remove your application from the user authorized applications.
        try {
            await GoogleSignin.revokeAccess();
            console.log('deleted');
        } catch (error) {
            console.error(error);
        }
    };


    render() {
        return (
            <View style={styles.container}>
                <Text>Login</Text>
                <TouchableOpacity onPress={this.navigate}>
                    <Text>Go to Home</Text>
                </TouchableOpacity>
                {/* <TouchableOpacity 
                style={{paddingVertical:30,}}
                onPress={this.login}>
                    <Text>Custom Login</Text>
                </TouchableOpacity> */}

                <LoginButton
                    onLoginFinished={
                        (error, result) => {
                            console.log('Response :', JSON.stringify(result));
                            console.log('Response :', JSON.stringify(error));

                            if (error) {
                                console.log("login has error: " + result.error);
                            } else if (result.isCancelled) {
                                console.log("login is cancelled.");
                            } else {
                                AccessToken.getCurrentAccessToken().then(
                                    (data) => {
                                        console.log('---', data.accessToken.toString())
                                    }
                                )
                                console.log('Login Successful')
                            }
                        }
                    }
                    onLogoutFinished={() => console.log('logout.')}
                />

                <GoogleSigninButton
                    style={{ width: 312, height: 48, paddingVertical: 10 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this._signIn}
                />
                <GoogleSigninButton
                    style={{ width: 312, height: 48, paddingVertical: 10 }}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Light}
                    onPress={this._signOut}
                />

            </View>
        );
    }
}

LoginView.propTypes = {
    onLogin: PropTypes.func
};

export default LoginView;
