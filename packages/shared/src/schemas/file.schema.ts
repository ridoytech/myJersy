import { z } from 'zod';

export const FileDownloadParamsSchema = z.object({
  id: z.string().uuid({ message: 'File ID must be a valid UUID' }),
});

export type FileDownloadParams = z.infer<typeof FileDownloadParamsSchema>;

export const FileListQuerySchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(100).default(20),
  search: z.string().optional(),
});

export type FileListQuery = z.infer<typeof FileListQuerySchema>;

export const FileMetadataSchema = z.object({
  id: z.string().uuid(),
  originalName: z.string(),
  mimeType: z.string(),
  size: z.number().int().nonnegative(),
  uploaderId: z.string().uuid(),
  createdAt: z.date(),
});

export type FileMetadata = z.infer<typeof FileMetadataSchema>;
