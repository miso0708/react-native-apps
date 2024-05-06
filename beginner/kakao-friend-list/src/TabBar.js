import { TouchableOpacity, View } from "react-native"
import { Ionicons } from '@expo/vector-icons';
import { getBottomSpace } from "react-native-iphone-x-helper";

const bottomSpace = getBottomSpace();

const TabButton = ({ 
  isSelected, 
  onPress, 
  activeIconName, 
  inactivateIconName,
  isIconFontisto,
  isIconIonicons,
  }) => {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 10,
      }}
      >
      {isIconIonicons && <Ionicons name={isSelected ? activeIconName : inactivateIconName} size={24} color="black" />}
    </TouchableOpacity>
  );
};

export default ({ selectedTabIdx, setSelectedTabIdx }) => {
  return (
    <View style={{ 
      flexDirection: "row", 
      width: "100%", 
      paddingBottom: bottomSpace,
      borderTopWidth: 0.5,
      borderTopColor: "grey"
      }}>
      <TabButton 
        isSelected={selectedTabIdx === 0}
        onPress={() => setSelectedTabIdx(0)}
        activeIconName={"person"}
        inactivateIconName={"person-outline"}
        isIconIonicons
      />
      <TabButton
        isSelected={selectedTabIdx === 1}
        onPress={() => setSelectedTabIdx(1)}
        activeIconName={"chatbubble"}
        inactivateIconName={"chatbubble-outline"}
        isIconIonicons
      />      
      <TabButton 
        isSelected={selectedTabIdx === 2}
        onPress={() => setSelectedTabIdx(2)}
        activeIconName={"pricetag"}
        inactivateIconName={"pricetag-outline"}
        isIconIonicons
      />
      <TabButton
        isSelected={selectedTabIdx === 3}
        onPress={() => setSelectedTabIdx(3)}
        activeIconName={"add-circle"}
        inactivateIconName={"add-circle-outline"}
        isIconIonicons
      />
    </View>
  )
}