export class pdMenu extends HTMLElement {
  backtext;
  starttext;
  headertext;
  Style;
  css;
  static get observedAttributes() {
    return ['backtext','starttext','headertext'];
  } 
  constructor() {
    super();
    this.sRoot = this.attachShadow({
      mode: 'closed'
    });
	if(!this.isEmpty(this.getAttribute("backtext"))) {
		this.backtext = this.getAttribute("backtext").replace(/(<([^>]+)>)/gi, '');
	} else {
		this.backtext = 'PREVIOUS TAXONOMIES';
	}
	if(!this.isEmpty(this.getAttribute("starttext"))) {
		this.starttext = this.getAttribute("starttext").replace(/(<([^>]+)>)/gi, '');
	} else {
		this.starttext = 'RETURN TO START';
	}
	if(!this.isEmpty(this.getAttribute("headertext"))) {
		this.headertext = this.getAttribute("headertext").replace(/(<([^>]+)>)/gi, '');
	} else {
		this.headertext = 'TAXONOMIES';
	}
	this.css = ".menuitem.taxonomy{z-index:1;align-self:flex-start;position:sticky}.menu{position:sticky;background-color:#646464;border-right:.0625rem solid #646464;line-height:1;left:0;float:left;margin:0;top:0;text-align:left;width:25%;min-height:100vh;height:auto;align-self:stretch;display:flex;flex-direction:column;align-items:center;align-content:stretch;justify-content:stretch;transition:opacity .1s,width .8s}.filter-taxonomies{width:100%}.filter-taxonomies input{width:44%}.filter-taxonomies label{width:54%;float:right;text-align:right}.menu .menuitem{cursor:pointer;opacity:1;line-height:1rem;color:#fff;font-size:1.5vh;width:calc(100% - .5rem);border-bottom:solid .0625rem #fff;transition:opacity 1s;min-height:1.25rem;padding:.5rem .25rem .25rem}span.button{z-index:999}span.button.active{background-color:#0505a5;cursor:not-allowed;pointer-events:none}span.button.disabled,input.disabled{cursor:not-allowed;pointer-events:none}.menu .menuitem.disabled,.menu .menuitem.disabled:hover,.menu .menuitem.disabled:focus{color:#fff;background-color:#400000}.menu .menuitem.ccf_counter:hover:after,.menu .menuitem.user_counter:hover:after,.menu .menuitem.ccf_counter.active:after,.menu .menuitem.user_counter.active:after{color:#646464}.menu .menuitem:hover,.menu .menuitem.active,.menu .menuitem:focus{background-color:#fff;color:#646464;border-bottom:solid .0625rem #646464}.menu .menuitem:not(.header):hover:before,.menu .menuitem:not(.header):focus:before,.menu .menuitem.active:before{content:'◂';font-size:2rem;line-height:0;float:right;display:flex;align-items:stretch;align-content:center;margin:.25rem .5rem 0 0;justify-content:flex-start;align-self:start}.menu .menuitem.header,.menu .menuitem.after_bottom,.menu .menuitem.bulk,.menu .menuitem.back,.menu .menuitem.bottom{font-weight:700;background-color:#fff;color:#646464;border-bottom:solid .0625rem #646464}.menuitem.back,.menuitem.bottom{z-index:1;bottom:0;position:sticky;align-self:flex-end;margin-top:auto}.menu .menuitem.permasave{align-self:flex-end;font-weight:700;background-color:#f50505;color:#fff}.menu .menuitem.permasave:hover,.menu .menuitem.permasave:focus{background-color:#fff;color:#f50505;border-bottom:solid .0625rem #f50505}.menu .menuitem.header{cursor:unset;position:sticky;align-self:flex-start;top:0}.zero-width{width:0}html{overflow:scroll;overflow-x:hidden}::-webkit-scrollbar{width:0;background:0 0}::-webkit-scrollbar-thumb{background:0 0}.hidden{opacity:0 !important;height:0 !important;width:0 !important;display:none;overflow:hidden;pointer-events:none;visibility:hidden;z-index:-1}";
	let self = this;
	self.history = [];
	window.performance.mark('Module initialized');
	self.getdata();
  }
  async getdata() {
	let self = this;	  
	await fetch('./taxonomies.json',{
	method: 'GET',
	mode: 'cors',
	cache: 'no-cache', 
	credentials: 'same-origin',
	referrerPolicy: 'no-referrer'
	})
	.then(async (response) => {
		self.sRoot.data = await response.json();
		if (self.isEmpty(response.ok)) {
			console.error(`Empty response`);
		} else {
			if(self.isEmpty(self.sRoot.data)) {
				console.error(`Empty response`);
			} else {
				window.performance.mark('Taxonomies loaded');
				self.createMenu();
			}
		}
	});
		
  }
  getTaxonomies(id=0) {
	  let self = this;
	  let data = self.sRoot.data.filter(x => x.parentid == id).sort((a, b) => a.name.localeCompare(b.name));
	  if(self.isEmpty(data)) {
		  return [];
	  } else {
		  return data;
	  }
  }
  createTaxonomiesMenuItem(id=0) {
	  let self = this;
	  if(!self.isEmpty(self.sRoot.querySelector('.menu'))) {
		  self.sRoot.querySelector('.menu').remove();
      }
	  let el = document.createElement('div');
	  el.classList.add('menu');  	
	  self.sRoot.appendChild(el);
	  if(id == 0) {
	      self.history.push(id);
	  }
	  let data = self.getTaxonomies(id);
	  let menuitem = !self.isEmpty(el.querySelector('.menuitem.header')) ? el.querySelector('.menuitem.header') : document.createElement('div');
	  if(self.isEmpty(menuitem.classList)) {
		  menuitem.classList.add('menuitem','header');
		  menuitem.textContent = 'TAXONOMIES';
	  }
	  el.appendChild(menuitem);	  
	  let backitem = !self.isEmpty(el.querySelector('.menuitem.bottom.back')) ? el.querySelector('.menuitem.bottom.back') : document.createElement('div');
	  if(self.isEmpty(backitem.classList)) {
	      backitem.classList.add('menuitem','after_bottom','bulk','hidden');
	      backitem.textContent = 'PREVIOUS TAXONOMIES';
	  }
	  let startitem = !self.isEmpty(el.querySelector('#return_to_start')) ? el.querySelector('#return_to_start') : document.createElement('div');
	  if(self.isEmpty(startitem.classList)) {
	      startitem.classList.add('menuitem','bottom','back','hidden');
	      startitem.textContent = 'RETURN TO START';
		  startitem.id = 'return_to_start';
	  }
	  if(id > 0 || backitem.id > 0) {	
		  backitem.classList.remove('hidden'); 
		  startitem.classList.remove('hidden'); 
	  }	else {
		  backitem.classList.add('hidden'); 
		  startitem.classList.add('hidden'); 		  
	  } 	  
	  data.forEach((x, k) => {
		  let taxonomies_menuitem = document.createElement('div');
		  taxonomies_menuitem.classList.add('menuitem','taxonomy');
		  taxonomies_menuitem.textContent = x.name;
		  taxonomies_menuitem.id = x.psid;
		  taxonomies_menuitem.dataset.parent = x.parentid;
		  if(self.isEmpty(self.getTaxonomies(x.psid))) {
			  taxonomies_menuitem.classList.add('disabled');
		  }
		  if(!taxonomies_menuitem.classList.contains('disabled')) {
			  taxonomies_menuitem.addEventListener('click',(e) => {
				e.preventDefault();
				e.stopPropagation();
				let psid = e.target.id;
				self.history.push(psid);
				self.createTaxonomiesMenuItem(psid);
			  });
		  }  
		  el.appendChild(taxonomies_menuitem);
	  });  	
	  el.appendChild(backitem);
	  el.appendChild(startitem);
	  startitem.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			self.createTaxonomiesMenuItem();
			
	  });	  
	  backitem.addEventListener('click', (e) => {
			e.preventDefault();
			e.stopPropagation();
			let length = self.history.length;
			if(length >= 2) {
				self.createTaxonomiesMenuItem(self.history[length-2]);
				self.history.pop();
			} else {
				self.createTaxonomiesMenuItem();
			}
	  });
  }
  createMenu() {
	   let self = this;
	   let Style = document.createElement("style");
	   Style.append(self.css);
       self.sRoot.appendChild(Style);   
	   self.createTaxonomiesMenuItem();	
	   window.performance.mark('Menu loaded');	 
	   window.performance.measure("measure menu create and made visible time", 'Module initialized', 'Menu loaded');	   
	}
  isEmpty(value) {
    switch (true) {
      case (value == null || value == 'undefined' || value == false || value == ''):
        return true;
      case (Array.isArray(value)):
        return value.length == 0;
      case (typeof value == 'object'):
        return (Object.keys(value).length === 0 && value.constructor === Object);
      case (typeof value == 'string'):
        return value.length == 0;
      case (typeof value == 'number' && !isNaN(value)):
        return value === 0;
      default:
        return false;
    }
  }

  connectedCallback() {
    //this.contentbg = this.getAttribute("contentbg");
	//console.log('pd-menu component connected.');
  }

  disconnectedCallback() {
    //console.log('Disconnected.');
  }

  adoptedCallback() {
    //console.log('Adopted.');
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if(!this.isEmpty(this.getAttribute("backtext"))) {
		this.backtext = this.getAttribute("backtext").replace(/(<([^>]+)>)/gi, '');		
	}
	if(!this.isEmpty(this.getAttribute("starttext"))) {
		this.starttext = this.getAttribute("starttext").replace(/(<([^>]+)>)/gi, '');
	}
	if(!this.isEmpty(this.getAttribute("headertext"))) {
		this.headertext = this.getAttribute("headertext").replace(/(<([^>]+)>)/gi, '');
	}
	this.history = [];
	this.getdata();
  }
}
if (!window.customElements.get('pd-menu')) {
  window.pdMenu = pdMenu;
  window.customElements.define('pd-menu', pdMenu);
}
