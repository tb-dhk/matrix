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
  
  let navigate = useNavigate()

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
            .slice(0, 3)
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
        <div className="title">welcome to the <span className="highlight">{wordFromSecond(timePassed, 6000)}</span>.</div> 
        <div>
          <div className="label">pinned</div>
          <div className="cards" id="pinned">
            {Object.entries(content.pinned).map(([i, obj]) => (
              <div className="card" onClick={() => {navigate("/blog"+i.replace(/\.md$/, ''))}}>
                <div className="card-title">{obj.title}</div>
                <div>{obj.date}</div>
                <div className="tags">{obj.tags.map(tag => <Tag name={tag} />)}</div>
                <div>{obj.description}</div>
                <div className="grey">{pathInSeries(i, config.series) ? `${config.series[parent(i)].name} #${obj.number}` : null}</div>
              </div>
            ))}
          </div>  
        </div>
        <div>
          <div className="label">latest</div>
          <div className="cards" id="latest">
            {Object.entries(content.recent).map(([i, obj]) => (
              <div className="card" onClick={() => {navigate("/blog"+i.replace(/\.md$/, ''))}}>
                <div className="card-title">{obj.title}</div>
                <div>{obj.date}</div>
                <div className="tags">{obj.tags.map(tag => <Tag name={tag} />)}</div>
                <div>{obj.description}</div>
                <div className="grey">{pathInSeries(i, config.series) ? `${config.series[parent(i)].name} #${obj.number}` : null}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div className="label">tags</div>
          <div className="cards" id="tags">
            {content.tags.map(tag => <Tag name={tag} />)}
          </div>
        </div>
        <div>
          <div className="label">series</div>
          <div className="cards" id="series">
            {Object.entries(content.series).map(([i, obj]) => (
              <div className="card" onClick={() => {navigate("/dir"+i.replace(/\.md$/, ''))}}>
                <div className="card-title">{obj.name}</div>
                <div>{obj.description}</div>
                <div>
                  last updated: {
                    seriesLastUpdated(
                      Object.entries(build)
                        .filter(([id, obj]) => parent(id) === i)
                        .map(i => i[1])
                    ) || "never"
                  }
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
