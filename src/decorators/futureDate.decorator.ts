import { registerDecorator, ValidationOptions } from 'class-validator';

export function isFutureDate(validationOptions?: ValidationOptions) {
  return function (object: unknown, propertyName: string) {
    registerDecorator({
      name: 'isFutureDate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: Date) {
          if (!(value instanceof Date)) {
            return false;
          }

          const minimumDate = new Date();
          minimumDate.setMinutes(minimumDate.getMinutes() + 60);
          return value > minimumDate;
        },
      },
    });
  };
}
