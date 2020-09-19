class ServiceMetaResponse {
  constructor(service, error) {
    if (typeof service === "undefined")
      throw new Error("ServiceResponse must have a service name!");

    this.service = service;
    this.timestamp = new Date();
    this.error = error;
  }

  setError(message) {
    this.meta.error = message;
  }

  setServiceName(serviceName) {
    this.meta.service = serviceName;
  }

  hasError() {
    return this.meta.error != null;
  }
}

module.exports = { service: 'service', timestamp: new Date(), error: 'error' };
