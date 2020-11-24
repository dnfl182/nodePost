
export class AJAX {
    public static async ajax(method: string, url: string, data?: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    try {
                        resolve(JSON.parse(xhr.response));
                    } catch (err) {
                        console.error('AJAX: JSON 아닌 데이터 침입')
                        reject();
                    }
                }
            }
            xhr.onerror = xhr.onabort = () => {
                reject();
            }
            xhr.setRequestHeader('Content-Type', 'application/json')
            if(data) {
                xhr.send(JSON.stringify(data));
            } else {
                xhr.send();
            }
        });
    }
    public static Method = {
        GET: 'GET',
        POST: 'POST',
        PATCH: 'PATCH',
        PUT: 'PUT',
        DELETE: 'DELETE'
    }
}