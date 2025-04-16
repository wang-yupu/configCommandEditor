export const myfetch = async (method: string, url: string, body: null | Object = null) => {
    try {
        const options = {
            method: method.toUpperCase(),
            headers: {
                'Content-Type': 'application/json',
            },
            body: body ? JSON.stringify(body) : null,
        };

        const response = await fetch(url, options);

        if (!response.ok) {
            console.error(`HTTP error! status: ${response.status}`);
            return [{}, response.status];
        }

        const data = await response.json();
        return [data, response.status];
    } catch (error) {
        console.error('Fetch error:', error);
        throw error;
    }
};

export const baseURL = 'https://e1.yupu.dev/';
