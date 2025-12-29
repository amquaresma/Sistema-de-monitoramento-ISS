// Sistema JavaScript completo para ISS Monitor
let currentPage = 1;
let itemsPerPage = 6;
let filteredExperiments = [];
let currentFilters = {
  status: "all",
  country: "",
  category: "",
  search: "",
};

// Inicialização do sistema
document.addEventListener("DOMContentLoaded", function () {
  initializeStarField();
  initializeNavigation();
  initializeEventListeners();
  loadExperimentsPage();
  loadTasksPage();
  loadStatisticsPage();
  loadAstronautsPage();
  loadNASAPage();
});

// Campo de estrelas animado
function initializeStarField() {
  const starField = document.getElementById("starField");
  const numStars = 150;

  for (let i = 0; i < numStars; i++) {
    const star = document.createElement("div");
    star.className = "star";
    star.style.left = Math.random() * 100 + "%";
    star.style.top = Math.random() * 100 + "%";
    star.style.width = star.style.height = Math.random() * 3 + 1 + "px";
    star.style.animationDelay = Math.random() * 3 + "s";
    starField.appendChild(star);
  }
}

// Navegação
function initializeNavigation() {
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.getElementById("navMenu");

  navToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // Fechar menu ao clicar em link
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
    });
  });
}

// Event listeners gerais
function initializeEventListeners() {
  // Navegação entre páginas
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const page = link.dataset.page;
      showPage(page);
    });
  });

  // Filtros de experimentos
  document.querySelectorAll(".filter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      document
        .querySelectorAll(".filter-btn")
        .forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilters.status = btn.dataset.status;
      currentPage = 1;
      renderExperiments();
    });
  });

  // Filtros de select
  document.getElementById("countryFilter").addEventListener("change", (e) => {
    currentFilters.country = e.target.value;
    currentPage = 1;
    renderExperiments();
  });

  document.getElementById("categoryFilter").addEventListener("change", (e) => {
    currentFilters.category = e.target.value;
    currentPage = 1;
    renderExperiments();
  });

  // Busca
  document.getElementById("searchInput").addEventListener("input", (e) => {
    currentFilters.search = e.target.value.toLowerCase();
    currentPage = 1;
    renderExperiments();
  });

  // Formulário de tarefas
  document
    .getElementById("taskForm")
    .addEventListener("submit", handleTaskSubmit);

  // Fechar modais ao clicar fora
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("modal")) {
      closeModal();
      closeTaskModal();
    }
  });
}

// Mostrar página
function showPage(page) {
  // Atualizar navegação
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
  });
  document.querySelector(`[data-page="${page}"]`).classList.add("active");

  // Mostrar página
  document.querySelectorAll(".page").forEach((p) => {
    p.classList.remove("active");
  });
  document.getElementById(`${page}Page`).classList.add("active");

  // Carregar dados específicos da página
  switch (page) {
    case "experiments":
      loadExperimentsPage();
      break;
    case "tasks":
      loadTasksPage();
      break;
    case "statistics":
      loadStatisticsPage();
      break;
    case "astronauts":
      loadAstronautsPage();
      break;
    case "nasa":
      loadNASAPage();
      break;
  }
}

// Página de Experimentos
function loadExperimentsPage() {
  populateFilters();
  renderExperiments();
}

function populateFilters() {
  const experiments = dataManager.getExperiments();

  // Países únicos
  const countries = [...new Set(experiments.map((exp) => exp.country))].sort();
  const countrySelect = document.getElementById("countryFilter");
  countrySelect.innerHTML = '<option value="">Todos os Países</option>';
  countries.forEach((country) => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countrySelect.appendChild(option);
  });

  // Categorias únicas
  const categories = [
    ...new Set(experiments.map((exp) => exp.category)),
  ].sort();
  const categorySelect = document.getElementById("categoryFilter");
  categorySelect.innerHTML = '<option value="">Todas as Categorias</option>';
  categories.forEach((category) => {
    const option = document.createElement("option");
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  });
}

function renderExperiments() {
  const experiments = dataManager.getExperiments();
  filteredExperiments = filterExperiments(experiments);

  updateExperimentsStats(filteredExperiments);
  renderExperimentsGrid(filteredExperiments);
  renderPagination(filteredExperiments);
}

