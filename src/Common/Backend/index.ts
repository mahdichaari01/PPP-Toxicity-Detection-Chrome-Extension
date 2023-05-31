
export interface IBackend {
    sendMessage<Req, Res>(message: Req): Promise<Res>;
}

const Backend = {
    sendMessage: async <Req, Res>(message: Req): Promise<Res> => {
        const response = await fetch('http://localhost:3000', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message),
            mode: "no-cors"
        })
        if (response.status !== 200) throw new Error('Error in fetching')
        return await response.json() as Res
    }
}

export function BackendFactory<Req, Res>(url: string) {
    return {
        sendMessage: async <Req, Res>(message: Req): Promise<Res> => {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(message),
                mode: "no-cors"
            })
            if (response.status !== 200) throw new Error('Error in fetching')
            return await response.json() as Res
        }
    }
}

export function FakeBackendFactory<Req, Res>(url: string,callback:(m:Req)=>Res) {
    return {
        sendMessage: async <Req, Res>(message: Req): Promise<Res> => {
            // @ts-ignore
            const response = callback(message);
            return await new Promise((resolve, reject) => {
                setTimeout(() => {
                    // @ts-ignore
                    return resolve(response);
                }, 1000)
            })
        }
    }
}