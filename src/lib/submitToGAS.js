// type SubmitArgs = {
//   formType: 'newsletter' | 'contact';
//   formData: Record<string, unknown>;
//   issuedAt: number; // Date.now() from the component during mounting
// };

export async function submitToGAS({ formType, formData, issuedAt }) {
  const endpointUrl = process.env.NEXT_PUBLIC_FORMS_ENDPOINT;
  const secret = process.env.NEXT_PUBLIC_FORMS_SECRET;

  const body = {
    __secret: secret,
    formType,
    issuedAt,
    formData,
  };

  const response = await fetch(endpointUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await response.json().catch(() => ({}));
  return { ok: response.ok && json?.ok, status: response.status, data: json };
}
