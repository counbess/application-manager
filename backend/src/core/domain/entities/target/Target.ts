import { InvalidTargetPortError } from './errors/InvalidTargetPortError';
import { MissingTargetPortError } from './errors/MissingTargetPortError';
import { InvalidTargetHostError } from './errors/InvalidTargetHostError';
import { MissingTargetHostError } from './errors/MissingTargetHostError';
import { InvalidTargetTypeError } from './errors/InvalidTargetTypeError';
import { MissingTargetTypeError } from './errors/MissingTargetTypeError';
import { InvalidTargetNameError } from './errors/InvalidTargetNameError';
import { MissingTargetNameError } from './errors/MissingTargetNameError';

export enum TargetTypes {
  DEVELOPMENT = 'DEVELOPMENT',
  HOMOLOGATION = 'HOMOLOGATION',
  PRODUCTION = 'PRODUCTION',
}

export class Target {
  constructor(
    readonly name: string,
    readonly type: TargetTypes,
    readonly host: string,
    readonly port: number,
  ) {
    if (!name) {
      throw new MissingTargetNameError();
    } else if (typeof name !== 'string') {
      throw new InvalidTargetNameError();
    }

    if (!type) {
      throw new MissingTargetTypeError();
    } else if (
      type !== TargetTypes.DEVELOPMENT
    && type !== TargetTypes.HOMOLOGATION
    && type !== TargetTypes.PRODUCTION
    ) {
      throw new InvalidTargetTypeError();
    }

    if (!host) {
      throw new MissingTargetHostError();
    } else if (typeof host !== 'string') {
      throw new InvalidTargetHostError();
    }

    if (!port && port !== 0) {
      throw new MissingTargetPortError();
    } else if (typeof port !== 'number' || port < 0) {
      throw new InvalidTargetPortError();
    }
  }
}
