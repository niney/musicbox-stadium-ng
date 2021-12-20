var FileHelper = /** @class */ (function () {
    function FileHelper() {
    }
    FileHelper.prototype.getExtension = function (fileName) {
        return fileName.split('.').pop();
    };
    /**
     * 파일명(확장자 없이) 가져오기
     * @param filename string 파일명
     */
    FileHelper.prototype.getBaseName = function (filename) {
        var base = String(filename).substring(filename.lastIndexOf('/') + 1);
        if (base.lastIndexOf(".") !== -1) {
            base = base.substring(0, base.lastIndexOf("."));
        }
        return base;
    };
    /**
     * 확장자 가져오기
     * @param filename 파일명
     * @return {string}
     */
    FileHelper.prototype.getFileExt = function (filename) {
        return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
    };
    return FileHelper;
}());
export { FileHelper };
//# sourceMappingURL=file-helper.js.map