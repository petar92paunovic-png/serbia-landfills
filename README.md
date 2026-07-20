# Data Journalism Investigation: Non-Sanitary Landfills in Serbia (2015–2026)

## Project Overview

This repository contains the complete analytical workflow behind an investigation into Serbia's municipal waste management system between 2015 and 2026.

The project combines data journalism, Python, GIS analysis and manual verification to reconstruct the real condition of non-sanitary landfills across Serbia. It also includes the methodology used to estimate the distribution of wild dumpsites and produce all statistical outputs used in the published investigation.

Rather than documenting only the final results, this repository explains the methodological decisions that shaped the investigation and the challenges encountered while working with imperfect public datasets.

---

# Data Sources

## Primary Data Sources

- Serbian Environmental Protection Agency (SEPA)
- National Open Data Portal (data.gov.rs)
- Annual municipal landfill reports (2015–2026)

## Supporting Sources

- Ministry of Environmental Protection
- Municipal waste management companies
- Media reports
- Google Maps satellite imagery (used to verify selected landfill locations and investigate inconsistencies in official records)

---

# Software & Tools

## Data Processing

- **Python (Pandas)** – data cleaning, transformation, aggregation and statistical analysis.
- **QGIS** – manual spatial verification of landfill locations, coordinate validation and creation of the cleaned reference dataset.

## Verification & Research

- **Google Maps (Satellite Imagery)** – verification of selected landfill locations and investigation of inconsistencies in official records.
- **Google Gemini** – assisted retrieval of media reports, official statements and historical references used during the reporting process.

## Data Visualisation

- **geojson.io** – creation of custom GeoJSON polygons and map features.
- **Mapbox Studio** – design and styling of interactive maps.
- **Datawrapper** – creation of charts and statistical visualisations.

## Multimedia Production

- **CapCut** – editing GIF animations and short video sequences illustrating landfill fires.

## Editorial Workflow

- **ChatGPT** – editorial support, language refinement, consistency checks and translation of the final investigation.

---

# Repository Structure

The repository contains two analytical notebooks.

## landfill.ipynb

The original analytical workflow.

This notebook attempted to reconstruct landfill continuity using textual identifiers such as municipality names, landfill names and cadastral parcels.

During the investigation it became clear that this methodology produced incorrect results because the official registry contained numerous inconsistencies.

The notebook has been preserved to document the evolution of the project.

## landfill2.ipynb

The production notebook.

Following a complete manual spatial verification in QGIS, the analytical pipeline was redesigned around verified landfill locations.

All statistics, maps and visualisations published in the final investigation were generated from this workflow.

---

# Methodological Evolution

The investigation originally relied on automated record matching.

Landfills were connected through:

- municipality
- landfill name
- cadastral parcel

Initially this produced **182 landfill profiles**.

After introducing cadastral parcels as an additional constraint, the number fell to **167**.

Although these results initially appeared plausible, manual inspection revealed that the official registry could not reliably identify physical landfill locations over time.

The methodology was therefore redesigned from scratch.

---

# Problems in the Official Registry

## 1. The Same Landfill Appeared Under Different Names

The same physical landfill was often reported under different names in different reporting years.

Examples include:

- "Gradska deponija"
- "Smetlište Jeremino polje"

As a result, automated text matching incorrectly classified a single landfill as multiple locations.

---

## 2. Cadastral Parcels Were Not Reliable Identifiers

Parcel numbers contained numerous inconsistencies.

Examples included:

- inconsistent spacing
- different formatting
- incomplete parcel numbers

In addition, multiple physically distinct landfills sometimes shared the same cadastral parcel.

This caused automated deduplication to merge unrelated locations.

---

## 3. Administrative Records Changed Over Time

The registry was designed for annual administrative reporting rather than longitudinal analysis.

As reporting practices evolved, identifiers that appeared stable in one year often changed in later reports.

---

# Human-in-the-Loop GIS Verification

To resolve these inconsistencies, every reported landfill location was manually reviewed in QGIS.

Instead of relying exclusively on textual identifiers, each landfill was verified through its geographic position.

Duplicate locations were manually merged while preserving the reporting history associated with each site.

This process established a verified set of **154 unique non-sanitary landfill locations**.

The original database downloaded from **data.gov.rs** was therefore not used directly in the final analysis.

