// Sistema de dados completo para ISS Monitor
class DataManager {
  constructor() {
    this.initializeData();
  }

  initializeData() {
    // Verifica se já existem dados no localStorage
    if (!localStorage.getItem("issExperiments")) {
      this.setDefaultData();
    }
  }

  setDefaultData() {
    // Experimentos expandidos com 30 itens de 15 países
    const experiments = [
      // Brasil
      {
        id: 1,
        title: "Cristalização de Proteínas em Microgravidade",
        description:
          "Estudo da formação de cristais de proteínas em ambiente de microgravidade para desenvolvimento de medicamentos mais eficazes.",
        country: "Brasil",
        category: "Biotecnologia",
        status: "intacto",
        startDate: "2024-01-15",
        endDate: "2024-06-15",
        responsible: "Dr. Ana Silva",
        priority: "alta",
        value: 2500000,
      },
      {
        id: 2,
        title: "Comportamento de Ligas Metálicas no Espaço",
        description:
          "Análise das propriedades de ligas de alumínio e titânio em condições de microgravidade.",
        country: "Brasil",
        category: "Metalurgia",
        status: "danificado",
        startDate: "2024-02-01",
        endDate: "2024-07-01",
        responsible: "Dr. Carlos Mendes",
        priority: "crítica",
        value: 1800000,
      },

      // Estados Unidos
      {
        id: 3,
        title: "Experimento de Combustão Avançada",
        description:
          "Investigação de processos de combustão em microgravidade para melhorar eficiência energética.",
        country: "Estados Unidos",
        category: "Física",
        status: "intacto",
        startDate: "2024-01-10",
        endDate: "2024-08-10",
        responsible: "Dr. Michael Johnson",
        priority: "alta",
        value: 4200000,
      },
      {
        id: 4,
        title: "Cultivo de Tecidos Humanos",
        description:
          "Desenvolvimento de tecidos cardíacos em ambiente de microgravidade para transplantes.",
        country: "Estados Unidos",
        category: "Medicina",
        status: "danificado",
        startDate: "2024-03-01",
        endDate: "2024-09-01",
        responsible: "Dr. Sarah Williams",
        priority: "crítica",
        value: 3800000,
      },

      // Rússia
      {
        id: 5,
        title: "Estudo de Materiais Semicondutores",
        description:
          "Produção de semicondutores ultra-puros em condições de microgravidade.",
        country: "Rússia",
        category: "Eletrônica",
        status: "intacto",
        startDate: "2024-02-15",
        endDate: "2024-08-15",
        responsible: "Dr. Alexei Volkov",
        priority: "média",
        value: 2100000,
      },
      {
        id: 6,
        title: "Experimento de Física Quântica",
        description:
          "Investigação de efeitos quânticos em ambiente de microgravidade.",
        country: "Rússia",
        category: "Computação Quântica",
        status: "danificado",
        startDate: "2024-01-20",
        endDate: "2024-07-20",
        responsible: "Dr. Natasha Petrov",
        priority: "alta",
        value: 5200000,
      },

      // Japão
      {
        id: 7,
        title: "Robótica Espacial Autônoma",
        description:
          "Desenvolvimento de robôs autônomos para manutenção da ISS.",
        country: "Japão",
        category: "Robótica",
        status: "intacto",
        startDate: "2024-03-10",
        endDate: "2024-10-10",
        responsible: "Dr. Hiroshi Tanaka",
        priority: "alta",
        value: 6800000,
      },
      {
        id: 8,
        title: "Nanotecnologia em Microgravidade",
        description:
          "Síntese de nanomateriais com propriedades únicas em ambiente espacial.",
        country: "Japão",
        category: "Nanotecnologia",
        status: "danificado",
        startDate: "2024-02-05",
        endDate: "2024-08-05",
        responsible: "Dr. Yuki Nakamura",
        priority: "média",
        value: 3400000,
      },

      // Alemanha
      {
        id: 9,
        title: "Biotecnologia Farmacêutica",
        description:
          "Produção de medicamentos biotecnológicos em condições de microgravidade.",
        country: "Alemanha",
        category: "Biotecnologia",
        status: "intacto",
        startDate: "2024-01-25",
        endDate: "2024-07-25",
        responsible: "Dr. Klaus Weber",
        priority: "alta",
        value: 4100000,
      },
      {
        id: 10,
        title: "Estudo de Sustentabilidade Espacial",
        description:
          "Desenvolvimento de sistemas sustentáveis para missões espaciais de longa duração.",
        country: "Alemanha",
        category: "Sustentabilidade",
        status: "danificado",
        startDate: "2024-02-20",
        endDate: "2024-08-20",
        responsible: "Dr. Ingrid Mueller",
        priority: "média",
        value: 2800000,
      },

      // França
      {
        id: 11,
        title: "Observação Astronômica Avançada",
        description:
          "Desenvolvimento de novos instrumentos para observação do espaço profundo.",
        country: "França",
        category: "Astronomia",
        status: "intacto",
        startDate: "2024-03-05",
        endDate: "2024-09-05",
        responsible: "Dr. Marie Dubois",
        priority: "baixa",
        value: 1900000,
      },
      {
        id: 12,
        title: "Genética Espacial",
        description:
          "Estudo de mutações genéticas em organismos expostos à radiação espacial.",
        country: "França",
        category: "Genética",
        status: "danificado",
        startDate: "2024-01-30",
        endDate: "2024-07-30",
        responsible: "Dr. Pierre Moreau",
        priority: "alta",
        value: 3600000,
      },

      // Coreia do Sul
      {
        id: 13,
        title: "Tecnologia de Displays Flexíveis",
        description:
          "Desenvolvimento de telas flexíveis para aplicações espaciais.",
        country: "Coreia do Sul",
        category: "Eletrônica",
        status: "intacto",
        startDate: "2024-02-10",
        endDate: "2024-08-10",
        responsible: "Dr. Kim Min-jun",
        priority: "média",
        value: 2300000,
      },
      {
        id: 14,
        title: "Biotecnologia Alimentar",
        description:
          "Desenvolvimento de alimentos funcionais para astronautas.",
        country: "Coreia do Sul",
        category: "Biotecnologia",
        status: "danificado",
        startDate: "2024-03-15",
        endDate: "2024-09-15",
        responsible: "Dr. Lee So-young",
        priority: "baixa",
        value: 1500000,
      },

      // Índia
      {
        id: 15,
        title: "Sistemas de Comunicação Quântica",
        description:
          "Desenvolvimento de comunicação quântica segura para missões espaciais.",
        country: "Índia",
        category: "Computação Quântica",
        status: "intacto",
        startDate: "2024-01-05",
        endDate: "2024-07-05",
        responsible: "Dr. Raj Patel",
        priority: "alta",
        value: 4500000,
      },
      {
        id: 16,
        title: "Medicina Regenerativa",
        description:
          "Pesquisa em terapias regenerativas utilizando células-tronco em microgravidade.",
        country: "Índia",
        category: "Medicina",
        status: "danificado",
        startDate: "2024-02-25",
        endDate: "2024-08-25",
        responsible: "Dr. Priya Sharma",
        priority: "crítica",
        value: 3900000,
      },

      // Austrália
      {
        id: 17,
        title: "Mineralogia Espacial",
        description:
          "Análise de minerais em condições de microgravidade para exploração asteroidal.",
        country: "Austrália",
        category: "Geologia",
        status: "intacto",
        startDate: "2024-03-20",
        endDate: "2024-09-20",
        responsible: "Dr. James Mitchell",
        priority: "baixa",
        value: 1700000,
      },
      {
        id: 18,
        title: "Robótica de Mineração",
        description: "Desenvolvimento de robôs para mineração em asteroides.",
        country: "Austrália",
        category: "Robótica",
        status: "danificado",
        startDate: "2024-01-12",
        endDate: "2024-07-12",
        responsible: "Dr. Emma Thompson",
        priority: "média",
        value: 2600000,
      },

      // Reino Unido
      {
        id: 19,
        title: "Inteligência Artificial Espacial",
        description:
          "Desenvolvimento de IA para controle autônomo de sistemas espaciais.",
        country: "Reino Unido",
        category: "Computação",
        status: "intacto",
        startDate: "2024-02-08",
        endDate: "2024-08-08",
        responsible: "Dr. Oliver Brown",
        priority: "alta",
        value: 5100000,
      },
      {
        id: 20,
        title: "Biofísica Molecular",
        description:
          "Estudo de interações moleculares em condições de microgravidade.",
        country: "Reino Unido",
        category: "Física",
        status: "danificado",
        startDate: "2024-03-12",
        endDate: "2024-09-12",
        responsible: "Dr. Sophie Wilson",
        priority: "média",
        value: 2900000,
      },

      // Holanda
      {
        id: 21,
        title: "Agricultura Espacial Sustentável",
        description:
          "Desenvolvimento de sistemas agrícolas para missões de longa duração.",
        country: "Holanda",
        category: "Sustentabilidade",
        status: "intacto",
        startDate: "2024-01-18",
        endDate: "2024-07-18",
        responsible: "Dr. Anna van der Berg",
        priority: "média",
        value: 2200000,
      },
      {
        id: 22,
        title: "Biotecnologia Marinha",
        description:
          "Adaptação de organismos marinhos para ambientes espaciais.",
        country: "Holanda",
        category: "Biotecnologia",
        status: "danificado",
        startDate: "2024-02-28",
        endDate: "2024-08-28",
        responsible: "Dr. Pieter Jansen",
        priority: "baixa",
        value: 1600000,
      },

      // Suécia
      {
        id: 23,
        title: "Tecnologia de Propulsão Iônica",
        description:
          "Desenvolvimento de sistemas de propulsão iônica avançados.",
        country: "Suécia",
        category: "Engenharia",
        status: "intacto",
        startDate: "2024-03-08",
        endDate: "2024-09-08",
        responsible: "Dr. Erik Larsson",
        priority: "alta",
        value: 4700000,
      },
      {
        id: 24,
        title: "Materiais Biomédicos",
        description:
          "Síntese de biomateriais para implantes médicos em microgravidade.",
        country: "Suécia",
        category: "Medicina",
        status: "danificado",
        startDate: "2024-01-28",
        endDate: "2024-07-28",
        responsible: "Dr. Astrid Nilsson",
        priority: "média",
        value: 3200000,
      },

      // Suíça
      {
        id: 25,
        title: "Cronometragem de Precisão Espacial",
        description:
          "Desenvolvimento de sistemas de cronometragem ultra-precisos para navegação espacial.",
        country: "Suíça",
        category: "Engenharia",
        status: "intacto",
        startDate: "2024-02-12",
        endDate: "2024-08-12",
        responsible: "Dr. Hans Zimmermann",
        priority: "baixa",
        value: 1400000,
      },
      {
        id: 26,
        title: "Farmacologia Espacial",
        description:
          "Desenvolvimento de medicamentos adaptados para condições espaciais.",
        country: "Suíça",
        category: "Medicina",
        status: "reparado",
        startDate: "2024-03-25",
        endDate: "2024-09-25",
        responsible: "Dr. Maria Schneider",
        priority: "alta",
        value: 3700000,
      },

      // Canadá
      {
        id: 27,
        title: "Sistema de Reciclagem Atmosférica",
        description:
          "Desenvolvimento de sistemas avançados de reciclagem de ar para missões longas.",
        country: "Canadá",
        category: "Sustentabilidade",
        status: "intacto",
        startDate: "2024-02-18",
        endDate: "2024-08-18",
        responsible: "Dr. David Tremblay",
        priority: "média",
        value: 2400000,
      },
      {
        id: 28,
        title: "Robótica Médica Espacial",
        description:
          "Desenvolvimento de robôs cirúrgicos para emergências médicas no espaço.",
        country: "Canadá",
        category: "Robótica",
        status: "danificado",
        startDate: "2024-01-08",
        endDate: "2024-07-08",
        responsible: "Dr. Sarah McDonald",
        priority: "crítica",
        value: 5800000,
      },

      // Europa (União Europeia)
      {
        id: 29,
        title: "Laboratório Orbital Automatizado",
        description:
          "Sistema de laboratório totalmente automatizado para experimentos contínuos.",
        country: "Europa",
        category: "Robótica",
        status: "intacto",
        startDate: "2024-03-01",
        endDate: "2024-10-01",
        responsible: "Dr. Alessandro Romano",
        priority: "alta",
        value: 7200000,
      },
      {
        id: 30,
        title: "Computação Neuromórfica",
        description:
          "Desenvolvimento de chips que imitam o funcionamento do cérebro humano.",
        country: "Europa",
        category: "Computação Quântica",
        status: "reparado",
        startDate: "2024-02-14",
        endDate: "2024-08-14",
        responsible: "Dr. Elena Popov",
        priority: "média",
        value: 4300000,
      },
    ];

    // Tarefas expandidas com mais de 30 itens
    const tasks = [
      {
        id: 1,
        title: "Diagnosticar Danos no Sistema de Cristalização",
        description:
          "Verificar integridade dos equipamentos de cristalização de proteínas após impacto.",
        priority: "alta",
        assignee: "Ana Silva",
        experimentId: 1,
        completed: true,
        dueDate: "2024-05-30",
        estimatedHours: 4,
      },
      {
        id: 2,
        title: "Recalibrar Sensores de Temperatura",
        description:
          "Ajustar sensores de temperatura do experimento de ligas metálicas.",
        priority: "crítica",
        assignee: "Carlos Mendes",
        experimentId: 2,
        completed: false,
        dueDate: "2024-05-29",
        estimatedHours: 6,
      },
      {
        id: 3,
        title: "Verificar Integridade Estrutural do Módulo Unity",
        description:
          "Inspeção completa da estrutura do módulo Unity após impacto.",
        priority: "crítica",
        assignee: "Michael Johnson",
        experimentId: 3,
        completed: true,
        dueDate: "2024-05-28",
        estimatedHours: 8,
      },
      {
        id: 4,
        title: "Restaurar Sistema de Cultivo de Tecidos",
        description: "Reparo dos equipamentos de cultivo de tecidos humanos.",
        priority: "crítica",
        assignee: "Sarah Williams",
        experimentId: 4,
        completed: false,
        dueDate: "2024-05-31",
        estimatedHours: 10,
      },
      {
        id: 5,
        title: "Testar Semicondutores Produzidos",
        description:
          "Análise de qualidade dos semicondutores após restabelecimento.",
        priority: "média",
        assignee: "Alexei Volkov",
        experimentId: 5,
        completed: true,
        dueDate: "2024-06-01",
        estimatedHours: 5,
      },
      {
        id: 6,
        title: "Recalibrar Equipamentos Quânticos",
        description: "Ajuste de precisão dos equipamentos de física quântica.",
        priority: "alta",
        assignee: "Natasha Petrov",
        experimentId: 6,
        completed: false,
        dueDate: "2024-06-02",
        estimatedHours: 12,
      },
      {
        id: 7,
        title: "Programar Robôs de Manutenção",
        description:
          "Atualização de software dos robôs autônomos de manutenção.",
        priority: "alta",
        assignee: "Hiroshi Tanaka",
        experimentId: 7,
        completed: true,
        dueDate: "2024-05-30",
        estimatedHours: 6,
      },
      {
        id: 8,
        title: "Sintetizar Novos Nanomateriais",
        description:
          "Produção de nanomateriais para substituir os danificados.",
        priority: "média",
        assignee: "Yuki Nakamura",
        experimentId: 8,
        completed: false,
        dueDate: "2024-06-03",
        estimatedHours: 8,
      },
      {
        id: 9,
        title: "Validar Produção Farmacêutica",
        description:
          "Teste de qualidade dos medicamentos biotecnológicos produzidos.",
        priority: "alta",
        assignee: "Klaus Weber",
        experimentId: 9,
        completed: true,
        dueDate: "2024-06-01",
        estimatedHours: 4,
      },
      {
        id: 10,
        title: "Implementar Sistema de Reciclagem",
        description:
          "Instalação de novos componentes do sistema de sustentabilidade.",
        priority: "média",
        assignee: "Ingrid Mueller",
        experimentId: 10,
        completed: false,
        dueDate: "2024-06-04",
        estimatedHours: 7,
      },
      {
        id: 11,
        title: "Calibrar Instrumentos Astronômicos",
        description:
          "Ajuste de precisão dos instrumentos de observação espacial.",
        priority: "baixa",
        assignee: "Marie Dubois",
        experimentId: 11,
        completed: true,
        dueDate: "2024-06-05",
        estimatedHours: 3,
      },
      {
        id: 12,
        title: "Analisar Amostras Genéticas",
        description:
          "Verificação da integridade das amostras genéticas após impacto.",
        priority: "alta",
        assignee: "Pierre Moreau",
        experimentId: 12,
        completed: false,
        dueDate: "2024-06-02",
        estimatedHours: 6,
      },
      {
        id: 13,
        title: "Testar Displays Flexíveis",
        description: "Verificação funcional das telas flexíveis desenvolvidas.",
        priority: "média",
        assignee: "Kim Min-jun",
        experimentId: 13,
        completed: true,
        dueDate: "2024-06-03",
        estimatedHours: 4,
      },
      {
        id: 14,
        title: "Produzir Alimentos Funcionais",
        description: "Síntese de novos alimentos funcionais para astronautas.",
        priority: "baixa",
        assignee: "Lee So-young",
        experimentId: 14,
        completed: false,
        dueDate: "2024-06-06",
        estimatedHours: 5,
      },
      {
        id: 15,
        title: "Estabelecer Comunicação Quântica",
        description: "Teste de comunicação quântica segura entre módulos.",
        priority: "alta",
        assignee: "Raj Patel",
        experimentId: 15,
        completed: true,
        dueDate: "2024-06-01",
        estimatedHours: 8,
      },
      {
        id: 16,
        title: "Cultivar Células-Tronco",
        description:
          "Retomada do cultivo de células-tronco para medicina regenerativa.",
        priority: "crítica",
        assignee: "Priya Sharma",
        experimentId: 16,
        completed: false,
        dueDate: "2024-05-31",
        estimatedHours: 12,
      },
      {
        id: 17,
        title: "Analisar Minerais Espaciais",
        description: "Classificação e análise de minerais coletados.",
        priority: "baixa",
        assignee: "James Mitchell",
        experimentId: 17,
        completed: true,
        dueDate: "2024-06-04",
        estimatedHours: 3,
      },
      {
        id: 18,
        title: "Programar Robôs de Mineração",
        description:
          "Atualização de algoritmos dos robôs de mineração asteroidal.",
        priority: "média",
        assignee: "Emma Thompson",
        experimentId: 18,
        completed: false,
        dueDate: "2024-06-05",
        estimatedHours: 9,
      },
      {
        id: 19,
        title: "Treinar IA Espacial",
        description:
          "Treinamento de algoritmos de inteligência artificial para controle autônomo.",
        priority: "alta",
        assignee: "Oliver Brown",
        experimentId: 19,
        completed: true,
        dueDate: "2024-06-02",
        estimatedHours: 10,
      },
      {
        id: 20,
        title: "Estudar Interações Moleculares",
        description: "Análise de comportamento molecular em microgravidade.",
        priority: "média",
        assignee: "Sophie Wilson",
        experimentId: 20,
        completed: false,
        dueDate: "2024-06-06",
        estimatedHours: 7,
      },
      {
        id: 21,
        title: "Implementar Agricultura Sustentável",
        description: "Instalação de sistemas agrícolas para missões longas.",
        priority: "média",
        assignee: "Anna van der Berg",
        experimentId: 21,
        completed: true,
        dueDate: "2024-06-03",
        estimatedHours: 6,
      },
      {
        id: 22,
        title: "Adaptar Organismos Marinhos",
        description:
          "Modificação de organismos marinhos para ambiente espacial.",
        priority: "baixa",
        assignee: "Pieter Jansen",
        experimentId: 22,
        completed: false,
        dueDate: "2024-06-07",
        estimatedHours: 8,
      },
      {
        id: 23,
        title: "Testar Propulsão Iônica",
        description: "Verificação funcional dos sistemas de propulsão iônica.",
        priority: "alta",
        assignee: "Erik Larsson",
        experimentId: 23,
        completed: true,
        dueDate: "2024-06-01",
        estimatedHours: 5,
      },
      {
        id: 24,
        title: "Sintetizar Biomateriais",
        description: "Produção de novos biomateriais para implantes médicos.",
        priority: "média",
        assignee: "Astrid Nilsson",
        experimentId: 24,
        completed: false,
        dueDate: "2024-06-04",
        estimatedHours: 7,
      },
      {
        id: 25,
        title: "Calibrar Cronômetros de Precisão",
        description:
          "Ajuste de sistemas de cronometragem para navegação espacial.",
        priority: "baixa",
        assignee: "Hans Zimmermann",
        experimentId: 25,
        completed: true,
        dueDate: "2024-06-05",
        estimatedHours: 3,
      },
      {
        id: 26,
        title: "Produzir Medicamentos Espaciais",
        description:
          "Síntese de medicamentos adaptados para condições espaciais.",
        priority: "alta",
        assignee: "Maria Schneider",
        experimentId: 26,
        completed: true,
        dueDate: "2024-05-30",
        estimatedHours: 8,
      },
      {
        id: 27,
        title: "Testar Reciclagem Atmosférica",
        description: "Verificação funcional dos sistemas de reciclagem de ar.",
        priority: "média",
        assignee: "David Tremblay",
        experimentId: 27,
        completed: true,
        dueDate: "2024-06-02",
        estimatedHours: 6,
      },
      {
        id: 28,
        title: "Calibrar Robôs Cirúrgicos",
        description: "Ajuste de precisão dos robôs cirúrgicos espaciais.",
        priority: "crítica",
        assignee: "Sarah McDonald",
        experimentId: 28,
        completed: false,
        dueDate: "2024-05-31",
        estimatedHours: 12,
      },
      {
        id: 29,
        title: "Automatizar Laboratório Orbital",
        description: "Programação completa do laboratório automatizado.",
        priority: "alta",
        assignee: "Alessandro Romano",
        experimentId: 29,
        completed: true,
        dueDate: "2024-06-01",
        estimatedHours: 10,
      },
      {
        id: 30,
        title: "Programar Chips Neuromórficos",
        description: "Configuração de chips que imitam funcionamento cerebral.",
        priority: "média",
        assignee: "Elena Popov",
        experimentId: 30,
        completed: true,
        dueDate: "2024-05-29",
        estimatedHours: 9,
      },
    ];

    localStorage.setItem("issExperiments", JSON.stringify(experiments));
    localStorage.setItem("issTasks", JSON.stringify(tasks));

    // Dados dos astronautas
    const astronauts = [
      {
        id: 1,
        name: "Akiko Tanaka",
        nationality: "Japão",
        role: "Comandante da Expedição",
        experience: "12.5 anos",
        missions: 4,
        location: "Unity Node",
        specialties: ["Medicina Espacial", "Robótica", "Liderança"],
        bio: "Especialista em medicina espacial com mais de uma década de experiência. Lidera as operações de recuperação pós-impacto com foco na segurança da tripulação.",
      },
      {
        id: 2,
        name: "Marco Rossi",
        nationality: "Itália",
        role: "Engenheiro de Sistemas",
        experience: "8.3 anos",
        missions: 2,
        location: "Columbus Lab",
        specialties: [
          "Engenharia Estrutural",
          "Sistemas de Suporte à Vida",
          "Manutenção",
        ],
        bio: "Engenheiro especializado em sistemas estruturais da ISS. Responsável pela avaliação de danos e coordenação dos reparos estruturais.",
      },
      {
        id: 3,
        name: "Klaus Weber",
        nationality: "Alemanha",
        role: "Especialista em Experimentos",
        experience: "15.1 anos",
        missions: 5,
        location: "Destiny Lab",
        specialties: [
          "Biotecnologia",
          "Física de Materiais",
          "Pesquisa Científica",
        ],
        bio: "Cientista veterano com vasta experiência em experimentos de microgravidade. Lidera os esforços de recuperação dos experimentos científicos.",
      },
      {
        id: 4,
        name: "Jennifer Martinez",
        nationality: "Estados Unidos",
        role: "Piloto e Especialista EVA",
        experience: "6.7 anos",
        missions: 3,
        location: "Cupola",
        specialties: [
          "Atividades Extraveiculares",
          "Pilotagem",
          "Comunicações",
        ],
        bio: "Piloto experiente e especialista em caminhadas espaciais. Coordena as operações externas de inspeção e reparo da estação.",
      },
      {
        id: 5,
        name: "Sergey Volkov",
        nationality: "Rússia",
        role: "Engenheiro de Voo",
        experience: "11.2 anos",
        missions: 4,
        location: "Zvezda",
        specialties: [
          "Sistemas de Propulsão",
          "Controle de Voo",
          "Mecânica Orbital",
        ],
        bio: "Engenheiro de voo experiente responsável pelos sistemas de navegação e controle orbital da ISS durante as operações de emergência.",
      },
      {
        id: 6,
        name: "Sarah Chen",
        nationality: "Canadá",
        role: "Especialista em Ciências da Vida",
        experience: "9.8 anos",
        missions: 3,
        location: "Kibo Lab",
        specialties: [
          "Biologia Espacial",
          "Medicina",
          "Sistemas de Suporte à Vida",
        ],
        bio: "Bióloga espacial especializada em experimentos de ciências da vida. Monitora os efeitos do impacto em experimentos biológicos críticos.",
      },
    ];

    localStorage.setItem("issAstronauts", JSON.stringify(astronauts));
  }