function filterExperiments(experiments) {
  return experiments.filter((exp) => {
    const matchesStatus =
      currentFilters.status === "all" || exp.status === currentFilters.status;
    const matchesCountry =
      !currentFilters.country || exp.country === currentFilters.country;
    const matchesCategory =
      !currentFilters.category || exp.category === currentFilters.category;
    const matchesSearch =
      !currentFilters.search ||
      exp.title.toLowerCase().includes(currentFilters.search) ||
      exp.description.toLowerCase().includes(currentFilters.search) ||
      exp.responsible.toLowerCase().includes(currentFilters.search);

    return matchesStatus && matchesCountry && matchesCategory && matchesSearch;
  });
}

function updateExperimentsStats(experiments) {
  const intact = experiments.filter((exp) => exp.status === "intacto").length;
  const damaged = experiments.filter(
    (exp) => exp.status === "danificado"
  ).length;
  const recoveryProgress =
    experiments.length > 0
      ? Math.round((intact / experiments.length) * 100)
      : 0;

  document.getElementById("totalExperiments").textContent = experiments.length;
  document.getElementById("intactExperiments").textContent = intact;
  document.getElementById("damagedExperiments").textContent = damaged;
  document.getElementById(
    "recoveryProgress"
  ).textContent = `${recoveryProgress}%`;
}

