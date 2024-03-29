import { MultimediaType } from "../entities/Multimedia"

export function getFileTypeHelper(filename: string): MultimediaType {
    const fileType = filename.split('.').pop()

    switch (fileType) {
        case "png":
        case "jpg":
        case "jpeg":
            return MultimediaType.IMAGE
        case "doc":
        case "docx":
            return MultimediaType.DOCUMENT
        case "pdf":
            return MultimediaType.PDF
        case "mp4":
        case "mov":
            return MultimediaType.VIDEO
        case "zip":
            return MultimediaType.ZIP
        default:
            return MultimediaType.EMPTY
    }
}

export const ACCEPTABLE_FILE_TYPE = ".pdf, .doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document, video/*, image/*, .zip" 