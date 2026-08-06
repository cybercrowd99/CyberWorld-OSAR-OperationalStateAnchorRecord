export default {
  async fetch(
    request: Request,
    env: unknown,
    ctx: ExecutionContext
  ): Promise<Response> {
    const anchorRecord = {
      system: "CyberWorld OSAR",
      name: "OperationalStateAnchorRecord",
      status: "active",
      timestamp: new Date().toISOString()
    };

    return new Response(
      JSON.stringify(anchorRecord),
      {
        status: 200,
        headers: {
          "content-type": "application/json"
        }
      }
    );
  }
};
