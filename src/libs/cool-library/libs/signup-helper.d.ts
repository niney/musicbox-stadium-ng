export declare class SignupHelper {
    /**
     * 사업자 등록번호 검증
     * @param regNumber 사업자등록번호
     * @return boolean 검증결과
     */
    validRegNumber(regNumber: string): boolean;
    /**
     * 이메일/사업자 번호 중복 체크
     */
    signupDupCheckByType(type: string, value: string): Promise<number>;
    private getDupCheckURL;
}
