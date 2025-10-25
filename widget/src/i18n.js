/**
 * Internationalization (i18n) module for Indie Comments.
 * Contains all user-facing strings in Portuguese (PT-BR).
 */

const i18n = {
  // Server messages
  validationFailed: 'Falha na validação',
  failedToFetchComments: 'Falha ao buscar comentários',
  failedToFetchThreads: 'Falha ao buscar threads',
  failedToCreateComment: 'Falha ao criar comentário',
  failedToCreateThread: 'Falha ao criar thread',
  failedToFetchAdminComments: 'Falha ao buscar comentários do admin',
  failedToUpdateComment: 'Falha ao atualizar comentário',
  failedToCreateModerationLog: 'Falha ao criar log de moderação',
  failedToCreateUser: 'Falha ao criar usuário',
  loginFailed: 'Falha no login',
  failedToFetchApiUsageData: 'Falha ao buscar dados de uso da API',
  internalServerError: 'Erro interno do servidor',
  invalidEmailOrPassword: 'Email ou senha inválidos',
  loginSuccessful: 'Login bem-sucedido',

  // Widget messages
  serverError: 'Erro no servidor. Tente novamente mais tarde.',
  connectionError: 'Não foi possível conectar. Tente novamente em instantes.',
  commentSingular: 'comentário',
  commentPlural: 'comentários',
  exportCurrentThread: 'Exportar esta thread',
  exportAllThreads: 'Exportar todas as threads',
  themeLabel: 'Tema:',
  defaultTheme: 'Padrão',
  darkTheme: 'Dark',
  matrixTheme: 'Matrix',
  neocitiesTheme: 'NeoCities',
  loadingComments: 'Carregando comentários...',
  errorPrefix: 'Error:',
  noCommentsYet: 'No comments yet. Be the first to comment!',
  reply: 'Reply',
  demoCommentsLoaded: 'Comentários de demonstração carregados',
  localCommentsDisplayed: 'Exibindo comentários armazenados localmente',
  offlineCommentsDisplayed: 'Exibindo comentários armazenados localmente (offline)',
  errorLoadingComments: 'Erro ao carregar comentários. Tente novamente.',
  exportCompleted: '💾 Exportação concluída',
  exportFailed: '⚠️ Falha ao exportar comentários',

  // Admin messages
  commentsLoadedSuccessfully: 'Comentários carregados com sucesso!',
  errorLoadingComments: 'Erro ao carregar comentários:',
  errorLoadingStats: 'Erro ao carregar estatísticas:',
  commentStatusUpdated: 'Status do comentário {id} atualizado para {status}!',
  failedToUpdateComment: 'Falha ao atualizar comentário:',
  moderationActionLogged: 'Ação de moderação para o comentário {id} registrada.',
  failedToLogModerationAction: 'Falha ao registrar ação de moderação para o comentário {id}.',
  errorUpdatingComment: 'Erro ao atualizar comentário:',
  errorLoggingModerationAction: 'Erro ao registrar ação de moderação para o comentário {id}:',
  noCommentsFound: 'Nenhum comentário encontrado.',
  approve: 'Aprovar',
  reject: 'Rejeitar',
  markAsSpam: 'Marcar como Spam',
  viewThread: 'Ver Thread'
};

export default i18n;