import endpoint from "./urls";

export class SessionManager extends endpoint.URLManager {

    headers = { Accept: 'application/json',"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0"}

    async get(url: string) {

        let result = await fetch(url,{  method: 'GET',headers:this.headers })
        let data = await result.json()
        return data

    }
    async post(url: string) {

        let result = await fetch(url, { method: "POST",headers:this.headers })
        let data = await result.json()

        return data

    }


}
