# Kakao-Friend-List Clone Coding
## 프로젝트 소개
안드로이드와 IOS 플렛폼들의 UI가 실제로 오류없이 구현되는지 확인하기 위해 프로젝트를 제작했습니다.


## 중요 개념
* SafeAreaView: 폰 화면의 상단바와 홈 인디케이터 부분을 제외한 안전한 부분에서 컴포넌트를 그리는 방법
* useState Hook을 사용해 친구 리스트를 보여주는 로직 구현
* 친구 리스트의 필요한 프로필은 내 프로필과 똑같은 컴포넌트를 사용함. 따라서 재사용이 가능한 컴포넌트에 대해 보여줌
* isMe를 이용하여 Font size와 Image Size 등을 제어
* 화면의 아이콘 크기만큼 터치 되는 것이 아닌 조금 더 넓은 영역이 터치 가능하도록 구현
* ScrollView: 데이터의 양이 많지 않고 고정적일 때 사용
* FlatList: 많은 데이터를 렌더링을 할 때 적절
* 화면을 보여지는 부분만 렌더링하므로 ScrollView보다 FlatList가 더 좋은 성능을 보여줌
* 한 플랫폼만 여러 기능을 구현을 하다보면 다른 플랫폼에서 오류날 가능성이 높고 추적하기 어렵기 떄문에 어떠한 기능을 구현할시 각각의 플랫폼을 확인하는 것이 중요 


## 완성 프로젝트 화면
<img src="https://github.com/miso0708/react-native-apps/assets/105254224/02581c2e-7a9d-4251-b432-089f00568e34" width="200" height="500"/>
<img src="https://github.com/miso0708/react-native-apps/assets/105254224/c8379614-cca6-467b-be3f-3fafad0dd81b" width="200" height="500"/>
