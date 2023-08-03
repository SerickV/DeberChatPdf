import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet, Text, FlatList } from 'react-native';


const UserForm = () => {
    const [name, setName] = useState('');
    const [lastName, setLastName] = useState('');
    const [message, setMessage] = useState('');

    const addUser = () => {
        setMessage(`Hola ${name} ${lastName} ha sido agregado`);
        setName('');
        setLastName('');
    };

    return (
        <View style={styles.container}>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Nombre</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su nombre"
                        value={name}
                        onChangeText={(text) => setName(text)}
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.inputLabel}>Apellido</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Ingrese su apellido"
                        value={lastName}
                        onChangeText={(text) => setLastName(text)}
                    />
                </View>
                <Button title="Agregar" onPress={addUser} />
            </View>
            {message !== '' && <Text style={styles.message}>{message}</Text>}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    formContainer: {
        marginBottom: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    inputLabel: {
        backgroundColor: '#FC5E3D',
        borderColor: 'black',
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 4,
        fontSize: 16,
        fontWeight: 'bold',
        width: 80,
        borderRadius: 20,
    },
    input: {
        flex: 1,
        borderWidth: 1,
        borderColor: 'black',
        padding: 8,
        borderRadius: 4,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    message: {
        marginTop: 16,
        fontSize: 18,
        fontWeight: 'bold',
    },
});


export default UserForm;
