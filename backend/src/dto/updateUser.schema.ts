import { object, string, boolean } from 'yup'

export default object().shape({
    customBio: string(),
    customLocation: string(),
    customName: string(),
    lookingForCoffeeChats: boolean(),
    openToCoffeeChats: boolean(),
});