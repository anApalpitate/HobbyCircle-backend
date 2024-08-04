// src/exception/business.error.ts
export class BusinessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'BusinessError';
  }
}
