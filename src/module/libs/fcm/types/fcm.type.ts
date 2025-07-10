import type { FactoryProvider, ModuleMetadata } from '@nestjs/common';

export type TypeFCMOptions = {
  clientEmail: string;
  privateKey: string;
  projectId: string;
};
export const FCMOptionsSymbol = Symbol('FCMOptionsSymbol');
export type TypeFCMAsyncOptions = Pick<ModuleMetadata, 'imports'> &
  Pick<FactoryProvider<TypeFCMOptions>, 'useFactory' | 'inject'>;
