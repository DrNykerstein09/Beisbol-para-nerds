// @ts-check
import { Pregunta } from "./Pregunta.js";

export class Quiz {
  // Variables para almacenar los números generados en cada base
  numerosGenerados1 = [0];
  numerosGenerados2 = [];
  numerosGenerados3 = [];
  numerosGenerados4 = [];

  // Puntaje actual del jugador
  puntaje = 0;

  // Número aleatorio generado y su índice en el arreglo de preguntas
  numeroAleatorio;
  azar = 0;

  // Base en la que se encuentra el jugador
  base = 0;

  // Carrera actual del jugador
  carrera = 0;

  // Cantidad de strikes del jugador
  strike = 0;

  // Boleano que indica si el jugador tiene out
  out = false;

  /**
   * Constructor de la clase Quiz
   * @param {Pregunta[]} pregunta recibe un arreglo de preguntas a utilizar en el juego
   */
  constructor(pregunta) {
    this.pregunta = pregunta;
  }

  /**
   *  Retorna la pregunta que corresponde al número aleatorio
   * @returns {Pregunta}
   */
  posicionPregunta() {
    return this.pregunta[this.azar];
  }

  /**
   * Método que se ejecuta cuando el jugador intenta responder una pregunta
   * @param {String} respuesta Respuesta proporcionada por el jugador
   */
  intento(respuesta) {
    if (this.posicionPregunta().respuestaCorrecta(respuesta)) {
      // Si la respuesta es correcta, se aumenta la base y el puntaje
      this.base++;
      this.puntaje++;
      // Comprueba el numero de carrera que lleva el jugador
      this.comprobarStrike();
      this.comprobarCarrera();
    } else {
      // Si la respuesta es incorrecta, se aumenta el número de strikes
      this.strike++;
      // Comprueba el numero de strikes que lleva el jugador
      this.comprobarStrike();
    }

    // Dependiendo de la base actual, se genera un nuevo número aleatorio
    switch (this.base) {
      // Si es la primera base, se genera una pregunta aleatoria en el nivel de dificultad 1
      case 0:
        if (this.azar === 0 || this.base === 0) {
          this.numeroAleatorio = this.generadorNumeros(0, 9);
          this.azar = this.numeroAleatorio();
        }
        break;

      // Si es la segunda base, se genera una pregunta aleatoria en el nivel de dificultad 2
      case 1:
        this.numeroAleatorio = this.generadorNumeros(10, 19);
        this.azar = this.numeroAleatorio();
        break;

      // Si es la tercera base, se genera una pregunta aleatoria en el nivel de dificultad 3
      case 2:
        this.numeroAleatorio = this.generadorNumeros(20, 29);
        this.azar = this.numeroAleatorio();
        break;

      // Si es la cuarta base, se genera una pregunta aleatoria en el nivel de dificultad 4
      case 3:
        this.numeroAleatorio = this.generadorNumeros(30, 39);
        this.azar = this.numeroAleatorio();
        break;
      default:
        break;
    }

    // Se verifica si se completó una carrera
    this.comprobarCarrera();
  }

  /**
   * Método que verifica si se completó una carrera y aumenta el contador correspondiente
   */
  comprobarCarrera() {
    if (this.base === 4) {
      this.carrera++;
      this.base = 0;
    }
  }

  /**
   * Método que comprueba los strikes, respuestas malas, del jugador
   */
  comprobarStrike() {
    if (this.strike === 3) {
      this.out = true;
      this.strike = 0;
    } else {
      this.out = false;
    }
  }

  /**
   * Recibe dos parámetros, el minimo y el máximo para poder general un intervalo
   * @param {Number} min
   * @param {Number} max
   * @returns
   */
  generadorNumeros(min, max) {
    // Definición de la función interna que genera números aleatorios
    function numeroAleatorio() {
      // Uso de la librería math para producir números aleatorios 
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // Selección del arreglo de números generados en función del número base
    if (this.base === 0) {
      return () => {
        // Comprueba si se han generado todos los números posibles dentro del rango
        if (this.numerosGenerados1.length === max - min + 1) {
          return false;
        }

        // Genera un nuevo número aleatorio hasta que no esté en el arreglo de números generados
        let nuevoNumero0;
        do {
          nuevoNumero0 = numeroAleatorio(); // Se genera un numero al azar 
        } while (this.numerosGenerados1.includes(nuevoNumero0)); // es ejecutado mientras el arreglo de números generados no incluya el número repetido 

        // Si el número generado es cero, se añade
        // if (!this.numerosGenerados1.includes(0)) {
        //   this.numerosGenerados1.push(0);
        // }

        // Añade el nuevo número generado al arreglo de números
        this.numerosGenerados1.push(nuevoNumero0);

        return nuevoNumero0;
      };
    }
    if (this.base === 1) {
      return () => {
        if (this.numerosGenerados2.length === max - min + 1) {
          return false;
        }

        let nuevoNumero;
        do {
          nuevoNumero = numeroAleatorio();
        } while (this.numerosGenerados2.includes(nuevoNumero));

        this.numerosGenerados2.push(nuevoNumero);

        return nuevoNumero;
      };
    }
    if (this.base === 2) {
      return () => {
        if (this.numerosGenerados3.length === max - min + 1) {
          return false;
        }

        let nuevoNumero;
        do {
          nuevoNumero = numeroAleatorio();
        } while (this.numerosGenerados3.includes(nuevoNumero));

        this.numerosGenerados3.push(nuevoNumero);

        return nuevoNumero;
      };
    }
    if (this.base === 3) {
      return () => {
        if (this.numerosGenerados4.length === max - min + 1) {
          return false;
        }

        let nuevoNumero;
        do {
          nuevoNumero = numeroAleatorio();
        } while (this.numerosGenerados4.includes(nuevoNumero));

        this.numerosGenerados4.push(nuevoNumero);

        return nuevoNumero;
      };
    }
  }
}
