//Canvas.js is dedicated to managing canvas events.
//This includes how the canvas/off-canvas elements open/close and relate.
Thriver.canvas = {
	/**
	 * @summary Remove Overlay
	 * @method
	 */
	removeOverlay: function () {
		// Canvas element
		let canvas = document.querySelector('#canvas');

		// Prevent body scrolling
		document.body.classList.remove('noScroll');

		// Open canvas
		canvas.dataset.canvasState = '';
	},

	/**
	 * @summary Close sidebars
	 * @method
	 */
	closeSidebars: function () {
		// Get all sidebars and links that happen to be open
		let sidebars = document.querySelectorAll('.sidebar[aria-hidden="false"]'),
			links    = document.querySelectorAll('a[data-toggle="canvas"][aria-expanded="true"]');

		// Close all sidebars
		for (let i = 0; i < sidebars.length; ++i)
			Thriver.util.hide( sidebars[i] );

		// Reset links
		for (let i = 0; i < links.length; ++i) {
			Thriver.util.makeActive( links[i], false );
			links[i].removeEventListener('click', Thriver.canvas.handleCloseButton);
		}

		// Remove overlay
		Thriver.canvas.removeOverlay();
	},

	/**
	 * @summary Add Overlay
	 * @method
	 */
	addOverlay: function () {
		// Canvas element
		let canvas = document.querySelector('#canvas');

		// Prevent body scrolling
		document.body.classList.add('noScroll');

		// Open canvas
		canvas.dataset.canvasState = 'open';
	},

	/**
	 * @summary Open Sidebar
	 * @method
	 *   @param {Object} data - Show the sidebar in this data object
	 */
	openSidebar: function (data) {
		check(data, Object);
		check(data.element, String);

		// First, close any open sidebars
		Thriver.canvas.closeSidebars();

		// Get canvas and sidebars
		let element = document.querySelector(data.element),
			canvas  = document.querySelector('#canvas'),
			sidebar = document.querySelector('#' + element.getAttribute('aria-controls') +
				'.sidebar');

		// Open Overlay
		Thriver.canvas.addOverlay();

		// Make link active
		Thriver.util.makeActive(element);

		// Make sidebar active
		Thriver.util.hide(sidebar, false);

		// Set width
		canvas.dataset.canvasWidth = sidebar.dataset.width;
		canvas.dataset.canvasPosition = sidebar.dataset.position;

		// Bind closure
		element.addEventListener('click', Thriver.canvas.handleCloseButton);
	},

	/**
	 * @summary Handle close button
	 * @method
	 *   @param {Event|$.Event} event
	 */
	handleCloseButton: function (event) {
		check(event, Match.OneOf(Event, $.Event) );

		// Prevent anchor link from reopening sidebar while we're trying to close it
		event.stopPropagation();
		event.preventDefault();

		Thriver.canvas.closeSidebars();
	},

	/**
	 * @summary Handle opening and closing of mobile hamburger menu
	 * @method
	 *   @param {$.Event} event
	 */
	mobileMenu: event => {
		check(event, $.Event);

		// Close Menu and Back Button Feature
		if ( event.target.getAttribute('aria-expanded') === 'true' ) {
			// Hide visible menu items
			document.querySelectorAll('.off-canvas menu.tabs li [aria-expanded="true"]').
				forEach(tab => { tab.setAttribute('aria-expanded', false); });

			// Hide visible sections
			document.querySelectorAll('.off-canvas div.tabs article[aria-hidden="false"]').
				forEach(section => { section.setAttribute('aria-hidden', true); });

			// Allow scrolling
			document.body.classList.remove('noScroll');

			// Hide menu
			Thriver.util.hide( document.getElementById('mobile-navigation'), true );

			// Remove Expanded From Toggle
			Thriver.util.makeActive( document.getElementById("mobile-toggle"), false );

			// We're done
			return false;
		}

		// Open menu

		// Set Toggle to Expanded
		Thriver.util.makeActive( document.getElementById("mobile-toggle"), true );
		// First, prevent body scrolling
		document.body.classList.add('noScroll');

		// Then make the menu visible
		Thriver.util.hide( document.getElementById('mobile-navigation'), false );
	},










	/* ================================================ */
	/* The following methods are no longer being used.  */
	/* ================================================ */
	clearCanvas : function(){
	    document.body.classList.remove('noScroll');
	    var canvas = document.getElementById('canvas');
	    canvas.setAttribute('data-canvas-position','');
	    canvas.setAttribute('data-canvas-state','closed');
	    canvas.setAttribute('data-canvas-width','');
	},
	//event.target function fires on click events of any element containing the data-attribute, "data-sidebar".
	toggleCanvas : function (event) {
	    // Canvas Variables
	    var toggle = document.querySelectorAll('[aria-controls][data-toggle=canvas]');
	    var overlay = document.getElementById('overlay');
	    var sidebar = document.querySelectorAll('section.sidebar');
	    var canvas = document.getElementById('canvas');
	    var main = document.getElementById('main');
		var activeTab = document.querySelectorAll('section.sidebar[aria-hidden=false] menu.tabs > li > a');
		var activeTabContent = document.querySelectorAll('section.sidebar[aria-hidden=false] div.tabs > [aria-hidden]');

		// Events are required
		if (!event || !event.target) return;

	    //Close open canvas elements if overlay or active li is clicked. Or if close canvas event fired
	    if (event.target.getAttribute('aria-expanded') == 'true' && event.target.id !== "mobile-toggle" || event.target == overlay || event.target.getAttribute('data-canvas-event') == 'close'){
	        for (var i = 0, e; e = toggle[i]; i++) { Thriver.util.makeActive(e,false); } //Remove current toggle active states
	        for (var i = 0, e; e = sidebar[i]; i++) { Thriver.util.hide(e,true); } //Clear all active Sidebars
	        Thriver.canvas.clearCanvas(); //Remove all canvas effect classes
	        Thriver.util.hide(overlay,true);
	        Thriver.util.hide(main,false);
			document.body.classList.remove('open-canvas');
	        focusGlobalElFirst.focus();
			if(document.getElementById("mobile-toggle").getAttribute('aria-expanded') !== "false"){ document.getElementById("mobile-toggle").click(); }
	    }

	    // Open Overlay and offCanvas elements if clicking inactive list item
	    else if(event.target.hasAttribute('aria-controls') && event.target.getAttribute('aria-expanded') == 'false' && event.target.id !== "mobile-toggle"){
	        Thriver.canvas.clearCanvas();
			document.body.classList.add('open-canvas');
	        Thriver.util.hide(main,true);
	        document.body.classList.add('noScroll');
	        canvas.setAttribute('data-canvas-state','open'); //Add master canvas effect class
	        Thriver.util.hide(overlay,false);
	        for (var i = 0, e; e = toggle[i]; i++) { Thriver.util.makeActive(e,false); } //Clear all active toggles
	        Thriver.util.makeActive(event.target,true); //Add active class to clicked element
			if(document.getElementById("mobile-toggle").getAttribute('aria-expanded') !== "true"){ document.getElementById("mobile-toggle").click(); } //Open Mobile Menu
	        //Sets values based on the parameters of the current sidebar
	        for (var i = 0, e; e = sidebar[i]; i++) {
	            Thriver.util.hide(e,true); //Clear all active sidebars
	            if (e.getAttribute('id') == event.target.getAttribute('aria-controls')){ //If Sidebar ID matches toggles' data-sidebar
	                Thriver.util.hide(e,false); //Add active class to given sidebar
	                canvas.setAttribute('data-canvas-width',e.dataset.width); //Add new sidebar-width effect class
	                if(e.dataset.position == 'left'){ canvas.setAttribute('data-canvas-position','left'); }
	                if(e.dataset.position == 'right'){ canvas.setAttribute('data-canvas-position','right'); }
	            }
				/*
				// Working alternate for ie compat.
	            Thriver.util.hide(e,true); //Clear all active sidebars
	            if ('#' + e.getAttribute('id') == event.target.getAttribute('aria-controls')){ //If Sidebar ID matches toggles' data-sidebar
	                Thriver.util.hide(e,false); //Add active class to given sidebar
	                canvas.setAttribute('data-canvas-width',e.getAttribute('width')); //Add new sidebar-width effect class
	                if(e.getAttribute('data-position') == 'left'){ canvas.setAttribute('data-canvas-position','left'); }
	                if(e.getAttribute('data-position') == 'right'){ canvas.setAttribute('data-canvas-position','right'); }
	            }*/
	            //focusGroupElFirst.focus();
	            //event.preventDefault();
	        }
	        f.currentFocusGroup(); //Recalculate live focus areas
	        focusGroupElFirst.focus();
	    }
	    //Mobile
	    else if(event.target.getAttribute('data-toggle')== "mobile-navigation"){
			//Events
			var mobileNavigation = document.getElementById('mobile-navigation');
			var toggleMobile = document.querySelectorAll('[aria-controls][data-toggle=mobile-navigation]');
			//var activeTab = document.querySelectorAll('section.sidebar[aria-hidden=false] menu.tabs > li > a');
			//var activeTabContent = document.querySelectorAll('section.sidebar[aria-hidden=false] div.tabs > [aria-hidden]');
			hiddenSidebar = true;
			tabActive=false;
			if(window.innerWidth < 768){
				var toggleMenuItems = document.querySelectorAll('.off-canvas menu.tabs li [aria-expanded]');
				for (var i = 0, e; e = toggleMenuItems[i]; i++) {
					if(e.getAttribute('aria-expanded') == "true"){
						e.setAttribute('aria-expanded', "false");
						tabActive=true;
					}
				}
				var tabBodies = document.querySelectorAll('.off-canvas div.tabs article[aria-hidden]');
				for (var i = 0, e; e = tabBodies[i]; i++) {
					if(e.getAttribute('aria-hidden') == "false"){
						e.setAttribute('aria-hidden', "true");
						tabActive=true;
					}
				}
			}
			for (var i = 0, e; e = sidebar[i]; i++) {
				if(e.getAttribute('aria-hidden')== "false"){
					hiddenSidebar=false;
					//The below statement caused browser crash on resource items. Unable to dermine current purpose.
					/*for (var i = 0, e; e = activeTab[i]; i++) {
						if(e.getAttribute('aria-expanded')== "true"){
							tabActive=true;
							Thriver.util.makeActive(e, false);
							document.body.classList.remove('tab-open');
							for (var i = 0, e; e = activeTabContent[i]; i++) {
								Thriver.util.hide(e, true);
							}
						}
					}*/
					if(tabActive==false){
						for (var i = 0, e; e = toggle[i]; i++) { Thriver.util.makeActive(e,false); } //Remove current toggle active states
						for (var i = 0, e; e = sidebar[i]; i++) { Thriver.util.hide(e,true); } //Clear all active Sidebars
						Thriver.canvas.clearCanvas(); //Remove all canvas effect classes
						document.body.classList.add('noScroll');
						Thriver.util.hide(overlay,true);
						Thriver.util.hide(main,false);
						focusGlobalElFirst.focus();
					}
				}
			 }
			 if(hiddenSidebar == true){
				for (var i = 0, e; e = toggleMobile[i]; i++) {
					if(e.getAttribute('aria-expanded')== "true"){
						for (var i = 0, e; e = toggleMobile[i]; i++) { Thriver.util.makeActive(e, false);}
						Thriver.util.hide(mobileNavigation, true);
						document.body.classList.remove('noScroll');
					} else{
						//alert('ma');
						Thriver.util.makeActive(event.target, true);
						Thriver.util.hide(mobileNavigation, false);
						document.body.classList.add('noScroll');
						//Close any open tabs
					}
				} //Remove current toggle active states
			 }
			/*
			if(event.target.getAttribute('aria-expanded') == 'true'){
				if(event.target)
				Thriver.util.makeActive(event.target, false);
				Thriver.util.hide(mobileNavigation, true);
				document.body.classList.remove('noScroll');
			} else{
				Thriver.util.makeActive(event.target, true);
				Thriver.util.hide(mobileNavigation, false);
				document.body.classList.add('noScroll');
			}*/
	    }

	    f.currentFocusGroup(); //Recalculate live focus areas
	}
}

