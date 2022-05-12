function getMain(){
    const view = 
        `<section id="view-container">
            <article id="view"></article>
        </section>`;
    return view;
}
function getMenu(){
    const view = 
        `<section id="menu">
            <article class="menu">
                <img class="logo" src="images/logoMangaParty.png"/>
                <button class="btn play" onclick="goTo('setGame')">JUGAR</button><br>
                <button class="btn " onclick="goTo('help')">CÓMO JUGAR</button><br>
                <button class="btn" onclick="goTo('close')">CERRAR</button><br>
            </article>
        </section>`;
    return view;
}
function getHelp(){
    const view = 
        `<section id="help">
            <aside class="left">
                <button class="btn arrow" disabled onclick="move('back')"></button>
            </aside>
            <article class="help-container">
                <div class="zoom_in"><img src="images/help/Help_1.png"/></div>
            </article>
            <aside class="right">
                <button class="btn arrow" onclick="move('next')"></button>
            </aside>
        </section>
        <footer>
            <button class="btn last" onclick="goTo('menu')">VOLVER</button>
        </footer>`;
    return view;
}
function getSetGame(){
    const view = 
        `<section id="setGame">
            <article class="menu">
                <aside class="left">
                    <div class="time">
                        Tiempo<br>
                        <div class="value">
                            <input type="number" id="hour" max="6" min="0" value=""> : 
                            <input type="number" id="min" max="59" min="0" value="">
                        </div>
                    </div>
                    <div class="tabletop">
                        Casillas<br>
                        <div class="box pregunta">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Pregunta</span>
                        </div>
                        <div class="box musica">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Musica</span>
                        </div>
                        <div class="box mimica">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Mimica</span>
                        </div>
                        <div class="box silueta">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Silueta</span>
                        </div>
                        <div class="box cultjapo">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Cultura Japonesa</span>
                        </div>
                        <div class="box tabu">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Tabu</span>
                        </div>
                        <div class="box vf">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Verdadero o Falso</span>
                        </div>
                        <div class="box random">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Random</span>
                        </div>
                        <div class="box reaper">
                            <input type="number" max="68" min="0" value="">
                            <span class="tooltiptext">Reaper</span>
                        </div>
                        <div class="value total">
                            Total: 
                            <input type="number" max="68" min="68" readonly value="">
                        </div>
                        <div class="hiddenBox">
                            Ocultar 
                            <label class="switch">
                                <input type="checkbox" checked>
                                <span class="slider round"></span>
                            </label>
                        </div>
                    </div>
                </aside>
                <aside class="right">
                    <div class="numteams">
                        Equipos<br>
                        <div class="value"><input type="number" max="6" min="2" value=""></div>
                    </div>
                    <div class="teams">
                        <div class="team red"><input type="text" maxlength="20" value=""></div>
                        <div class="team blue"><input type="text" maxlength="20" value=""></div>
                        <div class="team green"><input type="text" maxlength="20" value=""></div>
                        <div class="team yellow"><input type="text" maxlength="20" value=""></div>
                        <div class="team cian"><input type="text" maxlength="20" value=""></div>
                        <div class="team pink"><input type="text" maxlength="20" value=""></div>
                    </div>
                </aside>
                <article>
                    <button class="btn last" onclick="goTo('menu')">VOLVER</button>
                    <button class="btn play" onclick="goTo('play')">COMENZAR</button>
                </article>
            </article>
        </section>`;
    return view;
}
function getGame(){
    const view = 
        `<section id="game">
            <header>
                <div id="globalTime">-- : -- : --</div>
                <div id="team">
                    <img class="avatar" src="" />
                    <span id="teamName"></span>
                    <img class="avatar left" src="" />
                </div>
                <div id="crono">
                    <span class="sec">00</span>
                    <div class="miliSec">00</div>
                </div>
            </header>
            <section class="tabletop">
                <aside class="points zoom_out">
                    <div id="avatarStart">
                        <div id="_1" class="avatar stop"></div>
                        <div id="_2" class="avatar stop"></div>
                        <div id="_3" class="avatar stop"></div>
                        <div id="_4" class="avatar stop"></div>
                        <div id="_5" class="avatar stop"></div>
                        <div id="_6" class="avatar stop"></div>
                    </div>
                    <div id="red" class="team"><div class="value">0</div></div>
                    <div id="blue" class="team"><div class="value">0</div></div>
                    <div id="green" class="team"><div class="value">0</div></div>
                    <div id="yellow" class="team"><div class="value">0</div></div>
                    <div id="cian" class="team"><div class="value">0</div></div>
                    <div id="pink" class="team"><div class="value">0</div></div>
                </aside>
                <article id="box-content">
                    <div id="dice" class="zoom_out"></div>
                    <div id="card" class="hidden"></div>
                    <div id="hideCard" class="hidden"></div>
                </article>
                <aside class="blank"></aside>
            </section>
            <footer>
                <button class="btn" onclick="goTo('menu')">VOLVER</button>
            </footer>
        </section>`;
    return view;
}
function getScore(){
    const view = 
        `<section id="scoreTable">
            <section class="menu">
                <article class="score">
                </article>
                <article>
                    <button class="btn" onclick="goTo('menu')">VOLVER</button>
                </article>
            </section>
        </section>`;
    return view;
}