Instead, it served as the starting point for building a spatially verified database. After manually resolving duplicated locations and inconsistent identifiers in QGIS, the cleaned dataset was exported and became the foundation of the final analytical pipeline.

---

# Methodological Decisions

## Representing the Current Situation and Historical Change

Environmental protection systems and safety infrastructure changed considerably throughout the reporting period.

Some municipalities improved landfill conditions, while others deteriorated.

To capture both perspectives, the data were analysed in two complementary ways.

First, the most recent available report was used to describe the current condition of each landfill.

Second, historical changes were analysed separately.

Instead of comparing numerous individual infrastructure variables across every reporting year, two composite indices were created.

### Environmental Hazard Index

This index measures the presence of three environmental protection systems.

Each landfill receives an annual score ranging from:

- **0** – none of the required systems present
- **3** – all three systems present

### Safety Index

This index measures the presence of three safety-related measures.

The same 0–3 scoring system was applied.

Tracking these indices through time made it possible to identify improvement or deterioration while avoiding an unreadable comparison of dozens of individual variables.

---

## Verifying Municipal Coverage

Before beginning the analysis, the municipalities appearing in the landfill database were compared with the complete list of Serbian municipalities.

At first glance, several municipalities appeared to be missing from the dataset.

Further investigation revealed that this did not indicate incomplete reporting.

Instead, those municipalities had agreements allowing municipal waste to be disposed of at non-sanitary landfills operated by neighbouring municipalities.

These agreements were recorded in a separate field of the database.

This verification confirmed that the apparent absence of municipalities reflected regional waste-sharing arrangements rather than missing environmental data.

---

# Wild Dumpsites Methodology

Wild dumpsites required an entirely separate analytical workflow.

Unlike municipal landfills, they were recorded as thousands of independent geographic observations.

The official database contained more than **8,000 recorded locations**.

The objective was not to determine the exact number of wild dumpsites.

Such precision is practically impossible because many sites disappear, reappear or remain hidden beneath vegetation, while official records often span many years.

Instead, the methodology deliberately favoured a conservative estimate.

Locations within approximately **20 metres** were therefore treated as a single site, reducing the risk of artificially inflating the number of dumpsites through duplicate records.

This approach prioritised robustness over apparent precision.

The resulting figures should therefore be interpreted as conservative estimates intended to illustrate the scale of the problem rather than exact measurements.

---

# Validation

Several independent validation procedures were used during the investigation.

These included:

- manual inspection of disputed landfill locations
- GIS verification
- comparison with Google Maps satellite imagery
- comparison with official planning documents where available
- comparison with municipal reports and media coverage

One example involved a reported wild dumpsite near Smederevo.

Official records suggested that the site contained nearly two million tonnes of waste.

Satellite imagery demonstrated that such a volume was physically implausible given the measured surface area, revealing a significant error in the official database.

---

# Limitations

This investigation relies primarily on officially published environmental data.

Although Serbia has significantly expanded its open data infrastructure in recent years, reporting standards remain uneven across institutions.

Consequently, some records contain inconsistencies, omissions and administrative errors.

Whenever possible, disputed cases were verified using independent sources such as municipal reports, official statements, media reports and satellite imagery.

However, independently validating all 154 landfill locations is currently impossible because comparable datasets do not exist.

The greatest uncertainty concerns wild dumpsites.

By their nature they appear, disappear and frequently remain undocumented.

Even official estimates are based on approximations rather than direct measurements.

For this reason, the objective of this investigation was not to determine the exact number, surface area or waste volume of every wild dumpsite.

Instead, the methodology was designed to produce conservative estimates capable of illustrating their scale and distribution while minimising the risk of overestimation.

---

# Lessons Learned

This investigation highlighted several broader lessons relevant to data journalism.

- Open government datasets should not automatically be treated as ground truth.
- Spatial analysis can reveal errors that remain invisible in tabular datasets.
- Human verification remains essential when administrative datasets evolve over many years.
- Combining programming, GIS analysis and journalistic verification produces more reliable public-interest investigations than relying on any single method.

---

## Future Improvements

Future improvements to this repository could include:

- adding the cleaned reference dataset (`clean_aftermap.csv`) where legally permissible;
- documenting the complete QGIS workflow;
- publishing interactive versions of all maps;
- extending the methodology to sanitary landfills and regional waste management centres.

---

This repository is intended to document not only the final results of the investigation, but also the methodological decisions that made those results possible.
