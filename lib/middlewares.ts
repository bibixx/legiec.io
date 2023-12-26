import { ZodType, output, z } from "zod";
import { Result } from "./utils";

export function withValidation<T extends ZodType, U = void>(
  validator: T,
  cb: (arg: output<T>) => U | Promise<U>
) {
  return async function (arg: output<T>) {
    await validator.parseAsync(arg);
    return cb(arg);
  };
}

export class UserFacingError extends Error {
  public static ERROR_TYPE = "UserFacingError";
  public ERROR_TYPE = UserFacingError.ERROR_TYPE;
}
const validateUserFacingError = z.object({
  message: z.string(),
  ERROR_TYPE: z.literal(UserFacingError.ERROR_TYPE),
});

export function withUserFacingError<T extends any[], U>(cb: (...args: T) => U) {
  return async function (...args: T): Promise<Result<Awaited<U>>> {
    try {
      return { ok: true, result: await cb(...args) };
    } catch (error) {
      const errorResult = validateUserFacingError.safeParse(error);

      if (errorResult.success) {
        return { ok: false, error: errorResult.data.message };
      }

      throw error;
    }
  };
}

export function withUserFacingErrorAndValidation<T extends ZodType, U = void>(
  validator: T,
  cb: (arg: output<T>) => U | Promise<U>
) {
  return withUserFacingError(withValidation(validator, cb));
}
