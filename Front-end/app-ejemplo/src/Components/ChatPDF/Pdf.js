import React, { useState } from 'react';
import { Platform, Button, View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import * as DocumentPicker from 'expo-document-picker';
import axios from 'axios';

const Pdf = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [inputText, setInputText] = useState("");
    const [outputText, setOutputText] = useState("");

    const pickDocument = async () => {
        if (Platform.OS === 'web') {
            const fileInput = document.createElement('input');
            fileInput.type = 'file';
            fileInput.accept = 'application/pdf';
            fileInput.onchange = () => {
                setSelectedFile(fileInput.files[0]);
            }
            fileInput.click();
        } else {
            let result = await DocumentPicker.getDocumentAsync({});
            if (result.type === 'success') {
                setSelectedFile(result);
                console.log('PDF seleccionado:', result.name);
            } else {
                setSelectedFile(null);
            }
        }
    };

    const askQuestion = async () => {
        const formData = new FormData();

        if (Platform.OS === 'web') {
            formData.append('file', selectedFile);
        } else {
            formData.append('file', {
                uri: selectedFile.uri,
                name: 'my_pdf.pdf',
                type: 'application/pdf'
            });
        }

        // Primero, subir el PDF
        await axios.post('http://localhost:8000/initialize', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        // Luego, hacer una pregunta sobre el PDF
        let response = await axios.post('http://localhost:8000/ask', { question: inputText });
        setOutputText(response.data.answer);
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.buttonContainer} onPress={pickDocument}>
                <Text style={styles.buttonText}>{selectedFile ? "PDF Seleccionado" : "Cargar PDF"}</Text>
            </TouchableOpacity>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={inputText}
                    onChangeText={text => setInputText(text)}
                    placeholder="Ingrese su pregunta aquí"
                    multiline
                />
            </View>
            <TouchableOpacity style={styles.buttonContainer} onPress={askQuestion}>
                <Text style={styles.buttonText}>Hacer pregunta</Text>
            </TouchableOpacity>
            <View style={styles.outputContainer}>
                <Text style={styles.output}>{outputText}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        padding: 10,
        borderWidth: 1,
        borderColor: '#000000',
        alignItems: 'flex-start',
    },
    buttonContainer: {
        backgroundColor: 'blue',
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderRadius: 5,
        marginBottom: 10,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    inputContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        width: '100%',
    },
    input: {
        height: 100,
    },
    outputContainer: {
        marginVertical: 10,
        borderWidth: 1,
        borderColor: "black",
        padding: 10,
        width: '100%',
    },
    output: {
        height: 100,
    },
});

export default Pdf;
