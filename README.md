# Makini Technical Assignment

## Objective

1. Implement data collection from Airtable DB via API (see Airtable base section)

2. Create a web-server with simple UI

3. Implement following views on UI:

   - Hierarchy view - output models in a tree structure, based on their parent-child relations

   - Drawings view and drawing output - list of drawings and page to view models assigned to a drawing

   - Service planner - display list of dates when services can be done based on schedule in DB and current date as starting poing

**Notes:**

- Airtable DB:

  - Base contains 4 tables: models, model_model, drawings and services. model_model is a pivot table that contains parent-child relations between models via number and parent_number fields. Note that models table contains references to model_model records in parents and children fields.

- In all views you may only output model numbers or names for drawings and services. No additional fields required.

- Ui design is irrelevant, you can use the the most conveneient and fastest way output the data

- Optional: Implement caching to increase performance

---

Airtable Base

Tables

- `models`

  - number
  - description
  - unit
  - note
  - interchangeable_with
  - **parents** -> `model_model`
  - **children** -> `model_model`
  - **services** -> `services`

- `model_model`

  - id
  - **number** -> `models`
  - description
  - **parent_number** -> `models`
  - parent_description
  - quantity
  - **dwg_no** -> `drawings`

- `drawings`

  - name
  - **model_model** -> `model_model`

- `services`

  - id
  - name
  - instructions
  - condition
  - recurring
  - calendar_interval
  - calendar_interval_unit
  - running_hours_interval
  - alternative_interval
  - internative_interval_description
  - service_group
  - **model** -> `model`
