document.addEventListener('DOMContentLoaded', init,false);
console.log("Lancement du programme 'main.js'")

function init(){
    document.getElementById('ouverture_menu').addEventListener("click", ouverture); 	                    // Initialisation du bouton de l'ouverture du menu.
    document.getElementById('fermeture_menu').addEventListener("click", ouverture);		                // Initialisation du bouton de la fermeture du menu.
    document.getElementsByClassName('direction')[0].addEventListener("click", bascule);                  // Initialisation du bouton de la bascule entre droitier et gaucher.
	
	if( ! localStorage.getItem("direction")){ 			                                                            // Pour initialiser la direction quand la page est chargée la première fois.
		localStorage.setItem("direction", "Droitier");	                                                                // On sauvegarde pour un droitier car le html est défini pour les droitiers qui représentent 90% des utilisateurs.
	}
	
	if(localStorage.getItem("direction") === "Gaucher"){ 	                                                        // On regarde pour qui on doit afficher la page, si c'est pour un gaucher on bascule.
			localStorage.setItem("direction", "Droitier");	                                                            // On change la valeur direction pour bien basculer pour un gaucher et non pour un droitier.
			bascule();										                                                            // On appelle la fonction bascule.
	}
}



function ouverture(){	                                                                                                // Ouvre le menu ou le ferme.
    if (document.querySelectorAll("#fermé").length > 0){ 			                                            // On vérifie si il y a bien un id "fermé" dans le html.
        document.getElementsByClassName("menu")[0].id = "ouvert";	                                            // On change l'id par "ouvert" en cherchant l'id via la classe "menu".
        console.log("Ouverture du menu.");
    }

    else{															                                                    // Si le menu n'est pas fermé alors il est ouvert.
        document.getElementsByClassName("menu")[0].id = "fermé";	                                            // On change l'id par "fermé" en cherchant l'id via la classe "menu".
        console.log("Fermeture du menu.");
    }
}



function bascule(){ 	                                                                                                // Bascule le site en droite ou gauche.
    if(localStorage.getItem("direction") === "Gaucher"){						                                    // On vérifie la dernière direction enregistré.
        document.getElementsByClassName('gauche')[0].className = "droite";		                            // On change la classname par "droite".
        localStorage.setItem("direction", "Droitier");							                                        // On enregistre le changement de direction.
    }
    else{																		                                        // Si la direction n'est pas gaucher alors sa valeur est droitier.
        document.getElementsByClassName('droite')[0].className = "gauche";		                            // On change la classname par "gauche".
        localStorage.setItem("direction", "Gaucher");                                                                   // On enregistre le changement de direction.
    }

    console.log(localStorage.getItem("direction"));
}