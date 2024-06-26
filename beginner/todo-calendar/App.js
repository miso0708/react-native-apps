import { useEffect, useRef } from 'react';
import { FlatList, StyleSheet, Text, View, Image, KeyboardAvoidingView, Platform, Keyboard, Pressable, Alert } from 'react-native';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import dayjs from 'dayjs';
import { Ionicons } from '@expo/vector-icons';

import { useCalendar } from './src/hook/use-calendar';
import { useTodoList } from './src/hook/use-todo-list';
import { getCalendarColumns, getDayColor, getDayText, statusBarHeight, ITEM_WIDTH, bottomSpace } from './src/util';
import back from './assets/product-background.jpg'
import Calendar from './src/Calendar';
import Margin from './src/Margin'
import AddTodoInput from './src/AddTodoInput';


export default function App() {
  const now = dayjs();
  const {
    selectedDate,
    setSelectedDate,
    isDatePickerVisible,
    showDatePicker,
    hideDatePicker,
    handleConfirm,
    subtract1Month,
    add1Month,
  } = useCalendar(now);
  const {
    todoList,
    filteredTodoList,
    input,
    setInput,
    addTodo,
    removeTodo,
    toggleTodo,
    resetInput,
  } = useTodoList(selectedDate);
  
  const columns = getCalendarColumns(selectedDate);

  const flatListRef = useRef(null);

  const onPressLeftArrow = subtract1Month
  const onPressHeaderDate = showDatePicker
  const onPressRightArrow = add1Month
  const onPressDate = setSelectedDate

  const ListHeaderComponent = () => (
    <View>
      <Calendar
        columns={columns}
        todoList={todoList}
        selectedDate={selectedDate}
        onPressLeftArrow={onPressLeftArrow}
        onPressHeaderDate={onPressHeaderDate}
        onPressRightArrow={onPressRightArrow}
        onPressDate={onPressDate}
      />
      <Margin height={15} />
      <View style={{
        width: 4, 
        height: 4, 
        borderRadius: 4 / 2,
        backgroundColor: "#a3a3a3",
        alignSelf: "center"
      }} />
      <Margin height={15} />
    </View>
  )

  const renderItem = ({ item: todo }) => {
    const isSuccess = todo.isSuccess;
    const onPress = () => toggleTodo(todo.id);
    const onLongPress = () => {
      Alert.alert("삭제하시겠습니까?", "", [
        {
          style: "cancel",
          text: "아니요"
        },
        {
          text: "네",
          onPress: () => removeTodo(todo.id),
        }
      ])
    };
    return (
      <Pressable
        onPress={onPress}
        onLongPress={onLongPress}
        style={{ 
        flexDirection: "row",
        width: ITEM_WIDTH, 
        alignSelf: "center",
        paddingVertical: 10,
        paddingHorizontal: 5,
        borderBottomWidth: 0.2,
        borderColor: "#a6a6a6",
      }}>
        <Text style={{ flex: 1, fontSize: 14, color: "#595959" }}>{todo.content}</Text>
        <Ionicons 
          name='checkmark' 
          size={17} 
          color={isSuccess ? "#595959" : "#bfbfbf"}
        />
      </Pressable>
    )
  }

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 300);
  }
  const onPressAdd = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }
  const onSubmitEditing = () => {
    addTodo();
    resetInput();
    scrollToEnd();
  }
  const onFocus = () => {
    scrollToEnd();
  };

  return (
    <Pressable 
      style={styles.container} 
      onPress={Keyboard.dismiss}
    >
      <Image 
        source={back}
        style={{
          width:"100%",
          height: "100%",
          position: "absolute",
        }}
      />
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <>
          <FlatList
            ref={flatListRef}
            data={filteredTodoList}
            contentContainerStyle={{ paddingTop: statusBarHeight + 30 }}
            ListHeaderComponent={ListHeaderComponent}
            renderItem={renderItem}
            showsVerticalScrollIndicator={false}
          />
          <AddTodoInput 
            value={input}
            onChangeText={setInput}
            placeholder={`${dayjs(selectedDate).format('M.D')}에 추가할 ToDo`}
            onPressAdd={onPressAdd}
            onSubmitEditing={onSubmitEditing}
            onFocus={onFocus}
          />
        </>
      </KeyboardAvoidingView>
      <Margin height={bottomSpace}/>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
