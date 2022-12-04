document.addEventListener('DOMContentLoaded', principale);

function principale() {
    console.log("Lancement du programme 'puissance_bornes.js'")

    const URL = "https://data.opendatasoft.com/api/records/1.0/search/?dataset=puissance-installee-totale%40enedis&q=&rows=1000&sort=ordre_de_tri&facet=trimestre"; // Lien de l'API.
    let promesse = axios.get(URL);

    promesse.then(afficherResultats);
    promesse.catch(afficherErreurAjax);

    function afficherResultats(resultats) {                                                                             // Affichage des résultats dans la classe "puissance" de la page "puissance_bornes.html".
        console.log("Affichage des résultats");
        console.log(resultats.data);
        document.querySelector(".puissance").innerHTML = "";
        const puissance = resultats.data.records;

        puissance.forEach(unePuissance => {                                                                             // Création des lignes de résultat dans la classe "puissance".
            const nouvellePuissance = document.createElement("li");
            nouvellePuissance.textContent = "- Sur la période " + unePuissance.fields.trimestre + ", la puissance totale est de " + unePuissance.fields.accessible_au_public + " MVA accessible au public, " + unePuissance.fields.particulier + " MVA accessible aux particuliers, et " + unePuissance.fields.societe + " MVA accessible dans les sociétes.";
            document.querySelector(".puissance").appendChild(nouvellePuissance);
            console.log(unePuissance.fields.nom);
        })

    }

    function afficherErreurAjax(erreur) {
        console.log("afficherErreurAjax")
    }
}