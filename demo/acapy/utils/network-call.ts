export const apiFetch = async (url: string, method: string, body?: object, token?: string) => {
  try {

    const options: RequestInit = {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
      },
    }

    if(body && method !== 'GET' && method !== 'HEAD'){
      options.body = JSON.stringify(body);
    }

    
    const response = await fetch(url, options);
    // console.log(response)
    return response.json();
  } catch (error) {
    console.log(error);
  }
}