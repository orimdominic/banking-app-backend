export default class ServiceError extends Error {
  label: string;
  constructor(message: string, label: string) {
    super(message);
    this.label = label;
  }
}
