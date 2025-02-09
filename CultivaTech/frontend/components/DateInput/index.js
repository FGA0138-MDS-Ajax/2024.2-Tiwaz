import React, { useState } from "react";
import { Pressable, StyleSheet, TextInput, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";

const DateInput = ({
  value = undefined,
  setValue,
  placeholder,
}) => {
  const [show, setShow] = useState(false);
  return (  
    <View>
      <Pressable
        testID="date-input-pressable"
        style={styles.inputGroup}
        onPress={() => setShow(true)}
      >
        <Ionicons name="pricetag-outline" size={24} color="#4CAF50" style={styles.icon} />
        <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor="#000"
        editable={false}
        value={value ? new Date(value).toLocaleDateString() : ""}
        />
      </Pressable>

      {show && (
        <DateTimePicker
          testID="date-time-picker"
          value={value ? new Date(value) : new Date()}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            if (event.type === "dismissed") return; 
            setShow(false);
            if (selectedDate) {
              setValue(selectedDate);
            }
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D9D9D9",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});

export default DateInput;
