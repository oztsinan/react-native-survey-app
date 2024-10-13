# React Native Survey App - Baykar Case

![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/cover.png?raw=true)

Bu projede **Expo** kullandım çünkü React Native'in resmi sayfasında artık Expo ile proje oluşturmak öneriliyor.

State yönetimi için ise **Zustand** tercih ettim, çünkü Redux'a ihtiyaç duymadan basit ve modern bir state yönetimi sağlayabildim.

Ayrıca stil yönetimi için en güncel çözüm olduğu için **NativeWind** kullandım. Aslında **React Native Unistyles** kullanmayı tercih ederdim, ancak bu proje için Expo'nun prebuild mantığını kullanmak istemediğimden **NativeWind** daha uygun oldu.

## 🚀 Teknolojiler ve Paketler

- 🧑‍💻 **Expo SDK51** kullanıldı
- 🌍 **i18next** ile çoklu dil desteği sağlandı
- 🎨 **NativeWind** ile stil yönetimi yapıldı
- 🔥 İstekler için **TanStack Query** kullanıldı
- 📋 Formlarda **React Hook Form** ve **Zod Validation** ile doğrulama yapıldı
- ⚙️ State yönetimi için **Zustand** kullanıldı
- 🔑 **Platzi Fake Store API** kullanılarak kimlik doğrulama işlemleri gerçekleştirildi
- 📱 **Zustand Persist** ve **AsyncStorage** kullanarak anket yanıtları saklandı

## 📋 Anket Cevaplama ve Depolama

Anket sonuçlarının herhangi bir API endpoint'i olmadığından, bir **fake API isteği** gibi davranan bir metod yazıldı.

Bu metod, **AsyncStorage** içinde her bir anketin **survey id**'lerine göre sonuçları işleyen bir algoritma içeriyor.

Bu sayede, kullanıcıların anket cevapları **Zustand Persist** kullanılarak cihazın yerel depolama alanında saklanmaktadır.

Böylece uygulama kapansa bile anket cevapları korunur ve tekrar erişilebilir.

## 👨🏻‍💻 Auth View

| ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/login.png?raw=true) | ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/register.png?raw=true) | ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/register-permissions.png?raw=true) |
| -------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |

Kimlik doğrulama işlemleri için **Platzi Fake Store API** kullanıldı. Bu API ile kullanıcıların oturum açma ve kayıt işlemleri sağlanmaktadır.

## 📱 Tab View

| ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/survey-list.png?raw=true) | ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/home.png?raw=true)         |
| -------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/profile.png?raw=true)     | ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/profile-edit.png?raw=true) |

## 📋 Survey Types

| ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/survey-question-likert.png?raw=true) | ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/survey-question-single-select.png?raw=true) | ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/survey-question-slider.png?raw=true) |
| ------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |

## 🎉 Survey Result

| ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/survey-completed.png?raw=true) | ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/survey-timeout.png?raw=true) | ![](https://github.com/oztsinan/react-native-survey-app/blob/master/screenshot/survey-result.png?raw=true) |
| ------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
