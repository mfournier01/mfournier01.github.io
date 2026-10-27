---
# One `viz-gallery` block (layouts/partials/blox/viz-gallery.html): add an item
# (title, `youtube` id or `image` file in this folder, `alt`, `text`) to extend it.
title: Visualizations
date: 2026-08-18
type: landing
math: true
design:
  spacing: '0'
sections:
- block: viz-gallery
  content:
    title: Visualizations
    intro: Videos and visualizations from my simulations.
    items:
    - title: Simulating the formation of galaxies with TNG50
      youtube: xg25bxdRw-M
      text: A visualization from the TNG50 cosmological magnetohydrodynamical simulation, showing the formation and evolution of galaxies across cosmic time. TNG50 is the simulation I used during my MSc to study Milky Way and Andromeda analogs (see [Pillepich et al. 2024](/publication/pillepich-2024/)).
    - title: A sloshing cold front
      image: sloshingweb.png
      alt: Density projection of a sloshing cold front
      text: An isolated simulation of a sloshing cold front, run with the AthenaPK code down to a resolution of 100 pc. Cold fronts form when the dense, low-entropy gas at a cluster's core sloshes back and forth within the cluster's potential well — often triggered by a minor merger — winding up into the characteristic spiral seen here.
    - title: AGN-driven outflows in the intracluster medium
      image: radvelweb.png
      alt: Radial velocity slice of AGN-driven outflows
      text: A radial velocity slice showing the innermost 200 kpc of the fiducial run of the XMAGNET MHD simulation suite. Red and blue trace gas moving away from and toward the observer, respectively, revealing the bipolar outflows driven by AGN feedback as they churn through the multiphase intracluster medium.
    - title: A jet piercing through the intracluster medium
      image: Jetweb.jpg
      alt: Temperature slice of a bipolar AGN jet propagating through the intracluster medium
      text: A temperature slice from a hydrodynamical simulation of a bipolar jet piercing through the intracluster medium. The orange jet material is roughly at $10^9$ K, while the surrounding blue gas is around $10^7$ K. Unlike the XMAGNET runs above, this simulation has no magnetic fields, which would otherwise help stabilize the interface between the jet and the ambient gas. As a result, the edges of the jets develop many more hydrodynamical instabilities, visible here as turbulent, mixing eddies.
    - title: A collection of AGN cavities
      image: Cavitiesweb.jpg
      alt: Grid of 24 AGN-inflated cavities from the XMAGNET simulation
      text: A collection of cavities inflated by AGN jets, taken from the XMAGNET run. Each panel zooms on a different cavity, showing the variety of shapes they take as they rise and are stretched, sheared and mixed by the surrounding intracluster medium.
    - title: A circumnuclear disk, highly resolved
      image: CNDweb.png
      alt: Circumnuclear disk with multiple misaligned rings
      text: A circumnuclear disk of roughly 100 pc in radius, obtained by increasing the resolution of the fiducial run from [Fournier et al. 2026](/publication/fournier-2026/) by 7 additional refinement levels. The image is a composite showing density projection (shades of orange) and velocity strength (shades of blue). At this resolution the disk resolves into several separated rings with various orientations, and is found to be highly magnetised.
    - title: Tracing an AGN outburst
      image: Tracersweb.png
      alt: Magnetic field lines, temperature isosurface, and tracer particles during an AGN outburst
      text: A snapshot from [Fournier et al. 2026](/publication/fournier-2026/). Lines show magnetic field lines colored by intensity. The yellow surface is a temperature isosurface at $10^8$ K, showing an AGN outburst propagating downward. Red and blue dots are tracer particles, color-coded by vorticity magnitude.
    - title: A supersonic shock in a turbulent medium
      image: Shockweb.png
      alt: Density gradient slice of a supersonic shock in a turbulent interstellar medium
      text: A slice from a hydrodynamical simulation of a supersonic shock propagating through a turbulent interstellar medium. Color indicates the strength of the density gradient.
---
