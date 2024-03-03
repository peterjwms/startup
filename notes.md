# CS 260 Notes
## GitHub basics
### Basic Git commands:
```
git status
git add
git commit
git push
git pull
git fetch
git clone
git init
```

### Development Process with Git
1. Pull changes with `git pull`
1. Make changes to code
1. Commit changes with `git commit`
   - add a descriptive message with `git commit -am "message"`
1. Push changes with `git push`

## Console
### Vim
* [Vim cheat sheet](https://vim.rtorr.com/)
* [Vim game](https://vim-adventures.com/)


### Console commands
- **echo** - Output the parameters of the command
- **cd** - Change directory
- **mkdir** - Make directory
- **rmdir** - Remove directory
- **rm** - Remove file(s)
- **mv** - Move file(s)
- **cp** - Copy files
- **ls** - List files
- **curl** - Command line client URL browser
- **grep** - Regular expression search
- **find** - Find files
- **top** - View running processes with CPU and memory usage
- **df** - View disk statistics
- **cat** - Output the contents of a file
- **less** - Interactively output the contents of a file
- **wc** - Count the words in a file
- **ps** - View the currently running processes
- **kill** - Kill a currently running process
- **sudo** - Execute a command as a super user (admin)
- **ssh** - Create a secure shell on a remote computer
- **scp** - Securely copy files to a remote computer
- **history** - Show the history of commands
- **ping** - Check if a website is up
- **tracert** - Trace the connections to a website
- **dig** - Show the DNS information for a domain
- **man** - Look up a command in the manual

- `|` - Take the output from the command on the left and _pipe_, or pass, it to the command on the right
- `>` - Redirect output to a file. Overwrites the file if it exists
- `>>` - Redirect output to a file. Appends if the file exists


### Markdown Basics
Basic formatting and syntax info can be found on the [GitHub Markdown Intro](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax).

## AWS Basics
IP address: `44.217.89.189`

#### Steps to start the server
* created an instance of a webserver through AWS EC2
   * For this project, using an AMI (Amazon Machine Image) as the base for the server
   * Had to make sure to adjust the security group rules to allow ssh, http, and https from anywhere (`0.0.0.0/0`)
   * currently using a `t2.micro` instance because it's on the free tier - can upgrade to `t3.micro/nano/small` if running too slowly/erratically
* Can ssh into the server - `ssh -i production-260.pem ubuntu@44.217.89.189`
* Can associate an elastic IP with the server so that the IP address stays the same even when stopping the server

#### Domain name
* Register a domain name from AWS Route 53
* need to manage the records so that it connects to the IP address of your server for the rot domain name and for all subdomain names by creating records associated with the domain name


## HTTPS
* Secure Hypertext Transport Protocol basically expected for all online communication now.
* data and web certificates passed back and forth between browser and domain name of server to verify identity
* Use Caddy and `Let's Encrypt` to dynamically generate and renew a certificate for free
* Modified the Caddy rules to handle requests to the domain name instead of to a specific port so that it uses HTTPS instead


## Deployment
Use the command `./deployFiles.sh -k ~/keys/production-260.pem -h onboard260.click -s simon` in Git Bash to deploy to prod

## HTML
### Overview
HyperText Markup Language - entirely about structure of the web page

* Element: structural sections of the web page
* Tag: designates what kind of element it is
* Attribute: details of the element, such as `id` and `class`
* Hyperlinks: represented with an anchor `a` tag and the link is `href="https://byu.edu"` for example
* Header: `<!DOCTYPE html>` tells browser type and version of the document
* Body: contains all the actual structure/content
* Comments: start with `<!--` and end with `-->`
* `index.html` is the default
* Block: distinct block in the flow of the content structure, such as `div` or `p`
* Inline: element meant to be inline with the content flow of a block element, such as `span` or `b`

### Common elements
| element   | meaning                                                                |
| --------- | ---------------------------------------------------------------------- |
| `html`    | The page container                                                     |
| `head`    | Header information                                                     |
| `title`   | Title of the page                                                      |
| `meta`    | Metadata for the page such as character set or viewport settings       |
| `script`  | JavaScript reference. Either a external reference, or inline           |
| `include` | External content reference                                             |
| `body`    | The entire content body of the page                                    |
| `header`  | Header of the main content                                             |
| `footer`  | Footer of the main content                                             |
| `nav`     | Navigational inputs                                                    |
| `main`    | Main content of the page                                               |
| `section` | A section of the main content                                          |
| `aside`   | Aside content from the main content                                    |
| `div`     | A block division of content                                            |
| `span`    | An inline span of content                                              |
| `h<1-9>`  | Text heading. From h1, the highest level, down to h9, the lowest level |
| `p`       | A paragraph of text                                                    |
| `b`       | Bring attention                                                        |
| `table`   | Table                                                                  |
| `tr`      | Table row                                                              |
| `th`      | Table header                                                           |
| `td`      | Table data                                                             |
| `ol,ul`   | Ordered or unordered list                                              |
| `li`      | List item                                                              |
| `a`       | Anchor the text to a hyperlink                                         |
| `img`     | Graphical image reference                                              |
| `dialog`  | Interactive component such as a confirmation                           |
| `form`    | A collection of user input                                             |
| `input`   | User input field                                                       |
| `audio`   | Audio content                                                          |
| `video`   | Video content                                                          |
| `svg`     | Scalable vector graphic content                                        |
| `iframe`  | Inline frame of another HTML page                                      |

### Special characters
Require this certain type of escape to display special characters
| Character | Entity      |
| --------- | ----------- |
| &amp;     | `&amp;`     |
| <         | `&lt;`      |
| >         | `&gt;`      |
| "         | `&quot;`    |
| '         | `&apos;`    |
| &#128512; | `&#128512;` |


### User input
* `form` container used to be the default for collecting user input data, but now JS has more control and can rebuild HTML dynamically
* To create an input, specify the `type` and other attributes, e.g. `<label for="checkbox1">Check me</label> <input type="checkbox" name="varCheckbox" value="checkbox1" checked />`
* Common attributes include `name`, `disabled`, `value` (initial value), and `required`
* several types have built-in validation, although we should do a lot of validation with JS; also use the CSS selectors to convey the (in)validity to a user

Examples of input elements:
| Element    | Meaning                          | Example                                        |
| ---------- | -------------------------------- | ---------------------------------------------- |
| `form`     | Input container and submission   | `<form action="form.html" method="post">`      |
| `fieldset` | Labeled input grouping           | `<fieldset> ... </fieldset>`                   |
| `input`    | Multiple types of user input     | `<input type="" />`                            |
| `select`   | Selection dropdown               | `<select><option>1</option></select>`          |
| `optgroup` | Grouped selection dropdown       | `<optgroup><option>1</option></optgroup>`      |
| `option`   | Selection option                 | `<option selected>option2</option>`            |
| `textarea` | Multiline text input             | `<textarea></textarea>`                        |
| `label`    | Individual input label           | `<label for="range">Range: </label>`           |
| `output`   | Output of input                  | `<output for="range">0</output>`               |
| `meter`    | Display value with a known range | `<meter min="0" max="100" value="50"></meter>` |

Example of input types:
| Type           | Meaning                           |
| -------------- | --------------------------------- |
| text           | Single line textual value         |
| password       | Obscured password                 |
| email          | Email address                     |
| tel            | Telephone number                  |
| url            | URL address                       |
| number         | Numerical value                   |
| checkbox       | Inclusive selection               |
| radio          | Exclusive selection               |
| range          | Range limited number              |
| date           | Year, month, day                  |
| datetime-local | Date and time                     |
| month          | Year, month                       |
| week           | Week of year                      |
| color          | Color                             |
| file           | Local file                        |
| submit         | button to trigger form submission |


### HTMl media elements
* External media: `img`, `audio`, `video` are references to external files, take a URL as an attribute (either relative or full)
   * `img`: `src="URL"` and `alt="description"`
   * `audio`: `src="URL"` and `controls` to display controls, and `autoplay` and `loop`
   * `video`: `src="URL"` and `controls` and `autoplay` and potentially `crossorigin="anonymous"` if requesting files from a different domain
* Internal media: 
   * `svg`: scalable vector graphics, used to render graphics inline
   * `canvas`: used to facilitate 2D drawing and animation, is fairly simple HTML, but drawing on it requires JS

## CSS
### Overview
include selectors, declarations, fonts, animation
* Cascading Style Sheets - style the HTML, and create more complex renderings of dynamic content
* defined by rulesets, which include a `selector`, and 1+ `declarations` that show `property: property value`
* three methods to use CSS
   * `style` attribute of an HTML element
   * `<style>` element to define CSS rules within the HTML doc
   * `<link>` element with relation `rel="stylesheet"` and `href="styles.css"` - this is the preferred, default method
* rules cascade down from the highest nodes to the lowest; lower levels override a higher declaration
* box model: inside out goes content, padding, border, margin

### Usage
* Selectors:
   * element type: `body {property: property-value}`
   * Combinators: 

| Combinator       | Meaning                    | Example        | Description                                |
| ---------------- | -------------------------- | -------------- | ------------------------------------------ |
| Descendant       | A list of descendants      | `body section` | Any section that is a descendant of a body |
| Child            | A list of direct children  | `section > p`  | Any p that is a direct child of a section  |
| General sibling  | A list of siblings         | `div ~ p`      | Any p that has a div sibling               |
| Adjacent sibling | A list of adjacent sibling | `div + p`      | Any p that has an adjacent div sibling     |
   
   * Class: `.class {}` or `element.class {}` to select all elements of a certain type and class
   * ID: target a specific element with an id like `#id {}`
   * Attribute: select elements based on having an attribute `a[href] {}` or a specific attribute value `a[href="link"] {}`
   * Pseudo: selects based on positional relationships, mouse interactions, hyperlink visitation states, and attributes, e.g. `section:hover {}`
* Declarations:
   * Properties

| Property           | Value                              | Example             | Discussion                                                                     |
| ------------------ | ---------------------------------- | ------------------- | ------------------------------------------------------------------------------ |
| background-color   | color                              | `red`               | Fill the background color                                                      |
| border             | color width style                  | `#fad solid medium` | Sets the border using shorthand where any or all of the values may be provided |
| border-radius      | unit                               | `50%`               | The size of the border radius                                                  |
| box-shadow         | x-offset y-offset blu-radius color | `2px 2px 2px gray`  | Creates a shadow                                                               |
| columns            | number                             | `3`                 | Number of textual columns                                                      |
| column-rule        | color width style                  | `solid thin black`  | Sets the border used between columns using border shorthand                    |
| color              | color                              | `rgb(128, 0, 0)`    | Sets the text color                                                            |
| cursor             | type                               | `grab`              | Sets the cursor to display when hovering over the element                      |
| display            | type                               | `none`              | Defines how to display the element and its children                            |
| filter             | filter-function                    | `grayscale(30%)`    | Applies a visual filter                                                        |
| float              | direction                          | `right`             | Places the element to the left or right in the flow                            |
| flex               |                                    |                     | Flex layout. Used for responsive design                                        |
| font               | family size style                  | `Arial 1.2em bold`  | Defines the text font using shorthand                                          |
| grid               |                                    |                     | Grid layout. Used for responsive design                                        |
| height             | unit                               | `.25em`             | Sets the height of the box                                                     |
| margin             | unit                               | `5px 5px 0 0`       | Sets the margin spacing                                                        |
| max-[width/height] | unit                               | `20%`               | Restricts the width or height to no more than the unit                         |
| min-[width/height] | unit                               | `10vh`              | Restricts the width or height to no less than the unit                         |
| opacity            | number                             | `.9`                | Sets how opaque the element is                                                 |
| overflow           | [visible/hidden/scroll/auto]       | `scroll`            | Defines what happens when the content does not fix in its box                  |
| position           | [static/relative/absolute/sticky]  | `absolute`          | Defines how the element is positioned in the document                          |
| padding            | unit                               | `1em 2em`           | Sets the padding spacing                                                       |
| left               | unit                               | `10rem`             | The horizontal value of a positioned element                                   |
| text-align         | [start/end/center/justify]         | `end`               | Defines how the text is aligned in the element                                 |
| top                | unit                               | `50px`              | The vertical value of a positioned element                                     |
| transform          | transform-function                 | `rotate(0.5turn)`   | Applies a transformation to the element                                        |
| width              | unit                               | `25vmin`            | Sets the width of the box                                                      |
| z-index            | number                             | `100`               | Controls the positioning of the element on the z axis                          |

   * Units

| Unit | Description                                                      |
| ---- | ---------------------------------------------------------------- |
| px   | The number of pixels                                             |
| pt   | The number of points (1/72 of an inch)                           |
| in   | The number of inches                                             |
| cm   | The number of centimeters                                        |
| %    | A percentage of the parent element                               |
| em   | A multiplier of the width of the letter `m` in the parent's font |
| rem  | A multiplier of the width of the letter `m` in the root's font   |
| ex   | A multiplier of the height of the element's font                 |
| vw   | A percentage of the viewport's width                             |
| vh   | A percentage of the viewport's height                            |
| vmin | A percentage of the viewport's smaller dimension                 |
| vmax | A percentage of the viewport's larger dimension                  |
   * Color
      
| Method       | Example                   | Description                                                                                                                                                                                                       |
| ------------ | ------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| keyword      | `red`                     | A set of predefined colors (e.g. white, cornflowerblue, darkslateblue)                                                                                                                                            |
| RGB hex      | `#00FFAA22` or `#0FA2`    | Red, green, and blue as a hexadecimal number, with an optional alpha opacity                                                                                                                                      |
| RGB function | `rgb(128, 255, 128, 0.5)` | Red, green, and blue as a percentage or number between 0 and 255, with an optional alpha opacity percentage                                                                                                       |
| HSL          | `hsl(180, 30%, 90%, 0.5)` | Hue, saturation, and light, with an optional opacity percentage. Hue is the position on the 365 degree color wheel (red is 0 and 255). Saturation is how gray the color is, and light is how bright the color is. |


* Fonts
   * `font-family` to define which fonts should be used
   * four major families: `Serif` (have the small stroke attached to ends of major strokes), `sans-serif` (doesn't have serifs), `fixed` (all chars same size, helpful for lining up text), `symbol` (non-language chars like arrows or emojis)
   * importing fonts: `@font-face {font-family: Quicksand; src: url('link')}` if hosted on own server, or `@import url('link to Google fonts')`

### Responsive design
* Animation
   * use the `animation` properties (`animation-name: some-name` and `animation-duration: 5s`) 
   * define `@keyframes some-name {from {property: property-value} 95% {property: other-property-value} to {property: final-property-value}}`

* Display

| Value  | Meaning                                                                                                                      |
| ------ | ---------------------------------------------------------------------------------------------------------------------------- |
| none   | Don't display this element. The element still exists, but the browser will not render it.                                    |
| block  | Display this element with a width that fills its parent element. A `p` or `div` element has block display by default.        |
| inline | Display this element with a width that is only as big as its content. A `b` or `span` element has inline display by default. |
| flex   | Display this element's children in a flexible orientation.                                                                   |
| grid   | Display this element's children in a grid orientation.                                                                       |

   * viewport meta tag: `<meta name="viewport" content="width=device-width,initial-scale=1" />`
   * float: moves element to left or right and allows inline elements to wrap around it
   * `@media` queries that dynamically detect size and orientation to apply CSS rules to represent HTML some way to accommodate the change
* Grid
   * useful to display a group of child elements in a responsive grid using `display: grid`
   * `grid-template-columns` to specify column layout, `grid-auto-rows` to specify row layout, `grid-gap` to separate each item
* Flex
   * useful to partition app into areas that responsively move around as window resizes/orientation changes using `display: flex`
   * need `flex-direction` to tell it how to adjust everything
   * `flex: 'fractional units of growth' 'starting height'`
   * `column` puts everything in the flexbox inside a single column, so it makes them into rows; `row` puts everything in the flexbox inside a single row, so it makes them into columns

### Frameworks
* shared packages of code that can be used to reuse patterns in CSS 
* Tailwind: uses smaller definitions applied specifically to individual HTML elements
* Bootstrap: most used; include it with the same `<link href="their link">` functionality as for our own stylesheets, but needs different links and an `integrity="long string"` thing; if the components you use also would need JS interactivity, another `<script>` thing you include at the bottom
* Using Bootstrap: `class="some Bootstrap class"`


## JavaScript
### Overview
* basics: `console.log()`, `function name(params) {return value;}`, `// line comment; /*block comment*/`, scope defined with `{}`, statements ended with `;`
* console: use `console.log(print something)`, `console.time('demo'); other code; console.time('demo')` to see how long a block of code takes, `console.count(sth)` to see how many times something has been called
* JS in HTML: inside a `<script>` element directly or with `src='sth.js'` 

### Types, operators, classes
types, ops, string, arrays, json, objects and classes, regex, destructuring
* declare variables: `let` is variable, `const` is a constant, avoid `var`
* types: primitives and object types

| Type        | Meaning                                                    |
| ----------- | ---------------------------------------------------------- |
| `Null`      | The type of a variable that has not been assigned a value. |
| `Undefined` | The type of a variable that has not been defined.          |
| `Boolean`   | true or false.                                             |
| `Number`    | A 64-bit signed number.                                    |
| `BigInt`    | A number of arbitrary magnitude.                           |
| `String`    | A textual sequence of characters.                          |
| `Symbol`    | A unique value.                                            |

| Type       | Use                                                                                    | Example                  |
| ---------- | -------------------------------------------------------------------------------------- | ------------------------ |
| `Object`   | A collection of properties represented by name-value pairs. Values can be of any type. | `{a:3, b:'fish'}`        |
| `Function` | An object that has the ability to be called.                                           | `function a() {}`        |
| `Date`     | Calendar dates and times.                                                              | `new Date('1995-12-17')` |
| `Array`    | An ordered sequence of any type.                                                       | `[3, 'fish']`            |
| `Map`      | A collection of key-value pairs that support efficient lookups.                        | `new Map()`              |
| `JSON`     | A lightweight data-interchange format used to share information across programs.       | `{"a":3, "b":"fish"}`    |

* operators: standard math, but `===` for equality; `+` and `===` for strings
* weakly typed language, types can be automatically converted based on context
* conditionals: standard if, else, if else with brackets; also can use ternary `a === 1 ? console.log(1) : console.log('not 1');`; boolean operators are `&&` `||` `!`
* loops: standard for, for in (names), for of (object values), while, do while, switch; break and continue
* string: normal string functions w/ length, indexOf, split, startsWith, endsWith, toLowerCase
* arrays: similar to others, 0-indexed, declared with array constructor or array literal notation

| Function | Meaning                                                   | Example                       |
| -------- | --------------------------------------------------------- | ----------------------------- |
| push     | Add an item to the end of the array                       | `a.push(4)`                   |
| pop      | Remove an item from the end of the array                  | `x = a.pop()`                 |
| slice    | Return a sub-array                                        | `a.slice(1,-1)`               |
| sort     | Run a function to sort an array in place                  | `a.sort((a,b) => b-a)`        |
| values   | Creates an iterator for use with a `for of` loop          | `for (i of a.values()) {...}` |
| find     | Find the first item satisfied by a test function          | `a.find(i => i < 2)`          |
| forEach  | Run a function on each array item                         | `a.forEach(console.log)`      |
| reduce   | Run a function to reduce each array item to a single item | `a.reduce((a, c) => a + c)`   |
| map      | Run a function to map an array to a new array             | `a.map(i => i+i)`             |
| filter   | Run a function to remove items                            | `a.filter(i => i%2)`          |
| every    | Run a function to test if all items match                 | `a.every(i => i < 3)`         |
| some     | Run a function to test if any items match                 | `a.some(i => 1 < 1)`          |

* JSON: keys are always strings, and value must be a valid JSON data type (string, number, bool, array, object, null); most commonly are objects w/ 0+ key-value pairs that are comma-delimited; strings always need double quotes; convert to and from using `JSON.parse` and `JSON.stringify`
* Objects: object represents a collection of name-value pairs referred to as properties w/ name as type String or Symbol and value of any type; have common OOP functionality like constructors, `this`, static propertics and functions, and inheritance; can be created with `const obj = new Object({a: 3})`; can reference properties with dot or bracket notation; static functions: `entries` (python items()), `keys`, `values`
* Classes: can be used to define reusable components; similar declarations but need explicit constructor and assumed function declarations (private by prefixing with #); can be extended using the `extends` keyword, and `super` to call parent function
* Destructuring: looks like declaring an array on the left `const [b, c] = [1, 2, 3, 4]` gives `b=1, c=2`; can also use rest for this; can do this for objects by explicitly referencing the properties you want, and can map them to new variables `const {a: count, b: type} = {a: 1, b: 'animals', c: ['fish', 'cats']};`


### functions
funcs, arrow funcs, promises, async/await, exceptions, rest and spread, scope, modules, DOM, LocalStorage

* Functions: first class objects, so can be treated like any other variable; normal basic syntax
* anonymous functions: a function assigned to a variable so it can be stored as object property or passed as parameter; `const funcName = function (params) {return value;}`
* inner functions: can declare functions inside of other functions to modularize code
* arrow functions: `=>` replaces the `function` keyword but comes after the parameters, so `(params) => 'return value'`; return keyword unneeded if function contains single expression (`() => 3;`), required if curly braces included (`() => {return 3;};`)
* Rest and Spread: `rest` syntax is like `**kwargs` when you don't know the rest of the parameters; use `...param` to turn the last parameter into a `rest` param that automatically combines any number of params into an array; spread does the opposite by expanding any iterable into a function's parameters; same syntax w/ `...[iterable]` passed in as a parameter
* exceptions: `try catch throw finally`; smart to implement fallbacks that do something like return a cached version of some data if the network version is unavailable
* Scope: the variables that are visible in the current context of execution; global, module, function, block; `this` represents a variable pointing to an object that contains the context within the scope of the currently executing code (either `globalThis`, the object that owns a function, or an object); a closure is a function and its surrounding state - whatever variables are accessible when a function is created are available inside that function, even if function is passed outside the scope of its creation; arrow functions inherit the `this` of their creation context
* modules: file-based scope, so need to `export` and `import` the objects/functions you need from one file to another file
* DOM: an object rep of HTML elements so that programs can dynamically manipulate the `document`; access elements with the DOM element interface - `querySelectorAll` selects elements with a certain tag, `textContent` contains the element's text, `innerHTML` is the textual rep of an element's HTML content; can insert, modify, delete elements by creating them independently and then appending them to an existing element; best not to directly inject HTML; DOM elements can attach event listeners (also can add listeners directly in HTML)
* `localStorage`: ability to persistently store and retrieve data on a user's browser across user sessions and HTML page renderings; have to be string, number, boolean, or an object/array converted into a JSON with `JSON.stringify()` and then parsed back with `JSON.parse()`

| Function             | Meaning                                      |
| -------------------- | -------------------------------------------- |
| setItem(name, value) | Sets a named item's value into local storage |
| getItem(name)        | Gets a named item's value from local storage |
| removeItem(name)     | Removes a named item from local storage      |
| clear()              | Clears all items in local storage            |

* Promises: allows functions to run async

```js
const coinToss = new Promise((resolve, reject) => {
  setTimeout(() => {
    if (Math.random() > 0.1) {
      resolve(Math.random() > 0.5 ? 'heads' : 'tails');
    } else {
      reject('fell off table');
    }
  }, 10000);
});

coinToss
  .then((result) => console.log(`Coin toss result: ${result}`))
  .catch((err) => console.log(`Error: ${err}`))
  .finally(() => console.log('Toss completed'));

// OUTPUT:
//    Coin toss result: tails
//    Toss completed
```

* Async/await: `await` wraps execution of a promise and removes the chaining; blocks running until promise state is `fulfilled`; need to define a function as `async` so that function returns a promise (automatically resolved with a value that is the function's return value), and then change it to explicitly create a promise


## Web services
### Overview
* internet connections between devices use IP addresses, or symbolic domain names, which are keys to IP addresses in the Domain Name System (DNS)
* `traceroute` console functionality traces the route between a device and some IP address/domain
* TCP/IP model - layered architecture covering everything from physical wires to the data sent

| Layer       | Example         | Purpose                               |
| ----------- | --------------- | ------------------------------------- |
| Application | HTTPS           | Functionality like web browsing       |
| Transport   | TCP             | Moving connection information packets |
| Internet    | IP              | Establishing connections              |
| Link        | Fiber, hardware | Physical connections                  |

### Web servers
* web server: a computing device that is hosting a web service that knows how to accept internet connections and speak HTTP app protocol
* able to create web services easily and build them into the web app w/ modern programming langs
* gateways: also called reverse proxy, which is a web service listening on HTTPS 443 to then map each incoming request to services on other ports
* microservice: web services that provide single functional purpose (single responsibility principle)
* `serverless` functionality - write a function that speaks HTTP - just need to think about a single function now

### Domain names
* domain name: text string that follows specific naming conventions and is listed in the domain name registry
   * broken into root domain (secondary level domain (byu) and top level domain (com, org, click))
   * then can make subdomain prefixes, as many as desired; can resolved to different IP addresses if desired
* console: 
   * get the IP address for any domain using `dig`
   * `whois` - info about domain name from domain name registry
* DNS
   * list registered domains with a domain name system (DNS) server and associate it with an IP address
   * `address` `A` records map domain name to IP and `canonical name` `CNAME` records map domain name to domain name (alias)
   ** `time to live` `TTL` setting to set how long info should be cached