  getExperiments() {
    const data = localStorage.getItem("issExperiments");
    return data ? JSON.parse(data) : [];
  }

  getExperiment(id) {
    const experiments = this.getExperiments();
    return experiments.find((exp) => exp.id === id);
  }

  getExperimentWithTasks(id) {
    const experiment = this.getExperiment(id);
    if (!experiment) return null;

    const tasks = this.getTasksByExperiment(id);
    return { ...experiment, tasks };
  }

  updateExperiment(id, data) {
    const experiments = this.getExperiments();
    const index = experiments.findIndex((exp) => exp.id === id);
    if (index !== -1) {
      experiments[index] = { ...experiments[index], ...data };

      // Verificar se todas as tarefas foram concluídas para mudar status para "reparado"
      if (experiments[index].status === "danificado") {
        const experimentTasks = this.getTasksByExperiment(id);
        const allTasksCompleted =
          experimentTasks.length > 0 &&
          experimentTasks.every((task) => task.completed);
        if (allTasksCompleted) {
          experiments[index].status = "reparado";
        }
      }

      localStorage.setItem("issExperiments", JSON.stringify(experiments));
      return experiments[index];
    }
    return null;
  }

  getTasks() {
    const data = localStorage.getItem("issTasks");
    return data ? JSON.parse(data) : [];
  }

