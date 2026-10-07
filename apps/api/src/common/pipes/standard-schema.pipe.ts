import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { z } from 'zod';

export interface StandardSchemaIssue {
  readonly message: string;
  readonly path?: ReadonlyArray<PropertyKey>;
}

export interface StandardSchemaResultSuccess<Output> {
  readonly value: Output;
  readonly issues?: never;
}

export interface StandardSchemaResultFailure {
  readonly issues: ReadonlyArray<StandardSchemaIssue>;
  readonly value?: never;
}

export type StandardSchemaResult<Output> =
  | StandardSchemaResultSuccess<Output>
  | StandardSchemaResultFailure;

export interface StandardSchema<Output = unknown> {
  readonly '~standard': {
    readonly version: 1;
    readonly vendor: string;
    readonly validate: (
      value: unknown
    ) => StandardSchemaResult<Output> | Promise<StandardSchemaResult<Output>>;
  };
}

@Injectable()
export class StandardSchemaPipe implements PipeTransform {
  constructor(private readonly schema?: StandardSchema | z.ZodTypeAny) {}

  async transform(value: unknown, _metadata?: ArgumentMetadata) {
    const targetSchema = this.schema;
    if (!targetSchema) {
      return value;
    }

    if ('~standard' in targetSchema) {
      const result = await targetSchema['~standard'].validate(value);
      if (result.issues && result.issues.length > 0) {
        throw new BadRequestException({
          message: 'Validation failed',
          issues: result.issues,
        });
      }
      return (result as StandardSchemaResultSuccess<unknown>).value;
    }

    const parseResult = await (targetSchema as z.ZodTypeAny).safeParseAsync(value);
    if (!parseResult.success) {
      throw new BadRequestException({
        message: 'Validation failed',
        issues: parseResult.error.issues,
      });
    }
    return parseResult.data;
  }
}