function renderExperimentsGrid(experiments) {
  const grid = document.getElementById("experimentsGrid");
  const start = (currentPage - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const pageExperiments = experiments.slice(start, end);

  grid.innerHTML = pageExperiments
    .map(
      (exp) => `
        <div class="experiment-card animate-slide-in" onclick="openExperimentModal(${
          exp.id
        })">
            <div class="experiment-header">
                <div class="status-indicator">
                    <div class="status-dot ${exp.status}"></div>
                    <span class="status-badge ${exp.status}">${
        exp.status
      }</span>
                </div>
                <span class="priority-badge ${exp.priority}">${
        exp.priority
      }</span>
            </div>
            
            <div class="experiment-illustration">
                <i class="fas ${getExperimentIcon(exp.category)} ${
        exp.status
      }"></i>
            </div>
            
            <h3 class="experiment-title">${exp.title}</h3>
            
            <div class="experiment-details">
                <div class="experiment-detail">
                    <i class="fas fa-flag"></i>
                    <span>${exp.country}</span>
                </div>
                <div class="experiment-detail">
                    <i class="fas fa-tag"></i>
                    <span>${exp.category}</span>
                </div>
                <div class="experiment-detail">
                    <i class="fas fa-user"></i>
                    <span>${exp.responsible}</span>
                </div>
                <div class="experiment-detail">
                    <i class="fas fa-calendar"></i>
                    <span>${formatDate(exp.startDate)}</span>
                </div>
            </div>
            
            <p class="experiment-description">${exp.description}</p>
        </div>
    `
    )
    .join("");
}

function getExperimentIcon(category) {
  const icons = {
    Física: "fa-atom",
    Medicina: "fa-heartbeat",
    Biotecnologia: "fa-dna",
    Metalurgia: "fa-cog",
    Nanotecnologia: "fa-microchip",
    "Computação Quântica": "fa-quantum",
    Robótica: "fa-robot",
    Sustentabilidade: "fa-leaf",
    Genética: "fa-dna",
    Astronomia: "fa-telescope",
    Eletrônica: "fa-microchip",
    Geologia: "fa-mountain",
    Computação: "fa-laptop-code",
    Engenharia: "fa-wrench",
  };
  return icons[category] || "fa-flask";
}

function renderPagination(experiments) {
  const pagination = document.getElementById("pagination");
  const totalPages = Math.ceil(experiments.length / itemsPerPage);

  if (totalPages <= 1) {
    pagination.innerHTML = "";
    return;
  }

  let paginationHTML = "";

  // Botão anterior
  paginationHTML += `
        <button onclick="changePage(${currentPage - 1})" ${
    currentPage === 1 ? "disabled" : ""
  }>
            <i class="fas fa-chevron-left"></i>
        </button>
    `;

  // Números das páginas
  for (let i = 1; i <= totalPages; i++) {
    if (
      i === 1 ||
      i === totalPages ||
      (i >= currentPage - 1 && i <= currentPage + 1)
    ) {
      paginationHTML += `
                <button onclick="changePage(${i})" ${
        i === currentPage ? 'class="active"' : ""
      }>
                    ${i}
                </button>
            `;
    } else if (i === currentPage - 2 || i === currentPage + 2) {
      paginationHTML += "<span>...</span>";
    }
  }

  // Botão próximo
  paginationHTML += `
        <button onclick="changePage(${currentPage + 1})" ${
    currentPage === totalPages ? "disabled" : ""
  }>
            <i class="fas fa-chevron-right"></i>
        </button>
    `;

  pagination.innerHTML = paginationHTML;
}

function changePage(page) {
  const totalPages = Math.ceil(filteredExperiments.length / itemsPerPage);
  if (page >= 1 && page <= totalPages) {
    currentPage = page;
    renderExperimentsGrid(filteredExperiments);
    renderPagination(filteredExperiments);
  }
}

// Modal de Experimento
function openExperimentModal(experimentId) {
  const experiment = dataManager.getExperimentWithTasks(experimentId);
  if (!experiment) return;

  const modal = document.getElementById("experimentModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = experiment.title;

  modalBody.innerHTML = `
        <div class="modal-experiment-details">
            <div class="modal-detail-group">
                <div class="modal-detail-label">Status</div>
                <div class="modal-detail-value">
                    <span class="status-badge ${experiment.status}">${
    experiment.status
  }</span>
                </div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">País</div>
                <div class="modal-detail-value">${experiment.country}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Categoria</div>
                <div class="modal-detail-value">${experiment.category}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Responsável</div>
                <div class="modal-detail-value">${experiment.responsible}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Prioridade</div>
                <div class="modal-detail-value">
                    <span class="priority-badge ${experiment.priority}">${
    experiment.priority
  }</span>
                </div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Período</div>
                <div class="modal-detail-value">${formatDate(
                  experiment.startDate
                )} - ${formatDate(experiment.endDate)}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Valor</div>
                <div class="modal-detail-value">$${experiment.value.toLocaleString()}</div>
            </div>
        </div>
        
        <div class="modal-description">
            <p>${experiment.description}</p>
        </div>
        
        ${renderTasksSection(experiment)}
    `;

  modal.classList.add("active");
}

function renderTasksSection(experiment) {
  const tasks = experiment.tasks || [];
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter((task) => !task.completed);

  return `
        <div class="modal-tasks-section">
            <div class="modal-tasks-header">
                <h3 class="modal-tasks-title">
                    <i class="fas fa-tasks"></i>
                    Tarefas de Recuperação (${completedTasks.length}/${
    tasks.length
  })
                </h3>
                <button class="add-task-btn" onclick="openTaskModal(${
                  experiment.id
                })">
                    <i class="fas fa-plus"></i>
                    Adicionar Tarefa
                </button>
            </div>
            
            ${
              tasks.length > 0
                ? `
                <div class="modal-tasks-list">
                    ${tasks
                      .map((task) => renderTaskItem(task, experiment))
                      .join("")}
                </div>
            `
                : `
                <p style="color: #9CA3AF; text-align: center; padding: 2rem;">
                    Nenhuma tarefa de recuperação criada ainda.
                </p>
            `
            }
        </div>
    `;
}

function renderIntactSection() {
  return `
        <div class="intact-section glass-effect">
            <h2 class="section-title">
                <i class="fas fa-check-circle" style="color: var(--success-green);"></i>
                Experimentos Intactos
            </h2>
            <p style="color: #D1D5DB; text-align: center; padding: 2rem;">
                Estes experimentos não foram afetados pelo impacto e continuam operando normalmente.
                Monitoramento contínuo está ativo para garantir que permaneçam estáveis.
            </p>
        </div>
    `;
}

function renderTaskItem(task, experiment = null) {
  return `
        <div class="task-item ${task.completed ? "completed" : ""}">
            <div class="task-content">
                <input type="checkbox" 
                       class="task-checkbox" 
                       ${task.completed ? "checked" : ""} 
                       onchange="toggleTask(${task.id}, this.checked)">
                <div class="task-info">
                    <div class="task-header">
                        <h4 class="task-title">${task.title}</h4>
                        <div class="task-meta">
                            ${
                              experiment
                                ? `<span class="task-experiment">${experiment.title}</span>`
                                : ""
                            }
                            <span class="task-assignee">👨‍🚀 ${
                              task.assignee
                            }</span>
                            <span class="priority-badge ${task.priority}">${
    task.priority
  }</span>
                        </div>
                    </div>
                    ${
                      task.description
                        ? `<p class="task-description">${task.description}</p>`
                        : ""
                    }
                </div>
            </div>
        </div>
    `;
}

function closeModal() {
  document.getElementById("experimentModal").classList.remove("active");
}

function openTaskModal(experimentId) {
  const modal = document.getElementById("taskModal");
  modal.dataset.experimentId = experimentId;
  modal.classList.add("active");

  // Limpar formulário
  document.getElementById("taskForm").reset();
}

function closeTaskModal() {
  document.getElementById("taskModal").classList.remove("active");
}

function handleTaskSubmit(e) {
  e.preventDefault();

  const modal = document.getElementById("taskModal");
  const experimentId = parseInt(modal.dataset.experimentId);

  const taskData = {
    title: document.getElementById("taskTitle").value,
    description: document.getElementById("taskDescription").value,
    priority: document.getElementById("taskPriority").value,
    assignee: document.getElementById("taskAssignee").value,
    experimentId: experimentId,
    dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0], // 7 dias
    estimatedHours: 4,
  };

  dataManager.createTask(taskData);
  closeTaskModal();

  // Atualizar modal se estiver aberto
  if (document.getElementById("experimentModal").classList.contains("active")) {
    openExperimentModal(experimentId);
  }

  // Atualizar página de tarefas
  loadTasksPage();

  showToast("Sucesso", "Tarefa criada com sucesso!", "success");
}

function toggleTask(taskId, completed) {
  dataManager.updateTask(taskId, { completed });
  loadTasksPage();
  loadStatisticsPage();

  showToast(
    "Atualizado",
    completed
      ? "Tarefa marcada como concluída!"
      : "Tarefa marcada como pendente.",
    "success"
  );
}

// Página de Tarefas
function loadTasksPage() {
  const tasks = dataManager.getTasks();
  const experiments = dataManager.getExperiments();

  updateTaskStats(tasks);
  renderTaskSections(tasks, experiments);
  renderRecoveryOverview(experiments, tasks);
}

function updateTaskStats(tasks) {
  const completed = tasks.filter((task) => task.completed).length;
  const critical = tasks.filter(
    (task) => task.priority === "crítica" && !task.completed
  ).length;
  const pending = tasks.filter((task) => !task.completed).length;

  document.getElementById("totalTasks").textContent = tasks.length;
  document.getElementById("criticalTasks").textContent = critical;
  document.getElementById("pendingTasks").textContent = pending;
  document.getElementById("completedTasks").textContent = completed;
}

function renderTaskSections(tasks, experiments) {
  const criticalTasks = tasks.filter(
    (task) => task.priority === "crítica" && !task.completed
  );
  const completedTasks = tasks.filter((task) => task.completed);
  const pendingTasks = tasks.filter(
    (task) => !task.completed && task.priority !== "crítica"
  );

  renderTaskList("criticalTasksList", criticalTasks, experiments);
  renderTaskList("completedTasksList", completedTasks, experiments);
  renderTaskList("pendingTasksList", pendingTasks, experiments);
}

function renderTaskList(containerId, tasks, experiments) {
  const container = document.getElementById(containerId);

  if (tasks.length === 0) {
    container.innerHTML = `
            <p style="color: #9CA3AF; text-align: center; padding: 2rem;">
                ${
                  containerId === "criticalTasksList"
                    ? "Nenhuma tarefa crítica pendente"
                    : containerId === "completedTasksList"
                    ? "Nenhuma tarefa concluída ainda"
                    : "Nenhuma tarefa pendente"
                }
            </p>
        `;
    return;
  }

  container.innerHTML = tasks
    .map((task) => {
      const experiment = experiments.find(
        (exp) => exp.id === task.experimentId
      );
      return renderTaskItem(task, experiment);
    })
    .join("");
}

function renderRecoveryOverview(experiments, tasks) {
  const recoveryGrid = document.getElementById("recoveryGrid");

  // Agrupar experimentos por país
  const countriesData = {};
  experiments.forEach((exp) => {
    if (!countriesData[exp.country]) {
      countriesData[exp.country] = { total: 0, intact: 0 };
    }
    countriesData[exp.country].total++;
    if (exp.status === "intacto") {
      countriesData[exp.country].intact++;
    }
  });

  recoveryGrid.innerHTML = Object.entries(countriesData)
    .map(([country, data]) => {
      const progress = Math.round((data.intact / data.total) * 100);
      return `
            <div class="recovery-item">
                <h4 class="recovery-title">${country}</h4>
                <div class="recovery-progress">
                    <div class="recovery-bar" style="width: ${progress}%"></div>
                </div>
                <span class="recovery-percent">${progress}% recuperado</span>
            </div>
        `;
    })
    .join("");
}

// Página de Estatísticas
function loadStatisticsPage() {
  const stats = dataManager.getStatistics();
  updateMainStats(stats);
  renderCharts(stats);
  renderCountriesGrid(stats);
  renderMissionTimeline(stats);
}

function updateMainStats(stats) {
  document.getElementById("countriesCount").textContent =
    stats.breakdown.countries.length;
}

function renderCharts(stats) {
  renderExperimentsChart(stats.experiments);
  renderTasksChart(stats.tasks);
}

function renderExperimentsChart(experimentsStats) {
  const chartContent = document.getElementById("experimentsChart");
  const total = experimentsStats.total;
  const intact = experimentsStats.intact;
  const damaged = experimentsStats.damaged;
  const intactPercentage = total > 0 ? Math.round((intact / total) * 100) : 0;

  chartContent.innerHTML = `
        <div class="chart-placeholder">
            <div class="chart-center">
                <div class="chart-number">${intactPercentage}%</div>
                <div class="chart-label">Intactos</div>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
            <span style="color: var(--success-green);">Intactos: ${intact}</span>
            <span style="color: var(--critical-red);">Danificados: ${damaged}</span>
        </div>
    `;
}

function renderTasksChart(tasksStats) {
  const chartContent = document.getElementById("tasksChart");
  const total = tasksStats.total;
  const completed = tasksStats.completed;
  const completedPercentage =
    total > 0 ? Math.round((completed / total) * 100) : 0;

  chartContent.innerHTML = `
        <div class="chart-placeholder">
            <div class="chart-center">
                <div class="chart-number">${completedPercentage}%</div>
                <div class="chart-label">Concluídas</div>
            </div>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 1rem;">
            <span style="color: var(--success-green);">Concluídas: ${completed}</span>
            <span style="color: var(--iss-gold);">Pendentes: ${tasksStats.pending}</span>
        </div>
    `;
}

function renderCountriesGrid(stats) {
  const countriesGrid = document.getElementById("countriesGrid");

  const countryFlags = {
    Brasil: "🇧🇷",
    "Estados Unidos": "🇺🇸",
    Rússia: "🇷🇺",
    Japão: "🇯🇵",
    Alemanha: "🇩🇪",
    França: "🇫🇷",
    "Coreia do Sul": "🇰🇷",
    Índia: "🇮🇳",
    Austrália: "🇦🇺",
    "Reino Unido": "🇬🇧",
    Holanda: "🇳🇱",
    Suécia: "🇸🇪",
    Suíça: "🇨🇭",
    Canadá: "🇨🇦",
    Europa: "🇪🇺",
  };

  countriesGrid.innerHTML = stats.breakdown.countries
    .map(
      (country) => `
        <div class="country-item">
            <div class="country-flag">${
              countryFlags[country.country] || "🌍"
            }</div>
            <h4 class="country-name">${country.country}</h4>
            <div class="country-stats">
                <span class="country-intact">${country.intact} intactos</span>
                <span class="country-damaged">${
                  country.damaged
                } danificados</span>
            </div>
        </div>
    `
    )
    .join("");
}

function renderMissionTimeline(stats) {
  const timeline = document.getElementById("missionTimeline");

  const timelineEvents = [
    {
      time: "28/05/2024 - 14:30",
      title: "Impacto do Meteoro",
      description:
        "Objeto não identificado colide com o módulo Unity, causando danos estruturais.",
    },
    {
      time: "28/05/2024 - 14:45",
      title: "Ativação do Protocolo de Emergência",
      description:
        "Tripulação inicia procedimentos de segurança e avaliação inicial dos danos.",
    },
    {
      time: "28/05/2024 - 16:00",
      title: "Primeira Avaliação Completada",
      description:
        "Relatório inicial revela comprometimento de múltiplos experimentos científicos.",
    },
    {
      time: "29/05/2024 - 08:00",
      title: "Início das Operações de Recuperação",
      description:
        "Equipes terrestres e espaciais coordenam esforços de restauração dos sistemas.",
    },
    {
      time: "30/05/2024 - Presente",
      title: "Operações de Recuperação em Andamento",
      description: `${stats.tasks.completed} de ${stats.tasks.total} tarefas de recuperação concluídas.`,
    },
  ];

  timeline.innerHTML = timelineEvents
    .map(
      (event) => `
        <div class="timeline-item">
            <div class="timeline-time">${event.time}</div>
            <h4 class="timeline-title">${event.title}</h4>
            <p class="timeline-description">${event.description}</p>
        </div>
    `
    )
    .join("");
}

// Página de Astronautas
function loadAstronautsPage() {
  const astronauts = dataManager.getAstronauts();
  updateAstronautStats(astronauts);
  renderAstronautsGrid(astronauts);
  renderStationLayout(astronauts);
}

function updateAstronautStats(astronauts) {
  const nationalities = [...new Set(astronauts.map((ast) => ast.nationality))];
  const totalMissions = astronauts.reduce((sum, ast) => sum + ast.missions, 0);
  const avgExperience =
    astronauts.reduce((sum, ast) => sum + parseFloat(ast.experience), 0) /
    astronauts.length;

  document.getElementById("totalAstronauts").textContent = astronauts.length;
  document.getElementById("astronautNationalities").textContent =
    nationalities.length;
  document.getElementById("totalMissions").textContent = totalMissions;
  document.getElementById("avgExperience").textContent =
    avgExperience.toFixed(1);
}

function renderAstronautsGrid(astronauts) {
  const grid = document.getElementById("astronautsGrid");

  const flagEmojis = {
    Japão: "🇯🇵",
    Itália: "🇮🇹",
    Alemanha: "🇩🇪",
    "Estados Unidos": "🇺🇸",
  };

  grid.innerHTML = astronauts
    .map(
      (astronaut) => `
        <div class="astronaut-card" onclick="openAstronautModal(${
          astronaut.id
        })">
            <div class="astronaut-avatar">
                ${flagEmojis[astronaut.nationality] || "👨‍🚀"}
                <div class="astronaut-status"></div>
            </div>
            <h3 class="astronaut-name">${astronaut.name}</h3>
            <p class="astronaut-role">${astronaut.role}</p>
            <div class="astronaut-details">
                <div class="astronaut-detail">
                    <span class="detail-label">Nacionalidade:</span>
                    <span class="detail-value">${astronaut.nationality}</span>
                </div>
                <div class="astronaut-detail">
                    <span class="detail-label">Experiência:</span>
                    <span class="detail-value">${astronaut.experience}</span>
                </div>
                <div class="astronaut-detail">
                    <span class="detail-label">Missões:</span>
                    <span class="detail-value">${astronaut.missions}</span>
                </div>
                <div class="astronaut-detail">
                    <span class="detail-label">Localização:</span>
                    <span class="detail-value">${astronaut.location}</span>
                </div>
            </div>
        </div>
    `
    )
    .join("");
}

function renderStationLayout(astronauts) {
  const layout = document.getElementById("stationLayout");

  const stationModules = [
    { name: "Unity Node", icon: "fa-circle-nodes" },
    { name: "Destiny Lab", icon: "fa-flask" },
    { name: "Columbus Lab", icon: "fa-microscope" },
    { name: "Kibo Lab", icon: "fa-robot" },
    { name: "Cupola", icon: "fa-eye" },
    { name: "PMM Leonardo", icon: "fa-boxes-stacked" },
    { name: "Airlock", icon: "fa-door-open" },
    { name: "Docking Port", icon: "fa-link" },
    { name: "Solar Arrays", icon: "fa-solar-panel" },
  ];

  layout.innerHTML = stationModules
    .map((module) => {
      const astronaut = astronauts.find((ast) => ast.location === module.name);
      return `
            <div class="station-module ${astronaut ? "occupied" : ""}">
                <i class="module-icon fas ${module.icon}"></i>
                <div class="module-name">${module.name}</div>
                ${
                  astronaut
                    ? `<div class="module-astronaut">${
                        astronaut.name.split(" ")[0]
                      }</div>`
                    : ""
                }
            </div>
        `;
    })
    .join("");
}

// Página NASA APIs
function loadNASAPage() {
  initializeNASAApiKey();
  loadNASAData();
}

function initializeNASAApiKey() {
  const apiKey = localStorage.getItem("nasaApiKey") || "DEMO_KEY";
  document.getElementById("nasaApiKey").value = apiKey;
}

async function loadNASAData() {
  updateAPIStatus("loading");

  try {
    await Promise.all([
      loadAPOD(),
      loadMarsPhotos(),
      loadNearEarthObjects(),
      loadSpaceWeather(),
    ]);
    updateAPIStatus("connected");
  } catch (error) {
    console.error("Erro ao carregar dados da NASA:", error);
    updateAPIStatus("error");
  }
}

function updateAPIStatus(status) {
  const indicators = document.querySelectorAll(".api-indicator .status-dot");
  indicators.forEach((dot) => {
    dot.className = `status-dot ${status}`;
  });
}

async function loadAPOD() {
  try {
    const apiKey = getCurrentNASAApiKey();
    const cached = dataManager.getCachedNASAData("apod");

    let data;
    if (cached) {
      data = cached;
    } else {
      const response = await fetch(
        `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`
      );
      if (!response.ok) throw new Error("Erro na API APOD");
      data = await response.json();
      dataManager.setCachedNASAData("apod", data);
    }

    const content = document.getElementById("apodContent");
    content.innerHTML = `
            <div class="apod-content">
                ${
                  data.media_type === "image"
                    ? `<img src="${data.url}" alt="${data.title}" class="apod-image">`
                    : `<iframe src="${data.url}" class="apod-video" frameborder="0"></iframe>`
                }
                <h3 class="apod-title">${data.title}</h3>
                <p class="apod-explanation">${data.explanation}</p>
            </div>
        `;

    document
      .getElementById("apodStatus")
      .querySelector(".status-dot").className = "status-dot connected";
  } catch (error) {
    document.getElementById("apodContent").innerHTML = `
            <div class="loading-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar imagem do dia. Verifique sua chave da API.</p>
            </div>
        `;
    document
      .getElementById("apodStatus")
      .querySelector(".status-dot").className = "status-dot error";
  }
}

async function loadMarsPhotos() {
  try {
    const apiKey = getCurrentNASAApiKey();
    const cached = dataManager.getCachedNASAData("mars");

    let data;
    if (cached) {
      data = cached;
    } else {
      const response = await fetch(
        `https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${apiKey}`
      );
      if (!response.ok) throw new Error("Erro na API Mars Photos");
      data = await response.json();
      dataManager.setCachedNASAData("mars", data);
    }

    const container = document.getElementById("marsPhotos");
    const photos = data.photos.slice(0, 6); // Mostrar apenas 6 fotos

    container.innerHTML = photos
      .map(
        (photo) => `
            <div class="mars-photo">
                <img src="${photo.img_src}" alt="Mars Rover Photo" loading="lazy">
                <div class="mars-info">
                    <div class="mars-date">${photo.earth_date}</div>
                    <div class="mars-camera">${photo.camera.full_name}</div>
                </div>
            </div>
        `
      )
      .join("");

    document
      .getElementById("marsStatus")
      .querySelector(".status-dot").className = "status-dot connected";
  } catch (error) {
    document.getElementById("marsPhotos").innerHTML = `
            <div class="loading-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar fotos de Marte. Verifique sua chave da API.</p>
            </div>
        `;
    document
      .getElementById("marsStatus")
      .querySelector(".status-dot").className = "status-dot error";
  }
}

async function loadNearEarthObjects() {
  try {
    const apiKey = getCurrentNASAApiKey();
    const cached = dataManager.getCachedNASAData("neo");

    let data;
    if (cached) {
      data = cached;
    } else {
      const today = new Date().toISOString().split("T")[0];
      const response = await fetch(
        `https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${apiKey}`
      );
      if (!response.ok) throw new Error("Erro na API NEO");
      data = await response.json();
      dataManager.setCachedNASAData("neo", data);
    }

    const container = document.getElementById("neoContent");
    const objects = Object.values(data.near_earth_objects)[0] || [];

    if (objects.length === 0) {
      container.innerHTML = `
                <div class="loading-placeholder">
                    <i class="fas fa-info-circle"></i>
                    <p>Nenhum objeto próximo à Terra detectado hoje.</p>
                </div>
            `;
      return;
    }

    container.innerHTML = `
            <div class="neo-list">
                ${objects
                  .slice(0, 5)
                  .map(
                    (obj) => `
                    <div class="neo-item ${
                      obj.is_potentially_hazardous_asteroid
                        ? "neo-hazardous"
                        : ""
                    }">
                        <h4 class="neo-name">${obj.name}</h4>
                        <div class="neo-details">
                            <div class="neo-detail">
                                <span class="neo-label">Diâmetro:</span>
                                <span class="neo-value">${Math.round(
                                  obj.estimated_diameter.meters
                                    .estimated_diameter_max
                                )} m</span>
                            </div>
                            <div class="neo-detail">
                                <span class="neo-label">Velocidade:</span>
                                <span class="neo-value">${Math.round(
                                  obj.close_approach_data[0].relative_velocity
                                    .kilometers_per_hour
                                )} km/h</span>
                            </div>
                            <div class="neo-detail">
                                <span class="neo-label">Distância:</span>
                                <span class="neo-value">${Math.round(
                                  obj.close_approach_data[0].miss_distance
                                    .kilometers
                                )} km</span>
                            </div>
                        </div>
                    </div>
                `
                  )
                  .join("")}
            </div>
        `;

    document
      .getElementById("neoStatus")
      .querySelector(".status-dot").className = "status-dot connected";
  } catch (error) {
    document.getElementById("neoContent").innerHTML = `
            <div class="loading-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar objetos próximos à Terra. Verifique sua chave da API.</p>
            </div>
        `;
    document
      .getElementById("neoStatus")
      .querySelector(".status-dot").className = "status-dot error";
  }
}

