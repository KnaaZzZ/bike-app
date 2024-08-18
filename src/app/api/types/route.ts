import Type, { IType } from '@/src/db/models/type';
import { createApiHandler } from '@/src/utils/api';

const apiHandler = createApiHandler<typeof Type, IType>(Type);

const { POST, GET } = apiHandler;

export { POST, GET };
