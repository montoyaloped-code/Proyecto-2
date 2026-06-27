import { useState, useCallback } from 'react';
import { supabase } from '../supabaseClient';
import imageCompression from 'browser-image-compression';

const COMPRESSION_OPTIONS = {
  maxSizeMB: 0.5,
  maxWidthOrHeight: 1024,
  useWebWorker: true,
  fileType: 'image/webp',
};

const STORAGE_BUCKETS = {
  docentes: 'Docentes',
  sedes: 'Sedes imagenes',
  'cuadro-honor': 'Cuadro de honor',
};

function sanitizeFileName(name) {
  return name
    .replace(/[^a-zA-Z0-9._-]/g, '_')
    .toLowerCase()
    .slice(0, 60);
}

function generateFilePath(userId, file) {
  const ext = 'webp';
  const baseName = sanitizeFileName(file.name.replace(/\.[^.]+$/, ''));
  const timestamp = Date.now();
  return `${userId}/${timestamp}-${baseName}.${ext}`;
}

export function useImageUpload() {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const uploadImage = useCallback(async (file, bucketName) => {
    const bucket = STORAGE_BUCKETS[bucketName];
    if (!bucket) {
      throw new Error(`Bucket desconocido: ${bucketName}`);
    }

    setUploading(true);
    setProgress(0);

    try {
      const compressedFile = await imageCompression(file, COMPRESSION_OPTIONS);
      setProgress(50);

      const userId = (await supabase.auth.getUser()).data?.user?.id || 'anon';
      const filePath = generateFilePath(userId, compressedFile);

      const { error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(filePath, compressedFile, {
          cacheControl: '3600',
          upsert: false,
          contentType: 'image/webp',
        });

      if (uploadError) throw uploadError;
      setProgress(80);

      const { data: publicUrlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(filePath);

      setProgress(100);
      return publicUrlData.publicUrl;
    } finally {
      setUploading(false);
    }
  }, []);

  const deleteImage = useCallback(async (url) => {
    if (!url || !url.includes('/storage/v1/object/public/')) return;

    const bucketNames = Object.values(STORAGE_BUCKETS);
    const bucketName = bucketNames.find((name) =>
      url.includes(`/${name}/`)
    );
    if (!bucketName) return;

    const parts = url.split('/');
    const bucketIndex = parts.indexOf(bucketName);
    if (bucketIndex === -1) return;
    const filePath = parts.slice(bucketIndex + 1).join('/');

    const { error } = await supabase.storage
      .from(bucketName)
      .remove([filePath]);

    if (error) console.error('Error deleting image from storage:', error);
  }, []);

  return { uploadImage, deleteImage, uploading, progress };
}
