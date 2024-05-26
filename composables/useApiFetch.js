import  { useRuntimeConfig } from "nuxt/app";

async function useApiFetch(path, options={}) {
const auth = useAuthStore();
const config = useRuntimeConfig();
  let headers = {
    referer: config.public.APP_URL,
  }
$fetch(config.public.baseURL+'sanctum/csrf-cookie',{
    method: 'GET',
    headers:{
      accept: 'application/json',
      'Content-Type': 'application/json',
      referer: config.public.APP_URL,
    }
  })
  const token = auth.token
    if(token){
        headers['Authorization'] = `Bearer ${token}`
    }
    console.log(headers,'headers',auth)
    if(process.server){
        headers={
            ...headers,
        }
    }
    return useFetch(config.public.API_URL+path,{
      watch:false,
      ...options,
      headers:{
        ...headers,
        ...options?.headers
      }
    })
}
export default useApiFetch;
