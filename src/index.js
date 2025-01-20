const app = require('./app');

module.exports = app; // Exporta la app para que Vercel pueda manejarla

const port = process.env.PORT || 5000;
app.listen(port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${port}`);
  /* eslint-enable no-console */
});
