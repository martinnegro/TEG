import { getProviders } from 'next-auth/react';

const GetProviders = async (req, res) => {
    const providers = await getProviders()
    res.json({ providers })
};

export default GetProviders