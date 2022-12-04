document.addEventListener('DOMContentLoaded', principale);

function principale() {
    console.log("Lancement du programme 'carte.js'");
	
	document.getElementById('ouverture_menu').addEventListener("click", affichage_carte_menu);
	document.getElementById('fermeture_menu').addEventListener("click", delai);

    // Ajout du fond de carte.
    let Url = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiY2xlbWVudHR0biIsImEiOiJja28wNjBqaHkwY2w5MzNwOWU3dTRjeHQ0In0.iqGhI-5u2Aa8nZQzaKffWQ';

    var carte = L.tileLayer(Url, {id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1});                            // Fond de carte normal.
    var satellite = L.tileLayer(Url, {id: 'mapbox/satellite-streets-v11', tileSize: 512, zoomOffset: -1});              // Fond de carte satellite.

    var maCarte = L.map('carte',{                                                                                       // Propriétés pour le chargement de la carte.
         center:[45.880, -1.038],
         zoom :8,
         layers : carte
     });

    var fond_carte = {
        "Carte": carte,
        "Satellite": satellite
    };
    
    L.control.layers(fond_carte).addTo(maCarte);

    let url ="https://data.opendatasoft.com/api/records/1.0/search/?dataset=fichier-consolide-des-bornes-de-recharge-pour-vehicules-electriques-irve%40public&q=&rows=60&refine.nom_dep=CHARENTE+MARITIME"; // Lien de l'API.

    let promesseBorne = axios.get(url);
    promesseBorne.then(compoCarte);
    promesseBorne.catch(erreurAjax);



    // Fonction pour mettre au premier plan carte / menu burger.
	function delai(){                                                                                                   // Ajout d'un délai pour éviter un conflit de superposition.
        setTimeout(affichage_carte_menu, 650);
	}

	function affichage_carte_menu() {
        if (document.querySelectorAll("#ouverture_carte").length > 0){
            document.getElementsByClassName("carte_affichage")[0].id = "fermé_carte";
            console.log("Passage au premier plan de la carte.");
        }

        else{
            document.getElementsByClassName("carte_affichage")[0].id = "ouverture_carte";
            console.log("Passage au premier plan du menu burger.");
        }
	}

	// Filtre des informations provenenant de l'API.
    function compoCarte(reponseAjax) {
        let donnees = reponseAjax.data.records;
        let couleur = "blanc";

        donnees.forEach(element => {
            champs = element.fields;
            lat = champs.coordonnees[0];
            lng = champs.coordonnees[1];
            nom_borne = champs.n_station;
            id = champs.id_station;
            adresse = champs.ad_station;
            amenageur = champs.n_amenageur;
            operateur = champs.n_operateur;
            pdc = champs.nbre_pdc;
            puissance = champs.puiss_max;
            prise = champs.type_prise;
            afficherUnMarqueur(lat, lng, nom_borne, id, adresse, amenageur, operateur, pdc, puissance, prise, couleur);
        });
    }


    function erreurAjax(erreur) {
        console.log(`Erreur Ajax : ${erreur}`);
    }

    // Affichage des marqueurs.
    function afficherUnMarqueur(latitude, longitude, nom_borne, id, adresse, amenageur, operateur, pdc, puissance, prise){

        let iconAED = L.icon({
                iconUrl: 'img/marqueur_noir.svg',
                iconSize: [38, 38],
                iconAnchor: [20, 38],
                popupAnchor: [-3, -38]
            });

        if (latitude != null && longitude != null) {

            let lat_lng = L.latLng(latitude, longitude);
            let optionsMarqueur = {"title": nom_borne, "opacity": 0.8, icon: iconAED};
            let marqueur = L.marker(lat_lng, optionsMarqueur);

            let textePopup = '<h4>Identifiant de la borne : </h4>' + '<p>' + id + '</p>';
            textePopup += '<h4>Adresse : </h4>' + '<p>' + adresse + '</p>';
            textePopup += '<h4>Aménageur : </h4>' + '<p>' + amenageur + '</p>';
            textePopup += '<h4>Opérateur : </h4>' + '<p>' + operateur + '</p>';
            textePopup += '<h4>Nombre de prises disponibles : </h4>' + '<p>' + pdc + '</p>';
            textePopup += '<h4>Puissance maximale de la borne en kWh : </h4>' + '<p>' + puissance + '</p>';
            textePopup += '<h4>Types de prise supporté(s) : </h4>' + '<p>' + prise + '</p>';
            marqueur.bindPopup(textePopup).openPopup();

            marqueur.addTo(maCarte);
        }

        else {
            console.log('Pas de coordonnées géographiques connues pour ' + nom_borne);
        }
    }
}