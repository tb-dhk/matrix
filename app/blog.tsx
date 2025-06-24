import type { Route } from "./+types/route-name";
import ReactMarkdown from 'react-markdown'
import strftime from 'strftime'
import remarkFrontmatter from 'remark-frontmatter'
import matter from 'gray-matter';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"
import { getFileContents, getDirectoryContents, getConfigJSON, parent } from "./tools"
import { Navbar, Tag, Tree, Series } from "./components"

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
    >
      {props.children}
    </ReactMarkdown>
  );
}

export default function MyRouteComponent({ params }) {
  const [content, setContent] = useState("")
  const [frontMatter, setFrontMatter] = useState({})
  const [directory, setDirectory] = useState({})
  const [configData, setConfigData] = useState(null)

  useEffect(() => {
    getFileContents("vault/" + params["*"] + ".md")
      .then(content => {
        setContent(content)
        setFrontMatter(matter(content).data)
      })
      .catch(err => console.error(err));

    getDirectoryContents("vault/" + parent(params["*"]))
      .then(content => setDirectory(content))

    getConfigJSON()
      .then(data => setConfigData(data))
  }, [params])

  const path = "/" + params["*"]
  const name = params["*"].split("/").pop();
  const navigate = useNavigate()

  return (
    <div className="head">
      <Navbar />
      <div className="body">
        <Tree directory={directory} path={parent(path)} current={name} />
        <div className="post">
          <div className="post-header">
            <div className="title">{frontMatter.title}</div>
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
              <div>{strftime("%Y-%m-%d", frontMatter?.date ?? new Date(2008, 1, 15, 0, 0, 0))}</div> 
              · 
              <div className="tags">{frontMatter?.tags?.map(tag => <Tag name={tag} />)}</div>
            </div>
          </div>
          <div className="content">
            <ReactMarkdown remarkPlugins={[remarkFrontmatter]}>
              {content} 
            </ReactMarkdown>
          </div>
        </div>
        <Series path={parent(path)} current={name} />
      </div>
    </div>
  );
}
