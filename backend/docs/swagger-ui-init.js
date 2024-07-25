window.onload = function() {
    const ui = SwaggerUIBundle({
      url: "/docs/swagger.json",
      dom_id: '#swagger-ui',
      presets: [
        SwaggerUIBundle.presets.apis,
        SwaggerUIStandalonePreset
      ],
      layout: "StandaloneLayout"
    });
  
    window.ui = ui;
  };
  