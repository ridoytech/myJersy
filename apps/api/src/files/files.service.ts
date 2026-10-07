import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import * as fs from 'node:fs';
import * as path from 'node:path';
import { prisma } from '@repo/database';

@Injectable()
export class FilesService {
  private readonly storageRoot: string;

  constructor() {
    this.storageRoot = path.resolve(
      process.cwd(),
      process.env.STORAGE_ROOT || '../../storage/uploads'
    );

    if (!fs.existsSync(this.storageRoot)) {
      fs.mkdirSync(this.storageRoot, { recursive: true });
    }
  }

  getStorageRoot(): string {
    return this.storageRoot;
  }

  async registerFile(fileInfo: {
    originalName: string;
    mimeType: string;
    size: number;
    filename: string;
    uploaderId: string;
  }) {
    const storagePath = path.join(this.storageRoot, fileInfo.filename);

    return prisma.file.create({
      data: {
        originalName: fileInfo.originalName,
        mimeType: fileInfo.mimeType,
        size: fileInfo.size,
        storagePath,
        uploaderId: fileInfo.uploaderId,
        isPrivate: true,
      },
    });
  }

  async getFileForDownload(fileId: string, requestingUserId?: string) {
    const file = await prisma.file.findUnique({
      where: { id: fileId },
    });

    if (!file) {
      throw new NotFoundException('File not found');
    }

    // Permission check: if private, verify requesting user
    if (file.isPrivate && requestingUserId && file.uploaderId !== requestingUserId) {
      throw new ForbiddenException('You do not have permission to access this file');
    }

    if (!fs.existsSync(file.storagePath)) {
      throw new NotFoundException('Physical file missing from server storage');
    }

    const fileStream = fs.createReadStream(file.storagePath);
    return {
      file,
      stream: fileStream,
    };
  }

  async listUserFiles(userId: string) {
    return prisma.file.findMany({
      where: { uploaderId: userId },
      orderBy: { createdAt: 'desc' },
    });
  }
}
