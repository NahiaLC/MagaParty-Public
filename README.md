# MagaParty-Public
Juego de preguntas sobre manga, anime, videojuegos (relacionados con Japón) de 2 a 6 equipos con un master.
EL master es como el presentador del juego, quien es el único que ve las respuestas (que salen en consola) y el que controla el juego.

Como iniciar juego (modo desarollo):

    npm install
    npm start

**INSTRUCCIONES PARA EL MASTER:**
- Abrir consola (ctrl+shift+i)

Comandos de juego:

    S -> Start reloj principal
    D -> Tirar dado
    Enter -> Control de tarjetas (Portada -> Pregunta -> Qitar...)
    Espacio -> Start/Stop contrareloj
    H -> Poner/Quitar trajeta no mires
    N -> Respuesta incorrecta
    Y -> Respuesta correcta
    1 -> Seleccionar Verdadero en vf
    2 -> Seleccionar Falso en vf
    T -> Empezar crono vf
    ctrl+1 -> Sumar al jugador 1
    ctrl+2 -> Sumar al jugador 2
    ctrl+3 -> Sumar al jugador 3
    ctrl+4 -> Sumar al jugador 4
    ctrl+5 -> Sumar al jugador 5
    ctrl+6 -> Sumar al jugador 6
    shif+1 -> Restar al jugador 1
    shif+2 -> Restar al jugador 2
    shif+3 -> Restar al jugador 3
    shif+4 -> Restar al jugador 4
    shif+5 -> Restar al jugador 5
    shif+6 -> Restar al jugador 6

Comandos sonidos:

    C -> Cri, Cri, Cri
    P -> Penny, Penny, Penny
    Q -> Silence
    X -> Nein, Nein, Nein
    Z -> Zasca

Pruebas:
- Pregunta & Cultura japonesa: Tipica pregunta respuesta (controles: enter + Y | N)
- Reaper: Igual que pregunta, pero con una dificultad extrema (controles: enter + Y | N)
- Mímica: Uno del equipo hace mímica y los demás adivinan (controles: enter + mostrar la mímica H, otra vez H para ocultarla y empezar tiempo + Y | N)
- Música: Suena la música y adivinar (controles: enter + Y | N)
- Silueta: Adivinar silueta (controles: enter + Y | N)
- Tabú: Como mímica pero la carta siempre se muestra, asegurarse de que el resto del equipo no mire (controles: enter + mostrar H y empezar tiempo + Y | N)
- Verdadero y Falso: Preguntas sobre el tema mostrado en portada (controles: enter + para empezar tiempo T + Y | N)