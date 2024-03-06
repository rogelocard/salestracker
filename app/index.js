import { Redirect } from "expo-router";
import React from 'react'
import { View, Text, StyleSheet } from "react-native";

const index = () => {
    return (
        <Redirect href="/(authenticate)/login"/> 
    )
}

export default index;

const styles = StyleSheet.create({})