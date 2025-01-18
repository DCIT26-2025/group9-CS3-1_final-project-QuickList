import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface TasksProps {
    text: string;
    completed: boolean;
}

const Tasks: React.FC<TasksProps> = ({ text, completed }) => {
    return (
        <View style={styles.item}>
            <View style={styles.itemLeft}>
                <TouchableOpacity style={styles.square}></TouchableOpacity>
                <Text style={[styles.itemText, completed && styles.completedTask]}>
                    {text}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        backgroundColor: "#ffffff",
        padding: 15,
        borderRadius: 12,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 8,
        elevation: 5,
    },
    itemLeft: {
        flexDirection: "row",
        alignItems: "center",
    },
    square: {
        width: 24,
        height: 24,
        backgroundColor: "#6200EE",
        opacity: 0.6,
        borderRadius: 5,
        marginRight: 15,
    },
    itemText: {
        fontSize: 18,
        color: "#333",
        maxWidth: "80%",
        fontWeight: "500",
        letterSpacing: 0.5,
    },
    completedTask: {
        textDecorationLine: "line-through",
        color: "#B0B0B0",
    },
});

export default Tasks;
