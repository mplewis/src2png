# src2png

Turn your source code into beautiful syntax-highlighted images. Great for presentations.

<img src="/docs/banner.js.png" style="width: 600px;">

# Examples

[React (JSX)](https://facebook.github.io/react/tutorial/tutorial.html)  |  [Ruby on Rails](https://bitbucket.org/railstutorial/sample_app_4th_ed/src/5dd7038b99dd331285cf003cfd3f59ba06376027/app/controllers/password_resets_controller.rb?at=master&fileviewer=file-view-default)  |  [Python](https://github.com/allisson/flask-example/blob/master/accounts/views.py)  |  [C++](https://github.com/arduino/Arduino/blob/master/hardware/arduino/avr/libraries/Wire/src/Wire.cpp)
------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------
![](/docs/react.jsx.png)                                                |  ![](/docs/rails.rb.png)                                                                                                                                                                                   |  ![](/docs/flask.py.png)                                                            |  ![](/docs/arduino.cpp.png)

# Usage

```sh
yarn install
brew install imagemagick  # trims image margins
node src/camera.js YOUR_SOURCE_FILE [YOUR_SOURCE_FILE [...]]
ls ./tmp  # screenshots are saved here
```

# How It Works

* Starts a [Poi](https://github.com/egoist/poi) dev server
  * Poi is a build tool that provides live hot reloading, Webpack, and Babel
  * Poi loads `app.js`, a Vue app
  * Vue mounts `code.jsx`, a component that presents the code in a webpage
  * `code.jsx` uses [Prism](http://prismjs.com/) to syntax highlight the code
* Loads [Puppeteer](https://github.com/GoogleChrome/puppeteer)
  * Puppeteer starts an instance of Headless Chrome
  * Chrome is used to render the highlighted code
* Renders and saves screenshots for each file (see diagram below)

![](/docs/foreach_seq_diag.svg)

# FAQ

**Why did you do this?**

I needed high-quality screenshots of syntax-highlighted code snippets for a presentation.

Chrome is an excellent rendering engine, and there are tons of JS libraries to

**Why did you do this in a headless Chrome browser and dev server? Isn't there something simpler?**

Not for rendering text nicely. The alternatives are:

* laying out and coloring text manually in a visualization language like Processing
* building a PDF, coloring it, and converting it to PNG
* rendering and coloring text manually in ImageMagick, PIL, or other image libraries that aren't designed for text layout or flowing
* manually laying out text lines, coloring them, and rendering – basically, building my own text rendering engine in JS Canvas

**You're really starting a dev server to serve documents to Headless Chrome and using hot reloading as a production feature?**

Yes.

**Oh god, this is horrifying. You have built a monster and it is made of JavaScript.**

Yes it is. Yes I have.

I am sorry. This Lovecraftian amalgamation of software works too well for its own good.

**Do you plan on releasing this on NPM?**

Not as long as it still sucks (starts a dev server via subprocesses, has a bad CLI, etc).

**How do I change the theme/font/style?**

Put themes in `src/themes` and change the CSS import in `code.jsx`.

Write style overrides in `src/style.css`.

**It doesn't add syntax highlighting to my file. How do I make it work?**

Prism probably doesn't recognize your file's extension as the name of a format. Check out `extensionCodes` in `src/code.jsx` and add a mapping from your file extension to a supported Prism format name.

# License

MIT
