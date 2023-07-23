/* 
@files          script.js
@author         Marin Barbaud
@date           23/07/2023
@modify         ~
*/

function handleSubmit(event){
    event.preventDefault() // évite le rechargement de la page lors de la soumission du formulaire
    const searchQuery = document.querySelector('.js-search-input').value.trim() // Récupère la valeur de recherche et supprime les espace vide au début/fin
    const searchResults = document.querySelector('.js-search-result') // Contient les éléments de recherche
    searchResults.innerHTML = "" // Efface le contenu précédent

    // Construction l'URL de l'appel de Wikipédia
    const endpoint = `https://en.wikipedia.org/w/api.php?action=query&list=search&prop=info&inprop=url&utf8&format=json&origin=*&srlimit=20&srsearch=${searchQuery}`

    fetch(endpoint)

    .then(response =>{
        if(!response.ok) throw Error(response.statusText)
        return response.json()
    })

    .then(({query : {search : results}}) => {
        if(results.length === 0){
            altert("Aucun résultat trouvé. Essayez avec d'autres mots-clés")
            return;
        }

        results.forEach(result =>{
            const url = `https://fr.wikipedia.org/?curid=${result.pageid}`
            searchResults.insertAdjacentHTML(
                'beforeend',
                `<div class="result-item">
                    <h3 class="result-title">
                        <a href="${url}" target="_blank" rel="noopener">${result.title}</a>
                     </h3>
                    <a href="${url}" class="result-link" target="_blank" rel="noopener">${url}</a><br>
                    <span class="result-snippet">${result.snippet}</span><br>
                </div>`
            )
        })
    })

    .catch(err =>{
        console.log(err)
        alert("Echec de la recherche sur Wikipédia")
    })
}
document.querySelector('.js-search-form').addEventListener('submit', handleSubmit)