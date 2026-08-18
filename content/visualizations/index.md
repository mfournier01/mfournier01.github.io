---
title: 'Visualizations'
date: 2026-08-18
type: landing

design:
  spacing: '5rem'

# Page sections
# Add one `markdown-wide` block per video/visualization — duplicate the
# block below (title + text with a `{{</* youtube */>}}` shortcode + a short
# description) to add more items to this page. `markdown-wide` is a
# project override (see layouts/partials/blox/markdown-wide.html) of the
# stock `markdown` block, widened so embedded videos aren't tiny.
sections:
  - block: markdown
    content:
      title: 🎬 Visualizations
      text: |-
        Videos and visualizations from my simulations.
    design:
      columns: '1'

  - block: markdown-wide
    content:
      title: Simulating the formation of galaxies with TNG50
      text: |-
        {{< youtube id="xg25bxdRw-M" >}}

        A visualization from the TNG50 cosmological magnetohydrodynamical simulation, showing the formation and evolution of galaxies across cosmic time. TNG50 is the simulation I used during my MSc to study Milky Way and Andromeda analogs (see [Pillepich et al. 2024](/publication/pillepich-2024/)).
    design:
      columns: '1'

  - block: markdown-wide
    content:
      title: A sloshing cold front
      text: |-
        {{< figure src="sloshingweb.png" alt="Density projection of a sloshing cold front" >}}

        An isolated simulation of a sloshing cold front, run with the AthenaPK code down to a resolution of 100 pc. Cold fronts form when the dense, low-entropy gas at a cluster's core sloshes back and forth within the cluster's potential well — often triggered by a minor merger — winding up into the characteristic spiral seen here.
    design:
      columns: '1'

  - block: markdown-wide
    content:
      title: AGN-driven outflows in the intracluster medium
      text: |-
        {{< figure src="radvelweb.png" alt="Radial velocity slice of AGN-driven outflows" >}}

        A radial velocity slice showing the innermost 200 kpc of the fiducial run of the XMAGNET MHD simulation suite. Red and blue trace gas moving away from and toward the observer, respectively, revealing the bipolar outflows driven by AGN feedback as they churn through the multiphase intracluster medium.
    design:
      columns: '1'

  - block: markdown-wide
    content:
      title: A circumnuclear disk, highly resolved
      text: |-
        {{< figure src="CNDweb.png" alt="Circumnuclear disk with multiple misaligned rings" >}}

        A circumnuclear disk of roughly 100 pc in radius, obtained by increasing the resolution of the fiducial run from [Fournier et al. 2026](/publication/fournier-2026/) by 7 additional refinement levels. The image is a composite showing density projection (shades of orange) and velocity strength (shades of blue). At this resolution the disk resolves into several separated rings with various orientations, and is found to be highly magnetised.
    design:
      columns: '1'
---