async function loadSpaceWeather() {
  try {
    // Simulação de dados de clima espacial (API real requer configuração específica)
    const weatherData = [
      {
        title: "Atividade Solar",
        value: "Moderada",
        description: "Atividade solar dentro dos parâmetros normais",
        icon: "fa-sun",
      },
      {
        title: "Vento Solar",
        value: "420 km/s",
        description: "Velocidade do vento solar estável",
        icon: "fa-wind",
      },
      {
        title: "Campo Magnético",
        value: "5.2 nT",
        description: "Intensidade do campo magnético terrestre",
        icon: "fa-magnet",
      },
      {
        title: "Radiação Cósmica",
        value: "Baixa",
        description: "Níveis de radiação seguros para EVA",
        icon: "fa-radiation",
      },
    ];

    const container = document.getElementById("spaceWeather");
    container.innerHTML = weatherData
      .map(
        (item) => `
            <div class="weather-item">
                <i class="weather-icon fas ${item.icon}"></i>
                <h4 class="weather-title">${item.title}</h4>
                <div class="weather-value">${item.value}</div>
                <p class="weather-description">${item.description}</p>
            </div>
        `
      )
      .join("");

    document
      .getElementById("spaceWeatherStatus")
      .querySelector(".status-dot").className = "status-dot connected";
  } catch (error) {
    document.getElementById("spaceWeather").innerHTML = `
            <div class="loading-placeholder">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar dados do clima espacial.</p>
            </div>
        `;
    document
      .getElementById("spaceWeatherStatus")
      .querySelector(".status-dot").className = "status-dot error";
  }
}

