const ADMIN_PASSWORD = "hy012210yxj";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'DELETE,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization'
};

async function verifyAdmin(request) {
  const authHeader = request.headers.get('Authorization');
  return authHeader === `Bearer ${ADMIN_PASSWORD}`;
}

export async function onRequest(context) {
  const { request, env, params } = context;
  const kv = env.FORM_RECORDS;
  const { id } = params;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // 验证管理员权限
    if (!(await verifyAdmin(request))) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const key = `record:${id}`;
    const existing = await kv.get(key);

    // DELETE /records/:id - 删除记录
    if (request.method === 'DELETE') {
      if (!existing) {
        return new Response(JSON.stringify({ error: 'Record not found' }), {
          status: 404,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      await kv.delete(key);
      return new Response(JSON.stringify({ success: true }), {
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