import { Slug } from '@models/slug/slug';
import { SCHEMA } from '../../../schema';

export function resolveSchema(slug: Slug) {
  return SCHEMA[slug.schema](slug);
}
