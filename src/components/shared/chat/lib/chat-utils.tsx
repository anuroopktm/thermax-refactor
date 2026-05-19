import {
  FileArchive,
  FileSpreadsheet,
  FileText,
  Film,
  Image,
  Music,
  File,
} from "lucide-react";

/**
 * Returns a beautiful themed Lucide icon with a customized color based on file type/extension.
 */
export const getFileIcon = (file: File) => {
  const type = file.type?.toLowerCase() || "";
  const name = file.name.toLowerCase();

  switch (true) {
    // Images
    case type.startsWith("image/") ||
      /\.(jpg|jpeg|png|gif|webp|svg)$/i.test(name):
      return <Image className="size-4 text-sky-500 shrink-0" />;

    // Videos
    case type.startsWith("video/") || /\.(mp4|mov|avi|mkv|webm)$/i.test(name):
      return <Film className="size-4 text-purple-500 shrink-0" />;

    // Audio
    case type.startsWith("audio/") ||
      /\.(mp3|wav|ogg|aac|m4a|flac)$/i.test(name):
      return <Music className="size-4 text-emerald-500 shrink-0" />;

    // PDF
    case type === "application/pdf" || /\.pdf$/i.test(name):
      return <FileText className="size-4 text-red-500 shrink-0" />;

    // Spreadsheet
    case /spreadsheet|excel|csv/i.test(type) || /\.(csv|xlsx|xls)$/i.test(name):
      return <FileSpreadsheet className="size-4 text-green-500 shrink-0" />;

    // Archives
    case /zip|tar|gzip|compressed|rar/i.test(type) ||
      /\.(zip|tar|gz|rar|7z)$/i.test(name):
      return <FileArchive className="size-4 text-amber-500 shrink-0" />;

    // Default unknown files
    default:
      return <File className="size-4 text-muted-foreground shrink-0" />;
  }
};

/**
 * Merges a list of new files into an existing list of files, preventing duplicates by comparing file names and sizes.
 */
export const mergeUniqueFiles = (
  existingFiles: File[],
  newFiles: File[],
): File[] => {
  const existingSet = new Set(existingFiles.map((f) => `${f.name}-${f.size}`));
  return [
    ...existingFiles,
    ...newFiles.filter((f) => !existingSet.has(`${f.name}-${f.size}`)),
  ];
};
