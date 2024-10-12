import { FormDescription } from "@/components/Form/FormDescription";
import { FormItem } from "@/components/Form/FormItem";
import { FormLabel } from "@/components/Form/FormLabel";
import { PasswordField } from "@/components/Field/PasswordField";
import { TextField } from "@/components/Field/TextField";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { ThemedText } from "@/components/Themed/ThemedText";
import { Controller, useForm } from "react-hook-form";
import { ScrollView, View } from "react-native";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch } from "react";
import { AuthScreenRoutes } from "@/constants/AuthScreenRoutes";
import { useCreateUserMutation } from "@/api/User";
import { DatePickerField } from "@/components/Field/DatePickerField";
import { z } from "zod";
import { Notifier, NotifierComponents } from "react-native-notifier";
import { queryClient } from "@/providers/QueryProvider";
import { useTranslation } from "react-i18next";

const FormSchema = z
  .object({
    name: z.string().trim().min(1),
    email: z.string().trim().min(1),
    password: z.string().min(6),
    rePassword: z.string().min(6),
    birthdate: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.password !== data.rePassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Error",
        path: ["rePassword"],
      });
    }
  });

type FormValues = z.infer<typeof FormSchema>;

export const AuthRegisterView = ({ setIndex }: { setIndex: Dispatch<React.SetStateAction<number>> }) => {
  const { t } = useTranslation("AuthModule");
  const { mutateAsync: createUser } = useCreateUserMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      name: "Sinan",
      email: "sinanozturkk@icloud.com",
      password: "12345678",
      rePassword: "12345678",
      birthdate: "1998-11-15",
    },
    resolver: zodResolver(FormSchema),
    mode: "onChange", // doğrulama işlemi her değer değiştiğinde çalışsın
  });

  const onNavigateLogin = () => {
    setIndex(AuthScreenRoutes.LOGIN);
  };

  const renderNameField = () => {
    return (
      <Controller
        control={form.control}
        name="name"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{t("name")}</FormLabel>
            <TextField
              ref={field.ref}
              value={field.value}
              onChangeText={field.onChange}
              placeholder={t("name")}
              error={fieldState.error?.message}
              returnKeyType="next"
              onSubmitEditing={() => form.setFocus("email")}
            />
            <FormDescription>{t("nameDescription")}</FormDescription>
          </FormItem>
        )}
      />
    );
  };

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
              ref={field.ref}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="********"
              error={fieldState.error?.message}
              returnKeyType="next"
              onSubmitEditing={() => form.setFocus("rePassword")}
            />
            <FormDescription>{t("passwordDescription")}</FormDescription>
          </FormItem>
        )}
      />
    );
  };

  const renderRePasswordField = () => {
    return (
      <Controller
        control={form.control}
        name="rePassword"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{t("rePassword")}</FormLabel>
            <PasswordField
              ref={field.ref}
              value={field.value}
              onChangeText={field.onChange}
              placeholder="********"
              error={fieldState.error?.message}
              returnKeyType="done"
              onSubmitEditing={handleSubmit}
            />
            <FormDescription>{t("rePasswordDescription")}</FormDescription>
          </FormItem>
        )}
      />
    );
  };

  const renderBirthdateField = () => {
    return (
      <Controller
        control={form.control}
        name="birthdate"
        render={({ field, fieldState }) => (
          <FormItem>
            <FormLabel>{t("birthdate")}</FormLabel>
            <DatePickerField value={field?.value} onChange={field.onChange} error={fieldState.error?.message} />
            <FormDescription>{t("birthDateDescription")}</FormDescription>
          </FormItem>
        )}
      />
    );
  };

  const onSubmit = async (data: FormValues) => {
    const createdUser = await createUser({
      email: data.email,
      name: data.name,
      password: data.password,
      avatar: "https://i.pravatar.cc/300", // default avatar
    });

    await queryClient.setQueryData(["createdUser"], createdUser); // kullanıcıyı cache'e ekleyerek permission ekranında basit bir şekilde kullanıcı bilgilerine ulaşabilmek için

    setIndex(AuthScreenRoutes.REGISTER_PERMISSIONS);

    //kayıt başarılı ise toast göster
    Notifier.showNotification({
      title: t("successRegisterToast.title"),
      description: t("successRegisterToast.message"),
      Component: NotifierComponents.Alert,
      componentProps: {
        alertType: "success",
      },
    });
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <View className="flex-1 px-16 flex-col justify-between items-center">
      <View className="flex-1 w-full items-center">
        <ScrollView className="w-full" contentContainerClassName="flex-col items-center gap-2" showsVerticalScrollIndicator={false}>
          {renderNameField()}
          {renderEmailField()}
          {renderPasswordField()}
          {renderRePasswordField()}
          {/* {renderBirthdateField()} 
           // Tasarımda olduğu için eklendi , kullandığım platzi fake store api schema'sında doğum tarihi olmadığından dolayı gizlendi
          */}
        </ScrollView>
      </View>

      <View className="items-center gap-4">
        <ThemedButton isLoading={form.formState.isSubmitting} onPress={handleSubmit} className="px-8">
          {t("continue")}
        </ThemedButton>
        <ThemedText className="text-sm">
          {t("doYouHaveAccount")}{" "}
          <ThemedText onPress={onNavigateLogin} className="text-primary">
            {t("login")}
          </ThemedText>
        </ThemedText>
      </View>
    </View>
  );
};
