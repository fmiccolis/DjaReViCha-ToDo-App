export const DOMAIN = "http://127.0.0.1:8000";
export const API_PATH = `${DOMAIN}/api/v1`;
export const AUTH_PATH = `${DOMAIN}/auth`;
export const REGISTRATION_PATH = `${AUTH_PATH}/registration`;

// todos
export const TODO_BASE = `${API_PATH}/todo`;
export const CREATE_TODO = `${TODO_BASE}/create`;
export const GET_TODOS = `${TODO_BASE}/all`;
export const GET_BY_OWNER = (ownerId: number) => `${TODO_BASE}/get-by-owner/${ownerId}`;
export const GET_TODO = (todoId: number) => `${TODO_BASE}/${todoId}/`;
export const UPDATE_TODO = (todoId: number) => `${TODO_BASE}/${todoId}/update`;
export const DELETE_TODO = (todoId: number) => `${TODO_BASE}/${todoId}/delete`;

// auth
export const LOGIN = `${AUTH_PATH}/login/`;
export const LOGOUT = `${AUTH_PATH}/logout/`;
export const CHANGE_PASSWORD = `${AUTH_PATH}/password/change/`;
export const RESET_PASSWORD = `${AUTH_PATH}/password/reset/`;
export const REGISTRATION = `${REGISTRATION_PATH}/`;
export const RESEND_EMAIL = `${REGISTRATION_PATH}/resend-email/`;
export const VERIFY_EMAIL = `${REGISTRATION_PATH}/verify-email/`;
export const REFRESH = `${AUTH_PATH}/token/refresh/`;