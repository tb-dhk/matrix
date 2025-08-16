import { useState, useEffect } from "react"
import { useNavigate } from "react-router";
import { 
  getBuildJSON, getConfigJSON, 
  pathInSeries, parent,
  seriesLastUpdated, wordFromSecond
} from "./tools"
import { Tag, Navbar, MetaTags } from "./components"

export default function MyRouteComponent() {  
  const [content, setContent] = useState({
    pinned: {},
    recent: {},
    tags: [],
    series: [],
  })
  const [build, setBuild] = useState({})
  const [config, setConfig] = useState({
    series: {},
    pinned: []
  })
  
  const [startTime, setStartTime] = useState(null);
  const [timePassed, setTimePassed] = useState(0);

  useEffect(() => {
    if (!startTime) {
      setStartTime(Date.now());
    }

    const intervalId = setInterval(() => {
      setTimePassed(Date.now() - startTime);
    }, 16) // roughly 60fps update

    return () => clearInterval(intervalId);
  }, [startTime]);

  useEffect(() => {
    Promise.all([getBuildJSON(), getConfigJSON()])
      .then(([buildData, configData]) => {
        setBuild(buildData)
        setConfig(configData)

        const pinned = Object.fromEntries(
          configData.pinned
            .map(path => [path, buildData[path]])
            .filter(i => i[1])
        )

        // handle buildData
        const recent = Object.fromEntries(
          Object.entries(buildData)
            .sort((a, b) => new Date(b[1].date) - new Date(a[1].date))
            .slice(0, 10)
        )

        let tags = new Set();
        Object.values(buildData).forEach(post => {
          post.tags.forEach(tag => {
            tags.add(tag);
          });
        });
        tags = Array.from(tags).sort();

        // handle configData
        const series = configData.series

        // finally update state once
        setContent(prev => ({
          ...prev,
          pinned,
          recent,
          tags,
          series
        }));
      });
  }, [])

  return (
    <div className="head">
      <MetaTags title="matrix" description="welcome to the matrix." />
      <Navbar />
      <div className="home">
        <div className="title">welcome to the {" "}
          <span className="last-word"><span className="highlight">{wordFromSecond(timePassed, 6000)}</span>.</span>
        </div> 
        <div>
          <div className="label">pinned</div>
          <div className="cards" id="pinned">
            {Object.entries(content.pinned).map(([i, obj]) => (
              <a href={"/blog"+i.replace(/\.md$/, '')}>
                <div className="card" key={i}>
                  <div className="card-title">{obj.title}</div>
                  <div className="small">{obj.date}</div>
                  <div className="tags">{obj.tags.map(tag => <Tag name={tag} key={tag} />)}</div>
                  <div>{obj.description}</div>
                  {pathInSeries(i, config.series) && <a href={"dir" + parent(i)}>
                    <div 
                      className="grey small"
                    >
                      <span className="underline">{config.series[parent(i)].name}</span> #{obj.number}
                    </div>
                  </a>}
                </div>
              </a>
            ))}
          </div>  
        </div>
        <div>
          <div className="label">latest</div>
          <div className="cards" id="latest">
            {Object.entries(content.recent).map(([i, obj]) => (
              <a href={"/blog"+i.replace(/\.md$/, '')}>
                <div className="card" key={i}>
                  <div className="card-title">{obj.title}</div>
                  <div className="small">{obj.date}</div>
                  <div className="tags">{obj.tags.map(tag => <Tag name={tag} key={tag} />)}</div>
                  <div>{obj.description}</div>
                  {pathInSeries(i, config.series) && <a href={"/dir" + parent(i)}>
                    <div 
                      className="grey small"
                    >
                      <span className="underline">{config.series[parent(i)].name}</span> #{obj.number}
                    </div>
                  </a>}
              </div>
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="label">tags</div>
          <div className="cards" id="tags">
            {content.tags.map(tag => <Tag name={tag} key={tag} />)}
          </div>
        </div>
        <div>
          <div className="label">series</div>
          <div className="cards" id="series">
            {Object.entries(content.series).map(([i, obj]) => (
              <a href={"/dir"+i.replace(/\.md$/, '')}>
                <div className="card" key={i}>
                  <div className="card-title">{obj.name}</div>
                  <div>{obj.description}</div>
                  <div className="small">
                    last updated: {
                      seriesLastUpdated(
                        Object.entries(build)
                          .filter(([id]) => parent(id) === i)
                          .map(i => i[1])
                      ) || "never"
                    }
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
