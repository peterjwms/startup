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

### URL
represents the location of any web resource

```yaml
<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>
```

| Part        | Example                              | Meaning                                                                                                                                                                                                                                                                             |
| ----------- | ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Scheme      | https                                | The protocol required to ask for the resource. For web applications, this is usually HTTPS. But it could be any internet protocol such as FTP or MAILTO.                                                                                                                            |
| Domain name | byu.edu                              | The domain name that owns the resource represented by the URL.                                                                                                                                                                                                                      |
| Port        | 3000                                 | The port specifies the numbered network port used to connect to the domain server. Lower number ports are reserved for common internet protocols, higher number ports can be used for any purpose. The default port is 80 if the scheme is HTTP, or 443 if the scheme is HTTPS.     |
| Path        | /school/byu/user/8014                | The path to the resource on the domain. The resource does not have to physically be located on the file system with this path. It can be a logical path representing endpoint parameters, a database table, or an object schema.                                                    |
| Parameters  | filter=names&highlight=intro,summary | The parameters represent a list of key value pairs. Usually it provides additional qualifiers on the resource represented by the path. This might be a filter on the returned resource or how to highlight the resource. The parameters are also sometimes called the query string. |
| Anchor      | summary                              | The anchor usually represents a sub-location in the resource. For HTML pages this represents a request for the browser to automatically scroll to the element with an ID that matches the anchor. The anchor is also sometimes called the hash, or fragment ID.                     |

### Ports
* both IP address and numbered port necessary for connection - allow single device to support multiple protocols and services
* 0-1023 for standard protocols (avoid using); 1024-49151 for requesting entities, commonly used by internal services; 49152-65535 are dynamic
* Caddy listening on 80 for unsecure HTTP and 443 for HTTPS; port 22 used externaly exposed to SSH into server; Caddy then examines the path in URL through HTTP request and makes connection to service's port or file and returns results from request

| Port | Protocol                                                                                           |
| ---- | -------------------------------------------------------------------------------------------------- |
| 20   | File Transfer Protocol (FTP) for data transfer                                                     |
| 22   | Secure Shell (SSH) for connecting to remote devices                                                |
| 25   | Simple Mail Transfer Protocol (SMTP) for sending email                                             |
| 53   | Domain Name System (DNS) for looking up IP addresses                                               |
| 80   | Hypertext Transfer Protocol (HTTP) for web requests                                                |
| 110  | Post Office Protocol (POP3) for retrieving email                                                   |
| 123  | Network Time Protocol (NTP) for managing time                                                      |
| 161  | Simple Network Management Protocol (SNMP) for managing network devices such as routers or printers |
| 194  | Internet Relay Chat (IRC) for chatting                                                             |
| 443  | HTTP Secure (HTTPS) for secure web requests                                                        |

### HTTP
#### Requests

```yaml
<verb> <url path, parameters, anchor> <version>
[<header key: value>]*
[

  <body>
]
```


| Verb    | Meaning                                                                                                                                                                                                                                                  |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| GET     | Get the requested resource. This can represent a request to get a single resource or a resource representing a list of resources.                                                                                                                        |
| POST    | Create a new resource. The body of the request contains the resource. The response should include a unique ID of the newly created resource.                                                                                                             |
| PUT     | Update a resource. Either the URL path, HTTP header, or body must contain the unique ID of the resource being updated. The body of the request should contain the updated resource. The body of the response may contain the resulting updated resource. |
| DELETE  | Delete a resource. Either the URL path or HTTP header must contain the unique ID of the resource to delete.                                                                                                                                              |
| OPTIONS | Get metadata about a resource. Usually only HTTP headers are returned. The resource itself is not returned.                                                                                                                                              |

#### Responses
```yaml
<version> <status code> <status string>
[<header key: value>]*
[

  <body>
]
```

- 1xx - Informational.
- 2xx - Success.
- 3xx - Redirect to some other location, or that the previously cached resource is still valid.
- 4xx - Client errors. The request is invalid.
- 5xx - Server errors. The request cannot be satisfied due to an error on the server.


