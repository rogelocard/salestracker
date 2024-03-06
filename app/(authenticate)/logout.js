import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const logout = () => {

    useEffect(() => {
        const performLogout = async () => {
            await AsyncStorage.removeItem('authToken'); // Deletes the token from AsyncStorage
            router.replace("/(authenticate)/login") // Redirect the user to the login page
        };

        performLogout();
    }, []);

  return null; // It won't render anything
}

export default logout

const styles = StyleSheet.create({})