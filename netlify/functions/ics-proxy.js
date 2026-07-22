exports.handler = async function (event, context) {
  const icsUrl = event.queryStringParameters.url;

  if (!icsUrl) {
    return {
      statusCode: 400,
      body: "Falta el parámetro 'url'",
    };
  }

  try {
    const response = await fetch(icsUrl);
    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "text/calendar",
        "Access-Control-Allow-Origin": "*",
      },
      body: data,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: "Error al traer el ICS: " + error.message,
    };
  }
};