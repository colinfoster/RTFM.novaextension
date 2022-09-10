## Localisation ##

**RTFM** a été traduit à l'aide de Google Translate (et de l'extension Nova "Translate in Place"). S'il y a des traductions qui doivent être améliorées, veuillez me les envoyer pour postuler. Merci!

--

**RTFM** Cela vous évitera quelques précieuses frappes et clics à chaque fois que vous aurez besoin de lire la documentation d'un nom de fonction ou d'un autre mot-clé pour une syntaxe. Mettez en surbrillance un mot-clé de langue dans l'éditeur et RTFM dirigera la recherche de votre navigateur vers votre ressource de référence préférée pour ce terme.

Le site web vers lequel vous êtes redirigé est déterminé par la syntaxe actuelle du document (dans le coin inférieur droit de la fenêtre de l'éditeur) et votre ressource préférée pour cette syntaxe (spécifiée dans les préférences). Si aucun texte n'est sélectionné lorsque RTFM est déclenché (par le menu ou le raccourci clavier attribué), vous serez invité à entrer une chaîne de recherche.

![Entrée de recherche manuelle](https://ext.runcode.run/rtfm/readme/RTFM_manual_entry.png)

RTFM inclut des paramètres pour chaque syntaxe reconnue par Nova, donc même si vous travaillez en texte brut, vous pouvez toujours effectuer une recherche Web générale sur n'importe quelle chaîne ou configurer une URL personnalisée pour rechercher l'API de tout ce sur quoi vous pourriez travailler. / documenter.

Enfin, si vous travaillez (par exemple) sur SQL dans un fichier PHP, vous pouvez temporairement basculer la syntaxe du document vers SQL afin de pouvoir cibler vos requêtes RTFM sur les ressources SQL au lieu de PHP.

*REMARQUE:* Cette extension n'est qu'un raccourci pour effectuer les recherches que vous pourriez effectuer sur ces sites ou via les moteurs de recherche. Si les résultats de la recherche ne sont pas meilleurs lorsque vous effectuez la même recherche sur le site lui-même, cette extension ne peut pas améliorer ces résultats. Tous les sites ne sont pas bien conçus pour être recherchés.

Si vous préférez, voici [une démo vidéo de 30s](https://ext.runcode.run/rtfm/readme/RTFM_how_to.mp4)


![Comment utiliser RTFM en 3 étapes](https://ext.runcode.run/rtfm/readme/RTFM_how_to.png)

## Usage

RTFM peut être utilisé soit par :
- en faisant un clic droit sur un terme et en choisissant la commande RTFM dans le menu contextuel, OU
- en sélectionnant un mot puis en choisissant l'élément de menu **Éditeur → RTFM** (ou attribuez-lui un raccourci !) OU
- Trigging **RTFM** sans texte sélectionné pour être invité à rechercher un mot-clé.

### Configuration

Pour configurer les préférences globales, ouvrez **Extensions → Bibliothèque d'extensions...** puis sélectionnez l'onglet **Préférences** de RTFM.

### Préférences

Pour chaque syntaxe, vous pouvez spécifier à quelle ressource en ligne vous souhaitez envoyer vos recherches. Les recherches effectuées "...passant par redirection Duck Duck Go" utilisez l'option "I'm feeling Ducky" pour rediriger automatiquement la recherche vers le premier résultat de recherche. Il s'agit *généralement* de la page que vous recherchez, mais vous pouvez sélectionner la mauvaise page.

#### Ressources linguistiques personnalisées

Vous pouvez également ajouter jusqu'à 3 URL personnalisées dans la zone "Ressources linguistiques personnalisées". Cela peut être extrêmement utile si vous devez cibler une API de bibliothèque particulière. Par exemple, les paramètres Javascript incluent des préréglages ciblant les API jQuery, HighCharts et Nova.

Les URL doivent commencer par http ou https et doivent inclure le jeton %@ à l'emplacement où la chaîne de recherche doit apparaître. Les URL peuvent également inclure le jeton %$ où vous souhaitez spécifier la syntaxe actuelle du document (utile si vous ciblez un site Web comme Mozilla.org où ils prennent en charge de nombreuses syntaxes).

Si l'URL que vous entrez fonctionne dans votre navigateur (sauf pour remplacer les jetons %@ and %$), elle devrait fonctionner dans RTFM.

La manière précise de créer une URL de recherche personnalisée pour un site Web n'entre pas dans le cadre de ce manuel, vous devrez donc RTFM à ce sujet ailleurs. :-) Mais si vous souhaitez cibler un site Web spécifique via un moteur de recherche tel que Duck Duck Go, l'URL ressemble généralement au texte de l'espace réservé :

    https://duckduckgo.com/?q=\\+site:EXAMPLE.COM+%$+%@

Si vous l'incluez %$ dans le modèle d'URL, il sera remplacé par la syntaxe actuelle du document. Le jeton %@ sera remplacé par tout ce que vous sélectionnez dans votre éditeur pour rechercher (ou entrer via la boîte de dialogue).

**REMARQUE:** Les noms de syntaxe suivants ne seront pas inclus dans l'URL de recherche même si le modèle d'URL inclut le jeton %$ :
   'text','diff','json','ini','markdown','shell'
Les noms de syntaxe sont trop génériques pour être significatifs (ou éventuellement trompeurs) dans la plupart des recherches.

Si vous utilisez Duck Duck Go et que vous souhaitez déclencher leur fonction de  "I'm Feeling Ducky" (rediriger-vers-le-premier-résultat), démarrez la requête avec une barre oblique inverse \ . Pour Google, vous devez inclure '&btnI' après le terme de recherche.

#### Pourquoi utilisez-vous ces préréglages particuliers ?

Compromis. Certains sites Web (php.net) fonctionnent mieux lorsqu'ils sont recherchés directement, certains fonctionnent mieux lorsqu'ils sont recherchés via un moteur de recherche (HTML5Doctor), et certains ne semblent pas du tout prendre en charge la recherche (Vue).

J'ai essayé de fournir un ensemble décent de sites de référence sans surcharger le menu avec des choix pour chaque syntaxe. (SQL a le plus, bien sûr, puisque SQL n'est pas qu'un seul langage.)

Les recherches "I'm Feeling Ducky" via Duck Duck Go sont généralement excellentes et c'est un moyen extrêmement rapide d'accéder directement à la page dont vous avez besoin. Et parfois, les moteurs de recherche révèlent un meilleur contenu que le site lui-même.

e.g., HTML5Doctor vous montrera une définition simple pour \<figure\> si vous recherchez ce terme directement sur leur site, mais en utilisant Duck Duck Go, vous obtenez un article plus long sur *pourquoi* et *quand* vous devriez utiliser \<figure\>.

D'autres (par exemple, Perl) semblent faire moins bien en utilisant DDG, donc bien que ce soit une option, ce n'est pas la valeur par défaut. Et certaines syntaxes sont en grande partie symboliques (par exemple, Markdown) et il semblait que si quelqu'un avait besoin de ressources pour celles-ci, ce serait pour le contenu qu'il écrivait, pas pour la syntaxe du contenu.

Je ne connais pas toutes les langues, donc les préréglages choisis peuvent ne pas être idéaux. Si vous trouvez quelque chose de mieux, vous pouvez créer et attribuer vos propres URL personnalisées à n'importe quelle syntaxe, ou me l'envoyer et si cela fonctionne mieux que ce qui est dans RTFM maintenant, je l'inclurai probablement ! (Il n'y a que 3 URL personnalisées parce que j'espère que c'est suffisant pour la plupart des gens et je ne voulais pas encombrer les menus.)
