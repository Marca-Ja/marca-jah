import { registerDecorator, ValidationOptions } from 'class-validator';

export function IsOlderThan18(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isOlderThan18',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const currentDate = new Date();
          const minDate = new Date(
            currentDate.getFullYear() - 18,
            currentDate.getMonth(),
            currentDate.getDate(),
          );

          return (
            value.getFullYear() < minDate.getFullYear() ||
            (value.getFullYear() === minDate.getFullYear() &&
              value.getMonth() < minDate.getMonth()) ||
            (value.getFullYear() === minDate.getFullYear() &&
              value.getMonth() === minDate.getMonth() &&
              value.getDate() <= minDate.getDate())
          );
        },
      },
    });
  };
}

export function IsWithinLast130Years(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      name: 'isWithinLast130Years',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any) {
          const currentDate = new Date();

          const currentYear = currentDate.getFullYear();
          const minYear = currentYear - 130;

          return (
            value.getFullYear() >= minYear && value.getFullYear() <= currentYear
          );
        },
      },
    });
  };
}
