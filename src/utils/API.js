import axios from "axios";
const BASEURL = "https://randomuser.me/api/?results=5&nat=us";
// const APIKEY = "";
const API = {
    search: function () {
        return axios.get(BASEURL);
    }
    //   search: function(query) {
    //     return axios.get(BASEURL + query + APIKEY);
    //   }
}
export default API;