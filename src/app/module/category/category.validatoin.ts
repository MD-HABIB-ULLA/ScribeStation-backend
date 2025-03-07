import { z } from 'zod';

export const CategoryValidationSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Category name is required'),
    image: z.string().min(1, 'Image name is required'),
    icon: z.string().min(1, 'Icon name is required'),
    description: z.string().min(1, 'Description is required'),
    isActive: z.boolean().optional().default(true),
    isDeleted: z.boolean().optional().default(false),
  }),
});


export const UpdateCategoryValidationSchema = z.object({
    body : z.object({
        name : z.string().optional(),
        image : z.string().optional(),
        icon : z.string().optional(),
        description : z.string().optional(),
       
    })
})