function getCurrentNASAApiKey() {
  return localStorage.getItem("nasaApiKey") || "DEMO_KEY";
}

function updateNASAApiKey() {
  const apiKey = document.getElementById("nasaApiKey").value.trim();
  if (apiKey) {
    localStorage.setItem("nasaApiKey", apiKey);
    showToast(
      "Configuração Salva",
      "Chave da API NASA atualizada com sucesso!",
      "success"
    );

    // Limpar cache para forçar nova busca
    localStorage.setItem("nasaCache", JSON.stringify({}));

    // Recarregar dados
    loadNASAData();
  } else {
    showToast("Erro", "Por favor, insira uma chave de API válida.", "error");
  }
}

function refreshNASAData() {
  // Limpar cache
  localStorage.setItem("nasaCache", JSON.stringify({}));

  // Recarregar dados
  loadNASAData();

  showToast(
    "Dados Atualizados",
    "Cache limpo e dados recarregados!",
    "success"
  );
}

function openAstronautModal(astronautId) {
  const astronaut = dataManager.getAstronaut(astronautId);
  if (!astronaut) return;

  const modal = document.getElementById("experimentModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalBody = document.getElementById("modalBody");

  modalTitle.textContent = astronaut.name;

  modalBody.innerHTML = `
        <div class="modal-experiment-details">
            <div class="modal-detail-group">
                <div class="modal-detail-label">Nacionalidade</div>
                <div class="modal-detail-value">${astronaut.nationality}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Função</div>
                <div class="modal-detail-value">${astronaut.role}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Experiência</div>
                <div class="modal-detail-value">${astronaut.experience}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Missões</div>
                <div class="modal-detail-value">${astronaut.missions}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Localização Atual</div>
                <div class="modal-detail-value">${astronaut.location}</div>
            </div>
            <div class="modal-detail-group">
                <div class="modal-detail-label">Especialidades</div>
                <div class="modal-detail-value">${astronaut.specialties.join(
                  ", "
                )}</div>
            </div>
        </div>
        
        <div class="modal-description">
            <h4>Biografia</h4>
            <p>${astronaut.bio}</p>
        </div>
    `;

  modal.classList.add("active");
}

// Sistema de notificações toast
function showToast(title, description, type = "success") {
  const toastContainer = document.getElementById("toastContainer");
  const toast = document.createElement("div");
  toast.className = `toast ${type}`;

  toast.innerHTML = `
        <div class="toast-header">
            <span class="toast-title">${title}</span>
            <button class="toast-close" onclick="this.parentElement.parentElement.remove()">×</button>
        </div>
        <div class="toast-description">${description}</div>
    `;

  toastContainer.appendChild(toast);

  // Auto remover após 5 segundos
  setTimeout(() => {
    if (toast.parentElement) {
      toast.remove();
    }
  }, 5000);
}

// Utilitários
function formatDate(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("pt-BR");
}

function formatPriority(priority) {
  const priorities = {
    baixa: "Baixa",
    média: "Média",
    alta: "Alta",
    crítica: "Crítica",
  };
  return priorities[priority] || priority;
}

function formatStatus(status) {
  const statuses = {
    intacto: "Intacto",
    danificado: "Danificado",
  };
  return statuses[status] || status;
}
