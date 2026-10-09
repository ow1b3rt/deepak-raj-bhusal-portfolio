"use client";

import { notFound, useParams, useRouter } from "next/navigation";
import {
  AdminLayout,
  Badge,
  PayloadEntityForm,
  RecordDetail,
  removeEmptyFields,
  useApi,
  useGet,
  useToast,
} from "@/packages/admin";
import { Loader2 } from "lucide-react";

import { entities } from "@/app/admin/entities";

const STATUS_VARIANT = {
  pending: "warning",
  confirmed: "success",
  cancelled: "danger",
  completed: "primary",
  published: "success",
  draft: "default",
};

function coerceRelationshipIds(values, fields) {
  const relationshipFields = fields.filter((f) => f.type === "relationship");
  if (relationshipFields.length === 0) return values;

  const coerced = { ...values };
  for (const field of relationshipFields) {
    const raw = coerced[field.name];
    if (raw == null || raw === "") continue;

    const toNumberOrKeep = (v) => (v !== "" && !isNaN(Number(v)) ? Number(v) : v);
    coerced[field.name] = Array.isArray(raw) ? raw.map(toNumberOrKeep) : toNumberOrKeep(raw);
  }
  return coerced;
}

function firstAvailable(item, keys) {
  for (const key of keys) {
    if (item[key]) return item[key];
  }
  return "";
}

function DetailHero({ entity, item, isNew, saveButton }) {
  const Icon = entity.icon;
  const title = isNew
    ? "New record"
    : firstAvailable(item, [entity.titleField, "name", "email", "subject"]);
  const subtitle = isNew
    ? "Fill in the fields below and save."
    : firstAvailable(item, ["email", "name", "title"]);
  const accentValue = item.status;

  return (
    <header className="flex flex-wrap items-center gap-4 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
      {Icon && (
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-900 text-white shadow-sm">
          <Icon size={22} />
        </div>
      )}

      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium tracking-widest text-gray-400 uppercase">
          {entity.label}
        </p>
        <h2 className="truncate text-lg font-semibold text-gray-900">{title}</h2>
        {subtitle && subtitle !== title && (
          <p className="truncate text-sm text-gray-500">{subtitle}</p>
        )}
      </div>

      <div className="flex shrink-0 items-center gap-3">
        {accentValue && !isNew && (
          <Badge
            value={accentValue}
            variant={STATUS_VARIANT[accentValue] ?? "default"}
            size="lg"
            className="shrink-0 capitalize"
          />
        )}
        {saveButton}
      </div>
    </header>
  );
}

export default function EntityEditPage() {
  const { entity: entitySlug, id } = useParams();
  const toast = useToast();
  const entity = entities[entitySlug];
  const { post, patch } = useApi();
  const router = useRouter();
  if (!entity) notFound();
  const isNew = id === "new";
  const canCreate = entity.canCreate !== false;
  if (isNew && !canCreate) notFound();

  const editableFields = entity.fields.filter((f) => f.editable !== false);
  const editableNames = new Set(editableFields.map((f) => f.name.split(":")[0]));
  if (!isNew && editableFields.length === 0) notFound();

  const apiPath = `/${entity.slug}`;
  const { data, loading } = useGet(isNew ? null : `${apiPath}/${id}`);

  if (!isNew && loading) {
    return (
      <AdminLayout title={entity.label}>
        <div className="mx-auto flex max-w-4xl">
          <div className="w-full rounded-xl border border-gray-200 bg-white p-6 text-sm text-gray-500 shadow-sm">
            <div className="flex items-center gap-2">
              <Loader2 size={18} className="animate-spin text-gray-400" />
              Loading…
            </div>
          </div>
        </div>
      </AdminLayout>
    );
  }

  const item = data?.item ?? {};
  const hasStatus = entity.fields.some((f) => f.name.split(":")[0] === "status");
  const visibleFields = entity.fields.filter((f) => f.invisible !== true);

  async function handleSubmit(values) {
    const definedValues = removeEmptyFields(values);
    const editableValues = Object.fromEntries(
      Object.entries(definedValues).filter(([key]) => editableNames.has(key)),
    );
    const url = isNew ? apiPath : `${apiPath}/${id}`;
    const payload = coerceRelationshipIds(editableValues, editableFields);
    const res = isNew ? await post(url, payload) : await patch(url, payload);
    if (res?.ok) {
      toast.success(`${entity.label} ${isNew ? "created" : "updated"} successfully`);
      router.replace(`/admin/${entitySlug}`);
    }
    return res;
  }

  return (
    <AdminLayout>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
        <DetailHero
          entity={entity}
          item={item}
          isNew={isNew}
          saveButton={
            editableFields.length > 0 && (
              <button
                type="submit"
                form="entity-form"
                className="shrink-0 rounded-lg bg-gray-900 px-5 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-gray-800"
              >
                Save
              </button>
            )
          }
        />

        {editableFields.length > 0 ? (
          <PayloadEntityForm
            collectionFields={entity.fields}
            defaults={item}
            onSubmit={handleSubmit}
            externalId="entity-form"
          />
        ) : (
          <RecordDetail
            hideHeader
            fields={visibleFields}
            data={item}
            accentField={hasStatus ? "status" : null}
          />
        )}
      </div>
    </AdminLayout>
  );
}
