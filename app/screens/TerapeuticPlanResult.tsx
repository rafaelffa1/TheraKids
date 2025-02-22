import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/Ionicons";
import { useRoute } from '@react-navigation/native';

export default function TerapeuticPlanResult() {
  const navigation = useNavigation();

  const route = useRoute();
  const { data } = route.params || {};

  const planoTerapeutico = data ? JSON.parse(decodeURIComponent(data)) : null;
  const cleanedString = planoTerapeutico.replace(/^```json/, '').replace(/```$/, '').trim();
  const planoTerapia = JSON.parse(cleanedString)
  // const planoTerapia = {"PlanoTerapia": {"EstruturaSessoes": {"Divisao": [Object], "DuracaoSessaoMinutos": 50}, "InformacoesGerais": {"AmbienteTerapia": "Domiciliar", "Diagnostico": "Suspeita de estar no espectro autista com possível TDAH, requerendo suporte moderado a substancial e acompanhamento contínuo.", "MateriaisTrabalho": [Array], "NumeroSessoes": 12, "Paciente": "Rafael Almeida", "TipoTerapia": "Fonoaudiologia"}, "NotaFinal": "Este plano é adaptado às necessidades de Rafael e deve ser continuamente revisado para maximizar a eficácia terapêutica. Intervenções e ajustes devem ser baseados na evolução do paciente e nas recomendações da equipe multidisciplinar envolvida.", "ObjetivosTerapeuticos": ["Melhorar a articulação e clareza na fala.", "Aperfeiçoar a expressão oral e musical, utilizando técnicas vocais e o violão.", "Fortalecer a habilidade de leitura e compreensão de textos.", "Desenvolver confiança e habilidades em comunicação verbal e não-verbal."], "PlanoDetalhado": [[Object], [Object], [Object], [Object], [Object]], "RecomendacoesAdicionais": ["Prática diária das habilidades trabalhadas em sessão, especialmente leitura e exercícios com o violão.", "Gravação das práticas para monitoramento do progresso e autoavaliação.", "Avaliação contínua para ajuste das intervenções terapêuticas conforme a resposta do paciente."]}}

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Icon name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Plano Terapêutico</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Informações Gerais */}
        <Text style={styles.sectionTitle}>Informações Gerais</Text>
        {Object.entries(planoTerapia?.PlanoTerapia.InformacoesGerais).map(([key, value]) => (
          <Text key={key} style={styles.text}>
            <Text style={styles.boldText}>
              {key.replace(/([A-Z])/g, " $1")}:{" "}
            </Text>
            {Array.isArray(value)
              ? value.join(", ")
              : typeof value === "string"
                ? value
                : JSON.stringify(value)}
          </Text>
        ))}

         {/* Objetivos Terapêuticos */}
         <Text style={styles.sectionTitle}>Objetivos Terapêuticos</Text>
        {planoTerapia?.PlanoTerapia.ObjetivosTerapeuticos.map((objetivo, index) => (
          <Text key={index} style={styles.text}>- {objetivo}</Text>
        ))}

        {/* Estrutura das Sessões */}
        <Text style={styles.sectionTitle}>Estrutura das Sessões</Text>
        <Text style={styles.text}>
          Duração da Sessão: {planoTerapia?.PlanoTerapia.EstruturaSessoes.DuracaoSessaoMinutos} min
        </Text>
        {planoTerapia?.PlanoTerapia.EstruturaSessoes.Divisao &&
          Object.entries(planoTerapia?.PlanoTerapia.EstruturaSessoes.Divisao).map(
            ([key, value]) => (
              <Text key={key} style={styles.text}>
                - {key.replace(/([A-Z])/g, " $1")}: {value} min
              </Text>
            )
          )}

        {/* Plano Detalhado */}
        <Text style={styles.sectionTitle}>Plano Detalhado</Text>
        {planoTerapia?.PlanoTerapia.PlanoDetalhado.map((sessao, index) => (
          <View key={index} style={styles.sessaoContainer}>
            <Text style={styles.sessaoTitle}>Sessão {sessao.Sessao}</Text>
            {Array.isArray(sessao.Atividades) ? (
              sessao.Atividades.map((atividade, idx) => (
                <Text key={idx} style={styles.text}>- {atividade}</Text>
              ))
            ) : (
              <Text style={styles.text}>{sessao.Atividades}</Text>
            )}
          </View>
        ))}

        {/* Recomendações Adicionais */}
        <Text style={styles.sectionTitle}>Recomendações Adicionais</Text>
        {planoTerapia?.PlanoTerapia.RecomendacoesAdicionais.map((recomendacao, index) => (
          <Text key={index} style={styles.text}>- {recomendacao}</Text>
        ))}

        {/* Nota Final */}
        <Text style={styles.sectionTitle}>Nota Final</Text>
        <Text style={styles.text}>{planoTerapia?.PlanoTerapia.NotaFinal}</Text>

       
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 10,
    marginTop: 15,
  },
  text: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  boldText: {
    fontWeight: "bold",
  },
  sessaoContainer: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: "#e8f0ff",
    borderRadius: 8,
  },
  sessaoTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4A90E2",
    marginBottom: 5,
  },
});
