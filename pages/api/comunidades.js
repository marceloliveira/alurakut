import { SiteClient } from 'datocms-client';

export default async function api(request, response) {
    if (request.method === 'POST') {
        const TOKEN = '13eac9fda6eb405c47f954f214394b';
        const client = new SiteClient(TOKEN);
        const comunidade = await client.items.create(
            {
                itemType: '975990',
                ...request.body
            }
        );
        return response.json(comunidade);
    }
    return response.status(501).json();
}