  getTasksByExperiment(experimentId) {
    const tasks = this.getTasks();
    return tasks.filter((task) => task.experimentId === experimentId);
  }

  getTask(id) {
    const tasks = this.getTasks();
    return tasks.find((task) => task.id === id);
  }

  createTask(taskData) {
    const tasks = this.getTasks();
    const newTask = {
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      ...taskData,
      completed: false,
    };
    tasks.push(newTask);
    localStorage.setItem("issTasks", JSON.stringify(tasks));
    return newTask;
  }

  updateTask(id, data) {
    const tasks = this.getTasks();
    const index = tasks.findIndex((task) => task.id === id);
    if (index !== -1) {
      tasks[index] = { ...tasks[index], ...data };
      localStorage.setItem("issTasks", JSON.stringify(tasks));

      // Verificar se o experimento deve ser marcado como reparado
      if (data.completed !== undefined) {
        const task = tasks[index];
        const experiment = this.getExperiment(task.experimentId);
        if (experiment && experiment.status === "danificado") {
          const experimentTasks = this.getTasksByExperiment(task.experimentId);
          const allTasksCompleted = experimentTasks.every((t) => t.completed);
          if (allTasksCompleted) {
            this.updateExperiment(task.experimentId, { status: "reparado" });
          }
        }
      }

      return tasks[index];
    }
    return null;
  }

