document.addEventListener('DOMContentLoaded', principale);

function principale() {
    console.log("Lancement du programme 'nombre_stations.js'")

    const URL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=nombre-total-de-points-de-charge%40enedis&q=&sort=-trimestre&facet=trimestre"; // Lien de l'API.
    let promesse = axios.get(URL);

    promesse.then(afficherResultats);
    promesse.catch(afficherErreurAjax);

    function afficherResultats(resultats) {                                                                             // Affichage des résultats dans la classe "stations" de la page "nombre_stations.html".
        console.log("Affichage des résultats");
        console.log(resultats.data);
        document.querySelector(".stations").innerHTML = "";
        const stations = resultats.data.records;

        stations.forEach(uneStation => {                                                                                // Création des lignes de résultat dans la classe "stations".
            const nouvelleStation = document.createElement("li");
            nouvelleStation.textContent = "- Sur la période " + uneStation.fields.trimestre + ", " + uneStation.fields.accessible_au_public + " stations accessibles au public, " + uneStation.fields.societe + " dans des sociétés et " + uneStation.fields.particulier + " dans des foyers.";
            document.querySelector(".stations").appendChild(nouvelleStation);
            console.log(uneStation.fields.nom);
        })

    }

    function afficherErreurAjax(erreur) {
        console.log("afficherErreurAjax")
    }
}