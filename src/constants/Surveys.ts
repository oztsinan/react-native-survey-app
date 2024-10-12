import { QuestionType, SurveyDTO } from "@/api/Survey/Survey.types";

export const Surveys: SurveyDTO[] = [
  {
    id: "550e8400-e29b-41d4-a716-446655440000",
    name: "Müşteri Memnuniyeti Anketi",
    duration: 60, // seconds type
    questions: [
      {
        id: "550e8400-e29b-41d4-a716-446655440001",
        text: "Hizmetimizden memnun musunuz?",
        options: null,
        type: QuestionType.Likert,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440002",
        text: "Tekrar bizi tercih eder misiniz?",
        options: [
          {
            id: "550e8400-e29b-41d4-a716-446655440003",
            text: "Evet",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440004",
            text: "Hayır",
          },
        ],
        type: QuestionType.SingleSelect,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440005",
        text: "Aldığınız hizmeti 1 ile 10 arasında değerlendirin.",
        options: null,
        type: QuestionType.Slider,
        maxValue: 10,
        minValue: 1,
        step: 1,
      },
    ],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440006",
    name: "Çalışan Memnuniyeti Anketi",
    duration: 60, // seconds type
    questions: [
      {
        id: "550e8400-e29b-41d4-a716-446655440007",
        text: "Şirket içindeki genel memnuniyetinizi değerlendirin.",
        options: null,
        type: QuestionType.Likert,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440008",
        text: "İş arkadaşlarınızla işbirliği yapma konusunda ne kadar memnunsunuz?",
        options: null,
        type: QuestionType.Slider,
        maxValue: 10,
        minValue: 1,
        step: 1,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440009",
        text: "İş güvenliğinden memnun musunuz?",
        options: [
          {
            id: "550e8400-e29b-41d4-a716-446655440010",
            text: "Evet",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440011",
            text: "Hayır",
          },
        ],
        type: QuestionType.SingleSelect,
      },
    ],
  },
  {
    id: "550e8400-e29b-41d4-a716-446655440012",
    name: "Ürün Değerlendirme Anketi",
    duration: 60, // seconds type
    questions: [
      {
        id: "550e8400-e29b-41d4-a716-446655440013",
        text: "Ürün performansını 1 ile 10 arasında değerlendirin.",
        options: null,
        type: QuestionType.Slider,
        maxValue: 10,
        minValue: 1,
        step: 1,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440014",
        text: "Ürünün kalitesi hakkında genel bir değerlendirme yapar mısınız?",
        options: null,
        type: QuestionType.Likert,
      },
      {
        id: "550e8400-e29b-41d4-a716-446655440015",
        text: "Bu ürünü arkadaşlarınıza önerir misiniz?",
        options: [
          {
            id: "550e8400-e29b-41d4-a716-446655440016",
            text: "Evet",
          },
          {
            id: "550e8400-e29b-41d4-a716-446655440017",
            text: "Hayır",
          },
        ],
        type: QuestionType.SingleSelect,
      },
    ],
  },
];
