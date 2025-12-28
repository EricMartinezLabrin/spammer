import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

/**
 * Reemplaza variables en formato {{1}}, {{2}}, etc. en un texto
 * @param {string} template - Texto con variables
 * @param {Object} variables - Objeto con las variables a reemplazar
 * @returns {string} Texto con variables reemplazadas
 */
export function replaceTemplateVariables(template, variables = {}) {
  if (!template || typeof template !== 'string') {
    return template;
  }

  // Reemplaza todas las variables en formato {{número}} o {{clave}}
  return template.replace(/\{\{(\d+|\w+)\}\}/g, (match, key) => {
    return variables[key] !== undefined ? variables[key] : match;
  });
}

/**
 * Extrae las variables de una plantilla
 * @param {string} template - Texto con variables
 * @returns {Array} Array con los números/claves de las variables encontradas
 */
export function extractTemplateVariables(template) {
  if (!template || typeof template !== 'string') {
    return [];
  }

  const matches = template.match(/\{\{(\d+|\w+)\}\}/g) || [];
  return matches.map(match => match.slice(2, -2));
}
