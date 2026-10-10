export default async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
    });
  }

  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  let body;
  try {
    body = await req.json();
  } catch {
    return new Response('Invalid JSON', { status: 400 });
  }

  const { first_name, last_name, email } = body;
  if (!email) {
    return new Response('Email is required', { status: 400 });
  }

  const apiKey = Netlify.env.get('GIVEBUTTER_API_KEY');

  const gbRes = await fetch('https://api.givebutter.com/v1/contacts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
    body: JSON.stringify({ first_name, last_name, email }),
  });

  const data = await gbRes.json();

  if (!gbRes.ok) {
    console.error('Givebutter error:', data);
    return new Response(JSON.stringify(data), {
      status: gbRes.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};

export const config = { path: '/api/subscribe' };
