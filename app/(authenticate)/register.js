import { StyleSheet, Text, View, SafeAreaView, Image, KeyboardAvoidingView, TextInput, Pressable, Alert } from 'react-native'
import React, { useState } from 'react'
import salesTrackerImage from '../../assets/salesReport.png'
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import axios from 'axios';
import { API_HOST } from '@env'

const register = () => {

    const[name, setName] = useState("")
    const[email, setEmail] = useState("")
    const[password, setPassword] =useState("")
    const router = useRouter();

    // Handle Register form
    const handleRegister = () => {

        const user = {
            name: name,
            email: email,
            password: password
        };
        axios
          .post(`${API_HOST}/register`, user)
          .then((response) => {
            console.log("Se registro exitosamente")
            Alert.alert("Registración exitosa", "Te has registrado exitosamente")
            setName("")
            setEmail("")
            setPassword("")
        }).catch((error) => {
            console.log("Error al registrar el usuario", error)
            Alert.alert("Error en el registro", "Un error ocurrio durante el registro")
        })
    } 

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerStyle}>
        <View style={styles.containerImage}>
            <Image source={salesTrackerImage} style={styles.image}/>
            <Text style={styles.title}>SalesTracker</Text>
        </View>
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: "center"}}>
          <Text style={styles.loginTitle}>Registrate</Text>
        </View>
        {/* Form Inputs */}
        <View style={styles.inputContainer}> 
          {/* Name */}
          <View style={styles.inputFieldName}>
            <Ionicons style={{marginLeft:8}} name="person-sharp" size={24} color="white" />
            <TextInput 
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.textInputStyle}
              placeholder="Ingresa tu nombre"
              placeholderTextColor={"white"}
            />
          </View>
          {/* Email */}
          <View style={styles.inputFieldUsername}>
            <MaterialIcons style={{marginLeft:8}} name="email" size={24} color="white" />
            <TextInput 
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInputStyle}
              placeholder="Ingresa tu email"
              placeholderTextColor={"white"}
            />
          </View>
          {/* Password */}
          <View style={styles.inputFieldPassword}>
            <AntDesign style={{marginLeft:8}} name="lock1" size={24} color="white" />
            <TextInput 
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.textInputStyle}
              placeholder="Ingresa tu contraseña"
              secureTextEntry={true}
              placeholderTextColor={"white"}
            />
          </View>

          <View style={{marginTop:12, flexDirection: "row", alignItems:"center", justifyContent: 'space-between'}}>
            <Text>Mantenerme logeado</Text>

            <Text style={{color: "#007FFF", fontWeight:"500"}}>Olvidé mi Contraseña</Text>
          </View>

          <Pressable style={styles.pressableStyle} onPress={handleRegister}>
            <Text style={styles.pressableTextStyle}>Registrar</Text>
          </Pressable>

          <Pressable onPress={() => router.replace("/login") } style={{marginTop: 12}}>
            <Text style={styles.pressableTextSignUp}>¿Ya tienes una cuenta? Ingresa</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default register

const styles = StyleSheet.create({
    container: {
      flex:1, 
      backgroundColor:"white", 
      alignItems:"center"
    },
    headerStyle: {
      height:200, 
      backgroundColor:"#840032", 
      width: "100%"
    },
    containerImage: {
      justifyContent: "center", alignItems: "center", marginBottom:25
    },
    image: {height: 150, width: 150, resizeMode:"contain"},
    title: {
      textAlign: "center", 
      fontSize: 20, 
      fontFamily: "GillSans-SemiBold",
      color: "#FFFFFF"
    },
    loginTitle: {
      fontSize: 17, fontWeight: "bold", marginTop: 25, color: "#A40303"
    },
    // Form Inputs
    inputContainer: {
      marginTop:20
    },
    inputFieldName: {
      flexDirection:"row", 
      alignItems: "center", 
      gap:5, 
      backgroundColor: "#850033", 
      paddingVertical:5, 
      marginTop:30,
    },
    inputFieldUsername: {
      flexDirection:"row", 
      alignItems: "center", 
      gap:5, 
      backgroundColor: "#850033", 
      paddingVertical:5, 
      marginTop:10
    },
    inputFieldPassword: {
      flexDirection:"row", 
      alignItems: "center", 
      gap:5, 
      backgroundColor: "#850033", 
      paddingVertical:5, 
      marginTop:10,
    },
    textInputStyle: {
      color: "white", 
      marginVertical: 10, 
      width: 300
    },
    pressableStyle: {
      width:200,  
      borderRadius:6, marginLeft:"auto", 
      marginRight:"auto",
      padding: 15,
      marginTop: 40,

      // backgroundColor: "#FF512F",  /* fallback for old browsers */
      // backgroundColor: "-webkit-linear-gradient(to right, #DD2476, #FF512F)",  /* Chrome 10-25, Safari 5.1-6 */
      // backgroundColor: "linear-gradient(to right, #DD2476, #FF512F)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

      backgroundColor: "#ED213A",  /* fallback for old browsers */
      // backgroundColor: "-webkit-linear-gradient(to right, #93291E, #ED213A)",  /* Chrome 10-25, Safari 5.1-6 */
      // backgroundColor: "linear-gradient(to right, #93291E, #ED213A)", /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
    },
    pressableTextStyle: {
      textAlign: "center",
      color: "white",
      fontSize: 16,
      fontWeight: "bold"
    },
    pressableTextSignUp: {
      textAlign: "center", 
      color: "gray",
      fontSize: 16
    }
    
})