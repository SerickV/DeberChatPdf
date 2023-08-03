import React, {useEffect, useState} from "react";
import {Alert, FlatList, Modal, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Task from "./Task";
import Profile from "./Profile";
const ListComponent = () => {

    const [taskItems, setTaskItems] = useState([])
    const [showProfile, setShowProfile] = useState(false)
    const [task, setTask] = useState(null)

    useEffect(() => {
        fetchData()
    }, [])
    const fetchData= async () => {
        try {
            const response = await fetch("https://api.unsplash.com/photos/?client_id=ZXjOAAdwefwfYGtyhjJmAerkWnGDxNNnEwTlnHkSqk4")
            const jsonData = await response.json()
            setTaskItems(jsonData)
        } catch (e) {
            console.log("error: ", e)
        }
    }

    const ItemList = ({ task, i }) => {
        const getProfile = (task) => {
            setShowProfile(true)
            setTask(task)
        }
        return (
            <View>
                <Text>
                    {i}
                </Text>
                <TouchableOpacity style={styles.perItem} key={i} onPress={() => getProfile(task)}>
                    <Task task={task}/>
                </TouchableOpacity>
            </View>
        )
    }

    const closeProfile = () => {
        Alert.alert("Cerrando")
        setShowProfile(!showProfile)
    }

    return (taskItems && taskItems.length > 0 ?
            <View style={styles.container}>
                <View style={styles.taskWrapper}>
                    <Text style={styles.sectionTitle}>
                        Se listan perfiles
                    </Text>
                    <View style={styles.items}>
                        <FlatList data={taskItems} renderItem={ ({item, i}) => (<ItemList task={item} i={i} />) } >
                        </FlatList>
                    </View>
                </View>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={showProfile}
                    onRequestClose={() => closeProfile }
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>
                                <Profile task={task} closeProfile={closeProfile} />
                            </Text>
                        </View>
                    </View>
                </Modal>
            </View> :
            <View>
                <Text>
                    No hay datos
                </Text>
            </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: "#E8EAED",
        marginTop: 0,
        display: "flex"
    },
    taskWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
        height: 900
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: "bold",
    },
    items: {

    },
    perItem: {

    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 0,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        width: "100%",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center",
        width: "100%"
    }
})
export default ListComponent