import { defineEntity } from '@/packages/admin/index.jsx';
import { Images } from 'lucide-react';

export const gallery = defineEntity({
  slug: 'gallery',
  label: 'Gallery',
  icon: Images,
  titleField: 'label',
  roles: ['admin'],
  fields: [{ name: 'label', type: 'text', label: 'Label', required: true }],
  filters: [],
});
