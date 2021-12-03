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
                    <h1>Про мене</h1>
                    <p>Я - Тебенько Ярема, учень 10-В класу ЛФМЛ. Організовував не одну подію чи табір, працюючи з різноманітними людьми. Хочу стати головою учнівського самоврядування аби створити у ліцеї прекрасну атмосферу, у якій приємно навчатись і перебувати.</p>
                    <Link className="more" to="/about">Більше про мене &gt;&gt;&gt;</Link>
                </div>
                <div className="splitter curve1"></div>
                <ScrollDownArrow goto={gotoPage} page={1}/>
            </section>
            <section className="page page2" ref={pages[1]}>
                <div className="image"><div/></div>
                <div className="content">
                    <h1>Мої пріоритети</h1>
                    <p>Ми з командою бачимо проблему онлайн-іміджу ліцею та учнів як частини цієї персони. Бажаємо покращити її шляхом переробки сайта ліцею та його соціальних сторінок, полегшення зв'язку між учнями. Наші вміння, наприклад, демонструє сторінка, на яку ви дивитеся ;)</p>
                    <Link className="more" to="/online">Детальніше &gt;&gt;&gt;</Link>
                </div>
                <div className="splitter curve2"></div>
                <ScrollDownArrow goto={gotoPage} page={2}/>
            </section>
            <section className="page page3" ref={pages[2]}>
                <div className="content">
                    <h1>Нам важлива ваша думка</h1>
                    <p>Мені було б дуже приємно почути від вас фідбек. Зв'язатися можна на діскорд-сервері моєї команди (посилання поруч), або пишіть мені на цей номер: +38 068 636 0930</p>
                </div>
                <div className="image"><div class="invite"><div class="invite_name"><img alt="" src="assets/logo64.png" /><div><h1>Кампанія Яреми</h1><span>Сервер моєї команди</span></div></div><a href="https://discord.gg/TPqx3Z4pez" class="join">Приєднатися</a></div></div>
                <div className="splitter curve3"></div>
                <ScrollDownArrow goto={gotoPage} page={3}/>
            </section>
            <section className="page page4" ref={pages[3]}>
                <div className="image"><div/></div>
                <div className="content">
                    <h1>Моя програма</h1>
                    <p>Ми запланували ще багато чого, наприклад події: кіновечори, тематичні дні, дебати, колаби з науковими та волонтерськими організаціями, створимо гуртки та тому подібне</p>
                    <Link className="more" to="/plans">Конкретніше &gt;&gt;&gt;</Link>
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
                <Route exact path="/online" element={<Article url="/articles/online.md" />} />
                <Route exact path="/plans" element={<Article url="/articles/plans.md" />} />
            </Routes>
        </Router>
        );
}
export default App;
