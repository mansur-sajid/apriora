export class MetaError extends Error {
    public meta?: Record<string, unknown>
    public status: number
    constructor(message = 'Validation Error', status = 500, meta: Record<string, unknown> = {}) {
      super(message)
      this.name = this.constructor.name
      this.status = status
      this.message = message
      if (meta) this.meta = meta
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Error.captureStackTrace?.(this, this.constructor)
    }
  }
  
  export class MetaWarning extends MetaError {
    public override meta: Record<string, unknown>
    constructor(message = 'Validation Error', status = 400, meta: Record<string, unknown> = {}) {
      super(message, status, meta)
      this.meta = meta
    }
  }
  
  export class NotFoundError extends MetaWarning {
    constructor(message = 'Not Found', meta?: Record<string, unknown>) {
      super(message, 404, meta)
    }
  }
  
  export class ValidationError extends MetaWarning {
    constructor(message = 'Validation Error', meta?: Record<string, unknown>) {
      super(message, 400, meta)
    }
  }
  
  export class UnauthenticatedError extends MetaWarning {
    constructor(message = 'Unauthenticated Error', meta?: Record<string, unknown>) {
      super(message, 401, meta)
    }
  }
  
  export class ForbiddenError extends MetaWarning {
    constructor(message = 'Forbidden Error', meta?: Record<string, unknown>) {
      super(message, 403, meta)
    }
  }
  
  export class TimeoutError extends MetaWarning {
    constructor(message = 'Timeout Error', meta?: Record<string, unknown>) {
      super(message, 408, meta)
    }
  }
  
  export class BusinessLogicError extends MetaWarning {
    constructor(message = 'Business Logic Error', meta?: Record<string, unknown>) {
      super(message, 409, meta)
    }
  }
  
  export class UserError extends MetaWarning {
    constructor(message = 'User Error', meta?: Record<string, unknown>) {
      super(message, 412, meta)
    }
  }
  
  export class ServerError extends MetaWarning {
    constructor(message = 'Internal Server Error', meta?: Record<string, unknown>) {
      super(message, 500, meta)
    }
  }
  
  export class RelationNotFound extends MetaWarning {
    constructor(message = 'Relation does not exist', meta?: Record<string, unknown>) {
      super(message, 404, meta)
    }
  }
  
  export class InvalidRequiredArgument extends ValidationError {
    constructor(
      { name, requiredType }: { name: string; requiredType: string },
      meta?: Record<string, unknown>
    ) {
      super(`argument ${name} is required, and must be of type ${requiredType}`, meta)
    }
  }
  
  export class BusinessInstanceNotFound extends NotFoundError {
    constructor(
      { name, by, source }: { name: string; by: string; source?: string },
      meta?: Record<string, unknown>
    ) {
      const sourceStr = source ? `${source}: ` : ''
      super(`${sourceStr}${name} not found by the provided ${by}`, meta)
    }
  }
  
  export class ArgumentMissingRequiredKeys extends ValidationError {
    constructor({ name, keys }: { name: string; keys: unknown[] }, meta?: Record<string, unknown>) {
      super(`Object '${name}' does not contain required key(s) ${keys}`, meta)
    }
  }
  