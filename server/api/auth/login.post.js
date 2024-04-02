export default defineEventHandler(async (event) => {
  
  const config = useRuntimeConfig(event)
  const body = await readBody(event)
  const params = await getQuery(event)
  // try {
  //   const {data} = await $fetch('http://127.0.0.1:8000/api/v1/admin/login',{
  //     method: 'POST',
  //     body: body
  //   }) 
  //   console.log(data)
  //  return data
  // } catch (error) {
  // return error  
  // }

})