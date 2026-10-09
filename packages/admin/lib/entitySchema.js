// packages/admin-panel/src/lib/entitySchema.js

/**
 * Defines a single admin entity/resource.
 *
 * @param {Object} def
 * @param {string} def.label        - Display name shown in nav and page headers, e.g. "Users"
 * @param {string} [def.route]      - URL segment under /admin/, defaults to the entity's key
 * @param {boolean} [def.canCreate] - Set false to hide the "New" button and block the /new route
 * @param {boolean} [def.canDelete] - Set false to hide delete/bulk-delete actions
 * @param {Array<{head: string, key: string}>} def.fields
 *        Table columns. `key` supports "field:bold" suffix for emphasis.
 *        Field-level `editable: false` locks a field from editing in the form.
 * @param {Array<{field: string, label: string, options: string[]}>} [def.filters]
 *        Optional dropdown filters shown above the table.
 * @param {string} [def.getApi]     - Override the default GET endpoint (defaults to /search/{route})
 * @param {string} [def.deleteApi]  - Override the default DELETE endpoint (defaults to /{route})
 * @returns {Object} the same definition, unchanged — this function exists for
 *          shape/autocomplete purposes, not transformation
 */
export function defineEntity(def) {
  if (process.env.NODE_ENV !== "production") {
    if (!def.label) {
      console.warn("[@lynx/admin-panel] entity is missing a required `label`");
    }
    if (!Array.isArray(def.fields) || def.fields.length === 0) {
      console.warn(
        `[@lynx/admin-panel] entity "${def.label ?? "?"}" has no \`fields\` — table will render empty columns`,
      );
    }
    if (def.filters && !Array.isArray(def.filters)) {
      console.warn(`[@lynx/admin-panel] entity "${def.label ?? "?"}" \`filters\` must be an array`);
    }
    if (def.canCreate !== undefined && typeof def.canCreate !== "boolean") {
      console.warn(
        `[@lynx/admin-panel] entity "${def.label ?? "?"}" \`canCreate\` must be a boolean`,
      );
    }
    if (def.canDelete !== undefined && typeof def.canDelete !== "boolean") {
      console.warn(
        `[@lynx/admin-panel] entity "${def.label ?? "?"}" \`canDelete\` must be a boolean`,
      );
    }
    if (Array.isArray(def.fields)) {
      for (const field of def.fields) {
        if (field.editable !== undefined && typeof field.editable !== "boolean") {
          console.warn(
            `[@lynx/admin-panel] entity "${def.label ?? "?"}" field "${field.name ?? "?"}" \`editable\` must be a boolean`,
          );
        }
      }
    }
  }
  return def;
}

/**
 * Defines the full entities map. Thin wrapper — mainly for a single,
 * discoverable import site and consistent dev-time validation.
 *
 * @param {Object<string, Object>} map - slug -> defineEntity(...) result
 */
export function defineEntities(map) {
  return map;
}
