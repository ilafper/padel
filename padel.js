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
    let equipo1=[];
    let equipo2=[];

    while (opcion !== 2) {
        
        console.log("\nPARTIDO DE PADEL");
        console.log("1. Ingresar nombre de los jugadores");
        console.log("2. Ingresa nombre de los jugadores");

        console.log("3. Salir");
        opcion = parseInt(await leeMenu("Seleccione opción: "));

        switch (opcion) {
            case 1:
                let nombrePlayer1 = await leeMenu("Jugador 1(equipo1)");
                let nombrePlayer2 = await leeMenu("Jugador 2(equipo1)");
                let nombrePlayer3 = await leeMenu("Jugador 3(equipo2)");
                let nombrePlayer4 = await leeMenu("Jugador 4(equipo2)");
                
                equipo1.push(nombrePlayer1);
                equipo1.push(nombrePlayer2);
                equipo2.push(nombrePlayer3);
                equipo2.push(nombrePlayer4);
                
                console.log(`Se han guardado los siguientes datos de los equipos: 
                    ${equipo1}, ${equipo2}
                `);

                
                break;
            case 2:
                console.log("Saliendo del menú");
                rl.close();
                break;
            default:
                console.log("Opción no válida");
                break;
        }
    }
}

await menu1();