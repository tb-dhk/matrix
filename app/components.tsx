import { textToColor, getBuildJSON, getConfigJSON, getDirectoryContents, parent } from "./tools"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"

export function Tag (props) {
  let navigate = useNavigate()

  return <div 
    className="tag" 
    style={{
      color: textToColor(props.name),
      backgroundColor: textToColor(props.name, 85),
      border: `2px solid ${textToColor(props.name)}`
    }}
    onClick={() => navigate("/tags/"+props.name)}
  >{props.name}</div>
}

export function Tree(props) {
  const navigate = useNavigate()

  const [contents, setContents] = useState([])

  let path = props.path
  if (!path.startsWith("/")) {
    path = "/" + path
  }
  if (!path.endsWith("/")) {
    path = path + "/"
  }

  useEffect(() => {
    getDirectoryContents(props.path)
      .then(data => {
        setContents(data.sort((a, b) => a.name - b.name))
        if (path !== "/") {
          setContents(prev => [{name: "..", type: "folder"}, ...prev])
        }
      })
  }, [props.path])

  return (
    <div className="left tree">
      <div 
        className="highlight"
        onClick={() => navigate("/dir" + path)}
      >{props.path || "/"}</div>
      {contents && contents.map((i, idx) => {
        const branch = contents.length - 1 === idx ? "└──" : "├──"
        let url = "/" + (i.type === "folder" ? "dir" : "blog") + path + i.name
        if (i.name === "..") {
          url = "/dir" + parent(props.path)
        }
        return (
          <div onClick={() => navigate(url)}>
            {branch + " "} 
            <span 
              className={`${i.type === "folder" ? "highlight" : ""} ${i.name.replace(".md", "") === props.current ? "highlight2" : ""}`}
            >
              {i.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export function Tags () {
  const [tags, setTags] = useState([])

  useEffect(() => {
    getBuildJSON().then(data => {
      const set = new Set()
      Object.values(data).forEach(i => {
        i.tags.forEach(tag => set.add(tag))
      })
      setTags(Array.from(set).sort())
    })
  })

  return (
    <div className="left tags-panel">
      <div className="label">tags:</div>
      <div className="tags-column">
        {tags.map(i => <Tag name={i} />)}
      </div>
    </div>
  )
}

export function Series (props) {
  const [config, setConfig] = useState(null);
  const [build, setBuild] = useState(null);

  useEffect(() => {
    Promise.all([getConfigJSON(), getBuildJSON()])
      .then(([cfg, bld]) => {
        setConfig(cfg);
        setBuild(bld);
      })
      .catch(err => console.error(err));
  }, []);

  if (!config || !build || !(props.path in config.series)) {
    return <div className="right"></div>;
  }

  // filter files directly under this directory
  const files = Object.entries(build)
    .filter(([filepath, fileattrs]) => parent(filepath) === props.path)
    .sort((a, b) => a[1].number - b[1].number);

  return (
    <div className="right">
      {files.map(([filepath, fileattrs]) => (
        <div 
          key={filepath} 
          className="series-row"
          style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}
        >
          <div>#{fileattrs.number}</div>
          <div className={filepath.split("/").pop() === props.current ? "highlight2" : ""}>{fileattrs.title}</div>
        </div>
      ))}
    </div>
  );
}

export function Navbar() {
  const navigate = useNavigate()

  return (
    <div className="header">
      <div 
        className="logo highlight"
        onClick={() => navigate("/")} 
      >matrix</div>
      <SearchBar />
    </div>
  )
}

export function SearchBar() {
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (query.startsWith("/")) {
      const buildData = await getBuildJSON();
      const item = buildData[query];
      
      if (item) {
        navigate("/blog" + query);
      } else {
        let dirPath = query.endsWith("/") ? query : query + "/";
        const hasDirectory = Object.keys(buildData).some(key => key.startsWith(dirPath));

        if (hasDirectory) {
          navigate("/dir" + query);
        } else {
          navigate("/blog/404");
        }
      }
    } else {
      navigate("/search/" + query);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        className="searchbar"
        type="text"
        placeholder="enter a path or search term"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
    </form>
  );
}

export function MetaTags(props) {
  return (
    <React.Fragment>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <title>{props.title}</title>
      <meta name="description" content={props.description} />
      <meta property="og:title" content={props.title} />
      <meta property="og:description" content={props.description} />
      <meta property="og:image" content="/large.png" />
      <meta property="og:image:alt" content="matrix" />
      <meta property="og:image:width" content="1824" />
      <meta property="og:image:height" content="1004" />
      <meta name="twitter:title" content={props.title} />
      <meta name="twitter:description" content={props.description} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content="/large.png" />
      <meta name="twitter:image:alt" content="matrix." />
    </React.Fragment>
  )
}
