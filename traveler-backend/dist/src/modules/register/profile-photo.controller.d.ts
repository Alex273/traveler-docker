/// <reference types="multer" />
export declare class ProfilePhotosController {
    getFile(filename: string, res: any): Promise<void>;
    uploadMultipleFiles(files: Array<Express.Multer.File>): any[];
}
