class ServiceResponse {
  constructor(serviceName, error) {
    if (typeof serviceName === "undefined")
      throw new Error("ServiceResponse must have a service name!");

    this.meta = {
      service: serviceName,
      status: 200,
      timestamp: new Date(),
      error: error || null,
    };

    this.data = null;
  }

  setError(message) {
    this.data = null;
    this.meta.error = message;
  }
  setData(data) {
    this.data = data;
    this.meta.error = null;
  }
  setServiceName(serviceName) {
    this.meta.service = serviceName;
  }

  hasError() {
    return this.meta.error != null;
  }
}

module.exports = ServiceResponse;
