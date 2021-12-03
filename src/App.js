import { useState, useEffect, useRef } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Markdown from "marked-react";
import './App.scss';

function ScrollDownArrow(props) {
    return (
        <span class="scrolllink" onClick={() => props.goto(props.page)}>
            <svg class="arrows">
                <path class="a1" d="M0 0 L30 32 L60 0"></path>
                <path class="a2" d="M0 20 L30 52 L60 20"></path>
                <path class="a3" d="M0 40 L30 72 L60 40"></path>
            </svg>
        </span>
    );
}

function Article (props) {
    const [content, setContent] = useState("");
    useEffect(() => {
        const runner = async () => {
            const response = await fetch(props.url, {headers: {"Content-type": "text/markdown"}});
            const content = await response.text();
            setContent(content);
        };
        runner();
    }, [props.url]);

    return (
        <div className="article">
            <Markdown value={content} />
        </div>
    );
}

function MainPage() {
    const pages = [useRef(null), useRef(null), useRef(null), useRef(null)];
    const gotoPage = (page) => {
        window.scrollTo({
            top: pages[page].current.offsetTop,
            behavior: "smooth",
        });
    };
    // This is awful code, don't look at it. It was 4am, ok?

    return (
        <>
            <section className="page page1" ref={pages[0]}>
                <div className="image bg image1"><div/></div>
                <div className="content">
                    <h1>Heading</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ipsa commodi sequi voluptatum. Eligendi, ipsum quidem dolor numquam perferendis dolore libero impedit vitae adipisci, quam quae corrupti cumque soluta, molestiae rerum.</p>
                    <Link className="more" to="/about">Read more &gt;&gt;&gt;</Link>
                </div>
                <div className="splitter curve1"></div>
                <ScrollDownArrow goto={gotoPage} page={1}/>
            </section>
            <section className="page page2" ref={pages[1]}>
                <div className="image"><div/></div>
                <div className="content">
                    <h1>Heading</h1>
                    <p>Illum excepturi nobis eveniet ipsam tenetur doloribus quidem distinctio quod voluptatum, aut, quaerat soluta. Sapiente sed, maiores excepturi eveniet numquam quia illo praesentium fuga exercitationem rerum, vitae ipsa non? At.</p>
                    <Link className="more" to="/point1">Read more &gt;&gt;&gt;</Link>
                </div>
                <div className="splitter curve2"></div>
                <ScrollDownArrow goto={gotoPage} page={2}/>
            </section>
            <section className="page page3" ref={pages[2]}>
                <div className="content">
                    <h1>Heading</h1>
                    <p>Corrupti voluptates corporis deleniti tenetur eaque accusamus minus officia voluptatem tempora adipisci eum earum deserunt iure, soluta accusantium. Laboriosam reiciendis impedit architecto possimus laborum nam ipsum corrupti deleniti nesciunt quia?</p>
                    <Link className="more" to="/point2">Read more &gt;&gt;&gt;</Link>
                </div>
                <div className="image"><div/></div>
                <div className="splitter curve3"></div>
                <ScrollDownArrow goto={gotoPage} page={3}/>
            </section>
            <section className="page page4" ref={pages[3]}>
                <div className="image"><div/></div>
                <div className="content">
                    <h1>Heading</h1>
                    <p>Sequi voluptate necessitatibus officiis, at sapiente ratione, et aperiam quasi perspiciatis impedit voluptatum mollitia. Ad nisi, provident magni earum sit quasi eveniet cumque totam itaque placeat. Obcaecati inventore fugit ipsum.</p>
                    <Link className="more" to="/plans">Read more &gt;&gt;&gt;</Link>
                </div>
                <div className="splitter curve4"></div>
            </section>
        </>
    );
}

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<MainPage />} />
                <Route exact path="/about" element={<Article url="/articles/about.md" />} />
            </Routes>
        </Router>
        );
}
export default App;
