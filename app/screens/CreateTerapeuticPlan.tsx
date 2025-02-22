import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from '@react-navigation/native';
import { fetchChatGPTResponse } from "../api/api";
import terapeuticMock from "../data/terapeuticPlanJSONMock";

export default function CreateTerapeuticPlan({ navigation }) {

  const route = useRoute();
  const { data } = route.params || {};

  const [numSessoes, setNumSessoes] = useState("");
  const [tipoTerapia, setTipoTerapia] = useState("");
  const [materialTrabalho, setMaterialTrabalho] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [loading, setLoading] = useState(false);

  // Função para gerar o prompt para o ChatGPT
  const gerarPromptParaChatGPT = () => {
    const prompt = `
    ChatGPT, crie um Plano de Trabalho Terapêutico com base nas seguintes informações:              
    Nome do Paciente: ${data.NomePaciente}             
    Avaliação Neuropsicológica: ${data.avaliacaoNeuropsicologica}                
    Diagnostico do paciente: ${data.diagnosticoAvaliativo}

    - Número de Sessões: ${numSessoes || "Não informado"}
    - Tipo de Terapia: ${tipoTerapia || "Não informado"}
    - Materiais de Trabalho: ${materialTrabalho || "Não informado"}
    - Ambiente da Terapia: ${ambiente || "Não informado"}

    Gere um plano detalhado, considerando a melhor abordagem terapêutica para esse perfil.
    quero que o resultado seja de acordo com a estrutura desse JSON de exemplo ${terapeuticMock}
    somente de exemplo não use ele para fazer o plano, apenas a estrutura JSON
    `;
    sendCreatePlan(prompt)
  };

  const sendCreatePlan = async (prompt: String) => {
    setLoading(true);
    const terapeuticPlan = await fetchChatGPTResponse(prompt)
    setLoading(false);
    const dataString = encodeURIComponent(JSON.stringify(terapeuticPlan));
    navigation.navigate("TerapeuticPlanResult", { data: dataString })
  };

  return (
    <View style={styles.container}>
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
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Criação de Plano de Trabalho Terapêutico</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subTitle}>Preencha os detalhes abaixo</Text>

        {/* Número de Sessões */}
        <Text style={styles.label}>Número de Sessões</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o número de sessões"
          keyboardType="numeric"
          value={numSessoes}
          onChangeText={setNumSessoes}
        />

        {/* Tipo de Terapia */}
        <Text style={styles.label}>Tipo de Terapia</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={tipoTerapia} onValueChange={(itemValue) => setTipoTerapia(itemValue)}>
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Psicologia" value="Psicologia" />
            <Picker.Item label="Terapia ABA" value="Terapia ABA" />
            <Picker.Item label="Terapia Ocupacional" value="Terapia Ocupacional" />
            <Picker.Item label="Fonoaudiologia" value="Fonoaudiologia" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>
        </View>

        {/* Material de Trabalho */}
        <Text style={styles.label}>Material de Trabalho</Text>
        <TextInput
          style={styles.input}
          placeholder="Descreva os materiais necessários"
          value={materialTrabalho}
          onChangeText={setMaterialTrabalho}
        />

        {/* Ambiente da Terapia */}
        <Text style={styles.label}>Onde será feita a terapia?</Text>
        <View style={styles.pickerContainer}>
          <Picker selectedValue={ambiente} onValueChange={(itemValue) => setAmbiente(itemValue)}>
            <Picker.Item label="Selecione..." value="" />
            <Picker.Item label="Clínica" value="Clínica" />
            <Picker.Item label="Escola" value="Escola" />
            <Picker.Item label="Domiciliar" value="Domiciliar" />
            <Picker.Item label="Outro" value="Outro" />
          </Picker>
        </View>

        {/* Botão de Gerar Plano */}
        <TouchableOpacity style={styles.button} onPress={gerarPromptParaChatGPT}>
          <Text style={styles.buttonText}>Gerar Plano Terapêutico</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f9ff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: "#e0ebff",
    borderBottomWidth: 1,
    borderColor: "#d0d8e8",
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 20,
  },
  subTitle: {
    fontSize: 16,
    color: "#666",
    marginBottom: 15,
  },
  label: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#444",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  pickerContainer: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 15,
  },
  button: {
    backgroundColor: "#4A90E2",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
