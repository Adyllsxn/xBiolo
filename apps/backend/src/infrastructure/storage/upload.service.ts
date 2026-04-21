import { Injectable, BadRequestException } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import * as fs from 'fs';
import { v4 as uuidv4 } from 'uuid';
import sharp from 'sharp';

export type EntityType = 'products' | 'categories' | 'users' | 'stores';

@Injectable()
export class UploadService {
  private readonly baseUploadDir = join(process.cwd(), 'uploads');

  constructor() {
    this.ensureDirectories();
  }

  private ensureDirectories() {
    const folders = [
      this.baseUploadDir,
      join(this.baseUploadDir, 'products'),
      join(this.baseUploadDir, 'categories'),
    ];

    folders.forEach((folder) => {
      if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
      }
    });
  }

  getStorageConfig(entity: EntityType) {
    return diskStorage({
      destination: join(this.baseUploadDir, entity),
      filename: (req, file, callback) => {
        const uniqueName = `${uuidv4()}${extname(file.originalname)}`;
        callback(null, uniqueName);
      },
    });
  }

  getFileFilter() {
    return (req: any, file: any, callback: any) => {
      const allowedMimes = [
        'image/jpeg',
        'image/png',
        'image/jpg',
        'image/webp',
      ];
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
      if (allowedMimes.includes(file.mimetype)) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        callback(null, true);
      } else {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        callback(
          new BadRequestException(
            'Apenas imagens são permitidas (JPEG, PNG, JPG, WEBP)',
          ),
          false,
        );
      }
    };
  }

  getFileOptions(entity: EntityType) {
    return {
      storage: this.getStorageConfig(entity),
      fileFilter: this.getFileFilter(),
      limits: {
        fileSize: 5 * 1024 * 1024, // 5MB
      },
    };
  }

  async saveImage(
    file: Express.Multer.File,
    entity: EntityType,
  ): Promise<string> {
    const filename = `${uuidv4()}${extname(file.originalname)}`;
    const filepath = join(this.baseUploadDir, entity, filename);

    // Otimizar imagem com sharp
    await sharp(file.buffer)
      .resize(800, 800, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(filepath);
    return `/uploads/${entity}/${filename}`;
  }

  getImageUrl(filename: string, entity: EntityType): string {
    return `/uploads/${entity}/${filename}`;
  }

  deleteImage(url: string | null): boolean {
    if (!url) return false;

    // Extrair caminho da URL
    const parts = url.split('/uploads/');
    if (parts.length < 2) return false;

    const filePath = join(process.cwd(), 'uploads', parts[1]);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      return true;
    }
    return false;
  }

  extractFilenameFromUrl(url: string | null): string | null {
    if (!url) return null;
    const parts = url.split('/');
    return parts[parts.length - 1];
  }
}
