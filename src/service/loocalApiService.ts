import axios from 'axios';
import AxiosInstance = Axios.AxiosInstance;

interface LoginResponse {
    token: string;
}

let api: AxiosInstance | null = null;

const getLoocalApiInstance = async () => {
    if (api) return api;

    try {
        let login_url;
        if(process.env.ENV === 'dev'){
            login_url = `${process.env.LOOCAL_API_URL}/responsibles/login`
        }
        else{
            login_url = `${process.env.LOOCAL_API_URL}/login`
        }
        const loginResponse = await axios.post<LoginResponse>(
            login_url,
            {
                email: process.env.LOOCAL_LOGIN_EMAIL,
                password: process.env.LOOCAL_LOGIN_PASSWORD,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const token = loginResponse.data.token;

        api = axios.create({
            baseURL: process.env.LOOCAL_API_URL,
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        return api;
    } catch (error) {
        console.error('[LOOCAL] Erro ao autenticar na API Loocal:', error);
        throw new Error('Erro ao autenticar na API Loocal');
    }
};

export default getLoocalApiInstance;
