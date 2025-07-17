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

                const puntuaciones = [];

                for (let i = 1; i <= 99999; i++) {
                    console.log(`Set ${i}`);

                    let puntuacionEquipoA = parseInt(await leeMenu(`Puntuación Equipo A (Set ${i}):`));
                    let puntuacionEquipoB = parseInt(await leeMenu(`Puntuación Equipo B (Set ${i}):`));

                    // Validar que no superen 7 (salvo que permitas sets largos)
                    if (puntuacionEquipoA > 7 || puntuacionEquipoB > 7) {
                        console.log("❌ Puntuaciones inválidas (no pueden pasar de 7) ❌");
                        continue;
                    }

                    let diferencia = Math.abs(puntuacionEquipoA - puntuacionEquipoB);
                    let puntuacionValida = false;
                    let ganador = null;

                    // Caso 1: victoria normal con diferencia de 2 y mínimo 6 juegos
                    if ((puntuacionEquipoA >= 6 || puntuacionEquipoB >= 6) && diferencia === 2) {
                        puntuacionValida = true;
                        ganador = puntuacionEquipoA > puntuacionEquipoB ? 'A' : 'B';

                        // Caso 2: empate 6-6 → tie-break
                    } else if (puntuacionEquipoA === 6 && puntuacionEquipoB === 6) {
                        console.log("🎾 ¡Tie-break!");

                        let ganadorTieBreak = await leeMenu("¿Quién ganó el tie-break? (A/B):");
                        //sumamos un punto al equipo que elegimos de ganador
                        if (ganadorTieBreak.toUpperCase() === 'A') {
                            puntuacionEquipoA = 7;
                            puntuacionEquipoB = 6;
                            ganador = 'A';
                            puntuacionValida = true;
                        } else if (ganadorTieBreak.toUpperCase() === 'B') {
                            puntuacionEquipoA = 6;
                            puntuacionEquipoB = 7;
                            ganador = 'B';
                            puntuacionValida = true;
                        } else {
                            console.log("⚠️ Entrada inválida para el tie-break. Se omite este set.⚠️");
                            continue;
                        }
                    }

                    if (puntuacionValida) {
                        puntuaciones.push({
                            set: i,
                            equipoA: puntuacionEquipoA,
                            equipoB: puntuacionEquipoB
                        });

                        if (ganador === 'A') {
                            setsEquipoA++;
                            console.log("✅ El set lo gana el Equipo A");
                        } else if (ganador === 'B') {
                            setsEquipoB++;
                            console.log("✅ El set lo gana el Equipo B");
                        }
                    } else {
                        console.log("❌ Puntuación no válida. No se suma este set.");
                    }
                }


                console.log("\nResumen del Partido:");
                puntuaciones.forEach((set) => {
                    console.log(`Set ${set.set}: Equipo A ${set.equipoA} - Equipo B ${set.equipoB}`);
                });
                if(setsEquipoA== 0 && setsEquipoB==2){
                    console.log("🏆 ¡Equipo B gana el partido!");
                }else if(setsEquipoA== 2 && setsEquipoB==0){
                    console.log("🏆 ¡Equipo A gana el partido!");
                }
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