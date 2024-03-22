import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsOlderThan18(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isOlderThan18',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
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
