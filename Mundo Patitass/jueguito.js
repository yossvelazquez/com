        const mascotas = [
            '🐶', '🐱', '🐰', '🐹', '🐦', '🐢', '🐸', '🐠'
        ];
        const juego = document.getElementById('juego');
        const puntajeDiv = document.getElementById('puntaje');
        const iniciarBtn = document.getElementById('iniciar');
        const relojDiv = document.getElementById('reloj');
        let puntaje = 0;
        let totalAparecidas = 0;
        let intervalo;
        let jugando = false;
        let tiempoRestante = 30;
        let intervaloReloj;

        function mostrarMascota() {
            // Limpiar mascotas anteriores
            juego.innerHTML = '';
            // Elegir mascota y posición aleatoria
            const mascota = mascotas[Math.floor(Math.random() * mascotas.length)];
            const mascotaDiv = document.createElement('div');
            mascotaDiv.className = 'mascota';
            mascotaDiv.textContent = mascota;
            const x = Math.random() * (juego.clientWidth - 60);
            const y = Math.random() * (juego.clientHeight - 60);
            mascotaDiv.style.left = x + 'px';
            mascotaDiv.style.top = y + 'px';
            mascotaDiv.onclick = atraparMascota;
            juego.appendChild(mascotaDiv);
            totalAparecidas++;
        }

        function atraparMascota(event) {
            event.stopPropagation();
            puntaje++;
            puntajeDiv.textContent = 'Puntaje: ' + puntaje;
            mostrarMascota(); // reemplaza con una nueva
            
        }
        // Si se atrapa una mascota, agrega un efecto visual o sonido
        const sonido = new Audio('pop.mp3');
        function atraparMascota(event) {
        event.stopPropagation();
        sonido.currentTime = 0;
        sonido.play();
        puntaje++;
        puntajeDiv.textContent = 'Puntaje: ' + puntaje;
        mostrarMascota();
     }


        function actualizarReloj() {
            tiempoRestante--;
            relojDiv.textContent = 'Tiempo: ' + tiempoRestante;
            if (tiempoRestante <= 0) {
                clearInterval(intervaloReloj);
            }
        }

        function iniciarJuego() {
            if (jugando) return;
            jugando = true;
            puntaje = 0;
            totalAparecidas = 0;
            tiempoRestante = 30;
            puntajeDiv.textContent = 'Puntaje: 0';
            relojDiv.textContent = 'Tiempo: 30';
            iniciarBtn.disabled = true;
            mostrarMascota();
            intervalo = setInterval(mostrarMascota, 1200);
            intervaloReloj = setInterval(actualizarReloj, 1000);
            // Termina el juego después de 30 segundos
            setTimeout(() => {
                clearInterval(intervalo);
                clearInterval(intervaloReloj);
                juego.innerHTML = '';
                jugando = false;
                iniciarBtn.disabled = false;
                relojDiv.textContent = 'Tiempo: 0';
                alert('¡Juego terminado! Puntaje final: ' + puntaje + 
                      '\nAtrapaste ' + puntaje + ' de ' + totalAparecidas + ' mascotas.');
            }, 30000);
        }

        iniciarBtn.onclick = iniciarJuego;