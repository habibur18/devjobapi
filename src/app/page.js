export default function Home() {
  return (
    <div className="container mx-auto py-16">
      <h1 className="text-3xl mb-10">API Route Explore</h1>
      <div>
        <h2 className="text-2xl mb-5">GET `/api/alljobs` route</h2>
        <p>Get all jobs</p>
        <code>https://devjobapi.vercel.app/api/alljobs</code>
        <p className="mt-4">With Query parameters:</p>

        <ul className="pl-5">
          <li>q: search query</li>
          <li>fullTime: boolean</li>
          <li>location: location</li>
        </ul>
        <p className="mt-4">Example:</p>
        <code>https://devjobapi.vercel.app/api/alljobs?q=software&fullTime=true&location=Canada</code>
        <br />
        <code>GET /api/alljobs?q=&lt;searchQuery&gt;&fullTime=&lt;true/false&gt;&location=&lt;location&gt;</code>

        <div>
          <h2 className="text-2xl mb-5">GET `/api/alljobs/locations` route</h2>
          <p>Get all Locations</p>
        </div>
      </div>
    </div>
  );
}
