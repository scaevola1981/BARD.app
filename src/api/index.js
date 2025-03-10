

import  adEntity from './ad.entity'
import userEntity from "./user.entity";
import templateEntity from "./template.entity";

const Api = {
    user: userEntity,
    template: templateEntity,
    ad: adEntity,
}

export default Api;