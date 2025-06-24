import { useNavigate, useParams } from 'react-router';
import { useState, useEffect } from "react";
import { getDirectoryContents, getBuildJSON, getConfigJSON, seriesLastUpdated, parent } from "./tools";
import { Navbar, Tag, Tree, Series, MetaTags } from "./components";

export default function MyRouteComponent() {
  const navigate = useNavigate();
  const params = useParams();
  const path = "/" + (params["*"] || "");

  const [directory, setDirectory] = useState(null);
  const [build, setBuild] = useState(null);
  const [config, setConfig] = useState(null);

  // fetch everything when path changes
  useEffect(() => {

    Promise.all([
      getDirectoryContents(path),
      getBuildJSON(),
      getConfigJSON(),
    ])
      .then(([dirData, buildData, configData]) => {
        setDirectory(dirData);
        setBuild(buildData);
        setConfig(configData);
      })
      .catch(err => console.error(err))
  }, [path]);

  // calculate derived values:
  const isSeries = config?.series?.hasOwnProperty(path);
  const files = directory
    ? Object.entries(directory)
        .filter(([_, v]) => v.type === "file")
        .sort((a, b) => (a[1].number ?? 0) - (b[1].number ?? 0))
    : [];
  
  return (
    <div className="head">
      <Navbar />
      <MetaTags title={path} description="explore directory" />
      <div className="body">
        {directory && <Tree path={path} />}
        <div className="browse">
          <div className="list-header">
            {isSeries ? (
              <>
                <div className="title">{config.series[path]?.name}</div>
                <div className="description">{config.series[path]?.description}</div>
                <div>last updated: {
                  seriesLastUpdated(
                    Object.entries(files)
                      .filter(([id, obj]) => parent(id) === path)
                      .map(i => i[1])
                  ) || "never"
                }</div>
              </>
            ) : (
              <div className="title">{path}</div>
            )}
          </div>
          <div className="blog-list">
            {files.length > 0 ? (
              files.map(([k, v]) => {
                const filePath = `${path}/${v.name}`.replace(/\.md$/, "").replace("//", "/");
                const obj = build[filePath];
                if (!obj) return null; // safety net

                return (
                  <div
                    key={filePath}
                    className="list-entry"
                    onClick={() => navigate("/blog" + filePath)}
                    style={{ gridTemplateColumns: isSeries ? "1fr 9fr" : "1fr" }}
                  >
                    {isSeries && <div className="number">#{obj.number}</div>}
                    <div className="card">
                      <div className="card-title">{obj.title}</div>
                      <div>{obj.date}</div>
                      <div className="tags">{obj.tags.map(tag => <Tag name={tag} key={tag} />)}</div>
                      <div>{obj.description}</div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>this folder has no files.</div>
            )}
          </div>
        </div>
        {isSeries && <Series path={path} />}
      </div>
    </div>
  );
}
