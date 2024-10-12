import { ListItem } from "@/components/List/ListItem";
import { ThemedText } from "@/components/Themed/ThemedText";
import { View } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import { useTheme } from "@/hook/useTheme";
import { Fragment, useState } from "react";
import Dialog from "react-native-dialog";
import { useUpdateUserMutation } from "@/api/User";
import { useAuthStore } from "@/store/AuthStore";
import { UserDTO } from "@/api/User";

type BottomTabProfileEditListItemProps = {
  title: string;
  value: string | undefined;
  dtoKey: keyof UserDTO;
};

export const BottomTabProfileEditListItem = ({
  title,
  value,
  dtoKey,
}: BottomTabProfileEditListItemProps) => {
  const { user } = useAuthStore();
  const { colors } = useTheme();
  const { mutateAsync: updateUser } = useUpdateUserMutation();

  const [visible, setVisible] = useState(false);
  const [inputValue, setInputValue] = useState(value);

  const showDialog = () => {
    setVisible(true);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const handleOk = async () => {
    let body = {
      id: user?.id!,
      email: user?.email!,
      name: user?.name!,
    };

    body = { ...body, [dtoKey]: inputValue };
    await updateUser(body);
    setVisible(false);
  };

  return (
    <Fragment>
      <ListItem
        onPress={showDialog}
        className="flex-row justify-between items-center"
      >
        <View className="grid gap-1">
          <ThemedText className="text-sm">{title}</ThemedText>
          <ThemedText className="text-xs">{value}</ThemedText>
        </View>
        <FontAwesome6 name="edit" size={22} color={colors?.primary} />
      </ListItem>

      <Dialog.Container visible={visible}>
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Input
          value={inputValue}
          onChangeText={(text) => setInputValue(text)}
        />
        <Dialog.Button label="İptal" onPress={handleCancel} />
        <Dialog.Button label="Tamam" onPress={handleOk} />
      </Dialog.Container>
    </Fragment>
  );
};
