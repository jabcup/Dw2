const wordList = [
    {
        word: "guitarra",
        hint: "Un instrumento musical con cuerdas."
    },
    {
        word: "oxígeno",
        hint: "Un gas incoloro e inodoro esencial para la vida."
    },
    {
        word: "montaña",
        hint: "Una gran elevación natural de la superficie terrestre."
    },
    {
        word: "pintura",
        hint: "Una forma de arte que usa colores sobre una superficie para crear imágenes."
    },
    {
        word: "astronomía",
        hint: "El estudio científico de los objetos y fenómenos celestes."
    },
    {
        word: "fútbol",
        hint: "Un deporte popular jugado con un balón esférico."
    },
    {
        word: "chocolate",
        hint: "Un dulce hecho a partir de granos de cacao."
    },
    {
        word: "mariposa",
        hint: "Un insecto con alas coloridas y cuerpo delgado."
    },
    {
        word: "historia",
        hint: "El estudio de eventos pasados y la civilización humana."
    },
    {
        word: "pizza",
        hint: "Un plato salado con una base redonda y plana cubierta de ingredientes."
    },
    {
        word: "jazz",
        hint: "Un género musical caracterizado por la improvisación y sincopación."
    },
    {
        word: "cámara",
        hint: "Dispositivo usado para capturar imágenes o videos."
    },
    {
        word: "diamante",
        hint: "Una gema preciosa conocida por su brillo y dureza."
    },
    {
        word: "aventura",
        hint: "Una experiencia emocionante o audaz."
    },
    {
        word: "ciencia",
        hint: "El estudio sistemático de la estructura y comportamiento del mundo físico."
    },
    {
        word: "bicicleta",
        hint: "Un vehículo de dos ruedas impulsado por pedales."
    },
    {
        word: "atardecer",
        hint: "La desaparición diaria del sol bajo el horizonte."
    },
    {
        word: "café",
        hint: "Una bebida popular con cafeína, hecha de granos tostados."
    },
    {
        word: "baile",
        hint: "Movimiento rítmico del cuerpo, usualmente al compás de música."
    },
    {
        word: "galaxia",
        hint: "Un sistema vasto de estrellas, gas y polvo unidos por gravedad."
    },
    {
        word: "orquesta",
        hint: "Un gran conjunto de músicos que tocan diversos instrumentos."
    },
    {
        word: "volcán",
        hint: "Una montaña que expulsa lava, rocas y gases desde su interior."
    },
    {
        word: "novela",
        hint: "Una obra extensa de ficción, con trama y personajes complejos."
    },
    {
        word: "escultura",
        hint: "Arte tridimensional creado al moldear materiales."
    },
    {
        word: "sinfonía",
        hint: "Una composición musical larga para orquesta, en múltiples movimientos."
    },
    {
        word: "arquitectura",
        hint: "El arte y ciencia de diseñar y construir edificios."
    },
    {
        word: "ballet",
        hint: "Una forma de danza clásica con movimientos precisos y gráciles."
    },
    {
        word: "astronauta",
        hint: "Persona entrenada para viajar y trabajar en el espacio."
    },
    {
        word: "cascada",
        hint: "Una caída de agua desde cierta altura."
    },
    {
        word: "tecnología",
        hint: "La aplicación de conocimientos científicos para fines prácticos."
    },
    {
        word: "arcoíris",
        hint: "Fenómeno meteorológico causado por la refracción de la luz en gotas de agua."
    },
    {
        word: "universo",
        hint: "Todo lo que existe: materia, espacio, tiempo y energía."
    },
    {
        word: "piano",
        hint: "Instrumento musical de teclas que accionan martillos sobre cuerdas."
    },
    {
        word: "vacaciones",
        hint: "Período dedicado al descanso, placer o recreación."
    },
    {
        word: "selva",
        hint: "Bosque denso con alta biodiversidad y lluvias abundantes."
    },
    {
        word: "teatro",
        hint: "Lugar donde se representan obras dramáticas o musicales."
    },
    {
        word: "teléfono",
        hint: "Dispositivo para transmitir sonidos a distancia."
    },
    {
        word: "idioma",
        hint: "Sistema de comunicación con palabras, gestos y reglas gramaticales."
    },
    {
        word: "desierto",
        hint: "Territorio árido con escasa precipitación."
    },
    {
        word: "girasol",
        hint: "Planta alta con una gran flor amarilla."
    },
    {
        word: "fantasía",
        hint: "Género literario o artístico con elementos mágicos o sobrenaturales."
    },
    {
        word: "telescopio",
        hint: "Instrumento óptico para observar objetos lejanos en el espacio."
    },
    {
        word: "brisa",
        hint: "Viento suave y agradable."
    },
    {
        word: "oasis",
        hint: "Zona fértil en un desierto donde hay agua."
    },
    {
        word: "fotografía",
        hint: "Arte de capturar imágenes usando luz y sensores."
    },
    {
        word: "safari",
        hint: "Expedición para observar animales en su hábitat natural."
    },
    {
        word: "planeta",
        hint: "Cuerpo celeste que orbita una estrella sin emitir luz propia."
    },
    {
        word: "río",
        hint: "Corriente natural de agua que fluye hacia el mar o un lago."
    },
    {
        word: "tropical",
        hint: "Relativo a la región entre los trópicos de Cáncer y Capricornio."
    },
    {
        word: "misterioso",
        hint: "Algo difícil de entender, explicar o identificar."
    },
    {
        word: "enigma",
        hint: "Algo que resulta desconcertante o inexplicable."
    },
    {
        word: "paradoja",
        hint: "Afirmación que parece contradictoria pero puede ser verdadera."
    },
    {
        word: "rompecabezas",
        hint: "Juego o problema que desafía el ingenio."
    },
    {
        word: "susurro",
        hint: "Hablar en voz muy baja, casi inaudible."
    },
    {
        word: "sombra",
        hint: "Área oscura creada cuando un objeto bloquea la luz."
    },
    {
        word: "secreto",
        hint: "Algo oculto o desconocido para los demás."
    },
    {
        word: "curiosidad",
        hint: "Deseo intenso de aprender o saber algo."
    },
    {
        word: "impredecible",
        hint: "Que no puede ser anticipado o previsto."
    },
    {
        word: "ofuscar",
        hint: "Confundir o enturbiar el entendimiento de algo."
    },
    {
        word: "revelar",
        hint: "Dar a conocer algo que estaba oculto."
    },
    {
        word: "ilusión",
        hint: "Percepción o creencia falsa o engañosa."
    },
    {
        word: "luz de luna",
        hint: "La luz que refleja la luna durante la noche."
    },
    {
        word: "vibrante",
        hint: "Lleno de energía, color o vitalidad."
    },
    {
        word: "nostalgia",
        hint: "Sentimiento de añoranza por el pasado."
    },
    {
        word: "brillante",
        hint: "Excepcionalmente inteligente, talentoso o impresionante."
    }
];