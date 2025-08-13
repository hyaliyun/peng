const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'DELETE,PUT,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

export async function onRequest(context) {
  const { request, env, params } = context;
  const kv = env.FORM_RECORDS;
  const { id } = params;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  if (!id) {
    return new Response(JSON.stringify({ error: '缺少ID' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' }
    });
  }

  const key = `record:${id}`;

  try {
    if (request.method === 'DELETE') {
      const exists = await kv.get(key);
      if (!exists) {
        return new Response(JSON.stringify({ error: '记录不存在' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      await kv.delete(key);
      return new Response(JSON.stringify({ success: true }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    if (request.method === 'PUT') {
      const exists = await kv.get(key);
      if (!exists) {
        return new Response(JSON.stringify({ error: '记录不存在' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const data = await request.json();
      const oldRecord = JSON.parse(exists);
      const updatedRecord = { 
        ...oldRecord, 
        ...data,
        id: oldRecord.id,
        createdAt: oldRecord.createdAt
      };

      await kv.put(key, JSON.stringify(updatedRecord));
      return new Response(JSON.stringify(updatedRecord), {
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
