# 🛰️ ISS Monitor

**Sistema de monitoramento e recuperação de experimentos científicos da Estação Espacial Internacional (ISS).**

🌐 **Demo online:** [sistema-de-monitoramento-iss.vercel.app](https://sistema-de-monitoramento-iss.vercel.app/)

## 📋 Visão Geral
Painel de monitoramento simulado da ISS com gerenciamento de experimentos científicos, tarefas de recuperação, estatísticas de missão e integração com APIs públicas da NASA. Projeto frontend estático com persistência local e componentes interativos.

## 🚀 Tecnologias
- **HTML5** - Estrutura semântica
- **CSS3** - Estilos com animações e efeitos (glass, twinkle, pulse)
- **JavaScript (ES6+)** - Lógica da aplicação, DataManager, APIs
- **LocalStorage** - Persistência de dados local
- **Vercel** - Hospedagem e deploy

## ✨ Funcionalidades Principais
### 🧪 **Monitoramento de Experimentos**
- Listagem com filtros (status, país, categoria) e busca
- Paginação de resultados
- Cards com status e prioridade visual
- Modal de detalhes com tarefas associadas

### ✅ **Sistema de Tarefas**
- CRUD completo (criar, ler, atualizar, excluir)
- Organização por criticidade
- Controle de tarefas pendentes vs concluídas

### 📊 **Estatísticas da Missão**
- Widgets resumidos em tempo real
- Gráficos de experimentos e tarefas
- Distribuição por país/origem
- Timeline de atividades

### 🌌 **Integração NASA APIs**
- APOD (Astronomy Picture of the Day)
- Fotos de Marte (Rover Curiosity)
- Near Earth Objects (NEOs)
- Dados de clima espacial

### 🔔 **Sistema de Notificações**
- Toast notifications para ações
- Efeitos visuais (star field, animações CSS)
- Interface glassmorphism

## ⚡ Como Executar

### **Método rápido (sem servidor):**
```bash
# Simplesmente abra o arquivo index.html no navegador
```

### **Com servidor local (recomendado):**
```bash
# 1. Instale as dependências (opcional)
npm install

# 2. Inicie o servidor
npm run start
# Acesse: http://localhost:5000
```

### **Alternativa com Python:**
```bash
python -m http.server 8000
```

## 🔧 Configuração API NASA
1. Obtenha uma chave gratuita em [api.nasa.gov](https://api.nasa.gov)
2. No painel do ISS Monitor, vá para **Configurações > API Keys**
3. Cole sua chave para ativar as funcionalidades da NASA

## 🎯 Competências Demonstradas
- ✅ **Consumo de APIs REST** (NASA, dados simulados)
- ✅ **Gerenciamento de estado** com DataManager
- ✅ **Interface responsiva** com efeitos visuais
- ✅ **Persistência local** (LocalStorage)
- ✅ **Componentes interativos** (modais, filtros, gráficos)
- ✅ **Deploy profissional** com Vercel

---

<div align="center">
  
  **Monitorando a fronteira final**
  
  <a href="https://sistema-de-monitoramento-iss.vercel.app">
    <img src="https://img.shields.io/badge/🚀_Acessar_Painel-0078D7?style=for-the-badge" alt="Acessar Painel">
  </a>
  
  <p><em>Projeto educacional não afiliado à NASA ou agências espaciais.</em></p>
</div>
