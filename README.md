# Juego diseñado para nerds

La aplicación proporciona una experiencia única de simulación de béisbol en la que los jugadores deben responder preguntas de biología para avanzar en el juego en lugar de simplemente lanzar y batear la pelota. Este enfoque especial no solo brinda diversión y emoción a los jugadores, sino que también les da la oportunidad de aprender mientras juegan.

## Reglas del juego

Como se mencionaba anteriormente esta aplicación está basada en las reglas de un partido oficial de béisbol. Las diferencias radican en la mecánica del juego, sin embargo las definiciones de los conceptos son respetadas. 

En el juego, el número de participantes a jugar deberá ser de dos integrantes, uno por equipo. Cuando la aplicación haya iniciado, se pedirá a ambos jugadores que ingresen el nombre de su equipo/jugador. Primero al jugador uno y después al jugador dos.

Una vez los jugadores hayan ingresado sus nombres, el juego iniciará siempre con la primera pregunta del indice del arreglo, es decir, su posición cero. Esto aplicará para ambos turnos.
En consecuencia, las preguntas que se realicen a cada jugador después de la primer pregunta, serán completamente aleatorias sin que se repitan. 


Los lanzamientos son reemplazados por preguntas de conocimiento acerca de la asignatura biología. 
El concepto de strike equivale al número de preguntas incorrectas contestadas.
Cada participante dispondrá de 3 strikes por turno, cuando se haya completado 3 de 3, su contador se reiniciará a 0 y el turno automáticamente pasará al siguente jugador 
Por cada pregunta correcta contestada se le sumará un punto y avanzará a la siguiente base 
Cuando un jugador haya completado las cuatro bases, se le aumentara una carrera y el número de bases acumulados se reiniciarán a 0
El partido está limitado por 4 entradas, las entradas son el número total de turnos hechos por cada jugador. Sin embargo, la duración del juego dependerá en gran medida de la cantidad disponible de preguntas 
Cuando el partido llegue a su límite de entradas, se emitirá un reconocimiento al ganador del partido
El conteo del ganador solo se efectuará si el partido llega a las 4 entradas totales, por otro lado, si el banco de preguntas se acaba, se presentará un mensaje informado que se han terminado
Los criterios para definir el ganador se harán en base al número de puntaje y no de carreras, esto con el fin de evitar empates
El nivel de dificultad de cada pregunta está basado en la base en la que se encuentren:
Base 1: nivel fácil
Base 2: nivel intermedio
Base 3: nivel dificil 
Base 4: nivel experto


Los jugadores deben seleccionar las preguntas a través de las flechas del teclado, cuando estén seguros de su respuesta deben de presionar la tecla enter. 


Notas importantes 

Las preguntas NO se repeterán en el turno de cada participante, esto quiere decir que las preguntas podrán llegar a coincidir entre turnos.
El juego se saldrá de ejecución cuando una base se quede sin preguntas
El nombre que se ingrese al momento de asignar el nombre al jugador deberá contener como máximo de caracteres 15, solo acepta caracteres alfanumericos y no debe contener espacios.


### Instrucciones

Sigue las intrucciones para un correcto funcionamiento

#### Instalación

- GLOBAL

```
npm install -g beisbol-para-nerds
```
* LOCAL
```
npm install beisbol-para-nerds
```

