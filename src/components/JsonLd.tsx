/**
 * Renders a JSON-LD structured-data block. Server-component safe.
 * Usage: <JsonLd data={ORG_SCHEMA} />
 */
export default function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
