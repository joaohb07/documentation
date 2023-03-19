<style>

.waviy {
  position: relative;
  text-align: center;
}
.waviy span {
  position: relative;
  display: inline-block;
  font-size: 40px;
  color: black;
  text-transform: uppercase;
  animation: flip 5.5s infinite;
  animation-delay: calc(.5s * var(--i))
}
@keyframes flip {
  0%,80% {
    transform: rotateY(360deg);
  }
}
</style>

<div style="text-align: center;">
    <img width="100" height="100" src="docs/docs/img/logo.gif"/>
    <br>
    <div class="waviy">
        <span style="--i:1">M</span>
        <span style="--i:2">y</span>
        <span style="--i:3">P</span>
        <span style="--i:4">o</span>
        <span style="--i:5">r</span>
        <span style="--i:6">t</span>
        <span style="--i:7">f</span>
        <span style="--i:8">o</span>
        <span style="--i:9">l</span>
        <span style="--i:10">i</span>
        <span style="--i:11">o</span>
    </div>
    <br>
    <a href="https://github.com/joaobotelho072002/joaobotelho072002.github.io/actions/workflows/pages-deploy.yml">
        <img src="https://github.com/joaobotelho072002/joaobotelho072002.github.io/actions/workflows/pages-deploy.yml/badge.svg"/>
    </a>
    <a href="https://joaohb07.github.io/documentation">
      <img alt="Actions Workflow" src="https://badgen.net/badge/icon/Live Preview?icon=terminal&label&color=black"/>
    </a>
    <br>
    <br>
    <p> My personal projects documentation repository.</p>
</div>

---

## Usage

Check [***documentation***](https://joaohb07.github.io/documentation) about it.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
