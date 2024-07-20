

class Query {

    info = "info";
    latest = "latest";
    letter = "letra";

    episodes = "episodios";
    popular = "populares";
    category = "categoria";

    cat_id = "cat_id";
    search = "search";
    token = "token";
    r = "r";


}


class URLManager extends Query {

    domain = "https://atv2.net";
    api = `${this.domain}/meuanimetv-74.php`;
    image = "https://i0.wp.com/cdn.atv2.net/img";


    
    mountURL(query: string) {
        return `${this.api}?${query}`;
    }
    
    router_image(source:string){
        let image = `${this.image}/${source}`;
        console.log(image)
        return image;
    }

    router_info() {
        return this.mountURL(this.info)
    }

    router_latest(){
        return this.mountURL(this.latest)
    }

    router_popular(){
        return this.mountURL(this.popular)
    } 

    router_category(search_category:string){
        return this.mountURL(this.category+"="+search_category)
    }

    router_cat_id(cat_id:number){
        return this.mountURL(this.cat_id+"="+cat_id)
    }

    router_search(search_anime:string){
        return this.mountURL(this.search+"="+search_anime)
    }

    router_letter(search_letter:string){
        return this.mountURL(this.letter+"="+search_letter)
    }


    router_ep(ep_id: number) {
        var timing = Math.floor(Math.random() * 33441 + 18384)
        const date = new Date();
        let token_base_time = Math.floor((date.getTime() / 43687) * timing * 127)

        let endpoint = `${this.episodes}=${ep_id}&${this.token}=${token_base_time}&${this.r}=${timing}`

        return this.mountURL(endpoint)
    }



}

export default { URLManager };