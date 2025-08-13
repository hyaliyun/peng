const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export async function onRequest(context) {
  const { request, env } = context;
  const kv = env.FORM_RECORDS;

  // 处理预检请求
  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (request.method === 'GET') {
      const { searchParams } = new URL(request.url);
      const page = parseInt(searchParams.get('page')) || 1;
      const limit = parseInt(searchParams.get('limit')) || 10;

      const list = await kv.list({ prefix: 'record:' });
      const items = await Promise.all(
        list.keys.map(async (k) => JSON.parse(await kv.get(k.name)))
      );

      // 排序（按创建时间新到旧）
      items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      // 分页
      const start = (page - 1) * limit;
      const paginated = items.slice(start, start + limit);

      return new Response(JSON.stringify({
        data: paginated,
        total: items.length,
        page,
        limit
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST') {
      const data = await request.json();
      const id = crypto.randomUUID();
      const record = { id, ...data, createdAt: new Date().toISOString() };
      await kv.put(`record:${id}`, JSON.stringify(record));

      return new Response(JSON.stringify(record), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ error: 'Method not allowed' }), {
      status: 405,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }
}
