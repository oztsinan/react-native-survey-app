import { useAuthLoginMutation } from "@/api/Auth";
import { UserDTO } from "@/api/User";
import { SwitchField } from "@/components/Field/SwitchField";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { ThemedText } from "@/components/Themed/ThemedText";
import { queryClient } from "@/providers/QueryProvider";
import Toast from "@/utils/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView } from "react-native";
import { View } from "react-native";
import { z } from "zod";

const FormSchema = z.object({
  kvkk: z.boolean().refine((value) => value === true),
  privacy: z.boolean().refine((value) => value === true),
  terms: z.boolean().refine((value) => value === true),
});

type FormValues = z.infer<typeof FormSchema>;

export const AuthRegisterPermissionsView = () => {
  const createdUser = queryClient.getQueryData(["createdUser"]); // kayıt oluşturulduktan sonra kullanıcı bilgilerini almak için

  const { t } = useTranslation("AuthModule");
  const { mutateAsync: login } = useAuthLoginMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange", // herhangi bir değişiklik olduğunda formu kontrol et
  });

  const onSubmit = async (data: FormValues) => {
    await login({
      email: (createdUser as UserDTO)?.email,
      password: (createdUser as UserDTO)?.password,
    });
    await queryClient.setQueryData(["createdUser"], undefined); // kullanıcı bilgilerini sıfırla

    Toast.success({
      title: t("successLoginToast.title"),
      message: t("successLoginToast.message"),
    });
  };

  const handleSubmit = form.handleSubmit(onSubmit);

  return (
    <View className="flex-1 justify-center items-center">
      <ScrollView className="w-full" contentContainerClassName="items-center px-16 gap-5">
        <View className="gap-2 items-center">
          <ThemedText className="font-bold">{t("registerPermissionTitle")}</ThemedText>
          <ThemedText className="text-center text-sm">{t("registerPermissionDescription")}</ThemedText>
        </View>

        <Controller
          control={form.control}
          name="kvkk"
          render={({ field }) => <SwitchField value={field.value} onChange={field.onChange} text={t("kvkkText")} />}
        />

        <Controller
          control={form.control}
          name="privacy"
          render={({ field }) => <SwitchField value={field.value} onChange={field.onChange} text={t("privacyText")} />}
        />

        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => <SwitchField value={field.value} onChange={field.onChange} text={t("termsText")} />}
        />
      </ScrollView>

      <ThemedButton disabled={!form.formState.isValid} isLoading={form.formState.isSubmitting} onPress={handleSubmit} className="px-8">
        {t("continue")}
      </ThemedButton>
    </View>
  );
};
