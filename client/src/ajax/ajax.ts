export class AJAX {
    public static async ajax(method: string, url: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open(method, url);
            
            xhr.onreadystatechange = () => {
                if(xhr.readyState == 4) {
                    if(xhr.responseType === "json") {
                        resolve(JSON.stringify(xhr.response));
                    } else {
                        resolve(xhr.response);
                    }
                }
            }
            xhr.onerror = xhr.onabort = () => {
                reject();
            }
            xhr.setRequestHeader('Content-Type', 'application/json')
            xhr.send(JSON.stringify(data));
        });
    }
}