import { useState } from "react";
import { Modal, StyleSheet, View, Text } from "react-native";

export default function ModalDialogue({ visible, children }) {
    return (
        <Modal
            animationType="slide"
            visible={visible}
            transparent
        >
            <View style={styles.modalBackground}>
                <View style={styles.modalContainer}>
                    {children}
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '80%',
        backgroundColor: 'white',
        paddingHorizontal: 30,
        paddingVertical: 40,
        borderRadius: 25,
        elevation: 20,
    }
});