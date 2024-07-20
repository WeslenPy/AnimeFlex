import crypto from "./webcryptor.mjs";

export class ManagerDecrypt {

    keys = [
        "mS9wR2qY7pK7vX5n",
        "fV3gK5vU7uG6hU5e",
        "oU0dI2lL2tK2dR9f",
    ]


    config: any = {
        sigBytes: 32,
        words: [1884436332, 1295477057, 929846578, 1867920227,
            1144552015, 878792752, 1917597540, 1211458376],
    }


    reverse(value: string): string {
        return value === '' ? '' : this.reverse(value.substr(1)) + value.charAt(0)
    }

    decrypt_jwt(token: string) {
        let jwt = token
        let iv: any = jwt.substring(jwt.length - 64)

        iv = crypto.WebCrypto.enc.Utf8.parse(this.reverse(iv))
        
        let words = crypto.WebCrypto.JWT.decrypt(jwt.slice(36,-64),this.config,{iv})
        let url = crypto.WebCrypto.enc.Utf8.stringify(words)

        return url;
    }

}