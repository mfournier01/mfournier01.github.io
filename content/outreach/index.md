---
title: 'Outreach'
date: 2026-10-15
type: landing

design:
  spacing: '0'

# The whole page is one `outreach` block (layouts/partials/blox/outreach.html).
# Add an item to a group to extend it; `layout: cards` shows a group's items side by side.
sections:
  - block: outreach
    content:
      title: Outreach
      intro: "I enjoy sharing astrophysics with the public: organising events, giving talks, and helping science reach the screen."
      groups:
        - id: events
          name: Bringing science to the public
          items:
            - kicker: Science Slam · Hamburg Planetarium
              title: Science Slams in Hamburg
              image:
                src: scienceslam-planetarium.jpg
                alt: Dr. Pia Jakobus at a lectern under the planetarium dome, with a nebula projected overhead and the audience below
              caption: Dr. Pia Jakobus presenting at the Hamburg Planetarium. Photo by Snigdha Bhattacharjee.
              text: |-
                I initiated and co-organised several Science Slam events, in which researchers each get about ten minutes to present their research to a general audience, who then votes for their favourite talk.

                The highlight was a sold-out show at the Hamburg Planetarium, where five early-career researchers from the Hamburg Observatory presented their science under the dome to an audience of 250 people.

        - id: stage
          name: On stage
          lead: I regularly give public talks in Germany, and have spoken in Berlin, Münster, Osnabrück, Hamburg and Lüneburg.
          items:
            - kicker: Science Slam · Uebel & Gefährlich, Hamburg
              title: Black holes, more than cosmic vacuum cleaners?
              subtitle: '*Schwarze Löcher: Mehr als nur kosmische Staubsauger?*'
              youtube: LWubjUb-ews
              flip: true
              text: My first large public outreach talk, in front of an audience of about 500 people.

        - id: screen
          name: On screen
          layout: cards
          items:
            - kicker: ARTE · Le Vortex · in French
              title: '*Il y avait quoi avant le Big Bang ?*'
              youtube: rX-vQ2GKoec
              text: An episode of ARTE's science channel *Le Vortex*. I took part as a scientific advisor and provided some of the cosmological simulation videos shown in the episode.
            - kicker: Documentary · 2023 · 65 min
              title: '*When Fish Begin to Crawl*'
              subtitle: by Morag McKinnon and Jim Sutherland
              film: true
              text: A documentary blending art and science to explore the climate crisis and our relationship with nature, from Scotland's Flow Country. I provided scientific visualizations for the film.
              link:
                text: View on IMDb
                url: https://www.imdb.com/title/tt27542871/
---
