import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView } from 'react-native';
import { Configuration, OpenAIApi } from 'openai';

const Openia = () => {
    const [consulta, setConsulta] = useState('');
    const [mensajes, setMensajes] = useState([]);
    const [loading, setLoading] = useState(false);

    const apiKey = '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';
    const configuracion = new Configuration({
        apiKey: apiKey,
    });

    const openai = new OpenAIApi(configuracion);

    const HandleSubmit = () => {
        setLoading(true);

        openai
            .createCompletion({
                model: 'text-davinci-003',
                prompt: consulta,
                temperature: 0.1,
                max_tokens: 150,
            })
            .then((res) => {
                setLoading(false);
                setMensajes([...mensajes, { tipo: 'consulta', texto: consulta }, { tipo: 'respuesta', texto: res?.data?.choices[0]?.text }]);
                setConsulta('');
            })
            .catch((err) => {
                console.log(err, 'Ocurrió un Error');
            });
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.chatContainer}>
                {mensajes.map((mensaje, index) => (
                    <View key={index} style={mensaje.tipo === 'consulta' ? styles.mensajeContainerDerecha : styles.mensajeContainerIzquierda}>
                        <Text style={styles.mensajeTexto}>{mensaje.texto}</Text>
                    </View>
                ))}
            </ScrollView>

            <View style={styles.inputContainer}>
                <TextInput
                    multiline
                    placeholder="Escribe tu mensaje..."
                    value={consulta}
                    onChangeText={(text) => setConsulta(text)}
                    style={styles.input}
                />
                <Button
                    title={loading ? 'Cargando, espera por favor...' : 'Enviar'}
                    onPress={HandleSubmit}
                    color="#00CED1" // Color celeste claro
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'flex-end',
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: 'flex-end',
    },
    mensajeContainerDerecha: {
        alignSelf: 'flex-end',
        backgroundColor: '#90EE90', // Color verde claro
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        maxWidth: '80%',
    },
    mensajeContainerIzquierda: {
        alignSelf: 'flex-start',
        backgroundColor: '#EAB64F', // Color celeste claro
        padding: 10,
        borderRadius: 8,
        marginBottom: 10,
        maxWidth: '80%',
    },
    mensajeTexto: {
        fontSize: 16,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderColor: 'black',
        marginRight: 10,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
});

export default Openia;
