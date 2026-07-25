// Función Netlify para enviar correos con Resend
// Asegurate de configurar RESEND_API_KEY en el panel de Netlify o en tu entorno local.

const https = require('https');

const fetch = globalThis.fetch || function (url, options = {}) {
  return new Promise((resolve, reject) => {
    const parsed = new URL(url);
    const requestBody = options.body;
    const req = https.request(
      {
        method: options.method || 'GET',
        hostname: parsed.hostname,
        port: parsed.port || 443,
        path: parsed.pathname + parsed.search,
        headers: options.headers,
      },
      (res) => {
        let rawData = '';
        res.setEncoding('utf8');
        res.on('data', (chunk) => rawData += chunk);
        res.on('end', () => {
          resolve({
            ok: res.statusCode >= 200 && res.statusCode < 300,
            status: res.statusCode,
            text: async () => rawData,
            json: async () => JSON.parse(rawData),
          });
        });
      }
    );

    req.on('error', reject);
    if (requestBody) {
      req.write(requestBody);
    }
    req.end();
  });
};

exports.handler = async function(event, context) {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Método no permitido' }),
    };
  }

  let payload;
  try {
    payload = JSON.parse(event.body || '{}');
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'JSON inválido en el cuerpo de la solicitud' }),
    };
  }

  const { nombre, email, asunto, categoria, mensaje } = payload;
  if (!nombre || !email || !mensaje) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Faltan datos requeridos' }),
    };
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'No está configurada la variable RESEND_API_KEY' }),
    };
  }

  const body = {
    from: 'Espacio Timbó <hello@espaciotimbo.netlify.app>',
    to: ['espaciotimbo.uy@gmail.com'],
    subject: asunto || 'Prueba Resend desde Espacio Timbó',
    html: `
      <h1>Nuevo mensaje de prueba</h1>
      <p><strong>Nombre:</strong> ${nombre}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Categoría:</strong> ${categoria}</p>
      <p><strong>Mensaje:</strong></p>
      <p>${mensaje.replace(/\n/g, '<br>')}</p>
    `,
  };

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${resendKey}`,
      },
      body: JSON.stringify(body),
    });

    const resultText = await response.text();
    let result;

    try {
      result = JSON.parse(resultText);
    } catch (parseError) {
      result = { error: resultText };
    }

    if (!response.ok) {
      const errorMessage = result.error || result.message || 'Error de Resend';
      return {
        statusCode: response.status,
        body: JSON.stringify({ error: errorMessage, details: result }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, messageId: result.id || null }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message, stack: error.stack }),
    };
  }
};