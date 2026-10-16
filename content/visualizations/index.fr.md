---
# One `viz-gallery` block (layouts/partials/blox/viz-gallery.html): add an item
# (title, `youtube` id or `image` file in this folder, `alt`, `text`) to extend it.
title: Visualisations
date: 2026-08-18
type: landing
math: true
design:
  spacing: '0'
sections:
- block: viz-gallery
  content:
    title: Visualisations
    intro: Vidéos et visualisations issues de mes simulations.
    items:
    - title: Simuler la formation des galaxies avec TNG50
      youtube: xg25bxdRw-M
      text: Une visualisation de la simulation cosmologique magnétohydrodynamique TNG50, montrant la formation et l'évolution des galaxies au fil du temps cosmique. TNG50 est la simulation que j'ai utilisée pendant mon master pour étudier des analogues de la Voie lactée et d'Andromède (voir [Pillepich et al. 2024](/fr/publication/pillepich-2024/)).
    - title: Un front froid en ballottement
      image: sloshingweb.png
      alt: Projection de densité d'un front froid en ballottement
      text: Une simulation isolée d'un front froid en ballottement, réalisée avec le code AthenaPK jusqu'à une résolution de 100 pc. Les fronts froids se forment quand le gaz dense et de faible entropie au cœur d'un amas oscille dans le puits de potentiel de l'amas, souvent à la suite d'une fusion mineure, et s'enroule en la spirale caractéristique visible ici.
    - title: Écoulements générés par les AGN dans le milieu intra-amas
      image: radvelweb.png
      alt: Coupe de vitesse radiale d'écoulements générés par un AGN
      text: Une coupe de vitesse radiale montrant les 200 kpc les plus internes de la simulation fiducielle de la suite MHD XMAGNET. Le rouge et le bleu tracent le gaz qui s'éloigne de l'observateur et qui s'en rapproche, respectivement, et révèlent les écoulements bipolaires engendrés par la rétroaction de l'AGN lorsqu'ils brassent le milieu intra-amas multiphasé.
    - title: Un disque circumnucléaire à haute résolution
      image: CNDweb.png
      alt: Disque circumnucléaire avec plusieurs anneaux désalignés
      text: Un disque circumnucléaire d'environ 100 pc de rayon, obtenu en augmentant la résolution de la simulation fiducielle de [Fournier et al. 2026](/fr/publication/fournier-2026/) de 7 niveaux de raffinement supplémentaires. L'image est un composite de la projection de densité (nuances d'orange) et de l'amplitude de la vitesse (nuances de bleu). À cette résolution, le disque se résout en plusieurs anneaux séparés d'orientations variées, et se révèle fortement magnétisé.
    - title: Suivre une éruption d'AGN
      image: Tracersweb.png
      alt: Lignes de champ magnétique, isosurface de température et particules traceuses pendant une éruption d'AGN
      text: Un instantané issu de [Fournier et al. 2026](/fr/publication/fournier-2026/). Les lignes sont des lignes de champ magnétique colorées selon leur intensité. La surface jaune est une isosurface de température à $10^8$ K, montrant une éruption d'AGN qui se propage vers le bas. Les points rouges et bleus sont des particules traceuses, colorées selon l'amplitude de la vorticité.
    - title: Un choc supersonique dans un milieu turbulent
      image: Shockweb.png
      alt: Coupe du gradient de densité d'un choc supersonique dans un milieu interstellaire turbulent
      text: Une coupe d'une simulation hydrodynamique d'un choc supersonique se propageant dans un milieu interstellaire turbulent. La couleur indique l'intensité du gradient de densité.
---
