export declare class FileHelper {
    getExtension(fileName: string): string | undefined;
    /**
     * 파일명(확장자 없이) 가져오기
     * @param filename string 파일명
     */
    getBaseName(filename: string): string;
    /**
     * 확장자 가져오기
     * @param filename 파일명
     * @return {string}
     */
    getFileExt(filename: string): RegExpExecArray | null | undefined;
}