  deleteTask(id) {
    const tasks = this.getTasks();
    const filteredTasks = tasks.filter((task) => task.id !== id);
    localStorage.setItem("issTasks", JSON.stringify(filteredTasks));
    return true;
  }

  getAstronauts() {
    const data = localStorage.getItem("issAstronauts");
    return data ? JSON.parse(data) : [];
  }

  getAstronaut(id) {
    const astronauts = this.getAstronauts();
    return astronauts.find((ast) => ast.id === id);
  }

  updateAstronaut(id, data) {
    const astronauts = this.getAstronauts();
    const index = astronauts.findIndex((ast) => ast.id === id);
    if (index !== -1) {
      astronauts[index] = { ...astronauts[index], ...data };
      localStorage.setItem("issAstronauts", JSON.stringify(astronauts));
      return astronauts[index];
    }
    return null;
  }

  getStatistics() {
    const experiments = this.getExperiments();
    const tasks = this.getTasks();

    const experimentStats = {
      total: experiments.length,
      intact: experiments.filter((exp) => exp.status === "intacto").length,
      damaged: experiments.filter((exp) => exp.status === "danificado").length,
      repaired: experiments.filter((exp) => exp.status === "reparado").length,
      recoveryProgress: Math.round(
        ((experiments.filter((exp) => exp.status === "intacto").length +
          experiments.filter((exp) => exp.status === "reparado").length) /
          experiments.length) *
          100
      ),
    };

    const taskStats = {
      total: tasks.length,
      completed: tasks.filter((task) => task.completed).length,
      pending: tasks.filter((task) => !task.completed).length,
      critical: tasks.filter(
        (task) => task.priority === "crítica" && !task.completed
      ).length,
    };

    // Agrupar por países
    const countriesMap = {};
    experiments.forEach((exp) => {
      if (!countriesMap[exp.country]) {
        countriesMap[exp.country] = {
          country: exp.country,
          count: 0,
          intact: 0,
          damaged: 0,
          repaired: 0,
        };
      }
      countriesMap[exp.country].count++;
      if (exp.status === "intacto") countriesMap[exp.country].intact++;
      else if (exp.status === "danificado") countriesMap[exp.country].damaged++;
      else if (exp.status === "reparado") countriesMap[exp.country].repaired++;
    });

    return {
      experiments: experimentStats,
      tasks: taskStats,
      breakdown: {
        countries: Object.values(countriesMap),
        categories: [...new Set(experiments.map((exp) => exp.category))].length,
      },
    };
  }

  getCachedNASAData(endpoint) {
    const cache = JSON.parse(localStorage.getItem("nasaCache") || "{}");
    const cached = cache[endpoint];
    if (cached && Date.now() - cached.timestamp < 3600000) {
      // 1 hora
      return cached.data;
    }
    return null;
  }

  setCachedNASAData(endpoint, data) {
    const cache = JSON.parse(localStorage.getItem("nasaCache") || "{}");
    cache[endpoint] = {
      data: data,
      timestamp: Date.now(),
    };
    localStorage.setItem("nasaCache", JSON.stringify(cache));
  }
}

// Instanciar o gerenciador de dados
const dataManager = new DataManager();
