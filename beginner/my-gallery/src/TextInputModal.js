import { KeyboardAvoidingView, Modal, TextInput, Pressable } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"

export default ({ modalVisible, albumTitle, setAlbumTitle, onSubmitEditing, onPressBackdrop }) => {
	return (
		<KeyboardAvoidingView 
			behavior={Platform.OS === "ios" ? "padding" : "height"}
			style={{ flex: 1 }}>
			<Modal
			animationType="fade"
			transparent={true}
			visible={modalVisible}>
				<Pressable onPress={onPressBackdrop} style={{ flex: 1 }}>
					<SafeAreaView style={{ flex: 1, width: "100%", position: "absolute", bottom: 0 }}>
						<TextInput 
							placeholder="앨범명을 입력해주세요."
							style={{ width: "100%", padding: 10, borderWidth: 0.5, borderColor: "lightgrey" }} 
							value={albumTitle}
							onChangeText={setAlbumTitle}
							onSubmitEditing={onSubmitEditing}
							autoFocus={true}
						/>
					</SafeAreaView>
				</Pressable>
			</Modal>
		</KeyboardAvoidingView>
	)
}