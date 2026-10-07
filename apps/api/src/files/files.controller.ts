import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  StreamableFile,
  Response,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response as ExpressResponse } from 'express';
import { diskStorage } from 'multer';
import * as path from 'node:path';
import * as crypto from 'node:crypto';
import { FilesService } from './files.service.js';
import { StandardSchemaPipe } from '../common/pipes/standard-schema.pipe.js';
import { FileDownloadParamsSchema } from '@repo/shared';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: (_req, _file, cb) => {
          const service = new FilesService();
          cb(null, service.getStorageRoot());
        },
        filename: (_req, file, cb) => {
          const uniqueId = crypto.randomUUID();
          const ext = path.extname(file.originalname);
          cb(null, `${uniqueId}${ext}`);
        },
      }),
      limits: {
        fileSize: 50 * 1024 * 1024, // 50MB
      },
    })
  )
  async uploadFile(@UploadedFile() file?: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }

    return {
      message: 'File uploaded to private server storage successfully',
      originalName: file.originalname,
      size: file.size,
      mimeType: file.mimetype,
      filename: file.filename,
    };
  }

  @Get(':id/download')
  async downloadFile(
    @Param(new StandardSchemaPipe(FileDownloadParamsSchema)) params: { id: string },
    @Response({ passthrough: true }) res: ExpressResponse
  ) {
    const { file, stream } = await this.filesService.getFileForDownload(params.id);

    res.set({
      'Content-Type': file.mimeType,
      'Content-Disposition': `attachment; filename="${encodeURIComponent(file.originalName)}"`,
      'Content-Length': file.size.toString(),
      'X-Content-Type-Options': 'nosniff',
      'Cache-Control': 'no-store, private',
    });

    return new StreamableFile(stream);
  }
}
