#!/usr/bin/env node

//@ts-check
import inquirer from "inquirer"; //importación de la libreria inquier
import { nuevaPregunta } from "./data/preguntas.js"; //importación de la clase nueva pregunta
import { Quiz } from "./Class/Quiz.js"; //importación de la clase Quiz
import figlet from "figlet"; //importación de la libreria Figlet
import colors from "colors";

export function main() {
  const quiz = new Quiz(nuevaPregunta); // instancia un nuevo quiz con el conjunto de preguntas
  const quiz2 = new Quiz(nuevaPregunta); // instancia un nuevo quiz con el conjunto de preguntas
  let entrada = 0; // contador para el número de entradas
  let user1; // almacena el nickname del primer jugador
  let user2; // almacena el nickname del segundo jugador
  const introduccion =
    "Este juego está basado en la emulación de un juego de béisbol. Antes de empezar a jugar, se recomienda ampliamente la lectura de las instrucciones. Sin más, ¡empecemos el juego! ¡Que se diviertan!";

  /**
   * Muestra un mensaje al finalizar el juego y determina el ganador o empate
   * @param {Object} quiz
   * @param {Object} quiz2
   */

  // Argumentos pasados por referencia
  function mensajeSalida(quiz, quiz2) {
    figlet("El partido ha culminado", (err, result) => {
      console.log(result?.green);
      // Uso de la libreria figlet
    });

    // Comparación del puntaje obtenido de cada jugador
    if (quiz.puntaje > quiz2.puntaje) {
      figlet(`Gana el jugador ${user1}!!`, (err, result) => {
        console.log(result?.rainbow);
      });
    } else if (quiz.puntaje < quiz2.puntaje) {
      figlet(`Gana el jugador ${user2}!!`, (err, result) => {
        console.log(result?.rainbow);
      });
    } else if (quiz2.puntaje === quiz.puntaje) {
      figlet(`Ha sido un empate`, (err, result) => {
        console.log(result?.gray);
      });
    }
  }

  // Es ejecutada cuando el banco de preguntas por base se acaba
  function sinPreguntas() {
    figlet(`Las preguntas han culminado`, (err, result) => {
      console.log(result?.yellow);
    });
  }

  console.log(introduccion.italic);

  // Pide el nickname del primer jugador
  inquirer
    .prompt({
      name: "jugador1", // Se le asigna el valor a la propiedad name
      type: "input", // Se le asigna el tipo de input por el cual se va a mostrar las preguntas
      message: "Ingresa el nickname del primer jugador:", // Mensaje de inicialización
    })
    // Genera una promesa y retorna un valor que es asignado por argumento
    .then((user) => {
      // Expresión regular para comprobar la validez del nombre ingresado
      const regex = /^[a-zA-Z0-9]{1,15}$/;

      if (!regex.test(user.jugador1)) {
        console.log("Nombre no válido".red);
        console.log("Vuelve a iniciar el juego e ingresa un nombre válido");
        return;
      }
      //Se le atribuye el valor del obejeto user
      user1 = user.jugador1;

      // Pide el nickname del segundo jugador
      inquirer
        .prompt({
          name: "jugador2",
          type: "input",
          message: "Ingresa el nickname del segundo jugador:",
        })
        .then((user) => {
          if (!regex.test(user.jugador2)) {
            console.log("Nombre no válido".red);
            console.log("Vuelve a iniciar el juego e ingresa un nombre válido");
            user2 = false;
          } else {
            user2 = user.jugador2;
          }
        })
        .then(() => {
          if (!user2) {
            return;
          }
          guest1(user1); // Ejecución del programa de manera inicial

          /**
           *
           * @param {String} jugador
           */
          function guest2(jugador) {
            const opciones = quiz2.posicionPregunta().opcion;
            inquirer
              .prompt([
                {
                  name: "respuesta",
                  type: "list",
                  // Uso de las templates strings para mostrar el nickname del jugador actual
                  message: `Turno de ${jugador.red}. Dificultad: ${
                    quiz2.posicionPregunta().dificultad // Hace nota en qué nivel se encuentra el jugador
                  }. ${
                    // Es mostrada la pregunta accediendo a la propiedad pregunta
                    quiz2.posicionPregunta().pregunta
                  }`,
                  choices: opciones,
                },
              ])
              .then((answer) => {
                quiz2.intento(answer.respuesta);

                if (quiz2.puntaje === 1) {
                  console.log("Puntos:", "✔".green);
                } else if (quiz2.puntaje > 1) {
                  console.log("Puntos:", quiz2.puntaje, "✔".green);
                }

                console.log("Entrada:", entrada, "/", 4);

                if (quiz2.strike === 1) {
                  console.log("Strike:", "X".red);
                } else if (quiz2.strike === 2) {
                  console.log("Strike:", "XX".red);
                }

                // @ts-ignore
                if (quiz2.azar === false) {
                  // Compara si el banco de preguntas se ha agotado
                  // Ejecuta la funcion para mostrarlo en consola
                  sinPreguntas();
                  // Sale del flujo de la aplicación
                  return;
                }
                if (quiz2.out === false) {
                  guest2(user2);
                } else {
                  // Después de que ambos jugadores hayan tenido su turno, la variable entrada aumenta
                  entrada++;

                  // Valida la entrada del juego
                  if (entrada === 4) {
                    // Si la entrada es 4, se ejecuta la funcion mensajeSalida
                    // Los argumentos son pasados por referencia
                    return mensajeSalida(quiz, quiz2);
                  }
                  console.log("Strike:", "XXX".red);

                  // Turno del jugador uno
                  guest1(user1);
                }
              });
          }

          /**
           * La función representa el turno del jugador, que es llamada así misma si el jugador no está en out
           * @param {String} jugador
           */
          //argumento pasado por valor
          function guest1(jugador) {
            const opciones = quiz.posicionPregunta().opcion; // obtiene las opciones de la pregunta actual
            inquirer
              .prompt([
                {
                  name: "respuesta", // Se le es asignado el valor a la propiedad name
                  type: "list", //Es seleccionado la interfaz por la cual será expresada las opciones

                  message: `Turno de ${jugador.cyan}. Dificultad: ${
                    // Es mostrada la pregunta accediendo a la propiedad pregunta
                    quiz.posicionPregunta().dificultad // Hace nota en qué nivel se encuentra el jugador
                  }. ${
                    // Uso de las templates strings para mostrar el nickname del jugador actual
                    quiz.posicionPregunta().pregunta
                  }`,
                  choices: opciones, // Son asignadas las opciones a la propiedad choices
                },
              ])
              // El objeto retornado es la respuesta seleccionada por el jugador
              .then((answer) => {
                quiz.intento(answer.respuesta); // Se accede a al método intento de la clase Quiz para ejecutar la respusta del objeto retornado por la promsa

                if (quiz.puntaje === 1) {
                  console.log("Puntos:", "✔".green);
                } else if (quiz.puntaje > 1) {
                  console.log("Puntos:", quiz.puntaje, "✔".green);
                }

                console.log("Entrada:", entrada, "/", 4);

                if (quiz.strike === 1) {
                  console.log("Strike:", "X".red);
                } else if (quiz.strike === 2) {
                  console.log("Strike:", "XX".red);
                }

                // @ts-ignore ignora el problema de comparación entre los valores primitivos, Number y Boolean
                if (quiz.azar === false) {
                  // Compara si el banco de preguntas se ha agotado
                  // Ejecuta la funcion para mostrarlo en consola
                  sinPreguntas();
                  //Sale del flujo de la aplicación
                  return;
                }

                // Valida si el jugador ha llegado a su límite de strikes
                if (!quiz.out) {
                  // Se vuelve a ejecutar para continuar el turno del jugador
                  guest1(user1);
                } else {
                  console.log("Strike:", "XXX".red);

                  //Si el jugador ha llegado a su máximo de strikes, pasa el turno al siguiente participante
                  guest2(user2);
                }
              });
          }
        });
    });
}

// Ejecución del programa
main();
