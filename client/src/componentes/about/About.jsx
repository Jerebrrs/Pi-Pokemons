import React from 'react'
import linkedlin from "../../Imagenes/linkedlin.png"
import git from "../../Imagenes/github.png"
import { Link } from "react-router-dom";
import stylos from './About.module.css'

function About() {
  return (
    <div>
      <div className={stylos.body}>
        <div className={stylos.conteiner}>
          <Link to="/home">
            <button className={stylos.button}>
              HOME
            </button>

          </Link>

        </div>

        <div className={stylos.datos}>
          <div className={stylos.name}>
            <p>Kevin Jeremias Barrios</p>
          </div>
          <div className={stylos.subtitle}>
            <p>Full Stack Developer en processo</p>
            <p> | HTML | CSS | Javascript | React | Redux | Node | Express | SQL</p>
            <a href="https://www.linkedin.com/in/kevinjbarrios/" target="_blank" >
              <img className={stylos.ksli} src={linkedlin} alt="linkedin" />
            </a>
            <a href='https://github.com/Jerebrrs' target="_blank" >
              <img className={stylos.ksgh} src={git} alt="git" />
            </a>
          </div>
          {/* <div className={stylos.ks}>
            <a href="https://www.linkedin.com/in/kevinjbarrios/" target="_blank" >
              <img className={stylos.ksli} src={linkedlin} alt="linkedin" />
            </a>
            <a href='https://github.com/Jerebrrs' target="_blank" >
              <img className={stylos.ksgh} src={git} alt="git" />
            </a>
          </div> */}
        </div>
      </div>
    </div >
  )
}

export default About;