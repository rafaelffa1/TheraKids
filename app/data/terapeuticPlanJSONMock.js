const terapeuticMock = `
{
  "PlanoTerapia": {
    "InformacoesGerais": {
      "Paciente": "Informação não especificada",
      "Diagnostico": "Não fornecido (Suposição: Problemas de comunicação)",
      "NumeroSessoes": 12,
      "TipoTerapia": "Fonoaudiologia",
      "MateriaisTrabalho": ["Livros", "Violão"],
      "AmbienteTerapia": "Domiciliar"
    },
    "ObjetivosTerapeuticos": [
      "Melhorar a articulação e clareza na fala.",
      "Aperfeiçoar a expressão oral através do uso de técnicas vocais e musicais.",
      "Fomentar a confiança na comunicação verbal e não-verbal.",
      "Desenvolver habilidades de leitura e compreensão usando livros."
    ],
    "EstruturaSessoes": {
      "DuracaoSessaoMinutos": 50,
      "Divisao": {
        "AquecimentoVocal": 10,
        "AtividadesLeitura": 15,
        "ExerciciosViolao": 15,
        "FeedbackOrientacoes": 10
      }
    },
    "PlanoDetalhado": [
      {
        "Sessao": 1,
        "Atividades": "Avaliação inicial, definição de metas específicas e introdução aos exercícios de aquecimento vocal."
      },
      {
        "Sessao": "2-4",
        "Atividades": [
          "Foco em leitura em voz alta, utilizando livros adequados ao nível do paciente.",
          "Introdução básica ao violão, focando em tocar simples acordes e ritmos."
        ]
      },
      {
        "Sessao": "5-8",
        "Atividades": [
          "Incorporar exercícios de ritmo usando o violão para melhorar a fluência da fala.",
          "Intensificar os exercícios de leitura, incluindo perguntas de compreensão para melhorar a interpretação."
        ]
      },
      {
        "Sessao": "9-11",
        "Atividades": [
          "Combinação de leitura e música para realizar pequenas apresentações (paciente lê trechos e canta, integrando habilidades desenvolvidas).",
          "Aumento gradativo da dificuldade dos textos e das peças musicais para desafiar o paciente."
        ]
      },
      {
        "Sessao": 12,
        "Atividades": "Avaliação final, revisão dos progressos e discussão sobre estratégias de manutenção e continuidade da terapia, se necessário."
      }
    ],
    "RecomendacoesAdicionais": [
      "Encorajar a prática diária de leitura e exercícios vocais.",
      "Sugerir a gravação de sessões de prática para autoavaliação e ajuste.",
      "Monitoramento contínuo e ajuste das atividades conforme o progresso do paciente."
    ],
    "NotaFinal": "Este plano é uma sugestão genérica e deve ser personalizado de acordo com as necessidades específicas e diagnóstico detalhado do paciente. A terapia eficaz requer uma avaliação contínua e adaptação às respostas do paciente às intervenções propostas."
  }
}
`

export default terapeuticMock;