export interface Template {
  id: string
  name: string
  description: string
  thumbnailUrl: string
  imageUrl: string
  category: "moderno" | "divertido" | "infantil" | "religioso" | "elegante"
}

export interface CardData {
  id?: string
  template_id: string
  message: string
  name?: string
  email?: string
  photo_url?: string
  image_state?: string
  card_url?: string
  session_id?: string
  status?: "pending" | "paid" | "cancelled"
  created_at?: string
}

export interface ImageUploadResponse {
  success: boolean
  cardId?: string
  imageUrl?: string
  error?: string
}

export interface GenerateCardResponse {
  success: boolean
  previewId?: string
  previewUrl?: string
  checkoutUrl?: string
  sessionId?: string
  error?: string
}

export interface GetCardResponse {
  success: boolean
  card?: CardData
  error?: string
}