//This needs a new home
function mobToggle(){
	Thriver.canvas.toggleCanvas(); //START HERE
}
function mainNavItem(){
	var toggleMobile = document.querySelectorAll('[aria-controls][data-toggle=mobile-navigation]');
	var mobileNavigation = document.getElementById('mobile-navigation');
	for (var i = 0, e; e = toggleMobile[i]; i++) { Thriver.util.makeActive(e, false);}
	Thriver.util.hide(mobileNavigation, true);
	document.body.classList.remove('noScroll');
}
function toServiceProvidersTwo(){
	m.toggleMore();
	event.preventDefault();
	return false;

}
function toServiceProviders(){
	var toggleMobile = document.querySelectorAll('[aria-controls][data-toggle=mobile-navigation]');
	var mobileNavigation = document.getElementById('mobile-navigation');
	for (var i = 0, e; e = toggleMobile[i]; i++) { Thriver.util.makeActive(e, false);}
	Thriver.util.hide(mobileNavigation, true);
	document.body.classList.remove('noScroll');
}

Template.body.events({
	//Canvas Actions
	//'click [aria-controls][data-toggle=canvas]': Thriver.canvas.toggleCanvas,
	//'click .overlay': Thriver.canvas.toggleCanvas,
	'click .overlay, click [data-canvas-event="close"]': Thriver.canvas.closeSidebars,
	//'click [data-canvas-event="close"]': Thriver.canvas.toggleCanvas,

	//Mobile Events
	'click [aria-controls][data-toggle="mobile-navigation"]': Thriver.canvas.mobileMenu,

	//'click [data-type="main-navigation-item"]': Thriver.canvas.toggleCanvas,

	//'click #mobile-navigation li > a[href="#service-providers"]': Thriver.canvas.toggleCanvas, //toservice2

	//'click #mobile-navigation figure a[href="#service-providers"]': Thriver.canvas.toggleCanvas

});
