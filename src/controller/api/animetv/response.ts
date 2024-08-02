import { ManagerDecrypt } from "./decrypt";


class ResponseManager extends ManagerDecrypt {

    parse(result: any) {
        let data = result[0]
        let urls: any = [];

        this.keys.forEach(item => {
            if (data.hasOwnProperty(item)) {
                if (data[item].length > 0) {
                    urls.push(this.decrypt_jwt(data[item]))
                }
                delete result[0][item]
            }
        })

        result[0].urls = urls
        return result[0];
    }

}

export default { ResponseManager };