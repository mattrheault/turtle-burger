export function reportError(err) {
  /*
   * We'd want to report errors to
   * a source such as sentry, or newrelic
   * if this were a production app.
   */
  console.error(err);
}