| Code | Text                                                                                 | Meaning                                                                                                                           |
| ---- | ------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------- |
| 100  | Continue                                                                             | The service is working on the request                                                                                             |
| 200  | Success                                                                              | The requested resource was found and returned as appropriate.                                                                     |
| 201  | Created                                                                              | The request was successful and a new resource was created.                                                                        |
| 204  | No Content                                                                           | The request was successful but no resource is returned.                                                                           |
| 304  | Not Modified                                                                         | The cached version of the resource is still valid.                                                                                |
| 307  | Permanent redirect                                                                   | The resource is no longer at the requested location. The new location is specified in the response location header.               |
| 308  | Temporary redirect                                                                   | The resource is temporarily located at a different location. The temporary location is specified in the response location header. |
| 400  | Bad request                                                                          | The request was malformed or invalid.                                                                                             |
| 401  | Unauthorized                                                                         | The request did not provide a valid authentication token.                                                                         |
| 403  | Forbidden                                                                            | The provided authentication token is not authorized for the resource.                                                             |
| 404  | Not found                                                                            | An unknown resource was requested.                                                                                                |
| 408  | Request timeout                                                                      | The request takes too long.                                                                                                       |
| 409  | Conflict                                                                             | The provided resource represents an out of date version of the resource.                                                          |
| 418  | [I'm a teapot](https://en.wikipedia.org/wiki/Hyper_Text_Coffee_Pot_Control_Protocol) | The service refuses to brew coffee in a teapot.                                                                                   |
| 429  | Too many requests                                                                    | The client is making too many requests in too short of a time period.                                                             |
| 500  | Internal server error                                                                | The server failed to properly process the request.                                                                                |
| 503  | Service unavailable                                                                  | The server is temporarily down. The client should try again with an exponential back off.                                         |

#### Headers

| Header                      | Example                              | Meaning                                                                                                                                                                        |
| --------------------------- | ------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Authorization               | Bearer bGciOiJIUzI1NiIsI             | A token that authorized the user making the request.                                                                                                                           |
| Accept                      | image/\*                             | The format the client accepts. This may include wildcards.                                                                                                            |
| Content-Type                | text/html; charset=utf-8             | The format of the content being sent. These are described using standard [MIME](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types) types. |
| Cookie                      | SessionID=39s8cgj34; csrftoken=9dck2 | Key value pairs that are generated by the server and stored on the client.                                                                                                     |
| Host                        | info.cern.ch                         | The domain name of the server. This is required in all requests.                                                                                                               |
| Origin                      | cs260.click                          | Identifies the origin that caused the request. A host may only allow requests from specific origins.                                                                           |
| Access-Control-Allow-Origin | https://cs260.click                  | Server response of what origins can make a request. This may include a wildcard.                                                                                               |
| Content-Length              | 368                                  | The number of bytes contained in the response.                                                                                                                                 |
| Cache-Control               | public, max-age=604800               | Tells the client how it can cache the response.                                                                                                                                |
| User-Agent                  | Mozilla/5.0 (Macintosh)              | The client application making the request.                                                                                                                                     |

#### Body
format defined by the `Content-Type` header; client can specify acceptable formats using `accept` header

#### Cookies
HTTP stateless, so use cookies to track state across requests; generated by server and passed to client as HTTP header; use cookies to remember auth, language preference, other user data, etc.; danger comes from web apps improperly using them to violate privacy or monetize data

### Fetch
* `fetch` function preferred to make HTTP requests; built into browser's JS runtime; takes a URL and returns a promise
* GET request with fetch just passes the URL, and then takes care of the promise with `await` or `.then`, and `(response) => response.json()`
* POST request populates method, body, and headers of the fetch request as a JSON key-value object, and handles response the same way

### Node.js
* first successful app to deploy JS outside browser in 2009; allows JS to power fullstack
* use NVM (Node Version Manager) to install and manage node
* run a line of JS with `node -e "console.log(1+1)"`
* execute a program with `node index.js`
* NPM  (Node Package Manager) to install package locally with `npm install package-name`, and then include `require` statement in code to reference package name; init using `npm init -y` with all defaults for a directory
* `package.json` contains metadata about project w/ name and default entry JS file; commands/scripts to execute to run/test/distribute code; packages that the project depends on
* `package-lock.json` tracks versions of the pakages installed; also creates `node_modules` directory, which contains all the actual JS files - don't want to check this into source control b/c large - can rebuild it with package and package-lock instead, so .gitignore it
* Creating web service - use JS to write code that listens on a port, receives requests, processes, and responds using node

#### Debugging Node
* can just debug inside VSCode with F5, breakpoints, etc.; F5 to start, F10 to step to next line, F11 to step into call, F5 to continue from current line, shift-F5 to stop debugging
* Nodemon package that wraps node to watch for files in project directory to change and then it automatically restarts node 


### Express
* support for routing requests for service endpoints, manipulating HTTP requests with JSON body content, generating HTTP responses, using middleware to add functionality
* routes - call a function based on an HTTP path; `app` object supports all HTTP verbs as functions on the object
   - e.g. call `get` method with the URL and a callback function with params for HTTP request, response, and next
   - supports parameters with a colon, e.g. `app.get('/store/:storeName', (req, res, next) => {res.send(response)})`
    - route paths can include wildcard `*` syntax or full regex; also don't need to include `next()` if you're not calling it, just means that no middleware functions will be invoked
* middleware
   - middleware represents componentized pieces of functionality; similar to routing functions, but are called for every HTTP request unless a preceding function doesn't call next; routing are only called if pattern matches
   - mediator loads middleware components, determines order of execution
   - Express has standard set of middleware for functionality like routing, authentication, CORS, sessions, serving static web files, cookies, and logging
   - the order you add your middleware to the Express app object controls the order that the middleware functions are called; if don't call `next`, it stops the chain
   - can add and use third-party middleware, like `cookie-parser` to simplify generation and access of cookies
   - error handling - looks similar, but takes an additional `err` param with the error

### Security
* SOP - Same Origin Policy
   - only allows JS to make requests to a domain if it's the same domain the user is currently viewing
* CORS - Cross Origin Resource Sharing
   - allows client to specify origin of request and let server respond with which origins are allowed
   - can range from all origins if an external API or something similar, or only specific origins, for something like auth service
   - browser is protecting the user from accessing the auth endpoint from the wrong origin - only mean to alert user that something is being attempted
* third-party services
   - need to make sure any other domain allows requests as defined by the `Access-Control-Allow-Origin` header returned

### Service Design
* model and sequence diagrams - model the primary objects and interactions (not focused on programming constructs/infrastructure)
* leverage existing HTTP and content types so you don't have to rewrite stuff; includes using caching serverse to increase performance, edge servers to bring content closer, replication servers that provide redundant copies of content and make app more resilient to network failures
* endpoints - each endpoint provides single functional purpose
   - design considerations
      - grammatical - everything with HTTP is a resource that you act on with an HTTP verb
      - readable - resource should be readable in the URL path
      - discoverable - make it so someone using your endpoints only needs to remember top level endpoint and then they can discover everything else by you providing endpoints for aggregated resources
      - compatible - make it so you can add new functionality w/o breaking existing clients; usually means clients should ignore anything they don't understand; add new representations of fields to provide new functionality for clients that know how to use that field w/o harming older clients that ignore new fields
      - simple - keep endpoints focused on primary resources of your app - class/sequence diagrams that outline primary resources - should only be one way to act on a resource, endpoints do only one thing
       - documented - Open API spec is ex of tooling that helps create/use/maintain documentation of service endpoints - can use those to help w/ client implementations and facilitates easier maintenance
* Remote Procedure Calls - RPC
   - exposes service endpoints as simple function calls; advantage that it maps directly to function calls in the server, but also directly exposes inner workings of the service
   - function call is the actual verb and subject of the function name, e.g. `deleteOrder` in `POST /updateOrder /HTTP/2`
* REST - Representational State Transfer
   - take advantage of foundational principles of HTTP by verbs always acting on a resource; operations impact the state of a resource as it is transferred by REST endpoint call - allows for caching functionality of HTTP to work optimally
   - proper HTTP verb is used and URL path uniquely identifies the resource
* GraphQL
   - focuses on manipulation of data instead of function call (RPC) or resource (REST): query that specifies desired data and how it should be joined/filtered
   - instead of making calls for every resource, makes a single query to request all information, examine the query, join desired data, and filter out anything else
   - only one endpoint, query; helps remove logic for parsing endpoints and mapping requests to specific resources

### PM2 - Process Manager 2
* `daemon` registers programs to keep them running after a shutdown
* PM@ already on prod server as part of AWS AMI when launched

| Command                                                    | Purpose                                                                          |
| ---------------------------------------------------------- | -------------------------------------------------------------------------------- |
| **pm2 ls**                                                 | List all of the hosted node processes                                            |
| **pm2 monit**                                              | Visual monitor                                                                   |
| **pm2 start index.js -n simon**                            | Add a new process with an explicit name                                          |
| **pm2 start index.js -n startup -- 4000**                  | Add a new process with an explicit name and port parameter                       |
| **pm2 stop simon**                                         | Stop a process                                                                   |
| **pm2 restart simon**                                      | Restart a process                                                                |
| **pm2 delete simon**                                       | Delete a process from being hosted                                               |
| **pm2 delete all**                                         | Delete all processes                                                             |
| **pm2 save**                                               | Save the current processes across reboot                                         |
| **pm2 restart all**                                        | Reload all of the processes                                                      |
| **pm2 restart simon --update-env**                         | Reload process and update the node version to the current environment definition |
| **pm2 update**                                             | Reload pm2                                                                       |
| **pm2 start env.js --watch --ignore-watch="node_modules"** | Automatically reload service when index.js changes                               |
| **pm2 describe simon**                                     | Describe detailed process information                                            |
| **pm2 startup**                                            | Displays the command to run to keep PM2 running after a reboot.                  |
| **pm2 logs simon**                                         | Display process logs                                                             |
| **pm2 env 0**                                              | Display environment variables for process. Use `pm2 ls` to get the process ID    |

 ### Environments
 * separation of dev (PC) and prod (AWS server) environments - don't use prod to develop or test anything w/ your app
 * developer won't have access to prod usually to prevent them from nefariously manipulating company asset
 * continuous integration process - checkout app code, lint it, build, test, stage, test, then finally deploy
 * advantage is that it's reproducible, and encourages quick iteration b/c easier to deploy code;

### Uploading files
* to upload files from frontend to backend - use HTML `input` el of type `file` and `Multer` NPM package backend
* Multer - handles reading the file, enforcing size limit, and storing file in `uploads` directory
* storage solutions - don't want to put stuff on server - not much space, servers are typically transient, server storage not usually backed up, multiple app servers mean you can't assume the server you uploaded data to is the same one you request a download from
* want to use dedicated storage service w/ durability, not tied to compute capacity, and accessible by multiple servers
* AWS S3 very commonly used


## Data services
### Intro
* websites need to store app and user data persistently
* MongoDB uses JSON objects as core data model, so fits with fullstack JSON models well - no strict schema requirements, allowing collection schema to morph organically as data model of app evolves
* mongo database has 1+ collections, each with an array of JS objects, each with a unique ID


| Service       | Specialty             |
| ------------- | --------------------- |
| MySQL         | Relational queries    |
| Redis         | Memory cached objects |
| ElasticSearch | Ranked free text      |
| MongoDB       | JSON objects          |
| DynamoDB      | Key value pairs       |
| Neo4J         | Graph based data      |
| InfluxDB      | Time series data      |

### Authorization services
* store auth tokens on user's device, usually in a cookie to pass back to web service each request; authorization might have different roles for each user in-app
* Single sign on for user to use the same credentials for multiple web apps; federated login allows user to log in once and then authTok is reused for multiple websites, e.g. Google Docs, Youtube, Drive, etc.

### Account creation/login
* create and login endpoints - 409 (conflict) if trying to create existing user, 401 (unauthorized) if email doesn't exist or wrong pass
* store users and their data in Mongo
* generate authTokens with uuid (Universally Unique Identifier)
* secure passwords by hashing them using `bcrypt`
* pass auth tokens using `cookie-parser`; `httpOnly` tells browser to not allow JS to read cookie, `secure` requires HTTPS, `sameSite` returns cookie only to the domain that generated it

## Testing
### UI testing
* test driven development - issue is that browser is required to execute the code
* Playwright - great recent tool from Microsoft directly connected to VSCode that will run tests you write
* BrowserStack - testing on various devices b/c all can interact differently

### Endpoint testing
* testing services easier than UI b/c it doesn't require a browser
* current champion is Jest - human readable description as first parameter; can write tests to `expect` certain things
* can be good to write tests first and then write code based on design represented by the tests

## WebSocket
### Intro
* communication between 2+ connected devices: notifications, distributed task processing, peer-to-peer communication, async events
* peer-to-peer connection from WebSocket where either party can efficiently send data at any time; only between two parties, so still pinging server if more than two users need to communicate
* use `ws` package to create a WebSocketServer listening on same port as browser; when connection is detected, the `onConnection` callback triggered, `send` to send messages, and `onMessage` to receive messages and do 
* keeping connections alive - has ability to send ping and receive pong if peer is still there; clear up any connections that don't respond
* Debugging Websocket - VSCode to debug server and Chrome to debug client; Chrome's debugger has WebSocket specific support

## Security
### Intro
* application data can be used everywhere, especially with internet interconnectivity everywhere
* terminology
   - **Hacking** - The process of making a system do something it's not supposed to do.
   - **Exploit** - Code or input that takes advantage of a programming or configuration flaw.
   - **Attack Vector** - The method that a hacker employs to penetrate and exploit a system.
   - **Attack Surface** - The exposed parts of a system that an attacker can access. For example, open ports (22, 443, 80), service endpoints, or user accounts.
   - **Attack Payload** - The actual code, or data, that a hacker delivers to a system in order to exploit it.
   - **Input sanitization** - "Cleaning" any input of potentially malicious data.
   - **Black box testing** - Testing an application without knowledge of the internals of the application.
   - **White box testing** - Testing an application by **with** knowledge of the source code and internal infrastructure.
   - **Penetration Testing** - Attempting to gain access to, or exploit, a system in ways that are not anticipated by the developers.
   - **Mitigation** - The action taken to remove, or reduce, a threat.
* Motivations
   - **Disruption** - By overloading a system, encrypting essential data, or deleting critical infrastructure, an attacker can destroy normal business operations. This may be an attempt at extortion, or simply be an attempt to punish a business that that attacker does not agree with.
   - **Data exfiltration** - By privately extracting, or publicly exposing, a system's data, an attacker can embarrass the company, exploit insider information, sell the information to competitors, or leverage the information for additional attacks.
   - **Resource consumption** - By taking control of a company's computing resources an attacker can use it for other purposes such as mining cryptocurrency, gathering customer information, or attacking other systems.
* Common techniques
   - **Injection**: When an application interacts with a database on the backend, a programmer will often take user input and concatenate it directly into a search query. This allows a hacker can use a specially crafted query to make the database reveal hidden information or even delete the database.

   - **Cross-Site Scripting (XSS)**: A category of attacks where an attacker can make malicious code execute on a different user's browser. If successful, an attacker can turn a website that a user trusts, into one that can steal passwords and hijack a user's account.

   - **Denial of Service**: This includes any attack where the main goal is to render any service inaccessible. This can be done by deleting a database using an SQL injection, by sending unexpected data to a service endpoint that causes the program to crash, or by simply making more requests than a server can handle.

   - **Credential Stuffing**: People have a tendency to reuse passwords or variations of passwords on different websites. If a hacker has a user's credentials from a previous website attack, then there is a good chance that they can successfully use those credentials on a different website. A hacker can also try to brute force attack a system by trying every possible combination of password.

   - **Social engineering** - Appealing to a human's desire to help, in order to gain unauthorized access or information.
* What to do
   - **Sanitize input data** - Always assume that any data you receive from outside your system will be used to exploit your system. Consider if the input data can be turned into an executable expression, or can overload computing, bandwidth, or storage resources.
   - **Logging** - It is not possible to think of every way that your system can be exploited, but you can create an immutable log of requests that will expose when a system is being exploited. You can then trigger alerts, and periodically review the logs for unexpected activity.
   - **Traps** - Create what appears to be valuable information and then trigger alarms when the data is accessed.
   - **Educate** - Teach yourself, your users, and everyone you work with, to be security minded. Anyone who has access to your system should understand how to prevent physical, social, and software attacks.
   - **Reduce attack surfaces** - Do not open access anymore than is necessary to properly provide your application. This includes what network ports are open, what account privileges are allowed, where you can access the system from, and what endpoints are available.
   - **Layered security** - Do not assume that one safeguard is enough. Create multiple layers of security that each take different approaches. For example, secure your physical environment, secure your network, secure your server, secure your public network traffic, secure your private network traffic, encrypt your storage, separate your production systems from your development systems, put your payment information in a separate environment from your application environment. Do not allow data from one layer to move to other layers. For example, do not allow an employee to take data out of the production system.
   - **Least required access policy** - Do not give any one user all the credentials necessary to control the entire system. Only give a user what access they need to do the work they are required to do.
   - **Safeguard credentials** - Do not store credentials in accessible locations such as a public GitHub repository or a sticky note taped to a monitor. Automatically rotate credentials in order to limit the impact of an exposure. Only award credentials that are necessary to do a specific task.
   - **Public review** - Do not rely on obscurity to keep your system safe. Assume instead that an attacker knows everything about your system and then make it difficult for anyone to exploit the system. If you can attack your system, then a hacker will be able to also. By soliciting public review and the work of external penetration testers, you will be able to discover and remove potential exploits.

### OWASP - Open Web Application Security Project
* top 10 most important web app security risks
   - broken access control - not properly enforcing permissions on users
   - cryptographic failures - sensitive data accessible w/o encryption, w/ weak protocols, or when cryptographic protections are ignored
   - injection - hacker allowed to supply data that is injected into context where it violates expected use, e.g. SQL injection 
   - insecure design - architectural flaws that are unique for individual systems b/c app team doesn't focus on security
   - security misconfiguration - exploit app config, such as default passwords, unupdated software, exposing config settings, etc.
   - vulernable and outdated components - tech debt the longer an app has been deployed b/c of cost of maintenance
   - identification and authentication failures - user's identity impersonated or assumed by attacker if guessed, or stored elsewhere
   - software and data integrity failure - attacks that allow external software/processes/data to compromise app, such as third-party or open source packages/workflow
   - security logging and monitoring failures - secure system should store logs that are accessible, immutable, and contain info to detect intrusion and conduct analysis
   - server side request forgery - causes app service to make unintended internal requests that use service's elevated privileges to expose internal data/services

## Web Frameworks
### Intro
* make writing web apps easier by providing tools to complete common tasks: modularizing code, creating single page apps, simplifying reactivity, supporting diverse hardware devices
* hybrid file formats - React JSX, Vue SFC, Svelte - abstracts away core formats to put focus on functional components over files
* Vue - combines HTML, CSS, JS into single file, represented in `<script>`, `<style>`, and `<template>` elements
* Svelte - combine all into single file, requires transpiler to generate browser-ready code
* React - JS and HTML as components, CSS declared outside of JSX; uses JS functionality
* Angular - defines which JS, HTML, and CSS are combined, by keeping fairly strong separation of files grouped in a directory together
### React
* focus on making reactive web page components that automatically update from user interactions/changes in underlying data
* abstracts HTML into JSX, which uses Babel preprocessor to convert into valid HTML and JS
* components - allow you to modularize functionality of app; underlying code can directly represent components, and enables reuse
   - render function generates user interface and is inserted into component HTML element
   - element properties used to pass info to React components
   - state - component can have internal state, using React.useState hook function, which returns variable w/ current state and function to update the state
   - class style components, but probably shouldn't be used (`extends React.Component`) and has properties loaded on constructor and state set w/ function on component object
   - reactivity - properties and state used to determine reactivity, which controls how a component reacts to actions taken by user or events that happen within the app

### Toolchains
* more complex webprogramming, so more tools to abstract away complexity
* toolchain for React project uses GitHub, Vite for JSX/TS/dev and debug support, ESBuild for conversion to ES6 modules and transpiling (Babel), Rollup for bundling and tree shaking, PostCSS for CSS transpiling, and bash script for deployment
* tools 
   - **Code repository** - Stores code in a shared, versioned location.
   - **Linter** - Removes, or warns of, non-idiomatic code usage.
   - **Prettier** - Formats code according to a shared standard.
   - **Transpiler** - Compiles code into a different format. For example, from JSX to JavaScript, TypeScript to JavaScript, or SCSS to CSS.
   - **Polyfill** - Generates backward compatible code for supporting old browser versions that do not support the latest standards.
   - **Bundler** - Packages code into bundles for delivery to the browser. This enables compatibility (for example with ES6 module support), or performance (with lazy loading).
   - **Minifier** - Removes whitespace and renames variables in order to make code smaller and more efficient to deploy.
   - **Testing** - Automated tests at multiple levels to ensure correctness.
   - **Deployment** - Automated packaging and delivery of code from the development environment to the production environment.

### Vite
* bundles code quickly and allows for JSX, TS support, etc.

### Router
* web framework router provides functionality for single-page apps
* load one HTML page, and use JS to manipulate DOM and give appearance of multiple pages
* routerdefines possible routes through the app, and automatically manipulates DOM to display appropriate components
* `BrowserRouter` to wrap the whole thing, `NavLink` to create links to paths, and `Route` with elements that take paths and display elements

### Reactivity
* making UI react to changes in user input or data
* enabled with props, state, and render
* when rendered, React parses JSX and creates list of all references to component's state or props objects, which are monitored and re-rendered if changes are detected
* updateState is async, so can't assume that it happens on next line of code

### React hooks
* allow function style components to do everything class style components can do
* `useState` to declare and update state in function component
* `useEffect` to represent lifecycle events, e.g. to run something every time component completes rendering
* dependencies - control what triggers a useEffect hook by specifying dependencies as a second parameter to the call; specifying empty array means it is only called when component is first rendered
* hooks can only be used in function style components and must be called at top scope, so not possible inside loop or conditional, ensuring they're always called in same order when component is rendered

## Misc
### TypeScript
* adds static type checking to JS, preventing type error mistakes; explicitly define types, and errors will generate when JS transpiles
* interfaces - `interface` keyword to define collection of parameters and types that an object must contain to satisfy interface type (custom classes)
* also warns of potential uses of uninitialized variables, or when a function could return null
* also introduces ability to define possible values for a new type, like defining an enumerable
* vite can use typescript w/o additional config

### Performance monitoring
* want app to load in about one second to prevent losing users
* need to monitor responsiveness: browser application latency, network latency, service endpoint latency
* browser application latency
   - impacted by the speed of the user's device, the amount of data that needs to be processed, and the time complexity of the processing algorithm
   - browser requests `index.html` first, and then anything linked from that, including JS, which then makes requests to services, which take longer than simple HTMl load
   - make app processing async as possible so done in background
   - reduce impact of file size and HTTP requests by:
      1. Use compression when transferring files over HTTP.
      1. Reduce the quality of images and video to the lowest acceptable level.
      1. Minify JavaScript and CSS. This removes all whitespace and creates smaller variable names.
      1. Use HTTP/2 or HTTP/3 so that your HTTP headers are compressed and the communication protocol is more efficient.
* Network latency
   - avoid unnecessary or large requests
   - impacted by the amount of data that you send, the amount of data a user can receive per second (this is called bandwidth), and the distance the data has to travel
   - consider low bandwidth connections, global latency (reduced by hosting app files in data centers closer to users)
* Service endpoint latency
   - impacted by the number of request that are made and the amount of time that it takes to process each request
   - some functionality in app blocked until endpoint returns
* Performance tools
   - Chrome network tab - shows all network requests and time necessary; clear cache before testing
   - allows you to simulate real users by throttling network connection
   - Chrome Lighthouse - debugging tool you can use to run an analysis of app
   - Chrome performance tab - breaks down details of app based on discrete intervals of time to isolate where things are running slowly
   - global speed tests - test app from different locations around the world, such as Pingdom.com

### UX Design
* consider why someone is using app, how they want to interact, how visually appealing it is, and how easy it is to get something done
* think of ux as a story b/c always reasons someone using the app
* simplicity (inspired by Google's home page) - focus on a single purpose
* consistency - use standard conventions, but unique so that experience stands out - don't want user to think hard to use app
* navigation
   | Navigation Controls | Description                                           |
   | ------------------- | ----------------------------------------------------- |
   | App controls        | User settings, payment, and help controls             |
   | Device controls     | Device specific controls such as back, next, and home |
   | Breadcrumb          | A path of the user's walk through the application     |
   | Common actions      | Direct links to locations based on the current view   |
* colors - primary, secondary, focus colors to make it nice, can use different shades/tones for variety w/o rainbow
* typography - good font to make it easy to look at and increase attention span (sans serif, serif, monospace, handwriting) - restrict to <3 fonts and use them consistently
* iconography - use standard web icons to identify common functionality and decrease learning curve
* text - consistent in text size and number of characters displayed on a line; specify max paragraph width
* internationalization - translation and correct rendering for currency, dates, numbers, etc.
* space - creates focus and lessen effort necessary to interpret info
* interaction - powerful way to engage user and increase retention
* images - deeper understanding, visual appeal, draw user in, know what product looks like
* animation - make app come alive, confirm choices, demonstrate progress, focus attention, but not too much
* decision fatigue - Hick's law - limit the number of choices given at any point in time
* device aware - more seamless integration leads to more intuitive and useful app, including size and orientation
* performance - partially load some content, display loading animation, etc.
* accessibility - visual, physical, auditory impairments
* legal - HIPAA, FERPA, ADA, GDPR
* walls - complexity, payment, app failure, security, legal

### PWA
not going to be on test