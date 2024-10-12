import { useAuthLoginMutation } from "@/api/Auth";
import { UserDTO } from "@/api/User";
import { SwitchField } from "@/components/Field/SwitchField";
import { ThemedButton } from "@/components/Themed/ThemedButton";
import { ThemedText } from "@/components/Themed/ThemedText";
import { queryClient } from "@/providers/QueryProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
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
  const { mutateAsync: login, isPending } = useAuthLoginMutation();

  const onFinishRegister = async () => {
    await login({
      email: (createdUser as UserDTO)?.email,
      password: (createdUser as UserDTO)?.password,
    });
    await queryClient.setQueryData(["createdUser"], undefined); // kullanıcı bilgilerini sıfırla
  };

  const form = useForm<FormValues>({
    resolver: zodResolver(FormSchema),
    mode: "onChange", // herhangi bir değişiklik olduğunda formu kontrol et
  });

  return (
    <View className="flex-1 justify-center items-center">
      <ScrollView
        className="w-full"
        contentContainerClassName="items-center px-16 gap-5"
      >
        <View className="gap-2 items-center">
          <ThemedText className="font-bold">Hassas Veriler Hakkında</ThemedText>
          <ThemedText className="text-center text-sm">
            Uygulamamızı kullanabilmek için aşağıdaki izinleri onaylamanız
            gerekmektedir.
          </ThemedText>
        </View>

        <Controller
          control={form.control}
          name="kvkk"
          render={({ field }) => (
            <SwitchField
              value={field.value}
              onChange={field.onChange}
              text="Kişisel Verilerin Korunması Kanunu (KVKK) kapsamında, kişisel verilerimin işlenmesine dair bilgilendirmeyi okudum, anladım ve bu sözleşmeyi kabul ediyorum."
            />
          )}
        />

        <Controller
          control={form.control}
          name="privacy"
          render={({ field }) => (
            <SwitchField
              value={field.value}
              onChange={field.onChange}
              text="Gizlilik Politikası'nı dikkatlice okudum, kişisel bilgilerimin nasıl toplandığını, kullanıldığını ve korunduğunu anladım, ve Gizlilik Politikası'nı kabul ediyorum."
            />
          )}
        />

        <Controller
          control={form.control}
          name="terms"
          render={({ field }) => (
            <SwitchField
              value={field.value}
              onChange={field.onChange}
              text="Uygulamanın Kullanım Şartları'nı okudum, siteyi kullanırken uymam gereken kurallar ve yükümlülükler hakkında bilgilendirildim, ve bu şartları kabul ediyorum."
            />
          )}
        />
      </ScrollView>

      <ThemedButton
        disabled={!form.formState.isValid}
        isLoading={isPending}
        onPress={onFinishRegister}
        className="px-8"
      >
        İlerle
      </ThemedButton>
    </View>
  );
};
