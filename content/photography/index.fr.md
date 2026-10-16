---
title: 'Photographie'
date: 2026-08-18
type: landing

design:
  spacing: '2rem'

# Page sections
# One `photo-grid` block per year (most recent first). Within each block,
# `groups` clusters photos taken at the same place — add a new group (or a
# new year block) to extend the portfolio. `photo-grid` is a project-only
# block, see layouts/partials/blox/photo-grid.html.
sections:
  - block: photo-head
    content:
      title: Photographie
      intro: Quelques photos prises au fil des années.
      instagram:
        text: Plus de photos sur Instagram
        url: https://www.instagram.com/martin.fournier270/

  - block: photo-grid
    content:
      year: '2026'
      groups:
        - place: Hamburger Sternwarte
          images:
            - src: HamburgerSternwarte2026.jpg
              # Extreme portrait (2:3) towers over the rest of the grid at
              # full column width — rescale it down (full image kept, no
              # cropping) so its height is roughly in line with its
              # neighbours.
              scale: 0.4
            - HamburgerSternwarte2024.jpg

  - block: photo-grid
    content:
      year: '2024'
      groups:
        - place: Col du Grand-Saint-Bernard
          images:
            - ColduGrandSaintBernard2024.jpg
            - ColduGrandSaintBernard2024b.png
        - place: Col de Mille
          images:
            - ColdeMille2024.png
        - place: Île de Rügen
          images:
            - RuegenIsland2024.jpg
            - RuegenIsland2024b.jpg

  - block: photo-grid
    content:
      year: '2023'
      groups:
        - place: Heidelberg
          images:
            - Heidelberg2023.jpg
            - Heidelberg2023b.jpg
        - place: Observatoire de Haute-Provence
          images:
            - ObservatoireDeHauteProvence2023.png
        - place: Hamburg
          images:
            - Hamburg2023.png
        - place: Usine sidérurgique abandonnée (Belgique)
          images:
            - Charleroi2023.png
            - Liege2023.png
            - Liege2023b.jpg

  - block: photo-grid
    content:
      year: '2022'
      groups:
        - place: Glacier d'Aletsch
          images:
            - AletschGlacier2022.jpg
        - place: Beaufortain
          images:
            - Beaufortain2022.jpg
---
