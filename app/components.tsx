import { textToColor, getBuildJSON, getConfigJSON, getDirectoryContents, parent, normalizePath } from "./tools"
import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router"

export function Tag (props) {
  return <a href={"/tags/"+props.name}>
    <div 
      className="tag" 
      style={{
        color: textToColor(props.name),
        backgroundColor: textToColor(props.name, 85),
        border: `2px solid ${textToColor(props.name)}`
      }}
    >{props.name}</div>
  </a>
}

export function Tree(props) {
  const [contents, setContents] = useState([])

  let path = normalizePath(props.path) 

  useEffect(() => {
    getDirectoryContents(path)
      .then(data => {
        setContents(data.sort((a, b) => a.name.localeCompare(b.name)))
        if (path !== "") {
          setContents(prev => [{name: "..", type: "folder"}, ...prev])
        }
      })
  }, [path])

  return (
    <div className="left tree">
      <a href={"/dir/" + path}>
        <div 
          className="highlight"
        >/{path}</div>
      </a>
      {contents && contents.map((i, idx) => {
        const branch = contents.length - 1 === idx ? "└──" : "├──"
	let url
        if (i.name === "..") {
          url = "/dir/" + parent(path)
        } else {
          url = "/" + (i.type === "folder" ? "dir/" : "blog/") + normalizePath(`${path}/${i.name}`) 
        }
        return (
          <a href={url}>
            <div key={i.name}>
              {branch + " "} 
              <span 
                className={`${i.type === "folder" ? "highlight" : ""} ${i.name.replace(".md", "") === props.current ? "highlight2" : ""}`}
              >
                {i.name}
              </span>
            </div>
          </a>
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
        {tags.map(i => <Tag name={i} key={i} />)}
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
    .filter(([filepath]) => parent(filepath) === props.path)
    .sort((a, b) => a[1].number - b[1].number);

  const name = config.series[props.path].name

  return (
    <div className="series right">
      <a href={"/dir/" + props.path}>
        <div 
          className="highlight"
        >{name}</div>
      </a>
      {files.map(([filepath, fileattrs]) => (
        <a
          href={"/blog/" + filepath} 
          style={{ display: "grid", gridTemplateColumns: "1fr 5fr" }}
        >
          <div>#{fileattrs.number}</div>
          <div className={filepath.split("/").pop() === props.current ? "highlight2" : ""}>{fileattrs.title}</div>
        </a>
      ))}
    </div>
  );
}

export function Navbar() {
  return (
    <div className="header">
      <a href="/">
        <div 
          className="logo highlight glow"
        >matrix</div>
      </a>
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
        let dirPath = normalizePath(query) + "/";
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
      <meta property="og:image" content="/ani.gif" />
      <meta property="og:image:type" content="image/gif" />
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

export function Card(props) {
  const path = props.path
  const data = props.data
  return (
    <a href={"/blog/" + path.replace(/\.md$/, '')}>
      <div className="card" key={path}>
        <div className="card-title">{data.title}</div>
        <div className="small">{data.date}</div>
        <div className="tags">{data.tags.map(tag => <Tag name={tag} key={tag} />)}</div>
        <div>{data.description}</div>
        {!props.hideSeries && props.config.series[parent(path)] && (
          <a href={"/dir/" + parent(path)}>
            <div 
              className="grey small"
            >
              <span className="underline">{props.config.series[parent(path)].name}</span> #{data.number}
            </div>
          </a>
        )}
      </div>
    </a>
  )
}
