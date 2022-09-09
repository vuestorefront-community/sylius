export const mapConfigToSetupObject = ({ moduleOptions, additionalProperties = {} }) => ({
  ...moduleOptions,
  ...additionalProperties
});
