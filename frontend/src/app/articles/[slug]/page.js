import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

export default async function ArticlePage({ params }) {
  const { slug } = params;

  try {
    const encodedSlug = encodeURIComponent(slug);

    // Log to debug issues
    const apiUrl = `${process.env.NEXT_PUBLIC_API_URL}/api/posts?filters[slug][$eq]=${encodedSlug}&populate=thumbnail&populate=tags`;
    console.log("Constructed API URL:", apiUrl);

    const apiToken = process.env.STRAPI_API_TOKEN;
    if (!apiToken) {
      console.error("API token is not set.");
      throw new Error("API token is not set.");
    }
    console.log("Authorization Header:", `Bearer ${apiToken}`);

    const response = await fetch(apiUrl, {
      headers: {
        Authorization: `Bearer ${apiToken}`,
      },
      next: { revalidate: 60 },
    });

    console.log("Response status:", response.status);
    console.log("Response headers:", response.headers);

    if (!response.ok) {
      throw new Error(`Failed to fetch article: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("API response data:", data);

    const article = data?.data?.[0];

    if (!article) {
      throw new Error("No article found for the given slug.");
    }

    return (
      <div className="max-w-4xl mx-auto px-4 py-16" >
        <div className="text-center">
          {/* Tag */}
          <div className="inline-block px-4 py-2 bg-gray-200 text-gray-800 rounded-full text-sm font-medium mb-4">
          {article.tags[0]?.name || "No Tag"}
          </div>
          {/* Title */}
          <h1 className="text-5xl font-extrabold text-gray-900 mb-4">{article.title}</h1>
          {/* Summary */}
          <p className="text-xl text-gray-600 mb-6">{article.summary}</p>
          {/* Date and Reading Time */}
          <div className="text-gray-500 text-sm mb-12">
            {new Date(article.publishedDate).toLocaleDateString()} • {article.readingTime} min
          </div>
        </div>
        {/* Article Body */}
        <div className="prose prose-lg mx-auto text-left text-gray-800">
        <ReactMarkdown rehypePlugins={[rehypeRaw]}>{article.body}</ReactMarkdown>
        </div>
      </div>
    );    
  } catch (error) {
    console.error("Error fetching article:", error);

    return (
      <div>
        <h1>Error</h1>
        <p>Failed to load the article. Please try again later.</p>
      </div>
    );
  }
}
