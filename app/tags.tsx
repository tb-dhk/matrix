import type { Route } from "./+types/route-name";
import ReactMarkdown from 'react-markdown'
import remarkFrontmatter from 'remark-frontmatter'
import { useNavigate } from 'react-router'
import { useState, useEffect } from "react";
import { getBuildJSON } from "./tools"
import { Navbar, Tag, Tags } from "./components"

export default function MyRouteComponent({ params }) {
  const [content, setContent] = useState(null);
  const [build, setBuild] = useState(null);

  useEffect(() => {
    getBuildJSON()
      .then(buildData => setBuild(buildData))
      .catch(err => console.error(err));
  }, [params]);

  let navigate = useNavigate()

  return (
    <div className="head">
      <Navbar />
      <div className="body">
        <Tags />
        <div className="browse">
          <div className="list-header">
            <div className="title">{params["*"]}</div>
          </div>
          <div className="blog-list">
            {build && Object.entries(build)
              .filter(([id, post]) => post.tags.includes(params["*"]))
              .sort((a, b) => b.date - a.date)
              .map(([k, v]) => {
                return (
                  <div className="card" onClick={() => {navigate("/blog"+k.replace(/\.md$/, ''))}}>
                    <div className="card-title">{v.title}</div>
                    <div>{v.date}</div>
                    <div className="tags">{v.tags.map(tag => <Tag name={tag} />)}</div>
                    <div>{v.description}</div>
                  </div>
                )
              })}
          </div>
        </div>
        <div className="right">
        </div>
      </div>
    </div>
  );
}
