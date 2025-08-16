import { useNavigate } from 'react-router'
import { useState, useEffect } from "react";
import { getBuildJSON } from "./tools"
import { Navbar, Tag, Tags, MetaTags } from "./components"

export default function MyRouteComponent({ params }) {
  const [build, setBuild] = useState(null);

  useEffect(() => {
    getBuildJSON()
      .then(buildData => setBuild(buildData))
      .catch(err => console.error(err));
  }, [params]);

  return (
    <div className="head">
      <MetaTags title={`tag "${params["*"]}"`} description={`posts with tag "${params["*"]}"`} />
      <Navbar />
      <div className="body">
        <Tags />
        <div className="browse">
          <div className="list-header">
            <div className="title">{params["*"]}</div>
          </div>
          <div className="blog-list">
            {build && Object.entries(build)
              .filter(([, post]) => post.tags.includes(params["*"]))
              .sort((a, b) => b.date - a.date)
              .map(([k, v]) => {
                return (
                  <a href={"/blog"+k.replace(/\.md$/, '')}>
                    <div className="card" key={k}>
                      <div className="card-title">{v.title}</div>
                      <div>{v.date}</div>
                      <div className="tags">{v.tags.map(tag => <Tag name={tag} key={tag} />)}</div>
                      <div>{v.description}</div>
                    </div>
                  </a>
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
