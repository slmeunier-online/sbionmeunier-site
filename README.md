# Site sbionmeunier.com

Site statique (HTML / CSS / JS, sans framework ni étape de build), hébergé sur Cloudflare Pages.

- `index.html` : tout le contenu (accueil, prestations, tarifs, parcours, mentions légales, confidentialité, agenda Calendly). Chaque fenêtre superposée est un bloc `<article id="p-…">`.
- `css/style.css` : mise en forme. `js/main.js` : ouverture des fenêtres et chargement de Calendly.
- `img/` : photos. `fonts/` : polices auto-hébergées.

## Mettre à jour le contenu
Modifier le texte directement dans `index.html` (prix : blocs `class="price"` et `class="group"`), puis « Commit changes » sur GitHub. Cloudflare republie le site en une minute environ. Pour annuler, rétablir la version précédente depuis l'historique du fichier.

## À compléter avant la mise en ligne
- SIREN dans les mentions légales (`[à compléter]`).
- Relire les mentions légales et la politique de confidentialité.
