const ADMIN_PASSWORD = "hy012210yxj";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET,POST,OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type,Authorization'
};

async function verifyAdmin(request) {
  const authHeader = request.headers.get('Authorization');
  return authHeader === `Bearer ${ADMIN_PASSWORD}`;
}

export async function onRequest(context) {
  const { request, env } = context;
  const kv = env.FORM_RECORDS;

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // GET /records - 获取所有记录
    if (request.method === 'GET') {
      const isAdmin = await verifyAdmin(request);
      const list = await kv.list({ prefix: 'record:' });
      
      const records = await Promise.all(
        list.keys.map(k => kv.get(k.name).then(v => v ? JSON.parse(v) : null)
      );
      
      const validRecords = records.filter(Boolean);
      
      // 按时间倒序排序
      validRecords.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      
      return new Response(JSON.stringify(validRecords), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    // POST /records - 创建新记录
    if (request.method === 'POST') {
      const data = await request.json();
      
      // 验证必填字段
      const requiredFields = ['name', 'contact', 'idNumber', 'location'];
      const missingFields = requiredFields.filter(field => !data[field]);
      if (missingFields.length > 0) {
        return new Response(JSON.stringify({ 
          error: `缺少必填字段: ${missingFields.join(', ')}` 
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        });
      }

      const id = Date.now().toString();
      const record = {
        ...data,
        id,
        createdAt: new Date().toISOString()
      };

      await kv.put(`record:${id}`, JSON.stringify(record));
      return new Response(JSON.stringify(record), {
        status: 201,
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