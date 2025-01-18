import React, { useState } from "react";
import {
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    TextInput,
    ScrollView,
} from "react-native";
import Tasks from "@/components/Tasks"; 

export default function App() {
    const [task, setTask] = useState<string>(""); 
    const [taskItems, setTaskItems] = useState<{ text: string, completed: boolean }[]>([]);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [editingIndex, setEditingIndex] = useState<number | null>(null);

    const handleAddTask = () => {
        if (task.trim()) {
            if (isEditing && editingIndex !== null) {
                const updatedTasks = [...taskItems];
                updatedTasks[editingIndex].text = task;
                setTaskItems(updatedTasks);
                setIsEditing(false); 
                setEditingIndex(null);
            } else {
                const newTask = { text: task, completed: false };
                setTaskItems([...taskItems, newTask]);
            }
            setTask(""); 
            Keyboard.dismiss(); 
        }
    };

    const startEditing = (index: number) => {
        const taskToEdit = taskItems[index];
        if (taskToEdit) {
            setTask(taskToEdit.text);
            setIsEditing(true); 
            setEditingIndex(index); 
        }
    };

    const toggleTaskCompletion = (index: number) => {
        const updatedTasks = [...taskItems];
        updatedTasks[index].completed = !updatedTasks[index].completed;
        setTaskItems(updatedTasks);
    };

    const deleteTask = (index: number) => {
        const updatedTasks = taskItems.filter((_, i) => i !== index);
        setTaskItems(updatedTasks);
    };

    return (
        <View style={styles.container}>
            <View style={styles.tasksWrapper}>
                <Text style={styles.sectionTitle}>QuickList</Text>
                <Text style={styles.sectionSubtitle}>What’s Next Today:</Text>

                <ScrollView style={styles.items} keyboardShouldPersistTaps="handled">
                    {taskItems.map((item, index) => (
                        <View key={index} style={styles.taskContainer}>
                            <TouchableOpacity onPress={() => toggleTaskCompletion(index)}>
                                <Tasks text={item.text} completed={item.completed} />
                            </TouchableOpacity>

                            <View style={styles.buttonsWrapper}>
                                <TouchableOpacity onPress={() => startEditing(index)} style={styles.editButton}>
                                    <Text style={styles.editText}>✏️</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => deleteTask(index)} style={styles.deleteButton}>
                                    <Text style={styles.deleteText}>🗑️</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                </ScrollView>
            </View>

            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.writeTaskWrapper}>
                <TextInput
                    style={styles.input}
                    placeholder={isEditing ? "Edit your task" : "Write a Task"}
                    value={task}
                    onChangeText={setTask}
                />
                <TouchableOpacity onPress={handleAddTask}>
                    <View style={styles.addWrapper}>
                        <Text style={styles.addText}>{isEditing ? "✔️" : "+"}</Text>
                    </View>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F1F2F6",
    },
    tasksWrapper: {
        paddingTop: 80,
        paddingHorizontal: 20,
        backgroundColor: "transparent",
    },
    sectionTitle: {
        fontSize: 40,
        fontWeight: "bold",
        textAlign: "center",
        color: "#4F4F4F",
    },
    sectionSubtitle: {
        fontSize: 18,
        fontWeight: "bold",
        marginTop: 20,
        color: "#4F4F4F",
        textAlign: "center",
    },
    items: {
        marginTop: 30,
    },
    taskContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 20,
        borderRadius: 10,
        backgroundColor: "#ffffff",
        padding: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 5,
        width: "100%", 
    },
    buttonsWrapper: {
        flexDirection: "row", 
        alignItems: "center",
    },
    editButton: {
        padding: 10,
        backgroundColor: "#e7e7e7",
        borderRadius: 10,
        marginLeft: 10,
    },
    editText: {
        fontSize: 20,
        color: "#333",
    },
    deleteButton: {
        padding: 10,
        backgroundColor: "#f8d7da",
        borderRadius: 10,
        marginLeft: 10,
    },
    deleteText: {
        fontSize: 20,
        color: "#721c24",
    },
    writeTaskWrapper: {
        position: "absolute",
        bottom: 60,
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },
    input: {
        paddingVertical: 15,
        paddingHorizontal: 20,
        backgroundColor: "#ffffff",
        borderRadius: 50,
        borderColor: "#C0C0C0",
        borderWidth: 1,
        width: 250,
        fontSize: 16,
    },
    addWrapper: {
        width: 60,
        height: 60,
        backgroundColor: "#6200EE",
        borderRadius: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    addText: {
        fontSize: 32,
        color: "#fff",
        fontWeight: "bold",
    },
});
