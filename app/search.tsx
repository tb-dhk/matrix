import { useNavigate, useParams } from "react-router";
import { useState, useEffect } from "react";
import { getBuildJSON } from "./tools"
import { Navbar, Tag, MetaTags } from "./components"

export default function SearchPage({ params }) {
  const navigate = useNavigate();
  const query = params["*"]?.toLowerCase() || "";

  const [build, setBuild] = useState(null);

  useEffect(() => {
    getBuildJSON()
      .then(data => setBuild(data))
      .catch(console.error);
  }, []);

  // helper to match if query is in any relevant field
  const matchesQuery = (post) => {
    const q = query.toLowerCase();
    return (
      post.title.toLowerCase().includes(q) ||
      post.description.toLowerCase().includes(q) ||
      post.tags.some(tag => tag.toLowerCase().includes(q))
    );
  };

  return (
    <div className="head">
      <MetaTags title={query} description={`search results for "${query}"`} />
      <Navbar />
      <div className="body">
        <div className="browse">
          <div className="list-header">
            <div className="title">search results for "{query}"</div>
          </div>
          <div className="blog-list">
            {build && Object.entries(build)
              .filter(([id, post]) => matchesQuery(post))
              .sort(([,a], [,b]) => new Date(b.date) - new Date(a.date))
              .map(([k, v]) => (
                <div
                  key={k}
                  className="card"
                  onClick={() => navigate("/blog" + k.replace(/\.md$/, ""))}
                >
                  <div className="card-title">{v.title}</div>
                  <div>{v.date}</div>
                  <div className="tags">
                    {v.tags.map(tag => <Tag key={tag} name={tag} />)}
                  </div>
                  <div>{v.description}</div>
                </div>
              ))}
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
}
