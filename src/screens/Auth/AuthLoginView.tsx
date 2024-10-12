import { FormDescription } from "@/components/Form/FormDescription";
import { FormItem } from "@/components/Form/FormItem";
import { FormLabel } from "@/components/Form/FormLabel";
import { PasswordField } from "@/components/Field/PasswordField";
import { TextField } from "@/components/Field/TextField";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { ThemedText } from "@/components/Themed/ThemedText";
import { Controller, useForm } from "react-hook-form";
import { View } from "react-native";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthLoginMutation } from "@/api/Auth";
import { Dispatch } from "react";
import { AuthScreenRoutes } from "@/constants/AuthScreenRoutes";
import { useTranslation } from "react-i18next";
import { Notifier, NotifierComponents } from "react-native-notifier";

const FormSchema = z.object({
  email: z.string().trim().min(1),
  password: z.string().min(6),
});

type FormValues = z.infer<typeof FormSchema>;

export const AuthLoginView = ({ setIndex }: { setIndex: Dispatch<React.SetStateAction<number>> }) => {
  const { t } = useTranslation("AuthModule");
  const { mutateAsync: login } = useAuthLoginMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      email: "sinanozturkk@icloud.com",
      password: "12345678",
    },
    resolver: zodResolver(FormSchema),
  });

  const onNavigateRegister = () => {
    setIndex(AuthScreenRoutes.REGISTER);
  };

  const onSubmit = async (data: FormValues) => {
    await login(data);

    Notifier.showNotification({
      title: t("successLoginToast.title"),
      description: t("successLoginToast.message"),
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: "success",
      },
    });
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  const renderEmailField = () => {
    return (
      <Controller
        control={form.control}
        name="email"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{t("email")}</FormLabel>
            <TextField
              ref={field.ref}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="....@....com"
              error={fieldState.error?.message}
              returnKeyType="next"
              onSubmitEditing={() => form.setFocus("password")}
            />
            <FormDescription>{t("emailDescription")}</FormDescription>
          </FormItem>
        )}
      />
    );
  };

  const renderPasswordField = () => {
    return (
      <Controller
        control={form.control}
        name="password"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{t("password")}</FormLabel>
            <PasswordField
              ref={field?.ref}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="********"
              error={fieldState.error?.message}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            <FormDescription className="text-right opacity-60">{t("forgotPassword")}</FormDescription>
          </FormItem>
        )}
      />
    );
  };

  return (
    <View className="flex-1 px-16 flex-col justify-between items-center">
      <ThemedText className="text-2xl font-bold my-10">{t("welcome")}</ThemedText>

      <View className="w-full flex flex-col items-center gap-5">
        {renderEmailField()}
        {renderPasswordField()}
      </View>

      <View className="items-center gap-4">
        <ThemedButton isLoading={form.formState.isSubmitting} onPress={handleSubmit} className="px-8">
          {t("login")}
        </ThemedButton>
        <ThemedText className="text-sm">
          {t("notMember")}{" "}
          <ThemedText onPress={onNavigateRegister} className="text-primary">
            {t("createAccount")}
          </ThemedText>
        </ThemedText>
      </View>
    </View>
  );
};
