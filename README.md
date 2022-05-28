
# Don't Collapse

Don't Collapse est un jeu multijoueur de gestion d'usine. Améliorez vos machines, gérez votre personnel, le tout grâce à la boutique pour faire le plus de recettes possibles en repectant vos différents objectifs de développement durable. N'hésitez pas à consulter le tableau de bord pour connaître votre stade d'avancement, le nombre de salariés que vous avez ou encore vos dépenses et recette prévisionnelles.





## Badges

[![MIT License](https://img.shields.io/apm/l/atomic-design-ui.svg?)](https://github.com/tterb/atomic-design-ui/blob/master/LICENSEs)
![Release](https://img.shields.io/github/v/release/Zephyr-Quest/DontCollapse)
![Code Size](https://img.shields.io/github/languages/code-size/Zephyr-Quest/DontCollapse)

## Tech Stack

**Client:** ThreeJS

**Server:** Node, Express, SocketIO


## Installation

Pour installer le jeu chez vous, vous devez cloner le dépôt Git et installer les dépendances du projet en faisant :

```bash
  npm install
```
    
Ensuite vous devez créer un fichier `.env` à la racine du projet qui servira à mettre votre clé privée, nécessaire pour le déploiement.
Il devra contenir :
```env
SESSION_SECRET = "CLE DE SESSION"
```
Remplacez `CLE DE SESSION` par votre clé.
## Déploiement
Pour déployer le projet, faire :

```bash
  node .
```


## Authors

- [@EnguerrandMQT](https://www.github.com/EnguerrandMQT)
- [@MartDel](https://www.github.com/MartDel)
- [@MaximeDeclemy](https://www.github.com/MaximeDeclemy)
- [@RemiVan-Boxem](https://www.github.com/RemiVan-Boxem)
- [@TomMullier](https://www.github.com/TomMullier)



## License

[MIT](https://choosealicense.com/licenses/mit/)


## Message du propriétaire :
Merci d'avoir repris mon usine. Je sais que c'est un challenge pour toi, de refaire partir l'industrie de l'ordinateur portable quand le marché est partagé entre les grandes multinationales. Je compte sur toi pour pouvoir continuer à faire vivre mon usine avec nos partenaires locaux. Je crois en toi.

## Synopsis :

Bienvenue à l'usine de Strawberry, la marque d'ordinateur 100% locale. Strawberry était, à l'époque, la seule entreprise à produire la majorité de ses composants sur son territoire. Malheureusement, avec la mondialisation, le libre échange et le capitalisme, il revenait souvent moins cher d'acheter à l'autre bout du monde que de produire local. Des grandes marques tels que Macrosoft, Peer, DY, BELL ont pris ce tournant et ont commencé à délocaliser leur production ailleurs. 

C'est ici que vous intervenez. Vous récupérez l'usine de Strawberry, au bord du dépôt de bilan, et votre but est de la rendre compétitive face aux géants mondiaux.

Vous allez pour cela devoir optimiser les trois enjeux du développement durable :

- Économique en étant rentable
- Écologique en arrivant a atteindre le 0 carbone
- Social en pensant à vos employés et aux territoires alentours.

Vous allez avoir à votre disposition, plusieurs variables que vous pourrez ajuster :

- Vos machines de production
    + Poste à souder pour greffer le processeur et la carte mère
    + Assembleur de précision pour assembler la RAM et la mémoire sur la carte mère
    + Assembleur mécanique pour préparer le chassis
    + Assembleur général pour tout mettre ensemble

- Vos fournisseurs d'électricité, eau, cartons, métal
- Vos employés (techniciens de surface, personnel d'entretien, ingénieurs, personnel administratif)

Vous avez 2 ans pour remettre votre usine sur pied.

## But du jeu :

Améliorez vos machines, gérez votre personnel, le tout grâce à la boutique pour faire le plus de recettes possibles en repectant vos différents objectifs de développement durable. N'hésitez pas à consulter le tableau de bord pour connaître votre stade d'avancement, le nombre de salariés que vous avez ou encore vos dépenses et recette prévisionnelles.
La partie dure 12 minutes maximum, un mois équivaut à 30 secondes et chaque mois vous récupérez votre argent(si vous ne faites pas faillite).

## Type de jeu :
Nous vous proposons ce jeu multijoueur. Plusieurs salles peuvent être créées chacune pouvant contenir entre 2 et 4 personnes jouant les unes contre les autres afin de rendre la partie plus animée.

## Mode spectateur :
Cliquez sur la porte pour aller voir l'avancement de vos adversaires, et tenter de les surpasser !

## Evènements aléatoires :
Pour pimenter un petit peu la partie et la rendre moins monotone.
Il y a différents événements (panne de machine, grève des salariés, conflit dans le monde, 13ème mois, nouvelle machine à café, ...) qui peuvent tomber certains mois aléatoirement et chaque événement a une durée aléatoire (chaque événement a sa propre fouchette de temps possible).

## Conditions de victoire :
Ne faites pas faillite, ayez le meilleur ratio Argent - ODD - Niveau des machines au bout des 12 minutes de jeu! Ou obtenez 100% dans chaque barres d'obectif de développement durable ainsi que 40 000€ d'économies. Ou soyez le dernier en lice pour la victoire. 

Gestion des ODD : 
* Social : Soyez stables dans le recrutement de votre personnel, ne privilégiez aucun métier
* Économique : Soyez en croissance et ayez suffisemment d'argent pour vous rapprocher de 100%
* Écologique : Les machines de niveau supérieur vous rapportent plus de points, ainsi que l'achat de machines d'occasion. Pensez aussi à changer de fournisseur, le prix en vaut la chandelle !

## Conditions de défaite :
Vous perdez si vous avez plus de 10 000€ de dettes, ou que l'un des objectifs de développement durable est tombé à 0. Évitez ça, et lancez vous dans la bataille !

## Objectifs de développement durable
Pour être plus proches de la réalité, nous avons mis 3 indicateurs de développement durable qui correspondent aux 3 piliers :
- **Ecologique** : 
Pour améliorer sa barre d'écologie, le joueur doit améliorer ses contrats (eau, électricité, étain, carton) qui ont chacun un indice écologique différent. Chaque nouvelle machine permet aussi d'améliorer cette barre (elles consomment plus mais de manière plus raisonnée, elles utilisent mieux ces énergies). L'utilisation du système d'occasion peut aussi faire gagner des points pour l'écologie.
- **Economique** : 
Nous regardons si le joueur est en croissance économique ou s'il perd de l'argent, il a le droit à un découvert jusqu'à 10 000€. Au delà la barre de progression retombe à 0. Si le joueur a 40 000€ et qu'il est en croissance il est à 100% de la barre économique.
- **Social** :
La barre correspondant au pilier social est calculé selon le nombre de personnes employées dans chaque catégorie (techniciens de surface, personnel d'entretien, ingénieurs, personnel administratif). Si l'écart entre les différents types d'employés augmente, vous perdrez des points.

## Gestion de projet
L'avancement du projet est à retrouver sur le notion placé dans l'équipe teams de l'usine du futur.

----------
###### Un projet de Zéphyr Studio
###### Par Declemy Maxime, Delebecque Martin, Marquant Enguerrand, Mullier Tom et Van Boxem Rémi
