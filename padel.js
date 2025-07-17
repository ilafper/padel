/* const readline = import('readline'); */
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


function leeMenu(question) {
    return new Promise((resolve) => {
        rl.question(question, (respuesta) => {
            resolve(respuesta);
        });
    });
}


async function menu1() {
    let opcion = 0;
    let equipo1 = [];
    let equipo2 = [];

    while (opcion !== 2) {

        console.log("\nPARTIDO DE PADEL");
        console.log("1. Ingresar nombre de los jugadores");
        console.log("2. Ingresa las puntuaciones de los sets");
        console.log("3. Salir");
        opcion = parseInt(await leeMenu("Seleccione opción: "));

        switch (opcion) {
            case 1:
                let nombrePlayer1 = await leeMenu("Jugador 1(equipo1): ");
                let nombrePlayer2 = await leeMenu("Jugador 2(equipo1):");
                let nombrePlayer3 = await leeMenu("Jugador 3(equipo2): ");
                let nombrePlayer4 = await leeMenu("Jugador 4(equipo2): ");

                equipo1.push(nombrePlayer1);
                equipo1.push(nombrePlayer2);
                equipo2.push(nombrePlayer3);
                equipo2.push(nombrePlayer4);

                console.log(`- Equipo 1: ${equipo1} - Equipo 2: ${equipo2}`);



                break;
            case 2:
                let setsEquipoA = 0;
                let setsEquipoB = 0;

                const puntuaciones = []; // Array para guardar los sets

                for (let i = 1; i <= 3; i++) {
                    console.log(`Set ${i}`);
                    let puntuacionEquipoA = await leeMenu(`Puntuación Equipo A - Set ${i}`);
                    let puntuacionEquipoB = await leeMenu(`Puntuación Equipo B - Set ${i}`);

                    // Guardar en el array
                    puntuaciones.push({
                        set: i,
                        equipoA: puntuacionEquipoA,
                        equipoB: puntuacionEquipoB
                    });

                    // Comparar puntuaciones
                    if (puntuacionEquipoA > puntuacionEquipoB) {
                        setsEquipoA++;
                        console.log(`Equipo A gana el Set ${i}`);
                    } else if (puntuacionEquipoB > puntuacionEquipoA) {
                        setsEquipoB++;
                        console.log(`Equipo B gana el Set ${i}`);
                    } else {
                        console.log(`Set ${i} empatado (no cuenta para nadie)`);
                    }

                    // Verificar si algún equipo ya ganó 2 sets
                    if (setsEquipoA === 2 || setsEquipoB === 2) {
                        break; // No hace falta seguir jugando
                    }
                }

                console.log("\nResumen del Partido:");
                puntuaciones.forEach((set) => {
                    console.log(`Set ${set.set}: Equipo A ${set.equipoA} - Equipo B ${set.equipoB}`);
                });

                console.log("\nResultado Final:");
                if (setsEquipoA > setsEquipoB) {
                    console.log("🏆 ¡Equipo A gana el partido!");
                } else if (setsEquipoB > setsEquipoA) {
                    console.log("🏆 ¡Equipo B gana el partido!");
                } else {
                    console.log("🤝 El partido terminó en empate (raro en deportes por sets).");
                }
                break;

            default:
                console.log("Opción no válida");
                break;
        }
    }
}

await menu1();