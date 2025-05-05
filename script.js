// Variables para la pelota
let pelota = {
    x: 0,
    y: 0,
    radio: 30,
    velocidadX: 0,
    velocidadY: 0,
    activa: false,
    color: '#ff5722'
};

function setup() {
    // Crear un lienzo de 600x400 pixeles
    createCanvas(600, 400);

    // Inicializar la posición de la pelota en el centro
    pelota.x = width / 2;
    pelota.y = height / 2;
}

function draw() {
    // Fondo blanco
    background(255);

    // Dibujar la pelota
    fill(pelota.color);
    stroke(0);
    strokeWeight(2);
    circle(pelota.x, pelota.y, pelota.radio * 2);

    // Si la pelota está activa, actualizar su posición
    if (pelota.activa) {
        actualizarPelota();
    }
}

function actualizarPelota() {
    // Mover la pelota según su velocidad
    pelota.x += pelota.velocidadX;
    pelota.y += pelota.velocidadY;

    // Comprobar colisiones con los bordes horizontales
    if (pelota.x - pelota.radio <= 0 || pelota.x + pelota.radio >= width) {
        // Invertir la velocidad X
        pelota.velocidadX *= -1;

        // Si choca con la pared izquierda
        if (pelota.x - pelota.radio <= 0) {
            pelota.x = pelota.radio;
        }
        // Si choca con la pared derecha
        else if (pelota.x + pelota.radio >= width) {
            pelota.x = width - pelota.radio;
        }
    }

    // Comprobar colisiones con los bordes verticales
    if (pelota.y - pelota.radio <= 0 || pelota.y + pelota.radio >= height) {
        // Invertir la velocidad Y
        pelota.velocidadY *= -1;

        // Si choca con el techo
        if (pelota.y - pelota.radio <= 0) {
            pelota.y = pelota.radio;
        }
        // Si choca con el suelo
        else if (pelota.y + pelota.radio >= height) {
            pelota.y = height - pelota.radio;
        }
    }

    // Aplicar un poco de fricción
    pelota.velocidadX *= 0.995;
    pelota.velocidadY *= 0.995;

    // Si la velocidad es muy baja, detener la pelota
    if (Math.abs(pelota.velocidadX) < 0.1 && Math.abs(pelota.velocidadY) < 0.1) {
        pelota.velocidadX = 0;
        pelota.velocidadY = 0;
        pelota.activa = false;
        pelota.color = '#ff5722'; // Volver al color original
    }
}

function mousePressed() {
    // Calcular la distancia entre el ratón y la pelota
    const distancia = dist(mouseX, mouseY, pelota.x, pelota.y);

    // Si se hizo clic en la pelota
    if (distancia <= pelota.radio) {
        // Activar la pelota
        pelota.activa = true;


        // Dar una velocidad inicial
        pelota.velocidadX = random(-5, 5);
        pelota.velocidadY = random(-5, 5);


        // Cambiar el color de la pelota cuando está activa
        pelota.color = '#2196f3';
    }
}