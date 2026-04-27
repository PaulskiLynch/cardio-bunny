export type AnswerType = 'yes_no' | 'choice' | 'text'

export interface Question {
  id: string
  text: string
  type: AnswerType
  options?: string[]
  required: boolean
}

const CARDIO_BUNNY_QUESTIONS_EN: Question[] = [
  {
    id: 'wear_it',
    text: 'Would you wear this set?',
    type: 'yes_no',
    required: true,
  },
  {
    id: 'price',
    text: 'How much would you pay for this set?',
    type: 'choice',
    options: ['Under £20', '£20–£40', '£40–£60', '£60+'],
    required: true,
  },
  {
    id: 'colour',
    text: 'Which colour direction would you prefer?',
    type: 'choice',
    options: ['Bold / Bright', 'Pastel', 'Neutral / Black', 'Camo / Print', 'As shown'],
    required: true,
  },
  {
    id: 'occasion',
    text: 'Gym-only or everyday wear?',
    type: 'choice',
    options: ['Gym only', 'Everyday wear', 'Both'],
    required: true,
  },
  {
    id: 'change',
    text: 'What would you change? (optional)',
    type: 'text',
    required: false,
  },
]

const QUESTIONS: Record<string, Question[]> = {
  biedronka: [
    {
      id: 'wear_it',
      text: 'Czy nosiłabyś/nosiłbyś ten zestaw?',
      type: 'yes_no',
      required: true,
    },
    {
      id: 'price',
      text: 'Ile zapłaciłabyś/zapłaciłbyś za ten zestaw?',
      type: 'choice',
      options: ['Poniżej 100 PLN', '100–150 PLN', '150–200 PLN', 'Powyżej 200 PLN'],
      required: true,
    },
    {
      id: 'colour',
      text: 'Który kolor wolisz?',
      type: 'choice',
      options: ['Śmiały / Jaskrawy', 'Pastelowy', 'Neutralny / Czarny', 'Moro / Wzór', 'Jak na zdjęciu'],
      required: true,
    },
    {
      id: 'occasion',
      text: 'Tylko na siłownię czy też na co dzień?',
      type: 'choice',
      options: ['Tylko siłownia', 'Na co dzień', 'Oba'],
      required: true,
    },
    {
      id: 'change',
      text: 'Co byś zmienił(a)? (opcjonalnie)',
      type: 'text',
      required: false,
    },
  ],

  uk: CARDIO_BUNNY_QUESTIONS_EN,

  turkiye: [
    {
      id: 'wear_it',
      text: 'Bu seti giyer miydiniz?',
      type: 'yes_no',
      required: true,
    },
    {
      id: 'price',
      text: 'Bu set için ne kadar öderdiniz?',
      type: 'choice',
      options: ['500 TRY altı', '500–800 TRY', '800–1200 TRY', '1200 TRY üzeri'],
      required: true,
    },
    {
      id: 'colour',
      text: 'Hangi rengi tercih ederdiniz?',
      type: 'choice',
      options: ['Canlı / Parlak', 'Pastel', 'Nötr / Siyah', 'Kamuflaj / Baskı', 'Göründüğü gibi'],
      required: true,
    },
    {
      id: 'occasion',
      text: 'Sadece spor salonu mu yoksa günlük kullanım için de mi?',
      type: 'choice',
      options: ['Sadece spor salonu', 'Günlük kullanım', 'Her ikisi de'],
      required: true,
    },
    {
      id: 'change',
      text: 'Ne değiştirirdiniz? (isteğe bağlı)',
      type: 'text',
      required: false,
    },
  ],

  swomp: [
    {
      id: 'shelf_eye',
      text: 'Would this can catch your eye on a shelf?',
      type: 'yes_no',
      required: true,
    },
    {
      id: 'flavour',
      text: 'Which flavour would you expect from this design?',
      type: 'choice',
      options: ['Citrus / Lemon', 'Berry / Tropical', 'Mint / Cucumber', 'Watermelon', 'Unflavoured'],
      required: true,
    },
    {
      id: 'price',
      text: 'What price would feel right for this can?',
      type: 'choice',
      options: ['Under €1', '€1–€1.50', '€1.50–€2', '€2+'],
      required: true,
    },
    {
      id: 'feel',
      text: 'What does this design make you feel?',
      type: 'choice',
      options: ['Fresh', 'Bold', 'Natural', 'Premium', 'Fun'],
      required: true,
    },
    {
      id: 'fourpack',
      text: 'Would you buy a 4-pack?',
      type: 'yes_no',
      required: true,
    },
  ],

  konkerz: [
    {
      id: 'child_want',
      text: 'Would your child (or you) want this character?',
      type: 'yes_no',
      required: true,
    },
    {
      id: 'vibe',
      text: 'Is it funny, scary, or cute?',
      type: 'choice',
      options: ['Funny', 'Scary', 'Cute', 'All three!', 'None of these'],
      required: true,
    },
    {
      id: 'age_group',
      text: 'What age group is it best for?',
      type: 'choice',
      options: ['Under 6', '6–10', '10–14', '14+'],
      required: true,
    },
    {
      id: 'buy_toy',
      text: 'Would you buy this as a toy?',
      type: 'yes_no',
      required: true,
    },
    {
      id: 'change',
      text: 'What would you change? (optional)',
      type: 'text',
      required: false,
    },
  ],
}

export function getQuestions(competition: string): Question[] {
  return QUESTIONS[competition] ?? []
}
