import React, { useState } from "react";
import { View, Text, SectionList, Button, TextInput, ActivityIndicator } from "react-native";
import { RadioButton } from "react-native-paper";
import { fetchChatGPTResponse } from '../api/api';
import sections from '../data/questions'

// const sections = [
//   {
//     title: "1. Comunicação e Linguagem",
//     data: [
//       "A criança evita ou tem dificuldade em manter contato visual?",
//       "Apresenta atraso no desenvolvimento da fala ou usa poucas palavras para a idade?",
//       "Repete frases ou palavras de forma incomum (ecolalia)?",
//       "Usa a linguagem de forma incomum (voz monótona, robótica ou exagerada)?",
//       "Não responde ao nome quando chamado?",
//     ],
//   },
//   // Adicione outras seções aqui e numere os títulos e perguntas
// ];

const totalQuestions = sections.reduce((acc, section) => acc + section.data.length, 0);
const randomOptions = ["Sim", "Não", "Às vezes"];

export default function QuestionnaireScreen({ navigation }) {
  const [answers, setAnswers] = useState({});
  const [finalAnswers, setFinalAnswers] = useState(null);
  const [patientName, setPatientName] = useState("");
  const [isAllAnswered, setIsAllAnswered] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleAnswer = (sectionIndex, questionIndex, question, answer) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [`${sectionIndex}-${questionIndex}`]: { question, answer } };
      if (Object.keys(newAnswers).length === totalQuestions && patientName.trim() !== "") {
        setIsAllAnswered(true);
      }
      return newAnswers;
    });
  };

  const generateRandomAnswers = () => {
    const randomAnswers = {};
    sections.forEach((section, sectionIndex) => {
      section.data.forEach((question, questionIndex) => {
        const randomAnswer = randomOptions[Math.floor(Math.random() * randomOptions.length)];
        randomAnswers[`${sectionIndex}-${questionIndex}`] = { question, answer: randomAnswer };
      });
    });
    setAnswers(randomAnswers);
    if (patientName.trim() !== "") {
      setIsAllAnswered(true);
    }
  };

  const formatAnswersForPrompt = (data) => {
    let formattedText = `
      ChatGPT, faça um Teste Neuropsicológico para Autismo, TDAH e TOD e me forneça um diagnóstico avaliativo do paciente de acordo com as perguntas e respostas dadas.

      Formate a resposta no seguinte modelo JSON:

      {
        "NomePaciente": "Nome do Paciente",
        "avaliacaoNeuropsicologica": "Resumo detalhado da avaliação neuropsicológica do paciente com base nas respostas.",
        "diagnosticoAvaliativo": "Diagnóstico avaliativo final, incluindo possíveis indicações ou recomendações."
      }

      Não inclua as perguntas e respostas novamente, apenas a avaliação e diagnóstico baseado nas respostas fornecidas.
    `;
    formattedText += `Nome do Paciente: ${data.patientName}\n`;
    Object.values(data.answers).forEach((entry) => {
      formattedText += `${entry.question} - Resposta: ${entry.answer}\n`;
    });
    return formattedText;
  };

  const saveAnswers = async () => {
    setLoading(true);
    const fullData = { patientName, answers };
    setFinalAnswers(fullData);
    const formattedPrompt = formatAnswersForPrompt(fullData);
    const diagnostic = await fetchChatGPTResponse(formattedPrompt)
    const dataString = encodeURIComponent(JSON.stringify(diagnostic));
    setLoading(false);
    navigation.navigate("EvaluationDiagnostic", { data: dataString })
  };

  return (
    <View style={{ flex: 1, padding: 20, backgroundColor: "#f5f5f5" }}>
      {loading && (
        <View style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 10,
        }}>
          <ActivityIndicator size="large" color="#ffffff" />
        </View>
      )}
      <Text style={{ fontSize: 18, color: '#000', fontWeight: "bold", marginBottom: 10 }}>Nome do Paciente</Text>
      <TextInput
        style={{ height: 40, borderColor: "gray", color: '#000', borderWidth: 1, marginBottom: 20, paddingHorizontal: 10, borderRadius: 5 }}
        placeholder="Digite o nome do paciente"
        value={patientName}
        onChangeText={(text) => {
          setPatientName(text);
          if (Object.keys(answers).length === totalQuestions && text.trim() !== "") {
            setIsAllAnswered(true);
          } else {
            setIsAllAnswered(false);
          }
        }}
      />
      <SectionList
        sections={sections}
        keyExtractor={(_, index) => index.toString()}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{ fontSize: 20, color: '#000', fontWeight: "bold", marginVertical: 10 }}>{title}</Text>
        )}
        renderItem={({ item, index, section }) => (
          <View style={{ marginBottom: 20, padding: 15, backgroundColor: "#fff", borderRadius: 10, shadowColor: "#000", shadowOpacity: 0.1, shadowRadius: 5 }}>
            <Text style={{color: '#000', fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>{item}</Text>
            <RadioButton.Group
              onValueChange={(value) => handleAnswer(sections.indexOf(section), index, item, value)}
              value={answers[`${sections.indexOf(section)}-${index}`]?.answer || ""}
            >
              <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                {['Sim', 'Não', 'Às vezes'].map((option) => (
                  <View key={option} style={{ flexDirection: "row", alignItems: "center" }}>
                    <RadioButton value={option} />
                    <Text style={{ color: '#000' }}>{option}</Text>
                  </View>
                ))}
              </View>
            </RadioButton.Group>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
      <Button title="Gerar aleatoriamente" onPress={generateRandomAnswers} />
      {isAllAnswered && <Button title="Diagnóstico avaliativo" onPress={saveAnswers} />}
    </View>
  );
}
