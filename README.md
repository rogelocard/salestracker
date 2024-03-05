Endpoint to all fetch salesRecord
api/index.js
line 34-44
```javascript
// Define un endpoint GET en la ruta '/records'
app.get("/records", async (req, res) => {
  try {
    /**
     * Intenta recuperar registros de la base de datos.
     * @returns {Promise<Array>} Una promesa que se resuelve en un array de registros.
     */
    const records = await Records.find();
    // Si la recuperación es exitosa, devuelve los registros con un estado HTTP 200
    res.status(200).json(records);
  } catch (error) {
    // Si ocurre un error durante la recuperación, devuelve un mensaje de error con un estado HTTP 500
    res.status(500).json({ message: "Error fetching records" });
  }
});
```

Este código está escrito en JavaScript y se utiliza en una aplicación de React Native. El código define un endpoint para obtener registros de una base de datos. Si la recuperación de los registros es exitosa, se devuelven con un estado HTTP 200. Si ocurre un error durante la recuperación, se devuelve un mensaje de error con un estado HTTP 500.


------------
app/(tabs)/salesReport/salesRecord.js

Vista Reportes

```javascript
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
    width: "70%", // Añade esta línea
  },
  buttonModal: {
    marginTop: 10, // Añade esta línea
    marginBottom: 10, // Añade esta línea
    backgroundColor: "#840032",
    justifyContent: "center", // Añade esta línea
    alignItems: "center", // Añade esta línea
    width: "90%", // Añade esta línea
    padding: 10, // Añade esta línea
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

```

Este código es un componente de React Native que muestra una lista de botones y un modal. El componente se utiliza para mostrar registros de ventas y permite al usuario interactuar con ellos.

El código utiliza varias bibliotecas y componentes de React Native, como axios para realizar solicitudes HTTP, TouchableOpacity para crear botones interactivos, Modal para mostrar un modal en la pantalla y FontAwesome para mostrar iconos.

El componente también utiliza el estado y el efecto de React para realizar una solicitud HTTP al cargar el componente y almacenar los registros en el estado. Luego, los registros se utilizan para mostrar los botones en la interfaz de usuario.

Cuando se hace clic en un botón, se muestra un modal con información detallada sobre el vuelo y una imagen. El modal también tiene botones para descargar y cerrar.

En resumen, este código sirve para mostrar registros de ventas en una aplicación de React Native y permitir al usuario interactuar con ellos a través de botones y un modal.
