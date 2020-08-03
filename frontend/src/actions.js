export function setCategoryName (value) {
    console.log("action")
   return {
        type: "SET_CATEGORYNAME",
        value:value
    }
}
export function setCategoryId (value) {
    return {
         type: "SET_CATEGORYID",
         value:value
     }
 }
