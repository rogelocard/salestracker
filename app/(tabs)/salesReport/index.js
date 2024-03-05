import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Image,
} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function App() {
  const records = () => {
    const [records, setRecords] = useState([]);
    useEffect(() => {
      const fetchRecords = async () => {
        try {
          const response = await axios.get("http://localhost:8000/records");
          setRecords(data);
        } catch (error) {
          console.log("Error fetching records", error);
        }
      };
      fetchRecordsData();
    }, []);
  };

  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>Aqui encuentras tus ventas</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="plane" size={20} color="#fff" />
          <Text style={styles.buttonText}>BOG-MIA AV06 24/12/15</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="plane" size={20} color="#fff" />
          <Text style={styles.buttonText}>MIA-BOG AV07 24/12/15</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="plane" size={20} color="#fff" />
          <Text style={styles.buttonText}>BOG-MEX AV72 26/12/15</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <FontAwesome name="plane" size={20} color="#fff" />
          <Text style={styles.buttonText}>MEX-BOG AV73 26/12/15</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Flight: BOG-MIA</Text>
            <Text style={styles.modalText}>Number Flight: 06</Text>
            <Text style={styles.modalText}>Date: 23/03/23</Text>
            <Image
              style={styles.image}
              source={{ uri: "https://picsum.photos/200/200" }}
            />
            <TouchableOpacity
              style={[styles.button, styles.buttonModal]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Descargar</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.buttonModal]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  headerContainer: {
    backgroundColor: "#840032",
    padding: 20,
  },
  header: {
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    fontFamily: "GillSans-SemiBold",
  },
  //Botones
  buttonContainer: {
    padding: 20,
    alignItems: "center",
  },
  button: {
    flexDirection: "row",
    width: "100%",
    backgroundColor: "#040032",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 5,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    marginLeft: 10,
  },
  // Modal
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: "70%",
  },
  buttonModal: {
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: "#840032",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    padding: 10,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  image: {
    width: 100,
    height: 100,
  },
});
