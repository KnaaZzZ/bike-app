import Product, { IProduct } from '@/src/db/models/product';
import { createApiHandler } from '@/src/utils/api';

const apiHandler = createApiHandler<typeof Product, IProduct>(Product);

const { POST, GET } = apiHandler;

export { POST, GET };
