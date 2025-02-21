import axios from "axios";
import { OPENAI_API_KEY } from '@env';


// Sua chave da OpenAI (NÃO DEIXE ISSO NO CÓDIGO FINAL EM PRODUÇÃO)
const API_KEY = OPENAI_API_KEY
const API_URL = "https://api.openai.com/v1/chat/completions";

// Função para enviar mensagens para o ChatGPT
export const fetchChatGPTResponse = async (message) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        model: "gpt-4-turbo", // ou gpt-3.5-turbo se quiser algo mais barato e rápido
        messages: [{ role: "user", content: message }],
        temperature: 0.8, // Ajuste de criatividade (0.1 = resposta objetiva, 1.0 = mais criativo)
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
      }
    );
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Erro ao chamar a API do ChatGPT:", error);
    return "Erro ao processar sua solicitação.";
  }
};
