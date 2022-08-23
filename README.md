# pd-menu

A menu custom web component that can be used in web applications or websites.
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/pd-menu)

[Demo page (by unpkg.com)](https://unpkg.com/pd-menu@1.0.0/pd-menu.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

`node.js`

### Installing

`$ npm install pd-menu`

## Running the tests

`npm test`

### Tests output explanation

#### pd-menu

_**sRoot**_

_✓ Checks that component is attached to DOM._


_**sRoot**_

_✓ Checks that component is attached to DOM and has empty innerHTML and has all it's attributes empty._


##### Array

_**indexOf()**_

_✓ should return -1 when the value is not present. This is a demo test to check that the response from the testing framework is ok._


## Deployment

Add the custom element tag to your HTML page. 

The element's parameters are:

 - **starttext** (string - default `RETURN TO START`). Set the text of the return to root menu list. 
 - **backtext** (string - default `PREVIOUS TAXONOMIES`). Set the text of the back to parent menu list.
 - **headertext** (string - default `TAXONOMIES`). Set the text of the menu header.

**Basic Usage**

***Example CSS***

    html, body {
		font-family: 'Arial';
		height: 100%;
		overflow: hidden;
		-webkit-perspective: 37.5rem;
		-moz-perspective: 37.5rem;
		perspective: 37.5rem;
		background-color: #cecece;
		display: flex;
		flex-flow: column;
		align-items: stretch;
		align-content: space-between;
		justify-content: stretch;
	}
	:host {
		display: block;
	}
	pd-menu {
		display: block;
	}

***Example HTML***

	<pd-menu></pd-menu>

You can change the element's attributes/appearance by using Javascript, for example:

	customElements.whenDefined('pd-menu').then(() => {
		document.querySelector("pd-menu").setAttribute("headertext","MY CUSTOM TEXT");
	});

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request 😁

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details