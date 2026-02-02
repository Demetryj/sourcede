// type SubmitArgs = {
//   formType: 'newsletter' | 'contact';
//   formData: Record<string, unknown>;
//   issuedAt: number; // Date.now() from the component during mounting
// };

export async function submitToGAS({ formType, formData, issuedAt }) {
  const body = {
    formType,
    issuedAt,
    formData,
  };

  const response = await fetch('/api/forms', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const json = await response.json().catch(() => ({}));
  return { ok: response.ok && json?.ok, status: response.status, data: json };
}
