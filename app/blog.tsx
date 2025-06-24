import ReactMarkdown from 'react-markdown'
import remarkFrontmatter from 'remark-frontmatter'
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import { getFileContents, getConfigJSON, parent, getFrontMatter } from "./tools"
import { Navbar, Tag, Tree, Series, MetaTags } from "./components"

function ColoredMarkdown(props) {
  return (
    <ReactMarkdown
      components={{
        strong: ({node, ...props}) => (
          <strong style={{ color: '#8ccdf2' }} {...props} />
        ),
        em: ({node, ...props}) => (
          <em style={{ color: '#b28cf2' }} {...props} />
        ),
      }}
      remarkPlugins={[remarkFrontmatter]}
    >
      {props.children}
    </ReactMarkdown>
  );
}

export default function MyRouteComponent({ params }) {
  const [content, setContent] = useState("")
  const [frontMatter, setFrontMatter] = useState({})
  const [configData, setConfigData] = useState(null)

  const navigate = useNavigate()

  useEffect(() => {
    getFileContents("vault/" + params["*"])
      .then(newContent => {
        setContent(newContent);
        setFrontMatter(getFrontMatter(newContent));
      })
      .catch((err) => {
        console.error(err);

        // example of checking error message or status
        if (
          err.message.includes('Failed to fetch') || // fetch failed, possibly 404
          err.message.includes('404') // or explicit 404
        ) {
          if (location.pathname !== '/blog/404') {
            navigate('/blog/404');
          }
        } else {
          // other errors: show message, or set some error state
          console.error(err.message || 'Unexpected error');
        }
      });

    getConfigJSON()
      .then(data => setConfigData(data))
  }, [params])

  const path = "/" + params["*"]
  const name = params["*"].split("/").pop();

  return (
    <div className="head">
      <MetaTags title="matrix" description={path} />
      <Navbar />
      <div className="body">
        <Tree path={parent(path)} current={name} />
        <div className="post">
          <div className="post-header">
            <div className="title">{frontMatter.title}</div>
            <div className="description">{frontMatter.description}</div>
            <div className="metadata">
              {(configData && (parent(path) in configData.series)) && (
                <React.Fragment>
                  <div>
                    <span 
                      className="underline"
                      onClick={() => navigate("/dir" + parent(path))}
                    >{configData?.series?.[parent(path)].name}</span> #{frontMatter.number}
                  </div>
                  · 
                </React.Fragment>
              )}
              <div>{frontMatter.date}</div> 
              · 
              <div className="tags">{frontMatter?.tags?.map(tag => <Tag name={tag} />)}</div>
              ·
              <div>{params["*"]}</div> 
            </div>
          </div>
          <div className="content">
            <ColoredMarkdown remarkPlugins={[remarkFrontmatter]}>
              {content} 
            </ColoredMarkdown>
          </div>
        </div>
        <Series path={parent(path)} current={name} />
      </div>
    </div>
  );
}
