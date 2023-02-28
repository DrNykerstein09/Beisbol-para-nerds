import data from "./data.js"; // Importación de las preguntas 
import { Pregunta } from "../Class/Pregunta.js"; // Importación de la clase Pregunta

// La exportación se hace desde la declaración de la nueva pregunta
 
export const nuevaPregunta = data.map(
  (pregunta, index) =>
    new Pregunta(pregunta.pregunta, pregunta.opciones, pregunta.respuesta, pregunta.dificultad, index)
);

