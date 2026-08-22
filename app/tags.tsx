import { useState, useEffect } from "react";
import { getBuildJSON, getConfigJSON } from "./tools"
import { Navbar, Card, Tags, MetaTags } from "./components"

export default function MyRouteComponent({ params }) {
  const [build, setBuild] = useState({});
  const [config, setConfig] = useState({});

  useEffect(() => {
    getBuildJSON()
      .then(buildData => setBuild(buildData))
      .catch(err => console.error(err));
    getConfigJSON()
      .then(configData => setConfig(configData))
      .catch(err => console.error(err));
  }, [params]);

  const results = Object.entries(build)
    .filter(([, post]) => post.tags.includes(params["*"]))
    .sort((a, b) => b.date - a.date)

  return (
    <div className="head">
      <MetaTags title={`tag "${params["*"]}"`} description={`posts with tag "${params["*"]}"`} />
      <Navbar />
      <div className="body">
        <Tags />
        <div className="browse">
          <div className="list-header">
            <div className="title">tag "{params["*"]}"</div>
          </div>
          <div className="blog-list">
            {results.length ? results.map(([k, v]) => (
                <Card path={k} data={v} config={config} />
              ))
            : "there are no results."}
          </div>
        </div>
        <div className="right">
        </div>
      </div>
    </div>
  );
}
