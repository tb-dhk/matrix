import { textToColor, getBuildJSON, getConfigJSON, getDirectoryContents, parent } from "./tools"
import { useState, useEffect } from "react"
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

export function Tree (props) {
  const navigate = useNavigate()

  let list = Object.values(props.directory)
  if (props.path !== "/") {
    list = [{name: "..", type: "dir"}, ...list]
  }

  return (
    <div className="left tree">
      <div className="highlight">{props.path || "/"}</div>
      {props.directory && list.map((i, idx) => {
        const branch = list.length - 1 === idx ? "└──" : "├──"
        let url = "/" + (i.type === "dir" ? "dir" : "blog") + (props.path === "/" ? "" : props.path) + "/" + i.name.replace(".md", "")
        if (i.name === "..") {
          url = "/dir" + parent(props.path)
        }
        return (
          <div onClick={() => navigate(url)}>
            {branch + " "} 
            <span className={`${i.type === "dir" ? "highlight" : ""} ${i.name.replace(".md", "") === props.current ? "highlight2" : ""}`}>
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
        // not a file — check if directory
        const directoryData = await getDirectoryContents("vault" + query);
        if (!Object.keys(directoryData).includes("message")) {
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
