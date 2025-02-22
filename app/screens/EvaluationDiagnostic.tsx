import React from 'react';
import { View, Text, ScrollView, StyleSheet, Button } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function EvaluationDiagnostic({ navigation }) {
    const route = useRoute();
    const { data } = route.params || {};

    const planoTerapeutico = data ? JSON.parse(decodeURIComponent(data)) : null;
    const cleanedString = planoTerapeutico.replace(/^```json/, '').replace(/```$/, '').trim();
    const avaliationObject = JSON.parse(cleanedString)

    const goToTerapeuticPlan = async () => {
        navigation.navigate("TerapeuticPlan", {data: avaliationObject})
    };

    return (
        <>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Diagnóstico avaliativo</Text>
                <Text style={styles.sectionTitle}>Nome do Paciente:</Text>
                <Text style={styles.content}>{avaliationObject.NomePaciente}</Text>
                <Text style={styles.sectionTitle}>Avaliação Neuropsicológica:</Text>
                <Text style={styles.content}>{avaliationObject.avaliacaoNeuropsicologica}</Text>
                <Text style={styles.sectionTitle}>Diagnóstico Avaliativo:</Text>
                <Text style={styles.content}>{avaliationObject.diagnosticoAvaliativo}</Text>
            </ScrollView>
            <Button title="Criar Plano Terapeutico" onPress={goToTerapeuticPlan} />
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#000'
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 15,
        color: '#000'
    },
    content: {
        fontSize: 16,
        textAlign: 'justify',
        marginBottom: 10,
        color: '#000'
    },
});
