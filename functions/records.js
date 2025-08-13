// functions/records.js
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export async function onRequest(context) {
  const { request, env } = context;
  const kv = env.FORM_RECORDS;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    if (request.method === 'GET') {
      // 获取所有记录
      const list = await kv.list({ prefix: 'record:' });
      const recordsRaw = await Promise.all(
        list.keys.map(k => kv.get(k.name).then(v => v ? JSON.parse(v) : null))
      );
      const records = recordsRaw
        .filter(Boolean)
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

      return new Response(JSON.stringify(records), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'POST') {
      const data = await request.json();

      // 验证必填
      if (!data.name || !data.contact || !data.idNumber || !data.location) {
        return new Response(JSON.stringify({ error: '缺少必要字段' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      // 手机号格式
      if (!/^1[3-9]\d{9}$/.test(data.contact)) {
        return new Response(JSON.stringify({ error: '手机号格式不正确' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const id = crypto.randomUUID();
      const record = {
        ...data,
        id,
        createdAt: new Date().toISOString(),
      };

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
