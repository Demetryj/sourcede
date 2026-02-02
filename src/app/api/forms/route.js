'use server';

export async function POST(request) {
  const endpointUrl = process.env.FORMS_ENDPOINT;
  const secret = process.env.FORMS_SECRET;

  if (!endpointUrl) {
    return Response.json({ ok: false, error: 'FORMS_ENDPOINT is not set' }, { status: 500 });
  }

  const body = await request.json().catch(() => ({}));

  const payload = {
    __secret: secret,
    formType: body?.formType,
    issuedAt: body?.issuedAt,
    formData: body?.formData,
  };

  try {
    const response = await fetch(endpointUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    const json = await response.json().catch(() => ({}));
    return Response.json(
      { ok: response.ok && json?.ok, status: response.status, data: json },
      { status: response.status }
    );
  } catch (error) {
    return Response.json({ ok: false, error: 'Upstream request failed' }, { status: 500 });
  }
}
